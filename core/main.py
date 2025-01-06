import grpc
from concurrent import futures
import subprocess
import os

# Import the generated gRPC modules
import main_pb2
import main_pb2_grpc

# Define the gRPC server class
class MainAppService(main_pb2_grpc.MainAppServicer):
    def __init__(self):
        self.sushi_process = None
        self.plugin_dir = "/home/mind/plugins"
        self.config_dir = "/home/mind/config_files"

    def CheckConnection(self, request, context):
        response = main_pb2.ConnectionStatus()
        response.message = "Server is connected and operational."
        response.connected = True
        return response

    def FetchConfigFiles(self, request, context):
        response = main_pb2.ConfigList()
        try:
            config_files = [f for f in os.listdir(self.config_dir) if f.endswith(".json")]
            response.configs.extend(config_files)
            return response
        except Exception as e:
            context.set_details(str(e))
            context.set_code(grpc.StatusCode.INTERNAL)
            return response

    def UseConfigFile(self, request, context):
        config_name = request.name
        response = main_pb2.Status()

        # Stop the existing Sushi process if running
        print("Stopping existing Sushi process (if any)...")
        if self.sushi_process:
            self.sushi_process.terminate()
            self.sushi_process.wait()
            self.sushi_process = None
        
        # Start a new Sushi process
        try:
            sushi_command = [
                "sushi", "--dummy", "--multicore-processing=2", "-c", os.path.expanduser(f"~/core/{config_name}")
            ]
            self.sushi_process = subprocess.Popen(sushi_command)
            response.message = f"Sushi started with config: {config_name}"
            response.success = True
            return response
        except Exception as e:
            response.message = f"Failed to start Sushi with config: {config_name}"
            response.success = False
            context.set_details(str(e))
            context.set_code(grpc.StatusCode.INTERNAL)
            return response

# Main function to start the gRPC server
def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    main_pb2_grpc.add_MainAppServicer_to_server(MainAppService(), server)
    server.add_insecure_port("[::]:50051")
    print("gRPC server is running on port 50051...")
    server.start()
    try:
        server.wait_for_termination()
    except KeyboardInterrupt:
        print("Shutting down server...")

if __name__ == "__main__":
    serve()

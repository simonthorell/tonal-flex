import grpc
from concurrent import futures
import subprocess
import os
import logging

# Import the generated gRPC modules
import main_pb2
import main_pb2_grpc

# Configure logging
logging.basicConfig(level=logging.DEBUG, format="%(asctime)s - %(levelname)s - %(message)s")

# Define the gRPC server class
class MainAppService(main_pb2_grpc.MainAppServicer):
    def __init__(self):
        self.sushi_process = None
        self.plugin_dir = "/home/mind/plugins"
        self.config_dir = "/home/mind/config_files"

    def is_hat_connected(self):
        """Check if the Elk Audio HAT is connected to elkOS."""
        try:
            hat_file_path = "/tmp/audio_hat"
            if os.path.exists(hat_file_path):
                with open(hat_file_path, "r") as f:
                    hat_name = f.read().strip()
                    if hat_name:
                        logging.info("Detected audio HAT: %s", hat_name)
                        return True
                    else:
                        logging.info("Audio HAT file exists but is empty. Assuming no HAT.")
            else:
                logging.info("Audio HAT file does not exist. Assuming no HAT.")
            return False
        except Exception as e:
            logging.error("Error checking audio HAT: %s", e)
            return False

    def CheckConnection(self, request, context):
        logging.debug("CheckConnection called.")
        response = main_pb2.ConnectionStatus()
        response.message = "Server is connected and operational."
        response.connected = True
        return response

    def FetchConfigFiles(self, request, context):
        logging.debug("FetchConfigFiles called.")
        response = main_pb2.ConfigList()
        try:
            config_files = [f for f in os.listdir(self.config_dir) if f.endswith(".json")]
            logging.info("Found config files: %s", config_files)
            response.configs.extend(config_files)
            return response
        except Exception as e:
            logging.error("Error fetching config files: %s", e)
            context.set_details(str(e))
            context.set_code(grpc.StatusCode.INTERNAL)
            return response

    def UseConfigFile(self, request, context):
        config_name = request.name
        logging.debug("UseConfigFile called with config: %s", config_name)
        response = main_pb2.Status()

        # Stop the existing Sushi process if running
        logging.info("Stopping existing Sushi process (if any)...")
        if self.sushi_process:
            self.sushi_process.terminate()
            self.sushi_process.wait()
            self.sushi_process = None

        # Determine Sushi command based on HAT connection
        if self.is_hat_connected():
            sushi_args = ["-r"]
            logging.info("Running Sushi with real hardware.")
        else:
            sushi_args = ["--dummy"]
            logging.info("Running Sushi in dummy mode.")


        config_path = os.path.join(self.config_dir, config_name)

        # Start a new Sushi process
        try:
            sushi_command = [
                "sushi", *sushi_args, "--multicore-processing=2", "-c", config_path
            ]
            logging.info("Starting Sushi with command: %s", " ".join(sushi_command))
            self.sushi_process = subprocess.Popen(sushi_command)
            response.message = f"Sushi started with config: {config_name}"
            response.success = True
            return response
        except Exception as e:
            logging.error("Failed to start Sushi: %s", e)
            response.message = f"Failed to start Sushi with config: {config_name}"
            response.success = False
            context.set_details(str(e))
            context.set_code(grpc.StatusCode.INTERNAL)
            return response

# Main function to start the gRPC server
def serve():
    logging.info("Starting gRPC server...")
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    main_pb2_grpc.add_MainAppServicer_to_server(MainAppService(), server)
    server.add_insecure_port("[::]:50051")
    logging.info("gRPC server is running on port 50051...")
    server.start()
    try:
        server.wait_for_termination()
    except KeyboardInterrupt:
        logging.info("Shutting down server...")
        server.stop(0)

if __name__ == "__main__":
    serve()

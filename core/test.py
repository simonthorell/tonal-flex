import grpc
import main_pb2
import main_pb2_grpc

def run():
    # Connect to the server
    with grpc.insecure_channel('192.168.50.198:50051') as channel:  # Replace with your server's IP
        stub = main_pb2_grpc.MainAppStub(channel)
        
        # Test `CheckConnection`
        print("Testing CheckConnection...")
        response = stub.CheckConnection(main_pb2.Empty())
        print(f"CheckConnection response: {response.message}, connected: {response.connected}")

        # Test `FetchConfigFiles`
        print("\nTesting FetchConfigFiles...")
        config_list = stub.FetchConfigFiles(main_pb2.Empty())
        print("Config files:", config_list.configs)

        # Test `UseConfigFile`
        print("\nTesting UseConfigFile...")
        config_request = main_pb2.ConfigName(name="example_config.json")
        status = stub.UseConfigFile(config_request)
        print(f"UseConfigFile response: {status.message}, success: {status.success}")

if __name__ == "__main__":
    run()

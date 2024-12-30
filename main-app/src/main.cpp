#include <grpcpp/grpcpp.h>
#include "server.h"
#include "environmentUtils.h"
#include <cstdlib>
#include <iostream>
#include <string>

void RunServer() {
    std::string server_address("0.0.0.0:50051");
    MainAppService service;

    grpc::ServerBuilder builder;
    builder.AddListeningPort(server_address, grpc::InsecureServerCredentials());
    builder.RegisterService(&service);

    std::unique_ptr<grpc::Server> server(builder.BuildAndStart());
    std::cout << "Server listening on " << server_address << std::endl;
    server->Wait();
}

void startJACK() {
    std::string platform = getEnvironmentVariable("PLATFORM");
    std::string command;

    if (platform == "mac_arm64") {
        command = "jackd -R -d coreaudio";
    } else if (platform == "linux_x86") {
        command = "jackd -v -R -d alsa -d hw:0,0";
    } else {
        std::cerr << "Unsupported platform: " << platform << std::endl;
        return;
    }

    std::cout << "Starting JACK with command: " << command << std::endl;

    // Start JACK as a background process
    int result = std::system((command + " &").c_str());
    if (result != 0) {
        std::cerr << "Failed to start JACK. Exit code: " << result << std::endl;
    }
}

int main(int argc, char** argv) {
    startJACK();
    RunServer();
    return 0;
}

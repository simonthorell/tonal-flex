#include <grpcpp/grpcpp.h>
#include "server.h"
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


int main(int argc, char** argv) {
    RunServer();
    return 0;
}

#include <signal.h>
#include <unistd.h>
#include <sys/types.h>
#include <iostream>
#include "server.h"
#include "sendConfigNames.h"
#include "sushiHandler.h"
#include <filesystem>

namespace fs = std::filesystem;

SushiHandler sushiHandler;

grpc::Status MainAppService::CheckConnection(grpc::ServerContext* context, const main_app::Empty* request, main_app::ConnectionStatus* response) {
    response->set_message("Server is connected and operational.");
    response->set_connected(true);
    return grpc::Status::OK;
}

grpc::Status MainAppService::FetchConfigFiles(grpc::ServerContext* context, const main_app::Empty* request, main_app::ConfigList* response) {
    auto configNames = fetchConfigNames();

    for (const auto& name : configNames) {
        response->add_configs(name);
    }

    return grpc::Status::OK;
}

grpc::Status MainAppService::UseConfigFile(grpc::ServerContext* context, const main_app::ConfigName* request, main_app::Status* response) {
    std::string configName = request->name();

    // Stop the existing Sushi process if running
    std::cout << "Stopping existing Sushi process (if any)..." << std::endl;
    if (!sushiHandler.stopSushi()) {
        std::cerr << "No running Sushi process or failed to stop Sushi." << std::endl;
    }

    // Start a new Sushi process
    if (sushiHandler.startSushi(configName)) {
        response->set_message("Sushi started with config: " + configName);
        response->set_success(true);
        return grpc::Status::OK;
    } else {
        response->set_message("Failed to start Sushi with config: " + configName);
        response->set_success(false);
        return grpc::Status(grpc::StatusCode::INTERNAL, "Failed to start Sushi");
    }
}

#include "server.h"
#include "sendConfigNames.h"
#include "startSushi.h"
#include <filesystem>

namespace fs = std::filesystem;

bool isSushiRunning = false;

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

    // If Sushi is already running, terminate it
    if (isSushiRunning) {
        std::cout << "Terminating existing Sushi process before starting a new one..." << std::endl;
        int killResult = std::system("pkill -f sushi");
        if (killResult == 0) {
            std::cout << "Successfully terminated existing Sushi process." << std::endl;
        } else {
            std::cerr << "No Sushi process was running, or pkill encountered an error." << std::endl;
        }
    } else {
        std::cout << "No Sushi process running; skipping termination step." << std::endl;
    }

    // Attempt to start Sushi with the specified configuration file
    if (startSushi(configName)) {
        std::cout << "Sushi started successfully with config: " << configName << std::endl;
        isSushiRunning = true;  // Set the flag to true
        response->set_message("Sushi started with config: " + configName);
        response->set_success(true);
        return grpc::Status::OK;
    } else {
        std::cerr << "Failed to start Sushi with config: " << configName << std::endl;
        response->set_message("Failed to start Sushi with config: " + configName);
        response->set_success(false);
        return grpc::Status(grpc::StatusCode::INTERNAL, "Failed to start Sushi");
    }
}

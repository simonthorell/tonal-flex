#include "sushiHandler.h"
#include <boost/process.hpp>
#include <filesystem>
#include <iostream>

namespace fs = std::filesystem;
namespace bp = boost::process;

bool SushiHandler::startSushi(const std::string& configName) {
    try {

        // sushi Commands
        std::string sushiPath = "sushi";
        std::string sushiAudioFlag = "-r";
        std::string sushiPorts = "--multicore-processing=2";
        std::string sushiPluginsPath = "--base-plugin-path=/home/mind/plugins";
        std::string sushiConfigFlag = "-c";
        std::string sushiConfigPath = "/home/mind/config_files/" + configName;

        // Check if the Sushi executable exists
        if (!fs::exists(sushiPath)) {
            std::cerr << "Sushi executable not found: " << sushiPath << std::endl;
            return false;
        }

        // Check if the config file exists
        if (!fs::exists(sushiConfigPath)) {
            std::cerr << "Config file not found: " << sushiConfigPath << std::endl;
            return false;
        }

        // Log the command for debugging
        std::cout << "Starting Sushi with binary: " << sushiPath << std::endl;
        std::cout << "Configuration: " << sushiConfigPath << std::endl;
        std::cout << "Plugin Path: " << sushiPluginsPath << std::endl;

        // Launch Sushi
        sushiProcess = std::make_unique<bp::child>(
            sushiPath,
            sushiAudioFlag,
            sushiPorts,
            sushiPluginsPath,
            sushiConfigFlag,
            sushiConfigPath
        );

        if (sushiProcess->running()) {
            std::cout << "Sushi started successfully with PID: " << sushiProcess->id() << std::endl;
            return true;
        } else {
            std::cerr << "Failed to start Sushi." << std::endl;
            return false;
        }
    } catch (const std::exception& e) {
        std::cerr << "Error starting Sushi: " << e.what() << std::endl;
        return false;
    }
}

bool SushiHandler::stopSushi() {
    if (sushiProcess && sushiProcess->running()) {
        std::cout << "Stopping Sushi with PID: " << sushiProcess->id() << std::endl;
        sushiProcess->terminate(); // Send SIGTERM to the process
        sushiProcess->wait();      // Wait for the process to exit
        sushiProcess.reset();      // Clear the process handle
        std::cout << "Sushi stopped successfully." << std::endl;
        return true;
    } else {
        std::cerr << "No running Sushi process to stop." << std::endl;
        return false;
    }
}

bool SushiHandler::isSushiRunning() const {
    return sushiProcess && sushiProcess->running();
}

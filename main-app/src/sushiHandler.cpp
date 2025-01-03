#include "sushiHandler.h"
#include <boost/process.hpp>
#include <filesystem>
#include <iostream>

namespace fs = std::filesystem;
namespace bp = boost::process;

bool SushiHandler::startSushi(const std::string& configName) {
    try {
        // Resolve paths
        std::string sushiPath = fs::absolute(fs::current_path() / "sushi/Sushi-x86_64.AppImage").string();
        std::string fullConfigPath = fs::absolute(fs::current_path() / "config" / configName).string();
        std::string fullPluginPath = fs::absolute(fs::current_path() / "plugins").string();

        // Check if the Sushi executable exists
        if (!fs::exists(sushiPath)) {
            std::cerr << "Sushi executable not found: " << sushiPath << std::endl;
            return false;
        }

        // Check if the config file exists
        if (!fs::exists(fullConfigPath)) {
            std::cerr << "Config file not found: " << fullConfigPath << std::endl;
            return false;
        }

        // Determine Sushi flag
        std::string sushiFlag = "-j"; // Modify if needed based on the platform

        // Log the command for debugging
        std::cout << "Starting Sushi with binary: " << sushiPath << std::endl;
        std::cout << "Configuration: " << fullConfigPath << std::endl;
        std::cout << "Plugin Path: " << fullPluginPath << std::endl;

        // Launch Sushi
        sushiProcess = std::make_unique<bp::child>(
            sushiPath,
            sushiFlag,
            "--connect-ports",
            "--base-plugin-path=" + fullPluginPath,
            "-c", fullConfigPath
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

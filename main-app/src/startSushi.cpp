#include "startSushi.h"
#include "environmentUtils.h"
#include <cstdlib>
#include <iostream>
#include <filesystem>
#include <cstdlib>
#include <iostream>
#include <string>

namespace fs = std::filesystem;
const std::string PLUGIN_BASE_PATH = std::filesystem::current_path().string() + "/plugins/";
const std::string CONFIG_PATH = std::filesystem::current_path().string() + "/config/";

bool startSushi(const std::string& configName) {
    try {
        // Resolve absolute paths for the config file and plugin path
        std::string fullConfigPath = fs::absolute(CONFIG_PATH) / configName;
        std::string fullPluginPath = fs::absolute(PLUGIN_BASE_PATH);

        // Check if the config file exists
        if (!fs::exists(fullConfigPath)) {
            std::cerr << "Config file not found: " << fullConfigPath << std::endl;
            return false;
        }

        // Build the Sushi command
        std::string sushiPath = fs::absolute(std::filesystem::current_path() / "sushi/Sushi-x86_64.AppImage").string();
        std::string platform = getEnvironmentVariable("PLATFORM");
        std::string sushiFlag = (platform == "mac") ? "-a" : "-j";
        std::string command = sushiPath + " " + sushiFlag +
                              " --connect-ports --base-plugin-path=" + fullPluginPath +
                              " -c " + fullConfigPath;

        std::cout << "Executing Sushi command: " << command << std::endl;

        // Execute the command
        int result = std::system(command.c_str());
        if (result == 0) {
            std::cout << "Sushi started successfully with config: " << configName << std::endl;
            return true;
        } else {
            std::cerr << "Failed to start Sushi. Exit code: " << result << std::endl;
            return false;
        }
    } catch (const std::exception& e) {
        std::cerr << "Error starting Sushi: " << e.what() << std::endl;
        return false;
    }
}

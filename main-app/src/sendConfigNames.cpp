#include "sendConfigNames.h"
#include <filesystem>
#include <iostream>

namespace fs = std::filesystem;
const std::string CONFIG_PATH = std::filesystem::current_path().string() + "/config/";

std::vector<std::string> fetchConfigNames() {
    std::vector<std::string> configNames;
    try {
        for (const auto& entry : fs::directory_iterator(CONFIG_PATH)) {
            if (entry.is_regular_file()) {
                configNames.push_back(entry.path().filename().string());
            }
        }
    } catch (const std::exception& e) {
        std::cerr << "Error fetching config names: " << e.what() << std::endl;
    }
    return configNames;
}

#include "environmentUtils.h"
#include <cstdlib>

std::string getEnvironmentVariable(const std::string &var) {
    const char *value = std::getenv(var.c_str());
    return value ? std::string(value) : "";
}

#ifndef SUSHI_HANDLER_H
#define SUSHI_HANDLER_H

#include <string>
#include <memory>
#include <boost/process.hpp>

class SushiHandler {
public:
    // Start Sushi with the specified configuration file
    bool startSushi(const std::string& configName);

    // Stop the currently running Sushi process
    bool stopSushi();

    // Check if Sushi is running
    bool isSushiRunning() const;

private:
    std::unique_ptr<boost::process::child> sushiProcess; // Handle to the running process
    std::string detectArchitecture() const;             // Detects system architecture
};

#endif // SUSHI_HANDLER_H

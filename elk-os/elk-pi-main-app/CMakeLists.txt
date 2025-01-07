cmake_minimum_required(VERSION 3.15)
project(elk_pi_main_app)

# Set C++ standard
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Find required packages
find_package(Protobuf REQUIRED)
find_package(gRPC CONFIG REQUIRED)
find_package(Boost REQUIRED)
find_package(absl REQUIRED)

# Include directories
include_directories(${CMAKE_CURRENT_SOURCE_DIR}/include)
include_directories(${CMAKE_CURRENT_SOURCE_DIR}/proto)
include_directories(${gRPC_SOURCE_DIR}/third_party/abseil-cpp)

# Source files
set(SOURCES
    src/main.cpp
    src/server.cpp
    src/sushiHandler.cpp
    src/sendConfigNames.cpp
    proto/main_app.pb.cc
    proto/main_app.grpc.pb.cc
)

# Add executable
add_executable(main_app ${SOURCES})

# Link libraries
target_link_libraries(main_app
    -Wl,--start-group
    gRPC::grpc++
    protobuf::libprotobuf
    absl::log
    absl::strings
    absl::time
    absl::base
    absl::synchronization
    -Wl,--end-group
)

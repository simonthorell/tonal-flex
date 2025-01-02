cmake_minimum_required(VERSION 3.15)
project(main_app)

set(CMAKE_CXX_STANDARD 17)

# Find Protobuf and gRPC
list(APPEND CMAKE_PREFIX_PATH "/usr/local/lib/cmake")
find_package(Protobuf CONFIG REQUIRED)
find_package(gRPC CONFIG REQUIRED)
find_package(Boost REQUIRED)

# Include directories
include_directories(${Protobuf_INCLUDE_DIRS})
include_directories(${gRPC_INCLUDE_DIRS})
include_directories(${Boost_INCLUDE_DIRS})
include_directories(include proto)

# Add source files
add_executable(main_app
    src/main.cpp
    src/server.cpp
    src/sendConfigNames.cpp
    src/sushiHandler.cpp
    src/environmentUtils.cpp
    proto/main_app.pb.cc
    proto/main_app.grpc.pb.cc
)

# Link libraries
target_link_libraries(main_app
    gRPC::grpc++
    protobuf::libprotobuf
    protobuf::libprotoc
    Boost::boost
)

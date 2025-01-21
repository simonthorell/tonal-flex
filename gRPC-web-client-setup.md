# Requirements for gRPC-Web Client Generation

This guide explains how to set up your environment to generate gRPC-Web client files from `.proto` definitions for the Sushi project.

## Prerequisites

### 1. Protocol Buffers Compiler (`protoc`)

#### Download and install the Protocol Buffers Compiler:

**Windows:**

1. Download the latest release from the [Protocol Buffers GitHub Releases](https://github.com/protocolbuffers/protobuf/releases).
2. Extract the `.zip` file and move it to a directory like `C:\Protoc`.
3. Add the `bin` directory (e.g., `C:\Protoc\bin`) to your system's PATH:
    - Open Environment Variables settings.
    - Edit the `Path` variable under "System Variables."
    - Add the path to `protoc.exe`.
4. Verify installation:

    ```bash
    protoc --version
    ```

**Linux:**

1. Install `protoc` using your package manager:

    ```bash
    sudo apt update
    sudo apt install -y protobuf-compiler
    ```

2. Verify installation:

    ```bash
    protoc --version
    ```

**macOS:**

1. Install `protoc` using Homebrew:

    ```bash
    brew install protobuf
    ```

2. Verify installation:

    ```bash
    protoc --version
    ```

### 2. Install `protoc-gen-grpc-web` Plugin

This plugin is required to generate gRPC-Web clients.

1. Install the plugin globally via npm:

    ```bash
    npm install -g protoc-gen-grpc-web
    ```

2. Ensure the plugin is accessible in your system's PATH:
    
    - **Windows:** Typically located in:
      ```
      C:\Users\<YourUsername>\AppData\Roaming\npm
      ```
    
    - **Linux/macOS:** Typically located in:
      ```
      /usr/local/bin
      ```

3. Verify installation:

    ```bash
    protoc-gen-grpc-web --version
    ```

### 3. Node.js

1. Install Node.js from the [official website](https://nodejs.org/).
2. Verify installation:

    ```bash
    node --version
    npm --version
    ```

### 4. Create Required Directories

Ensure the `.proto` file (e.g., `sushi_rpc.proto`) is in the project under a `proto/` directory:

```
frontend/
├── proto/
│   └── sushi_rpc.proto
├── src/
│   └── proto/  # Output folder for generated files
```

Create the `src/proto` directory manually:

```bash
mkdir -p src/proto
```

## Command to Generate gRPC-Web Files

Use the following command to generate gRPC-Web client files:

```bash
protoc -I=proto proto/sushi_rpc.proto --grpc-web_out=import_style=typescript,mode=grpcwebtext:src/proto
```

### Notes for Different Systems:

**Windows Command Prompt:**

```bash
protoc -I=proto proto\sushi_rpc.proto --grpc-web_out=import_style=typescript,mode=grpcwebtext:src\proto
```

**Windows PowerShell:**

```bash
protoc -I=proto proto/sushi_rpc.proto `
  --grpc-web_out=import_style=typescript,mode=grpcwebtext:src/proto
```

**Linux/macOS:**

```bash
protoc -I=proto proto/sushi_rpc.proto --grpc-web_out=import_style=typescript,mode=grpcwebtext:src/proto
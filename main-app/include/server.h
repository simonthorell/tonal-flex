#ifndef SERVER_IMPL_H
#define SERVER_IMPL_H

#include "main_app.grpc.pb.h"

class MainAppService final : public main_app::MainApp::Service {
public:
    grpc::Status CheckConnection(grpc::ServerContext* context, const main_app::Empty* request, main_app::ConnectionStatus* response) override;
    grpc::Status FetchConfigFiles(grpc::ServerContext* context, const main_app::Empty* request, main_app::ConfigList* response) override;
    grpc::Status UseConfigFile(grpc::ServerContext* context, const main_app::ConfigName* request, main_app::Status* response) override;
};

#endif

// Generated by the gRPC C++ plugin.
// If you make any local change, they will be lost.
// source: proto/main_app.proto
#ifndef GRPC_proto_2fmain_5fapp_2eproto__INCLUDED
#define GRPC_proto_2fmain_5fapp_2eproto__INCLUDED

#include "main_app.pb.h"

#include <functional>
#include <grpcpp/generic/async_generic_service.h>
#include <grpcpp/support/async_stream.h>
#include <grpcpp/support/async_unary_call.h>
#include <grpcpp/support/client_callback.h>
#include <grpcpp/client_context.h>
#include <grpcpp/completion_queue.h>
#include <grpcpp/support/message_allocator.h>
#include <grpcpp/support/method_handler.h>
#include <grpcpp/impl/proto_utils.h>
#include <grpcpp/impl/rpc_method.h>
#include <grpcpp/support/server_callback.h>
#include <grpcpp/impl/server_callback_handlers.h>
#include <grpcpp/server_context.h>
#include <grpcpp/impl/service_type.h>
#include <grpcpp/support/status.h>
#include <grpcpp/support/stub_options.h>
#include <grpcpp/support/sync_stream.h>

namespace main_app {

// MainApp Service for managing the application.
class MainApp final {
 public:
  static constexpr char const* service_full_name() {
    return "main_app.MainApp";
  }
  class StubInterface {
   public:
    virtual ~StubInterface() {}
    // Check if the server is connected.
    virtual ::grpc::Status CheckConnection(::grpc::ClientContext* context, const ::main_app::Empty& request, ::main_app::ConnectionStatus* response) = 0;
    std::unique_ptr< ::grpc::ClientAsyncResponseReaderInterface< ::main_app::ConnectionStatus>> AsyncCheckConnection(::grpc::ClientContext* context, const ::main_app::Empty& request, ::grpc::CompletionQueue* cq) {
      return std::unique_ptr< ::grpc::ClientAsyncResponseReaderInterface< ::main_app::ConnectionStatus>>(AsyncCheckConnectionRaw(context, request, cq));
    }
    std::unique_ptr< ::grpc::ClientAsyncResponseReaderInterface< ::main_app::ConnectionStatus>> PrepareAsyncCheckConnection(::grpc::ClientContext* context, const ::main_app::Empty& request, ::grpc::CompletionQueue* cq) {
      return std::unique_ptr< ::grpc::ClientAsyncResponseReaderInterface< ::main_app::ConnectionStatus>>(PrepareAsyncCheckConnectionRaw(context, request, cq));
    }
    // Fetch all configuration file names.
    virtual ::grpc::Status FetchConfigFiles(::grpc::ClientContext* context, const ::main_app::Empty& request, ::main_app::ConfigList* response) = 0;
    std::unique_ptr< ::grpc::ClientAsyncResponseReaderInterface< ::main_app::ConfigList>> AsyncFetchConfigFiles(::grpc::ClientContext* context, const ::main_app::Empty& request, ::grpc::CompletionQueue* cq) {
      return std::unique_ptr< ::grpc::ClientAsyncResponseReaderInterface< ::main_app::ConfigList>>(AsyncFetchConfigFilesRaw(context, request, cq));
    }
    std::unique_ptr< ::grpc::ClientAsyncResponseReaderInterface< ::main_app::ConfigList>> PrepareAsyncFetchConfigFiles(::grpc::ClientContext* context, const ::main_app::Empty& request, ::grpc::CompletionQueue* cq) {
      return std::unique_ptr< ::grpc::ClientAsyncResponseReaderInterface< ::main_app::ConfigList>>(PrepareAsyncFetchConfigFilesRaw(context, request, cq));
    }
    // Use a configuration file to start a process.
    virtual ::grpc::Status UseConfigFile(::grpc::ClientContext* context, const ::main_app::ConfigName& request, ::main_app::Status* response) = 0;
    std::unique_ptr< ::grpc::ClientAsyncResponseReaderInterface< ::main_app::Status>> AsyncUseConfigFile(::grpc::ClientContext* context, const ::main_app::ConfigName& request, ::grpc::CompletionQueue* cq) {
      return std::unique_ptr< ::grpc::ClientAsyncResponseReaderInterface< ::main_app::Status>>(AsyncUseConfigFileRaw(context, request, cq));
    }
    std::unique_ptr< ::grpc::ClientAsyncResponseReaderInterface< ::main_app::Status>> PrepareAsyncUseConfigFile(::grpc::ClientContext* context, const ::main_app::ConfigName& request, ::grpc::CompletionQueue* cq) {
      return std::unique_ptr< ::grpc::ClientAsyncResponseReaderInterface< ::main_app::Status>>(PrepareAsyncUseConfigFileRaw(context, request, cq));
    }
    class async_interface {
     public:
      virtual ~async_interface() {}
      // Check if the server is connected.
      virtual void CheckConnection(::grpc::ClientContext* context, const ::main_app::Empty* request, ::main_app::ConnectionStatus* response, std::function<void(::grpc::Status)>) = 0;
      virtual void CheckConnection(::grpc::ClientContext* context, const ::main_app::Empty* request, ::main_app::ConnectionStatus* response, ::grpc::ClientUnaryReactor* reactor) = 0;
      // Fetch all configuration file names.
      virtual void FetchConfigFiles(::grpc::ClientContext* context, const ::main_app::Empty* request, ::main_app::ConfigList* response, std::function<void(::grpc::Status)>) = 0;
      virtual void FetchConfigFiles(::grpc::ClientContext* context, const ::main_app::Empty* request, ::main_app::ConfigList* response, ::grpc::ClientUnaryReactor* reactor) = 0;
      // Use a configuration file to start a process.
      virtual void UseConfigFile(::grpc::ClientContext* context, const ::main_app::ConfigName* request, ::main_app::Status* response, std::function<void(::grpc::Status)>) = 0;
      virtual void UseConfigFile(::grpc::ClientContext* context, const ::main_app::ConfigName* request, ::main_app::Status* response, ::grpc::ClientUnaryReactor* reactor) = 0;
    };
    typedef class async_interface experimental_async_interface;
    virtual class async_interface* async() { return nullptr; }
    class async_interface* experimental_async() { return async(); }
   private:
    virtual ::grpc::ClientAsyncResponseReaderInterface< ::main_app::ConnectionStatus>* AsyncCheckConnectionRaw(::grpc::ClientContext* context, const ::main_app::Empty& request, ::grpc::CompletionQueue* cq) = 0;
    virtual ::grpc::ClientAsyncResponseReaderInterface< ::main_app::ConnectionStatus>* PrepareAsyncCheckConnectionRaw(::grpc::ClientContext* context, const ::main_app::Empty& request, ::grpc::CompletionQueue* cq) = 0;
    virtual ::grpc::ClientAsyncResponseReaderInterface< ::main_app::ConfigList>* AsyncFetchConfigFilesRaw(::grpc::ClientContext* context, const ::main_app::Empty& request, ::grpc::CompletionQueue* cq) = 0;
    virtual ::grpc::ClientAsyncResponseReaderInterface< ::main_app::ConfigList>* PrepareAsyncFetchConfigFilesRaw(::grpc::ClientContext* context, const ::main_app::Empty& request, ::grpc::CompletionQueue* cq) = 0;
    virtual ::grpc::ClientAsyncResponseReaderInterface< ::main_app::Status>* AsyncUseConfigFileRaw(::grpc::ClientContext* context, const ::main_app::ConfigName& request, ::grpc::CompletionQueue* cq) = 0;
    virtual ::grpc::ClientAsyncResponseReaderInterface< ::main_app::Status>* PrepareAsyncUseConfigFileRaw(::grpc::ClientContext* context, const ::main_app::ConfigName& request, ::grpc::CompletionQueue* cq) = 0;
  };
  class Stub final : public StubInterface {
   public:
    Stub(const std::shared_ptr< ::grpc::ChannelInterface>& channel, const ::grpc::StubOptions& options = ::grpc::StubOptions());
    ::grpc::Status CheckConnection(::grpc::ClientContext* context, const ::main_app::Empty& request, ::main_app::ConnectionStatus* response) override;
    std::unique_ptr< ::grpc::ClientAsyncResponseReader< ::main_app::ConnectionStatus>> AsyncCheckConnection(::grpc::ClientContext* context, const ::main_app::Empty& request, ::grpc::CompletionQueue* cq) {
      return std::unique_ptr< ::grpc::ClientAsyncResponseReader< ::main_app::ConnectionStatus>>(AsyncCheckConnectionRaw(context, request, cq));
    }
    std::unique_ptr< ::grpc::ClientAsyncResponseReader< ::main_app::ConnectionStatus>> PrepareAsyncCheckConnection(::grpc::ClientContext* context, const ::main_app::Empty& request, ::grpc::CompletionQueue* cq) {
      return std::unique_ptr< ::grpc::ClientAsyncResponseReader< ::main_app::ConnectionStatus>>(PrepareAsyncCheckConnectionRaw(context, request, cq));
    }
    ::grpc::Status FetchConfigFiles(::grpc::ClientContext* context, const ::main_app::Empty& request, ::main_app::ConfigList* response) override;
    std::unique_ptr< ::grpc::ClientAsyncResponseReader< ::main_app::ConfigList>> AsyncFetchConfigFiles(::grpc::ClientContext* context, const ::main_app::Empty& request, ::grpc::CompletionQueue* cq) {
      return std::unique_ptr< ::grpc::ClientAsyncResponseReader< ::main_app::ConfigList>>(AsyncFetchConfigFilesRaw(context, request, cq));
    }
    std::unique_ptr< ::grpc::ClientAsyncResponseReader< ::main_app::ConfigList>> PrepareAsyncFetchConfigFiles(::grpc::ClientContext* context, const ::main_app::Empty& request, ::grpc::CompletionQueue* cq) {
      return std::unique_ptr< ::grpc::ClientAsyncResponseReader< ::main_app::ConfigList>>(PrepareAsyncFetchConfigFilesRaw(context, request, cq));
    }
    ::grpc::Status UseConfigFile(::grpc::ClientContext* context, const ::main_app::ConfigName& request, ::main_app::Status* response) override;
    std::unique_ptr< ::grpc::ClientAsyncResponseReader< ::main_app::Status>> AsyncUseConfigFile(::grpc::ClientContext* context, const ::main_app::ConfigName& request, ::grpc::CompletionQueue* cq) {
      return std::unique_ptr< ::grpc::ClientAsyncResponseReader< ::main_app::Status>>(AsyncUseConfigFileRaw(context, request, cq));
    }
    std::unique_ptr< ::grpc::ClientAsyncResponseReader< ::main_app::Status>> PrepareAsyncUseConfigFile(::grpc::ClientContext* context, const ::main_app::ConfigName& request, ::grpc::CompletionQueue* cq) {
      return std::unique_ptr< ::grpc::ClientAsyncResponseReader< ::main_app::Status>>(PrepareAsyncUseConfigFileRaw(context, request, cq));
    }
    class async final :
      public StubInterface::async_interface {
     public:
      void CheckConnection(::grpc::ClientContext* context, const ::main_app::Empty* request, ::main_app::ConnectionStatus* response, std::function<void(::grpc::Status)>) override;
      void CheckConnection(::grpc::ClientContext* context, const ::main_app::Empty* request, ::main_app::ConnectionStatus* response, ::grpc::ClientUnaryReactor* reactor) override;
      void FetchConfigFiles(::grpc::ClientContext* context, const ::main_app::Empty* request, ::main_app::ConfigList* response, std::function<void(::grpc::Status)>) override;
      void FetchConfigFiles(::grpc::ClientContext* context, const ::main_app::Empty* request, ::main_app::ConfigList* response, ::grpc::ClientUnaryReactor* reactor) override;
      void UseConfigFile(::grpc::ClientContext* context, const ::main_app::ConfigName* request, ::main_app::Status* response, std::function<void(::grpc::Status)>) override;
      void UseConfigFile(::grpc::ClientContext* context, const ::main_app::ConfigName* request, ::main_app::Status* response, ::grpc::ClientUnaryReactor* reactor) override;
     private:
      friend class Stub;
      explicit async(Stub* stub): stub_(stub) { }
      Stub* stub() { return stub_; }
      Stub* stub_;
    };
    class async* async() override { return &async_stub_; }

   private:
    std::shared_ptr< ::grpc::ChannelInterface> channel_;
    class async async_stub_{this};
    ::grpc::ClientAsyncResponseReader< ::main_app::ConnectionStatus>* AsyncCheckConnectionRaw(::grpc::ClientContext* context, const ::main_app::Empty& request, ::grpc::CompletionQueue* cq) override;
    ::grpc::ClientAsyncResponseReader< ::main_app::ConnectionStatus>* PrepareAsyncCheckConnectionRaw(::grpc::ClientContext* context, const ::main_app::Empty& request, ::grpc::CompletionQueue* cq) override;
    ::grpc::ClientAsyncResponseReader< ::main_app::ConfigList>* AsyncFetchConfigFilesRaw(::grpc::ClientContext* context, const ::main_app::Empty& request, ::grpc::CompletionQueue* cq) override;
    ::grpc::ClientAsyncResponseReader< ::main_app::ConfigList>* PrepareAsyncFetchConfigFilesRaw(::grpc::ClientContext* context, const ::main_app::Empty& request, ::grpc::CompletionQueue* cq) override;
    ::grpc::ClientAsyncResponseReader< ::main_app::Status>* AsyncUseConfigFileRaw(::grpc::ClientContext* context, const ::main_app::ConfigName& request, ::grpc::CompletionQueue* cq) override;
    ::grpc::ClientAsyncResponseReader< ::main_app::Status>* PrepareAsyncUseConfigFileRaw(::grpc::ClientContext* context, const ::main_app::ConfigName& request, ::grpc::CompletionQueue* cq) override;
    const ::grpc::internal::RpcMethod rpcmethod_CheckConnection_;
    const ::grpc::internal::RpcMethod rpcmethod_FetchConfigFiles_;
    const ::grpc::internal::RpcMethod rpcmethod_UseConfigFile_;
  };
  static std::unique_ptr<Stub> NewStub(const std::shared_ptr< ::grpc::ChannelInterface>& channel, const ::grpc::StubOptions& options = ::grpc::StubOptions());

  class Service : public ::grpc::Service {
   public:
    Service();
    virtual ~Service();
    // Check if the server is connected.
    virtual ::grpc::Status CheckConnection(::grpc::ServerContext* context, const ::main_app::Empty* request, ::main_app::ConnectionStatus* response);
    // Fetch all configuration file names.
    virtual ::grpc::Status FetchConfigFiles(::grpc::ServerContext* context, const ::main_app::Empty* request, ::main_app::ConfigList* response);
    // Use a configuration file to start a process.
    virtual ::grpc::Status UseConfigFile(::grpc::ServerContext* context, const ::main_app::ConfigName* request, ::main_app::Status* response);
  };
  template <class BaseClass>
  class WithAsyncMethod_CheckConnection : public BaseClass {
   private:
    void BaseClassMustBeDerivedFromService(const Service* /*service*/) {}
   public:
    WithAsyncMethod_CheckConnection() {
      ::grpc::Service::MarkMethodAsync(0);
    }
    ~WithAsyncMethod_CheckConnection() override {
      BaseClassMustBeDerivedFromService(this);
    }
    // disable synchronous version of this method
    ::grpc::Status CheckConnection(::grpc::ServerContext* /*context*/, const ::main_app::Empty* /*request*/, ::main_app::ConnectionStatus* /*response*/) override {
      abort();
      return ::grpc::Status(::grpc::StatusCode::UNIMPLEMENTED, "");
    }
    void RequestCheckConnection(::grpc::ServerContext* context, ::main_app::Empty* request, ::grpc::ServerAsyncResponseWriter< ::main_app::ConnectionStatus>* response, ::grpc::CompletionQueue* new_call_cq, ::grpc::ServerCompletionQueue* notification_cq, void *tag) {
      ::grpc::Service::RequestAsyncUnary(0, context, request, response, new_call_cq, notification_cq, tag);
    }
  };
  template <class BaseClass>
  class WithAsyncMethod_FetchConfigFiles : public BaseClass {
   private:
    void BaseClassMustBeDerivedFromService(const Service* /*service*/) {}
   public:
    WithAsyncMethod_FetchConfigFiles() {
      ::grpc::Service::MarkMethodAsync(1);
    }
    ~WithAsyncMethod_FetchConfigFiles() override {
      BaseClassMustBeDerivedFromService(this);
    }
    // disable synchronous version of this method
    ::grpc::Status FetchConfigFiles(::grpc::ServerContext* /*context*/, const ::main_app::Empty* /*request*/, ::main_app::ConfigList* /*response*/) override {
      abort();
      return ::grpc::Status(::grpc::StatusCode::UNIMPLEMENTED, "");
    }
    void RequestFetchConfigFiles(::grpc::ServerContext* context, ::main_app::Empty* request, ::grpc::ServerAsyncResponseWriter< ::main_app::ConfigList>* response, ::grpc::CompletionQueue* new_call_cq, ::grpc::ServerCompletionQueue* notification_cq, void *tag) {
      ::grpc::Service::RequestAsyncUnary(1, context, request, response, new_call_cq, notification_cq, tag);
    }
  };
  template <class BaseClass>
  class WithAsyncMethod_UseConfigFile : public BaseClass {
   private:
    void BaseClassMustBeDerivedFromService(const Service* /*service*/) {}
   public:
    WithAsyncMethod_UseConfigFile() {
      ::grpc::Service::MarkMethodAsync(2);
    }
    ~WithAsyncMethod_UseConfigFile() override {
      BaseClassMustBeDerivedFromService(this);
    }
    // disable synchronous version of this method
    ::grpc::Status UseConfigFile(::grpc::ServerContext* /*context*/, const ::main_app::ConfigName* /*request*/, ::main_app::Status* /*response*/) override {
      abort();
      return ::grpc::Status(::grpc::StatusCode::UNIMPLEMENTED, "");
    }
    void RequestUseConfigFile(::grpc::ServerContext* context, ::main_app::ConfigName* request, ::grpc::ServerAsyncResponseWriter< ::main_app::Status>* response, ::grpc::CompletionQueue* new_call_cq, ::grpc::ServerCompletionQueue* notification_cq, void *tag) {
      ::grpc::Service::RequestAsyncUnary(2, context, request, response, new_call_cq, notification_cq, tag);
    }
  };
  typedef WithAsyncMethod_CheckConnection<WithAsyncMethod_FetchConfigFiles<WithAsyncMethod_UseConfigFile<Service > > > AsyncService;
  template <class BaseClass>
  class WithCallbackMethod_CheckConnection : public BaseClass {
   private:
    void BaseClassMustBeDerivedFromService(const Service* /*service*/) {}
   public:
    WithCallbackMethod_CheckConnection() {
      ::grpc::Service::MarkMethodCallback(0,
          new ::grpc::internal::CallbackUnaryHandler< ::main_app::Empty, ::main_app::ConnectionStatus>(
            [this](
                   ::grpc::CallbackServerContext* context, const ::main_app::Empty* request, ::main_app::ConnectionStatus* response) { return this->CheckConnection(context, request, response); }));}
    void SetMessageAllocatorFor_CheckConnection(
        ::grpc::MessageAllocator< ::main_app::Empty, ::main_app::ConnectionStatus>* allocator) {
      ::grpc::internal::MethodHandler* const handler = ::grpc::Service::GetHandler(0);
      static_cast<::grpc::internal::CallbackUnaryHandler< ::main_app::Empty, ::main_app::ConnectionStatus>*>(handler)
              ->SetMessageAllocator(allocator);
    }
    ~WithCallbackMethod_CheckConnection() override {
      BaseClassMustBeDerivedFromService(this);
    }
    // disable synchronous version of this method
    ::grpc::Status CheckConnection(::grpc::ServerContext* /*context*/, const ::main_app::Empty* /*request*/, ::main_app::ConnectionStatus* /*response*/) override {
      abort();
      return ::grpc::Status(::grpc::StatusCode::UNIMPLEMENTED, "");
    }
    virtual ::grpc::ServerUnaryReactor* CheckConnection(
      ::grpc::CallbackServerContext* /*context*/, const ::main_app::Empty* /*request*/, ::main_app::ConnectionStatus* /*response*/)  { return nullptr; }
  };
  template <class BaseClass>
  class WithCallbackMethod_FetchConfigFiles : public BaseClass {
   private:
    void BaseClassMustBeDerivedFromService(const Service* /*service*/) {}
   public:
    WithCallbackMethod_FetchConfigFiles() {
      ::grpc::Service::MarkMethodCallback(1,
          new ::grpc::internal::CallbackUnaryHandler< ::main_app::Empty, ::main_app::ConfigList>(
            [this](
                   ::grpc::CallbackServerContext* context, const ::main_app::Empty* request, ::main_app::ConfigList* response) { return this->FetchConfigFiles(context, request, response); }));}
    void SetMessageAllocatorFor_FetchConfigFiles(
        ::grpc::MessageAllocator< ::main_app::Empty, ::main_app::ConfigList>* allocator) {
      ::grpc::internal::MethodHandler* const handler = ::grpc::Service::GetHandler(1);
      static_cast<::grpc::internal::CallbackUnaryHandler< ::main_app::Empty, ::main_app::ConfigList>*>(handler)
              ->SetMessageAllocator(allocator);
    }
    ~WithCallbackMethod_FetchConfigFiles() override {
      BaseClassMustBeDerivedFromService(this);
    }
    // disable synchronous version of this method
    ::grpc::Status FetchConfigFiles(::grpc::ServerContext* /*context*/, const ::main_app::Empty* /*request*/, ::main_app::ConfigList* /*response*/) override {
      abort();
      return ::grpc::Status(::grpc::StatusCode::UNIMPLEMENTED, "");
    }
    virtual ::grpc::ServerUnaryReactor* FetchConfigFiles(
      ::grpc::CallbackServerContext* /*context*/, const ::main_app::Empty* /*request*/, ::main_app::ConfigList* /*response*/)  { return nullptr; }
  };
  template <class BaseClass>
  class WithCallbackMethod_UseConfigFile : public BaseClass {
   private:
    void BaseClassMustBeDerivedFromService(const Service* /*service*/) {}
   public:
    WithCallbackMethod_UseConfigFile() {
      ::grpc::Service::MarkMethodCallback(2,
          new ::grpc::internal::CallbackUnaryHandler< ::main_app::ConfigName, ::main_app::Status>(
            [this](
                   ::grpc::CallbackServerContext* context, const ::main_app::ConfigName* request, ::main_app::Status* response) { return this->UseConfigFile(context, request, response); }));}
    void SetMessageAllocatorFor_UseConfigFile(
        ::grpc::MessageAllocator< ::main_app::ConfigName, ::main_app::Status>* allocator) {
      ::grpc::internal::MethodHandler* const handler = ::grpc::Service::GetHandler(2);
      static_cast<::grpc::internal::CallbackUnaryHandler< ::main_app::ConfigName, ::main_app::Status>*>(handler)
              ->SetMessageAllocator(allocator);
    }
    ~WithCallbackMethod_UseConfigFile() override {
      BaseClassMustBeDerivedFromService(this);
    }
    // disable synchronous version of this method
    ::grpc::Status UseConfigFile(::grpc::ServerContext* /*context*/, const ::main_app::ConfigName* /*request*/, ::main_app::Status* /*response*/) override {
      abort();
      return ::grpc::Status(::grpc::StatusCode::UNIMPLEMENTED, "");
    }
    virtual ::grpc::ServerUnaryReactor* UseConfigFile(
      ::grpc::CallbackServerContext* /*context*/, const ::main_app::ConfigName* /*request*/, ::main_app::Status* /*response*/)  { return nullptr; }
  };
  typedef WithCallbackMethod_CheckConnection<WithCallbackMethod_FetchConfigFiles<WithCallbackMethod_UseConfigFile<Service > > > CallbackService;
  typedef CallbackService ExperimentalCallbackService;
  template <class BaseClass>
  class WithGenericMethod_CheckConnection : public BaseClass {
   private:
    void BaseClassMustBeDerivedFromService(const Service* /*service*/) {}
   public:
    WithGenericMethod_CheckConnection() {
      ::grpc::Service::MarkMethodGeneric(0);
    }
    ~WithGenericMethod_CheckConnection() override {
      BaseClassMustBeDerivedFromService(this);
    }
    // disable synchronous version of this method
    ::grpc::Status CheckConnection(::grpc::ServerContext* /*context*/, const ::main_app::Empty* /*request*/, ::main_app::ConnectionStatus* /*response*/) override {
      abort();
      return ::grpc::Status(::grpc::StatusCode::UNIMPLEMENTED, "");
    }
  };
  template <class BaseClass>
  class WithGenericMethod_FetchConfigFiles : public BaseClass {
   private:
    void BaseClassMustBeDerivedFromService(const Service* /*service*/) {}
   public:
    WithGenericMethod_FetchConfigFiles() {
      ::grpc::Service::MarkMethodGeneric(1);
    }
    ~WithGenericMethod_FetchConfigFiles() override {
      BaseClassMustBeDerivedFromService(this);
    }
    // disable synchronous version of this method
    ::grpc::Status FetchConfigFiles(::grpc::ServerContext* /*context*/, const ::main_app::Empty* /*request*/, ::main_app::ConfigList* /*response*/) override {
      abort();
      return ::grpc::Status(::grpc::StatusCode::UNIMPLEMENTED, "");
    }
  };
  template <class BaseClass>
  class WithGenericMethod_UseConfigFile : public BaseClass {
   private:
    void BaseClassMustBeDerivedFromService(const Service* /*service*/) {}
   public:
    WithGenericMethod_UseConfigFile() {
      ::grpc::Service::MarkMethodGeneric(2);
    }
    ~WithGenericMethod_UseConfigFile() override {
      BaseClassMustBeDerivedFromService(this);
    }
    // disable synchronous version of this method
    ::grpc::Status UseConfigFile(::grpc::ServerContext* /*context*/, const ::main_app::ConfigName* /*request*/, ::main_app::Status* /*response*/) override {
      abort();
      return ::grpc::Status(::grpc::StatusCode::UNIMPLEMENTED, "");
    }
  };
  template <class BaseClass>
  class WithRawMethod_CheckConnection : public BaseClass {
   private:
    void BaseClassMustBeDerivedFromService(const Service* /*service*/) {}
   public:
    WithRawMethod_CheckConnection() {
      ::grpc::Service::MarkMethodRaw(0);
    }
    ~WithRawMethod_CheckConnection() override {
      BaseClassMustBeDerivedFromService(this);
    }
    // disable synchronous version of this method
    ::grpc::Status CheckConnection(::grpc::ServerContext* /*context*/, const ::main_app::Empty* /*request*/, ::main_app::ConnectionStatus* /*response*/) override {
      abort();
      return ::grpc::Status(::grpc::StatusCode::UNIMPLEMENTED, "");
    }
    void RequestCheckConnection(::grpc::ServerContext* context, ::grpc::ByteBuffer* request, ::grpc::ServerAsyncResponseWriter< ::grpc::ByteBuffer>* response, ::grpc::CompletionQueue* new_call_cq, ::grpc::ServerCompletionQueue* notification_cq, void *tag) {
      ::grpc::Service::RequestAsyncUnary(0, context, request, response, new_call_cq, notification_cq, tag);
    }
  };
  template <class BaseClass>
  class WithRawMethod_FetchConfigFiles : public BaseClass {
   private:
    void BaseClassMustBeDerivedFromService(const Service* /*service*/) {}
   public:
    WithRawMethod_FetchConfigFiles() {
      ::grpc::Service::MarkMethodRaw(1);
    }
    ~WithRawMethod_FetchConfigFiles() override {
      BaseClassMustBeDerivedFromService(this);
    }
    // disable synchronous version of this method
    ::grpc::Status FetchConfigFiles(::grpc::ServerContext* /*context*/, const ::main_app::Empty* /*request*/, ::main_app::ConfigList* /*response*/) override {
      abort();
      return ::grpc::Status(::grpc::StatusCode::UNIMPLEMENTED, "");
    }
    void RequestFetchConfigFiles(::grpc::ServerContext* context, ::grpc::ByteBuffer* request, ::grpc::ServerAsyncResponseWriter< ::grpc::ByteBuffer>* response, ::grpc::CompletionQueue* new_call_cq, ::grpc::ServerCompletionQueue* notification_cq, void *tag) {
      ::grpc::Service::RequestAsyncUnary(1, context, request, response, new_call_cq, notification_cq, tag);
    }
  };
  template <class BaseClass>
  class WithRawMethod_UseConfigFile : public BaseClass {
   private:
    void BaseClassMustBeDerivedFromService(const Service* /*service*/) {}
   public:
    WithRawMethod_UseConfigFile() {
      ::grpc::Service::MarkMethodRaw(2);
    }
    ~WithRawMethod_UseConfigFile() override {
      BaseClassMustBeDerivedFromService(this);
    }
    // disable synchronous version of this method
    ::grpc::Status UseConfigFile(::grpc::ServerContext* /*context*/, const ::main_app::ConfigName* /*request*/, ::main_app::Status* /*response*/) override {
      abort();
      return ::grpc::Status(::grpc::StatusCode::UNIMPLEMENTED, "");
    }
    void RequestUseConfigFile(::grpc::ServerContext* context, ::grpc::ByteBuffer* request, ::grpc::ServerAsyncResponseWriter< ::grpc::ByteBuffer>* response, ::grpc::CompletionQueue* new_call_cq, ::grpc::ServerCompletionQueue* notification_cq, void *tag) {
      ::grpc::Service::RequestAsyncUnary(2, context, request, response, new_call_cq, notification_cq, tag);
    }
  };
  template <class BaseClass>
  class WithRawCallbackMethod_CheckConnection : public BaseClass {
   private:
    void BaseClassMustBeDerivedFromService(const Service* /*service*/) {}
   public:
    WithRawCallbackMethod_CheckConnection() {
      ::grpc::Service::MarkMethodRawCallback(0,
          new ::grpc::internal::CallbackUnaryHandler< ::grpc::ByteBuffer, ::grpc::ByteBuffer>(
            [this](
                   ::grpc::CallbackServerContext* context, const ::grpc::ByteBuffer* request, ::grpc::ByteBuffer* response) { return this->CheckConnection(context, request, response); }));
    }
    ~WithRawCallbackMethod_CheckConnection() override {
      BaseClassMustBeDerivedFromService(this);
    }
    // disable synchronous version of this method
    ::grpc::Status CheckConnection(::grpc::ServerContext* /*context*/, const ::main_app::Empty* /*request*/, ::main_app::ConnectionStatus* /*response*/) override {
      abort();
      return ::grpc::Status(::grpc::StatusCode::UNIMPLEMENTED, "");
    }
    virtual ::grpc::ServerUnaryReactor* CheckConnection(
      ::grpc::CallbackServerContext* /*context*/, const ::grpc::ByteBuffer* /*request*/, ::grpc::ByteBuffer* /*response*/)  { return nullptr; }
  };
  template <class BaseClass>
  class WithRawCallbackMethod_FetchConfigFiles : public BaseClass {
   private:
    void BaseClassMustBeDerivedFromService(const Service* /*service*/) {}
   public:
    WithRawCallbackMethod_FetchConfigFiles() {
      ::grpc::Service::MarkMethodRawCallback(1,
          new ::grpc::internal::CallbackUnaryHandler< ::grpc::ByteBuffer, ::grpc::ByteBuffer>(
            [this](
                   ::grpc::CallbackServerContext* context, const ::grpc::ByteBuffer* request, ::grpc::ByteBuffer* response) { return this->FetchConfigFiles(context, request, response); }));
    }
    ~WithRawCallbackMethod_FetchConfigFiles() override {
      BaseClassMustBeDerivedFromService(this);
    }
    // disable synchronous version of this method
    ::grpc::Status FetchConfigFiles(::grpc::ServerContext* /*context*/, const ::main_app::Empty* /*request*/, ::main_app::ConfigList* /*response*/) override {
      abort();
      return ::grpc::Status(::grpc::StatusCode::UNIMPLEMENTED, "");
    }
    virtual ::grpc::ServerUnaryReactor* FetchConfigFiles(
      ::grpc::CallbackServerContext* /*context*/, const ::grpc::ByteBuffer* /*request*/, ::grpc::ByteBuffer* /*response*/)  { return nullptr; }
  };
  template <class BaseClass>
  class WithRawCallbackMethod_UseConfigFile : public BaseClass {
   private:
    void BaseClassMustBeDerivedFromService(const Service* /*service*/) {}
   public:
    WithRawCallbackMethod_UseConfigFile() {
      ::grpc::Service::MarkMethodRawCallback(2,
          new ::grpc::internal::CallbackUnaryHandler< ::grpc::ByteBuffer, ::grpc::ByteBuffer>(
            [this](
                   ::grpc::CallbackServerContext* context, const ::grpc::ByteBuffer* request, ::grpc::ByteBuffer* response) { return this->UseConfigFile(context, request, response); }));
    }
    ~WithRawCallbackMethod_UseConfigFile() override {
      BaseClassMustBeDerivedFromService(this);
    }
    // disable synchronous version of this method
    ::grpc::Status UseConfigFile(::grpc::ServerContext* /*context*/, const ::main_app::ConfigName* /*request*/, ::main_app::Status* /*response*/) override {
      abort();
      return ::grpc::Status(::grpc::StatusCode::UNIMPLEMENTED, "");
    }
    virtual ::grpc::ServerUnaryReactor* UseConfigFile(
      ::grpc::CallbackServerContext* /*context*/, const ::grpc::ByteBuffer* /*request*/, ::grpc::ByteBuffer* /*response*/)  { return nullptr; }
  };
  template <class BaseClass>
  class WithStreamedUnaryMethod_CheckConnection : public BaseClass {
   private:
    void BaseClassMustBeDerivedFromService(const Service* /*service*/) {}
   public:
    WithStreamedUnaryMethod_CheckConnection() {
      ::grpc::Service::MarkMethodStreamed(0,
        new ::grpc::internal::StreamedUnaryHandler<
          ::main_app::Empty, ::main_app::ConnectionStatus>(
            [this](::grpc::ServerContext* context,
                   ::grpc::ServerUnaryStreamer<
                     ::main_app::Empty, ::main_app::ConnectionStatus>* streamer) {
                       return this->StreamedCheckConnection(context,
                         streamer);
                  }));
    }
    ~WithStreamedUnaryMethod_CheckConnection() override {
      BaseClassMustBeDerivedFromService(this);
    }
    // disable regular version of this method
    ::grpc::Status CheckConnection(::grpc::ServerContext* /*context*/, const ::main_app::Empty* /*request*/, ::main_app::ConnectionStatus* /*response*/) override {
      abort();
      return ::grpc::Status(::grpc::StatusCode::UNIMPLEMENTED, "");
    }
    // replace default version of method with streamed unary
    virtual ::grpc::Status StreamedCheckConnection(::grpc::ServerContext* context, ::grpc::ServerUnaryStreamer< ::main_app::Empty,::main_app::ConnectionStatus>* server_unary_streamer) = 0;
  };
  template <class BaseClass>
  class WithStreamedUnaryMethod_FetchConfigFiles : public BaseClass {
   private:
    void BaseClassMustBeDerivedFromService(const Service* /*service*/) {}
   public:
    WithStreamedUnaryMethod_FetchConfigFiles() {
      ::grpc::Service::MarkMethodStreamed(1,
        new ::grpc::internal::StreamedUnaryHandler<
          ::main_app::Empty, ::main_app::ConfigList>(
            [this](::grpc::ServerContext* context,
                   ::grpc::ServerUnaryStreamer<
                     ::main_app::Empty, ::main_app::ConfigList>* streamer) {
                       return this->StreamedFetchConfigFiles(context,
                         streamer);
                  }));
    }
    ~WithStreamedUnaryMethod_FetchConfigFiles() override {
      BaseClassMustBeDerivedFromService(this);
    }
    // disable regular version of this method
    ::grpc::Status FetchConfigFiles(::grpc::ServerContext* /*context*/, const ::main_app::Empty* /*request*/, ::main_app::ConfigList* /*response*/) override {
      abort();
      return ::grpc::Status(::grpc::StatusCode::UNIMPLEMENTED, "");
    }
    // replace default version of method with streamed unary
    virtual ::grpc::Status StreamedFetchConfigFiles(::grpc::ServerContext* context, ::grpc::ServerUnaryStreamer< ::main_app::Empty,::main_app::ConfigList>* server_unary_streamer) = 0;
  };
  template <class BaseClass>
  class WithStreamedUnaryMethod_UseConfigFile : public BaseClass {
   private:
    void BaseClassMustBeDerivedFromService(const Service* /*service*/) {}
   public:
    WithStreamedUnaryMethod_UseConfigFile() {
      ::grpc::Service::MarkMethodStreamed(2,
        new ::grpc::internal::StreamedUnaryHandler<
          ::main_app::ConfigName, ::main_app::Status>(
            [this](::grpc::ServerContext* context,
                   ::grpc::ServerUnaryStreamer<
                     ::main_app::ConfigName, ::main_app::Status>* streamer) {
                       return this->StreamedUseConfigFile(context,
                         streamer);
                  }));
    }
    ~WithStreamedUnaryMethod_UseConfigFile() override {
      BaseClassMustBeDerivedFromService(this);
    }
    // disable regular version of this method
    ::grpc::Status UseConfigFile(::grpc::ServerContext* /*context*/, const ::main_app::ConfigName* /*request*/, ::main_app::Status* /*response*/) override {
      abort();
      return ::grpc::Status(::grpc::StatusCode::UNIMPLEMENTED, "");
    }
    // replace default version of method with streamed unary
    virtual ::grpc::Status StreamedUseConfigFile(::grpc::ServerContext* context, ::grpc::ServerUnaryStreamer< ::main_app::ConfigName,::main_app::Status>* server_unary_streamer) = 0;
  };
  typedef WithStreamedUnaryMethod_CheckConnection<WithStreamedUnaryMethod_FetchConfigFiles<WithStreamedUnaryMethod_UseConfigFile<Service > > > StreamedUnaryService;
  typedef Service SplitStreamedService;
  typedef WithStreamedUnaryMethod_CheckConnection<WithStreamedUnaryMethod_FetchConfigFiles<WithStreamedUnaryMethod_UseConfigFile<Service > > > StreamedService;
};

}  // namespace main_app


#endif  // GRPC_proto_2fmain_5fapp_2eproto__INCLUDED

///
/// FastWebSocket-Swift-Cxx-Bridge.hpp
/// This file was generated by nitrogen. DO NOT MODIFY THIS FILE.
/// https://github.com/mrousavy/nitro
/// Copyright © 2024 Marc Rousavy @ Margelo
///

#pragma once

// Forward declarations of C++ defined types
// Forward declaration of `ArrayBufferHolder` to properly resolve imports.
namespace NitroModules { class ArrayBufferHolder; }
// Forward declaration of `ArrayBuffer` to properly resolve imports.
namespace NitroModules { class ArrayBuffer; }
// Forward declaration of `HybridBlobSpec` to properly resolve imports.
namespace margelo::nitro::websocket { class HybridBlobSpec; }
// Forward declaration of `HybridWebSocketManagerSpec` to properly resolve imports.
namespace margelo::nitro::websocket { class HybridWebSocketManagerSpec; }
// Forward declaration of `HybridWebSocketSpec` to properly resolve imports.
namespace margelo::nitro::websocket { class HybridWebSocketSpec; }

// Forward declarations of Swift defined types
// Forward declaration of `HybridBlobSpecCxx` to properly resolve imports.
namespace FastWebSocket { class HybridBlobSpecCxx; }
// Forward declaration of `HybridWebSocketManagerSpecCxx` to properly resolve imports.
namespace FastWebSocket { class HybridWebSocketManagerSpecCxx; }
// Forward declaration of `HybridWebSocketSpecCxx` to properly resolve imports.
namespace FastWebSocket { class HybridWebSocketSpecCxx; }

// Include C++ defined types
#include "HybridBlobSpec.hpp"
#include "HybridWebSocketManagerSpec.hpp"
#include "HybridWebSocketSpec.hpp"
#include <NitroModules/ArrayBuffer.hpp>
#include <NitroModules/ArrayBufferHolder.hpp>
#include <NitroModules/PromiseHolder.hpp>
#include <functional>
#include <future>
#include <memory>
#include <string>
#include <vector>

/**
 * Contains specialized versions of C++ templated types so they can be accessed from Swift,
 * as well as helper functions to interact with those C++ types from Swift.
 */
namespace margelo::nitro::websocket::bridge::swift {

  // pragma MARK: std::shared_ptr<margelo::nitro::websocket::HybridBlobSpec>
  /**
   * Specialized version of `std::shared_ptr<margelo::nitro::websocket::HybridBlobSpec>`.
   */
  using std__shared_ptr_margelo__nitro__websocket__HybridBlobSpec_ = std::shared_ptr<margelo::nitro::websocket::HybridBlobSpec>;
  std::shared_ptr<margelo::nitro::websocket::HybridBlobSpec> create_std__shared_ptr_margelo__nitro__websocket__HybridBlobSpec_(void* _Nonnull swiftUnsafePointer);
  void* _Nonnull get_std__shared_ptr_margelo__nitro__websocket__HybridBlobSpec_(std__shared_ptr_margelo__nitro__websocket__HybridBlobSpec_ cppType);
  
  // pragma MARK: std::function<void(const std::string& /* selectedProtocol */)>
  /**
   * Specialized version of `std::function<void(const std::string&)>`.
   */
  using Func_void_std__string = std::function<void(const std::string& /* selectedProtocol */)>;
  /**
   * Wrapper class for a `std::function<void(const std::string& / * selectedProtocol * /)>`, this can be used from Swift.
   */
  class Func_void_std__string_Wrapper final {
  public:
    explicit Func_void_std__string_Wrapper(const std::function<void(const std::string& /* selectedProtocol */)>& func): _function(func) {}
    explicit Func_void_std__string_Wrapper(std::function<void(const std::string& /* selectedProtocol */)>&& func): _function(std::move(func)) {}
    inline void call(std::string selectedProtocol) const {
      _function(selectedProtocol);
    }
  private:
    std::function<void(const std::string& /* selectedProtocol */)> _function;
  };
  inline Func_void_std__string create_Func_void_std__string(void* _Nonnull closureHolder, void(* _Nonnull call)(void* _Nonnull /* closureHolder */, std::string), void(* _Nonnull destroy)(void* _Nonnull)) {
    std::shared_ptr<void> sharedClosureHolder(closureHolder, destroy);
    return Func_void_std__string([sharedClosureHolder, call](const std::string& selectedProtocol) -> void {
      call(sharedClosureHolder.get(), selectedProtocol);
    });
  }
  inline std::shared_ptr<Func_void_std__string_Wrapper> share_Func_void_std__string(const Func_void_std__string& value) {
    return std::make_shared<Func_void_std__string_Wrapper>(value);
  }
  
  // pragma MARK: std::function<void(double /* code */, const std::string& /* reason */)>
  /**
   * Specialized version of `std::function<void(double, const std::string&)>`.
   */
  using Func_void_double_std__string = std::function<void(double /* code */, const std::string& /* reason */)>;
  /**
   * Wrapper class for a `std::function<void(double / * code * /, const std::string& / * reason * /)>`, this can be used from Swift.
   */
  class Func_void_double_std__string_Wrapper final {
  public:
    explicit Func_void_double_std__string_Wrapper(const std::function<void(double /* code */, const std::string& /* reason */)>& func): _function(func) {}
    explicit Func_void_double_std__string_Wrapper(std::function<void(double /* code */, const std::string& /* reason */)>&& func): _function(std::move(func)) {}
    inline void call(double code, std::string reason) const {
      _function(code, reason);
    }
  private:
    std::function<void(double /* code */, const std::string& /* reason */)> _function;
  };
  inline Func_void_double_std__string create_Func_void_double_std__string(void* _Nonnull closureHolder, void(* _Nonnull call)(void* _Nonnull /* closureHolder */, double, std::string), void(* _Nonnull destroy)(void* _Nonnull)) {
    std::shared_ptr<void> sharedClosureHolder(closureHolder, destroy);
    return Func_void_double_std__string([sharedClosureHolder, call](double code, const std::string& reason) -> void {
      call(sharedClosureHolder.get(), code, reason);
    });
  }
  inline std::shared_ptr<Func_void_double_std__string_Wrapper> share_Func_void_double_std__string(const Func_void_double_std__string& value) {
    return std::make_shared<Func_void_double_std__string_Wrapper>(value);
  }
  
  // pragma MARK: std::function<void(const std::shared_ptr<ArrayBuffer>& /* buffer */)>
  /**
   * Specialized version of `std::function<void(const std::shared_ptr<ArrayBuffer>&)>`.
   */
  using Func_void_std__shared_ptr_ArrayBuffer_ = std::function<void(const std::shared_ptr<ArrayBuffer>& /* buffer */)>;
  /**
   * Wrapper class for a `std::function<void(const std::shared_ptr<ArrayBuffer>& / * buffer * /)>`, this can be used from Swift.
   */
  class Func_void_std__shared_ptr_ArrayBuffer__Wrapper final {
  public:
    explicit Func_void_std__shared_ptr_ArrayBuffer__Wrapper(const std::function<void(const std::shared_ptr<ArrayBuffer>& /* buffer */)>& func): _function(func) {}
    explicit Func_void_std__shared_ptr_ArrayBuffer__Wrapper(std::function<void(const std::shared_ptr<ArrayBuffer>& /* buffer */)>&& func): _function(std::move(func)) {}
    inline void call(ArrayBufferHolder buffer) const {
      _function(buffer.getArrayBuffer());
    }
  private:
    std::function<void(const std::shared_ptr<ArrayBuffer>& /* buffer */)> _function;
  };
  inline Func_void_std__shared_ptr_ArrayBuffer_ create_Func_void_std__shared_ptr_ArrayBuffer_(void* _Nonnull closureHolder, void(* _Nonnull call)(void* _Nonnull /* closureHolder */, ArrayBufferHolder), void(* _Nonnull destroy)(void* _Nonnull)) {
    std::shared_ptr<void> sharedClosureHolder(closureHolder, destroy);
    return Func_void_std__shared_ptr_ArrayBuffer_([sharedClosureHolder, call](const std::shared_ptr<ArrayBuffer>& buffer) -> void {
      call(sharedClosureHolder.get(), ArrayBufferHolder(buffer));
    });
  }
  inline std::shared_ptr<Func_void_std__shared_ptr_ArrayBuffer__Wrapper> share_Func_void_std__shared_ptr_ArrayBuffer_(const Func_void_std__shared_ptr_ArrayBuffer_& value) {
    return std::make_shared<Func_void_std__shared_ptr_ArrayBuffer__Wrapper>(value);
  }
  
  // pragma MARK: std::function<void(const std::shared_ptr<margelo::nitro::websocket::HybridBlobSpec>& /* blob */)>
  /**
   * Specialized version of `std::function<void(const std::shared_ptr<margelo::nitro::websocket::HybridBlobSpec>&)>`.
   */
  using Func_void_std__shared_ptr_margelo__nitro__websocket__HybridBlobSpec_ = std::function<void(const std::shared_ptr<margelo::nitro::websocket::HybridBlobSpec>& /* blob */)>;
  /**
   * Wrapper class for a `std::function<void(const std::shared_ptr<margelo::nitro::websocket::HybridBlobSpec>& / * blob * /)>`, this can be used from Swift.
   */
  class Func_void_std__shared_ptr_margelo__nitro__websocket__HybridBlobSpec__Wrapper final {
  public:
    explicit Func_void_std__shared_ptr_margelo__nitro__websocket__HybridBlobSpec__Wrapper(const std::function<void(const std::shared_ptr<margelo::nitro::websocket::HybridBlobSpec>& /* blob */)>& func): _function(func) {}
    explicit Func_void_std__shared_ptr_margelo__nitro__websocket__HybridBlobSpec__Wrapper(std::function<void(const std::shared_ptr<margelo::nitro::websocket::HybridBlobSpec>& /* blob */)>&& func): _function(std::move(func)) {}
    inline void call(std::shared_ptr<margelo::nitro::websocket::HybridBlobSpec> blob) const {
      _function(blob);
    }
  private:
    std::function<void(const std::shared_ptr<margelo::nitro::websocket::HybridBlobSpec>& /* blob */)> _function;
  };
  inline Func_void_std__shared_ptr_margelo__nitro__websocket__HybridBlobSpec_ create_Func_void_std__shared_ptr_margelo__nitro__websocket__HybridBlobSpec_(void* _Nonnull closureHolder, void(* _Nonnull call)(void* _Nonnull /* closureHolder */, std::shared_ptr<margelo::nitro::websocket::HybridBlobSpec>), void(* _Nonnull destroy)(void* _Nonnull)) {
    std::shared_ptr<void> sharedClosureHolder(closureHolder, destroy);
    return Func_void_std__shared_ptr_margelo__nitro__websocket__HybridBlobSpec_([sharedClosureHolder, call](const std::shared_ptr<margelo::nitro::websocket::HybridBlobSpec>& blob) -> void {
      call(sharedClosureHolder.get(), blob);
    });
  }
  inline std::shared_ptr<Func_void_std__shared_ptr_margelo__nitro__websocket__HybridBlobSpec__Wrapper> share_Func_void_std__shared_ptr_margelo__nitro__websocket__HybridBlobSpec_(const Func_void_std__shared_ptr_margelo__nitro__websocket__HybridBlobSpec_& value) {
    return std::make_shared<Func_void_std__shared_ptr_margelo__nitro__websocket__HybridBlobSpec__Wrapper>(value);
  }
  
  // pragma MARK: std::shared_ptr<margelo::nitro::websocket::HybridWebSocketSpec>
  /**
   * Specialized version of `std::shared_ptr<margelo::nitro::websocket::HybridWebSocketSpec>`.
   */
  using std__shared_ptr_margelo__nitro__websocket__HybridWebSocketSpec_ = std::shared_ptr<margelo::nitro::websocket::HybridWebSocketSpec>;
  std::shared_ptr<margelo::nitro::websocket::HybridWebSocketSpec> create_std__shared_ptr_margelo__nitro__websocket__HybridWebSocketSpec_(void* _Nonnull swiftUnsafePointer);
  void* _Nonnull get_std__shared_ptr_margelo__nitro__websocket__HybridWebSocketSpec_(std__shared_ptr_margelo__nitro__websocket__HybridWebSocketSpec_ cppType);
  
  // pragma MARK: std::vector<std::string>
  /**
   * Specialized version of `std::vector<std::string>`.
   */
  using std__vector_std__string_ = std::vector<std::string>;
  inline std::vector<std::string> create_std__vector_std__string_(size_t size) {
    std::vector<std::string> vector;
    vector.reserve(size);
    return vector;
  }
  
  // pragma MARK: std::shared_ptr<margelo::nitro::websocket::HybridWebSocketManagerSpec>
  /**
   * Specialized version of `std::shared_ptr<margelo::nitro::websocket::HybridWebSocketManagerSpec>`.
   */
  using std__shared_ptr_margelo__nitro__websocket__HybridWebSocketManagerSpec_ = std::shared_ptr<margelo::nitro::websocket::HybridWebSocketManagerSpec>;
  std::shared_ptr<margelo::nitro::websocket::HybridWebSocketManagerSpec> create_std__shared_ptr_margelo__nitro__websocket__HybridWebSocketManagerSpec_(void* _Nonnull swiftUnsafePointer);
  void* _Nonnull get_std__shared_ptr_margelo__nitro__websocket__HybridWebSocketManagerSpec_(std__shared_ptr_margelo__nitro__websocket__HybridWebSocketManagerSpec_ cppType);
  
  // pragma MARK: PromiseHolder<std::shared_ptr<ArrayBuffer>>
  /**
   * Specialized version of `PromiseHolder<std::shared_ptr<ArrayBuffer>>`.
   */
  using PromiseHolder_std__shared_ptr_ArrayBuffer__ = PromiseHolder<std::shared_ptr<ArrayBuffer>>;
  inline PromiseHolder<std::shared_ptr<ArrayBuffer>> create_PromiseHolder_std__shared_ptr_ArrayBuffer__() {
    return PromiseHolder<std::shared_ptr<ArrayBuffer>>();
  }

} // namespace margelo::nitro::websocket::bridge::swift

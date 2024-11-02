///
/// ReactNativeFastWS-Swift-Cxx-Bridge.hpp
/// Fri Nov 01 2024
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

// Include C++ defined types
#if __has_include(<NitroModules/ArrayBuffer.hpp>)
 #include <NitroModules/ArrayBuffer.hpp>
#endif
#if __has_include(<NitroModules/ArrayBufferHolder.hpp>)
 #include <NitroModules/ArrayBufferHolder.hpp>
#endif
#if __has_include(<functional>)
 #include <functional>
#endif
#if __has_include(<memory>)
 #include <memory>
#endif
#if __has_include(<string>)
 #include <string>
#endif
#if __has_include(<vector>)
 #include <vector>
#endif

/**
 * Contains specialized versions of C++ templated types so they can be accessed from Swift,
 * as well as helper functions to interact with those C++ types from Swift.
 */
namespace margelo::nitro::grabbou::bridge::swift {

  /**
   * Specialized version of `std::function<void(const std::string&)>`.
   */
  using Func_void_std__string = std::function<void(const std::string& /* selectedProtocol */)>;
  /**
   * Wrapper class for a `std::function<void(const std::string& / * selectedProtocol * /)>`, this can be used from Swift.
   */
  class Func_void_std__string_Wrapper {
  public:
    explicit Func_void_std__string_Wrapper(const std::function<void(const std::string& /* selectedProtocol */)>& func): function(func) {}
    explicit Func_void_std__string_Wrapper(std::function<void(const std::string& /* selectedProtocol */)>&& func): function(std::move(func)) {}
  
    void call(std::string selectedProtocol) const {
      function(selectedProtocol);
    }
  
    std::function<void(const std::string& /* selectedProtocol */)> function;
  };
  inline Func_void_std__string create_Func_void_std__string(void* closureHolder, void(*call)(void* /* closureHolder */, std::string), void(*destroy)(void*)) {
    std::shared_ptr<void> sharedClosureHolder(closureHolder, destroy);
    return Func_void_std__string([sharedClosureHolder, call](const std::string& selectedProtocol) -> void {
      call(sharedClosureHolder.get(), selectedProtocol);
    });
  }
  inline std::shared_ptr<Func_void_std__string_Wrapper> share_Func_void_std__string(const Func_void_std__string& value) {
    return std::make_shared<Func_void_std__string_Wrapper>(value);
  }
  
  /**
   * Specialized version of `std::function<void(double, const std::string&)>`.
   */
  using Func_void_double_std__string = std::function<void(double /* code */, const std::string& /* reason */)>;
  /**
   * Wrapper class for a `std::function<void(double / * code * /, const std::string& / * reason * /)>`, this can be used from Swift.
   */
  class Func_void_double_std__string_Wrapper {
  public:
    explicit Func_void_double_std__string_Wrapper(const std::function<void(double /* code */, const std::string& /* reason */)>& func): function(func) {}
    explicit Func_void_double_std__string_Wrapper(std::function<void(double /* code */, const std::string& /* reason */)>&& func): function(std::move(func)) {}
  
    void call(double code, std::string reason) const {
      function(code, reason);
    }
  
    std::function<void(double /* code */, const std::string& /* reason */)> function;
  };
  inline Func_void_double_std__string create_Func_void_double_std__string(void* closureHolder, void(*call)(void* /* closureHolder */, double, std::string), void(*destroy)(void*)) {
    std::shared_ptr<void> sharedClosureHolder(closureHolder, destroy);
    return Func_void_double_std__string([sharedClosureHolder, call](double code, const std::string& reason) -> void {
      call(sharedClosureHolder.get(), code, reason);
    });
  }
  inline std::shared_ptr<Func_void_double_std__string_Wrapper> share_Func_void_double_std__string(const Func_void_double_std__string& value) {
    return std::make_shared<Func_void_double_std__string_Wrapper>(value);
  }
  
  /**
   * Specialized version of `std::function<void(const std::shared_ptr<ArrayBuffer>&)>`.
   */
  using Func_void_std__shared_ptr_ArrayBuffer_ = std::function<void(const std::shared_ptr<ArrayBuffer>& /* buffer */)>;
  /**
   * Wrapper class for a `std::function<void(const std::shared_ptr<ArrayBuffer>& / * buffer * /)>`, this can be used from Swift.
   */
  class Func_void_std__shared_ptr_ArrayBuffer__Wrapper {
  public:
    explicit Func_void_std__shared_ptr_ArrayBuffer__Wrapper(const std::function<void(const std::shared_ptr<ArrayBuffer>& /* buffer */)>& func): function(func) {}
    explicit Func_void_std__shared_ptr_ArrayBuffer__Wrapper(std::function<void(const std::shared_ptr<ArrayBuffer>& /* buffer */)>&& func): function(std::move(func)) {}
  
    void call(ArrayBufferHolder buffer) const {
      function(buffer.getArrayBuffer());
    }
  
    std::function<void(const std::shared_ptr<ArrayBuffer>& /* buffer */)> function;
  };
  inline Func_void_std__shared_ptr_ArrayBuffer_ create_Func_void_std__shared_ptr_ArrayBuffer_(void* closureHolder, void(*call)(void* /* closureHolder */, ArrayBufferHolder), void(*destroy)(void*)) {
    std::shared_ptr<void> sharedClosureHolder(closureHolder, destroy);
    return Func_void_std__shared_ptr_ArrayBuffer_([sharedClosureHolder, call](const std::shared_ptr<ArrayBuffer>& buffer) -> void {
      call(sharedClosureHolder.get(), ArrayBufferHolder(buffer));
    });
  }
  inline std::shared_ptr<Func_void_std__shared_ptr_ArrayBuffer__Wrapper> share_Func_void_std__shared_ptr_ArrayBuffer_(const Func_void_std__shared_ptr_ArrayBuffer_& value) {
    return std::make_shared<Func_void_std__shared_ptr_ArrayBuffer__Wrapper>(value);
  }
  
  /**
   * Specialized version of `std::vector<std::string>`.
   */
  using std__vector_std__string_ = std::vector<std::string>;
  inline std::vector<std::string> create_std__vector_std__string_(size_t size) {
    std::vector<std::string> vector;
    vector.reserve(size);
    return vector;
  }

} // namespace margelo::nitro::grabbou::bridge::swift
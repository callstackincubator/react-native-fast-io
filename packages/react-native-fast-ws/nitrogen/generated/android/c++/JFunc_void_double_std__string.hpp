///
/// JFunc_void_double_std__string.hpp
/// Fri Nov 01 2024
/// This file was generated by nitrogen. DO NOT MODIFY THIS FILE.
/// https://github.com/mrousavy/nitro
/// Copyright © 2024 Marc Rousavy @ Margelo
///

#pragma once

#include <fbjni/fbjni.h>
#include <functional>

#include <functional>
#include <string>

namespace margelo::nitro::websocket {

  using namespace facebook;

  /**
   * C++ representation of the callback Func_void_double_std__string.
   * This is a Kotlin `(code: Double, reason: String) -> Unit`, backed by a `std::function<...>`.
   */
  struct JFunc_void_double_std__string final: public jni::HybridClass<JFunc_void_double_std__string> {
  public:
    static jni::local_ref<JFunc_void_double_std__string::javaobject> fromCpp(const std::function<void(double /* code */, const std::string& /* reason */)>& func) {
      return JFunc_void_double_std__string::newObjectCxxArgs(func);
    }

  public:
    void call(const double& code, const jni::alias_ref<jni::JString>& reason) {
      return _func(code, reason->toStdString());
    }

  public:
    static auto constexpr kJavaDescriptor = "Lcom/margelo/nitro/websocket/Func_void_double_std__string;";
    static void registerNatives() {
      registerHybrid({makeNativeMethod("call", JFunc_void_double_std__string::call)});
    }

  private:
    explicit JFunc_void_double_std__string(const std::function<void(double /* code */, const std::string& /* reason */)>& func): _func(func) { }

  private:
    friend HybridBase;
    std::function<void(double /* code */, const std::string& /* reason */)> _func;
  };

} // namespace margelo::nitro::websocket

///
/// JHybridWebSocketSpec.cpp
/// Fri Nov 01 2024
/// This file was generated by nitrogen. DO NOT MODIFY THIS FILE.
/// https://github.com/mrousavy/nitro
/// Copyright © 2024 Marc Rousavy @ Margelo
///

#include "JHybridWebSocketSpec.hpp"

// Forward declaration of `ArrayBuffer` to properly resolve imports.
namespace NitroModules { class ArrayBuffer; }

#include <string>
#include <NitroModules/ArrayBuffer.hpp>
#include <NitroModules/JArrayBuffer.hpp>
#include <functional>
#include "JFunc_void_std__string.hpp"
#include "JFunc_void_double_std__string.hpp"
#include "JFunc_void_std__shared_ptr_ArrayBuffer_.hpp"

namespace margelo::nitro::grabbou {

  jni::local_ref<JHybridWebSocketSpec::jhybriddata> JHybridWebSocketSpec::initHybrid(jni::alias_ref<jhybridobject> jThis) {
    return makeCxxInstance(jThis);
  }

  void JHybridWebSocketSpec::registerNatives() {
    registerHybrid({
      makeNativeMethod("initHybrid", JHybridWebSocketSpec::initHybrid),
    });
  }

  size_t JHybridWebSocketSpec::getExternalMemorySize() noexcept {
    static const auto method = _javaPart->getClass()->getMethod<jlong()>("getMemorySize");
    return method(_javaPart);
  }

  // Properties
  

  // Methods
  void JHybridWebSocketSpec::send(const std::string& message) {
    static const auto method = _javaPart->getClass()->getMethod<void(jni::alias_ref<jni::JString> /* message */)>("send");
    method(_javaPart, jni::make_jstring(message));
  }
  void JHybridWebSocketSpec::sendArrayBuffer(const std::shared_ptr<ArrayBuffer>& buffer) {
    static const auto method = _javaPart->getClass()->getMethod<void(jni::alias_ref<JArrayBuffer::javaobject> /* buffer */)>("sendArrayBuffer");
    method(_javaPart, JArrayBuffer::wrap(buffer));
  }
  void JHybridWebSocketSpec::connect() {
    static const auto method = _javaPart->getClass()->getMethod<void()>("connect");
    method(_javaPart);
  }
  void JHybridWebSocketSpec::close() {
    static const auto method = _javaPart->getClass()->getMethod<void()>("close");
    method(_javaPart);
  }
  void JHybridWebSocketSpec::ping() {
    static const auto method = _javaPart->getClass()->getMethod<void()>("ping");
    method(_javaPart);
  }
  void JHybridWebSocketSpec::onOpen(const std::function<void(const std::string& /* selectedProtocol */)>& callback) {
    static const auto method = _javaPart->getClass()->getMethod<void(jni::alias_ref<JFunc_void_std__string::javaobject> /* callback */)>("onOpen");
    method(_javaPart, JFunc_void_std__string::fromCpp(callback));
  }
  void JHybridWebSocketSpec::onClose(const std::function<void(double /* code */, const std::string& /* reason */)>& callback) {
    static const auto method = _javaPart->getClass()->getMethod<void(jni::alias_ref<JFunc_void_double_std__string::javaobject> /* callback */)>("onClose");
    method(_javaPart, JFunc_void_double_std__string::fromCpp(callback));
  }
  void JHybridWebSocketSpec::onError(const std::function<void(const std::string& /* error */)>& callback) {
    static const auto method = _javaPart->getClass()->getMethod<void(jni::alias_ref<JFunc_void_std__string::javaobject> /* callback */)>("onError");
    method(_javaPart, JFunc_void_std__string::fromCpp(callback));
  }
  void JHybridWebSocketSpec::onMessage(const std::function<void(const std::string& /* message */)>& callback) {
    static const auto method = _javaPart->getClass()->getMethod<void(jni::alias_ref<JFunc_void_std__string::javaobject> /* callback */)>("onMessage");
    method(_javaPart, JFunc_void_std__string::fromCpp(callback));
  }
  void JHybridWebSocketSpec::onArrayBuffer(const std::function<void(const std::shared_ptr<ArrayBuffer>& /* buffer */)>& callback) {
    static const auto method = _javaPart->getClass()->getMethod<void(jni::alias_ref<JFunc_void_std__shared_ptr_ArrayBuffer_::javaobject> /* callback */)>("onArrayBuffer");
    method(_javaPart, JFunc_void_std__shared_ptr_ArrayBuffer_::fromCpp(callback));
  }

} // namespace margelo::nitro::grabbou

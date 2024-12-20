///
/// JFunc_void_std__shared_ptr_ArrayBuffer_.hpp
/// This file was generated by nitrogen. DO NOT MODIFY THIS FILE.
/// https://github.com/mrousavy/nitro
/// Copyright © 2024 Marc Rousavy @ Margelo
///

#pragma once

#include <fbjni/fbjni.h>
#include <functional>

#include <functional>
#include <NitroModules/ArrayBuffer.hpp>
#include <NitroModules/JArrayBuffer.hpp>
#include <NitroModules/JUnit.hpp>

namespace margelo::nitro::fastio {

  using namespace facebook;

  /**
   * C++ representation of the callback Func_void_std__shared_ptr_ArrayBuffer_.
   * This is a Kotlin `(buffer: ArrayBuffer) -> Unit`, backed by a `std::function<...>`.
   */
  struct JFunc_void_std__shared_ptr_ArrayBuffer_ final: public jni::HybridClass<JFunc_void_std__shared_ptr_ArrayBuffer_> {
  public:
    static jni::local_ref<JFunc_void_std__shared_ptr_ArrayBuffer_::javaobject> fromCpp(const std::function<void(const std::shared_ptr<ArrayBuffer>& /* buffer */)>& func) {
      return JFunc_void_std__shared_ptr_ArrayBuffer_::newObjectCxxArgs(func);
    }

  public:
    void call(jni::alias_ref<JArrayBuffer::javaobject> buffer) {
      _func(buffer->cthis()->getArrayBuffer());
    }

  public:
    static auto constexpr kJavaDescriptor = "Lcom/margelo/nitro/fastio/Func_void_std__shared_ptr_ArrayBuffer_;";
    static void registerNatives() {
      registerHybrid({makeNativeMethod("call", JFunc_void_std__shared_ptr_ArrayBuffer_::call)});
    }

  private:
    explicit JFunc_void_std__shared_ptr_ArrayBuffer_(const std::function<void(const std::shared_ptr<ArrayBuffer>& /* buffer */)>& func): _func(func) { }

  private:
    friend HybridBase;
    std::function<void(const std::shared_ptr<ArrayBuffer>& /* buffer */)> _func;
  };

} // namespace margelo::nitro::fastio

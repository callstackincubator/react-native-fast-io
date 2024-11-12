///
/// JNativeFilePickerOptions.hpp
/// This file was generated by nitrogen. DO NOT MODIFY THIS FILE.
/// https://github.com/mrousavy/nitro
/// Copyright © 2024 Marc Rousavy @ Margelo
///

#pragma once

#include <fbjni/fbjni.h>
#include "NativeFilePickerOptions.hpp"

#include <optional>
#include <string>
#include <vector>

namespace margelo::nitro::fastio {

  using namespace facebook;

  /**
   * The C++ JNI bridge between the C++ struct "NativeFilePickerOptions" and the the Kotlin data class "NativeFilePickerOptions".
   */
  struct JNativeFilePickerOptions final: public jni::JavaClass<JNativeFilePickerOptions> {
  public:
    static auto constexpr kJavaDescriptor = "Lcom/margelo/nitro/fastio/NativeFilePickerOptions;";

  public:
    /**
     * Convert this Java/Kotlin-based struct to the C++ struct NativeFilePickerOptions by copying all values to C++.
     */
    [[maybe_unused]]
    NativeFilePickerOptions toCpp() const {
      static const auto clazz = javaClassStatic();
      static const auto fieldMultiple = clazz->getField<jni::JBoolean>("multiple");
      jni::local_ref<jni::JBoolean> multiple = this->getFieldValue(fieldMultiple);
      static const auto fieldStartIn = clazz->getField<jni::JString>("startIn");
      jni::local_ref<jni::JString> startIn = this->getFieldValue(fieldStartIn);
      static const auto fieldExtensions = clazz->getField<jni::JArrayClass<jni::JString>>("extensions");
      jni::local_ref<jni::JArrayClass<jni::JString>> extensions = this->getFieldValue(fieldExtensions);
      return NativeFilePickerOptions(
        multiple != nullptr ? std::make_optional(static_cast<bool>(multiple->value())) : std::nullopt,
        startIn != nullptr ? std::make_optional(startIn->toStdString()) : std::nullopt,
        extensions != nullptr ? std::make_optional([&]() {
          size_t __size = extensions->size();
          std::vector<std::string> __vector;
          __vector.reserve(__size);
          for (size_t __i = 0; __i < __size; __i++) {
            auto __element = extensions->getElement(__i);
            __vector.push_back(__element->toStdString());
          }
          return __vector;
        }()) : std::nullopt
      );
    }

  public:
    /**
     * Create a Java/Kotlin-based struct by copying all values from the given C++ struct to Java.
     */
    [[maybe_unused]]
    static jni::local_ref<JNativeFilePickerOptions::javaobject> fromCpp(const NativeFilePickerOptions& value) {
      return newInstance(
        value.multiple.has_value() ? jni::JBoolean::valueOf(value.multiple.value()) : nullptr,
        value.startIn.has_value() ? jni::make_jstring(value.startIn.value()) : nullptr,
        value.extensions.has_value() ? [&]() {
          size_t __size = value.extensions.value().size();
          jni::local_ref<jni::JArrayClass<jni::JString>> __array = jni::JArrayClass<jni::JString>::newArray(__size);
          for (size_t __i = 0; __i < __size; __i++) {
            const auto& __element = value.extensions.value()[__i];
            __array->setElement(__i, *jni::make_jstring(__element));
          }
          return __array;
        }() : nullptr
      );
    }
  };

} // namespace margelo::nitro::fastio
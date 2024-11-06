///
/// JBinaryType.hpp
/// This file was generated by nitrogen. DO NOT MODIFY THIS FILE.
/// https://github.com/mrousavy/nitro
/// Copyright © 2024 Marc Rousavy @ Margelo
///

#pragma once

#include <fbjni/fbjni.h>
#include "BinaryType.hpp"

namespace margelo::nitro::websocket {

  using namespace facebook;

  /**
   * The C++ JNI bridge between the C++ enum "BinaryType" and the the Kotlin enum "BinaryType".
   */
  struct JBinaryType final: public jni::JavaClass<JBinaryType> {
  public:
    static auto constexpr kJavaDescriptor = "Lcom/margelo/nitro/websocket/BinaryType;";

  public:
    /**
     * Convert this Java/Kotlin-based enum to the C++ enum BinaryType.
     */
    [[maybe_unused]]
    BinaryType toCpp() const {
      static const auto clazz = javaClassStatic();
      static const auto fieldOrdinal = clazz->getField<int>("ordinal");
      int ordinal = this->getFieldValue(fieldOrdinal);
      return static_cast<BinaryType>(ordinal);
    }

  public:
    /**
     * Create a Java/Kotlin-based enum with the given C++ enum's value.
     */
    [[maybe_unused]]
    static jni::alias_ref<JBinaryType> fromCpp(BinaryType value) {
      static const auto clazz = javaClassStatic();
      static const auto fieldARRAYBUFFER = clazz->getStaticField<JBinaryType>("ARRAYBUFFER");
      static const auto fieldBLOB = clazz->getStaticField<JBinaryType>("BLOB");
      
      switch (value) {
        case BinaryType::ARRAYBUFFER:
          return clazz->getStaticFieldValue(fieldARRAYBUFFER);
        case BinaryType::BLOB:
          return clazz->getStaticFieldValue(fieldBLOB);
        default:
          std::string stringValue = std::to_string(static_cast<int>(value));
          throw std::invalid_argument("Invalid enum value (" + stringValue + "!");
      }
    }
  };

} // namespace margelo::nitro::websocket

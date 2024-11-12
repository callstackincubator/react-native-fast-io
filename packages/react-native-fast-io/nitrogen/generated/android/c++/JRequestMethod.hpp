///
/// JRequestMethod.hpp
/// This file was generated by nitrogen. DO NOT MODIFY THIS FILE.
/// https://github.com/mrousavy/nitro
/// Copyright © 2024 Marc Rousavy @ Margelo
///

#pragma once

#include <fbjni/fbjni.h>
#include "RequestMethod.hpp"

namespace margelo::nitro::fastio {

  using namespace facebook;

  /**
   * The C++ JNI bridge between the C++ enum "RequestMethod" and the the Kotlin enum "RequestMethod".
   */
  struct JRequestMethod final: public jni::JavaClass<JRequestMethod> {
  public:
    static auto constexpr kJavaDescriptor = "Lcom/margelo/nitro/fastio/RequestMethod;";

  public:
    /**
     * Convert this Java/Kotlin-based enum to the C++ enum RequestMethod.
     */
    [[maybe_unused]]
    RequestMethod toCpp() const {
      static const auto clazz = javaClassStatic();
      static const auto fieldOrdinal = clazz->getField<int>("ordinal");
      int ordinal = this->getFieldValue(fieldOrdinal);
      return static_cast<RequestMethod>(ordinal);
    }

  public:
    /**
     * Create a Java/Kotlin-based enum with the given C++ enum's value.
     */
    [[maybe_unused]]
    static jni::alias_ref<JRequestMethod> fromCpp(RequestMethod value) {
      static const auto clazz = javaClassStatic();
      static const auto fieldPOST = clazz->getStaticField<JRequestMethod>("POST");
      static const auto fieldGET = clazz->getStaticField<JRequestMethod>("GET");
      
      switch (value) {
        case RequestMethod::POST:
          return clazz->getStaticFieldValue(fieldPOST);
        case RequestMethod::GET:
          return clazz->getStaticFieldValue(fieldGET);
        default:
          std::string stringValue = std::to_string(static_cast<int>(value));
          throw std::invalid_argument("Invalid enum value (" + stringValue + "!");
      }
    }
  };

} // namespace margelo::nitro::fastio

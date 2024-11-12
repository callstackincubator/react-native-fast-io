///
/// RequestOptions.hpp
/// This file was generated by nitrogen. DO NOT MODIFY THIS FILE.
/// https://github.com/mrousavy/nitro
/// Copyright © 2024 Marc Rousavy @ Margelo
///

#pragma once

#if __has_include(<NitroModules/JSIConverter.hpp>)
#include <NitroModules/JSIConverter.hpp>
#else
#error NitroModules cannot be found! Are you sure you installed NitroModules properly?
#endif
#if __has_include(<NitroModules/NitroDefines.hpp>)
#include <NitroModules/NitroDefines.hpp>
#else
#error NitroModules cannot be found! Are you sure you installed NitroModules properly?
#endif

// Forward declaration of `RequestMethod` to properly resolve imports.
namespace margelo::nitro::fastio { enum class RequestMethod; }
// Forward declaration of `HybridInputStreamSpec` to properly resolve imports.
namespace margelo::nitro::fastio { class HybridInputStreamSpec; }

#include <string>
#include "RequestMethod.hpp"
#include <optional>
#include <memory>
#include "HybridInputStreamSpec.hpp"

namespace margelo::nitro::fastio {

  /**
   * A struct which can be represented as a JavaScript object (RequestOptions).
   */
  struct RequestOptions {
  public:
    std::string url     SWIFT_PRIVATE;
    RequestMethod method     SWIFT_PRIVATE;
    std::optional<std::shared_ptr<margelo::nitro::fastio::HybridInputStreamSpec>> body     SWIFT_PRIVATE;

  public:
    explicit RequestOptions(std::string url, RequestMethod method, std::optional<std::shared_ptr<margelo::nitro::fastio::HybridInputStreamSpec>> body): url(url), method(method), body(body) {}
  };

} // namespace margelo::nitro::fastio

namespace margelo::nitro {

  using namespace margelo::nitro::fastio;

  // C++ RequestOptions <> JS RequestOptions (object)
  template <>
  struct JSIConverter<RequestOptions> {
    static inline RequestOptions fromJSI(jsi::Runtime& runtime, const jsi::Value& arg) {
      jsi::Object obj = arg.asObject(runtime);
      return RequestOptions(
        JSIConverter<std::string>::fromJSI(runtime, obj.getProperty(runtime, "url")),
        JSIConverter<RequestMethod>::fromJSI(runtime, obj.getProperty(runtime, "method")),
        JSIConverter<std::optional<std::shared_ptr<margelo::nitro::fastio::HybridInputStreamSpec>>>::fromJSI(runtime, obj.getProperty(runtime, "body"))
      );
    }
    static inline jsi::Value toJSI(jsi::Runtime& runtime, const RequestOptions& arg) {
      jsi::Object obj(runtime);
      obj.setProperty(runtime, "url", JSIConverter<std::string>::toJSI(runtime, arg.url));
      obj.setProperty(runtime, "method", JSIConverter<RequestMethod>::toJSI(runtime, arg.method));
      obj.setProperty(runtime, "body", JSIConverter<std::optional<std::shared_ptr<margelo::nitro::fastio::HybridInputStreamSpec>>>::toJSI(runtime, arg.body));
      return obj;
    }
    static inline bool canConvert(jsi::Runtime& runtime, const jsi::Value& value) {
      if (!value.isObject()) {
        return false;
      }
      jsi::Object obj = value.getObject(runtime);
      if (!JSIConverter<std::string>::canConvert(runtime, obj.getProperty(runtime, "url"))) return false;
      if (!JSIConverter<RequestMethod>::canConvert(runtime, obj.getProperty(runtime, "method"))) return false;
      if (!JSIConverter<std::optional<std::shared_ptr<margelo::nitro::fastio::HybridInputStreamSpec>>>::canConvert(runtime, obj.getProperty(runtime, "body"))) return false;
      return true;
    }
  };

} // namespace margelo::nitro

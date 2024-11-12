///
/// JHybridNetworkSpec.cpp
/// This file was generated by nitrogen. DO NOT MODIFY THIS FILE.
/// https://github.com/mrousavy/nitro
/// Copyright © 2024 Marc Rousavy @ Margelo
///

#include "JHybridNetworkSpec.hpp"

// Forward declaration of `RequestOptions` to properly resolve imports.
namespace margelo::nitro::fastio { struct RequestOptions; }
// Forward declaration of `RequestMethod` to properly resolve imports.
namespace margelo::nitro::fastio { enum class RequestMethod; }
// Forward declaration of `HybridInputStreamSpec` to properly resolve imports.
namespace margelo::nitro::fastio { class HybridInputStreamSpec; }

#include <future>
#include <NitroModules/JPromise.hpp>
#include "RequestOptions.hpp"
#include "JRequestOptions.hpp"
#include <string>
#include "RequestMethod.hpp"
#include "JRequestMethod.hpp"
#include <optional>
#include <memory>
#include "HybridInputStreamSpec.hpp"
#include "JHybridInputStreamSpec.hpp"
#include <NitroModules/JNISharedPtr.hpp>

namespace margelo::nitro::fastio {

  jni::local_ref<JHybridNetworkSpec::jhybriddata> JHybridNetworkSpec::initHybrid(jni::alias_ref<jhybridobject> jThis) {
    return makeCxxInstance(jThis);
  }

  void JHybridNetworkSpec::registerNatives() {
    registerHybrid({
      makeNativeMethod("initHybrid", JHybridNetworkSpec::initHybrid),
    });
  }

  size_t JHybridNetworkSpec::getExternalMemorySize() noexcept {
    static const auto method = _javaPart->getClass()->getMethod<jlong()>("getMemorySize");
    return method(_javaPart);
  }

  // Properties
  

  // Methods
  std::future<void> JHybridNetworkSpec::request(const RequestOptions& opts) {
    static const auto method = _javaPart->getClass()->getMethod<jni::local_ref<JPromise::javaobject>(jni::alias_ref<JRequestOptions> /* opts */)>("request");
    auto __result = method(_javaPart, JRequestOptions::fromCpp(opts));
    return [&]() {
      auto __promise = std::make_shared<std::promise<void>>();
      __result->cthis()->addOnResolvedListener([=](const jni::alias_ref<jni::JObject>& __boxedResult) {
        __promise->set_value();
      });
      __result->cthis()->addOnRejectedListener([=](const jni::alias_ref<jni::JString>& __message) {
        std::runtime_error __error(__message->toStdString());
        __promise->set_exception(std::make_exception_ptr(__error));
      });
      return __promise->get_future();
    }();
  }

} // namespace margelo::nitro::fastio

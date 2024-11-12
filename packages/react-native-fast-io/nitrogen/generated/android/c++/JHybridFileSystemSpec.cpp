///
/// JHybridFileSystemSpec.cpp
/// This file was generated by nitrogen. DO NOT MODIFY THIS FILE.
/// https://github.com/mrousavy/nitro
/// Copyright © 2024 Marc Rousavy @ Margelo
///

#include "JHybridFileSystemSpec.hpp"

// Forward declaration of `Metadata` to properly resolve imports.
namespace margelo::nitro::fastio { struct Metadata; }
// Forward declaration of `WellKnownDirectory` to properly resolve imports.
namespace margelo::nitro::fastio { enum class WellKnownDirectory; }
// Forward declaration of `NativeFilePickerOptions` to properly resolve imports.
namespace margelo::nitro::fastio { struct NativeFilePickerOptions; }

#include "Metadata.hpp"
#include "JMetadata.hpp"
#include <string>
#include <future>
#include <vector>
#include <NitroModules/JPromise.hpp>
#include "WellKnownDirectory.hpp"
#include "JWellKnownDirectory.hpp"
#include <optional>
#include "NativeFilePickerOptions.hpp"
#include "JNativeFilePickerOptions.hpp"

namespace margelo::nitro::fastio {

  jni::local_ref<JHybridFileSystemSpec::jhybriddata> JHybridFileSystemSpec::initHybrid(jni::alias_ref<jhybridobject> jThis) {
    return makeCxxInstance(jThis);
  }

  void JHybridFileSystemSpec::registerNatives() {
    registerHybrid({
      makeNativeMethod("initHybrid", JHybridFileSystemSpec::initHybrid),
    });
  }

  size_t JHybridFileSystemSpec::getExternalMemorySize() noexcept {
    static const auto method = _javaPart->getClass()->getMethod<jlong()>("getMemorySize");
    return method(_javaPart);
  }

  // Properties
  

  // Methods
  Metadata JHybridFileSystemSpec::getMetadata(const std::string& path) {
    static const auto method = _javaPart->getClass()->getMethod<jni::local_ref<JMetadata>(jni::alias_ref<jni::JString> /* path */)>("getMetadata");
    auto __result = method(_javaPart, jni::make_jstring(path));
    return __result->toCpp();
  }
  std::string JHybridFileSystemSpec::getWellKnownDirectoryPath(WellKnownDirectory directory) {
    static const auto method = _javaPart->getClass()->getMethod<jni::local_ref<jni::JString>(jni::alias_ref<JWellKnownDirectory> /* directory */)>("getWellKnownDirectoryPath");
    auto __result = method(_javaPart, JWellKnownDirectory::fromCpp(directory));
    return __result->toStdString();
  }
  std::future<std::vector<std::string>> JHybridFileSystemSpec::showOpenFilePicker(const std::optional<NativeFilePickerOptions>& options) {
    static const auto method = _javaPart->getClass()->getMethod<jni::local_ref<JPromise::javaobject>(jni::alias_ref<JNativeFilePickerOptions> /* options */)>("showOpenFilePicker");
    auto __result = method(_javaPart, options.has_value() ? JNativeFilePickerOptions::fromCpp(options.value()) : nullptr);
    return [&]() {
      auto __promise = std::make_shared<std::promise<std::vector<std::string>>>();
      __result->cthis()->addOnResolvedListener([=](const jni::alias_ref<jni::JObject>& __boxedResult) {
        auto __result = jni::static_ref_cast<jni::JArrayClass<jni::JString>>(__boxedResult);
        __promise->set_value([&]() {
          size_t __size = __result->size();
          std::vector<std::string> __vector;
          __vector.reserve(__size);
          for (size_t __i = 0; __i < __size; __i++) {
            auto __element = __result->getElement(__i);
            __vector.push_back(__element->toStdString());
          }
          return __vector;
        }());
      });
      __result->cthis()->addOnRejectedListener([=](const jni::alias_ref<jni::JString>& __message) {
        std::runtime_error __error(__message->toStdString());
        __promise->set_exception(std::make_exception_ptr(__error));
      });
      return __promise->get_future();
    }();
  }

} // namespace margelo::nitro::fastio

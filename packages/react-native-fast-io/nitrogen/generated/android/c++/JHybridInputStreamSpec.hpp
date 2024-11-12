///
/// HybridInputStreamSpec.hpp
/// This file was generated by nitrogen. DO NOT MODIFY THIS FILE.
/// https://github.com/mrousavy/nitro
/// Copyright © 2024 Marc Rousavy @ Margelo
///

#pragma once

#include <NitroModules/JHybridObject.hpp>
#include <fbjni/fbjni.h>
#include "HybridInputStreamSpec.hpp"




namespace margelo::nitro::fastio {

  using namespace facebook;

  class JHybridInputStreamSpec: public jni::HybridClass<JHybridInputStreamSpec, JHybridObject>,
                                public virtual HybridInputStreamSpec {
  public:
    static auto constexpr kJavaDescriptor = "Lcom/margelo/nitro/fastio/HybridInputStreamSpec;";
    static jni::local_ref<jhybriddata> initHybrid(jni::alias_ref<jhybridobject> jThis);
    static void registerNatives();

  protected:
    // C++ constructor (called from Java via `initHybrid()`)
    explicit JHybridInputStreamSpec(jni::alias_ref<jhybridobject> jThis) :
      HybridObject(HybridInputStreamSpec::TAG),
      _javaPart(jni::make_global(jThis)) {}

  public:
    virtual ~JHybridInputStreamSpec() {
      // Hermes GC can destroy JS objects on a non-JNI Thread.
      jni::ThreadScope::WithClassLoader([&] { _javaPart.reset(); });
    }

  public:
    size_t getExternalMemorySize() noexcept override;

  public:
    inline const jni::global_ref<JHybridInputStreamSpec::javaobject>& getJavaPart() const noexcept {
      return _javaPart;
    }

  public:
    // Properties
    

  public:
    // Methods
    bool hasBytesAvailable() override;
    double read(const std::shared_ptr<ArrayBuffer>& buffer, double maxLength) override;
    void open() override;
    void close() override;

  private:
    friend HybridBase;
    using HybridBase::HybridBase;
    jni::global_ref<JHybridInputStreamSpec::javaobject> _javaPart;
  };

} // namespace margelo::nitro::fastio
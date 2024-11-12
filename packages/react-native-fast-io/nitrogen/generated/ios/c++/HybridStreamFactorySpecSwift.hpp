///
/// HybridStreamFactorySpecSwift.hpp
/// This file was generated by nitrogen. DO NOT MODIFY THIS FILE.
/// https://github.com/mrousavy/nitro
/// Copyright © 2024 Marc Rousavy @ Margelo
///

#pragma once

#include "HybridStreamFactorySpec.hpp"

// Forward declaration of `HybridStreamFactorySpecCxx` to properly resolve imports.
namespace FastIO { class HybridStreamFactorySpecCxx; }

// Forward declaration of `HybridInputStreamSpec` to properly resolve imports.
namespace margelo::nitro::fastio { class HybridInputStreamSpec; }

#include <memory>
#include "HybridInputStreamSpec.hpp"
#include <string>

#if __has_include(<NitroModules/HybridContext.hpp>)
#include <NitroModules/HybridContext.hpp>
#else
#error NitroModules cannot be found! Are you sure you installed NitroModules properly?
#endif

#include "FastIO-Swift-Cxx-Umbrella.hpp"

namespace margelo::nitro::fastio {

  /**
   * The C++ part of HybridStreamFactorySpecCxx.swift.
   *
   * HybridStreamFactorySpecSwift (C++) accesses HybridStreamFactorySpecCxx (Swift), and might
   * contain some additional bridging code for C++ <> Swift interop.
   *
   * Since this obviously introduces an overhead, I hope at some point in
   * the future, HybridStreamFactorySpecCxx can directly inherit from the C++ class HybridStreamFactorySpec
   * to simplify the whole structure and memory management.
   */
  class HybridStreamFactorySpecSwift: public virtual HybridStreamFactorySpec {
  public:
    // Constructor from a Swift instance
    explicit HybridStreamFactorySpecSwift(const FastIO::HybridStreamFactorySpecCxx& swiftPart):
      HybridObject(HybridStreamFactorySpec::TAG),
      _swiftPart(swiftPart) { }

  public:
    // Get the Swift part
    inline FastIO::HybridStreamFactorySpecCxx getSwiftPart() noexcept { return _swiftPart; }

  public:
    // Get memory pressure
    inline size_t getExternalMemorySize() noexcept override {
      return _swiftPart.getMemorySize();
    }

  public:
    // Properties
    inline double getBufferSize() noexcept override {
      return _swiftPart.getBufferSize();
    }

  public:
    // Methods
    inline std::shared_ptr<margelo::nitro::fastio::HybridInputStreamSpec> createInputStream(const std::string& path) override {
      auto __result = _swiftPart.createInputStream(path);
      return __result;
    }

  private:
    FastIO::HybridStreamFactorySpecCxx _swiftPart;
  };

} // namespace margelo::nitro::fastio
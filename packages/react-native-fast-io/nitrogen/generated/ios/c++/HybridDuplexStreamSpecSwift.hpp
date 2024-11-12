///
/// HybridDuplexStreamSpecSwift.hpp
/// This file was generated by nitrogen. DO NOT MODIFY THIS FILE.
/// https://github.com/mrousavy/nitro
/// Copyright © 2024 Marc Rousavy @ Margelo
///

#pragma once

#include "HybridDuplexStreamSpec.hpp"

// Forward declaration of `HybridDuplexStreamSpecCxx` to properly resolve imports.
namespace FastIO { class HybridDuplexStreamSpecCxx; }

// Forward declaration of `HybridInputStreamSpec` to properly resolve imports.
namespace margelo::nitro::fastio { class HybridInputStreamSpec; }
// Forward declaration of `HybridOutputStreamSpec` to properly resolve imports.
namespace margelo::nitro::fastio { class HybridOutputStreamSpec; }

#include <memory>
#include "HybridInputStreamSpec.hpp"
#include "HybridOutputStreamSpec.hpp"

#if __has_include(<NitroModules/HybridContext.hpp>)
#include <NitroModules/HybridContext.hpp>
#else
#error NitroModules cannot be found! Are you sure you installed NitroModules properly?
#endif

#include "FastIO-Swift-Cxx-Umbrella.hpp"

namespace margelo::nitro::fastio {

  /**
   * The C++ part of HybridDuplexStreamSpecCxx.swift.
   *
   * HybridDuplexStreamSpecSwift (C++) accesses HybridDuplexStreamSpecCxx (Swift), and might
   * contain some additional bridging code for C++ <> Swift interop.
   *
   * Since this obviously introduces an overhead, I hope at some point in
   * the future, HybridDuplexStreamSpecCxx can directly inherit from the C++ class HybridDuplexStreamSpec
   * to simplify the whole structure and memory management.
   */
  class HybridDuplexStreamSpecSwift: public virtual HybridDuplexStreamSpec {
  public:
    // Constructor from a Swift instance
    explicit HybridDuplexStreamSpecSwift(const FastIO::HybridDuplexStreamSpecCxx& swiftPart):
      HybridObject(HybridDuplexStreamSpec::TAG),
      _swiftPart(swiftPart) { }

  public:
    // Get the Swift part
    inline FastIO::HybridDuplexStreamSpecCxx getSwiftPart() noexcept { return _swiftPart; }

  public:
    // Get memory pressure
    inline size_t getExternalMemorySize() noexcept override {
      return _swiftPart.getMemorySize();
    }

  public:
    // Properties
    inline std::shared_ptr<margelo::nitro::fastio::HybridInputStreamSpec> getInputStream() noexcept override {
      auto __result = _swiftPart.getInputStream();
      return __result;
    }
    inline void setInputStream(const std::shared_ptr<margelo::nitro::fastio::HybridInputStreamSpec>& inputStream) noexcept override {
      _swiftPart.setInputStream(inputStream);
    }
    inline std::shared_ptr<margelo::nitro::fastio::HybridOutputStreamSpec> getOutputStream() noexcept override {
      auto __result = _swiftPart.getOutputStream();
      return __result;
    }
    inline void setOutputStream(const std::shared_ptr<margelo::nitro::fastio::HybridOutputStreamSpec>& outputStream) noexcept override {
      _swiftPart.setOutputStream(outputStream);
    }

  public:
    // Methods
    

  private:
    FastIO::HybridDuplexStreamSpecCxx _swiftPart;
  };

} // namespace margelo::nitro::fastio
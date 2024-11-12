///
/// HybridCompressorSpec.hpp
/// This file was generated by nitrogen. DO NOT MODIFY THIS FILE.
/// https://github.com/mrousavy/nitro
/// Copyright © 2024 Marc Rousavy @ Margelo
///

#pragma once

#if __has_include(<NitroModules/HybridObject.hpp>)
#include <NitroModules/HybridObject.hpp>
#else
#error NitroModules cannot be found! Are you sure you installed NitroModules properly?
#endif

// Forward declaration of `ArrayBuffer` to properly resolve imports.
namespace NitroModules { class ArrayBuffer; }

#include <NitroModules/ArrayBuffer.hpp>

namespace margelo::nitro::fastio {

  using namespace margelo::nitro;

  /**
   * An abstract base class for `Compressor`
   * Inherit this class to create instances of `HybridCompressorSpec` in C++.
   * You must explicitly call `HybridObject`'s constructor yourself, because it is virtual.
   * @example
   * ```cpp
   * class HybridCompressor: public HybridCompressorSpec {
   * public:
   *   HybridCompressor(...): HybridObject(TAG) { ... }
   *   // ...
   * };
   * ```
   */
  class HybridCompressorSpec: public virtual HybridObject {
    public:
      // Constructor
      explicit HybridCompressorSpec(): HybridObject(TAG) { }

      // Destructor
      virtual ~HybridCompressorSpec() { }

    public:
      // Properties
      

    public:
      // Methods
      virtual std::shared_ptr<ArrayBuffer> compress(const std::shared_ptr<ArrayBuffer>& chunk) = 0;
      virtual std::shared_ptr<ArrayBuffer> finalize() = 0;

    protected:
      // Hybrid Setup
      void loadHybridMethods() override;

    protected:
      // Tag for logging
      static constexpr auto TAG = "Compressor";
  };

} // namespace margelo::nitro::fastio
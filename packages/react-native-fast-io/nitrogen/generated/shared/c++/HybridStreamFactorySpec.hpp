///
/// HybridStreamFactorySpec.hpp
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

// Forward declaration of `HybridInputStreamSpec` to properly resolve imports.
namespace margelo::nitro::fastio { class HybridInputStreamSpec; }

#include <memory>
#include "HybridInputStreamSpec.hpp"
#include <string>

namespace margelo::nitro::fastio {

  using namespace margelo::nitro;

  /**
   * An abstract base class for `StreamFactory`
   * Inherit this class to create instances of `HybridStreamFactorySpec` in C++.
   * You must explicitly call `HybridObject`'s constructor yourself, because it is virtual.
   * @example
   * ```cpp
   * class HybridStreamFactory: public HybridStreamFactorySpec {
   * public:
   *   HybridStreamFactory(...): HybridObject(TAG) { ... }
   *   // ...
   * };
   * ```
   */
  class HybridStreamFactorySpec: public virtual HybridObject {
    public:
      // Constructor
      explicit HybridStreamFactorySpec(): HybridObject(TAG) { }

      // Destructor
      virtual ~HybridStreamFactorySpec() { }

    public:
      // Properties
      virtual double getBufferSize() = 0;

    public:
      // Methods
      virtual std::shared_ptr<margelo::nitro::fastio::HybridInputStreamSpec> createInputStream(const std::string& path) = 0;

    protected:
      // Hybrid Setup
      void loadHybridMethods() override;

    protected:
      // Tag for logging
      static constexpr auto TAG = "StreamFactory";
  };

} // namespace margelo::nitro::fastio

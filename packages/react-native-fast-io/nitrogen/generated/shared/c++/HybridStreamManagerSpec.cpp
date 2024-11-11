///
/// HybridStreamManagerSpec.cpp
/// This file was generated by nitrogen. DO NOT MODIFY THIS FILE.
/// https://github.com/mrousavy/nitro
/// Copyright © 2024 Marc Rousavy @ Margelo
///

#include "HybridStreamManagerSpec.hpp"

namespace margelo::nitro::fastio {

  void HybridStreamManagerSpec::loadHybridMethods() {
    // load base methods/properties
    HybridObject::loadHybridMethods();
    // load custom methods/properties
    registerHybrids(this, [](Prototype& prototype) {
      prototype.registerHybridGetter("bufferSize", &HybridStreamManagerSpec::getBufferSize);
      prototype.registerHybridMethod("createInputStream", &HybridStreamManagerSpec::createInputStream);
    });
  }

} // namespace margelo::nitro::fastio

#pragma once

#include <memory>
#include "HybridCompressorFactorySpec.hpp"
#include "HybridCompressor.hpp"

namespace margelo::nitro::fastio {

class HybridCompressorFactory : public HybridCompressorFactorySpec {
public:
  HybridCompressorFactory() : HybridObject(TAG) {}
  
  std::shared_ptr<HybridCompressorSpec> create(CompressionAlgorithm algorithm) override;
};

}

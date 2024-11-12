#include "HybridCompressorFactory.hpp"
#include "HybridCompressor.hpp"
#include <stdexcept>

namespace margelo::nitro::fastio {

std::shared_ptr<HybridCompressorSpec> HybridCompressorFactory::create(CompressionAlgorithm algorithm) {
  return std::make_shared<HybridCompressor>(algorithm);
}

}

#pragma once

#include <memory>
#include <vector>
#include <zlib.h>

#include "HybridCompressorSpec.hpp"
#include "CompressionAlgorithm.hpp"

namespace margelo::nitro::fastio {

  class HybridCompressor : public HybridCompressorSpec {
  public:
    explicit HybridCompressor(CompressionAlgorithm algorithm);
    ~HybridCompressor();
    
    std::shared_ptr<ArrayBuffer> compress(const std::shared_ptr<ArrayBuffer>& chunk);
    std::shared_ptr<ArrayBuffer> finalize();
    
  private:
    std::shared_ptr<ArrayBuffer> compressBuffer(const uint8_t* source, size_t sourceSize, bool finalize = false);
    
    z_stream stream_{};
    CompressionAlgorithm format_;
    
    static const std::array<uint32_t, 256> CRC_TABLE;
  };
  
}

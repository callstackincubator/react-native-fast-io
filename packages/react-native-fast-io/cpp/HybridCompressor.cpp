#include "HybridCompressor.hpp"
#include <stdexcept>
#include <iostream>

namespace margelo::nitro::fastio {

HybridCompressor::HybridCompressor(CompressionAlgorithm algorithm) : HybridObject(TAG), format_(algorithm) {
  std::cout << "Initializing compressor with algorithm: " << static_cast<int>(algorithm) << std::endl;
  
  stream_.zalloc = Z_NULL;
  stream_.zfree = Z_NULL;
  stream_.opaque = Z_NULL;
  
  int windowBits = 15;
  switch (algorithm) {
    case CompressionAlgorithm::GZIP:
      windowBits += 16;
      break;
    case CompressionAlgorithm::DEFLATE_RAW:
      windowBits = -windowBits;
      break;
    default:
      break;
  }
  
  if (deflateInit2(&stream_, Z_DEFAULT_COMPRESSION, Z_DEFLATED, windowBits, 8, Z_DEFAULT_STRATEGY) != Z_OK) {
    throw std::runtime_error("Failed to initialize compression");
  }
}

HybridCompressor::~HybridCompressor() {
  deflateEnd(&stream_);
}

std::shared_ptr<ArrayBuffer> HybridCompressor::compressBuffer(const uint8_t* source, size_t sourceSize, bool finalize) {
  uint8_t* destBuffer = new uint8_t[64 * 1024];
  
  stream_.next_in = const_cast<Bytef*>(source);
  stream_.avail_in = sourceSize;
  stream_.next_out = destBuffer;
  stream_.avail_out = 64 * 1024;
  
  int status = deflate(&stream_, finalize ? Z_FINISH : Z_NO_FLUSH);
  
  if (status == Z_STREAM_ERROR) {
    delete[] destBuffer;
    throw std::runtime_error("Compression error");
  }
  
  if (stream_.avail_in != 0) {
    delete[] destBuffer;
    throw std::runtime_error("Unexpected remaining input data");
  }
  
  size_t currentOffset = 64 * 1024 - stream_.avail_out;
  
  return ArrayBuffer::makeBuffer(
                                 destBuffer,
                                 currentOffset,
                                 [=] { delete[] destBuffer; }
                                 );
}

std::shared_ptr<ArrayBuffer> HybridCompressor::compress(const std::shared_ptr<ArrayBuffer>& chunk) {
  return compressBuffer(
                        chunk->data(),
                        chunk->size()
                        );
}

std::shared_ptr<ArrayBuffer> HybridCompressor::finalize() {
  static const uint8_t dummyByte = 0;
  return compressBuffer(&dummyByte, 0, true);
}

}

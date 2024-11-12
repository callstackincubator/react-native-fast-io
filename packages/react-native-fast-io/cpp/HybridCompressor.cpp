#include "HybridCompressor.hpp"
#include <stdexcept>
#include <iostream>

namespace margelo::nitro::fastio {

HybridCompressor::HybridCompressor(CompressionAlgorithm algorithm) : HybridObject(TAG) {
  std::cout << "Initializing compressor with algorithm: " << static_cast<int>(algorithm) << std::endl;
  
  _stream.zalloc = Z_NULL;
  _stream.zfree = Z_NULL;
  _stream.opaque = Z_NULL;
  
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
  
  if (deflateInit2(&_stream, Z_DEFAULT_COMPRESSION, Z_DEFLATED, windowBits, 8, Z_DEFAULT_STRATEGY) != Z_OK) {
    throw std::runtime_error("Failed to initialize compression");
  }
}

HybridCompressor::~HybridCompressor() {
  deflateEnd(&_stream);
}

std::shared_ptr<ArrayBuffer> HybridCompressor::compressBuffer(const uint8_t* source, size_t sourceSize, bool finalize) {
  uint8_t* destBuffer = new uint8_t[64 * 1024];
  
  _stream.next_in = const_cast<Bytef*>(source);
  _stream.avail_in = sourceSize;
  _stream.next_out = destBuffer;
  _stream.avail_out = 64 * 1024;
  
  int status = deflate(&_stream, finalize ? Z_FINISH : Z_NO_FLUSH);
  
  if (status == Z_STREAM_ERROR) {
    delete[] destBuffer;
    throw std::runtime_error("Compression error");
  }
  
  if (_stream.avail_in != 0) {
    delete[] destBuffer;
    throw std::runtime_error("Unexpected remaining input data");
  }
  
  size_t currentOffset = 64 * 1024 - _stream.avail_out;
  
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

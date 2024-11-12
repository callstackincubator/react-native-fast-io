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
    throw std::runtime_error("Compression error");
  }
  
  if (stream_.avail_in != 0) {
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
  return compressBuffer(nullptr, 0, true);
}

std::vector<uint8_t> HybridCompressor::getGzipHeader() const {
  return {0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff};
}

std::vector<uint8_t> HybridCompressor::getGzipFooter() const {
  std::vector<uint8_t> footer(8);
  // CRC32
  footer[0] = stream_.adler & 0xff;
  footer[1] = (stream_.adler >> 8) & 0xff;
  footer[2] = (stream_.adler >> 16) & 0xff;
  footer[3] = (stream_.adler >> 24) & 0xff;
  // Size
  footer[4] = stream_.total_in & 0xff;
  footer[5] = (stream_.total_in >> 8) & 0xff;
  footer[6] = (stream_.total_in >> 16) & 0xff;
  footer[7] = (stream_.total_in >> 24) & 0xff;
  return footer;
}

std::vector<uint8_t> HybridCompressor::getDeflateHeader() const {
  return {0x78, 0x9c};
}
}

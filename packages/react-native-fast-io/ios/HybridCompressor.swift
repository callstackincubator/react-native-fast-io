//
//  HybridGzipCompressor.swift
//  FastIO
//
//  Created by Mike Grabowski on 11/11/2024.
//

import Foundation
import NitroModules
import Compression

class HybridCompressor : HybridCompressorSpec {
  private var stream: compression_stream
  private var status: compression_status
  
  private var format: CompressionAlgorithm
  private var totalSize: UInt32 = 0
  
  init(algorithm: CompressionAlgorithm) {
    stream = compression_stream()
    status = compression_stream_init(&stream, COMPRESSION_STREAM_ENCODE, COMPRESSION_ZLIB)
    format = algorithm
  }
  
  deinit {
    compression_stream_destroy(&stream)
  }
  
  private func compressBuffer(source: UnsafePointer<UInt8>, sourceSize: Int, finalize: Bool = false) throws -> ArrayBufferHolder {
    let headerSize: Int = if totalSize == 0 {
      switch format {
      case .gzip: 10
      case .deflate: 2
      case .deflateRaw: 0
      }
    } else {
      0
    }
    let footerSize = (format == .gzip && finalize) ? 8 : 0
    
    let destBufferSize = 64 * 1024 + headerSize + footerSize
    let destBuffer = UnsafeMutablePointer<UInt8>.allocate(capacity: destBufferSize)
    
    if headerSize > 0 {
      switch format {
      case .gzip:
        let header = getGzipHeader()
        destBuffer.update(from: header, count: header.count)
      case .deflate:
        let header = getDeflateHeader()
        destBuffer.update(from: header, count: header.count)
      default:
        break
      }
    }
    
    if format == .gzip && sourceSize > 0 {
      updateCRC32(data: source, size: sourceSize)
    }
    
    totalSize = (totalSize &+ UInt32(sourceSize)) & 0xffffffff
    
    stream.src_ptr = source
    stream.src_size = sourceSize
    stream.dst_ptr = destBuffer.advanced(by: headerSize)
    stream.dst_size = 64 * 1024
    
    status = compression_stream_process(&stream, Int32(finalize ? COMPRESSION_STREAM_FINALIZE.rawValue : 0))
    
    guard status != COMPRESSION_STATUS_ERROR else {
      destBuffer.deallocate()
      throw RuntimeError.error(withMessage: "Compression error")
    }
    
    guard stream.src_size == 0 else {
      destBuffer.deallocate()
      throw RuntimeError.error(withMessage: "Unexpected remaining input data.")
    }
    
    let currentOffset = headerSize + (64 * 1024 - stream.dst_size)
    
    if footerSize > 0 {
      let footer = getGzipFooter()
      destBuffer.advanced(by: currentOffset).update(from: footer, count: footer.count)
    }
    
    let deleteFunc = SwiftClosure {
      destBuffer.deallocate()
    }
    
    return ArrayBufferHolder.makeBuffer(destBuffer, currentOffset + footerSize, deleteFunc)
  }
  
  func compress(chunk: ArrayBufferHolder) throws -> ArrayBufferHolder {
    return try compressBuffer(
      source: UnsafePointer(chunk.data.assumingMemoryBound(to: UInt8.self)),
      sourceSize: chunk.size
    )
  }
  
  func finalize() throws -> ArrayBufferHolder {
    let emptyBuffer = UnsafeMutablePointer<UInt8>.allocate(capacity: 1)
    defer {
      emptyBuffer.deallocate()
    }
    
    return try compressBuffer(
      source: UnsafePointer(emptyBuffer),
      sourceSize: 0,
      finalize: true
    )
  }
  
  /* Gzip */
  private var crc32: UInt32 = 0
  
  private func getGzipHeader() -> [UInt8] {
    // GZIP header format:
    // 1F 8B - Magic number
    // 08    - Deflate compression method
    // 00    - Flags
    // 00 00 00 00 - Timestamp
    // 00    - Extra flags
    // FF    - OS (unknown)
    return [0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff]
  }
  
  private func getGzipFooter() -> [UInt8] {
    var footer = [UInt8](repeating: 0, count: 8)
    // CRC32 (4 bytes)
    footer[0] = UInt8(crc32 & 0xff)
    footer[1] = UInt8((crc32 >> 8) & 0xff)
    footer[2] = UInt8((crc32 >> 16) & 0xff)
    footer[3] = UInt8((crc32 >> 24) & 0xff)
    // Input size modulo 2^32 (4 bytes)
    footer[4] = UInt8(totalSize & 0xff)
    footer[5] = UInt8((totalSize >> 8) & 0xff)
    footer[6] = UInt8((totalSize >> 16) & 0xff)
    footer[7] = UInt8((totalSize >> 24) & 0xff)
    return footer
  }
  
  private func updateCRC32(data: UnsafePointer<UInt8>, size: Int) {
    var crc = ~crc32
    for i in 0..<size {
      let byte = data[i]
      crc = (crc >> 8) ^ crcTable[Int((crc & 0xFF) ^ UInt32(byte))]
    }
    crc32 = ~crc
  }
  
  /* Deflate */
  private func getDeflateHeader() -> [UInt8] {
    // Deflate header (CMF, FLG)
    return [0x78, 0x9c]
  }
  
  var hybridContext = margelo.nitro.HybridContext()
  var memorySize: Int {
    return getSizeOf(self)
  }
}

// CRC32 lookup table
private let crcTable: [UInt32] = {
  var table = [UInt32](repeating: 0, count: 256)
  for i in 0..<256 {
    var crc = UInt32(i)
    for _ in 0..<8 {
      crc = (crc >> 1) ^ ((crc & 1) == 1 ? 0xEDB88320 : 0)
    }
    table[i] = crc
  }
  return table
}()

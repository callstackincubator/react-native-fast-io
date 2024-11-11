//
//  HybridGzipCompressor.swift
//  FastIO
//
//  Created by Mike Grabowski on 11/11/2024.
//

import Foundation
import NitroModules
import Compression

class HybridGzipCompressor : HybridGzipCompressorSpec {
  private var stream: compression_stream
  private var status: compression_status
  
  init() {
    stream = compression_stream()
    status = compression_stream_init(&stream, COMPRESSION_STREAM_ENCODE, COMPRESSION_ZLIB)
  }
  
  deinit {
    compression_stream_destroy(&stream)
  }
  
  private func compressBuffer(source: UnsafePointer<UInt8>, sourceSize: Int, flags: Int32) throws -> ArrayBufferHolder {
    guard status == COMPRESSION_STATUS_OK else {
      throw RuntimeError.error(withMessage: "Compression error")
    }
    
    let destinationBufferSize = 64 * 1024
    let destinationBuffer = UnsafeMutablePointer<UInt8>.allocate(capacity: destinationBufferSize)
    
    stream.src_ptr = source
    stream.src_size = sourceSize
    stream.dst_ptr = destinationBuffer
    stream.dst_size = destinationBufferSize
    
    status = compression_stream_process(&stream, flags)
    
    guard status != COMPRESSION_STATUS_ERROR else {
      destinationBuffer.deallocate()
      throw RuntimeError.error(withMessage: "Compression error")
    }
    
    guard stream.src_size == 0 else {
      destinationBuffer.deallocate()
      throw RuntimeError.error(withMessage: "Buffer not fully compressed. This is currently not supported.")
    }
    
    let compressedSize = destinationBufferSize - stream.dst_size
    let deleteFunc = SwiftClosure {
      destinationBuffer.deallocate()
    }
    
    return ArrayBufferHolder.makeBuffer(destinationBuffer, compressedSize, deleteFunc)
  }
  
  func compress(chunk: ArrayBufferHolder) throws -> ArrayBufferHolder {
    return try compressBuffer(
      source: UnsafePointer(chunk.data.assumingMemoryBound(to: UInt8.self)),
      sourceSize: chunk.size,
      flags: 0
    )
  }
  
  func finalize() throws -> ArrayBufferHolder {
    let emptyBuffer = UnsafeMutablePointer<UInt8>.allocate(capacity: 1)
    defer { emptyBuffer.deallocate() }
    
    return try compressBuffer(
      source: UnsafePointer(emptyBuffer),
      sourceSize: 0,
      flags: Int32(COMPRESSION_STREAM_FINALIZE.rawValue)
    )
  }
  
  var hybridContext = margelo.nitro.HybridContext()
  var memorySize: Int {
    return getSizeOf(self)
  }
}

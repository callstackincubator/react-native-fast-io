//
//  HybridInputStream.swift
//  FastIO
//
//  Created by Mike Grabowski on 06/11/2024.
//

import Foundation
import NitroModules

class HybridInputStream : HybridInputStreamSpec {
  let stream : InputStream
  
  init(stream: InputStream) {
    self.stream = stream
  }
  
  func open() throws -> Void {
    stream.open()
  }
  
  func read() throws -> Promise<ArrayBufferHolder> {
    let promise = Promise<ArrayBufferHolder>()

    Task {
      let buffer = ArrayBufferHolder.allocate(size: Int(HybridStreamFactory.BUFFER_SIZE))
      let bytesRead = stream.read(buffer.data, maxLength: buffer.size)
      
      switch bytesRead {
      case 0:  // End of stream
        promise.resolve(withResult: ArrayBufferHolder.allocate(size: 0))
        
      case buffer.size:  // Full buffer used
        promise.resolve(withResult: buffer)
        
      case 1...:  // Partially filled, needs slice
        let slice = ArrayBufferHolder.allocate(size: bytesRead)
        memcpy(slice.data, buffer.data, bytesRead)
        promise.resolve(withResult: slice)
        
      default:  // Error
        promise.reject(withError: stream.streamError ?? 
          RuntimeError.error(withMessage: "Unexpected error reading stream"))
      }
    }
    
    return promise
  }
  
  func close() {
    stream.close()
  }
  
  var hybridContext = margelo.nitro.HybridContext()
  
  // Return size of the instance to inform JS GC about memory pressure
  var memorySize: Int {
    return getSizeOf(self)
  }
}

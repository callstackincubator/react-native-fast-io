//
//  HybridBlob.swift
//  FastWebSocket
//
//  Created by Mike Grabowski on 06/11/2024.
//

import Foundation

class HybridBlob : HybridBlobSpec {
  private let buffer: ArrayBufferHolder
  
  init (buffer: ArrayBufferHolder) {
    self.buffer = buffer
  }
  
  func arrayBuffer() throws -> Promise<ArrayBufferHolder> {
    return Promise.async {
      buffer
    }
  }
  
  var hybridContext = margelo.nitro.HybridContext()
  
  // Return size of the instance to inform JS GC about memory pressure
  var memorySize: Int {
    return getSizeOf(self)
  }
}

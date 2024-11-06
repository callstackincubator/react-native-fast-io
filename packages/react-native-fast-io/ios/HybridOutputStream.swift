//
//  HybridOutputStream.swift
//  FastIO
//
//  Created by Mike Grabowski on 07/11/2024.
//

import Foundation
import NitroModules

class HybridOutputStream : HybridOutputStreamSpec {
  let stream : OutputStream
  
  init(stream: OutputStream) {
    self.stream = stream
  }
  
  func hasSpaceAvailable() throws -> Bool {
    stream.hasSpaceAvailable
  }
  
  func open() throws -> Void {
    stream.open()
  }
  
  func write(buffer: ArrayBufferHolder, maxLength: Double) throws -> Double {
    Double(stream.write(buffer.data, maxLength: Int(maxLength)))
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


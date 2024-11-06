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
  
  func hasBytesAvailable() throws -> Bool {
    stream.hasBytesAvailable
  }
  
  func open() throws -> Void {
    stream.open()
  }
  
  func read(buffer: ArrayBufferHolder, maxLength: Double) throws -> Double {
    Double(stream.read(buffer.data, maxLength: Int(maxLength)))
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

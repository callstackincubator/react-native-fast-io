//
//  HybridStreamFactory.swift
//  FastIO
//
//  Created by Mike Grabowski on 12/11/2024.
//

import Foundation
import FastIOPrivate

class HybridStreamFactory : HybridStreamFactorySpec {
  static let BUFFER_SIZE = FASTIO_BUFFER_SIZE
  
  var bufferSize: Double {
    get {
      Double(HybridStreamFactory.BUFFER_SIZE)
    }
  }
  
  func createInputStream(path: String) -> any HybridInputStreamSpec {
    guard let stream = InputStream(fileAtPath: path) else {
      fatalError("Failed to create stream from \(path)")
    }
    return HybridInputStream(stream: stream)
  }
  
  var hybridContext = margelo.nitro.HybridContext()
  var memorySize: Int {
    return getSizeOf(self)
  }
}

//
//  HybridFileSystem.swift
//  FastIO
//
//  Created by Mike Grabowski on 06/11/2024.
//

import Foundation

class HybridFileSystem : HybridFileSystemSpec {
  func createInputStream(path: String) -> any HybridInputStreamSpec {
    let fakePath = Bundle.main.url(forResource: "img", withExtension: "jpg")!.path
    guard let stream = InputStream(fileAtPath: fakePath) else {
      fatalError("Failed to create stream from \(path)")
    }
    return HybridInputStream(stream: stream)
  }
  
  var hybridContext = margelo.nitro.HybridContext()
  
  // Return size of the instance to inform JS GC about memory pressure
  var memorySize: Int {
    return getSizeOf(self)
  }
}

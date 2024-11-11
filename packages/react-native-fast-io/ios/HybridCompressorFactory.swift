//
//  HybridCompressorFactory.swift
//  FastIO
//
//  Created by Mike Grabowski on 11/11/2024.
//

import Foundation

class HybridCompressorFactory : HybridCompressorFactorySpec {
  func create(algorithm: CompressionAlgorithm) throws -> (any HybridCompressorSpec) {
    return HybridCompressor(algorithm: algorithm)
  }
  
  var hybridContext = margelo.nitro.HybridContext()
  var memorySize: Int {
    return getSizeOf(self)
  }
}

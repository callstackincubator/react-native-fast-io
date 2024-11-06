//
//  HybridStyleSheet.swift
//  ReactNativeFastWS
//
//  Created by Mike Grabowski on 13/09/2024.
//

import NitroModules

class HybridWebSocketManager : HybridWebSocketManagerSpec {
  func create(url: String, protocols: [String]) throws -> any HybridWebSocketSpec {
    return HybridWebSocket(url: url, protocols: protocols)
  }
  
  var hybridContext = margelo.nitro.HybridContext()
  
  // Return size of the instance to inform JS GC about memory pressure
  var memorySize: Int {
    return getSizeOf(self)
  }
}

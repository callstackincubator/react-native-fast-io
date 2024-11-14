//
//  HybridStreamManager.swift
//  FastIO
//
//  Created by Mike Grabowski on 07/11/2024.
//

import Foundation

class HybridDuplexStream : HybridDuplexStreamSpec {
  var inputStream: (any HybridInputStreamSpec)
  var outputStream: (any HybridOutputStreamSpec)
  
  init() {
    var inputStreamRef: InputStream? = InputStream()
    var outputStreamRef: OutputStream? = OutputStream(toMemory: ())
    
    Stream.getBoundStreams(withBufferSize: Int(HybridStreamFactory.BUFFER_SIZE), inputStream: &inputStreamRef, outputStream: &outputStreamRef)
    
    guard let inputStreamRef, let outputStreamRef else {
      fatalError("Could not create streams")
    }
    
    inputStream = HybridInputStream(stream: inputStreamRef)
    outputStream = HybridOutputStream(stream: outputStreamRef)
  }
  
  var hybridContext = margelo.nitro.HybridContext()
  
  // Return size of the instance to inform JS GC about memory pressure
  var memorySize: Int {
    return getSizeOf(self)
  }
}

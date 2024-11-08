//
//  HybridFileSystem.swift
//  FastIO
//
//  Created by Mike Grabowski on 06/11/2024.
//

import Foundation
import NitroModules

class HybridFileSystem : HybridFileSystemSpec {
  func createInputStream(path: String) -> any HybridInputStreamSpec {
    let fakePath = Bundle.main.url(forResource: "img", withExtension: "jpg")!.path
    guard let stream = InputStream(fileAtPath: fakePath) else {
      fatalError("Failed to create stream from \(path)")
    }
    return HybridInputStream(stream: stream)
  }
  
  func getFileMetadata(path: String) throws -> Metadata {
    let fileURL = Bundle.main.url(forResource: "img", withExtension: "jpg")!
    let attributes = try FileManager.default.attributesOfItem(atPath: fileURL.path)
    
    return Metadata.init(
      name: fileURL.lastPathComponent,
      size: attributes[.size] as? Double ?? 0,
      lastModified: 0
    )
  }
  
  func showOpenFilePicker() throws -> Promise<[String]> {
    let promise = Promise<[String]>()
    
    Task {
      do {
        let filePicker = FilePicker()
        let files = try await filePicker.showOpenFilePicker()
        promise.resolve(withResult: files)
      } catch {
        promise.reject(withError: error)
      }
    }
    
    return promise
  }
  
  var hybridContext = margelo.nitro.HybridContext()
  
  // Return size of the instance to inform JS GC about memory pressure
  var memorySize: Int {
    return getSizeOf(self)
  }
}

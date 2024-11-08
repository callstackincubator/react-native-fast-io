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
    guard let stream = InputStream(fileAtPath: path) else {
      fatalError("Failed to create stream from \(path)")
    }
    return HybridInputStream(stream: stream)
  }
  
  func getFileMetadata(path: String) throws -> Metadata {
    let attributes = try FileManager.default.attributesOfItem(atPath: path)
    let fileURL = URL(fileURLWithPath: path)

    return Metadata.init(
      name: fileURL.lastPathComponent,
      path: path,
      root: "/",
      size: attributes[.size] as? Double ?? 0,
      lastModified: (attributes[.modificationDate] as? Date)?.timeIntervalSince1970 ?? 0 * 1000
    )
  }
  
  func showOpenFilePicker() throws -> Promise<[String]> {
    let filePicker = FilePicker()
    
    let promise = Promise<[String]>()
    
    Task {
      do {
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

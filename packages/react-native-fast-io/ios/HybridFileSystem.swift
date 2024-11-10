//
//  HybridFileSystem.swift
//  FastIO
//
//  Created by Mike Grabowski on 06/11/2024.
//

import Foundation
import NitroModules
import FastIOPrivate

class HybridFileSystem : NSObject, UIDocumentPickerDelegate, HybridFileSystemSpec {
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
  
  private var filePicker: (promise: Promise<[String]>, vc: UIDocumentPickerViewController)?
  func showOpenFilePicker() throws -> Promise<[String]> {
    if filePicker != nil {
      return Promise.rejected(withError: RuntimeError.error(withMessage: "File picker already open"))
    }
    
    let promise = Promise<[String]>()
    
    DispatchQueue.main.async {
      let documentPicker = UIDocumentPickerViewController(
        forOpeningContentTypes: [.item],
        asCopy: true
      )
      documentPicker.delegate = self
      
      guard let vc = RCTUtilsWrapper.getPresentedViewController() else {
        promise.reject(withError: RuntimeError.error(withMessage: "Cannot present file picker"))
        return
      }
      
      vc.present(documentPicker, animated: true)
      
      self.filePicker = (promise, documentPicker)
    }
    
    return promise
  }
  
  func documentPicker(_ controller: UIDocumentPickerViewController, didPickDocumentsAt urls: [URL]) {
    controller.dismiss(animated: true, completion: nil)
    
    filePicker?.promise.resolve(withResult: urls.map { $0.path })
    filePicker = nil
  }
  
  func documentPickerWasCancelled(_ controller: UIDocumentPickerViewController) {
    controller.dismiss(animated: true, completion: nil)
    
    filePicker?.promise.resolve(withResult: [])
    filePicker = nil
  }
  
  var hybridContext = margelo.nitro.HybridContext()
  
  // Return size of the instance to inform JS GC about memory pressure
  var memorySize: Int {
    return getSizeOf(self)
  }
  
  deinit {
    if let (promise, picker) = filePicker {
      promise.resolve(withResult: [])
      DispatchQueue.main.async {
        picker.dismiss(animated: false)
      }
    }
  }
}

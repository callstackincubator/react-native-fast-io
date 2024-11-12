//
//  HybridFileSystem.swift
//  FastIO
//
//  Created by Mike Grabowski on 06/11/2024.
//

import Foundation
import UniformTypeIdentifiers
import NitroModules
import FastIOPrivate

class HybridFileSystem : NSObject, UIDocumentPickerDelegate, HybridFileSystemSpec {
  func createInputStream(path: String) -> any HybridInputStreamSpec {
    guard let stream = InputStream(fileAtPath: path) else {
      fatalError("Failed to create stream from \(path)")
    }
    return HybridInputStream(stream: stream)
  }
  
  func getMetadata(path: String) throws -> Metadata {
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
  
  func getWellKnownDirectoryPath(directory: WellKnownDirectory) throws -> String {
    let url = switch directory {
    case .desktop:
      FileManager.default.urls(for: .desktopDirectory, in: .userDomainMask).first
    case .documents:
      FileManager.default.urls(for: .documentDirectory, in: .userDomainMask).first
    case .downloads:
      FileManager.default.urls(for: .downloadsDirectory, in: .userDomainMask).first
    case .music:
      FileManager.default.urls(for: .musicDirectory, in: .userDomainMask).first
    case .pictures:
      FileManager.default.urls(for: .picturesDirectory, in: .userDomainMask).first
    case .videos:
      FileManager.default.urls(for: .moviesDirectory, in: .userDomainMask).first
    }
    
    guard let url else {
      throw RuntimeError.error(withMessage: "Directory '\(directory)' is not available")
    }
    
    return url.path
  }
  
  private var filePicker: (promise: Promise<[String]>, vc: UIDocumentPickerViewController)?
  func showOpenFilePicker(options: NativeFilePickerOptions?) throws -> Promise<[String]> {
    if filePicker != nil {
      return Promise.rejected(withError: RuntimeError.error(withMessage: "File picker already open"))
    }
    
    let promise = Promise<[String]>()
    
    DispatchQueue.main.async {
      let utTypes: [UTType] = options?.extensions?
        .compactMap { ext in
          let cleanExt = ext.hasPrefix(".") ? String(ext.dropFirst()) : ext
          return UTType(filenameExtension: cleanExt)
        } ?? [.item]
      

      let documentPicker = UIDocumentPickerViewController(
        forOpeningContentTypes: utTypes,
        asCopy: true
      )
      documentPicker.delegate = self

      documentPicker.allowsMultipleSelection = options?.multiple ?? false

      if let startIn = options?.startIn {
        documentPicker.directoryURL = URL(fileURLWithPath: startIn, isDirectory: true)
      }
      
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

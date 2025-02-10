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

class HybridFileSystem : HybridFileSystemSpec {
  private class PickerDelegate: NSObject, UIDocumentPickerDelegate {
    weak var delegate: HybridFileSystem?
    
    func documentPicker(_ controller: UIDocumentPickerViewController, didPickDocumentsAt urls: [URL]) {
      controller.dismiss(animated: true, completion: nil)
      
      delegate?.filePicker?.promise.resolve(withResult: urls.map { $0.path })
      delegate?.filePicker = nil
    }
    
    func documentPickerWasCancelled(_ controller: UIDocumentPickerViewController) {
      controller.dismiss(animated: true, completion: nil)
      
      delegate?.filePicker?.promise.resolve(withResult: [])
      delegate?.filePicker = nil
    }
  }
  
  private var pickerDelegate = PickerDelegate()
  
  override init() {
    super.init()
    self.pickerDelegate.delegate = self
  }
  
  func getMetadata(path: String) throws -> Metadata {
    let attributes = try FileManager.default.attributesOfItem(atPath: path)
    let fileURL = URL(fileURLWithPath: path)
    
    let mimeType = UTType(filenameExtension: fileURL.pathExtension)?.preferredMIMEType ?? ""

    return Metadata.init(
      name: fileURL.lastPathComponent,
      path: path,
      root: "/",
      size: attributes[.size] as? Double ?? 0,
      type: mimeType,
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
    return Promise.rejected(withError: RuntimeError.error(withMessage: "File picker already open"))
    
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

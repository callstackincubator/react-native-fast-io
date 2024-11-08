//
//  FilePicker.swift
//  Pods
//
//  Created by Mike Grabowski on 08/11/2024.
//


import UIKit
import MobileCoreServices

class FilePicker : NSObject, UIDocumentPickerDelegate {
  private var continuation: CheckedContinuation<[String], Error>?
  
  func showOpenFilePicker() async throws -> [String] {
    return try await withCheckedThrowingContinuation { continuation in
      DispatchQueue.main.async {
        let documentPicker = UIDocumentPickerViewController(
          forOpeningContentTypes: [.item],
          asCopy: true
        )
        documentPicker.delegate = self
        
        if let scene = UIApplication.shared.connectedScenes
          .first(where: { $0.activationState == .foregroundActive }) as? UIWindowScene,
           let rootVC = scene.windows.first?.rootViewController {
          rootVC.present(documentPicker, animated: true)
        }
        
        self.continuation = continuation
      }
    }
  }
  
  func documentPicker(_ controller: UIDocumentPickerViewController, didPickDocumentsAt urls: [URL]) {
    controller.dismiss(animated: true, completion: nil)

    continuation?.resume(returning: urls.map { $0.path })
    continuation = nil
  }
  
  func documentPickerWasCancelled(_ controller: UIDocumentPickerViewController) {
    controller.dismiss(animated: true, completion: nil)

    continuation?.resume(returning: [])
    continuation = nil
  }
}

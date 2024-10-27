//
//  WebSocketDelegate.swift
//  ReactNativeFastWS
//
//  Created by Mike Grabowski on 15/09/2024.
//

import Foundation

class WebSocketDelegate: NSObject, URLSessionWebSocketDelegate {
  var onOpen: (() -> Void)?
  var onClose: ((URLSessionWebSocketTask.CloseCode, Data?) -> Void)?
  
  func urlSession(_ session: URLSession, webSocketTask: URLSessionWebSocketTask, didOpenWithProtocol protocol: String?) {
    onOpen?()
  }
  
  func urlSession(_ session: URLSession, webSocketTask: URLSessionWebSocketTask, didCloseWith closeCode: URLSessionWebSocketTask.CloseCode, reason: Data?) {
    onClose?(closeCode, reason)
  }
}

//
//  HybridStyle.swift
//  ReactNativeFastWS
//
//  Created by Mike Grabowski on 13/09/2024.
//

import NitroModules

class HybridWebSocket : HybridWebSocketSpec {
  var onOpen: (() -> Void)?
  var onClose: ((WebSocketClosed) -> Void)?
  var onError: ((WebSocketError) -> Void)?
  
  var onMessage: ((String) -> Void)?
  var onArrayBuffer: ((ArrayBufferHolder) -> Void)?
  
  let ws: URLSessionWebSocketTask
  let urlSession: URLSession
  
  public init (url: String) {
    let delegate = WebSocketDelegate()
        
    urlSession = URLSession(configuration: .default, delegate: delegate, delegateQueue: nil)
    ws = urlSession.webSocketTask(with: URL(string: url)!)
    
    delegate.onOpen = { [weak self] in
      self?.onOpen?()
    }
    
    delegate.onClose = { [weak self] closeCode, reason in
      let data = if let reason {
        String(bytes: reason, encoding: .utf8) ?? ""
      } else {
        ""
      }
      
      self?.onClose?(WebSocketClosed(code: Double(closeCode.rawValue), reason: data))
    }
    
    listen()
  }
  
  func connect() {
    ws.resume()
  }
  
  func close() {
    ws.cancel()
  }
  
  func listen()  {
    let stream = WebSocketStream(ws: ws)
    Task { [weak self] in
      do {
        for try await message in stream {
          guard let self else { return }
          switch message {
          case .string(let text):
            self.onMessage?(text)
          case .data(let content):
            self.processArrayBuffer(content)
          @unknown default:
            self.onError?(WebSocketError(message: "Unknown message type received - \(message)"))
          }
        }
      } catch {
        self?.onError?(WebSocketError(message: error.localizedDescription))
      }
    }
  }

  func processArrayBuffer(_ other: Data) {
    let data = UnsafeMutablePointer<UInt8>.allocate(capacity: other.count)
    other.copyBytes(to: data, count: other.count)
    
    let deleteFunc = SwiftClosure {
      data.deallocate()
    }
    
    self.onArrayBuffer?(ArrayBufferHolder.makeBuffer(data, other.count, deleteFunc))
  }
  
  func send(message: String) {
    ws.send(URLSessionWebSocketTask.Message.string(message)) { error in
      if let error {
        self.onError?(WebSocketError(message: error.localizedDescription))
      }
    }
  }
  
  func sendArrayBuffer(buffer: ArrayBufferHolder) throws {
    let data = Data(bytes: buffer.data, count: buffer.size)
    ws.send(.data(data)) { error in
      if let error {
        self.onError?(WebSocketError(message: error.localizedDescription))
      }
    }
  }
  
  func onOpen(callback: @escaping (() -> Void)) {
    onOpen = callback
  }
  
  func onClose(callback: @escaping ((WebSocketClosed) -> Void)) {
    onClose = callback
  }
  
  func onMessage(callback: @escaping ((String) -> Void)) {
    onMessage = callback
  }
  
  func onArrayBuffer(callback: @escaping ((ArrayBufferHolder) -> Void)) {
    onArrayBuffer = callback
  }
  
  func onError(callback: @escaping ((WebSocketError) -> Void)) {
    onError = callback
  }
  
  var hybridContext = margelo.nitro.HybridContext()
  var memorySize: Int {
    return getSizeOf(self)
  }
  
  deinit {
    urlSession.invalidateAndCancel()
  }
}

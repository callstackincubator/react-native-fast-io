//
//  HybridNetwork.swift
//  FastIO
//
//  Created by Mike Grabowski on 06/11/2024.
//

import Foundation
import NitroModules

class HybridNetwork : HybridNetworkSpec {
  func request(opts: RequestOptions) throws -> Promise<Void> {
    guard let requestUrl = URL(string: opts.url) else {
      return Promise.rejected(withError: NSError(domain: "Invalid URL: \(opts.url)", code: -1))
    }
    
    var request = URLRequest(url: requestUrl)
    request.httpMethod = opts.method.stringValue
    
    if let inputStream = opts.body as? HybridInputStream {
      request.httpBodyStream = inputStream.stream
    }
    
    let promise = Promise<Void>()
    
    Task {
      do {
        let (_, response) = try await URLSession.shared.data(for: request)
        
        let statusCode = (response as! HTTPURLResponse).statusCode
        if (200...299).contains(statusCode) {
          promise.resolve(withResult: ())
        } else {
          promise.reject(withError: NSError(
            domain: "HTTP Error",
            code: statusCode
          ))
        }
        
      } catch {
        promise.reject(withError: error)
      }
    }
    
    return promise
  }
}

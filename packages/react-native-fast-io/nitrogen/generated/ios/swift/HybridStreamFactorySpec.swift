///
/// HybridStreamFactorySpec.swift
/// This file was generated by nitrogen. DO NOT MODIFY THIS FILE.
/// https://github.com/mrousavy/nitro
/// Copyright © 2024 Marc Rousavy @ Margelo
///

import Foundation
import NitroModules

/// See ``HybridStreamFactorySpec``
public protocol HybridStreamFactorySpec_protocol: AnyObject {
  // Properties
  var bufferSize: Double { get }

  // Methods
  func createInputStream(path: String) throws -> (any HybridInputStreamSpec)
}

/// See ``HybridStreamFactorySpec``
public class HybridStreamFactorySpec_base: HybridObjectSpec {
  private weak var cxxWrapper: HybridStreamFactorySpec_cxx? = nil
  public func getCxxWrapper() -> HybridStreamFactorySpec_cxx {
  #if DEBUG
    guard self is HybridStreamFactorySpec else {
      fatalError("`self` is not a `HybridStreamFactorySpec`! Did you accidentally inherit from `HybridStreamFactorySpec_base` instead of `HybridStreamFactorySpec`?")
    }
  #endif
    if let cxxWrapper = self.cxxWrapper {
      return cxxWrapper
    } else {
      let cxxWrapper = HybridStreamFactorySpec_cxx(self as! HybridStreamFactorySpec)
      self.cxxWrapper = cxxWrapper
      return cxxWrapper
    }
  }
  public var memorySize: Int { return 0 }
}

/**
 * A Swift base-protocol representing the StreamFactory HybridObject.
 * Implement this protocol to create Swift-based instances of StreamFactory.
 * ```swift
 * class HybridStreamFactory : HybridStreamFactorySpec {
 *   // ...
 * }
 * ```
 */
public typealias HybridStreamFactorySpec = HybridStreamFactorySpec_protocol & HybridStreamFactorySpec_base

///
/// HybridFileSystemSpec.swift
/// This file was generated by nitrogen. DO NOT MODIFY THIS FILE.
/// https://github.com/mrousavy/nitro
/// Copyright © 2024 Marc Rousavy @ Margelo
///

import Foundation
import NitroModules

/// See ``HybridFileSystemSpec``
public protocol HybridFileSystemSpec_protocol: AnyObject {
  // Properties
  

  // Methods
  func getMetadata(path: String) throws -> Metadata
  func getWellKnownDirectoryPath(directory: WellKnownDirectory) throws -> String
  func showOpenFilePicker(options: NativeFilePickerOptions?) throws -> Promise<[String]>
}

/// See ``HybridFileSystemSpec``
public class HybridFileSystemSpec_base: HybridObjectSpec {
  private weak var cxxWrapper: HybridFileSystemSpec_cxx? = nil
  public func getCxxWrapper() -> HybridFileSystemSpec_cxx {
  #if DEBUG
    guard self is HybridFileSystemSpec else {
      fatalError("`self` is not a `HybridFileSystemSpec`! Did you accidentally inherit from `HybridFileSystemSpec_base` instead of `HybridFileSystemSpec`?")
    }
  #endif
    if let cxxWrapper = self.cxxWrapper {
      return cxxWrapper
    } else {
      let cxxWrapper = HybridFileSystemSpec_cxx(self as! HybridFileSystemSpec)
      self.cxxWrapper = cxxWrapper
      return cxxWrapper
    }
  }
  public var memorySize: Int { return 0 }
}

/**
 * A Swift base-protocol representing the FileSystem HybridObject.
 * Implement this protocol to create Swift-based instances of FileSystem.
 * ```swift
 * class HybridFileSystem : HybridFileSystemSpec {
 *   // ...
 * }
 * ```
 */
public typealias HybridFileSystemSpec = HybridFileSystemSpec_protocol & HybridFileSystemSpec_base

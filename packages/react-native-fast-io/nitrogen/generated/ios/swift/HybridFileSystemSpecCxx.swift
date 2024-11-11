///
/// HybridFileSystemSpecCxx.swift
/// This file was generated by nitrogen. DO NOT MODIFY THIS FILE.
/// https://github.com/mrousavy/nitro
/// Copyright © 2024 Marc Rousavy @ Margelo
///

import Foundation
import NitroModules

/**
 * Helper class for converting instances of `HybridFileSystemSpecCxx` from- and to unsafe pointers.
 * This is useful to pass Swift classes to C++, without having to strongly type the C++ function signature.
 * The actual Swift type can be included in the .cpp file, without having to forward-declare anything in .hpp.
 */
public final class HybridFileSystemSpecCxxUnsafe {
  /**
   * Casts a `HybridFileSystemSpecCxx` instance to a retained unsafe raw pointer.
   * This acquires one additional strong reference on the object!
   */
  public static func toUnsafe(_ instance: HybridFileSystemSpecCxx) -> UnsafeMutableRawPointer {
    return Unmanaged.passRetained(instance).toOpaque()
  }

  /**
   * Casts an unsafe pointer to a `HybridFileSystemSpecCxx`.
   * The pointer has to be a retained opaque `Unmanaged<HybridFileSystemSpecCxx>`.
   * This removes one strong reference from the object!
   */
  public static func fromUnsafe(_ pointer: UnsafeMutableRawPointer) -> HybridFileSystemSpecCxx {
    return Unmanaged<HybridFileSystemSpecCxx>.fromOpaque(pointer).takeRetainedValue()
  }
}

/**
 * A class implementation that bridges HybridFileSystemSpec over to C++.
 * In C++, we cannot use Swift protocols - so we need to wrap it in a class to make it strongly defined.
 *
 * Also, some Swift types need to be bridged with special handling:
 * - Enums need to be wrapped in Structs, otherwise they cannot be accessed bi-directionally (Swift bug: https://github.com/swiftlang/swift/issues/75330)
 * - Other HybridObjects need to be wrapped/unwrapped from the Swift TCxx wrapper
 * - Throwing methods need to be wrapped with a Result<T, Error> type, as exceptions cannot be propagated to C++
 */
public class HybridFileSystemSpecCxx {
  /**
   * The Swift <> C++ bridge's namespace (`margelo::nitro::fastio::bridge::swift`)
   * from `FastIO-Swift-Cxx-Bridge.hpp`.
   * This contains specialized C++ templates, and C++ helper functions that can be accessed from Swift.
   */
  public typealias bridge = margelo.nitro.fastio.bridge.swift

  /**
   * Holds an instance of the `HybridFileSystemSpec` Swift protocol.
   */
  private var __implementation: any HybridFileSystemSpec

  /**
   * Create a new `HybridFileSystemSpecCxx` that wraps the given `HybridFileSystemSpec`.
   * All properties and methods bridge to C++ types.
   */
  public init(_ implementation: some HybridFileSystemSpec) {
    self.__implementation = implementation
    /* no base class */
  }

  /**
   * Get the actual `HybridFileSystemSpec` instance this class wraps.
   */
  @inline(__always)
  public func getHybridFileSystemSpec() -> any HybridFileSystemSpec {
    return __implementation
  }

  /**
   * Contains a (weak) reference to the C++ HybridObject to cache it.
   */
  public var hybridContext: margelo.nitro.HybridContext {
    @inline(__always)
    get {
      return self.__implementation.hybridContext
    }
    @inline(__always)
    set {
      self.__implementation.hybridContext = newValue
    }
  }

  /**
   * Get the memory size of the Swift class (plus size of any other allocations)
   * so the JS VM can properly track it and garbage-collect the JS object if needed.
   */
  @inline(__always)
  public var memorySize: Int {
    return self.__implementation.memorySize
  }

  // Properties
  

  // Methods
  @inline(__always)
  public func getMetadata(path: std.string) -> Metadata {
    do {
      let __result = try self.__implementation.getMetadata(path: String(path))
      return __result
    } catch {
      let __message = "\(error.localizedDescription)"
      fatalError("Swift errors can currently not be propagated to C++! See https://github.com/swiftlang/swift/issues/75290 (Error: \(__message))")
    }
  }
  
  @inline(__always)
  public func getWellKnownDirectoryPath(directory: Int32) -> std.string {
    do {
      let __result = try self.__implementation.getWellKnownDirectoryPath(directory: margelo.nitro.fastio.WellKnownDirectory(rawValue: directory)!)
      return std.string(__result)
    } catch {
      let __message = "\(error.localizedDescription)"
      fatalError("Swift errors can currently not be propagated to C++! See https://github.com/swiftlang/swift/issues/75290 (Error: \(__message))")
    }
  }
  
  @inline(__always)
  public func showOpenFilePicker(options: bridge.std__optional_NativeFilePickerOptions_) -> bridge.PromiseHolder_std__vector_std__string__ {
    do {
      let __result = try self.__implementation.showOpenFilePicker(options: { () -> NativeFilePickerOptions? in
        if let __unwrapped = options.value {
          return __unwrapped
        } else {
          return nil
        }
      }())
      return { () -> bridge.PromiseHolder_std__vector_std__string__ in
        let __promiseHolder = bridge.create_PromiseHolder_std__vector_std__string__()
        __result
          .then({ __result in __promiseHolder.resolve({ () -> bridge.std__vector_std__string_ in
        var __vector = bridge.create_std__vector_std__string_(__result.count)
        for __item in __result {
          __vector.push_back(std.string(__item))
        }
        return __vector
      }()) })
          .catch({ __error in __promiseHolder.reject(std.string(String(describing: __error))) })
        return __promiseHolder
      }()
    } catch {
      let __message = "\(error.localizedDescription)"
      fatalError("Swift errors can currently not be propagated to C++! See https://github.com/swiftlang/swift/issues/75290 (Error: \(__message))")
    }
  }
}

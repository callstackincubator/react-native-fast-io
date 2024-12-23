///
/// HybridFileSystemSpec_cxx.swift
/// This file was generated by nitrogen. DO NOT MODIFY THIS FILE.
/// https://github.com/mrousavy/nitro
/// Copyright © 2024 Marc Rousavy @ Margelo
///

import Foundation
import NitroModules

/**
 * A class implementation that bridges HybridFileSystemSpec over to C++.
 * In C++, we cannot use Swift protocols - so we need to wrap it in a class to make it strongly defined.
 *
 * Also, some Swift types need to be bridged with special handling:
 * - Enums need to be wrapped in Structs, otherwise they cannot be accessed bi-directionally (Swift bug: https://github.com/swiftlang/swift/issues/75330)
 * - Other HybridObjects need to be wrapped/unwrapped from the Swift TCxx wrapper
 * - Throwing methods need to be wrapped with a Result<T, Error> type, as exceptions cannot be propagated to C++
 */
public class HybridFileSystemSpec_cxx {
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
   * Holds a weak pointer to the C++ class that wraps the Swift class.
   */
  private var __cxxPart: bridge.std__weak_ptr_margelo__nitro__fastio__HybridFileSystemSpec_

  /**
   * Create a new `HybridFileSystemSpec_cxx` that wraps the given `HybridFileSystemSpec`.
   * All properties and methods bridge to C++ types.
   */
  public init(_ implementation: any HybridFileSystemSpec) {
    self.__implementation = implementation
    self.__cxxPart = .init()
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
   * Casts this instance to a retained unsafe raw pointer.
   * This acquires one additional strong reference on the object!
   */
  public func toUnsafe() -> UnsafeMutableRawPointer {
    return Unmanaged.passRetained(self).toOpaque()
  }

  /**
   * Casts an unsafe pointer to a `HybridFileSystemSpec_cxx`.
   * The pointer has to be a retained opaque `Unmanaged<HybridFileSystemSpec_cxx>`.
   * This removes one strong reference from the object!
   */
  public class func fromUnsafe(_ pointer: UnsafeMutableRawPointer) -> HybridFileSystemSpec_cxx {
    return Unmanaged<HybridFileSystemSpec_cxx>.fromOpaque(pointer).takeRetainedValue()
  }

  /**
   * Gets (or creates) the C++ part of this Hybrid Object.
   * The C++ part is a `std::shared_ptr<margelo::nitro::fastio::HybridFileSystemSpec>`.
   */
  public func getCxxPart() -> bridge.std__shared_ptr_margelo__nitro__fastio__HybridFileSystemSpec_ {
    let cachedCxxPart = self.__cxxPart.lock()
    if cachedCxxPart.__convertToBool() {
      return cachedCxxPart
    } else {
      let newCxxPart = bridge.create_std__shared_ptr_margelo__nitro__fastio__HybridFileSystemSpec_(self.toUnsafe())
      __cxxPart = bridge.weakify_std__shared_ptr_margelo__nitro__fastio__HybridFileSystemSpec_(newCxxPart)
      return newCxxPart
    }
  }

  

  /**
   * Get the memory size of the Swift class (plus size of any other allocations)
   * so the JS VM can properly track it and garbage-collect the JS object if needed.
   */
  @inline(__always)
  public var memorySize: Int {
    return MemoryHelper.getSizeOf(self.__implementation) + self.__implementation.memorySize
  }

  // Properties
  

  // Methods
  @inline(__always)
  public func getMetadata(path: std.string) -> bridge.Result_Metadata_ {
    do {
      let __result = try self.__implementation.getMetadata(path: String(path))
      let __resultCpp = __result
      return bridge.create_Result_Metadata_(__resultCpp)
    } catch (let __error) {
      let __exceptionPtr = __error.toCpp()
      return bridge.create_Result_Metadata_(__exceptionPtr)
    }
  }
  
  @inline(__always)
  public func getWellKnownDirectoryPath(directory: Int32) -> bridge.Result_std__string_ {
    do {
      let __result = try self.__implementation.getWellKnownDirectoryPath(directory: margelo.nitro.fastio.WellKnownDirectory(rawValue: directory)!)
      let __resultCpp = std.string(__result)
      return bridge.create_Result_std__string_(__resultCpp)
    } catch (let __error) {
      let __exceptionPtr = __error.toCpp()
      return bridge.create_Result_std__string_(__exceptionPtr)
    }
  }
  
  @inline(__always)
  public func showOpenFilePicker(options: bridge.std__optional_NativeFilePickerOptions_) -> bridge.Result_std__shared_ptr_Promise_std__vector_std__string____ {
    do {
      let __result = try self.__implementation.showOpenFilePicker(options: { () -> NativeFilePickerOptions? in
        if let __unwrapped = options.value {
          return __unwrapped
        } else {
          return nil
        }
      }())
      let __resultCpp = { () -> bridge.std__shared_ptr_Promise_std__vector_std__string___ in
        let __promise = bridge.create_std__shared_ptr_Promise_std__vector_std__string___()
        let __promiseHolder = bridge.wrap_std__shared_ptr_Promise_std__vector_std__string___(__promise)
        __result
          .then({ __result in __promiseHolder.resolve({ () -> bridge.std__vector_std__string_ in
              var __vector = bridge.create_std__vector_std__string_(__result.count)
              for __item in __result {
                __vector.push_back(std.string(__item))
              }
              return __vector
            }()) })
          .catch({ __error in __promiseHolder.reject(__error.toCpp()) })
        return __promise
      }()
      return bridge.create_Result_std__shared_ptr_Promise_std__vector_std__string____(__resultCpp)
    } catch (let __error) {
      let __exceptionPtr = __error.toCpp()
      return bridge.create_Result_std__shared_ptr_Promise_std__vector_std__string____(__exceptionPtr)
    }
  }
}
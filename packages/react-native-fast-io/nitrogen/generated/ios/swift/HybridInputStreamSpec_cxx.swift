///
/// HybridInputStreamSpec_cxx.swift
/// This file was generated by nitrogen. DO NOT MODIFY THIS FILE.
/// https://github.com/mrousavy/nitro
/// Copyright © 2024 Marc Rousavy @ Margelo
///

import Foundation
import NitroModules

/**
 * A class implementation that bridges HybridInputStreamSpec over to C++.
 * In C++, we cannot use Swift protocols - so we need to wrap it in a class to make it strongly defined.
 *
 * Also, some Swift types need to be bridged with special handling:
 * - Enums need to be wrapped in Structs, otherwise they cannot be accessed bi-directionally (Swift bug: https://github.com/swiftlang/swift/issues/75330)
 * - Other HybridObjects need to be wrapped/unwrapped from the Swift TCxx wrapper
 * - Throwing methods need to be wrapped with a Result<T, Error> type, as exceptions cannot be propagated to C++
 */
public class HybridInputStreamSpec_cxx {
  /**
   * The Swift <> C++ bridge's namespace (`margelo::nitro::fastio::bridge::swift`)
   * from `FastIO-Swift-Cxx-Bridge.hpp`.
   * This contains specialized C++ templates, and C++ helper functions that can be accessed from Swift.
   */
  public typealias bridge = margelo.nitro.fastio.bridge.swift

  /**
   * Holds an instance of the `HybridInputStreamSpec` Swift protocol.
   */
  private var __implementation: any HybridInputStreamSpec

  /**
   * Holds a weak pointer to the C++ class that wraps the Swift class.
   */
  private var __cxxPart: bridge.std__weak_ptr_margelo__nitro__fastio__HybridInputStreamSpec_

  /**
   * Create a new `HybridInputStreamSpec_cxx` that wraps the given `HybridInputStreamSpec`.
   * All properties and methods bridge to C++ types.
   */
  public init(_ implementation: any HybridInputStreamSpec) {
    self.__implementation = implementation
    self.__cxxPart = .init()
    /* no base class */
  }

  /**
   * Get the actual `HybridInputStreamSpec` instance this class wraps.
   */
  @inline(__always)
  public func getHybridInputStreamSpec() -> any HybridInputStreamSpec {
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
   * Casts an unsafe pointer to a `HybridInputStreamSpec_cxx`.
   * The pointer has to be a retained opaque `Unmanaged<HybridInputStreamSpec_cxx>`.
   * This removes one strong reference from the object!
   */
  public class func fromUnsafe(_ pointer: UnsafeMutableRawPointer) -> HybridInputStreamSpec_cxx {
    return Unmanaged<HybridInputStreamSpec_cxx>.fromOpaque(pointer).takeRetainedValue()
  }

  /**
   * Gets (or creates) the C++ part of this Hybrid Object.
   * The C++ part is a `std::shared_ptr<margelo::nitro::fastio::HybridInputStreamSpec>`.
   */
  public func getCxxPart() -> bridge.std__shared_ptr_margelo__nitro__fastio__HybridInputStreamSpec_ {
    let cachedCxxPart = self.__cxxPart.lock()
    if cachedCxxPart.__convertToBool() {
      return cachedCxxPart
    } else {
      let newCxxPart = bridge.create_std__shared_ptr_margelo__nitro__fastio__HybridInputStreamSpec_(self.toUnsafe())
      __cxxPart = bridge.weakify_std__shared_ptr_margelo__nitro__fastio__HybridInputStreamSpec_(newCxxPart)
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
  public func read() -> bridge.Result_std__shared_ptr_Promise_std__shared_ptr_ArrayBuffer____ {
    do {
      let __result = try self.__implementation.read()
      let __resultCpp = { () -> bridge.std__shared_ptr_Promise_std__shared_ptr_ArrayBuffer___ in
        let __promise = bridge.create_std__shared_ptr_Promise_std__shared_ptr_ArrayBuffer___()
        let __promiseHolder = bridge.wrap_std__shared_ptr_Promise_std__shared_ptr_ArrayBuffer___(__promise)
        __result
          .then({ __result in __promiseHolder.resolve(__result.getArrayBuffer()) })
          .catch({ __error in __promiseHolder.reject(__error.toCpp()) })
        return __promise
      }()
      return bridge.create_Result_std__shared_ptr_Promise_std__shared_ptr_ArrayBuffer____(__resultCpp)
    } catch (let __error) {
      let __exceptionPtr = __error.toCpp()
      return bridge.create_Result_std__shared_ptr_Promise_std__shared_ptr_ArrayBuffer____(__exceptionPtr)
    }
  }
  
  @inline(__always)
  public func open() -> bridge.Result_void_ {
    do {
      try self.__implementation.open()
      return bridge.create_Result_void_()
    } catch (let __error) {
      let __exceptionPtr = __error.toCpp()
      return bridge.create_Result_void_(__exceptionPtr)
    }
  }
  
  @inline(__always)
  public func close() -> bridge.Result_void_ {
    do {
      try self.__implementation.close()
      return bridge.create_Result_void_()
    } catch (let __error) {
      let __exceptionPtr = __error.toCpp()
      return bridge.create_Result_void_(__exceptionPtr)
    }
  }
}

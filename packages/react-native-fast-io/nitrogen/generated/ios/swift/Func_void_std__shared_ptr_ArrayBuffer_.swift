///
/// Func_void_std__shared_ptr_ArrayBuffer_.swift
/// This file was generated by nitrogen. DO NOT MODIFY THIS FILE.
/// https://github.com/mrousavy/nitro
/// Copyright © 2024 Marc Rousavy @ Margelo
///

import NitroModules

/**
 * Wraps a Swift `((_ buffer: ArrayBufferHolder) -> Void)` as a class.
 * This class can be used from C++, e.g. to wrap the Swift closure as a `std::function`.
 */
public final class Func_void_std__shared_ptr_ArrayBuffer_ {
  public typealias bridge = margelo.nitro.fastio.bridge.swift

  private let closure: ((_ buffer: ArrayBufferHolder) -> Void)

  public init(_ closure: @escaping ((_ buffer: ArrayBufferHolder) -> Void)) {
    self.closure = closure
  }

  @inline(__always)
  public func call(buffer: ArrayBufferHolder) -> Void {
    self.closure(buffer)
  }

  /**
   * Casts this instance to a retained unsafe raw pointer.
   * This acquires one additional strong reference on the object!
   */
  @inline(__always)
  public func toUnsafe() -> UnsafeMutableRawPointer {
    return Unmanaged.passRetained(self).toOpaque()
  }

  /**
   * Casts an unsafe pointer to a `Func_void_std__shared_ptr_ArrayBuffer_`.
   * The pointer has to be a retained opaque `Unmanaged<Func_void_std__shared_ptr_ArrayBuffer_>`.
   * This removes one strong reference from the object!
   */
  @inline(__always)
  public static func fromUnsafe(_ pointer: UnsafeMutableRawPointer) -> Func_void_std__shared_ptr_ArrayBuffer_ {
    return Unmanaged<Func_void_std__shared_ptr_ArrayBuffer_>.fromOpaque(pointer).takeRetainedValue()
  }
}

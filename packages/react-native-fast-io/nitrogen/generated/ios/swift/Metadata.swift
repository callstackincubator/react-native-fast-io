///
/// Metadata.swift
/// This file was generated by nitrogen. DO NOT MODIFY THIS FILE.
/// https://github.com/mrousavy/nitro
/// Copyright © 2024 Marc Rousavy @ Margelo
///

import NitroModules

/**
 * Represents an instance of `Metadata`, backed by a C++ struct.
 */
public typealias Metadata = margelo.nitro.fastio.Metadata

public extension Metadata {
  private typealias bridge = margelo.nitro.fastio.bridge.swift

  /**
   * Create a new instance of `Metadata`.
   */
  init(name: String, path: String, root: String, size: Double, type: String, lastModified: Double) {
    self.init(std.string(name), std.string(path), std.string(root), size, std.string(type), lastModified)
  }

  var name: String {
    @inline(__always)
    get {
      return String(self.__name)
    }
    @inline(__always)
    set {
      self.__name = std.string(newValue)
    }
  }
  
  var path: String {
    @inline(__always)
    get {
      return String(self.__path)
    }
    @inline(__always)
    set {
      self.__path = std.string(newValue)
    }
  }
  
  var root: String {
    @inline(__always)
    get {
      return String(self.__root)
    }
    @inline(__always)
    set {
      self.__root = std.string(newValue)
    }
  }
  
  var size: Double {
    @inline(__always)
    get {
      return self.__size
    }
    @inline(__always)
    set {
      self.__size = newValue
    }
  }
  
  var type: String {
    @inline(__always)
    get {
      return String(self.__type)
    }
    @inline(__always)
    set {
      self.__type = std.string(newValue)
    }
  }
  
  var lastModified: Double {
    @inline(__always)
    get {
      return self.__lastModified
    }
    @inline(__always)
    set {
      self.__lastModified = newValue
    }
  }
}

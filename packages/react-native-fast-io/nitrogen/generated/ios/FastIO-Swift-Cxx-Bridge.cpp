///
/// FastIO-Swift-Cxx-Bridge.cpp
/// This file was generated by nitrogen. DO NOT MODIFY THIS FILE.
/// https://github.com/mrousavy/nitro
/// Copyright © 2024 Marc Rousavy @ Margelo
///

#include "FastIO-Swift-Cxx-Bridge.hpp"

// Include C++ implementation defined types
#include "FastIO-Swift-Cxx-Umbrella.hpp"
#include "HybridCompressorFactorySpecSwift.hpp"
#include "HybridCompressorSpecSwift.hpp"
#include "HybridDuplexStreamSpecSwift.hpp"
#include "HybridFileSystemSpecSwift.hpp"
#include "HybridInputStreamSpecSwift.hpp"
#include "HybridNetworkSpecSwift.hpp"
#include "HybridOutputStreamSpecSwift.hpp"
#include "HybridStreamManagerSpecSwift.hpp"
#include "HybridWebSocketManagerSpecSwift.hpp"
#include "HybridWebSocketSpecSwift.hpp"
#include <NitroModules/HybridContext.hpp>

namespace margelo::nitro::fastio::bridge::swift {

  // pragma MARK: std::shared_ptr<margelo::nitro::fastio::HybridFileSystemSpec>
  std::shared_ptr<margelo::nitro::fastio::HybridFileSystemSpec> create_std__shared_ptr_margelo__nitro__fastio__HybridFileSystemSpec_(void* _Nonnull swiftUnsafePointer) {
    FastIO::HybridFileSystemSpecCxx swiftPart = FastIO::HybridFileSystemSpecCxxUnsafe::fromUnsafe(swiftUnsafePointer);
    return HybridContext::getOrCreate<margelo::nitro::fastio::HybridFileSystemSpecSwift>(swiftPart);
  }
  void* _Nonnull get_std__shared_ptr_margelo__nitro__fastio__HybridFileSystemSpec_(std__shared_ptr_margelo__nitro__fastio__HybridFileSystemSpec_ cppType) {
    std::shared_ptr<margelo::nitro::fastio::HybridFileSystemSpecSwift> swiftWrapper = std::dynamic_pointer_cast<margelo::nitro::fastio::HybridFileSystemSpecSwift>(cppType);
  #ifdef NITRO_DEBUG
    if (swiftWrapper == nullptr) [[unlikely]] {
      throw std::runtime_error("Class \"HybridFileSystemSpec\" is not implemented in Swift!");
    }
  #endif
    FastIO::HybridFileSystemSpecCxx swiftPart = swiftWrapper->getSwiftPart();
    return FastIO::HybridFileSystemSpecCxxUnsafe::toUnsafe(swiftPart);
  }
  
  // pragma MARK: std::shared_ptr<margelo::nitro::fastio::HybridInputStreamSpec>
  std::shared_ptr<margelo::nitro::fastio::HybridInputStreamSpec> create_std__shared_ptr_margelo__nitro__fastio__HybridInputStreamSpec_(void* _Nonnull swiftUnsafePointer) {
    FastIO::HybridInputStreamSpecCxx swiftPart = FastIO::HybridInputStreamSpecCxxUnsafe::fromUnsafe(swiftUnsafePointer);
    return HybridContext::getOrCreate<margelo::nitro::fastio::HybridInputStreamSpecSwift>(swiftPart);
  }
  void* _Nonnull get_std__shared_ptr_margelo__nitro__fastio__HybridInputStreamSpec_(std__shared_ptr_margelo__nitro__fastio__HybridInputStreamSpec_ cppType) {
    std::shared_ptr<margelo::nitro::fastio::HybridInputStreamSpecSwift> swiftWrapper = std::dynamic_pointer_cast<margelo::nitro::fastio::HybridInputStreamSpecSwift>(cppType);
  #ifdef NITRO_DEBUG
    if (swiftWrapper == nullptr) [[unlikely]] {
      throw std::runtime_error("Class \"HybridInputStreamSpec\" is not implemented in Swift!");
    }
  #endif
    FastIO::HybridInputStreamSpecCxx swiftPart = swiftWrapper->getSwiftPart();
    return FastIO::HybridInputStreamSpecCxxUnsafe::toUnsafe(swiftPart);
  }
  
  // pragma MARK: std::shared_ptr<margelo::nitro::fastio::HybridNetworkSpec>
  std::shared_ptr<margelo::nitro::fastio::HybridNetworkSpec> create_std__shared_ptr_margelo__nitro__fastio__HybridNetworkSpec_(void* _Nonnull swiftUnsafePointer) {
    FastIO::HybridNetworkSpecCxx swiftPart = FastIO::HybridNetworkSpecCxxUnsafe::fromUnsafe(swiftUnsafePointer);
    return HybridContext::getOrCreate<margelo::nitro::fastio::HybridNetworkSpecSwift>(swiftPart);
  }
  void* _Nonnull get_std__shared_ptr_margelo__nitro__fastio__HybridNetworkSpec_(std__shared_ptr_margelo__nitro__fastio__HybridNetworkSpec_ cppType) {
    std::shared_ptr<margelo::nitro::fastio::HybridNetworkSpecSwift> swiftWrapper = std::dynamic_pointer_cast<margelo::nitro::fastio::HybridNetworkSpecSwift>(cppType);
  #ifdef NITRO_DEBUG
    if (swiftWrapper == nullptr) [[unlikely]] {
      throw std::runtime_error("Class \"HybridNetworkSpec\" is not implemented in Swift!");
    }
  #endif
    FastIO::HybridNetworkSpecCxx swiftPart = swiftWrapper->getSwiftPart();
    return FastIO::HybridNetworkSpecCxxUnsafe::toUnsafe(swiftPart);
  }
  
  // pragma MARK: std::shared_ptr<margelo::nitro::fastio::HybridOutputStreamSpec>
  std::shared_ptr<margelo::nitro::fastio::HybridOutputStreamSpec> create_std__shared_ptr_margelo__nitro__fastio__HybridOutputStreamSpec_(void* _Nonnull swiftUnsafePointer) {
    FastIO::HybridOutputStreamSpecCxx swiftPart = FastIO::HybridOutputStreamSpecCxxUnsafe::fromUnsafe(swiftUnsafePointer);
    return HybridContext::getOrCreate<margelo::nitro::fastio::HybridOutputStreamSpecSwift>(swiftPart);
  }
  void* _Nonnull get_std__shared_ptr_margelo__nitro__fastio__HybridOutputStreamSpec_(std__shared_ptr_margelo__nitro__fastio__HybridOutputStreamSpec_ cppType) {
    std::shared_ptr<margelo::nitro::fastio::HybridOutputStreamSpecSwift> swiftWrapper = std::dynamic_pointer_cast<margelo::nitro::fastio::HybridOutputStreamSpecSwift>(cppType);
  #ifdef NITRO_DEBUG
    if (swiftWrapper == nullptr) [[unlikely]] {
      throw std::runtime_error("Class \"HybridOutputStreamSpec\" is not implemented in Swift!");
    }
  #endif
    FastIO::HybridOutputStreamSpecCxx swiftPart = swiftWrapper->getSwiftPart();
    return FastIO::HybridOutputStreamSpecCxxUnsafe::toUnsafe(swiftPart);
  }
  
  // pragma MARK: std::shared_ptr<margelo::nitro::fastio::HybridCompressorSpec>
  std::shared_ptr<margelo::nitro::fastio::HybridCompressorSpec> create_std__shared_ptr_margelo__nitro__fastio__HybridCompressorSpec_(void* _Nonnull swiftUnsafePointer) {
    FastIO::HybridCompressorSpecCxx swiftPart = FastIO::HybridCompressorSpecCxxUnsafe::fromUnsafe(swiftUnsafePointer);
    return HybridContext::getOrCreate<margelo::nitro::fastio::HybridCompressorSpecSwift>(swiftPart);
  }
  void* _Nonnull get_std__shared_ptr_margelo__nitro__fastio__HybridCompressorSpec_(std__shared_ptr_margelo__nitro__fastio__HybridCompressorSpec_ cppType) {
    std::shared_ptr<margelo::nitro::fastio::HybridCompressorSpecSwift> swiftWrapper = std::dynamic_pointer_cast<margelo::nitro::fastio::HybridCompressorSpecSwift>(cppType);
  #ifdef NITRO_DEBUG
    if (swiftWrapper == nullptr) [[unlikely]] {
      throw std::runtime_error("Class \"HybridCompressorSpec\" is not implemented in Swift!");
    }
  #endif
    FastIO::HybridCompressorSpecCxx swiftPart = swiftWrapper->getSwiftPart();
    return FastIO::HybridCompressorSpecCxxUnsafe::toUnsafe(swiftPart);
  }
  
  // pragma MARK: std::shared_ptr<margelo::nitro::fastio::HybridCompressorFactorySpec>
  std::shared_ptr<margelo::nitro::fastio::HybridCompressorFactorySpec> create_std__shared_ptr_margelo__nitro__fastio__HybridCompressorFactorySpec_(void* _Nonnull swiftUnsafePointer) {
    FastIO::HybridCompressorFactorySpecCxx swiftPart = FastIO::HybridCompressorFactorySpecCxxUnsafe::fromUnsafe(swiftUnsafePointer);
    return HybridContext::getOrCreate<margelo::nitro::fastio::HybridCompressorFactorySpecSwift>(swiftPart);
  }
  void* _Nonnull get_std__shared_ptr_margelo__nitro__fastio__HybridCompressorFactorySpec_(std__shared_ptr_margelo__nitro__fastio__HybridCompressorFactorySpec_ cppType) {
    std::shared_ptr<margelo::nitro::fastio::HybridCompressorFactorySpecSwift> swiftWrapper = std::dynamic_pointer_cast<margelo::nitro::fastio::HybridCompressorFactorySpecSwift>(cppType);
  #ifdef NITRO_DEBUG
    if (swiftWrapper == nullptr) [[unlikely]] {
      throw std::runtime_error("Class \"HybridCompressorFactorySpec\" is not implemented in Swift!");
    }
  #endif
    FastIO::HybridCompressorFactorySpecCxx swiftPart = swiftWrapper->getSwiftPart();
    return FastIO::HybridCompressorFactorySpecCxxUnsafe::toUnsafe(swiftPart);
  }
  
  // pragma MARK: std::shared_ptr<margelo::nitro::fastio::HybridDuplexStreamSpec>
  std::shared_ptr<margelo::nitro::fastio::HybridDuplexStreamSpec> create_std__shared_ptr_margelo__nitro__fastio__HybridDuplexStreamSpec_(void* _Nonnull swiftUnsafePointer) {
    FastIO::HybridDuplexStreamSpecCxx swiftPart = FastIO::HybridDuplexStreamSpecCxxUnsafe::fromUnsafe(swiftUnsafePointer);
    return HybridContext::getOrCreate<margelo::nitro::fastio::HybridDuplexStreamSpecSwift>(swiftPart);
  }
  void* _Nonnull get_std__shared_ptr_margelo__nitro__fastio__HybridDuplexStreamSpec_(std__shared_ptr_margelo__nitro__fastio__HybridDuplexStreamSpec_ cppType) {
    std::shared_ptr<margelo::nitro::fastio::HybridDuplexStreamSpecSwift> swiftWrapper = std::dynamic_pointer_cast<margelo::nitro::fastio::HybridDuplexStreamSpecSwift>(cppType);
  #ifdef NITRO_DEBUG
    if (swiftWrapper == nullptr) [[unlikely]] {
      throw std::runtime_error("Class \"HybridDuplexStreamSpec\" is not implemented in Swift!");
    }
  #endif
    FastIO::HybridDuplexStreamSpecCxx swiftPart = swiftWrapper->getSwiftPart();
    return FastIO::HybridDuplexStreamSpecCxxUnsafe::toUnsafe(swiftPart);
  }
  
  // pragma MARK: std::shared_ptr<margelo::nitro::fastio::HybridStreamManagerSpec>
  std::shared_ptr<margelo::nitro::fastio::HybridStreamManagerSpec> create_std__shared_ptr_margelo__nitro__fastio__HybridStreamManagerSpec_(void* _Nonnull swiftUnsafePointer) {
    FastIO::HybridStreamManagerSpecCxx swiftPart = FastIO::HybridStreamManagerSpecCxxUnsafe::fromUnsafe(swiftUnsafePointer);
    return HybridContext::getOrCreate<margelo::nitro::fastio::HybridStreamManagerSpecSwift>(swiftPart);
  }
  void* _Nonnull get_std__shared_ptr_margelo__nitro__fastio__HybridStreamManagerSpec_(std__shared_ptr_margelo__nitro__fastio__HybridStreamManagerSpec_ cppType) {
    std::shared_ptr<margelo::nitro::fastio::HybridStreamManagerSpecSwift> swiftWrapper = std::dynamic_pointer_cast<margelo::nitro::fastio::HybridStreamManagerSpecSwift>(cppType);
  #ifdef NITRO_DEBUG
    if (swiftWrapper == nullptr) [[unlikely]] {
      throw std::runtime_error("Class \"HybridStreamManagerSpec\" is not implemented in Swift!");
    }
  #endif
    FastIO::HybridStreamManagerSpecCxx swiftPart = swiftWrapper->getSwiftPart();
    return FastIO::HybridStreamManagerSpecCxxUnsafe::toUnsafe(swiftPart);
  }
  
  // pragma MARK: std::shared_ptr<margelo::nitro::fastio::HybridWebSocketSpec>
  std::shared_ptr<margelo::nitro::fastio::HybridWebSocketSpec> create_std__shared_ptr_margelo__nitro__fastio__HybridWebSocketSpec_(void* _Nonnull swiftUnsafePointer) {
    FastIO::HybridWebSocketSpecCxx swiftPart = FastIO::HybridWebSocketSpecCxxUnsafe::fromUnsafe(swiftUnsafePointer);
    return HybridContext::getOrCreate<margelo::nitro::fastio::HybridWebSocketSpecSwift>(swiftPart);
  }
  void* _Nonnull get_std__shared_ptr_margelo__nitro__fastio__HybridWebSocketSpec_(std__shared_ptr_margelo__nitro__fastio__HybridWebSocketSpec_ cppType) {
    std::shared_ptr<margelo::nitro::fastio::HybridWebSocketSpecSwift> swiftWrapper = std::dynamic_pointer_cast<margelo::nitro::fastio::HybridWebSocketSpecSwift>(cppType);
  #ifdef NITRO_DEBUG
    if (swiftWrapper == nullptr) [[unlikely]] {
      throw std::runtime_error("Class \"HybridWebSocketSpec\" is not implemented in Swift!");
    }
  #endif
    FastIO::HybridWebSocketSpecCxx swiftPart = swiftWrapper->getSwiftPart();
    return FastIO::HybridWebSocketSpecCxxUnsafe::toUnsafe(swiftPart);
  }
  
  // pragma MARK: std::shared_ptr<margelo::nitro::fastio::HybridWebSocketManagerSpec>
  std::shared_ptr<margelo::nitro::fastio::HybridWebSocketManagerSpec> create_std__shared_ptr_margelo__nitro__fastio__HybridWebSocketManagerSpec_(void* _Nonnull swiftUnsafePointer) {
    FastIO::HybridWebSocketManagerSpecCxx swiftPart = FastIO::HybridWebSocketManagerSpecCxxUnsafe::fromUnsafe(swiftUnsafePointer);
    return HybridContext::getOrCreate<margelo::nitro::fastio::HybridWebSocketManagerSpecSwift>(swiftPart);
  }
  void* _Nonnull get_std__shared_ptr_margelo__nitro__fastio__HybridWebSocketManagerSpec_(std__shared_ptr_margelo__nitro__fastio__HybridWebSocketManagerSpec_ cppType) {
    std::shared_ptr<margelo::nitro::fastio::HybridWebSocketManagerSpecSwift> swiftWrapper = std::dynamic_pointer_cast<margelo::nitro::fastio::HybridWebSocketManagerSpecSwift>(cppType);
  #ifdef NITRO_DEBUG
    if (swiftWrapper == nullptr) [[unlikely]] {
      throw std::runtime_error("Class \"HybridWebSocketManagerSpec\" is not implemented in Swift!");
    }
  #endif
    FastIO::HybridWebSocketManagerSpecCxx swiftPart = swiftWrapper->getSwiftPart();
    return FastIO::HybridWebSocketManagerSpecCxxUnsafe::toUnsafe(swiftPart);
  }

} // namespace margelo::nitro::fastio::bridge::swift

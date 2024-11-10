///
/// WellKnownDirectory.swift
/// This file was generated by nitrogen. DO NOT MODIFY THIS FILE.
/// https://github.com/mrousavy/nitro
/// Copyright © 2024 Marc Rousavy @ Margelo
///

/**
 * Represents the JS union `WellKnownDirectory`, backed by a C++ enum.
 */
public typealias WellKnownDirectory = margelo.nitro.fastio.WellKnownDirectory

public extension WellKnownDirectory {
  /**
   * Get a WellKnownDirectory for the given String value, or
   * return `nil` if the given value was invalid/unknown.
   */
  init?(fromString string: String) {
    switch string {
      case "desktop":
        self = .desktop
      case "documents":
        self = .documents
      case "downloads":
        self = .downloads
      case "music":
        self = .music
      case "pictures":
        self = .pictures
      case "videos":
        self = .videos
      default:
        return nil
    }
  }

  /**
   * Get the String value this WellKnownDirectory represents.
   */
  var stringValue: String {
    switch self {
      case .desktop:
        return "desktop"
      case .documents:
        return "documents"
      case .downloads:
        return "downloads"
      case .music:
        return "music"
      case .pictures:
        return "pictures"
      case .videos:
        return "videos"
    }
  }
}
/**
 * Additional types for File System Access API that are currently not available in TypeScript.
 * This is because they are not supported by more than one browser engine.
 */

export {}

export type WellKnownDirectory =
  | 'desktop'
  | 'documents'
  | 'downloads'
  | 'music'
  | 'pictures'
  | 'videos'
export type FileExtension = `.${string}`
export type MIMEType = `${string}/${string}`

export interface FilePickerAcceptType {
  /**
   * @default ""
   */
  description?: string | undefined
  accept: Record<MIMEType, FileExtension | FileExtension[]> | undefined
}

export interface FilePickerOptions {
  types?: FilePickerAcceptType[] | undefined
  /**
   * @default false
   */
  excludeAcceptAllOption?: boolean | undefined
  startIn?: WellKnownDirectory | /* | FileSystemHandle */ undefined
  id?: string | undefined
}

export interface OpenFilePickerOptions extends FilePickerOptions {
  /**
   * @default false
   */
  multiple?: boolean | undefined
}

export interface SaveFilePickerOptions extends FilePickerOptions {
  suggestedName?: string | undefined
}

export type FileSystemPermissionMode = 'read' | 'readwrite'

export interface DirectoryPickerOptions {
  id?: string | undefined
  startIn?: WellKnownDirectory /* | FileSystemHandle */ | undefined
  /**
   * @default "read"
   */
  mode?: FileSystemPermissionMode | undefined
}

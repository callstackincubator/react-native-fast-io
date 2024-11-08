/**
 * Additional types for File System Access API that are currently not available in TypeScript.
 * This is because they are not supported by more than one browser engine.
 */

export {}

declare global {
  type WellKnownDirectory = 'desktop' | 'documents' | 'downloads' | 'music' | 'pictures' | 'videos'
  type FileExtension = `.${string}`
  type MIMEType = `${string}/${string}`

  interface FilePickerAcceptType {
    /**
     * @default ""
     */
    description?: string | undefined
    accept?: Record<MIMEType, FileExtension | FileExtension[]> | undefined
  }

  interface FilePickerOptions {
    types?: FilePickerAcceptType[] | undefined
    /**
     * @default false
     */
    excludeAcceptAllOption?: boolean | undefined
    startIn?: WellKnownDirectory | FileSystemHandle | undefined
    id?: string | undefined
  }

  interface OpenFilePickerOptions extends FilePickerOptions {
    /**
     * @default false
     */
    multiple?: boolean | undefined
  }

  interface SaveFilePickerOptions extends FilePickerOptions {
    suggestedName?: string | undefined
  }

  type FileSystemPermissionMode = 'read' | 'readwrite'

  interface DirectoryPickerOptions {
    id?: string | undefined
    startIn?: WellKnownDirectory | FileSystemHandle | undefined
    /**
     * @default "read"
     */
    mode?: FileSystemPermissionMode | undefined
  }
}

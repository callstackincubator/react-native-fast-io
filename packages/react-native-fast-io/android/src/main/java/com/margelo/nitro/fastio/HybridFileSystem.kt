package com.margelo.nitro.fastio

import com.margelo.nitro.core.Promise

class HybridFileSystem : HybridFileSystemSpec() {
    override fun getMetadata(path: String): Metadata {
        throw NotImplementedError("HybridFileSystem.getMetadata() not implemented")
    }

    override fun getWellKnownDirectoryPath(directory: WellKnownDirectory): String {
        throw NotImplementedError("HybridFileSystem.getWellKnownDirectoryPath() not implemented")
    }

    override fun showOpenFilePicker(options: NativeFilePickerOptions?): Promise<Array<String>> {
        throw NotImplementedError("HybridFileSystem.showOpenFilePicker() not implemented")
    }

    override val memorySize: Long
        get() = 0L
} 

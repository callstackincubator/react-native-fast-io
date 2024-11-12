package com.margelo.nitro.fastio

import android.net.Uri
import com.margelo.nitro.NitroModules

class HybridStreamFactory : HybridStreamFactorySpec() {
    override val bufferSize: Double
        get() = getBufferSize().toDouble()

    override fun createInputStream(path: String): HybridInputStreamSpec {
        val context = NitroModules.applicationContext
            ?: throw RuntimeException("Application context is missing")
            
        val uri = Uri.parse(path)
        val inputStream = context.contentResolver.openInputStream(uri)
            ?: throw RuntimeException("Cannot open stream for: $path")
            
        return HybridInputStream(inputStream)
    }

    override val memorySize: Long
        get() = 0L

    companion object {
        @JvmStatic
        private external fun getBufferSize(): Int
    }
} 

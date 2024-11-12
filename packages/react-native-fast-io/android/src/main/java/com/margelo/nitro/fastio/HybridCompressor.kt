package com.margelo.nitro.fastio

import com.margelo.nitro.core.ArrayBuffer

class HybridCompressor : HybridCompressorSpec() {
    override fun compress(chunk: ArrayBuffer): ArrayBuffer {
        throw NotImplementedError("HybridCompressor.compress() not implemented")
    }

    override fun finalize(): ArrayBuffer {
        throw NotImplementedError("HybridCompressor.finalize() not implemented")
    }

    override val memorySize: Long
        get() = 0L
} 

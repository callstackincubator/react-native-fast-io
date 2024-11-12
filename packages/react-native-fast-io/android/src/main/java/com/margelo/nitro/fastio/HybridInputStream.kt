package com.margelo.nitro.fastio

import com.margelo.nitro.core.ArrayBuffer

class HybridInputStream : HybridInputStreamSpec() {
    override fun hasBytesAvailable(): Boolean {
        throw NotImplementedError("HybridInputStream.hasBytesAvailable() not implemented")
    }

    override fun read(buffer: ArrayBuffer, maxLength: Double): Double {
        throw NotImplementedError("HybridInputStream.read() not implemented")
    }

    override fun open() {
        throw NotImplementedError("HybridInputStream.open() not implemented")
    }

    override fun close() {
        throw NotImplementedError("HybridInputStream.close() not implemented")
    }

    override val memorySize: Long
        get() = 0L
} 

package com.margelo.nitro.fastio

import com.margelo.nitro.core.ArrayBuffer

class HybridOutputStream : HybridOutputStreamSpec() {
    override fun hasSpaceAvailable(): Boolean {
        throw NotImplementedError("HybridOutputStream.hasSpaceAvailable() not implemented")
    }

    override fun write(buffer: ArrayBuffer, maxLength: Double): Double {
        throw NotImplementedError("HybridOutputStream.write() not implemented")
    }

    override fun open() {
        throw NotImplementedError("HybridOutputStream.open() not implemented")
    }

    override fun close() {
        throw NotImplementedError("HybridOutputStream.close() not implemented")
    }

    override val memorySize: Long
        get() = 0L
} 

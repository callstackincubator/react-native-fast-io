package com.margelo.nitro.fastio

import com.margelo.nitro.core.Promise

class HybridStreamFactory : HybridStreamFactorySpec() {
    override val bufferSize: Double
        get() = throw NotImplementedError("HybridStreamFactory.bufferSize not implemented")

    override fun createInputStream(path: String): HybridInputStreamSpec {
        throw NotImplementedError("HybridStreamFactory.createInputStream() not implemented")
    }

    override val memorySize: Long
        get() = 0L
} 

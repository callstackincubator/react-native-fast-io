package com.margelo.nitro.fastio

class HybridCompressorFactory : HybridCompressorFactorySpec() {
    override fun create(algorithm: CompressionAlgorithm): HybridCompressorSpec {
        throw NotImplementedError("HybridCompressorFactory.create() not implemented")
    }

    override val memorySize: Long
        get() = 0L
} 

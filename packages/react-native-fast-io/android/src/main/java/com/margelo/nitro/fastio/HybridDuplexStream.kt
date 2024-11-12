package com.margelo.nitro.fastio

class HybridDuplexStream : HybridDuplexStreamSpec() {
    override var inputStream: HybridInputStreamSpec
        get() = throw NotImplementedError("HybridDuplexStream.inputStream getter not implemented")
        set(_) = throw NotImplementedError("HybridDuplexStream.inputStream setter not implemented")

    override var outputStream: HybridOutputStreamSpec
        get() = throw NotImplementedError("HybridDuplexStream.outputStream getter not implemented")
        set(_) = throw NotImplementedError("HybridDuplexStream.outputStream setter not implemented")

    override val memorySize: Long
        get() = 0L
} 

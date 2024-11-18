// Suite of XXX tests for WHATWG Compression spec

global.pako = require('./third_party/pako/pako_inflate.min')
import './resources/concatenate-stream'

// Compression tests
import './compression-large-flush-output.any'
import './compression-stream.tentative.any'
import './compression-multiple-chunks.tentative.any'
import './compression-constructor-error.tentative.any'
import './compression-output-length.tentative.any'
import './compression-including-empty-chunk.tentative.any'
import './compression-bad-chunks.tentative.any'

// // Decompression tests
// import './decompression-constructor-error.tentative.any'
// import './decompression-uint8array-output.tentative.any'
// import './decompression-empty-input.tentative.any'
// import './decompression-bad-chunks.tentative.any'
// import './decompression-buffersource.tentative.any'
// import './decompression-corrupt-input.tentative.any'
// import './decompression-split-chunk.tentative.any'
// import './decompression-correct-input.tentative.any'

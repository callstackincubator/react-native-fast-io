/**
 * TextEncoder is available in Hermes
 */
declare class TextEncoder {
  constructor()
  encode(input?: string): Uint8Array
}

/**
 * TextDecoder is not available in Hermes yet. This must be polyfilled.
 * https://github.com/facebook/hermes/issues/1403
 */
declare class TextDecoder {
  constructor()
  decode(input?: Uint8Array): string
}

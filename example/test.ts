// @ts-ignore-all

class WebSocket {
  
  constructor(
    url: string,
    protocols: ?string | ?Array<string>,
    options: ?{headers?: {origin?: string, ...}, ...},
  ) {
    super();

    // redacted
    
    this._socketId = nextWebSocketId++;

    // redacted
    
    NativeWebSocketModule.connect(url, protocols, {headers}, this._socketId);
  }

}



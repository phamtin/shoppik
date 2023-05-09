import {
  HEART_BEAT_WAIT_TIME,
  MAX_RETRY_TIMES,
  RETRY_INTERVAL,
} from './websocket.constant';

export interface WebSocketClientOptions {
  autoPing: boolean;
  autoReconnect: boolean;
}

export class WebSocketClient {
  _url: string;
  _webSocket: WebSocket | any;
  _options: WebSocketClientOptions;

  _webSocketReconnecting = false;
  _retriedTimes = 0;
  _pingInterval: any;
  _reconnectTimeout: any;
  _heartBeatTimeout: any;
  _forceQuit = false;

  onopen = (e: Event) => {};
  onmessage = (e: MessageEvent) => {};
  onclose = (e: CloseEvent) => {};
  onerror = (e: Error) => {};
  onreconnected = (e: Event) => {};

  constructor(url: string, options?: WebSocketClientOptions) {
    this._url = url;
    this._options = options || { autoPing: true, autoReconnect: false };
    this._open();
  }

  getReadyState = () => (this._webSocket ? this._webSocket.readyState : undefined);

  _open() {
    this._webSocket = new WebSocket(this._url);

    this._webSocket.onopen = (event: Event) => {
      this._retriedTimes = 0;

      if (this._webSocketReconnecting) {
        this._webSocketReconnecting = false;

        console.log(`[Socket] Reconnected`);
        this.onreconnected(event);
      } else {
        console.log(`[Socket] Opened`);
        this.onopen(event);
      }
    };

    this._webSocket.onmessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        if (data.topic === 'PONG') {
          this._heartBeatTimeout && clearTimeout(this._heartBeatTimeout);
          this._heartBeatTimeout = undefined;
          return;
        }
      } catch (e) {}
      this.onmessage(event);
    };

    this._webSocket.onclose = (event: CloseEvent) => {
      this._cleanUp();
      switch (event.code) {
        case 1000: // Normal status
        case 401:
          console.log(`[Socket] Closed`, event);
          this.onclose(event);
          break;
        default:
          if (!this._options.autoReconnect || this._forceQuit) {
            this.onclose(event);
            break;
          }

          if (++this._retriedTimes > MAX_RETRY_TIMES) {
            console.log(
              `[Socket] Closed. Cannot reconnect after ${MAX_RETRY_TIMES} retries.`
            );
            this.onclose(event);
            break;
          }

          this._reconnectTimeout = setTimeout(() => {
            console.log(`[Socket] Trying to reconnect...`);
            this._webSocketReconnecting = true;
            this._open();
          }, RETRY_INTERVAL);
          break;
      }
    };

    this._webSocket.onerror = (e: Error) => {
      console.log(`[Socket] Error: Cannot connect`, e);
      this.onerror(e);
    };

    function getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    }

    if (this._options.autoPing) {
      this._pingInterval = setInterval(() => {
        this._send(JSON.stringify({ topic: 'PING' }));

        this._heartBeatTimeout = setTimeout(() => {
          console.log(
            `[Socket] Don't receive Pong in ${
              HEART_BEAT_WAIT_TIME / 1000
            } seconds after Ping.`
          );
          this._webSocket.close();
        }, HEART_BEAT_WAIT_TIME);
      }, Math.floor(getRandomArbitrary(5000, 10000)));
    }
  }

  _close() {
    this._forceQuit = true;
    this._webSocket.close();
  }

  _send(data: string | ArrayBufferLike | Blob | ArrayBufferView) {
    this._webSocket._send(data);
  }

  _cleanUp() {
    this._webSocket.onopen = undefined;
    this._webSocket.onmessage = undefined;
    this._webSocket.onerror = undefined;
    this._webSocket.onclose = undefined;

    this._pingInterval && clearInterval(this._pingInterval);
    this._pingInterval = undefined;
    this._heartBeatTimeout && clearTimeout(this._heartBeatTimeout);
    this._heartBeatTimeout = undefined;
    this._reconnectTimeout && clearTimeout(this._reconnectTimeout);
    this._reconnectTimeout = undefined;
  }
}

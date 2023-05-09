//  Websocket message response type
export interface WebSocketResponseMessage {
  id: string;
  topic: string;
  statusCode: number;
  headers?: any;
  data?: any;
  error?: any;
}

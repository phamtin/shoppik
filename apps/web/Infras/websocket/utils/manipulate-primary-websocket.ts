import { randomUUID } from 'crypto';
import { WebSocketClient } from './websocket-client';
import { WebSocketResponseMessage } from './websocket.type';
import {
  PRIMARY_SOCKET_CLOSE_EVENT,
  PRIMARY_SOCKET_ERROR_EVENT,
  PRIMARY_SOCKET_MESSAGE_EVENT,
  PRIMARY_SOCKET_OPEN_EVENT,
  PRIMARY_SOCKET_RECONNECTED_EVENT,
  _REQUEST_TIME_OUT,
} from './websocket.constant';

let _primarySocket: WebSocketClient | undefined;

export function startPrimarySocket(hostUrl: string): void {
  if (_primarySocket) return;

  _primarySocket = new WebSocketClient(`${hostUrl}/ws/primary`, {
    autoPing: true,
    autoReconnect: true,
  });
  _primarySocket.onopen = (event: Event) => {
    const _event = new CustomEvent(PRIMARY_SOCKET_OPEN_EVENT);
    window.dispatchEvent(_event);
  };
  _primarySocket.onmessage = (event: MessageEvent) => {
    const { messageBody, topic, statusCode, headers, id } = JSON.parse(event.data);
    const _parsedBody = messageBody ? JSON.parse(messageBody) : undefined;

    const _payload: WebSocketResponseMessage = {
      ...(statusCode >= 200 && statusCode < 300
        ? { data: _parsedBody }
        : { error: _parsedBody }),
      statusCode,
      headers,
      id,
      topic,
    };

    const _topicEvent = new CustomEvent(topic, { detail: _payload });
    window.dispatchEvent(_topicEvent);

    const _commonSocketEvent = new CustomEvent(PRIMARY_SOCKET_MESSAGE_EVENT);
    window.dispatchEvent(_commonSocketEvent);
  };
  _primarySocket.onclose = (event: CloseEvent) => {
    const _event = new CustomEvent(PRIMARY_SOCKET_CLOSE_EVENT);
    window.dispatchEvent(_event);
  };
  _primarySocket.onerror = (error: Error) => {
    const _event = new CustomEvent(PRIMARY_SOCKET_ERROR_EVENT);
    window.dispatchEvent(_event);
  };
  _primarySocket.onreconnected = (event: Event) => {
    const _event = new CustomEvent(PRIMARY_SOCKET_RECONNECTED_EVENT);
    window.dispatchEvent(_event);
  };
}

export function sendMessage<T = any>(params: {
  subject: string;
  requestTopic: string;
  responseTopic: string;
  body?: any;
}): Promise<T> {
  const { requestTopic, responseTopic, subject, body } = params;
  const _socket = _getPrimarySocket();

  return new Promise<T>((resolve, reject) => {
    const _uuid = randomUUID();

    const responseTopicWithId = `${responseTopic}_${_uuid}`;
    const responseTimeout = setTimeout(() => {
      // window.removeEventListener(responseTopicWithId, _listener);
      reject(new Error(`Request for event "${responseTopicWithId}" timeout`));
    }, _REQUEST_TIME_OUT);

    const _listener = (event: CustomEvent) => {
      clearTimeout(responseTimeout);
      // window.removeEventListener(responseTopicWithId, _listener, undefined);

      const response = event.detail as WebSocketResponseMessage;
      const { data, error } = response;
      if (error) {
        error.statusCode = response.statusCode;
        reject(error);
      } else {
        resolve(data);
      }
    };

    // window.addEventListener(responseTopicWithId, _listener);

    _socket._send(
      JSON.stringify({
        subject,
        topic: requestTopic,
        responseTopic: responseTopicWithId,
        id: _uuid,
        messageBody: body ? JSON.stringify(body) : undefined,
      })
    );
  });
}

function _getPrimarySocket(): WebSocketClient {
  if (!_primarySocket) {
    throw new Error(`Primary websocket hasn't been started yet...`);
  }
  return _primarySocket;
}

export function stopBFFCommonSocket(): void {
  if (_primarySocket) {
    _primarySocket._close();
    _primarySocket = undefined;
  }
}

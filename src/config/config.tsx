import ReconnectingWebSocket from 'reconnecting-websocket'

export const API_URL = 'https://api.dongletrade.com'
export const REQUEST_API_URL = `${API_URL}/api/v1`
export const WEB_SOCKET_URL = 'wss://apisocket.dongletrade.com'
export const wsClient = new ReconnectingWebSocket(WEB_SOCKET_URL)

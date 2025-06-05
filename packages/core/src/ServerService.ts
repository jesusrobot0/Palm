import WebSocket, { WebSocketServer } from 'ws';
import { MessagePayload } from './Messages';

export class ServerService {
  private wss?: WebSocketServer;

  constructor(private readonly port: number = 8080) {}

  start() {
    this.wss = new WebSocketServer({ port: this.port });

    this.wss.on('listening', () => {
      console.log(`WebSocket server listening on ws://localhost:${this.port}`);
    });

    this.wss.on('connection', (ws: WebSocket) => {
      console.log('New client connected');

      ws.on('message', (data: WebSocket.RawData) => {
        const message: MessagePayload = JSON.parse(data.toString());
        console.log('Received message from client:', message);
        
        // 🔥 CLAVE: Retransmitir el mensaje a TODOS los otros clientes conectados
        // (excluyendo al remitente para evitar eco)
        this.broadcast(message, ws);
      });

      ws.on('close', () => {
        console.log('Client disconnected');
      });

      ws.on('error', (err) => {
        console.error('WebSocket error:', err);
      });
    });
  }

  broadcast(message: MessagePayload, excludeWs?: WebSocket) {
    const msg = JSON.stringify(message);
    this.wss?.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN && client !== excludeWs) {
        client.send(msg);
      }
    });
  }
}
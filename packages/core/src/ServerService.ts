import WebSocket, { WebSocketServer } from 'ws';

type MessagePayload = {
  type: string;
  data: any;
};

export class ServerService {
  private wss: WebSocketServer;

  constructor(private readonly port: number = 8080) {
    this.wss = new WebSocketServer({ port: this.port });

    this.wss.on('listening', () => {
      console.log(`WebSocket server listening on ws://localhost:${this.port}`);
    });

    this.wss.on('connection', (ws: WebSocket) => {
      console.log('New client connected');

      ws.on('message', (data: WebSocket.RawData) => {
        const message: MessagePayload = JSON.parse(data.toString());
        console.log('Received message from client:', message);

        // Aquí podríamos reenviar el mensaje a otros clientes si hiciera falta
      });

      ws.on('close', () => {
        console.log('Client disconnected');
      });

      ws.on('error', (err) => {
        console.error('WebSocket error:', err);
      });
    });
  }

  broadcast(message: MessagePayload) {
    const msg = JSON.stringify(message);
    this.wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(msg);
      }
    });
  }
}

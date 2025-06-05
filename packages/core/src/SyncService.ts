import WebSocket from 'ws';

type MessagePayload = {
  type: string;
  data: any;
};

export class SyncService {
  private ws?: WebSocket;

  constructor(private readonly remoteUrl: string) {}

  connect() {
    this.ws = new WebSocket(this.remoteUrl);

    this.ws.on('open', () => {
      console.log('Connected to:', this.remoteUrl);
    });

    this.ws.on('message', (data: WebSocket.RawData) => {
      const message: MessagePayload = JSON.parse(data.toString());
      console.log('Received message:', message);
      // Aquí luego llamaremos a ClipboardService para actualizar clipboard
    });

    this.ws.on('close', () => {
      console.log('Connection closed');
    });

    this.ws.on('error', (err) => {
      console.error('WebSocket error:', err);
    });
  }

  sendMessage(message: MessagePayload) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    } else {
      console.warn('WebSocket not connected.');
    }
  }
}

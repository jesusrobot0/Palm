import WebSocket from 'ws';
import { ClipboardService } from '@core/Clipboardservice';

type MessagePayload = {
  type: string;
  data: any;
};

export class SyncService {
  private ws?: WebSocket;
  private clipboard: ClipboardService;

  constructor(private readonly remoteUrl: string) {
    this.clipboard = new ClipboardService();
  }

  connect() {
    this.ws = new WebSocket(this.remoteUrl);

    this.ws.on('open', () => {
      console.log('Connected to:', this.remoteUrl);
    });

    this.ws.on('message', async (data: WebSocket.RawData) => {
      const message: MessagePayload = JSON.parse(data.toString());
      console.log('Received message:', message);

      if (message.type === 'clipboard') {
        await this.clipboard.setClipboard(message.data);
        console.log('Clipboard updated');
      }
    });

    this.ws.on('close', () => {
      console.log('Connection closed');
    });

    this.ws.on('error', (err) => {
      console.error('WebSocket error:', err);
    });
  }

  sendClipboardUpdate(content: string) {
    this.sendMessage({
      type: 'clipboard',
      data: content,
    });
  }
  
  private sendMessage(message: MessagePayload) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    } else {
      console.warn('WebSocket not connected.');
    }
  }
}

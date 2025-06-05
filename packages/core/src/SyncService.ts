import WebSocket from 'ws';
import { ClipboardService } from './Clipboardservice';
import { MessagePayload, MessageType } from './Messages';

export class SyncService {
  private ws?: WebSocket;
  private clipboard: ClipboardService;

  constructor(private readonly remoteUrl: string) {
    this.clipboard = new ClipboardService();
  }

  connect() {
    console.log('🔌 Connecting to:', this.remoteUrl);
    this.ws = new WebSocket(this.remoteUrl);

    this.ws.on('open', () => {
      console.log('✅ Connected to:', this.remoteUrl);
    });

    this.ws.on('message', async (data: WebSocket.RawData) => {
      const message: MessagePayload = JSON.parse(data.toString());
      console.log('📨 Received message:', message);
      await this.handleMessage(message);
    });

    this.ws.on('close', () => {
      console.log('❌ Connection closed');
    });

    this.ws.on('error', (err) => {
      console.error('💥 WebSocket error:', err);
    });
  }

  private async handleMessage(message: MessagePayload) {
    const handlers: Record<MessageType, (data: any) => Promise<void> | void> = {
      clipboard: async (data: string) => {
        await this.clipboard.setClipboard(data);
        console.log('Clipboard updated');
      },
      ping: (data) => {
        console.log('Received ping:', data);
      },
      pairing: (data) => {
        console.log('Received pairing:', data);
      },
      'sync-request': (data) => {
        console.log('Received sync-request:', data);
      },
      'sync-response': (data) => {
        console.log('Received sync-response:', data);
      }
    };

    const handler = handlers[message.type];
    if (handler) {
      await handler(message.data);
    } else {
      console.warn('Unknown message type:', message.type);
    }
  }

  sendClipboardUpdate(content: string) {
    console.log('📤 Sending clipboard update:', content.substring(0, 50) + '...');
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

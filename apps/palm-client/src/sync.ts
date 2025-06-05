import { ClipboardService } from '@core/Clipboardservice';
import { ClipboardWatcher } from '@core/ClipboardWatcher';
import { SyncService } from '@core/SyncService';

export class PalmSync {
  private sync?: SyncService;
  private clipboard?: ClipboardService;
  private watcher?: ClipboardWatcher;

  constructor(private readonly remoteUrl: string) {}

  start() {
    this.clipboard = new ClipboardService();
    this.sync = new SyncService(this.remoteUrl);
    this.watcher = new ClipboardWatcher(this.clipboard, (newContent) => {
      this.sync?.sendClipboardUpdate(newContent);
    });

    this.sync.connect();
    this.watcher.start();
  }

  stop() {
    this.watcher?.stop();
  }
}
import { ClipboardService } from '@core/Clipboardservice';
import { ClipboardWatcher } from '@core/ClipboardWatcher';
import { SyncService } from '@core/SyncService';

const remoteUrl = 'ws://localhost:8080';
const clipboard = new ClipboardService();
const sync = new SyncService(remoteUrl);
sync.connect();

const watcher = new ClipboardWatcher(clipboard, (newContent) => {
  console.log('Detected clipboard change:', newContent);
  sync.sendClipboardUpdate(newContent);
});

watcher.start();
import { ClipboardService } from '@core/Clipboardservice';

export class ClipboardWatcher {
  private lastContent: string | null = null;
  private intervalId?: NodeJS.Timeout;

  constructor(
    private readonly clipboard: ClipboardService,
    private readonly onChange: (newContent: string) => void
  ) {}

  start(intervalMs: number = 1000) {
    this.intervalId = setInterval(async () => {
      const current = await this.clipboard.getClipboard();

      if (current && current !== this.lastContent) {
        this.lastContent = current;
        this.onChange(current);
      }
    }, intervalMs);
  }

  stop() {
    if (this.intervalId) clearInterval(this.intervalId);
  }
}
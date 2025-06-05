// @ts-ignore
import { readText, writeText } from '@tauri-apps/plugin-clipboard-manager';

export class ClipboardService {
  async getClipboard(): Promise<string | null> {
    try {
      return await readText();
    } catch (err) {
      console.error('Error reading clipboard:', err);
      return null;
    }
  }

  async setClipboard(content: string): Promise<void> {
    try {
      await writeText(content);
    } catch (err) {
      console.error('Error writing clipboard:', err);
    }
  }
}

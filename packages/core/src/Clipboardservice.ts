import clipboardy from 'clipboardy';

export class ClipboardService {
  async getClipboard(): Promise<string | null> {
    try {
      return await clipboardy.read();
    } catch (err) {
      console.error('Error reading clipboard:', err);
      return null;
    }
  }

  async setClipboard(content: string): Promise<void> {
    try {
      await clipboardy.write(content);
    } catch (err) {
      console.error('Error writing clipboard:', err);
    }
  }
}

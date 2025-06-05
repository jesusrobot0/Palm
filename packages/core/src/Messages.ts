export type MessageType = 
  | 'clipboard'
  | 'ping'
  | 'pairing'
  | 'sync-request'
  | 'sync-response';

export type MessagePayload<T = any> = {
  type: MessageType;
  data: T;
};
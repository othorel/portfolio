export interface Notification {
  id: number;
  userId: number;
  message: string;
  read: boolean;
  createdAt: string;
  updatedAt: string;
  type?: string;
  data: Record<string, unknown>;
}

export enum FriendshipStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
}

export interface Friendship {
  id: number;
  userId: number;
  friendId: number;
  status: FriendshipStatus;
  createdAt: string;
  user?: {
    id: number;
    login: string;
    email: string;
    avatar?: string;
  };
  friend?: {
    id: number;
    login: string;
    email: string;
    avatar?: string;
  };
}

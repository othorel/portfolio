export interface User {
    id: number;
    login: string;
    email: string;
    avatar?: string | null;
    status?: string;
    role: string;
    friends?: User[];
}

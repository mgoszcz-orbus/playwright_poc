export interface UserCreateBody {
  name: string;
  email: string;
  roleId?: string;
}

export interface CreatedUser {
  id: string;
  name: string;
  email: string;
  roleId?: string;
  createdAt: string;
}

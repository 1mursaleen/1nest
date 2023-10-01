import { User } from '@/application/modules/users/entities/user.entity.typeorm';

export type LoginResponseType = Readonly<{
  token: string;
  refreshToken: string;
  tokenExpires: number;
  user: User;
}>;

import { Session } from '@/application/modules/authentication/session/entities/session.entity';
import { User } from '@/application/modules/users/entities/user.entity.typeorm';

export type JwtPayloadType = Pick<User, 'id' | 'role'> & {
  sessionId: Session['id'];
  iat: number;
  exp: number;
};

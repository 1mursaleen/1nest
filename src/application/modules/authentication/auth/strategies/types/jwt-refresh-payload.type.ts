import { Session } from '@/application/modules/authentication/session/entities/session.entity';

export type JwtRefreshPayloadType = {
  sessionId: Session['id'];
  iat: number;
  exp: number;
};

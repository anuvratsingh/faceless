import { Request, Response } from 'express';
import { Session } from 'express-session';
import { Redis } from 'ioredis';

export type Context = {
  req: Request & { session: Session & { userName: string } };
  res: Response;
  redis: Redis;
};

// export interface MyRequest extends Request {
//   session: Session & { userName: string };
// }

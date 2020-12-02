import { Request } from 'express';
import { Session } from 'express-session';

export type Context = {
  req: Request & { session: Session & { userName: string } };
}

// export interface MyRequest extends Request {
//   session: Session & { userName: string };
// }

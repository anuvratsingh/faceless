import { Context } from '../utils/types';
import { MiddlewareFn } from 'type-graphql';

export const isUser: MiddlewareFn<Context> = ({ context }, next) => {
  if (!context.req.session.userName) {
    throw new Error('Go get an alias');
  }

  return next();
};

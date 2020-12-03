import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import session from 'express-session';
import connectRedis from 'connect-redis';
import cors from 'cors';
import {
  COOKIE_SECRET,
  COOKIE_NAME,
  SERVER_URL,
  CLIENT_URL,
  COOKIE_AGE_DAYS,
  __prod__,
} from './secret';

import { MessageResolver } from './resolver/message';
import { UserResolver } from './resolver/user';
import { redis } from './redis';
// import { User } from './entity/User';
// import { Message } from './entity/Message';

const main = async () => {
  await createConnection();

  const schema = await buildSchema({
    validate: false,
    resolvers: [UserResolver, MessageResolver],
  });

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res, redis }),
  });

  // await User.delete({}); // to delete all data from this entity
  // await Message.delete({})
  const app = express();

  const RedisStore = connectRedis(session);

  app.use(
    cors({
      credentials: true,
      origin: CLIENT_URL,
    })
  );

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
      }),
      cookie: {
        httpOnly: true,
        sameSite: 'strict',
        secure: __prod__,
        maxAge: COOKIE_AGE_DAYS * 7, // 7 days
      },
      saveUninitialized: false,
      secret: COOKIE_SECRET,
      resave: false,
    })
  );

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(4000, () => {
    console.log(`Server started ${SERVER_URL}`);
  });
};

main().catch((err) => {
  console.log(err);
});

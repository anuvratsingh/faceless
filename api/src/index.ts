import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import session from 'express-session';
import connectRedis from 'connect-redis';
import cors from 'cors';

import { MessageResolver } from './resolver/message';
import { UserResolver } from './resolver/user';
import { redis } from './redis';
// import { User } from './entity/User';

const main = async () => {
  await createConnection();

  const schema = await buildSchema({
    resolvers: [UserResolver, MessageResolver],
  });

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req }) => ({ req }),
  });

  // await User.delete({}); to delete all data from this entity
  const app = express();

  const RedisStore = connectRedis(session);

  app.use(
    cors({
      credentials: true,
      origin: 'http://localhost:3000',
    })
  );

  app.use(
    session({
      name: 'cookie',
      store: new RedisStore({
        client: redis as any,
      }),
      cookie: {
        httpOnly: true,
        sameSite: 'lax',
        secure: false,
        maxAge: 1000 * 60 * 60 * 24, // 1 day
      },
      saveUninitialized: false,
      secret: 'ThisIsASecret',
      resave: false,
    })
  );

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(4000, () => {
    console.log('Server started http://localhost:4000/graphql');
  });
};

main().catch((err) => {
  console.log(err);
});

import { ApolloServer } from 'apollo-server-express';
import connectRedis from 'connect-redis';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { Message } from './entity/Message';
import { User } from './entity/User';
import { redis } from './redis';
import { MessageResolver } from './resolver/message';
import { UserResolver } from './resolver/user';
import {
  CLIENT_URL,
  COOKIE_AGE_DAYS,
  COOKIE_NAME,
  COOKIE_SECRET,
  SERVER_URL,
  __prod__,
} from './secret';

const main = async () => {
  // await createConnection({
  //   type: 'postgres',
  //   url: process.env.DATABASE_URL,
  //   logging: true,
  //   entities: [Message, User],
  // });

  let retries = 2;

  while (retries) {
    try {
      await createConnection({
        name: 'default',
        type: 'postgres',
        host: 'db', //localhost when not in docker
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'faceless',
        synchronize: true,
        logging: false,
        entities: [User, Message],
      });
      break;
    } catch (err) {
      console.log(err);
      retries -= 1;
      console.log(`retries left: ${retries}`);
      // wait 5 seconds
      await new Promise((res) => setTimeout(res, 5000));
    }
  }

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
        maxAge: COOKIE_AGE_DAYS * 7, // 7 days
        secure: __prod__,
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

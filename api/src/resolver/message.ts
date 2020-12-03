import { isUser } from '../middleware/isUser';
import {
  Arg,
  Ctx,

  // Field,
  // Int,
  Mutation,

  // ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql';
// import { getConnection } from 'typeorm';
import { Message } from '../entity/Message';
import { Context } from '../utils/types';
import { MessageInput } from './Inputs/MessageInput';

@Resolver(Message)
export class MessageResolver {
  @Query(() => String)
  async helloMessage() {
    return 'Hello message';
  }

  @Mutation(() => Message)
  @UseMiddleware(isUser)
  async message(
    @Arg('input') input: MessageInput,
    @Ctx() { req }: Context
  ): Promise<Message> {
    const message = await Message.create({
      ...input,
      userName: req.session.userName,
    }).save();

    return message;
  }
}

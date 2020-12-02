import { Context } from 'src/utils/types';
import {
  Arg,
  Ctx,
  // Field,
  // Int,
  Mutation,
  // ObjectType,
  Query,
  Resolver,
} from 'type-graphql';
// import { getConnection } from 'typeorm';
import { Message } from '../entity/Message';
import { UserMessageInput } from './Inputs/UserMessageInput';

// @ObjectType()
// class PaginatedMessages {
//   @Field(() => [Message])
//   posts: Message[];
// }

@Resolver(Message)
export class MessageResolver {
  @Query(() => String)
  async helloMessage() {
    return 'Hello message';
  }

  // @Query(() => PaginatedMessages)
  // async allMessage(
  //   @Arg('limit', () => Int) limit: number
  // ): Promise<PaginatedMessages> {
  //   const realLimit = Math.min(10, limit);

  //   const realLimitPlusOne = realLimit + 1;
  //   const qb = await getConnection()
  //     .getRepository(Message)
  //     .createQueryBuilder('m')
  //     .innerJoinAndSelect('m.user', 'u', 'u.userName = m."userName"')
  //     .orderBy('m."createdAt"', 'DESC')
  //     .take(realLimitPlusOne);

  //   const messages = await qb.getMany();

  //   return { messages: messages.slice(0, realLimit) };
  // }

  @Mutation(() => Message)
  async message(
    @Arg('input') input: UserMessageInput,
    @Ctx() { req }: Context
  ): Promise<Message> {
    const userMessage = await Message.create({
      ...input,
      userName: req.session.userName,
    }).save();
    return userMessage;
  }
}

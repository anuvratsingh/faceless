import {
  Arg,
  Ctx,
  Field,

  // Field,
  // Int,g
  Mutation,
  ObjectType,

  // ObjectType,
  Query,
  Resolver,
} from 'type-graphql';
// import { getConnection } from 'typeorm';
import { Message } from '../entity/Message';
import { Context } from '../utils/types';
import { validateMessageInput } from '../utils/validateMessageInput';
import { MessageInput } from './Inputs/MessageInput';

@ObjectType()
class MessageFieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class MessageResponse {
  @Field(() => [MessageFieldError], { nullable: true })
  errors?: MessageFieldError[];

  @Field(() => Message, { nullable: true })
  message?: Message;
}

// @ObjectType()
// class PaginatedMessages {
//   @Field(() => [Message])
//   messages: Message[];
//   @Field()
//   hasMore: boolean;
// }

@Resolver(Message)
export class MessageResolver {
  @Query(() => String)
  async helloMessage() {
    return 'Hello message';
  }

  @Query(() => [Message])
  async allMessages(): Promise<Message[]> {
    return Message.find();
  }

  @Mutation(() => MessageResponse)
  async message(
    @Arg('input') input: MessageInput,
    @Ctx() { req }: Context
  ): Promise<MessageResponse> {
    const errors = validateMessageInput(input, req);
    if (errors) {
      return { errors };
    }
    const message = await Message.create({
      ...input,
      userName: req.session.userName,
    }).save();

    return { message };
  }
}

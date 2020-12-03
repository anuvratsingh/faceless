import { Context } from '../utils/types';
import {
  Arg,
  Ctx,
  Field,
  // Field,
  // Int,
  Mutation,
  ObjectType,
  // ObjectType,
  Query,
  Resolver,
} from 'type-graphql';
import { getConnection } from 'typeorm';
// import { getConnection } from 'typeorm';
import { Message } from '../entity/Message';
import { MessageInput } from './Inputs/MessageInput';
import { validateMessageInput } from '../utils/validateMessageInput';

@ObjectType()
class MessageFieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
export class MessageResponse {
  @Field(() => [MessageFieldError], { nullable: true })
  errors?: MessageFieldError[];

  @Field(() => Message, { nullable: true })
  message?: Message;
}

@Resolver(Message)
export class MessageResolver {
  @Query(() => String)
  async helloMessage() {
    return 'Hello message';
  }

  @Mutation(() => MessageResponse)
  async message(
    @Arg('input') input: MessageInput,
    @Ctx() { req }: Context
  ): Promise<MessageResponse> {
    const errors = validateMessageInput(input);

    if (errors) {
      return { errors };
    }

    let message;

    try {
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Message)
        .values({
          message: input.message,
          userName: req.session.userName,
        })
        .returning('*')
        .execute();

      message = result.raw[0];
    } catch (err) {
      console.log(err);
    }

    return { message };
  }
}

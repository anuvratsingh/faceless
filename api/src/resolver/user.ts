import { Context } from '../utils/types';
import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from 'type-graphql';
import { User } from '../entity/User';
import { UserNameInput } from './Inputs/UserNameInput';
import { validateUserNameInput } from '../utils/ValidateUserNameInput';
import { getConnection } from 'typeorm';

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export class UserResolver {
  @Query(() => String)
  async helloUser() {
    return 'Hello user';
  }

  @Mutation(() => UserResponse)
  async user(
    @Arg('input') input: UserNameInput,
    @Ctx() { req }: Context
  ): Promise<UserResponse> {
    const errors = validateUserNameInput(input);
    console.log(errors)
    if (errors) {
      return { errors };
    }

    let user;

    // const user = await User.create({ userName }).save();

    try {
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({
          userName: input.userName,
        })
        .returning('*')
        .execute();
      console.log(result);
      user = result.raw[0];
    } catch (err) {
      console.log(err);
    }

    req.session.userName = user.userName;

    return { user };
  }
}

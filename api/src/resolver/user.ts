import { Context } from '../utils/types';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { User } from '../entity/User';
import { UserNameInput } from './Inputs/UserNameInput';

@Resolver()
export class UserResolver {
  @Query(() => String)
  async helloUser() {
    console.log('Hello');
    return 'Hello user';
  }

  @Mutation(() => User)
  async user(
    @Arg('input') { userName }: UserNameInput,
    @Ctx() { req }: Context
  ): Promise<User> {
    const user = await User.create({ userName }).save();
    req.session.userName = user.userName;
    return user;
  }
}

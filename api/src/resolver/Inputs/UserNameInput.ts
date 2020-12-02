import { Field, InputType } from 'type-graphql';
import { Length } from 'class-validator';

@InputType()
export class UserNameInput {
  @Field()
  @Length(1, 100)
  userName: string;
}

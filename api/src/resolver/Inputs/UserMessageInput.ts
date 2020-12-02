import { Field, InputType } from 'type-graphql';
import { Length } from 'class-validator';

@InputType()
export class UserMessageInput {
  @Field()
  @Length(1, 255)
  message: string;

}

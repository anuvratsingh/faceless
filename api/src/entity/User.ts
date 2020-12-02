import { Field, ID, ObjectType } from 'type-graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { Message } from './Message';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  userName!: string;

  @OneToMany(() => Message, (message) => message.user)
  message: Message[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt!: Date;
}

import { Field, ID, ObjectType } from 'type-graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import { User } from './User';

@ObjectType()
@Entity()
export class Message extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  message!: string;

  @Field()
  @Column()
  userName: string;

  @ManyToOne(() => User, (user) => user.message)
  user: User;

  @Field(() => String)
  @CreateDateColumn()
  createdAt!: Date;
}

import { Field, InputType } from '@nestjs/graphql';
import { TaskStatus } from '../todos.typedef';

@InputType('UpdateTodoDto')
export class UpdateTodoDto {
  @Field()
  title: string;

  @Field({ nullable: true })
  descriptions: string;

  @Field(type => TaskStatus)
  status: TaskStatus;
}

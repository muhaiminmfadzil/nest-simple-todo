import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';

export enum TaskStatus {
  new,
  inProgress,
  done,
}

registerEnumType(TaskStatus, {
  name: 'TaskStatus',
});

@ObjectType()
export class TodosTypedef {
  @Field(type => ID)
  id: number;

  @Field()
  title: string;

  @Field({ nullable: true })
  descriptions: string;

  @Field(type => TaskStatus)
  status: TaskStatus;

  @Field(type => Date)
  createdAt: string;

  @Field(type => Date)
  updatedAt: string;
}

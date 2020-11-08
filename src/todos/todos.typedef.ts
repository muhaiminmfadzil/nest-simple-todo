import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';

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
  @Field(type => Int)
  id: number;

  @Field()
  title: string;

  @Field({ nullable: true })
  descriptions: string;

  @Field(type => TaskStatus)
  status: TaskStatus;
}

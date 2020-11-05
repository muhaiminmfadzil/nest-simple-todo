import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TodosTypedef {
  @Field(type => Int)
  id: number;

  @Field()
  title: string;

  @Field({ nullable: true })
  descriptions: string;
}

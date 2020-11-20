import { ArgsType, Field, Int } from '@nestjs/graphql';
import { type } from 'os';

@ArgsType()
export class Pagination {
  @Field(type => Int, { nullable: true })
  offset?: number = 0;

  @Field(type => Int, { nullable: true })
  limit?: number = 2;
}

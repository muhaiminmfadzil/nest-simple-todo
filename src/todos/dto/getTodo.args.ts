import { ArgsType, Field } from '@nestjs/graphql';
import { Pagination } from '../../types/pagination';

@ArgsType()
export class GetTodoArgs extends Pagination {
  @Field({ nullable: true })
  done?: Boolean;
}

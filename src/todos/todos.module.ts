import { Module } from '@nestjs/common';
import { TodosResolver } from './todos.resolver';

@Module({
  providers: [TodosResolver],
})
export class TodosModule {}

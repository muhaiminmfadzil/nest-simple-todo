import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Todos } from './todos.entity';
import { TodosResolver } from './todos.resolver';
import { TodosService } from './todos.service';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [Todos] })],
  providers: [TodosResolver, TodosService],
})
export class TodosModule {}

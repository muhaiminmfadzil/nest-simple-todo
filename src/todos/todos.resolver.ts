import { Query, Resolver } from '@nestjs/graphql';
import { TodosTypedef } from './todos.typedef';

interface TodosInterface {
  id: number;
  title: string;
  descriptions: string;
}

@Resolver(of => TodosTypedef)
export class TodosResolver {
  private readonly todos: TodosInterface[] = [];

  @Query(returns => [TodosTypedef], { description: 'Get all todo lists' })
  getTodos(): TodosInterface[] {
    return this.todos;
  }
}

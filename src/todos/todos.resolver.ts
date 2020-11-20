import { NotFoundException } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UpdateTodoDto } from './dto/updateTodo.dto';
import { Todos as Todo } from './todos.entity';
import { TodosService } from './todos.service';
import { TaskStatus, TodosTypedef } from './todos.typedef';

interface TodosInterface {
  id: number;
  title: string;
  descriptions: string;
  status: TaskStatus;
}

@Resolver(of => TodosTypedef)
export class TodosResolver {
  constructor(private readonly todoService: TodosService) {}

  @Query(returns => [TodosTypedef], { description: 'Get all todo lists' })
  getTodos(): Promise<Todo[]> {
    return this.todoService.getTodos();
  }

  @Query(returns => TodosTypedef)
  getOneTodo(@Args('id', { type: () => ID }) id: string): Promise<Todo> {
    return this.todoService.getOneTodo(id);
  }

  @Mutation(returns => TodosTypedef, { description: 'Create new todo' })
  createTodo(
    @Args('title', { type: () => String }) title: string,
    @Args('descriptions', { type: () => String, nullable: true })
    descriptions: string,
  ): Promise<Todo> {
    return this.todoService.createTodo(title, descriptions);
  }

  @Mutation(returns => TodosTypedef, { description: 'Update one todo item' })
  updateTodo(
    @Args('id', { type: () => ID }) id: string,
    @Args('updateTodoInput', { type: () => UpdateTodoDto })
    updateTodoDto: UpdateTodoDto,
  ): Promise<Todo> {
    return this.todoService.updateTodo(id, updateTodoDto);
  }

  @Mutation(returns => Boolean, { description: 'Delete one todo item' })
  deleteTodo(@Args('id', { type: () => ID }) id: string): Promise<Boolean> {
    return this.todoService.deleteTodo(id);
  }
}

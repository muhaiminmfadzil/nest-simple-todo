import { NotFoundException } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
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

  // @Query(returns => TodosTypedef)
  // getOneTodo(@Args('id', { type: () => Int }) id: number): TodosInterface {
  //   const index = this.todos.findIndex(todo => todo.id === id);

  //   if (index === -1)
  //     throw new NotFoundException(`Todo item for id ${id} not found!`);

  //   return this.todos[index];
  // }

  @Mutation(returns => TodosTypedef, { description: 'Create new todo' })
  createTodo(
    @Args('title', { type: () => String }) title: string,
    @Args('descriptions', { type: () => String, nullable: true })
    descriptions: string,
  ): Promise<Todo> {
    return this.todoService.createTodo(title, descriptions);
  }

  // @Mutation(returns => TodosTypedef, { description: 'Update one todo item' })
  // updateTodo(
  //   @Args('id', { type: () => Int }) id: number,
  //   @Args('updateTodoInput', { type: () => UpdateTodoDto })
  //   updateTodoDto: UpdateTodoDto,
  // ): TodosInterface {
  //   const index = this.todos.findIndex(todo => todo.id === id);

  //   this.todos[index] = { id, ...updateTodoDto };

  //   return this.todos[index];
  // }

  // @Mutation(returns => Boolean, { description: 'Delete one todo item' })
  // deleteTodo(@Args('id', { type: () => Int }) id: number): Boolean {
  //   const index = this.todos.findIndex(todo => todo.id === id);

  //   if (index < 0) {
  //     throw new NotFoundException(`Todo item for id ${id} not found!`);
  //   }

  //   this.todos.splice(index, 1);

  //   return true;
  // }
}

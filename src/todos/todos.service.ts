import { EntityRepository } from '@mikro-orm/mongodb';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { title } from 'process';
import { Todos as Todo } from './todos.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly todosRepository: EntityRepository<Todo>,
  ) {}

  async getTodos(): Promise<Todo[]> {
    return this.todosRepository.findAll();
  }

  async getOneTodo(id: string): Promise<Todo> {
    return this.todosRepository.findOneOrFail({ id });
  }

  async createTodo(title: string, descriptions?: string): Promise<Todo> {
    const newTodo = new Todo(title, descriptions);

    await this.todosRepository.persistAndFlush(newTodo);

    return newTodo;
  }
}

import { wrap } from '@mikro-orm/core';
import { EntityRepository } from '@mikro-orm/mongodb';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { UpdateTodoDto } from './dto/updateTodo.dto';
import { Todos as Todo } from './todos.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly todosRepository: EntityRepository<Todo>,
  ) {}

  async getTodos(done?: Boolean): Promise<Todo[]> {
    if (done === undefined) return this.todosRepository.findAll();

    return done
      ? this.todosRepository.find({}, { filters: ['doneOnly'] })
      : this.todosRepository.find({}, { filters: ['notDone'] });
  }

  async getOneTodo(id: string): Promise<Todo> {
    return this.todosRepository.findOneOrFail({ id });
  }

  async createTodo(title: string, descriptions?: string): Promise<Todo> {
    const newTodo = new Todo(title, descriptions);

    await this.todosRepository.persistAndFlush(newTodo);

    return newTodo;
  }

  async updateTodo(id: string, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    const todo = await this.todosRepository.findOneOrFail({ id });

    wrap(todo).assign(updateTodoDto);

    await this.todosRepository.flush();

    return todo;
  }

  async deleteTodo(id: string): Promise<Boolean> {
    const deleted = await this.todosRepository.nativeDelete({ id });

    return deleted === 1;
  }
}

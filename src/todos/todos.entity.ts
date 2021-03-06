import {
  Entity,
  PrimaryKey,
  Property,
  SerializedPrimaryKey,
} from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';
import { TaskStatus } from './todos.typedef';

@Entity()
export class Todos {
  @PrimaryKey()
  _id: ObjectId;

  @SerializedPrimaryKey()
  id!: string;

  @Property()
  title!: string;

  @Property()
  descriptions?: string;

  @Property()
  status!: TaskStatus;

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

  constructor(title: string, descriptions?: string) {
    this.title = title;
    this.descriptions = descriptions;
    this.status = TaskStatus.new;
  }
}

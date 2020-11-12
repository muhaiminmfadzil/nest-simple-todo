import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [
    MikroOrmModule.forRoot({
      entities: ['./dist/**/*.entity.js'],
      entitiesTs: ['./src/**/*.entity.ts'],
      dbName: 'simple-todo',
      type: 'mongo',
      forceUtcTimezone: true,
      debug: true,
    }),
    GraphQLModule.forRoot({
      debug: true,
      autoSchemaFile: join(process.cwd(), 'src/gqlSchema.gql'),
    }),
    TodosModule,
  ],
})
export class AppModule {}

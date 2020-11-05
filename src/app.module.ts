import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

@Module({
  imports: [
    GraphQLModule.forRoot({
      debug: true,
      autoSchemaFile: join(process.cwd(), 'src/gqlSchema.gql'),
    }),
  ],
})
export class AppModule {}

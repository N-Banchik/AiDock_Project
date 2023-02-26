import { PhotosModule } from './Photos/photos.module';
import { ContactsController } from './Controllers/contacts.controller';
import { ContactsModule } from './Contacts/contacts.module';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmConfigService } from './Configuration/TypeOrmConfig';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    PhotosModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './environmentvar.env',
    }),
    ContactsModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

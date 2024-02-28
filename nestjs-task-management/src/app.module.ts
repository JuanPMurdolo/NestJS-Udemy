import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from 'process';

@Module({
  imports: [
  ConfigModule.forRoot({ 
    envFilePath: ['.env.stage.${process.env.STAGE}'],

  }),
  TasksModule,
  TypeOrmModule.forRoot({
    imports: [ConfigModule],
    inject: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      type: configService.get('DB_TYPE'),
      host: configService.get('DB_HOST'),
      port: configService.get('DB_PORT'),
      username: configService.get('DB_USERNAME'),
      password: configService.get('DB_PASSWORD'),
      database: configService.get('DB_DATABASE'),
      autoLoadEntities: configService.get('DB_AUTOLOAD_ENTITIES') === 'true' ? true : false,
      synchronize: configService.get('DB_SYNCHRONIZE') === 'true' ? true : false,
    }),
  }),
  AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

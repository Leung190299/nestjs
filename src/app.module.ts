import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/user.entity';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: 'prostgres',
      username: 'postgres',
      database: 'task-nest',
      autoLoadEntities: true,
      synchronize: true,
      entities: [User],
    }),

    AuthModule,
  ],
})
export class AppModule {}

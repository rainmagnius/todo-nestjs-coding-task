import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { GroupsModule } from './groups/groups.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [TasksModule, GroupsModule, MongooseModule.forRoot('mongodb://localhost:27017/nest')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

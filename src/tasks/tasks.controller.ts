import { Controller, Get, Param } from '@nestjs/common';
import { Task, TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(): Task[] {
    return this.tasksService.getTasksAll();
  }
}

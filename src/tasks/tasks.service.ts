import { Injectable } from '@nestjs/common';
import { CreateTasksDTO } from './dto/tasks.module.dto';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
}

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getTasksAll(): Task[] {
    return this.tasks;
  }

  createTask(createTasksDTO: CreateTasksDTO): Task {
    const { title, description } = createTasksDTO;
    const newTask: Task = {
      id: (Math.random() * 100).toString(),
      title,
      description,
      status: 'new',
    };
    this.tasks.push(newTask);
    return newTask;
  }

  deleteTask(id: string): string {
    this.tasks.filter((item) => item.id !== id);
    return 'succses';
  }

  getTaskById(id: string): Task {
    return this.tasks.find((item) => item.id == id);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
    if (Object.keys(filterDto).length) {
      return this.tasksService.getTasksWithFilters(filterDto);
    } else {
      return this.tasksService.getAllTasks();
    }
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    // Si no se utiliza 'id' dentro de param entonces se recibe como un objeto
    return this.tasksService.getTaskById(id);
  }

  @Post()
  CreateTask(@Body() createTasktDTO: CreateTaskDto): Task {
    return this.tasksService.createTask(createTasktDTO);
  }

  @Delete('/:id')
  DeleteTask(@Param('id') id: string): void {
    this.tasksService.DeleteTask(id);
  }

  @Patch('/:id')
  UpdateTask(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ): Task {
    return this.tasksService.UpdateTask(id, status);
  }
}

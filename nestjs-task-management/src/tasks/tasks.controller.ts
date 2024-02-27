import { Body, Controller, Delete, Get, Param, Post, Patch, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService){}

    @Get()
    getTasks(@Query() filterDTO: GetTaskFilterDto): Promise<Task[]>{
        if (Object.keys(filterDTO).length) {
            return this.tasksService.getTasksWithFilters(filterDTO);
        } else {
            return this.tasksService.getAllTasks();
        }
    }

    @Get()
    getTaskById(@Param('id') id: string): Promise<Task>{
        return this.tasksService.getTaskById(id);
    }

    @Post()
    createTask(@Body() createTaskDTO: CreateTaskDTO): Promise<Task>{
        return this.tasksService.createTask(createTaskDTO);
    }

    @Delete()
    deleteTask(@Param('id') id: string): Promise<void>{
        return this.tasksService.deleteTask(id);
    }

    @Patch()
    updateTaskStatus(@Param('id') id: string, @Body('status') status: TaskStatus): Promise<Task>{
        return this.tasksService.updateTaskStatus(id, status);
    }
}

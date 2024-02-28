import { Body, Controller, Delete, Get, Param, Post, Patch, Query, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { Task } from './task.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private tasksService: TasksService){}

    @Get()
    getTasks(
        @Query() filterDTO: GetTaskFilterDto,
        @GetUser() user: User
    ): Promise<Task[]>{
        return this.tasksService.getTasks(filterDTO, user);
    }

    @Get()getTaskById
    (
        @Param('id') id: string,
        @GetUser() user: User
    ): Promise<Task>{
        return this.tasksService.getTaskById(id, user);
    }

    @Post()
    createTask(
        @Body() createTaskDTO: CreateTaskDTO,
        @GetUser() user: User
    ): Promise<Task>{
        return this.tasksService.createTask(createTaskDTO, user);
    }

    @Delete()
    deleteTask(@Param('id') id: string, @GetUser() user: User): Promise<void>{
        return this.tasksService.deleteTask(id, user);
    }

    @Patch()
    updateTaskStatus(
        @Param('id') id: string, 
        @Body('status') status: TaskStatus,
        @GetUser() user: User
    ): Promise<Task>{
        return this.tasksService.updateTaskStatus(id, status, user);
    }
}

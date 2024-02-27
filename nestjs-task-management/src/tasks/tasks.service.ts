import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDTO } from './dto/create-task.dto';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TasksService {
    constructor(@InjectRepository(Task) private taskRepository: TaskRepository<Task>){

    }

    async getTaskById(id: string): Promise<Task>{
        const found = await this.taskRepository.findOne(id);
        if (!found) {
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }
        return found;
    }

    async createTask(createTaskDTO: CreateTaskDTO): Promise<Task>{
        const { title, description } = createTaskDTO;
        const task = this.taskRepository.create({
            title,
            description,
            status: TaskStatus.OPEN,
        });
        await this.taskRepository.save(task);
        return task;
    }
    
}

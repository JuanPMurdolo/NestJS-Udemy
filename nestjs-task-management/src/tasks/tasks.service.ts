import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDTO } from './dto/create-task.dto';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TasksService {
    constructor(@InjectRepository(Task) private taskRepository: TaskRepository){

    }

    async getAllTasks(): Promise<Task[]>{
        return this.taskRepository.find();
    }

    async getTasksWithFilters(filterDTO: any): Promise<Task[]>{
        return this.taskRepository.find(filterDTO);
    }

    async getTaskById(id: string): Promise<Task>{
        const found = await this.taskRepository.findOne(id);
        if (!found) {
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }
        return found;
    }

    createTask(createTaskDto: CreateTaskDTO): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto);
      }

    async deleteTask(id: string): Promise<void>{
        const result = await this.taskRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }
    }

    async updateTaskStatus(id: string, status: TaskStatus): Promise<Task>{
        const task = await this.getTaskById(id);
        task.status = status;
        await this.taskRepository.save(task);
        return task;
    }
    
}

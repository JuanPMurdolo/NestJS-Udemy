import { Entity, EntityRepository, Repository } from "typeorm"
import { Task } from "./task.entity"
import { TaskStatus } from "./task-status.enum"
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { CreateTaskDTO } from "./dto/create-task.dto";
import { GetTaskFilterDto } from "./dto/get-tasks-filter.dto";
import { User } from "src/auth/user.entity";
import { Logger } from "@nestjs/common";  

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    private logger = new Logger('TaskRepository');
    async getTasks(filterDto: GetTaskFilterDto, user: User): Promise<Task[]> {
      const { status, search } = filterDto;
  
      const query = this.createQueryBuilder('task');

      query.where({user});
  
      if (status) {
        query.andWhere('task.status = :status', { status });
      }
  
      if (search) {
        query.andWhere(
          '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
          { search: `%${search}%` },
        );
      }
  
      try
      {
        const tasks = await query.getMany();
        return tasks;
      }
      catch (error)
      {
        this.logger.error(`Failed to get tasks for user "${user.username}", DTO: ${JSON.stringify(filterDto)}`, error.stack);
        throw new InternalServerErrorException();
      }
    }
  
    async createTask(createTaskDto: CreateTaskDTO, user: User): Promise<Task> {
      const { title, description } = createTaskDto;
  
      const task = this.create({
        title,
        description,
        status: TaskStatus.OPEN,
        user,
      });
  
      await this.save(task);
      return task;
    }
  }
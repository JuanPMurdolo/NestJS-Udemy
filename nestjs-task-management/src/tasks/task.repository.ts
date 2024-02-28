import { Entity, EntityRepository, Repository } from "typeorm"
import { Task } from "./task.entity"
import { TaskStatus } from "./task-status.enum"
import { Injectable } from "@nestjs/common";
import { CreateTaskDTO } from "./dto/create-task.dto";
import { GetTaskFilterDto } from "./dto/get-tasks-filter.dto";
import { User } from "src/auth/user.entity";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
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
  
      const tasks = await query.getMany();
      return tasks;
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
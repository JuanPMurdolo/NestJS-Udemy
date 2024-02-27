import { Entity, EntityRepository, Repository } from "typeorm"
import { Task } from "./task.entity"
import { TaskStatus } from "./task-status.enum"
import { Injectable } from "@nestjs/common";

@EntityRepository(Task)
export class TaskRepository<Task> extends Repository<Task> {

}



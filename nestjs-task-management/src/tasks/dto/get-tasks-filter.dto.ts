import { IsOptional, IsString, IsEnum } from "class-validator";
import { TaskStatus } from "../task-status.enum";

export class GetTaskFilterDto {
    @IsOptional()
    @IsEnum(TaskStatus)
    status?: TaskStatus;

    @IsOptional()
    @IsString()
    search?: string;
}
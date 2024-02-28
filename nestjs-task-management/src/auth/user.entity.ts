import { Task } from "src/tasks/task.entity";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryColumn('uuid')
    id: string;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @OneToMany((_type) => Task, task => task.user, { eager: true })
    tasks: Task[];
}

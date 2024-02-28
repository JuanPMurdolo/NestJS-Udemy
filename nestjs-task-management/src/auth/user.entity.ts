import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryColumn('uuid')
    id: string;

    @Column({ unique: true })
    username: string;


    @Column()
    password: string;
}

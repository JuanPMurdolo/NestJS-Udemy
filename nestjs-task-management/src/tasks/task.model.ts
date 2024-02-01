export interface Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    }

export enum TaskStatus {
    OPEN = 'OPEN',
    IN_PROGRESS = 'IN_PROGRESS',
    ON_HOLD = 'ON_HOLD',
    REVIEW = 'REVIEW',
    DONE = 'DONE',
}

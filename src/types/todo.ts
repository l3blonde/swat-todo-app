export interface Todo {
    id: string;
    text: string;
    status: string; // 'todo', 'inProgress', 'done'
    importance: number; // 1 (low), 2 (medium), 3 (high)
    dueDate: string; // ISO string
}

export type ViewType = 'list' | 'kanban';

export interface FilterCriteria {
    status?: string;
    priority?: number;
    dueDate?: string;
    assignee?: string;
}
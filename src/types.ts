// src/types.ts
export interface Todo {
    id: string;
    text: string;
    completed: boolean;
    importance: 1 | 2 | 3; // 1 = low, 2 = medium, 3 = high
    dueDate: string;
}

export interface TodoFormProps {
    addTodo: (text: string, importance: number, dueDate: string) => void;
}

export interface TodoListProps {
    todos: Todo[];
    toggleTodo: (id: string) => void;
    removeTodo: (id: string) => void;
    updateTodo: (id: string, updatedTodo: Todo) => void;
    filter: string;
    setFilter: (filter: string) => void;
}

export interface TodoItemProps {
    todo: Todo;
    toggleTodo: (id: string) => void;
    removeTodo: (id: string) => void;
    updateTodo: (id: string, updatedTodo: Todo) => void;
}

export interface TodoDetailProps {
    todo: Todo | null;
    open: boolean;
    handleClose: () => void;
    updateTodo: (id: string, updatedTodo: Todo) => void;
}
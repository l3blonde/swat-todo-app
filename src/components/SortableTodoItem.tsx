// src/components/SortableTodoItem.tsx
'use client'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Box } from '@mui/material'
import TodoItem from './TodoItem'
import type { Todo } from '../types/todo'

interface SortableTodoItemProps {
    todo: Todo;
    toggleTodo: (id: string) => void;
    removeTodo: (id: string) => void;
    updateTodo: (id: string, updatedTodo: Todo) => void;
}

export default function SortableTodoItem({ todo, toggleTodo, removeTodo, updateTodo }: SortableTodoItemProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: todo.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 999 : 1,
    };

    return (
        <Box
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            sx={{
                mb: 2,
                cursor: 'grab',
                '&:active': { cursor: 'grabbing' },
                position: 'relative',
            }}
        >
            <TodoItem
                todo={todo}
                toggleTodo={toggleTodo}
                removeTodo={removeTodo}
                updateTodo={updateTodo}
            />
        </Box>
    );
}
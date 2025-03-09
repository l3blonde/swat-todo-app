// src/components/KanbanBoard.tsx (simplified)
'use client'
import { useState } from 'react'
import { Box, Typography, Paper, Grid, Button } from '@mui/material'
import TodoItem from './TodoItem'
import type { Todo } from '../types/todo'

interface KanbanBoardProps {
    todosByStatus: {
        todo: Todo[];
        inProgress: Todo[];
        done: Todo[];
    };
    toggleTodo: (id: string) => void;
    removeTodo: (id: string) => void;
    updateTodo: (id: string, updatedTodo: Todo) => void;
    moveTodoStatus: (id: string, newStatus: string) => void;
}

// Helper function to get column color
const getColumnColor = (status: string) => {
    switch (status) {
        case 'todo':
            return 'info.light';
        case 'inProgress':
            return 'warning.light';
        case 'done':
            return 'success.light';
        default:
            return 'grey.300';
    }
}

export default function KanbanBoard({
                                        todosByStatus,
                                        toggleTodo,
                                        removeTodo,
                                        updateTodo,
                                        moveTodoStatus
                                    }: KanbanBoardProps) {

    // Function to move a todo to a different status
    const handleMoveTodo = (todoId: string, newStatus: string) => {
        moveTodoStatus(todoId, newStatus);
    };

    // Render a column
    const renderColumn = (title: string, todos: Todo[], status: string) => (
        <Paper
            elevation={2}
            sx={{
                height: '100%',
                minHeight: 300,
                p: 2,
                bgcolor: 'background.paper',
                borderTop: 4,
                borderColor: getColumnColor(status),
            }}
        >
            <Typography
                variant="h6"
                sx={{
                    mb: 2,
                    pb: 1,
                    borderBottom: '1px solid',
                    borderColor: 'divider'
                }}
            >
                {title} ({todos.length})
            </Typography>

            {todos.map((todo) => (
                <Box key={todo.id} sx={{ mb: 2 }}>
                    <TodoItem
                        todo={todo}
                        toggleTodo={toggleTodo}
                        removeTodo={removeTodo}
                        updateTodo={updateTodo}
                    />

                    {/* Add move buttons */}
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                        {status !== 'todo' && (
                            <Button
                                size="small"
                                onClick={() => handleMoveTodo(todo.id, 'todo')}
                                sx={{ mr: 1 }}
                            >
                                Move to To Do
                            </Button>
                        )}

                        {status !== 'inProgress' && (
                            <Button
                                size="small"
                                onClick={() => handleMoveTodo(todo.id, 'inProgress')}
                                sx={{ mr: 1 }}
                            >
                                Move to In Progress
                            </Button>
                        )}

                        {status !== 'done' && (
                            <Button
                                size="small"
                                onClick={() => handleMoveTodo(todo.id, 'done')}
                            >
                                Move to Done
                            </Button>
                        )}
                    </Box>
                </Box>
            ))}

            {todos.length === 0 && (
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        textAlign: 'center',
                        mt: 4,
                        fontStyle: 'italic'
                    }}
                >
                    No tasks in this column
                </Typography>
            )}
        </Paper>
    );

    return (
        <Grid container spacing={2} sx={{ minHeight: 400 }}>
            <Grid item xs={12} md={4}>
                {renderColumn('To Do', todosByStatus.todo, 'todo')}
            </Grid>
            <Grid item xs={12} md={4}>
                {renderColumn('In Progress', todosByStatus.inProgress, 'inProgress')}
            </Grid>
            <Grid item xs={12} md={4}>
                {renderColumn('Done', todosByStatus.done, 'done')}
            </Grid>
        </Grid>
    );
}
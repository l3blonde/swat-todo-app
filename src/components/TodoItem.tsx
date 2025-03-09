// src/components/TodoItem.tsx
'use client'

import { useState } from 'react'
import {
    ListItem,
    ListItemText,
    ListItemIcon,
    Checkbox,
    IconButton,
    Chip,
    Box,
    Tooltip,
    Paper
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import PriorityHighIcon from '@mui/icons-material/PriorityHigh'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import InfoIcon from '@mui/icons-material/Info'
import { format } from 'date-fns'
import TodoDetail from './TodoDetail'
import type { Todo } from '../types/todo'

interface TodoItemProps {
    todo: Todo;
    toggleTodo: (id: string) => void;
    removeTodo: (id: string) => void;
    updateTodo: (id: string, updatedTodo: Todo) => void;
}

export default function TodoItem({ todo, toggleTodo, removeTodo, updateTodo }: TodoItemProps) {
    const [detailOpen, setDetailOpen] = useState(false)
    const { id, text, status, importance, dueDate } = todo

    const isCompleted = status === 'done'
    const isOverdue = new Date(dueDate) < new Date() && status !== 'done'

    const formatDueDate = (dateString: string) => {
        try {
            return format(new Date(dateString), 'MMM d, yyyy')
        } catch (error) {
            return 'Invalid date'
        }
    }

    const getImportanceColor = (level: number) => {
        switch (level) {
            case 1:
                return 'success'
            case 2:
                return 'warning'
            case 3:
                return 'error'
            default:
                return 'default'
        }
    }

    const getImportanceLabel = (level: number) => {
        switch (level) {
            case 1:
                return 'Low'
            case 2:
                return 'Medium'
            case 3:
                return 'High'
            default:
                return 'None'
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'todo':
                return 'info'
            case 'inProgress':
                return 'warning'
            case 'done':
                return 'success'
            default:
                return 'default'
        }
    }

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'todo':
                return 'To Do'
            case 'inProgress':
                return 'In Progress'
            case 'done':
                return 'Done'
            default:
                return status
        }
    }

    const handleOpenDetail = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent event from bubbling up to drag handlers
        setDetailOpen(true);
    }

    const handleCloseDetail = () => {
        setDetailOpen(false);
    }

    const handleToggle = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent event from bubbling up to drag handlers
        // If it's already done, set it back to todo
        // If it's not done, set it to done
        const newStatus = status === 'done' ? 'todo' : 'done';
        updateTodo(id, { ...todo, status: newStatus });
    }

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent event from bubbling up to drag handlers
        removeTodo(id);
    }

    return (
        <>
            <Paper
                elevation={1}
                sx={{
                    mb: 1,
                    opacity: isCompleted ? 0.7 : 1,
                    textDecoration: isCompleted ? 'line-through' : 'none',
                    bgcolor: isOverdue ? 'rgba(255, 0, 0, 0.05)' : 'background.paper',
                    borderRadius: 1,
                }}
            >
                <ListItem
                    secondaryAction={
                        <Box>
                            <IconButton
                                aria-label="info"
                                onClick={handleOpenDetail}
                                sx={{ mr: 1 }}
                                onMouseDown={(e) => e.stopPropagation()} // Prevent drag from starting
                            >
                                <InfoIcon />
                            </IconButton>
                            <IconButton
                                edge="end"
                                aria-label="delete"
                                onClick={handleDelete}
                                onMouseDown={(e) => e.stopPropagation()} // Prevent drag from starting
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    }
                >
                    <ListItemIcon>
                        <Checkbox
                            edge="start"
                            checked={isCompleted}
                            onChange={() => handleToggle({} as React.MouseEvent)}
                            inputProps={{ 'aria-labelledby': id }}
                            onClick={(e) => e.stopPropagation()} // Prevent drag from starting
                            onMouseDown={(e) => e.stopPropagation()} // Prevent drag from starting
                        />
                    </ListItemIcon>
                    <ListItemText
                        primary={text}
                        secondary={
                            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1, mt: 0.5 }}>
                                <Tooltip title={`Status: ${getStatusLabel(status)}`}>
                                    <Chip
                                        label={getStatusLabel(status)}
                                        size="small"
                                        color={getStatusColor(status)}
                                        variant="outlined"
                                    />
                                </Tooltip>
                                <Tooltip title={`Priority: ${getImportanceLabel(importance)}`}>
                                    <Chip
                                        icon={<PriorityHighIcon />}
                                        label={getImportanceLabel(importance)}
                                        size="small"
                                        color={getImportanceColor(importance)}
                                        variant="outlined"
                                    />
                                </Tooltip>
                                <Tooltip title={isOverdue ? 'Overdue' : 'Due date'}>
                                    <Chip
                                        icon={<AccessTimeIcon />}
                                        label={formatDueDate(dueDate)}
                                        size="small"
                                        color={isOverdue ? 'error' : 'default'}
                                        variant="outlined"
                                    />
                                </Tooltip>
                            </Box>
                        }
                    />
                </ListItem>
            </Paper>
            <TodoDetail todo={todo} open={detailOpen} handleClose={handleCloseDetail} updateTodo={updateTodo} />
        </>
    )
}
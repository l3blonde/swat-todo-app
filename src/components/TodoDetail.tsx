'use client'

import { useState } from 'react'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Chip,
    Box,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Grid,
} from '@mui/material'
import PriorityHighIcon from '@mui/icons-material/PriorityHigh'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import { format } from 'date-fns'
import { Todo } from '../types/todo'

interface TodoDetailProps {
    todo: Todo;
    open: boolean;
    handleClose: () => void;
    updateTodo: (id: string, updatedTodo: Todo) => void;
}

export default function TodoDetail({ todo, open, handleClose, updateTodo }: TodoDetailProps) {
    const [editMode, setEditMode] = useState(false)
    const [editedText, setEditedText] = useState(todo?.text || '')
    const [editedStatus, setEditedStatus] = useState(todo?.status || 'todo')
    const [editedImportance, setEditedImportance] = useState(todo?.importance || 2)
    const [editedDueDate, setEditedDueDate] = useState(
        todo?.dueDate ? new Date(todo.dueDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    )

    if (!todo) return null

    const { id, text, status, importance, dueDate } = todo

    const isCompleted = status === 'done'
    const isOverdue = new Date(dueDate) < new Date() && status !== 'done'

    const formatDueDate = (dateString: string) => {
        try {
            return format(new Date(dateString), 'MMMM d, yyyy')
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

    const handleSave = () => {
        updateTodo(id, {
            ...todo,
            text: editedText,
            status: editedStatus,
            importance: editedImportance,
            dueDate: new Date(editedDueDate).toISOString(),
        })
        setEditMode(false)
    }

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle>{editMode ? 'Edit Task' : 'Task Details'}</DialogTitle>
            <DialogContent>
                {editMode ? (
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Task"
                                value={editedText}
                                onChange={(e) => setEditedText(e.target.value)}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel id="edit-status-label">Status</InputLabel>
                                <Select
                                    labelId="edit-status-label"
                                    value={editedStatus}
                                    label="Status"
                                    onChange={(e) => setEditedStatus(e.target.value)}
                                >
                                    <MenuItem value="todo">To Do</MenuItem>
                                    <MenuItem value="inProgress">In Progress</MenuItem>
                                    <MenuItem value="done">Done</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel id="edit-importance-label">Priority</InputLabel>
                                <Select
                                    labelId="edit-importance-label"
                                    value={editedImportance}
                                    label="Priority"
                                    onChange={(e) => setEditedImportance(Number(e.target.value))}
                                >
                                    <MenuItem value={1}>Low</MenuItem>
                                    <MenuItem value={2}>Medium</MenuItem>
                                    <MenuItem value={3}>High</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Due Date"
                                type="date"
                                value={editedDueDate}
                                onChange={(e) => setEditedDueDate(e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                    </Grid>
                ) : (
                    <>
                        <Typography variant="h6" gutterBottom>
                            {text}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, mt: 2, mb: 2 }}>
                            <Chip
                                label={getStatusLabel(status)}
                                color={getStatusColor(status)}
                            />
                            <Chip
                                icon={<PriorityHighIcon />}
                                label={getImportanceLabel(importance)}
                                color={getImportanceColor(importance)}
                            />
                            <Chip
                                icon={<AccessTimeIcon />}
                                label={formatDueDate(dueDate)}
                                color={isOverdue ? 'error' : 'default'}
                            />
                        </Box>
                        {isOverdue && (
                            <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                                This task is overdue!
                            </Typography>
                        )}
                    </>
                )}
            </DialogContent>
            <DialogActions>
                {editMode ? (
                    <>
                        <Button onClick={() => setEditMode(false)}>Cancel</Button>
                        <Button onClick={handleSave} variant="contained" color="primary">
                            Save
                        </Button>
                    </>
                ) : (
                    <>
                        <Button onClick={handleClose}>Close</Button>
                        <Button onClick={() => setEditMode(true)} color="primary">
                            Edit
                        </Button>
                    </>
                )}
            </DialogActions>
        </Dialog>
    )
}
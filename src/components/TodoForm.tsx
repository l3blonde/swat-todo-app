'use client'

import { useState } from 'react'
import {
    TextField,
    Button,
    InputAdornment,
    IconButton,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Grid,
    Paper,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { Todo } from '../types/todo'

interface TodoFormProps {
    addTodo: (text: string, importance: number, dueDate: string, status: string) => void;
}

export default function TodoForm({ addTodo }: TodoFormProps) {
    const [text, setText] = useState('')
    const [importance, setImportance] = useState(2) // Default to medium importance
    const [status, setStatus] = useState('todo') // Default to "To Do"
    const [dueDate, setDueDate] = useState(new Date().toISOString().split('T')[0])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (text.trim()) {
            addTodo(text.trim(), importance, new Date(dueDate).toISOString(), status)
            setText('')
            // Keep the importance, status, and due date as they are for the next todo
        }
    }

    return (
        <Paper elevation={3} sx={{ p: 3, width: '100%' }}>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Add Task"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            variant="outlined"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton type="submit" edge="end" disabled={!text.trim()}>
                                            <AddIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControl fullWidth>
                            <InputLabel id="status-label">Status</InputLabel>
                            <Select
                                labelId="status-label"
                                value={status}
                                label="Status"
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <MenuItem value="todo">To Do</MenuItem>
                                <MenuItem value="inProgress">In Progress</MenuItem>
                                <MenuItem value="done">Done</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControl fullWidth>
                            <InputLabel id="importance-label">Priority</InputLabel>
                            <Select
                                labelId="importance-label"
                                value={importance}
                                label="Priority"
                                onChange={(e) => setImportance(Number(e.target.value))}
                            >
                                <MenuItem value={1}>Low</MenuItem>
                                <MenuItem value={2}>Medium</MenuItem>
                                <MenuItem value={3}>High</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            label="Due Date"
                            type="date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            disabled={!text.trim()}
                            startIcon={<AddIcon />}
                        >
                            Add Task
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    )
}
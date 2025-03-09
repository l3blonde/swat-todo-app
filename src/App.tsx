'use client'

import { useState, useEffect } from 'react'
import { Box, Container, CssBaseline, Typography } from '@mui/material'
import TodoList from './components/TodoList'
import TodoForm from './components/TodoForm'
import NavBar from './components/NavBar'
import { Todo } from './types/todo'

function App() {
    const [todos, setTodos] = useState<Todo[]>(() => {
        const savedTodos = localStorage.getItem('todos')
        if (savedTodos) {
            return JSON.parse(savedTodos)
        } else {
            return [
                {
                    id: '1',
                    text: 'Walk the dog',
                    status: 'done',
                    importance: 2,
                    dueDate: new Date().toISOString()
                },
                {
                    id: '2',
                    text: 'Walk the cat',
                    status: 'todo',
                    importance: 1,
                    dueDate: new Date().toISOString()
                },
                {
                    id: '3',
                    text: 'Walk the fish',
                    status: 'inProgress',
                    importance: 3,
                    dueDate: new Date(Date.now() + 86400000).toISOString(),
                },
                {
                    id: '4',
                    text: 'Walk the chickens',
                    status: 'todo',
                    importance: 2,
                    dueDate: new Date(Date.now() + 172800000).toISOString(),
                },
            ]
        }
    })

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])

    const addTodo = (text: string, importance: number, dueDate: string, status: string) => {
        const newTodo: Todo = {
            id: crypto.randomUUID(),
            text,
            status,
            importance,
            dueDate,
        }
        setTodos([...todos, newTodo])
    }

    const toggleTodo = (id: string) => {
        setTodos(todos.map((todo) =>
            todo.id === id
                ? { ...todo, status: todo.status === 'done' ? 'todo' : 'done' }
                : todo
        ))
    }

    const removeTodo = (id: string) => {
        setTodos(todos.filter((todo) => todo.id !== id))
    }

    const updateTodo = (id: string, updatedTodo: Todo) => {
        setTodos(todos.map((todo) => (todo.id === id ? { ...updatedTodo } : todo)))
    }

    const moveTodoStatus = (id: string, newStatus: string) => {
        setTodos(todos.map((todo) =>
            todo.id === id
                ? { ...todo, status: newStatus }
                : todo
        ))
    }

    return (
        <>
            <CssBaseline />
            <NavBar />
            <Container maxWidth="lg">
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        m: 3,
                    }}
                >
                    <Typography variant="h4" component="h1" gutterBottom>
                        SWAT Task Board
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom sx={{ textAlign: 'center', mb: 3 }}>
                        Sit Wait Act Think
                        <br />
                        Organize your tasks with our Kanban board
                    </Typography>

                    <TodoForm addTodo={addTodo} />
                    <Box sx={{ mt: 3, width: '100%' }}>
                        <TodoList
                            todos={todos}
                            toggleTodo={toggleTodo}
                            removeTodo={removeTodo}
                            updateTodo={updateTodo}
                            moveTodoStatus={moveTodoStatus}
                        />
                    </Box>
                </Box>
            </Container>
        </>
    )
}

export default App
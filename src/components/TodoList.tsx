'use client'
import { useState } from 'react'
import {
    Box,
    Typography,
    Paper,
    Grid,
    Chip,
    IconButton,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Divider
} from '@mui/material'
import FilterListIcon from '@mui/icons-material/FilterList'
import ViewListIcon from '@mui/icons-material/ViewList'
import ViewKanbanIcon from '@mui/icons-material/ViewColumn'
import LabelIcon from '@mui/icons-material/Label'
import PriorityHighIcon from '@mui/icons-material/PriorityHigh'
import DateRangeIcon from '@mui/icons-material/DateRange'
import TodoItem from './TodoItem'
import KanbanBoard from './KanbanBoard'
import { Todo, ViewType, FilterCriteria } from '../types/todo'

interface TodoListProps {
    todos: Todo[];
    toggleTodo: (id: string) => void;
    removeTodo: (id: string) => void;
    updateTodo: (id: string, updatedTodo: Todo) => void;
    moveTodoStatus: (id: string, newStatus: string) => void;
}

// Predefined views
const PREDEFINED_VIEWS = [
    { name: 'All Tasks', criteria: { status: 'all' } },
    { name: 'To Do', criteria: { status: 'todo' } },
    { name: 'In Progress', criteria: { status: 'inProgress' } },
    { name: 'Done', criteria: { status: 'done' } },
    { name: 'High Priority', criteria: { priority: 3 } },
    { name: 'Due Today', criteria: { dueDate: 'today' } },
    { name: 'Overdue', criteria: { dueDate: 'overdue' } }
]

export default function TodoList({ todos, toggleTodo, removeTodo, updateTodo, moveTodoStatus }: TodoListProps) {
    // State for view type (list or kanban)
    const [viewType, setViewType] = useState<ViewType>('kanban')

    // State for current view/filter
    const [currentView, setCurrentView] = useState('All Tasks')
    const [filterCriteria, setFilterCriteria] = useState<FilterCriteria>({ status: 'all' })

    // State for filter menu
    const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null)
    const [viewAnchorEl, setViewAnchorEl] = useState<null | HTMLElement>(null)

    // Handle filter menu open/close
    const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setFilterAnchorEl(event.currentTarget)
    }

    const handleFilterClose = () => {
        setFilterAnchorEl(null)
    }

    // Handle view menu open/close
    const handleViewClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setViewAnchorEl(event.currentTarget)
    }

    const handleViewClose = () => {
        setViewAnchorEl(null)
    }

    // Apply a predefined view
    const applyView = (viewName: string) => {
        const view = PREDEFINED_VIEWS.find(v => v.name === viewName)
        if (view) {
            setCurrentView(viewName)
            setFilterCriteria(view.criteria)
            handleViewClose()
        }
    }

    // Apply a specific filter
    const applyFilter = (type: keyof FilterCriteria, value: any) => {
        setFilterCriteria(prev => ({ ...prev, [type]: value }))
        setCurrentView('Custom')
        handleFilterClose()
    }

    // Filter todos based on current criteria
    const filteredTodos = todos.filter(todo => {
        // Filter by status
        if (filterCriteria.status && filterCriteria.status !== 'all') {
            if (todo.status !== filterCriteria.status) return false
        }

        // Filter by priority
        if (filterCriteria.priority !== undefined) {
            if (todo.importance !== filterCriteria.priority) return false
        }

        // Filter by due date
        if (filterCriteria.dueDate) {
            const today = new Date()
            today.setHours(0, 0, 0, 0)
            const todoDueDate = new Date(todo.dueDate)

            if (filterCriteria.dueDate === 'today') {
                const tomorrow = new Date(today)
                tomorrow.setDate(tomorrow.getDate() + 1)
                if (todoDueDate < today || todoDueDate >= tomorrow) return false
            } else if (filterCriteria.dueDate === 'thisWeek') {
                const weekEnd = new Date(today)
                weekEnd.setDate(weekEnd.getDate() + (7 - weekEnd.getDay()))
                if (todoDueDate < today || todoDueDate > weekEnd) return false
            } else if (filterCriteria.dueDate === 'overdue') {
                if (todoDueDate >= today || todo.status === 'done') return false
            }
        }

        return true
    })

    // Group todos by status for Kanban view
    const todosByStatus = {
        todo: filteredTodos.filter(todo => todo.status === 'todo'),
        inProgress: filteredTodos.filter(todo => todo.status === 'inProgress'),
        done: filteredTodos.filter(todo => todo.status === 'done')
    }

    return (
        <Paper elevation={3} sx={{ p: 2 }}>
            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box display="flex" alignItems="center">
                    <Typography variant="h6" component="div" sx={{ mr: 2 }}>
                        {currentView}
                    </Typography>
                    {currentView !== 'All Tasks' && (
                        <Chip
                            label="Clear Filters"
                            size="small"
                            onDelete={() => {
                                setFilterCriteria({ status: 'all' })
                                setCurrentView('All Tasks')
                            }}
                            sx={{ mr: 1 }}
                        />
                    )}
                </Box>

                <Box>
                    {/* View Type Toggle */}
                    <IconButton
                        onClick={() => setViewType(viewType === 'list' ? 'kanban' : 'list')}
                        aria-label="Toggle view"
                        sx={{ mr: 1 }}
                    >
                        {viewType === 'list' ? <ViewKanbanIcon /> : <ViewListIcon />}
                    </IconButton>

                    {/* Filter Button */}
                    <IconButton
                        onClick={handleFilterClick}
                        aria-label="Filter tasks"
                        aria-controls="filter-menu"
                        aria-haspopup="true"
                        sx={{ mr: 1 }}
                    >
                        <FilterListIcon />
                    </IconButton>

                    {/* Saved Views Button */}
                    <IconButton
                        onClick={handleViewClick}
                        aria-label="Saved views"
                        aria-controls="view-menu"
                        aria-haspopup="true"
                    >
                        <ViewListIcon />
                    </IconButton>

                    {/* Filter Menu */}
                    <Menu
                        id="filter-menu"
                        anchorEl={filterAnchorEl}
                        open={Boolean(filterAnchorEl)}
                        onClose={handleFilterClose}
                    >
                        <MenuItem disabled>
                            <Typography variant="subtitle2">Filter by Status</Typography>
                        </MenuItem>
                        <MenuItem onClick={() => applyFilter('status', 'todo')}>
                            <ListItemIcon><LabelIcon color="info" /></ListItemIcon>
                            <ListItemText>To Do</ListItemText>
                        </MenuItem>
                        <MenuItem onClick={() => applyFilter('status', 'inProgress')}>
                            <ListItemIcon><LabelIcon color="warning" /></ListItemIcon>
                            <ListItemText>In Progress</ListItemText>
                        </MenuItem>
                        <MenuItem onClick={() => applyFilter('status', 'done')}>
                            <ListItemIcon><LabelIcon color="success" /></ListItemIcon>
                            <ListItemText>Done</ListItemText>
                        </MenuItem>

                        <Divider />

                        <MenuItem disabled>
                            <Typography variant="subtitle2">Filter by Priority</Typography>
                        </MenuItem>
                        <MenuItem onClick={() => applyFilter('priority', 3)}>
                            <ListItemIcon><PriorityHighIcon color="error" /></ListItemIcon>
                            <ListItemText>High</ListItemText>
                        </MenuItem>
                        <MenuItem onClick={() => applyFilter('priority', 2)}>
                            <ListItemIcon><PriorityHighIcon color="warning" /></ListItemIcon>
                            <ListItemText>Medium</ListItemText>
                        </MenuItem>
                        <MenuItem onClick={() => applyFilter('priority', 1)}>
                            <ListItemIcon><PriorityHighIcon color="success" /></ListItemIcon>
                            <ListItemText>Low</ListItemText>
                        </MenuItem>

                        <Divider />

                        <MenuItem disabled>
                            <Typography variant="subtitle2">Filter by Due Date</Typography>
                        </MenuItem>
                        <MenuItem onClick={() => applyFilter('dueDate', 'today')}>
                            <ListItemIcon><DateRangeIcon /></ListItemIcon>
                            <ListItemText>Due Today</ListItemText>
                        </MenuItem>
                        <MenuItem onClick={() => applyFilter('dueDate', 'thisWeek')}>
                            <ListItemIcon><DateRangeIcon /></ListItemIcon>
                            <ListItemText>Due This Week</ListItemText>
                        </MenuItem>
                        <MenuItem onClick={() => applyFilter('dueDate', 'overdue')}>
                            <ListItemIcon><DateRangeIcon color="error" /></ListItemIcon>
                            <ListItemText>Overdue</ListItemText>
                        </MenuItem>
                    </Menu>

                    {/* Saved Views Menu */}
                    <Menu
                        id="view-menu"
                        anchorEl={viewAnchorEl}
                        open={Boolean(viewAnchorEl)}
                        onClose={handleViewClose}
                    >
                        {PREDEFINED_VIEWS.map((view) => (
                            <MenuItem key={view.name} onClick={() => applyView(view.name)}>
                                <ListItemText>{view.name}</ListItemText>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
            </Box>

            {filteredTodos.length === 0 ? (
                <Typography variant="body1" sx={{ textAlign: 'center', py: 3 }}>
                    No tasks match your current filters
                </Typography>
            ) : viewType === 'kanban' ? (
                <KanbanBoard
                    todosByStatus={todosByStatus}
                    toggleTodo={toggleTodo}
                    removeTodo={removeTodo}
                    updateTodo={updateTodo}
                    moveTodoStatus={moveTodoStatus}
                />
            ) : (
                <Box>
                    {filteredTodos.map((todo) => (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            toggleTodo={toggleTodo}
                            removeTodo={removeTodo}
                            updateTodo={updateTodo}
                        />
                    ))}
                </Box>
            )}
        </Paper>
    )
}
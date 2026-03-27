import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'

const Todos = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [todos, setTodos] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editTitle, setEditTitle] = useState('')
  const [editDescription, setEditDescription] = useState('')

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    try {
      const res = await api.get('/todos/')
      setTodos(res.data)
    } catch {
      setError('Failed to fetch todos')
    }
  }

  const handleCreate = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await api.post('/todos/', { title, description, completed: false })
      setTitle('')
      setDescription('')
      fetchTodos()
    } catch (err) {
      setError(err.response?.data?.title?.[0] || 'Failed to create todo')
    }
  }

  const handleDelete = async (id) => {
    try {
      await api.delete(`/todos/${id}/`)
      fetchTodos()
    } catch {
      setError('Failed to delete todo')
    }
  }

  const handleToggle = async (todo) => {
    try {
      await api.patch(`/todos/${todo.id}/`, { completed: !todo.completed })
      fetchTodos()
    } catch {
      setError('Failed to update todo')
    }
  }

  const handleEdit = (todo) => {
    setEditingId(todo.id)
    setEditTitle(todo.title)
    setEditDescription(todo.description)
  }

  const handleUpdate = async (id) => {
    try {
      await api.patch(`/todos/${id}/`, { title: editTitle, description: editDescription })
      setEditingId(null)
      fetchTodos()
    } catch (err) {
      setError(err.response?.data?.title?.[0] || 'Failed to update todo')
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="todos-container">
      <div className="todos-header">
        <h2>Welcome, {user?.username}</h2>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleCreate} className="todo-form">
        <input
          type="text"
          placeholder="Todo title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Add Todo</button>
      </form>

      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            {editingId === todo.id ? (
              <div className="edit-form">
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <input
                  type="text"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                />
                <button onClick={() => handleUpdate(todo.id)}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </div>
            ) : (
              <div className="todo-content">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggle(todo)}
                />
                <div>
                  <strong>{todo.title}</strong>
                  {todo.description && <p>{todo.description}</p>}
                </div>
                <div className="todo-actions">
                  <button onClick={() => handleEdit(todo)}>Edit</button>
                  <button onClick={() => handleDelete(todo.id)}>Delete</button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Todos
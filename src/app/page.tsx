'use client'

import { useState, useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import TodoForm from '@/components/TodoForm'
import TodoList from '@/components/TodoList'

interface Todo {
  id: string
  title: string
  description: string | null
  completed: boolean
  createdAt: string
  updatedAt: string
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchTodos = async () => {
    try {
      const response = await fetch('/api/todos')
      if (response.ok) {
        const data = await response.json()
        setTodos(data)
      }
    } catch (error) {
      console.error('Error fetching todos:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  const handleTodoChange = () => {
    fetchTodos()
  }

  const completedTodos = todos.filter(todo => todo.completed).length
  const totalTodos = todos.length

  return (
    <main className="min-h-screen bg-gray-100">
      <Toaster position="top-right" />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Todo List App</h1>
          <p className="text-gray-600">Manage your tasks efficiently</p>
          
          {!isLoading && (
            <div className="mt-4 flex justify-center space-x-6 text-sm">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                Total: {totalTodos}
              </span>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                Completed: {completedTodos}
              </span>
              <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
                Pending: {totalTodos - completedTodos}
              </span>
            </div>
          )}
        </header>

        <TodoForm onTodoAdded={handleTodoChange} />

        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-2 text-gray-500">Loading todos...</p>
          </div>
        ) : (
          <TodoList todos={todos} onTodoUpdated={handleTodoChange} />
        )}
      </div>
    </main>
  )
}
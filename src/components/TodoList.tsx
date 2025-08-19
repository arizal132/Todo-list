'use client'

interface Todo {
  id: string
  title: string
  description: string | null
  completed: boolean
  createdAt: string
  updatedAt: string
}

interface TodoListProps {
  todos: Todo[]
  onTodoUpdated: () => void
}

export default function TodoList({ todos, onTodoUpdated }: TodoListProps) {
  const toggleComplete = async (id: string, completed: boolean) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ completed: !completed })
      })

      if (response.ok) {
        onTodoUpdated()
      }
    } catch (error) {
      console.error('Error updating todo:', error)
    }
  }

  const deleteTodo = async (id: string) => {
    if (!confirm('Are you sure you want to delete this todo?')) {
      return
    }

    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        onTodoUpdated()
      }
    } catch (error) {
      console.error('Error deleting todo:', error)
    }
  }

  if (todos.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No todos yet. Add your first todo above!
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {todos.map((todo) => (
        <div
          key={todo.id}
          className={`bg-white p-4 rounded-lg shadow-md border-l-4 ${
            todo.completed ? 'border-green-500' : 'border-blue-500'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3 flex-1">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id, todo.completed)}
                className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              
              <div className="flex-1">
                <h3 className={`font-medium ${todo.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                  {todo.title}
                </h3>
                {todo.description && (
                  <p className={`mt-1 text-sm ${todo.completed ? 'line-through text-gray-400' : 'text-gray-600'}`}>
                    {todo.description}
                  </p>
                )}
                <p className="mt-2 text-xs text-gray-400">
                  Created: {new Date(todo.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <button
              onClick={() => deleteTodo(todo.id)}
              className="ml-2 text-red-500 hover:text-red-700 focus:outline-none"
              title="Delete todo"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
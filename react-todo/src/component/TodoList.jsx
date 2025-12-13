import React, { useState } from 'react';
import { Trash2, Plus } from 'lucide-react';

// AddTodoForm Component
function AddTodoForm({ onAddTodo }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    onAddTodo(inputValue);
    setInputValue('');
  };

  return (
    <div className="p-6 border-b border-gray-200">
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSubmit(e);
            }
          }}
          placeholder="Add a new todo..."
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          data-testid="todo-input"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
          data-testid="add-button"
        >
          <Plus size={20} />
          Add
        </button>
      </div>
    </div>
  );
}

// TodoList Component
function TodoList({ todos, onToggleTodo, onDeleteTodo }) {
  if (todos.length === 0) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">
            No todos yet. Add one to get started!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <ul className="space-y-2" data-testid="todo-list">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
            data-testid={`todo-item-${todo.id}`}
          >
            <button
              onClick={() => onToggleTodo(todo.id)}
              className="flex-1 text-left flex items-center gap-3"
              data-testid={`toggle-button-${todo.id}`}
            >
              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                todo.completed 
                  ? 'bg-green-500 border-green-500' 
                  : 'border-gray-300'
              }`}>
                {todo.completed && (
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                )}
              </div>
              <span
                className={`flex-1 ${
                  todo.completed
                    ? 'line-through text-gray-400'
                    : 'text-gray-800'
                }`}
                data-testid={`todo-text-${todo.id}`}
              >
                {todo.text}
              </span>
            </button>
            <button
              onClick={() => onDeleteTodo(todo.id)}
              className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded transition-colors opacity-0 group-hover:opacity-100"
              data-testid={`delete-button-${todo.id}`}
              aria-label="Delete todo"
            >
              <Trash2 size={18} />
            </button>
          </li>
        ))}
      </ul>

      {/* Stats */}
      <div className="mt-6 pt-6 border-t border-gray-200 flex justify-between text-sm text-gray-600">
        <span>Total: {todos.length}</span>
        <span>Completed: {todos.filter(t => t.completed).length}</span>
        <span>Active: {todos.filter(t => !t.completed).length}</span>
      </div>
    </div>
  );
}

// Main App Component
function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Write tests', completed: false },
    { id: 3, text: 'Build projects', completed: false }
  ]);

  const handleAddTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text: text,
      completed: false
    };
    setTodos([...todos, newTodo]);
  };

  const handleToggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-8">
            <h1 className="text-3xl font-bold text-white text-center">
              My Todo List
            </h1>
            <p className="text-blue-100 text-center mt-2">
              Stay organized and productive
            </p>
          </div>

          {/* Add Todo Form */}
          <AddTodoForm onAddTodo={handleAddTodo} />

          {/* Todo List */}
          <TodoList 
            todos={todos}
            onToggleTodo={handleToggleTodo}
            onDeleteTodo={handleDeleteTodo}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
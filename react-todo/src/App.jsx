import React, { useState } from 'react';
import AddTodoForm from './component/AddTodoForm';
import TodoList from './component/TodoList';

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
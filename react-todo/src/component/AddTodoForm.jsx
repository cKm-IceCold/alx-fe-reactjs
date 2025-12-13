import React, { useState } from 'react';
import { Plus } from 'lucide-react';

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

export default AddTodoForm;
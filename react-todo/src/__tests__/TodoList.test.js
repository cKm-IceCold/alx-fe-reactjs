import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '../TodoList';

describe('TodoList Component', () => {
  // Test 1: Initial Render Test
  test('renders TodoList component with initial todos', () => {
    render(<TodoList />);
    
    // Check if the title is rendered
    expect(screen.getByText('My Todo List')).toBeInTheDocument();
    
    // Check if initial todos are rendered
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Write tests')).toBeInTheDocument();
    expect(screen.getByText('Build projects')).toBeInTheDocument();
    
    // Check if the input field is rendered
    expect(screen.getByTestId('todo-input')).toBeInTheDocument();
    expect(screen.getByTestId('add-button')).toBeInTheDocument();
  });

  // Test 2: Check initial state
  test('displays correct number of initial todos', () => {
    render(<TodoList />);
    
    const todoList = screen.getByTestId('todo-list');
    const todoItems = todoList.querySelectorAll('[data-testid^="todo-item-"]');
    
    expect(todoItems).toHaveLength(3);
  });

  // Test 3: Adding a new todo
  test('adds a new todo when form is submitted', () => {
    render(<TodoList />);
    
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-button');
    
    // Type in the input field
    fireEvent.change(input, { target: { value: 'New Todo Item' } });
    
    // Check if input value is updated
    expect(input.value).toBe('New Todo Item');
    
    // Click the add button
    fireEvent.click(addButton);
    
    // Check if the new todo is added
    expect(screen.getByText('New Todo Item')).toBeInTheDocument();
    
    // Check if input is cleared after adding
    expect(input.value).toBe('');
    
    // Check if total count increased
    const todoList = screen.getByTestId('todo-list');
    const todoItems = todoList.querySelectorAll('[data-testid^="todo-item-"]');
    expect(todoItems).toHaveLength(4);
  });

  // Test 4: Prevent adding empty todos
  test('does not add empty todos', () => {
    render(<TodoList />);
    
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-button');
    
    // Try to add empty todo
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.click(addButton);
    
    // Count should remain 3
    const todoList = screen.getByTestId('todo-list');
    const todoItems = todoList.querySelectorAll('[data-testid^="todo-item-"]');
    expect(todoItems).toHaveLength(3);
  });

  // Test 5: Prevent adding whitespace-only todos
  test('does not add todos with only whitespace', () => {
    render(<TodoList />);
    
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-button');
    
    // Try to add whitespace-only todo
    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.click(addButton);
    
    // Count should remain 3
    const todoList = screen.getByTestId('todo-list');
    const todoItems = todoList.querySelectorAll('[data-testid^="todo-item-"]');
    expect(todoItems).toHaveLength(3);
  });

  // Test 6: Toggling todo completion status
  test('toggles todo completion status when clicked', () => {
    render(<TodoList />);
    
    // Get the first todo's toggle button
    const toggleButton = screen.getByTestId('toggle-button-1');
    const todoText = screen.getByTestId('todo-text-1');
    
    // Initially, todo should not be completed
    expect(todoText).not.toHaveClass('line-through');
    
    // Click to toggle completion
    fireEvent.click(toggleButton);
    
    // After clicking, todo should be completed
    expect(todoText).toHaveClass('line-through');
    
    // Click again to toggle back
    fireEvent.click(toggleButton);
    
    // Should be incomplete again
    expect(todoText).not.toHaveClass('line-through');
  });

  // Test 7: Toggle multiple todos
  test('can toggle multiple todos independently', () => {
    render(<TodoList />);
    
    const toggleButton1 = screen.getByTestId('toggle-button-1');
    const toggleButton2 = screen.getByTestId('toggle-button-2');
    const todoText1 = screen.getByTestId('todo-text-1');
    const todoText2 = screen.getByTestId('todo-text-2');
    
    // Toggle first todo
    fireEvent.click(toggleButton1);
    expect(todoText1).toHaveClass('line-through');
    expect(todoText2).not.toHaveClass('line-through');
    
    // Toggle second todo
    fireEvent.click(toggleButton2);
    expect(todoText1).toHaveClass('line-through');
    expect(todoText2).toHaveClass('line-through');
  });

  // Test 8: Deleting a todo
  test('deletes a todo when delete button is clicked', () => {
    render(<TodoList />);
    
    // Get initial count
    let todoList = screen.getByTestId('todo-list');
    let todoItems = todoList.querySelectorAll('[data-testid^="todo-item-"]');
    expect(todoItems).toHaveLength(3);
    
    // Click delete button for first todo
    const deleteButton = screen.getByTestId('delete-button-1');
    fireEvent.click(deleteButton);
    
    // Check if todo is deleted
    expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
    
    // Check if count decreased
    todoList = screen.getByTestId('todo-list');
    todoItems = todoList.querySelectorAll('[data-testid^="todo-item-"]');
    expect(todoItems).toHaveLength(2);
  });

  // Test 9: Delete all todos
  test('can delete all todos', () => {
    render(<TodoList />);
    
    // Delete all three initial todos
    fireEvent.click(screen.getByTestId('delete-button-1'));
    fireEvent.click(screen.getByTestId('delete-button-2'));
    fireEvent.click(screen.getByTestId('delete-button-3'));
    
    // Check if empty state message is shown
    expect(screen.getByText('No todos yet. Add one to get started!')).toBeInTheDocument();
  });

  // Test 10: Stats display
  test('displays correct statistics', () => {
    render(<TodoList />);
    
    // Initial stats
    expect(screen.getByText('Total: 3')).toBeInTheDocument();
    expect(screen.getByText('Completed: 0')).toBeInTheDocument();
    expect(screen.getByText('Active: 3')).toBeInTheDocument();
    
    // Toggle one todo
    fireEvent.click(screen.getByTestId('toggle-button-1'));
    
    // Updated stats
    expect(screen.getByText('Total: 3')).toBeInTheDocument();
    expect(screen.getByText('Completed: 1')).toBeInTheDocument();
    expect(screen.getByText('Active: 2')).toBeInTheDocument();
  });

  // Test 11: Add todo using Enter key
  test('adds todo when Enter key is pressed', () => {
    render(<TodoList />);
    
    const input = screen.getByTestId('todo-input');
    
    fireEvent.change(input, { target: { value: 'Test Enter Key' } });
    fireEvent.keyPress(input, { key: 'Enter', code: 13, charCode: 13 });
    
    expect(screen.getByText('Test Enter Key')).toBeInTheDocument();
  });

  // Test 12: Complex workflow test
  test('handles complex workflow: add, toggle, and delete', () => {
    render(<TodoList />);
    
    // Add a new todo
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-button');
    
    fireEvent.change(input, { target: { value: 'Complex Todo' } });
    fireEvent.click(addButton);
    
    // Verify it was added
    expect(screen.getByText('Complex Todo')).toBeInTheDocument();
    
    // Get the new todo's buttons (it will have id based on timestamp)
    const complexTodoText = screen.getByText('Complex Todo');
    const complexTodoItem = complexTodoText.closest('[data-testid^="todo-item-"]');
    const toggleButton = complexTodoItem.querySelector('[data-testid^="toggle-button-"]');
    const deleteButton = complexTodoItem.querySelector('[data-testid^="delete-button-"]');
    
    // Toggle it
    fireEvent.click(toggleButton);
    expect(complexTodoText).toHaveClass('line-through');
    
    // Delete it
    fireEvent.click(deleteButton);
    expect(screen.queryByText('Complex Todo')).not.toBeInTheDocument();
  });
});
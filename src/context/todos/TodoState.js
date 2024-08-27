import React from 'react';
import { useState } from 'react';
import TodoContext from './TodoContext';

const TodoState = (props) => {

  const [todos, setTodos] = useState([]);
  const { host } = props;

  //get all todos
  const getTodos = async () => {
    
    const response = await fetch(`${host}/api/todos`, {
      method: 'GET',
      headers: {
        'auth-token': localStorage.getItem('token')
      },
    });

    const json = await response.json();
    if(json.success) setTodos(json.todos);
  }


  //add a todo item
  const addTodo = async (newTodo) => {
    
    const res = await fetch(`${host}/api/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify(newTodo)
    });

    const json = await res.json();
    if(json.success) setTodos(todos.concat(newTodo));
  }
  

  //edit a todo item
  const editTodo = async (todoID, name, description, completed) => {

    await fetch(`${host}/api/todos/${todoID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({name, description, completed})
    });
  }


  //delete a todoItem
  const deleteTodo = async (todoID) => {

    await fetch(`${host}/api/todos/${todoID}`, {
      method: 'DELETE',
      headers: {
        'auth-token': localStorage.getItem('token')
      },
    });
  }

  return (
    <TodoContext.Provider value = {{host, todos, addTodo, editTodo, deleteTodo, getTodos}}> 
        {props.children}
    </TodoContext.Provider>
  )
}

export default TodoState;

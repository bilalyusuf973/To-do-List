import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import TodoContext from "../context/todos/TodoContext";
import TodosItem from "./TodosItem";
import Navbar from './Navbar'

const FetchedTodos = (props) => {
  const {todos, getTodos, editTodo} = useContext(TodoContext);
  const {setTodos, showAlert} = props;
  const [todo, setTodo] = useState({ id: "", editName: "", editDescription: "", editCompleted: false });

  const myRef = useRef(null);
  const refClose = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem('token'))
      getTodos();
    else
      navigate("/login");
  }, [getTodos, navigate]);

  const handleEditClick = (currentTodo) => {
    myRef.current.click();
    setTodo({id: currentTodo._id, editName: currentTodo.name, editDescription: currentTodo.description, editCompleted: currentTodo.completed});
  }

  const handleChange = (e) => {
    setTodo({...todo, [e.target.id]: e.target.value});
  }
  
  const handleClick = (e) => {
    refClose.current.click();
    editTodo(todo.id, todo.editName, todo.editDescription, todo.editCompleted);
    showAlert("success", "Todo Edited Successfully!");
  }

  const addTodosFunc = () => {
    setTodos({name: "", description: "", completed: false})
    navigate("/");
  }

  return (
    <>
      <Navbar setTodo={setTodos} showAlert={showAlert}/>
      <div className='container'>
        <button type="button" ref={myRef} className="d-none btn btn-primary" data-toggle="modal" data-target="#exampleModal">
          Launch demo modal
        </button>
        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel"> Edit Todo </h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true" className="modalCloseBtn">&times;</span>
                </button>
              </div>
              <div className="modal-body">
              <form>
            <div className="mb-3">
              <label htmlFor="editName" className="form-label"> Title: </label><br />
              <input type="text" className="editInput" id="editName" name="title" value={todo.editName} aria-describedby="title" onChange={handleChange}/>
            </div>

            <div className="mb-3">
              <label htmlFor="editDescription" className="form-label"> Description: </label><br />
              <textarea type="textarea" className="editTextarea" id="editDescription" value={todo.editDescription} name="description" onChange={handleChange}/>
            </div>

            <div className="mb-3">
              <label htmlFor="editStatus" className="form-label">Status: </label>
              <select id="editCompleted" className="editStatus"  value={todo.editCompleted} name="completed" onChange={handleChange}>
                <option value="true">Completed</option>
                <option value="false">Pending</option>
              </select>
            </div>

            </form>
              </div>
              <div className="modal-footer">
                <button type="button" ref={refClose} className="btn btn-secondary" data-dismiss="modal">
                  Close
                </button>
                <button type="button" className="BtnUpdatenote" onClick={handleClick}>
                  Update Todo
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="my-3">
          <h3 className="my-4">All Todos:</h3>
          {todos.length === 0 && <div className="my-5">
            <h6>Please add a todo item to display here...</h6>
            <button className="BtnAddnote" onClick={addTodosFunc}>Add Todos</button>
          </div>}
          {todos.length !== 0 && <div className="row">
            {todos.map((todo, index) => {
              return <TodosItem key={index} todo={todo} handleEditClick={() => {handleEditClick(todo)}} setTodos={setTodos} showAlert={showAlert}/>;
            })}
          </div>}
        </div>
      </div>
    </>
  );
};

export default FetchedTodos;

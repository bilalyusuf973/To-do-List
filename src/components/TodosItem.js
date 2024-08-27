import React, { useContext } from 'react';
import TodoContext from '../context/todos/TodoContext';
import { useNavigate } from 'react-router-dom';

const TodosItem = (props) => {
    const navigate = useNavigate();
    const context = useContext(TodoContext);
    const {todo, handleEditClick, setTodos, showAlert} = props;
    const {deleteTodo} = context;

    const handleDelete = () => {
      deleteTodo(todo._id);
      showAlert("success", "Todo Deleted Successfully!");
    }

    const OpenTodo = () => {
      setTodos(todo);
      navigate("/");
    }

  return (
    <div className="col-sm-6">
    <div className="card m-1">
      <div className="card-body">
        <div className="noteTitleDiv">
          <h5 className="card-title">{todo.name}</h5>
          <div className="statusDiv">
            {todo.completed ? <span>Completed</span> : <span>Pending</span>}
          </div>
        </div>
        <p className="card-text noteDescription">{todo.description}</p>

        <div className="features">
          <button className="BtnOpennote" onClick={OpenTodo}>Open</button>
          <div className="editDeleteIcons">
            <i className="editIcon fa-solid fa-pen-to-square mx-2" onClick={handleEditClick}></i>
            <i className="deleteIcon fa-solid fa-trash-can mx-2" onClick={handleDelete} ></i>
          </div>
        </div>

      </div>
    </div>
  </div>
  )
}

export default TodosItem

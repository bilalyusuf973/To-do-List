import React, { useContext, useEffect } from 'react';
import TodoContext from '../context/todos/TodoContext';
import { useNavigate } from 'react-router-dom';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Navbar from './Navbar'

const Todopage = (props) => {

  const navigate = useNavigate();
  const { addTodo } = useContext(TodoContext);
  const {todo, setTodo, showAlert} = props;

  useEffect(() => {
    if(!localStorage.getItem('token') || !localStorage.getItem('todolist_username')){
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    setTodo(todo)
  }, [setTodo, todo]);

  const handleChange = (key, value) => {
    setTodo({...todo, [key]: value});
  }
        
  const handleClick = (e) => {
    e.preventDefault();
    addTodo(todo);
    showAlert("success", "Todo Added Successfully!");
    setTodo({name: "", description: "", completed: false})  
    navigate("/todos");
  }

  const handleCopy = (key)=>{
    if(todo[key] !== "")
      showAlert('success', `${key.charAt(0).toUpperCase() + key.slice(1)} Copied!`);
    else
      showAlert('warning', 'Empty field!');
  }
  
  return (
    <>
      {localStorage.getItem('token') && localStorage.getItem('todolist_username') && <Navbar setTodo={setTodo} showAlert={showAlert}/>}
      <div className='container'>
        <h2 className='newTodoHeading'>Create a new todo item</h2>
          <div className="inputField">
            <input type="text" placeholder="Name" id='name' onChange={e => {handleChange(e.target.id, e.target.value)}} minLength={3} required value={todo.name} />
            <span className='iconSpan'>        
              <CopyToClipboard text={todo.name}
              onCopy={() => {handleCopy('title')}}>
                <i className="fa-regular fa-copy CopyIcon"/>
              </CopyToClipboard>
            </span>  
          </div>

          <div className="copydiv">
            <CopyToClipboard text={todo.description}
              onCopy={() => {handleCopy('description')}}>
              <i className="fa-regular fa-copy CopyIcon"/>
            </CopyToClipboard>
          </div>
          <textarea type="textarea" placeholder="Description" id='description' onChange={e => {handleChange(e.target.id, e.target.value)}} minLength={5} required value={todo.description}/>

        <div className="bottomdiv">

          <div className='isCompleted'>
            <label htmlFor="">Status: </label>
            <div className="select" >
              <select id="completed" onChange={e => {handleChange(e.target.id, e.target.value)}} value={todo.completed}>
                  <option value="true">Completed</option>
                  <option value="false">Pending</option>
              </select>
            </div>
          </div>

          
          <button className='BtnAddnote' onClick={handleClick} disabled={todo.name.length < 3 || todo.description.length < 5}>Add todo</button>
          
        </div>
      </div>
    </>
  )
}

export default Todopage

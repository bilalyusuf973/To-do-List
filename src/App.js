import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import TodoState from "./context/todos/TodoState";
import { useState } from "react";
import Todopage from "./components/Todopage";
import FetchedTodos from "./components/FetchedTodos";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'

function App() {
  const [todo, setTodo] = useState({ name: "", description: "", completed: false });
  const host = "http://localhost:8000";

  const notify = (type, msg) => {
    toast(msg, {type: `${type}`, toastId: `${type}`});
  }

  return (
    <>
      <TodoState host={host}>
        <Router>
          <Routes>
            <Route path="/" element={<Todopage todo={todo} setTodo={setTodo} showAlert={notify}/>} />
            <Route path="/login" element={<Login showAlert={notify}/>}/>
            <Route path="/signup" element={<Signup showAlert={notify}/>}/>
            <Route path="/todos" element={<FetchedTodos setTodos={setTodo} showAlert={notify}/>} />
          </Routes>
          <ToastContainer position="top-center" autoClose={600} hideProgressBar={false} newestOnTop={true} closeOnClick rtl={false} draggable theme="colored"/>
        </Router>
      </TodoState>
    </>
  );
}

export default App;

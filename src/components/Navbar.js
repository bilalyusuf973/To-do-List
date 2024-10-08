import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = (props) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('todolist_username');
    navigate("/login");
    props.setTodo({name: "", description: "", completed: false})
    props.showAlert('success', 'Logout Successful!');
  }

  const fetchInitial = () => {
    return localStorage.getItem('todolist_username')[0].toUpperCase();
  }

  return (
    <div className="sticky">
      <nav className="navbar navbar-expand-md">
        <Link className="navbar-brand" to="/todos">
          <div className="navbarBrandDiv">
            <img src="cloudNotesIcon.png" className="d-inline-block align-top brandIcon" alt="Cloudnotes"/>
            <div className="navbarBrandTitle">
              <b>To-do List</b>
            </div>
          </div>
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavbar">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className= {`navbar-link`} style={{textDecoration: 'none'}} aria-current="page" to="/" onClick={() => {props.setTodo({name: "", description: "", completed: false})}}>
                Add Todo
              </Link>
            </li>
            <li className="nav-item">
              <Link className= {`navbar-link`} style={{textDecoration: 'none'}} to="/todos"> 
                My Todos 
              </Link> 
            </li> 
            <li className="nav-item" onClick={handleLogout}>
              <div className="fullprofile">
                <div className="profileImage">{fetchInitial()}</div>
                <div className="username">{localStorage.getItem('todolist_username')}</div>
              </div>
            </li>
            <li className="navBtn" onClick={handleLogout}>
              <i className="fa-solid fa-arrow-right-from-bracket fa-lg"></i>&nbsp;&nbsp;Logout
            </li>
            <li className="nav-item navBtnCollapsed" onClick={handleLogout}>
              &nbsp;&nbsp;<i className="fa-solid fa-arrow-right-from-bracket"></i>&nbsp;Logout
            </li>
            <li className="nav-item shortprofile">
              {fetchInitial()}
            </li>
            <div className="showUsername">
              <div className="triangle"></div>
              <div className="anchoredName">
                <p className="mb-0">Signed in as</p>
                <strong>{localStorage.getItem('todolist_username')}</strong>
              </div>
            </div>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

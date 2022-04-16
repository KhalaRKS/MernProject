import React, { useContext, useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./Dashboard.scss";
import User from "../../components/User/User";
import { TailSpin } from "react-loader-spinner";
import { usuarioContext } from "../../context/UserContext";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import { IoIosAddCircle } from "react-icons/io";
import { TableUser } from "../../components/TableUser/TableUser";
import { EditUser } from "../EditUser/EditUser";
import { AddUser } from "../../components/AddUser/AddUser";

const Dashboard = () => {
  const navigate = useNavigate();
  /* TRAER EL CONTEXTO CON EL HOOK USECONTEXT */
  const contexto = useContext(usuarioContext);
  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const { token, removeUserLogin } = contexto;
    console.log(token, process.env.REACT_APP_SECRET_TOKEN_KEY);
    if (token) {
      const user = jwt.decode(token, process.env.REACT_APP_SECRET_TOKEN_KEY);
      if (!user) {
        removeUserLogin();
        navigate("/");
      }
    } else {
      navigate("/");
    }
  }, [navigate, contexto]);
  async function getAllUsers(event) {
    event.preventDefault();
    setLoading(true);
  
      fetch('http://localhost:2690/api/users', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => response.json())
        .then((data) => {
          if (data.status === "ok") {
            setUsers(data.users);
            setLoading(false);
          } else {
            console.log("Error al recuperar los usuarios");
            setLoading(false);
          }
        })
  }
  return (
    <>
      <nav className="navbar__dashboard">
        <NavLink className="navlink" to="create">
          <IoIosAddCircle/> Add user
        </NavLink>
        <NavLink className="navlink" to="table">
          Tabla
        </NavLink>
      </nav>
      <Outlet context={[getAllUsers, isLoading, users]} />
    </>
  );
};
export default Dashboard;

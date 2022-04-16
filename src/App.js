import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import NoPath from "./pages/NoPath/NoPath";
import "./App.css";
import Dashboard from "./pages/Dashboard/Dashboard";
import { Toaster } from "react-hot-toast";
import { UserContext } from "./context/UserContext";
import { EditUser } from "./pages/EditUser/EditUser";
import { EditUserContext } from "./context/EditUserContext";
import { TableUser } from "./components/TableUser/TableUser";
import { CreateUser } from "./pages/CreateUser/CreateUser";
const App = () => {
  return (
    <div className="container__web">
      <BrowserRouter>
        <Routes>
          {/* EL CONTEXTO UserContext ASIGNA COMO HIJOS A LOGIN Y DASHBOARD, QUIENES PODRAN SER PROVEDORES  */}
          <Route
            path="/"
            element={
              <UserContext>
                <Login />
              </UserContext>
            }
          />
          <Route
            path="/dashboard"
            element={
              <UserContext>
                <EditUserContext>
                  <Dashboard />
                </EditUserContext>
              </UserContext>
            }
          >
            <Route path="table" element={<TableUser></TableUser>}/>

            <Route path="table/edit" element={<EditUser></EditUser>} />
            <Route path="create" element={<CreateUser />} />
            <Route path="*" element={<NoPath />} />
          </Route>
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NoPath />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
};

export default App;

import React, { useState } from "react";
import toast from "react-hot-toast";
import { TailSpin } from "react-loader-spinner";
import { useNavigate, Link } from "react-router-dom";
import InputForm from "../../components/InputForm";
import "../Login.css";

function App() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [load, setLoad] = useState(false);

  async function registerUser(event) {
    event.preventDefault();
    setLoad(true);
    fetch("http://localhost:2690/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "ok") {
          toast.success("Register successfully!");
          setInterval(() => {
            setLoad(false);
            navigate("/");
          }, 2000);
        }else{
          setLoad(false);
          toast.error("Email is alredy register!");
        }
      });
  }

  return load ? (
    <div className="loading__spinner">
      <TailSpin ariaLabel="loading-indicator" color='#0EA5E9'/>
    </div>
  ) : (
    <div className="container">
      <div className="container__text">
        <h1 className="bg-red-600">Hi! Welcome to our page.</h1>
        <div className="container__text--register">
          <p>I have an account</p>
          <Link className="link" to="/">
            Login
          </Link>
        </div>
      </div>
      <form onSubmit={registerUser} className="form">
        <InputForm change={setName} name="Name" value={name} type="text" />
        <InputForm change={setEmail} name="Email" value={email} type="email" />
        <InputForm
          change={setPassword}
          name="Password"
          value={password}
          type="password"
        />
        <input type="submit" value="Register" className="button" />
      </form>
    </div>
  );
}

export default App;

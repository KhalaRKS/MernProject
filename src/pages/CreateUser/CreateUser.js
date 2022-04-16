import React, { useState } from "react";
import InputForm from "../../components/InputForm";
import { IoIosAddCircle } from "react-icons/io";
import  toast  from "react-hot-toast";

export function CreateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function createUserNewUser(event) {
    event.preventDefault();
    fetch("https://proyectoreactcrud.herokuapp.com/api/register", {
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
          toast.success("User added successfully!");
          setEmail("");
          setName("");
          setPassword("");
        } else {
          toast.error("This user alredy exists!");
        }
      });
  }
  return (
    <form onSubmit={(e) => createUserNewUser(e)} className="form">
      <InputForm
        value={name}
        change={setName}
        name="Name"
        type="text"
      ></InputForm>
      <InputForm
        value={email}
        change={setEmail}
        name="Email"
        type="email"
      ></InputForm>
      <InputForm
        value={password}
        change={setPassword}
        name="Password"
        type="password"
      ></InputForm>
      <button type="submit" className="button btn__createuser">
        {" "}
        <IoIosAddCircle /> Add
      </button>
    </form>
  );
}

export default CreateUser;

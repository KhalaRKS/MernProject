import React, { useState } from "react";
import InputForm from "../InputForm";
import { TailSpin } from "react-loader-spinner";
import toast from "react-hot-toast";

export function AddUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 
  const [isLoading, setLoad] = useState(false);

  async function addUser(event) {
   
  }

  return isLoading ? (
    <TailSpin ariaLabel="loading-indicator" color="#0EA5E9" />
  ) : (
    <div>
      <form onSubmit={(e) => addUser(e)} className="form">
        <InputForm
          value={name}
          change={(e) => setName(e.target.value)}
          name="Name"
          type="text"
        ></InputForm>
        <InputForm
          value={email}
          change={(e) => setEmail(e.target.value)}
          name="Email"
          type="email"
        ></InputForm>
        <InputForm
          value={password}
          change={(e) => setPassword(e.target.value)}
          name="Password"
          type="password"
        ></InputForm>
        <button
          type="submit"
          className="button btn__update--edituser"
          id="btn__update--edituser"
        >
          Update
        </button>
      </form>
    </div>
  );
}

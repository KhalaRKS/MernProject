import React, { useContext } from "react";
import { GoTrashcan, GoPencil } from "react-icons/go";
import { useNavigate, Link } from "react-router-dom";
import "./EditButtons.scss";
import { editUserContext } from "../../context/EditUserContext";

function EditButtons(props) {
  const { editUser } = useContext(editUserContext);
  const navigate = useNavigate();
  const { email, refresh } = props;

  async function removeUser(e) {
    e.preventDefault();
    const req = await fetch("http://localhost:2690/api/remove/user", {
      timeout: 10000,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        email: email,
      }),
    });
    const data = await req.json();

    if (data.status === "ok") return console.log(data);
    if (data.status === "error") return alert("User not found");
  }
  function putEmailOnContext(mail) {
    editUser(mail);
  }
  return (
    <>
     <Link onClick={() => putEmailOnContext(email)} to="edit"> 
        <GoPencil
          className="button__edit"
        />
      </Link>
      <GoTrashcan
        className="button__remove"
        onClick={(e) => {
          removeUser(e);
          refresh(e);
        }}
      />
    </>
  );
}

export default EditButtons;

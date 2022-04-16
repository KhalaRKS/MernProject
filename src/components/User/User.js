import React from "react";
import EditButtons from "../EditButton/EditButtons";
import "./User.scss";
function User(props) {
  const { name, email, quote, refresh } = props;
  
  return (
    <>
      <td className="td__user">{email}</td>
      <td className="td__user">{name}</td>
      <td className="td__user">{quote}</td>
      <td className="td__user--buttons">
          <EditButtons refresh={refresh} email={email}></EditButtons>
      </td>
    </>
  );
}

export default User;

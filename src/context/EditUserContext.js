import React, { useState } from "react";
// nombre del contexto
export const editUserContext = React.createContext();
const { Provider } = editUserContext;
// Valor inicial del contexto
console.log(editUserContext);
export const EditUserContext = ({ children }) => {
  // Este es el contexto, el cual devuelve un componente UserContext que permite encerrar dentro como hijos,
  // a los componentes que seran provedores del contexto
  const [mail, setMail] = useState('');

  const editUser = (email) => {
    console.trace(email);
    setMail(email);
  };
  const value = {
    mail: mail,
    editUser,
  };
  console.log(children);
  return <Provider value={value}>{children}</Provider>;
};

import React, { useState } from "react";
// nombre del contexto
export const usuarioContext = React.createContext();
const { Provider } = usuarioContext;
// Valor inicial del contexto
console.log(usuarioContext);
export const UserContext = ({ children }) => {
  // Este es el contexto, el cual devuelve un componente UserContext que permite encerrar dentro como hijos, 
  // a los componentes que seran provedores del contexto
  
  // const [name, setName] = useState('');
  // const [mail, setMail] = useState('');
  const [token, setToken] = useState('');
  const addUserLogin = (token) =>{
    console.log("TOKEN EN EL CONTEXTO" + token);
    setToken(token)
  }
  const removeUserLogin = () =>{
    setToken('')
  }

  const contextValue = {
    token: token,
    addUserLogin,
    removeUserLogin
  };
  console.log(token);
  return <Provider value={contextValue}>
      {children}
      </Provider>;
};

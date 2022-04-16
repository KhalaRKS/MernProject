import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import InputForm from '../../components/InputForm'
import toast from 'react-hot-toast';
import { usuarioContext } from '../../context/UserContext';

function App() {
  const navigate = useNavigate();

  const contexto = useContext(usuarioContext)
  const {addUserLogin} = contexto
  
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  async function loginUser(event) {
    event.preventDefault()
   fetch('http://localhost:2690/api/login',
    {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password
      })
    })
    .then(response => response.json())
      .then(data => {
        console.log("DATA EN EL LOGIN"+data);
        if(data.status === 'ok'){ 
          let token = data.token
          addUserLogin(token)
          toast.success('Successfully logged!')
          setTimeout( () => {
            navigate('/dashboard/table')
          }, 2000)
      }else if (data.status === 'nouser'){
        toast.error("Please check your username!")
      }else if(data.status === 'pwerror'){
        toast.error("Please check your password!")
      }
      })
  }

  return (
    <div className='container '>
      <div className='container__text'>
        <h1 className='font-sans'>Hi! Welcome back.</h1>
        <div className='container__text--register'>
          <p>Don't have an account?</p>
          <Link className="link" to="/register">Register</Link>
        </div>
      </div>
      <form onSubmit={loginUser} className='form'>
        <InputForm value={email} change={setEmail} name='Email' type='email'></InputForm>
        <InputForm value={password} change={setPassword} name='Password' type='password'></InputForm>
        <input type="submit" value="Login" className='button'/>

      </form>
    </div>
  );
}

export default App;


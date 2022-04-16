import React, { useEffect, useContext, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { usuarioContext } from '../../context/UserContext';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import InputForm from '../../components/InputForm';
import './EditUser.scss'
import { editUserContext } from '../../context/EditUserContext';
import toast from 'react-hot-toast';

export function EditUser() {

    const {mail} = useContext(editUserContext)
    const { token, removeUserLogin } = useContext(usuarioContext)

    /**USESTATE DEL INPUT */
    const [name, setName] = useState('')
    const [email, setEmail] = useState(mail)
    const [password, setPassword] = useState('')
    const [usuario, setUsuario] = useState('')
    const navigate = useNavigate()

    useEffect(() => {

      fetch('http://localhost:2690/api/user/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: mail,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 'ok') {
            setUsuario(data.user)
            setName(data.user.name)
            setPassword(data.user.password)
            setUsuario(data.user)
          }else{
            console.log('Error al recuperar el usuario')
            toast.error('Error al recuperar el usuario')
          }
        })
    },[mail])
    
      const updateUser = async (e) => {
        e.preventDefault()
        if(name === '' || password === '' || email === ''){
          return toast.error('Todos los campos son obligatorios')
        }
          bcrypt.compare(password, usuario.password, function (err, res) {
            if (res) {
                return toast.error('La contraseña no puede ser la misma que la anterior')
            }else{
              console.log('Se realizo el cambio de contraseña')
            }
          })  
        if (email === '') {
          return toast.error('El email no puede estar vacio')
        }
          
        
         const req = await fetch('http://localhost:2690/api/user/update', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              user: mail,
              name,
              email,
              password,
            }),
          })
          const res = await req.json()
          if (res.status === 'ok') {
            toast.success('Usuario actualizado')
            navigate('/dashboard/table')
      }else{
        toast.error('Error al actualizar el usuario')
      }
    }

    
  return (
    <div>
        <form onSubmit={(e) => updateUser(e)} className="form">
        <InputForm value={name} change={setName} name="Name" type="text"></InputForm>
        <InputForm value={email} change={setEmail} name="Email" type="email"></InputForm>
        <InputForm value={password} change={setPassword} name="Password" type="password"></InputForm>
        <button type='submit' className='button btn__update--edituser' id='btn__update--edituser'>Update</button>
        </form>


    </div>
  )
}


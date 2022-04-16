import React, {useEffect} from 'react'
import User from '../User/User';
import { TailSpin } from 'react-loader-spinner';
import { useOutletContext } from 'react-router-dom';
export function TableUser() {
    const [getAllUsers, load, users] = useOutletContext();
    console.log(users);
    useEffect(() => {
        console.log("estoy bugeado");
    },[]);
    
  return (
    <div className="container__table">
    <button className="button__findUsers" onClick={(e) => getAllUsers(e)}>
      Find users
    </button>
    {load ? (
      <TailSpin ariaLabel="loading-indicator" color="#0EA5E9" />
    ) : (
      <table className="table">
        <thead>
          <tr className="">
            <th className="">Email</th>
            <th className="">Name</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return (
              <tr key={index} className="tr__user">
                <User
                  name={user.name}
                  email={user.email}
                  refresh={getAllUsers}
                ></User>
              </tr>
            );
          })}
        </tbody>
      </table>
    )}
  </div>
  )
}

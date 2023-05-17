import React from 'react'
import { useState } from 'react'
import './Login.css'
import img from '../img/locomotive.png'

import axios from 'axios'
import { useHistory } from 'react-router-dom'
import Button from '../button/Button'



function Login(props) {


  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        username,
        password,
      });
      const { token, permissions,id,workPlace } = response.data;
      sessionStorage.setItem('token', JSON.stringify(token));
      sessionStorage.setItem('permissions', JSON.stringify(permissions));
      sessionStorage.setItem('id', JSON.stringify(id));
      console.log(response.data)

      
      
      if (permissions.includes('CAN_DO_MINE_ROLE')) {
        history.push("/mine_board")
        window.location.reload();
      }else if (permissions.includes('CAN_DO_OWNER_ROLE')) {
        history.push('/owner_board');
        window.location.reload();
      }else if (permissions.includes('CAN_DO_ADMIN_ROLE')) {
        history.push('/admin_board');
        window.location.reload();
      }else if (permissions.includes('CAN_DO_CAMERA_MAN_ROLE')) {
        history.push('/camera');
        window.location.reload();
      }else if(permissions.includes('CAN_DO_MASTER_ROLE')){
        sessionStorage.setItem('workPlace',workPlace.nameaOfWorkPlace)
        history.push('/master_board/workers');
        window.location.reload();
      }else if (permissions.includes('CAN_DO_DRIVER_ROLE')) {
        history.push('/driver_board');
        window.location.reload();
      }else if(permissions.includes('CAN_DO_WORKER_ROLE')){
        history.push('/worker_board');
        window.location.reload();
      }
      
      else {
        history.push('/');
        window.location.reload();
      }
    } catch (error) {
      const resMessage =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.stringify();
      setMessage(resMessage);
    }
  };
    
     
 
  return (
   

     <div className='form-login'>
     <form onSubmit={handleLogin} autoComplete="off">    
       <div className="containerr">
         <img  src={img} id="avatar"/>
         <label htmlFor="username">Username</label>
        <input type="text" id="user" value={username} onChange={(e) => setUsername(e.target.value)} autocomplete={"off"} />
         <label htmlFor="password">Password</label>
         <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}  autocomplete="off" />
         <br />
         <br />
            <Button name="Login"/> 
          {
           message && (
             <h5 className='res-message'>{message}</h5>
           )
          }
         <br />
         <br />
       </div>
     </form>
   </div>
  )
}

export default Login
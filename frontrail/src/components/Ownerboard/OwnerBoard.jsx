import React, { useState } from 'react'
import Button from '../button/Button'
import './OwnerBoard.css'
import axios from 'axios'
import { Form } from 'react-router-dom'

function OwnerBoard() {

    const [username,setUsername] =  useState("")
    const [password ,setPassword] =  useState("")
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');

    const asdsa = async () =>{
        // e.preventDefault();
        setIsLoading(true)
        try {
            const token = sessionStorage.getItem('token')
            const headers = {
                Authorization: 'Bearer ${token}',
            };
            const data = {username,password};
            const res = await axios.put('http://localhost:8080/api/admin/change_admin_data', data, {headers});
            console.log(res.data);
            setIsLoading(false)
        } catch (error) {
            console.log(error);
            setIsLoading(false)
        }
    }
   
  return (
    <div className='body_owner'>
        <div className="section">
            <div className="container-fluid">
                <div className="row full-height justify-content-center">
                    <div className="col-12 text-center align-self-center py-5">
                        <div className="section pb-5 pt-5 pt-sm-2 text-center">
                           <div className='owner_label'>
                            <h6 className="mb-0 pb-3 text-center h6_owner"><span className='span_owner'>Owner </span><span className='span_owner'>Admin</span></h6>
                           </div> 
                            <input className="checkbox chsk" type="checkbox" id="reg-log" name="reg-log"/>
                            <label htmlFor="reg-log"></label>
                          
                            <div className="card-3d-wrap mx-auto">
                                <div className="card-3d-wrapper">
                                   
                                        <form>
                                            <div className="card-front">
                                                <div className="center-wrap">
                                                    <div className="section text-center">
                                                        <h4 className="mb-4 pb-3">Owner</h4>
                                                        <div className="form-group">
                                                            <input type="text" name="logemail" className="form-style" placeholder="Your Email" onChange={(e)=> setUsername(e.target.value)} id="logemail" autoComplete="off"/>
                                                            <i className="input-icon uil uil-at"></i>
                                                        </div>	
                                                        <div className="form-group mt-2">
                                                            <input type="password" name="logpass" className="form-style" onChange={(e)=> setPassword(e.target.value)} placeholder="Your Password" id="logpass" autoComplete="off"/>
                                                            <i className="input-icon uil uil-lock-alt"></i>
                                                        </div>
                                                        <Button name="Submit"/>
                                                    </div>
                                                </div>
                                           </div>
                                        </form>
                                    
                                    <div className="card-back">
                                        <div className="center-wrap">
                                            <div className="section text-center">
                                                <h4 className="mb-4 pb-3">Admin</h4>
                                                <div className="form-group">
                                                    <input type="text" name="logname" className="form-style" placeholder="Your Full Name" id="logname" autoComplete="off"/>
                                                    <i className="input-icon uil uil-user"></i>
                                                </div>	
                                                <div className="form-group mt-2">
                                                    <input type="email" name="logemail" className="form-style" placeholder="Your Email" id="logemail" autoComplete="off"/>
                                                    <i className="input-icon uil uil-at"></i>
                                                </div>
                                               <Button name="Submit"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default OwnerBoard
import React,{useState,useEffect} from 'react'
import { FiEdit2 } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";
import SideBarMaster from '../SideBarMaster/SideBarMaster';
import {FiPlusCircle} from "react-icons/fi";
import axios from 'axios'

function MasterTrips() {
     const [modalVisible,setModalVisible] = useState(false)
    const token = sessionStorage.getItem('token')
    const token1 = token.substring(1, token.length-1);
    const [trips,setTrips] = useState([])
    const id =  sessionStorage.getItem('id')
    const workPlace = sessionStorage.getItem('workPlace')

    



    useEffect(() =>{
        const instance = axios.create({
        baseURL: 'http://localhost:8080/api/trips/api/',
        headers: { 'Authorization': `Bearer ${token1}` }
        });
        instance.get('getAllTripsToWorkPlace/'+ id)
        .then(response => {
        setTrips(response.data.permissions)
        console.log(response.data)
        })
        .catch(error => {
        console.log(error);
        });
    },[])
  return (
    <div>
        <div>
        <div className="sidebar">
            <SideBarMaster />
        </div>
        <div className='table-com'>
            <main className="table">
            <section className="table__header">
                <h1><span className='main__name'>{workPlace}: </span> Work Trips list </h1>
                <div className="input-group">
                <input type="search" placeholder="Search Data..." />
                </div>
               
            </section>
            <section className="table__body">
                <table>
                <thead>
                    <tr>
                    <th> Id {/*<span className="icon-arrow"></span>*/}</th>
                    <th> Driver name <span className="icon-arrow"></span></th>
                    <th> Train name <span className="icon-arrow"></span></th>
                    <th> Start Date <span className="icon-arrow"></span></th>
                    </tr>
                </thead>
                <tbody>
                    {trips.map((item, index)=>(
                    <tr key={item.id} className="table_hover">
                        <td>{index+1}</td>
                        <td>{item.user.fullname}</td>
                        <td>{item.train.name}</td>
                        <td>{item.startsWith}</td>
                    </tr>
                    
                    ))}
                </tbody>
                </table>
            </section>
            </main>
           
        </div>
            
        </div>
    </div>
  )
}

export default MasterTrips
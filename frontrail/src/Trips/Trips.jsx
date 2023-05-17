import React,{useState,useEffect} from 'react'
import { FiEdit2 } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";
import Sidebar from '../components copy/Sidebar';
import {FiPlusCircle} from "react-icons/fi";
import AddNewTripModalTrip from './AddNewTripModal/AddNewTripModalTrip';
import axios from 'axios'

function MasterBoardTrips() {

    const [modalVisible,setModalVisible] = useState(false)
    const token = sessionStorage.getItem('token')
    const token1 = token.substring(1, token.length-1);
    const [trips,setTrips] = useState([])

    const handleOpenModal = ()=>{
        setModalVisible(prev => !prev)
    }



    useEffect(() =>{
        const instance = axios.create({
        baseURL: 'http://localhost:8080/api/trips/',
        headers: { 'Authorization': `Bearer ${token1}` }
        });
        instance.get('getAllTrips')
        .then(response => {
        setTrips(response.data.permissions)
        console.log(response.data.permissions)
        })
        .catch(error => {
        console.log(error);
        });
    },[])
  return (
    <div>
        <div>
        <div className="sidebar">
            <Sidebar />
        </div>
        <div className='table-com'>
            <main className="table">
            <section className="table__header">
                <h1>Trips List</h1>
                <div className="input-group">
                <input type="search" placeholder="Search Data..." />
                </div>
                <FiPlusCircle className='masters_add_icon' onClick={handleOpenModal}/>
            </section>
            <section className="table__body">
                <table>
                <thead>
                    <tr>
                    <th> Id {/*<span className="icon-arrow"></span>*/}</th>
                    <th> Driver name <span className="icon-arrow"></span></th>
                    <th> Train name <span className="icon-arrow"></span></th>
                    <th> Start Date <span className="icon-arrow"></span></th>
                    <th> Action <span className="icon-arrow"></span></th>
                    </tr>
                </thead>
                <tbody>
                    {trips.map((item, index)=>(
                    <tr key={item.id} className="table_hover">
                        <td>{index+1}</td>
                        <td>{item.user.fullname}</td>
                        <td>{item.train.name}</td>
                        <td>{item.startsWith}</td>
                        <td>
                            <div >
                            <FiEdit2  className="icon_for_edit"/>
                            <FiTrash2 className="icon_for_edit" />
                            </div>
                        </td>
                        
                    </tr>
                    
                    ))}
                </tbody>
                </table>
            </section>
            </main>
           
        </div>
            <div>
            <AddNewTripModalTrip togleEdit={handleOpenModal}  isOpen={modalVisible}/>
            </div>
        </div>
    </div>
    
  )
}

export default MasterBoardTrips
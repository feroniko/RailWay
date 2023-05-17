import React, { useEffect, useState } from 'react'
import Sidebar from '../components copy/Sidebar'
import axios from 'axios'
import { FiEdit2 } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";
import {FiPlusCircle} from "react-icons/fi";
import { Link } from "react-router-dom";
import TrainModal from './TrainModal/TrainModal';
import {useHistory} from 'react-router-dom'


function Train() {
  const history = useHistory()
  const [modalVisible,setModalVisible] = useState(false)
  const [user, setUser] = useState([]);
  const token = sessionStorage.getItem('token')
  const token1 = token.substring(1, token.length-1);
  const [editModal,setEditModal] = useState(false)
  const [train_id,setTrain_id] = useState(1)
  

    useEffect(() =>{
        const instance = axios.create({
        baseURL: 'http://localhost:8080/api/train/',
        headers: { 'Authorization': `Bearer ${token1}` }
        });
        instance.get('getAllTrains')
        .then(response => {
        setUser(response.data.permissions)
        console.log(response.data.permissions)
        
        })
        .catch(error => {
        console.log(error);
        });
    },[])
    
      const handleOpenModal = ()=>{
          setModalVisible(prev => !prev)
          
      }

      

  return (
    <div>
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className='table-com'>
        <main className="table">
          <section className="table__header">
            <h1>Trains List</h1>
            <div className="input-group">
              <input type="search" placeholder="Search Data..." />
            </div>
            <FiPlusCircle className='masters_add_icon' onClick={handleOpenModal}/>
          </section>
          <section className="table__body">
            <table>
              <thead>
                  <tr>
                    <th> Id </th>
                    <th> Train name <span className="icon-arrow"></span></th>
                    <th> Action <span className="icon-arrow"></span></th>
                  </tr>
              </thead>
              <tbody>
                  {user.map((item, index)=>(
                  <tr key={item.id} className="table_hover">
                    <td>{index+1}</td>
                    <td>{item.name}</td>
                    <td>
                    <div >
                      <FiEdit2  className="icon_for_edit" onClick={() => history.push("/admin_board/trains/train_id=" + item.id)}/>
                      <FiTrash2 className="icon_for_edit" />
                    </div>
                    </td>
                     
                  </tr>
                  
                ))}
              </tbody>
            </table>
           
          </section>
          
        </main>
        <div>
          <TrainModal togleEdit={handleOpenModal}  isOpen={modalVisible}/>
        </div>
      </div>

    </div>
  )
}

export default Train
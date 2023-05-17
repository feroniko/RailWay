import React, { useEffect, useState } from 'react'
import Sidebar from '../components copy/Sidebar'
import '../Masters/Masters.css'
import axios from 'axios'
import { FiEdit2, FiEye } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";
import {FiPlusCircle} from "react-icons/fi";
import AddModalWorker from './AddModalWorker/AddModalWorker'
import AddMAsterModal from '../Masters/modalMasters/AddMAsterModal';
import {useHistory} from 'react-router-dom'
function Worker() {

    const history = useHistory()
    const [user, setUser] = useState([]);
    const token = sessionStorage.getItem('token')
    const token1 = token.substring(1, token.length-1);
    const [modalVisible,setModalVisible] = useState(false)

    


  useEffect(() =>{
    const instance = axios.create({
    baseURL: 'http://localhost:8080/api/worker/',
    headers: { 'Authorization': `Bearer ${token1}` }
    });
    instance.get('get_all-workersList')
    .then(response => {
    setUser(response.data.userList)
    console.log(response.data.userList.nameaOfWorkPlace)
    
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
            <h1>Workers List</h1>
            <div className="input-group">
              <input type="search" placeholder="Search Data..." />
            </div>
            <FiPlusCircle className='masters_add_icon' onClick={()=>handleOpenModal()}/>
          </section>
          <section className="table__body">
            <table>
              <thead>
                <tr>
                <th> Id </th>
                <th> Full name <span className="icon-arrow"></span></th>
                <th> Date of birth <span className="icon-arrow"></span></th>
                <th> UserName <span className="icon-arrow"></span></th>
                <th> Garde Number <span className="icon-arrow"></span></th>
                <th> Table Number <span className="icon-arrow"></span></th>
                <th> WorkPlace <span className="icon-arrow"></span></th>
                <th> Action <span className="icon-arrow"></span></th>
                </tr>
              </thead>
              <tbody>
                {user.map((item, index)=>(
                    <tr key={item.id} className="table_hover">
                      <td>{index+1}</td>
                      <td>{item.fullname}</td>
                      <td>{item.age}</td>
                      <td>{item.username}</td>
                      <td>{item.gradeNumber}</td>
                      <td>{item.tableNumeber}</td>
                      <td>{item.workPlace.nameaOfWorkPlace}</td>
                      <td>
                      <div >
                        <FiEdit2  className="icon_for_edit" onClick={() => history.push("/admin_board/workers/worker_id=" + item.id) }/>
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
          <AddModalWorker togleEdit={handleOpenModal}  isOpen={modalVisible}/>
        </div>

      </div>
     
    </div>
  )
}

export default Worker
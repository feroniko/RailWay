import React,{useEffect,useState} from 'react'
import SideBarMaster from './SideBarMaster/SideBarMaster'
import axios from 'axios';
import {FiPlusCircle} from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";
import { FiEdit2 } from "react-icons/fi";
import './MasterBoard.css'
import {useHistory} from 'react-router-dom'

function MasterBoard() {

  const history = useHistory()
  const [user, setUser] = useState([]);
  const token = sessionStorage.getItem('token')
  const token1 = token.substring(1, token.length-1);
  const id =  sessionStorage.getItem('id')
  const [modalVisible,setModalVisible] = useState(false)
  const workPlace = sessionStorage.getItem('workPlace')

  useEffect(() =>{
    const instance = axios.create({
    baseURL: 'http://localhost:8080/api/worker/',
    headers: { 'Authorization': `Bearer ${token1}` }
    });
    instance.get('get_workelistByWorkingTime/'+id)
    .then(response => {
    setUser(response.data.userList)
    console.log(response.data.userList)
    
    })
    .catch(error => {
    console.log(error);
    });
},[])
  

  return (
    <div className='MainboardAdmin'>
    <SideBarMaster  />
    <div className='table-com'>
    <main className="table">
      <section className="table__header">
        <h1><span className='main__name'>{workPlace}: </span> Worker list </h1>
        <div className="input-group">
          <input type="search" placeholder="Search Data..." />
        </div>
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
                        <FiEdit2  className="icon_for_edit" onClick={() => history.push("/master_board/workers/worker_id=" + item.id) } />
                      </div>
                      </td>
                      
                    </tr>
                    
                  ))}
              </tbody>
            </table>
          </section>
    </main>
  </div>
</div>
  )
}

export default MasterBoard
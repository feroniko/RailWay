import Sidebar from '../components copy/Sidebar'
import './MainboardAdmin.css'
import styled from "styled-components";
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FiTrash2 } from "react-icons/fi";
import { FiEdit2 } from "react-icons/fi";
import {FiPlusCircle} from "react-icons/fi";
import AddModalWorkPlace from './AddModalWorkPlace'
import {useHistory} from 'react-router-dom'
function MainboardAdmin() {
     
    const history = useHistory()
    const [user, setUser] = useState([]);
    const token = sessionStorage.getItem('token')
    const token1 = token.substring(1, token.length-1);
    const [modalVisible, setModalVisible] = useState(false);
    const [workPlaceMaster, setWorkPlaceMaster] = useState("");
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const [workingTimes,setWorkingTimes] = useState(0)
    const [addModalVisible, setaddModalVisible] = useState(false);
    const [nameOfWorkPlace,setNameOfWorkPlace] = useState([])    

    useEffect(() =>{
      const instance = axios.create({
      baseURL: 'http://localhost:8080/api/workPlace',
      headers: { 'Authorization': `Bearer ${token1}` }
      });
      instance.get('/get_workplace')
      .then(response => {
      setNameOfWorkPlace(response.data.object)
      // setWorkingTimes(response.data.workinTimes)
      console.log(response.data.workinTimes)
      
      })
      .catch(error => {
      console.log(error);
      });
  },[])

    

    function handleOpenModalAddWorkPlace(){
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
            <h1>Work Places List</h1>
            <div className="input-group">
              <input type="search" placeholder="Search Data..." />
            </div>
            <FiPlusCircle className='masters_add_icon' onClick={handleOpenModalAddWorkPlace}/>
          </section>
          <section className="table__body">
            <table>
              <thead>
                <tr>
                <th> Id </th>
                <th> WorkPlace Name <span className="icon-arrow"></span></th>
                <th> Action <span className="icon-arrow"></span></th>
                </tr>
              </thead>
              <tbody>
               {nameOfWorkPlace.map((item, index)=>(
                    <tr key={item.id} className="table_hover">
                      <td>{index+1}</td>
                      <td>{item.nameaOfWorkPlace}</td>
                      <td>
                      <div >
                        <FiEdit2  className="icon_for_edit" onClick={() => history.push("/admin_board/workPlace_id=" + item.id) } />
                      </div>
                      </td>
                      
                    </tr>
                    
                  ))}
              </tbody>
            </table>
          </section>
        </main>
        <div>
          <AddModalWorkPlace togleEdit={handleOpenModalAddWorkPlace}  isOpen={modalVisible}/>
        </div>
      </div>

    </div>
  )
}

export default MainboardAdmin

const Div = styled.div`
  position: relative;
`;
import React,{useState,useEffect} from 'react'
import SideBarMaster from '../SideBarMaster/SideBarMaster'
import {FiPlusCircle} from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";
import { FiEdit2 } from "react-icons/fi";
import axios from 'axios'
import AddModalFixingTypes from './ModalFixinTypes/AddModalFixingTypes';

function Category() {
    const [modalVisible,setModalVisible] = useState(false)
    const [modalVisibled,setModalVisibled] = useState(false)
    const [fixingTypes,setFixingTypes] = useState([])
    const [user, setUser] = useState([]);
    const token = sessionStorage.getItem('token')
    const token1 = token.substring(1, token.length-1);
    const master_id = sessionStorage.getItem('id');
    const workPlace = sessionStorage.getItem('workPlace')

    const handleOpenModaled = ()=>{
        setModalVisibled(prev => !prev)
        
    }


    useEffect(() =>{
        const instance = axios.create({
        baseURL: 'http://localhost:8080/api/fixinTypeCategory/',
        headers: { 'Authorization': `Bearer ${token1}` }
        });
        instance.get('getAllFixinTypes/' + master_id )
        .then(response => {
        setUser(response.data.permissions)
        
        
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
        <FiPlusCircle className='masters_add_icon' onClick={handleOpenModaled}/>
      </section>
      <section className="table__body">
            <table>
              <thead>
                <tr>
                <th> Id </th>
                <th> Category name <span className="icon-arrow"></span></th>
                <th> Duration <span className="icon-arrow"></span></th>
                <th> Action <span className="icon-arrow"></span></th>
                </tr>
              </thead>
              <tbody>
                {user.map((item, index)=>(
                    <tr key={item.id} className="table_hover">
                      <td>{index+1}</td>
                      <td>{item.nameOfCategory}</td>
                      <td>{item.durationOfFixingCategory}</td>

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
    <AddModalFixingTypes togleEdit={handleOpenModaled} isOpen={modalVisibled}/>
</div>

</div>
  )
}

export default Category
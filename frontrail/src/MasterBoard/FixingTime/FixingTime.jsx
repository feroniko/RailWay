import React,{useEffect} from 'react'
import SideBarMaster from '../SideBarMaster/SideBarMaster'
import axios from 'axios'
import { useState } from 'react'
import { FiTrash2 } from "react-icons/fi";
import { FiEdit2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import { FiEye } from 'react-icons/fi';
import { useHistory } from 'react-router-dom'


function FixingTime() {
    const history = useHistory();
    const workPlace = sessionStorage.getItem('workPlace')
    const token = sessionStorage.getItem('token')
    const id =  sessionStorage.getItem('id')
    const token1 = token.substring(1, token.length-1);
    const [fixingTime,setFixingTime] = useState([])

    useEffect(() =>{
        const instance = axios.create({
        baseURL: 'http://localhost:8080/api/train/',
        headers: { 'Authorization': `Bearer ${token1}` }
        });
        instance.get('getAllFixingTimes/'+id)
        .then(response => {
        setFixingTime(response.data.permissions)    
        })
        .catch(error => {
        console.log(error);
        });
    },[])

    function handleEdit(id){
        history.push('/master_board/repair/repair_id='+id);
    }

  return (
    <div>
     <div className='MainboardAdmin'>
        <SideBarMaster  />
        <div className='table-com'>
          <main className="table">
            <section className="table__header">
                <h1><span className='main__name'>{workPlace}: </span>Fixing Time</h1>
                <div className="input-group">
                <input type="search" placeholder="Search Data..." />
                </div>
            </section>
            <section className="table__body">
                    <table>
                    <thead>
                        <tr>
                            
                            <th> Id </th>
                            <th> Train name <span className="icon-arrow"></span></th>
                            <th> Category of fixing <span className="icon-arrow"></span></th>
                            <th> Dutration of Fixing <span className="icon-arrow"></span></th>
                            <th> Action <span className="icon-arrow"></span></th>
                        </tr>
                    </thead>
                    <tbody>
                        
                            {fixingTime.map((item, index)=>(
                                <tr key={item.id} className="table_hover">
                                    
                                    <td>{index+1}</td>
                                    <td>{item.train.name}</td>
                                    <td>{item.categoryOfFixing.nameOfCategory}</td>
                                    <td>{item.categoryOfFixing.durationOfFixingCategory} hours</td>
                                
                                    <td>
                                    <div >
                                        <FiEdit2  className="icon_for_edit" onClick={()=> handleEdit(item.id)}/>
                                        <FiEye className="icon_for_edit" />
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
    </div>
  )
}

export default FixingTime
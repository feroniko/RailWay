import React,{useState} from 'react'
import './Driverboard.css'
import { useHistory } from 'react-router-dom'
import {FiPlusCircle} from "react-icons/fi";
import Fixingtime from './FixingTime/Fixingtime';

function DriverBoard() {
  const [modalDriver,setModalDriver] = useState(false);
  const history = useHistory();
  const [modalVisible,setModalVisible] = useState(false);

  function handleOpanModalDriver() {
    setModalVisible(prev => !prev)
  }
  

  return (
    
    <div>
    <div className='table-com driver_board' >
      <main className="table">
        <section className="table__header">
          <h1>Driverboard</h1>
          <div className="input-group">
            <input type="search" placeholder="Search..." />
            
          </div>
          
          <FiPlusCircle className='masters_add_icon' onClick={handleOpanModalDriver}  />
          
          
        </section>
        
        <section className="table__body">
          <table>
            <thead>
                <tr>
                  <th> <h5> Id </h5> </th>
                  <th> <h5> full </h5> <span className="icon-arrow"></span></th>
                  <th> <h5> Date  </h5><span className="icon-arrow"></span></th>
                  <th> <h5> UserName </h5><span className="icon-arrow"></span></th>
                  
                </tr>
            </thead>
            <tbody>
              {/* <tr>
                <td> 1 </td>
                <td> <img src="../images/Zinzu Chan Lee.jpg" alt="" />Zinzu Chan Lee</td>
                <td> Seoul </td>
                <td> 17 Dec, 2022 </td>
                <td>
                  <p className="status delivered">Delivered</p>
                </td>
                <td> <strong> $128.90 </strong></td>
              </tr> */}
              {/* {user.map((item, index)=>(
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
                    <FiEdit2  className="icon_for_edit"/>
                    <FiTrash2 className="icon_for_edit" />
                  </div>
                  </td>
                   
                </tr>
                
              ))} */}
            </tbody>
          </table>
         
        </section>
        
      </main>
    
    <div>
      <Fixingtime togleEdit={handleOpanModalDriver}  isOpen={modalVisible}/>
    </div>

    </div>

  </div>
  )
}

export default DriverBoard
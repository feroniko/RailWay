import React,{useEffect,useState} from 'react'
import {Modal,ModalHeader,ModalFooter,ModalBody} from "reactstrap"
import axios from 'axios';
import './EditTrainModal.css'
import img from './images.jpg'
import {FiSkipBack} from "react-icons/fi";
import {useHistory} from 'react-router-dom'
import {useParams} from 'react-router-dom';

function EditTrainModal() {
    const token = sessionStorage.getItem('token')
    const authToken = token.substring(1,token.length-1)
    const history = useHistory()
    const params = useParams()
    const train_id = params.id
    const [trainName,setTrainName] = useState("")
    const [workPlace,setWorkalce] = useState("")
    const [workPlaceName,setNameOfWorkPlace] = useState([])
    const [workPlace_id,setWorkPlace_id] = useState(0)
    

    useEffect(() =>{
      const instance = axios.create({
      baseURL: 'http://localhost:8080/api/workPlace',
      headers: { 'Authorization': `Bearer ${authToken}` }
      });
      instance.get('/get_workplace')
      .then(response => {
      setNameOfWorkPlace(response.data.object)
      console.log(response.data)
      
      })
      .catch(error => {
      console.log(error);
      });
  },[])
    
    
    
        useEffect(() =>{
            const instance = axios.create({
                baseURL: 'http://localhost:8080/api/train/',
                headers: { 'Authorization': `Bearer ${authToken}` }
            });
            instance.get('getById/' + train_id)
            .then(response => { 
              setTrainName(response.data.permissions) 
              setWorkalce(response.data.permissions.workPalce)  
              const work = response.data.permissions.workPlace.nameaOfWorkPlace
              setWorkalce(work)
 
            })
            .catch(error => {
                console.log(error);
            });
        },[])
    
        function handleLink(){
            history.goBack();
        }
        
  return (
    
   <div className='body_train'>
      <div className="container mt-4 mb-4 p-3 d-flex justify-content-center"> 
     <div className="card p-4"> 
        <FiSkipBack className="icon_for_edit" onClick={handleLink}/>
      <div className=" image d-flex flex-column justify-content-center align-items-center">
       <button className="btn btn-secondary"> <img src={img} height="100" width="100" /></button> 
       <br />
       <hr />
             <div>
              <table class="table">
                  <thead>
                      <tr>
                      <th scope="col">Train Name:</th>
                      <th scope="col">{trainName.name}</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr>
                          <th scope="col">WorkPlace Name:</th>
                          <th scope="col">{workPlace}</th>
                      </tr>   
                  </tbody>
              </table>
             </div>
             <hr />
          
           <input type="text" className='input_workPlace' placeholder='ediiting Train name....' />
           <br />
           <select className='custom-select sources'>
            {
              workPlaceName.map((item) => (
                <option onClick={()=> setWorkPlace_id(item.id)} value={item.nameaOfWorkPlace}>{item.nameaOfWorkPlace}</option>
              ))
            }
           </select>
        <div className=" d-flex mt-2"> 
         <button className="btn1 btn-dark">Edit Profile</button> 
        </div>  
        </div> 
     </div>
    </div>
   </div>
  )
}

export default EditTrainModal
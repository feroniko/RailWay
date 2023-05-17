import React,{useState,useEffect} from 'react'
import { useForm } from 'react-hook-form'
import {Modal,ModalHeader,ModalFooter,ModalBody} from "reactstrap"
import axios from 'axios'
import './AddMAsterModal.css'
import WorkPlaceList from '../../WorkPlaceList/WorkPlaceList';




function AddMAsterModal({togleEdit,isOpen}) {
    const [username,setUsername] = useState('')
    const [age,setAge] = useState(0)
    const [password,setPassword] = useState('')
    const [prePassword,setprePassword] = useState('')
    const [fullname,setFullName] = useState('')
    const [tableNumeber,setTableNumber] = useState(0)
    const [gradeNumber,setGradeNumber] = useState(0)
    const [file,setFile] = useState()
    const [message,setMessage] = useState('')
    const [workPlace,setNameOfWorkPlace] = useState([])
    const token = sessionStorage.getItem('token')
    const authToken = token.substring(1,token.length-1)
    const [workPlace_id,setWorkPlaceId] = useState(1)
    const [workingTimes,setWorkingTimes] = useState([])
    const [workingTime,setWorkingTime] = useState(1)
    const [phoneNumber,setPhoneNumber] = useState('')

    

    const onSubmitDataMaster = async (e) =>{
       e.preventDefault();
        try {
          
            const headers = {
                Authorization: 'Bearer '+ authToken,
                "Content_Type": "multipart/form-data",
              
            };          
           const data = {phoneNumber,username,age,password,prePassword,workPlace_id,fullname,tableNumeber,gradeNumber,workingTime}

            
            const res = await axios.post('http://localhost:8080/api/master/add_master',data,{headers});
            window.location.reload();
            
            
        } catch (error) {
          const resMessage =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.stringify();
          setMessage(resMessage);
          
        }
    }


    
    useEffect(() =>{
      const instance = axios.create({
      baseURL: 'http://localhost:8080/api/workPlace',
      headers: { 'Authorization': `Bearer ${authToken}` }
      });
      instance.get('/get_workplace')
      .then(response => {
      setNameOfWorkPlace(response.data.object)
      setWorkingTimes(response.data.workinTimes)
      
      
      })
      .catch(error => {
      console.log(error);
      });
  },[])


  function handleChange(event){
    const index = event.target.selectedIndex;
    const optionElement = event.target.childNodes[index];
    const optionElementId = optionElement.getAttribute('id');
    setWorkPlaceId(optionElementId)
  }

  function handleChanged(event){
    const index = event.target.selectedIndex;
    const optionElement = event.target.childNodes[index];
    const optionElementId = optionElement.getAttribute('id');
    setWorkingTime(optionElementId)
    
  }

  

    

    

   
  return (
    <div>
        <Modal isOpen={isOpen} togleEdit={togleEdit} >
            <ModalHeader >
                Add new Master
            </ModalHeader>
            <ModalBody>
                <div className='row'>
                  <div className="col-6">
                      <form onSubmit={onSubmitDataMaster} enctype="multipart/form-data" action="servlet/Importer">
                        <div className='main_content_masters mt-2 '>
                         <span>Username</span><input type="text" name='username' placeholder='username'className='input_workPlace' onChange={(e)=> setUsername(e.target.value)} />
                        </div>
                        <div className='main_content_masters mt-2'>
                        <span>Password</span><input type="text"name='password'  placeholder='password' className='input_workPlace' onChange={(e)=>setPassword(e.target.value) }/>
                        </div>
                        <div className='main_content_masters mt-2'>
                        <span>prePassword</span><input type="text" name='prePassword' placeholder='prePassword' className='input_workPlace' onChange={(e) => setprePassword(e.target.value)}/>
                        </div>
                        <div className='main_content_masters mt-2'>
                        <span>Full Name</span><input type="text" name='fullname' placeholder='full name' className='input_workPlace' onChange={(e) => setFullName(e.target.value)} />
                        </div>
                        <div className='main_content_masters mt-2'>
                        <span>Phone Number</span><input type="text" name='phoneNumber' placeholder='phone Number' className='input_workPlace' onChange={(e) => setPhoneNumber(e.target.value)} />
                        </div>
                        <div className='main_content_masters mt-2'>
                        <span>Date of Birth</span><input type="date" name='age' placeholder='age' className='input_workPlace' onChange={(e) => setAge(e.target.value)}/>
                        </div>
                        
                        <div className='main_content_masters mt-2'>
                        <span>TableNumber</span><input type="number" name='tableNumeber' placeholder='tableNumeber' className='input_workPlace' onChange={(e) => setTableNumber(e.target.value)}/>
                        </div>
                        <div className='main_content_masters mt-2'>
                        <span>GradeNumber</span><input type="number" name='gradeNumber' placeholder='gradeNumber' className='input_workPlace' onChange={(e) => setGradeNumber(e.target.value)}/>
                        </div>
                        {/* <div className='main_content_masters mt-2 '>
                        <input onChange={(e)=> setFile(e.target.files[0])} accept="image/png, image/jpeg" type="file" placeholder='File'  />
                        </div> */}
                    </form>
                  </div>
                 
                    
                        <div className="col-2 mt-4">
                            <div> 
                                <div className="center">
                                    <select name="sources" id="sources" className="custom-select sources" onChange={handleChange} placeholder="Source Type">
                                        {workPlace.map((item)=>
                                        <option id={item.id} value="profile">
                                            {item.nameaOfWorkPlace}
                                        </option>
                                        )}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-4 mt-4">
                            <div> 
                                <div className="center">
                                    <select name="sources" id="sources" className="custom-select sources" onChange={handleChanged} placeholder="Source Type">
                                     {
                                        workingTimes.map((item,index) => (
                                            item.map((obj,index) => (
                                                <option id={obj.id}>{obj.nameOfWorkingTiime}</option>
                                            ))
                                        ))
                                     }
                                    </select>
                                </div>
                            </div>
                        </div>
                    
                    
                    
              
               </div>
              
            </ModalBody>
            <ModalFooter>
                
                <button className='btn btn-dark' type='submit' onClick={onSubmitDataMaster}>Submit</button>
                <button className='btn btn-danger' onClick={togleEdit}>Cancel</button> 
               
            </ModalFooter>
            <div>
                 {
                     message && (
                        <h5 className='res-message'>{message}</h5>
                    )
                 }
            </div>
        </Modal>
    </div>
  )
}

export default AddMAsterModal
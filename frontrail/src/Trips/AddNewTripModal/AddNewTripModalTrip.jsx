import React,{useState,useEffect} from 'react'
import {Modal,ModalHeader,ModalFooter,ModalBody} from "reactstrap"
import axios from 'axios';

function AddNewTripModalTrip({togleEdit,isOpen}) {

  const token = sessionStorage.getItem('token')
  const authToken = token.substring(1,token.length-1)
  const [workPlace,setNameOfWorkPlace] = useState([])
  const [user, setUser] = useState([]);
  const [message,setMessage] = useState('')
  const [train_id,setWorkPlaceId] = useState(1)
  const [name,setTrainName] = useState(1)
  const [worker,setWorker] = useState([])
  const [user_id,setUserId]= useState(0)
  const [startsWith,setStartsWith] = useState(0)

  
  useEffect(() =>{
    const instance = axios.create({
    baseURL: 'http://localhost:8080/api/train/',
    headers: { 'Authorization': `Bearer ${authToken}` }
    });
    instance.get('getAllTrains')
    .then(response => {
    setWorker(response.data.permissions)
    console.log(response.data.permissions)
    
    
    })
    .catch(error => {
    console.log(error);
    });
},[])

useEffect(() =>{
    const instance = axios.create({
    baseURL: 'http://localhost:8080/api/driver/',
    headers: { 'Authorization': `Bearer ${authToken}` }
    });
    instance.get('get_driver')
    .then(response => {
    setUser(response.data.userList)
    console.log(response.data.userList)
    
    })
    .catch(error => {
    console.log(error);
    });
},[])

  


function handleChange(event){
  const index = event.target.selectedIndex;
  const optionElement = event.target.childNodes[index];
  if (optionElement) {
    const optionElementId = optionElement.getAttribute('id');
    setWorkPlaceId(optionElementId)
  }
}

function handleChanged(event){
  const index = event.target.selectedIndex;
  const optionElement = event.target.childNodes[index];
  if(optionElement){
    const optionElementId = optionElement.getAttribute('id');
    setUserId(optionElementId)
  }
}


const onSubmitTrip = async (e) =>{
  e.preventDefault();
   try {
     
       const headers = {
           Authorization: 'Bearer '+ authToken,
         
       };
       // const formData = new FormData()
       
       // formData.append('file',file)
       // formData.append("request",{username,age,password,prePassword,workPlace_id,fullname,tableNumeber,gradeNumber})
     
      const data = {train_id,user_id,startsWith}

       
       const res = await axios.post('http://localhost:8080/api/trips/addTrip',data,{headers});
       window.location.reload();
       console.log(res.data);
       
   }catch (error) {
    const resMessage =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.stringify();
    setMessage(resMessage);
  }
  
}


  return (
    <div>
        <Modal  togleEdit={togleEdit} isOpen={isOpen}>
            <ModalHeader>
                Add New Trip
            </ModalHeader>
            <ModalBody>
            <div className='row'>
                  <div className="col-5" >
                    <form  enctype="multipart/form-data" action="servlet/Importer" onSubmit={onSubmitTrip}>
                      <h4>Starts time</h4>
                      <input type="date" onChange={(e) => setStartsWith(e.target.value) } />
                    </form>
                  </div>
            </div>
            <div className="row">
              
                <div className="col-7">
                        <div> 
                            <div className="center mt-12">
                              <h4>Chose driver</h4>
                                <select name="sources" id="sources" className="custom-select sources" onClick={handleChanged} placeholder="Source Type">
                                    {user.map((item)=>
                                    <option id={item.id} value="profile">
                                        {item.fullname}
                                    </option>
                                    )}
                                </select>
                            </div>
                        </div>
                      </div>

                      <div className="col-5 ">
                          <div className="center mt-12">
                            <h4>Chose Train</h4>
                              <select name="sources" id="sources" className="custom-select sources" onClick={handleChange} placeholder="Source Type">
                                  {worker.map((item)=>
                                  <option id={item.id} value="profile">
                                      {item.name}
                                  </option>
                                  )}
                              </select>
                          </div>
                      </div>
                
            </div>
            </ModalBody>
            <ModalFooter>
                <button type="submit" onClick={onSubmitTrip} className="btn btn-danger">Submit</button>
                <button onClick={togleEdit} className="btn btn-dark">Cancel</button>
            </ModalFooter>
            {
            message && (
              <h5 className='res-message'>{message}</h5>
            )
          }
        </Modal>
    </div>
  )
}

export default AddNewTripModalTrip
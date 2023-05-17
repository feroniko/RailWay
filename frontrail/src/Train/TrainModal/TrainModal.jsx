import React,{useEffect,useState} from 'react'
import {Modal,ModalHeader,ModalFooter,ModalBody} from "reactstrap"
import axios from 'axios';

function TrainModal({isOpen,togleEdit}) {

    const token = sessionStorage.getItem('token')
    const authToken = token.substring(1,token.length-1)
    const [workPlace,setNameOfWorkPlace] = useState([])
    const [message,setMessage] = useState('')
    const [workPlace_id,setWorkPlaceId] = useState(1)
    const [name,setTrainName] = useState("")

    const onSubmitTrainData = async (e) =>{
        e.preventDefault();
         try {
           
             const headers = {
                 Authorization: 'Bearer '+ authToken,
                 
               
             };
            const data = {workPlace_id,name}
             const res = await axios.post('http://localhost:8080/api/train/add_train',data,{headers});
             window.location.reload();
             console.log(res.data);
             
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
        
        console.log(response.data.object)
        
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
  return (
    <div>
        <Modal isOpen={isOpen} togleEdit={togleEdit} >
            <ModalHeader >
                Add new Master
            </ModalHeader>
            <ModalBody>
                <div className='row'>
                  <div className="col-8" onSubmit={onSubmitTrainData}>
                    <form  enctype="multipart/form-data" action="servlet/Importer">
                      <input type="text" placeholder='Enter train name' onChange={(e)=> setTrainName(e.target.value)} />   
                    </form>
                  </div>
                 
                    <div className="col-4">
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
               </div>
              
            </ModalBody>
            <ModalFooter>
                
                <button className='btn btn-dark' onClick={onSubmitTrainData} type='submit' >Submit</button>
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

export default TrainModal
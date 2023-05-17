import {Modal,ModalHeader,ModalFooter,ModalBody} from "reactstrap"
import React,{useState,useEffect} from 'react'
import axios from "axios"

function AddModalFixingTypes({togleEdit,isOpen}) {
    const [message,setMessage] = useState("")
    const [catetgoryName,setCategoryName] = useState("")
    const [durationOfFixing,setDurationFixing] = useState(0)
    const token = sessionStorage.getItem('token')
    const authToken = token.substring(1,token.length-1)
    const master_id = sessionStorage.getItem('id')
    
    const onSubmitDataFixingTypes = async (e) =>{
        e.preventDefault();
         try {
           
             const headers = {
                 Authorization: 'Bearer '+ authToken,
               
             };
            const data = {catetgoryName,durationOfFixing}
             const res = await axios.post('http://localhost:8080/api/fixinTypeCategory/addCategoryFixing/'+ master_id,data,{headers});
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

  return (
    <div>
        <Modal togleEdit={togleEdit} isOpen={isOpen}>
            <ModalHeader>
                Add new Fixing Type
            </ModalHeader>
            <ModalBody>
              <form >
                <h4>New Category</h4>
                <input type="text"   className='input_workPlace ' placeholder="Enter category..." onChange={(e)=> setCategoryName(e.target.value)}/>
                <h4>Duration</h4>
                <input type="number" className='input_workPlace' placeholder="Enter duration of fixing..."  onChange={(e)=> setDurationFixing(e.target.value)}/>
              </form>
            </ModalBody>
            <ModalFooter>
                <button type="submit" onClick={onSubmitDataFixingTypes} className="btn btn-danger">Save</button>
                <button onClick={togleEdit} className="btn btn-dark">Cancel</button>
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

export default AddModalFixingTypes
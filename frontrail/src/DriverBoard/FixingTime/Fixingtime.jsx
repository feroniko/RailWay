import React,{useState,useEffect} from 'react'
import axios from 'axios';
import {Multiselect} from 'multiselect-react-dropdown';
import {Modal,ModalHeader,ModalFooter,ModalBody} from "reactstrap"



function Fixingtime({togleEdit,isOpen}) {

    const [user, setUser] = useState([]);
    const [fixingTypes,setFixingTypes] = useState([])
    const token = sessionStorage.getItem('token')
    const token1 = token.substring(1, token.length-1);
    const master_id = sessionStorage.getItem('id');
    const [fixingTypes_id, setSelectedItems] = useState([]);
    const [onSubmitFixing,setCategoryId] = useState(0)
    const [message,setMessage] = useState("")
    const [categoryOfFixing_id,setCategoryFixingId] = useState(0)
    const id = sessionStorage.getItem("id")
    
    const onSubmitDataMaster = async (e) =>{
        console.log(fixingTypes_id)
        console.log(categoryOfFixing_id)
        e.preventDefault();
         try {
           
             const headers = {
                 Authorization: 'Bearer '+ token1
               
             };
            
             const data = {fixingTypes_id,categoryOfFixing_id}
             const res = await axios.post('http://localhost:8080/addFixingTime/addFixingTime/'+ id,data,{headers});
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

    useEffect(() =>{
        const instance = axios.create({
        baseURL: 'http://localhost:8080/api/fixingTypes/api/',
        headers: { 'Authorization': `Bearer ${token1}` }
        });
        instance.get('getAllNameFixing/' + master_id)
        .then(response => {
        setFixingTypes(response.data.permissions)
        
        })
        .catch(error => {
        console.log(error);
        });
    },[])

    function handleChange(event){
        const index = event.target.selectedIndex;
        const optionElement = event.target.childNodes[index];
        const optionElementId = optionElement.getAttribute('id');
        setCategoryFixingId(optionElementId)
      }
  return (
    <div>
        <Modal togleEdit={togleEdit} isOpen={isOpen}>
            <ModalHeader>
                <div className="m-4">
                    <h4 className="text-center text-primary color-white">Send Fixing Names</h4>
                </div>
            </ModalHeader>
            <ModalBody>
               <form>
                <div class="row d-flex justify-content-center mt-100">
                    <div > 
                        <form onSubmit={onSubmitFixing}>
                            <Multiselect
                                    options={
                                        fixingTypes.map((item) => (
                                            item.nameOfFixing
                                        ))
                                    }
                                    isObject={false}
                                    onSelect={(event) => (setSelectedItems(event))}
                                    
                                    
                                />
                                <hr />

                                <select name="sources" id="sources" className="custom-select sources" onClick={handleChange}>
                                    {
                                        user.map((item) => (
                                            <option id={item.id} value={item.id}  key={item.id}>{item.nameOfCategory}</option>
                                        ))
                                    }
                                </select>
                                
                        </form>
                    </div>
                    </div> 
               </form>
            </ModalBody> 
            <ModalFooter>
                  <button className='btn btn-primary' onClick={onSubmitDataMaster}>Submit</button>
                  <button   onClick={togleEdit} className="btn btn-danger">Cancel</button>
            </ModalFooter>       
     </Modal>
    </div>
  )
}

export default Fixingtime
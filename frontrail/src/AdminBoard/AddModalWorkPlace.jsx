import React,{useState} from 'react'
import { useForm } from 'react-hook-form'
import {Modal,ModalHeader,ModalFooter,ModalBody} from "reactstrap"
import axios from 'axios'
import { FiEdit2 } from "react-icons/fi";
import {FiPlusCircle} from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";


function ModalWorkPlace({togleEdit,isOpen}) {
  const [workinTimesNames, setworkinTimesNames] = useState([''])
  const [message,setMessage] = useState('') 
  const [workPlaceName,setWorkPlaceName] = useState('')
  const token = sessionStorage.getItem('token')
  const token1 = token.substring(1, token.length-1);
  const [nameOfWorkPlace,setNameOfWorkPlace] = useState([])

    

  const handleChange = (value, index) => {
    const newHobby = workinTimesNames.map((hobbyItem, hobbyIndex) => {
      return hobbyIndex === index ? value : hobbyItem
    })
    setworkinTimesNames(newHobby)
  }

  

  const handleSubmitData = async (e) =>{
    e.preventDefault();
    try {
        const token = sessionStorage.getItem('token')
        const authToken = token.substring(1,token.length-1)
        const headers = {
            Authorization: 'Bearer '+ authToken,
        };
        const data = {workPlaceName,workinTimesNames};
        console.log(workPlaceName)
        console.log(workinTimesNames)
        const res = await axios.post('http://localhost:8080/api/workPlace/add-workplace', data, {headers});
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
    <div >
        <Modal isOpen={isOpen} togleEdit={togleEdit} className="main_content_workPlace_modal">
          <ModalHeader>
              Add new WorkPlace
          </ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmitData}> 
                <div>
                  <h4>Add New WorkPlace</h4>
                  <input type="text" className='input_workPlace' placeholder='WorkPlace name...' onChange={(e) => setWorkPlaceName(e.target.value)}/>
                </div>
                <hr />
              <div>
              <div className='worlPlace_add_new_container'>
                  Working times:
                    <FiPlusCircle className='masters_add_icon' onClick={() => {
                        setworkinTimesNames([...workinTimesNames, ''])
                      }} />
              </div>
                {
                  workinTimesNames.map((item, index) => {
                    return <div style={{ display: 'flex' }}>
                      <input value={item} className='input_workPlace mt-3' onChange={(e) => handleChange(e.target.value, index)} />
                      <FiTrash2 className="icon_for_edit mt-3"
                        onClick={() => {
                          const newarr = workinTimesNames.filter((i, j) => {
                            return index !== j
                          })
                          console.log(newarr)
                          setworkinTimesNames(newarr)
                        }}
                      />
                      
                    </div>
                    })
                  }
              </div>
            </form>
          </ModalBody>
          <ModalFooter>
                <button className='btn btn-primary ' type='submit' onClick={handleSubmitData}>Submit</button>
                <button className='btn btn-danger' onClick={togleEdit}>Cancel</button>    
          </ModalFooter>
           <div className='add_modal_message'>
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

export default ModalWorkPlace 
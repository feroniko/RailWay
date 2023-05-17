import React,{useEffect,useState} from 'react'
import {Modal,ModalHeader,ModalFooter,ModalBody} from "reactstrap"
import axios from 'axios';
import img from './workPlace.png'
import {FiSkipBack} from "react-icons/fi";
import {useHistory} from 'react-router-dom'
import {useParams} from 'react-router-dom';
import {FiPlusCircle} from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";



function OneWorkPlcace() {

    const history = useHistory()
    const [workPlace,setWorkPlace] = useState("")
    const token = sessionStorage.getItem('token')
    const authToken = token.substring(1,token.length-1)
    const [workingTimes,setWorkingTimes] = useState([])
    const [workinTimesNames, setworkinTimesNames] = useState([''])
    const params = useParams()
    const workPlace_id = params.id


    const handleChange = (value, index) => {
      const newHobby = workinTimesNames.map((hobbyItem, hobbyIndex) => {
        return hobbyIndex === index ? value : hobbyItem
      })
      setworkinTimesNames(newHobby)
    }
    useEffect(() =>{
      const instance = axios.create({
      baseURL: 'http://localhost:8080/api/workPlace/',
      headers: { 'Authorization': `Bearer ${authToken}` }
      });
      instance.get('getOneWorkPlace/' + workPlace_id )
      .then(response => {
      setWorkPlace(response.data.object)
      setWorkingTimes(response.data.workinTimes)
      console.log(response.data.workinTimes)
      
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
      <div className="container mt-4  mb-4 p-3 d-flex justify-content-center"> 
     <div className="card p-4"> 
        <FiSkipBack className="icon_for_edit" onClick={handleLink}/>
      <div className=" image d-flex flex-column justify-content-center align-items-center">
       <button className="btn btn-secondary"> <img src={img} height="100" width="100" /></button> 
       <br />
             <div>
              <table class="table">
                  <thead>
                      <tr>
                        <th scope="col">Workplace Name:</th>
                        <th>{workPlace.nameaOfWorkPlace}</th>
                      </tr>
                  </thead>
                  <thead>
                      <tr>
                          <th scope="col">Working Times</th>
                          {
                            workingTimes.map((item) => (
                                <th >{item.nameOfWorkingTiime}</th>
                            ))
                          }
                      </tr>   
                  </thead>
              </table>
             </div>
             <h5>Work Place Name: </h5>
            <input type="text" className='input_workPlace' placeholder='ediiting Work Place name....'  />
            <br />
           <h5>Working Times: </h5>
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
        <div className=" d-flex mt-2"> 
         <button className="btn pt-2 mt-3 btn-primary">Edit Profile</button> 
        </div>  
        </div> 
     </div>
    </div>
   </div>
  )
}

export default OneWorkPlcace
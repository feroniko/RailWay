import React,{useEffect,useState} from 'react'
import {useParams} from 'react-router-dom';
import axios from 'axios';
import { FiTrash2 } from "react-icons/fi";
import { FiEdit2 } from "react-icons/fi";
import {FiSkipBack} from "react-icons/fi";
import {useHistory} from 'react-router-dom'
import { train } from '@tensorflow/tfjs';


function OneFixingTime() {
    const history = useHistory()
    const params = useParams()
    const fixing_id = params.id
    const token = sessionStorage.getItem('token')
    const token1 = token.substring(1, token.length-1);
    const [trainame,setTrainName] = useState("")
    const [fixingTypes,setFixingtypes] = useState([])
    const [user,setUser] = useState([])
    const id =  sessionStorage.getItem('id')
    const [user_id,setUser_id] = useState(0)
    const [message,setMessage] = useState("")


    useEffect(() =>{
        const instance = axios.create({
        baseURL: 'http://localhost:8080/addFixingTime/',
        headers: { 'Authorization': `Bearer ${token1}` }
        });
        instance.get('getOneFixingTime/' + fixing_id)
        .then(response => {
        setFixingtypes(response.data.permissions.fixingTypes)
        setTrainName(response.data.permissions.train.name)
        })
        .catch(error => {
        console.log(error);
        });
    },[])

    useEffect(() =>{
      const instance = axios.create({
      baseURL: 'http://localhost:8080/api/worker/',
      headers: { 'Authorization': `Bearer ${token1}` }
      });
      instance.get('get_workelistByWorkingTime/'+id)
      .then(response => {
      setUser(response.data.userList)
      console.log(response.data.userList)
      
      })
      .catch(error => {
      console.log(error);
      });
  },[])

  const handleIds = async (id) =>{
        try {
          
            const headers = {
                Authorization: 'Bearer '+ token1,
            };          
           const data = {user_id}

            
            const res = await axios.post('http://localhost:8080/addFixingTime/attachUsertoFixingType/' + id + "/" + fixing_id,data,{headers});
            window.location.reload();
            
            
        } catch (error) {
          const resMessage =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.stringify();
          setMessage(resMessage);
          
        }
    }

  function handleChange(event){
    const index = event.target.selectedIndex;
    const optionElement = event.target.childNodes[index];
    const optionElementId = optionElement.getAttribute('id');
    setUser_id(optionElementId)
  }

  function handleLink(){
    history.goBack();
}

  return (
   <div className="container ">
     <FiSkipBack className="icon_for_edit" onClick={handleLink}/>
     <div className='row'>
      <div className="col-12">
        <h4 className='text-center text-primary mt-5'>{trainame}</h4>
      </div>
      <div className="row text-center">
          <div className="ml-10">
            <table class="table_driver">
            <thead>
              <tr>
                <th scope="col-10">Fixing Names</th>
                <th scope="col-10">Workes</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
                {
                  fixingTypes.map((items) => (
                  <tr>
                    <td data-label="Account">{items.nameOfFixing}</td>
                    <td data-label="Due Date">
                      <select onClick={handleChange} name="sources" id="sources" className="custom-select sources"  placeholder="Source Type">
                        {
                          user.map((item) => (
                            <option id={item.id}>{item.fullname}</option>
                          ))
                        }
                      </select>
                    </td>
                    <div >
                      <button className='btn btn-primary mt-3' onClick={()=> handleIds(items.id)}>Submit</button>
                    </div>
                  </tr>
                  ))
                }
                  
            </tbody>
          </table>
          </div>
      </div>
    </div>
   </div>
  )
}

export default OneFixingTime
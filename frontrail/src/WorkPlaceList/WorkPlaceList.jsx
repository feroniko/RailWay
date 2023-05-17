import React,{useEffect,useState} from 'react'
import axios from 'axios';
import './WorkPlaceList.css'
function WorkPlaceList() {
    const [workPlace,setNameOfWorkPlace] = useState([])
    const token = sessionStorage.getItem('token')
    const authToken = token.substring(1,token.length-1)
    const [workPlaceId,setWorkPlaceId] = useState('')

    useEffect(() =>{
        const instance = axios.create({
        baseURL: 'http://localhost:8080/api/workPlace',
        headers: { 'Authorization': `Bearer ${authToken}` }
        });
        instance.get('/get_workplace')
        .then(response => {
        setNameOfWorkPlace(response.data.object)
        
        console.log(response.data.workinTimes)
        
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
      alert(optionElementId)
    }

  return (
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
  )
}

export default WorkPlaceList
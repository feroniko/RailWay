import React,{useState,useEffect} from 'react'
import {useParams} from 'react-router-dom';
import axios from 'axios';
import {FiSkipBack} from "react-icons/fi";
import {useHistory} from 'react-router-dom'

function OneUser() {
    const params = useParams()
    const user_id = params.id
    const [user,setUser] = useState("")
    const token = sessionStorage.getItem('token')
    const token1 = token.substring(1, token.length-1);
    const [workPlace,setWorkPlace] = useState("")
    const [workPlace_id,setWorkPlace_id] = useState(0)
    const [workPlaceName,setNameOfWorkPlace] = useState([])
    const [workingTime,setWorkingTime] = useState("")
    const [User_id,setUser_id] = useState(0)
    const history = useHistory()




    useEffect(() =>{
        const instance = axios.create({
        baseURL: 'http://localhost:8080/api/edit_userData/',
        headers: { 'Authorization': `Bearer ${token1}` }
        });
        instance.get('getUser/' + user_id)
        .then(response => {
        setUser_id(response.data.permissions.id)
        setUser(response.data.permissions)
        setWorkPlace(response.data.permissions.workPlace)
        setWorkingTime(response.data.permissions.workingTime)
        
        
        })
        .catch(error => {
        console.log(error);
        });
    },[])

  

    useEffect(() =>{
        const instance = axios.create({
        baseURL: 'http://localhost:8080/api/workPlace',
        headers: { 'Authorization': `Bearer ${token1}` }
        });
        instance.get('/get_workplace')
        .then(response => {
        setNameOfWorkPlace(response.data.object)
        })
        .catch(error => {
        console.log(error);
        });
    },[])
    
    function handleLink(){
        history.goBack();
    }

    function handleChange(event){
        const index = event.target.selectedIndex;
        const optionElement = event.target.childNodes[index];
        const optionElementId = optionElement.getAttribute('id');
        setWorkPlace_id(optionElementId)
      }
  return (
    <div className="container rounded bg-white mt-5 mb-5 main__body_color">
    <div className="row">
        <div className="col-md-4 border-right">
            <FiSkipBack className="icon_for_edit" onClick={handleLink}/>
            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
            <table class="table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Key</th>
                    <th scope="col">Value</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Username</td>
                        <td>{user.username}</td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Password</td>
                        <td>{user.passwordToShow}</td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>FullName</td>
                        <td>{user.fullname}</td>
                    </tr>
                    <tr>
                        <th scope="row">4</th>
                        <td>Date of Birht</td>
                        <td>{user.age}</td>
                    </tr>
                    <tr>
                        <th scope="row">5</th>
                        <td>Phone number</td>
                        <td>{user.phoneNumber}</td>
                    </tr>
                    <tr>
                        <th scope="row">6</th>
                        <td>GradeNumber</td>
                        <td>{user.gradeNumber}</td>
                    </tr>
                    <tr>
                        <th scope="row">7</th>
                        <td>Table Number</td>
                        <td>{user.tableNumeber}</td>
                    </tr>
                    
                    <tr>
                        <th scope="row">8</th>
                        <td>WorkPlace</td>
                        <td>{workPlace.nameaOfWorkPlace}</td>
                    </tr>
                    <tr>
                        <th scope="row">9</th>
                        <td>Working Time</td>
                        <td>{workingTime.nameOfWorkingTiime}</td>
                    </tr>
                </tbody>
             </table>
            </div>
        </div>
        <div className="col-md-7 border-right">
            <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-primary">Editing Time</h4>
                    <div className="mt-5 text-center"><button className="btn btn-primary profile-button" type="button">Save Profile</button></div>
                </div>
                <div className="row mt-2">
                    <div className="col-md-6"><h3 className="labels">User Name</h3><input type="text" className="form-control" placeholder="first name" value=""/></div>
                    <div className="col-md-6"><h3 className="labels">Password</h3><input type="text" className="form-control" value="" placeholder="surname"/></div>
                    <div className="col-md-6"><h3 className="labels">FullName</h3><input type="text" className="form-control" placeholder="enter phone number" value=""/></div>
                    <div className="col-md-6"><h3 className="labels">date Of Birth</h3><input type="date" className="form-control" placeholder="enter address line 2" value=""/></div>
                    <div className="col-md-6"><h3 className="labels">Phone Number</h3><input type="text" className="form-control" placeholder="enter address line 1" value=""/></div>
                    <div className="col-md-6"><h3 className="labels">Grade Number</h3><input type="number" className="form-control" placeholder="enter address line 2" value=""/></div>
                    <div className="col-md-6"><h3 className="labels">Table Number</h3><input type="number" className="form-control" placeholder="enter address line 2" value=""/></div>
                    <div></div>
                    <div className="col-md-6"><h3 className="labels">WorkPace</h3>
                        <select name="sources" id="sources" className="custom-select sources" onChange={handleChange} placeholder="Source Type">
                              {workPlaceName.map((item)=>
                              <option id={item.id} value="profile">
                                  {item.nameaOfWorkPlace}
                              </option>
                              )}
                        </select>
                    </div>
                    <div className="col-md-6"><h3 className="labels">WorkIng Time</h3><input type="text" className="form-control" placeholder="enter email id" value=""/></div>
                </div>
               
            </div>
        </div>
        
    </div>
</div>
  )
}

export default OneUser
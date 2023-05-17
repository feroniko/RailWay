import "./App.css";
import { BrowserRouter as Router, Switch, Route,Redirect } from "react-router-dom";
import Login from "../src/components/login/Login";
import OwnerBoard from "./components/Ownerboard/OwnerBoard";
import MainboardAdmin from "./AdminBoard/MainboardAdmin";
import MastersBoard from './Masters/MastersBoard'
import Worker from "./Workers/Worker";
import Driver from "./Driver/Driver";
import Trips from "./Trips/Trips";
import Train from "./Train/Train";
import MasterBoard from "./MasterBoard/MasterBoard";
import FixingTypes from "./MasterBoard/FixingTypes/FixingTypes";
import MasterTrips from "./MasterBoard/MasterTrips/MasterTrips";
import FixingTime from "./MasterBoard/FixingTime/FixingTime";
import DriverBoard from "./DriverBoard/DriverBoard";
import WorkerBoard from "./WorkerBoard/WorkerBoard";
import Category from "./MasterBoard/Category/Category";
import Fixingtime from "./DriverBoard/FixingTime/Fixingtime";
import OneDriver from "./Driver/OneDriver/OneDriver";
import EditTrainModal from "./Train/EditTrainModal/EditTrainModal";
import OneWorkPlcace from "./AdminBoard/OneWorkPlace/OneWorkPlcace";
import OneUser from "./Masters/OneUser/OneUser";
import OneFixingTime from "./MasterBoard/FixingTime/OneFixingTime/OneFixingTime";

function App() {

  const token = sessionStorage.getItem('token')
  const role = sessionStorage.getItem('permissions')

  return (
    <Router>
      <Switch>
      <Route exact path='/'>
        <Login/>
      </Route>
      <Route exact path="/mine_board">
          {token && role.includes('CAN_DO_OWNER_ROLE') ?   <OwnerBoard/>: <Redirect to="/" />}
      </Route>
      <Route exact path="/owner_board">
          {token && role.includes('CAN_DO_OWNER_ROLE') ?   <OwnerBoard/>: <Redirect to="/" />}
      </Route>
      <Route exact path="/admin_board">
          {token && role.includes('CAN_DO_ADMIN_ROLE') ?   <MainboardAdmin/>: <Redirect to="/" />}
      </Route>
      <Route exact path="/admin_board/masters">
          {token && role.includes('CAN_DO_ADMIN_ROLE') ?   <MastersBoard/>: <Redirect to="/" />}
      </Route>
      <Route exact path="/admin_board/masters/master_id=:id">
          {token && role.includes('CAN_DO_ADMIN_ROLE') ?   <OneUser/>: <Redirect to="/" />}
      </Route>
      <Route exact path="/admin_board/workPlace_id=:id">
          {token && role.includes('CAN_DO_ADMIN_ROLE') ?   <OneWorkPlcace/>: <Redirect to="/" />}
      </Route>
      <Route exact path="/master_board/repair/repair_id=:id">
          {token && role.includes('CAN_DO_MASTER_ROLE') ?   <OneFixingTime/>: <Redirect to="/" />}
      </Route>
      <Route exact path="/admin_board/workers">
          {token && role.includes('CAN_DO_ADMIN_ROLE') ?   <Worker/>: <Redirect to="/" />}
      </Route>
      <Route exact path="/admin_board/workers/worker_id=:id">
          {token && role.includes('CAN_DO_MASTER_ROLE') ?   <OneUser/>: <Redirect to="/" />}
      </Route>
      <Route exact path="/master_board/workers/worker_id=:id">
          {token && role.includes('CAN_DO_MASTER_ROLE') ?   <OneUser/>: <Redirect to="/" />}
      </Route>
      <Route exact path="/admin_board/trains/train_id=:id">
          {token && role.includes('CAN_DO_MASTER_ROLE') ?   <EditTrainModal/>: <Redirect to="/" />}
      </Route>
      <Route exact path="/admin_board/drivers">
          {token && role.includes('CAN_DO_ADMIN_ROLE') ?   <Driver/>: <Redirect to="/" />}
      </Route>
      <Route exact path="/admin_board/drivers/driver_id=:id">
          <OneDriver/>
      </Route>
      <Route exact path="/admin_board/trips">
          {token && role.includes('CAN_DO_ADMIN_ROLE') ?   <Trips/>: <Redirect to="/" />}
      </Route>
      <Route exact path="/admin_board/trains">
          {token && role.includes('CAN_DO_ADMIN_ROLE') ?   <Train/>: <Redirect to="/" />}
      </Route>
      <Route exact path="/master_board/workers">
          {token && role.includes('CAN_DO_MASTER_ROLE') ?   <MasterBoard/>: <Redirect to="/" />}
      </Route>
      <Route exact path="/master_board/fixing">
          {token && role.includes('CAN_DO_MASTER_ROLE') ?   <FixingTypes/>: <Redirect to="/" />}
      </Route>
      <Route exact path="/master_board/trips">
          {token && role.includes('CAN_DO_MASTER_ROLE') ?   <MasterTrips/>: <Redirect to="/" />}
      </Route>
      <Route exact path="/master_board/repair">
          {token && role.includes('CAN_DO_MASTER_ROLE') ?   <FixingTime/>: <Redirect to="/" />}
      </Route>
      <Route exact path="/master_board/category">
          {token && role.includes('CAN_DO_MASTER_ROLE') ?   <Category/>: <Redirect to="/" />}
      </Route>
    
      <Route exact path="/driver_board">
          {token && role.includes('CAN_DO_DRIVER_ROLE') ?   <DriverBoard/>: <Redirect to="/" />}
      </Route>
      <Route exact path="/driver_board/fixingTime">
          {token && role.includes('CAN_DO_DRIVER_ROLE') ?   <Fixingtime/>: <Redirect to="/" />}
      </Route>
      <Route exact path="/worker_board">
          {token && role.includes('CAN_DO_WORKER_ROLE') ?   <WorkerBoard/>: <Redirect to="/" />}
      </Route>
      
      
      </Switch>
    </Router>
  );
}

export default App;

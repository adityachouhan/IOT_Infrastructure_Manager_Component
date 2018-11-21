import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Login from './Login/Login';
import Home from './Home/Home';
import Delete from './Delete/Delete';
import Create from './Create/Create';
import Navbar from './LandingPage/Navbar';

import ClusterHome from './Cluster/ClusterHome';
import DeleteCluster from './Cluster/DeleteCluster';
import CreateCluster from './Cluster/CreateCluster';

import NodeHome from './Node/NodeHome';
import DeleteNode from './Node/DeleteNode';
import CreateNode from './Node/CreateNode';

import SensorHome from './Sensor/SensorHome';
import DeleteSensor from './Sensor/DeleteSensor';
import CreateSensor from './Sensor/CreateSensor';
//Create a Main Component
class Main extends Component {
    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}
                <Route path="/" component={Navbar}/>
                <Route path="/login" component={Login}/>
                <Route path="/home" component={Home}/>
                <Route path="/delete" component={Delete}/>
                <Route path="/create" component={Create}/>
				<Route path="/cluster-home" component={ClusterHome}/>
                <Route path="/delete-cluster" component={DeleteCluster}/>
                <Route path="/create-cluster" component={CreateCluster}/>
				<Route path="/node-home" component={NodeHome}/>
                <Route path="/delete-node" component={DeleteNode}/>
                <Route path="/create-node" component={CreateNode}/>
				<Route path="/sensor-home" component={SensorHome}/>
                <Route path="/delete-sensor" component={DeleteSensor}/>
                <Route path="/create-sensor" component={CreateSensor}/>
				
            </div>
        )
    }
}
//Export The Main Component
export default Main;
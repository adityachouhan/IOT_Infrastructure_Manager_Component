import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';

class Create extends Component{
    constructor(props){
        super(props);
        this.handleChangesmart_node_id = this.handleChangesmart_node_id.bind(this);
        this.handleChangesmart_node_manufacturer_id = this.handleChangesmart_node_manufacturer_id.bind(this);
        this.handleChangeno_of_sensors_connected = this.handleChangeno_of_sensors_connected.bind(this);
		this.handleChangesmart_node_connected_to_cluster_id = this.handleChangesmart_node_connected_to_cluster_id.bind(this);
        this.handleChangefirmware_version_id = this.handleChangefirmware_version_id.bind(this);
        this.handleNodeCreate = this.handleNodeCreate.bind(this);

        this.state = {
            smart_node_id : null,
            smart_node_manufacturer_id : null,
            no_of_sensors_connected : null,
			smart_node_connected_to_cluster_id : null,
			firmware_version_id : null,
            nodeCreated : false
        }
    }
    
    handleChangesmart_node_id = (e) => {
        this.setState({
            smart_node_id : e.target.value
        })
    }

    handleChangesmart_node_manufacturer_id = (e) => {
        this.setState({
            smart_node_manufacturer_id : e.target.value
        })
    }

    handleChangeno_of_sensors_connected = (e) => {
        this.setState({
            no_of_sensors_connected : e.target.value
        })
    }
	
	handleChangesmart_node_connected_to_cluster_id = (e) => {
        this.setState({
            smart_node_connected_to_cluster_id : e.target.value
        })
    }

    handleChangefirmware_version_id = (e) => {
        this.setState({
            firmware_version_id : e.target.value
        })
    }

    handleNodeCreate = (e) => {
        var data = {
            smart_node_id : this.state.smart_node_id,
            smart_node_manufacturer_id : this.state.smart_node_manufacturer_id,
            no_of_sensors_connected : this.state.no_of_sensors_connected,
			smart_node_connected_to_cluster_id : this.state.smart_node_connected_to_cluster_id,
			firmware_version_id : this.state.firmware_version_id
        }
        axios.post('http://localhost:3001/create-node',data)
            .then(response => {
                if(response.status == 200){
                    this.setState({
                        nodeCreated : true
                    })
                }else{
                    this.setState({
                        nodeCreated : false
                    })
                }
            })
    }

    render(){
        let redirect = null;
        if(this.state.nodeCreated){
            redirect = <Redirect to= "/node-home"/>
        }
        return(
            <div>
                {redirect}
                <br/>
                <div class="container">
                        <div style={{width: '30%'}} class="form-group">
                            <input onChange = {this.handleChangesmart_node_id} type="text" class="form-control" name="SmartNodeID" placeholder="SmartNodeID"/>
                        </div>
                        <br/>
                        <div style={{width: '30%'}} class="form-group">
                                <input onChange = {this.handleChangesmart_node_manufacturer_id} type="text" class="form-control" name="SmartNodeManufacturerID" placeholder="SmartNodeManufacturerID"/>
                        </div>
                        <br/>
                        <div style={{width: '30%'}} class="form-group">
                                <input onChange = {this.handleChangeno_of_sensors_connected} type="text" class="form-control" name="NoOfSensorsConnected" placeholder="NoOfSensorsConnected"/>
                        </div>
                        <br/>
						<div style={{width: '30%'}} class="form-group">
                                <input onChange = {this.handleChangesmart_node_connected_to_cluster_id} type="text" class="form-control" name="SmartNodeConnectedToClusterID" placeholder="SmartNodeConnectedToClusterID"/>
                        </div>
                        <br/>
                        <div style={{width: '30%'}} class="form-group">
                                <input onChange = {this.handleChangefirmware_version_id} type="text" class="form-control" name="FirmwareVersionID" placeholder="FirmwareVersionID"/>
                        </div>
                        <br/>
                        <div style={{width: '30%'}}>
                            <button onClick = {this.handleNodeCreate} class="btn btn-success" type="submit">Create</button>
                        </div> 
                </div>
            </div>
        )
    }
}

export default Create;
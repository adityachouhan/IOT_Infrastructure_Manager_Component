import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';

class CreateCluster extends Component{
    constructor(props){
        super(props);
        this.handleChangecluster_id = this.handleChangecluster_id.bind(this);
        this.handleChangeip_address = this.handleChangeip_address.bind(this);
        this.handleChangestreet_id = this.handleChangestreet_id.bind(this);
		this.handleChangegateway_id = this.handleChangegateway_id.bind(this);
        this.handleChangeNo_of_smart_nodes = this.handleChangeNo_of_smart_nodes.bind(this);
        this.handleClusterCreate = this.handleClusterCreate.bind(this);

        this.state = {
            cluster_id : null,
            ip_address : null,
            street_id : null,
			gateway_id : null,
            No_of_smart_nodes : null,
            clusterCreated : false
        }
    }
    
    handleChangecluster_id = (e) => {
        this.setState({
            cluster_id : e.target.value
        })
    }

    handleChangeip_address = (e) => {
        this.setState({
            ip_address : e.target.value
        })
    }

    handleChangestreet_id = (e) => {
        this.setState({
            street_id : e.target.value
        })
    }
	
	handleChangeNo_of_smart_nodes = (e) => {
        this.setState({
            No_of_smart_nodes : e.target.value
        })
    }
	
	handleChangegateway_id = (e) => {
        this.setState({
            gateway_id : e.target.value
        })
    }

    handleClusterCreate = (e) => {
        var data = {
            cluster_id : this.state.cluster_id,
            ip_address : this.state.ip_address,
            street_id : this.state.street_id,
			gateway_id : this.state.gateway_id,
			No_of_smart_nodes : this.state.No_of_smart_nodes
        }
        axios.post('http://localhost:3001/create-cluster',data)
            .then(response => {
                if(response.status == 200){
                    this.setState({
                        clusterCreated : true
                    })
                }else{
                    this.setState({
                        clusterCreated : false
                    })
                }
            })
    }

    render(){
        let redirect = null;
        if(this.state.clusterCreated){
            redirect = <Redirect to= "/cluster-home"/>
        }
        return(
            <div>
                {redirect}
                <br/>
                <div class="container">
                        <div style={{width: '30%'}} class="form-group">
                            <input onChange = {this.handleChangecluster_id} type="text" class="form-control" name="ClusterID" placeholder="Cluster ID"/>
                        </div>
                        <br/>
                        <div style={{width: '30%'}} class="form-group">
                                <input onChange = {this.handleChangeip_address} type="text" class="form-control" name="IP Address" placeholder="IP Address"/>
                        </div>
                        <br/>
                        <div style={{width: '30%'}} class="form-group">
                                <input onChange = {this.handleChangestreet_id} type="text" class="form-control" name="StreetID" placeholder="StreetID"/>
                        </div>
                        <br/>
						<div style={{width: '30%'}} class="form-group">
                                <input onChange = {this.handleChangegateway_id} type="text" class="form-control" name="GatewayID" placeholder="GatewayID"/>
                        </div>
                        <br/>
                        <div style={{width: '30%'}} class="form-group">
                                <input onChange = {this.handleChangeNo_of_smart_nodes} type="text" class="form-control" name="NoOfNodes" placeholder="Number Of Smart Nodes"/>
                        </div>
                        <br/>
                        <div style={{width: '30%'}}>
                            <button onClick = {this.handleClusterCreate} class="btn btn-success" type="submit">Create</button>
                        </div> 
                </div>
            </div>
        )
    }
}

export default CreateCluster;
import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

class NodeHome extends Component {
    constructor(){
        super();
        this.state = {  
            nodes : []
        }
    }  
    //get the nodes data from backend  
    componentDidMount(){
        axios.get('http://localhost:3001/node-home')
                .then((response) => {
                this.setState({
                    nodes : this.state.nodes.concat(response.data) 
                });
            });
    }

    render(){
        //iterate over nodes to create a table row
        let details = this.state.nodes.map(node => {
            return(
                <tr>
                    <td>{node.smart_node_id}</td>
                    <td>{node.smart_node_manufacturer_id}</td>
                    <td>{node.no_of_sensors_connected}</td>
					<td>{node.smart_node_connected_to_cluster_id}</td>
                    <td>{node.firmware_version_id}</td>
                </tr>
            )
        })
        //if not logged in go to login page
        let redirectVar = null;
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/login"/>
        }
        return(
            <div>
                {redirectVar}
                <div class="container">
                    <h2>List of All Nodes</h2>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Smart Node ID</th>
                                    <th>Smart Node manufacturer ID</th>
                                    <th>Number of sensors connected</th>
									<th>Smart Nodes Connected to Cluster ID</th>
                                    <th>Firmware Version ID</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/*Display the Tbale row based on data recieved*/}
                                {details}
                            </tbody>
                        </table>
                </div> 
            </div> 
        )
    }
}
//export Home Component
export default NodeHome;
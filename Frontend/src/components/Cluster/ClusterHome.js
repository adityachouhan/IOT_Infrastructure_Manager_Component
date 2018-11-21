import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

class ClusterHome extends Component {
    constructor(){
        super();
        this.state = {  
            clusters : []
        }
    }  
    //get the clusters data from backend  
    componentDidMount(){
        axios.get('http://localhost:3001/cluster-home')
                .then((response) => {
                this.setState({
                    clusters : this.state.clusters.concat(response.data) 
                });
            });
    }

    render(){
        //iterate over clusters to create a table row
        let details = this.state.clusters.map(cluster => {
            return(
                <tr>
                    <td>{cluster.cluster_id}</td>
                    <td>{cluster.ip_address}</td>
                    <td>{cluster.street_id}</td>
					<td>{cluster.gateway_id}</td>
                    <td>{cluster.No_of_smart_nodes}</td>
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
                    <h2>List of All Clusters</h2>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Cluster ID</th>
                                    <th>IP Address</th>
                                    <th>Street ID</th>
									<th>Gateway ID</th>
                                    <th>Number of Nodes</th>
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
export default ClusterHome;
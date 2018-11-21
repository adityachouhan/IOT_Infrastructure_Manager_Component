import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

class SensorHome extends Component {
    constructor(){
        super();
        this.state = {  
            sensors : []
        }
    }  
    //get the sensors data from backend  
    componentDidMount(){
        axios.get('http://localhost:3001/sensor-home')
                .then((response) => {
                this.setState({
                    sensors : this.state.sensors.concat(response.data) 
                });
            });
    }

    render(){
        //iterate over sensors to create a table row
        let details = this.state.sensors.map(sensor => {
            return(
                <tr>
                    <td>{sensor.sensor_type_id}</td>
                    <td>{sensor.sensor_type}</td>
                    <td>{sensor.sensor_measurement_unit}</td>
					<td>{sensor.sensor_min_value}</td>
                    <td>{sensor.sensor_max_value}</td>
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
                    <h2>List of All Sensors</h2>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Sensor Type ID</th>
                                    <th>Sensor ID</th>
                                    <th>Sensor Measurement Unit</th>
									<th>Sensor Minimum Value</th>
                                    <th>Sensor Maximum Value</th>
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
export default SensorHome;
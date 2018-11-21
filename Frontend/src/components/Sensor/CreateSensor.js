import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';

class CreateSensor extends Component{
    constructor(props){
        super(props);
        this.handleChangesensor_type_id = this.handleChangesensor_type_id.bind(this);
        this.handleChangesensor_type = this.handleChangesensor_type.bind(this);
        this.handleChangesensor_measurement_unit = this.handleChangesensor_measurement_unit.bind(this);
		this.handleChangesensor_min_value = this.handleChangesensor_min_value.bind(this);
        this.handleChangesensor_max_value = this.handleChangesensor_max_value.bind(this);
        this.handleSensorCreate = this.handleSensorCreate.bind(this);

        this.state = {
            sensor_type_id : null,
            sensor_type : null,
            sensor_measurement_unit : null,
			sensor_min_value : null,
			sensor_max_value : null,
            sensorCreated : false
        }
    }
    
    handleChangesensor_type_id = (e) => {
        this.setState({
            sensor_type_id : e.target.value
        })
    }

    handleChangesensor_type = (e) => {
        this.setState({
            sensor_type : e.target.value
        })
    }

    handleChangesensor_measurement_unit = (e) => {
        this.setState({
            sensor_measurement_unit : e.target.value
        })
    }
	
	handleChangesensor_min_value = (e) => {
        this.setState({
            sensor_min_value : e.target.value
        })
    }

    handleChangesensor_max_value = (e) => {
        this.setState({
            sensor_max_value : e.target.value
        })
    }


    handleSensorCreate = (e) => {
        var data = {
            sensor_type_id : this.state.sensor_type_id,
            sensor_type : this.state.sensor_type,
			sensor_measurement_unit : this.state.sensor_measurement_unit,
            sensor_min_value : this.state.sensor_min_value,
            sensor_max_value : this.state.sensor_max_value
        }
        axios.post('http://localhost:3001/create-sensor',data)
            .then(response => {
                if(response.status == 200){
                    this.setState({
                        sensorCreated : true
                    })
                }else{
                    this.setState({
                        sensorCreated : false
                    })
                }
            })
    }

    render(){
        let redirect = null;
        if(this.state.sensorCreated){
            redirect = <Redirect to= "/sensor-home"/>
        }
        return(
            <div>
                {redirect}
                <br/>
                <div class="container">
                        <div style={{width: '30%'}} class="form-group">
                            <input onChange = {this.handleChangesensor_type_id} type="text" class="form-control" name="SensorTypeID" placeholder="SensorTypeID"/>
                        </div>
                        <br/>
                        <div style={{width: '30%'}} class="form-group">
                                <input onChange = {this.handleChangesensor_type} type="text" class="form-control" name="SensorType" placeholder="SensorType"/>
                        </div>
                        <br/>
                        <div style={{width: '30%'}} class="form-group">
                                <input onChange = {this.handleChangesensor_measurement_unit} type="text" class="form-control" name="SensorMeasurementUnit" placeholder="SensorMeasurementUnit"/>
                        </div>
                        <br/>
						<div style={{width: '30%'}} class="form-group">
                                <input onChange = {this.handleChangesensor_min_value} type="text" class="form-control" name="SensorMinimumValue" placeholder="SensorMinimumValue"/>
                        </div>
                        <br/>
                        <div style={{width: '30%'}} class="form-group">
                                <input onChange = {this.handleChangesensor_max_value} type="text" class="form-control" name="SensorMaximumValue" placeholder="SensorMaximumValue"/>
                        </div>
                        <br/>
                        <div style={{width: '30%'}}>
                            <button onClick = {this.handleSensorCreate} class="btn btn-success" type="submit">Create</button>
                        </div> 
                </div>
            </div>
        )
    }
}

export default CreateSensor;
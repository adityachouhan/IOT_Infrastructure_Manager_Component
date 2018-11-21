import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';

class SensorDelete extends Component{
    constructor(props){
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            sensorToDelete : null,
            deletedFlag : false
        }
    }

    handleChange = (e) => {
        this.setState({
            sensorToDelete : e.target.value
        })
    }

    handleDelete = (e) =>{
        console.log("Sensor to Delete : ", this.state.sensorToDelete);
        axios.delete(`http://localhost:3001/delete-sensor/${this.state.sensorToDelete}`)
            .then(response => {
                if(response.status === 200){
                    this.setState({
                        deletedFlag : true
                    })
                }else{
                    this.setState({
                        deletedFlag : false
                    })
                }
            });
    }

    render(){
        let redirect = null;
        if(this.state.deletedFlag){
            redirect = <Redirect to= "/sensor-home"/>
        }
        return(
            <div>
                {redirect}
            <div class="container">
                    <div style={{width: "50%",float: "left"}} class="form-group">
                        <input onChange = {this.handleChange} type="text" class="form-control" name="SensorID" placeholder="Search a Sensor by Sensor ID"/>
                    </div>
                    <div style={{width: "50%", float: "right"}}>
                            <button onClick = {this.handleDelete} class="btn btn-success" type="submit">Delete</button>
                    </div> 
            </div>
            </div>
        )
    }
}

export default SensorDelete;
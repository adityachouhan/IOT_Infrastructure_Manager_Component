import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';

class DeleteNode extends Component{
    constructor(props){
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            nodeToDelete : null,
            deletedFlag : false
        }
    }

    handleChange = (e) => {
        this.setState({
            nodeToDelete : e.target.value
        })
    }

    handleDelete = (e) =>{
        console.log("Node to Dlete : ", this.state.nodeToDelete);
        axios.delete(`http://localhost:3001/delete-node/${this.state.nodeToDelete}`)
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
            redirect = <Redirect to= "/node-home"/>
        }
        return(
            <div>
                {redirect}
            <div class="container">
                    <div style={{width: "50%",float: "left"}} class="form-group">
                        <input onChange = {this.handleChange} type="text" class="form-control" name="NodeID" placeholder="Search a Node by Node ID"/>
                    </div>
                    <div style={{width: "50%", float: "right"}}>
                            <button onClick = {this.handleDelete} class="btn btn-success" type="submit">Delete</button>
                    </div> 
            </div>
            </div>
        )
    }
}

export default DeleteNode;
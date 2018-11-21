import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

//create the Navbar Component
class Navbar extends Component {
    constructor(props){
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }
    //handle logout to destroy the cookie
    handleLogout = () => {
        cookie.remove('cookie', { path: '/' })
    }
    render(){
        //if Cookie is set render Logout Button
        let navLogin = null;
        if(cookie.load('cookie')){
            console.log("Able to read cookie");
            navLogin = (
                <ul class="nav navbar-nav navbar-right">
                        <li><Link to="/" onClick = {this.handleLogout}><span class="glyphicon glyphicon-user"></span>Logout</Link></li>
                </ul>
            );
        }else{
            //Else display login button
            console.log("Not Able to read cookie");
            navLogin = (
                <ul class="nav navbar-nav navbar-right">
                        <li><Link to="/login"><span class="glyphicon glyphicon-log-in"></span> Login</Link></li>
                </ul>
            )
        }
        let redirectVar = null;
        if(cookie.load('cookie')){
            redirectVar = <Redirect to="/cluster-home"/>
        }
        return(
            <div>
                {redirectVar}
            <nav class="navbar navbar-inverse">
                <div class="container-fluid">
                    <div class="navbar-header">
                        <a class="navbar-brand" href="#">Smart City App</a>
                    </div>
                    <ul class="nav navbar-nav">
                        
						<li class="active"><Link to="/cluster-home">Cluster Home</Link></li>
                        <li><Link to="/create-cluster">Add a Cluster</Link></li>
                        <li><Link to="/delete-cluster">Delete a Cluster</Link></li>
						<li class="active"><Link to="/node-home">Node Home</Link></li>
                        <li><Link to="/create-node">Add a Node</Link></li>
                        <li><Link to="/delete-node">Delete a Node</Link></li>
						<li class="active"><Link to="/sensor-home">Sensor Home</Link></li>
                        <li><Link to="/create-sensor">Add a Sensor</Link></li>
                        <li><Link to="/delete-sensor">Delete a Sensor</Link></li>
                    </ul>
                    {navLogin}
                </div>
            </nav>
        </div>
        )
    }
}

export default Navbar;
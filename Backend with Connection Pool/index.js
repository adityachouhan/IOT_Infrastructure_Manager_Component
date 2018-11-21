//import the require dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
app.set('view engine', 'ejs');
var mysql = require('mysql');
var pool = require('./pool');

//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

//use express session to maintain session data
app.use(session({
    secret              : 'cmpe273_kafka_passport_mongo',
    resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration      :  5 * 60 * 1000
}));

// app.use(bodyParser.urlencoded({
//     extended: true
//   }));
app.use(bodyParser.json());




//Allow Access Control
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });
 
//Route to handle Post Request Call
app.post('/login',function(req,res){
    
    console.log("Inside Login Post Request");
        var username = req.body.username;
        var password = req.body.password;
        var sql = "SELECT *  FROM smart_city_281_usertable WHERE username = " + 
                mysql.escape(username) + "and password = " + mysql.escape(password);

    pool.getConnection(function(err,con){
        if(err){
			console.log(err);
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        }else{
            con.query(sql,function(err,result){
                if(err){
                    res.writeHead(400,{
                        'Content-Type' : 'text/plain'
                    })
                    res.end("Invalid Credentials");
                }else{
                    res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
                    req.session.user = result;
                        res.writeHead(200,{
                            'Content-Type' : 'text/plain'
                        })
                        res.end("Successful Login");
                }
            });
        }
    });
    
});

//Route to get All Books when user visits the Home Page
app.get('/home', function(req,res){
    var sql = "SELECT * FROM bookDetails";
    pool.getConnection(function(err,con){
        if(err){
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        }else{
            con.query(sql,function(err,result){
                if(err){
                    res.writeHead(400,{
                        'Content-Type' : 'text/plain'
                    })
                    res.end("Could Not Get Connection Object");   
                }else{
                    res.writeHead(200,{
                        'Content-Type' : 'application/json'
                    })
                    res.end(JSON.stringify(result));
                }
            });
        }
    })
    
})

app.delete('/delete/:id',function(req,res){
    console.log("Inside Delete Request");
    console.log("Book to Delete : ", req.params.id)
    var sql = "DELETE FROM bookDetails WHERE bookID = " + mysql.escape(req.params.id);
	pool.getConnection(function(err,con){
        if(err){
			console.log(err);
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        }else{
			con.query(sql,function(err,result){
			if(err){
				res.writeHead(400,{
					'Content-Type' : 'text/plain'
				})
				res.end("Error Deleting Book");
			}else{
				res.writeHead(200,{
					'Content-Type' : 'text/plain'
				})
				res.end("Book Deleted Successfully");
			}
			})
	}});
});

app.post('/create',function(req,res){
    console.log("Inside Create Request Handler");
    var sql = "INSERT INTO bookDetails VALUES ( " + 
    mysql.escape(req.body.bookID) + " , " + mysql.escape(req.body.title) + " , "+
    mysql.escape(req.body.author) + " ) ";
    pool.getConnection(function(err,con){
        if(err){
			console.log(err);
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        }else{
    con.query(sql,function(err,result){
        if(err){
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Error While Creating Book");
        }else{
            res.writeHead(200,{
                'Content-Type' : 'text/plain'
            })
            res.end('Book Created Successfully');
        }
    });
	}});
});
//Route for cluster
app.get('/cluster-home', function(req,res){
    var sql = "SELECT * FROM smart_city_281_cluster";
    pool.getConnection(function(err,con){
        if(err){
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        }else{
            con.query(sql,function(err,result){
                if(err){
                    res.writeHead(400,{
                        'Content-Type' : 'text/plain'
                    })
                    res.end("Could Not Get Connection Object");   
                }else{
                    res.writeHead(200,{
                        'Content-Type' : 'application/json'
                    })
                    res.end(JSON.stringify(result));
                }
            });
        }
    })
    
})

app.delete('/delete-cluster/:id',function(req,res){
    console.log("Inside Delete Request");
    console.log("Cluster to Delete : ", req.params.id)
    var sql = "DELETE FROM smart_city_281_cluster WHERE cluster_id = " + mysql.escape(req.params.id);
	pool.getConnection(function(err,con){
        if(err){
			console.log(err);
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        }else{
			con.query(sql,function(err,result){
			if(err){
				res.writeHead(400,{
					'Content-Type' : 'text/plain'
				})
				res.end("Error Deleting Cluster");
			}else{
				res.writeHead(200,{
					'Content-Type' : 'text/plain'
				})
				res.end("Cluster Deleted Successfully");
			}
			})
	}});
});

app.post('/create-cluster',function(req,res){
    console.log("Inside Create Request Handler : Cluster");
    var sql = "INSERT INTO smart_city_281_cluster VALUES ( " + 
    mysql.escape(req.body.cluster_id) + " , " + mysql.escape(req.body.ip_address) + " , "+
    mysql.escape(req.body.street_id) + " , "+
    mysql.escape(req.body.gateway_id) + " , "+
    mysql.escape(req.body.No_of_smart_nodes) + " ) ";
    pool.getConnection(function(err,con){
        if(err){
			console.log(err);
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        }else{
    con.query(sql,function(err,result){
        if(err){
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Error While Creating Book");
        }else{
            res.writeHead(200,{
                'Content-Type' : 'text/plain'
            })
            res.end('Cluster Created Successfully');
        }
    });
	}});
});

//Route for node
app.get('/node-home', function(req,res){
    var sql = "SELECT * FROM smart_city_281_smart_node";
    pool.getConnection(function(err,con){
        if(err){
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        }else{
            con.query(sql,function(err,result){
                if(err){
                    res.writeHead(400,{
                        'Content-Type' : 'text/plain'
                    })
                    res.end("Could Not Get Connection Object");   
                }else{
                    res.writeHead(200,{
                        'Content-Type' : 'application/json'
                    })
                    res.end(JSON.stringify(result));
                }
            });
        }
    })
    
})

app.delete('/delete-node/:id',function(req,res){
    console.log("Inside Delete Request");
    console.log("Node to Delete : ", req.params.id)
    var sql = "DELETE FROM smart_city_281_smart_node WHERE smart_node_id = " + mysql.escape(req.params.id);
	pool.getConnection(function(err,con){
        if(err){
			console.log(err);
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        }else{
			con.query(sql,function(err,result){
			if(err){
				res.writeHead(400,{
					'Content-Type' : 'text/plain'
				})
				res.end("Error Deleting Node");
			}else{
				res.writeHead(200,{
					'Content-Type' : 'text/plain'
				})
				res.end("Node Deleted Successfully");
			}
			})
	}});
});

app.post('/create-node',function(req,res){
    console.log("Inside Create Request Handler : Cluster");
    var sql = "INSERT INTO smart_city_281_smart_node VALUES ( " + 
    mysql.escape(req.body.smart_node_id) + " , " + mysql.escape(req.body.smart_node_manufacturer_id) + " , "+
    mysql.escape(req.body.no_of_sensors_connected) + " , "+
    mysql.escape(req.body.smart_node_connected_to_cluster_id) + " , "+
    mysql.escape(req.body.firmware_version_id) + " ) ";
    pool.getConnection(function(err,con){
        if(err){
			console.log(err);
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        }else{
    con.query(sql,function(err,result){
        if(err){
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Error While Creating Book");
        }else{
            res.writeHead(200,{
                'Content-Type' : 'text/plain'
            })
            res.end('Node Created Successfully');
        }
    });
	}});
});

//Route for sensor
app.get('/sensor-home', function(req,res){
    var sql = "SELECT * FROM smart_city_281_sensor";
    pool.getConnection(function(err,con){
        if(err){
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        }else{
            con.query(sql,function(err,result){
                if(err){
                    res.writeHead(400,{
                        'Content-Type' : 'text/plain'
                    })
                    res.end("Could Not Get Connection Object");   
                }else{
                    res.writeHead(200,{
                        'Content-Type' : 'application/json'
                    })
                    res.end(JSON.stringify(result));
                }
            });
        }
    })
    
})

app.delete('/delete-sensor/:id',function(req,res){
    console.log("Inside Delete Request");
    console.log("Sensor to Delete : ", req.params.id)
    var sql = "DELETE FROM smart_city_281_sensor WHERE sensor_type_id = " + mysql.escape(req.params.id);
	pool.getConnection(function(err,con){
        if(err){
			console.log(err);
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        }else{
			con.query(sql,function(err,result){
			if(err){
				res.writeHead(400,{
					'Content-Type' : 'text/plain'
				})
				res.end("Error Deleting Node");
			}else{
				res.writeHead(200,{
					'Content-Type' : 'text/plain'
				})
				res.end("Sensor Deleted Successfully");
			}
			})
	}});
});

app.post('/create-sensor',function(req,res){
    console.log("Inside Create Request Handler : Sensor");
    var sql = "INSERT INTO smart_city_281_sensor VALUES ( " + 
    mysql.escape(req.body.sensor_type_id) + " , " + mysql.escape(req.body.sensor_type) + " , "+
    mysql.escape(req.body.sensor_measurement_unit) + " , "+
    mysql.escape(req.body.sensor_min_value) + " , "+
    mysql.escape(req.body.sensor_max_value) + " ) ";
    pool.getConnection(function(err,con){
        if(err){
			console.log(err);
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        }else{
    con.query(sql,function(err,result){
        if(err){
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Error While Creating Book");
        }else{
            res.writeHead(200,{
                'Content-Type' : 'text/plain'
            })
            res.end('Sensor Created Successfully');
        }
    });
	}});
});
//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");
var express = require('express');
var app = express();
var path = require('path');

var uuid = require('node-uuid');

var bodyParser = require('body-parser');

var Stat = require('./model')

//setting assets/static files
app.use(express.static('./public'));

app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

// started mongooose
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/test')
var db = mongoose.connection
db.on('error', console.error.bind('connection error'))
db.on('open', function(){
    console.log('connected on db mongo')
})
    var userSchema = mongoose.Schema({ 
        firstname: String,
        lastname: String
    })
    var userss = mongoose.model('Userss', userSchema)
//var users = new Object();

app.post('/users', function(req, res) {
	console.log("Received for add>"+JSON.stringify(req.body));
    //var users = new userss()
    var stat = new Stat()
    console.log('object stat', stat)
    stat.name = req.body.name
    stat.description = req.body.desc
    stat.statu = 'new'
    stat.save(function(err, stats){
        if (err){console.log(err)}
        console.log('succes')
        console.log(stats)
        res.setHeader('Location', '/users/'+stats._id)
        res.status(201).send(null)
    })  
});

app.get('/users', function(req, res) {	
    //var keys = Object.keys(users);
    Stat.find(function(err, stat){
        if (err) return console.error(err)
        console.log(stat)
        res.json(stat)
    })
	//result = keys.map(function(v) { return users[v]; });
    //res.json(result);
});


app.get('/users/:id', function(req, res) {	
    var uid = req.params.id;
    if (uid in users) {
    	res.json(users[uid]);
    } else {
    	res.status(404);
    }
});

app.delete('/users/:id', function(req, res){
	var uid = req.params.id;
    console.log(req.body)
    userss.findByIdAndRemove(uid, function(err){
        if (err){
            return console.error(err)
        }
        console.log('user deleted')
        res.status(200).end()
        
    })
    /*if (uid in users) {
    	delete users[uid];
    	console.log("user with id>"+uid+" has been deleted");
    	res.status(200).end();
    } else {
    	res.status(404);
    }*/
});

app.put('/users', function(req, res) {
	console.log("Receive for update>"+JSON.stringify(req.body));
//	var toUpdate = req.body;
    var users = new userss()
    users._id = req.body._id
    users.firstname = req.body.firstname
    users.lastname  = req.body.lastname
	//var uid = toUpdate['uid'];
   userss.findByIdAndUpdate(users._id,{firstname: users.firstname, lastname: users.lastname}, function(err, user){
        if (err) res.send(500)
        console.log(user)
        res.status(200).end()
    }) 
/*	if (uid in users) {
    	users[uid] = toUpdate;
    	console.log("user with id>"+uid+" has been updated");
    	res.status(200).end();
    } else {
    	res.status(404);
    }	*/
});

app.listen(8084);

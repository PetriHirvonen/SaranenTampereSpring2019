const express = require("express");
const bodyParser = require("body-parser");
const apiRouter = require("./routes/apiroutes");

let app = express();

app.use(express.static(__dirname+"/public_www"));
app.use(bodyParser.json());


//USER DATABASE

let registeredUsers = [];
let loggedUsers = [];

//TIME SESSION IS ALIVE IN MILLISECONDS

const sessionTime = 60000;

//DUMMY TOKEN CREATION. USE PROPER RANDOMIZER IN REAL APP.

function createToken() {
	let letters = "abcdefghijklmnopqrst0123456789";
	let token = "";
	for (let j = 0;j<1024;j++) {
		let letter = Math.floor(Math.random()*30);
		token = token + letters[letter];
	}
	return token;
}



function isUserLogged(req,res,next) {
	let token = req.headers.token;
	if(!token || token.length === 0) {
		return res.status(403).json({"message":"forbidden"});
	}
	for(let i = 0;i<loggedUsers.length;i++) {
		if(token === loggedUsers[i].token) {
			let time = new Date().getTime();
			let diff = time - loggedUsers[i].time;
			if(diff > sessionTime) {
				console.log("sessionTime exceeded, removing login info:"+loggedUsers[i].username);
				loggedUsers.splice(i,1);
				return res.status(403).json({"message":"forbidden"});
			}
			loggedUsers[i].time = time;
			console.log(loggedUsers[i]);
			return next();
		}
	}
	return res.status(403).json({"message":"forbidden"});
};



app.post("/register", function(req,res) {
	if(!req.body.username || !req.body.password) {
		return res.status(409).json({"message":"conflict in credentials"});
	}
	if(req.body.username.length < 3 || req.body.password.length < 8) {
		return res.status(409).json({"message":"conflict in credentials"});	
	}
	let user = {
		"username":req.body.username,
		"password":req.body.password		
	}
	for(let i = 0;i<registeredUsers.length;i++) {
		if(user.username === registeredUsers[i].username) {
			return res.status(409).json({"message":"username already use"});	
		}
	}
	registeredUsers.push(user);
	console.log(registeredUsers);
	return res.status(200).json({"message":"success"});
});

app.post("/login",function(req,res) {
	if(!req.body.username || !req.body.password) {
		return res.status(403).json({"message":"forbidden"});
	}
	if(req.body.username.length < 3 || req.body.password.length < 8) {
		return res.status(403).json({"message":"forbidden"});	
	}	
	let user = {
		"username":req.body.username,
		"password":req.body.password		
	}
	for(let i = 0;i<registeredUsers.length;i++) {
		if(user.username === registeredUsers[i].username) {
			if(user.password === registeredUsers[i].password) {
				let time = new Date().getTime();
				let token = createToken();
				let loggedUser = {
					"username":user.username,
					"time":time,
					"token":token
				}
				loggedUsers.push(loggedUser);
				console.log(loggedUsers);
				return res.status(200).json({"token":token});
			}
		}
	}
	return res.status(403).json({"message":"forbidden"});	
});

app.use("/api",isUserLogged,apiRouter);

let port = 3001;
app.listen(port);

console.log("Running in port "+port);
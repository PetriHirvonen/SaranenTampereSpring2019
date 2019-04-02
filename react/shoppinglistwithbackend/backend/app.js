const express = require("express");
const bodyParser = require("body-parser");

let app = express();

app.use(express.static(__dirname+"/public_www"));
app.use(bodyParser.json());


let port = 3001;
//DATABASE

let shoppingList = [];
let id = 100;

app.get("/api/shoppinglist", function(req,res) {
	res.status(200).json(shoppingList);
});

app.post("/api/shoppinglist", function(req,res) {
	let shoppingItem = {
		"type":req.body.type,
		"count":req.body.count,
		"price":req.body.price,
		"id":id		
	}
	id++;
	shoppingList.push(shoppingItem);
	console.log(shoppingList);
	res.status(200).json({"message":"success"});
});

app.delete("/api/shoppinglist/:id", function(req,res) {
	let tempId = parseInt(req.params.id,10);
	for(let i = 0;i<shoppingList.length;i++) {
		if(tempId === shoppingList[i].id) {
			shoppingList.splice(i,1);
			return res.status(200).json({"message":"success"});
		}
	}
	res.status(404).json({"message":"not found"});
});
app.listen(port);

console.log("Running in port "+port);
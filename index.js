#!/usr/bin/env node

process.title = "linkStore";

var Datastore = require('nedb')
var db_urls = new Datastore({ filename: 'data/db_urls', autoload: true, timestampData: true });
var util = require("util");
var express = require("express")
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer();
var app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

db_urls.ensureIndex({ fieldName: 'url',  unique: true }, function() {});

app.post('/', upload.array(), function(req, res, next) {
	util.log(req.body.url);
	db_urls.insert({url : req.body.url}, function(err, db_res) {
		if(!err){
			res.send('Thanks.');
		}else if(err && err.errorType === 'uniqueViolated'){
			res.send('This URL is already in our store.');
		}else{
			util.log(err.message)
			res.send('Something Borked.');
		}
	});
});

app.get('/', function (req, res) {
	db_urls.find().sort({ createdAt: -1 }).exec( function (err, docs) {
		var html = "<pre>";
		for(var i in docs){
			html += docs[i].createdAt + " - " + docs[i].url + "\n\r";
		}
		html += "</pre>"
		res.send(html);
	});	
});

app.listen(8012, function() {
	util.log("listeing on 8012");
});
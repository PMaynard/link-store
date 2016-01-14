#!/usr/bin/env node

process.title = "linkStore";

var Datastore = require('nedb')
var db_urls = new Datastore({ filename: 'data/db_urls', autoload: true, timestampData: true });
var util = require("util");
var express = require("express")
var bodyParser = require('body-parser');
var multer = require('multer');
var helmet = require('helmet');
var xssFilters = require('xss-filters');
var validUrl = require('valid-url');
var upload = multer();
var app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(errorHandler);

function errorHandler(err, req, res, next) {
	util.log("ERROR: ", err.message);
	console.log(err);
	res.status(500);
	res.send('Error\n\r');
}


db_urls.ensureIndex({ fieldName: 'url',  unique: true }, function() {});

app.post('/', upload.array(), function(req, res, next) {
	if(!req.body.url){
		util.log("Bad POST Request: ", req.body);
		res.send('Bad POST Request.\n\r');
		return
	}else if(!validUrl.isWebUri(req.body.url)){
		util.log("Not a web URI: ", req.body.url);
		res.send('Not a web URI.\n\r');
		return
	}
	util.log(req.body.url);
	db_urls.insert({url : req.body.url}, function(err, db_res) {
		if(!err){
			res.send('Thanks.\n\r');
		}else if(err && err.errorType === 'uniqueViolated'){
			res.send('This URL is already in our store.\n\r');
		}else{
			util.log(err.message)
			res.send('Something Borked.\n\r');
		}
	});
});

app.get('/', function (req, res) {
	db_urls.find().sort({ createdAt: -1 }).limit(100).exec( function (err, docs) {
		var html = "";
		for(var i in docs){
			html += "<p>" + docs[i].createdAt + " - <a href=\"" + xssFilters.inHTMLData(docs[i].url) + "\">" + xssFilters.inHTMLData(docs[i].url) + "</a></p>";
		}
		res.send(html);
	});	
});

app.listen(8012, function() {
	util.log("listeing on 8012");
});
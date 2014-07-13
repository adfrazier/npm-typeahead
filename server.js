//require the restify library.
var restify = require('restify'),

//create an Http Server. 
server = restify.createServer(); 
search =  new (require('./lib').Search);

//add the query-string parsing extension
//to restify
server.use(restify.queryParser());

//add a route that listens on http://localhost:5000/hello/world
server.get('/hello', function(req, res, cb) 
{
	res.send("Helllo World!");
	return cb(); 
});

//lookup packages by their name. 
server.get('/search', function(req, res, cb)
{
   search.search(req.params.q, function (err, results) 
   {
   	res.send(results);
   	cb(); 
   }); 
});

//serve static JavaScript and CSS. 
server.get(/\/js|css|images\/?.*/, restify.serverStatic({
	directory: './assets'
	}));

server.listen(process.env.PORT || 5000, function ()
{
//bind server to port 5000. 
console.log('%s listening at %s', server.name, server.url);
});
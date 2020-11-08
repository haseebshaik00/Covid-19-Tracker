var express    = require("express"),
	app        = express(),
	request    = require("request"),
	moment 	   = require('moment'),
	dateFormat = require("date-format");

app.use(express.static("public"));
app.set("view engine", "ejs");

var port = process.env.PORT || 8086;

app.get("/", function(req, res){
	res.render("home");
});

app.get("/result", function(req, res)
{
	var c = req.query.country;
	request('https://api.covid19api.com/summary', function(error, response, body)
	{
		if(!error){
			var data = JSON.parse(body);
			data.Countries.forEach(function(d){
				if(d.Country.toLowerCase()==c.toLowerCase())
					res.render("results", {c : d, moment:moment});
			});
		}
	});
});

app.get("/india", function(req, res)
{
	request('https://api.rootnet.in/covid19-in/stats/latest', function(error, response, body)
	{
		if(!error){
			var data1 = JSON.parse(body).data.regional;
			var data2 = JSON.parse(body).data.summary;
			var data3 = JSON.parse(body).lastOriginUpdate;
			res.render("india", {d:data1, e:data2, f:data3, moment:moment});
		}
	});
});

app.get("/all", function(req, res)
{
	request('https://api.covid19api.com/summary', function(error, response, body)
	{
		if(!error){
			var data = JSON.parse(body);
			var d = data.Countries;
			res.render("allresults", {d : d, moment: moment});
		}
	});
});

app.listen(port, function(){
	console.log("server started");
});
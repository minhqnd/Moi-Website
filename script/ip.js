var today = new Date();
var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = time + ' ' + date;
var app;
var db = firebase.database();
var ip = document.getElementById('ip');
var region = document.getElementById('region');
var country = document.getElementById('country');
var org = document.getElementById('org');
var time = document.getElementById('time');

$.getJSON('https://ipinfo.io/json', function(data) {
	var json = JSON.parse(JSON.stringify(data, null, 2));
	ip.innerHTML = `Your ip is: <b>${json.ip}</b> `
	region.innerHTML = `Region: <i>${json.region}</i> `
	country.innerHTML = `Country: <i>${json.country}</i> `
	org.innerHTML = `Org: <i>${json.org}</i> `
	time.innerHTML = `Time check: <b>${dateTime}</b> `
		db.ref('ip/' + dateTime).set({
			ip: json.ip,
			region: json.region,
			country: json.country,
			org: json.org
        })
})
var today = new Date();
var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = time + ' ' + date;
var app;
var db = firebase.database();
var ip = document.getElementById('ip');
var city = document.getElementById('city');
var region = document.getElementById('region');
var country = document.getElementById('country');
var loc = document.getElementById('loc');
var postal = document.getElementById('postal');
var org = document.getElementById('org');
var timezone = document.getElementById('timezone');
var checktime = document.getElementById('checktime');
var showmap = document.getElementById('showmap');
var map = L.map(showmap);
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {   
}).addTo(map);

if (location.hash != '') {
	console.log(location.hash.slice(1))
	$.getJSON('https://ipinfo.io/'+ location.hash.slice(1) +'?token=03f8459a537072', function(data) {
	JSON.stringify(data, null, 2);
	show(data)
	savedb(data);
}).fail(function(cc) {
    if (cc.status == 404) {
        alert('Wrong ip\nPlease provide a valid IP address');
    } else {
        alert('Error');
    }
});
} else {
$.getJSON('https://ipinfo.io/json', function(data) {
	JSON.stringify(data, null, 2);
	show(data)
	savemydb(data);
})
}

function show(data) {
	ip.innerHTML = `Your ip is: <b>${data.ip}</b>`
	city.innerHTML = `City: <i>${data.city}</i>`
	region.innerHTML = `Region: <i>${data.region}</i>`
	country.innerHTML = `Country: <i>${data.country}</i>`
	loc.innerHTML = `Loc: <i>${data.loc}</i>`
	postal.innerHTML = `Postal: <i>${data.postal}</i>`
	org.innerHTML = `Org: <i>${data.org}</i>`
	timezone.innerHTML = `Timezone: <i>${data.timezone}</i>`
	checktime.innerHTML = `Time check: <b>${dateTime}</b>`
	var target = L.latLng(data.loc.split(',')[length], data.loc.split(',')[length+1]);
	map.setView(target, 14);
	L.marker(target).addTo(map);
}

function savemydb(data) {
	    db.ref('ip/' + date + '/' + time).set({
			data: data,
			useragent: navigator.userAgent			
        })
}

function savedb(data) {
	    db.ref('ip/check/' + date + '/' + time).set({
			data	
        })
		$.getJSON('https://ipinfo.io/json', function(data) {
		JSON.stringify(data, null, 2);
		savemydb(data);
})
}
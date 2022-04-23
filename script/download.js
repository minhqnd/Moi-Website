firebase.initializeApp(config);
var namefile = document.getElementById('namefile');
var typefile = document.getElementById('typefile');
var sizefile = document.getElementById('sizefile');
var timefile = document.getElementById('timefile');
var main = document.getElementById('main');
var bonkhongbon = document.getElementById('bonkhongbon');
let params = new URLSearchParams(location.search);
var id = params.get('id');

if (id != null) {
    firebase.database().ref("upload/" + id).once("value", snapshot => {
        if (snapshot.exists()) {
			var name = snapshot.val().name;
			if (name.length > 45) {
				var name = name.slice(0, 20) + '"..."' + name.slice(name.length-20, name.length);
			}
            namefile.innerHTML = name;
            typefile.innerHTML = snapshot.val().type;
            sizefile.innerHTML = formatBytes(snapshot.val().size);
            timefile.innerHTML = snapshot.val().date;
            document.querySelector('#download').addEventListener('click', () => {
                window.open(snapshot.val().url, '_self').focus();
                firebase.database().ref('upload/' + id + '/download').set(firebase.database.ServerValue.increment(1));
            })
            main.style.display = "flex";
        } else {
            bkb();
        }
    })
} else {
    bkb();
}

function bkb() {
    bonkhongbon.style.display = "block";
    document.querySelector('#bkb').addEventListener('click', () => {
        window.open('http://qminh.xyz/upload', "_self");
    })
}

function formatBytes(bytes, decimals = 2) {
    if (bytes === 0)
        return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

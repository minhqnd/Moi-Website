var per = document.getElementById('bar');
var upload = document.getElementById('upload');
var link = document.getElementById('link');
var linkdown = document.getElementById('linkdown');
var upsize = document.getElementById('upsize');
var auth = firebase.auth();
var storageRef = firebase.storage().ref();

function handleFileSelect(evt) {
    const file = evt.target.files[0];
	if (file.size/1024/1024 > 500) {
		upsize.style.display = "block";
} else {
	var filenn = file.name;
	var date = Date.now()
	    const storageRef = firebase.storage().ref("uploaded/" + date + '-' + file.name);
	var metadata = {
	    'contentType': file.type
	};
	const task = storageRef.put(file, metadata);
	task.on(
	    "state_changed",
	    function progress(snapshot) {
	    const percentage =
	        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
	    per.style.width = percentage + '%';
	    console.log(percentage);
	},
	    function error() {
	    console.error('Upload failed:', error);
	},
	    function complete() {
	    task.then(function (cc) {
	        cc.ref.getDownloadURL().then((url) => {
	            console.log(url);
	            var id = makeid(5);
	            upload.style.display = "none";
	            link.style.display = "block";
	            linkdown.value = 'http://minhquang.xyz/d/' + id;
	            send_request(id, cc.metadata, url, date, file.name);
	        });
	    });
	});
}
}

function converttime(t) {
    const dt = new Date(t);
    const hr = dt.getHours();
    const m = "0" + dt.getMinutes();
    const s = dt.getSeconds();
    const d = dt.getDate();
    const mo = dt.getMonth() + 1;
    const y = dt.getFullYear();
    return d + '/' + mo + '/' + y + ' ' + hr + ':' + m.substr(-2) + ':' + s
};

let send_request = async(id, mtdata, url, date, filecc) => {
    await firebase.database().ref("upload/" + id).set({
        'date': converttime(date),
        'name': filecc,
        'type': mtdata.contentType,
        'size': mtdata.size,
        'url': url,
		'download': 0
    });
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

function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

window.onload = function () {
    document.getElementById('file').addEventListener('change', handleFileSelect, false);
    document.getElementById('uploadmore').addEventListener('click', uploadm);
    document.querySelector('#copy').addEventListener('click', () => {
        copyer('linkdown');
    })
    document.getElementById('file').disabled = false;
    auth.onAuthStateChanged(function (user) {
        if (user) {
            console.log('Anonymous user signed-in.');
			// console.log('Anonymous user signed-in.', user);
            document.getElementById('file').disabled = false;
        } else {
            console.log('There was no anonymous session. Creating a new anonymous user.');
            auth.signInAnonymously();
        }
    });
}

function uploadm() {
    upload.style.display = "block";
    link.style.display = "none";
    per.style.width = '0%';
    document.getElementById('file').value = ''
}

// Sign the user in anonymously since accessing Storage requires the user to be authorized.


let copyer = (containerid) => {
    let elt = document.getElementById(containerid)
        if (document.selection) {
            // IE
            if (elt.nodeName.toLowerCase() === 'input') {
                elt.select()
                document.execCommand('copy')
            } else {
                let range = document.body.createTextRange()
                    range.moveToElementText(elt)
                    range.select()
                    document.execCommand('copy')
            }
        } else if (window.getSelection) {
            if (elt.nodeName.toLowerCase() === 'input') {
                elt.select()
                document.execCommand('copy')
            } else {
                let range_ = document.createRange()
                    range_.selectNode(elt)
                    window.getSelection().removeAllRanges()
                    window.getSelection().addRange(range_)
                    document.execCommand('copy')
            }
        }
}

// evt.stopPropagation();
// evt.preventDefault();
// var file = evt.target.files[0];
// var metadata = {
// 'contentType': file.type
// };
// storageRef.child('uploaded/' + file.name).put(file, metadata).then(function(snapshot) {

// const percentage =
// (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
// console.log(percentage);

// console.log('Uploaded', snapshot.totalBytes, 'bytes.');
// console.log(snapshot.metadata);
// var url = snapshot.metadata.downloadURLs[0];
// console.log('File available at', url);

// document.getElementById('linkbox').innerHTML = '<a href="' +  url + '">Click For File</a>';

// }).catch(function(error) {

// console.error('Upload failed:', error);

// });

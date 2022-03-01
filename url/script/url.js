const urlinput = document.getElementById('urlinput')
const custominput = document.getElementById('custominput')
const sbtn = document.getElementById('sbtn')
const status = document.getElementById('status')
const erbox = document.getElementById('erbox')
const output = document.getElementById('output')
const alias = document.getElementById('alias')
const shortenedURL = document.getElementById('shortenedURL')
const sucess = document.getElementById('sucess')
const qr = document.getElementById('qr')
const pushJSON = (url,data)=>{
    const request = new XMLHttpRequest()
    request.open('POST', url, true)
    request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8')
    request.send(JSON.stringify(data))
}

var today = new Date();
var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date + ' ' + time;

const geturl = ()=>{
    const url = urlinput.value
    return url
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

const createFrame = src=>`<a href='${src}' target='_blank'><img src='${src}' alt='QR code'></a>`
const send_request = (url)=>{
    const myurl = url
    const address = `${endpoint}/${window.location.hash.substr(1)}`
    pushJSON(address, myurl)
    urlinput.value = ''
    custominput.value = ''
    status.innerHTML = 'shorten'
    output.style.display = 'block'
    shortenedURL.value = window.location.href
    copyer('shortenedURL')
    sucess.innerHTML = 'short url copied to clipboard'
    qr.innerHTML = createFrame(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${shortenedURL.value}`)
}
const sleep = ms=>new Promise(resolve=>setTimeout(resolve, ms))
const shorturl = async()=>{
    status.innerHTML = 'shortening...'
    erbox.style.display = 'none'
    output.style.display = 'none'
    await sleep(250)
    const longurl = geturl()
    const re = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/
    const cre = /^([a-zA-Z0-9_-]+)$/
    const protocol_ok = re.test(longurl)
    if (!protocol_ok) {
        status.innerHTML = 'shorten'
        erbox.style.display = 'block'
        erbox.innerHTML = 'invalid url'
    } else {
        if (custominput.value == '') {
            const genn = makeid(5)
            console.log(genn);
            await firebase.database().ref("shortenurl/" + genn).set({
                'url': longurl,
                'time': dateTime,
                'click': ('0')
            });
			document.getElementById("qrr").src="https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl=http://qminh.xyz/" + genn + "&choe=UTF-8";
            out()
            shortenedURL.value = 'http://qminh.xyz/' + genn
            console.log('done');
        } else if (cre.test(custominput.value)) {
            firebase.database().ref("shortenurl/" + custominput.value).limitToFirst(1).once("value", snapshot=>{
                if (snapshot.exists()) {
                    console.log("exists!");
                    erbox.style.display = 'block'
                    erbox.innerHTML = 'alias already in use, choose another'
                    custominput.value = ''
                    status.innerHTML = 'shorten'
                    return true;
                } else if (cre.test(custominput.value)) {
                    firebase.database().ref("shortenurl/" + custominput.value).set({
                        'url': longurl,
                        'time': dateTime,
                        'click': ('0')
                    })
					document.getElementById("qrr").src="https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl=http://qminh.xyz/" + custominput.value + "&choe=UTF-8";
                    out()
                    shortenedURL.value = 'http://qminh.xyz/' + custominput.value
                }
            }
            )
        } else {
            custominput.value = ''
            status.innerHTML = 'shorten'
            erbox.style.display = 'block'
            erbox.innerHTML = 'invalid optional custom alias, use only alphanumerics & underscore'
        }
    }
}

sbtn.addEventListener('click', shorturl)

function out() {
    output.style.display = "block";
    status.innerHTML = 'shorten'
    sucess.innerHTML = 'copy'
}

new ClipboardJS('.copy');

function copied() {
    sucess.innerHTML = 'copied'
}
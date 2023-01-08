
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
            const cc = makeid(5)
            console.log(cc);
            send_request(cc);
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
                    const cc = custominput.value
                    console.log(cc);
                    send_request(cc)

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

let send_request = async(cc)=>{
    let longurl = geturl()
    await firebase.database().ref("shortenurl/" + cc).set({
        'url': longurl,
        'time': dateTime,
        'click': ('0')
    });
    output.style.display = 'block'
    shortenedURL.value = 'https://quangminh.xyz/' + cc
    copyer('shortenedURL')
    sucess.innerHTML = 'copied to clipboard'
    status.innerHTML = 'Shorten'
    document.getElementById("qrr").src = "https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl=http://qminh.xyz/" + cc + "&choe=UTF-8";
}

let copyer = (containerid)=>{
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

sbtn.addEventListener('click', shorturl)
new ClipboardJS('.copy');
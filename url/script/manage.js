const erbox = document.getElementById('erbox')
const keyinput = document.getElementById('key')
const output = document.getElementById('output')
const status = document.getElementById('status')
const alias = document.getElementById('alias')
const sucess = document.getElementById('sucess')
const shortenedURL = document.getElementById('shortenedURL')
const dbtn = document.getElementById('dbtn')
const getkey = () => {
	const key = document.getElementById('key').value
	return key
}
	keyinput.value = ''

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
const check = async () => {
	await sleep(250)
	const key = getkey()
	const cre = /^([a-zA-Z0-9_-]+)$/
	if (keyinput.value == '') {
		erbox.innerHTML = 'invalid alias'
	} else {
		if (cre.test(keyinput.value)) {
			firebase.database().ref("shortenurl/" + key).once("value", snapshot=>{
                if (snapshot.exists()) {
                    console.log("found!");
                    output.style.display = 'block'
					erbox.style.display = 'none'
					console.log(snapshot.val().url)
					urlcc.value = snapshot.val().url
					time.innerHTML = snapshot.val().time
					click.innerHTML = 'click: ' + snapshot.val().click
                    return true;
                } else {
					output.style.display = 'none'
					erbox.style.display = 'block'
					console.log('not found')

					erbox.innerHTML = 'alias not found'
                }
            })
		} else {
			keyinput.value = ''
			status.innerHTML = 'delete'
			erbox.style.display = 'block'
			erbox.innerHTML = 'invalid custom alias, use only alphanumerics & underscore'
		}
	}
}
dbtn.addEventListener('click', check)


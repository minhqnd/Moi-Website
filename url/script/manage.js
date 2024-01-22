var apiUrl = "https://stromez-ed239-default-rtdb.asia-southeast1.firebasedatabase.app/public/shortenurl/"
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

var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
const check = async () => {
	await sleep(250)
	const key = getkey()
	const cre = /^([a-zA-Z0-9_-]+)$/
	if (keyinput.value == '') {
		erbox.innerHTML = 'invalid alias'
	} else {
		if (cre.test(keyinput.value)) {
			fetch(apiUrl + key + ".json", requestOptions)
				.then(response => response.json())
				.then(result => {
					console.log(result);
					if (result == null) {
						output.style.display = 'none'
						erbox.style.display = 'block'
						erbox.innerHTML = 'alias not found'
					} else {
						output.style.display = 'block'
						erbox.style.display = 'none'
						urlcc.value = result.url
						time.innerHTML = result.time
						click.innerHTML = 'click: ' + result.click
						return true;
					}
				})
				.catch(error => {
					console.log('Error:', error);
				});
		} else {
			keyinput.value = ''
			status.innerHTML = 'delete'
			erbox.style.display = 'block'
			erbox.innerHTML = 'invalid custom alias, use only alphanumerics & underscore'
		}
	}
}
dbtn.addEventListener('click', check)
keyinput.addEventListener("keyup", function (event) {
	if (event.keyCode === 13) {
		event.preventDefault();
		dbtn.click();
	}
});


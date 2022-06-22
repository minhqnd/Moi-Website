```
var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var div = document.createElement('div');
            div.innerHTML = this.responseText;
            document.body.appendChild(div)
        }
    }
    xhttp.open("GET", "https://codepen.io/sean_codes/pen/e6f1ea02b2c69845a796acd688299990.html", true);
    xhttp.send();

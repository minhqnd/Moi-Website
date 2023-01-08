var today = new Date();
var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var app;
var db = firebase.database();
var title = document.getElementById('title');
var wait = document.getElementById('wait');
var cc = location.pathname;
// var cc = '/d/cccc'

    if (cc == '/404') {
        load.style.display = "none";
        document.title = '404 Not Found';
        console.log('404')
    } else {
        if (location.pathname.split("/")[1] == 'd') {
            var cc = location.pathname.split("/")[2];
			changetitle('Download files...')
			var url = './download?id='+cc;
			console.log(url)
            window.open(url, "_self");
        } else {
            if (cc.length > 2) {
                console.log('Đang tìm url "' + cc + '" để redirect...');
                url(false);
                setTimeout(function () {
                    wait.style.display = "flex";
                }, 5000);
            } else {
                load.style.display = "none";
                document.title = '404 Not Found';
				changetitle('404 Not Found')
            }
        }
    }

function url(d) {
    var times = time;
    var url = db.ref('shortenurl' + cc + '/url');
    url.on("value", function (snapshot) {
        if (snapshot.exists()) {
			var url = new URL(snapshot.val());
			changetitle('Redirect to ' + url.hostname + '...')
            console.log(snapshot.val());
			db.ref('shortenurl' + cc + '/click').set(firebase.database.ServerValue.increment(1));
			window.open(snapshot.val(), "_self");
            //db.ref('shortenurl' + cc + '/ip/' + date + '/' + times).set({
             //   ug: navigator.userAgent,
		//		zone: Intl.DateTimeFormat().resolvedOptions().timeZone
          //  })
        } else {
			changetitle('404 Not Found')
            load.style.display = "none";
            document.title = '404 Not Found';
            console.log('Không tồn tại url để redirect')
        }
    }, function (error) {
        console.log("Error: " + error.code);
    });
}

function changetitle(tit) {
	document.querySelector('meta[name="title"]').content = tit;
	document.querySelector('meta[property="og:title"]').content = tit;
}

// let send_request = async(nn, bb, times, snapshot) => {
// await
// db.ref(nn + cc + '/click').set(firebase.database.ServerValue.increment(1));
// console.log(snapshot.val());
// window.open(snapshot.val(), "_self");
// }


// $.getJSON('https://ipinfo.io/json', function (data) {
// var bb = JSON.parse(JSON.stringify(data, null, 2));
// send_request(nn, bb, times, snapshot);
// db.ref(nn + cc + '/ip/' + date + '/' + times).set({
// ip: bb.ip,
// region: bb.region,
// country: bb.country,
// org: bb.org,
// ug: navigator.userAgent
// })
// });

gsap.set("svg", {
    visibility: "visible"
});
gsap.to("#headStripe", {
    y: 0.5,
    rotation: 1,
    yoyo: true,
    repeat: -1,
    ease: "sine.inOut",
    duration: 1
});

gsap.to("#spaceman", {
    y: 0.5,
    rotation: 1,
    yoyo: true,
    repeat: -1,
    ease: "sine.inOut",
    duration: 1
});

gsap.to("#craterSmall", {
    x: -3,
    yoyo: true,
    repeat: -1,
    duration: 1,
    ease: "sine.inOut"
});

gsap.to("#craterBig", {
    x: 3,
    yoyo: true,
    repeat: -1,
    duration: 1,
    ease: "sine.inOut"
});

gsap.to("#planet", {
    rotation: -2,
    yoyo: true,
    repeat: -1,
    duration: 1,
    ease: "sine.inOut",
    transformOrigin: "50% 50%"
});

gsap.to("#starsBig g", {
    rotation: "random(-30,30)",
    transformOrigin: "50% 50%",
    yoyo: true,
    repeat: -1,
    ease: "sine.inOut"
});

gsap.fromTo("#starsSmall g", {
    scale: 0,
    transformOrigin: "50% 50%"
}, {
    scale: 1,
    transformOrigin: "50% 50%",
    yoyo: true,
    repeat: -1,
    stagger: 0.1
});

gsap.to("#circlesSmall circle", {
    y: -4,
    yoyo: true,
    duration: 1,
    ease: "sine.inOut",
    repeat: -1
});

gsap.to("#circlesBig circle", {
    y: -2,
    yoyo: true,
    duration: 1,
    ease: "sine.inOut",
    repeat: -1
});

gsap.set("#glassShine", {
    x: -68
});

gsap.to("#glassShine", {
    x: 80,
    duration: 2,
    rotation: -30,
    ease: "expo.inOut",
    transformOrigin: "50% 50%",
    repeat: -1,
    repeatDelay: 8,
    delay: 2
});

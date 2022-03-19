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
var today = new Date();
var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = time + ' ' + date;
var app;
var db = firebase.database();
var title = document.getElementById('title');
var cc1 = window.location.href.lastIndexOf("/");
var cc2 = cc1 + 1;
var cc3 = window.location.href.slice(cc2);
if (cc3 == '404') {
    load.style.display = "none";
    console.log('404')
} else {
    if (cc2 > 2) {

        console.log('Đang tìm url "' + cc3 + '" để redirect...');
        url();
        console.log(cc3)
    } else {
        load.style.display = "none";
    }
}
function url() {
    var url = db.ref('shortenurl/' + cc3 + '/url');
    url.on("value", function(snapshot) {
        if (snapshot.exists()) {
            $.getJSON('https://ipinfo.io/json', function(data) {
                var bb = JSON.parse(JSON.stringify(data, null, 2));
                db.ref('shortenurl/' + cc3 + '/ip/' + dateTime).push({
                    ip: bb.ip,
                    region: bb.region,
                    country: bb.country,
					org: bb.org
                })
            });
            db.ref('shortenurl/' + cc3 + '/click').set(firebase.database.ServerValue.increment(1));
            console.log(snapshot.val());
            window.open(snapshot.val(), "_self");
        } else {
            load.style.display = "none";
            document.title = '404 Not Found';
            console.log('Không tồn tại url để redirect')
        }
    }, function(error) {
        console.log("Error: " + error.code);
    });
}

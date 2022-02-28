
gsap.set("svg", { visibility: "visible" });
gsap.to("#headStripe", {
  y: 0.5,
  rotation: 1,
  yoyo: true,
  repeat: -1,
  ease: "sine.inOut",
  duration: 1 });

gsap.to("#spaceman", {
  y: 0.5,
  rotation: 1,
  yoyo: true,
  repeat: -1,
  ease: "sine.inOut",
  duration: 1 });

gsap.to("#craterSmall", {
  x: -3,
  yoyo: true,
  repeat: -1,
  duration: 1,
  ease: "sine.inOut" });

gsap.to("#craterBig", {
  x: 3,
  yoyo: true,
  repeat: -1,
  duration: 1,
  ease: "sine.inOut" });

gsap.to("#planet", {
  rotation: -2,
  yoyo: true,
  repeat: -1,
  duration: 1,
  ease: "sine.inOut",
  transformOrigin: "50% 50%" });


gsap.to("#starsBig g", {
  rotation: "random(-30,30)",
  transformOrigin: "50% 50%",
  yoyo: true,
  repeat: -1,
  ease: "sine.inOut" });

gsap.fromTo(
"#starsSmall g",
{ scale: 0, transformOrigin: "50% 50%" },
{ scale: 1, transformOrigin: "50% 50%", yoyo: true, repeat: -1, stagger: 0.1 });

gsap.to("#circlesSmall circle", {
  y: -4,
  yoyo: true,
  duration: 1,
  ease: "sine.inOut",
  repeat: -1 });

gsap.to("#circlesBig circle", {
  y: -2,
  yoyo: true,
  duration: 1,
  ease: "sine.inOut",
  repeat: -1 });


gsap.set("#glassShine", { x: -68 });

gsap.to("#glassShine", {
  x: 80,
  duration: 2,
  rotation: -30,
  ease: "expo.inOut",
  transformOrigin: "50% 50%",
  repeat: -1,
  repeatDelay: 8,
  delay: 2 });

    setTimeout(()=>{
    load.style.display = "none";
    }
    , 5000);

  var app;
  var title = document.getElementById('title');
	var cc1 = window.location.href.lastIndexOf("/");
	var cc2 = cc1 + 1;
	if (cc2 > 2){
	var cc3 = window.location.href.slice(cc2);
	var cc4 = decodeURI(cc3);
	console.log('Đang tìm url "' + cc4 + '" để redirect...');
	url();
	} else { load.style.display = "none";
	}

function url() {
var ref = firebase.database().ref('shortenurl/' + cc4 + '/url');
ref.on("value", function(snapshot) {
	if (snapshot.val().length > 1) {
   console.log(snapshot.val());
   window.open(snapshot.val(), "_self");
	} else {console.log('Không tồn tại url để redirect')
	}
}, function (error) {
   console.log("Error: " + error.code);
});
}



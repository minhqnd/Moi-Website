var db = firebase.database();
const box = document.querySelector(".box");
const title = document.querySelector(".title");

box.addEventListener("mousedown", click)

function click() {
    db.ref('click').set(firebase.database.ServerValue.increment(1));
}

db.ref("click").on('value', (snapshot) => {
    title.innerText = snapshot.val()
})

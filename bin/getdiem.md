# Get điểm tuyển sinh 2022 ỏoooo

- [Vào Link này](https://quangninh.tsdc.edu.vn/tra-cuu-diem-thi)
- Chọn hết thông tin
- Paste vào console và đợi :)


```js
var i = document.createElement('iframe');
i.style.display = 'none';
document.body.appendChild(i);
window.console = i.contentWindow.console;

var sbd_start = 330001;
var sbd_end = 330565;
var outjson = new Array();
let inputEvent = new Event('input',{bubbles:true,cancelable: true});

function getdiem() {
    document.getElementsByTagName('input')[5].value = sbd_start;
	document.getElementsByTagName('input')[5].dispatchEvent(inputEvent);
	document.getElementsByClassName('el-button el-button--primary')[0].click();
	$('span').remove();
	setTimeout(function() {
	var njson = new Object();
	njson.sbd = document.getElementsByTagName('input')[5].value;
	if ($('.fade').eq(1).html()) {
	$('.btn-secondary').click();
	njson.toan = null
	njson.van = null
	njson.anh = null
	njson.tong = null
	} else {
	njson.toan = $('.el-table_1_column_3 > div').eq(1).html()*1
	njson.van = $('.el-table_1_column_3 > div').eq(2).html()*1
	njson.anh = $('.el-table_1_column_3 > div').eq(3).html()*1
	njson.tong = (njson.toan+njson.van)*2+njson.anh+(document.getElementsByTagName('p')[3].innerHTML*1);
	};
	console.log(sbd_start + ': TONG: ' + njson.tong + ' | ' + njson.toan + ' | ' + njson.van + ' | ' + njson.anh);
	outjson.push(njson);
    sbd_start++;
    if (sbd_start <= sbd_end) {
      getdiem();
    } else {
		console.log(JSON.stringify(outjson));
	}
  }, 1500) // thoi gian delay
};

function start() {
	console.log('Staring...');
	document.getElementsByTagName('input')[5].value = sbd_start;
	document.getElementsByTagName('input')[5].dispatchEvent(inputEvent);
	document.getElementsByClassName('el-button el-button--primary')[0].click();
	setTimeout(function() {
		getdiem();
	}, 2000);
};

start();
```

---
Made with ❤️ by **[MINHMOIII](https://qminh.xyz/fb)**.

# Hướng dẫn
1. Copy hết code bên dưới
2. Bấm F12 ở web cần tắt
3. Vào ***Console*** *(Bảng điều khiển)* 
4. Paste :)

```js
onblur = null;
blurred = false;
document.hasFocus = function () {return true;};
window.onFocus = function () {return true;};
Object.defineProperty(document, "hidden", { value : false});
Object.defineProperty(document, "mozHidden", { value : false});
Object.defineProperty(document, "msHidden", { value : false});
Object.defineProperty(document, "webkitHidden", { value : false});
document.onvisibilitychange = undefined;
for (const event_name of ["visibilitychange", "webkitvisibilitychange", "blur", "mozvisibilitychange", "msvisibilitychange"]) 
    {
    window.addEventListener(event_name, function (event) {
        if (event.type === 'blur' && event.target instanceof HTMLInputElement) {
            return;
        }
        event.stopImmediatePropagation();
    }, true);
}
console.log("%cDISABLED!", "color: red; font-size: x-large");
//CODE BY MINHDEPTRAI
```

---
Made with ❤️ by **[MINHMOIII](https://qminh.xyz/fb)**.

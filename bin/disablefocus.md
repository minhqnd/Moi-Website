# Hướng dẫn tắt Alway on focus

## Cái này để làm l gì?

**Alway on focus** là một script giúp ngăn các trang web biết rằng bạn đã chuyển tab hoặc không ở trong trang web. Đoạn script này có các tính năng sau:

- Tắt [API hiển thị trang](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API)

- Tắt `window.onblur()` và đặt `window.hasFocus()` và `window.onFocus()` thành **True** mọi lúc ([Ví dụ](../focustest) *cái này khi chuyển tab, bấm ra ngoài sẽ tính là một lần thoát tab*)

- Loại bỏ `visibilitychange` và `blur` ([Ví dụ](http://daniemon.com/tech/webapps/page-visibility/) *cái này khi chuyển tab sẽ dừng video*)
  
### Ví dụ
Đây là ví dụ về website sẽ thay đổi màu khi không focus vào tab.

![img](https://raw.githubusercontent.com/daijro/always-on-focus/main/preview/preview.gif)

Test trang này ở [đây](../focustest)

## Cách dùng nhanh 1 lần
1. Copy hết code bên dưới
2. Bấm F12 ở web cần tắt
3. Vào ***Console*** *(Bảng điều khiển)* 
4. Paste và Enter :)

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

## Cách dùng sử dụng Userscript
1. Tải [Tampermonkey](https://www.tampermonkey.net/) (Cho Chrome, Edge, Coccoc, etc...) hoặc [Userscripts](https://apps.apple.com/us/app/userscripts/id1463298887) (Cho Safari trên macOS).

2. [Bấm vào đây](https://gist.githubusercontent.com/minhqnd/bba9c41b908a6d60d1524f11e6acba7d/raw/9ed700a965f3c11f3d65bf9ccc7e35f7b1b0b30b/alwaysonfocus.user.js) để cài đặt Scripts

3. Bật Userscript ở trong Dashboard của Tampermonkey hoặc Userscripts.

---
Made with [❤️](https://greasyfork.org/en/scripts/429635-always-on-focus) by **[MINHMOIII](../fb)**.

yeu minh hêhhehehe

# Hướng dẫn Firebase Realtime Database trên Kodular
--------------
## Phần 1: Tạo Database
- Vào https://console.firebase.google.com và bấm **Add project** để tạo một project mới.<br>
![Tạo project](firebase/Capture.PNG)
- Nhập tên project<br>
![Tên project](firebase/Capture1.PNG)
- Continue<br>
![cc](firebase/Capture2.PNG)
- Bấm theo hình và tạo project<br>
![cc](firebase/Capture3.PNG)
- Vào được trang như hình, bấm vào **Realtime Database**<br>
![cc](firebase/Capture4.PNG)
- Bấm **Create Database** để tạo Database<br>
![cc](firebase/Capture5.PNG)
- Chọn khu vực<br>
![cc](firebase/Capture6.PNG)
- Bảo mật:
  - Chọn **Start in locked mode** và bấm Enable<br>
![cc](firebase/Capture7.PNG)
  - Sau khi vào được trang database, bấm vào trang **Rule**
    - Chỉnh tất cả *.read* và *.write* thành **True**<br>
![cc](firebase/Capture8.PNG)
    - Bấm **Publish** để lưu
- Lấy mã Token để lưu và đọc dữ liệu:
  - Bấm vào *biểu tượng răng cưa* cạnh **Project Overview** tại góc trái màn hình
  - Bấm **Project Settings**<br>
![cc](firebase/Capture9.PNG)
  - Vào được trang **Project Settings**, chọn trang **Service accounts**
    - Bấm vào **Database secrets** và copy hết phần Secret<br>
![cc](firebase/Capture23.PNG)
    - Vậy là đã lấy được token Database (1/2)
    > gpBn3IYTc5bNCJlVP7W52pgvqXJJ2lZf47HTNHnt
- Lấy URL Database:
  - Quay trở lại trang chủ của Realtime Database
  - Copy phần url bên trên<br>
![cc](firebase/Capture16.PNG)
  - Vậy là đã lấy được URL Database (2/2)
  > https://fir-demo-62c4d-default-rtdb.firebaseio.com
****

## Phần 2: Liên kết Firebase Realime Database với Kodular
- Kéo Plugin **Firebase Database** từ phần **Google** vào Screen<br>
![cc](firebase/Capture14.PNG)
- Setting thuộc tính Plugin như sau:
  - **Firebase Token**: *Token đã copy từ bước trên*
  - **Firebase URL**: *URL đã copy từ bước trên*
  - **Project bucket**: *Để trống*<br>
  ![cc](firebase/Capture24.PNG)

## Phần 3: Sử dụng Firebase Realime Database
- *Ví dụ cách setup các block để có thể Gửi, Nhận dữ liệu từ Database:*<br>
![cc](firebase/Capture17.PNG)
- *Ví dụ code và hướng dẫn cụ thể:*<br>
![cc](firebase/Capture18.PNG)

## Phần 4: Ví dụ khi sử dụng Firebase Realime Database
- Nếu nhập giá trị = 3 và bấm button **Gửi lên database**<br>
![cc](firebase/Capture19.PNG)
- Database sẽ xuất hiện tại vị trí 'trai_cay' giá trị 'tao'='3' <br>
![cc](firebase/Capture20.PNG)
- Sau khi bấm nút **Lấy giá trị từ database** thì Output sẽ hiện giá trị 3<br>
![cc](firebase/Capture21.PNG)
- Nếu như giá trị 'tao' chưa được lưu, Output sẽ hiển thị *Không có giá trị đã lưu*<br>
![cc](firebase/Capture22.PNG)

***
# By [Minhmoiii](https://qminh.xyz/fb)
Nếu có thắc mắc gì thì ib trực tiếp qua: https://qminh.xyz/fb

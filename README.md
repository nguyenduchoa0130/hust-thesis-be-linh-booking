# HƯỚNG DẪN CÀI ĐẶT BACKEND

## Yêu cầu hệ thống

- Cài đặt sẵn NodeJS version >= 14.x
- Cài đặt sẵn MongoDB
- Cài đặt sẵn dịch vụ Ngrok

## Cài đặt MongoDB

1. **Cài đặt MongoDB Server**

Bạn có thể sử dụng _Docker_ hoặc tải theo hướng dẫn từ trang chủ [MongoDB Community Edition](https://www.mongodb.com/try/download/community).

2. **Cài đặt Mongo Compass**

- Truy cập trang tải xuống [MongoDB Compass](https://www.mongodb.com/try/download/compass)
- Chọn phiên bản phù hợp với hệ điều hành của bạn (Windows, macOS, Linux)
- Tải xuống và cài đặt theo hướng dẫn trên trang web

Sau khi cài đặt xong, bạn có thể mở MongoDB Compass và kết nối đến MongoDB Server của bạn bằng cách nhập URI kết nối.

```bash
mongodb://localhost:27017
```

Sau khi kết nối thành công, bạn vui lòng tạo một connection theo các bước:

- Nhập connection name
- Nhấn dấu "+" ở Connection
- Nhập thông tin gồm **<database_name>** và tên collection (có thể nhập bất kỳ)

## Cài đặt Ngrok

Ngrok là một công cụ giúp bạn tạo các đường hầm bảo mật đến localhost, cho phép bạn truy cập các dịch vụ đang chạy trên máy tính của mình từ internet. Bạn có thể cài đặt Ngrok theo các bước sau:

1. **Tải xuống Ngrok**

- Truy cập trang tải xuống [Ngrok](https://ngrok.com/download)
- Chọn phiên bản phù hợp với hệ điều hành của bạn (Windows, macOS, Linux)
- Tải xuống tệp tin cài đặt

2. **Cài đặt Ngrok**

- Giải nén tệp tin đã tải xuống
- Di chuyển tệp tin `ngrok` vào thư mục `/usr/local/bin` (đối với macOS và Linux) hoặc thêm đường dẫn của tệp tin `ngrok.exe` vào biến môi trường PATH (đối với Windows). Hoặc chỉ đơn giản là giải nén tập tin, và nhấn double-click vào tệp tin `ngrok.exe`

3. **Đăng ký tài khoản Ngrok**

- Truy cập trang [Ngrok](https://ngrok.com/)
- Đăng ký tài khoản và đăng nhập
- Lấy mã `authtoken` từ trang dashboard của Ngrok

4. **Cấu hình Ngrok**

- Mở terminal và chạy lệnh sau để cấu hình `authtoken`:

```bash
ngrok config add-authtoken <your_authtoken>
```

Thay `<your_authtoken>` bằng mã `authtoken` bạn đã lấy từ trang dashboard của Ngrok.

## Cài đặt mã nguồn backend

1. **Mở terminal**

Tại file nén của mã nguồn frontend, bạn giải nén nó ra, và mở mã nguồn bằng IDE bạn sử dụng. Sau đó, mở một terminal tại thư mục gốc.

2. **Cài đặt package dependencies**

Chạy lệnh sau để cài đặt các package dependencies:

```bash
npm install
```

3. **Thiết lập biến môi trường**

Tạo file _.env_ ở thư mục gốc và thiết lập các biến như dưới

```.env
# Others
MAX_FILE_SIZE_IN_MB = '10'
TOKEN_SECRET = 'linh_booking_token_secret'
PASSWORD_SALT = '$2a$10$your_unique_salt_value'

# DB
MONGODB_CONNECTION_URL = 'mongodb://127.0.0.1:27017/<your_database_name>'

# Email
SYSTEM_HOST_EMAIL = '<your_email>'
HOST_EMAIL = '<your_service_email>'
HOST_EMAIL_PASSWORD = 'your_password_service_email'

# Token
JWT_SECRET = 'access_token_secret'
```

4. **Chạy các migration**

Sau khi chạy các script này thì database sẽ có một số data mẫu:

```bash
npm run migrate:up
```

Nếu trong quá trình chạy migration mà bạn thấy có lỗi xuất hiện liên quan tới _migrate-mongo_. Thì bạn chạy lệnh sau:

```bash
npm i -g migrate-mongo
```

5. **Khởi chạy ứng dụng**

Để khởi chạy úng dụng ta chạy lệnh sau

```bash
npm start
```

Ứng dụng sẽ được chạy trên [http://localhost:8080](http://localhost:8080)

6. **Kiểm tra ứng dụng có thực chạy hay không**

Bạn mở trình duyệt web hoặc trình gọi API bất kỳ rồi dán vào link [http://localhost:8080](http://localhost:8080)

Nếu kết quả trả về như thế này thì bạn đã khởi chạy ứng dụng thành công:

```json
{
  "status": "Not found",
  "statusCode": 404,
  "message": "Can not find the api path: /"
}
```

7. **Chạy ngrok**

Chạy chuyển localhost thành một host https có thể truy cập từ một máy khác, bạn cần chạy lệnh sau, bạn có thể mở terminal nếu đã setup hoặc chạy file _ngrok.exe_:

```bash
ngrok http 8080
```

Sau khi chạy xong, ngrok sẽ trả về cho bạn 1 url dạng https, bạn copy link này và bỏ vào biến _REACT_APP_BACKEND_URL_ bên file _.env_ của frontend.

**Chúc bạn cài đặt và sử dụng thành công**

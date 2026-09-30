# PrediX Finance — Register / Login / Forgot Password

Áp dụng cho `challenge.predixpro.io` (Finance) — nơi xử lý tiền thật (trả phí mua Challenge, claim payout), nên cần lớp identity đầy đủ, đa phương thức, chống mất tài khoản.

**Predict/Market (`predict.predixpro.io`, `market.predixpro.io`) không dùng hệ thống này** — user trade bằng vốn hệ thống rót vào, không phải tiền/ví của chính họ, nên dùng cơ chế đơn giản hơn hẳn: username/password do Finance tạo hộ. Xem mục 6.

**Play (`play.predixpro.io`)** — chưa xác nhận có đi theo hướng như Predict/Market hay vẫn dùng chung identity với Finance như thiết kế trước đó. Xem mục 7.

---

## 1. Tổng quan 5 cách đăng nhập (Finance)

| Cách đăng nhập | Cơ chế | Có mật khẩu không |
|---|---|---|
| Passkey | Vân tay / Face ID / khoá bảo mật của thiết bị | Không |
| Email | Email + mật khẩu do user tự đặt | Có |
| Google | Đăng nhập qua tài khoản Google (OAuth) | Không |
| Apple | Đăng nhập qua Apple ID (Sign in with Apple) | Không |
| Connect Wallet | Kết nối ví crypto có sẵn (OKX, Gate Wallet, MetaMask, Rainbow, Base Account, WalletConnect...) | Không |

**4 trong 5 cách không dùng mật khẩu.** Chỉ riêng Email là có mật khẩu truyền thống — vì vậy "Forgot Password" (quên mật khẩu) chỉ áp dụng cho Email. Mất quyền truy cập vào 4 cách còn lại thì xử lý theo hướng khác, gọi là "Account Recovery" — xem mục 5.

**User có thể liên kết nhiều cách đăng nhập vào cùng 1 tài khoản.** Ví dụ: đăng ký bằng Google, sau đó thêm Passkey làm phương án dự phòng. Cả 2 đều dẫn vào đúng 1 tài khoản, không tạo ra 2 tài khoản khác nhau.

**Passkey và Connect Wallet có 1 điểm yếu cần biết:** nếu user chỉ dùng đúng 1 trong 2 cách này và không liên kết thêm gì khác, khi mất thiết bị (Passkey) hoặc mất ví (Connect Wallet), tài khoản **mất vĩnh viễn, không khôi phục được**. Đây không phải lỗi hệ thống — passkey gắn với thiết bị, ví crypto không ai giữ hộ khoá riêng của user. Vì vậy khi đăng ký bằng 2 cách này, hệ thống nên chủ động mời user thêm 1 phương thức dự phòng (email hoặc Google/Apple).

---

## 2. Đăng ký (Finance)

### Passkey

1. User bấm "Continue with Passkey".
2. Thiết bị hiện hộp thoại xác thực sinh trắc học (vân tay/Face ID/khoá bảo mật) — đây là cơ chế chuẩn của trình duyệt (WebAuthn), không phải giao diện tự vẽ.
3. Xác thực xong, hệ thống tạo tài khoản mới (User) trong Finance.
4. Hiện màn hình mời thêm email dự phòng — có nút "Add email" (nhập + xác minh OTP) và "Skip for now".

Lưu ý: passkey gắn với thiết bị + trình duyệt cụ thể, không tự đồng bộ sang máy khác trừ khi cùng hệ sinh thái (vd cùng tài khoản iCloud giữa iPhone và Mac).

### Email

1. User nhập email + tự đặt mật khẩu.
   - Yêu cầu: tối thiểu 8 ký tự, có chữ, số và ký tự đặc biệt.
2. Hệ thống gửi mã xác minh về email để xác nhận email thật.
3. User nhập mã xong, tài khoản kích hoạt.

### Google / Apple

1. User bấm "Continue with Google" hoặc "Continue with Apple".
2. Chuyển qua màn hình xác thực chuẩn của Google/Apple, user xác nhận.
3. Hệ thống tạo tài khoản mới.

Với Apple: user có thể chọn ẩn email thật (dùng email proxy dạng `xxxx@privaterelay.appleid.com`). Đây là email hợp lệ, hệ thống lưu bình thường như một email thật.

### Connect Wallet

1. User bấm "Connect Wallet", chọn ví (OKX, Gate Wallet, MetaMask, Rainbow, Base Account, WalletConnect...).
2. Ví hiện popup xác nhận kết nối (giao diện của ví, không phải của PrediX), user duyệt.
3. Hệ thống tạo tài khoản gắn với địa chỉ ví đó — ví này dùng để trả phí Challenge và/hoặc nhận payout thật sau này, user tự quản lý khoá riêng.

---

## 3. Đăng nhập (Finance)

User đăng nhập vào Finance, session duy trì cho tới khi hết hạn hoặc đăng xuất.

1. Hệ thống hiện 5 lựa chọn như lúc đăng ký.
2. Passkey / Google / Apple: xác thực trực tiếp, không cần nhập gì thêm.
3. Email: nhập email + mật khẩu.
4. Connect Wallet: chọn lại đúng ví đã dùng.
5. Xác thực đúng, vào lại đúng tài khoản cũ — toàn bộ lịch sử vé thi, hiệu năng vẫn nguyên.

Nếu user chọn nhầm phương thức khác với lúc đăng ký (vd đăng ký bằng Google nhưng lần sau bấm Email), và 2 phương thức đó đã được liên kết vào cùng 1 tài khoản, hệ thống tự nhận ra và đăng nhập đúng tài khoản cũ. Nếu phương thức đó chưa từng liên kết, hệ thống cần báo rõ "Chưa tìm thấy tài khoản với phương thức này" thay vì âm thầm tạo tài khoản rỗng mới.

Phiên đăng nhập hết hạn sau 7 ngày.

---

## 4. Forgot Password (chỉ áp dụng cho Email)

1. Ở màn đăng nhập, chọn Email, bấm "Forgot password?".
2. Nhập email, hệ thống gửi mã OTP về email đó.
3. Nhập mã đúng, đặt mật khẩu mới, xác nhận.
4. Đăng nhập lại bằng mật khẩu mới.

Đổi mật khẩu không ảnh hưởng gì tới dữ liệu khác — toàn bộ vé thi, lịch sử vẫn giữ nguyên vì gắn với tài khoản, không gắn với mật khẩu.

**Trường hợp khó hơn:** user vừa quên mật khẩu vừa không còn truy cập được email đó (đổi email, email bị khoá). Lúc này không nhận được mã OTP, luồng trên không thực hiện được. Nếu tài khoản đã liên kết Passkey/Google/Apple, user login bằng phương thức đó rồi đổi email trong phần Cài đặt. Nếu chỉ có Email và không liên kết gì khác, cần liên hệ hỗ trợ để xác minh danh tính thủ công.

---

## 5. Account Recovery (cho Passkey, Google, Apple, Connect Wallet)

4 cách này không có mật khẩu nên không "reset" được — khi mất quyền truy cập, cách xử lý khác nhau tuỳ trường hợp:

| Mất gì | Cách xử lý |
|---|---|
| Thiết bị có Passkey | Nếu đã liên kết Email/Google/Apple: login bằng phương thức còn lại, tạo passkey mới cho thiết bị hiện tại. Nếu chỉ có Passkey và không liên kết gì khác: mất tài khoản vĩnh viễn. |
| Tài khoản Google | Dùng quy trình khôi phục của Google. Sau khi lấy lại được, đăng nhập lại bình thường. |
| Apple ID | Dùng quy trình khôi phục của Apple. Sau khi lấy lại được, đăng nhập lại bình thường. |
| Ví đã Connect Wallet | Nằm ngoài khả năng hỗ trợ của PrediX — khôi phục ví thuộc trách nhiệm của user, cần đúng seed phrase. Nếu đã liên kết Passkey/Email/Google/Apple: login bằng phương thức còn lại rồi connect ví mới. Nếu chỉ dùng mỗi Connect Wallet: mất quyền truy cập vĩnh viễn. |

**Vì rủi ro "mất vĩnh viễn" là có thật với Passkey và Connect Wallet**, nên:

- Ngay sau khi đăng ký bằng 1 trong 2 cách này, hiện lời mời thêm phương thức dự phòng (xem mục 2).
- Nếu user bỏ qua, nhắc lại định kỳ — ví dụ 1 banner nhỏ trong Dashboard, không chặn thao tác, cứ 30 ngày hiện lại nếu vẫn chưa có phương thức dự phòng.
- Trong Dashboard, mục Cài đặt/Bảo mật nên có phần "Backup methods" hiển thị rõ user đang liên kết bao nhiêu phương thức, cảnh báo nếu chỉ có 1.
- Chính sách hỗ trợ khôi phục nói chung là **hạn chế** (xem doc Admin, mục Support) — không mở rộng ngoại lệ xác minh thủ công nhiều bước, chấp nhận đánh đổi 1 số user thật không khôi phục được để giảm rủi ro social-engineering.

---

## 6. Predict / Market — Demo Account (do Finance provision)

Predict/Market **không dùng 5 phương thức đăng nhập ở trên**, và user không tự quản ví ở tầng này. Lý do: user trade trên Predict bằng **vốn hệ thống rót vào**, không phải tiền/ví của chính họ — nên không cần lớp identity phức tạp như Finance.

**Cách hoạt động:**

1. User mua Challenge xong ở Finance (`challenge.predixpro.io`).
2. Finance gọi API sang Predict để tạo 1 "demo account" cho đúng vé thi đó.
3. Predict tạo tài khoản demo bằng **username/password** — đây chính là "thông tin đăng nhập riêng để vào Market" đã nhắc ở Challenge Flow, làm rõ hình thức cụ thể ở đây.
4. Predict tự sinh 1 **ví hệ thống** (private key do Predict giữ, không phải ví của user) cho account demo đó, rồi rót **vốn hệ thống** vào ví này theo đúng size Challenge đã mua.
5. Mọi lệnh trade của user trên Predict được Predict **ký on-chain bằng key ví hệ thống** — đây là hạ tầng thực thi lệnh, không phải giữ hộ tài sản của user, vì tài sản trong ví này vốn dĩ là vốn hệ thống, không phải tiền của user.
6. User đăng nhập Predict bằng username/password đã được tạo — không thấy và không cần biết gì về ví hệ thống phía sau.

**Payout thật tách hoàn toàn khỏi ví hệ thống này.** Khi user pass Challenge và muốn rút tiền lãi thật, luồng đó diễn ra ở Dashboard bên Finance — user tự connect **ví thật của chính mình** ngay lúc claim (xem Challenge Flow, mục Dashboard). Ví hệ thống bên Predict chỉ dùng để trade, không bao giờ là nơi user rút tiền ra.

**Vì sao tách 2 lớp identity khác nhau:**

- Finance xử lý tiền thật (trả phí mua Challenge, claim payout) → cần identity mạnh, đa phương thức, chống mất tài khoản.
- Predict chỉ để trade bằng vốn hệ thống, không giữ gì có giá trị thật của user → username/password do Finance provision là đủ, không cần tích hợp Gate SDK/WebAuthn/OAuth ở phía Predict.

---

## 7. Chưa có câu trả lời cuối cùng

- Play (`play.predixpro.io`) đi theo hướng nào — dùng chung identity với Finance (như thiết kế trước), hay cũng có demo account riêng kiểu Predict?
- Username/password của demo account bên Predict do Finance tự sinh ngẫu nhiên rồi hiển thị 1 lần cho user, hay user tự đặt password lúc mua Challenge?
- Danh sách ví bắt buộc hỗ trợ ở Connect Wallet (Finance) — hiện đang tham khảo OKX, Gate Wallet, MetaMask, Rainbow, Base Account, WalletConnect, cần xác nhận đây là danh sách chính thức hay chỉ ví dụ.
- Quy trình xác minh danh tính tối thiểu cho các case Admin đồng ý hỗ trợ khôi phục tài khoản (mục 5) — mức xác minh cụ thể là gì.

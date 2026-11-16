---
layout: page
lang: vi
alt: /privacy-by-design/
title: App quản lý tiền không bao giờ hỏi mật khẩu ngân hàng
seo_title: "App quản lý chi tiêu không cần đăng nhập ngân hàng"
eyebrow: Quyền riêng tư
description: >-
  myMoney đọc gì, không bao giờ đụng tới gì, dữ liệu nằm ở đâu và sao lưu ra
  sao. App quản lý chi tiêu không kết nối ngân hàng.
lede: >-
  myMoney không bao giờ kết nối với ngân hàng và không bao giờ hỏi mật khẩu.
  Giao dịch, ngân sách và mục tiêu được lưu trên điện thoại của bạn. Tính năng
  Tự ghi chỉ đọc thông báo từ những app bạn chọn, và chỉ gửi nội dung thông báo
  đó tới AI Gemini của Google để biến thành giao dịch.
schema: article
date_published: 2026-11-16
last_modified: 2026-11-16
related:
  - [/vi/tu-ghi-giao-dich/, Tự ghi giao dịch hoạt động thế nào]
  - [/privacypolicy/, Chính sách bảo mật đầy đủ (tiếng Anh)]
  - [/deleteaccount/, Cách xóa tài khoản và dữ liệu]
faq:
  - q: myMoney có xem được tài khoản ngân hàng của tôi không?
    a: >-
      Không. myMoney không có kết nối nào với ngân hàng. Ứng dụng chỉ thấy
      những gì app ngân hàng đã hiện trong thông báo trên điện thoại, và chỉ khi
      bạn đã thêm app đó vào Tự ghi.
  - q: Nhà phát triển có nhận được dữ liệu tài chính của tôi không?
    a: >-
      Không. Dữ liệu của bạn nằm trên máy. Nội dung thông báo dùng cho Tự ghi
      được gửi tới dịch vụ Gemini của Google để trả về kết quả; nhà phát triển
      không nhận hay lưu trữ. Bản sao lưu nằm trên Google Drive của chính bạn,
      nhà phát triển không mở được.
  - q: Dữ liệu của tôi có bị bán không?
    a: >-
      Không. Không bán cho bất kỳ ai. Bản miễn phí có quảng cáo qua Google
      AdMob; Bánh Xèo, bản trả phí, không có quảng cáo.
---

## Tóm tắt

| | Nằm ở đâu |
|---|---|
| Giao dịch, ví, ngân sách, mục tiêu, ảnh hóa đơn | **Trên điện thoại của bạn.** myMoney không thu thập. |
| Bản sao lưu (nếu bạn bật) | **Google Drive của chính bạn.** Nhà phát triển không mở được. |
| Thông báo từ app bạn không chọn | **Không đi đâu cả.** Không bao giờ đọc, lưu hay gửi. |
| Thông báo từ app bạn chọn (Tự ghi) | Tiêu đề và nội dung, tên app, tên danh mục và loại tiền của ví được gửi tới **AI Gemini của Google** để xác định giao dịch. |
| Mật khẩu ngân hàng | **Không bao giờ hỏi.** myMoney không kết nối với ngân hàng. |

## Tự ghi đọc những gì

Tự ghi tắt cho đến khi bạn bật. Trên Android, hệ thống sẽ hỏi bạn cấp quyền truy cập thông báo trước. Trên iPhone, không có gì được đọc trừ khi bạn tự tạo lệnh tự động trong Phím tắt.

- **Chỉ những app bạn thêm.** Thông báo của mọi app khác đều bị bỏ qua.
- **Chỉ thông báo có chứa con số.** Tin không có số tiền sẽ không được đọc.
- **Những gì rời khỏi điện thoại:** tiêu đề và nội dung thông báo đúng như ngân hàng gửi, tên app, tên danh mục của bạn và loại tiền của ví. Dữ liệu này được gửi tới Gemini qua Firebase AI Logic của Google. Tùy ngân hàng, nội dung có thể gồm số tiền, nơi chi, nội dung chuyển khoản, số dư hoặc một phần số tài khoản.
- **Kết quả trả về** chỉ nằm trong cơ sở dữ liệu của ứng dụng trên điện thoại. Mục đã xác nhận hoặc bỏ qua sẽ bị xóa sau 30 ngày, và không nằm trong bản sao lưu.

## Cách tắt

Tắt Tự ghi trong Cài đặt, hoặc gỡ quyền truy cập thông báo của myMoney trong cài đặt Android (trên iPhone, xóa lệnh tự động). Sẽ không có gì được đọc thêm, và các thông báo đang chờ đọc bị hủy.

## Các dịch vụ khác trong ứng dụng

Để minh bạch: myMoney dùng Firebase Analytics và Crashlytics để hiểu cách ứng dụng được dùng và sửa lỗi, Firebase Authentication nếu bạn đăng nhập, và Google AdMob để hiện quảng cáo ở bản miễn phí. [Chính sách bảo mật](/privacypolicy/) liệt kê từng dịch vụ kèm liên kết tới chính sách của họ.

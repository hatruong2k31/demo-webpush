// URL của API FCM
const fcmApiUrl = `https://fcm.googleapis.com//v1/projects/webpushnotification-18248/messages:send`;

// Device tokens của các thiết bị cần nhận tin nhắn
const deviceTokens = [
  "eIiNkNH4JD3LqPmnjmHRcz:APA91bG7p_Yp9TZrq8_UZRc5wsS8DVQ_HqprOmPXnzYSHjK15vVF7BeGi_-DERLDTn6dIVaigBXkVo6v6LHwjc6JyUuE7MvFFFjSNb5D_2VKEz77GcOweWEoFpkBME1tIWOfI150_8Tp",
  // Thêm các device token khác nếu cần
];

// Chuẩn bị dữ liệu cho yêu cầu API FCM
const requestData = {
  message: {
    token: deviceTokens[0], // Gửi cho thiết bị đầu tiên trong danh sách
    notification: {
      title: "Tiêu đề thông báo",
      body: "Nội dung thông báo",
    },
  },
};

// Gửi yêu cầu POST đến API FCM
axios
  .post(fcmApiUrl, requestData, {
    headers: {
      Authorization: `Bearer AAAAXzR-RzU:APA91bFF6vss-uScz0bI1jHh8hxEw4qzjyF4LLWPsW2wbP7mzp5Yxb7TEAEf2Fi7vjx6jmtERvYtmkKPpdQNMgB-8IWfWNFJPZn1HM8TkvkTZPnYVWy6bcZBoPxDhPTiZ0OGh79DxUgP`, // Thay YOUR_ACCESS_TOKEN bằng access token của bạn
      "Content-Type": "application/json",
    },
  })
  .then((response) => {
    console.log("Tin nhắn đã được gửi thành công: ", response.data);
  })
  .catch((error) => {
    console.error("Lỗi khi gửi tin nhắn: ", error);
  });

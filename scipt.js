const firebaseConfig = {
  apiKey: "AIzaSyCCSMhwQDwknF6JTpbVdilygUg7pyEyOGI",
  authDomain: "webpushnotification-18248.firebaseapp.com",
  projectId: "webpushnotification-18248",
  storageBucket: "webpushnotification-18248.appspot.com",
  messagingSenderId: "633791818397",
  appId: "1:633791818397:web:662c3155350fe23a22c274",
  measurementId: "G-CL1SN2102X",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

function IntitalizeFireBaseMessaging() {
  messaging
    .requestPermission()
    .then(() => {
      console.log("Quyền thông báo đã được cấp!");
      return messaging.getToken({
        vapidKey:
          "BOSw0i09xdP2GgOwN3HUR71vSrEGhWg6dfyqgE90eQsRijdDDM-4aNeH1FNMcpeRzaxffE_7iFm5EcevckhMmtY",
      });
    })
    .then((token) => {
      console.log("Token : " + token);
      document.getElementById("token").innerHTML = token;
      const registrationTokens = [token];

      const topic = "hehe"; // Thay thế với tên chủ đề của bạn

      console.log(messaging);
      // messaging
      //   .subscribeToTopic(topic)
      //   .then(() => {
      //     console.log(`Đã đăng ký thành công với chủ đề ${topic}`);
      //   })
      //   .catch((error) => {
      //     console.log(`Lỗi đăng ký với chủ đề ${topic}: `, error);
      //   });
      // messaging
      //   .getMessaging()
      //   .subscribeToTopic(registrationTokens, topic)
      //   .then((response) => {
      //     console.log("Successfully subscribed to topic:", response);
      //   })
      //   .catch((error) => {
      //     console.log("Error subscribing to topic:", error);
      //   });
    })
    .catch((reason) => {
      console.error(reason);
    });
}

messaging.onMessage((payload) => {
  console.log(payload);
  const notificationOption = {
    body: payload.notification.body,
    icon: payload.notification.icon,
  };

  if (Notification.permission === "granted") {
    var notification = new Notification(
      payload.notification.title,
      notificationOption
    );

    notification.onclick = function (ev) {
      ev.preventDefault();
      window.open(payload.notification.click_action, "_blank");
      notification.close();
    };
  }
});

messaging.onTokenRefresh(() => {
  messaging
    .getToken()
    .then(function (newtoken) {
      console.log("New Token : " + newtoken);
    })
    .catch(function (reason) {
      console.log(reason);
    });
});

IntitalizeFireBaseMessaging();

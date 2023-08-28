var firebaseConfig = {
  apiKey: "AIzaSyCaIKBIfi3OO5FqUtW7kRBvP4NWqyq2qUI",
  authDomain: "test-fcm-a1205.firebaseapp.com",
  projectId: "test-fcm-a1205",
  storageBucket: "test-fcm-a1205.appspot.com",
  messagingSenderId: "408902584117",
  appId: "1:408902584117:web:ee6d2dcda80c7473746e7c",
  measurementId: "G-WT2CJ81E9J",
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
          "BGQkvie7tjIuh3b8D-HOTE3-W7oCDfcRnLMI9RpVPrmk72jjcH7yfs6EdTnR0iJFsXQYN9V0MIzP-Yzyh1jofxA",
      });
    })
    .then((token) => {
      console.log("Token : " + token);
      document.getElementById("token").innerHTML = token;
      const registrationTokens = [token];

      const topic = "hehe"; // Thay thế với tên chủ đề của bạn
      messaging
        .subscribeToTopic(topic)
        .then(() => {
          console.log(`Đã đăng ký thành công với chủ đề ${topic}`);
        })
        .catch((error) => {
          console.log(`Lỗi đăng ký với chủ đề ${topic}: `, error);
        });
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

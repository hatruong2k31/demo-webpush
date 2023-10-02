var firebaseConfig = {
  apiKey: "AIzaSyCFFRppAHzuA3-fCIC6DGAjUw_G01EMYpo",
  authDomain: "saleforce-201c6.firebaseapp.com",
  projectId: "saleforce-201c6",
  storageBucket: "saleforce-201c6.appspot.com",
  messagingSenderId: "660663099160",
  appId: "1:660663099160:web:1ba8f0df8131b7a935886d",
  measurementId: "G-RZFQ4J7EL6",
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

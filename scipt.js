var firebaseConfig = {
  apiKey: "AIzaSyCCSMhwQDwknF6JTpbVdilygUg7pyEyOGI",
  authDomain: "webpushnotification-18248.firebaseapp.com",
  projectId: "webpushnotification-18248",
  storageBucket: "webpushnotification-18248.appspot.com",
  messagingSenderId: "633791818397",
  appId: "1:633791818397:web:b9822a9ac526ae1722c274",
  measurementId: "G-PRVKSQ49ZW",
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
          "BCy4EVfXHpIdK-unBIYieIfSBngDBPWwjsngkNz57UxW4N-ahPUgVgGY99fLIfIWTwIj1ZKeGi2yOJIP5Y9Rw28",
      });
    })
    .then((token) => {
      console.log("Token : " + token);
      document.getElementById("token").innerHTML = token;

      // Đẩy token sang cho Salesforce. Sau này nếu user có login thì tiếp tục đẩy token kèm user info sang
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

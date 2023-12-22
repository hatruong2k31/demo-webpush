var firebaseConfig = {
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
          "BCy4EVfXHpIdK-unBIYieIfSBngDBPWwjsngkNz57UxW4N-ahPUgVgGY99fLIfIWTwIj1ZKeGi2yOJIP5Y9Rw28",
      });
    })
    .then((token) => {
      console.log("Token : " + token);

      document.getElementById("token").innerHTML = token;

      // handle something if u want
    })
    .catch((reason) => {
      console.error(reason);
    });
}

messaging.onMessage((payload) => {
  console.log("payload ", payload);
  const title = payload.data.title;
  const options = {
    body: payload.data.body,
    data: { url: payload.data.click_link || "https://vitadairy.vn" },
    icon: payload.data.icon,
    image: payload.data.image,
  };
  if (Notification.permission === "granted") {
    var notification = new Notification(title, options);
    notification.onclick = function (event) {
      event.preventDefault();
      window.open(options.data.url, "_blank");
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

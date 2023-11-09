importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);

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

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: `logo192.png`,
    image: payload.notification.image,
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
  // handle something if u want. Đây là ví dụ thôi đừng có copy paste nguyên si
  self.addEventListener("notificationclick", function (event) {
    console.log("here", event, payload);
    const urlToOpen = "http://127.0.0.1:5500/?okeletgo=true"; // payload.data.url

    event.notification.close();

    // Mở đường link khi thông báo được nhấp
    event.waitUntil(clients.openWindow(urlToOpen));
  });
});

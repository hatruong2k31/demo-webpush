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
  appId: "1:633791818397:web:662c3155350fe23a22c274",
  measurementId: "G-CL1SN2102X",
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
  self.registration
    .showNotification(notificationTitle, notificationOptions)
    .then((notification) => {
      self.addEventListener("notificationclick", function (event) {
        event.preventDefault();
        console.log("here", event, payload);
        // const urlToOpen = "http://127.0.0.1:5500/?okeletgo=true";
        const urlToOpen = payload?.data?.click_link;

        event.notification.close();

        // Mở đường link khi thông báo được nhấp
        event.waitUntil(clients.openWindow(urlToOpen));
      });
    });
});

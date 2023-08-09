importScripts("https://www.gstatic.com/firebasejs/7.14.6/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/7.14.6/firebase-messaging.js"
);

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

messaging.setBackgroundMessageHandler(function (payload) {
  console.log(payload);
  const notification = JSON.parse(payload);
  const notificationOption = {
    body: notification.body,
    icon: notification.icon,
  };
  return self.registration.showNotification(
    payload.notification.title,
    notificationOption
  );
});

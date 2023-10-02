importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);

const firebaseConfig = {
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

messaging.setBackgroundMessageHandler((payload) => {
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

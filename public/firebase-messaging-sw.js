importScripts(
  "https://www.gstatic.com/firebasejs/10.1.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.1.0/firebase-messaging-compat.js"
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

  const title = payload.data.title;
  const options = {
    body: payload.data.body,
    data: { url: payload.data.click_link },
    icon: `logo192.png`,
    image: payload.data.image,
  };
  return self.registration.showNotification(title, options);
});

self.addEventListener("notificationclick", function (event) {
  let url = event.notification.data.url;
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: "window" }).then((windowClients) => {
      // Check if there is already a window/tab open with the target URL
      for (var i = 0; i < windowClients.length; i++) {
        var client = windowClients[i];
        // If so, just focus it.
        if (client.url === url && "focus" in client) {
          return client.focus();
        }
      }
      // If not, then open the target URL in a new window/tab.
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});

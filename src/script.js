import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import logo from "./logo.svg";
const firebaseConfig = {
  apiKey: "AIzaSyCCSMhwQDwknF6JTpbVdilygUg7pyEyOGI",
  authDomain: "webpushnotification-18248.firebaseapp.com",
  projectId: "webpushnotification-18248",
  storageBucket: "webpushnotification-18248.appspot.com",
  messagingSenderId: "633791818397",
  appId: "1:633791818397:web:662c3155350fe23a22c274",
  measurementId: "G-CL1SN2102X",
};

function IntitalizeFireBaseMessaging() {
  Notification?.requestPermission()
    .then((permission) => {
      if (permission === "granted") {
        console.log("Quyền thông báo đã được cấp!!!");

        const app = initializeApp(firebaseConfig);
        const messaging = getMessaging(app);
        getToken(messaging, {
          vapidKey:
            "BCy4EVfXHpIdK-unBIYieIfSBngDBPWwjsngkNz57UxW4N-ahPUgVgGY99fLIfIWTwIj1ZKeGi2yOJIP5Y9Rw28",
        })
          .then((currentToken) => {
            if (currentToken) {
              console.log("token: ", currentToken);
            } else console.log("get token err");
          })
          .catch((err) => {
            console.log(err);
          });

        onMessage(messaging, (payload) => {
          console.log("payload ", payload);

          const title = payload.data.title;
          const options = {
            body: payload.data.body,
            data: { url: payload.data.click_link },
            icon: logo, // Dev vita đưa logo vita vào đây ..........................
            image: payload.data.image,
          };
          if (Notification.permission === "granted") {
            var notification = new Notification(title, options);
            notification.onclick = function (event) {
              event.preventDefault();
              window.open(payload.data.click_link, "_blank");
              notification.close();
            };
          }
        });
      } else {
        console.log("Không được cấp quyền thông báo!");
      }
    })
    .catch((err) => {
      console.log("Err", err);
    });
}

IntitalizeFireBaseMessaging();

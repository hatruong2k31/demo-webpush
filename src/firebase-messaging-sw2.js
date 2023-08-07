import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCaIKBIfi3OO5FqUtW7kRBvP4NWqyq2qUI",
  authDomain: "test-fcm-a1205.firebaseapp.com",
  projectId: "test-fcm-a1205",
  storageBucket: "test-fcm-a1205.appspot.com",
  messagingSenderId: "408902584117",
  appId: "1:408902584117:web:ee6d2dcda80c7473746e7c",
  measurementId: "G-WT2CJ81E9J",
};

export function requestPermission() {
  Notification.requestPermission()
    .then((permission) => {
      if (permission === "granted") {
        console.log("Quyền thông báo đã được cấp!!!");
        const app = initializeApp(firebaseConfig);

        const messaging = getMessaging(app);

        getToken(messaging, {
          vapidKey:
            "BGQkvie7tjIuh3b8D-HOTE3-W7oCDfcRnLMI9RpVPrmk72jjcH7yfs6EdTnR0iJFsXQYN9V0MIzP-Yzyh1jofxA",
        })
          .then((currentToken) => {
            if (currentToken) {
              console.log("token: ", currentToken);
            } else {
              console.log("Không lấy được token");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        console.log("Không được cấp quyền thông báo!");
      }
    })
    .catch((err) => {
      console.log("Err", err);
    });
}

requestPermission();

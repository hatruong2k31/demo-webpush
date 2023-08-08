const firebaseConfig = {
  apiKey: "AIzaSyCaIKBIfi3OO5FqUtW7kRBvP4NWqyq2qUI",
  authDomain: "test-fcm-a1205.firebaseapp.com",
  projectId: "test-fcm-a1205",
  storageBucket: "test-fcm-a1205.appspot.com",
  messagingSenderId: "408902584117",
  appId: "1:408902584117:web:ee6d2dcda80c7473746e7c",
  measurementId: "G-WT2CJ81E9J",
};

firebase?.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging
  .requestPermission()
  .then(function () {
    console.log("Quyền thông báo đã được cấp!");
    return messaging.getToken({
      vapidKey:
        "BGQkvie7tjIuh3b8D-HOTE3-W7oCDfcRnLMI9RpVPrmk72jjcH7yfs6EdTnR0iJFsXQYN9V0MIzP-Yzyh1jofxA",
    });
  })
  .then(function (currentToken) {
    console.log("Token : " + currentToken);
    // Gửi token này lên máy chủ để lưu lại và sử dụng khi gửi thông báo.
  })
  .catch(function (err) {
    console.log(err);
  });

importScripts(
  "/www.gstatic.com/firebasejs/11.5.0/firebase-app-compat.js"
);
importScripts(
  "/www.gstatic.com/firebasejs/11.5.0/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyDs4dpNyeU1u-SY5lU0qCgGrOSeRBLqLiE",
  authDomain: "notification-3ae98.firebaseapp.com",
  projectId: "notification-3ae98",
  storageBucket: "notification-3ae98.firebasestorage.app",
  messagingSenderId: "1044165231953",
  appId: "1:1044165231953:web:a17cc6638cdce72cdabf70",
  measurementId: "G-K83S995J6B"
};

firebase.initializeApp(firebaseConfig);

// Retrieve an instance of Firebase Messaging
const messaging = firebase.messaging();

// Background message handler
messaging.onBackgroundMessage(function (payload) {
  // console.log("Received background message: ", payload);
  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    icon: "/sitethemedata.com/icons/ic_notify.png",
    vibrate: [100, 50, 100],
    data: {
      linkUrl: payload.data.linkUrl || self.location.origin,
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
  };

  // Show notification
  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification click event
self.addEventListener("notificationclick", (event) => {
  event.notification.close(); // Close the notification
  const url = event.notification.data.linkUrl;

  event.waitUntil(
    clients.matchAll({ type: "window" }).then((clientList) => {
      for (const client of clientList) {
        if (client.url === url && "focus" in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});

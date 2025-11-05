/* eslint-disable no-restricted-globals */
importScripts("https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js");

// Initialize Firebase in the Service Worker
const firebaseConfig = {
   apiKey: "AIzaSyC3kvchSZgWP6d_io3DWLNzMNt620B12Lk",
   authDomain: "api-mock-2e3fa.firebaseapp.com",
   projectId: "api-mock-2e3fa",
   storageBucket: "api-mock-2e3fa.firebasestorage.app",
   messagingSenderId: "434065921365",
   appId: "1:434065921365:web:4bc54e6b09deefa62acbdc",
   measurementId: "G-XLGLYNC27B",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
   if (!payload.notification && payload.data) {
      const notificationTitle = payload.data.title;
      const notificationOptions = {
         body: payload.data.body,
         icon: "/logo.svg",
         data: {
            date: payload.data.date,
            url: payload.data.url,
            notificationId: payload.data.notificationId,
         },
      };
      return self.registration.showNotification(notificationTitle, notificationOptions);
   }
});

// Handle notification click
self.addEventListener("notificationclick", (event) => {
   const notification = event.notification;
   const url = notification.data?.url;
   // Close the notification
   notification.close();
   // Open the URL in a new tab
   if (url) {
      event.waitUntil(
         clients.openWindow(url) // Open the URL when the notification is clicked
      );
   }
});

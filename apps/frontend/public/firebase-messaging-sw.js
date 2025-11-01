/* eslint-disable no-restricted-globals */
importScripts("https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js");

// Load Firebase config dynamically
async function initFirebase() {
   try {
      const response = await fetch("/firebase.config.json");
      const data = await response.json();
      const firebaseConfig = data?.data?.config;

      firebase.initializeApp(firebaseConfig);

      const messaging = firebase.messaging();

      // Background push handler
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
   } catch (err) {
      console.error("Failed to load Firebase config:", err);
   }
}

// Run init
initFirebase();

// Handle notification click
self.addEventListener("notificationclick", (event) => {
   const notification = event.notification;
   const url = notification.data?.url;
   notification.close();
   if (url) {
      event.waitUntil(clients.openWindow(url));
   }
});

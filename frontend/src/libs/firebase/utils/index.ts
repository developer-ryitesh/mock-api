import { getToken, isSupported } from "firebase/messaging";
import firebase from "../config";

async function getDeviceToken() {
   const isFcmSupported = await isSupported();
   if (!isFcmSupported) {
      throw new Error("Fcm Not Supported");
   }
   try {
      const deviceToken = await getToken(firebase.messaging, { 
         vapidKey: firebase.vapidKey 
      });
      return deviceToken;
   } catch (error) {
      throw error;
   }
}

async function swRegister() {
   if ("serviceWorker" in navigator) {
      try {
         const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js");
         return registration;
      } catch (err) {
         return null;
      }
   } else {
      console.warn("⚠ Service workers are not supported in this browser.");
      return null;
   }
}

async function swUnregister() {
   try {
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (const registration of registrations) {
         if (registration.active && registration.active.scriptURL.includes("firebase-messaging-sw.js")) {
            const success = await registration.unregister();
            if (success) {
               console.log("Firebase service worker unregistered successfully.");
            } else {
               console.warn("Failed to unregister Firebase service worker.");
            }
         }
      }
   } catch (error) {
      console.error("Error while unregistering Firebase service worker:", error);
   }
}

export { getDeviceToken, swRegister, swUnregister };

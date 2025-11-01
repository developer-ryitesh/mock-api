import { initializeApp } from "firebase/app";
import { getMessaging, onMessage } from "firebase/messaging";
import { getDeviceToken, swRegister, swUnregister } from "../utils";

async function getFirebaseConfig() {
   const response = await fetch("/firebase.config.json");
   const firebaseConfig = await response.json();
   return firebaseConfig?.data?.config;
}

const config = await getFirebaseConfig();
const app = initializeApp(config);
const messaging = getMessaging(app);

const firebase = {
   onMessage,
   app,
   vapidKey: config.vapidKey,
   messaging,
   swRegister,
   swUnregister,
   getDeviceToken,
};

export default firebase;

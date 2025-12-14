import { initializeApp } from "firebase/app";
import { getMessaging, onMessage } from "firebase/messaging";
import { getDeviceToken, swRegister, swUnregister } from "../utils";

const firebaseConfig = {
   apiKey: "AIzaSyC3kvchSZgWP6d_io3DWLNzMNt620B12Lk",
   authDomain: "api-mock-2e3fa.firebaseapp.com",
   projectId: "api-mock-2e3fa",
   storageBucket: "api-mock-2e3fa.firebasestorage.app",
   messagingSenderId: "434065921365",
   appId: "1:434065921365:web:4bc54e6b09deefa62acbdc",
   measurementId: "G-XLGLYNC27B",
};
const vapidKey = "BCJ9QJt9ckStZSkwv-ep46Qvo1qAPmh-rTq-XjxDIv7Rwqg5qzLfmN1M_W8EI3O097jv4JJyBHZtUsr9-D3f_E8";

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

const firebase = {
   onMessage,
   app,
   vapidKey,
   messaging,
   swRegister,
   swUnregister,
   getDeviceToken,
};

export default firebase;

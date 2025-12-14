import * as admin from "firebase-admin";
import * as dotenv from "dotenv";
dotenv.config();

const serviceAccount = {
   type: "service_account",
   project_id: process.env.FIREBASE_PROJECT_ID,
   private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
   client_email: process.env.FIREBASE_CLIENT_EMAIL,
   client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
};

const sdk = {
   apiKey: process.env.FIREBASE_API_KEY,
   authDomain: `${process.env.FIREBASE_PROJECT_ID}.firebaseapp.com`,
   projectId: `${process.env.FIREBASE_PROJECT_ID}`,
   storageBucket: `${process.env.FIREBASE_PROJECT_ID}.firebasestorage.app`,
   messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
   appId: process.env.FIREBASE_APP_ID,
   vapidKey: process.env.FIREBASE_VAPIDKEY,
};

try {
   if (!admin.apps.length) {
      admin.initializeApp({
         credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
         databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`,
      });
   }
} catch (error) {
   if (!(error as Error).message.includes("already exists")) {
      console.error("Firebase admin initialization error", (error as Error).stack);
   }
}

const db = admin.firestore();
const messaging = admin.messaging;
const firebase = { db, admin, messaging };
export default firebase;
export { sdk };

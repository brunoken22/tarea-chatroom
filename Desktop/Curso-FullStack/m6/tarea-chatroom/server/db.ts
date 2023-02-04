import * as admin from "firebase-admin";
import * as serviceAccount from "./firebase.json";

admin.initializeApp({
   credential: admin.credential.cert(serviceAccount as any),
   databaseURL: "https://basededatos-59c93-default-rtdb.firebaseio.com",
});

const baseDeDatos = admin.firestore();
const rtdb = admin.database();

export { baseDeDatos, rtdb };

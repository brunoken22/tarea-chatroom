import firebase from "firebase";

const app = firebase.initializeApp({
   apiKey: "I1SHDX9ZdpXxy8QnhxMX2QA4kVPu1OxA4JLBAtFX",
   authDomain: "basededatos-59c93.firebaseapp.com",
   databaseURL: "https://basededatos-59c93-default-rtdb.firebaseio.com/",
});

const rtdb = firebase.database();
export { rtdb };

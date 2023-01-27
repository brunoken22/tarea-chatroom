import { rtdb } from "./db";
import map from "lodash/map";
const API_BASE_URL = "http://localhost:3000";

const state = {
   data: {
      name: "",
      message: [],
   },
   listeners: [],
   init() {
      const chatrooms = rtdb.ref("/messages/general");
      const currentState = this.getState();
      chatrooms.on("value", (snapshot) => {
         const valor = snapshot.val();
         const messageList = map(valor);
         console.log(messageList);
         currentState.message = messageList;
         this.setState(currentState);
      });
   },
   getState() {
      return this.data;
   },
   setName(name: string) {
      this.data.name = name;
   },
   setState(newState) {
      this.data = newState;
      for (let cb of this.listeners) {
         cb();
      }
   },
   pushMessage(message) {
      const nombreDelState = this.data.name;

      fetch(API_BASE_URL + "/messages", {
         method: "post",
         headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
         },
         body: JSON.stringify({
            nombre: nombreDelState,
            message: message,
         }),
      });
   },
   subscribe(cb) {
      this.listeners.push(cb);
   },
};

export { state };

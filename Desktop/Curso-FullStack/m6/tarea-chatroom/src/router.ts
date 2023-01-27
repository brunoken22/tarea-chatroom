import { Router } from "@vaadin/router";
const root = document.querySelector("#root");

const router = new Router(root);
router.setRoutes([
   { path: "/", component: "custom-inicio" },
   { path: "/chatroom", component: "custom-chatroom" },
]);

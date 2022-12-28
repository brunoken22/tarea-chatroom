import { state } from "./state";
import "./components/header";
import "./components/content-form";
import "./components/content-result";
import "./components/component-item";
import { initHomePage } from "./pages/home";
(function () {
   state.init();
   initHomePage(document.querySelector("#root")!);
})();

import { createApp } from "vue";
import App from "./App.vue";
import Router from "./router";

const app = createApp(App);

const init = async () => {
  app.use(Router()).mount("#app");
};

init();


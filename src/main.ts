import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import ConfigStore from "./store/StoreConfig";
import Router from "./router";
import getJson from "./service/getJson";

const pinia = createPinia(),
  app = createApp(App);

const init = async () => {
  const configStore = ConfigStore(pinia);
  //configStore.reset(await getJson("./json/config.json"));

  app.use(pinia).use(Router()).mount("#app");
};

init();

//Unused Code fragments
/*
import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";
import router from "./router/index";
import axios from "axios";
import { store } from "./store/index";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).mount("#app");

const http = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
});

const app = createApp(App)
  .use(router)
  .use(store)
  .provide("$store", store)
  .mount("#app");

export const chirper = {
  methods: {
    register() {
      const username = this.$store.state.registerUsername.trim();
      const password = this.$store.state.registerPassword.trim();
      const name = this.$store.state.registerName.trim();
      const email = this.$store.state.registerEmail.trim();

      if (username && password && name && email) {
        http
          .post("/register", {
            username,
            password,
            name,
            email,
          })
          .then((response) => {
            console.log(result.data);
            if (result.data) {
              this.$store.state.currentUser = result.data;
              localStorage.setItem("userId", result.data.username);
              this.$store.state.userId = result.data.username;
              this.$router.push({ path: "/home" });
              this.$store.state.registerUsernameModel = "";
              this.$store.state.registerPasswordModel = "";
              this.$store.state.registerNameModel = "";
              this.$store.state.registerEmailModel = "";
              this.$store.state.registerErrors = "";
              this.$store.state.registerPage = false;
            } else {
              this.$store.state.registerErrors = "This username is taken";
            }
          });
      } else {
        this.$store.state.registerErrors = "Please fill the all gaps";
      }
    },
  },
};
*/

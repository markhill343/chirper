import { defineStore } from "pinia";
import { reactive, computed } from "vue";

import type TAccount from "../type/TAccount";

import defaultAccount from "../model/defaultAccount";

import StoreConfig from "../store/StoreConfig";
import StoreSession from "../store/StoreSession";

import jwt_decode from "jwt-decode";

const StoreUser = defineStore(
  "user",

  () => {
    const storeConfig = StoreConfig(),
      config = storeConfig.config,
      paths = config.paths,
      user = reactive(defaultAccount()),
      storeSession = StoreSession(),
      session = storeSession.session,
      saveSessionInfo = storeSession.saveSessionInfo,
      reset = () => {
        storeSession.reset();
        Object.assign(user, defaultAccount());
      },
      register = async () => {
        const response = await fetch("http://localhost:8080/register", {
          methode: "POST",
          body: JSON.stringify(user),
        });
        saveSessionInfo(res);

        if (res.status === 201) {
          return login();
        }

        return res.status < 300;
      };

    return { user, register, reset };
  }
);

export default StoreUser;

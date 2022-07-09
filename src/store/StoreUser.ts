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
      };

    return user;
  }
);

export default StoreUser;

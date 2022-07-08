/*
 * @Author: Wolfgang Kowarschick <kowa@hs-augsburg.de>
 * @copyirght: 2016-2022 Wolfgang Kowarschick
 * @license: MIT
 */

import { defineStore } from "pinia";
import { reactive, computed } from "vue";

import type TAccount from "../type/TAccount";

import defaultAccount from "../model/defaultAccount";

import StoreConfig from "../store/StoreConfig";
import StoreSession from "../store/StoreSession";

import jwt_decode from "jwt-decode";

import { getJson, postJson, patchJson, deleteJson } from "../service/rest";

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
        const res = await postJson(null, paths.register, user);
        saveSessionInfo(res);

        //if (res.status === 201) {
        //  return login();
        //}

        return res.status < 300;
      };

    return { user, register, reset };
  }
);

export default StoreUser;

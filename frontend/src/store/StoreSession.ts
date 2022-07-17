import { defineStore } from "pinia";
import { reactive } from "vue";

import StoreConfig from "../store/StoreConfig";

import defaultSession from "../model/defaultSession";
import type TStringRecord from "../type/TStringRecord";
import type TErrorMessages from "../type/TErrorMessages";

import jwt_decode from "jwt-decode";

const StoreSession = defineStore(
  "session",

  () => {
    const storeConfig = StoreConfig(),
      config = storeConfig.config,
      constraintErrorMessages = reactive(
        config.constraintErrorMessages as TErrorMessages
      ),
      session = reactive(defaultSession()),
      reset = () => {
        Object.assign(session, defaultSession());
      },
      saveSessionInfo = (res: { token: string | null; data: Promise<any> }) => {
        const c_token = session.token;

        session.token = res.token;
        session.errorMessage =
          constraintErrorMessages[
            (res.data as unknown as TStringRecord).constraint ?? ""
          ];

        if (c_token != null && session.token == null) {
          reset();
        } // auto logout if no new token had be passed to the client

        if (session.token != null) {
          session.isAdmin = (
            jwt_decode(c_token ?? "") as { isAdmin: boolean }
          )?.isAdmin;
        }
        g;
      };

    return { session, reset, saveSessionInfo };
  }
);

export default StoreSession;

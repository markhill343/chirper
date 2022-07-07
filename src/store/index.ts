import { createApp } from "vue";
import { createStore } from "vuex";

export const store = createStore({
  state: {
    isLoading: true,

    registerUsernameModel: "",
    registerEmailModel: "",
    registerPasswordModel: "",
    registerNameModel: "",
    registerErrors: "",

    loginUsernameOrEmailModel: "",
    loginPasswordModel: "",
    loginErrors: null,
  },
});

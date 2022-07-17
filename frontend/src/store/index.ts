import { createStore } from "vuex";

const store = createStore({
  state: {
    isLoading: true,

    //Not used yet
    loginUsernameModel: "",
    loginPasswordModel: "",
    loginErrors: null,

    //Not used yet
    registerUsernameModel: "",
    registerEmailModel: "",
    registerPasswordModel: "",
    registerNameModel: "",
    registerErrors: "",

    //Not used yet
    newInfos: {
      name: "",
      mail: "",
      website: "",
      bio: "",
      location: "",
      profile_image: "",
      bannerImage: "",
    },

    //Not used yet
    newChirp: {
      text: "",
      image: "",
    },

    registerPage: false,

    addChirpPage: false,

    editProfilePopup: false,

    userId: localStorage.getItem("userId"),

    hashtagRegex: /(?<=[\s>]|^)#(\w*[A-Za-z_]+\w*)\b(?!;)/gi,

    usernameRegex: /(?<=[\s>]|^)@(\w*[A-Za-z_]+\w*)\b(?!;)/gi,

    repliedChirp: {},

    zoomedImage: "",

    currentUser: {},

    userForProfile: { username: String },

    chirpForDetail: {},

    bookmarks: {},

    chirps: [],
  },
});

export default store;

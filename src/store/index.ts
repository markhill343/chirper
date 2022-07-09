import { createApp } from "vue";
import { createStore } from "vuex";

export const store = createStore({
  state: {
    isLoading: true,

    loginUsername: "",
    loginPasswordModel: "",
    loginErrors: null,

    registerUsernameModel: "",
    registerEmailModel: "",
    registerPasswordModel: "",
    registerNameModel: "",
    registerErrors: "",

    newInfos: {
      name: "",
      mail: "",
      website: "",
      bio: "",
      location: "",
      profile_image: "",
      bannerImage: "",
    },

    newTweet: {
      text: "",
      image: "",
    },

    registerPage: false,
    addTweetPage: false,
    editProfilePopup: false,
    userId: localStorage.getItem("userId"),

    repliedTweet: {},

    zoomedImage: "",

    currentUser: {},

    userForProfile: {},

    tweetForDetail: {},

    bookmarks: {},

    tweets: [],
  },
});

import { createStore } from "vuex";

const store = createStore({
  state: {
    isLoading: true,

    loginUsernameModel: "",
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

    hashtagRegex: /(?:(?<=\s)|^)#(\w*[A-Za-z_ğüşıöçĞÜŞİÖÇ]+\w*)/gi,

    usernameRegex: /(?:(?<=\s)|^)@(\w*[A-Za-z_ğüşıöçĞÜŞİÖÇ]+\w*)/gi,

    repliedTweet: {},

    zoomedImage: "",

    currentUser: {},

    userForProfile: { username: String },

    tweetForDetail: {},

    bookmarks: {},

    tweets: [],
  },
});

export default store;

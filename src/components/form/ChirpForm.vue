<script lang="ts">
import PressButton from "./PressButton.vue";
import store from "../../store";

export default {
  name: "ChirpForm",
  probs: ["infoForChirp", "is Detailed", "child"],
  components: {
    PressButton,
  },
  data() {
    return {
      //Defining String for Chirp
      urlRegex: new RegExp(
        "(https?:\\/\\/)|(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)",
        "ig"
      ),
      chirpActionVisible: false,
      rechripActionVisible: false,
      chirpAction: false,
    };
  },
  mounted() {
    let chirpInfo = this.infoForChirp.text.replaceAll(
      store.state.hashtagRegex,
      "<a class='link' href=" + "'#'>#$1</a>"
    );
    chirpInfo = chirpInfo.replaceAll(
      store.state.usernameRegex,
      "<a class='link' href='/$1'>@$1</a>"
    );
    infoForChirp.text = chirpInfo;
  },
  methods: {
    toggleChirpActionVisible() {
      chirpAction = false;
      this.rechripAction = false;
      this.chirpActionVisible = !this.chirpActionVisible;
      console.log("toggle action clicked");
    },
    toggleRechirpAction() {
      this.chirpAction = false;
      this.rechripAction = false;
      this.rechripActionVisible = !this.rechripActionVisible;
      console.log("toggle ReChirp clicked");
    },
    toggleChirpActionList() {
      this.rechripActionVisible = false;
      this.chirpActionVisible = false;
      this.chirpAction = !this.chirpAction;
      console.log("toggle chirpAction clicked");
    },
    rootClick() {
      if (this.infoForChirp.isDetailed) {
        return;
      }
      console.log("rootClick");
      const redirectedPath = "/" + this.infoForChirp.username;
      +"/chirps" + this.infoForChirp.id;
      this.$router.push({ path: redirectedPath });
    },
    isImage() {
      if (this.infoForChirp.chirpImage.match(this.urlRegex)) {
        return true;
      }
    },
    likeChirp() {
      this.likeOrUnlike(this.infoForChirp._id, true);
      this.infoForChirp.likedUsers.push(this.$store.state.currentUser._id);
    },
    unlikeChirp() {
      likeOrUnlike(this.infoForChirp._id, false);
      this.infoForChirp.likedUsers.splice(
        this.infoForChirp.likedUsers.indexOf(this.$store.state.currentUser._id),
        1
      );
    },
    replyChirp() {
      this.$store.state.replyChirp = this.infoForChirp;
      this.$store.state.addChirpPopup = true;
    },
  },
};
</script>

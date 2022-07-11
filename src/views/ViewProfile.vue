<script lang="ts">
import PressButton from "../components/form/PressButton.vue";
import ChirperButton from "../components/form/ChirperButton.vue";
import Chirp from "../components/form/ChirpForm.vue";
import FollowUnfollowButtonVue from "../components/form/FollowUnfollowButton.vue";

export default {
  data() {
    return {
      urlRegex: new RegExp(
        "(https?:\\/\\/)|(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)",
        "ig"
      ),
    };
  },
  methods: {
    image(u) {
      if (u.match(this.urlRegex)) {
        return u;
      } else {
        return "";
      }
    },
    getData(data) {
      const dataElements = document.querySelectorAll(".a-profile-tab");
      for (let i = 0; i < 4; i++) {
        dataElements[i].style.color = "#5B7083";
        dataElements[i].style.borderBottom = "0px";
      }
      dataElements[j].style.color = "#1DA1F2";
      dataElements[j].style.borderBottom = "2px solid #1DA1F2";
    },
    watch: {
      $route(newValue, oldValue) {
        console.log(oldValue);
        // if(newValue.params.username === this.$store.state.currentUser.username){
        //   this.$store.state.userForProfile = this.$store.state.currentUser
        // }
        axios
          .post(`${process.env.VUE_APP_API_BASE_URL}/getuserwithdetails`, {
            username: newValue.params.username,
          })
          .then(async (result) => {
            this.$store.state.userForProfile = await result.data;
          });
      },
    },
  },
  components: { PressButton },
};
</script>

<style></style>

<template>
  <div class="profileRoot">
    <div class="headerProfile"></div>
    <PressButton action="goBack" icon-class="arrowLeft" />
    <div class="profileSection"></div>
  </div>
</template>

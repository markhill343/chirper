<script setup lang="ts">
import PressButton from "../components/form/PressButton.vue";
import ChirperButton from "../components/form/ChirperButton.vue";
import Chirp from "../components/form/ChirpForm.vue";
import FollowUnfollowButton from "../components/form/FollowUnfollowButton.vue";
import store from "../store";
import ChirperButton1 from "../components/form/ChirperButton.vue";
</script>

<style></style>

<template>
  <div class="profileRoot">
    <div class="headerProfile"></div>
    <PressButton action="goBack" icon-class="arrowLeft"> </PressButton>
    <span>
      <h1>{{ store.state.userForProfile.username }}</h1>
      <h2>{{ store.state.userForProfile }}</h2>
      <h5 class="user-chirp-count">
        <!--{{ store.state.currentUser.chirp.length }} chirp-->
      </h5>
    </span>
    <div class="profileSection">
      <div class="photo-and-buttons">
        <ChirperButton
          click-event="toggleEditProfilePopup"
          v-if="store.state.userForProfile.username === store.state.currentUser"
        ></ChirperButton>
        <span
          v-if="store.state.userForProfile.username !== store.state.currentUser"
          class="profile-buttons"
        >
          <ChirperButton> </ChirperButton>
          <ChirperButton> </ChirperButton>
          <FollowUnfollowButton></FollowUnfollowButton>
          <span>
            <ChirperButton></ChirperButton>
          </span>
        </span>
      </div>
    </div>

    <div class="profile-tabs">
      <div class="a-profile-tab">Chrips</div>
      <div class="a-profile-tab">Chrips & replies</div>
      <div class="a-profile-tab">Media</div>
      <div class="a-profile-tab">Likes</div>
    </div>
  </div>
</template>

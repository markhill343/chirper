<script setup lang="ts">
import PressButton from "../components/form/PressButton.vue";
import ChirperButton from "../components/form/ChirperButton.vue";
import Chirp from "../components/form/ChirpForm.vue";
import FollowUnfollowButton from "../components/form/FollowUnfollowButton.vue";
import store from "../store";



</script>

<style>

.photo-and-buttons{
  width: auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  height: auto;
}

.photo-and-buttons span.profile-buttons{
  width: auto;
  display: flex;
  justify-content: space-between;
}

.profile-img img{
  width: 132px;
  height: 132px;
  border-radius: 66px;
  padding: 0px;
  margin: 0px;
}

.profile-section{
  padding: 0px 5px;
  position: relative;
  bottom: 95px;
  border: 1px solid #bfbfbf;
  border-top: 0px;
  border-bottom: 0px;
}

.profile-tabs{
  width: 100%;
  height: 50px;
  display: flex;
  color: #5B7083;
}

.a-profile-tab{
  width: 25%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bolder;
}

.a-profile-tab:first-child{
  color: #1DA1F2;
  border-bottom: 2px solid #1DA1F2;
}

.a-profile-tab:nth-child(1){
  width: 24%;
}

.a-profile-tab:nth-child(2){
  width: 32%;
}

.a-profile-tab:nth-child(3){
  width: 22%;
}

.a-profile-tab:nth-child(4){
  width: 22%;
}

.a-profile-tab:hover{
  color: #1da1f2;
  background: #E8F5FE;
  cursor: pointer;
}
</style>

<template>
  <div class="profileRoot">
    <div class="headerProfile"></div>
    <PressButton action="goBack" icon-class="arrowLeft"> </PressButton>
    <span>
      <h1>User</h1>
      <h2>Peterlustig123</h2>
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
      <div class="a-profile-tab">Chirps</div>
      <div class="a-profile-tab">Chirps & replies</div>
      <div class="a-profile-tab">Media</div>
      <div class="a-profile-tab">Likes</div>
    </div>
  </div>
</template>

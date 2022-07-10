<script setup lang="ts">
import { getCurrentInstance } from "vue";
import { store } from "../../store";

const followOrUnfollow = async (follow: boolean) => {
  const currentUserId = store.state.currentUser,
    userIdToFollow = store.state.userForProfile,
    data = { currentUserId, userIdToFollow, follow };

  if (follow) {
    store.state.currentUser.following.push(store.state.userForProfile._id);
    store.state.userForProfile.followers.push(store.state.currentUser._id);
  } else {
    store.state.currentUser.following.splice(
      store.state.currentUser.following.indexOf(store.state.userForProfile._id),
      1
    );
    store.state.userForProfile.followers.splice(
      store.state.userForProfile.followers.indexOf(store.state.currentUser._id),
      1
    );
  }

  const response = await fetch("http://localhost:8080/followorunfollow", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((result) => {
    console.log("follow or unfollow result: " + result);
  });
};
</script>

<template>
  <div class="follow-unfollow-button-root">
    <button @click="followOrUnfollow(false)">
      <span class="first">Following</span>
      <span class="second">Follow</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance } from "vue";
import store from "../../store";

const followOrUnfollow = async (follow: boolean) => {
  const currentUserId = store.state.currentUser,
    userIdToFollow = store.state.userForProfile,
    data = { currentUserId, userIdToFollow, follow };

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
    <button @click="followOrUnfollow(true)">
      <span class="first">Following</span>
      <span class="second">unfollow</span>
    </button>
  </div>
</template>


<style scoped>

.follow-unfollow-button-root button .second{
  display: none;
}

.follow-unfollow-button-root button .second,
.follow-unfollow-button-root button .first{
  color: white;
}

.follow-unfollow-button-root button{
  width: 100px;
  height: 40px;
  border-radius: 20px;
  background: #1da1f2;
  outline: none;
  font-weight: bolder;
  font-size: 17px;
  transition: 300ms all;
  cursor: pointer;
  border: 0px;
}

.follow-unfollow-button-root button:hover{
  background: #CA2055;
}

.follow-unfollow-button-root button:hover .first{
  display: none;
}

.follow-unfollow-button-root button:hover .second{
  display: block;
}

</style>
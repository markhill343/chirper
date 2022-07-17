<script setup lang="ts">
import { computed } from "vue";

import StoreSession from "../../store/StoreSession";

import Textfield from "./TextField.vue";
import Checkbox from "./CheckBox.vue";

const props = defineProps({
    account: { type: Object, default: {} },
  }),
  storeSession = StoreSession(),
  session = storeSession.session,
  emit = defineEmits(["update:account", "enter"]),
  account = computed({
    get() {
      return props.account;
    },
    set(p_account) {
      return emit("update:account", p_account);
    },
  }),
  enter = () => emit("enter"),
  errorName = computed(() => session.errorMessage?.properties.includes("name")),
  errorUser = computed(() => session.errorMessage?.properties.includes("user")),
  errorEmail = computed(() =>
    session.errorMessage?.properties.includes("email")
  ),
  errorPassword = computed(() =>
    session.errorMessage?.properties.includes("password")
  );
</script>

<template>
  <Textfield
    label="Name"
    v-model:text="account.name"
    :error="errorName"
    @enter="enter"
    autofocus
  />
  <Textfield
    label="Benutzername"
    v-model:text="account.username"
    :error="errorEmail"
    @enter="enter"
  />
  <Textfield
    label="Passwort"
    v-model:text="account.password"
    :error="errorPassword"
    @enter="enter"
  />
  <Textfield
    label="Email"
    v-model:text="account.mail"
    :error="errorUser"
    @enter="enter"
  />
</template>

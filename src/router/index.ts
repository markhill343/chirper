import { createRouter, createWebHistory, type Router } from "vue-router";
import store from "../store/index";
import ViewHome from "../views/ViewHome.vue";
import ViewRegister from "../views/ViewRegister.vue";
import ViewProfile from "../views/ViewProfile.vue";

let l_router: Router | null = null;

//Checks if User is loggeg in
const isLogin = (a) => {
  if (localStorage.getItem("userId")) {
    a();
  } else a("/");
};

const router = () => {
  const routes = [
    {
      path: "/",
      component: ViewHome,
      meta: {
        title: "Chirper - Home",
      },
      beforeEnter: (to, from, next) => {
        if (store.state.userId) {
          next("/");
        } else {
          next();
        }
      },
    },
    {
      path: "/register",
      component: ViewRegister,
      meta: {
        title: "Chirper - Register",
      },
      beforeEnter: (to, from, next) => {
        if (store.state.userId) {
          next("/");
        } else {
          next();
        }
      },
    },
    {
      path: "/:username",
      component: ViewProfile,
      meta: {
        title: "User",
      },
      beforeEnter: async (to, from, next) => {
        if (localStorage.getItem("userId")) {
          if (to.params.username === store.state.userForProfile.username) {
            next();
          } else {
            store.state.isLoading = true;
            const username = to.params.username;
            fetch(`http://localhost:8080/getuserwithdetails`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(username),
            }).then(async (result) => {
              console.log(`here is user: ${result}`);
              if (!result) {
                next("/");
              }
              store.state.userForProfile = await result;
              store.state.isLoading = false;
              next();
            });
          }
        } else {
          next("/");
        }
      },
    },
  ];

  if (l_router == null) {
    l_router = createRouter({ history: createWebHistory(), routes });
  }
  return l_router;
};

export default router;

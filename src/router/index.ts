import { createRouter, createWebHistory, type Router } from "vue-router";
import { store } from "../store/index";
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
          next("/home");
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
          next("/home");
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
            fetch(`http://localhost:8080/getuserwithdetails`, {
              username: to.params.username,
            }).then(async (result) => {
              console.log(`here is user: ${result.data}`);
              if (!result.data) {
                next("/");
              }
              store.state.userForProfile = await result.data;
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

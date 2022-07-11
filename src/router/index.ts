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
      path: "/profile",
      component: ViewProfile,
      meta: {
        title: "User",
      },
      beforeEnter: async (to, next) => {
        console.log(localStorage.getItem("currentUser"));
        if (localStorage.getItem("currentUser")) {
          console.log("toparams", to.params.username);
          if (to.params.username === store.state.currentUser) {
            next();
          } else {
            store.state.isLoading = true;
            const username = localStorage.getItem("currentUser"),
              data = { username };
            console.log("username", username);
            const reply = async () => {
              const response = await fetch(
                "http://localhost:8080/getuserwithdetails",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(data),
                }
              ).then(async (result) => {
                const data = JSON.parse(await result.text());
                console.log(`here is user: ${data.username}`);
                if (result.ok) {
                  console.log("lets goo!");
                  next("/");
                }
                store.state.currentUser = await data.username;
                store.state.isLoading = false;
                next("");
              });
            };
            reply();
          }
        } else {
          next("next");
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

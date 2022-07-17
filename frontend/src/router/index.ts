import { createRouter, createWebHistory, type Router } from "vue-router";
import store from "../store/index";
import ViewHome from "../views/ViewHome.vue";
import ViewRegister from "../views/ViewRegister.vue";
import ViewProfile from "../views/ViewProfile.vue";
import { user } from "../../../backend/src/models/user";

let l_router: Router | null = null;

//Checks if User is logged in
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
        title: "Chirper - Register",
      },
      beforeEnter: (to, from, next) => {
        if (store.state.userId == undefined) {
          next("/");
        } else {
          next("/register");
        }
      },
    },
    {
      path: "/register",
      component: ViewRegister,
      meta: {
        title: "Chirper - Register",
      },
    },
    {
      path: "/user",
      component: ViewProfile,
      meta: {
        title: "User",
      },
      beforeEnter: async (to, next) => {
        console.log("Retrieving user details for " + store.state.userForProfile.username);
        if (store.state.userForProfile.username) {
          if (true) {
            //next("user");
          } else {
            store.state.isLoading = true;
            const username = to.params.username,
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

                if (!result.ok) {
                  next("/");
                }
                store.state.userForProfile = await data;
                store.state.isLoading = false;
                console.log(
                  "Found user details for " +
                    store.state.userForProfile.username
                );

                next();
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

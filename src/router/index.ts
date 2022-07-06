import { createRouter, createWebHistory, type Router } from "vue-router";
import StoreUser from "../store/StoreUser";
import HomeView from "../views/HomeView.vue";

let l_router: Router | null = null;

const router = () => {
  const storeUser = StoreUser(),
    routes = [
      {
        path: "/",
        name: "home",
        component: HomeView,
      },
      {
        path: "/about",
        name: "about",
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import("../views/AboutView.vue"),
      },
      {
        path: "/login",
        name: "login",
        component: () => import("../views/LoginView.vue"),
      },
    ];

  if (l_router == null) {
    l_router = createRouter({ history: createWebHistory(), routes });
  }
  return l_router;
};

export default router;

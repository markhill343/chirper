import { createRouter, createWebHistory, type Router } from "vue-router";
import StoreUser from "../store/StoreUser";
import ViewHome from "../views/ViewHome.vue";

let l_router: Router | null = null;

const router = () => {
  const storeUser = StoreUser(),
    routes = [
      {
        path: "/",
        component: ViewHome,
      },
      { path: "/login", component: () => import("../views/ViewLogin.vue") },
      {
        path: "/register",
        component: () => import("../views/ViewRegister.vue"),
      },
    ];

  if (l_router == null) {
    l_router = createRouter({ history: createWebHistory(), routes });
  }
  return l_router;
};

export default router;

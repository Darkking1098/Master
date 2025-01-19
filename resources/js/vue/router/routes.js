import { createRouter, createWebHistory } from "vue-router";
import UserRoutes from "../user/routes";
import AdminRoutes from "../admin/routes";

export default createRouter({
    history: createWebHistory(),
    routes: [...UserRoutes, ...AdminRoutes],
});

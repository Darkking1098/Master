import { createRouter, createWebHistory } from "vue-router";
import Userroutes from "../user/routes";

export default createRouter({
    history: createWebHistory(),
    routes: [...Userroutes],
});

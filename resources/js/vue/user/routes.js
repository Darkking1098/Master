import MainLayout from "./layout.vue";
import Pages from "./Pages/pages.js";

const routes = [
    {
        path: "",
        component: Pages.INDEX,
    },
    {
        path: "/about",
        component: Pages.ABOUT,
    },
];

export default [
    {
        path: "/",
        component: MainLayout,
        children: routes,
    },
];

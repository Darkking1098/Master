import layout from "./layout.vue";
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
        path: "/admin/",
        component: layout,
        children: routes,
    },
];

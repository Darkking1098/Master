<template>
    <aside class="mu-sidebar">
        <router-link to="/" class="brand mu-link asc">
            <img src="/public/mantis/images/logo.png" alt="" />
        </router-link>
        <nav class="prime_nav cflex">
            <component
                :is="getComponent(item.type)"
                :item="item"
                v-for="(item, index) in menu.visible_items"
                :key="index"
            />
        </nav>
        <nav class="sec_nav rflex"></nav>
    </aside>
</template>
<script>
import axios from "axios";
import Group from "./sidebar/group.vue";
import Page from "./sidebar/page.vue";
import Divider from "./sidebar/divider.vue";

export default {
    name: "sidebar",
    props: {
        type: {
            type: String,
            default: "user",
        },
        items: {
            type: Array,
            default: [],
        },
    },
    data() {
        return {
            menu: { items: [] },
        };
    },
    mounted() {
        this.fetchMenu();
    },
    methods: {
        fetchMenu() {
            axios
                .get("/api/menu/" + this.type)
                .then((response) => {
                    this.menu = response.data.menu;
                    console.log(this.menu);
                })
                .catch((error) => {
                    console.error(
                        "There was an error fetching the menu:",
                        error
                    );
                });
        },
        getComponent(type) {
            return {
                page: Page,
                divider: Divider,
                group: Group,
            }[type];
        },
    },
};
</script>
<style>
@import url("/public/mantis/css/components/sidebar.css");
</style>

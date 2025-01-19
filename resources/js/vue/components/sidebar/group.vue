<template>
    <li class="menu-item menu-group active">
        <span class="mu-link menu-link">
            <i :class="item.icon"></i> <span>{{ item.title }}</span>
            <i class="fa-solid fa-chevron-down" style="margin-left: auto"></i>
        </span>
        <ul class="active">
            <Page
                v-for="sub_item of item.visible_items"
                :item="sub_item"
                :key="sub_item.id"
            />
        </ul>
    </li>
</template>
<script>
import Page from "./page.vue";

export default {
    name: "sidebar-page",
    props: {
        item: "Array",
    },
    components: { Page },
    setup(props) {
        console.log(props);
    },
};
</script>

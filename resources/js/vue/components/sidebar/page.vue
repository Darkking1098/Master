<template>
    <li class="menu-item">
        <router-link :to="item.uri" class="mu-link menu-link">
            <i v-if="item.group_id" class="fa-solid fa-minus"></i>
            <i v-else :class="item.icon"></i>
            <span>{{ item.title }}</span>
        </router-link>
    </li>
</template>
<script>
export default {
    name: "sidebar-page",
    props: {
        item: "Array",
    },
};
</script>

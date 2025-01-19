<template>
    <div class="mu-layout mu-sidebar-layout rflex">
        <slot name="sidebar"></slot>
        <div class="main_wrapper cflex fg">
            <slot name="header"></slot>
            <router-view></router-view>
            <slot name="footer"></slot>
        </div>
    </div>
</template>
<script>
export default {
    name: "sidebar-layout",
};
</script>
<style>
@import url("/public/mantis/css/layouts/base.css");
</style>

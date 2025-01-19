<template>
    <slot name="header"></slot>
    <router-view></router-view>
    <slot name="footer"></slot>
</template>
<script>
export default {
    name: "basic-layout",
};
</script>
<style>
@import url("/public/mantis/css/layouts/base.css");
</style>

<template>
    <header class="rflex jcsb aic">
        <h6>header</h6>
        <nav class="rflex">
            <router-link to="/" class="mu-link">Home</router-link>
            <router-link to="about" class="mu-link">About Us</router-link>
        </nav>
    </header>
</template>
<script>
export default {
    name: "header-comp",
};
</script>
<style scoped>
@import url("/public/css/components/header.css");
</style>

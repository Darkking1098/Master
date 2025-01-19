<template>
    <HeaderComp />
    <router-view></router-view>
    <FooterComp />
</template>
<script>
import HeaderComp from "./components/header/comp.vue";
import FooterComp from "./components/footer/comp.vue";

export default {
    name: "user-layout",
    components: {
        HeaderComp,
        FooterComp,
    },
};
</script>

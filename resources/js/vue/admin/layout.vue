<template>
    <SidebarLayout>
        <template #sidebar>
            <SidebarComp />
        </template>
        <template #header>
            <HeaderComp />
        </template>
        <template #footer>
            <FooterComp />
        </template>
    </SidebarLayout>
</template>
<script>
import SidebarComp from "./components/sidebar/comp.vue";
import HeaderComp from "./components/header/comp.vue";
import FooterComp from "./components/footer/comp.vue";
import SidebarLayout from "../components/Layouts/sidebar.vue";

export default {
    name: "admin-layout",
    components: {
        SidebarComp,
        SidebarLayout,
        HeaderComp,
        FooterComp,
    },
};
</script>

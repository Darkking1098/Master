<template>
    <div class="mu-paginate rflex">
        <router-link class="page-link first">
            <i class="fa-solid fa-chevrons-left"></i>
        </router-link>
        <router-link class="page-link previous">
            <i class="fa-solid fa-chevron-left"></i>
        </router-link>
        <div class="page-counts rflex">
            <span class="page-link">
                <i class="fa-solid fa-ellipsis"></i>
            </span>
            <router-link
                v-for="i in 10"
                :key="i"
                :to="'?page=' + i"
                class="page-link"
                >{{ i }}</router-link
            >
        </div>
        <router-link class="page-link next">
            <i class="fa-solid fa-chevron-right"></i>
        </router-link>
        <router-link class="page-link last">
            <i class="fa-solid fa-chevrons-right"></i>
        </router-link>
    </div>
</template>
<script>
export default {
    name: "paginate",
};
</script>
<style>
@import url("/public/mantis/css/components/paginate.css");
</style>

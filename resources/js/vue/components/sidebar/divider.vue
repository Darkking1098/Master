<template>
    <div class="mu-divider aic">
        <i class="hr"></i>
        <span>{{ item.title }}</span>
        <i class="hr"></i>
    </div>
</template>
<script>
export default {
    name: "sidebar-divider",
    props: {
        item: "Array",
    },
};
</script>

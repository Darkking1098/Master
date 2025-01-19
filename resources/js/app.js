const APP_TYPE = import.meta.env.VITE_APP_TYPE || "react";

if (APP_TYPE === "react") {
    import("./react/index");
} else if (APP_TYPE === "vue") {
    import("./vue/index");
}

import { defineConfig, loadEnv } from "vite";
import laravel from "laravel-vite-plugin";

// Use an environment variable to determine the frontend framework

export default defineConfig(async ({ mode }) => {
    const env = loadEnv(mode, process.cwd());

    const APP_TYPE = env.VITE_APP_TYPE || "react";

    // Dynamically import the plugin based on the condition
    const frameworkPlugin =
        APP_TYPE == "vue"
            ? (await import("@vitejs/plugin-vue")).default
            : (await import("@vitejs/plugin-react")).default;

    let config = {
        plugins: [
            laravel({
                input: ["resources/css/app.css", "resources/js/app.js"],
                refresh: true,
            }),
            frameworkPlugin(),
        ],
    };

    config.esbuild = {
        loader: "jsx",
        include: ["resources/js/**/*.{js,jsx,ts,tsx}"],
        exclude: [],
    };
    config.optimizeDeps = {
        esbuildOptions: {
            loader: {
                ".js": "jsx",
            },
        },
    };

    config.resolve = {
        alias: {
            vue: "vue/dist/vue.esm-bundler.js",
        },
    };

    return config;
});

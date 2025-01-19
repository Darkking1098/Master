import { createApp } from "vue";
import router from "./router/routes";

const app = createApp({
    // This component can be empty or you can add specific logic here
    template: "<router-view></router-view>",
});

app.use(router); // Use Vue Router
app.mount("#root");

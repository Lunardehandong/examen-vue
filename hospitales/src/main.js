import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.js"; // <-- asegúrate de poner .js

createApp(App).use(router).mount("#app");

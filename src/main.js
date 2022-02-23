import { createApp } from "vue";
import App from "./App.vue";
import { createI18n } from "vue-i18n";

import router from "./router";
import axios from "axios";
import vuex from "./stores/index";
import "./assets/base.css";

// Languages import
import en from "@/locales/en.js";
import vi from "@/locales/vi.js";

const app = createApp(App);

const i18n = createI18n({
  locale: "en",
  messages: {
    en,
    vi,
  },
});

app.use(router).use(i18n).use(vuex);
app.config.globalProperties.$axios = axios.create({
  baseURL: `http://127.0.0.1:5000/`,
});

app.mount("#app");

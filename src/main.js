import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/assets/scss/tailwind.scss";
import "@/assets/libs/@mdi/font/css/materialdesignicons.min.css";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import ToastPlugin from "vue-toast-notification";
import "vue-toast-notification/dist/theme-bootstrap.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faPhone,
  faEnvelope,
  faIdCard,
  faUser,
  faMoneyCheckAlt,
  faChurch,
  faMapMarkerAlt,
  faCalendarAlt,
  faTimes,
  faCheckCircle
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faPhone,
  faEnvelope,
  faIdCard,
  faUser,
  faMoneyCheckAlt,
  faChurch,
  faMapMarkerAlt,
  faCalendarAlt,
  faTimes,
  faCheckCircle
);

createApp(App)
  .use(VueDatePicker)
  .use(store)
  .use(router)
  .use(ToastPlugin)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");

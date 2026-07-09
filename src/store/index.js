import { createStore } from "vuex";
import auth from "./modules/auth.module";
import VuexPersistence from "vuex-persist";
const vuexLocal = new VuexPersistence({
  paths: ["auth", "global"],
  storage: window.localStorage,
});

// Vue.use(Vuex);

export default createStore({
  modules: { auth },
  plugins: [vuexLocal.plugin],
});

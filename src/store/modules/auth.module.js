// src/store/modules/user.js
import GlobalService from "@/services/auth.service";

export default {
  state: {
    loading: false,
    error: null,
    token: localStorage.getItem("token") || null,
    user: JSON.parse(localStorage.getItem("user") || "null"),
  },
  getters: {
    getUserInfo: (state) => state.user,
    isUserLoading: (state) => state.loading,
    userError: (state) => state.error,
    isAuthenticated: (state) => !!state.token,
    // user: (state) => state.user,
  },
  mutations: {
    setLoading(state, loading) {
      state.loading = loading;
    },
    setError(state, error) {
      state.error = error;
    },
    SET_TOKEN(state, token) {
      state.token = token;
      localStorage.setItem("token", token);
    },
    SET_USER(state, user) {
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
    LOGOUT(state) {
      state.token = null;
      state.user = null;
      localStorage.clear();
    },
  },
  actions: {
    async adminRegister(_, credentials) {
      const data = await GlobalService.adminRegister(credentials);
      return data;
    },

    async register(_, credentials) {
      const data = await GlobalService.register(credentials);
      return data;
    },

    async login({ commit }, credentials) {
      const response = await GlobalService.login(credentials);
      const { token } = response.data;
      commit("SET_TOKEN", token);
      // commit("SET_USER", user);
      return response;
    },

    async getCurrentUser({ commit }) {
      const data = await GlobalService.getCurrentUser();
      commit("SET_USER", data.data);
      return data.data;
    },

    logout({ commit }) {
      commit("LOGOUT");
    },

    async getAllParticipants(_, credentials) {
      const data = await GlobalService.getAllParticipants(credentials);
      return data;
    },

    async getSingleParticipant(_, credentials) {
      const data = await GlobalService.getSingleParticipant(credentials);
      return data;
    },

    async confirmParticipantPayment(_, credentials) {
      const data = await GlobalService.confirmParticipantPayment(credentials);
      return data;
    },

    async updateParticipantStatus(_, credentials) {
      const data = await GlobalService.updateParticipantStatus(credentials);
      return data.data;
    },

    async deleteParticipant(_, credentials) {
      const data = await GlobalService.deleteParticipant(credentials);
      return data;
    },

    async initializePayment(_, credentials) {
      const data = await GlobalService.initializePayment(credentials);
      return data;
    },

    async verifyPayment(_, credentials) {
      const data = await GlobalService.verifyPayment(credentials);
      return data;
    },
  },
};

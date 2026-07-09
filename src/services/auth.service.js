import { axiosInstance } from "@/utils/axios";

class GlobalService {
  async adminRegister(payload) {
    return await axiosInstance.post("/api/auth/register/admin", payload);
  }

  async register(payload) {
    return await axiosInstance.post("/api/auth/register/participant", payload);
  }

  async login(payload) {
    return await axiosInstance.post("/api/auth/login", payload);
  }

  async getCurrentUser() {
    return await axiosInstance.get("/api/auth/me");
  }

  async verifyParticipant(registrationCode) {
    return await axiosInstance.get(`/api/auth/verify-code/${registrationCode}`);
  }

  async getAllParticipants(payload) {
    return await axiosInstance.get(
      `/api/participants/?page=${payload.page}&userType=${payload.userType}&archdeaconry=${payload.archdeaconry}&status=${payload.status}`
    );
  }

  async getSingleParticipant(userId) {
    return await axiosInstance.get(`/api/participants/${userId}`);
  }

  async confirmParticipantPayment(id) {
    return await axiosInstance.post(`/api/participants/confirm-payment/${id}`);
  }

  async updateParticipantStatus(payload) {
    return await axiosInstance.patch(`/api/participants/${payload.id}/status`, {status: payload.status});
  }

   async deleteParticipant(id) {
    return await axiosInstance.delete(`/api/participants/${id}`);
  }

  async initializePayment(payload) {
    return await axiosInstance.post("/api/flutterwave/initialize", payload);
  }

  async verifyPayment(reference) {
    return await axiosInstance.get(`/api/flutterwave/verify/${reference}`);
  }
}

export default new GlobalService();

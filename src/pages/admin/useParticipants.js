import { ref } from "vue";
import { useStore } from "vuex";
import { useToast } from "vue-toast-notification";
import { useRoute } from "vue-router";

export default function useParticipants() {
  const store = useStore();
  const toast = useToast();
  const route = useRoute();

  const participants = ref([]);
  const singleParticipant = ref();
  const isLoading = ref(false);
  const currentPage = ref(1);
  const totalPages = ref(1);
  const filters = ref({
    userType: "",
    archdeaconry: "",
    status: "",
  });

  const getParticipants = async () => {
    try {
      isLoading.value = true;
      const res = await store.dispatch("getAllParticipants", {
        page: currentPage.value,
        userType: filters.value.userType || "",
        archdeaconry: filters.value.archdeaconry || "",
        status: filters.value.status || "",
      });
      participants.value = res.data.data;
      totalPages.value = res.data.pagination?.pages || 1;
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong. Please try again.",
        {
          position: "top-right",
          duration: 5000,
        }
      );
    } finally {
      isLoading.value = false;
    }
  };

  const getSingleParticipant = async () => {
    if (route.params.id) {
      try {
        isLoading.value = true;
        const userId = route.params.id;
        const res = await store.dispatch("getSingleParticipant", userId);
        singleParticipant.value = res.data.data;
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "Something went wrong. Please try again.",
          {
            position: "top-right",
            duration: 5000,
          }
        );
      } finally {
        isLoading.value = false;
      }
    } else {
      singleParticipant.value = null;
    }
  };

  return {
    participants,
    singleParticipant,
    isLoading,
    currentPage,
    filters,
    getParticipants,
    getSingleParticipant,
    totalPages,
  };
}

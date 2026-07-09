<!-- eslint-disable vue/html-self-closing -->
<template>
  <section
    class="md:h-screen py-20 flex items-center relative overflow-hidden zoom-image"
  >
    <!-- Background -->
    <div
      class="absolute inset-0 image-wrap z-1 bg-[url('../../assets/images/bg/mashup.jpg')] bg-no-repeat bg-center bg-cover"
    />
    <div
      id="particles-snow"
      class="absolute inset-0 z-2"
    />

    <!-- Form Container -->
    <div class="container relative z-3">
      <div class="flex justify-center">
        <div
          class="max-w-[500px] w-full m-auto p-6 bg-white dark:bg-slate-900 shadow-md dark:shadow-gray-700 rounded-md overflow-y-auto max-h-[90vh]"
        >
          <router-link to="/">
            <img
              src="../../../assets/images/doylogo.png"
              class="mx-auto w-28 h-28"
              alt="Logo"
            />
          </router-link>

          <h5 class="my-6 text-xl font-semibold text-center">
            Register
          </h5>

          <form
            class="text-start"
            @submit.prevent="handleSubmit"
          >
            <div class="grid grid-cols-1 gap-4">
              <!-- User Type -->
              <div>
                <label
                  class="font-semibold"
                  for="userType"
                >I'm registering as:</label>
                <select
                  id="userType"
                  v-model="userInfo.userType"
                  class="mt-3 w-full py-2 px-3 h-10 bg-transparent border dark:border-gray-800 rounded focus:ring-0"
                >
                  <option
                    disabled
                    value=""
                  >
                    Select option
                  </option>
                  <option value="camper">
                    Participant
                  </option>
                  <option value="chaplain">
                    Chaplain
                  </option>
                </select>
              </div>

              <!-- Title -->
              <div>
                <label
                  class="font-semibold"
                  for="title"
                >Title:</label>
                <select
                  id="title"
                  v-model="userInfo.title"
                  class="mt-3 w-full py-2 px-3 h-10 bg-transparent border dark:border-gray-800 rounded focus:ring-0"
                >
                  <option
                    disabled
                    value=""
                  >
                    Select Title
                  </option>
                  <option
                    v-for="item in titles"
                    :key="item.key"
                    :value="item.key"
                  >
                    {{ item.value }}
                  </option>
                </select>
              </div>

              <!-- Firstname -->
              <div>
                <label
                  class="font-semibold"
                  for="firstName"
                >Firstname:</label>
                <input
                  id="firstName"
                  v-model="userInfo.firstName"
                  type="text"
                  class="mt-3 w-full py-2 px-3 h-10 bg-transparent border dark:border-gray-800 rounded focus:ring-0"
                  placeholder="John"
                />
              </div>

              <!-- Lastname -->
              <div>
                <label
                  class="font-semibold"
                  for="surname"
                >Lastname:</label>
                <input
                  id="surname"
                  v-model="userInfo.surname"
                  type="text"
                  class="mt-3 w-full py-2 px-3 h-10 bg-transparent border dark:border-gray-800 rounded focus:ring-0"
                  placeholder="Doe"
                />
              </div>

              <!-- Other Name -->
              <div>
                <label
                  class="font-semibold"
                  for="otherName"
                >Other Name:</label>
                <input
                  id="otherName"
                  v-model="userInfo.otherName"
                  type="text"
                  class="mt-3 w-full py-2 px-3 h-10 bg-transparent border dark:border-gray-800 rounded focus:ring-0"
                  placeholder="Harry"
                />
              </div>

              <!-- Email -->
              <div>
                <label
                  class="font-semibold"
                  for="email"
                >Email Address:</label>
                <input
                  id="email"
                  v-model="userInfo.email"
                  type="email"
                  class="mt-3 w-full py-2 px-3 h-10 bg-transparent border dark:border-gray-800 rounded focus:ring-0"
                  placeholder="name@example.com"
                />
              </div>

              <!-- Phone Number -->
              <div>
                <label
                  class="font-semibold"
                  for="phoneNumber"
                >Phone Number:</label>
                <input
                  id="phoneNumber"
                  v-model="userInfo.phoneNumber"
                  type="text"
                  class="mt-3 w-full py-2 px-3 h-10 bg-transparent border dark:border-gray-800 rounded focus:ring-0"
                  placeholder="080********"
                />
              </div>

              <!-- Archdeaconry -->
              <div>
                <label
                  class="font-semibold"
                  for="archdeaconry"
                >Archdeaconry:</label>
                <select
                  id="archdeaconry"
                  v-model="userInfo.archdeaconry"
                  class="mt-3 w-full py-2 px-3 h-10 bg-transparent border dark:border-gray-800 rounded focus:ring-0"
                  @change="updateParishes"
                >
                  <option
                    disabled
                    value=""
                  >
                    Select Archdeaconry
                  </option>
                  <option
                    v-for="arch in archdeaconries"
                    :key="arch"
                    :value="arch"
                  >
                    {{ arch }}
                  </option>
                </select>
              </div>

              <!-- Parish -->
              <div v-if="availableParishes.length">
                <label
                  class="font-semibold"
                  for="parish"
                >Parish:</label>
                <select
                  id="parish"
                  v-model="userInfo.parish"
                  class="mt-3 w-full py-2 px-3 h-10 bg-transparent border dark:border-gray-800 rounded focus:ring-0 disabled:cursor-not-allowed"
                  :disabled="!availableParishes.length"
                >
                  <option
                    disabled
                    value=""
                  >
                    Select Parish
                  </option>
                  <option
                    v-for="parish in availableParishes"
                    :key="parish"
                    :value="parish"
                  >
                    {{ parish }}
                  </option>
                </select>
              </div>

              <!-- DOB -->
              <div v-if="userInfo.userType === 'camper'">
                <label
                  class="form-label font-medium text-slate-900 dark:text-white"
                >Date of Birth:</label>
                <div class="relative mt-2">
                  <VueDatePicker
                    v-model="userInfo.dob"
                    class="dp__theme_dark"
                    :format="format"
                    :enable-time-picker="false"
                    :max-date="maxDob"
                    placeholder="Select DOB"
                    text-input
                  />
                </div>
              </div>

              <!-- Image Upload -->
              <div>
                <label
                  class="font-semibold"
                  for="photo"
                >Upload Photo:</label>
                <input
                  id="photo"
                  type="file"
                  accept="image/*"
                  class="mt-3 block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                  @change="handleImageUpload"
                />
                <div
                  v-if="userInfo.photo"
                  class="mt-4"
                >
                  <img
                    :src="photoPreview"
                    alt="Preview"
                    class="w-32 h-32 object-cover rounded-full mx-auto"
                  />
                </div>
              </div>

              <!-- Accept Terms -->
              <div class="flex items-center">
                <input
                  id="acceptTerms"
                  type="checkbox"
                  class="form-checkbox rounded border-gray-300 text-red-500 focus:ring-0 mr-2"
                  :checked="userInfo.acceptTerms"
                  @change="handleCheckboxChange"
                />
                <label
                  for="acceptTerms"
                  class="text-slate-400"
                >
                  I Accept
                  <button
                    type="button"
                    class="text-red-500 underline"
                    @click="showModal = true"
                  >
                    Terms And Conditions
                  </button>
                </label>
              </div>

              <!-- Submit Button -->
              <div>
                <button
                  type="submit"
                  class="py-2 px-5 w-full bg-red-500 text-white rounded-md tracking-wide text-base hover:bg-red-600 transition-all"
                >
                  Continue to payment
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- Terms Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div
        class="bg-white dark:bg-slate-800 rounded-md p-6 w-full max-w-lg shadow-lg"
      >
        <h3 class="text-lg font-bold mb-4 text-center">
          Youth Summer Conference Disclaimer and <br />
          Code of Conduct Agreement
        </h3>
        <div
          class="text-sm text-black dark:text-white max-h-60 overflow-y-auto"
        >
          <p>
            By registering for and participating in the Lagos Diocese Youth
            Conference, all attendees acknowledge and agree to abide by the
            rules and regulations set forth by the conference organizers. The
            conference is strictly for individuals aged 18 and above, ensuring
            that all participants are legally responsible for their actions.
          </p>
          <div>
            <h4 class="text-base font-bold mt-3">
              Responsibility & Conduct:
            </h4>
            <ol class="list-decimal pl-5 leading-6">
              <li>
                ⁠Participants are expected to conduct themselves in a respectful
                and disciplined manner throughout the duration of the
                conference.
              </li>
              <li>
                ⁠Any behavior that violates conference guidelines, including but
                not limited to misconduct, damage to property, or engagement in
                prohibited activities, is the sole responsibility of the
                participant involved.
              </li>
              <li>
                ⁠The conference organizers, officials, Youth Directorate and the
                Diocese of Lagos will not be held liable for any actions taken
                by a participant that contravene the established rules.
              </li>
            </ol>
          </div>
          <div>
            <h4 class="text-base font-bold mt-3">
              Compliance with Conference Guidelines:
            </h4>
            <ul class="list-disc pl-5 leading-6">
              <li>
                ⁠All participants must adhere to the guidelines provided before
                and during the conference.
              </li>
              <li>
                ⁠Any participant found violating these guidelines may face
                disciplinary action, including dismissal from the conference
                without a refund.
              </li>
              <li>
                ⁠Local laws and regulations must be observed at all times.
              </li>
            </ul>
          </div>
          <div class="mt-4">
            <p>
              By proceeding with registration, participants confirm their
              understanding and acceptance of this disclaimer. They acknowledge
              that failure to comply with the rules may result in appropriate
              consequences as determined by the conference authorities.
              <br />
              For further inquiries, please contact the conference
              administration.
              <a
                href="mailto:youthdirectoratedioceseoflagos@gmail.com?subject=Youth%20Conference%20Enquiry"
                class="underline text-blue-600"
                target="_blank"
              >
                youthdirectoratedioceseoflagos@gmail.com
              </a>
            </p>
          </div>
        </div>
        <div class="mt-4 text-right">
          <button
            class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            @click="acceptTerms"
          >
            Accept
          </button>
        </div>
      </div>
    </div>

    <!-- Loader Overlay -->
    <div
      v-if="isLoading"
      class="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
    >
      <div class="loader" />
    </div>

    <switcher :switcher-back="false" />
  </section>
</template>

<script setup>
import feather from "feather-icons";
import switcher from "@/components/switcher.vue";
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import archdeaconryData from "@/assets/data/archdeaconries.json";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const store = useStore();
const toast = useToast();
const router = useRouter();

const titles = ref([
  { key: "Miss", value: "Miss" },
  { key: "Mr", value: "Mr" },
  { key: "Mrs", value: "Mrs" },
  { key: "Dr", value: "Dr" },
  { key: "Engr", value: "Engr" },
  { key: "Prof", value: "Prof" },
  { key: "Rev", value: "Reverend" },
  { key: "Canon", value: "Canon" },
  { key: "Ven", value: "Venerable" },
]);
const photoPreview = ref("");
const isLoading = ref(false);
const userInfo = ref({
  userType: "",
  title: "",
  firstName: "",
  surname: "",
  otherName: "",
  email: "",
  phoneNumber: "",
  archdeaconry: "",
  parish: "",
  acceptTerms: false,
  photo: "",
});
const archdeaconries = ref([]);
const availableParishes = ref([]);
const showModal = ref(false);

const maxDob = computed(() => new Date(2009, 11, 31)); // December 31, 2009

const updateParishes = () => {
  if (userInfo.value.archdeaconry === "Other Denominations") {
    availableParishes.value = [];
    userInfo.value.parish = "Other Church";
  } else {
    const selected = archdeaconryData.find(
      (item) => item.archdeaconry === userInfo.value.archdeaconry
    );
    availableParishes.value = selected ? selected.parishes : [];
    userInfo.value.parish = "";
  }
};

const handleCheckboxChange = () => {
  // Don't allow checking directly — enforce modal first
  userInfo.value.acceptTerms = false;
  showModal.value = true;
};

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    if (file.size > 10 * 1024 * 1024) {
      alert("Image size must not exceed 10MB.");
      event.target.value = ""; // Clear the file input to prevent selecting the image
      return;
    }
    userInfo.value.photo = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      photoPreview.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const acceptTerms = () => {
  userInfo.value.acceptTerms = true;
  showModal.value = false;
};

const handleSubmit = async () => {
  const requiredFields = [
    "userType",
    "title",
    "firstName",
    "surname",
    "otherName",
    "email",
    "phoneNumber",
    "archdeaconry",
  ];

  // Only require parish if archdeaconry is not "Other Denomination"
  if (userInfo.value.archdeaconry !== "Other Denominations") {
    requiredFields.push("parish");
  }

  // Check for missing fields (excluding acceptTerms)
  const missingField = requiredFields.find((field) => !userInfo.value[field]);
  if (missingField) {
    toast.error(`Please fill the ${missingField} field.`, {
      position: "top-right",
      duration: 5000,
    });
    return;
  }

  // Explicitly check acceptTerms
  if (!userInfo.value.acceptTerms) {
    toast.error("Please accept the Terms and Conditions.", {
      position: "top-right",
      duration: 5000,
    });
    return;
  }

  // Camper must have DOB
  if (userInfo.value.userType === "camper" && !userInfo.value.dob) {
    toast.error("Please select your Date of Birth.", {
      position: "top-right",
      duration: 5000,
    });
    return;
  }

  // Image upload is required
  if (!userInfo.value.photo) {
    toast.error("Please upload your photo.", {
      position: "top-right",
      duration: 5000,
    });
    return;
  }

  try {
    isLoading.value = true;
    await registerUser();
  } catch (error) {
    isLoading.value = false;
    toast.error(
      error.response?.data?.message ||
        "Something went wrong. Please try again.",
      {
        position: "top-right",
        duration: 5000,
      }
    );
  }
};
const registerUser = async () => {
  try {
    isLoading.value = true;
    const formData = new FormData();

    Object.entries(userInfo.value).forEach(([key, value]) => {
      if (key !== "acceptTerms") {
        formData.append(key, value);
      }
    });

    const regRes = await store.dispatch("register", formData);
    if (regRes.data.message) {
      router.push("/signup-success");
    }
  } catch (error) {
    toast.error(error.response.data.message, {
      position: "top-right",
      duration: 5000,
    });
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  feather.replace();
  archdeaconries.value = archdeaconryData.map((item) => item.archdeaconry);
});
</script>

<style scoped>
/* Custom Loader */
.loader {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #dc2626;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

<!-- eslint-disable vue/html-self-closing -->
<template>
  <div>
    <tagline />
    <navbar
      :menu-light="'nav-light'"
      :tag-line="'tagline-height'"
      :nav-light="true"
      :search-menu="''"
    />

    <!-- Hero Banner -->
    <!-- <section
      class="relative py-28 md:py-36 bg-cover bg-center"
      :style="{ backgroundImage: `url(${heroBg})` }"
    >
      <div class="absolute inset-0 bg-deep-navy/80" />
      <div class="container relative z-10 text-center">
        <p class="text-ldyc-gold font-semibold uppercase tracking-[4px] text-sm mb-4">
          Ignite 2026
        </p>
        <h1 class="font-poppins font-black text-white text-4xl md:text-5xl lg:text-6xl">
          Register Now
        </h1>
        <p class="text-white/80 max-w-xl mx-auto mt-4">
          Secure your place at the most anticipated youth event in the Diocese of Lagos.
        </p>
      </div>
    </section> -->

    <!-- Form Container -->
    <section class="relative py-16 md:py-20 bg-off-white dark:bg-slate-900">
      <div class="container">
        <div class="flex justify-center">
          <div
            class="w-full m-auto p-6 md:p-10 bg-white dark:bg-slate-800 shadow-xl rounded-3xl transition-all duration-300"
            :class="participants.length ? 'max-w-5xl' : 'max-w-[650px]'"
          >
            <router-link to="/">
              <img
                src="../../../assets/images/doylogo.png"
                class="mx-auto w-24 h-24"
                alt="Logo"
              />
            </router-link>

            <h2 class="mt-6 mb-2 font-poppins font-bold text-2xl text-center text-black dark:text-white">
              Create Your Account
            </h2>
            <p class="mb-8 text-center text-sm text-slate-500 dark:text-slate-400">
              ₦15,000 per participant. You can register more than one person in a single payment.
            </p>

            <form
              class="text-start"
              @submit.prevent="handleSubmit"
            >
              <!-- Payer Email -->
              <div class="mb-6 p-4 bg-ldyc-blue/5 border border-ldyc-blue/20 rounded-xl">
                <label
                  class="font-semibold text-black dark:text-white text-sm"
                  for="payerEmail"
                >Payer Email Address (for payment receipt):</label>
                <input
                  id="payerEmail"
                  v-model="payerEmail"
                  type="email"
                  class="mt-2 w-full py-2.5 px-4 h-11 bg-transparent border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-ldyc-blue focus:border-ldyc-blue transition-colors"
                  placeholder="name@example.com"
                />
              </div>

              <div
                class="grid grid-cols-1 gap-8 items-start"
                :class="participants.length ? 'lg:grid-cols-[1fr_300px]' : ''"
              >
                <!-- Current Participant Form -->
                <div class="border border-gray-200 dark:border-gray-700 rounded-2xl p-5">
                  <h3 class="font-poppins font-semibold text-black dark:text-white mb-4">
                    Participant Details
                  </h3>

                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <!-- User Type -->
                    <div>
                      <label
                        class="font-semibold text-black dark:text-white text-sm"
                        for="userType"
                      >I'm registering as:</label>
                      <select
                        id="userType"
                        v-model="currentParticipant.userType"
                        class="mt-2 w-full py-2.5 px-4 h-11 bg-transparent border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-ldyc-blue focus:border-ldyc-blue transition-colors"
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
                        class="font-semibold text-black dark:text-white text-sm"
                        for="title"
                      >Title:</label>
                      <select
                        id="title"
                        v-model="currentParticipant.title"
                        class="mt-2 w-full py-2.5 px-4 h-11 bg-transparent border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-ldyc-blue focus:border-ldyc-blue transition-colors"
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
                        class="font-semibold text-black dark:text-white text-sm"
                        for="firstName"
                      >Firstname:</label>
                      <input
                        id="firstName"
                        v-model="currentParticipant.firstName"
                        type="text"
                        class="mt-2 w-full py-2.5 px-4 h-11 bg-transparent border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-ldyc-blue focus:border-ldyc-blue transition-colors"
                        placeholder="John"
                      />
                    </div>

                    <!-- Lastname -->
                    <div>
                      <label
                        class="font-semibold text-black dark:text-white text-sm"
                        for="surname"
                      >Lastname:</label>
                      <input
                        id="surname"
                        v-model="currentParticipant.surname"
                        type="text"
                        class="mt-2 w-full py-2.5 px-4 h-11 bg-transparent border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-ldyc-blue focus:border-ldyc-blue transition-colors"
                        placeholder="Doe"
                      />
                    </div>

                    <!-- Other Name -->
                    <div>
                      <label
                        class="font-semibold text-black dark:text-white text-sm"
                        for="otherName"
                      >Other Name:</label>
                      <input
                        id="otherName"
                        v-model="currentParticipant.otherName"
                        type="text"
                        class="mt-2 w-full py-2.5 px-4 h-11 bg-transparent border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-ldyc-blue focus:border-ldyc-blue transition-colors"
                        placeholder="Harry"
                      />
                    </div>

                    <!-- Email -->
                    <div>
                      <label
                        class="font-semibold text-black dark:text-white text-sm"
                        for="email"
                      >Email Address:</label>
                      <input
                        id="email"
                        v-model="currentParticipant.email"
                        type="email"
                        class="mt-2 w-full py-2.5 px-4 h-11 bg-transparent border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-ldyc-blue focus:border-ldyc-blue transition-colors"
                        placeholder="name@example.com"
                      />
                    </div>

                    <!-- Phone Number -->
                    <div>
                      <label
                        class="font-semibold text-black dark:text-white text-sm"
                        for="phoneNumber"
                      >Phone Number:</label>
                      <input
                        id="phoneNumber"
                        v-model="currentParticipant.phoneNumber"
                        type="text"
                        class="mt-2 w-full py-2.5 px-4 h-11 bg-transparent border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-ldyc-blue focus:border-ldyc-blue transition-colors"
                        placeholder="080********"
                      />
                    </div>

                    <!-- Archdeaconry -->
                    <div>
                      <label
                        class="font-semibold text-black dark:text-white text-sm"
                        for="archdeaconry"
                      >Archdeaconry:</label>
                      <select
                        id="archdeaconry"
                        v-model="currentParticipant.archdeaconry"
                        class="mt-2 w-full py-2.5 px-4 h-11 bg-transparent border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-ldyc-blue focus:border-ldyc-blue transition-colors"
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
                    <div
                      v-if="currentParticipant._availableParishes.length"
                      class="sm:col-span-2"
                    >
                      <label
                        class="font-semibold text-black dark:text-white text-sm"
                        for="parish"
                      >Parish:</label>
                      <select
                        id="parish"
                        v-model="currentParticipant.parish"
                        class="mt-2 w-full py-2.5 px-4 h-11 bg-transparent border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-ldyc-blue focus:border-ldyc-blue transition-colors disabled:cursor-not-allowed"
                        :disabled="!currentParticipant._availableParishes.length"
                      >
                        <option
                          disabled
                          value=""
                        >
                          Select Parish
                        </option>
                        <option
                          v-for="parish in currentParticipant._availableParishes"
                          :key="parish"
                          :value="parish"
                        >
                          {{ parish }}
                        </option>
                      </select>
                    </div>

                    <!-- DOB -->
                    <div
                      v-if="currentParticipant.userType === 'camper'"
                      class="sm:col-span-2"
                    >
                      <label
                        class="font-semibold text-black dark:text-white text-sm"
                      >Date of Birth:</label>
                      <div class="relative mt-2">
                        <VueDatePicker
                          v-model="currentParticipant.dob"
                          class="dp__theme_dark"
                          format="dd/MM/yyyy"
                          :enable-time-picker="false"
                          :max-date="maxDob"
                          placeholder="Select DOB"
                          text-input
                        />
                      </div>
                    </div>

                    <!-- Image Upload -->
                    <div class="sm:col-span-2">
                      <label
                        class="font-semibold text-black dark:text-white text-sm"
                        for="photo"
                      >Upload Photo:</label>
                      <input
                        id="photo"
                        type="file"
                        accept="image/*"
                        class="mt-2 block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-ldyc-blue/10 file:text-ldyc-blue hover:file:bg-ldyc-blue/20 transition-colors"
                        @change="handleImageUpload"
                      />
                      <div
                        v-if="currentParticipant._photoPreview"
                        class="mt-4"
                      >
                        <img
                          :src="currentParticipant._photoPreview"
                          alt="Preview"
                          class="w-32 h-32 object-cover rounded-full mx-auto shadow-md"
                        />
                      </div>
                    </div>
                  </div>

                  <!-- Add Participant -->
                  <div class="mt-6">
                    <button
                      type="button"
                      class="w-full py-3 px-5 border-2 border-dashed border-ldyc-blue text-ldyc-blue font-semibold rounded-full hover:bg-ldyc-blue/5 transition-colors"
                      @click="addParticipant"
                    >
                      + Add Participant to List
                    </button>
                    <p class="mt-2 text-xs text-center text-slate-500 dark:text-slate-400">
                      Registering just one person? Skip this and hit "Continue to payment" below.
                    </p>
                  </div>
                </div>

                <!-- Added Participants -->
                <div
                  v-if="participants.length"
                  class="border border-gray-200 dark:border-gray-700 rounded-2xl p-4 lg:sticky lg:top-6"
                >
                  <h3 class="font-poppins font-semibold text-black dark:text-white mb-3 text-sm">
                    Added Participants ({{ participants.length }})
                  </h3>
                  <ul class="space-y-2">
                    <li
                      v-for="(participant, index) in participants"
                      :key="index"
                      class="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-700"
                    >
                      <div class="min-w-0">
                        <p class="text-sm font-semibold text-black dark:text-white truncate">
                          {{ participant.title }} {{ participant.firstName }} {{ participant.surname }}
                        </p>
                        <p class="text-xs text-slate-500 dark:text-slate-400">
                          {{ participant.userType === 'camper' ? 'Participant' : 'Chaplain' }}
                        </p>
                      </div>
                      <button
                        type="button"
                        class="text-red-500 hover:text-red-700 text-xs font-semibold shrink-0"
                        @click="removeParticipant(index)"
                      >
                        Remove
                      </button>
                    </li>
                  </ul>
                </div>
              </div>

              <!-- Accept Terms -->
              <div class="flex items-center mb-6 mt-8">
                <input
                  id="acceptTerms"
                  type="checkbox"
                  class="form-checkbox rounded border-gray-300 text-ldyc-blue focus:ring-ldyc-blue mr-2"
                  :checked="acceptTerms"
                  @change="handleCheckboxChange"
                />
                <label
                  for="acceptTerms"
                  class="text-slate-500 dark:text-slate-400"
                >
                  I Accept
                  <button
                    type="button"
                    class="text-ldyc-blue font-semibold underline"
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
                  class="py-3 px-5 w-full bg-ldyc-blue text-white font-semibold tracking-wide rounded-full shadow-lg hover:bg-ldyc-blue/90 hover:shadow-xl transition-all duration-300"
                >
                  Continue to payment
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>

    <!-- Terms Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
    >
      <div
        class="bg-white dark:bg-slate-800 rounded-3xl p-6 w-full max-w-lg shadow-2xl"
      >
        <h3 class="font-poppins font-bold text-lg mb-4 text-center text-black dark:text-white">
          Youth Summer Conference Disclaimer and <br />
          Code of Conduct Agreement
        </h3>
        <div
          class="text-sm text-slate-600 dark:text-slate-300 max-h-60 overflow-y-auto"
        >
          <p>
            By registering for and participating in the Lagos Diocese Youth
            Conference, all attendees acknowledge and agree to abide by the
            rules and regulations set forth by the conference organizers. The
            conference is strictly for individuals aged 18 and above, ensuring
            that all participants are legally responsible for their actions.
          </p>
          <div>
            <h4 class="text-base font-bold mt-3 text-black dark:text-white">
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
            <h4 class="text-base font-bold mt-3 text-black dark:text-white">
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
                class="underline text-ldyc-blue"
                target="_blank"
              >
                youthdirectoratedioceseoflagos@gmail.com
              </a>
            </p>
          </div>
        </div>
        <div class="mt-4 text-right">
          <button
            class="bg-ldyc-blue text-white font-semibold px-5 py-2 rounded-full hover:bg-ldyc-blue/90 transition-all"
            @click="handleAcceptTerms"
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

    <fooTer />
    <switcher :switcher-back="true" />
  </div>
</template>

<script setup>
import feather from "feather-icons";
import tagline from "@/components/tagline.vue";
import navbar from "@/components/navbar.vue";
import fooTer from "@/components/footer.vue";
import switcher from "@/components/switcher.vue";
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import archdeaconryData from "@/assets/data/archdeaconries.json";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { format } from "date-fns";
import { isValidEmail, isValidPhone } from "@/utils/validators";
import { saveCheckout } from "@/utils/checkoutStorage";

const store = useStore();
const toast = useToast();

// const heroBg = require("../../../assets/images/bg/mashup.jpg");

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

const createParticipant = () => ({
  userType: "",
  title: "",
  firstName: "",
  surname: "",
  otherName: "",
  email: "",
  phoneNumber: "",
  archdeaconry: "",
  parish: "",
  dob: "",
  photo: null,
  _photoPreview: "",
  _availableParishes: [],
});

const payerEmail = ref("");
const currentParticipant = ref(createParticipant());
const participants = ref([]); // participants already added to the list
const acceptTerms = ref(false);
const isLoading = ref(false);
const archdeaconries = ref([]);
const showModal = ref(false);

const maxDob = computed(() => new Date(2009, 11, 31)); // December 31, 2009

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

const isParticipantBlank = (participant) => {
  return (
    !participant.userType &&
    !participant.title &&
    !participant.firstName &&
    !participant.surname &&
    !participant.otherName &&
    !participant.email &&
    !participant.phoneNumber &&
    !participant.archdeaconry &&
    !participant.parish &&
    !participant.photo
  );
};

const validateParticipant = (participant, label) => {
  const fields = [...requiredFields];
  if (participant.archdeaconry !== "Other Denominations") {
    fields.push("parish");
  }

  const missingField = fields.find((field) => !participant[field]);
  if (missingField) {
    return `${label}: please fill the ${missingField} field.`;
  }

  if (!isValidEmail(participant.email)) {
    return `${label}: please enter a valid email address.`;
  }

  if (!isValidPhone(participant.phoneNumber)) {
    return `${label}: please enter a valid phone number.`;
  }

  if (participant.userType === "camper") {
    const dob = participant.dob instanceof Date ? participant.dob : new Date(participant.dob);
    if (!participant.dob || Number.isNaN(dob.getTime())) {
      return `${label}: please select a valid Date of Birth.`;
    }
    if (dob.getTime() > maxDob.value.getTime()) {
      return `${label}: Date of Birth must be on or before ${maxDob.value.toLocaleDateString()}.`;
    }
  }

  if (!participant.photo) {
    return `${label}: please upload a photo.`;
  }

  return null;
};

const addParticipant = () => {
  const error = validateParticipant(
    currentParticipant.value,
    `Participant ${participants.value.length + 1}`
  );
  if (error) {
    toast.error(error, { position: "top-right", duration: 5000 });
    return;
  }

  participants.value.push(currentParticipant.value);
  currentParticipant.value = createParticipant();
  toast.success("Participant added to list.", {
    position: "top-right",
    duration: 3000,
  });
};

const removeParticipant = (index) => {
  participants.value.splice(index, 1);
};

const updateParishes = () => {
  const participant = currentParticipant.value;
  if (participant.archdeaconry === "Other Denominations") {
    participant._availableParishes = [];
    participant.parish = "Other Church";
  } else {
    const selected = archdeaconryData.find(
      (item) => item.archdeaconry === participant.archdeaconry
    );
    participant._availableParishes = selected ? selected.parishes : [];
    participant.parish = "";
  }
};

const handleCheckboxChange = () => {
  // Don't allow checking directly — enforce modal first
  acceptTerms.value = false;
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
    currentParticipant.value.photo = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      currentParticipant.value._photoPreview = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const handleAcceptTerms = () => {
  acceptTerms.value = true;
  showModal.value = false;
};

const handleSubmit = async () => {
  if (!payerEmail.value || !isValidEmail(payerEmail.value)) {
    toast.error("Please enter a valid payer email address.", {
      position: "top-right",
      duration: 5000,
    });
    return;
  }

  const allParticipants = [...participants.value];

  // The form currently being filled counts too, as long as it isn't empty —
  // no need to click "Add Participant to List" for a single registrant.
  if (!isParticipantBlank(currentParticipant.value)) {
    const error = validateParticipant(
      currentParticipant.value,
      `Participant ${allParticipants.length + 1}`
    );
    if (error) {
      toast.error(error, { position: "top-right", duration: 5000 });
      return;
    }
    allParticipants.push(currentParticipant.value);
  }

  if (allParticipants.length === 0) {
    toast.error("Please add at least one participant.", {
      position: "top-right",
      duration: 5000,
    });
    return;
  }

  if (!acceptTerms.value) {
    toast.error("Please accept the Terms and Conditions.", {
      position: "top-right",
      duration: 5000,
    });
    return;
  }

  const photos = allParticipants.map((p) => p.photo);
  if (photos.length !== allParticipants.length) {
    toast.error(
      "Something went wrong matching photos to participants. Please re-upload.",
      { position: "top-right", duration: 5000 }
    );
    return;
  }

  try {
    isLoading.value = true;
    await initiateCheckout(allParticipants, photos);
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

const initiateCheckout = async (allParticipants, photos) => {
  const formData = new FormData();
  formData.append("email", payerEmail.value);

  const participantsPayload = allParticipants.map((p) => ({
    userType: p.userType,
    title: p.title,
    firstName: p.firstName,
    surname: p.surname,
    otherName: p.otherName,
    email: p.email,
    phoneNumber: p.phoneNumber,
    archdeaconry: p.archdeaconry,
    parish: p.parish,
    ...(p.userType === "camper" ? { dob: format(p.dob, "yyyy-MM-dd") } : {}),
  }));

  formData.append("participants", JSON.stringify(participantsPayload));
  photos.forEach((photo) => formData.append("photos", photo));

  const res = await store.dispatch("initializePayment", formData);
  const { authorization_url, reference } = res;

  saveCheckout({
    reference,
    authorizationUrl: authorization_url,
    payerEmail: payerEmail.value,
    participantSummary: allParticipants.map((p) => ({
      firstName: p.firstName,
      surname: p.surname,
      userType: p.userType,
    })),
  });

  window.location.href = authorization_url;
};

onMounted(() => {
  window.scrollTo(0, 0);
  feather.replace();
  archdeaconries.value = archdeaconryData.map((item) => item.archdeaconry);
});
</script>

<style scoped>
/* Custom Loader */
.loader {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #0592d8;
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

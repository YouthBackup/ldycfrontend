<template>
  <div class="px-4 sm:px-6 lg:px-8 py-6">
    <!-- Filters Section -->
    <div class="bg-white shadow-md rounded-lg p-4 sm:p-6 mb-6">
      <h3 class="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
        Filters
      </h3>
      <div class="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
        <!-- User Type Filter -->
        <div>
          <label
            for="userType"
            class="block text-sm font-medium text-gray-700 mb-1"
          >User Type</label>
          <select
            id="userType"
            v-model="filters.userType"
            class="w-full h-10 px-3 py-2 text-sm border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
          >
            <option value="">
              All Types
            </option>
            <option value="camper">
              Camper
            </option>
            <option value="chaplain">
              Chaplain
            </option>
          </select>
        </div>

        <!-- Status Filter -->
        <div>
          <label
            for="status"
            class="block text-sm font-medium text-gray-700 mb-1"
          >Status</label>
          <select
            id="status"
            v-model="filters.status"
            class="w-full h-10 px-3 py-2 text-sm border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
          >
            <option value="">
              All Statuses
            </option>
            <option value="registered">
              Registered
            </option>
            <option value="passed">
              Passed
            </option>
            <option value="stopped">
              Stopped
            </option>
          </select>
        </div>

        <!-- Archdeaconry Filter -->
        <div>
          <label
            for="archdeaconry"
            class="block text-sm font-medium text-gray-700 mb-1"
          >Archdeaconry</label>
          <select
            id="archdeaconry"
            v-model="filters.archdeaconry"
            class="w-full h-10 px-3 py-2 text-sm border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
          >
            <option value="">
              All Archdeaconries
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
      </div>
    </div>

    <!-- Selection tray: selection survives paging and filtering, so this is the
         only place that shows the true batch size. -->
    <div
      v-if="selectedUsers.length"
      class="bg-indigo-50 border border-indigo-200 rounded-lg p-3 sm:p-4 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
    >
      <div class="text-sm text-indigo-900">
        <span class="font-semibold">{{ selectedUsers.length }}</span>
        {{ selectedUsers.length === 1 ? "tag" : "tags" }} selected
        <span class="text-indigo-700">&middot; one per page</span>
      </div>
      <div class="flex flex-col xs:flex-row gap-2">
        <button
          class="px-3 py-2 rounded-md border border-indigo-300 text-indigo-700 hover:bg-indigo-100 text-sm font-medium transition-colors duration-200"
          @click="clearSelection"
        >
          Clear selection
        </button>
        <button
          class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 text-sm font-medium"
          :disabled="isGenerating"
          @click="downloadSelected"
        >
          Download {{ selectedUsers.length }} tags
        </button>
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto bg-white shadow-lg rounded-lg">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-12">
              <input
                type="checkbox"
                class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                :checked="isPageSelected"
                aria-label="Select all participants on this page"
                @change="togglePageSelection"
              >
            </th>
            <th class="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Name
            </th>
            <th class="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden lg:table-cell">
              Email
            </th>
            <th class="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden xl:table-cell">
              Phone
            </th>
            <th class="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden xl:table-cell">
              Reg. Code
            </th>
            <th class="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Payment Status
            </th>
            <th class="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr
            v-for="user in participants"
            :key="user._id"
            class="hover:bg-gray-50 transition-colors duration-150"
            :class="{ 'bg-indigo-50': isSelected(user) }"
          >
            <td class="px-3 py-3 whitespace-nowrap w-12">
              <input
                type="checkbox"
                class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                :checked="isSelected(user)"
                aria-label="Select participant"
                @change="toggleSelection(user)"
              >
            </td>
            <td class="px-3 py-3 whitespace-nowrap text-sm text-gray-900">
              {{ user.title }} {{ user.firstName }} {{ user.surname }}
              <span
                v-if="!user.photoUrl"
                class="ml-2 bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded text-xs font-medium"
                title="This tag will print with an empty photo box"
              >
                No photo
              </span>
            </td>
            <td class="px-3 py-3 whitespace-nowrap text-sm text-gray-600 hidden lg:table-cell">
              {{ user.email }}
            </td>
            <td class="px-3 py-3 whitespace-nowrap text-sm text-gray-600 hidden xl:table-cell">
              {{ user.phoneNumber }}
            </td>
            <td class="px-3 py-3 whitespace-nowrap text-sm text-gray-600 hidden xl:table-cell">
              {{ user.registrationCode }}
            </td>
            <td class="px-3 py-3 whitespace-nowrap">
              <span
                :class="
                  isPending(user)
                    ? 'bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium capitalize'
                    : 'bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium capitalize'
                "
              >
                {{ user.paymentStatus || "Unknown" }}
              </span>
            </td>
            <td class="px-3 py-3 whitespace-nowrap">
              <button
                class="bg-blue-600 text-white px-2 sm:px-4 py-1.5 rounded-md hover:bg-blue-700 text-sm font-medium transition-colors duration-200 w-full"
                @click="openModal(user)"
              >
                Preview Tag
              </button>
            </td>
          </tr>
          <tr v-if="!participants.length && !isLoading">
            <td
              colspan="7"
              class="px-3 py-10 text-center text-sm text-gray-500"
            >
              No participants match these filters.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="flex flex-col sm:flex-row justify-between items-center mt-6 p-3 bg-white shadow-lg rounded-lg">
      <button
        class="bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 text-sm font-medium w-full xs:w-auto mb-3 sm:mb-0"
        :disabled="currentPage === 1"
        @click="updatePage(currentPage - 1)"
      >
        Previous
      </button>

      <div class="flex items-center gap-1 flex-wrap justify-center">
        <button
          v-if="totalPages > 1"
          class="px-2 py-1 rounded-md text-sm font-medium transition-colors duration-200"
          :class="
            currentPage === 1
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          "
          @click="updatePage(1)"
        >
          1
        </button>

        <span
          v-if="currentPage > 4"
          class="text-gray-500 text-sm"
        >...</span>

        <button
          v-for="page in pageRange"
          :key="page"
          class="px-2 py-1 rounded-md text-sm font-medium transition-colors duration-200"
          :class="
            currentPage === page
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          "
          @click="updatePage(page)"
        >
          {{ page }}
        </button>

        <span
          v-if="currentPage < totalPages - 3"
          class="text-gray-500 text-sm"
        >...</span>

        <button
          v-if="totalPages > 1 && totalPages !== currentPage"
          class="px-2 py-1 rounded-md text-sm font-medium transition-colors duration-200"
          :class="
            currentPage === totalPages
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          "
          @click="updatePage(totalPages)"
        >
          {{ totalPages }}
        </button>
      </div>

      <button
        class="bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 text-sm font-medium w-full xs:w-auto mt-3 sm:mt-0"
        :disabled="currentPage === totalPages"
        @click="updatePage(currentPage + 1)"
      >
        Next
      </button>
    </div>

    <!-- Loading / Generating Overlay -->
    <transition name="fade">
      <div
        v-if="isLoading || isGenerating"
        class="fixed inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center gap-3 z-50"
      >
        <svg
          class="animate-spin h-8 w-8 text-teal-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          />
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8 8 8 0 01-8-8z"
          />
        </svg>
        <span class="text-lg font-medium text-white">{{ statusMessage }}</span>
      </div>
    </transition>

    <!-- Preview Modal -->
    <div
      v-if="selectedUser"
      class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50 transition-opacity duration-300 p-4 overflow-y-auto"
    >
      <div class="bg-white p-5 sm:p-6 rounded-xl shadow-2xl w-full max-w-3xl relative my-8">
        <button
          class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-200"
          aria-label="Close modal"
          @click="selectedUser = null"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h3 class="text-lg sm:text-xl font-semibold text-gray-800 mb-1">
          Tag Preview
        </h3>
        <p class="text-xs text-gray-500 mb-4">
          Rendered at the same measurements as the PDF, so what you see is what prints.
        </p>

        <TagPreview
          :user="selectedUser"
          class="mb-4 shadow-md"
        />

        <p
          v-if="!selectedUser.photoUrl"
          class="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-md px-3 py-2 mb-4"
        >
          No passport photo on file &mdash; this tag will print with an empty photo box.
        </p>

        <div class="flex flex-col sm:flex-row items-stretch gap-3">
          <button
            class="w-full bg-white text-gray-800 border border-blue-600 hover:bg-blue-600 hover:text-white px-3 py-2 rounded-lg transition-colors duration-200 font-medium"
            @click="router.push(`/admin/verify/participant/${selectedUser._id}`)"
          >
            View Participant
          </button>
          <button
            class="w-full bg-white text-gray-800 border border-indigo-600 hover:bg-indigo-600 hover:text-white px-3 py-2 rounded-lg transition-colors duration-200 font-medium"
            @click="toggleSelection(selectedUser)"
          >
            {{ isSelected(selectedUser) ? "Remove from batch" : "Add to batch" }}
          </button>
          <button
            class="w-full bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors duration-200 font-medium"
            :disabled="isGenerating"
            @click="downloadSingle(selectedUser)"
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toast-notification";
import archdeaconryData from "@/assets/data/archdeaconries.json";
import useParticipants from "./useParticipants";
import TagPreview from "./TagPreview.vue";
import {
  buildBatch,
  drawTag,
  fullNameOf,
  loadTagBackground,
  newSingleDoc,
  preparePhotos,
} from "./tagLayout";

const router = useRouter();
const toast = useToast();

const {
  participants,
  isLoading,
  currentPage,
  filters,
  getParticipants,
  totalPages,
} = useParticipants();

const archdeaconries = ref([]);
const selectedUser = ref(null);
const isGenerating = ref(false);
const statusMessage = ref("Loading...");

// Keyed by id so a selection outlives the page of results it was made on.
const selection = ref({});
const selectedUsers = computed(() => Object.values(selection.value));

function isSelected(user) {
  return Boolean(selection.value[user._id]);
}

function toggleSelection(user) {
  const next = { ...selection.value };
  if (next[user._id]) {
    delete next[user._id];
  } else {
    next[user._id] = user;
  }
  selection.value = next;
}

const isPageSelected = computed(
  () => participants.value.length > 0 && participants.value.every(isSelected)
);

function togglePageSelection() {
  const next = { ...selection.value };
  if (isPageSelected.value) {
    participants.value.forEach((user) => delete next[user._id]);
  } else {
    participants.value.forEach((user) => {
      next[user._id] = user;
    });
  }
  selection.value = next;
}

function clearSelection() {
  selection.value = {};
}

function isPending(user) {
  return (user.paymentStatus || "").toLowerCase() === "pending";
}

function updatePage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    getParticipants();
  }
}

const pageRange = computed(() => {
  const range = [];
  const start = Math.max(2, currentPage.value - 2);
  const end = Math.min(totalPages.value - 1, currentPage.value + 2);
  for (let i = start; i <= end; i++) {
    range.push(i);
  }
  return range;
});

function openModal(user) {
  selectedUser.value = user;
}

function timestamp() {
  return new Date().toISOString().split("T")[0];
}

// Photo problems are reported but never abort a run: those tags print with an
// empty photo box instead.
function reportFailures(failures) {
  if (!failures.length) return;
  const names = failures
    .slice(0, 3)
    .map(({ user }) => fullNameOf(user) || user.registrationCode)
    .join(", ");
  const more = failures.length > 3 ? ` and ${failures.length - 3} more` : "";
  toast.warning(
    `${failures.length} tag(s) printed without a photo: ${names}${more}`,
    { position: "top-right", duration: 8000 }
  );
}

async function downloadSingle(user) {
  isGenerating.value = true;
  statusMessage.value = "Generating tag...";
  try {
    const background = await loadTagBackground();
    const { photos, failures } = await preparePhotos([user]);

    const doc = newSingleDoc();
    drawTag(doc, user, background, photos.get(user._id));
    doc.save(`IgniteTag-${user.registrationCode || user._id}.pdf`);

    reportFailures(failures);
    selectedUser.value = null;
  } catch (err) {
    toast.error(`Could not generate tag: ${err.message}`, {
      position: "top-right",
      duration: 6000,
    });
  } finally {
    isGenerating.value = false;
  }
}

async function downloadSelected() {
  const users = selectedUsers.value;
  if (!users.length) return;

  isGenerating.value = true;
  statusMessage.value = `Preparing photos 0/${users.length}...`;
  try {
    const background = await loadTagBackground();
    const { photos, failures } = await preparePhotos(users, (done, total) => {
      statusMessage.value = `Preparing photos ${done}/${total}...`;
    });

    statusMessage.value = `Building ${users.length} tag(s)...`;
    const doc = buildBatch(users, background, photos);
    doc.save(`IgniteTags-${users.length}-${timestamp()}.pdf`);

    reportFailures(failures);
    toast.success(
      `${users.length} tag(s) downloaded, one per page.`,
      { position: "top-right", duration: 5000 }
    );
    clearSelection();
  } catch (err) {
    toast.error(`Could not generate tags: ${err.message}`, {
      position: "top-right",
      duration: 6000,
    });
  } finally {
    isGenerating.value = false;
  }
}

watch(
  filters,
  () => {
    currentPage.value = 1;
    getParticipants();
  },
  { deep: true }
);

onMounted(() => {
  archdeaconries.value = [
    ...archdeaconryData.map((item) => item.archdeaconry),
    "Other Denominations",
  ];
  getParticipants();
  // Warm the artwork cache so the first preview paints without a flash.
  loadTagBackground().catch(() => {});
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Keep table cells readable on small screens */
@media (max-width: 640px) {
  table {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }
  thead,
  tbody,
  tr,
  td,
  th {
    display: table-cell;
  }
}

/* Improve touch targets */
button,
input[type="checkbox"] {
  touch-action: manipulation;
}

button {
  min-height: 40px;
}
</style>

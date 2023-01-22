<script setup lang="ts">
const props = defineProps({
  search: {
    type: String,
    required: false,
  },
});

const emit = defineEmits(["search"]);

let playerName = ref(props.search);

function handleSubmit(event) {
  event.preventDefault();
  emit("search", playerName.value);
}

function handleChange(event) {
  playerName.value = event.target.value;
}
</script>

<template>
  <form class="container mx-auto">
    <label
      for="default-search"
      class="mb-2 text-sm font-medium text-gray-900 sr-only text-white"
      >Search Players</label
    >
    <div class="relative">
      <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg
          aria-hidden="true"
          class="w-5 h-5 text-gray-500 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
      </div>
      <input
        v-model="playerName"
        @keyup="handleChange"
        type="search"
        id="default-search"
        class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-100 rounded-md bg-gray-100 placeholder-gray-600 text-stone-900"
        placeholder="Search player by name ⚾ ⚾ ⚾ "
        required
      />
      <button
        @click="handleSubmit"
        type="submit"
        class="text-white absolute right-2.5 bottom-2.5 bg-gray-700 rounded-md text-sm px-4 py-2 bg-gray-600 hover:bg-stone-900"
      >
        Search
      </button>
    </div>
  </form>
</template>

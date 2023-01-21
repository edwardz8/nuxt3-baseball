<script setup lang="ts">
const props = defineProps({
  search: {
    type: String,
    required: true,
  },
});

let playerName = ref(search);

const filteredPlayers = computed(() => {
  return players.value.filter((player) => {
    player.toLowerCase().includes(input.value.toLowerCase())
  })
}) 

/* function filteredPlayers() {
  return players.filter((player) => {
    player.toLowerCase().includes(input.value.toLowerCase());
  });
} */

const emit = defineEmits(["search"]);

function handleSubmit(event) {
  event.preventDefault();
  emit("search", playerName.value);
}

function handleChange(event) {
  playerName.value = event.target.value;
}
</script>

<template>
  <form>
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
      <input v-model="playerName" @keyup="handleChange"
        type="search"
        id="default-search"
        class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
        placeholder="Search ⚾ player by first name"
        required
      />
      <button @click="handleSubmit"
        type="submit"
        class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
      >
        Search
      </button>
    </div>
  </form>
</template>

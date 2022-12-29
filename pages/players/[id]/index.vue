<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { getHitterById } from '~/composables/useHitters'
// import matchTeamImage from "../../../methods.js";

const route = useRoute();
// const user = useState("user");
const { data } = await getHitterById(route.params.id)
const player = ref(data.value);
console.log(data.value)
</script>

<template>
  <main>
    <section>
      <h2 class="text-2xl mt-3 mb-4 text-center">Team Page</h2>
      <p class="text-md mb-4 text-center">Sign in or register to like and comment on your favorite plays</p>
     <!--  <off-canvas :player="player" /> -->
      <div v-if="player" class="gap-3 px-4"
      >
      <div class="p-4 md:p-5">
          <h2 class="text-2xl font-bold text-gray-800 text-center">
            {{ player?.name }}
          </h2>
          <!-- <img
            class="mx-auto rounded-t-xl w-32"
            :src="matchTeamImage(player?.team)"
            alt="Team Icon"
          /> -->
          <h5 class="text-md font-bold text-gray-800 text-center">
            {{ player?.team }}
          </h5>
         <!--  <pre>
            {{player}}
          </pre> -->
          

        </div>
      </div>
    </section>
  </main>
</template>

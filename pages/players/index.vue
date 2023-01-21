<script setup lang="ts">
import { getHitters } from "@/composables/useHitters";
import { getUserLikes, addUserLike, removeUserLike } from "~/composables/useLike";

const user = useState("user");
const route = useRoute();
const router = useRouter();
const ids = ref("");

/* pagination */
const perpage = ref(20);
const page = ref(1);
const playerLikes = ref(null);

const activePlayer = ref(null);

const { data } = await getHitters();

const total = data.value.length;

data.value.forEach((player) => {
  ids.value += player.id + ",";
});

const playersLikesRes = await getUserLikes(ids.value);

playerLikes.value = playersLikesRes.data.value;

onMounted(() => {
  if (route.query.page) page.value = +route.query.page;
});

const config = useRuntimeConfig();

const hitters = computed(() => {
  return data.value.slice((page.value - 1) * perpage.value, page.value * perpage.value);
});

const lastPage = computed(() => {
  return Math.floor(total / perpage.value);
});

const playerLikesById = (id) => {
  return playerLikes.value[id] ? playerLikes.value[id] : [];
};

const addlike = async (id) => {
  if (user)
    try {
      const res = await addUserLike({
        userId: user.value.id,
        playerId: id,
      });

      if (playerLikes.value[id]) {
        playerLikes.value[id].push(res);
      } else {
        var likes = playerLikes.value;
        likes[id] = [{ ...res }];
        playerLikes.value = likes;
      }
    } catch (e) {}
};

/* UNLIKE PLAYER */
const unlikePlayer = async (data) => {
  try {
    await removeUserLike(data.id);
    const index = playerLikes.value[data.playerId].findIndex(
      (like) => like.id === data.id
    );
    playerLikes.value[data.playerId].splice(index, 1);
  } catch (e) {}
};

watch(
  () => page.value,
  (newValue, oldValue) => {
    router.push(`/players?page=${newValue}`);
  }
);

const searchQuery = ref("");


function sortedPlayers() {
  return hitters.value.filter((hitter) => {
    hitter.toLowerCase().includes(input.value.toLowerCase());
  });
}

/*  watchEffect(() => {
      console.log(hitters.value);
    }); */
</script>

<template>
  <main>
    <section>
      <h2 class="text-2xl mt-3 mb-4 text-center">All Hitters</h2>
      <ul class="prev-next-cont">
        <li class="link-item prev" @click="page -= 1" v-if="page !== 1">
          <!-- <ArrowLeftIcon class="icon stroke" /> -->
          <span> Previous </span>
        </li>
        <li v-else></li>
        <li class="link-item next" @click="page += 1" v-if="page !== lastPage">
          <span> Next </span>
          <!-- <ArrowRightIcon class="icon stroke" /> -->
        </li>
      </ul>

      <!-- Search -->
    <!--   <div class="relative text-gray-800 m-2 hidden">
        <input
          type="search"
          name="search"
          placeholder="Search ⚾ player by name"
          class="h-10 px-5 pr-10 placeholder-gray-400 text-gray-600 relative bg-white rounded text-sm border border-gray-300 outline-none focus:outline-none w-full pl-10"
        />
        <button type="submit" class="absolute right-0 top-0 mt-3 mr-4">
          <svg
            class="h-4 w-4 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            version="1.1"
            id="Capa_1"
            x="0px"
            y="0px"
            viewBox="0 0 56.966 56.966"
            style="enable-background: new 0 0 56.966 56.966"
            xml:space="preserve"
            width="512px"
            height="512px"
          >
            <path
              d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"
            />
          </svg>
        </button>
      </div> -->

      <!-- <OffCanvas :player="activePlayer" @close-me="activePlayer" /> -->
      <div
        class="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3 px-4"
      >
        <hitter
          :hitter="hitter"
          v-for="hitter in hitters"
          :key="hitter.id"
          @like-player="addlike"
          :likes="playerLikesById(hitter.id)"
          :user-id="user ? user.id : null"
          @unlike-player="unlikePlayer"
        />
      </div>
    </section>
  </main>
</template>

<style scoped>
.prev-next-cont {
  @apply flex gap-4 justify-between p-2 border border-stone-200 rounded-lg m-2;
}
.link-item {
  @apply flex gap-2 cursor-pointer;
}
</style>

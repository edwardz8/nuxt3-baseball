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
  @apply flex gap-4 justify-between p-4 border border-slate-200 rounded-lg;
}
.link-item {
  @apply flex gap-2 cursor-pointer;
}
</style>

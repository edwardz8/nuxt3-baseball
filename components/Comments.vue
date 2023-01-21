<script setup lang="ts">
import { useState } from "#app";
import { addComment, getPlayerComments, deleteComment } from "~/composables/useComment";

const route = useRoute();
const playerComments = ref([]);
const comment = ref("");
const commenting = ref(false);
const user = useState("user");

playerComments.value = await getPlayerComments(route.params.id);

const userComment = computed(() => {
  if (!user.value) return false 
  const index = playerComments.value.findIndex(comment => comment.userId === user.value.id)

  return index > -1
})

/*
=================================
          * METHODS *
=================================
*/

async function commentPlayer() {
  if (!user.value) return useRouter().push('/login')
  commenting.value = true;
  try {
    const commentRes = await addComment({
      userId: user.value.id,
      playerId: +route.params.id,
      comment: comment.value,
    });
    playerComments.value.unshift({ ...commentRes, user: user.value });
    comment.value = "";
  } catch (error) {
    // console.log(error);
  } finally {
    commenting.value = false;
  }
}

async function deletePlayerComment(id, index) {
  await deleteComment(id);
  playerComments.value.splice(index, 1);
}

</script>
<template>
  <!-- Comments -->
  <div
    class="p-4 rounded-md bg-stone-100 border-stone-100 mb-4"
    role="alert"
  >
    <h3 class="font-bold mb-3">Comments</h3>
    <form @submit.prevent="commentPlayer" class="w-full d-flex flex-col">
      <input
        v-model="comment"
        required
        type="text"
        placeholder="Enter Comment"
        class="py-3 px-4 block w-full border focus:outline-none rounded-md text-sm bg-stone-200 border-stone-200 text-stone-900"
      />
      <button
        class="ml-auto block w-20 mt-2 py-2 px-2 rounded-md border-2 border-stone-900 font-semibold text-stone-900 hover:text-stone-100 hover:bg-gray-400 hover:border-gray-400 focus:outline-none transition-all text-sm border-gray-400 text-stone-900"
      >
        <div
          v-if="commenting"
          class="animate-spin inline-block w-4 h-4 border-[3px] border-current border-t-transparent text-blue-600 rounded-full"
          role="status"
          aria-label="loading"
        >
          <span class="sr-only">Loading...</span>
        </div>
        <template v-else> Submit </template>
      </button>
    </form>

    <div class="flex flex-col pt-3">
      <div
        class="ml-3 mb-2 py-2 border-t border-gray-200"
        v-for="(comment, i) in playerComments"
        :key="comment.id"
      >
        <div class="flex gap-3 items-center">
          <!-- <img src="/img/footballguy2.jpg" class="rounded-full w-10 h-10" alt="avatar" /> -->
          <div>
            <h4 class="text-base m-0 leading-3">
              {{ comment.user.name }}
            </h4>
            <span class="text-xs leading-3">@{{ comment.user.username }}</span>
          </div>
          <button class="p-2 ml-auto">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 2H9C7.897 2 7 2.897 7 4V5H3V7H5V20C5 21.103 5.897 22 7 22H17C18.103 22 19 21.103 19 20V7H21V5H17V4C17 2.897 16.103 2 15 2ZM9 4H15V5H9V4ZM17 20H7V7H17V20Z"
                fill="#192038"
              />
            </svg>
          </button>
        </div>
        <p class="text-base mt-2 text-gray-900">
          {{ comment.comment }}
        </p>
      </div>
    </div>
  </div>
</template>

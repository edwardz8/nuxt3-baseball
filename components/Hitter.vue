<script setup lang="ts">
import { ILike } from "~~/types/ILike";

const props = defineProps({
  hitter: Object,
  likes: {
    type: Array<ILike>,
    default: []
  },
  userId: { type: Number, default: undefined },
});

const emit = defineEmits(["like-player", "unlike-player", "show-details"]);

const likesCount = computed(() => {
  return props.likes.length;
});

const userLike = computed(() => {
  return props.likes.find((like) => like.userId === props.userId);
});

const isLiked = computed(() => {
  if (!props.userId) return false;
  if (props.likes.length === 0) return false;
  const index = props.likes.findIndex((like) => {
    return like.userId === props.userId;
  });
  return index > -1 ? true : false;
});

function likePlayer(id) {
  emit("like-player", id);
}

function unlikePlayer(id, playerId) {
  emit("unlike-player", { id, playerId });
}

function showDetails(player: Object) {
  emit("show-details", player);
}

function matchTeamLogo(team) {
        switch (team) {
            case "ATL":
                return "bbclub-ATL ATL";
                break;
            case "HOU":
                return "bbclub-HOU";
                break;
            case "BOS":
                return "bbclub-BOS BOS";
                break;
            case "CLE":
                return "bbclub-CLE CLE";
                break;
            case "MIL":
                return "bbclub-MIL MIL";
                break;
            case "NYY":
                return "bbclub-NYY NYY";
                break;
            case "TB":
            case "TBR":
                return "bbclub-TB TB";
                break;
            case "BAL":
                return "bbclub-BAL BAL";
                break;
            case "TOR":
                return "bbclub-TOR TOR";
                break;
            case "DET":
                return "bbclub-DET DET";
                break;
            case "KC":
            case "KCR":
                return "bbclub-KC KC";
                break;
            case "MIN":
                return "bbclub-MIN MIN";
                break;
            case "CWS":
            case "CHW":
                return "bbclub-CWS CWS";
                break;
            case "OAK":
                return "bbclub-OAK OAK";
                break;
            case "TX":
                return "bbclub-TEX TEX";
                break;
            case "LAA":
                return "bbclub-LAA LAA";
                break;
            case "SEA":
                return "bbclub-SEA SEA";
                break;
            case "WSH":
            case "WSN":
                return "bbclub-WSH WSH";
                break;
            case "PHI":
                return "bbclub-PHI PHI";
                break;
            case "NYM":
                return "bbclub-NYM NYM";
                break;
            case "MIA":
                return "bbclub-MIA MIA";
                break;
            case "PIT":
                return "bbclub-PIT PIT";
                break;
            case "STL":
                return "bbclub-STL STL";
                break;
            case "CIN":
                return "bbclub-CIN CIN";
                break;
            case "CHI":
            case "CHC":
                return "bbclub-CHC CHC";
                break;
            case "LAD":
                return "bbclub-LAD LAD";
                break;
            case "ARI":
                return "bbclub-ARI ARI";
                break;
            case "COL":
                return "bbclub-COL COL";
                break;
            case "SF":
            case "SFG":
                return "bbclub-SF SF";
                break;
            case "SD":
            case "SDP":
                return "bbclub-SD SD";
                break;
            default:
                return "bbclub-mlb";
        }
    }
</script>

<template>
  <div class="mt-2 rounded-md hover:bg-stone-200 bg-stone-100 ">
    <div class="p-4">
    <!-- Player Info -->
      <h3 class="text-lg font-bold text-stone-800">
        {{ props.hitter.name }}
      </h3>
      <div class="text-2xl text-stone-700">
      <i :class="matchTeamLogo(props.hitter.team)"></i>
    </div>
      <div class="flex items-end justify-between">
        <NuxtLink
          class="mt-3 p-2 inline-flex justify-center items-center gap-2 rounded-md border border-transparent
          font-semibold text-white bg-gray-500 hover:bg-stone-800 focus:outline-none transition-all text-sm"
          :to="`/players/` + props.hitter.id"
        >
          View Player
        </NuxtLink>

        <!-- Likes -->
        <div>
          <button
            v-if="isLiked && userId"
            @click="unlikePlayer(userLike.id, props.hitter.id)"
            class="text-sm mt-1 py-2 px-2 inline-flex justify-center items-center gap-2 font-md text-stone-800 hover:text-stone-500"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 21C8.38661 17.7733 2 13.7597 2 8.3951C2 5.37384 4.42 3 7.5 3C9.24 3 10.91 3.74441 12 5C13.09 3.74441 14.76 3 16.5 3C19.58 3 22 5.37384 22 8.3951C22 13.751 15.6214 17.7907 12 21Z"
                fill="#2F80ED"
              />
            </svg>
            <span>{{ likesCount }} Likes</span>
          </button>
          <button
            v-else-if="userId"
            type="button"
            @click="likePlayer(props.hitter.id)"
            class="text-sm mt-1 py-2 px-2 inline-flex justify-center items-center gap-2 text-stone-800 hover:text-stone-500"
          >
            <svg
              width="20"
              height="18"
              viewBox="0 0 20 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M10 2C9.66042 1.60884 9.26455 1.26729 8.82781 0.982401C7.86267 0.352837 6.69792 0 5.5 0C2.42 0 0 2.37384 0 5.3951C0 6.46861 0.255742 7.48801 0.693829 8.45784C2.0526 11.4686 5.16576 14.0093 7.8455 16.1963C8.61699 16.8259 9.35256 17.4262 10 18C10.6474 17.4262 11.383 16.8259 12.1545 16.1963C14.8342 14.0093 17.9473 11.4687 19.3061 8.458C19.7442 7.48813 20 6.46866 20 5.3951C20 2.37384 17.58 0 14.5 0C13.3021 0 12.1373 0.352837 11.1722 0.982401C10.7354 1.26729 10.3396 1.60884 10 2ZM10 15.3699C10.3228 15.1024 10.6527 14.8326 10.9822 14.5633C11.2612 14.3351 11.5399 14.1073 11.8136 13.8813C12.9091 12.9769 13.9814 12.058 14.9309 11.095C16.106 9.90333 16.9793 8.75632 17.4879 7.62419C17.8233 6.8767 18 6.13633 18 5.3951C18 3.51455 16.5119 2 14.5 2C13.3116 2 12.2025 2.51373 11.5103 3.31111L10 5.05084L8.48971 3.31111C7.79748 2.51373 6.68843 2 5.5 2C3.48808 2 2 3.51455 2 5.3951C2 6.13633 2.17674 6.8767 2.51214 7.62419C3.02069 8.75633 3.89402 9.90333 5.06909 11.095C6.01864 12.058 7.09095 12.9769 8.18643 13.8813C8.46009 14.1073 8.73877 14.3351 9.01783 14.5633C9.34727 14.8326 9.67722 15.1024 10 15.3699Z"
                fill="#222B45"
              />
            </svg>
            <span>{{ likesCount }} Likes</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

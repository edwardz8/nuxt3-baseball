<script setup lang="ts">
import { getHitters } from '@/composables/useHitters'
// import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/vue';

const { data } = await getHitters()
const perpage = ref(20)
const page = ref(1)
const total = data.value.length

const route = useRoute()
const router = useRouter()

onMounted(() => {
  console.log('mounted')
  if (route.query.page)
    page.value = +route.query.page
})

const hitters = computed(() => {
  return data.value.slice((page.value - 1) * perpage.value, page.value * perpage.value)
})

const lastPage = computed(() => {
  return Math.floor(total / perpage.value)
})

watch(() => page.value, (newValue, oldValue) => {
  router.push(`/players?page=${newValue}`)
})
</script>

<template>
  <main>
    <section>
      <h2 class="text-2xl mt-3 mb-4 text-center">All Hitters</h2>
      <ul class="prev-next-cont">
        <li class="link-item prev" @click="page -= 1" v-if="page !== 1">
          <!-- <ArrowLeftIcon class="icon stroke" /> -->
          <span> Previus </span>
        </li>
        <li v-else></li>
        <li class="link-item next" @click="page+=1" v-if="page !== lastPage">
          <span> Next </span>
         <!--  <ArrowRightIcon class="icon stroke" /> -->
        </li>
      </ul>
      <div class="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3 px-4">
        <Hitters :hitter="hitter" v-for="hitter in hitters" :key="hitter.id" />
      </div>
    </section>
  </main>
</template>

<style scoped>
.prev-next-cont {
  @apply flex gap-4 justify-between p-4 border border-slate-200 rounded-lg;
}
.link-item  {
  @apply flex gap-2 cursor-pointer;
}
</style>

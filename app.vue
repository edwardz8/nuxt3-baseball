<template>
  <div>
  <SiteHeader/>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import { useUser } from "~/composables/useAuth";

const nuxtApp = useNuxtApp()

nuxtApp.hook("page:finish", () => {
  window.scrollTo(0, 0)
})

await useUser()
</script>
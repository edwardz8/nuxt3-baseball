<script setup lang="ts">
import { useUser } from "~/composables/useAuth";
const user = await useUser()
console.log(user)
</script>

<template>
  <main>
    <section class="hero-section">
      <header>
        <div class="p-6 mt-5">
          <pre>
              {{ user }}
            </pre>
        </div>
        <h1 class="font-black text-6xl">Welcome to fungo fantasy baseball</h1>
        <span class="text-4xl">⚾</span>
        <NuxtLink to="/register">Signup</NuxtLink>
        <p class="text-lg">
          <NuxtLink to="/players">like and comment on your favorite players for the day</NuxtLink>
        </p>
      </header>
    </section>
  </main>
</template>
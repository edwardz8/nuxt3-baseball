<script setup lang="ts">
import { useState } from "#app";

const user = useState("user");
</script>

<template>
  <header class="site-header">
    <div class="wrapper">
      <NuxtLink to="/" class="no-underline">
        <figure class="site-logo">
          <h1>fungo</h1>
        </figure>
      </NuxtLink>

      <nav class="site-nav">
        <ul class="links">
          <div class="flex items-center justify-end md:flex-1 lg:w-0">
            <User v-if="user" :user="user" />

            <li class="link">
              <nuxt-link
                v-if="!user"
                to="/login"
                class="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
              >
                Sign in
              </nuxt-link>
            </li>
          </div>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  @apply sticky top-0 w-full p-4 bg-slate-100 bg-opacity-40 border-b-2 border-white border-opacity-30 backdrop-blur-lg z-20;
}

.site-header > .wrapper {
  @apply flex items-center justify-between max-w-6xl m-auto;
}

.site-logo {
  @apply font-black text-lg;
}
</style>

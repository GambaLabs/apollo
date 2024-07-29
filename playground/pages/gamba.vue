<script setup lang="ts">
import GambaDemo from '~/components/GambaDemo.vue'
</script>
<template>
  <div id="wrapper">
    <main class="p-4">
      <ClientOnly>
        <GambaDemo />
      </ClientOnly>
    </main>
  </div>
</template>

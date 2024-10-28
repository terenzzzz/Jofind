<template>
  <div class="d-flex justify-content-between py-2">
    <div class="d-flex flex-column">
      <p class="text-muted">Language</p>
      <p>{{ language.language }}</p>
    </div>

    <div class="d-flex flex-column">
      <p class="text-muted">Proficiency</p>
      <p>{{ language.proficiency }}</p>
    </div>

    <div class="d-flex flex-column">
      <p class="text-muted">Certificate</p>
      <p>{{ language.certificate? language.certificate : "/"  }}</p>
    </div>

    <div class="d-flex flex-column">
      <p class="text-muted">Mark</p>
      <p>{{ language.mark? language.mark : "/"  }}</p>
    </div>

  </div>
  <el-divider></el-divider>
</template>


<script setup lang="ts">
import { defineProps } from 'vue'

interface Language {
  language: string
  proficiency: string
  certificate?: string
  mark?: string
}

defineProps<{ language: Language }>()
</script>

<style scoped lang="css">

</style>

<template>
  <div class="cms-layout">
    <CmsSidebar />

    <div class="cms-content">
      <CmsTopbar />
      <main class="cms-main">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

const authStore = useAuthStore()
const companyStore = useCompanyStore()

onMounted(async () => {
  if (!authStore.isAuthenticated) {
    authStore.init()
  }
  if (!companyStore.list.length && authStore.companies?.length) {
    companyStore.initFromAuth(authStore.companies)
  }
})
</script>

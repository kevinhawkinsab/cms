export default defineNuxtPlugin(async () => {
  const authStore = useAuthStore()
  const companyStore = useCompanyStore()

  const ok = authStore.init()

  if (ok && authStore.companies?.length) {
    companyStore.initFromAuth(authStore.companies)
  }
})

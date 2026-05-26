export function useCompanyContext() {
  const companyStore = useCompanyStore()

  const activeCompany = computed(() => companyStore.active)
  const activeCompanyId = computed(() => companyStore.active?.id ?? null)
  const activeCompanyName = computed(() => companyStore.active?.name ?? '')

  function requireCompany(): boolean {
    return !!activeCompanyId.value
  }

  async function switchCompany(companyId: string | number) {
    await companyStore.setActive(companyId)
  }

  return {
    activeCompany,
    activeCompanyId,
    activeCompanyName,
    requireCompany,
    switchCompany,
  }
}

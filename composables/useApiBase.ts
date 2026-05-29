/**
 * useApiBase
 * ----------
 * Devuelve la URL base correcta del API segun el contexto:
 *  - En SERVER (SSR / Nitro): runtimeConfig.apiBaseInternal
 *  - En CLIENT (browser): runtimeConfig.public.apiBase
 *
 * Uso:
 *   const apiBase = useApiBase()
 *   const data = await $fetch('/CMS/login', { baseURL: apiBase, method: 'POST', body: ... })
 */
export function useApiBase(): string {
  const config = useRuntimeConfig()
  let base = ''
  
  if (import.meta.server) {
    base = (config.apiBaseInternal as string) || (config.public.apiBase as string)
    // Registro útil para debuggear conectividad Nitro -> Backend en logs de producción
    console.log(`[SSR] Usando API Base: ${base}`)
  } else {
    base = config.public.apiBase as string
  }
  
  return base
}

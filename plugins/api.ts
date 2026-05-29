import api from '~/services/api'

/**
 * Plugin universal: asigna baseURL al axios singleton.
 * - En CLIENT: usa runtimeConfig.public.apiBase
 * - En SERVER: usa runtimeConfig.apiBaseInternal
 *
 * El CMS solo se ejecuta en cliente (SPA), asi que axios usa la URL
 * definida en runtimeConfig.public.apiBase.
 */
export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const baseURL = import.meta.server
    ? ((config.apiBaseInternal as string) || (config.public.apiBase as string))
    : (config.public.apiBase as string)

  api.defaults.baseURL = baseURL
})

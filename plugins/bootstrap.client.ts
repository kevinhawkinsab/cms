// Bootstrap JS — sólo cliente (usa window/document)
export default defineNuxtPlugin(async () => {
  // @ts-ignore
  await import('bootstrap/dist/js/bootstrap.bundle.min.js')
})

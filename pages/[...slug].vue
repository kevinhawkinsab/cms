<template>
  <div class="not-found">
    <div class="not-found-inner">
      <div class="not-found-code">404</div>
      <h1 class="not-found-title">Página no encontrada</h1>
      <p class="not-found-desc">La ruta que buscas no existe en el CMS.</p>
      <NuxtLink to="/dashboard" class="btn-primary">Ir al Dashboard</NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.not-found {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg);
}
.not-found-inner { text-align: center; padding: 2rem; }
.not-found-code { font-size: 7rem; font-weight: 900; color: var(--color-border); line-height: 1; margin-bottom: 1rem; }
.not-found-title { font-size: 1.75rem; font-weight: 700; color: var(--color-text-primary); margin: 0 0 0.5rem; }
.not-found-desc { font-size: var(--text-sm); color: var(--color-text-muted); margin: 0 0 2rem; }
</style>

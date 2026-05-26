<template>
  <div class="company-switcher" v-if="companyStore.list.length">
    <!-- Superadmin sees a dropdown -->
    <div v-if="canSwitch" class="switcher-wrapper" @click.stop>
      <button class="switcher-btn" @click="open = !open">
        <div class="company-dot" :style="{ background: activeDot }" />
        <span class="company-name">{{ companyStore.activeName || 'Seleccionar empresa' }}</span>
        <svg class="chevron" :class="{ rotated: open }" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
      </button>

      <Transition name="fade">
        <div v-if="open" class="switcher-dropdown" v-click-outside="() => (open = false)">
          <div class="dropdown-header">Cambiar empresa</div>
          <button
            v-for="company in companyStore.list"
            :key="company.id"
            class="dropdown-item"
            :class="{ active: String(company.id) === String(companyStore.activeId) }"
            @click="select(company)"
          >
            <div class="item-dot" />
            <span>{{ company.name }}</span>
            <svg v-if="String(company.id) === String(companyStore.activeId)" class="check-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          </button>
        </div>
      </Transition>
    </div>

    <!-- Other roles see a static chip -->
    <div v-else class="company-chip">
      <div class="company-dot" :style="{ background: activeDot }" />
      <span class="company-name">{{ companyStore.activeName }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const companyStore = useCompanyStore()
const { canSwitchCompany } = usePermissions()
const canSwitch = computed(() => canSwitchCompany())

const open = ref(false)
const activeDot = computed(() => '#1A4F3A')

async function select(company) {
  await companyStore.setActive(company.id)
  open.value = false
  // Emit a global event to trigger data refresh
  window.dispatchEvent(new CustomEvent('company:changed', { detail: company }))
}

// Click outside directive
const vClickOutside = {
  beforeMount(el, binding) {
    el._clickOutside = (e) => {
      if (!el.contains(e.target)) binding.value(e)
    }
    document.addEventListener('click', el._clickOutside)
  },
  unmounted(el) {
    document.removeEventListener('click', el._clickOutside)
  },
}
</script>

<style scoped>
.company-switcher { position: relative; }

.switcher-wrapper { position: relative; }

.switcher-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0.4rem 0.75rem;
  border-radius: var(--radius-md);
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  cursor: pointer;
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--color-text-primary);
  transition: all var(--transition-fast);
  white-space: nowrap;
}
.switcher-btn:hover { border-color: var(--color-brand-300); background: var(--color-primary-light); }

.company-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.company-name { max-width: 160px; overflow: hidden; text-overflow: ellipsis; }

.chevron { transition: transform var(--transition-fast); color: var(--color-text-muted); }
.chevron.rotated { transform: rotate(180deg); }

.switcher-dropdown {
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  min-width: 220px;
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-dropdown);
  z-index: var(--z-dropdown);
  overflow: hidden;
  animation: slideUp 0.15s ease-out;
}

.dropdown-header {
  padding: 0.6rem 1rem 0.4rem;
  font-size: var(--text-xs);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-muted);
  border-bottom: 1px solid var(--color-border);
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 0.65rem 1rem;
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--color-text-primary);
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
  transition: background var(--transition-fast);
}
.dropdown-item:hover { background: var(--color-bg); }
.dropdown-item.active { color: var(--color-primary); background: var(--color-primary-light); }
.dropdown-item .item-dot {
  width: 8px; height: 8px; border-radius: 50%;
  background: var(--color-brand-300); flex-shrink: 0;
}
.dropdown-item.active .item-dot { background: var(--color-primary); }

.check-icon { margin-left: auto; color: var(--color-primary); }

.company-chip {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0.4rem 0.75rem;
  border-radius: var(--radius-md);
  background: var(--color-primary-light);
  border: 1px solid var(--color-brand-200);
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--color-primary);
}
</style>

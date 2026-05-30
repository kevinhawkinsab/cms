<template>
  <span class="workflow-badge" :class="`status-${props.status}`">
    <svg class="badge-icon" :width="14" :height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" :stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" v-html="iconPath" />
    {{ label }}
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  status: {
    type: String,
    default: 'draft',
    validator: (v) => ['draft', 'pending_review', 'approved', 'published', 'scheduled', 'archived'].includes(v)
  }
})

const CONFIG = {
  draft: {
    label: 'Borrador',
    icon: '<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>'
  },
  pending_review: {
    label: 'En revisión',
    icon: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>'
  },
  approved: {
    label: 'Aprobado',
    icon: '<polyline points="20 6 9 17 4 12"/>'
  },
  published: {
    label: 'Publicado',
    icon: '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>'
  },
  scheduled: {
    label: 'Programado',
    icon: '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>'
  },
  archived: {
    label: 'Archivado',
    icon: '<polyline points="21 8 21 21 3 21 3 8"/><rect x="1" y="3" width="22" height="5"/><line x1="10" y1="12" x2="14" y2="12"/>'
  }
}

const label = computed(() => CONFIG[props.status]?.label || props.status)
const iconPath = computed(() => CONFIG[props.status]?.icon || '')
</script>

<style scoped>
.workflow-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 3px 10px 3px 8px;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 700;
  font-family: var(--font-sans, sans-serif);
  letter-spacing: 0.01em;
  white-space: nowrap;
  user-select: none;
}

.badge-icon {
  flex-shrink: 0;
}

/* Draft — neutral gray */
.status-draft {
  background: var(--gray-200, #e5e7eb);
  color: var(--gray-700, #374151);
  border: 1px solid var(--gray-300, #d1d5db);
}

/* Pending review — amber */
.status-pending_review {
  background: #fef3c7;
  color: #92400e;
  border: 1px solid #fcd34d;
}

/* Approved — blue */
.status-approved {
  background: #dbeafe;
  color: var(--primary-700, #2563eb);
  border: 1px solid #93c5fd;
}

/* Published — green */
.status-published {
  background: #d1fae5;
  color: #065f46;
  border: 1px solid #6ee7b7;
}

/* Scheduled — purple */
.status-scheduled {
  background: #ede9fe;
  color: #5b21b6;
  border: 1px solid #c4b5fd;
}

/* Archived — dark gray */
.status-archived {
  background: var(--gray-800, #1f2937);
  color: var(--gray-300, #d1d5db);
  border: 1px solid var(--gray-700, #374151);
}
</style>

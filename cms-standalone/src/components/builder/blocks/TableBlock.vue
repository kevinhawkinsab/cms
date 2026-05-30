<template>
  <div
    class="table-block container"
    :data-testid="`table-block-${block.id}`"
    :style="block.styles"
  >
    <div class="table-wrap">
      <table class="data-table">
        <caption v-if="content.caption" class="table-caption">{{ content.caption }}</caption>
        <thead>
          <tr>
            <th v-for="(header, i) in (content.headers || ['Col 1', 'Col 2', 'Col 3'])" :key="i">
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, ri) in (content.rows || [])" :key="ri">
            <td v-for="(cell, ci) in row" :key="ci">{{ cell }}</td>
          </tr>
          <tr v-if="editing && (!content.rows || content.rows.length === 0)">
            <td v-for="(_, i) in (content.headers || ['Col 1', 'Col 2', 'Col 3'])" :key="i" class="empty-cell">—</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  block: { type: Object, required: true },
  editing: { type: Boolean, default: false }
})

const content = computed(() => props.block.content || {})
</script>

<style scoped>
.table-block {
  padding: 16px 0;
  overflow-x: auto;
}
.table-wrap {
  overflow-x: auto;
  border-radius: 14px;
  border: 1px solid rgba(63,100,88,0.1);
}
.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.92rem;
}
.table-caption {
  caption-side: top;
  text-align: left;
  padding: 12px 16px;
  font-size: 0.82rem;
  font-weight: 700;
  color: #64748b;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  background: #f8fafc;
  border-bottom: 1px solid rgba(63,100,88,0.08);
}
.data-table thead tr {
  background: #f1f5f0;
}
.data-table th {
  padding: 12px 16px;
  text-align: left;
  font-size: 0.8rem;
  font-weight: 800;
  color: #3f6458;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  border-bottom: 1px solid rgba(63,100,88,0.1);
  white-space: nowrap;
}
.data-table td {
  padding: 12px 16px;
  color: #334155;
  border-bottom: 1px solid rgba(63,100,88,0.06);
  vertical-align: middle;
}
.data-table tbody tr:last-child td {
  border-bottom: none;
}
.data-table tbody tr:hover {
  background: rgba(128,186,73,0.04);
}
.empty-cell {
  color: #cbd5e1;
  text-align: center;
}
</style>

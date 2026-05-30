<template>
  <section class="form-builder-block" :style="block.styles">
    <!-- Success state -->
    <div v-if="submitted" class="success-state">
      <div class="success-icon">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="9 12 12 15 16 9" />
        </svg>
      </div>
      <h3>{{ content.successMessage || '¡Formulario enviado con éxito!' }}</h3>
      <p>Gracias por tu mensaje. Te responderemos pronto.</p>
      <button class="btn-reset" @click="submitted = false">Enviar otro</button>
    </div>

    <!-- Form -->
    <form v-else @submit.prevent="handleSubmit" novalidate>
      <!-- Form title -->
      <h2 class="form-title" v-if="content.title || editing">
        {{ content.title || (editing ? 'Título del formulario' : '') }}
      </h2>

      <!-- No fields placeholder in editing mode -->
      <div v-if="editing && (!content.fields || content.fields.length === 0)" class="no-fields-placeholder">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="5" width="18" height="14" rx="2"/>
          <path d="M7 9h10M7 13h6"/>
        </svg>
        <span>Agrega campos al formulario desde el panel de edición</span>
      </div>

      <!-- Fields -->
      <div class="fields-list">
        <div
          v-for="(field, idx) in content.fields || []"
          :key="field.id || idx"
          class="field-wrap"
        >
          <!-- Editing mode: show dashed placeholder with icon -->
          <div v-if="editing" class="field-placeholder">
            <span class="field-type-icon">
              <component :is="fieldIcon(field.type)" />
            </span>
            <div class="field-placeholder-info">
              <span class="field-label-preview">{{ field.label || 'Campo sin nombre' }}</span>
              <span class="field-type-tag">{{ fieldTypeName(field.type) }}</span>
            </div>
            <span v-if="field.required" class="required-tag">Requerido</span>
          </div>

          <!-- Render mode: actual input -->
          <template v-else>
            <label class="field-label" :for="`field-${idx}`">
              {{ field.label }}
              <span v-if="field.required" class="required-star">*</span>
            </label>

            <textarea
              v-if="field.type === 'textarea'"
              :id="`field-${idx}`"
              v-model="formValues[idx]"
              :placeholder="field.placeholder || ''"
              :required="field.required"
              class="field-input field-textarea"
              rows="4"
            />

            <select
              v-else-if="field.type === 'select'"
              :id="`field-${idx}`"
              v-model="formValues[idx]"
              :required="field.required"
              class="field-input field-select"
            >
              <option value="" disabled>{{ field.placeholder || 'Selecciona una opción' }}</option>
              <option v-for="opt in (field.options || [])" :key="opt" :value="opt">{{ opt }}</option>
            </select>

            <div v-else-if="field.type === 'checkbox'" class="field-checkboxes">
              <label
                v-for="opt in (field.options || [field.label])"
                :key="opt"
                class="checkbox-option"
              >
                <input type="checkbox" :value="opt" v-model="formValues[idx]" />
                {{ opt }}
              </label>
            </div>

            <div v-else-if="field.type === 'radio'" class="field-radios">
              <label
                v-for="opt in (field.options || [])"
                :key="opt"
                class="radio-option"
              >
                <input type="radio" :name="`field-${idx}`" :value="opt" v-model="formValues[idx]" />
                {{ opt }}
              </label>
            </div>

            <input
              v-else
              :id="`field-${idx}`"
              :type="field.type === 'tel' ? 'tel' : field.type === 'email' ? 'email' : 'text'"
              v-model="formValues[idx]"
              :placeholder="field.placeholder || ''"
              :required="field.required"
              class="field-input"
            />

            <p v-if="fieldErrors[idx]" class="field-error">{{ fieldErrors[idx] }}</p>
          </template>
        </div>
      </div>

      <!-- Submit button (render mode only) -->
      <button v-if="!editing" type="submit" class="submit-btn">
        {{ content.submitText || 'Enviar' }}
      </button>
    </form>
  </section>
</template>

<script setup>
import { ref, computed, h } from 'vue'

const props = defineProps({
  block: { type: Object, required: true },
  editing: { type: Boolean, default: false }
})

const content = computed(() => props.block.content || {})

const formValues = ref([])
const fieldErrors = ref([])
const submitted = ref(false)

function handleSubmit() {
  const fields = content.value.fields || []
  fieldErrors.value = fields.map((field, idx) => {
    if (field.required && !formValues.value[idx]) {
      return `El campo "${field.label}" es requerido.`
    }
    return null
  })
  if (fieldErrors.value.some(Boolean)) return
  // Mock submit
  submitted.value = true
  formValues.value = []
}

// Inline SVG icon components per field type
const TextIcon = () => h('svg', { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
  h('path', { d: 'M4 6h16M4 12h10M4 18h6' })
])
const EmailIcon = () => h('svg', { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
  h('path', { d: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z' }),
  h('polyline', { points: '22,6 12,13 2,6' })
])
const TelIcon = () => h('svg', { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
  h('path', { d: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.58 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.79a16 16 0 0 0 6 6l1.86-1.86a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.03z' })
])
const TextareaIcon = () => h('svg', { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
  h('rect', { x: 3, y: 3, width: 18, height: 18, rx: 2 }),
  h('path', { d: 'M7 8h10M7 12h10M7 16h6' })
])
const SelectIcon = () => h('svg', { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
  h('rect', { x: 1, y: 5, width: 22, height: 14, rx: 2 }),
  h('polyline', { points: '8 10 12 14 16 10' })
])
const CheckboxIcon = () => h('svg', { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
  h('rect', { x: 3, y: 3, width: 18, height: 18, rx: 2 }),
  h('polyline', { points: '9 11 12 14 16 9' })
])
const RadioIcon = () => h('svg', { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
  h('circle', { cx: 12, cy: 12, r: 10 }),
  h('circle', { cx: 12, cy: 12, r: 4 })
])

const ICONS = { text: TextIcon, email: EmailIcon, tel: TelIcon, textarea: TextareaIcon, select: SelectIcon, checkbox: CheckboxIcon, radio: RadioIcon }
const TYPE_NAMES = { text: 'Texto', email: 'Correo', tel: 'Teléfono', textarea: 'Área de texto', select: 'Selector', checkbox: 'Casillas', radio: 'Opción única' }

function fieldIcon(type) { return ICONS[type] || TextIcon }
function fieldTypeName(type) { return TYPE_NAMES[type] || type }
</script>

<style scoped>
.form-builder-block {
  padding: 40px;
  background: #fff;
  border-radius: 16px;
  max-width: 640px;
  margin: 0 auto;
  font-family: var(--font-sans, sans-serif);
}

/* Form title */
.form-title {
  font-size: 1.4rem;
  font-weight: 800;
  color: var(--gray-900, #111827);
  margin: 0 0 28px;
}

/* No-fields placeholder */
.no-fields-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 40px 24px;
  border: 2px dashed var(--gray-300, #d1d5db);
  border-radius: var(--radius-md, 8px);
  color: var(--gray-400, #9ca3af);
  text-align: center;
  font-size: 0.875rem;
}

/* Fields list */
.fields-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Editing placeholder */
.field-placeholder {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border: 2px dashed var(--gray-300, #d1d5db);
  border-radius: var(--radius-md, 8px);
  background: var(--gray-200, #f9fafb);
  transition: border-color 0.14s;
}
.field-placeholder:hover { border-color: var(--primary-700, #2563eb); }

.field-type-icon {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #dbeafe;
  color: var(--primary-700, #2563eb);
  border-radius: 6px;
  flex-shrink: 0;
}

.field-placeholder-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
  min-width: 0;
}

.field-label-preview {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--gray-800, #1f2937);
}

.field-type-tag {
  font-size: 0.72rem;
  color: var(--gray-500, #6b7280);
}

.required-tag {
  font-size: 0.68rem;
  font-weight: 700;
  color: #dc2626;
  background: #fee2e2;
  padding: 2px 8px;
  border-radius: 999px;
  flex-shrink: 0;
}

/* Render mode fields */
.field-wrap {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--gray-800, #1f2937);
}

.required-star {
  color: #dc2626;
  margin-left: 2px;
}

.field-input {
  width: 100%;
  padding: 10px 14px;
  font-size: 0.875rem;
  font-family: var(--font-sans, sans-serif);
  color: var(--gray-900, #111827);
  background: #fff;
  border: 1.5px solid var(--gray-300, #d1d5db);
  border-radius: var(--radius-md, 8px);
  outline: none;
  transition: border-color 0.14s, box-shadow 0.14s;
  box-sizing: border-box;
}
.field-input:focus {
  border-color: var(--primary-700, #2563eb);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}
.field-input::placeholder { color: var(--gray-400, #9ca3af); }

.field-textarea { resize: vertical; min-height: 96px; }

.field-select { appearance: none; cursor: pointer; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 14px center; padding-right: 36px; }

.field-checkboxes,
.field-radios {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.checkbox-option,
.radio-option {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.875rem;
  color: var(--gray-700, #374151);
  cursor: pointer;
}
.checkbox-option input,
.radio-option input {
  width: 16px;
  height: 16px;
  accent-color: var(--primary-700, #2563eb);
  cursor: pointer;
}

.field-error {
  font-size: 0.75rem;
  color: #dc2626;
  margin: 0;
}

/* Submit button */
.submit-btn {
  margin-top: 8px;
  width: 100%;
  padding: 12px 24px;
  font-size: 0.9rem;
  font-weight: 700;
  font-family: var(--font-sans, sans-serif);
  color: #fff;
  background: var(--primary-700, #2563eb);
  border: none;
  border-radius: var(--radius-md, 8px);
  cursor: pointer;
  transition: opacity 0.14s, transform 0.1s;
}
.submit-btn:hover { opacity: 0.88; }
.submit-btn:active { transform: scale(0.98); }

/* Success state */
.success-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 12px;
  padding: 32px 16px;
}

.success-icon {
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #d1fae5;
  color: #059669;
  border-radius: 50%;
}

.success-state h3 {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--gray-900, #111827);
  margin: 0;
}

.success-state p {
  font-size: 0.875rem;
  color: var(--gray-600, #4b5563);
  margin: 0;
}

.btn-reset {
  margin-top: 8px;
  padding: 8px 20px;
  font-size: 0.82rem;
  font-weight: 600;
  font-family: var(--font-sans, sans-serif);
  color: var(--primary-700, #2563eb);
  background: #eff6ff;
  border: 1.5px solid #bfdbfe;
  border-radius: var(--radius-md, 8px);
  cursor: pointer;
  transition: background 0.14s;
}
.btn-reset:hover { background: #dbeafe; }
</style>

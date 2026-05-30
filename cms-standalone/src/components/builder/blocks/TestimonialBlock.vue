<template>
  <div
    class="testimonial-block container"
    :data-testid="`testimonial-block-${block.id}`"
    :style="block.styles"
  >
    <div class="testimonial-grid">
      <div
        v-for="(item, i) in (content.items || [])"
        :key="i"
        class="testimonial-card"
      >
        <div class="testimonial-stars">
          <span
            v-for="n in 5"
            :key="n"
            class="star"
            :class="n <= (item.rating || 5) ? 'star-filled' : 'star-empty'"
          >★</span>
        </div>
        <p class="testimonial-quote">
          "{{ item.quote || (editing ? 'Escribe el testimonio del cliente aqui.' : '') }}"
        </p>
        <div class="testimonial-author">
          <img
            v-if="item.avatar"
            :src="item.avatar"
            :alt="item.author || ''"
            class="testimonial-avatar"
            loading="lazy"
          />
          <div v-else class="testimonial-avatar-placeholder">
            <i class="fas fa-user"></i>
          </div>
          <div class="testimonial-meta">
            <span class="testimonial-name">{{ item.author || (editing ? 'Nombre del autor' : '') }}</span>
            <span v-if="item.role" class="testimonial-role">{{ item.role }}</span>
          </div>
        </div>
      </div>
      <div v-if="editing && (!content.items || content.items.length === 0)" class="testimonial-card testimonial-placeholder">
        <div class="testimonial-stars">
          <span v-for="n in 5" :key="n" class="star star-filled">★</span>
        </div>
        <p class="testimonial-quote">"Agrega testimonios desde el panel de propiedades."</p>
        <div class="testimonial-author">
          <div class="testimonial-avatar-placeholder"><i class="fas fa-user"></i></div>
          <div class="testimonial-meta">
            <span class="testimonial-name">Cliente ejemplo</span>
            <span class="testimonial-role">Cargo o empresa</span>
          </div>
        </div>
      </div>
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
.testimonial-block {
  padding: 16px 0;
}
.testimonial-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}
.testimonial-card {
  background: #fff;
  border: 1px solid rgba(63,100,88,0.08);
  border-radius: 20px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: box-shadow 0.2s;
}
.testimonial-card:hover {
  box-shadow: 0 8px 28px rgba(63,100,88,0.08);
}
.testimonial-placeholder { opacity: 0.45; border-style: dashed; }
.testimonial-stars {
  display: flex;
  gap: 2px;
}
.star {
  font-size: 1.1rem;
  line-height: 1;
}
.star-filled { color: #f59e0b; }
.star-empty { color: #e2e8f0; }
.testimonial-quote {
  font-size: 0.93rem;
  line-height: 1.75;
  color: #334155;
  font-style: italic;
  margin: 0;
  flex: 1;
}
.testimonial-author {
  display: flex;
  align-items: center;
  gap: 12px;
}
.testimonial-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}
.testimonial-avatar-placeholder {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(128,186,73,0.1);
  color: #80ba49;
  display: grid;
  place-items: center;
  font-size: 1rem;
  flex-shrink: 0;
}
.testimonial-meta {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.testimonial-name {
  font-size: 0.88rem;
  font-weight: 700;
  color: #1e2022;
}
.testimonial-role {
  font-size: 0.78rem;
  color: #94a3b8;
}
</style>

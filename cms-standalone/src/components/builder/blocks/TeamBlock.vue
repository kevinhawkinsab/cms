<template>
  <section
    class="team-block"
    :data-testid="`team-block-${block.id}`"
    :style="block.styles"
  >
    <div v-if="content.title || content.subtitle || editing" class="team-header">
      <p v-if="content.eyebrow || editing" class="team-eyebrow">
        {{ content.eyebrow || (editing ? 'NUESTRO EQUIPO' : '') }}
      </p>
      <h2 v-if="content.title || editing" class="team-title">
        {{ content.title || (editing ? 'Conoce al equipo' : '') }}
      </h2>
      <p v-if="content.subtitle || editing" class="team-subtitle">
        {{ content.subtitle || (editing ? 'Subtítulo de la sección' : '') }}
      </p>
    </div>

    <div class="team-grid" :class="`team-grid--${content.columns || 4}`">
      <div
        v-for="(member, i) in (content.members || [])"
        :key="i"
        class="team-card"
      >
        <div class="team-avatar-wrap">
          <img v-if="member.photo" :src="member.photo" :alt="member.name" class="team-avatar" loading="lazy" />
          <div v-else class="team-avatar-placeholder">
            <i class="fas fa-user"></i>
          </div>
        </div>
        <h4 class="team-name">{{ member.name || (editing ? 'Nombre' : '') }}</h4>
        <p class="team-role">{{ member.role || (editing ? 'Cargo' : '') }}</p>
        <p v-if="member.bio" class="team-bio">{{ member.bio }}</p>
        <div v-if="member.linkedin || member.instagram" class="team-social">
          <a v-if="member.linkedin" :href="member.linkedin" target="_blank" class="team-social-link">
            <i class="fab fa-linkedin-in"></i>
          </a>
          <a v-if="member.instagram" :href="member.instagram" target="_blank" class="team-social-link">
            <i class="fab fa-instagram"></i>
          </a>
        </div>
      </div>

      <template v-if="editing && (!content.members || content.members.length === 0)">
        <div v-for="i in (content.columns || 4)" :key="`ph-${i}`" class="team-card team-card--placeholder">
          <div class="team-avatar-placeholder"><i class="fas fa-user"></i></div>
          <h4 class="team-name">Nombre</h4>
          <p class="team-role">Cargo / Rol</p>
        </div>
      </template>
    </div>
  </section>
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
.team-block { padding: 56px 0; }
.team-header { text-align: center; margin-bottom: 40px; }
.team-eyebrow { font-size: 0.72rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #64748b; margin: 0 0 10px; }
.team-title { font-size: 2rem; font-weight: 800; color: #1e2022; margin: 0 0 12px; }
.team-subtitle { font-size: 1rem; color: #64748b; margin: 0 auto; max-width: 560px; }

.team-grid { display: grid; gap: 24px; }
.team-grid--2 { grid-template-columns: repeat(2, 1fr); }
.team-grid--3 { grid-template-columns: repeat(3, 1fr); }
.team-grid--4 { grid-template-columns: repeat(4, 1fr); }

.team-card {
  text-align: center; background: #fff;
  border: 1px solid rgba(0,0,0,0.07); border-radius: 20px;
  padding: 28px 20px; transition: box-shadow 0.2s;
}
.team-card:hover { box-shadow: 0 8px 32px rgba(0,0,0,0.09); }
.team-card--placeholder { opacity: 0.35; }
.team-avatar-wrap { margin-bottom: 16px; }
.team-avatar { width: 80px; height: 80px; border-radius: 50%; object-fit: cover; }
.team-avatar-placeholder {
  width: 80px; height: 80px; border-radius: 50%; background: #f1f5f9;
  display: flex; align-items: center; justify-content: center;
  color: #cbd5e1; font-size: 1.8rem; margin: 0 auto;
}
.team-name { font-size: 1rem; font-weight: 700; color: #1e2022; margin: 0 0 4px; }
.team-role { font-size: 0.82rem; color: #3f6458; font-weight: 600; margin: 0 0 10px; }
.team-bio { font-size: 0.82rem; color: #64748b; line-height: 1.6; margin: 0 0 12px; }
.team-social { display: flex; gap: 8px; justify-content: center; }
.team-social-link {
  width: 32px; height: 32px; border-radius: 50%; background: #f1f5f9;
  display: flex; align-items: center; justify-content: center;
  color: #3f6458; font-size: 0.8rem; text-decoration: none; transition: all 0.15s;
}
.team-social-link:hover { background: #3f6458; color: #fff; }

@media (max-width: 900px) { .team-grid--4 { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 600px) { .team-grid { grid-template-columns: repeat(2, 1fr); } }
</style>

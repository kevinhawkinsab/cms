<template>
  <div class="posts-manager">

    <!-- Toast notification -->
    <Transition name="toast-slide">
      <div v-if="notice.text" class="bsw-toast" :class="notice.type" role="alert" aria-live="polite">
        <div class="bsw-toast__icon">
          <svg v-if="notice.type === 'success'" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8l3.5 3.5L13 4.5" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <svg v-else width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 5v4M8 11h.01" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/>
            <circle cx="8" cy="8" r="6.25" stroke="currentColor" stroke-width="1.5"/>
          </svg>
        </div>
        <span class="bsw-toast__text">{{ notice.text }}</span>
        <button class="bsw-toast__close" @click="notice = { type: '', text: '' }" aria-label="Cerrar">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </button>
      </div>
    </Transition>

    <!-- Page header -->
    <div class="page-header">
      <div class="page-header__left">
        <div class="page-header__breadcrumb">
          <span>CMS</span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M4.5 2.5L7.5 6l-3 3.5" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <span class="active">Publicaciones</span>
        </div>
        <h1 class="page-header__title">Publicaciones</h1>
        <p class="page-header__desc">Gestiona noticias, comunicados y artículos del blog corporativo.</p>
      </div>
      <div class="page-header__actions">
        <button class="btn-ghost" @click="refreshAll">
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M13.5 7.5A6 6 0 1 1 7.5 1.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M13.5 1.5v6h-6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          Actualizar
        </button>
        <button v-if="canCreate" class="btn-primary" @click="openPostModal()" data-testid="new-post-btn">
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M7.5 2v11M2 7.5h11" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/></svg>
          Nueva publicación
        </button>
      </div>
    </div>

    <!-- Stats row -->
    <div class="stats-row">
      <div class="stat-chip" v-for="stat in statsCards" :key="stat.label">
        <div class="stat-chip__icon" :class="stat.color">
          <svg v-if="stat.label === 'Total'" width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="1" width="12" height="12" rx="2" stroke="currentColor" stroke-width="1.4"/><path d="M4 5h6M4 7.5h6M4 10h4" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/></svg>
          <svg v-else-if="stat.label === 'Publicadas'" width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="currentColor" stroke-width="1.4"/><path d="M4.5 7l2 2 3-3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <svg v-else-if="stat.label === 'Ocultas'" width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7s2.5-5 6-5 6 5 6 5-2.5 5-6 5-6-5-6-5z" stroke="currentColor" stroke-width="1.4"/><circle cx="7" cy="7" r="1.75" stroke="currentColor" stroke-width="1.4"/><path d="M2 2l10 10" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
          <svg v-else width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M4.5 1v12M1 4.5h12" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
        </div>
        <div class="stat-chip__info">
          <span class="stat-chip__value">{{ stat.value }}</span>
          <span class="stat-chip__label">{{ stat.label }}</span>
        </div>
      </div>
    </div>

    <!-- Main layout -->
    <div class="main-grid">

      <!-- Left: filters + list -->
      <div class="main-grid__content">

        <!-- Filters bar -->
        <div class="filters-bar">
          <div class="filters-bar__search">
            <svg class="filters-bar__search-icon" width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="5.5" cy="5.5" r="4" stroke="currentColor" stroke-width="1.4"/>
              <path d="M9 9l3.5 3.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
            </svg>
            <input
              v-model.trim="searchQuery"
              type="text"
              class="filters-bar__input"
              placeholder="Buscar por título, slug o resumen..."
            >
            <button v-if="searchQuery" class="filters-bar__clear-search" @click="searchQuery = ''" aria-label="Limpiar búsqueda">
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M1 1l9 9M10 1L1 10" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
            </button>
          </div>

          <div class="filters-bar__controls">
            <select v-model="filterCategory" class="filter-select">
              <option value="">Todas las categorías</option>
              <option v-for="cat in categories" :key="cat._id" :value="cat._id">{{ cat.name }}</option>
            </select>

            <div class="status-pills">
              <button
                v-for="opt in statusOptions"
                :key="opt.value"
                class="status-pill"
                :class="{ active: filterStatus === opt.value }"
                @click="filterStatus = opt.value"
              >{{ opt.label }}</button>
            </div>

            <select v-model="pageSize" class="filter-select filter-select--sm">
              <option :value="6">6 / pág.</option>
              <option :value="12">12 / pág.</option>
              <option :value="24">24 / pág.</option>
            </select>

            <button class="btn-ghost btn-ghost--sm" @click="clearFilters">Limpiar</button>
          </div>
        </div>

        <!-- Results meta -->
        <div class="results-meta">
          <span class="results-meta__count">{{ pagination.total }} publicaciones</span>
          <span class="results-meta__sep">·</span>
          <span class="results-meta__page">Página {{ pagination.page }} de {{ pagination.pages }}</span>
        </div>

        <!-- Posts list -->
        <div class="posts-list">

          <!-- Loading state -->
          <div v-if="loadingPosts" class="posts-list__loading">
            <div v-for="i in 4" :key="i" class="skeleton-row">
              <div class="skeleton skeleton--thumb"></div>
              <div class="skeleton-row__body">
                <div class="skeleton skeleton--line skeleton--line-lg"></div>
                <div class="skeleton skeleton--line skeleton--line-md"></div>
                <div class="skeleton skeleton--line skeleton--line-sm"></div>
              </div>
            </div>
          </div>

          <!-- Empty state -->
          <div v-else-if="posts.length === 0" class="posts-list__empty">
            <div class="empty-icon">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <rect x="3" y="3" width="22" height="22" rx="4" stroke="currentColor" stroke-width="1.5"/>
                <path d="M9 10h10M9 14h10M9 18h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </div>
            <p class="empty-title">No hay publicaciones</p>
            <p class="empty-desc">Intenta ajustar los filtros o crea una nueva publicación.</p>
            <button class="btn-primary btn-primary--sm" @click="openPostModal()">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.5 1.5v10M1.5 6.5h10" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/></svg>
              Crear publicación
            </button>
          </div>

          <!-- Post rows -->
          <div v-else>
            <div
              v-for="post in posts"
              :key="post._id"
              class="post-row"
            >
              <div class="post-row__thumb">
                <img
                  :src="post.featuredImage || '/img/images/bambito-logo.png'"
                  :alt="post.title"
                  class="post-row__img"
                >
              </div>

              <div class="post-row__body">
                <div class="post-row__top">
                  <div class="post-row__meta-left">
                    <span
                      class="status-badge"
                      :class="post.visible ? 'status-badge--published' : 'status-badge--hidden'"
                    >
                      <span class="status-badge__dot"></span>
                      {{ post.visible ? 'Publicada' : 'Oculta' }}
                    </span>
                    <span
                      v-if="getPrimaryCategory(post)"
                      class="cat-badge"
                      :style="{ '--cat-color': getPrimaryCategory(post)?.color || '#1A4F3A' }"
                    >{{ getPrimaryCategory(post)?.name }}</span>
                    <span v-else class="cat-badge cat-badge--empty">Sin categoría</span>
                  </div>
                  <span class="post-row__date">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><rect x="1" y="2" width="10" height="9" rx="1.5" stroke="currentColor" stroke-width="1.2"/><path d="M4 1v2M8 1v2M1 5h10" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>
                    {{ formatDate(post.publishedAt) }}
                  </span>
                </div>

                <h3 class="post-row__title">{{ post.title }}</h3>

                <p v-if="post.excerpt" class="post-row__excerpt">{{ post.excerpt }}</p>

                <div class="post-row__actions">
                  <button v-if="canEdit" class="action-btn action-btn--edit" @click="openPostModal(post,'edit')" :data-testid="`edit-post-${post._id || post.id}`">
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M9.5 2L11 3.5 4 10.5l-2 .5.5-2 7-7z" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    Editar
                  </button>

                  <button v-if="canUseBuilder && canEdit" class="action-btn action-btn--builder" @click="openInBuilder(post)" :data-testid="`builder-post-${post._id || post.id}`">
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.5 1L8 4l3.5.5L9 7l.5 3.5L6.5 9 3.5 10.5 4 7 1.5 4.5 5 4z" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    Page Builder
                  </button>

                  <button v-if="canEdit || canPublish" class="action-btn action-btn--toggle" @click="toggleVisibility(post)">
                    <svg v-if="post.visible" width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M1 6.5s2.5-4.5 5.5-4.5S12 6.5 12 6.5s-2.5 4.5-5.5 4.5S1 6.5 1 6.5z" stroke="currentColor" stroke-width="1.3"/><circle cx="6.5" cy="6.5" r="1.75" stroke="currentColor" stroke-width="1.3"/><path d="M2 2l9 9" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
                    <svg v-else width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M1 6.5s2.5-4.5 5.5-4.5S12 6.5 12 6.5s-2.5 4.5-5.5 4.5S1 6.5 1 6.5z" stroke="currentColor" stroke-width="1.3"/><circle cx="6.5" cy="6.5" r="1.75" stroke="currentColor" stroke-width="1.3"/></svg>
                    {{ post.visible ? 'Ocultar' : 'Mostrar' }}
                  </button>

                  <button v-if="canDelete" class="action-btn action-btn--delete" @click="confirmDeleteAction(post)" :data-testid="`delete-post-${post._id || post.id}`">
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 3.5h9M5 3.5V2h3v1.5M5.5 6v4M7.5 6v4M3 3.5l.75 7h5.5L10 3.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div v-if="pagination.pages > 1" class="pagination-bar">
          <span class="pagination-bar__info">Mostrando {{ posts.length }} de {{ pagination.total }}</span>
          <div class="pagination-bar__controls">
            <button class="page-btn" :disabled="pagination.page === 1" @click="goToPage(pagination.page - 1)">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M8.5 3L5 7l3.5 4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
            <button
              v-for="page in pagesToShow"
              :key="page"
              class="page-btn"
              :class="{ 'page-btn--active': page === pagination.page }"
              @click="goToPage(page)"
            >{{ page }}</button>
            <button class="page-btn" :disabled="pagination.page === pagination.pages" @click="goToPage(pagination.page + 1)">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5.5 3L9 7l-3.5 4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
          </div>
        </div>

      </div>

      <!-- Right: sidebar -->
      <div class="main-grid__sidebar">

        <!-- Chart card -->
        <div class="sidebar-card">
          <div class="sidebar-card__header">
            <div>
              <p class="sidebar-card__title">Visibilidad</p>
              <p class="sidebar-card__sub">Distribución general</p>
            </div>
            <span class="count-pill">{{ overview.total }} total</span>
          </div>
          <div ref="overviewChartRef" style="width:100%;height:200px;"></div>
          <div class="chart-legend">
            <div class="chart-legend__item">
              <span class="chart-legend__dot chart-legend__dot--green"></span>
              <span class="chart-legend__label">Publicadas</span>
              <strong class="chart-legend__value">{{ overview.published }}</strong>
            </div>
            <div class="chart-legend__item">
              <span class="chart-legend__dot chart-legend__dot--gray"></span>
              <span class="chart-legend__label">Ocultas</span>
              <strong class="chart-legend__value">{{ overview.hidden }}</strong>
            </div>
          </div>
        </div>

        <!-- Quick actions card -->
        <div class="sidebar-card">
          <p class="sidebar-card__title sidebar-card__title--standalone">Acceso rápido</p>
          <div class="quick-actions">
            <button class="quick-action" @click="openPostModal()">
              <span class="quick-action__icon">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1.5v11M1.5 7h11" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
              </span>
              <span>Crear publicación</span>
              <svg class="quick-action__arrow" width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M4.5 2.5L8 6l-3.5 3.5" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
            <button class="quick-action" @click="refreshAll">
              <span class="quick-action__icon">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M12.5 7A5.5 5.5 0 1 1 7 1.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M12.5 1.5v5.5H7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </span>
              <span>Sincronizar datos</span>
              <svg class="quick-action__arrow" width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M4.5 2.5L8 6l-3.5 3.5" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
            <button class="quick-action" @click="clearFilters">
              <span class="quick-action__icon">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 3.5h10M4 7h6M6 10.5h2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M11 2l-9 10" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>
              </span>
              <span>Limpiar filtros</span>
              <svg class="quick-action__arrow" width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M4.5 2.5L8 6l-3.5 3.5" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
          </div>
        </div>

      </div>
    </div>

    <!-- ─────────── MODAL crear / editar ─────────── -->
    <div class="modal fade" id="postModal" tabindex="-1" ref="postModalRef">
      <div class="modal-dialog modal-xl modal-dialog-scrollable modal-dialog-centered">
        <div class="modal-content bsw-modal">

          <!-- Modal header -->
          <div class="bsw-modal__header">
            <div class="bsw-modal__header-left">
              <div class="bsw-modal__header-icon">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="2" y="2" width="12" height="12" rx="2.5" stroke="currentColor" stroke-width="1.5"/>
                  <path d="M5 6h6M5 8.5h6M5 11h4" stroke="currentColor" stroke-width="1.35" stroke-linecap="round"/>
                </svg>
              </div>
              <div>
                <h2 class="bsw-modal__title">{{ editingPost ? 'Editar publicación' : 'Nueva publicación' }}</h2>
                <p class="bsw-modal__sub">Contenido principal, SEO, categorías e imágenes</p>
              </div>
            </div>
            <button type="button" class="bsw-modal__close" data-bs-dismiss="modal" aria-label="Cerrar">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 1l12 12M13 1L1 13" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
            </button>
          </div>

          <!-- Modal body -->
          <div class="modal-body bsw-modal__body">
            <form @submit.prevent="savePost">
              <div class="modal-grid">

                <!-- Left column -->
                <div class="modal-grid__main">

                  <!-- Section: contenido -->
                  <div class="form-section">
                    <div class="form-section__header">
                      <span class="form-section__label">Contenido</span>
                    </div>
                    <div class="form-group">
                      <label class="field-label">Título <span class="field-required">*</span></label>
                      <input v-model.trim="postForm.title" type="text" class="field-input" required placeholder="Ej. Agua natural de origen volcánico">
                    </div>
                    <div class="form-group">
                      <label class="field-label">Resumen / Extracto <span class="field-required">*</span></label>
                      <textarea v-model.trim="postForm.excerpt" class="field-input field-textarea" rows="3" required placeholder="Breve descripción de la publicación…"></textarea>
                    </div>
                    <div class="form-group">
                      <label class="field-label">Contenido <span class="field-required">*</span></label>
                      <div class="quill-wrapper">
                        <QuillEditor v-model:content="postForm.content" contentType="html" theme="snow" :options="quillOptions" style="min-height: 260px;" />
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group">
                        <label class="field-label">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style="color:#e74c3c"><rect x="1" y="1" width="10" height="10" rx="2" fill="currentColor"/><path d="M4 6l1.5 1.5L8 4" stroke="white" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                          URL de video
                        </label>
                        <input v-model.trim="postForm.videoUrl" type="url" class="field-input" placeholder="https://youtube.com/watch?v=...">
                      </div>
                      <div class="form-group">
                        <label class="field-label">URL canónica</label>
                        <input v-model.trim="postForm.seo.canonicalUrl" type="url" class="field-input" placeholder="https://bambitospringwater.com/blog/...">
                      </div>
                    </div>
                  </div>

                  <!-- Section: SEO -->
                  <div class="form-section">
                    <div class="form-section__header">
                      <span class="form-section__label">SEO</span>
                      <span class="form-section__badge">Opcional</span>
                    </div>
                    <div class="form-group">
                      <label class="field-label">Meta título</label>
                      <input v-model.trim="postForm.seo.metaTitle" type="text" class="field-input" maxlength="60" placeholder="Máximo 60 caracteres">
                      <div class="field-hint">
                        <span :class="{ 'field-hint--warn': postForm.seo.metaTitle.length > 50 }">{{ postForm.seo.metaTitle.length }}/60</span>
                        <span>caracteres</span>
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="field-label">Meta descripción</label>
                      <textarea v-model.trim="postForm.seo.metaDescription" class="field-input field-textarea" rows="3" maxlength="160" placeholder="Máximo 160 caracteres"></textarea>
                      <div class="field-hint">
                        <span :class="{ 'field-hint--warn': postForm.seo.metaDescription.length > 140 }">{{ postForm.seo.metaDescription.length }}/160</span>
                        <span>caracteres</span>
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="field-label">Keywords</label>
                      <input v-model.trim="seoKeywordsInput" type="text" class="field-input" placeholder="agua, bambito, premium (separadas por comas)">
                    </div>
                  </div>

                </div>

                <!-- Right column -->
                <div class="modal-grid__sidebar">

                  <!-- Imagen destacada -->
                  <div class="form-section">
                    <div class="form-section__header">
                      <span class="form-section__label">Imagen destacada</span>
                    </div>
                    <div class="img-preview-box" :class="{ 'img-preview-box--filled': postForm.featuredImage }">
                      <img v-if="postForm.featuredImage" :src="postForm.featuredImage" alt="Imagen destacada" class="img-preview-box__img">
                      <div v-else class="img-preview-box__placeholder">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" stroke-width="1.4"/><circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" stroke-width="1.4"/><path d="M3 15l5-5 4 4 3-3 6 6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        <span>Sin imagen</span>
                      </div>
                    </div>
                    <div class="form-group" style="margin-top:10px">
                      <input v-model.trim="postForm.featuredImage" type="url" class="field-input" placeholder="URL de imagen">
                    </div>
                    <label class="file-upload-label">
                      <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.5 1v8M3.5 4L6.5 1l3 3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M1 10.5h11" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
                      {{ uploadingMedia ? 'Subiendo...' : 'Cargar desde archivo' }}
                      <input type="file" accept="image/*" class="sr-only" @change="handleImageUpload($event, 'featured')" :disabled="uploadingMedia">
                    </label>
                  </div>

                  <!-- Estado -->
                  <div class="form-section">
                    <div class="form-section__header">
                      <span class="form-section__label">Estado y fecha</span>
                    </div>
                    <div class="toggle-row">
                      <label class="toggle-row__label" for="visible">Visible en la web</label>
                      <div class="bsw-toggle">
                        <input id="visible" v-model="postForm.visible" type="checkbox" class="bsw-toggle__input">
                        <span class="bsw-toggle__track">
                          <span class="bsw-toggle__thumb"></span>
                        </span>
                      </div>
                    </div>
                    <div class="form-group" style="margin-top:12px">
                      <label class="field-label">Fecha de publicación</label>
                      <input v-model="postForm.publishedAt" type="datetime-local" class="field-input">
                    </div>
                  </div>

                  <!-- Categorías -->
                  <div class="form-section">
                    <div class="form-section__header">
                      <span class="form-section__label">Categorías</span>
                    </div>
                    <div class="categories-list">
                      <label
                        v-for="cat in categories"
                        :key="cat._id"
                        class="cat-check"
                        :for="`cat-${cat._id}`"
                      >
                        <div class="cat-check__left">
                          <span class="cat-check__dot" :style="{ background: cat.color || '#1A4F3A' }"></span>
                          <span class="cat-check__name">{{ cat.name }}</span>
                        </div>
                        <input
                          class="cat-check__input"
                          type="checkbox"
                          :id="`cat-${cat._id}`"
                          :value="cat._id"
                          v-model="postForm.categories"
                        >
                        <span class="cat-check__box"></span>
                      </label>
                    </div>
                  </div>

                  <!-- Etiquetas -->
                  <div class="form-section">
                    <div class="form-section__header">
                      <span class="form-section__label">Etiquetas</span>
                    </div>
                    <input v-model.trim="tagsInput" type="text" class="field-input" placeholder="agua, premium, salud (comas)">
                    <div class="tags-container" v-if="postForm.tags.length">
                      <span v-for="tag in postForm.tags" :key="tag" class="tag-pill">
                        {{ tag }}
                        <button type="button" class="tag-pill__remove" @click="removeTag(tag)" aria-label="Eliminar etiqueta">
                          <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M1 1l7 7M8 1L1 8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
                        </button>
                      </span>
                    </div>
                  </div>

                  <!-- Imágenes adicionales -->
                  <div class="form-section">
                    <div class="form-section__header">
                      <span class="form-section__label">Imágenes adicionales</span>
                    </div>
                    <div v-if="postForm.images.length" class="gallery-grid">
                      <div v-for="(img, index) in postForm.images" :key="`${img}-${index}`" class="gallery-thumb">
                        <img :src="img" alt="Imagen adicional" class="gallery-thumb__img">
                        <button type="button" class="gallery-thumb__remove" @click="removeImage(index)" aria-label="Eliminar imagen">
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1 1l8 8M9 1L1 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
                        </button>
                      </div>
                    </div>
                    <label class="file-upload-label" style="margin-top:10px">
                      <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.5 1v8M3.5 4L6.5 1l3 3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M1 10.5h11" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
                      Cargar imágenes
                      <input type="file" accept="image/*" multiple class="sr-only" @change="handleImageUpload($event, 'gallery')">
                    </label>
                  </div>

                </div>
              </div>
            </form>
          </div>

          <!-- Modal footer -->
          <div class="bsw-modal__footer">
            <button type="button" class="btn-ghost" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" class="btn-primary" @click="savePost" :disabled="savingPost || uploadingMedia">
              <span v-if="savingPost" class="btn-loading">
                <svg class="spin" width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5" stroke="currentColor" stroke-width="1.5" stroke-dasharray="20 12"/></svg>
                Guardando…
              </span>
              <span v-else>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7.5L5.5 11 12 3" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/></svg>
                {{ editingPost ? 'Actualizar' : 'Publicar' }}
              </span>
            </button>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import { storeToRefs } from 'pinia'
import * as echarts from 'echarts'
import { useRouter } from 'vue-router'
import { useCmsStore } from '~/stores/cms'
import { useAuthStore } from '~/stores/auth'
import { notify, confirmDelete, alertPermissionDenied } from '~/services/notifications'
import { postsService } from '~/services/api'

const cmsStore = useCmsStore()
const authStore = useAuthStore()
const router = useRouter()

const canCreate = computed(() => authStore.hasPermission('posts.create'))
const canEdit = computed(() => authStore.hasPermission('posts.edit'))
const canDelete = computed(() => authStore.hasPermission('posts.delete'))
const canPublish = computed(() => authStore.hasPermission('posts.publish'))
const canUseBuilder = computed(() => authStore.hasPermission('pagebuilder.edit'))

const {
  posts,
  categories,
  pagination,
  overview,
  loadingPosts,
  savingPost,
  deletingPost,
  uploadingMedia
} = storeToRefs(cmsStore)

const searchQuery = ref('')
const filterCategory = ref('')
const filterStatus = ref('all')
const pageSize = ref(12)
const postDetails = ref(null)

const editingPost = ref(null)
const deletingPostItem = ref(null)
const tagsInput = ref('')
const seoKeywordsInput = ref('')
const notice = ref({ type: '', text: '' })

const postModalRef = ref(null)
let postModal = null

const overviewChartRef = ref(null)
let overviewChart = null

let filterTimer = null

const statusOptions = [
  { value: 'all', label: 'Todas' },
  { value: 'visible', label: 'Publicadas' },
  { value: 'hidden', label: 'Ocultas' }
]

const quillOptions = {
  modules: {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['blockquote', 'link', 'image'],
      ['clean']
    ]
  }
}

const createDefaultSeo = () => ({
  metaTitle: '',
  metaDescription: '',
  metaKeywords: [],
  canonicalUrl: '',
  ogImage: ''
})

const defaultPostForm = () => ({
  title: '',
  excerpt: '',
  content: '',
  featuredImage: '',
  images: [],
  videoUrl: '',
  categories: [],
  tags: [],
  visible: true,
  author: '',
  publishedAt: new Date().toISOString().slice(0, 16),
  seo: createDefaultSeo()
})

const postForm = ref(defaultPostForm())

const showNotice = (type, text) => {
  notice.value = { type, text }
}

const parseCommaList = (value) =>
  value ? value.split(',').map((item) => item.trim()).filter(Boolean) : []

const clearFilters = () => {
  searchQuery.value = ''
  filterCategory.value = ''
  filterStatus.value = 'all'
  pageSize.value = 12
}

const getPrimaryCategory = (post) => {
  const first = post?.categories?.[0]
  if (!first) return null
  if (typeof first === 'object') return first
  return categories.value.find((c) => c._id === first) || null
}

const createFormFromPost = (post = {}) => ({
  ...defaultPostForm(),
  ...post,
  images: Array.isArray(post.images) ? [...post.images] : [],
  tags: Array.isArray(post.tags) ? [...post.tags] : [],
  categories: post.categories?.map((c) => (typeof c === 'object' ? c._id : c)) || [],
  publishedAt: post.publishedAt
    ? new Date(post.publishedAt).toISOString().slice(0, 16)
    : new Date().toISOString().slice(0, 16),
  seo: { ...createDefaultSeo(), ...(post.seo || {}) }
})

const openPostModal = async (post = null, action = '') => {
  console.log('Abriendo modal para:', post, 'Acción:', action)
  if (post && !canEdit.value) { alertPermissionDenied('posts.edit'); return }
  if (!post && !canCreate.value) { alertPermissionDenied('posts.create'); return }
  editingPost.value = post
  postForm.value = post ? createFormFromPost(post) : defaultPostForm()
  tagsInput.value = postForm.value.tags.join(', ')
  seoKeywordsInput.value = (postForm.value.seo.metaKeywords || []).join(', ')

  if(action === 'edit') {
    postDetails.value = await fetchPostInfo(post?.id);
  }
  postModal?.show()
}

const confirmDeleteAction = async (post) => {
  if (!canDelete.value) { alertPermissionDenied('posts.delete'); return }
  const ok = await confirmDelete({
    title: '¿Eliminar publicación?',
    text: `Se eliminará "${post.title}". Esta acción no se puede deshacer.`
  })
  if (!ok) return
  deletingPostItem.value = post
  await deletePost()
}

const openInBuilder = (post) => {
  if (!canUseBuilder.value) { alertPermissionDenied('pagebuilder.edit'); return }
  router.push({ path: '/bambito-cms/page-builder', query: { postId: post._id || post.id } })
}

const buildPayload = () => {
  const tags = parseCommaList(tagsInput.value)
  const metaKeywords = parseCommaList(seoKeywordsInput.value)
  const images = postForm.value?.images || []

  return {
    ...postForm.value,
    blocks: normalizeApiBlocks(postDetails.value?.content),
    featuredImage: { url: images[0], alt: postForm.value.title, thumbnailUrl: images[0] },
    tags,
    seo: { ...postForm.value.seo, metaKeywords, ogImage: postForm.value.seo.ogImage || postForm.value.featuredImage || '' }
  }
}
 
const loadPosts = async (page = 1) => {
  try {
    await cmsStore.fetchPosts({
      search: searchQuery.value || undefined,
      category: filterCategory.value || undefined,
      visible: filterStatus.value === 'all' ? undefined : filterStatus.value === 'visible',
      page,
      limit: pageSize.value
    })
  } catch (error) { notify.error(error) }
}

const savePost = async () => {
  try {
    if (editingPost.value && !canEdit.value) { alertPermissionDenied('posts.edit'); return }
    if (!editingPost.value && !canCreate.value) { alertPermissionDenied('posts.create'); return }
    const payload = buildPayload();

    // console.log('Payload a guardar:', payload);

    if (editingPost.value) {
      await cmsStore.updatePost(editingPost.value._id || editingPost.value.id, payload)
      notify.success('La publicación fue actualizada correctamente.')
    } else {
      await cmsStore.createPost(payload)
      notify.success('La publicación fue creada correctamente.')
    }
    postModal?.hide()
    await cmsStore.fetchOverview()
    await loadPosts(pagination.value.page || 1)
  } catch (error) { notify.error(error) }
}

function normalizeApiBlocks(blocks = []) {
  return (blocks || [])
    .filter((b) => b)
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
    .map((b) => ({
      id: b.id ? `block-${b.id}` : generateId(),
      serverId: b.id ?? null,
      type: b.type || b.blockType,
      content: typeof b.content === 'string' ? safeJson(b.content, {}) : (b.content || {}),
      styles: typeof b.styles === 'string' ? safeJson(b.styles, {}) : (b.styles || {}),
      visible: b.visible ?? b.isVisible ?? true,
      sortOrder: b.sortOrder ?? 0
    }))
}
const fetchPostInfo = async (postId) => {
  try {
    const fallbackResponse = await postsService.getById(postId)
    return fallbackResponse
  } catch (error) {
    return { success: false, error: getApiErrorMessage(error) }
  }
}

const deletePost = async () => {
  try {
    await cmsStore.deletePost(deletingPostItem.value._id || deletingPostItem.value.id)
    notify.success('La publicación fue eliminada correctamente.')
    await cmsStore.fetchOverview()
    await loadPosts(pagination.value.page || 1)
  } catch (error) { notify.error(error) }
}

const toggleVisibility = async (post) => {
  if (!canPublish.value && !canEdit.value) { alertPermissionDenied('posts.publish'); return }
  try {
    await cmsStore.togglePostVisibility(post._id || post.id, !post.visible)
    notify.success(post.visible ? 'La publicación fue ocultada.' : 'La publicación fue publicada.')
    await cmsStore.fetchOverview()
    await loadPosts(pagination.value.page || 1)
  } catch (error) { notify.error(error) }
}

const handleImageUpload = async (event, type) => {
  const files = Array.from(event.target.files || [])
  if (!files.length) return
  try {
    const uploaded = await Promise.all(
      files.map((file) => cmsStore.uploadMedia(file, { category: 'press', alt: postForm.value.title || file.name, caption: postForm.value.excerpt || '' }))
    )
    const urls = uploaded.map((item) => item?.url || item?.data?.url).filter(Boolean)
    if (type === 'featured') {
      if (urls[0]) {
        postForm.value.featuredImage = urls[0]
        const firstMedia = uploaded.find((u) => u)
        postForm.value.featuredImageId = firstMedia?.id || firstMedia?._id || null
        if (!postForm.value.seo.ogImage) postForm.value.seo.ogImage = urls[0]
      }
    } else {
      postForm.value.images.push(...urls)
    }
    notify.success(`${urls.length} imagen(es) cargada(s) correctamente.`)
  } catch (error) { notify.error(error) }
  finally { event.target.value = '' }
}

const removeTag = (tag) => {
  postForm.value.tags = postForm.value.tags.filter((item) => item !== tag)
  tagsInput.value = postForm.value.tags.join(', ')
}

const removeImage = (index) => { postForm.value.images.splice(index, 1) }

const formatDate = (date) => {
  if (!date) return '—'
  return new Date(date).toLocaleDateString('es-PA', { year: 'numeric', month: 'short', day: 'numeric' })
}

const refreshAll = async () => {
  try {
    await Promise.all([cmsStore.fetchCategories(), cmsStore.fetchOverview()])
    await loadPosts(pagination.value.page || 1)
    notify.success('Datos actualizados correctamente.')
  } catch (error) { notify.error(error) }
}

const goToPage = async (page) => {
  if (page < 1 || page > pagination.value.pages || page === pagination.value.page) return
  await loadPosts(page)
}

const pagesToShow = computed(() => {
  const totalPages = pagination.value.pages || 1
  const current = pagination.value.page || 1
  const start = Math.max(1, current - 2)
  const end = Math.min(totalPages, start + 4)
  const pages = []
  for (let i = start; i <= end; i += 1) pages.push(i)
  return pages
})

const statsCards = computed(() => [
  { label: 'Total', value: overview.value.total, color: 'green' },
  { label: 'Publicadas', value: overview.value.published, color: 'teal' },
  { label: 'Ocultas', value: overview.value.hidden, color: 'gray' },
  { label: 'Categorías', value: overview.value.categories, color: 'dark' }
])

const initOverviewChart = () => {
  if (!overviewChartRef.value) return
  overviewChart = echarts.init(overviewChartRef.value)
  overviewChart.setOption({
    tooltip: { trigger: 'item', borderWidth: 0, backgroundColor: '#fff', textStyle: { color: '#1a1a1a', fontSize: 12 } },
    series: [{
      name: 'Publicaciones',
      type: 'pie',
      radius: ['55%', '78%'],
      center: ['50%', '48%'],
      avoidLabelOverlap: false,
      label: { show: false },
      data: [
        { value: overview.value.published, name: 'Publicadas', itemStyle: { color: '#1A4F3A' } },
        { value: overview.value.hidden, name: 'Ocultas', itemStyle: { color: '#d1d5db' } }
      ]
    }]
  })
}

const updateOverviewChart = () => {
  if (!overviewChart) return
  overviewChart.setOption({ series: [{ data: [
    { value: overview.value.published, name: 'Publicadas', itemStyle: { color: '#1A4F3A' } },
    { value: overview.value.hidden, name: 'Ocultas', itemStyle: { color: '#d1d5db' } }
  ]}]})
}

const resizeChart = () => { if (overviewChart) overviewChart.resize() }

watch([searchQuery, filterCategory, filterStatus, pageSize], () => {
  clearTimeout(filterTimer)
  filterTimer = setTimeout(() => loadPosts(1), 300)
})

watch(() => [overview.value.published, overview.value.hidden], () => { nextTick(updateOverviewChart) })
watch(tagsInput, (val) => { postForm.value.tags = parseCommaList(val) })
watch(seoKeywordsInput, (val) => { postForm.value.seo.metaKeywords = parseCommaList(val) })

onMounted(async () => {
  const { Modal } = await import('bootstrap')
  postModal = new Modal(postModalRef.value)
  window.addEventListener('resize', resizeChart)
  await Promise.all([cmsStore.fetchCategories(), cmsStore.fetchOverview()])
  await loadPosts(1)
  initOverviewChart()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeChart)
  clearTimeout(filterTimer)
  if (overviewChart) { overviewChart.dispose(); overviewChart = null }
})
</script>

<style scoped>
/* ─── Design tokens ─── */
.posts-manager {
  --green-900: #0d2e1e;
  --green-800: #1A4F3A;
  --green-700: #1f6347;
  --green-600: #2E8B57;
  --green-100: #e6f5ed;
  --green-50:  #f0faf4;
  --teal-300:  #8fd9b6;
  --blue-400:  #1E88C6;
  --blue-50:   #e8f4fd;
  --gray-900:  #111827;
  --gray-800:  #1f2937;
  --gray-600:  #4b5563;
  --gray-400:  #9ca3af;
  --gray-300:  #d1d5db;
  --gray-200:  #e5e7eb;
  --gray-100:  #f3f4f6;
  --gray-50:   #f9fafb;
  --red-600:   #dc2626;
  --red-50:    #fef2f2;
  --radius-xs: 6px;
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --font-sans: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  padding: 32px 28px;
  max-width: 1600px;
  margin: 0 auto;
  font-family: var(--font-sans);
  color: var(--gray-900);
}

/* ─── Toast ─── */
.bsw-toast {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  border-radius: var(--radius-md);
  background: #fff;
  border: 1px solid var(--gray-200);
  box-shadow: 0 4px 24px rgba(0,0,0,0.10);
  min-width: 280px;
  max-width: 400px;
  font-size: 13.5px;
}
.bsw-toast.success .bsw-toast__icon { color: var(--green-600); }
.bsw-toast.error .bsw-toast__icon { color: var(--red-600); }
.bsw-toast__text { flex: 1; color: var(--gray-800); line-height: 1.4; }
.bsw-toast__close { background: none; border: none; cursor: pointer; color: var(--gray-400); padding: 2px; border-radius: 4px; display: flex; align-items: center; justify-content: center; transition: color 0.15s; }
.bsw-toast__close:hover { color: var(--gray-800); }
.toast-slide-enter-active, .toast-slide-leave-active { transition: all 0.25s cubic-bezier(0.4,0,0.2,1); }
.toast-slide-enter-from, .toast-slide-leave-to { opacity: 0; transform: translateX(20px); }

/* ─── Page header ─── */
.page-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 28px;
  flex-wrap: wrap;
}
.page-header__breadcrumb {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 11.5px;
  color: var(--gray-400);
  font-weight: 500;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  margin-bottom: 6px;
}
.page-header__breadcrumb .active { color: var(--green-800); }
.page-header__breadcrumb svg { color: var(--gray-300); }
.page-header__title {
  font-size: 22px;
  font-weight: 650;
  letter-spacing: -0.4px;
  color: var(--gray-900);
  margin: 0 0 5px;
  line-height: 1.2;
}
.page-header__desc { font-size: 13.5px; color: var(--gray-400); margin: 0; }
.page-header__actions { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }

/* ─── Buttons ─── */
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 9px 16px;
  background: var(--green-800);
  color: #fff;
  border: none;
  border-radius: var(--radius-sm);
  font-size: 13.5px;
  font-weight: 550;
  cursor: pointer;
  transition: background 0.15s, transform 0.1s;
  font-family: var(--font-sans);
  white-space: nowrap;
}
.btn-primary:hover { background: var(--green-700); }
.btn-primary:active { transform: scale(0.98); }
.btn-primary--sm { padding: 7px 13px; font-size: 12.5px; }
.btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }

.btn-ghost {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  background: transparent;
  color: var(--gray-600);
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-sm);
  font-size: 13.5px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  font-family: var(--font-sans);
  white-space: nowrap;
}
.btn-ghost:hover { background: var(--gray-50); border-color: var(--gray-300); color: var(--gray-900); }
.btn-ghost--sm { padding: 6px 12px; font-size: 12.5px; }

/* ─── Stats ─── */
.stats-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-bottom: 24px;
}
@media (max-width: 768px) { .stats-row { grid-template-columns: repeat(2, 1fr); } }

.stat-chip {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  background: #fff;
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-md);
  transition: border-color 0.15s;
}
.stat-chip:hover { border-color: var(--gray-300); }
.stat-chip__icon {
  width: 34px;
  height: 34px;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.stat-chip__icon.green { background: var(--green-50); color: var(--green-800); }
.stat-chip__icon.teal { background: var(--blue-50); color: var(--blue-400); }
.stat-chip__icon.gray { background: var(--gray-100); color: var(--gray-600); }
.stat-chip__icon.dark { background: var(--gray-900); color: #fff; }
.stat-chip__info { display: flex; flex-direction: column; gap: 1px; }
.stat-chip__value { font-size: 20px; font-weight: 700; line-height: 1; color: var(--gray-900); letter-spacing: -0.5px; }
.stat-chip__label { font-size: 11.5px; color: var(--gray-400); font-weight: 500; }

/* ─── Main grid ─── */
.main-grid {
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: 20px;
  align-items: start;
}
@media (max-width: 1024px) { .main-grid { grid-template-columns: 1fr; } }
.main-grid__content { display: flex; flex-direction: column; gap: 12px; }

/* ─── Filters bar ─── */
.filters-bar {
  background: #fff;
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-md);
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.filters-bar__search {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--gray-50);
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-sm);
  padding: 0 12px;
  transition: border-color 0.15s;
}
.filters-bar__search:focus-within { border-color: var(--green-700); }
.filters-bar__search-icon { color: var(--gray-400); flex-shrink: 0; }
.filters-bar__input {
  flex: 1;
  border: none;
  background: transparent;
  padding: 9px 0;
  font-size: 13.5px;
  color: var(--gray-900);
  font-family: var(--font-sans);
  outline: none;
}
.filters-bar__input::placeholder { color: var(--gray-400); }
.filters-bar__clear-search { background: none; border: none; cursor: pointer; color: var(--gray-400); display: flex; align-items: center; padding: 2px; border-radius: 4px; }
.filters-bar__clear-search:hover { color: var(--gray-700); }
.filters-bar__controls {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.filter-select {
  padding: 7px 10px;
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-sm);
  font-size: 12.5px;
  color: var(--gray-700);
  background: var(--gray-50);
  font-family: var(--font-sans);
  cursor: pointer;
  outline: none;
  transition: border-color 0.15s;
}
.filter-select:focus { border-color: var(--green-700); }
.filter-select--sm { width: auto; }

.status-pills { display: flex; gap: 4px; }
.status-pill {
  padding: 6px 12px;
  border-radius: 99px;
  border: 1px solid var(--gray-200);
  background: transparent;
  font-size: 12px;
  font-weight: 500;
  color: var(--gray-500);
  cursor: pointer;
  transition: all 0.15s;
  font-family: var(--font-sans);
}
.status-pill:hover { background: var(--gray-50); color: var(--gray-800); }
.status-pill.active { background: var(--green-800); border-color: var(--green-800); color: #fff; }

/* ─── Results meta ─── */
.results-meta {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--gray-400);
  padding: 0 2px;
}
.results-meta__count { font-weight: 600; color: var(--gray-600); }
.results-meta__sep { color: var(--gray-300); }

/* ─── Posts list ─── */
.posts-list {
  background: #fff;
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-md);
  overflow: hidden;
}

/* Skeleton loading */
.posts-list__loading { padding: 8px; display: flex; flex-direction: column; gap: 1px; }
.skeleton-row {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px;
  border-radius: var(--radius-sm);
}
.skeleton-row__body { flex: 1; display: flex; flex-direction: column; gap: 8px; }
.skeleton { background: linear-gradient(90deg, var(--gray-100) 25%, var(--gray-50) 50%, var(--gray-100) 75%); background-size: 200% 100%; animation: shimmer 1.4s infinite; border-radius: 4px; }
.skeleton--thumb { width: 72px; height: 72px; border-radius: var(--radius-sm); flex-shrink: 0; }
.skeleton--line { height: 10px; border-radius: 5px; }
.skeleton--line-lg { width: 65%; }
.skeleton--line-md { width: 45%; }
.skeleton--line-sm { width: 28%; }
@keyframes shimmer { to { background-position: -200% 0; } }

/* Empty state */
.posts-list__empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 56px 24px;
  text-align: center;
}
.empty-icon {
  width: 52px;
  height: 52px;
  border-radius: var(--radius-md);
  background: var(--gray-100);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--gray-400);
  margin-bottom: 14px;
}
.empty-title { font-size: 15px; font-weight: 600; color: var(--gray-800); margin: 0 0 6px; }
.empty-desc { font-size: 13px; color: var(--gray-400); margin: 0 0 20px; max-width: 280px; line-height: 1.5; }

/* Post row */
.post-row {
  display: flex;
  gap: 14px;
  padding: 16px;
  border-bottom: 1px solid var(--gray-100);
  transition: background 0.12s;
}
.post-row:last-child { border-bottom: none; }
.post-row:hover { background: var(--gray-50); }

.post-row__thumb {
  width: 72px;
  height: 72px;
  border-radius: var(--radius-sm);
  overflow: hidden;
  flex-shrink: 0;
  background: var(--gray-100);
}
.post-row__img { width: 100%; height: 100%; object-fit: cover; }

.post-row__body { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 6px; }

.post-row__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  flex-wrap: wrap;
}
.post-row__meta-left { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
.post-row__date { display: flex; align-items: center; gap: 4px; font-size: 11.5px; color: var(--gray-400); white-space: nowrap; flex-shrink: 0; }

.post-row__title {
  font-size: 14px;
  font-weight: 620;
  color: var(--gray-900);
  margin: 0;
  line-height: 1.35;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.post-row__excerpt {
  font-size: 12.5px;
  color: var(--gray-500);
  margin: 0;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.post-row__actions { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; margin-top: 2px; }

/* Status badge */
.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 3px 9px;
  border-radius: 99px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.02em;
}
.status-badge__dot { width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0; }
.status-badge--published { background: var(--green-50); color: var(--green-800); }
.status-badge--published .status-badge__dot { background: var(--green-600); }
.status-badge--hidden { background: var(--gray-100); color: var(--gray-600); }
.status-badge--hidden .status-badge__dot { background: var(--gray-400); }

/* Cat badge */
.cat-badge {
  display: inline-flex;
  align-items: center;
  padding: 3px 9px;
  border-radius: 99px;
  font-size: 11px;
  font-weight: 600;
  background: color-mix(in srgb, var(--cat-color, #1A4F3A) 12%, transparent);
  color: var(--cat-color, #1A4F3A);
}
.cat-badge--empty { background: var(--gray-100); color: var(--gray-400); }

/* Action buttons */
.action-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 5px 10px;
  border-radius: var(--radius-xs);
  font-size: 12px;
  font-weight: 550;
  cursor: pointer;
  border: 1px solid transparent;
  background: transparent;
  transition: all 0.13s;
  font-family: var(--font-sans);
}
.action-btn--edit { color: var(--blue-400); }
.action-btn--edit:hover { background: var(--blue-50); border-color: rgba(30,136,198,0.2); }
.action-btn--builder { color: var(--green-700); }
.action-btn--builder:hover { background: var(--green-50); border-color: rgba(26,79,58,0.2); }
.action-btn--toggle { color: var(--gray-600); }
.action-btn--toggle:hover { background: var(--gray-100); border-color: var(--gray-300); }
.action-btn--delete { color: var(--red-600); }
.action-btn--delete:hover { background: var(--red-50); border-color: rgba(220,38,38,0.2); }

/* ─── Pagination ─── */
.pagination-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  background: #fff;
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-md);
  flex-wrap: wrap;
  gap: 10px;
}
.pagination-bar__info { font-size: 12.5px; color: var(--gray-400); }
.pagination-bar__controls { display: flex; align-items: center; gap: 4px; }
.page-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  height: 32px;
  padding: 0 8px;
  border-radius: var(--radius-xs);
  border: 1px solid var(--gray-200);
  background: transparent;
  color: var(--gray-600);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.13s;
  font-family: var(--font-sans);
}
.page-btn:hover:not(:disabled) { background: var(--gray-50); border-color: var(--gray-300); }
.page-btn:disabled { opacity: 0.35; cursor: not-allowed; }
.page-btn--active { background: var(--green-800); border-color: var(--green-800); color: #fff; }

/* ─── Sidebar cards ─── */
.sidebar-card {
  background: #fff;
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-md);
  padding: 18px;
  margin-bottom: 12px;
}
.sidebar-card:last-child { margin-bottom: 0; }
.sidebar-card__header { display: flex; align-items: flex-start; justify-content: space-between; gap: 10px; margin-bottom: 16px; }
.sidebar-card__title { font-size: 13px; font-weight: 650; color: var(--gray-900); margin: 0; }
.sidebar-card__title--standalone { margin-bottom: 14px; }
.sidebar-card__sub { font-size: 11.5px; color: var(--gray-400); margin: 3px 0 0; }
.count-pill {
  padding: 3px 10px;
  border-radius: 99px;
  background: var(--gray-100);
  font-size: 11px;
  font-weight: 600;
  color: var(--gray-600);
  white-space: nowrap;
  flex-shrink: 0;
}

/* Chart legend */
.chart-legend { display: flex; flex-direction: column; gap: 8px; margin-top: 12px; }
.chart-legend__item { display: flex; align-items: center; gap: 8px; }
.chart-legend__dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.chart-legend__dot--green { background: var(--green-800); }
.chart-legend__dot--gray { background: var(--gray-300); }
.chart-legend__label { font-size: 12.5px; color: var(--gray-500); flex: 1; }
.chart-legend__value { font-size: 13px; font-weight: 650; color: var(--gray-900); }

/* Quick actions */
.quick-actions { display: flex; flex-direction: column; gap: 4px; }
.quick-action {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: var(--radius-sm);
  border: none;
  background: transparent;
  font-size: 13px;
  font-weight: 500;
  color: var(--gray-700);
  cursor: pointer;
  transition: background 0.13s;
  text-align: left;
  font-family: var(--font-sans);
}
.quick-action:hover { background: var(--gray-50); }
.quick-action__icon {
  width: 28px;
  height: 28px;
  border-radius: var(--radius-xs);
  background: var(--green-50);
  color: var(--green-800);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.quick-action__arrow { margin-left: auto; color: var(--gray-300); }

/* ─── Modal ─── */
.bsw-modal {
  border: none;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0,0,0,0.15);
}
.bsw-modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid var(--gray-100);
}
.bsw-modal__header-left { display: flex; align-items: center; gap: 12px; }
.bsw-modal__header-icon {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-sm);
  background: var(--green-50);
  color: var(--green-800);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.bsw-modal__title { font-size: 15px; font-weight: 650; color: var(--gray-900); margin: 0; }
.bsw-modal__sub { font-size: 12px; color: var(--gray-400); margin: 2px 0 0; }
.bsw-modal__close {
  width: 30px;
  height: 30px;
  border-radius: var(--radius-xs);
  border: none;
  background: transparent;
  color: var(--gray-400);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.13s;
}
.bsw-modal__close:hover { background: var(--gray-100); color: var(--gray-800); }
.bsw-modal__body { padding: 24px; background: var(--gray-50); }
.bsw-modal__footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  padding: 16px 24px;
  border-top: 1px solid var(--gray-100);
  background: #fff;
}

/* ─── Modal grid ─── */
.modal-grid {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 16px;
  align-items: start;
}
@media (max-width: 900px) { .modal-grid { grid-template-columns: 1fr; } }

/* ─── Form sections ─── */
.form-section {
  background: #fff;
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-md);
  padding: 18px;
  margin-bottom: 12px;
}
.form-section:last-child { margin-bottom: 0; }
.form-section__header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}
.form-section__label {
  font-size: 12px;
  font-weight: 700;
  color: var(--gray-800);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.form-section__badge {
  padding: 2px 8px;
  border-radius: 99px;
  background: var(--gray-100);
  font-size: 10.5px;
  font-weight: 600;
  color: var(--gray-500);
}

/* Form elements */
.form-group { margin-bottom: 14px; }
.form-group:last-child { margin-bottom: 0; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
@media (max-width: 640px) { .form-row { grid-template-columns: 1fr; } }

.field-label {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  font-weight: 600;
  color: var(--gray-700);
  margin-bottom: 6px;
}
.field-required { color: #e53e3e; font-size: 13px; }

.field-input {
  display: block;
  width: 100%;
  padding: 8px 12px;
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-sm);
  font-size: 13.5px;
  color: var(--gray-900);
  background: #fff;
  font-family: var(--font-sans);
  transition: border-color 0.15s, box-shadow 0.15s;
  outline: none;
  box-sizing: border-box;
}
.field-input:focus {
  border-color: var(--green-700);
  box-shadow: 0 0 0 3px rgba(26,79,58,0.08);
}
.field-input::placeholder { color: var(--gray-400); }
.field-textarea { resize: vertical; min-height: 80px; }

.field-hint {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 5px;
  font-size: 11.5px;
  color: var(--gray-400);
}
.field-hint--warn { color: #e67e22; font-weight: 600; }

/* Quill wrapper */
.quill-wrapper {
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-sm);
  overflow: hidden;
}
.quill-wrapper :deep(.ql-toolbar) {
  border: none;
  border-bottom: 1px solid var(--gray-200);
  padding: 8px 10px;
  background: var(--gray-50);
}
.quill-wrapper :deep(.ql-container) { border: none; font-family: var(--font-sans); font-size: 13.5px; }

/* Image preview */
.img-preview-box {
  width: 100%;
  aspect-ratio: 16/9;
  border-radius: var(--radius-sm);
  overflow: hidden;
  background: var(--gray-50);
  border: 1px solid var(--gray-200);
  display: flex;
  align-items: center;
  justify-content: center;
}
.img-preview-box__img { width: 100%; height: 100%; object-fit: cover; display: block; }
.img-preview-box__placeholder { display: flex; flex-direction: column; align-items: center; gap: 6px; color: var(--gray-300); font-size: 12px; }

/* File upload label */
.file-upload-label {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 12px;
  border-radius: var(--radius-xs);
  border: 1px dashed var(--gray-300);
  background: var(--gray-50);
  font-size: 12.5px;
  font-weight: 500;
  color: var(--gray-600);
  cursor: pointer;
  transition: all 0.13s;
  width: 100%;
  justify-content: center;
  box-sizing: border-box;
}
.file-upload-label:hover { border-color: var(--green-700); color: var(--green-800); background: var(--green-50); }
.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; }

/* Toggle */
.toggle-row { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
.toggle-row__label { font-size: 13px; font-weight: 500; color: var(--gray-700); }
.bsw-toggle { position: relative; flex-shrink: 0; }
.bsw-toggle__input { position: absolute; opacity: 0; width: 0; height: 0; }
.bsw-toggle__track {
  display: block;
  width: 38px;
  height: 22px;
  border-radius: 99px;
  background: var(--gray-300);
  cursor: pointer;
  transition: background 0.2s;
  position: relative;
}
.bsw-toggle__input:checked + .bsw-toggle__track { background: var(--green-800); }
.bsw-toggle__thumb {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #fff;
  transition: transform 0.2s cubic-bezier(0.4,0,0.2,1);
}
.bsw-toggle__input:checked + .bsw-toggle__track .bsw-toggle__thumb { transform: translateX(16px); }

/* Categories */
.categories-list { display: flex; flex-direction: column; gap: 6px; }
.cat-check {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 11px;
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all 0.13s;
}
.cat-check:hover { background: var(--gray-50); border-color: var(--gray-300); }
.cat-check__left { display: flex; align-items: center; gap: 8px; flex: 1; }
.cat-check__dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.cat-check__name { font-size: 13px; font-weight: 500; color: var(--gray-700); }
.cat-check__input { display: none; }
.cat-check__box {
  width: 16px;
  height: 16px;
  border: 1.5px solid var(--gray-300);
  border-radius: 4px;
  flex-shrink: 0;
  transition: all 0.13s;
  position: relative;
}
.cat-check__input:checked ~ .cat-check__box {
  background: var(--green-800);
  border-color: var(--green-800);
}
.cat-check__input:checked ~ .cat-check__box::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 4.5px;
  width: 4px;
  height: 7px;
  border: 1.5px solid #fff;
  border-top: none;
  border-left: none;
  transform: rotate(45deg);
}

/* Tags */
.tags-container { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 10px; }
.tag-pill {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 10px;
  border-radius: 99px;
  background: var(--green-50);
  border: 1px solid rgba(26,79,58,0.15);
  font-size: 12px;
  font-weight: 500;
  color: var(--green-800);
}
.tag-pill__remove {
  display: flex;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--green-700);
  padding: 0;
  opacity: 0.6;
  transition: opacity 0.13s;
}
.tag-pill__remove:hover { opacity: 1; }

/* Gallery grid */
.gallery-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
.gallery-thumb { position: relative; aspect-ratio: 1; border-radius: var(--radius-sm); overflow: hidden; background: var(--gray-100); }
.gallery-thumb__img { width: 100%; height: 100%; object-fit: cover; display: block; }
.gallery-thumb__remove {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: rgba(0,0,0,0.65);
  border: none;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.13s;
}
.gallery-thumb__remove:hover { background: var(--red-600); }

/* Spinner */
.btn-loading { display: inline-flex; align-items: center; gap: 6px; }
.spin { animation: spin 0.8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

/* Modal dialog scroll fix */
:deep(.modal-dialog) { max-height: 95vh; }
</style>
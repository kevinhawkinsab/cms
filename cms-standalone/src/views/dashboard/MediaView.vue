<template>
  <div
    class="container-fluid py-4 media-page"
    @dragover.prevent="mainDragging = true"
    @dragleave.self="mainDragging = false"
    @drop.prevent="handleMainDrop"
    :class="{ 'main-dragging': mainDragging }"
  >

    <!-- ── Page header ── -->
    <div class="page-header">
      <div class="page-header__left">
        <div class="page-header__breadcrumb">
          <span>CMS</span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M4.5 2.5L7.5 6l-3 3.5" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <span class="active">Multimedia</span>
        </div>
        <h1 class="page-header__title">Administrador de archivos</h1>
        <p class="page-header__desc">Gestiona imágenes y documentos desde una vista limpia, rápida y ordenada.</p>
      </div>
      <div class="page-header__actions">
        <button class="btn-ghost" @click="refreshMedia" :disabled="loadingMedia">
          <svg v-if="!loadingMedia" width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M12.5 7A5.5 5.5 0 1 1 7 1.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M12.5 1.5v5.5H7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <svg v-else class="spin" width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5" stroke="currentColor" stroke-width="1.5" stroke-dasharray="20 12"/></svg>
          Actualizar
        </button>
        <button class="btn-primary" @click="openUploadModal" data-testid="upload-media-btn">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1.5v8M4 4.5L7 1.5l3 3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M1.5 10.5v1a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
          Subir archivo
        </button>
      </div>
    </div>

    <!-- ── Stats ── -->
    <div class="stats-row">
      <div class="stat-chip">
        <div class="stat-chip__icon stat-chip__icon--green">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1.5" y="1.5" width="11" height="11" rx="2" stroke="currentColor" stroke-width="1.4"/><path d="M4 5h6M4 7.5h4" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/></svg>
        </div>
        <div class="stat-chip__info">
          <span class="stat-chip__value">{{ mediaStats.total }}</span>
          <span class="stat-chip__label">Archivos</span>
        </div>
      </div>
      <div class="stat-chip">
        <div class="stat-chip__icon stat-chip__icon--blue">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1.5" y="1.5" width="11" height="11" rx="2" stroke="currentColor" stroke-width="1.4"/><circle cx="5" cy="5.5" r="1.2" stroke="currentColor" stroke-width="1.2"/><path d="M1.5 10l3-3 2.5 2.5 1.5-1.5 3.5 3.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
        <div class="stat-chip__info">
          <span class="stat-chip__value">{{ mediaStats.images }}</span>
          <span class="stat-chip__label">Imágenes</span>
        </div>
      </div>
      <div class="stat-chip">
        <div class="stat-chip__icon stat-chip__icon--gray">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 2h5.5L11 4.5V12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2z" stroke="currentColor" stroke-width="1.4"/><path d="M8.5 2v3H11" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/><path d="M5 7.5h4M5 9.5h2.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>
        </div>
        <div class="stat-chip__info">
          <span class="stat-chip__value">{{ mediaStats.documents }}</span>
          <span class="stat-chip__label">Documentos</span>
        </div>
      </div>
      <div class="stat-chip">
        <div class="stat-chip__icon stat-chip__icon--dark">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1.5v8M4.5 7l2.5 2.5L9.5 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M1.5 10.5v1a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-1" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
        </div>
        <div class="stat-chip__info">
          <span class="stat-chip__value">{{ mediaStats.downloadable }}</span>
          <span class="stat-chip__label">Descargables</span>
        </div>
      </div>
    </div>

    <!-- ── Filters bar ── -->
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
          placeholder="Buscar por nombre, alt, caption o categoría..."
        >
        <button v-if="searchQuery" class="filters-bar__clear-btn" @click="searchQuery = ''" aria-label="Limpiar búsqueda">
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M1 1l9 9M10 1L1 10" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
        </button>
      </div>

      <div class="filters-bar__right">
        <!-- Type filter pills -->
        <div class="type-pills">
          <button
            v-for="opt in typeOptions"
            :key="opt.value"
            class="type-pill"
            :class="{ active: filterType === opt.value }"
            @click="filterType = opt.value"
          >{{ opt.label }}</button>
        </div>

        <!-- Folder filter -->
        <select class="filter-select" v-model="filterFolder" title="Filtrar por carpeta">
          <option value="">Todas las carpetas</option>
          <option v-for="f in folders" :key="f" :value="f">{{ f }}</option>
        </select>

        <!-- Sort -->
        <select class="filter-select" v-model="sortBy" title="Ordenar por">
          <option value="newest">Más reciente</option>
          <option value="oldest">Más antiguo</option>
          <option value="name">Nombre A-Z</option>
          <option value="sizeAsc">Tamaño ↑</option>
          <option value="sizeDesc">Tamaño ↓</option>
        </select>

        <!-- View mode toggle -->
        <div class="view-toggle">
          <button class="view-btn" :class="{ active: viewMode === 'grid' }" @click="viewMode = 'grid'" title="Vista en cuadrícula">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="1" y="1" width="5" height="5" rx="1" stroke="currentColor" stroke-width="1.4"/>
              <rect x="8" y="1" width="5" height="5" rx="1" stroke="currentColor" stroke-width="1.4"/>
              <rect x="1" y="8" width="5" height="5" rx="1" stroke="currentColor" stroke-width="1.4"/>
              <rect x="8" y="8" width="5" height="5" rx="1" stroke="currentColor" stroke-width="1.4"/>
            </svg>
          </button>
          <button class="view-btn" :class="{ active: viewMode === 'list' }" @click="viewMode = 'list'" title="Vista en lista">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 3h12M1 7h12M1 11h12" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
            </svg>
          </button>
        </div>

        <button class="btn-ghost btn-ghost--sm" @click="clearFilters">Limpiar</button>
        <button class="btn-primary btn-primary--sm" @click="openUploadModal">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1v7M3.5 3.5L6 1l2.5 2.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M1 9v.5A1.5 1.5 0 0 0 2.5 11h7A1.5 1.5 0 0 0 11 9.5V9" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
          Subir
        </button>
      </div>
    </div>

    <!-- ── Bulk actions bar ── -->
    <Transition name="bulk-bar">
      <div v-if="selectedIds.size > 0" class="bulk-bar">
        <span class="bulk-bar__count">{{ selectedIds.size }} seleccionado{{ selectedIds.size !== 1 ? 's' : '' }}</span>
        <div class="bulk-bar__actions">
          <select class="filter-select filter-select--sm" v-model="bulkMoveTarget" @change="bulkMoveToFolder">
            <option value="">Mover a carpeta...</option>
            <option v-for="f in folders" :key="f" :value="f">{{ f }}</option>
          </select>
          <button class="btn-danger-sm" @click="bulkDelete">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1.5 3h9M4 3V2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1M5 5.5v4M7 5.5v4M2.5 3l.5 7a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1l.5-7" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Eliminar seleccionados
          </button>
          <button class="btn-ghost btn-ghost--sm" @click="selectedIds.clear(); selectedIds = new Set()">Cancelar</button>
        </div>
      </div>
    </Transition>

    <!-- ── Main layout: sidebar + content ── -->
    <div class="media-layout">

      <!-- ── Folder sidebar ── -->
      <aside class="folder-sidebar">
        <div class="folder-sidebar__header">Carpetas</div>
        <ul class="folder-list">
          <li
            class="folder-item"
            :class="{ active: activeFolder === null }"
            @click="activeFolder = null"
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M1.5 3.5A1 1 0 0 1 2.5 2.5h2.27l1 1.5H10.5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-8a1 1 0 0 1-1-1V3.5z" stroke="currentColor" stroke-width="1.3"/></svg>
            <span class="folder-item__name">Todos los archivos</span>
            <span class="folder-item__count">{{ media.length }}</span>
          </li>
          <li
            v-for="folder in folders"
            :key="folder"
            class="folder-item"
            :class="{ active: activeFolder === folder }"
            @click="activeFolder = folder"
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M1.5 3.5A1 1 0 0 1 2.5 2.5h2.27l1 1.5H10.5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-8a1 1 0 0 1-1-1V3.5z" stroke="currentColor" stroke-width="1.3"/></svg>
            <span class="folder-item__name">{{ folder }}</span>
            <span class="folder-item__count">{{ folderCount(folder) }}</span>
          </li>
        </ul>

        <!-- Nueva carpeta -->
        <div class="new-folder-area">
          <div v-if="creatingFolder" class="new-folder-input-wrap">
            <input
              ref="newFolderInputRef"
              v-model.trim="newFolderName"
              type="text"
              class="new-folder-input"
              placeholder="Nombre de carpeta"
              @keydown.enter="createFolder"
              @keydown.esc="creatingFolder = false; newFolderName = ''"
              maxlength="40"
            >
            <div class="new-folder-btns">
              <button class="nf-btn nf-btn--confirm" @click="createFolder" title="Crear">
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M1.5 5.5l3 3 5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </button>
              <button class="nf-btn nf-btn--cancel" @click="creatingFolder = false; newFolderName = ''" title="Cancelar">
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M1 1l9 9M10 1L1 10" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
              </button>
            </div>
          </div>
          <button v-else class="new-folder-btn" @click="startCreatingFolder">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1v10M1 6h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
            Nueva carpeta
          </button>
        </div>
      </aside>

      <!-- ── Content area ── -->
      <div class="media-content">

        <!-- Library header -->
        <div class="library-header">
          <div class="library-header__left">
            <span class="library-header__title">
              {{ activeFolder ? activeFolder : 'Biblioteca multimedia' }}
            </span>
            <span class="library-header__count">{{ filteredMedia.length }} archivo{{ filteredMedia.length !== 1 ? 's' : '' }}</span>
          </div>
          <div class="library-header__badges">
            <span class="lib-badge">Vista compacta</span>
            <span class="lib-badge">Gestión rápida</span>
          </div>
        </div>

        <!-- Cards / List -->
        <div class="card border-0 shadow-sm">
          <div class="card-body p-3 p-lg-4">
            <div v-if="loadingMedia" class="py-5 text-center">
              <div class="spinner-border text-success" role="status" aria-label="Cargando archivos"></div>
              <div class="text-muted mt-3">Cargando archivos multimedia...</div>
            </div>

            <div v-else-if="filteredMedia.length === 0" class="py-5 text-center">
              <div class="mx-auto d-flex align-items-center justify-content-center rounded-circle bg-light mb-3" style="width: 64px; height: 64px;">
                <i class="fas fa-images text-muted fs-4"></i>
              </div>
              <h3 class="h6 fw-bold mb-2">No hay archivos multimedia</h3>
              <p class="text-muted mb-4">Sube imágenes, PDFs o documentos para comenzar a organizarlos.</p>
              <button class="btn btn-bsw rounded-pill px-4" @click="openUploadModal">
                <i class="fas fa-upload me-2"></i>Subir primer archivo
              </button>
            </div>

            <!-- ── GRID VIEW ── -->
            <div v-else-if="viewMode === 'grid'" class="row g-3">
              <div v-for="file in filteredMedia" :key="file._id" class="col-6 col-md-4 col-xl-3">
                <div
                  class="card border-0 shadow-sm h-100 media-card"
                  :class="{ selected: selectedIds.has(file._id) }"
                >
                  <!-- Checkbox -->
                  <label class="media-checkbox" @click.stop>
                    <input
                      type="checkbox"
                      :checked="selectedIds.has(file._id)"
                      @change="toggleSelect(file._id)"
                    >
                  </label>

                  <div class="position-relative media-preview overflow-hidden rounded-top-4">
                    <img
                      v-if="isImage(file.mimeType)"
                      :src="file.thumbnailUrl || file.blobUrl"
                      :alt="file.alt || file.originalName || 'Archivo multimedia'"
                      class="w-100 h-100"
                      style="object-fit: cover;"
                    >
                    <div v-else class="d-grid place-items-center h-100 bg-light">
                      <div class="text-center p-4">
                        <div class="mx-auto d-flex align-items-center justify-content-center rounded-4 bg-white shadow-sm mb-3" style="width: 72px; height: 72px;">
                          <i :class="getFileIcon(file.mimeType)" class="fs-2"></i>
                        </div>
                        <div class="fw-semibold">{{ getFileLabel(file.mimeType) }}</div>
                      </div>
                    </div>

                    <div class="position-absolute top-0 start-0 p-2 d-flex flex-wrap gap-2">
                      <span class="badge rounded-pill text-bg-light border text-dark">{{ getCategoryLabel(file.category) }}</span>
                      <span v-if="file.downloadable" class="badge rounded-pill text-bg-success">Descargable</span>
                    </div>

                    <div class="position-absolute top-0 end-0 p-2 d-flex gap-2">
                      <button class="btn btn-light btn-sm rounded-circle" style="width:36px;height:36px;" @click="openEditModal(file)" title="Editar"><i class="fas fa-pen"></i></button>
                      <button class="btn btn-light btn-sm rounded-circle" style="width:36px;height:36px;" @click="copyUrl(file.url)" title="Copiar URL"><i class="fas fa-link"></i></button>
                      <button class="btn btn-danger btn-sm rounded-circle" style="width:36px;height:36px;" @click="openDeleteModal(file)" title="Eliminar"><i class="fas fa-trash"></i></button>
                    </div>
                  </div>

                  <div class="card-body p-3">
                    <div class="d-flex align-items-start justify-content-between gap-2 mb-2">
                      <h3 class="h6 mb-0 fw-semibold text-truncate" :title="file.originalName">{{ file.originalName }}</h3>
                    </div>
                    <p class="mb-2 text-muted small text-truncate" :title="file.alt || file.caption || ''">{{ file.alt || file.caption || 'Sin descripción' }}</p>
                    <div class="d-flex justify-content-between align-items-center small text-muted">
                      <span>{{ formatFileSize(file.size) }}</span>
                      <span>{{ formatFileDate(file.createdAt) }}</span>
                    </div>
                    <!-- Move to folder (grid) -->
                    <div class="mt-2">
                      <select
                        class="filter-select filter-select--xs w-100"
                        :value="file.folder || 'General'"
                        @change="moveFileToFolder(file, $event.target.value)"
                        title="Mover a carpeta"
                      >
                        <option v-for="f in folders" :key="f" :value="f">{{ f }}</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- ── LIST VIEW ── -->
            <div v-else class="list-view">
              <table class="media-table">
                <thead>
                  <tr>
                    <th class="col-check">
                      <label class="media-checkbox media-checkbox--inline">
                        <input
                          type="checkbox"
                          :checked="allSelected"
                          :indeterminate.prop="someSelected"
                          @change="toggleSelectAll"
                        >
                      </label>
                    </th>
                    <th class="col-thumb">Vista</th>
                    <th class="col-name">Nombre</th>
                    <th class="col-type">Tipo</th>
                    <th class="col-size">Tamaño</th>
                    <th class="col-folder">Carpeta</th>
                    <th class="col-date">Subido</th>
                    <th class="col-actions">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="file in filteredMedia"
                    :key="file._id"
                    class="media-row"
                    :class="{ selected: selectedIds.has(file._id) }"
                  >
                    <td class="col-check">
                      <label class="media-checkbox media-checkbox--inline">
                        <input type="checkbox" :checked="selectedIds.has(file._id)" @change="toggleSelect(file._id)">
                      </label>
                    </td>
                    <td class="col-thumb">
                      <div class="list-thumb">
                        <img v-if="isImage(file.mimeType)" :src="file.thumbnailUrl || file.blobUrl" :alt="file.alt || ''" class="list-thumb__img">
                        <div v-else class="list-thumb__icon"><i :class="getFileIcon(file.mimeType)"></i></div>
                      </div>
                    </td>
                    <td class="col-name">
                      <span class="list-name" :title="file.originalName">{{ file.originalName }}</span>
                      <span class="list-desc">{{ file.alt || file.caption || '' }}</span>
                    </td>
                    <td class="col-type"><span class="type-badge">{{ getFileLabel(file.mimeType) }}</span></td>
                    <td class="col-size">{{ formatFileSize(file.size) }}</td>
                    <td class="col-folder">
                      <select
                        class="filter-select filter-select--xs"
                        :value="file.folder || 'General'"
                        @change="moveFileToFolder(file, $event.target.value)"
                      >
                        <option v-for="f in folders" :key="f" :value="f">{{ f }}</option>
                      </select>
                    </td>
                    <td class="col-date">{{ formatFileDate(file.createdAt) }}</td>
                    <td class="col-actions">
                      <div class="row-actions">
                        <button class="row-action-btn" @click="openEditModal(file)" title="Editar"><i class="fas fa-pen"></i></button>
                        <button class="row-action-btn" @click="copyUrl(file.url)" title="Copiar URL"><i class="fas fa-link"></i></button>
                        <button class="row-action-btn row-action-btn--danger" @click="openDeleteModal(file)" title="Eliminar"><i class="fas fa-trash"></i></button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- ── Main drop overlay ── -->
    <Transition name="fade">
      <div v-if="mainDragging" class="drop-overlay" @dragleave.self="mainDragging = false" @drop.prevent="handleMainDrop">
        <div class="drop-overlay__inner">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><path d="M24 8v24M14 18l10-10 10 10" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M6 38v2a2 2 0 0 0 2 2h32a2 2 0 0 0 2-2v-2" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>
          <p>Suelta los archivos para subirlos</p>
        </div>
      </div>
    </Transition>

    <!-- ── Upload modal ── -->
    <div class="modal fade" id="uploadModal" tabindex="-1" ref="uploadModalRef">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content border-0 shadow-lg rounded-4">
          <div class="modal-header border-0 px-4 pt-4 pb-0">
            <div>
              <h2 class="modal-title h5 fw-bold mb-1">Subir archivos</h2>
              <small class="text-muted">Arrastra archivos o selecciónalos desde tu equipo.</small>
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>

          <div class="modal-body px-4 pb-4">
            <div class="upload-zone" :class="{ dragging: isDragging }" @dragover.prevent="isDragging = true" @dragleave="isDragging = false" @drop.prevent="handleDrop">
              <div class="mx-auto d-flex align-items-center justify-content-center rounded-4 bg-white shadow-sm mb-3" style="width:84px;height:84px;">
                <i class="fas fa-cloud-arrow-up fs-2 text-primary"></i>
              </div>
              <h3 class="h6 fw-semibold mb-2">Arrastra archivos aquí</h3>
              <p class="text-muted mb-3">o selecciona uno o varios archivos desde tu dispositivo</p>
              <label class="btn btn-outline-primary rounded-pill px-4">
                Seleccionar archivos
                <input type="file" class="d-none" multiple accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx" @change="handleFileSelect">
              </label>
            </div>

            <div v-if="uploadQueue.length > 0" class="mt-4">
              <div class="d-flex align-items-center justify-content-between mb-3">
                <h3 class="h6 fw-bold mb-0">Archivos en cola</h3>
                <span class="badge rounded-pill text-bg-primary">{{ uploadQueue.length }}</span>
              </div>

              <div class="vstack gap-2" style="max-height:220px;overflow-y:auto;">
                <div
                  v-for="(item, index) in uploadQueue"
                  :key="`${item.file.name}-${index}`"
                  class="border rounded-4 p-3"
                >
                  <div class="d-flex justify-content-between align-items-center gap-3">
                    <div class="d-flex align-items-center gap-3 min-w-0">
                      <div class="queue-icon flex-shrink-0"><i :class="getFileIcon(item.file.type)"></i></div>
                      <div class="min-w-0">
                        <div class="fw-semibold text-truncate">{{ item.file.name }}</div>
                        <small class="text-muted">{{ formatFileSize(item.file.size) }}</small>
                      </div>
                    </div>
                    <div class="d-flex align-items-center gap-2 flex-shrink-0">
                      <span v-if="item.progress !== undefined" class="small text-muted">{{ item.progress }}%</span>
                      <button
                        v-if="item.progress === undefined || item.progress < 100"
                        type="button"
                        class="btn btn-link text-danger p-0 text-decoration-none"
                        @click="uploadQueue.splice(index, 1)"
                      ><i class="fas fa-xmark"></i></button>
                      <i v-else class="fas fa-check-circle text-success"></i>
                    </div>
                  </div>
                  <!-- Progress bar -->
                  <div v-if="item.progress !== undefined" class="progress mt-2" style="height:4px;">
                    <div
                      class="progress-bar"
                      :class="item.progress === 100 ? 'bg-success' : 'bg-primary'"
                      :style="{ width: item.progress + '%' }"
                      role="progressbar"
                    ></div>
                  </div>
                </div>
              </div>

              <div class="row g-3 mt-3">
                <div class="col-12 col-md-6">
                  <label class="form-label small text-muted mb-1">Categoría</label>
                  <select class="form-select" v-model="uploadMetadata.category">
                    <option value="general">General</option>
                    <option value="press">Kit de prensa</option>
                    <option value="logo">Logotipo</option>
                    <option value="product">Producto</option>
                  </select>
                </div>
                <div class="col-12 col-md-6">
                  <label class="form-label small text-muted mb-1">Carpeta</label>
                  <select class="form-select" v-model="uploadMetadata.folder">
                    <option v-for="f in folders" :key="f" :value="f">{{ f }}</option>
                  </select>
                </div>
                <div class="col-12 col-md-6 d-flex align-items-end">
                  <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" id="downloadable" v-model="uploadMetadata.downloadable">
                    <label class="form-check-label" for="downloadable">Marcar como descargable</label>
                  </div>
                </div>
                <div class="col-12 col-md-6">
                  <label class="form-label small text-muted mb-1">Alt por defecto</label>
                  <input type="text" class="form-control" v-model.trim="uploadMetadata.alt" placeholder="Texto alternativo">
                </div>
                <div class="col-12">
                  <label class="form-label small text-muted mb-1">Caption por defecto</label>
                  <input type="text" class="form-control" v-model.trim="uploadMetadata.caption" placeholder="Descripción breve">
                </div>
              </div>
            </div>
          </div>

          <div class="modal-footer border-0 px-4 pb-4 pt-0">
            <button type="button" class="btn btn-light rounded-pill px-4" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" class="btn-primary" @click="uploadFiles" :disabled="uploading || uploadQueue.length === 0 || !uploadMetadata.caption || !uploadMetadata.alt">
              <span v-if="uploading"><span class="spinner-border spinner-border-sm me-2"></span>Subiendo...</span>
              <span v-else>Subir {{ uploadQueue.length }} archivo(s)</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- ── Edit modal ── -->
    <div class="modal fade" id="editMediaModal" tabindex="-1" ref="editModalRef">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content border-0 shadow-lg rounded-4">
          <div class="modal-header border-0 px-4 pt-4 pb-0">
            <div>
              <h2 class="modal-title h5 fw-bold mb-1">Editar archivo</h2>
              <small class="text-muted">Actualiza alt, caption, categoría y visibilidad de descarga.</small>
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>

          <div class="modal-body px-4 pb-4">
            <div v-if="editing" class="mb-4">
              <div v-if="isImage(editing.mimeType)" class="ratio ratio-16x9 rounded-4 overflow-hidden bg-light">
                <img :src="editing.thumbnailUrl || editing.url" class="w-100 h-100" style="object-fit:cover;" :alt="editing.alt || editing.originalName || 'Archivo'">
              </div>
              <div v-else class="rounded-4 border bg-light p-4 text-center">
                <i :class="getFileIcon(editing.mimeType)" class="fs-1 mb-2 d-block"></i>
                <div class="fw-semibold">{{ editing.originalName }}</div>
              </div>
            </div>

            <div class="row g-3">
              <div class="col-12">
                <label class="form-label small text-muted mb-1">Texto alternativo (alt)</label>
                <input type="text" class="form-control" v-model.trim="editForm.alt">
              </div>
              <div class="col-12">
                <label class="form-label small text-muted mb-1">Descripción / caption</label>
                <textarea class="form-control" rows="3" v-model.trim="editForm.caption"></textarea>
              </div>
              <div class="col-12 col-md-6">
                <label class="form-label small text-muted mb-1">Categoría</label>
                <select class="form-select" v-model="editForm.category">
                  <option value="general">General</option>
                  <option value="press">Kit de prensa</option>
                  <option value="logo">Logotipo</option>
                  <option value="product">Producto</option>
                </select>
              </div>
              <div class="col-12 col-md-6">
                <label class="form-label small text-muted mb-1">Carpeta</label>
                <select class="form-select" v-model="editForm.folder">
                  <option v-for="f in folders" :key="f" :value="f">{{ f }}</option>
                </select>
              </div>
              <div class="col-12 col-md-6 d-flex align-items-end">
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" id="editDownloadable" v-model="editForm.downloadable">
                  <label class="form-check-label" for="editDownloadable">Disponible para descarga</label>
                </div>
              </div>
            </div>
          </div>

          <div class="modal-footer border-0 px-4 pb-4 pt-0">
            <button type="button" class="btn btn-light rounded-pill px-4" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-bsw rounded-pill px-4" @click="saveEdit" :disabled="savingMedia">
              <span v-if="savingMedia"><span class="spinner-border spinner-border-sm me-2"></span>Guardando...</span>
              <span v-else>Guardar cambios</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- ── Delete modal ── -->
    <div class="modal fade" id="deleteMediaModal" tabindex="-1" ref="deleteModalRef">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow-lg rounded-4">
          <div class="modal-header border-0 px-4 pt-4 pb-0">
            <div>
              <h2 class="modal-title h5 fw-bold mb-1">Eliminar archivo</h2>
              <small class="text-muted">Esta acción no se puede deshacer.</small>
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body px-4 py-3">
            <div class="alert alert-warning d-flex align-items-start gap-3 mb-0">
              <i class="fas fa-triangle-exclamation mt-1"></i>
              <div class="d-flex align-items-center gap-1">
                <span>¿Estás seguro de eliminar</span>
                <strong class="text-truncate d-inline-block" style="max-width: 100px;">{{ deleting?.originalName }}</strong>
                <span>?</span>
              </div>
            </div>
          </div>
          <div class="modal-footer border-0 px-4 pb-4 pt-0">
            <button type="button" class="btn btn-light rounded-pill px-4" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-danger rounded-pill px-4" @click="deleteFile" :disabled="deletingMedia">
              <span v-if="deletingMedia"><span class="spinner-border spinner-border-sm me-2"></span>Eliminando...</span>
              <span v-else>Eliminar</span>
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { storeToRefs } from 'pinia'
import { useCmsStore } from '@/stores/cms.js'
import { useAuthStore } from '@/stores/auth.js'
import { notify, alertPermissionDenied } from '@/services/notifications.js'
import { getApiErrorMessage } from '@/services/api.js'

const cmsStore = useCmsStore()
const authStore = useAuthStore()
const { media, loadingMedia, uploadingMedia, savingMedia, deletingMedia } = storeToRefs(cmsStore)

const canUpload     = computed(() => authStore.hasPermission('media.upload'))
const canDeletePerm = computed(() => authStore.hasPermission('media.delete'))

const uploadModalRef = ref(null)
const editModalRef   = ref(null)
const deleteModalRef = ref(null)
let uploadModal = null
let editModal   = null
let deleteModal = null

// ── View / filter state ───────────────────────────────────────────────────────
const filterType  = ref('')
const filterFolder = ref('')
const sortBy      = ref('newest')
const searchQuery = ref('')
const viewMode    = ref('grid')   // 'grid' | 'list'

// ── Folder system ─────────────────────────────────────────────────────────────
const folders = ref(['General', 'Imágenes del blog', 'Logos y marca', 'Documentos', 'Videos'])
const activeFolder = ref(null)   // null = todos
const creatingFolder = ref(false)
const newFolderName  = ref('')
const newFolderInputRef = ref(null)

const folderCount = (folderName) =>
  media.value.filter(f => (f.folder || 'General') === folderName).length

const startCreatingFolder = async () => {
  creatingFolder.value = true
  await nextTick()
  newFolderInputRef.value?.focus()
}

const createFolder = () => {
  const name = newFolderName.value.trim()
  if (name && !folders.value.includes(name)) {
    folders.value.push(name)
    activeFolder.value = name
  }
  creatingFolder.value = false
  newFolderName.value = ''
}

const moveFileToFolder = (file, folderName) => {
  file.folder = folderName
}

// ── Multi-select ──────────────────────────────────────────────────────────────
const selectedIds   = ref(new Set())
const bulkMoveTarget = ref('')

const toggleSelect = (id) => {
  const next = new Set(selectedIds.value)
  if (next.has(id)) next.delete(id)
  else next.add(id)
  selectedIds.value = next
}

const allSelected = computed(() =>
  filteredMedia.value.length > 0 &&
  filteredMedia.value.every(f => selectedIds.value.has(f._id))
)

const someSelected = computed(() =>
  !allSelected.value && filteredMedia.value.some(f => selectedIds.value.has(f._id))
)

const toggleSelectAll = () => {
  if (allSelected.value) {
    selectedIds.value = new Set()
  } else {
    selectedIds.value = new Set(filteredMedia.value.map(f => f._id))
  }
}

const bulkMoveToFolder = () => {
  if (!bulkMoveTarget.value) return
  media.value.forEach(f => {
    if (selectedIds.value.has(f._id)) f.folder = bulkMoveTarget.value
  })
  bulkMoveTarget.value = ''
  selectedIds.value = new Set()
}

const bulkDelete = async () => {
  const ids = [...selectedIds.value]
  for (const id of ids) {
    try { await cmsStore.deleteMedia(id) } catch { /* continue */ }
  }
  selectedIds.value = new Set()
  await refreshMedia()
}

// ── Upload state ──────────────────────────────────────────────────────────────
const isDragging  = ref(false)
const mainDragging = ref(false)
const uploading   = ref(false)
const uploadQueue = ref([])
const uploadMetadata = ref({ category: 'general', folder: 'General', downloadable: false, alt: '', caption: '' })

const editing  = ref(null)
const editForm = ref({ alt: '', caption: '', category: 'general', folder: 'General', downloadable: false })
const deleting = ref(null)
const notice   = ref({ type: '', text: '' })

// ── Options ───────────────────────────────────────────────────────────────────
const typeOptions = [
  { value: '', label: 'Todos' },
  { value: 'press', label: 'Prensa' },
  { value: 'logo', label: 'Logotipos' },
  { value: 'product', label: 'Productos' },
  { value: 'general', label: 'General' }
]

const showNotice = (type, text) => { notice.value = { type, text } }

// ── Stats ─────────────────────────────────────────────────────────────────────
const mediaStats = computed(() => {
  const total       = media.value.length
  const images      = media.value.filter(i => isImage(i.mimeType)).length
  const documents   = total - images
  const downloadable = media.value.filter(i => !!i.downloadable).length
  return { total, images, documents, downloadable }
})

// ── Filtered + sorted media ───────────────────────────────────────────────────
const filteredMedia = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  let list = (media.value || []).filter(file => {
    const byType    = !filterType.value || file.category === filterType.value
    const byFolder  = !filterFolder.value || (file.folder || 'General') === filterFolder.value
    const byActive  = activeFolder.value === null || (file.folder || 'General') === activeFolder.value
    const haystack  = [file.originalName, file.alt, file.caption, file.category].filter(Boolean).join(' ').toLowerCase()
    const bySearch  = !q || haystack.includes(q)
    return byType && byFolder && byActive && bySearch
  })

  // Sort
  switch (sortBy.value) {
    case 'oldest':
      list = [...list].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      break
    case 'name':
      list = [...list].sort((a, b) => (a.originalName || '').localeCompare(b.originalName || ''))
      break
    case 'sizeAsc':
      list = [...list].sort((a, b) => (a.size || 0) - (b.size || 0))
      break
    case 'sizeDesc':
      list = [...list].sort((a, b) => (b.size || 0) - (a.size || 0))
      break
    default: // newest
      list = [...list].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  }
  return list
})

// ── Helpers ───────────────────────────────────────────────────────────────────
const isImage      = (t) => t?.startsWith('image/')
const getFileLabel = (t) => {
  if (t?.startsWith('image/')) return 'Imagen'
  if (t?.includes('pdf')) return 'PDF'
  if (t?.includes('word') || t?.includes('document')) return 'Documento'
  if (t?.startsWith('video/')) return 'Video'
  return 'Archivo'
}
const getFileIcon  = (t) => {
  if (t?.startsWith('image/')) return 'fas fa-image text-primary'
  if (t?.includes('pdf')) return 'fas fa-file-pdf text-danger'
  if (t?.includes('word') || t?.includes('document')) return 'fas fa-file-word text-primary'
  if (t?.startsWith('video/')) return 'fas fa-file-video text-warning'
  return 'fas fa-file text-secondary'
}
const getCategoryLabel = (c) => ({ general: 'General', press: 'Kit de prensa', logo: 'Logotipo', product: 'Producto' }[c] || 'General')

const formatFileSize = (bytes) => {
  if (bytes === undefined || bytes === null) return '-'
  if (bytes === 0) return '0 B'
  const k = 1024; const sizes = ['B','KB','MB','GB']; const i = Math.min(Math.floor(Math.log(bytes)/Math.log(k)), sizes.length-1)
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
}
const formatFileDate = (date) => {
  if (!date) return '—'
  try { return new Intl.DateTimeFormat('es-PA',{day:'2-digit',month:'short',year:'numeric'}).format(new Date(date)) } catch { return '—' }
}

// ── Actions ───────────────────────────────────────────────────────────────────
const clearFilters  = () => { searchQuery.value = ''; filterType.value = ''; filterFolder.value = ''; sortBy.value = 'newest'; activeFolder.value = null }
const refreshMedia  = async () => { try { await cmsStore.fetchMedia({ type: filterType.value || undefined }) } catch (e) { showNotice('danger', getApiErrorMessage(e)) } }
const openUploadModal = () => {
  uploadQueue.value = []
  uploadMetadata.value = { category: 'general', folder: activeFolder.value || 'General', downloadable: false, alt: '', caption: '' }
  uploadModal?.show()
}

const handleDrop = (e) => {
  isDragging.value = false
  Array.from(e.dataTransfer.files || []).forEach(f => uploadQueue.value.push({ file: f }))
}
const handleFileSelect = (e) => {
  Array.from(e.target.files || []).forEach(f => uploadQueue.value.push({ file: f }))
  e.target.value = ''
}

// Drag & drop on main area
const handleMainDrop = (e) => {
  mainDragging.value = false
  const files = Array.from(e.dataTransfer.files || [])
  if (!files.length) return
  files.forEach(f => uploadQueue.value.push({ file: f }))
  uploadMetadata.value = { category: 'general', folder: activeFolder.value || 'General', downloadable: false, alt: '', caption: '' }
  uploadModal?.show()
}

// Mock per-file progress
const simulateProgress = (item) => {
  item.progress = 0
  const interval = setInterval(() => {
    item.progress = Math.min(item.progress + Math.random() * 15 + 5, 95)
    if (item.progress >= 95) clearInterval(interval)
  }, 100)
  return interval
}

const uploadFiles = async () => {
  if (!uploadQueue.value.length) return
  uploading.value = true
  try {
    for (const item of uploadQueue.value) {
      const interval = simulateProgress(item)
      try {
        await cmsStore.uploadMedia(item.file, {
          category: uploadMetadata.value.category,
          downloadable: uploadMetadata.value.downloadable,
          alt: uploadMetadata.value.alt || item.file.name,
          caption: uploadMetadata.value.caption || '',
          folder: uploadMetadata.value.folder
        })
        clearInterval(interval)
        item.progress = 100
      } catch (e) {
        clearInterval(interval)
        item.progress = undefined
        throw e
      }
    }
    showNotice('success', `${uploadQueue.value.length} archivo(s) subido(s) correctamente.`)
    await new Promise(r => setTimeout(r, 600))
    uploadModal?.hide()
    uploadQueue.value = []
    await refreshMedia()
  } catch (e) {
    showNotice('danger', getApiErrorMessage(e))
  } finally {
    uploading.value = false
  }
}

const copyUrl = async (url) => {
  try { await navigator.clipboard.writeText(url); showNotice('success','URL copiada al portapapeles.') }
  catch { showNotice('danger','No se pudo copiar la URL.') }
}

const openEditModal = (file) => {
  editing.value = file
  editForm.value = { alt: file.alt||'', caption: file.caption||'', category: file.category||'general', folder: file.folder||'General', downloadable: !!file.downloadable }
  editModal?.show()
}
const saveEdit = async () => {
  if (!editing.value) return
  try {
    await cmsStore.updateMedia(editing.value._id, editForm.value)
    if (editForm.value.folder) editing.value.folder = editForm.value.folder
    showNotice('success','El archivo fue actualizado correctamente.')
    editModal?.hide()
    await refreshMedia()
  } catch (e) { showNotice('danger', getApiErrorMessage(e)) }
}
const openDeleteModal = (file) => { deleting.value = file; deleteModal?.show() }
const deleteFile = async () => {
  if (!deleting.value) return
  try { await cmsStore.deleteMedia(deleting.value._id); showNotice('success','El archivo fue eliminado correctamente.'); deleteModal?.hide(); await refreshMedia() }
  catch (e) { showNotice('danger', getApiErrorMessage(e)) }
}

watch(filterType, async () => { await refreshMedia() })

onMounted(async () => {
  const { Modal } = await import('bootstrap')
  uploadModal = new Modal(uploadModalRef.value)
  editModal   = new Modal(editModalRef.value)
  deleteModal = new Modal(deleteModalRef.value)
  await refreshMedia()
})
</script>

<style scoped>
/* ─── Tokens ─── */
.media-page {
  --green-800: #2563eb;
  --green-700: #1d4ed8;
  --green-600: #2563eb;
  --green-50:  #eff6ff;
  --blue-400:  #1E88C6;
  --blue-50:   #e8f4fd;
  --gray-900:  #111827;
  --gray-600:  #4b5563;
  --gray-500:  #6b7280;
  --gray-400:  #9ca3af;
  --gray-300:  #d1d5db;
  --gray-200:  #e5e7eb;
  --gray-100:  #f3f4f6;
  --gray-50:   #f9fafb;
  --radius-xs: 6px;
  --radius-sm: 8px;
  --radius-md: 12px;
  --font-sans: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  min-height: 100%;
  padding: 32px 28px;
  font-family: var(--font-sans);
  color: var(--gray-900);
  position: relative;
}

/* ─── Page header ─── */
.page-header { display: flex; align-items: flex-end; justify-content: space-between; gap: 20px; margin-bottom: 28px; flex-wrap: wrap; }
.page-header__left {}
.page-header__breadcrumb { display: flex; align-items: center; gap: 5px; font-size: 11.5px; color: var(--gray-400); font-weight: 500; letter-spacing: .03em; text-transform: uppercase; margin-bottom: 6px; }
.page-header__breadcrumb .active { color: var(--green-800); }
.page-header__breadcrumb svg { color: var(--gray-300); }
.page-header__title { font-size: 22px; font-weight: 650; letter-spacing: -.4px; color: var(--gray-900); margin: 0 0 5px; line-height: 1.2; }
.page-header__desc  { font-size: 13.5px; color: var(--gray-400); margin: 0; }
.page-header__actions { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }

/* ─── Buttons ─── */
.btn-primary { display: inline-flex; align-items: center; gap: 6px; padding: 9px 16px; background: var(--green-800); color: #fff; border: none; border-radius: var(--radius-sm); font-size: 13.5px; font-weight: 550; cursor: pointer; transition: background .15s, transform .1s; font-family: var(--font-sans); white-space: nowrap; }
.btn-primary:hover { background: var(--green-700); }
.btn-primary:active { transform: scale(.98); }
.btn-primary--sm { padding: 7px 13px; font-size: 12.5px; }
.btn-primary:disabled { opacity: .5; cursor: not-allowed; }

.btn-ghost { display: inline-flex; align-items: center; gap: 6px; padding: 8px 14px; background: transparent; color: var(--gray-600); border: 1px solid var(--gray-200); border-radius: var(--radius-sm); font-size: 13.5px; font-weight: 500; cursor: pointer; transition: all .15s; font-family: var(--font-sans); white-space: nowrap; }
.btn-ghost:hover { background: var(--gray-50); border-color: var(--gray-300); color: var(--gray-900); }
.btn-ghost:disabled { opacity: .45; cursor: not-allowed; }
.btn-ghost--sm { padding: 6px 12px; font-size: 12.5px; }

.btn-danger-sm { display: inline-flex; align-items: center; gap: 5px; padding: 6px 12px; background: #fee2e2; color: #dc2626; border: 1px solid #fca5a5; border-radius: var(--radius-sm); font-size: 12.5px; font-weight: 550; cursor: pointer; transition: all .15s; font-family: var(--font-sans); white-space: nowrap; }
.btn-danger-sm:hover { background: #fca5a5; }

/* ─── Stats ─── */
.stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 20px; }
@media (max-width: 768px) { .stats-row { grid-template-columns: repeat(2, 1fr); } }

.stat-chip { display: flex; align-items: center; gap: 12px; padding: 14px 16px; background: #fff; border: 1px solid var(--gray-200); border-radius: var(--radius-md); transition: border-color .15s; }
.stat-chip:hover { border-color: var(--gray-300); }
.stat-chip__icon { width: 34px; height: 34px; border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.stat-chip__icon--green { background: var(--green-50);  color: var(--green-800); }
.stat-chip__icon--blue  { background: var(--blue-50);   color: var(--blue-400); }
.stat-chip__icon--gray  { background: var(--gray-100);  color: var(--gray-600); }
.stat-chip__icon--dark  { background: var(--gray-900);  color: #fff; }
.stat-chip__info  { display: flex; flex-direction: column; gap: 1px; }
.stat-chip__value { font-size: 20px; font-weight: 700; line-height: 1; color: var(--gray-900); letter-spacing: -.5px; }
.stat-chip__label { font-size: 11.5px; color: var(--gray-400); font-weight: 500; }

/* ─── Filters bar ─── */
.filters-bar {
  display: flex; align-items: center; gap: 12px;
  background: #fff; border: 1px solid var(--gray-200); border-radius: var(--radius-md);
  padding: 10px 14px; margin-bottom: 14px;
  flex-wrap: wrap;
}
.filters-bar__search { display: flex; align-items: center; gap: 8px; flex: 1; min-width: 200px; background: var(--gray-50); border: 1px solid var(--gray-200); border-radius: var(--radius-sm); padding: 0 10px; transition: border-color .15s; }
.filters-bar__search:focus-within { border-color: var(--green-700); }
.filters-bar__search-icon { color: var(--gray-400); flex-shrink: 0; }
.filters-bar__input { flex: 1; border: none; background: transparent; padding: 9px 0; font-size: 13.5px; color: var(--gray-900); font-family: var(--font-sans); outline: none; }
.filters-bar__input::placeholder { color: var(--gray-400); }
.filters-bar__clear-btn { background: none; border: none; cursor: pointer; color: var(--gray-400); display: flex; align-items: center; padding: 2px; border-radius: 4px; }
.filters-bar__clear-btn:hover { color: var(--gray-800); }
.filters-bar__right { display: flex; align-items: center; gap: 8px; flex-shrink: 0; flex-wrap: wrap; }

.type-pills { display: flex; gap: 4px; }
.type-pill { padding: 5px 11px; border-radius: 99px; border: 1px solid var(--gray-200); background: transparent; font-size: 12px; font-weight: 500; color: var(--gray-500); cursor: pointer; transition: all .14s; font-family: var(--font-sans); white-space: nowrap; }
.type-pill:hover { background: var(--gray-50); color: var(--gray-800); }
.type-pill.active { background: var(--green-800); border-color: var(--green-800); color: #fff; }

.filter-select { appearance: none; background: var(--gray-50) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' fill='none'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%239ca3af' stroke-width='1.4' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") no-repeat right 8px center; border: 1px solid var(--gray-200); border-radius: var(--radius-sm); padding: 6px 26px 6px 10px; font-size: 12.5px; font-family: var(--font-sans); color: var(--gray-600); cursor: pointer; outline: none; transition: border-color .15s; }
.filter-select:focus { border-color: var(--green-700); }
.filter-select--sm { padding: 5px 24px 5px 9px; font-size: 12px; }
.filter-select--xs { padding: 4px 22px 4px 8px; font-size: 11.5px; }

/* ─── View toggle ─── */
.view-toggle { display: flex; border: 1px solid var(--gray-200); border-radius: var(--radius-sm); overflow: hidden; }
.view-btn { display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; background: transparent; border: none; cursor: pointer; color: var(--gray-400); transition: background .12s, color .12s; }
.view-btn:hover { background: var(--gray-50); color: var(--gray-600); }
.view-btn.active { background: var(--green-800); color: #fff; }

/* ─── Bulk bar ─── */
.bulk-bar {
  display: flex; align-items: center; gap: 12px; flex-wrap: wrap;
  padding: 10px 16px; margin-bottom: 12px;
  background: #eff6ff; border: 1px solid #bfdbfe; border-radius: var(--radius-md);
}
.bulk-bar__count { font-size: 13px; font-weight: 600; color: var(--green-800); }
.bulk-bar__actions { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.bulk-bar-enter-active, .bulk-bar-leave-active { transition: all .2s ease; }
.bulk-bar-enter-from, .bulk-bar-leave-to { opacity: 0; transform: translateY(-8px); }

/* ─── Layout ─── */
.media-layout { display: flex; gap: 16px; align-items: flex-start; }
.media-content { flex: 1; min-width: 0; }

/* ─── Folder sidebar ─── */
.folder-sidebar {
  width: 200px; flex-shrink: 0;
  background: #fff; border: 1px solid var(--gray-200); border-radius: var(--radius-md);
  padding: 14px 0 0; position: sticky; top: 24px;
}
.folder-sidebar__header { font-size: 10.5px; font-weight: 650; color: var(--gray-400); letter-spacing: .06em; text-transform: uppercase; padding: 0 14px 8px; }
.folder-list { list-style: none; margin: 0; padding: 0; }
.folder-item { display: flex; align-items: center; gap: 8px; padding: 7px 14px; cursor: pointer; transition: background .12s; color: var(--gray-600); font-size: 13px; }
.folder-item:hover { background: var(--gray-50); }
.folder-item.active { background: var(--green-50); color: var(--green-800); font-weight: 600; }
.folder-item svg { flex-shrink: 0; }
.folder-item__name { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.folder-item__count { font-size: 11px; font-weight: 600; background: var(--gray-100); color: var(--gray-500); border-radius: 99px; padding: 1px 7px; flex-shrink: 0; }
.folder-item.active .folder-item__count { background: #dbeafe; color: var(--green-800); }

.new-folder-area { padding: 10px 14px 14px; border-top: 1px solid var(--gray-100); margin-top: 6px; }
.new-folder-btn { display: flex; align-items: center; gap: 6px; font-size: 12.5px; color: var(--gray-500); background: none; border: none; cursor: pointer; font-family: var(--font-sans); padding: 0; width: 100%; transition: color .12s; }
.new-folder-btn:hover { color: var(--green-800); }
.new-folder-input-wrap { display: flex; flex-direction: column; gap: 6px; }
.new-folder-input { border: 1px solid var(--gray-300); border-radius: var(--radius-xs); padding: 5px 9px; font-size: 12.5px; font-family: var(--font-sans); outline: none; transition: border-color .15s; }
.new-folder-input:focus { border-color: var(--green-700); }
.new-folder-btns { display: flex; gap: 6px; }
.nf-btn { width: 26px; height: 26px; border: 1px solid var(--gray-200); border-radius: var(--radius-xs); background: transparent; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all .12s; }
.nf-btn--confirm { border-color: #bbf7d0; background: #f0fdf4; color: #16a34a; }
.nf-btn--confirm:hover { background: #dcfce7; }
.nf-btn--cancel { border-color: var(--gray-200); color: var(--gray-400); }
.nf-btn--cancel:hover { background: var(--gray-50); }

/* ─── Library header ─── */
.library-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 12px 16px; margin-bottom: 12px;
  background: #fff; border: 1px solid var(--gray-200); border-radius: var(--radius-md);
}
.library-header__left { display: flex; align-items: center; gap: 10px; }
.library-header__title { font-size: 13px; font-weight: 650; color: var(--gray-900); }
.library-header__count { font-size: 12px; color: var(--gray-400); font-weight: 500; padding: 2px 9px; background: var(--gray-100); border-radius: 99px; }
.library-header__badges { display: flex; gap: 6px; flex-wrap: wrap; }
.lib-badge { font-size: 11px; font-weight: 500; color: var(--gray-500); padding: 3px 10px; border: 1px solid var(--gray-200); border-radius: 99px; background: var(--gray-50); }

/* ─── Cards (grid) ─── */
.media-card { transition: transform .2s ease, box-shadow .2s ease; position: relative; }
.media-card:hover { transform: translateY(-3px); box-shadow: 0 18px 40px rgba(15,23,42,.12) !important; }
.media-card.selected { outline: 2px solid var(--green-800); outline-offset: 2px; }
.media-preview { height: 220px; background: #f8fafc; }

/* ─── Checkbox ─── */
.media-checkbox { position: absolute; top: 8px; left: 8px; z-index: 2; opacity: 0; transition: opacity .12s; cursor: pointer; }
.media-card:hover .media-checkbox,
.media-card.selected .media-checkbox { opacity: 1; }
.media-checkbox input[type="checkbox"] { width: 16px; height: 16px; cursor: pointer; accent-color: var(--green-800); }
.media-checkbox--inline { position: static; opacity: 1; }

/* ─── Upload zone ─── */
.upload-zone { border: 2px dashed rgba(13,110,253,.2); border-radius: 1.5rem; padding: 2.25rem 1.5rem; text-align: center; background: linear-gradient(180deg,#fff 0%,#f8fbff 100%); transition: all .2s ease; }
.upload-zone.dragging { border-color: #0d6efd; background: rgba(13,110,253,.06); box-shadow: inset 0 0 0 1px rgba(13,110,253,.15); }
.queue-icon { width: 42px; height: 42px; border-radius: .9rem; display: grid; place-items: center; background: rgba(13,110,253,.08); }

/* ─── List view ─── */
.list-view { overflow-x: auto; }
.media-table { width: 100%; border-collapse: collapse; font-size: 13px; }
.media-table thead th { padding: 10px 12px; font-size: 11.5px; font-weight: 650; color: var(--gray-400); letter-spacing: .04em; text-transform: uppercase; border-bottom: 1px solid var(--gray-200); background: var(--gray-50); white-space: nowrap; }
.media-table thead th:first-child { border-radius: var(--radius-sm) 0 0 0; }
.media-table thead th:last-child  { border-radius: 0 var(--radius-sm) 0 0; }
.media-row td { padding: 10px 12px; border-bottom: 1px solid var(--gray-100); vertical-align: middle; color: var(--gray-600); }
.media-row:last-child td { border-bottom: none; }
.media-row:hover td { background: var(--gray-50); }
.media-row.selected td { background: #eff6ff; }
.col-check { width: 36px; }
.col-thumb { width: 60px; }
.col-name  { min-width: 160px; }
.col-type  { width: 90px; }
.col-size  { width: 80px; white-space: nowrap; }
.col-folder { width: 140px; }
.col-date  { width: 110px; white-space: nowrap; }
.col-actions { width: 100px; }

.list-thumb { width: 40px; height: 40px; border-radius: var(--radius-xs); overflow: hidden; background: var(--gray-100); display: flex; align-items: center; justify-content: center; }
.list-thumb__img { width: 100%; height: 100%; object-fit: cover; }
.list-thumb__icon { font-size: 16px; color: var(--gray-400); }
.list-name { display: block; font-weight: 550; color: var(--gray-900); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 200px; }
.list-desc { display: block; font-size: 11.5px; color: var(--gray-400); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 200px; }
.type-badge { font-size: 11px; padding: 2px 8px; border-radius: 99px; background: var(--gray-100); color: var(--gray-600); font-weight: 500; }

.row-actions { display: flex; gap: 4px; }
.row-action-btn { width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; border: 1px solid var(--gray-200); border-radius: var(--radius-xs); background: transparent; color: var(--gray-500); cursor: pointer; font-size: 11px; transition: all .12s; }
.row-action-btn:hover { background: var(--gray-100); color: var(--gray-900); }
.row-action-btn--danger:hover { background: #fee2e2; border-color: #fca5a5; color: #dc2626; }

/* ─── Drop overlay ─── */
.drop-overlay {
  position: fixed; inset: 0; z-index: 9999;
  background: rgba(37, 99, 235, .12); backdrop-filter: blur(2px);
  display: flex; align-items: center; justify-content: center;
}
.drop-overlay__inner {
  background: #fff; border: 3px dashed var(--green-800); border-radius: 20px;
  padding: 48px 64px; text-align: center; color: var(--green-800); pointer-events: none;
}
.drop-overlay__inner p { font-size: 18px; font-weight: 600; margin: 12px 0 0; }
.fade-enter-active, .fade-leave-active { transition: opacity .2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

/* ─── Misc ─── */
.spin { animation: spin .8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
</style>

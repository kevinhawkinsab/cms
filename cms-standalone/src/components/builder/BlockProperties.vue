<template>
  <aside class="block-properties" data-testid="block-properties" v-if="block">
    <div class="props-header">
      <h6 class="props-title">
        <i :class="typeInfo.icon" class="me-2"></i>
        {{ typeInfo.label }}
      </h6>
      <button class="btn-close-props" @click="store.clearSelection" data-testid="close-properties">
        <i class="fas fa-times"></i>
      </button>
    </div>

    <div class="props-body">
      <!-- HEADING -->
      <template v-if="block.type === 'heading'">
        <div class="prop-group">
          <label class="prop-label">Texto</label>
          <input class="form-control prop-input" :value="block.content.text" @input="updateContent({ text: $event.target.value })" data-testid="prop-heading-text" />
        </div>
        <div class="prop-group">
          <label class="prop-label">Nivel</label>
          <select class="form-select prop-input" :value="block.content.level" @change="updateContent({ level: Number($event.target.value) })" data-testid="prop-heading-level">
            <option v-for="n in 6" :key="n" :value="n">H{{ n }}</option>
          </select>
        </div>
      </template>

      <!-- IMAGE -->
      <template v-if="block.type === 'image'">
        <div class="prop-group">
          <label class="prop-label">URL de imagen</label>
          <input class="form-control prop-input" :value="block.content.src" @input="updateContent({ src: $event.target.value })" placeholder="https://..." data-testid="prop-image-src" />
        </div>
        <div class="prop-group">
          <label class="prop-label">Texto alternativo</label>
          <input class="form-control prop-input" :value="block.content.alt" @input="updateContent({ alt: $event.target.value })" />
        </div>
        <div class="prop-group">
          <label class="prop-label">Leyenda</label>
          <input class="form-control prop-input" :value="block.content.caption" @input="updateContent({ caption: $event.target.value })" />
        </div>
        <div class="prop-group">
          <label class="prop-label">Ancho</label>
          <input class="form-control prop-input" :value="block.content.width || '100%'" @input="updateContent({ width: $event.target.value })" />
        </div>
      </template>

      <!-- YOUTUBE -->
      <template v-if="block.type === 'youtube'">
        <div class="prop-group">
          <label class="prop-label">URL de YouTube</label>
          <input class="form-control prop-input" :value="block.content.url" @input="updateContent({ url: $event.target.value })" placeholder="https://youtube.com/watch?v=..." data-testid="prop-youtube-url" />
        </div>
      </template>

      <!-- QUOTE -->
      <template v-if="block.type === 'quote'">
        <div class="prop-group">
          <label class="prop-label">Cita</label>
          <textarea class="form-control prop-input" rows="3" :value="block.content.text" @input="updateContent({ text: $event.target.value })" />
        </div>
        <div class="prop-group">
          <label class="prop-label">Autor</label>
          <input class="form-control prop-input" :value="block.content.author" @input="updateContent({ author: $event.target.value })" />
        </div>
      </template>

      <!-- BUTTON -->
      <template v-if="block.type === 'button'">
        <div class="prop-group">
          <label class="prop-label">Texto</label>
          <input class="form-control prop-input" :value="block.content.text" @input="updateContent({ text: $event.target.value })" />
        </div>
        <div class="prop-group">
          <label class="prop-label">URL</label>
          <input class="form-control prop-input" :value="block.content.url" @input="updateContent({ url: $event.target.value })" />
        </div>
        <div class="prop-group">
          <label class="prop-label">Variante</label>
          <select class="form-select prop-input" :value="block.content.variant" @change="updateContent({ variant: $event.target.value })">
            <option value="primary">Primario</option>
            <option value="secondary">Secundario</option>
            <option value="outline">Contorno</option>
            <option value="dark">Oscuro</option>
          </select>
        </div>
        <div class="prop-group">
          <label class="prop-label">Abrir en</label>
          <select class="form-select prop-input" :value="block.content.target" @change="updateContent({ target: $event.target.value })">
            <option value="_self">Misma ventana</option>
            <option value="_blank">Nueva ventana</option>
          </select>
        </div>
      </template>

      <!-- SEPARATOR -->
      <template v-if="block.type === 'separator'">
        <div class="prop-group">
          <label class="prop-label">Estilo</label>
          <select class="form-select prop-input" :value="block.content.style" @change="updateContent({ style: $event.target.value })">
            <option value="solid">Solido</option>
            <option value="dashed">Guiones</option>
            <option value="dotted">Puntos</option>
            <option value="gradient">Gradiente</option>
          </select>
        </div>
        <div class="prop-group">
          <label class="prop-label">Grosor</label>
          <input class="form-control prop-input" :value="block.content.thickness" @input="updateContent({ thickness: $event.target.value })" />
        </div>
      </template>

      <!-- SPACER -->
      <template v-if="block.type === 'spacer'">
        <div class="prop-group">
          <label class="prop-label">Altura</label>
          <input class="form-control prop-input" :value="block.content.height" @input="updateContent({ height: $event.target.value })" placeholder="40px" />
        </div>
      </template>

      <!-- ARTICLE LIST -->
      <template v-if="block.type === 'article-list'">
        <div class="prop-group">
          <label class="prop-label">Layout</label>
          <select class="form-select prop-input" :value="block.content.layout" @change="updateContent({ layout: $event.target.value })" data-testid="prop-al-layout">
            <option value="grid">Grilla</option>
            <option value="list">Lista</option>
          </select>
        </div>
        <div class="prop-group" v-if="block.content.layout !== 'list'">
          <label class="prop-label">Columnas</label>
          <select class="form-select prop-input" :value="block.content.columns" @change="updateContent({ columns: Number($event.target.value) })">
            <option value="2">2 columnas</option>
            <option value="3">3 columnas</option>
            <option value="4">4 columnas</option>
          </select>
        </div>
        <div class="prop-group">
          <label class="prop-label">Limite de articulos</label>
          <input class="form-control prop-input" type="number" min="1" max="20" :value="block.content.limit" @input="updateContent({ limit: Number($event.target.value) })" />
        </div>
        <div class="prop-group">
          <label class="prop-label">Visibilidad</label>
          <div class="prop-checks">
            <label class="prop-check"><input type="checkbox" :checked="block.content.showImage" @change="updateContent({ showImage: $event.target.checked })" /> Imagen</label>
            <label class="prop-check"><input type="checkbox" :checked="block.content.showExcerpt" @change="updateContent({ showExcerpt: $event.target.checked })" /> Extracto</label>
            <label class="prop-check"><input type="checkbox" :checked="block.content.showCategory" @change="updateContent({ showCategory: $event.target.checked })" /> Categoria</label>
            <label class="prop-check"><input type="checkbox" :checked="block.content.showDate" @change="updateContent({ showDate: $event.target.checked })" /> Fecha</label>
            <label class="prop-check"><input type="checkbox" :checked="block.content.showButton !== false" @change="updateContent({ showButton: $event.target.checked })" /> Boton</label>
          </div>
        </div>

        <div class="props-divider"></div>
        <h6 class="props-section-title">Texto del boton</h6>
        <div class="prop-group">
          <label class="prop-label">Texto</label>
          <input class="form-control prop-input" :value="block.content.buttonText || 'Leer mas'" @input="updateContent({ buttonText: $event.target.value })" data-testid="prop-al-btn-text" />
        </div>

        <div class="props-divider"></div>
        <h6 class="props-section-title">Imagen</h6>
        <div class="prop-group">
          <label class="prop-label">Aspecto de imagen</label>
          <select class="form-select prop-input" :value="block.content.imageAspectRatio || '16/10'" @change="updateContent({ imageAspectRatio: $event.target.value })">
            <option value="16/10">16:10 (Panoramico)</option>
            <option value="16/9">16:9 (Widescreen)</option>
            <option value="4/3">4:3 (Clasico)</option>
            <option value="1/1">1:1 (Cuadrado)</option>
            <option value="3/4">3:4 (Retrato)</option>
          </select>
        </div>

        <div class="props-divider"></div>
        <h6 class="props-section-title">Estilos de tarjeta</h6>

        <div class="prop-group">
          <label class="prop-label">Fondo de tarjeta</label>
          <div class="d-flex gap-2 align-items-center">
            <input type="color" class="form-control form-control-color prop-color" :value="cardStyle.backgroundColor || '#ffffff'" @input="updateCardStyle({ backgroundColor: $event.target.value })" />
            <input class="form-control prop-input flex-grow-1" :value="cardStyle.backgroundColor || '#ffffff'" @input="updateCardStyle({ backgroundColor: $event.target.value })" />
          </div>
        </div>
        <div class="prop-group">
          <label class="prop-label">Radio de borde</label>
          <input class="form-control prop-input" :value="cardStyle.borderRadius || '20px'" @input="updateCardStyle({ borderRadius: $event.target.value })" placeholder="20px" />
        </div>
        <div class="prop-group">
          <label class="prop-label">Borde</label>
          <input class="form-control prop-input" :value="cardStyle.cardBorder || 'rgba(15,23,42,0.06)'" @input="updateCardStyle({ cardBorder: $event.target.value })" />
        </div>
        <div class="prop-group">
          <label class="prop-label">Sombra</label>
          <select class="form-select prop-input" :value="cardStyle.shadow || 'medium'" @change="updateCardStyle({ shadow: $event.target.value })">
            <option value="none">Sin sombra</option>
            <option value="light">Suave</option>
            <option value="medium">Media</option>
            <option value="strong">Fuerte</option>
          </select>
        </div>
        <div class="prop-group">
          <label class="prop-label">Estilo de etiqueta</label>
          <select class="form-select prop-input" :value="cardStyle.tagStyle || 'pill'" @change="updateCardStyle({ tagStyle: $event.target.value })">
            <option value="pill">Redondeada (pill)</option>
            <option value="square">Cuadrada</option>
          </select>
        </div>

        <div class="props-divider"></div>
        <h6 class="props-section-title">Colores de contenido</h6>

        <div class="prop-group">
          <label class="prop-label">Color de titulo</label>
          <div class="d-flex gap-2 align-items-center">
            <input type="color" class="form-control form-control-color prop-color" :value="cardStyle.titleColor || '#0f172a'" @input="updateCardStyle({ titleColor: $event.target.value })" />
            <input class="form-control prop-input flex-grow-1" :value="cardStyle.titleColor || '#0f172a'" @input="updateCardStyle({ titleColor: $event.target.value })" />
          </div>
        </div>
        <div class="prop-group">
          <label class="prop-label">Tamano de titulo</label>
          <select class="form-select prop-input" :value="cardStyle.titleSize || '1.05rem'" @change="updateCardStyle({ titleSize: $event.target.value })">
            <option value="0.9rem">Pequeno</option>
            <option value="1.05rem">Normal</option>
            <option value="1.25rem">Grande</option>
            <option value="1.5rem">Extra grande</option>
          </select>
        </div>
        <div class="prop-group">
          <label class="prop-label">Color de extracto</label>
          <div class="d-flex gap-2 align-items-center">
            <input type="color" class="form-control form-control-color prop-color" :value="cardStyle.excerptColor || '#475569'" @input="updateCardStyle({ excerptColor: $event.target.value })" />
            <input class="form-control prop-input flex-grow-1" :value="cardStyle.excerptColor || '#475569'" @input="updateCardStyle({ excerptColor: $event.target.value })" />
          </div>
        </div>
        <div class="prop-group">
          <label class="prop-label">Color de fecha</label>
          <div class="d-flex gap-2 align-items-center">
            <input type="color" class="form-control form-control-color prop-color" :value="cardStyle.dateColor || '#64748b'" @input="updateCardStyle({ dateColor: $event.target.value })" />
            <input class="form-control prop-input flex-grow-1" :value="cardStyle.dateColor || '#64748b'" @input="updateCardStyle({ dateColor: $event.target.value })" />
          </div>
        </div>
        <div class="prop-group">
          <label class="prop-label">Color de boton/enlace</label>
          <div class="d-flex gap-2 align-items-center">
            <input type="color" class="form-control form-control-color prop-color" :value="cardStyle.buttonColor || '#80ba49'" @input="updateCardStyle({ buttonColor: $event.target.value })" />
            <input class="form-control prop-input flex-grow-1" :value="cardStyle.buttonColor || '#80ba49'" @input="updateCardStyle({ buttonColor: $event.target.value })" />
          </div>
        </div>
      </template>

      <!-- POST SIDEBAR -->
      <template v-if="block.type === 'post-sidebar'">
        <h6 class="props-section-title">Secciones visibles</h6>
        <div class="prop-group">
          <div class="prop-checks">
            <label class="prop-check"><input type="checkbox" :checked="block.content.showSearch" @change="updateContent({ showSearch: $event.target.checked })" /> Buscador</label>
            <label class="prop-check"><input type="checkbox" :checked="block.content.showCategories" @change="updateContent({ showCategories: $event.target.checked })" /> Categorias</label>
            <label class="prop-check"><input type="checkbox" :checked="block.content.showRecentPosts" @change="updateContent({ showRecentPosts: $event.target.checked })" /> Posts recientes</label>
            <label class="prop-check"><input type="checkbox" :checked="block.content.showTags" @change="updateContent({ showTags: $event.target.checked })" /> Etiquetas</label>
          </div>
        </div>
        <div class="prop-group">
          <label class="prop-label">Limite de posts recientes</label>
          <input class="form-control prop-input" type="number" min="1" max="10" :value="block.content.recentPostsLimit || 5" @input="updateContent({ recentPostsLimit: Number($event.target.value) })" />
        </div>
        <div class="props-divider"></div>
        <h6 class="props-section-title">Tags personalizados</h6>
        <div class="prop-group">
          <label class="prop-label">Tags (separados por coma)</label>
          <input class="form-control prop-input" :value="(block.content.tags || []).join(', ')" @change="updateContent({ tags: $event.target.value.split(',').map(t => t.trim()).filter(Boolean) })" placeholder="Agua, Salud, Premium" />
          <small class="prop-hint">Vacio = usa los tags de los articulos</small>
        </div>
      </template>

      <!-- IMAGE GALLERY -->
      <template v-if="block.type === 'image-gallery'">
        <div class="prop-group">
          <label class="prop-label">Layout</label>
          <select class="form-select prop-input" :value="block.content.layout || 'grid'" @change="updateContent({ layout: $event.target.value })">
            <option value="grid">Grilla</option>
            <option value="masonry">Masonry</option>
          </select>
        </div>
        <div class="prop-group">
          <label class="prop-label">Columnas</label>
          <select class="form-select prop-input" :value="block.content.columns || 3" @change="updateContent({ columns: Number($event.target.value) })">
            <option value="2">2 columnas</option>
            <option value="3">3 columnas</option>
            <option value="4">4 columnas</option>
            <option value="5">5 columnas</option>
          </select>
        </div>
        <div class="prop-group">
          <label class="prop-label">Espacio entre imagenes</label>
          <select class="form-select prop-input" :value="block.content.gap || '12px'" @change="updateContent({ gap: $event.target.value })">
            <option value="4px">Minimo (4px)</option>
            <option value="8px">Pequeno (8px)</option>
            <option value="12px">Normal (12px)</option>
            <option value="16px">Medio (16px)</option>
            <option value="24px">Amplio (24px)</option>
          </select>
        </div>
        <div class="prop-group">
          <label class="prop-label">Proporcion de imagen</label>
          <select class="form-select prop-input" :value="block.content.aspectRatio || '1/1'" @change="updateContent({ aspectRatio: $event.target.value })">
            <option value="1/1">1:1 (Cuadrado)</option>
            <option value="16/10">16:10 (Panoramico)</option>
            <option value="16/9">16:9 (Widescreen)</option>
            <option value="4/3">4:3 (Clasico)</option>
            <option value="3/4">3:4 (Retrato)</option>
          </select>
        </div>
        <div class="props-divider"></div>
        <h6 class="props-section-title">Imagenes ({{ (block.content.images || []).length }})</h6>
        <div class="prop-group">
          <div class="prop-img-list">
            <div v-for="(img, i) in (block.content.images || [])" :key="i" class="prop-img-item">
              <img :src="img.src" class="prop-img-thumb" />
              <div class="prop-img-fields">
                <input class="form-control prop-input prop-input-sm" :value="img.src" @change="updateGalleryImage(i, 'src', $event.target.value)" placeholder="URL" />
                <input class="form-control prop-input prop-input-sm" :value="img.alt" @change="updateGalleryImage(i, 'alt', $event.target.value)" placeholder="Alt text" />
              </div>
              <button class="prop-img-remove" @click="removeGalleryImage(i)"><i class="fas fa-times"></i></button>
            </div>
          </div>
          <button class="btn btn-sm prop-add-btn mt-2" @click="addGalleryImage"><i class="fas fa-plus me-1"></i>Agregar imagen</button>
        </div>
      </template>

      <!-- POST TAGS -->
      <template v-if="block.type === 'post-tags'">
        <div class="prop-group">
          <label class="prop-label">Estilo</label>
          <select class="form-select prop-input" :value="block.content.style || 'pill'" @change="updateContent({ style: $event.target.value })">
            <option value="pill">Redondeado (pill)</option>
            <option value="square">Cuadrado</option>
          </select>
        </div>
        <div class="prop-group">
          <label class="prop-label">Alineacion</label>
          <div class="align-btns">
            <button v-for="a in ['left','center','right']" :key="a" class="align-btn" :class="{ active: block.content.align === a }" @click="updateContent({ align: a })">
              <i :class="`fas fa-align-${a}`"></i>
            </button>
          </div>
        </div>
        <div class="props-divider"></div>
        <h6 class="props-section-title">Etiquetas ({{ (block.content.tags || []).length }})</h6>
        <div class="prop-group">
          <label class="prop-label">Tags (separados por coma)</label>
          <input class="form-control prop-input" :value="(block.content.tags || []).join(', ')" @change="updateContent({ tags: $event.target.value.split(',').map(t => t.trim()).filter(Boolean) })" placeholder="Agua, Salud, Bienestar" />
        </div>
      </template>

      <!-- FRONT PAGE -->
      <template v-if="block.type === 'front-page'">
        <div class="prop-group">
          <label class="prop-label">Titulo</label>
          <input class="form-control prop-input" :value="block.content.title" @input="updateContent({ title: $event.target.value })" />
        </div>
        <div class="prop-group">
          <label class="prop-label">Imagen de fondo</label>
          <input class="form-control prop-input" :value="block.content.backgroundImage" @input="updateContent({ backgroundImage: $event.target.value })" placeholder="/img/images/..." />
        </div>
        <div class="prop-group">
          <label class="prop-label">Posicion de fondo</label>
          <select class="form-select prop-input" :value="block.content.backgroundPosition || 'center center'" @change="updateContent({ backgroundPosition: $event.target.value })">
            <option value="center center">Centro</option>
            <option value="center top">Superior</option>
            <option value="center bottom">Inferior</option>
            <option value="left center">Izquierda</option>
            <option value="right center">Derecha</option>
          </select>
        </div>
        <div class="prop-group">
          <label class="prop-label">Alineacion</label>
          <div class="align-btns">
            <button v-for="a in ['left','center','right']" :key="a" class="align-btn" :class="{ active: block.content.align === a }" @click="updateContent({ align: a })">
              <i :class="`fas fa-align-${a}`"></i>
            </button>
          </div>
        </div>
        <div class="prop-group">
          <div class="prop-checks">
            <label class="prop-check"><input type="checkbox" :checked="block.content.overlay" @change="updateContent({ overlay: $event.target.checked })" /> Overlay oscuro</label>
          </div>
        </div>

        <div class="props-divider"></div>
        <h6 class="props-section-title">Meta</h6>
        <div class="prop-group">
          <label class="prop-label">Autor</label>
          <input class="form-control prop-input" :value="block.content.author" @input="updateContent({ author: $event.target.value })" placeholder="Bambito Spring Water" />
        </div>

        <div class="props-divider"></div>
        <h6 class="props-section-title">Breadcrumbs</h6>
        <div class="prop-group">
          <div class="prop-bc-list">
            <div v-for="(bc, i) in (block.content.breadcrumbs || [])" :key="i" class="prop-bc-item">
              <input class="form-control prop-input prop-input-sm" :value="bc.label" @change="updateBreadcrumb(i, 'label', $event.target.value)" placeholder="Etiqueta" />
              <input class="form-control prop-input prop-input-sm" :value="bc.url || ''" @change="updateBreadcrumb(i, 'url', $event.target.value)" placeholder="URL (vacio = actual)" />
              <button class="prop-img-remove" @click="removeBreadcrumb(i)"><i class="fas fa-times"></i></button>
            </div>
          </div>
          <button class="btn btn-sm prop-add-btn mt-2" @click="addBreadcrumb"><i class="fas fa-plus me-1"></i>Agregar</button>
        </div>

        <div class="props-divider"></div>
        <h6 class="props-section-title">Tags del hero</h6>
        <div class="prop-group">
          <div class="prop-bc-list">
            <div v-for="(tag, i) in (block.content.tags || [])" :key="i" class="prop-bc-item">
              <input class="form-control prop-input prop-input-sm" :value="tag.text" @change="updateFpTag(i, 'text', $event.target.value)" placeholder="Texto" />
              <input type="color" class="form-control form-control-color prop-color-sm" :value="tag.color || '#80ba49'" @input="updateFpTag(i, 'color', $event.target.value)" />
              <button class="prop-img-remove" @click="removeFpTag(i)"><i class="fas fa-times"></i></button>
            </div>
          </div>
          <button class="btn btn-sm prop-add-btn mt-2" @click="addFpTag"><i class="fas fa-plus me-1"></i>Agregar tag</button>
        </div>
      </template>

      <!-- COMMON STYLES -->
      <div class="props-divider"></div>
      <h6 class="props-section-title">Estilos</h6>

      <div class="prop-group">
        <label class="prop-label">Color de texto</label>
        <div class="d-flex gap-2 align-items-center">
          <input type="color" class="form-control form-control-color prop-color" :value="block.styles?.color || '#1f2937'" @input="updateStyles({ color: $event.target.value })" />
          <input class="form-control prop-input flex-grow-1" :value="block.styles?.color || ''" @input="updateStyles({ color: $event.target.value })" placeholder="#1f2937" />
        </div>
      </div>

      <div class="prop-group">
        <label class="prop-label">Fondo</label>
        <div class="d-flex gap-2 align-items-center">
          <input type="color" class="form-control form-control-color prop-color" :value="block.styles?.backgroundColor || '#ffffff'" @input="updateStyles({ backgroundColor: $event.target.value })" />
          <input class="form-control prop-input flex-grow-1" :value="block.styles?.backgroundColor || ''" @input="updateStyles({ backgroundColor: $event.target.value })" />
        </div>
      </div>

      <div class="prop-group">
        <label class="prop-label">Tamano de fuente</label>
        <input class="form-control prop-input" :value="block.styles?.fontSize || ''" @input="updateStyles({ fontSize: $event.target.value })" placeholder="16px" />
      </div>

      <div class="prop-group">
        <label class="prop-label">Alineacion</label>
        <div class="align-btns">
          <button v-for="a in ['left','center','right']" :key="a" class="align-btn" :class="{ active: block.styles?.textAlign === a }" @click="updateStyles({ textAlign: a })">
            <i :class="`fas fa-align-${a}`"></i>
          </button>
        </div>
      </div>

      <div class="prop-row">
        <div class="prop-group flex-fill">
          <label class="prop-label">Margen sup.</label>
          <input class="form-control prop-input" :value="block.styles?.marginTop || ''" @input="updateStyles({ marginTop: $event.target.value })" placeholder="0px" />
        </div>
        <div class="prop-group flex-fill">
          <label class="prop-label">Margen inf.</label>
          <input class="form-control prop-input" :value="block.styles?.marginBottom || ''" @input="updateStyles({ marginBottom: $event.target.value })" placeholder="16px" />
        </div>
      </div>

      <div class="prop-row">
        <div class="prop-group flex-fill">
          <label class="prop-label">Padding</label>
          <input class="form-control prop-input" :value="block.styles?.padding || ''" @input="updateStyles({ padding: $event.target.value })" placeholder="0px" />
        </div>
        <div class="prop-group flex-fill">
          <label class="prop-label">Border radius</label>
          <input class="form-control prop-input" :value="block.styles?.borderRadius || ''" @input="updateStyles({ borderRadius: $event.target.value })" placeholder="0px" />
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { usePageBuilderStore } from '@/stores/pageBuilder.js'

const store = usePageBuilderStore()

const block = computed(() => store.selectedBlock)

const typeInfo = computed(() => {
  if (!block.value) return { label: '', icon: '' }
  return store.blockTypes[block.value.type] || { label: block.value.type, icon: 'fas fa-cube' }
})

function updateContent(data) {
  if (block.value) store.updateBlockContent(block.value.id, data)
}
function updateStyles(data) {
  if (block.value) store.updateBlockStyles(block.value.id, data)
}

const cardStyle = computed(() => {
  if (!block.value || block.value.type !== 'article-list') return {}
  return block.value.content?.cardStyle || {}
})

function updateCardStyle(data) {
  if (!block.value) return
  const current = block.value.content?.cardStyle || {}
  store.updateBlockContent(block.value.id, {
    cardStyle: { ...current, ...data }
  })
}

// --- Image Gallery helpers ---
function updateGalleryImage(index, field, value) {
  if (!block.value) return
  const images = JSON.parse(JSON.stringify(block.value.content?.images || []))
  if (images[index]) {
    images[index][field] = value
    store.updateBlockContent(block.value.id, { images })
  }
}
function removeGalleryImage(index) {
  if (!block.value) return
  const images = [...(block.value.content?.images || [])]
  images.splice(index, 1)
  store.updateBlockContent(block.value.id, { images })
}
function addGalleryImage() {
  if (!block.value) return
  const images = [...(block.value.content?.images || []), { src: '', alt: '' }]
  store.updateBlockContent(block.value.id, { images })
}

// --- Front Page breadcrumb helpers ---
function updateBreadcrumb(index, field, value) {
  if (!block.value) return
  const bcs = JSON.parse(JSON.stringify(block.value.content?.breadcrumbs || []))
  if (bcs[index]) {
    bcs[index][field] = value
    store.updateBlockContent(block.value.id, { breadcrumbs: bcs })
  }
}
function removeBreadcrumb(index) {
  if (!block.value) return
  const bcs = [...(block.value.content?.breadcrumbs || [])]
  bcs.splice(index, 1)
  store.updateBlockContent(block.value.id, { breadcrumbs: bcs })
}
function addBreadcrumb() {
  if (!block.value) return
  const bcs = [...(block.value.content?.breadcrumbs || []), { label: 'Nuevo', url: '' }]
  store.updateBlockContent(block.value.id, { breadcrumbs: bcs })
}

// --- Front Page tag helpers ---
function updateFpTag(index, field, value) {
  if (!block.value) return
  const tags = JSON.parse(JSON.stringify(block.value.content?.tags || []))
  if (tags[index]) {
    tags[index][field] = value
    store.updateBlockContent(block.value.id, { tags })
  }
}
function removeFpTag(index) {
  if (!block.value) return
  const tags = [...(block.value.content?.tags || [])]
  tags.splice(index, 1)
  store.updateBlockContent(block.value.id, { tags })
}
function addFpTag() {
  if (!block.value) return
  const tags = [...(block.value.content?.tags || []), { text: 'Nuevo', color: '#80ba49' }]
  store.updateBlockContent(block.value.id, { tags })
}
</script>

<style scoped>
.block-properties {
  width: 320px;
  min-width: 280px;
  background: rgba(255,255,255,0.80);
  backdrop-filter: blur(20px);
  border-left: 1px solid rgba(63,100,88,0.08);
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
}
.props-header {
  padding: 14px 16px;
  border-bottom: 1px solid rgba(63,100,88,0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.props-title {
  margin: 0;
  font-weight: 800;
  font-size: 0.85rem;
  color: #3f6458;
}
.btn-close-props {
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 8px;
  background: rgba(63,100,88,0.06);
  color: #64748b;
  font-size: 0.75rem;
  display: grid;
  place-items: center;
  cursor: pointer;
}
.props-body {
  flex: 1;
  padding: 14px 16px;
  overflow-y: auto;
}
.prop-group {
  margin-bottom: 12px;
}
.prop-label {
  display: block;
  font-size: 0.75rem;
  font-weight: 700;
  color: #475569;
  margin-bottom: 4px;
  letter-spacing: 0.02em;
}
.prop-input {
  font-size: 0.85rem;
  border-radius: 10px;
  border: 1px solid rgba(63,100,88,0.12);
  padding: 8px 12px;
}
.prop-input:focus {
  border-color: #80ba49;
  box-shadow: 0 0 0 3px rgba(128,186,73,0.12);
}
.prop-color {
  width: 36px;
  height: 36px;
  padding: 2px;
  border-radius: 10px;
  flex-shrink: 0;
}
.props-divider {
  height: 1px;
  background: rgba(63,100,88,0.08);
  margin: 16px 0;
}
.props-section-title {
  font-size: 0.78rem;
  font-weight: 800;
  color: #3f6458;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-bottom: 12px;
}
.align-btns {
  display: flex;
  gap: 4px;
}
.align-btn {
  width: 36px;
  height: 36px;
  border: 1px solid rgba(63,100,88,0.12);
  border-radius: 10px;
  background: #fff;
  color: #64748b;
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: all 0.15s;
}
.align-btn.active, .align-btn:hover {
  background: rgba(128,186,73,0.12);
  color: #3f6458;
  border-color: #80ba49;
}
.prop-row {
  display: flex;
  gap: 8px;
}
.prop-checks {
  display: grid;
  gap: 6px;
}
.prop-check {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.82rem;
  color: #334155;
  cursor: pointer;
}
.prop-check input {
  accent-color: #80ba49;
}
.prop-hint {
  display: block;
  font-size: 0.7rem;
  color: #94a3b8;
  margin-top: 3px;
}
.prop-img-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.prop-img-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px;
  background: #f8fafc;
  border-radius: 10px;
  border: 1px solid rgba(63,100,88,0.06);
}
.prop-img-thumb {
  width: 38px;
  height: 38px;
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0;
  background: #e2e8f0;
}
.prop-img-fields {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}
.prop-input-sm {
  font-size: 0.78rem !important;
  padding: 4px 8px !important;
}
.prop-img-remove {
  width: 24px;
  height: 24px;
  border: none;
  border-radius: 6px;
  background: rgba(239,68,68,0.08);
  color: #ef4444;
  font-size: 0.6rem;
  display: grid;
  place-items: center;
  cursor: pointer;
  flex-shrink: 0;
}
.prop-img-remove:hover { background: rgba(239,68,68,0.18); }
.prop-add-btn {
  width: 100%;
  border-radius: 10px;
  background: rgba(128,186,73,0.10);
  color: #3f6458;
  font-weight: 700;
  font-size: 0.78rem;
  border: 1px dashed rgba(128,186,73,0.3);
  padding: 8px;
}
.prop-add-btn:hover { background: rgba(128,186,73,0.18); }
.prop-bc-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.prop-bc-item {
  display: flex;
  align-items: center;
  gap: 6px;
}
.prop-color-sm {
  width: 30px;
  height: 30px;
  padding: 1px;
  border-radius: 8px;
  flex-shrink: 0;
}
</style>

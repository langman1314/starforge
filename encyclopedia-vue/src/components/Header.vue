<template>
  <header class="app-header">
    <div class="breadcrumb">
      <router-link to="/">首页</router-link>
      <template v-if="breadcrumbs.length">
        <span class="sep">/</span>
        <router-link
          v-for="(b, i) in breadcrumbs"
          :key="b.path"
          :to="b.path"
          :class="{ current: i === breadcrumbs.length - 1 }"
        >
          {{ b.label }}
        </router-link>
      </template>
    </div>
    <div class="header-stats">
      <span class="stat">{{ store.entries.length }} 条目</span>
      <span class="stat">{{ store.categories.length }} 分类</span>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useEncyclopediaStore } from '@/stores/encyclopedia'

const route = useRoute()
const store = useEncyclopediaStore()

const breadcrumbs = computed(() => {
  const result = []
  const catId = route.params.id
  const entryId = route.params.id

  if (route.name === 'category' && catId) {
    const cat = store.categoryMap[catId]
    if (cat) result.push({ path: `/category/${catId}`, label: cat.name })
  } else if (route.name === 'entry' && entryId) {
    const entry = store.getEntryById(entryId)
    if (entry) {
      const catId = store.getCategoryId(entry)
      const cat = store.categoryMap[catId]
      if (cat) result.push({ path: `/category/${catId}`, label: cat.name })
      result.push({ path: `/entry/${entryId}`, label: entry.name, current: true })
    }
  } else if (route.name === 'search') {
    result.push({ path: route.path, label: `搜索: ${route.query.q || ''}`, current: true })
  }
  return result
})
</script>

<style scoped>
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--header-height);
  padding: 0 32px;
  border-bottom: 1px solid var(--border-color);
  background: var(--bg-primary);
  flex-shrink: 0;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;
}

.breadcrumb a {
  color: var(--text-secondary);
  transition: color 0.2s;
}

.breadcrumb a:hover {
  color: var(--accent-cyan);
}

.breadcrumb a.current {
  color: var(--text-primary);
  cursor: default;
  pointer-events: none;
}

.sep {
  color: var(--text-muted);
  font-size: 0.8rem;
}

.header-stats {
  display: flex;
  gap: 16px;
}

.stat {
  font-size: 0.75rem;
  font-family: var(--font-mono);
  color: var(--text-muted);
}
</style>
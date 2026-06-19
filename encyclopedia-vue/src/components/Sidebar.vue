<template>
  <aside class="sidebar">
    <div class="sidebar-header" @click="$router.push('/')">
      <div class="logo-icon">✦</div>
      <div class="logo-text">
        <span class="logo-title">星铸百科</span>
        <span class="logo-subtitle">Starforge Encyclopedia</span>
      </div>
    </div>

    <div class="search-box">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="搜索条目名称、编号、关键词..."
        @keyup.enter="doSearch"
      />
    </div>

    <nav class="sidebar-nav">
      <div
        v-for="cat in categories"
        :key="cat.id"
        class="nav-item"
        :class="{ active: currentCategory === cat.id }"
        @click="$router.push(`/category/${cat.id}`)"
      >
        <span class="nav-icon">{{ cat.icon }}</span>
        <span class="nav-label">{{ cat.name }}</span>
        <span class="nav-count">{{ counts[cat.id] || 0 }}</span>
      </div>
    </nav>

    <div class="sidebar-footer">
      <div class="footer-info">v1.0 · 百科工程规范</div>
    </div>
  </aside>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useEncyclopediaStore } from '@/stores/encyclopedia'

const route = useRoute()
const store = useEncyclopediaStore()

const searchQuery = ref('')
const currentCategory = computed(() => route.params.id || '')

const categories = computed(() => store.categories)

const counts = computed(() => {
  const result = {}
  for (const cat of categories.value) {
    result[cat.id] = store.getEntriesByCategory(cat.id).length
  }
  return result
})

function doSearch() {
  if (searchQuery.value.trim()) {
    const q = encodeURIComponent(searchQuery.value.trim())
    window.location.hash = `#/search?q=${q}`
  }
}

onMounted(() => {
  store.loadData()
})
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: var(--sidebar-width);
  height: 100vh;
  background: var(--bg-secondary);
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  z-index: 100;
  overflow: hidden;
}

.sidebar-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  border-bottom: 1px solid var(--border-color);
  cursor: pointer;
  transition: background 0.2s;
  user-select: none;
}

.sidebar-header:hover {
  background: var(--bg-hover);
}

.logo-icon {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #00e5ff22, #4488ff22);
  border: 1px solid var(--accent-cyan);
  border-radius: var(--radius-md);
  color: var(--accent-cyan);
  font-size: 1.2rem;
}

.logo-text {
  display: flex;
  flex-direction: column;
}

.logo-title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: 1px;
}

.logo-subtitle {
  font-size: 0.65rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.search-box {
  padding: 12px 16px;
}

.search-box input {
  width: 100%;
  padding: 8px 12px;
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  font-size: 0.85rem;
  outline: none;
  transition: border-color 0.2s;
}

.search-box input::placeholder {
  color: var(--text-muted);
}

.search-box input:focus {
  border-color: var(--accent-cyan);
  box-shadow: 0 0 8px #00e5ff22;
}

.sidebar-nav {
  flex: 1;
  overflow-y: auto;
  padding: 8px 0;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 8px 20px;
  cursor: pointer;
  transition: all 0.15s;
  border-left: 3px solid transparent;
  gap: 10px;
}

.nav-item:hover {
  background: var(--bg-hover);
}

.nav-item.active {
  background: #00e5ff0a;
  border-left-color: var(--accent-cyan);
}

.nav-icon {
  font-size: 1rem;
  width: 24px;
  text-align: center;
  flex-shrink: 0;
}

.nav-label {
  flex: 1;
  font-size: 0.85rem;
  color: var(--text-secondary);
  transition: color 0.2s;
}

.nav-item:hover .nav-label,
.nav-item.active .nav-label {
  color: var(--text-primary);
}

.nav-count {
  font-size: 0.7rem;
  font-family: var(--font-mono);
  color: var(--text-muted);
  padding: 1px 6px;
  background: var(--bg-tertiary);
  border-radius: 10px;
}

.sidebar-footer {
  padding: 12px 20px;
  border-top: 1px solid var(--border-color);
}

.footer-info {
  font-size: 0.7rem;
  color: var(--text-muted);
  text-align: center;
}
</style>
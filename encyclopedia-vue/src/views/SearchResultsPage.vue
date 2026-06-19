<template>
  <div class="search-page">
    <div class="search-header">
      <h1>搜索结果</h1>
      <p v-if="store.loading">搜索中...</p>
      <p v-else-if="query">
        查询 "<strong>{{ query }}</strong>" —— 找到 {{ results.length }} 个条目
      </p>
      <p v-else class="empty-hint">请输入搜索关键词。</p>
    </div>

    <div v-if="results.length > 0" class="search-results">
      <EntryCard v-for="entry in results" :key="entry.id" :entry="entry" />
    </div>

    <div v-else-if="query && !store.loading" class="no-results">
      <p>未找到匹配条目。试试其他关键词？</p>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useEncyclopediaStore } from '@/stores/encyclopedia'
import EntryCard from '@/components/EntryCard.vue'

const route = useRoute()
const store = useEncyclopediaStore()

const query = computed(() => route.query.q || '')

const results = computed(() => {
  if (!query.value) return []
  return store.searchEntries(query.value)
})

onMounted(() => {
  store.loadData()
})
</script>

<style scoped>
.search-page {
  max-width: 800px;
}

.search-header {
  padding-bottom: 24px;
  border-bottom: 1px solid var(--border-color);
  margin-bottom: 24px;
}

.search-header h1 {
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 8px;
}

.search-header p {
  font-size: 0.85rem;
  color: var(--text-secondary);
}

.search-header strong {
  color: var(--accent-cyan);
  font-family: var(--font-mono);
}

.empty-hint {
  color: var(--text-muted) !important;
}

.search-results {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
}

.no-results {
  text-align: center;
  padding: 48px;
  color: var(--text-muted);
}
</style>
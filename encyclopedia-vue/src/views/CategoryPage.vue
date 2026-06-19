<template>
  <div class="category-page">
    <div class="category-header">
      <span class="cat-icon">{{ category.icon }}</span>
      <div class="cat-info">
        <h1>{{ category.name }}</h1>
        <p class="cat-desc">{{ category.desc }}</p>
        <p class="cat-count">{{ entries.length }} 条目</p>
      </div>
    </div>

    <div v-if="store.loading" class="loading">加载中...</div>

    <div v-else-if="entries.length === 0" class="empty">
      该分类暂无条目。
    </div>

    <div v-else class="entry-grid">
      <EntryCard
        v-for="entry in entries"
        :key="entry.id"
        :entry="entry"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useEncyclopediaStore } from '@/stores/encyclopedia'
import EntryCard from '@/components/EntryCard.vue'

const props = defineProps({ id: String })
const store = useEncyclopediaStore()

const category = computed(() => {
  return store.categoryMap[props.id] || { id: props.id, name: props.id, icon: '📁', desc: '' }
})

const entries = computed(() => {
  return store.getEntriesByCategory(props.id)
})

onMounted(() => {
  store.loadData()
})
</script>

<style scoped>
.category-header {
  display: flex;
  align-items: center;
  gap: 16px;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--border-color);
  margin-bottom: 24px;
}

.cat-icon {
  font-size: 2.5rem;
}

.cat-info h1 {
  font-size: 1.6rem;
  font-weight: 700;
}

.cat-desc {
  font-size: 0.85rem;
  color: var(--text-secondary);
  margin-top: 4px;
}

.cat-count {
  font-size: 0.75rem;
  font-family: var(--font-mono);
  color: var(--text-muted);
  margin-top: 4px;
}

.entry-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
}

.loading, .empty {
  text-align: center;
  padding: 48px;
  color: var(--text-muted);
  font-size: 0.9rem;
}
</style>

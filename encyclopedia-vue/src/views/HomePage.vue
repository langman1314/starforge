<template>
  <div class="home-page">
    <div class="hero">
      <div class="hero-icon">✦</div>
      <h1 class="hero-title">星铸百科</h1>
      <p class="hero-subtitle">《全民穿越：别人造木屋，我修歼星舰》世界观数据库</p>
      <p class="hero-desc">
        一部关于文明重置、旧日遗产、万族考场和人类第七次自救的百科全书。
      </p>
    </div>

    <div class="quick-categories">
      <div
        v-for="cat in store.categories"
        :key="cat.id"
        class="cat-card"
        @click="$router.push(`/category/${cat.id}`)"
      >
        <span class="cat-icon">{{ cat.icon }}</span>
        <span class="cat-name">{{ cat.name }}</span>
        <span class="cat-desc">{{ cat.desc }}</span>
        <span class="cat-count">{{ store.getEntriesByCategory(cat.id).length }} 条目</span>
      </div>
    </div>

    <div class="stats-bar">
      <div class="stat-card">
        <span class="stat-number">{{ store.entries.length }}</span>
        <span class="stat-label">总条目</span>
      </div>
      <div class="stat-card">
        <span class="stat-number">{{ store.categories.length }}</span>
        <span class="stat-label">分类</span>
      </div>
      <div class="stat-card">
        <span class="stat-number s-entries">{{ sCount }}</span>
        <span class="stat-label">S级核心设定</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useEncyclopediaStore } from '@/stores/encyclopedia'

const store = useEncyclopediaStore()

const sCount = computed(() => {
  return store.entries.filter(e => e.importance === 'S').length
})

onMounted(() => {
  store.loadData()
})
</script>

<style scoped>
.home-page {
  max-width: 1000px;
}

.hero {
  text-align: center;
  padding: 48px 0 32px;
}

.hero-icon {
  font-size: 3rem;
  margin-bottom: 16px;
  color: var(--accent-cyan);
}

.hero-title {
  font-size: 2.2rem;
  font-weight: 800;
  background: linear-gradient(135deg, #00e5ff, #4488ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: 2px;
}

.hero-subtitle {
  margin-top: 8px;
  font-size: 1rem;
  color: var(--text-secondary);
}

.hero-desc {
  margin-top: 6px;
  font-size: 0.85rem;
  color: var(--text-muted);
}

.quick-categories {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 12px;
  margin-top: 32px;
}

.cat-card {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 16px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.2s;
}

.cat-card:hover {
  border-color: var(--accent-cyan);
  box-shadow: var(--shadow-glow);
  transform: translateY(-2px);
}

.cat-icon {
  font-size: 1.4rem;
}

.cat-name {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-primary);
}

.cat-desc {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.cat-count {
  font-size: 0.7rem;
  font-family: var(--font-mono);
  color: var(--accent-cyan);
  margin-top: 4px;
}

.stats-bar {
  display: flex;
  gap: 16px;
  margin-top: 32px;
}

.stat-card {
  flex: 1;
  text-align: center;
  padding: 16px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
}

.stat-number {
  display: block;
  font-size: 1.6rem;
  font-weight: 700;
  font-family: var(--font-mono);
  color: var(--accent-cyan);
}

.stat-number.s-entries {
  color: var(--accent-red);
}

.stat-label {
  font-size: 0.75rem;
  color: var(--text-muted);
  margin-top: 4px;
}
</style>
<template>
  <div class="entry-card" @click="$router.push(`/entry/${entry.id}`)">
    <div class="card-header">
      <span class="entry-id">{{ entry.id }}</span>
      <span v-if="entry.importance" :class="`tag tag-${entry.importance.toLowerCase()}`">
        {{ entry.importance }}
      </span>
      <span v-if="entry.spoilerLevel && entry.spoilerLevel !== 'none'" class="spoiler-tag">
        剧透
      </span>
    </div>
    <h3 class="entry-name">{{ entry.name }}</h3>
    <p class="entry-summary">{{ entry.summary }}</p>
    <div class="card-footer">
      <span v-if="entry.status" class="status-badge" :class="getStatusClass(entry.status)">
        {{ entry.status }}
      </span>
      <span v-if="entry.firstAppearance" class="first-app">
        首次: {{ entry.firstAppearance }}
      </span>
    </div>
  </div>
</template>

<script setup>
defineProps({ entry: { type: Object, required: true } })

function getStatusClass(status) {
  const s = (status || '').toLowerCase()
  if (s.includes('锁定') || s.includes('已完成') || s.includes('完全回收')) return 'status-done'
  if (s.includes('已登场') || s.includes('发展中') || s.includes('已埋设')) return 'status-active'
  if (s.includes('草案') || s.includes('待补充') || s.includes('未登场')) return 'status-pending'
  if (s.includes('已死亡') || s.includes('已毁灭') || s.includes('废弃')) return 'status-dead'
  if (s.includes('隐藏') || s.includes('真相未揭露')) return 'status-hidden'
  return 'status-pending'
}
</script>

<style scoped>
.entry-card {
  padding: 16px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.2s;
}

.entry-card:hover {
  border-color: var(--accent-cyan);
  box-shadow: var(--shadow-glow);
  transform: translateY(-2px);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.entry-id {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--text-muted);
}

.spoiler-tag {
  font-size: 0.65rem;
  padding: 1px 6px;
  background: #ff446622;
  color: var(--accent-red);
  border-radius: var(--radius-sm);
  font-family: var(--font-mono);
}

.entry-name {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 6px;
  line-height: 1.4;
}

.entry-summary {
  font-size: 0.8rem;
  color: var(--text-secondary);
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-footer {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
}

.status-badge {
  font-size: 0.65rem;
  padding: 1px 8px;
  border-radius: 10px;
  font-family: var(--font-mono);
}

.status-done {
  background: #44dd8822;
  color: var(--accent-green);
  border: 1px solid #44dd8844;
}

.status-active {
  background: #00e5ff22;
  color: var(--accent-cyan);
  border: 1px solid #00e5ff44;
}

.status-pending {
  background: #55668822;
  color: var(--text-muted);
  border: 1px solid #55668844;
}

.status-dead {
  background: #ff446622;
  color: var(--accent-red);
  border: 1px solid #ff446644;
}

.status-hidden {
  background: #aa66ff22;
  color: var(--accent-purple);
  border: 1px solid #aa66ff44;
}

.first-app {
  font-size: 0.65rem;
  color: var(--text-muted);
  font-family: var(--font-mono);
}
</style>"
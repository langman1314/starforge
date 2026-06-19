<template>
  <div v-if="!entry" class="not-found">
    <h2>条目未找到</h2>
    <p>编号 {{ id }} 对应的百科条目不存在。</p>
    <router-link to="/">返回首页</router-link>
  </div>

  <div v-else class="entry-detail">
    <div class="detail-header">
      <div class="id-row">
        <span class="entry-id">{{ entry.id }}</span>
        <span v-if="entry.importance" :class="`tag tag-${entry.importance.toLowerCase()}`">
          {{ entry.importance }}级
        </span>
        <span v-if="entry.spoilerLevel && entry.spoilerLevel !== 'none'" class="spoiler-warning">
          ⚠️ 剧透：{{ spoilerLabel }}
        </span>
      </div>
      <h1 class="entry-title">{{ entry.name }}</h1>
      <div class="meta-row">
        <span v-if="entry.status" class="meta-item">
          <span class="meta-label">状态</span>
          <span class="meta-value">{{ entry.status }}</span>
        </span>
        <span v-if="entry.firstAppearance" class="meta-item">
          <span class="meta-label">首次出现</span>
          <span class="meta-value">{{ entry.firstAppearance }}</span>
        </span>
        <span v-if="entry.aliases && entry.aliases.length" class="meta-item">
          <span class="meta-label">别名</span>
          <span class="meta-value">{{ entry.aliases.join('、') }}</span>
        </span>
      </div>
    </div>

    <div class="detail-body">
      <section class="section summary-section">
        <h2>一句话概括</h2>
        <p class="summary-text">{{ entry.summary }}</p>
      </section>

      <section v-if="entry.detail" class="section">
        <h2>详细设定</h2>
        <div class="detail-text">{{ entry.detail }}</div>
      </section>

      <section class="section relations-section">
        <h2>关联信息</h2>
        <div class="relations-grid">
          <div v-if="entry.relatedCharacters && entry.relatedCharacters.length" class="rel-group">
            <h3>相关人物</h3>
            <div class="rel-tags">
              <router-link
                v-for="rel in entry.relatedCharacters"
                :key="rel"
                :to="`/entry/${rel}`"
                class="rel-link"
              >
                {{ rel }}
              </router-link>
            </div>
          </div>

          <div v-if="entry.relatedFactions && entry.relatedFactions.length" class="rel-group">
            <h3>相关势力</h3>
            <div class="rel-tags">
              <router-link
                v-for="rel in entry.relatedFactions"
                :key="rel"
                :to="`/entry/${rel}`"
                class="rel-link"
              >
                {{ rel }}
              </router-link>
            </div>
          </div>

          <div v-if="entry.relatedLocations && entry.relatedLocations.length" class="rel-group">
            <h3>相关地点</h3>
            <div class="rel-tags">
              <router-link
                v-for="rel in entry.relatedLocations"
                :key="rel"
                :to="`/entry/${rel}`"
                class="rel-link"
              >
                {{ rel }}
              </router-link>
            </div>
          </div>

          <div v-if="entry.relatedEvents && entry.relatedEvents.length" class="rel-group">
            <h3>相关事件</h3>
            <div class="rel-tags">
              <router-link
                v-for="rel in entry.relatedEvents"
                :key="rel"
                :to="`/entry/${rel}`"
                class="rel-link"
              >
                {{ rel }}
              </router-link>
            </div>
          </div>

          <div v-if="entry.relatedItems && entry.relatedItems.length" class="rel-group">
            <h3>相关道具</h3>
            <div class="rel-tags">
              <router-link
                v-for="rel in entry.relatedItems"
                :key="rel"
                :to="`/entry/${rel}`"
                class="rel-link"
              >
                {{ rel }}
              </router-link>
            </div>
          </div>
        </div>
      </section>

      <section v-if="entry.notes" class="section notes-section">
        <h2>创作备注</h2>
        <p class="notes-text">{{ entry.notes }}</p>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useEncyclopediaStore } from '@/stores/encyclopedia'

const props = defineProps({ id: String })
const store = useEncyclopediaStore()

const entry = computed(() => store.getEntryById(props.id))

const spoilerLabel = computed(() => {
  const map = { minor: '轻微', major: '重大', final: '终局' }
  return map[entry.value?.spoilerLevel] || '未知'
})
</script>

<style scoped>
.entry-detail {
  max-width: 800px;
}

.not-found {
  text-align: center;
  padding: 64px 0;
}

.not-found h2 {
  font-size: 1.4rem;
  margin-bottom: 8px;
}

.not-found p {
  color: var(--text-muted);
  margin-bottom: 16px;
}

.detail-header {
  padding-bottom: 24px;
  border-bottom: 1px solid var(--border-color);
  margin-bottom: 24px;
}

.id-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.entry-id {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--text-muted);
}

.spoiler-warning {
  font-size: 0.75rem;
  color: var(--accent-red);
  font-weight: 500;
}

.entry-title {
  font-size: 1.8rem;
  font-weight: 800;
  line-height: 1.3;
  margin-bottom: 12px;
}

.meta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.meta-label {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.meta-value {
  font-size: 0.8rem;
  color: var(--text-secondary);
  font-family: var(--font-mono);
}

.detail-body {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.section h2 {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 12px;
  padding-left: 12px;
  border-left: 3px solid var(--accent-cyan);
}

.summary-text {
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--text-primary);
  padding: 12px 16px;
  background: #00e5ff08;
  border: 1px solid #00e5ff22;
  border-radius: var(--radius-md);
}

.detail-text {
  font-size: 0.9rem;
  line-height: 1.7;
  color: var(--text-secondary);
  white-space: pre-wrap;
}

.relations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}

.rel-group h3 {
  font-size: 0.8rem;
  color: var(--text-muted);
  margin-bottom: 8px;
  font-weight: 500;
}

.rel-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.rel-link {
  display: inline-block;
  padding: 3px 10px;
  font-size: 0.78rem;
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  color: var(--accent-cyan);
  transition: all 0.2s;
}

.rel-link:hover {
  border-color: var(--accent-cyan);
  background: #00e5ff11;
}

.notes-text {
  font-size: 0.85rem;
  color: var(--text-muted);
  font-style: italic;
  padding: 12px 16px;
  background: var(--bg-tertiary);
  border-radius: var(--radius-md);
}
</style>
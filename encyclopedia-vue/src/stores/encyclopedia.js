import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useEncyclopediaStore = defineStore('encyclopedia', () => {
  const entries = ref([])
  const loaded = ref(false)
  const loading = ref(false)

  const categoryMap = {
    world: { id: 'world', name: '世界总览', icon: '🌍', desc: '世界观、宇宙规则、历史真相' },
    rules: { id: 'rules', name: '宇宙规则', icon: '⚖️', desc: '万族考场规则、文明机制' },
    systems: { id: 'systems', name: '系统能力', icon: '⚙️', desc: '文明回收系统、天赋、权限' },
    history: { id: 'history', name: '历史真相', icon: '📜', desc: '前六轮人类文明、旧日遗产' },
    characters: { id: 'characters', name: '人物', icon: '👤', desc: '主角、配角、反派、AI' },
    factions: { id: 'factions', name: '势力', icon: '🏴', desc: '人类势力、异族、旧日势力' },
    locations: { id: 'locations', name: '地图区域', icon: '🗺️', desc: '区域、遗迹、战场、禁区' },
    tech: { id: 'tech', name: '科技树', icon: '🔧', desc: '科技、装备、星舰模块' },
    creatures: { id: 'creatures', name: '怪物异族', icon: '👾', desc: '怪物、异族、BOSS' },
    resources: { id: 'resources', name: '资源道具', icon: '💎', desc: '资源、道具、战略物资' },
    disasters: { id: 'disasters', name: '灾难事件', icon: '🌪️', desc: '灾难、事件、倒计时' },
    plot: { id: 'plot', name: '剧情大纲', icon: '📖', desc: '分卷剧情、伏笔管理' },
    foreshadowing: { id: 'foreshadowing', name: '伏笔系统', icon: '🔍', desc: '伏笔追踪、回收计划' },
    writing: { id: 'writing', name: '创作规范', icon: '✍️', desc: '爽点库、禁止清单、风格规范' },
  }

  const categories = computed(() => {
    return Object.values(categoryMap)
  })

  function getCategoryId(entry) {
    const id = entry.id || ''
    if (id.startsWith('WR-')) return 'rules'
    if (id.startsWith('SYS-')) return 'systems'
    if (id.startsWith('HIS-')) return 'history'
    if (id.startsWith('CHR-')) return 'characters'
    if (id.startsWith('FAC-')) return 'factions'
    if (id.startsWith('LOC-')) return 'locations'
    if (id.startsWith('TEC-')) return 'tech'
    if (id.startsWith('RES-')) return 'resources'
    if (id.startsWith('DIS-')) return 'disasters'
    if (id.startsWith('FO-')) return 'foreshadowing'
    if (entry.category) {
      const cat = entry.category.toLowerCase()
      if (cat.includes('世界') || cat.includes('总览')) return 'world'
      if (cat.includes('规则') || cat.includes('宇宙')) return 'rules'
      if (cat.includes('系统') || cat.includes('能力') || cat.includes('天赋')) return 'systems'
      if (cat.includes('历史') || cat.includes('真相')) return 'history'
      if (cat.includes('人物')) return 'characters'
      if (cat.includes('势力')) return 'factions'
      if (cat.includes('地点') || cat.includes('区域') || cat.includes('地图')) return 'locations'
      if (cat.includes('科技') || cat.includes('装备') || cat.includes('武器')) return 'tech'
      if (cat.includes('怪物') || cat.includes('异族')) return 'creatures'
      if (cat.includes('资源') || cat.includes('道具')) return 'resources'
      if (cat.includes('灾难')) return 'disasters'
      if (cat.includes('剧情') || cat.includes('大纲')) return 'plot'
      if (cat.includes('伏笔')) return 'foreshadowing'
      if (cat.includes('创作') || cat.includes('爽点') || cat.includes('禁止')) return 'writing'
    }
    return 'world'
  }

  function getEntriesByCategory(categoryId) {
    return entries.value.filter(e => getCategoryId(e) === categoryId)
  }

  function getEntryById(id) {
    return entries.value.find(e => e.id === id) || null
  }

  function searchEntries(query) {
    if (!query || query.trim() === '') return []
    const q = query.trim().toLowerCase()
    return entries.value.filter(e => {
      return (
        (e.id && e.id.toLowerCase().includes(q)) ||
        (e.name && e.name.toLowerCase().includes(q)) ||
        (e.aliases && e.aliases.some(a => a.toLowerCase().includes(q))) ||
        (e.summary && e.summary.toLowerCase().includes(q)) ||
        (e.detail && e.detail.toLowerCase().includes(q))
      )
    })
  }

  async function loadData() {
    if (loaded.value) return
    loading.value = true
    try {
      const resp = await fetch('./encyclopedia.json')
      const data = await resp.json()
      entries.value = data
      loaded.value = true
    } catch (err) {
      console.error('Failed to load encyclopedia data:', err)
    } finally {
      loading.value = false
    }
  }

  return {
    entries,
    loaded,
    loading,
    categoryMap,
    categories,
    getCategoryId,
    getEntriesByCategory,
    getEntryById,
    searchEntries,
    loadData,
  }
})
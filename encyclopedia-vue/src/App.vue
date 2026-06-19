<template>
  <div class="app-layout">
    <Sidebar :categories="categories" />
    <div class="main-area">
      <Header />
      <main class="content-area">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useEncyclopediaStore } from '@/stores/encyclopedia'
import Sidebar from '@/components/Sidebar.vue'
import Header from '@/components/Header.vue'

const store = useEncyclopediaStore()

const categories = computed(() => store.categories)
</script>

<style scoped>
.app-layout {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

.main-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: var(--sidebar-width);
  overflow: hidden;
}

.content-area {
  flex: 1;
  overflow-y: auto;
  padding: 24px 32px;
}
</style>
# 星铸百科 (Starforge Encyclopedia) - Vue 3

## 项目结构

```
encyclopedia-vue/
├── index.html                 # Vite 入口
├── package.json
├── vite.config.js
├── scripts/
│   └── generate-data.cjs      # 从 encyclopedia/ 数据文件生成 encyclopedia.json
├── public/
│   └── encyclopedia.json      # 生成后的数据文件（gitignore）
└── src/
    ├── main.js                 # Vue 入口
    ├── App.vue                 # 根组件（布局）
    ├── assets/styles/
    │   └── global.css          # 全局样式
    ├── router/
    │   └── index.js            # 路由配置
    ├── stores/
    │   └── encyclopedia.js     # Pinia 数据仓库
    ├── components/
    │   ├── Sidebar.vue         # 侧边栏导航
    │   ├── Header.vue          # 顶栏面包屑 + 统计
    │   └── EntryCard.vue       # 条目卡片
    └── views/
        ├── HomePage.vue        # 首页
        ├── CategoryPage.vue    # 分类条目列表
        ├── EntryDetailPage.vue # 条目详情
        └── SearchResultsPage.vue # 搜索结果
```

## 开发

```bash
# 安装依赖
npm install

# 生成数据（从 encyclopedia/ 下的 populate_*.js 生成 encyclopedia.json）
npm run generate-data

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 数据源

所有条目数据来自 `../encyclopedia/data/` 目录下的 `populate_*.js` 文件。

运行 `npm run generate-data` 会读取这些文件，生成 `public/encyclopedia.json` 供前端加载。

## 条目编号规则

- WR-xxx: 世界规则
- SYS-xxx: 系统能力
- HIS-xxx: 历史真相
- CHR-xxx: 人物
- FAC-xxx: 势力
- LOC-xxx: 地点
- TEC-xxx: 科技装备
- RES-xxx: 资源道具
- DIS-xxx: 灾难事件
- FO-xxx: 伏笔

## 重要等级

- S: 全书核心设定，不可随意修改
- A: 主线关键设定
- B: 重要支线设定
- C: 普通剧情设定
- D: 临时设定
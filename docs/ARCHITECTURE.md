# Starforge 项目架构

## 项目定位

《全民穿越：别人造木屋，我修歼星舰》长篇小说百科系统。  
本项目的**核心目标不是写正文**，而是建立一套可长期维护的小说世界数据库，供后续 AI 写作、剧情规划、伏笔管理、战力校验、章节创作时调用。

---

## 当前主线：Vue 版百科

**正式前端项目：** `encyclopedia-vue/`

技术栈：Vue 3 + Vite + Vue Router + Pinia

当前版本支持：
- 全局搜索
- 分类浏览
- 条目详情（含元信息、关联条目、伏笔状态）
- 移动端适配

---

## 数据流架构

```
encyclopedia/data/*.js          ← 数据源（唯一人工维护层）
        │
        ▼
encyclopedia-vue/scripts/
    generate-data.cjs            ← 数据生成脚本
        │
        ▼
encyclopedia-vue/public/
    encyclopedia.json            ← 生成产物（只读，不可手工修改）
        │
        ▼
Vue 前端读取 encyclopedia.json   ← 展示层
  → src/stores/encyclopedia.js 加载
  → 各视图组件渲染
```

**核心原则：**
1. `encyclopedia/data/` 是唯一的数据源层，所有条目在此新增或修改。
2. `encyclopedia-vue/public/encyclopedia.json` 是自动生成的产物，**禁止人工编辑**。
3. 修改数据后必须运行 `npm run generate-data` 重新生成。
4. 校验数据运行 `npm run validate-data`。

---

## 目录结构

```
starforge/
├── docs/
│   ├── ARCHITECTURE.md          ← 本文件
│   └── AUDIT_REPORT.md          ← 审计报告
│
├── encyclopedia/                ← 数据源层
│   ├── index.html               ← 旧版静态页面（legacy）
│   ├── build.js                 ← 旧版静态构建脚本（legacy）
│   ├── populate_core.js         ← 核心世界观条目
│   └── data/
│       ├── characters/           ← 人物条目
│       ├── creatures/            ← 怪物/异族条目
│       ├── factions/             ← 势力条目
│       ├── locations/            ← 地点条目
│       ├── systems/              ← 系统能力条目
│       ├── tech/                 ← 科技装备条目
│       ├── plot/                 ← 剧情/伏笔条目
│       ├── writing/              ← 写作规范条目
│       ├── resources/            ← 资源条目（新增）
│       ├── disasters/            ← 灾难条目（新增）
│       ├── foreshadowing/        ← 伏笔条目（新增）
│       ├── world-rules/          ← 世界规则条目（新增）
│       ├── chronology/           ← 时间线条目（新增）
│       └── validation/           ← 设定校验条目（新增）
│
├── encyclopedia-vue/            ← Vue 3 前端（主项目）
│   ├── scripts/
│   │   ├── generate-data.cjs    ← 数据生成脚本
│   │   └── validate-data.cjs    ← 数据校验脚本（新增）
│   ├── public/
│   │   └── encyclopedia.json    ← 生成产物（gitignored）
│   ├── src/
│   │   ├── main.js
│   │   ├── App.vue
│   │   ├── router/
│   │   ├── stores/
│   │   ├── components/
│   │   └── views/
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## 旧版说明（Legacy）

`encyclopedia/index.html` 和 `encyclopedia/build.js` 是项目早期的静态版本。

- 数据来源：同样读取 `encyclopedia/data/` 下的条目文件。
- 当前状态：保留但不作为主流程维护。
- 后续计划：不再对旧版构建脚本做功能增强。所有新功能仅在 Vue 版中实现。

---

## 如何新增百科条目

1. 找到对应分类的数据文件（如人物条目在 `encyclopedia/data/characters/populate_characters.js`）。
2. 按该文件的格式新增条目对象。
3. 确保条目的 `id` 唯一、`code` 符合编号规范。
4. 运行 `cd encyclopedia-vue && npm run generate-data` 更新生成产物。
5. 运行 `cd encyclopedia-vue && npm run validate-data` 校验数据完整性。
6. 提交数据源文件和生成产物（生成产物需重新生成后提交）。

---

## 常用命令

```bash
cd encyclopedia-vue

# 安装依赖（首次）
npm install

# 生成数据（读取 encyclopedia/data/ → 生成 encyclopedia.json）
npm run generate-data

# 校验数据（检查字段完整性、引用有效性）
npm run validate-data

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build          # 自动执行 generate-data → validate-data → vite build
```

---

## 智能体执行规范

1. **禁止直接写小说正文。**
2. **禁止直接修改 `encyclopedia-vue/public/encyclopedia.json`**——必须通过数据源 → 生成脚本的流程。
3. **任何新增设定必须先入库**，不得凭空发挥。
4. **所有 S 级条目必须具备完整字段。**
5. **伏笔必须有回收计划。**
6. **禁止矛盾清单必须遵守。**
7. 每完成一个模块，运行校验脚本确保数据完整性。
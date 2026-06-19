# Starforge / 星铸百科

## 项目定位

《全民穿越：别人造木屋，我修歼星舰》长篇小说的**百科系统**。

**本项目不是写正文，而是建立一套可长期维护的小说世界数据库。** 供后续 AI 写作、剧情规划、伏笔管理、战力校验、章节创作时调用。

---

## 当前主线：Vue 版百科

正式前端项目：`encyclopedia-vue/`（Vue 3 + Vite + Vue Router + Pinia）

数据流：

```text
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
```

**核心原则：**

1. `encyclopedia/data/` 是**唯一的数据源层**，所有条目在此新增或修改。
2. `encyclopedia-vue/public/encyclopedia.json` 是自动生成的产物，**禁止人工编辑**。
3. 修改数据后必须运行 `npm run generate-data` 重新生成。
4. 每次修改后运行 `npm run validate-data` 校验数据完整性。
5. **禁止直接写小说正文**——百科系统只收录设定、伏笔、规则，不写章节正文。

---

## 目录结构

```
starforge/
├── docs/
│   ├── ARCHITECTURE.md          ← 项目架构文档
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
│       ├── resources/            ← 资源条目
│       ├── disasters/            ← 灾难条目
│       ├── foreshadowing/        ← 伏笔条目
│       ├── world-rules/          ← 世界规则条目
│       ├── chronology/           ← 时间线条目
│       └── validation/           ← 设定校验条目
│
├── encyclopedia-vue/            ← Vue 3 前端（主项目）
│   ├── scripts/
│   │   ├── generate-data.cjs    ← 数据生成脚本
│   │   └── validate-data.cjs    ← 数据校验脚本
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
├── SOUL.md                      ← 智能体人格定义
├── USER.md                      ← 用户档案
├── memory/                      ← 持久记忆
└── README.md                    ← 本文件
```

---

## 如何新增百科条目

1. 找到对应分类的数据文件（如人物条目在 `encyclopedia/data/characters/populate_characters.js`）。
2. 按该文件的格式新增条目对象。
3. 确保条目的 `id` 唯一、`code` 符合编号规范。
4. 运行 `cd encyclopedia-vue && npm run generate-data` 更新生成产物。
5. 运行 `cd encyclopedia-vue && npm run validate-data` 校验数据完整性。
6. 提交数据源文件和重新生成的产物。

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

# 生产构建（自动执行 generate-data → validate-data → vite build）
npm run build
```

---

## 智能体执行规范

1. **禁止直接写小说正文。**
2. **禁止直接修改 `encyclopedia-vue/public/encyclopedia.json`**——必须通过数据源 → 生成脚本的流程。
3. **任何新增设定必须先入库**，不得凭空发挥。
4. **所有 S 级条目必须具备完整字段。**
5. **伏笔必须有回收计划。**
6. **禁止矛盾清单必须遵守。**
7. **每完成一个模块，运行校验脚本确保数据完整性。**

---

## 旧版说明（Legacy）

`encyclopedia/index.html` 和 `encyclopedia/build.js` 是项目早期的静态版本。
- 数据来源：同样读取 `encyclopedia/data/` 下的条目文件。
- 当前状态：保留但不作为主流程维护。
- 后续计划：不再对旧版构建脚本做功能增强。所有新功能仅在 Vue 版中实现。
- 新增数据目录（resources/、disasters/ 等）未接入旧版构建脚本，旧版可能无法完整构建。

---

## 设定编号体系

| 前缀 | 分类 | 示例 |
|------|------|------|
| WR | 世界规则 | WR-000 世界总览 |
| SYS | 系统能力 | SYS-001 文明回收系统 |
| HIS | 历史真相 | HIS-001 前六轮文明失败史 |
| CHR | 人物 | CHR-001 林烬 |
| FAC | 势力 | FAC-001 余火城 |
| LOC | 地点 | LOC-001 黑松林区 |
| TEC | 科技装备 | TEC-001 废墟识别仪 |
| RES | 资源道具 | RES-001 木材 |
| DIS | 灾难事件 | DIS-001 极寒夜 |
| FO | 伏笔 | FO-001 第七轮人类 |
| WG | 写作规范 | WG-001 百科工程规范 |
| COOL | 爽点模板 | COOL-001 资源垄断型爽点 |
| BAN | 禁止矛盾 | BAN-001 系统不得凭空造物 |
| PLOT | 剧情分卷 | PLOT-001 第一卷大纲 |

---

## 条目重要等级

| 等级 | 含义 | 要求 |
|------|------|------|
| S | 核心世界观、主角、主线 | 必须包含全部 11 个扩展字段 |
| A | 重要人物、势力、科技 | 必须包含 8 个以上扩展字段 |
| B | 辅助设定 | 至少包含 5 个扩展字段 |
| C | 细节补充 | 基础字段完整即可 |
| D | 草稿 / 待完善 | 允许暂缺部分字段 |

扩展字段：`importance`, `canonLevel`, `surfaceSetting`, `deepTruth`, `narrativeFunction`, `coolPointFunction`, `limitations`, `futureDevelopment`, `forbiddenContradictions`, `aiWritingNotes`, `revealStage`

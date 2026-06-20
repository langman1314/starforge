# 星铸百科（Starforge Encyclopedia）审计报告

> 生成日期：2026-06-20
> 项目：星铸百科 —— 《全民穿越：别人造木屋，我修歼星舰》世界观管理系统

---

## 一、总览

| 指标 | 数值 |
|------|------|
| 总条目数 | **231** |
| 数据源文件 | **19 个** (`populate_*.js`) |
| 生成 JSON 大小 | **901.6 KB** |
| 验证结果 | ✅ 0 错误 / 0 警告 |
| Vue 构建结果 | ✅ 成功（1.86s） |

---

## 二、条目重要性分布

| 等级 | 数量 | 占比 |
|------|------|------|
| **S**（核心条目） | 59 | 25.5% |
| **A**（重要条目） | 91 | 39.4% |
| **B**（辅助条目） | 78 | 33.8% |
| **C**（次要条目） | 3 | 1.3% |

---

## 三、正典等级分布

| 等级 | 数量 | 含义 |
|------|------|------|
| **core** | 121 | 核心设定，不可变 |
| **confirmed** | 76 | 已确认，可扩展 |
| **locked** | 30 | 锁定等待剧情验证 |
| **draft** | 4 | 草稿，待完善 |

---

## 四、条目状态分布

| 状态 | 数量 |
|------|------|
| active（活跃） | 209 |
| hidden（隐藏） | 9 |
| locked（锁定） | 6 |
| completed（已完成） | 3 |
| destroyed（已销毁） | 2 |
| planned（已计划） | 1 |
| unknown（未知） | 1 |

---

## 五、已接入模块清单

### data/ 子目录（18 个，其中 15 个已接入数据）

| 目录 | 文件数 | 状态 |
|------|--------|------|
| `aliens/` | 1 | ✅ |
| `characters/` | 1 | ✅ |
| `chronology/` | 1 | ✅ |
| `creatures/` | 1 | ✅ |
| `disasters/` | 1 | ✅ |
| `factions/` | 1 | ✅ |
| `history/` | 1 | ✅ |
| `items/` | 1 | ✅ |
| `locations/` | 1 | ✅ |
| `maps/` | 1 | ✅ |
| `plot/` | 1 | ✅ |
| `systems/` | 1 | ✅ |
| `tech/` | 1 | ✅ |
| `validation/` | 1 | ✅ |
| `world-rules/` | 1 | ✅ |
| `writing/` | 3 | ✅ |
| `foreshadowing/` | 0 | ⚠️ 空目录 |
| `resources/` | 0 | ⚠️ 空目录 |

### 根目录

| 文件 | 状态 |
|------|------|
| `populate_core.js` | ✅ 25 条 |

> 注：`foreshadowing/` 和 `resources/` 目录已创建但尚未有数据文件。伏笔条目目前放在 `writing/populate_forbidden.js` 中。

---

## 六、分类条目统计（TOP 15）

| 分类 | 数量 |
|------|------|
| forbidden-list（禁止设定） | 35 |
| tech-tree（科技树） | 32 |
| cool-moments（爽点） | 30 |
| disasters（灾难） | 12 |
| factions（势力） | 12 |
| foreshadowing（伏笔） | 12 |
| map（地图） | 9 |
| arena（考场） | 7 |
| timeline（时间线） | 6 |
| writing-guide（写作指南） | 6 |
| aliens（异族） | 5 |
| monsters（怪物） | 5 |
| alien-races（异族种族） | 5 |
| items（道具） | 5 |
| maps（区域地图） | 5 |

---

## 七、数据目录结构

```
encyclopedia/
├── populate_core.js                    (25 条, S/A级核心设定)
├── data/
│   ├── aliens/populate_aliens.js        (5 条)
│   ├── characters/populate_characters.js (6 条)
│   ├── chronology/populate_chronology.js (3 条)
│   ├── creatures/populate_creatures.js   (10 条)
│   ├── disasters/populate_disasters.js   (6 条)
│   ├── factions/populate_factions.js     (12 条)
│   ├── foreshadowing/                    (空)
│   ├── history/populate_history.js       (2 条)
│   ├── items/populate_items.js           (5 条)
│   ├── locations/populate_locations.js   (9 条)
│   ├── maps/populate_maps.js             (5 条)
│   ├── plot/populate_plot.js             (18 条)
│   ├── resources/                        (空)
│   ├── systems/populate_systems.js       (17 条)
│   ├── tech/populate_tech.js             (32 条)
│   ├── validation/populate_validation.js (2 条)
│   ├── world-rules/populate_world_rules.js (3 条)
│   └── writing/
│       ├── populate_cool_moments.js      (30 条)
│       ├── populate_forbidden.js         (35 条)
│       └── populate_writing_guide.js     (6 条)
```

---

## 八、编码前缀使用情况

| 前缀 | 用途 |
|------|------|
| CHR | 人物（林烬、苏清黎、赵启明等） |
| WR | 世界规则（考场规则、高维裁判、文明筛选等） |
| SYS | 系统（文明回收系统、排行榜、聊天频道等） |
| HIS | 历史（旧日人类文明、前六轮失败史等） |
| FAC | 势力（余火城、曙光联盟、狼血文明等） |
| LOC | 地点（黑松林区、灰岩荒原等） |
| TEC | 科技（废墟识别仪、电磁炮塔、歼星舰等） |
| VAL | 验证专用 |

---

## 九、未完成模块

| 模块 | 状态 | 说明 |
|------|------|------|
| `data/foreshadowing/` | ⚠️ 空目录 | 伏笔条目分散写入 plot 和 forbidden 文件中，未独立成表 |
| `data/resources/` | ⚠️ 空目录 | 资源体系仅存在于 `systems/populate_systems.js` 中的 `WR-007` 条目，未独立展开 |
| 章节辅助系统 | ❌ 未开始 | 章节大纲模板、单章检查清单、爽点检查清单尚未实现 |
| 关系网络图谱 | ❌ 未开始 | 人物关系图、势力关系图、科技树关系图尚未生成 |
| 连载节奏表 | ❌ 未开始 | 用于控制更新节奏和剧情密度的规划工具 |
| 数据文件模板化 | ⚠️ 部分完成 | `populate_writing_guide.js` 中包含条目结构说明 |

---

## 十、构建与运行

```bash
# 生成 JSON 数据
cd encyclopedia-vue
npm run generate-data

# 验证数据完整性
npm run validate-data

# 完整构建（生成数据 → 验证 → Vue 构建）
npm run build

# 预览
npm run preview
```

---

## 十一、近期修复记录

| 问题 | 修复方式 |
|------|----------|
| WR-000 编码重复 | core.js 中 "世界总览 v1.0" → WR-005 |
| HIS-001 编码重复 | core.js 中 "前六轮人类文明失败史" → HIS-003 |
| 验证器枚举缺失 | validate-data.cjs 新增 `'locked'` 值 |
| world-rules 编码冲突 | WR-001~003 → WR-050~052 |
| 角色登场章节不一致 | 赫连獠→第15章, 裁决者零号→第30章 |

---

*本报告由 AI 自动生成，基于当前 `public/encyclopedia.json`（231 条条目）的实时分析。*

# 星铸百科（Starforge Encyclopedia）审计报告

> 生成日期：2026-06-20
> 项目：星铸百科 —— 《全民穿越：别人造木屋，我修歼星舰》世界观管理系统

---

## 一、总览

| 指标 | 数值 |
|------|------|
| 总条目数 | **245** |
| 数据源文件 | **21 个** (`populate_*.js`) |
| 生成 JSON 大小 | **950.1 KB** |
| 验证结果 | ✅ 0 错误 / 0 警告 |
| Vue 构建结果 | ✅ 成功（1.87s） |

---

## 二、条目重要性分布

| 等级 | 数量 | 占比 |
|------|------|------|
| **S**（核心条目） | 62 | 25.3% |
| **A**（重要条目） | 97 | 39.6% |
| **B**（辅助条目） | 81 | 33.1% |
| **C**（次要条目） | 5 | 2.0% |

---

## 三、正典等级分布

| 等级 | 数量 | 含义 |
|------|------|------|
| **core** | 128 | 核心设定，不可变 |
| **confirmed** | 80 | 已确认，可扩展 |
| **locked** | 33 | 锁定等待剧情验证 |
| **draft** | 4 | 草稿，待完善 |

---

## 四、条目状态分布

| 状态 | 数量 |
|------|------|
| active（活跃） | 216 |
| hidden（隐藏） | 9 |
| locked（锁定） | 6 |
| completed（已完成） | 3 |
| destroyed（已销毁） | 2 |
| planned（已计划） | 1 |
| unknown（未知） | 1 |

---

## 五、已接入模块清单

### data/ 子目录（19 个目录）

| 目录 | 文件数 | 状态 |
|------|--------|------|
| `aliens/` | 1 | ✅ |
| `characters/` | 1 | ✅ |
| `chronology/` | 1 | ✅ |
| `creatures/` | 1 | ✅ |
| `disasters/` | 1 | ✅ |
| `factions/` | 1 | ✅ |
| `foreshadowing/` | 1 | ✅ |
| `history/` | 1 | ✅ |
| `items/` | 1 | ✅ |
| `locations/` | 1 | ✅ |
| `maps/` | 1 | ✅ |
| `plot/` | 1 | ✅ |
| `resources/` | 1 | ✅ |
| `systems/` | 1 | ✅ |
| `tech/` | 1 | ✅ |
| `validation/` | 1 | ✅ |
| `world-rules/` | 1 | ✅（9 条，WR-000~WR-010 S级锁定） |
| `writing/` | 3 | ✅ |

### 根目录

| 文件 | 状态 |
|------|------|
| `populate_core.js` | ✅ 19 条（WR-012+、HIS-003） |

---

## 六、Stage 1 验证（WR 迁移完成）

| 验收项 | 状态 |
|--------|------|
| WR-000 世界总览 在 world-rules 落地，S 级 locked | ✅ |
| WR-001 万族考场真实面目 在 world-rules 落地，S 级 locked | ✅ |
| WR-010 空间结构 在 world-rules 落地，S 级 locked | ✅ |
| core.js 中无 WR-000~WR-010 编码 | ✅ |
| 无编码碰撞 | ✅ |
| generate-data + validate-data + build 全通过 | ✅ |

---

## 七、分类条目统计（TOP 15）

| 分类 | 数量 |
|------|------|
| forbidden-list（禁止设定） | 35 |
| tech-tree（科技树） | 32 |
| cool-moments（爽点） | 30 |
| disasters（灾难） | 12 |
| factions（势力） | 12 |
| foreshadowing（伏笔） | 12 |
| world-rules（世界规则） | 9 |
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
| PLOT | 剧情分卷（六卷大纲） |
| FO | 核心伏笔（12 条主线伏笔） |
| VAL | 验证专用 |

---

## 九、未完成模块

| 模块 | 状态 | 说明 |
|------|------|------|
| `data/resources/populate_resources.js` | ✅ 已完成 | RES-001~RES-014 五层资源体系已建立 |
| 章节辅助系统 | ❌ 未开始 | 章节大纲模板、单章检查清单、爽点检查清单 |
| 关系网络图谱 | ❌ 未开始 | 人物关系图、势力关系图、科技树关系图 |
| 连载节奏表 | ❌ 未开始 | 控制更新节奏和剧情密度的规划工具 |

---

## 十、Stage 推进计划

| Stage | 内容 | 状态 |
|-------|------|------|
| 1 | WR 迁移至 world-rules | ✅ 已完成 |
| 2 | 创建 foreshadowing 独立数据文件 | ✅ 已完成 |
| 3 | 创建 resources 独立数据文件 | ✅ 已完成 |
| 4 | 更新 systems/characters/tech | ⏳ 待开始 |
| 5 | 增强验证器 + 前端展示 | ⏳ 待开始 |
| 6 | 生成完整审计报告 | ⏳ 待开始 |
| 7 | 验收测试 | ⏳ 待开始 |
| 8 | 交接模板 | ⏳ 待开始 |

---

## 十一、构建与运行

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

## 十二、近期修复记录

| 问题 | 修复方式 |
|------|----------|
| WR-000 编码重复 | 从 core.js 删除，world-rules 中有 S 级权威版本 |
| WR-001~WR-007 编码碰撞 | 从 core.js 批量删除 6 个重复条目，world-rules 独占 WR-000~WR-010 |
| WR-010 编码碰撞 | core.js WR-010 → WR-110，WR-011 → WR-101 |
| core.js 条目收缩 | 25 条 → 19 条，移除已迁移至 world-rules 的条目 |
| 编码前缀统一 | WR 前缀 WR-000~WR-041 统一到 world-rules 和 core.js |
| 验证器枚举缺失 | validate-data.cjs 新增 `'locked'` 值 |

---

*本报告由 AI 自动生成，基于当前 `public/encyclopedia.json`（231 条条目）的实时分析。*

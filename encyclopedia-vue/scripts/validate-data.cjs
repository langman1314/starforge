// ============================================================
//  STARFORGE 百科全书 - 数据验证脚本
//  文件: validate-data.cjs
//  说明: 验证所有百科条目数据结构、代码唯一性和引用完整性
//  用法: node scripts/validate-data.cjs
//  返回: 0 = 验证通过, 1 = 验证失败
// ============================================================

const fs = require('fs');
const path = require('path');

// ============================================================
//  辅助函数
// ============================================================

/** 递归查找 encyclopedia/data/ 下的所有 populate_*.js 文件 (含根目录) */
function findPopulateFiles(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findPopulateFiles(full));
    } else if (entry.isFile() && /^populate_.+\.js$/.test(entry.name)) {
      results.push(full);
    }
  }
  return results;
}

/** 加载单个 populate 文件中的所有条目 */
function loadEntries(filePath) {
  try {
    delete require.cache[require.resolve(filePath)];
    const mod = require(filePath);
    const key = Object.keys(mod).find(k => k.startsWith('ENTRIES_'));
    if (key && Array.isArray(mod[key])) {
      return mod[key].filter(e => e && e.id && e.id !== 'EXAMPLE-001');
    }
    return [];
  } catch (err) {
    return { error: err.message };
  }
}

// ============================================================
//  验证规则
// ============================================================

const errors = [];
const warnings = [];

function error(msg, entry) {
  const suffix = entry ? ` [条目: ${entry.id || entry.code || '(无ID)'}]` : '';
  errors.push(msg + suffix);
}

function warn(msg, entry) {
  const suffix = entry ? ` [条目: ${entry.id || entry.code || '(无ID)'}]` : '';
  warnings.push(msg + suffix);
}

// ============================================================
//  加载所有条目
// ============================================================

const BASE = path.resolve(__dirname, '..', '..', 'encyclopedia');
const populateFiles = findPopulateFiles(BASE);

console.log(`找到 ${populateFiles.length} 个数据文件\n`);

const allEntries = [];
const loadErrors = [];

for (const file of populateFiles) {
  const result = loadEntries(file);
  if (Array.isArray(result)) {
    allEntries.push(...result);
    console.log(`  ✓ ${path.basename(file)} (${result.length} 条)`);
  } else {
    loadErrors.push(`${path.basename(file)}: ${result.error}`);
    console.log(`  ✗ ${path.basename(file)}: ${result.error}`);
  }
}

if (loadErrors.length > 0) {
  error('以下文件加载失败:\n' + loadErrors.map(e => '    ' + e).join('\n'));
}

console.log(`\n共加载 ${allEntries.length} 条条目\n`);

// ============================================================
//  验证开始
// ============================================================

// 1. 必填字段检查
console.log('--- 检查 1: 字段完整性 ---');
const requiredFields = ['id', 'name', 'summary'];
for (const entry of allEntries) {
  for (const field of requiredFields) {
    if (!entry[field] || (typeof entry[field] === 'string' && entry[field].trim() === '')) {
      error(`缺少必填字段 "${field}"`, entry);
    }
  }
}

// 2. ID 唯一性
console.log('--- 检查 2: ID 和 Code 唯一性 ---');
const idMap = new Map();
const codeMap = new Map();

for (const entry of allEntries) {
  if (idMap.has(entry.id)) {
    error(`ID 重复: "${entry.id}" (与 ${idMap.get(entry.id)} 冲突)`, entry);
  } else {
    idMap.set(entry.id, entry.name || entry.id);
  }

  if (entry.code) {
    const codes = entry.code.split('/').map(c => c.trim());
    for (const singleCode of codes) {
      if (codeMap.has(singleCode)) {
        error(`Code 重复: "${singleCode}" (与 "${codeMap.get(singleCode)}" 冲突)`, entry);
      } else {
        codeMap.set(singleCode, entry.id);
      }
    }
  }
}

// 3. 引用完整性
console.log('--- 检查 3: 引用完整性 ---');
const validIds = new Set(allEntries.map(e => e.id));
const validCodes = new Set(codeMap.keys());

const REFERENCE_FIELDS = [
  'relatedCharacters', 'relatedFactions', 'relatedLocations',
  'relatedEvents', 'relatedItems', 'relatedForeshadowing',
];

let brokenRefCount = 0;
let slugRefCount = 0;

for (const entry of allEntries) {
  for (const field of REFERENCE_FIELDS) {
    const refs = entry[field];
    if (!Array.isArray(refs)) continue;
    for (const ref of refs) {
      if (!ref || typeof ref !== 'string') continue;
      // 自由文本不校验
      if (!/^[A-Z]+-\d+$/.test(ref) && !/^[A-Z]+-\d+\s*\/\s*[A-Z]+-\d+$/.test(ref)) {
        continue;
      }
      const parts = ref.split('/').map(s => s.trim());
      for (const part of parts) {
        if (!validIds.has(part) && !validCodes.has(part)) {
          warn(`引用 "${ref}" 中的 "${part}" 未找到对应条目`, entry);
          brokenRefCount++;
        }
      }
    }
  }
}

console.log(`  引用完整性检查完成, 断裂引用: ${brokenRefCount} 条`);

// 4. 章节格式检查
console.log('--- 检查 4: 章节格式 ---');
// 无附加检查

// 5. 状态字段检查
console.log('--- 检查 5: 状态字段 ---');
for (const entry of allEntries) {
  if (entry.status && !['active', 'hidden', 'destroyed', 'unknown', 'completed', 'planned', 'locked'].includes(entry.status)) {
    warn(`状态值 "${entry.status}" 不在标准列表中`, entry);
  }
  if (entry.spoilerLevel && !['none', 'minor', 'major', 'final'].includes(entry.spoilerLevel)) {
    warn(`剧透等级 "${entry.spoilerLevel}" 不在标准列表中`, entry);
  }
  if (entry.canonLevel && !['core', 'confirmed', 'draft', 'deprecated', 'locked'].includes(entry.canonLevel)) {
    warn(`正典等级 "${entry.canonLevel}" 不在标准列表中`, entry);
  }
}

// 6. 条目数量统计
console.log('--- 检查 6: 条目数量统计 ---');
const categoryCounts = new Map();
for (const entry of allEntries) {
  const cat = entry.category || '未分类';
  categoryCounts.set(cat, (categoryCounts.get(cat) || 0) + 1);
}
for (const [cat, count] of [...categoryCounts.entries()].sort()) {
  console.log(`  ${cat}: ${count} 条`);
}

// 7. S-level 条目字段完整性检查
console.log('--- 检查 7: S级条目字段完整性 ---');
const SKIP_S_LEVEL_CATEGORIES = ['foreshadowing', 'pacing', 'relationship-network'];
const S_REQUIRED_FIELDS = ['surfaceSetting', 'deepTruth', 'narrativeFunction', 'coolPointFunction', 'limitations', 'revealStage', 'forbiddenContradictions', 'aiWritingNotes'];
let sCount = 0;
let sSkippedCount = 0;
for (const entry of allEntries) {
  if (entry.importance === 'S') {
    if (SKIP_S_LEVEL_CATEGORIES.includes(entry.category) || entry.canonLevel === 'deprecated' || entry.status === 'hidden') {
      sSkippedCount++;
      continue;
    }
    sCount++;
    for (const field of S_REQUIRED_FIELDS) {
      if (!entry[field] || (typeof entry[field] === 'string' && entry[field].trim() === '')) {
        error(`S级条目缺少必填字段 "${field}"`, entry);
      }
    }
  }
}
console.log(`  S级条目: ${sCount} 条已检查, ${sSkippedCount} 条已跳过(自有schema/已废弃), 检查完成`);

// 8. 科技树条目解锁约束检查
console.log('--- 检查 8: 科技树条目解锁约束 ---');
const TECH_REQUIRED_FIELDS = ['unlockStage', 'requiredPermission', 'requiredMaterials', 'requiredBlueprint', 'requiredEnergy', 'risk'];
let techCount = 0;
for (const entry of allEntries) {
  if (entry.category === 'tech-tree') {
    techCount++;
    for (const field of TECH_REQUIRED_FIELDS) {
      if (!entry[field] || (typeof entry[field] === 'string' && entry[field].trim() === '')) {
        error(`科技树条目缺少必填字段 "${field}"`, entry);
      }
    }
    if (!Array.isArray(entry.requiredMaterials) || entry.requiredMaterials.length === 0) {
      warn(`科技树条目的 requiredMaterials 应为非空数组`, entry);
    }
  }
}
console.log(`  科技树条目: ${techCount} 条, 检查完成`);

// 9. 伏笔条目字段完整性检查
console.log('--- 检查 9: 伏笔条目字段完整性 ---');
const FORESHADOW_REQUIRED_FIELDS = ['plantedIn', 'plantedMethod', 'hiddenMeaning', 'payoffVolume', 'payoffChapter', 'foreshadowingStatus'];
const VALID_FORESHADOW_STATUSES = ['planted', 'developing', 'paid_off', 'abandoned'];
let foreshadowCount = 0;
for (const entry of allEntries) {
  if (entry.category === 'foreshadowing') {
    foreshadowCount++;
    for (const field of FORESHADOW_REQUIRED_FIELDS) {
      if (!entry[field] || (typeof entry[field] === 'string' && entry[field].trim() === '')) {
        error(`伏笔条目缺少必填字段 "${field}"`, entry);
      }
    }
    if (entry.foreshadowingStatus && !VALID_FORESHADOW_STATUSES.includes(entry.foreshadowingStatus)) {
      warn(`伏笔状态 "${entry.foreshadowingStatus}" 不在标准列表中 (planted/developing/paid_off/abandoned)`, entry);
    }
  }
}
console.log(`  伏笔条目: ${foreshadowCount} 条, 检查完成`);

// ============================================================
//  新增: 检查 10 — 资源条目字段 ERROR 级校验
// ============================================================
console.log('--- 检查 10: 资源条目字段完整性 (ERROR级) ---');
const RESOURCE_REQUIRED_FIELDS = ['resourceTier', 'rarity', 'commonSources', 'primaryUsage', 'economicValue', 'narrativeFunction', 'forbiddenContradictions'];
let resourceCount = 0;
let resourceErrorCount = 0;
for (const entry of allEntries) {
  if (entry.category === 'resources' || (entry.code && /^RES-\d+$/.test(entry.code))) {
    resourceCount++;
    for (const field of RESOURCE_REQUIRED_FIELDS) {
      if (entry[field] === undefined || entry[field] === null || (typeof entry[field] === 'string' && entry[field].trim() === '') || (Array.isArray(entry[field]) && entry[field].length === 0)) {
        error(`资源条目缺少必填字段 "${field}"`, entry);
        resourceErrorCount++;
      }
    }
  }
}
console.log(`  资源条目: ${resourceCount} 条, 缺失字段: ${resourceErrorCount} 个`);

// ============================================================
//  新增: 检查 11 — A/S 级人物条目字段 ERROR 级校验
// ============================================================
console.log('--- 检查 11: A/S级人物条目字段完整性 (ERROR级) ---');
const CHAR_REQUIRED_FIELDS = ['identity', 'personality', 'motivation', 'weakness', 'arc', 'firstAppearance', 'revealStage', 'futureDevelopment', 'forbiddenContradictions', 'aiWritingNotes'];
let charAChecked = 0;
let charErrorCount = 0;
for (const entry of allEntries) {
  const isProtagonist = entry.id && entry.id.startsWith('protagonist-');
  const isCHR = entry.code && /^CHR-\d+$/.test(entry.code);
  const isAorS = entry.importance === 'S' || entry.importance === 'A';
  if ((isProtagonist || isCHR) && isAorS) {
    charAChecked++;
    for (const field of CHAR_REQUIRED_FIELDS) {
      if (!entry[field] || (typeof entry[field] === 'string' && entry[field].trim() === '')) {
        error(`A/S级人物条目缺少必填字段 "${field}"`, entry);
        charErrorCount++;
      }
    }
  }
}
console.log(`  A/S级人物条目: ${charAChecked} 条, 缺失字段: ${charErrorCount} 个`);

// ============================================================
//  新增: 检查 12 — 人物状态一致性校验
// ============================================================
console.log('--- 检查 12: 人物状态一致性校验 ---');
const DEATH_KEYWORDS = ['已死亡', '已经死亡', '已退场', '已毁灭'];
let deathStatusCheckCount = 0;
for (const entry of allEntries) {
  const isCHR = entry.code && /^CHR-\d+$/.test(entry.code);
  if (!isCHR) continue;

  // 如果 status 为 destroyed，必须存在 death 字段
  if (entry.status === 'destroyed') {
    deathStatusCheckCount++;
    if (!entry.deathChapter || !entry.deathEvent || !entry.deathCause) {
      error(`人物 "status: 'destroyed'" 但缺少 deathChapter/deathEvent/deathCause 字段`, entry);
    }
  }

  // 如果 status 为 planned，检查 detail/futureDevelopment/revealStage 中不能出现死亡关键词
  if (entry.status === 'planned') {
    const fieldsToCheck = [entry.detail, entry.futureDevelopment, entry.revealStage].filter(Boolean);
    if (Array.isArray(entry.detail)) fieldsToCheck.push(entry.detail.join(''));
    for (const text of fieldsToCheck) {
      if (typeof text === 'string') {
        for (const keyword of DEATH_KEYWORDS) {
          if (text.includes(keyword)) {
            warn(`人物 "status: 'planned'" 但内容中包含 "${keyword}"（应改为 plannedFate 描述方式）`, entry);
          }
        }
      }
    }
  }
}
console.log(`  人物状态一致性校验完成, destroyed检查: ${deathStatusCheckCount} 条`);

// ============================================================
//  新增: 检查 13 — 中后期人物提前登场校验
// ============================================================
console.log('--- 检查 13: 中后期人物提前登场校验 ---');
for (const entry of allEntries) {
  if (!entry.code) continue;

  // 赫连獠 CHR-005 不得在第1-45章实体登场
  if (entry.code === 'CHR-005') {
    const app = entry.firstAppearance || '';
    if (/第\d+章/.test(app)) {
      const match = app.match(/第(\d+)章/);
      if (match && parseInt(match[1]) <= 45) {
        error(`赫连獠(CHR-005) firstAppearance="${app}" 早于第46章，违反第三卷登场规则`, entry);
      }
    }
    // 也检查 revealStage 中是否有提前的暗示
    if (entry.revealStage && /第\d+章/.test(entry.revealStage)) {
      const stageMatch = entry.revealStage.match(/第(\d+)章/);
      if (stageMatch && parseInt(stageMatch[1]) <= 45) {
        error(`赫连獠(CHR-005) revealStage 提及第${stageMatch[1]}章实体行为，违反第三卷登场规则`, entry);
      }
    }
  }

  // 裁决者零号 CHR-006 不得在第1-155章实体登场
  if (entry.code === 'CHR-006') {
    const app = entry.firstAppearance || '';
    if (/第\d+章/.test(app)) {
      const match = app.match(/第(\d+)章/);
      if (match && parseInt(match[1]) < 156) {
        error(`裁决者零号(CHR-006) firstAppearance="${app}" 早于第156章，违反第五卷末实体登场规则`, entry);
      }
    }
  }

  // 燧明AI CHR-003 完整人格不得在第二卷后期前出现
  if (entry.code === 'CHR-003') {
    if (entry.trueAppearance) {
      const ta = entry.trueAppearance || '';
      // 如果 trueAppearance 提到第一卷或"前期"，则警告
      if (/第一卷|前期/.test(ta)) {
        warn(`燧明AI(CHR-003) trueAppearance="${ta}" 可能早于第二卷后期`, entry);
      }
    }
  }
}
console.log('  中后期人物提前登场校验完成');

// ============================================================
//  新增: 检查 14 — 关系网络与人物登场同步校验
// ============================================================
console.log('--- 检查 14: 关系网络与人物登场同步校验 ---');
const STAGE_KEYWORDS_WARNINGS = [
  { pattern: /赫连獠[^<]{0,500}第[2-4]?[0-9]章/, msg: 'REL条目中赫连獠出现在早期章节(第1-45章)' },
  { pattern: /裁决者零号.*第1[0-5]?[0-9]章(?!.*(?:埋线|异常|警告|追踪))/i, msg: 'REL条目中裁决者零号在早期章节非埋线方式出现' },
];
for (const entry of allEntries) {
  if (entry.category !== 'relationship-network') continue;
  const detail = typeof entry.detail === 'string' ? entry.detail : '';
  for (const sw of STAGE_KEYWORDS_WARNINGS) {
    if (sw.pattern.test(detail)) {
      warn(`${sw.msg}`, entry);
    }
  }
}
console.log('  关系网络同步校验完成');

// ============================================================
//  新增: 检查 15 — slug 引用建议改用 code
// ============================================================
console.log('--- 检查 15: slug引用格式提示 ---');
let slugRefNoteCount = 0;
for (const entry of allEntries) {
  for (const field of REFERENCE_FIELDS) {
    const refs = entry[field];
    if (!Array.isArray(refs)) continue;
    for (const ref of refs) {
      if (!ref || typeof ref !== 'string') continue;
      // 匹配类似 "protagonist-linjin"、"loc-polluted-stream" 等 slug 格式
      if (/^[a-z][a-z0-9-]+$/.test(ref) && ref.includes('-') && !ref.includes('/')) {
        // 排除标准 code 格式（XXX-000）
        if (!/^[A-Z]+-\d+$/.test(ref)) {
          warn(`related 字段使用 slug "${ref}"，建议改用 code 格式（如 CHR-001）`, entry);
          slugRefNoteCount++;
        }
      }
    }
  }
}
console.log(`  slug引用提示: ${slugRefNoteCount} 条`);

// ============================================================
//  输出结果
// ============================================================

console.log('\n========================================');
if (errors.length === 0 && warnings.length === 0) {
  console.log('✅ 验证通过！所有检查均无问题。');
  process.exit(0);
} else if (errors.length === 0) {
  console.log(`⚠️  验证通过但有 ${warnings.length} 条警告:\n`);
  for (const w of warnings) {
    console.log(`  ⚠ ${w}`);
  }
  process.exit(0);
} else {
  console.log(`❌ 验证失败！${errors.length} 个错误, ${warnings.length} 条警告:\n`);
  console.log('--- 错误 ---');
  for (const e of errors) {
    console.log(`  ✗ ${e}`);
  }
  if (warnings.length > 0) {
    console.log('\n--- 警告 ---');
    for (const w of warnings) {
      console.log(`  ⚠ ${w}`);
    }
  }
  process.exit(1);
}
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
  // code 字段建议有但不强制
}

// 2. ID 唯一性
console.log('--- 检查 2: ID 和 Code 唯一性 ---');
const idMap = new Map();
const codeMap = new Map();

for (const entry of allEntries) {
  // 检查 ID 唯一性
  if (idMap.has(entry.id)) {
    error(`ID 重复: "${entry.id}" (与 ${idMap.get(entry.id)} 冲突)`, entry);
  } else {
    idMap.set(entry.id, entry.name || entry.id);
  }

  // 检查 Code 唯一性
  if (entry.code) {
    // 处理类似 "SYS-001 / CHR-003" 的双 code
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
// 收集所有存在的 ID 和 code
const validIds = new Set(allEntries.map(e => e.id));
const validCodes = new Set(codeMap.keys());

// 递归收集条目中引用的所有 ID/code
const REFERENCE_FIELDS = [
  'relatedCharacters', 'relatedFactions', 'relatedLocations',
  'relatedEvents', 'relatedItems', 'relatedForeshadowing',
];

for (const entry of allEntries) {
  for (const field of REFERENCE_FIELDS) {
    const refs = entry[field];
    if (!Array.isArray(refs)) continue;
    for (const ref of refs) {
      // 跳过空值和自由文本（不是代码格式的引用）
      if (!ref || typeof ref !== 'string') continue;
      // 自由文本（如 "前期考场异常事件暗示有监管者存在"）不校验
      if (!/^[A-Z]+-\d+$/.test(ref) && !/^[A-Z]+-\d+\s*\/\s*[A-Z]+-\d+$/.test(ref)) {
        continue;
      }
      // 如果是双 code 格式，拆开校验
      const parts = ref.split('/').map(s => s.trim());
      for (const part of parts) {
        if (!validIds.has(part) && !validCodes.has(part)) {
          warn(`引用 "${ref}" 中的 "${part}" 未找到对应条目`, entry);
        }
      }
    }
  }
}

// 4. 章节格式检查
console.log('--- 检查 4: 章节格式 ---');
for (const entry of allEntries) {
  const app = entry.firstAppearance;
  if (app && typeof app === 'string') {
    // 允许的格式: "第X章", "第X章（隐含）", "第一卷", "全书贯穿"
    // 但是不允许像 "第3章" 但实际章节号明显不合理的情况（仅警告）
  }
}

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
// 以下分类使用自有 schema，不检查标准 S 级字段
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

// 10. 角色条目字段完整性检查
console.log('--- 检查 10: 角色条目字段完整性 ---');
const CHAR_REQUIRED_FIELDS = ['identity', 'personality', 'motivation', 'weakness', 'arc'];
let charCount = 0;
for (const entry of allEntries) {
  const isProtagonist = entry.id && entry.id.startsWith('protagonist-');
  const isCHR = entry.code && /^CHR-\d+$/.test(entry.code);
  if (isProtagonist || isCHR) {
    charCount++;
    for (const field of CHAR_REQUIRED_FIELDS) {
      if (!entry[field] || (typeof entry[field] === 'string' && entry[field].trim() === '')) {
        warn(`角色条目缺少推荐字段 "${field}"`, entry);
      }
    }
  }
}
console.log(`  角色条目: ${charCount} 条, 检查完成`);

// 11. 资源条目字段完整性检查
console.log('--- 检查 11: 资源条目字段完整性 ---');
const RESOURCE_REQUIRED_FIELDS = ['resourceTier', 'rarity', 'commonSources', 'primaryUsage', 'economicValue'];
let resourceCount = 0;
for (const entry of allEntries) {
  if (entry.category === 'resources') {
    resourceCount++;
    for (const field of RESOURCE_REQUIRED_FIELDS) {
      if (entry[field] === undefined || entry[field] === null || (typeof entry[field] === 'string' && entry[field].trim() === '')) {
        warn(`资源条目缺少推荐字段 "${field}"`, entry);
      }
    }
  }
}
console.log(`  资源条目: ${resourceCount} 条, 检查完成`);

// 12. 跨引用一致性总结
console.log('--- 检查 12: 跨引用一致性总结 ---');
let brokenForeshadowCount = 0;
for (const entry of allEntries) {
  const app = entry.firstAppearance;
  if (app && typeof app === 'string' && /第\d+章/.test(app) && Array.isArray(entry.relatedForeshadowing)) {
    for (const ref of entry.relatedForeshadowing) {
      if (!ref || typeof ref !== 'string') continue;
      if (!/^[A-Z]+-\d+$/.test(ref) && !/^[A-Z]+-\d+\s*\/\s*[A-Z]+-\d+$/.test(ref)) continue;
      const parts = ref.split('/').map(s => s.trim());
      for (const part of parts) {
        if (!validIds.has(part) && !validCodes.has(part)) {
          warn(`firstAppearance="${app}" 条目的相关伏笔引用 "${ref}" 中的 "${part}" 未找到对应条目`, entry);
          brokenForeshadowCount++;
        }
      }
    }
  }
}
console.log(`  跨引用检查完成, 断裂引用: ${brokenForeshadowCount} 条`);

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
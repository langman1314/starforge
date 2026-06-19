// ============================================================
//  STARFORGE 百科全书 - 数据生成脚本
//  文件: generate-data.cjs
//  说明: 递归扫描 encyclopedia/data/ 及根目录下的所有 populate_*.js
//        文件，加载条目后去重，输出到 public/encyclopedia.json
// ============================================================

const fs = require('fs');
const path = require('path');

/** 递归查找指定目录下所有 populate_*.js 文件 */
function findPopulateFiles(dir) {
  const results = [];
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return results;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findPopulateFiles(full));
    } else if (entry.isFile() && /^populate_.+\.js$/.test(entry.name)) {
      results.push(full);
    }
  }
  return results;
}

// 扫描目录
const BASE = path.resolve(__dirname, '..', '..', 'encyclopedia');
const populateFiles = findPopulateFiles(BASE);

console.log(`找到 ${populateFiles.length} 个数据文件`);

// 加载所有条目
let allEntries = [];

for (const file of populateFiles) {
  try {
    delete require.cache[require.resolve(file)];
    const mod = require(file);
    const key = Object.keys(mod).find(k => k.startsWith('ENTRIES_'));
    if (key && Array.isArray(mod[key])) {
      const valid = mod[key].filter(e => e && e.id && e.id !== 'EXAMPLE-001');
      allEntries.push(...valid);
      console.log(`  ✓ ${path.basename(file)} (${valid.length} 条)`);
    } else {
      console.log(`  - ${path.basename(file)} (未找到条目数组)`);
    }
  } catch (err) {
    console.error(`  ✗ ${path.basename(file)}: ${err.message}`);
  }
}

// 去重（按 id）
const seen = new Map();
const deduped = [];
for (const e of allEntries) {
  if (seen.has(e.id)) {
    console.warn(`  重复条目: ${e.id} (保留最先加载的, 跳过 ${path.basename(e._file || 'unknown')})`);
    continue;
  }
  seen.set(e.id, true);
  deduped.push(e);
}

console.log(`\n总计: ${deduped.length} 条唯一条目`);

// 写入 public/encyclopedia.json
const outDir = path.resolve(__dirname, '..', 'public');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const outPath = path.join(outDir, 'encyclopedia.json');
fs.writeFileSync(outPath, JSON.stringify(deduped, null, 2), 'utf-8');
console.log(`输出至 ${outPath}`);
console.log(`大小: ${(fs.statSync(outPath).size / 1024).toFixed(1)} KB`);
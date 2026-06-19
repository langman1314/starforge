const fs = require('fs');
const path = require('path');

// 加载核心数据文件（从 encyclopedia/ 目录）
const BASE = path.resolve(__dirname, '..', '..', 'encyclopedia');

// 需要手动映射的 populate 文件路径
const populateFiles = [
  path.join(BASE, 'populate_core.js'),
  path.join(BASE, 'data', 'characters', 'populate_characters.js'),
  path.join(BASE, 'data', 'factions', 'populate_factions.js'),
  path.join(BASE, 'data', 'locations', 'populate_locations.js'),
  path.join(BASE, 'data', 'systems', 'populate_systems.js'),
  path.join(BASE, 'data', 'tech', 'populate_tech.js'),
  path.join(BASE, 'data', 'creatures', 'populate_creatures.js'),
  path.join(BASE, 'data', 'plot', 'populate_plot.js'),
  path.join(BASE, 'data', 'writing', 'populate_cool_moments.js'),
  path.join(BASE, 'data', 'writing', 'populate_forbidden.js'),
  path.join(BASE, 'data', 'writing', 'populate_writing_guide.js'),
];

let allEntries = [];

for (const file of populateFiles) {
  if (!fs.existsSync(file)) {
    console.warn(`Skipping (not found): ${file}`);
    continue;
  }
  try {
    delete require.cache[require.resolve(file)];
    const mod = require(file);
    const key = Object.keys(mod).find(k => k.startsWith('ENTRIES_'));
    if (key && Array.isArray(mod[key])) {
      // 过滤掉示例条目
      const valid = mod[key].filter(e => e && e.id && e.id !== 'EXAMPLE-001');
      allEntries.push(...valid);
      console.log(`Loaded ${valid.length} entries from ${path.basename(file)}`);
    }
  } catch (err) {
    console.error(`Error loading ${path.basename(file)}:`, err.message);
  }
}

// 去重
const seen = new Set();
const deduped = [];
for (const e of allEntries) {
  if (seen.has(e.id)) {
    console.warn(`Duplicate: ${e.id}`);
    continue;
  }
  seen.add(e.id);
  deduped.push(e);
}

console.log(`\nTotal: ${deduped.length} unique entries`);

// 写入 public/encyclopedia.json
const outDir = path.resolve(__dirname, '..', 'public');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const outPath = path.join(outDir, 'encyclopedia.json');
fs.writeFileSync(outPath, JSON.stringify(deduped, null, 2), 'utf-8');
console.log(`Written to ${outPath}`);
console.log(`Size: ${(fs.statSync(outPath).size / 1024).toFixed(1)} KB`);
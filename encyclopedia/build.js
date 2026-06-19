// ============================================================
//  STARFORGE 百科 - 数据合并构建脚本
//  将所有数据文件合并到 index.html 中
// ============================================================
const fs = require('fs');
const path = require('path');

const BASE = __dirname;

// 加载所有数据文件
const core = require(path.join(BASE, 'populate_core.js'));
const characters = require(path.join(BASE, 'data', 'characters', 'populate_characters.js'));
const factions = require(path.join(BASE, 'data', 'factions', 'populate_factions.js'));
const locations = require(path.join(BASE, 'data', 'locations', 'populate_locations.js'));
const systems = require(path.join(BASE, 'data', 'systems', 'populate_systems.js'));
const tech = require(path.join(BASE, 'data', 'tech', 'populate_tech.js'));
const creatures = require(path.join(BASE, 'data', 'creatures', 'populate_creatures.js'));
const plot = require(path.join(BASE, 'data', 'plot', 'populate_plot.js'));
const coolMoments = require(path.join(BASE, 'data', 'writing', 'populate_cool_moments.js'));
const forbidden = require(path.join(BASE, 'data', 'writing', 'populate_forbidden.js'));
const writingGuide = require(path.join(BASE, 'data', 'writing', 'populate_writing_guide.js'));

// 合并所有条目
const allEntries = [
  ...core.ENTRIES_TO_ADD,
  ...characters.ENTRIES_CHARACTERS,
  ...factions.ENTRIES_FACTIONS,
  ...locations.ENTRIES_LOCATIONS,
  ...systems.ENTRIES_SYSTEMS,
  ...tech.ENTRIES_TECH,
  ...creatures.ENTRIES_CREATURES,
  ...plot.ENTRIES_PLOT,
  ...coolMoments.ENTRIES_COOL_MOMENTS,
  ...forbidden.ENTRIES_FORBIDDEN,
  ...writingGuide.ENTRIES_WRITING_GUIDE,
];

console.log('Loaded ' + allEntries.length + ' entries total');

// 读取 index.html
const indexPath = path.join(BASE, 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

// 将条目数组序列化为 JSON 格式字符串（作为 JS 对象字面量嵌入）
const entriesJson = JSON.stringify(allEntries, null, 2);

// 替换空的 entries 数组占位
// 查找 'entries: [\n    // Example entry' 并替换
const oldStr = 'entries: [\n    // Example entry to demonstrate format:';
const markerEnd = '  ]\n};\n\n/* ==================================================================';

// 查找起始位置
const startIdx = html.indexOf('entries: [\n    // Example entry');
const endIdx = html.indexOf(markerEnd);

if (startIdx === -1 || endIdx === -1) {
  console.error('ERROR: Could not find placeholder in index.html');
  process.exit(1);
}

// 提取 markerEnd 之前的部分 (保持缩进)
const beforeEntries = html.substring(0, startIdx);
const afterEntries = html.substring(endIdx);

// 构建新内容
const newHtml = beforeEntries + 'entries: ' + entriesJson + '\n  ' + afterEntries;

fs.writeFileSync(indexPath, newHtml, 'utf-8');
console.log('Successfully merged ' + allEntries.length + ' entries into index.html');
console.log('Output file size: ' + (fs.statSync(indexPath).size / 1024).toFixed(1) + ' KB');

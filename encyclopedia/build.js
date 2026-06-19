// ============================================================
//  STARFORGE 百科 - 数据合并构建脚本
//  【注意】此为旧版（LEGACY）构建脚本，不再作为主流程维护。
//  当前主线是 encyclopedia-vue 前端项目。
//  新增的数据目录（resources/disasters/foreshadowing/world-rules/
//  chronology/validation）未接入此脚本，旧版可能无法完整构建。
//  所有新功能仅在 Vue 版中实现。
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
// 查找 entries 数组的起始和结束位置
const startMarker = '// ---- Entries (fill these arrays) ----';
const endMarker = '/* ==================================================================\n   ENGINE';

// 查找起始位置（entries: [ 之后）
const startLine = html.indexOf('entries: [');
const endIdx = html.indexOf(endMarker);

// 从 startLine 往前找到行首
const startIdx = startLine;

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

// ============================================================
//  STARFORGE 百科全书 - 百科系统校验规则条目数据
//  文件: populate_validation.js
//  说明: 定义百科系统自身的校验规则和元数据管理条目 (代码前缀 VAL)
// ============================================================

const ENTRIES_VALIDATION = [
  // ============================================================
  //  VAL-001: 条目字段校验规则 (field-validation-rules)
  // ============================================================
  {
    id: 'field-validation-rules',
    name: '条目字段校验规则',
    code: 'VAL-001',
    importance: 'S',
    canonLevel: 'core',
    aliases: ['字段规范', '数据验证'],
    category: 'validation',
    summary: '所有百科条目的字段格式和内容校验规则，确保新创建的条目和后续更新的条目符合数据规范。',
    detail: '<p>以下为百科系统中所有条目必须遵循的字段格式与内容校验规则。</p><hr><h3>一、必填字段检查清单</h3><p>以下字段为每个条目必须填写的字段，缺少任意一个将导致条目不符合数据规范：</p><ul><li><strong>id</strong> — 条目唯一标识符，使用小写字母和连字符（kebab-case），如 <code>field-validation-rules</code></li><li><strong>name</strong> — 条目中文名称</li><li><strong>code</strong> — 条目代码，格式为前缀-三位数字，如 <code>VAL-001</code></li><li><strong>summary</strong> — 条目简短概述，一句话概括条目核心内容</li><li><strong>detail</strong> — 条目详细正文，支持 HTML 格式</li><li><strong>category</strong> — 条目所属类别，必须为已注册的数据类别</li><li><strong>importance</strong> — 条目重要等级</li><li><strong>canonLevel</strong> — 条目正典等级</li></ul><hr><h3>二、11个扩展字段的格式要求</h3><p>每个条目的11个扩展字段必须遵循以下格式：</p><ul><li><strong>surfaceSetting（表层设定）</strong> — 字符串类型，描述该条目在表层叙事中的呈现形态。必须用一句话概括世界观层面的可见设定。</li><li><strong>deepTruth（深层真相）</strong> — 字符串类型，揭示表层设定之下隐藏的真实本质。是世界观层次最深的信息。</li><li><strong>narrativeFunction（叙事功能）</strong> — 字符串类型，描述该条目在故事中承担的叙事角色和作用。</li><li><strong>coolPointFunction（爽点功能）</strong> — 字符串类型，描述该条目在故事中贡献的爽点来源和读者体验。</li><li><strong>limitations（限制与代价）</strong> — 字符串类型，描述该条目的能力边界、使用限制或付出的代价。</li><li><strong>revealStage（揭秘阶段）</strong> — 字符串类型，描述该条目的深层真相在故事各阶段的揭露节奏。</li><li><strong>relatedForeshadowing（相关伏笔）</strong> — 字符串（兼容数组格式），列出与该条目相关的伏笔。</li><li><strong>futureDevelopment（未来发展）</strong> — 字符串（兼容数组格式），描述该条目在后续剧情中的发展走向。</li><li><strong>forbiddenContradictions（禁忌矛盾）</strong> — 字符串类型，列出该条目在创作中必须避免的设定矛盾和错误写法。</li><li><strong>aiWritingNotes（AI写作指引）</strong> — 字符串类型，为AI辅助创作提供该条目的写作注意事项。</li></ul><hr><h3>三、code 格式规范</h3><p>条目代码由三部分组成，格式为 <code>前缀-三位数字</code>：</p><ul><li><strong>前缀</strong> — 大写字母，代表条目所属类别（如 CHR=人物，LOC=地点，FAC=势力，TEC=科技，SYS=系统，WR=世界规则，VAL=验证，等等）</li><li><strong>连字符</strong> — 必须为半角连字符 <code>-</code></li><li><strong>三位数字</strong> — 从001开始递增，如 <code>CHR-001</code>、<code>LOC-002</code>、<code>FAC-003</code></li><li>示例：<code>VAL-001</code>、<code>CHR-001</code>、<code>WR-001</code></li></ul><hr><h3>四、importance 取值规范</h3><p>importance（重要等级）有四个量级：</p><ul><li><strong>S</strong> — 核心级，世界观基础设定、全书主角、决定性事件。必须精确无误。</li><li><strong>A</strong> — 重要级，主要角色、关键势力、重大事件。允许少量容错。</li><li><strong>B</strong> — 辅助级，次要角色、局部势力、普通事件。可以有一定模糊空间。</li><li><strong>C</strong> — 参考级，背景信息、提及条目、补充说明。允许较大弹性。</li></ul><hr><h3>五、canonLevel 取值规范</h3><p>canonLevel（正典等级）有四个量级：</p><ul><li><strong>core</strong> — 核心正典，不可更改的底层设定。任何与core层级冲突的创作内容都必须以core为准。</li><li><strong>confirmed</strong> — 已确认设定，经过审核确认的条目。修改需经过评审。</li><li><strong>draft</strong> — 草稿状态，尚未审核的条目。允许较大幅度的修改和调整。</li><li><strong>deprecated</strong> — 已废弃，不再使用的条目。保留用于历史记录。</li></ul><hr><h3>六、spoilerLevel 取值规范</h3><p>spoilerLevel（剧透等级）有四个量级：</p><ul><li><strong>none</strong> — 无剧透，可公开信息，适用于基础设定类条目。</li><li><strong>minor</strong> — 轻度剧透，包含部分后续剧情暗示。</li><li><strong>major</strong> — 重度剧透，包含关键剧情转折或核心秘密。</li><li><strong>final</strong> — 终局剧透，包含故事结局或终极真相。</li></ul><hr><h3>七、related 字段引用规则</h3><p>所有 <code>related*</code> 字段（包括 <code>relatedCharacters</code>、<code>relatedFactions</code>、<code>relatedLocations</code>、<code>relatedEvents</code> 等）中引用的 code 值必须满足以下条件：</p><ul><li>被引用的 code 必须存在于某一条目中（不允许悬空引用）</li><li>引用不区分条目类别，但建议引用同类或语义相关的条目</li><li>空数组表示无关联，不允许使用 <code>null</code> 或 <code>undefined</code></li></ul>',
    firstAppearance: '项目初始化',
    spoilerLevel: 'none',
    status: 'active',
    tags: ['验证', '字段规范', '数据校验', '元数据'],
    surfaceSetting: '百科系统中对条目数据的格式和内容约束规则，是元数据管理的基础规范。',
    deepTruth: '这些校验规则是确保百科数据长期可维护、可扩展的核心保障，任何新增条目都必须严格遵守。',
    narrativeFunction: '作为元数据规范，指导所有条目的创建和更新，确保百科系统的数据一致性。',
    coolPointFunction: '为AI辅助创作提供明确的格式约束，减少数据质量问题的产生。',
    limitations: '校验规则不能覆盖所有语义层面的正确性，仅能保证格式合规和基础逻辑检查。',
    revealStage: '项目初始化即完整公开，后续随百科系统演化定期更新。',
    relatedForeshadowing: [],
futureDevelopment: '校验规则将随百科条目的增加和类别的扩展而持续更新，后期可能引入自动化校验脚本。',
    forbiddenContradictions: '校验规则之间不能相互矛盾；不能对同类字段设定不一致的格式要求。',
    aiWritingNotes: '创建新条目时必须逐一对照本校验规则检查所有字段；扩展字段中的伏笔和发展内容应与其他条目保持一致。'
  },

  // ============================================================
  //  VAL-002: 一致性检查清单 (consistency-checklist)
  // ============================================================
  {
    id: 'consistency-checklist',
    name: '一致性检查清单',
    code: 'VAL-002',
    importance: 'S',
    canonLevel: 'core',
    aliases: ['矛盾检查', '前后一致性'],
    category: 'validation',
    summary: '百科系统的一致性校验规则——确保跨条目关联的正确性、避免设定矛盾、维护世界观逻辑闭环。',
    detail: '<p>以下为百科系统中跨条目一致性检查的规则清单，用于确保世界观设定的逻辑闭环和避免矛盾。</p><hr><h3>一、跨条目引用校验规则</h3><p>所有 <code>relatedCharacters</code>、<code>relatedFactions</code>、<code>relatedLocations</code>、<code>relatedEvents</code> 字段中引用的 code 必须满足以下条件：</p><ul><li>被引用的 code 必须在百科系统某一条目中真实存在</li><li>不允许出现悬空引用（引用了不存在的条目代码）</li><li>引用关系应当是双向或可追溯的——若条目A引用了条目B，条目B的相关字段也应考虑添加对条目A的反向引用</li><li>同一类别内的引用优先于跨类别引用，但不禁止跨类别引用</li></ul><hr><h3>二、战力体系一致性规则</h3><p>人物战力等级与科技树等级之间必须保持逻辑一致性：</p><ul><li>人物的个人战力等级不能超出当前科技树支撑的上限</li><li>只有科技树中存在对应级别的装备/技术时，人物才能合法拥有该级别的战斗能力</li><li>跨级别战斗必须有合理的设定解释（如科技代差、信息差、特殊天赋等）</li><li>战力提升必须有对应的资源消耗和训练积累过程</li></ul><hr><h3>三、时间线一致性规则</h3><p>所有条目的 <code>firstAppearance</code>（首次出现）字段必须与作品时间线保持一致：</p><ul><li>条目首次出现的章节不能早于相关前置条目的首次出现章节</li><li>如果条目A依赖条目B的存在（如人物依赖某个地点的出现），则A的首次出现不能早于B</li><li>时间线上后发生的事件不能引用尚未出现的条目或概念</li><li>跨卷引用时，确保被引用的条目在对应卷号的时间点已经存在</li></ul><hr><h3>四、科技树一致性规则</h3><p>科技树条目（TEC系列）的依赖关系必须满足以下规则：</p><ul><li>所需先决科技（prerequisite tech）必须先于当前科技出现在时间线上</li><li>不能出现科技依赖循环（A依赖B、B依赖A）</li><li>低级科技不能依赖高等级科技作为前置</li><li>科技解锁所需的资源量必须与当前剧情进展阶段匹配</li></ul><hr><h3>五、伏笔一致性规则</h3><p>伏笔条目（FO系列）的状态和兑现必须满足以下规则：</p><ul><li>已标记为 <code>paid_off</code>（已兑现）的伏笔必须在对应的 <code>payoffChapter</code> 字段中标注兑现章节</li><li>已兑现的伏笔不能再次被标记为未兑现状态</li><li>伏笔的兑现内容必须与伏笔铺设时暗示的方向一致，不能出现"虚假兑付"</li><li>同一伏笔不能在多个不同的时间点各兑现一次（除非明确标注为"多层伏笔"）</li></ul><hr><h3>六、地图一致性规则</h3><p>角色位置和地点信息必须保持地图层面的逻辑一致：</p><ul><li>角色的当前位置必须在相应地图区域内合理存在</li><li>角色不能同时出现在两个互不相连的地图区域（除非有传送能力的设定支持）</li><li>地点之间的距离和通行时间需要与作品中的设定保持一致</li><li>地图区域的层级关系（如"黑松林区包含废墟聚集地"）不能出现矛盾</li></ul>',
    firstAppearance: '项目初始化',
    spoilerLevel: 'none',
    status: 'active',
    tags: ['验证', '一致性', '检查清单', '质量管控'],
    surfaceSetting: '百科系统中用于检查跨条目一致性和设定逻辑闭环的规则清单。',
    deepTruth: '一致性检查是维持世界观长期不崩溃的核心保障，比字段格式校验更为重要。设定矛盾是世界观类百科最常见也最致命的质量问题。',
    narrativeFunction: '作为质量管控工具，确保百科条目之间的关联关系和逻辑链条正确无误。',
    coolPointFunction: '通过一致性检查维持世界观的可信度，间接提升读者对作品设定的沉浸感。',
    limitations: '部分一致性检查（如战力合理性）需要人工判断，无法完全自动化。',
    revealStage: '项目初始化即完整公开，后续随条目增加和规则完善持续更新。',
    relatedForeshadowing: [],
futureDevelopment: '一致性检查规则将随百科系统的发展而演化，后期可能开发自动化检查脚本。',
    forbiddenContradictions: '一致性规则之间不能相互冲突；不能对同一类检查在不同规则条目中给出不同的要求。',
    aiWritingNotes: '在创建新条目或更新现有条目时，必须同时检查所有六类一致性规则；跨条目引用修改后应重新验证相关的一致性链条。'
  }
];

// ============================================================
//  导出
// ============================================================
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ENTRIES_VALIDATION };
}
// ============================================================
//  STARFORGE 百科全书 - 创作规范条目数据
//  文件: populate_writing_guide.js
//  说明: 定义文风要求、章节节奏、开篇要求、一致性规范、章节模板、连载节奏等创作规范
// ============================================================

const ENTRIES_WRITING_GUIDE = [
  {
    id: 'guide-style',
    name: '文风要求',
    aliases: ['写作风格', '语言风格'],
    category: 'writing-guide',
    summary: '面向免费男频读者的语言风格规范：直白、快节奏、高信息密度、每章有钩子。',
    detail: '<p><strong>适用平台：</strong>番茄小说、七猫免费小说等免费男频平台</p><p><strong>核心原则：</strong></p><ul><li>语言直白：使用简洁明了的短句，避免复杂从句和生僻词汇。</li><li>节奏快：每章至少推进一个关键剧情点，不拖泥带水。</li><li>信息密度高：每段话都应包含有效信息，避免空泛的风景描写或气氛渲染。</li><li>每章都有钩子：章末必须留下悬念、新发现、新危机或新爽点，驱动读者点击下一章。</li><li>少写大段空泛抒情：用行动和对话来传递情绪，而非大段的心理描写。</li><li>少写复杂哲学：世界观设定通过事件和对话逐步揭示，不要用大段旁白解释。</li><li>多写行动、收益、震惊、危机：每一个场景都应包含其中至少一个要素。</li><li>主角不废话、不圣母：主角的对话应当简洁有力，行动果断，不做无意义的自我反思。</li><li>配角有功能、不拖剧情：每个配角都有明确的剧情作用，不设置无意义的填充角色。</li><li>世界观通过事件逐步揭露：不要在新手期就用大段文字解释整个世界的来龙去脉。</li></ul><p><strong>字数建议：</strong>每章2000-3000字。低于2000字信息量不足，高于3000字可能影响追读率。</p><p><strong>段落建议：</strong>每段不超过3-5行，多分段增加阅读节奏感。对话单独成段。</p>',
    firstAppearance: '',
    relatedCharacters: [],
    relatedFactions: [],
    relatedLocations: [],
    relatedEvents: [],
    spoilerLevel: 'none',
    status: 'active',
    tags: ['创作规范', '文风', '语言', '节奏']
  },
  {
    id: 'guide-chapter-rhythm',
    name: '章节节奏规范',
    aliases: ['章节奏', '剧情节奏模板'],
    category: 'writing-guide',
    summary: '每章的标准结构：开头承接上章钩子、中段主角行动或危机升级、后段获得收益或制造反转、结尾抛出新钩子。',
    detail: '<p><strong>标准章节结构：</strong></p><p><strong>开头（前200字）：</strong>承接上一章的章末钩子。如果上章结尾是主角发现了一个新遗迹，本章开头应当直接从探索遗迹开始，而不是从主角起床开始写。</p><p><strong>中段（1000-1500字）：</strong>主角行动或危机升级。这是本章的核心内容，需要包含以下至少两项：主角采取行动（探索、战斗、制造、交易）、遭遇新的危机或障碍、获得新的信息或资源、与重要角色互动。</p><p><strong>后段（500-800字）：</strong>获得收益或制造反转。主角的行动应当产生实质性的结果——获得资源、升级装备、击败敌人、发现线索等。如果可能，在这一段设置一个小的反转或意外。</p><p><strong>结尾（最后200字）：</strong>抛出新的钩子。章末必须包含一个驱动读者点开下一章的元素：新危机的征兆、新发现的线索、排行榜变化、敌对势力的行动、灾难倒计时的更新等。</p><p><strong>每章必含清单：</strong>每章最好至少包含以下之一——新资源获得、新危机出现、新敌人登场、新装备解锁、新情报获取、新交易完成、新榜单变化、新人物反应、新伏笔埋设、新爽点释放。</p>',
    firstAppearance: '',
    relatedCharacters: [],
    relatedFactions: [],
    relatedLocations: [],
    relatedEvents: [],
    spoilerLevel: 'none',
    status: 'active',
    tags: ['创作规范', '章节节奏', '结构', '钩子']
  },
  {
    id: 'guide-opening',
    name: '开篇三章规范',
    aliases: ['前三章要求', '开局规范'],
    category: 'writing-guide',
    summary: '前三章必须完成穿越觉醒、系统展示、第一块碎片发现、灾难预告、废弃矿洞探索等关键剧情任务。',
    detail: '<p><strong>第一章必须完成：</strong></p><ol><li>全民穿越事件发生——主角从蓝星突然转移到异世界。</li><li>主角在木屋中醒来，获得基础物资。</li><li>聊天频道开启，混乱和恐慌在频道中蔓延。</li><li>主角发现自己觉醒的天赋（文明回收系统）与其他人的完全不同。</li><li>捡到第一块黑色废铁——系统识别为旧日文明舰体装甲碎片。</li><li>结尾出现"余火号"字样，埋下第一个核心伏笔。</li></ol><p><strong>第二章必须完成：</strong></p><ol><li>主角回收第一块碎片，获得钛晶合金和权限代码碎片。</li><li>用回收材料强化木屋的地下结构。</li><li>其他穿越者嘲笑主角收垃圾——建立"废铁无用"的认知反差。</li><li>通过系统或旧日AI碎片提示，发现七天后极寒夜灾难的信息。</li><li>结尾主角发现废弃矿洞坐标——向读者暗示即将到来的探索。</li></ol><p><strong>第三章必须完成：</strong></p><ol><li>主角探索废弃矿洞——这是书中第一个重要场景副本。</li><li>遭遇矿洞中的变异蜘蛛等怪物——第一次展示战斗和系统弱点识别。</li><li>发现旧日能源管道——修复初级供暖核心。</li><li>聊天频道中有人开始冻伤、缺火——验证灾难预告的真实性。</li><li>结尾主角意识到第一桶金的机会来了——即将在交易频道展开第一次爽点操作。</li></ol><p><strong>前三章禁忌：</strong>不要在第一章大段解释世界观；不要让主角在第一章就获得逆天能力；不要让其他穿越者全部降智；不要让系统一口气解释所有功能；不要在前三章引入太多人物。</p>',
    firstAppearance: '',
    relatedCharacters: ['protagonist-linjin', 'protagonist-recycle-system'],
    relatedFactions: [],
    relatedLocations: ['loc-black-pine', 'loc-protagonist-cabin', 'loc-abandoned-mine', 'loc-polluted-stream'],
    relatedEvents: ['sys-disaster-1'],
    spoilerLevel: 'none',
    status: 'active',
    tags: ['创作规范', '开篇', '前三章', '开局']
  },
  {
    id: 'guide-consistency',
    name: '一致性校验规范',
    aliases: ['一致性检查', '防矛盾规范'],
    category: 'writing-guide',
    summary: '每写一章前必须读取当前卷大纲、主角状态、资源、地图、伏笔等资料，写完后必须更新所有变化。',
    detail: '<p><strong>写前必读清单：</strong></p><ol><li>当前卷大纲——明确本卷的核心剧情目标和节奏。</li><li>当前章节前后剧情——确保本章与前后章的逻辑衔接。</li><li>主角当前能力——避免在主角未掌握某能力时使用该能力。</li><li>主角当前资源——避免出现主角已消耗但未补充的资源被再次使用。</li><li>主角当前领地等级——确保领地功能的描写与等级一致。</li><li>当前区域地图——确保地点移动的逻辑和距离描写正确。</li><li>当前已登场人物——避免把未登场的人物当作已登场来处理。</li><li>当前伏笔状态——区分已回收、未回收和进行中的伏笔。</li><li>当前敌对势力——了解正在交战或对峙的势力信息。</li><li>当前灾难倒计时——确保灾难的时间节点准确。</li><li>当前排行榜状态——确保排名变化有逻辑依据。</li><li>禁止矛盾清单——逐条对照，确保没有违反。</li></ol><p><strong>写后更新清单：</strong></p><ol><li>新增人物——记录首次登场的人物。</li><li>新增地点——记录首次出现的地点。</li><li>新增道具——记录主角获得的新装备或重要物品。</li><li>资源变化——更新主角和重要势力的资源储量。</li><li>新增伏笔——记录本章新埋下的伏笔。</li><li>已回收伏笔——标记本章回收的伏笔。</li><li>战力变化——更新主角和重要角色的战力等级。</li><li>领地变化——更新领地等级和功能模块。</li><li>人物关系变化——记录重要人物关系的变化。</li><li>下一章钩子——明确下一章的开篇引力点。</li></ol>',
    firstAppearance: '',
    relatedCharacters: [],
    relatedFactions: [],
    relatedLocations: [],
    relatedEvents: [],
    spoilerLevel: 'none',
    status: 'active',
    tags: ['创作规范', '一致性', '校验', '更新']
  },
  {
    id: 'guide-chapter-template',
    name: '章节创作模板',
    aliases: ['章节模板', '写作模板'],
    category: 'writing-guide',
    summary: '单章创作的标准化模板，包含章节信息、剧情展开、爽点检查、伏笔检查等字段。',
    detail: '<p><strong>章节信息：</strong></p><ul><li>卷数：第X卷</li><li>章号：第XXX章</li><li>章节标题：XXX</li><li>本章字数：XXXX字</li><li>剧情时间点：穿越第X天</li></ul><p><strong>剧情结构：</strong></p><ul><li>开头承接（上章钩子回顾）：XXX</li><li>中段展开（核心剧情）：XXX</li><li>后段转折/收益：XXX</li><li>章末钩子（下一章引力点）：XXX</li></ul><p><strong>本章要素：</strong></p><ul><li>[ ] 新资源获得——是什么：XXX</li><li>[ ] 新危机出现——是什么：XXX</li><li>[ ] 新敌人登场——是谁：XXX</li><li>[ ] 新装备/科技解锁——是什么：XXX</li><li>[ ] 新情报获取——是什么：XXX</li><li>[ ] 新交易/经济操作——是什么：XXX</li><li>[ ] 排行榜变化——变化内容：XXX</li><li>[ ] 人物反应/群像描写——是什么：XXX</li><li>[ ] 新伏笔埋设——是什么：XXX</li><li>[ ] 爽点释放——是什么：XXX</li></ul><p><strong>一致性检查：</strong></p><ul><li>[ ] 主角能力未超出当前设定</li><li>[ ] 主角资源数量准确</li><li>[ ] 领地等级和功能匹配</li><li>[ ] 地图位置和距离合理</li><li>[ ] 已登场人物行为符合人设</li><li>[ ] 伏笔状态正确</li><li>[ ] 战力体系未冲突</li><li>[ ] 灾难时间线准确</li><li>[ ] 排行榜变化有依据</li><li>[ ] 没有违反禁止清单中的任何条目</li></ul><p><strong>章末总结：</strong></p><ul><li>新增人物：XXX</li><li>新增地点：XXX</li><li>新增道具：XXX</li><li>资源变化：XXX</li><li>伏笔状态：XXX</li><li>战力变化：XXX</li><li>下一章钩子：XXX</li></ul>',
    firstAppearance: '',
    relatedCharacters: [],
    relatedFactions: [],
    relatedLocations: [],
    relatedEvents: [],
    spoilerLevel: 'none',
    status: 'active',
    tags: ['创作规范', '章节模板', '写作', '检查清单']
  },
  {
    id: 'guide-serialization',
    name: '连载节奏表',
    aliases: ['更新节奏', '连载规范'],
    category: 'writing-guide',
    summary: '长篇连载的节奏控制规范，包括每日更新量、剧情高潮密度、爽点频率、伏笔回收周期等。',
    detail: '<p><strong>更新节奏：</strong></p><ul><li>建议日更：4000-6000字（2-3章）</li><li>最低日更：2000字（1章），低于此标准可能导致追读率下降。</li><li>爆更策略：关键剧情节点（新卷开启、大高潮、名场面）时可加更至8000-10000字。</li><li>休息策略：每完成一卷后可适当减更（如日更1章）过渡，但不宜超过3天。</li></ul><p><strong>剧情高潮密度：</strong></p><ul><li>小高潮：每5-10章一次（小型战斗、资源突破、新装备解锁）</li><li>中高潮：每15-25章一次（击败重要敌人、领地升级、区域合并事件）</li><li>大高潮：每卷一次（卷末爆点、击杀BOSS、重大真相揭露）</li><li>全书级高潮:每两卷一次（星系探索开启、文明战争转折、核心真相揭露）</li></ul><p><strong>爽点频率：</strong></p><ul><li>微爽点：每章至少1个（小收益、小打脸、小进步）</li><li>中爽点：每3-5章1个（装备升级、击败精英敌人、交易获利）</li><li>大爽点：每10-15章1个（跨阶段突破、领地升级、碾压强敌）</li><li>超大爽点：每卷至少1个（卷末爆点、名场面、核心爽点兑现）</li></ul><p><strong>伏笔回收周期：</strong></p><ul><li>短期伏笔：同卷内回收（通常在20章内）</li><li>中期伏笔：跨1-2卷回收（通常在40-80章内）</li><li>长期伏笔：跨3-5卷回收（核心世界观伏笔，在后期集中回收）</li><li>全书伏笔：最终卷回收（如第一块碎片、系统真相、第七轮人类）</li></ul><p><strong>节奏陷阱：</strong></p><ul><li>避免连续3章以上没有爽点——读者会失去追更欲望。</li><li>避免连续2章以上没有进展——剧情需要持续向前推进。</li><li>避免连续使用相同模式的爽点——会产生审美疲劳。</li><li>避免新卷开头节奏过慢——每卷开头都需要迅速抓住读者。</li><li>避免在章末使用虚假钩子——给读者的承诺必须兑现。</li></ul>',
    firstAppearance: '',
    relatedCharacters: [],
    relatedFactions: [],
    relatedLocations: [],
    relatedEvents: [],
    spoilerLevel: 'none',
    status: 'active',
    tags: ['创作规范', '连载', '节奏', '更新', '爽点频率']
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ENTRIES_WRITING_GUIDE };
}
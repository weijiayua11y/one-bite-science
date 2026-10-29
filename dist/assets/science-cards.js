window.ScienceCards = [
  {
    "id": "molecule-detour",
    "category": "分子",
    "prompt": "示意动画里，气体分子朝右走了一小段又折返。这是否违背扩散规律？",
    "choices": [
      "违背，分子必须一直朝浓度低处前进",
      "不违背，单个分子的运动可以折返",
      "违背，分子扩散时不能碰撞"
    ],
    "answerIndex": 1,
    "explanation": "扩散的净趋势来自大量粒子的随机运动。单个分子并不识别目标，可以碰撞、转向和折返。",
    "sourceUrl": "https://openstax.org/books/chemistry-2e/pages/9-4-effusion-and-diffusion-of-gases",
    "fictional": true,
    "difficulty": "入门"
  },
  {
    "id": "molecule-balanced-door",
    "category": "分子",
    "prompt": "同种气体在温度相同、无外加驱动的相通容器两侧已达到相同浓度，接下来会怎样？",
    "choices": [
      "所有分子停止",
      "只有右侧分子继续移动",
      "分子仍来回运动，宏观上没有净转移"
    ],
    "answerIndex": 2,
    "explanation": "浓度均匀不等于微观静止。平衡时双向转移仍在进行，平均相互抵消。",
    "sourceUrl": "https://openstax.org/books/chemistry-2e/pages/9-4-effusion-and-diffusion-of-gases",
    "fictional": false,
    "difficulty": "入门"
  },
  {
    "id": "molecule-collision-path",
    "category": "分子",
    "prompt": "气体分子本来跑得很快，为什么气味传到远处仍需要时间？",
    "choices": [
      "途中频繁碰撞转向，走过的路不等于直线位移",
      "分子先商量传播顺序",
      "分子在被闻到之前都不运动"
    ],
    "answerIndex": 0,
    "explanation": "分子会经历许多碰撞，方向不断改变。运动速度快，仍不意味着能沿直线迅速跨越整间房间；实际气味传播也可能包含空气流动。",
    "sourceUrl": "https://openstax.org/books/chemistry-2e/pages/9-4-effusion-and-diffusion-of-gases",
    "fictional": false,
    "difficulty": "进阶"
  },
  {
    "id": "molecule-speed-spread",
    "category": "分子",
    "prompt": "同一温度的同种气体中，每个分子的瞬时速率都一样吗？",
    "choices": [
      "一样，温度规定了唯一速率",
      "不一样，分子速率存在分布",
      "只有撞到墙时才有速率"
    ],
    "answerIndex": 1,
    "explanation": "气体中有快有慢。温度与整体平均动能有关，不把所有分子锁定在同一个速率上。",
    "sourceUrl": "https://openstax.org/books/chemistry-2e/pages/9-5-the-kinetic-molecular-theory",
    "fictional": false,
    "difficulty": "入门"
  },
  {
    "id": "molecule-wall-pressure",
    "category": "分子",
    "prompt": "在理想气体模型中，容器壁感受到的气体压力主要来自什么？",
    "choices": [
      "分子只向下堆积",
      "气体颜色变深",
      "分子与容器壁的碰撞"
    ],
    "answerIndex": 2,
    "explanation": "气体压力可由大量分子撞击容器壁来理解。这个模型用微观运动解释宏观压力。",
    "sourceUrl": "https://openstax.org/books/chemistry-2e/pages/9-5-the-kinetic-molecular-theory",
    "fictional": false,
    "difficulty": "入门"
  },
  {
    "id": "molecule-heat-average",
    "category": "分子",
    "prompt": "对同种理想气体升温，哪句话最准确？",
    "choices": [
      "分子平均平动动能增加",
      "每个分子的质量增加",
      "每个分子都停止碰撞"
    ],
    "answerIndex": 0,
    "explanation": "理想气体的平均平动动能随绝对温度增加。改变温度不会把同种分子变得更重，也不意味着每个分子都按相同幅度加速。",
    "sourceUrl": "https://openstax.org/books/chemistry-2e/pages/9-5-the-kinetic-molecular-theory",
    "fictional": false,
    "difficulty": "进阶"
  },
  {
    "id": "molecule-closed-count",
    "category": "分子",
    "prompt": "虚构模型：密闭盒里有 80 个不发生反应的粒子，打开内部隔板后，盒内粒子总数是多少？",
    "choices": [
      "变成 160 个",
      "取决于粒子去了哪一侧",
      "仍是 80 个"
    ],
    "answerIndex": 2,
    "explanation": "打开内部隔板只改变粒子可到达的空间。既没有流出、流入或反应，粒子总数不会凭空改变；这些数字仅为虚构教学设置。",
    "sourceUrl": "https://openstax.org/books/chemistry-2e/pages/1-2-phases-and-classification-of-matter",
    "fictional": true,
    "difficulty": "入门"
  },
  {
    "id": "molecule-empty-looking",
    "category": "分子",
    "prompt": "透明气体看不见，能因此说它“不占空间、没有质量”吗？",
    "choices": [
      "能，看不见就不是物质",
      "不能，气体也有质量并占据空间",
      "只能在有颜色时才有质量"
    ],
    "answerIndex": 1,
    "explanation": "透明是光学表现，不能用来判断是否是物质。气体具有质量，也会占据容器的空间。",
    "sourceUrl": "https://openstax.org/books/chemistry-2e/pages/1-2-phases-and-classification-of-matter",
    "fictional": false,
    "difficulty": "入门"
  },
  {
    "id": "molecule-water-identity",
    "category": "分子",
    "prompt": "纯水从液态变成水蒸气，就一定把水分子拆成氢气和氧气了吗？",
    "choices": [
      "没有，普通汽化是物态变化",
      "一定会，气态不能含水分子",
      "只有透明的蒸气才会拆分"
    ],
    "answerIndex": 0,
    "explanation": "普通汽化改变的是物态，不是把水化学分解。水蒸气仍由水分子组成；肉眼常见的白雾则主要是微小液滴。",
    "sourceUrl": "https://openstax.org/books/chemistry-2e/pages/1-2-phases-and-classification-of-matter",
    "fictional": false,
    "difficulty": "进阶"
  },
  {
    "id": "molecule-model-color",
    "category": "分子",
    "prompt": "教学图把两种气体画成绿色和橙色小球。仅凭这张图，能知道真实气体的颜色吗？",
    "choices": [
      "能，分子一定和小球同色",
      "能，所有气体都只有两种颜色",
      "不能，小球颜色可以只是区分类别的符号"
    ],
    "answerIndex": 2,
    "explanation": "粒子图属于模型表达。示意颜色、尺寸与数量可为便于理解而选择，不能直接当作样品的实测性质。",
    "sourceUrl": "https://openstax.org/books/chemistry-2e/pages/1-1-chemistry-in-context",
    "fictional": true,
    "difficulty": "入门"
  },
  {
    "id": "emulsion-zoom-in",
    "category": "乳液",
    "prompt": "示意乳液远看均匀，放大后却能看见油滴。该如何理解？",
    "choices": [
      "肉眼均匀就一定是分子溶液",
      "油滴分散在水中，外观均匀不等于分子溶解",
      "看见油滴说明油变成了固体"
    ],
    "answerIndex": 1,
    "explanation": "乳液是液滴分散体系。连续的水相与油滴之间仍有界面，不应把看似均匀直接称为分子溶液。",
    "sourceUrl": "https://openstax.org/books/chemistry-2e/pages/11-5-colloids",
    "fictional": true,
    "difficulty": "入门"
  },
  {
    "id": "emulsion-fewer-bigger",
    "category": "乳液",
    "prompt": "虚构显微观察中，相邻小油滴接触后合成了更大的油滴。哪种描述最贴切？",
    "choices": [
      "液滴发生聚并",
      "油分子消失",
      "油已经全部溶解"
    ],
    "answerIndex": 0,
    "explanation": "聚并是液滴合成更大液滴的过程，可促进乳液失稳。它不是油分子的消失或溶解。",
    "sourceUrl": "https://openstax.org/books/chemistry-2e/pages/11-5-colloids",
    "fictional": true,
    "difficulty": "入门"
  },
  {
    "id": "emulsion-shake-job",
    "category": "乳液",
    "prompt": "把不互溶的油和水搅拌时，搅拌最直接做了什么？",
    "choices": [
      "保证油水永不分开",
      "把油变成水",
      "提供机械作用，让一相形成液滴并分散"
    ],
    "answerIndex": 2,
    "explanation": "搅拌可形成初始分散，但不保证随后一直稳定。形成液滴与延缓液滴聚并，是相关但不同的问题。",
    "sourceUrl": "https://openstax.org/books/chemistry-2e/pages/11-5-colloids",
    "fictional": false,
    "difficulty": "入门"
  },
  {
    "id": "emulsion-boundary-role",
    "category": "乳液",
    "prompt": "为什么某些合适的表面活性乳化剂能在油水界面发挥作用？",
    "choices": [
      "因为它们的分子完全不与油水接触",
      "因为它们具有与水和油相互作用的不同部分",
      "因为它们能删除所有油分子"
    ],
    "answerIndex": 1,
    "explanation": "这类乳化剂含有亲水与亲油部分，可在界面发挥作用。不是所有乳化体系都仅靠同一种机制，也不能由此保证永久稳定。",
    "sourceUrl": "https://rockedu.rockefeller.edu/level/what-to-know-about-emulsions/",
    "fictional": false,
    "difficulty": "进阶"
  },
  {
    "id": "emulsion-continuous-phase",
    "category": "乳液",
    "prompt": "示意图中，一滴滴水被连续的油相包围。哪一相是分散相？",
    "choices": [
      "水，因为它以液滴形式分布",
      "油，因为它连成一片",
      "两相都只能叫溶质"
    ],
    "answerIndex": 0,
    "explanation": "分散相以液滴形式存在，连续相是包围液滴的介质。这里是水滴分散在油中的模型，不能一律把乳液都当作油滴在水中。",
    "sourceUrl": "https://rockedu.rockefeller.edu/level/what-to-know-about-emulsions/",
    "fictional": true,
    "difficulty": "进阶"
  },
  {
    "id": "emulsion-number-promise",
    "category": "乳液",
    "prompt": "虚构教学模型的“分散指数”为 82。可以据此宣布实际乳液能稳定 82 天吗？",
    "choices": [
      "可以，数字相同就能换单位",
      "可以，指数天然等于天数",
      "不可以，教学指数没有这样的实际时间含义"
    ],
    "answerIndex": 2,
    "explanation": "虚构的无单位指标不能改写为实测稳定天数。实际稳定性需说明配方、条件、观察指标和实验结果。",
    "sourceUrl": "https://openstax.org/books/chemistry-2e/pages/1-1-chemistry-in-context",
    "fictional": true,
    "difficulty": "入门"
  },
  {
    "id": "emulsion-suitable-not-eternal",
    "category": "乳液",
    "prompt": "乳液用了适合的乳化剂，就能直接写“在任何环境下永久稳定”吗？",
    "choices": [
      "能，乳化剂会让油水变成同一种物质",
      "不能，抑制聚并不等于所有条件下永久稳定",
      "能，只要混合物看起来不透明"
    ],
    "answerIndex": 1,
    "explanation": "合适的乳化剂可以帮助延缓聚并等失稳过程。乳液的实际表现仍取决于配方、制备和环境，需要验证。",
    "sourceUrl": "https://openstax.org/books/chemistry-2e/pages/11-5-colloids",
    "fictional": false,
    "difficulty": "入门"
  },
  {
    "id": "emulsion-liquid-pair",
    "category": "乳液",
    "prompt": "下面哪种微观组合符合乳液的基本类型？",
    "choices": [
      "液滴分散在另一种液体中",
      "气泡分散在液体中",
      "固体颗粒分散在气体中"
    ],
    "answerIndex": 0,
    "explanation": "乳液的分散相与连续相都是液体。气泡在液体中属于泡沫；固体颗粒在气体中属于气溶胶体系。",
    "sourceUrl": "https://openstax.org/books/chemistry-2e/pages/11-5-colloids",
    "fictional": false,
    "difficulty": "入门"
  },
  {
    "id": "emulsion-scattered-light",
    "category": "乳液",
    "prompt": "为什么许多乳液会显得浑浊或乳白，而不只是油与水原本颜色的叠加？",
    "choices": [
      "所有乳化剂自身都必须是白色",
      "乳化一定生成了白色固体",
      "分散液滴可散射可见光"
    ],
    "answerIndex": 2,
    "explanation": "分散结构的光散射会影响外观。并非所有乳液都同样乳白，外观还与液滴尺度、浓度和组分等有关。",
    "sourceUrl": "https://openstax.org/books/chemistry-2e/pages/11-5-colloids",
    "fictional": false,
    "difficulty": "进阶"
  },
  {
    "id": "emulsion-interface-stays",
    "category": "乳液",
    "prompt": "示意图给每个油滴画上一圈乳化剂。这个圆圈最适合表达什么？",
    "choices": [
      "油滴变成了空心塑料球",
      "乳化剂在界面发挥保护作用的概念",
      "油滴内部不再含有油"
    ],
    "answerIndex": 1,
    "explanation": "圆圈是界面作用的示意，不是刚性外壳的实测照片。油滴仍是液滴，边界也不意味着永远不会变化。",
    "sourceUrl": "https://rockedu.rockefeller.edu/level/what-to-know-about-emulsions/",
    "fictional": true,
    "difficulty": "入门"
  },
  {
    "id": "evidence-testable-question",
    "category": "研究证据",
    "prompt": "想研究纸飞机，哪句话最适合变成可检验的科学假设？",
    "choices": [
      "改变机翼宽度会改变规定条件下的飞行距离",
      "这架飞机拥有永远无法测到的好运",
      "这架飞机是宇宙中最美的"
    ],
    "answerIndex": 0,
    "explanation": "科学假设应允许用观察或实验检验，并可能被结果否定。测量条件和“飞行距离”的定义还需进一步写清。",
    "sourceUrl": "https://openstax.org/books/concepts-biology/pages/1-2-the-process-of-science",
    "fictional": true,
    "difficulty": "入门"
  },
  {
    "id": "evidence-observation-inference",
    "category": "研究证据",
    "prompt": "虚构记录：“烧杯里出现浑浊，所以一定生成了某种新物质。”其中哪部分属于直接观察？",
    "choices": [
      "一定生成了新物质",
      "出现浑浊",
      "新物质的化学名称已确定"
    ],
    "answerIndex": 1,
    "explanation": "“出现浑浊”是观察；原因和物质身份是进一步解释，需要额外证据。先把看到的现象与推断分开记录。",
    "sourceUrl": "https://openstax.org/books/chemistry-2e/pages/1-1-chemistry-in-context",
    "fictional": true,
    "difficulty": "入门"
  },
  {
    "id": "evidence-hypothesis-revision",
    "category": "研究证据",
    "prompt": "虚构纸桥实验的结果与原先预测相反。哪种处理更符合科学探究？",
    "choices": [
      "只改掉不符合预测的读数",
      "拒绝记录，直到出现喜欢的结果",
      "保留结果，检查方法与假设，再设计后续检验"
    ],
    "answerIndex": 2,
    "explanation": "不符合预期的结果也是证据。核查操作和测量后，可以修正假设或提出新问题，而不是让记录服从预期。",
    "sourceUrl": "https://openstax.org/books/concepts-biology/pages/1-2-the-process-of-science",
    "fictional": true,
    "difficulty": "入门"
  },
  {
    "id": "evidence-data-detail",
    "category": "研究证据",
    "prompt": "虚构团队想让别人复做纸桥实验，哪种记录最有帮助？",
    "choices": [
      "纸材、折法、加载方式、判定规则和逐次结果",
      "只写“实验成功”",
      "只留最后选中的一张漂亮照片"
    ],
    "answerIndex": 0,
    "explanation": "清楚的方法和原始记录让别人能理解结果如何产生。漂亮照片和最终结论不能代替可追溯的过程。",
    "sourceUrl": "https://openstax.org/books/concepts-biology/pages/1-2-the-process-of-science",
    "fictional": true,
    "difficulty": "入门"
  },
  {
    "id": "evidence-average-not-equal",
    "category": "研究证据",
    "prompt": "虚构测量：A 组为 4、5、6，B 组为 1、5、9，单位相同。均值都为 5，能说波动也一样吗？",
    "choices": [
      "能，均值相同就完全相同",
      "不能，B 组的数据更分散",
      "能，最大值可以忽略"
    ],
    "answerIndex": 1,
    "explanation": "均值描述中心位置，不能独自概括离散程度。这组虚构数据中，B 组离中心更远，应同时查看原始值或适当的波动指标。",
    "sourceUrl": "https://www.itl.nist.gov/div898/handbook/eda/section3/eda356.htm",
    "fictional": true,
    "difficulty": "进阶"
  },
  {
    "id": "evidence-median-outlier",
    "category": "研究证据",
    "prompt": "虚构计时为 2、2、2、2、22 秒。哪句话准确描述这组数据？",
    "choices": [
      "均值和中位数都是 2 秒",
      "中位数是 6 秒，均值是 2 秒",
      "均值是 6 秒，中位数是 2 秒"
    ],
    "answerIndex": 2,
    "explanation": "均值为总和 30 除以 5，等于 6；排序后的中间值为 2。极端值会拉动均值，应说明采用何种中心指标，不能只挑好看的结果。",
    "sourceUrl": "https://www.itl.nist.gov/div898/handbook/eda/section3/eda351.htm",
    "fictional": true,
    "difficulty": "进阶"
  },
  {
    "id": "evidence-precision-bias",
    "category": "研究证据",
    "prompt": "虚构天平反复称标准物，读数都十分接近，却都偏离标准值。最应先警惕什么？",
    "choices": [
      "测量可能很重复，却仍有系统偏差",
      "只要重复得好，就绝不需要校准",
      "标准值必然是错的"
    ],
    "answerIndex": 0,
    "explanation": "读数彼此接近不保证接近参考值。应核查参考物、校准和测量程序；重复测量本身不能自动消除偏差。",
    "sourceUrl": "https://www.itl.nist.gov/div898/handbook/mpc/section3/mpc3.htm",
    "fictional": true,
    "difficulty": "进阶"
  },
  {
    "id": "evidence-factor-response",
    "category": "研究证据",
    "prompt": "虚构实验主动改变纸飞机机翼宽度，并测量飞行距离。哪个是响应变量？",
    "choices": [
      "主动设定的机翼宽度",
      "测得的飞行距离",
      "记录表的纸张颜色"
    ],
    "answerIndex": 1,
    "explanation": "机翼宽度是操纵的因素；飞行距离是要观察如何变化的响应。先明确输入和输出，才能让研究问题与测量对上。",
    "sourceUrl": "https://www.itl.nist.gov/div898/handbook/pri/section7/pri7.htm",
    "fictional": true,
    "difficulty": "入门"
  },
  {
    "id": "evidence-theory-law",
    "category": "研究证据",
    "prompt": "科学理论积累了很多证据后，是否一定会“升级”为科学定律？",
    "choices": [
      "是，理论和定律只是证据数量不同",
      "是，定律意味着任何条件下都没有边界",
      "不是，理论重在解释，定律通常概括特定条件下的规律"
    ],
    "answerIndex": 2,
    "explanation": "理论与定律承担不同作用，不是简单的等级晋升。两者都需要证据，也都应说明适用条件。",
    "sourceUrl": "https://openstax.org/books/concepts-biology/pages/1-2-the-process-of-science",
    "fictional": false,
    "difficulty": "进阶"
  },
  {
    "id": "evidence-research-loop",
    "category": "研究证据",
    "prompt": "虚构研究在做实验时发现了意外现象，于是回头修改问题。是否意味着它“不科学”？",
    "choices": [
      "不是，探究可以在新证据推动下迭代，但需如实记录变化",
      "是，科学只能严格按单一路线进行",
      "是，所有研究问题都不能修改"
    ],
    "answerIndex": 0,
    "explanation": "科学探究不总是直线流程。新观察可以带来新问题；应区分原先计划与后续探索，保留修改理由和过程。",
    "sourceUrl": "https://openstax.org/books/concepts-biology/pages/1-2-the-process-of-science",
    "fictional": true,
    "difficulty": "入门"
  }
];

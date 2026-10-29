(function (root) {
  'use strict';
  var fields = [
    { key:'question', short:'研究问题', title:'先让问题能够被回答。', hint:'将要改变的因素、要比较的结果和适用范围放在同一个问题里。' },
    { key:'factor', short:'改变什么', title:'这一轮，主动改变什么？', hint:'本题练习一个主要因素。多个因素也能研究，但需要另一套明确的设计。' },
    { key:'controls', short:'保持一致', title:'哪些条件会混进比较？', hint:'尽量控制重要条件；无法完全固定的条件，需要记录或在安排、分析中考虑。' },
    { key:'allocation', short:'随机安排', title:'让分组与先后顺序有章可循。', hint:'随机分配、平衡顺序与盲法各有作用。需要写清：对谁随机，谁不知道什么。' },
    { key:'unit', short:'独立重复', title:'究竟有几个独立的实验单位？', hint:'先看处理施加在哪里。同一对象上的多次读数，不能自动变成多个独立对象。' },
    { key:'outcome', short:'结果指标', title:'在看到结果前，先约定怎么测。', hint:'指标需要对得上研究问题；观察窗口、判定规则和分析单位应事先写清。' }
  ];
  function option(label, ok, why) { return {label:label,ok:ok,why:why}; }
  var scenarios = [
    {id:'emulsion',name:'搅拌与乳化',tag:'同一杯，还是新一杯？',title:'搅拌更强，乳化外观会不同吗？',description:'虚构团队想比较两个搅拌强度下的乳液外观。这里练习设计，不生成乳液、不预设哪种更好。',constraints:'本题只比较搅拌强度。材料、油水比例、乳化剂与观察窗口固定；每份乳液都能独立配制。外观不等于真实稳定性或保质期。',limits:'本设计比较约定窗口内的外观；不能把结果直接外推为保质期、食品品质或所有乳液体系。',options:{
      question:[option('在给定配方与观察窗口内，两个搅拌强度的乳液外观有何差别？',true,'因素、结果与条件对应清楚；问题没有预先断言哪一组更好。'),option('是否能证明搅拌越强，任何乳液都永久稳定？',false,'“任何”“永久”超出本题的外观指标和观察窗口，也预设了结果。'),option('哪种包装颜色最受欢迎？',false,'这是另一个可以研究的问题，但它不回答本题的搅拌强度与乳化外观。')],
      factor:[option('只设定两个搅拌强度，其他主要条件按方案一致',true,'主要操纵因素与问题一致。这里不是说科学研究只能有一个因素。'),option('同时改变搅拌强度、油水比例和乳化剂',false,'三个条件同时改变时，不能把差别单独归给搅拌强度；需要另做多因素设计。'),option('只更换记录表的颜色',false,'这没有操纵研究问题里的搅拌强度。')],
      controls:[option('材料批次、用量、比例、乳化剂、容器与观察规则一致',true,'这些因素可能影响外观。实际仍应记录无法完全保持一致的条件。'),option('强搅拌组多加乳化剂，弱搅拌组不加',false,'乳化剂与搅拌强度一起变化，无法分清它们各自的作用。'),option('强搅拌组立刻观察，弱搅拌组等很久再看',false,'观察窗口与处理重合，时间差也可能解释外观差别。')],
      allocation:[option('将各份独立配制的样品随机分配到强度条件，再随机安排操作顺序',true,'处理与运行顺序不固定绑在一起，可减少时间趋势带来的偏差。'),option('每天都包含两种强度，在当天内部随机安排样品与顺序',true,'这是可行的按日期分组思路；后续比较应保留日期这一分组信息。'),option('先完成所有弱搅拌，再换原料做全部强搅拌',false,'处理同时与先后顺序、原料批次重合，带来额外解释。')],
      unit:[option('每个强度独立配制多份乳液；每份的重复读数单独标记',true,'独立配制的乳液是本题重复单位；同一份多次读数反映测量重复，不能冒充多份样品。'),option('同一杯乳液拍 30 张图，就写有 30 份独立样品',false,'30 张图仍来自同一份制备，不能提供 30 份独立制备之间的变化。'),option('只做一杯，再把同一读数复制进多行',false,'复制记录既不增加样品，也不增加真实测量信息。')],
      outcome:[option('在固定观察窗口按预先定义的外观等级评分，并保留逐份记录',true,'外观评分对应本题；等级与观察规则要事先定义，不能见到结果后再换标准。'),option('预先约定固定时点的图像分层面积比例，用同一取像和分析规则',true,'这也是可行的可操作外观指标；图像比例仍不等于整体稳定性或保质期。'),option('凭示意分散指数直接换算能保存多少天',false,'没有验证的指标不能直接换算为真实天数。')]
    }},
    {id:'container',name:'形状与溶解',tag:'先定义“溶完”的时刻',title:'容器形状，会改变表观溶解时间吗？',description:'虚构团队有两种形状的容器，想比较某种可溶性教学材料达到同一视觉终点的时间。',constraints:'容器材质与装液量相同，只比较两种形状。这里“溶解时间”专指预先定义的视觉终点；没有验证微观上完全溶解。每次使用新配制的独立试验份。',limits:'容器形状包含几何差异；本题不拆分几何机制。视觉终点不能证明分子层面的完全溶解，也不能推广到所有材料。',options:{
      question:[option('给定材料与装液量下，两种容器达到统一视觉终点的时间是否不同？',true,'问题把形状、时间指标与限定条件连在一起，也保留了没有差别的可能。'),option('哪种容器能让所有材料立刻溶解？',false,'“所有”“立刻”超出两种形状和给定材料的证据范围。'),option('哪种容器看起来最漂亮？',false,'外观偏好可以另研究，但不回答本题的表观溶解时间。')],
      factor:[option('容器形状，两种预先约定的形状条件',true,'这正是本题要比较的因素；形状引起的几何差异属于处理的一部分。'),option('容器形状和材料用量同时变化',false,'时间差可能来自用量，无法单独归于形状。'),option('只改变拍摄文件的名字',false,'文件名不是影响实际过程的操纵因素。')],
      controls:[option('材料质量与粒度、液体量、温度、搅拌规则、容器材质一致',true,'这些条件可能影响时间。形状改变时液面高度未必能同时固定，应说明几何差异。'),option('给宽容器更多液体，给窄容器更少材料',false,'液体量和材料量也改变了，比较不再聚焦于形状。'),option('每组临时自行决定什么时候算“溶完”',false,'不同的终点规则会直接制造计时差异。')],
      allocation:[option('将新的试验份随机分配到容器形状，并随机安排试验先后',true,'让形状与固定先后顺序脱钩；仍要记录实际条件和偏离。'),option('每个操作时段都比较两种形状，在时段内随机分配并排序',true,'按时段组织比较也是可行方案，后续分析要考虑时段这一分组因素。'),option('上午只用宽容器，下午只用窄容器，不记录环境',false,'形状和时段重合，可能把环境变化误当形状差异。')],
      unit:[option('每次新配制、独立接受形状条件的试验份；每种形状安排多次',true,'新试验份提供过程重复。若要归因于形状，应使用多个同类实体容器，记录容器编号并区分同器具内的重复；每种仅一只器具时，结论应限定为这两只器具及其条件。'),option('同一次溶解过程让 10 个人计时，就有 10 次独立试验',false,'多个计时员观察的是同一过程，不能替代多个独立过程。'),option('同一段录像播放 20 次，就得到 20 个新的试验份',false,'重放可以检查判读一致性，但不会重新产生独立试验。')],
      outcome:[option('到达统一视觉终点的时间；事先约定起点、终点和无法判定的处理',true,'时间定义清楚才能比较；未达到终点的情况也应记录，不可随意删除。'),option('每轮临时选择最能支持预期的时间点',false,'见到结果后挑选时点会影响比较，难以区分真实差别与选择偏差。'),option('容器购买价格',false,'价格不是本题的表观溶解响应指标。')]
    }},
    {id:'label',name:'标签与评分',tag:'藏住什么，保留什么？',title:'同一种样品，换个标签会影响评分吗？',description:'虚构评分者将评价两份实际内容相同、标签分别为 A 与 B 的样品。目标是练习标签效应的研究设计，不提供真实试吃建议。',constraints:'每位虚构评分者都看到两种标签。标签本身是处理，不能全部藏住；样品实际内容保持一致。两次评分属于同一人，不能当两名独立参与者。',limits:'标签必须可见，所以评分者无法对标签条件完全盲法。顺序、记忆和识别样品相同的可能性仍是局限；评分差异不代表食品营养、健康效果或真实品质。',options:{
      question:[option('同一内容在 A、B 标签下的评分是否不同，并明确评分人群与条件？',true,'问题聚焦标签信息与评分；它没有把偏好当成营养或真实品质。'),option('能否证明 A 标签的样品更健康？',false,'评分不等于健康效果，而且本题样品内容相同。'),option('只统计谁最先交卷，不比较标签',false,'这没有测量标签与评分的关系。')],
      factor:[option('展示给评分者的标签 A 或 B，实际样品内容相同',true,'标签是操纵因素；如果内容也变了，就无法区分标签和内容。'),option('同时更换标签、样品内容和价格信息',false,'多个信息与内容一起变化，单独的标签作用无法辨认。'),option('把所有标签藏住，仍声称测了 A 与 B 标签的影响',false,'如果评分者没有看到不同标签，就没有实施本题的标签操纵。')],
      controls:[option('实际内容、呈现条件与评分量表一致；避免透露预期结果',true,'保留相同内容并统一量表，减少标签之外的差别；说明仍可能存在的期待与识别风险。'),option('A 标签给大家最喜欢的内容，B 标签给另一种内容',false,'内容差异也能改变评分，无法只解释为标签作用。'),option('A 用十分制，B 用随意的口头评价',false,'两个条件下的测量尺度不一致，结果无法直接比较。')],
      allocation:[option('将评分者随机分配到 AB 或 BA 顺序，尽量平衡；分析者先只看编码',true,'平衡并随机分配顺序可减少先后影响；分析者可对标签含义盲法，评分者仍必须看到标签。'),option('每位评分者随机决定 AB 或 BA；记录实际顺序，由未知标签含义者整理评分',true,'也可以使用独立随机顺序，但人数少时不保证平衡，应保留顺序信息并考虑其影响。'),option('所有人先看 A 后看 B，并告诉分析者“A 应该更好”',false,'固定顺序与标签重合，提示还可能引入期待偏差。标签要可见，但不必公开研究者预期。')],
      unit:[option('独立招募的评分者；每人的两次评分作为配对或重复测量处理',true,'同一人的两次评分相关，应按人保留配对；不能把两次评分当两名独立评分者。'),option('一位评分者填 20 次，就当作 20 名独立评分者',false,'重复填写没有增加独立参与者，且可能带来记忆或疲劳。'),option('同一人看到两种标签，就自动算两个独立样本',false,'两个条件来自同一人，分析需要考虑同一人的关联。')],
      outcome:[option('预先定义的同一评分量表，保留每人 A 与 B 的配对评分及顺序',true,'指标对应问题，逐人配对记录支持恰当比较；量表类型也影响后续分析方法。'),option('只留下符合“A 更好”预测的评分',false,'按是否符合预期筛选结果会造成偏差，应保留并说明全部有效记录。'),option('用评分直接宣称哪个标签对应更高营养价值',false,'感官评分无法回答营养价值，而且标签并未改变本题的样品内容。')]
    }},
    {id:'light',name:'光照与长度',tag:'一盒里的多株，算几次？',title:'光照方案不同，幼苗长度会不同吗？',description:'虚构团队想比较两种光照方案下的终点长度或长度变化。光照由独立的盒子统一控制，每盒有多株作为盒内观察对象。',constraints:'处理施加到光照盒，不是分别施加给每一株。每种光照方案需要多个可独立设定的盒子；同盒多株属于盒内取样。本题不提供实际培养参数。',limits:'盒内植株不是彼此独立接受光照的处理单位。长度只是一个指标，不能等同于“生长更好”，也不能推广到其他物种、环境或培养条件。',options:{
      question:[option('给定虚构条件下，两种光照方案的幼苗终点长度或长度变化有何差别？',true,'明确了处理、响应与范围，没有把长度变化直接判作全面“更好”。'),option('哪种光照让任何植物都长得最好？',false,'单一长度指标和给定条件不能回答“任何植物”“最好”。'),option('哪一个盒子的颜色最悦目？',false,'这不是本题的光照与长度问题。')],
      factor:[option('分配给光照盒的两种光照方案',true,'处理是在盒层面施加的，分组与独立重复也应在盒层面考虑。'),option('一组换物种、另一组换光照，同时比较',false,'物种差异与光照重合，不能单独归因于光照。'),option('只修改记录里的长度数值',false,'修改记录不是实验操纵，不能替代真实处理与观察。')],
      controls:[option('物种与初始状态、观察窗口、盒体和其他环境规则一致并记录偏离',true,'这些条件可能影响长度。无法完全控制的环境差异需记录，不能假定它们不存在。'),option('一种方案只放最短的苗，另一种只放最长的苗',false,'初始状态与处理重合，后续长度差异可能早已存在。'),option('不同组在不同且未记录的时点测量',false,'观察时间不同也可能影响长度，应事先约定共同窗口。')],
      allocation:[option('将多个独立盒随机分配到两方案，并随机安排盒的位置',true,'盒层面的随机分配与位置安排可减少位置与处理重合；仍应记录位置和环境。'),option('按位置区域分组，每区内有多个独立盒并随机分配两方案',true,'这是可行的位置分组方案；每区要容纳两种方案，分析时保留分组信息。'),option('方案 A 全部放一个架子，方案 B 全部放另一个架子',false,'架子位置与光照方案完全重合，无法排除位置因素。')],
      unit:[option('独立接受光照方案的盒；多株用于盒内取样，不能当多盒',true,'盒才是处理单位。一盒测很多株不能替代多个独立光照盒，分析也要处理盒内关联。'),option('每盒 20 株，就把同盒 20 株当 20 个独立光照重复',false,'同盒共享同一次光照处理，20 株不能变成 20 个独立处理单位。'),option('每种方案只用一盒，再重复量每株很多次',false,'增加读数不能增加独立盒数；方案与特定盒子仍无法区分。')],
      outcome:[option('统一测量定义与窗口，记录初末长度，并预先以盒内平均变化作盒级指标',true,'长度变化对应问题，盒级指标尊重处理单位；保留各株记录而不是只留总平均。'),option('预先定义统一终点的盒内平均长度，并记录初始长度供比较解释',true,'这也是可行的响应定义；需预先考虑初始差异，不能把较长直接当作更健康。'),option('只拍最漂亮的一株，宣布整个方案最好',false,'选择代表图不能替代完整的盒级记录，也无法定义“最好”。')]
    }}
  ];
  function findScenario(id) { return scenarios.find(function (s) { return s.id === id; }); }
  function evaluate(id, choices) {
    var scenario = findScenario(id);
    if (!scenario) throw new RangeError('Unknown scenario');
    return fields.map(function (field) {
      var index = choices && choices[field.key], list = scenario.options[field.key];
      var selected = Number.isInteger(index) && index >= 0 && index < list.length ? list[index] : null;
      return { key:field.key, title:field.short, selected:selected ? selected.label : '尚未选择', ok:!!(selected && selected.ok), missing:!selected, why:selected ? selected.why : '请为“' + field.short + '”选择一个方案，才能检查它与本题的关系。' };
    });
  }
  function fresh() { var record={active:'emulsion',step:0,noMotion:false,scenarios:{}};scenarios.forEach(function(s){record.scenarios[s.id]={choices:{},revision:'',risk:'',checked:false};});return record; }
  function sanitize(value) {
    var clean=fresh(); if(!value || typeof value!=='object') return clean;
    if(findScenario(value.active))clean.active=value.active;
    if(Number.isInteger(value.step)&&value.step>=0&&value.step<6)clean.step=value.step;
    clean.noMotion=value.noMotion===true;
    scenarios.forEach(function(s){var old=value.scenarios&&value.scenarios[s.id];if(!old||typeof old!=='object')return;var dest=clean.scenarios[s.id];fields.forEach(function(f){var n=old.choices&&old.choices[f.key];if(Number.isInteger(n)&&n>=0&&n<s.options[f.key].length)dest.choices[f.key]=n;});dest.revision=typeof old.revision==='string'?old.revision.slice(0,2400):'';dest.risk=typeof old.risk==='string'?old.risk.slice(0,2400):'';dest.checked=old.checked===true;});return clean;
  }
  function completed(id, record) { return !!(record.checked && evaluate(id,record.choices).every(function(item){return item.ok;})); }
  function exportText(id, record) {
    var s=findScenario(id); if(!s)throw new RangeError('Unknown scenario');
    var lines=['一口科学 / 实验设计工作台','原创虚构教学设计卡',s.title,'','本题约束：'+s.constraints,''];
    evaluate(id,record.choices).forEach(function(item){lines.push(item.title+'：'+item.selected);});
    lines.push('','我的修订与补充（未自动评审）：',record.revision||'未填写','', '局限与下一步（未自动评审）：',record.risk||'未填写','', '情境边界：'+s.limits,'','框架检查不代表设计唯一、因果关系成立、样本量足够或结果可以推广。自由文字未自动评审。实际研究仍需论证方法、测量、分析与适用边界。','','原则来源（核验日期：2026-10-29）：','https://www.itl.nist.gov/div898/handbook/pri/section3/pri331.htm','https://openstax.org/books/introductory-statistics-2e/pages/1-4-experimental-design-and-ethics');
    return lines.join('\r\n');
  }
  var core={fields:fields,scenarios:scenarios,evaluate:evaluate,sanitize:sanitize,fresh:fresh,completed:completed,exportText:exportText};
  if(typeof module!=='undefined'&&module.exports)module.exports=core;
  root.DesignLabCore=core;
  if(typeof document==='undefined')return;
  var $=function(id){return document.getElementById(id);};
  var KEY='one-bite-science:design-lab:v1',storageOK=true,state=fresh(),toastTimer=0;
  var systemMotion=root.matchMedia?root.matchMedia('(prefers-reduced-motion: reduce)'):null;
  try{var raw=localStorage.getItem(KEY);if(raw)state=sanitize(JSON.parse(raw));}catch(error){storageOK=false;}
  function record(){return state.scenarios[state.active];}
  function node(tag,cls,value){var el=document.createElement(tag);if(cls)el.className=cls;if(value!==undefined)el.textContent=value;return el;}
  function setText(id,value){$(id).textContent=value;}
  function save(){try{localStorage.setItem(KEY,JSON.stringify(state));}catch(error){storageOK=false;}if(!storageOK)setText('design-storage-note','当前浏览器无法保存本地记录。本次仍可使用并导出已完成的设计卡；关闭页面后记录可能丢失。');}
  function toast(message){setText('design-toast',message);$('design-toast').classList.add('visible');root.clearTimeout(toastTimer);toastTimer=root.setTimeout(function(){$('design-toast').classList.remove('visible');},3500);}
  function motion(){var systemReduced=!!(systemMotion&&systemMotion.matches),effective=state.noMotion||systemReduced;document.body.classList.toggle('no-motion',effective);document.documentElement.style.scrollBehavior=effective?'auto':'';$('design-motion').setAttribute('aria-pressed',String(effective));$('design-motion').disabled=systemReduced;setText('design-motion',systemReduced?'无动效：开（系统）':'无动效：'+(effective?'开':'关'));}
  function updateProgress(){var done=0;scenarios.forEach(function(s){var isDone=completed(s.id,state.scenarios[s.id]);if(isDone)done++;var mark=$('mark-'+s.id);mark.textContent=isDone?'✓':'○';mark.classList.toggle('done',isDone);mark.setAttribute('aria-label',isDone?'设计卡已完成':'设计卡未完成');});setText('total-progress','已完成 '+done+' / 4 张设计卡');}
  scenarios.forEach(function(s,i){var b=node('button');b.type='button';b.id='scenario-'+s.id;b.dataset.scenario=s.id;b.setAttribute('role','tab');b.setAttribute('aria-controls','scenario-panel');b.appendChild(node('span','scenario-n','0'+(i+1)));var name=node('span','scenario-name',s.name);name.appendChild(node('small','',s.tag));b.appendChild(name);var mark=node('span','scenario-mark','○');mark.id='mark-'+s.id;b.appendChild(mark);b.addEventListener('click',function(){switchScenario(s.id,false);});b.addEventListener('keydown',function(e){var n;if(e.key==='ArrowRight')n=(i+1)%4;if(e.key==='ArrowLeft')n=(i+3)%4;if(e.key==='Home')n=0;if(e.key==='End')n=3;if(n!==undefined){e.preventDefault();switchScenario(scenarios[n].id,true);}});$('scenario-tabs').appendChild(b);});
  function renderSteps(){var list=$('design-steps');list.replaceChildren();fields.forEach(function(f,i){var li=node('li'),button=node('button');button.type='button';button.setAttribute('aria-current',i===state.step?'step':'false');button.appendChild(node('span','piece-number',String(i+1)));button.appendChild(node('span','',f.short));button.appendChild(node('span','piece-mark',Number.isInteger(record().choices[f.key])?'✓':'○'));button.addEventListener('click',function(){state.step=i;renderStep();save();$('step-title').focus();});li.appendChild(button);list.appendChild(li);});setText('piece-count',Object.keys(record().choices).length+' / 6');}
  function renderStep(){var s=findScenario(state.active),f=fields[state.step],current=record();renderSteps();setText('step-counter','PIECE '+(state.step+1)+' / 6');setText('step-title',f.title);setText('step-hint',f.hint);setText('choice-legend',f.short+'：请选择一个方案');var choices=$('design-choices');choices.replaceChildren();s.options[f.key].forEach(function(o,i){var label=node('label','design-choice'),input=node('input');input.type='radio';input.name='design-choice-'+s.id+'-'+f.key;input.value=String(i);input.checked=current.choices[f.key]===i;input.addEventListener('change',function(){current.choices[f.key]=i;current.checked=false;renderSteps();setText('selection-notice','已选择。可继续拼下一块；修改选择后需要重新检查整张设计。');$('design-feedback').hidden=true;$('design-card').hidden=true;updateProgress();save();});label.appendChild(input);label.appendChild(node('span','',o.label));choices.appendChild(label);});$('previous-step').disabled=state.step===0;setText('next-step',state.step===5?'检查整张设计 ↗':'下一块 →');setText('selection-notice',Number.isInteger(current.choices[f.key])?'这块已有选择。你可以修改，也可以继续。':'先挑一个方案；也可以跳到其他拼图。');}
  function notes(){var r=record();$('design-revision').value=r.revision;$('design-risk').value=r.risk;setText('revision-count',r.revision.length+' / 2400');setText('risk-count',r.risk.length+' / 2400');}
  function renderCard(){var s=findScenario(state.active),r=record();$('design-card').hidden=!completed(s.id,r);if($('design-card').hidden)return;setText('card-title',s.title);setText('card-context','原创虚构情境。'+s.constraints+' '+s.limits);$('card-fields').replaceChildren();evaluate(s.id,r.choices).forEach(function(item){$('card-fields').appendChild(node('dt','',item.title));$('card-fields').appendChild(node('dd','',item.selected));});setText('card-revision',r.revision||'尚未补充。可以在自由记录区写下你的修订。');setText('card-risk',r.risk||'尚未填写。请继续思考选择偏差、测量误差与推广范围。');}
  function feedback(focus){var results=evaluate(state.active,record().choices),passed=results.filter(function(item){return item.ok;}).length;$('design-feedback').hidden=false;setText('feedback-heading',passed===6?'六块拼图已对齐。':'先修订这几块，再来比较。');setText('feedback-intro',passed===6?'当前选择符合本题的简化约束。设计卡已生成；这不是唯一可行设计，也不是研究有效性的认证。':'当前 '+passed+' / 6 项符合本题约束。下面按项说明；也可以在自由记录中提出其他设计，但自由文字不会自动替代选项检查。');var grid=$('feedback-items');grid.replaceChildren();results.forEach(function(item,i){var box=node('article','feedback-item'+(item.ok?'':' needs-work'));box.appendChild(node('h4','',(item.ok?'✓ ':'↗ ')+item.title+(item.missing?' · 待补充':item.ok?' · 可行':' · 待修订')));box.appendChild(node('p','feedback-selection','你的选择：'+item.selected));box.appendChild(node('p','',item.why));var button=node('button','',item.ok?'查看或修改这一块':'去修订这一块');button.type='button';button.addEventListener('click',function(){state.step=i;renderStep();save();$('step-title').focus();});box.appendChild(button);grid.appendChild(box);});renderCard();updateProgress();if(focus)$('feedback-heading').focus();}
  function check(){record().checked=true;feedback(true);save();}
  function switchScenario(id,focus){state.active=id;state.step=0;renderScenario();save();if(focus)$('scenario-'+id).focus();}
  function renderScenario(){var s=findScenario(state.active),i=scenarios.indexOf(s);scenarios.forEach(function(other){var b=$('scenario-'+other.id),active=other.id===s.id;b.setAttribute('aria-selected',String(active));b.tabIndex=active?0:-1;});$('scenario-panel').setAttribute('aria-labelledby','scenario-'+s.id);setText('scenario-number','SCENARIO 0'+(i+1));setText('scenario-title',s.title);setText('scenario-description',s.description);setText('scenario-constraints',s.constraints);renderStep();notes();$('design-feedback').hidden=!record().checked;if(record().checked)feedback(false);else $('design-card').hidden=true;updateProgress();}
  $('previous-step').addEventListener('click',function(){if(state.step>0){state.step--;renderStep();save();$('step-title').focus();}});
  $('next-step').addEventListener('click',function(){if(state.step<5){state.step++;renderStep();save();$('step-title').focus();}else check();});
  $('check-design').addEventListener('click',check);
  [['design-revision','revision','revision-count'],['design-risk','risk','risk-count']].forEach(function(item){$(item[0]).addEventListener('input',function(){record()[item[1]]=this.value.slice(0,2400);setText(item[2],record()[item[1]].length+' / 2400');renderCard();save();});});
  $('design-motion').addEventListener('click',function(){state.noMotion=!state.noMotion;motion();save();});
  if(systemMotion&&systemMotion.addEventListener)systemMotion.addEventListener('change',motion);
  $('print-design').addEventListener('click',function(){if(completed(state.active,record()))root.print();});
  $('export-design').addEventListener('click',function(){if(!completed(state.active,record()))return;var content='\ufeff'+exportText(state.active,record()),blob=new Blob([content],{type:'text/plain;charset=utf-8'}),url=URL.createObjectURL(blob),anchor=node('a');anchor.href=url;anchor.download='一口科学_设计卡_'+findScenario(state.active).name+'.txt';document.body.appendChild(anchor);anchor.click();anchor.remove();root.setTimeout(function(){URL.revokeObjectURL(url);},1500);toast('文本已准备下载，包含当前选择和自由记录。');});
  var dialog=$('clear-dialog');
  $('clear-design').addEventListener('click',function(){if(typeof dialog.showModal==='function'){dialog.showModal();$('cancel-clear').focus();}else{dialog.setAttribute('open','');$('cancel-clear').focus();}});
  function closeDialog(){if(typeof dialog.close==='function')dialog.close();else dialog.removeAttribute('open');$('clear-design').focus();}
  $('cancel-clear').addEventListener('click',closeDialog);
  dialog.addEventListener('cancel',function(){root.setTimeout(function(){$('clear-design').focus();},0);});
  $('confirm-clear').addEventListener('click',function(){var oldMotion=state.noMotion;state=fresh();state.noMotion=oldMotion;save();closeDialog();renderScenario();toast('本页四个场景的记录已清除。');});
  motion();renderScenario();save();
})(typeof globalThis!=='undefined'?globalThis:window);


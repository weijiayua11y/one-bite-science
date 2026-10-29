(function(){
'use strict';
const episodes=[{"id":"ep1","asset":"chart-illusion","file":"一口科学_看起来翻倍真的翻倍了吗_60秒.mp4","poster":"一口科学_视频封面.png","srt":"一口科学_中文字幕.srt","title":"看起来翻倍，真的翻倍了吗？","label":"图表里的视觉陷阱","kind":"原创虚构教学数据","intro":"从 10 到 11，是增加 10%。但当柱形图的纵轴从 9 开始，露出来的柱长却从 1 变成了 2。用一分钟，区分数据的变化和画面的变化。","action":"亲手调整纵轴","points":[["看起点","坐标轴从哪里开始？"],["看单位","图里到底在量什么？"],["看原值","回到数据，再做计算。"]],"note":"A=10、B=11 是虚构教学数据。实际相对增幅为 (11−10)÷10=10%，绝对差是 1 个单位；改变纵轴起点不会改变这些数值。柱形图以长度编码数值，应保持零基线；其他图表类型的设计要求可能不同。","sources":[["英国国家统计局：柱形图与零基线","https://service-manual.ons.gov.uk/data-visualisation/chart-types/bar-charts"],["OpenStax：百分比应用","https://openstax.org/books/prealgebra-2e/pages/6-2-solve-general-applications-of-percent"]],"transcript":[["00:00:00","看起来翻倍，真的翻倍了吗？"],["00:00:06","先看这组虚构的教学数据。"],["00:00:10","A 是 10，B 是 11，只多了 1。"],["00:00:14","把纵轴起点，从 0 改到 9。"],["00:00:19","露出的柱长，就变成 1 比 2。"],["00:00:24","左右两张图，用的是同一组数。"],["00:00:28","改变的，是画面里的比例。"],["00:00:32","计算增幅：先用 11 减 10，得到 1。"],["00:00:37","再除以原来的 10，换成百分数，是 10%。"],["00:00:43","读图前，先查三件事。"],["00:00:46","单位是什么？基准从哪里开始？"],["00:00:50","原始数值是多少？"],["00:00:54","一口科学。看懂图，从看清刻度开始。"]]},{"id":"ep2","asset":"average-hidden","file":"EP02_平均数藏起了什么_60秒.mp4","poster":"EP02_平均数藏起了什么_封面.png","srt":"EP02_平均数藏起了什么_中文字幕.srt","title":"平均数藏起了什么？","label":"一个数，讲不完全部故事","kind":"原创虚构教学数据","intro":"2、2、2、2、22，平均数是 6，中位数却是 2。再看五个 6：同样的均值，藏着不同的分布。选一个合适的中心指标，还需要看数据如何分散。","action":"亲手改变极端值","points":[["看中心","平均数和中位数各说了什么？"],["看分散","数据是否挤在一起？"],["看情境","哪个指标回答当前的问题？"]],"note":"两组数据都为虚构示例。2、2、2、2、22 的总和为 30，均值为 6，中位数为 2；五个 6 的均值和中位数均为 6。一个中心指标不能完整描述分布。中位数在本例中对极端值变化不敏感，不意味着它总是更好的统计量。","sources":[["OpenStax：数据的中心","https://openstax.org/books/introductory-statistics-2e/pages/2-5-measures-of-the-center-of-the-data"],["OpenStax：数据的离散程度","https://openstax.org/books/introductory-statistics-2e/pages/2-7-measures-of-the-spread-of-the-data"]],"transcript":[["00:00:00","平均数是 6，大家就都差不多是 6 吗？"],["00:00:06","看这五个虚构数值，起初全是 2。"],["00:00:10","只把最后一个 2 变成 22，均值就升到了 6。"],["00:00:18","总和变成 30，除以 5，就是 6。"],["00:00:22","平均数会受到每个数值的影响。"],["00:00:28","排好顺序，中间的第三个仍然是 2。"],["00:00:33","这就是中位数，它没有跟着变大。"],["00:00:37","再换一组，五个数全是 6，均值也一样。"],["00:00:42","但两组数的分散程度，很不一样。"],["00:00:47","同时看中心、离散和情境，不能只挑好看的指标。"],["00:00:54","一口科学。一个平均数，讲不完全部故事。"]]},{"id":"ep3","asset":"coin-variation","file":"EP03_抛十次硬币为什么不一定五次正面_60秒.mp4","poster":"EP03_抛十次硬币为什么不一定五次正面_封面.png","srt":"EP03_抛十次硬币为什么不一定五次正面_中文字幕.srt","title":"抛十次硬币，为什么不一定五次正面？","label":"概率一半，结果不必一半","kind":"明确模型下的教学模拟","intro":"每次正面的概率是 50%，并不保证十次里恰好五次正面。比较 100 组模拟，看看样本量变大时比例的波动，以及单条路径为什么仍会忽远忽近。","action":"自己动手做抽样","points":[["看假设","每次公平、相互独立。"],["看波动","概率不保证单次结果。"],["看路径","不会每一步都靠近 50%。"]],"note":"模型假设每次独立且正面概率恒为 0.5。十次恰好五次正面的概率是 C(10,5)×0.5^10≈24.6%。画面使用固定编号 20261029 生成 100 条各含 1000 次的模拟序列，分别取每条的前 10、100、1000 次，展示正面比例。它不是实物抛硬币记录。视频与互动页采用不同的随机生成和分组规则；编号只能在各自模块内复现，不代表两个模块会产生相同结果。比例随样本量增大通常更集中，但不保证单条路径的每一步都更接近 50%。","sources":[["NIST：二项分布","https://www.itl.nist.gov/div898/handbook/eda/section3/eda366i.htm"],["OpenStax：独立事件","https://openstax.org/books/introductory-statistics/pages/3-2-independent-and-mutually-exclusive-events"]],"transcript":[["00:00:00","抛 10 次硬币，为什么不一定有 5 次正面？"],["00:00:06","假设硬币公平、每次独立；每次正面概率都是 50%。"],["00:00:13","这一组模拟，10 次里有 6 次正面。"],["00:00:17","概率一半，不代表结果必须一半。"],["00:00:22","按模型计算，恰好 5 次正面的概率约为 24.6%。"],["00:00:30","每种样本量模拟 100 组，看看正面比例。"],["00:00:35","每组从 10 次增加到 1000 次，比例通常更集中。"],["00:00:42","但某一次模拟，不会每增加一抛就更靠近 50%。"],["00:00:50","硬币不会把前面“欠”的结果补回来。"],["00:00:54","一口科学。概率讲规律，不保证单次结果。"]]}];
const player=document.getElementById('screen');
const buttons=Array.from(document.querySelectorAll('[data-episode]'));
let active='';
function element(tag,text){const n=document.createElement(tag);n.textContent=text;return n;}
function choose(id,announce){
  const item=episodes.find(e=>e.id===id)||episodes[0];
  if(active===item.id)return;
  active=item.id;player.pause();player.poster='assets/'+item.asset+'-cover.png';
  player.setAttribute('aria-label',item.title+' 60秒科普短片');
  player.querySelector('source').src='assets/'+item.asset+'.mp4';
  player.querySelector('track').src='assets/'+item.asset+'.vtt';player.load();
  const index=episodes.indexOf(item)+1;
  document.getElementById('episode-label').textContent='EP. 0'+index+' / '+item.label;
  document.getElementById('data-label').textContent=item.kind;
  document.getElementById('episode-title').textContent=item.title;
  document.getElementById('episode-intro').textContent=item.intro;
  document.getElementById('try-data').textContent=item.action+' ↗';
  const download=document.getElementById('download-video');
  download.href='assets/'+item.asset+'.mp4';download.download=item.file;
  const portrait=document.getElementById('download-portrait');
  portrait.href='assets/'+item.asset+'-portrait.mp4';portrait.download=item.file.replace('.mp4','_手机竖屏.mp4');
  const points=document.getElementById('episode-points');points.replaceChildren();
  item.points.forEach(p=>{const li=document.createElement('li');li.append(element('b',p[0]),element('span',p[1]));points.append(li);});
  document.getElementById('episode-note').textContent=item.note;
  const transcript=document.getElementById('transcript-lines');transcript.replaceChildren();
  item.transcript.forEach(line=>{const li=document.createElement('li');li.append(element('time',line[0]),element('span',line[1]));transcript.append(li);});
  const sources=document.getElementById('episode-sources');sources.replaceChildren();
  item.sources.forEach(s=>{const li=document.createElement('li'),a=element('a',s[0]+' ↗');a.href=s[1];a.target='_blank';a.rel='noopener noreferrer';li.append(a);sources.append(li);});
  buttons.forEach(b=>{const selected=b.dataset.episode===item.id;b.setAttribute('aria-pressed',String(selected));b.classList.toggle('selected',selected);});
  document.title=item.title+' · 一口科学放映室';
  if(announce)document.getElementById('video-status').textContent='已切换至第'+index+'集：'+item.title+' 点击播放器开始。';
}
buttons.forEach(b=>b.addEventListener('click',()=>{choose(b.dataset.episode,true);history.replaceState(null,'','#'+b.dataset.episode);}));
document.querySelector('.skip-link').addEventListener('click',e=>{e.preventDefault();player.focus();player.scrollIntoView({block:'center'});});
choose(location.hash.slice(1),false);
window.addEventListener('hashchange',()=>choose(location.hash.slice(1),true));
window.addEventListener('pagehide',()=>player.pause());
})();

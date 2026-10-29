(function (root) {
  'use strict';

  // Pure functions are exported for deterministic calculation checks without a browser.
  var FIXED = [8, 9, 9, 10, 10, 11, 11, 12];
  var SIZES = [10, 50, 200, 1000];
  function summarize(values) {
    if (!Array.isArray(values) || !values.length || values.some(function (v) { return !Number.isFinite(v); })) throw new TypeError('Finite non-empty numeric data required');
    var sorted = values.slice().sort(function (a, b) { return a - b; });
    var sum = sorted.reduce(function (a, b) { return a + b; }, 0);
    var m = Math.floor(sorted.length / 2);
    return { sorted: sorted, sum: sum, mean: sum / sorted.length, median: sorted.length % 2 ? sorted[m] : (sorted[m - 1] + sorted[m]) / 2, min: sorted[0], max: sorted[sorted.length - 1], range: sorted[sorted.length - 1] - sorted[0] };
  }
  function validSeed(seed) { return Number.isInteger(seed) && seed >= 0 && seed <= 4294967295; }
  function makeRandom(seed) {
    if (!validSeed(seed)) throw new RangeError('Invalid seed');
    var a = seed >>> 0;
    return function () {
      a = (a + 0x6D2B79F5) >>> 0;
      var t = a;
      t = Math.imul(t ^ t >>> 15, t | 1);
      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }
  function validateSimulation(n, count, seed) {
    if (SIZES.indexOf(n) < 0 || [1, 100].indexOf(count) < 0 || !validSeed(seed)) throw new RangeError('Invalid simulation settings');
  }
  function sampleHeads(n, random) {
    var heads = 0;
    for (var j = 0; j < n; j++) if (random() < 0.5) heads++;
    return heads;
  }
  function simulate(n, count, seed) {
    validateSimulation(n, count, seed);
    var random = makeRandom(seed);
    var results = [];
    for (var i = 0; i < count; i++) results.push(sampleHeads(n, random));
    return results;
  }
  function histogram(heads, n) {
    var bins = Array(20).fill(0);
    heads.forEach(function (h) { bins[Math.min(19, Math.floor(h * 20 / n))]++; });
    return bins;
  }
  var core = { fixed: FIXED.slice(), summarize: summarize, makeRandom: makeRandom, validSeed: validSeed, simulate: simulate, histogram: histogram };
  if (typeof module !== 'undefined' && module.exports) module.exports = core;
  root.DataLabMath = core;
  if (typeof document === 'undefined') return;

  var $ = function (id) { return document.getElementById(id); };
  var KEY = 'one-bite-science:data-lab:v2';
  var questions = {
    axis: [
      { title: '把纵轴起点从 0 移到 9，两组数值的差会怎样？', choices: ['差值变大', '仍然相差 1'], answer: 1, explanation: '轴范围改变了显示比例；11 − 10 始终等于 1。' },
      { title: '截断后 B 柱露出的长度是 A 柱的 2 倍，能说 B 比 A 高 100% 吗？', choices: ['能，柱长翻倍就是数值翻倍', '不能，原始数值只高 10%'], answer: 1, explanation: '露出的长度是 11 − 9 与 10 − 9。真实相对差应以 A 的 10 为分母：(11 − 10) ÷ 10 = 10%。' }
    ],
    center: [
      { title: '把最大的值从 14 推到 80，哪个指标会被明显拉高？', choices: ['均值', '中位数'], answer: 0, explanation: '均值用到每一个数。总和增加 66，均值增加 66 ÷ 9 ≈ 7.33。' },
      { title: '同样把最大值推到 80，排序后第 5 个值会怎样？', choices: ['也向 80 靠近', '仍是 10，中位数不变'], answer: 1, explanation: '本例其余 8 个值固定，最大的值仍在最后一位，排序后的第 5 个值仍为 10。' }
    ],
    sampling: [
      { title: '每组从 10 次增加到 1000 次，多组正面比例的分布通常会怎样？', choices: ['更集中在 50% 附近', '每一组都会恰好是 50%'], answer: 0, explanation: '理论波动幅度随样本量增大而减小；这是分布的规律，不是对任意一组的保证。某批 100 组的直方图也仍有随机起伏。' },
      { title: '某组正面比例不是 50%，是否说明模拟中的硬币不公平？', choices: ['是，公平就必须一半一半', '不是，有限次抽样本来就会波动'], answer: 1, explanation: '50% 是本模拟每次抛掷的设定概率，有限样本仍可出现偏离。研究真实硬币时，还需结合样本量、偏离幅度与检验方法判断，不能只看是否恰好一半。' }
    ]
  };
  var systemMotion = root.matchMedia ? root.matchMedia('(prefers-reduced-motion: reduce)') : null;
  var state = { answers: { axis: [null, null], center: [null, null], sampling: [null, null] }, touched: { axis: false, center: false, sampling: false }, completed: {}, noMotion: false };
  var storageAvailable = true;
  try {
    var stored = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (stored && typeof stored === 'object') {
      Object.keys(questions).forEach(function (id) {
        if (stored.answers && Array.isArray(stored.answers[id])) state.answers[id] = [0, 1].map(function (i) { return [0, 1].indexOf(stored.answers[id][i]) >= 0 ? stored.answers[id][i] : null; });
        state.touched[id] = !!(stored.touched && stored.touched[id] === true);
        if (state.touched[id] && state.answers[id].every(function (v) { return v !== null; })) state.completed[id] = true;
      });
      if (typeof stored.noMotion === 'boolean') state.noMotion = stored.noMotion;
    }
  } catch (error) { storageAvailable = false; }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (error) { storageAvailable = false; }
    if (!storageAvailable) $('storage-note').textContent = '当前浏览器不能保存本地记录。本次仍可完整体验，关闭页面后进度将丢失。';
  }
  function text(id, value) { $(id).textContent = value; }
  function fmt(v) { return Number(v.toFixed(2)).toString(); }
  function percent(v) { return fmt(v * 100) + '%'; }
  function svgText(x, y, value, cls, anchor) { return '<text x="' + x + '" y="' + y + '" class="' + (cls || '') + '" text-anchor="' + (anchor || 'start') + '">' + value + '</text>'; }
  function line(x1, y1, x2, y2, cls) { return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" class="' + cls + '"/>'; }
  function setMotion() {
    var systemReduced = !!(systemMotion && systemMotion.matches);
    var effective = state.noMotion || systemReduced;
    document.body.classList.toggle('no-motion', effective);
    document.documentElement.style.scrollBehavior = effective ? 'auto' : '';
    $('motion-toggle').setAttribute('aria-pressed', String(effective));
    $('motion-toggle').disabled = systemReduced;
    text('motion-toggle', systemReduced ? '无动效：开（系统）' : '无动效：' + (effective ? '开' : '关'));
  }
  $('motion-toggle').addEventListener('click', function () { state.noMotion = !state.noMotion; setMotion(); save(); });
  if (systemMotion && systemMotion.addEventListener) systemMotion.addEventListener('change', setMotion);
  setMotion();

  function updateProgress() {
    var completeCount = 0, revealed = 0;
    Object.keys(questions).forEach(function (id) {
      var answered = state.answers[id].filter(function (v) { return v !== null; }).length;
      if (state.touched[id]) revealed += answered;
      var complete = answered === 2 && state.touched[id];
      state.completed[id] = complete;
      if (complete) completeCount++;
      var badge = document.querySelector('[data-done="' + id + '"]');
      badge.textContent = complete ? '✓' : '○';
      badge.classList.toggle('is-done', complete);
      badge.setAttribute('aria-label', complete ? '已完成' : '未完成');
      var status = $(id + '-status');
      status.classList.toggle('complete', complete);
      status.textContent = complete ? '✓ 本次探索已记录。预测不必全对，读懂解释就是收获。' : (state.touched[id] ? '已动手观察。再回答 ' + (2 - answered) + ' 道预测，就能记录这次探索。' : '已选择 ' + answered + ' / 2 个预测。动手改变参数后，答案会自动揭晓。');
    });
    text('record-summary', '已完成 ' + completeCount + ' / 3 个实验，已揭晓 ' + revealed + ' / 6 个预测。');
  }
  function updateFeedback(id) {
    questions[id].forEach(function (question, i) {
      var box = $(id + '-feedback-' + i);
      var answer = state.answers[id][i];
      box.classList.remove('is-correction');
      if (answer === null) { box.textContent = '先选一个答案，保留你的第一直觉。'; return; }
      if (!state.touched[id]) { box.textContent = '预测已选好。现在动手操作，看看会发生什么。'; return; }
      var correct = answer === question.answer;
      box.classList.toggle('is-correction', !correct);
      box.innerHTML = '<strong>' + (correct ? '✓ 预测吻合。' : '↗ 换个角度看。') + '</strong> ' + question.explanation;
    });
    updateProgress();
  }
  function touch(id) { state.touched[id] = true; updateFeedback(id); save(); }
  Object.keys(questions).forEach(function (id) {
    var container = $(id + '-questions');
    questions[id].forEach(function (q, i) {
      var fieldset = document.createElement('fieldset');
      fieldset.className = 'prediction-card';
      fieldset.innerHTML = '<legend>预测 ' + String(i + 1).padStart(2, '0') + '</legend><p class="prediction-prompt" id="' + id + '-question-' + i + '">' + q.title + '</p><div class="prediction-options">' + q.choices.map(function (option, j) { return '<label class="prediction-option"><input type="radio" name="' + id + '-prediction-' + i + '" value="' + j + '"' + (state.answers[id][i] === j ? ' checked' : '') + ' aria-describedby="' + id + '-feedback-' + i + '"><span>' + option + '</span></label>'; }).join('') + '</div><p class="prediction-feedback" id="' + id + '-feedback-' + i + '" aria-live="polite"></p>';
      fieldset.setAttribute('aria-labelledby', id + '-question-' + i);
      fieldset.addEventListener('change', function (event) { state.answers[id][i] = Number(event.target.value); updateFeedback(id); save(); });
      container.appendChild(fieldset);
    });
    updateFeedback(id);
  });
  var tabs = Array.from(document.querySelectorAll('[data-tab]'));
  function selectTab(id, focus) {
    tabs.forEach(function (tab) {
      var active = tab.dataset.tab === id;
      tab.setAttribute('aria-selected', String(active)); tab.tabIndex = active ? 0 : -1;
      $(tab.dataset.tab + '-panel').hidden = !active;
      if (active && focus) tab.focus();
    });
  }
  tabs.forEach(function (tab, i) {
    tab.addEventListener('click', function () { selectTab(tab.dataset.tab, false); });
    tab.addEventListener('keydown', function (event) {
      var next;
      if (event.key === 'ArrowRight') next = (i + 1) % tabs.length;
      if (event.key === 'ArrowLeft') next = (i + tabs.length - 1) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next !== undefined) { event.preventDefault(); selectTab(tabs[next].dataset.tab, true); }
    });
  });

  var currentAxis = 0;
  function renderAxis(start) {
    var bottom = 275, top = 35;
    var y = function (value) { return bottom - (value - start) / (12 - start) * (bottom - top); };
    var html = '<title>两组虚构均值：A组10，B组11。纵轴' + start + '至12。</title>';
    var ticks = start === 0 ? [0, 3, 6, 9, 12] : [9, 10, 11, 12];
    ticks.forEach(function (v) { html += line(62, y(v), 558, y(v), v === 0 ? 'baseline' : 'grid') + svgText(45, y(v) + 5, v, '', 'end'); });
    [10, 11].forEach(function (v, i) { var x = 153 + i * 220; html += '<rect x="' + x + '" y="' + y(v) + '" width="90" height="' + (bottom - y(v)) + '" rx="4" fill="' + (i ? '#f3a98f' : '#b8ee81') + '"/>' + svgText(x + 45, y(v) - 12, v, 'chart-label', 'middle') + svgText(x + 45, 308, (i ? 'B' : 'A') + ' 组', 'axis-label', 'middle'); });
    if (start !== 0) html += '<path d="M55 279l6-6 6 6 6-6" fill="none" stroke="#f3a98f" stroke-width="2"/>' + svgText(560, 17, '截断示范 · 不建议这样画柱形图', 'chart-note', 'end');
    else html += svgText(560, 17, '虚构均值 · 任意单位', 'axis-label', 'end');
    $('axis-chart').innerHTML = html;
    $('axis-chart').setAttribute('aria-label', 'A组均值10，B组均值11，纵轴' + start + '到12。绝对差1，相对A组高10%。' + (start ? '截断纵轴夸大视觉差异。' : '纵轴从零起。'));
    text('axis-range', '纵轴 ' + start + '—12');
    text('axis-caption', start ? '⚠ 起点被截到 9，露出的柱长成了 1 与 2。柱长比 2:1 不是原始数值比。' : '零起点让柱长与数值成比例。B 组是 A 组的 1.1 倍。');
    text('axis-insight', start ? '视觉差异被放大了，但数据并未增长。请读出刻度与数值：10 → 11，始终只增加 10%。' : '数值始终是 10 和 11，差异始终是 1。切换起点，看看同一份数据能给人多不同的印象。');
    document.querySelectorAll('[data-axis]').forEach(function (button) { button.setAttribute('aria-pressed', String(Number(button.dataset.axis) === start)); });
  }
  document.querySelectorAll('[data-axis]').forEach(function (button) { button.addEventListener('click', function () { var next = Number(button.dataset.axis); if (next !== currentAxis) { currentAxis = next; renderAxis(next); touch('axis'); } }); });
  renderAxis(0);

  function renderCenter() {
    var variable = Number($('extreme-value').value), values = FIXED.concat(variable), result = summarize(values);
    var x = function (v) { return 62 + v / 80 * 485; };
    var html = '<title>虚构数据排序散点图。数值为' + result.sorted.join('、') + '。均值' + fmt(result.mean) + '，中位数' + result.median + '。</title>';
    [0, 20, 40, 60, 80].forEach(function (v) { html += line(x(v), 42, x(v), 282, 'grid') + svgText(x(v), 309, v, 'axis-label', 'middle'); });
    html += line(62, 282, 547, 282, 'baseline');
    html += line(x(result.mean), 38, x(result.mean), 282, 'mean-line') + line(x(result.median), 38, x(result.median), 282, 'median-line');
    html += svgText(62, 19, '从小到大 ↓', 'axis-label') + svgText(547, 19, '数值 →', 'axis-label', 'end');
    result.sorted.forEach(function (v, i) {
      var cy = 54 + i * 25;
      html += svgText(43, cy + 4, i + 1, 'axis-label', 'end');
      if (i === 8) html += '<path d="M' + x(v) + ' ' + (cy - 7) + 'l7 7-7 7-7-7z" fill="#f3a98f" stroke="#102120" stroke-width="2"/>';
      else html += '<circle cx="' + x(v) + '" cy="' + cy + '" r="6" fill="#b8ee81" stroke="#102120" stroke-width="2"/>';
      html += svgText(x(v) + (v > 72 ? -13 : 13), cy + 5, v + (i === 4 ? ' · 中间位置' : ''), '', v > 72 ? 'end' : 'start');
    });
    $('center-chart').innerHTML = html;
    $('center-chart').setAttribute('aria-label', '按从小到大排序：' + result.sorted.join('、') + '。均值' + fmt(result.mean) + '，中位数' + result.median + '，极差' + result.range + '。');
    text('extreme-output', variable); text('mean-value', result.mean.toFixed(2)); text('median-value', result.median); text('value-range', result.min + '—' + result.max); text('spread-value', result.range);
    text('center-insight-title', variable === 14 ? '均值会跟着每一个值走。' : '均值变了，第 5 个值没变。');
    text('center-insight', '当前总和为 ' + result.sum + '，均值为 ' + result.mean.toFixed(2) + '；排序后的第 5 个值一直是 10。' + (variable > 14 ? '与可变值为 14 时相比，均值增加了 ' + fmt((variable - 14) / 9) + '。' : '把第 9 个值向右推，比较这两个指标。'));
    $('center-values').innerHTML = result.sorted.map(function (v, i) { return '<tr' + (i === 4 ? ' class="median-row"' : i === 8 ? ' class="variable-row"' : '') + '><td>' + (i + 1) + '</td><td>' + v + '</td><td>' + (i === 4 ? '第 5 个值 · 中位数' : i === 8 ? '◆ 可变测量值' : '● 固定测量值') + '</td></tr>'; }).join('');
    text('center-formula', '均值 = (' + values.join(' + ') + ') ÷ 9 = ' + result.sum + ' ÷ 9 ≈ ' + result.mean.toFixed(2) + '；中位数 = 第 5 个值 = 10。');
  }
  $('extreme-value').addEventListener('input', function () { renderCenter(); touch('center'); });
  renderCenter();

  var lastRun = null, currentCount = 100, busy = false;
  var simulationControls = ['sample-one', 'sample-many', 'sample-size', 'sample-seed', 'new-seed', 'repeat-sample', 'reset-record'];
  function seedInput() {
    var raw = $('sample-seed').value.trim(), seed = Number(raw), valid = raw !== '' && validSeed(seed);
    $('seed-error').hidden = valid;
    $('sample-seed').setAttribute('aria-invalid', String(!valid));
    return valid ? seed : null;
  }
  function renderSampling(results, n, seed) {
    var count = results.length, proportions = results.map(function (v) { return v / n; });
    var summary = summarize(proportions), last = results[count - 1], x = function (p) { return 62 + p * 485; };
    var html = '<title>教学模拟：' + count + '组，每组' + n + '次，实验编号' + seed + '。最后一组正面' + last + '次，占' + percent(last / n) + '。</title>';
    if (count > 1) {
      var bins = histogram(results, n), maxCount = Math.max.apply(null, bins), step = Math.max(1, Math.ceil(maxCount / 4)), ceiling = step * 4;
      var y = function (v) { return 276 - v / ceiling * 220; };
      for (var k = 0; k <= 4; k++) html += line(62, y(k * step), 547, y(k * step), k ? 'grid' : 'baseline') + svgText(47, y(k * step) + 5, k * step, 'axis-label', 'end');
      bins.forEach(function (v, i) { if (v) html += '<rect x="' + (x(i / 20) + 1) + '" y="' + y(v) + '" width="22.25" height="' + (276 - y(v)) + '" rx="2" fill="#b8ee81"><title>' + (i * 5) + '%—' + ((i + 1) * 5) + '%：' + v + '组</title></rect>'; });
      html += line(x(0.5), 47, x(0.5), 276, 'theory-line') + svgText(62, 22, '组数', 'axis-label') + svgText(x(0.5) + 7, 36, '理论 50%', 'chart-note');
      text('sampling-caption', '每根柱表示落在该比例区间的组数；虚线标出理论概率 50%，不是每组必须达到的结果。');
    } else {
      html += line(62, 220, 547, 220, 'baseline') + line(x(0.5), 65, x(0.5), 220, 'theory-line');
      html += '<circle cx="' + x(last / n) + '" cy="150" r="12" fill="#b8ee81" stroke="#edf6f1" stroke-width="2"/>' + line(x(last / n), 164, x(last / n), 220, 'mean-line');
      html += svgText(Math.max(105, Math.min(500, x(last / n))), 119, percent(last / n), 'chart-label', 'middle') + svgText(x(0.5) + 7, 61, '理论 50%', 'chart-note');
      text('sampling-caption', '圆点是这一组模拟的正面比例，虚线是理论概率。再抽 100 组，看看比例会落在哪些位置。');
    }
    [0, 0.25, 0.5, 0.75, 1].forEach(function (v) { html += svgText(x(v), 308, Math.round(v * 100) + '%', 'axis-label', 'middle'); });
    $('sampling-chart').innerHTML = html;
    $('sampling-chart').setAttribute('aria-label', count + '组教学随机模拟，每组' + n + '次，正面比例从' + percent(summary.min) + '到' + percent(summary.max) + '。理论正面概率50%。具体组数见下方结果表。');
    text('sampling-chart-title', count > 1 ? '100 组正面比例的分布' : '这一组，落在这里');
    text('sampling-chart-meta', '每组 ' + n + ' 次'); text('actual-label', count > 1 ? '最后一组正面比例' : '这一组正面比例');
    text('actual-proportion', percent(last / n)); text('heads-count', last + ' 次正面 / ' + n + ' 次');
    text('sampling-spread-label', count > 1 ? '100 组比例范围' : '这一组正反面次数');
    text('sampling-range', count > 1 ? percent(summary.min) + '—' + percent(summary.max) : last + ' / ' + (n - last));
    text('exact-count', count > 1 ? results.filter(function (h) { return h * 2 === n; }).length + ' 组恰好 50%' : '正面 / 反面');
    text('sampling-table-caption', '实验编号 ' + seed + ' · ' + count + ' 组 × ' + n + ' 次 · 教学模拟');
    text('sampling-table-note', '各组正面比例的平均值：' + percent(summary.mean) + '；最小值：' + percent(summary.min) + '；最大值：' + percent(summary.max) + '。');
    $('sampling-values').innerHTML = results.map(function (h, i) { return '<tr><td>' + (i + 1) + '</td><td>' + h + ' / ' + n + '</td><td>' + percent(h / n) + '</td></tr>'; }).join('');
  }
  function runSimulation(count, interacted, restored) {
    if (busy) return;
    var seed = seedInput();
    if (seed === null) return;
    var n = Number($('sample-size').value);
    validateSimulation(n, count, seed);
    busy = true; currentCount = count;
    simulationControls.forEach(function (id) { $(id).disabled = true; });
    $('sampling-chart').setAttribute('aria-busy', 'true');
    text('simulation-status', '正在生成 ' + count + ' 组教学模拟，每组 ' + n + ' 次……');
    var results = [], random = makeRandom(seed);
    function chunk() {
      var end = Math.min(count, results.length + 10);
      while (results.length < end) results.push(sampleHeads(n, random));
      if (results.length < count) { root.setTimeout(chunk, 0); return; }
      renderSampling(results, n, seed);
      lastRun = { n: n, count: count, seed: seed };
      busy = false;
      simulationControls.forEach(function (id) { $(id).disabled = false; });
      $('sampling-chart').setAttribute('aria-busy', 'false');
      text('simulation-status', (restored ? '已重复同一组实验：' : interacted ? '模拟完成：' : '默认示例：') + '实验编号 ' + seed + '，' + count + ' 组 × ' + n + ' 次。' + (restored ? '参数与结果均与上次相同。' : '更换编号可观察另一组结果。'));
      if (interacted) touch('sampling');
    }
    root.setTimeout(chunk, 0);
  }
  $('sample-one').addEventListener('click', function () { runSimulation(1, true); });
  $('sample-many').addEventListener('click', function () { runSimulation(100, true); });
  $('sample-size').addEventListener('change', function () { runSimulation(currentCount, true); });
  // Do not launch on blur: that would disable a sampling/repeat button before its click.
  $('sample-seed').addEventListener('change', function () {
    if (seedInput() !== null) text('simulation-status', '实验编号已修改。点击「抽一组」或「抽 100 组」生成结果；当前图表仍显示上一组实验。');
  });
  $('new-seed').addEventListener('click', function () {
    var current = Number($('sample-seed').value), fresh;
    if (root.crypto && root.crypto.getRandomValues) { var array = new Uint32Array(1); root.crypto.getRandomValues(array); fresh = array[0]; }
    else fresh = Math.floor(Math.random() * 4294967296);
    if (fresh === current) fresh = (fresh + 1) >>> 0;
    $('sample-seed').value = fresh;
    runSimulation(currentCount, true);
  });
  $('repeat-sample').addEventListener('click', function () {
    if (!lastRun) return;
    $('sample-size').value = lastRun.n; $('sample-seed').value = lastRun.seed;
    runSimulation(lastRun.count, true, true);
  });
  $('reset-record').addEventListener('click', function () {
    Object.keys(questions).forEach(function (id) { state.answers[id] = [null, null]; state.touched[id] = false; state.completed[id] = false; document.querySelectorAll('input[name^="' + id + '-prediction-"]').forEach(function (input) { input.checked = false; }); updateFeedback(id); });
    save(); text('record-summary', '本页记录已重置。已完成 0 / 3 个实验，已揭晓 0 / 6 个预测。');
  });
  save();
  runSimulation(100, false);
})(typeof globalThis !== 'undefined' ? globalThis : window);


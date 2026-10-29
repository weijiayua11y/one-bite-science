(function () {
  'use strict';
  window.LabModules = window.LabModules || {};
  window.LabModules.emulsion = {
    mount: function (container, options) {
      options = options || {};
      var uid = 'emx-' + Math.random().toString(36).slice(2, 9);
      var state = { stage: 0, current: null, previous: null, baseline: null, trials: 0, completed: false };
      var steps = [
        ['先把油滴打散', '先不加乳化剂，用中速或高速搅拌，观察油滴如何分散。'],
        ['只改变一个条件', '保持上一关的油水比例和搅拌强度，加入适合本模型的乳化剂，再做一次对照。'],
        ['看懂“混合”', '油滴仍然存在。选择最准确的解释，完成你的界面观察记录。']
      ];
      container.innerHTML = '<section class="emx-root" aria-labelledby="' + uid + '-title">' +
        '<div class="emx-heading"><div><span class="emx-eyebrow">INTERFACE LAB / 界面实验室</span><h2 id="' + uid + '-title">乳化工坊<span>让油和水，暂时相处。</span></h2></div><span class="emx-pill">概念实验 · 3 个挑战</span></div>' +
        '<ol class="emx-steps" aria-label="挑战进度"><li>01 打散</li><li>02 对照</li><li>03 判断</li></ol>' +
        '<div class="emx-task"><span class="emx-eyebrow" data-role="stage"></span><h3 data-role="task-title"></h3><p data-role="task-text"></p></div>' +
        '<div class="emx-workbench"><form class="emx-controls"><h3>调配台</h3><label for="' + uid + '-oil">油的比例 <output data-role="ratio">水 80 : 油 20</output></label><input id="' + uid + '-oil" name="oil" type="range" min="10" max="40" step="10" value="20"><div class="emx-scale"><span>少一点油</span><span>多一点油</span></div>' +
        '<fieldset><legend>搅拌强度</legend><div class="emx-choices"><label><input type="radio" name="mix" value="low" checked><span>低速</span></label><label><input type="radio" name="mix" value="medium"><span>中速</span></label><label><input type="radio" name="mix" value="high"><span>高速</span></label></div></fieldset>' +
        '<label class="emx-toggle"><input type="checkbox" name="agent"><span>加入合适的乳化剂<small>假设种类、用量与条件相匹配</small></span></label>' +
        '<button class="emx-run" type="submit">搅拌，观察 →</button><p class="emx-small">这里固定演示油滴分散在水中。比例不单独决定真实乳液的类型。</p></form>' +
        '<div class="emx-observatory"><div class="emx-observe-head"><h3>观察窗</h3><span data-role="trial">尚未开始</span></div><div class="emx-compare"><article data-role="previous"></article><article data-role="current"></article></div><div class="emx-legend"><span><i class="emx-water-dot"></i>水相</span><span><i class="emx-oil-dot"></i>油滴 / 油层</span><span><i class="emx-agent-dot"></i>界面保护示意</span></div><p class="emx-small">画面并列展示“刚搅拌后 → 示意静置后”。油滴合并与上浮被大幅简化；时间、大小和分散指数均无实际单位，不代表实测稳定性或保质期。</p></div></div>' +
        '<div class="emx-feedback" role="status" aria-live="polite">准备好了。先选一种搅拌强度，开始第一轮观察。</div>' +
        '<fieldset class="emx-quiz" hidden><legend>这杯看似均匀的混合物，发生了什么？</legend><button type="button" data-answer="dissolve">油已变成分子，溶解在水里</button><button type="button" data-answer="disperse">油以小液滴分散；乳化剂可帮助延缓油滴合并</button><button type="button" data-answer="forever">只要搅拌足够强，就能永久稳定</button></fieldset>' +
        '<div class="emx-footer"><button type="button" class="emx-reset">重新实验</button><details><summary>为什么会这样？查看科学依据</summary><p>搅拌可把不互溶的液体打散成液滴。合适的乳化剂可抑制液滴聚并，但乳化不等于分子溶解，也不保证永久稳定。实际行为还取决于乳化剂、配方、液滴大小和环境。</p><a href="https://openstax.org/books/chemistry-2e/pages/11-5-colloids" target="_blank" rel="noopener noreferrer">OpenStax《Chemistry 2e》11.5：胶体与乳液 ↗</a><a href="https://rockedu.rockefeller.edu/level/what-to-know-about-emulsions/" target="_blank" rel="noopener noreferrer">洛克菲勒大学 RockEDU：认识乳液 ↗</a></details></div></section>';
      var root = container.querySelector('.emx-root');
      var form = root.querySelector('form');
      function el(role) { return root.querySelector('[data-role="' + role + '"]'); }
      function config() { return { oil: Number(form.elements.oil.value), mix: form.elements.mix.value, agent: form.elements.agent.checked }; }
      function same(a, b) { return a.oil === b.oil && a.mix === b.mix; }
      function updateStage() {
        var index = Math.min(state.stage, 2);
        el('stage').textContent = state.completed ? '挑战完成 / 3 OF 3' : '挑战 ' + (index + 1) + ' / 3';
        el('task-title').textContent = state.completed ? '界面探索家，记录完成！' : steps[index][0];
        el('task-text').textContent = state.completed ? '你已发现：打散油滴、保护界面、理解分散，是三件相互关联的事。还可以继续调整条件，自由比较。' : steps[index][1];
        root.querySelectorAll('.emx-steps li').forEach(function (li, i) { li.classList.toggle('emx-done', i < state.stage); li.classList.toggle('emx-active', i === state.stage); if (i === state.stage) li.setAttribute('aria-current', 'step'); else li.removeAttribute('aria-current'); });
        root.querySelector('.emx-quiz').hidden = state.stage !== 2 || state.completed;
      }
      function vessel(run, settled) {
        var strength = { low: 1, medium: 2, high: 3 }[run.mix];
        var count = settled ? (run.agent ? strength * 5 : strength + 1) : strength * 6;
        var drops = '';
        for (var i = 0; i < count; i++) {
          var size = (settled && !run.agent ? 20 : 19 - strength * 3) + (i % 3) * 2;
          drops += '<i class="emx-drop' + (run.agent ? ' emx-protected' : '') + '" style="left:' + (12 + (i * 29 % 72)) + '%;top:' + ((settled && !run.agent ? 22 : 16) + (i * 19 % (settled && !run.agent ? 24 : 65))) + '%;width:' + size + 'px;height:' + size + 'px;--emx-delay:' + (i % 5 * -0.4) + 's"></i>';
        }
        return '<div class="emx-vessel" aria-hidden="true"><div class="emx-oil-layer" style="height:' + (settled ? (run.agent ? run.oil * .22 : run.oil * .95) : 3) + '%"></div>' + drops + '</div>';
      }
      function card(run, title) {
        if (!run) return '<h4>' + title + '</h4><div class="emx-empty"><span>◌</span><p>等待一杯新实验</p></div>';
        var names = { low: '低速', medium: '中速', high: '高速' };
        return '<h4>' + title + '<span>#' + run.number + '</span></h4><p class="emx-recipe">水 ' + (100 - run.oil) + ' : 油 ' + run.oil + ' · ' + names[run.mix] + ' · ' + (run.agent ? '加乳化剂' : '无乳化剂') + '</p><div class="emx-pair">' + vessel(run, false) + '<span class="emx-arrow" aria-hidden="true">→</span>' + vessel(run, true) + '</div><div class="emx-time-label"><span>刚搅拌后</span><span>示意静置后</span></div><div class="emx-index"><span>示意分散指数</span><strong>' + run.index + '<small> / 100</small></strong></div><div class="emx-meter" aria-hidden="true"><i style="width:' + run.index + '%"></i></div><p class="emx-result">' + (run.agent ? '界面受到保护，示意窗口内保留更多分散油滴。' : '先形成分散油滴，随后油滴合并、上浮，油层更明显。') + '</p>';
      }
      function draw() { el('previous').innerHTML = card(state.previous, '上一轮'); el('current').innerHTML = card(state.current, '本轮'); }
      function feedback(text) { root.querySelector('.emx-feedback').textContent = text; }
      function onInput() { var oil = Number(form.elements.oil.value); el('ratio').textContent = '水 ' + (100 - oil) + ' : 油 ' + oil; }
      function onRun(event) {
        event.preventDefault();
        var c = config(); c.number = ++state.trials;
        c.index = Math.round(({ low: 16, medium: 30, high: 38 }[c.mix] + (c.agent ? 42 : 0)) - (c.oil - 10) / 5);
        state.previous = state.current; state.current = c; draw(); el('trial').textContent = '已观察 ' + state.trials + ' 轮';
        if (state.stage === 0) {
          if (c.agent) feedback('先建立无乳化剂的对照。取消乳化剂，再试中速或高速；这样才能分辨搅拌与乳化剂各自的作用。');
          else if (c.mix === 'low') feedback('你已经打散了一部分油。提高到中速或高速，观察更细分散的油滴；仅靠搅拌仍不能保证长期稳定。');
          else { state.baseline = c; state.stage = 1; feedback('挑战 1 完成：搅拌让油形成小液滴，但示意静置后仍会聚并、分层。记住本轮设置：水 ' + (100 - c.oil) + ' : 油 ' + c.oil + '，' + ({ medium: '中速', high: '高速' }[c.mix]) + '。下一轮只添加乳化剂。'); }
        } else if (state.stage === 1) {
          if (!same(c, state.baseline)) feedback('对照需要保持比例和搅拌强度一致。请恢复水 ' + (100 - state.baseline.oil) + ' : 油 ' + state.baseline.oil + '、' + (state.baseline.mix === 'high' ? '高速' : '中速') + '，再加入乳化剂。');
          else if (!c.agent) feedback('条件与对照一致了。加入合适的乳化剂，再观察示意静置后的区别。');
          else {
            state.previous = state.baseline; draw(); state.stage = 2;
            feedback('挑战 2 完成：同样的比例和搅拌条件下，合适的乳化剂可帮助延缓聚并。指数只是教学符号，差值不是实测改善幅度。最后，判断这是什么混合方式。');
          }
        } else feedback('新的比较已记录。画面中的油滴仍然是液滴；真实乳液的稳定性需要实验验证。');
        updateStage();
      }
      function onClick(event) {
        var answer = event.target.closest('[data-answer]');
        if (answer && state.stage === 2 && !state.completed) {
          if (answer.dataset.answer === 'disperse') {
            state.stage = 3; state.completed = true; updateStage();
            feedback('全部完成！你获得「界面探索家」徽章。乳化是液滴分散，合适的乳化剂帮助延缓聚并；它不等于溶解，也不是永久稳定的承诺。');
            if (typeof options.onComplete === 'function') options.onComplete({ game: 'emulsion', score: 3, maxScore: 3, badge: '界面探索家' });
          } else feedback(answer.dataset.answer === 'dissolve' ? '再看看油滴：它们并没有变成均匀分布的单个分子。乳化保留了液滴与水之间的界面，请再选一次。' : '高速能促进初始分散，但不能承诺永久稳定。合适的乳化剂也只能帮助延缓某些失稳过程，请再选一次。');
        }
        if (event.target.closest('.emx-reset')) {
          state = { stage: 0, current: null, previous: null, baseline: null, trials: 0, completed: false };
          form.reset(); onInput(); draw(); updateStage(); el('trial').textContent = '尚未开始'; feedback('实验已重置。先不加乳化剂，用中速或高速搅拌。');
        }
      }
      form.addEventListener('submit', onRun); form.addEventListener('input', onInput); root.addEventListener('click', onClick);
      draw(); updateStage();
      return function () { form.removeEventListener('submit', onRun); form.removeEventListener('input', onInput); root.removeEventListener('click', onClick); root.remove(); };
    }
  };
})();

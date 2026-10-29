/* 微观快递：原创虚构游戏。经典脚本，不依赖网络或第三方库。 */
(function (root) {
  'use strict';

  const TYPES = {
    a: { name: '青圆', color: '#b8ee81', symbol: '●', short: '圆' },
    b: { name: '珊瑚菱', color: '#f3a98f', symbol: '◆', short: '菱' },
    c: { name: '蓝三角', color: '#a5cfe4', symbol: '▲', short: '角' }
  };
  const LEVELS = [
    {
      title: '第一件，出发', icon: '○', feature: '认路 · 取件 · 对应投递', time: 90,
      description: '取走青圆包裹，再把它送进同样图形的大圆环。',
      tip: '走到小青圆旁按空格取件，再走到青圆收集站按空格投递。每次只能带一件。',
      map: [
        '#############', '#S..........#', '#...........#', '#....##.....#',
        '#..a....A...#', '#....##.....#', '#...........#', '#...........#', '#############'
      ]
    },
    {
      title: '拐个弯，别认错', icon: '◇', feature: '双颜色 · 小迷宫', time: 110,
      description: '两种包裹、两个收集站。绕过绿墙，认准颜色与图形。',
      tip: '青圆找青圆，珊瑚菱找珊瑚菱。错误投递不会丢件，挑战模式会消耗一格护盾。',
      map: [
        '#############', '#S...#...B..#', '#.a..#......#', '#....#..##..#',
        '#...........#', '#..##..#....#', '#......#..b.#', '#..A...#....#', '#############'
      ]
    },
    {
      title: '旋臂的空隙', icon: '╱', feature: '旋转障碍 · 等待与绕行', time: 110,
      description: '看清珊瑚色旋臂的方向，等一等，或绕它过去。',
      tip: '旋臂会送你回出发点，但携带的包裹会保留。虚线圈是旋臂的活动范围；可以从外侧绕行。',
      rotors: [{ speed: 1.15, length: 1.03, phase: 0.4 }],
      map: [
        '#############', '#S........A.#', '#..a........#', '#..##...##..#',
        '#.....R.....#', '#..##...##..#', '#........b..#', '#.B.........#', '#############'
      ]
    },
    {
      title: '先把小门打开', icon: '⌑', feature: '开关 · 闸门 · 三色投递', time: 140,
      description: '去左侧开关旁按空格，打开中央闸门，再去右边派送。',
      tip: '标着「开」的浅绿按钮只需按一次。开启后闸门永久保持畅通，不必赶时间冲过。',
      map: [
        '#############', '#S....#...A.#', '#..a..#.....#', '#.....#..c..#',
        '#..T..G.....#', '#.....#...B.#', '#..b..#.....#', '#.....#...C.#', '#############'
      ]
    },
    {
      title: '顺着风，逆着走', icon: '→', feature: '传送带 · 抵消漂移', time: 150,
      description: '箭头地面会轻轻推你。跟着走更快，逆着走也走得动。',
      tip: '浅绿箭头是传送带，不是墙。方向键可以抵消它的推动；用上下方向离开传送带也很方便。',
      rotors: [{ speed: -0.9, length: 0.82, phase: 1.0 }],
      map: [
        '#############', '#S......A...#', '#.a.>>>>>>..#', '#...##......#',
        '#...R...b.B.#', '#......##...#', '#..<<<<<<.c.#', '#.C.........#', '#############'
      ]
    },
    {
      title: '隔壁，瞬间到', icon: '◎', feature: '成对传送门 · 携货穿行', time: 150,
      description: '两侧不相通？站到蓝色螺旋圆环上，按空格穿过去。',
      tip: '两扇蓝色传送门相连。站在环内按空格即可传送，货物也会跟着你；到达后仍可按空格返回。',
      map: [
        '#############', '#S....#...A.#', '#..a..#.....#', '#.....#..c..#',
        '#..P..#..P..#', '#.....#...B.#', '#..b..#.....#', '#..C..#.....#', '#############'
      ]
    },
    {
      title: '签收，有个顺序', icon: '123', feature: '顺序投递 · 双旋臂', time: 170,
      order: ['a', 'b', 'c'],
      description: '按 ① 青圆 → ② 珊瑚菱 → ③ 蓝三角的顺序签收。',
      tip: '包裹可以先拿起来，但必须按清单顺序投递。拿错顺序也不用重开：在空地按空格可以放下包裹。',
      rotors: [{ speed: 0.85, length: 0.82, phase: 0 }, { speed: -0.92, length: 0.82, phase: 1.4 }],
      map: [
        '#############', '#S........C.#', '#..b....a...#', '#....#......#',
        '#..R.....R..#', '#......#....#', '#.A......c..#', '#.....B.....#', '#############'
      ]
    },
    {
      title: '今天，也全部送达', icon: '✦', feature: '综合工坊 · 四件小包裹', time: 200,
      description: '打开闸门，利用箭头与传送门，把最后四件包裹送到家。',
      tip: '青圆有两件，珊瑚菱和蓝三角各一件，本关不限制投递顺序。先开门，再安排你自己的路线。',
      rotors: [{ speed: 0.9, length: 0.84, phase: 0.7 }, { speed: -0.8, length: 0.82, phase: 1.3 }],
      map: [
        '#############', '#S..a.#...A.#', '#T....#..c..#', '#..R..#.....#',
        '#.....G.>>>.#', '#..b..#..R..#', '#.P.a.#...P.#', '#.....#B..C.#', '#############'
      ]
    }
  ];
  const DIRS = { '>': [1, 0], '<': [-1, 0], '^': [0, -1], v: [0, 1] };
  const RADIUS = 0.245;
  function emit(g, type, message) { g.events.push({ type: type, message: message }); }
  function parseLevel(index) {
    const l = LEVELS[index];
    if (!l) throw new Error('关卡不存在');
    const parsed = { width: l.map[0].length, height: l.map.length, walls: [], pickups: [], docks: [], rotors: [], gates: [], switches: [], portals: [], belts: [], spawn: null };
    let parcelId = 0;
    l.map.forEach(function (row, y) {
      if (row.length !== parsed.width) throw new Error('关卡地图宽度不一致：' + (index + 1));
      Array.from(row).forEach(function (tile, x) {
        const p = { x: x + 0.5, y: y + 0.5 };
        if (tile === '#') parsed.walls.push({ x: x, y: y });
        else if (tile === 'S') parsed.spawn = p;
        else if (TYPES[tile]) parsed.pickups.push({ id: parcelId++, x: p.x, y: p.y, type: tile });
        else if ('ABC'.includes(tile)) parsed.docks.push({ x: p.x, y: p.y, type: tile.toLowerCase() });
        else if (tile === 'R') {
          const config = (l.rotors || [])[parsed.rotors.length] || {};
          parsed.rotors.push(Object.assign(p, { speed: config.speed || 1, length: config.length || 0.8, phase: config.phase || 0 }));
        } else if (tile === 'G') parsed.gates.push({ x: x, y: y });
        else if (tile === 'T') parsed.switches.push(p);
        else if (tile === 'P') parsed.portals.push(p);
        else if (DIRS[tile]) parsed.belts.push({ x: x, y: y, dx: DIRS[tile][0], dy: DIRS[tile][1] });
      });
    });
    if (!parsed.spawn) throw new Error('关卡没有出发点');
    if (parsed.portals.length !== 0 && parsed.portals.length !== 2) throw new Error('传送门须成对');
    return parsed;
  }
  function createGame(index, mode) {
    const map = parseLevel(index);
    const counts = {};
    map.pickups.forEach(function (p) { counts[p.type] = (counts[p.type] || 0) + 1; });
    return { index: index, mode: mode === 'challenge' ? 'challenge' : 'practice', map: map, level: LEVELS[index],
      player: { x: map.spawn.x, y: map.spawn.y, facing: 1 }, pickups: map.pickups.map(function (p) { return Object.assign({}, p); }),
      total: map.pickups.length, targets: counts, delivered: {}, deliveredCount: 0, carrying: null, gateOpen: false,
      elapsed: 0, timeLimit: LEVELS[index].time, shields: 3, faults: 0, invulnerable: 0, status: 'playing', events: [], distance: 0 };
  }
  function distance(a, b) { return Math.hypot(a.x - b.x, a.y - b.y); }
  function isFree(g, x, y) {
    const walls = g.gateOpen ? g.map.walls : g.map.walls.concat(g.map.gates);
    for (const w of walls) {
      const nx = Math.max(w.x, Math.min(x, w.x + 1));
      const ny = Math.max(w.y, Math.min(y, w.y + 1));
      if ((x - nx) * (x - nx) + (y - ny) * (y - ny) < RADIUS * RADIUS - 1e-8) return false;
    }
    return x >= RADIUS && y >= RADIUS && x <= g.map.width - RADIUS && y <= g.map.height - RADIUS;
  }
  function segmentDistance(px, py, ax, ay, bx, by) {
    const dx = bx - ax, dy = by - ay;
    const t = Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy)));
    return Math.hypot(px - ax - t * dx, py - ay - t * dy);
  }
  function hit(g, message, resetPosition) {
    g.faults += 1;
    if (g.mode === 'challenge') g.shields -= 1;
    if (resetPosition) {
      g.player.x = g.map.spawn.x; g.player.y = g.map.spawn.y; g.invulnerable = 2;
    }
    if (g.mode === 'challenge' && g.shields <= 0) {
      g.status = 'lost'; emit(g, 'lose', '护盾用完了。路线已经熟悉了，再来一次。');
    } else {
      emit(g, 'notice', message + (g.mode === 'challenge' ? ' · 剩余 ' + g.shields + ' 格护盾' : ' · 可以继续，包裹还在'));
    }
  }
  function advance(g, delta, input) {
    if (g.status !== 'playing') return;
    const bounded = Math.min(0.1, Math.max(0, Number(delta) || 0));
    const steps = Math.max(1, Math.ceil(bounded / 0.012));
    const dt = bounded / steps;
    let ix = Number(input && input.x) || 0, iy = Number(input && input.y) || 0;
    const n = Math.hypot(ix, iy); if (n > 1) { ix /= n; iy /= n; }
    for (let s = 0; s < steps && g.status === 'playing'; s++) {
      g.elapsed += dt;
      if (g.mode === 'challenge' && g.elapsed >= g.timeLimit) {
        g.elapsed = g.timeLimit; g.status = 'lost'; emit(g, 'lose', '这一班的时间到了。换成慢慢送，也能继续解锁。'); break;
      }
      g.invulnerable = Math.max(0, g.invulnerable - dt);
      let vx = ix * 3.05, vy = iy * 3.05;
      const belt = g.map.belts.find(function (b) { return Math.floor(g.player.x) === b.x && Math.floor(g.player.y) === b.y; });
      if (belt) { vx += belt.dx * 0.88; vy += belt.dy * 0.88; }
      const oldX = g.player.x, oldY = g.player.y;
      if (isFree(g, oldX + vx * dt, oldY)) g.player.x += vx * dt;
      if (isFree(g, g.player.x, oldY + vy * dt)) g.player.y += vy * dt;
      g.distance += Math.hypot(g.player.x - oldX, g.player.y - oldY);
      if (ix) g.player.facing = Math.sign(ix);
      if (g.invulnerable <= 0) {
        for (const r of g.map.rotors) {
          const angle = r.phase + g.elapsed * r.speed;
          const dx = Math.cos(angle) * r.length, dy = Math.sin(angle) * r.length;
          if (segmentDistance(g.player.x, g.player.y, r.x - dx, r.y - dy, r.x + dx, r.y + dy) < RADIUS + 0.11) {
            hit(g, '碰到旋臂，回出发点调整一下', true); break;
          }
        }
      }
    }
  }
  function nearby(g, list, radius) {
    return list.filter(function (p) { return distance(g.player, p) < radius; }).sort(function (a, b) { return distance(g.player, a) - distance(g.player, b); })[0];
  }
  function getAction(g) {
    const dock = nearby(g, g.map.docks, 0.69);
    if (g.carrying && dock) return { kind: 'deliver', target: dock, label: '投递包裹', prompt: '按空格投递至' + TYPES[dock.type].name + '收集站' };
    const sw = nearby(g, g.map.switches, 0.65);
    if (sw && !g.gateOpen) return { kind: 'switch', target: sw, label: '打开闸门', prompt: '按空格打开闸门 · 开启后一直畅通' };
    if (!g.carrying) {
      const parcel = nearby(g, g.pickups, 0.64);
      if (parcel) return { kind: 'pickup', target: parcel, label: '取走' + TYPES[parcel.type].name, prompt: '按空格取走' + TYPES[parcel.type].name + '包裹' };
    }
    const portal = nearby(g, g.map.portals, 0.47);
    if (portal) return { kind: 'portal', target: portal, label: '使用传送门', prompt: '按空格穿过传送门 · 可带包裹' };
    if (g.carrying) return { kind: 'drop', label: '放下包裹', prompt: '去' + TYPES[g.carrying.type].name + '收集站 · 空格可在空地放下包裹' };
    return { kind: 'none', label: '取件 / 投递', prompt: '靠近小图形包裹，再按空格取件' };
  }
  function interact(g) {
    if (g.status !== 'playing') return;
    const action = getAction(g);
    if (action.kind === 'pickup') {
      g.carrying = action.target;
      g.pickups = g.pickups.filter(function (p) { return p.id !== action.target.id; });
      emit(g, 'notice', '取到' + TYPES[g.carrying.type].name + '，去对应的大圆环投递');
    } else if (action.kind === 'deliver') {
      if (action.target.type !== g.carrying.type) {
        hit(g, '图形不对应，包裹仍在你手里', false); return;
      }
      const order = g.level.order;
      if (order && order[g.deliveredCount] !== g.carrying.type) {
        emit(g, 'notice', '先送' + TYPES[order[g.deliveredCount]].name + '；你可以在空地放下当前包裹'); return;
      }
      const type = g.carrying.type;
      g.delivered[type] = (g.delivered[type] || 0) + 1; g.deliveredCount += 1; g.carrying = null;
      if (g.deliveredCount === g.total) { g.status = 'won'; emit(g, 'win', '本关包裹已全部送达！'); }
      else emit(g, 'notice', '签收成功！还有 ' + (g.total - g.deliveredCount) + ' 件小包裹');
    } else if (action.kind === 'switch') {
      g.gateOpen = true; emit(g, 'notice', '闸门打开了，这条路现在一直畅通');
    } else if (action.kind === 'portal') {
      const other = g.map.portals.find(function (p) { return p !== action.target; });
      g.player.x = other.x; g.player.y = other.y; g.invulnerable = Math.max(g.invulnerable, 0.7);
      emit(g, 'notice', '已到另一侧 · 需要返回时再按一次空格');
    } else if (action.kind === 'drop') {
      // Keep machinery clear so a dropped parcel never hides its only interaction.
      const occupied = nearby(g, g.map.docks.concat(g.map.switches, g.map.portals, g.pickups), 0.85);
      if (occupied) { emit(g, 'notice', '再走开一点，在空地放下包裹'); return; }
      if (g.map.rotors.some(function (r) { return distance(g.player, r) < r.length + 0.65; })) {
        emit(g, 'notice', '离旋臂远一点，再把包裹放在安全的空地上'); return;
      }
      g.carrying.x = g.player.x; g.carrying.y = g.player.y; g.pickups.push(g.carrying); g.carrying = null;
      emit(g, 'notice', '包裹已轻轻放下，之后可以再来取');
    } else emit(g, 'notice', '靠近小包裹、大圆环或机关，再按空格');
  }
  function reachableCheck(index) {
    const g = createGame(index, 'practice'), m = g.map;
    const wallKeys = new Set(m.walls.map(function (w) { return w.x + ',' + w.y; }));
    const gateKeys = new Set(m.gates.map(function (w) { return w.x + ',' + w.y; }));
    const key = function (x, y, open) { return x + ',' + y + ',' + (open ? 1 : 0); };
    const queue = [{ x: Math.floor(m.spawn.x), y: Math.floor(m.spawn.y), open: false }], seen = new Set();
    for (let i = 0; i < queue.length; i++) {
      const p = queue[i], k = key(p.x, p.y, p.open); if (seen.has(k)) continue; seen.add(k);
      if (m.switches.some(function (s) { return Math.floor(s.x) === p.x && Math.floor(s.y) === p.y; }) && !p.open) queue.push({ x: p.x, y: p.y, open: true });
      for (const d of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const nx = p.x + d[0], ny = p.y + d[1], nk = nx + ',' + ny;
        if (nx < 0 || nx >= m.width || ny < 0 || ny >= m.height || wallKeys.has(nk) || (!p.open && gateKeys.has(nk))) continue;
        if (!seen.has(key(nx, ny, p.open))) queue.push({ x: nx, y: ny, open: p.open });
      }
      const portal = m.portals.find(function (s) { return Math.floor(s.x) === p.x && Math.floor(s.y) === p.y; });
      if (portal) { const other = m.portals.find(function (s) { return s !== portal; }); queue.push({ x: Math.floor(other.x), y: Math.floor(other.y), open: p.open }); }
    }
    const blocked = m.pickups.concat(m.docks, m.switches, m.portals).filter(function (p) {
      return !seen.has(key(Math.floor(p.x), Math.floor(p.y), false)) && !seen.has(key(Math.floor(p.x), Math.floor(p.y), true));
    });
    return { level: index + 1, pass: blocked.length === 0, exploredStates: seen.size, blocked: blocked };
  }
  root.MicroCourierCore = { LEVELS: LEVELS, TYPES: TYPES, createGame: createGame, advance: advance, interact: interact, getAction: getAction, isFree: isFree, reachableCheck: reachableCheck };
  if (typeof document === 'undefined') return;

  const $ = function (id) { return document.getElementById(id); };
  const canvas = $('game-canvas'), ctx = canvas.getContext('2d');
  const dialog = $('game-dialog');
  const storageKey = 'oneBiteMicroCourier.v1';
  let game = null, mode = 'practice', progress = { unlocked: 1, records: {} }, screen = 'home';
  let keys = new Set(), pointers = new Map(), lastFrame = 0, toastTimer = 0, dialogKind = '', helpReturnsToPlay = false;
  let previousHud = '', previousGoals = '', resultShown = false, stored = true;
  let reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', function (e) { reducedMotion = e.matches; });

  function storageUnavailable() {
    stored = false; $('storage-note').hidden = false;
    $('storage-note').textContent = '本地保存暂不可用，这次仍可正常游玩。关闭页面后进度可能不会保留。';
  }
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || 'null');
    if (saved && Number.isInteger(saved.unlocked) && saved.unlocked >= 1 && saved.unlocked <= 8) {
      progress.unlocked = saved.unlocked;
      if (saved.records && typeof saved.records === 'object') {
        for (let i = 0; i < 8; i++) {
          const rec = saved.records[i]; if (!rec || typeof rec !== 'object') continue;
          for (const m of ['practice', 'challenge']) {
            const v = rec[m];
            if (v && Number.isFinite(v.best) && v.best >= 0 && Number.isInteger(v.stars) && v.stars >= 1 && v.stars <= 3) {
              if (!progress.records[i]) progress.records[i] = {};
              progress.records[i][m] = { best: v.best, stars: v.stars };
            }
          }
        }
      }
    }
  } catch (_) { storageUnavailable(); }
  function saveProgress() { try { localStorage.setItem(storageKey, JSON.stringify(progress)); } catch (_) { storageUnavailable(); } }
  function clearInputs() { keys.clear(); pointers.clear(); document.querySelectorAll('.direction.pressed').forEach(function (b) { b.classList.remove('pressed'); }); }
  function setScreen(next) {
    screen = next; clearInputs();
    for (const name of ['home', 'levels', 'play']) $(name + '-screen').hidden = name !== next;
    $(next + '-screen').classList.remove('show-in');
    if (!reducedMotion) requestAnimationFrame(function () { $(next + '-screen').classList.add('show-in'); });
    if (next !== 'play') { game = null; resultShown = false; }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
  function refreshHome() {
    $('start-game').innerHTML = (progress.unlocked > 1 ? '继续派送' : '开始派送') + ' <span aria-hidden="true">→</span>';
    $('continue-note').textContent = progress.unlocked > 1 ? '已解锁 ' + progress.unlocked + ' / 8 站 · 继续第 ' + progress.unlocked + ' 站，也可以从地图重玩。' : '从第一站开始，把第一件包裹送到家。';
  }
  function fmt(seconds) { const n = Math.max(0, Math.floor(seconds)); return String(Math.floor(n / 60)).padStart(2, '0') + ':' + String(n % 60).padStart(2, '0'); }
  function showToast(message) {
    clearTimeout(toastTimer); $('game-toast').textContent = message; $('game-toast').classList.add('visible');
    toastTimer = setTimeout(function () { $('game-toast').classList.remove('visible'); }, 3400);
  }
  function renderLevels() {
    $('level-grid').replaceChildren();
    LEVELS.forEach(function (l, i) {
      const button = document.createElement('button'), unlocked = i < progress.unlocked;
      const record = progress.records[i] && progress.records[i][mode];
      button.className = 'level-card'; button.disabled = !unlocked;
      button.innerHTML = '<span class="level-number">' + String(i + 1).padStart(2, '0') + '</span><span class="level-icon" aria-hidden="true">' + (unlocked ? l.icon : '⌑') + '</span><h2>' + l.title + '</h2><p>' + l.feature + '</p><span class="level-record">' + (!unlocked ? '完成上一关解锁' : record ? (mode === 'challenge' ? '★'.repeat(record.stars) + ' · ' : '已完成 · ') + '最快 ' + fmt(record.best) : '准备好就出发 →') + '</span>';
      button.addEventListener('click', function () { startLevel(i); });
      $('level-grid').appendChild(button);
    });
    $('map-mode-note').textContent = '当前节奏：' + (mode === 'practice' ? '慢慢送（不限时，无限尝试）' : '准时达（限时挑战，3 格护盾）') + '。可返回开始页切换。';
  }
  function openLevels() { closeDialog(); setScreen('levels'); renderLevels(); $('levels-back').focus({ preventScroll: true }); }
  function home() { closeDialog(); setScreen('home'); refreshHome(); $('start-game').focus({ preventScroll: true }); }
  function startLevel(index) {
    if (index >= progress.unlocked) return;
    closeDialog(); setScreen('play'); game = createGame(index, mode); resultShown = false; previousHud = ''; previousGoals = ''; lastFrame = 0;
    $('level-eyebrow').textContent = 'DISPATCH ' + String(index + 1).padStart(2, '0') + ' / 08';
    $('level-title').textContent = game.level.title; $('level-description').textContent = game.level.description;
    $('level-tip').textContent = game.level.tip;
    $('mode-note').textContent = mode === 'practice' ? '慢慢送：不限时。碰撞回出发点，货物保留；可以反复尝试。' : '准时达：' + game.timeLimit + ' 秒，3 格护盾。碰撞、错误投递各消耗 1 格；超时或护盾归零结束。';
    $('board-badge').textContent = mode === 'practice' ? '慢慢送 · 不限时' : '准时达 · ' + game.timeLimit + ' 秒';
    $('hud-time-label').textContent = mode === 'practice' ? '用时' : '剩余时间'; $('hud-health-label').textContent = mode === 'practice' ? '节奏' : '护盾';
    updateHud(true); draw(); canvas.focus({ preventScroll: true });
    showToast(index === 0 ? '方向键移动 · 靠近小青圆，空格取件' : game.level.description);
  }
  function closeDialog() { if (dialog.open) dialog.close(); dialogKind = ''; }
  function showDialog(kind, html, handlers) {
    clearInputs(); dialogKind = kind; $('dialog-content').innerHTML = html;
    Object.keys(handlers || {}).forEach(function (id) { $(id).addEventListener('click', handlers[id]); });
    if (!dialog.open) dialog.showModal();
    const first = dialog.querySelector('[autofocus]') || dialog.querySelector('button'); if (first) first.focus({ preventScroll: true });
  }
  function pause(reason) {
    if (!game || game.status !== 'playing') return;
    game.status = 'paused'; clearInputs();
    showDialog('pause', '<div class="dialog-top"><span class="eyebrow">TAKE YOUR TIME</span></div><div class="dialog-symbol">Ⅱ</div><h2 id="dialog-title">这班快递，等你回来。</h2><p>' + (reason || '路线和包裹都在原处。休息一下，再出发。') + '</p><div class="dialog-actions"><button class="button primary" id="resume-play" autofocus>继续派送 →</button><button class="button secondary" id="restart-play">重新开始本关</button></div><div class="dialog-subactions"><button class="text-button" id="pause-levels">关卡地图</button><button class="text-button" id="pause-home">返回开始页</button></div>', {
      'resume-play': resume, 'restart-play': function () { startLevel(game.index); }, 'pause-levels': openLevels, 'pause-home': home
    });
  }
  function resume() { closeDialog(); if (game && game.status === 'paused') { game.status = 'playing'; lastFrame = 0; clearInputs(); canvas.focus({ preventScroll: true }); } }
  function help() {
    helpReturnsToPlay = !!(game && game.status === 'playing');
    if (helpReturnsToPlay) game.status = 'paused';
    showDialog('help', '<div class="dialog-top"><span class="eyebrow">A SMALL FIELD GUIDE</span><button class="dialog-close" id="help-close" aria-label="关闭操作指南">×</button></div><h2 id="dialog-title">三步，就会派送。</h2><div class="tutorial-steps"><div class="tutorial-step"><b>1</b><p><strong>移动</strong>：方向键或 WASD。手机长按屏幕方向按钮；松开就停，传送带上会缓慢漂移。</p></div><div class="tutorial-step"><b>2</b><p><strong>取件</strong>：靠近一个小包裹，按空格或绿色交互按钮。每次只能带一件；带着时可在空地按空格放下。</p></div><div class="tutorial-step"><b>3</b><p><strong>投递</strong>：走进同颜色、同图形的大圆环，再按空格。青圆 ●、珊瑚菱 ◆、蓝三角 ▲ 各有自己的收集站。</p></div></div><div class="mechanism-grid"><div><strong>╱ 珊瑚旋臂</strong><p>避开虚线范围，或观察方向再通过。碰撞回出发点，货物仍保留。</p></div><div><strong>开 / 闸门</strong><p>走近「开」按钮并交互，闸门永久打开。带着包裹也能操作。</p></div><div><strong>→ 传送带</strong><p>按箭头轻推，逆向仍可前进。横向离开箭头地面就不再受影响。</p></div><div><strong>◎ 传送门</strong><p>站入蓝色螺旋环，按空格去另一端。可往返，也能带包裹。</p></div></div><p class="tutorial-note">第 7 关要求按清单顺序签收。Esc 或 P 暂停；离开页面会自动暂停。默认慢慢送不限时；准时达才有计时和 3 格护盾。游戏静音，无音频依赖。</p><p class="tutorial-note">本作是虚构益智游戏，不模拟真实分子运输。减少动态设置会关闭装饰过渡；移动与旋臂保留必要的玩法动态。</p><div class="dialog-actions"><button class="button primary" id="help-done" autofocus>知道了，准备出发</button></div>', { 'help-close': closeHelp, 'help-done': closeHelp });
  }
  function closeHelp() { closeDialog(); if (helpReturnsToPlay && game) resume(); helpReturnsToPlay = false; }
  function showResult() {
    if (!game || resultShown || (game.status !== 'won' && game.status !== 'lost')) return;
    resultShown = true; clearInputs();
    const index = game.index, won = game.status === 'won';
    if (won) {
      const stars = Math.max(1, 3 - game.faults);
      if (!progress.records[index]) progress.records[index] = {};
      const old = progress.records[index][mode];
      progress.records[index][mode] = { best: old ? Math.min(old.best, game.elapsed) : game.elapsed, stars: old ? Math.max(old.stars, stars) : stars };
      progress.unlocked = Math.min(8, Math.max(progress.unlocked, index + 2)); saveProgress();
      showDialog('won', '<span class="eyebrow">SIGNED, SEALED, DELIVERED</span><div class="dialog-symbol">✓</div><h2 id="dialog-title">' + (index === 7 ? '全部送达，辛苦啦！' : '这一站，全部签收。') + '</h2>' + (mode === 'challenge' ? '<div class="stars" aria-label="' + stars + ' 星">' + '★'.repeat(stars) + '☆'.repeat(3 - stars) + '</div>' : '') + '<p>' + (index === 7 ? '八站的小旅程走到了终点。也许每一条弯路，都让你更熟悉下一次出发。' : '又有几件小包裹找到了家。下一条路线已经为你打开。') + '</p><div class="result-stats"><div><small>本次用时</small><strong>' + fmt(game.elapsed) + '</strong></div><div><small>送达包裹</small><strong>' + game.deliveredCount + ' 件</strong></div><div><small>碰撞 / 错投</small><strong>' + game.faults + ' 次</strong></div></div><div class="dialog-actions"><button class="button primary" id="result-next" autofocus>' + (index < 7 ? '下一站 →' : '回到关卡地图') + '</button><button class="button secondary" id="result-replay">再送一次</button></div><div class="dialog-subactions"><button class="text-button" id="result-home">返回开始页</button><button class="text-button" id="result-levels">选择其他关卡</button></div>', {
        'result-next': function () { if (index < 7) startLevel(index + 1); else openLevels(); }, 'result-replay': function () { startLevel(index); }, 'result-home': home, 'result-levels': openLevels
      });
    } else {
      const reason = game.shields <= 0 ? '三格护盾都用完了。包裹会回到起点，重新选一条路线再试试。' : '这一班的时间到了。你可以再挑战，也可以切换不限时练习，继续解锁关卡。';
      showDialog('lost', '<span class="eyebrow">ANOTHER LITTLE TRY</span><div class="dialog-symbol coral">↻</div><h2 id="dialog-title">这次先歇一歇。</h2><p>' + reason + '</p><div class="result-stats"><div><small>本次送达</small><strong>' + game.deliveredCount + ' / ' + game.total + '</strong></div><div><small>本次用时</small><strong>' + fmt(game.elapsed) + '</strong></div><div><small>碰撞 / 错投</small><strong>' + game.faults + ' 次</strong></div></div><div class="dialog-actions"><button class="button primary" id="retry-play" autofocus>再挑战一次 →</button><button class="button secondary" id="try-practice">换成不限时练习</button></div><div class="dialog-subactions"><button class="text-button" id="fail-levels">关卡地图</button><button class="text-button" id="fail-home">返回开始页</button></div>', {
        'retry-play': function () { startLevel(index); }, 'try-practice': function () { mode = 'practice'; document.querySelector('input[name="mode"][value="practice"]').checked = true; startLevel(index); }, 'fail-levels': openLevels, 'fail-home': home
      });
    }
  }
  function resetProgress() {
    showDialog('reset', '<span class="eyebrow">LOCAL RECORDS ONLY</span><h2 id="dialog-title">清除这份派送记录？</h2><p>这会清除当前浏览器里「微观快递」的关卡解锁和最快成绩，从第一关重新开始。游乐场里其他游戏的记录不受影响。</p><div class="dialog-actions"><button class="button secondary" id="reset-cancel" autofocus>保留记录</button><button class="button danger-button" id="reset-confirm">确认清除</button></div>', {
      'reset-cancel': closeDialog,
      'reset-confirm': function () { progress = { unlocked: 1, records: {} }; saveProgress(); closeDialog(); refreshHome(); showToast(stored ? '微观快递的本地记录已清除' : '本次会话记录已重置；浏览器存储暂不可用'); }
    });
  }
  function updateHud(force) {
    if (!game) return;
    const time = game.mode === 'challenge' ? Math.ceil(game.timeLimit - game.elapsed) : game.elapsed;
    const action = getAction(game);
    const token = [Math.floor(time), game.deliveredCount, game.carrying && game.carrying.type, game.shields, action.prompt].join('|');
    if (force || previousHud !== token) {
      previousHud = token;
      $('hud-delivered').textContent = game.deliveredCount + ' / ' + game.total;
      $('hud-time').textContent = fmt(time); $('hud-time').classList.toggle('urgent', game.mode === 'challenge' && time <= 20);
      $('hud-health').textContent = game.mode === 'challenge' ? '●'.repeat(game.shields) + '○'.repeat(3 - game.shields) : '慢慢送';
      $('hud-health').setAttribute('aria-label', game.mode === 'challenge' ? '剩余 ' + game.shields + ' 格护盾' : '不限时练习');
      $('hud-health').style.color = game.mode === 'challenge' ? (game.shields <= 1 ? '#f3a98f' : '#b8ee81') : '';
      $('hud-cargo').textContent = game.carrying ? TYPES[game.carrying.type].symbol + ' ' + TYPES[game.carrying.type].name : '空手';
      $('hud-cargo').style.color = game.carrying ? TYPES[game.carrying.type].color : '';
      $('action-prompt').textContent = action.prompt; $('interact-label').textContent = action.label;
    }
    const goalToken = JSON.stringify(game.delivered);
    if (force || previousGoals !== goalToken) {
      previousGoals = goalToken;
      $('goal-list').innerHTML = Object.keys(game.targets).sort().map(function (t) {
        const done = game.delivered[t] || 0, total = game.targets[t], position = game.level.order ? game.level.order.indexOf(t) + 1 : null;
        return '<div class="goal' + (done === total ? ' done' : '') + '"><span class="goal-symbol" style="color:' + TYPES[t].color + '">' + TYPES[t].symbol + '</span><span>' + TYPES[t].name + (position ? '<small class="goal-order">第 ' + position + ' 个签收</small>' : '') + '</span><span class="goal-count">' + (done === total ? '✓ ' : '') + done + ' / ' + total + '</span></div>';
      }).join('');
    }
  }
  function handleEvents() {
    if (!game) return;
    const events = game.events.splice(0);
    events.forEach(function (e) { if (e.type === 'notice') showToast(e.message); });
    updateHud(); showResult();
  }

  // Canvas geometry uses tile units; physics is independent of resolution and frame rate.
  function roundRect(x, y, w, h, r, fill, stroke, lineWidth) {
    ctx.beginPath(); ctx.roundRect(x, y, w, h, r);
    if (fill) { ctx.fillStyle = fill; ctx.fill(); }
    if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lineWidth || 0.025; ctx.stroke(); }
  }
  function circle(x, y, r, fill, stroke, width) {
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2);
    if (fill) { ctx.fillStyle = fill; ctx.fill(); }
    if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = width || 0.025; ctx.stroke(); }
  }
  function symbol(type, x, y, size, color) {
    ctx.beginPath();
    if (type === 'a') ctx.arc(x, y, size, 0, Math.PI * 2);
    if (type === 'b') { ctx.moveTo(x, y - size * 1.18); ctx.lineTo(x + size * 1.05, y); ctx.lineTo(x, y + size * 1.18); ctx.lineTo(x - size * 1.05, y); ctx.closePath(); }
    if (type === 'c') { ctx.moveTo(x, y - size * 1.19); ctx.lineTo(x + size * 1.1, y + size * 0.84); ctx.lineTo(x - size * 1.1, y + size * 0.84); ctx.closePath(); }
    ctx.fillStyle = color || TYPES[type].color; ctx.fill();
  }
  function label(text, x, y, color, size, weight) { ctx.fillStyle = color; ctx.font = (weight || 500) + ' ' + (size || 0.2) + 'px "Microsoft YaHei",system-ui,sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(text, x, y); }
  function draw() {
    if (!game || !ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2), rect = canvas.getBoundingClientRect();
    const width = Math.max(390, Math.round(rect.width * dpr)), height = Math.round(width * 9 / 13);
    if (canvas.width !== width || canvas.height !== height) { canvas.width = width; canvas.height = height; }
    const scale = width / 13; ctx.setTransform(scale, 0, 0, scale, 0, 0);
    ctx.fillStyle = '#192e26'; ctx.fillRect(0, 0, 13, 9);
    for (let y = 1; y < 8; y++) for (let x = 1; x < 12; x++) {
      roundRect(x + 0.025, y + 0.025, 0.95, 0.95, 0.08, (x + y) % 2 ? '#21372c' : '#233a2e');
      circle(x + 0.5, y + 0.5, 0.017, '#4b63404d');
    }
    game.map.belts.forEach(function (b) {
      roundRect(b.x + 0.055, b.y + 0.16, 0.89, 0.68, 0.09, '#36513b', '#577249', 0.018);
      ctx.save(); ctx.translate(b.x + 0.5, b.y + 0.5); ctx.rotate(Math.atan2(b.dy, b.dx));
      for (let j = -1; j <= 1; j++) { ctx.beginPath(); ctx.moveTo(j * 0.27 - 0.075, -0.14); ctx.lineTo(j * 0.27 + 0.04, 0); ctx.lineTo(j * 0.27 - 0.075, 0.14); ctx.strokeStyle = '#a5c980'; ctx.lineWidth = 0.035; ctx.lineCap = 'round'; ctx.stroke(); }
      ctx.restore();
    });
    const spawn = game.map.spawn;
    circle(spawn.x, spawn.y, 0.32, '#b8ee8108', '#789568', 0.025);
    label('始', spawn.x, spawn.y + 0.02, '#94ad7c', 0.19);
    game.map.portals.forEach(function (p, i) {
      circle(p.x, p.y, 0.43, '#a5cfe417', '#86b5c4', 0.04); circle(p.x, p.y, 0.31, null, '#648e9b', 0.025);
      ctx.beginPath();
      for (let a = 0; a <= Math.PI * 3.5; a += 0.12) { const r = 0.02 + a * 0.02; const x = p.x + Math.cos(a) * r, y = p.y + Math.sin(a) * r; if (a === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y); }
      ctx.lineWidth = 0.04; ctx.strokeStyle = '#b4dced'; ctx.stroke(); label(String(i + 1), p.x + 0.35, p.y - 0.35, '#bedde6', 0.16, 700);
    });
    game.map.switches.forEach(function (s) {
      roundRect(s.x - 0.29, s.y - 0.29, 0.58, 0.58, 0.14, game.gateOpen ? '#8fb56b' : '#b8ee81', '#d0f2a7', 0.025);
      label(game.gateOpen ? '✓' : '开', s.x, s.y, '#21372b', 0.24, 750);
    });
    game.map.gates.forEach(function (g) {
      if (game.gateOpen) { roundRect(g.x + 0.08, g.y + 0.05, 0.84, 0.9, 0.1, '#b8ee810b', '#5f8050', 0.025); label('↔', g.x + 0.5, g.y + 0.5, '#87b265', 0.3); return; }
      roundRect(g.x + 0.08, g.y + 0.05, 0.84, 0.9, 0.12, '#3b4c34', '#a5c479', 0.04);
      for (let n = 0; n < 3; n++) roundRect(g.x + 0.2 + n * 0.24, g.y + 0.12, 0.12, 0.76, 0.04, '#9bb877');
    });
    game.map.walls.forEach(function (w) {
      const border = w.x === 0 || w.x === 12 || w.y === 0 || w.y === 8;
      roundRect(w.x + 0.045, w.y + 0.10, 0.91, 0.85, 0.14, border ? '#1a2e24' : '#142b21');
      roundRect(w.x + 0.045, w.y + 0.035, 0.91, 0.83, 0.14, border ? '#304834' : '#466242', border ? '#3a543a' : '#617b4d', 0.018);
      if (!border) roundRect(w.x + 0.15, w.y + 0.12, 0.7, 0.06, 0.02, '#678653');
    });
    game.map.docks.forEach(function (d) {
      const complete = (game.delivered[d.type] || 0) >= game.targets[d.type], c = TYPES[d.type].color;
      circle(d.x, d.y + 0.035, 0.46, '#0c201a55');
      circle(d.x, d.y, 0.43, c + (complete ? '23' : '12'), c, 0.035);
      ctx.setLineDash([0.06, 0.075]); circle(d.x, d.y, 0.34, null, c + '99', 0.018); ctx.setLineDash([]);
      if (complete) label('✓', d.x, d.y - 0.01, c, 0.33, 700);
      else symbol(d.type, d.x, d.y - 0.025, 0.17, c);
      const order = game.level.order ? game.level.order.indexOf(d.type) + 1 : null;
      label(order ? String(order) + ' · ' + TYPES[d.type].short : '收', d.x, d.y + 0.27, c, 0.13, 700);
    });
    game.pickups.forEach(function (p) {
      const pulse = reducedMotion ? 0 : Math.sin(game.elapsed * 2.3 + p.id) * 0.025;
      circle(p.x, p.y + 0.15, 0.17, '#081c1666');
      circle(p.x, p.y, 0.27 + pulse, TYPES[p.type].color + '0a', TYPES[p.type].color + '55', 0.018);
      symbol(p.type, p.x, p.y - 0.025, 0.19); circle(p.x - 0.055, p.y - 0.095, 0.035, '#f4ffdc77');
    });
    game.map.rotors.forEach(function (r) {
      const angle = r.phase + game.elapsed * r.speed;
      ctx.setLineDash([0.045, 0.10]); circle(r.x, r.y, r.length + 0.12, null, '#d59b7e55', 0.018); ctx.setLineDash([]);
      ctx.save(); ctx.translate(r.x, r.y); ctx.rotate(angle);
      roundRect(-r.length - 0.1, -0.105, r.length * 2 + 0.2, 0.21, 0.1, '#e3977b', '#f4b79a', 0.023);
      for (const x of [-r.length, r.length]) circle(x, 0, 0.10, '#f7c0a2');
      ctx.restore(); circle(r.x, r.y, 0.18, '#654b39', '#f2aa8c', 0.035); circle(r.x, r.y, 0.055, '#f4bf9b');
    });
    const p = game.player;
    ctx.save(); ctx.translate(p.x, p.y);
    if (game.invulnerable > 0) circle(0, 0, 0.40, '#b8ee8112', '#c2e99c', 0.025);
    ctx.fillStyle = '#071b1655'; ctx.beginPath(); ctx.ellipse(0, 0.24, 0.29, 0.12, 0, 0, Math.PI * 2); ctx.fill();
    roundRect(-0.235, -0.30, 0.47, 0.58, 0.215, '#f3f0dc', '#fff8e5', 0.025);
    roundRect(-0.185, -0.095, 0.37, 0.235, 0.1, '#d9dfc9');
    circle(-0.085 + p.facing * 0.014, 0.016, 0.041, '#19352b'); circle(0.085 + p.facing * 0.014, 0.016, 0.041, '#19352b');
    roundRect(-0.065, 0.19, 0.13, 0.027, 0.012, '#77956a');
    if (game.carrying) { roundRect(-0.20, -0.36, 0.40, 0.065, 0.025, '#f3f0dc'); circle(0, -0.47, 0.23, '#16372a'); symbol(game.carrying.type, 0, -0.47, 0.19); }
    ctx.restore();
  }
  function inputVector() {
    const held = new Set(Array.from(keys).concat(Array.from(pointers.values())));
    return { x: (held.has('right') ? 1 : 0) - (held.has('left') ? 1 : 0), y: (held.has('down') ? 1 : 0) - (held.has('up') ? 1 : 0) };
  }
  function frame(now) {
    const dt = lastFrame ? Math.min((now - lastFrame) / 1000, 0.06) : 0;
    lastFrame = now;
    if (game && screen === 'play') {
      if (game.status === 'playing') { advance(game, dt, inputVector()); handleEvents(); }
      draw();
    }
    requestAnimationFrame(frame);
  }
  const keyDirections = { ArrowUp: 'up', KeyW: 'up', ArrowDown: 'down', KeyS: 'down', ArrowLeft: 'left', KeyA: 'left', ArrowRight: 'right', KeyD: 'right' };
  window.addEventListener('keydown', function (e) {
    if (!game || screen !== 'play') return;
    if ((e.code === 'Escape' || e.code === 'KeyP') && game.status === 'playing') { e.preventDefault(); pause(); return; }
    if (game.status !== 'playing' || dialog.open) return;
    if (keyDirections[e.code]) { e.preventDefault(); keys.add(keyDirections[e.code]); }
    if (e.code === 'Space') { e.preventDefault(); if (!e.repeat) { interact(game); handleEvents(); } }
  });
  window.addEventListener('keyup', function (e) { if (keyDirections[e.code]) keys.delete(keyDirections[e.code]); });
  document.querySelectorAll('[data-direction]').forEach(function (button) {
    button.addEventListener('pointerdown', function (e) {
      if (!game || game.status !== 'playing') return; e.preventDefault();
      pointers.set(e.pointerId, button.dataset.direction); button.classList.add('pressed'); button.setPointerCapture(e.pointerId);
    });
    function release(e) { pointers.delete(e.pointerId); button.classList.remove('pressed'); }
    button.addEventListener('pointerup', release); button.addEventListener('pointercancel', release); button.addEventListener('lostpointercapture', release);
    button.addEventListener('click', function (e) {
      // Assistive-technology synthesized clicks receive a small, bounded movement.
      if (e.detail !== 0 || !game || game.status !== 'playing') return;
      const direction = button.dataset.direction, vectors = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };
      advance(game, 0.09, { x: vectors[direction][0], y: vectors[direction][1] }); handleEvents(); draw();
    });
  });
  $('interact-game').addEventListener('click', function () { if (game) { interact(game); handleEvents(); } });
  $('pause-game').addEventListener('click', function () { pause(); });
  $('help-open').addEventListener('click', help); $('play-help').addEventListener('click', help);
  $('start-game').addEventListener('click', function () { startLevel(progress.unlocked - 1); });
  $('open-levels').addEventListener('click', openLevels); $('levels-back').addEventListener('click', home);
  $('reset-progress').addEventListener('click', resetProgress);
  document.querySelectorAll('input[name="mode"]').forEach(function (input) { input.addEventListener('change', function () { mode = input.value; }); });
  dialog.addEventListener('cancel', function (e) { e.preventDefault(); if (dialogKind === 'pause') resume(); else if (dialogKind === 'help') closeHelp(); else if (dialogKind === 'reset') closeDialog(); });
  window.addEventListener('blur', function () { clearInputs(); pause('你切换了窗口，派送已自动暂停。回来后按「继续派送」。'); });
  document.addEventListener('visibilitychange', function () { if (document.hidden) { clearInputs(); pause('页面进入后台，派送已自动暂停，计时也停下来了。'); } });
  window.addEventListener('resize', function () { if (game) draw(); });
  refreshHome();
  requestAnimationFrame(frame);
})(typeof window !== 'undefined' ? window : globalThis);

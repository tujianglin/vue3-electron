'use strict';
Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const re = require('electron');
function Yt(e, t) {
  const n = Object.create(null),
    s = e.split(',');
  for (let r = 0; r < s.length; r++) n[s[r]] = !0;
  return t ? (r) => !!n[r.toLowerCase()] : (r) => !!n[r];
}
const T = process.env.NODE_ENV !== 'production' ? Object.freeze({}) : {};
process.env.NODE_ENV !== 'production' && Object.freeze([]);
const Fe = () => {},
  Qt = /^on[^a-z]/,
  Xt = (e) => Qt.test(e),
  R = Object.assign,
  Zt = (e, t) => {
    const n = e.indexOf(t);
    n > -1 && e.splice(n, 1);
  },
  kt = Object.prototype.hasOwnProperty,
  m = (e, t) => kt.call(e, t),
  h = Array.isArray,
  Q = (e) => Oe(e) === '[object Map]',
  en = (e) => Oe(e) === '[object Set]',
  N = (e) => typeof e == 'function',
  D = (e) => typeof e == 'string',
  Ae = (e) => typeof e == 'symbol',
  S = (e) => e !== null && typeof e == 'object',
  tn = (e) => S(e) && N(e.then) && N(e.catch),
  nn = Object.prototype.toString,
  Oe = (e) => nn.call(e),
  gt = (e) => Oe(e).slice(8, -1),
  rn = (e) => Oe(e) === '[object Object]',
  je = (e) => D(e) && e !== 'NaN' && e[0] !== '-' && '' + parseInt(e, 10) === e,
  mt = (e) => {
    const t = Object.create(null);
    return (n) => t[n] || (t[n] = e(n));
  },
  Et = mt((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  sn = mt((e) => (e ? `on${Et(e)}` : '')),
  _e = (e, t) => !Object.is(e, t),
  on = (e, t, n) => {
    Object.defineProperty(e, t, { configurable: !0, enumerable: !1, value: n });
  };
let et;
const xe = () => et || (et = typeof globalThis < 'u' ? globalThis : typeof self < 'u' ? self : typeof window < 'u' ? window : typeof global < 'u' ? global : {});
function Ke(e) {
  if (h(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n],
        r = D(s) ? an(s) : Ke(s);
      if (r) for (const o in r) t[o] = r[o];
    }
    return t;
  } else {
    if (D(e)) return e;
    if (S(e)) return e;
  }
}
const cn = /;(?![^(]*\))/g,
  ln = /:([^]+)/,
  un = /\/\*[^]*?\*\//g;
function an(e) {
  const t = {};
  return (
    e
      .replace(un, '')
      .split(cn)
      .forEach((n) => {
        if (n) {
          const s = n.split(ln);
          s.length > 1 && (t[s[0].trim()] = s[1].trim());
        }
      }),
    t
  );
}
function ze(e) {
  let t = '';
  if (D(e)) t = e;
  else if (h(e))
    for (let n = 0; n < e.length; n++) {
      const s = ze(e[n]);
      s && (t += s + ' ');
    }
  else if (S(e)) for (const n in e) e[n] && (t += n + ' ');
  return t.trim();
}
function tt(e, ...t) {
  console.warn(`[Vue warn] ${e}`, ...t);
}
let wt;
function fn(e, t = wt) {
  t && t.active && t.effects.push(e);
}
function pn() {
  return wt;
}
const Ie = (e) => {
    const t = new Set(e);
    return (t.w = 0), (t.n = 0), t;
  },
  Nt = (e) => (e.w & A) > 0,
  Ot = (e) => (e.n & A) > 0,
  dn = ({ deps: e }) => {
    if (e.length) for (let t = 0; t < e.length; t++) e[t].w |= A;
  },
  hn = (e) => {
    const { deps: t } = e;
    if (t.length) {
      let n = 0;
      for (let s = 0; s < t.length; s++) {
        const r = t[s];
        Nt(r) && !Ot(r) ? r.delete(e) : (t[n++] = r), (r.w &= ~A), (r.n &= ~A);
      }
      t.length = n;
    }
  },
  Re = new WeakMap();
let k = 0,
  A = 1;
const ye = 30;
let O;
const H = Symbol(process.env.NODE_ENV !== 'production' ? 'iterate' : ''),
  De = Symbol(process.env.NODE_ENV !== 'production' ? 'Map key iterate' : '');
class _n {
  constructor(t, n = null, s) {
    (this.fn = t), (this.scheduler = n), (this.active = !0), (this.deps = []), (this.parent = void 0), fn(this, s);
  }
  run() {
    if (!this.active) return this.fn();
    let t = O,
      n = U;
    for (; t; ) {
      if (t === this) return;
      t = t.parent;
    }
    try {
      return (this.parent = O), (O = this), (U = !0), (A = 1 << ++k), k <= ye ? dn(this) : nt(this), this.fn();
    } finally {
      k <= ye && hn(this), (A = 1 << --k), (O = this.parent), (U = n), (this.parent = void 0), this.deferStop && this.stop();
    }
  }
  stop() {
    O === this ? (this.deferStop = !0) : this.active && (nt(this), this.onStop && this.onStop(), (this.active = !1));
  }
}
function nt(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++) t[n].delete(e);
    t.length = 0;
  }
}
let U = !0;
const bt = [];
function He() {
  bt.push(U), (U = !1);
}
function Ue() {
  const e = bt.pop();
  U = e === void 0 ? !0 : e;
}
function v(e, t, n) {
  if (U && O) {
    let s = Re.get(e);
    s || Re.set(e, (s = new Map()));
    let r = s.get(n);
    r || s.set(n, (r = Ie()));
    const o = process.env.NODE_ENV !== 'production' ? { effect: O, target: e, type: t, key: n } : void 0;
    gn(r, o);
  }
}
function gn(e, t) {
  let n = !1;
  k <= ye ? Ot(e) || ((e.n |= A), (n = !Nt(e))) : (n = !e.has(O)), n && (e.add(O), O.deps.push(e), process.env.NODE_ENV !== 'production' && O.onTrack && O.onTrack(R({ effect: O }, t)));
}
function j(e, t, n, s, r, o) {
  const i = Re.get(e);
  if (!i) return;
  let c = [];
  if (t === 'clear') c = [...i.values()];
  else if (n === 'length' && h(e)) {
    const a = Number(s);
    i.forEach((d, l) => {
      (l === 'length' || l >= a) && c.push(d);
    });
  } else
    switch ((n !== void 0 && c.push(i.get(n)), t)) {
      case 'add':
        h(e) ? je(n) && c.push(i.get('length')) : (c.push(i.get(H)), Q(e) && c.push(i.get(De)));
        break;
      case 'delete':
        h(e) || (c.push(i.get(H)), Q(e) && c.push(i.get(De)));
        break;
      case 'set':
        Q(e) && c.push(i.get(H));
        break;
    }
  const u = process.env.NODE_ENV !== 'production' ? { target: e, type: t, key: n, newValue: s, oldValue: r, oldTarget: o } : void 0;
  if (c.length === 1) c[0] && (process.env.NODE_ENV !== 'production' ? ie(c[0], u) : ie(c[0]));
  else {
    const a = [];
    for (const d of c) d && a.push(...d);
    process.env.NODE_ENV !== 'production' ? ie(Ie(a), u) : ie(Ie(a));
  }
}
function ie(e, t) {
  const n = h(e) ? e : [...e];
  for (const s of n) s.computed && rt(s, t);
  for (const s of n) s.computed || rt(s, t);
}
function rt(e, t) {
  (e !== O || e.allowRecurse) && (process.env.NODE_ENV !== 'production' && e.onTrigger && e.onTrigger(R({ effect: e }, t)), e.scheduler ? e.scheduler() : e.run());
}
const mn = Yt('__proto__,__v_isRef,__isVue'),
  St = new Set(
    Object.getOwnPropertyNames(Symbol)
      .filter((e) => e !== 'arguments' && e !== 'caller')
      .map((e) => Symbol[e])
      .filter(Ae),
  ),
  En = We(),
  wn = We(!0),
  Nn = We(!0, !0),
  st = On();
function On() {
  const e = {};
  return (
    ['includes', 'indexOf', 'lastIndexOf'].forEach((t) => {
      e[t] = function (...n) {
        const s = p(this);
        for (let o = 0, i = this.length; o < i; o++) v(s, 'get', o + '');
        const r = s[t](...n);
        return r === -1 || r === !1 ? s[t](...n.map(p)) : r;
      };
    }),
    ['push', 'pop', 'shift', 'unshift', 'splice'].forEach((t) => {
      e[t] = function (...n) {
        He();
        const s = p(this)[t].apply(this, n);
        return Ue(), s;
      };
    }),
    e
  );
}
function bn(e) {
  const t = p(this);
  return v(t, 'has', e), t.hasOwnProperty(e);
}
function We(e = !1, t = !1) {
  return function (s, r, o) {
    if (r === '__v_isReactive') return !e;
    if (r === '__v_isReadonly') return e;
    if (r === '__v_isShallow') return t;
    if (r === '__v_raw' && o === (e ? (t ? Rt : It) : t ? jn : xt).get(s)) return s;
    const i = h(s);
    if (!e) {
      if (i && m(st, r)) return Reflect.get(st, r, o);
      if (r === 'hasOwnProperty') return bn;
    }
    const c = Reflect.get(s, r, o);
    return (Ae(r) ? St.has(r) : mn(r)) || (e || v(s, 'get', r), t) ? c : b(c) ? (i && je(r) ? c : c.value) : S(c) ? (e ? Dt(c) : yt(c)) : c;
  };
}
const Sn = vn();
function vn(e = !1) {
  return function (n, s, r, o) {
    let i = n[s];
    if (J(i) && b(i) && !b(r)) return !1;
    if (!e && (!Pe(r) && !J(r) && ((i = p(i)), (r = p(r))), !h(n) && b(i) && !b(r))) return (i.value = r), !0;
    const c = h(n) && je(s) ? Number(s) < n.length : m(n, s),
      u = Reflect.set(n, s, r, o);
    return n === p(o) && (c ? _e(r, i) && j(n, 'set', s, r, i) : j(n, 'add', s, r)), u;
  };
}
function Vn(e, t) {
  const n = m(e, t),
    s = e[t],
    r = Reflect.deleteProperty(e, t);
  return r && n && j(e, 'delete', t, void 0, s), r;
}
function xn(e, t) {
  const n = Reflect.has(e, t);
  return (!Ae(t) || !St.has(t)) && v(e, 'has', t), n;
}
function In(e) {
  return v(e, 'iterate', h(e) ? 'length' : H), Reflect.ownKeys(e);
}
const Rn = { get: En, set: Sn, deleteProperty: Vn, has: xn, ownKeys: In },
  vt = {
    get: wn,
    set(e, t) {
      return process.env.NODE_ENV !== 'production' && tt(`Set operation on key "${String(t)}" failed: target is readonly.`, e), !0;
    },
    deleteProperty(e, t) {
      return process.env.NODE_ENV !== 'production' && tt(`Delete operation on key "${String(t)}" failed: target is readonly.`, e), !0;
    },
  },
  yn = R({}, vt, { get: Nn }),
  Le = (e) => e,
  be = (e) => Reflect.getPrototypeOf(e);
function ce(e, t, n = !1, s = !1) {
  e = e.__v_raw;
  const r = p(e),
    o = p(t);
  n || (t !== o && v(r, 'get', t), v(r, 'get', o));
  const { has: i } = be(r),
    c = s ? Le : n ? Ge : Be;
  if (i.call(r, t)) return c(e.get(t));
  if (i.call(r, o)) return c(e.get(o));
  e !== r && e.get(t);
}
function le(e, t = !1) {
  const n = this.__v_raw,
    s = p(n),
    r = p(e);
  return t || (e !== r && v(s, 'has', e), v(s, 'has', r)), e === r ? n.has(e) : n.has(e) || n.has(r);
}
function ue(e, t = !1) {
  return (e = e.__v_raw), !t && v(p(e), 'iterate', H), Reflect.get(e, 'size', e);
}
function ot(e) {
  e = p(e);
  const t = p(this);
  return be(t).has.call(t, e) || (t.add(e), j(t, 'add', e, e)), this;
}
function it(e, t) {
  t = p(t);
  const n = p(this),
    { has: s, get: r } = be(n);
  let o = s.call(n, e);
  o ? process.env.NODE_ENV !== 'production' && Vt(n, s, e) : ((e = p(e)), (o = s.call(n, e)));
  const i = r.call(n, e);
  return n.set(e, t), o ? _e(t, i) && j(n, 'set', e, t, i) : j(n, 'add', e, t), this;
}
function ct(e) {
  const t = p(this),
    { has: n, get: s } = be(t);
  let r = n.call(t, e);
  r ? process.env.NODE_ENV !== 'production' && Vt(t, n, e) : ((e = p(e)), (r = n.call(t, e)));
  const o = s ? s.call(t, e) : void 0,
    i = t.delete(e);
  return r && j(t, 'delete', e, void 0, o), i;
}
function lt() {
  const e = p(this),
    t = e.size !== 0,
    n = process.env.NODE_ENV !== 'production' ? (Q(e) ? new Map(e) : new Set(e)) : void 0,
    s = e.clear();
  return t && j(e, 'clear', void 0, void 0, n), s;
}
function ae(e, t) {
  return function (s, r) {
    const o = this,
      i = o.__v_raw,
      c = p(i),
      u = t ? Le : e ? Ge : Be;
    return !e && v(c, 'iterate', H), i.forEach((a, d) => s.call(r, u(a), u(d), o));
  };
}
function fe(e, t, n) {
  return function (...s) {
    const r = this.__v_raw,
      o = p(r),
      i = Q(o),
      c = e === 'entries' || (e === Symbol.iterator && i),
      u = e === 'keys' && i,
      a = r[e](...s),
      d = n ? Le : t ? Ge : Be;
    return (
      !t && v(o, 'iterate', u ? De : H),
      {
        next() {
          const { value: l, done: f } = a.next();
          return f ? { value: l, done: f } : { value: c ? [d(l[0]), d(l[1])] : d(l), done: f };
        },
        [Symbol.iterator]() {
          return this;
        },
      }
    );
  };
}
function $(e) {
  return function (...t) {
    if (process.env.NODE_ENV !== 'production') {
      const n = t[0] ? `on key "${t[0]}" ` : '';
      console.warn(`${Et(e)} operation ${n}failed: target is readonly.`, p(this));
    }
    return e === 'delete' ? !1 : this;
  };
}
function Dn() {
  const e = {
      get(o) {
        return ce(this, o);
      },
      get size() {
        return ue(this);
      },
      has: le,
      add: ot,
      set: it,
      delete: ct,
      clear: lt,
      forEach: ae(!1, !1),
    },
    t = {
      get(o) {
        return ce(this, o, !1, !0);
      },
      get size() {
        return ue(this);
      },
      has: le,
      add: ot,
      set: it,
      delete: ct,
      clear: lt,
      forEach: ae(!1, !0),
    },
    n = {
      get(o) {
        return ce(this, o, !0);
      },
      get size() {
        return ue(this, !0);
      },
      has(o) {
        return le.call(this, o, !0);
      },
      add: $('add'),
      set: $('set'),
      delete: $('delete'),
      clear: $('clear'),
      forEach: ae(!0, !1),
    },
    s = {
      get(o) {
        return ce(this, o, !0, !0);
      },
      get size() {
        return ue(this, !0);
      },
      has(o) {
        return le.call(this, o, !0);
      },
      add: $('add'),
      set: $('set'),
      delete: $('delete'),
      clear: $('clear'),
      forEach: ae(!0, !0),
    };
  return (
    ['keys', 'values', 'entries', Symbol.iterator].forEach((o) => {
      (e[o] = fe(o, !1, !1)), (n[o] = fe(o, !0, !1)), (t[o] = fe(o, !1, !0)), (s[o] = fe(o, !0, !0));
    }),
    [e, n, t, s]
  );
}
const [Pn, Tn, $n, Cn] = Dn();
function qe(e, t) {
  const n = t ? (e ? Cn : $n) : e ? Tn : Pn;
  return (s, r, o) => (r === '__v_isReactive' ? !e : r === '__v_isReadonly' ? e : r === '__v_raw' ? s : Reflect.get(m(n, r) && r in s ? n : s, r, o));
}
const Mn = { get: qe(!1, !1) },
  Fn = { get: qe(!0, !1) },
  An = { get: qe(!0, !0) };
function Vt(e, t, n) {
  const s = p(n);
  if (s !== n && t.call(e, s)) {
    const r = gt(e);
    console.warn(
      `Reactive ${r} contains both the raw and reactive versions of the same object${
        r === 'Map' ? ' as keys' : ''
      }, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`,
    );
  }
}
const xt = new WeakMap(),
  jn = new WeakMap(),
  It = new WeakMap(),
  Rt = new WeakMap();
function Kn(e) {
  switch (e) {
    case 'Object':
    case 'Array':
      return 1;
    case 'Map':
    case 'Set':
    case 'WeakMap':
    case 'WeakSet':
      return 2;
    default:
      return 0;
  }
}
function zn(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Kn(gt(e));
}
function yt(e) {
  return J(e) ? e : Je(e, !1, Rn, Mn, xt);
}
function Dt(e) {
  return Je(e, !0, vt, Fn, It);
}
function pe(e) {
  return Je(e, !0, yn, An, Rt);
}
function Je(e, t, n, s, r) {
  if (!S(e)) return process.env.NODE_ENV !== 'production' && console.warn(`value cannot be made reactive: ${String(e)}`), e;
  if (e.__v_raw && !(t && e.__v_isReactive)) return e;
  const o = r.get(e);
  if (o) return o;
  const i = zn(e);
  if (i === 0) return e;
  const c = new Proxy(e, i === 2 ? s : n);
  return r.set(e, c), c;
}
function W(e) {
  return J(e) ? W(e.__v_raw) : !!(e && e.__v_isReactive);
}
function J(e) {
  return !!(e && e.__v_isReadonly);
}
function Pe(e) {
  return !!(e && e.__v_isShallow);
}
function Te(e) {
  return W(e) || J(e);
}
function p(e) {
  const t = e && e.__v_raw;
  return t ? p(t) : e;
}
function Hn(e) {
  return on(e, '__v_skip', !0), e;
}
const Be = (e) => (S(e) ? yt(e) : e),
  Ge = (e) => (S(e) ? Dt(e) : e);
function b(e) {
  return !!(e && e.__v_isRef === !0);
}
function Un(e) {
  return b(e) ? e.value : e;
}
const Wn = {
  get: (e, t, n) => Un(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const r = e[t];
    return b(r) && !b(n) ? ((r.value = n), !0) : Reflect.set(e, t, n, s);
  },
};
function Ln(e) {
  return W(e) ? e : new Proxy(e, Wn);
}
const L = [];
function qn(e) {
  L.push(e);
}
function Jn() {
  L.pop();
}
function E(e, ...t) {
  if (process.env.NODE_ENV === 'production') return;
  He();
  const n = L.length ? L[L.length - 1].component : null,
    s = n && n.appContext.config.warnHandler,
    r = Bn();
  if (s)
    q(s, n, 11, [
      e + t.join(''),
      n && n.proxy,
      r.map(({ vnode: o }) => `at <${qt(n, o.type)}>`).join(`
`),
      r,
    ]);
  else {
    const o = [`[Vue warn]: ${e}`, ...t];
    r.length &&
      o.push(
        `
`,
        ...Gn(r),
      ),
      console.warn(...o);
  }
  Ue();
}
function Bn() {
  let e = L[L.length - 1];
  if (!e) return [];
  const t = [];
  for (; e; ) {
    const n = t[0];
    n && n.vnode === e ? n.recurseCount++ : t.push({ vnode: e, recurseCount: 0 });
    const s = e.component && e.component.parent;
    e = s && s.vnode;
  }
  return t;
}
function Gn(e) {
  const t = [];
  return (
    e.forEach((n, s) => {
      t.push(
        ...(s === 0
          ? []
          : [
              `
`,
            ]),
        ...Yn(n),
      );
    }),
    t
  );
}
function Yn({ vnode: e, recurseCount: t }) {
  const n = t > 0 ? `... (${t} recursive calls)` : '',
    s = e.component ? e.component.parent == null : !1,
    r = ` at <${qt(e.component, e.type, s)}`,
    o = '>' + n;
  return e.props ? [r, ...Qn(e.props), o] : [r + o];
}
function Qn(e) {
  const t = [],
    n = Object.keys(e);
  return (
    n.slice(0, 3).forEach((s) => {
      t.push(...Pt(s, e[s]));
    }),
    n.length > 3 && t.push(' ...'),
    t
  );
}
function Pt(e, t, n) {
  return D(t)
    ? ((t = JSON.stringify(t)), n ? t : [`${e}=${t}`])
    : typeof t == 'number' || typeof t == 'boolean' || t == null
    ? n
      ? t
      : [`${e}=${t}`]
    : b(t)
    ? ((t = Pt(e, p(t.value), !0)), n ? t : [`${e}=Ref<`, t, '>'])
    : N(t)
    ? [`${e}=fn${t.name ? `<${t.name}>` : ''}`]
    : ((t = p(t)), n ? t : [`${e}=`, t]);
}
const Ye = {
  sp: 'serverPrefetch hook',
  bc: 'beforeCreate hook',
  c: 'created hook',
  bm: 'beforeMount hook',
  m: 'mounted hook',
  bu: 'beforeUpdate hook',
  u: 'updated',
  bum: 'beforeUnmount hook',
  um: 'unmounted hook',
  a: 'activated hook',
  da: 'deactivated hook',
  ec: 'errorCaptured hook',
  rtc: 'renderTracked hook',
  rtg: 'renderTriggered hook',
  0: 'setup function',
  1: 'render function',
  2: 'watcher getter',
  3: 'watcher callback',
  4: 'watcher cleanup function',
  5: 'native event handler',
  6: 'component event handler',
  7: 'vnode hook',
  8: 'directive hook',
  9: 'transition hook',
  10: 'app errorHandler',
  11: 'app warnHandler',
  12: 'ref function',
  13: 'async component loader',
  14: 'scheduler flush. This is likely a Vue internals bug. Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/core',
};
function q(e, t, n, s) {
  let r;
  try {
    r = s ? e(...s) : e();
  } catch (o) {
    Tt(o, t, n);
  }
  return r;
}
function ge(e, t, n, s) {
  if (N(e)) {
    const o = q(e, t, n, s);
    return (
      o &&
        tn(o) &&
        o.catch((i) => {
          Tt(i, t, n);
        }),
      o
    );
  }
  const r = [];
  for (let o = 0; o < e.length; o++) r.push(ge(e[o], t, n, s));
  return r;
}
function Tt(e, t, n, s = !0) {
  const r = t ? t.vnode : null;
  if (t) {
    let o = t.parent;
    const i = t.proxy,
      c = process.env.NODE_ENV !== 'production' ? Ye[n] : n;
    for (; o; ) {
      const a = o.ec;
      if (a) {
        for (let d = 0; d < a.length; d++) if (a[d](e, i, c) === !1) return;
      }
      o = o.parent;
    }
    const u = t.appContext.config.errorHandler;
    if (u) {
      q(u, null, 10, [e, i, c]);
      return;
    }
  }
  Xn(e, n, r, s);
}
function Xn(e, t, n, s = !0) {
  if (process.env.NODE_ENV !== 'production') {
    const r = Ye[t];
    if ((n && qn(n), E(`Unhandled error${r ? ` during execution of ${r}` : ''}`), n && Jn(), s)) throw e;
    console.error(e);
  } else console.error(e);
}
let me = !1,
  $e = !1;
const y = [];
let M = 0;
const X = [];
let P = null,
  C = 0;
const $t = Promise.resolve();
let Qe = null;
const Zn = 100;
function kn(e) {
  const t = Qe || $t;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function er(e) {
  let t = M + 1,
    n = y.length;
  for (; t < n; ) {
    const s = (t + n) >>> 1;
    se(y[s]) < e ? (t = s + 1) : (n = s);
  }
  return t;
}
function Xe(e) {
  (!y.length || !y.includes(e, me && e.allowRecurse ? M + 1 : M)) && (e.id == null ? y.push(e) : y.splice(er(e.id), 0, e), Ct());
}
function Ct() {
  !me && !$e && (($e = !0), (Qe = $t.then(Ft)));
}
function Mt(e) {
  h(e) ? X.push(...e) : (!P || !P.includes(e, e.allowRecurse ? C + 1 : C)) && X.push(e), Ct();
}
function tr(e) {
  if (X.length) {
    const t = [...new Set(X)];
    if (((X.length = 0), P)) {
      P.push(...t);
      return;
    }
    for (P = t, process.env.NODE_ENV !== 'production' && (e = e || new Map()), P.sort((n, s) => se(n) - se(s)), C = 0; C < P.length; C++)
      (process.env.NODE_ENV !== 'production' && At(e, P[C])) || P[C]();
    (P = null), (C = 0);
  }
}
const se = (e) => (e.id == null ? 1 / 0 : e.id),
  nr = (e, t) => {
    const n = se(e) - se(t);
    if (n === 0) {
      if (e.pre && !t.pre) return -1;
      if (t.pre && !e.pre) return 1;
    }
    return n;
  };
function Ft(e) {
  ($e = !1), (me = !0), process.env.NODE_ENV !== 'production' && (e = e || new Map()), y.sort(nr);
  const t = process.env.NODE_ENV !== 'production' ? (n) => At(e, n) : Fe;
  try {
    for (M = 0; M < y.length; M++) {
      const n = y[M];
      if (n && n.active !== !1) {
        if (process.env.NODE_ENV !== 'production' && t(n)) continue;
        q(n, null, 14);
      }
    }
  } finally {
    (M = 0), (y.length = 0), tr(e), (me = !1), (Qe = null), (y.length || X.length) && Ft(e);
  }
}
function At(e, t) {
  if (!e.has(t)) e.set(t, 1);
  else {
    const n = e.get(t);
    if (n > Zn) {
      const s = t.ownerInstance,
        r = s && Lt(s.type);
      return (
        E(
          `Maximum recursive updates exceeded${
            r ? ` in component <${r}>` : ''
          }. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`,
        ),
        !0
      );
    } else e.set(t, n + 1);
  }
}
const Z = new Set();
process.env.NODE_ENV !== 'production' && (xe().__VUE_HMR_RUNTIME__ = { createRecord: Se(rr), rerender: Se(sr), reload: Se(or) });
const Ee = new Map();
function rr(e, t) {
  return Ee.has(e) ? !1 : (Ee.set(e, { initialDef: te(t), instances: new Set() }), !0);
}
function te(e) {
  return Jt(e) ? e.__vccOpts : e;
}
function sr(e, t) {
  const n = Ee.get(e);
  n &&
    ((n.initialDef.render = t),
    [...n.instances].forEach((s) => {
      t && ((s.render = t), (te(s.type).render = t)), (s.renderCache = []), s.update();
    }));
}
function or(e, t) {
  const n = Ee.get(e);
  if (!n) return;
  (t = te(t)), ut(n.initialDef, t);
  const s = [...n.instances];
  for (const r of s) {
    const o = te(r.type);
    Z.has(o) || (o !== n.initialDef && ut(o, t), Z.add(o)),
      r.appContext.propsCache.delete(r.type),
      r.appContext.emitsCache.delete(r.type),
      r.appContext.optionsCache.delete(r.type),
      r.ceReload
        ? (Z.add(o), r.ceReload(t.styles), Z.delete(o))
        : r.parent
        ? Xe(r.parent.update)
        : r.appContext.reload
        ? r.appContext.reload()
        : typeof window < 'u'
        ? window.location.reload()
        : console.warn('[HMR] Root or manually mounted instance modified. Full reload required.');
  }
  Mt(() => {
    for (const r of s) Z.delete(te(r.type));
  });
}
function ut(e, t) {
  R(e, t);
  for (const n in e) n !== '__file' && !(n in t) && delete e[n];
}
function Se(e) {
  return (t, n) => {
    try {
      return e(t, n);
    } catch (s) {
      console.error(s), console.warn('[HMR] Something went wrong during Vue component hot-reload. Full reload required.');
    }
  };
}
let F = null,
  ir = null;
const cr = (e) => e.__isSuspense;
function lr(e, t) {
  t && t.pendingBranch ? (h(e) ? t.effects.push(...e) : t.effects.push(e)) : Mt(e);
}
const de = {};
function ur(e, t, { immediate: n, deep: s, flush: r, onTrack: o, onTrigger: i } = T) {
  var c;
  process.env.NODE_ENV !== 'production' &&
    !t &&
    (n !== void 0 && E('watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.'),
    s !== void 0 && E('watch() "deep" option is only respected when using the watch(source, callback, options?) signature.'));
  const u = (g) => {
      E('Invalid watch source: ', g, 'A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.');
    },
    a = pn() === ((c = K) == null ? void 0 : c.scope) ? K : null;
  let d,
    l = !1,
    f = !1;
  if (
    (b(e)
      ? ((d = () => e.value), (l = Pe(e)))
      : W(e)
      ? ((d = () => e), (s = !0))
      : h(e)
      ? ((f = !0),
        (l = e.some((g) => W(g) || Pe(g))),
        (d = () =>
          e.map((g) => {
            if (b(g)) return g.value;
            if (W(g)) return G(g);
            if (N(g)) return q(g, a, 2);
            process.env.NODE_ENV !== 'production' && u(g);
          })))
      : N(e)
      ? t
        ? (d = () => q(e, a, 2))
        : (d = () => {
            if (!(a && a.isUnmounted)) return _ && _(), ge(e, a, 3, [V]);
          })
      : ((d = Fe), process.env.NODE_ENV !== 'production' && u(e)),
    t && s)
  ) {
    const g = d;
    d = () => G(g());
  }
  let _,
    V = (g) => {
      _ = I.onStop = () => {
        q(g, a, 4);
      };
    },
    x = f ? new Array(e.length).fill(de) : de;
  const z = () => {
    if (I.active)
      if (t) {
        const g = I.run();
        (s || l || (f ? g.some((Bt, Gt) => _e(Bt, x[Gt])) : _e(g, x))) && (_ && _(), ge(t, a, 3, [g, x === de ? void 0 : f && x[0] === de ? [] : x, V]), (x = g));
      } else I.run();
  };
  z.allowRecurse = !!t;
  let oe;
  r === 'sync' ? (oe = z) : r === 'post' ? (oe = () => ht(z, a && a.suspense)) : ((z.pre = !0), a && (z.id = a.uid), (oe = () => Xe(z)));
  const I = new _n(d, oe);
  return (
    process.env.NODE_ENV !== 'production' && ((I.onTrack = o), (I.onTrigger = i)),
    t ? (n ? z() : (x = I.run())) : r === 'post' ? ht(I.run.bind(I), a && a.suspense) : I.run(),
    () => {
      I.stop(), a && a.scope && Zt(a.scope.effects, I);
    }
  );
}
function ar(e, t, n) {
  const s = this.proxy,
    r = D(e) ? (e.includes('.') ? fr(s, e) : () => s[e]) : e.bind(s, s);
  let o;
  N(t) ? (o = t) : ((o = t.handler), (n = t));
  const i = K;
  Me(this);
  const c = ur(r, o.bind(s), n);
  return i ? Me(i) : Wt(), c;
}
function fr(e, t) {
  const n = t.split('.');
  return () => {
    let s = e;
    for (let r = 0; r < n.length && s; r++) s = s[n[r]];
    return s;
  };
}
function G(e, t) {
  if (!S(e) || e.__v_skip || ((t = t || new Set()), t.has(e))) return e;
  if ((t.add(e), b(e))) G(e.value, t);
  else if (h(e)) for (let n = 0; n < e.length; n++) G(e[n], t);
  else if (en(e) || Q(e))
    e.forEach((n) => {
      G(n, t);
    });
  else if (rn(e)) for (const n in e) G(e[n], t);
  return e;
}
function pr(e, t, n = K, s = !1) {
  if (n) {
    const r = n[e] || (n[e] = []),
      o =
        t.__weh ||
        (t.__weh = (...i) => {
          if (n.isUnmounted) return;
          He(), Me(n);
          const c = ge(t, n, e, i);
          return Wt(), Ue(), c;
        });
    return s ? r.unshift(o) : r.push(o), o;
  } else if (process.env.NODE_ENV !== 'production') {
    const r = sn(Ye[e].replace(/ hook$/, ''));
    E(
      `${r} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup(). If you are using async setup(), make sure to register lifecycle hooks before the first await statement.`,
    );
  }
}
const dr =
    (e) =>
    (t, n = K) =>
      pr(e, (...s) => t(...s), n),
  hr = dr('um'),
  _r = Symbol.for('v-ndc'),
  Ce = (e) => (e ? ($r(e) ? Cr(e) || e.proxy : Ce(e.parent)) : null),
  ne = R(Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => (process.env.NODE_ENV !== 'production' ? pe(e.props) : e.props),
    $attrs: (e) => (process.env.NODE_ENV !== 'production' ? pe(e.attrs) : e.attrs),
    $slots: (e) => (process.env.NODE_ENV !== 'production' ? pe(e.slots) : e.slots),
    $refs: (e) => (process.env.NODE_ENV !== 'production' ? pe(e.refs) : e.refs),
    $parent: (e) => Ce(e.parent),
    $root: (e) => Ce(e.root),
    $emit: (e) => e.emit,
    $options: (e) => (__VUE_OPTIONS_API__ ? wr(e) : e.type),
    $forceUpdate: (e) => e.f || (e.f = () => Xe(e.update)),
    $nextTick: (e) => e.n || (e.n = kn.bind(e.proxy)),
    $watch: (e) => (__VUE_OPTIONS_API__ ? ar.bind(e) : Fe),
  }),
  gr = (e) => e === '_' || e === '$',
  ve = (e, t) => e !== T && !e.__isScriptSetup && m(e, t),
  mr = {
    get({ _: e }, t) {
      const { ctx: n, setupState: s, data: r, props: o, accessCache: i, type: c, appContext: u } = e;
      if (process.env.NODE_ENV !== 'production' && t === '__isVue') return !0;
      let a;
      if (t[0] !== '$') {
        const _ = i[t];
        if (_ !== void 0)
          switch (_) {
            case 1:
              return s[t];
            case 2:
              return r[t];
            case 4:
              return n[t];
            case 3:
              return o[t];
          }
        else {
          if (ve(s, t)) return (i[t] = 1), s[t];
          if (r !== T && m(r, t)) return (i[t] = 2), r[t];
          if ((a = e.propsOptions[0]) && m(a, t)) return (i[t] = 3), o[t];
          if (n !== T && m(n, t)) return (i[t] = 4), n[t];
          (!__VUE_OPTIONS_API__ || Er) && (i[t] = 0);
        }
      }
      const d = ne[t];
      let l, f;
      if (d) return t === '$attrs' ? (v(e, 'get', t), process.env.NODE_ENV !== 'production' && void 0) : process.env.NODE_ENV !== 'production' && t === '$slots' && v(e, 'get', t), d(e);
      if ((l = c.__cssModules) && (l = l[t])) return l;
      if (n !== T && m(n, t)) return (i[t] = 4), n[t];
      if (((f = u.config.globalProperties), m(f, t))) return f[t];
      process.env.NODE_ENV !== 'production' &&
        F &&
        (!D(t) || t.indexOf('__v') !== 0) &&
        (r !== T && gr(t[0]) && m(r, t)
          ? E(`Property ${JSON.stringify(t)} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`)
          : e === F && E(`Property ${JSON.stringify(t)} was accessed during render but is not defined on instance.`));
    },
    set({ _: e }, t, n) {
      const { data: s, setupState: r, ctx: o } = e;
      return ve(r, t)
        ? ((r[t] = n), !0)
        : process.env.NODE_ENV !== 'production' && r.__isScriptSetup && m(r, t)
        ? (E(`Cannot mutate <script setup> binding "${t}" from Options API.`), !1)
        : s !== T && m(s, t)
        ? ((s[t] = n), !0)
        : m(e.props, t)
        ? (process.env.NODE_ENV !== 'production' && E(`Attempting to mutate prop "${t}". Props are readonly.`), !1)
        : t[0] === '$' && t.slice(1) in e
        ? (process.env.NODE_ENV !== 'production' && E(`Attempting to mutate public property "${t}". Properties starting with $ are reserved and readonly.`), !1)
        : (process.env.NODE_ENV !== 'production' && t in e.appContext.config.globalProperties ? Object.defineProperty(o, t, { enumerable: !0, configurable: !0, value: n }) : (o[t] = n), !0);
    },
    has({ _: { data: e, setupState: t, accessCache: n, ctx: s, appContext: r, propsOptions: o } }, i) {
      let c;
      return !!n[i] || (e !== T && m(e, i)) || ve(t, i) || ((c = o[0]) && m(c, i)) || m(s, i) || m(ne, i) || m(r.config.globalProperties, i);
    },
    defineProperty(e, t, n) {
      return n.get != null ? (e._.accessCache[t] = 0) : m(n, 'value') && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
    },
  };
process.env.NODE_ENV !== 'production' &&
  (mr.ownKeys = (e) => (E('Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead.'), Reflect.ownKeys(e)));
function at(e) {
  return h(e) ? e.reduce((t, n) => ((t[n] = null), t), {}) : e;
}
let Er = !0;
function wr(e) {
  const t = e.type,
    { mixins: n, extends: s } = t,
    {
      mixins: r,
      optionsCache: o,
      config: { optionMergeStrategies: i },
    } = e.appContext,
    c = o.get(t);
  let u;
  return c ? (u = c) : !r.length && !n && !s ? (u = t) : ((u = {}), r.length && r.forEach((a) => we(u, a, i, !0)), we(u, t, i)), S(t) && o.set(t, u), u;
}
function we(e, t, n, s = !1) {
  const { mixins: r, extends: o } = t;
  o && we(e, o, n, !0), r && r.forEach((i) => we(e, i, n, !0));
  for (const i in t)
    if (s && i === 'expose') process.env.NODE_ENV !== 'production' && E('"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.');
    else {
      const c = Nr[i] || (n && n[i]);
      e[i] = c ? c(e[i], t[i]) : t[i];
    }
  return e;
}
const Nr = {
  data: ft,
  props: dt,
  emits: dt,
  methods: ee,
  computed: ee,
  beforeCreate: w,
  created: w,
  beforeMount: w,
  mounted: w,
  beforeUpdate: w,
  updated: w,
  beforeDestroy: w,
  beforeUnmount: w,
  destroyed: w,
  unmounted: w,
  activated: w,
  deactivated: w,
  errorCaptured: w,
  serverPrefetch: w,
  components: ee,
  directives: ee,
  watch: br,
  provide: ft,
  inject: Or,
};
function ft(e, t) {
  return t
    ? e
      ? function () {
          return R(N(e) ? e.call(this, this) : e, N(t) ? t.call(this, this) : t);
        }
      : t
    : e;
}
function Or(e, t) {
  return ee(pt(e), pt(t));
}
function pt(e) {
  if (h(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
    return t;
  }
  return e;
}
function w(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function ee(e, t) {
  return e ? R(Object.create(null), e, t) : t;
}
function dt(e, t) {
  return e ? (h(e) && h(t) ? [...new Set([...e, ...t])] : R(Object.create(null), at(e), at(t ?? {}))) : t;
}
function br(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = R(Object.create(null), e);
  for (const s in t) n[s] = w(e[s], t[s]);
  return n;
}
const ht = lr,
  Sr = (e) => e.__isTeleport,
  jt = Symbol.for('v-fgt'),
  vr = Symbol.for('v-txt'),
  Vr = Symbol.for('v-cmt');
let Y = null;
function xr(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
const Ir = (...e) => Ht(...e),
  Kt = '__vInternal',
  zt = ({ key: e }) => e ?? null,
  he = ({ ref: e, ref_key: t, ref_for: n }) => (typeof e == 'number' && (e = '' + e), e != null ? (D(e) || b(e) || N(e) ? { i: F, r: e, k: t, f: !!n } : e) : null);
function Rr(e, t = null, n = null, s = 0, r = null, o = e === jt ? 0 : 1, i = !1, c = !1) {
  const u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && zt(t),
    ref: t && he(t),
    scopeId: ir,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: o,
    patchFlag: s,
    dynamicProps: r,
    dynamicChildren: null,
    appContext: null,
    ctx: F,
  };
  return (
    c ? (Ze(u, n), o & 128 && e.normalize(u)) : n && (u.shapeFlag |= D(n) ? 8 : 16),
    process.env.NODE_ENV !== 'production' && u.key !== u.key && E('VNode created with invalid key (NaN). VNode type:', u.type),
    !i && Y && (u.patchFlag > 0 || o & 6) && u.patchFlag !== 32 && Y.push(u),
    u
  );
}
const yr = process.env.NODE_ENV !== 'production' ? Ir : Ht;
function Ht(e, t = null, n = null, s = 0, r = null, o = !1) {
  if (((!e || e === _r) && (process.env.NODE_ENV !== 'production' && !e && E(`Invalid vnode type when creating vnode: ${e}.`), (e = Vr)), xr(e))) {
    const c = Ne(e, t, !0);
    return n && Ze(c, n), !o && Y && (c.shapeFlag & 6 ? (Y[Y.indexOf(e)] = c) : Y.push(c)), (c.patchFlag |= -2), c;
  }
  if ((Jt(e) && (e = e.__vccOpts), t)) {
    t = Dr(t);
    let { class: c, style: u } = t;
    c && !D(c) && (t.class = ze(c)), S(u) && (Te(u) && !h(u) && (u = R({}, u)), (t.style = Ke(u)));
  }
  const i = D(e) ? 1 : cr(e) ? 128 : Sr(e) ? 64 : S(e) ? 4 : N(e) ? 2 : 0;
  return (
    process.env.NODE_ENV !== 'production' &&
      i & 4 &&
      Te(e) &&
      ((e = p(e)),
      E(
        'Vue received a Component which was made a reactive object. This can lead to unnecessary performance overhead, and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.',
        `
Component that was made reactive: `,
        e,
      )),
    Rr(e, t, n, s, r, i, o, !0)
  );
}
function Dr(e) {
  return e ? (Te(e) || Kt in e ? R({}, e) : e) : null;
}
function Ne(e, t, n = !1) {
  const { props: s, ref: r, patchFlag: o, children: i } = e,
    c = t ? Tr(s || {}, t) : s;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: c,
    key: c && zt(c),
    ref: t && t.ref ? (n && r ? (h(r) ? r.concat(he(t)) : [r, he(t)]) : he(t)) : r,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: process.env.NODE_ENV !== 'production' && o === -1 && h(i) ? i.map(Ut) : i,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== jt ? (o === -1 ? 16 : o | 16) : o,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && Ne(e.ssContent),
    ssFallback: e.ssFallback && Ne(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce,
  };
}
function Ut(e) {
  const t = Ne(e);
  return h(e.children) && (t.children = e.children.map(Ut)), t;
}
function Pr(e = ' ', t = 0) {
  return yr(vr, null, e, t);
}
function Ze(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null) t = null;
  else if (h(t)) n = 16;
  else if (typeof t == 'object')
    if (s & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), Ze(e, r()), r._c && (r._d = !0));
      return;
    } else {
      n = 32;
      const r = t._;
      !r && !(Kt in t) ? (t._ctx = F) : r === 3 && F && (F.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)));
    }
  else N(t) ? ((t = { default: t, _ctx: F }), (n = 32)) : ((t = String(t)), s & 64 ? ((n = 16), (t = [Pr(t)])) : (n = 8));
  (e.children = t), (e.shapeFlag |= n);
}
function Tr(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const r in s)
      if (r === 'class') t.class !== s.class && (t.class = ze([t.class, s.class]));
      else if (r === 'style') t.style = Ke([t.style, s.style]);
      else if (Xt(r)) {
        const o = t[r],
          i = s[r];
        i && o !== i && !(h(o) && o.includes(i)) && (t[r] = o ? [].concat(o, i) : i);
      } else r !== '' && (t[r] = s[r]);
  }
  return t;
}
let K = null,
  ke,
  B,
  _t = '__VUE_INSTANCE_SETTERS__';
(B = xe()[_t]) || (B = xe()[_t] = []),
  B.push((e) => (K = e)),
  (ke = (e) => {
    B.length > 1 ? B.forEach((t) => t(e)) : B[0](e);
  });
const Me = (e) => {
    ke(e), e.scope.on();
  },
  Wt = () => {
    K && K.scope.off(), ke(null);
  };
function $r(e) {
  return e.vnode.shapeFlag & 4;
}
function Cr(e) {
  if (e.exposed)
    return (
      e.exposeProxy ||
      (e.exposeProxy = new Proxy(Ln(Hn(e.exposed)), {
        get(t, n) {
          if (n in t) return t[n];
          if (n in ne) return ne[n](e);
        },
        has(t, n) {
          return n in t || n in ne;
        },
      }))
    );
}
const Mr = /(?:^|[-_])(\w)/g,
  Fr = (e) => e.replace(Mr, (t) => t.toUpperCase()).replace(/[-_]/g, '');
function Lt(e, t = !0) {
  return N(e) ? e.displayName || e.name : e.name || (t && e.__name);
}
function qt(e, t, n = !1) {
  let s = Lt(t);
  if (!s && t.__file) {
    const r = t.__file.match(/([^/\\]+)\.\w+$/);
    r && (s = r[1]);
  }
  if (!s && e && e.parent) {
    const r = (o) => {
      for (const i in o) if (o[i] === t) return i;
    };
    s = r(e.components || e.parent.type.components) || r(e.appContext.components);
  }
  return s ? Fr(s) : n ? 'App' : 'Anonymous';
}
function Jt(e) {
  return N(e) && '__vccOpts' in e;
}
function Ve(e) {
  return !!(e && e.__v_isShallow);
}
function Ar() {
  if (process.env.NODE_ENV === 'production' || typeof window > 'u') return;
  const e = { style: 'color:#3ba776' },
    t = { style: 'color:#0b1bc9' },
    n = { style: 'color:#b62e24' },
    s = { style: 'color:#9d288c' },
    r = {
      header(l) {
        return S(l)
          ? l.__isVue
            ? ['div', e, 'VueInstance']
            : b(l)
            ? ['div', {}, ['span', e, d(l)], '<', c(l.value), '>']
            : W(l)
            ? ['div', {}, ['span', e, Ve(l) ? 'ShallowReactive' : 'Reactive'], '<', c(l), `>${J(l) ? ' (readonly)' : ''}`]
            : J(l)
            ? ['div', {}, ['span', e, Ve(l) ? 'ShallowReadonly' : 'Readonly'], '<', c(l), '>']
            : null
          : null;
      },
      hasBody(l) {
        return l && l.__isVue;
      },
      body(l) {
        if (l && l.__isVue) return ['div', {}, ...o(l.$)];
      },
    };
  function o(l) {
    const f = [];
    l.type.props && l.props && f.push(i('props', p(l.props))), l.setupState !== T && f.push(i('setup', l.setupState)), l.data !== T && f.push(i('data', p(l.data)));
    const _ = u(l, 'computed');
    _ && f.push(i('computed', _));
    const V = u(l, 'inject');
    return V && f.push(i('injected', V)), f.push(['div', {}, ['span', { style: s.style + ';opacity:0.66' }, '$ (internal): '], ['object', { object: l }]]), f;
  }
  function i(l, f) {
    return (
      (f = R({}, f)),
      Object.keys(f).length
        ? [
            'div',
            { style: 'line-height:1.25em;margin-bottom:0.6em' },
            ['div', { style: 'color:#476582' }, l],
            ['div', { style: 'padding-left:1.25em' }, ...Object.keys(f).map((_) => ['div', {}, ['span', s, _ + ': '], c(f[_], !1)])],
          ]
        : ['span', {}]
    );
  }
  function c(l, f = !0) {
    return typeof l == 'number'
      ? ['span', t, l]
      : typeof l == 'string'
      ? ['span', n, JSON.stringify(l)]
      : typeof l == 'boolean'
      ? ['span', s, l]
      : S(l)
      ? ['object', { object: f ? p(l) : l }]
      : ['span', n, String(l)];
  }
  function u(l, f) {
    const _ = l.type;
    if (N(_)) return;
    const V = {};
    for (const x in l.ctx) a(_, x, f) && (V[x] = l.ctx[x]);
    return V;
  }
  function a(l, f, _) {
    const V = l[_];
    if ((h(V) && V.includes(f)) || (S(V) && f in V) || (l.extends && a(l.extends, f, _)) || (l.mixins && l.mixins.some((x) => a(x, f, _)))) return !0;
  }
  function d(l) {
    return Ve(l) ? 'ShallowRef' : l.effect ? 'ComputedRef' : 'Ref';
  }
  window.devtoolsFormatters ? window.devtoolsFormatters.push(r) : (window.devtoolsFormatters = [r]);
}
function jr() {
  Ar();
}
process.env.NODE_ENV !== 'production' && jr();
function Kr(e, t) {
  return re.ipcRenderer.invoke(e, t);
}
function zr(e, t) {
  re.ipcRenderer.on(e, t),
    hr(() => {
      re.ipcRenderer.removeListener(e, t);
    });
}
function Hr(e, t) {
  return (
    re.ipcRenderer.on(e, t),
    () => {
      re.ipcRenderer.removeListener(e, t);
    }
  );
}
exports.invoke = Kr;
exports.listen = Hr;
exports.vueListen = zr;

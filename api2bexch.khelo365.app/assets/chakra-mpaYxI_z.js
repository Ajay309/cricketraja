import {
  r as g,
  c as ju,
  g as jP,
  R as y$,
  a as Fa,
  b as Az,
  d as Lt,
} from "./router-Ua64hkZi.js";
var DP = { exports: {} },
  If = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var _z = g,
  Iz = Symbol.for("react.element"),
  Ez = Symbol.for("react.fragment"),
  Mz = Object.prototype.hasOwnProperty,
  Fz = _z.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  jz = { key: !0, ref: !0, __self: !0, __source: !0 };
function NP(e, t, r) {
  var n,
    o = {},
    a = null,
    s = null;
  r !== void 0 && (a = "" + r),
    t.key !== void 0 && (a = "" + t.key),
    t.ref !== void 0 && (s = t.ref);
  for (n in t) Mz.call(t, n) && !jz.hasOwnProperty(n) && (o[n] = t[n]);
  if (e && e.defaultProps)
    for (n in ((t = e.defaultProps), t)) o[n] === void 0 && (o[n] = t[n]);
  return {
    $$typeof: Iz,
    type: e,
    key: a,
    ref: s,
    props: o,
    _owner: Fz.current,
  };
}
If.Fragment = Ez;
If.jsx = NP;
If.jsxs = NP;
DP.exports = If;
var P = DP.exports;
function yr() {
  return (
    (yr = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t];
            for (var n in r) ({}.hasOwnProperty.call(r, n) && (e[n] = r[n]));
          }
          return e;
        }),
    yr.apply(null, arguments)
  );
}
function Dz(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if ({}.hasOwnProperty.call(e, n)) {
      if (t.includes(n)) continue;
      r[n] = e[n];
    }
  return r;
}
function Yv(e, t) {
  return (
    (Yv = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (r, n) {
          return (r.__proto__ = n), r;
        }),
    Yv(e, t)
  );
}
function Nz(e, t) {
  (e.prototype = Object.create(t.prototype)),
    (e.prototype.constructor = e),
    Yv(e, t);
}
var Oz = {},
  le = {},
  OP = {},
  x = {},
  dg = {};
function Bz(e, t, r, n) {
  return (
    e.addEventListener(t, r, n),
    () => {
      e.removeEventListener(t, r, n);
    }
  );
}
dg.addDomEvent = Bz;
var BP = {},
  yi = {},
  gi = {},
  Qr = {};
function fg(e) {
  return (
    e != null &&
    typeof e == "object" &&
    "nodeType" in e &&
    e.nodeType === Node.ELEMENT_NODE
  );
}
function Lz() {
  return !!(globalThis != null && globalThis.document);
}
function Vz(e) {
  return fg(e) && e.localName === "input" && "select" in e;
}
function zz(e) {
  return (fg(e) ? e.ownerDocument : document).activeElement === e;
}
function LP(e) {
  return e.parentElement && LP(e.parentElement) ? !0 : e.hidden;
}
function Hz(e) {
  const t = e.getAttribute("contenteditable");
  return t !== "false" && t != null;
}
function Wz(e) {
  return !!e.getAttribute("disabled") || !!e.getAttribute("aria-disabled");
}
Qr.isActiveElement = zz;
Qr.isBrowser = Lz;
Qr.isContentEditableElement = Hz;
Qr.isDisabledElement = Wz;
Qr.isHTMLElement = fg;
Qr.isHiddenElement = LP;
Qr.isInputElement = Vz;
var Gz = Qr;
function Uz(e) {
  var t;
  return ((t = mg(e)) == null ? void 0 : t.defaultView) ?? window;
}
function mg(e) {
  return Gz.isHTMLElement(e) ? e.ownerDocument : document;
}
function Kz(e) {
  return e.view ?? window;
}
function qz(e) {
  return mg(e).activeElement;
}
gi.getActiveElement = qz;
gi.getEventWindow = Kz;
gi.getOwnerDocument = mg;
gi.getOwnerWindow = Uz;
var Xz = gi;
function Yz(e) {
  const t = Xz.getEventWindow(e);
  return typeof t.PointerEvent < "u" && e instanceof t.PointerEvent
    ? e.pointerType === "mouse"
    : e instanceof t.MouseEvent;
}
function VP(e) {
  return !!e.touches;
}
function Zz(e) {
  return VP(e) && e.touches.length > 1;
}
yi.isMouseEvent = Yz;
yi.isMultiTouchEvent = Zz;
yi.isTouchEvent = VP;
var hg = {},
  Qz = yi;
function Jz(e, t = "page") {
  const r = e.touches[0] || e.changedTouches[0];
  return { x: r[`${t}X`], y: r[`${t}Y`] };
}
function e3(e, t = "page") {
  return { x: e[`${t}X`], y: e[`${t}Y`] };
}
function t3(e, t = "page") {
  return Qz.isTouchEvent(e) ? Jz(e, t) : e3(e, t);
}
hg.getEventPoint = t3;
var r3 = dg,
  n3 = yi,
  o3 = hg;
function a3(e) {
  return (t) => {
    const r = n3.isMouseEvent(t);
    (!r || (r && t.button === 0)) && e(t);
  };
}
function s3(e, t = !1) {
  function r(o) {
    e(o, { point: o3.getEventPoint(o) });
  }
  return t ? a3(r) : r;
}
function i3(e, t, r, n) {
  return r3.addDomEvent(e, t, s3(r, t === "pointerdown"), n);
}
BP.addPointerEvent = i3;
var zP = {};
function c3(e, ...t) {
  if (e == null)
    throw new TypeError("Cannot convert undefined or null to object");
  const r = { ...e };
  for (const n of t)
    if (n != null)
      for (const o in n)
        Object.prototype.hasOwnProperty.call(n, o) &&
          (o in r && delete r[o], (r[o] = n[o]));
  return r;
}
zP.assignAfter = c3;
var pg = {};
const l3 = (e) => (e ? "" : void 0),
  u3 = (e) => (e ? !0 : void 0);
pg.ariaAttr = u3;
pg.dataAttr = l3;
var Ef = {},
  lt = {};
function d3(e) {
  return typeof e == "number";
}
function f3(e) {
  return typeof e != "number" || Number.isNaN(e) || !Number.isFinite(e);
}
function m3(e) {
  return e != null && e - parseFloat(e) + 1 >= 0;
}
function Mf(e) {
  return Array.isArray(e);
}
function HP(e) {
  return Mf(e) && e.length === 0;
}
function h3(e) {
  return typeof e == "function";
}
function p3(e) {
  return typeof e < "u" && e !== void 0;
}
function v3(e) {
  return typeof e > "u" || e === void 0;
}
function Zc(e) {
  const t = typeof e;
  return e != null && (t === "object" || t === "function") && !Mf(e);
}
function WP(e) {
  return Zc(e) && Object.keys(e).length === 0;
}
function y3(e) {
  return e == null;
}
function g3(e) {
  return Object.prototype.toString.call(e) === "[object String]";
}
function b3(e) {
  return /^var\(--.+\)$/.test(e);
}
function S3(e) {
  return Mf(e) ? HP(e) : Zc(e) ? WP(e) : e == null || e === "";
}
function x3(e) {
  return "current" in e;
}
function $3(e) {
  return e && Zc(e) && Zc(e.target);
}
lt.isArray = Mf;
lt.isCssVar = b3;
lt.isDefined = p3;
lt.isEmpty = S3;
lt.isEmptyArray = HP;
lt.isEmptyObject = WP;
lt.isFunction = h3;
lt.isInputEvent = $3;
lt.isNotNumber = f3;
lt.isNull = y3;
lt.isNumber = d3;
lt.isNumeric = m3;
lt.isObject = Zc;
lt.isRefObject = x3;
lt.isString = g3;
lt.isUndefined = v3;
var w3 = lt;
function C3(e) {
  const t = e == null ? 0 : e.length;
  return t ? e[t - 1] : void 0;
}
function k3(e) {
  const t = parseFloat(e.toString()),
    r = e.toString().replace(String(t), "");
  return { unitless: !r, value: t, unit: r };
}
function af(e) {
  if (e == null) return e;
  const { unitless: t } = k3(e);
  return t || typeof e == "number" ? `${e}px` : e;
}
const GP = (e, t) => (parseInt(e[1], 10) > parseInt(t[1], 10) ? 1 : -1),
  vg = (e) => Object.fromEntries(Object.entries(e).sort(GP));
function g$(e) {
  const t = vg(e);
  return Object.assign(Object.values(t), t);
}
function T3(e) {
  const t = Object.keys(vg(e));
  return new Set(t);
}
function b$(e) {
  if (!e) return e;
  e = af(e) ?? e;
  const t = -0.02;
  return typeof e == "number"
    ? `${e + t}`
    : e.replace(/(\d+\.?\d*)/u, (r) => `${parseFloat(r) + t}`);
}
function wc(e, t) {
  const r = ["@media screen"];
  return (
    e && r.push("and", `(min-width: ${af(e)})`),
    t && r.push("and", `(max-width: ${af(t)})`),
    r.join(" ")
  );
}
function P3(e) {
  if (!e) return null;
  e.base = e.base ?? "0px";
  const t = g$(e),
    r = Object.entries(e)
      .sort(GP)
      .map(([a, s], i, c) => {
        let [, l] = c[i + 1] ?? [];
        return (
          (l = parseFloat(l) > 0 ? b$(l) : void 0),
          {
            _minW: b$(s),
            breakpoint: a,
            minW: s,
            maxW: l,
            maxWQuery: wc(null, l),
            minWQuery: wc(s),
            minMaxQuery: wc(s, l),
          }
        );
      }),
    n = T3(e),
    o = Array.from(n.values());
  return {
    keys: n,
    normalized: t,
    isResponsive(a) {
      const s = Object.keys(a);
      return s.length > 0 && s.every((i) => n.has(i));
    },
    asObject: vg(e),
    asArray: g$(e),
    details: r,
    get(a) {
      return r.find((s) => s.breakpoint === a);
    },
    media: [null, ...t.map((a) => wc(a)).slice(1)],
    toArrayValue(a) {
      if (!w3.isObject(a))
        throw new Error("toArrayValue: value must be an object");
      const s = o.map((i) => a[i] ?? null);
      for (; C3(s) === null; ) s.pop();
      return s;
    },
    toObjectValue(a) {
      if (!Array.isArray(a))
        throw new Error("toObjectValue: value must be an array");
      return a.reduce((s, i, c) => {
        const l = o[c];
        return l != null && i != null && (s[l] = i), s;
      }, {});
    },
  };
}
Ef.analyzeBreakpoints = P3;
Ef.px = af;
Ef.toMediaQueryString = wc;
var yg = {};
function R3(...e) {
  return function (...r) {
    e.forEach((n) => (n == null ? void 0 : n(...r)));
  };
}
function A3(...e) {
  return function (r) {
    e.some((n) => (n == null || n(r), r == null ? void 0 : r.defaultPrevented));
  };
}
yg.callAll = R3;
yg.callAllHandlers = A3;
var UP = {},
  S$ = g;
function _3(e) {
  return S$.Children.toArray(e).filter((t) => S$.isValidElement(t));
}
UP.getValidChildren = _3;
var KP = {};
function I3(e) {
  const t = Object.assign({}, e);
  for (let r in t) t[r] === void 0 && delete t[r];
  return t;
}
KP.compact = I3;
var qP = {};
function E3(e, t) {
  return e ? e === t || e.contains(t) : !1;
}
qP.contains = E3;
var gg = {},
  x$ = g;
function M3(e, t) {
  return `${e} returned \`undefined\`. Seems you forgot to wrap component within ${t}`;
}
function F3(e = {}) {
  const {
      name: t,
      strict: r = !0,
      hookName: n = "useContext",
      providerName: o = "Provider",
      errorMessage: a,
      defaultValue: s,
    } = e,
    i = x$.createContext(s);
  i.displayName = t;
  function c() {
    var u;
    const l = x$.useContext(i);
    if (!l && r) {
      const d = new Error(a ?? M3(n, o));
      throw (
        ((d.name = "ContextError"),
        (u = Error.captureStackTrace) == null || u.call(Error, d, c),
        d)
      );
    }
    return l;
  }
  return [i.Provider, c, i];
}
gg.createContext = F3;
var XP = {};
const j3 = (...e) => e.filter(Boolean).join(" ");
XP.cx = j3;
var Oo = {},
  Bo = {},
  Cc = Qr;
const D3 = (e) => window.getComputedStyle(e).display === "none",
  bg = (e) => e.hasAttribute("tabindex"),
  YP = (e) => bg(e) && e.tabIndex === -1;
function N3(e) {
  return document.activeElement ? e.contains(document.activeElement) : !1;
}
function ZP(e) {
  if (!Cc.isHTMLElement(e) || Cc.isHiddenElement(e) || Cc.isDisabledElement(e))
    return !1;
  const { localName: t } = e;
  if (["input", "select", "textarea", "button"].indexOf(t) >= 0) return !0;
  const n = {
    a: () => e.hasAttribute("href"),
    audio: () => e.hasAttribute("controls"),
    video: () => e.hasAttribute("controls"),
  };
  return t in n ? n[t]() : Cc.isContentEditableElement(e) ? !0 : bg(e);
}
function O3(e) {
  return e ? Cc.isHTMLElement(e) && ZP(e) && !YP(e) : !1;
}
Bo.hasDisplayNone = D3;
Bo.hasFocusWithin = N3;
Bo.hasNegativeTabIndex = YP;
Bo.hasTabIndex = bg;
Bo.isFocusable = ZP;
Bo.isTabbable = O3;
var Pa = Bo;
const B3 = [
    "input:not(:disabled):not([disabled])",
    "select:not(:disabled):not([disabled])",
    "textarea:not(:disabled):not([disabled])",
    "embed",
    "iframe",
    "object",
    "a[href]",
    "area[href]",
    "button:not(:disabled):not([disabled])",
    "[tabindex]",
    "audio[controls]",
    "video[controls]",
    "*[tabindex]:not([aria-disabled])",
    "*[contenteditable]",
  ],
  QP = B3.join(),
  L3 = (e) => e.offsetWidth > 0 && e.offsetHeight > 0;
function Ff(e) {
  const t = Array.from(e.querySelectorAll(QP));
  return t.unshift(e), t.filter((r) => Pa.isFocusable(r) && L3(r));
}
function V3(e) {
  const t = Ff(e);
  return t.length ? t[0] : null;
}
function Sg(e, t) {
  const r = Array.from(e.querySelectorAll(QP)),
    n = r.filter(Pa.isTabbable);
  return Pa.isTabbable(e) && n.unshift(e), !n.length && t ? r : n;
}
function z3(e, t) {
  const [r] = Sg(e, t);
  return r || null;
}
function H3(e, t) {
  const r = Sg(e, t);
  return r[r.length - 1] || null;
}
function W3(e, t) {
  const r = Ff(e),
    n = r.indexOf(document.activeElement),
    o = r.slice(n + 1);
  return o.find(Pa.isTabbable) || r.find(Pa.isTabbable) || (t ? o[0] : null);
}
function G3(e, t) {
  const r = Ff(e).reverse(),
    n = r.indexOf(document.activeElement),
    o = r.slice(n + 1);
  return o.find(Pa.isTabbable) || r.find(Pa.isTabbable) || (t ? o[0] : null);
}
Oo.getAllFocusable = Ff;
Oo.getAllTabbable = Sg;
Oo.getFirstFocusable = V3;
Oo.getFirstTabbableIn = z3;
Oo.getLastTabbableIn = H3;
Oo.getNextTabbable = W3;
Oo.getPreviousTabbable = G3;
var xg = {};
function JP(e, t, r, n) {
  const o = typeof t == "string" ? t.split(".") : [t];
  for (n = 0; n < o.length && e; n += 1) e = e[o[n]];
  return e === void 0 ? r : e;
}
const U3 = (e) => {
    const t = new WeakMap();
    return (n, o, a, s) => {
      if (typeof n > "u") return e(n, o, a);
      t.has(n) || t.set(n, new Map());
      const i = t.get(n);
      if (i.has(o)) return i.get(o);
      const c = e(n, o, a, s);
      return i.set(o, c), c;
    };
  },
  K3 = U3(JP);
xg.get = JP;
xg.memoizedGet = K3;
var eR = {};
const q3 = (e) => e.default || e;
eR.interopDefault = q3;
var tR = {};
function X3(e) {
  const { wasSelected: t, enabled: r, isSelected: n, mode: o = "unmount" } = e;
  return !!(!r || n || (o === "keepMounted" && t));
}
tR.lazyDisclosure = X3;
var ja = {};
function Y3(e) {
  const t = parseFloat(e);
  return typeof t != "number" || Number.isNaN(t) ? 0 : t;
}
function rR(e, t) {
  let r = Y3(e);
  const n = 10 ** (t ?? 10);
  return (r = Math.round(r * n) / n), t ? r.toFixed(t) : r.toString();
}
function nR(e) {
  if (!Number.isFinite(e)) return 0;
  let t = 1,
    r = 0;
  for (; Math.round(e * t) / t !== e; ) (t *= 10), (r += 1);
  return r;
}
function Z3(e, t, r) {
  return ((e - t) * 100) / (r - t);
}
function Q3(e, t, r) {
  return (r - t) * e + t;
}
function J3(e, t, r) {
  const n = Math.round((e - t) / r) * r + t,
    o = nR(r);
  return rR(n, o);
}
function e4(e, t, r) {
  return e == null
    ? e
    : (r < t && console.warn("clamp: max cannot be less than min"),
      Math.min(Math.max(e, t), r));
}
ja.clampValue = e4;
ja.countDecimalPlaces = nR;
ja.percentToValue = Q3;
ja.roundValueToStep = J3;
ja.toPrecision = rR;
ja.valueToPercent = Z3;
var oR = {};
function t4(e, t = []) {
  const r = Object.assign({}, e);
  for (const n of t) n in r && delete r[n];
  return r;
}
oR.omit = t4;
var aR = {};
function r4(e, t) {
  const r = {};
  for (const n of t) n in e && (r[n] = e[n]);
  return r;
}
aR.pick = r4;
var Da = {},
  n4 = lt;
const jf = Object.freeze(["base", "sm", "md", "lg", "xl", "2xl"]);
function o4(e, t) {
  return Array.isArray(e)
    ? e.map((r) => (r === null ? null : t(r)))
    : n4.isObject(e)
    ? Object.keys(e).reduce((r, n) => ((r[n] = t(e[n])), r), {})
    : e != null
    ? t(e)
    : null;
}
function a4(e, t = jf) {
  const r = t.map((o) => e[o] ?? null),
    n = r[r.length - 1];
  for (; n === null; ) r.pop();
  return r;
}
function s4(e, t = jf) {
  const r = {};
  return (
    e.forEach((n, o) => {
      const a = t[o];
      n != null && (r[a] = n);
    }),
    r
  );
}
function i4(e, t = jf) {
  const r = Object.keys(e);
  return r.length > 0 && r.every((n) => t.includes(n));
}
const c4 = (e) => Number.isNaN(Number(e));
Da.arrayToObjectNotation = s4;
Da.breakpoints = jf;
Da.isCustomBreakpoint = c4;
Da.isResponsiveObjectLike = i4;
Da.mapResponsive = o4;
Da.objectToArrayNotation = a4;
var sR = {};
const l4 = (e) => typeof e == "function";
function u4(e, ...t) {
  return l4(e) ? e(...t) : e;
}
sR.runIfFn = u4;
var iR = {},
  d4 = Qr;
function f4(e) {
  const t = e.ownerDocument.defaultView || window,
    { overflow: r, overflowX: n, overflowY: o } = t.getComputedStyle(e);
  return /auto|scroll|overlay|hidden/.test(r + o + n);
}
function m4(e) {
  return e.localName === "html"
    ? e
    : e.assignedSlot || e.parentElement || e.ownerDocument.documentElement;
}
function cR(e) {
  return ["html", "body", "#document"].includes(e.localName)
    ? e.ownerDocument.body
    : d4.isHTMLElement(e) && f4(e)
    ? e
    : cR(m4(e));
}
iR.getScrollParent = cR;
var lR = {};
function h4(e, t) {
  const r = {},
    n = {};
  for (const [o, a] of Object.entries(e))
    t.includes(o) ? (r[o] = a) : (n[o] = a);
  return [r, n];
}
lR.split = h4;
var uR = {};
function p4(e, ...t) {
  const r = Object.getOwnPropertyDescriptors(e),
    n = Object.keys(r),
    o = (s) => {
      const i = {};
      for (let c = 0; c < s.length; c++) {
        const l = s[c];
        r[l] && (Object.defineProperty(i, l, r[l]), delete r[l]);
      }
      return i;
    },
    a = (s) => o(Array.isArray(s) ? s : n.filter(s));
  return t.map(a).concat(o(n));
}
uR.splitProps = p4;
var dR = {},
  v4 = lt;
function y4(e, t, r = {}) {
  const { stop: n, getKey: o } = r;
  function a(s, i = []) {
    if (v4.isObject(s) || Array.isArray(s)) {
      const c = {};
      for (const [l, u] of Object.entries(s)) {
        const d = (o == null ? void 0 : o(l)) ?? l,
          f = [...i, d];
        if (n != null && n(s, f)) return t(s, i);
        c[d] = a(u, f);
      }
      return c;
    }
    return t(s, i);
  }
  return a(e);
}
dR.walkObject = y4;
var fR = {};
const g4 = (e) => {
  const { condition: t, message: r } = e;
};
fR.warn = g4;
var sf = { exports: {} };
sf.exports;
(function (e, t) {
  var r = 200,
    n = "__lodash_hash_undefined__",
    o = 800,
    a = 16,
    s = 9007199254740991,
    i = "[object Arguments]",
    c = "[object Array]",
    l = "[object AsyncFunction]",
    u = "[object Boolean]",
    d = "[object Date]",
    f = "[object Error]",
    m = "[object Function]",
    h = "[object GeneratorFunction]",
    p = "[object Map]",
    v = "[object Number]",
    b = "[object Null]",
    y = "[object Object]",
    S = "[object Proxy]",
    w = "[object RegExp]",
    C = "[object Set]",
    T = "[object String]",
    k = "[object Undefined]",
    R = "[object WeakMap]",
    E = "[object ArrayBuffer]",
    _ = "[object DataView]",
    N = "[object Float32Array]",
    G = "[object Float64Array]",
    B = "[object Int8Array]",
    z = "[object Int16Array]",
    Y = "[object Int32Array]",
    W = "[object Uint8Array]",
    j = "[object Uint8ClampedArray]",
    O = "[object Uint16Array]",
    K = "[object Uint32Array]",
    ve = /[\\^$.*+?()[\]{}|]/g,
    re = /^\[object .+?Constructor\]$/,
    ue = /^(?:0|[1-9]\d*)$/,
    L = {};
  (L[N] = L[G] = L[B] = L[z] = L[Y] = L[W] = L[j] = L[O] = L[K] = !0),
    (L[i] =
      L[c] =
      L[E] =
      L[u] =
      L[_] =
      L[d] =
      L[f] =
      L[m] =
      L[p] =
      L[v] =
      L[y] =
      L[w] =
      L[C] =
      L[T] =
      L[R] =
        !1);
  var V = typeof ju == "object" && ju && ju.Object === Object && ju,
    ee = typeof self == "object" && self && self.Object === Object && self,
    pe = V || ee || Function("return this")(),
    xe = t && !t.nodeType && t,
    Ce = xe && !0 && e && !e.nodeType && e,
    X = Ce && Ce.exports === xe,
    de = X && V.process,
    Q = (function () {
      try {
        var $ = Ce && Ce.require && Ce.require("util").types;
        return $ || (de && de.binding && de.binding("util"));
      } catch {}
    })(),
    J = Q && Q.isTypedArray;
  function ne($, A, F) {
    switch (F.length) {
      case 0:
        return $.call(A);
      case 1:
        return $.call(A, F[0]);
      case 2:
        return $.call(A, F[0], F[1]);
      case 3:
        return $.call(A, F[0], F[1], F[2]);
    }
    return $.apply(A, F);
  }
  function we($, A) {
    for (var F = -1, te = Array($); ++F < $; ) te[F] = A(F);
    return te;
  }
  function ae($) {
    return function (A) {
      return $(A);
    };
  }
  function ye($, A) {
    return $ == null ? void 0 : $[A];
  }
  function U($, A) {
    return function (F) {
      return $(A(F));
    };
  }
  var be = Array.prototype,
    ge = Function.prototype,
    Te = Object.prototype,
    He = pe["__core-js_shared__"],
    Ue = ge.toString,
    Ze = Te.hasOwnProperty,
    wt = (function () {
      var $ = /[^.]+$/.exec((He && He.keys && He.keys.IE_PROTO) || "");
      return $ ? "Symbol(src)_1." + $ : "";
    })(),
    nr = Te.toString,
    or = Ue.call(Object),
    wr = RegExp(
      "^" +
        Ue.call(Ze)
          .replace(ve, "\\$&")
          .replace(
            /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
            "$1.*?"
          ) +
        "$"
    ),
    H = X ? pe.Buffer : void 0,
    Ee = pe.Symbol,
    q = pe.Uint8Array;
  H && H.allocUnsafe;
  var oe = U(Object.getPrototypeOf, Object),
    nt = Object.create,
    jt = Te.propertyIsEnumerable,
    Z = be.splice,
    ie = Ee ? Ee.toStringTag : void 0,
    fe = (function () {
      try {
        var $ = qi(Object, "defineProperty");
        return $({}, "", {}), $;
      } catch {}
    })(),
    _e = H ? H.isBuffer : void 0,
    Ie = Math.max,
    Rt = Date.now,
    Dt = qi(pe, "Map"),
    dt = qi(Object, "create"),
    yu = (function () {
      function $() {}
      return function (A) {
        if (!on(A)) return {};
        if (nt) return nt(A);
        $.prototype = A;
        var F = new $();
        return ($.prototype = void 0), F;
      };
    })();
  function Nr($) {
    var A = -1,
      F = $ == null ? 0 : $.length;
    for (this.clear(); ++A < F; ) {
      var te = $[A];
      this.set(te[0], te[1]);
    }
  }
  function gu() {
    (this.__data__ = dt ? dt(null) : {}), (this.size = 0);
  }
  function Ch($) {
    var A = this.has($) && delete this.__data__[$];
    return (this.size -= A ? 1 : 0), A;
  }
  function kh($) {
    var A = this.__data__;
    if (dt) {
      var F = A[$];
      return F === n ? void 0 : F;
    }
    return Ze.call(A, $) ? A[$] : void 0;
  }
  function Th($) {
    var A = this.__data__;
    return dt ? A[$] !== void 0 : Ze.call(A, $);
  }
  function Ph($, A) {
    var F = this.__data__;
    return (
      (this.size += this.has($) ? 0 : 1),
      (F[$] = dt && A === void 0 ? n : A),
      this
    );
  }
  (Nr.prototype.clear = gu),
    (Nr.prototype.delete = Ch),
    (Nr.prototype.get = kh),
    (Nr.prototype.has = Th),
    (Nr.prototype.set = Ph);
  function Or($) {
    var A = -1,
      F = $ == null ? 0 : $.length;
    for (this.clear(); ++A < F; ) {
      var te = $[A];
      this.set(te[0], te[1]);
    }
  }
  function Rh() {
    (this.__data__ = []), (this.size = 0);
  }
  function Ah($) {
    var A = this.__data__,
      F = Ja(A, $);
    if (F < 0) return !1;
    var te = A.length - 1;
    return F == te ? A.pop() : Z.call(A, F, 1), --this.size, !0;
  }
  function _h($) {
    var A = this.__data__,
      F = Ja(A, $);
    return F < 0 ? void 0 : A[F][1];
  }
  function Ih($) {
    return Ja(this.__data__, $) > -1;
  }
  function Eh($, A) {
    var F = this.__data__,
      te = Ja(F, $);
    return te < 0 ? (++this.size, F.push([$, A])) : (F[te][1] = A), this;
  }
  (Or.prototype.clear = Rh),
    (Or.prototype.delete = Ah),
    (Or.prototype.get = _h),
    (Or.prototype.has = Ih),
    (Or.prototype.set = Eh);
  function vo($) {
    var A = -1,
      F = $ == null ? 0 : $.length;
    for (this.clear(); ++A < F; ) {
      var te = $[A];
      this.set(te[0], te[1]);
    }
  }
  function Mh() {
    (this.size = 0),
      (this.__data__ = {
        hash: new Nr(),
        map: new (Dt || Or)(),
        string: new Nr(),
      });
  }
  function Fh($) {
    var A = Jo(this, $).delete($);
    return (this.size -= A ? 1 : 0), A;
  }
  function Li($) {
    return Jo(this, $).get($);
  }
  function bu($) {
    return Jo(this, $).has($);
  }
  function Su($, A) {
    var F = Jo(this, $),
      te = F.size;
    return F.set($, A), (this.size += F.size == te ? 0 : 1), this;
  }
  (vo.prototype.clear = Mh),
    (vo.prototype.delete = Fh),
    (vo.prototype.get = Li),
    (vo.prototype.has = bu),
    (vo.prototype.set = Su);
  function yo($) {
    var A = (this.__data__ = new Or($));
    this.size = A.size;
  }
  function jh() {
    (this.__data__ = new Or()), (this.size = 0);
  }
  function xu($) {
    var A = this.__data__,
      F = A.delete($);
    return (this.size = A.size), F;
  }
  function go($) {
    return this.__data__.get($);
  }
  function Dh($) {
    return this.__data__.has($);
  }
  function Nh($, A) {
    var F = this.__data__;
    if (F instanceof Or) {
      var te = F.__data__;
      if (!Dt || te.length < r - 1)
        return te.push([$, A]), (this.size = ++F.size), this;
      F = this.__data__ = new vo(te);
    }
    return F.set($, A), (this.size = F.size), this;
  }
  (yo.prototype.clear = jh),
    (yo.prototype.delete = xu),
    (yo.prototype.get = go),
    (yo.prototype.has = Dh),
    (yo.prototype.set = Nh);
  function $u($, A) {
    var F = Zi($),
      te = !F && Yi($),
      Pe = !F && !te && Ji($),
      De = !F && !te && !Pe && tc($),
      Ae = F || te || Pe || De,
      ke = Ae ? we($.length, String) : [],
      We = ke.length;
    for (var ar in $)
      (Ae &&
        (ar == "length" ||
          (Pe && (ar == "offset" || ar == "parent")) ||
          (De &&
            (ar == "buffer" || ar == "byteLength" || ar == "byteOffset")) ||
          Pu(ar, We))) ||
        ke.push(ar);
    return ke;
  }
  function Vi($, A, F) {
    ((F !== void 0 && !rs($[A], F)) || (F === void 0 && !(A in $))) &&
      zi($, A, F);
  }
  function Oh($, A, F) {
    var te = $[A];
    (!(Ze.call($, A) && rs(te, F)) || (F === void 0 && !(A in $))) &&
      zi($, A, F);
  }
  function Ja($, A) {
    for (var F = $.length; F--; ) if (rs($[F][0], A)) return F;
    return -1;
  }
  function zi($, A, F) {
    A == "__proto__" && fe
      ? fe($, A, { configurable: !0, enumerable: !0, value: F, writable: !0 })
      : ($[A] = F);
  }
  var wu = Ki();
  function es($) {
    return $ == null
      ? $ === void 0
        ? k
        : b
      : ie && ie in Object($)
      ? ts($)
      : ea($);
  }
  function Cu($) {
    return ta($) && es($) == i;
  }
  function Bh($) {
    if (!on($) || bo($)) return !1;
    var A = ec($) ? wr : re;
    return A.test(Zh($));
  }
  function Lh($) {
    return ta($) && _u($.length) && !!L[es($)];
  }
  function Vh($) {
    if (!on($)) return Au($);
    var A = Ru($),
      F = [];
    for (var te in $)
      (te == "constructor" && (A || !Ze.call($, te))) || F.push(te);
    return F;
  }
  function ku($, A, F, te, Pe) {
    $ !== A &&
      wu(
        A,
        function (De, Ae) {
          if ((Pe || (Pe = new yo()), on(De))) zh($, A, Ae, F, ku, te, Pe);
          else {
            var ke = te ? te(Xi($, Ae), De, Ae + "", $, A, Pe) : void 0;
            ke === void 0 && (ke = De), Vi($, Ae, ke);
          }
        },
        Iu
      );
  }
  function zh($, A, F, te, Pe, De, Ae) {
    var ke = Xi($, F),
      We = Xi(A, F),
      ar = Ae.get(We);
    if (ar) {
      Vi($, F, ar);
      return;
    }
    var Nt = De ? De(ke, We, F + "", $, A, Ae) : void 0,
      ra = Nt === void 0;
    if (ra) {
      var rc = Zi(We),
        nc = !rc && Ji(We),
        Fu = !rc && !nc && tc(We);
      (Nt = We),
        rc || nc || Fu
          ? Zi(ke)
            ? (Nt = ke)
            : Qh(ke)
            ? (Nt = Wi(ke))
            : nc
            ? ((ra = !1), (Nt = At(We)))
            : Fu
            ? ((ra = !1), (Nt = Hi(We)))
            : (Nt = [])
          : Jh(We) || Yi(We)
          ? ((Nt = ke),
            Yi(ke) ? (Nt = ep(ke)) : (!on(ke) || ec(ke)) && (Nt = Gh(We)))
          : (ra = !1);
    }
    ra && (Ae.set(We, Nt), Pe(Nt, We, te, De, Ae), Ae.delete(We)), Vi($, F, Nt);
  }
  function Hh($, A) {
    return Xh(qh($, A, Eu), $ + "");
  }
  var Wh = fe
    ? function ($, A) {
        return fe($, "toString", {
          configurable: !0,
          enumerable: !1,
          value: rp(A),
          writable: !0,
        });
      }
    : Eu;
  function At($, A) {
    return $.slice();
  }
  function Tu($) {
    var A = new $.constructor($.byteLength);
    return new q(A).set(new q($)), A;
  }
  function Hi($, A) {
    var F = Tu($.buffer);
    return new $.constructor(F, $.byteOffset, $.length);
  }
  function Wi($, A) {
    var F = -1,
      te = $.length;
    for (A || (A = Array(te)); ++F < te; ) A[F] = $[F];
    return A;
  }
  function Gi($, A, F, te) {
    var Pe = !F;
    F || (F = {});
    for (var De = -1, Ae = A.length; ++De < Ae; ) {
      var ke = A[De],
        We = void 0;
      We === void 0 && (We = $[ke]), Pe ? zi(F, ke, We) : Oh(F, ke, We);
    }
    return F;
  }
  function Ui($) {
    return Hh(function (A, F) {
      var te = -1,
        Pe = F.length,
        De = Pe > 1 ? F[Pe - 1] : void 0,
        Ae = Pe > 2 ? F[2] : void 0;
      for (
        De = $.length > 3 && typeof De == "function" ? (Pe--, De) : void 0,
          Ae && Uh(F[0], F[1], Ae) && ((De = Pe < 3 ? void 0 : De), (Pe = 1)),
          A = Object(A);
        ++te < Pe;

      ) {
        var ke = F[te];
        ke && $(A, ke, te, De);
      }
      return A;
    });
  }
  function Ki($) {
    return function (A, F, te) {
      for (var Pe = -1, De = Object(A), Ae = te(A), ke = Ae.length; ke--; ) {
        var We = Ae[++Pe];
        if (F(De[We], We, De) === !1) break;
      }
      return A;
    };
  }
  function Jo($, A) {
    var F = $.__data__;
    return Kh(A) ? F[typeof A == "string" ? "string" : "hash"] : F.map;
  }
  function qi($, A) {
    var F = ye($, A);
    return Bh(F) ? F : void 0;
  }
  function ts($) {
    var A = Ze.call($, ie),
      F = $[ie];
    try {
      $[ie] = void 0;
      var te = !0;
    } catch {}
    var Pe = nr.call($);
    return te && (A ? ($[ie] = F) : delete $[ie]), Pe;
  }
  function Gh($) {
    return typeof $.constructor == "function" && !Ru($) ? yu(oe($)) : {};
  }
  function Pu($, A) {
    var F = typeof $;
    return (
      (A = A ?? s),
      !!A &&
        (F == "number" || (F != "symbol" && ue.test($))) &&
        $ > -1 &&
        $ % 1 == 0 &&
        $ < A
    );
  }
  function Uh($, A, F) {
    if (!on(F)) return !1;
    var te = typeof A;
    return (
      te == "number" ? Qi(F) && Pu(A, F.length) : te == "string" && A in F
    )
      ? rs(F[A], $)
      : !1;
  }
  function Kh($) {
    var A = typeof $;
    return A == "string" || A == "number" || A == "symbol" || A == "boolean"
      ? $ !== "__proto__"
      : $ === null;
  }
  function bo($) {
    return !!wt && wt in $;
  }
  function Ru($) {
    var A = $ && $.constructor,
      F = (typeof A == "function" && A.prototype) || Te;
    return $ === F;
  }
  function Au($) {
    var A = [];
    if ($ != null) for (var F in Object($)) A.push(F);
    return A;
  }
  function ea($) {
    return nr.call($);
  }
  function qh($, A, F) {
    return (
      (A = Ie(A === void 0 ? $.length - 1 : A, 0)),
      function () {
        for (
          var te = arguments,
            Pe = -1,
            De = Ie(te.length - A, 0),
            Ae = Array(De);
          ++Pe < De;

        )
          Ae[Pe] = te[A + Pe];
        Pe = -1;
        for (var ke = Array(A + 1); ++Pe < A; ) ke[Pe] = te[Pe];
        return (ke[A] = F(Ae)), ne($, this, ke);
      }
    );
  }
  function Xi($, A) {
    if (!(A === "constructor" && typeof $[A] == "function") && A != "__proto__")
      return $[A];
  }
  var Xh = Yh(Wh);
  function Yh($) {
    var A = 0,
      F = 0;
    return function () {
      var te = Rt(),
        Pe = a - (te - F);
      if (((F = te), Pe > 0)) {
        if (++A >= o) return arguments[0];
      } else A = 0;
      return $.apply(void 0, arguments);
    };
  }
  function Zh($) {
    if ($ != null) {
      try {
        return Ue.call($);
      } catch {}
      try {
        return $ + "";
      } catch {}
    }
    return "";
  }
  function rs($, A) {
    return $ === A || ($ !== $ && A !== A);
  }
  var Yi = Cu(
      (function () {
        return arguments;
      })()
    )
      ? Cu
      : function ($) {
          return ta($) && Ze.call($, "callee") && !jt.call($, "callee");
        },
    Zi = Array.isArray;
  function Qi($) {
    return $ != null && _u($.length) && !ec($);
  }
  function Qh($) {
    return ta($) && Qi($);
  }
  var Ji = _e || Mu;
  function ec($) {
    if (!on($)) return !1;
    var A = es($);
    return A == m || A == h || A == l || A == S;
  }
  function _u($) {
    return typeof $ == "number" && $ > -1 && $ % 1 == 0 && $ <= s;
  }
  function on($) {
    var A = typeof $;
    return $ != null && (A == "object" || A == "function");
  }
  function ta($) {
    return $ != null && typeof $ == "object";
  }
  function Jh($) {
    if (!ta($) || es($) != y) return !1;
    var A = oe($);
    if (A === null) return !0;
    var F = Ze.call(A, "constructor") && A.constructor;
    return typeof F == "function" && F instanceof F && Ue.call(F) == or;
  }
  var tc = J ? ae(J) : Lh;
  function ep($) {
    return Gi($, Iu($));
  }
  function Iu($) {
    return Qi($) ? $u($) : Vh($);
  }
  var tp = Ui(function ($, A, F, te) {
    ku($, A, F, te);
  });
  function rp($) {
    return function () {
      return $;
    };
  }
  function Eu($) {
    return $;
  }
  function Mu() {
    return !1;
  }
  e.exports = tp;
})(sf, sf.exports);
var b4 = sf.exports,
  S4 = dg,
  x4 = BP,
  $4 = zP,
  mR = pg,
  $g = Ef,
  hR = yg,
  w4 = UP,
  C4 = KP,
  k4 = qP,
  T4 = gg,
  P4 = XP,
  R4 = hg,
  Na = Oo,
  pR = xg,
  A4 = eR,
  Mt = lt,
  Oa = Qr,
  wg = yi,
  _4 = tR,
  bi = ja,
  I4 = oR,
  Df = gi,
  E4 = aR,
  Si = Da,
  M4 = sR,
  F4 = iR,
  j4 = lR,
  D4 = uR,
  xi = Bo,
  N4 = dR,
  O4 = fR,
  B4 = b4;
x.addDomEvent = S4.addDomEvent;
x.addPointerEvent = x4.addPointerEvent;
x.assignAfter = $4.assignAfter;
x.ariaAttr = mR.ariaAttr;
x.dataAttr = mR.dataAttr;
x.analyzeBreakpoints = $g.analyzeBreakpoints;
x.px = $g.px;
x.toMediaQueryString = $g.toMediaQueryString;
x.callAll = hR.callAll;
x.callAllHandlers = hR.callAllHandlers;
x.getValidChildren = w4.getValidChildren;
x.compact = C4.compact;
x.contains = k4.contains;
x.createContext = T4.createContext;
x.cx = P4.cx;
x.getEventPoint = R4.getEventPoint;
x.getAllFocusable = Na.getAllFocusable;
x.getAllTabbable = Na.getAllTabbable;
x.getFirstFocusable = Na.getFirstFocusable;
x.getFirstTabbableIn = Na.getFirstTabbableIn;
x.getLastTabbableIn = Na.getLastTabbableIn;
x.getNextTabbable = Na.getNextTabbable;
x.getPreviousTabbable = Na.getPreviousTabbable;
x.get = pR.get;
x.memoizedGet = pR.memoizedGet;
x.interopDefault = A4.interopDefault;
x.isArray = Mt.isArray;
x.isCssVar = Mt.isCssVar;
x.isDefined = Mt.isDefined;
x.isEmpty = Mt.isEmpty;
x.isEmptyArray = Mt.isEmptyArray;
x.isEmptyObject = Mt.isEmptyObject;
x.isFunction = Mt.isFunction;
x.isInputEvent = Mt.isInputEvent;
x.isNotNumber = Mt.isNotNumber;
x.isNull = Mt.isNull;
x.isNumber = Mt.isNumber;
x.isNumeric = Mt.isNumeric;
x.isObject = Mt.isObject;
x.isRefObject = Mt.isRefObject;
x.isString = Mt.isString;
x.isUndefined = Mt.isUndefined;
x.isActiveElement = Oa.isActiveElement;
x.isBrowser = Oa.isBrowser;
x.isContentEditableElement = Oa.isContentEditableElement;
x.isDisabledElement = Oa.isDisabledElement;
x.isHTMLElement = Oa.isHTMLElement;
x.isHiddenElement = Oa.isHiddenElement;
x.isInputElement = Oa.isInputElement;
x.isMouseEvent = wg.isMouseEvent;
x.isMultiTouchEvent = wg.isMultiTouchEvent;
x.isTouchEvent = wg.isTouchEvent;
x.lazyDisclosure = _4.lazyDisclosure;
x.clampValue = bi.clampValue;
x.countDecimalPlaces = bi.countDecimalPlaces;
x.percentToValue = bi.percentToValue;
x.roundValueToStep = bi.roundValueToStep;
x.toPrecision = bi.toPrecision;
x.valueToPercent = bi.valueToPercent;
x.omit = I4.omit;
x.getActiveElement = Df.getActiveElement;
x.getEventWindow = Df.getEventWindow;
x.getOwnerDocument = Df.getOwnerDocument;
x.getOwnerWindow = Df.getOwnerWindow;
x.pick = E4.pick;
x.arrayToObjectNotation = Si.arrayToObjectNotation;
x.breakpoints = Si.breakpoints;
x.isCustomBreakpoint = Si.isCustomBreakpoint;
x.isResponsiveObjectLike = Si.isResponsiveObjectLike;
x.mapResponsive = Si.mapResponsive;
x.objectToArrayNotation = Si.objectToArrayNotation;
x.runIfFn = M4.runIfFn;
x.getScrollParent = F4.getScrollParent;
x.split = j4.split;
x.splitProps = D4.splitProps;
x.hasDisplayNone = xi.hasDisplayNone;
x.hasFocusWithin = xi.hasFocusWithin;
x.hasNegativeTabIndex = xi.hasNegativeTabIndex;
x.hasTabIndex = xi.hasTabIndex;
x.isFocusable = xi.isFocusable;
x.isTabbable = xi.isTabbable;
x.walkObject = N4.walkObject;
x.warn = O4.warn;
x.mergeWith = B4;
var Sl = {},
  ro = {},
  sp = g;
function L4(e, t = []) {
  const r = sp.useRef(e);
  return (
    sp.useEffect(() => {
      r.current = e;
    }),
    sp.useCallback((...n) => {
      var o;
      return (o = r.current) == null ? void 0 : o.call(r, ...n);
    }, t)
  );
}
ro.useCallbackRef = L4;
var V4 = g,
  z4 = ro;
function H4(e, t, r, n) {
  const o = z4.useCallbackRef(r);
  return (
    V4.useEffect(() => {
      const a = typeof e == "function" ? e() : e ?? document;
      if (!(!r || !a))
        return (
          a.addEventListener(t, o, n),
          () => {
            a.removeEventListener(t, o, n);
          }
        );
    }, [t, e, n, o, r]),
    () => {
      const a = typeof e == "function" ? e() : e ?? document;
      a == null || a.removeEventListener(t, o, n);
    }
  );
}
Sl.useEventListener = H4;
var W4 = x,
  ip = g,
  G4 = Sl;
function U4(e) {
  const { isOpen: t, ref: r } = e,
    [n, o] = ip.useState(t),
    [a, s] = ip.useState(!1);
  return (
    ip.useEffect(() => {
      a || (o(t), s(!0));
    }, [t, a, n]),
    G4.useEventListener(
      () => r.current,
      "animationend",
      () => {
        o(t);
      }
    ),
    {
      present: !(t ? !1 : !n),
      onComplete() {
        var u;
        const c = W4.getOwnerWindow(r.current),
          l = new c.CustomEvent("animationend", { bubbles: !0 });
        (u = r.current) == null || u.dispatchEvent(l);
      },
    }
  );
}
OP.useAnimationState = U4;
var vR = {},
  $$ = g;
function K4(e = !1) {
  const [t, r] = $$.useState(e),
    n = $$.useMemo(
      () => ({ on: () => r(!0), off: () => r(!1), toggle: () => r((o) => !o) }),
      []
    );
  return [t, n];
}
vR.useBoolean = K4;
var yR = {},
  q4 = function () {
    var e = document.getSelection();
    if (!e.rangeCount) return function () {};
    for (var t = document.activeElement, r = [], n = 0; n < e.rangeCount; n++)
      r.push(e.getRangeAt(n));
    switch (t.tagName.toUpperCase()) {
      case "INPUT":
      case "TEXTAREA":
        t.blur();
        break;
      default:
        t = null;
        break;
    }
    return (
      e.removeAllRanges(),
      function () {
        e.type === "Caret" && e.removeAllRanges(),
          e.rangeCount ||
            r.forEach(function (o) {
              e.addRange(o);
            }),
          t && t.focus();
      }
    );
  },
  X4 = q4,
  w$ = { "text/plain": "Text", "text/html": "Url", default: "Text" },
  Y4 = "Copy to clipboard: #{key}, Enter";
function Z4(e) {
  var t = (/mac os x/i.test(navigator.userAgent) ? "⌘" : "Ctrl") + "+C";
  return e.replace(/#{\s*key\s*}/g, t);
}
function Q4(e, t) {
  var r,
    n,
    o,
    a,
    s,
    i,
    c = !1;
  t || (t = {}), (r = t.debug || !1);
  try {
    (o = X4()),
      (a = document.createRange()),
      (s = document.getSelection()),
      (i = document.createElement("span")),
      (i.textContent = e),
      (i.ariaHidden = "true"),
      (i.style.all = "unset"),
      (i.style.position = "fixed"),
      (i.style.top = 0),
      (i.style.clip = "rect(0, 0, 0, 0)"),
      (i.style.whiteSpace = "pre"),
      (i.style.webkitUserSelect = "text"),
      (i.style.MozUserSelect = "text"),
      (i.style.msUserSelect = "text"),
      (i.style.userSelect = "text"),
      i.addEventListener("copy", function (u) {
        if ((u.stopPropagation(), t.format))
          if ((u.preventDefault(), typeof u.clipboardData > "u")) {
            r && console.warn("unable to use e.clipboardData"),
              r && console.warn("trying IE specific stuff"),
              window.clipboardData.clearData();
            var d = w$[t.format] || w$.default;
            window.clipboardData.setData(d, e);
          } else
            u.clipboardData.clearData(), u.clipboardData.setData(t.format, e);
        t.onCopy && (u.preventDefault(), t.onCopy(u.clipboardData));
      }),
      document.body.appendChild(i),
      a.selectNodeContents(i),
      s.addRange(a);
    var l = document.execCommand("copy");
    if (!l) throw new Error("copy command was unsuccessful");
    c = !0;
  } catch (u) {
    r && console.error("unable to copy using execCommand: ", u),
      r && console.warn("trying IE specific stuff");
    try {
      window.clipboardData.setData(t.format || "text", e),
        t.onCopy && t.onCopy(window.clipboardData),
        (c = !0);
    } catch (d) {
      r && console.error("unable to copy using clipboardData: ", d),
        r && console.error("falling back to prompt"),
        (n = Z4("message" in t ? t.message : Y4)),
        window.prompt(n, e);
    }
  } finally {
    s &&
      (typeof s.removeRange == "function"
        ? s.removeRange(a)
        : s.removeAllRanges()),
      i && document.body.removeChild(i),
      o();
  }
  return c;
}
var gR = Q4;
const JPe = jP(gR);
var oc = g,
  C$ = gR;
function J4(e, t = {}) {
  const [r, n] = oc.useState(!1),
    [o, a] = oc.useState(e);
  oc.useEffect(() => a(e), [e]);
  const { timeout: s = 1500, ...i } = typeof t == "number" ? { timeout: t } : t,
    c = oc.useCallback(
      (l) => {
        const u = typeof l == "string" ? l : o;
        "clipboard" in navigator
          ? navigator.clipboard
              .writeText(u)
              .then(() => n(!0))
              .catch(() => n(C$(u, i)))
          : n(C$(u, i));
      },
      [o, i]
    );
  return (
    oc.useEffect(() => {
      let l = null;
      return (
        r &&
          (l = window.setTimeout(() => {
            n(!1);
          }, s)),
        () => {
          l && window.clearTimeout(l);
        }
      );
    }, [s, r]),
    { value: o, setValue: a, onCopy: c, hasCopied: r }
  );
}
yR.useClipboard = J4;
var bR = {},
  eH = g;
function tH(e) {
  const t = eH.useRef(null);
  return (
    t.current === null && (t.current = typeof e == "function" ? e() : e),
    t.current
  );
}
bR.useConst = tH;
var Cg = {},
  SR = g,
  cp = ro;
function rH(e, t) {
  const r = typeof e < "u",
    n = r ? e : t;
  return SR.useMemo(() => [r, n], [r, n]);
}
function nH(e) {
  const {
      value: t,
      defaultValue: r,
      onChange: n,
      shouldUpdate: o = (f, m) => f !== m,
    } = e,
    a = cp.useCallbackRef(n),
    s = cp.useCallbackRef(o),
    [i, c] = SR.useState(r),
    l = t !== void 0,
    u = l ? t : i,
    d = cp.useCallbackRef(
      (f) => {
        const h = typeof f == "function" ? f(u) : f;
        s(u, h) && (l || c(h), a(h));
      },
      [l, a, u, s]
    );
  return [u, d];
}
Cg.useControllableProp = rH;
Cg.useControllableState = nH;
var xR = {},
  Qc = x,
  na = g,
  oH = ro;
function aH(e = {}) {
  const {
      onChange: t,
      precision: r,
      defaultValue: n,
      value: o,
      step: a = 1,
      min: s = Number.MIN_SAFE_INTEGER,
      max: i = Number.MAX_SAFE_INTEGER,
      keepWithinRange: c = !0,
    } = e,
    l = oH.useCallbackRef(t),
    [u, d] = na.useState(() => (n == null ? "" : lp(n, a, r) ?? "")),
    f = typeof o < "u",
    m = f ? o : u,
    h = $R(Co(m), a),
    p = r ?? h,
    v = na.useCallback(
      (_) => {
        _ !== m && (f || d(_.toString()), l == null || l(_.toString(), Co(_)));
      },
      [l, f, m]
    ),
    b = na.useCallback(
      (_) => {
        let N = _;
        return c && (N = Qc.clampValue(N, s, i)), Qc.toPrecision(N, p);
      },
      [p, c, i, s]
    ),
    y = na.useCallback(
      (_ = a) => {
        let N;
        m === "" ? (N = Co(_)) : (N = Co(m) + _), (N = b(N)), v(N);
      },
      [b, a, v, m]
    ),
    S = na.useCallback(
      (_ = a) => {
        let N;
        m === "" ? (N = Co(-_)) : (N = Co(m) - _), (N = b(N)), v(N);
      },
      [b, a, v, m]
    ),
    w = na.useCallback(() => {
      let _;
      n == null ? (_ = "") : (_ = lp(n, a, r) ?? s), v(_);
    }, [n, r, a, v, s]),
    C = na.useCallback(
      (_) => {
        const N = lp(_, a, p) ?? s;
        v(N);
      },
      [p, a, v, s]
    ),
    T = Co(m);
  return {
    isOutOfRange: T > i || T < s,
    isAtMax: T === i,
    isAtMin: T === s,
    precision: p,
    value: m,
    valueAsNumber: T,
    update: v,
    reset: w,
    increment: y,
    decrement: S,
    clamp: b,
    cast: C,
    setValue: d,
  };
}
function Co(e) {
  return parseFloat(e.toString().replace(/[^\w.-]+/g, ""));
}
function $R(e, t) {
  return Math.max(Qc.countDecimalPlaces(t), Qc.countDecimalPlaces(e));
}
function lp(e, t, r) {
  const n = Co(e);
  if (Number.isNaN(n)) return;
  const o = $R(n, t);
  return Qc.toPrecision(n, r ?? o);
}
xR.useCounter = aH;
var wR = {},
  k$ = ro,
  ac = g;
function sH(e = {}) {
  const { onClose: t, onOpen: r, isOpen: n, id: o } = e,
    a = k$.useCallbackRef(r),
    s = k$.useCallbackRef(t),
    [i, c] = ac.useState(e.defaultIsOpen || !1),
    l = n !== void 0 ? n : i,
    u = n !== void 0,
    d = ac.useId(),
    f = o ?? `disclosure-${d}`,
    m = ac.useCallback(() => {
      u || c(!1), s == null || s();
    }, [u, s]),
    h = ac.useCallback(() => {
      u || c(!0), a == null || a();
    }, [u, a]),
    p = ac.useCallback(() => {
      l ? m() : h();
    }, [l, h, m]);
  function v(y = {}) {
    return {
      ...y,
      "aria-expanded": l,
      "aria-controls": f,
      onClick(S) {
        var w;
        (w = y.onClick) == null || w.call(y, S), p();
      },
    };
  }
  function b(y = {}) {
    return { ...y, hidden: !l, id: f };
  }
  return {
    isOpen: l,
    onOpen: h,
    onClose: m,
    onToggle: p,
    isControlled: u,
    getButtonProps: v,
    getDisclosureProps: b,
  };
}
wR.useDisclosure = sH;
var kg = {},
  Tg = {},
  T$ = g;
const iH =
  globalThis != null && globalThis.document ? T$.useLayoutEffect : T$.useEffect;
Tg.useSafeLayoutEffect = iH;
var Pg = {},
  Du = g;
const cH = (e, t) => {
  const r = Du.useRef(!1),
    n = Du.useRef(!1);
  Du.useEffect(() => {
    if (r.current && n.current) return e();
    n.current = !0;
  }, t),
    Du.useEffect(
      () => (
        (r.current = !0),
        () => {
          r.current = !1;
        }
      ),
      []
    );
};
Pg.useUpdateEffect = cH;
var Zv = x,
  up = g,
  lH = Sl,
  uH = Tg,
  CR = Pg;
function dH(e) {
  const t = e.current;
  if (!t) return !1;
  const r = Zv.getActiveElement(t);
  return !r || t.contains(r) ? !1 : !!Zv.isTabbable(r);
}
function fH(e, t) {
  const { shouldFocus: r, visible: n, focusRef: o } = t,
    a = r && !n;
  CR.useUpdateEffect(() => {
    if (!a || dH(e)) return;
    const s = (o == null ? void 0 : o.current) || e.current;
    let i;
    if (s)
      return (
        (i = requestAnimationFrame(() => {
          s.focus({ preventScroll: !0 });
        })),
        () => {
          cancelAnimationFrame(i);
        }
      );
  }, [a, e, o]);
}
const mH = { preventScroll: !0, shouldFocus: !1 };
function hH(e, t = mH) {
  const { focusRef: r, preventScroll: n, shouldFocus: o, visible: a } = t,
    s = pH(e) ? e.current : e,
    i = o && a,
    c = up.useRef(i),
    l = up.useRef(a);
  uH.useSafeLayoutEffect(() => {
    !l.current && a && (c.current = i), (l.current = a);
  }, [a, i]);
  const u = up.useCallback(() => {
    if (
      !(!a || !s || !c.current) &&
      ((c.current = !1), !s.contains(document.activeElement))
    )
      if (r != null && r.current)
        requestAnimationFrame(() => {
          var d;
          (d = r.current) == null || d.focus({ preventScroll: n });
        });
      else {
        const d = Zv.getAllFocusable(s);
        d.length > 0 &&
          requestAnimationFrame(() => {
            d[0].focus({ preventScroll: n });
          });
      }
  }, [a, n, s, r]);
  CR.useUpdateEffect(() => {
    u();
  }, [u]),
    lH.useEventListener(s, "transitionend", u);
}
function pH(e) {
  return "current" in e;
}
kg.useFocusOnHide = fH;
kg.useFocusOnShow = hH;
var kR = {},
  vH = Sl;
function yH(e) {
  return "current" in e;
}
const TR = () => typeof window < "u";
function gH() {
  const e = navigator.userAgentData;
  return (e == null ? void 0 : e.platform) ?? navigator.platform;
}
const bH = (e) => TR() && e.test(navigator.vendor),
  SH = (e) => TR() && e.test(gH()),
  xH = () => SH(/mac|iphone|ipad|ipod/i),
  $H = () => xH() && bH(/apple/i);
function wH(e) {
  const { ref: t, elements: r, enabled: n } = e,
    o = () => {
      var a;
      return ((a = t.current) == null ? void 0 : a.ownerDocument) ?? document;
    };
  vH.useEventListener(o, "pointerdown", (a) => {
    var l, u;
    if (!$H() || !n) return;
    const s =
        ((u = (l = a.composedPath) == null ? void 0 : l.call(a)) == null
          ? void 0
          : u[0]) ?? a.target,
      c = (r ?? [t]).some((d) => {
        const f = yH(d) ? d.current : d;
        return (f == null ? void 0 : f.contains(s)) || f === s;
      });
    o().activeElement !== s && c && (a.preventDefault(), s.focus());
  });
}
kR.useFocusOnPointerDown = wH;
var Nf = {},
  Jc = g;
function PR(e, t) {
  const r = Jc.useId();
  return Jc.useMemo(() => e || [t, r].filter(Boolean).join("-"), [e, t, r]);
}
function CH(e, ...t) {
  const r = PR(e);
  return Jc.useMemo(() => t.map((n) => `${n}-${r}`), [r, t]);
}
function kH(e) {
  const [t, r] = Jc.useState(null);
  return {
    ref: Jc.useCallback(
      (o) => {
        r(o ? e : null);
      },
      [e]
    ),
    id: t,
    isRendered: !!t,
  };
}
Nf.useId = PR;
Nf.useIds = CH;
Nf.useOptionalPart = kH;
var RR = {},
  TH = g,
  PH = ro;
function RH(e, t) {
  const r = PH.useCallbackRef(e);
  TH.useEffect(() => {
    let n = null;
    const o = () => r();
    return (
      t !== null && (n = window.setInterval(o, t)),
      () => {
        n && window.clearInterval(n);
      }
    );
  }, [t, r]);
}
RR.useInterval = RH;
var Rg = {},
  AH = g;
function _H(e) {
  const t = AH.useRef(null);
  return (t.current = e), t;
}
Rg.useLatestRef = _H;
var Of = {},
  IH = g;
function AR(e, t) {
  if (e != null) {
    if (typeof e == "function") {
      e(t);
      return;
    }
    try {
      e.current = t;
    } catch {
      throw new Error(`Cannot assign value '${t}' to ref '${e}'`);
    }
  }
}
function _R(...e) {
  return (t) => {
    e.forEach((r) => {
      AR(r, t);
    });
  };
}
function EH(...e) {
  return IH.useMemo(() => _R(...e), e);
}
Of.assignRef = AR;
Of.mergeRefs = _R;
Of.useMergeRefs = EH;
var IR = {},
  P$ = g,
  MH = ro;
function FH(e) {
  const { ref: t, handler: r, enabled: n = !0 } = e,
    o = MH.useCallbackRef(r),
    s = P$.useRef({ isPointerDown: !1, ignoreEmulatedMouseEvents: !1 }).current;
  P$.useEffect(() => {
    if (!n) return;
    const i = (d) => {
        dp(d, t) && (s.isPointerDown = !0);
      },
      c = (d) => {
        if (s.ignoreEmulatedMouseEvents) {
          s.ignoreEmulatedMouseEvents = !1;
          return;
        }
        s.isPointerDown && r && dp(d, t) && ((s.isPointerDown = !1), o(d));
      },
      l = (d) => {
        (s.ignoreEmulatedMouseEvents = !0),
          r && s.isPointerDown && dp(d, t) && ((s.isPointerDown = !1), o(d));
      },
      u = ER(t.current);
    return (
      u.addEventListener("mousedown", i, !0),
      u.addEventListener("mouseup", c, !0),
      u.addEventListener("touchstart", i, !0),
      u.addEventListener("touchend", l, !0),
      () => {
        u.removeEventListener("mousedown", i, !0),
          u.removeEventListener("mouseup", c, !0),
          u.removeEventListener("touchstart", i, !0),
          u.removeEventListener("touchend", l, !0);
      }
    );
  }, [r, t, o, s, n]);
}
function dp(e, t) {
  var n, o;
  const r = ((n = e.composedPath) == null ? void 0 : n.call(e)[0]) ?? e.target;
  return r && !ER(r).contains(r)
    ? !1
    : !((o = t.current) != null && o.contains(r));
}
function ER(e) {
  return (e == null ? void 0 : e.ownerDocument) ?? document;
}
IR.useOutsideClick = FH;
var MR = {},
  R$ = g;
function jH(e) {
  const t = R$.useRef(void 0);
  return (
    R$.useEffect(() => {
      t.current = e;
    }, [e]),
    t.current
  );
}
MR.usePrevious = jH;
var Ag = {},
  _g = Object.defineProperty,
  DH = Object.getOwnPropertyDescriptor,
  NH = Object.getOwnPropertyNames,
  OH = Object.prototype.hasOwnProperty,
  BH = (e, t) => {
    for (var r in t) _g(e, r, { get: t[r], enumerable: !0 });
  },
  LH = (e, t, r, n) => {
    if ((t && typeof t == "object") || typeof t == "function")
      for (let o of NH(t))
        !OH.call(e, o) &&
          o !== r &&
          _g(e, o, {
            get: () => t[o],
            enumerable: !(n = DH(t, o)) || n.enumerable,
          });
    return e;
  },
  VH = (e) => LH(_g({}, "__esModule", { value: !0 }), e),
  FR = {};
BH(FR, { trackElementSize: () => jR, trackElementsSize: () => HH });
var zH = VH(FR);
function jR(e, t) {
  if (!e) {
    t(void 0);
    return;
  }
  t({ width: e.offsetWidth, height: e.offsetHeight });
  const r = e.ownerDocument.defaultView ?? window,
    n = new r.ResizeObserver((o) => {
      if (!Array.isArray(o) || !o.length) return;
      const [a] = o;
      let s, i;
      if ("borderBoxSize" in a) {
        const c = a.borderBoxSize,
          l = Array.isArray(c) ? c[0] : c;
        (s = l.inlineSize), (i = l.blockSize);
      } else (s = e.offsetWidth), (i = e.offsetHeight);
      t({ width: s, height: i });
    });
  return n.observe(e, { box: "border-box" }), () => n.unobserve(e);
}
function HH(e) {
  const { getNodes: t, observeMutation: r = !0, callback: n } = e,
    o = [];
  let a = null;
  function s() {
    const i = t();
    a = i[0];
    const c = i.map((l, u) =>
      jR(l, (d) => {
        n(d, u);
      })
    );
    o.push(...c);
  }
  if ((s(), r)) {
    const i = WH(a, s);
    o.push(i);
  }
  return () => {
    o.forEach((i) => {
      i == null || i();
    });
  };
}
function WH(e, t) {
  var o;
  if (!e || !e.parentElement) return;
  const r = ((o = e.ownerDocument) == null ? void 0 : o.defaultView) ?? window,
    n = new r.MutationObserver(() => {
      t();
    });
  return (
    n.observe(e.parentElement, { childList: !0 }),
    () => {
      n.disconnect();
    }
  );
}
var GH = zH,
  cf = g;
const UH =
  globalThis != null && globalThis.document ? cf.useLayoutEffect : cf.useEffect;
function KH(e, t) {
  var o;
  if (!e || !e.parentElement) return;
  const r = ((o = e.ownerDocument) == null ? void 0 : o.defaultView) ?? window,
    n = new r.MutationObserver(() => {
      t();
    });
  return (
    n.observe(e.parentElement, { childList: !0 }),
    () => {
      n.disconnect();
    }
  );
}
function DR(e) {
  const {
      getNodes: t,
      observeMutation: r = !0,
      enabled: n = !0,
      fallback: o = [],
    } = e,
    [a, s] = cf.useState(o),
    [i, c] = cf.useState(0);
  return (
    UH(() => {
      if (!n) return;
      const l = t(),
        u = l.map((d, f) =>
          GH.trackElementSize(d, (m) => {
            s((h) => [...h.slice(0, f), m, ...h.slice(f + 1)]);
          })
        );
      if (r) {
        const d = l[0];
        u.push(
          KH(d, () => {
            c((f) => f + 1);
          })
        );
      }
      return () => {
        u.forEach((d) => {
          d == null || d();
        });
      };
    }, [i, n]),
    a
  );
}
function qH(e) {
  return typeof e == "object" && e !== null && "current" in e;
}
function XH(e, t) {
  const { observeMutation: r = !1, enabled: n, fallback: o } = t ?? {},
    [a] = DR({
      observeMutation: r,
      enabled: n,
      fallback: o ? [o] : void 0,
      getNodes() {
        return [qH(e) ? e.current : e];
      },
    });
  return a;
}
Ag.useSize = XH;
Ag.useSizes = DR;
var NR = {},
  YH = g,
  ZH = ro;
function QH(e, t) {
  const r = ZH.useCallbackRef(e);
  YH.useEffect(() => {
    if (t == null) return;
    let n = null;
    return (
      (n = window.setTimeout(() => {
        r();
      }, t)),
      () => {
        n && window.clearTimeout(n);
      }
    );
  }, [t, r]);
}
NR.useTimeout = QH;
var OR = {},
  Ig = {},
  $i = {};
Object.defineProperty($i, "__esModule", { value: !0 });
const BR = (1 / 60) * 1e3,
  JH = typeof performance < "u" ? () => performance.now() : () => Date.now(),
  LR =
    typeof window < "u"
      ? (e) => window.requestAnimationFrame(e)
      : (e) => setTimeout(() => e(JH()), BR);
function e6(e) {
  let t = [],
    r = [],
    n = 0,
    o = !1,
    a = !1;
  const s = new WeakSet(),
    i = {
      schedule: (c, l = !1, u = !1) => {
        const d = u && o,
          f = d ? t : r;
        return (
          l && s.add(c),
          f.indexOf(c) === -1 && (f.push(c), d && o && (n = t.length)),
          c
        );
      },
      cancel: (c) => {
        const l = r.indexOf(c);
        l !== -1 && r.splice(l, 1), s.delete(c);
      },
      process: (c) => {
        if (o) {
          a = !0;
          return;
        }
        if (((o = !0), ([t, r] = [r, t]), (r.length = 0), (n = t.length), n))
          for (let l = 0; l < n; l++) {
            const u = t[l];
            u(c), s.has(u) && (i.schedule(u), e());
          }
        (o = !1), a && ((a = !1), i.process(c));
      },
    };
  return i;
}
const t6 = 40;
let Qv = !0,
  el = !1,
  Jv = !1;
const Hs = { delta: 0, timestamp: 0 },
  xl = ["read", "update", "preRender", "render", "postRender"],
  Bf = xl.reduce((e, t) => ((e[t] = e6(() => (el = !0))), e), {}),
  r6 = xl.reduce((e, t) => {
    const r = Bf[t];
    return (e[t] = (n, o = !1, a = !1) => (el || s6(), r.schedule(n, o, a))), e;
  }, {}),
  n6 = xl.reduce((e, t) => ((e[t] = Bf[t].cancel), e), {}),
  o6 = xl.reduce((e, t) => ((e[t] = () => Bf[t].process(Hs)), e), {}),
  a6 = (e) => Bf[e].process(Hs),
  VR = (e) => {
    (el = !1),
      (Hs.delta = Qv ? BR : Math.max(Math.min(e - Hs.timestamp, t6), 1)),
      (Hs.timestamp = e),
      (Jv = !0),
      xl.forEach(a6),
      (Jv = !1),
      el && ((Qv = !1), LR(VR));
  },
  s6 = () => {
    (el = !0), (Qv = !0), Jv || LR(VR);
  },
  i6 = () => Hs;
$i.cancelSync = n6;
$i.default = r6;
$i.flushSync = o6;
$i.getFrameData = i6;
var sc = x,
  Nu = $i,
  c6 = Object.defineProperty,
  l6 = (e, t, r) =>
    t in e
      ? c6(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r })
      : (e[t] = r),
  Br = (e, t, r) => (l6(e, typeof t != "symbol" ? t + "" : t, r), r);
class u6 {
  constructor(t, r, n) {
    if (
      (Br(this, "history", []),
      Br(this, "startEvent", null),
      Br(this, "lastEvent", null),
      Br(this, "lastEventInfo", null),
      Br(this, "handlers", {}),
      Br(this, "removeListeners", () => {}),
      Br(this, "threshold", 3),
      Br(this, "win"),
      Br(this, "updatePoint", () => {
        if (!(this.lastEvent && this.lastEventInfo)) return;
        const i = fp(this.lastEventInfo, this.history),
          c = this.startEvent !== null,
          l = zR(i.offset, { x: 0, y: 0 }) >= this.threshold;
        if (!c && !l) return;
        const { timestamp: u } = Nu.getFrameData();
        this.history.push({ ...i.point, timestamp: u });
        const { onStart: d, onMove: f } = this.handlers;
        c ||
          (d == null || d(this.lastEvent, i),
          (this.startEvent = this.lastEvent)),
          f == null || f(this.lastEvent, i);
      }),
      Br(this, "onPointerMove", (i, c) => {
        (this.lastEvent = i),
          (this.lastEventInfo = c),
          Nu.update(this.updatePoint, !0);
      }),
      Br(this, "onPointerUp", (i, c) => {
        const l = fp(c, this.history),
          { onEnd: u, onSessionEnd: d } = this.handlers;
        d == null || d(i, l),
          this.end(),
          !(!u || !this.startEvent) && (u == null || u(i, l));
      }),
      (this.win = t.view ?? window),
      sc.isMultiTouchEvent(t))
    )
      return;
    (this.handlers = r),
      n && (this.threshold = n),
      t.stopPropagation(),
      t.preventDefault();
    const o = { point: sc.getEventPoint(t) },
      { timestamp: a } = Nu.getFrameData();
    this.history = [{ ...o.point, timestamp: a }];
    const { onSessionStart: s } = r;
    s == null || s(t, fp(o, this.history)),
      (this.removeListeners = m6(
        sc.addPointerEvent(this.win, "pointermove", this.onPointerMove),
        sc.addPointerEvent(this.win, "pointerup", this.onPointerUp),
        sc.addPointerEvent(this.win, "pointercancel", this.onPointerUp)
      ));
  }
  updateHandlers(t) {
    this.handlers = t;
  }
  end() {
    var t;
    (t = this.removeListeners) == null || t.call(this),
      Nu.cancelSync.update(this.updatePoint);
  }
}
function A$(e, t) {
  return { x: e.x - t.x, y: e.y - t.y };
}
function fp(e, t) {
  return {
    point: e.point,
    delta: A$(e.point, t[t.length - 1]),
    offset: A$(e.point, t[0]),
    velocity: f6(t, 0.1),
  };
}
const d6 = (e) => e * 1e3;
function f6(e, t) {
  if (e.length < 2) return { x: 0, y: 0 };
  let r = e.length - 1,
    n = null;
  const o = e[e.length - 1];
  for (; r >= 0 && ((n = e[r]), !(o.timestamp - n.timestamp > d6(t))); ) r--;
  if (!n) return { x: 0, y: 0 };
  const a = (o.timestamp - n.timestamp) / 1e3;
  if (a === 0) return { x: 0, y: 0 };
  const s = { x: (o.x - n.x) / a, y: (o.y - n.y) / a };
  return s.x === 1 / 0 && (s.x = 0), s.y === 1 / 0 && (s.y = 0), s;
}
function m6(...e) {
  return (t) => e.reduce((r, n) => n(r), t);
}
function mp(e, t) {
  return Math.abs(e - t);
}
function _$(e) {
  return "x" in e && "y" in e;
}
function zR(e, t) {
  if (typeof e == "number" && typeof t == "number") return mp(e, t);
  if (_$(e) && _$(t)) {
    const r = mp(e.x, t.x),
      n = mp(e.y, t.y);
    return Math.sqrt(r ** 2 + n ** 2);
  }
  return 0;
}
Ig.PanEvent = u6;
Ig.distance = zR;
var h6 = x,
  Ou = g,
  p6 = Rg,
  v6 = Ig;
function y6(e, t) {
  const {
      onPan: r,
      onPanStart: n,
      onPanEnd: o,
      onPanSessionStart: a,
      onPanSessionEnd: s,
      threshold: i,
    } = t,
    c = !!(r || n || o || a || s),
    l = Ou.useRef(null),
    u = p6.useLatestRef({
      onSessionStart: a,
      onSessionEnd: s,
      onStart: n,
      onMove: r,
      onEnd(d, f) {
        (l.current = null), o == null || o(d, f);
      },
    });
  Ou.useEffect(() => {
    var d;
    (d = l.current) == null || d.updateHandlers(u.current);
  }),
    Ou.useEffect(() => {
      const d = e.current;
      if (!d || !c) return;
      function f(m) {
        l.current = new v6.PanEvent(m, u.current, i);
      }
      return h6.addPointerEvent(d, "pointerdown", f);
    }, [e, c, u, i]),
    Ou.useEffect(
      () => () => {
        var d;
        (d = l.current) == null || d.end(), (l.current = null);
      },
      []
    );
}
OR.usePanEvent = y6;
var g6 = OP,
  b6 = vR,
  S6 = ro,
  x6 = yR,
  $6 = bR,
  HR = Cg,
  w6 = xR,
  C6 = wR,
  k6 = Sl,
  WR = kg,
  T6 = kR,
  Eg = Nf,
  P6 = RR,
  R6 = Rg,
  GR = Of,
  A6 = IR,
  _6 = MR,
  I6 = Tg,
  UR = Ag,
  E6 = NR,
  M6 = Pg,
  F6 = OR;
le.useAnimationState = g6.useAnimationState;
le.useBoolean = b6.useBoolean;
le.useCallbackRef = S6.useCallbackRef;
le.useClipboard = x6.useClipboard;
le.useConst = $6.useConst;
le.useControllableProp = HR.useControllableProp;
le.useControllableState = HR.useControllableState;
le.useCounter = w6.useCounter;
le.useDisclosure = C6.useDisclosure;
le.useEventListener = k6.useEventListener;
le.useFocusOnHide = WR.useFocusOnHide;
le.useFocusOnShow = WR.useFocusOnShow;
le.useFocusOnPointerDown = T6.useFocusOnPointerDown;
le.useId = Eg.useId;
le.useIds = Eg.useIds;
le.useOptionalPart = Eg.useOptionalPart;
le.useInterval = P6.useInterval;
le.useLatestRef = R6.useLatestRef;
le.mergeRefs = GR.mergeRefs;
le.useMergeRefs = GR.useMergeRefs;
le.useOutsideClick = A6.useOutsideClick;
le.usePrevious = _6.usePrevious;
le.useSafeLayoutEffect = I6.useSafeLayoutEffect;
le.useSize = UR.useSize;
le.useSizes = UR.useSizes;
le.useTimeout = E6.useTimeout;
le.useUpdateEffect = M6.useUpdateEffect;
le.usePanEvent = F6.usePanEvent;
var I = {},
  Mg = {},
  Ba = {};
const ft = {
    open: (e, t) => `${e}[data-open], ${e}[open], ${e}[data-state=open] ${t}`,
    closed: (e, t) => `${e}[data-closed], ${e}[data-state=closed] ${t}`,
    hover: (e, t) => `${e}:hover ${t}, ${e}[data-hover] ${t}`,
    focus: (e, t) => `${e}:focus ${t}, ${e}[data-focus] ${t}`,
    focusVisible: (e, t) => `${e}:focus-visible ${t}`,
    focusWithin: (e, t) => `${e}:focus-within ${t}`,
    active: (e, t) => `${e}:active ${t}, ${e}[data-active] ${t}`,
    disabled: (e, t) => `${e}:disabled ${t}, ${e}[data-disabled] ${t}`,
    invalid: (e, t) => `${e}:invalid ${t}, ${e}[data-invalid] ${t}`,
    checked: (e, t) => `${e}:checked ${t}, ${e}[data-checked] ${t}`,
    indeterminate: (e, t) =>
      `${e}:indeterminate ${t}, ${e}[aria-checked=mixed] ${t}, ${e}[data-indeterminate] ${t}`,
    readOnly: (e, t) =>
      `${e}:read-only ${t}, ${e}[readonly] ${t}, ${e}[data-read-only] ${t}`,
    expanded: (e, t) =>
      `${e}:read-only ${t}, ${e}[aria-expanded=true] ${t}, ${e}[data-expanded] ${t}`,
    placeholderShown: (e, t) => `${e}:placeholder-shown ${t}`,
  },
  an = (e) => KR((t) => e(t, "&"), "[role=group]", "[data-group]", ".group"),
  Dn = (e) => KR((t) => e(t, "~ &"), "[data-peer]", ".peer"),
  KR = (e, ...t) => t.map(e).join(", "),
  qR = {
    _hover: "&:hover, &[data-hover]",
    _active: "&:active, &[data-active]",
    _focus: "&:focus, &[data-focus]",
    _highlighted: "&[data-highlighted]",
    _focusWithin: "&:focus-within, &[data-focus-within]",
    _focusVisible: "&:focus-visible, &[data-focus-visible]",
    _disabled:
      "&:disabled, &[disabled], &[aria-disabled=true], &[data-disabled]",
    _readOnly: "&[aria-readonly=true], &[readonly], &[data-readonly]",
    _before: "&::before",
    _after: "&::after",
    _empty: "&:empty, &[data-empty]",
    _expanded:
      "&[aria-expanded=true], &[data-expanded], &[data-state=expanded]",
    _checked: "&[aria-checked=true], &[data-checked], &[data-state=checked]",
    _grabbed: "&[aria-grabbed=true], &[data-grabbed]",
    _pressed: "&[aria-pressed=true], &[data-pressed]",
    _invalid: "&[aria-invalid=true], &[data-invalid]",
    _valid: "&[data-valid], &[data-state=valid]",
    _loading: "&[data-loading], &[aria-busy=true]",
    _selected: "&[aria-selected=true], &[data-selected]",
    _hidden: "&[hidden], &[data-hidden]",
    _autofill: "&:-webkit-autofill",
    _even: "&:nth-of-type(even)",
    _odd: "&:nth-of-type(odd)",
    _first: "&:first-of-type",
    _firstLetter: "&::first-letter",
    _last: "&:last-of-type",
    _notFirst: "&:not(:first-of-type)",
    _notLast: "&:not(:last-of-type)",
    _visited: "&:visited",
    _activeLink: "&[aria-current=page]",
    _activeStep: "&[aria-current=step]",
    _indeterminate:
      "&:indeterminate, &[aria-checked=mixed], &[data-indeterminate], &[data-state=indeterminate]",
    _groupOpen: an(ft.open),
    _groupClosed: an(ft.closed),
    _groupHover: an(ft.hover),
    _peerHover: Dn(ft.hover),
    _groupFocus: an(ft.focus),
    _peerFocus: Dn(ft.focus),
    _groupFocusVisible: an(ft.focusVisible),
    _peerFocusVisible: Dn(ft.focusVisible),
    _groupActive: an(ft.active),
    _peerActive: Dn(ft.active),
    _groupDisabled: an(ft.disabled),
    _peerDisabled: Dn(ft.disabled),
    _groupInvalid: an(ft.invalid),
    _peerInvalid: Dn(ft.invalid),
    _groupChecked: an(ft.checked),
    _peerChecked: Dn(ft.checked),
    _groupFocusWithin: an(ft.focusWithin),
    _peerFocusWithin: Dn(ft.focusWithin),
    _peerPlaceholderShown: Dn(ft.placeholderShown),
    _placeholder: "&::placeholder, &[data-placeholder]",
    _placeholderShown: "&:placeholder-shown, &[data-placeholder-shown]",
    _fullScreen: "&:fullscreen, &[data-fullscreen]",
    _selection: "&::selection",
    _rtl: "[dir=rtl] &, &[dir=rtl]",
    _ltr: "[dir=ltr] &, &[dir=ltr]",
    _mediaDark: "@media (prefers-color-scheme: dark)",
    _mediaReduceMotion: "@media (prefers-reduced-motion: reduce)",
    _dark:
      ".chakra-ui-dark &:not([data-theme]),[data-theme=dark] &:not([data-theme]),&[data-theme=dark]",
    _light:
      ".chakra-ui-light &:not([data-theme]),[data-theme=light] &:not([data-theme]),&[data-theme=light]",
    _horizontal: "&[data-orientation=horizontal]",
    _vertical: "&[data-orientation=vertical]",
    _open: "&[data-open], &[open], &[data-state=open]",
    _closed: "&[data-closed], &[data-state=closed]",
    _complete: "&[data-complete]",
    _incomplete: "&[data-incomplete]",
    _current: "&[data-current]",
  },
  j6 = Object.keys(qR);
Ba.pseudoPropNames = j6;
Ba.pseudoSelectors = qR;
var wi = {},
  Fg = {},
  ut = {},
  $l = {},
  D6 = x;
const N6 = (e) => /!(important)?$/.test(e),
  I$ = (e) =>
    typeof e == "string" ? e.replace(/!(important)?$/, "").trim() : e,
  XR = (e, t) => (r) => {
    const n = String(t),
      o = N6(n),
      a = I$(n),
      s = e ? `${e}.${a}` : a;
    let i =
      D6.isObject(r.__cssMap) && s in r.__cssMap ? r.__cssMap[s].varRef : t;
    return (i = I$(i)), o ? `${i} !important` : i;
  };
function O6(e) {
  const { scale: t, transform: r, compose: n } = e;
  return (a, s) => {
    const i = XR(t, a)(s);
    let c = (r == null ? void 0 : r(i, s)) ?? i;
    return n && (c = n(c, s)), c;
  };
}
$l.createTransform = O6;
$l.tokenToCSSVar = XR;
var YR = {};
const B6 =
  (...e) =>
  (t) =>
    e.reduce((r, n) => n(r), t);
YR.pipe = B6;
var jg = {},
  ZR = $l;
function L6(e, t) {
  return (r) => {
    const n = { property: r, scale: e };
    return (n.transform = ZR.createTransform({ scale: e, transform: t })), n;
  };
}
const V6 =
  ({ rtl: e, ltr: t }) =>
  (r) =>
    r.direction === "rtl" ? e : t;
function z6(e) {
  const { property: t, scale: r, transform: n } = e;
  return {
    scale: r,
    property: V6(t),
    transform: r ? ZR.createTransform({ scale: r, compose: n }) : n,
  };
}
jg.logical = z6;
jg.toConfig = L6;
var Pn = {},
  La = {};
const QR = [
  "rotate(var(--chakra-rotate, 0))",
  "scaleX(var(--chakra-scale-x, 1))",
  "scaleY(var(--chakra-scale-y, 1))",
  "skewX(var(--chakra-skew-x, 0))",
  "skewY(var(--chakra-skew-y, 0))",
];
function H6() {
  return [
    "translateX(var(--chakra-translate-x, 0))",
    "translateY(var(--chakra-translate-y, 0))",
    ...QR,
  ].join(" ");
}
function W6() {
  return [
    "translate3d(var(--chakra-translate-x, 0), var(--chakra-translate-y, 0), 0)",
    ...QR,
  ].join(" ");
}
const G6 = {
    "--chakra-blur": "var(--chakra-empty,/*!*/ /*!*/)",
    "--chakra-brightness": "var(--chakra-empty,/*!*/ /*!*/)",
    "--chakra-contrast": "var(--chakra-empty,/*!*/ /*!*/)",
    "--chakra-grayscale": "var(--chakra-empty,/*!*/ /*!*/)",
    "--chakra-hue-rotate": "var(--chakra-empty,/*!*/ /*!*/)",
    "--chakra-invert": "var(--chakra-empty,/*!*/ /*!*/)",
    "--chakra-saturate": "var(--chakra-empty,/*!*/ /*!*/)",
    "--chakra-sepia": "var(--chakra-empty,/*!*/ /*!*/)",
    "--chakra-drop-shadow": "var(--chakra-empty,/*!*/ /*!*/)",
    filter: [
      "var(--chakra-blur)",
      "var(--chakra-brightness)",
      "var(--chakra-contrast)",
      "var(--chakra-grayscale)",
      "var(--chakra-hue-rotate)",
      "var(--chakra-invert)",
      "var(--chakra-saturate)",
      "var(--chakra-sepia)",
      "var(--chakra-drop-shadow)",
    ].join(" "),
  },
  U6 = {
    backdropFilter: [
      "var(--chakra-backdrop-blur)",
      "var(--chakra-backdrop-brightness)",
      "var(--chakra-backdrop-contrast)",
      "var(--chakra-backdrop-grayscale)",
      "var(--chakra-backdrop-hue-rotate)",
      "var(--chakra-backdrop-invert)",
      "var(--chakra-backdrop-opacity)",
      "var(--chakra-backdrop-saturate)",
      "var(--chakra-backdrop-sepia)",
    ].join(" "),
    "--chakra-backdrop-blur": "var(--chakra-empty,/*!*/ /*!*/)",
    "--chakra-backdrop-brightness": "var(--chakra-empty,/*!*/ /*!*/)",
    "--chakra-backdrop-contrast": "var(--chakra-empty,/*!*/ /*!*/)",
    "--chakra-backdrop-grayscale": "var(--chakra-empty,/*!*/ /*!*/)",
    "--chakra-backdrop-hue-rotate": "var(--chakra-empty,/*!*/ /*!*/)",
    "--chakra-backdrop-invert": "var(--chakra-empty,/*!*/ /*!*/)",
    "--chakra-backdrop-opacity": "var(--chakra-empty,/*!*/ /*!*/)",
    "--chakra-backdrop-saturate": "var(--chakra-empty,/*!*/ /*!*/)",
    "--chakra-backdrop-sepia": "var(--chakra-empty,/*!*/ /*!*/)",
  };
function K6(e) {
  return {
    "--chakra-ring-offset-shadow":
      "var(--chakra-ring-inset) 0 0 0 var(--chakra-ring-offset-width) var(--chakra-ring-offset-color)",
    "--chakra-ring-shadow":
      "var(--chakra-ring-inset) 0 0 0 calc(var(--chakra-ring-width) + var(--chakra-ring-offset-width)) var(--chakra-ring-color)",
    "--chakra-ring-width": e,
    boxShadow: [
      "var(--chakra-ring-offset-shadow)",
      "var(--chakra-ring-shadow)",
      "var(--chakra-shadow, 0 0 #0000)",
    ].join(", "),
  };
}
const q6 = {
  "row-reverse": {
    space: "--chakra-space-x-reverse",
    divide: "--chakra-divide-x-reverse",
  },
  "column-reverse": {
    space: "--chakra-space-y-reverse",
    divide: "--chakra-divide-y-reverse",
  },
};
La.backdropFilterTemplate = U6;
La.filterTemplate = G6;
La.flexDirectionTemplate = q6;
La.getRingTemplate = K6;
La.getTransformGpuTemplate = W6;
La.getTransformTemplate = H6;
var wl = {};
const ey = {
    "to-t": "to top",
    "to-tr": "to top right",
    "to-r": "to right",
    "to-br": "to bottom right",
    "to-b": "to bottom",
    "to-bl": "to bottom left",
    "to-l": "to left",
    "to-tl": "to top left",
  },
  X6 = new Set(Object.values(ey)),
  ty = new Set([
    "none",
    "-moz-initial",
    "inherit",
    "initial",
    "revert",
    "unset",
  ]),
  Y6 = (e) => e.trim();
function JR(e, t) {
  if (e == null || ty.has(e)) return e;
  if (!(ry(e) || ty.has(e))) return `url('${e}')`;
  const o = /(^[a-z-A-Z]+)\((.*)\)/g.exec(e),
    a = o == null ? void 0 : o[1],
    s = o == null ? void 0 : o[2];
  if (!a || !s) return e;
  const i = a.includes("-gradient") ? a : `${a}-gradient`,
    [c, ...l] = s.split(",").map(Y6).filter(Boolean);
  if ((l == null ? void 0 : l.length) === 0) return e;
  const u = c in ey ? ey[c] : c;
  l.unshift(u);
  const d = l.map((f) => {
    if (X6.has(f)) return f;
    const m = f.indexOf(" "),
      [h, p] = m !== -1 ? [f.substr(0, m), f.substr(m + 1)] : [f],
      v = ry(p) ? p : p && p.split(" "),
      b = `colors.${h}`,
      y = b in t.__cssMap ? t.__cssMap[b].varRef : h;
    return v ? [y, ...(Array.isArray(v) ? v : [v])].join(" ") : y;
  });
  return `${i}(${d.join(", ")})`;
}
const ry = (e) => typeof e == "string" && e.includes("(") && e.includes(")"),
  Z6 = (e, t) => JR(e, t ?? {});
wl.globalSet = ty;
wl.gradientTransform = Z6;
wl.isCSSFunction = ry;
wl.parseGradient = JR;
var as = La,
  hp = wl;
function Q6(e) {
  return /^var\(--.+\)$/.test(e);
}
const J6 = (e) => {
    const t = parseFloat(e.toString()),
      r = e.toString().replace(String(t), "");
    return { unitless: !r, value: t, unit: r };
  },
  sn = (e) => (t) => `${e}(${t})`,
  ny = {
    filter(e) {
      return e !== "auto" ? e : as.filterTemplate;
    },
    backdropFilter(e) {
      return e !== "auto" ? e : as.backdropFilterTemplate;
    },
    ring(e) {
      return as.getRingTemplate(ny.px(e));
    },
    bgClip(e) {
      return e === "text"
        ? {color: "transparent", backgroundClip: "text" }
        : { backgroundClip: e };
    },
    transform(e) {
      return e === "auto"
        ? as.getTransformTemplate()
        : e === "auto-gpu"
        ? as.getTransformGpuTemplate()
        : e;
    },
    vh(e) {
      return e === "$100vh" ? "var(--chakra-vh)" : e;
    },
    px(e) {
      if (e == null) return e;
      const { unitless: t } = J6(e);
      return t || typeof e == "number" ? `${e}px` : e;
    },
    fraction(e) {
      return typeof e != "number" || e > 1 ? e : `${e * 100}%`;
    },
    float(e, t) {
      const r = { left: "right", right: "left" };
      return t.direction === "rtl" ? r[e] : e;
    },
    degree(e) {
      if (Q6(e) || e == null) return e;
      const t = typeof e == "string" && !e.endsWith("deg");
      return typeof e == "number" || t ? `${e}deg` : e;
    },
    gradient: hp.gradientTransform,
    blur: sn("blur"),
    opacity: sn("opacity"),
    brightness: sn("brightness"),
    contrast: sn("contrast"),
    dropShadow: sn("drop-shadow"),
    grayscale: sn("grayscale"),
    hueRotate: (e) => sn("hue-rotate")(ny.degree(e)),
    invert: sn("invert"),
    saturate: sn("saturate"),
    sepia: sn("sepia"),
    bgImage(e) {
      return e == null || hp.isCSSFunction(e) || hp.globalSet.has(e)
        ? e
        : `url(${e})`;
    },
    outline(e) {
      const t = String(e) === "0" || String(e) === "none";
      return e !== null && t
        ? {outline: "2px solid transparent", outlineOffset: "2px" }
        : {outline: e };
    },
    flexDirection(e) {
      const { space: t, divide: r } = as.flexDirectionTemplate[e] ?? {},
        n = { flexDirection: e };
      return t && (n[t] = 1), r && (n[r] = 1), n;
    },
  };
Pn.transformFunctions = ny;
var eW = $l,
  Bu = YR,
  sr = jg,
  dr = Pn;
const tW = {
  borderWidths: sr.toConfig("borderWidths"),
  borderStyles: sr.toConfig("borderStyles"),
  colors: sr.toConfig("colors"),
  borders: sr.toConfig("borders"),
  gradients: sr.toConfig("gradients", dr.transformFunctions.gradient),
  radii: sr.toConfig("radii", dr.transformFunctions.px),
  space: sr.toConfig(
    "space",
    Bu.pipe(dr.transformFunctions.vh, dr.transformFunctions.px)
  ),
  spaceT: sr.toConfig(
    "space",
    Bu.pipe(dr.transformFunctions.vh, dr.transformFunctions.px)
  ),
  degreeT(e) {
    return { property: e, transform: dr.transformFunctions.degree };
  },
  prop(e, t, r) {
    return {
      property: e,
      scale: t,
      ...(t && { transform: eW.createTransform({ scale: t, transform: r }) }),
    };
  },
  propT(e, t) {
    return { property: e, transform: t };
  },
  sizes: sr.toConfig(
    "sizes",
    Bu.pipe(dr.transformFunctions.vh, dr.transformFunctions.px)
  ),
  sizesT: sr.toConfig(
    "sizes",
    Bu.pipe(dr.transformFunctions.vh, dr.transformFunctions.fraction)
  ),
  shadows: sr.toConfig("shadows"),
  logical: sr.logical,
  blur: sr.toConfig("blur", dr.transformFunctions.blur),
};
ut.transforms = dr.transformFunctions;
ut.t = tW;
var Lr = ut,
  E$ = Pn;
const Ad = {background: Lr.t.colors("background"),
  backgroundColor: Lr.t.colors("backgroundColor"),
  backgroundImage: Lr.t.gradients("backgroundImage"),
  backgroundSize: !0,
  backgroundPosition: !0,
  backgroundRepeat: !0,
  backgroundAttachment: !0,
  backgroundClip: { transform: E$.transformFunctions.bgClip },
  bgSize: Lr.t.prop("backgroundSize"),
  bgPosition: Lr.t.prop("backgroundPosition"),
  bg: Lr.t.colors("background"),
  bgColor: Lr.t.colors("backgroundColor"),
  bgPos: Lr.t.prop("backgroundPosition"),
  bgRepeat: Lr.t.prop("backgroundRepeat"),
  bgAttachment: Lr.t.prop("backgroundAttachment"),
  bgGradient: Lr.t.gradients("backgroundImage"),
  bgClip: { transform: E$.transformFunctions.bgClip },
};
Object.assign(Ad, { bgImage: Ad.backgroundImage, bgImg: Ad.backgroundImage });
Fg.background = Ad;
var Dg = {},
  ce = ut;
const Me = {border: ce.t.borders("border"),
  borderWidth: ce.t.borderWidths("borderWidth"),
  borderStyle: ce.t.borderStyles("borderStyle"),
  borderColor: ce.t.colors("borderColor"),
  borderRadius: ce.t.radii("borderRadius"),
  borderTop: ce.t.borders("borderTop"),
  borderBlockStart: ce.t.borders("borderBlockStart"),
  borderTopLeftRadius: ce.t.radii("borderTopLeftRadius"),
  borderStartStartRadius: ce.t.logical({
    scale: "radii",
    property: { ltr: "borderTopLeftRadius", rtl: "borderTopRightRadius" },
  }),
  borderEndStartRadius: ce.t.logical({
    scale: "radii",
    property: { ltr: "borderBottomLeftRadius", rtl: "borderBottomRightRadius" },
  }),
  borderTopRightRadius: ce.t.radii("borderTopRightRadius"),
  borderStartEndRadius: ce.t.logical({
    scale: "radii",
    property: { ltr: "borderTopRightRadius", rtl: "borderTopLeftRadius" },
  }),
  borderEndEndRadius: ce.t.logical({
    scale: "radii",
    property: { ltr: "borderBottomRightRadius", rtl: "borderBottomLeftRadius" },
  }),
  borderRight: ce.t.borders("borderRight"),
  borderInlineEnd: ce.t.borders("borderInlineEnd"),
  borderBottom: ce.t.borders("borderBottom"),
  borderBlockEnd: ce.t.borders("borderBlockEnd"),
  borderBottomLeftRadius: ce.t.radii("borderBottomLeftRadius"),
  borderBottomRightRadius: ce.t.radii("borderBottomRightRadius"),
  borderLeft: ce.t.borders("borderLeft"),
  borderInlineStart: { property: "borderInlineStart", scale: "borders" },
  borderInlineStartRadius: ce.t.logical({
    scale: "radii",
    property: {
      ltr: ["borderTopLeftRadius", "borderBottomLeftRadius"],
      rtl: ["borderTopRightRadius", "borderBottomRightRadius"],
    },
  }),
  borderInlineEndRadius: ce.t.logical({
    scale: "radii",
    property: {
      ltr: ["borderTopRightRadius", "borderBottomRightRadius"],
      rtl: ["borderTopLeftRadius", "borderBottomLeftRadius"],
    },
  }),
  borderX: ce.t.borders(["borderLeft", "borderRight"]),
  borderInline: ce.t.borders("borderInline"),
  borderY: ce.t.borders(["borderTop", "borderBottom"]),
  borderBlock: ce.t.borders("borderBlock"),
  borderTopWidth: ce.t.borderWidths("borderTopWidth"),
  borderBlockStartWidth: ce.t.borderWidths("borderBlockStartWidth"),
  borderTopColor: ce.t.colors("borderTopColor"),
  borderBlockStartColor: ce.t.colors("borderBlockStartColor"),
  borderTopStyle: ce.t.borderStyles("borderTopStyle"),
  borderBlockStartStyle: ce.t.borderStyles("borderBlockStartStyle"),
  borderBottomWidth: ce.t.borderWidths("borderBottomWidth"),
  borderBlockEndWidth: ce.t.borderWidths("borderBlockEndWidth"),
  borderBottomColor: ce.t.colors("borderBottomColor"),
  borderBlockEndColor: ce.t.colors("borderBlockEndColor"),
  borderBottomStyle: ce.t.borderStyles("borderBottomStyle"),
  borderBlockEndStyle: ce.t.borderStyles("borderBlockEndStyle"),
  borderLeftWidth: ce.t.borderWidths("borderLeftWidth"),
  borderInlineStartWidth: ce.t.borderWidths("borderInlineStartWidth"),
  borderLeftColor: ce.t.colors("borderLeftColor"),
  borderInlineStartColor: ce.t.colors("borderInlineStartColor"),
  borderLeftStyle: ce.t.borderStyles("borderLeftStyle"),
  borderInlineStartStyle: ce.t.borderStyles("borderInlineStartStyle"),
  borderRightWidth: ce.t.borderWidths("borderRightWidth"),
  borderInlineEndWidth: ce.t.borderWidths("borderInlineEndWidth"),
  borderRightColor: ce.t.colors("borderRightColor"),
  borderInlineEndColor: ce.t.colors("borderInlineEndColor"),
  borderRightStyle: ce.t.borderStyles("borderRightStyle"),
  borderInlineEndStyle: ce.t.borderStyles("borderInlineEndStyle"),
  borderTopRadius: ce.t.radii(["borderTopLeftRadius", "borderTopRightRadius"]),
  borderBottomRadius: ce.t.radii([
    "borderBottomLeftRadius",
    "borderBottomRightRadius",
  ]),
  borderLeftRadius: ce.t.radii([
    "borderTopLeftRadius",
    "borderBottomLeftRadius",
  ]),
  borderRightRadius: ce.t.radii([
    "borderTopRightRadius",
    "borderBottomRightRadius",
  ]),
};
Object.assign(Me, {
  rounded: Me.borderRadius,
  roundedTop: Me.borderTopRadius,
  roundedTopLeft: Me.borderTopLeftRadius,
  roundedTopRight: Me.borderTopRightRadius,
  roundedTopStart: Me.borderStartStartRadius,
  roundedTopEnd: Me.borderStartEndRadius,
  roundedBottom: Me.borderBottomRadius,
  roundedBottomLeft: Me.borderBottomLeftRadius,
  roundedBottomRight: Me.borderBottomRightRadius,
  roundedBottomStart: Me.borderEndStartRadius,
  roundedBottomEnd: Me.borderEndEndRadius,
  roundedLeft: Me.borderLeftRadius,
  roundedRight: Me.borderRightRadius,
  roundedStart: Me.borderInlineStartRadius,
  roundedEnd: Me.borderInlineEndRadius,
  borderStart: Me.borderInlineStart,
  borderEnd: Me.borderInlineEnd,
  borderTopStartRadius: Me.borderStartStartRadius,
  borderTopEndRadius: Me.borderStartEndRadius,
  borderBottomStartRadius: Me.borderEndStartRadius,
  borderBottomEndRadius: Me.borderEndEndRadius,
  borderStartRadius: Me.borderInlineStartRadius,
  borderEndRadius: Me.borderInlineEndRadius,
  borderStartWidth: Me.borderInlineStartWidth,
  borderEndWidth: Me.borderInlineEndWidth,
  borderStartColor: Me.borderInlineStartColor,
  borderEndColor: Me.borderInlineEndColor,
  borderStartStyle: Me.borderInlineStartStyle,
  borderEndStyle: Me.borderInlineEndStyle,
});
Dg.border = Me;
var Ng = {},
  ss = ut;
const rW = {color: ss.t.colors("color"),
  textColor: ss.t.colors("color"),
  fill: ss.t.colors("fill"),
  stroke: ss.t.colors("stroke"),
  accentColor: ss.t.colors("accentColor"),
  textFillColor: ss.t.colors("textFillColor"),
};
Ng.color = rW;
var Og = {},
  Lu = ut,
  nW = Pn;
const oy = {
  alignItems: !0,
  alignContent: !0,
  justifyItems: !0,
  justifyContent: !0,
  flexWrap: !0,
  flexDirection: { transform: nW.transformFunctions.flexDirection },
  flex: !0,
  flexFlow: !0,
  flexGrow: !0,
  flexShrink: !0,
  flexBasis: Lu.t.sizes("flexBasis"),
  justifySelf: !0,
  alignSelf: !0,
  order: !0,
  placeItems: !0,
  placeContent: !0,
  placeSelf: !0,
  gap: Lu.t.space("gap"),
  rowGap: Lu.t.space("rowGap"),
  columnGap: Lu.t.space("columnGap"),
};
Object.assign(oy, { flexDir: oy.flexDirection });
Og.flexbox = oy;
var Bg = {},
  Ut = ut,
  oW = Pn;
const Ur = {
  width: Ut.t.sizesT("width"),
  inlineSize: Ut.t.sizesT("inlineSize"),
  height: Ut.t.sizes("height"),
  blockSize: Ut.t.sizes("blockSize"),
  boxSize: Ut.t.sizes(["width", "height"]),
  minWidth: Ut.t.sizes("minWidth"),
  minInlineSize: Ut.t.sizes("minInlineSize"),
  minHeight: Ut.t.sizes("minHeight"),
  minBlockSize: Ut.t.sizes("minBlockSize"),
  maxWidth: Ut.t.sizes("maxWidth"),
  maxInlineSize: Ut.t.sizes("maxInlineSize"),
  maxHeight: Ut.t.sizes("maxHeight"),
  maxBlockSize: Ut.t.sizes("maxBlockSize"),
  overflow: !0,
  overflowX: !0,
  overflowY: !0,
  overscrollBehavior: !0,
  overscrollBehaviorX: !0,
  overscrollBehaviorY: !0,
  display: !0,
  aspectRatio: !0,
  hideFrom: {
    scale: "breakpoints",
    transform: (e, t) => {
      var o, a;
      return {
        [`@media screen and (min-width: ${
          ((a = (o = t.__breakpoints) == null ? void 0 : o.get(e)) == null
            ? void 0
            : a.minW) ?? e
        })`]: { display: "none" },
      };
    },
  },
  hideBelow: {
    scale: "breakpoints",
    transform: (e, t) => {
      var o, a;
      return {
        [`@media screen and (max-width: ${
          ((a = (o = t.__breakpoints) == null ? void 0 : o.get(e)) == null
            ? void 0
            : a._minW) ?? e
        })`]: { display: "none" },
      };
    },
  },
  verticalAlign: !0,
  boxSizing: !0,
  boxDecorationBreak: !0,
  float: Ut.t.propT("float", oW.transformFunctions.float),
  objectFit: !0,
  objectPosition: !0,
  visibility: !0,
  isolation: !0,
};
Object.assign(Ur, {
  w: Ur.width,
  h: Ur.height,
  minW: Ur.minWidth,
  maxW: Ur.maxWidth,
  minH: Ur.minHeight,
  maxH: Ur.maxHeight,
  overscroll: Ur.overscrollBehavior,
  overscrollX: Ur.overscrollBehaviorX,
  overscrollY: Ur.overscrollBehaviorY,
});
Bg.layout = Ur;
var Lg = {},
  ir = ut,
  cr = Pn;
const aW = {
  filter: { transform: cr.transformFunctions.filter },
  blur: ir.t.blur("--chakra-blur"),
  brightness: ir.t.propT(
    "--chakra-brightness",
    cr.transformFunctions.brightness
  ),
  contrast: ir.t.propT("--chakra-contrast", cr.transformFunctions.contrast),
  hueRotate: ir.t.propT("--chakra-hue-rotate", cr.transformFunctions.hueRotate),
  invert: ir.t.propT("--chakra-invert", cr.transformFunctions.invert),
  saturate: ir.t.propT("--chakra-saturate", cr.transformFunctions.saturate),
  dropShadow: ir.t.propT(
    "--chakra-drop-shadow",
    cr.transformFunctions.dropShadow
  ),
  backdropFilter: { transform: cr.transformFunctions.backdropFilter },
  backdropBlur: ir.t.blur("--chakra-backdrop-blur"),
  backdropBrightness: ir.t.propT(
    "--chakra-backdrop-brightness",
    cr.transformFunctions.brightness
  ),
  backdropContrast: ir.t.propT(
    "--chakra-backdrop-contrast",
    cr.transformFunctions.contrast
  ),
  backdropHueRotate: ir.t.propT(
    "--chakra-backdrop-hue-rotate",
    cr.transformFunctions.hueRotate
  ),
  backdropInvert: ir.t.propT(
    "--chakra-backdrop-invert",
    cr.transformFunctions.invert
  ),
  backdropSaturate: ir.t.propT(
    "--chakra-backdrop-saturate",
    cr.transformFunctions.saturate
  ),
};
Lg.filter = aW;
var Vg = {},
  Vu = ut,
  sW = Pn;
const iW = {
  ring: { transform: sW.transformFunctions.ring },
  ringColor: Vu.t.colors("--chakra-ring-color"),
  ringOffset: Vu.t.prop("--chakra-ring-offset-width"),
  ringOffsetColor: Vu.t.colors("--chakra-ring-offset-color"),
  ringInset: Vu.t.prop("--chakra-ring-inset"),
};
Vg.ring = iW;
var zg = {},
  cW = ut,
  lW = Pn;
const uW = {
  appearance: !0,
  cursor: !0,
  resize: !0,
  userSelect: !0,
  pointerEvents: !0,
  outline: { transform: lW.transformFunctions.outline },
  outlineOffset: !0,
  outlineColor: cW.t.colors("outlineColor"),
};
zg.interactivity = uW;
var Hg = {},
  pp = ut;
const dW = {
  gridGap: pp.t.space("gridGap"),
  gridColumnGap: pp.t.space("gridColumnGap"),
  gridRowGap: pp.t.space("gridRowGap"),
  gridColumn: !0,
  gridRow: !0,
  gridAutoFlow: !0,
  gridAutoColumns: !0,
  gridColumnStart: !0,
  gridColumnEnd: !0,
  gridRowStart: !0,
  gridRowEnd: !0,
  gridAutoRows: !0,
  gridTemplate: !0,
  gridTemplateColumns: !0,
  gridTemplateRows: !0,
  gridTemplateAreas: !0,
  gridArea: !0,
};
Hg.grid = dW;
var Wg = {},
  Lf = {};
function eA(e, t, r, n) {
  const o = typeof t == "string" ? t.split(".") : [t];
  for (n = 0; n < o.length && e; n += 1) e = e[o[n]];
  return e === void 0 ? r : e;
}
const tA = (e) => {
    const t = new WeakMap();
    return (n, o, a, s) => {
      if (typeof n > "u") return e(n, o, a);
      t.has(n) || t.set(n, new Map());
      const i = t.get(n);
      if (i.has(o)) return i.get(o);
      const c = e(n, o, a, s);
      return i.set(o, c), c;
    };
  },
  fW = tA(eA);
Lf.get = eA;
Lf.memoize = tA;
Lf.memoizedGet = fW;
var mW = Lf;
const hW = {border: "0px",
    clip: "rect(0, 0, 0, 0)",
    width: "1px",
    height: "1px",
    margin: "-1px",
    padding: "0px",
    overflow: "hidden",
    whiteSpace: "nowrap",
    position: "absolute",
  },
  pW = {
    position: "static",
    width: "auto",
    height: "auto",
    clip: "auto",
    padding: "0",
    margin: "0",
    overflow: "visible",
    whiteSpace: "normal",
  },
  vp = (e, t, r) => {
    const n = {},
      o = mW.memoizedGet(e, t, {});
    for (const a in o) (a in r && r[a] != null) || (n[a] = o[a]);
    return n;
  },
  vW = {
    srOnly: {
      transform(e) {
        return e === !0 ? hW : e === "focusable" ? pW : {};
      },
    },
    layerStyle: {
      processResult: !0,
      transform: (e, t, r) => vp(t, `layerStyles.${e}`, r),
    },
    textStyle: {
      processResult: !0,
      transform: (e, t, r) => vp(t, `textStyles.${e}`, r),
    },
    apply: { processResult: !0, transform: (e, t, r) => vp(t, e, r) },
  };
Wg.others = vW;
var Gg = {},
  Ot = ut;
const _d = {
  position: !0,
  pos: Ot.t.prop("position"),
  zIndex: Ot.t.prop("zIndex", "zIndices"),
  inset: Ot.t.spaceT("inset"),
  insetX: Ot.t.spaceT(["left", "right"]),
  insetInline: Ot.t.spaceT("insetInline"),
  insetY: Ot.t.spaceT(["top", "bottom"]),
  insetBlock: Ot.t.spaceT("insetBlock"),
  top: Ot.t.spaceT("top"),
  insetBlockStart: Ot.t.spaceT("insetBlockStart"),
  bottom: Ot.t.spaceT("bottom"),
  insetBlockEnd: Ot.t.spaceT("insetBlockEnd"),
  left: Ot.t.spaceT("left"),
  insetInlineStart: Ot.t.logical({
    scale: "space",
    property: { ltr: "left", rtl: "right" },
  }),
  right: Ot.t.spaceT("right"),
  insetInlineEnd: Ot.t.logical({
    scale: "space",
    property: { ltr: "right", rtl: "left" },
  }),
};
Object.assign(_d, {
  insetStart: _d.insetInlineStart,
  insetEnd: _d.insetInlineEnd,
});
Gg.position = _d;
var Ug = {},
  yp = ut;
const ay = {
  boxShadow: yp.t.shadows("boxShadow"),
  mixBlendMode: !0,
  blendMode: yp.t.prop("mixBlendMode"),
  backgroundBlendMode: !0,
  bgBlendMode: yp.t.prop("backgroundBlendMode"),
  opacity: !0,
};
Object.assign(ay, { shadow: ay.boxShadow });
Ug.effect = ay;
var Kg = {},
  Ge = ut;
const qe = {
  margin: Ge.t.spaceT("margin"),
  marginTop: Ge.t.spaceT("marginTop"),
  marginBlockStart: Ge.t.spaceT("marginBlockStart"),
  marginRight: Ge.t.spaceT("marginRight"),
  marginInlineEnd: Ge.t.spaceT("marginInlineEnd"),
  marginBottom: Ge.t.spaceT("marginBottom"),
  marginBlockEnd: Ge.t.spaceT("marginBlockEnd"),
  marginLeft: Ge.t.spaceT("marginLeft"),
  marginInlineStart: Ge.t.spaceT("marginInlineStart"),
  marginX: Ge.t.spaceT(["marginInlineStart", "marginInlineEnd"]),
  marginInline: Ge.t.spaceT("marginInline"),
  marginY: Ge.t.spaceT(["marginTop", "marginBottom"]),
  marginBlock: Ge.t.spaceT("marginBlock"),
  padding: Ge.t.space("padding"),
  paddingTop: Ge.t.space("paddingTop"),
  paddingBlockStart: Ge.t.space("paddingBlockStart"),
  paddingRight: Ge.t.space("paddingRight"),
  paddingBottom: Ge.t.space("paddingBottom"),
  paddingBlockEnd: Ge.t.space("paddingBlockEnd"),
  paddingLeft: Ge.t.space("paddingLeft"),
  paddingInlineStart: Ge.t.space("paddingInlineStart"),
  paddingInlineEnd: Ge.t.space("paddingInlineEnd"),
  paddingX: Ge.t.space(["paddingInlineStart", "paddingInlineEnd"]),
  paddingInline: Ge.t.space("paddingInline"),
  paddingY: Ge.t.space(["paddingTop", "paddingBottom"]),
  paddingBlock: Ge.t.space("paddingBlock"),
};
Object.assign(qe, {
  m: qe.margin,
  mt: qe.marginTop,
  mr: qe.marginRight,
  me: qe.marginInlineEnd,
  marginEnd: qe.marginInlineEnd,
  mb: qe.marginBottom,
  ml: qe.marginLeft,
  ms: qe.marginInlineStart,
  marginStart: qe.marginInlineStart,
  mx: qe.marginX,
  my: qe.marginY,
  p: qe.padding,
  pt: qe.paddingTop,
  py: qe.paddingY,
  px: qe.paddingX,
  pb: qe.paddingBottom,
  pl: qe.paddingLeft,
  ps: qe.paddingInlineStart,
  paddingStart: qe.paddingInlineStart,
  pr: qe.paddingRight,
  pe: qe.paddingInlineEnd,
  paddingEnd: qe.paddingInlineEnd,
});
Kg.space = qe;
var qg = {},
  Kt = ut;
const yW = {
  scrollBehavior: !0,
  scrollSnapAlign: !0,
  scrollSnapStop: !0,
  scrollSnapType: !0,
  scrollMargin: Kt.t.spaceT("scrollMargin"),
  scrollMarginTop: Kt.t.spaceT("scrollMarginTop"),
  scrollMarginBottom: Kt.t.spaceT("scrollMarginBottom"),
  scrollMarginLeft: Kt.t.spaceT("scrollMarginLeft"),
  scrollMarginRight: Kt.t.spaceT("scrollMarginRight"),
  scrollMarginX: Kt.t.spaceT(["scrollMarginLeft", "scrollMarginRight"]),
  scrollMarginY: Kt.t.spaceT(["scrollMarginTop", "scrollMarginBottom"]),
  scrollPadding: Kt.t.spaceT("scrollPadding"),
  scrollPaddingTop: Kt.t.spaceT("scrollPaddingTop"),
  scrollPaddingBottom: Kt.t.spaceT("scrollPaddingBottom"),
  scrollPaddingLeft: Kt.t.spaceT("scrollPaddingLeft"),
  scrollPaddingRight: Kt.t.spaceT("scrollPaddingRight"),
  scrollPaddingX: Kt.t.spaceT(["scrollPaddingLeft", "scrollPaddingRight"]),
  scrollPaddingY: Kt.t.spaceT(["scrollPaddingTop", "scrollPaddingBottom"]),
};
qg.scroll = yW;
var Xg = {},
  ic = ut,
  gW = Pn;
const bW = {
  fontFamily: ic.t.prop("fontFamily", "fonts"),
  fontSize: ic.t.prop("fontSize", "fontSizes", gW.transformFunctions.px),
  fontWeight: ic.t.prop("fontWeight", "fontWeights"),
  lineHeight: ic.t.prop("lineHeight", "lineHeights"),
  letterSpacing: ic.t.prop("letterSpacing", "letterSpacings"),
  textAlign: !0,
  fontStyle: !0,
  textIndent: !0,
  wordBreak: !0,
  overflowWrap: !0,
  textOverflow: !0,
  textTransform: !0,
  whiteSpace: !0,
  isTruncated: {
    transform(e) {
      if (e === !0)
        return {
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        };
    },
  },
  noOfLines: {
    static: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "-webkit-box",
      WebkitBoxOrient: "vertical",
      WebkitLineClamp: "var(--chakra-line-clamp)",
    },
    property: "--chakra-line-clamp",
  },
};
Xg.typography = bW;
var Yg = {},
  M$ = ut;
const SW = {
  textDecorationColor: M$.t.colors("textDecorationColor"),
  textDecoration: !0,
  textDecor: { property: "textDecoration" },
  textDecorationLine: !0,
  textDecorationStyle: !0,
  textDecorationThickness: !0,
  textUnderlineOffset: !0,
  textShadow: M$.t.shadows("textShadow"),
};
Yg.textDecoration = SW;
var Zg = {},
  Nn = ut,
  xW = Pn;
const $W = {
  clipPath: !0,
  transform: Nn.t.propT("transform", xW.transformFunctions.transform),
  transformOrigin: !0,
  translateX: Nn.t.spaceT("--chakra-translate-x"),
  translateY: Nn.t.spaceT("--chakra-translate-y"),
  skewX: Nn.t.degreeT("--chakra-skew-x"),
  skewY: Nn.t.degreeT("--chakra-skew-y"),
  scaleX: Nn.t.prop("--chakra-scale-x"),
  scaleY: Nn.t.prop("--chakra-scale-y"),
  scale: Nn.t.prop(["--chakra-scale-x", "--chakra-scale-y"]),
  rotate: Nn.t.degreeT("--chakra-rotate"),
};
Zg.transform = $W;
var Qg = {},
  F$ = ut;
const wW = {
  listStyleType: !0,
  listStylePosition: !0,
  listStylePos: F$.t.prop("listStylePosition"),
  listStyleImage: !0,
  listStyleImg: F$.t.prop("listStyleImage"),
};
Qg.list = wW;
var Jg = {},
  gp = ut;
const CW = {
  transition: !0,
  transitionDelay: !0,
  animation: !0,
  willChange: !0,
  transitionDuration: gp.t.prop("transitionDuration", "transition.duration"),
  transitionProperty: gp.t.prop("transitionProperty", "transition.property"),
  transitionTimingFunction: gp.t.prop(
    "transitionTimingFunction",
    "transition.easing"
  ),
};
Jg.transition = CW;
var kW = x,
  rA = Ba,
  TW = Fg,
  PW = Dg,
  RW = Ng,
  nA = Og,
  oA = Bg,
  AW = Lg,
  _W = Vg,
  IW = zg,
  aA = Hg,
  EW = Wg,
  sA = Gg,
  MW = Ug,
  iA = Kg,
  FW = qg,
  jW = Xg,
  DW = Yg,
  NW = Zg,
  OW = Qg,
  BW = Jg;
const eb = kW.mergeWith(
    {},
    TW.background,
    PW.border,
    RW.color,
    nA.flexbox,
    oA.layout,
    AW.filter,
    _W.ring,
    IW.interactivity,
    aA.grid,
    EW.others,
    sA.position,
    MW.effect,
    iA.space,
    FW.scroll,
    jW.typography,
    DW.textDecoration,
    NW.transform,
    OW.list,
    BW.transition
  ),
  LW = Object.assign({}, iA.space, oA.layout, nA.flexbox, aA.grid, sA.position),
  VW = Object.keys(LW),
  zW = [...Object.keys(eb), ...rA.pseudoPropNames],
  HW = { ...eb, ...rA.pseudoSelectors },
  WW = (e) => e in HW;
wi.isStyleProp = WW;
wi.layoutPropNames = VW;
wi.propNames = zW;
wi.systemProps = eb;
var cA = {},
  j$ = x;
const GW = (e) => (t) => {
  if (!t.__breakpoints) return e;
  const { isResponsive: r, toArrayValue: n, media: o } = t.__breakpoints,
    a = {};
  for (const s in e) {
    let i = j$.runIfFn(e[s], t);
    if (i == null) continue;
    if (((i = j$.isObject(i) && r(i) ? n(i) : i), !Array.isArray(i))) {
      a[s] = i;
      continue;
    }
    const c = i.slice(0, o.length).length;
    for (let l = 0; l < c; l += 1) {
      const u = o == null ? void 0 : o[l];
      if (!u) {
        a[s] = i[l];
        continue;
      }
      (a[u] = a[u] || {}), i[l] != null && (a[u][s] = i[l]);
    }
  }
  return a;
};
cA.expandResponsive = GW;
var lA = {};
function UW(e) {
  const t = [];
  let r = "",
    n = !1;
  for (let o = 0; o < e.length; o++) {
    const a = e[o];
    a === "("
      ? ((n = !0), (r += a))
      : a === ")"
      ? ((n = !1), (r += a))
      : a === "," && !n
      ? (t.push(r), (r = ""))
      : (r += a);
  }
  return (r = r.trim()), r && t.push(r), t;
}
lA.splitByComma = UW;
var Vr = x,
  KW = Ba,
  qW = wi,
  XW = cA,
  YW = lA;
function ZW(e) {
  return /^var\(--.+\)$/.test(e);
}
const QW = (e, t) => e.startsWith("--") && typeof t == "string" && !ZW(t),
  JW = (e, t) => {
    if (t == null) return t;
    const r = (s) => {
        var i, c;
        return (c = (i = e.__cssMap) == null ? void 0 : i[s]) == null
          ? void 0
          : c.varRef;
      },
      n = (s) => r(s) ?? s,
      [o, a] = YW.splitByComma(t);
    return (t = r(o) ?? n(a) ?? n(t)), t;
  };
function uA(e) {
  const { configs: t = {}, pseudos: r = {}, theme: n } = e,
    o = (a, s = !1) => {
      var u;
      const i = Vr.runIfFn(a, n),
        c = XW.expandResponsive(i)(n);
      let l = {};
      for (let d in c) {
        const f = c[d];
        let m = Vr.runIfFn(f, n);
        d in r && (d = r[d]), QW(d, m) && (m = JW(n, m));
        let h = t[d];
        if ((h === !0 && (h = { property: d }), Vr.isObject(m))) {
          (l[d] = l[d] ?? {}), (l[d] = Vr.mergeWith({}, l[d], o(m, !0)));
          continue;
        }
        let p =
          ((u = h == null ? void 0 : h.transform) == null
            ? void 0
            : u.call(h, m, n, i)) ?? m;
        p = h != null && h.processResult ? o(p, !0) : p;
        const v = Vr.runIfFn(h == null ? void 0 : h.property, n);
        if (!s && h != null && h.static) {
          const b = Vr.runIfFn(h.static, n);
          l = Vr.mergeWith({}, l, b);
        }
        if (v && Array.isArray(v)) {
          for (const b of v) l[b] = p;
          continue;
        }
        if (v) {
          v === "&" && Vr.isObject(p)
            ? (l = Vr.mergeWith({}, l, p))
            : (l[v] = p);
          continue;
        }
        if (Vr.isObject(p)) {
          l = Vr.mergeWith({}, l, p);
          continue;
        }
        l[d] = p;
      }
      return l;
    };
  return o;
}
const e9 = (e) => (t) =>
  uA({ theme: t, pseudos: KW.pseudoSelectors, configs: qW.systemProps })(e);
Mg.css = e9;
Mg.getCss = uA;
var Vf = {};
function t9(e) {
  return e;
}
function r9(e) {
  return e;
}
function n9(e) {
  return {
    definePartsStyle(t) {
      return t;
    },
    defineMultiStyleConfig(t) {
      return { parts: e, ...t };
    },
  };
}
Vf.createMultiStyleConfigHelpers = n9;
Vf.defineStyle = t9;
Vf.defineStyleConfig = r9;
var dA = {};
function o9(e, t, r) {
  var n, o;
  return (
    ((o = (n = e.__cssMap) == null ? void 0 : n[`${t}.${r}`]) == null
      ? void 0
      : o.varRef) ?? r
  );
}
dA.getCSSVar = o9;
var fA = {},
  pa = x;
function a9(e, t) {
  if (Array.isArray(e)) return e;
  if (pa.isObject(e)) return t(e);
  if (e != null) return [e];
}
function s9(e, t) {
  for (let r = t + 1; r < e.length; r++) if (e[r] != null) return r;
  return -1;
}
function i9(e) {
  const t = e.__breakpoints;
  return function (n, o, a, s) {
    var f, m;
    if (!t) return;
    const i = {},
      c = a9(a, t.toArrayValue);
    if (!c) return i;
    const l = c.length,
      u = l === 1,
      d = !!n.parts;
    for (let h = 0; h < l; h++) {
      const p = t.details[h],
        v = t.details[s9(c, h)],
        b = pa.toMediaQueryString(p.minW, v == null ? void 0 : v._minW),
        y = pa.runIfFn((f = n[o]) == null ? void 0 : f[c[h]], s);
      if (y) {
        if (d) {
          (m = n.parts) == null ||
            m.forEach((S) => {
              pa.mergeWith(i, { [S]: u ? y[S] : { [b]: y[S] } });
            });
          continue;
        }
        if (!d) {
          u ? pa.mergeWith(i, y) : (i[b] = y);
          continue;
        }
        i[b] = y;
      }
    }
    return i;
  };
}
function c9(e) {
  return (t) => {
    const { variant: r, size: n, theme: o } = t,
      a = i9(o);
    return pa.mergeWith(
      {},
      pa.runIfFn(e.baseStyle ?? {}, t),
      a(e, "sizes", n, t),
      a(e, "variants", r, t)
    );
  };
}
fA.resolveStyleConfig = c9;
var mA = {},
  l9 = x;
function u9(e) {
  return l9.omit(e, ["styleConfig", "size", "variant", "colorScheme"]);
}
mA.omitThemingProps = u9;
var tb = {},
  d9 = x;
function hA(e) {
  return d9.isObject(e) && e.reference ? e.reference : String(e);
}
const zf = (e, ...t) => t.map(hA).join(` ${e} `).replace(/calc/g, ""),
  D$ = (...e) => `calc(${zf("+", ...e)})`,
  N$ = (...e) => `calc(${zf("-", ...e)})`,
  sy = (...e) => `calc(${zf("*", ...e)})`,
  O$ = (...e) => `calc(${zf("/", ...e)})`,
  B$ = (e) => {
    const t = hA(e);
    return t != null && !Number.isNaN(parseFloat(t))
      ? String(t).startsWith("-")
        ? String(t).slice(1)
        : `-${t}`
      : sy(t, -1);
  },
  ys = Object.assign(
    (e) => ({
      add: (...t) => ys(D$(e, ...t)),
      subtract: (...t) => ys(N$(e, ...t)),
      multiply: (...t) => ys(sy(e, ...t)),
      divide: (...t) => ys(O$(e, ...t)),
      negate: () => ys(B$(e)),
      toString: () => e.toString(),
    }),
    { add: D$, subtract: N$, multiply: sy, divide: O$, negate: B$ }
  );
tb.calc = ys;
var Va = {};
function f9(e, t = "-") {
  return e.replace(/\s+/g, t);
}
function m9(e) {
  const t = f9(e.toString());
  return p9(h9(t));
}
function h9(e) {
  return e.includes("\\.")
    ? e
    : !Number.isInteger(parseFloat(e.toString()))
    ? e.replace(".", "\\.")
    : e;
}
function p9(e) {
  return e.replace(/[!-,/:-@[-^`{-~]/g, "\\$&");
}
function pA(e, t = "") {
  return [t, e].filter(Boolean).join("-");
}
function vA(e, t) {
  return `var(${e}${t ? `, ${t}` : ""})`;
}
function yA(e, t = "") {
  return m9(`--${pA(e, t)}`);
}
function iy(e, t, r) {
  const n = yA(e, r);
  return { variable: n, reference: vA(n, t) };
}
function v9(e, t) {
  const r = {};
  for (const n of t) {
    if (Array.isArray(n)) {
      const [o, a] = n;
      r[o] = iy(`${e}-${o}`, a);
      continue;
    }
    r[n] = iy(`${e}-${n}`);
  }
  return r;
}
Va.addPrefix = pA;
Va.cssVar = iy;
Va.defineCssVars = v9;
Va.toVarDefinition = yA;
Va.toVarReference = vA;
var gA = {},
  bA = {},
  rb = {},
  Cl = {},
  y9 = x;
const g9 = [
  "colors",
  "borders",
  "borderWidths",
  "borderStyles",
  "fonts",
  "fontSizes",
  "fontWeights",
  "gradients",
  "letterSpacings",
  "lineHeights",
  "radii",
  "space",
  "shadows",
  "sizes",
  "zIndices",
  "transition",
  "blur",
  "breakpoints",
];
function b9(e) {
  const t = g9;
  return y9.pick(e, t);
}
function S9(e) {
  return e.semanticTokens;
}
function x9(e) {
  const { __cssMap: t, __cssVars: r, __breakpoints: n, ...o } = e;
  return o;
}
Cl.extractSemanticTokens = S9;
Cl.extractTokens = b9;
Cl.omitVars = x9;
var L$ = x,
  $9 = Ba,
  V$ = Cl;
function w9(e) {
  const t = V$.extractTokens(e),
    r = V$.extractSemanticTokens(e),
    n = (a) => $9.pseudoPropNames.includes(a) || a === "default",
    o = {};
  return (
    L$.walkObject(t, (a, s) => {
      a != null && (o[s.join(".")] = { isSemantic: !1, value: a });
    }),
    L$.walkObject(
      r,
      (a, s) => {
        a != null && (o[s.join(".")] = { isSemantic: !0, value: a });
      },
      { stop: (a) => Object.keys(a).every(n) }
    ),
    o
  );
}
rb.flattenTokens = w9;
var z$ = x,
  H$ = tb,
  C9 = Va,
  k9 = rb,
  T9 = Ba;
function W$(e, t) {
  return C9.cssVar(String(e).replace(/\./g, "-"), void 0, t);
}
function P9(e) {
  var s;
  const t = k9.flattenTokens(e),
    r = (s = e.config) == null ? void 0 : s.cssVarPrefix;
  let n = {};
  const o = {};
  function a(i, c) {
    const u = [String(i).split(".")[0], c].join(".");
    if (!t[u]) return c;
    const { reference: f } = W$(u, r);
    return f;
  }
  for (const [i, c] of Object.entries(t)) {
    const { isSemantic: l, value: u } = c,
      { variable: d, reference: f } = W$(i, r);
    if (!l) {
      if (i.startsWith("space")) {
        const h = i.split("."),
          [p, ...v] = h,
          b = `${p}.-${v.join(".")}`,
          y = H$.calc.negate(u),
          S = H$.calc.negate(f);
        o[b] = { value: y, var: d, varRef: S };
      }
      (n[d] = u), (o[i] = { value: u, var: d, varRef: f });
      continue;
    }
    const m = z$.isObject(u) ? u : { default: u };
    (n = z$.mergeWith(
      n,
      Object.entries(m).reduce((h, [p, v]) => {
        var S;
        if (!v) return h;
        const b = a(i, `${v}`);
        if (p === "default") return (h[d] = b), h;
        const y = ((S = T9.pseudoSelectors) == null ? void 0 : S[p]) ?? p;
        return (h[y] = { [d]: b }), h;
      }, {})
    )),
      (o[i] = { value: f, var: d, varRef: f });
  }
  return { cssVars: n, cssMap: o };
}
bA.createThemeVars = P9;
var R9 = x,
  A9 = bA,
  _9 = Cl;
function I9(e) {
  const t = _9.omitVars(e),
    { cssMap: r, cssVars: n } = A9.createThemeVars(t);
  return (
    Object.assign(t, {
      __cssVars: {
        ...{
          "--chakra-ring-inset": "var(--chakra-empty,/*!*/ /*!*/)",
          "--chakra-ring-offset-width": "0px",
          "--chakra-ring-offset-color": "#fff",
          "--chakra-ring-color": "rgba(139, 90, 43, 0.6)",
          "--chakra-ring-offset-shadow": "0 0 #0000",
          "--chakra-ring-shadow": "0 0 #0000",
          "--chakra-space-x-reverse": "0",
          "--chakra-space-y-reverse": "0",
        },
        ...n,
      },
      __cssMap: r,
      __breakpoints: R9.analyzeBreakpoints(t.breakpoints),
    }),
    t
  );
}
gA.toCSSVar = I9;
var SA = Mg,
  nb = Vf,
  E9 = dA,
  xA = Ba,
  M9 = fA,
  Hf = wi,
  F9 = mA,
  j9 = $l,
  D9 = Fg,
  N9 = Dg,
  O9 = Ng,
  B9 = Ug,
  L9 = Lg,
  V9 = Og,
  z9 = Hg,
  H9 = zg,
  W9 = Bg,
  G9 = Qg,
  U9 = Wg,
  K9 = Gg,
  q9 = Vg,
  X9 = Kg,
  Y9 = Yg,
  Z9 = Zg,
  Q9 = Jg,
  J9 = Xg,
  eG = qg,
  tG = tb,
  kl = Va,
  rG = gA,
  nG = rb;
I.css = SA.css;
I.getCss = SA.getCss;
I.createMultiStyleConfigHelpers = nb.createMultiStyleConfigHelpers;
I.defineStyle = nb.defineStyle;
I.defineStyleConfig = nb.defineStyleConfig;
I.getCSSVar = E9.getCSSVar;
I.pseudoPropNames = xA.pseudoPropNames;
I.pseudoSelectors = xA.pseudoSelectors;
I.resolveStyleConfig = M9.resolveStyleConfig;
I.isStyleProp = Hf.isStyleProp;
I.layoutPropNames = Hf.layoutPropNames;
I.propNames = Hf.propNames;
I.systemProps = Hf.systemProps;
I.omitThemingProps = F9.omitThemingProps;
I.tokenToCSSVar = j9.tokenToCSSVar;
I.background = D9.background;
I.border = N9.border;
I.color = O9.color;
I.effect = B9.effect;
I.filter = L9.filter;
I.flexbox = V9.flexbox;
I.grid = z9.grid;
I.interactivity = H9.interactivity;
I.layout = W9.layout;
I.list = G9.list;
I.others = U9.others;
I.position = K9.position;
I.ring = q9.ring;
I.space = X9.space;
I.textDecoration = Y9.textDecoration;
I.transform = Z9.transform;
I.transition = Q9.transition;
I.typography = J9.typography;
I.scroll = eG.scroll;
I.calc = tG.calc;
I.addPrefix = kl.addPrefix;
I.cssVar = kl.cssVar;
I.defineCssVars = kl.defineCssVars;
I.toVarDefinition = kl.toVarDefinition;
I.toVarReference = kl.toVarReference;
I.toCSSVar = rG.toCSSVar;
I.flattenTokens = nG.flattenTokens;
var no = {},
  Se = {},
  $A = {},
  se = {},
  ob = {};
function cy(e, t = {}) {
  let r = !1;
  function n() {
    if (!r) {
      r = !0;
      return;
    }
    throw new Error(
      "[anatomy] .part(...) should only be called once. Did you mean to use .extend(...) ?"
    );
  }
  function o(...u) {
    n();
    for (const d of u) t[d] = c(d);
    return cy(e, t);
  }
  function a(...u) {
    for (const d of u) d in t || (t[d] = c(d));
    return cy(e, t);
  }
  function s() {
    return Object.fromEntries(
      Object.entries(t).map(([d, f]) => [d, f.selector])
    );
  }
  function i() {
    return Object.fromEntries(
      Object.entries(t).map(([d, f]) => [d, f.className])
    );
  }
  function c(u) {
    const m = `chakra-${(["container", "root"].includes(u ?? "") ? [e] : [e, u])
      .filter(Boolean)
      .join("__")}`;
    return { className: m, selector: `.${m}`, toString: () => u };
  }
  return {
    parts: o,
    toPart: c,
    extend: a,
    selectors: s,
    classnames: i,
    get keys() {
      return Object.keys(t);
    },
    __type: {},
  };
}
ob.anatomy = cy;
var Ne = {},
  Oe = ob;
const oG = Oe.anatomy("accordion").parts(
    "root",
    "container",
    "button",
    "panel",
    "icon"
  ),
  aG = Oe.anatomy("alert").parts(
    "title",
    "description",
    "container",
    "icon",
    "spinner"
  ),
  sG = Oe.anatomy("avatar").parts(
    "label",
    "badge",
    "container",
    "excessLabel",
    "group"
  ),
  iG = Oe.anatomy("breadcrumb").parts("link", "item", "container", "separator"),
  cG = Oe.anatomy("button").parts(),
  lG = Oe.anatomy("checkbox").parts("control", "icon", "container", "label"),
  uG = Oe.anatomy("progress").parts("track", "filledTrack", "label"),
  dG = Oe.anatomy("drawer").parts(
    "overlay",
    "dialogContainer",
    "dialog",
    "header",
    "closeButton",
    "body",
    "footer"
  ),
  fG = Oe.anatomy("editable").parts("preview", "input", "textarea"),
  mG = Oe.anatomy("form").parts("container", "requiredIndicator", "helperText"),
  hG = Oe.anatomy("formError").parts("text", "icon"),
  pG = Oe.anatomy("input").parts("addon", "field", "element", "group"),
  vG = Oe.anatomy("list").parts("container", "item", "icon"),
  yG = Oe.anatomy("menu").parts(
    "button",
    "list",
    "item",
    "groupTitle",
    "icon",
    "command",
    "divider"
  ),
  gG = Oe.anatomy("modal").parts(
    "overlay",
    "dialogContainer",
    "dialog",
    "header",
    "closeButton",
    "body",
    "footer"
  ),
  bG = Oe.anatomy("numberinput").parts(
    "root",
    "field",
    "stepperGroup",
    "stepper"
  ),
  SG = Oe.anatomy("pininput").parts("field"),
  xG = Oe.anatomy("popover").parts(
    "content",
    "header",
    "body",
    "footer",
    "popper",
    "arrow",
    "closeButton"
  ),
  $G = Oe.anatomy("progress").parts("label", "filledTrack", "track"),
  wG = Oe.anatomy("radio").parts("container", "control", "label"),
  CG = Oe.anatomy("select").parts("field", "icon"),
  kG = Oe.anatomy("slider").parts(
    "container",
    "track",
    "thumb",
    "filledTrack",
    "mark"
  ),
  TG = Oe.anatomy("stat").parts(
    "container",
    "label",
    "helpText",
    "number",
    "icon"
  ),
  PG = Oe.anatomy("switch").parts("container", "track", "thumb", "label"),
  RG = Oe.anatomy("table").parts(
    "table",
    "thead",
    "tbody",
    "tr",
    "th",
    "td",
    "tfoot",
    "caption"
  ),
  AG = Oe.anatomy("tabs").parts(
    "root",
    "tab",
    "tablist",
    "tabpanel",
    "tabpanels",
    "indicator"
  ),
  _G = Oe.anatomy("tag").parts("container", "label", "closeButton"),
  IG = Oe.anatomy("card").parts("container", "header", "body", "footer"),
  EG = Oe.anatomy("stepper").parts(
    "stepper",
    "step",
    "title",
    "description",
    "indicator",
    "separator",
    "icon",
    "number"
  );
Ne.accordionAnatomy = oG;
Ne.alertAnatomy = aG;
Ne.avatarAnatomy = sG;
Ne.breadcrumbAnatomy = iG;
Ne.buttonAnatomy = cG;
Ne.cardAnatomy = IG;
Ne.checkboxAnatomy = lG;
Ne.circularProgressAnatomy = uG;
Ne.drawerAnatomy = dG;
Ne.editableAnatomy = fG;
Ne.formAnatomy = mG;
Ne.formErrorAnatomy = hG;
Ne.inputAnatomy = pG;
Ne.listAnatomy = vG;
Ne.menuAnatomy = yG;
Ne.modalAnatomy = gG;
Ne.numberInputAnatomy = bG;
Ne.pinInputAnatomy = SG;
Ne.popoverAnatomy = xG;
Ne.progressAnatomy = $G;
Ne.radioAnatomy = wG;
Ne.selectAnatomy = CG;
Ne.sliderAnatomy = kG;
Ne.statAnatomy = TG;
Ne.stepperAnatomy = EG;
Ne.switchAnatomy = PG;
Ne.tableAnatomy = RG;
Ne.tabsAnatomy = AG;
Ne.tagAnatomy = _G;
var MG = ob,
  Be = Ne;
se.anatomy = MG.anatomy;
se.accordionAnatomy = Be.accordionAnatomy;
se.alertAnatomy = Be.alertAnatomy;
se.avatarAnatomy = Be.avatarAnatomy;
se.breadcrumbAnatomy = Be.breadcrumbAnatomy;
se.buttonAnatomy = Be.buttonAnatomy;
se.cardAnatomy = Be.cardAnatomy;
se.checkboxAnatomy = Be.checkboxAnatomy;
se.circularProgressAnatomy = Be.circularProgressAnatomy;
se.drawerAnatomy = Be.drawerAnatomy;
se.editableAnatomy = Be.editableAnatomy;
se.formAnatomy = Be.formAnatomy;
se.formErrorAnatomy = Be.formErrorAnatomy;
se.inputAnatomy = Be.inputAnatomy;
se.listAnatomy = Be.listAnatomy;
se.menuAnatomy = Be.menuAnatomy;
se.modalAnatomy = Be.modalAnatomy;
se.numberInputAnatomy = Be.numberInputAnatomy;
se.pinInputAnatomy = Be.pinInputAnatomy;
se.popoverAnatomy = Be.popoverAnatomy;
se.progressAnatomy = Be.progressAnatomy;
se.radioAnatomy = Be.radioAnatomy;
se.selectAnatomy = Be.selectAnatomy;
se.sliderAnatomy = Be.sliderAnatomy;
se.statAnatomy = Be.statAnatomy;
se.stepperAnatomy = Be.stepperAnatomy;
se.switchAnatomy = Be.switchAnatomy;
se.tableAnatomy = Be.tableAnatomy;
se.tabsAnatomy = Be.tabsAnatomy;
se.tagAnatomy = Be.tagAnatomy;
var FG = se,
  Tl = I;
const { definePartsStyle: jG, defineMultiStyleConfig: DG } =
    Tl.createMultiStyleConfigHelpers(FG.accordionAnatomy.keys),
  NG = Tl.defineStyle({
    borderTopWidth: "1px",
    borderColor: "inherit",
    _last: { borderBottomWidth: "1px" },
  }),
  OG = Tl.defineStyle({
    transitionProperty: "common",
    transitionDuration: "normal",
    fontSize: "md",
    _focusVisible: { boxShadow: "outline" },
    _hover: { bg: "blackAlpha.50" },
    _disabled: { opacity: 0.4, cursor: "not-allowed" },
    px: "4",
    py: "2",
  }),
  BG = Tl.defineStyle({ pt: "2", px: "4", pb: "5" }),
  LG = Tl.defineStyle({ fontSize: "1.25em" }),
  VG = jG({ container: NG, button: OG, panel: BG, icon: LG }),
  zG = DG({ baseStyle: VG });
$A.accordionTheme = zG;
var wA = {},
  Pt = {},
  xt = {},
  Ye = {};
function hr(e, t, r) {
  return Math.min(Math.max(e, r), t);
}
class HG extends Error {
  constructor(t) {
    super(`Failed to parse color: "${t}"`);
  }
}
var ks = HG;
function jo(e) {
  if (typeof e != "string") throw new ks(e);
  if (e.trim().toLowerCase() === "transparent") return [0, 0, 0, 0];
  let t = e.trim();
  t = ZG.test(e) ? UG(e) : e;
  const r = KG.exec(t);
  if (r) {
    const s = Array.from(r).slice(1);
    return [
      ...s.slice(0, 3).map((i) => parseInt(tl(i, 2), 16)),
      parseInt(tl(s[3] || "f", 2), 16) / 255,
    ];
  }
  const n = qG.exec(t);
  if (n) {
    const s = Array.from(n).slice(1);
    return [
      ...s.slice(0, 3).map((i) => parseInt(i, 16)),
      parseInt(s[3] || "ff", 16) / 255,
    ];
  }
  const o = XG.exec(t);
  if (o) {
    const s = Array.from(o).slice(1);
    return [
      ...s.slice(0, 3).map((i) => parseInt(i, 10)),
      parseFloat(s[3] || "1"),
    ];
  }
  const a = YG.exec(t);
  if (a) {
    const [s, i, c, l] = Array.from(a).slice(1).map(parseFloat);
    if (hr(0, 100, i) !== i) throw new ks(e);
    if (hr(0, 100, c) !== c) throw new ks(e);
    return [...QG(s, i, c), Number.isNaN(l) ? 1 : l];
  }
  throw new ks(e);
}
function WG(e) {
  let t = 5381,
    r = e.length;
  for (; r; ) t = (t * 33) ^ e.charCodeAt(--r);
  return (t >>> 0) % 2341;
}
const G$ = (e) => parseInt(e.replace(/_/g, ""), 36),
  GG =
    "1q29ehhb 1n09sgk7 1kl1ekf_ _yl4zsno 16z9eiv3 1p29lhp8 _bd9zg04 17u0____ _iw9zhe5 _to73___ _r45e31e _7l6g016 _jh8ouiv _zn3qba8 1jy4zshs 11u87k0u 1ro9yvyo 1aj3xael 1gz9zjz0 _3w8l4xo 1bf1ekf_ _ke3v___ _4rrkb__ 13j776yz _646mbhl _nrjr4__ _le6mbhl 1n37ehkb _m75f91n _qj3bzfz 1939yygw 11i5z6x8 _1k5f8xs 1509441m 15t5lwgf _ae2th1n _tg1ugcv 1lp1ugcv 16e14up_ _h55rw7n _ny9yavn _7a11xb_ 1ih442g9 _pv442g9 1mv16xof 14e6y7tu 1oo9zkds 17d1cisi _4v9y70f _y98m8kc 1019pq0v 12o9zda8 _348j4f4 1et50i2o _8epa8__ _ts6senj 1o350i2o 1mi9eiuo 1259yrp0 1ln80gnw _632xcoy 1cn9zldc _f29edu4 1n490c8q _9f9ziet 1b94vk74 _m49zkct 1kz6s73a 1eu9dtog _q58s1rz 1dy9sjiq __u89jo3 _aj5nkwg _ld89jo3 13h9z6wx _qa9z2ii _l119xgq _bs5arju 1hj4nwk9 1qt4nwk9 1ge6wau6 14j9zlcw 11p1edc_ _ms1zcxe _439shk6 _jt9y70f _754zsow 1la40eju _oq5p___ _x279qkz 1fa5r3rv _yd2d9ip _424tcku _8y1di2_ _zi2uabw _yy7rn9h 12yz980_ __39ljp6 1b59zg0x _n39zfzp 1fy9zest _b33k___ _hp9wq92 1il50hz4 _io472ub _lj9z3eo 19z9ykg0 _8t8iu3a 12b9bl4a 1ak5yw0o _896v4ku _tb8k8lv _s59zi6t _c09ze0p 1lg80oqn 1id9z8wb _238nba5 1kq6wgdi _154zssg _tn3zk49 _da9y6tc 1sg7cv4f _r12jvtt 1gq5fmkz 1cs9rvci _lp9jn1c _xw1tdnb 13f9zje6 16f6973h _vo7ir40 _bt5arjf _rc45e4t _hr4e100 10v4e100 _hc9zke2 _w91egv_ _sj2r1kk 13c87yx8 _vqpds__ _ni8ggk8 _tj9yqfb 1ia2j4r4 _7x9b10u 1fc9ld4j 1eq9zldr _5j9lhpx _ez9zl6o _md61fzm"
      .split(" ")
      .reduce((e, t) => {
        const r = G$(t.substring(0, 3)),
          n = G$(t.substring(3)).toString(16);
        let o = "";
        for (let a = 0; a < 6 - n.length; a++) o += "0";
        return (e[r] = `${o}${n}`), e;
      }, {});
function UG(e) {
  const t = e.toLowerCase().trim(),
    r = GG[WG(t)];
  if (!r) throw new ks(e);
  return `#${r}`;
}
const tl = (e, t) =>
    Array.from(Array(t))
      .map(() => e)
      .join(""),
  KG = new RegExp(`^#${tl("([a-f0-9])", 3)}([a-f0-9])?$`, "i"),
  qG = new RegExp(`^#${tl("([a-f0-9]{2})", 3)}([a-f0-9]{2})?$`, "i"),
  XG = new RegExp(
    `^rgba?\\(\\s*(\\d+)\\s*${tl(
      ",\\s*(\\d+)\\s*",
      2
    )}(?:,\\s*([\\d.]+))?\\s*\\)$`,
    "i"
  ),
  YG =
    /^hsla?\(\s*([\d.]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%(?:\s*,\s*([\d.]+))?\s*\)$/i,
  ZG = /^[a-z]+$/i,
  U$ = (e) => Math.round(e * 255),
  QG = (e, t, r) => {
    let n = r / 100;
    if (t === 0) return [n, n, n].map(U$);
    const o = (((e % 360) + 360) % 360) / 60,
      a = (1 - Math.abs(2 * n - 1)) * (t / 100),
      s = a * (1 - Math.abs((o % 2) - 1));
    let i = 0,
      c = 0,
      l = 0;
    o >= 0 && o < 1
      ? ((i = a), (c = s))
      : o >= 1 && o < 2
      ? ((i = s), (c = a))
      : o >= 2 && o < 3
      ? ((c = a), (l = s))
      : o >= 3 && o < 4
      ? ((c = s), (l = a))
      : o >= 4 && o < 5
      ? ((i = s), (l = a))
      : o >= 5 && o < 6 && ((i = a), (l = s));
    const u = n - a / 2,
      d = i + u,
      f = c + u,
      m = l + u;
    return [d, f, m].map(U$);
  };
function Pl(e) {
  const [t, r, n, o] = jo(e).map((d, f) => (f === 3 ? d : d / 255)),
    a = Math.max(t, r, n),
    s = Math.min(t, r, n),
    i = (a + s) / 2;
  if (a === s) return [0, 0, i, o];
  const c = a - s,
    l = i > 0.5 ? c / (2 - a - s) : c / (a + s);
  return [
    60 *
      (t === a
        ? (r - n) / c + (r < n ? 6 : 0)
        : r === a
        ? (n - t) / c + 2
        : (t - r) / c + 4),
    l,
    i,
    o,
  ];
}
function Rl(e, t, r, n) {
  return `hsla(${(e % 360).toFixed()}, ${hr(0, 100, t * 100).toFixed()}%, ${hr(
    0,
    100,
    r * 100
  ).toFixed()}%, ${parseFloat(hr(0, 1, n).toFixed(3))})`;
}
function JG(e, t) {
  const [r, n, o, a] = Pl(e);
  return Rl(r + t, n, o, a);
}
function CA(e, t) {
  const [r, n, o, a] = Pl(e);
  return Rl(r, n, o - t, a);
}
function kA(e, t) {
  const [r, n, o, a] = Pl(e);
  return Rl(r, n - t, o, a);
}
function lf(e) {
  if (e === "transparent") return 0;
  function t(a) {
    const s = a / 255;
    return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  }
  const [r, n, o] = jo(e);
  return 0.2126 * t(r) + 0.7152 * t(n) + 0.0722 * t(o);
}
function TA(e, t) {
  const r = lf(e),
    n = lf(t);
  return r > n ? (r + 0.05) / (n + 0.05) : (n + 0.05) / (r + 0.05);
}
function Wf(e, t, r, n) {
  return `rgba(${hr(0, 255, e).toFixed()}, ${hr(0, 255, t).toFixed()}, ${hr(
    0,
    255,
    r
  ).toFixed()}, ${parseFloat(hr(0, 1, n).toFixed(3))})`;
}
function PA(e, t, r) {
  const n = (C, T) => (T === 3 ? C : C / 255),
    [o, a, s, i] = jo(e).map(n),
    [c, l, u, d] = jo(t).map(n),
    f = d - i,
    m = r * 2 - 1,
    p = ((m * f === -1 ? m : m + f / (1 + m * f)) + 1) / 2,
    v = 1 - p,
    b = (o * v + c * p) * 255,
    y = (a * v + l * p) * 255,
    S = (s * v + u * p) * 255,
    w = d * r + i * (1 - r);
  return Wf(b, y, S, w);
}
function e8(...e) {
  return (t) => {
    const r = e.length - 1,
      n = hr(0, r, Math.floor(t * r)),
      o = hr(0, r, Math.ceil(t * r)),
      a = e[n],
      s = e[o],
      i = 1 / r,
      c = (t - i * n) / i;
    return PA(a, s, c);
  };
}
const t8 = { decorative: 1.5, readable: 3, aa: 4.5, aaa: 7 };
function r8(e, t = "aa", r = "#fff") {
  return TA(e, r) < t8[t];
}
function n8(e, t) {
  return CA(e, -t);
}
function RA(e, t) {
  const [r, n, o, a] = jo(e);
  return Wf(r, n, o, a - t);
}
function o8(e, t) {
  return RA(e, -t);
}
function AA(e) {
  return lf(e) > 0.179;
}
function a8(e) {
  return AA(e) ? "#000" : "#fff";
}
function s8(e, t) {
  return kA(e, -t);
}
function i8(e) {
  const [t, r, n, o] = jo(e);
  let a = (s) => {
    const i = hr(0, 255, s).toString(16);
    return i.length === 1 ? `0${i}` : i;
  };
  return `#${a(t)}${a(r)}${a(n)}${o < 1 ? a(Math.round(o * 255)) : ""}`;
}
function c8(e) {
  return Wf(...jo(e));
}
function l8(e) {
  return Rl(...Pl(e));
}
Ye.ColorError = ks;
Ye.adjustHue = JG;
Ye.darken = CA;
Ye.desaturate = kA;
Ye.getContrast = TA;
Ye.getLuminance = lf;
Ye.getScale = e8;
Ye.guard = hr;
Ye.hasBadContrast = r8;
Ye.hsla = Rl;
Ye.lighten = n8;
Ye.mix = PA;
Ye.opacify = o8;
Ye.parseToHsla = Pl;
Ye.parseToRgba = jo;
Ye.readableColor = a8;
Ye.readableColorIsBlack = AA;
Ye.rgba = Wf;
Ye.saturate = s8;
Ye.toHex = i8;
Ye.toHsla = l8;
Ye.toRgba = c8;
Ye.transparentize = RA;
var u8 = I,
  ht = Ye;
const d8 = (e) => Object.keys(e).length === 0;
function f8(e, t, r, n, o) {
  for (t = t.split ? t.split(".") : t, n = 0; n < t.length; n++)
    e = e ? e[t[n]] : o;
  return e === o ? r : e;
}
const jr = (e, t, r) => {
    const n = f8(e, `colors.${t}`, t);
    try {
      return ht.toHex(n), n;
    } catch {
      return r ?? "#000000";
    }
  },
  m8 = (e, t, r) => u8.getCSSVar(e, "colors", t) ?? r,
  h8 = (e) => {
    const [t, r, n] = ht.parseToRgba(e);
    return (t * 299 + r * 587 + n * 114) / 1e3;
  },
  ab = (e) => (t) => {
    const r = jr(t, e);
    return h8(r) < 128 ? "dark" : "light";
  },
  p8 = (e) => (t) => ab(e)(t) === "dark",
  v8 = (e) => (t) => ab(e)(t) === "light",
  y8 = (e, t) => (r) => {
    const n = jr(r, e);
    return ht.transparentize(n, 1 - t);
  },
  g8 = (e, t) => (r) => {
    const n = jr(r, e);
    return ht.toHex(ht.mix(n, "#fff", t));
  },
  b8 = (e, t) => (r) => {
    const n = jr(r, e);
    return ht.toHex(ht.mix(n, "#000", t / 100));
  },
  S8 = (e, t) => (r) => {
    const n = jr(r, e);
    return ht.toHex(ht.darken(n, t / 100));
  },
  x8 = (e, t) => (r) => {
    const n = jr(r, e);
    ht.toHex(ht.lighten(n, t / 100));
  },
  $8 = (e, t) => (r) => ht.getContrast(jr(r, t), jr(r, e)),
  w8 = (e, t, r) => (n) => _A(jr(n, t), jr(n, e), r);
function _A(e, t, r = { level: "AA", size: "small" }) {
  const n = IA(e, t);
  switch ((r.level ?? "AA") + (r.size ?? "small")) {
    case "AAsmall":
    case "AAAlarge":
      return n >= 4.5;
    case "AAlarge":
      return n >= 3;
    case "AAAsmall":
      return n >= 7;
    default:
      return !1;
  }
}
function IA(e, t) {
  return (
    (Math.max(ht.getLuminance(e), ht.getLuminance(t)) + 0.05) /
    (Math.min(ht.getLuminance(e), ht.getLuminance(t)) + 0.05)
  );
}
const C8 = (e) => (t) => {
  const r = jr(t, e),
    n = ht.parseToHsla(r),
    o = Object.assign(n, [(n[0] + 180) % 360]);
  return ht.toHex(ht.hsla(...o));
};
function k8(e = "1rem", t = "rgba(255, 255, 255, 0.15)") {
  return {
    backgroundImage: `linear-gradient(
    45deg,
    ${t} 25%,
    transparent 25%,
    transparent 50%,
    ${t} 50%,
    ${t} 75%,
    transparent 75%,
    transparent
  )`,
    backgroundSize: `${e} ${e}`,
  };
}
const T8 = () =>
  `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padEnd(6, "0")}`;
function P8(e) {
  const t = T8();
  return !e || d8(e)
    ? t
    : e.string && e.colors
    ? A8(e.string, e.colors)
    : e.string && !e.colors
    ? R8(e.string)
    : e.colors && !e.string
    ? _8(e.colors)
    : t;
}
function R8(e) {
  let t = 0;
  if (e.length === 0) return t.toString();
  for (let n = 0; n < e.length; n += 1)
    (t = e.charCodeAt(n) + ((t << 5) - t)), (t = t & t);
  let r = "#";
  for (let n = 0; n < 3; n += 1) {
    const o = (t >> (n * 8)) & 255;
    r += `00${o.toString(16)}`.substr(-2);
  }
  return r;
}
function A8(e, t) {
  let r = 0;
  if (e.length === 0) return t[0];
  for (let n = 0; n < e.length; n += 1)
    (r = e.charCodeAt(n) + ((r << 5) - r)), (r = r & r);
  return (r = ((r % t.length) + t.length) % t.length), t[r];
}
function _8(e) {
  return e[Math.floor(Math.random() * e.length)];
}
xt.blacken = b8;
xt.complementary = C8;
xt.contrast = $8;
xt.darken = S8;
xt.generateStripe = k8;
xt.getColor = jr;
xt.getColorVar = m8;
xt.isAccessible = w8;
xt.isDark = p8;
xt.isLight = v8;
xt.isReadable = _A;
xt.lighten = x8;
xt.randomColor = P8;
xt.readability = IA;
xt.tone = ab;
xt.transparentize = y8;
xt.whiten = g8;
var sb = {};
function I8(e, t) {
  return (r) => (r.colorMode === "dark" ? t : e);
}
function E8(e) {
  const { orientation: t, vertical: r, horizontal: n } = e;
  return t ? (t === "vertical" ? r : n) : {};
}
sb.mode = I8;
sb.orient = E8;
var EA = {},
  M8 = x;
const F8 = (e) => (
  M8.warn({
    condition: !0,
    message: [
      "[chakra-ui]: createBreakpoints(...) will be deprecated pretty soon",
      "simply pass the breakpoints as an object. Remove the createBreakpoints(..) call",
    ].join(""),
  }),
  { base: "0em", ...e }
);
EA.createBreakpoints = F8;
var MA = {},
  j8 = x;
function FA(e) {
  return j8.isObject(e) && e.reference ? e.reference : String(e);
}
const Gf = (e, ...t) => t.map(FA).join(` ${e} `).replace(/calc/g, ""),
  K$ = (...e) => `calc(${Gf("+", ...e)})`,
  q$ = (...e) => `calc(${Gf("-", ...e)})`,
  ly = (...e) => `calc(${Gf("*", ...e)})`,
  X$ = (...e) => `calc(${Gf("/", ...e)})`,
  Y$ = (e) => {
    const t = FA(e);
    return t != null && !Number.isNaN(parseFloat(t))
      ? String(t).startsWith("-")
        ? String(t).slice(1)
        : `-${t}`
      : ly(t, -1);
  },
  gs = Object.assign(
    (e) => ({
      add: (...t) => gs(K$(e, ...t)),
      subtract: (...t) => gs(q$(e, ...t)),
      multiply: (...t) => gs(ly(e, ...t)),
      divide: (...t) => gs(X$(e, ...t)),
      negate: () => gs(Y$(e)),
      toString: () => e.toString(),
    }),
    { add: K$, subtract: q$, multiply: ly, divide: X$, negate: Y$ }
  );
MA.calc = gs;
var Ci = {};
function jA(e) {
  return !Number.isInteger(parseFloat(e.toString()));
}
function D8(e, t = "-") {
  return e.replace(/\s+/g, t);
}
function DA(e) {
  const t = D8(e.toString());
  return t.includes("\\.") ? e : jA(e) ? t.replace(".", "\\.") : e;
}
function NA(e, t = "") {
  return [t, DA(e)].filter(Boolean).join("-");
}
function OA(e, t) {
  return `var(${DA(e)}${t ? `, ${t}` : ""})`;
}
function BA(e, t = "") {
  return `--${NA(e, t)}`;
}
function N8(e, t) {
  const r = BA(e, t == null ? void 0 : t.prefix);
  return { variable: r, reference: OA(r, O8(t == null ? void 0 : t.fallback)) };
}
function O8(e) {
  return typeof e == "string" ? e : e == null ? void 0 : e.reference;
}
Ci.addPrefix = NA;
Ci.cssVar = N8;
Ci.isDecimal = jA;
Ci.toVar = BA;
Ci.toVarRef = OA;
(function (e) {
  var t = se,
    r = xt,
    n = sb,
    o = EA,
    a = MA,
    s = Ci;
  Object.defineProperty(e, "anatomy", {
    enumerable: !0,
    get: function () {
      return t.anatomy;
    },
  }),
    (e.blacken = r.blacken),
    (e.complementary = r.complementary),
    (e.contrast = r.contrast),
    (e.darken = r.darken),
    (e.generateStripe = r.generateStripe),
    (e.getColor = r.getColor),
    (e.getColorVar = r.getColorVar),
    (e.isAccessible = r.isAccessible),
    (e.isDark = r.isDark),
    (e.isLight = r.isLight),
    (e.isReadable = r.isReadable),
    (e.lighten = r.lighten),
    (e.randomColor = r.randomColor),
    (e.readability = r.readability),
    (e.tone = r.tone),
    (e.transparentize = r.transparentize),
    (e.whiten = r.whiten),
    (e.mode = n.mode),
    (e.orient = n.orient),
    (e.createBreakpoints = o.createBreakpoints),
    (e.calc = a.calc),
    (e.addPrefix = s.addPrefix),
    (e.cssVar = s.cssVar),
    (e.isDecimal = s.isDecimal),
    (e.toVar = s.toVar),
    (e.toVarRef = s.toVarRef);
})(Pt);
var B8 = se,
  ib = I,
  L8 = Pt;
const { definePartsStyle: Al, defineMultiStyleConfig: V8 } =
    ib.createMultiStyleConfigHelpers(B8.alertAnatomy.keys),
  pr = ib.cssVar("alert-fg"),
  Xn = ib.cssVar("alert-bg"),
  z8 = Al({
    container: { bg: Xn.reference, px: "4", py: "3" },
    title: { fontWeight: "bold", lineHeight: "6", marginEnd: "2" },
    description: { lineHeight: "6" },
    icon: {color: pr.reference,
      flexShrink: 0,
      marginEnd: "3",
      w: "5",
      h: "6",
    },
    spinner: {color: pr.reference,
      flexShrink: 0,
      marginEnd: "3",
      w: "5",
      h: "5",
    },
  });
function cb(e) {
  const { theme: t, colorScheme: r } = e,
    n = L8.transparentize(`${r}.200`, 0.16)(t);
  return { light: `colors.${r}.100`, dark: n };
}
const H8 = Al((e) => {
    const { colorScheme: t } = e,
      r = cb(e);
    return {
      container: {
        [pr.variable]: `colors.${t}.600`,
        [Xn.variable]: r.light,
        _dark: { [pr.variable]: `colors.${t}.200`, [Xn.variable]: r.dark },
      },
    };
  }),
  W8 = Al((e) => {
    const { colorScheme: t } = e,
      r = cb(e);
    return {
      container: {
        [pr.variable]: `colors.${t}.600`,
        [Xn.variable]: r.light,
        _dark: { [pr.variable]: `colors.${t}.200`, [Xn.variable]: r.dark },
        paddingStart: "3",
        borderStartWidth: "4px",
        borderStartColor: pr.reference,
      },
    };
  }),
  G8 = Al((e) => {
    const { colorScheme: t } = e,
      r = cb(e);
    return {
      container: {
        [pr.variable]: `colors.${t}.600`,
        [Xn.variable]: r.light,
        _dark: { [pr.variable]: `colors.${t}.200`, [Xn.variable]: r.dark },
        pt: "2",
        borderTopWidth: "4px",
        borderTopColor: pr.reference,
      },
    };
  }),
  U8 = Al((e) => {
    const { colorScheme: t } = e;
    return {
      container: {
        [pr.variable]: "colors.white",
        [Xn.variable]: `colors.${t}.600`,
        _dark: {
          [pr.variable]: "colors.gray.900",
          [Xn.variable]: `colors.${t}.200`,
        },
        color: pr.reference,
      },
    };
  }),
  K8 = { subtle: H8, "left-accent": W8, "top-accent": G8, solid: U8 },
  q8 = V8({
    baseStyle: z8,
    variants: K8,
    defaultProps: { variant: "subtle", colorScheme: "blue" },
  });
wA.alertTheme = q8;
var LA = {},
  lb = {};
const X8 = {
  px: "1px",
  0.5: "0.125rem",
  1: "0.25rem",
  1.5: "0.375rem",
  2: "0.5rem",
  2.5: "0.625rem",
  3: "0.75rem",
  3.5: "0.875rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  7: "1.75rem",
  8: "2rem",
  9: "2.25rem",
  10: "2.5rem",
  12: "3rem",
  14: "3.5rem",
  16: "4rem",
  20: "5rem",
  24: "6rem",
  28: "7rem",
  32: "8rem",
  36: "9rem",
  40: "10rem",
  44: "11rem",
  48: "12rem",
  52: "13rem",
  56: "14rem",
  60: "15rem",
  64: "16rem",
  72: "18rem",
  80: "20rem",
  96: "24rem",
};
lb.spacing = X8;
var Y8 = lb;
const Z8 = {
    max: "max-content",
    min: "min-content",
    full: "100%",
    "3xs": "14rem",
    "2xs": "16rem",
    xs: "20rem",
    sm: "24rem",
    md: "28rem",
    lg: "32rem",
    xl: "36rem",
    "2xl": "42rem",
    "3xl": "48rem",
    "4xl": "56rem",
    "5xl": "64rem",
    "6xl": "72rem",
    "7xl": "80rem",
    "8xl": "90rem",
    prose: "60ch",
  },
  Q8 = { sm: "640px", md: "768px", lg: "1024px", xl: "1280px" },
  J8 = { ...Y8.spacing, ...Z8, container: Q8 };
var VA = J8,
  oo = {};
const eU = (e) => typeof e == "function";
function tU(e, ...t) {
  return eU(e) ? e(...t) : e;
}
oo.runIfFn = tU;
var rU = se,
  ao = I,
  Z$ = Pt,
  nU = VA,
  bp = oo;
const { definePartsStyle: zA, defineMultiStyleConfig: oU } =
    ao.createMultiStyleConfigHelpers(rU.avatarAnatomy.keys),
  Ws = ao.cssVar("avatar-border-color"),
  Fc = ao.cssVar("avatar-bg"),
  rl = ao.cssVar("avatar-font-size"),
  Js = ao.cssVar("avatar-size"),
  aU = ao.defineStyle({
    borderRadius: "full",
    border: "0.2em solid",
    borderColor: Ws.reference,
    [Ws.variable]: "white",
    _dark: { [Ws.variable]: "colors.gray.800" },
  }),
  sU = ao.defineStyle({
    bg: Fc.reference,
    fontSize: rl.reference,
    width: Js.reference,
    height: Js.reference,
    lineHeight: "1",
    [Fc.variable]: "colors.gray.200",
    _dark: { [Fc.variable]: "colors.whiteAlpha.400" },
  }),
  iU = ao.defineStyle((e) => {
    const { name: t, theme: r } = e,
      n = t ? Z$.randomColor({ string: t }) : "colors.gray.400",
      o = Z$.isDark(n)(r);
    let a = "white";
    return (
      o || (a = "gray.800"),
      {
        bg: Fc.reference,
        fontSize: rl.reference,
        color: a,
        borderColor: Ws.reference,
        verticalAlign: "top",
        width: Js.reference,
        height: Js.reference,
        "&:not([data-loaded])": { [Fc.variable]: n },
        [Ws.variable]: "colors.white",
        _dark: { [Ws.variable]: "colors.gray.800" },
      }
    );
  }),
  cU = ao.defineStyle({ fontSize: rl.reference, lineHeight: "1" }),
  lU = zA((e) => ({
    badge: bp.runIfFn(aU, e),
    excessLabel: bp.runIfFn(sU, e),
    container: bp.runIfFn(iU, e),
    label: cU,
  }));
function So(e) {
  const t = e !== "100%" ? nU[e] : void 0;
  return zA({
    container: {
      [Js.variable]: t ?? e,
      [rl.variable]: `calc(${t ?? e} / 2.5)`,
    },
    excessLabel: {
      [Js.variable]: t ?? e,
      [rl.variable]: `calc(${t ?? e} / 2.5)`,
    },
  });
}
const uU = {
    "2xs": So(4),
    xs: So(6),
    sm: So(8),
    md: So(12),
    lg: So(16),
    xl: So(24),
    "2xl": So(32),
    full: So("100%"),
  },
  dU = oU({ baseStyle: lU, sizes: uU, defaultProps: { size: "md" } });
LA.avatarTheme = dU;
var _l = {},
  ki = I,
  ub = Pt;
const Et = ki.defineCssVars("badge", ["bg", "color", "shadow"]),
  fU = ki.defineStyle({
    px: 1,
    textTransform: "uppercase",
    fontSize: "xs",
    borderRadius: "sm",
    fontWeight: "bold",
    bg: Et.bg.reference,
    color: Et.color.reference,
    boxShadow: Et.shadow.reference,
  }),
  mU = ki.defineStyle((e) => {
    const { colorScheme: t, theme: r } = e,
      n = ub.transparentize(`${t}.500`, 0.6)(r);
    return {
      [Et.bg.variable]: `colors.${t}.500`,
      [Et.color.variable]: "colors.white",
      _dark: {
        [Et.bg.variable]: n,
        [Et.color.variable]: "colors.whiteAlpha.800",
      },
    };
  }),
  hU = ki.defineStyle((e) => {
    const { colorScheme: t, theme: r } = e,
      n = ub.transparentize(`${t}.200`, 0.16)(r);
    return {
      [Et.bg.variable]: `colors.${t}.100`,
      [Et.color.variable]: `colors.${t}.800`,
      _dark: { [Et.bg.variable]: n, [Et.color.variable]: `colors.${t}.200` },
    };
  }),
  pU = ki.defineStyle((e) => {
    const { colorScheme: t, theme: r } = e,
      n = ub.transparentize(`${t}.200`, 0.8)(r);
    return {
      [Et.color.variable]: `colors.${t}.500`,
      _dark: { [Et.color.variable]: n },
      [Et.shadow.variable]: `inset 0 0 0px 1px ${Et.color.reference}`,
    };
  }),
  vU = { solid: mU, subtle: hU, outline: pU },
  yU = ki.defineStyleConfig({
    baseStyle: fU,
    variants: vU,
    defaultProps: { variant: "subtle", colorScheme: "gray" },
  });
_l.badgeTheme = yU;
_l.badgeVars = Et;
var HA = {},
  gU = se,
  db = I;
const { defineMultiStyleConfig: bU, definePartsStyle: SU } =
    db.createMultiStyleConfigHelpers(gU.breadcrumbAnatomy.keys),
  Sp = db.cssVar("breadcrumb-link-decor"),
  xU = db.defineStyle({
    transitionProperty: "common",
    transitionDuration: "fast",
    transitionTimingFunction: "ease-out",
    outline: "none",
    color: "inherit",
    textDecoration: Sp.reference,
    [Sp.variable]: "none",
    "&:not([aria-current=page])": {
      cursor: "pointer",
      _hover: { [Sp.variable]: "underline" },
      _focusVisible: { boxShadow: "outline" },
    },
  }),
  $U = SU({ link: xU }),
  wU = bU({ baseStyle: $U });
HA.breadcrumbTheme = wU;
var WA = {},
  Yr = I,
  mt = Pt,
  CU = oo;
const kU = Yr.defineStyle({
    lineHeight: "1.2",
    borderRadius: "md",
    fontWeight: "semibold",
    transitionProperty: "common",
    transitionDuration: "normal",
    _focusVisible: { boxShadow: "outline" },
    _disabled: { opacity: 0.4, cursor: "not-allowed", boxShadow: "none" },
    _hover: { _disabled: { bg: "initial" } },
  }),
  GA = Yr.defineStyle((e) => {
    const { colorScheme: t, theme: r } = e;
    if (t === "gray")
      return {color: mt.mode("gray.800", "whiteAlpha.900")(e),
        _hover: { bg: mt.mode("gray.100", "whiteAlpha.200")(e) },
        _active: { bg: mt.mode("gray.200", "whiteAlpha.300")(e) },
      };
    const n = mt.transparentize(`${t}.200`, 0.12)(r),
      o = mt.transparentize(`${t}.200`, 0.24)(r);
    return {color: mt.mode(`${t}.600`, `${t}.200`)(e),
      bg: "transparent",
      _hover: { bg: mt.mode(`${t}.50`, n)(e) },
      _active: { bg: mt.mode(`${t}.100`, o)(e) },
    };
  }),
  TU = Yr.defineStyle((e) => {
    const { colorScheme: t } = e,
      r = mt.mode("gray.200", "whiteAlpha.300")(e);
    return {border: "1px solid",
      borderColor: t === "gray" ? r : "currentColor",
      ".chakra-button__group[data-attached][data-orientation=horizontal] > &:not(:last-of-type)":
        { marginEnd: "-1px" },
      ".chakra-button__group[data-attached][data-orientation=vertical] > &:not(:last-of-type)":
        { marginBottom: "-1px" },
      ...CU.runIfFn(GA, e),
    };
  }),
  PU = {
    yellow: {
      bg: "yellow.400",
      color: "black",
      hoverBg: "yellow.500",
      activeBg: "yellow.600",
    },
    cyan: {
      bg: "cyan.400",
      color: "black",
      hoverBg: "cyan.500",
      activeBg: "cyan.600",
    },
  },
  RU = Yr.defineStyle((e) => {
    const { colorScheme: t } = e;
    if (t === "gray") {
      const i = mt.mode("gray.100", "whiteAlpha.200")(e);
      return {
        bg: i,
        color: mt.mode("gray.800", "whiteAlpha.900")(e),
        _hover: {
          bg: mt.mode("gray.200", "whiteAlpha.300")(e),
          _disabled: { bg: i },
        },
        _active: { bg: mt.mode("gray.300", "whiteAlpha.400")(e) },
      };
    }
    const {
        bg: r = `${t}.500`,
        color: n = "white",
        hoverBg: o = `${t}.600`,
        activeBg: a = `${t}.700`,
      } = PU[t] ?? {},
      s = mt.mode(r, `${t}.200`)(e);
    return {
      bg: s,
      color: mt.mode(n, "gray.800")(e),
      _hover: { bg: mt.mode(o, `${t}.300`)(e), _disabled: { bg: s } },
      _active: { bg: mt.mode(a, `${t}.400`)(e) },
    };
  }),
  AU = Yr.defineStyle((e) => {
    const { colorScheme: t } = e;
    return {
      padding: 0,
      height: "auto",
      lineHeight: "normal",
      verticalAlign: "baseline",
      color: mt.mode(`${t}.500`, `${t}.200`)(e),
      _hover: {
        textDecoration: "underline",
        _disabled: { textDecoration: "none" },
      },
      _active: {color: mt.mode(`${t}.700`, `${t}.500`)(e) },
    };
  }),
  _U = Yr.defineStyle({
    bg: "none",
    color: "inherit",
    display: "inline",
    lineHeight: "inherit",
    m: "0",
    p: "0",
  }),
  IU = { ghost: GA, outline: TU, solid: RU, link: AU, unstyled: _U },
  EU = {
    lg: Yr.defineStyle({ h: "12", minW: "12", fontSize: "lg", px: "6" }),
    md: Yr.defineStyle({ h: "10", minW: "10", fontSize: "md", px: "4" }),
    sm: Yr.defineStyle({ h: "8", minW: "8", fontSize: "sm", px: "3" }),
    xs: Yr.defineStyle({ h: "6", minW: "6", fontSize: "xs", px: "2" }),
  },
  MU = Yr.defineStyleConfig({
    baseStyle: kU,
    variants: IU,
    sizes: EU,
    defaultProps: { variant: "solid", size: "md", colorScheme: "gray" },
  });
WA.buttonTheme = MU;
var UA = {},
  FU = se,
  za = I;
const { definePartsStyle: ya, defineMultiStyleConfig: jU } =
    za.createMultiStyleConfigHelpers(FU.cardAnatomy.keys),
  uf = za.cssVar("card-bg"),
  Kn = za.cssVar("card-padding"),
  KA = za.cssVar("card-shadow"),
  Id = za.cssVar("card-radius"),
  qA = za.cssVar("card-border-width", "0"),
  XA = za.cssVar("card-border-color"),
  DU = ya({
    container: {
      [uf.variable]: "colors.chakra-body-bg",
      backgroundColor: uf.reference,
      boxShadow: KA.reference,
      borderRadius: Id.reference,
      color: "chakra-body-text",
      borderWidth: qA.reference,
      borderColor: XA.reference,
    },
    body: { padding: Kn.reference, flex: "1 1 0%" },
    header: { padding: Kn.reference },
    footer: { padding: Kn.reference },
  }),
  NU = {
    sm: ya({
      container: { [Id.variable]: "radii.base", [Kn.variable]: "space.3" },
    }),
    md: ya({
      container: { [Id.variable]: "radii.md", [Kn.variable]: "space.5" },
    }),
    lg: ya({
      container: { [Id.variable]: "radii.xl", [Kn.variable]: "space.7" },
    }),
  },
  OU = {
    elevated: ya({
      container: {
        [KA.variable]: "shadows.base",
        _dark: { [uf.variable]: "colors.gray.700" },
      },
    }),
    outline: ya({
      container: {
        [qA.variable]: "1px",
        [XA.variable]: "colors.chakra-border-color",
      },
    }),
    filled: ya({ container: { [uf.variable]: "colors.chakra-subtle-bg" } }),
    unstyled: {
      body: { [Kn.variable]: 0 },
      header: { [Kn.variable]: 0 },
      footer: { [Kn.variable]: 0 },
    },
  },
  BU = jU({
    baseStyle: DU,
    variants: OU,
    sizes: NU,
    defaultProps: { variant: "elevated", size: "md" },
  });
UA.cardTheme = BU;
var fb = {},
  LU = se,
  Ti = I,
  qt = Pt,
  VU = oo;
const { definePartsStyle: Ed, defineMultiStyleConfig: zU } =
    Ti.createMultiStyleConfigHelpers(LU.checkboxAnatomy.keys),
  jc = Ti.cssVar("checkbox-size"),
  HU = Ti.defineStyle((e) => {
    const { colorScheme: t } = e;
    return {
      w: jc.reference,
      h: jc.reference,
      transitionProperty: "box-shadow",
      transitionDuration: "normal",
      border: "2px solid",
      borderRadius: "sm",
      borderColor: "inherit",
      color: "white",
      _checked: {
        bg: qt.mode(`${t}.500`, `${t}.200`)(e),
        borderColor: qt.mode(`${t}.500`, `${t}.200`)(e),
        color: qt.mode("white", "gray.900")(e),
        _hover: {
          bg: qt.mode(`${t}.600`, `${t}.300`)(e),
          borderColor: qt.mode(`${t}.600`, `${t}.300`)(e),
        },
        _disabled: {
          borderColor: qt.mode("gray.200", "transparent")(e),
          bg: qt.mode("gray.200", "whiteAlpha.300")(e),
          color: qt.mode("gray.500", "whiteAlpha.500")(e),
        },
      },
      _indeterminate: {
        bg: qt.mode(`${t}.500`, `${t}.200`)(e),
        borderColor: qt.mode(`${t}.500`, `${t}.200`)(e),
        color: qt.mode("white", "gray.900")(e),
      },
      _disabled: {
        bg: qt.mode("gray.100", "whiteAlpha.100")(e),
        borderColor: qt.mode("gray.100", "transparent")(e),
      },
      _focusVisible: { boxShadow: "outline" },
      _invalid: { borderColor: qt.mode("red.500", "red.300")(e) },
    };
  }),
  WU = Ti.defineStyle({ _disabled: { cursor: "not-allowed" } }),
  GU = Ti.defineStyle({ userSelect: "none", _disabled: { opacity: 0.4 } }),
  UU = Ti.defineStyle({
    transitionProperty: "transform",
    transitionDuration: "normal",
  }),
  KU = Ed((e) => ({
    icon: UU,
    container: WU,
    control: VU.runIfFn(HU, e),
    label: GU,
  })),
  qU = {
    sm: Ed({
      control: { [jc.variable]: "sizes.3" },
      label: { fontSize: "sm" },
      icon: { fontSize: "3xs" },
    }),
    md: Ed({
      control: { [jc.variable]: "sizes.4" },
      label: { fontSize: "md" },
      icon: { fontSize: "2xs" },
    }),
    lg: Ed({
      control: { [jc.variable]: "sizes.5" },
      label: { fontSize: "lg" },
      icon: { fontSize: "2xs" },
    }),
  },
  XU = zU({
    baseStyle: KU,
    sizes: qU,
    defaultProps: { size: "md", colorScheme: "blue" },
  });
fb.checkboxTheme = XU;
var YA = {},
  Dc = I,
  ZA = Pt;
const Nc = ZA.cssVar("close-button-size"),
  cc = ZA.cssVar("close-button-bg"),
  YU = Dc.defineStyle({
    w: [Nc.reference],
    h: [Nc.reference],
    borderRadius: "md",
    transitionProperty: "common",
    transitionDuration: "normal",
    _disabled: { opacity: 0.4, cursor: "not-allowed", boxShadow: "none" },
    _hover: {
      [cc.variable]: "colors.blackAlpha.100",
      _dark: { [cc.variable]: "colors.whiteAlpha.100" },
    },
    _active: {
      [cc.variable]: "colors.blackAlpha.200",
      _dark: { [cc.variable]: "colors.whiteAlpha.200" },
    },
    _focusVisible: { boxShadow: "outline" },
    bg: cc.reference,
  }),
  ZU = {
    lg: Dc.defineStyle({ [Nc.variable]: "sizes.10", fontSize: "md" }),
    md: Dc.defineStyle({ [Nc.variable]: "sizes.8", fontSize: "xs" }),
    sm: Dc.defineStyle({ [Nc.variable]: "sizes.6", fontSize: "2xs" }),
  },
  QU = Dc.defineStyleConfig({
    baseStyle: YU,
    sizes: ZU,
    defaultProps: { size: "md" },
  });
YA.closeButtonTheme = QU;
var QA = {},
  JA = I,
  Md = _l;
const { variants: JU, defaultProps: e7 } = Md.badgeTheme,
  t7 = JA.defineStyle({
    fontFamily: "mono",
    fontSize: "sm",
    px: "0.2em",
    borderRadius: "sm",
    bg: Md.badgeVars.bg.reference,
    color: Md.badgeVars.color.reference,
    boxShadow: Md.badgeVars.shadow.reference,
  }),
  r7 = JA.defineStyleConfig({ baseStyle: t7, variants: JU, defaultProps: e7 });
QA.codeTheme = r7;
var e_ = {},
  t_ = I;
const n7 = t_.defineStyle({ w: "100%", mx: "auto", maxW: "prose", px: "4" }),
  o7 = t_.defineStyleConfig({ baseStyle: n7 });
e_.containerTheme = o7;
var r_ = {},
  Uf = I;
const a7 = Uf.defineStyle({ opacity: 0.6, borderColor: "inherit" }),
  s7 = Uf.defineStyle({ borderStyle: "solid" }),
  i7 = Uf.defineStyle({ borderStyle: "dashed" }),
  c7 = { solid: s7, dashed: i7 },
  l7 = Uf.defineStyleConfig({
    baseStyle: a7,
    variants: c7,
    defaultProps: { variant: "solid" },
  });
r_.dividerTheme = l7;
var n_ = {},
  u7 = se,
  Rn = I,
  d7 = oo;
const { definePartsStyle: uy, defineMultiStyleConfig: f7 } =
    Rn.createMultiStyleConfigHelpers(u7.drawerAnatomy.keys),
  xp = Rn.cssVar("drawer-bg"),
  $p = Rn.cssVar("drawer-box-shadow");
function is(e) {
  return uy(
    e === "full"
      ? { dialog: { maxW: "100vw", h: "100vh" } }
      : { dialog: { maxW: e } }
  );
}
const m7 = Rn.defineStyle({ bg: "blackAlpha.600", zIndex: "modal" }),
  h7 = Rn.defineStyle({
    display: "flex",
    zIndex: "modal",
    justifyContent: "center",
  }),
  p7 = Rn.defineStyle((e) => {
    const { isFullHeight: t } = e;
    return {
      ...(t && { height: "100vh" }),
      zIndex: "modal",
      maxH: "100vh",
      color: "inherit",
      [xp.variable]: "colors.white",
      [$p.variable]: "shadows.lg",
      _dark: {
        [xp.variable]: "colors.gray.700",
        [$p.variable]: "shadows.dark-lg",
      },
      bg: xp.reference,
      boxShadow: $p.reference,
    };
  }),
  v7 = Rn.defineStyle({
    px: "6",
    py: "4",
    fontSize: "xl",
    fontWeight: "semibold",
  }),
  y7 = Rn.defineStyle({ position: "absolute", top: "2", insetEnd: "3" }),
  g7 = Rn.defineStyle({ px: "6", py: "2", flex: "1", overflow: "auto" }),
  b7 = Rn.defineStyle({ px: "6", py: "4" }),
  S7 = uy((e) => ({
    overlay: m7,
    dialogContainer: h7,
    dialog: d7.runIfFn(p7, e),
    header: v7,
    closeButton: y7,
    body: g7,
    footer: b7,
  })),
  x7 = {
    xs: is("xs"),
    sm: is("md"),
    md: is("lg"),
    lg: is("2xl"),
    xl: is("4xl"),
    full: is("full"),
  },
  $7 = f7({ baseStyle: S7, sizes: x7, defaultProps: { size: "xs" } });
n_.drawerTheme = $7;
var o_ = {},
  w7 = se,
  Kf = I;
const { definePartsStyle: C7, defineMultiStyleConfig: k7 } =
    Kf.createMultiStyleConfigHelpers(w7.editableAnatomy.keys),
  T7 = Kf.defineStyle({
    borderRadius: "md",
    py: "1",
    transitionProperty: "common",
    transitionDuration: "normal",
  }),
  P7 = Kf.defineStyle({
    borderRadius: "md",
    py: "1",
    transitionProperty: "common",
    transitionDuration: "normal",
    width: "full",
    _focusVisible: { boxShadow: "outline" },
    _placeholder: { opacity: 0.6 },
  }),
  R7 = Kf.defineStyle({
    borderRadius: "md",
    py: "1",
    transitionProperty: "common",
    transitionDuration: "normal",
    width: "full",
    _focusVisible: { boxShadow: "outline" },
    _placeholder: { opacity: 0.6 },
  }),
  A7 = C7({ preview: T7, input: P7, textarea: R7 }),
  _7 = k7({ baseStyle: A7 });
o_.editableTheme = _7;
var a_ = {},
  I7 = se,
  qf = I;
const { definePartsStyle: E7, defineMultiStyleConfig: M7 } =
    qf.createMultiStyleConfigHelpers(I7.formAnatomy.keys),
  Gs = qf.cssVar("form-control-color"),
  F7 = qf.defineStyle({
    marginStart: "1",
    [Gs.variable]: "colors.red.500",
    _dark: { [Gs.variable]: "colors.red.300" },
    color: Gs.reference,
  }),
  j7 = qf.defineStyle({
    mt: "2",
    [Gs.variable]: "colors.gray.600",
    _dark: { [Gs.variable]: "colors.whiteAlpha.600" },
    color: Gs.reference,
    lineHeight: "normal",
    fontSize: "sm",
  }),
  D7 = E7({
    container: { width: "100%", position: "relative" },
    requiredIndicator: F7,
    helperText: j7,
  }),
  N7 = M7({ baseStyle: D7 });
a_.formTheme = N7;
var s_ = {},
  O7 = se,
  Xf = I;
const { definePartsStyle: B7, defineMultiStyleConfig: L7 } =
    Xf.createMultiStyleConfigHelpers(O7.formErrorAnatomy.keys),
  Us = Xf.cssVar("form-error-color"),
  V7 = Xf.defineStyle({
    [Us.variable]: "colors.red.500",
    _dark: { [Us.variable]: "colors.red.300" },
    color: Us.reference,
    mt: "2",
    fontSize: "sm",
    lineHeight: "normal",
  }),
  z7 = Xf.defineStyle({
    marginEnd: "0.5em",
    [Us.variable]: "colors.red.500",
    _dark: { [Us.variable]: "colors.red.300" },
    color: Us.reference,
  }),
  H7 = B7({ text: V7, icon: z7 }),
  W7 = L7({ baseStyle: H7 });
s_.formErrorTheme = W7;
var i_ = {},
  c_ = I;
const G7 = c_.defineStyle({
    fontSize: "md",
    marginEnd: "3",
    mb: "2",
    fontWeight: "medium",
    transitionProperty: "common",
    transitionDuration: "normal",
    opacity: 1,
    _disabled: { opacity: 0.4 },
  }),
  U7 = c_.defineStyleConfig({ baseStyle: G7 });
i_.formLabelTheme = U7;
var l_ = {},
  ln = I;
const K7 = ln.defineStyle({ fontFamily: "heading", fontWeight: "bold" }),
  q7 = {
    "4xl": ln.defineStyle({ fontSize: ["6xl", null, "7xl"], lineHeight: 1 }),
    "3xl": ln.defineStyle({ fontSize: ["5xl", null, "6xl"], lineHeight: 1 }),
    "2xl": ln.defineStyle({
      fontSize: ["4xl", null, "5xl"],
      lineHeight: [1.2, null, 1],
    }),
    xl: ln.defineStyle({
      fontSize: ["3xl", null, "4xl"],
      lineHeight: [1.33, null, 1.2],
    }),
    lg: ln.defineStyle({
      fontSize: ["2xl", null, "3xl"],
      lineHeight: [1.33, null, 1.2],
    }),
    md: ln.defineStyle({ fontSize: "xl", lineHeight: 1.2 }),
    sm: ln.defineStyle({ fontSize: "md", lineHeight: 1.2 }),
    xs: ln.defineStyle({ fontSize: "sm", lineHeight: 1.2 }),
  },
  X7 = ln.defineStyleConfig({
    baseStyle: K7,
    sizes: q7,
    defaultProps: { size: "xl" },
  });
l_.headingTheme = X7;
var Pi = {},
  Y7 = se,
  Hn = I,
  bt = Pt;
const { definePartsStyle: Wn, defineMultiStyleConfig: Z7 } =
    Hn.createMultiStyleConfigHelpers(Y7.inputAnatomy.keys),
  Ts = Hn.cssVar("input-height"),
  Ps = Hn.cssVar("input-font-size"),
  Rs = Hn.cssVar("input-padding"),
  As = Hn.cssVar("input-border-radius"),
  Q7 = Wn({
    addon: {
      height: Ts.reference,
      fontSize: Ps.reference,
      px: Rs.reference,
      borderRadius: As.reference,
    },
    field: {
      width: "100%",
      height: Ts.reference,
      fontSize: Ps.reference,
      px: Rs.reference,
      borderRadius: As.reference,
      minWidth: 0,
      outline: 0,
      position: "relative",
      appearance: "none",
      transitionProperty: "common",
      transitionDuration: "normal",
      _disabled: { opacity: 0.4, cursor: "not-allowed" },
    },
  }),
  xo = {
    lg: Hn.defineStyle({
      [Ps.variable]: "fontSizes.lg",
      [Rs.variable]: "space.4",
      [As.variable]: "radii.md",
      [Ts.variable]: "sizes.12",
    }),
    md: Hn.defineStyle({
      [Ps.variable]: "fontSizes.md",
      [Rs.variable]: "space.4",
      [As.variable]: "radii.md",
      [Ts.variable]: "sizes.10",
    }),
    sm: Hn.defineStyle({
      [Ps.variable]: "fontSizes.sm",
      [Rs.variable]: "space.3",
      [As.variable]: "radii.sm",
      [Ts.variable]: "sizes.8",
    }),
    xs: Hn.defineStyle({
      [Ps.variable]: "fontSizes.xs",
      [Rs.variable]: "space.2",
      [As.variable]: "radii.sm",
      [Ts.variable]: "sizes.6",
    }),
  },
  J7 = {
    lg: Wn({ field: xo.lg, group: xo.lg }),
    md: Wn({ field: xo.md, group: xo.md }),
    sm: Wn({ field: xo.sm, group: xo.sm }),
    xs: Wn({ field: xo.xs, group: xo.xs }),
  };
function mb(e) {
  const { focusBorderColor: t, errorBorderColor: r } = e;
  return {
    focusBorderColor: t || bt.mode("blue.500", "blue.300")(e),
    errorBorderColor: r || bt.mode("red.500", "red.300")(e),
  };
}
const eK = Wn((e) => {
    const { theme: t } = e,
      { focusBorderColor: r, errorBorderColor: n } = mb(e);
    return {
      field: {border: "1px solid",
        borderColor: "inherit",
        bg: "inherit",
        _hover: { borderColor: bt.mode("gray.300", "whiteAlpha.400")(e) },
        _readOnly: { boxShadow: "none !important", userSelect: "all" },
        _invalid: {
          borderColor: bt.getColor(t, n),
          boxShadow: `0 0 0 1px ${bt.getColor(t, n)}`,
        },
        _focusVisible: {
          zIndex: 1,
          borderColor: bt.getColor(t, r),
          boxShadow: `0 0 0 1px ${bt.getColor(t, r)}`,
        },
      },
      addon: {border: "1px solid",
        borderColor: bt.mode("inherit", "whiteAlpha.50")(e),
        bg: bt.mode("gray.100", "whiteAlpha.300")(e),
      },
    };
  }),
  tK = Wn((e) => {
    const { theme: t } = e,
      { focusBorderColor: r, errorBorderColor: n } = mb(e);
    return {
      field: {border: "2px solid",
        borderColor: "transparent",
        bg: bt.mode("gray.100", "whiteAlpha.50")(e),
        _hover: { bg: bt.mode("gray.200", "whiteAlpha.100")(e) },
        _readOnly: { boxShadow: "none !important", userSelect: "all" },
        _invalid: { borderColor: bt.getColor(t, n) },
        _focusVisible: { bg: "transparent", borderColor: bt.getColor(t, r) },
      },
      addon: {border: "2px solid",
        borderColor: "transparent",
        bg: bt.mode("gray.100", "whiteAlpha.50")(e),
      },
    };
  }),
  rK = Wn((e) => {
    const { theme: t } = e,
      { focusBorderColor: r, errorBorderColor: n } = mb(e);
    return {
      field: {
        borderBottom: "1px solid",
        borderColor: "inherit",
        borderRadius: "0",
        px: "0",
        bg: "transparent",
        _readOnly: { boxShadow: "none !important", userSelect: "all" },
        _invalid: {
          borderColor: bt.getColor(t, n),
          boxShadow: `0px 1px 0px 0px ${bt.getColor(t, n)}`,
        },
        _focusVisible: {
          borderColor: bt.getColor(t, r),
          boxShadow: `0px 1px 0px 0px ${bt.getColor(t, r)}`,
        },
      },
      addon: {
        borderBottom: "2px solid",
        borderColor: "inherit",
        borderRadius: "0",
        px: "0",
        bg: "transparent",
      },
    };
  }),
  nK = Wn({
    field: { bg: "transparent", px: "0", height: "auto" },
    addon: { bg: "transparent", px: "0", height: "auto" },
  }),
  oK = {outline: eK, filled: tK, flushed: rK, unstyled: nK },
  aK = Z7({
    baseStyle: Q7,
    sizes: J7,
    variants: oK,
    defaultProps: { size: "md", variant: "outline" },
  });
Pi.inputTheme = aK;
var u_ = {},
  hb = I;
const wp = hb.cssVar("kbd-bg"),
  sK = hb.defineStyle({
    [wp.variable]: "colors.gray.100",
    _dark: { [wp.variable]: "colors.whiteAlpha.100" },
    bg: wp.reference,
    borderRadius: "md",
    borderWidth: "1px",
    borderBottomWidth: "3px",
    fontSize: "0.8em",
    fontWeight: "bold",
    lineHeight: "normal",
    px: "0.4em",
    whiteSpace: "nowrap",
  }),
  iK = hb.defineStyleConfig({ baseStyle: sK });
u_.kbdTheme = iK;
var d_ = {},
  f_ = I;
const cK = f_.defineStyle({
    transitionProperty: "common",
    transitionDuration: "fast",
    transitionTimingFunction: "ease-out",
    cursor: "pointer",
    textDecoration: "none",
    outline: "none",
    color: "inherit",
    _hover: { textDecoration: "underline" },
    _focusVisible: { boxShadow: "outline" },
  }),
  lK = f_.defineStyleConfig({ baseStyle: cK });
d_.linkTheme = lK;
var m_ = {},
  uK = se,
  h_ = I;
const { defineMultiStyleConfig: dK, definePartsStyle: fK } =
    h_.createMultiStyleConfigHelpers(uK.listAnatomy.keys),
  mK = h_.defineStyle({
    marginEnd: "2",
    display: "inline",
    verticalAlign: "text-bottom",
  }),
  hK = fK({ icon: mK }),
  pK = dK({ baseStyle: hK });
m_.listTheme = pK;
var p_ = {},
  vK = se,
  An = I;
const { defineMultiStyleConfig: yK, definePartsStyle: gK } =
    An.createMultiStyleConfigHelpers(vK.menuAnatomy.keys),
  un = An.cssVar("menu-bg"),
  Cp = An.cssVar("menu-shadow"),
  bK = An.defineStyle({
    [un.variable]: "#fff",
    [Cp.variable]: "shadows.sm",
    _dark: {
      [un.variable]: "colors.gray.700",
      [Cp.variable]: "shadows.dark-lg",
    },
    color: "inherit",
    minW: "3xs",
    py: "2",
    zIndex: "dropdown",
    borderRadius: "md",
    borderWidth: "1px",
    bg: un.reference,
    boxShadow: Cp.reference,
  }),
  SK = An.defineStyle({
    py: "1.5",
    px: "3",
    transitionProperty: "background",
    transitionDuration: "ultra-fast",
    transitionTimingFunction: "ease-in",
    _focus: {
      [un.variable]: "colors.gray.100",
      _dark: { [un.variable]: "colors.whiteAlpha.100" },
    },
    _active: {
      [un.variable]: "colors.gray.200",
      _dark: { [un.variable]: "colors.whiteAlpha.200" },
    },
    _expanded: {
      [un.variable]: "colors.gray.100",
      _dark: { [un.variable]: "colors.whiteAlpha.100" },
    },
    _disabled: { opacity: 0.4, cursor: "not-allowed" },
    bg: un.reference,
  }),
  xK = An.defineStyle({ mx: 4, my: 2, fontWeight: "semibold", fontSize: "sm" }),
  $K = An.defineStyle({
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  }),
  wK = An.defineStyle({ opacity: 0.6 }),
  CK = An.defineStyle({border: 0,
    borderBottom: "1px solid",
    borderColor: "inherit",
    my: "2",
    opacity: 0.6,
  }),
  kK = An.defineStyle({
    transitionProperty: "common",
    transitionDuration: "normal",
  }),
  TK = gK({
    button: kK,
    list: bK,
    item: SK,
    groupTitle: xK,
    icon: $K,
    command: wK,
    divider: CK,
  }),
  PK = yK({ baseStyle: TK });
p_.menuTheme = PK;
var v_ = {},
  RK = se,
  _n = I,
  kp = oo;
const { defineMultiStyleConfig: AK, definePartsStyle: dy } =
    _n.createMultiStyleConfigHelpers(RK.modalAnatomy.keys),
  Tp = _n.cssVar("modal-bg"),
  Pp = _n.cssVar("modal-shadow"),
  _K = _n.defineStyle({ bg: "blackAlpha.600", zIndex: "modal" }),
  IK = _n.defineStyle((e) => {
    const { isCentered: t, scrollBehavior: r } = e;
    return {
      display: "flex",
      zIndex: "modal",
      justifyContent: "center",
      alignItems: t ? "center" : "flex-start",
      overflow: r === "inside" ? "hidden" : "auto",
      overscrollBehaviorY: "none",
    };
  }),
  EK = _n.defineStyle((e) => {
    const { isCentered: t, scrollBehavior: r } = e;
    return {
      borderRadius: "md",
      color: "inherit",
      my: t ? "auto" : "16",
      mx: t ? "auto" : void 0,
      zIndex: "modal",
      maxH: r === "inside" ? "calc(100% - 7.5rem)" : void 0,
      [Tp.variable]: "colors.white",
      [Pp.variable]: "shadows.lg",
      _dark: {
        [Tp.variable]: "colors.gray.700",
        [Pp.variable]: "shadows.dark-lg",
      },
      bg: Tp.reference,
      boxShadow: Pp.reference,
    };
  }),
  MK = _n.defineStyle({
    px: "6",
    py: "4",
    fontSize: "xl",
    fontWeight: "semibold",
  }),
  FK = _n.defineStyle({ position: "absolute", top: "2", insetEnd: "3" }),
  jK = _n.defineStyle((e) => {
    const { scrollBehavior: t } = e;
    return {
      px: "6",
      py: "2",
      flex: "1",
      overflow: t === "inside" ? "auto" : void 0,
    };
  }),
  DK = _n.defineStyle({ px: "6", py: "4" }),
  NK = dy((e) => ({
    overlay: _K,
    dialogContainer: kp.runIfFn(IK, e),
    dialog: kp.runIfFn(EK, e),
    header: MK,
    closeButton: FK,
    body: kp.runIfFn(jK, e),
    footer: DK,
  }));
function zr(e) {
  return dy(
    e === "full"
      ? {
          dialog: { maxW: "100vw", minH: "$100vh", my: "0", borderRadius: "0" },
        }
      : { dialog: { maxW: e } }
  );
}
const OK = {
    xs: zr("xs"),
    sm: zr("sm"),
    md: zr("md"),
    lg: zr("lg"),
    xl: zr("xl"),
    "2xl": zr("2xl"),
    "3xl": zr("3xl"),
    "4xl": zr("4xl"),
    "5xl": zr("5xl"),
    "6xl": zr("6xl"),
    full: zr("full"),
  },
  BK = AK({ baseStyle: NK, sizes: OK, defaultProps: { size: "md" } });
v_.modalTheme = BK;
var y_ = {};
const LK = {
  letterSpacings: {
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "0",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em",
  },
  lineHeights: {
    normal: "normal",
    none: 1,
    shorter: 1.25,
    short: 1.375,
    base: 1.5,
    tall: 1.625,
    taller: "2",
    3: ".75rem",
    4: "1rem",
    5: "1.25rem",
    6: "1.5rem",
    7: "1.75rem",
    8: "2rem",
    9: "2.25rem",
    10: "2.5rem",
  },
  fontWeights: {
    hairline: 100,
    thin: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
  fonts: {
    heading:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    mono: 'SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace',
  },
  fontSizes: {
    "3xs": "0.45rem",
    "2xs": "0.625rem",
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "3.75rem",
    "7xl": "4.5rem",
    "8xl": "6rem",
    "9xl": "8rem",
  },
};
var g_ = LK,
  VK = se,
  Il = I,
  Ha = Pt,
  zK = g_,
  df = Pi,
  b_ = oo;
const { defineMultiStyleConfig: HK, definePartsStyle: S_ } =
    Il.createMultiStyleConfigHelpers(VK.numberInputAnatomy.keys),
  pb = Ha.cssVar("number-input-stepper-width"),
  x_ = Ha.cssVar("number-input-input-padding"),
  WK = Ha.calc(pb).add("0.5rem").toString(),
  Rp = Ha.cssVar("number-input-bg"),
  Ap = Ha.cssVar("number-input-color"),
  _p = Ha.cssVar("number-input-border-color"),
  GK = Il.defineStyle({ [pb.variable]: "sizes.6", [x_.variable]: WK }),
  UK = Il.defineStyle((e) => {
    var t;
    return (
      ((t = b_.runIfFn(df.inputTheme.baseStyle, e)) == null
        ? void 0
        : t.field) ?? {}
    );
  }),
  KK = Il.defineStyle({ width: pb.reference }),
  qK = Il.defineStyle({
    borderStart: "1px solid",
    borderStartColor: _p.reference,
    color: Ap.reference,
    bg: Rp.reference,
    [Ap.variable]: "colors.chakra-body-text",
    [_p.variable]: "colors.chakra-border-color",
    _dark: {
      [Ap.variable]: "colors.whiteAlpha.800",
      [_p.variable]: "colors.whiteAlpha.300",
    },
    _active: {
      [Rp.variable]: "colors.gray.200",
      _dark: { [Rp.variable]: "colors.whiteAlpha.300" },
    },
    _disabled: { opacity: 0.4, cursor: "not-allowed" },
  }),
  XK = S_((e) => ({
    root: GK,
    field: b_.runIfFn(UK, e) ?? {},
    stepperGroup: KK,
    stepper: qK,
  }));
function zu(e) {
  var a, s;
  const t = (a = df.inputTheme.sizes) == null ? void 0 : a[e],
    r = { lg: "md", md: "md", sm: "sm", xs: "sm" },
    n = ((s = t.field) == null ? void 0 : s.fontSize) ?? "md",
    o = zK.fontSizes[n];
  return S_({
    field: { ...t.field, paddingInlineEnd: x_.reference, verticalAlign: "top" },
    stepper: {
      fontSize: Ha.calc(o).multiply(0.75).toString(),
      _first: { borderTopEndRadius: r[e] },
      _last: { borderBottomEndRadius: r[e], mt: "-1px", borderTopWidth: 1 },
    },
  });
}
const YK = { xs: zu("xs"), sm: zu("sm"), md: zu("md"), lg: zu("lg") },
  ZK = HK({
    baseStyle: XK,
    sizes: YK,
    variants: df.inputTheme.variants,
    defaultProps: df.inputTheme.defaultProps,
  });
y_.numberInputTheme = ZK;
var $_ = {},
  Gn = I,
  _s = Pi,
  Ip = oo,
  gP;
const QK = Gn.defineStyle({
    ...((gP = _s.inputTheme.baseStyle) == null ? void 0 : gP.field),
    textAlign: "center",
  }),
  JK = {
    lg: Gn.defineStyle({ fontSize: "lg", w: 12, h: 12, borderRadius: "md" }),
    md: Gn.defineStyle({ fontSize: "md", w: 10, h: 10, borderRadius: "md" }),
    sm: Gn.defineStyle({ fontSize: "sm", w: 8, h: 8, borderRadius: "sm" }),
    xs: Gn.defineStyle({ fontSize: "xs", w: 6, h: 6, borderRadius: "sm" }),
  };
var bP;
const eq = {outline: Gn.defineStyle((e) => {
      var t, r;
      return (
        ((r = Ip.runIfFn(
          (t = _s.inputTheme.variants) == null ? void 0 : t.outline,
          e
        )) == null
          ? void 0
          : r.field) ?? {}
      );
    }),
    flushed: Gn.defineStyle((e) => {
      var t, r;
      return (
        ((r = Ip.runIfFn(
          (t = _s.inputTheme.variants) == null ? void 0 : t.flushed,
          e
        )) == null
          ? void 0
          : r.field) ?? {}
      );
    }),
    filled: Gn.defineStyle((e) => {
      var t, r;
      return (
        ((r = Ip.runIfFn(
          (t = _s.inputTheme.variants) == null ? void 0 : t.filled,
          e
        )) == null
          ? void 0
          : r.field) ?? {}
      );
    }),
    unstyled:
      ((bP = _s.inputTheme.variants) == null ? void 0 : bP.unstyled.field) ??
      {},
  },
  tq = Gn.defineStyleConfig({
    baseStyle: QK,
    sizes: JK,
    variants: eq,
    defaultProps: _s.inputTheme.defaultProps,
  });
$_.pinInputTheme = tq;
var w_ = {},
  rq = se,
  Wa = I,
  vb = Pt;
const { defineMultiStyleConfig: nq, definePartsStyle: oq } =
    Wa.createMultiStyleConfigHelpers(rq.popoverAnatomy.keys),
  Hu = vb.cssVar("popper-bg"),
  aq = vb.cssVar("popper-arrow-bg"),
  Q$ = vb.cssVar("popper-arrow-shadow-color"),
  sq = Wa.defineStyle({ zIndex: "popover" }),
  iq = Wa.defineStyle({
    [Hu.variable]: "colors.white",
    bg: Hu.reference,
    [aq.variable]: Hu.reference,
    [Q$.variable]: "colors.gray.200",
    _dark: {
      [Hu.variable]: "colors.gray.700",
      [Q$.variable]: "colors.whiteAlpha.300",
    },
    width: "xs",
    border: "1px solid",
    borderColor: "inherit",
    borderRadius: "md",
    boxShadow: "sm",
    zIndex: "inherit",
    _focusVisible: {outline: 0, boxShadow: "outline" },
  }),
  cq = Wa.defineStyle({ px: 3, py: 2, borderBottomWidth: "1px" }),
  lq = Wa.defineStyle({ px: 3, py: 2 }),
  uq = Wa.defineStyle({ px: 3, py: 2, borderTopWidth: "1px" }),
  dq = Wa.defineStyle({
    position: "absolute",
    borderRadius: "md",
    top: 1,
    insetEnd: 2,
    padding: 2,
  }),
  fq = oq({
    popper: sq,
    content: iq,
    header: cq,
    body: lq,
    footer: uq,
    closeButton: dq,
  }),
  mq = nq({ baseStyle: fq });
w_.popoverTheme = mq;
var C_ = {},
  hq = se,
  El = I,
  bs = Pt;
const { defineMultiStyleConfig: pq, definePartsStyle: kc } =
    El.createMultiStyleConfigHelpers(hq.progressAnatomy.keys),
  vq = El.defineStyle((e) => {
    const { colorScheme: t, theme: r, isIndeterminate: n, hasStripe: o } = e,
      a = bs.mode(
        bs.generateStripe(),
        bs.generateStripe("1rem", "rgba(0,0,0,0.1)")
      )(e),
      s = bs.mode(`${t}.500`, `${t}.200`)(e),
      i = `linear-gradient(
    to right,
    transparent 0%,
    ${bs.getColor(r, s)} 50%,
    transparent 100%
  )`;
    return { ...(!n && o && a), ...(n ? { bgImage: i } : { bgColor: s }) };
  }),
  yq = El.defineStyle({
    lineHeight: "1",
    fontSize: "0.25em",
    fontWeight: "bold",
    color: "white",
  }),
  gq = El.defineStyle((e) => ({
    bg: bs.mode("gray.100", "whiteAlpha.300")(e),
  })),
  bq = El.defineStyle((e) => ({
    transitionProperty: "common",
    transitionDuration: "slow",
    ...vq(e),
  })),
  Sq = kc((e) => ({ label: yq, filledTrack: bq(e), track: gq(e) })),
  xq = {
    xs: kc({ track: { h: "1" } }),
    sm: kc({ track: { h: "2" } }),
    md: kc({ track: { h: "3" } }),
    lg: kc({ track: { h: "4" } }),
  },
  $q = pq({
    sizes: xq,
    baseStyle: Sq,
    defaultProps: { size: "md", colorScheme: "blue" },
  });
C_.progressTheme = $q;
var k_ = {},
  wq = se,
  T_ = I,
  Cq = oo,
  fy = fb;
const { defineMultiStyleConfig: kq, definePartsStyle: Fd } =
    T_.createMultiStyleConfigHelpers(wq.radioAnatomy.keys),
  Tq = T_.defineStyle((e) => {
    var r;
    const t =
      (r = Cq.runIfFn(fy.checkboxTheme.baseStyle, e)) == null
        ? void 0
        : r.control;
    return {
      ...t,
      borderRadius: "full",
      _checked: {
        ...(t == null ? void 0 : t._checked),
        _before: {
          content: '""',
          display: "inline-block",
          pos: "relative",
          w: "50%",
          h: "50%",
          borderRadius: "50%",
          bg: "currentColor",
        },
      },
    };
  }),
  Pq = Fd((e) => {
    var t, r, n, o;
    return {
      label:
        (r = (t = fy.checkboxTheme).baseStyle) == null
          ? void 0
          : r.call(t, e).label,
      container:
        (o = (n = fy.checkboxTheme).baseStyle) == null
          ? void 0
          : o.call(n, e).container,
      control: Tq(e),
    };
  }),
  Rq = {
    md: Fd({ control: { w: "4", h: "4" }, label: { fontSize: "md" } }),
    lg: Fd({ control: { w: "5", h: "5" }, label: { fontSize: "lg" } }),
    sm: Fd({ control: { width: "3", height: "3" }, label: { fontSize: "sm" } }),
  },
  Aq = kq({
    baseStyle: Pq,
    sizes: Rq,
    defaultProps: { size: "md", colorScheme: "blue" },
  });
k_.radioTheme = Aq;
var P_ = {},
  _q = se,
  Ml = I,
  Kr = Pi;
const { defineMultiStyleConfig: Iq, definePartsStyle: Eq } =
    Ml.createMultiStyleConfigHelpers(_q.selectAnatomy.keys),
  Wu = Ml.cssVar("select-bg");
var SP;
const Mq = Ml.defineStyle({
    ...((SP = Kr.inputTheme.baseStyle) == null ? void 0 : SP.field),
    appearance: "none",
    paddingBottom: "1px",
    lineHeight: "normal",
    bg: Wu.reference,
    [Wu.variable]: "colors.white",
    _dark: { [Wu.variable]: "colors.gray.700" },
    "> option, > optgroup": { bg: Wu.reference },
  }),
  Fq = Ml.defineStyle({
    width: "6",
    height: "100%",
    insetEnd: "2",
    position: "relative",
    color: "currentColor",
    fontSize: "xl",
    _disabled: { opacity: 0.5 },
  }),
  jq = Eq({ field: Mq, icon: Fq }),
  Gu = Ml.defineStyle({ paddingInlineEnd: "8" });
var xP, $P, wP, CP, kP, TP, PP, RP;
const Dq = {
    lg: {
      ...((xP = Kr.inputTheme.sizes) == null ? void 0 : xP.lg),
      field: {
        ...(($P = Kr.inputTheme.sizes) == null ? void 0 : $P.lg.field),
        ...Gu,
      },
    },
    md: {
      ...((wP = Kr.inputTheme.sizes) == null ? void 0 : wP.md),
      field: {
        ...((CP = Kr.inputTheme.sizes) == null ? void 0 : CP.md.field),
        ...Gu,
      },
    },
    sm: {
      ...((kP = Kr.inputTheme.sizes) == null ? void 0 : kP.sm),
      field: {
        ...((TP = Kr.inputTheme.sizes) == null ? void 0 : TP.sm.field),
        ...Gu,
      },
    },
    xs: {
      ...((PP = Kr.inputTheme.sizes) == null ? void 0 : PP.xs),
      field: {
        ...((RP = Kr.inputTheme.sizes) == null ? void 0 : RP.xs.field),
        ...Gu,
      },
      icon: { insetEnd: "1" },
    },
  },
  Nq = Iq({
    baseStyle: jq,
    sizes: Dq,
    variants: Kr.inputTheme.variants,
    defaultProps: Kr.inputTheme.defaultProps,
  });
P_.selectTheme = Nq;
var R_ = {},
  Yf = I;
const Ep = Yf.cssVar("skeleton-start-color"),
  Mp = Yf.cssVar("skeleton-end-color"),
  Oq = Yf.defineStyle({
    [Ep.variable]: "colors.gray.100",
    [Mp.variable]: "colors.gray.400",
    _dark: {
      [Ep.variable]: "colors.gray.800",
      [Mp.variable]: "colors.gray.600",
    },
    background: Ep.reference,
    borderColor: Mp.reference,
    opacity: 0.7,
    borderRadius: "sm",
  }),
  Bq = Yf.defineStyleConfig({ baseStyle: Oq });
R_.skeletonTheme = Bq;
var A_ = {},
  yb = I;
const Fp = yb.cssVar("skip-link-bg"),
  Lq = yb.defineStyle({
    borderRadius: "md",
    fontWeight: "semibold",
    _focusVisible: {
      boxShadow: "outline",
      padding: "4",
      position: "fixed",
      top: "6",
      insetStart: "6",
      [Fp.variable]: "colors.white",
      _dark: { [Fp.variable]: "colors.gray.700" },
      bg: Fp.reference,
    },
  }),
  Vq = yb.defineStyleConfig({ baseStyle: Lq });
A_.skipLinkTheme = Vq;
var __ = {},
  zq = se,
  vn = I,
  gb = Pt;
const { defineMultiStyleConfig: Hq, definePartsStyle: Zf } =
    vn.createMultiStyleConfigHelpers(zq.sliderAnatomy.keys),
  Ra = vn.cssVar("slider-thumb-size"),
  nl = vn.cssVar("slider-track-size"),
  Ro = vn.cssVar("slider-bg"),
  Wq = vn.defineStyle((e) => {
    const { orientation: t } = e;
    return {
      display: "inline-block",
      position: "relative",
      cursor: "pointer",
      _disabled: { opacity: 0.6, cursor: "default", pointerEvents: "none" },
      ...gb.orient({
        orientation: t,
        vertical: { h: "100%", px: vn.calc(Ra.reference).divide(2).toString() },
        horizontal: {
          w: "100%",
          py: vn.calc(Ra.reference).divide(2).toString(),
        },
      }),
    };
  }),
  Gq = vn.defineStyle((e) => ({
    ...gb.orient({
      orientation: e.orientation,
      horizontal: { h: nl.reference },
      vertical: { w: nl.reference },
    }),
    overflow: "hidden",
    borderRadius: "sm",
    [Ro.variable]: "colors.gray.200",
    _dark: { [Ro.variable]: "colors.whiteAlpha.200" },
    _disabled: {
      [Ro.variable]: "colors.gray.300",
      _dark: { [Ro.variable]: "colors.whiteAlpha.300" },
    },
    bg: Ro.reference,
  })),
  Uq = vn.defineStyle((e) => {
    const { orientation: t } = e;
    return {
      ...gb.orient({
        orientation: t,
        vertical: {
          left: "50%",
          transform: "translateX(-50%)",
          _active: { transform: "translateX(-50%) scale(1.15)" },
        },
        horizontal: {
          top: "50%",
          transform: "translateY(-50%)",
          _active: { transform: "translateY(-50%) scale(1.15)" },
        },
      }),
      w: Ra.reference,
      h: Ra.reference,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      outline: 0,
      zIndex: 1,
      borderRadius: "full",
      bg: "white",
      boxShadow: "base",
      border: "1px solid",
      borderColor: "transparent",
      transitionProperty: "transform",
      transitionDuration: "normal",
      _focusVisible: { boxShadow: "outline" },
      _disabled: { bg: "gray.300" },
    };
  }),
  Kq = vn.defineStyle((e) => {
    const { colorScheme: t } = e;
    return {
      width: "inherit",
      height: "inherit",
      [Ro.variable]: `colors.${t}.500`,
      _dark: { [Ro.variable]: `colors.${t}.200` },
      bg: Ro.reference,
    };
  }),
  qq = Zf((e) => ({
    container: Wq(e),
    track: Gq(e),
    thumb: Uq(e),
    filledTrack: Kq(e),
  })),
  Xq = Zf({
    container: { [Ra.variable]: "sizes.4", [nl.variable]: "sizes.1" },
  }),
  Yq = Zf({
    container: { [Ra.variable]: "sizes.3.5", [nl.variable]: "sizes.1" },
  }),
  Zq = Zf({
    container: { [Ra.variable]: "sizes.2.5", [nl.variable]: "sizes.0.5" },
  }),
  Qq = { lg: Xq, md: Yq, sm: Zq },
  Jq = Hq({
    baseStyle: qq,
    sizes: Qq,
    defaultProps: { size: "md", colorScheme: "blue" },
  });
__.sliderTheme = Jq;
var I_ = {},
  ma = I,
  eX = Pt;
const ha = eX.cssVar("spinner-size"),
  tX = ma.defineStyle({ width: [ha.reference], height: [ha.reference] }),
  rX = {
    xs: ma.defineStyle({ [ha.variable]: "sizes.3" }),
    sm: ma.defineStyle({ [ha.variable]: "sizes.4" }),
    md: ma.defineStyle({ [ha.variable]: "sizes.6" }),
    lg: ma.defineStyle({ [ha.variable]: "sizes.8" }),
    xl: ma.defineStyle({ [ha.variable]: "sizes.12" }),
  },
  nX = ma.defineStyleConfig({
    baseStyle: tX,
    sizes: rX,
    defaultProps: { size: "md" },
  });
I_.spinnerTheme = nX;
var E_ = {},
  oX = se,
  Fl = I;
const { defineMultiStyleConfig: aX, definePartsStyle: M_ } =
    Fl.createMultiStyleConfigHelpers(oX.statAnatomy.keys),
  sX = Fl.defineStyle({ fontWeight: "medium" }),
  iX = Fl.defineStyle({ opacity: 0.8, marginBottom: "2" }),
  cX = Fl.defineStyle({ verticalAlign: "baseline", fontWeight: "semibold" }),
  lX = Fl.defineStyle({
    marginEnd: 1,
    w: "3.5",
    h: "3.5",
    verticalAlign: "middle",
  }),
  uX = M_({ container: {}, label: sX, helpText: iX, number: cX, icon: lX }),
  dX = {
    md: M_({
      label: { fontSize: "sm" },
      helpText: { fontSize: "sm" },
      number: { fontSize: "2xl" },
    }),
  },
  fX = aX({ baseStyle: uX, sizes: dX, defaultProps: { size: "md" } });
E_.statTheme = fX;
var F_ = {},
  Ri = I;
const { defineMultiStyleConfig: mX, definePartsStyle: Tc } =
    Ri.createMultiStyleConfigHelpers([
      "stepper",
      "step",
      "title",
      "description",
      "indicator",
      "separator",
      "icon",
      "number",
    ]),
  zn = Ri.cssVar("stepper-indicator-size"),
  Is = Ri.cssVar("stepper-icon-size"),
  Es = Ri.cssVar("stepper-title-font-size"),
  Pc = Ri.cssVar("stepper-description-font-size"),
  lc = Ri.cssVar("stepper-accent-color"),
  hX = Tc(({ colorScheme: e }) => ({
    stepper: {
      display: "flex",
      justifyContent: "space-between",
      gap: "4",
      "&[data-orientation=vertical]": {
        flexDirection: "column",
        alignItems: "flex-start",
      },
      "&[data-orientation=horizontal]": {
        flexDirection: "row",
        alignItems: "center",
      },
      [lc.variable]: `colors.${e}.500`,
      _dark: { [lc.variable]: `colors.${e}.200` },
    },
    title: { fontSize: Es.reference, fontWeight: "medium" },
    description: { fontSize: Pc.reference, color: "chakra-subtle-text" },
    number: { fontSize: Es.reference },
    step: {
      flexShrink: 0,
      position: "relative",
      display: "flex",
      gap: "2",
      "&[data-orientation=horizontal]": { alignItems: "center" },
      flex: "1",
      "&:last-of-type:not([data-stretch])": { flex: "initial" },
    },
    icon: { flexShrink: 0, width: Is.reference, height: Is.reference },
    indicator: {
      flexShrink: 0,
      borderRadius: "full",
      width: zn.reference,
      height: zn.reference,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      "&[data-status=active]": {
        borderWidth: "2px",
        borderColor: lc.reference,
      },
      "&[data-status=complete]": {
        bg: lc.reference,
        color: "chakra-inverse-text",
      },
      "&[data-status=incomplete]": { borderWidth: "2px" },
    },
    separator: {
      bg: "chakra-border-color",
      flex: "1",
      "&[data-status=complete]": { bg: lc.reference },
      "&[data-orientation=horizontal]": {
        width: "100%",
        height: "2px",
        marginStart: "2",
      },
      "&[data-orientation=vertical]": {
        width: "2px",
        position: "absolute",
        height: "100%",
        maxHeight: `calc(100% - ${zn.reference} - 8px)`,
        top: `calc(${zn.reference} + 4px)`,
        insetStart: `calc(${zn.reference} / 2 - 1px)`,
      },
    },
  })),
  pX = mX({
    baseStyle: hX,
    sizes: {
      xs: Tc({
        stepper: {
          [zn.variable]: "sizes.4",
          [Is.variable]: "sizes.3",
          [Es.variable]: "fontSizes.xs",
          [Pc.variable]: "fontSizes.xs",
        },
      }),
      sm: Tc({
        stepper: {
          [zn.variable]: "sizes.6",
          [Is.variable]: "sizes.4",
          [Es.variable]: "fontSizes.sm",
          [Pc.variable]: "fontSizes.xs",
        },
      }),
      md: Tc({
        stepper: {
          [zn.variable]: "sizes.8",
          [Is.variable]: "sizes.5",
          [Es.variable]: "fontSizes.md",
          [Pc.variable]: "fontSizes.sm",
        },
      }),
      lg: Tc({
        stepper: {
          [zn.variable]: "sizes.10",
          [Is.variable]: "sizes.6",
          [Es.variable]: "fontSizes.lg",
          [Pc.variable]: "fontSizes.md",
        },
      }),
    },
    defaultProps: { size: "md", colorScheme: "blue" },
  });
F_.stepperTheme = pX;
var j_ = {},
  vX = se,
  bb = I,
  Ga = Pt;
const { defineMultiStyleConfig: yX, definePartsStyle: jd } =
    bb.createMultiStyleConfigHelpers(vX.switchAnatomy.keys),
  Oc = Ga.cssVar("switch-track-width"),
  ga = Ga.cssVar("switch-track-height"),
  jp = Ga.cssVar("switch-track-diff"),
  gX = Ga.calc.subtract(Oc, ga),
  my = Ga.cssVar("switch-thumb-x"),
  uc = Ga.cssVar("switch-bg"),
  bX = bb.defineStyle((e) => {
    const { colorScheme: t } = e;
    return {
      borderRadius: "full",
      p: "0.5",
      width: [Oc.reference],
      height: [ga.reference],
      transitionProperty: "common",
      transitionDuration: "fast",
      [uc.variable]: "colors.gray.300",
      _dark: { [uc.variable]: "colors.whiteAlpha.400" },
      _focusVisible: { boxShadow: "outline" },
      _disabled: { opacity: 0.4, cursor: "not-allowed" },
      _checked: {
        [uc.variable]: `colors.${t}.500`,
        _dark: { [uc.variable]: `colors.${t}.200` },
      },
      bg: uc.reference,
    };
  }),
  SX = bb.defineStyle({
    bg: "white",
    transitionProperty: "transform",
    transitionDuration: "normal",
    borderRadius: "inherit",
    width: [ga.reference],
    height: [ga.reference],
    _checked: { transform: `translateX(${my.reference})` },
  }),
  xX = jd((e) => ({
    container: {
      [jp.variable]: gX,
      [my.variable]: jp.reference,
      _rtl: { [my.variable]: Ga.calc(jp).negate().toString() },
    },
    track: bX(e),
    thumb: SX,
  })),
  $X = {
    sm: jd({
      container: { [Oc.variable]: "1.375rem", [ga.variable]: "sizes.3" },
    }),
    md: jd({
      container: { [Oc.variable]: "1.875rem", [ga.variable]: "sizes.4" },
    }),
    lg: jd({
      container: { [Oc.variable]: "2.875rem", [ga.variable]: "sizes.6" },
    }),
  },
  wX = yX({
    baseStyle: xX,
    sizes: $X,
    defaultProps: { size: "md", colorScheme: "blue" },
  });
j_.switchTheme = wX;
var D_ = {},
  CX = se,
  Sb = I,
  dn = Pt;
const { defineMultiStyleConfig: kX, definePartsStyle: Ks } =
    Sb.createMultiStyleConfigHelpers(CX.tableAnatomy.keys),
  TX = Ks({
    table: {
      fontVariantNumeric: "lining-nums tabular-nums",
      borderCollapse: "collapse",
      width: "full",
    },
    th: {
      fontFamily: "heading",
      fontWeight: "bold",
      textTransform: "uppercase",
      letterSpacing: "wider",
      textAlign: "start",
    },
    td: { textAlign: "start" },
    caption: {
      mt: 4,
      fontFamily: "heading",
      textAlign: "center",
      fontWeight: "medium",
    },
  }),
  ff = Sb.defineStyle({ "&[data-is-numeric=true]": { textAlign: "end" } }),
  PX = Ks((e) => {
    const { colorScheme: t } = e;
    return {
      th: {color: dn.mode("gray.600", "gray.400")(e),
        borderBottom: "1px",
        borderColor: dn.mode(`${t}.100`, `${t}.700`)(e),
        ...ff,
      },
      td: {
        borderBottom: "1px",
        borderColor: dn.mode(`${t}.100`, `${t}.700`)(e),
        ...ff,
      },
      caption: {color: dn.mode("gray.600", "gray.100")(e) },
      tfoot: { tr: { "&:last-of-type": { th: { borderBottomWidth: 0 } } } },
    };
  }),
  RX = Ks((e) => {
    const { colorScheme: t } = e;
    return {
      th: {color: dn.mode("gray.600", "gray.400")(e),
        borderBottom: "1px",
        borderColor: dn.mode(`${t}.100`, `${t}.700`)(e),
        ...ff,
      },
      td: {
        borderBottom: "1px",
        borderColor: dn.mode(`${t}.100`, `${t}.700`)(e),
        ...ff,
      },
      caption: {color: dn.mode("gray.600", "gray.100")(e) },
      tbody: {
        tr: {
          "&:nth-of-type(odd)": {
            "th, td": {
              borderBottomWidth: "1px",
              borderColor: dn.mode(`${t}.100`, `${t}.700`)(e),
            },
            td: {background: dn.mode(`${t}.100`, `${t}.700`)(e) },
          },
        },
      },
      tfoot: { tr: { "&:last-of-type": { th: { borderBottomWidth: 0 } } } },
    };
  }),
  AX = { simple: PX, striped: RX, unstyled: Sb.defineStyle({}) },
  _X = {
    sm: Ks({
      th: { px: "4", py: "1", lineHeight: "4", fontSize: "xs" },
      td: { px: "4", py: "2", fontSize: "sm", lineHeight: "4" },
      caption: { px: "4", py: "2", fontSize: "xs" },
    }),
    md: Ks({
      th: { px: "6", py: "3", lineHeight: "4", fontSize: "xs" },
      td: { px: "6", py: "4", lineHeight: "5" },
      caption: { px: "6", py: "2", fontSize: "sm" },
    }),
    lg: Ks({
      th: { px: "8", py: "4", lineHeight: "5", fontSize: "sm" },
      td: { px: "8", py: "5", lineHeight: "6" },
      caption: { px: "6", py: "2", fontSize: "md" },
    }),
  },
  IX = kX({
    baseStyle: TX,
    variants: AX,
    sizes: _X,
    defaultProps: { variant: "simple", size: "md", colorScheme: "gray" },
  });
D_.tableTheme = IX;
var N_ = {},
  EX = se,
  Lo = I,
  J$ = Pt;
const Zt = Lo.cssVar("tabs-color"),
  Xr = Lo.cssVar("tabs-bg"),
  Uu = Lo.cssVar("tabs-border-color"),
  { defineMultiStyleConfig: MX, definePartsStyle: yn } =
    Lo.createMultiStyleConfigHelpers(EX.tabsAnatomy.keys),
  FX = Lo.defineStyle((e) => {
    const { orientation: t } = e;
    return { display: t === "vertical" ? "flex" : "block" };
  }),
  jX = Lo.defineStyle((e) => {
    const { isFitted: t } = e;
    return {
      flex: t ? 1 : void 0,
      transitionProperty: "common",
      transitionDuration: "normal",
      _focusVisible: { zIndex: 1, boxShadow: "outline" },
      _disabled: { cursor: "not-allowed", opacity: 0.4 },
    };
  }),
  DX = Lo.defineStyle((e) => {
    const { align: t = "start", orientation: r } = e;
    return {
      justifyContent: {
        end: "flex-end",
        center: "center",
        start: "flex-start",
      }[t],
      flexDirection: r === "vertical" ? "column" : "row",
    };
  }),
  NX = Lo.defineStyle({ p: 4 }),
  OX = yn((e) => ({ root: FX(e), tab: jX(e), tablist: DX(e), tabpanel: NX })),
  BX = {
    sm: yn({ tab: { py: 1, px: 4, fontSize: "sm" } }),
    md: yn({ tab: { fontSize: "md", py: 2, px: 4 } }),
    lg: yn({ tab: { fontSize: "lg", py: 3, px: 4 } }),
  },
  LX = yn((e) => {
    const { colorScheme: t, orientation: r } = e,
      n = r === "vertical",
      o = n ? "borderStart" : "borderBottom",
      a = n ? "marginStart" : "marginBottom";
    return {
      tablist: { [o]: "2px solid", borderColor: "inherit" },
      tab: {
        [o]: "2px solid",
        borderColor: "transparent",
        [a]: "-2px",
        _selected: {
          [Zt.variable]: `colors.${t}.600`,
          _dark: { [Zt.variable]: `colors.${t}.300` },
          borderColor: "currentColor",
        },
        _active: {
          [Xr.variable]: "colors.gray.200",
          _dark: { [Xr.variable]: "colors.whiteAlpha.300" },
        },
        _disabled: { _active: { bg: "none" } },
        color: Zt.reference,
        bg: Xr.reference,
      },
    };
  }),
  VX = yn((e) => {
    const { colorScheme: t } = e;
    return {
      tab: {
        borderTopRadius: "md",
        border: "1px solid",
        borderColor: "transparent",
        mb: "-1px",
        [Uu.variable]: "transparent",
        _selected: {
          [Zt.variable]: `colors.${t}.600`,
          [Uu.variable]: "colors.white",
          _dark: {
            [Zt.variable]: `colors.${t}.300`,
            [Uu.variable]: "colors.gray.800",
          },
          borderColor: "inherit",
          borderBottomColor: Uu.reference,
        },
        color: Zt.reference,
      },
      tablist: {
        mb: "-1px",
        borderBottom: "1px solid",
        borderColor: "inherit",
      },
    };
  }),
  zX = yn((e) => {
    const { colorScheme: t } = e;
    return {
      tab: {border: "1px solid",
        borderColor: "inherit",
        [Xr.variable]: "colors.gray.50",
        _dark: { [Xr.variable]: "colors.whiteAlpha.50" },
        mb: "-1px",
        _notLast: { marginEnd: "-1px" },
        _selected: {
          [Xr.variable]: "colors.white",
          [Zt.variable]: `colors.${t}.600`,
          _dark: {
            [Xr.variable]: "colors.gray.800",
            [Zt.variable]: `colors.${t}.300`,
          },
          borderColor: "inherit",
          borderTopColor: "currentColor",
          borderBottomColor: "transparent",
        },
        color: Zt.reference,
        bg: Xr.reference,
      },
      tablist: {
        mb: "-1px",
        borderBottom: "1px solid",
        borderColor: "inherit",
      },
    };
  }),
  HX = yn((e) => {
    const { colorScheme: t, theme: r } = e;
    return {
      tab: {
        borderRadius: "full",
        fontWeight: "semibold",
        color: "gray.600",
        _selected: {color: J$.getColor(r, `${t}.700`),
          bg: J$.getColor(r, `${t}.100`),
        },
      },
    };
  }),
  WX = yn((e) => {
    const { colorScheme: t } = e;
    return {
      tab: {
        borderRadius: "full",
        fontWeight: "semibold",
        [Zt.variable]: "colors.gray.600",
        _dark: { [Zt.variable]: "inherit" },
        _selected: {
          [Zt.variable]: "colors.white",
          [Xr.variable]: `colors.${t}.600`,
          _dark: {
            [Zt.variable]: "colors.gray.800",
            [Xr.variable]: `colors.${t}.300`,
          },
        },
        color: Zt.reference,
        bg: Xr.reference,
      },
    };
  }),
  GX = yn({}),
  UX = {
    line: LX,
    enclosed: VX,
    "enclosed-colored": zX,
    "soft-rounded": HX,
    "solid-rounded": WX,
    unstyled: GX,
  },
  KX = MX({
    baseStyle: OX,
    sizes: BX,
    variants: UX,
    defaultProps: { size: "md", variant: "line", colorScheme: "blue" },
  });
N_.tabsTheme = KX;
var O_ = {},
  qX = se,
  Jr = I,
  qs = _l;
const { defineMultiStyleConfig: XX, definePartsStyle: ba } =
    Jr.createMultiStyleConfigHelpers(qX.tagAnatomy.keys),
  e1 = Jr.cssVar("tag-bg"),
  t1 = Jr.cssVar("tag-color"),
  Dp = Jr.cssVar("tag-shadow"),
  Dd = Jr.cssVar("tag-min-height"),
  Nd = Jr.cssVar("tag-min-width"),
  Od = Jr.cssVar("tag-font-size"),
  Bd = Jr.cssVar("tag-padding-inline"),
  YX = Jr.defineStyle({
    fontWeight: "medium",
    lineHeight: 1.2,
    outline: 0,
    [t1.variable]: qs.badgeVars.color.reference,
    [e1.variable]: qs.badgeVars.bg.reference,
    [Dp.variable]: qs.badgeVars.shadow.reference,
    color: t1.reference,
    bg: e1.reference,
    boxShadow: Dp.reference,
    borderRadius: "md",
    minH: Dd.reference,
    minW: Nd.reference,
    fontSize: Od.reference,
    px: Bd.reference,
    _focusVisible: { [Dp.variable]: "shadows.outline" },
  }),
  ZX = Jr.defineStyle({ lineHeight: 1.2, overflow: "visible" }),
  QX = Jr.defineStyle({
    fontSize: "lg",
    w: "5",
    h: "5",
    transitionProperty: "common",
    transitionDuration: "normal",
    borderRadius: "full",
    marginStart: "1.5",
    marginEnd: "-1",
    opacity: 0.5,
    _disabled: { opacity: 0.4 },
    _focusVisible: { boxShadow: "outline", bg: "rgba(0, 0, 0, 0.14)" },
    _hover: { opacity: 0.8 },
    _active: { opacity: 1 },
  }),
  JX = ba({ container: YX, label: ZX, closeButton: QX }),
  eY = {
    sm: ba({
      container: {
        [Dd.variable]: "sizes.5",
        [Nd.variable]: "sizes.5",
        [Od.variable]: "fontSizes.xs",
        [Bd.variable]: "space.2",
      },
      closeButton: { marginEnd: "-2px", marginStart: "0.35rem" },
    }),
    md: ba({
      container: {
        [Dd.variable]: "sizes.6",
        [Nd.variable]: "sizes.6",
        [Od.variable]: "fontSizes.sm",
        [Bd.variable]: "space.2",
      },
    }),
    lg: ba({
      container: {
        [Dd.variable]: "sizes.8",
        [Nd.variable]: "sizes.8",
        [Od.variable]: "fontSizes.md",
        [Bd.variable]: "space.3",
      },
    }),
  },
  tY = {
    subtle: ba((e) => {
      var t;
      return {
        container: (t = qs.badgeTheme.variants) == null ? void 0 : t.subtle(e),
      };
    }),
    solid: ba((e) => {
      var t;
      return {
        container: (t = qs.badgeTheme.variants) == null ? void 0 : t.solid(e),
      };
    }),
    outline: ba((e) => {
      var t;
      return {
        container: (t = qs.badgeTheme.variants) == null ? void 0 : t.outline(e),
      };
    }),
  },
  rY = XX({
    variants: tY,
    baseStyle: JX,
    sizes: eY,
    defaultProps: { size: "md", variant: "subtle", colorScheme: "gray" },
  });
O_.tagTheme = rY;
var B_ = {},
  Bc = I,
  Un = Pi,
  AP;
const nY = Bc.defineStyle({
  ...((AP = Un.inputTheme.baseStyle) == null ? void 0 : AP.field),
  paddingY: "2",
  minHeight: "20",
  lineHeight: "short",
  verticalAlign: "top",
});
var _P;
const oY = {outline: Bc.defineStyle((e) => {
    var t;
    return (
      ((t = Un.inputTheme.variants) == null ? void 0 : t.outline(e).field) ?? {}
    );
  }),
  flushed: Bc.defineStyle((e) => {
    var t;
    return (
      ((t = Un.inputTheme.variants) == null ? void 0 : t.flushed(e).field) ?? {}
    );
  }),
  filled: Bc.defineStyle((e) => {
    var t;
    return (
      ((t = Un.inputTheme.variants) == null ? void 0 : t.filled(e).field) ?? {}
    );
  }),
  unstyled:
    ((_P = Un.inputTheme.variants) == null ? void 0 : _P.unstyled.field) ?? {},
};
var IP, EP, MP, FP;
const aY = {
    xs: ((IP = Un.inputTheme.sizes) == null ? void 0 : IP.xs.field) ?? {},
    sm: ((EP = Un.inputTheme.sizes) == null ? void 0 : EP.sm.field) ?? {},
    md: ((MP = Un.inputTheme.sizes) == null ? void 0 : MP.md.field) ?? {},
    lg: ((FP = Un.inputTheme.sizes) == null ? void 0 : FP.lg.field) ?? {},
  },
  sY = Bc.defineStyleConfig({
    baseStyle: nY,
    sizes: aY,
    variants: oY,
    defaultProps: { size: "md", variant: "outline" },
  });
B_.textareaTheme = sY;
var L_ = {},
  V_ = I,
  xb = Pt;
const Ku = xb.cssVar("tooltip-bg"),
  Np = xb.cssVar("tooltip-fg"),
  iY = xb.cssVar("popper-arrow-bg"),
  cY = V_.defineStyle({
    bg: Ku.reference,
    color: Np.reference,
    [Ku.variable]: "colors.gray.700",
    [Np.variable]: "colors.whiteAlpha.900",
    _dark: {
      [Ku.variable]: "colors.gray.300",
      [Np.variable]: "colors.gray.900",
    },
    [iY.variable]: Ku.reference,
    px: "2",
    py: "0.5",
    borderRadius: "sm",
    fontWeight: "medium",
    fontSize: "sm",
    boxShadow: "md",
    maxW: "xs",
    zIndex: "tooltip",
  }),
  lY = V_.defineStyleConfig({ baseStyle: cY });
L_.tooltipTheme = lY;
var z_ = $A,
  H_ = wA,
  W_ = LA,
  G_ = _l,
  U_ = HA,
  K_ = WA,
  uY = UA,
  q_ = fb,
  X_ = YA,
  Y_ = QA,
  Z_ = e_,
  Q_ = r_,
  J_ = n_,
  eI = o_,
  tI = a_,
  rI = s_,
  nI = i_,
  oI = l_,
  aI = Pi,
  sI = u_,
  iI = d_,
  cI = m_,
  lI = p_,
  uI = v_,
  dI = y_,
  fI = $_,
  mI = w_,
  hI = C_,
  pI = k_,
  vI = P_,
  yI = R_,
  gI = A_,
  bI = __,
  SI = I_,
  xI = E_,
  $I = F_,
  wI = j_,
  CI = D_,
  kI = N_,
  TI = O_,
  PI = B_,
  RI = L_;
const dY = {
  Accordion: z_.accordionTheme,
  Alert: H_.alertTheme,
  Avatar: W_.avatarTheme,
  Badge: G_.badgeTheme,
  Breadcrumb: U_.breadcrumbTheme,
  Button: K_.buttonTheme,
  Checkbox: q_.checkboxTheme,
  CloseButton: X_.closeButtonTheme,
  Code: Y_.codeTheme,
  Container: Z_.containerTheme,
  Divider: Q_.dividerTheme,
  Drawer: J_.drawerTheme,
  Editable: eI.editableTheme,
  Form: tI.formTheme,
  FormError: rI.formErrorTheme,
  FormLabel: nI.formLabelTheme,
  Heading: oI.headingTheme,
  Input: aI.inputTheme,
  Kbd: sI.kbdTheme,
  Link: iI.linkTheme,
  List: cI.listTheme,
  Menu: lI.menuTheme,
  Modal: uI.modalTheme,
  NumberInput: dI.numberInputTheme,
  PinInput: fI.pinInputTheme,
  Popover: mI.popoverTheme,
  Progress: hI.progressTheme,
  Radio: pI.radioTheme,
  Select: vI.selectTheme,
  Skeleton: yI.skeletonTheme,
  SkipLink: gI.skipLinkTheme,
  Slider: bI.sliderTheme,
  Spinner: SI.spinnerTheme,
  Stat: xI.statTheme,
  Switch: wI.switchTheme,
  Table: CI.tableTheme,
  Tabs: kI.tabsTheme,
  Tag: TI.tagTheme,
  Textarea: PI.textareaTheme,
  Tooltip: RI.tooltipTheme,
  Card: uY.cardTheme,
  Stepper: $I.stepperTheme,
};
Se.Accordion = z_.accordionTheme;
Se.Alert = H_.alertTheme;
Se.Avatar = W_.avatarTheme;
Se.Badge = G_.badgeTheme;
Se.Breadcrumb = U_.breadcrumbTheme;
Se.Button = K_.buttonTheme;
Se.Checkbox = q_.checkboxTheme;
Se.CloseButton = X_.closeButtonTheme;
Se.Code = Y_.codeTheme;
Se.Container = Z_.containerTheme;
Se.Divider = Q_.dividerTheme;
Se.Drawer = J_.drawerTheme;
Se.Editable = eI.editableTheme;
Se.Form = tI.formTheme;
Se.FormError = rI.formErrorTheme;
Se.FormLabel = nI.formLabelTheme;
Se.Heading = oI.headingTheme;
Se.Input = aI.inputTheme;
Se.Kbd = sI.kbdTheme;
Se.Link = iI.linkTheme;
Se.List = cI.listTheme;
Se.Menu = lI.menuTheme;
Se.Modal = uI.modalTheme;
Se.NumberInput = dI.numberInputTheme;
Se.PinInput = fI.pinInputTheme;
Se.Popover = mI.popoverTheme;
Se.Progress = hI.progressTheme;
Se.Radio = pI.radioTheme;
Se.Select = vI.selectTheme;
Se.Skeleton = yI.skeletonTheme;
Se.SkipLink = gI.skipLinkTheme;
Se.Slider = bI.sliderTheme;
Se.Spinner = SI.spinnerTheme;
Se.Stat = xI.statTheme;
Se.Stepper = $I.stepperTheme;
Se.Switch = wI.switchTheme;
Se.Table = CI.tableTheme;
Se.Tabs = kI.tabsTheme;
Se.Tag = TI.tagTheme;
Se.Textarea = PI.textareaTheme;
Se.Tooltip = RI.tooltipTheme;
Se.components = dY;
var AI = {};
const fY = {
  none: 0,
  "1px": "1px solid",
  "2px": "2px solid",
  "4px": "4px solid",
  "8px": "8px solid",
};
var mY = fY;
const hY = {
  base: "0em",
  sm: "30em",
  md: "48em",
  lg: "62em",
  xl: "80em",
  "2xl": "96em",
};
var pY = hY;
const vY = {
  transparent: "transparent",
  current: "currentColor",
  black: "#000000",
  white: "#FFFFFF",
  whiteAlpha: {
    50: "rgba(255, 255, 255, 0.04)",
    100: "rgba(255, 255, 255, 0.06)",
    200: "rgba(255, 255, 255, 0.08)",
    300: "rgba(255, 255, 255, 0.16)",
    400: "rgba(255, 255, 255, 0.24)",
    500: "rgba(255, 255, 255, 0.36)",
    600: "rgba(255, 255, 255, 0.48)",
    700: "rgba(255, 255, 255, 0.64)",
    800: "rgba(255, 255, 255, 0.80)",
    900: "rgba(255, 255, 255, 0.92)",
  },
  blackAlpha: {
    50: "rgba(0, 0, 0, 0.04)",
    100: "rgba(0, 0, 0, 0.06)",
    200: "rgba(0, 0, 0, 0.08)",
    300: "rgba(0, 0, 0, 0.16)",
    400: "rgba(0, 0, 0, 0.24)",
    500: "rgba(0, 0, 0, 0.36)",
    600: "rgba(0, 0, 0, 0.48)",
    700: "rgba(0, 0, 0, 0.64)",
    800: "rgba(0, 0, 0, 0.80)",
    900: "rgba(0, 0, 0, 0.92)",
  },
  gray: {
    50: "#F5E6D3",
    100: "#F5E6D3",
    200: "#F5E6D3",
    300: "#A97142",
    400: "#8B5A2B",
    500: "#8B5A2B",
    600: "#6B3E1E",
    700: "#6B3E1E",
    800: "#6B3E1E",
    900: "#6B3E1E",
  },
  red: {
    50: "#FFF5F5",
    100: "#FED7D7",
    200: "#FEB2B2",
    300: "#FC8181",
    400: "#F56565",
    500: "#E53E3E",
    600: "#C53030",
    700: "#9B2C2C",
    800: "#822727",
    900: "#63171B",
  },
  orange: {
    50: "#FFFAF0",
    100: "#FEEBC8",
    200: "#FBD38D",
    300: "#F6AD55",
    400: "#ED8936",
    500: "#DD6B20",
    600: "#C05621",
    700: "#9C4221",
    800: "#7B341E",
    900: "#652B19",
  },
  yellow: {
    50: "#FFFFF0",
    100: "#FEFCBF",
    200: "#FAF089",
    300: "#F6E05E",
    400: "#ECC94B",
    500: "#D69E2E",
    600: "#B7791F",
    700: "#975A16",
    800: "#744210",
    900: "#5F370E",
  },
  green: {
    50: "#F0FFF4",
    100: "#C6F6D5",
    200: "#9AE6B4",
    300: "#68D391",
    400: "#48BB78",
    500: "#38A169",
    600: "#2F855A",
    700: "#276749",
    800: "#22543D",
    900: "#1C4532",
  },
  teal: {
    50: "#E6FFFA",
    100: "#B2F5EA",
    200: "#81E6D9",
    300: "#4FD1C5",
    400: "#38B2AC",
    500: "#319795",
    600: "#2C7A7B",
    700: "#285E61",
    800: "#6B3E1E",
    900: "#6B3E1E",
  },
  blue: {
    50: "#F5E6D3",
    100: "#F5E6D3",
    200: "#A97142",
    300: "#8B5A2B",
    400: "#8B5A2B",
    500: "#8B5A2B",
    600: "#6B3E1E",
    700: "#6B3E1E",
    800: "#6B3E1E",
    900: "#6B3E1E",
  },
  cyan: {
    50: "#EDFDFD",
    100: "#F5E6D3",
    200: "#A97142",
    300: "#A97142",
    400: "#6B3E1E",
    500: "#6B3E1E",
    600: "#6B3E1E",
    700: "#6B3E1E",
    800: "#6B3E1E",
    900: "#6B3E1E",
  },
  purple: {
    50: "#FAF5FF",
    100: "#E9D8FD",
    200: "#D6BCFA",
    300: "#B794F4",
    400: "#8B5A2B",
    500: "#8B5A2B",
    600: "#8B5A2B",
    700: "#6B3E1E",
    800: "#6B3E1E",
    900: "#6B3E1E",
  },
  pink: {
    50: "#FFF5F7",
    100: "#FED7E2",
    200: "#FBB6CE",
    300: "#F687B3",
    400: "#ED64A6",
    500: "#D53F8C",
    600: "#B83280",
    700: "#97266D",
    800: "#702459",
    900: "#521B41",
  },
};
var yY = vY;
const gY = {
  none: "0",
  sm: "0.125rem",
  base: "0.25rem",
  md: "0.375rem",
  lg: "0.5rem",
  xl: "0.75rem",
  "2xl": "1rem",
  "3xl": "1.5rem",
  full: "9999px",
};
var bY = gY;
const SY = {
  xs: "0 0 0 1px rgba(0, 0, 0, 0.05)",
  sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  base: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  outline: "0 0 0 3px rgba(139, 90, 43, 0.6)",
  inner: "inset 0 2px 4px 0 rgba(0,0,0,0.06)",
  none: "none",
  "dark-lg":
    "rgba(0, 0, 0, 0.1) 0px 0px 0px 1px, rgba(0, 0, 0, 0.2) 0px 5px 10px, rgba(0, 0, 0, 0.4) 0px 15px 40px",
};
var xY = SY;
const $Y = {
    common:
      "background-color, border-color, color, fill, stroke, opacity, box-shadow, transform",
    colors: "background-color, border-color, color, fill, stroke",
    dimensions: "width, height",
    position: "left, right, top, bottom",
    background: "background-color, background-image, background-position",
  },
  wY = {
    "ease-in": "cubic-bezier(0.4, 0, 1, 1)",
    "ease-out": "cubic-bezier(0, 0, 0.2, 1)",
    "ease-in-out": "cubic-bezier(0.4, 0, 0.2, 1)",
  },
  CY = {
    "ultra-fast": "50ms",
    faster: "100ms",
    fast: "150ms",
    normal: "200ms",
    slow: "300ms",
    slower: "400ms",
    "ultra-slow": "500ms",
  },
  kY = { property: $Y, easing: wY, duration: CY };
var TY = kY;
const PY = {
  hide: -1,
  auto: "auto",
  base: 0,
  docked: 10,
  dropdown: 1e3,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
};
var RY = PY;
const AY = {
  none: 0,
  sm: "4px",
  base: "8px",
  md: "12px",
  lg: "16px",
  xl: "24px",
  "2xl": "40px",
  "3xl": "64px",
};
var _Y = AY,
  IY = mY,
  EY = pY,
  MY = yY,
  FY = bY,
  jY = xY,
  DY = VA,
  NY = lb,
  OY = TY,
  BY = g_,
  LY = RY,
  VY = _Y;
const zY = {
  breakpoints: EY,
  zIndices: LY,
  radii: FY,
  blur: VY,
  colors: MY,
  ...BY,
  sizes: DY,
  shadows: jY,
  space: NY.spacing,
  borders: IY,
  transition: OY,
};
AI.foundations = zY;
var _I = {};
const HY = {
  colors: {
    "chakra-body-text": { _light: "gray.800", _dark: "whiteAlpha.900" },
    "chakra-body-bg": { _light: "white", _dark: "gray.800" },
    "chakra-border-color": { _light: "gray.200", _dark: "whiteAlpha.300" },
    "chakra-inverse-text": { _light: "white", _dark: "gray.800" },
    "chakra-subtle-bg": { _light: "gray.100", _dark: "gray.700" },
    "chakra-subtle-text": { _light: "gray.600", _dark: "gray.400" },
    "chakra-placeholder-color": { _light: "gray.500", _dark: "whiteAlpha.400" },
  },
};
_I.semanticTokens = HY;
var II = {};
const WY = {
  global: {
    body: {
      fontFamily: "body",
      color: "chakra-body-text",
      bg: "chakra-body-bg",
      transitionProperty: "background-color",
      transitionDuration: "normal",
      lineHeight: "base",
    },
    "*::placeholder": {color: "chakra-placeholder-color" },
    "*, *::before, &::after": { borderColor: "chakra-border-color" },
  },
};
II.styles = WY;
var $b = {},
  GY = x;
const EI = [
  "borders",
  "breakpoints",
  "colors",
  "components",
  "config",
  "direction",
  "fonts",
  "fontSizes",
  "fontWeights",
  "letterSpacings",
  "lineHeights",
  "radii",
  "shadows",
  "sizes",
  "space",
  "styles",
  "transition",
  "zIndices",
];
function UY(e) {
  return GY.isObject(e)
    ? EI.every((t) => Object.prototype.hasOwnProperty.call(e, t))
    : !1;
}
$b.isChakraTheme = UY;
$b.requiredChakraThemeKeys = EI;
var KY = Se,
  MI = AI,
  FI = _I,
  jI = II,
  DI = $b;
const NI = "ltr",
  OI = {
    useSystemColorMode: !1,
    initialColorMode: "light",
    cssVarPrefix: "chakra",
  },
  qY = {
    semanticTokens: FI.semanticTokens,
    direction: NI,
    ...MI.foundations,
    components: KY.components,
    styles: jI.styles,
    config: OI,
  },
  XY = {
    semanticTokens: FI.semanticTokens,
    direction: NI,
    components: {},
    ...MI.foundations,
    styles: jI.styles,
    config: OI,
  };
no.isChakraTheme = DI.isChakraTheme;
no.requiredChakraThemeKeys = DI.requiredChakraThemeKeys;
no.baseTheme = XY;
no.theme = qY;
var BI = {},
  wb = {},
  LI = {},
  jl = {},
  YY = !1;
function ZY(e) {
  if (e.sheet) return e.sheet;
  for (var t = 0; t < document.styleSheets.length; t++)
    if (document.styleSheets[t].ownerNode === e) return document.styleSheets[t];
}
function QY(e) {
  var t = document.createElement("style");
  return (
    t.setAttribute("data-emotion", e.key),
    e.nonce !== void 0 && t.setAttribute("nonce", e.nonce),
    t.appendChild(document.createTextNode("")),
    t.setAttribute("data-s", ""),
    t
  );
}
var JY = (function () {
    function e(r) {
      var n = this;
      (this._insertTag = function (o) {
        var a;
        n.tags.length === 0
          ? n.insertionPoint
            ? (a = n.insertionPoint.nextSibling)
            : n.prepend
            ? (a = n.container.firstChild)
            : (a = n.before)
          : (a = n.tags[n.tags.length - 1].nextSibling),
          n.container.insertBefore(o, a),
          n.tags.push(o);
      }),
        (this.isSpeedy = r.speedy === void 0 ? !YY : r.speedy),
        (this.tags = []),
        (this.ctr = 0),
        (this.nonce = r.nonce),
        (this.key = r.key),
        (this.container = r.container),
        (this.prepend = r.prepend),
        (this.insertionPoint = r.insertionPoint),
        (this.before = null);
    }
    var t = e.prototype;
    return (
      (t.hydrate = function (n) {
        n.forEach(this._insertTag);
      }),
      (t.insert = function (n) {
        this.ctr % (this.isSpeedy ? 65e3 : 1) === 0 &&
          this._insertTag(QY(this));
        var o = this.tags[this.tags.length - 1];
        if (this.isSpeedy) {
          var a = ZY(o);
          try {
            a.insertRule(n, a.cssRules.length);
          } catch {}
        } else o.appendChild(document.createTextNode(n));
        this.ctr++;
      }),
      (t.flush = function () {
        this.tags.forEach(function (n) {
          var o;
          return (o = n.parentNode) == null ? void 0 : o.removeChild(n);
        }),
          (this.tags = []),
          (this.ctr = 0);
      }),
      e
    );
  })(),
  It = "-ms-",
  mf = "-moz-",
  Fe = "-webkit-",
  VI = "comm",
  Cb = "rule",
  kb = "decl",
  eZ = "@import",
  zI = "@keyframes",
  tZ = "@layer",
  rZ = Math.abs,
  Qf = String.fromCharCode,
  nZ = Object.assign;
function oZ(e, t) {
  return kt(e, 0) ^ 45
    ? (((((((t << 2) ^ kt(e, 0)) << 2) ^ kt(e, 1)) << 2) ^ kt(e, 2)) << 2) ^
        kt(e, 3)
    : 0;
}
function HI(e) {
  return e.trim();
}
function aZ(e, t) {
  return (e = t.exec(e)) ? e[0] : e;
}
function je(e, t, r) {
  return e.replace(t, r);
}
function hy(e, t) {
  return e.indexOf(t);
}
function kt(e, t) {
  return e.charCodeAt(t) | 0;
}
function ol(e, t, r) {
  return e.slice(t, r);
}
function fn(e) {
  return e.length;
}
function Tb(e) {
  return e.length;
}
function qu(e, t) {
  return t.push(e), e;
}
function sZ(e, t) {
  return e.map(t).join("");
}
var Jf = 1,
  ei = 1,
  WI = 0,
  Qt = 0,
  ct = 0,
  Ai = "";
function em(e, t, r, n, o, a, s) {
  return {
    value: e,
    root: t,
    parent: r,
    type: n,
    props: o,
    children: a,
    line: Jf,
    column: ei,
    length: s,
    return: "",
  };
}
function dc(e, t) {
  return nZ(em("", null, null, "", null, null, 0), e, { length: -e.length }, t);
}
function iZ() {
  return ct;
}
function cZ() {
  return (
    (ct = Qt > 0 ? kt(Ai, --Qt) : 0), ei--, ct === 10 && ((ei = 1), Jf--), ct
  );
}
function vr() {
  return (
    (ct = Qt < WI ? kt(Ai, Qt++) : 0), ei++, ct === 10 && ((ei = 1), Jf++), ct
  );
}
function gn() {
  return kt(Ai, Qt);
}
function Ld() {
  return Qt;
}
function Dl(e, t) {
  return ol(Ai, e, t);
}
function al(e) {
  switch (e) {
    case 0:
    case 9:
    case 10:
    case 13:
    case 32:
      return 5;
    case 33:
    case 43:
    case 44:
    case 47:
    case 62:
    case 64:
    case 126:
    case 59:
    case 123:
    case 125:
      return 4;
    case 58:
      return 3;
    case 34:
    case 39:
    case 40:
    case 91:
      return 2;
    case 41:
    case 93:
      return 1;
  }
  return 0;
}
function GI(e) {
  return (Jf = ei = 1), (WI = fn((Ai = e))), (Qt = 0), [];
}
function UI(e) {
  return (Ai = ""), e;
}
function Vd(e) {
  return HI(Dl(Qt - 1, py(e === 91 ? e + 2 : e === 40 ? e + 1 : e)));
}
function lZ(e) {
  for (; (ct = gn()) && ct < 33; ) vr();
  return al(e) > 2 || al(ct) > 3 ? "" : " ";
}
function uZ(e, t) {
  for (
    ;
    --t &&
    vr() &&
    !(ct < 48 || ct > 102 || (ct > 57 && ct < 65) || (ct > 70 && ct < 97));

  );
  return Dl(e, Ld() + (t < 6 && gn() == 32 && vr() == 32));
}
function py(e) {
  for (; vr(); )
    switch (ct) {
      case e:
        return Qt;
      case 34:
      case 39:
        e !== 34 && e !== 39 && py(ct);
        break;
      case 40:
        e === 41 && py(e);
        break;
      case 92:
        vr();
        break;
    }
  return Qt;
}
function dZ(e, t) {
  for (; vr() && e + ct !== 57; ) if (e + ct === 84 && gn() === 47) break;
  return "/*" + Dl(t, Qt - 1) + "*" + Qf(e === 47 ? e : vr());
}
function fZ(e) {
  for (; !al(gn()); ) vr();
  return Dl(e, Qt);
}
function mZ(e) {
  return UI(zd("", null, null, null, [""], (e = GI(e)), 0, [0], e));
}
function zd(e, t, r, n, o, a, s, i, c) {
  for (
    var l = 0,
      u = 0,
      d = s,
      f = 0,
      m = 0,
      h = 0,
      p = 1,
      v = 1,
      b = 1,
      y = 0,
      S = "",
      w = o,
      C = a,
      T = n,
      k = S;
    v;

  )
    switch (((h = y), (y = vr()))) {
      case 40:
        if (h != 108 && kt(k, d - 1) == 58) {
          hy((k += je(Vd(y), "&", "&\f")), "&\f") != -1 && (b = -1);
          break;
        }
      case 34:
      case 39:
      case 91:
        k += Vd(y);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        k += lZ(h);
        break;
      case 92:
        k += uZ(Ld() - 1, 7);
        continue;
      case 47:
        switch (gn()) {
          case 42:
          case 47:
            qu(hZ(dZ(vr(), Ld()), t, r), c);
            break;
          default:
            k += "/";
        }
        break;
      case 123 * p:
        i[l++] = fn(k) * b;
      case 125 * p:
      case 59:
      case 0:
        switch (y) {
          case 0:
          case 125:
            v = 0;
          case 59 + u:
            b == -1 && (k = je(k, /\f/g, "")),
              m > 0 &&
                fn(k) - d &&
                qu(
                  m > 32
                    ? n1(k + ";", n, r, d - 1)
                    : n1(je(k, " ", "") + ";", n, r, d - 2),
                  c
                );
            break;
          case 59:
            k += ";";
          default:
            if (
              (qu((T = r1(k, t, r, l, u, o, i, S, (w = []), (C = []), d)), a),
              y === 123)
            )
              if (u === 0) zd(k, t, T, T, w, a, d, i, C);
              else
                switch (f === 99 && kt(k, 3) === 110 ? 100 : f) {
                  case 100:
                  case 108:
                  case 109:
                  case 115:
                    zd(
                      e,
                      T,
                      T,
                      n && qu(r1(e, T, T, 0, 0, o, i, S, o, (w = []), d), C),
                      o,
                      C,
                      d,
                      i,
                      n ? w : C
                    );
                    break;
                  default:
                    zd(k, T, T, T, [""], C, 0, i, C);
                }
        }
        (l = u = m = 0), (p = b = 1), (S = k = ""), (d = s);
        break;
      case 58:
        (d = 1 + fn(k)), (m = h);
      default:
        if (p < 1) {
          if (y == 123) --p;
          else if (y == 125 && p++ == 0 && cZ() == 125) continue;
        }
        switch (((k += Qf(y)), y * p)) {
          case 38:
            b = u > 0 ? 1 : ((k += "\f"), -1);
            break;
          case 44:
            (i[l++] = (fn(k) - 1) * b), (b = 1);
            break;
          case 64:
            gn() === 45 && (k += Vd(vr())),
              (f = gn()),
              (u = d = fn((S = k += fZ(Ld())))),
              y++;
            break;
          case 45:
            h === 45 && fn(k) == 2 && (p = 0);
        }
    }
  return a;
}
function r1(e, t, r, n, o, a, s, i, c, l, u) {
  for (
    var d = o - 1, f = o === 0 ? a : [""], m = Tb(f), h = 0, p = 0, v = 0;
    h < n;
    ++h
  )
    for (var b = 0, y = ol(e, d + 1, (d = rZ((p = s[h])))), S = e; b < m; ++b)
      (S = HI(p > 0 ? f[b] + " " + y : je(y, /&\f/g, f[b]))) && (c[v++] = S);
  return em(e, t, r, o === 0 ? Cb : i, c, l, u);
}
function hZ(e, t, r) {
  return em(e, t, r, VI, Qf(iZ()), ol(e, 2, -2), 0);
}
function n1(e, t, r, n) {
  return em(e, t, r, kb, ol(e, 0, n), ol(e, n + 1, -1), n);
}
function Xs(e, t) {
  for (var r = "", n = Tb(e), o = 0; o < n; o++) r += t(e[o], o, e, t) || "";
  return r;
}
function pZ(e, t, r, n) {
  switch (e.type) {
    case tZ:
      if (e.children.length) break;
    case eZ:
    case kb:
      return (e.return = e.return || e.value);
    case VI:
      return "";
    case zI:
      return (e.return = e.value + "{" + Xs(e.children, n) + "}");
    case Cb:
      e.value = e.props.join(",");
  }
  return fn((r = Xs(e.children, n)))
    ? (e.return = e.value + "{" + r + "}")
    : "";
}
function vZ(e) {
  var t = Tb(e);
  return function (r, n, o, a) {
    for (var s = "", i = 0; i < t; i++) s += e[i](r, n, o, a) || "";
    return s;
  };
}
function yZ(e) {
  return function (t) {
    t.root || ((t = t.return) && e(t));
  };
}
var o1 = function (t) {
  var r = new WeakMap();
  return function (n) {
    if (r.has(n)) return r.get(n);
    var o = t(n);
    return r.set(n, o), o;
  };
};
function Pb(e) {
  var t = Object.create(null);
  return function (r) {
    return t[r] === void 0 && (t[r] = e(r)), t[r];
  };
}
var gZ = function (t, r, n) {
    for (
      var o = 0, a = 0;
      (o = a), (a = gn()), o === 38 && a === 12 && (r[n] = 1), !al(a);

    )
      vr();
    return Dl(t, Qt);
  },
  bZ = function (t, r) {
    var n = -1,
      o = 44;
    do
      switch (al(o)) {
        case 0:
          o === 38 && gn() === 12 && (r[n] = 1), (t[n] += gZ(Qt - 1, r, n));
          break;
        case 2:
          t[n] += Vd(o);
          break;
        case 4:
          if (o === 44) {
            (t[++n] = gn() === 58 ? "&\f" : ""), (r[n] = t[n].length);
            break;
          }
        default:
          t[n] += Qf(o);
      }
    while ((o = vr()));
    return t;
  },
  SZ = function (t, r) {
    return UI(bZ(GI(t), r));
  },
  a1 = new WeakMap(),
  xZ = function (t) {
    if (!(t.type !== "rule" || !t.parent || t.length < 1)) {
      for (
        var r = t.value,
          n = t.parent,
          o = t.column === n.column && t.line === n.line;
        n.type !== "rule";

      )
        if (((n = n.parent), !n)) return;
      if (
        !(t.props.length === 1 && r.charCodeAt(0) !== 58 && !a1.get(n)) &&
        !o
      ) {
        a1.set(t, !0);
        for (
          var a = [], s = SZ(r, a), i = n.props, c = 0, l = 0;
          c < s.length;
          c++
        )
          for (var u = 0; u < i.length; u++, l++)
            t.props[l] = a[c] ? s[c].replace(/&\f/g, i[u]) : i[u] + " " + s[c];
      }
    }
  },
  $Z = function (t) {
    if (t.type === "decl") {
      var r = t.value;
      r.charCodeAt(0) === 108 &&
        r.charCodeAt(2) === 98 &&
        ((t.return = ""), (t.value = ""));
    }
  };
function KI(e, t) {
  switch (oZ(e, t)) {
    case 5103:
      return Fe + "print-" + e + e;
    case 5737:
    case 4201:
    case 3177:
    case 3433:
    case 1641:
    case 4457:
    case 2921:
    case 5572:
    case 6356:
    case 5844:
    case 3191:
    case 6645:
    case 3005:
    case 6391:
    case 5879:
    case 5623:
    case 6135:
    case 4599:
    case 4855:
    case 4215:
    case 6389:
    case 5109:
    case 5365:
    case 5621:
    case 3829:
      return Fe + e + e;
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return Fe + e + mf + e + It + e + e;
    case 6828:
    case 4268:
      return Fe + e + It + e + e;
    case 6165:
      return Fe + e + It + "flex-" + e + e;
    case 5187:
      return (
        Fe + e + je(e, /(\w+).+(:[^]+)/, Fe + "box-$1$2" + It + "flex-$1$2") + e
      );
    case 5443:
      return Fe + e + It + "flex-item-" + je(e, /flex-|-self/, "") + e;
    case 4675:
      return (
        Fe +
        e +
        It +
        "flex-line-pack" +
        je(e, /align-content|flex-|-self/, "") +
        e
      );
    case 5548:
      return Fe + e + It + je(e, "shrink", "negative") + e;
    case 5292:
      return Fe + e + It + je(e, "basis", "preferred-size") + e;
    case 6060:
      return (
        Fe +
        "box-" +
        je(e, "-grow", "") +
        Fe +
        e +
        It +
        je(e, "grow", "positive") +
        e
      );
    case 4554:
      return Fe + je(e, /([^-])(transform)/g, "$1" + Fe + "$2") + e;
    case 6187:
      return (
        je(
          je(je(e, /(zoom-|grab)/, Fe + "$1"), /(image-set)/, Fe + "$1"),
          e,
          ""
        ) + e
      );
    case 5495:
    case 3959:
      return je(e, /(image-set\([^]*)/, Fe + "$1$`$1");
    case 4968:
      return (
        je(
          je(e, /(.+:)(flex-)?(.*)/, Fe + "box-pack:$3" + It + "flex-pack:$3"),
          /s.+-b[^;]+/,
          "justify"
        ) +
        Fe +
        e +
        e
      );
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return je(e, /(.+)-inline(.+)/, Fe + "$1$2") + e;
    case 8116:
    case 7059:
    case 5753:
    case 5535:
    case 5445:
    case 5701:
    case 4933:
    case 4677:
    case 5533:
    case 5789:
    case 5021:
    case 4765:
      if (fn(e) - 1 - t > 6)
        switch (kt(e, t + 1)) {
          case 109:
            if (kt(e, t + 4) !== 45) break;
          case 102:
            return (
              je(
                e,
                /(.+:)(.+)-([^]+)/,
                "$1" +
                  Fe +
                  "$2-$3$1" +
                  mf +
                  (kt(e, t + 3) == 108 ? "$3" : "$2-$3")
              ) + e
            );
          case 115:
            return ~hy(e, "stretch")
              ? KI(je(e, "stretch", "fill-available"), t) + e
              : e;
        }
      break;
    case 4949:
      if (kt(e, t + 1) !== 115) break;
    case 6444:
      switch (kt(e, fn(e) - 3 - (~hy(e, "!important") && 10))) {
        case 107:
          return je(e, ":", ":" + Fe) + e;
        case 101:
          return (
            je(
              e,
              /(.+:)([^;!]+)(;|!.+)?/,
              "$1" +
                Fe +
                (kt(e, 14) === 45 ? "inline-" : "") +
                "box$3$1" +
                Fe +
                "$2$3$1" +
                It +
                "$2box$3"
            ) + e
          );
      }
      break;
    case 5936:
      switch (kt(e, t + 11)) {
        case 114:
          return Fe + e + It + je(e, /[svh]\w+-[tblr]{2}/, "tb") + e;
        case 108:
          return Fe + e + It + je(e, /[svh]\w+-[tblr]{2}/, "tb-rl") + e;
        case 45:
          return Fe + e + It + je(e, /[svh]\w+-[tblr]{2}/, "lr") + e;
      }
      return Fe + e + It + e + e;
  }
  return e;
}
var wZ = function (t, r, n, o) {
    if (t.length > -1 && !t.return)
      switch (t.type) {
        case kb:
          t.return = KI(t.value, t.length);
          break;
        case zI:
          return Xs([dc(t, { value: je(t.value, "@", "@" + Fe) })], o);
        case Cb:
          if (t.length)
            return sZ(t.props, function (a) {
              switch (aZ(a, /(::plac\w+|:read-\w+)/)) {
                case ":read-only":
                case ":read-write":
                  return Xs(
                    [dc(t, { props: [je(a, /:(read-\w+)/, ":" + mf + "$1")] })],
                    o
                  );
                case "::placeholder":
                  return Xs(
                    [
                      dc(t, {
                        props: [je(a, /:(plac\w+)/, ":" + Fe + "input-$1")],
                      }),
                      dc(t, { props: [je(a, /:(plac\w+)/, ":" + mf + "$1")] }),
                      dc(t, { props: [je(a, /:(plac\w+)/, It + "input-$1")] }),
                    ],
                    o
                  );
              }
              return "";
            });
      }
  },
  CZ = [wZ],
  kZ = function (t) {
    var r = t.key;
    if (r === "css") {
      var n = document.querySelectorAll("style[data-emotion]:not([data-s])");
      Array.prototype.forEach.call(n, function (p) {
        var v = p.getAttribute("data-emotion");
        v.indexOf(" ") !== -1 &&
          (document.head.appendChild(p), p.setAttribute("data-s", ""));
      });
    }
    var o = t.stylisPlugins || CZ,
      a = {},
      s,
      i = [];
    (s = t.container || document.head),
      Array.prototype.forEach.call(
        document.querySelectorAll('style[data-emotion^="' + r + ' "]'),
        function (p) {
          for (
            var v = p.getAttribute("data-emotion").split(" "), b = 1;
            b < v.length;
            b++
          )
            a[v[b]] = !0;
          i.push(p);
        }
      );
    var c,
      l = [xZ, $Z];
    {
      var u,
        d = [
          pZ,
          yZ(function (p) {
            u.insert(p);
          }),
        ],
        f = vZ(l.concat(o, d)),
        m = function (v) {
          return Xs(mZ(v), f);
        };
      c = function (v, b, y, S) {
        (u = y),
          m(v ? v + "{" + b.styles + "}" : b.styles),
          S && (h.inserted[b.name] = !0);
      };
    }
    var h = {
      key: r,
      sheet: new JY({
        key: r,
        container: s,
        nonce: t.nonce,
        speedy: t.speedy,
        prepend: t.prepend,
        insertionPoint: t.insertionPoint,
      }),
      nonce: t.nonce,
      inserted: a,
      registered: {},
      insert: c,
    };
    return h.sheet.hydrate(i), h;
  },
  qI = { exports: {} },
  Le = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var $t = typeof Symbol == "function" && Symbol.for,
  Rb = $t ? Symbol.for("react.element") : 60103,
  Ab = $t ? Symbol.for("react.portal") : 60106,
  tm = $t ? Symbol.for("react.fragment") : 60107,
  rm = $t ? Symbol.for("react.strict_mode") : 60108,
  nm = $t ? Symbol.for("react.profiler") : 60114,
  om = $t ? Symbol.for("react.provider") : 60109,
  am = $t ? Symbol.for("react.context") : 60110,
  _b = $t ? Symbol.for("react.async_mode") : 60111,
  sm = $t ? Symbol.for("react.concurrent_mode") : 60111,
  im = $t ? Symbol.for("react.forward_ref") : 60112,
  cm = $t ? Symbol.for("react.suspense") : 60113,
  TZ = $t ? Symbol.for("react.suspense_list") : 60120,
  lm = $t ? Symbol.for("react.memo") : 60115,
  um = $t ? Symbol.for("react.lazy") : 60116,
  PZ = $t ? Symbol.for("react.block") : 60121,
  RZ = $t ? Symbol.for("react.fundamental") : 60117,
  AZ = $t ? Symbol.for("react.responder") : 60118,
  _Z = $t ? Symbol.for("react.scope") : 60119;
function xr(e) {
  if (typeof e == "object" && e !== null) {
    var t = e.$$typeof;
    switch (t) {
      case Rb:
        switch (((e = e.type), e)) {
          case _b:
          case sm:
          case tm:
          case nm:
          case rm:
          case cm:
            return e;
          default:
            switch (((e = e && e.$$typeof), e)) {
              case am:
              case im:
              case um:
              case lm:
              case om:
                return e;
              default:
                return t;
            }
        }
      case Ab:
        return t;
    }
  }
}
function XI(e) {
  return xr(e) === sm;
}
Le.AsyncMode = _b;
Le.ConcurrentMode = sm;
Le.ContextConsumer = am;
Le.ContextProvider = om;
Le.Element = Rb;
Le.ForwardRef = im;
Le.Fragment = tm;
Le.Lazy = um;
Le.Memo = lm;
Le.Portal = Ab;
Le.Profiler = nm;
Le.StrictMode = rm;
Le.Suspense = cm;
Le.isAsyncMode = function (e) {
  return XI(e) || xr(e) === _b;
};
Le.isConcurrentMode = XI;
Le.isContextConsumer = function (e) {
  return xr(e) === am;
};
Le.isContextProvider = function (e) {
  return xr(e) === om;
};
Le.isElement = function (e) {
  return typeof e == "object" && e !== null && e.$$typeof === Rb;
};
Le.isForwardRef = function (e) {
  return xr(e) === im;
};
Le.isFragment = function (e) {
  return xr(e) === tm;
};
Le.isLazy = function (e) {
  return xr(e) === um;
};
Le.isMemo = function (e) {
  return xr(e) === lm;
};
Le.isPortal = function (e) {
  return xr(e) === Ab;
};
Le.isProfiler = function (e) {
  return xr(e) === nm;
};
Le.isStrictMode = function (e) {
  return xr(e) === rm;
};
Le.isSuspense = function (e) {
  return xr(e) === cm;
};
Le.isValidElementType = function (e) {
  return (
    typeof e == "string" ||
    typeof e == "function" ||
    e === tm ||
    e === sm ||
    e === nm ||
    e === rm ||
    e === cm ||
    e === TZ ||
    (typeof e == "object" &&
      e !== null &&
      (e.$$typeof === um ||
        e.$$typeof === lm ||
        e.$$typeof === om ||
        e.$$typeof === am ||
        e.$$typeof === im ||
        e.$$typeof === RZ ||
        e.$$typeof === AZ ||
        e.$$typeof === _Z ||
        e.$$typeof === PZ))
  );
};
Le.typeOf = xr;
qI.exports = Le;
var IZ = qI.exports,
  Ib = IZ,
  EZ = {
    childContextTypes: !0,
    contextType: !0,
    contextTypes: !0,
    defaultProps: !0,
    displayName: !0,
    getDefaultProps: !0,
    getDerivedStateFromError: !0,
    getDerivedStateFromProps: !0,
    mixins: !0,
    propTypes: !0,
    type: !0,
  },
  MZ = {
    name: !0,
    length: !0,
    prototype: !0,
    caller: !0,
    callee: !0,
    arguments: !0,
    arity: !0,
  },
  FZ = {
    $$typeof: !0,
    render: !0,
    defaultProps: !0,
    displayName: !0,
    propTypes: !0,
  },
  YI = {
    $$typeof: !0,
    compare: !0,
    defaultProps: !0,
    displayName: !0,
    propTypes: !0,
    type: !0,
  },
  Eb = {};
Eb[Ib.ForwardRef] = FZ;
Eb[Ib.Memo] = YI;
function s1(e) {
  return Ib.isMemo(e) ? YI : Eb[e.$$typeof] || EZ;
}
var jZ = Object.defineProperty,
  DZ = Object.getOwnPropertyNames,
  i1 = Object.getOwnPropertySymbols,
  NZ = Object.getOwnPropertyDescriptor,
  OZ = Object.getPrototypeOf,
  c1 = Object.prototype;
function ZI(e, t, r) {
  if (typeof t != "string") {
    if (c1) {
      var n = OZ(t);
      n && n !== c1 && ZI(e, n, r);
    }
    var o = DZ(t);
    i1 && (o = o.concat(i1(t)));
    for (var a = s1(e), s = s1(t), i = 0; i < o.length; ++i) {
      var c = o[i];
      if (!MZ[c] && !(r && r[c]) && !(s && s[c]) && !(a && a[c])) {
        var l = NZ(t, c);
        try {
          jZ(e, c, l);
        } catch {}
      }
    }
  }
  return e;
}
var BZ = ZI;
const LZ = jP(BZ);
var VZ = function (e, t) {
    return LZ(e, t);
  },
  zZ = !0;
function QI(e, t, r) {
  var n = "";
  return (
    r.split(" ").forEach(function (o) {
      e[o] !== void 0 ? t.push(e[o] + ";") : o && (n += o + " ");
    }),
    n
  );
}
var Mb = function (t, r, n) {
    var o = t.key + "-" + r.name;
    (n === !1 || zZ === !1) &&
      t.registered[o] === void 0 &&
      (t.registered[o] = r.styles);
  },
  Fb = function (t, r, n) {
    Mb(t, r, n);
    var o = t.key + "-" + r.name;
    if (t.inserted[r.name] === void 0) {
      var a = r;
      do t.insert(r === a ? "." + o : "", a, t.sheet, !0), (a = a.next);
      while (a !== void 0);
    }
  };
function HZ(e) {
  for (var t = 0, r, n = 0, o = e.length; o >= 4; ++n, o -= 4)
    (r =
      (e.charCodeAt(n) & 255) |
      ((e.charCodeAt(++n) & 255) << 8) |
      ((e.charCodeAt(++n) & 255) << 16) |
      ((e.charCodeAt(++n) & 255) << 24)),
      (r = (r & 65535) * 1540483477 + (((r >>> 16) * 59797) << 16)),
      (r ^= r >>> 24),
      (t =
        ((r & 65535) * 1540483477 + (((r >>> 16) * 59797) << 16)) ^
        ((t & 65535) * 1540483477 + (((t >>> 16) * 59797) << 16)));
  switch (o) {
    case 3:
      t ^= (e.charCodeAt(n + 2) & 255) << 16;
    case 2:
      t ^= (e.charCodeAt(n + 1) & 255) << 8;
    case 1:
      (t ^= e.charCodeAt(n) & 255),
        (t = (t & 65535) * 1540483477 + (((t >>> 16) * 59797) << 16));
  }
  return (
    (t ^= t >>> 13),
    (t = (t & 65535) * 1540483477 + (((t >>> 16) * 59797) << 16)),
    ((t ^ (t >>> 15)) >>> 0).toString(36)
  );
}
var WZ = {
    animationIterationCount: 1,
    aspectRatio: 1,
    borderImageOutset: 1,
    borderImageSlice: 1,
    borderImageWidth: 1,
    boxFlex: 1,
    boxFlexGroup: 1,
    boxOrdinalGroup: 1,
    columnCount: 1,
    columns: 1,
    flex: 1,
    flexGrow: 1,
    flexPositive: 1,
    flexShrink: 1,
    flexNegative: 1,
    flexOrder: 1,
    gridRow: 1,
    gridRowEnd: 1,
    gridRowSpan: 1,
    gridRowStart: 1,
    gridColumn: 1,
    gridColumnEnd: 1,
    gridColumnSpan: 1,
    gridColumnStart: 1,
    msGridRow: 1,
    msGridRowSpan: 1,
    msGridColumn: 1,
    msGridColumnSpan: 1,
    fontWeight: 1,
    lineHeight: 1,
    opacity: 1,
    order: 1,
    orphans: 1,
    scale: 1,
    tabSize: 1,
    widows: 1,
    zIndex: 1,
    zoom: 1,
    WebkitLineClamp: 1,
    fillOpacity: 1,
    floodOpacity: 1,
    stopOpacity: 1,
    strokeDasharray: 1,
    strokeDashoffset: 1,
    strokeMiterlimit: 1,
    strokeOpacity: 1,
    strokeWidth: 1,
  },
  GZ = !1,
  UZ = /[A-Z]|^ms/g,
  KZ = /_EMO_([^_]+?)_([^]*?)_EMO_/g,
  JI = function (t) {
    return t.charCodeAt(1) === 45;
  },
  l1 = function (t) {
    return t != null && typeof t != "boolean";
  },
  Op = Pb(function (e) {
    return JI(e) ? e : e.replace(UZ, "-$&").toLowerCase();
  }),
  u1 = function (t, r) {
    switch (t) {
      case "animation":
      case "animationName":
        if (typeof r == "string")
          return r.replace(KZ, function (n, o, a) {
            return (mn = { name: o, styles: a, next: mn }), o;
          });
    }
    return WZ[t] !== 1 && !JI(t) && typeof r == "number" && r !== 0
      ? r + "px"
      : r;
  },
  qZ =
    "Component selectors can only be used in conjunction with @emotion/babel-plugin, the swc Emotion plugin, or another Emotion-aware compiler transform.";
function sl(e, t, r) {
  if (r == null) return "";
  var n = r;
  if (n.__emotion_styles !== void 0) return n;
  switch (typeof r) {
    case "boolean":
      return "";
    case "object": {
      var o = r;
      if (o.anim === 1)
        return (mn = { name: o.name, styles: o.styles, next: mn }), o.name;
      var a = r;
      if (a.styles !== void 0) {
        var s = a.next;
        if (s !== void 0)
          for (; s !== void 0; )
            (mn = { name: s.name, styles: s.styles, next: mn }), (s = s.next);
        var i = a.styles + ";";
        return i;
      }
      return XZ(e, t, r);
    }
    case "function": {
      if (e !== void 0) {
        var c = mn,
          l = r(e);
        return (mn = c), sl(e, t, l);
      }
      break;
    }
  }
  var u = r;
  if (t == null) return u;
  var d = t[u];
  return d !== void 0 ? d : u;
}
function XZ(e, t, r) {
  var n = "";
  if (Array.isArray(r))
    for (var o = 0; o < r.length; o++) n += sl(e, t, r[o]) + ";";
  else
    for (var a in r) {
      var s = r[a];
      if (typeof s != "object") {
        var i = s;
        t != null && t[i] !== void 0
          ? (n += a + "{" + t[i] + "}")
          : l1(i) && (n += Op(a) + ":" + u1(a, i) + ";");
      } else {
        if (a === "NO_COMPONENT_SELECTOR" && GZ) throw new Error(qZ);
        if (
          Array.isArray(s) &&
          typeof s[0] == "string" &&
          (t == null || t[s[0]] === void 0)
        )
          for (var c = 0; c < s.length; c++)
            l1(s[c]) && (n += Op(a) + ":" + u1(a, s[c]) + ";");
        else {
          var l = sl(e, t, s);
          switch (a) {
            case "animation":
            case "animationName": {
              n += Op(a) + ":" + l + ";";
              break;
            }
            default:
              n += a + "{" + l + "}";
          }
        }
      }
    }
  return n;
}
var d1 = /label:\s*([^\s;{]+)\s*(;|$)/g,
  mn;
function dm(e, t, r) {
  if (
    e.length === 1 &&
    typeof e[0] == "object" &&
    e[0] !== null &&
    e[0].styles !== void 0
  )
    return e[0];
  var n = !0,
    o = "";
  mn = void 0;
  var a = e[0];
  if (a == null || a.raw === void 0) (n = !1), (o += sl(r, t, a));
  else {
    var s = a;
    o += s[0];
  }
  for (var i = 1; i < e.length; i++)
    if (((o += sl(r, t, e[i])), n)) {
      var c = a;
      o += c[i];
    }
  d1.lastIndex = 0;
  for (var l = "", u; (u = d1.exec(o)) !== null; ) l += "-" + u[1];
  var d = HZ(o) + l;
  return { name: d, styles: o, next: mn };
}
var YZ = function (t) {
    return t();
  },
  eE = y$.useInsertionEffect ? y$.useInsertionEffect : !1,
  jb = eE || YZ,
  f1 = eE || g.useLayoutEffect,
  vy = !1,
  Db = g.createContext(typeof HTMLElement < "u" ? kZ({ key: "css" }) : null),
  ZZ = Db.Provider,
  QZ = function () {
    return g.useContext(Db);
  },
  Nl = function (t) {
    return g.forwardRef(function (r, n) {
      var o = g.useContext(Db);
      return t(r, o, n);
    });
  },
  Yn = g.createContext({}),
  JZ = function () {
    return g.useContext(Yn);
  },
  eQ = function (t, r) {
    if (typeof r == "function") {
      var n = r(t);
      return n;
    }
    return yr({}, t, r);
  },
  tQ = o1(function (e) {
    return o1(function (t) {
      return eQ(e, t);
    });
  }),
  rQ = function (t) {
    var r = g.useContext(Yn);
    return (
      t.theme !== r && (r = tQ(r)(t.theme)),
      g.createElement(Yn.Provider, { value: r }, t.children)
    );
  };
function nQ(e) {
  var t = e.displayName || e.name || "Component",
    r = g.forwardRef(function (o, a) {
      var s = g.useContext(Yn);
      return g.createElement(e, yr({ theme: s, ref: a }, o));
    });
  return (r.displayName = "WithTheme(" + t + ")"), VZ(r, e);
}
var Nb = {}.hasOwnProperty,
  yy = "__EMOTION_TYPE_PLEASE_DO_NOT_USE__",
  oQ = function (t, r) {
    var n = {};
    for (var o in r) Nb.call(r, o) && (n[o] = r[o]);
    return (n[yy] = t), n;
  },
  aQ = function (t) {
    var r = t.cache,
      n = t.serialized,
      o = t.isStringTag;
    return (
      Mb(r, n, o),
      jb(function () {
        return Fb(r, n, o);
      }),
      null
    );
  },
  sQ = Nl(function (e, t, r) {
    var n = e.css;
    typeof n == "string" && t.registered[n] !== void 0 && (n = t.registered[n]);
    var o = e[yy],
      a = [n],
      s = "";
    typeof e.className == "string"
      ? (s = QI(t.registered, a, e.className))
      : e.className != null && (s = e.className + " ");
    var i = dm(a, void 0, g.useContext(Yn));
    s += t.key + "-" + i.name;
    var c = {};
    for (var l in e)
      Nb.call(e, l) && l !== "css" && l !== yy && !vy && (c[l] = e[l]);
    return (
      (c.className = s),
      r && (c.ref = r),
      g.createElement(
        g.Fragment,
        null,
        g.createElement(aQ, {
          cache: t,
          serialized: i,
          isStringTag: typeof o == "string",
        }),
        g.createElement(o, c)
      )
    );
  }),
  iQ = sQ,
  hf = function (t, r) {
    var n = arguments;
    if (r == null || !Nb.call(r, "css"))
      return g.createElement.apply(void 0, n);
    var o = n.length,
      a = new Array(o);
    (a[0] = iQ), (a[1] = oQ(t, r));
    for (var s = 2; s < o; s++) a[s] = n[s];
    return g.createElement.apply(null, a);
  };
(function (e) {
  var t;
  t || (t = e.JSX || (e.JSX = {}));
})(hf || (hf = {}));
var cQ = Nl(function (e, t) {
  var r = e.styles,
    n = dm([r], void 0, g.useContext(Yn)),
    o = g.useRef();
  return (
    f1(
      function () {
        var a = t.key + "-global",
          s = new t.sheet.constructor({
            key: a,
            nonce: t.sheet.nonce,
            container: t.sheet.container,
            speedy: t.sheet.isSpeedy,
          }),
          i = !1,
          c = document.querySelector(
            'style[data-emotion="' + a + " " + n.name + '"]'
          );
        return (
          t.sheet.tags.length && (s.before = t.sheet.tags[0]),
          c !== null &&
            ((i = !0), c.setAttribute("data-emotion", a), s.hydrate([c])),
          (o.current = [s, i]),
          function () {
            s.flush();
          }
        );
      },
      [t]
    ),
    f1(
      function () {
        var a = o.current,
          s = a[0],
          i = a[1];
        if (i) {
          a[1] = !1;
          return;
        }
        if ((n.next !== void 0 && Fb(t, n.next, !0), s.tags.length)) {
          var c = s.tags[s.tags.length - 1].nextElementSibling;
          (s.before = c), s.flush();
        }
        t.insert("", n, s, !1);
      },
      [t, n.name]
    ),
    null
  );
});
function tE() {
  for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
    t[r] = arguments[r];
  return dm(t);
}
function lQ() {
  var e = tE.apply(void 0, arguments),
    t = "animation-" + e.name;
  return {
    name: t,
    styles: "@keyframes " + t + "{" + e.styles + "}",
    anim: 1,
    toString: function () {
      return "_EMO_" + this.name + "_" + this.styles + "_EMO_";
    },
  };
}
var uQ = function e(t) {
  for (var r = t.length, n = 0, o = ""; n < r; n++) {
    var a = t[n];
    if (a != null) {
      var s = void 0;
      switch (typeof a) {
        case "boolean":
          break;
        case "object": {
          if (Array.isArray(a)) s = e(a);
          else {
            s = "";
            for (var i in a) a[i] && i && (s && (s += " "), (s += i));
          }
          break;
        }
        default:
          s = a;
      }
      s && (o && (o += " "), (o += s));
    }
  }
  return o;
};
function dQ(e, t, r) {
  var n = [],
    o = QI(e, n, r);
  return n.length < 2 ? r : o + t(n);
}
var fQ = function (t) {
    var r = t.cache,
      n = t.serializedArr;
    return (
      jb(function () {
        for (var o = 0; o < n.length; o++) Fb(r, n[o], !1);
      }),
      null
    );
  },
  mQ = Nl(function (e, t) {
    var r = !1,
      n = [],
      o = function () {
        if (r && vy) throw new Error("css can only be used during render");
        for (var l = arguments.length, u = new Array(l), d = 0; d < l; d++)
          u[d] = arguments[d];
        var f = dm(u, t.registered);
        return n.push(f), Mb(t, f, !1), t.key + "-" + f.name;
      },
      a = function () {
        if (r && vy) throw new Error("cx can only be used during render");
        for (var l = arguments.length, u = new Array(l), d = 0; d < l; d++)
          u[d] = arguments[d];
        return dQ(t.registered, o, uQ(u));
      },
      s = { css: o, cx: a, theme: g.useContext(Yn) },
      i = e.children(s);
    return (
      (r = !0),
      g.createElement(
        g.Fragment,
        null,
        g.createElement(fQ, { cache: t, serializedArr: n }),
        i
      )
    );
  });
const hQ = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        CacheProvider: ZZ,
        ClassNames: mQ,
        Global: cQ,
        ThemeContext: Yn,
        ThemeProvider: rQ,
        __unsafe_useEmotionCache: QZ,
        get createElement() {
          return hf;
        },
        css: tE,
        get jsx() {
          return hf;
        },
        keyframes: lQ,
        useTheme: JZ,
        withEmotionCache: Nl,
        withTheme: nQ,
      },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  Vo = Fa(hQ);
var so = {},
  rE = g;
const Ob = rE.createContext({});
Ob.displayName = "ColorModeContext";
function nE() {
  const e = rE.useContext(Ob);
  if (e === void 0)
    throw new Error("useColorMode must be used within a ColorModeProvider");
  return e;
}
function pQ(e, t) {
  const { colorMode: r } = nE();
  return r === "dark" ? t : e;
}
so.ColorModeContext = Ob;
so.useColorMode = nE;
so.useColorModeValue = pQ;
var oE = {};
const Xu = { light: "chakra-ui-light", dark: "chakra-ui-dark" };
function vQ(e = {}) {
  const { preventTransition: t = !0, nonce: r } = e,
    n = {
      setDataset: (o) => {
        const a = t ? n.preventTransition() : void 0;
        (document.documentElement.dataset.theme = o),
          (document.documentElement.style.colorScheme = o),
          a == null || a();
      },
      setClassName(o) {
        document.body.classList.add(o ? Xu.dark : Xu.light),
          document.body.classList.remove(o ? Xu.light : Xu.dark);
      },
      query() {
        return window.matchMedia("(prefers-color-scheme: dark)");
      },
      getSystemTheme(o) {
        return n.query().matches ?? o === "dark" ? "dark" : "light";
      },
      addListener(o) {
        const a = n.query(),
          s = (i) => {
            o(i.matches ? "dark" : "light");
          };
        return (
          typeof a.addListener == "function"
            ? a.addListener(s)
            : a.addEventListener("change", s),
          () => {
            typeof a.removeListener == "function"
              ? a.removeListener(s)
              : a.removeEventListener("change", s);
          }
        );
      },
      preventTransition() {
        const o = document.createElement("style");
        return (
          o.appendChild(
            document.createTextNode(
              "*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}"
            )
          ),
          r !== void 0 && (o.nonce = r),
          document.head.appendChild(o),
          () => {
            window.getComputedStyle(document.body),
              requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                  document.head.removeChild(o);
                });
              });
          }
        );
      },
    };
  return n;
}
oE.getColorModeUtils = vQ;
var zo = {};
const fm = "chakra-ui-color-mode";
function aE(e) {
  return {
    ssr: !1,
    type: "localStorage",
    get(t) {
      if (!(globalThis != null && globalThis.document)) return t;
      let r;
      try {
        r = localStorage.getItem(e) || t;
      } catch {}
      return r || t;
    },
    set(t) {
      try {
        localStorage.setItem(e, t);
      } catch {}
    },
  };
}
const yQ = aE(fm);
function m1(e, t) {
  const r = e.match(new RegExp(`(^| )${t}=([^;]+)`));
  return r == null ? void 0 : r[2];
}
function Bb(e, t) {
  return {
    ssr: !!t,
    type: "cookie",
    get(r) {
      return t
        ? m1(t, e)
        : (globalThis != null &&
            globalThis.document &&
            m1(document.cookie, e)) ||
            r;
    },
    set(r) {
      document.cookie = `${e}=${r}; max-age=31536000; path=/`;
    },
  };
}
const gQ = Bb(fm),
  bQ = (e) => Bb(fm, e);
zo.STORAGE_KEY = fm;
zo.cookieStorageManager = gQ;
zo.cookieStorageManagerSSR = bQ;
zo.createCookieStorageManager = Bb;
zo.createLocalStorageManager = aE;
zo.localStorageManager = yQ;
var Lb = P,
  SQ = x,
  xQ = Vo,
  Ir = g,
  Vb = so,
  $Q = oE,
  wQ = zo;
const ti = () => {},
  CQ = SQ.isBrowser() ? Ir.useLayoutEffect : Ir.useEffect;
function h1(e, t) {
  return e.type === "cookie" && e.ssr ? e.get(t) : t;
}
const sE = function (t) {
  const {
      value: r,
      children: n,
      options: {
        useSystemColorMode: o,
        initialColorMode: a,
        disableTransitionOnChange: s,
      } = {},
      colorModeManager: i = wQ.localStorageManager,
    } = t,
    c = xQ.__unsafe_useEmotionCache(),
    l = a === "dark" ? "dark" : "light",
    [u, d] = Ir.useState(() => h1(i, l)),
    [f, m] = Ir.useState(() => h1(i)),
    {
      getSystemTheme: h,
      setClassName: p,
      setDataset: v,
      addListener: b,
    } = Ir.useMemo(
      () =>
        $Q.getColorModeUtils({
          preventTransition: s,
          nonce: c == null ? void 0 : c.nonce,
        }),
      [s, c == null ? void 0 : c.nonce]
    ),
    y = a === "system" && !u ? f : u,
    S = Ir.useCallback(
      (T) => {
        const k = T === "system" ? h() : T;
        d(k), p(k === "dark"), v(k), i.set(k);
      },
      [i, h, p, v]
    );
  CQ(() => {
    a === "system" && m(h());
  }, []),
    Ir.useEffect(() => {
      const T = i.get();
      if (T) {
        S(T);
        return;
      }
      if (a === "system") {
        S("system");
        return;
      }
      S(l);
    }, [i, l, a, S]);
  const w = Ir.useCallback(() => {
    S(y === "dark" ? "light" : "dark");
  }, [y, S]);
  Ir.useEffect(() => {
    if (o) return b(S);
  }, [o, b, S]);
  const C = Ir.useMemo(
    () => ({
      colorMode: r ?? y,
      toggleColorMode: r ? ti : w,
      setColorMode: r ? ti : S,
      forced: r !== void 0,
    }),
    [y, w, S, r]
  );
  return Lb.jsx(Vb.ColorModeContext.Provider, { value: C, children: n });
};
sE.displayName = "ColorModeProvider";
function iE(e) {
  const t = Ir.useMemo(
    () => ({
      colorMode: "dark",
      toggleColorMode: ti,
      setColorMode: ti,
      forced: !0,
    }),
    []
  );
  return Lb.jsx(Vb.ColorModeContext.Provider, { value: t, ...e });
}
iE.displayName = "DarkMode";
function cE(e) {
  const t = Ir.useMemo(
    () => ({
      colorMode: "light",
      toggleColorMode: ti,
      setColorMode: ti,
      forced: !0,
    }),
    []
  );
  return Lb.jsx(Vb.ColorModeContext.Provider, { value: t, ...e });
}
cE.displayName = "LightMode";
jl.ColorModeProvider = sE;
jl.DarkMode = iE;
jl.LightMode = cE;
var mm = {},
  lE = P,
  uE = Vo;
const dE = String.raw,
  fE = dE`
  :root,
  :host {
    --chakra-vh: 100vh;
  }

  @supports (height: -webkit-fill-available) {
    :root,
    :host {
      --chakra-vh: -webkit-fill-available;
    }
  }

  @supports (height: -moz-fill-available) {
    :root,
    :host {
      --chakra-vh: -moz-fill-available;
    }
  }

  @supports (height: 100dvh) {
    :root,
    :host {
      --chakra-vh: 100dvh;
    }
  }
`,
  kQ = () => lE.jsx(uE.Global, { styles: fE }),
  TQ = ({ scope: e = "" }) =>
    lE.jsx(uE.Global, {
      styles: dE`
      html {
        line-height: 1.5;
        -webkit-text-size-adjust: 100%;
        font-family: system-ui, sans-serif;
        -webkit-font-smoothing: antialiased;
        text-rendering: optimizeLegibility;
        -moz-osx-font-smoothing: grayscale;
        touch-action: manipulation;
      }

      body {
        position: relative;
        min-height: 100%;
        margin: 0;
        font-feature-settings: "kern";
      }

      ${e} :where(*, *::before, *::after) {
        border-width: 0;
        border-style: solid;
        box-sizing: border-box;
        word-wrap: break-word;
      }

      main {
        display: block;
      }

      ${e} hr {
        border-top-width: 1px;
        box-sizing: content-box;
        height: 0;
        overflow: visible;
      }

      ${e} :where(pre, code, kbd,samp) {
        font-family: SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        font-size: 1em;
      }

      ${e} a {background-color: transparent;color: inherit;
        text-decoration: inherit;
      }

      ${e} abbr[title] {
        border-bottom: none;
        text-decoration: underline;
        -webkit-text-decoration: underline dotted;
        text-decoration: underline dotted;
      }

      ${e} :where(b, strong) {
        font-weight: bold;
      }

      ${e} small {
        font-size: 80%;
      }

      ${e} :where(sub,sup) {
        font-size: 75%;
        line-height: 0;
        position: relative;
        vertical-align: baseline;
      }

      ${e} sub {
        bottom: -0.25em;
      }

      ${e} sup {
        top: -0.5em;
      }

      ${e} img {
        border-style: none;
      }

      ${e} :where(button, input, optgroup, select, textarea) {
        font-family: inherit;
        font-size: 100%;
        line-height: 1.15;
        margin: 0;
      }

      ${e} :where(button, input) {
        overflow: visible;
      }

      ${e} :where(button, select) {
        text-transform: none;
      }

      ${e} :where(
          button::-moz-focus-inner,
          [type="button"]::-moz-focus-inner,
          [type="reset"]::-moz-focus-inner,
          [type="submit"]::-moz-focus-inner
        ) {
        border-style: none;
        padding: 0;
      }

      ${e} fieldset {
        padding: 0.35em 0.75em 0.625em;
      }

      ${e} legend {
        box-sizing: border-box;color: inherit;
        display: table;
        max-width: 100%;
        padding: 0;
        white-space: normal;
      }

      ${e} progress {
        vertical-align: baseline;
      }

      ${e} textarea {
        overflow: auto;
      }

      ${e} :where([type="checkbox"], [type="radio"]) {
        box-sizing: border-box;
        padding: 0;
      }

      ${e} input[type="number"]::-webkit-inner-spin-button,
      ${e} input[type="number"]::-webkit-outer-spin-button {
        -webkit-appearance: none !important;
      }

      ${e} input[type="number"] {
        -moz-appearance: textfield;
      }

      ${e} input[type="search"] {
        -webkit-appearance: textfield;
        outline-offset: -2px;
      }

      ${e} input[type="search"]::-webkit-search-decoration {
        -webkit-appearance: none !important;
      }

      ${e} ::-webkit-file-upload-button {
        -webkit-appearance: button;
        font: inherit;
      }

      ${e} details {
        display: block;
      }

      ${e} summary {
        display: list-item;
      }

      template {
        display: none;
      }

      [hidden] {
        display: none !important;
      }

      ${e} :where(
          blockquote,
          dl,
          dd,
          h1,
          h2,
          h3,
          h4,
          h5,
          h6,
          hr,
          figure,
          p,
          pre
        ) {
        margin: 0;
      }

      ${e} button {background: transparent;
        padding: 0;
      }

      ${e} fieldset {
        margin: 0;
        padding: 0;
      }

      ${e} :where(ol, ul) {
        margin: 0;
        padding: 0;
      }

      ${e} textarea {
        resize: vertical;
      }

      ${e} :where(button, [role="button"]) {
        cursor: pointer;
      }

      ${e} button::-moz-focus-inner {border: 0 !important;
      }

      ${e} table {
        border-collapse: collapse;
      }

      ${e} :where(h1, h2, h3, h4, h5, h6) {
        font-size: inherit;
        font-weight: inherit;
      }

      ${e} :where(button, input, optgroup, select, textarea) {
        padding: 0;
        line-height: inherit;color: inherit;
      }

      ${e} :where(img, svg, video, canvas, audio, iframe, embed, object) {
        display: block;
      }

      ${e} :where(img, video) {
        max-width: 100%;
        height: auto;
      }

      [data-js-focus-visible]
        :focus:not([data-focus-visible-added]):not(
          [data-focus-visible-disabled]
        ) {outline: none;box-shadow: none;
      }

      ${e} select::-ms-expand {
        display: none;
      }

      ${fE}
    `,
    });
mm.CSSPolyfill = kQ;
mm.CSSReset = TQ;
var en = {},
  pf = P,
  mE = I,
  vf = x,
  zb = Vo,
  PQ = g,
  RQ = so;
function AQ(e) {
  const { cssVarsRoot: t, theme: r, children: n } = e,
    o = PQ.useMemo(() => mE.toCSSVar(r), [r]);
  return pf.jsxs(zb.ThemeProvider, {
    theme: o,
    children: [pf.jsx(hE, { root: t }), n],
  });
}
function hE({ root: e = ":host, :root" }) {
  const t = [e, "[data-theme]"].join(",");
  return pf.jsx(zb.Global, { styles: (r) => ({ [t]: r.__cssVars }) });
}
const [_Q, IQ] = vf.createContext({
  name: "StylesContext",
  errorMessage:
    "useStyles: `styles` is undefined. Seems you forgot to wrap the components in `<StylesProvider />` ",
});
function EQ(e) {
  return vf.createContext({
    name: `${e}StylesContext`,
    errorMessage: `useStyles: "styles" is undefined. Seems you forgot to wrap the components in "<${e} />" `,
  });
}
function MQ() {
  const { colorMode: e } = RQ.useColorMode();
  return pf.jsx(zb.Global, {
    styles: (t) => {
      const r = vf.memoizedGet(t, "styles.global"),
        n = vf.runIfFn(r, { theme: t, colorMode: e });
      return n ? mE.css(n)(t) : void 0;
    },
  });
}
en.CSSVars = hE;
en.GlobalStyle = MQ;
en.StylesProvider = _Q;
en.ThemeProvider = AQ;
en.createStylesContext = EQ;
en.useStyles = IQ;
var Ol = {},
  FQ = P,
  jQ = x;
const [DQ, NQ] = jQ.createContext({ strict: !1, name: "PortalManagerContext" });
function pE(e) {
  const { children: t, zIndex: r } = e;
  return FQ.jsx(DQ, { value: { zIndex: r }, children: t });
}
pE.displayName = "PortalManager";
Ol.PortalManager = pE;
Ol.usePortalManager = NQ;
var Bl = {},
  p1 = P,
  OQ = le,
  il = g;
const Hb = il.createContext({
  getDocument() {
    return document;
  },
  getWindow() {
    return window;
  },
});
Hb.displayName = "EnvironmentContext";
function BQ({ defer: e } = {}) {
  const [, t] = il.useReducer((r) => r + 1, 0);
  return (
    OQ.useSafeLayoutEffect(() => {
      e && t();
    }, [e]),
    il.useContext(Hb)
  );
}
function vE(e) {
  const { children: t, environment: r, disabled: n } = e,
    o = il.useRef(null),
    a = il.useMemo(
      () =>
        r || {
          getDocument: () => {
            var i;
            return (
              ((i = o.current) == null ? void 0 : i.ownerDocument) ?? document
            );
          },
          getWindow: () => {
            var i;
            return (
              ((i = o.current) == null
                ? void 0
                : i.ownerDocument.defaultView) ?? window
            );
          },
        },
      [r]
    ),
    s = !n || !r;
  return p1.jsxs(Hb.Provider, {
    value: a,
    children: [
      t,
      s && p1.jsx("span", { id: "__chakra_env", hidden: !0, ref: o }),
    ],
  });
}
vE.displayName = "EnvironmentProvider";
Bl.EnvironmentProvider = vE;
Bl.useEnvironment = BQ;
var oa = P,
  LQ = jl,
  v1 = mm,
  y1 = en,
  VQ = Ol,
  zQ = Bl;
const HQ = (e) => {
  const {
      children: t,
      colorModeManager: r,
      portalZIndex: n,
      resetScope: o,
      resetCSS: a = !0,
      theme: s = {},
      environment: i,
      cssVarsRoot: c,
      disableEnvironment: l,
      disableGlobalStyle: u,
    } = e,
    d = oa.jsx(zQ.EnvironmentProvider, {
      environment: i,
      disabled: l,
      children: t,
    });
  return oa.jsx(y1.ThemeProvider, {
    theme: s,
    cssVarsRoot: c,
    children: oa.jsxs(LQ.ColorModeProvider, {
      colorModeManager: r,
      options: s.config,
      children: [
        a ? oa.jsx(v1.CSSReset, { scope: o }) : oa.jsx(v1.CSSPolyfill, {}),
        !u && oa.jsx(y1.GlobalStyle, {}),
        n ? oa.jsx(VQ.PortalManager, { zIndex: n, children: d }) : d,
      ],
    }),
  });
};
LI.Provider = HQ;
var Ua = {};
const kn = g.createContext({
    transformPagePoint: (e) => e,
    isStatic: !1,
    reducedMotion: "never",
  }),
  _i = g.createContext({}),
  Ii = g.createContext(null),
  hm = typeof window < "u",
  Ho = hm ? g.useLayoutEffect : g.useEffect,
  Wb = g.createContext({ strict: !1 }),
  pm = (e) => e.replace(/([a-z])([A-Z])/gu, "$1-$2").toLowerCase(),
  yE = "framerAppearId",
  Gb = "data-" + pm(yE),
  vm = { skipAnimations: !1, useManualTiming: !1 };
function WQ(e) {
  let t = new Set(),
    r = new Set(),
    n = !1,
    o = !1;
  const a = new WeakSet();
  let s = { delta: 0, timestamp: 0, isProcessing: !1 };
  function i(l) {
    a.has(l) && (c.schedule(l), e()), l(s);
  }
  const c = {
    schedule: (l, u = !1, d = !1) => {
      const m = d && n ? t : r;
      return u && a.add(l), m.has(l) || m.add(l), l;
    },
    cancel: (l) => {
      r.delete(l), a.delete(l);
    },
    process: (l) => {
      if (((s = l), n)) {
        o = !0;
        return;
      }
      (n = !0),
        ([t, r] = [r, t]),
        r.clear(),
        t.forEach(i),
        (n = !1),
        o && ((o = !1), c.process(l));
    },
  };
  return c;
}
const Rc = [
    "read",
    "resolveKeyframes",
    "update",
    "preRender",
    "render",
    "postRender",
  ],
  GQ = 40;
function gE(e, t) {
  let r = !1,
    n = !0;
  const o = { delta: 0, timestamp: 0, isProcessing: !1 },
    a = () => (r = !0),
    s = Rc.reduce((b, y) => ((b[y] = WQ(a)), b), {}),
    {
      read: i,
      resolveKeyframes: c,
      update: l,
      preRender: u,
      render: d,
      postRender: f,
    } = s,
    m = () => {
      const b = vm.useManualTiming ? o.timestamp : performance.now();
      (r = !1),
        (o.delta = n ? 1e3 / 60 : Math.max(Math.min(b - o.timestamp, GQ), 1)),
        (o.timestamp = b),
        (o.isProcessing = !0),
        i.process(o),
        c.process(o),
        l.process(o),
        u.process(o),
        d.process(o),
        f.process(o),
        (o.isProcessing = !1),
        r && t && ((n = !1), e(m));
    },
    h = () => {
      (r = !0), (n = !0), o.isProcessing || e(m);
    };
  return {
    schedule: Rc.reduce((b, y) => {
      const S = s[y];
      return (b[y] = (w, C = !1, T = !1) => (r || h(), S.schedule(w, C, T))), b;
    }, {}),
    cancel: (b) => {
      for (let y = 0; y < Rc.length; y++) s[Rc[y]].cancel(b);
    },
    state: o,
    steps: s,
  };
}
const { schedule: Ub, cancel: eRe } = gE(queueMicrotask, !1);
function Ms(e) {
  return (
    e &&
    typeof e == "object" &&
    Object.prototype.hasOwnProperty.call(e, "current")
  );
}
const Kb = g.createContext({});
let g1 = !1;
function UQ(e, t, r, n, o) {
  const { visualElement: a } = g.useContext(_i),
    s = g.useContext(Wb),
    i = g.useContext(Ii),
    c = g.useContext(kn).reducedMotion,
    l = g.useRef();
  (n = n || s.renderer),
    !l.current &&
      n &&
      (l.current = n(e, {
        visualState: t,
        parent: a,
        props: r,
        presenceContext: i,
        blockInitialAnimation: i ? i.initial === !1 : !1,
        reducedMotionConfig: c,
      }));
  const u = l.current,
    d = g.useContext(Kb);
  u &&
    !u.projection &&
    o &&
    (u.type === "html" || u.type === "svg") &&
    qQ(l.current, r, o, d),
    g.useInsertionEffect(() => {
      u && u.update(r, i);
    });
  const f = g.useRef(!!(r[Gb] && !window.HandoffComplete));
  return (
    Ho(() => {
      u &&
        (u.updateFeatures(),
        Ub.render(u.render),
        f.current && u.animationState && u.animationState.animateChanges());
    }),
    g.useEffect(() => {
      u &&
        (!f.current && u.animationState && u.animationState.animateChanges(),
        f.current && ((f.current = !1), g1 || ((g1 = !0), queueMicrotask(KQ))));
    }),
    u
  );
}
function KQ() {
  window.HandoffComplete = !0;
}
function qQ(e, t, r, n) {
  const {
    layoutId: o,
    layout: a,
    drag: s,
    dragConstraints: i,
    layoutScroll: c,
    layoutRoot: l,
  } = t;
  (e.projection = new r(
    e.latestValues,
    t["data-framer-portal-id"] ? void 0 : bE(e.parent)
  )),
    e.projection.setOptions({
      layoutId: o,
      layout: a,
      alwaysMeasureLayout: !!s || (i && Ms(i)),
      visualElement: e,
      animationType: typeof a == "string" ? a : "both",
      initialPromotionConfig: n,
      layoutScroll: c,
      layoutRoot: l,
    });
}
function bE(e) {
  if (e) return e.options.allowProjection !== !1 ? e.projection : bE(e.parent);
}
function XQ(e, t, r) {
  return g.useCallback(
    (n) => {
      n && e.mount && e.mount(n),
        t && (n ? t.mount(n) : t.unmount()),
        r && (typeof r == "function" ? r(n) : Ms(r) && (r.current = n));
    },
    [t]
  );
}
function cl(e) {
  return typeof e == "string" || Array.isArray(e);
}
function ll(e) {
  return e !== null && typeof e == "object" && typeof e.start == "function";
}
const qb = [
    "animate",
    "whileInView",
    "whileFocus",
    "whileHover",
    "whileTap",
    "whileDrag",
    "exit",
  ],
  Xb = ["initial", ...qb];
function ym(e) {
  return ll(e.animate) || Xb.some((t) => cl(e[t]));
}
function SE(e) {
  return !!(ym(e) || e.variants);
}
function YQ(e, t) {
  if (ym(e)) {
    const { initial: r, animate: n } = e;
    return {
      initial: r === !1 || cl(r) ? r : void 0,
      animate: cl(n) ? n : void 0,
    };
  }
  return e.inherit !== !1 ? t : {};
}
function ZQ(e) {
  const { initial: t, animate: r } = YQ(e, g.useContext(_i));
  return g.useMemo(() => ({ initial: t, animate: r }), [b1(t), b1(r)]);
}
function b1(e) {
  return Array.isArray(e) ? e.join(" ") : e;
}
const S1 = {
    animation: [
      "animate",
      "variants",
      "whileHover",
      "whileTap",
      "exit",
      "whileInView",
      "whileFocus",
      "whileDrag",
    ],
    exit: ["exit"],
    drag: ["drag", "dragControls"],
    focus: ["whileFocus"],
    hover: ["whileHover", "onHoverStart", "onHoverEnd"],
    tap: ["whileTap", "onTap", "onTapStart", "onTapCancel"],
    pan: ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"],
    inView: ["whileInView", "onViewportEnter", "onViewportLeave"],
    layout: ["layout", "layoutId"],
  },
  ri = {};
for (const e in S1) ri[e] = { isEnabled: (t) => S1[e].some((r) => !!t[r]) };
function gy(e) {
  for (const t in e) ri[t] = { ...ri[t], ...e[t] };
}
const ni = g.createContext({}),
  Yb = Symbol.for("motionComponentSymbol"),
  St = (e) => e;
let xE = St,
  ul = St;
function Zb({
  preloadedFeatures: e,
  createVisualElement: t,
  useRender: r,
  useVisualState: n,
  Component: o,
}) {
  e && gy(e);
  function a(i, c) {
    let l;
    const u = { ...g.useContext(kn), ...i, layoutId: QQ(i) },
      { isStatic: d } = u,
      f = ZQ(i),
      m = n(i, d);
    if (!d && hm) {
      JQ();
      const h = eJ(u);
      (l = h.MeasureLayout),
        (f.visualElement = UQ(o, m, u, t, h.ProjectionNode));
    }
    return P.jsxs(_i.Provider, {
      value: f,
      children: [
        l && f.visualElement
          ? P.jsx(l, { visualElement: f.visualElement, ...u })
          : null,
        r(o, i, XQ(m, f.visualElement, c), m, d, f.visualElement),
      ],
    });
  }
  const s = g.forwardRef(a);
  return (s[Yb] = o), s;
}
function QQ({ layoutId: e }) {
  const t = g.useContext(ni).id;
  return t && e !== void 0 ? t + "-" + e : e;
}
function JQ(e, t) {
  g.useContext(Wb).strict;
}
function eJ(e) {
  const { drag: t, layout: r } = ri;
  if (!t && !r) return {};
  const n = { ...t, ...r };
  return {
    MeasureLayout:
      (t != null && t.isEnabled(e)) || (r != null && r.isEnabled(e))
        ? n.MeasureLayout
        : void 0,
    ProjectionNode: n.ProjectionNode,
  };
}
function $E(e) {
  function t(n, o = {}) {
    return Zb(e(n, o));
  }
  if (typeof Proxy > "u") return t;
  const r = new Map();
  return new Proxy(t, {
    get: (n, o) => (r.has(o) || r.set(o, t(o)), r.get(o)),
  });
}
const tJ = [
  "animate",
  "circle",
  "defs",
  "desc",
  "ellipse",
  "g",
  "image",
  "line",
  "filter",
  "marker",
  "mask",
  "metadata",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "rect",
  "stop",
  "switch",
  "symbol",
  "svg",
  "text",
  "tspan",
  "use",
  "view",
];
function Qb(e) {
  return typeof e != "string" || e.includes("-")
    ? !1
    : !!(tJ.indexOf(e) > -1 || /[A-Z]/u.test(e));
}
const yf = {};
function wE(e) {
  Object.assign(yf, e);
}
const Ll = [
    "transformPerspective",
    "x",
    "y",
    "z",
    "translateX",
    "translateY",
    "translateZ",
    "scale",
    "scaleX",
    "scaleY",
    "rotate",
    "rotateX",
    "rotateY",
    "rotateZ",
    "skew",
    "skewX",
    "skewY",
  ],
  io = new Set(Ll);
function CE(e, { layout: t, layoutId: r }) {
  return (
    io.has(e) ||
    e.startsWith("origin") ||
    ((t || r !== void 0) && (!!yf[e] || e === "opacity"))
  );
}
const Xe = (e) => !!(e && e.getVelocity),
  kE = (e, t) => (t && typeof e == "number" ? t.transform(e) : e),
  Zn = (e, t, r) => (r > t ? t : r < e ? e : r),
  Ei = {
    test: (e) => typeof e == "number",
    parse: parseFloat,
    transform: (e) => e,
  },
  Lc = { ...Ei, transform: (e) => Zn(0, 1, e) },
  Yu = { ...Ei, default: 1 },
  Vc = (e) => Math.round(e * 1e5) / 1e5,
  Jb = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu,
  rJ =
    /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu,
  nJ =
    /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu;
function Vl(e) {
  return typeof e == "string";
}
function oJ(e) {
  return e == null;
}
const zl = (e) => ({
    test: (t) => Vl(t) && t.endsWith(e) && t.split(" ").length === 1,
    parse: parseFloat,
    transform: (t) => `${t}${e}`,
  }),
  ko = zl("deg"),
  bn = zl("%"),
  me = zl("px"),
  aJ = zl("vh"),
  sJ = zl("vw"),
  x1 = {
    ...bn,
    parse: (e) => bn.parse(e) / 100,
    transform: (e) => bn.transform(e * 100),
  },
  $1 = { ...Ei, transform: Math.round },
  e0 = {
    borderWidth: me,
    borderTopWidth: me,
    borderRightWidth: me,
    borderBottomWidth: me,
    borderLeftWidth: me,
    borderRadius: me,
    radius: me,
    borderTopLeftRadius: me,
    borderTopRightRadius: me,
    borderBottomRightRadius: me,
    borderBottomLeftRadius: me,
    width: me,
    maxWidth: me,
    height: me,
    maxHeight: me,
    size: me,
    top: me,
    right: me,
    bottom: me,
    left: me,
    padding: me,
    paddingTop: me,
    paddingRight: me,
    paddingBottom: me,
    paddingLeft: me,
    margin: me,
    marginTop: me,
    marginRight: me,
    marginBottom: me,
    marginLeft: me,
    rotate: ko,
    rotateX: ko,
    rotateY: ko,
    rotateZ: ko,
    scale: Yu,
    scaleX: Yu,
    scaleY: Yu,
    scaleZ: Yu,
    skew: ko,
    skewX: ko,
    skewY: ko,
    distance: me,
    translateX: me,
    translateY: me,
    translateZ: me,
    x: me,
    y: me,
    z: me,
    perspective: me,
    transformPerspective: me,
    opacity: Lc,
    originX: x1,
    originY: x1,
    originZ: me,
    zIndex: $1,
    backgroundPositionX: me,
    backgroundPositionY: me,
    fillOpacity: Lc,
    strokeOpacity: Lc,
    numOctaves: $1,
  },
  iJ = {
    x: "translateX",
    y: "translateY",
    z: "translateZ",
    transformPerspective: "perspective",
  },
  cJ = Ll.length;
function TE(e, t, r) {
  let n = "",
    o = !0;
  for (let a = 0; a < cJ; a++) {
    const s = Ll[a],
      i = e[s];
    if (i === void 0) continue;
    let c = !0;
    if (
      (typeof i == "number"
        ? (c = i === (s.startsWith("scale") ? 1 : 0))
        : (c = parseFloat(i) === 0),
      !c || r)
    ) {
      const l = kE(i, e0[s]);
      if (!c) {
        o = !1;
        const u = iJ[s] || s;
        n += `${u}(${l}) `;
      }
      r && (t[s] = l);
    }
  }
  return (n = n.trim()), r ? (n = r(t, o ? "" : n)) : o && (n = "none"), n;
}
const PE = (e) => (t) => typeof t == "string" && t.startsWith(e),
  RE = PE("--"),
  lJ = PE("var(--"),
  t0 = (e) => (lJ(e) ? uJ.test(e.split("/*")[0].trim()) : !1),
  uJ =
    /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
function r0(e, t, r) {
  const { style: n, vars: o, transformOrigin: a } = e;
  let s = !1,
    i = !1;
  for (const c in t) {
    const l = t[c];
    if (io.has(c)) {
      s = !0;
      continue;
    } else if (RE(c)) {
      o[c] = l;
      continue;
    } else {
      const u = kE(l, e0[c]);
      c.startsWith("origin") ? ((i = !0), (a[c] = u)) : (n[c] = u);
    }
  }
  if (
    (t.transform ||
      (s || r
        ? (n.transform = TE(t, e.transform, r))
        : n.transform && (n.transform = "none")),
    i)
  ) {
    const { originX: c = "50%", originY: l = "50%", originZ: u = 0 } = a;
    n.transformOrigin = `${c} ${l} ${u}`;
  }
}
const n0 = () => ({ style: {}, transform: {}, transformOrigin: {}, vars: {} });
function AE(e, t, r) {
  for (const n in t) !Xe(t[n]) && !CE(n, r) && (e[n] = t[n]);
}
function dJ({ transformTemplate: e }, t) {
  return g.useMemo(() => {
    const r = n0();
    return r0(r, t, e), Object.assign({}, r.vars, r.style);
  }, [t]);
}
function fJ(e, t) {
  const r = e.style || {},
    n = {};
  return AE(n, r, e), Object.assign(n, dJ(e, t)), n;
}
function mJ(e, t) {
  const r = {},
    n = fJ(e, t);
  return (
    e.drag &&
      e.dragListener !== !1 &&
      ((r.draggable = !1),
      (n.userSelect = n.WebkitUserSelect = n.WebkitTouchCallout = "none"),
      (n.touchAction =
        e.drag === !0 ? "none" : `pan-${e.drag === "x" ? "y" : "x"}`)),
    e.tabIndex === void 0 &&
      (e.onTap || e.onTapStart || e.whileTap) &&
      (r.tabIndex = 0),
    (r.style = n),
    r
  );
}
const hJ = new Set([
  "animate",
  "exit",
  "variants",
  "initial",
  "style",
  "values",
  "variants",
  "transition",
  "transformTemplate",
  "custom",
  "inherit",
  "onBeforeLayoutMeasure",
  "onAnimationStart",
  "onAnimationComplete",
  "onUpdate",
  "onDragStart",
  "onDrag",
  "onDragEnd",
  "onMeasureDragConstraints",
  "onDirectionLock",
  "onDragTransitionEnd",
  "_dragX",
  "_dragY",
  "onHoverStart",
  "onHoverEnd",
  "onViewportEnter",
  "onViewportLeave",
  "globalTapTarget",
  "ignoreStrict",
  "viewport",
]);
function dl(e) {
  return (
    e.startsWith("while") ||
    (e.startsWith("drag") && e !== "draggable") ||
    e.startsWith("layout") ||
    e.startsWith("onTap") ||
    e.startsWith("onPan") ||
    e.startsWith("onLayout") ||
    hJ.has(e)
  );
}
let _E = (e) => !dl(e);
function IE(e) {
  e && (_E = (t) => (t.startsWith("on") ? !dl(t) : e(t)));
}
try {
  IE(require("@emotion/is-prop-valid").default);
} catch {}
function EE(e, t, r) {
  const n = {};
  for (const o in e)
    (o === "values" && typeof e.values == "object") ||
      ((_E(o) ||
        (r === !0 && dl(o)) ||
        (!t && !dl(o)) ||
        (e.draggable && o.startsWith("onDrag"))) &&
        (n[o] = e[o]));
  return n;
}
function w1(e, t, r) {
  return typeof e == "string" ? e : me.transform(t + r * e);
}
function pJ(e, t, r) {
  const n = w1(t, e.x, e.width),
    o = w1(r, e.y, e.height);
  return `${n} ${o}`;
}
const vJ = { offset: "stroke-dashoffset", array: "stroke-dasharray" },
  yJ = { offset: "strokeDashoffset", array: "strokeDasharray" };
function gJ(e, t, r = 1, n = 0, o = !0) {
  e.pathLength = 1;
  const a = o ? vJ : yJ;
  e[a.offset] = me.transform(-n);
  const s = me.transform(t),
    i = me.transform(r);
  e[a.array] = `${s} ${i}`;
}
function o0(
  e,
  {
    attrX: t,
    attrY: r,
    attrScale: n,
    originX: o,
    originY: a,
    pathLength: s,
    pathSpacing: i = 1,
    pathOffset: c = 0,
    ...l
  },
  u,
  d
) {
  if ((r0(e, l, d), u)) {
    e.style.viewBox && (e.attrs.viewBox = e.style.viewBox);
    return;
  }
  (e.attrs = e.style), (e.style = {});
  const { attrs: f, style: m, dimensions: h } = e;
  f.transform && (h && (m.transform = f.transform), delete f.transform),
    h &&
      (o !== void 0 || a !== void 0 || m.transform) &&
      (m.transformOrigin = pJ(
        h,
        o !== void 0 ? o : 0.5,
        a !== void 0 ? a : 0.5
      )),
    t !== void 0 && (f.x = t),
    r !== void 0 && (f.y = r),
    n !== void 0 && (f.scale = n),
    s !== void 0 && gJ(f, s, i, c, !1);
}
const ME = () => ({ ...n0(), attrs: {} }),
  a0 = (e) => typeof e == "string" && e.toLowerCase() === "svg";
function bJ(e, t, r, n) {
  const o = g.useMemo(() => {
    const a = ME();
    return (
      o0(a, t, a0(n), e.transformTemplate),
      { ...a.attrs, style: { ...a.style } }
    );
  }, [t]);
  if (e.style) {
    const a = {};
    AE(a, e.style, e), (o.style = { ...a, ...o.style });
  }
  return o;
}
function SJ(e = !1) {
  return (r, n, o, { latestValues: a }, s) => {
    const c = (Qb(r) ? bJ : mJ)(n, a, s, r),
      l = EE(n, typeof r == "string", e),
      u = r !== g.Fragment ? { ...l, ...c, ref: o } : {},
      { children: d } = n,
      f = g.useMemo(() => (Xe(d) ? d.get() : d), [d]);
    return g.createElement(r, { ...u, children: f });
  };
}
function FE(e, { style: t, vars: r }, n, o) {
  Object.assign(e.style, t, o && o.getProjectionStyles(n));
  for (const a in r) e.style.setProperty(a, r[a]);
}
const jE = new Set([
  "baseFrequency",
  "diffuseConstant",
  "kernelMatrix",
  "kernelUnitLength",
  "keySplines",
  "keyTimes",
  "limitingConeAngle",
  "markerHeight",
  "markerWidth",
  "numOctaves",
  "targetX",
  "targetY",
  "surfaceScale",
  "specularConstant",
  "specularExponent",
  "stdDeviation",
  "tableValues",
  "viewBox",
  "gradientTransform",
  "pathLength",
  "startOffset",
  "textLength",
  "lengthAdjust",
]);
function DE(e, t, r, n) {
  FE(e, t, void 0, n);
  for (const o in t.attrs) e.setAttribute(jE.has(o) ? o : pm(o), t.attrs[o]);
}
function s0(e, t, r) {
  var n;
  const { style: o } = e,
    a = {};
  for (const s in o)
    (Xe(o[s]) ||
      (t.style && Xe(t.style[s])) ||
      CE(s, e) ||
      ((n = r == null ? void 0 : r.getValue(s)) === null || n === void 0
        ? void 0
        : n.liveStyle) !== void 0) &&
      (a[s] = o[s]);
  return (
    r && o && typeof o.willChange == "string" && (r.applyWillChange = !1), a
  );
}
function NE(e, t, r) {
  const n = s0(e, t, r);
  for (const o in e)
    if (Xe(e[o]) || Xe(t[o])) {
      const a =
        Ll.indexOf(o) !== -1
          ? "attr" + o.charAt(0).toUpperCase() + o.substring(1)
          : o;
      n[a] = e[o];
    }
  return n;
}
function C1(e) {
  const t = [{}, {}];
  return (
    e == null ||
      e.values.forEach((r, n) => {
        (t[0][n] = r.get()), (t[1][n] = r.getVelocity());
      }),
    t
  );
}
function i0(e, t, r, n) {
  if (typeof t == "function") {
    const [o, a] = C1(n);
    t = t(r !== void 0 ? r : e.custom, o, a);
  }
  if (
    (typeof t == "string" && (t = e.variants && e.variants[t]),
    typeof t == "function")
  ) {
    const [o, a] = C1(n);
    t = t(r !== void 0 ? r : e.custom, o, a);
  }
  return t;
}
function Tt(e) {
  const t = g.useRef(null);
  return t.current === null && (t.current = e()), t.current;
}
const by = (e) => Array.isArray(e),
  xJ = (e) => !!(e && typeof e == "object" && e.mix && e.toValue),
  $J = (e) => (by(e) ? e[e.length - 1] || 0 : e);
function zc(e) {
  const t = Xe(e) ? e.get() : e;
  return xJ(t) ? t.toValue() : t;
}
const OE = new Set(["opacity", "clipPath", "filter", "transform"]);
function BE(e) {
  if (io.has(e)) return "transform";
  if (OE.has(e)) return pm(e);
}
function gm(e, t) {
  e.indexOf(t) === -1 && e.push(t);
}
function Hl(e, t) {
  const r = e.indexOf(t);
  r > -1 && e.splice(r, 1);
}
function wJ([...e], t, r) {
  const n = t < 0 ? e.length + t : t;
  if (n >= 0 && n < e.length) {
    const o = r < 0 ? e.length + r : r,
      [a] = e.splice(t, 1);
    e.splice(o, 0, a);
  }
  return e;
}
function CJ(
  {
    applyWillChange: e = !1,
    scrapeMotionValuesFromProps: t,
    createRenderState: r,
    onMount: n,
  },
  o,
  a,
  s,
  i
) {
  const c = { latestValues: TJ(o, a, s, i ? !1 : e, t), renderState: r() };
  return n && (c.mount = (l) => n(o, l, c)), c;
}
const bm = (e) => (t, r) => {
  const n = g.useContext(_i),
    o = g.useContext(Ii),
    a = () => CJ(e, t, n, o, r);
  return r ? a() : Tt(a);
};
function kJ(e, t) {
  const r = BE(t);
  r && gm(e, r);
}
function k1(e, t, r) {
  const n = Array.isArray(t) ? t : [t];
  for (let o = 0; o < n.length; o++) {
    const a = i0(e, n[o]);
    if (a) {
      const { transitionEnd: s, transition: i, ...c } = a;
      r(c, s);
    }
  }
}
function TJ(e, t, r, n, o) {
  var a;
  const s = {},
    i = [],
    c =
      n &&
      ((a = e.style) === null || a === void 0 ? void 0 : a.willChange) ===
        void 0,
    l = o(e, {});
  for (const v in l) s[v] = zc(l[v]);
  let { initial: u, animate: d } = e;
  const f = ym(e),
    m = SE(e);
  t &&
    m &&
    !f &&
    e.inherit !== !1 &&
    (u === void 0 && (u = t.initial), d === void 0 && (d = t.animate));
  let h = r ? r.initial === !1 : !1;
  h = h || u === !1;
  const p = h ? d : u;
  return (
    p &&
      typeof p != "boolean" &&
      !ll(p) &&
      k1(e, p, (v, b) => {
        for (const y in v) {
          let S = v[y];
          if (Array.isArray(S)) {
            const w = h ? S.length - 1 : 0;
            S = S[w];
          }
          S !== null && (s[y] = S);
        }
        for (const y in b) s[y] = b[y];
      }),
    c &&
      (d &&
        u !== !1 &&
        !ll(d) &&
        k1(e, d, (v) => {
          for (const b in v) kJ(i, b);
        }),
      i.length && (s.willChange = i.join(","))),
    s
  );
}
const {
    schedule: $e,
    cancel: Jt,
    state: it,
    steps: Hd,
  } = gE(typeof requestAnimationFrame < "u" ? requestAnimationFrame : St, !0),
  PJ = {
    useVisualState: bm({
      scrapeMotionValuesFromProps: NE,
      createRenderState: ME,
      onMount: (e, t, { renderState: r, latestValues: n }) => {
        $e.read(() => {
          try {
            r.dimensions =
              typeof t.getBBox == "function"
                ? t.getBBox()
                : t.getBoundingClientRect();
          } catch {
            r.dimensions = { x: 0, y: 0, width: 0, height: 0 };
          }
        }),
          $e.render(() => {
            o0(r, n, a0(t.tagName), e.transformTemplate), DE(t, r);
          });
      },
    }),
  },
  RJ = {
    useVisualState: bm({
      applyWillChange: !0,
      scrapeMotionValuesFromProps: s0,
      createRenderState: n0,
    }),
  };
function c0(e, { forwardMotionProps: t = !1 }, r, n) {
  return {
    ...(Qb(e) ? PJ : RJ),
    preloadedFeatures: r,
    useRender: SJ(t),
    createVisualElement: n,
    Component: e,
  };
}
function pn(e, t, r, n = { passive: !0 }) {
  return e.addEventListener(t, r, n), () => e.removeEventListener(t, r);
}
const LE = (e) =>
  e.pointerType === "mouse"
    ? typeof e.button != "number" || e.button <= 0
    : e.isPrimary !== !1;
function Sm(e, t = "page") {
  return { point: { x: e[`${t}X`], y: e[`${t}Y`] } };
}
const VE = (e) => (t) => LE(t) && e(t, Sm(t));
function Sn(e, t, r, n) {
  return pn(e, t, VE(r), n);
}
const AJ = (e, t) => (r) => t(e(r)),
  xn = (...e) => e.reduce(AJ);
function zE(e) {
  let t = null;
  return () => {
    const r = () => {
      t = null;
    };
    return t === null ? ((t = e), r) : !1;
  };
}
const T1 = zE("dragHorizontal"),
  P1 = zE("dragVertical");
function HE(e) {
  let t = !1;
  if (e === "y") t = P1();
  else if (e === "x") t = T1();
  else {
    const r = T1(),
      n = P1();
    r && n
      ? (t = () => {
          r(), n();
        })
      : (r && r(), n && n());
  }
  return t;
}
function l0() {
  const e = HE(!0);
  return e ? (e(), !1) : !0;
}
class Wo {
  constructor(t) {
    (this.isMounted = !1), (this.node = t);
  }
  update() {}
}
function R1(e, t) {
  const r = t ? "pointerenter" : "pointerleave",
    n = t ? "onHoverStart" : "onHoverEnd",
    o = (a, s) => {
      if (a.pointerType === "touch" || l0()) return;
      const i = e.getProps();
      e.animationState &&
        i.whileHover &&
        e.animationState.setActive("whileHover", t);
      const c = i[n];
      c && $e.postRender(() => c(a, s));
    };
  return Sn(e.current, r, o, { passive: !e.getProps()[n] });
}
class _J extends Wo {
  mount() {
    this.unmount = xn(R1(this.node, !0), R1(this.node, !1));
  }
  unmount() {}
}
class IJ extends Wo {
  constructor() {
    super(...arguments), (this.isActive = !1);
  }
  onFocus() {
    let t = !1;
    try {
      t = this.node.current.matches(":focus-visible");
    } catch {
      t = !0;
    }
    !t ||
      !this.node.animationState ||
      (this.node.animationState.setActive("whileFocus", !0),
      (this.isActive = !0));
  }
  onBlur() {
    !this.isActive ||
      !this.node.animationState ||
      (this.node.animationState.setActive("whileFocus", !1),
      (this.isActive = !1));
  }
  mount() {
    this.unmount = xn(
      pn(this.node.current, "focus", () => this.onFocus()),
      pn(this.node.current, "blur", () => this.onBlur())
    );
  }
  unmount() {}
}
const WE = (e, t) => (t ? (e === t ? !0 : WE(e, t.parentElement)) : !1);
function Bp(e, t) {
  if (!t) return;
  const r = new PointerEvent("pointer" + e);
  t(r, Sm(r));
}
class EJ extends Wo {
  constructor() {
    super(...arguments),
      (this.removeStartListeners = St),
      (this.removeEndListeners = St),
      (this.removeAccessibleListeners = St),
      (this.startPointerPress = (t, r) => {
        if (this.isPressing) return;
        this.removeEndListeners();
        const n = this.node.getProps(),
          a = Sn(
            window,
            "pointerup",
            (i, c) => {
              if (!this.checkPressEnd()) return;
              const {
                  onTap: l,
                  onTapCancel: u,
                  globalTapTarget: d,
                } = this.node.getProps(),
                f = !d && !WE(this.node.current, i.target) ? u : l;
              f && $e.update(() => f(i, c));
            },
            { passive: !(n.onTap || n.onPointerUp) }
          ),
          s = Sn(window, "pointercancel", (i, c) => this.cancelPress(i, c), {
            passive: !(n.onTapCancel || n.onPointerCancel),
          });
        (this.removeEndListeners = xn(a, s)), this.startPress(t, r);
      }),
      (this.startAccessiblePress = () => {
        const t = (a) => {
            if (a.key !== "Enter" || this.isPressing) return;
            const s = (i) => {
              i.key !== "Enter" ||
                !this.checkPressEnd() ||
                Bp("up", (c, l) => {
                  const { onTap: u } = this.node.getProps();
                  u && $e.postRender(() => u(c, l));
                });
            };
            this.removeEndListeners(),
              (this.removeEndListeners = pn(this.node.current, "keyup", s)),
              Bp("down", (i, c) => {
                this.startPress(i, c);
              });
          },
          r = pn(this.node.current, "keydown", t),
          n = () => {
            this.isPressing && Bp("cancel", (a, s) => this.cancelPress(a, s));
          },
          o = pn(this.node.current, "blur", n);
        this.removeAccessibleListeners = xn(r, o);
      });
  }
  startPress(t, r) {
    this.isPressing = !0;
    const { onTapStart: n, whileTap: o } = this.node.getProps();
    o &&
      this.node.animationState &&
      this.node.animationState.setActive("whileTap", !0),
      n && $e.postRender(() => n(t, r));
  }
  checkPressEnd() {
    return (
      this.removeEndListeners(),
      (this.isPressing = !1),
      this.node.getProps().whileTap &&
        this.node.animationState &&
        this.node.animationState.setActive("whileTap", !1),
      !l0()
    );
  }
  cancelPress(t, r) {
    if (!this.checkPressEnd()) return;
    const { onTapCancel: n } = this.node.getProps();
    n && $e.postRender(() => n(t, r));
  }
  mount() {
    const t = this.node.getProps(),
      r = Sn(
        t.globalTapTarget ? window : this.node.current,
        "pointerdown",
        this.startPointerPress,
        { passive: !(t.onTapStart || t.onPointerStart) }
      ),
      n = pn(this.node.current, "focus", this.startAccessiblePress);
    this.removeStartListeners = xn(r, n);
  }
  unmount() {
    this.removeStartListeners(),
      this.removeEndListeners(),
      this.removeAccessibleListeners();
  }
}
const Sy = new WeakMap(),
  Lp = new WeakMap(),
  MJ = (e) => {
    const t = Sy.get(e.target);
    t && t(e);
  },
  FJ = (e) => {
    e.forEach(MJ);
  };
function jJ({ root: e, ...t }) {
  const r = e || document;
  Lp.has(r) || Lp.set(r, {});
  const n = Lp.get(r),
    o = JSON.stringify(t);
  return n[o] || (n[o] = new IntersectionObserver(FJ, { root: e, ...t })), n[o];
}
function DJ(e, t, r) {
  const n = jJ(t);
  return (
    Sy.set(e, r),
    n.observe(e),
    () => {
      Sy.delete(e), n.unobserve(e);
    }
  );
}
const NJ = { some: 0, all: 1 };
class OJ extends Wo {
  constructor() {
    super(...arguments), (this.hasEnteredView = !1), (this.isInView = !1);
  }
  startObserver() {
    this.unmount();
    const { viewport: t = {} } = this.node.getProps(),
      { root: r, margin: n, amount: o = "some", once: a } = t,
      s = {
        root: r ? r.current : void 0,
        rootMargin: n,
        threshold: typeof o == "number" ? o : NJ[o],
      },
      i = (c) => {
        const { isIntersecting: l } = c;
        if (
          this.isInView === l ||
          ((this.isInView = l), a && !l && this.hasEnteredView)
        )
          return;
        l && (this.hasEnteredView = !0),
          this.node.animationState &&
            this.node.animationState.setActive("whileInView", l);
        const { onViewportEnter: u, onViewportLeave: d } = this.node.getProps(),
          f = l ? u : d;
        f && f(c);
      };
    return DJ(this.node.current, s, i);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver > "u") return;
    const { props: t, prevProps: r } = this.node;
    ["amount", "margin", "root"].some(BJ(t, r)) && this.startObserver();
  }
  unmount() {}
}
function BJ({ viewport: e = {} }, { viewport: t = {} } = {}) {
  return (r) => e[r] !== t[r];
}
const GE = {
  inView: { Feature: OJ },
  tap: { Feature: EJ },
  focus: { Feature: IJ },
  hover: { Feature: _J },
};
function UE(e, t) {
  if (!Array.isArray(t)) return !1;
  const r = t.length;
  if (r !== e.length) return !1;
  for (let n = 0; n < r; n++) if (t[n] !== e[n]) return !1;
  return !0;
}
function xm(e, t, r) {
  const n = e.getProps();
  return i0(n, t, r !== void 0 ? r : n.custom, e);
}
const $n = (e) => e * 1e3,
  wn = (e) => e / 1e3,
  LJ = { type: "spring", stiffness: 500, damping: 25, restSpeed: 10 },
  VJ = (e) => ({
    type: "spring",
    stiffness: 550,
    damping: e === 0 ? 2 * Math.sqrt(550) : 30,
    restSpeed: 10,
  }),
  zJ = { type: "keyframes", duration: 0.8 },
  HJ = { type: "keyframes", ease: [0.25, 0.1, 0.35, 1], duration: 0.3 },
  WJ = (e, { keyframes: t }) =>
    t.length > 2
      ? zJ
      : io.has(e)
      ? e.startsWith("scale")
        ? VJ(t[1])
        : LJ
      : HJ;
function GJ({
  when: e,
  delay: t,
  delayChildren: r,
  staggerChildren: n,
  staggerDirection: o,
  repeat: a,
  repeatType: s,
  repeatDelay: i,
  from: c,
  elapsed: l,
  ...u
}) {
  return !!Object.keys(u).length;
}
function u0(e, t) {
  return e[t] || e.default || e;
}
const fl = { current: !1 },
  UJ = (e) => e !== null;
function $m(e, { repeat: t, repeatType: r = "loop" }, n) {
  const o = e.filter(UJ),
    a = t && r !== "loop" && t % 2 === 1 ? 0 : o.length - 1;
  return !a || n === void 0 ? o[a] : n;
}
let Wd;
function KJ() {
  Wd = void 0;
}
const Io = {
    now: () => (
      Wd === void 0 &&
        Io.set(
          it.isProcessing || vm.useManualTiming
            ? it.timestamp
            : performance.now()
        ),
      Wd
    ),
    set: (e) => {
      (Wd = e), queueMicrotask(KJ);
    },
  },
  KE = (e) => /^0[^.\s]+$/u.test(e);
function qJ(e) {
  return typeof e == "number"
    ? e === 0
    : e !== null
    ? e === "none" || e === "0" || KE(e)
    : !0;
}
const qE = (e) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(e),
  XJ = /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;
function YJ(e) {
  const t = XJ.exec(e);
  if (!t) return [,];
  const [, r, n, o] = t;
  return [`--${r ?? n}`, o];
}
function XE(e, t, r = 1) {
  const [n, o] = YJ(e);
  if (!n) return;
  const a = window.getComputedStyle(t).getPropertyValue(n);
  if (a) {
    const s = a.trim();
    return qE(s) ? parseFloat(s) : s;
  }
  return t0(o) ? XE(o, t, r + 1) : o;
}
const ZJ = new Set([
    "width",
    "height",
    "top",
    "left",
    "right",
    "bottom",
    "x",
    "y",
    "translateX",
    "translateY",
  ]),
  A1 = (e) => e === Ei || e === me,
  _1 = (e, t) => parseFloat(e.split(", ")[t]),
  I1 =
    (e, t) =>
    (r, { transform: n }) => {
      if (n === "none" || !n) return 0;
      const o = n.match(/^matrix3d\((.+)\)$/u);
      if (o) return _1(o[1], t);
      {
        const a = n.match(/^matrix\((.+)\)$/u);
        return a ? _1(a[1], e) : 0;
      }
    },
  QJ = new Set(["x", "y", "z"]),
  JJ = Ll.filter((e) => !QJ.has(e));
function eee(e) {
  const t = [];
  return (
    JJ.forEach((r) => {
      const n = e.getValue(r);
      n !== void 0 &&
        (t.push([r, n.get()]), n.set(r.startsWith("scale") ? 1 : 0));
    }),
    t
  );
}
const oi = {
  width: ({ x: e }, { paddingLeft: t = "0", paddingRight: r = "0" }) =>
    e.max - e.min - parseFloat(t) - parseFloat(r),
  height: ({ y: e }, { paddingTop: t = "0", paddingBottom: r = "0" }) =>
    e.max - e.min - parseFloat(t) - parseFloat(r),
  top: (e, { top: t }) => parseFloat(t),
  left: (e, { left: t }) => parseFloat(t),
  bottom: ({ y: e }, { top: t }) => parseFloat(t) + (e.max - e.min),
  right: ({ x: e }, { left: t }) => parseFloat(t) + (e.max - e.min),
  x: I1(4, 13),
  y: I1(5, 14),
};
oi.translateX = oi.x;
oi.translateY = oi.y;
const YE = (e) => (t) => t.test(e),
  tee = { test: (e) => e === "auto", parse: (e) => e },
  ZE = [Ei, me, bn, ko, sJ, aJ, tee],
  E1 = (e) => ZE.find(YE(e)),
  Sa = new Set();
let xy = !1,
  $y = !1;
function QE() {
  if ($y) {
    const e = Array.from(Sa).filter((n) => n.needsMeasurement),
      t = new Set(e.map((n) => n.element)),
      r = new Map();
    t.forEach((n) => {
      const o = eee(n);
      o.length && (r.set(n, o), n.render());
    }),
      e.forEach((n) => n.measureInitialState()),
      t.forEach((n) => {
        n.render();
        const o = r.get(n);
        o &&
          o.forEach(([a, s]) => {
            var i;
            (i = n.getValue(a)) === null || i === void 0 || i.set(s);
          });
      }),
      e.forEach((n) => n.measureEndState()),
      e.forEach((n) => {
        n.suspendedScrollY !== void 0 && window.scrollTo(0, n.suspendedScrollY);
      });
  }
  ($y = !1), (xy = !1), Sa.forEach((e) => e.complete()), Sa.clear();
}
function JE() {
  Sa.forEach((e) => {
    e.readKeyframes(), e.needsMeasurement && ($y = !0);
  });
}
function ree() {
  JE(), QE();
}
class d0 {
  constructor(t, r, n, o, a, s = !1) {
    (this.isComplete = !1),
      (this.isAsync = !1),
      (this.needsMeasurement = !1),
      (this.isScheduled = !1),
      (this.unresolvedKeyframes = [...t]),
      (this.onComplete = r),
      (this.name = n),
      (this.motionValue = o),
      (this.element = a),
      (this.isAsync = s);
  }
  scheduleResolve() {
    (this.isScheduled = !0),
      this.isAsync
        ? (Sa.add(this),
          xy || ((xy = !0), $e.read(JE), $e.resolveKeyframes(QE)))
        : (this.readKeyframes(), this.complete());
  }
  readKeyframes() {
    const {
      unresolvedKeyframes: t,
      name: r,
      element: n,
      motionValue: o,
    } = this;
    for (let a = 0; a < t.length; a++)
      if (t[a] === null)
        if (a === 0) {
          const s = o == null ? void 0 : o.get(),
            i = t[t.length - 1];
          if (s !== void 0) t[0] = s;
          else if (n && r) {
            const c = n.readValue(r, i);
            c != null && (t[0] = c);
          }
          t[0] === void 0 && (t[0] = i), o && s === void 0 && o.set(t[0]);
        } else t[a] = t[a - 1];
  }
  setFinalKeyframe() {}
  measureInitialState() {}
  renderEndStyles() {}
  measureEndState() {}
  complete() {
    (this.isComplete = !0),
      this.onComplete(this.unresolvedKeyframes, this.finalKeyframe),
      Sa.delete(this);
  }
  cancel() {
    this.isComplete || ((this.isScheduled = !1), Sa.delete(this));
  }
  resume() {
    this.isComplete || this.scheduleResolve();
  }
}
const f0 = (e, t) => (r) =>
    !!(
      (Vl(r) && nJ.test(r) && r.startsWith(e)) ||
      (t && !oJ(r) && Object.prototype.hasOwnProperty.call(r, t))
    ),
  eM = (e, t, r) => (n) => {
    if (!Vl(n)) return n;
    const [o, a, s, i] = n.match(Jb);
    return {
      [e]: parseFloat(o),
      [t]: parseFloat(a),
      [r]: parseFloat(s),
      alpha: i !== void 0 ? parseFloat(i) : 1,
    };
  },
  nee = (e) => Zn(0, 255, e),
  Vp = { ...Ei, transform: (e) => Math.round(nee(e)) },
  va = {
    test: f0("rgb", "red"),
    parse: eM("red", "green", "blue"),
    transform: ({ red: e, green: t, blue: r, alpha: n = 1 }) =>
      "rgba(" +
      Vp.transform(e) +
      ", " +
      Vp.transform(t) +
      ", " +
      Vp.transform(r) +
      ", " +
      Vc(Lc.transform(n)) +
      ")",
  };
function oee(e) {
  let t = "",
    r = "",
    n = "",
    o = "";
  return (
    e.length > 5
      ? ((t = e.substring(1, 3)),
        (r = e.substring(3, 5)),
        (n = e.substring(5, 7)),
        (o = e.substring(7, 9)))
      : ((t = e.substring(1, 2)),
        (r = e.substring(2, 3)),
        (n = e.substring(3, 4)),
        (o = e.substring(4, 5)),
        (t += t),
        (r += r),
        (n += n),
        (o += o)),
    {
      red: parseInt(t, 16),
      green: parseInt(r, 16),
      blue: parseInt(n, 16),
      alpha: o ? parseInt(o, 16) / 255 : 1,
    }
  );
}
const wy = { test: f0("#"), parse: oee, transform: va.transform },
  Fs = {
    test: f0("hsl", "hue"),
    parse: eM("hue", "saturation", "lightness"),
    transform: ({ hue: e, saturation: t, lightness: r, alpha: n = 1 }) =>
      "hsla(" +
      Math.round(e) +
      ", " +
      bn.transform(Vc(t)) +
      ", " +
      bn.transform(Vc(r)) +
      ", " +
      Vc(Lc.transform(n)) +
      ")",
  },
  Ct = {
    test: (e) => va.test(e) || wy.test(e) || Fs.test(e),
    parse: (e) =>
      va.test(e) ? va.parse(e) : Fs.test(e) ? Fs.parse(e) : wy.parse(e),
    transform: (e) =>
      Vl(e) ? e : e.hasOwnProperty("red") ? va.transform(e) : Fs.transform(e),
  };
function aee(e) {
  var t, r;
  return (
    isNaN(e) &&
    Vl(e) &&
    (((t = e.match(Jb)) === null || t === void 0 ? void 0 : t.length) || 0) +
      (((r = e.match(rJ)) === null || r === void 0 ? void 0 : r.length) || 0) >
      0
  );
}
const tM = "number",
  rM = "color",
  see = "var",
  iee = "var(",
  M1 = "${}",
  cee =
    /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function ml(e) {
  const t = e.toString(),
    r = [],
    n = {color: [], number: [], var: [] },
    o = [];
  let a = 0;
  const i = t
    .replace(
      cee,
      (c) => (
        Ct.test(c)
          ? (n.color.push(a), o.push(rM), r.push(Ct.parse(c)))
          : c.startsWith(iee)
          ? (n.var.push(a), o.push(see), r.push(c))
          : (n.number.push(a), o.push(tM), r.push(parseFloat(c))),
        ++a,
        M1
      )
    )
    .split(M1);
  return { values: r, split: i, indexes: n, types: o };
}
function nM(e) {
  return ml(e).values;
}
function oM(e) {
  const { split: t, types: r } = ml(e),
    n = t.length;
  return (o) => {
    let a = "";
    for (let s = 0; s < n; s++)
      if (((a += t[s]), o[s] !== void 0)) {
        const i = r[s];
        i === tM
          ? (a += Vc(o[s]))
          : i === rM
          ? (a += Ct.transform(o[s]))
          : (a += o[s]);
      }
    return a;
  };
}
const lee = (e) => (typeof e == "number" ? 0 : e);
function uee(e) {
  const t = nM(e);
  return oM(e)(t.map(lee));
}
const Qn = {
    test: aee,
    parse: nM,
    createTransformer: oM,
    getAnimatableNone: uee,
  },
  dee = new Set(["brightness", "contrast", "saturate", "opacity"]);
function fee(e) {
  const [t, r] = e.slice(0, -1).split("(");
  if (t === "drop-shadow") return e;
  const [n] = r.match(Jb) || [];
  if (!n) return e;
  const o = r.replace(n, "");
  let a = dee.has(t) ? 1 : 0;
  return n !== r && (a *= 100), t + "(" + a + o + ")";
}
const mee = /\b([a-z-]*)\(.*?\)/gu,
  Cy = {
    ...Qn,
    getAnimatableNone: (e) => {
      const t = e.match(mee);
      return t ? t.map(fee).join(" ") : e;
    },
  },
  hee = {
    ...e0,
    color: Ct,
    backgroundColor: Ct,
    outlineColor: Ct,
    fill: Ct,
    stroke: Ct,
    borderColor: Ct,
    borderTopColor: Ct,
    borderRightColor: Ct,
    borderBottomColor: Ct,
    borderLeftColor: Ct,
    filter: Cy,
    WebkitFilter: Cy,
  },
  m0 = (e) => hee[e];
function aM(e, t) {
  let r = m0(e);
  return (
    r !== Cy && (r = Qn), r.getAnimatableNone ? r.getAnimatableNone(t) : void 0
  );
}
const pee = new Set(["auto", "none", "0"]);
function vee(e, t, r) {
  let n = 0,
    o;
  for (; n < e.length && !o; ) {
    const a = e[n];
    typeof a == "string" && !pee.has(a) && ml(a).values.length && (o = e[n]),
      n++;
  }
  if (o && r) for (const a of t) e[a] = aM(r, o);
}
class sM extends d0 {
  constructor(t, r, n, o) {
    super(t, r, n, o, o == null ? void 0 : o.owner, !0);
  }
  readKeyframes() {
    const { unresolvedKeyframes: t, element: r, name: n } = this;
    if (!r.current) return;
    super.readKeyframes();
    for (let c = 0; c < t.length; c++) {
      let l = t[c];
      if (typeof l == "string" && ((l = l.trim()), t0(l))) {
        const u = XE(l, r.current);
        u !== void 0 && (t[c] = u),
          c === t.length - 1 && (this.finalKeyframe = l);
      }
    }
    if ((this.resolveNoneKeyframes(), !ZJ.has(n) || t.length !== 2)) return;
    const [o, a] = t,
      s = E1(o),
      i = E1(a);
    if (s !== i)
      if (A1(s) && A1(i))
        for (let c = 0; c < t.length; c++) {
          const l = t[c];
          typeof l == "string" && (t[c] = parseFloat(l));
        }
      else this.needsMeasurement = !0;
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: t, name: r } = this,
      n = [];
    for (let o = 0; o < t.length; o++) qJ(t[o]) && n.push(o);
    n.length && vee(t, n, r);
  }
  measureInitialState() {
    const { element: t, unresolvedKeyframes: r, name: n } = this;
    if (!t.current) return;
    n === "height" && (this.suspendedScrollY = window.pageYOffset),
      (this.measuredOrigin = oi[n](
        t.measureViewportBox(),
        window.getComputedStyle(t.current)
      )),
      (r[0] = this.measuredOrigin);
    const o = r[r.length - 1];
    o !== void 0 && t.getValue(n, o).jump(o, !1);
  }
  measureEndState() {
    var t;
    const { element: r, name: n, unresolvedKeyframes: o } = this;
    if (!r.current) return;
    const a = r.getValue(n);
    a && a.jump(this.measuredOrigin, !1);
    const s = o.length - 1,
      i = o[s];
    (o[s] = oi[n](r.measureViewportBox(), window.getComputedStyle(r.current))),
      i !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = i),
      !((t = this.removedTransforms) === null || t === void 0) &&
        t.length &&
        this.removedTransforms.forEach(([c, l]) => {
          r.getValue(c).set(l);
        }),
      this.resolveNoneKeyframes();
  }
}
function iM(e) {
  let t;
  return () => (t === void 0 && (t = e()), t);
}
const F1 = (e, t) =>
  t === "zIndex"
    ? !1
    : !!(
        typeof e == "number" ||
        Array.isArray(e) ||
        (typeof e == "string" &&
          (Qn.test(e) || e === "0") &&
          !e.startsWith("url("))
      );
function yee(e) {
  const t = e[0];
  if (e.length === 1) return !0;
  for (let r = 0; r < e.length; r++) if (e[r] !== t) return !0;
}
function gee(e, t, r, n) {
  const o = e[0];
  if (o === null) return !1;
  if (t === "display" || t === "visibility") return !0;
  const a = e[e.length - 1],
    s = F1(o, t),
    i = F1(a, t);
  return !s || !i ? !1 : yee(e) || (r === "spring" && n);
}
class cM {
  constructor({
    autoplay: t = !0,
    delay: r = 0,
    type: n = "keyframes",
    repeat: o = 0,
    repeatDelay: a = 0,
    repeatType: s = "loop",
    ...i
  }) {
    (this.isStopped = !1),
      (this.hasAttemptedResolve = !1),
      (this.options = {
        autoplay: t,
        delay: r,
        type: n,
        repeat: o,
        repeatDelay: a,
        repeatType: s,
        ...i,
      }),
      this.updateFinishedPromise();
  }
  get resolved() {
    return (
      !this._resolved && !this.hasAttemptedResolve && ree(), this._resolved
    );
  }
  onKeyframesResolved(t, r) {
    this.hasAttemptedResolve = !0;
    const {
      name: n,
      type: o,
      velocity: a,
      delay: s,
      onComplete: i,
      onUpdate: c,
      isGenerator: l,
    } = this.options;
    if (!l && !gee(t, n, o, a))
      if (fl.current || !s) {
        c == null || c($m(t, this.options, r)),
          i == null || i(),
          this.resolveFinishedPromise();
        return;
      } else this.options.duration = 0;
    const u = this.initPlayback(t, r);
    u !== !1 &&
      ((this._resolved = { keyframes: t, finalKeyframe: r, ...u }),
      this.onPostResolved());
  }
  onPostResolved() {}
  then(t, r) {
    return this.currentFinishedPromise.then(t, r);
  }
  updateFinishedPromise() {
    this.currentFinishedPromise = new Promise((t) => {
      this.resolveFinishedPromise = t;
    });
  }
}
function h0(e, t) {
  return t ? e * (1e3 / t) : 0;
}
const bee = 5;
function lM(e, t, r) {
  const n = Math.max(t - bee, 0);
  return h0(r - e(n), t - n);
}
const zp = 0.001,
  See = 0.01,
  xee = 10,
  $ee = 0.05,
  wee = 1;
function Cee({
  duration: e = 800,
  bounce: t = 0.25,
  velocity: r = 0,
  mass: n = 1,
}) {
  let o,
    a,
    s = 1 - t;
  (s = Zn($ee, wee, s)),
    (e = Zn(See, xee, wn(e))),
    s < 1
      ? ((o = (l) => {
          const u = l * s,
            d = u * e,
            f = u - r,
            m = ky(l, s),
            h = Math.exp(-d);
          return zp - (f / m) * h;
        }),
        (a = (l) => {
          const d = l * s * e,
            f = d * r + r,
            m = Math.pow(s, 2) * Math.pow(l, 2) * e,
            h = Math.exp(-d),
            p = ky(Math.pow(l, 2), s);
          return ((-o(l) + zp > 0 ? -1 : 1) * ((f - m) * h)) / p;
        }))
      : ((o = (l) => {
          const u = Math.exp(-l * e),
            d = (l - r) * e + 1;
          return -zp + u * d;
        }),
        (a = (l) => {
          const u = Math.exp(-l * e),
            d = (r - l) * (e * e);
          return u * d;
        }));
  const i = 5 / e,
    c = Tee(o, a, i);
  if (((e = $n(e)), isNaN(c)))
    return { stiffness: 100, damping: 10, duration: e };
  {
    const l = Math.pow(c, 2) * n;
    return { stiffness: l, damping: s * 2 * Math.sqrt(n * l), duration: e };
  }
}
const kee = 12;
function Tee(e, t, r) {
  let n = r;
  for (let o = 1; o < kee; o++) n = n - e(n) / t(n);
  return n;
}
function ky(e, t) {
  return e * Math.sqrt(1 - t * t);
}
const Pee = ["duration", "bounce"],
  Ree = ["stiffness", "damping", "mass"];
function j1(e, t) {
  return t.some((r) => e[r] !== void 0);
}
function Aee(e) {
  let t = {
    velocity: 0,
    stiffness: 100,
    damping: 10,
    mass: 1,
    isResolvedFromDuration: !1,
    ...e,
  };
  if (!j1(e, Ree) && j1(e, Pee)) {
    const r = Cee(e);
    (t = { ...t, ...r, mass: 1 }), (t.isResolvedFromDuration = !0);
  }
  return t;
}
function wm({ keyframes: e, restDelta: t, restSpeed: r, ...n }) {
  const o = e[0],
    a = e[e.length - 1],
    s = { done: !1, value: o },
    {
      stiffness: i,
      damping: c,
      mass: l,
      duration: u,
      velocity: d,
      isResolvedFromDuration: f,
    } = Aee({ ...n, velocity: -wn(n.velocity || 0) }),
    m = d || 0,
    h = c / (2 * Math.sqrt(i * l)),
    p = a - o,
    v = wn(Math.sqrt(i / l)),
    b = Math.abs(p) < 5;
  r || (r = b ? 0.01 : 2), t || (t = b ? 0.005 : 0.5);
  let y;
  if (h < 1) {
    const S = ky(v, h);
    y = (w) => {
      const C = Math.exp(-h * v * w);
      return (
        a - C * (((m + h * v * p) / S) * Math.sin(S * w) + p * Math.cos(S * w))
      );
    };
  } else if (h === 1) y = (S) => a - Math.exp(-v * S) * (p + (m + v * p) * S);
  else {
    const S = v * Math.sqrt(h * h - 1);
    y = (w) => {
      const C = Math.exp(-h * v * w),
        T = Math.min(S * w, 300);
      return (
        a - (C * ((m + h * v * p) * Math.sinh(T) + S * p * Math.cosh(T))) / S
      );
    };
  }
  return {
    calculatedDuration: (f && u) || null,
    next: (S) => {
      const w = y(S);
      if (f) s.done = S >= u;
      else {
        let C = 0;
        h < 1 && (C = S === 0 ? $n(m) : lM(y, S, w));
        const T = Math.abs(C) <= r,
          k = Math.abs(a - w) <= t;
        s.done = T && k;
      }
      return (s.value = s.done ? a : w), s;
    },
  };
}
function D1({
  keyframes: e,
  velocity: t = 0,
  power: r = 0.8,
  timeConstant: n = 325,
  bounceDamping: o = 10,
  bounceStiffness: a = 500,
  modifyTarget: s,
  min: i,
  max: c,
  restDelta: l = 0.5,
  restSpeed: u,
}) {
  const d = e[0],
    f = { done: !1, value: d },
    m = (R) => (i !== void 0 && R < i) || (c !== void 0 && R > c),
    h = (R) =>
      i === void 0
        ? c
        : c === void 0 || Math.abs(i - R) < Math.abs(c - R)
        ? i
        : c;
  let p = r * t;
  const v = d + p,
    b = s === void 0 ? v : s(v);
  b !== v && (p = b - d);
  const y = (R) => -p * Math.exp(-R / n),
    S = (R) => b + y(R),
    w = (R) => {
      const E = y(R),
        _ = S(R);
      (f.done = Math.abs(E) <= l), (f.value = f.done ? b : _);
    };
  let C, T;
  const k = (R) => {
    m(f.value) &&
      ((C = R),
      (T = wm({
        keyframes: [f.value, h(f.value)],
        velocity: lM(S, R, f.value),
        damping: o,
        stiffness: a,
        restDelta: l,
        restSpeed: u,
      })));
  };
  return (
    k(0),
    {
      calculatedDuration: null,
      next: (R) => {
        let E = !1;
        return (
          !T && C === void 0 && ((E = !0), w(R), k(R)),
          C !== void 0 && R >= C ? T.next(R - C) : (!E && w(R), f)
        );
      },
    }
  );
}
const uM = (e, t, r) =>
    (((1 - 3 * r + 3 * t) * e + (3 * r - 6 * t)) * e + 3 * t) * e,
  _ee = 1e-7,
  Iee = 12;
function Eee(e, t, r, n, o) {
  let a,
    s,
    i = 0;
  do (s = t + (r - t) / 2), (a = uM(s, n, o) - e), a > 0 ? (r = s) : (t = s);
  while (Math.abs(a) > _ee && ++i < Iee);
  return s;
}
function Mi(e, t, r, n) {
  if (e === t && r === n) return St;
  const o = (a) => Eee(a, 0, 1, e, r);
  return (a) => (a === 0 || a === 1 ? a : uM(o(a), t, n));
}
const dM = Mi(0.42, 0, 1, 1),
  fM = Mi(0, 0, 0.58, 1),
  p0 = Mi(0.42, 0, 0.58, 1),
  mM = (e) => Array.isArray(e) && typeof e[0] != "number",
  v0 = (e) => (t) => t <= 0.5 ? e(2 * t) / 2 : (2 - e(2 * (1 - t))) / 2,
  y0 = (e) => (t) => 1 - e(1 - t),
  Cm = (e) => 1 - Math.sin(Math.acos(e)),
  g0 = y0(Cm),
  hM = v0(Cm),
  b0 = Mi(0.33, 1.53, 0.69, 0.99),
  km = y0(b0),
  pM = v0(km),
  vM = (e) =>
    (e *= 2) < 1 ? 0.5 * km(e) : 0.5 * (2 - Math.pow(2, -10 * (e - 1))),
  N1 = {
    linear: St,
    easeIn: dM,
    easeInOut: p0,
    easeOut: fM,
    circIn: Cm,
    circInOut: hM,
    circOut: g0,
    backIn: km,
    backInOut: pM,
    backOut: b0,
    anticipate: vM,
  },
  Ty = (e) => {
    if (Array.isArray(e)) {
      ul(e.length === 4);
      const [t, r, n, o] = e;
      return Mi(t, r, n, o);
    } else if (typeof e == "string") return ul(N1[e] !== void 0), N1[e];
    return e;
  },
  Do = (e, t, r) => {
    const n = t - e;
    return n === 0 ? 1 : (r - e) / n;
  },
  Ke = (e, t, r) => e + (t - e) * r;
function Hp(e, t, r) {
  return (
    r < 0 && (r += 1),
    r > 1 && (r -= 1),
    r < 1 / 6
      ? e + (t - e) * 6 * r
      : r < 1 / 2
      ? t
      : r < 2 / 3
      ? e + (t - e) * (2 / 3 - r) * 6
      : e
  );
}
function Mee({ hue: e, saturation: t, lightness: r, alpha: n }) {
  (e /= 360), (t /= 100), (r /= 100);
  let o = 0,
    a = 0,
    s = 0;
  if (!t) o = a = s = r;
  else {
    const i = r < 0.5 ? r * (1 + t) : r + t - r * t,
      c = 2 * r - i;
    (o = Hp(c, i, e + 1 / 3)), (a = Hp(c, i, e)), (s = Hp(c, i, e - 1 / 3));
  }
  return {
    red: Math.round(o * 255),
    green: Math.round(a * 255),
    blue: Math.round(s * 255),
    alpha: n,
  };
}
function gf(e, t) {
  return (r) => (r > 0 ? t : e);
}
const Wp = (e, t, r) => {
    const n = e * e,
      o = r * (t * t - n) + n;
    return o < 0 ? 0 : Math.sqrt(o);
  },
  Fee = [wy, va, Fs],
  jee = (e) => Fee.find((t) => t.test(e));
function O1(e) {
  const t = jee(e);
  if (!t) return !1;
  let r = t.parse(e);
  return t === Fs && (r = Mee(r)), r;
}
const B1 = (e, t) => {
    const r = O1(e),
      n = O1(t);
    if (!r || !n) return gf(e, t);
    const o = { ...r };
    return (a) => (
      (o.red = Wp(r.red, n.red, a)),
      (o.green = Wp(r.green, n.green, a)),
      (o.blue = Wp(r.blue, n.blue, a)),
      (o.alpha = Ke(r.alpha, n.alpha, a)),
      va.transform(o)
    );
  },
  Py = new Set(["none", "hidden"]);
function Dee(e, t) {
  return Py.has(e) ? (r) => (r <= 0 ? e : t) : (r) => (r >= 1 ? t : e);
}
function Nee(e, t) {
  return (r) => Ke(e, t, r);
}
function S0(e) {
  return typeof e == "number"
    ? Nee
    : typeof e == "string"
    ? t0(e)
      ? gf
      : Ct.test(e)
      ? B1
      : Lee
    : Array.isArray(e)
    ? yM
    : typeof e == "object"
    ? Ct.test(e)
      ? B1
      : Oee
    : gf;
}
function yM(e, t) {
  const r = [...e],
    n = r.length,
    o = e.map((a, s) => S0(a)(a, t[s]));
  return (a) => {
    for (let s = 0; s < n; s++) r[s] = o[s](a);
    return r;
  };
}
function Oee(e, t) {
  const r = { ...e, ...t },
    n = {};
  for (const o in r)
    e[o] !== void 0 && t[o] !== void 0 && (n[o] = S0(e[o])(e[o], t[o]));
  return (o) => {
    for (const a in n) r[a] = n[a](o);
    return r;
  };
}
function Bee(e, t) {
  var r;
  const n = [],
    o = {color: 0, var: 0, number: 0 };
  for (let a = 0; a < t.values.length; a++) {
    const s = t.types[a],
      i = e.indexes[s][o[s]],
      c = (r = e.values[i]) !== null && r !== void 0 ? r : 0;
    (n[a] = c), o[s]++;
  }
  return n;
}
const Lee = (e, t) => {
  const r = Qn.createTransformer(t),
    n = ml(e),
    o = ml(t);
  return n.indexes.var.length === o.indexes.var.length &&
    n.indexes.color.length === o.indexes.color.length &&
    n.indexes.number.length >= o.indexes.number.length
    ? (Py.has(e) && !o.values.length) || (Py.has(t) && !n.values.length)
      ? Dee(e, t)
      : xn(yM(Bee(n, o), o.values), r)
    : gf(e, t);
};
function x0(e, t, r) {
  return typeof e == "number" && typeof t == "number" && typeof r == "number"
    ? Ke(e, t, r)
    : S0(e)(e, t);
}
function Vee(e, t, r) {
  const n = [],
    o = r || x0,
    a = e.length - 1;
  for (let s = 0; s < a; s++) {
    let i = o(e[s], e[s + 1]);
    if (t) {
      const c = Array.isArray(t) ? t[s] || St : t;
      i = xn(c, i);
    }
    n.push(i);
  }
  return n;
}
function Tm(e, t, { clamp: r = !0, ease: n, mixer: o } = {}) {
  const a = e.length;
  if ((ul(a === t.length), a === 1)) return () => t[0];
  if (a === 2 && e[0] === e[1]) return () => t[1];
  e[0] > e[a - 1] && ((e = [...e].reverse()), (t = [...t].reverse()));
  const s = Vee(t, n, o),
    i = s.length,
    c = (l) => {
      let u = 0;
      if (i > 1) for (; u < e.length - 2 && !(l < e[u + 1]); u++);
      const d = Do(e[u], e[u + 1], l);
      return s[u](d);
    };
  return r ? (l) => c(Zn(e[0], e[a - 1], l)) : c;
}
function gM(e, t) {
  const r = e[e.length - 1];
  for (let n = 1; n <= t; n++) {
    const o = Do(0, t, n);
    e.push(Ke(r, 1, o));
  }
}
function $0(e) {
  const t = [0];
  return gM(t, e.length - 1), t;
}
function zee(e, t) {
  return e.map((r) => r * t);
}
function Hee(e, t) {
  return e.map(() => t || p0).splice(0, e.length - 1);
}
function bf({
  duration: e = 300,
  keyframes: t,
  times: r,
  ease: n = "easeInOut",
}) {
  const o = mM(n) ? n.map(Ty) : Ty(n),
    a = { done: !1, value: t[0] },
    s = zee(r && r.length === t.length ? r : $0(t), e),
    i = Tm(s, t, { ease: Array.isArray(o) ? o : Hee(t, o) });
  return {
    calculatedDuration: e,
    next: (c) => ((a.value = i(c)), (a.done = c >= e), a),
  };
}
const Ry = 2e4;
function bM(e) {
  let t = 0;
  const r = 50;
  let n = e.next(t);
  for (; !n.done && t < Ry; ) (t += r), (n = e.next(t));
  return t >= Ry ? 1 / 0 : t;
}
const Wee = (e) => {
    const t = ({ timestamp: r }) => e(r);
    return {
      start: () => $e.update(t, !0),
      stop: () => Jt(t),
      now: () => (it.isProcessing ? it.timestamp : Io.now()),
    };
  },
  Gee = { decay: D1, inertia: D1, tween: bf, keyframes: bf, spring: wm },
  Uee = (e) => e / 100;
class Pm extends cM {
  constructor({ KeyframeResolver: t = d0, ...r }) {
    super(r),
      (this.holdTime = null),
      (this.startTime = null),
      (this.cancelTime = null),
      (this.currentTime = 0),
      (this.playbackSpeed = 1),
      (this.pendingPlayState = "running"),
      (this.state = "idle"),
      (this.stop = () => {
        if (
          (this.resolver.cancel(), (this.isStopped = !0), this.state === "idle")
        )
          return;
        this.teardown();
        const { onStop: i } = this.options;
        i && i();
      });
    const { name: n, motionValue: o, keyframes: a } = this.options,
      s = (i, c) => this.onKeyframesResolved(i, c);
    n && o && o.owner
      ? (this.resolver = o.owner.resolveKeyframes(a, s, n, o))
      : (this.resolver = new t(a, s, n, o)),
      this.resolver.scheduleResolve();
  }
  initPlayback(t) {
    const {
        type: r = "keyframes",
        repeat: n = 0,
        repeatDelay: o = 0,
        repeatType: a,
        velocity: s = 0,
      } = this.options,
      i = Gee[r] || bf;
    let c, l;
    i !== bf &&
      typeof t[0] != "number" &&
      ((c = xn(Uee, x0(t[0], t[1]))), (t = [0, 100]));
    const u = i({ ...this.options, keyframes: t });
    a === "mirror" &&
      (l = i({ ...this.options, keyframes: [...t].reverse(), velocity: -s })),
      u.calculatedDuration === null && (u.calculatedDuration = bM(u));
    const { calculatedDuration: d } = u,
      f = d + o,
      m = f * (n + 1) - o;
    return {
      generator: u,
      mirroredGenerator: l,
      mapPercentToKeyframes: c,
      calculatedDuration: d,
      resolvedDuration: f,
      totalDuration: m,
    };
  }
  onPostResolved() {
    const { autoplay: t = !0 } = this.options;
    this.play(),
      this.pendingPlayState === "paused" || !t
        ? this.pause()
        : (this.state = this.pendingPlayState);
  }
  tick(t, r = !1) {
    const { resolved: n } = this;
    if (!n) {
      const { keyframes: R } = this.options;
      return { done: !0, value: R[R.length - 1] };
    }
    const {
      finalKeyframe: o,
      generator: a,
      mirroredGenerator: s,
      mapPercentToKeyframes: i,
      keyframes: c,
      calculatedDuration: l,
      totalDuration: u,
      resolvedDuration: d,
    } = n;
    if (this.startTime === null) return a.next(0);
    const {
      delay: f,
      repeat: m,
      repeatType: h,
      repeatDelay: p,
      onUpdate: v,
    } = this.options;
    this.speed > 0
      ? (this.startTime = Math.min(this.startTime, t))
      : this.speed < 0 &&
        (this.startTime = Math.min(t - u / this.speed, this.startTime)),
      r
        ? (this.currentTime = t)
        : this.holdTime !== null
        ? (this.currentTime = this.holdTime)
        : (this.currentTime = Math.round(t - this.startTime) * this.speed);
    const b = this.currentTime - f * (this.speed >= 0 ? 1 : -1),
      y = this.speed >= 0 ? b < 0 : b > u;
    (this.currentTime = Math.max(b, 0)),
      this.state === "finished" &&
        this.holdTime === null &&
        (this.currentTime = u);
    let S = this.currentTime,
      w = a;
    if (m) {
      const R = Math.min(this.currentTime, u) / d;
      let E = Math.floor(R),
        _ = R % 1;
      !_ && R >= 1 && (_ = 1),
        _ === 1 && E--,
        (E = Math.min(E, m + 1)),
        !!(E % 2) &&
          (h === "reverse"
            ? ((_ = 1 - _), p && (_ -= p / d))
            : h === "mirror" && (w = s)),
        (S = Zn(0, 1, _) * d);
    }
    const C = y ? { done: !1, value: c[0] } : w.next(S);
    i && (C.value = i(C.value));
    let { done: T } = C;
    !y &&
      l !== null &&
      (T = this.speed >= 0 ? this.currentTime >= u : this.currentTime <= 0);
    const k =
      this.holdTime === null &&
      (this.state === "finished" || (this.state === "running" && T));
    return (
      k && o !== void 0 && (C.value = $m(c, this.options, o)),
      v && v(C.value),
      k && this.finish(),
      C
    );
  }
  get duration() {
    const { resolved: t } = this;
    return t ? wn(t.calculatedDuration) : 0;
  }
  get time() {
    return wn(this.currentTime);
  }
  set time(t) {
    (t = $n(t)),
      (this.currentTime = t),
      this.holdTime !== null || this.speed === 0
        ? (this.holdTime = t)
        : this.driver && (this.startTime = this.driver.now() - t / this.speed);
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(t) {
    const r = this.playbackSpeed !== t;
    (this.playbackSpeed = t), r && (this.time = wn(this.currentTime));
  }
  play() {
    if (
      (this.resolver.isScheduled || this.resolver.resume(), !this._resolved)
    ) {
      this.pendingPlayState = "running";
      return;
    }
    if (this.isStopped) return;
    const { driver: t = Wee, onPlay: r } = this.options;
    this.driver || (this.driver = t((o) => this.tick(o))), r && r();
    const n = this.driver.now();
    this.holdTime !== null
      ? (this.startTime = n - this.holdTime)
      : (!this.startTime || this.state === "finished") && (this.startTime = n),
      this.state === "finished" && this.updateFinishedPromise(),
      (this.cancelTime = this.startTime),
      (this.holdTime = null),
      (this.state = "running"),
      this.driver.start();
  }
  pause() {
    var t;
    if (!this._resolved) {
      this.pendingPlayState = "paused";
      return;
    }
    (this.state = "paused"),
      (this.holdTime = (t = this.currentTime) !== null && t !== void 0 ? t : 0);
  }
  complete() {
    this.state !== "running" && this.play(),
      (this.pendingPlayState = this.state = "finished"),
      (this.holdTime = null);
  }
  finish() {
    this.teardown(), (this.state = "finished");
    const { onComplete: t } = this.options;
    t && t();
  }
  cancel() {
    this.cancelTime !== null && this.tick(this.cancelTime),
      this.teardown(),
      this.updateFinishedPromise();
  }
  teardown() {
    (this.state = "idle"),
      this.stopDriver(),
      this.resolveFinishedPromise(),
      this.updateFinishedPromise(),
      (this.startTime = this.cancelTime = null),
      this.resolver.cancel();
  }
  stopDriver() {
    this.driver && (this.driver.stop(), (this.driver = void 0));
  }
  sample(t) {
    return (this.startTime = 0), this.tick(t, !0);
  }
}
function SM(e) {
  return new Pm(e);
}
const xM = (e) => Array.isArray(e) && typeof e[0] == "number";
function $M(e) {
  return !!(
    !e ||
    (typeof e == "string" && e in w0) ||
    xM(e) ||
    (Array.isArray(e) && e.every($M))
  );
}
const Ac = ([e, t, r, n]) => `cubic-bezier(${e}, ${t}, ${r}, ${n})`,
  w0 = {
    linear: "linear",
    ease: "ease",
    easeIn: "ease-in",
    easeOut: "ease-out",
    easeInOut: "ease-in-out",
    circIn: Ac([0, 0.65, 0.55, 1]),
    circOut: Ac([0.55, 0, 1, 0.45]),
    backIn: Ac([0.31, 0.01, 0.66, -0.59]),
    backOut: Ac([0.33, 1.53, 0.69, 0.99]),
  };
function Kee(e) {
  return wM(e) || w0.easeOut;
}
function wM(e) {
  if (e) return xM(e) ? Ac(e) : Array.isArray(e) ? e.map(Kee) : w0[e];
}
function Ay(
  e,
  t,
  r,
  {
    delay: n = 0,
    duration: o = 300,
    repeat: a = 0,
    repeatType: s = "loop",
    ease: i,
    times: c,
  } = {}
) {
  const l = { [t]: r };
  c && (l.offset = c);
  const u = wM(i);
  return (
    Array.isArray(u) && (l.easing = u),
    e.animate(l, {
      delay: n,
      duration: o,
      easing: Array.isArray(u) ? "linear" : u,
      fill: "both",
      iterations: a + 1,
      direction: s === "reverse" ? "alternate" : "normal",
    })
  );
}
const qee = iM(() => Object.hasOwnProperty.call(Element.prototype, "animate")),
  Sf = 10,
  Xee = 2e4;
function Yee(e) {
  return e.type === "spring" || !$M(e.ease);
}
function Zee(e, t) {
  const r = new Pm({
    ...t,
    keyframes: e,
    repeat: 0,
    delay: 0,
    isGenerator: !0,
  });
  let n = { done: !1, value: e[0] };
  const o = [];
  let a = 0;
  for (; !n.done && a < Xee; ) (n = r.sample(a)), o.push(n.value), (a += Sf);
  return { times: void 0, keyframes: o, duration: a - Sf, ease: "linear" };
}
class _y extends cM {
  constructor(t) {
    super(t);
    const { name: r, motionValue: n, keyframes: o } = this.options;
    (this.resolver = new sM(o, (a, s) => this.onKeyframesResolved(a, s), r, n)),
      this.resolver.scheduleResolve();
  }
  initPlayback(t, r) {
    var n;
    let {
      duration: o = 300,
      times: a,
      ease: s,
      type: i,
      motionValue: c,
      name: l,
    } = this.options;
    if (!(!((n = c.owner) === null || n === void 0) && n.current)) return !1;
    if (Yee(this.options)) {
      const { onComplete: d, onUpdate: f, motionValue: m, ...h } = this.options,
        p = Zee(t, h);
      (t = p.keyframes),
        t.length === 1 && (t[1] = t[0]),
        (o = p.duration),
        (a = p.times),
        (s = p.ease),
        (i = "keyframes");
    }
    const u = Ay(c.owner.current, l, t, {
      ...this.options,
      duration: o,
      times: a,
      ease: s,
    });
    return (
      (u.startTime = Io.now()),
      this.pendingTimeline
        ? ((u.timeline = this.pendingTimeline), (this.pendingTimeline = void 0))
        : (u.onfinish = () => {
            const { onComplete: d } = this.options;
            c.set($m(t, this.options, r)),
              d && d(),
              this.cancel(),
              this.resolveFinishedPromise();
          }),
      { animation: u, duration: o, times: a, type: i, ease: s, keyframes: t }
    );
  }
  get duration() {
    const { resolved: t } = this;
    if (!t) return 0;
    const { duration: r } = t;
    return wn(r);
  }
  get time() {
    const { resolved: t } = this;
    if (!t) return 0;
    const { animation: r } = t;
    return wn(r.currentTime || 0);
  }
  set time(t) {
    const { resolved: r } = this;
    if (!r) return;
    const { animation: n } = r;
    n.currentTime = $n(t);
  }
  get speed() {
    const { resolved: t } = this;
    if (!t) return 1;
    const { animation: r } = t;
    return r.playbackRate;
  }
  set speed(t) {
    const { resolved: r } = this;
    if (!r) return;
    const { animation: n } = r;
    n.playbackRate = t;
  }
  get state() {
    const { resolved: t } = this;
    if (!t) return "idle";
    const { animation: r } = t;
    return r.playState;
  }
  attachTimeline(t) {
    if (!this._resolved) this.pendingTimeline = t;
    else {
      const { resolved: r } = this;
      if (!r) return St;
      const { animation: n } = r;
      (n.timeline = t), (n.onfinish = null);
    }
    return St;
  }
  play() {
    if (this.isStopped) return;
    const { resolved: t } = this;
    if (!t) return;
    const { animation: r } = t;
    r.playState === "finished" && this.updateFinishedPromise(), r.play();
  }
  pause() {
    const { resolved: t } = this;
    if (!t) return;
    const { animation: r } = t;
    r.pause();
  }
  stop() {
    if ((this.resolver.cancel(), (this.isStopped = !0), this.state === "idle"))
      return;
    this.resolveFinishedPromise(), this.updateFinishedPromise();
    const { resolved: t } = this;
    if (!t) return;
    const {
      animation: r,
      keyframes: n,
      duration: o,
      type: a,
      ease: s,
      times: i,
    } = t;
    if (r.playState === "idle" || r.playState === "finished") return;
    if (this.time) {
      const { motionValue: l, onUpdate: u, onComplete: d, ...f } = this.options,
        m = new Pm({
          ...f,
          keyframes: n,
          duration: o,
          type: a,
          ease: s,
          times: i,
          isGenerator: !0,
        }),
        h = $n(this.time);
      l.setWithVelocity(m.sample(h - Sf).value, m.sample(h).value, Sf);
    }
    const { onStop: c } = this.options;
    c && c(), this.cancel();
  }
  complete() {
    const { resolved: t } = this;
    t && t.animation.finish();
  }
  cancel() {
    const { resolved: t } = this;
    t && t.animation.cancel();
  }
  static supports(t) {
    const {
      motionValue: r,
      name: n,
      repeatDelay: o,
      repeatType: a,
      damping: s,
      type: i,
    } = t;
    return (
      qee() &&
      n &&
      OE.has(n) &&
      r &&
      r.owner &&
      r.owner.current instanceof HTMLElement &&
      !r.owner.getProps().onUpdate &&
      !o &&
      a !== "mirror" &&
      s !== 0 &&
      i !== "inertia"
    );
  }
}
function CM(e, t) {
  let r;
  const n = () => {
    const { currentTime: o } = t,
      s = (o === null ? 0 : o.value) / 100;
    r !== s && e(s), (r = s);
  };
  return $e.update(n, !0), () => Jt(n);
}
const kM = iM(() => window.ScrollTimeline !== void 0);
class C0 {
  constructor(t) {
    (this.stop = () => this.runAll("stop")),
      (this.animations = t.filter(Boolean));
  }
  then(t, r) {
    return Promise.all(this.animations).then(t).catch(r);
  }
  getAll(t) {
    return this.animations[0][t];
  }
  setAll(t, r) {
    for (let n = 0; n < this.animations.length; n++) this.animations[n][t] = r;
  }
  attachTimeline(t) {
    const r = this.animations.map((n) => {
      if (kM() && n.attachTimeline) n.attachTimeline(t);
      else
        return (
          n.pause(),
          CM((o) => {
            n.time = n.duration * o;
          }, t)
        );
    });
    return () => {
      r.forEach((n, o) => {
        n && n(), this.animations[o].stop();
      });
    };
  }
  get time() {
    return this.getAll("time");
  }
  set time(t) {
    this.setAll("time", t);
  }
  get speed() {
    return this.getAll("speed");
  }
  set speed(t) {
    this.setAll("speed", t);
  }
  get duration() {
    let t = 0;
    for (let r = 0; r < this.animations.length; r++)
      t = Math.max(t, this.animations[r].duration);
    return t;
  }
  runAll(t) {
    this.animations.forEach((r) => r[t]());
  }
  play() {
    this.runAll("play");
  }
  pause() {
    this.runAll("pause");
  }
  cancel() {
    this.runAll("cancel");
  }
  complete() {
    this.runAll("complete");
  }
}
const k0 =
  (e, t, r, n = {}, o, a, s) =>
  (i) => {
    const c = u0(n, e) || {},
      l = c.delay || n.delay || 0;
    let { elapsed: u = 0 } = n;
    u = u - $n(l);
    let d = {
      keyframes: Array.isArray(r) ? r : [null, r],
      ease: "easeOut",
      velocity: t.getVelocity(),
      ...c,
      delay: -u,
      onUpdate: (m) => {
        t.set(m), c.onUpdate && c.onUpdate(m);
      },
      onComplete: () => {
        i(), c.onComplete && c.onComplete(), s && s();
      },
      onStop: s,
      name: e,
      motionValue: t,
      element: a ? void 0 : o,
    };
    GJ(c) || (d = { ...d, ...WJ(e, d) }),
      d.duration && (d.duration = $n(d.duration)),
      d.repeatDelay && (d.repeatDelay = $n(d.repeatDelay)),
      d.from !== void 0 && (d.keyframes[0] = d.from);
    let f = !1;
    if (
      ((d.type === !1 || (d.duration === 0 && !d.repeatDelay)) &&
        ((d.duration = 0), d.delay === 0 && (f = !0)),
      (fl.current || vm.skipAnimations) &&
        ((f = !0), (d.duration = 0), (d.delay = 0)),
      f && !a && t.get() !== void 0)
    ) {
      const m = $m(d.keyframes, c);
      if (m !== void 0)
        return (
          $e.update(() => {
            d.onUpdate(m), d.onComplete();
          }),
          new C0([])
        );
    }
    return !a && _y.supports(d) ? new _y(d) : new Pm(d);
  };
class T0 {
  constructor() {
    this.subscriptions = [];
  }
  add(t) {
    return gm(this.subscriptions, t), () => Hl(this.subscriptions, t);
  }
  notify(t, r, n) {
    const o = this.subscriptions.length;
    if (o)
      if (o === 1) this.subscriptions[0](t, r, n);
      else
        for (let a = 0; a < o; a++) {
          const s = this.subscriptions[a];
          s && s(t, r, n);
        }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
}
const L1 = 30,
  Qee = (e) => !isNaN(parseFloat(e)),
  Hc = { current: void 0 };
class P0 {
  constructor(t, r = {}) {
    (this.version = "11.3.22"),
      (this.canTrackVelocity = null),
      (this.events = {}),
      (this.updateAndNotify = (n, o = !0) => {
        const a = Io.now();
        this.updatedAt !== a && this.setPrevFrameValue(),
          (this.prev = this.current),
          this.setCurrent(n),
          this.current !== this.prev &&
            this.events.change &&
            this.events.change.notify(this.current),
          o &&
            this.events.renderRequest &&
            this.events.renderRequest.notify(this.current);
      }),
      (this.hasAnimated = !1),
      this.setCurrent(t),
      (this.owner = r.owner);
  }
  setCurrent(t) {
    (this.current = t),
      (this.updatedAt = Io.now()),
      this.canTrackVelocity === null &&
        t !== void 0 &&
        (this.canTrackVelocity = Qee(this.current));
  }
  setPrevFrameValue(t = this.current) {
    (this.prevFrameValue = t), (this.prevUpdatedAt = this.updatedAt);
  }
  onChange(t) {
    return this.on("change", t);
  }
  on(t, r) {
    this.events[t] || (this.events[t] = new T0());
    const n = this.events[t].add(r);
    return t === "change"
      ? () => {
          n(),
            $e.read(() => {
              this.events.change.getSize() || this.stop();
            });
        }
      : n;
  }
  clearListeners() {
    for (const t in this.events) this.events[t].clear();
  }
  attach(t, r) {
    (this.passiveEffect = t), (this.stopPassiveEffect = r);
  }
  set(t, r = !0) {
    !r || !this.passiveEffect
      ? this.updateAndNotify(t, r)
      : this.passiveEffect(t, this.updateAndNotify);
  }
  setWithVelocity(t, r, n) {
    this.set(r),
      (this.prev = void 0),
      (this.prevFrameValue = t),
      (this.prevUpdatedAt = this.updatedAt - n);
  }
  jump(t, r = !0) {
    this.updateAndNotify(t),
      (this.prev = t),
      (this.prevUpdatedAt = this.prevFrameValue = void 0),
      r && this.stop(),
      this.stopPassiveEffect && this.stopPassiveEffect();
  }
  get() {
    return Hc.current && Hc.current.push(this), this.current;
  }
  getPrevious() {
    return this.prev;
  }
  getVelocity() {
    const t = Io.now();
    if (
      !this.canTrackVelocity ||
      this.prevFrameValue === void 0 ||
      t - this.updatedAt > L1
    )
      return 0;
    const r = Math.min(this.updatedAt - this.prevUpdatedAt, L1);
    return h0(parseFloat(this.current) - parseFloat(this.prevFrameValue), r);
  }
  start(t) {
    return (
      this.stop(),
      new Promise((r) => {
        (this.hasAnimated = !0),
          (this.animation = t(r)),
          this.events.animationStart && this.events.animationStart.notify();
      }).then(() => {
        this.events.animationComplete && this.events.animationComplete.notify(),
          this.clearAnimation();
      })
    );
  }
  stop() {
    this.animation &&
      (this.animation.stop(),
      this.events.animationCancel && this.events.animationCancel.notify()),
      this.clearAnimation();
  }
  isAnimating() {
    return !!this.animation;
  }
  clearAnimation() {
    delete this.animation;
  }
  destroy() {
    this.clearListeners(),
      this.stop(),
      this.stopPassiveEffect && this.stopPassiveEffect();
  }
}
function Zr(e, t) {
  return new P0(e, t);
}
function Jee(e, t, r) {
  e.hasValue(t) ? e.getValue(t).set(r) : e.addValue(t, Zr(r));
}
function R0(e, t) {
  const r = xm(e, t);
  let { transitionEnd: n = {}, transition: o = {}, ...a } = r || {};
  a = { ...a, ...n };
  for (const s in a) {
    const i = $J(a[s]);
    Jee(e, s, i);
  }
}
function TM(e) {
  return e.getProps()[Gb];
}
class PM extends P0 {
  constructor() {
    super(...arguments), (this.output = []), (this.counts = new Map());
  }
  add(t) {
    const r = BE(t);
    if (!r) return;
    const n = this.counts.get(r) || 0;
    this.counts.set(r, n + 1), n === 0 && (this.output.push(r), this.update());
    let o = !1;
    return () => {
      if (o) return;
      o = !0;
      const a = this.counts.get(r) - 1;
      this.counts.set(r, a), a === 0 && (Hl(this.output, r), this.update());
    };
  }
  update() {
    this.set(this.output.length ? this.output.join(", ") : "auto");
  }
}
function ete(e) {
  return !!(Xe(e) && e.add);
}
function Iy(e, t) {
  var r;
  if (!e.applyWillChange) return;
  let n = e.getValue("willChange");
  if (
    (!n &&
      !(!((r = e.props.style) === null || r === void 0) && r.willChange) &&
      ((n = new PM("auto")), e.addValue("willChange", n)),
    ete(n))
  )
    return n.add(t);
}
function tte({ protectedKeys: e, needsAnimating: t }, r) {
  const n = e.hasOwnProperty(r) && t[r] !== !0;
  return (t[r] = !1), n;
}
function A0(e, t, { delay: r = 0, transitionOverride: n, type: o } = {}) {
  var a;
  let { transition: s = e.getDefaultTransition(), transitionEnd: i, ...c } = t;
  n && (s = n);
  const l = [],
    u = o && e.animationState && e.animationState.getState()[o];
  for (const d in c) {
    const f = e.getValue(
        d,
        (a = e.latestValues[d]) !== null && a !== void 0 ? a : null
      ),
      m = c[d];
    if (m === void 0 || (u && tte(u, d))) continue;
    const h = { delay: r, elapsed: 0, ...u0(s || {}, d) };
    let p = !1;
    if (window.HandoffAppearAnimations) {
      const b = TM(e);
      if (b) {
        const y = window.HandoffAppearAnimations(b, d, f, $e);
        y !== null && ((h.elapsed = y), (p = !0));
      }
    }
    f.start(
      k0(
        d,
        f,
        m,
        e.shouldReduceMotion && io.has(d) ? { type: !1 } : h,
        e,
        p,
        Iy(e, d)
      )
    );
    const v = f.animation;
    v && l.push(v);
  }
  return (
    i &&
      Promise.all(l).then(() => {
        $e.update(() => {
          i && R0(e, i);
        });
      }),
    l
  );
}
function Ey(e, t, r = {}) {
  var n;
  const o = xm(
    e,
    t,
    r.type === "exit"
      ? (n = e.presenceContext) === null || n === void 0
        ? void 0
        : n.custom
      : void 0
  );
  let { transition: a = e.getDefaultTransition() || {} } = o || {};
  r.transitionOverride && (a = r.transitionOverride);
  const s = o ? () => Promise.all(A0(e, o, r)) : () => Promise.resolve(),
    i =
      e.variantChildren && e.variantChildren.size
        ? (l = 0) => {
            const {
              delayChildren: u = 0,
              staggerChildren: d,
              staggerDirection: f,
            } = a;
            return rte(e, t, u + l, d, f, r);
          }
        : () => Promise.resolve(),
    { when: c } = a;
  if (c) {
    const [l, u] = c === "beforeChildren" ? [s, i] : [i, s];
    return l().then(() => u());
  } else return Promise.all([s(), i(r.delay)]);
}
function rte(e, t, r = 0, n = 0, o = 1, a) {
  const s = [],
    i = (e.variantChildren.size - 1) * n,
    c = o === 1 ? (l = 0) => l * n : (l = 0) => i - l * n;
  return (
    Array.from(e.variantChildren)
      .sort(nte)
      .forEach((l, u) => {
        l.notify("AnimationStart", t),
          s.push(
            Ey(l, t, { ...a, delay: r + c(u) }).then(() =>
              l.notify("AnimationComplete", t)
            )
          );
      }),
    Promise.all(s)
  );
}
function nte(e, t) {
  return e.sortNodePosition(t);
}
function Rm(e, t, r = {}) {
  e.notify("AnimationStart", t);
  let n;
  if (Array.isArray(t)) {
    const o = t.map((a) => Ey(e, a, r));
    n = Promise.all(o);
  } else if (typeof t == "string") n = Ey(e, t, r);
  else {
    const o = typeof t == "function" ? xm(e, t, r.custom) : t;
    n = Promise.all(A0(e, o, r));
  }
  return n.then(() => {
    e.notify("AnimationComplete", t);
  });
}
const ote = [...qb].reverse(),
  ate = qb.length;
function ste(e) {
  return (t) =>
    Promise.all(t.map(({ animation: r, options: n }) => Rm(e, r, n)));
}
function ite(e) {
  let t = ste(e),
    r = V1(),
    n = !0;
  const o = (c) => (l, u) => {
    var d;
    const f = xm(
      e,
      u,
      c === "exit"
        ? (d = e.presenceContext) === null || d === void 0
          ? void 0
          : d.custom
        : void 0
    );
    if (f) {
      const { transition: m, transitionEnd: h, ...p } = f;
      l = { ...l, ...p, ...h };
    }
    return l;
  };
  function a(c) {
    t = c(e);
  }
  function s(c) {
    const l = e.getProps(),
      u = e.getVariantContext(!0) || {},
      d = [],
      f = new Set();
    let m = {},
      h = 1 / 0;
    for (let v = 0; v < ate; v++) {
      const b = ote[v],
        y = r[b],
        S = l[b] !== void 0 ? l[b] : u[b],
        w = cl(S),
        C = b === c ? y.isActive : null;
      C === !1 && (h = v);
      let T = S === u[b] && S !== l[b] && w;
      if (
        (T && n && e.manuallyAnimateOnMount && (T = !1),
        (y.protectedKeys = { ...m }),
        (!y.isActive && C === null) ||
          (!S && !y.prevProp) ||
          ll(S) ||
          typeof S == "boolean")
      )
        continue;
      let R =
          cte(y.prevProp, S) ||
          (b === c && y.isActive && !T && w) ||
          (v > h && w),
        E = !1;
      const _ = Array.isArray(S) ? S : [S];
      let N = _.reduce(o(b), {});
      C === !1 && (N = {});
      const { prevResolvedValues: G = {} } = y,
        B = { ...G, ...N },
        z = (Y) => {
          (R = !0),
            f.has(Y) && ((E = !0), f.delete(Y)),
            (y.needsAnimating[Y] = !0);
          const W = e.getValue(Y);
          W && (W.liveStyle = !1);
        };
      for (const Y in B) {
        const W = N[Y],
          j = G[Y];
        if (m.hasOwnProperty(Y)) continue;
        let O = !1;
        by(W) && by(j) ? (O = !UE(W, j)) : (O = W !== j),
          O
            ? W != null
              ? z(Y)
              : f.add(Y)
            : W !== void 0 && f.has(Y)
            ? z(Y)
            : (y.protectedKeys[Y] = !0);
      }
      (y.prevProp = S),
        (y.prevResolvedValues = N),
        y.isActive && (m = { ...m, ...N }),
        n && e.blockInitialAnimation && (R = !1),
        R &&
          (!T || E) &&
          d.push(..._.map((Y) => ({ animation: Y, options: { type: b } })));
    }
    if (f.size) {
      const v = {};
      f.forEach((b) => {
        const y = e.getBaseTarget(b),
          S = e.getValue(b);
        S && (S.liveStyle = !0), (v[b] = y ?? null);
      }),
        d.push({ animation: v });
    }
    let p = !!d.length;
    return (
      n &&
        (l.initial === !1 || l.initial === l.animate) &&
        !e.manuallyAnimateOnMount &&
        (p = !1),
      (n = !1),
      p ? t(d) : Promise.resolve()
    );
  }
  function i(c, l) {
    var u;
    if (r[c].isActive === l) return Promise.resolve();
    (u = e.variantChildren) === null ||
      u === void 0 ||
      u.forEach((f) => {
        var m;
        return (m = f.animationState) === null || m === void 0
          ? void 0
          : m.setActive(c, l);
      }),
      (r[c].isActive = l);
    const d = s(c);
    for (const f in r) r[f].protectedKeys = {};
    return d;
  }
  return {
    animateChanges: s,
    setActive: i,
    setAnimateFunction: a,
    getState: () => r,
    reset: () => {
      (r = V1()), (n = !0);
    },
  };
}
function cte(e, t) {
  return typeof t == "string" ? t !== e : Array.isArray(t) ? !UE(t, e) : !1;
}
function aa(e = !1) {
  return {
    isActive: e,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {},
  };
}
function V1() {
  return {
    animate: aa(!0),
    whileInView: aa(),
    whileHover: aa(),
    whileTap: aa(),
    whileDrag: aa(),
    whileFocus: aa(),
    exit: aa(),
  };
}
class lte extends Wo {
  constructor(t) {
    super(t), t.animationState || (t.animationState = ite(t));
  }
  updateAnimationControlsSubscription() {
    const { animate: t } = this.node.getProps();
    ll(t) && (this.unmountControls = t.subscribe(this.node));
  }
  mount() {
    this.updateAnimationControlsSubscription();
  }
  update() {
    const { animate: t } = this.node.getProps(),
      { animate: r } = this.node.prevProps || {};
    t !== r && this.updateAnimationControlsSubscription();
  }
  unmount() {
    var t;
    this.node.animationState.reset(),
      (t = this.unmountControls) === null || t === void 0 || t.call(this);
  }
}
let ute = 0;
class dte extends Wo {
  constructor() {
    super(...arguments), (this.id = ute++);
  }
  update() {
    if (!this.node.presenceContext) return;
    const { isPresent: t, onExitComplete: r } = this.node.presenceContext,
      { isPresent: n } = this.node.prevPresenceContext || {};
    if (!this.node.animationState || t === n) return;
    const o = this.node.animationState.setActive("exit", !t);
    r && !t && o.then(() => r(this.id));
  }
  mount() {
    const { register: t } = this.node.presenceContext || {};
    t && (this.unmount = t(this.id));
  }
  unmount() {}
}
const Am = { animation: { Feature: lte }, exit: { Feature: dte } },
  My = (e, t) => Math.abs(e - t);
function RM(e, t) {
  const r = My(e.x, t.x),
    n = My(e.y, t.y);
  return Math.sqrt(r ** 2 + n ** 2);
}
class AM {
  constructor(
    t,
    r,
    { transformPagePoint: n, contextWindow: o, dragSnapToOrigin: a = !1 } = {}
  ) {
    if (
      ((this.startEvent = null),
      (this.lastMoveEvent = null),
      (this.lastMoveEventInfo = null),
      (this.handlers = {}),
      (this.contextWindow = window),
      (this.updatePoint = () => {
        if (!(this.lastMoveEvent && this.lastMoveEventInfo)) return;
        const d = Up(this.lastMoveEventInfo, this.history),
          f = this.startEvent !== null,
          m = RM(d.offset, { x: 0, y: 0 }) >= 3;
        if (!f && !m) return;
        const { point: h } = d,
          { timestamp: p } = it;
        this.history.push({ ...h, timestamp: p });
        const { onStart: v, onMove: b } = this.handlers;
        f ||
          (v && v(this.lastMoveEvent, d),
          (this.startEvent = this.lastMoveEvent)),
          b && b(this.lastMoveEvent, d);
      }),
      (this.handlePointerMove = (d, f) => {
        (this.lastMoveEvent = d),
          (this.lastMoveEventInfo = Gp(f, this.transformPagePoint)),
          $e.update(this.updatePoint, !0);
      }),
      (this.handlePointerUp = (d, f) => {
        this.end();
        const { onEnd: m, onSessionEnd: h, resumeAnimation: p } = this.handlers;
        if (
          (this.dragSnapToOrigin && p && p(),
          !(this.lastMoveEvent && this.lastMoveEventInfo))
        )
          return;
        const v = Up(
          d.type === "pointercancel"
            ? this.lastMoveEventInfo
            : Gp(f, this.transformPagePoint),
          this.history
        );
        this.startEvent && m && m(d, v), h && h(d, v);
      }),
      !LE(t))
    )
      return;
    (this.dragSnapToOrigin = a),
      (this.handlers = r),
      (this.transformPagePoint = n),
      (this.contextWindow = o || window);
    const s = Sm(t),
      i = Gp(s, this.transformPagePoint),
      { point: c } = i,
      { timestamp: l } = it;
    this.history = [{ ...c, timestamp: l }];
    const { onSessionStart: u } = r;
    u && u(t, Up(i, this.history)),
      (this.removeListeners = xn(
        Sn(this.contextWindow, "pointermove", this.handlePointerMove),
        Sn(this.contextWindow, "pointerup", this.handlePointerUp),
        Sn(this.contextWindow, "pointercancel", this.handlePointerUp)
      ));
  }
  updateHandlers(t) {
    this.handlers = t;
  }
  end() {
    this.removeListeners && this.removeListeners(), Jt(this.updatePoint);
  }
}
function Gp(e, t) {
  return t ? { point: t(e.point) } : e;
}
function z1(e, t) {
  return { x: e.x - t.x, y: e.y - t.y };
}
function Up({ point: e }, t) {
  return {
    point: e,
    delta: z1(e, _M(t)),
    offset: z1(e, fte(t)),
    velocity: mte(t, 0.1),
  };
}
function fte(e) {
  return e[0];
}
function _M(e) {
  return e[e.length - 1];
}
function mte(e, t) {
  if (e.length < 2) return { x: 0, y: 0 };
  let r = e.length - 1,
    n = null;
  const o = _M(e);
  for (; r >= 0 && ((n = e[r]), !(o.timestamp - n.timestamp > $n(t))); ) r--;
  if (!n) return { x: 0, y: 0 };
  const a = wn(o.timestamp - n.timestamp);
  if (a === 0) return { x: 0, y: 0 };
  const s = { x: (o.x - n.x) / a, y: (o.y - n.y) / a };
  return s.x === 1 / 0 && (s.x = 0), s.y === 1 / 0 && (s.y = 0), s;
}
const IM = 1e-4,
  hte = 1 - IM,
  pte = 1 + IM,
  EM = 0.01,
  vte = 0 - EM,
  yte = 0 + EM;
function er(e) {
  return e.max - e.min;
}
function gte(e, t, r) {
  return Math.abs(e - t) <= r;
}
function H1(e, t, r, n = 0.5) {
  (e.origin = n),
    (e.originPoint = Ke(t.min, t.max, e.origin)),
    (e.scale = er(r) / er(t)),
    (e.translate = Ke(r.min, r.max, e.origin) - e.originPoint),
    ((e.scale >= hte && e.scale <= pte) || isNaN(e.scale)) && (e.scale = 1),
    ((e.translate >= vte && e.translate <= yte) || isNaN(e.translate)) &&
      (e.translate = 0);
}
function Wc(e, t, r, n) {
  H1(e.x, t.x, r.x, n ? n.originX : void 0),
    H1(e.y, t.y, r.y, n ? n.originY : void 0);
}
function W1(e, t, r) {
  (e.min = r.min + t.min), (e.max = e.min + er(t));
}
function bte(e, t, r) {
  W1(e.x, t.x, r.x), W1(e.y, t.y, r.y);
}
function G1(e, t, r) {
  (e.min = t.min - r.min), (e.max = e.min + er(t));
}
function Gc(e, t, r) {
  G1(e.x, t.x, r.x), G1(e.y, t.y, r.y);
}
function Ste(e, { min: t, max: r }, n) {
  return (
    t !== void 0 && e < t
      ? (e = n ? Ke(t, e, n.min) : Math.max(e, t))
      : r !== void 0 && e > r && (e = n ? Ke(r, e, n.max) : Math.min(e, r)),
    e
  );
}
function U1(e, t, r) {
  return {
    min: t !== void 0 ? e.min + t : void 0,
    max: r !== void 0 ? e.max + r - (e.max - e.min) : void 0,
  };
}
function xte(e, { top: t, left: r, bottom: n, right: o }) {
  return { x: U1(e.x, r, o), y: U1(e.y, t, n) };
}
function K1(e, t) {
  let r = t.min - e.min,
    n = t.max - e.max;
  return t.max - t.min < e.max - e.min && ([r, n] = [n, r]), { min: r, max: n };
}
function $te(e, t) {
  return { x: K1(e.x, t.x), y: K1(e.y, t.y) };
}
function wte(e, t) {
  let r = 0.5;
  const n = er(e),
    o = er(t);
  return (
    o > n
      ? (r = Do(t.min, t.max - n, e.min))
      : n > o && (r = Do(e.min, e.max - o, t.min)),
    Zn(0, 1, r)
  );
}
function Cte(e, t) {
  const r = {};
  return (
    t.min !== void 0 && (r.min = t.min - e.min),
    t.max !== void 0 && (r.max = t.max - e.min),
    r
  );
}
const Fy = 0.35;
function kte(e = Fy) {
  return (
    e === !1 ? (e = 0) : e === !0 && (e = Fy),
    { x: q1(e, "left", "right"), y: q1(e, "top", "bottom") }
  );
}
function q1(e, t, r) {
  return { min: X1(e, t), max: X1(e, r) };
}
function X1(e, t) {
  return typeof e == "number" ? e : e[t] || 0;
}
const Y1 = () => ({ translate: 0, scale: 1, origin: 0, originPoint: 0 }),
  js = () => ({ x: Y1(), y: Y1() }),
  Z1 = () => ({ min: 0, max: 0 }),
  Qe = () => ({ x: Z1(), y: Z1() });
function _r(e) {
  return [e("x"), e("y")];
}
function MM({ top: e, left: t, right: r, bottom: n }) {
  return { x: { min: t, max: r }, y: { min: e, max: n } };
}
function Tte({ x: e, y: t }) {
  return { top: t.min, right: e.max, bottom: t.max, left: e.min };
}
function Pte(e, t) {
  if (!t) return e;
  const r = t({ x: e.left, y: e.top }),
    n = t({ x: e.right, y: e.bottom });
  return { top: r.y, left: r.x, bottom: n.y, right: n.x };
}
function Kp(e) {
  return e === void 0 || e === 1;
}
function jy({ scale: e, scaleX: t, scaleY: r }) {
  return !Kp(e) || !Kp(t) || !Kp(r);
}
function la(e) {
  return (
    jy(e) ||
    FM(e) ||
    e.z ||
    e.rotate ||
    e.rotateX ||
    e.rotateY ||
    e.skewX ||
    e.skewY
  );
}
function FM(e) {
  return Q1(e.x) || Q1(e.y);
}
function Q1(e) {
  return e && e !== "0%";
}
function xf(e, t, r) {
  const n = e - r,
    o = t * n;
  return r + o;
}
function J1(e, t, r, n, o) {
  return o !== void 0 && (e = xf(e, o, n)), xf(e, r, n) + t;
}
function Dy(e, t = 0, r = 1, n, o) {
  (e.min = J1(e.min, t, r, n, o)), (e.max = J1(e.max, t, r, n, o));
}
function jM(e, { x: t, y: r }) {
  Dy(e.x, t.translate, t.scale, t.originPoint),
    Dy(e.y, r.translate, r.scale, r.originPoint);
}
const ew = 0.999999999999,
  tw = 1.0000000000001;
function Rte(e, t, r, n = !1) {
  const o = r.length;
  if (!o) return;
  t.x = t.y = 1;
  let a, s;
  for (let i = 0; i < o; i++) {
    (a = r[i]), (s = a.projectionDelta);
    const { visualElement: c } = a.options;
    (c && c.props.style && c.props.style.display === "contents") ||
      (n &&
        a.options.layoutScroll &&
        a.scroll &&
        a !== a.root &&
        Ns(e, { x: -a.scroll.offset.x, y: -a.scroll.offset.y }),
      s && ((t.x *= s.x.scale), (t.y *= s.y.scale), jM(e, s)),
      n && la(a.latestValues) && Ns(e, a.latestValues));
  }
  t.x < tw && t.x > ew && (t.x = 1), t.y < tw && t.y > ew && (t.y = 1);
}
function Ds(e, t) {
  (e.min = e.min + t), (e.max = e.max + t);
}
function rw(e, t, r, n, o = 0.5) {
  const a = Ke(e.min, e.max, o);
  Dy(e, t, r, a, n);
}
function Ns(e, t) {
  rw(e.x, t.x, t.scaleX, t.scale, t.originX),
    rw(e.y, t.y, t.scaleY, t.scale, t.originY);
}
function DM(e, t) {
  return MM(Pte(e.getBoundingClientRect(), t));
}
function Ate(e, t, r) {
  const n = DM(e, r),
    { scroll: o } = t;
  return o && (Ds(n.x, o.offset.x), Ds(n.y, o.offset.y)), n;
}
const NM = ({ current: e }) => (e ? e.ownerDocument.defaultView : null),
  _te = new WeakMap();
class Ite {
  constructor(t) {
    (this.openGlobalLock = null),
      (this.isDragging = !1),
      (this.currentDirection = null),
      (this.originPoint = { x: 0, y: 0 }),
      (this.constraints = !1),
      (this.hasMutatedConstraints = !1),
      (this.elastic = Qe()),
      (this.visualElement = t);
  }
  start(t, { snapToCursor: r = !1 } = {}) {
    const { presenceContext: n } = this.visualElement;
    if (n && n.isPresent === !1) return;
    const o = (u) => {
        const { dragSnapToOrigin: d } = this.getProps();
        d ? this.pauseAnimation() : this.stopAnimation(),
          r && this.snapToCursor(Sm(u, "page").point);
      },
      a = (u, d) => {
        var f;
        const { drag: m, dragPropagation: h, onDragStart: p } = this.getProps();
        if (
          m &&
          !h &&
          (this.openGlobalLock && this.openGlobalLock(),
          (this.openGlobalLock = HE(m)),
          !this.openGlobalLock)
        )
          return;
        (this.isDragging = !0),
          (this.currentDirection = null),
          this.resolveConstraints(),
          this.visualElement.projection &&
            ((this.visualElement.projection.isAnimationBlocked = !0),
            (this.visualElement.projection.target = void 0)),
          _r((b) => {
            let y = this.getAxisMotionValue(b).get() || 0;
            if (bn.test(y)) {
              const { projection: S } = this.visualElement;
              if (S && S.layout) {
                const w = S.layout.layoutBox[b];
                w && (y = er(w) * (parseFloat(y) / 100));
              }
            }
            this.originPoint[b] = y;
          }),
          p && $e.postRender(() => p(u, d)),
          (f = this.removeWillChange) === null || f === void 0 || f.call(this),
          (this.removeWillChange = Iy(this.visualElement, "transform"));
        const { animationState: v } = this.visualElement;
        v && v.setActive("whileDrag", !0);
      },
      s = (u, d) => {
        const {
          dragPropagation: f,
          dragDirectionLock: m,
          onDirectionLock: h,
          onDrag: p,
        } = this.getProps();
        if (!f && !this.openGlobalLock) return;
        const { offset: v } = d;
        if (m && this.currentDirection === null) {
          (this.currentDirection = Ete(v)),
            this.currentDirection !== null && h && h(this.currentDirection);
          return;
        }
        this.updateAxis("x", d.point, v),
          this.updateAxis("y", d.point, v),
          this.visualElement.render(),
          p && p(u, d);
      },
      i = (u, d) => this.stop(u, d),
      c = () =>
        _r((u) => {
          var d;
          return (
            this.getAnimationState(u) === "paused" &&
            ((d = this.getAxisMotionValue(u).animation) === null || d === void 0
              ? void 0
              : d.play())
          );
        }),
      { dragSnapToOrigin: l } = this.getProps();
    this.panSession = new AM(
      t,
      {
        onSessionStart: o,
        onStart: a,
        onMove: s,
        onSessionEnd: i,
        resumeAnimation: c,
      },
      {
        transformPagePoint: this.visualElement.getTransformPagePoint(),
        dragSnapToOrigin: l,
        contextWindow: NM(this.visualElement),
      }
    );
  }
  stop(t, r) {
    var n;
    (n = this.removeWillChange) === null || n === void 0 || n.call(this);
    const o = this.isDragging;
    if ((this.cancel(), !o)) return;
    const { velocity: a } = r;
    this.startAnimation(a);
    const { onDragEnd: s } = this.getProps();
    s && $e.postRender(() => s(t, r));
  }
  cancel() {
    this.isDragging = !1;
    const { projection: t, animationState: r } = this.visualElement;
    t && (t.isAnimationBlocked = !1),
      this.panSession && this.panSession.end(),
      (this.panSession = void 0);
    const { dragPropagation: n } = this.getProps();
    !n &&
      this.openGlobalLock &&
      (this.openGlobalLock(), (this.openGlobalLock = null)),
      r && r.setActive("whileDrag", !1);
  }
  updateAxis(t, r, n) {
    const { drag: o } = this.getProps();
    if (!n || !Zu(t, o, this.currentDirection)) return;
    const a = this.getAxisMotionValue(t);
    let s = this.originPoint[t] + n[t];
    this.constraints &&
      this.constraints[t] &&
      (s = Ste(s, this.constraints[t], this.elastic[t])),
      a.set(s);
  }
  resolveConstraints() {
    var t;
    const { dragConstraints: r, dragElastic: n } = this.getProps(),
      o =
        this.visualElement.projection && !this.visualElement.projection.layout
          ? this.visualElement.projection.measure(!1)
          : (t = this.visualElement.projection) === null || t === void 0
          ? void 0
          : t.layout,
      a = this.constraints;
    r && Ms(r)
      ? this.constraints || (this.constraints = this.resolveRefConstraints())
      : r && o
      ? (this.constraints = xte(o.layoutBox, r))
      : (this.constraints = !1),
      (this.elastic = kte(n)),
      a !== this.constraints &&
        o &&
        this.constraints &&
        !this.hasMutatedConstraints &&
        _r((s) => {
          this.constraints !== !1 &&
            this.getAxisMotionValue(s) &&
            (this.constraints[s] = Cte(o.layoutBox[s], this.constraints[s]));
        });
  }
  resolveRefConstraints() {
    const { dragConstraints: t, onMeasureDragConstraints: r } = this.getProps();
    if (!t || !Ms(t)) return !1;
    const n = t.current,
      { projection: o } = this.visualElement;
    if (!o || !o.layout) return !1;
    const a = Ate(n, o.root, this.visualElement.getTransformPagePoint());
    let s = $te(o.layout.layoutBox, a);
    if (r) {
      const i = r(Tte(s));
      (this.hasMutatedConstraints = !!i), i && (s = MM(i));
    }
    return s;
  }
  startAnimation(t) {
    const {
        drag: r,
        dragMomentum: n,
        dragElastic: o,
        dragTransition: a,
        dragSnapToOrigin: s,
        onDragTransitionEnd: i,
      } = this.getProps(),
      c = this.constraints || {},
      l = _r((u) => {
        if (!Zu(u, r, this.currentDirection)) return;
        let d = (c && c[u]) || {};
        s && (d = { min: 0, max: 0 });
        const f = o ? 200 : 1e6,
          m = o ? 40 : 1e7,
          h = {
            type: "inertia",
            velocity: n ? t[u] : 0,
            bounceStiffness: f,
            bounceDamping: m,
            timeConstant: 750,
            restDelta: 1,
            restSpeed: 10,
            ...a,
            ...d,
          };
        return this.startAxisValueAnimation(u, h);
      });
    return Promise.all(l).then(i);
  }
  startAxisValueAnimation(t, r) {
    const n = this.getAxisMotionValue(t);
    return n.start(
      k0(t, n, 0, r, this.visualElement, !1, Iy(this.visualElement, t))
    );
  }
  stopAnimation() {
    _r((t) => this.getAxisMotionValue(t).stop());
  }
  pauseAnimation() {
    _r((t) => {
      var r;
      return (r = this.getAxisMotionValue(t).animation) === null || r === void 0
        ? void 0
        : r.pause();
    });
  }
  getAnimationState(t) {
    var r;
    return (r = this.getAxisMotionValue(t).animation) === null || r === void 0
      ? void 0
      : r.state;
  }
  getAxisMotionValue(t) {
    const r = `_drag${t.toUpperCase()}`,
      n = this.visualElement.getProps(),
      o = n[r];
    return (
      o ||
      this.visualElement.getValue(t, (n.initial ? n.initial[t] : void 0) || 0)
    );
  }
  snapToCursor(t) {
    _r((r) => {
      const { drag: n } = this.getProps();
      if (!Zu(r, n, this.currentDirection)) return;
      const { projection: o } = this.visualElement,
        a = this.getAxisMotionValue(r);
      if (o && o.layout) {
        const { min: s, max: i } = o.layout.layoutBox[r];
        a.set(t[r] - Ke(s, i, 0.5));
      }
    });
  }
  scalePositionWithinConstraints() {
    if (!this.visualElement.current) return;
    const { drag: t, dragConstraints: r } = this.getProps(),
      { projection: n } = this.visualElement;
    if (!Ms(r) || !n || !this.constraints) return;
    this.stopAnimation();
    const o = { x: 0, y: 0 };
    _r((s) => {
      const i = this.getAxisMotionValue(s);
      if (i && this.constraints !== !1) {
        const c = i.get();
        o[s] = wte({ min: c, max: c }, this.constraints[s]);
      }
    });
    const { transformTemplate: a } = this.visualElement.getProps();
    (this.visualElement.current.style.transform = a ? a({}, "") : "none"),
      n.root && n.root.updateScroll(),
      n.updateLayout(),
      this.resolveConstraints(),
      _r((s) => {
        if (!Zu(s, t, null)) return;
        const i = this.getAxisMotionValue(s),
          { min: c, max: l } = this.constraints[s];
        i.set(Ke(c, l, o[s]));
      });
  }
  addListeners() {
    if (!this.visualElement.current) return;
    _te.set(this.visualElement, this);
    const t = this.visualElement.current,
      r = Sn(t, "pointerdown", (c) => {
        const { drag: l, dragListener: u = !0 } = this.getProps();
        l && u && this.start(c);
      }),
      n = () => {
        const { dragConstraints: c } = this.getProps();
        Ms(c) && c.current && (this.constraints = this.resolveRefConstraints());
      },
      { projection: o } = this.visualElement,
      a = o.addEventListener("measure", n);
    o && !o.layout && (o.root && o.root.updateScroll(), o.updateLayout()),
      $e.read(n);
    const s = pn(window, "resize", () => this.scalePositionWithinConstraints()),
      i = o.addEventListener(
        "didUpdate",
        ({ delta: c, hasLayoutChanged: l }) => {
          this.isDragging &&
            l &&
            (_r((u) => {
              const d = this.getAxisMotionValue(u);
              d &&
                ((this.originPoint[u] += c[u].translate),
                d.set(d.get() + c[u].translate));
            }),
            this.visualElement.render());
        }
      );
    return () => {
      s(), r(), a(), i && i();
    };
  }
  getProps() {
    const t = this.visualElement.getProps(),
      {
        drag: r = !1,
        dragDirectionLock: n = !1,
        dragPropagation: o = !1,
        dragConstraints: a = !1,
        dragElastic: s = Fy,
        dragMomentum: i = !0,
      } = t;
    return {
      ...t,
      drag: r,
      dragDirectionLock: n,
      dragPropagation: o,
      dragConstraints: a,
      dragElastic: s,
      dragMomentum: i,
    };
  }
}
function Zu(e, t, r) {
  return (t === !0 || t === e) && (r === null || r === e);
}
function Ete(e, t = 10) {
  let r = null;
  return Math.abs(e.y) > t ? (r = "y") : Math.abs(e.x) > t && (r = "x"), r;
}
class Mte extends Wo {
  constructor(t) {
    super(t),
      (this.removeGroupControls = St),
      (this.removeListeners = St),
      (this.controls = new Ite(t));
  }
  mount() {
    const { dragControls: t } = this.node.getProps();
    t && (this.removeGroupControls = t.subscribe(this.controls)),
      (this.removeListeners = this.controls.addListeners() || St);
  }
  unmount() {
    this.removeGroupControls(), this.removeListeners();
  }
}
const nw = (e) => (t, r) => {
  e && $e.postRender(() => e(t, r));
};
class Fte extends Wo {
  constructor() {
    super(...arguments), (this.removePointerDownListener = St);
  }
  onPointerDown(t) {
    this.session = new AM(t, this.createPanHandlers(), {
      transformPagePoint: this.node.getTransformPagePoint(),
      contextWindow: NM(this.node),
    });
  }
  createPanHandlers() {
    const {
      onPanSessionStart: t,
      onPanStart: r,
      onPan: n,
      onPanEnd: o,
    } = this.node.getProps();
    return {
      onSessionStart: nw(t),
      onStart: nw(r),
      onMove: n,
      onEnd: (a, s) => {
        delete this.session, o && $e.postRender(() => o(a, s));
      },
    };
  }
  mount() {
    this.removePointerDownListener = Sn(this.node.current, "pointerdown", (t) =>
      this.onPointerDown(t)
    );
  }
  update() {
    this.session && this.session.updateHandlers(this.createPanHandlers());
  }
  unmount() {
    this.removePointerDownListener(), this.session && this.session.end();
  }
}
function OM() {
  const e = g.useContext(Ii);
  if (e === null) return [!0, null];
  const { isPresent: t, onExitComplete: r, register: n } = e,
    o = g.useId();
  g.useEffect(() => n(o), []);
  const a = g.useCallback(() => r && r(o), [o, r]);
  return !t && r ? [!1, a] : [!0];
}
function jte() {
  return Dte(g.useContext(Ii));
}
function Dte(e) {
  return e === null ? !0 : e.isPresent;
}
const Gd = { hasAnimatedSinceResize: !0, hasEverUpdated: !1 };
function ow(e, t) {
  return t.max === t.min ? 0 : (e / (t.max - t.min)) * 100;
}
const fc = {
    correct: (e, t) => {
      if (!t.target) return e;
      if (typeof e == "string")
        if (me.test(e)) e = parseFloat(e);
        else return e;
      const r = ow(e, t.target.x),
        n = ow(e, t.target.y);
      return `${r}% ${n}%`;
    },
  },
  Nte = {
    correct: (e, { treeScale: t, projectionDelta: r }) => {
      const n = e,
        o = Qn.parse(e);
      if (o.length > 5) return n;
      const a = Qn.createTransformer(e),
        s = typeof o[0] != "number" ? 1 : 0,
        i = r.x.scale * t.x,
        c = r.y.scale * t.y;
      (o[0 + s] /= i), (o[1 + s] /= c);
      const l = Ke(i, c, 0.5);
      return (
        typeof o[2 + s] == "number" && (o[2 + s] /= l),
        typeof o[3 + s] == "number" && (o[3 + s] /= l),
        a(o)
      );
    },
  };
class Ote extends g.Component {
  componentDidMount() {
    const {
        visualElement: t,
        layoutGroup: r,
        switchLayoutGroup: n,
        layoutId: o,
      } = this.props,
      { projection: a } = t;
    wE(Bte),
      a &&
        (r.group && r.group.add(a),
        n && n.register && o && n.register(a),
        a.root.didUpdate(),
        a.addEventListener("animationComplete", () => {
          this.safeToRemove();
        }),
        a.setOptions({
          ...a.options,
          onExitComplete: () => this.safeToRemove(),
        })),
      (Gd.hasEverUpdated = !0);
  }
  getSnapshotBeforeUpdate(t) {
    const {
        layoutDependency: r,
        visualElement: n,
        drag: o,
        isPresent: a,
      } = this.props,
      s = n.projection;
    return (
      s &&
        ((s.isPresent = a),
        o || t.layoutDependency !== r || r === void 0
          ? s.willUpdate()
          : this.safeToRemove(),
        t.isPresent !== a &&
          (a
            ? s.promote()
            : s.relegate() ||
              $e.postRender(() => {
                const i = s.getStack();
                (!i || !i.members.length) && this.safeToRemove();
              }))),
      null
    );
  }
  componentDidUpdate() {
    const { projection: t } = this.props.visualElement;
    t &&
      (t.root.didUpdate(),
      Ub.postRender(() => {
        !t.currentAnimation && t.isLead() && this.safeToRemove();
      }));
  }
  componentWillUnmount() {
    const {
        visualElement: t,
        layoutGroup: r,
        switchLayoutGroup: n,
      } = this.props,
      { projection: o } = t;
    o &&
      (o.scheduleCheckAfterUnmount(),
      r && r.group && r.group.remove(o),
      n && n.deregister && n.deregister(o));
  }
  safeToRemove() {
    const { safeToRemove: t } = this.props;
    t && t();
  }
  render() {
    return null;
  }
}
function BM(e) {
  const [t, r] = OM(),
    n = g.useContext(ni);
  return P.jsx(Ote, {
    ...e,
    layoutGroup: n,
    switchLayoutGroup: g.useContext(Kb),
    isPresent: t,
    safeToRemove: r,
  });
}
const Bte = {
    borderRadius: {
      ...fc,
      applyTo: [
        "borderTopLeftRadius",
        "borderTopRightRadius",
        "borderBottomLeftRadius",
        "borderBottomRightRadius",
      ],
    },
    borderTopLeftRadius: fc,
    borderTopRightRadius: fc,
    borderBottomLeftRadius: fc,
    borderBottomRightRadius: fc,
    boxShadow: Nte,
  },
  LM = ["TopLeft", "TopRight", "BottomLeft", "BottomRight"],
  Lte = LM.length,
  aw = (e) => (typeof e == "string" ? parseFloat(e) : e),
  sw = (e) => typeof e == "number" || me.test(e);
function Vte(e, t, r, n, o, a) {
  o
    ? ((e.opacity = Ke(0, r.opacity !== void 0 ? r.opacity : 1, zte(n))),
      (e.opacityExit = Ke(t.opacity !== void 0 ? t.opacity : 1, 0, Hte(n))))
    : a &&
      (e.opacity = Ke(
        t.opacity !== void 0 ? t.opacity : 1,
        r.opacity !== void 0 ? r.opacity : 1,
        n
      ));
  for (let s = 0; s < Lte; s++) {
    const i = `border${LM[s]}Radius`;
    let c = iw(t, i),
      l = iw(r, i);
    if (c === void 0 && l === void 0) continue;
    c || (c = 0),
      l || (l = 0),
      c === 0 || l === 0 || sw(c) === sw(l)
        ? ((e[i] = Math.max(Ke(aw(c), aw(l), n), 0)),
          (bn.test(l) || bn.test(c)) && (e[i] += "%"))
        : (e[i] = l);
  }
  (t.rotate || r.rotate) && (e.rotate = Ke(t.rotate || 0, r.rotate || 0, n));
}
function iw(e, t) {
  return e[t] !== void 0 ? e[t] : e.borderRadius;
}
const zte = VM(0, 0.5, g0),
  Hte = VM(0.5, 0.95, St);
function VM(e, t, r) {
  return (n) => (n < e ? 0 : n > t ? 1 : r(Do(e, t, n)));
}
function cw(e, t) {
  (e.min = t.min), (e.max = t.max);
}
function kr(e, t) {
  cw(e.x, t.x), cw(e.y, t.y);
}
function lw(e, t) {
  (e.translate = t.translate),
    (e.scale = t.scale),
    (e.originPoint = t.originPoint),
    (e.origin = t.origin);
}
function uw(e, t, r, n, o) {
  return (
    (e -= t), (e = xf(e, 1 / r, n)), o !== void 0 && (e = xf(e, 1 / o, n)), e
  );
}
function Wte(e, t = 0, r = 1, n = 0.5, o, a = e, s = e) {
  if (
    (bn.test(t) &&
      ((t = parseFloat(t)), (t = Ke(s.min, s.max, t / 100) - s.min)),
    typeof t != "number")
  )
    return;
  let i = Ke(a.min, a.max, n);
  e === a && (i -= t),
    (e.min = uw(e.min, t, r, i, o)),
    (e.max = uw(e.max, t, r, i, o));
}
function dw(e, t, [r, n, o], a, s) {
  Wte(e, t[r], t[n], t[o], t.scale, a, s);
}
const Gte = ["x", "scaleX", "originX"],
  Ute = ["y", "scaleY", "originY"];
function fw(e, t, r, n) {
  dw(e.x, t, Gte, r ? r.x : void 0, n ? n.x : void 0),
    dw(e.y, t, Ute, r ? r.y : void 0, n ? n.y : void 0);
}
function mw(e) {
  return e.translate === 0 && e.scale === 1;
}
function zM(e) {
  return mw(e.x) && mw(e.y);
}
function hw(e, t) {
  return e.min === t.min && e.max === t.max;
}
function Kte(e, t) {
  return hw(e.x, t.x) && hw(e.y, t.y);
}
function pw(e, t) {
  return (
    Math.round(e.min) === Math.round(t.min) &&
    Math.round(e.max) === Math.round(t.max)
  );
}
function HM(e, t) {
  return pw(e.x, t.x) && pw(e.y, t.y);
}
function vw(e) {
  return er(e.x) / er(e.y);
}
function yw(e, t) {
  return (
    e.translate === t.translate &&
    e.scale === t.scale &&
    e.originPoint === t.originPoint
  );
}
class qte {
  constructor() {
    this.members = [];
  }
  add(t) {
    gm(this.members, t), t.scheduleRender();
  }
  remove(t) {
    if (
      (Hl(this.members, t),
      t === this.prevLead && (this.prevLead = void 0),
      t === this.lead)
    ) {
      const r = this.members[this.members.length - 1];
      r && this.promote(r);
    }
  }
  relegate(t) {
    const r = this.members.findIndex((o) => t === o);
    if (r === 0) return !1;
    let n;
    for (let o = r; o >= 0; o--) {
      const a = this.members[o];
      if (a.isPresent !== !1) {
        n = a;
        break;
      }
    }
    return n ? (this.promote(n), !0) : !1;
  }
  promote(t, r) {
    const n = this.lead;
    if (t !== n && ((this.prevLead = n), (this.lead = t), t.show(), n)) {
      n.instance && n.scheduleRender(),
        t.scheduleRender(),
        (t.resumeFrom = n),
        r && (t.resumeFrom.preserveOpacity = !0),
        n.snapshot &&
          ((t.snapshot = n.snapshot),
          (t.snapshot.latestValues = n.animationValues || n.latestValues)),
        t.root && t.root.isUpdating && (t.isLayoutDirty = !0);
      const { crossfade: o } = t.options;
      o === !1 && n.hide();
    }
  }
  exitAnimationComplete() {
    this.members.forEach((t) => {
      const { options: r, resumingFrom: n } = t;
      r.onExitComplete && r.onExitComplete(),
        n && n.options.onExitComplete && n.options.onExitComplete();
    });
  }
  scheduleRender() {
    this.members.forEach((t) => {
      t.instance && t.scheduleRender(!1);
    });
  }
  removeLeadSnapshot() {
    this.lead && this.lead.snapshot && (this.lead.snapshot = void 0);
  }
}
function Xte(e, t, r) {
  let n = "";
  const o = e.x.translate / t.x,
    a = e.y.translate / t.y,
    s = (r == null ? void 0 : r.z) || 0;
  if (
    ((o || a || s) && (n = `translate3d(${o}px, ${a}px, ${s}px) `),
    (t.x !== 1 || t.y !== 1) && (n += `scale(${1 / t.x}, ${1 / t.y}) `),
    r)
  ) {
    const {
      transformPerspective: l,
      rotate: u,
      rotateX: d,
      rotateY: f,
      skewX: m,
      skewY: h,
    } = r;
    l && (n = `perspective(${l}px) ${n}`),
      u && (n += `rotate(${u}deg) `),
      d && (n += `rotateX(${d}deg) `),
      f && (n += `rotateY(${f}deg) `),
      m && (n += `skewX(${m}deg) `),
      h && (n += `skewY(${h}deg) `);
  }
  const i = e.x.scale * t.x,
    c = e.y.scale * t.y;
  return (i !== 1 || c !== 1) && (n += `scale(${i}, ${c})`), n || "none";
}
const Yte = (e, t) => e.depth - t.depth;
class WM {
  constructor() {
    (this.children = []), (this.isDirty = !1);
  }
  add(t) {
    gm(this.children, t), (this.isDirty = !0);
  }
  remove(t) {
    Hl(this.children, t), (this.isDirty = !0);
  }
  forEach(t) {
    this.isDirty && this.children.sort(Yte),
      (this.isDirty = !1),
      this.children.forEach(t);
  }
}
function GM(e, t) {
  const r = Io.now(),
    n = ({ timestamp: o }) => {
      const a = o - r;
      a >= t && (Jt(n), e(a - t));
    };
  return $e.read(n, !0), () => Jt(n);
}
function UM(e) {
  return e instanceof SVGElement && e.tagName !== "svg";
}
function _0(e, t, r) {
  const n = Xe(e) ? e : Zr(e);
  return n.start(k0("", n, t, r)), n.animation;
}
const ua = {
    type: "projectionFrame",
    totalNodes: 0,
    resolvedTargetDeltas: 0,
    recalculatedProjection: 0,
  },
  _c = typeof window < "u" && window.MotionDebug !== void 0,
  qp = ["", "X", "Y", "Z"],
  Zte = { visibility: "hidden" },
  gw = 1e3;
let Qte = 0;
function Xp(e, t, r, n) {
  const { latestValues: o } = t;
  o[e] && ((r[e] = o[e]), t.setStaticValue(e, 0), n && (n[e] = 0));
}
function KM(e) {
  if (((e.hasCheckedOptimisedAppear = !0), e.root === e)) return !1;
  const { visualElement: t } = e.options;
  return t
    ? TM(t)
      ? !0
      : e.parent && !e.parent.hasCheckedOptimisedAppear
      ? KM(e.parent)
      : !1
    : !1;
}
function qM({
  attachResizeListener: e,
  defaultParent: t,
  measureScroll: r,
  checkIsScrollRoot: n,
  resetTransform: o,
}) {
  return class {
    constructor(s = {}, i = t == null ? void 0 : t()) {
      (this.id = Qte++),
        (this.animationId = 0),
        (this.children = new Set()),
        (this.options = {}),
        (this.isTreeAnimating = !1),
        (this.isAnimationBlocked = !1),
        (this.isLayoutDirty = !1),
        (this.isProjectionDirty = !1),
        (this.isSharedProjectionDirty = !1),
        (this.isTransformDirty = !1),
        (this.updateManuallyBlocked = !1),
        (this.updateBlockedByResize = !1),
        (this.isUpdating = !1),
        (this.isSVG = !1),
        (this.needsReset = !1),
        (this.shouldResetTransform = !1),
        (this.hasCheckedOptimisedAppear = !1),
        (this.treeScale = { x: 1, y: 1 }),
        (this.eventHandlers = new Map()),
        (this.hasTreeAnimated = !1),
        (this.updateScheduled = !1),
        (this.scheduleUpdate = () => this.update()),
        (this.projectionUpdateScheduled = !1),
        (this.checkUpdateFailed = () => {
          this.isUpdating && ((this.isUpdating = !1), this.clearAllSnapshots());
        }),
        (this.updateProjection = () => {
          (this.projectionUpdateScheduled = !1),
            _c &&
              (ua.totalNodes =
                ua.resolvedTargetDeltas =
                ua.recalculatedProjection =
                  0),
            this.nodes.forEach(tre),
            this.nodes.forEach(sre),
            this.nodes.forEach(ire),
            this.nodes.forEach(rre),
            _c && window.MotionDebug.record(ua);
        }),
        (this.resolvedRelativeTargetAt = 0),
        (this.hasProjected = !1),
        (this.isVisible = !0),
        (this.animationProgress = 0),
        (this.sharedNodes = new Map()),
        (this.latestValues = s),
        (this.root = i ? i.root || i : this),
        (this.path = i ? [...i.path, i] : []),
        (this.parent = i),
        (this.depth = i ? i.depth + 1 : 0);
      for (let c = 0; c < this.path.length; c++)
        this.path[c].shouldResetTransform = !0;
      this.root === this && (this.nodes = new WM());
    }
    addEventListener(s, i) {
      return (
        this.eventHandlers.has(s) || this.eventHandlers.set(s, new T0()),
        this.eventHandlers.get(s).add(i)
      );
    }
    notifyListeners(s, ...i) {
      const c = this.eventHandlers.get(s);
      c && c.notify(...i);
    }
    hasListeners(s) {
      return this.eventHandlers.has(s);
    }
    mount(s, i = this.root.hasTreeAnimated) {
      if (this.instance) return;
      (this.isSVG = UM(s)), (this.instance = s);
      const { layoutId: c, layout: l, visualElement: u } = this.options;
      if (
        (u && !u.current && u.mount(s),
        this.root.nodes.add(this),
        this.parent && this.parent.children.add(this),
        i && (l || c) && (this.isLayoutDirty = !0),
        e)
      ) {
        let d;
        const f = () => (this.root.updateBlockedByResize = !1);
        e(s, () => {
          (this.root.updateBlockedByResize = !0),
            d && d(),
            (d = GM(f, 250)),
            Gd.hasAnimatedSinceResize &&
              ((Gd.hasAnimatedSinceResize = !1), this.nodes.forEach(Sw));
        });
      }
      c && this.root.registerSharedNode(c, this),
        this.options.animate !== !1 &&
          u &&
          (c || l) &&
          this.addEventListener(
            "didUpdate",
            ({
              delta: d,
              hasLayoutChanged: f,
              hasRelativeTargetChanged: m,
              layout: h,
            }) => {
              if (this.isTreeAnimationBlocked()) {
                (this.target = void 0), (this.relativeTarget = void 0);
                return;
              }
              const p =
                  this.options.transition || u.getDefaultTransition() || fre,
                { onLayoutAnimationStart: v, onLayoutAnimationComplete: b } =
                  u.getProps(),
                y = !this.targetLayout || !HM(this.targetLayout, h) || m,
                S = !f && m;
              if (
                this.options.layoutRoot ||
                (this.resumeFrom && this.resumeFrom.instance) ||
                S ||
                (f && (y || !this.currentAnimation))
              ) {
                this.resumeFrom &&
                  ((this.resumingFrom = this.resumeFrom),
                  (this.resumingFrom.resumingFrom = void 0)),
                  this.setAnimationOrigin(d, S);
                const w = { ...u0(p, "layout"), onPlay: v, onComplete: b };
                (u.shouldReduceMotion || this.options.layoutRoot) &&
                  ((w.delay = 0), (w.type = !1)),
                  this.startAnimation(w);
              } else
                f || Sw(this),
                  this.isLead() &&
                    this.options.onExitComplete &&
                    this.options.onExitComplete();
              this.targetLayout = h;
            }
          );
    }
    unmount() {
      this.options.layoutId && this.willUpdate(), this.root.nodes.remove(this);
      const s = this.getStack();
      s && s.remove(this),
        this.parent && this.parent.children.delete(this),
        (this.instance = void 0),
        Jt(this.updateProjection);
    }
    blockUpdate() {
      this.updateManuallyBlocked = !0;
    }
    unblockUpdate() {
      this.updateManuallyBlocked = !1;
    }
    isUpdateBlocked() {
      return this.updateManuallyBlocked || this.updateBlockedByResize;
    }
    isTreeAnimationBlocked() {
      return (
        this.isAnimationBlocked ||
        (this.parent && this.parent.isTreeAnimationBlocked()) ||
        !1
      );
    }
    startUpdate() {
      this.isUpdateBlocked() ||
        ((this.isUpdating = !0),
        this.nodes && this.nodes.forEach(cre),
        this.animationId++);
    }
    getTransformTemplate() {
      const { visualElement: s } = this.options;
      return s && s.getProps().transformTemplate;
    }
    willUpdate(s = !0) {
      if (((this.root.hasTreeAnimated = !0), this.root.isUpdateBlocked())) {
        this.options.onExitComplete && this.options.onExitComplete();
        return;
      }
      if (
        (window.HandoffCancelAllAnimations &&
          KM(this) &&
          window.HandoffCancelAllAnimations(),
        !this.root.isUpdating && this.root.startUpdate(),
        this.isLayoutDirty)
      )
        return;
      this.isLayoutDirty = !0;
      for (let u = 0; u < this.path.length; u++) {
        const d = this.path[u];
        (d.shouldResetTransform = !0),
          d.updateScroll("snapshot"),
          d.options.layoutRoot && d.willUpdate(!1);
      }
      const { layoutId: i, layout: c } = this.options;
      if (i === void 0 && !c) return;
      const l = this.getTransformTemplate();
      (this.prevTransformTemplateValue = l ? l(this.latestValues, "") : void 0),
        this.updateSnapshot(),
        s && this.notifyListeners("willUpdate");
    }
    update() {
      if (((this.updateScheduled = !1), this.isUpdateBlocked())) {
        this.unblockUpdate(), this.clearAllSnapshots(), this.nodes.forEach(bw);
        return;
      }
      this.isUpdating || this.nodes.forEach(ore),
        (this.isUpdating = !1),
        this.nodes.forEach(are),
        this.nodes.forEach(Jte),
        this.nodes.forEach(ere),
        this.clearAllSnapshots();
      const i = Io.now();
      (it.delta = Zn(0, 1e3 / 60, i - it.timestamp)),
        (it.timestamp = i),
        (it.isProcessing = !0),
        Hd.update.process(it),
        Hd.preRender.process(it),
        Hd.render.process(it),
        (it.isProcessing = !1);
    }
    didUpdate() {
      this.updateScheduled ||
        ((this.updateScheduled = !0), Ub.read(this.scheduleUpdate));
    }
    clearAllSnapshots() {
      this.nodes.forEach(nre), this.sharedNodes.forEach(lre);
    }
    scheduleUpdateProjection() {
      this.projectionUpdateScheduled ||
        ((this.projectionUpdateScheduled = !0),
        $e.preRender(this.updateProjection, !1, !0));
    }
    scheduleCheckAfterUnmount() {
      $e.postRender(() => {
        this.isLayoutDirty
          ? this.root.didUpdate()
          : this.root.checkUpdateFailed();
      });
    }
    updateSnapshot() {
      this.snapshot || !this.instance || (this.snapshot = this.measure());
    }
    updateLayout() {
      if (
        !this.instance ||
        (this.updateScroll(),
        !(this.options.alwaysMeasureLayout && this.isLead()) &&
          !this.isLayoutDirty)
      )
        return;
      if (this.resumeFrom && !this.resumeFrom.instance)
        for (let c = 0; c < this.path.length; c++) this.path[c].updateScroll();
      const s = this.layout;
      (this.layout = this.measure(!1)),
        (this.layoutCorrected = Qe()),
        (this.isLayoutDirty = !1),
        (this.projectionDelta = void 0),
        this.notifyListeners("measure", this.layout.layoutBox);
      const { visualElement: i } = this.options;
      i &&
        i.notify(
          "LayoutMeasure",
          this.layout.layoutBox,
          s ? s.layoutBox : void 0
        );
    }
    updateScroll(s = "measure") {
      let i = !!(this.options.layoutScroll && this.instance);
      if (
        (this.scroll &&
          this.scroll.animationId === this.root.animationId &&
          this.scroll.phase === s &&
          (i = !1),
        i)
      ) {
        const c = n(this.instance);
        this.scroll = {
          animationId: this.root.animationId,
          phase: s,
          isRoot: c,
          offset: r(this.instance),
          wasRoot: this.scroll ? this.scroll.isRoot : c,
        };
      }
    }
    resetTransform() {
      if (!o) return;
      const s =
          this.isLayoutDirty ||
          this.shouldResetTransform ||
          this.options.alwaysMeasureLayout,
        i = this.projectionDelta && !zM(this.projectionDelta),
        c = this.getTransformTemplate(),
        l = c ? c(this.latestValues, "") : void 0,
        u = l !== this.prevTransformTemplateValue;
      s &&
        (i || la(this.latestValues) || u) &&
        (o(this.instance, l),
        (this.shouldResetTransform = !1),
        this.scheduleRender());
    }
    measure(s = !0) {
      const i = this.measurePageBox();
      let c = this.removeElementScroll(i);
      return (
        s && (c = this.removeTransform(c)),
        mre(c),
        {
          animationId: this.root.animationId,
          measuredBox: i,
          layoutBox: c,
          latestValues: {},
          source: this.id,
        }
      );
    }
    measurePageBox() {
      var s;
      const { visualElement: i } = this.options;
      if (!i) return Qe();
      const c = i.measureViewportBox();
      if (
        !(
          ((s = this.scroll) === null || s === void 0 ? void 0 : s.wasRoot) ||
          this.path.some(hre)
        )
      ) {
        const { scroll: u } = this.root;
        u && (Ds(c.x, u.offset.x), Ds(c.y, u.offset.y));
      }
      return c;
    }
    removeElementScroll(s) {
      var i;
      const c = Qe();
      if (
        (kr(c, s), !((i = this.scroll) === null || i === void 0) && i.wasRoot)
      )
        return c;
      for (let l = 0; l < this.path.length; l++) {
        const u = this.path[l],
          { scroll: d, options: f } = u;
        u !== this.root &&
          d &&
          f.layoutScroll &&
          (d.wasRoot && kr(c, s), Ds(c.x, d.offset.x), Ds(c.y, d.offset.y));
      }
      return c;
    }
    applyTransform(s, i = !1) {
      const c = Qe();
      kr(c, s);
      for (let l = 0; l < this.path.length; l++) {
        const u = this.path[l];
        !i &&
          u.options.layoutScroll &&
          u.scroll &&
          u !== u.root &&
          Ns(c, { x: -u.scroll.offset.x, y: -u.scroll.offset.y }),
          la(u.latestValues) && Ns(c, u.latestValues);
      }
      return la(this.latestValues) && Ns(c, this.latestValues), c;
    }
    removeTransform(s) {
      const i = Qe();
      kr(i, s);
      for (let c = 0; c < this.path.length; c++) {
        const l = this.path[c];
        if (!l.instance || !la(l.latestValues)) continue;
        jy(l.latestValues) && l.updateSnapshot();
        const u = Qe(),
          d = l.measurePageBox();
        kr(u, d),
          fw(i, l.latestValues, l.snapshot ? l.snapshot.layoutBox : void 0, u);
      }
      return la(this.latestValues) && fw(i, this.latestValues), i;
    }
    setTargetDelta(s) {
      (this.targetDelta = s),
        this.root.scheduleUpdateProjection(),
        (this.isProjectionDirty = !0);
    }
    setOptions(s) {
      this.options = {
        ...this.options,
        ...s,
        crossfade: s.crossfade !== void 0 ? s.crossfade : !0,
      };
    }
    clearMeasurements() {
      (this.scroll = void 0),
        (this.layout = void 0),
        (this.snapshot = void 0),
        (this.prevTransformTemplateValue = void 0),
        (this.targetDelta = void 0),
        (this.target = void 0),
        (this.isLayoutDirty = !1);
    }
    forceRelativeParentToResolveTarget() {
      this.relativeParent &&
        this.relativeParent.resolvedRelativeTargetAt !== it.timestamp &&
        this.relativeParent.resolveTargetDelta(!0);
    }
    resolveTargetDelta(s = !1) {
      var i;
      const c = this.getLead();
      this.isProjectionDirty || (this.isProjectionDirty = c.isProjectionDirty),
        this.isTransformDirty || (this.isTransformDirty = c.isTransformDirty),
        this.isSharedProjectionDirty ||
          (this.isSharedProjectionDirty = c.isSharedProjectionDirty);
      const l = !!this.resumingFrom || this !== c;
      if (
        !(
          s ||
          (l && this.isSharedProjectionDirty) ||
          this.isProjectionDirty ||
          (!((i = this.parent) === null || i === void 0) &&
            i.isProjectionDirty) ||
          this.attemptToResolveRelativeTarget ||
          this.root.updateBlockedByResize
        )
      )
        return;
      const { layout: d, layoutId: f } = this.options;
      if (!(!this.layout || !(d || f))) {
        if (
          ((this.resolvedRelativeTargetAt = it.timestamp),
          !this.targetDelta && !this.relativeTarget)
        ) {
          const m = this.getClosestProjectingParent();
          m && m.layout && this.animationProgress !== 1
            ? ((this.relativeParent = m),
              this.forceRelativeParentToResolveTarget(),
              (this.relativeTarget = Qe()),
              (this.relativeTargetOrigin = Qe()),
              Gc(
                this.relativeTargetOrigin,
                this.layout.layoutBox,
                m.layout.layoutBox
              ),
              kr(this.relativeTarget, this.relativeTargetOrigin))
            : (this.relativeParent = this.relativeTarget = void 0);
        }
        if (!(!this.relativeTarget && !this.targetDelta)) {
          if (
            (this.target ||
              ((this.target = Qe()), (this.targetWithTransforms = Qe())),
            this.relativeTarget &&
            this.relativeTargetOrigin &&
            this.relativeParent &&
            this.relativeParent.target
              ? (this.forceRelativeParentToResolveTarget(),
                bte(
                  this.target,
                  this.relativeTarget,
                  this.relativeParent.target
                ))
              : this.targetDelta
              ? (this.resumingFrom
                  ? (this.target = this.applyTransform(this.layout.layoutBox))
                  : kr(this.target, this.layout.layoutBox),
                jM(this.target, this.targetDelta))
              : kr(this.target, this.layout.layoutBox),
            this.attemptToResolveRelativeTarget)
          ) {
            this.attemptToResolveRelativeTarget = !1;
            const m = this.getClosestProjectingParent();
            m &&
            !!m.resumingFrom == !!this.resumingFrom &&
            !m.options.layoutScroll &&
            m.target &&
            this.animationProgress !== 1
              ? ((this.relativeParent = m),
                this.forceRelativeParentToResolveTarget(),
                (this.relativeTarget = Qe()),
                (this.relativeTargetOrigin = Qe()),
                Gc(this.relativeTargetOrigin, this.target, m.target),
                kr(this.relativeTarget, this.relativeTargetOrigin))
              : (this.relativeParent = this.relativeTarget = void 0);
          }
          _c && ua.resolvedTargetDeltas++;
        }
      }
    }
    getClosestProjectingParent() {
      if (
        !(
          !this.parent ||
          jy(this.parent.latestValues) ||
          FM(this.parent.latestValues)
        )
      )
        return this.parent.isProjecting()
          ? this.parent
          : this.parent.getClosestProjectingParent();
    }
    isProjecting() {
      return !!(
        (this.relativeTarget || this.targetDelta || this.options.layoutRoot) &&
        this.layout
      );
    }
    calcProjection() {
      var s;
      const i = this.getLead(),
        c = !!this.resumingFrom || this !== i;
      let l = !0;
      if (
        ((this.isProjectionDirty ||
          (!((s = this.parent) === null || s === void 0) &&
            s.isProjectionDirty)) &&
          (l = !1),
        c &&
          (this.isSharedProjectionDirty || this.isTransformDirty) &&
          (l = !1),
        this.resolvedRelativeTargetAt === it.timestamp && (l = !1),
        l)
      )
        return;
      const { layout: u, layoutId: d } = this.options;
      if (
        ((this.isTreeAnimating = !!(
          (this.parent && this.parent.isTreeAnimating) ||
          this.currentAnimation ||
          this.pendingAnimation
        )),
        this.isTreeAnimating ||
          (this.targetDelta = this.relativeTarget = void 0),
        !this.layout || !(u || d))
      )
        return;
      kr(this.layoutCorrected, this.layout.layoutBox);
      const f = this.treeScale.x,
        m = this.treeScale.y;
      Rte(this.layoutCorrected, this.treeScale, this.path, c),
        i.layout &&
          !i.target &&
          (this.treeScale.x !== 1 || this.treeScale.y !== 1) &&
          ((i.target = i.layout.layoutBox), (i.targetWithTransforms = Qe()));
      const { target: h } = i;
      if (!h) {
        this.prevProjectionDelta &&
          (this.createProjectionDeltas(), this.scheduleRender());
        return;
      }
      !this.projectionDelta || !this.prevProjectionDelta
        ? this.createProjectionDeltas()
        : (lw(this.prevProjectionDelta.x, this.projectionDelta.x),
          lw(this.prevProjectionDelta.y, this.projectionDelta.y)),
        Wc(this.projectionDelta, this.layoutCorrected, h, this.latestValues),
        (this.treeScale.x !== f ||
          this.treeScale.y !== m ||
          !yw(this.projectionDelta.x, this.prevProjectionDelta.x) ||
          !yw(this.projectionDelta.y, this.prevProjectionDelta.y)) &&
          ((this.hasProjected = !0),
          this.scheduleRender(),
          this.notifyListeners("projectionUpdate", h)),
        _c && ua.recalculatedProjection++;
    }
    hide() {
      this.isVisible = !1;
    }
    show() {
      this.isVisible = !0;
    }
    scheduleRender(s = !0) {
      var i;
      if (
        ((i = this.options.visualElement) === null ||
          i === void 0 ||
          i.scheduleRender(),
        s)
      ) {
        const c = this.getStack();
        c && c.scheduleRender();
      }
      this.resumingFrom &&
        !this.resumingFrom.instance &&
        (this.resumingFrom = void 0);
    }
    createProjectionDeltas() {
      (this.prevProjectionDelta = js()),
        (this.projectionDelta = js()),
        (this.projectionDeltaWithTransform = js());
    }
    setAnimationOrigin(s, i = !1) {
      const c = this.snapshot,
        l = c ? c.latestValues : {},
        u = { ...this.latestValues },
        d = js();
      (!this.relativeParent || !this.relativeParent.options.layoutRoot) &&
        (this.relativeTarget = this.relativeTargetOrigin = void 0),
        (this.attemptToResolveRelativeTarget = !i);
      const f = Qe(),
        m = c ? c.source : void 0,
        h = this.layout ? this.layout.source : void 0,
        p = m !== h,
        v = this.getStack(),
        b = !v || v.members.length <= 1,
        y = !!(
          p &&
          !b &&
          this.options.crossfade === !0 &&
          !this.path.some(dre)
        );
      this.animationProgress = 0;
      let S;
      (this.mixTargetDelta = (w) => {
        const C = w / 1e3;
        xw(d.x, s.x, C),
          xw(d.y, s.y, C),
          this.setTargetDelta(d),
          this.relativeTarget &&
            this.relativeTargetOrigin &&
            this.layout &&
            this.relativeParent &&
            this.relativeParent.layout &&
            (Gc(f, this.layout.layoutBox, this.relativeParent.layout.layoutBox),
            ure(this.relativeTarget, this.relativeTargetOrigin, f, C),
            S && Kte(this.relativeTarget, S) && (this.isProjectionDirty = !1),
            S || (S = Qe()),
            kr(S, this.relativeTarget)),
          p &&
            ((this.animationValues = u), Vte(u, l, this.latestValues, C, y, b)),
          this.root.scheduleUpdateProjection(),
          this.scheduleRender(),
          (this.animationProgress = C);
      }),
        this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0);
    }
    startAnimation(s) {
      this.notifyListeners("animationStart"),
        this.currentAnimation && this.currentAnimation.stop(),
        this.resumingFrom &&
          this.resumingFrom.currentAnimation &&
          this.resumingFrom.currentAnimation.stop(),
        this.pendingAnimation &&
          (Jt(this.pendingAnimation), (this.pendingAnimation = void 0)),
        (this.pendingAnimation = $e.update(() => {
          (Gd.hasAnimatedSinceResize = !0),
            (this.currentAnimation = _0(0, gw, {
              ...s,
              onUpdate: (i) => {
                this.mixTargetDelta(i), s.onUpdate && s.onUpdate(i);
              },
              onComplete: () => {
                s.onComplete && s.onComplete(), this.completeAnimation();
              },
            })),
            this.resumingFrom &&
              (this.resumingFrom.currentAnimation = this.currentAnimation),
            (this.pendingAnimation = void 0);
        }));
    }
    completeAnimation() {
      this.resumingFrom &&
        ((this.resumingFrom.currentAnimation = void 0),
        (this.resumingFrom.preserveOpacity = void 0));
      const s = this.getStack();
      s && s.exitAnimationComplete(),
        (this.resumingFrom =
          this.currentAnimation =
          this.animationValues =
            void 0),
        this.notifyListeners("animationComplete");
    }
    finishAnimation() {
      this.currentAnimation &&
        (this.mixTargetDelta && this.mixTargetDelta(gw),
        this.currentAnimation.stop()),
        this.completeAnimation();
    }
    applyTransformsToTarget() {
      const s = this.getLead();
      let {
        targetWithTransforms: i,
        target: c,
        layout: l,
        latestValues: u,
      } = s;
      if (!(!i || !c || !l)) {
        if (
          this !== s &&
          this.layout &&
          l &&
          XM(this.options.animationType, this.layout.layoutBox, l.layoutBox)
        ) {
          c = this.target || Qe();
          const d = er(this.layout.layoutBox.x);
          (c.x.min = s.target.x.min), (c.x.max = c.x.min + d);
          const f = er(this.layout.layoutBox.y);
          (c.y.min = s.target.y.min), (c.y.max = c.y.min + f);
        }
        kr(i, c),
          Ns(i, u),
          Wc(this.projectionDeltaWithTransform, this.layoutCorrected, i, u);
      }
    }
    registerSharedNode(s, i) {
      this.sharedNodes.has(s) || this.sharedNodes.set(s, new qte()),
        this.sharedNodes.get(s).add(i);
      const l = i.options.initialPromotionConfig;
      i.promote({
        transition: l ? l.transition : void 0,
        preserveFollowOpacity:
          l && l.shouldPreserveFollowOpacity
            ? l.shouldPreserveFollowOpacity(i)
            : void 0,
      });
    }
    isLead() {
      const s = this.getStack();
      return s ? s.lead === this : !0;
    }
    getLead() {
      var s;
      const { layoutId: i } = this.options;
      return i
        ? ((s = this.getStack()) === null || s === void 0 ? void 0 : s.lead) ||
            this
        : this;
    }
    getPrevLead() {
      var s;
      const { layoutId: i } = this.options;
      return i
        ? (s = this.getStack()) === null || s === void 0
          ? void 0
          : s.prevLead
        : void 0;
    }
    getStack() {
      const { layoutId: s } = this.options;
      if (s) return this.root.sharedNodes.get(s);
    }
    promote({ needsReset: s, transition: i, preserveFollowOpacity: c } = {}) {
      const l = this.getStack();
      l && l.promote(this, c),
        s && ((this.projectionDelta = void 0), (this.needsReset = !0)),
        i && this.setOptions({ transition: i });
    }
    relegate() {
      const s = this.getStack();
      return s ? s.relegate(this) : !1;
    }
    resetSkewAndRotation() {
      const { visualElement: s } = this.options;
      if (!s) return;
      let i = !1;
      const { latestValues: c } = s;
      if (
        ((c.z ||
          c.rotate ||
          c.rotateX ||
          c.rotateY ||
          c.rotateZ ||
          c.skewX ||
          c.skewY) &&
          (i = !0),
        !i)
      )
        return;
      const l = {};
      c.z && Xp("z", s, l, this.animationValues);
      for (let u = 0; u < qp.length; u++)
        Xp(`rotate${qp[u]}`, s, l, this.animationValues),
          Xp(`skew${qp[u]}`, s, l, this.animationValues);
      s.render();
      for (const u in l)
        s.setStaticValue(u, l[u]),
          this.animationValues && (this.animationValues[u] = l[u]);
      s.scheduleRender();
    }
    getProjectionStyles(s) {
      var i, c;
      if (!this.instance || this.isSVG) return;
      if (!this.isVisible) return Zte;
      const l = { visibility: "" },
        u = this.getTransformTemplate();
      if (this.needsReset)
        return (
          (this.needsReset = !1),
          (l.opacity = ""),
          (l.pointerEvents = zc(s == null ? void 0 : s.pointerEvents) || ""),
          (l.transform = u ? u(this.latestValues, "") : "none"),
          l
        );
      const d = this.getLead();
      if (!this.projectionDelta || !this.layout || !d.target) {
        const p = {};
        return (
          this.options.layoutId &&
            ((p.opacity =
              this.latestValues.opacity !== void 0
                ? this.latestValues.opacity
                : 1),
            (p.pointerEvents = zc(s == null ? void 0 : s.pointerEvents) || "")),
          this.hasProjected &&
            !la(this.latestValues) &&
            ((p.transform = u ? u({}, "") : "none"), (this.hasProjected = !1)),
          p
        );
      }
      const f = d.animationValues || d.latestValues;
      this.applyTransformsToTarget(),
        (l.transform = Xte(
          this.projectionDeltaWithTransform,
          this.treeScale,
          f
        )),
        u && (l.transform = u(f, l.transform));
      const { x: m, y: h } = this.projectionDelta;
      (l.transformOrigin = `${m.origin * 100}% ${h.origin * 100}% 0`),
        d.animationValues
          ? (l.opacity =
              d === this
                ? (c =
                    (i = f.opacity) !== null && i !== void 0
                      ? i
                      : this.latestValues.opacity) !== null && c !== void 0
                  ? c
                  : 1
                : this.preserveOpacity
                ? this.latestValues.opacity
                : f.opacityExit)
          : (l.opacity =
              d === this
                ? f.opacity !== void 0
                  ? f.opacity
                  : ""
                : f.opacityExit !== void 0
                ? f.opacityExit
                : 0);
      for (const p in yf) {
        if (f[p] === void 0) continue;
        const { correct: v, applyTo: b } = yf[p],
          y = l.transform === "none" ? f[p] : v(f[p], d);
        if (b) {
          const S = b.length;
          for (let w = 0; w < S; w++) l[b[w]] = y;
        } else l[p] = y;
      }
      return (
        this.options.layoutId &&
          (l.pointerEvents =
            d === this
              ? zc(s == null ? void 0 : s.pointerEvents) || ""
              : "none"),
        l
      );
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0;
    }
    resetTree() {
      this.root.nodes.forEach((s) => {
        var i;
        return (i = s.currentAnimation) === null || i === void 0
          ? void 0
          : i.stop();
      }),
        this.root.nodes.forEach(bw),
        this.root.sharedNodes.clear();
    }
  };
}
function Jte(e) {
  e.updateLayout();
}
function ere(e) {
  var t;
  const r =
    ((t = e.resumeFrom) === null || t === void 0 ? void 0 : t.snapshot) ||
    e.snapshot;
  if (e.isLead() && e.layout && r && e.hasListeners("didUpdate")) {
    const { layoutBox: n, measuredBox: o } = e.layout,
      { animationType: a } = e.options,
      s = r.source !== e.layout.source;
    a === "size"
      ? _r((d) => {
          const f = s ? r.measuredBox[d] : r.layoutBox[d],
            m = er(f);
          (f.min = n[d].min), (f.max = f.min + m);
        })
      : XM(a, r.layoutBox, n) &&
        _r((d) => {
          const f = s ? r.measuredBox[d] : r.layoutBox[d],
            m = er(n[d]);
          (f.max = f.min + m),
            e.relativeTarget &&
              !e.currentAnimation &&
              ((e.isProjectionDirty = !0),
              (e.relativeTarget[d].max = e.relativeTarget[d].min + m));
        });
    const i = js();
    Wc(i, n, r.layoutBox);
    const c = js();
    s ? Wc(c, e.applyTransform(o, !0), r.measuredBox) : Wc(c, n, r.layoutBox);
    const l = !zM(i);
    let u = !1;
    if (!e.resumeFrom) {
      const d = e.getClosestProjectingParent();
      if (d && !d.resumeFrom) {
        const { snapshot: f, layout: m } = d;
        if (f && m) {
          const h = Qe();
          Gc(h, r.layoutBox, f.layoutBox);
          const p = Qe();
          Gc(p, n, m.layoutBox),
            HM(h, p) || (u = !0),
            d.options.layoutRoot &&
              ((e.relativeTarget = p),
              (e.relativeTargetOrigin = h),
              (e.relativeParent = d));
        }
      }
    }
    e.notifyListeners("didUpdate", {
      layout: n,
      snapshot: r,
      delta: c,
      layoutDelta: i,
      hasLayoutChanged: l,
      hasRelativeTargetChanged: u,
    });
  } else if (e.isLead()) {
    const { onExitComplete: n } = e.options;
    n && n();
  }
  e.options.transition = void 0;
}
function tre(e) {
  _c && ua.totalNodes++,
    e.parent &&
      (e.isProjecting() || (e.isProjectionDirty = e.parent.isProjectionDirty),
      e.isSharedProjectionDirty ||
        (e.isSharedProjectionDirty = !!(
          e.isProjectionDirty ||
          e.parent.isProjectionDirty ||
          e.parent.isSharedProjectionDirty
        )),
      e.isTransformDirty || (e.isTransformDirty = e.parent.isTransformDirty));
}
function rre(e) {
  e.isProjectionDirty = e.isSharedProjectionDirty = e.isTransformDirty = !1;
}
function nre(e) {
  e.clearSnapshot();
}
function bw(e) {
  e.clearMeasurements();
}
function ore(e) {
  e.isLayoutDirty = !1;
}
function are(e) {
  const { visualElement: t } = e.options;
  t && t.getProps().onBeforeLayoutMeasure && t.notify("BeforeLayoutMeasure"),
    e.resetTransform();
}
function Sw(e) {
  e.finishAnimation(),
    (e.targetDelta = e.relativeTarget = e.target = void 0),
    (e.isProjectionDirty = !0);
}
function sre(e) {
  e.resolveTargetDelta();
}
function ire(e) {
  e.calcProjection();
}
function cre(e) {
  e.resetSkewAndRotation();
}
function lre(e) {
  e.removeLeadSnapshot();
}
function xw(e, t, r) {
  (e.translate = Ke(t.translate, 0, r)),
    (e.scale = Ke(t.scale, 1, r)),
    (e.origin = t.origin),
    (e.originPoint = t.originPoint);
}
function $w(e, t, r, n) {
  (e.min = Ke(t.min, r.min, n)), (e.max = Ke(t.max, r.max, n));
}
function ure(e, t, r, n) {
  $w(e.x, t.x, r.x, n), $w(e.y, t.y, r.y, n);
}
function dre(e) {
  return e.animationValues && e.animationValues.opacityExit !== void 0;
}
const fre = { duration: 0.45, ease: [0.4, 0, 0.1, 1] },
  ww = (e) =>
    typeof navigator < "u" &&
    navigator.userAgent &&
    navigator.userAgent.toLowerCase().includes(e),
  Cw = ww("applewebkit/") && !ww("chrome/") ? Math.round : St;
function kw(e) {
  (e.min = Cw(e.min)), (e.max = Cw(e.max));
}
function mre(e) {
  kw(e.x), kw(e.y);
}
function XM(e, t, r) {
  return (
    e === "position" || (e === "preserve-aspect" && !gte(vw(t), vw(r), 0.2))
  );
}
function hre(e) {
  var t;
  return (
    e !== e.root &&
    ((t = e.scroll) === null || t === void 0 ? void 0 : t.wasRoot)
  );
}
const pre = qM({
    attachResizeListener: (e, t) => pn(e, "resize", t),
    measureScroll: () => ({
      x: document.documentElement.scrollLeft || document.body.scrollLeft,
      y: document.documentElement.scrollTop || document.body.scrollTop,
    }),
    checkIsScrollRoot: () => !0,
  }),
  xa = { current: void 0 },
  YM = qM({
    measureScroll: (e) => ({ x: e.scrollLeft, y: e.scrollTop }),
    defaultParent: () => {
      if (!xa.current) {
        const e = new pre({});
        e.mount(window), e.setOptions({ layoutScroll: !0 }), (xa.current = e);
      }
      return xa.current;
    },
    resetTransform: (e, t) => {
      e.style.transform = t !== void 0 ? t : "none";
    },
    checkIsScrollRoot: (e) => window.getComputedStyle(e).position === "fixed",
  }),
  ZM = {
    pan: { Feature: Fte },
    drag: { Feature: Mte, ProjectionNode: YM, MeasureLayout: BM },
  },
  $f = { current: null },
  I0 = { current: !1 };
function QM() {
  if (((I0.current = !0), !!hm))
    if (window.matchMedia) {
      const e = window.matchMedia("(prefers-reduced-motion)"),
        t = () => ($f.current = e.matches);
      e.addListener(t), t();
    } else $f.current = !1;
}
function vre(e, t, r) {
  for (const n in t) {
    const o = t[n],
      a = r[n];
    if (Xe(o)) e.addValue(n, o);
    else if (Xe(a)) e.addValue(n, Zr(o, { owner: e }));
    else if (a !== o)
      if (e.hasValue(n)) {
        const s = e.getValue(n);
        s.liveStyle === !0 ? s.jump(o) : s.hasAnimated || s.set(o);
      } else {
        const s = e.getStaticValue(n);
        e.addValue(n, Zr(s !== void 0 ? s : o, { owner: e }));
      }
  }
  for (const n in r) t[n] === void 0 && e.removeValue(n);
  return t;
}
const ai = new WeakMap(),
  yre = [...ZE, Ct, Qn],
  gre = (e) => yre.find(YE(e)),
  Tw = [
    "AnimationStart",
    "AnimationComplete",
    "Update",
    "BeforeLayoutMeasure",
    "LayoutMeasure",
    "LayoutAnimationStart",
    "LayoutAnimationComplete",
  ],
  bre = Xb.length;
class E0 {
  scrapeMotionValuesFromProps(t, r, n) {
    return {};
  }
  constructor(
    {
      parent: t,
      props: r,
      presenceContext: n,
      reducedMotionConfig: o,
      blockInitialAnimation: a,
      visualState: s,
    },
    i = {}
  ) {
    (this.applyWillChange = !1),
      (this.resolveKeyframes = (f, m, h, p) =>
        new this.KeyframeResolver(f, m, h, p, this)),
      (this.current = null),
      (this.children = new Set()),
      (this.isVariantNode = !1),
      (this.isControllingVariants = !1),
      (this.shouldReduceMotion = null),
      (this.values = new Map()),
      (this.KeyframeResolver = d0),
      (this.features = {}),
      (this.valueSubscriptions = new Map()),
      (this.prevMotionValues = {}),
      (this.events = {}),
      (this.propEventSubscriptions = {}),
      (this.notifyUpdate = () => this.notify("Update", this.latestValues)),
      (this.render = () => {
        (this.isRenderScheduled = !1),
          this.current &&
            (this.triggerBuild(),
            this.renderInstance(
              this.current,
              this.renderState,
              this.props.style,
              this.projection
            ));
      }),
      (this.isRenderScheduled = !1),
      (this.scheduleRender = () => {
        this.isRenderScheduled ||
          ((this.isRenderScheduled = !0), $e.render(this.render, !1, !0));
      });
    const { latestValues: c, renderState: l } = s;
    (this.latestValues = c),
      (this.baseTarget = { ...c }),
      (this.initialValues = r.initial ? { ...c } : {}),
      (this.renderState = l),
      (this.parent = t),
      (this.props = r),
      (this.presenceContext = n),
      (this.depth = t ? t.depth + 1 : 0),
      (this.reducedMotionConfig = o),
      (this.options = i),
      (this.blockInitialAnimation = !!a),
      (this.isControllingVariants = ym(r)),
      (this.isVariantNode = SE(r)),
      this.isVariantNode && (this.variantChildren = new Set()),
      (this.manuallyAnimateOnMount = !!(t && t.current));
    const { willChange: u, ...d } = this.scrapeMotionValuesFromProps(
      r,
      {},
      this
    );
    for (const f in d) {
      const m = d[f];
      c[f] !== void 0 && Xe(m) && m.set(c[f], !1);
    }
  }
  mount(t) {
    (this.current = t),
      ai.set(t, this),
      this.projection && !this.projection.instance && this.projection.mount(t),
      this.parent &&
        this.isVariantNode &&
        !this.isControllingVariants &&
        (this.removeFromVariantTree = this.parent.addVariantChild(this)),
      this.values.forEach((r, n) => this.bindToMotionValue(n, r)),
      I0.current || QM(),
      (this.shouldReduceMotion =
        this.reducedMotionConfig === "never"
          ? !1
          : this.reducedMotionConfig === "always"
          ? !0
          : $f.current),
      this.parent && this.parent.children.add(this),
      this.update(this.props, this.presenceContext);
  }
  unmount() {
    ai.delete(this.current),
      this.projection && this.projection.unmount(),
      Jt(this.notifyUpdate),
      Jt(this.render),
      this.valueSubscriptions.forEach((t) => t()),
      this.removeFromVariantTree && this.removeFromVariantTree(),
      this.parent && this.parent.children.delete(this);
    for (const t in this.events) this.events[t].clear();
    for (const t in this.features) {
      const r = this.features[t];
      r && (r.unmount(), (r.isMounted = !1));
    }
    this.current = null;
  }
  bindToMotionValue(t, r) {
    const n = io.has(t),
      o = r.on("change", (s) => {
        (this.latestValues[t] = s),
          this.props.onUpdate && $e.preRender(this.notifyUpdate),
          n && this.projection && (this.projection.isTransformDirty = !0);
      }),
      a = r.on("renderRequest", this.scheduleRender);
    this.valueSubscriptions.set(t, () => {
      o(), a(), r.owner && r.stop();
    });
  }
  sortNodePosition(t) {
    return !this.current ||
      !this.sortInstanceNodePosition ||
      this.type !== t.type
      ? 0
      : this.sortInstanceNodePosition(this.current, t.current);
  }
  updateFeatures() {
    let t = "animation";
    for (t in ri) {
      const r = ri[t];
      if (!r) continue;
      const { isEnabled: n, Feature: o } = r;
      if (
        (!this.features[t] &&
          o &&
          n(this.props) &&
          (this.features[t] = new o(this)),
        this.features[t])
      ) {
        const a = this.features[t];
        a.isMounted ? a.update() : (a.mount(), (a.isMounted = !0));
      }
    }
  }
  triggerBuild() {
    this.build(this.renderState, this.latestValues, this.props);
  }
  measureViewportBox() {
    return this.current
      ? this.measureInstanceViewportBox(this.current, this.props)
      : Qe();
  }
  getStaticValue(t) {
    return this.latestValues[t];
  }
  setStaticValue(t, r) {
    this.latestValues[t] = r;
  }
  update(t, r) {
    (t.transformTemplate || this.props.transformTemplate) &&
      this.scheduleRender(),
      (this.prevProps = this.props),
      (this.props = t),
      (this.prevPresenceContext = this.presenceContext),
      (this.presenceContext = r);
    for (let n = 0; n < Tw.length; n++) {
      const o = Tw[n];
      this.propEventSubscriptions[o] &&
        (this.propEventSubscriptions[o](),
        delete this.propEventSubscriptions[o]);
      const a = "on" + o,
        s = t[a];
      s && (this.propEventSubscriptions[o] = this.on(o, s));
    }
    (this.prevMotionValues = vre(
      this,
      this.scrapeMotionValuesFromProps(t, this.prevProps, this),
      this.prevMotionValues
    )),
      this.handleChildMotionValue && this.handleChildMotionValue();
  }
  getProps() {
    return this.props;
  }
  getVariant(t) {
    return this.props.variants ? this.props.variants[t] : void 0;
  }
  getDefaultTransition() {
    return this.props.transition;
  }
  getTransformPagePoint() {
    return this.props.transformPagePoint;
  }
  getClosestVariantNode() {
    return this.isVariantNode
      ? this
      : this.parent
      ? this.parent.getClosestVariantNode()
      : void 0;
  }
  getVariantContext(t = !1) {
    if (t) return this.parent ? this.parent.getVariantContext() : void 0;
    if (!this.isControllingVariants) {
      const n = this.parent ? this.parent.getVariantContext() || {} : {};
      return (
        this.props.initial !== void 0 && (n.initial = this.props.initial), n
      );
    }
    const r = {};
    for (let n = 0; n < bre; n++) {
      const o = Xb[n],
        a = this.props[o];
      (cl(a) || a === !1) && (r[o] = a);
    }
    return r;
  }
  addVariantChild(t) {
    const r = this.getClosestVariantNode();
    if (r)
      return (
        r.variantChildren && r.variantChildren.add(t),
        () => r.variantChildren.delete(t)
      );
  }
  addValue(t, r) {
    const n = this.values.get(t);
    r !== n &&
      (n && this.removeValue(t),
      this.bindToMotionValue(t, r),
      this.values.set(t, r),
      (this.latestValues[t] = r.get()));
  }
  removeValue(t) {
    this.values.delete(t);
    const r = this.valueSubscriptions.get(t);
    r && (r(), this.valueSubscriptions.delete(t)),
      delete this.latestValues[t],
      this.removeValueFromRenderState(t, this.renderState);
  }
  hasValue(t) {
    return this.values.has(t);
  }
  getValue(t, r) {
    if (this.props.values && this.props.values[t]) return this.props.values[t];
    let n = this.values.get(t);
    return (
      n === void 0 &&
        r !== void 0 &&
        ((n = Zr(r === null ? void 0 : r, { owner: this })),
        this.addValue(t, n)),
      n
    );
  }
  readValue(t, r) {
    var n;
    let o =
      this.latestValues[t] !== void 0 || !this.current
        ? this.latestValues[t]
        : (n = this.getBaseTargetFromProps(this.props, t)) !== null &&
          n !== void 0
        ? n
        : this.readValueFromInstance(this.current, t, this.options);
    return (
      o != null &&
        (typeof o == "string" && (qE(o) || KE(o))
          ? (o = parseFloat(o))
          : !gre(o) && Qn.test(r) && (o = aM(t, r)),
        this.setBaseTarget(t, Xe(o) ? o.get() : o)),
      Xe(o) ? o.get() : o
    );
  }
  setBaseTarget(t, r) {
    this.baseTarget[t] = r;
  }
  getBaseTarget(t) {
    var r;
    const { initial: n } = this.props;
    let o;
    if (typeof n == "string" || typeof n == "object") {
      const s = i0(
        this.props,
        n,
        (r = this.presenceContext) === null || r === void 0 ? void 0 : r.custom
      );
      s && (o = s[t]);
    }
    if (n && o !== void 0) return o;
    const a = this.getBaseTargetFromProps(this.props, t);
    return a !== void 0 && !Xe(a)
      ? a
      : this.initialValues[t] !== void 0 && o === void 0
      ? void 0
      : this.baseTarget[t];
  }
  on(t, r) {
    return this.events[t] || (this.events[t] = new T0()), this.events[t].add(r);
  }
  notify(t, ...r) {
    this.events[t] && this.events[t].notify(...r);
  }
}
class JM extends E0 {
  constructor() {
    super(...arguments), (this.KeyframeResolver = sM);
  }
  sortInstanceNodePosition(t, r) {
    return t.compareDocumentPosition(r) & 2 ? 1 : -1;
  }
  getBaseTargetFromProps(t, r) {
    return t.style ? t.style[r] : void 0;
  }
  removeValueFromRenderState(t, { vars: r, style: n }) {
    delete r[t], delete n[t];
  }
}
function Sre(e) {
  return window.getComputedStyle(e);
}
class e2 extends JM {
  constructor() {
    super(...arguments),
      (this.type = "html"),
      (this.applyWillChange = !0),
      (this.renderInstance = FE);
  }
  readValueFromInstance(t, r) {
    if (io.has(r)) {
      const n = m0(r);
      return (n && n.default) || 0;
    } else {
      const n = Sre(t),
        o = (RE(r) ? n.getPropertyValue(r) : n[r]) || 0;
      return typeof o == "string" ? o.trim() : o;
    }
  }
  measureInstanceViewportBox(t, { transformPagePoint: r }) {
    return DM(t, r);
  }
  build(t, r, n) {
    r0(t, r, n.transformTemplate);
  }
  scrapeMotionValuesFromProps(t, r, n) {
    return s0(t, r, n);
  }
  handleChildMotionValue() {
    this.childSubscription &&
      (this.childSubscription(), delete this.childSubscription);
    const { children: t } = this.props;
    Xe(t) &&
      (this.childSubscription = t.on("change", (r) => {
        this.current && (this.current.textContent = `${r}`);
      }));
  }
}
class t2 extends JM {
  constructor() {
    super(...arguments),
      (this.type = "svg"),
      (this.isSVGTag = !1),
      (this.measureInstanceViewportBox = Qe);
  }
  getBaseTargetFromProps(t, r) {
    return t[r];
  }
  readValueFromInstance(t, r) {
    if (io.has(r)) {
      const n = m0(r);
      return (n && n.default) || 0;
    }
    return (r = jE.has(r) ? r : pm(r)), t.getAttribute(r);
  }
  scrapeMotionValuesFromProps(t, r, n) {
    return NE(t, r, n);
  }
  build(t, r, n) {
    o0(t, r, this.isSVGTag, n.transformTemplate);
  }
  renderInstance(t, r, n, o) {
    DE(t, r, n, o);
  }
  mount(t) {
    (this.isSVGTag = a0(t.tagName)), super.mount(t);
  }
}
const _m = (e, t) =>
    Qb(e) ? new t2(t) : new e2(t, { allowProjection: e !== g.Fragment }),
  r2 = { layout: { ProjectionNode: YM, MeasureLayout: BM } },
  n2 = { ...Am, ...GE, ...ZM, ...r2 },
  M0 = $E((e, t) => c0(e, t, n2, _m));
function xre(e) {
  return Zb(c0(e, { forwardMotionProps: !1 }, n2, _m));
}
const $re = $E(c0);
class wre extends g.Component {
  getSnapshotBeforeUpdate(t) {
    const r = this.props.childRef.current;
    if (r && t.isPresent && !this.props.isPresent) {
      const n = this.props.sizeRef.current;
      (n.height = r.offsetHeight || 0),
        (n.width = r.offsetWidth || 0),
        (n.top = r.offsetTop),
        (n.left = r.offsetLeft);
    }
    return null;
  }
  componentDidUpdate() {}
  render() {
    return this.props.children;
  }
}
function Cre({ children: e, isPresent: t }) {
  const r = g.useId(),
    n = g.useRef(null),
    o = g.useRef({ width: 0, height: 0, top: 0, left: 0 }),
    { nonce: a } = g.useContext(kn);
  return (
    g.useInsertionEffect(() => {
      const { width: s, height: i, top: c, left: l } = o.current;
      if (t || !n.current || !s || !i) return;
      n.current.dataset.motionPopId = r;
      const u = document.createElement("style");
      return (
        a && (u.nonce = a),
        document.head.appendChild(u),
        u.sheet &&
          u.sheet.insertRule(`
          [data-motion-pop-id="${r}"] {
            position: absolute !important;
            width: ${s}px !important;
            height: ${i}px !important;
            top: ${c}px !important;
            left: ${l}px !important;
          }
        `),
        () => {
          document.head.removeChild(u);
        }
      );
    }, [t]),
    P.jsx(wre, {
      isPresent: t,
      childRef: n,
      sizeRef: o,
      children: g.cloneElement(e, { ref: n }),
    })
  );
}
const kre = ({
  children: e,
  initial: t,
  isPresent: r,
  onExitComplete: n,
  custom: o,
  presenceAffectsLayout: a,
  mode: s,
}) => {
  const i = Tt(Tre),
    c = g.useId(),
    l = g.useMemo(
      () => ({
        id: c,
        initial: t,
        isPresent: r,
        custom: o,
        onExitComplete: (u) => {
          i.set(u, !0);
          for (const d of i.values()) if (!d) return;
          n && n();
        },
        register: (u) => (i.set(u, !1), () => i.delete(u)),
      }),
      a ? [Math.random()] : [r]
    );
  return (
    g.useMemo(() => {
      i.forEach((u, d) => i.set(d, !1));
    }, [r]),
    g.useEffect(() => {
      !r && !i.size && n && n();
    }, [r]),
    s === "popLayout" && (e = P.jsx(Cre, { isPresent: r, children: e })),
    P.jsx(Ii.Provider, { value: l, children: e })
  );
};
function Tre() {
  return new Map();
}
const Qu = (e) => e.key || "";
function Pw(e) {
  const t = [];
  return (
    g.Children.forEach(e, (r) => {
      g.isValidElement(r) && t.push(r);
    }),
    t
  );
}
const Pre = ({
  children: e,
  exitBeforeEnter: t,
  custom: r,
  initial: n = !0,
  onExitComplete: o,
  presenceAffectsLayout: a = !0,
  mode: s = "sync",
}) => {
  const i = g.useMemo(() => Pw(e), [e]),
    c = i.map(Qu),
    l = g.useRef(!0),
    u = g.useRef(i),
    d = Tt(() => new Map()),
    [f, m] = g.useState(i),
    [h, p] = g.useState(i);
  Ho(() => {
    (l.current = !1), (u.current = i);
    for (let y = 0; y < h.length; y++) {
      const S = Qu(h[y]);
      c.includes(S) ? d.delete(S) : d.get(S) !== !0 && d.set(S, !1);
    }
  }, [h, c.length, c.join("-")]);
  const v = [];
  if (i !== f) {
    let y = [...i];
    for (let S = 0; S < h.length; S++) {
      const w = h[S],
        C = Qu(w);
      c.includes(C) || (y.splice(S, 0, w), v.push(w));
    }
    s === "wait" && v.length && (y = v), p(Pw(y)), m(i);
    return;
  }
  const { forceRender: b } = g.useContext(ni);
  return P.jsx(P.Fragment, {
    children: h.map((y) => {
      const S = Qu(y),
        w = i === h || c.includes(S),
        C = () => {
          if (d.has(S)) d.set(S, !0);
          else return;
          let T = !0;
          d.forEach((k) => {
            k || (T = !1);
          }),
            T && (b == null || b(), p(u.current), o && o());
        };
      return P.jsx(
        kre,
        {
          isPresent: w,
          initial: !l.current || n ? void 0 : !1,
          custom: w ? void 0 : r,
          presenceAffectsLayout: a,
          mode: s,
          onExitComplete: w ? void 0 : C,
          children: y,
        },
        S
      );
    }),
  });
};
function Rre({ children: e, isValidProp: t, ...r }) {
  t && IE(t),
    (r = { ...g.useContext(kn), ...r }),
    (r.isStatic = Tt(() => r.isStatic));
  const n = g.useMemo(
    () => r,
    [JSON.stringify(r.transition), r.transformPagePoint, r.reducedMotion]
  );
  return P.jsx(kn.Provider, { value: n, children: e });
}
function Are({ children: e, features: t, strict: r = !1 }) {
  const [, n] = g.useState(!Yp(t)),
    o = g.useRef(void 0);
  if (!Yp(t)) {
    const { renderer: a, ...s } = t;
    (o.current = a), gy(s);
  }
  return (
    g.useEffect(() => {
      Yp(t) &&
        t().then(({ renderer: a, ...s }) => {
          gy(s), (o.current = a), n(!0);
        });
    }, []),
    P.jsx(Wb.Provider, {
      value: { renderer: o.current, strict: r },
      children: e,
    })
  );
}
function Yp(e) {
  return typeof e == "function";
}
const o2 = g.createContext(null);
function _re() {
  const e = g.useRef(!1);
  return (
    Ho(
      () => (
        (e.current = !0),
        () => {
          e.current = !1;
        }
      ),
      []
    ),
    e
  );
}
function F0() {
  const e = _re(),
    [t, r] = g.useState(0),
    n = g.useCallback(() => {
      e.current && r(t + 1);
    }, [t]);
  return [g.useCallback(() => $e.postRender(n), [n]), t];
}
const Ire = (e) => !e.isLayoutDirty && e.willUpdate(!1);
function Rw() {
  const e = new Set(),
    t = new WeakMap(),
    r = () => e.forEach(Ire);
  return {
    add: (n) => {
      e.add(n), t.set(n, n.addEventListener("willUpdate", r));
    },
    remove: (n) => {
      e.delete(n);
      const o = t.get(n);
      o && (o(), t.delete(n)), r();
    },
    dirty: r,
  };
}
const a2 = (e) => e === !0,
  Ere = (e) => a2(e === !0) || e === "id",
  s2 = ({ children: e, id: t, inherit: r = !0 }) => {
    const n = g.useContext(ni),
      o = g.useContext(o2),
      [a, s] = F0(),
      i = g.useRef(null),
      c = n.id || o;
    i.current === null &&
      (Ere(r) && c && (t = t ? c + "-" + t : c),
      (i.current = { id: t, group: (a2(r) && n.group) || Rw() }));
    const l = g.useMemo(() => ({ ...i.current, forceRender: a }), [s]);
    return P.jsx(ni.Provider, { value: l, children: e });
  },
  i2 = g.createContext(null);
function Mre(e, t, r, n) {
  if (!n) return e;
  const o = e.findIndex((u) => u.value === t);
  if (o === -1) return e;
  const a = n > 0 ? 1 : -1,
    s = e[o + a];
  if (!s) return e;
  const i = e[o],
    c = s.layout,
    l = Ke(c.min, c.max, 0.5);
  return (a === 1 && i.layout.max + r > l) || (a === -1 && i.layout.min + r < l)
    ? wJ(e, o, o + a)
    : e;
}
function Fre(
  { children: e, as: t = "ul", axis: r = "y", onReorder: n, values: o, ...a },
  s
) {
  const i = Tt(() => M0(t)),
    c = [],
    l = g.useRef(!1),
    u = {
      axis: r,
      registerItem: (d, f) => {
        const m = c.findIndex((h) => d === h.value);
        m !== -1 ? (c[m].layout = f[r]) : c.push({ value: d, layout: f[r] }),
          c.sort(Nre);
      },
      updateOrder: (d, f, m) => {
        if (l.current) return;
        const h = Mre(c, d, f, m);
        c !== h &&
          ((l.current = !0), n(h.map(Dre).filter((p) => o.indexOf(p) !== -1)));
      },
    };
  return (
    g.useEffect(() => {
      l.current = !1;
    }),
    P.jsx(i, {
      ...a,
      ref: s,
      ignoreStrict: !0,
      children: P.jsx(i2.Provider, { value: u, children: e }),
    })
  );
}
const jre = g.forwardRef(Fre);
function Dre(e) {
  return e.value;
}
function Nre(e, t) {
  return e.layout.min - t.layout.min;
}
function No(e) {
  const t = Tt(() => Zr(e)),
    { isStatic: r } = g.useContext(kn);
  if (r) {
    const [, n] = g.useState(e);
    g.useEffect(() => t.on("change", n), []);
  }
  return t;
}
const Ore = (e) => e && typeof e == "object" && e.mix,
  Bre = (e) => (Ore(e) ? e.mix : void 0);
function c2(...e) {
  const t = !Array.isArray(e[0]),
    r = t ? 0 : -1,
    n = e[0 + r],
    o = e[1 + r],
    a = e[2 + r],
    s = e[3 + r],
    i = Tm(o, a, { mixer: Bre(a[0]), ...s });
  return t ? i(n) : i;
}
function j0(e, t) {
  const r = No(t()),
    n = () => r.set(t());
  return (
    n(),
    Ho(() => {
      const o = () => $e.preRender(n, !1, !0),
        a = e.map((s) => s.on("change", o));
      return () => {
        a.forEach((s) => s()), Jt(n);
      };
    }),
    r
  );
}
function Lre(e) {
  (Hc.current = []), e();
  const t = j0(Hc.current, e);
  return (Hc.current = void 0), t;
}
function wf(e, t, r, n) {
  if (typeof e == "function") return Lre(e);
  const o = typeof t == "function" ? t : c2(t, r, n);
  return Array.isArray(e) ? Aw(e, o) : Aw([e], ([a]) => o(a));
}
function Aw(e, t) {
  const r = Tt(() => []);
  return j0(e, () => {
    r.length = 0;
    const n = e.length;
    for (let o = 0; o < n; o++) r[o] = e[o].get();
    return t(r);
  });
}
function _w(e, t = 0) {
  return Xe(e) ? e : No(t);
}
function Vre(
  {
    children: e,
    style: t = {},
    value: r,
    as: n = "li",
    onDrag: o,
    layout: a = !0,
    ...s
  },
  i
) {
  const c = Tt(() => M0(n)),
    l = g.useContext(i2),
    u = { x: _w(t.x), y: _w(t.y) },
    d = wf([u.x, u.y], ([p, v]) => (p || v ? 1 : "unset")),
    { axis: f, registerItem: m, updateOrder: h } = l;
  return P.jsx(c, {
    drag: f,
    ...s,
    dragSnapToOrigin: !0,
    style: { ...t, x: u.x, y: u.y, zIndex: d },
    layout: a,
    onDrag: (p, v) => {
      const { velocity: b } = v;
      b[f] && h(r, u[f].get(), b[f]), o && o(p, v);
    },
    onLayoutMeasure: (p) => m(r, p),
    ref: i,
    ignoreStrict: !0,
    children: e,
  });
}
const zre = g.forwardRef(Vre),
  Hre = { Group: jre, Item: zre },
  Wre = { renderer: _m, ...Am },
  l2 = { renderer: _m, ...Am, ...GE },
  Gre = { ...l2, ...ZM, ...r2 };
function Ure(e, ...t) {
  const r = e.length;
  function n() {
    let o = "";
    for (let a = 0; a < r; a++) {
      o += e[a];
      const s = t[a];
      s && (o += Xe(s) ? s.get() : s);
    }
    return o;
  }
  return j0(t.filter(Xe), n);
}
function Iw(e) {
  return typeof e == "number" ? e : parseFloat(e);
}
function Kre(e, t = {}) {
  const { isStatic: r } = g.useContext(kn),
    n = g.useRef(null),
    o = No(Xe(e) ? Iw(e.get()) : e),
    a = g.useRef(o.get()),
    s = g.useRef(() => {}),
    i = () => {
      const l = n.current;
      l && l.time === 0 && l.sample(it.delta),
        c(),
        (n.current = SM({
          keyframes: [o.get(), a.current],
          velocity: o.getVelocity(),
          type: "spring",
          restDelta: 0.001,
          restSpeed: 0.01,
          ...t,
          onUpdate: s.current,
        }));
    },
    c = () => {
      n.current && n.current.stop();
    };
  return (
    g.useInsertionEffect(
      () =>
        o.attach(
          (l, u) =>
            r
              ? u(l)
              : ((a.current = l), (s.current = u), $e.update(i), o.get()),
          c
        ),
      [JSON.stringify(t)]
    ),
    Ho(() => {
      if (Xe(e)) return e.on("change", (l) => o.set(Iw(l)));
    }, [o]),
    o
  );
}
function u2(e, t, r) {
  g.useInsertionEffect(() => e.on(t, r), [e, t, r]);
}
function qre(e) {
  const t = No(e.getVelocity()),
    r = () => {
      const n = e.getVelocity();
      t.set(n), n && $e.update(r);
    };
  return (
    u2(e, "change", () => {
      $e.update(r, !1, !0);
    }),
    t
  );
}
function Im(e, t, r) {
  var n;
  if (typeof e == "string") {
    let o = document;
    t && (ul(!!t.current), (o = t.current)),
      r
        ? (((n = r[e]) !== null && n !== void 0) ||
            (r[e] = o.querySelectorAll(e)),
          (e = r[e]))
        : (e = o.querySelectorAll(e));
  } else e instanceof Element && (e = [e]);
  return Array.from(e || []);
}
const Ud = new WeakMap();
let To;
function Xre(e, t) {
  if (t) {
    const { inlineSize: r, blockSize: n } = t[0];
    return { width: r, height: n };
  } else
    return e instanceof SVGElement && "getBBox" in e
      ? e.getBBox()
      : { width: e.offsetWidth, height: e.offsetHeight };
}
function Yre({ target: e, contentRect: t, borderBoxSize: r }) {
  var n;
  (n = Ud.get(e)) === null ||
    n === void 0 ||
    n.forEach((o) => {
      o({
        target: e,
        contentSize: t,
        get size() {
          return Xre(e, r);
        },
      });
    });
}
function Zre(e) {
  e.forEach(Yre);
}
function Qre() {
  typeof ResizeObserver > "u" || (To = new ResizeObserver(Zre));
}
function Jre(e, t) {
  To || Qre();
  const r = Im(e);
  return (
    r.forEach((n) => {
      let o = Ud.get(n);
      o || ((o = new Set()), Ud.set(n, o)),
        o.add(t),
        To == null || To.observe(n);
    }),
    () => {
      r.forEach((n) => {
        const o = Ud.get(n);
        o == null || o.delete(t),
          (o != null && o.size) || To == null || To.unobserve(n);
      });
    }
  );
}
const Kd = new Set();
let Uc;
function ene() {
  (Uc = () => {
    const e = { width: window.innerWidth, height: window.innerHeight },
      t = { target: window, size: e, contentSize: e };
    Kd.forEach((r) => r(t));
  }),
    window.addEventListener("resize", Uc);
}
function tne(e) {
  return (
    Kd.add(e),
    Uc || ene(),
    () => {
      Kd.delete(e), !Kd.size && Uc && (Uc = void 0);
    }
  );
}
function rne(e, t) {
  return typeof e == "function" ? tne(e) : Jre(e, t);
}
const nne = 50,
  Ew = () => ({
    current: 0,
    offset: [],
    progress: 0,
    scrollLength: 0,
    targetOffset: 0,
    targetLength: 0,
    containerLength: 0,
    velocity: 0,
  }),
  one = () => ({ time: 0, x: Ew(), y: Ew() }),
  ane = {
    x: { length: "Width", position: "Left" },
    y: { length: "Height", position: "Top" },
  };
function Mw(e, t, r, n) {
  const o = r[t],
    { length: a, position: s } = ane[t],
    i = o.current,
    c = r.time;
  (o.current = e[`scroll${s}`]),
    (o.scrollLength = e[`scroll${a}`] - e[`client${a}`]),
    (o.offset.length = 0),
    (o.offset[0] = 0),
    (o.offset[1] = o.scrollLength),
    (o.progress = Do(0, o.scrollLength, o.current));
  const l = n - c;
  o.velocity = l > nne ? 0 : h0(o.current - i, l);
}
function sne(e, t, r) {
  Mw(e, "x", t, r), Mw(e, "y", t, r), (t.time = r);
}
function ine(e, t) {
  const r = { x: 0, y: 0 };
  let n = e;
  for (; n && n !== t; )
    if (n instanceof HTMLElement)
      (r.x += n.offsetLeft), (r.y += n.offsetTop), (n = n.offsetParent);
    else if (n.tagName === "svg") {
      const o = n.getBoundingClientRect();
      n = n.parentElement;
      const a = n.getBoundingClientRect();
      (r.x += o.left - a.left), (r.y += o.top - a.top);
    } else if (n instanceof SVGGraphicsElement) {
      const { x: o, y: a } = n.getBBox();
      (r.x += o), (r.y += a);
      let s = null,
        i = n.parentNode;
      for (; !s; ) i.tagName === "svg" && (s = i), (i = n.parentNode);
      n = s;
    } else break;
  return r;
}
const cne = {
    Enter: [
      [0, 1],
      [1, 1],
    ],
    Exit: [
      [0, 0],
      [1, 0],
    ],
    Any: [
      [1, 0],
      [0, 1],
    ],
    All: [
      [0, 0],
      [1, 1],
    ],
  },
  Ny = { start: 0, center: 0.5, end: 1 };
function Fw(e, t, r = 0) {
  let n = 0;
  if ((e in Ny && (e = Ny[e]), typeof e == "string")) {
    const o = parseFloat(e);
    e.endsWith("px")
      ? (n = o)
      : e.endsWith("%")
      ? (e = o / 100)
      : e.endsWith("vw")
      ? (n = (o / 100) * document.documentElement.clientWidth)
      : e.endsWith("vh")
      ? (n = (o / 100) * document.documentElement.clientHeight)
      : (e = o);
  }
  return typeof e == "number" && (n = t * e), r + n;
}
const lne = [0, 0];
function une(e, t, r, n) {
  let o = Array.isArray(e) ? e : lne,
    a = 0,
    s = 0;
  return (
    typeof e == "number"
      ? (o = [e, e])
      : typeof e == "string" &&
        ((e = e.trim()),
        e.includes(" ") ? (o = e.split(" ")) : (o = [e, Ny[e] ? e : "0"])),
    (a = Fw(o[0], r, n)),
    (s = Fw(o[1], t)),
    a - s
  );
}
const dne = { x: 0, y: 0 };
function fne(e) {
  return "getBBox" in e && e.tagName !== "svg"
    ? e.getBBox()
    : { width: e.clientWidth, height: e.clientHeight };
}
function mne(e, t, r) {
  const { offset: n = cne.All } = r,
    { target: o = e, axis: a = "y" } = r,
    s = a === "y" ? "height" : "width",
    i = o !== e ? ine(o, e) : dne,
    c = o === e ? { width: e.scrollWidth, height: e.scrollHeight } : fne(o),
    l = { width: e.clientWidth, height: e.clientHeight };
  t[a].offset.length = 0;
  let u = !t[a].interpolate;
  const d = n.length;
  for (let f = 0; f < d; f++) {
    const m = une(n[f], l[s], c[s], i[a]);
    !u && m !== t[a].interpolatorOffsets[f] && (u = !0), (t[a].offset[f] = m);
  }
  u &&
    ((t[a].interpolate = Tm(t[a].offset, $0(n))),
    (t[a].interpolatorOffsets = [...t[a].offset])),
    (t[a].progress = t[a].interpolate(t[a].current));
}
function hne(e, t = e, r) {
  if (((r.x.targetOffset = 0), (r.y.targetOffset = 0), t !== e)) {
    let n = t;
    for (; n && n !== e; )
      (r.x.targetOffset += n.offsetLeft),
        (r.y.targetOffset += n.offsetTop),
        (n = n.offsetParent);
  }
  (r.x.targetLength = t === e ? t.scrollWidth : t.clientWidth),
    (r.y.targetLength = t === e ? t.scrollHeight : t.clientHeight),
    (r.x.containerLength = e.clientWidth),
    (r.y.containerLength = e.clientHeight);
}
function pne(e, t, r, n = {}) {
  return {
    measure: () => hne(e, n.target, r),
    update: (o) => {
      sne(e, r, o), (n.offset || n.target) && mne(e, r, n);
    },
    notify: () => t(r),
  };
}
const mc = new WeakMap(),
  jw = new WeakMap(),
  Zp = new WeakMap(),
  Dw = (e) => (e === document.documentElement ? window : e);
function D0(e, { container: t = document.documentElement, ...r } = {}) {
  let n = Zp.get(t);
  n || ((n = new Set()), Zp.set(t, n));
  const o = one(),
    a = pne(t, e, o, r);
  if ((n.add(a), !mc.has(t))) {
    const i = () => {
        for (const f of n) f.measure();
      },
      c = () => {
        for (const f of n) f.update(it.timestamp);
      },
      l = () => {
        for (const f of n) f.notify();
      },
      u = () => {
        $e.read(i, !1, !0), $e.read(c, !1, !0), $e.update(l, !1, !0);
      };
    mc.set(t, u);
    const d = Dw(t);
    window.addEventListener("resize", u, { passive: !0 }),
      t !== document.documentElement && jw.set(t, rne(t, u)),
      d.addEventListener("scroll", u, { passive: !0 });
  }
  const s = mc.get(t);
  return (
    $e.read(s, !1, !0),
    () => {
      var i;
      Jt(s);
      const c = Zp.get(t);
      if (!c || (c.delete(a), c.size)) return;
      const l = mc.get(t);
      mc.delete(t),
        l &&
          (Dw(t).removeEventListener("scroll", l),
          (i = jw.get(t)) === null || i === void 0 || i(),
          window.removeEventListener("resize", l));
    }
  );
}
function Nw(e, t) {
  xE(!!(!t || t.current));
}
const vne = () => ({
  scrollX: Zr(0),
  scrollY: Zr(0),
  scrollXProgress: Zr(0),
  scrollYProgress: Zr(0),
});
function N0({ container: e, target: t, layoutEffect: r = !0, ...n } = {}) {
  const o = Tt(vne);
  return (
    (r ? Ho : g.useEffect)(
      () => (
        Nw("target", t),
        Nw("container", e),
        D0(
          ({ x: s, y: i }) => {
            o.scrollX.set(s.current),
              o.scrollXProgress.set(s.progress),
              o.scrollY.set(i.current),
              o.scrollYProgress.set(i.progress);
          },
          {
            ...n,
            container: (e == null ? void 0 : e.current) || void 0,
            target: (t == null ? void 0 : t.current) || void 0,
          }
        )
      ),
      [e, t, JSON.stringify(n.offset)]
    ),
    o
  );
}
function yne(e) {
  return N0({ container: e });
}
function gne() {
  return N0();
}
function d2(e) {
  const t = g.useRef(0),
    { isStatic: r } = g.useContext(kn);
  g.useEffect(() => {
    if (r) return;
    const n = ({ timestamp: o, delta: a }) => {
      t.current || (t.current = o), e(o - t.current, a);
    };
    return $e.update(n, !0), () => Jt(n);
  }, [e]);
}
function bne() {
  const e = No(0);
  return d2((t) => e.set(t)), e;
}
function Sne() {
  return Tt(() => new PM("auto"));
}
function f2() {
  !I0.current && QM();
  const [e] = g.useState($f.current);
  return e;
}
function xne() {
  const e = f2(),
    { reducedMotion: t } = g.useContext(kn);
  return t === "never" ? !1 : t === "always" ? !0 : e;
}
function $ne(e) {
  e.values.forEach((t) => t.stop());
}
function Oy(e, t) {
  [...t].reverse().forEach((n) => {
    const o = e.getVariant(n);
    o && R0(e, o),
      e.variantChildren &&
        e.variantChildren.forEach((a) => {
          Oy(a, t);
        });
  });
}
function wne(e, t) {
  if (Array.isArray(t)) return Oy(e, t);
  if (typeof t == "string") return Oy(e, [t]);
  R0(e, t);
}
function m2() {
  const e = new Set(),
    t = {
      subscribe(r) {
        return e.add(r), () => void e.delete(r);
      },
      start(r, n) {
        const o = [];
        return (
          e.forEach((a) => {
            o.push(Rm(a, r, { transitionOverride: n }));
          }),
          Promise.all(o)
        );
      },
      set(r) {
        return e.forEach((n) => {
          wne(n, r);
        });
      },
      stop() {
        e.forEach((r) => {
          $ne(r);
        });
      },
      mount() {
        return () => {
          t.stop();
        };
      },
    };
  return t;
}
function h2(e) {
  return g.useEffect(() => () => e(), []);
}
function Cne(e) {
  return typeof e == "object" && !Array.isArray(e);
}
function kne(e) {
  const t = {
      presenceContext: null,
      props: {},
      visualState: {
        renderState: {
          transform: {},
          transformOrigin: {},
          style: {},
          vars: {},
          attrs: {},
        },
        latestValues: {},
      },
    },
    r = UM(e) ? new t2(t) : new e2(t);
  r.mount(e), ai.set(e, r);
}
function Tne(e, t = 100) {
  const r = wm({ keyframes: [0, t], ...e }),
    n = Math.min(bM(r), Ry);
  return {
    type: "keyframes",
    ease: (o) => r.next(n * o).value / t,
    duration: wn(n),
  };
}
function Ow(e, t, r, n) {
  var o;
  return typeof t == "number"
    ? t
    : t.startsWith("-") || t.startsWith("+")
    ? Math.max(0, e + parseFloat(t))
    : t === "<"
    ? r
    : (o = n.get(t)) !== null && o !== void 0
    ? o
    : e;
}
const O0 = (e, t, r) => {
  const n = t - e;
  return ((((r - e) % n) + n) % n) + e;
};
function Pne(e, t) {
  return mM(e) ? e[O0(0, e.length, t)] : e;
}
function Rne(e, t, r) {
  for (let n = 0; n < e.length; n++) {
    const o = e[n];
    o.at > t && o.at < r && (Hl(e, o), n--);
  }
}
function Ane(e, t, r, n, o, a) {
  Rne(e, o, a);
  for (let s = 0; s < t.length; s++)
    e.push({ value: t[s], at: Ke(o, a, n[s]), easing: Pne(r, s) });
}
function _ne(e, t) {
  return e.at === t.at
    ? e.value === null
      ? 1
      : t.value === null
      ? -1
      : 0
    : e.at - t.at;
}
const Ine = "easeInOut";
function Ene(e, { defaultTransition: t = {}, ...r } = {}, n) {
  const o = t.duration || 0.3,
    a = new Map(),
    s = new Map(),
    i = {},
    c = new Map();
  let l = 0,
    u = 0,
    d = 0;
  for (let f = 0; f < e.length; f++) {
    const m = e[f];
    if (typeof m == "string") {
      c.set(m, u);
      continue;
    } else if (!Array.isArray(m)) {
      c.set(m.name, Ow(u, m.at, l, c));
      continue;
    }
    let [h, p, v = {}] = m;
    v.at !== void 0 && (u = Ow(u, v.at, l, c));
    let b = 0;
    const y = (S, w, C, T = 0, k = 0) => {
      const R = Mne(S),
        { delay: E = 0, times: _ = $0(R), type: N = "keyframes", ...G } = w;
      let { ease: B = t.ease || "easeOut", duration: z } = w;
      const Y = typeof E == "function" ? E(T, k) : E,
        W = R.length;
      if (W <= 2 && N === "spring") {
        let ve = 100;
        if (W === 2 && Dne(R)) {
          const L = R[1] - R[0];
          ve = Math.abs(L);
        }
        const re = { ...G };
        z !== void 0 && (re.duration = $n(z));
        const ue = Tne(re, ve);
        (B = ue.ease), (z = ue.duration);
      }
      z ?? (z = o);
      const j = u + Y,
        O = j + z;
      _.length === 1 && _[0] === 0 && (_[1] = 1);
      const K = _.length - R.length;
      K > 0 && gM(_, K),
        R.length === 1 && R.unshift(null),
        Ane(C, R, B, _, j, O),
        (b = Math.max(Y + z, b)),
        (d = Math.max(O, d));
    };
    if (Xe(h)) {
      const S = Bw(h, s);
      y(p, v, Lw("default", S));
    } else {
      const S = Im(h, n, i),
        w = S.length;
      for (let C = 0; C < w; C++) {
        (p = p), (v = v);
        const T = S[C],
          k = Bw(T, s);
        for (const R in p) y(p[R], Fne(v, R), Lw(R, k), C, w);
      }
    }
    (l = u), (u += b);
  }
  return (
    s.forEach((f, m) => {
      for (const h in f) {
        const p = f[h];
        p.sort(_ne);
        const v = [],
          b = [],
          y = [];
        for (let w = 0; w < p.length; w++) {
          const { at: C, value: T, easing: k } = p[w];
          v.push(T), b.push(Do(0, d, C)), y.push(k || "easeOut");
        }
        b[0] !== 0 && (b.unshift(0), v.unshift(v[0]), y.unshift(Ine)),
          b[b.length - 1] !== 1 && (b.push(1), v.push(null)),
          a.has(m) || a.set(m, { keyframes: {}, transition: {} });
        const S = a.get(m);
        (S.keyframes[h] = v),
          (S.transition[h] = { ...t, duration: d, ease: y, times: b, ...r });
      }
    }),
    a
  );
}
function Bw(e, t) {
  return !t.has(e) && t.set(e, {}), t.get(e);
}
function Lw(e, t) {
  return t[e] || (t[e] = []), t[e];
}
function Mne(e) {
  return Array.isArray(e) ? e : [e];
}
function Fne(e, t) {
  return e[t] ? { ...e, ...e[t] } : { ...e };
}
const jne = (e) => typeof e == "number",
  Dne = (e) => e.every(jne);
function p2(e, t, r, n) {
  const o = Im(e, n),
    a = o.length,
    s = [];
  for (let i = 0; i < a; i++) {
    const c = o[i];
    ai.has(c) || kne(c);
    const l = ai.get(c),
      u = { ...r };
    typeof u.delay == "function" && (u.delay = u.delay(i, a)),
      s.push(...A0(l, { ...t, transition: u }, {}));
  }
  return new C0(s);
}
const Nne = (e) => Array.isArray(e) && Array.isArray(e[0]);
function One(e, t, r) {
  const n = [];
  return (
    Ene(e, t, r).forEach(({ keyframes: a, transition: s }, i) => {
      let c;
      Xe(i) ? (c = _0(i, a.default, s.default)) : (c = p2(i, a, s)), n.push(c);
    }),
    new C0(n)
  );
}
const B0 = (e) => {
    function t(r, n, o) {
      let a;
      return (
        Nne(r)
          ? (a = One(r, n, e))
          : Cne(n)
          ? (a = p2(r, n, o, e))
          : (a = _0(r, n, o)),
        e && e.animations.push(a),
        a
      );
    }
    return t;
  },
  Bne = B0();
function Lne() {
  const e = Tt(() => ({ current: null, animations: [] })),
    t = Tt(() => B0(e));
  return (
    h2(() => {
      e.animations.forEach((r) => r.stop());
    }),
    [e, t]
  );
}
function v2() {
  const e = Tt(m2);
  return Ho(e.mount, []), e;
}
const Vne = v2;
function zne(...e) {
  const t = g.useRef(0),
    [r, n] = g.useState(e[t.current]),
    o = g.useCallback(
      (a) => {
        (t.current = typeof a != "number" ? O0(0, e.length, t.current + 1) : a),
          n(e[t.current]);
      },
      [e.length, ...e]
    );
  return [r, o];
}
const Hne = { some: 0, all: 1 };
function y2(e, t, { root: r, margin: n, amount: o = "some" } = {}) {
  const a = Im(e),
    s = new WeakMap(),
    i = (l) => {
      l.forEach((u) => {
        const d = s.get(u.target);
        if (u.isIntersecting !== !!d)
          if (u.isIntersecting) {
            const f = t(u);
            typeof f == "function" ? s.set(u.target, f) : c.unobserve(u.target);
          } else d && (d(u), s.delete(u.target));
      });
    },
    c = new IntersectionObserver(i, {
      root: r,
      rootMargin: n,
      threshold: typeof o == "number" ? o : Hne[o],
    });
  return a.forEach((l) => c.observe(l)), () => c.disconnect();
}
function Wne(e, { root: t, margin: r, amount: n, once: o = !1 } = {}) {
  const [a, s] = g.useState(!1);
  return (
    g.useEffect(() => {
      if (!e.current || (o && a)) return;
      const i = () => (s(!0), o ? void 0 : () => s(!1)),
        c = { root: (t && t.current) || void 0, margin: r, amount: n };
      return y2(e.current, i, c);
    }, [t, e, r, o, n]),
    a
  );
}
class g2 {
  constructor() {
    this.componentControls = new Set();
  }
  subscribe(t) {
    return (
      this.componentControls.add(t), () => this.componentControls.delete(t)
    );
  }
  start(t, r) {
    this.componentControls.forEach((n) => {
      n.start(t.nativeEvent || t, r);
    });
  }
}
const Gne = () => new g2();
function Une() {
  return Tt(Gne);
}
function Kne(e, t, r, n) {
  g.useEffect(() => {
    const o = e.current;
    if (r && o) return pn(o, t, r, n);
  }, [e, t, r, n]);
}
function b2(e) {
  return e !== null && typeof e == "object" && Yb in e;
}
function qne(e) {
  if (b2(e)) return e[Yb];
}
function S2() {
  return Xne;
}
function Xne(e) {
  xa.current &&
    ((xa.current.isUpdating = !1), xa.current.blockUpdate(), e && e());
}
function Yne() {
  const [e, t] = F0(),
    r = S2(),
    n = g.useRef();
  return (
    g.useEffect(() => {
      $e.postRender(() =>
        $e.postRender(() => {
          t === n.current && (fl.current = !1);
        })
      );
    }, [t]),
    (o) => {
      r(() => {
        (fl.current = !0), e(), o(), (n.current = t + 1);
      });
    }
  );
}
function Zne() {
  fl.current = !1;
}
function Qne() {
  return g.useCallback(() => {
    const t = xa.current;
    t && t.resetTree();
  }, []);
}
const x2 = (e, t) => `${e}: ${t}`,
  Os = new Map();
let Qp;
function Jne(e, t, r, n) {
  const o = io.has(t) ? "transform" : t,
    a = x2(e, o),
    s = Os.get(a);
  if (!s) return null;
  const { animation: i, startTime: c } = s,
    l = () => {
      if ((Os.delete(a), n))
        n.render(() =>
          n.render(() => {
            try {
              i.cancel();
            } catch {}
          })
        );
      else
        try {
          i.cancel();
        } catch {}
    };
  return c === null || window.HandoffComplete
    ? (l(), null)
    : (Qp === void 0 && (Qp = performance.now()), Qp - c || 0);
}
let Ju, cs;
function eoe(e, t, r, n, o) {
  if (window.HandoffComplete) {
    window.HandoffAppearAnimations = void 0;
    return;
  }
  const a = e.dataset[yE];
  if (!a) return;
  window.HandoffAppearAnimations = Jne;
  const s = x2(a, t);
  cs ||
    ((cs = Ay(e, t, [r[0], r[0]], { duration: 1e4, ease: "linear" })),
    Os.set(s, { animation: cs, startTime: null }),
    window.HandoffCancelAllAnimations ||
      (window.HandoffCancelAllAnimations = () => {
        Os.forEach(({ animation: c }) => {
          c.cancel();
        }),
          Os.clear(),
          (window.HandoffCancelAllAnimations = void 0);
      }));
  const i = () => {
    cs.cancel();
    const c = Ay(e, t, r, n);
    Ju === void 0 && (Ju = performance.now()),
      (c.startTime = Ju),
      Os.set(s, { animation: c, startTime: Ju }),
      o && o(c);
  };
  cs.ready ? cs.ready.then(i).catch(St) : i();
}
const By = () => ({});
class toe extends E0 {
  constructor() {
    super(...arguments), (this.measureInstanceViewportBox = Qe);
  }
  build() {}
  resetTransform() {}
  restoreTransform() {}
  removeValueFromRenderState() {}
  renderInstance() {}
  scrapeMotionValuesFromProps() {
    return By();
  }
  getBaseTargetFromProps() {}
  readValueFromInstance(t, r, n) {
    return n.initialState[r] || 0;
  }
  sortInstanceNodePosition() {
    return 0;
  }
}
const roe = bm({ scrapeMotionValuesFromProps: By, createRenderState: By });
function noe(e) {
  const [t, r] = g.useState(e),
    n = roe({}, !1),
    o = Tt(
      () =>
        new toe(
          { props: {}, visualState: n, presenceContext: null },
          { initialState: e }
        )
    );
  g.useEffect(() => (o.mount({}), () => o.unmount()), [o]),
    g.useEffect(() => {
      o.update(
        {
          onUpdate: (s) => {
            r({ ...s });
          },
        },
        null
      );
    }, [r, o]);
  const a = Tt(() => (s) => Rm(o, s));
  return [t, a];
}
const ooe = 1e5,
  Vw = (e) => (e > 0.001 ? 1 / e : ooe);
function aoe(e) {
  let t = No(1),
    r = No(1);
  const { visualElement: n } = g.useContext(_i);
  e
    ? ((t = e.scaleX || t), (r = e.scaleY || r))
    : n && ((t = n.getValue("scaleX", 1)), (r = n.getValue("scaleY", 1)));
  const o = wf(t, Vw),
    a = wf(r, Vw);
  return { scaleX: o, scaleY: a };
}
let soe = 0;
const ioe = ({ children: e }) => (
  g.useEffect(() => {}, []),
  P.jsx(s2, { id: Tt(() => `asl-${soe++}`), children: e })
);
function coe({ source: e, axis: t = "y" }) {
  const r = { value: 0 },
    n = D0(
      (o) => {
        r.value = o[t].progress * 100;
      },
      { container: e, axis: t }
    );
  return { currentTime: r, cancel: n };
}
const Jp = new Map();
function loe({ source: e = document.documentElement, axis: t = "y" } = {}) {
  Jp.has(e) || Jp.set(e, {});
  const r = Jp.get(e);
  return (
    r[t] ||
      (r[t] = kM()
        ? new ScrollTimeline({ source: e, axis: t })
        : coe({ source: e, axis: t })),
    r[t]
  );
}
function uoe(e, t) {
  const r = loe(t);
  return typeof e == "function" ? CM(e, r) : e.attachTimeline(r);
}
function doe(e, t) {
  if (e === "first") return 0;
  {
    const r = t - 1;
    return e === "last" ? r : r / 2;
  }
}
function foe(e = 0.1, { startDelay: t = 0, from: r = 0, ease: n } = {}) {
  return (o, a) => {
    const s = typeof r == "number" ? r : doe(r, a),
      i = Math.abs(s - o);
    let c = e * i;
    if (n) {
      const l = a * e;
      c = Ty(n)(c / l) * l;
    }
    return t + c;
  };
}
const moe = $e,
  hoe = Rc.reduce((e, t) => ((e[t] = (r) => Jt(r)), e), {}),
  poe = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        AcceleratedAnimation: _y,
        AnimatePresence: Pre,
        AnimateSharedLayout: ioe,
        DeprecatedLayoutGroupContext: o2,
        DragControls: g2,
        FlatTree: WM,
        LayoutGroup: s2,
        LayoutGroupContext: ni,
        LazyMotion: Are,
        MotionConfig: Rre,
        MotionConfigContext: kn,
        MotionContext: _i,
        MotionGlobalConfig: vm,
        MotionValue: P0,
        PresenceContext: Ii,
        Reorder: Hre,
        SwitchLayoutGroupContext: Kb,
        VisualElement: E0,
        addPointerEvent: Sn,
        addPointerInfo: VE,
        addScaleCorrector: wE,
        animate: Bne,
        animateValue: SM,
        animateVisualElement: Rm,
        animationControls: m2,
        animations: Am,
        anticipate: vM,
        backIn: km,
        backInOut: pM,
        backOut: b0,
        buildTransform: TE,
        calcLength: er,
        cancelFrame: Jt,
        cancelSync: hoe,
        circIn: Cm,
        circInOut: hM,
        circOut: g0,
        clamp: Zn,
        color: Ct,
        complex: Qn,
        createBox: Qe,
        createDomMotionComponent: xre,
        createMotionComponent: Zb,
        createScopedAnimate: B0,
        cubicBezier: Mi,
        delay: GM,
        disableInstantTransitions: Zne,
        distance: My,
        distance2D: RM,
        domAnimation: l2,
        domMax: Gre,
        domMin: Wre,
        easeIn: dM,
        easeInOut: p0,
        easeOut: fM,
        filterProps: EE,
        frame: $e,
        frameData: it,
        inView: y2,
        interpolate: Tm,
        invariant: ul,
        isBrowser: hm,
        isDragActive: l0,
        isMotionComponent: b2,
        isMotionValue: Xe,
        isValidMotionProp: dl,
        m: $re,
        makeUseVisualState: bm,
        mirrorEasing: v0,
        mix: x0,
        motion: M0,
        motionValue: Zr,
        optimizedAppearDataAttribute: Gb,
        pipe: xn,
        progress: Do,
        px: me,
        resolveMotionValue: zc,
        reverseEasing: y0,
        scroll: uoe,
        scrollInfo: D0,
        spring: wm,
        stagger: foe,
        startOptimizedAppearAnimation: eoe,
        steps: Hd,
        sync: moe,
        transform: c2,
        unwrapMotionComponent: qne,
        useAnimate: Lne,
        useAnimation: Vne,
        useAnimationControls: v2,
        useAnimationFrame: d2,
        useCycle: zne,
        useDeprecatedAnimatedState: noe,
        useDeprecatedInvertedScale: aoe,
        useDomEvent: Kne,
        useDragControls: Une,
        useElementScroll: yne,
        useForceUpdate: F0,
        useInView: Wne,
        useInstantLayoutTransition: S2,
        useInstantTransition: Yne,
        useIsPresent: jte,
        useIsomorphicLayoutEffect: Ho,
        useMotionTemplate: Ure,
        useMotionValue: No,
        useMotionValueEvent: u2,
        usePresence: OM,
        useReducedMotion: f2,
        useReducedMotionConfig: xne,
        useResetProjection: Qne,
        useScroll: N0,
        useSpring: Kre,
        useTime: bne,
        useTransform: wf,
        useUnmountEffect: h2,
        useVelocity: qre,
        useViewportScroll: gne,
        useWillChange: Sne,
        visualElementStore: ai,
        warning: xE,
        wrap: O0,
      },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  tr = Fa(poe);
var $2 = {},
  co = {};
const w2 = (e, t) => e.find((r) => r.id === t);
function voe(e, t) {
  const r = L0(e, t),
    n = r ? e[r].findIndex((o) => o.id === t) : -1;
  return { position: r, index: n };
}
function L0(e, t) {
  for (const [r, n] of Object.entries(e)) if (w2(n, t)) return r;
}
const yoe = (e, t) => !!L0(e, t);
function goe(e) {
  const t = e.includes("right"),
    r = e.includes("left");
  let n = "center";
  return (
    t && (n = "flex-end"),
    r && (n = "flex-start"),
    { display: "flex", flexDirection: "column", alignItems: n }
  );
}
function boe(e) {
  const r = e === "top" || e === "bottom" ? "0 auto" : void 0,
    n = e.includes("top") ? "env(safe-area-inset-top, 0px)" : void 0,
    o = e.includes("bottom") ? "env(safe-area-inset-bottom, 0px)" : void 0,
    a = e.includes("left") ? void 0 : "env(safe-area-inset-right, 0px)",
    s = e.includes("right") ? void 0 : "env(safe-area-inset-left, 0px)";
  return {
    position: "fixed",
    zIndex: "var(--toast-z-index, 5500)",
    pointerEvents: "none",
    display: "flex",
    flexDirection: "column",
    margin: r,
    top: n,
    bottom: o,
    right: a,
    left: s,
  };
}
co.findById = w2;
co.findToast = voe;
co.getToastListStyle = boe;
co.getToastPosition = L0;
co.getToastStyle = goe;
co.isVisible = yoe;
var M = {},
  Em = {};
function Soe(e) {
  for (var t = 0, r, n = 0, o = e.length; o >= 4; ++n, o -= 4)
    (r =
      (e.charCodeAt(n) & 255) |
      ((e.charCodeAt(++n) & 255) << 8) |
      ((e.charCodeAt(++n) & 255) << 16) |
      ((e.charCodeAt(++n) & 255) << 24)),
      (r = (r & 65535) * 1540483477 + (((r >>> 16) * 59797) << 16)),
      (r ^= r >>> 24),
      (t =
        ((r & 65535) * 1540483477 + (((r >>> 16) * 59797) << 16)) ^
        ((t & 65535) * 1540483477 + (((t >>> 16) * 59797) << 16)));
  switch (o) {
    case 3:
      t ^= (e.charCodeAt(n + 2) & 255) << 16;
    case 2:
      t ^= (e.charCodeAt(n + 1) & 255) << 8;
    case 1:
      (t ^= e.charCodeAt(n) & 255),
        (t = (t & 65535) * 1540483477 + (((t >>> 16) * 59797) << 16));
  }
  return (
    (t ^= t >>> 13),
    (t = (t & 65535) * 1540483477 + (((t >>> 16) * 59797) << 16)),
    ((t ^ (t >>> 15)) >>> 0).toString(36)
  );
}
var xoe = {
    animationIterationCount: 1,
    aspectRatio: 1,
    borderImageOutset: 1,
    borderImageSlice: 1,
    borderImageWidth: 1,
    boxFlex: 1,
    boxFlexGroup: 1,
    boxOrdinalGroup: 1,
    columnCount: 1,
    columns: 1,
    flex: 1,
    flexGrow: 1,
    flexPositive: 1,
    flexShrink: 1,
    flexNegative: 1,
    flexOrder: 1,
    gridRow: 1,
    gridRowEnd: 1,
    gridRowSpan: 1,
    gridRowStart: 1,
    gridColumn: 1,
    gridColumnEnd: 1,
    gridColumnSpan: 1,
    gridColumnStart: 1,
    msGridRow: 1,
    msGridRowSpan: 1,
    msGridColumn: 1,
    msGridColumnSpan: 1,
    fontWeight: 1,
    lineHeight: 1,
    opacity: 1,
    order: 1,
    orphans: 1,
    scale: 1,
    tabSize: 1,
    widows: 1,
    zIndex: 1,
    zoom: 1,
    WebkitLineClamp: 1,
    fillOpacity: 1,
    floodOpacity: 1,
    stopOpacity: 1,
    strokeDasharray: 1,
    strokeDashoffset: 1,
    strokeMiterlimit: 1,
    strokeOpacity: 1,
    strokeWidth: 1,
  },
  $oe = !1,
  woe = /[A-Z]|^ms/g,
  Coe = /_EMO_([^_]+?)_([^]*?)_EMO_/g,
  C2 = function (t) {
    return t.charCodeAt(1) === 45;
  },
  zw = function (t) {
    return t != null && typeof t != "boolean";
  },
  ev = Pb(function (e) {
    return C2(e) ? e : e.replace(woe, "-$&").toLowerCase();
  }),
  Hw = function (t, r) {
    switch (t) {
      case "animation":
      case "animationName":
        if (typeof r == "string")
          return r.replace(Coe, function (n, o, a) {
            return (hn = { name: o, styles: a, next: hn }), o;
          });
    }
    return xoe[t] !== 1 && !C2(t) && typeof r == "number" && r !== 0
      ? r + "px"
      : r;
  },
  koe =
    "Component selectors can only be used in conjunction with @emotion/babel-plugin, the swc Emotion plugin, or another Emotion-aware compiler transform.";
function hl(e, t, r) {
  if (r == null) return "";
  var n = r;
  if (n.__emotion_styles !== void 0) return n;
  switch (typeof r) {
    case "boolean":
      return "";
    case "object": {
      var o = r;
      if (o.anim === 1)
        return (hn = { name: o.name, styles: o.styles, next: hn }), o.name;
      var a = r;
      if (a.styles !== void 0) {
        var s = a.next;
        if (s !== void 0)
          for (; s !== void 0; )
            (hn = { name: s.name, styles: s.styles, next: hn }), (s = s.next);
        var i = a.styles + ";";
        return i;
      }
      return Toe(e, t, r);
    }
    case "function": {
      if (e !== void 0) {
        var c = hn,
          l = r(e);
        return (hn = c), hl(e, t, l);
      }
      break;
    }
  }
  var u = r;
  if (t == null) return u;
  var d = t[u];
  return d !== void 0 ? d : u;
}
function Toe(e, t, r) {
  var n = "";
  if (Array.isArray(r))
    for (var o = 0; o < r.length; o++) n += hl(e, t, r[o]) + ";";
  else
    for (var a in r) {
      var s = r[a];
      if (typeof s != "object") {
        var i = s;
        t != null && t[i] !== void 0
          ? (n += a + "{" + t[i] + "}")
          : zw(i) && (n += ev(a) + ":" + Hw(a, i) + ";");
      } else {
        if (a === "NO_COMPONENT_SELECTOR" && $oe) throw new Error(koe);
        if (
          Array.isArray(s) &&
          typeof s[0] == "string" &&
          (t == null || t[s[0]] === void 0)
        )
          for (var c = 0; c < s.length; c++)
            zw(s[c]) && (n += ev(a) + ":" + Hw(a, s[c]) + ";");
        else {
          var l = hl(e, t, s);
          switch (a) {
            case "animation":
            case "animationName": {
              n += ev(a) + ":" + l + ";";
              break;
            }
            default:
              n += a + "{" + l + "}";
          }
        }
      }
    }
  return n;
}
var Ww = /label:\s*([^\s;{]+)\s*(;|$)/g,
  hn;
function Poe(e, t, r) {
  if (
    e.length === 1 &&
    typeof e[0] == "object" &&
    e[0] !== null &&
    e[0].styles !== void 0
  )
    return e[0];
  var n = !0,
    o = "";
  hn = void 0;
  var a = e[0];
  if (a == null || a.raw === void 0) (n = !1), (o += hl(r, t, a));
  else {
    var s = a;
    o += s[0];
  }
  for (var i = 1; i < e.length; i++)
    if (((o += hl(r, t, e[i])), n)) {
      var c = a;
      o += c[i];
    }
  Ww.lastIndex = 0;
  for (var l = "", u; (u = Ww.exec(o)) !== null; ) l += "-" + u[1];
  var d = Soe(o) + l;
  return { name: d, styles: o, next: hn };
}
var Roe = !0;
function Aoe(e, t, r) {
  var n = "";
  return (
    r.split(" ").forEach(function (o) {
      e[o] !== void 0 ? t.push(e[o] + ";") : o && (n += o + " ");
    }),
    n
  );
}
var k2 = function (t, r, n) {
    var o = t.key + "-" + r.name;
    (n === !1 || Roe === !1) &&
      t.registered[o] === void 0 &&
      (t.registered[o] = r.styles);
  },
  _oe = function (t, r, n) {
    k2(t, r, n);
    var o = t.key + "-" + r.name;
    if (t.inserted[r.name] === void 0) {
      var a = r;
      do t.insert(r === a ? "." + o : "", a, t.sheet, !0), (a = a.next);
      while (a !== void 0);
    }
  },
  Ioe =
    /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|disableRemotePlayback|download|draggable|encType|enterKeyHint|fetchpriority|fetchPriority|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/,
  Eoe = Pb(function (e) {
    return (
      Ioe.test(e) ||
      (e.charCodeAt(0) === 111 &&
        e.charCodeAt(1) === 110 &&
        e.charCodeAt(2) < 91)
    );
  }),
  Moe = !1,
  Foe = Eoe,
  joe = function (t) {
    return t !== "theme";
  },
  Gw = function (t) {
    return typeof t == "string" && t.charCodeAt(0) > 96 ? Foe : joe;
  },
  Uw = function (t, r, n) {
    var o;
    if (r) {
      var a = r.shouldForwardProp;
      o =
        t.__emotion_forwardProp && a
          ? function (s) {
              return t.__emotion_forwardProp(s) && a(s);
            }
          : a;
    }
    return typeof o != "function" && n && (o = t.__emotion_forwardProp), o;
  },
  Doe = function (t) {
    var r = t.cache,
      n = t.serialized,
      o = t.isStringTag;
    return (
      k2(r, n, o),
      jb(function () {
        return _oe(r, n, o);
      }),
      null
    );
  },
  Noe = function e(t, r) {
    var n = t.__emotion_real === t,
      o = (n && t.__emotion_base) || t,
      a,
      s;
    r !== void 0 && ((a = r.label), (s = r.target));
    var i = Uw(t, r, n),
      c = i || Gw(o),
      l = !c("as");
    return function () {
      var u = arguments,
        d =
          n && t.__emotion_styles !== void 0 ? t.__emotion_styles.slice(0) : [];
      if (
        (a !== void 0 && d.push("label:" + a + ";"),
        u[0] == null || u[0].raw === void 0)
      )
        d.push.apply(d, u);
      else {
        var f = u[0];
        d.push(f[0]);
        for (var m = u.length, h = 1; h < m; h++) d.push(u[h], f[h]);
      }
      var p = Nl(function (v, b, y) {
        var S = (l && v.as) || o,
          w = "",
          C = [],
          T = v;
        if (v.theme == null) {
          T = {};
          for (var k in v) T[k] = v[k];
          T.theme = g.useContext(Yn);
        }
        typeof v.className == "string"
          ? (w = Aoe(b.registered, C, v.className))
          : v.className != null && (w = v.className + " ");
        var R = Poe(d.concat(C), b.registered, T);
        (w += b.key + "-" + R.name), s !== void 0 && (w += " " + s);
        var E = l && i === void 0 ? Gw(S) : c,
          _ = {};
        for (var N in v) (l && N === "as") || (E(N) && (_[N] = v[N]));
        return (
          (_.className = w),
          y && (_.ref = y),
          g.createElement(
            g.Fragment,
            null,
            g.createElement(Doe, {
              cache: b,
              serialized: R,
              isStringTag: typeof S == "string",
            }),
            g.createElement(S, _)
          )
        );
      });
      return (
        (p.displayName =
          a !== void 0
            ? a
            : "Styled(" +
              (typeof o == "string"
                ? o
                : o.displayName || o.name || "Component") +
              ")"),
        (p.defaultProps = t.defaultProps),
        (p.__emotion_real = p),
        (p.__emotion_base = o),
        (p.__emotion_styles = d),
        (p.__emotion_forwardProp = i),
        Object.defineProperty(p, "toString", {
          value: function () {
            return s === void 0 && Moe ? "NO_COMPONENT_SELECTOR" : "." + s;
          },
        }),
        (p.withComponent = function (v, b) {
          var y = e(v, yr({}, r, b, { shouldForwardProp: Uw(p, b, !0) }));
          return y.apply(void 0, d);
        }),
        p
      );
    };
  },
  Ooe = [
    "a",
    "abbr",
    "address",
    "area",
    "article",
    "aside",
    "audio",
    "b",
    "base",
    "bdi",
    "bdo",
    "big",
    "blockquote",
    "body",
    "br",
    "button",
    "canvas",
    "caption",
    "cite",
    "code",
    "col",
    "colgroup",
    "data",
    "datalist",
    "dd",
    "del",
    "details",
    "dfn",
    "dialog",
    "div",
    "dl",
    "dt",
    "em",
    "embed",
    "fieldset",
    "figcaption",
    "figure",
    "footer",
    "form",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "head",
    "header",
    "hgroup",
    "hr",
    "html",
    "i",
    "iframe",
    "img",
    "input",
    "ins",
    "kbd",
    "keygen",
    "label",
    "legend",
    "li",
    "link",
    "main",
    "map",
    "mark",
    "marquee",
    "menu",
    "menuitem",
    "meta",
    "meter",
    "nav",
    "noscript",
    "object",
    "ol",
    "optgroup",
    "option",
    "output",
    "p",
    "param",
    "picture",
    "pre",
    "progress",
    "q",
    "rp",
    "rt",
    "ruby",
    "s",
    "samp",
    "script",
    "section",
    "select",
    "small",
    "source",
    "span",
    "strong",
    "style",
    "sub",
    "summary",
    "sup",
    "table",
    "tbody",
    "td",
    "textarea",
    "tfoot",
    "th",
    "thead",
    "time",
    "title",
    "tr",
    "track",
    "u",
    "ul",
    "var",
    "video",
    "wbr",
    "circle",
    "clipPath",
    "defs",
    "ellipse",
    "foreignObject",
    "g",
    "image",
    "line",
    "linearGradient",
    "mask",
    "path",
    "pattern",
    "polygon",
    "polyline",
    "radialGradient",
    "rect",
    "stop",
    "svg",
    "text",
    "tspan",
  ],
  Ly = Noe.bind(null);
Ooe.forEach(function (e) {
  Ly[e] = Ly(e);
});
const Boe = Object.freeze(
    Object.defineProperty(
      { __proto__: null, default: Ly },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  Loe = Fa(Boe);
var V0 = {},
  Voe = I;
const zoe = new Set([
    ...Voe.propNames,
    "textStyle",
    "layerStyle",
    "apply",
    "noOfLines",
    "focusBorderColor",
    "errorBorderColor",
    "as",
    "__css",
    "css",
    "sx",
  ]),
  Hoe = new Set(["htmlWidth", "htmlHeight", "htmlSize", "htmlTranslate"]);
function Woe(e) {
  return (Hoe.has(e) || !zoe.has(e)) && e[0] !== "_";
}
V0.shouldForwardProp = Woe;
var Kw = I,
  Ic = x,
  Goe = Loe,
  qw = g,
  Uoe = V0,
  Koe = so;
const qoe = Ic.interopDefault(Goe),
  T2 =
    ({ baseStyle: e }) =>
    (t) => {
      const { theme: r, css: n, __css: o, sx: a, ...s } = t,
        [i] = Ic.splitProps(s, Kw.isStyleProp),
        c = Ic.runIfFn(e, t),
        l = Ic.assignAfter({}, o, c, Ic.compact(i), a),
        u = Kw.css(l)(t.theme);
      return n ? [u, n] : u;
    };
function Xoe(e, t) {
  const { baseStyle: r, ...n } = t ?? {};
  n.shouldForwardProp || (n.shouldForwardProp = Uoe.shouldForwardProp);
  const o = T2({ baseStyle: r }),
    a = qoe(e, n)(o);
  return qw.forwardRef(function (c, l) {
    const { children: u, ...d } = c,
      { colorMode: f, forced: m } = Koe.useColorMode(),
      h = m ? f : void 0;
    return qw.createElement(a, { ref: l, "data-theme": h, ...d }, u);
  });
}
Em.styled = Xoe;
Em.toCSSObject = T2;
var tv = Em;
function Yoe() {
  const e = new Map();
  return new Proxy(tv.styled, {
    apply(t, r, n) {
      return tv.styled(...n);
    },
    get(t, r) {
      return e.has(r) || e.set(r, tv.styled(r)), e.get(r);
    },
  });
}
const Zoe = Yoe();
M.chakra = Zoe;
var Xw = P,
  rv = le,
  Qoe = x,
  Yw = tr,
  hc = g,
  Joe = co,
  eae = M;
const tae = {
    initial: (e) => {
      const { position: t } = e,
        r = ["top", "bottom"].includes(t) ? "y" : "x";
      let n = ["top-right", "bottom-right"].includes(t) ? 1 : -1;
      return t === "bottom" && (n = 1), { opacity: 0, [r]: n * 24 };
    },
    animate: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
    },
    exit: {
      opacity: 0,
      scale: 0.85,
      transition: { duration: 0.2, ease: [0.4, 0, 1, 1] },
    },
  },
  P2 = hc.memo((e) => {
    const {
        id: t,
        message: r,
        onCloseComplete: n,
        onRequestRemove: o,
        requestClose: a = !1,
        position: s = "bottom",
        duration: i = 5e3,
        containerStyle: c,
        motionVariants: l = tae,
        toastSpacing: u = "0.5rem",
      } = e,
      [d, f] = hc.useState(i),
      m = Yw.useIsPresent();
    rv.useUpdateEffect(() => {
      m || n == null || n();
    }, [m]),
      rv.useUpdateEffect(() => {
        f(i);
      }, [i]);
    const h = () => f(null),
      p = () => f(i),
      v = () => {
        m && o();
      };
    hc.useEffect(() => {
      m && a && o();
    }, [m, a, o]),
      rv.useTimeout(v, d);
    const b = hc.useMemo(
        () => ({
          pointerEvents: "auto",
          maxWidth: 560,
          minWidth: 300,
          margin: u,
          ...c,
        }),
        [c, u]
      ),
      y = hc.useMemo(() => Joe.getToastStyle(s), [s]);
    return Xw.jsx(Yw.motion.div, {
      layout: !0,
      className: "chakra-toast",
      variants: l,
      initial: "initial",
      animate: "animate",
      exit: "exit",
      onHoverStart: h,
      onHoverEnd: p,
      custom: { position: s },
      style: y,
      children: Xw.jsx(eae.chakra.div, {
        role: "status",
        "aria-atomic": "true",
        className: "chakra-toast__inner",
        __css: b,
        children: Qoe.runIfFn(r, { id: t, onClose: v }),
      }),
    });
  });
P2.displayName = "ToastComponent";
$2.ToastComponent = P2;
var Mm = {},
  Wl = {},
  z0 = {},
  tn = {},
  Fm = {},
  Dr = {},
  D = {},
  rae = g;
function nae(e) {
  return rae.forwardRef(e);
}
D.forwardRef = nae;
var he = {},
  oae = typeof Element < "u",
  aae = typeof Map == "function",
  sae = typeof Set == "function",
  iae = typeof ArrayBuffer == "function" && !!ArrayBuffer.isView;
function qd(e, t) {
  if (e === t) return !0;
  if (e && t && typeof e == "object" && typeof t == "object") {
    if (e.constructor !== t.constructor) return !1;
    var r, n, o;
    if (Array.isArray(e)) {
      if (((r = e.length), r != t.length)) return !1;
      for (n = r; n-- !== 0; ) if (!qd(e[n], t[n])) return !1;
      return !0;
    }
    var a;
    if (aae && e instanceof Map && t instanceof Map) {
      if (e.size !== t.size) return !1;
      for (a = e.entries(); !(n = a.next()).done; )
        if (!t.has(n.value[0])) return !1;
      for (a = e.entries(); !(n = a.next()).done; )
        if (!qd(n.value[1], t.get(n.value[0]))) return !1;
      return !0;
    }
    if (sae && e instanceof Set && t instanceof Set) {
      if (e.size !== t.size) return !1;
      for (a = e.entries(); !(n = a.next()).done; )
        if (!t.has(n.value[0])) return !1;
      return !0;
    }
    if (iae && ArrayBuffer.isView(e) && ArrayBuffer.isView(t)) {
      if (((r = e.length), r != t.length)) return !1;
      for (n = r; n-- !== 0; ) if (e[n] !== t[n]) return !1;
      return !0;
    }
    if (e.constructor === RegExp)
      return e.source === t.source && e.flags === t.flags;
    if (
      e.valueOf !== Object.prototype.valueOf &&
      typeof e.valueOf == "function" &&
      typeof t.valueOf == "function"
    )
      return e.valueOf() === t.valueOf();
    if (
      e.toString !== Object.prototype.toString &&
      typeof e.toString == "function" &&
      typeof t.toString == "function"
    )
      return e.toString() === t.toString();
    if (((o = Object.keys(e)), (r = o.length), r !== Object.keys(t).length))
      return !1;
    for (n = r; n-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(t, o[n])) return !1;
    if (oae && e instanceof Element) return !1;
    for (n = r; n-- !== 0; )
      if (
        !(
          (o[n] === "_owner" || o[n] === "__v" || o[n] === "__o") &&
          e.$$typeof
        ) &&
        !qd(e[o[n]], t[o[n]])
      )
        return !1;
    return !0;
  }
  return e !== e && t !== t;
}
var cae = function (t, r) {
    try {
      return qd(t, r);
    } catch (n) {
      if ((n.message || "").match(/stack|recursion/i))
        return (
          console.warn("react-fast-compare cannot handle circular refs"), !1
        );
      throw n;
    }
  },
  Go = {},
  $r = {},
  lae = Vo,
  uae = g;
function dae() {
  const e = uae.useContext(lae.ThemeContext);
  if (!e)
    throw Error(
      "useTheme: `theme` is undefined. Seems you forgot to wrap your app in `<ChakraProvider />` or `<ThemeProvider />`"
    );
  return e;
}
$r.useTheme = dae;
var R2 = $r,
  fae = so;
function mae() {
  const e = fae.useColorMode(),
    t = R2.useTheme();
  return { ...e, theme: t };
}
function hae(e, t, r) {
  if (t == null) return t;
  const n = (o) => {
    var a, s;
    return (s = (a = e.__breakpoints) == null ? void 0 : a.asArray) == null
      ? void 0
      : s[o];
  };
  return n(t) ?? n(r) ?? r;
}
function pae(e, t, r) {
  if (t == null) return t;
  const n = (o) => {
    var a, s;
    return (s = (a = e.__cssMap) == null ? void 0 : a[o]) == null
      ? void 0
      : s.value;
  };
  return n(t) ?? n(r) ?? r;
}
function vae(e, t, r) {
  const n = R2.useTheme();
  return A2(e, t, r)(n);
}
function A2(e, t, r) {
  const n = Array.isArray(t) ? t : [t],
    o = Array.isArray(r) ? r : [r];
  return (a) => {
    const s = o.filter(Boolean),
      i = n.map((c, l) => {
        if (e === "breakpoints") return hae(a, c, s[l] ?? c);
        const u = `${e}.${c}`;
        return pae(a, u, s[l] ?? c);
      });
    return Array.isArray(t) ? i : i[0];
  };
}
Go.getToken = A2;
Go.useChakra = mae;
Go.useToken = vae;
var yae = I,
  ed = x,
  gae = g,
  bae = cae,
  Sae = Go;
function _2(e, t = {}) {
  const { styleConfig: r, ...n } = t,
    { theme: o, colorMode: a } = Sae.useChakra(),
    s = e ? ed.memoizedGet(o, `components.${e}`) : void 0,
    i = r || s,
    c = ed.mergeWith(
      { theme: o, colorMode: a },
      (i == null ? void 0 : i.defaultProps) ?? {},
      ed.compact(ed.omit(n, ["children"])),
      (u, d) => (u ? void 0 : d)
    ),
    l = gae.useRef({});
  if (i) {
    const d = yae.resolveStyleConfig(i)(c);
    bae(l.current, d) || (l.current = d);
  }
  return l.current;
}
function xae(e, t = {}) {
  return _2(e, t);
}
function $ae(e, t = {}) {
  return _2(e, t);
}
he.useMultiStyleConfig = $ae;
he.useStyleConfig = xae;
var Bs = P,
  wae = x,
  Cae = D,
  kae = he,
  Zw = M;
const Qw = {
    path: Bs.jsxs("g", {stroke: "currentColor",
      strokeWidth: "1.5",
      children: [
        Bs.jsx("path", {
          strokeLinecap: "round",
          fill: "none",
          d: "M9,9a3,3,0,1,1,4,2.829,1.5,1.5,0,0,0-1,1.415V14.25",
        }),
        Bs.jsx("path", {fill: "currentColor",
          strokeLinecap: "round",
          d: "M12,17.25a.375.375,0,1,0,.375.375A.375.375,0,0,0,12,17.25h0",
        }),
        Bs.jsx("circle", {fill: "none",
          strokeMiterlimit: "10",
          cx: "12",
          cy: "12",
          r: "11.25",
        }),
      ],
    }),
    viewBox: "0 0 24 24",
  },
  I2 = Cae.forwardRef((e, t) => {
    const {
        as: r,
        viewBox: n,
        color: o = "currentColor",
        focusable: a = !1,
        children: s,
        className: i,
        __css: c,
        ...l
      } = e,
      u = wae.cx("chakra-icon", i),
      d = kae.useStyleConfig("Icon", e),
      f = {
        w: "1em",
        h: "1em",
        display: "inline-block",
        lineHeight: "1em",
        flexShrink: 0,
        color: o,
        ...c,
        ...d,
      },
      m = { ref: t, focusable: a, className: u, __css: f },
      h = n ?? Qw.viewBox;
    if (r && typeof r != "string")
      return Bs.jsx(Zw.chakra.svg, { as: r, ...m, ...l });
    const p = s ?? Qw.path;
    return Bs.jsx(Zw.chakra.svg, {
      verticalAlign: "middle",
      viewBox: h,
      ...m,
      ...l,
      children: p,
    });
  });
I2.displayName = "Icon";
Dr.Icon = I2;
var si = P,
  H0 = Dr;
function Tae(e) {
  return si.jsx(H0.Icon, {
    viewBox: "0 0 24 24",
    ...e,
    children: si.jsx("path", {fill: "currentColor",
      d: "M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z",
    }),
  });
}
function Pae(e) {
  return si.jsx(H0.Icon, {
    viewBox: "0 0 24 24",
    ...e,
    children: si.jsx("path", {fill: "currentColor",
      d: "M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm.25,5a1.5,1.5,0,1,1-1.5,1.5A1.5,1.5,0,0,1,12.25,5ZM14.5,18.5h-4a1,1,0,0,1,0-2h.75a.25.25,0,0,0,.25-.25v-4.5a.25.25,0,0,0-.25-.25H10.5a1,1,0,0,1,0-2h1a2,2,0,0,1,2,2v4.75a.25.25,0,0,0,.25.25h.75a1,1,0,1,1,0,2Z",
    }),
  });
}
function Rae(e) {
  return si.jsx(H0.Icon, {
    viewBox: "0 0 24 24",
    ...e,
    children: si.jsx("path", {fill: "currentColor",
      d: "M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z",
    }),
  });
}
Fm.CheckIcon = Tae;
Fm.InfoIcon = Pae;
Fm.WarningIcon = Rae;
var jm = {},
  Jw = P,
  Aae = I,
  _ae = x,
  Iae = Vo,
  Eae = D,
  Mae = he,
  eC = M;
const Fae = Iae.keyframes({
    "0%": { transform: "rotate(0deg)" },
    "100%": { transform: "rotate(360deg)" },
  }),
  E2 = Eae.forwardRef((e, t) => {
    const r = Mae.useStyleConfig("Spinner", e),
      {
        label: n = "Loading...",
        thickness: o = "2px",
        speed: a = "0.45s",
        emptyColor: s = "transparent",
        className: i,
        ...c
      } = Aae.omitThemingProps(e),
      l = _ae.cx("chakra-spinner", i),
      u = {
        display: "inline-block",
        borderColor: "currentColor",
        borderStyle: "solid",
        borderRadius: "99999px",
        borderWidth: o,
        borderBottomColor: s,
        borderLeftColor: s,
        animation: `${Fae} ${a} linear infinite`,
        ...r,
      };
    return Jw.jsx(eC.chakra.div, {
      ref: t,
      __css: u,
      className: l,
      ...c,
      children: n && Jw.jsx(eC.chakra.span, { srOnly: !0, children: n }),
    });
  });
E2.displayName = "Spinner";
jm.Spinner = E2;
var M2 = x,
  td = Fm,
  jae = jm;
const [Dae, Nae] = M2.createContext({
    name: "AlertContext",
    hookName: "useAlertContext",
    providerName: "<Alert />",
  }),
  [Oae, Bae] = M2.createContext({
    name: "AlertStylesContext",
    hookName: "useAlertStyles",
    providerName: "<Alert />",
  }),
  F2 = {
    info: { icon: td.InfoIcon, colorScheme: "blue" },
    warning: { icon: td.WarningIcon, colorScheme: "orange" },
    success: { icon: td.CheckIcon, colorScheme: "green" },
    error: { icon: td.WarningIcon, colorScheme: "red" },
    loading: { icon: jae.Spinner, colorScheme: "blue" },
  };
function Lae(e) {
  return F2[e].colorScheme;
}
function Vae(e) {
  return F2[e].icon;
}
tn.AlertProvider = Dae;
tn.AlertStylesProvider = Oae;
tn.getStatusColorScheme = Lae;
tn.getStatusIcon = Vae;
tn.useAlertContext = Nae;
tn.useAlertStyles = Bae;
var nv = P,
  tC = I,
  zae = x,
  ov = tn,
  Hae = he,
  Wae = D,
  Gae = M;
const j2 = Wae.forwardRef(function (t, r) {
  const { status: n = "info", addRole: o = !0, ...a } = tC.omitThemingProps(t),
    s = t.colorScheme ?? ov.getStatusColorScheme(n),
    i = Hae.useMultiStyleConfig("Alert", { ...t, colorScheme: s }),
    c = tC.defineStyle({
      width: "100%",
      display: "flex",
      alignItems: "center",
      position: "relative",
      overflow: "hidden",
      ...i.container,
    });
  return nv.jsx(ov.AlertProvider, {
    value: { status: n },
    children: nv.jsx(ov.AlertStylesProvider, {
      value: i,
      children: nv.jsx(Gae.chakra.div, {
        "data-status": n,
        role: o ? "alert" : void 0,
        ref: r,
        ...a,
        className: zae.cx("chakra-alert", t.className),
        __css: c,
      }),
    }),
  });
});
j2.displayName = "Alert";
z0.Alert = j2;
var W0 = {},
  rC = P,
  Uae = x,
  av = tn,
  Kae = M;
function D2(e) {
  const { status: t } = av.useAlertContext(),
    r = av.getStatusIcon(t),
    n = av.useAlertStyles(),
    o = t === "loading" ? n.spinner : n.icon;
  return rC.jsx(Kae.chakra.span, {
    display: "inherit",
    "data-status": t,
    ...e,
    className: Uae.cx("chakra-alert__icon", e.className),
    __css: o,
    children: e.children || rC.jsx(r, { h: "100%", w: "100%" }),
  });
}
D2.displayName = "AlertIcon";
W0.AlertIcon = D2;
var G0 = {},
  qae = P,
  Xae = x,
  nC = tn,
  Yae = D,
  Zae = M;
const N2 = Yae.forwardRef(function (t, r) {
  const n = nC.useAlertStyles(),
    { status: o } = nC.useAlertContext();
  return qae.jsx(Zae.chakra.div, {
    ref: r,
    "data-status": o,
    ...t,
    className: Xae.cx("chakra-alert__title", t.className),
    __css: n.title,
  });
});
N2.displayName = "AlertTitle";
G0.AlertTitle = N2;
var U0 = {},
  Qae = P,
  Jae = I,
  ese = x,
  oC = tn,
  tse = D,
  rse = M;
const O2 = tse.forwardRef(function (t, r) {
  const { status: n } = oC.useAlertContext(),
    o = oC.useAlertStyles(),
    a = Jae.defineStyle({ display: "inline", ...o.description });
  return Qae.jsx(rse.chakra.div, {
    ref: r,
    "data-status": n,
    ...t,
    className: ese.cx("chakra-alert__desc", t.className),
    __css: a,
  });
});
O2.displayName = "AlertDescription";
U0.AlertDescription = O2;
var Gl = {},
  Cf = P,
  nse = I,
  ose = Dr,
  ase = D,
  sse = he,
  ise = M;
function cse(e) {
  return Cf.jsx(ose.Icon, {
    focusable: "false",
    "aria-hidden": !0,
    ...e,
    children: Cf.jsx("path", {fill: "currentColor",
      d: "M.439,21.44a1.5,1.5,0,0,0,2.122,2.121L11.823,14.3a.25.25,0,0,1,.354,0l9.262,9.263a1.5,1.5,0,1,0,2.122-2.121L14.3,12.177a.25.25,0,0,1,0-.354l9.263-9.262A1.5,1.5,0,0,0,21.439.44L12.177,9.7a.25.25,0,0,1-.354,0L2.561.44A1.5,1.5,0,0,0,.439,2.561L9.7,11.823a.25.25,0,0,1,0,.354Z",
    }),
  });
}
const B2 = ase.forwardRef(function (t, r) {
  const n = sse.useStyleConfig("CloseButton", t),
    { children: o, isDisabled: a, __css: s, ...i } = nse.omitThemingProps(t),
    c = {outline: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    };
  return Cf.jsx(ise.chakra.button, {
    type: "button",
    "aria-label": "Close",
    ref: r,
    disabled: a,
    __css: { ...c, ...n, ...s },
    ...i,
    children: o || Cf.jsx(cse, { width: "1em", height: "1em" }),
  });
});
B2.displayName = "CloseButton";
Gl.CloseButton = B2;
var da = P,
  lse = z0,
  use = W0,
  dse = G0,
  fse = U0,
  mse = Gl,
  hse = M;
const L2 = (e) => {
  const {
      status: t,
      variant: r = "solid",
      id: n,
      title: o,
      isClosable: a,
      onClose: s,
      description: i,
      colorScheme: c,
      icon: l,
    } = e,
    u = n
      ? {
          root: `toast-${n}`,
          title: `toast-${n}-title`,
          description: `toast-${n}-description`,
        }
      : void 0;
  return da.jsxs(lse.Alert, {
    addRole: !1,
    status: t,
    variant: r,
    id: u == null ? void 0 : u.root,
    alignItems: "start",
    borderRadius: "md",
    boxShadow: "lg",
    paddingEnd: 8,
    textAlign: "start",
    width: "auto",
    colorScheme: c,
    children: [
      da.jsx(use.AlertIcon, { children: l }),
      da.jsxs(hse.chakra.div, {
        flex: "1",
        maxWidth: "100%",
        children: [
          o &&
            da.jsx(dse.AlertTitle, {
              id: u == null ? void 0 : u.title,
              children: o,
            }),
          i &&
            da.jsx(fse.AlertDescription, {
              id: u == null ? void 0 : u.description,
              display: "block",
              children: i,
            }),
        ],
      }),
      a &&
        da.jsx(mse.CloseButton, {
          size: "sm",
          onClick: s,
          position: "absolute",
          insetEnd: 1,
          top: 1,
        }),
    ],
  });
};
function pse(e = {}) {
  const { render: t, toastComponent: r = L2 } = e;
  return (o) =>
    typeof t == "function" ? t({ ...o, ...e }) : da.jsx(r, { ...o, ...e });
}
Wl.Toast = L2;
Wl.createRenderToast = pse;
var vse = Wl,
  sv = co;
const yse = {
    top: [],
    "top-left": [],
    "top-right": [],
    "bottom-left": [],
    bottom: [],
    "bottom-right": [],
  },
  K0 = gse(yse);
function gse(e) {
  let t = e;
  const r = new Set(),
    n = (o) => {
      (t = o(t)), r.forEach((a) => a());
    };
  return {
    getState: () => t,
    subscribe: (o) => (
      r.add(o),
      () => {
        n(() => e), r.delete(o);
      }
    ),
    removeToast: (o, a) => {
      n((s) => ({ ...s, [a]: s[a].filter((i) => i.id != o) }));
    },
    notify: (o, a) => {
      const s = bse(o, a),
        { position: i, id: c } = s;
      return (
        n((l) => {
          const d = i.includes("top")
            ? [s, ...(l[i] ?? [])]
            : [...(l[i] ?? []), s];
          return { ...l, [i]: d };
        }),
        c
      );
    },
    update: (o, a) => {
      o &&
        n((s) => {
          const i = { ...s },
            { position: c, index: l } = sv.findToast(i, o);
          return (
            c &&
              l !== -1 &&
              (i[c][l] = {
                ...i[c][l],
                ...a,
                message: vse.createRenderToast(a),
              }),
            i
          );
        });
    },
    closeAll: ({ positions: o } = {}) => {
      n((a) =>
        (
          o ?? [
            "bottom",
            "bottom-right",
            "bottom-left",
            "top",
            "top-left",
            "top-right",
          ]
        ).reduce(
          (c, l) => ((c[l] = a[l].map((u) => ({ ...u, requestClose: !0 }))), c),
          { ...a }
        )
      );
    },
    close: (o) => {
      n((a) => {
        const s = sv.getToastPosition(a, o);
        return s
          ? {
              ...a,
              [s]: a[s].map((i) =>
                i.id == o ? { ...i, requestClose: !0 } : i
              ),
            }
          : a;
      });
    },
    isActive: (o) => !!sv.findToast(K0.getState(), o).position,
  };
}
let aC = 0;
function bse(e, t = {}) {
  aC += 1;
  const r = t.id ?? aC,
    n = t.position ?? "bottom";
  return {
    id: r,
    message: e,
    position: n,
    duration: t.duration,
    onCloseComplete: t.onCloseComplete,
    onRequestRemove: () => K0.removeToast(String(r), n),
    status: t.status,
    requestClose: !1,
    containerStyle: t.containerStyle,
  };
}
Mm.toastStore = K0;
var Ul = {},
  $a = P,
  Vy = le,
  Sse = x,
  Ls = g,
  V2 = Az,
  xse = Ol;
const [z2, $se] = Sse.createContext({ strict: !1, name: "PortalContext" }),
  q0 = "chakra-portal",
  wse = ".chakra-portal",
  Cse = (e) =>
    $a.jsx("div", {
      className: "chakra-portal-zIndex",
      style: {
        position: "absolute",
        zIndex: e.zIndex,
        top: 0,
        left: 0,
        right: 0,
      },
      children: e.children,
    }),
  kse = (e) => {
    const { appendToParentPortal: t, children: r } = e,
      [n, o] = Ls.useState(null),
      a = Ls.useRef(null),
      [, s] = Ls.useState({});
    Ls.useEffect(() => s({}), []);
    const i = $se(),
      c = xse.usePortalManager();
    Vy.useSafeLayoutEffect(() => {
      if (!n) return;
      const u = n.ownerDocument,
        d = t ? i ?? u.body : u.body;
      if (!d) return;
      (a.current = u.createElement("div")),
        (a.current.className = q0),
        d.appendChild(a.current),
        s({});
      const f = a.current;
      return () => {
        d.contains(f) && d.removeChild(f);
      };
    }, [n]);
    const l =
      c != null && c.zIndex
        ? $a.jsx(Cse, { zIndex: c == null ? void 0 : c.zIndex, children: r })
        : r;
    return a.current
      ? V2.createPortal(
          $a.jsx(z2, { value: a.current, children: l }),
          a.current
        )
      : $a.jsx("span", {
          ref: (u) => {
            u && o(u);
          },
        });
  },
  Tse = (e) => {
    const { children: t, containerRef: r, appendToParentPortal: n } = e,
      o = r.current,
      a = o ?? (typeof window < "u" ? document.body : void 0),
      s = Ls.useMemo(() => {
        const c = o == null ? void 0 : o.ownerDocument.createElement("div");
        return c && (c.className = q0), c;
      }, [o]),
      [, i] = Ls.useState({});
    return (
      Vy.useSafeLayoutEffect(() => i({}), []),
      Vy.useSafeLayoutEffect(() => {
        if (!(!s || !a))
          return (
            a.appendChild(s),
            () => {
              a.removeChild(s);
            }
          );
      }, [s, a]),
      a && s
        ? V2.createPortal($a.jsx(z2, { value: n ? s : null, children: t }), s)
        : null
    );
  };
function Dm(e) {
  const t = { appendToParentPortal: !0, ...e },
    { containerRef: r, ...n } = t;
  return r ? $a.jsx(Tse, { containerRef: r, ...n }) : $a.jsx(kse, { ...n });
}
Dm.className = q0;
Dm.selector = wse;
Dm.displayName = "Portal";
Ul.Portal = Dm;
var rd = P,
  Pse = x,
  Rse = tr,
  Ase = g,
  _se = $2,
  iv = Mm,
  Ise = co,
  Ese = Ul;
const [Mse, Fse] = Pse.createContext({
    name: "ToastOptionsContext",
    strict: !1,
  }),
  jse = (e) => {
    const t = Ase.useSyncExternalStore(
        iv.toastStore.subscribe,
        iv.toastStore.getState,
        iv.toastStore.getState
      ),
      {
        motionVariants: r,
        component: n = _se.ToastComponent,
        portalProps: o,
        animatePresenceProps: a,
      } = e,
      i = Object.keys(t).map((c) => {
        const l = t[c];
        return rd.jsx(
          "div",
          {
            role: "region",
            "aria-live": "polite",
            "aria-label": `Notifications-${c}`,
            id: `chakra-toast-manager-${c}`,
            style: Ise.getToastListStyle(c),
            children: rd.jsx(Rse.AnimatePresence, {
              ...a,
              initial: !1,
              children: l.map((u) =>
                rd.jsx(n, { motionVariants: r, ...u }, u.id)
              ),
            }),
          },
          c
        );
      });
    return rd.jsx(Ese.Portal, { ...o, children: i });
  };
Ua.ToastOptionProvider = Mse;
Ua.ToastProvider = jse;
Ua.useToastOptionContext = Fse;
var cv = P,
  Dse = LI,
  sC = Ua;
const Nse = (e) =>
  function ({ children: r, theme: n = e, toastOptions: o, ...a }) {
    return cv.jsxs(Dse.Provider, {
      theme: n,
      ...a,
      children: [
        cv.jsx(sC.ToastOptionProvider, {
          value: o == null ? void 0 : o.defaultOptions,
          children: r,
        }),
        cv.jsx(sC.ToastProvider, { ...o }),
      ],
    });
  };
wb.createProvider = Nse;
var Ose = no,
  Bse = wb;
const Lse = Bse.createProvider(Ose.baseTheme);
BI.ChakraBaseProvider = Lse;
var H2 = {},
  Vse = no,
  zse = wb;
const Hse = zse.createProvider(Vse.theme);
H2.ChakraProvider = Hse;
var W2 = {},
  Ft = {},
  Fi = {},
  G2 = {},
  Uo = {},
  iC = g;
function Wse(e) {
  return e.sort((t, r) => {
    const n = t.compareDocumentPosition(r);
    if (
      n & Node.DOCUMENT_POSITION_FOLLOWING ||
      n & Node.DOCUMENT_POSITION_CONTAINED_BY
    )
      return -1;
    if (
      n & Node.DOCUMENT_POSITION_PRECEDING ||
      n & Node.DOCUMENT_POSITION_CONTAINS
    )
      return 1;
    if (
      n & Node.DOCUMENT_POSITION_DISCONNECTED ||
      n & Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC
    )
      throw Error("Cannot sort the given nodes.");
    return 0;
  });
}
const Gse = (e) =>
  typeof e == "object" && "nodeType" in e && e.nodeType === Node.ELEMENT_NODE;
function Use(e, t, r) {
  let n = e + 1;
  return r && n >= t && (n = 0), n;
}
function Kse(e, t, r) {
  let n = e - 1;
  return r && n < 0 && (n = t), n;
}
const qse = typeof window < "u" ? iC.useLayoutEffect : iC.useEffect,
  Xse = (e) => e;
Uo.cast = Xse;
Uo.getNextIndex = Use;
Uo.getPrevIndex = Kse;
Uo.isElement = Gse;
Uo.sortNodes = Wse;
Uo.useSafeLayoutEffect = qse;
var sa = Uo,
  Yse = Object.defineProperty,
  Zse = (e, t, r) =>
    t in e
      ? Yse(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r })
      : (e[t] = r),
  Je = (e, t, r) => (Zse(e, typeof t != "symbol" ? t + "" : t, r), r);
class Qse {
  constructor() {
    Je(this, "descendants", new Map()),
      Je(this, "register", (t) => {
        if (t != null)
          return sa.isElement(t)
            ? this.registerNode(t)
            : (r) => {
                this.registerNode(r, t);
              };
      }),
      Je(this, "unregister", (t) => {
        this.descendants.delete(t);
        const r = sa.sortNodes(Array.from(this.descendants.keys()));
        this.assignIndex(r);
      }),
      Je(this, "destroy", () => {
        this.descendants.clear();
      }),
      Je(this, "assignIndex", (t) => {
        this.descendants.forEach((r) => {
          const n = t.indexOf(r.node);
          (r.index = n), (r.node.dataset.index = r.index.toString());
        });
      }),
      Je(this, "count", () => this.descendants.size),
      Je(this, "enabledCount", () => this.enabledValues().length),
      Je(this, "values", () =>
        Array.from(this.descendants.values()).sort((r, n) => r.index - n.index)
      ),
      Je(this, "enabledValues", () => this.values().filter((t) => !t.disabled)),
      Je(this, "item", (t) => {
        if (this.count() !== 0) return this.values()[t];
      }),
      Je(this, "enabledItem", (t) => {
        if (this.enabledCount() !== 0) return this.enabledValues()[t];
      }),
      Je(this, "first", () => this.item(0)),
      Je(this, "firstEnabled", () => this.enabledItem(0)),
      Je(this, "last", () => this.item(this.descendants.size - 1)),
      Je(this, "lastEnabled", () => {
        const t = this.enabledValues().length - 1;
        return this.enabledItem(t);
      }),
      Je(this, "indexOf", (t) => {
        var r;
        return t
          ? ((r = this.descendants.get(t)) == null ? void 0 : r.index) ?? -1
          : -1;
      }),
      Je(this, "enabledIndexOf", (t) =>
        t == null
          ? -1
          : this.enabledValues().findIndex((r) => r.node.isSameNode(t))
      ),
      Je(this, "next", (t, r = !0) => {
        const n = sa.getNextIndex(t, this.count(), r);
        return this.item(n);
      }),
      Je(this, "nextEnabled", (t, r = !0) => {
        const n = this.item(t);
        if (!n) return;
        const o = this.enabledIndexOf(n.node),
          a = sa.getNextIndex(o, this.enabledCount(), r);
        return this.enabledItem(a);
      }),
      Je(this, "prev", (t, r = !0) => {
        const n = sa.getPrevIndex(t, this.count() - 1, r);
        return this.item(n);
      }),
      Je(this, "prevEnabled", (t, r = !0) => {
        const n = this.item(t);
        if (!n) return;
        const o = this.enabledIndexOf(n.node),
          a = sa.getPrevIndex(o, this.enabledCount() - 1, r);
        return this.enabledItem(a);
      }),
      Je(this, "registerNode", (t, r) => {
        if (!t || this.descendants.has(t)) return;
        const n = Array.from(this.descendants.keys()).concat(t),
          o = sa.sortNodes(n);
        r != null && r.disabled && (r.disabled = !!r.disabled);
        const a = { node: t, index: -1, ...r };
        this.descendants.set(t, a), this.assignIndex(o);
      });
  }
}
G2.DescendantsManager = Qse;
var Jse = le,
  eie = x,
  lv = g,
  tie = G2,
  pc = Uo;
function rie() {
  const [e, t] = eie.createContext({
    name: "DescendantsProvider",
    errorMessage:
      "useDescendantsContext must be used within DescendantsProvider",
  });
  return [
    e,
    t,
    () => {
      const o = lv.useRef(new tie.DescendantsManager());
      return pc.useSafeLayoutEffect(() => () => o.current.destroy()), o.current;
    },
    (o) => {
      const a = t(),
        [s, i] = lv.useState(-1),
        c = lv.useRef(null);
      pc.useSafeLayoutEffect(
        () => () => {
          c.current && a.unregister(c.current);
        },
        []
      ),
        pc.useSafeLayoutEffect(() => {
          if (!c.current) return;
          const u = Number(c.current.dataset.index);
          s != u && !Number.isNaN(u) && i(u);
        });
      const l = o ? pc.cast(a.register(o)) : pc.cast(a.register);
      return {
        descendants: a,
        index: s,
        enabledIndex: a.enabledIndexOf(c.current),
        register: Jse.mergeRefs(l, c),
      };
    },
  ];
}
Fi.createDescendantContext = rie;
var U2 = x,
  nie = Fi;
const [oie, aie] = U2.createContext({
    name: "AccordionStylesContext",
    hookName: "useAccordionStyles",
    providerName: "<Accordion />",
  }),
  [sie, iie] = U2.createContext({
    name: "AccordionItemContext",
    hookName: "useAccordionItemContext",
    providerName: "<AccordionItem />",
  }),
  [cie, lie, uie, die] = nie.createDescendantContext();
Ft.AccordionDescendantsProvider = cie;
Ft.AccordionItemProvider = sie;
Ft.AccordionStylesProvider = oie;
Ft.useAccordionDescendant = die;
Ft.useAccordionDescendants = uie;
Ft.useAccordionDescendantsContext = lie;
Ft.useAccordionItemContext = iie;
Ft.useAccordionStyles = aie;
var lo = {},
  K2 = le,
  Eo = x,
  Vn = g,
  q2 = Ft;
function fie(e) {
  const {
    onChange: t,
    defaultIndex: r,
    index: n,
    allowMultiple: o,
    allowToggle: a,
    ...s
  } = e;
  pie(e), vie(e);
  const i = q2.useAccordionDescendants(),
    [c, l] = Vn.useState(-1);
  Vn.useEffect(
    () => () => {
      l(-1);
    },
    []
  );
  const [u, d] = K2.useControllableState({
    value: n,
    defaultValue() {
      return o ? r ?? [] : r ?? -1;
    },
    onChange: t,
  });
  return {
    index: u,
    setIndex: d,
    htmlProps: s,
    getAccordionItemProps: (m) => {
      let h = !1;
      return (
        m !== null && (h = Array.isArray(u) ? u.includes(m) : u === m),
        {
          isOpen: h,
          onChange: (v) => {
            if (m !== null)
              if (o && Array.isArray(u)) {
                const b = v ? u.concat(m) : u.filter((y) => y !== m);
                d(b);
              } else v ? d(m) : a && d(-1);
          },
        }
      );
    },
    focusedIndex: c,
    setFocusedIndex: l,
    descendants: i,
  };
}
const [mie, X2] = Eo.createContext({
  name: "AccordionContext",
  hookName: "useAccordionContext",
  providerName: "Accordion",
});
function hie(e) {
  const { isDisabled: t, isFocusable: r, id: n, ...o } = e,
    { getAccordionItemProps: a, setFocusedIndex: s } = X2(),
    i = Vn.useRef(null),
    c = Vn.useId(),
    l = n ?? c,
    u = `accordion-button-${l}`,
    d = `accordion-panel-${l}`;
  yie(e);
  const {
      register: f,
      index: m,
      descendants: h,
    } = q2.useAccordionDescendant({ disabled: t && !r }),
    { isOpen: p, onChange: v } = a(m === -1 ? null : m);
  gie({ isOpen: p, isDisabled: t });
  const b = () => {
      v == null || v(!0);
    },
    y = () => {
      v == null || v(!1);
    },
    S = Vn.useCallback(() => {
      v == null || v(!p), s(m);
    }, [m, s, p, v]),
    w = Vn.useCallback(
      (R) => {
        const _ = {
          ArrowDown: () => {
            const N = h.nextEnabled(m);
            N == null || N.node.focus();
          },
          ArrowUp: () => {
            const N = h.prevEnabled(m);
            N == null || N.node.focus();
          },
          Home: () => {
            const N = h.firstEnabled();
            N == null || N.node.focus();
          },
          End: () => {
            const N = h.lastEnabled();
            N == null || N.node.focus();
          },
        }[R.key];
        _ && (R.preventDefault(), _(R));
      },
      [h, m]
    ),
    C = Vn.useCallback(() => {
      s(m);
    }, [s, m]),
    T = Vn.useCallback(
      function (E = {}, _ = null) {
        return {
          ...E,
          type: "button",
          ref: K2.mergeRefs(f, i, _),
          id: u,
          disabled: !!t,
          "aria-expanded": !!p,
          "aria-controls": d,
          onClick: Eo.callAllHandlers(E.onClick, S),
          onFocus: Eo.callAllHandlers(E.onFocus, C),
          onKeyDown: Eo.callAllHandlers(E.onKeyDown, w),
        };
      },
      [u, t, p, S, C, w, d, f]
    ),
    k = Vn.useCallback(
      function (E = {}, _ = null) {
        return {
          ...E,
          ref: _,
          role: "region",
          id: d,
          "aria-labelledby": u,
          hidden: !p,
        };
      },
      [u, p, d]
    );
  return {
    isOpen: p,
    isDisabled: t,
    isFocusable: r,
    onOpen: b,
    onClose: y,
    getButtonProps: T,
    getPanelProps: k,
    htmlProps: o,
  };
}
function pie(e) {
  const t = e.index || e.defaultIndex,
    r = t != null && !Array.isArray(t) && e.allowMultiple;
  Eo.warn({
    condition: !!r,
    message: `If 'allowMultiple' is passed, then 'index' or 'defaultIndex' must be an array. You passed: ${typeof t},`,
  });
}
function vie(e) {
  Eo.warn({
    condition: !!(e.allowMultiple && e.allowToggle),
    message:
      "If 'allowMultiple' is passed, 'allowToggle' will be ignored. Either remove 'allowToggle' or 'allowMultiple' depending on whether you want multiple accordions visible or not",
  });
}
function yie(e) {
  Eo.warn({
    condition: !!(e.isFocusable && !e.isDisabled),
    message: `Using only 'isFocusable', this prop is reserved for situations where you pass 'isDisabled' but you still want the element to receive focus (A11y). Either remove it or pass 'isDisabled' as well.
    `,
  });
}
function gie(e) {
  Eo.warn({
    condition: e.isOpen && !!e.isDisabled,
    message: "Cannot open a disabled accordion item",
  });
}
lo.AccordionProvider = mie;
lo.useAccordion = fie;
lo.useAccordionContext = X2;
lo.useAccordionItem = hie;
var nd = P,
  bie = I,
  Sie = x,
  xie = g,
  cC = Ft,
  lC = lo,
  $ie = D,
  wie = he,
  Cie = M;
const Y2 = $ie.forwardRef(function ({ children: t, reduceMotion: r, ...n }, o) {
  const a = wie.useMultiStyleConfig("Accordion", n),
    s = bie.omitThemingProps(n),
    { htmlProps: i, descendants: c, ...l } = lC.useAccordion(s),
    u = xie.useMemo(() => ({ ...l, reduceMotion: !!r }), [l, r]);
  return nd.jsx(cC.AccordionDescendantsProvider, {
    value: c,
    children: nd.jsx(lC.AccordionProvider, {
      value: u,
      children: nd.jsx(cC.AccordionStylesProvider, {
        value: a,
        children: nd.jsx(Cie.chakra.div, {
          ref: o,
          ...i,
          className: Sie.cx("chakra-accordion", n.className),
          __css: a.root,
          children: t,
        }),
      }),
    }),
  });
});
Y2.displayName = "Accordion";
W2.Accordion = Y2;
var Z2 = {},
  kie = P,
  Tie = x,
  uC = Ft,
  Pie = D,
  Rie = M;
const Q2 = Pie.forwardRef(function (t, r) {
  const { getButtonProps: n } = uC.useAccordionItemContext(),
    o = n(t, r),
    s = {
      display: "flex",
      alignItems: "center",
      width: "100%",
      outline: 0,
      ...uC.useAccordionStyles().button,
    };
  return kie.jsx(Rie.chakra.button, {
    ...o,
    className: Tie.cx("chakra-accordion__button", t.className),
    __css: s,
  });
});
Q2.displayName = "AccordionButton";
Z2.AccordionButton = Q2;
var J2 = {},
  dC = P,
  Aie = x,
  fC = Ft,
  _ie = lo,
  Iie = Dr;
function eF(e) {
  const { isOpen: t, isDisabled: r } = fC.useAccordionItemContext(),
    { reduceMotion: n } = _ie.useAccordionContext(),
    o = Aie.cx("chakra-accordion__icon", e.className),
    a = fC.useAccordionStyles(),
    s = {
      opacity: r ? 0.4 : 1,
      transform: t ? "rotate(-180deg)" : void 0,
      transition: n ? void 0 : "transform 0.2s",
      transformOrigin: "center",
      ...a.icon,
    };
  return dC.jsx(Iie.Icon, {
    viewBox: "0 0 24 24",
    "aria-hidden": !0,
    className: o,
    __css: s,
    ...e,
    children: dC.jsx("path", {fill: "currentColor",
      d: "M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z",
    }),
  });
}
eF.displayName = "AccordionIcon";
J2.AccordionIcon = eF;
var tF = {},
  mC = P,
  Eie = I,
  Mie = x,
  Fie = g,
  hC = Ft,
  jie = lo,
  Die = D,
  Nie = M;
const rF = Die.forwardRef(function (t, r) {
  const { children: n, className: o } = t,
    { htmlProps: a, ...s } = jie.useAccordionItem(t),
    i = hC.useAccordionStyles(),
    c = Eie.defineStyle({ ...i.container, overflowAnchor: "none" }),
    l = Fie.useMemo(() => s, [s]);
  return mC.jsx(hC.AccordionItemProvider, {
    value: l,
    children: mC.jsx(Nie.chakra.div, {
      ref: r,
      ...a,
      className: Mie.cx("chakra-accordion__item", o),
      __css: c,
      children:
        typeof n == "function"
          ? n({ isExpanded: !!s.isOpen, isDisabled: !!s.isDisabled })
          : n,
    }),
  });
});
rF.displayName = "AccordionItem";
tF.AccordionItem = rF;
var nF = {},
  X0 = {},
  rn = {};
const zy = {
    ease: [0.25, 0.1, 0.25, 1],
    easeIn: [0.4, 0, 1, 1],
    easeOut: [0, 0, 0.2, 1],
    easeInOut: [0.4, 0, 0.2, 1],
  },
  Ss = {
    scale: { enter: { scale: 1 }, exit: { scale: 0.95 } },
    fade: { enter: { opacity: 1 }, exit: { opacity: 0 } },
    pushLeft: { enter: { x: "100%" }, exit: { x: "-30%" } },
    pushRight: { enter: { x: "-100%" }, exit: { x: "30%" } },
    pushUp: { enter: { y: "100%" }, exit: { y: "-30%" } },
    pushDown: { enter: { y: "-100%" }, exit: { y: "30%" } },
    slideLeft: {
      position: { left: 0, top: 0, bottom: 0, width: "100%" },
      enter: { x: 0, y: 0 },
      exit: { x: "-100%", y: 0 },
    },
    slideRight: {
      position: { right: 0, top: 0, bottom: 0, width: "100%" },
      enter: { x: 0, y: 0 },
      exit: { x: "100%", y: 0 },
    },
    slideUp: {
      position: { top: 0, left: 0, right: 0, maxWidth: "100vw" },
      enter: { x: 0, y: 0 },
      exit: { x: 0, y: "-100%" },
    },
    slideDown: {
      position: { bottom: 0, left: 0, right: 0, maxWidth: "100vw" },
      enter: { x: 0, y: 0 },
      exit: { x: 0, y: "100%" },
    },
  };
function Oie(e) {
  switch ((e == null ? void 0 : e.direction) ?? "right") {
    case "right":
      return Ss.slideRight;
    case "left":
      return Ss.slideLeft;
    case "bottom":
      return Ss.slideDown;
    case "top":
      return Ss.slideUp;
    default:
      return Ss.slideRight;
  }
}
const Bie = {
    enter: { duration: 0.2, ease: zy.easeOut },
    exit: { duration: 0.1, ease: zy.easeIn },
  },
  Lie = {
    enter: (e, t) => ({
      ...e,
      delay: typeof t == "number" ? t : t == null ? void 0 : t.enter,
    }),
    exit: (e, t) => ({
      ...e,
      delay: typeof t == "number" ? t : t == null ? void 0 : t.exit,
    }),
  };
rn.TRANSITION_DEFAULTS = Bie;
rn.TRANSITION_EASINGS = zy;
rn.TRANSITION_VARIANTS = Ss;
rn.getSlideTransition = Oie;
rn.withDelay = Lie;
var pC = P,
  vC = x,
  yC = tr,
  uv = g,
  Vs = rn;
const Vie = (e) => e != null && parseInt(e.toString(), 10) > 0,
  gC = {
    exit: {
      height: { duration: 0.2, ease: Vs.TRANSITION_EASINGS.ease },
      opacity: { duration: 0.3, ease: Vs.TRANSITION_EASINGS.ease },
    },
    enter: {
      height: { duration: 0.3, ease: Vs.TRANSITION_EASINGS.ease },
      opacity: { duration: 0.4, ease: Vs.TRANSITION_EASINGS.ease },
    },
  },
  zie = {
    exit: ({
      animateOpacity: e,
      startingHeight: t,
      transition: r,
      transitionEnd: n,
      delay: o,
    }) => ({
      ...(e && { opacity: Vie(t) ? 1 : 0 }),
      height: t,
      transitionEnd: n == null ? void 0 : n.exit,
      transition:
        (r == null ? void 0 : r.exit) ?? Vs.withDelay.exit(gC.exit, o),
    }),
    enter: ({
      animateOpacity: e,
      endingHeight: t,
      transition: r,
      transitionEnd: n,
      delay: o,
    }) => ({
      ...(e && { opacity: 1 }),
      height: t,
      transitionEnd: n == null ? void 0 : n.enter,
      transition:
        (r == null ? void 0 : r.enter) ?? Vs.withDelay.enter(gC.enter, o),
    }),
  },
  oF = uv.forwardRef((e, t) => {
    const {
        in: r,
        unmountOnExit: n,
        animateOpacity: o = !0,
        startingHeight: a = 0,
        endingHeight: s = "auto",
        style: i,
        className: c,
        transition: l,
        transitionEnd: u,
        animatePresenceProps: d,
        ...f
      } = e,
      [m, h] = uv.useState(!1);
    uv.useEffect(() => {
      const S = setTimeout(() => {
        h(!0);
      });
      return () => clearTimeout(S);
    }, []),
      vC.warn({
        condition: Number(a) > 0 && !!n,
        message:
          "startingHeight and unmountOnExit are mutually exclusive. You can't use them together",
      });
    const p = parseFloat(a.toString()) > 0,
      v = {
        startingHeight: a,
        endingHeight: s,
        animateOpacity: o,
        transition: m ? l : { enter: { duration: 0 } },
        transitionEnd: {
          enter: u == null ? void 0 : u.enter,
          exit: n
            ? u == null
              ? void 0
              : u.exit
            : {
                ...(u == null ? void 0 : u.exit),
                display: p ? "block" : "none",
              },
        },
      },
      b = n ? r : !0,
      y = r || n ? "enter" : "exit";
    return pC.jsx(yC.AnimatePresence, {
      ...d,
      initial: !1,
      custom: v,
      children:
        b &&
        pC.jsx(yC.motion.div, {
          ref: t,
          ...f,
          className: vC.cx("chakra-collapse", c),
          style: { overflow: "hidden", display: "block", ...i },
          custom: v,
          variants: zie,
          initial: n ? "exit" : !1,
          animate: y,
          exit: "exit",
        }),
    });
  });
oF.displayName = "Collapse";
X0.Collapse = oF;
var bC = P,
  Hie = x,
  SC = Ft,
  Wie = lo,
  Gie = X0,
  Uie = D,
  Kie = M;
const aF = Uie.forwardRef(function (t, r) {
  const { className: n, motionProps: o, ...a } = t,
    { reduceMotion: s } = Wie.useAccordionContext(),
    { getPanelProps: i, isOpen: c } = SC.useAccordionItemContext(),
    l = i(a, r),
    u = Hie.cx("chakra-accordion__panel", n),
    d = SC.useAccordionStyles();
  s || delete l.hidden;
  const f = bC.jsx(Kie.chakra.div, { ...l, __css: d.panel, className: u });
  return s ? f : bC.jsx(Gie.Collapse, { in: c, ...o, children: f });
});
aF.displayName = "AccordionPanel";
nF.AccordionPanel = aF;
var sF = {},
  qie = Ft;
function Xie() {
  const {
    isOpen: e,
    isDisabled: t,
    onClose: r,
    onOpen: n,
  } = qie.useAccordionItemContext();
  return { isOpen: e, onClose: r, isDisabled: t, onOpen: n };
}
sF.useAccordionItemState = Xie;
var iF = {},
  Yie = P,
  xC = x,
  Zie = g,
  Qie = D,
  Jie = M;
const cF = Qie.forwardRef(function (e, t) {
  const { ratio: r = 4 / 3, children: n, className: o, ...a } = e,
    s = Zie.Children.only(n),
    i = xC.cx("chakra-aspect-ratio", o);
  return Yie.jsx(Jie.chakra.div, {
    ref: t,
    position: "relative",
    className: i,
    _before: {
      height: 0,
      content: '""',
      display: "block",
      paddingBottom: xC.mapResponsive(r, (c) => `${(1 / c) * 100}%`),
    },
    __css: {
      "& > *:not(style)": {
        overflow: "hidden",
        position: "absolute",
        top: "0",
        right: "0",
        bottom: "0",
        left: "0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      },
      "& > img, & > video": { objectFit: "cover" },
    },
    ...a,
    children: s,
  });
});
cF.displayName = "AspectRatio";
iF.AspectRatio = cF;
var Nm = {},
  ji = {},
  ece = x;
const [tce, rce] = ece.createContext({
  name: "AvatarStylesContext",
  hookName: "useAvatarStyles",
  providerName: "<Avatar/>",
});
ji.AvatarStylesProvider = tce;
ji.useAvatarStyles = rce;
var lF = {},
  Om = {},
  nce = P,
  oce = ji,
  ace = M;
function sce(e) {
  const t = e.trim().split(" "),
    r = t[0] ?? "",
    n = t.length > 1 ? t[t.length - 1] : "";
  return r && n ? `${r.charAt(0)}${n.charAt(0)}` : r.charAt(0);
}
function uF(e) {
  const { name: t, getInitials: r, ...n } = e,
    o = oce.useAvatarStyles();
  return nce.jsx(ace.chakra.div, {
    role: "img",
    "aria-label": t,
    ...n,
    __css: o.label,
    children: t ? (r == null ? void 0 : r(t)) : null,
  });
}
uF.displayName = "AvatarName";
Om.AvatarName = uF;
Om.initials = sce;
var Bm = {},
  dv = P,
  ice = M;
const cce = (e) =>
  dv.jsxs(ice.chakra.svg, {
    viewBox: "0 0 128 128",
    color: "#fff",
    width: "100%",
    height: "100%",
    className: "chakra-avatar__svg",
    ...e,
    children: [
      dv.jsx("path", {fill: "currentColor",
        d: "M103,102.1388 C93.094,111.92 79.3504,118 64.1638,118 C48.8056,118 34.9294,111.768 25,101.7892 L25,95.2 C25,86.8096 31.981,80 40.6,80 L87.4,80 C96.019,80 103,86.8096 103,95.2 L103,102.1388 Z",
      }),
      dv.jsx("path", {fill: "currentColor",
        d: "M63.9961647,24 C51.2938136,24 41,34.2938136 41,46.9961647 C41,59.7061864 51.2938136,70 63.9961647,70 C76.6985159,70 87,59.7061864 87,46.9961647 C87,34.2938136 76.6985159,24 63.9961647,24",
      }),
    ],
  });
Bm.GenericAvatarIcon = cce;
var Kl = {},
  lce = le,
  od = g;
function uce(e) {
  const {
      loading: t,
      src: r,
      srcSet: n,
      onLoad: o,
      onError: a,
      crossOrigin: s,
      sizes: i,
      ignoreFallback: c,
    } = e,
    [l, u] = od.useState("pending");
  od.useEffect(() => {
    u(r ? "loading" : "pending");
  }, [r]);
  const d = od.useRef(null),
    f = od.useCallback(() => {
      if (!r) return;
      m();
      const h = new Image();
      (h.src = r),
        s && (h.crossOrigin = s),
        n && (h.srcset = n),
        i && (h.sizes = i),
        t && (h.loading = t),
        (h.onload = (p) => {
          m(), u("loaded"), o == null || o(p);
        }),
        (h.onerror = (p) => {
          m(), u("failed"), a == null || a(p);
        }),
        (d.current = h);
    }, [r, s, n, i, o, a, t]),
    m = () => {
      d.current &&
        ((d.current.onload = null),
        (d.current.onerror = null),
        (d.current = null));
    };
  return (
    lce.useSafeLayoutEffect(() => {
      if (!c)
        return (
          l === "loading" && f(),
          () => {
            m();
          }
        );
    }, [l, f, c]),
    c ? "loaded" : l
  );
}
const dce = (e, t) =>
  (e !== "loaded" && t === "beforeLoadOrError") ||
  (e === "failed" && t === "onError");
Kl.shouldShowFallbackImage = dce;
Kl.useImage = uce;
var fv = P,
  fce = g,
  mce = Om,
  hce = Bm,
  pce = Kl,
  vce = M;
function dF(e) {
  const {
      src: t,
      srcSet: r,
      onError: n,
      onLoad: o,
      getInitials: a,
      name: s,
      borderRadius: i,
      loading: c,
      iconLabel: l,
      icon: u = fv.jsx(hce.GenericAvatarIcon, {}),
      ignoreFallback: d,
      referrerPolicy: f,
      crossOrigin: m,
    } = e,
    p =
      pce.useImage({
        src: t,
        onError: n,
        crossOrigin: m,
        ignoreFallback: d,
      }) === "loaded";
  return !t || !p
    ? s
      ? fv.jsx(mce.AvatarName, {
          className: "chakra-avatar__initials",
          getInitials: a,
          name: s,
        })
      : fce.cloneElement(u, { role: "img", "aria-label": l })
    : fv.jsx(vce.chakra.img, {
        src: t,
        srcSet: r,
        alt: s ?? l,
        onLoad: o,
        referrerPolicy: f,
        crossOrigin: m ?? void 0,
        className: "chakra-avatar__img",
        loading: c,
        __css: {
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: i,
        },
      });
}
dF.displayName = "AvatarImage";
lF.AvatarImage = dF;
var ad = P,
  fF = I,
  mv = x,
  yce = g,
  gce = ji,
  bce = lF,
  Sce = Om,
  xce = Bm,
  $ce = D,
  wce = he,
  Cce = M;
const mF = fF.defineStyle({
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    textTransform: "uppercase",
    fontWeight: "medium",
    position: "relative",
    flexShrink: 0,
  }),
  hF = $ce.forwardRef((e, t) => {
    const r = wce.useMultiStyleConfig("Avatar", e),
      [n, o] = yce.useState(!1),
      {
        src: a,
        srcSet: s,
        name: i,
        showBorder: c,
        borderRadius: l = "full",
        onError: u,
        onLoad: d,
        getInitials: f = Sce.initials,
        icon: m = ad.jsx(xce.GenericAvatarIcon, {}),
        iconLabel: h = " avatar",
        loading: p,
        children: v,
        borderColor: b,
        ignoreFallback: y,
        crossOrigin: S,
        referrerPolicy: w,
        ...C
      } = fF.omitThemingProps(e),
      T = {
        borderRadius: l,
        borderWidth: c ? "2px" : void 0,
        ...mF,
        ...r.container,
      };
    return (
      b && (T.borderColor = b),
      ad.jsx(Cce.chakra.span, {
        ref: t,
        ...C,
        className: mv.cx("chakra-avatar", e.className),
        "data-loaded": mv.dataAttr(n),
        __css: T,
        children: ad.jsxs(gce.AvatarStylesProvider, {
          value: r,
          children: [
            ad.jsx(bce.AvatarImage, {
              src: a,
              srcSet: s,
              loading: p,
              onLoad: mv.callAllHandlers(d, () => {
                o(!0);
              }),
              onError: u,
              getInitials: f,
              name: i,
              borderRadius: l,
              icon: m,
              iconLabel: h,
              ignoreFallback: y,
              crossOrigin: S,
              referrerPolicy: w,
            }),
            v,
          ],
        }),
      })
    );
  });
hF.displayName = "Avatar";
Nm.Avatar = hF;
Nm.baseStyle = mF;
var pF = {},
  kce = P,
  Tce = x,
  Pce = ji,
  Rce = D,
  Ace = M;
const _ce = {
    "top-start": {
      top: "0",
      insetStart: "0",
      transform: "translate(-25%, -25%)",
    },
    "top-end": { top: "0", insetEnd: "0", transform: "translate(25%, -25%)" },
    "bottom-start": {
      bottom: "0",
      insetStart: "0",
      transform: "translate(-25%, 25%)",
    },
    "bottom-end": {
      bottom: "0",
      insetEnd: "0",
      transform: "translate(25%, 25%)",
    },
  },
  vF = Rce.forwardRef(function (t, r) {
    const { placement: n = "bottom-end", className: o, ...a } = t,
      s = Pce.useAvatarStyles(),
      c = {
        position: "absolute",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ..._ce[n],
        ...s.badge,
      };
    return kce.jsx(Ace.chakra.div, {
      ref: r,
      ...a,
      className: Tce.cx("chakra-avatar__badge", o),
      __css: c,
    });
  });
vF.displayName = "AvatarBadge";
pF.AvatarBadge = vF;
var yF = {},
  $C = P,
  Ice = I,
  hv = x,
  Ece = g,
  Mce = Nm,
  Fce = D,
  jce = he,
  wC = M;
const gF = Fce.forwardRef(function (t, r) {
  const n = jce.useMultiStyleConfig("Avatar", t),
    {
      children: o,
      borderColor: a,
      max: s,
      spacing: i = "-0.75rem",
      borderRadius: c = "full",
      ...l
    } = Ice.omitThemingProps(t),
    u = hv.getValidChildren(o),
    d = s != null ? u.slice(0, s) : u,
    f = s != null ? u.length - s : 0,
    h = d.reverse().map((b, y) => {
      const w = {
        marginEnd: y === 0 ? 0 : i,
        size: t.size,
        borderColor: b.props.borderColor ?? a,
        showBorder: !0,
      };
      return Ece.cloneElement(b, hv.compact(w));
    }),
    p = {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      flexDirection: "row-reverse",
      ...n.group,
    },
    v = { borderRadius: c, marginStart: i, ...Mce.baseStyle, ...n.excessLabel };
  return $C.jsxs(wC.chakra.div, {
    ref: r,
    role: "group",
    __css: p,
    ...l,
    className: hv.cx("chakra-avatar__group", t.className),
    children: [
      f > 0 &&
        $C.jsx(wC.chakra.span, {
          className: "chakra-avatar__excess",
          __css: v,
          children: `+${f}`,
        }),
      h,
    ],
  });
});
gF.displayName = "AvatarGroup";
yF.AvatarGroup = gF;
var bF = {},
  Dce = P,
  Nce = I,
  Oce = x,
  Bce = D,
  Lce = he,
  Vce = M;
const SF = Bce.forwardRef(function (t, r) {
  const n = Lce.useStyleConfig("Badge", t),
    { className: o, ...a } = Nce.omitThemingProps(t);
  return Dce.jsx(Vce.chakra.span, {
    ref: r,
    className: Oce.cx("chakra-badge", t.className),
    ...a,
    __css: {
      display: "inline-block",
      whiteSpace: "nowrap",
      verticalAlign: "middle",
      ...n,
    },
  });
});
SF.displayName = "Badge";
bF.Badge = SF;
var Lm = {},
  zce = M;
const xF = zce.chakra("div");
xF.displayName = "Box";
Lm.Box = xF;
var Y0 = {},
  Hce = P,
  Wce = Lm,
  Gce = D;
const $F = Gce.forwardRef(function (t, r) {
  const { size: n, centerContent: o = !0, ...a } = t,
    s = o
      ? { display: "flex", alignItems: "center", justifyContent: "center" }
      : {};
  return Hce.jsx(Wce.Box, {
    ref: r,
    boxSize: n,
    __css: { ...s, flexShrink: 0, flexGrow: 0 },
    ...a,
  });
});
$F.displayName = "Square";
Y0.Square = $F;
var wF = {},
  Uce = P,
  Kce = Y0,
  qce = D;
const CF = qce.forwardRef(function (t, r) {
  const { size: n, ...o } = t;
  return Uce.jsx(Kce.Square, { size: n, ref: r, borderRadius: "9999px", ...o });
});
CF.displayName = "Circle";
wF.Circle = CF;
var kF = {},
  Ka = {},
  Xce = x;
const [Yce, Zce] = Xce.createContext({
  name: "BreadcrumbStylesContext",
  errorMessage: `useBreadcrumbStyles returned is 'undefined'. Seems you forgot to wrap the components in "<Breadcrumb />" `,
});
Ka.BreadcrumbStylesProvider = Yce;
Ka.useBreadcrumbStyles = Zce;
var pv = P,
  Qce = I,
  CC = x,
  Jce = g,
  ele = Ka,
  tle = D,
  rle = he,
  kC = M;
const TF = tle.forwardRef(function (t, r) {
  const n = rle.useMultiStyleConfig("Breadcrumb", t),
    o = Qce.omitThemingProps(t),
    {
      children: a,
      spacing: s = "0.5rem",
      separator: i = "/",
      className: c,
      listProps: l,
      ...u
    } = o,
    d = CC.getValidChildren(a),
    f = d.length,
    m = d.map((p, v) =>
      Jce.cloneElement(p, {
        separator: i,
        spacing: s,
        isLastChild: f === v + 1,
      })
    ),
    h = CC.cx("chakra-breadcrumb", c);
  return pv.jsx(kC.chakra.nav, {
    ref: r,
    "aria-label": "breadcrumb",
    className: h,
    __css: n.container,
    ...u,
    children: pv.jsx(ele.BreadcrumbStylesProvider, {
      value: n,
      children: pv.jsx(kC.chakra.ol, {
        className: "chakra-breadcrumb__list",
        ...l,
        __css: { display: "flex", alignItems: "center", ...n.list },
        children: m,
      }),
    }),
  });
});
TF.displayName = "Breadcrumb";
kF.Breadcrumb = TF;
var PF = {},
  Z0 = {},
  TC = P,
  nle = x,
  ole = Ka,
  ale = D,
  PC = M;
const RF = ale.forwardRef(function (t, r) {
  const { isCurrentPage: n, as: o, className: a, href: s, ...i } = t,
    c = ole.useBreadcrumbStyles(),
    l = {
      ref: r,
      as: o,
      className: nle.cx("chakra-breadcrumb__link", a),
      ...i,
    };
  return n
    ? TC.jsx(PC.chakra.span, { "aria-current": "page", __css: c.link, ...l })
    : TC.jsx(PC.chakra.a, { __css: c.link, href: s, ...l });
});
RF.displayName = "BreadcrumbLink";
Z0.BreadcrumbLink = RF;
var Q0 = {},
  sle = P,
  ile = I,
  cle = Ka,
  lle = D,
  ule = M;
const AF = lle.forwardRef(function (t, r) {
  const { spacing: n, ...o } = t,
    a = cle.useBreadcrumbStyles(),
    s = ile.defineStyle({ mx: n, ...a.separator });
  return sle.jsx(ule.chakra.span, {
    ref: r,
    role: "presentation",
    ...o,
    __css: s,
  });
});
AF.displayName = "BreadcrumbSeparator";
Q0.BreadcrumbSeparator = AF;
var RC = P,
  dle = I,
  AC = x,
  _C = g,
  fle = Ka,
  mle = Z0,
  IC = Q0,
  hle = D,
  ple = M;
const _F = hle.forwardRef(function (t, r) {
  const {
      isCurrentPage: n,
      separator: o,
      isLastChild: a,
      spacing: s,
      children: i,
      className: c,
      ...l
    } = t,
    d = AC.getValidChildren(i).map((p) =>
      p.type === mle.BreadcrumbLink
        ? _C.cloneElement(p, { isCurrentPage: n })
        : p.type === IC.BreadcrumbSeparator
        ? _C.cloneElement(p, { spacing: s, children: p.props.children || o })
        : p
    ),
    f = fle.useBreadcrumbStyles(),
    m = dle.defineStyle({
      display: "inline-flex",
      alignItems: "center",
      ...f.item,
    }),
    h = AC.cx("chakra-breadcrumb__list-item", c);
  return RC.jsxs(ple.chakra.li, {
    ref: r,
    className: h,
    ...l,
    __css: m,
    children: [
      d,
      !a && RC.jsx(IC.BreadcrumbSeparator, { spacing: s, children: o }),
    ],
  });
});
_F.displayName = "BreadcrumbItem";
PF.BreadcrumbItem = _F;
var J0 = {},
  ql = {},
  vle = x;
const [yle, gle] = vle.createContext({
  strict: !1,
  name: "ButtonGroupContext",
});
ql.ButtonGroupProvider = yle;
ql.useButtonGroup = gle;
var IF = {},
  ble = P,
  Sle = x,
  EC = g,
  xle = M;
function EF(e) {
  const { children: t, className: r, ...n } = e,
    o = EC.isValidElement(t)
      ? EC.cloneElement(t, { "aria-hidden": !0, focusable: !1 })
      : t,
    a = Sle.cx("chakra-button__icon", r);
  return ble.jsx(xle.chakra.span, {
    display: "inline-flex",
    alignSelf: "center",
    flexShrink: 0,
    ...n,
    className: a,
    children: o,
  });
}
EF.displayName = "ButtonIcon";
IF.ButtonIcon = EF;
var eS = {},
  MC = P,
  $le = I,
  wle = x,
  Cle = g,
  kle = jm,
  Tle = M;
function MF(e) {
  const {
      label: t,
      placement: r,
      spacing: n = "0.5rem",
      children: o = MC.jsx(kle.Spinner, {color: "currentColor",
        width: "1em",
        height: "1em",
      }),
      className: a,
      __css: s,
      ...i
    } = e,
    c = wle.cx("chakra-button__spinner", a),
    l = r === "start" ? "marginEnd" : "marginStart",
    u = Cle.useMemo(
      () =>
        $le.defineStyle({
          display: "flex",
          alignItems: "center",
          position: t ? "relative" : "absolute",
          [l]: t ? n : 0,
          fontSize: "1em",
          lineHeight: "normal",
          ...s,
        }),
      [s, t, l, n]
    );
  return MC.jsx(Tle.chakra.div, { className: c, ...i, __css: u, children: o });
}
MF.displayName = "ButtonSpinner";
eS.ButtonSpinner = MF;
var FF = {},
  FC = g;
function Ple(e) {
  const [t, r] = FC.useState(!e);
  return {
    ref: FC.useCallback((a) => {
      a && r(a.tagName === "BUTTON");
    }, []),
    type: t ? "button" : void 0,
  };
}
FF.useButtonType = Ple;
var mr = P,
  Rle = le,
  Ale = I,
  vv = x,
  _le = g,
  Ile = ql,
  sd = IF,
  jC = eS,
  Ele = FF,
  Mle = D,
  Fle = he,
  DC = M;
const jF = Mle.forwardRef((e, t) => {
  const r = Ile.useButtonGroup(),
    n = Fle.useStyleConfig("Button", { ...r, ...e }),
    {
      isDisabled: o = r == null ? void 0 : r.isDisabled,
      isLoading: a,
      isActive: s,
      children: i,
      leftIcon: c,
      rightIcon: l,
      loadingText: u,
      iconSpacing: d = "0.5rem",
      type: f,
      spinner: m,
      spinnerPlacement: h = "start",
      className: p,
      as: v,
      shouldWrapChildren: b,
      ...y
    } = Ale.omitThemingProps(e),
    S = _le.useMemo(() => {
      const k = { ...(n == null ? void 0 : n._focus), zIndex: 1 };
      return {
        display: "inline-flex",
        appearance: "none",
        alignItems: "center",
        justifyContent: "center",
        userSelect: "none",
        position: "relative",
        whiteSpace: "nowrap",
        verticalAlign: "middle",
        outline: "none",
        ...n,
        ...(!!r && { _focus: k }),
      };
    }, [n, r]),
    { ref: w, type: C } = Ele.useButtonType(v),
    T = {
      rightIcon: l,
      leftIcon: c,
      iconSpacing: d,
      children: i,
      shouldWrapChildren: b,
    };
  return mr.jsxs(DC.chakra.button, {
    disabled: o || a,
    ref: Rle.useMergeRefs(t, w),
    as: v,
    type: f ?? C,
    "data-active": vv.dataAttr(s),
    "data-loading": vv.dataAttr(a),
    __css: S,
    className: vv.cx("chakra-button", p),
    ...y,
    children: [
      a &&
        h === "start" &&
        mr.jsx(jC.ButtonSpinner, {
          className: "chakra-button__spinner--start",
          label: u,
          placement: "start",
          spacing: d,
          children: m,
        }),
      a
        ? u ||
          mr.jsx(DC.chakra.span, { opacity: 0, children: mr.jsx(NC, { ...T }) })
        : mr.jsx(NC, { ...T }),
      a &&
        h === "end" &&
        mr.jsx(jC.ButtonSpinner, {
          className: "chakra-button__spinner--end",
          label: u,
          placement: "end",
          spacing: d,
          children: m,
        }),
    ],
  });
});
jF.displayName = "Button";
function NC(e) {
  const {
    leftIcon: t,
    rightIcon: r,
    children: n,
    iconSpacing: o,
    shouldWrapChildren: a,
  } = e;
  return a
    ? mr.jsxs("span", {
        style: { display: "contents" },
        children: [
          t && mr.jsx(sd.ButtonIcon, { marginEnd: o, children: t }),
          n,
          r && mr.jsx(sd.ButtonIcon, { marginStart: o, children: r }),
        ],
      })
    : mr.jsxs(mr.Fragment, {
        children: [
          t && mr.jsx(sd.ButtonIcon, { marginEnd: o, children: t }),
          n,
          r && mr.jsx(sd.ButtonIcon, { marginStart: o, children: r }),
        ],
      });
}
J0.Button = jF;
var DF = {},
  OC = P,
  jle = x,
  Dle = g,
  Nle = ql,
  Ole = D,
  Ble = M;
const Lle = {
    horizontal: {
      "> *:first-of-type:not(:last-of-type)": { borderEndRadius: 0 },
      "> *:not(:first-of-type):not(:last-of-type)": { borderRadius: 0 },
      "> *:not(:first-of-type):last-of-type": { borderStartRadius: 0 },
    },
    vertical: {
      "> *:first-of-type:not(:last-of-type)": { borderBottomRadius: 0 },
      "> *:not(:first-of-type):not(:last-of-type)": { borderRadius: 0 },
      "> *:not(:first-of-type):last-of-type": { borderTopRadius: 0 },
    },
  },
  Vle = {
    horizontal: (e) => ({
      "& > *:not(style) ~ *:not(style)": { marginStart: e },
    }),
    vertical: (e) => ({ "& > *:not(style) ~ *:not(style)": { marginTop: e } }),
  },
  NF = Ole.forwardRef(function (t, r) {
    const {
        size: n,
        colorScheme: o,
        variant: a,
        className: s,
        spacing: i = "0.5rem",
        isAttached: c,
        isDisabled: l,
        orientation: u = "horizontal",
        ...d
      } = t,
      f = jle.cx("chakra-button__group", s),
      m = Dle.useMemo(
        () => ({ size: n, colorScheme: o, variant: a, isDisabled: l }),
        [n, o, a, l]
      );
    let h = { display: "inline-flex", ...(c ? Lle[u] : Vle[u](i)) };
    const p = u === "vertical";
    return OC.jsx(Nle.ButtonGroupProvider, {
      value: m,
      children: OC.jsx(Ble.chakra.div, {
        ref: r,
        role: "group",
        __css: h,
        className: f,
        "data-attached": c ? "" : void 0,
        "data-orientation": u,
        flexDir: p ? "column" : void 0,
        ...d,
      }),
    });
  });
NF.displayName = "ButtonGroup";
DF.ButtonGroup = NF;
var OF = {},
  zle = P,
  BC = g,
  Hle = J0,
  Wle = D;
const BF = Wle.forwardRef((e, t) => {
  const { icon: r, children: n, isRound: o, "aria-label": a, ...s } = e,
    i = r || n,
    c = BC.isValidElement(i)
      ? BC.cloneElement(i, { "aria-hidden": !0, focusable: !1 })
      : null;
  return zle.jsx(Hle.Button, {
    px: "0",
    py: "0",
    borderRadius: o ? "full" : void 0,
    ref: t,
    "aria-label": a,
    ...s,
    children: c,
  });
});
BF.displayName = "IconButton";
OF.IconButton = BF;
var LF = {},
  qa = {},
  Gle = en;
const [Ule, Kle] = Gle.createStylesContext("Card");
qa.CardStylesProvider = Ule;
qa.useCardStyles = Kle;
var LC = P,
  qle = I,
  Xle = x,
  Yle = qa,
  Zle = D,
  Qle = he,
  Jle = M;
const eue = Zle.forwardRef(function (t, r) {
  const {
      className: n,
      children: o,
      direction: a = "column",
      justify: s,
      align: i,
      ...c
    } = qle.omitThemingProps(t),
    l = Qle.useMultiStyleConfig("Card", t);
  return LC.jsx(Jle.chakra.div, {
    ref: r,
    className: Xle.cx("chakra-card", n),
    __css: {
      display: "flex",
      flexDirection: a,
      justifyContent: s,
      alignItems: i,
      position: "relative",
      minWidth: 0,
      wordWrap: "break-word",
      ...l.container,
    },
    ...c,
    children: LC.jsx(Yle.CardStylesProvider, { value: l, children: o }),
  });
});
LF.Card = eue;
var VF = {},
  tue = P,
  rue = x,
  nue = qa,
  oue = D,
  aue = M;
const sue = oue.forwardRef(function (t, r) {
  const { className: n, ...o } = t,
    a = nue.useCardStyles();
  return tue.jsx(aue.chakra.div, {
    ref: r,
    className: rue.cx("chakra-card__body", n),
    __css: a.body,
    ...o,
  });
});
VF.CardBody = sue;
var zF = {},
  iue = P,
  cue = x,
  lue = qa,
  uue = D,
  due = M;
const fue = uue.forwardRef(function (t, r) {
  const { className: n, justify: o, ...a } = t,
    s = lue.useCardStyles();
  return iue.jsx(due.chakra.div, {
    ref: r,
    className: cue.cx("chakra-card__footer", n),
    __css: { display: "flex", justifyContent: o, ...s.footer },
    ...a,
  });
});
zF.CardFooter = fue;
var HF = {},
  mue = P,
  hue = x,
  pue = qa,
  vue = D,
  yue = M;
const gue = vue.forwardRef(function (t, r) {
  const { className: n, ...o } = t,
    a = pue.useCardStyles();
  return mue.jsx(yue.chakra.div, {
    ref: r,
    className: hue.cx("chakra-card__header", n),
    __css: a.header,
    ...o,
  });
});
HF.CardHeader = gue;
var tS = {},
  bue = P,
  WF = M,
  Sue = D;
const GF = WF.chakra("div", {
  baseStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
GF.displayName = "Center";
const xue = {
    horizontal: { insetStart: "50%", transform: "translateX(-50%)" },
    vertical: { top: "50%", transform: "translateY(-50%)" },
    both: { insetStart: "50%", top: "50%", transform: "translate(-50%, -50%)" },
  },
  $ue = Sue.forwardRef(function (t, r) {
    const { axis: n = "both", ...o } = t;
    return bue.jsx(WF.chakra.div, {
      ref: r,
      __css: xue[n],
      ...o,
      position: "absolute",
    });
  });
tS.AbsoluteCenter = $ue;
tS.Center = GF;
var UF = {},
  Vm = {},
  wue = gg;
const [Cue, kue] = wue.createContext({
  name: "CheckboxGroupContext",
  strict: !1,
});
Vm.CheckboxGroupProvider = Cue;
Vm.useCheckboxGroupContext = kue;
var rS = {},
  ii = P,
  nS = M;
function Tue(e) {
  return ii.jsx(nS.chakra.svg, {
    width: "1.2em",
    viewBox: "0 0 12 10",
    style: {fill: "none",
      strokeWidth: 2,
      stroke: "currentColor",
      strokeDasharray: 16,
    },
    ...e,
    children: ii.jsx("polyline", { points: "1.5 6 4.5 9 10.5 1" }),
  });
}
function Pue(e) {
  return ii.jsx(nS.chakra.svg, {
    width: "1.2em",
    viewBox: "0 0 24 24",
    style: {stroke: "currentColor", strokeWidth: 4 },
    ...e,
    children: ii.jsx("line", { x1: "21", x2: "3", y1: "12", y2: "12" }),
  });
}
function Rue(e) {
  const { isIndeterminate: t, isChecked: r, ...n } = e,
    o = t ? Pue : Tue;
  return r || t
    ? ii.jsx(nS.chakra.div, {
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        },
        children: ii.jsx(o, { ...n }),
      })
    : null;
}
rS.CheckboxIcon = Rue;
var zm = {},
  oS = Object.defineProperty,
  Aue = Object.getOwnPropertyDescriptor,
  _ue = Object.getOwnPropertyNames,
  Iue = Object.prototype.hasOwnProperty,
  Eue = (e, t) => {
    for (var r in t) oS(e, r, { get: t[r], enumerable: !0 });
  },
  Mue = (e, t, r, n) => {
    if ((t && typeof t == "object") || typeof t == "function")
      for (let o of _ue(t))
        !Iue.call(e, o) &&
          o !== r &&
          oS(e, o, {
            get: () => t[o],
            enumerable: !(n = Aue(t, o)) || n.enumerable,
          });
    return e;
  },
  Fue = (e) => Mue(oS({}, "__esModule", { value: !0 }), e),
  KF = {};
Eue(KF, {
  MAX_Z_INDEX: () => mde,
  ariaAttr: () => Nue,
  contains: () => qF,
  createScope: () => Lue,
  dataAttr: () => Due,
  getActiveElement: () => Wue,
  getBeforeInputValue: () => Gue,
  getByText: () => QF,
  getByTypeahead: () => Que,
  getComputedStyle: () => ede,
  getDocument: () => Hue,
  getEventTarget: () => tde,
  getParent: () => aS,
  getPlatform: () => tj,
  getScrollParent: () => sS,
  getScrollParents: () => ej,
  getWindow: () => YF,
  indexOfId: () => Hm,
  isApple: () => cS,
  isDom: () => Xl,
  isEditableElement: () => rde,
  isFirefox: () => ide,
  isHTMLElement: () => ci,
  isIPhone: () => ade,
  isIos: () => cde,
  isMac: () => nj,
  isSafari: () => sde,
  isSelfEvent: () => Oue,
  isTouchDevice: () => rj,
  itemById: () => ZF,
  nextById: () => Uue,
  nextTick: () => dde,
  prevById: () => Kue,
  query: () => ude,
  queryAll: () => lde,
  raf: () => fde,
});
var jue = Fue(KF),
  Due = (e) => (e ? "" : void 0),
  Nue = (e) => (e ? "true" : void 0),
  ci = (e) =>
    typeof e == "object" &&
    (e == null ? void 0 : e.nodeType) === Node.ELEMENT_NODE &&
    typeof (e == null ? void 0 : e.nodeName) == "string";
function qF(e, t) {
  return !e || !t || !ci(e) || !ci(t) ? !1 : e === t || e.contains(t);
}
var Oue = (e) => qF(e.currentTarget, e.target),
  Bue = (e) =>
    e.nodeType === Node.DOCUMENT_NODE ? e : e.ownerDocument ?? document;
function Lue(e) {
  const t = {
    getRootNode: (r) => {
      var n;
      return ((n = r.getRootNode) == null ? void 0 : n.call(r)) ?? document;
    },
    getDoc: (r) => Bue(t.getRootNode(r)),
    getWin: (r) => t.getDoc(r).defaultView ?? window,
    getActiveElement: (r) => t.getDoc(r).activeElement,
    isActiveElement: (r, n) => n === t.getActiveElement(r),
    focus(r, n) {
      n != null && (t.isActiveElement(r, n) || n.focus({ preventScroll: !0 }));
    },
    getById: (r, n) => t.getRootNode(r).getElementById(n),
    setValue: (r, n) => {
      if (r == null || n == null) return;
      const o = n.toString();
      r.value !== o && (r.value = n.toString());
    },
  };
  return { ...t, ...e };
}
var XF = (e) => e.nodeType === Node.DOCUMENT_NODE,
  Vue = (e) => e.nodeType !== void 0,
  zue = (e) =>
    e && Vue(e) && e.nodeType === Node.DOCUMENT_FRAGMENT_NODE && "host" in e;
function Hue(e) {
  return XF(e) ? e : (e == null ? void 0 : e.ownerDocument) ?? document;
}
function YF(e) {
  var t;
  return zue(e)
    ? YF(e.host)
    : XF(e)
    ? e.defaultView ?? window
    : ci(e)
    ? ((t = e.ownerDocument) == null ? void 0 : t.defaultView) ?? window
    : window;
}
function Wue(e) {
  let t = e.ownerDocument.activeElement;
  for (; t != null && t.shadowRoot; ) {
    const r = t.shadowRoot.activeElement;
    if (r === t) break;
    t = r;
  }
  return t;
}
function Gue(e) {
  const { selectionStart: t, selectionEnd: r, value: n } = e.currentTarget;
  return n.slice(0, t) + e.data + n.slice(r);
}
function ZF(e, t) {
  return e.find((r) => r.id === t);
}
function Hm(e, t) {
  const r = ZF(e, t);
  return r ? e.indexOf(r) : -1;
}
function Uue(e, t, r = !0) {
  let n = Hm(e, t);
  return (n = r ? (n + 1) % e.length : Math.min(n + 1, e.length - 1)), e[n];
}
function Kue(e, t, r = !0) {
  let n = Hm(e, t);
  return n === -1
    ? r
      ? e[e.length - 1]
      : null
    : ((n = r ? (n - 1 + e.length) % e.length : Math.max(0, n - 1)), e[n]);
}
var que = (e) => e.dataset.valuetext ?? e.textContent ?? "",
  Xue = (e, t) => e.trim().toLowerCase().startsWith(t.toLowerCase()),
  Yue = (e, t) => e.map((r, n) => e[(Math.max(t, 0) + n) % e.length]);
function QF(e, t, r) {
  const n = r ? Hm(e, r) : -1;
  let o = r ? Yue(e, n) : e;
  return (
    t.length === 1 && (o = o.filter((s) => s.id !== r)),
    o.find((s) => Xue(que(s), t))
  );
}
function Zue(e, t) {
  const { state: r, activeId: n, key: o, timeout: a = 350 } = t,
    s = r.keysSoFar + o,
    c = s.length > 1 && Array.from(s).every((m) => m === s[0]) ? s[0] : s;
  let l = e.slice();
  const u = QF(l, c, n);
  function d() {
    clearTimeout(r.timer), (r.timer = -1);
  }
  function f(m) {
    (r.keysSoFar = m),
      d(),
      m !== "" &&
        (r.timer = +setTimeout(() => {
          f(""), d();
        }, a));
  }
  return f(s), u;
}
var Que = Object.assign(Zue, {
  defaultOptions: { keysSoFar: "", timer: -1 },
  isValidEvent: Jue,
});
function Jue(e) {
  return e.key.length === 1 && !e.ctrlKey && !e.metaKey;
}
var yv = new WeakMap();
function ede(e) {
  if (!yv.has(e)) {
    const t = e.ownerDocument.defaultView || window;
    yv.set(e, t.getComputedStyle(e));
  }
  return yv.get(e);
}
function tde(e) {
  var t;
  return ((t = e.composedPath) == null ? void 0 : t.call(e)[0]) ?? e.target;
}
function JF(e) {
  const t = e.ownerDocument.defaultView || window,
    { overflow: r, overflowX: n, overflowY: o } = t.getComputedStyle(e);
  return /auto|scroll|overlay|hidden/.test(r + o + n);
}
function aS(e) {
  return e.localName === "html"
    ? e
    : e.assignedSlot || e.parentElement || e.ownerDocument.documentElement;
}
function sS(e) {
  return ["html", "body", "#document"].includes(e.localName)
    ? e.ownerDocument.body
    : ci(e) && JF(e)
    ? e
    : sS(aS(e));
}
function ej(e, t = []) {
  const r = sS(e),
    n = r === e.ownerDocument.body,
    o = r.ownerDocument.defaultView || window,
    a = n ? [o].concat(o.visualViewport || [], JF(r) ? r : []) : r,
    s = t.concat(a);
  return n ? s : s.concat(ej(aS(a)));
}
function rde(e) {
  if (e == null || !ci(e)) return !1;
  try {
    const t = e.ownerDocument.defaultView || window;
    return (
      (e instanceof t.HTMLInputElement && e.selectionStart != null) ||
      /(textarea|select)/.test(e.localName) ||
      e.isContentEditable
    );
  } catch {
    return !1;
  }
}
var Xl = () => typeof document < "u";
function tj() {
  const e = navigator.userAgentData;
  return (e == null ? void 0 : e.platform) ?? navigator.platform;
}
var iS = (e) => Xl() && e.test(tj()),
  nde = (e) => Xl() && e.test(navigator.userAgent),
  ode = (e) => Xl() && e.test(navigator.vendor),
  rj = () => Xl() && !!navigator.maxTouchPoints,
  nj = () => iS(/^Mac/) && !rj(),
  ade = () => iS(/^iPhone/),
  sde = () => cS() && ode(/apple/i),
  ide = () => nde(/firefox\//i),
  cS = () => iS(/mac|iphone|ipad|ipod/i),
  cde = () => cS() && !nj();
function lde(e, t) {
  return Array.from((e == null ? void 0 : e.querySelectorAll(t)) ?? []);
}
function ude(e, t) {
  return e == null ? void 0 : e.querySelector(t);
}
function dde(e) {
  const t = new Set();
  function r(n) {
    const o = globalThis.requestAnimationFrame(n);
    t.add(() => globalThis.cancelAnimationFrame(o));
  }
  return (
    r(() => r(e)),
    function () {
      t.forEach((o) => o());
    }
  );
}
function fde(e) {
  const t = globalThis.requestAnimationFrame(e);
  return () => {
    globalThis.cancelAnimationFrame(t);
  };
}
var mde = 2147483647,
  lS = Object.defineProperty,
  hde = Object.getOwnPropertyDescriptor,
  pde = Object.getOwnPropertyNames,
  vde = Object.prototype.hasOwnProperty,
  yde = (e, t) => {
    for (var r in t) lS(e, r, { get: t[r], enumerable: !0 });
  },
  gde = (e, t, r, n) => {
    if ((t && typeof t == "object") || typeof t == "function")
      for (let o of pde(t))
        !vde.call(e, o) &&
          o !== r &&
          lS(e, o, {
            get: () => t[o],
            enumerable: !(n = hde(t, o)) || n.enumerable,
          });
    return e;
  },
  bde = (e) => gde(lS({}, "__esModule", { value: !0 }), e),
  oj = {};
yde(oj, {
  getInteractionModality: () => _de,
  setInteractionModality: () => Ade,
  trackFocusVisible: () => Pde,
  trackInteractionModality: () => Rde,
});
var aj = bde(oj),
  Sde = jue,
  VC = !1,
  Jn = null,
  Aa = !1,
  Hy = !1,
  pl = new Set();
function Wm(e, t) {
  pl.forEach((r) => r(e, t));
}
var xde =
  typeof window < "u" && window.navigator != null
    ? /^Mac/.test(window.navigator.platform)
    : !1;
function $de(e) {
  return !(
    e.metaKey ||
    (!xde && e.altKey) ||
    e.ctrlKey ||
    e.key === "Control" ||
    e.key === "Shift" ||
    e.key === "Meta"
  );
}
function zC(e) {
  (Aa = !0), $de(e) && ((Jn = "keyboard"), Wm("keyboard", e));
}
function ls(e) {
  if (((Jn = "pointer"), e.type === "mousedown" || e.type === "pointerdown")) {
    Aa = !0;
    const t = e.composedPath ? e.composedPath()[0] : e.target;
    let r = !1;
    try {
      r = t.matches(":focus-visible");
    } catch {}
    if (r) return;
    Wm("pointer", e);
  }
}
function wde(e) {
  return e.mozInputSource === 0 && e.isTrusted
    ? !0
    : e.detail === 0 && !e.pointerType;
}
function Cde(e) {
  wde(e) && ((Aa = !0), (Jn = "virtual"));
}
function kde(e) {
  e.target === window ||
    e.target === document ||
    (e.target instanceof Element && e.target.hasAttribute("tabindex")) ||
    (!Aa && !Hy && ((Jn = "virtual"), Wm("virtual", e)), (Aa = !1), (Hy = !1));
}
function Tde() {
  (Aa = !1), (Hy = !0);
}
function HC() {
  return Jn !== "pointer";
}
function sj() {
  if (!(0, Sde.isDom)() || VC) return;
  const { focus: e } = HTMLElement.prototype;
  (HTMLElement.prototype.focus = function (...r) {
    (Aa = !0), e.apply(this, r);
  }),
    document.addEventListener("keydown", zC, !0),
    document.addEventListener("keyup", zC, !0),
    document.addEventListener("click", Cde, !0),
    window.addEventListener("focus", kde, !0),
    window.addEventListener("blur", Tde, !1),
    typeof PointerEvent < "u"
      ? (document.addEventListener("pointerdown", ls, !0),
        document.addEventListener("pointermove", ls, !0),
        document.addEventListener("pointerup", ls, !0))
      : (document.addEventListener("mousedown", ls, !0),
        document.addEventListener("mousemove", ls, !0),
        document.addEventListener("mouseup", ls, !0)),
    (VC = !0);
}
function Pde(e) {
  sj(), e(HC());
  const t = () => e(HC());
  return (
    pl.add(t),
    () => {
      pl.delete(t);
    }
  );
}
function Rde(e) {
  sj(), e(Jn);
  const t = () => e(Jn);
  return (
    pl.add(t),
    () => {
      pl.delete(t);
    }
  );
}
function Ade(e) {
  (Jn = e), Wm(e, null);
}
function _de() {
  return Jn;
}
var Ko = {},
  uo = {},
  Xd = P,
  WC = le,
  Ide = I,
  Er = x,
  On = g,
  ij = D,
  Ede = he,
  cj = M;
const [Mde, lj] = Er.createContext({
    name: "FormControlStylesContext",
    errorMessage: `useFormControlStyles returned is 'undefined'. Seems you forgot to wrap the components in "<FormControl />" `,
  }),
  [Fde, uj] = Er.createContext({ strict: !1, name: "FormControlContext" });
function jde(e) {
  const {
      id: t,
      isRequired: r,
      isInvalid: n,
      isDisabled: o,
      isReadOnly: a,
      ...s
    } = e,
    i = On.useId(),
    c = t || `field-${i}`,
    l = `${c}-label`,
    u = `${c}-feedback`,
    d = `${c}-helptext`,
    [f, m] = On.useState(!1),
    [h, p] = On.useState(!1),
    [v, b] = On.useState(!1),
    y = On.useCallback(
      (k = {}, R = null) => ({
        id: d,
        ...k,
        ref: WC.mergeRefs(R, (E) => {
          E && p(!0);
        }),
      }),
      [d]
    ),
    S = On.useCallback(
      (k = {}, R = null) => ({
        ...k,
        ref: R,
        "data-focus": Er.dataAttr(v),
        "data-disabled": Er.dataAttr(o),
        "data-invalid": Er.dataAttr(n),
        "data-readonly": Er.dataAttr(a),
        id: k.id !== void 0 ? k.id : l,
        htmlFor: k.htmlFor !== void 0 ? k.htmlFor : c,
      }),
      [c, o, v, n, a, l]
    ),
    w = On.useCallback(
      (k = {}, R = null) => ({
        id: u,
        ...k,
        ref: WC.mergeRefs(R, (E) => {
          E && m(!0);
        }),
        "aria-live": "polite",
      }),
      [u]
    ),
    C = On.useCallback(
      (k = {}, R = null) => ({
        ...k,
        ...s,
        ref: R,
        role: "group",
        "data-focus": Er.dataAttr(v),
        "data-disabled": Er.dataAttr(o),
        "data-invalid": Er.dataAttr(n),
        "data-readonly": Er.dataAttr(a),
      }),
      [s, o, v, n, a]
    ),
    T = On.useCallback(
      (k = {}, R = null) => ({
        ...k,
        ref: R,
        role: "presentation",
        "aria-hidden": !0,
        children: k.children || "*",
      }),
      []
    );
  return {
    isRequired: !!r,
    isInvalid: !!n,
    isReadOnly: !!a,
    isDisabled: !!o,
    isFocused: !!v,
    onFocus: () => b(!0),
    onBlur: () => b(!1),
    hasFeedbackText: f,
    setHasFeedbackText: m,
    hasHelpText: h,
    setHasHelpText: p,
    id: c,
    labelId: l,
    feedbackId: u,
    helpTextId: d,
    htmlProps: s,
    getHelpTextProps: y,
    getErrorMessageProps: w,
    getRootProps: C,
    getLabelProps: S,
    getRequiredIndicatorProps: T,
  };
}
const dj = ij.forwardRef(function (t, r) {
  const n = Ede.useMultiStyleConfig("Form", t),
    o = Ide.omitThemingProps(t),
    { getRootProps: a, htmlProps: s, ...i } = jde(o),
    c = Er.cx("chakra-form-control", t.className);
  return Xd.jsx(Fde, {
    value: i,
    children: Xd.jsx(Mde, {
      value: n,
      children: Xd.jsx(cj.chakra.div, {
        ...a({}, r),
        className: c,
        __css: n.container,
      }),
    }),
  });
});
dj.displayName = "FormControl";
const fj = ij.forwardRef(function (t, r) {
  const n = uj(),
    o = lj(),
    a = Er.cx("chakra-form__helper-text", t.className);
  return Xd.jsx(cj.chakra.div, {
    ...(n == null ? void 0 : n.getHelpTextProps(t, r)),
    __css: o.helperText,
    className: a,
  });
});
fj.displayName = "FormHelperText";
uo.FormControl = dj;
uo.FormHelperText = fj;
uo.useFormControlContext = uj;
uo.useFormControlStyles = lj;
var Kc = x,
  Dde = uo;
function Nde(e) {
  const {
    isDisabled: t,
    isInvalid: r,
    isReadOnly: n,
    isRequired: o,
    ...a
  } = mj(e);
  return {
    ...a,
    disabled: t,
    readOnly: n,
    required: o,
    "aria-invalid": Kc.ariaAttr(r),
    "aria-required": Kc.ariaAttr(o),
    "aria-readonly": Kc.ariaAttr(n),
  };
}
function mj(e) {
  const t = Dde.useFormControlContext(),
    {
      id: r,
      disabled: n,
      readOnly: o,
      required: a,
      isRequired: s,
      isInvalid: i,
      isReadOnly: c,
      isDisabled: l,
      onFocus: u,
      onBlur: d,
      ...f
    } = e,
    m = e["aria-describedby"] ? [e["aria-describedby"]] : [];
  return (
    t != null &&
      t.hasFeedbackText &&
      t != null &&
      t.isInvalid &&
      m.push(t.feedbackId),
    t != null && t.hasHelpText && m.push(t.helpTextId),
    {
      ...f,
      "aria-describedby": m.join(" ") || void 0,
      id: r ?? (t == null ? void 0 : t.id),
      isDisabled: n ?? l ?? (t == null ? void 0 : t.isDisabled),
      isReadOnly: o ?? c ?? (t == null ? void 0 : t.isReadOnly),
      isRequired: a ?? s ?? (t == null ? void 0 : t.isRequired),
      isInvalid: i ?? (t == null ? void 0 : t.isInvalid),
      onFocus: Kc.callAllHandlers(t == null ? void 0 : t.onFocus, u),
      onBlur: Kc.callAllHandlers(t == null ? void 0 : t.onBlur, d),
    }
  );
}
Ko.useFormControl = Nde;
Ko.useFormControlProps = mj;
var Yl = {};
const Ode = {border: "0",
  clip: "rect(0, 0, 0, 0)",
  height: "1px",
  width: "1px",
  margin: "-1px",
  padding: "0",
  overflow: "hidden",
  whiteSpace: "nowrap",
  position: "absolute",
};
Yl.visuallyHiddenStyle = Ode;
var Bn = le,
  Re = x,
  Bde = aj,
  _t = g,
  Lde = Ko,
  Vde = Yl;
function zde(e = {}) {
  const t = Lde.useFormControlProps(e),
    {
      isDisabled: r,
      isReadOnly: n,
      isRequired: o,
      isInvalid: a,
      id: s,
      onBlur: i,
      onFocus: c,
      "aria-describedby": l,
    } = t,
    {
      defaultChecked: u,
      isChecked: d,
      isFocusable: f,
      onChange: m,
      isIndeterminate: h,
      name: p,
      value: v,
      tabIndex: b = void 0,
      "aria-label": y,
      "aria-labelledby": S,
      "aria-invalid": w,
      ...C
    } = e,
    T = Re.omit(C, [
      "isDisabled",
      "isReadOnly",
      "isRequired",
      "isInvalid",
      "id",
      "onBlur",
      "onFocus",
      "aria-describedby",
    ]),
    k = Bn.useCallbackRef(m),
    R = Bn.useCallbackRef(i),
    E = Bn.useCallbackRef(c),
    [_, N] = _t.useState(!1),
    [G, B] = _t.useState(!1),
    [z, Y] = _t.useState(!1),
    [W, j] = _t.useState(!1);
  _t.useEffect(() => Bde.trackFocusVisible(N), []);
  const O = _t.useRef(null),
    [K, ve] = _t.useState(!0),
    [re, ue] = _t.useState(!!u),
    L = d !== void 0,
    V = L ? d : re,
    ee = _t.useCallback(
      (ae) => {
        if (n || r) {
          ae.preventDefault();
          return;
        }
        L ||
          ue(V ? ae.currentTarget.checked : h ? !0 : ae.currentTarget.checked),
          k == null || k(ae);
      },
      [n, r, V, L, h, k]
    );
  Bn.useSafeLayoutEffect(() => {
    O.current && (O.current.indeterminate = !!h);
  }, [h]),
    Bn.useUpdateEffect(() => {
      r && B(!1);
    }, [r, B]),
    Bn.useSafeLayoutEffect(() => {
      const ae = O.current;
      if (!(ae != null && ae.form)) return;
      const ye = () => {
        ue(!!u);
      };
      return (
        ae.form.addEventListener("reset", ye),
        () => {
          var U;
          return (U = ae.form) == null
            ? void 0
            : U.removeEventListener("reset", ye);
        }
      );
    }, []);
  const pe = r && !f,
    xe = _t.useCallback(
      (ae) => {
        ae.key === " " && j(!0);
      },
      [j]
    ),
    Ce = _t.useCallback(
      (ae) => {
        ae.key === " " && j(!1);
      },
      [j]
    );
  Bn.useSafeLayoutEffect(() => {
    if (!O.current) return;
    O.current.checked !== V && ue(O.current.checked);
  }, [O.current]);
  const X = _t.useCallback(
      (ae = {}, ye = null) => {
        const U = (be) => {
          G && be.preventDefault(), j(!0);
        };
        return {
          ...ae,
          ref: ye,
          "data-active": Re.dataAttr(W),
          "data-hover": Re.dataAttr(z),
          "data-checked": Re.dataAttr(V),
          "data-focus": Re.dataAttr(G),
          "data-focus-visible": Re.dataAttr(G && _),
          "data-indeterminate": Re.dataAttr(h),
          "data-disabled": Re.dataAttr(r),
          "data-invalid": Re.dataAttr(a),
          "data-readonly": Re.dataAttr(n),
          "aria-hidden": !0,
          onMouseDown: Re.callAllHandlers(ae.onMouseDown, U),
          onMouseUp: Re.callAllHandlers(ae.onMouseUp, () => j(!1)),
          onMouseEnter: Re.callAllHandlers(ae.onMouseEnter, () => Y(!0)),
          onMouseLeave: Re.callAllHandlers(ae.onMouseLeave, () => Y(!1)),
        };
      },
      [W, V, r, G, _, z, h, a, n]
    ),
    de = _t.useCallback(
      (ae = {}, ye = null) => ({
        ...ae,
        ref: ye,
        "data-active": Re.dataAttr(W),
        "data-hover": Re.dataAttr(z),
        "data-checked": Re.dataAttr(V),
        "data-focus": Re.dataAttr(G),
        "data-focus-visible": Re.dataAttr(G && _),
        "data-indeterminate": Re.dataAttr(h),
        "data-disabled": Re.dataAttr(r),
        "data-invalid": Re.dataAttr(a),
        "data-readonly": Re.dataAttr(n),
      }),
      [W, V, r, G, _, z, h, a, n]
    ),
    Q = _t.useCallback(
      (ae = {}, ye = null) => ({
        ...T,
        htmlFor: K ? s : void 0,
        ...ae,
        ref: Bn.mergeRefs(ye, (U) => {
          U && ve(U.tagName === "LABEL");
        }),
        onClick: Re.callAllHandlers(ae.onClick, () => {
          var U;
          K ||
            ((U = O.current) == null || U.click(),
            requestAnimationFrame(() => {
              var be;
              (be = O.current) == null || be.focus({ preventScroll: !0 });
            }));
        }),
        "data-disabled": Re.dataAttr(r),
        "data-checked": Re.dataAttr(V),
        "data-invalid": Re.dataAttr(a),
      }),
      [T, r, V, a, K, s]
    ),
    J = _t.useCallback(
      (ae = {}, ye = null) => ({
        ...ae,
        ref: Bn.mergeRefs(O, ye),
        type: "checkbox",
        name: p,
        value: v,
        id: s,
        tabIndex: b,
        onChange: Re.callAllHandlers(ae.onChange, ee),
        onBlur: Re.callAllHandlers(ae.onBlur, R, () => B(!1)),
        onFocus: Re.callAllHandlers(ae.onFocus, E, () => B(!0)),
        onKeyDown: Re.callAllHandlers(ae.onKeyDown, xe),
        onKeyUp: Re.callAllHandlers(ae.onKeyUp, Ce),
        required: o,
        checked: V,
        disabled: pe,
        readOnly: n,
        "aria-label": y,
        "aria-labelledby": S,
        "aria-invalid": w ? !!w : a,
        "aria-describedby": l,
        "aria-disabled": r,
        "aria-checked": h ? "mixed" : V,
        style: Vde.visuallyHiddenStyle,
      }),
      [p, v, s, b, ee, R, E, xe, Ce, o, V, pe, n, y, S, w, a, l, r, h]
    ),
    ne = _t.useCallback(
      (ae = {}, ye = null) => ({
        ...ae,
        ref: ye,
        onMouseDown: Re.callAllHandlers(ae.onMouseDown, Hde),
        "data-disabled": Re.dataAttr(r),
        "data-checked": Re.dataAttr(V),
        "data-invalid": Re.dataAttr(a),
      }),
      [V, r, a]
    );
  return {
    state: {
      isInvalid: a,
      isFocused: G,
      isChecked: V,
      isActive: W,
      isHovered: z,
      isIndeterminate: h,
      isDisabled: r,
      isReadOnly: n,
      isRequired: o,
    },
    getRootProps: Q,
    getCheckboxProps: X,
    getIndicatorProps: de,
    getInputProps: J,
    getLabelProps: ne,
    htmlProps: T,
  };
}
function Hde(e) {
  e.preventDefault(), e.stopPropagation();
}
zm.useCheckbox = zde;
var hj = {},
  GC = g;
function Wde(e) {
  const [t, r] = GC.useState(e),
    [n, o] = GC.useState(!1);
  return e !== t && (o(!0), r(e)), n;
}
hj.useInitialAnimationState = Wde;
var vc = P,
  Gde = I,
  gv = x,
  uS = Vo,
  UC = g,
  Ude = Vm,
  Kde = rS,
  qde = zm,
  Xde = hj,
  Yde = D,
  Zde = he,
  bv = M;
const Qde = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    verticalAlign: "top",
    userSelect: "none",
    flexShrink: 0,
  },
  Jde = {
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    verticalAlign: "top",
    position: "relative",
  },
  efe = uS.keyframes({
    from: { opacity: 0, strokeDashoffset: 16, transform: "scale(0.95)" },
    to: { opacity: 1, strokeDashoffset: 0, transform: "scale(1)" },
  }),
  tfe = uS.keyframes({ from: { opacity: 0 }, to: { opacity: 1 } }),
  rfe = uS.keyframes({
    from: { transform: "scaleX(0.65)" },
    to: { transform: "scaleX(1)" },
  }),
  pj = Yde.forwardRef(function (t, r) {
    const n = Ude.useCheckboxGroupContext(),
      o = { ...n, ...t },
      a = Zde.useMultiStyleConfig("Checkbox", o),
      s = Gde.omitThemingProps(t),
      {
        spacing: i = "0.5rem",
        className: c,
        children: l,
        iconColor: u,
        iconSize: d,
        icon: f = vc.jsx(Kde.CheckboxIcon, {}),
        isChecked: m,
        isDisabled: h = n == null ? void 0 : n.isDisabled,
        onChange: p,
        inputProps: v,
        ...b
      } = s;
    let y = m;
    n != null && n.value && s.value && (y = n.value.includes(s.value));
    let S = p;
    n != null && n.onChange && s.value && (S = gv.callAll(n.onChange, p));
    const {
        state: w,
        getInputProps: C,
        getCheckboxProps: T,
        getLabelProps: k,
        getRootProps: R,
      } = qde.useCheckbox({ ...b, isDisabled: h, isChecked: y, onChange: S }),
      E = Xde.useInitialAnimationState(w.isChecked),
      _ = UC.useMemo(
        () => ({
          animation: E
            ? w.isIndeterminate
              ? `${tfe} 20ms linear, ${rfe} 200ms linear`
              : `${efe} 200ms linear`
            : void 0,
          ...a.icon,
          ...gv.compact({ fontSize: d, color: u }),
        }),
        [u, d, E, w.isIndeterminate, a.icon]
      ),
      N = UC.cloneElement(f, {
        __css: _,
        isIndeterminate: w.isIndeterminate,
        isChecked: w.isChecked,
      });
    return vc.jsxs(bv.chakra.label, {
      __css: { ...Jde, ...a.container },
      className: gv.cx("chakra-checkbox", c),
      ...R(),
      children: [
        vc.jsx("input", { className: "chakra-checkbox__input", ...C(v, r) }),
        vc.jsx(bv.chakra.span, {
          __css: { ...Qde, ...a.control },
          className: "chakra-checkbox__control",
          ...T(),
          children: N,
        }),
        l &&
          vc.jsx(bv.chakra.span, {
            className: "chakra-checkbox__label",
            ...k(),
            __css: { marginStart: i, ...a.label },
            children: l,
          }),
      ],
    });
  });
pj.displayName = "Checkbox";
UF.Checkbox = pj;
var vj = {},
  dS = {},
  KC = le,
  qC = x,
  XC = g;
function YC(e) {
  return e && qC.isObject(e) && qC.isObject(e.target);
}
function nfe(e = {}) {
  const {
      defaultValue: t,
      value: r,
      onChange: n,
      isDisabled: o,
      isNative: a,
    } = e,
    s = KC.useCallbackRef(n),
    [i, c] = KC.useControllableState({
      value: r,
      defaultValue: t || [],
      onChange: s,
    }),
    l = XC.useCallback(
      (d) => {
        if (!i) return;
        const f = YC(d) ? d.target.checked : !i.includes(d),
          m = YC(d) ? d.target.value : d,
          h = f ? [...i, m] : i.filter((p) => String(p) !== String(m));
        c(h);
      },
      [c, i]
    ),
    u = XC.useCallback(
      (d = {}) => ({
        ...d,
        [a ? "checked" : "isChecked"]: i.some(
          (m) => String(d.value) === String(m)
        ),
        onChange: l,
      }),
      [l, a, i]
    );
  return {
    value: i,
    isDisabled: o,
    onChange: l,
    setValue: c,
    getCheckboxProps: u,
  };
}
dS.useCheckboxGroup = nfe;
var ofe = P,
  afe = g,
  sfe = Vm,
  ife = dS;
function yj(e) {
  const { colorScheme: t, size: r, variant: n, children: o, isDisabled: a } = e,
    { value: s, onChange: i } = ife.useCheckboxGroup(e),
    c = afe.useMemo(
      () => ({
        size: r,
        onChange: i,
        colorScheme: t,
        value: s,
        variant: n,
        isDisabled: a,
      }),
      [r, i, t, s, n, a]
    );
  return ofe.jsx(sfe.CheckboxGroupProvider, { value: c, children: o });
}
yj.displayName = "CheckboxGroup";
vj.CheckboxGroup = yj;
var gj = {},
  cfe = P,
  lfe = I,
  ufe = x,
  dfe = D,
  ffe = he,
  mfe = M;
const bj = dfe.forwardRef(function (t, r) {
  const n = ffe.useStyleConfig("Code", t),
    { className: o, ...a } = lfe.omitThemingProps(t);
  return cfe.jsx(mfe.chakra.code, {
    ref: r,
    className: ufe.cx("chakra-code", t.className),
    ...a,
    __css: { display: "inline-block", ...n },
  });
});
bj.displayName = "Code";
gj.Code = bj;
var fS = {},
  hfe = P;
const pfe = new Set(["dark", "light", "system"]);
function vfe(e) {
  let t = e;
  return pfe.has(t) || (t = "light"), t;
}
function Sj(e = {}) {
  const {
      initialColorMode: t = "light",
      type: r = "localStorage",
      storageKey: n = "chakra-ui-color-mode",
    } = e,
    o = vfe(t),
    a = r === "cookie",
    s = `(function(){try{var a=function(o){var l="(prefers-color-scheme: dark)",v=window.matchMedia(l).matches?"dark":"light",e=o==="system"?v:o,d=document.documentElement,m=document.body,i="chakra-ui-light",n="chakra-ui-dark",s=e==="dark";return m.classList.add(s?n:i),m.classList.remove(s?i:n),d.style.colorScheme=e,d.dataset.theme=e,e},u=a,h="${o}",r="${n}",t=document.cookie.match(new RegExp("(^| )".concat(r,"=([^;]+)"))),c=t?t[2]:null;c?a(c):document.cookie="".concat(r,"=").concat(a(h),"; max-age=31536000; path=/")}catch(a){}})();
  `,
    i = `(function(){try{var a=function(c){var v="(prefers-color-scheme: dark)",h=window.matchMedia(v).matches?"dark":"light",r=c==="system"?h:c,o=document.documentElement,s=document.body,l="chakra-ui-light",d="chakra-ui-dark",i=r==="dark";return s.classList.add(i?d:l),s.classList.remove(i?l:d),o.style.colorScheme=r,o.dataset.theme=r,r},n=a,m="${o}",e="${n}",t=localStorage.getItem(e);t?a(t):localStorage.setItem(e,a(m))}catch(a){}})();
  `;
  return `!${a ? s : i}`.trim();
}
function yfe(e = {}) {
  const { nonce: t } = e;
  return hfe.jsx("script", {
    id: "chakra-script",
    nonce: t,
    dangerouslySetInnerHTML: { __html: Sj(e) },
  });
}
fS.ColorModeScript = yfe;
fS.getScriptSrc = Sj;
var xj = {},
  gfe = P,
  bfe = I,
  Sfe = x,
  xfe = D,
  $fe = he,
  wfe = M;
const $j = xfe.forwardRef(function (t, r) {
  const { className: n, centerContent: o, ...a } = bfe.omitThemingProps(t),
    s = $fe.useStyleConfig("Container", t);
  return gfe.jsx(wfe.chakra.div, {
    ref: r,
    className: Sfe.cx("chakra-container", n),
    ...a,
    __css: {
      ...s,
      ...(o && {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }),
    },
  });
});
$j.displayName = "Container";
xj.Container = $j;
var wj = {},
  Cfe = P,
  kfe = M;
const Cj = (e) => {
  const {
      type: t = "checkbox",
      _hover: r,
      _invalid: n,
      _disabled: o,
      _focus: a,
      _checked: s,
      _child: i = { opacity: 0 },
      _checkedAndChild: c = { opacity: 1 },
      _checkedAndDisabled: l,
      _checkedAndFocus: u,
      _checkedAndHover: d,
      children: f,
      ...m
    } = e,
    h = `input[type=${t}]:checked:disabled + &`,
    p = `input[type=${t}]:checked:hover:not(:disabled) + &`,
    v = `input[type=${t}]:checked:focus + &`,
    b = `input[type=${t}]:disabled + &`,
    y = `input[type=${t}]:focus + &`,
    S = `input[type=${t}]:hover:not(:disabled):not(:checked) + &`,
    w = `input[type=${t}]:checked + &, input[type=${t}][aria-checked=mixed] + &`,
    C = `input[type=${t}][aria-invalid=true] + &`,
    T = "& > *";
  return Cfe.jsx(kfe.chakra.div, {
    ...m,
    "aria-hidden": !0,
    __css: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      transitionProperty: "common",
      transitionDuration: "fast",
      flexShrink: 0,
      [y]: a,
      [S]: r,
      [b]: o,
      [C]: n,
      [h]: l,
      [v]: u,
      [p]: d,
      [T]: i,
      [w]: { ...s, [T]: c },
    },
    children: f,
  });
};
Cj.displayName = "ControlBox";
wj.ControlBox = Cj;
var kj = {},
  Tfe = P,
  Pfe = I,
  Rfe = x,
  Afe = D,
  _fe = he,
  Ife = M;
const Tj = Afe.forwardRef(function (t, r) {
  const {
      borderLeftWidth: n,
      borderBottomWidth: o,
      borderTopWidth: a,
      borderRightWidth: s,
      borderWidth: i,
      borderStyle: c,
      borderColor: l,
      ...u
    } = _fe.useStyleConfig("Divider", t),
    {
      className: d,
      orientation: f = "horizontal",
      __css: m,
      ...h
    } = Pfe.omitThemingProps(t),
    p = {
      vertical: { borderLeftWidth: n || s || i || "1px", height: "100%" },
      horizontal: { borderBottomWidth: o || a || i || "1px", width: "100%" },
    };
  return Tfe.jsx(Ife.chakra.hr, {
    ref: r,
    "aria-orientation": f,
    ...h,
    __css: { ...u, border: "0", borderColor: l, borderStyle: c, ...p[f], ...m },
    className: Rfe.cx("chakra-divider", d),
  });
});
Tj.displayName = "Divider";
kj.Divider = Tj;
var Pj = {},
  nn = {},
  Rj = x;
const [Efe, Mfe] = Rj.createContext({
    name: "EditableStylesContext",
    errorMessage: `useEditableStyles returned is 'undefined'. Seems you forgot to wrap the components in "<Editable />" `,
  }),
  [Ffe, jfe] = Rj.createContext({
    name: "EditableContext",
    errorMessage:
      "useEditableContext: context is undefined. Seems you forgot to wrap the editable components in `<Editable />`",
  });
nn.EditableProvider = Ffe;
nn.EditableStylesProvider = Efe;
nn.useEditableContext = jfe;
nn.useEditableStyles = Mfe;
var mS = {},
  Hr = le,
  Bt = x,
  et = g;
function ZC(e, t) {
  return e ? e === t || e.contains(t) : !1;
}
function Dfe(e = {}) {
  const {
      onChange: t,
      onCancel: r,
      onSubmit: n,
      onBlur: o,
      value: a,
      isDisabled: s,
      defaultValue: i,
      startWithEditView: c,
      isPreviewFocusable: l = !0,
      submitOnBlur: u = !0,
      selectAllOnFocus: d = !0,
      placeholder: f,
      onEdit: m,
      finalFocusRef: h,
      ...p
    } = e,
    v = Hr.useCallbackRef(m),
    b = !!(c && !s),
    [y, S] = et.useState(b),
    [w, C] = Hr.useControllableState({
      defaultValue: i || "",
      value: a,
      onChange: t,
    }),
    [T, k] = et.useState(w),
    R = et.useRef(null),
    E = et.useRef(null),
    _ = et.useRef(null),
    N = et.useRef(null),
    G = et.useRef(null);
  Hr.useFocusOnPointerDown({ ref: R, enabled: y, elements: [N, G] });
  const B = !y && !s;
  Hr.useSafeLayoutEffect(() => {
    var X, de;
    y &&
      ((X = R.current) == null || X.focus(),
      d && ((de = R.current) == null || de.select()));
  }, []),
    Hr.useUpdateEffect(() => {
      var X, de, Q, J;
      if (!y) {
        h
          ? (X = h.current) == null || X.focus()
          : (de = _.current) == null || de.focus();
        return;
      }
      (Q = R.current) == null || Q.focus(),
        d && ((J = R.current) == null || J.select()),
        v == null || v();
    }, [y, v, d]);
  const z = et.useCallback(() => {
      B && S(!0);
    }, [B]),
    Y = et.useCallback(() => {
      k(w);
    }, [w]),
    W = et.useCallback(() => {
      S(!1), C(T), r == null || r(T), o == null || o(T);
    }, [r, o, C, T]),
    j = et.useCallback(() => {
      S(!1), k(w), n == null || n(w), o == null || o(T);
    }, [w, n, o, T]);
  et.useEffect(() => {
    if (y) return;
    const X = R.current;
    (X == null ? void 0 : X.ownerDocument.activeElement) === X &&
      (X == null || X.blur());
  }, [y]);
  const O = et.useCallback(
      (X) => {
        C(X.currentTarget.value);
      },
      [C]
    ),
    K = et.useCallback(
      (X) => {
        const de = X.key,
          J = {
            Escape: W,
            Enter: (ne) => {
              !ne.shiftKey && !ne.metaKey && j();
            },
          }[de];
        J && (X.preventDefault(), J(X));
      },
      [W, j]
    ),
    ve = et.useCallback(
      (X) => {
        const de = X.key,
          J = { Escape: W }[de];
        J && (X.preventDefault(), J(X));
      },
      [W]
    ),
    re = w.length === 0,
    ue = et.useCallback(
      (X) => {
        if (!y) return;
        const de = X.currentTarget.ownerDocument,
          Q = X.relatedTarget ?? de.activeElement,
          J = ZC(N.current, Q),
          ne = ZC(G.current, Q);
        !J && !ne && (u ? j() : W());
      },
      [u, j, W, y]
    ),
    L = et.useCallback(
      (X = {}, de = null) => {
        const Q = B && l ? 0 : void 0;
        return {
          ...X,
          ref: Hr.mergeRefs(de, E),
          children: re ? f : w,
          hidden: y,
          "aria-disabled": Bt.ariaAttr(s),
          tabIndex: Q,
          onFocus: Bt.callAllHandlers(X.onFocus, z, Y),
        };
      },
      [s, y, B, l, re, z, Y, f, w]
    ),
    V = et.useCallback(
      (X = {}, de = null) => ({
        ...X,
        hidden: !y,
        placeholder: f,
        ref: Hr.mergeRefs(de, R),
        disabled: s,
        "aria-disabled": Bt.ariaAttr(s),
        value: w,
        onBlur: Bt.callAllHandlers(X.onBlur, ue),
        onChange: Bt.callAllHandlers(X.onChange, O),
        onKeyDown: Bt.callAllHandlers(X.onKeyDown, K),
        onFocus: Bt.callAllHandlers(X.onFocus, Y),
      }),
      [s, y, ue, O, K, Y, f, w]
    ),
    ee = et.useCallback(
      (X = {}, de = null) => ({
        ...X,
        hidden: !y,
        placeholder: f,
        ref: Hr.mergeRefs(de, R),
        disabled: s,
        "aria-disabled": Bt.ariaAttr(s),
        value: w,
        onBlur: Bt.callAllHandlers(X.onBlur, ue),
        onChange: Bt.callAllHandlers(X.onChange, O),
        onKeyDown: Bt.callAllHandlers(X.onKeyDown, ve),
        onFocus: Bt.callAllHandlers(X.onFocus, Y),
      }),
      [s, y, ue, O, ve, Y, f, w]
    ),
    pe = et.useCallback(
      (X = {}, de = null) => ({
        "aria-label": "Edit",
        ...X,
        type: "button",
        onClick: Bt.callAllHandlers(X.onClick, z),
        ref: Hr.mergeRefs(de, _),
        disabled: s,
      }),
      [z, s]
    ),
    xe = et.useCallback(
      (X = {}, de = null) => ({
        ...X,
        "aria-label": "Submit",
        ref: Hr.mergeRefs(G, de),
        type: "button",
        onClick: Bt.callAllHandlers(X.onClick, j),
        disabled: s,
      }),
      [j, s]
    ),
    Ce = et.useCallback(
      (X = {}, de = null) => ({
        "aria-label": "Cancel",
        id: "cancel",
        ...X,
        ref: Hr.mergeRefs(N, de),
        type: "button",
        onClick: Bt.callAllHandlers(X.onClick, W),
        disabled: s,
      }),
      [W, s]
    );
  return {
    isEditing: y,
    isDisabled: s,
    isValueEmpty: re,
    value: w,
    onEdit: z,
    onCancel: W,
    onSubmit: j,
    getPreviewProps: L,
    getInputProps: V,
    getTextareaProps: ee,
    getEditButtonProps: pe,
    getSubmitButtonProps: xe,
    getCancelButtonProps: Ce,
    htmlProps: p,
  };
}
mS.useEditable = Dfe;
var Sv = P,
  Nfe = I,
  QC = x,
  JC = nn,
  Ofe = mS,
  Bfe = D,
  Lfe = he,
  Vfe = M;
const Aj = Bfe.forwardRef(function (t, r) {
  const n = Lfe.useMultiStyleConfig("Editable", t),
    o = Nfe.omitThemingProps(t),
    { htmlProps: a, ...s } = Ofe.useEditable(o),
    { isEditing: i, onSubmit: c, onCancel: l, onEdit: u } = s,
    d = QC.cx("chakra-editable", t.className),
    f = QC.runIfFn(t.children, {
      isEditing: i,
      onSubmit: c,
      onCancel: l,
      onEdit: u,
    });
  return Sv.jsx(JC.EditableProvider, {
    value: s,
    children: Sv.jsx(JC.EditableStylesProvider, {
      value: n,
      children: Sv.jsx(Vfe.chakra.div, {
        ref: r,
        ...a,
        className: d,
        children: f,
      }),
    }),
  });
});
Aj.displayName = "Editable";
Pj.Editable = Aj;
var _j = {},
  Gm = {};
const zfe = {
  fontSize: "inherit",
  fontWeight: "inherit",
  textAlign: "inherit",
  bg: "transparent",
};
Gm.commonStyles = zfe;
var Hfe = P,
  Wfe = x,
  ek = nn,
  Gfe = Gm,
  Ufe = D,
  Kfe = M;
const Ij = Ufe.forwardRef(function (t, r) {
  const { getInputProps: n } = ek.useEditableContext(),
    o = ek.useEditableStyles(),
    a = n(t, r),
    s = Wfe.cx("chakra-editable__input", t.className);
  return Hfe.jsx(Kfe.chakra.input, {
    ...a,
    __css: {outline: 0, ...Gfe.commonStyles, ...o.input },
    className: s,
  });
});
Ij.displayName = "EditableInput";
_j.EditableInput = Ij;
var Ej = {},
  qfe = P,
  Xfe = x,
  tk = nn,
  Yfe = Gm,
  Zfe = D,
  Qfe = M;
const Mj = Zfe.forwardRef(function (t, r) {
  const { getPreviewProps: n } = tk.useEditableContext(),
    o = tk.useEditableStyles(),
    a = n(t, r),
    s = Xfe.cx("chakra-editable__preview", t.className);
  return qfe.jsx(Qfe.chakra.span, {
    ...a,
    __css: {
      cursor: "text",
      display: "inline-block",
      ...Yfe.commonStyles,
      ...o.preview,
    },
    className: s,
  });
});
Mj.displayName = "EditablePreview";
Ej.EditablePreview = Mj;
var Fj = {},
  Jfe = P,
  eme = x,
  rk = nn,
  tme = Gm,
  rme = D,
  nme = M;
const jj = rme.forwardRef(function (t, r) {
  const { getTextareaProps: n } = rk.useEditableContext(),
    o = rk.useEditableStyles(),
    a = n(t, r),
    s = eme.cx("chakra-editable__textarea", t.className);
  return Jfe.jsx(nme.chakra.textarea, {
    ...a,
    __css: {outline: 0, ...tme.commonStyles, ...o.textarea },
    className: s,
  });
});
jj.displayName = "EditableTextarea";
Fj.EditableTextarea = jj;
var Dj = {},
  ome = nn;
function ame() {
  const {
    isEditing: e,
    getEditButtonProps: t,
    getCancelButtonProps: r,
    getSubmitButtonProps: n,
  } = ome.useEditableContext();
  return {
    isEditing: e,
    getEditButtonProps: t,
    getCancelButtonProps: r,
    getSubmitButtonProps: n,
  };
}
Dj.useEditableControls = ame;
var Nj = {},
  sme = nn;
function ime() {
  const {
    isEditing: e,
    onSubmit: t,
    onCancel: r,
    onEdit: n,
    isDisabled: o,
  } = sme.useEditableContext();
  return { isEditing: e, onSubmit: t, onCancel: r, onEdit: n, isDisabled: o };
}
Nj.useEditableState = ime;
var fo = {},
  hS = no,
  xs = x;
function Ec(e) {
  return typeof e == "function";
}
function cme(...e) {
  return (t) => e.reduce((r, n) => n(r), t);
}
const pS = (e) =>
    function (...r) {
      let n = [...r],
        o = r[r.length - 1];
      return (
        hS.isChakraTheme(o) && n.length > 1
          ? (n = n.slice(0, n.length - 1))
          : (o = e),
        cme(...n.map((a) => (s) => Ec(a) ? a(s) : Oj(s, a)))(o)
      );
    },
  lme = pS(hS.theme),
  ume = pS(hS.baseTheme);
function Oj(...e) {
  return xs.mergeWith({}, ...e, Bj);
}
function Bj(e, t, r, n) {
  if ((Ec(e) || Ec(t)) && Object.prototype.hasOwnProperty.call(n, r))
    return (...o) => {
      const a = Ec(e) ? e(...o) : e,
        s = Ec(t) ? t(...o) : t;
      return xs.mergeWith({}, a, s, Bj);
    };
  if ((xs.isObject(e) && xs.isArray(t)) || (xs.isArray(e) && xs.isObject(t)))
    return t;
}
fo.createExtendTheme = pS;
fo.extendBaseTheme = ume;
fo.extendTheme = lme;
fo.mergeThemeOverride = Oj;
var vS = {},
  dme = x,
  fme = fo;
function mme({ colorScheme: e, components: t }) {
  return (r) => {
    let n = Object.keys(r.components || {});
    return (
      Array.isArray(t) ? (n = t) : dme.isObject(t) && (n = Object.keys(t)),
      fme.mergeThemeOverride(r, {
        components: Object.fromEntries(
          n.map((o) => [o, { defaultProps: { colorScheme: e } }])
        ),
      })
    );
  };
}
vS.withDefaultColorScheme = mme;
var Lj = {},
  yS = {},
  hme = x,
  pme = fo;
function vme({ size: e, components: t }) {
  return (r) => {
    let n = Object.keys(r.components || {});
    return (
      Array.isArray(t) ? (n = t) : hme.isObject(t) && (n = Object.keys(t)),
      pme.mergeThemeOverride(r, {
        components: Object.fromEntries(
          n.map((o) => [o, { defaultProps: { size: e } }])
        ),
      })
    );
  };
}
yS.withDefaultSize = vme;
var gS = {},
  yme = x,
  gme = fo;
function bme({ variant: e, components: t }) {
  return (r) => {
    let n = Object.keys(r.components || {});
    return (
      Array.isArray(t) ? (n = t) : yme.isObject(t) && (n = Object.keys(t)),
      gme.mergeThemeOverride(r, {
        components: Object.fromEntries(
          n.map((o) => [o, { defaultProps: { variant: e } }])
        ),
      })
    );
  };
}
gS.withDefaultVariant = bme;
var Sme = fo,
  xme = vS,
  $me = yS,
  wme = gS;
function Cme(...e) {
  return (t) => e.reduce((r, n) => n(r), t);
}
function kme({
  defaultProps: { colorScheme: e, variant: t, size: r },
  components: n,
}) {
  const o = (s) => s,
    a = [
      e ? xme.withDefaultColorScheme({ colorScheme: e, components: n }) : o,
      r ? $me.withDefaultSize({ size: r, components: n }) : o,
      t ? wme.withDefaultVariant({ variant: t, components: n }) : o,
    ];
  return (s) => Sme.mergeThemeOverride(Cme(...a)(s));
}
Lj.withDefaultProps = kme;
var Vj = {},
  Tme = P,
  Pme = D,
  Rme = M;
const zj = Pme.forwardRef(function (t, r) {
  const {
      direction: n,
      align: o,
      justify: a,
      wrap: s,
      basis: i,
      grow: c,
      shrink: l,
      ...u
    } = t,
    d = {
      display: "flex",
      flexDirection: n,
      alignItems: o,
      justifyContent: a,
      flexWrap: s,
      flexBasis: i,
      flexGrow: c,
      flexShrink: l,
    };
  return Tme.jsx(Rme.chakra.div, { ref: r, __css: d, ...u });
});
zj.displayName = "Flex";
Vj.Flex = zj;
var bS = {},
  Wy = "data-focus-lock",
  Hj = "data-focus-lock-disabled",
  Wj = "data-no-focus-lock",
  SS = "data-autofocus-inside",
  Ame = "data-no-autofocus";
function xv(e, t) {
  return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
function _me(e, t) {
  var r = g.useState(function () {
    return {
      value: e,
      callback: t,
      facade: {
        get current() {
          return r.value;
        },
        set current(n) {
          var o = r.value;
          o !== n && ((r.value = n), r.callback(n, o));
        },
      },
    };
  })[0];
  return (r.callback = t), r.facade;
}
var Ime = typeof window < "u" ? g.useLayoutEffect : g.useEffect,
  nk = new WeakMap();
function Gj(e, t) {
  var r = _me(null, function (n) {
    return e.forEach(function (o) {
      return xv(o, n);
    });
  });
  return (
    Ime(
      function () {
        var n = nk.get(r);
        if (n) {
          var o = new Set(n),
            a = new Set(e),
            s = r.current;
          o.forEach(function (i) {
            a.has(i) || xv(i, null);
          }),
            a.forEach(function (i) {
              o.has(i) || xv(i, s);
            });
        }
        nk.set(r, e);
      },
      [e]
    ),
    r
  );
}
var qc = {
    width: "1px",
    height: "0px",
    padding: 0,
    overflow: "hidden",
    position: "fixed",
    top: "1px",
    left: "1px",
  },
  Uj = function (t) {
    var r = t.children,
      n = r === void 0 ? null : r;
    return Lt.createElement(
      g.Fragment,
      null,
      Lt.createElement("div", {
        key: "guard-first",
        "data-focus-guard": !0,
        "data-focus-auto-guard": !0,
        style: qc,
      }),
      n,
      n &&
        Lt.createElement("div", {
          key: "guard-last",
          "data-focus-guard": !0,
          "data-focus-auto-guard": !0,
          style: qc,
        })
    );
  };
Uj.propTypes = {};
const Eme = Uj;
var Gy = function (e, t) {
  return (
    (Gy =
      Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array &&
        function (r, n) {
          r.__proto__ = n;
        }) ||
      function (r, n) {
        for (var o in n)
          Object.prototype.hasOwnProperty.call(n, o) && (r[o] = n[o]);
      }),
    Gy(e, t)
  );
};
function Kj(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError(
      "Class extends value " + String(t) + " is not a constructor or null"
    );
  Gy(e, t);
  function r() {
    this.constructor = e;
  }
  e.prototype =
    t === null ? Object.create(t) : ((r.prototype = t.prototype), new r());
}
var Mr = function () {
  return (
    (Mr =
      Object.assign ||
      function (t) {
        for (var r, n = 1, o = arguments.length; n < o; n++) {
          r = arguments[n];
          for (var a in r)
            Object.prototype.hasOwnProperty.call(r, a) && (t[a] = r[a]);
        }
        return t;
      }),
    Mr.apply(this, arguments)
  );
};
function Um(e, t) {
  var r = {};
  for (var n in e)
    Object.prototype.hasOwnProperty.call(e, n) &&
      t.indexOf(n) < 0 &&
      (r[n] = e[n]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var o = 0, n = Object.getOwnPropertySymbols(e); o < n.length; o++)
      t.indexOf(n[o]) < 0 &&
        Object.prototype.propertyIsEnumerable.call(e, n[o]) &&
        (r[n[o]] = e[n[o]]);
  return r;
}
function qj(e, t, r, n) {
  var o = arguments.length,
    a =
      o < 3 ? t : n === null ? (n = Object.getOwnPropertyDescriptor(t, r)) : n,
    s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
    a = Reflect.decorate(e, t, r, n);
  else
    for (var i = e.length - 1; i >= 0; i--)
      (s = e[i]) && (a = (o < 3 ? s(a) : o > 3 ? s(t, r, a) : s(t, r)) || a);
  return o > 3 && a && Object.defineProperty(t, r, a), a;
}
function Xj(e, t) {
  return function (r, n) {
    t(r, n, e);
  };
}
function Yj(e, t, r, n, o, a) {
  function s(b) {
    if (b !== void 0 && typeof b != "function")
      throw new TypeError("Function expected");
    return b;
  }
  for (
    var i = n.kind,
      c = i === "getter" ? "get" : i === "setter" ? "set" : "value",
      l = !t && e ? (n.static ? e : e.prototype) : null,
      u = t || (l ? Object.getOwnPropertyDescriptor(l, n.name) : {}),
      d,
      f = !1,
      m = r.length - 1;
    m >= 0;
    m--
  ) {
    var h = {};
    for (var p in n) h[p] = p === "access" ? {} : n[p];
    for (var p in n.access) h.access[p] = n.access[p];
    h.addInitializer = function (b) {
      if (f)
        throw new TypeError(
          "Cannot add initializers after decoration has completed"
        );
      a.push(s(b || null));
    };
    var v = (0, r[m])(i === "accessor" ? { get: u.get, set: u.set } : u[c], h);
    if (i === "accessor") {
      if (v === void 0) continue;
      if (v === null || typeof v != "object")
        throw new TypeError("Object expected");
      (d = s(v.get)) && (u.get = d),
        (d = s(v.set)) && (u.set = d),
        (d = s(v.init)) && o.unshift(d);
    } else (d = s(v)) && (i === "field" ? o.unshift(d) : (u[c] = d));
  }
  l && Object.defineProperty(l, n.name, u), (f = !0);
}
function Zj(e, t, r) {
  for (var n = arguments.length > 2, o = 0; o < t.length; o++)
    r = n ? t[o].call(e, r) : t[o].call(e);
  return n ? r : void 0;
}
function Qj(e) {
  return typeof e == "symbol" ? e : "".concat(e);
}
function Jj(e, t, r) {
  return (
    typeof t == "symbol" &&
      (t = t.description ? "[".concat(t.description, "]") : ""),
    Object.defineProperty(e, "name", {
      configurable: !0,
      value: r ? "".concat(r, " ", t) : t,
    })
  );
}
function eD(e, t) {
  if (typeof Reflect == "object" && typeof Reflect.metadata == "function")
    return Reflect.metadata(e, t);
}
function tD(e, t, r, n) {
  function o(a) {
    return a instanceof r
      ? a
      : new r(function (s) {
          s(a);
        });
  }
  return new (r || (r = Promise))(function (a, s) {
    function i(u) {
      try {
        l(n.next(u));
      } catch (d) {
        s(d);
      }
    }
    function c(u) {
      try {
        l(n.throw(u));
      } catch (d) {
        s(d);
      }
    }
    function l(u) {
      u.done ? a(u.value) : o(u.value).then(i, c);
    }
    l((n = n.apply(e, t || [])).next());
  });
}
function rD(e, t) {
  var r = {
      label: 0,
      sent: function () {
        if (a[0] & 1) throw a[1];
        return a[1];
      },
      trys: [],
      ops: [],
    },
    n,
    o,
    a,
    s = Object.create(
      (typeof Iterator == "function" ? Iterator : Object).prototype
    );
  return (
    (s.next = i(0)),
    (s.throw = i(1)),
    (s.return = i(2)),
    typeof Symbol == "function" &&
      (s[Symbol.iterator] = function () {
        return this;
      }),
    s
  );
  function i(l) {
    return function (u) {
      return c([l, u]);
    };
  }
  function c(l) {
    if (n) throw new TypeError("Generator is already executing.");
    for (; s && ((s = 0), l[0] && (r = 0)), r; )
      try {
        if (
          ((n = 1),
          o &&
            (a =
              l[0] & 2
                ? o.return
                : l[0]
                ? o.throw || ((a = o.return) && a.call(o), 0)
                : o.next) &&
            !(a = a.call(o, l[1])).done)
        )
          return a;
        switch (((o = 0), a && (l = [l[0] & 2, a.value]), l[0])) {
          case 0:
          case 1:
            a = l;
            break;
          case 4:
            return r.label++, { value: l[1], done: !1 };
          case 5:
            r.label++, (o = l[1]), (l = [0]);
            continue;
          case 7:
            (l = r.ops.pop()), r.trys.pop();
            continue;
          default:
            if (
              ((a = r.trys),
              !(a = a.length > 0 && a[a.length - 1]) &&
                (l[0] === 6 || l[0] === 2))
            ) {
              r = 0;
              continue;
            }
            if (l[0] === 3 && (!a || (l[1] > a[0] && l[1] < a[3]))) {
              r.label = l[1];
              break;
            }
            if (l[0] === 6 && r.label < a[1]) {
              (r.label = a[1]), (a = l);
              break;
            }
            if (a && r.label < a[2]) {
              (r.label = a[2]), r.ops.push(l);
              break;
            }
            a[2] && r.ops.pop(), r.trys.pop();
            continue;
        }
        l = t.call(e, r);
      } catch (u) {
        (l = [6, u]), (o = 0);
      } finally {
        n = a = 0;
      }
    if (l[0] & 5) throw l[1];
    return { value: l[0] ? l[1] : void 0, done: !0 };
  }
}
var Km = Object.create
  ? function (e, t, r, n) {
      n === void 0 && (n = r);
      var o = Object.getOwnPropertyDescriptor(t, r);
      (!o || ("get" in o ? !t.__esModule : o.writable || o.configurable)) &&
        (o = {
          enumerable: !0,
          get: function () {
            return t[r];
          },
        }),
        Object.defineProperty(e, n, o);
    }
  : function (e, t, r, n) {
      n === void 0 && (n = r), (e[n] = t[r]);
    };
function nD(e, t) {
  for (var r in e)
    r !== "default" &&
      !Object.prototype.hasOwnProperty.call(t, r) &&
      Km(t, e, r);
}
function kf(e) {
  var t = typeof Symbol == "function" && Symbol.iterator,
    r = t && e[t],
    n = 0;
  if (r) return r.call(e);
  if (e && typeof e.length == "number")
    return {
      next: function () {
        return (
          e && n >= e.length && (e = void 0), { value: e && e[n++], done: !e }
        );
      },
    };
  throw new TypeError(
    t ? "Object is not iterable." : "Symbol.iterator is not defined."
  );
}
function xS(e, t) {
  var r = typeof Symbol == "function" && e[Symbol.iterator];
  if (!r) return e;
  var n = r.call(e),
    o,
    a = [],
    s;
  try {
    for (; (t === void 0 || t-- > 0) && !(o = n.next()).done; ) a.push(o.value);
  } catch (i) {
    s = { error: i };
  } finally {
    try {
      o && !o.done && (r = n.return) && r.call(n);
    } finally {
      if (s) throw s.error;
    }
  }
  return a;
}
function oD() {
  for (var e = [], t = 0; t < arguments.length; t++)
    e = e.concat(xS(arguments[t]));
  return e;
}
function aD() {
  for (var e = 0, t = 0, r = arguments.length; t < r; t++)
    e += arguments[t].length;
  for (var n = Array(e), o = 0, t = 0; t < r; t++)
    for (var a = arguments[t], s = 0, i = a.length; s < i; s++, o++)
      n[o] = a[s];
  return n;
}
function $S(e, t, r) {
  if (r || arguments.length === 2)
    for (var n = 0, o = t.length, a; n < o; n++)
      (a || !(n in t)) &&
        (a || (a = Array.prototype.slice.call(t, 0, n)), (a[n] = t[n]));
  return e.concat(a || Array.prototype.slice.call(t));
}
function li(e) {
  return this instanceof li ? ((this.v = e), this) : new li(e);
}
function sD(e, t, r) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var n = r.apply(e, t || []),
    o,
    a = [];
  return (
    (o = Object.create(
      (typeof AsyncIterator == "function" ? AsyncIterator : Object).prototype
    )),
    i("next"),
    i("throw"),
    i("return", s),
    (o[Symbol.asyncIterator] = function () {
      return this;
    }),
    o
  );
  function s(m) {
    return function (h) {
      return Promise.resolve(h).then(m, d);
    };
  }
  function i(m, h) {
    n[m] &&
      ((o[m] = function (p) {
        return new Promise(function (v, b) {
          a.push([m, p, v, b]) > 1 || c(m, p);
        });
      }),
      h && (o[m] = h(o[m])));
  }
  function c(m, h) {
    try {
      l(n[m](h));
    } catch (p) {
      f(a[0][3], p);
    }
  }
  function l(m) {
    m.value instanceof li
      ? Promise.resolve(m.value.v).then(u, d)
      : f(a[0][2], m);
  }
  function u(m) {
    c("next", m);
  }
  function d(m) {
    c("throw", m);
  }
  function f(m, h) {
    m(h), a.shift(), a.length && c(a[0][0], a[0][1]);
  }
}
function iD(e) {
  var t, r;
  return (
    (t = {}),
    n("next"),
    n("throw", function (o) {
      throw o;
    }),
    n("return"),
    (t[Symbol.iterator] = function () {
      return this;
    }),
    t
  );
  function n(o, a) {
    t[o] = e[o]
      ? function (s) {
          return (r = !r) ? { value: li(e[o](s)), done: !1 } : a ? a(s) : s;
        }
      : a;
  }
}
function cD(e) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var t = e[Symbol.asyncIterator],
    r;
  return t
    ? t.call(e)
    : ((e = typeof kf == "function" ? kf(e) : e[Symbol.iterator]()),
      (r = {}),
      n("next"),
      n("throw"),
      n("return"),
      (r[Symbol.asyncIterator] = function () {
        return this;
      }),
      r);
  function n(a) {
    r[a] =
      e[a] &&
      function (s) {
        return new Promise(function (i, c) {
          (s = e[a](s)), o(i, c, s.done, s.value);
        });
      };
  }
  function o(a, s, i, c) {
    Promise.resolve(c).then(function (l) {
      a({ value: l, done: i });
    }, s);
  }
}
function lD(e, t) {
  return (
    Object.defineProperty
      ? Object.defineProperty(e, "raw", { value: t })
      : (e.raw = t),
    e
  );
}
var Mme = Object.create
    ? function (e, t) {
        Object.defineProperty(e, "default", { enumerable: !0, value: t });
      }
    : function (e, t) {
        e.default = t;
      },
  Uy = function (e) {
    return (
      (Uy =
        Object.getOwnPropertyNames ||
        function (t) {
          var r = [];
          for (var n in t)
            Object.prototype.hasOwnProperty.call(t, n) && (r[r.length] = n);
          return r;
        }),
      Uy(e)
    );
  };
function uD(e) {
  if (e && e.__esModule) return e;
  var t = {};
  if (e != null)
    for (var r = Uy(e), n = 0; n < r.length; n++)
      r[n] !== "default" && Km(t, e, r[n]);
  return Mme(t, e), t;
}
function dD(e) {
  return e && e.__esModule ? e : { default: e };
}
function fD(e, t, r, n) {
  if (r === "a" && !n)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof t == "function" ? e !== t || !n : !t.has(e))
    throw new TypeError(
      "Cannot read private member from an object whose class did not declare it"
    );
  return r === "m" ? n : r === "a" ? n.call(e) : n ? n.value : t.get(e);
}
function mD(e, t, r, n, o) {
  if (n === "m") throw new TypeError("Private method is not writable");
  if (n === "a" && !o)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof t == "function" ? e !== t || !o : !t.has(e))
    throw new TypeError(
      "Cannot write private member to an object whose class did not declare it"
    );
  return n === "a" ? o.call(e, r) : o ? (o.value = r) : t.set(e, r), r;
}
function hD(e, t) {
  if (t === null || (typeof t != "object" && typeof t != "function"))
    throw new TypeError("Cannot use 'in' operator on non-object");
  return typeof e == "function" ? t === e : e.has(t);
}
function pD(e, t, r) {
  if (t != null) {
    if (typeof t != "object" && typeof t != "function")
      throw new TypeError("Object expected.");
    var n, o;
    if (r) {
      if (!Symbol.asyncDispose)
        throw new TypeError("Symbol.asyncDispose is not defined.");
      n = t[Symbol.asyncDispose];
    }
    if (n === void 0) {
      if (!Symbol.dispose)
        throw new TypeError("Symbol.dispose is not defined.");
      (n = t[Symbol.dispose]), r && (o = n);
    }
    if (typeof n != "function") throw new TypeError("Object not disposable.");
    o &&
      (n = function () {
        try {
          o.call(this);
        } catch (a) {
          return Promise.reject(a);
        }
      }),
      e.stack.push({ value: t, dispose: n, async: r });
  } else r && e.stack.push({ async: !0 });
  return t;
}
var Fme =
  typeof SuppressedError == "function"
    ? SuppressedError
    : function (e, t, r) {
        var n = new Error(r);
        return (
          (n.name = "SuppressedError"), (n.error = e), (n.suppressed = t), n
        );
      };
function vD(e) {
  function t(a) {
    (e.error = e.hasError
      ? new Fme(a, e.error, "An error was suppressed during disposal.")
      : a),
      (e.hasError = !0);
  }
  var r,
    n = 0;
  function o() {
    for (; (r = e.stack.pop()); )
      try {
        if (!r.async && n === 1)
          return (n = 0), e.stack.push(r), Promise.resolve().then(o);
        if (r.dispose) {
          var a = r.dispose.call(r.value);
          if (r.async)
            return (
              (n |= 2),
              Promise.resolve(a).then(o, function (s) {
                return t(s), o();
              })
            );
        } else n |= 1;
      } catch (s) {
        t(s);
      }
    if (n === 1)
      return e.hasError ? Promise.reject(e.error) : Promise.resolve();
    if (e.hasError) throw e.error;
  }
  return o();
}
function yD(e, t) {
  return typeof e == "string" && /^\.\.?\//.test(e)
    ? e.replace(
        /\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i,
        function (r, n, o, a, s) {
          return n
            ? t
              ? ".jsx"
              : ".js"
            : o && (!a || !s)
            ? r
            : o + a + "." + s.toLowerCase() + "js";
        }
      )
    : e;
}
const jme = {
    __extends: Kj,
    __assign: Mr,
    __rest: Um,
    __decorate: qj,
    __param: Xj,
    __esDecorate: Yj,
    __runInitializers: Zj,
    __propKey: Qj,
    __setFunctionName: Jj,
    __metadata: eD,
    __awaiter: tD,
    __generator: rD,
    __createBinding: Km,
    __exportStar: nD,
    __values: kf,
    __read: xS,
    __spread: oD,
    __spreadArrays: aD,
    __spreadArray: $S,
    __await: li,
    __asyncGenerator: sD,
    __asyncDelegator: iD,
    __asyncValues: cD,
    __makeTemplateObject: lD,
    __importStar: uD,
    __importDefault: dD,
    __classPrivateFieldGet: fD,
    __classPrivateFieldSet: mD,
    __classPrivateFieldIn: hD,
    __addDisposableResource: pD,
    __disposeResources: vD,
    __rewriteRelativeImportExtension: yD,
  },
  rRe = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        __addDisposableResource: pD,
        get __assign() {
          return Mr;
        },
        __asyncDelegator: iD,
        __asyncGenerator: sD,
        __asyncValues: cD,
        __await: li,
        __awaiter: tD,
        __classPrivateFieldGet: fD,
        __classPrivateFieldIn: hD,
        __classPrivateFieldSet: mD,
        __createBinding: Km,
        __decorate: qj,
        __disposeResources: vD,
        __esDecorate: Yj,
        __exportStar: nD,
        __extends: Kj,
        __generator: rD,
        __importDefault: dD,
        __importStar: uD,
        __makeTemplateObject: lD,
        __metadata: eD,
        __param: Xj,
        __propKey: Qj,
        __read: xS,
        __rest: Um,
        __rewriteRelativeImportExtension: yD,
        __runInitializers: Zj,
        __setFunctionName: Jj,
        __spread: oD,
        __spreadArray: $S,
        __spreadArrays: aD,
        __values: kf,
        default: jme,
      },
      Symbol.toStringTag,
      { value: "Module" }
    )
  );
function gD(e) {
  return e;
}
function bD(e, t) {
  t === void 0 && (t = gD);
  var r = [],
    n = !1,
    o = {
      read: function () {
        if (n)
          throw new Error(
            "Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`."
          );
        return r.length ? r[r.length - 1] : e;
      },
      useMedium: function (a) {
        var s = t(a, n);
        return (
          r.push(s),
          function () {
            r = r.filter(function (i) {
              return i !== s;
            });
          }
        );
      },
      assignSyncMedium: function (a) {
        for (n = !0; r.length; ) {
          var s = r;
          (r = []), s.forEach(a);
        }
        r = {
          push: function (i) {
            return a(i);
          },
          filter: function () {
            return r;
          },
        };
      },
      assignMedium: function (a) {
        n = !0;
        var s = [];
        if (r.length) {
          var i = r;
          (r = []), i.forEach(a), (s = r);
        }
        var c = function () {
            var u = s;
            (s = []), u.forEach(a);
          },
          l = function () {
            return Promise.resolve().then(c);
          };
        l(),
          (r = {
            push: function (u) {
              s.push(u), l();
            },
            filter: function (u) {
              return (s = s.filter(u)), r;
            },
          });
      },
    };
  return o;
}
function wS(e, t) {
  return t === void 0 && (t = gD), bD(e, t);
}
function SD(e) {
  e === void 0 && (e = {});
  var t = bD(null);
  return (t.options = Mr({ async: !0, ssr: !1 }, e)), t;
}
var xD = function (e) {
  var t = e.sideCar,
    r = Um(e, ["sideCar"]);
  if (!t)
    throw new Error(
      "Sidecar: please provide `sideCar` property to import the right car"
    );
  var n = t.read();
  if (!n) throw new Error("Sidecar medium not found");
  return g.createElement(n, Mr({}, r));
};
xD.isSideCarExport = !0;
function Dme(e, t) {
  return e.useMedium(t), xD;
}
var $D = wS({}, function (e) {
    var t = e.target,
      r = e.currentTarget;
    return { target: t, currentTarget: r };
  }),
  wD = wS(),
  CS = wS(),
  Nme = SD({ async: !0, ssr: typeof document < "u" }),
  CD = g.createContext(void 0),
  Ome = [],
  kD = g.forwardRef(function (t, r) {
    var n,
      o = g.useState(),
      a = o[0],
      s = o[1],
      i = g.useRef(),
      c = g.useRef(!1),
      l = g.useRef(null),
      u = g.useState({}),
      d = u[1],
      f = t.children,
      m = t.disabled,
      h = m === void 0 ? !1 : m,
      p = t.noFocusGuards,
      v = p === void 0 ? !1 : p,
      b = t.persistentFocus,
      y = b === void 0 ? !1 : b,
      S = t.crossFrame,
      w = S === void 0 ? !0 : S,
      C = t.autoFocus,
      T = C === void 0 ? !0 : C;
    t.allowTextSelection;
    var k = t.group,
      R = t.className,
      E = t.whiteList,
      _ = t.hasPositiveIndices,
      N = t.shards,
      G = N === void 0 ? Ome : N,
      B = t.as,
      z = B === void 0 ? "div" : B,
      Y = t.lockProps,
      W = Y === void 0 ? {} : Y,
      j = t.sideCar,
      O = t.returnFocus,
      K = O === void 0 ? !1 : O,
      ve = t.focusOptions,
      re = t.onActivation,
      ue = t.onDeactivation,
      L = g.useState({}),
      V = L[0],
      ee = g.useCallback(
        function (ye) {
          var U = ye.captureFocusRestore;
          if (!l.current) {
            var be,
              ge = (be = document) == null ? void 0 : be.activeElement;
            (l.current = ge), ge !== document.body && (l.current = U(ge));
          }
          i.current && re && re(i.current), (c.current = !0), d();
        },
        [re]
      ),
      pe = g.useCallback(
        function () {
          (c.current = !1), ue && ue(i.current), d();
        },
        [ue]
      ),
      xe = g.useCallback(
        function (ye) {
          var U = l.current;
          if (U) {
            var be = (typeof U == "function" ? U() : U) || document.body,
              ge = typeof K == "function" ? K(be) : K;
            if (ge) {
              var Te = typeof ge == "object" ? ge : void 0;
              (l.current = null),
                ye
                  ? Promise.resolve().then(function () {
                      return be.focus(Te);
                    })
                  : be.focus(Te);
            }
          }
        },
        [K]
      ),
      Ce = g.useCallback(function (ye) {
        c.current && $D.useMedium(ye);
      }, []),
      X = wD.useMedium,
      de = g.useCallback(function (ye) {
        i.current !== ye && ((i.current = ye), s(ye));
      }, []),
      Q = yr(((n = {}), (n[Hj] = h && "disabled"), (n[Wy] = k), n), W),
      J = v !== !0,
      ne = J && v !== "tail",
      we = Gj([r, de]),
      ae = g.useMemo(
        function () {
          return { observed: i, shards: G, enabled: !h, active: c.current };
        },
        [h, c.current, G, a]
      );
    return Lt.createElement(
      g.Fragment,
      null,
      J && [
        Lt.createElement("div", {
          key: "guard-first",
          "data-focus-guard": !0,
          tabIndex: h ? -1 : 0,
          style: qc,
        }),
        _
          ? Lt.createElement("div", {
              key: "guard-nearest",
              "data-focus-guard": !0,
              tabIndex: h ? -1 : 1,
              style: qc,
            })
          : null,
      ],
      !h &&
        Lt.createElement(j, {
          id: V,
          sideCar: Nme,
          observed: a,
          disabled: h,
          persistentFocus: y,
          crossFrame: w,
          autoFocus: T,
          whiteList: E,
          shards: G,
          onActivation: ee,
          onDeactivation: pe,
          returnFocus: xe,
          focusOptions: ve,
          noFocusGuards: v,
        }),
      Lt.createElement(
        z,
        yr({ ref: we }, Q, { className: R, onBlur: X, onFocus: Ce }),
        Lt.createElement(CD.Provider, { value: ae }, f)
      ),
      ne &&
        Lt.createElement("div", {
          "data-focus-guard": !0,
          tabIndex: h ? -1 : 0,
          style: qc,
        })
    );
  });
kD.propTypes = {};
const kS = kD;
function vl(e) {
  "@babel/helpers - typeof";
  return (
    (vl =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              typeof Symbol == "function" &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    vl(e)
  );
}
function Bme(e, t) {
  if (vl(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (vl(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Lme(e) {
  var t = Bme(e, "string");
  return vl(t) == "symbol" ? t : t + "";
}
function Vme(e, t, r) {
  return (
    (t = Lme(t)) in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  );
}
function zme(e, t) {
  function r(n) {
    return n.displayName || n.name || "Component";
  }
  return function (o) {
    var a = [],
      s;
    function i() {
      (s = e(
        a.map(function (l) {
          return l.props;
        })
      )),
        t(s);
    }
    var c = (function (l) {
      Nz(u, l);
      function u() {
        return l.apply(this, arguments) || this;
      }
      u.peek = function () {
        return s;
      };
      var d = u.prototype;
      return (
        (d.componentDidMount = function () {
          a.push(this), i();
        }),
        (d.componentDidUpdate = function () {
          i();
        }),
        (d.componentWillUnmount = function () {
          var m = a.indexOf(this);
          a.splice(m, 1), i();
        }),
        (d.render = function () {
          return Lt.createElement(o, this.props);
        }),
        u
      );
    })(g.PureComponent);
    return Vme(c, "displayName", "SideEffect(" + r(o) + ")"), c;
  };
}
var In = function (e) {
    for (var t = Array(e.length), r = 0; r < e.length; ++r) t[r] = e[r];
    return t;
  },
  _a = function (e) {
    return Array.isArray(e) ? e : [e];
  },
  TD = function (e) {
    return Array.isArray(e) ? e[0] : e;
  },
  Hme = function (e) {
    if (e.nodeType !== Node.ELEMENT_NODE) return !1;
    var t = window.getComputedStyle(e, null);
    return !t || !t.getPropertyValue
      ? !1
      : t.getPropertyValue("display") === "none" ||
          t.getPropertyValue("visibility") === "hidden";
  },
  PD = function (e) {
    return e.parentNode && e.parentNode.nodeType === Node.DOCUMENT_FRAGMENT_NODE
      ? e.parentNode.host
      : e.parentNode;
  },
  RD = function (e) {
    return e === document || (e && e.nodeType === Node.DOCUMENT_NODE);
  },
  Wme = function (e) {
    return e.hasAttribute("inert");
  },
  Gme = function (e, t) {
    return !e || RD(e) || (!Hme(e) && !Wme(e) && t(PD(e)));
  },
  AD = function (e, t) {
    var r = e.get(t);
    if (r !== void 0) return r;
    var n = Gme(t, AD.bind(void 0, e));
    return e.set(t, n), n;
  },
  Ume = function (e, t) {
    return e && !RD(e) ? (Xme(e) ? t(PD(e)) : !1) : !0;
  },
  _D = function (e, t) {
    var r = e.get(t);
    if (r !== void 0) return r;
    var n = Ume(t, _D.bind(void 0, e));
    return e.set(t, n), n;
  },
  ID = function (e) {
    return e.dataset;
  },
  Kme = function (e) {
    return e.tagName === "BUTTON";
  },
  ED = function (e) {
    return e.tagName === "INPUT";
  },
  MD = function (e) {
    return ED(e) && e.type === "radio";
  },
  qme = function (e) {
    return !((ED(e) || Kme(e)) && (e.type === "hidden" || e.disabled));
  },
  Xme = function (e) {
    var t = e.getAttribute(Ame);
    return ![!0, "true", ""].includes(t);
  },
  TS = function (e) {
    var t;
    return !!(e && !((t = ID(e)) === null || t === void 0) && t.focusGuard);
  },
  Ky = function (e) {
    return !TS(e);
  },
  Yme = function (e) {
    return !!e;
  },
  Zme = function (e, t) {
    var r = Math.max(0, e.tabIndex),
      n = Math.max(0, t.tabIndex),
      o = r - n,
      a = e.index - t.index;
    if (o) {
      if (!r) return 1;
      if (!n) return -1;
    }
    return o || a;
  },
  Qme = function (e) {
    return e.tabIndex < 0 && !e.hasAttribute("tabindex") ? 0 : e.tabIndex;
  },
  PS = function (e, t, r) {
    return In(e)
      .map(function (n, o) {
        var a = Qme(n);
        return {
          node: n,
          index: o,
          tabIndex: r && a === -1 ? ((n.dataset || {}).focusGuard ? 0 : -1) : a,
        };
      })
      .filter(function (n) {
        return !t || n.tabIndex >= 0;
      })
      .sort(Zme);
  },
  Jme = [
    "button:enabled",
    "select:enabled",
    "textarea:enabled",
    "input:enabled",
    "a[href]",
    "area[href]",
    "summary",
    "iframe",
    "object",
    "embed",
    "audio[controls]",
    "video[controls]",
    "[tabindex]",
    "[contenteditable]",
    "[autofocus]",
  ],
  RS = Jme.join(","),
  ehe = "".concat(RS, ", [data-focus-guard]"),
  FD = function (e, t) {
    return In((e.shadowRoot || e).children).reduce(function (r, n) {
      return r.concat(n.matches(t ? ehe : RS) ? [n] : [], FD(n));
    }, []);
  },
  the = function (e, t) {
    var r;
    return e instanceof HTMLIFrameElement &&
      !((r = e.contentDocument) === null || r === void 0) &&
      r.body
      ? ui([e.contentDocument.body], t)
      : [e];
  },
  ui = function (e, t) {
    return e.reduce(function (r, n) {
      var o,
        a = FD(n, t),
        s = (o = []).concat.apply(
          o,
          a.map(function (i) {
            return the(i, t);
          })
        );
      return r.concat(
        s,
        n.parentNode
          ? In(n.parentNode.querySelectorAll(RS)).filter(function (i) {
              return i === n;
            })
          : []
      );
    }, []);
  },
  rhe = function (e) {
    var t = e.querySelectorAll("[".concat(SS, "]"));
    return In(t)
      .map(function (r) {
        return ui([r]);
      })
      .reduce(function (r, n) {
        return r.concat(n);
      }, []);
  },
  AS = function (e, t) {
    return In(e)
      .filter(function (r) {
        return AD(t, r);
      })
      .filter(function (r) {
        return qme(r);
      });
  },
  ok = function (e, t) {
    return (
      t === void 0 && (t = new Map()),
      In(e).filter(function (r) {
        return _D(t, r);
      })
    );
  },
  _S = function (e, t, r) {
    return PS(AS(ui(e, r), t), !0, r);
  },
  yl = function (e, t) {
    return PS(AS(ui(e), t), !1);
  },
  nhe = function (e, t) {
    return AS(rhe(e), t);
  },
  wa = function (e, t) {
    return e.shadowRoot
      ? wa(e.shadowRoot, t)
      : Object.getPrototypeOf(e).contains !== void 0 &&
        Object.getPrototypeOf(e).contains.call(e, t)
      ? !0
      : In(e.children).some(function (r) {
          var n;
          if (r instanceof HTMLIFrameElement) {
            var o =
              (n = r.contentDocument) === null || n === void 0
                ? void 0
                : n.body;
            return o ? wa(o, t) : !1;
          }
          return wa(r, t);
        });
  },
  ohe = function (e) {
    for (var t = new Set(), r = e.length, n = 0; n < r; n += 1)
      for (var o = n + 1; o < r; o += 1) {
        var a = e[n].compareDocumentPosition(e[o]);
        (a & Node.DOCUMENT_POSITION_CONTAINED_BY) > 0 && t.add(o),
          (a & Node.DOCUMENT_POSITION_CONTAINS) > 0 && t.add(n);
      }
    return e.filter(function (s, i) {
      return !t.has(i);
    });
  },
  jD = function (e) {
    return e.parentNode ? jD(e.parentNode) : e;
  },
  IS = function (e) {
    var t = _a(e);
    return t.filter(Boolean).reduce(function (r, n) {
      var o = n.getAttribute(Wy);
      return (
        r.push.apply(
          r,
          o
            ? ohe(
                In(
                  jD(n).querySelectorAll(
                    "["
                      .concat(Wy, '="')
                      .concat(o, '"]:not([')
                      .concat(Hj, '="disabled"])')
                  )
                )
              )
            : [n]
        ),
        r
      );
    }, []);
  },
  ahe = function (e) {
    try {
      return e();
    } catch {
      return;
    }
  },
  gl = function (e) {
    if ((e === void 0 && (e = document), !(!e || !e.activeElement))) {
      var t = e.activeElement;
      return t.shadowRoot
        ? gl(t.shadowRoot)
        : t instanceof HTMLIFrameElement &&
          ahe(function () {
            return t.contentWindow.document;
          })
        ? gl(t.contentWindow.document)
        : t;
    }
  },
  she = function (e, t) {
    return e === t;
  },
  ihe = function (e, t) {
    return !!In(e.querySelectorAll("iframe")).some(function (r) {
      return she(r, t);
    });
  },
  DD = function (e, t) {
    return (
      t === void 0 && (t = gl(TD(e).ownerDocument)),
      !t || (t.dataset && t.dataset.focusGuard)
        ? !1
        : IS(e).some(function (r) {
            return wa(r, t) || ihe(r, t);
          })
    );
  },
  che = function (e) {
    e === void 0 && (e = document);
    var t = gl(e);
    return t
      ? In(e.querySelectorAll("[".concat(Wj, "]"))).some(function (r) {
          return wa(r, t);
        })
      : !1;
  },
  lhe = function (e, t) {
    return (
      t
        .filter(MD)
        .filter(function (r) {
          return r.name === e.name;
        })
        .filter(function (r) {
          return r.checked;
        })[0] || e
    );
  },
  ES = function (e, t) {
    return MD(e) && e.name ? lhe(e, t) : e;
  },
  uhe = function (e) {
    var t = new Set();
    return (
      e.forEach(function (r) {
        return t.add(ES(r, e));
      }),
      e.filter(function (r) {
        return t.has(r);
      })
    );
  },
  ak = function (e) {
    return e[0] && e.length > 1 ? ES(e[0], e) : e[0];
  },
  sk = function (e, t) {
    return e.indexOf(ES(t, e));
  },
  qy = "NEW_FOCUS",
  dhe = function (e, t, r, n, o) {
    var a = e.length,
      s = e[0],
      i = e[a - 1],
      c = TS(n);
    if (!(n && e.indexOf(n) >= 0)) {
      var l = n !== void 0 ? r.indexOf(n) : -1,
        u = o ? r.indexOf(o) : l,
        d = o ? e.indexOf(o) : -1;
      if (l === -1) return d !== -1 ? d : qy;
      if (d === -1) return qy;
      var f = l - u,
        m = r.indexOf(s),
        h = r.indexOf(i),
        p = uhe(r),
        v = n !== void 0 ? p.indexOf(n) : -1,
        b = o ? p.indexOf(o) : v,
        y = p.filter(function (R) {
          return R.tabIndex >= 0;
        }),
        S = n !== void 0 ? y.indexOf(n) : -1,
        w = o ? y.indexOf(o) : S,
        C = S >= 0 && w >= 0 ? w - S : b - v;
      if ((!f && d >= 0) || t.length === 0) return d;
      var T = sk(e, t[0]),
        k = sk(e, t[t.length - 1]);
      if (l <= m && c && Math.abs(f) > 1) return k;
      if (l >= h && c && Math.abs(f) > 1) return T;
      if (f && Math.abs(C) > 1) return d;
      if (l <= m) return k;
      if (l > h) return T;
      if (f) return Math.abs(f) > 1 ? d : (a + d + f) % a;
    }
  },
  fhe = function (e) {
    return function (t) {
      var r,
        n = (r = ID(t)) === null || r === void 0 ? void 0 : r.autofocus;
      return (
        t.autofocus || (n !== void 0 && n !== "false") || e.indexOf(t) >= 0
      );
    };
  },
  ik = function (e, t, r) {
    var n = e.map(function (a) {
        var s = a.node;
        return s;
      }),
      o = ok(n.filter(fhe(r)));
    return o && o.length ? ak(o) : ak(ok(t));
  },
  Xy = function (e, t) {
    return (
      t === void 0 && (t = []),
      t.push(e),
      e.parentNode && Xy(e.parentNode.host || e.parentNode, t),
      t
    );
  },
  $v = function (e, t) {
    for (var r = Xy(e), n = Xy(t), o = 0; o < r.length; o += 1) {
      var a = r[o];
      if (n.indexOf(a) >= 0) return a;
    }
    return !1;
  },
  ND = function (e, t, r) {
    var n = _a(e),
      o = _a(t),
      a = n[0],
      s = !1;
    return (
      o.filter(Boolean).forEach(function (i) {
        (s = $v(s || i, i) || s),
          r.filter(Boolean).forEach(function (c) {
            var l = $v(a, c);
            l && (!s || wa(l, s) ? (s = l) : (s = $v(l, s)));
          });
      }),
      s
    );
  },
  ck = function (e, t) {
    return e.reduce(function (r, n) {
      return r.concat(nhe(n, t));
    }, []);
  },
  mhe = function (e, t) {
    var r = new Map();
    return (
      t.forEach(function (n) {
        return r.set(n.node, n);
      }),
      e
        .map(function (n) {
          return r.get(n);
        })
        .filter(Yme)
    );
  },
  hhe = function (e, t) {
    var r = gl(_a(e).length > 0 ? document : TD(e).ownerDocument),
      n = IS(e).filter(Ky),
      o = ND(r || e, e, n),
      a = new Map(),
      s = yl(n, a),
      i = s.filter(function (h) {
        var p = h.node;
        return Ky(p);
      });
    if (i[0]) {
      var c = yl([o], a).map(function (h) {
          var p = h.node;
          return p;
        }),
        l = mhe(c, i),
        u = l.map(function (h) {
          var p = h.node;
          return p;
        }),
        d = l
          .filter(function (h) {
            var p = h.tabIndex;
            return p >= 0;
          })
          .map(function (h) {
            var p = h.node;
            return p;
          }),
        f = dhe(u, d, c, r, t);
      if (f === qy) {
        var m = ik(s, d, ck(n, a)) || ik(s, u, ck(n, a));
        if (m) return { node: m };
        console.warn("focus-lock: cannot find any node to move focus into");
        return;
      }
      return f === void 0 ? f : l[f];
    }
  },
  phe = function (e) {
    var t = IS(e).filter(Ky),
      r = ND(e, e, t),
      n = PS(ui([r], !0), !0, !0),
      o = ui(t, !1);
    return n.map(function (a) {
      var s = a.node,
        i = a.index;
      return { node: s, index: i, lockItem: o.indexOf(s) >= 0, guard: TS(s) };
    });
  },
  MS = function (e, t) {
    e &&
      ("focus" in e && e.focus(t),
      "contentWindow" in e && e.contentWindow && e.contentWindow.focus());
  },
  wv = 0,
  Cv = !1,
  OD = function (e, t, r) {
    r === void 0 && (r = {});
    var n = hhe(e, t);
    if (!Cv && n) {
      if (wv > 2) {
        console.error(
          "FocusLock: focus-fighting detected. Only one focus management system could be active. See https://github.com/theKashey/focus-lock/#focus-fighting"
        ),
          (Cv = !0),
          setTimeout(function () {
            Cv = !1;
          }, 1);
        return;
      }
      wv++, MS(n.node, r.focusOptions), wv--;
    }
  };
function yc(e) {
  if (!e) return null;
  if (typeof WeakRef > "u")
    return function () {
      return e || null;
    };
  var t = e ? new WeakRef(e) : null;
  return function () {
    return (t == null ? void 0 : t.deref()) || null;
  };
}
var vhe = function (e) {
    if (!e) return null;
    for (var t = [], r = e; r && r !== document.body; )
      t.push({
        current: yc(r),
        parent: yc(r.parentElement),
        left: yc(r.previousElementSibling),
        right: yc(r.nextElementSibling),
      }),
        (r = r.parentElement);
    return { element: yc(e), stack: t, ownerDocument: e.ownerDocument };
  },
  yhe = function (e) {
    var t, r, n, o, a;
    if (e)
      for (
        var s = e.stack, i = e.ownerDocument, c = new Map(), l = 0, u = s;
        l < u.length;
        l++
      ) {
        var d = u[l],
          f = (t = d.parent) === null || t === void 0 ? void 0 : t.call(d);
        if (f && i.contains(f)) {
          for (
            var m = (r = d.left) === null || r === void 0 ? void 0 : r.call(d),
              h = d.current(),
              p = f.contains(h) ? h : void 0,
              v = (n = d.right) === null || n === void 0 ? void 0 : n.call(d),
              b = _S([f], c),
              y =
                (a =
                  (o = p ?? (m == null ? void 0 : m.nextElementSibling)) !==
                    null && o !== void 0
                    ? o
                    : v) !== null && a !== void 0
                  ? a
                  : m;
            y;

          ) {
            for (var S = 0, w = b; S < w.length; S++) {
              var C = w[S];
              if (y != null && y.contains(C.node)) return C.node;
            }
            y = y.nextElementSibling;
          }
          if (b.length) return b[0].node;
        }
      }
  },
  BD = function (e) {
    var t = vhe(e);
    return function () {
      return yhe(t);
    };
  },
  ghe = function (e, t, r) {
    if (!e || !t) return console.error("no element or scope given"), {};
    var n = _a(t);
    if (
      n.every(function (s) {
        return !wa(s, e);
      })
    )
      return console.error("Active element is not contained in the scope"), {};
    var o = r ? _S(n, new Map()) : yl(n, new Map()),
      a = o.findIndex(function (s) {
        var i = s.node;
        return i === e;
      });
    if (a !== -1)
      return {
        prev: o[a - 1],
        next: o[a + 1],
        first: o[0],
        last: o[o.length - 1],
      };
  },
  bhe = function (e, t) {
    var r = t ? _S(_a(e), new Map()) : yl(_a(e), new Map());
    return { first: r[0], last: r[r.length - 1] };
  },
  She = function (e) {
    return Object.assign(
      { scope: document.body, cycle: !0, onlyTabbable: !0 },
      e
    );
  },
  LD = function (e, t, r) {
    t === void 0 && (t = {});
    var n = She(t),
      o = ghe(e, n.scope, n.onlyTabbable);
    if (o) {
      var a = r(o, n.cycle);
      a && MS(a.node, n.focusOptions);
    }
  },
  xhe = function (e, t) {
    t === void 0 && (t = {}),
      LD(e, t, function (r, n) {
        var o = r.next,
          a = r.first;
        return o || (n && a);
      });
  },
  $he = function (e, t) {
    t === void 0 && (t = {}),
      LD(e, t, function (r, n) {
        var o = r.prev,
          a = r.last;
        return o || (n && a);
      });
  },
  VD = function (e, t, r) {
    var n,
      o = bhe(e, (n = t.onlyTabbable) !== null && n !== void 0 ? n : !0),
      a = o[r];
    a && MS(a.node, t.focusOptions);
  },
  whe = function (e, t) {
    t === void 0 && (t = {}), VD(e, t, "first");
  },
  Che = function (e, t) {
    t === void 0 && (t = {}), VD(e, t, "last");
  };
function FS(e) {
  setTimeout(e, 1);
}
var jS = function (t, r) {
    var n = {};
    return (n[t] = r), n;
  },
  zD = function (t) {
    return t && "current" in t ? t.current : t;
  },
  HD = function () {
    return document && document.activeElement === document.body;
  },
  khe = function () {
    return HD() || che();
  },
  Ys = null,
  Xt = null,
  lk = function () {
    return null;
  },
  Zs = null,
  bl = !1,
  DS = !1,
  The = function () {
    return !0;
  },
  Phe = function (t) {
    return (Ys.whiteList || The)(t);
  },
  Rhe = function (t, r) {
    Zs = { observerNode: t, portaledElement: r };
  },
  Ahe = function (t) {
    return Zs && Zs.portaledElement === t;
  };
function uk(e, t, r, n) {
  var o = null,
    a = e;
  do {
    var s = n[a];
    if (s.guard) s.node.dataset.focusAutoGuard && (o = s);
    else if (s.lockItem) {
      if (a !== e) return;
      o = null;
    } else break;
  } while ((a += r) !== t);
  o && (o.node.tabIndex = 0);
}
var _he = function (t) {
    return t ? !!bl : bl === "meanwhile";
  },
  Ihe = function e(t, r, n) {
    return (
      r &&
      ((r.host === t && (!r.activeElement || n.contains(r.activeElement))) ||
        (r.parentNode && e(t, r.parentNode, n)))
    );
  },
  Ehe = function (t, r) {
    return r.some(function (n) {
      return Ihe(t, n, n);
    });
  },
  WD = function (t) {
    return yl(t, new Map());
  },
  Mhe = function (t) {
    return !WD([t.parentNode]).some(function (r) {
      return r.node === t;
    });
  },
  Tf = function () {
    var t = !1;
    if (Ys) {
      var r = Ys,
        n = r.observed,
        o = r.persistentFocus,
        a = r.autoFocus,
        s = r.shards,
        i = r.crossFrame,
        c = r.focusOptions,
        l = r.noFocusGuards,
        u = n || (Zs && Zs.portaledElement);
      if (
        HD() &&
        Xt &&
        Xt !== document.body &&
        (!document.body.contains(Xt) || Mhe(Xt))
      ) {
        var d = lk();
        d && d.focus();
      }
      var f = document && document.activeElement;
      if (u) {
        var m = [u].concat(s.map(zD).filter(Boolean)),
          h = function () {
            if (!_he(i) || !l || !Xt || DS) return !1;
            var S = WD(m),
              w = S.findIndex(function (C) {
                var T = C.node;
                return T === Xt;
              });
            return w === 0 || w === S.length - 1;
          };
        if (
          ((!f || Phe(f)) &&
            (o || h() || !khe() || (!Xt && a)) &&
            (u &&
              !(DD(m) || (f && Ehe(f, m)) || Ahe(f)) &&
              (document && !Xt && f && !a
                ? (f.blur && f.blur(), document.body.focus())
                : ((t = OD(m, Xt, { focusOptions: c })), (Zs = {}))),
            (Xt = document && document.activeElement),
            Xt !== document.body && (lk = BD(Xt)),
            (bl = !1)),
          document &&
            f !== document.activeElement &&
            document.querySelector("[data-focus-auto-guard]"))
        ) {
          var p = document && document.activeElement,
            v = phe(m),
            b = v
              .map(function (y) {
                var S = y.node;
                return S;
              })
              .indexOf(p);
          b > -1 &&
            (v
              .filter(function (y) {
                var S = y.guard,
                  w = y.node;
                return S && w.dataset.focusAutoGuard;
              })
              .forEach(function (y) {
                var S = y.node;
                return S.removeAttribute("tabIndex");
              }),
            uk(b, v.length, 1, v),
            uk(b, -1, -1, v));
        }
      }
    }
    return t;
  },
  GD = function (t) {
    Tf() && t && (t.stopPropagation(), t.preventDefault());
  },
  NS = function () {
    return FS(Tf);
  },
  Fhe = function (t) {
    var r = t.target,
      n = t.currentTarget;
    n.contains(r) || Rhe(n, r);
  },
  jhe = function () {
    return null;
  },
  UD = function () {
    DS = !0;
  },
  KD = function () {
    (DS = !1),
      (bl = "just"),
      FS(function () {
        bl = "meanwhile";
      });
  },
  Dhe = function () {
    document.addEventListener("focusin", GD),
      document.addEventListener("focusout", NS),
      window.addEventListener("focus", UD),
      window.addEventListener("blur", KD);
  },
  Nhe = function () {
    document.removeEventListener("focusin", GD),
      document.removeEventListener("focusout", NS),
      window.removeEventListener("focus", UD),
      window.removeEventListener("blur", KD);
  };
function Ohe(e) {
  return e.filter(function (t) {
    var r = t.disabled;
    return !r;
  });
}
var qD = {
  moveFocusInside: OD,
  focusInside: DD,
  focusNextElement: xhe,
  focusPrevElement: $he,
  focusFirstElement: whe,
  focusLastElement: Che,
  captureFocusRestore: BD,
};
function Bhe(e) {
  var t = e.slice(-1)[0];
  t && !Ys && Dhe();
  var r = Ys,
    n = r && t && t.id === r.id;
  (Ys = t),
    r &&
      !n &&
      (r.onDeactivation(),
      e.filter(function (o) {
        var a = o.id;
        return a === r.id;
      }).length || r.returnFocus(!t)),
    t
      ? ((Xt = null),
        (!n || r.observed !== t.observed) && t.onActivation(qD),
        Tf(),
        FS(Tf))
      : (Nhe(), (Xt = null));
}
$D.assignSyncMedium(Fhe);
wD.assignMedium(NS);
CS.assignMedium(function (e) {
  return e(qD);
});
const Lhe = zme(Ohe, Bhe)(jhe);
var XD = g.forwardRef(function (t, r) {
    return Lt.createElement(kS, yr({ sideCar: Lhe, ref: r }, t));
  }),
  YD = kS.propTypes || {};
YD.sideCar;
Dz(YD, ["sideCar"]);
XD.propTypes = {};
var ZD = function (t) {
  var r = t.disabled,
    n = r === void 0 ? !1 : r,
    o = t.children,
    a = t.className,
    s = a === void 0 ? void 0 : a;
  return Lt.createElement("div", yr({}, jS(SS, !n), { className: s }), o);
};
ZD.propTypes = {};
const Vhe = ZD;
var QD = function (t) {
  g.useEffect(
    function () {
      var r = !0;
      return (
        CS.useMedium(function (n) {
          var o = t && t.current;
          r && o && (n.focusInside(o) || n.moveFocusInside(o, null));
        }),
        function () {
          r = !1;
        }
      );
    },
    [t]
  );
};
function JD(e) {
  var t = e.disabled,
    r = t === void 0 ? !1 : t,
    n = e.className,
    o = e.children,
    a = g.useRef(null);
  return (
    QD(r ? void 0 : a),
    Lt.createElement("div", yr({}, jS(SS, !r), { ref: a, className: n }), o)
  );
}
JD.propTypes = {};
var eN = function (t) {
  var r = t.children,
    n = t.className;
  return Lt.createElement("div", yr({}, jS(Wj, !0), { className: n }), r);
};
eN.propTypes = {};
const zhe = eN;
var ia = function (t) {
    return t.map(zD).filter(Boolean);
  },
  gc = function (t) {
    return new Promise(function (r) {
      return CS.useMedium(function () {
        r(t.apply(void 0, arguments));
      });
    });
  },
  tN = function () {
    for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++)
      r[n] = arguments[n];
    if (!r.length)
      throw new Error(
        "useFocusController requires at least one target element"
      );
    var o = g.useRef(r);
    return (
      (o.current = r),
      g.useMemo(function () {
        return {
          autoFocus: function (s) {
            return (
              s === void 0 && (s = {}),
              gc(function (i) {
                return i.moveFocusInside(ia(o.current), null, s);
              })
            );
          },
          focusNext: function (s) {
            return gc(function (i) {
              i.moveFocusInside(ia(o.current), null),
                i.focusNextElement(
                  document.activeElement,
                  yr({ scope: ia(o.current) }, s)
                );
            });
          },
          focusPrev: function (s) {
            return gc(function (i) {
              i.moveFocusInside(ia(o.current), null),
                i.focusPrevElement(
                  document.activeElement,
                  yr({ scope: ia(o.current) }, s)
                );
            });
          },
          focusFirst: function (s) {
            return gc(function (i) {
              i.focusFirstElement(ia(o.current), s);
            });
          },
          focusLast: function (s) {
            return gc(function (i) {
              i.focusLastElement(ia(o.current), s);
            });
          },
        };
      }, [])
    );
  },
  Hhe = function () {
    var t = g.useContext(CD);
    if (!t) throw new Error("FocusLock is required to operate with FocusScope");
    return tN.apply(void 0, [t.observed].concat(t.shards));
  },
  Whe = function () {
    return {
      emit: function (r) {
        for (
          var n = arguments.length, o = new Array(n > 1 ? n - 1 : 0), a = 1;
          a < n;
          a++
        )
          o[a - 1] = arguments[a];
        for (var s = 0, i = this.events[r] || [], c = i.length; s < c; s++)
          i[s].apply(i, o);
      },
      events: {},
      on: function (r, n) {
        var o,
          a = this;
        return (
          ((o = this.events)[r] || (o[r] = [])).push(n),
          function () {
            var s;
            a.events[r] =
              (s = a.events[r]) == null
                ? void 0
                : s.filter(function (i) {
                    return n !== i;
                  });
          }
        );
      },
    };
  },
  Pf = Whe(),
  id = 0,
  dk = function (t) {
    return Pf.emit("assign", t.target);
  },
  fk = function (t) {
    return Pf.emit("reset", t.target);
  },
  Ghe = function () {
    g.useEffect(function () {
      return (
        id ||
          (document.addEventListener("focusin", dk),
          document.addEventListener("focusout", fk)),
        (id += 1),
        function () {
          (id -= 1),
            id ||
              (document.removeEventListener("focusin", dk),
              document.removeEventListener("focusout", fk));
        }
      );
    }, []);
  },
  mk = function (t, r) {
    return t === r ? "self" : r.contains(t) ? "within" : "within-boundary";
  },
  Uhe = function (t) {
    t === void 0 && (t = {});
    var r = g.useState(!1),
      n = r[0],
      o = r[1],
      a = g.useState(""),
      s = a[0],
      i = a[1],
      c = g.useRef(null),
      l = g.useRef({}),
      u = g.useRef(!1);
    g.useEffect(function () {
      if (c.current) {
        var f =
          c.current === document.activeElement ||
          c.current.contains(document.activeElement);
        o(f),
          i(mk(document.activeElement, c.current)),
          f && t.onFocus && t.onFocus();
      }
    }, []);
    var d = g.useCallback(function (f) {
      l.current = { focused: !0, state: mk(f.target, f.currentTarget) };
    }, []);
    return (
      Ghe(),
      g.useEffect(function () {
        var f = Pf.on("reset", function () {
            l.current = {};
          }),
          m = Pf.on("assign", function () {
            var h = l.current.focused || !1;
            o(h),
              i(l.current.state || ""),
              h !== u.current &&
                ((u.current = h),
                h ? t.onFocus && t.onFocus() : t.onBlur && t.onBlur());
          });
        return function () {
          f(), m();
        };
      }, []),
      { active: n, state: s, onFocus: d, ref: c }
    );
  };
const Khe = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        AutoFocusInside: Vhe,
        FocusLockUI: kS,
        FreeFocusInside: zhe,
        InFocusGuard: Eme,
        MoveFocusInside: JD,
        default: XD,
        useFocusController: tN,
        useFocusInside: QD,
        useFocusScope: Hhe,
        useFocusState: Uhe,
      },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  qhe = Fa(Khe);
var Xhe = P,
  hk = qhe,
  Yhe = x,
  pk = g;
const Zhe = hk.default ?? hk,
  rN = (e) => {
    const {
        initialFocusRef: t,
        finalFocusRef: r,
        contentRef: n,
        restoreFocus: o,
        children: a,
        isDisabled: s,
        autoFocus: i,
        persistentFocus: c,
        lockFocusAcrossFrames: l,
      } = e,
      u = pk.useCallback(() => {
        t != null && t.current
          ? t.current.focus()
          : n != null &&
            n.current &&
            Yhe.getAllFocusable(n.current).length === 0 &&
            requestAnimationFrame(() => {
              var h;
              (h = n.current) == null || h.focus();
            });
      }, [t, n]),
      d = pk.useCallback(() => {
        var m;
        (m = r == null ? void 0 : r.current) == null || m.focus();
      }, [r]),
      f = o && !r;
    return Xhe.jsx(Zhe, {
      crossFrame: l,
      persistentFocus: c,
      autoFocus: i,
      disabled: s,
      onActivation: u,
      onDeactivation: d,
      returnFocus: f,
      children: a,
    });
  };
rN.displayName = "FocusLock";
bS.FocusLock = rN;
var qm = {},
  Rf = P,
  Qhe = I,
  OS = x,
  nN = uo,
  Jhe = Dr,
  oN = D,
  epe = he,
  tpe = M;
const [rpe, aN] = OS.createContext({
    name: "FormErrorStylesContext",
    errorMessage: `useFormErrorStyles returned is 'undefined'. Seems you forgot to wrap the components in "<FormError />" `,
  }),
  sN = oN.forwardRef((e, t) => {
    const r = epe.useMultiStyleConfig("FormError", e),
      n = Qhe.omitThemingProps(e),
      o = nN.useFormControlContext();
    return o != null && o.isInvalid
      ? Rf.jsx(rpe, {
          value: r,
          children: Rf.jsx(tpe.chakra.div, {
            ...(o == null ? void 0 : o.getErrorMessageProps(n, t)),
            className: OS.cx("chakra-form__error-message", e.className),
            __css: { display: "flex", alignItems: "center", ...r.text },
          }),
        })
      : null;
  });
sN.displayName = "FormErrorMessage";
const iN = oN.forwardRef((e, t) => {
  const r = aN(),
    n = nN.useFormControlContext();
  if (!(n != null && n.isInvalid)) return null;
  const o = OS.cx("chakra-form__error-icon", e.className);
  return Rf.jsx(Jhe.Icon, {
    ref: t,
    "aria-hidden": !0,
    ...e,
    __css: r.icon,
    className: o,
    children: Rf.jsx("path", {fill: "currentColor",
      d: "M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z",
    }),
  });
});
iN.displayName = "FormErrorIcon";
qm.FormErrorIcon = iN;
qm.FormErrorMessage = sN;
qm.useFormErrorStyles = aN;
var BS = {},
  Yy = P,
  npe = I,
  cN = x,
  Zy = uo,
  lN = D,
  ope = he,
  uN = M;
const dN = lN.forwardRef(function (t, r) {
  const n = ope.useStyleConfig("FormLabel", t),
    o = npe.omitThemingProps(t),
    {
      className: a,
      children: s,
      requiredIndicator: i = Yy.jsx(LS, {}),
      optionalIndicator: c = null,
      ...l
    } = o,
    u = Zy.useFormControlContext(),
    d = (u == null ? void 0 : u.getLabelProps(l, r)) ?? { ref: r, ...l };
  return Yy.jsxs(uN.chakra.label, {
    ...d,
    className: cN.cx("chakra-form__label", o.className),
    __css: { display: "block", textAlign: "start", ...n },
    children: [s, u != null && u.isRequired ? i : c],
  });
});
dN.displayName = "FormLabel";
const LS = lN.forwardRef(function (t, r) {
  const n = Zy.useFormControlContext(),
    o = Zy.useFormControlStyles();
  if (!(n != null && n.isRequired)) return null;
  const a = cN.cx("chakra-form__required-indicator", t.className);
  return Yy.jsx(uN.chakra.span, {
    ...(n == null ? void 0 : n.getRequiredIndicatorProps(t, r)),
    __css: o.requiredIndicator,
    className: a,
  });
});
LS.displayName = "RequiredIndicator";
BS.FormLabel = dN;
BS.RequiredIndicator = LS;
var VS = {},
  ape = P,
  spe = D,
  ipe = M;
const fN = spe.forwardRef(function (t, r) {
  const {
      templateAreas: n,
      gap: o,
      rowGap: a,
      columnGap: s,
      column: i,
      row: c,
      autoFlow: l,
      autoRows: u,
      templateRows: d,
      autoColumns: f,
      templateColumns: m,
      ...h
    } = t,
    p = {
      display: "grid",
      gridTemplateAreas: n,
      gridGap: o,
      gridRowGap: a,
      gridColumnGap: s,
      gridAutoColumns: f,
      gridColumn: i,
      gridRow: c,
      gridAutoFlow: l,
      gridAutoRows: u,
      gridTemplateRows: d,
      gridTemplateColumns: m,
    };
  return ape.jsx(ipe.chakra.div, { ref: r, __css: p, ...h });
});
fN.displayName = "Grid";
VS.Grid = fN;
var mN = {},
  cpe = P,
  hN = x,
  lpe = D,
  upe = M;
function vk(e) {
  return hN.mapResponsive(e, (t) =>
    t === "auto" ? "auto" : `span ${t}/span ${t}`
  );
}
const pN = lpe.forwardRef(function (t, r) {
  const {
      area: n,
      colSpan: o,
      colStart: a,
      colEnd: s,
      rowEnd: i,
      rowSpan: c,
      rowStart: l,
      ...u
    } = t,
    d = hN.compact({
      gridArea: n,
      gridColumn: vk(o),
      gridRow: vk(c),
      gridColumnStart: a,
      gridColumnEnd: s,
      gridRowStart: l,
      gridRowEnd: i,
    });
  return cpe.jsx(upe.chakra.div, { ref: r, __css: d, ...u });
});
pN.displayName = "GridItem";
mN.GridItem = pN;
var vN = {},
  dpe = P,
  yN = x,
  fpe = VS,
  mpe = $r,
  hpe = Go,
  ppe = D;
const gN = ppe.forwardRef(function (t, r) {
  const {
      columns: n,
      spacingX: o,
      spacingY: a,
      spacing: s,
      minChildWidth: i,
      ...c
    } = t,
    l = mpe.useTheme(),
    u = i ? ype(i, l) : gpe(n);
  return dpe.jsx(fpe.Grid, {
    ref: r,
    gap: s,
    columnGap: o,
    rowGap: a,
    templateColumns: u,
    ...c,
  });
});
gN.displayName = "SimpleGrid";
function vpe(e) {
  return typeof e == "number" ? `${e}px` : e;
}
function ype(e, t) {
  return yN.mapResponsive(e, (r) => {
    const n = hpe.getToken("sizes", r, vpe(r))(t);
    return r === null ? null : `repeat(auto-fit, minmax(${n}, 1fr))`;
  });
}
function gpe(e) {
  return yN.mapResponsive(e, (t) =>
    t === null ? null : `repeat(${t}, minmax(0, 1fr))`
  );
}
vN.SimpleGrid = gN;
var bN = {},
  zS = {},
  bpe = P,
  Spe = I,
  xpe = Lm,
  $pe = D,
  wpe = he;
const Cpe = $pe.forwardRef(function (t, r) {
  const n = wpe.useStyleConfig("Mark", t),
    o = Spe.omitThemingProps(t);
  return bpe.jsx(xpe.Box, {
    ref: r,
    ...o,
    as: "mark",
    __css: { bg: "transparent", whiteSpace: "nowrap", ...n },
  });
});
zS.Mark = Cpe;
var HS = {},
  SN = {};
const kpe = (e) => e.replace(/[|\\{}()[\]^$+*?.-]/g, (t) => `\\${t}`);
function Tpe(e) {
  const t = e.filter((r) => r.length !== 0).map((r) => kpe(r.trim()));
  return t.length ? new RegExp(`(${t.join("|")})`, "ig") : null;
}
function Ppe({ text: e, query: t }) {
  const r = Tpe(Array.isArray(t) ? t : [t]);
  return r
    ? e
        .split(r)
        .filter(Boolean)
        .map((o) => ({ text: o, match: r.test(o) }))
    : [{ text: e, match: !1 }];
}
SN.highlightWords = Ppe;
var Rpe = g,
  Ape = SN;
function _pe(e) {
  const { text: t, query: r } = e;
  return Rpe.useMemo(() => Ape.highlightWords({ text: t, query: r }), [t, r]);
}
HS.useHighlight = _pe;
var cd = P,
  Ipe = g,
  Epe = zS,
  Mpe = HS;
function Fpe(e) {
  const { children: t, query: r, styles: n } = e;
  if (typeof t != "string")
    throw new Error("The children prop of Highlight must be a string");
  const o = Mpe.useHighlight({ query: r, text: t });
  return cd.jsx(cd.Fragment, {
    children: o.map((a, s) =>
      a.match
        ? cd.jsx(Epe.Mark, { sx: n, children: a.text }, s)
        : cd.jsx(Ipe.Fragment, { children: a.text }, s)
    ),
  });
}
bN.Highlight = Fpe;
var xN = {},
  yk = P,
  jpe = g,
  Dpe = Dr,
  Npe = D;
function Ope(e) {
  const {
      viewBox: t = "0 0 24 24",
      d: r,
      displayName: n,
      defaultProps: o = {},
    } = e,
    a = jpe.Children.toArray(e.path),
    s = Npe.forwardRef((i, c) =>
      yk.jsx(Dpe.Icon, {
        ref: c,
        viewBox: t,
        ...o,
        ...i,
        children: a.length ? a : yk.jsx("path", {fill: "currentColor", d: r }),
      })
    );
  return (s.displayName = n), s;
}
xN.createIcon = Ope;
var $N = {},
  WS = {},
  Bpe = P,
  Lpe = D;
const wN = Lpe.forwardRef(function (t, r) {
  const { htmlWidth: n, htmlHeight: o, alt: a, ...s } = t;
  return Bpe.jsx("img", { width: n, height: o, ref: r, alt: a, ...s });
});
wN.displayName = "NativeImage";
WS.NativeImage = wN;
var gk = P,
  Vpe = x,
  bk = WS,
  Sk = Kl,
  zpe = D,
  xk = M;
const CN = zpe.forwardRef(function (t, r) {
  const {
      fallbackSrc: n,
      fallback: o,
      src: a,
      srcSet: s,
      align: i,
      fit: c,
      loading: l,
      ignoreFallback: u,
      crossOrigin: d,
      fallbackStrategy: f = "beforeLoadOrError",
      referrerPolicy: m,
      ...h
    } = t,
    p = n !== void 0 || o !== void 0,
    v = l != null || u || !p,
    b = Sk.useImage({ ...t, crossOrigin: d, ignoreFallback: v }),
    y = Sk.shouldShowFallbackImage(b, f),
    S = {
      ref: r,
      objectFit: c,
      objectPosition: i,
      ...(v ? h : Vpe.omit(h, ["onError", "onLoad"])),
    };
  return y
    ? o ||
        gk.jsx(xk.chakra.img, {
          as: bk.NativeImage,
          className: "chakra-image__placeholder",
          src: n,
          ...S,
        })
    : gk.jsx(xk.chakra.img, {
        as: bk.NativeImage,
        src: a,
        srcSet: s,
        crossOrigin: d,
        loading: l,
        referrerPolicy: m,
        className: "chakra-image",
        ...S,
      });
});
CN.displayName = "Image";
$N.Image = CN;
var kN = {},
  Hpe = P,
  Wpe = WS,
  Gpe = D,
  Upe = M;
const Kpe = Gpe.forwardRef((e, t) =>
  Hpe.jsx(Upe.chakra.img, {
    ref: t,
    as: Wpe.NativeImage,
    className: "chakra-image",
    ...e,
  })
);
kN.Img = Kpe;
var TN = {},
  qpe = P,
  bc = x,
  Xpe = g,
  Ype = D,
  Zpe = M;
const Qpe = Ype.forwardRef(function (t, r) {
  const {
      offsetX: n,
      offsetY: o,
      offset: a = "0",
      placement: s = "top-end",
      ...i
    } = t,
    c = Xpe.useMemo(
      () => ({
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        insetBlockStart: bc.mapResponsive(s, (l) => {
          const [u] = l.split("-");
          return { top: o ?? a, middle: "50%", bottom: "auto" }[u];
        }),
        insetBlockEnd: bc.mapResponsive(s, (l) => {
          const [u] = l.split("-");
          return { top: "auto", middle: "50%", bottom: o ?? a }[u];
        }),
        insetStart: bc.mapResponsive(s, (l) => {
          const [, u] = l.split("-");
          return { start: n ?? a, center: "50%", end: "auto" }[u];
        }),
        insetEnd: bc.mapResponsive(s, (l) => {
          const [, u] = l.split("-");
          return { start: "auto", center: "50%", end: n ?? a }[u];
        }),
        translate: bc.mapResponsive(s, (l) => {
          const [u, d] = l.split("-"),
            f = { start: "-50%", center: "-50%", end: "50%" },
            m = { top: "-50%", middle: "-50%", bottom: "50%" };
          return `${f[d]} ${m[u]}`;
        }),
      }),
      [a, n, o, s]
    );
  return qpe.jsx(Zpe.chakra.div, { ref: r, __css: c, ...i });
});
TN.Indicator = Qpe;
var PN = {},
  Jpe = P,
  eve = I,
  tve = x,
  rve = Ko,
  nve = D,
  ove = he,
  ave = M;
const GS = nve.forwardRef(function (t, r) {
  const { htmlSize: n, ...o } = t,
    a = ove.useMultiStyleConfig("Input", o),
    s = eve.omitThemingProps(o),
    i = rve.useFormControl(s),
    c = tve.cx("chakra-input", t.className);
  return Jpe.jsx(ave.chakra.input, {
    size: n,
    ...i,
    __css: a.field,
    ref: r,
    className: c,
  });
});
GS.displayName = "Input";
GS.id = "Input";
PN.Input = GS;
var Xm = {},
  Zl = {},
  $k = P,
  sve = I,
  Yd = x,
  wk = g,
  ive = D,
  cve = he,
  lve = M;
const [uve, dve] = Yd.createContext({
    name: "InputGroupStylesContext",
    errorMessage: `useInputGroupStyles returned is 'undefined'. Seems you forgot to wrap the components in "<InputGroup />" `,
  }),
  RN = ive.forwardRef(function (t, r) {
    const n = cve.useMultiStyleConfig("Input", t),
      { children: o, className: a, ...s } = sve.omitThemingProps(t),
      i = Yd.cx("chakra-input__group", a),
      c = {},
      l = Yd.getValidChildren(o),
      u = n.field;
    l.forEach((f) => {
      n &&
        (u &&
          f.type.id === "InputLeftElement" &&
          (c.paddingStart = u.height ?? u.h),
        u &&
          f.type.id === "InputRightElement" &&
          (c.paddingEnd = u.height ?? u.h),
        f.type.id === "InputRightAddon" && (c.borderEndRadius = 0),
        f.type.id === "InputLeftAddon" && (c.borderStartRadius = 0));
    });
    const d = l.map((f) => {
      var h, p;
      const m = Yd.compact({
        size: ((h = f.props) == null ? void 0 : h.size) || t.size,
        variant: ((p = f.props) == null ? void 0 : p.variant) || t.variant,
      });
      return f.type.id !== "Input"
        ? wk.cloneElement(f, m)
        : wk.cloneElement(f, Object.assign(m, c, f.props));
    });
    return $k.jsx(lve.chakra.div, {
      className: i,
      ref: r,
      __css: {
        width: "100%",
        display: "flex",
        position: "relative",
        isolation: "isolate",
        ...n.group,
      },
      "data-group": !0,
      ...s,
      children: $k.jsx(uve, { value: n, children: d }),
    });
  });
RN.displayName = "InputGroup";
Zl.InputGroup = RN;
Zl.useInputGroupStyles = dve;
var US = P,
  AN = x,
  fve = Zl,
  mve = M,
  KS = D;
const hve = {
    left: {
      marginEnd: "-1px",
      borderEndRadius: 0,
      borderEndColor: "transparent",
    },
    right: {
      marginStart: "-1px",
      borderStartRadius: 0,
      borderStartColor: "transparent",
    },
  },
  pve = mve.chakra("div", {
    baseStyle: {
      flex: "0 0 auto",
      width: "auto",
      display: "flex",
      alignItems: "center",
      whiteSpace: "nowrap",
    },
  }),
  Ym = KS.forwardRef(function (t, r) {
    const { placement: n = "left", ...o } = t,
      a = hve[n] ?? {},
      s = fve.useInputGroupStyles();
    return US.jsx(pve, { ref: r, ...o, __css: { ...s.addon, ...a } });
  });
Ym.displayName = "InputAddon";
const qS = KS.forwardRef(function (t, r) {
  return US.jsx(Ym, {
    ref: r,
    placement: "left",
    ...t,
    className: AN.cx("chakra-input__left-addon", t.className),
  });
});
qS.displayName = "InputLeftAddon";
qS.id = "InputLeftAddon";
const XS = KS.forwardRef(function (t, r) {
  return US.jsx(Ym, {
    ref: r,
    placement: "right",
    ...t,
    className: AN.cx("chakra-input__right-addon", t.className),
  });
});
XS.displayName = "InputRightAddon";
XS.id = "InputRightAddon";
Xm.InputAddon = Ym;
Xm.InputLeftAddon = qS;
Xm.InputRightAddon = XS;
var YS = {},
  ZS = P,
  _N = x,
  vve = Zl,
  yve = M,
  QS = D;
const gve = yve.chakra("div", {
    baseStyle: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      top: "0",
      zIndex: 2,
    },
  }),
  Zm = QS.forwardRef(function (t, r) {
    const { placement: n = "left", ...o } = t,
      a = vve.useInputGroupStyles(),
      s = a.field,
      c = {
        [n === "left" ? "insetStart" : "insetEnd"]: "0",
        width: (s == null ? void 0 : s.height) ?? (s == null ? void 0 : s.h),
        height: (s == null ? void 0 : s.height) ?? (s == null ? void 0 : s.h),
        fontSize: s == null ? void 0 : s.fontSize,
        ...a.element,
      };
    return ZS.jsx(gve, { ref: r, __css: c, ...o });
  });
Zm.id = "InputElement";
Zm.displayName = "InputElement";
const JS = QS.forwardRef(function (t, r) {
  const { className: n, ...o } = t,
    a = _N.cx("chakra-input__left-element", n);
  return ZS.jsx(Zm, { ref: r, placement: "left", className: a, ...o });
});
JS.id = "InputLeftElement";
JS.displayName = "InputLeftElement";
const ex = QS.forwardRef(function (t, r) {
  const { className: n, ...o } = t,
    a = _N.cx("chakra-input__right-element", n);
  return ZS.jsx(Zm, { ref: r, placement: "right", className: a, ...o });
});
ex.id = "InputRightElement";
ex.displayName = "InputRightElement";
YS.InputLeftElement = JS;
YS.InputRightElement = ex;
var IN = {},
  bve = P,
  Sve = I,
  xve = x,
  $ve = D,
  wve = he,
  Cve = M;
const EN = $ve.forwardRef(function (t, r) {
  const n = wve.useStyleConfig("Kbd", t),
    { className: o, ...a } = Sve.omitThemingProps(t);
  return bve.jsx(Cve.chakra.kbd, {
    ref: r,
    className: xve.cx("chakra-kbd", o),
    ...a,
    __css: { fontFamily: "mono", ...n },
  });
});
EN.displayName = "Kbd";
IN.Kbd = EN;
var MN = {},
  kve = P,
  Tve = I,
  Pve = x,
  Rve = D,
  Ave = he,
  _ve = M;
const FN = Rve.forwardRef(function (t, r) {
  const n = Ave.useStyleConfig("Link", t),
    { className: o, isExternal: a, ...s } = Tve.omitThemingProps(t);
  return kve.jsx(_ve.chakra.a, {
    target: a ? "_blank" : void 0,
    rel: a ? "noopener" : void 0,
    ref: r,
    className: Pve.cx("chakra-link", o),
    ...s,
    __css: n,
  });
});
FN.displayName = "Link";
MN.Link = FN;
var tx = {},
  jN = P,
  DN = x,
  NN = D,
  ON = M;
const Ive = NN.forwardRef(function (t, r) {
    const { isExternal: n, target: o, rel: a, className: s, ...i } = t;
    return jN.jsx(ON.chakra.a, {
      ...i,
      ref: r,
      className: DN.cx("chakra-linkbox__overlay", s),
      rel: n ? "noopener noreferrer" : a,
      target: n ? "_blank" : o,
      __css: {
        position: "static",
        "&::before": {
          content: "''",
          cursor: "inherit",
          display: "block",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 0,
          width: "100%",
          height: "100%",
        },
      },
    });
  }),
  Eve = NN.forwardRef(function (t, r) {
    const { className: n, ...o } = t;
    return jN.jsx(ON.chakra.div, {
      ref: r,
      position: "relative",
      ...o,
      className: DN.cx("chakra-linkbox", n),
      __css: {
        "a[href]:not(.chakra-linkbox__overlay), abbr[title]": {
          position: "relative",
          zIndex: 1,
        },
      },
    });
  });
tx.LinkBox = Eve;
tx.LinkOverlay = Ive;
var Xa = {},
  di = P,
  Mve = I,
  BN = x,
  Fve = Dr,
  Ql = D,
  jve = he,
  LN = M;
const [Dve, rx] = BN.createContext({
    name: "ListStylesContext",
    errorMessage: `useListStyles returned is 'undefined'. Seems you forgot to wrap the components in "<List />" `,
  }),
  Qm = Ql.forwardRef(function (t, r) {
    const n = jve.useMultiStyleConfig("List", t),
      {
        children: o,
        styleType: a = "none",
        stylePosition: s,
        spacing: i,
        ...c
      } = Mve.omitThemingProps(t),
      l = BN.getValidChildren(o),
      d = i ? { ["& > *:not(style) ~ *:not(style)"]: { mt: i } } : {};
    return di.jsx(Dve, {
      value: n,
      children: di.jsx(LN.chakra.ul, {
        ref: r,
        listStyleType: a,
        listStylePosition: s,
        role: "list",
        __css: { ...n.container, ...d },
        ...c,
        children: l,
      }),
    });
  });
Qm.displayName = "List";
const VN = Ql.forwardRef((e, t) => {
  const { as: r, ...n } = e;
  return di.jsx(Qm, {
    ref: t,
    as: "ol",
    styleType: "decimal",
    marginStart: "1em",
    ...n,
  });
});
VN.displayName = "OrderedList";
const zN = Ql.forwardRef(function (t, r) {
  const { as: n, ...o } = t;
  return di.jsx(Qm, {
    ref: r,
    as: "ul",
    styleType: "initial",
    marginStart: "1em",
    ...o,
  });
});
zN.displayName = "UnorderedList";
const HN = Ql.forwardRef(function (t, r) {
  const n = rx();
  return di.jsx(LN.chakra.li, { ref: r, ...t, __css: n.item });
});
HN.displayName = "ListItem";
const WN = Ql.forwardRef(function (t, r) {
  const n = rx();
  return di.jsx(Fve.Icon, {
    ref: r,
    role: "presentation",
    ...t,
    __css: n.icon,
  });
});
WN.displayName = "ListIcon";
Xa.List = Qm;
Xa.ListIcon = WN;
Xa.ListItem = HN;
Xa.OrderedList = VN;
Xa.UnorderedList = zN;
Xa.useListStyles = rx;
var GN = {},
  Jm = {},
  Nve = $r;
const Ck = (e, t) => {
  var r;
  return (
    ((r = e == null ? void 0 : e.breakpoints) == null ? void 0 : r[t]) ?? t
  );
};
function Ove(e) {
  const { breakpoint: t = "", below: r, above: n } = e,
    o = Nve.useTheme(),
    a = Ck(o, r),
    s = Ck(o, n);
  let i = t;
  return a ? (i = `(max-width: ${a})`) : s && (i = `(min-width: ${s})`), i;
}
Jm.useQuery = Ove;
var nx = {},
  Jl = {},
  kk = g,
  Bve = Bl;
function Lve(e, t = {}) {
  const { ssr: r = !0, fallback: n } = t,
    { getWindow: o } = Bve.useEnvironment(),
    a = Array.isArray(e) ? e : [e];
  let s = Array.isArray(n) ? n : [n];
  s = s.filter((l) => l != null);
  const [i, c] = kk.useState(() =>
    a.map((l, u) => ({
      media: l,
      matches: r ? !!s[u] : o().matchMedia(l).matches,
    }))
  );
  return (
    kk.useEffect(() => {
      const l = o();
      c(a.map((f) => ({ media: f, matches: l.matchMedia(f).matches })));
      const u = a.map((f) => l.matchMedia(f)),
        d = (f) => {
          c((m) =>
            m
              .slice()
              .map((h) =>
                h.media === f.media ? { ...h, matches: f.matches } : h
              )
          );
        };
      return (
        u.forEach((f) => {
          typeof f.addListener == "function"
            ? f.addListener(d)
            : f.addEventListener("change", d);
        }),
        () => {
          u.forEach((f) => {
            typeof f.removeListener == "function"
              ? f.removeListener(d)
              : f.removeEventListener("change", d);
          });
        }
      );
    }, [o]),
    i.map((l) => l.matches)
  );
}
Jl.useMediaQuery = Lve;
var Vve = Jl;
function zve(e) {
  const { breakpoint: t, hide: r, children: n, ssr: o } = e,
    [a] = Vve.useMediaQuery(t, { ssr: o });
  return (r ? !a : a) ? n : null;
}
nx.Visibility = zve;
var Hve = P,
  Wve = Jm,
  Gve = nx;
function UN(e) {
  const { children: t, ssr: r } = e,
    n = Wve.useQuery(e);
  return Hve.jsx(Gve.Visibility, {
    breakpoint: n,
    hide: !0,
    ssr: r,
    children: t,
  });
}
UN.displayName = "Hide";
GN.Hide = UN;
var ox = {},
  KN = Jl;
function Uve(e) {
  const [t] = KN.useMediaQuery("(prefers-reduced-motion: reduce)", e);
  return t;
}
function Kve(e) {
  const [t, r] = KN.useMediaQuery(
    ["(prefers-color-scheme: light)", "(prefers-color-scheme: dark)"],
    e
  );
  if (t) return "light";
  if (r) return "dark";
}
ox.useColorModePreference = Kve;
ox.usePrefersReducedMotion = Uve;
var qN = {},
  qve = P,
  Xve = Jm,
  Yve = nx;
function XN(e) {
  const { children: t, ssr: r } = e,
    n = Xve.useQuery(e);
  return qve.jsx(Yve.Visibility, { breakpoint: n, ssr: r, children: t });
}
XN.displayName = "Show";
qN.Show = XN;
var ax = {},
  Zve = x,
  Qve = Jl,
  Jve = $r;
function eye(e) {
  var i;
  const t = Zve.isObject(e) ? e : { fallback: e ?? "base" },
    n = Jve.useTheme().__breakpoints.details.map(
      ({ minMaxQuery: c, breakpoint: l }) => ({
        breakpoint: l,
        query: c.replace("@media screen and ", ""),
      })
    ),
    o = n.map((c) => c.breakpoint === t.fallback),
    s = Qve.useMediaQuery(
      n.map((c) => c.query),
      { fallback: o, ssr: t.ssr }
    ).findIndex((c) => c == !0);
  return ((i = n[s]) == null ? void 0 : i.breakpoint) ?? t.fallback;
}
ax.useBreakpoint = eye;
var sx = {},
  YN = {},
  tye = x;
function rye(e, t, r = tye.breakpoints) {
  let n = Object.keys(e).indexOf(t);
  if (n !== -1) return e[t];
  let o = r.indexOf(t);
  for (; o >= 0; ) {
    const a = r[o];
    if (e.hasOwnProperty(a)) {
      n = o;
      break;
    }
    o -= 1;
  }
  if (n !== -1) {
    const a = r[n];
    return e[a];
  }
}
YN.getClosestValue = rye;
var Tk = x,
  nye = YN,
  oye = ax,
  aye = $r;
function sye(e, t) {
  var i;
  const r = Tk.isObject(t) ? t : { fallback: t ?? "base" },
    n = oye.useBreakpoint(r),
    o = aye.useTheme();
  if (!n) return;
  const a = Array.from(((i = o.__breakpoints) == null ? void 0 : i.keys) || []),
    s = Array.isArray(e)
      ? Object.fromEntries(
          Object.entries(Tk.arrayToObjectNotation(e, a)).map(([c, l]) => [c, l])
        )
      : e;
  return nye.getClosestValue(s, n, a);
}
sx.useBreakpointValue = sye;
var En = {},
  rt = {},
  ZN = {};
function iye(e, t, r, n) {
  if (t == null) return n;
  if (!n) return e.find((s) => r(s).toLowerCase().startsWith(t.toLowerCase()));
  const o = e.filter((a) => r(a).toLowerCase().startsWith(t.toLowerCase()));
  if (o.length > 0) {
    let a;
    return o.includes(n)
      ? ((a = o.indexOf(n) + 1), a === o.length && (a = 0), o[a])
      : ((a = e.indexOf(o[0])), e[a]);
  }
  return n;
}
ZN.getNextItemFromSearch = iye;
var QN = {},
  kv = g;
function cye(e) {
  const { key: t } = e;
  return t.length === 1 || (t.length > 1 && /[^a-zA-Z0-9]/.test(t));
}
function lye(e = {}) {
  const { timeout: t = 300, preventDefault: r = () => !0 } = e,
    [n, o] = kv.useState([]),
    a = kv.useRef(void 0),
    s = () => {
      a.current && (clearTimeout(a.current), (a.current = null));
    },
    i = () => {
      s(),
        (a.current = setTimeout(() => {
          o([]), (a.current = null);
        }, t));
    };
  kv.useEffect(() => s, []);
  function c(l) {
    return (u) => {
      if (u.key === "Backspace") {
        const d = [...n];
        d.pop(), o(d);
        return;
      }
      if (cye(u)) {
        const d = n.concat(u.key);
        r(u) && (u.preventDefault(), u.stopPropagation()),
          o(d),
          l(d.join("")),
          i();
      }
    };
  }
  return c;
}
QN.useShortcut = lye;
var eu = {},
  Vt = "top",
  gr = "bottom",
  br = "right",
  zt = "left",
  eh = "auto",
  Di = [Vt, gr, br, zt],
  Ia = "start",
  fi = "end",
  JN = "clippingParents",
  ix = "viewport",
  $s = "popper",
  eO = "reference",
  Qy = Di.reduce(function (e, t) {
    return e.concat([t + "-" + Ia, t + "-" + fi]);
  }, []),
  cx = [].concat(Di, [eh]).reduce(function (e, t) {
    return e.concat([t, t + "-" + Ia, t + "-" + fi]);
  }, []),
  tO = "beforeRead",
  rO = "read",
  nO = "afterRead",
  oO = "beforeMain",
  aO = "main",
  sO = "afterMain",
  iO = "beforeWrite",
  cO = "write",
  lO = "afterWrite",
  uO = [tO, rO, nO, oO, aO, sO, iO, cO, lO];
function Tn(e) {
  return e ? (e.nodeName || "").toLowerCase() : null;
}
function Sr(e) {
  if (e == null) return window;
  if (e.toString() !== "[object Window]") {
    var t = e.ownerDocument;
    return (t && t.defaultView) || window;
  }
  return e;
}
function Ea(e) {
  var t = Sr(e).Element;
  return e instanceof t || e instanceof Element;
}
function Fr(e) {
  var t = Sr(e).HTMLElement;
  return e instanceof t || e instanceof HTMLElement;
}
function lx(e) {
  if (typeof ShadowRoot > "u") return !1;
  var t = Sr(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function uye(e) {
  var t = e.state;
  Object.keys(t.elements).forEach(function (r) {
    var n = t.styles[r] || {},
      o = t.attributes[r] || {},
      a = t.elements[r];
    !Fr(a) ||
      !Tn(a) ||
      (Object.assign(a.style, n),
      Object.keys(o).forEach(function (s) {
        var i = o[s];
        i === !1 ? a.removeAttribute(s) : a.setAttribute(s, i === !0 ? "" : i);
      }));
  });
}
function dye(e) {
  var t = e.state,
    r = {
      popper: {
        position: t.options.strategy,
        left: "0",
        top: "0",
        margin: "0",
      },
      arrow: { position: "absolute" },
      reference: {},
    };
  return (
    Object.assign(t.elements.popper.style, r.popper),
    (t.styles = r),
    t.elements.arrow && Object.assign(t.elements.arrow.style, r.arrow),
    function () {
      Object.keys(t.elements).forEach(function (n) {
        var o = t.elements[n],
          a = t.attributes[n] || {},
          s = Object.keys(t.styles.hasOwnProperty(n) ? t.styles[n] : r[n]),
          i = s.reduce(function (c, l) {
            return (c[l] = ""), c;
          }, {});
        !Fr(o) ||
          !Tn(o) ||
          (Object.assign(o.style, i),
          Object.keys(a).forEach(function (c) {
            o.removeAttribute(c);
          }));
      });
    }
  );
}
const ux = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: uye,
  effect: dye,
  requires: ["computeStyles"],
};
function Cn(e) {
  return e.split("-")[0];
}
var Ca = Math.max,
  Af = Math.min,
  mi = Math.round;
function Jy() {
  var e = navigator.userAgentData;
  return e != null && e.brands && Array.isArray(e.brands)
    ? e.brands
        .map(function (t) {
          return t.brand + "/" + t.version;
        })
        .join(" ")
    : navigator.userAgent;
}
function dO() {
  return !/^((?!chrome|android).)*safari/i.test(Jy());
}
function hi(e, t, r) {
  t === void 0 && (t = !1), r === void 0 && (r = !1);
  var n = e.getBoundingClientRect(),
    o = 1,
    a = 1;
  t &&
    Fr(e) &&
    ((o = (e.offsetWidth > 0 && mi(n.width) / e.offsetWidth) || 1),
    (a = (e.offsetHeight > 0 && mi(n.height) / e.offsetHeight) || 1));
  var s = Ea(e) ? Sr(e) : window,
    i = s.visualViewport,
    c = !dO() && r,
    l = (n.left + (c && i ? i.offsetLeft : 0)) / o,
    u = (n.top + (c && i ? i.offsetTop : 0)) / a,
    d = n.width / o,
    f = n.height / a;
  return {
    width: d,
    height: f,
    top: u,
    right: l + d,
    bottom: u + f,
    left: l,
    x: l,
    y: u,
  };
}
function dx(e) {
  var t = hi(e),
    r = e.offsetWidth,
    n = e.offsetHeight;
  return (
    Math.abs(t.width - r) <= 1 && (r = t.width),
    Math.abs(t.height - n) <= 1 && (n = t.height),
    { x: e.offsetLeft, y: e.offsetTop, width: r, height: n }
  );
}
function fO(e, t) {
  var r = t.getRootNode && t.getRootNode();
  if (e.contains(t)) return !0;
  if (r && lx(r)) {
    var n = t;
    do {
      if (n && e.isSameNode(n)) return !0;
      n = n.parentNode || n.host;
    } while (n);
  }
  return !1;
}
function eo(e) {
  return Sr(e).getComputedStyle(e);
}
function fye(e) {
  return ["table", "td", "th"].indexOf(Tn(e)) >= 0;
}
function qo(e) {
  return ((Ea(e) ? e.ownerDocument : e.document) || window.document)
    .documentElement;
}
function th(e) {
  return Tn(e) === "html"
    ? e
    : e.assignedSlot || e.parentNode || (lx(e) ? e.host : null) || qo(e);
}
function Pk(e) {
  return !Fr(e) || eo(e).position === "fixed" ? null : e.offsetParent;
}
function mye(e) {
  var t = /firefox/i.test(Jy()),
    r = /Trident/i.test(Jy());
  if (r && Fr(e)) {
    var n = eo(e);
    if (n.position === "fixed") return null;
  }
  var o = th(e);
  for (lx(o) && (o = o.host); Fr(o) && ["html", "body"].indexOf(Tn(o)) < 0; ) {
    var a = eo(o);
    if (
      a.transform !== "none" ||
      a.perspective !== "none" ||
      a.contain === "paint" ||
      ["transform", "perspective"].indexOf(a.willChange) !== -1 ||
      (t && a.willChange === "filter") ||
      (t && a.filter && a.filter !== "none")
    )
      return o;
    o = o.parentNode;
  }
  return null;
}
function tu(e) {
  for (var t = Sr(e), r = Pk(e); r && fye(r) && eo(r).position === "static"; )
    r = Pk(r);
  return r &&
    (Tn(r) === "html" || (Tn(r) === "body" && eo(r).position === "static"))
    ? t
    : r || mye(e) || t;
}
function fx(e) {
  return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
function Xc(e, t, r) {
  return Ca(e, Af(t, r));
}
function hye(e, t, r) {
  var n = Xc(e, t, r);
  return n > r ? r : n;
}
function mO() {
  return { top: 0, right: 0, bottom: 0, left: 0 };
}
function hO(e) {
  return Object.assign({}, mO(), e);
}
function pO(e, t) {
  return t.reduce(function (r, n) {
    return (r[n] = e), r;
  }, {});
}
var pye = function (t, r) {
  return (
    (t =
      typeof t == "function"
        ? t(Object.assign({}, r.rects, { placement: r.placement }))
        : t),
    hO(typeof t != "number" ? t : pO(t, Di))
  );
};
function vye(e) {
  var t,
    r = e.state,
    n = e.name,
    o = e.options,
    a = r.elements.arrow,
    s = r.modifiersData.popperOffsets,
    i = Cn(r.placement),
    c = fx(i),
    l = [zt, br].indexOf(i) >= 0,
    u = l ? "height" : "width";
  if (!(!a || !s)) {
    var d = pye(o.padding, r),
      f = dx(a),
      m = c === "y" ? Vt : zt,
      h = c === "y" ? gr : br,
      p =
        r.rects.reference[u] + r.rects.reference[c] - s[c] - r.rects.popper[u],
      v = s[c] - r.rects.reference[c],
      b = tu(a),
      y = b ? (c === "y" ? b.clientHeight || 0 : b.clientWidth || 0) : 0,
      S = p / 2 - v / 2,
      w = d[m],
      C = y - f[u] - d[h],
      T = y / 2 - f[u] / 2 + S,
      k = Xc(w, T, C),
      R = c;
    r.modifiersData[n] = ((t = {}), (t[R] = k), (t.centerOffset = k - T), t);
  }
}
function yye(e) {
  var t = e.state,
    r = e.options,
    n = r.element,
    o = n === void 0 ? "[data-popper-arrow]" : n;
  o != null &&
    ((typeof o == "string" && ((o = t.elements.popper.querySelector(o)), !o)) ||
      (fO(t.elements.popper, o) && (t.elements.arrow = o)));
}
const vO = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: vye,
  effect: yye,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"],
};
function pi(e) {
  return e.split("-")[1];
}
var gye = { top: "auto", right: "auto", bottom: "auto", left: "auto" };
function bye(e, t) {
  var r = e.x,
    n = e.y,
    o = t.devicePixelRatio || 1;
  return { x: mi(r * o) / o || 0, y: mi(n * o) / o || 0 };
}
function Rk(e) {
  var t,
    r = e.popper,
    n = e.popperRect,
    o = e.placement,
    a = e.variation,
    s = e.offsets,
    i = e.position,
    c = e.gpuAcceleration,
    l = e.adaptive,
    u = e.roundOffsets,
    d = e.isFixed,
    f = s.x,
    m = f === void 0 ? 0 : f,
    h = s.y,
    p = h === void 0 ? 0 : h,
    v = typeof u == "function" ? u({ x: m, y: p }) : { x: m, y: p };
  (m = v.x), (p = v.y);
  var b = s.hasOwnProperty("x"),
    y = s.hasOwnProperty("y"),
    S = zt,
    w = Vt,
    C = window;
  if (l) {
    var T = tu(r),
      k = "clientHeight",
      R = "clientWidth";
    if (
      (T === Sr(r) &&
        ((T = qo(r)),
        eo(T).position !== "static" &&
          i === "absolute" &&
          ((k = "scrollHeight"), (R = "scrollWidth"))),
      (T = T),
      o === Vt || ((o === zt || o === br) && a === fi))
    ) {
      w = gr;
      var E = d && T === C && C.visualViewport ? C.visualViewport.height : T[k];
      (p -= E - n.height), (p *= c ? 1 : -1);
    }
    if (o === zt || ((o === Vt || o === gr) && a === fi)) {
      S = br;
      var _ = d && T === C && C.visualViewport ? C.visualViewport.width : T[R];
      (m -= _ - n.width), (m *= c ? 1 : -1);
    }
  }
  var N = Object.assign({ position: i }, l && gye),
    G = u === !0 ? bye({ x: m, y: p }, Sr(r)) : { x: m, y: p };
  if (((m = G.x), (p = G.y), c)) {
    var B;
    return Object.assign(
      {},
      N,
      ((B = {}),
      (B[w] = y ? "0" : ""),
      (B[S] = b ? "0" : ""),
      (B.transform =
        (C.devicePixelRatio || 1) <= 1
          ? "translate(" + m + "px, " + p + "px)"
          : "translate3d(" + m + "px, " + p + "px, 0)"),
      B)
    );
  }
  return Object.assign(
    {},
    N,
    ((t = {}),
    (t[w] = y ? p + "px" : ""),
    (t[S] = b ? m + "px" : ""),
    (t.transform = ""),
    t)
  );
}
function Sye(e) {
  var t = e.state,
    r = e.options,
    n = r.gpuAcceleration,
    o = n === void 0 ? !0 : n,
    a = r.adaptive,
    s = a === void 0 ? !0 : a,
    i = r.roundOffsets,
    c = i === void 0 ? !0 : i,
    l = {
      placement: Cn(t.placement),
      variation: pi(t.placement),
      popper: t.elements.popper,
      popperRect: t.rects.popper,
      gpuAcceleration: o,
      isFixed: t.options.strategy === "fixed",
    };
  t.modifiersData.popperOffsets != null &&
    (t.styles.popper = Object.assign(
      {},
      t.styles.popper,
      Rk(
        Object.assign({}, l, {
          offsets: t.modifiersData.popperOffsets,
          position: t.options.strategy,
          adaptive: s,
          roundOffsets: c,
        })
      )
    )),
    t.modifiersData.arrow != null &&
      (t.styles.arrow = Object.assign(
        {},
        t.styles.arrow,
        Rk(
          Object.assign({}, l, {
            offsets: t.modifiersData.arrow,
            position: "absolute",
            adaptive: !1,
            roundOffsets: c,
          })
        )
      )),
    (t.attributes.popper = Object.assign({}, t.attributes.popper, {
      "data-popper-placement": t.placement,
    }));
}
const mx = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: Sye,
  data: {},
};
var ld = { passive: !0 };
function xye(e) {
  var t = e.state,
    r = e.instance,
    n = e.options,
    o = n.scroll,
    a = o === void 0 ? !0 : o,
    s = n.resize,
    i = s === void 0 ? !0 : s,
    c = Sr(t.elements.popper),
    l = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return (
    a &&
      l.forEach(function (u) {
        u.addEventListener("scroll", r.update, ld);
      }),
    i && c.addEventListener("resize", r.update, ld),
    function () {
      a &&
        l.forEach(function (u) {
          u.removeEventListener("scroll", r.update, ld);
        }),
        i && c.removeEventListener("resize", r.update, ld);
    }
  );
}
const hx = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function () {},
  effect: xye,
  data: {},
};
var $ye = { left: "right", right: "left", bottom: "top", top: "bottom" };
function Zd(e) {
  return e.replace(/left|right|bottom|top/g, function (t) {
    return $ye[t];
  });
}
var wye = { start: "end", end: "start" };
function Ak(e) {
  return e.replace(/start|end/g, function (t) {
    return wye[t];
  });
}
function px(e) {
  var t = Sr(e),
    r = t.pageXOffset,
    n = t.pageYOffset;
  return { scrollLeft: r, scrollTop: n };
}
function vx(e) {
  return hi(qo(e)).left + px(e).scrollLeft;
}
function Cye(e, t) {
  var r = Sr(e),
    n = qo(e),
    o = r.visualViewport,
    a = n.clientWidth,
    s = n.clientHeight,
    i = 0,
    c = 0;
  if (o) {
    (a = o.width), (s = o.height);
    var l = dO();
    (l || (!l && t === "fixed")) && ((i = o.offsetLeft), (c = o.offsetTop));
  }
  return { width: a, height: s, x: i + vx(e), y: c };
}
function kye(e) {
  var t,
    r = qo(e),
    n = px(e),
    o = (t = e.ownerDocument) == null ? void 0 : t.body,
    a = Ca(
      r.scrollWidth,
      r.clientWidth,
      o ? o.scrollWidth : 0,
      o ? o.clientWidth : 0
    ),
    s = Ca(
      r.scrollHeight,
      r.clientHeight,
      o ? o.scrollHeight : 0,
      o ? o.clientHeight : 0
    ),
    i = -n.scrollLeft + vx(e),
    c = -n.scrollTop;
  return (
    eo(o || r).direction === "rtl" &&
      (i += Ca(r.clientWidth, o ? o.clientWidth : 0) - a),
    { width: a, height: s, x: i, y: c }
  );
}
function yx(e) {
  var t = eo(e),
    r = t.overflow,
    n = t.overflowX,
    o = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(r + o + n);
}
function yO(e) {
  return ["html", "body", "#document"].indexOf(Tn(e)) >= 0
    ? e.ownerDocument.body
    : Fr(e) && yx(e)
    ? e
    : yO(th(e));
}
function Yc(e, t) {
  var r;
  t === void 0 && (t = []);
  var n = yO(e),
    o = n === ((r = e.ownerDocument) == null ? void 0 : r.body),
    a = Sr(n),
    s = o ? [a].concat(a.visualViewport || [], yx(n) ? n : []) : n,
    i = t.concat(s);
  return o ? i : i.concat(Yc(th(s)));
}
function eg(e) {
  return Object.assign({}, e, {
    left: e.x,
    top: e.y,
    right: e.x + e.width,
    bottom: e.y + e.height,
  });
}
function Tye(e, t) {
  var r = hi(e, !1, t === "fixed");
  return (
    (r.top = r.top + e.clientTop),
    (r.left = r.left + e.clientLeft),
    (r.bottom = r.top + e.clientHeight),
    (r.right = r.left + e.clientWidth),
    (r.width = e.clientWidth),
    (r.height = e.clientHeight),
    (r.x = r.left),
    (r.y = r.top),
    r
  );
}
function _k(e, t, r) {
  return t === ix ? eg(Cye(e, r)) : Ea(t) ? Tye(t, r) : eg(kye(qo(e)));
}
function Pye(e) {
  var t = Yc(th(e)),
    r = ["absolute", "fixed"].indexOf(eo(e).position) >= 0,
    n = r && Fr(e) ? tu(e) : e;
  return Ea(n)
    ? t.filter(function (o) {
        return Ea(o) && fO(o, n) && Tn(o) !== "body";
      })
    : [];
}
function Rye(e, t, r, n) {
  var o = t === "clippingParents" ? Pye(e) : [].concat(t),
    a = [].concat(o, [r]),
    s = a[0],
    i = a.reduce(function (c, l) {
      var u = _k(e, l, n);
      return (
        (c.top = Ca(u.top, c.top)),
        (c.right = Af(u.right, c.right)),
        (c.bottom = Af(u.bottom, c.bottom)),
        (c.left = Ca(u.left, c.left)),
        c
      );
    }, _k(e, s, n));
  return (
    (i.width = i.right - i.left),
    (i.height = i.bottom - i.top),
    (i.x = i.left),
    (i.y = i.top),
    i
  );
}
function gO(e) {
  var t = e.reference,
    r = e.element,
    n = e.placement,
    o = n ? Cn(n) : null,
    a = n ? pi(n) : null,
    s = t.x + t.width / 2 - r.width / 2,
    i = t.y + t.height / 2 - r.height / 2,
    c;
  switch (o) {
    case Vt:
      c = { x: s, y: t.y - r.height };
      break;
    case gr:
      c = { x: s, y: t.y + t.height };
      break;
    case br:
      c = { x: t.x + t.width, y: i };
      break;
    case zt:
      c = { x: t.x - r.width, y: i };
      break;
    default:
      c = { x: t.x, y: t.y };
  }
  var l = o ? fx(o) : null;
  if (l != null) {
    var u = l === "y" ? "height" : "width";
    switch (a) {
      case Ia:
        c[l] = c[l] - (t[u] / 2 - r[u] / 2);
        break;
      case fi:
        c[l] = c[l] + (t[u] / 2 - r[u] / 2);
        break;
    }
  }
  return c;
}
function vi(e, t) {
  t === void 0 && (t = {});
  var r = t,
    n = r.placement,
    o = n === void 0 ? e.placement : n,
    a = r.strategy,
    s = a === void 0 ? e.strategy : a,
    i = r.boundary,
    c = i === void 0 ? JN : i,
    l = r.rootBoundary,
    u = l === void 0 ? ix : l,
    d = r.elementContext,
    f = d === void 0 ? $s : d,
    m = r.altBoundary,
    h = m === void 0 ? !1 : m,
    p = r.padding,
    v = p === void 0 ? 0 : p,
    b = hO(typeof v != "number" ? v : pO(v, Di)),
    y = f === $s ? eO : $s,
    S = e.rects.popper,
    w = e.elements[h ? y : f],
    C = Rye(Ea(w) ? w : w.contextElement || qo(e.elements.popper), c, u, s),
    T = hi(e.elements.reference),
    k = gO({ reference: T, element: S, strategy: "absolute", placement: o }),
    R = eg(Object.assign({}, S, k)),
    E = f === $s ? R : T,
    _ = {
      top: C.top - E.top + b.top,
      bottom: E.bottom - C.bottom + b.bottom,
      left: C.left - E.left + b.left,
      right: E.right - C.right + b.right,
    },
    N = e.modifiersData.offset;
  if (f === $s && N) {
    var G = N[o];
    Object.keys(_).forEach(function (B) {
      var z = [br, gr].indexOf(B) >= 0 ? 1 : -1,
        Y = [Vt, gr].indexOf(B) >= 0 ? "y" : "x";
      _[B] += G[Y] * z;
    });
  }
  return _;
}
function Aye(e, t) {
  t === void 0 && (t = {});
  var r = t,
    n = r.placement,
    o = r.boundary,
    a = r.rootBoundary,
    s = r.padding,
    i = r.flipVariations,
    c = r.allowedAutoPlacements,
    l = c === void 0 ? cx : c,
    u = pi(n),
    d = u
      ? i
        ? Qy
        : Qy.filter(function (h) {
            return pi(h) === u;
          })
      : Di,
    f = d.filter(function (h) {
      return l.indexOf(h) >= 0;
    });
  f.length === 0 && (f = d);
  var m = f.reduce(function (h, p) {
    return (
      (h[p] = vi(e, { placement: p, boundary: o, rootBoundary: a, padding: s })[
        Cn(p)
      ]),
      h
    );
  }, {});
  return Object.keys(m).sort(function (h, p) {
    return m[h] - m[p];
  });
}
function _ye(e) {
  if (Cn(e) === eh) return [];
  var t = Zd(e);
  return [Ak(e), t, Ak(t)];
}
function Iye(e) {
  var t = e.state,
    r = e.options,
    n = e.name;
  if (!t.modifiersData[n]._skip) {
    for (
      var o = r.mainAxis,
        a = o === void 0 ? !0 : o,
        s = r.altAxis,
        i = s === void 0 ? !0 : s,
        c = r.fallbackPlacements,
        l = r.padding,
        u = r.boundary,
        d = r.rootBoundary,
        f = r.altBoundary,
        m = r.flipVariations,
        h = m === void 0 ? !0 : m,
        p = r.allowedAutoPlacements,
        v = t.options.placement,
        b = Cn(v),
        y = b === v,
        S = c || (y || !h ? [Zd(v)] : _ye(v)),
        w = [v].concat(S).reduce(function (V, ee) {
          return V.concat(
            Cn(ee) === eh
              ? Aye(t, {
                  placement: ee,
                  boundary: u,
                  rootBoundary: d,
                  padding: l,
                  flipVariations: h,
                  allowedAutoPlacements: p,
                })
              : ee
          );
        }, []),
        C = t.rects.reference,
        T = t.rects.popper,
        k = new Map(),
        R = !0,
        E = w[0],
        _ = 0;
      _ < w.length;
      _++
    ) {
      var N = w[_],
        G = Cn(N),
        B = pi(N) === Ia,
        z = [Vt, gr].indexOf(G) >= 0,
        Y = z ? "width" : "height",
        W = vi(t, {
          placement: N,
          boundary: u,
          rootBoundary: d,
          altBoundary: f,
          padding: l,
        }),
        j = z ? (B ? br : zt) : B ? gr : Vt;
      C[Y] > T[Y] && (j = Zd(j));
      var O = Zd(j),
        K = [];
      if (
        (a && K.push(W[G] <= 0),
        i && K.push(W[j] <= 0, W[O] <= 0),
        K.every(function (V) {
          return V;
        }))
      ) {
        (E = N), (R = !1);
        break;
      }
      k.set(N, K);
    }
    if (R)
      for (
        var ve = h ? 3 : 1,
          re = function (ee) {
            var pe = w.find(function (xe) {
              var Ce = k.get(xe);
              if (Ce)
                return Ce.slice(0, ee).every(function (X) {
                  return X;
                });
            });
            if (pe) return (E = pe), "break";
          },
          ue = ve;
        ue > 0;
        ue--
      ) {
        var L = re(ue);
        if (L === "break") break;
      }
    t.placement !== E &&
      ((t.modifiersData[n]._skip = !0), (t.placement = E), (t.reset = !0));
  }
}
const bO = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: Iye,
  requiresIfExists: ["offset"],
  data: { _skip: !1 },
};
function Ik(e, t, r) {
  return (
    r === void 0 && (r = { x: 0, y: 0 }),
    {
      top: e.top - t.height - r.y,
      right: e.right - t.width + r.x,
      bottom: e.bottom - t.height + r.y,
      left: e.left - t.width - r.x,
    }
  );
}
function Ek(e) {
  return [Vt, br, gr, zt].some(function (t) {
    return e[t] >= 0;
  });
}
function Eye(e) {
  var t = e.state,
    r = e.name,
    n = t.rects.reference,
    o = t.rects.popper,
    a = t.modifiersData.preventOverflow,
    s = vi(t, { elementContext: "reference" }),
    i = vi(t, { altBoundary: !0 }),
    c = Ik(s, n),
    l = Ik(i, o, a),
    u = Ek(c),
    d = Ek(l);
  (t.modifiersData[r] = {
    referenceClippingOffsets: c,
    popperEscapeOffsets: l,
    isReferenceHidden: u,
    hasPopperEscaped: d,
  }),
    (t.attributes.popper = Object.assign({}, t.attributes.popper, {
      "data-popper-reference-hidden": u,
      "data-popper-escaped": d,
    }));
}
const SO = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: Eye,
};
function Mye(e, t, r) {
  var n = Cn(e),
    o = [zt, Vt].indexOf(n) >= 0 ? -1 : 1,
    a = typeof r == "function" ? r(Object.assign({}, t, { placement: e })) : r,
    s = a[0],
    i = a[1];
  return (
    (s = s || 0),
    (i = (i || 0) * o),
    [zt, br].indexOf(n) >= 0 ? { x: i, y: s } : { x: s, y: i }
  );
}
function Fye(e) {
  var t = e.state,
    r = e.options,
    n = e.name,
    o = r.offset,
    a = o === void 0 ? [0, 0] : o,
    s = cx.reduce(function (u, d) {
      return (u[d] = Mye(d, t.rects, a)), u;
    }, {}),
    i = s[t.placement],
    c = i.x,
    l = i.y;
  t.modifiersData.popperOffsets != null &&
    ((t.modifiersData.popperOffsets.x += c),
    (t.modifiersData.popperOffsets.y += l)),
    (t.modifiersData[n] = s);
}
const xO = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: Fye,
};
function jye(e) {
  var t = e.state,
    r = e.name;
  t.modifiersData[r] = gO({
    reference: t.rects.reference,
    element: t.rects.popper,
    strategy: "absolute",
    placement: t.placement,
  });
}
const gx = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: jye,
  data: {},
};
function Dye(e) {
  return e === "x" ? "y" : "x";
}
function Nye(e) {
  var t = e.state,
    r = e.options,
    n = e.name,
    o = r.mainAxis,
    a = o === void 0 ? !0 : o,
    s = r.altAxis,
    i = s === void 0 ? !1 : s,
    c = r.boundary,
    l = r.rootBoundary,
    u = r.altBoundary,
    d = r.padding,
    f = r.tether,
    m = f === void 0 ? !0 : f,
    h = r.tetherOffset,
    p = h === void 0 ? 0 : h,
    v = vi(t, { boundary: c, rootBoundary: l, padding: d, altBoundary: u }),
    b = Cn(t.placement),
    y = pi(t.placement),
    S = !y,
    w = fx(b),
    C = Dye(w),
    T = t.modifiersData.popperOffsets,
    k = t.rects.reference,
    R = t.rects.popper,
    E =
      typeof p == "function"
        ? p(Object.assign({}, t.rects, { placement: t.placement }))
        : p,
    _ =
      typeof E == "number"
        ? { mainAxis: E, altAxis: E }
        : Object.assign({ mainAxis: 0, altAxis: 0 }, E),
    N = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null,
    G = { x: 0, y: 0 };
  if (T) {
    if (a) {
      var B,
        z = w === "y" ? Vt : zt,
        Y = w === "y" ? gr : br,
        W = w === "y" ? "height" : "width",
        j = T[w],
        O = j + v[z],
        K = j - v[Y],
        ve = m ? -R[W] / 2 : 0,
        re = y === Ia ? k[W] : R[W],
        ue = y === Ia ? -R[W] : -k[W],
        L = t.elements.arrow,
        V = m && L ? dx(L) : { width: 0, height: 0 },
        ee = t.modifiersData["arrow#persistent"]
          ? t.modifiersData["arrow#persistent"].padding
          : mO(),
        pe = ee[z],
        xe = ee[Y],
        Ce = Xc(0, k[W], V[W]),
        X = S
          ? k[W] / 2 - ve - Ce - pe - _.mainAxis
          : re - Ce - pe - _.mainAxis,
        de = S
          ? -k[W] / 2 + ve + Ce + xe + _.mainAxis
          : ue + Ce + xe + _.mainAxis,
        Q = t.elements.arrow && tu(t.elements.arrow),
        J = Q ? (w === "y" ? Q.clientTop || 0 : Q.clientLeft || 0) : 0,
        ne = (B = N == null ? void 0 : N[w]) != null ? B : 0,
        we = j + X - ne - J,
        ae = j + de - ne,
        ye = Xc(m ? Af(O, we) : O, j, m ? Ca(K, ae) : K);
      (T[w] = ye), (G[w] = ye - j);
    }
    if (i) {
      var U,
        be = w === "x" ? Vt : zt,
        ge = w === "x" ? gr : br,
        Te = T[C],
        He = C === "y" ? "height" : "width",
        Ue = Te + v[be],
        Ze = Te - v[ge],
        wt = [Vt, zt].indexOf(b) !== -1,
        nr = (U = N == null ? void 0 : N[C]) != null ? U : 0,
        or = wt ? Ue : Te - k[He] - R[He] - nr + _.altAxis,
        wr = wt ? Te + k[He] + R[He] - nr - _.altAxis : Ze,
        H = m && wt ? hye(or, Te, wr) : Xc(m ? or : Ue, Te, m ? wr : Ze);
      (T[C] = H), (G[C] = H - Te);
    }
    t.modifiersData[n] = G;
  }
}
const $O = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: Nye,
  requiresIfExists: ["offset"],
};
function Oye(e) {
  return { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop };
}
function Bye(e) {
  return e === Sr(e) || !Fr(e) ? px(e) : Oye(e);
}
function Lye(e) {
  var t = e.getBoundingClientRect(),
    r = mi(t.width) / e.offsetWidth || 1,
    n = mi(t.height) / e.offsetHeight || 1;
  return r !== 1 || n !== 1;
}
function Vye(e, t, r) {
  r === void 0 && (r = !1);
  var n = Fr(t),
    o = Fr(t) && Lye(t),
    a = qo(t),
    s = hi(e, o, r),
    i = { scrollLeft: 0, scrollTop: 0 },
    c = { x: 0, y: 0 };
  return (
    (n || (!n && !r)) &&
      ((Tn(t) !== "body" || yx(a)) && (i = Bye(t)),
      Fr(t)
        ? ((c = hi(t, !0)), (c.x += t.clientLeft), (c.y += t.clientTop))
        : a && (c.x = vx(a))),
    {
      x: s.left + i.scrollLeft - c.x,
      y: s.top + i.scrollTop - c.y,
      width: s.width,
      height: s.height,
    }
  );
}
function zye(e) {
  var t = new Map(),
    r = new Set(),
    n = [];
  e.forEach(function (a) {
    t.set(a.name, a);
  });
  function o(a) {
    r.add(a.name);
    var s = [].concat(a.requires || [], a.requiresIfExists || []);
    s.forEach(function (i) {
      if (!r.has(i)) {
        var c = t.get(i);
        c && o(c);
      }
    }),
      n.push(a);
  }
  return (
    e.forEach(function (a) {
      r.has(a.name) || o(a);
    }),
    n
  );
}
function Hye(e) {
  var t = zye(e);
  return uO.reduce(function (r, n) {
    return r.concat(
      t.filter(function (o) {
        return o.phase === n;
      })
    );
  }, []);
}
function Wye(e) {
  var t;
  return function () {
    return (
      t ||
        (t = new Promise(function (r) {
          Promise.resolve().then(function () {
            (t = void 0), r(e());
          });
        })),
      t
    );
  };
}
function Gye(e) {
  var t = e.reduce(function (r, n) {
    var o = r[n.name];
    return (
      (r[n.name] = o
        ? Object.assign({}, o, n, {
            options: Object.assign({}, o.options, n.options),
            data: Object.assign({}, o.data, n.data),
          })
        : n),
      r
    );
  }, {});
  return Object.keys(t).map(function (r) {
    return t[r];
  });
}
var Mk = { placement: "bottom", modifiers: [], strategy: "absolute" };
function Fk() {
  for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
    t[r] = arguments[r];
  return !t.some(function (n) {
    return !(n && typeof n.getBoundingClientRect == "function");
  });
}
function rh(e) {
  e === void 0 && (e = {});
  var t = e,
    r = t.defaultModifiers,
    n = r === void 0 ? [] : r,
    o = t.defaultOptions,
    a = o === void 0 ? Mk : o;
  return function (i, c, l) {
    l === void 0 && (l = a);
    var u = {
        placement: "bottom",
        orderedModifiers: [],
        options: Object.assign({}, Mk, a),
        modifiersData: {},
        elements: { reference: i, popper: c },
        attributes: {},
        styles: {},
      },
      d = [],
      f = !1,
      m = {
        state: u,
        setOptions: function (b) {
          var y = typeof b == "function" ? b(u.options) : b;
          p(),
            (u.options = Object.assign({}, a, u.options, y)),
            (u.scrollParents = {
              reference: Ea(i)
                ? Yc(i)
                : i.contextElement
                ? Yc(i.contextElement)
                : [],
              popper: Yc(c),
            });
          var S = Hye(Gye([].concat(n, u.options.modifiers)));
          return (
            (u.orderedModifiers = S.filter(function (w) {
              return w.enabled;
            })),
            h(),
            m.update()
          );
        },
        forceUpdate: function () {
          if (!f) {
            var b = u.elements,
              y = b.reference,
              S = b.popper;
            if (Fk(y, S)) {
              (u.rects = {
                reference: Vye(y, tu(S), u.options.strategy === "fixed"),
                popper: dx(S),
              }),
                (u.reset = !1),
                (u.placement = u.options.placement),
                u.orderedModifiers.forEach(function (_) {
                  return (u.modifiersData[_.name] = Object.assign({}, _.data));
                });
              for (var w = 0; w < u.orderedModifiers.length; w++) {
                if (u.reset === !0) {
                  (u.reset = !1), (w = -1);
                  continue;
                }
                var C = u.orderedModifiers[w],
                  T = C.fn,
                  k = C.options,
                  R = k === void 0 ? {} : k,
                  E = C.name;
                typeof T == "function" &&
                  (u = T({ state: u, options: R, name: E, instance: m }) || u);
              }
            }
          }
        },
        update: Wye(function () {
          return new Promise(function (v) {
            m.forceUpdate(), v(u);
          });
        }),
        destroy: function () {
          p(), (f = !0);
        },
      };
    if (!Fk(i, c)) return m;
    m.setOptions(l).then(function (v) {
      !f && l.onFirstUpdate && l.onFirstUpdate(v);
    });
    function h() {
      u.orderedModifiers.forEach(function (v) {
        var b = v.name,
          y = v.options,
          S = y === void 0 ? {} : y,
          w = v.effect;
        if (typeof w == "function") {
          var C = w({ state: u, name: b, instance: m, options: S }),
            T = function () {};
          d.push(C || T);
        }
      });
    }
    function p() {
      d.forEach(function (v) {
        return v();
      }),
        (d = []);
    }
    return m;
  };
}
var Uye = rh(),
  Kye = [hx, gx, mx, ux],
  qye = rh({ defaultModifiers: Kye }),
  Xye = [hx, gx, mx, ux, xO, bO, $O, vO, SO],
  Yye = rh({ defaultModifiers: Xye });
const Zye = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        afterMain: sO,
        afterRead: nO,
        afterWrite: lO,
        applyStyles: ux,
        arrow: vO,
        auto: eh,
        basePlacements: Di,
        beforeMain: oO,
        beforeRead: tO,
        beforeWrite: iO,
        bottom: gr,
        clippingParents: JN,
        computeStyles: mx,
        createPopper: Yye,
        createPopperBase: Uye,
        createPopperLite: qye,
        detectOverflow: vi,
        end: fi,
        eventListeners: hx,
        flip: bO,
        hide: SO,
        left: zt,
        main: aO,
        modifierPhases: uO,
        offset: xO,
        placements: cx,
        popper: $s,
        popperGenerator: rh,
        popperOffsets: gx,
        preventOverflow: $O,
        read: rO,
        reference: eO,
        right: br,
        start: Ia,
        top: Vt,
        variationPlacements: Qy,
        viewport: ix,
        write: cO,
      },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  Qye = Fa(Zye);
var ru = {},
  Mn = {};
const us = (e, t) => ({ var: e, varRef: t ? `var(${e}, ${t})` : `var(${e})` }),
  Jye = {
    arrowShadowColor: us("--popper-arrow-shadow-color"),
    arrowSize: us("--popper-arrow-size", "8px"),
    arrowSizeHalf: us("--popper-arrow-size-half"),
    arrowBg: us("--popper-arrow-bg"),
    transformOrigin: us("--popper-transform-origin"),
    arrowOffset: us("--popper-arrow-offset"),
  };
function ege(e) {
  if (e.includes("top"))
    return "1px 1px 0px 0 var(--popper-arrow-shadow-color)";
  if (e.includes("bottom"))
    return "-1px -1px 0px 0 var(--popper-arrow-shadow-color)";
  if (e.includes("right"))
    return "-1px 1px 0px 0 var(--popper-arrow-shadow-color)";
  if (e.includes("left"))
    return "1px -1px 0px 0 var(--popper-arrow-shadow-color)";
}
const tge = {
    top: "bottom center",
    "top-start": "bottom left",
    "top-end": "bottom right",
    bottom: "top center",
    "bottom-start": "top left",
    "bottom-end": "top right",
    left: "right center",
    "left-start": "right top",
    "left-end": "right bottom",
    right: "left center",
    "right-start": "left top",
    "right-end": "left bottom",
  },
  rge = (e) => tge[e],
  jk = { scroll: !0, resize: !0 };
function nge(e) {
  let t;
  return (
    typeof e == "object"
      ? (t = { enabled: !0, options: { ...jk, ...e } })
      : (t = { enabled: e, options: jk }),
    t
  );
}
Mn.cssVars = Jye;
Mn.getBoxShadow = ege;
Mn.getEventListenerOptions = nge;
Mn.toTransformOrigin = rge;
var Yt = Mn;
const oge = {
    name: "matchWidth",
    enabled: !0,
    phase: "beforeWrite",
    requires: ["computeStyles"],
    fn: ({ state: e }) => {
      e.styles.popper.width = `${e.rects.reference.width}px`;
    },
    effect:
      ({ state: e }) =>
      () => {
        const t = e.elements.reference;
        e.elements.popper.style.width = `${t.offsetWidth}px`;
      },
  },
  age = {
    name: "transformOrigin",
    enabled: !0,
    phase: "write",
    fn: ({ state: e }) => {
      Dk(e);
    },
    effect:
      ({ state: e }) =>
      () => {
        Dk(e);
      },
  },
  Dk = (e) => {
    e.elements.popper.style.setProperty(
      Yt.cssVars.transformOrigin.var,
      Yt.toTransformOrigin(e.placement)
    );
  },
  sge = {
    name: "positionArrow",
    enabled: !0,
    phase: "afterWrite",
    fn: ({ state: e }) => {
      ige(e);
    },
  },
  ige = (e) => {
    var r;
    if (!e.placement) return;
    const t = cge(e.placement);
    if ((r = e.elements) != null && r.arrow && t) {
      Object.assign(e.elements.arrow.style, {
        [t.property]: t.value,
        width: Yt.cssVars.arrowSize.varRef,
        height: Yt.cssVars.arrowSize.varRef,
        zIndex: -1,
      });
      const n = {
        [Yt.cssVars.arrowSizeHalf
          .var]: `calc(${Yt.cssVars.arrowSize.varRef} / 2 - 1px)`,
        [Yt.cssVars.arrowOffset
          .var]: `calc(${Yt.cssVars.arrowSizeHalf.varRef} * -1)`,
      };
      for (const o in n) e.elements.arrow.style.setProperty(o, n[o]);
    }
  },
  cge = (e) => {
    if (e.startsWith("top"))
      return { property: "bottom", value: Yt.cssVars.arrowOffset.varRef };
    if (e.startsWith("bottom"))
      return { property: "top", value: Yt.cssVars.arrowOffset.varRef };
    if (e.startsWith("left"))
      return { property: "right", value: Yt.cssVars.arrowOffset.varRef };
    if (e.startsWith("right"))
      return { property: "left", value: Yt.cssVars.arrowOffset.varRef };
  },
  lge = {
    name: "innerArrow",
    enabled: !0,
    phase: "main",
    requires: ["arrow"],
    fn: ({ state: e }) => {
      Nk(e);
    },
    effect:
      ({ state: e }) =>
      () => {
        Nk(e);
      },
  },
  Nk = (e) => {
    if (!e.elements.arrow) return;
    const t = e.elements.arrow.querySelector("[data-popper-arrow-inner]");
    if (!t) return;
    const r = Yt.getBoxShadow(e.placement);
    r && t.style.setProperty("--popper-arrow-default-shadow", r),
      Object.assign(t.style, {
        transform: "rotate(45deg)",
        background: Yt.cssVars.arrowBg.varRef,
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        position: "absolute",
        zIndex: "inherit",
        boxShadow:
          "var(--popper-arrow-shadow, var(--popper-arrow-default-shadow))",
      });
  };
ru.innerArrow = lge;
ru.matchWidth = oge;
ru.positionArrow = sge;
ru.transformOrigin = age;
var wO = {};
const uge = {
    "start-start": { ltr: "left-start", rtl: "right-start" },
    "start-end": { ltr: "left-end", rtl: "right-end" },
    "end-start": { ltr: "right-start", rtl: "left-start" },
    "end-end": { ltr: "right-end", rtl: "left-end" },
    start: { ltr: "left", rtl: "right" },
    end: { ltr: "right", rtl: "left" },
  },
  dge = {
    "auto-start": "auto-end",
    "auto-end": "auto-start",
    "top-start": "top-end",
    "top-end": "top-start",
    "bottom-start": "bottom-end",
    "bottom-end": "bottom-start",
  };
function fge(e, t = "ltr") {
  var n;
  const r = ((n = uge[e]) == null ? void 0 : n[t]) || e;
  return t === "ltr" ? r : dge[e] ?? r;
}
wO.getPopperPlacement = fge;
var Ok = le,
  mge = Qye,
  Tr = g,
  ud = ru,
  hge = wO,
  Bk = Mn;
function pge(e = {}) {
  const {
      enabled: t = !0,
      modifiers: r,
      placement: n = "bottom",
      strategy: o = "absolute",
      arrowPadding: a = 8,
      eventListeners: s = !0,
      offset: i,
      gutter: c = 8,
      flip: l = !0,
      boundary: u = "clippingParents",
      preventOverflow: d = !0,
      matchWidth: f,
      direction: m = "ltr",
    } = e,
    h = Tr.useRef(null),
    p = Tr.useRef(null),
    v = Tr.useRef(null),
    b = hge.getPopperPlacement(n, m),
    y = Tr.useRef(() => {}),
    S = Tr.useCallback(() => {
      var _;
      !t ||
        !h.current ||
        !p.current ||
        ((_ = y.current) == null || _.call(y),
        (v.current = mge.createPopper(h.current, p.current, {
          placement: b,
          modifiers: [
            ud.innerArrow,
            ud.positionArrow,
            ud.transformOrigin,
            { ...ud.matchWidth, enabled: !!f },
            { name: "eventListeners", ...Bk.getEventListenerOptions(s) },
            { name: "arrow", options: { padding: a } },
            { name: "offset", options: { offset: i ?? [0, c] } },
            { name: "flip", enabled: !!l, options: { padding: 8 } },
            { name: "preventOverflow", enabled: !!d, options: { boundary: u } },
            ...(r ?? []),
          ],
          strategy: o,
        })),
        v.current.forceUpdate(),
        (y.current = v.current.destroy));
    }, [b, t, r, f, s, a, i, c, l, d, u, o]);
  Tr.useEffect(
    () => () => {
      var _;
      !h.current &&
        !p.current &&
        ((_ = v.current) == null || _.destroy(), (v.current = null));
    },
    []
  );
  const w = Tr.useCallback(
      (_) => {
        (h.current = _), S();
      },
      [S]
    ),
    C = Tr.useCallback(
      (_ = {}, N = null) => ({ ..._, ref: Ok.mergeRefs(w, N) }),
      [w]
    ),
    T = Tr.useCallback(
      (_) => {
        (p.current = _), S();
      },
      [S]
    ),
    k = Tr.useCallback(
      (_ = {}, N = null) => ({
        ..._,
        ref: Ok.mergeRefs(T, N),
        style: {
          ..._.style,
          position: o,
          minWidth: f ? void 0 : "max-content",
          inset: "0 auto auto 0",
        },
      }),
      [o, T, f]
    ),
    R = Tr.useCallback((_ = {}, N = null) => {
      const { size: G, shadowColor: B, bg: z, style: Y, ...W } = _;
      return { ...W, ref: N, "data-popper-arrow": "", style: vge(_) };
    }, []),
    E = Tr.useCallback(
      (_ = {}, N = null) => ({ ..._, ref: N, "data-popper-arrow-inner": "" }),
      []
    );
  return {
    update() {
      var _;
      (_ = v.current) == null || _.update();
    },
    forceUpdate() {
      var _;
      (_ = v.current) == null || _.forceUpdate();
    },
    transformOrigin: Bk.cssVars.transformOrigin.varRef,
    referenceRef: w,
    popperRef: T,
    getPopperProps: k,
    getArrowProps: R,
    getArrowInnerProps: E,
    getReferenceProps: C,
  };
}
function vge(e) {
  const { size: t, shadowColor: r, bg: n, style: o } = e,
    a = { ...o, position: "absolute" };
  return (
    t && (a["--popper-arrow-size"] = t),
    r && (a["--popper-arrow-shadow-color"] = r),
    n && (a["--popper-arrow-bg"] = n),
    a
  );
}
eu.usePopper = pge;
var bx = {},
  CO = {},
  dd = g;
function yge() {
  const e = dd.useRef(new Map()),
    t = e.current,
    r = dd.useCallback((o, a, s, i) => {
      e.current.set(s, { type: a, el: o, options: i }),
        o.addEventListener(a, s, i);
    }, []),
    n = dd.useCallback((o, a, s, i) => {
      o.removeEventListener(a, s, i), e.current.delete(s);
    }, []);
  return (
    dd.useEffect(
      () => () => {
        t.forEach((o, a) => {
          n(o.el, o.type, a, o.options);
        });
      },
      [n, t]
    ),
    { add: r, remove: n }
  );
}
CO.useEventListeners = yge;
var gge = le,
  bge = x,
  Wr = g,
  Sge = CO;
function Tv(e) {
  var o, a;
  const t =
      ((a = (o = e.composedPath) == null ? void 0 : o.call(e)) == null
        ? void 0
        : a[0]) ?? e.target,
    { tagName: r, isContentEditable: n } = t;
  return r !== "INPUT" && r !== "TEXTAREA" && n !== !0;
}
function xge(e = {}) {
  const {
      ref: t,
      isDisabled: r,
      isFocusable: n,
      clickOnEnter: o = !0,
      clickOnSpace: a = !0,
      onMouseDown: s,
      onMouseUp: i,
      onClick: c,
      onKeyDown: l,
      onKeyUp: u,
      tabIndex: d,
      onMouseOver: f,
      onMouseLeave: m,
      ...h
    } = e,
    [p, v] = Wr.useState(!0),
    [b, y] = Wr.useState(!1),
    S = Sge.useEventListeners(),
    w = (j) => {
      j && j.tagName !== "BUTTON" && v(!1);
    },
    C = p ? d : d || 0,
    T = r && !n,
    k = Wr.useCallback(
      (j) => {
        if (r) {
          j.stopPropagation(), j.preventDefault();
          return;
        }
        j.currentTarget.focus(), c == null || c(j);
      },
      [r, c]
    ),
    R = Wr.useCallback(
      (j) => {
        b &&
          Tv(j) &&
          (j.preventDefault(),
          j.stopPropagation(),
          y(!1),
          S.remove(document, "keyup", R, !1));
      },
      [b, S]
    ),
    E = Wr.useCallback(
      (j) => {
        if (
          (l == null || l(j),
          r || j.defaultPrevented || j.metaKey || !Tv(j.nativeEvent) || p)
        )
          return;
        const O = o && j.key === "Enter";
        a && j.key === " " && (j.preventDefault(), y(!0)),
          O && (j.preventDefault(), j.currentTarget.click()),
          S.add(document, "keyup", R, !1);
      },
      [r, p, l, o, a, S, R]
    ),
    _ = Wr.useCallback(
      (j) => {
        if (
          (u == null || u(j),
          r || j.defaultPrevented || j.metaKey || !Tv(j.nativeEvent) || p)
        )
          return;
        a &&
          j.key === " " &&
          (j.preventDefault(), y(!1), j.currentTarget.click());
      },
      [a, p, r, u]
    ),
    N = Wr.useCallback(
      (j) => {
        j.button === 0 && (y(!1), S.remove(document, "mouseup", N, !1));
      },
      [S]
    ),
    G = Wr.useCallback(
      (j) => {
        if (j.button !== 0) return;
        if (r) {
          j.stopPropagation(), j.preventDefault();
          return;
        }
        p || y(!0),
          j.currentTarget.focus({ preventScroll: !0 }),
          S.add(document, "mouseup", N, !1),
          s == null || s(j);
      },
      [r, p, s, S, N]
    ),
    B = Wr.useCallback(
      (j) => {
        j.button === 0 && (p || y(!1), i == null || i(j));
      },
      [i, p]
    ),
    z = Wr.useCallback(
      (j) => {
        if (r) {
          j.preventDefault();
          return;
        }
        f == null || f(j);
      },
      [r, f]
    ),
    Y = Wr.useCallback(
      (j) => {
        b && (j.preventDefault(), y(!1)), m == null || m(j);
      },
      [b, m]
    ),
    W = gge.mergeRefs(t, w);
  return p
    ? {
        ...h,
        ref: W,
        type: "button",
        "aria-disabled": T ? void 0 : r,
        disabled: T,
        onClick: k,
        onMouseDown: s,
        onMouseUp: i,
        onKeyUp: u,
        onKeyDown: l,
        onMouseOver: f,
        onMouseLeave: m,
      }
    : {
        ...h,
        ref: W,
        role: "button",
        "data-active": bge.dataAttr(b),
        "aria-disabled": r ? "true" : void 0,
        tabIndex: T ? void 0 : C,
        onClick: k,
        onMouseDown: G,
        onMouseUp: B,
        onKeyUp: _,
        onKeyDown: E,
        onMouseOver: z,
        onMouseLeave: Y,
      };
}
bx.useClickable = xge;
var qr = le,
  ka = x,
  ze = g,
  $ge = ZN,
  wge = QN,
  Cge = Fi,
  kge = eu,
  Tge = bx;
const [Pge, kO, TO, PO] = Cge.createDescendantContext(),
  [Rge, Ni] = ka.createContext({ strict: !1, name: "MenuContext" });
function RO(e) {
  return (e == null ? void 0 : e.ownerDocument) ?? document;
}
function Age(e) {
  return RO(e).activeElement === e;
}
function _ge(e = {}) {
  const {
      id: t,
      closeOnSelect: r = !0,
      closeOnBlur: n = !0,
      initialFocusRef: o,
      autoSelect: a = !0,
      isLazy: s,
      isOpen: i,
      defaultIsOpen: c,
      onClose: l,
      onOpen: u,
      placement: d = "bottom-start",
      lazyBehavior: f = "unmount",
      direction: m,
      computePositionOnMount: h = !1,
      ...p
    } = e,
    v = ze.useRef(null),
    b = ze.useRef(null),
    y = ze.useRef(!0),
    S = TO(),
    w = ze.useCallback(() => {
      requestAnimationFrame(() => {
        var L;
        (L = v.current) == null || L.focus({ preventScroll: !1 });
      });
    }, []),
    C = ze.useCallback(() => {
      const L = setTimeout(() => {
        var V, ee;
        if (o) (V = o.current) == null || V.focus();
        else if (!S.count())
          (ee = v.current) == null || ee.focus({ preventScroll: !1 });
        else {
          const pe = S.firstEnabled();
          pe && z(pe.index);
        }
      });
      K.current.add(L);
    }, [S, o]),
    T = ze.useCallback(() => {
      const L = setTimeout(() => {
        var V;
        if (!S.count())
          (V = v.current) == null || V.focus({ preventScroll: !1 });
        else {
          const ee = S.lastEnabled();
          ee && z(ee.index);
        }
      });
      K.current.add(L);
    }, [S]),
    k = ze.useCallback(() => {
      u == null || u(), a ? C() : w();
    }, [a, C, w, u]),
    {
      isOpen: R,
      onOpen: E,
      onClose: _,
      onToggle: N,
    } = qr.useDisclosure({
      isOpen: i,
      defaultIsOpen: c,
      onClose: l,
      onOpen: k,
    });
  qr.useOutsideClick({
    enabled: R && n,
    ref: v,
    handler: (L) => {
      var ee, pe, xe;
      const V =
        ((pe = (ee = L.composedPath) == null ? void 0 : ee.call(L)) == null
          ? void 0
          : pe[0]) ?? L.target;
      ((xe = b.current) != null && xe.contains(V)) || _();
    },
  });
  const G = kge.usePopper({
      ...p,
      enabled: R || h,
      placement: d,
      direction: m,
    }),
    [B, z] = ze.useState(-1);
  qr.useFocusOnHide(v, { focusRef: b, visible: R, shouldFocus: !0 });
  const Y = qr.useAnimationState({ isOpen: R, ref: v }),
    [W, j] = qr.useIds(t, "menu-button", "menu-list"),
    O = ze.useCallback(() => {
      E(), w();
    }, [E, w]),
    K = ze.useRef(new Set([]));
  ze.useEffect(() => {
    const L = K.current;
    return () => {
      L.forEach((V) => clearTimeout(V)), L.clear();
    };
  }, []),
    qr.useUpdateEffect(() => {
      var L;
      R || (z(-1), (L = v.current) == null || L.scrollTo(0, 0));
    }, [R]),
    qr.useUpdateEffect(() => {
      R && B === -1 && w();
    }, [B, R]),
    ze.useEffect(() => {
      var V;
      if (!R) return;
      const L = S.item(B);
      (V = L == null ? void 0 : L.node) == null ||
        V.focus({ preventScroll: !y.current });
    }, [S, B, R]);
  const ve = ze.useCallback(() => {
      E(), C();
    }, [C, E]),
    re = ze.useCallback(() => {
      (y.current = !0), E(), T();
    }, [E, T]),
    ue = ze.useCallback(() => {
      var xe, Ce;
      const L = RO(v.current),
        V = (xe = v.current) == null ? void 0 : xe.contains(L.activeElement);
      if (!(R && !V)) return;
      const pe = (Ce = S.item(B)) == null ? void 0 : Ce.node;
      pe == null || pe.focus({ preventScroll: !y.current });
    }, [R, B, S]);
  return {
    openAndFocusMenu: O,
    openAndFocusFirstItem: ve,
    openAndFocusLastItem: re,
    onTransitionEnd: ue,
    unstable__animationState: Y,
    descendants: S,
    popper: G,
    buttonId: W,
    menuId: j,
    forceUpdate: G.forceUpdate,
    orientation: "vertical",
    isOpen: R,
    onToggle: N,
    onOpen: E,
    onClose: _,
    menuRef: v,
    buttonRef: b,
    focusedIndex: B,
    closeOnSelect: r,
    closeOnBlur: n,
    autoSelect: a,
    setFocusedIndex: z,
    isLazy: s,
    lazyBehavior: f,
    initialFocusRef: o,
    scrollIntoViewRef: y,
  };
}
function Ige(e = {}, t = null) {
  const r = Ni(),
    {
      onToggle: n,
      popper: o,
      openAndFocusFirstItem: a,
      openAndFocusLastItem: s,
      scrollIntoViewRef: i,
    } = r,
    c = ze.useCallback(
      (l) => {
        const u = l.key,
          f = { Enter: a, ArrowDown: a, ArrowUp: s }[u];
        f && ((i.current = !0), l.preventDefault(), l.stopPropagation(), f(l));
      },
      [a, s, i]
    );
  return {
    ...e,
    ref: qr.mergeRefs(r.buttonRef, t, o.referenceRef),
    id: r.buttonId,
    "data-active": ka.dataAttr(r.isOpen),
    "aria-expanded": r.isOpen,
    "aria-haspopup": "menu",
    "aria-controls": r.menuId,
    onClick: ka.callAllHandlers(e.onClick, n),
    onKeyDown: ka.callAllHandlers(e.onKeyDown, c),
  };
}
function tg(e) {
  var t;
  return (
    Nge(e) &&
    !!(
      (t = e == null ? void 0 : e.getAttribute("role")) != null &&
      t.startsWith("menuitem")
    )
  );
}
function Ege(e = {}, t = null) {
  const r = Ni();
  if (!r)
    throw new Error(
      "useMenuContext: context is undefined. Seems you forgot to wrap component within <Menu>"
    );
  const {
      focusedIndex: n,
      setFocusedIndex: o,
      menuRef: a,
      isOpen: s,
      onClose: i,
      menuId: c,
      isLazy: l,
      lazyBehavior: u,
      scrollIntoViewRef: d,
      unstable__animationState: f,
    } = r,
    m = kO(),
    h = wge.useShortcut({
      preventDefault: (y) => y.key !== " " && tg(y.target),
    }),
    p = ze.useCallback(
      (y) => {
        if (!y.currentTarget.contains(y.target)) return;
        const S = y.key,
          C = {
            Tab: (k) => k.preventDefault(),
            Escape: (k) => {
              k.stopPropagation(), i();
            },
            ArrowDown: () => {
              d.current = !0;
              const k = m.nextEnabled(n) ?? m.firstEnabled();
              k && o(k.index);
            },
            ArrowUp: () => {
              d.current = !0;
              const k = m.prevEnabled(n) ?? m.firstEnabled();
              k && o(k.index);
            },
          }[S];
        if (C) {
          y.preventDefault(), C(y);
          return;
        }
        const T = h((k) => {
          const R = $ge.getNextItemFromSearch(
            m.values(),
            k,
            (E) => {
              var _;
              return (
                ((_ = E == null ? void 0 : E.node) == null
                  ? void 0
                  : _.textContent) ?? ""
              );
            },
            m.item(n)
          );
          if (R) {
            const E = m.indexOf(R.node);
            o(E);
          }
        });
        tg(y.target) && T(y);
      },
      [m, n, h, i, o, d]
    ),
    v = ze.useRef(!1);
  s && (v.current = !0);
  const b = ka.lazyDisclosure({
    wasSelected: v.current,
    enabled: l,
    mode: u,
    isSelected: f.present,
  });
  return {
    ...e,
    ref: qr.mergeRefs(a, t),
    children: b ? e.children : null,
    tabIndex: -1,
    role: "menu",
    id: c,
    style: { ...e.style, transformOrigin: "var(--popper-transform-origin)" },
    "aria-orientation": "vertical",
    onKeyDown: ka.callAllHandlers(e.onKeyDown, p),
  };
}
function Mge(e = {}) {
  const { popper: t, isOpen: r } = Ni();
  return t.getPopperProps({
    ...e,
    style: { visibility: r ? "visible" : "hidden", ...e.style },
  });
}
function AO(e = {}, t = null) {
  const {
      onMouseEnter: r,
      onMouseMove: n,
      onMouseLeave: o,
      onClick: a,
      onFocus: s,
      isDisabled: i,
      isFocusable: c,
      closeOnSelect: l,
      type: u,
      ...d
    } = e,
    f = Ni(),
    {
      setFocusedIndex: m,
      focusedIndex: h,
      closeOnSelect: p,
      onClose: v,
      menuId: b,
      scrollIntoViewRef: y,
    } = f,
    S = ze.useRef(null),
    w = `${b}-menuitem-${ze.useId()}`,
    { index: C, register: T } = PO({ disabled: i && !c }),
    k = ze.useCallback(
      (z) => {
        r == null || r(z), !i && ((y.current = !1), m(C));
      },
      [m, C, i, r, y]
    ),
    R = ze.useCallback(
      (z) => {
        n == null || n(z), S.current && !Age(S.current) && k(z);
      },
      [k, n]
    ),
    E = ze.useCallback(
      (z) => {
        o == null || o(z), !i && m(-1);
      },
      [m, i, o]
    ),
    _ = ze.useCallback(
      (z) => {
        a == null || a(z), tg(z.currentTarget) && (l ?? p) && v();
      },
      [v, a, p, l]
    ),
    N = ze.useCallback(
      (z) => {
        s == null || s(z), m(C);
      },
      [m, s, C]
    ),
    G = C === h,
    B = Tge.useClickable({
      onClick: _,
      onFocus: N,
      onMouseEnter: k,
      onMouseMove: R,
      onMouseLeave: E,
      ref: qr.mergeRefs(T, S, t),
      isDisabled: i,
      isFocusable: c,
    });
  return {
    ...d,
    ...B,
    type: u ?? B.type,
    id: w,
    role: "menuitem",
    tabIndex: G ? 0 : -1,
  };
}
function Fge(e = {}, t = null) {
  const { type: r = "radio", isChecked: n, ...o } = e;
  return { ...AO(o, t), role: `menuitem${r}`, "aria-checked": n };
}
function jge(e = {}) {
  const {
      children: t,
      type: r = "radio",
      value: n,
      defaultValue: o,
      onChange: a,
      ...s
    } = e,
    c = r === "radio" ? "" : [],
    [l, u] = qr.useControllableState({
      defaultValue: o ?? c,
      value: n,
      onChange: a,
    }),
    d = ze.useCallback(
      (h) => {
        if (
          (r === "radio" && typeof l == "string" && u(h),
          r === "checkbox" && Array.isArray(l))
        ) {
          const p = l.includes(h) ? l.filter((v) => v !== h) : l.concat(h);
          u(p);
        }
      },
      [l, u, r]
    ),
    m = ka.getValidChildren(t).map((h) => {
      if (h.type.id !== "MenuItemOption") return h;
      const p = (b) => {
          var y, S;
          d(h.props.value), (S = (y = h.props).onClick) == null || S.call(y, b);
        },
        v = r === "radio" ? h.props.value === l : l.includes(h.props.value);
      return ze.cloneElement(h, { type: r, onClick: p, isChecked: v });
    });
  return { ...s, children: m };
}
function Dge() {
  const { isOpen: e, onClose: t } = Ni();
  return { isOpen: e, onClose: t };
}
function Nge(e) {
  if (!Oge(e)) return !1;
  const t = e.ownerDocument.defaultView ?? window;
  return e instanceof t.HTMLElement;
}
function Oge(e) {
  return (
    e != null &&
    typeof e == "object" &&
    "nodeType" in e &&
    e.nodeType === Node.ELEMENT_NODE
  );
}
rt.MenuDescendantsProvider = Pge;
rt.MenuProvider = Rge;
rt.useMenu = _ge;
rt.useMenuButton = Ige;
rt.useMenuContext = Ni;
rt.useMenuDescendant = PO;
rt.useMenuDescendants = TO;
rt.useMenuDescendantsContext = kO;
rt.useMenuItem = AO;
rt.useMenuList = Ege;
rt.useMenuOption = Fge;
rt.useMenuOptionGroup = jge;
rt.useMenuPositioner = Mge;
rt.useMenuState = Dge;
var Pv = P,
  Bge = I,
  _O = x,
  Lge = g,
  Rv = rt,
  Vge = $r,
  zge = he;
const [Hge, Wge] = _O.createContext({
    name: "MenuStylesContext",
    errorMessage: `useMenuStyles returned is 'undefined'. Seems you forgot to wrap the components in "<Menu />" `,
  }),
  IO = (e) => {
    const { children: t } = e,
      r = zge.useMultiStyleConfig("Menu", e),
      n = Bge.omitThemingProps(e),
      { direction: o } = Vge.useTheme(),
      { descendants: a, ...s } = Rv.useMenu({ ...n, direction: o }),
      i = Lge.useMemo(() => s, [s]),
      { isOpen: c, onClose: l, forceUpdate: u } = i;
    return Pv.jsx(Rv.MenuDescendantsProvider, {
      value: a,
      children: Pv.jsx(Rv.MenuProvider, {
        value: i,
        children: Pv.jsx(Hge, {
          value: r,
          children: _O.runIfFn(t, { isOpen: c, onClose: l, forceUpdate: u }),
        }),
      }),
    });
  };
IO.displayName = "Menu";
En.Menu = IO;
En.useMenuStyles = Wge;
var EO = {},
  rg = P,
  Gge = x,
  Uge = En,
  Kge = rt,
  MO = D,
  FO = M;
const qge = MO.forwardRef((e, t) => {
    const r = Uge.useMenuStyles();
    return rg.jsx(FO.chakra.button, {
      ref: t,
      ...e,
      __css: {
        display: "inline-flex",
        appearance: "none",
        alignItems: "center",
        outline: 0,
        ...r.button,
      },
    });
  }),
  jO = MO.forwardRef((e, t) => {
    const { children: r, as: n, ...o } = e,
      a = Kge.useMenuButton(o, t),
      s = n || qge;
    return rg.jsx(s, {
      ...a,
      className: Gge.cx("chakra-menu__menu-button", e.className),
      children: rg.jsx(FO.chakra.span, {
        __css: { pointerEvents: "none", flex: "1 1 auto", minW: 0 },
        children: e.children,
      }),
    });
  });
jO.displayName = "MenuButton";
EO.MenuButton = jO;
var Sx = {},
  Xge = P,
  Yge = En,
  Zge = D,
  Qge = M;
const DO = Zge.forwardRef((e, t) => {
  const r = Yge.useMenuStyles();
  return Xge.jsx(Qge.chakra.span, {
    ref: t,
    ...e,
    __css: r.command,
    className: "chakra-menu__command",
  });
});
DO.displayName = "MenuCommand";
Sx.MenuCommand = DO;
var NO = {},
  Jge = P,
  ebe = x,
  tbe = En,
  rbe = M;
const OO = (e) => {
  const { className: t, ...r } = e,
    n = tbe.useMenuStyles();
  return Jge.jsx(rbe.chakra.hr, {
    "aria-orientation": "horizontal",
    className: ebe.cx("chakra-menu__divider", t),
    ...r,
    __css: n.divider,
  });
};
OO.displayName = "MenuDivider";
NO.MenuDivider = OO;
var xx = {},
  Lk = P,
  nbe = x,
  obe = En,
  abe = D,
  sbe = M;
const BO = abe.forwardRef((e, t) => {
  const { title: r, children: n, className: o, ...a } = e,
    s = nbe.cx("chakra-menu__group__title", o),
    i = obe.useMenuStyles();
  return Lk.jsxs("div", {
    ref: t,
    className: "chakra-menu__group",
    role: "group",
    children: [
      r &&
        Lk.jsx(sbe.chakra.p, {
          className: s,
          ...a,
          __css: i.groupTitle,
          children: r,
        }),
      n,
    ],
  });
});
BO.displayName = "MenuGroup";
xx.MenuGroup = BO;
var nh = {},
  ibe = P,
  Vk = x,
  Av = g,
  cbe = En,
  lbe = M;
const LO = (e) => {
  const { className: t, children: r, ...n } = e,
    o = cbe.useMenuStyles(),
    a = Av.Children.only(r),
    s = Av.isValidElement(a)
      ? Av.cloneElement(a, {
          focusable: "false",
          "aria-hidden": !0,
          className: Vk.cx("chakra-menu__icon", a.props.className),
        })
      : null,
    i = Vk.cx("chakra-menu__icon-wrapper", t);
  return ibe.jsx(lbe.chakra.span, {
    className: i,
    ...n,
    __css: o.icon,
    children: s,
  });
};
LO.displayName = "MenuIcon";
nh.MenuIcon = LO;
var VO = {},
  $x = {},
  ube = P,
  dbe = g,
  fbe = En,
  mbe = D,
  hbe = M;
const pbe = mbe.forwardRef((e, t) => {
  const { type: r, ...n } = e,
    o = fbe.useMenuStyles(),
    a = n.as || r ? r ?? void 0 : "button",
    s = dbe.useMemo(
      () => ({
        textDecoration: "none",
        color: "inherit",
        userSelect: "none",
        display: "flex",
        width: "100%",
        alignItems: "center",
        textAlign: "start",
        flex: "0 0 auto",
        outline: 0,
        ...o.item,
      }),
      [o.item]
    );
  return ube.jsx(hbe.chakra.button, { ref: t, type: a, ...n, __css: s });
});
$x.StyledMenuItem = pbe;
var fd = P,
  vbe = x,
  ybe = Sx,
  gbe = nh,
  bbe = $x,
  Sbe = rt,
  xbe = D;
const zO = xbe.forwardRef((e, t) => {
  const {
      icon: r,
      iconSpacing: n = "0.75rem",
      command: o,
      commandSpacing: a = "0.75rem",
      children: s,
      ...i
    } = e,
    c = Sbe.useMenuItem(i, t),
    u =
      r || o
        ? fd.jsx("span", {
            style: { pointerEvents: "none", flex: 1 },
            children: s,
          })
        : s;
  return fd.jsxs(bbe.StyledMenuItem, {
    ...c,
    className: vbe.cx("chakra-menu__menuitem", c.className),
    children: [
      r &&
        fd.jsx(gbe.MenuIcon, { fontSize: "0.8em", marginEnd: n, children: r }),
      u,
      o && fd.jsx(ybe.MenuCommand, { marginStart: a, children: o }),
    ],
  });
});
zO.displayName = "MenuItem";
VO.MenuItem = zO;
var HO = {},
  Po = P,
  $be = x,
  zk = nh,
  wbe = $x,
  Cbe = rt,
  kbe = D;
const Hk = (e) =>
    Po.jsx("svg", {
      viewBox: "0 0 14 14",
      width: "1em",
      height: "1em",
      ...e,
      children: Po.jsx("polygon", {fill: "currentColor",
        points:
          "5.5 11.9993304 14 3.49933039 12.5 2 5.5 8.99933039 1.5 4.9968652 0 6.49933039",
      }),
    }),
  wx = kbe.forwardRef((e, t) => {
    const {
        icon: r,
        iconSpacing: n = "0.75rem",
        iconPlacement: o = "start",
        ...a
      } = e,
      s = Cbe.useMenuOption(a, t);
    return Po.jsxs(wbe.StyledMenuItem, {
      ...s,
      className: $be.cx("chakra-menu__menuitem-option", a.className),
      children: [
        r !== null &&
          o === "start" &&
          Po.jsx(zk.MenuIcon, {
            fontSize: "0.8em",
            marginEnd: n,
            opacity: e.isChecked ? 1 : 0,
            children: r || Po.jsx(Hk, {}),
          }),
        Po.jsx("span", { style: { flex: 1 }, children: s.children }),
        r !== null &&
          o === "end" &&
          Po.jsx(zk.MenuIcon, {
            fontSize: "0.8em",
            marginStart: n,
            opacity: e.isChecked ? 1 : 0,
            children: r || Po.jsx(Hk, {}),
          }),
      ],
    });
  });
wx.id = "MenuItemOption";
wx.displayName = "MenuItemOption";
HO.MenuItemOption = wx;
var WO = {},
  Wk = P,
  Gk = x,
  Tbe = tr,
  Pbe = En,
  _v = rt,
  GO = M,
  Rbe = D;
const Abe = {
    enter: {
      visibility: "visible",
      opacity: 1,
      scale: 1,
      transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] },
    },
    exit: {
      transitionEnd: { visibility: "hidden" },
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.1, easings: "easeOut" },
    },
  },
  _be = GO.chakra(Tbe.motion.div),
  UO = Rbe.forwardRef(function (t, r) {
    var f;
    const { rootProps: n, motionProps: o, ...a } = t,
      {
        isOpen: s,
        onTransitionEnd: i,
        unstable__animationState: c,
      } = _v.useMenuContext(),
      l = _v.useMenuList(a, r),
      u = _v.useMenuPositioner(n),
      d = Pbe.useMenuStyles();
    return Wk.jsx(GO.chakra.div, {
      ...u,
      __css: { zIndex: t.zIndex ?? ((f = d.list) == null ? void 0 : f.zIndex) },
      children: Wk.jsx(_be, {
        variants: Abe,
        initial: !1,
        animate: s ? "enter" : "exit",
        __css: {outline: 0, ...d.list },
        ...o,
        ...l,
        className: Gk.cx("chakra-menu__menu-list", l.className),
        onUpdate: i,
        onAnimationComplete: Gk.callAll(c.onComplete, l.onAnimationComplete),
      }),
    });
  });
UO.displayName = "MenuList";
WO.MenuList = UO;
var KO = {},
  Ibe = P,
  Ebe = x,
  Mbe = xx,
  Fbe = rt;
const qO = (e) => {
  const { className: t, title: r, ...n } = e,
    o = Fbe.useMenuOptionGroup(n);
  return Ibe.jsx(Mbe.MenuGroup, {
    title: r,
    className: Ebe.cx("chakra-menu__option-group", t),
    ...o,
  });
};
qO.displayName = "MenuOptionGroup";
KO.MenuOptionGroup = qO;
var Xo = {},
  Ht = {},
  oh = {},
  XO = function (e) {
    if (typeof document > "u") return null;
    var t = Array.isArray(e) ? e[0] : e;
    return t.ownerDocument.body;
  },
  ds = new WeakMap(),
  md = new WeakMap(),
  hd = {},
  Iv = 0,
  YO = function (e) {
    return e && (e.host || YO(e.parentNode));
  },
  jbe = function (e, t) {
    return t
      .map(function (r) {
        if (e.contains(r)) return r;
        var n = YO(r);
        return n && e.contains(n)
          ? n
          : (console.error(
              "aria-hidden",
              r,
              "in not contained inside",
              e,
              ". Doing nothing"
            ),
            null);
      })
      .filter(function (r) {
        return !!r;
      });
  },
  ZO = function (e, t, r, n) {
    var o = jbe(t, Array.isArray(e) ? e : [e]);
    hd[r] || (hd[r] = new WeakMap());
    var a = hd[r],
      s = [],
      i = new Set(),
      c = new Set(o),
      l = function (d) {
        !d || i.has(d) || (i.add(d), l(d.parentNode));
      };
    o.forEach(l);
    var u = function (d) {
      !d ||
        c.has(d) ||
        Array.prototype.forEach.call(d.children, function (f) {
          if (i.has(f)) u(f);
          else
            try {
              var m = f.getAttribute(n),
                h = m !== null && m !== "false",
                p = (ds.get(f) || 0) + 1,
                v = (a.get(f) || 0) + 1;
              ds.set(f, p),
                a.set(f, v),
                s.push(f),
                p === 1 && h && md.set(f, !0),
                v === 1 && f.setAttribute(r, "true"),
                h || f.setAttribute(n, "true");
            } catch (b) {
              console.error("aria-hidden: cannot operate on ", f, b);
            }
        });
    };
    return (
      u(t),
      i.clear(),
      Iv++,
      function () {
        s.forEach(function (d) {
          var f = ds.get(d) - 1,
            m = a.get(d) - 1;
          ds.set(d, f),
            a.set(d, m),
            f || (md.has(d) || d.removeAttribute(n), md.delete(d)),
            m || d.removeAttribute(r);
        }),
          Iv--,
          Iv ||
            ((ds = new WeakMap()),
            (ds = new WeakMap()),
            (md = new WeakMap()),
            (hd = {}));
      }
    );
  },
  QO = function (e, t, r) {
    r === void 0 && (r = "data-aria-hidden");
    var n = Array.from(Array.isArray(e) ? e : [e]),
      o = t || XO(e);
    return o
      ? (n.push.apply(n, Array.from(o.querySelectorAll("[aria-live]"))),
        ZO(n, o, r, "aria-hidden"))
      : function () {
          return null;
        };
  },
  JO = function (e, t, r) {
    r === void 0 && (r = "data-inert-ed");
    var n = t || XO(e);
    return n
      ? ZO(e, n, r, "inert")
      : function () {
          return null;
        };
  },
  eB = function () {
    return (
      typeof HTMLElement < "u" && HTMLElement.prototype.hasOwnProperty("inert")
    );
  },
  Dbe = function (e, t, r) {
    return r === void 0 && (r = "data-suppressed"), (eB() ? JO : QO)(e, t, r);
  };
const Nbe = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        hideOthers: QO,
        inertOthers: JO,
        supportsInert: eB,
        suppressOthers: Dbe,
      },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  Obe = Fa(Nbe);
var nu = {},
  Uk = g,
  Bbe = Object.defineProperty,
  Lbe = (e, t, r) =>
    t in e
      ? Bbe(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r })
      : (e[t] = r),
  Vbe = (e, t, r) => (Lbe(e, t + "", r), r);
class zbe {
  constructor() {
    Vbe(this, "modals"), (this.modals = new Set());
  }
  add(t) {
    return this.modals.add(t), this.modals.size;
  }
  remove(t) {
    this.modals.delete(t);
  }
  isTopModal(t) {
    if (!t) return !1;
    const r = Array.from(this.modals)[this.modals.size - 1];
    return t === r;
  }
}
const ng = new zbe();
function Hbe(e, t) {
  const [r, n] = Uk.useState(0);
  return (
    Uk.useEffect(() => {
      const o = e.current;
      if (o) {
        if (t) {
          const a = ng.add(o);
          n(a);
        }
        return () => {
          ng.remove(o), n(0);
        };
      }
    }, [t, e]),
    r
  );
}
nu.modalManager = ng;
nu.useModalManager = Hbe;
var Kk = le,
  pd = x,
  Wbe = Obe,
  fr = g,
  qk = nu;
function Gbe(e) {
  const {
      isOpen: t,
      onClose: r,
      id: n,
      closeOnOverlayClick: o = !0,
      closeOnEsc: a = !0,
      useInert: s = !0,
      onOverlayClick: i,
      onEsc: c,
    } = e,
    l = fr.useRef(null),
    u = fr.useRef(null),
    [d, f, m] = Ube(
      n,
      "chakra-modal",
      "chakra-modal--header",
      "chakra-modal--body"
    );
  tB(l, t && s);
  const h = qk.useModalManager(l, t),
    p = fr.useRef(null),
    v = fr.useCallback((E) => {
      p.current = E.target;
    }, []),
    b = fr.useCallback(
      (E) => {
        E.key === "Escape" &&
          (E.stopPropagation(), a && (r == null || r()), c == null || c());
      },
      [a, r, c]
    ),
    [y, S] = fr.useState(!1),
    [w, C] = fr.useState(!1),
    T = fr.useCallback(
      (E = {}, _ = null) => ({
        role: "dialog",
        ...E,
        ref: Kk.mergeRefs(_, l),
        id: d,
        tabIndex: -1,
        "aria-modal": !0,
        "aria-labelledby": y ? f : void 0,
        "aria-describedby": w ? m : void 0,
        onClick: pd.callAllHandlers(E.onClick, (N) => N.stopPropagation()),
      }),
      [m, w, d, f, y]
    ),
    k = fr.useCallback(
      (E) => {
        E.stopPropagation(),
          p.current === E.target &&
            qk.modalManager.isTopModal(l.current) &&
            (o && (r == null || r()), i == null || i());
      },
      [r, o, i]
    ),
    R = fr.useCallback(
      (E = {}, _ = null) => ({
        ...E,
        ref: Kk.mergeRefs(_, u),
        onClick: pd.callAllHandlers(E.onClick, k),
        onKeyDown: pd.callAllHandlers(E.onKeyDown, b),
        onMouseDown: pd.callAllHandlers(E.onMouseDown, v),
      }),
      [b, v, k]
    );
  return {
    isOpen: t,
    onClose: r,
    headerId: f,
    bodyId: m,
    setBodyMounted: C,
    setHeaderMounted: S,
    dialogRef: l,
    overlayRef: u,
    getDialogProps: T,
    getDialogContainerProps: R,
    index: h,
  };
}
function tB(e, t) {
  const r = e.current;
  fr.useEffect(() => {
    if (!(!e.current || !t)) return Wbe.hideOthers(e.current);
  }, [t, e, r]);
}
function Ube(e, ...t) {
  const r = fr.useId(),
    n = e || r;
  return fr.useMemo(() => t.map((o) => `${o}-${n}`), [n, t]);
}
oh.useAriaHidden = tB;
oh.useModal = Gbe;
var vd = P,
  rB = x,
  Kbe = tr,
  qbe = oh,
  Xbe = Ul,
  Ybe = he;
const [Zbe, Qbe] = rB.createContext({
    name: "ModalStylesContext",
    errorMessage: `useModalStyles returned is 'undefined'. Seems you forgot to wrap the components in "<Modal />" `,
  }),
  [nB, Jbe] = rB.createContext({
    strict: !0,
    name: "ModalContext",
    errorMessage:
      "useModalContext: `context` is undefined. Seems you forgot to wrap modal components in `<Modal />`",
  }),
  oB = (e) => {
    const t = {
        scrollBehavior: "outside",
        autoFocus: !0,
        trapFocus: !0,
        returnFocusOnClose: !0,
        blockScrollOnMount: !0,
        allowPinchZoom: !1,
        preserveScrollBarGap: !0,
        motionPreset: "scale",
        ...e,
        lockFocusAcrossFrames: e.lockFocusAcrossFrames || !0,
      },
      {
        portalProps: r,
        children: n,
        autoFocus: o,
        trapFocus: a,
        initialFocusRef: s,
        finalFocusRef: i,
        returnFocusOnClose: c,
        blockScrollOnMount: l,
        allowPinchZoom: u,
        preserveScrollBarGap: d,
        motionPreset: f,
        lockFocusAcrossFrames: m,
        animatePresenceProps: h,
        onCloseComplete: p,
      } = t,
      v = Ybe.useMultiStyleConfig("Modal", t),
      y = {
        ...qbe.useModal(t),
        autoFocus: o,
        trapFocus: a,
        initialFocusRef: s,
        finalFocusRef: i,
        returnFocusOnClose: c,
        blockScrollOnMount: l,
        allowPinchZoom: u,
        preserveScrollBarGap: d,
        motionPreset: f,
        lockFocusAcrossFrames: m,
      };
    return vd.jsx(nB, {
      value: y,
      children: vd.jsx(Zbe, {
        value: v,
        children: vd.jsx(Kbe.AnimatePresence, {
          ...h,
          onExitComplete: p,
          children: y.isOpen && vd.jsx(Xbe.Portal, { ...r, children: n }),
        }),
      }),
    });
  };
oB.displayName = "Modal";
Ht.Modal = oB;
Ht.ModalContextProvider = nB;
Ht.useModalContext = Jbe;
Ht.useModalStyles = Qbe;
var Cx = {},
  ah = {},
  Qd = "right-scroll-bar-position",
  Jd = "width-before-scroll-bar",
  e0e = "with-scroll-bars-hidden",
  t0e = "--removed-body-scroll-bar-size",
  aB = SD(),
  Ev = function () {},
  sh = g.forwardRef(function (e, t) {
    var r = g.useRef(null),
      n = g.useState({
        onScrollCapture: Ev,
        onWheelCapture: Ev,
        onTouchMoveCapture: Ev,
      }),
      o = n[0],
      a = n[1],
      s = e.forwardProps,
      i = e.children,
      c = e.className,
      l = e.removeScrollBar,
      u = e.enabled,
      d = e.shards,
      f = e.sideCar,
      m = e.noIsolation,
      h = e.inert,
      p = e.allowPinchZoom,
      v = e.as,
      b = v === void 0 ? "div" : v,
      y = e.gapMode,
      S = Um(e, [
        "forwardProps",
        "children",
        "className",
        "removeScrollBar",
        "enabled",
        "shards",
        "sideCar",
        "noIsolation",
        "inert",
        "allowPinchZoom",
        "as",
        "gapMode",
      ]),
      w = f,
      C = Gj([r, t]),
      T = Mr(Mr({}, S), o);
    return g.createElement(
      g.Fragment,
      null,
      u &&
        g.createElement(w, {
          sideCar: aB,
          removeScrollBar: l,
          shards: d,
          noIsolation: m,
          inert: h,
          setCallbacks: a,
          allowPinchZoom: !!p,
          lockRef: r,
          gapMode: y,
        }),
      s
        ? g.cloneElement(g.Children.only(i), Mr(Mr({}, T), { ref: C }))
        : g.createElement(b, Mr({}, T, { className: c, ref: C }), i)
    );
  });
sh.defaultProps = { enabled: !0, removeScrollBar: !0, inert: !1 };
sh.classNames = { fullWidth: Jd, zeroRight: Qd };
var r0e = function () {
  if (typeof __webpack_nonce__ < "u") return __webpack_nonce__;
};
function n0e() {
  if (!document) return null;
  var e = document.createElement("style");
  e.type = "text/css";
  var t = r0e();
  return t && e.setAttribute("nonce", t), e;
}
function o0e(e, t) {
  e.styleSheet
    ? (e.styleSheet.cssText = t)
    : e.appendChild(document.createTextNode(t));
}
function a0e(e) {
  var t = document.head || document.getElementsByTagName("head")[0];
  t.appendChild(e);
}
var s0e = function () {
    var e = 0,
      t = null;
    return {
      add: function (r) {
        e == 0 && (t = n0e()) && (o0e(t, r), a0e(t)), e++;
      },
      remove: function () {
        e--,
          !e && t && (t.parentNode && t.parentNode.removeChild(t), (t = null));
      },
    };
  },
  i0e = function () {
    var e = s0e();
    return function (t, r) {
      g.useEffect(
        function () {
          return (
            e.add(t),
            function () {
              e.remove();
            }
          );
        },
        [t && r]
      );
    };
  },
  sB = function () {
    var e = i0e(),
      t = function (r) {
        var n = r.styles,
          o = r.dynamic;
        return e(n, o), null;
      };
    return t;
  },
  c0e = { left: 0, top: 0, right: 0, gap: 0 },
  Mv = function (e) {
    return parseInt(e || "", 10) || 0;
  },
  l0e = function (e) {
    var t = window.getComputedStyle(document.body),
      r = t[e === "padding" ? "paddingLeft" : "marginLeft"],
      n = t[e === "padding" ? "paddingTop" : "marginTop"],
      o = t[e === "padding" ? "paddingRight" : "marginRight"];
    return [Mv(r), Mv(n), Mv(o)];
  },
  u0e = function (e) {
    if ((e === void 0 && (e = "margin"), typeof window > "u")) return c0e;
    var t = l0e(e),
      r = document.documentElement.clientWidth,
      n = window.innerWidth;
    return {
      left: t[0],
      top: t[1],
      right: t[2],
      gap: Math.max(0, n - r + t[2] - t[0]),
    };
  },
  d0e = sB(),
  Qs = "data-scroll-locked",
  f0e = function (e, t, r, n) {
    var o = e.left,
      a = e.top,
      s = e.right,
      i = e.gap;
    return (
      r === void 0 && (r = "margin"),
      `
  .`
        .concat(
          e0e,
          ` {
   overflow: hidden `
        )
        .concat(
          n,
          `;
   padding-right: `
        )
        .concat(i, "px ")
        .concat(
          n,
          `;
  }
  body[`
        )
        .concat(
          Qs,
          `] {
    overflow: hidden `
        )
        .concat(
          n,
          `;
    overscroll-behavior: contain;
    `
        )
        .concat(
          [
            t && "position: relative ".concat(n, ";"),
            r === "margin" &&
              `
    padding-left: `
                .concat(
                  o,
                  `px;
    padding-top: `
                )
                .concat(
                  a,
                  `px;
    padding-right: `
                )
                .concat(
                  s,
                  `px;
    margin-left:0;
    margin-top:0;
    margin-right: `
                )
                .concat(i, "px ")
                .concat(
                  n,
                  `;
    `
                ),
            r === "padding" &&
              "padding-right: ".concat(i, "px ").concat(n, ";"),
          ]
            .filter(Boolean)
            .join(""),
          `
  }
  
  .`
        )
        .concat(
          Qd,
          ` {
    right: `
        )
        .concat(i, "px ")
        .concat(
          n,
          `;
  }
  
  .`
        )
        .concat(
          Jd,
          ` {
    margin-right: `
        )
        .concat(i, "px ")
        .concat(
          n,
          `;
  }
  
  .`
        )
        .concat(Qd, " .")
        .concat(
          Qd,
          ` {
    right: 0 `
        )
        .concat(
          n,
          `;
  }
  
  .`
        )
        .concat(Jd, " .")
        .concat(
          Jd,
          ` {
    margin-right: 0 `
        )
        .concat(
          n,
          `;
  }
  
  body[`
        )
        .concat(
          Qs,
          `] {
    `
        )
        .concat(t0e, ": ")
        .concat(
          i,
          `px;
  }
`
        )
    );
  },
  Xk = function () {
    var e = parseInt(document.body.getAttribute(Qs) || "0", 10);
    return isFinite(e) ? e : 0;
  },
  m0e = function () {
    g.useEffect(function () {
      return (
        document.body.setAttribute(Qs, (Xk() + 1).toString()),
        function () {
          var e = Xk() - 1;
          e <= 0
            ? document.body.removeAttribute(Qs)
            : document.body.setAttribute(Qs, e.toString());
        }
      );
    }, []);
  },
  h0e = function (e) {
    var t = e.noRelative,
      r = e.noImportant,
      n = e.gapMode,
      o = n === void 0 ? "margin" : n;
    m0e();
    var a = g.useMemo(
      function () {
        return u0e(o);
      },
      [o]
    );
    return g.createElement(d0e, {
      styles: f0e(a, !t, o, r ? "" : "!important"),
    });
  },
  og = !1;
if (typeof window < "u")
  try {
    var yd = Object.defineProperty({}, "passive", {
      get: function () {
        return (og = !0), !0;
      },
    });
    window.addEventListener("test", yd, yd),
      window.removeEventListener("test", yd, yd);
  } catch {
    og = !1;
  }
var fs = og ? { passive: !1 } : !1,
  p0e = function (e) {
    return e.tagName === "TEXTAREA";
  },
  iB = function (e, t) {
    if (!(e instanceof Element)) return !1;
    var r = window.getComputedStyle(e);
    return (
      r[t] !== "hidden" &&
      !(r.overflowY === r.overflowX && !p0e(e) && r[t] === "visible")
    );
  },
  v0e = function (e) {
    return iB(e, "overflowY");
  },
  y0e = function (e) {
    return iB(e, "overflowX");
  },
  Yk = function (e, t) {
    var r = t.ownerDocument,
      n = t;
    do {
      typeof ShadowRoot < "u" && n instanceof ShadowRoot && (n = n.host);
      var o = cB(e, n);
      if (o) {
        var a = lB(e, n),
          s = a[1],
          i = a[2];
        if (s > i) return !0;
      }
      n = n.parentNode;
    } while (n && n !== r.body);
    return !1;
  },
  g0e = function (e) {
    var t = e.scrollTop,
      r = e.scrollHeight,
      n = e.clientHeight;
    return [t, r, n];
  },
  b0e = function (e) {
    var t = e.scrollLeft,
      r = e.scrollWidth,
      n = e.clientWidth;
    return [t, r, n];
  },
  cB = function (e, t) {
    return e === "v" ? v0e(t) : y0e(t);
  },
  lB = function (e, t) {
    return e === "v" ? g0e(t) : b0e(t);
  },
  S0e = function (e, t) {
    return e === "h" && t === "rtl" ? -1 : 1;
  },
  x0e = function (e, t, r, n, o) {
    var a = S0e(e, window.getComputedStyle(t).direction),
      s = a * n,
      i = r.target,
      c = t.contains(i),
      l = !1,
      u = s > 0,
      d = 0,
      f = 0;
    do {
      var m = lB(e, i),
        h = m[0],
        p = m[1],
        v = m[2],
        b = p - v - a * h;
      (h || b) && cB(e, i) && ((d += b), (f += h)),
        i instanceof ShadowRoot ? (i = i.host) : (i = i.parentNode);
    } while ((!c && i !== document.body) || (c && (t.contains(i) || t === i)));
    return (
      ((u && (Math.abs(d) < 1 || !o)) || (!u && (Math.abs(f) < 1 || !o))) &&
        (l = !0),
      l
    );
  },
  gd = function (e) {
    return "changedTouches" in e
      ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY]
      : [0, 0];
  },
  Zk = function (e) {
    return [e.deltaX, e.deltaY];
  },
  Qk = function (e) {
    return e && "current" in e ? e.current : e;
  },
  $0e = function (e, t) {
    return e[0] === t[0] && e[1] === t[1];
  },
  w0e = function (e) {
    return `
  .block-interactivity-`
      .concat(
        e,
        ` {pointer-events: none;}
  .allow-interactivity-`
      )
      .concat(
        e,
        ` {pointer-events: all;}
`
      );
  },
  C0e = 0,
  ms = [];
function k0e(e) {
  var t = g.useRef([]),
    r = g.useRef([0, 0]),
    n = g.useRef(),
    o = g.useState(C0e++)[0],
    a = g.useState(sB)[0],
    s = g.useRef(e);
  g.useEffect(
    function () {
      s.current = e;
    },
    [e]
  ),
    g.useEffect(
      function () {
        if (e.inert) {
          document.body.classList.add("block-interactivity-".concat(o));
          var p = $S([e.lockRef.current], (e.shards || []).map(Qk), !0).filter(
            Boolean
          );
          return (
            p.forEach(function (v) {
              return v.classList.add("allow-interactivity-".concat(o));
            }),
            function () {
              document.body.classList.remove("block-interactivity-".concat(o)),
                p.forEach(function (v) {
                  return v.classList.remove("allow-interactivity-".concat(o));
                });
            }
          );
        }
      },
      [e.inert, e.lockRef.current, e.shards]
    );
  var i = g.useCallback(function (p, v) {
      if (
        ("touches" in p && p.touches.length === 2) ||
        (p.type === "wheel" && p.ctrlKey)
      )
        return !s.current.allowPinchZoom;
      var b = gd(p),
        y = r.current,
        S = "deltaX" in p ? p.deltaX : y[0] - b[0],
        w = "deltaY" in p ? p.deltaY : y[1] - b[1],
        C,
        T = p.target,
        k = Math.abs(S) > Math.abs(w) ? "h" : "v";
      if ("touches" in p && k === "h" && T.type === "range") return !1;
      var R = Yk(k, T);
      if (!R) return !0;
      if ((R ? (C = k) : ((C = k === "v" ? "h" : "v"), (R = Yk(k, T))), !R))
        return !1;
      if (
        (!n.current && "changedTouches" in p && (S || w) && (n.current = C), !C)
      )
        return !0;
      var E = n.current || C;
      return x0e(E, v, p, E === "h" ? S : w, !0);
    }, []),
    c = g.useCallback(function (p) {
      var v = p;
      if (!(!ms.length || ms[ms.length - 1] !== a)) {
        var b = "deltaY" in v ? Zk(v) : gd(v),
          y = t.current.filter(function (C) {
            return (
              C.name === v.type &&
              (C.target === v.target || v.target === C.shadowParent) &&
              $0e(C.delta, b)
            );
          })[0];
        if (y && y.should) {
          v.cancelable && v.preventDefault();
          return;
        }
        if (!y) {
          var S = (s.current.shards || [])
              .map(Qk)
              .filter(Boolean)
              .filter(function (C) {
                return C.contains(v.target);
              }),
            w = S.length > 0 ? i(v, S[0]) : !s.current.noIsolation;
          w && v.cancelable && v.preventDefault();
        }
      }
    }, []),
    l = g.useCallback(function (p, v, b, y) {
      var S = { name: p, delta: v, target: b, should: y, shadowParent: T0e(b) };
      t.current.push(S),
        setTimeout(function () {
          t.current = t.current.filter(function (w) {
            return w !== S;
          });
        }, 1);
    }, []),
    u = g.useCallback(function (p) {
      (r.current = gd(p)), (n.current = void 0);
    }, []),
    d = g.useCallback(function (p) {
      l(p.type, Zk(p), p.target, i(p, e.lockRef.current));
    }, []),
    f = g.useCallback(function (p) {
      l(p.type, gd(p), p.target, i(p, e.lockRef.current));
    }, []);
  g.useEffect(function () {
    return (
      ms.push(a),
      e.setCallbacks({
        onScrollCapture: d,
        onWheelCapture: d,
        onTouchMoveCapture: f,
      }),
      document.addEventListener("wheel", c, fs),
      document.addEventListener("touchmove", c, fs),
      document.addEventListener("touchstart", u, fs),
      function () {
        (ms = ms.filter(function (p) {
          return p !== a;
        })),
          document.removeEventListener("wheel", c, fs),
          document.removeEventListener("touchmove", c, fs),
          document.removeEventListener("touchstart", u, fs);
      }
    );
  }, []);
  var m = e.removeScrollBar,
    h = e.inert;
  return g.createElement(
    g.Fragment,
    null,
    h ? g.createElement(a, { styles: w0e(o) }) : null,
    m ? g.createElement(h0e, { gapMode: e.gapMode }) : null
  );
}
function T0e(e) {
  for (var t = null; e !== null; )
    e instanceof ShadowRoot && ((t = e.host), (e = e.host)), (e = e.parentNode);
  return t;
}
const P0e = Dme(aB, k0e);
var uB = g.forwardRef(function (e, t) {
  return g.createElement(sh, Mr({}, e, { ref: t, sideCar: P0e }));
});
uB.classNames = sh.classNames;
const R0e = uB,
  A0e = Object.freeze(
    Object.defineProperty(
      { __proto__: null, RemoveScroll: R0e },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  _0e = Fa(A0e);
var Jk = P,
  I0e = tr,
  E0e = g,
  M0e = _0e,
  F0e = Ht,
  j0e = nu,
  D0e = bS;
function N0e(e) {
  const {
      autoFocus: t,
      trapFocus: r,
      dialogRef: n,
      initialFocusRef: o,
      blockScrollOnMount: a,
      allowPinchZoom: s,
      finalFocusRef: i,
      returnFocusOnClose: c,
      preserveScrollBarGap: l,
      lockFocusAcrossFrames: u,
      isOpen: d,
    } = F0e.useModalContext(),
    [f, m] = I0e.usePresence();
  E0e.useEffect(() => {
    !f && m && setTimeout(m);
  }, [f, m]);
  const h = j0e.useModalManager(n, d);
  return Jk.jsx(D0e.FocusLock, {
    autoFocus: t,
    isDisabled: !r,
    initialFocusRef: o,
    finalFocusRef: i,
    restoreFocus: c,
    contentRef: n,
    lockFocusAcrossFrames: u,
    children: Jk.jsx(M0e.RemoveScroll, {
      removeScrollBar: !l,
      allowPinchZoom: s,
      enabled: h === 1 && a,
      forwardProps: !0,
      children: e.children,
    }),
  });
}
ah.ModalFocusScope = N0e;
var dB = {},
  ih = {},
  eT = P,
  O0e = x,
  tT = tr,
  B0e = g,
  hs = rn;
const L0e = {
    initial: ({
      offsetX: e,
      offsetY: t,
      transition: r,
      transitionEnd: n,
      delay: o,
    }) => ({
      opacity: 0,
      x: e,
      y: t,
      transition:
        (r == null ? void 0 : r.exit) ??
        hs.withDelay.exit(hs.TRANSITION_DEFAULTS.exit, o),
      transitionEnd: n == null ? void 0 : n.exit,
    }),
    enter: ({ transition: e, transitionEnd: t, delay: r }) => ({
      opacity: 1,
      x: 0,
      y: 0,
      transition:
        (e == null ? void 0 : e.enter) ??
        hs.withDelay.enter(hs.TRANSITION_DEFAULTS.enter, r),
      transitionEnd: t == null ? void 0 : t.enter,
    }),
    exit: ({
      offsetY: e,
      offsetX: t,
      transition: r,
      transitionEnd: n,
      reverse: o,
      delay: a,
    }) => {
      const s = { x: t, y: e };
      return {
        opacity: 0,
        transition:
          (r == null ? void 0 : r.exit) ??
          hs.withDelay.exit(hs.TRANSITION_DEFAULTS.exit, a),
        ...(o
          ? { ...s, transitionEnd: n == null ? void 0 : n.exit }
          : { transitionEnd: { ...s, ...(n == null ? void 0 : n.exit) } }),
      };
    },
  },
  fB = { initial: "initial", animate: "enter", exit: "exit", variants: L0e },
  mB = B0e.forwardRef(function (t, r) {
    const {
        unmountOnExit: n,
        in: o,
        reverse: a = !0,
        className: s,
        offsetX: i = 0,
        offsetY: c = 8,
        transition: l,
        transitionEnd: u,
        delay: d,
        animatePresenceProps: f,
        ...m
      } = t,
      h = n ? o && n : !0,
      p = o || n ? "enter" : "exit",
      v = {
        offsetX: i,
        offsetY: c,
        reverse: a,
        transition: l,
        transitionEnd: u,
        delay: d,
      };
    return eT.jsx(tT.AnimatePresence, {
      ...f,
      custom: v,
      children:
        h &&
        eT.jsx(tT.motion.div, {
          ref: r,
          className: O0e.cx("chakra-offset-slide", s),
          custom: v,
          ...fB,
          animate: p,
          ...m,
        }),
    });
  });
mB.displayName = "SlideFade";
ih.SlideFade = mB;
ih.slideFadeConfig = fB;
var ch = {},
  rT = P,
  V0e = x,
  nT = tr,
  z0e = g,
  bd = rn;
const H0e = {
    exit: ({
      reverse: e,
      initialScale: t,
      transition: r,
      transitionEnd: n,
      delay: o,
    }) => ({
      opacity: 0,
      ...(e
        ? { scale: t, transitionEnd: n == null ? void 0 : n.exit }
        : { transitionEnd: { scale: t, ...(n == null ? void 0 : n.exit) } }),
      transition:
        (r == null ? void 0 : r.exit) ??
        bd.withDelay.exit(bd.TRANSITION_DEFAULTS.exit, o),
    }),
    enter: ({ transitionEnd: e, transition: t, delay: r }) => ({
      opacity: 1,
      scale: 1,
      transition:
        (t == null ? void 0 : t.enter) ??
        bd.withDelay.enter(bd.TRANSITION_DEFAULTS.enter, r),
      transitionEnd: e == null ? void 0 : e.enter,
    }),
  },
  hB = { initial: "exit", animate: "enter", exit: "exit", variants: H0e },
  pB = z0e.forwardRef(function (t, r) {
    const {
        unmountOnExit: n,
        in: o,
        reverse: a = !0,
        initialScale: s = 0.95,
        className: i,
        transition: c,
        transitionEnd: l,
        delay: u,
        animatePresenceProps: d,
        ...f
      } = t,
      m = n ? o && n : !0,
      h = o || n ? "enter" : "exit",
      p = {
        initialScale: s,
        reverse: a,
        transition: c,
        transitionEnd: l,
        delay: u,
      };
    return rT.jsx(nT.AnimatePresence, {
      ...d,
      custom: p,
      children:
        m &&
        rT.jsx(nT.motion.div, {
          ref: r,
          className: V0e.cx("chakra-offset-slide", i),
          ...hB,
          animate: h,
          custom: p,
          ...f,
        }),
    });
  });
pB.displayName = "ScaleFade";
ch.ScaleFade = pB;
ch.scaleFadeConfig = hB;
var W0e = P,
  G0e = tr,
  U0e = g,
  Sd = ih,
  K0e = ch,
  q0e = M;
const X0e = {
    slideInBottom: {
      ...Sd.slideFadeConfig,
      custom: { offsetY: 16, reverse: !0 },
    },
    slideInRight: {
      ...Sd.slideFadeConfig,
      custom: { offsetX: 16, reverse: !0 },
    },
    slideInTop: {
      ...Sd.slideFadeConfig,
      custom: { offsetY: -16, reverse: !0 },
    },
    slideInLeft: {
      ...Sd.slideFadeConfig,
      custom: { offsetX: -16, reverse: !0 },
    },
    scale: {
      ...K0e.scaleFadeConfig,
      custom: { initialScale: 0.95, reverse: !0 },
    },
    none: {},
  },
  Y0e = q0e.chakra(G0e.motion.section),
  Z0e = (e) => X0e[e || "none"],
  vB = U0e.forwardRef((e, t) => {
    const { preset: r, motionProps: n = Z0e(r), ...o } = e;
    return W0e.jsx(Y0e, { ref: t, ...n, ...o });
  });
vB.displayName = "ModalTransition";
dB.ModalTransition = vB;
var Fv = P,
  oT = I,
  Q0e = x,
  jv = Ht,
  J0e = ah,
  eSe = dB,
  tSe = D,
  rSe = M;
const yB = tSe.forwardRef((e, t) => {
  const {
      className: r,
      children: n,
      containerProps: o,
      motionProps: a,
      ...s
    } = e,
    { getDialogProps: i, getDialogContainerProps: c } = jv.useModalContext(),
    l = i(s, t),
    u = c(o),
    d = Q0e.cx("chakra-modal__content", r),
    f = jv.useModalStyles(),
    m = oT.defineStyle({
      display: "flex",
      flexDirection: "column",
      position: "relative",
      width: "100%",
      outline: 0,
      ...f.dialog,
    }),
    h = oT.defineStyle({
      display: "flex",
      width: "100vw",
      height: "$100vh",
      position: "fixed",
      left: 0,
      top: 0,
      ...f.dialogContainer,
    }),
    { motionPreset: p } = jv.useModalContext();
  return Fv.jsx(J0e.ModalFocusScope, {
    children: Fv.jsx(rSe.chakra.div, {
      ...u,
      className: "chakra-modal__content-container",
      tabIndex: -1,
      __css: h,
      children: Fv.jsx(eSe.ModalTransition, {
        preset: p,
        motionProps: a,
        className: d,
        ...l,
        __css: m,
        children: n,
      }),
    }),
  });
});
yB.displayName = "ModalContent";
Cx.ModalContent = yB;
var lh = {},
  nSe = P,
  oSe = x,
  aSe = g,
  aT = Ht,
  sSe = D,
  iSe = M;
const gB = sSe.forwardRef((e, t) => {
  const { className: r, ...n } = e,
    { bodyId: o, setBodyMounted: a } = aT.useModalContext();
  aSe.useEffect(() => (a(!0), () => a(!1)), [a]);
  const s = oSe.cx("chakra-modal__body", r),
    i = aT.useModalStyles();
  return nSe.jsx(iSe.chakra.div, {
    ref: t,
    className: s,
    id: o,
    ...n,
    __css: i.body,
  });
});
gB.displayName = "ModalBody";
lh.ModalBody = gB;
var uh = {},
  cSe = P,
  sT = x,
  iT = Ht,
  lSe = Gl,
  uSe = D;
const bB = uSe.forwardRef((e, t) => {
  const { onClick: r, className: n, ...o } = e,
    { onClose: a } = iT.useModalContext(),
    s = sT.cx("chakra-modal__close-btn", n),
    i = iT.useModalStyles();
  return cSe.jsx(lSe.CloseButton, {
    ref: t,
    __css: i.closeButton,
    className: s,
    onClick: sT.callAllHandlers(r, (c) => {
      c.stopPropagation(), a();
    }),
    ...o,
  });
});
bB.displayName = "ModalCloseButton";
uh.ModalCloseButton = bB;
var dh = {},
  dSe = P,
  fSe = I,
  mSe = x,
  hSe = Ht,
  pSe = D,
  vSe = M;
const SB = pSe.forwardRef((e, t) => {
  const { className: r, ...n } = e,
    o = mSe.cx("chakra-modal__footer", r),
    a = hSe.useModalStyles(),
    s = fSe.defineStyle({
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      ...a.footer,
    });
  return dSe.jsx(vSe.chakra.footer, { ref: t, ...n, __css: s, className: o });
});
SB.displayName = "ModalFooter";
dh.ModalFooter = SB;
var fh = {},
  ySe = P,
  gSe = I,
  bSe = x,
  SSe = g,
  cT = Ht,
  xSe = D,
  $Se = M;
const xB = xSe.forwardRef((e, t) => {
  const { className: r, ...n } = e,
    { headerId: o, setHeaderMounted: a } = cT.useModalContext();
  SSe.useEffect(() => (a(!0), () => a(!1)), [a]);
  const s = bSe.cx("chakra-modal__header", r),
    i = cT.useModalStyles(),
    c = gSe.defineStyle({ flex: 0, ...i.header });
  return ySe.jsx($Se.chakra.header, {
    ref: t,
    className: s,
    id: o,
    ...n,
    __css: c,
  });
});
xB.displayName = "ModalHeader";
fh.ModalHeader = xB;
var mh = {},
  hh = {},
  lT = P,
  wSe = x,
  uT = tr,
  CSe = g,
  xd = rn;
const kSe = {
    enter: ({ transition: e, transitionEnd: t, delay: r } = {}) => ({
      opacity: 1,
      transition:
        (e == null ? void 0 : e.enter) ??
        xd.withDelay.enter(xd.TRANSITION_DEFAULTS.enter, r),
      transitionEnd: t == null ? void 0 : t.enter,
    }),
    exit: ({ transition: e, transitionEnd: t, delay: r } = {}) => ({
      opacity: 0,
      transition:
        (e == null ? void 0 : e.exit) ??
        xd.withDelay.exit(xd.TRANSITION_DEFAULTS.exit, r),
      transitionEnd: t == null ? void 0 : t.exit,
    }),
  },
  $B = { initial: "exit", animate: "enter", exit: "exit", variants: kSe },
  wB = CSe.forwardRef(function (t, r) {
    const {
        unmountOnExit: n,
        in: o,
        className: a,
        transition: s,
        transitionEnd: i,
        delay: c,
        animatePresenceProps: l,
        ...u
      } = t,
      d = o || n ? "enter" : "exit",
      f = n ? o && n : !0,
      m = { transition: s, transitionEnd: i, delay: c };
    return lT.jsx(uT.AnimatePresence, {
      ...l,
      custom: m,
      children:
        f &&
        lT.jsx(uT.motion.div, {
          ref: r,
          className: wSe.cx("chakra-fade", a),
          custom: m,
          ...$B,
          animate: d,
          ...u,
        }),
    });
  });
wB.displayName = "Fade";
hh.Fade = wB;
hh.fadeConfig = $B;
var TSe = P,
  PSe = x,
  RSe = tr,
  dT = Ht,
  ASe = hh,
  _Se = M,
  ISe = D;
const ESe = _Se.chakra(RSe.motion.div),
  CB = ISe.forwardRef((e, t) => {
    const { className: r, transition: n, motionProps: o, ...a } = e,
      s = PSe.cx("chakra-modal__overlay", r),
      c = {
        pos: "fixed",
        left: "0",
        top: "0",
        w: "100vw",
        h: "100vh",
        ...dT.useModalStyles().overlay,
      },
      { motionPreset: l } = dT.useModalContext(),
      u = l === "none" ? {} : ASe.fadeConfig,
      d = o || u;
    return TSe.jsx(ESe, { ...d, __css: c, ref: t, className: s, ...a });
  });
CB.displayName = "ModalOverlay";
mh.ModalOverlay = CB;
var kB = P,
  MSe = Ht,
  FSe = Cx,
  jSe = lh,
  DSe = uh,
  NSe = dh,
  OSe = fh,
  BSe = mh,
  LSe = D;
function VSe(e) {
  const { leastDestructiveRef: t, ...r } = e;
  return kB.jsx(MSe.Modal, { ...r, initialFocusRef: t });
}
const zSe = LSe.forwardRef((e, t) =>
  kB.jsx(FSe.ModalContent, { ref: t, role: "alertdialog", ...e })
);
Xo.AlertDialogBody = jSe.ModalBody;
Xo.AlertDialogCloseButton = DSe.ModalCloseButton;
Xo.AlertDialogFooter = NSe.ModalFooter;
Xo.AlertDialogHeader = OSe.ModalHeader;
Xo.AlertDialogOverlay = BSe.ModalOverlay;
Xo.AlertDialog = VSe;
Xo.AlertDialogContent = zSe;
var mo = {},
  fT = P,
  HSe = x,
  WSe = Ht,
  GSe = lh,
  USe = uh,
  KSe = dh,
  qSe = fh,
  XSe = mh,
  YSe = $r;
const [ZSe, QSe] = HSe.createContext(),
  JSe = {
    start: { ltr: "left", rtl: "right" },
    end: { ltr: "right", rtl: "left" },
  };
function exe(e, t) {
  var r;
  if (e) return ((r = JSe[e]) == null ? void 0 : r[t]) ?? e;
}
function txe(e) {
  var l;
  const {
      isOpen: t,
      onClose: r,
      placement: n = "right",
      children: o,
      ...a
    } = e,
    s = YSe.useTheme(),
    i = (l = s.components) == null ? void 0 : l.Drawer,
    c = exe(n, s.direction);
  return fT.jsx(ZSe, {
    value: { placement: c },
    children: fT.jsx(WSe.Modal, {
      isOpen: t,
      onClose: r,
      styleConfig: i,
      ...a,
      children: o,
    }),
  });
}
mo.DrawerBody = GSe.ModalBody;
mo.DrawerCloseButton = USe.ModalCloseButton;
mo.DrawerFooter = KSe.ModalFooter;
mo.DrawerHeader = qSe.ModalHeader;
mo.DrawerOverlay = XSe.ModalOverlay;
mo.Drawer = txe;
mo.useDrawerContext = QSe;
var TB = {},
  kx = {},
  mT = P,
  rxe = x,
  hT = tr,
  nxe = g,
  zs = rn;
const pT = {
    exit: { duration: 0.15, ease: zs.TRANSITION_EASINGS.easeInOut },
    enter: { type: "spring", damping: 25, stiffness: 180 },
  },
  oxe = {
    exit: ({ direction: e, transition: t, transitionEnd: r, delay: n }) => {
      const { exit: o } = zs.getSlideTransition({ direction: e });
      return {
        ...o,
        transition:
          (t == null ? void 0 : t.exit) ?? zs.withDelay.exit(pT.exit, n),
        transitionEnd: r == null ? void 0 : r.exit,
      };
    },
    enter: ({ direction: e, transitionEnd: t, transition: r, delay: n }) => {
      const { enter: o } = zs.getSlideTransition({ direction: e });
      return {
        ...o,
        transition:
          (r == null ? void 0 : r.enter) ?? zs.withDelay.enter(pT.enter, n),
        transitionEnd: t == null ? void 0 : t.enter,
      };
    },
  },
  PB = nxe.forwardRef(function (t, r) {
    const {
        direction: n = "right",
        style: o,
        unmountOnExit: a,
        in: s,
        className: i,
        transition: c,
        transitionEnd: l,
        delay: u,
        motionProps: d,
        animatePresenceProps: f,
        ...m
      } = t,
      h = zs.getSlideTransition({ direction: n }),
      p = Object.assign({ position: "fixed" }, h.position, o),
      v = a ? s && a : !0,
      b = s || a ? "enter" : "exit",
      y = { transitionEnd: l, transition: c, direction: n, delay: u };
    return mT.jsx(hT.AnimatePresence, {
      ...f,
      custom: y,
      children:
        v &&
        mT.jsx(hT.motion.div, {
          ...m,
          ref: r,
          initial: "exit",
          className: rxe.cx("chakra-slide", i),
          animate: b,
          exit: "exit",
          custom: y,
          variants: oxe,
          style: p,
          ...d,
        }),
    });
  });
PB.displayName = "Slide";
kx.Slide = PB;
var Dv = P,
  axe = x,
  sxe = mo,
  vT = Ht,
  ixe = ah,
  cxe = kx,
  RB = M,
  lxe = D;
const uxe = RB.chakra(cxe.Slide),
  AB = lxe.forwardRef((e, t) => {
    const {
        className: r,
        children: n,
        motionProps: o,
        containerProps: a,
        ...s
      } = e,
      {
        getDialogProps: i,
        getDialogContainerProps: c,
        isOpen: l,
      } = vT.useModalContext(),
      u = i(s, t),
      d = c(a),
      f = axe.cx("chakra-modal__content", r),
      m = vT.useModalStyles(),
      h = {
        display: "flex",
        flexDirection: "column",
        position: "relative",
        width: "100%",
        outline: 0,
        ...m.dialog,
      },
      p = {
        display: "flex",
        width: "100vw",
        height: "$100vh",
        position: "fixed",
        left: 0,
        top: 0,
        ...m.dialogContainer,
      },
      { placement: v } = sxe.useDrawerContext();
    return Dv.jsx(ixe.ModalFocusScope, {
      children: Dv.jsx(RB.chakra.div, {
        ...d,
        className: "chakra-modal__content-container",
        __css: p,
        children: Dv.jsx(uxe, {
          motionProps: o,
          direction: v,
          in: l,
          className: f,
          ...u,
          __css: h,
          children: n,
        }),
      }),
    });
  });
AB.displayName = "DrawerContent";
TB.DrawerContent = AB;
var Yo = {},
  Tx = {},
  _f = P,
  _B = Dr;
const dxe = (e) =>
    _f.jsx(_B.Icon, {
      viewBox: "0 0 24 24",
      ...e,
      children: _f.jsx("path", {fill: "currentColor",
        d: "M21,5H3C2.621,5,2.275,5.214,2.105,5.553C1.937,5.892,1.973,6.297,2.2,6.6l9,12 c0.188,0.252,0.485,0.4,0.8,0.4s0.611-0.148,0.8-0.4l9-12c0.228-0.303,0.264-0.708,0.095-1.047C21.725,5.214,21.379,5,21,5z",
      }),
    }),
  fxe = (e) =>
    _f.jsx(_B.Icon, {
      viewBox: "0 0 24 24",
      ...e,
      children: _f.jsx("path", {fill: "currentColor",
        d: "M12.8,5.4c-0.377-0.504-1.223-0.504-1.6,0l-9,12c-0.228,0.303-0.264,0.708-0.095,1.047 C2.275,18.786,2.621,19,3,19h18c0.379,0,0.725-0.214,0.895-0.553c0.169-0.339,0.133-0.744-0.095-1.047L12.8,5.4z",
      }),
    });
Tx.TriangleDownIcon = dxe;
Tx.TriangleUpIcon = fxe;
var Px = {},
  IB = {},
  mxe = g;
function hxe(e, t, r, n) {
  mxe.useEffect(() => {
    if (!e.current || !n) return;
    const o = e.current.ownerDocument.defaultView ?? window,
      a = Array.isArray(t) ? t : [t],
      s = new o.MutationObserver((i) => {
        for (const c of i)
          c.type === "attributes" &&
            c.attributeName &&
            a.includes(c.attributeName) &&
            r(c);
      });
    return (
      s.observe(e.current, { attributes: !0, attributeFilter: a }),
      () => s.disconnect()
    );
  });
}
IB.useAttributeObserver = hxe;
var EB = {},
  pxe = le,
  $o = g;
const vxe = 50,
  yT = 300;
function yxe(e, t) {
  const [r, n] = $o.useState(!1),
    [o, a] = $o.useState(null),
    [s, i] = $o.useState(!0),
    c = $o.useRef(null),
    l = () => clearTimeout(c.current);
  pxe.useInterval(
    () => {
      o === "increment" && e(), o === "decrement" && t();
    },
    r ? vxe : null
  );
  const u = $o.useCallback(() => {
      s && e(),
        (c.current = setTimeout(() => {
          i(!1), n(!0), a("increment");
        }, yT));
    }, [e, s]),
    d = $o.useCallback(() => {
      s && t(),
        (c.current = setTimeout(() => {
          i(!1), n(!0), a("decrement");
        }, yT));
    }, [t, s]),
    f = $o.useCallback(() => {
      i(!0), n(!1), l();
    }, []);
  return (
    $o.useEffect(() => () => l(), []),
    { up: u, down: d, stop: f, isSpinning: r }
  );
}
EB.useSpinner = yxe;
var Pr = le,
  lr = x,
  tt = g,
  gT = IB,
  gxe = EB;
const bxe = /^[Ee0-9+\-.]$/;
function Sxe(e) {
  return bxe.test(e);
}
function xxe(e, t) {
  if (e.key == null) return !0;
  const r = e.ctrlKey || e.altKey || e.metaKey;
  return !(e.key.length === 1) || r ? !0 : t(e.key);
}
function $xe(e = {}) {
  const {
      focusInputOnChange: t = !0,
      clampValueOnBlur: r = !0,
      keepWithinRange: n = !0,
      min: o = Number.MIN_SAFE_INTEGER,
      max: a = Number.MAX_SAFE_INTEGER,
      step: s = 1,
      isReadOnly: i,
      isDisabled: c,
      isRequired: l,
      isInvalid: u,
      pattern: d = "[0-9]*(.[0-9]+)?",
      inputMode: f = "decimal",
      allowMouseWheel: m,
      id: h,
      onChange: p,
      precision: v,
      name: b,
      "aria-describedby": y,
      "aria-label": S,
      "aria-labelledby": w,
      onFocus: C,
      onBlur: T,
      onInvalid: k,
      getAriaValueText: R,
      isValidCharacter: E,
      format: _,
      parse: N,
      ...G
    } = e,
    B = Pr.useCallbackRef(C),
    z = Pr.useCallbackRef(T),
    Y = Pr.useCallbackRef(k),
    W = Pr.useCallbackRef(E ?? Sxe),
    j = Pr.useCallbackRef(R),
    O = Pr.useCounter(e),
    { update: K, increment: ve, decrement: re } = O,
    [ue, L] = tt.useState(!1),
    V = !(i || c),
    ee = tt.useRef(null),
    pe = tt.useRef(null),
    xe = tt.useRef(null),
    Ce = tt.useRef(null),
    X = tt.useCallback((H) => H.split("").filter(W).join(""), [W]),
    de = tt.useCallback((H) => (N == null ? void 0 : N(H)) ?? H, [N]),
    Q = tt.useCallback(
      (H) => ((_ == null ? void 0 : _(H)) ?? H).toString(),
      [_]
    );
  Pr.useUpdateEffect(() => {
    (O.valueAsNumber > a || O.valueAsNumber < o) &&
      (Y == null || Y("rangeOverflow", Q(O.value), O.valueAsNumber));
  }, [O.valueAsNumber, O.value, Q, Y]),
    Pr.useSafeLayoutEffect(() => {
      if (!ee.current) return;
      if (ee.current.value != O.value) {
        const Ee = de(ee.current.value);
        O.setValue(X(Ee));
      }
    }, [de, X]);
  const J = tt.useCallback(
      (H = s) => {
        V && ve(H);
      },
      [ve, V, s]
    ),
    ne = tt.useCallback(
      (H = s) => {
        V && re(H);
      },
      [re, V, s]
    ),
    we = gxe.useSpinner(J, ne);
  gT.useAttributeObserver(xe, "disabled", we.stop, we.isSpinning),
    gT.useAttributeObserver(Ce, "disabled", we.stop, we.isSpinning);
  const ae = tt.useCallback(
      (H) => {
        if (H.nativeEvent.isComposing) return;
        const q = de(H.currentTarget.value);
        K(X(q)),
          (pe.current = {
            start: H.currentTarget.selectionStart,
            end: H.currentTarget.selectionEnd,
          });
      },
      [K, X, de]
    ),
    ye = tt.useCallback(
      (H) => {
        var Ee;
        B == null || B(H),
          pe.current &&
            ((H.currentTarget.selectionStart =
              pe.current.start ??
              ((Ee = H.currentTarget.value) == null ? void 0 : Ee.length)),
            (H.currentTarget.selectionEnd =
              pe.current.end ?? H.currentTarget.selectionStart));
      },
      [B]
    ),
    U = tt.useCallback(
      (H) => {
        if (H.nativeEvent.isComposing) return;
        xxe(H, W) || H.preventDefault();
        const Ee = be(H) * s,
          q = H.key,
          nt = {
            ArrowUp: () => J(Ee),
            ArrowDown: () => ne(Ee),
            Home: () => K(o),
            End: () => K(a),
          }[q];
        nt && (H.preventDefault(), nt(H));
      },
      [W, s, J, ne, K, o, a]
    ),
    be = (H) => {
      let Ee = 1;
      return (
        (H.metaKey || H.ctrlKey) && (Ee = 0.1), H.shiftKey && (Ee = 10), Ee
      );
    },
    ge = tt.useMemo(() => {
      const H = j == null ? void 0 : j(O.value);
      if (H != null) return H;
      const Ee = O.value.toString();
      return Ee || void 0;
    }, [O.value, j]),
    Te = tt.useCallback(() => {
      let H = O.value;
      if (O.value === "") return;
      /^[eE]/.test(O.value.toString())
        ? O.setValue("")
        : (O.valueAsNumber < o && (H = o),
          O.valueAsNumber > a && (H = a),
          O.cast(H));
    }, [O, a, o]),
    He = tt.useCallback(() => {
      L(!1), r && Te();
    }, [r, L, Te]),
    Ue = tt.useCallback(() => {
      t &&
        requestAnimationFrame(() => {
          var H;
          (H = ee.current) == null || H.focus();
        });
    }, [t]),
    Ze = tt.useCallback(
      (H) => {
        H.preventDefault(), we.up(), Ue();
      },
      [Ue, we]
    ),
    wt = tt.useCallback(
      (H) => {
        H.preventDefault(), we.down(), Ue();
      },
      [Ue, we]
    );
  Pr.useEventListener(
    () => ee.current,
    "wheel",
    (H) => {
      var jt;
      const q =
        (((jt = ee.current) == null ? void 0 : jt.ownerDocument) ?? document)
          .activeElement === ee.current;
      if (!m || !q) return;
      H.preventDefault();
      const oe = be(H) * s,
        nt = Math.sign(H.deltaY);
      nt === -1 ? J(oe) : nt === 1 && ne(oe);
    },
    { passive: !1 }
  );
  const nr = tt.useCallback(
      (H = {}, Ee = null) => {
        const q = c || (n && O.isAtMax);
        return {
          ...H,
          ref: Pr.mergeRefs(Ee, xe),
          role: "button",
          tabIndex: -1,
          onPointerDown: lr.callAllHandlers(H.onPointerDown, (oe) => {
            oe.button !== 0 || q || Ze(oe);
          }),
          onPointerLeave: lr.callAllHandlers(H.onPointerLeave, we.stop),
          onPointerUp: lr.callAllHandlers(H.onPointerUp, we.stop),
          disabled: q,
          "aria-disabled": lr.ariaAttr(q),
        };
      },
      [O.isAtMax, n, Ze, we.stop, c]
    ),
    or = tt.useCallback(
      (H = {}, Ee = null) => {
        const q = c || (n && O.isAtMin);
        return {
          ...H,
          ref: Pr.mergeRefs(Ee, Ce),
          role: "button",
          tabIndex: -1,
          onPointerDown: lr.callAllHandlers(H.onPointerDown, (oe) => {
            oe.button !== 0 || q || wt(oe);
          }),
          onPointerLeave: lr.callAllHandlers(H.onPointerLeave, we.stop),
          onPointerUp: lr.callAllHandlers(H.onPointerUp, we.stop),
          disabled: q,
          "aria-disabled": lr.ariaAttr(q),
        };
      },
      [O.isAtMin, n, wt, we.stop, c]
    ),
    wr = tt.useCallback(
      (H = {}, Ee = null) => ({
        name: b,
        inputMode: f,
        type: "text",
        pattern: d,
        "aria-labelledby": w,
        "aria-label": S,
        "aria-describedby": y,
        id: h,
        disabled: c,
        role: "spinbutton",
        ...H,
        readOnly: H.readOnly ?? i,
        "aria-readonly": H.readOnly ?? i,
        "aria-required": H.required ?? l,
        required: H.required ?? l,
        ref: Pr.mergeRefs(ee, Ee),
        value: Q(O.value),
        "aria-valuemin": o,
        "aria-valuemax": a,
        "aria-valuenow": Number.isNaN(O.valueAsNumber)
          ? void 0
          : O.valueAsNumber,
        "aria-invalid": lr.ariaAttr(u ?? O.isOutOfRange),
        "aria-valuetext": ge,
        autoComplete: "off",
        autoCorrect: "off",
        onChange: lr.callAllHandlers(H.onChange, ae),
        onKeyDown: lr.callAllHandlers(H.onKeyDown, U),
        onFocus: lr.callAllHandlers(H.onFocus, ye, () => L(!0)),
        onBlur: lr.callAllHandlers(H.onBlur, z, He),
      }),
      [
        b,
        f,
        d,
        w,
        S,
        Q,
        y,
        h,
        c,
        l,
        i,
        u,
        O.value,
        O.valueAsNumber,
        O.isOutOfRange,
        o,
        a,
        ge,
        ae,
        U,
        ye,
        z,
        He,
      ]
    );
  return {
    value: Q(O.value),
    valueAsNumber: O.valueAsNumber,
    isFocused: ue,
    isDisabled: c,
    isReadOnly: i,
    getIncrementButtonProps: nr,
    getDecrementButtonProps: or,
    getInputProps: wr,
    htmlProps: G,
  };
}
Px.useNumberInput = $xe;
var qn = P,
  wxe = I,
  ph = x,
  Cxe = g,
  MB = Tx,
  kxe = Px,
  Txe = Ko,
  ou = D,
  vh = M,
  Pxe = he;
const [Rxe, au] = ph.createContext({
    name: "NumberInputStylesContext",
    errorMessage: `useNumberInputStyles returned is 'undefined'. Seems you forgot to wrap the components in "<NumberInput />" `,
  }),
  [Axe, Rx] = ph.createContext({
    name: "NumberInputContext",
    errorMessage:
      "useNumberInputContext: `context` is undefined. Seems you forgot to wrap number-input's components within <NumberInput />",
  }),
  FB = ou.forwardRef(function (t, r) {
    const n = Pxe.useMultiStyleConfig("NumberInput", t),
      o = wxe.omitThemingProps(t),
      a = Txe.useFormControlProps(o),
      { htmlProps: s, ...i } = kxe.useNumberInput(a),
      c = Cxe.useMemo(() => i, [i]);
    return qn.jsx(Axe, {
      value: c,
      children: qn.jsx(Rxe, {
        value: n,
        children: qn.jsx(vh.chakra.div, {
          ...s,
          ref: r,
          className: ph.cx("chakra-numberinput", t.className),
          __css: { position: "relative", zIndex: 0, ...n.root },
        }),
      }),
    });
  });
FB.displayName = "NumberInput";
const jB = ou.forwardRef(function (t, r) {
  const n = au();
  return qn.jsx(vh.chakra.div, {
    "aria-hidden": !0,
    ref: r,
    ...t,
    __css: {
      display: "flex",
      flexDirection: "column",
      position: "absolute",
      top: "0",
      insetEnd: "0px",
      margin: "1px",
      height: "calc(100% - 2px)",
      zIndex: 1,
      ...n.stepperGroup,
    },
  });
});
jB.displayName = "NumberInputStepper";
const DB = ou.forwardRef(function (t, r) {
  const { getInputProps: n } = Rx(),
    o = n(t, r),
    a = au();
  return qn.jsx(vh.chakra.input, {
    ...o,
    className: ph.cx("chakra-numberinput__field", t.className),
    __css: { width: "100%", ...a.field },
  });
});
DB.displayName = "NumberInputField";
const Ax = vh.chakra("div", {
    baseStyle: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
      transitionProperty: "common",
      transitionDuration: "normal",
      userSelect: "none",
      cursor: "pointer",
      lineHeight: "normal",
    },
  }),
  NB = ou.forwardRef(function (t, r) {
    const n = au(),
      { getDecrementButtonProps: o } = Rx(),
      a = o(t, r);
    return qn.jsx(Ax, {
      ...a,
      __css: n.stepper,
      children: t.children ?? qn.jsx(MB.TriangleDownIcon, {}),
    });
  });
NB.displayName = "NumberDecrementStepper";
const OB = ou.forwardRef(function (t, r) {
  const { getIncrementButtonProps: n } = Rx(),
    o = n(t, r),
    a = au();
  return qn.jsx(Ax, {
    ...o,
    __css: a.stepper,
    children: t.children ?? qn.jsx(MB.TriangleUpIcon, {}),
  });
});
OB.displayName = "NumberIncrementStepper";
Yo.NumberDecrementStepper = NB;
Yo.NumberIncrementStepper = OB;
Yo.NumberInput = FB;
Yo.NumberInputField = DB;
Yo.NumberInputStepper = jB;
Yo.StyledStepper = Ax;
Yo.useNumberInputStyles = au;
var _x = {},
  Fn = {},
  BB = le,
  ws = x,
  Ln = g,
  _xe = Fi;
const [Ixe, Exe, LB, VB] = _xe.createDescendantContext(),
  [Mxe, zB] = ws.createContext({
    name: "PinInputContext",
    errorMessage:
      "usePinInputContext: `context` is undefined. Seems you forgot to place all pin input fields within `<PinInput />`",
  }),
  bT = (e) => (e == null ? void 0 : e.split(""));
function ST(e, t) {
  return (t === "alphanumeric" ? /^[a-zA-Z0-9]+$/i : /^[0-9]+$/).test(e);
}
function Fxe(e = {}) {
  const {
      autoFocus: t,
      value: r,
      defaultValue: n,
      onChange: o,
      onComplete: a,
      placeholder: s = "○",
      manageFocus: i = !0,
      otp: c = !1,
      id: l,
      isDisabled: u,
      isInvalid: d,
      type: f = "number",
      mask: m,
    } = e,
    h = Ln.useId(),
    p = l ?? `pin-input-${h}`,
    v = LB(),
    [b, y] = Ln.useState(!0),
    [S, w] = Ln.useState(-1),
    [C, T] = BB.useControllableState({
      defaultValue: bT(n) || [],
      value: bT(r),
      onChange: (G) => (o == null ? void 0 : o(G.join(""))),
    });
  Ln.useEffect(() => {
    if (t) {
      const G = v.first();
      G &&
        requestAnimationFrame(() => {
          G.node.focus();
        });
    }
  }, [v]);
  const k = Ln.useCallback(
      (G) => {
        if (!b || !i) return;
        const B = v.next(G, !1);
        B &&
          requestAnimationFrame(() => {
            B.node.focus();
          });
      },
      [v, b, i]
    ),
    R = Ln.useCallback(
      (G, B, z = !0) => {
        const Y = [...C];
        (Y[B] = G),
          T(Y),
          G !== "" &&
          Y.length === v.count() &&
          Y.every((j) => j != null && j !== "")
            ? a == null || a(Y.join(""))
            : z && k(B);
      },
      [C, T, k, a, v]
    ),
    E = Ln.useCallback(() => {
      var z;
      const G = Array(v.count()).fill("");
      T(G);
      const B = v.first();
      (z = B == null ? void 0 : B.node) == null || z.focus();
    }, [v, T]),
    _ = Ln.useCallback((G, B) => {
      let z = B;
      return (
        (G == null ? void 0 : G.length) > 0 &&
          (G[0] === B.charAt(0)
            ? (z = B.charAt(1))
            : G[0] === B.charAt(1) && (z = B.charAt(0))),
        z
      );
    }, []);
  return {
    getInputProps: Ln.useCallback(
      (G) => {
        const { index: B, ...z } = G,
          Y = (re) => {
            const ue = re.currentTarget.value,
              L = C[B],
              V = _(L, ue);
            if (V === "") {
              R("", B);
              return;
            }
            if (ue.length > 2) {
              if (ST(ue, f)) {
                const ee = ue.split("").filter((pe, xe) => xe < v.count());
                T(ee), ee.length === v.count() && (a == null || a(ee.join("")));
              }
            } else ST(V, f) && R(V, B), y(!0);
          },
          W = (re) => {
            var ue;
            if (re.key === "Backspace" && i)
              if (re.currentTarget.value === "") {
                const L = v.prev(B, !1);
                L &&
                  (R("", B - 1, !1),
                  (ue = L.node) == null || ue.focus(),
                  y(!0));
              } else y(!1);
          },
          j = () => {
            w(B);
          },
          O = () => {
            w(-1);
          },
          K = S === B;
        return {
          "aria-label": "Please enter your pin code",
          inputMode: f === "number" ? "numeric" : "text",
          type: m ? "password" : f === "number" ? "tel" : "text",
          ...z,
          id: `${p}-${B}`,
          disabled: u,
          "aria-invalid": ws.ariaAttr(d),
          onChange: ws.callAllHandlers(z.onChange, Y),
          onKeyDown: ws.callAllHandlers(z.onKeyDown, W),
          onFocus: ws.callAllHandlers(z.onFocus, j),
          onBlur: ws.callAllHandlers(z.onBlur, O),
          value: C[B] || "",
          autoComplete: c ? "one-time-code" : "off",
          placeholder: K ? "" : s,
        };
      },
      [v, S, _, p, u, m, d, i, a, c, s, R, T, f, C]
    ),
    id: p,
    descendants: v,
    values: C,
    setValue: R,
    setValues: T,
    clear: E,
  };
}
function jxe(e = {}, t = null) {
  const { getInputProps: r } = zB(),
    { index: n, register: o } = VB();
  return r({ ...e, ref: BB.mergeRefs(o, t), index: e.index ?? n });
}
Fn.PinInputDescendantsProvider = Ixe;
Fn.PinInputProvider = Mxe;
Fn.usePinInput = Fxe;
Fn.usePinInputContext = zB;
Fn.usePinInputDescendant = VB;
Fn.usePinInputDescendants = LB;
Fn.usePinInputDescendantsContext = Exe;
Fn.usePinInputField = jxe;
var ag = P,
  Dxe = I,
  HB = x,
  Nxe = g,
  ef = Fn,
  Oxe = D,
  Bxe = he,
  Lxe = M;
function WB(e) {
  const t = Bxe.useStyleConfig("PinInput", e),
    { children: r, ...n } = Dxe.omitThemingProps(e),
    { descendants: o, ...a } = ef.usePinInput(n),
    s = HB.getValidChildren(r).map((i) => Nxe.cloneElement(i, { __css: t }));
  return ag.jsx(ef.PinInputDescendantsProvider, {
    value: o,
    children: ag.jsx(ef.PinInputProvider, { value: a, children: s }),
  });
}
WB.displayName = "PinInput";
const GB = Oxe.forwardRef(function (t, r) {
  const n = ef.usePinInputField(t, r);
  return ag.jsx(Lxe.chakra.input, {
    ...n,
    className: HB.cx("chakra-pin-input", t.className),
  });
});
GB.displayName = "PinInputField";
_x.PinInput = WB;
_x.PinInputField = GB;
var UB = {},
  Wt = {},
  KB = x;
const [Vxe, zxe] = KB.createContext({
    name: "PopoverContext",
    errorMessage:
      "usePopoverContext: `context` is undefined. Seems you forgot to wrap all popover components within `<Popover />`",
  }),
  [Hxe, Wxe] = KB.createContext({
    name: "PopoverStylesContext",
    errorMessage: `usePopoverStyles returned is 'undefined'. Seems you forgot to wrap the components in "<Popover />" `,
  });
Wt.PopoverProvider = Vxe;
Wt.PopoverStylesProvider = Hxe;
Wt.usePopoverContext = zxe;
Wt.usePopoverStyles = Wxe;
var Ix = {},
  Gr = le,
  ur = x,
  ot = g,
  Gxe = eu,
  Nv = Mn;
const ps = { click: "click", hover: "hover" };
function Uxe(e = {}) {
  const {
      closeOnBlur: t = !0,
      closeOnEsc: r = !0,
      initialFocusRef: n,
      id: o,
      returnFocusOnClose: a = !0,
      autoFocus: s = !0,
      arrowSize: i,
      arrowShadowColor: c,
      trigger: l = ps.click,
      openDelay: u = 200,
      closeDelay: d = 200,
      isLazy: f,
      lazyBehavior: m = "unmount",
      computePositionOnMount: h,
      ...p
    } = e,
    { isOpen: v, onClose: b, onOpen: y, onToggle: S } = Gr.useDisclosure(e),
    [w, C] = ot.useState(a);
  ot.useEffect(() => C(a), [a]);
  const T = ot.useRef(null),
    k = ot.useRef(null),
    R = ot.useRef(null),
    E = ot.useRef(!1),
    _ = ot.useRef(!1);
  v && (_.current = !0);
  const [N, G] = ot.useState(!1),
    [B, z] = ot.useState(!1),
    Y = ot.useId(),
    W = o ?? Y,
    [j, O, K, ve] = [
      "popover-trigger",
      "popover-content",
      "popover-header",
      "popover-body",
    ].map((U) => `${U}-${W}`),
    {
      referenceRef: re,
      getArrowProps: ue,
      getPopperProps: L,
      getArrowInnerProps: V,
      forceUpdate: ee,
    } = Gxe.usePopper({ ...p, enabled: v || !!h }),
    pe = Gr.useAnimationState({ isOpen: v, ref: R });
  Gr.useFocusOnPointerDown({ enabled: v, ref: k }),
    Gr.useFocusOnHide(R, {
      focusRef: k,
      visible: v,
      shouldFocus: w && l === ps.click,
    }),
    Gr.useFocusOnShow(R, {
      focusRef: n,
      visible: v,
      shouldFocus: s && l === ps.click,
    }),
    Gr.useOutsideClick({
      enabled: v && t,
      ref: R,
      handler(U) {
        var ge;
        const be = ((ge = U.composedPath) == null ? void 0 : ge.call(U)[0]) ?? [
          U.target,
        ];
        $d(k.current, be) || (be && C(!ur.isFocusable(be)), b());
      },
    });
  const xe = ur.lazyDisclosure({
      wasSelected: _.current,
      enabled: f,
      mode: m,
      isSelected: pe.present,
    }),
    Ce = ot.useCallback(
      (U = {}, be = null) => {
        const ge = {
          ...U,
          style: {
            ...U.style,
            transformOrigin: Nv.cssVars.transformOrigin.varRef,
            [Nv.cssVars.arrowSize.var]: i ? `${i}px` : void 0,
            [Nv.cssVars.arrowShadowColor.var]: c,
          },
          ref: Gr.mergeRefs(R, be),
          children: xe ? U.children : null,
          id: O,
          tabIndex: -1,
          role: "dialog",
          onKeyDown: ur.callAllHandlers(U.onKeyDown, (Te) => {
            Te.nativeEvent.isComposing ||
              (r &&
                Te.key === "Escape" &&
                (Te.preventDefault(), Te.stopPropagation(), b()));
          }),
          onBlur: ur.callAllHandlers(U.onBlur, (Te) => {
            const He = xT(Te),
              Ue = $d(R.current, He),
              Ze = $d(k.current, He),
              wt = !Ue && !Ze;
            He && C(!ur.isFocusable(He)), v && t && wt && b();
          }),
          "aria-labelledby": N ? K : void 0,
          "aria-describedby": B ? ve : void 0,
        };
        return (
          l === ps.hover &&
            ((ge.role = "tooltip"),
            (ge.onMouseEnter = ur.callAllHandlers(U.onMouseEnter, () => {
              E.current = !0;
            })),
            (ge.onMouseLeave = ur.callAllHandlers(U.onMouseLeave, (Te) => {
              Te.nativeEvent.relatedTarget !== null &&
                ((E.current = !1), setTimeout(() => b(), d));
            }))),
          ge
        );
      },
      [xe, O, N, K, B, ve, l, r, b, v, t, d, c, i]
    ),
    X = ot.useCallback(
      (U = {}, be = null) =>
        L(
          { ...U, style: { visibility: v ? "visible" : "hidden", ...U.style } },
          be
        ),
      [v, L]
    ),
    de = ot.useCallback(
      (U, be = null) => ({ ...U, ref: Gr.mergeRefs(be, T, re) }),
      [T, re]
    ),
    Q = ot.useRef(void 0),
    J = ot.useRef(void 0),
    ne = ot.useCallback(
      (U) => {
        T.current == null && re(U);
      },
      [re]
    ),
    we = ot.useCallback(
      (U = {}, be = null) => {
        const ge = {
          ...U,
          ref: Gr.mergeRefs(k, be, ne),
          id: j,
          "aria-haspopup": "dialog",
          "aria-expanded": v,
          "aria-controls": O,
        };
        return (
          l === ps.click && (ge.onClick = ur.callAllHandlers(U.onClick, S)),
          l === ps.hover &&
            ((ge.onFocus = ur.callAllHandlers(U.onFocus, () => {
              Q.current === void 0 && y();
            })),
            (ge.onBlur = ur.callAllHandlers(U.onBlur, (Te) => {
              const He = xT(Te),
                Ue = !$d(R.current, He);
              v && t && Ue && b();
            })),
            (ge.onKeyDown = ur.callAllHandlers(U.onKeyDown, (Te) => {
              Te.key === "Escape" && b();
            })),
            (ge.onMouseEnter = ur.callAllHandlers(U.onMouseEnter, () => {
              (E.current = !0), (Q.current = window.setTimeout(() => y(), u));
            })),
            (ge.onMouseLeave = ur.callAllHandlers(U.onMouseLeave, () => {
              (E.current = !1),
                Q.current && (clearTimeout(Q.current), (Q.current = void 0)),
                (J.current = window.setTimeout(() => {
                  E.current === !1 && b();
                }, d));
            }))),
          ge
        );
      },
      [j, v, O, l, ne, S, y, t, b, u, d]
    );
  ot.useEffect(
    () => () => {
      Q.current && clearTimeout(Q.current),
        J.current && clearTimeout(J.current);
    },
    []
  );
  const ae = ot.useCallback(
      (U = {}, be = null) => ({
        ...U,
        id: K,
        ref: Gr.mergeRefs(be, (ge) => {
          G(!!ge);
        }),
      }),
      [K]
    ),
    ye = ot.useCallback(
      (U = {}, be = null) => ({
        ...U,
        id: ve,
        ref: Gr.mergeRefs(be, (ge) => {
          z(!!ge);
        }),
      }),
      [ve]
    );
  return {
    forceUpdate: ee,
    isOpen: v,
    onAnimationComplete: pe.onComplete,
    onClose: b,
    getAnchorProps: de,
    getArrowProps: ue,
    getArrowInnerProps: V,
    getPopoverPositionerProps: X,
    getPopoverProps: Ce,
    getTriggerProps: we,
    getHeaderProps: ae,
    getBodyProps: ye,
  };
}
function $d(e, t) {
  return e === t || (e == null ? void 0 : e.contains(t));
}
function xT(e) {
  const t = e.currentTarget.ownerDocument.activeElement;
  return e.relatedTarget ?? t;
}
Ix.usePopover = Uxe;
var $T = P,
  Kxe = I,
  qxe = x,
  wT = Wt,
  Xxe = Ix,
  Yxe = $r,
  Zxe = he;
function qB(e) {
  const t = Zxe.useMultiStyleConfig("Popover", e),
    { children: r, ...n } = Kxe.omitThemingProps(e),
    o = Yxe.useTheme(),
    a = Xxe.usePopover({ ...n, direction: o.direction });
  return $T.jsx(wT.PopoverProvider, {
    value: a,
    children: $T.jsx(wT.PopoverStylesProvider, {
      value: t,
      children: qxe.runIfFn(r, {
        isOpen: a.isOpen,
        onClose: a.onClose,
        forceUpdate: a.forceUpdate,
      }),
    }),
  });
}
qB.displayName = "Popover";
UB.Popover = qB;
var XB = {},
  yh = {},
  Qxe = g;
function Jxe(e) {
  var t = Object.create(null);
  return (
    e &&
      Object.keys(e).forEach(function (r) {
        if (r !== "default") {
          var n = Object.getOwnPropertyDescriptor(e, r);
          Object.defineProperty(
            t,
            r,
            n.get
              ? n
              : {
                  enumerable: !0,
                  get: function () {
                    return e[r];
                  },
                }
          );
        }
      }),
    (t.default = e),
    Object.freeze(t)
  );
}
var e$e = Jxe(Qxe);
function t$e(e) {
  var r;
  const t = e$e.version;
  return typeof t != "string" || t.startsWith("18.")
    ? e == null
      ? void 0
      : e.ref
    : (r = e == null ? void 0 : e.props) == null
    ? void 0
    : r.ref;
}
yh.getElementRef = t$e;
var CT = P,
  kT = g,
  r$e = Wt,
  n$e = yh;
function YB(e) {
  const t = kT.Children.only(e.children),
    { getAnchorProps: r } = r$e.usePopoverContext();
  return CT.jsx(CT.Fragment, {
    children: kT.cloneElement(t, r(t.props, n$e.getElementRef(t))),
  });
}
YB.displayName = "PopoverAnchor";
XB.PopoverAnchor = YB;
var ZB = {},
  TT = P,
  o$e = x,
  PT = Wt,
  RT = M;
const Ov = (e, t) => (t ? `${e}.${t}, ${t}` : void 0);
function QB(e) {
  const {
      bg: t,
      bgColor: r,
      backgroundColor: n,
      shadow: o,
      boxShadow: a,
      shadowColor: s,
      ...i
    } = e,
    { getArrowProps: c, getArrowInnerProps: l } = PT.usePopoverContext(),
    u = PT.usePopoverStyles(),
    d = t ?? r ?? n,
    f = o ?? a;
  return TT.jsx(RT.chakra.div, {
    ...c(),
    className: "chakra-popover__arrow-positioner",
    children: TT.jsx(RT.chakra.div, {
      className: o$e.cx("chakra-popover__arrow", e.className),
      ...l(i),
      __css: {
        "--popper-arrow-shadow-color": Ov("colors", s),
        "--popper-arrow-bg": Ov("colors", d),
        "--popper-arrow-shadow": Ov("shadows", f),
        ...u.arrow,
      },
    }),
  });
}
QB.displayName = "PopoverArrow";
ZB.PopoverArrow = QB;
var JB = {},
  a$e = P,
  s$e = x,
  AT = Wt,
  i$e = D,
  c$e = M;
const eL = i$e.forwardRef(function (t, r) {
  const { getBodyProps: n } = AT.usePopoverContext(),
    o = AT.usePopoverStyles();
  return a$e.jsx(c$e.chakra.div, {
    ...n(t, r),
    className: s$e.cx("chakra-popover__body", t.className),
    __css: o.body,
  });
});
eL.displayName = "PopoverBody";
JB.PopoverBody = eL;
var tL = {},
  l$e = P,
  u$e = x,
  _T = Wt,
  d$e = Gl,
  f$e = D;
const rL = f$e.forwardRef(function (t, r) {
  const { onClose: n } = _T.usePopoverContext(),
    o = _T.usePopoverStyles();
  return l$e.jsx(d$e.CloseButton, {
    size: "sm",
    onClick: n,
    className: u$e.cx("chakra-popover__close-btn", t.className),
    __css: o.closeButton,
    ref: r,
    ...t,
  });
});
rL.displayName = "PopoverCloseButton";
tL.PopoverCloseButton = rL;
var nL = {},
  oL = {},
  m$e = P,
  h$e = tr,
  p$e = Wt,
  v$e = M,
  y$e = D;
function g$e(e) {
  if (e)
    return {
      enter: { ...e.enter, visibility: "visible" },
      exit: { ...e.exit, transitionEnd: { visibility: "hidden" } },
    };
}
const b$e = {
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.1, ease: [0.4, 0, 1, 1] },
    },
    enter: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.15, ease: [0, 0, 0.2, 1] },
    },
  },
  S$e = v$e.chakra(h$e.motion.section),
  aL = y$e.forwardRef(function (t, r) {
    const { variants: n = b$e, ...o } = t,
      { isOpen: a } = p$e.usePopoverContext();
    return m$e.jsx(S$e, {
      ref: r,
      variants: g$e(n),
      initial: !1,
      animate: a ? "enter" : "exit",
      ...o,
    });
  });
aL.displayName = "PopoverTransition";
oL.PopoverTransition = aL;
var IT = P,
  x$e = I,
  ET = x,
  MT = Wt,
  $$e = oL,
  w$e = D,
  C$e = M;
const sL = w$e.forwardRef(function (t, r) {
  const { rootProps: n, motionProps: o, ...a } = t,
    {
      getPopoverProps: s,
      getPopoverPositionerProps: i,
      onAnimationComplete: c,
    } = MT.usePopoverContext(),
    l = MT.usePopoverStyles(),
    u = x$e.defineStyle({
      position: "relative",
      display: "flex",
      flexDirection: "column",
      ...l.content,
    });
  return IT.jsx(C$e.chakra.div, {
    ...i(n),
    __css: l.popper,
    className: "chakra-popover__popper",
    children: IT.jsx($$e.PopoverTransition, {
      ...o,
      ...s(a, r),
      onAnimationComplete: ET.callAll(c, a.onAnimationComplete),
      className: ET.cx("chakra-popover__content", t.className),
      __css: u,
    }),
  });
});
sL.displayName = "PopoverContent";
nL.PopoverContent = sL;
var iL = {},
  k$e = P,
  T$e = x,
  P$e = Wt,
  R$e = M;
function cL(e) {
  const t = P$e.usePopoverStyles();
  return k$e.jsx(R$e.chakra.footer, {
    ...e,
    className: T$e.cx("chakra-popover__footer", e.className),
    __css: t.footer,
  });
}
cL.displayName = "PopoverFooter";
iL.PopoverFooter = cL;
var lL = {},
  A$e = P,
  _$e = x,
  FT = Wt,
  I$e = D,
  E$e = M;
const uL = I$e.forwardRef(function (t, r) {
  const { getHeaderProps: n } = FT.usePopoverContext(),
    o = FT.usePopoverStyles();
  return A$e.jsx(E$e.chakra.header, {
    ...n(t, r),
    className: _$e.cx("chakra-popover__header", t.className),
    __css: o.header,
  });
});
uL.displayName = "PopoverHeader";
lL.PopoverHeader = uL;
var dL = {},
  jT = P,
  DT = g,
  M$e = Wt,
  F$e = yh;
function fL(e) {
  const t = DT.Children.only(e.children),
    { getTriggerProps: r } = M$e.usePopoverContext();
  return jT.jsx(jT.Fragment, {
    children: DT.cloneElement(t, r(t.props, F$e.getElementRef(t))),
  });
}
fL.displayName = "PopoverTrigger";
dL.PopoverTrigger = fL;
var mL = {},
  hL = {},
  j$e = P,
  D$e = M;
const pL = (e) =>
  j$e.jsx(D$e.chakra.circle, {
    cx: 50,
    cy: 50,
    r: 42,
    fill: "transparent",
    ...e,
  });
pL.displayName = "Circle";
hL.Circle = pL;
var Zo = {},
  gh = Vo;
function N$e(e, t, r) {
  return ((e - t) * 100) / (r - t);
}
const O$e = gh.keyframes({
    "0%": { strokeDasharray: "1, 400", strokeDashoffset: "0" },
    "50%": { strokeDasharray: "400, 400", strokeDashoffset: "-100" },
    "100%": { strokeDasharray: "400, 400", strokeDashoffset: "-260" },
  }),
  B$e = gh.keyframes({
    "0%": { transform: "rotate(0deg)" },
    "100%": { transform: "rotate(360deg)" },
  }),
  L$e = gh.keyframes({ "0%": { left: "-40%" }, "100%": { left: "100%" } }),
  V$e = gh.keyframes({
    from: { backgroundPosition: "1rem 0" },
    to: { backgroundPosition: "0 0" },
  });
function z$e(e) {
  const {
      value: t = 0,
      min: r,
      max: n,
      valueText: o,
      getValueText: a,
      isIndeterminate: s,
      role: i = "progressbar",
    } = e,
    c = N$e(t, r, n);
  return {
    bind: {
      "data-indeterminate": s ? "" : void 0,
      "aria-valuemax": n,
      "aria-valuemin": r,
      "aria-valuenow": s ? void 0 : t,
      "aria-valuetext": (() => {
        if (t != null) return typeof a == "function" ? a(t, c) : o;
      })(),
      role: i,
    },
    percent: c,
    value: t,
  };
}
Zo.getProgressProps = z$e;
Zo.progress = L$e;
Zo.rotate = B$e;
Zo.spin = O$e;
Zo.stripe = V$e;
var vL = {},
  H$e = P,
  W$e = Zo,
  G$e = M;
const yL = (e) => {
  const { size: t, isIndeterminate: r, ...n } = e;
  return H$e.jsx(G$e.chakra.svg, {
    viewBox: "0 0 100 100",
    __css: {
      width: t,
      height: t,
      animation: r ? `${W$e.rotate} 2s linear infinite` : void 0,
    },
    ...n,
  });
};
yL.displayName = "Shape";
vL.Shape = yL;
var wd = P,
  U$e = I,
  NT = hL,
  OT = Zo,
  K$e = vL,
  q$e = D,
  X$e = M;
const gL = q$e.forwardRef((e, t) => {
  const {
      size: r = "48px",
      max: n = 100,
      min: o = 0,
      valueText: a,
      getValueText: s,
      value: i,
      capIsRound: c,
      children: l,
      thickness: u = "10px",
      color: d = "#6B3E1E",
      trackColor: f = "#edebe9",
      isIndeterminate: m,
      ...h
    } = e,
    p = OT.getProgressProps({
      min: o,
      max: n,
      value: i,
      valueText: a,
      getValueText: s,
      isIndeterminate: m,
    }),
    v = m ? void 0 : (p.percent ?? 0) * 2.64,
    b = v == null ? void 0 : `${v} ${264 - v}`,
    y = m
      ? { css: { animation: `${OT.spin} 1.5s linear infinite` } }
      : {
          strokeDashoffset: 66,
          strokeDasharray: b,
          transitionProperty: "stroke-dasharray, stroke",
          transitionDuration: "0.6s",
          transitionTimingFunction: "ease",
        },
    S = U$e.defineStyle({
      display: "inline-block",
      position: "relative",
      verticalAlign: "middle",
      fontSize: r,
    });
  return wd.jsxs(X$e.chakra.div, {
    ref: t,
    className: "chakra-progress",
    ...p.bind,
    ...h,
    __css: S,
    children: [
      wd.jsxs(K$e.Shape, {
        size: r,
        isIndeterminate: m,
        children: [
          wd.jsx(NT.Circle, {stroke: f,
            strokeWidth: u,
            className: "chakra-progress__track",
          }),
          wd.jsx(NT.Circle, {stroke: d,
            strokeWidth: u,
            className: "chakra-progress__indicator",
            strokeLinecap: c ? "round" : void 0,
            opacity: p.value === 0 && !m ? 0 : void 0,
            ...y,
          }),
        ],
      }),
      l,
    ],
  });
});
gL.displayName = "CircularProgress";
mL.CircularProgress = gL;
var bh = {},
  tf = P,
  Y$e = I,
  Z$e = x,
  sg = Zo,
  bL = D,
  SL = M,
  Q$e = he;
const [J$e, xL] = Z$e.createContext({
    name: "ProgressStylesContext",
    errorMessage: `useProgressStyles returned is 'undefined'. Seems you forgot to wrap the components in "<Progress />" `,
  }),
  e1e = bL.forwardRef((e, t) => {
    const { min: r, max: n, value: o, isIndeterminate: a, role: s, ...i } = e,
      c = sg.getProgressProps({
        value: o,
        min: r,
        max: n,
        isIndeterminate: a,
        role: s,
      }),
      u = { height: "100%", ...xL().filledTrack };
    return tf.jsx(SL.chakra.div, {
      ref: t,
      style: { width: `${c.percent}%`, ...i.style },
      ...c.bind,
      ...i,
      __css: u,
    });
  }),
  $L = bL.forwardRef((e, t) => {
    var k;
    const {
        value: r,
        min: n = 0,
        max: o = 100,
        hasStripe: a,
        isAnimated: s,
        children: i,
        borderRadius: c,
        isIndeterminate: l,
        "aria-label": u,
        "aria-labelledby": d,
        "aria-valuetext": f,
        title: m,
        role: h,
        ...p
      } = Y$e.omitThemingProps(e),
      v = Q$e.useMultiStyleConfig("Progress", e),
      b = c ?? ((k = v.track) == null ? void 0 : k.borderRadius),
      y = { animation: `${sg.stripe} 1s linear infinite` },
      C = {
        ...(!l && a && s && y),
        ...(l && {
          position: "absolute",
          willChange: "left",
          minWidth: "50%",
          animation: `${sg.progress} 1s ease infinite normal none running`,
        }),
      },
      T = { overflow: "hidden", position: "relative", ...v.track };
    return tf.jsx(SL.chakra.div, {
      ref: t,
      borderRadius: b,
      __css: T,
      ...p,
      children: tf.jsxs(J$e, {
        value: v,
        children: [
          tf.jsx(e1e, {
            "aria-label": u,
            "aria-labelledby": d,
            "aria-valuetext": f,
            min: n,
            max: o,
            value: r,
            isIndeterminate: l,
            css: C,
            borderRadius: b,
            title: m,
            role: h,
          }),
          i,
        ],
      }),
    });
  });
$L.displayName = "Progress";
bh.Progress = $L;
bh.useProgressStyles = xL;
var wL = {},
  t1e = P,
  r1e = I,
  n1e = bh,
  o1e = M;
const CL = (e) => {
  const t = n1e.useProgressStyles(),
    r = r1e.defineStyle({
      top: "50%",
      left: "50%",
      width: "100%",
      textAlign: "center",
      position: "absolute",
      transform: "translate(-50%, -50%)",
      ...t.label,
    });
  return t1e.jsx(o1e.chakra.div, { ...e, __css: r });
};
CL.displayName = "ProgressLabel";
wL.ProgressLabel = CL;
var kL = {},
  a1e = M;
const TL = a1e.chakra("div", {
  baseStyle: {
    fontSize: "0.24em",
    top: "50%",
    left: "50%",
    width: "100%",
    textAlign: "center",
    position: "absolute",
    transform: "translate(-50%, -50%)",
  },
});
TL.displayName = "CircularProgressLabel";
kL.CircularProgressLabel = TL;
var PL = {},
  su = {},
  Ex = {},
  s1e = le,
  BT = x,
  ca = g;
function i1e(e) {
  return e && BT.isObject(e) && BT.isObject(e.target);
}
function c1e(e = {}) {
  const {
      onChange: t,
      value: r,
      defaultValue: n,
      name: o,
      isDisabled: a,
      isFocusable: s,
      isNative: i,
      ...c
    } = e,
    [l, u] = ca.useState(n || ""),
    d = typeof r < "u",
    f = d ? r : l,
    m = ca.useRef(null),
    h = ca.useCallback(() => {
      const C = m.current;
      if (!C) return;
      let T = "input:not(:disabled):checked";
      const k = C.querySelector(T);
      if (k) {
        k.focus();
        return;
      }
      T = "input:not(:disabled)";
      const R = C.querySelector(T);
      R == null || R.focus();
    }, []),
    v = `radio-${ca.useId()}`,
    b = o || v,
    y = ca.useCallback(
      (C) => {
        const T = i1e(C) ? C.target.value : C;
        d || u(T), t == null || t(String(T));
      },
      [t, d]
    ),
    S = ca.useCallback(
      (C = {}, T = null) => ({
        ...C,
        ref: s1e.mergeRefs(T, m),
        role: "radiogroup",
      }),
      []
    ),
    w = ca.useCallback(
      (C = {}, T = null) => ({
        ...C,
        ref: T,
        name: b,
        [i ? "checked" : "isChecked"]: f != null ? C.value === f : void 0,
        onChange(R) {
          y(R);
        },
        "data-radiogroup": !0,
      }),
      [i, b, y, f]
    );
  return {
    getRootProps: S,
    getRadioProps: w,
    name: b,
    ref: m,
    focus: h,
    setValue: u,
    value: f,
    onChange: y,
    isDisabled: a,
    isFocusable: s,
    htmlProps: c,
  };
}
Ex.useRadioGroup = c1e;
var LT = P,
  RL = x,
  l1e = g,
  u1e = Ex,
  d1e = D,
  f1e = M;
const [m1e, h1e] = RL.createContext({ name: "RadioGroupContext", strict: !1 }),
  AL = d1e.forwardRef((e, t) => {
    const {
        colorScheme: r,
        size: n,
        variant: o,
        children: a,
        className: s,
        isDisabled: i,
        isFocusable: c,
        ...l
      } = e,
      {
        value: u,
        onChange: d,
        getRootProps: f,
        name: m,
        htmlProps: h,
      } = u1e.useRadioGroup(l),
      p = l1e.useMemo(
        () => ({
          name: m,
          size: n,
          onChange: d,
          colorScheme: r,
          value: u,
          variant: o,
          isDisabled: i,
          isFocusable: c,
        }),
        [m, n, d, r, u, o, i, c]
      );
    return LT.jsx(m1e, {
      value: p,
      children: LT.jsx(f1e.chakra.div, {
        ...f(h, t),
        className: RL.cx("chakra-radio-group", s),
        children: a,
      }),
    });
  });
AL.displayName = "RadioGroup";
su.RadioGroup = AL;
su.useRadioGroupContext = h1e;
var Mx = {},
  Ve = x,
  p1e = aj,
  Rr = g,
  v1e = su,
  y1e = uo,
  g1e = Yl;
function b1e(e = {}) {
  const {
      defaultChecked: t,
      isChecked: r,
      isFocusable: n,
      isDisabled: o,
      isReadOnly: a,
      isRequired: s,
      onChange: i,
      isInvalid: c,
      name: l,
      value: u,
      id: d,
      "data-radiogroup": f,
      "aria-describedby": m,
      ...h
    } = e,
    p = `radio-${Rr.useId()}`,
    v = y1e.useFormControlContext(),
    y = !!v1e.useRadioGroupContext() || !!f;
  let w = !!v && !y ? v.id : p;
  w = d ?? w;
  const C = o ?? (v == null ? void 0 : v.isDisabled),
    T = a ?? (v == null ? void 0 : v.isReadOnly),
    k = s ?? (v == null ? void 0 : v.isRequired),
    R = c ?? (v == null ? void 0 : v.isInvalid),
    [E, _] = Rr.useState(!1),
    [N, G] = Rr.useState(!1),
    [B, z] = Rr.useState(!1),
    [Y, W] = Rr.useState(!1),
    [j, O] = Rr.useState(!!t),
    K = typeof r < "u",
    ve = K ? r : j;
  Rr.useEffect(() => p1e.trackFocusVisible(_), []);
  const re = Rr.useCallback(
      (Q) => {
        if (T || C) {
          Q.preventDefault();
          return;
        }
        K || O(Q.currentTarget.checked), i == null || i(Q);
      },
      [K, C, T, i]
    ),
    ue = Rr.useCallback(
      (Q) => {
        Q.key === " " && W(!0);
      },
      [W]
    ),
    L = Rr.useCallback(
      (Q) => {
        Q.key === " " && W(!1);
      },
      [W]
    ),
    V = Rr.useCallback(
      (Q = {}, J = null) => ({
        ...Q,
        ref: J,
        "data-active": Ve.dataAttr(Y),
        "data-hover": Ve.dataAttr(B),
        "data-disabled": Ve.dataAttr(C),
        "data-invalid": Ve.dataAttr(R),
        "data-checked": Ve.dataAttr(ve),
        "data-focus": Ve.dataAttr(N),
        "data-focus-visible": Ve.dataAttr(N && E),
        "data-readonly": Ve.dataAttr(T),
        "aria-hidden": !0,
        onMouseDown: Ve.callAllHandlers(Q.onMouseDown, () => W(!0)),
        onMouseUp: Ve.callAllHandlers(Q.onMouseUp, () => W(!1)),
        onMouseEnter: Ve.callAllHandlers(Q.onMouseEnter, () => z(!0)),
        onMouseLeave: Ve.callAllHandlers(Q.onMouseLeave, () => z(!1)),
      }),
      [Y, B, C, R, ve, N, T, E]
    ),
    { onFocus: ee, onBlur: pe } = v ?? {},
    xe = Rr.useCallback(
      (Q = {}, J = null) => {
        const ne = C && !n;
        return {
          ...Q,
          id: w,
          ref: J,
          type: "radio",
          name: l,
          value: u,
          onChange: Ve.callAllHandlers(Q.onChange, re),
          onBlur: Ve.callAllHandlers(pe, Q.onBlur, () => G(!1)),
          onFocus: Ve.callAllHandlers(ee, Q.onFocus, () => G(!0)),
          onKeyDown: Ve.callAllHandlers(Q.onKeyDown, ue),
          onKeyUp: Ve.callAllHandlers(Q.onKeyUp, L),
          checked: ve,
          disabled: ne,
          readOnly: T,
          required: k,
          "aria-invalid": Ve.ariaAttr(R),
          "aria-disabled": Ve.ariaAttr(ne),
          "aria-required": Ve.ariaAttr(k),
          "data-readonly": Ve.dataAttr(T),
          "aria-describedby": m,
          style: g1e.visuallyHiddenStyle,
        };
      },
      [C, n, w, l, u, re, pe, ee, ue, L, ve, T, k, R, m]
    );
  return {
    state: {
      isInvalid: R,
      isFocused: N,
      isChecked: ve,
      isActive: Y,
      isHovered: B,
      isDisabled: C,
      isReadOnly: T,
      isRequired: k,
    },
    getRadioProps: V,
    getInputProps: xe,
    getLabelProps: (Q = {}, J = null) => ({
      ...Q,
      ref: J,
      onMouseDown: Ve.callAllHandlers(Q.onMouseDown, S1e),
      "data-disabled": Ve.dataAttr(C),
      "data-checked": Ve.dataAttr(ve),
      "data-invalid": Ve.dataAttr(R),
    }),
    getRootProps: (Q, J = null) => ({
      htmlFor: w,
      ...Q,
      ref: J,
      "data-disabled": Ve.dataAttr(C),
      "data-checked": Ve.dataAttr(ve),
      "data-invalid": Ve.dataAttr(R),
    }),
    htmlProps: h,
  };
}
function S1e(e) {
  e.preventDefault(), e.stopPropagation();
}
Mx.useRadio = b1e;
var Cd = P,
  VT = I,
  zT = x,
  x1e = su,
  $1e = Mx,
  w1e = D,
  C1e = he,
  Bv = M;
const _L = w1e.forwardRef((e, t) => {
  const r = x1e.useRadioGroupContext(),
    { onChange: n, value: o } = e,
    a = C1e.useMultiStyleConfig("Radio", { ...r, ...e }),
    s = VT.omitThemingProps(e),
    {
      spacing: i = "0.5rem",
      children: c,
      isDisabled: l = r == null ? void 0 : r.isDisabled,
      isFocusable: u = r == null ? void 0 : r.isFocusable,
      inputProps: d,
      ...f
    } = s;
  let m = e.isChecked;
  (r == null ? void 0 : r.value) != null && o != null && (m = r.value === o);
  let h = n;
  r != null && r.onChange && o != null && (h = zT.callAll(r.onChange, n));
  const p = (e == null ? void 0 : e.name) ?? (r == null ? void 0 : r.name),
    {
      getInputProps: v,
      getRadioProps: b,
      getLabelProps: y,
      getRootProps: S,
      htmlProps: w,
    } = $1e.useRadio({
      ...f,
      isChecked: m,
      isFocusable: u,
      isDisabled: l,
      onChange: h,
      name: p,
    }),
    [C, T] = zT.split(w, VT.layoutPropNames),
    k = b(T),
    R = v(d, t),
    E = y(),
    _ = Object.assign({}, C, S()),
    N = {
      display: "inline-flex",
      alignItems: "center",
      verticalAlign: "top",
      cursor: "pointer",
      position: "relative",
      ...a.container,
    },
    G = {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      ...a.control,
    },
    B = { userSelect: "none", marginStart: i, ...a.label };
  return Cd.jsxs(Bv.chakra.label, {
    className: "chakra-radio",
    ..._,
    __css: N,
    children: [
      Cd.jsx("input", { className: "chakra-radio__input", ...R }),
      Cd.jsx(Bv.chakra.span, {
        className: "chakra-radio__control",
        ...k,
        __css: G,
      }),
      c &&
        Cd.jsx(Bv.chakra.span, {
          className: "chakra-radio__label",
          ...E,
          __css: B,
          children: c,
        }),
    ],
  });
});
_L.displayName = "Radio";
PL.Radio = _L;
var Fx = {},
  jx = {},
  HT = P,
  k1e = x,
  T1e = D,
  P1e = M;
const IL = T1e.forwardRef(function (t, r) {
  const { children: n, placeholder: o, className: a, ...s } = t;
  return HT.jsxs(P1e.chakra.select, {
    ...s,
    ref: r,
    className: k1e.cx("chakra-select", a),
    children: [o && HT.jsx("option", { value: "", children: o }), n],
  });
});
IL.displayName = "SelectField";
jx.SelectField = IL;
var Ta = P,
  WT = I,
  GT = x,
  UT = g,
  R1e = jx,
  A1e = Ko,
  _1e = D,
  EL = M,
  I1e = he;
const ML = _1e.forwardRef((e, t) => {
  var S;
  const r = I1e.useMultiStyleConfig("Select", e),
    {
      rootProps: n,
      placeholder: o,
      icon: a,
      color: s,
      height: i,
      h: c,
      minH: l,
      minHeight: u,
      iconColor: d,
      iconSize: f,
      ...m
    } = WT.omitThemingProps(e),
    [h, p] = GT.split(m, WT.layoutPropNames),
    v = A1e.useFormControl(p),
    b = {
      width: "100%",
      height: "fit-content",
      position: "relative",
      color: s,
    },
    y = {
      paddingEnd: "2rem",
      ...r.field,
      _focus: {
        zIndex: "unset",
        ...((S = r.field) == null ? void 0 : S._focus),
      },
    };
  return Ta.jsxs(EL.chakra.div, {
    className: "chakra-select__wrapper",
    __css: b,
    ...h,
    ...n,
    children: [
      Ta.jsx(R1e.SelectField, {
        ref: t,
        height: c ?? i,
        minH: l ?? u,
        placeholder: o,
        ...v,
        __css: y,
        children: e.children,
      }),
      Ta.jsx(jL, {
        "data-disabled": GT.dataAttr(v.disabled),
        ...((d || s) && {color: d || s }),
        __css: r.icon,
        ...(f && { fontSize: f }),
        children: a,
      }),
    ],
  });
});
ML.displayName = "Select";
const FL = (e) =>
    Ta.jsx("svg", {
      viewBox: "0 0 24 24",
      ...e,
      children: Ta.jsx("path", {fill: "currentColor",
        d: "M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z",
      }),
    }),
  E1e = EL.chakra("div", {
    baseStyle: {
      position: "absolute",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      pointerEvents: "none",
      top: "50%",
      transform: "translateY(-50%)",
    },
  }),
  jL = (e) => {
    const { children: t = Ta.jsx(FL, {}), ...r } = e,
      n = UT.cloneElement(t, {
        role: "presentation",
        className: "chakra-select__icon",
        focusable: !1,
        "aria-hidden": !0,
        style: { width: "1em", height: "1em", color: "currentColor" },
      });
    return Ta.jsx(E1e, {
      ...r,
      className: "chakra-select__icon-wrapper",
      children: UT.isValidElement(t) ? n : null,
    });
  };
jL.displayName = "SelectIcon";
Fx.DefaultIcon = FL;
Fx.Select = ML;
var Sh = {},
  DL = {},
  KT = g;
function M1e() {
  const e = KT.useRef(!0);
  return (
    KT.useEffect(() => {
      e.current = !1;
    }, []),
    e.current
  );
}
DL.useIsFirstRender = M1e;
var qT = P,
  F1e = le,
  Dx = I,
  j1e = x,
  NL = Vo,
  D1e = DL,
  N1e = Go,
  OL = M,
  O1e = D,
  B1e = he;
const L1e = OL.chakra("div", {
    baseStyle: {
      boxShadow: "none",
      backgroundClip: "padding-box",
      cursor: "default",
      color: "transparent",
      pointerEvents: "none",
      userSelect: "none",
      "&::before, &::after, *": { visibility: "hidden" },
    },
  }),
  ig = Dx.cssVar("skeleton-start-color"),
  cg = Dx.cssVar("skeleton-end-color"),
  V1e = NL.keyframes({ from: { opacity: 0 }, to: { opacity: 1 } }),
  z1e = NL.keyframes({
    from: { borderColor: ig.reference, background: ig.reference },
    to: { borderColor: cg.reference, background: cg.reference },
  }),
  BL = O1e.forwardRef((e, t) => {
    const r = {
        ...e,
        fadeDuration: typeof e.fadeDuration == "number" ? e.fadeDuration : 0.4,
        speed: typeof e.speed == "number" ? e.speed : 0.8,
      },
      n = B1e.useStyleConfig("Skeleton", r),
      o = D1e.useIsFirstRender(),
      {
        startColor: a = "",
        endColor: s = "",
        isLoaded: i,
        fadeDuration: c,
        speed: l,
        className: u,
        fitContent: d,
        animation: f,
        ...m
      } = Dx.omitThemingProps(r),
      [h, p] = N1e.useToken("colors", [a, s]),
      v = F1e.usePrevious(i),
      b = j1e.cx("chakra-skeleton", u),
      y = { ...(h && { [ig.variable]: h }), ...(p && { [cg.variable]: p }) };
    if (i) {
      const S = o || v ? "none" : `${V1e} ${c}s`;
      return qT.jsx(OL.chakra.div, {
        ref: t,
        className: b,
        __css: { animation: S },
        ...m,
      });
    }
    return qT.jsx(L1e, {
      ref: t,
      className: b,
      ...m,
      __css: {
        width: d ? "fit-content" : void 0,
        ...n,
        ...y,
        _dark: { ...n._dark, ...y },
        animation: f || `${l}s linear infinite alternate ${z1e}`,
      },
    });
  });
BL.displayName = "Skeleton";
Sh.Skeleton = BL;
var LL = {},
  XT = P,
  H1e = x,
  W1e = Sh,
  G1e = sx,
  U1e = M;
function K1e(e) {
  return Array(e)
    .fill(1)
    .map((t, r) => r + 1);
}
const YT = 3,
  VL = (e) => {
    const {
        noOfLines: t = YT,
        spacing: r = "0.5rem",
        skeletonHeight: n = "0.5rem",
        className: o,
        startColor: a,
        endColor: s,
        isLoaded: i,
        fadeDuration: c,
        speed: l,
        variant: u,
        size: d,
        colorScheme: f,
        children: m,
        ...h
      } = e,
      p = G1e.useBreakpointValue(typeof t == "number" ? [t] : t) || YT,
      v = K1e(p),
      b = (S) => (p > 1 && S === v.length ? "80%" : "100%"),
      y = H1e.cx("chakra-skeleton__group", o);
    return XT.jsx(U1e.chakra.div, {
      className: y,
      ...h,
      children: v.map((S, w) => {
        if (i && w > 0) return null;
        const C = i
          ? null
          : { mb: S === v.length ? "0" : r, width: b(S), height: n };
        return XT.jsx(
          W1e.Skeleton,
          {
            startColor: a,
            endColor: s,
            isLoaded: i,
            fadeDuration: c,
            speed: l,
            variant: u,
            size: d,
            colorScheme: f,
            ...C,
            children: w === 0 ? m : void 0,
          },
          v.length.toString() + S
        );
      }),
    });
  };
VL.displayName = "SkeletonText";
LL.SkeletonText = VL;
var zL = {},
  q1e = P,
  X1e = Sh;
const HL = ({ size: e = "2rem", ...t }) =>
  q1e.jsx(X1e.Skeleton, { borderRadius: "full", boxSize: e, ...t });
HL.displayName = "SkeletonCircle";
zL.SkeletonCircle = HL;
var Nx = {},
  WL = P,
  Y1e = I,
  GL = D,
  Z1e = he,
  UL = M;
const KL = "chakra-skip-nav";
function Q1e(e) {
  return {
    userSelect: "none",
    border: "0",
    height: "1px",
    width: "1px",
    margin: "-1px",
    padding: "0",
    outline: "0",
    overflow: "hidden",
    position: "absolute",
    clip: "rect(0 0 0 0)",
    ...e,
    _focus: { clip: "auto", width: "auto", height: "auto", ...e._focus },
  };
}
const qL = GL.forwardRef(function (t, r) {
  const n = Z1e.useStyleConfig("SkipLink", t),
    { id: o = KL, ...a } = Y1e.omitThemingProps(t);
  return WL.jsx(UL.chakra.a, { ...a, ref: r, href: `#${o}`, __css: Q1e(n) });
});
qL.displayName = "SkipNavLink";
const XL = GL.forwardRef(function (t, r) {
  const { id: n = KL, ...o } = t;
  return WL.jsx(UL.chakra.div, {
    ref: r,
    id: n,
    tabIndex: -1,
    style: {outline: 0 },
    ...o,
  });
});
XL.displayName = "SkipNavContent";
Nx.SkipNavContent = XL;
Nx.SkipNavLink = qL;
var ho = {},
  Ox = {},
  Oi = {};
function J1e(e) {
  return {
    root: `slider-root-${e}`,
    getThumb: (t) => `slider-thumb-${e}-${t}`,
    getInput: (t) => `slider-input-${e}-${t}`,
    track: `slider-track-${e}`,
    innerTrack: `slider-filled-track-${e}`,
    getMarker: (t) => `slider-marker-${e}-${t}`,
    output: `slider-output-${e}`,
  };
}
function rf(e) {
  const { orientation: t, vertical: r, horizontal: n } = e;
  return t === "vertical" ? r : n;
}
function ewe(e) {
  const { orientation: t, thumbPercents: r, isReversed: n } = e,
    o = (m) => ({
      position: "absolute",
      userSelect: "none",
      WebkitUserSelect: "none",
      MozUserSelect: "none",
      msUserSelect: "none",
      touchAction: "none",
      ...rf({
        orientation: t,
        vertical: { bottom: `calc(${r[m]}% - var(--slider-thumb-size) / 2)` },
        horizontal: { left: `calc(${r[m]}% - var(--slider-thumb-size) / 2)` },
      }),
    }),
    a = {
      position: "relative",
      touchAction: "none",
      WebkitTapHighlightColor: "rgba(0,0,0,0)",
      userSelect: "none",
      outline: 0,
    },
    s = {
      position: "absolute",
      ...rf({
        orientation: t,
        vertical: {
          left: "50%",
          transform: "translateX(-50%)",
          height: "100%",
        },
        horizontal: {
          top: "50%",
          transform: "translateY(-50%)",
          width: "100%",
        },
      }),
    },
    i = r.length === 1,
    c = [0, n ? 100 - r[0] : r[0]],
    l = i ? c : r;
  let u = l[0];
  !i && n && (u = 100 - u);
  const d = Math.abs(l[l.length - 1] - l[0]),
    f = {
      ...s,
      ...rf({
        orientation: t,
        vertical: n
          ? { height: `${d}%`, top: `${u}%` }
          : { height: `${d}%`, bottom: `${u}%` },
        horizontal: n
          ? { width: `${d}%`, right: `${u}%` }
          : { width: `${d}%`, left: `${u}%` },
      }),
    };
  return { trackStyle: s, innerTrackStyle: f, rootStyle: a, getThumbStyle: o };
}
function twe(e) {
  const { isReversed: t, direction: r, orientation: n } = e;
  return r === "ltr" || n === "vertical" ? t : !t;
}
Oi.getIds = J1e;
Oi.getIsReversed = twe;
Oi.getStyles = ewe;
Oi.orient = rf;
var wo = le,
  vt = x,
  at = g,
  kd = Oi;
function rwe(e) {
  const {
      min: t = 0,
      max: r = 100,
      onChange: n,
      value: o,
      defaultValue: a,
      isReversed: s,
      direction: i = "ltr",
      orientation: c = "horizontal",
      id: l,
      isDisabled: u,
      isReadOnly: d,
      onChangeStart: f,
      onChangeEnd: m,
      step: h = 1,
      getAriaValueText: p,
      "aria-valuetext": v,
      "aria-label": b,
      "aria-labelledby": y,
      name: S,
      focusThumbOnChange: w = !0,
      minStepsBetweenThumbs: C = 0,
      ...T
    } = e,
    k = wo.useCallbackRef(f),
    R = wo.useCallbackRef(m),
    E = wo.useCallbackRef(p),
    _ = kd.getIsReversed({ isReversed: s, direction: i, orientation: c }),
    [N, G] = wo.useControllableState({
      value: o,
      defaultValue: a ?? [25, 75],
      onChange: n,
    });
  if (!Array.isArray(N))
    throw new TypeError(
      `[range-slider] You passed an invalid value for \`value\` or \`defaultValue\`, expected \`Array\` but got \`${typeof N}\``
    );
  const [B, z] = at.useState(!1),
    [Y, W] = at.useState(!1),
    [j, O] = at.useState(-1),
    K = !(u || d),
    ve = at.useRef(N),
    re = N.map((Z) => vt.clampValue(Z, t, r)),
    ue = C * h,
    L = nwe(re, t, r, ue),
    V = at.useRef({ eventSource: null, value: [], valueBounds: [] });
  (V.current.value = re), (V.current.valueBounds = L);
  const ee = re.map((Z) => r - Z + t),
    xe = (_ ? ee : re).map((Z) => vt.valueToPercent(Z, t, r)),
    Ce = c === "vertical",
    X = at.useRef(null),
    de = at.useRef(null),
    Q = at.useId(),
    J = l ?? Q,
    ne = kd.getIds(J),
    we = at.useCallback(
      (Z) => {
        var dt;
        if (!X.current) return;
        V.current.eventSource = "pointer";
        const ie = X.current.getBoundingClientRect(),
          { clientX: fe, clientY: _e } =
            ((dt = Z.touches) == null ? void 0 : dt[0]) ?? Z,
          Ie = Ce ? ie.bottom - _e : fe - ie.left,
          Rt = Ce ? ie.height : ie.width;
        let Dt = Ie / Rt;
        return _ && (Dt = 1 - Dt), vt.percentToValue(Dt, t, r);
      },
      [Ce, _, r, t]
    ),
    ae = (r - t) / 10,
    ye = h || (r - t) / 100,
    U = at.useMemo(
      () => ({
        setValueAtIndex(Z, ie) {
          if (!K) return;
          const fe = V.current.valueBounds[Z];
          (ie = parseFloat(vt.roundValueToStep(ie, fe.min, ye))),
            (ie = vt.clampValue(ie, fe.min, fe.max));
          const _e = [...V.current.value];
          (_e[Z] = ie), G(_e);
        },
        setActiveIndex: O,
        stepUp(Z, ie = ye) {
          const fe = V.current.value[Z],
            _e = _ ? fe - ie : fe + ie;
          U.setValueAtIndex(Z, _e);
        },
        stepDown(Z, ie = ye) {
          const fe = V.current.value[Z],
            _e = _ ? fe + ie : fe - ie;
          U.setValueAtIndex(Z, _e);
        },
        reset() {
          G(ve.current);
        },
      }),
      [ye, _, G, K]
    ),
    be = at.useCallback(
      (Z) => {
        const ie = Z.key,
          _e = {
            ArrowRight: () => U.stepUp(j),
            ArrowUp: () => U.stepUp(j),
            ArrowLeft: () => U.stepDown(j),
            ArrowDown: () => U.stepDown(j),
            PageUp: () => U.stepUp(j, ae),
            PageDown: () => U.stepDown(j, ae),
            Home: () => {
              const { min: Ie } = L[j];
              U.setValueAtIndex(j, Ie);
            },
            End: () => {
              const { max: Ie } = L[j];
              U.setValueAtIndex(j, Ie);
            },
          }[ie];
        _e &&
          (Z.preventDefault(),
          Z.stopPropagation(),
          _e(Z),
          (V.current.eventSource = "keyboard"));
      },
      [U, j, ae, L]
    ),
    {
      getThumbStyle: ge,
      rootStyle: Te,
      trackStyle: He,
      innerTrackStyle: Ue,
    } = at.useMemo(
      () => kd.getStyles({ isReversed: _, orientation: c, thumbPercents: xe }),
      [_, c, xe]
    ),
    Ze = at.useCallback(
      (Z) => {
        var fe;
        const ie = Z ?? j;
        if (ie !== -1 && w) {
          const _e = ne.getThumb(ie),
            Ie =
              (fe = de.current) == null
                ? void 0
                : fe.ownerDocument.getElementById(_e);
          Ie && setTimeout(() => Ie.focus());
        }
      },
      [w, j, ne]
    );
  wo.useUpdateEffect(() => {
    V.current.eventSource === "keyboard" && (R == null || R(V.current.value));
  }, [re, R]);
  const wt = (Z) => {
      const ie = we(Z) || 0,
        fe = V.current.value.map((dt) => Math.abs(dt - ie)),
        _e = Math.min(...fe);
      let Ie = fe.indexOf(_e);
      const Rt = fe.filter((dt) => dt === _e);
      Rt.length > 1 && ie > V.current.value[Ie] && (Ie = Ie + Rt.length - 1),
        O(Ie),
        U.setValueAtIndex(Ie, ie),
        Ze(Ie);
    },
    nr = (Z) => {
      if (j == -1) return;
      const ie = we(Z) || 0;
      O(j), U.setValueAtIndex(j, ie), Ze(j);
    };
  wo.usePanEvent(de, {
    onPanSessionStart(Z) {
      K && (z(!0), wt(Z), k == null || k(V.current.value));
    },
    onPanSessionEnd() {
      K && (z(!1), R == null || R(V.current.value));
    },
    onPan(Z) {
      K && nr(Z);
    },
  });
  const or = at.useCallback(
      (Z = {}, ie = null) => ({
        ...Z,
        ...T,
        id: ne.root,
        ref: wo.mergeRefs(ie, de),
        tabIndex: -1,
        "aria-disabled": vt.ariaAttr(u),
        "data-focused": vt.dataAttr(Y),
        style: { ...Z.style, ...Te },
      }),
      [T, u, Y, Te, ne]
    ),
    wr = at.useCallback(
      (Z = {}, ie = null) => ({
        ...Z,
        ref: wo.mergeRefs(ie, X),
        id: ne.track,
        "data-disabled": vt.dataAttr(u),
        style: { ...Z.style, ...He },
      }),
      [u, He, ne]
    ),
    H = at.useCallback(
      (Z = {}, ie = null) => ({
        ...Z,
        ref: ie,
        id: ne.innerTrack,
        style: { ...Z.style, ...Ue },
      }),
      [Ue, ne]
    ),
    Ee = at.useCallback(
      (Z, ie = null) => {
        const { index: fe, ..._e } = Z,
          Ie = re[fe];
        if (Ie == null)
          throw new TypeError(
            `[range-slider > thumb] Cannot find value at index \`${fe}\`. The \`value\` or \`defaultValue\` length is : ${re.length}`
          );
        const Rt = L[fe];
        return {
          ..._e,
          ref: ie,
          role: "slider",
          tabIndex: K ? 0 : void 0,
          id: ne.getThumb(fe),
          "data-active": vt.dataAttr(B && j === fe),
          "aria-valuetext":
            (E == null ? void 0 : E(Ie)) ?? (v == null ? void 0 : v[fe]),
          "aria-valuemin": Rt.min,
          "aria-valuemax": Rt.max,
          "aria-valuenow": Ie,
          "aria-orientation": c,
          "aria-disabled": vt.ariaAttr(u),
          "aria-readonly": vt.ariaAttr(d),
          "aria-label": b == null ? void 0 : b[fe],
          "aria-labelledby": (b != null && b[fe]) || y == null ? void 0 : y[fe],
          style: { ...Z.style, ...ge(fe) },
          onKeyDown: vt.callAllHandlers(Z.onKeyDown, be),
          onFocus: vt.callAllHandlers(Z.onFocus, () => {
            W(!0), O(fe);
          }),
          onBlur: vt.callAllHandlers(Z.onBlur, () => {
            W(!1), O(-1);
          }),
        };
      },
      [ne, re, L, K, B, j, E, v, c, u, d, b, y, ge, be, W]
    ),
    q = at.useCallback(
      (Z = {}, ie = null) => ({
        ...Z,
        ref: ie,
        id: ne.output,
        htmlFor: re.map((fe, _e) => ne.getThumb(_e)).join(" "),
        "aria-live": "off",
      }),
      [ne, re]
    ),
    oe = at.useCallback(
      (Z, ie = null) => {
        const { value: fe, ..._e } = Z,
          Ie = !(fe < t || fe > r),
          Rt = fe >= re[0] && fe <= re[re.length - 1];
        let Dt = vt.valueToPercent(fe, t, r);
        Dt = _ ? 100 - Dt : Dt;
        const dt = {
          position: "absolute",
          pointerEvents: "none",
          ...kd.orient({
            orientation: c,
            vertical: { bottom: `${Dt}%` },
            horizontal: { left: `${Dt}%` },
          }),
        };
        return {
          ..._e,
          ref: ie,
          id: ne.getMarker(Z.value),
          role: "presentation",
          "aria-hidden": !0,
          "data-disabled": vt.dataAttr(u),
          "data-invalid": vt.dataAttr(!Ie),
          "data-highlighted": vt.dataAttr(Rt),
          style: { ...Z.style, ...dt },
        };
      },
      [u, _, r, t, c, re, ne]
    ),
    nt = at.useCallback(
      (Z, ie = null) => {
        const { index: fe, ..._e } = Z;
        return {
          ..._e,
          ref: ie,
          id: ne.getInput(fe),
          type: "hidden",
          value: re[fe],
          name: Array.isArray(S) ? S[fe] : `${S}-${fe}`,
        };
      },
      [S, re, ne]
    );
  return {
    state: {
      value: re,
      isFocused: Y,
      isDragging: B,
      getThumbPercent: (Z) => xe[Z],
      getThumbMinValue: (Z) => L[Z].min,
      getThumbMaxValue: (Z) => L[Z].max,
    },
    actions: U,
    getRootProps: or,
    getTrackProps: wr,
    getInnerTrackProps: H,
    getThumbProps: Ee,
    getMarkerProps: oe,
    getInputProps: nt,
    getOutputProps: q,
  };
}
function nwe(e, t, r, n) {
  return e.map((o, a) => {
    const s = a === 0 ? t : e[a - 1] + n,
      i = a === e.length - 1 ? r : e[a + 1] - n;
    return { min: s, max: i };
  });
}
Ox.useRangeSlider = rwe;
var Mo = P,
  owe = I,
  iu = x,
  awe = g,
  swe = Ox,
  iwe = $r,
  cu = D,
  cwe = he,
  lu = M;
const [YL, uu] = iu.createContext({
    name: "SliderContext",
    errorMessage:
      "useSliderContext: `context` is undefined. Seems you forgot to wrap all slider components within <RangeSlider />",
  }),
  [lwe, du] = iu.createContext({
    name: "RangeSliderStylesContext",
    errorMessage: `useRangeSliderStyles returned is 'undefined'. Seems you forgot to wrap the components in "<RangeSlider />" `,
  }),
  ZL = cu.forwardRef(function (t, r) {
    const n = { orientation: "horizontal", ...t },
      o = cwe.useMultiStyleConfig("Slider", n),
      a = owe.omitThemingProps(n),
      { direction: s } = iwe.useTheme();
    a.direction = s;
    const { getRootProps: i, ...c } = swe.useRangeSlider(a),
      l = awe.useMemo(() => ({ ...c, name: n.name }), [c, n.name]);
    return Mo.jsx(YL, {
      value: l,
      children: Mo.jsx(lwe, {
        value: o,
        children: Mo.jsx(lu.chakra.div, {
          ...i({}, r),
          className: "chakra-slider",
          __css: o.container,
          children: n.children,
        }),
      }),
    });
  });
ZL.displayName = "RangeSlider";
const QL = cu.forwardRef(function (t, r) {
  const { getThumbProps: n, getInputProps: o, name: a } = uu(),
    s = du(),
    i = n(t, r);
  return Mo.jsxs(lu.chakra.div, {
    ...i,
    className: iu.cx("chakra-slider__thumb", t.className),
    __css: s.thumb,
    children: [i.children, a && Mo.jsx("input", { ...o({ index: t.index }) })],
  });
});
QL.displayName = "RangeSliderThumb";
const JL = cu.forwardRef(function (t, r) {
  const { getTrackProps: n } = uu(),
    o = du(),
    a = n(t, r);
  return Mo.jsx(lu.chakra.div, {
    ...a,
    className: iu.cx("chakra-slider__track", t.className),
    __css: o.track,
    "data-testid": "chakra-range-slider-track",
  });
});
JL.displayName = "RangeSliderTrack";
const e5 = cu.forwardRef(function (t, r) {
  const { getInnerTrackProps: n } = uu(),
    o = du(),
    a = n(t, r);
  return Mo.jsx(lu.chakra.div, {
    ...a,
    className: "chakra-slider__filled-track",
    __css: o.filledTrack,
  });
});
e5.displayName = "RangeSliderFilledTrack";
const t5 = cu.forwardRef(function (t, r) {
  const { getMarkerProps: n } = uu(),
    o = du(),
    a = n(t, r);
  return Mo.jsx(lu.chakra.div, {
    ...a,
    className: iu.cx("chakra-slider__marker", t.className),
    __css: o.mark,
  });
});
t5.displayName = "RangeSliderMark";
ho.RangeSlider = ZL;
ho.RangeSliderFilledTrack = e5;
ho.RangeSliderMark = t5;
ho.RangeSliderProvider = YL;
ho.RangeSliderThumb = QL;
ho.RangeSliderTrack = JL;
ho.useRangeSliderContext = uu;
ho.useRangeSliderStyles = du;
var po = {},
  Bx = {},
  cn = le,
  st = x,
  yt = g,
  ZT = Oi;
function uwe(e) {
  const {
      min: t = 0,
      max: r = 100,
      onChange: n,
      value: o,
      defaultValue: a,
      isReversed: s,
      direction: i = "ltr",
      orientation: c = "horizontal",
      id: l,
      isDisabled: u,
      isReadOnly: d,
      onChangeStart: f,
      onChangeEnd: m,
      step: h = 1,
      getAriaValueText: p,
      "aria-valuetext": v,
      "aria-label": b,
      "aria-labelledby": y,
      name: S,
      focusThumbOnChange: w = !0,
      ...C
    } = e,
    T = cn.useCallbackRef(f),
    k = cn.useCallbackRef(m),
    R = cn.useCallbackRef(p),
    E = ZT.getIsReversed({ isReversed: s, direction: i, orientation: c }),
    [_, N] = cn.useControllableState({
      value: o,
      defaultValue: a ?? fwe(t, r),
      onChange: n,
    }),
    [G, B] = yt.useState(!1),
    [z, Y] = yt.useState(!1),
    W = !(u || d),
    j = (r - t) / 10,
    O = h || (r - t) / 100,
    K = st.clampValue(_, t, r),
    ve = r - K + t,
    re = E ? ve : K,
    ue = st.valueToPercent(re, t, r),
    L = c === "vertical",
    V = cn.useLatestRef({
      min: t,
      max: r,
      step: h,
      isDisabled: u,
      value: K,
      isInteractive: W,
      isReversed: E,
      isVertical: L,
      eventSource: null,
      focusThumbOnChange: w,
      orientation: c,
    }),
    ee = yt.useRef(null),
    pe = yt.useRef(null),
    xe = yt.useRef(null),
    Ce = yt.useId(),
    X = l ?? Ce,
    [de, Q] = [`slider-thumb-${X}`, `slider-track-${X}`],
    J = yt.useCallback(
      (q) => {
        var Rt;
        if (!ee.current) return;
        const oe = V.current;
        oe.eventSource = "pointer";
        const nt = ee.current.getBoundingClientRect(),
          { clientX: jt, clientY: Z } =
            ((Rt = q.touches) == null ? void 0 : Rt[0]) ?? q,
          ie = L ? nt.bottom - Z : jt - nt.left,
          fe = L ? nt.height : nt.width;
        let _e = ie / fe;
        E && (_e = 1 - _e);
        let Ie = st.percentToValue(_e, oe.min, oe.max);
        return (
          oe.step &&
            (Ie = parseFloat(st.roundValueToStep(Ie, oe.min, oe.step))),
          (Ie = st.clampValue(Ie, oe.min, oe.max)),
          Ie
        );
      },
      [L, E, V]
    ),
    ne = yt.useCallback(
      (q) => {
        const oe = V.current;
        oe.isInteractive &&
          ((q = parseFloat(st.roundValueToStep(q, oe.min, O))),
          (q = st.clampValue(q, oe.min, oe.max)),
          N(q));
      },
      [O, N, V]
    ),
    we = yt.useMemo(
      () => ({
        stepUp(q = O) {
          const oe = E ? K - q : K + q;
          ne(oe);
        },
        stepDown(q = O) {
          const oe = E ? K + q : K - q;
          ne(oe);
        },
        reset() {
          ne(a || 0);
        },
        stepTo(q) {
          ne(q);
        },
      }),
      [ne, E, K, O, a]
    ),
    ae = yt.useCallback(
      (q) => {
        const oe = V.current,
          jt = {
            ArrowRight: () => we.stepUp(),
            ArrowUp: () => we.stepUp(),
            ArrowLeft: () => we.stepDown(),
            ArrowDown: () => we.stepDown(),
            PageUp: () => we.stepUp(j),
            PageDown: () => we.stepDown(j),
            Home: () => ne(oe.min),
            End: () => ne(oe.max),
          }[q.key];
        jt &&
          (q.preventDefault(),
          q.stopPropagation(),
          jt(q),
          (oe.eventSource = "keyboard"));
      },
      [we, ne, j, V]
    ),
    ye = (R == null ? void 0 : R(K)) ?? v,
    {
      getThumbStyle: U,
      rootStyle: be,
      trackStyle: ge,
      innerTrackStyle: Te,
    } = yt.useMemo(() => {
      const q = V.current;
      return ZT.getStyles({
        isReversed: E,
        orientation: q.orientation,
        thumbPercents: [ue],
      });
    }, [E, ue, V]),
    He = yt.useCallback(() => {
      V.current.focusThumbOnChange &&
        setTimeout(() => {
          var oe;
          return (oe = pe.current) == null ? void 0 : oe.focus();
        });
    }, [V]);
  cn.useUpdateEffect(() => {
    const q = V.current;
    He(), q.eventSource === "keyboard" && (k == null || k(q.value));
  }, [K, k]);
  function Ue(q) {
    const oe = J(q);
    oe != null && oe !== V.current.value && N(oe);
  }
  cn.usePanEvent(xe, {
    onPanSessionStart(q) {
      const oe = V.current;
      oe.isInteractive && (B(!0), He(), Ue(q), T == null || T(oe.value));
    },
    onPanSessionEnd() {
      const q = V.current;
      q.isInteractive && (B(!1), k == null || k(q.value));
    },
    onPan(q) {
      V.current.isInteractive && Ue(q);
    },
  });
  const Ze = yt.useCallback(
      (q = {}, oe = null) => ({
        ...q,
        ...C,
        ref: cn.mergeRefs(oe, xe),
        tabIndex: -1,
        "aria-disabled": st.ariaAttr(u),
        "data-focused": st.dataAttr(z),
        style: { ...q.style, ...be },
      }),
      [C, u, z, be]
    ),
    wt = yt.useCallback(
      (q = {}, oe = null) => ({
        ...q,
        ref: cn.mergeRefs(oe, ee),
        id: Q,
        "data-disabled": st.dataAttr(u),
        style: { ...q.style, ...ge },
      }),
      [u, Q, ge]
    ),
    nr = yt.useCallback(
      (q = {}, oe = null) => ({ ...q, ref: oe, style: { ...q.style, ...Te } }),
      [Te]
    ),
    or = yt.useCallback(
      (q = {}, oe = null) => ({
        ...q,
        ref: cn.mergeRefs(oe, pe),
        role: "slider",
        tabIndex: W ? 0 : void 0,
        id: de,
        "data-active": st.dataAttr(G),
        "aria-valuetext": ye,
        "aria-valuemin": t,
        "aria-valuemax": r,
        "aria-valuenow": K,
        "aria-orientation": c,
        "aria-disabled": st.ariaAttr(u),
        "aria-readonly": st.ariaAttr(d),
        "aria-label": b,
        "aria-labelledby": b ? void 0 : y,
        style: { ...q.style, ...U(0) },
        onKeyDown: st.callAllHandlers(q.onKeyDown, ae),
        onFocus: st.callAllHandlers(q.onFocus, () => Y(!0)),
        onBlur: st.callAllHandlers(q.onBlur, () => Y(!1)),
      }),
      [W, de, G, ye, t, r, K, c, u, d, b, y, U, ae]
    ),
    wr = yt.useCallback(
      (q, oe = null) => {
        const nt = !(q.value < t || q.value > r),
          jt = K >= q.value,
          Z = st.valueToPercent(q.value, t, r),
          ie = {
            position: "absolute",
            pointerEvents: "none",
            ...dwe({
              orientation: c,
              vertical: { bottom: E ? `${100 - Z}%` : `${Z}%` },
              horizontal: { left: E ? `${100 - Z}%` : `${Z}%` },
            }),
          };
        return {
          ...q,
          ref: oe,
          role: "presentation",
          "aria-hidden": !0,
          "data-disabled": st.dataAttr(u),
          "data-invalid": st.dataAttr(!nt),
          "data-highlighted": st.dataAttr(jt),
          style: { ...q.style, ...ie },
        };
      },
      [u, E, r, t, c, K]
    ),
    H = yt.useCallback(
      (q = {}, oe = null) => ({
        ...q,
        ref: oe,
        type: "hidden",
        value: K,
        name: S,
      }),
      [S, K]
    );
  return {
    state: { value: K, isFocused: z, isDragging: G },
    actions: we,
    getRootProps: Ze,
    getTrackProps: wt,
    getInnerTrackProps: nr,
    getThumbProps: or,
    getMarkerProps: wr,
    getInputProps: H,
  };
}
function dwe(e) {
  const { orientation: t, vertical: r, horizontal: n } = e;
  return t === "vertical" ? r : n;
}
function fwe(e, t) {
  return t < e ? e : e + (t - e) / 2;
}
Bx.useSlider = uwe;
var Ao = P,
  mwe = I,
  Ya = x,
  hwe = Bx,
  pwe = $r,
  fu = D,
  vwe = he,
  mu = M;
const [r5, hu] = Ya.createContext({
    name: "SliderContext",
    hookName: "useSliderContext",
    providerName: "<Slider />",
  }),
  [ywe, pu] = Ya.createContext({
    name: "SliderStylesContext",
    hookName: "useSliderStyles",
    providerName: "<Slider />",
  }),
  n5 = fu.forwardRef((e, t) => {
    const r = {
        ...e,
        orientation: (e == null ? void 0 : e.orientation) ?? "horizontal",
      },
      n = vwe.useMultiStyleConfig("Slider", r),
      o = mwe.omitThemingProps(r),
      { direction: a } = pwe.useTheme();
    o.direction = a;
    const { getInputProps: s, getRootProps: i, ...c } = hwe.useSlider(o),
      l = i(),
      u = s({}, t);
    return Ao.jsx(r5, {
      value: c,
      children: Ao.jsx(ywe, {
        value: n,
        children: Ao.jsxs(mu.chakra.div, {
          ...l,
          className: Ya.cx("chakra-slider", r.className),
          __css: n.container,
          children: [r.children, Ao.jsx("input", { ...u })],
        }),
      }),
    });
  });
n5.displayName = "Slider";
const o5 = fu.forwardRef((e, t) => {
  const { getThumbProps: r } = hu(),
    n = pu(),
    o = r(e, t);
  return Ao.jsx(mu.chakra.div, {
    ...o,
    className: Ya.cx("chakra-slider__thumb", e.className),
    __css: n.thumb,
  });
});
o5.displayName = "SliderThumb";
const a5 = fu.forwardRef((e, t) => {
  const { getTrackProps: r } = hu(),
    n = pu(),
    o = r(e, t);
  return Ao.jsx(mu.chakra.div, {
    ...o,
    className: Ya.cx("chakra-slider__track", e.className),
    __css: n.track,
  });
});
a5.displayName = "SliderTrack";
const s5 = fu.forwardRef((e, t) => {
  const { getInnerTrackProps: r } = hu(),
    n = pu(),
    o = r(e, t);
  return Ao.jsx(mu.chakra.div, {
    ...o,
    className: Ya.cx("chakra-slider__filled-track", e.className),
    __css: n.filledTrack,
  });
});
s5.displayName = "SliderFilledTrack";
const i5 = fu.forwardRef((e, t) => {
  const { getMarkerProps: r } = hu(),
    n = pu(),
    o = r(e, t);
  return Ao.jsx(mu.chakra.div, {
    ...o,
    className: Ya.cx("chakra-slider__marker", e.className),
    __css: n.mark,
  });
});
i5.displayName = "SliderMark";
po.Slider = n5;
po.SliderFilledTrack = s5;
po.SliderMark = i5;
po.SliderProvider = r5;
po.SliderThumb = o5;
po.SliderTrack = a5;
po.useSliderContext = hu;
po.useSliderStyles = pu;
var c5 = {},
  gwe = M;
const l5 = gwe.chakra("div", {
  baseStyle: { flex: 1, justifySelf: "stretch", alignSelf: "stretch" },
});
l5.displayName = "Spacer";
c5.Spacer = l5;
var u5 = {},
  xh = {},
  d5 = {},
  bwe = P,
  Swe = M;
const f5 = (e) =>
  bwe.jsx(Swe.chakra.div, {
    className: "chakra-stack__item",
    ...e,
    __css: {
      display: "inline-block",
      flex: "0 0 auto",
      minWidth: 0,
      ...e.__css,
    },
  });
f5.displayName = "StackItem";
d5.StackItem = f5;
var m5 = {},
  xwe = x;
function $we(e) {
  const { spacing: t, direction: r } = e,
    n = {
      column: { my: t, mx: 0, borderLeftWidth: 0, borderBottomWidth: "1px" },
      "column-reverse": {
        my: t,
        mx: 0,
        borderLeftWidth: 0,
        borderBottomWidth: "1px",
      },
      row: { mx: t, my: 0, borderLeftWidth: "1px", borderBottomWidth: 0 },
      "row-reverse": {
        mx: t,
        my: 0,
        borderLeftWidth: "1px",
        borderBottomWidth: 0,
      },
    };
  return { "&": xwe.mapResponsive(r, (o) => n[o]) };
}
m5.getDividerStyles = $we;
var Lv = P,
  QT = x,
  Td = g,
  wwe = d5,
  Cwe = m5,
  kwe = D,
  Twe = M;
const h5 = kwe.forwardRef((e, t) => {
  const {
      isInline: r,
      direction: n,
      align: o,
      justify: a,
      spacing: s = "0.5rem",
      wrap: i,
      children: c,
      divider: l,
      className: u,
      shouldWrapChildren: d,
      ...f
    } = e,
    m = r ? "row" : n ?? "column",
    h = Td.useMemo(
      () => Cwe.getDividerStyles({ spacing: s, direction: m }),
      [s, m]
    ),
    p = !!l,
    v = !d && !p,
    b = Td.useMemo(() => {
      const S = QT.getValidChildren(c);
      return v
        ? S
        : S.map((w, C) => {
            const T = typeof w.key < "u" ? w.key : C,
              k = C + 1 === S.length,
              R = Lv.jsx(wwe.StackItem, { children: w }, T),
              E = d ? R : w;
            if (!p) return E;
            const _ = Td.cloneElement(l, { __css: h }),
              N = k ? null : _;
            return Lv.jsxs(Td.Fragment, { children: [E, N] }, T);
          });
    }, [l, h, p, v, d, c]),
    y = QT.cx("chakra-stack", u);
  return Lv.jsx(Twe.chakra.div, {
    ref: t,
    display: "flex",
    alignItems: o,
    justifyContent: a,
    flexDirection: m,
    flexWrap: i,
    gap: p ? void 0 : s,
    className: y,
    ...f,
    children: b,
  });
});
h5.displayName = "Stack";
xh.Stack = h5;
var Pwe = P,
  Rwe = xh,
  Awe = D;
const p5 = Awe.forwardRef((e, t) =>
  Pwe.jsx(Rwe.Stack, { align: "center", ...e, direction: "row", ref: t })
);
p5.displayName = "HStack";
u5.HStack = p5;
var v5 = {},
  _we = P,
  Iwe = M;
const y5 = (e) =>
  _we.jsx(Iwe.chakra.div, {
    className: "chakra-stack__divider",
    ...e,
    __css: {
      ...e.__css,
      borderWidth: 0,
      alignSelf: "stretch",
      borderColor: "inherit",
      width: "auto",
      height: "auto",
    },
  });
y5.displayName = "StackDivider";
v5.StackDivider = y5;
var g5 = {},
  Ewe = P,
  Mwe = xh,
  Fwe = D;
const b5 = Fwe.forwardRef((e, t) =>
  Ewe.jsx(Mwe.Stack, { align: "center", ...e, direction: "column", ref: t })
);
b5.displayName = "VStack";
g5.VStack = b5;
var Za = {},
  Vv = P,
  jwe = I,
  S5 = x,
  Dwe = D,
  Nwe = he,
  Owe = M;
const [Bwe, Lwe] = S5.createContext({
    name: "StatStylesContext",
    errorMessage: `useStatStyles returned is 'undefined'. Seems you forgot to wrap the components in "<Stat />" `,
  }),
  x5 = Dwe.forwardRef(function (t, r) {
    const n = Nwe.useMultiStyleConfig("Stat", t),
      o = { position: "relative", flex: "1 1 0%", ...n.container },
      { className: a, children: s, ...i } = jwe.omitThemingProps(t);
    return Vv.jsx(Bwe, {
      value: n,
      children: Vv.jsx(Owe.chakra.div, {
        ref: r,
        ...i,
        className: S5.cx("chakra-stat", a),
        __css: o,
        children: Vv.jsx("dl", { children: s }),
      }),
    });
  });
x5.displayName = "Stat";
Za.Stat = x5;
Za.useStatStyles = Lwe;
var $h = {},
  _o = P,
  Vwe = Za,
  $5 = Dr,
  zwe = M;
const Lx = (e) =>
  _o.jsx($5.Icon, {color: "red.400",
    ...e,
    children: _o.jsx("path", {
      fill: "currentColor",
      d: "M21,5H3C2.621,5,2.275,5.214,2.105,5.553C1.937,5.892,1.973,6.297,2.2,6.6l9,12 c0.188,0.252,0.485,0.4,0.8,0.4s0.611-0.148,0.8-0.4l9-12c0.228-0.303,0.264-0.708,0.095-1.047C21.725,5.214,21.379,5,21,5z",
    }),
  });
Lx.displayName = "StatDownArrow";
function Vx(e) {
  return _o.jsx($5.Icon, {color: "green.400",
    ...e,
    children: _o.jsx("path", {
      fill: "currentColor",
      d: "M12.8,5.4c-0.377-0.504-1.223-0.504-1.6,0l-9,12c-0.228,0.303-0.264,0.708-0.095,1.047 C2.275,18.786,2.621,19,3,19h18c0.379,0,0.725-0.214,0.895-0.553c0.169-0.339,0.133-0.744-0.095-1.047L12.8,5.4z",
    }),
  });
}
Vx.displayName = "StatUpArrow";
function w5(e) {
  const { type: t, "aria-label": r, ...n } = e,
    o = Vwe.useStatStyles(),
    a = t === "increase" ? Vx : Lx,
    i = r || (t === "increase" ? "increased by" : "decreased by");
  return _o.jsxs(_o.Fragment, {
    children: [
      _o.jsx(zwe.chakra.span, { srOnly: !0, children: i }),
      _o.jsx(a, { "aria-hidden": !0, ...n, __css: o.icon }),
    ],
  });
}
w5.displayName = "StatArrow";
$h.StatArrow = w5;
$h.StatDownArrow = Lx;
$h.StatUpArrow = Vx;
var C5 = {},
  Hwe = P,
  Wwe = x,
  Gwe = D,
  Uwe = M;
const k5 = Gwe.forwardRef(function (t, r) {
  return Hwe.jsx(Uwe.chakra.div, {
    ...t,
    ref: r,
    role: "group",
    className: Wwe.cx("chakra-stat__group", t.className),
    __css: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      alignItems: "flex-start",
    },
  });
});
k5.displayName = "StatGroup";
C5.StatGroup = k5;
var T5 = {},
  Kwe = P,
  qwe = x,
  Xwe = Za,
  Ywe = D,
  Zwe = M;
const P5 = Ywe.forwardRef(function (t, r) {
  const n = Xwe.useStatStyles();
  return Kwe.jsx(Zwe.chakra.dd, {
    ref: r,
    ...t,
    className: qwe.cx("chakra-stat__help-text", t.className),
    __css: n.helpText,
  });
});
P5.displayName = "StatHelpText";
T5.StatHelpText = P5;
var R5 = {},
  Qwe = P,
  Jwe = x,
  eCe = Za,
  tCe = D,
  rCe = M;
const A5 = tCe.forwardRef(function (t, r) {
  const n = eCe.useStatStyles();
  return Qwe.jsx(rCe.chakra.dt, {
    ref: r,
    ...t,
    className: Jwe.cx("chakra-stat__label", t.className),
    __css: n.label,
  });
});
A5.displayName = "StatLabel";
R5.StatLabel = A5;
var _5 = {},
  nCe = P,
  oCe = x,
  aCe = Za,
  sCe = D,
  iCe = M;
const I5 = sCe.forwardRef(function (t, r) {
  const n = aCe.useStatStyles();
  return nCe.jsx(iCe.chakra.dd, {
    ref: r,
    ...t,
    className: oCe.cx("chakra-stat__number", t.className),
    __css: {
      ...n.number,
      fontFeatureSettings: "pnum",
      fontVariantNumeric: "proportional-nums",
    },
  });
});
I5.displayName = "StatNumber";
_5.StatNumber = I5;
var E5 = {},
  rr = {},
  cCe = x,
  lCe = en;
const [uCe, dCe] = cCe.createContext({ name: "StepContext" }),
  [fCe, mCe] = lCe.createStylesContext("Stepper");
rr.StepContextProvider = uCe;
rr.StepperStylesProvider = fCe;
rr.useStepContext = dCe;
rr.useStepperStyles = mCe;
var hCe = P,
  JT = x,
  eP = rr,
  pCe = D,
  vCe = M;
const yCe = pCe.forwardRef(function (t, r) {
  const {
      orientation: n,
      status: o,
      showLastSeparator: a,
    } = eP.useStepContext(),
    s = eP.useStepperStyles();
  return hCe.jsx(vCe.chakra.div, {
    ref: r,
    "data-status": o,
    "data-orientation": n,
    "data-stretch": JT.dataAttr(a),
    __css: s.step,
    ...t,
    className: JT.cx("chakra-step", t.className),
  });
});
E5.Step = yCe;
var M5 = {},
  gCe = P,
  bCe = x,
  tP = rr,
  SCe = D,
  xCe = M;
const $Ce = SCe.forwardRef(function (t, r) {
  const { status: n } = tP.useStepContext(),
    o = tP.useStepperStyles();
  return gCe.jsx(xCe.chakra.p, {
    ref: r,
    "data-status": n,
    ...t,
    className: bCe.cx("chakra-step__description", t.className),
    __css: o.description,
  });
});
M5.StepDescription = $Ce;
var zx = {},
  F5 = {},
  rP = P;
function wCe(e) {
  return rP.jsx("svg", {stroke: "currentColor",
    fill: "currentColor",
    strokeWidth: "0",
    viewBox: "0 0 20 20",
    "aria-hidden": "true",
    height: "1em",
    width: "1em",
    ...e,
    children: rP.jsx("path", {
      fillRule: "evenodd",
      d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",
      clipRule: "evenodd",
    }),
  });
}
F5.CheckIcon = wCe;
var CCe = P,
  kCe = x,
  TCe = F5,
  nP = rr,
  PCe = Dr;
function RCe(e) {
  const { status: t } = nP.useStepContext(),
    r = nP.useStepperStyles(),
    n = t === "complete" ? TCe.CheckIcon : void 0;
  return CCe.jsx(PCe.Icon, {
    as: n,
    __css: r.icon,
    ...e,
    className: kCe.cx("chakra-step__icon", e.className),
  });
}
zx.StepIcon = RCe;
var Hx = {},
  Wx = {},
  ACe = P,
  _Ce = x,
  oP = rr,
  ICe = D,
  ECe = M;
const MCe = ICe.forwardRef(function (t, r) {
  const { children: n, ...o } = t,
    { status: a, index: s } = oP.useStepContext(),
    i = oP.useStepperStyles();
  return ACe.jsx(ECe.chakra.div, {
    ref: r,
    "data-status": a,
    __css: i.number,
    ...o,
    className: _Ce.cx("chakra-step__number", t.className),
    children: n || s + 1,
  });
});
Wx.StepNumber = MCe;
var Gx = {},
  aP = P,
  zv = x,
  FCe = rr;
function jCe(e) {
  const { complete: t, incomplete: r, active: n } = e,
    o = FCe.useStepContext();
  let a = null;
  switch (o.status) {
    case "complete":
      a = zv.runIfFn(t, o);
      break;
    case "incomplete":
      a = zv.runIfFn(r, o);
      break;
    case "active":
      a = zv.runIfFn(n, o);
      break;
  }
  return a ? aP.jsx(aP.Fragment, { children: a }) : null;
}
Gx.StepStatus = jCe;
var Mc = P,
  DCe = x,
  sP = rr,
  NCe = zx,
  iP = Wx,
  OCe = Gx,
  BCe = D,
  LCe = M;
const VCe = BCe.forwardRef(function (t, r) {
  const { status: n } = sP.useStepContext(),
    o = sP.useStepperStyles();
  return Mc.jsx(LCe.chakra.div, {
    ref: r,
    "data-status": n,
    ...t,
    __css: o.indicator,
    className: DCe.cx("chakra-step__indicator", t.className),
  });
});
function zCe() {
  return Mc.jsx(OCe.StepStatus, {
    complete: Mc.jsx(NCe.StepIcon, {}),
    incomplete: Mc.jsx(iP.StepNumber, {}),
    active: Mc.jsx(iP.StepNumber, {}),
  });
}
Hx.StepIndicator = VCe;
Hx.StepIndicatorContent = zCe;
var j5 = {},
  HCe = P,
  WCe = x,
  cP = rr,
  GCe = D,
  UCe = M;
const KCe = GCe.forwardRef(function (t, r) {
  const {
      orientation: n,
      status: o,
      isLast: a,
      showLastSeparator: s,
    } = cP.useStepContext(),
    i = cP.useStepperStyles();
  return a && !s
    ? null
    : HCe.jsx(UCe.chakra.div, {
        ref: r,
        role: "separator",
        "data-orientation": n,
        "data-status": o,
        __css: i.separator,
        ...t,
        className: WCe.cx("chakra-step__separator", t.className),
      });
});
j5.StepSeparator = KCe;
var D5 = {},
  qCe = P,
  XCe = x,
  lP = rr,
  YCe = D,
  ZCe = M;
const QCe = YCe.forwardRef(function (t, r) {
  const { status: n } = lP.useStepContext(),
    o = lP.useStepperStyles();
  return qCe.jsx(ZCe.chakra.h3, {
    ref: r,
    "data-status": n,
    ...t,
    __css: o.title,
    className: XCe.cx("chakra-step__title", t.className),
  });
});
D5.StepTitle = QCe;
var N5 = {},
  Hv = P,
  JCe = I,
  eke = x,
  tke = g,
  uP = rr,
  rke = D,
  nke = he,
  oke = M;
const ake = rke.forwardRef(function (t, r) {
  const n = nke.useMultiStyleConfig("Stepper", t),
    {
      children: o,
      index: a,
      orientation: s = "horizontal",
      showLastSeparator: i = !1,
      ...c
    } = JCe.omitThemingProps(t),
    l = tke.Children.toArray(o),
    u = l.length;
  function d(f) {
    return f < a ? "complete" : f > a ? "incomplete" : "active";
  }
  return Hv.jsx(oke.chakra.div, {
    ref: r,
    "aria-label": "Progress",
    "data-orientation": s,
    ...c,
    __css: n.stepper,
    className: eke.cx("chakra-stepper", t.className),
    children: Hv.jsx(uP.StepperStylesProvider, {
      value: n,
      children: l.map((f, m) =>
        Hv.jsx(
          uP.StepContextProvider,
          {
            value: {
              index: m,
              status: d(m),
              orientation: s,
              showLastSeparator: i,
              count: u,
              isFirst: m === 0,
              isLast: m === u - 1,
            },
            children: f,
          },
          m
        )
      ),
    }),
  });
});
N5.Stepper = ake;
var O5 = {},
  ske = g;
function ike(e = {}) {
  const { index: t = 0, count: r } = e,
    [n, o] = ske.useState(t),
    a = typeof r == "number" ? r - 1 : 0,
    s = n / a;
  return {
    activeStep: n,
    setActiveStep: o,
    activeStepPercent: Number.isNaN(s) ? 0 : s,
    isActiveStep(i) {
      return i === n;
    },
    isCompleteStep(i) {
      return i < n;
    },
    isIncompleteStep(i) {
      return i > n;
    },
    getStatus(i) {
      return i < n ? "complete" : i > n ? "incomplete" : "active";
    },
    goToNext() {
      o((i) => (typeof r == "number" ? Math.min(r, i + 1) : i + 1));
    },
    goToPrevious() {
      o((i) => Math.max(0, i - 1));
    },
  };
}
O5.useSteps = ike;
var B5 = {},
  Sc = P,
  cke = I,
  lke = x,
  Wv = g,
  uke = zm,
  dke = D,
  fke = he,
  Pd = M;
const L5 = dke.forwardRef(function (t, r) {
  const n = fke.useMultiStyleConfig("Switch", t),
    { spacing: o = "0.5rem", children: a, ...s } = cke.omitThemingProps(t),
    {
      getIndicatorProps: i,
      getInputProps: c,
      getCheckboxProps: l,
      getRootProps: u,
      getLabelProps: d,
    } = uke.useCheckbox(s),
    f = Wv.useMemo(
      () => ({
        display: "inline-block",
        position: "relative",
        verticalAlign: "middle",
        lineHeight: 0,
        ...n.container,
      }),
      [n.container]
    ),
    m = Wv.useMemo(
      () => ({
        display: "inline-flex",
        flexShrink: 0,
        justifyContent: "flex-start",
        boxSizing: "content-box",
        cursor: "pointer",
        ...n.track,
      }),
      [n.track]
    ),
    h = Wv.useMemo(
      () => ({ userSelect: "none", marginStart: o, ...n.label }),
      [o, n.label]
    );
  return Sc.jsxs(Pd.chakra.label, {
    ...u(),
    className: lke.cx("chakra-switch", t.className),
    __css: f,
    children: [
      Sc.jsx("input", { className: "chakra-switch__input", ...c({}, r) }),
      Sc.jsx(Pd.chakra.span, {
        ...l(),
        className: "chakra-switch__track",
        __css: m,
        children: Sc.jsx(Pd.chakra.span, {
          __css: n.thumb,
          className: "chakra-switch__thumb",
          ...i(),
        }),
      }),
      a &&
        Sc.jsx(Pd.chakra.span, {
          className: "chakra-switch__label",
          ...d(),
          __css: h,
          children: a,
        }),
    ],
  });
});
L5.displayName = "Switch";
B5.Switch = L5;
var jn = {},
  dP = P,
  mke = I,
  V5 = x,
  hke = D,
  pke = he,
  vke = M;
const [yke, gke] = V5.createContext({
    name: "TableStylesContext",
    errorMessage: `useTableStyles returned is 'undefined'. Seems you forgot to wrap the components in "<Table />" `,
  }),
  z5 = hke.forwardRef((e, t) => {
    const r = pke.useMultiStyleConfig("Table", e),
      { className: n, layout: o, ...a } = mke.omitThemingProps(e);
    return dP.jsx(yke, {
      value: r,
      children: dP.jsx(vke.chakra.table, {
        ref: t,
        __css: { tableLayout: o, ...r.table },
        className: V5.cx("chakra-table", n),
        ...a,
      }),
    });
  });
z5.displayName = "Table";
jn.Table = z5;
jn.useTableStyles = gke;
var H5 = {},
  bke = P,
  Ske = jn,
  xke = D,
  $ke = M;
const W5 = xke.forwardRef((e, t) => {
  const { placement: r = "bottom", ...n } = e,
    o = Ske.useTableStyles();
  return bke.jsx($ke.chakra.caption, {
    ...n,
    ref: t,
    __css: { ...o.caption, captionSide: r },
  });
});
W5.displayName = "TableCaption";
H5.TableCaption = W5;
var G5 = {},
  wke = P,
  Cke = x,
  kke = D,
  Tke = M;
const Pke = kke.forwardRef((e, t) => {
  const { overflow: r, overflowX: n, className: o, ...a } = e;
  return wke.jsx(Tke.chakra.div, {
    ref: t,
    className: Cke.cx("chakra-table__container", o),
    ...a,
    __css: {
      display: "block",
      whiteSpace: "nowrap",
      WebkitOverflowScrolling: "touch",
      overflowX: r ?? n ?? "auto",
      overflowY: "hidden",
      maxWidth: "100%",
    },
  });
});
G5.TableContainer = Pke;
var U5 = {},
  Rke = P,
  Ake = jn,
  _ke = D,
  Ike = M;
const Eke = _ke.forwardRef((e, t) => {
  const r = Ake.useTableStyles();
  return Rke.jsx(Ike.chakra.tbody, { ...e, ref: t, __css: r.tbody });
});
U5.Tbody = Eke;
var K5 = {},
  Mke = P,
  Fke = jn,
  jke = D,
  Dke = M;
const Nke = jke.forwardRef(({ isNumeric: e, ...t }, r) => {
  const n = Fke.useTableStyles();
  return Mke.jsx(Dke.chakra.td, {
    ...t,
    ref: r,
    __css: n.td,
    "data-is-numeric": e,
  });
});
K5.Td = Nke;
var q5 = {},
  Oke = P,
  Bke = jn,
  Lke = D,
  Vke = M;
const zke = Lke.forwardRef((e, t) => {
  const r = Bke.useTableStyles();
  return Oke.jsx(Vke.chakra.tfoot, { ...e, ref: t, __css: r.tfoot });
});
q5.Tfoot = zke;
var X5 = {},
  Hke = P,
  Wke = jn,
  Gke = D,
  Uke = M;
const Kke = Gke.forwardRef(({ isNumeric: e, ...t }, r) => {
  const n = Wke.useTableStyles();
  return Hke.jsx(Uke.chakra.th, {
    ...t,
    ref: r,
    __css: n.th,
    "data-is-numeric": e,
  });
});
X5.Th = Kke;
var Y5 = {},
  qke = P,
  Xke = jn,
  Yke = D,
  Zke = M;
const Qke = Yke.forwardRef((e, t) => {
  const r = Xke.useTableStyles();
  return qke.jsx(Zke.chakra.thead, { ...e, ref: t, __css: r.thead });
});
Y5.Thead = Qke;
var Z5 = {},
  Jke = P,
  eTe = jn,
  tTe = D,
  rTe = M;
const nTe = tTe.forwardRef((e, t) => {
  const r = eTe.useTableStyles();
  return Jke.jsx(rTe.chakra.tr, { ...e, ref: t, __css: r.tr });
});
Z5.Tr = nTe;
var Q5 = {},
  Qo = {},
  pt = {},
  Ux = le,
  Ma = x,
  Fo = g,
  oTe = Fi,
  aTe = bx;
const [sTe, Kx, J5, eV] = oTe.createDescendantContext();
function iTe(e) {
  const {
      defaultIndex: t,
      onChange: r,
      index: n,
      isManual: o,
      isLazy: a,
      lazyBehavior: s = "unmount",
      orientation: i = "horizontal",
      direction: c = "ltr",
      ...l
    } = e,
    [u, d] = Fo.useState(t ?? 0),
    [f, m] = Ux.useControllableState({
      defaultValue: t ?? 0,
      value: n,
      onChange: r,
    });
  Fo.useEffect(() => {
    n != null && d(n);
  }, [n]);
  const h = J5(),
    p = Fo.useId();
  return {
    id: `tabs-${e.id ?? p}`,
    selectedIndex: f,
    focusedIndex: u,
    setSelectedIndex: m,
    setFocusedIndex: d,
    isManual: o,
    isLazy: a,
    lazyBehavior: s,
    orientation: i,
    descendants: h,
    direction: c,
    htmlProps: l,
  };
}
const [cTe, Bi] = Ma.createContext({
  name: "TabsContext",
  errorMessage:
    "useTabsContext: `context` is undefined. Seems you forgot to wrap all tabs components within <Tabs />",
});
function lTe(e) {
  const { focusedIndex: t, orientation: r, direction: n } = Bi(),
    o = Kx(),
    a = Fo.useCallback(
      (s) => {
        const i = () => {
            var S;
            const y = o.nextEnabled(t);
            y && ((S = y.node) == null || S.focus());
          },
          c = () => {
            var S;
            const y = o.prevEnabled(t);
            y && ((S = y.node) == null || S.focus());
          },
          l = () => {
            var S;
            const y = o.firstEnabled();
            y && ((S = y.node) == null || S.focus());
          },
          u = () => {
            var S;
            const y = o.lastEnabled();
            y && ((S = y.node) == null || S.focus());
          },
          d = r === "horizontal",
          f = r === "vertical",
          m = s.key,
          h = n === "ltr" ? "ArrowLeft" : "ArrowRight",
          p = n === "ltr" ? "ArrowRight" : "ArrowLeft",
          b = {
            [h]: () => d && c(),
            [p]: () => d && i(),
            ArrowDown: () => f && i(),
            ArrowUp: () => f && c(),
            Home: l,
            End: u,
          }[m];
        b && (s.preventDefault(), b(s));
      },
      [o, t, r, n]
    );
  return {
    ...e,
    role: "tablist",
    "aria-orientation": r,
    onKeyDown: Ma.callAllHandlers(e.onKeyDown, a),
  };
}
function uTe(e) {
  const { isDisabled: t = !1, isFocusable: r = !1, ...n } = e,
    {
      setSelectedIndex: o,
      isManual: a,
      id: s,
      setFocusedIndex: i,
      selectedIndex: c,
    } = Bi(),
    { index: l, register: u } = eV({ disabled: t && !r }),
    d = l === c,
    f = () => {
      o(l);
    },
    m = () => {
      i(l), !a && !(t && r) && o(l);
    };
  return {
    ...aTe.useClickable({
      ...n,
      ref: Ux.mergeRefs(u, e.ref),
      isDisabled: t,
      isFocusable: r,
      onClick: Ma.callAllHandlers(e.onClick, f),
    }),
    id: tV(s, l),
    role: "tab",
    tabIndex: d ? 0 : -1,
    type: "button",
    "aria-selected": d,
    "aria-controls": rV(s, l),
    onFocus: t ? void 0 : Ma.callAllHandlers(e.onFocus, m),
  };
}
const [dTe, fTe] = Ma.createContext({});
function mTe(e) {
  const t = Bi(),
    { id: r, selectedIndex: n } = t,
    a = Ma.getValidChildren(e.children).map((s, i) =>
      Fo.createElement(
        dTe,
        {
          key: s.key ?? i,
          value: {
            isSelected: i === n,
            id: rV(r, i),
            tabId: tV(r, i),
            selectedIndex: n,
          },
        },
        s
      )
    );
  return { ...e, children: a };
}
function hTe(e) {
  const { children: t, ...r } = e,
    { isLazy: n, lazyBehavior: o } = Bi(),
    { isSelected: a, id: s, tabId: i } = fTe(),
    c = Fo.useRef(!1);
  a && (c.current = !0);
  const l = Ma.lazyDisclosure({
    wasSelected: c.current,
    isSelected: a,
    enabled: n,
    mode: o,
  });
  return {
    tabIndex: 0,
    ...r,
    children: l ? t : null,
    role: "tabpanel",
    "aria-labelledby": i,
    hidden: !a,
    id: s,
  };
}
function pTe() {
  const e = Bi(),
    t = Kx(),
    { selectedIndex: r, orientation: n } = e,
    o = n === "horizontal",
    a = n === "vertical",
    [s, i] = Fo.useState(() => {
      if (o) return { left: 0, width: 0 };
      if (a) return { top: 0, height: 0 };
    }),
    [c, l] = Fo.useState(!1);
  return (
    Ux.useSafeLayoutEffect(() => {
      if (r == null) return;
      const u = t.item(r);
      if (u == null) return;
      o && i({ left: u.node.offsetLeft, width: u.node.offsetWidth }),
        a && i({ top: u.node.offsetTop, height: u.node.offsetHeight });
      const d = requestAnimationFrame(() => {
        l(!0);
      });
      return () => {
        d && cancelAnimationFrame(d);
      };
    }, [r, o, a, t]),
    {
      position: "absolute",
      transitionProperty: "left, right, top, bottom, height, width",
      transitionDuration: c ? "200ms" : "0ms",
      transitionTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
      ...s,
    }
  );
}
function tV(e, t) {
  return `${e}--tab-${t}`;
}
function rV(e, t) {
  return `${e}--tabpanel-${t}`;
}
pt.TabsDescendantsProvider = sTe;
pt.TabsProvider = cTe;
pt.useTab = uTe;
pt.useTabIndicator = pTe;
pt.useTabList = lTe;
pt.useTabPanel = hTe;
pt.useTabPanels = mTe;
pt.useTabs = iTe;
pt.useTabsContext = Bi;
pt.useTabsDescendant = eV;
pt.useTabsDescendants = J5;
pt.useTabsDescendantsContext = Kx;
var Rd = P,
  vTe = I,
  nV = x,
  yTe = g,
  Gv = pt,
  gTe = D,
  bTe = he,
  STe = M;
const [xTe, $Te] = nV.createContext({
    name: "TabsStylesContext",
    errorMessage: `useTabsStyles returned is 'undefined'. Seems you forgot to wrap the components in "<Tabs />" `,
  }),
  oV = gTe.forwardRef(function (t, r) {
    const n = bTe.useMultiStyleConfig("Tabs", t),
      { children: o, className: a, ...s } = vTe.omitThemingProps(t),
      { htmlProps: i, descendants: c, ...l } = Gv.useTabs(s),
      u = yTe.useMemo(() => l, [l]),
      { isFitted: d, ...f } = i,
      m = { position: "relative", ...n.root };
    return Rd.jsx(Gv.TabsDescendantsProvider, {
      value: c,
      children: Rd.jsx(Gv.TabsProvider, {
        value: u,
        children: Rd.jsx(xTe, {
          value: n,
          children: Rd.jsx(STe.chakra.div, {
            className: nV.cx("chakra-tabs", a),
            ref: r,
            ...f,
            __css: m,
            children: o,
          }),
        }),
      }),
    });
  });
oV.displayName = "Tabs";
Qo.Tabs = oV;
Qo.useTabsStyles = $Te;
var wTe = P,
  CTe = I,
  kTe = x,
  TTe = Qo,
  PTe = pt,
  RTe = D,
  ATe = M;
const aV = RTe.forwardRef(function (t, r) {
  const n = TTe.useTabsStyles(),
    o = PTe.useTab({ ...t, ref: r }),
    a = CTe.defineStyle({outline: "0",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      ...n.tab,
    });
  return wTe.jsx(ATe.chakra.button, {
    ...o,
    className: kTe.cx("chakra-tabs__tab", t.className),
    __css: a,
  });
});
aV.displayName = "Tab";
Q5.Tab = aV;
var sV = {},
  _Te = P,
  ITe = x,
  ETe = Qo,
  MTe = pt,
  FTe = D,
  jTe = M;
const iV = FTe.forwardRef(function (t, r) {
  const n = MTe.useTabIndicator(),
    o = { ...t.style, ...n },
    a = ETe.useTabsStyles();
  return _Te.jsx(jTe.chakra.div, {
    ref: r,
    ...t,
    className: ITe.cx("chakra-tabs__tab-indicator", t.className),
    style: o,
    __css: a.indicator,
  });
});
iV.displayName = "TabIndicator";
sV.TabIndicator = iV;
var cV = {},
  DTe = P,
  NTe = I,
  OTe = x,
  BTe = Qo,
  LTe = pt,
  VTe = D,
  zTe = M;
const lV = VTe.forwardRef(function (t, r) {
  const n = LTe.useTabList({ ...t, ref: r }),
    o = BTe.useTabsStyles(),
    a = NTe.defineStyle({ display: "flex", ...o.tablist });
  return DTe.jsx(zTe.chakra.div, {
    ...n,
    className: OTe.cx("chakra-tabs__tablist", t.className),
    __css: a,
  });
});
lV.displayName = "TabList";
cV.TabList = lV;
var uV = {},
  HTe = P,
  WTe = x,
  GTe = Qo,
  UTe = pt,
  KTe = D,
  qTe = M;
const dV = KTe.forwardRef(function (t, r) {
  const n = UTe.useTabPanel({ ...t, ref: r }),
    o = GTe.useTabsStyles();
  return HTe.jsx(qTe.chakra.div, {outline: "0",
    ...n,
    className: WTe.cx("chakra-tabs__tab-panel", t.className),
    __css: o.tabpanel,
  });
});
dV.displayName = "TabPanel";
uV.TabPanel = dV;
var fV = {},
  XTe = P,
  YTe = x,
  ZTe = Qo,
  QTe = pt,
  JTe = D,
  ePe = M;
const mV = JTe.forwardRef(function (t, r) {
  const n = QTe.useTabPanels(t),
    o = ZTe.useTabsStyles();
  return XTe.jsx(ePe.chakra.div, {
    ...n,
    width: "100%",
    ref: r,
    className: YTe.cx("chakra-tabs__tab-panels", t.className),
    __css: o.tabpanels,
  });
});
mV.displayName = "TabPanels";
fV.TabPanels = mV;
var Qa = {},
  to = P,
  tPe = I,
  rPe = x,
  qx = Dr,
  vu = D,
  nPe = he,
  Xx = M;
const [oPe, Yx] = rPe.createContext({
    name: "TagStylesContext",
    errorMessage: `useTagStyles returned is 'undefined'. Seems you forgot to wrap the components in "<Tag />" `,
  }),
  hV = vu.forwardRef((e, t) => {
    const r = nPe.useMultiStyleConfig("Tag", e),
      n = tPe.omitThemingProps(e),
      o = {
        display: "inline-flex",
        verticalAlign: "top",
        alignItems: "center",
        maxWidth: "100%",
        ...r.container,
      };
    return to.jsx(oPe, {
      value: r,
      children: to.jsx(Xx.chakra.span, { ref: t, ...n, __css: o }),
    });
  });
hV.displayName = "Tag";
const pV = vu.forwardRef((e, t) => {
  const r = Yx();
  return to.jsx(Xx.chakra.span, { ref: t, noOfLines: 1, ...e, __css: r.label });
});
pV.displayName = "TagLabel";
const vV = vu.forwardRef((e, t) =>
  to.jsx(qx.Icon, { ref: t, verticalAlign: "top", marginEnd: "0.5rem", ...e })
);
vV.displayName = "TagLeftIcon";
const yV = vu.forwardRef((e, t) =>
  to.jsx(qx.Icon, { ref: t, verticalAlign: "top", marginStart: "0.5rem", ...e })
);
yV.displayName = "TagRightIcon";
const gV = (e) =>
  to.jsx(qx.Icon, {
    verticalAlign: "inherit",
    viewBox: "0 0 512 512",
    ...e,
    children: to.jsx("path", {fill: "currentColor",
      d: "M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z",
    }),
  });
gV.displayName = "TagCloseIcon";
const bV = vu.forwardRef((e, t) => {
  const { isDisabled: r, children: n, ...o } = e,
    s = {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      outline: "0",
      ...Yx().closeButton,
    };
  return to.jsx(Xx.chakra.button, {
    ref: t,
    "aria-label": "close",
    ...o,
    type: "button",
    disabled: r,
    __css: s,
    children: n || to.jsx(gV, {}),
  });
});
bV.displayName = "TagCloseButton";
Qa.Tag = hV;
Qa.TagCloseButton = bV;
Qa.TagLabel = pV;
Qa.TagLeftIcon = vV;
Qa.TagRightIcon = yV;
Qa.useTagStyles = Yx;
var SV = {},
  aPe = P,
  sPe = I,
  fP = x,
  iPe = Ko,
  cPe = D,
  lPe = he,
  uPe = M;
const dPe = ["h", "minH", "height", "minHeight"],
  xV = cPe.forwardRef((e, t) => {
    const r = lPe.useStyleConfig("Textarea", e),
      { className: n, rows: o, ...a } = sPe.omitThemingProps(e),
      s = iPe.useFormControl(a),
      i = o ? fP.omit(r, dPe) : r;
    return aPe.jsx(uPe.chakra.textarea, {
      ref: t,
      rows: o,
      ...s,
      className: fP.cx("chakra-textarea", n),
      __css: i,
    });
  });
xV.displayName = "Textarea";
SV.Textarea = xV;
var Zx = {},
  wh = {},
  Qx = {};
function fPe(e, t) {
  const r = e ?? "bottom",
    o = {
      "top-start": { ltr: "top-left", rtl: "top-right" },
      "top-end": { ltr: "top-right", rtl: "top-left" },
      "bottom-start": { ltr: "bottom-left", rtl: "bottom-right" },
      "bottom-end": { ltr: "bottom-right", rtl: "bottom-left" },
    }[r];
  return (o == null ? void 0 : o[t]) ?? r;
}
Qx.getToastPlacement = fPe;
var mP = x,
  mPe = Wl,
  hPe = Qx,
  xc = Mm;
function pPe(e, t) {
  const r = (o) => ({
      ...t,
      ...o,
      position: hPe.getToastPlacement(
        (o == null ? void 0 : o.position) ?? (t == null ? void 0 : t.position),
        e
      ),
    }),
    n = (o) => {
      const a = r(o),
        s = mPe.createRenderToast(a);
      return xc.toastStore.notify(s, a);
    };
  return (
    (n.update = (o, a) => {
      xc.toastStore.update(o, r(a));
    }),
    (n.promise = (o, a) => {
      const s = n({ ...a.loading, status: "loading", duration: null });
      o.then((i) =>
        n.update(s, {
          status: "success",
          duration: 5e3,
          ...mP.runIfFn(a.success, i),
        })
      ).catch((i) =>
        n.update(s, {
          status: "error",
          duration: 5e3,
          ...mP.runIfFn(a.error, i),
        })
      );
    }),
    (n.closeAll = xc.toastStore.closeAll),
    (n.close = xc.toastStore.close),
    (n.isActive = xc.toastStore.isActive),
    n
  );
}
wh.createToastFn = pPe;
var Uv = P,
  vPe = no,
  yPe = wh,
  gPe = Ua,
  bPe = en,
  SPe = so;
const xPe = { duration: 5e3, variant: "solid" },
  fa = {
    theme: vPe.theme,
    colorMode: "light",
    toggleColorMode: () => {},
    setColorMode: () => {},
    defaultOptions: xPe,
    forced: !1,
  };
function $Pe({
  theme: e = fa.theme,
  colorMode: t = fa.colorMode,
  toggleColorMode: r = fa.toggleColorMode,
  setColorMode: n = fa.setColorMode,
  defaultOptions: o = fa.defaultOptions,
  motionVariants: a,
  toastSpacing: s,
  component: i,
  forced: c,
} = fa) {
  const l = { colorMode: t, setColorMode: n, toggleColorMode: r, forced: c };
  return {
    ToastContainer: () =>
      Uv.jsx(bPe.ThemeProvider, {
        theme: e,
        children: Uv.jsx(SPe.ColorModeContext.Provider, {
          value: l,
          children: Uv.jsx(gPe.ToastProvider, {
            defaultOptions: o,
            motionVariants: a,
            toastSpacing: s,
            component: i,
          }),
        }),
      }),
    toast: yPe.createToastFn(e.direction, o),
  };
}
Zx.createStandaloneToast = $Pe;
Zx.defaultStandaloneParam = fa;
var $V = {},
  wPe = g,
  CPe = wh,
  kPe = Ua,
  TPe = Go;
function PPe(e) {
  const { theme: t } = TPe.useChakra(),
    r = kPe.useToastOptionContext();
  return wPe.useMemo(
    () => CPe.createToastFn(t.direction, { ...r, ...e }),
    [e, t.direction, r]
  );
}
$V.useToast = PPe;
var wV = {},
  CV = {};
const RPe = {
  exit: {
    scale: 0.85,
    opacity: 0,
    transition: {
      opacity: { duration: 0.15, easings: "easeInOut" },
      scale: { duration: 0.2, easings: "easeInOut" },
    },
  },
  enter: {
    scale: 1,
    opacity: 1,
    transition: {
      opacity: { easings: "easeOut", duration: 0.2 },
      scale: { duration: 0.2, ease: [0.175, 0.885, 0.4, 1.1] },
    },
  },
};
CV.scale = RPe;
var Jx = {},
  $c = le,
  vs = x,
  gt = g,
  APe = eu,
  Kv = Mn;
const lg = (e) => {
    var t;
    return ((t = e.current) == null ? void 0 : t.ownerDocument) || document;
  },
  nf = (e) => {
    var t, r;
    return (
      ((r = (t = e.current) == null ? void 0 : t.ownerDocument) == null
        ? void 0
        : r.defaultView) || window
    );
  };
function _Pe(e = {}) {
  const {
      openDelay: t = 0,
      closeDelay: r = 0,
      closeOnClick: n = !0,
      closeOnMouseDown: o,
      closeOnScroll: a,
      closeOnPointerDown: s = o,
      closeOnEsc: i = !0,
      onOpen: c,
      onClose: l,
      placement: u,
      id: d,
      isOpen: f,
      defaultIsOpen: m,
      arrowSize: h = 10,
      arrowShadowColor: p,
      arrowPadding: v,
      modifiers: b,
      isDisabled: y,
      gutter: S,
      offset: w,
      direction: C,
      ...T
    } = e,
    {
      isOpen: k,
      onOpen: R,
      onClose: E,
    } = $c.useDisclosure({
      isOpen: f,
      defaultIsOpen: m,
      onOpen: c,
      onClose: l,
    }),
    {
      referenceRef: _,
      getPopperProps: N,
      getArrowInnerProps: G,
      getArrowProps: B,
    } = APe.usePopper({
      enabled: k,
      placement: u,
      arrowPadding: v,
      modifiers: b,
      gutter: S,
      offset: w,
      direction: C,
    }),
    z = gt.useId(),
    W = `tooltip-${d ?? z}`,
    j = gt.useRef(null),
    O = gt.useRef(void 0),
    K = gt.useCallback(() => {
      O.current && (clearTimeout(O.current), (O.current = void 0));
    }, []),
    ve = gt.useRef(void 0),
    re = gt.useCallback(() => {
      ve.current && (clearTimeout(ve.current), (ve.current = void 0));
    }, []),
    ue = gt.useCallback(() => {
      re(), E();
    }, [E, re]),
    L = IPe(j, ue),
    V = gt.useCallback(() => {
      if (!y && !O.current) {
        k && L();
        const J = nf(j);
        O.current = J.setTimeout(R, t);
      }
    }, [L, y, k, R, t]),
    ee = gt.useCallback(() => {
      K();
      const J = nf(j);
      ve.current = J.setTimeout(ue, r);
    }, [r, ue, K]),
    pe = gt.useCallback(() => {
      k && n && ee();
    }, [n, ee, k]),
    xe = gt.useCallback(() => {
      k && s && ee();
    }, [s, ee, k]),
    Ce = gt.useCallback(
      (J) => {
        k && J.key === "Escape" && ee();
      },
      [k, ee]
    );
  $c.useEventListener(() => lg(j), "keydown", i ? Ce : void 0),
    $c.useEventListener(
      () => {
        if (!a) return null;
        const J = j.current;
        if (!J) return null;
        const ne = vs.getScrollParent(J);
        return ne.localName === "body" ? nf(j) : ne;
      },
      "scroll",
      () => {
        k && a && ue();
      },
      { passive: !0, capture: !0 }
    ),
    gt.useEffect(() => {
      y && (K(), k && E());
    }, [y, k, E, K]),
    gt.useEffect(
      () => () => {
        K(), re();
      },
      [K, re]
    ),
    $c.useEventListener(() => j.current, "pointerleave", ee);
  const X = gt.useCallback(
      (J = {}, ne = null) => ({
        ...J,
        ref: $c.mergeRefs(j, ne, _),
        onPointerEnter: vs.callAllHandlers(J.onPointerEnter, (ae) => {
          ae.pointerType !== "touch" && V();
        }),
        onClick: vs.callAllHandlers(J.onClick, pe),
        onPointerDown: vs.callAllHandlers(J.onPointerDown, xe),
        onFocus: vs.callAllHandlers(J.onFocus, V),
        onBlur: vs.callAllHandlers(J.onBlur, ee),
        "aria-describedby": k ? W : void 0,
      }),
      [V, ee, xe, k, W, pe, _]
    ),
    de = gt.useCallback(
      (J = {}, ne = null) =>
        N(
          {
            ...J,
            style: {
              ...J.style,
              [Kv.cssVars.arrowSize.var]: h ? `${h}px` : void 0,
              [Kv.cssVars.arrowShadowColor.var]: p,
            },
          },
          ne
        ),
      [N, h, p]
    ),
    Q = gt.useCallback(
      (J = {}, ne = null) => {
        const we = {
          ...J.style,
          position: "relative",
          transformOrigin: Kv.cssVars.transformOrigin.varRef,
        };
        return { ref: ne, ...T, ...J, id: W, role: "tooltip", style: we };
      },
      [T, W]
    );
  return {
    isOpen: k,
    show: V,
    hide: ee,
    getTriggerProps: X,
    getTooltipProps: Q,
    getTooltipPositionerProps: de,
    getArrowProps: B,
    getArrowInnerProps: G,
  };
}
const qv = "chakra-ui:close-tooltip";
function IPe(e, t) {
  return (
    gt.useEffect(() => {
      const r = lg(e);
      return r.addEventListener(qv, t), () => r.removeEventListener(qv, t);
    }, [t, e]),
    () => {
      const r = lg(e),
        n = nf(e);
      r.dispatchEvent(new n.CustomEvent(qv));
    }
  );
}
Jx.useTooltip = _Pe;
var Ar = P,
  hP = I,
  pP = x,
  kV = tr,
  Xv = g,
  EPe = yh,
  MPe = CV,
  FPe = Jx,
  jPe = $r,
  DPe = Mn,
  NPe = Ul,
  Cs = M,
  OPe = D,
  BPe = he;
const LPe = Cs.chakra(kV.motion.div),
  TV = OPe.forwardRef((e, t) => {
    const r = BPe.useStyleConfig("Tooltip", e),
      n = hP.omitThemingProps(e),
      o = jPe.useTheme(),
      {
        children: a,
        label: s,
        shouldWrapChildren: i,
        "aria-label": c,
        hasArrow: l,
        bg: u,
        portalProps: d,
        background: f,
        backgroundColor: m,
        bgColor: h,
        motionProps: p,
        animatePresenceProps: v,
        ...b
      } = n,
      y = f ?? m ?? u ?? h;
    if (y) {
      r.bg = y;
      const _ = hP.getCSSVar(o, "colors", y);
      r[DPe.cssVars.arrowBg.var] = _;
    }
    const S = FPe.useTooltip({ ...b, direction: o.direction }),
      w = !Xv.isValidElement(a) || i;
    let C;
    if (w)
      C = Ar.jsx(Cs.chakra.span, {
        display: "inline-block",
        tabIndex: 0,
        ...S.getTriggerProps(),
        children: a,
      });
    else {
      const _ = Xv.Children.only(a);
      C = Xv.cloneElement(_, S.getTriggerProps(_.props, EPe.getElementRef(_)));
    }
    const T = !!c,
      k = S.getTooltipProps({}, t),
      R = T ? pP.omit(k, ["role", "id"]) : k,
      E = pP.pick(k, ["role", "id"]);
    return s
      ? Ar.jsxs(Ar.Fragment, {
          children: [
            C,
            Ar.jsx(kV.AnimatePresence, {
              ...v,
              children:
                S.isOpen &&
                Ar.jsx(NPe.Portal, {
                  ...d,
                  children: Ar.jsx(Cs.chakra.div, {
                    ...S.getTooltipPositionerProps(),
                    __css: { zIndex: r.zIndex, pointerEvents: "none" },
                    children: Ar.jsxs(LPe, {
                      variants: MPe.scale,
                      initial: "exit",
                      animate: "enter",
                      exit: "exit",
                      ...p,
                      ...R,
                      __css: r,
                      children: [
                        s,
                        T &&
                          Ar.jsx(Cs.chakra.span, {
                            srOnly: !0,
                            ...E,
                            children: c,
                          }),
                        l &&
                          Ar.jsx(Cs.chakra.div, {
                            "data-popper-arrow": !0,
                            className: "chakra-tooltip__arrow-wrapper",
                            children: Ar.jsx(Cs.chakra.div, {
                              "data-popper-arrow-inner": !0,
                              className: "chakra-tooltip__arrow",
                              __css: { bg: r.bg },
                            }),
                          }),
                      ],
                    }),
                  }),
                }),
            }),
          ],
        })
      : Ar.jsx(Ar.Fragment, { children: a });
  });
TV.displayName = "Tooltip";
wV.Tooltip = TV;
var PV = {},
  VPe = P,
  zPe = I,
  HPe = x,
  WPe = D,
  GPe = he,
  UPe = M;
const RV = WPe.forwardRef(function (t, r) {
  const n = GPe.useStyleConfig("Heading", t),
    { className: o, ...a } = zPe.omitThemingProps(t);
  return VPe.jsx(UPe.chakra.h2, {
    ref: r,
    className: HPe.cx("chakra-heading", t.className),
    ...a,
    __css: n,
  });
});
RV.displayName = "Heading";
PV.Heading = RV;
var AV = {},
  KPe = P,
  qPe = I,
  vP = x,
  XPe = D,
  YPe = he,
  ZPe = M;
const _V = XPe.forwardRef(function (t, r) {
  const n = YPe.useStyleConfig("Text", t),
    {
      className: o,
      align: a,
      decoration: s,
      casing: i,
      ...c
    } = qPe.omitThemingProps(t),
    l = vP.compact({
      textAlign: t.align,
      textDecoration: t.decoration,
      textTransform: t.casing,
    });
  return KPe.jsx(ZPe.chakra.p, {
    ref: r,
    className: vP.cx("chakra-text", t.className),
    ...l,
    ...c,
    __css: n,
  });
});
_V.displayName = "Text";
AV.Text = _V;
var e$ = {},
  IV = Yl,
  EV = M;
const MV = EV.chakra("span", { baseStyle: IV.visuallyHiddenStyle });
MV.displayName = "VisuallyHidden";
const FV = EV.chakra("input", { baseStyle: IV.visuallyHiddenStyle });
FV.displayName = "VisuallyHiddenInput";
e$.VisuallyHidden = MV;
e$.VisuallyHiddenInput = FV;
var t$ = {},
  of = P,
  jV = x,
  yP = g,
  DV = D,
  ug = M;
const NV = DV.forwardRef(function (t, r) {
  const {
      spacing: n = "0.5rem",
      spacingX: o,
      spacingY: a,
      children: s,
      justify: i,
      direction: c,
      align: l,
      className: u,
      shouldWrapChildren: d,
      ...f
    } = t,
    m = yP.useMemo(
      () =>
        d ? yP.Children.map(s, (h, p) => of.jsx(r$, { children: h }, p)) : s,
      [s, d]
    );
  return of.jsx(ug.chakra.div, {
    ref: r,
    className: jV.cx("chakra-wrap", u),
    ...f,
    children: of.jsx(ug.chakra.ul, {
      className: "chakra-wrap__list",
      __css: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: i,
        alignItems: l,
        flexDirection: c,
        listStyleType: "none",
        gap: n,
        columnGap: o,
        rowGap: a,
        padding: "0",
      },
      children: m,
    }),
  });
});
NV.displayName = "Wrap";
const r$ = DV.forwardRef(function (t, r) {
  const { className: n, ...o } = t;
  return of.jsx(ug.chakra.li, {
    ref: r,
    __css: { display: "flex", alignItems: "flex-start" },
    className: jV.cx("chakra-wrap__listitem", n),
    ...o,
  });
});
r$.displayName = "WrapItem";
t$.Wrap = NV;
t$.WrapItem = r$;
(function (e) {
  var t = le,
    r = I,
    n = no,
    o = BI,
    a = H2,
    s = W2,
    i = Z2,
    c = Ft,
    l = J2,
    u = tF,
    d = nF,
    f = lo,
    m = sF,
    h = z0,
    p = tn,
    v = U0,
    b = W0,
    y = G0,
    S = iF,
    w = Nm,
    C = pF,
    T = ji,
    k = yF,
    R = Bm,
    E = bF,
    _ = Lm,
    N = Y0,
    G = wF,
    B = kF,
    z = Ka,
    Y = PF,
    W = Z0,
    j = Q0,
    O = J0,
    K = DF,
    ve = OF,
    re = eS,
    ue = ql,
    L = LF,
    V = VF,
    ee = qa,
    pe = zF,
    xe = HF,
    Ce = tS,
    X = UF,
    de = vj,
    Q = rS,
    J = zm,
    ne = dS,
    we = Gl,
    ae = gj,
    ye = jl,
    U = zo,
    be = fS,
    ge = so,
    Te = xj,
    He = wj,
    Ue = mm,
    Ze = Fi,
    wt = kj,
    nr = Pj,
    or = nn,
    wr = _j,
    H = Ej,
    Ee = Fj,
    q = mS,
    oe = Dj,
    nt = Nj,
    jt = Bl,
    Z = fo,
    ie = vS,
    fe = Lj,
    _e = yS,
    Ie = gS,
    Rt = Vj,
    Dt = bS,
    dt = uo,
    yu = Ko,
    Nr = qm,
    gu = BS,
    Ch = VS,
    kh = mN,
    Th = vN,
    Ph = bN,
    Or = zS,
    Rh = HS,
    Ah = xN,
    _h = Dr,
    Ih = $N,
    Eh = kN,
    vo = Kl,
    Mh = TN,
    Fh = PN,
    Li = Xm,
    bu = Zl,
    Su = YS,
    yo = IN,
    jh = MN,
    xu = tx,
    go = Xa,
    Dh = GN,
    Nh = Jm,
    $u = ox,
    Vi = qN,
    Oh = ax,
    Ja = sx,
    zi = Jl,
    wu = En,
    es = EO,
    Cu = Sx,
    Bh = NO,
    Lh = xx,
    Vh = nh,
    ku = VO,
    zh = HO,
    Hh = WO,
    Wh = KO,
    At = rt,
    Tu = Xo,
    Hi = lh,
    Wi = uh,
    Gi = dh,
    Ui = fh,
    Ki = mh,
    Jo = mo,
    qi = TB,
    ts = Ht,
    Gh = Cx,
    Pu = ah,
    Uh = oh,
    Kh = nu,
    bo = Yo,
    Ru = Px,
    Au = _x,
    ea = Fn,
    qh = UB,
    Xi = Ix,
    Xh = XB,
    Yh = ZB,
    Zh = JB,
    rs = tL,
    Yi = nL,
    Zi = iL,
    Qi = lL,
    Qh = dL,
    Ji = Wt,
    ec = eu,
    _u = Mn,
    on = Ol,
    ta = Ul,
    Jh = mL,
    tc = bh,
    ep = wL,
    Iu = kL,
    tp = PL,
    rp = Mx,
    Eu = Ex,
    Mu = su,
    $ = Fx,
    A = jx,
    F = Sh,
    te = LL,
    Pe = zL,
    De = Nx,
    Ae = ho,
    ke = po,
    We = Ox,
    ar = Bx,
    Nt = c5,
    ra = jm,
    rc = u5,
    nc = xh,
    Fu = v5,
    OV = g5,
    n$ = Za,
    np = $h,
    BV = C5,
    LV = T5,
    VV = R5,
    zV = _5,
    HV = E5,
    o$ = rr,
    WV = M5,
    GV = zx,
    a$ = Hx,
    UV = Wx,
    KV = j5,
    qV = Gx,
    XV = D5,
    YV = N5,
    ZV = O5,
    QV = B5,
    JV = V0,
    ez = $r,
    op = Go,
    ns = en,
    s$ = Em,
    tz = D,
    i$ = he,
    rz = M,
    c$ = jn,
    nz = H5,
    oz = G5,
    az = U5,
    sz = K5,
    iz = q5,
    cz = X5,
    lz = Y5,
    uz = Z5,
    dz = Q5,
    fz = sV,
    mz = cV,
    hz = uV,
    pz = fV,
    l$ = Qo,
    Cr = pt,
    os = Qa,
    vz = SV,
    yz = Zx,
    gz = wh,
    u$ = Wl,
    bz = Qx,
    d$ = Ua,
    Sz = Mm,
    xz = $V,
    $z = wV,
    wz = Jx,
    Cz = X0,
    f$ = hh,
    m$ = ch,
    kz = kx,
    h$ = ih,
    ap = rn,
    Tz = PV,
    Pz = AV,
    p$ = e$,
    Rz = Yl,
    v$ = t$;
  (e.ChakraBaseProvider = o.ChakraBaseProvider),
    (e.ChakraProvider = a.ChakraProvider),
    (e.Accordion = s.Accordion),
    (e.AccordionButton = i.AccordionButton),
    (e.useAccordionStyles = c.useAccordionStyles),
    (e.AccordionIcon = l.AccordionIcon),
    (e.AccordionItem = u.AccordionItem),
    (e.AccordionPanel = d.AccordionPanel),
    (e.AccordionProvider = f.AccordionProvider),
    (e.useAccordion = f.useAccordion),
    (e.useAccordionContext = f.useAccordionContext),
    (e.useAccordionItem = f.useAccordionItem),
    (e.useAccordionItemState = m.useAccordionItemState),
    (e.Alert = h.Alert),
    (e.useAlertContext = p.useAlertContext),
    (e.useAlertStyles = p.useAlertStyles),
    (e.AlertDescription = v.AlertDescription),
    (e.AlertIcon = b.AlertIcon),
    (e.AlertTitle = y.AlertTitle),
    (e.AspectRatio = S.AspectRatio),
    (e.Avatar = w.Avatar),
    (e.AvatarBadge = C.AvatarBadge),
    (e.useAvatarStyles = T.useAvatarStyles),
    (e.AvatarGroup = k.AvatarGroup),
    (e.GenericAvatarIcon = R.GenericAvatarIcon),
    (e.Badge = E.Badge),
    (e.Box = _.Box),
    (e.Square = N.Square),
    (e.Circle = G.Circle),
    (e.Breadcrumb = B.Breadcrumb),
    (e.useBreadcrumbStyles = z.useBreadcrumbStyles),
    (e.BreadcrumbItem = Y.BreadcrumbItem),
    (e.BreadcrumbLink = W.BreadcrumbLink),
    (e.BreadcrumbSeparator = j.BreadcrumbSeparator),
    (e.Button = O.Button),
    (e.ButtonGroup = K.ButtonGroup),
    (e.IconButton = ve.IconButton),
    (e.ButtonSpinner = re.ButtonSpinner),
    (e.useButtonGroup = ue.useButtonGroup),
    (e.Card = L.Card),
    (e.CardBody = V.CardBody),
    (e.useCardStyles = ee.useCardStyles),
    (e.CardFooter = pe.CardFooter),
    (e.CardHeader = xe.CardHeader),
    (e.AbsoluteCenter = Ce.AbsoluteCenter),
    (e.Center = Ce.Center),
    (e.Checkbox = X.Checkbox),
    (e.CheckboxGroup = de.CheckboxGroup),
    (e.CheckboxIcon = Q.CheckboxIcon),
    (e.useCheckbox = J.useCheckbox),
    (e.useCheckboxGroup = ne.useCheckboxGroup),
    (e.CloseButton = we.CloseButton),
    (e.Code = ae.Code),
    (e.ColorModeProvider = ye.ColorModeProvider),
    (e.DarkMode = ye.DarkMode),
    (e.LightMode = ye.LightMode),
    (e.cookieStorageManager = U.cookieStorageManager),
    (e.cookieStorageManagerSSR = U.cookieStorageManagerSSR),
    (e.createCookieStorageManager = U.createCookieStorageManager),
    (e.createLocalStorageManager = U.createLocalStorageManager),
    (e.localStorageManager = U.localStorageManager),
    (e.ColorModeScript = be.ColorModeScript),
    (e.getScriptSrc = be.getScriptSrc),
    (e.ColorModeContext = ge.ColorModeContext),
    (e.useColorMode = ge.useColorMode),
    (e.useColorModeValue = ge.useColorModeValue),
    (e.Container = Te.Container),
    (e.ControlBox = He.ControlBox),
    (e.CSSPolyfill = Ue.CSSPolyfill),
    (e.CSSReset = Ue.CSSReset),
    (e.createDescendantContext = Ze.createDescendantContext),
    (e.Divider = wt.Divider),
    (e.Editable = nr.Editable),
    (e.useEditableContext = or.useEditableContext),
    (e.useEditableStyles = or.useEditableStyles),
    (e.EditableInput = wr.EditableInput),
    (e.EditablePreview = H.EditablePreview),
    (e.EditableTextarea = Ee.EditableTextarea),
    (e.useEditable = q.useEditable),
    (e.useEditableControls = oe.useEditableControls),
    (e.useEditableState = nt.useEditableState),
    (e.EnvironmentProvider = jt.EnvironmentProvider),
    (e.useEnvironment = jt.useEnvironment),
    (e.createExtendTheme = Z.createExtendTheme),
    (e.extendBaseTheme = Z.extendBaseTheme),
    (e.extendTheme = Z.extendTheme),
    (e.mergeThemeOverride = Z.mergeThemeOverride),
    (e.withDefaultColorScheme = ie.withDefaultColorScheme),
    (e.withDefaultProps = fe.withDefaultProps),
    (e.withDefaultSize = _e.withDefaultSize),
    (e.withDefaultVariant = Ie.withDefaultVariant),
    (e.Flex = Rt.Flex),
    (e.FocusLock = Dt.FocusLock),
    (e.FormControl = dt.FormControl),
    (e.FormHelperText = dt.FormHelperText),
    (e.useFormControlContext = dt.useFormControlContext),
    (e.useFormControlStyles = dt.useFormControlStyles),
    (e.useFormControl = yu.useFormControl),
    (e.useFormControlProps = yu.useFormControlProps),
    (e.FormErrorIcon = Nr.FormErrorIcon),
    (e.FormErrorMessage = Nr.FormErrorMessage),
    (e.useFormErrorStyles = Nr.useFormErrorStyles),
    (e.FormLabel = gu.FormLabel),
    (e.RequiredIndicator = gu.RequiredIndicator),
    (e.Grid = Ch.Grid),
    (e.GridItem = kh.GridItem),
    (e.SimpleGrid = Th.SimpleGrid),
    (e.Highlight = Ph.Highlight),
    (e.Mark = Or.Mark),
    (e.useHighlight = Rh.useHighlight),
    (e.createIcon = Ah.createIcon),
    (e.Icon = _h.Icon),
    (e.Image = Ih.Image),
    (e.Img = Eh.Img),
    (e.useImage = vo.useImage),
    (e.Indicator = Mh.Indicator),
    (e.Input = Fh.Input),
    (e.InputAddon = Li.InputAddon),
    (e.InputLeftAddon = Li.InputLeftAddon),
    (e.InputRightAddon = Li.InputRightAddon),
    (e.InputGroup = bu.InputGroup),
    (e.useInputGroupStyles = bu.useInputGroupStyles),
    (e.InputLeftElement = Su.InputLeftElement),
    (e.InputRightElement = Su.InputRightElement),
    (e.Kbd = yo.Kbd),
    (e.Link = jh.Link),
    (e.LinkBox = xu.LinkBox),
    (e.LinkOverlay = xu.LinkOverlay),
    (e.List = go.List),
    (e.ListIcon = go.ListIcon),
    (e.ListItem = go.ListItem),
    (e.OrderedList = go.OrderedList),
    (e.UnorderedList = go.UnorderedList),
    (e.useListStyles = go.useListStyles),
    (e.Hide = Dh.Hide),
    (e.useQuery = Nh.useQuery),
    (e.useColorModePreference = $u.useColorModePreference),
    (e.usePrefersReducedMotion = $u.usePrefersReducedMotion),
    (e.Show = Vi.Show),
    (e.useBreakpoint = Oh.useBreakpoint),
    (e.useBreakpointValue = Ja.useBreakpointValue),
    (e.useMediaQuery = zi.useMediaQuery),
    (e.Menu = wu.Menu),
    (e.useMenuStyles = wu.useMenuStyles),
    (e.MenuButton = es.MenuButton),
    (e.MenuCommand = Cu.MenuCommand),
    (e.MenuDivider = Bh.MenuDivider),
    (e.MenuGroup = Lh.MenuGroup),
    (e.MenuIcon = Vh.MenuIcon),
    (e.MenuItem = ku.MenuItem),
    (e.MenuItemOption = zh.MenuItemOption),
    (e.MenuList = Hh.MenuList),
    (e.MenuOptionGroup = Wh.MenuOptionGroup),
    (e.MenuDescendantsProvider = At.MenuDescendantsProvider),
    (e.MenuProvider = At.MenuProvider),
    (e.useMenu = At.useMenu),
    (e.useMenuButton = At.useMenuButton),
    (e.useMenuContext = At.useMenuContext),
    (e.useMenuDescendant = At.useMenuDescendant),
    (e.useMenuDescendants = At.useMenuDescendants),
    (e.useMenuDescendantsContext = At.useMenuDescendantsContext),
    (e.useMenuItem = At.useMenuItem),
    (e.useMenuList = At.useMenuList),
    (e.useMenuOption = At.useMenuOption),
    (e.useMenuOptionGroup = At.useMenuOptionGroup),
    (e.useMenuPositioner = At.useMenuPositioner),
    (e.useMenuState = At.useMenuState),
    (e.AlertDialog = Tu.AlertDialog),
    (e.AlertDialogContent = Tu.AlertDialogContent),
    (e.AlertDialogBody = Hi.ModalBody),
    (e.DrawerBody = Hi.ModalBody),
    (e.ModalBody = Hi.ModalBody),
    (e.AlertDialogCloseButton = Wi.ModalCloseButton),
    (e.DrawerCloseButton = Wi.ModalCloseButton),
    (e.ModalCloseButton = Wi.ModalCloseButton),
    (e.AlertDialogFooter = Gi.ModalFooter),
    (e.DrawerFooter = Gi.ModalFooter),
    (e.ModalFooter = Gi.ModalFooter),
    (e.AlertDialogHeader = Ui.ModalHeader),
    (e.DrawerHeader = Ui.ModalHeader),
    (e.ModalHeader = Ui.ModalHeader),
    (e.AlertDialogOverlay = Ki.ModalOverlay),
    (e.DrawerOverlay = Ki.ModalOverlay),
    (e.ModalOverlay = Ki.ModalOverlay),
    (e.Drawer = Jo.Drawer),
    (e.useDrawerContext = Jo.useDrawerContext),
    (e.DrawerContent = qi.DrawerContent),
    (e.Modal = ts.Modal),
    (e.ModalContextProvider = ts.ModalContextProvider),
    (e.useModalContext = ts.useModalContext),
    (e.useModalStyles = ts.useModalStyles),
    (e.ModalContent = Gh.ModalContent),
    (e.ModalFocusScope = Pu.ModalFocusScope),
    (e.useModal = Uh.useModal),
    (e.useModalManager = Kh.useModalManager),
    (e.NumberDecrementStepper = bo.NumberDecrementStepper),
    (e.NumberIncrementStepper = bo.NumberIncrementStepper),
    (e.NumberInput = bo.NumberInput),
    (e.NumberInputField = bo.NumberInputField),
    (e.NumberInputStepper = bo.NumberInputStepper),
    (e.useNumberInputStyles = bo.useNumberInputStyles),
    (e.useNumberInput = Ru.useNumberInput),
    (e.PinInput = Au.PinInput),
    (e.PinInputField = Au.PinInputField),
    (e.PinInputDescendantsProvider = ea.PinInputDescendantsProvider),
    (e.PinInputProvider = ea.PinInputProvider),
    (e.usePinInput = ea.usePinInput),
    (e.usePinInputContext = ea.usePinInputContext),
    (e.usePinInputField = ea.usePinInputField),
    (e.Popover = qh.Popover),
    (e.usePopover = Xi.usePopover),
    (e.PopoverAnchor = Xh.PopoverAnchor),
    (e.PopoverArrow = Yh.PopoverArrow),
    (e.PopoverBody = Zh.PopoverBody),
    (e.PopoverCloseButton = rs.PopoverCloseButton),
    (e.PopoverContent = Yi.PopoverContent),
    (e.PopoverFooter = Zi.PopoverFooter),
    (e.PopoverHeader = Qi.PopoverHeader),
    (e.PopoverTrigger = Qh.PopoverTrigger),
    (e.usePopoverContext = Ji.usePopoverContext),
    (e.usePopoverStyles = Ji.usePopoverStyles),
    (e.usePopper = ec.usePopper),
    (e.popperCSSVars = _u.cssVars),
    (e.PortalManager = on.PortalManager),
    (e.usePortalManager = on.usePortalManager),
    (e.Portal = ta.Portal),
    (e.CircularProgress = Jh.CircularProgress),
    (e.Progress = tc.Progress),
    (e.useProgressStyles = tc.useProgressStyles),
    (e.ProgressLabel = ep.ProgressLabel),
    (e.CircularProgressLabel = Iu.CircularProgressLabel),
    (e.Radio = tp.Radio),
    (e.useRadio = rp.useRadio),
    (e.useRadioGroup = Eu.useRadioGroup),
    (e.RadioGroup = Mu.RadioGroup),
    (e.useRadioGroupContext = Mu.useRadioGroupContext),
    (e.Select = $.Select),
    (e.SelectField = A.SelectField),
    (e.Skeleton = F.Skeleton),
    (e.SkeletonText = te.SkeletonText),
    (e.SkeletonCircle = Pe.SkeletonCircle),
    (e.SkipNavContent = De.SkipNavContent),
    (e.SkipNavLink = De.SkipNavLink),
    (e.RangeSlider = Ae.RangeSlider),
    (e.RangeSliderFilledTrack = Ae.RangeSliderFilledTrack),
    (e.RangeSliderMark = Ae.RangeSliderMark),
    (e.RangeSliderProvider = Ae.RangeSliderProvider),
    (e.RangeSliderThumb = Ae.RangeSliderThumb),
    (e.RangeSliderTrack = Ae.RangeSliderTrack),
    (e.useRangeSliderContext = Ae.useRangeSliderContext),
    (e.useRangeSliderStyles = Ae.useRangeSliderStyles),
    (e.Slider = ke.Slider),
    (e.SliderFilledTrack = ke.SliderFilledTrack),
    (e.SliderMark = ke.SliderMark),
    (e.SliderProvider = ke.SliderProvider),
    (e.SliderThumb = ke.SliderThumb),
    (e.SliderTrack = ke.SliderTrack),
    (e.useSliderContext = ke.useSliderContext),
    (e.useSliderStyles = ke.useSliderStyles),
    (e.useRangeSlider = We.useRangeSlider),
    (e.useSlider = ar.useSlider),
    (e.Spacer = Nt.Spacer),
    (e.Spinner = ra.Spinner),
    (e.HStack = rc.HStack),
    (e.Stack = nc.Stack),
    (e.StackDivider = Fu.StackDivider),
    (e.VStack = OV.VStack),
    (e.Stat = n$.Stat),
    (e.useStatStyles = n$.useStatStyles),
    (e.StatArrow = np.StatArrow),
    (e.StatDownArrow = np.StatDownArrow),
    (e.StatUpArrow = np.StatUpArrow),
    (e.StatGroup = BV.StatGroup),
    (e.StatHelpText = LV.StatHelpText),
    (e.StatLabel = VV.StatLabel),
    (e.StatNumber = zV.StatNumber),
    (e.Step = HV.Step),
    (e.useStepContext = o$.useStepContext),
    (e.useStepperStyles = o$.useStepperStyles),
    (e.StepDescription = WV.StepDescription),
    (e.StepIcon = GV.StepIcon),
    (e.StepIndicator = a$.StepIndicator),
    (e.StepIndicatorContent = a$.StepIndicatorContent),
    (e.StepNumber = UV.StepNumber),
    (e.StepSeparator = KV.StepSeparator),
    (e.StepStatus = qV.StepStatus),
    (e.StepTitle = XV.StepTitle),
    (e.Stepper = YV.Stepper),
    (e.useSteps = ZV.useSteps),
    (e.Switch = QV.Switch),
    (e.shouldForwardProp = JV.shouldForwardProp),
    (e.useTheme = ez.useTheme),
    (e.getToken = op.getToken),
    (e.useChakra = op.useChakra),
    (e.useToken = op.useToken),
    (e.CSSVars = ns.CSSVars),
    (e.GlobalStyle = ns.GlobalStyle),
    (e.StylesProvider = ns.StylesProvider),
    (e.ThemeProvider = ns.ThemeProvider),
    (e.createStylesContext = ns.createStylesContext),
    (e.useStyles = ns.useStyles),
    (e.styled = s$.styled),
    (e.toCSSObject = s$.toCSSObject),
    (e.forwardRef = tz.forwardRef),
    (e.useMultiStyleConfig = i$.useMultiStyleConfig),
    (e.useStyleConfig = i$.useStyleConfig),
    (e.chakra = rz.chakra),
    (e.Table = c$.Table),
    (e.useTableStyles = c$.useTableStyles),
    (e.TableCaption = nz.TableCaption),
    (e.TableContainer = oz.TableContainer),
    (e.Tbody = az.Tbody),
    (e.Td = sz.Td),
    (e.Tfoot = iz.Tfoot),
    (e.Th = cz.Th),
    (e.Thead = lz.Thead),
    (e.Tr = uz.Tr),
    (e.Tab = dz.Tab),
    (e.TabIndicator = fz.TabIndicator),
    (e.TabList = mz.TabList),
    (e.TabPanel = hz.TabPanel),
    (e.TabPanels = pz.TabPanels),
    (e.Tabs = l$.Tabs),
    (e.useTabsStyles = l$.useTabsStyles),
    (e.TabsDescendantsProvider = Cr.TabsDescendantsProvider),
    (e.TabsProvider = Cr.TabsProvider),
    (e.useTab = Cr.useTab),
    (e.useTabIndicator = Cr.useTabIndicator),
    (e.useTabList = Cr.useTabList),
    (e.useTabPanel = Cr.useTabPanel),
    (e.useTabPanels = Cr.useTabPanels),
    (e.useTabs = Cr.useTabs),
    (e.useTabsContext = Cr.useTabsContext),
    (e.useTabsDescendant = Cr.useTabsDescendant),
    (e.useTabsDescendants = Cr.useTabsDescendants),
    (e.useTabsDescendantsContext = Cr.useTabsDescendantsContext),
    (e.Tag = os.Tag),
    (e.TagCloseButton = os.TagCloseButton),
    (e.TagLabel = os.TagLabel),
    (e.TagLeftIcon = os.TagLeftIcon),
    (e.TagRightIcon = os.TagRightIcon),
    (e.useTagStyles = os.useTagStyles),
    (e.Textarea = vz.Textarea),
    (e.createStandaloneToast = yz.createStandaloneToast),
    (e.createToastFn = gz.createToastFn),
    (e.Toast = u$.Toast),
    (e.createRenderToast = u$.createRenderToast),
    (e.getToastPlacement = bz.getToastPlacement),
    (e.ToastOptionProvider = d$.ToastOptionProvider),
    (e.ToastProvider = d$.ToastProvider),
    (e.toastStore = Sz.toastStore),
    (e.useToast = xz.useToast),
    (e.Tooltip = $z.Tooltip),
    (e.useTooltip = wz.useTooltip),
    (e.Collapse = Cz.Collapse),
    (e.Fade = f$.Fade),
    (e.fadeConfig = f$.fadeConfig),
    (e.ScaleFade = m$.ScaleFade),
    (e.scaleFadeConfig = m$.scaleFadeConfig),
    (e.Slide = kz.Slide),
    (e.SlideFade = h$.SlideFade),
    (e.slideFadeConfig = h$.slideFadeConfig),
    (e.EASINGS = ap.TRANSITION_EASINGS),
    (e.getSlideTransition = ap.getSlideTransition),
    (e.withDelay = ap.withDelay),
    (e.Heading = Tz.Heading),
    (e.Text = Pz.Text),
    (e.VisuallyHidden = p$.VisuallyHidden),
    (e.VisuallyHiddenInput = p$.VisuallyHiddenInput),
    (e.visuallyHiddenStyle = Rz.visuallyHiddenStyle),
    (e.Wrap = v$.Wrap),
    (e.WrapItem = v$.WrapItem),
    Object.keys(t).forEach(function (Gt) {
      Gt !== "default" &&
        !Object.prototype.hasOwnProperty.call(e, Gt) &&
        Object.defineProperty(e, Gt, {
          enumerable: !0,
          get: function () {
            return t[Gt];
          },
        });
    }),
    Object.keys(r).forEach(function (Gt) {
      Gt !== "default" &&
        !Object.prototype.hasOwnProperty.call(e, Gt) &&
        Object.defineProperty(e, Gt, {
          enumerable: !0,
          get: function () {
            return r[Gt];
          },
        });
    }),
    Object.keys(n).forEach(function (Gt) {
      Gt !== "default" &&
        !Object.prototype.hasOwnProperty.call(e, Gt) &&
        Object.defineProperty(e, Gt, {
          enumerable: !0,
          get: function () {
            return n[Gt];
          },
        });
    });
})(Oz);
export {
  Pre as A,
  Nz as _,
  Dz as a,
  Mr as b,
  Oz as c,
  aD as d,
  Um as e,
  P as j,
  M0 as m,
  rRe as t,
  JPe as w,
};

import {
  b as tn,
  g as Ta,
  d as at,
  e as vt,
  r as k,
  a as Ma,
} from "./router-Ua64hkZi.js";
import { _ as Da, a as Ea, c as rn } from "./chakra-mpaYxI_z.js";
var Ca,
  jr = tn;
(Ca = jr.createRoot), jr.hydrateRoot;
var xa = { compareTwoStrings: nn, findBestMatch: Na };
function nn(e, t) {
  if (((e = e.replace(/\s+/g, "")), (t = t.replace(/\s+/g, "")), e === t))
    return 1;
  if (e.length < 2 || t.length < 2) return 0;
  let r = new Map();
  for (let a = 0; a < e.length - 1; a++) {
    const s = e.substring(a, a + 2),
      i = r.has(s) ? r.get(s) + 1 : 1;
    r.set(s, i);
  }
  let n = 0;
  for (let a = 0; a < t.length - 1; a++) {
    const s = t.substring(a, a + 2),
      i = r.has(s) ? r.get(s) : 0;
    i > 0 && (r.set(s, i - 1), n++);
  }
  return (2 * n) / (e.length + t.length - 2);
}
function Na(e, t) {
  if (!Ya(e, t))
    throw new Error(
      "Bad arguments: First argument should be a string, second should be an array of strings"
    );
  const r = [];
  let n = 0;
  for (let s = 0; s < t.length; s++) {
    const i = t[s],
      o = nn(e, i);
    r.push({ target: i, rating: o }), o > r[n].rating && (n = s);
  }
  const a = r[n];
  return { ratings: r, bestMatch: a, bestMatchIndex: n };
}
function Ya(e, t) {
  return !(
    typeof e != "string" ||
    !Array.isArray(t) ||
    !t.length ||
    t.find(function (r) {
      return typeof r != "string";
    })
  );
}
const Ra = Ta(xa); //! moment.js
//! version : 2.30.1
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
var an;
function d() {
  return an.apply(null, arguments);
}
function Ia(e) {
  an = e;
}
function ae(e) {
  return (
    e instanceof Array || Object.prototype.toString.call(e) === "[object Array]"
  );
}
function Ye(e) {
  return e != null && Object.prototype.toString.call(e) === "[object Object]";
}
function M(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
function _r(e) {
  if (Object.getOwnPropertyNames)
    return Object.getOwnPropertyNames(e).length === 0;
  var t;
  for (t in e) if (M(e, t)) return !1;
  return !0;
}
function $(e) {
  return e === void 0;
}
function ve(e) {
  return (
    typeof e == "number" ||
    Object.prototype.toString.call(e) === "[object Number]"
  );
}
function _t(e) {
  return (
    e instanceof Date || Object.prototype.toString.call(e) === "[object Date]"
  );
}
function sn(e, t) {
  var r = [],
    n,
    a = e.length;
  for (n = 0; n < a; ++n) r.push(t(e[n], n));
  return r;
}
function Oe(e, t) {
  for (var r in t) M(t, r) && (e[r] = t[r]);
  return (
    M(t, "toString") && (e.toString = t.toString),
    M(t, "valueOf") && (e.valueOf = t.valueOf),
    e
  );
}
function ce(e, t, r, n) {
  return Cn(e, t, r, n, !0).utc();
}
function Aa() {
  return {
    empty: !1,
    unusedTokens: [],
    unusedInput: [],
    overflow: -2,
    charsLeftOver: 0,
    nullInput: !1,
    invalidEra: null,
    invalidMonth: null,
    invalidFormat: !1,
    userInvalidated: !1,
    iso: !1,
    parsedDateParts: [],
    era: null,
    meridiem: null,
    rfc2822: !1,
    weekdayMismatch: !1,
  };
}
function w(e) {
  return e._pf == null && (e._pf = Aa()), e._pf;
}
var Qt;
Array.prototype.some
  ? (Qt = Array.prototype.some)
  : (Qt = function (e) {
      var t = Object(this),
        r = t.length >>> 0,
        n;
      for (n = 0; n < r; n++) if (n in t && e.call(this, t[n], n, t)) return !0;
      return !1;
    });
function mr(e) {
  var t = null,
    r = !1,
    n = e._d && !isNaN(e._d.getTime());
  if (
    (n &&
      ((t = w(e)),
      (r = Qt.call(t.parsedDateParts, function (a) {
        return a != null;
      })),
      (n =
        t.overflow < 0 &&
        !t.empty &&
        !t.invalidEra &&
        !t.invalidMonth &&
        !t.invalidWeekday &&
        !t.weekdayMismatch &&
        !t.nullInput &&
        !t.invalidFormat &&
        !t.userInvalidated &&
        (!t.meridiem || (t.meridiem && r))),
      e._strict &&
        (n =
          n &&
          t.charsLeftOver === 0 &&
          t.unusedTokens.length === 0 &&
          t.bigHour === void 0)),
    Object.isFrozen == null || !Object.isFrozen(e))
  )
    e._isValid = n;
  else return n;
  return e._isValid;
}
function Nt(e) {
  var t = ce(NaN);
  return e != null ? Oe(w(t), e) : (w(t).userInvalidated = !0), t;
}
var Br = (d.momentProperties = []),
  $t = !1;
function pr(e, t) {
  var r,
    n,
    a,
    s = Br.length;
  if (
    ($(t._isAMomentObject) || (e._isAMomentObject = t._isAMomentObject),
    $(t._i) || (e._i = t._i),
    $(t._f) || (e._f = t._f),
    $(t._l) || (e._l = t._l),
    $(t._strict) || (e._strict = t._strict),
    $(t._tzm) || (e._tzm = t._tzm),
    $(t._isUTC) || (e._isUTC = t._isUTC),
    $(t._offset) || (e._offset = t._offset),
    $(t._pf) || (e._pf = w(t)),
    $(t._locale) || (e._locale = t._locale),
    s > 0)
  )
    for (r = 0; r < s; r++) (n = Br[r]), (a = t[n]), $(a) || (e[n] = a);
  return e;
}
function mt(e) {
  pr(this, e),
    (this._d = new Date(e._d != null ? e._d.getTime() : NaN)),
    this.isValid() || (this._d = new Date(NaN)),
    $t === !1 && (($t = !0), d.updateOffset(this), ($t = !1));
}
function se(e) {
  return e instanceof mt || (e != null && e._isAMomentObject != null);
}
function on(e) {
  d.suppressDeprecationWarnings === !1 &&
    typeof console < "u" &&
    console.warn &&
    console.warn("Deprecation warning: " + e);
}
function Q(e, t) {
  var r = !0;
  return Oe(function () {
    if ((d.deprecationHandler != null && d.deprecationHandler(null, e), r)) {
      var n = [],
        a,
        s,
        i,
        o = arguments.length;
      for (s = 0; s < o; s++) {
        if (((a = ""), typeof arguments[s] == "object")) {
          a +=
            `
[` +
            s +
            "] ";
          for (i in arguments[0])
            M(arguments[0], i) && (a += i + ": " + arguments[0][i] + ", ");
          a = a.slice(0, -2);
        } else a = arguments[s];
        n.push(a);
      }
      on(
        e +
          `
Arguments: ` +
          Array.prototype.slice.call(n).join("") +
          `
` +
          new Error().stack
      ),
        (r = !1);
    }
    return t.apply(this, arguments);
  }, t);
}
var Gr = {};
function ln(e, t) {
  d.deprecationHandler != null && d.deprecationHandler(e, t),
    Gr[e] || (on(t), (Gr[e] = !0));
}
d.suppressDeprecationWarnings = !1;
d.deprecationHandler = null;
function de(e) {
  return (
    (typeof Function < "u" && e instanceof Function) ||
    Object.prototype.toString.call(e) === "[object Function]"
  );
}
function Pa(e) {
  var t, r;
  for (r in e)
    M(e, r) && ((t = e[r]), de(t) ? (this[r] = t) : (this["_" + r] = t));
  (this._config = e),
    (this._dayOfMonthOrdinalParseLenient = new RegExp(
      (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) +
        "|" +
        /\d{1,2}/.source
    ));
}
function er(e, t) {
  var r = Oe({}, e),
    n;
  for (n in t)
    M(t, n) &&
      (Ye(e[n]) && Ye(t[n])
        ? ((r[n] = {}), Oe(r[n], e[n]), Oe(r[n], t[n]))
        : t[n] != null
        ? (r[n] = t[n])
        : delete r[n]);
  for (n in e) M(e, n) && !M(t, n) && Ye(e[n]) && (r[n] = Oe({}, r[n]));
  return r;
}
function gr(e) {
  e != null && this.set(e);
}
var tr;
Object.keys
  ? (tr = Object.keys)
  : (tr = function (e) {
      var t,
        r = [];
      for (t in e) M(e, t) && r.push(t);
      return r;
    });
var Fa = {
  sameDay: "[Today at] LT",
  nextDay: "[Tomorrow at] LT",
  nextWeek: "dddd [at] LT",
  lastDay: "[Yesterday at] LT",
  lastWeek: "[Last] dddd [at] LT",
  sameElse: "L",
};
function La(e, t, r) {
  var n = this._calendar[e] || this._calendar.sameElse;
  return de(n) ? n.call(t, r) : n;
}
function ue(e, t, r) {
  var n = "" + Math.abs(e),
    a = t - n.length,
    s = e >= 0;
  return (
    (s ? (r ? "+" : "") : "-") +
    Math.pow(10, Math.max(0, a)).toString().substr(1) +
    n
  );
}
var yr =
    /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,
  wt = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,
  zt = {},
  Ve = {};
function p(e, t, r, n) {
  var a = n;
  typeof n == "string" &&
    (a = function () {
      return this[n]();
    }),
    e && (Ve[e] = a),
    t &&
      (Ve[t[0]] = function () {
        return ue(a.apply(this, arguments), t[1], t[2]);
      }),
    r &&
      (Ve[r] = function () {
        return this.localeData().ordinal(a.apply(this, arguments), e);
      });
}
function Wa(e) {
  return e.match(/\[[\s\S]/) ? e.replace(/^\[|\]$/g, "") : e.replace(/\\/g, "");
}
function Ua(e) {
  var t = e.match(yr),
    r,
    n;
  for (r = 0, n = t.length; r < n; r++)
    Ve[t[r]] ? (t[r] = Ve[t[r]]) : (t[r] = Wa(t[r]));
  return function (a) {
    var s = "",
      i;
    for (i = 0; i < n; i++) s += de(t[i]) ? t[i].call(a, e) : t[i];
    return s;
  };
}
function kt(e, t) {
  return e.isValid()
    ? ((t = un(t, e.localeData())), (zt[t] = zt[t] || Ua(t)), zt[t](e))
    : e.localeData().invalidDate();
}
function un(e, t) {
  var r = 5;
  function n(a) {
    return t.longDateFormat(a) || a;
  }
  for (wt.lastIndex = 0; r >= 0 && wt.test(e); )
    (e = e.replace(wt, n)), (wt.lastIndex = 0), (r -= 1);
  return e;
}
var Ha = {
  LTS: "h:mm:ss A",
  LT: "h:mm A",
  L: "MM/DD/YYYY",
  LL: "MMMM D, YYYY",
  LLL: "MMMM D, YYYY h:mm A",
  LLLL: "dddd, MMMM D, YYYY h:mm A",
};
function ja(e) {
  var t = this._longDateFormat[e],
    r = this._longDateFormat[e.toUpperCase()];
  return t || !r
    ? t
    : ((this._longDateFormat[e] = r
        .match(yr)
        .map(function (n) {
          return n === "MMMM" || n === "MM" || n === "DD" || n === "dddd"
            ? n.slice(1)
            : n;
        })
        .join("")),
      this._longDateFormat[e]);
}
var Ba = "Invalid date";
function Ga() {
  return this._invalidDate;
}
var Va = "%d",
  $a = /\d{1,2}/;
function za(e) {
  return this._ordinal.replace("%d", e);
}
var Ka = {
  future: "in %s",
  past: "%s ago",
  s: "a few seconds",
  ss: "%d seconds",
  m: "a minute",
  mm: "%d minutes",
  h: "an hour",
  hh: "%d hours",
  d: "a day",
  dd: "%d days",
  w: "a week",
  ww: "%d weeks",
  M: "a month",
  MM: "%d months",
  y: "a year",
  yy: "%d years",
};
function qa(e, t, r, n) {
  var a = this._relativeTime[r];
  return de(a) ? a(e, t, r, n) : a.replace(/%d/i, e);
}
function Za(e, t) {
  var r = this._relativeTime[e > 0 ? "future" : "past"];
  return de(r) ? r(t) : r.replace(/%s/i, t);
}
var Vr = {
  D: "date",
  dates: "date",
  date: "date",
  d: "day",
  days: "day",
  day: "day",
  e: "weekday",
  weekdays: "weekday",
  weekday: "weekday",
  E: "isoWeekday",
  isoweekdays: "isoWeekday",
  isoweekday: "isoWeekday",
  DDD: "dayOfYear",
  dayofyears: "dayOfYear",
  dayofyear: "dayOfYear",
  h: "hour",
  hours: "hour",
  hour: "hour",
  ms: "millisecond",
  milliseconds: "millisecond",
  millisecond: "millisecond",
  m: "minute",
  minutes: "minute",
  minute: "minute",
  M: "month",
  months: "month",
  month: "month",
  Q: "quarter",
  quarters: "quarter",
  quarter: "quarter",
  s: "second",
  seconds: "second",
  second: "second",
  gg: "weekYear",
  weekyears: "weekYear",
  weekyear: "weekYear",
  GG: "isoWeekYear",
  isoweekyears: "isoWeekYear",
  isoweekyear: "isoWeekYear",
  w: "week",
  weeks: "week",
  week: "week",
  W: "isoWeek",
  isoweeks: "isoWeek",
  isoweek: "isoWeek",
  y: "year",
  years: "year",
  year: "year",
};
function ee(e) {
  return typeof e == "string" ? Vr[e] || Vr[e.toLowerCase()] : void 0;
}
function vr(e) {
  var t = {},
    r,
    n;
  for (n in e) M(e, n) && ((r = ee(n)), r && (t[r] = e[n]));
  return t;
}
var Ja = {
  date: 9,
  day: 11,
  weekday: 11,
  isoWeekday: 11,
  dayOfYear: 4,
  hour: 13,
  millisecond: 16,
  minute: 14,
  month: 8,
  quarter: 7,
  second: 15,
  weekYear: 1,
  isoWeekYear: 1,
  week: 5,
  isoWeek: 5,
  year: 1,
};
function Xa(e) {
  var t = [],
    r;
  for (r in e) M(e, r) && t.push({ unit: r, priority: Ja[r] });
  return (
    t.sort(function (n, a) {
      return n.priority - a.priority;
    }),
    t
  );
}
var cn = /\d/,
  Z = /\d\d/,
  dn = /\d{3}/,
  wr = /\d{4}/,
  Yt = /[+-]?\d{6}/,
  R = /\d\d?/,
  fn = /\d\d\d\d?/,
  hn = /\d\d\d\d\d\d?/,
  Rt = /\d{1,3}/,
  br = /\d{1,4}/,
  It = /[+-]?\d{1,6}/,
  qe = /\d+/,
  At = /[+-]?\d+/,
  Qa = /Z|[+-]\d\d:?\d\d/gi,
  Pt = /Z|[+-]\d\d(?::?\d\d)?/gi,
  es = /[+-]?\d+(\.\d{1,3})?/,
  pt =
    /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i,
  Ze = /^[1-9]\d?/,
  kr = /^([1-9]\d|\d)/,
  Mt;
Mt = {};
function h(e, t, r) {
  Mt[e] = de(t)
    ? t
    : function (n, a) {
        return n && r ? r : t;
      };
}
function ts(e, t) {
  return M(Mt, e) ? Mt[e](t._strict, t._locale) : new RegExp(rs(e));
}
function rs(e) {
  return ge(
    e
      .replace("\\", "")
      .replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (t, r, n, a, s) {
        return r || n || a || s;
      })
  );
}
function ge(e) {
  return e.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}
function X(e) {
  return e < 0 ? Math.ceil(e) || 0 : Math.floor(e);
}
function S(e) {
  var t = +e,
    r = 0;
  return t !== 0 && isFinite(t) && (r = X(t)), r;
}
var rr = {};
function x(e, t) {
  var r,
    n = t,
    a;
  for (
    typeof e == "string" && (e = [e]),
      ve(t) &&
        (n = function (s, i) {
          i[t] = S(s);
        }),
      a = e.length,
      r = 0;
    r < a;
    r++
  )
    rr[e[r]] = n;
}
function gt(e, t) {
  x(e, function (r, n, a, s) {
    (a._w = a._w || {}), t(r, a._w, a, s);
  });
}
function ns(e, t, r) {
  t != null && M(rr, e) && rr[e](t, r._a, r, e);
}
function Ft(e) {
  return (e % 4 === 0 && e % 100 !== 0) || e % 400 === 0;
}
var B = 0,
  me = 1,
  le = 2,
  U = 3,
  re = 4,
  pe = 5,
  Ne = 6,
  as = 7,
  ss = 8;
p("Y", 0, 0, function () {
  var e = this.year();
  return e <= 9999 ? ue(e, 4) : "+" + e;
});
p(0, ["YY", 2], 0, function () {
  return this.year() % 100;
});
p(0, ["YYYY", 4], 0, "year");
p(0, ["YYYYY", 5], 0, "year");
p(0, ["YYYYYY", 6, !0], 0, "year");
h("Y", At);
h("YY", R, Z);
h("YYYY", br, wr);
h("YYYYY", It, Yt);
h("YYYYYY", It, Yt);
x(["YYYYY", "YYYYYY"], B);
x("YYYY", function (e, t) {
  t[B] = e.length === 2 ? d.parseTwoDigitYear(e) : S(e);
});
x("YY", function (e, t) {
  t[B] = d.parseTwoDigitYear(e);
});
x("Y", function (e, t) {
  t[B] = parseInt(e, 10);
});
function it(e) {
  return Ft(e) ? 366 : 365;
}
d.parseTwoDigitYear = function (e) {
  return S(e) + (S(e) > 68 ? 1900 : 2e3);
};
var _n = Je("FullYear", !0);
function is() {
  return Ft(this.year());
}
function Je(e, t) {
  return function (r) {
    return r != null
      ? (mn(this, e, r), d.updateOffset(this, t), this)
      : lt(this, e);
  };
}
function lt(e, t) {
  if (!e.isValid()) return NaN;
  var r = e._d,
    n = e._isUTC;
  switch (t) {
    case "Milliseconds":
      return n ? r.getUTCMilliseconds() : r.getMilliseconds();
    case "Seconds":
      return n ? r.getUTCSeconds() : r.getSeconds();
    case "Minutes":
      return n ? r.getUTCMinutes() : r.getMinutes();
    case "Hours":
      return n ? r.getUTCHours() : r.getHours();
    case "Date":
      return n ? r.getUTCDate() : r.getDate();
    case "Day":
      return n ? r.getUTCDay() : r.getDay();
    case "Month":
      return n ? r.getUTCMonth() : r.getMonth();
    case "FullYear":
      return n ? r.getUTCFullYear() : r.getFullYear();
    default:
      return NaN;
  }
}
function mn(e, t, r) {
  var n, a, s, i, o;
  if (!(!e.isValid() || isNaN(r))) {
    switch (((n = e._d), (a = e._isUTC), t)) {
      case "Milliseconds":
        return void (a ? n.setUTCMilliseconds(r) : n.setMilliseconds(r));
      case "Seconds":
        return void (a ? n.setUTCSeconds(r) : n.setSeconds(r));
      case "Minutes":
        return void (a ? n.setUTCMinutes(r) : n.setMinutes(r));
      case "Hours":
        return void (a ? n.setUTCHours(r) : n.setHours(r));
      case "Date":
        return void (a ? n.setUTCDate(r) : n.setDate(r));
      case "FullYear":
        break;
      default:
        return;
    }
    (s = r),
      (i = e.month()),
      (o = e.date()),
      (o = o === 29 && i === 1 && !Ft(s) ? 28 : o),
      a ? n.setUTCFullYear(s, i, o) : n.setFullYear(s, i, o);
  }
}
function os(e) {
  return (e = ee(e)), de(this[e]) ? this[e]() : this;
}
function ls(e, t) {
  if (typeof e == "object") {
    e = vr(e);
    var r = Xa(e),
      n,
      a = r.length;
    for (n = 0; n < a; n++) this[r[n].unit](e[r[n].unit]);
  } else if (((e = ee(e)), de(this[e]))) return this[e](t);
  return this;
}
function us(e, t) {
  return ((e % t) + t) % t;
}
var P;
Array.prototype.indexOf
  ? (P = Array.prototype.indexOf)
  : (P = function (e) {
      var t;
      for (t = 0; t < this.length; ++t) if (this[t] === e) return t;
      return -1;
    });
function Sr(e, t) {
  if (isNaN(e) || isNaN(t)) return NaN;
  var r = us(t, 12);
  return (e += (t - r) / 12), r === 1 ? (Ft(e) ? 29 : 28) : 31 - ((r % 7) % 2);
}
p("M", ["MM", 2], "Mo", function () {
  return this.month() + 1;
});
p("MMM", 0, 0, function (e) {
  return this.localeData().monthsShort(this, e);
});
p("MMMM", 0, 0, function (e) {
  return this.localeData().months(this, e);
});
h("M", R, Ze);
h("MM", R, Z);
h("MMM", function (e, t) {
  return t.monthsShortRegex(e);
});
h("MMMM", function (e, t) {
  return t.monthsRegex(e);
});
x(["M", "MM"], function (e, t) {
  t[me] = S(e) - 1;
});
x(["MMM", "MMMM"], function (e, t, r, n) {
  var a = r._locale.monthsParse(e, n, r._strict);
  a != null ? (t[me] = a) : (w(r).invalidMonth = e);
});
var cs =
    "January_February_March_April_May_June_July_August_September_October_November_December".split(
      "_"
    ),
  pn = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
  gn = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,
  ds = pt,
  fs = pt;
function hs(e, t) {
  return e
    ? ae(this._months)
      ? this._months[e.month()]
      : this._months[
          (this._months.isFormat || gn).test(t) ? "format" : "standalone"
        ][e.month()]
    : ae(this._months)
    ? this._months
    : this._months.standalone;
}
function _s(e, t) {
  return e
    ? ae(this._monthsShort)
      ? this._monthsShort[e.month()]
      : this._monthsShort[gn.test(t) ? "format" : "standalone"][e.month()]
    : ae(this._monthsShort)
    ? this._monthsShort
    : this._monthsShort.standalone;
}
function ms(e, t, r) {
  var n,
    a,
    s,
    i = e.toLocaleLowerCase();
  if (!this._monthsParse)
    for (
      this._monthsParse = [],
        this._longMonthsParse = [],
        this._shortMonthsParse = [],
        n = 0;
      n < 12;
      ++n
    )
      (s = ce([2e3, n])),
        (this._shortMonthsParse[n] = this.monthsShort(
          s,
          ""
        ).toLocaleLowerCase()),
        (this._longMonthsParse[n] = this.months(s, "").toLocaleLowerCase());
  return r
    ? t === "MMM"
      ? ((a = P.call(this._shortMonthsParse, i)), a !== -1 ? a : null)
      : ((a = P.call(this._longMonthsParse, i)), a !== -1 ? a : null)
    : t === "MMM"
    ? ((a = P.call(this._shortMonthsParse, i)),
      a !== -1
        ? a
        : ((a = P.call(this._longMonthsParse, i)), a !== -1 ? a : null))
    : ((a = P.call(this._longMonthsParse, i)),
      a !== -1
        ? a
        : ((a = P.call(this._shortMonthsParse, i)), a !== -1 ? a : null));
}
function ps(e, t, r) {
  var n, a, s;
  if (this._monthsParseExact) return ms.call(this, e, t, r);
  for (
    this._monthsParse ||
      ((this._monthsParse = []),
      (this._longMonthsParse = []),
      (this._shortMonthsParse = [])),
      n = 0;
    n < 12;
    n++
  ) {
    if (
      ((a = ce([2e3, n])),
      r &&
        !this._longMonthsParse[n] &&
        ((this._longMonthsParse[n] = new RegExp(
          "^" + this.months(a, "").replace(".", "") + "$",
          "i"
        )),
        (this._shortMonthsParse[n] = new RegExp(
          "^" + this.monthsShort(a, "").replace(".", "") + "$",
          "i"
        ))),
      !r &&
        !this._monthsParse[n] &&
        ((s = "^" + this.months(a, "") + "|^" + this.monthsShort(a, "")),
        (this._monthsParse[n] = new RegExp(s.replace(".", ""), "i"))),
      r && t === "MMMM" && this._longMonthsParse[n].test(e))
    )
      return n;
    if (r && t === "MMM" && this._shortMonthsParse[n].test(e)) return n;
    if (!r && this._monthsParse[n].test(e)) return n;
  }
}
function yn(e, t) {
  if (!e.isValid()) return e;
  if (typeof t == "string") {
    if (/^\d+$/.test(t)) t = S(t);
    else if (((t = e.localeData().monthsParse(t)), !ve(t))) return e;
  }
  var r = t,
    n = e.date();
  return (
    (n = n < 29 ? n : Math.min(n, Sr(e.year(), r))),
    e._isUTC ? e._d.setUTCMonth(r, n) : e._d.setMonth(r, n),
    e
  );
}
function vn(e) {
  return e != null
    ? (yn(this, e), d.updateOffset(this, !0), this)
    : lt(this, "Month");
}
function gs() {
  return Sr(this.year(), this.month());
}
function ys(e) {
  return this._monthsParseExact
    ? (M(this, "_monthsRegex") || wn.call(this),
      e ? this._monthsShortStrictRegex : this._monthsShortRegex)
    : (M(this, "_monthsShortRegex") || (this._monthsShortRegex = ds),
      this._monthsShortStrictRegex && e
        ? this._monthsShortStrictRegex
        : this._monthsShortRegex);
}
function vs(e) {
  return this._monthsParseExact
    ? (M(this, "_monthsRegex") || wn.call(this),
      e ? this._monthsStrictRegex : this._monthsRegex)
    : (M(this, "_monthsRegex") || (this._monthsRegex = fs),
      this._monthsStrictRegex && e
        ? this._monthsStrictRegex
        : this._monthsRegex);
}
function wn() {
  function e(l, c) {
    return c.length - l.length;
  }
  var t = [],
    r = [],
    n = [],
    a,
    s,
    i,
    o;
  for (a = 0; a < 12; a++)
    (s = ce([2e3, a])),
      (i = ge(this.monthsShort(s, ""))),
      (o = ge(this.months(s, ""))),
      t.push(i),
      r.push(o),
      n.push(o),
      n.push(i);
  t.sort(e),
    r.sort(e),
    n.sort(e),
    (this._monthsRegex = new RegExp("^(" + n.join("|") + ")", "i")),
    (this._monthsShortRegex = this._monthsRegex),
    (this._monthsStrictRegex = new RegExp("^(" + r.join("|") + ")", "i")),
    (this._monthsShortStrictRegex = new RegExp("^(" + t.join("|") + ")", "i"));
}
function ws(e, t, r, n, a, s, i) {
  var o;
  return (
    e < 100 && e >= 0
      ? ((o = new Date(e + 400, t, r, n, a, s, i)),
        isFinite(o.getFullYear()) && o.setFullYear(e))
      : (o = new Date(e, t, r, n, a, s, i)),
    o
  );
}
function ut(e) {
  var t, r;
  return (
    e < 100 && e >= 0
      ? ((r = Array.prototype.slice.call(arguments)),
        (r[0] = e + 400),
        (t = new Date(Date.UTC.apply(null, r))),
        isFinite(t.getUTCFullYear()) && t.setUTCFullYear(e))
      : (t = new Date(Date.UTC.apply(null, arguments))),
    t
  );
}
function Dt(e, t, r) {
  var n = 7 + t - r,
    a = (7 + ut(e, 0, n).getUTCDay() - t) % 7;
  return -a + n - 1;
}
function bn(e, t, r, n, a) {
  var s = (7 + r - n) % 7,
    i = Dt(e, n, a),
    o = 1 + 7 * (t - 1) + s + i,
    l,
    c;
  return (
    o <= 0
      ? ((l = e - 1), (c = it(l) + o))
      : o > it(e)
      ? ((l = e + 1), (c = o - it(e)))
      : ((l = e), (c = o)),
    { year: l, dayOfYear: c }
  );
}
function ct(e, t, r) {
  var n = Dt(e.year(), t, r),
    a = Math.floor((e.dayOfYear() - n - 1) / 7) + 1,
    s,
    i;
  return (
    a < 1
      ? ((i = e.year() - 1), (s = a + ye(i, t, r)))
      : a > ye(e.year(), t, r)
      ? ((s = a - ye(e.year(), t, r)), (i = e.year() + 1))
      : ((i = e.year()), (s = a)),
    { week: s, year: i }
  );
}
function ye(e, t, r) {
  var n = Dt(e, t, r),
    a = Dt(e + 1, t, r);
  return (it(e) - n + a) / 7;
}
p("w", ["ww", 2], "wo", "week");
p("W", ["WW", 2], "Wo", "isoWeek");
h("w", R, Ze);
h("ww", R, Z);
h("W", R, Ze);
h("WW", R, Z);
gt(["w", "ww", "W", "WW"], function (e, t, r, n) {
  t[n.substr(0, 1)] = S(e);
});
function bs(e) {
  return ct(e, this._week.dow, this._week.doy).week;
}
var ks = { dow: 0, doy: 6 };
function Ss() {
  return this._week.dow;
}
function Os() {
  return this._week.doy;
}
function Ts(e) {
  var t = this.localeData().week(this);
  return e == null ? t : this.add((e - t) * 7, "d");
}
function Ms(e) {
  var t = ct(this, 1, 4).week;
  return e == null ? t : this.add((e - t) * 7, "d");
}
p("d", 0, "do", "day");
p("dd", 0, 0, function (e) {
  return this.localeData().weekdaysMin(this, e);
});
p("ddd", 0, 0, function (e) {
  return this.localeData().weekdaysShort(this, e);
});
p("dddd", 0, 0, function (e) {
  return this.localeData().weekdays(this, e);
});
p("e", 0, 0, "weekday");
p("E", 0, 0, "isoWeekday");
h("d", R);
h("e", R);
h("E", R);
h("dd", function (e, t) {
  return t.weekdaysMinRegex(e);
});
h("ddd", function (e, t) {
  return t.weekdaysShortRegex(e);
});
h("dddd", function (e, t) {
  return t.weekdaysRegex(e);
});
gt(["dd", "ddd", "dddd"], function (e, t, r, n) {
  var a = r._locale.weekdaysParse(e, n, r._strict);
  a != null ? (t.d = a) : (w(r).invalidWeekday = e);
});
gt(["d", "e", "E"], function (e, t, r, n) {
  t[n] = S(e);
});
function Ds(e, t) {
  return typeof e != "string"
    ? e
    : isNaN(e)
    ? ((e = t.weekdaysParse(e)), typeof e == "number" ? e : null)
    : parseInt(e, 10);
}
function Es(e, t) {
  return typeof e == "string"
    ? t.weekdaysParse(e) % 7 || 7
    : isNaN(e)
    ? null
    : e;
}
function Or(e, t) {
  return e.slice(t, 7).concat(e.slice(0, t));
}
var Cs = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
  kn = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
  xs = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
  Ns = pt,
  Ys = pt,
  Rs = pt;
function Is(e, t) {
  var r = ae(this._weekdays)
    ? this._weekdays
    : this._weekdays[
        e && e !== !0 && this._weekdays.isFormat.test(t)
          ? "format"
          : "standalone"
      ];
  return e === !0 ? Or(r, this._week.dow) : e ? r[e.day()] : r;
}
function As(e) {
  return e === !0
    ? Or(this._weekdaysShort, this._week.dow)
    : e
    ? this._weekdaysShort[e.day()]
    : this._weekdaysShort;
}
function Ps(e) {
  return e === !0
    ? Or(this._weekdaysMin, this._week.dow)
    : e
    ? this._weekdaysMin[e.day()]
    : this._weekdaysMin;
}
function Fs(e, t, r) {
  var n,
    a,
    s,
    i = e.toLocaleLowerCase();
  if (!this._weekdaysParse)
    for (
      this._weekdaysParse = [],
        this._shortWeekdaysParse = [],
        this._minWeekdaysParse = [],
        n = 0;
      n < 7;
      ++n
    )
      (s = ce([2e3, 1]).day(n)),
        (this._minWeekdaysParse[n] = this.weekdaysMin(
          s,
          ""
        ).toLocaleLowerCase()),
        (this._shortWeekdaysParse[n] = this.weekdaysShort(
          s,
          ""
        ).toLocaleLowerCase()),
        (this._weekdaysParse[n] = this.weekdays(s, "").toLocaleLowerCase());
  return r
    ? t === "dddd"
      ? ((a = P.call(this._weekdaysParse, i)), a !== -1 ? a : null)
      : t === "ddd"
      ? ((a = P.call(this._shortWeekdaysParse, i)), a !== -1 ? a : null)
      : ((a = P.call(this._minWeekdaysParse, i)), a !== -1 ? a : null)
    : t === "dddd"
    ? ((a = P.call(this._weekdaysParse, i)),
      a !== -1 || ((a = P.call(this._shortWeekdaysParse, i)), a !== -1)
        ? a
        : ((a = P.call(this._minWeekdaysParse, i)), a !== -1 ? a : null))
    : t === "ddd"
    ? ((a = P.call(this._shortWeekdaysParse, i)),
      a !== -1 || ((a = P.call(this._weekdaysParse, i)), a !== -1)
        ? a
        : ((a = P.call(this._minWeekdaysParse, i)), a !== -1 ? a : null))
    : ((a = P.call(this._minWeekdaysParse, i)),
      a !== -1 || ((a = P.call(this._weekdaysParse, i)), a !== -1)
        ? a
        : ((a = P.call(this._shortWeekdaysParse, i)), a !== -1 ? a : null));
}
function Ls(e, t, r) {
  var n, a, s;
  if (this._weekdaysParseExact) return Fs.call(this, e, t, r);
  for (
    this._weekdaysParse ||
      ((this._weekdaysParse = []),
      (this._minWeekdaysParse = []),
      (this._shortWeekdaysParse = []),
      (this._fullWeekdaysParse = [])),
      n = 0;
    n < 7;
    n++
  ) {
    if (
      ((a = ce([2e3, 1]).day(n)),
      r &&
        !this._fullWeekdaysParse[n] &&
        ((this._fullWeekdaysParse[n] = new RegExp(
          "^" + this.weekdays(a, "").replace(".", "\\.?") + "$",
          "i"
        )),
        (this._shortWeekdaysParse[n] = new RegExp(
          "^" + this.weekdaysShort(a, "").replace(".", "\\.?") + "$",
          "i"
        )),
        (this._minWeekdaysParse[n] = new RegExp(
          "^" + this.weekdaysMin(a, "").replace(".", "\\.?") + "$",
          "i"
        ))),
      this._weekdaysParse[n] ||
        ((s =
          "^" +
          this.weekdays(a, "") +
          "|^" +
          this.weekdaysShort(a, "") +
          "|^" +
          this.weekdaysMin(a, "")),
        (this._weekdaysParse[n] = new RegExp(s.replace(".", ""), "i"))),
      r && t === "dddd" && this._fullWeekdaysParse[n].test(e))
    )
      return n;
    if (r && t === "ddd" && this._shortWeekdaysParse[n].test(e)) return n;
    if (r && t === "dd" && this._minWeekdaysParse[n].test(e)) return n;
    if (!r && this._weekdaysParse[n].test(e)) return n;
  }
}
function Ws(e) {
  if (!this.isValid()) return e != null ? this : NaN;
  var t = lt(this, "Day");
  return e != null ? ((e = Ds(e, this.localeData())), this.add(e - t, "d")) : t;
}
function Us(e) {
  if (!this.isValid()) return e != null ? this : NaN;
  var t = (this.day() + 7 - this.localeData()._week.dow) % 7;
  return e == null ? t : this.add(e - t, "d");
}
function Hs(e) {
  if (!this.isValid()) return e != null ? this : NaN;
  if (e != null) {
    var t = Es(e, this.localeData());
    return this.day(this.day() % 7 ? t : t - 7);
  } else return this.day() || 7;
}
function js(e) {
  return this._weekdaysParseExact
    ? (M(this, "_weekdaysRegex") || Tr.call(this),
      e ? this._weekdaysStrictRegex : this._weekdaysRegex)
    : (M(this, "_weekdaysRegex") || (this._weekdaysRegex = Ns),
      this._weekdaysStrictRegex && e
        ? this._weekdaysStrictRegex
        : this._weekdaysRegex);
}
function Bs(e) {
  return this._weekdaysParseExact
    ? (M(this, "_weekdaysRegex") || Tr.call(this),
      e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex)
    : (M(this, "_weekdaysShortRegex") || (this._weekdaysShortRegex = Ys),
      this._weekdaysShortStrictRegex && e
        ? this._weekdaysShortStrictRegex
        : this._weekdaysShortRegex);
}
function Gs(e) {
  return this._weekdaysParseExact
    ? (M(this, "_weekdaysRegex") || Tr.call(this),
      e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex)
    : (M(this, "_weekdaysMinRegex") || (this._weekdaysMinRegex = Rs),
      this._weekdaysMinStrictRegex && e
        ? this._weekdaysMinStrictRegex
        : this._weekdaysMinRegex);
}
function Tr() {
  function e(f, g) {
    return g.length - f.length;
  }
  var t = [],
    r = [],
    n = [],
    a = [],
    s,
    i,
    o,
    l,
    c;
  for (s = 0; s < 7; s++)
    (i = ce([2e3, 1]).day(s)),
      (o = ge(this.weekdaysMin(i, ""))),
      (l = ge(this.weekdaysShort(i, ""))),
      (c = ge(this.weekdays(i, ""))),
      t.push(o),
      r.push(l),
      n.push(c),
      a.push(o),
      a.push(l),
      a.push(c);
  t.sort(e),
    r.sort(e),
    n.sort(e),
    a.sort(e),
    (this._weekdaysRegex = new RegExp("^(" + a.join("|") + ")", "i")),
    (this._weekdaysShortRegex = this._weekdaysRegex),
    (this._weekdaysMinRegex = this._weekdaysRegex),
    (this._weekdaysStrictRegex = new RegExp("^(" + n.join("|") + ")", "i")),
    (this._weekdaysShortStrictRegex = new RegExp(
      "^(" + r.join("|") + ")",
      "i"
    )),
    (this._weekdaysMinStrictRegex = new RegExp("^(" + t.join("|") + ")", "i"));
}
function Mr() {
  return this.hours() % 12 || 12;
}
function Vs() {
  return this.hours() || 24;
}
p("H", ["HH", 2], 0, "hour");
p("h", ["hh", 2], 0, Mr);
p("k", ["kk", 2], 0, Vs);
p("hmm", 0, 0, function () {
  return "" + Mr.apply(this) + ue(this.minutes(), 2);
});
p("hmmss", 0, 0, function () {
  return "" + Mr.apply(this) + ue(this.minutes(), 2) + ue(this.seconds(), 2);
});
p("Hmm", 0, 0, function () {
  return "" + this.hours() + ue(this.minutes(), 2);
});
p("Hmmss", 0, 0, function () {
  return "" + this.hours() + ue(this.minutes(), 2) + ue(this.seconds(), 2);
});
function Sn(e, t) {
  p(e, 0, 0, function () {
    return this.localeData().meridiem(this.hours(), this.minutes(), t);
  });
}
Sn("a", !0);
Sn("A", !1);
function On(e, t) {
  return t._meridiemParse;
}
h("a", On);
h("A", On);
h("H", R, kr);
h("h", R, Ze);
h("k", R, Ze);
h("HH", R, Z);
h("hh", R, Z);
h("kk", R, Z);
h("hmm", fn);
h("hmmss", hn);
h("Hmm", fn);
h("Hmmss", hn);
x(["H", "HH"], U);
x(["k", "kk"], function (e, t, r) {
  var n = S(e);
  t[U] = n === 24 ? 0 : n;
});
x(["a", "A"], function (e, t, r) {
  (r._isPm = r._locale.isPM(e)), (r._meridiem = e);
});
x(["h", "hh"], function (e, t, r) {
  (t[U] = S(e)), (w(r).bigHour = !0);
});
x("hmm", function (e, t, r) {
  var n = e.length - 2;
  (t[U] = S(e.substr(0, n))), (t[re] = S(e.substr(n))), (w(r).bigHour = !0);
});
x("hmmss", function (e, t, r) {
  var n = e.length - 4,
    a = e.length - 2;
  (t[U] = S(e.substr(0, n))),
    (t[re] = S(e.substr(n, 2))),
    (t[pe] = S(e.substr(a))),
    (w(r).bigHour = !0);
});
x("Hmm", function (e, t, r) {
  var n = e.length - 2;
  (t[U] = S(e.substr(0, n))), (t[re] = S(e.substr(n)));
});
x("Hmmss", function (e, t, r) {
  var n = e.length - 4,
    a = e.length - 2;
  (t[U] = S(e.substr(0, n))),
    (t[re] = S(e.substr(n, 2))),
    (t[pe] = S(e.substr(a)));
});
function $s(e) {
  return (e + "").toLowerCase().charAt(0) === "p";
}
var zs = /[ap]\.?m?\.?/i,
  Ks = Je("Hours", !0);
function qs(e, t, r) {
  return e > 11 ? (r ? "pm" : "PM") : r ? "am" : "AM";
}
var Tn = {
    calendar: Fa,
    longDateFormat: Ha,
    invalidDate: Ba,
    ordinal: Va,
    dayOfMonthOrdinalParse: $a,
    relativeTime: Ka,
    months: cs,
    monthsShort: pn,
    week: ks,
    weekdays: Cs,
    weekdaysMin: xs,
    weekdaysShort: kn,
    meridiemParse: zs,
  },
  A = {},
  tt = {},
  dt;
function Zs(e, t) {
  var r,
    n = Math.min(e.length, t.length);
  for (r = 0; r < n; r += 1) if (e[r] !== t[r]) return r;
  return n;
}
function $r(e) {
  return e && e.toLowerCase().replace("_", "-");
}
function Js(e) {
  for (var t = 0, r, n, a, s; t < e.length; ) {
    for (
      s = $r(e[t]).split("-"),
        r = s.length,
        n = $r(e[t + 1]),
        n = n ? n.split("-") : null;
      r > 0;

    ) {
      if (((a = Lt(s.slice(0, r).join("-"))), a)) return a;
      if (n && n.length >= r && Zs(s, n) >= r - 1) break;
      r--;
    }
    t++;
  }
  return dt;
}
function Xs(e) {
  return !!(e && e.match("^[^/\\\\]*$"));
}
function Lt(e) {
  var t = null,
    r;
  if (
    A[e] === void 0 &&
    typeof module < "u" &&
    module &&
    module.exports &&
    Xs(e)
  )
    try {
      (t = dt._abbr), (r = require), r("./locale/" + e), Me(t);
    } catch {
      A[e] = null;
    }
  return A[e];
}
function Me(e, t) {
  var r;
  return (
    e &&
      ($(t) ? (r = we(e)) : (r = Dr(e, t)),
      r
        ? (dt = r)
        : typeof console < "u" &&
          console.warn &&
          console.warn(
            "Locale " + e + " not found. Did you forget to load it?"
          )),
    dt._abbr
  );
}
function Dr(e, t) {
  if (t !== null) {
    var r,
      n = Tn;
    if (((t.abbr = e), A[e] != null))
      ln(
        "defineLocaleOverride",
        "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."
      ),
        (n = A[e]._config);
    else if (t.parentLocale != null)
      if (A[t.parentLocale] != null) n = A[t.parentLocale]._config;
      else if (((r = Lt(t.parentLocale)), r != null)) n = r._config;
      else
        return (
          tt[t.parentLocale] || (tt[t.parentLocale] = []),
          tt[t.parentLocale].push({ name: e, config: t }),
          null
        );
    return (
      (A[e] = new gr(er(n, t))),
      tt[e] &&
        tt[e].forEach(function (a) {
          Dr(a.name, a.config);
        }),
      Me(e),
      A[e]
    );
  } else return delete A[e], null;
}
function Qs(e, t) {
  if (t != null) {
    var r,
      n,
      a = Tn;
    A[e] != null && A[e].parentLocale != null
      ? A[e].set(er(A[e]._config, t))
      : ((n = Lt(e)),
        n != null && (a = n._config),
        (t = er(a, t)),
        n == null && (t.abbr = e),
        (r = new gr(t)),
        (r.parentLocale = A[e]),
        (A[e] = r)),
      Me(e);
  } else
    A[e] != null &&
      (A[e].parentLocale != null
        ? ((A[e] = A[e].parentLocale), e === Me() && Me(e))
        : A[e] != null && delete A[e]);
  return A[e];
}
function we(e) {
  var t;
  if ((e && e._locale && e._locale._abbr && (e = e._locale._abbr), !e))
    return dt;
  if (!ae(e)) {
    if (((t = Lt(e)), t)) return t;
    e = [e];
  }
  return Js(e);
}
function ei() {
  return tr(A);
}
function Er(e) {
  var t,
    r = e._a;
  return (
    r &&
      w(e).overflow === -2 &&
      ((t =
        r[me] < 0 || r[me] > 11
          ? me
          : r[le] < 1 || r[le] > Sr(r[B], r[me])
          ? le
          : r[U] < 0 ||
            r[U] > 24 ||
            (r[U] === 24 && (r[re] !== 0 || r[pe] !== 0 || r[Ne] !== 0))
          ? U
          : r[re] < 0 || r[re] > 59
          ? re
          : r[pe] < 0 || r[pe] > 59
          ? pe
          : r[Ne] < 0 || r[Ne] > 999
          ? Ne
          : -1),
      w(e)._overflowDayOfYear && (t < B || t > le) && (t = le),
      w(e)._overflowWeeks && t === -1 && (t = as),
      w(e)._overflowWeekday && t === -1 && (t = ss),
      (w(e).overflow = t)),
    e
  );
}
var ti =
    /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
  ri =
    /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
  ni = /Z|[+-]\d\d(?::?\d\d)?/,
  bt = [
    ["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/],
    ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/],
    ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/],
    ["GGGG-[W]WW", /\d{4}-W\d\d/, !1],
    ["YYYY-DDD", /\d{4}-\d{3}/],
    ["YYYY-MM", /\d{4}-\d\d/, !1],
    ["YYYYYYMMDD", /[+-]\d{10}/],
    ["YYYYMMDD", /\d{8}/],
    ["GGGG[W]WWE", /\d{4}W\d{3}/],
    ["GGGG[W]WW", /\d{4}W\d{2}/, !1],
    ["YYYYDDD", /\d{7}/],
    ["YYYYMM", /\d{6}/, !1],
    ["YYYY", /\d{4}/, !1],
  ],
  Kt = [
    ["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/],
    ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/],
    ["HH:mm:ss", /\d\d:\d\d:\d\d/],
    ["HH:mm", /\d\d:\d\d/],
    ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/],
    ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/],
    ["HHmmss", /\d\d\d\d\d\d/],
    ["HHmm", /\d\d\d\d/],
    ["HH", /\d\d/],
  ],
  ai = /^\/?Date\((-?\d+)/i,
  si =
    /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/,
  ii = {
    UT: 0,
    GMT: 0,
    EDT: -4 * 60,
    EST: -5 * 60,
    CDT: -5 * 60,
    CST: -6 * 60,
    MDT: -6 * 60,
    MST: -7 * 60,
    PDT: -7 * 60,
    PST: -8 * 60,
  };
function Mn(e) {
  var t,
    r,
    n = e._i,
    a = ti.exec(n) || ri.exec(n),
    s,
    i,
    o,
    l,
    c = bt.length,
    f = Kt.length;
  if (a) {
    for (w(e).iso = !0, t = 0, r = c; t < r; t++)
      if (bt[t][1].exec(a[1])) {
        (i = bt[t][0]), (s = bt[t][2] !== !1);
        break;
      }
    if (i == null) {
      e._isValid = !1;
      return;
    }
    if (a[3]) {
      for (t = 0, r = f; t < r; t++)
        if (Kt[t][1].exec(a[3])) {
          o = (a[2] || " ") + Kt[t][0];
          break;
        }
      if (o == null) {
        e._isValid = !1;
        return;
      }
    }
    if (!s && o != null) {
      e._isValid = !1;
      return;
    }
    if (a[4])
      if (ni.exec(a[4])) l = "Z";
      else {
        e._isValid = !1;
        return;
      }
    (e._f = i + (o || "") + (l || "")), xr(e);
  } else e._isValid = !1;
}
function oi(e, t, r, n, a, s) {
  var i = [
    li(e),
    pn.indexOf(t),
    parseInt(r, 10),
    parseInt(n, 10),
    parseInt(a, 10),
  ];
  return s && i.push(parseInt(s, 10)), i;
}
function li(e) {
  var t = parseInt(e, 10);
  return t <= 49 ? 2e3 + t : t <= 999 ? 1900 + t : t;
}
function ui(e) {
  return e
    .replace(/\([^()]*\)|[\n\t]/g, " ")
    .replace(/(\s\s+)/g, " ")
    .replace(/^\s\s*/, "")
    .replace(/\s\s*$/, "");
}
function ci(e, t, r) {
  if (e) {
    var n = kn.indexOf(e),
      a = new Date(t[0], t[1], t[2]).getDay();
    if (n !== a) return (w(r).weekdayMismatch = !0), (r._isValid = !1), !1;
  }
  return !0;
}
function di(e, t, r) {
  if (e) return ii[e];
  if (t) return 0;
  var n = parseInt(r, 10),
    a = n % 100,
    s = (n - a) / 100;
  return s * 60 + a;
}
function Dn(e) {
  var t = si.exec(ui(e._i)),
    r;
  if (t) {
    if (((r = oi(t[4], t[3], t[2], t[5], t[6], t[7])), !ci(t[1], r, e))) return;
    (e._a = r),
      (e._tzm = di(t[8], t[9], t[10])),
      (e._d = ut.apply(null, e._a)),
      e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm),
      (w(e).rfc2822 = !0);
  } else e._isValid = !1;
}
function fi(e) {
  var t = ai.exec(e._i);
  if (t !== null) {
    e._d = new Date(+t[1]);
    return;
  }
  if ((Mn(e), e._isValid === !1)) delete e._isValid;
  else return;
  if ((Dn(e), e._isValid === !1)) delete e._isValid;
  else return;
  e._strict ? (e._isValid = !1) : d.createFromInputFallback(e);
}
d.createFromInputFallback = Q(
  "value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.",
  function (e) {
    e._d = new Date(e._i + (e._useUTC ? " UTC" : ""));
  }
);
function Ue(e, t, r) {
  return e ?? t ?? r;
}
function hi(e) {
  var t = new Date(d.now());
  return e._useUTC
    ? [t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate()]
    : [t.getFullYear(), t.getMonth(), t.getDate()];
}
function Cr(e) {
  var t,
    r,
    n = [],
    a,
    s,
    i;
  if (!e._d) {
    for (
      a = hi(e),
        e._w && e._a[le] == null && e._a[me] == null && _i(e),
        e._dayOfYear != null &&
          ((i = Ue(e._a[B], a[B])),
          (e._dayOfYear > it(i) || e._dayOfYear === 0) &&
            (w(e)._overflowDayOfYear = !0),
          (r = ut(i, 0, e._dayOfYear)),
          (e._a[me] = r.getUTCMonth()),
          (e._a[le] = r.getUTCDate())),
        t = 0;
      t < 3 && e._a[t] == null;
      ++t
    )
      e._a[t] = n[t] = a[t];
    for (; t < 7; t++)
      e._a[t] = n[t] = e._a[t] == null ? (t === 2 ? 1 : 0) : e._a[t];
    e._a[U] === 24 &&
      e._a[re] === 0 &&
      e._a[pe] === 0 &&
      e._a[Ne] === 0 &&
      ((e._nextDay = !0), (e._a[U] = 0)),
      (e._d = (e._useUTC ? ut : ws).apply(null, n)),
      (s = e._useUTC ? e._d.getUTCDay() : e._d.getDay()),
      e._tzm != null && e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm),
      e._nextDay && (e._a[U] = 24),
      e._w &&
        typeof e._w.d < "u" &&
        e._w.d !== s &&
        (w(e).weekdayMismatch = !0);
  }
}
function _i(e) {
  var t, r, n, a, s, i, o, l, c;
  (t = e._w),
    t.GG != null || t.W != null || t.E != null
      ? ((s = 1),
        (i = 4),
        (r = Ue(t.GG, e._a[B], ct(Y(), 1, 4).year)),
        (n = Ue(t.W, 1)),
        (a = Ue(t.E, 1)),
        (a < 1 || a > 7) && (l = !0))
      : ((s = e._locale._week.dow),
        (i = e._locale._week.doy),
        (c = ct(Y(), s, i)),
        (r = Ue(t.gg, e._a[B], c.year)),
        (n = Ue(t.w, c.week)),
        t.d != null
          ? ((a = t.d), (a < 0 || a > 6) && (l = !0))
          : t.e != null
          ? ((a = t.e + s), (t.e < 0 || t.e > 6) && (l = !0))
          : (a = s)),
    n < 1 || n > ye(r, s, i)
      ? (w(e)._overflowWeeks = !0)
      : l != null
      ? (w(e)._overflowWeekday = !0)
      : ((o = bn(r, n, a, s, i)),
        (e._a[B] = o.year),
        (e._dayOfYear = o.dayOfYear));
}
d.ISO_8601 = function () {};
d.RFC_2822 = function () {};
function xr(e) {
  if (e._f === d.ISO_8601) {
    Mn(e);
    return;
  }
  if (e._f === d.RFC_2822) {
    Dn(e);
    return;
  }
  (e._a = []), (w(e).empty = !0);
  var t = "" + e._i,
    r,
    n,
    a,
    s,
    i,
    o = t.length,
    l = 0,
    c,
    f;
  for (a = un(e._f, e._locale).match(yr) || [], f = a.length, r = 0; r < f; r++)
    (s = a[r]),
      (n = (t.match(ts(s, e)) || [])[0]),
      n &&
        ((i = t.substr(0, t.indexOf(n))),
        i.length > 0 && w(e).unusedInput.push(i),
        (t = t.slice(t.indexOf(n) + n.length)),
        (l += n.length)),
      Ve[s]
        ? (n ? (w(e).empty = !1) : w(e).unusedTokens.push(s), ns(s, n, e))
        : e._strict && !n && w(e).unusedTokens.push(s);
  (w(e).charsLeftOver = o - l),
    t.length > 0 && w(e).unusedInput.push(t),
    e._a[U] <= 12 &&
      w(e).bigHour === !0 &&
      e._a[U] > 0 &&
      (w(e).bigHour = void 0),
    (w(e).parsedDateParts = e._a.slice(0)),
    (w(e).meridiem = e._meridiem),
    (e._a[U] = mi(e._locale, e._a[U], e._meridiem)),
    (c = w(e).era),
    c !== null && (e._a[B] = e._locale.erasConvertYear(c, e._a[B])),
    Cr(e),
    Er(e);
}
function mi(e, t, r) {
  var n;
  return r == null
    ? t
    : e.meridiemHour != null
    ? e.meridiemHour(t, r)
    : (e.isPM != null &&
        ((n = e.isPM(r)), n && t < 12 && (t += 12), !n && t === 12 && (t = 0)),
      t);
}
function pi(e) {
  var t,
    r,
    n,
    a,
    s,
    i,
    o = !1,
    l = e._f.length;
  if (l === 0) {
    (w(e).invalidFormat = !0), (e._d = new Date(NaN));
    return;
  }
  for (a = 0; a < l; a++)
    (s = 0),
      (i = !1),
      (t = pr({}, e)),
      e._useUTC != null && (t._useUTC = e._useUTC),
      (t._f = e._f[a]),
      xr(t),
      mr(t) && (i = !0),
      (s += w(t).charsLeftOver),
      (s += w(t).unusedTokens.length * 10),
      (w(t).score = s),
      o
        ? s < n && ((n = s), (r = t))
        : (n == null || s < n || i) && ((n = s), (r = t), i && (o = !0));
  Oe(e, r || t);
}
function gi(e) {
  if (!e._d) {
    var t = vr(e._i),
      r = t.day === void 0 ? t.date : t.day;
    (e._a = sn(
      [t.year, t.month, r, t.hour, t.minute, t.second, t.millisecond],
      function (n) {
        return n && parseInt(n, 10);
      }
    )),
      Cr(e);
  }
}
function yi(e) {
  var t = new mt(Er(En(e)));
  return t._nextDay && (t.add(1, "d"), (t._nextDay = void 0)), t;
}
function En(e) {
  var t = e._i,
    r = e._f;
  return (
    (e._locale = e._locale || we(e._l)),
    t === null || (r === void 0 && t === "")
      ? Nt({ nullInput: !0 })
      : (typeof t == "string" && (e._i = t = e._locale.preparse(t)),
        se(t)
          ? new mt(Er(t))
          : (_t(t) ? (e._d = t) : ae(r) ? pi(e) : r ? xr(e) : vi(e),
            mr(e) || (e._d = null),
            e))
  );
}
function vi(e) {
  var t = e._i;
  $(t)
    ? (e._d = new Date(d.now()))
    : _t(t)
    ? (e._d = new Date(t.valueOf()))
    : typeof t == "string"
    ? fi(e)
    : ae(t)
    ? ((e._a = sn(t.slice(0), function (r) {
        return parseInt(r, 10);
      })),
      Cr(e))
    : Ye(t)
    ? gi(e)
    : ve(t)
    ? (e._d = new Date(t))
    : d.createFromInputFallback(e);
}
function Cn(e, t, r, n, a) {
  var s = {};
  return (
    (t === !0 || t === !1) && ((n = t), (t = void 0)),
    (r === !0 || r === !1) && ((n = r), (r = void 0)),
    ((Ye(e) && _r(e)) || (ae(e) && e.length === 0)) && (e = void 0),
    (s._isAMomentObject = !0),
    (s._useUTC = s._isUTC = a),
    (s._l = r),
    (s._i = e),
    (s._f = t),
    (s._strict = n),
    yi(s)
  );
}
function Y(e, t, r, n) {
  return Cn(e, t, r, n, !1);
}
var wi = Q(
    "moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/",
    function () {
      var e = Y.apply(null, arguments);
      return this.isValid() && e.isValid() ? (e < this ? this : e) : Nt();
    }
  ),
  bi = Q(
    "moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/",
    function () {
      var e = Y.apply(null, arguments);
      return this.isValid() && e.isValid() ? (e > this ? this : e) : Nt();
    }
  );
function xn(e, t) {
  var r, n;
  if ((t.length === 1 && ae(t[0]) && (t = t[0]), !t.length)) return Y();
  for (r = t[0], n = 1; n < t.length; ++n)
    (!t[n].isValid() || t[n][e](r)) && (r = t[n]);
  return r;
}
function ki() {
  var e = [].slice.call(arguments, 0);
  return xn("isBefore", e);
}
function Si() {
  var e = [].slice.call(arguments, 0);
  return xn("isAfter", e);
}
var Oi = function () {
    return Date.now ? Date.now() : +new Date();
  },
  rt = [
    "year",
    "quarter",
    "month",
    "week",
    "day",
    "hour",
    "minute",
    "second",
    "millisecond",
  ];
function Ti(e) {
  var t,
    r = !1,
    n,
    a = rt.length;
  for (t in e)
    if (M(e, t) && !(P.call(rt, t) !== -1 && (e[t] == null || !isNaN(e[t]))))
      return !1;
  for (n = 0; n < a; ++n)
    if (e[rt[n]]) {
      if (r) return !1;
      parseFloat(e[rt[n]]) !== S(e[rt[n]]) && (r = !0);
    }
  return !0;
}
function Mi() {
  return this._isValid;
}
function Di() {
  return ie(NaN);
}
function Wt(e) {
  var t = vr(e),
    r = t.year || 0,
    n = t.quarter || 0,
    a = t.month || 0,
    s = t.week || t.isoWeek || 0,
    i = t.day || 0,
    o = t.hour || 0,
    l = t.minute || 0,
    c = t.second || 0,
    f = t.millisecond || 0;
  (this._isValid = Ti(t)),
    (this._milliseconds = +f + c * 1e3 + l * 6e4 + o * 1e3 * 60 * 60),
    (this._days = +i + s * 7),
    (this._months = +a + n * 3 + r * 12),
    (this._data = {}),
    (this._locale = we()),
    this._bubble();
}
function St(e) {
  return e instanceof Wt;
}
function nr(e) {
  return e < 0 ? Math.round(-1 * e) * -1 : Math.round(e);
}
function Ei(e, t, r) {
  var n = Math.min(e.length, t.length),
    a = Math.abs(e.length - t.length),
    s = 0,
    i;
  for (i = 0; i < n; i++) S(e[i]) !== S(t[i]) && s++;
  return s + a;
}
function Nn(e, t) {
  p(e, 0, 0, function () {
    var r = this.utcOffset(),
      n = "+";
    return (
      r < 0 && ((r = -r), (n = "-")),
      n + ue(~~(r / 60), 2) + t + ue(~~r % 60, 2)
    );
  });
}
Nn("Z", ":");
Nn("ZZ", "");
h("Z", Pt);
h("ZZ", Pt);
x(["Z", "ZZ"], function (e, t, r) {
  (r._useUTC = !0), (r._tzm = Nr(Pt, e));
});
var Ci = /([\+\-]|\d\d)/gi;
function Nr(e, t) {
  var r = (t || "").match(e),
    n,
    a,
    s;
  return r === null
    ? null
    : ((n = r[r.length - 1] || []),
      (a = (n + "").match(Ci) || ["-", 0, 0]),
      (s = +(a[1] * 60) + S(a[2])),
      s === 0 ? 0 : a[0] === "+" ? s : -s);
}
function Yr(e, t) {
  var r, n;
  return t._isUTC
    ? ((r = t.clone()),
      (n = (se(e) || _t(e) ? e.valueOf() : Y(e).valueOf()) - r.valueOf()),
      r._d.setTime(r._d.valueOf() + n),
      d.updateOffset(r, !1),
      r)
    : Y(e).local();
}
function ar(e) {
  return -Math.round(e._d.getTimezoneOffset());
}
d.updateOffset = function () {};
function xi(e, t, r) {
  var n = this._offset || 0,
    a;
  if (!this.isValid()) return e != null ? this : NaN;
  if (e != null) {
    if (typeof e == "string") {
      if (((e = Nr(Pt, e)), e === null)) return this;
    } else Math.abs(e) < 16 && !r && (e = e * 60);
    return (
      !this._isUTC && t && (a = ar(this)),
      (this._offset = e),
      (this._isUTC = !0),
      a != null && this.add(a, "m"),
      n !== e &&
        (!t || this._changeInProgress
          ? In(this, ie(e - n, "m"), 1, !1)
          : this._changeInProgress ||
            ((this._changeInProgress = !0),
            d.updateOffset(this, !0),
            (this._changeInProgress = null))),
      this
    );
  } else return this._isUTC ? n : ar(this);
}
function Ni(e, t) {
  return e != null
    ? (typeof e != "string" && (e = -e), this.utcOffset(e, t), this)
    : -this.utcOffset();
}
function Yi(e) {
  return this.utcOffset(0, e);
}
function Ri(e) {
  return (
    this._isUTC &&
      (this.utcOffset(0, e),
      (this._isUTC = !1),
      e && this.subtract(ar(this), "m")),
    this
  );
}
function Ii() {
  if (this._tzm != null) this.utcOffset(this._tzm, !1, !0);
  else if (typeof this._i == "string") {
    var e = Nr(Qa, this._i);
    e != null ? this.utcOffset(e) : this.utcOffset(0, !0);
  }
  return this;
}
function Ai(e) {
  return this.isValid()
    ? ((e = e ? Y(e).utcOffset() : 0), (this.utcOffset() - e) % 60 === 0)
    : !1;
}
function Pi() {
  return (
    this.utcOffset() > this.clone().month(0).utcOffset() ||
    this.utcOffset() > this.clone().month(5).utcOffset()
  );
}
function Fi() {
  if (!$(this._isDSTShifted)) return this._isDSTShifted;
  var e = {},
    t;
  return (
    pr(e, this),
    (e = En(e)),
    e._a
      ? ((t = e._isUTC ? ce(e._a) : Y(e._a)),
        (this._isDSTShifted = this.isValid() && Ei(e._a, t.toArray()) > 0))
      : (this._isDSTShifted = !1),
    this._isDSTShifted
  );
}
function Li() {
  return this.isValid() ? !this._isUTC : !1;
}
function Wi() {
  return this.isValid() ? this._isUTC : !1;
}
function Yn() {
  return this.isValid() ? this._isUTC && this._offset === 0 : !1;
}
var Ui = /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/,
  Hi =
    /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
function ie(e, t) {
  var r = e,
    n = null,
    a,
    s,
    i;
  return (
    St(e)
      ? (r = { ms: e._milliseconds, d: e._days, M: e._months })
      : ve(e) || !isNaN(+e)
      ? ((r = {}), t ? (r[t] = +e) : (r.milliseconds = +e))
      : (n = Ui.exec(e))
      ? ((a = n[1] === "-" ? -1 : 1),
        (r = {
          y: 0,
          d: S(n[le]) * a,
          h: S(n[U]) * a,
          m: S(n[re]) * a,
          s: S(n[pe]) * a,
          ms: S(nr(n[Ne] * 1e3)) * a,
        }))
      : (n = Hi.exec(e))
      ? ((a = n[1] === "-" ? -1 : 1),
        (r = {
          y: Ee(n[2], a),
          M: Ee(n[3], a),
          w: Ee(n[4], a),
          d: Ee(n[5], a),
          h: Ee(n[6], a),
          m: Ee(n[7], a),
          s: Ee(n[8], a),
        }))
      : r == null
      ? (r = {})
      : typeof r == "object" &&
        ("from" in r || "to" in r) &&
        ((i = ji(Y(r.from), Y(r.to))),
        (r = {}),
        (r.ms = i.milliseconds),
        (r.M = i.months)),
    (s = new Wt(r)),
    St(e) && M(e, "_locale") && (s._locale = e._locale),
    St(e) && M(e, "_isValid") && (s._isValid = e._isValid),
    s
  );
}
ie.fn = Wt.prototype;
ie.invalid = Di;
function Ee(e, t) {
  var r = e && parseFloat(e.replace(",", "."));
  return (isNaN(r) ? 0 : r) * t;
}
function zr(e, t) {
  var r = {};
  return (
    (r.months = t.month() - e.month() + (t.year() - e.year()) * 12),
    e.clone().add(r.months, "M").isAfter(t) && --r.months,
    (r.milliseconds = +t - +e.clone().add(r.months, "M")),
    r
  );
}
function ji(e, t) {
  var r;
  return e.isValid() && t.isValid()
    ? ((t = Yr(t, e)),
      e.isBefore(t)
        ? (r = zr(e, t))
        : ((r = zr(t, e)),
          (r.milliseconds = -r.milliseconds),
          (r.months = -r.months)),
      r)
    : { milliseconds: 0, months: 0 };
}
function Rn(e, t) {
  return function (r, n) {
    var a, s;
    return (
      n !== null &&
        !isNaN(+n) &&
        (ln(
          t,
          "moment()." +
            t +
            "(period, number) is deprecated. Please use moment()." +
            t +
            "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."
        ),
        (s = r),
        (r = n),
        (n = s)),
      (a = ie(r, n)),
      In(this, a, e),
      this
    );
  };
}
function In(e, t, r, n) {
  var a = t._milliseconds,
    s = nr(t._days),
    i = nr(t._months);
  e.isValid() &&
    ((n = n ?? !0),
    i && yn(e, lt(e, "Month") + i * r),
    s && mn(e, "Date", lt(e, "Date") + s * r),
    a && e._d.setTime(e._d.valueOf() + a * r),
    n && d.updateOffset(e, s || i));
}
var Bi = Rn(1, "add"),
  Gi = Rn(-1, "subtract");
function An(e) {
  return typeof e == "string" || e instanceof String;
}
function Vi(e) {
  return (
    se(e) ||
    _t(e) ||
    An(e) ||
    ve(e) ||
    zi(e) ||
    $i(e) ||
    e === null ||
    e === void 0
  );
}
function $i(e) {
  var t = Ye(e) && !_r(e),
    r = !1,
    n = [
      "years",
      "year",
      "y",
      "months",
      "month",
      "M",
      "days",
      "day",
      "d",
      "dates",
      "date",
      "D",
      "hours",
      "hour",
      "h",
      "minutes",
      "minute",
      "m",
      "seconds",
      "second",
      "s",
      "milliseconds",
      "millisecond",
      "ms",
    ],
    a,
    s,
    i = n.length;
  for (a = 0; a < i; a += 1) (s = n[a]), (r = r || M(e, s));
  return t && r;
}
function zi(e) {
  var t = ae(e),
    r = !1;
  return (
    t &&
      (r =
        e.filter(function (n) {
          return !ve(n) && An(e);
        }).length === 0),
    t && r
  );
}
function Ki(e) {
  var t = Ye(e) && !_r(e),
    r = !1,
    n = ["sameDay", "nextDay", "lastDay", "nextWeek", "lastWeek", "sameElse"],
    a,
    s;
  for (a = 0; a < n.length; a += 1) (s = n[a]), (r = r || M(e, s));
  return t && r;
}
function qi(e, t) {
  var r = e.diff(t, "days", !0);
  return r < -6
    ? "sameElse"
    : r < -1
    ? "lastWeek"
    : r < 0
    ? "lastDay"
    : r < 1
    ? "sameDay"
    : r < 2
    ? "nextDay"
    : r < 7
    ? "nextWeek"
    : "sameElse";
}
function Zi(e, t) {
  arguments.length === 1 &&
    (arguments[0]
      ? Vi(arguments[0])
        ? ((e = arguments[0]), (t = void 0))
        : Ki(arguments[0]) && ((t = arguments[0]), (e = void 0))
      : ((e = void 0), (t = void 0)));
  var r = e || Y(),
    n = Yr(r, this).startOf("day"),
    a = d.calendarFormat(this, n) || "sameElse",
    s = t && (de(t[a]) ? t[a].call(this, r) : t[a]);
  return this.format(s || this.localeData().calendar(a, this, Y(r)));
}
function Ji() {
  return new mt(this);
}
function Xi(e, t) {
  var r = se(e) ? e : Y(e);
  return this.isValid() && r.isValid()
    ? ((t = ee(t) || "millisecond"),
      t === "millisecond"
        ? this.valueOf() > r.valueOf()
        : r.valueOf() < this.clone().startOf(t).valueOf())
    : !1;
}
function Qi(e, t) {
  var r = se(e) ? e : Y(e);
  return this.isValid() && r.isValid()
    ? ((t = ee(t) || "millisecond"),
      t === "millisecond"
        ? this.valueOf() < r.valueOf()
        : this.clone().endOf(t).valueOf() < r.valueOf())
    : !1;
}
function eo(e, t, r, n) {
  var a = se(e) ? e : Y(e),
    s = se(t) ? t : Y(t);
  return this.isValid() && a.isValid() && s.isValid()
    ? ((n = n || "()"),
      (n[0] === "(" ? this.isAfter(a, r) : !this.isBefore(a, r)) &&
        (n[1] === ")" ? this.isBefore(s, r) : !this.isAfter(s, r)))
    : !1;
}
function to(e, t) {
  var r = se(e) ? e : Y(e),
    n;
  return this.isValid() && r.isValid()
    ? ((t = ee(t) || "millisecond"),
      t === "millisecond"
        ? this.valueOf() === r.valueOf()
        : ((n = r.valueOf()),
          this.clone().startOf(t).valueOf() <= n &&
            n <= this.clone().endOf(t).valueOf()))
    : !1;
}
function ro(e, t) {
  return this.isSame(e, t) || this.isAfter(e, t);
}
function no(e, t) {
  return this.isSame(e, t) || this.isBefore(e, t);
}
function ao(e, t, r) {
  var n, a, s;
  if (!this.isValid()) return NaN;
  if (((n = Yr(e, this)), !n.isValid())) return NaN;
  switch (((a = (n.utcOffset() - this.utcOffset()) * 6e4), (t = ee(t)), t)) {
    case "year":
      s = Ot(this, n) / 12;
      break;
    case "month":
      s = Ot(this, n);
      break;
    case "quarter":
      s = Ot(this, n) / 3;
      break;
    case "second":
      s = (this - n) / 1e3;
      break;
    case "minute":
      s = (this - n) / 6e4;
      break;
    case "hour":
      s = (this - n) / 36e5;
      break;
    case "day":
      s = (this - n - a) / 864e5;
      break;
    case "week":
      s = (this - n - a) / 6048e5;
      break;
    default:
      s = this - n;
  }
  return r ? s : X(s);
}
function Ot(e, t) {
  if (e.date() < t.date()) return -Ot(t, e);
  var r = (t.year() - e.year()) * 12 + (t.month() - e.month()),
    n = e.clone().add(r, "months"),
    a,
    s;
  return (
    t - n < 0
      ? ((a = e.clone().add(r - 1, "months")), (s = (t - n) / (n - a)))
      : ((a = e.clone().add(r + 1, "months")), (s = (t - n) / (a - n))),
    -(r + s) || 0
  );
}
d.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";
d.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
function so() {
  return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
}
function io(e) {
  if (!this.isValid()) return null;
  var t = e !== !0,
    r = t ? this.clone().utc() : this;
  return r.year() < 0 || r.year() > 9999
    ? kt(
        r,
        t ? "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYYYY-MM-DD[T]HH:mm:ss.SSSZ"
      )
    : de(Date.prototype.toISOString)
    ? t
      ? this.toDate().toISOString()
      : new Date(this.valueOf() + this.utcOffset() * 60 * 1e3)
          .toISOString()
          .replace("Z", kt(r, "Z"))
    : kt(r, t ? "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYY-MM-DD[T]HH:mm:ss.SSSZ");
}
function oo() {
  if (!this.isValid()) return "moment.invalid(/* " + this._i + " */)";
  var e = "moment",
    t = "",
    r,
    n,
    a,
    s;
  return (
    this.isLocal() ||
      ((e = this.utcOffset() === 0 ? "moment.utc" : "moment.parseZone"),
      (t = "Z")),
    (r = "[" + e + '("]'),
    (n = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY"),
    (a = "-MM-DD[T]HH:mm:ss.SSS"),
    (s = t + '[")]'),
    this.format(r + n + a + s)
  );
}
function lo(e) {
  e || (e = this.isUtc() ? d.defaultFormatUtc : d.defaultFormat);
  var t = kt(this, e);
  return this.localeData().postformat(t);
}
function uo(e, t) {
  return this.isValid() && ((se(e) && e.isValid()) || Y(e).isValid())
    ? ie({ to: this, from: e }).locale(this.locale()).humanize(!t)
    : this.localeData().invalidDate();
}
function co(e) {
  return this.from(Y(), e);
}
function fo(e, t) {
  return this.isValid() && ((se(e) && e.isValid()) || Y(e).isValid())
    ? ie({ from: this, to: e }).locale(this.locale()).humanize(!t)
    : this.localeData().invalidDate();
}
function ho(e) {
  return this.to(Y(), e);
}
function Pn(e) {
  var t;
  return e === void 0
    ? this._locale._abbr
    : ((t = we(e)), t != null && (this._locale = t), this);
}
var Fn = Q(
  "moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",
  function (e) {
    return e === void 0 ? this.localeData() : this.locale(e);
  }
);
function Ln() {
  return this._locale;
}
var Et = 1e3,
  $e = 60 * Et,
  Ct = 60 * $e,
  Wn = (365 * 400 + 97) * 24 * Ct;
function ze(e, t) {
  return ((e % t) + t) % t;
}
function Un(e, t, r) {
  return e < 100 && e >= 0
    ? new Date(e + 400, t, r) - Wn
    : new Date(e, t, r).valueOf();
}
function Hn(e, t, r) {
  return e < 100 && e >= 0 ? Date.UTC(e + 400, t, r) - Wn : Date.UTC(e, t, r);
}
function _o(e) {
  var t, r;
  if (((e = ee(e)), e === void 0 || e === "millisecond" || !this.isValid()))
    return this;
  switch (((r = this._isUTC ? Hn : Un), e)) {
    case "year":
      t = r(this.year(), 0, 1);
      break;
    case "quarter":
      t = r(this.year(), this.month() - (this.month() % 3), 1);
      break;
    case "month":
      t = r(this.year(), this.month(), 1);
      break;
    case "week":
      t = r(this.year(), this.month(), this.date() - this.weekday());
      break;
    case "isoWeek":
      t = r(this.year(), this.month(), this.date() - (this.isoWeekday() - 1));
      break;
    case "day":
    case "date":
      t = r(this.year(), this.month(), this.date());
      break;
    case "hour":
      (t = this._d.valueOf()),
        (t -= ze(t + (this._isUTC ? 0 : this.utcOffset() * $e), Ct));
      break;
    case "minute":
      (t = this._d.valueOf()), (t -= ze(t, $e));
      break;
    case "second":
      (t = this._d.valueOf()), (t -= ze(t, Et));
      break;
  }
  return this._d.setTime(t), d.updateOffset(this, !0), this;
}
function mo(e) {
  var t, r;
  if (((e = ee(e)), e === void 0 || e === "millisecond" || !this.isValid()))
    return this;
  switch (((r = this._isUTC ? Hn : Un), e)) {
    case "year":
      t = r(this.year() + 1, 0, 1) - 1;
      break;
    case "quarter":
      t = r(this.year(), this.month() - (this.month() % 3) + 3, 1) - 1;
      break;
    case "month":
      t = r(this.year(), this.month() + 1, 1) - 1;
      break;
    case "week":
      t = r(this.year(), this.month(), this.date() - this.weekday() + 7) - 1;
      break;
    case "isoWeek":
      t =
        r(
          this.year(),
          this.month(),
          this.date() - (this.isoWeekday() - 1) + 7
        ) - 1;
      break;
    case "day":
    case "date":
      t = r(this.year(), this.month(), this.date() + 1) - 1;
      break;
    case "hour":
      (t = this._d.valueOf()),
        (t += Ct - ze(t + (this._isUTC ? 0 : this.utcOffset() * $e), Ct) - 1);
      break;
    case "minute":
      (t = this._d.valueOf()), (t += $e - ze(t, $e) - 1);
      break;
    case "second":
      (t = this._d.valueOf()), (t += Et - ze(t, Et) - 1);
      break;
  }
  return this._d.setTime(t), d.updateOffset(this, !0), this;
}
function po() {
  return this._d.valueOf() - (this._offset || 0) * 6e4;
}
function go() {
  return Math.floor(this.valueOf() / 1e3);
}
function yo() {
  return new Date(this.valueOf());
}
function vo() {
  var e = this;
  return [
    e.year(),
    e.month(),
    e.date(),
    e.hour(),
    e.minute(),
    e.second(),
    e.millisecond(),
  ];
}
function wo() {
  var e = this;
  return {
    years: e.year(),
    months: e.month(),
    date: e.date(),
    hours: e.hours(),
    minutes: e.minutes(),
    seconds: e.seconds(),
    milliseconds: e.milliseconds(),
  };
}
function bo() {
  return this.isValid() ? this.toISOString() : null;
}
function ko() {
  return mr(this);
}
function So() {
  return Oe({}, w(this));
}
function Oo() {
  return w(this).overflow;
}
function To() {
  return {
    input: this._i,
    format: this._f,
    locale: this._locale,
    isUTC: this._isUTC,
    strict: this._strict,
  };
}
p("N", 0, 0, "eraAbbr");
p("NN", 0, 0, "eraAbbr");
p("NNN", 0, 0, "eraAbbr");
p("NNNN", 0, 0, "eraName");
p("NNNNN", 0, 0, "eraNarrow");
p("y", ["y", 1], "yo", "eraYear");
p("y", ["yy", 2], 0, "eraYear");
p("y", ["yyy", 3], 0, "eraYear");
p("y", ["yyyy", 4], 0, "eraYear");
h("N", Rr);
h("NN", Rr);
h("NNN", Rr);
h("NNNN", Po);
h("NNNNN", Fo);
x(["N", "NN", "NNN", "NNNN", "NNNNN"], function (e, t, r, n) {
  var a = r._locale.erasParse(e, n, r._strict);
  a ? (w(r).era = a) : (w(r).invalidEra = e);
});
h("y", qe);
h("yy", qe);
h("yyy", qe);
h("yyyy", qe);
h("yo", Lo);
x(["y", "yy", "yyy", "yyyy"], B);
x(["yo"], function (e, t, r, n) {
  var a;
  r._locale._eraYearOrdinalRegex &&
    (a = e.match(r._locale._eraYearOrdinalRegex)),
    r._locale.eraYearOrdinalParse
      ? (t[B] = r._locale.eraYearOrdinalParse(e, a))
      : (t[B] = parseInt(e, 10));
});
function Mo(e, t) {
  var r,
    n,
    a,
    s = this._eras || we("en")._eras;
  for (r = 0, n = s.length; r < n; ++r) {
    switch (typeof s[r].since) {
      case "string":
        (a = d(s[r].since).startOf("day")), (s[r].since = a.valueOf());
        break;
    }
    switch (typeof s[r].until) {
      case "undefined":
        s[r].until = 1 / 0;
        break;
      case "string":
        (a = d(s[r].until).startOf("day").valueOf()),
          (s[r].until = a.valueOf());
        break;
    }
  }
  return s;
}
function Do(e, t, r) {
  var n,
    a,
    s = this.eras(),
    i,
    o,
    l;
  for (e = e.toUpperCase(), n = 0, a = s.length; n < a; ++n)
    if (
      ((i = s[n].name.toUpperCase()),
      (o = s[n].abbr.toUpperCase()),
      (l = s[n].narrow.toUpperCase()),
      r)
    )
      switch (t) {
        case "N":
        case "NN":
        case "NNN":
          if (o === e) return s[n];
          break;
        case "NNNN":
          if (i === e) return s[n];
          break;
        case "NNNNN":
          if (l === e) return s[n];
          break;
      }
    else if ([i, o, l].indexOf(e) >= 0) return s[n];
}
function Eo(e, t) {
  var r = e.since <= e.until ? 1 : -1;
  return t === void 0
    ? d(e.since).year()
    : d(e.since).year() + (t - e.offset) * r;
}
function Co() {
  var e,
    t,
    r,
    n = this.localeData().eras();
  for (e = 0, t = n.length; e < t; ++e)
    if (
      ((r = this.clone().startOf("day").valueOf()),
      (n[e].since <= r && r <= n[e].until) ||
        (n[e].until <= r && r <= n[e].since))
    )
      return n[e].name;
  return "";
}
function xo() {
  var e,
    t,
    r,
    n = this.localeData().eras();
  for (e = 0, t = n.length; e < t; ++e)
    if (
      ((r = this.clone().startOf("day").valueOf()),
      (n[e].since <= r && r <= n[e].until) ||
        (n[e].until <= r && r <= n[e].since))
    )
      return n[e].narrow;
  return "";
}
function No() {
  var e,
    t,
    r,
    n = this.localeData().eras();
  for (e = 0, t = n.length; e < t; ++e)
    if (
      ((r = this.clone().startOf("day").valueOf()),
      (n[e].since <= r && r <= n[e].until) ||
        (n[e].until <= r && r <= n[e].since))
    )
      return n[e].abbr;
  return "";
}
function Yo() {
  var e,
    t,
    r,
    n,
    a = this.localeData().eras();
  for (e = 0, t = a.length; e < t; ++e)
    if (
      ((r = a[e].since <= a[e].until ? 1 : -1),
      (n = this.clone().startOf("day").valueOf()),
      (a[e].since <= n && n <= a[e].until) ||
        (a[e].until <= n && n <= a[e].since))
    )
      return (this.year() - d(a[e].since).year()) * r + a[e].offset;
  return this.year();
}
function Ro(e) {
  return (
    M(this, "_erasNameRegex") || Ir.call(this),
    e ? this._erasNameRegex : this._erasRegex
  );
}
function Io(e) {
  return (
    M(this, "_erasAbbrRegex") || Ir.call(this),
    e ? this._erasAbbrRegex : this._erasRegex
  );
}
function Ao(e) {
  return (
    M(this, "_erasNarrowRegex") || Ir.call(this),
    e ? this._erasNarrowRegex : this._erasRegex
  );
}
function Rr(e, t) {
  return t.erasAbbrRegex(e);
}
function Po(e, t) {
  return t.erasNameRegex(e);
}
function Fo(e, t) {
  return t.erasNarrowRegex(e);
}
function Lo(e, t) {
  return t._eraYearOrdinalRegex || qe;
}
function Ir() {
  var e = [],
    t = [],
    r = [],
    n = [],
    a,
    s,
    i,
    o,
    l,
    c = this.eras();
  for (a = 0, s = c.length; a < s; ++a)
    (i = ge(c[a].name)),
      (o = ge(c[a].abbr)),
      (l = ge(c[a].narrow)),
      t.push(i),
      e.push(o),
      r.push(l),
      n.push(i),
      n.push(o),
      n.push(l);
  (this._erasRegex = new RegExp("^(" + n.join("|") + ")", "i")),
    (this._erasNameRegex = new RegExp("^(" + t.join("|") + ")", "i")),
    (this._erasAbbrRegex = new RegExp("^(" + e.join("|") + ")", "i")),
    (this._erasNarrowRegex = new RegExp("^(" + r.join("|") + ")", "i"));
}
p(0, ["gg", 2], 0, function () {
  return this.weekYear() % 100;
});
p(0, ["GG", 2], 0, function () {
  return this.isoWeekYear() % 100;
});
function Ut(e, t) {
  p(0, [e, e.length], 0, t);
}
Ut("gggg", "weekYear");
Ut("ggggg", "weekYear");
Ut("GGGG", "isoWeekYear");
Ut("GGGGG", "isoWeekYear");
h("G", At);
h("g", At);
h("GG", R, Z);
h("gg", R, Z);
h("GGGG", br, wr);
h("gggg", br, wr);
h("GGGGG", It, Yt);
h("ggggg", It, Yt);
gt(["gggg", "ggggg", "GGGG", "GGGGG"], function (e, t, r, n) {
  t[n.substr(0, 2)] = S(e);
});
gt(["gg", "GG"], function (e, t, r, n) {
  t[n] = d.parseTwoDigitYear(e);
});
function Wo(e) {
  return jn.call(
    this,
    e,
    this.week(),
    this.weekday() + this.localeData()._week.dow,
    this.localeData()._week.dow,
    this.localeData()._week.doy
  );
}
function Uo(e) {
  return jn.call(this, e, this.isoWeek(), this.isoWeekday(), 1, 4);
}
function Ho() {
  return ye(this.year(), 1, 4);
}
function jo() {
  return ye(this.isoWeekYear(), 1, 4);
}
function Bo() {
  var e = this.localeData()._week;
  return ye(this.year(), e.dow, e.doy);
}
function Go() {
  var e = this.localeData()._week;
  return ye(this.weekYear(), e.dow, e.doy);
}
function jn(e, t, r, n, a) {
  var s;
  return e == null
    ? ct(this, n, a).year
    : ((s = ye(e, n, a)), t > s && (t = s), Vo.call(this, e, t, r, n, a));
}
function Vo(e, t, r, n, a) {
  var s = bn(e, t, r, n, a),
    i = ut(s.year, 0, s.dayOfYear);
  return (
    this.year(i.getUTCFullYear()),
    this.month(i.getUTCMonth()),
    this.date(i.getUTCDate()),
    this
  );
}
p("Q", 0, "Qo", "quarter");
h("Q", cn);
x("Q", function (e, t) {
  t[me] = (S(e) - 1) * 3;
});
function $o(e) {
  return e == null
    ? Math.ceil((this.month() + 1) / 3)
    : this.month((e - 1) * 3 + (this.month() % 3));
}
p("D", ["DD", 2], "Do", "date");
h("D", R, Ze);
h("DD", R, Z);
h("Do", function (e, t) {
  return e
    ? t._dayOfMonthOrdinalParse || t._ordinalParse
    : t._dayOfMonthOrdinalParseLenient;
});
x(["D", "DD"], le);
x("Do", function (e, t) {
  t[le] = S(e.match(R)[0]);
});
var Bn = Je("Date", !0);
p("DDD", ["DDDD", 3], "DDDo", "dayOfYear");
h("DDD", Rt);
h("DDDD", dn);
x(["DDD", "DDDD"], function (e, t, r) {
  r._dayOfYear = S(e);
});
function zo(e) {
  var t =
    Math.round(
      (this.clone().startOf("day") - this.clone().startOf("year")) / 864e5
    ) + 1;
  return e == null ? t : this.add(e - t, "d");
}
p("m", ["mm", 2], 0, "minute");
h("m", R, kr);
h("mm", R, Z);
x(["m", "mm"], re);
var Ko = Je("Minutes", !1);
p("s", ["ss", 2], 0, "second");
h("s", R, kr);
h("ss", R, Z);
x(["s", "ss"], pe);
var qo = Je("Seconds", !1);
p("S", 0, 0, function () {
  return ~~(this.millisecond() / 100);
});
p(0, ["SS", 2], 0, function () {
  return ~~(this.millisecond() / 10);
});
p(0, ["SSS", 3], 0, "millisecond");
p(0, ["SSSS", 4], 0, function () {
  return this.millisecond() * 10;
});
p(0, ["SSSSS", 5], 0, function () {
  return this.millisecond() * 100;
});
p(0, ["SSSSSS", 6], 0, function () {
  return this.millisecond() * 1e3;
});
p(0, ["SSSSSSS", 7], 0, function () {
  return this.millisecond() * 1e4;
});
p(0, ["SSSSSSSS", 8], 0, function () {
  return this.millisecond() * 1e5;
});
p(0, ["SSSSSSSSS", 9], 0, function () {
  return this.millisecond() * 1e6;
});
h("S", Rt, cn);
h("SS", Rt, Z);
h("SSS", Rt, dn);
var Te, Gn;
for (Te = "SSSS"; Te.length <= 9; Te += "S") h(Te, qe);
function Zo(e, t) {
  t[Ne] = S(("0." + e) * 1e3);
}
for (Te = "S"; Te.length <= 9; Te += "S") x(Te, Zo);
Gn = Je("Milliseconds", !1);
p("z", 0, 0, "zoneAbbr");
p("zz", 0, 0, "zoneName");
function Jo() {
  return this._isUTC ? "UTC" : "";
}
function Xo() {
  return this._isUTC ? "Coordinated Universal Time" : "";
}
var u = mt.prototype;
u.add = Bi;
u.calendar = Zi;
u.clone = Ji;
u.diff = ao;
u.endOf = mo;
u.format = lo;
u.from = uo;
u.fromNow = co;
u.to = fo;
u.toNow = ho;
u.get = os;
u.invalidAt = Oo;
u.isAfter = Xi;
u.isBefore = Qi;
u.isBetween = eo;
u.isSame = to;
u.isSameOrAfter = ro;
u.isSameOrBefore = no;
u.isValid = ko;
u.lang = Fn;
u.locale = Pn;
u.localeData = Ln;
u.max = bi;
u.min = wi;
u.parsingFlags = So;
u.set = ls;
u.startOf = _o;
u.subtract = Gi;
u.toArray = vo;
u.toObject = wo;
u.toDate = yo;
u.toISOString = io;
u.inspect = oo;
typeof Symbol < "u" &&
  Symbol.for != null &&
  (u[Symbol.for("nodejs.util.inspect.custom")] = function () {
    return "Moment<" + this.format() + ">";
  });
u.toJSON = bo;
u.toString = so;
u.unix = go;
u.valueOf = po;
u.creationData = To;
u.eraName = Co;
u.eraNarrow = xo;
u.eraAbbr = No;
u.eraYear = Yo;
u.year = _n;
u.isLeapYear = is;
u.weekYear = Wo;
u.isoWeekYear = Uo;
u.quarter = u.quarters = $o;
u.month = vn;
u.daysInMonth = gs;
u.week = u.weeks = Ts;
u.isoWeek = u.isoWeeks = Ms;
u.weeksInYear = Bo;
u.weeksInWeekYear = Go;
u.isoWeeksInYear = Ho;
u.isoWeeksInISOWeekYear = jo;
u.date = Bn;
u.day = u.days = Ws;
u.weekday = Us;
u.isoWeekday = Hs;
u.dayOfYear = zo;
u.hour = u.hours = Ks;
u.minute = u.minutes = Ko;
u.second = u.seconds = qo;
u.millisecond = u.milliseconds = Gn;
u.utcOffset = xi;
u.utc = Yi;
u.local = Ri;
u.parseZone = Ii;
u.hasAlignedHourOffset = Ai;
u.isDST = Pi;
u.isLocal = Li;
u.isUtcOffset = Wi;
u.isUtc = Yn;
u.isUTC = Yn;
u.zoneAbbr = Jo;
u.zoneName = Xo;
u.dates = Q("dates accessor is deprecated. Use date instead.", Bn);
u.months = Q("months accessor is deprecated. Use month instead", vn);
u.years = Q("years accessor is deprecated. Use year instead", _n);
u.zone = Q(
  "moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/",
  Ni
);
u.isDSTShifted = Q(
  "isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information",
  Fi
);
function Qo(e) {
  return Y(e * 1e3);
}
function el() {
  return Y.apply(null, arguments).parseZone();
}
function Vn(e) {
  return e;
}
var D = gr.prototype;
D.calendar = La;
D.longDateFormat = ja;
D.invalidDate = Ga;
D.ordinal = za;
D.preparse = Vn;
D.postformat = Vn;
D.relativeTime = qa;
D.pastFuture = Za;
D.set = Pa;
D.eras = Mo;
D.erasParse = Do;
D.erasConvertYear = Eo;
D.erasAbbrRegex = Io;
D.erasNameRegex = Ro;
D.erasNarrowRegex = Ao;
D.months = hs;
D.monthsShort = _s;
D.monthsParse = ps;
D.monthsRegex = vs;
D.monthsShortRegex = ys;
D.week = bs;
D.firstDayOfYear = Os;
D.firstDayOfWeek = Ss;
D.weekdays = Is;
D.weekdaysMin = Ps;
D.weekdaysShort = As;
D.weekdaysParse = Ls;
D.weekdaysRegex = js;
D.weekdaysShortRegex = Bs;
D.weekdaysMinRegex = Gs;
D.isPM = $s;
D.meridiem = qs;
function xt(e, t, r, n) {
  var a = we(),
    s = ce().set(n, t);
  return a[r](s, e);
}
function $n(e, t, r) {
  if ((ve(e) && ((t = e), (e = void 0)), (e = e || ""), t != null))
    return xt(e, t, r, "month");
  var n,
    a = [];
  for (n = 0; n < 12; n++) a[n] = xt(e, n, r, "month");
  return a;
}
function Ar(e, t, r, n) {
  typeof e == "boolean"
    ? (ve(t) && ((r = t), (t = void 0)), (t = t || ""))
    : ((t = e),
      (r = t),
      (e = !1),
      ve(t) && ((r = t), (t = void 0)),
      (t = t || ""));
  var a = we(),
    s = e ? a._week.dow : 0,
    i,
    o = [];
  if (r != null) return xt(t, (r + s) % 7, n, "day");
  for (i = 0; i < 7; i++) o[i] = xt(t, (i + s) % 7, n, "day");
  return o;
}
function tl(e, t) {
  return $n(e, t, "months");
}
function rl(e, t) {
  return $n(e, t, "monthsShort");
}
function nl(e, t, r) {
  return Ar(e, t, r, "weekdays");
}
function al(e, t, r) {
  return Ar(e, t, r, "weekdaysShort");
}
function sl(e, t, r) {
  return Ar(e, t, r, "weekdaysMin");
}
Me("en", {
  eras: [
    {
      since: "0001-01-01",
      until: 1 / 0,
      offset: 1,
      name: "Anno Domini",
      narrow: "AD",
      abbr: "AD",
    },
    {
      since: "0000-12-31",
      until: -1 / 0,
      offset: 1,
      name: "Before Christ",
      narrow: "BC",
      abbr: "BC",
    },
  ],
  dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
  ordinal: function (e) {
    var t = e % 10,
      r =
        S((e % 100) / 10) === 1
          ? "th"
          : t === 1
          ? "st"
          : t === 2
          ? "nd"
          : t === 3
          ? "rd"
          : "th";
    return e + r;
  },
});
d.lang = Q("moment.lang is deprecated. Use moment.locale instead.", Me);
d.langData = Q(
  "moment.langData is deprecated. Use moment.localeData instead.",
  we
);
var fe = Math.abs;
function il() {
  var e = this._data;
  return (
    (this._milliseconds = fe(this._milliseconds)),
    (this._days = fe(this._days)),
    (this._months = fe(this._months)),
    (e.milliseconds = fe(e.milliseconds)),
    (e.seconds = fe(e.seconds)),
    (e.minutes = fe(e.minutes)),
    (e.hours = fe(e.hours)),
    (e.months = fe(e.months)),
    (e.years = fe(e.years)),
    this
  );
}
function zn(e, t, r, n) {
  var a = ie(t, r);
  return (
    (e._milliseconds += n * a._milliseconds),
    (e._days += n * a._days),
    (e._months += n * a._months),
    e._bubble()
  );
}
function ol(e, t) {
  return zn(this, e, t, 1);
}
function ll(e, t) {
  return zn(this, e, t, -1);
}
function Kr(e) {
  return e < 0 ? Math.floor(e) : Math.ceil(e);
}
function ul() {
  var e = this._milliseconds,
    t = this._days,
    r = this._months,
    n = this._data,
    a,
    s,
    i,
    o,
    l;
  return (
    (e >= 0 && t >= 0 && r >= 0) ||
      (e <= 0 && t <= 0 && r <= 0) ||
      ((e += Kr(sr(r) + t) * 864e5), (t = 0), (r = 0)),
    (n.milliseconds = e % 1e3),
    (a = X(e / 1e3)),
    (n.seconds = a % 60),
    (s = X(a / 60)),
    (n.minutes = s % 60),
    (i = X(s / 60)),
    (n.hours = i % 24),
    (t += X(i / 24)),
    (l = X(Kn(t))),
    (r += l),
    (t -= Kr(sr(l))),
    (o = X(r / 12)),
    (r %= 12),
    (n.days = t),
    (n.months = r),
    (n.years = o),
    this
  );
}
function Kn(e) {
  return (e * 4800) / 146097;
}
function sr(e) {
  return (e * 146097) / 4800;
}
function cl(e) {
  if (!this.isValid()) return NaN;
  var t,
    r,
    n = this._milliseconds;
  if (((e = ee(e)), e === "month" || e === "quarter" || e === "year"))
    switch (((t = this._days + n / 864e5), (r = this._months + Kn(t)), e)) {
      case "month":
        return r;
      case "quarter":
        return r / 3;
      case "year":
        return r / 12;
    }
  else
    switch (((t = this._days + Math.round(sr(this._months))), e)) {
      case "week":
        return t / 7 + n / 6048e5;
      case "day":
        return t + n / 864e5;
      case "hour":
        return t * 24 + n / 36e5;
      case "minute":
        return t * 1440 + n / 6e4;
      case "second":
        return t * 86400 + n / 1e3;
      case "millisecond":
        return Math.floor(t * 864e5) + n;
      default:
        throw new Error("Unknown unit " + e);
    }
}
function be(e) {
  return function () {
    return this.as(e);
  };
}
var qn = be("ms"),
  dl = be("s"),
  fl = be("m"),
  hl = be("h"),
  _l = be("d"),
  ml = be("w"),
  pl = be("M"),
  gl = be("Q"),
  yl = be("y"),
  vl = qn;
function wl() {
  return ie(this);
}
function bl(e) {
  return (e = ee(e)), this.isValid() ? this[e + "s"]() : NaN;
}
function Ae(e) {
  return function () {
    return this.isValid() ? this._data[e] : NaN;
  };
}
var kl = Ae("milliseconds"),
  Sl = Ae("seconds"),
  Ol = Ae("minutes"),
  Tl = Ae("hours"),
  Ml = Ae("days"),
  Dl = Ae("months"),
  El = Ae("years");
function Cl() {
  return X(this.days() / 7);
}
var he = Math.round,
  Be = { ss: 44, s: 45, m: 45, h: 22, d: 26, w: null, M: 11 };
function xl(e, t, r, n, a) {
  return a.relativeTime(t || 1, !!r, e, n);
}
function Nl(e, t, r, n) {
  var a = ie(e).abs(),
    s = he(a.as("s")),
    i = he(a.as("m")),
    o = he(a.as("h")),
    l = he(a.as("d")),
    c = he(a.as("M")),
    f = he(a.as("w")),
    g = he(a.as("y")),
    y =
      (s <= r.ss && ["s", s]) ||
      (s < r.s && ["ss", s]) ||
      (i <= 1 && ["m"]) ||
      (i < r.m && ["mm", i]) ||
      (o <= 1 && ["h"]) ||
      (o < r.h && ["hh", o]) ||
      (l <= 1 && ["d"]) ||
      (l < r.d && ["dd", l]);
  return (
    r.w != null && (y = y || (f <= 1 && ["w"]) || (f < r.w && ["ww", f])),
    (y = y ||
      (c <= 1 && ["M"]) ||
      (c < r.M && ["MM", c]) ||
      (g <= 1 && ["y"]) || ["yy", g]),
    (y[2] = t),
    (y[3] = +e > 0),
    (y[4] = n),
    xl.apply(null, y)
  );
}
function Yl(e) {
  return e === void 0 ? he : typeof e == "function" ? ((he = e), !0) : !1;
}
function Rl(e, t) {
  return Be[e] === void 0
    ? !1
    : t === void 0
    ? Be[e]
    : ((Be[e] = t), e === "s" && (Be.ss = t - 1), !0);
}
function Il(e, t) {
  if (!this.isValid()) return this.localeData().invalidDate();
  var r = !1,
    n = Be,
    a,
    s;
  return (
    typeof e == "object" && ((t = e), (e = !1)),
    typeof e == "boolean" && (r = e),
    typeof t == "object" &&
      ((n = Object.assign({}, Be, t)),
      t.s != null && t.ss == null && (n.ss = t.s - 1)),
    (a = this.localeData()),
    (s = Nl(this, !r, n, a)),
    r && (s = a.pastFuture(+this, s)),
    a.postformat(s)
  );
}
var qt = Math.abs;
function Le(e) {
  return (e > 0) - (e < 0) || +e;
}
function Ht() {
  if (!this.isValid()) return this.localeData().invalidDate();
  var e = qt(this._milliseconds) / 1e3,
    t = qt(this._days),
    r = qt(this._months),
    n,
    a,
    s,
    i,
    o = this.asSeconds(),
    l,
    c,
    f,
    g;
  return o
    ? ((n = X(e / 60)),
      (a = X(n / 60)),
      (e %= 60),
      (n %= 60),
      (s = X(r / 12)),
      (r %= 12),
      (i = e ? e.toFixed(3).replace(/\.?0+$/, "") : ""),
      (l = o < 0 ? "-" : ""),
      (c = Le(this._months) !== Le(o) ? "-" : ""),
      (f = Le(this._days) !== Le(o) ? "-" : ""),
      (g = Le(this._milliseconds) !== Le(o) ? "-" : ""),
      l +
        "P" +
        (s ? c + s + "Y" : "") +
        (r ? c + r + "M" : "") +
        (t ? f + t + "D" : "") +
        (a || n || e ? "T" : "") +
        (a ? g + a + "H" : "") +
        (n ? g + n + "M" : "") +
        (e ? g + i + "S" : ""))
    : "P0D";
}
var O = Wt.prototype;
O.isValid = Mi;
O.abs = il;
O.add = ol;
O.subtract = ll;
O.as = cl;
O.asMilliseconds = qn;
O.asSeconds = dl;
O.asMinutes = fl;
O.asHours = hl;
O.asDays = _l;
O.asWeeks = ml;
O.asMonths = pl;
O.asQuarters = gl;
O.asYears = yl;
O.valueOf = vl;
O._bubble = ul;
O.clone = wl;
O.get = bl;
O.milliseconds = kl;
O.seconds = Sl;
O.minutes = Ol;
O.hours = Tl;
O.days = Ml;
O.weeks = Cl;
O.months = Dl;
O.years = El;
O.humanize = Il;
O.toISOString = Ht;
O.toString = Ht;
O.toJSON = Ht;
O.locale = Pn;
O.localeData = Ln;
O.toIsoString = Q(
  "toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",
  Ht
);
O.lang = Fn;
p("X", 0, 0, "unix");
p("x", 0, 0, "valueOf");
h("x", At);
h("X", es);
x("X", function (e, t, r) {
  r._d = new Date(parseFloat(e) * 1e3);
});
x("x", function (e, t, r) {
  r._d = new Date(S(e));
}); //! moment.js
d.version = "2.30.1";
Ia(Y);
d.fn = u;
d.min = ki;
d.max = Si;
d.now = Oi;
d.utc = ce;
d.unix = Qo;
d.months = tl;
d.isDate = _t;
d.locale = Me;
d.invalid = Nt;
d.duration = ie;
d.isMoment = se;
d.weekdays = nl;
d.parseZone = el;
d.localeData = we;
d.isDuration = St;
d.monthsShort = rl;
d.weekdaysMin = sl;
d.defineLocale = Dr;
d.updateLocale = Qs;
d.locales = ei;
d.weekdaysShort = al;
d.normalizeUnits = ee;
d.relativeTimeRounding = Yl;
d.relativeTimeThreshold = Rl;
d.calendarFormat = qi;
d.prototype = u;
d.HTML5_FMT = {
  DATETIME_LOCAL: "YYYY-MM-DDTHH:mm",
  DATETIME_LOCAL_SECONDS: "YYYY-MM-DDTHH:mm:ss",
  DATETIME_LOCAL_MS: "YYYY-MM-DDTHH:mm:ss.SSS",
  DATE: "YYYY-MM-DD",
  TIME: "HH:mm",
  TIME_SECONDS: "HH:mm:ss",
  TIME_MS: "HH:mm:ss.SSS",
  WEEK: "GGGG-[W]WW",
  MONTH: "YYYY-MM",
};
const wc = Object.freeze(
    Object.defineProperty({ __proto__: null, default: d }, Symbol.toStringTag, {
      value: "Module",
    })
  ),
  Al = {
    cricket: "CRICKET",
    soccer: "SOCCER",
    tennis: "TENNIS",
    basketBall: "BASKET_BALL",
    election: "ELECTION",
  },
  Pl = {
    ALL: 0,
    CRICKET: 4,
    SOCCER: 1,
    TENNIS: 2,
    BASKET_BALL: 7522,
    ELECTION: 2378962,
    KABADDI: 138,
    E_SOCCER: 137,
    HORSE_RACING: 7523,
    GREYHOUND_RACING: 7524,
    WRESTLING: 7525,
    VOLLEYBALL: 7526,
    BADMINTON: 7527,
    SNOOKER: 7528,
    DARTS: 7529,
    BOXING: 7530,
    MMA: 7531,
    AMERICAN_FOOTBALL: 7532,
    E_GAMES: 7533,
    ICE_HOCKEY: 7534,
    FUTSAL: 7535,
    MOTOR_SPORTS: 7536,
    POLITICS: 7537,
    TABLE_TENNIS: 7538,
  },
  Fl = {
    0: "ALL",
    4: "CRICKET",
    1: "SOCCER",
    2: "TENNIS",
    7522: "BASKET_BALL",
    2378962: "ELECTION",
    137: "E_SOCCER",
    7523: "HORSE_RACING",
    7524: "GREYHOUND_RACING",
    7525: "WRESTLING",
    7526: "VOLLEYBALL",
    7527: "BADMINTON",
    7528: "SNOOKER",
    7529: "DARTS",
    7530: "BOXING",
    7531: "MMA",
    7532: "AMERICAN_FOOTBALL",
    7533: "E_GAMES",
    7534: "ICE_HOCKEY",
    7535: "FUTSAL",
    7536: "MOTOR_SPORTS",
    7537: "POLITICS",
    7538: "TABLE_TENNIS",
  },
  Pr = ["/data1", "/data2", "/data3", "/data4"],
  Ll = {
    fair247: "https://fair247.vip",
    live247: "https://liveapi247.live",
    IPIFY: "https://api.ipify.org",
    apiEspay: "https://api.espay.cloud",
    nginx0: "https://api.nginx0.com",
    khelo365app: "https://api.khelo365.app",
    api2b: "https://api.cripa.live",
  },
  Wl = {
    get_balance: "get_balance",
    get_sports_cricket_data: "get_sports_cricket_data",
    get_sports_soccer_data: "get_sports_soccer_data",
    get_sports_tennis_data: "get_sports_tennis_data",
    get_sports_basket_ball_data: "get_sports_basket_ball_data",
    get_election_data: "get_election_data",
    get_kabaddi_data: "get_kabaddi_data",
    get_event_data: "get_event_data",
    get_event_data_2: "get_event_data_2",
    place_bet: "place_bet",
    verify_bet: "verify_bet",
    place_bet_premium: "place_bet_premium",
    user_login: "user_login",
    user_casino_login: "user_casino_login",
    user_login_and_open_casino: "user_login_and_open_casino",
    user_login_and_open_casino_aviator: "user_login_and_open_casino_aviator",
    get_news: "get_news",
    get_fancy: "get_fancy",
    get_premium: "get_premium",
    get_check_bookmaker: "get_check_bookmaker",
    get_casino_report: "get_casino_report",
    get_activity_logs: "get_activity_logs",
    get_stack_settings: "get_stack_settings",
    update_stack_settings: "update_stack_settings",
    get_multi_market_data: "get_multi_market_data",
    get_pl_market_data: "get_pl_market_data",
    get_pl_premium_data: "get_pl_premium_data",
    get_score_id: "get_score_id",
    get_check_tv: "get_check_tv",
    get_live_streaming: "get_live_streaming",
    get_live_streaming_com: "get_live_streaming_com",
    get_tv_id: "get_tv_id",
    get_user_profile: "get_user_profile",
    change_password: "change_password",
    get_bets_data: "get_bets_data",
    get_bet_history: "get_bet_history",
    get_event_1_data: "get_event_1_data",
    get_event_2_data: "get_event_2_data",
    get_account_statement_data: "get_account_statement_data",
    get_balance_overview_data: "get_balance_overview_data",
    get_pl_fancy_data: "get_pl_fancy_data",
    user_first_time_login: "user_first_time_login",
    get_bets_info_data: "get_bets_info_data",
    get_banner_data: "get_banner_data",
    new_current_bet: "new_current_bet",
    get_full_market: "get_full_market",
    get_book_maker_market: "get_book_maker_market",
    new_profit_loss: "new_profit_loss",
    event_profit_loss: "event_profit_loss",
    casino_pnl_bet_details: "casino_pnl_bet_details",
    premium_profit_loss_detail: "premium_profit_loss_detail",
    fancy_exposure: "fancy_exposure",
    casino_game_url: "casino_game_url",
    fake_api_call: "fake_api_call",
    get_ip_address: "get_ip_address",
    get_new_tv: "get_new_tv",
    b2c_signup: "b2c_signup",
    b2c_get_deposit_payment_methods: "b2c_get_deposit_payment_methods",
    b2c_get_withdraw_payment_methods: "b2c_get_withdraw_payment_methods",
    b2c_deposit: "b2c_deposit",
    b2c_withdraw: "b2c_withdraw",
    b2c_get_deposit: "b2c_get_deposit",
    b2c_get_withdraw: "b2c_get_withdraw",
    b2c_get_new_bet_history: "b2c_get_new_bet_history",
    b2c_new_profit_loss: "b2c_new_profit_loss",
    b2c_create_affiliate_agent: "b2c_create_affiliate_agent",
    b2c_my_referrals_downline: "b2c_my_referrals_downline",
    user_open_wco_casino: "user_open_wco_casino",
  },
  Ul = {
    get_balance: "/api1/refresh",
    get_sports_cricket_data: "/api8/cricketData",
    get_sports_soccer_data: "/api8/soccerData",
    get_sports_tennis_data: "/api8/tennisData",
    get_sports_cricket_data_1: "/api1/cricketData",
    get_sports_soccer_data_1: "/api1/soccerData",
    get_sports_tennis_data_1: "/api1/tennisData",
    get_sports_basket_ball_data: "/api1/BasketballData",
    get_all_sports_data: "/api1/newgetallevents",
    get_all_sports_data_1: "/api1/getallevents",
    get_election_data: "/api8/electionData",
    get_election_data_1: "/api1/electionData",
    get_kabaddi_data: "/kabaddiData",
    get_event_data: "/api1/getEventData",
    get_event_data_2: "/api8/getEventData",
    place_bet: "/api3/placebets",
    verify_bet: "/api3/verifyplacebets",
    place_bet_premium: "/api6/ppbet",
    user_login: "/api8/userlogin",
    user_login_1: "/api1/userlogin",
    user_first_time_login: "/api1/firsttimelogin",
    user_casino_login: "/awcapi/login",
    user_login_and_open_casino: "/awcapi/doLoginAndLaunchGame",
    user_casino_login_sab: "/sabapi/login",
    user_login_and_open_casino_sab: "/sabapi/doLoginAndLaunchGame",
    user_login_and_open_casino_aviator: "/avtapi/avi-launch-game",
    user_open_wco_casino: "/wco/getlaunchurl",
    get_news: "/api8/news",
    get_news_1: "/api1/feednews/getactive",
    get_fancy: "/api1/fancy",
    get_premium: "/api1/getprem",
    get_check_bookmaker: "/api1/checkbookmaker",
    get_casino_report: "/api1/new_get_casino_report",
    get_activity_logs: "/api1/activityLogs",
    get_stack_settings: "/api1/ssgetclickstake",
    update_stack_settings_1: "/api1/sssaveclickstake",
    get_multi_market_data: "/api1/getMultiMarket",
    get_pl_market_data: "/api1/plmarket",
    get_pl_fancy_data: "/api1/plfancy",
    get_pl_premium_data: "/api6/getprembook",
    get_score_id: "/api1/getskyScoreId",
    get_check_tv: "/api1/checktv",
    get_live_streaming: "/api1/livestreaming",
    get_live_streaming_com: "/api1/livestreaming",
    get_tv_id: "/api1/getTvId",
    get_user_profile: "/api1/userprofile",
    change_password: "/api1/changepassword",
    get_bets_data: "/api1/getbets",
    get_bet_history: "/api1/newbethistory",
    get_bets_info_data: "/api1/getbetsinfo",
    get_event_1_data: "/api1/events/1",
    get_event_2_data: "/api1/events/2",
    get_account_statement_data: "/api1/api1/accountstatement",
    get_balance_overview_data: "/api1/api1/balanceoverview",
    get_banner_data: "/api8/getBanner",
    new_current_bet: "/api1/api1/newcurrentBet",
    get_full_market: "/api1/getFullMarket",
    get_book_maker_market: "/api1/getBookMakerMarket",
    new_profit_loss: "/api1/newprofitloss",
    event_profit_loss: "/api1/eventprofitloss",
    casino_pnl_bet_details: "/api1/casinopnlbetdetails",
    premium_profit_loss_detail: "/api1/premiumprofitlossdetail",
    fancy_exposure: "/api2/FancyExposure",
    casino_game_url: "/api/gapcasino/game/url",
    fake_api_call: "/",
    get_ip_address: "/?format=json",
    get_new_tv: "/api1/getthandler",
    b2c_signup: "/api1/signup",
    b2c_get_deposit_payment_methods: "/apiv9/deposit/getpaymentmethods",
    b2c_get_withdraw_payment_methods: "/apiv9/withdraw/getpaymentmethods",
    b2c_deposit: "/apiv9/deposit",
    b2c_withdraw: "/apiv9/withdraw",
    b2c_get_deposit: "/apiv9/getdeposit",
    b2c_get_withdraw: "/apiv9/getwithdraw",
    b2c_get_transaction_history: "/apiv9/getmytransactions",
    b2c_get_new_bet_history: "/api1/newbethistory",
    b2c_new_profit_loss: "/api1/newprofitloss1",
    b2c_create_affiliate_agent: "/api2/CreateAffiliate",
    send_otp: "/api1/sendOtp",
    verify_mobile_no: "/api1/verifyMobile",
    add_mobile_no: "/api1/addmobilenumber",
    update_user_profile: "/api1/updateuserprofile",
    b2c_send_otp_to_mobile: "/api1/sendOtpToRegisteredMobile",
    b2c_forgot_pass_update_with_otp: "/api1/updatePassword",
    get_bank_list: "/apiv9/banklist",
    get_user_bank_list: "/apiv9/bankaccount/getall",
    add_bank_account: "/apiv9/bankaccount/add",
    delete_bank_account: "/apiv9/bankaccount/delete",
    add_upi_account: "/apiv9/upiaccount/add",
    get_user_upi_list: "/apiv9/upilist",
  },
  Hl = {
    fancy_rules: "fancy_rules",
    privacy_policy: "privacy_policy",
    terms_and_conditions: "terms_and_conditions",
    exchange_rules_and_regulations: "exchange_rules_and_regulations",
    kyc: "kyc",
    responsible_gaming: "responsible_gaming",
    about_us: "about_us",
    self_exclusion_policy: "self_exclusion_policy",
    underage_policy: "underage_policy",
  },
  He = {
    matchOdds: "matchOdds",
    bookmaker: "bookmaker",
    winToss: "winToss",
    superOver: "superOver",
    tiedMatch: "tiedMatch",
    completedMatch: "completedMatch",
    moneyLine: "moneyLine",
    fancy: "fancy",
    premium: "premium",
    overUnderGoals: (e) => `Over/Under ${e} Goals`,
  },
  jl = {
    matchOdds: "betfair_match_rate",
    bookmaker: "bookmaker_match_rate",
    winToss: "toss_match_rate",
    superOver: "Super_over_match",
    tiedMatch: "Tied_Match_Rate",
    completedMatch: "Completed_Match_rate",
    fancy: "session_rate",
    moneyLine: "betfair_match_rate",
    premium: "premium_rate",
    miniBookMaker: "minibookmaker_match_rate",
    lunchFavorite: "lunchFavorite_match_rate",
    [He.overUnderGoals("0.5")]: "betfair_match_rate05",
    [He.overUnderGoals("1.5")]: "betfair_match_rate15",
    [He.overUnderGoals("2.5")]: "betfair_match_rate25",
    [He.overUnderGoals("3.5")]: "betfair_match_rate35",
    [He.overUnderGoals("4.5")]: "betfair_match_rate45",
  },
  Bl = {
    HOME: "/",
    LOGIN: "/login",
    SIGNUP: "/signup",
    MY_ACCOUNT: "/my-account",
    B2C_MY_ACCOUNT: "/b2c-my-account",
    FIRST_TIME_LOGIN: "/first-time-login",
    SPORTS: "/sports",
    EXCHANGE: "/exchange",
    IN_PLAY: "/in-play",
    IN_PLAY_2: "/in-play-2",
    FULL_MARKET: "/full-market",
    MULTI_MARKET: "/multi-market",
    BACK: -1,
    CASINO: "/casino",
    DESKTOP_CASINO: "/desktop/casino",
    CRICKET: "/in-play-cricket",
    SOCCER: "/in-play-soccer",
    TENNIS: "/in-play-tennis",
    BASKET_BALL: "/in-play-basketball",
    IPL_WINNER: "/in-play-IplWinner",
    ELECTION: "/in-play-election",
    MY_PROFILE: "/my-profile",
    BALANCE_OVERVIEW: "/balance-overview",
    ACCOUNT_STATEMENT: "/account-statement",
    MY_BETS: "/my-bets",
    ACTIVITY_LOG: "/activity-log",
    BET_HISTORY: "/bets-history",
    PROFIT_LOSS: "/profit-loss",
    CASINO_PROFIT_LOSS: "/casino-profit-loss",
    RESULT: "/result",
    KYC_DESK: "/kycdesk",
    B2C_DEPOSIT_WITHDRAWAL: "/dw",
    B2C_PROMOTIONS: "/promotions",
    B2C_DEPOSIT_HISTORY: "/deposit-history",
    B2C_WITHDRAW_HISTORY: "/withdraw-history",
    B2C_TRANSACTION_HISTORY: "/trans-history",
    CASINO_LIST: "/casino-list",
    B2C_BET_HISTORY: "/b2c-bet-history-new",
    B2C_PROFIT_LOSS: "/b2c-pl-history-new",
    B2C_ACCOUNT_STATEMENT: "/b2c-account-statement-new",
    B2C_AGENT_AFFILIATE: "/b2c-agent-affiliate",
    B2C_MY_PROFILE: "/b2c-my-profile",
    B2C_RESET_PASSWORD: "/b2c-reset-password",
    B2C_FORGOT_PASSWORD: "/b2c-forgot-password",
    B2C_CRICKET: "/b2c-cricket",
    B2C_ACTIVITY_LOG: "/b2c-activity-log",
    B2C_TURNOVER: "/b2c-turnover",
    DESKTOP_SCREEN_VIEW: "/d",
    REFER_BONUS: "/refer-bonus",
    VELKI: "/velki",
    IFRAME_PROVIDER: "/iframe-provider",
    TUTORIALS: "/tutorials",
    INFO: "/info",
    B2C_INVITE_FRIEND: "/b2c-invite-friend",
  },
  Gl = {
    BONUS_MODAL: "bonusModal",
    NEWS_MODAL: "newsModal",
    CHATBOAT_MODAL: "chatBoatModal",
  },
  Vl = { DEPOSIT: "deposit", WITHDRAWAL: "withdrawal" },
  oe = {
    LOCAL_BANK: "LOCAL_BANK",
    NAGAD_PERSONAL: "NAGAD_PERSONAL",
    BKASH_PERSONAL: "BKASH_PERSONAL",
    NAGAD_AGENT: "NAGAD_AGENT",
    BKASH_AGENT: "BKASH_AGENT",
    PHONE_PAY: "PHONE_PAY",
    GOOGLE_PAY: "GOOGLE_PAY",
    PAYTM: "PAYTM",
    CRYPTO: "CRYPTO",
    ROCKET_AGENT: "ROCKET_AGENT",
    ROCKET_PERSONAL: "ROCKET_PERSONAL",
    BANK_TRANSFER: "BANK_TRANSFER",
    UPI_TRANSFER: "UPI_TRANSFER",
  },
  $l = [
    { name: "Local Bank", value: oe.LOCAL_BANK },
    { name: "Nagad Personal", value: oe.NAGAD_PERSONAL },
    { name: "Bkash Personal", value: oe.BKASH_PERSONAL },
    { name: "Nagad Agent", value: oe.NAGAD_AGENT },
    { name: "Bkash Agent", value: oe.BKASH_AGENT },
    { name: "PhonePe", value: oe.PHONE_PAY },
    { name: "GPay", value: oe.GOOGLE_PAY },
    { name: "Paytm", value: oe.PAYTM },
    { name: "Crypto", value: oe.CRYPTO },
  ],
  zl = [
    { name: "india", img: "india.png" },
    { name: "bangladesh", img: "bangladesh.png" },
    { name: "pakistan", img: "pakistan.png" },
    { name: "camodia", img: "camodia.png" },
    { name: "philippines", img: "philippines.jpeg" },
    { name: "brazil", img: "brazil.png" },
  ],
  bc = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        BASE_URLS: Ll,
        apiRoutes: Ul,
        apisKeys: Wl,
        countryFlagData: zl,
        footerKeys: Hl,
        marketKeys: He,
        modalKeys: Gl,
        pageKeys: Bl,
        paymentMethodKeys: oe,
        paymentMethodOptions: $l,
        socketEndPoints: Pr,
        socketIoMarketKey: jl,
        sportsKeyByName: Pl,
        sportsNameByKey: Fl,
        sportsNames: Al,
        tabKeys: Vl,
      },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  qr = { disabled: !1 },
  Zn = at.createContext(null);
var Kl = function (t) {
    return t.scrollTop;
  },
  st = "unmounted",
  Ce = "exited",
  xe = "entering",
  je = "entered",
  ir = "exiting",
  ke = (function (e) {
    Da(t, e);
    function t(n, a) {
      var s;
      s = e.call(this, n, a) || this;
      var i = a,
        o = i && !i.isMounting ? n.enter : n.appear,
        l;
      return (
        (s.appearStatus = null),
        n.in
          ? o
            ? ((l = Ce), (s.appearStatus = xe))
            : (l = je)
          : n.unmountOnExit || n.mountOnEnter
          ? (l = st)
          : (l = Ce),
        (s.state = { status: l }),
        (s.nextCallback = null),
        s
      );
    }
    t.getDerivedStateFromProps = function (a, s) {
      var i = a.in;
      return i && s.status === st ? { status: Ce } : null;
    };
    var r = t.prototype;
    return (
      (r.componentDidMount = function () {
        this.updateStatus(!0, this.appearStatus);
      }),
      (r.componentDidUpdate = function (a) {
        var s = null;
        if (a !== this.props) {
          var i = this.state.status;
          this.props.in
            ? i !== xe && i !== je && (s = xe)
            : (i === xe || i === je) && (s = ir);
        }
        this.updateStatus(!1, s);
      }),
      (r.componentWillUnmount = function () {
        this.cancelNextCallback();
      }),
      (r.getTimeouts = function () {
        var a = this.props.timeout,
          s,
          i,
          o;
        return (
          (s = i = o = a),
          a != null &&
            typeof a != "number" &&
            ((s = a.exit),
            (i = a.enter),
            (o = a.appear !== void 0 ? a.appear : i)),
          { exit: s, enter: i, appear: o }
        );
      }),
      (r.updateStatus = function (a, s) {
        if ((a === void 0 && (a = !1), s !== null))
          if ((this.cancelNextCallback(), s === xe)) {
            if (this.props.unmountOnExit || this.props.mountOnEnter) {
              var i = this.props.nodeRef
                ? this.props.nodeRef.current
                : vt.findDOMNode(this);
              i && Kl(i);
            }
            this.performEnter(a);
          } else this.performExit();
        else
          this.props.unmountOnExit &&
            this.state.status === Ce &&
            this.setState({ status: st });
      }),
      (r.performEnter = function (a) {
        var s = this,
          i = this.props.enter,
          o = this.context ? this.context.isMounting : a,
          l = this.props.nodeRef ? [o] : [vt.findDOMNode(this), o],
          c = l[0],
          f = l[1],
          g = this.getTimeouts(),
          y = o ? g.appear : g.enter;
        if ((!a && !i) || qr.disabled) {
          this.safeSetState({ status: je }, function () {
            s.props.onEntered(c);
          });
          return;
        }
        this.props.onEnter(c, f),
          this.safeSetState({ status: xe }, function () {
            s.props.onEntering(c, f),
              s.onTransitionEnd(y, function () {
                s.safeSetState({ status: je }, function () {
                  s.props.onEntered(c, f);
                });
              });
          });
      }),
      (r.performExit = function () {
        var a = this,
          s = this.props.exit,
          i = this.getTimeouts(),
          o = this.props.nodeRef ? void 0 : vt.findDOMNode(this);
        if (!s || qr.disabled) {
          this.safeSetState({ status: Ce }, function () {
            a.props.onExited(o);
          });
          return;
        }
        this.props.onExit(o),
          this.safeSetState({ status: ir }, function () {
            a.props.onExiting(o),
              a.onTransitionEnd(i.exit, function () {
                a.safeSetState({ status: Ce }, function () {
                  a.props.onExited(o);
                });
              });
          });
      }),
      (r.cancelNextCallback = function () {
        this.nextCallback !== null &&
          (this.nextCallback.cancel(), (this.nextCallback = null));
      }),
      (r.safeSetState = function (a, s) {
        (s = this.setNextCallback(s)), this.setState(a, s);
      }),
      (r.setNextCallback = function (a) {
        var s = this,
          i = !0;
        return (
          (this.nextCallback = function (o) {
            i && ((i = !1), (s.nextCallback = null), a(o));
          }),
          (this.nextCallback.cancel = function () {
            i = !1;
          }),
          this.nextCallback
        );
      }),
      (r.onTransitionEnd = function (a, s) {
        this.setNextCallback(s);
        var i = this.props.nodeRef
            ? this.props.nodeRef.current
            : vt.findDOMNode(this),
          o = a == null && !this.props.addEndListener;
        if (!i || o) {
          setTimeout(this.nextCallback, 0);
          return;
        }
        if (this.props.addEndListener) {
          var l = this.props.nodeRef
              ? [this.nextCallback]
              : [i, this.nextCallback],
            c = l[0],
            f = l[1];
          this.props.addEndListener(c, f);
        }
        a != null && setTimeout(this.nextCallback, a);
      }),
      (r.render = function () {
        var a = this.state.status;
        if (a === st) return null;
        var s = this.props,
          i = s.children;
        s.in,
          s.mountOnEnter,
          s.unmountOnExit,
          s.appear,
          s.enter,
          s.exit,
          s.timeout,
          s.addEndListener,
          s.onEnter,
          s.onEntering,
          s.onEntered,
          s.onExit,
          s.onExiting,
          s.onExited,
          s.nodeRef;
        var o = Ea(s, [
          "children",
          "in",
          "mountOnEnter",
          "unmountOnExit",
          "appear",
          "enter",
          "exit",
          "timeout",
          "addEndListener",
          "onEnter",
          "onEntering",
          "onEntered",
          "onExit",
          "onExiting",
          "onExited",
          "nodeRef",
        ]);
        return at.createElement(
          Zn.Provider,
          { value: null },
          typeof i == "function"
            ? i(a, o)
            : at.cloneElement(at.Children.only(i), o)
        );
      }),
      t
    );
  })(at.Component);
ke.contextType = Zn;
ke.propTypes = {};
function We() {}
ke.defaultProps = {
  in: !1,
  mountOnEnter: !1,
  unmountOnExit: !1,
  appear: !1,
  enter: !0,
  exit: !0,
  onEnter: We,
  onEntering: We,
  onEntered: We,
  onExit: We,
  onExiting: We,
  onExited: We,
};
ke.UNMOUNTED = st;
ke.EXITED = Ce;
ke.ENTERING = xe;
ke.ENTERED = je;
ke.EXITING = ir;
function Jn(e) {
  var t,
    r,
    n = "";
  if (typeof e == "string" || typeof e == "number") n += e;
  else if (typeof e == "object")
    if (Array.isArray(e))
      for (t = 0; t < e.length; t++)
        e[t] && (r = Jn(e[t])) && (n && (n += " "), (n += r));
    else for (t in e) e[t] && (n && (n += " "), (n += t));
  return n;
}
function Re() {
  for (var e, t, r = 0, n = ""; r < arguments.length; )
    (e = arguments[r++]) && (t = Jn(e)) && (n && (n += " "), (n += t));
  return n;
}
function Ie() {
  return (
    (Ie =
      Object.assign ||
      function (e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = arguments[t];
          for (var n in r)
            Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
        }
        return e;
      }),
    Ie.apply(this, arguments)
  );
}
function Fr(e, t) {
  if (e == null) return {};
  var r = {},
    n = Object.keys(e),
    a,
    s;
  for (s = 0; s < n.length; s++)
    (a = n[s]), !(t.indexOf(a) >= 0) && (r[a] = e[a]);
  return r;
}
function ft(e) {
  return typeof e == "number" && !isNaN(e);
}
function nt(e) {
  return typeof e == "boolean";
}
function ht(e) {
  return typeof e == "string";
}
function z(e) {
  return typeof e == "function";
}
function Tt(e) {
  return ht(e) || z(e) ? e : null;
}
function or(e) {
  return e === 0 || e;
}
function ql(e, t) {
  return e === !1 || (ft(e) && e > 0) ? e : t;
}
var Xn = !!(
  typeof window < "u" &&
  window.document &&
  window.document.createElement
);
function Zt(e) {
  return k.isValidElement(e) || ht(e) || z(e) || ft(e);
}
var Qn = {
    TOP_LEFT: "top-left",
    TOP_RIGHT: "top-right",
    TOP_CENTER: "top-center",
    BOTTOM_LEFT: "bottom-left",
    BOTTOM_RIGHT: "bottom-right",
    BOTTOM_CENTER: "bottom-center",
  },
  De = {
    INFO: "info",
    SUCCESS: "success",
    WARNING: "warning",
    ERROR: "error",
    DEFAULT: "default",
    DARK: "dark",
  };
function Zl(e, t, r) {
  r === void 0 && (r = 300);
  var n = e.scrollHeight,
    a = e.style;
  requestAnimationFrame(function () {
    (a.minHeight = "initial"),
      (a.height = n + "px"),
      (a.transition = "all " + r + "ms"),
      requestAnimationFrame(function () {
        (a.height = "0"),
          (a.padding = "0"),
          (a.margin = "0"),
          setTimeout(function () {
            return t();
          }, r);
      });
  });
}
function Jl(e) {
  var t = e.enter,
    r = e.exit,
    n = e.duration,
    a = n === void 0 ? 750 : n,
    s = e.appendPosition,
    i = s === void 0 ? !1 : s,
    o = e.collapse,
    l = o === void 0 ? !0 : o,
    c = e.collapseDuration,
    f = c === void 0 ? 300 : c,
    g,
    y;
  return (
    Array.isArray(a) && a.length === 2 ? ((g = a[0]), (y = a[1])) : (g = y = a),
    function (H) {
      var G = H.children,
        V = H.position,
        I = H.preventExitTransition,
        K = H.done,
        q = Fr(H, ["children", "position", "preventExitTransition", "done"]),
        v = i ? t + "--" + V : t,
        T = i ? r + "--" + V : r,
        N = function () {
          var m = q.nodeRef.current;
          m &&
            (m.classList.add(v),
            (m.style.animationFillMode = "forwards"),
            (m.style.animationDuration = g + "ms"));
        },
        C = function () {
          var m = q.nodeRef.current;
          m &&
            (m.classList.remove(v),
            m.style.removeProperty("animationFillMode"),
            m.style.removeProperty("animationDuration"));
        },
        _ = function E() {
          var m = q.nodeRef.current;
          m &&
            (m.removeEventListener("animationend", E), l ? Zl(m, K, f) : K());
        },
        j = function () {
          var m = q.nodeRef.current;
          m &&
            (m.classList.add(T),
            (m.style.animationFillMode = "forwards"),
            (m.style.animationDuration = y + "ms"),
            m.addEventListener("animationend", _));
        };
      return k.createElement(
        ke,
        Object.assign({}, q, {
          timeout: I ? (l ? f : 50) : { enter: g, exit: l ? y + f : y + 50 },
          onEnter: N,
          onEntered: C,
          onExit: I ? _ : j,
          unmountOnExit: !0,
        }),
        G
      );
    }
  );
}
var ne = {
  list: new Map(),
  emitQueue: new Map(),
  on: function (t, r) {
    return (
      this.list.has(t) || this.list.set(t, []), this.list.get(t).push(r), this
    );
  },
  off: function (t, r) {
    if (r) {
      var n = this.list.get(t).filter(function (a) {
        return a !== r;
      });
      return this.list.set(t, n), this;
    }
    return this.list.delete(t), this;
  },
  cancelEmit: function (t) {
    var r = this.emitQueue.get(t);
    return (
      r &&
        (r.forEach(function (n) {
          return clearTimeout(n);
        }),
        this.emitQueue.delete(t)),
      this
    );
  },
  emit: function (t) {
    for (
      var r = this,
        n = arguments.length,
        a = new Array(n > 1 ? n - 1 : 0),
        s = 1;
      s < n;
      s++
    )
      a[s - 1] = arguments[s];
    this.list.has(t) &&
      this.list.get(t).forEach(function (i) {
        var o = setTimeout(function () {
          i.apply(void 0, a);
        }, 0);
        r.emitQueue.has(t) || r.emitQueue.set(t, []),
          r.emitQueue.get(t).push(o);
      });
  },
};
function Ge(e, t) {
  t === void 0 && (t = !1);
  var r = k.useRef(e);
  return (
    k.useEffect(function () {
      t && (r.current = e);
    }),
    r.current
  );
}
function Xl(e, t) {
  switch (t.type) {
    case "ADD":
      return [].concat(e, [t.toastId]).filter(function (r) {
        return r !== t.staleId;
      });
    case "REMOVE":
      return or(t.toastId)
        ? e.filter(function (r) {
            return r !== t.toastId;
          })
        : [];
  }
}
function Ql(e) {
  var t = k.useReducer(function (v) {
      return v + 1;
    }, 0),
    r = t[1],
    n = k.useReducer(Xl, []),
    a = n[0],
    s = n[1],
    i = k.useRef(null),
    o = Ge(0),
    l = Ge([]),
    c = Ge({}),
    f = Ge({
      toastKey: 1,
      displayedToast: 0,
      props: e,
      containerId: null,
      isToastActive: g,
      getToast: function (T) {
        return c[T] || null;
      },
    });
  k.useEffect(function () {
    return (
      (f.containerId = e.containerId),
      ne
        .cancelEmit(3)
        .on(0, V)
        .on(1, function (v) {
          return i.current && W(v);
        })
        .on(5, y)
        .emit(2, f),
      function () {
        return ne.emit(3, f);
      }
    );
  }, []),
    k.useEffect(
      function () {
        (f.isToastActive = g),
          (f.displayedToast = a.length),
          ne.emit(4, a.length, e.containerId);
      },
      [a]
    ),
    k.useEffect(function () {
      f.props = e;
    });
  function g(v) {
    return a.indexOf(v) !== -1;
  }
  function y(v) {
    var T = v.containerId,
      N = f.props,
      C = N.limit,
      _ = N.enableMultiContainer;
    C && (!T || (f.containerId === T && _)) && ((o -= l.length), (l = []));
  }
  function W(v) {
    var T = l.length;
    if (((o = or(v) ? o - 1 : o - f.displayedToast), o < 0 && (o = 0), T > 0)) {
      var N = or(v) ? 1 : f.props.limit;
      if (T === 1 || N === 1) f.displayedToast++, H();
      else {
        var C = N > T ? T : N;
        f.displayedToast = C;
        for (var _ = 0; _ < C; _++) H();
      }
    }
    s({ type: "REMOVE", toastId: v });
  }
  function H() {
    var v = l.shift(),
      T = v.toastContent,
      N = v.toastProps,
      C = v.staleId;
    setTimeout(function () {
      I(T, N, C);
    }, 500);
  }
  function G(v) {
    var T = v.containerId,
      N = v.toastId,
      C = v.updateId;
    return !!(
      !i.current ||
      (f.props.enableMultiContainer && T !== f.props.containerId) ||
      (f.isToastActive(N) && C == null)
    );
  }
  function V(v, T) {
    var N = T.delay,
      C = T.staleId,
      _ = Fr(T, ["delay", "staleId"]);
    if (!(!Zt(v) || G(_))) {
      var j = _.toastId,
        E = _.updateId,
        m = f.props,
        Qe = f.isToastActive,
        Se = function () {
          return W(j);
        },
        Fe = !Qe(j);
      Fe && o++;
      var J = {
        toastId: j,
        updateId: E,
        key: _.key || f.toastKey++,
        type: _.type,
        closeToast: Se,
        closeButton: _.closeButton,
        rtl: m.rtl,
        position: _.position || m.position,
        transition: _.transition || m.transition,
        className: Tt(_.className || m.toastClassName),
        bodyClassName: Tt(_.bodyClassName || m.bodyClassName),
        style: _.style || m.toastStyle,
        bodyStyle: _.bodyStyle || m.bodyStyle,
        onClick: _.onClick || m.onClick,
        pauseOnHover: nt(_.pauseOnHover) ? _.pauseOnHover : m.pauseOnHover,
        pauseOnFocusLoss: nt(_.pauseOnFocusLoss)
          ? _.pauseOnFocusLoss
          : m.pauseOnFocusLoss,
        draggable: nt(_.draggable) ? _.draggable : m.draggable,
        draggablePercent: ft(_.draggablePercent)
          ? _.draggablePercent
          : m.draggablePercent,
        closeOnClick: nt(_.closeOnClick) ? _.closeOnClick : m.closeOnClick,
        progressClassName: Tt(_.progressClassName || m.progressClassName),
        progressStyle: _.progressStyle || m.progressStyle,
        autoClose: ql(_.autoClose, m.autoClose),
        hideProgressBar: nt(_.hideProgressBar)
          ? _.hideProgressBar
          : m.hideProgressBar,
        progress: _.progress,
        role: ht(_.role) ? _.role : m.role,
        deleteToast: function () {
          K(j);
        },
      };
      z(_.onOpen) && (J.onOpen = _.onOpen),
        z(_.onClose) && (J.onClose = _.onClose);
      var et = m.closeButton;
      _.closeButton === !1 || Zt(_.closeButton)
        ? (et = _.closeButton)
        : _.closeButton === !0 && (et = Zt(m.closeButton) ? m.closeButton : !0),
        (J.closeButton = et);
      var te = v;
      k.isValidElement(v) && !ht(v.type)
        ? (te = k.cloneElement(v, { closeToast: Se, toastProps: J }))
        : z(v) && (te = v({ closeToast: Se, toastProps: J })),
        m.limit && m.limit > 0 && o > m.limit && Fe
          ? l.push({ toastContent: te, toastProps: J, staleId: C })
          : ft(N) && N > 0
          ? setTimeout(function () {
              I(te, J, C);
            }, N)
          : I(te, J, C);
    }
  }
  function I(v, T, N) {
    var C = T.toastId;
    (c[C] = { content: v, props: T }),
      s({ type: "ADD", toastId: C, staleId: N });
  }
  function K(v) {
    delete c[v], r();
  }
  function q(v) {
    for (
      var T = {},
        N = e.newestOnTop ? Object.keys(c).reverse() : Object.keys(c),
        C = 0;
      C < N.length;
      C++
    ) {
      var _ = c[N[C]],
        j = _.props.position;
      T[j] || (T[j] = []), T[j].push(_);
    }
    return Object.keys(T).map(function (E) {
      return v(E, T[E]);
    });
  }
  return {
    getToastToRender: q,
    collection: c,
    containerRef: i,
    isToastActive: g,
  };
}
function Zr(e) {
  return e.targetTouches && e.targetTouches.length >= 1
    ? e.targetTouches[0].clientX
    : e.clientX;
}
function eu(e) {
  return e.targetTouches && e.targetTouches.length >= 1
    ? e.targetTouches[0].clientY
    : e.clientY;
}
function tu(e) {
  var t = k.useState(!0),
    r = t[0],
    n = t[1],
    a = k.useState(!1),
    s = a[0],
    i = a[1],
    o = k.useRef(null),
    l = Ge({
      start: 0,
      x: 0,
      y: 0,
      deltaX: 0,
      removalDistance: 0,
      canCloseOnClick: !0,
      canDrag: !1,
      boundingRect: null,
    }),
    c = Ge(e, !0),
    f = e.autoClose,
    g = e.pauseOnHover,
    y = e.closeToast,
    W = e.onClick,
    H = e.closeOnClick;
  k.useEffect(function () {
    return (
      z(e.onOpen) && e.onOpen(k.isValidElement(e.children) && e.children.props),
      function () {
        z(c.onClose) &&
          c.onClose(k.isValidElement(c.children) && c.children.props);
      }
    );
  }, []),
    k.useEffect(
      function () {
        return (
          e.draggable && T(),
          function () {
            e.draggable && N();
          }
        );
      },
      [e.draggable]
    ),
    k.useEffect(
      function () {
        return (
          e.pauseOnFocusLoss && q(),
          function () {
            e.pauseOnFocusLoss && v();
          }
        );
      },
      [e.pauseOnFocusLoss]
    );
  function G(E) {
    var m = o.current;
    (l.canCloseOnClick = !0),
      (l.canDrag = !0),
      (l.boundingRect = m.getBoundingClientRect()),
      (m.style.transition = ""),
      (l.start = l.x = Zr(E.nativeEvent)),
      (l.removalDistance = m.offsetWidth * (e.draggablePercent / 100));
  }
  function V() {
    if (l.boundingRect) {
      var E = l.boundingRect,
        m = E.top,
        Qe = E.bottom,
        Se = E.left,
        Fe = E.right;
      e.pauseOnHover && l.x >= Se && l.x <= Fe && l.y >= m && l.y <= Qe
        ? K()
        : I();
    }
  }
  function I() {
    n(!0);
  }
  function K() {
    n(!1);
  }
  function q() {
    window.addEventListener("focus", I), window.addEventListener("blur", K);
  }
  function v() {
    window.removeEventListener("focus", I),
      window.removeEventListener("blur", K);
  }
  function T() {
    document.addEventListener("mousemove", C),
      document.addEventListener("mouseup", _),
      document.addEventListener("touchmove", C),
      document.addEventListener("touchend", _);
  }
  function N() {
    document.removeEventListener("mousemove", C),
      document.removeEventListener("mouseup", _),
      document.removeEventListener("touchmove", C),
      document.removeEventListener("touchend", _);
  }
  function C(E) {
    E.preventDefault();
    var m = o.current;
    l.canDrag &&
      (r && K(),
      (l.x = Zr(E)),
      (l.deltaX = l.x - l.start),
      (l.y = eu(E)),
      l.start !== l.x && (l.canCloseOnClick = !1),
      (m.style.transform = "translateX(" + l.deltaX + "px)"),
      (m.style.opacity = "" + (1 - Math.abs(l.deltaX / l.removalDistance))));
  }
  function _() {
    var E = o.current;
    if (l.canDrag) {
      if (((l.canDrag = !1), Math.abs(l.deltaX) > l.removalDistance)) {
        i(!0), e.closeToast();
        return;
      }
      (E.style.transition = "transform 0.2s, opacity 0.2s"),
        (E.style.transform = "translateX(0)"),
        (E.style.opacity = "1");
    }
  }
  var j = { onMouseDown: G, onTouchStart: G, onMouseUp: V, onTouchEnd: V };
  return (
    f && g && ((j.onMouseEnter = K), (j.onMouseLeave = I)),
    H &&
      (j.onClick = function (E) {
        W && W(E), l.canCloseOnClick && y();
      }),
    {
      playToast: I,
      pauseToast: K,
      isRunning: r,
      preventExitTransition: s,
      toastRef: o,
      eventHandlers: j,
    }
  );
}
function ea(e) {
  var t = e.closeToast,
    r = e.type,
    n = e.ariaLabel,
    a = n === void 0 ? "close" : n;
  return k.createElement(
    "button",
    {
      className: "Toastify__close-button Toastify__close-button--" + r,
      type: "button",
      onClick: function (i) {
        i.stopPropagation(), t(i);
      },
      "aria-label": a,
    },
    k.createElement(
      "svg",
      { "aria-hidden": "true", viewBox: "0 0 14 16" },
      k.createElement("path", {
        fillRule: "evenodd",
        d: "M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z",
      })
    )
  );
}
function ta(e) {
  var t,
    r,
    n = e.delay,
    a = e.isRunning,
    s = e.closeToast,
    i = e.type,
    o = e.hide,
    l = e.className,
    c = e.style,
    f = e.controlledProgress,
    g = e.progress,
    y = e.rtl,
    W = e.isIn,
    H = Ie({}, c, {
      animationDuration: n + "ms",
      animationPlayState: a ? "running" : "paused",
      opacity: o ? 0 : 1,
    });
  f && (H.transform = "scaleX(" + g + ")");
  var G = [
      "Toastify__progress-bar",
      f
        ? "Toastify__progress-bar--controlled"
        : "Toastify__progress-bar--animated",
      "Toastify__progress-bar--" + i,
      ((t = {}), (t["Toastify__progress-bar--rtl"] = y), t),
    ],
    V = z(l)
      ? l({ rtl: y, type: i, defaultClassName: Re.apply(void 0, G) })
      : Re.apply(void 0, [].concat(G, [l])),
    I =
      ((r = {}),
      (r[f && g >= 1 ? "onTransitionEnd" : "onAnimationEnd"] =
        f && g < 1
          ? null
          : function () {
              W && s();
            }),
      r);
  return k.createElement("div", Object.assign({ className: V, style: H }, I));
}
ta.defaultProps = { type: De.DEFAULT, hide: !1 };
var ru = function (t) {
    var r,
      n = tu(t),
      a = n.isRunning,
      s = n.preventExitTransition,
      i = n.toastRef,
      o = n.eventHandlers,
      l = t.closeButton,
      c = t.children,
      f = t.autoClose,
      g = t.onClick,
      y = t.type,
      W = t.hideProgressBar,
      H = t.closeToast,
      G = t.transition,
      V = t.position,
      I = t.className,
      K = t.style,
      q = t.bodyClassName,
      v = t.bodyStyle,
      T = t.progressClassName,
      N = t.progressStyle,
      C = t.updateId,
      _ = t.role,
      j = t.progress,
      E = t.rtl,
      m = t.toastId,
      Qe = t.deleteToast,
      Se = [
        "Toastify__toast",
        "Toastify__toast--" + y,
        ((r = {}), (r["Toastify__toast--rtl"] = E), r),
      ],
      Fe = z(I)
        ? I({
            rtl: E,
            position: V,
            type: y,
            defaultClassName: Re.apply(void 0, Se),
          })
        : Re.apply(void 0, [].concat(Se, [I])),
      J = !!j;
    function et(te) {
      if (te) {
        var yt = { closeToast: H, type: y };
        if (z(te)) return te(yt);
        if (k.isValidElement(te)) return k.cloneElement(te, yt);
      }
    }
    return k.createElement(
      G,
      {
        in: t.in,
        appear: !0,
        done: Qe,
        position: V,
        preventExitTransition: s,
        nodeRef: i,
      },
      k.createElement(
        "div",
        Object.assign({ id: m, onClick: g, className: Fe || void 0 }, o, {
          style: K,
          ref: i,
        }),
        k.createElement(
          "div",
          Object.assign({}, t.in && { role: _ }, {
            className: z(q) ? q({ type: y }) : Re("Toastify__toast-body", q),
            style: v,
          }),
          c
        ),
        et(l),
        (f || J) &&
          k.createElement(
            ta,
            Object.assign({}, C && !J ? { key: "pb-" + C } : {}, {
              rtl: E,
              delay: f,
              isRunning: a,
              isIn: t.in,
              closeToast: H,
              hide: W,
              type: y,
              style: N,
              className: T,
              controlledProgress: J,
              progress: j,
            })
          )
      )
    );
  },
  nu = Jl({
    enter: "Toastify__bounce-enter",
    exit: "Toastify__bounce-exit",
    appendPosition: !0,
  }),
  au = function (t) {
    var r = t.children,
      n = t.className,
      a = t.style,
      s = Fr(t, ["children", "className", "style"]);
    return (
      delete s.in,
      k.createElement(
        "div",
        { className: n, style: a },
        k.Children.map(r, function (i) {
          return k.cloneElement(i, s);
        })
      )
    );
  },
  ra = function (t) {
    var r = Ql(t),
      n = r.getToastToRender,
      a = r.containerRef,
      s = r.isToastActive,
      i = t.className,
      o = t.style,
      l = t.rtl,
      c = t.containerId;
    return k.createElement(
      "div",
      { ref: a, className: "Toastify", id: c },
      n(function (f, g) {
        var y,
          W,
          H = {
            className: z(i)
              ? i({
                  position: f,
                  rtl: l,
                  defaultClassName: Re(
                    "Toastify__toast-container",
                    "Toastify__toast-container--" + f,
                    ((y = {}), (y["Toastify__toast-container--rtl"] = l), y)
                  ),
                })
              : Re(
                  "Toastify__toast-container",
                  "Toastify__toast-container--" + f,
                  ((W = {}), (W["Toastify__toast-container--rtl"] = l), W),
                  Tt(i)
                ),
            style:
              g.length === 0 ? Ie({}, o, { pointerEvents: "none" }) : Ie({}, o),
          };
        return k.createElement(
          au,
          Object.assign({}, H, { key: "container-" + f }),
          g.map(function (G) {
            var V = G.content,
              I = G.props;
            return k.createElement(
              ru,
              Object.assign({}, I, {
                in: s(I.toastId),
                key: "toast-" + I.key,
                closeButton: I.closeButton === !0 ? ea : I.closeButton,
              }),
              V
            );
          })
        );
      })
    );
  };
ra.defaultProps = {
  position: Qn.TOP_RIGHT,
  transition: nu,
  rtl: !1,
  autoClose: 5e3,
  hideProgressBar: !1,
  closeButton: ea,
  pauseOnHover: !0,
  pauseOnFocusLoss: !0,
  closeOnClick: !0,
  newestOnTop: !1,
  draggable: !0,
  draggablePercent: 80,
  role: "alert",
};
var Ke = new Map(),
  lr,
  ot,
  na,
  ur = [],
  cr = !1;
function jt() {
  return Ke.size > 0;
}
function su(e) {
  return jt() ? Ke.get(e || lr) : null;
}
function iu(e, t) {
  var r = t.containerId,
    n = su(r);
  return n ? n.getToast(e) : null;
}
function aa() {
  return (Math.random().toString(36) + Date.now().toString(36)).substr(2, 10);
}
function ou(e) {
  return e && (ht(e.toastId) || ft(e.toastId)) ? e.toastId : aa();
}
function Pe(e, t) {
  return (
    jt()
      ? ne.emit(0, e, t)
      : (ur.push({ content: e, options: t }),
        cr &&
          Xn &&
          ((cr = !1),
          (ot = document.createElement("div")),
          document.body.appendChild(ot),
          tn.render(k.createElement(ra, Object.assign({}, na)), ot))),
    t.toastId
  );
}
function Xe(e, t) {
  return Ie({}, t, { type: (t && t.type) || e, toastId: ou(t) });
}
var F = function (t, r) {
  return Pe(t, Xe(De.DEFAULT, r));
};
F.success = function (e, t) {
  return Pe(e, Xe(De.SUCCESS, t));
};
F.info = function (e, t) {
  return Pe(e, Xe(De.INFO, t));
};
F.error = function (e, t) {
  return Pe(e, Xe(De.ERROR, t));
};
F.warning = function (e, t) {
  return Pe(e, Xe(De.WARNING, t));
};
F.dark = function (e, t) {
  return Pe(e, Xe(De.DARK, t));
};
F.warn = F.warning;
F.dismiss = function (e) {
  return jt() && ne.emit(1, e);
};
F.clearWaitingQueue = function (e) {
  return e === void 0 && (e = {}), jt() && ne.emit(5, e);
};
F.isActive = function (e) {
  var t = !1;
  return (
    Ke.forEach(function (r) {
      r.isToastActive && r.isToastActive(e) && (t = !0);
    }),
    t
  );
};
F.update = function (e, t) {
  t === void 0 && (t = {}),
    setTimeout(function () {
      var r = iu(e, t);
      if (r) {
        var n = r.props,
          a = r.content,
          s = Ie({}, n, t, { toastId: t.toastId || e, updateId: aa() });
        s.toastId !== e && (s.staleId = e);
        var i = typeof s.render < "u" ? s.render : a;
        delete s.render, Pe(i, s);
      }
    }, 0);
};
F.done = function (e) {
  F.update(e, { progress: 1 });
};
F.onChange = function (e) {
  return (
    z(e) && ne.on(4, e),
    function () {
      z(e) && ne.off(4, e);
    }
  );
};
F.configure = function (e) {
  e === void 0 && (e = {}), (cr = !0), (na = e);
};
F.POSITION = Qn;
F.TYPE = De;
ne.on(2, function (e) {
  (lr = e.containerId || e),
    Ke.set(lr, e),
    ur.forEach(function (t) {
      ne.emit(0, t.content, t.options);
    }),
    (ur = []);
}).on(3, function (e) {
  Ke.delete(e.containerId || e),
    Ke.size === 0 && ne.off(0).off(1).off(5),
    Xn && ot && document.body.removeChild(ot);
});
const sa = "%[a-f0-9]{2}",
  Jr = new RegExp("(" + sa + ")|([^%]+?)", "gi"),
  Xr = new RegExp("(" + sa + ")+", "gi");
function dr(e, t) {
  try {
    return [decodeURIComponent(e.join(""))];
  } catch {}
  if (e.length === 1) return e;
  t = t || 1;
  const r = e.slice(0, t),
    n = e.slice(t);
  return Array.prototype.concat.call([], dr(r), dr(n));
}
function lu(e) {
  try {
    return decodeURIComponent(e);
  } catch {
    let t = e.match(Jr) || [];
    for (let r = 1; r < t.length; r++)
      (e = dr(t, r).join("")), (t = e.match(Jr) || []);
    return e;
  }
}
function uu(e) {
  const t = { "%FE%FF": "��", "%FF%FE": "��" };
  let r = Xr.exec(e);
  for (; r; ) {
    try {
      t[r[0]] = decodeURIComponent(r[0]);
    } catch {
      const a = lu(r[0]);
      a !== r[0] && (t[r[0]] = a);
    }
    r = Xr.exec(e);
  }
  t["%C2"] = "�";
  const n = Object.keys(t);
  for (const a of n) e = e.replace(new RegExp(a, "g"), t[a]);
  return e;
}
function cu(e) {
  if (typeof e != "string")
    throw new TypeError(
      "Expected `encodedURI` to be of type `string`, got `" + typeof e + "`"
    );
  try {
    return decodeURIComponent(e);
  } catch {
    return uu(e);
  }
}
function du(e, t) {
  const r = {};
  if (Array.isArray(t))
    for (const n of t) {
      const a = Object.getOwnPropertyDescriptor(e, n);
      a != null && a.enumerable && Object.defineProperty(r, n, a);
    }
  else
    for (const n of Reflect.ownKeys(e)) {
      const a = Object.getOwnPropertyDescriptor(e, n);
      if (a.enumerable) {
        const s = e[n];
        t(n, s, e) && Object.defineProperty(r, n, a);
      }
    }
  return r;
}
function ia(e, t) {
  if (!(typeof e == "string" && typeof t == "string"))
    throw new TypeError("Expected the arguments to be of type `string`");
  if (e === "" || t === "") return [];
  const r = e.indexOf(t);
  return r === -1 ? [] : [e.slice(0, r), e.slice(r + t.length)];
}
const fu = (e) => e == null,
  hu = (e) =>
    encodeURIComponent(e).replaceAll(
      /[!'()*]/g,
      (t) => `%${t.charCodeAt(0).toString(16).toUpperCase()}`
    ),
  fr = Symbol("encodeFragmentIdentifier");
function _u(e) {
  switch (e.arrayFormat) {
    case "index":
      return (t) => (r, n) => {
        const a = r.length;
        return n === void 0 ||
          (e.skipNull && n === null) ||
          (e.skipEmptyString && n === "")
          ? r
          : n === null
          ? [...r, [L(t, e), "[", a, "]"].join("")]
          : [...r, [L(t, e), "[", L(a, e), "]=", L(n, e)].join("")];
      };
    case "bracket":
      return (t) => (r, n) =>
        n === void 0 ||
        (e.skipNull && n === null) ||
        (e.skipEmptyString && n === "")
          ? r
          : n === null
          ? [...r, [L(t, e), "[]"].join("")]
          : [...r, [L(t, e), "[]=", L(n, e)].join("")];
    case "colon-list-separator":
      return (t) => (r, n) =>
        n === void 0 ||
        (e.skipNull && n === null) ||
        (e.skipEmptyString && n === "")
          ? r
          : n === null
          ? [...r, [L(t, e), ":list="].join("")]
          : [...r, [L(t, e), ":list=", L(n, e)].join("")];
    case "comma":
    case "separator":
    case "bracket-separator": {
      const t = e.arrayFormat === "bracket-separator" ? "[]=" : "=";
      return (r) => (n, a) =>
        a === void 0 ||
        (e.skipNull && a === null) ||
        (e.skipEmptyString && a === "")
          ? n
          : ((a = a === null ? "" : a),
            n.length === 0
              ? [[L(r, e), t, L(a, e)].join("")]
              : [[n, L(a, e)].join(e.arrayFormatSeparator)]);
    }
    default:
      return (t) => (r, n) =>
        n === void 0 ||
        (e.skipNull && n === null) ||
        (e.skipEmptyString && n === "")
          ? r
          : n === null
          ? [...r, L(t, e)]
          : [...r, [L(t, e), "=", L(n, e)].join("")];
  }
}
function mu(e) {
  let t;
  switch (e.arrayFormat) {
    case "index":
      return (r, n, a) => {
        if (((t = /\[(\d*)]$/.exec(r)), (r = r.replace(/\[\d*]$/, "")), !t)) {
          a[r] = n;
          return;
        }
        a[r] === void 0 && (a[r] = {}), (a[r][t[1]] = n);
      };
    case "bracket":
      return (r, n, a) => {
        if (((t = /(\[])$/.exec(r)), (r = r.replace(/\[]$/, "")), !t)) {
          a[r] = n;
          return;
        }
        if (a[r] === void 0) {
          a[r] = [n];
          return;
        }
        a[r] = [...a[r], n];
      };
    case "colon-list-separator":
      return (r, n, a) => {
        if (((t = /(:list)$/.exec(r)), (r = r.replace(/:list$/, "")), !t)) {
          a[r] = n;
          return;
        }
        if (a[r] === void 0) {
          a[r] = [n];
          return;
        }
        a[r] = [...a[r], n];
      };
    case "comma":
    case "separator":
      return (r, n, a) => {
        const s = typeof n == "string" && n.includes(e.arrayFormatSeparator),
          i =
            typeof n == "string" &&
            !s &&
            _e(n, e).includes(e.arrayFormatSeparator);
        n = i ? _e(n, e) : n;
        const o =
          s || i
            ? n.split(e.arrayFormatSeparator).map((l) => _e(l, e))
            : n === null
            ? n
            : _e(n, e);
        a[r] = o;
      };
    case "bracket-separator":
      return (r, n, a) => {
        const s = /(\[])$/.test(r);
        if (((r = r.replace(/\[]$/, "")), !s)) {
          a[r] = n && _e(n, e);
          return;
        }
        const i = n === null ? [] : _e(n, e).split(e.arrayFormatSeparator);
        if (a[r] === void 0) {
          a[r] = i;
          return;
        }
        a[r] = [...a[r], ...i];
      };
    default:
      return (r, n, a) => {
        if (a[r] === void 0) {
          a[r] = n;
          return;
        }
        a[r] = [...[a[r]].flat(), n];
      };
  }
}
function oa(e) {
  if (typeof e != "string" || e.length !== 1)
    throw new TypeError("arrayFormatSeparator must be single character string");
}
function L(e, t) {
  return t.encode ? (t.strict ? hu(e) : encodeURIComponent(e)) : e;
}
function _e(e, t) {
  return t.decode ? cu(e) : e;
}
function la(e) {
  return Array.isArray(e)
    ? e.sort()
    : typeof e == "object"
    ? la(Object.keys(e))
        .sort((t, r) => Number(t) - Number(r))
        .map((t) => e[t])
    : e;
}
function ua(e) {
  const t = e.indexOf("#");
  return t !== -1 && (e = e.slice(0, t)), e;
}
function pu(e) {
  let t = "";
  const r = e.indexOf("#");
  return r !== -1 && (t = e.slice(r)), t;
}
function Qr(e, t, r) {
  return r === "string" && typeof e == "string"
    ? e
    : typeof r == "function" && typeof e == "string"
    ? r(e)
    : t.parseBooleans &&
      e !== null &&
      (e.toLowerCase() === "true" || e.toLowerCase() === "false")
    ? e.toLowerCase() === "true"
    : (r === "number" &&
        !Number.isNaN(Number(e)) &&
        typeof e == "string" &&
        e.trim() !== "") ||
      (t.parseNumbers &&
        !Number.isNaN(Number(e)) &&
        typeof e == "string" &&
        e.trim() !== "")
    ? Number(e)
    : e;
}
function Lr(e) {
  e = ua(e);
  const t = e.indexOf("?");
  return t === -1 ? "" : e.slice(t + 1);
}
function Wr(e, t) {
  (t = {
    decode: !0,
    sort: !0,
    arrayFormat: "none",
    arrayFormatSeparator: ",",
    parseNumbers: !1,
    parseBooleans: !1,
    types: Object.create(null),
    ...t,
  }),
    oa(t.arrayFormatSeparator);
  const r = mu(t),
    n = Object.create(null);
  if (typeof e != "string" || ((e = e.trim().replace(/^[?#&]/, "")), !e))
    return n;
  for (const a of e.split("&")) {
    if (a === "") continue;
    const s = t.decode ? a.replaceAll("+", " ") : a;
    let [i, o] = ia(s, "=");
    i === void 0 && (i = s),
      (o =
        o === void 0
          ? null
          : ["comma", "separator", "bracket-separator"].includes(t.arrayFormat)
          ? o
          : _e(o, t)),
      r(_e(i, t), o, n);
  }
  for (const [a, s] of Object.entries(n))
    if (typeof s == "object" && s !== null && t.types[a] !== "string")
      for (const [i, o] of Object.entries(s)) {
        const l = t.types[a] ? t.types[a].replace("[]", "") : void 0;
        s[i] = Qr(o, t, l);
      }
    else
      typeof s == "object" && s !== null && t.types[a] === "string"
        ? (n[a] = Object.values(s).join(t.arrayFormatSeparator))
        : (n[a] = Qr(s, t, t.types[a]));
  return t.sort === !1
    ? n
    : (t.sort === !0
        ? Object.keys(n).sort()
        : Object.keys(n).sort(t.sort)
      ).reduce((a, s) => {
        const i = n[s];
        return (
          (a[s] = i && typeof i == "object" && !Array.isArray(i) ? la(i) : i), a
        );
      }, Object.create(null));
}
function ca(e, t) {
  if (!e) return "";
  (t = {
    encode: !0,
    strict: !0,
    arrayFormat: "none",
    arrayFormatSeparator: ",",
    ...t,
  }),
    oa(t.arrayFormatSeparator);
  const r = (i) =>
      (t.skipNull && fu(e[i])) || (t.skipEmptyString && e[i] === ""),
    n = _u(t),
    a = {};
  for (const [i, o] of Object.entries(e)) r(i) || (a[i] = o);
  const s = Object.keys(a);
  return (
    t.sort !== !1 && s.sort(t.sort),
    s
      .map((i) => {
        const o = e[i];
        return o === void 0
          ? ""
          : o === null
          ? L(i, t)
          : Array.isArray(o)
          ? o.length === 0 && t.arrayFormat === "bracket-separator"
            ? L(i, t) + "[]"
            : o.reduce(n(i), []).join("&")
          : L(i, t) + "=" + L(o, t);
      })
      .filter((i) => i.length > 0)
      .join("&")
  );
}
function da(e, t) {
  var a;
  t = { decode: !0, ...t };
  let [r, n] = ia(e, "#");
  return (
    r === void 0 && (r = e),
    {
      url:
        ((a = r == null ? void 0 : r.split("?")) == null ? void 0 : a[0]) ?? "",
      query: Wr(Lr(e), t),
      ...(t && t.parseFragmentIdentifier && n
        ? { fragmentIdentifier: _e(n, t) }
        : {}),
    }
  );
}
function fa(e, t) {
  t = { encode: !0, strict: !0, [fr]: !0, ...t };
  const r = ua(e.url).split("?")[0] || "",
    n = Lr(e.url),
    a = { ...Wr(n, { sort: !1 }), ...e.query };
  let s = ca(a, t);
  s && (s = `?${s}`);
  let i = pu(e.url);
  if (typeof e.fragmentIdentifier == "string") {
    const o = new URL(r);
    (o.hash = e.fragmentIdentifier),
      (i = t[fr] ? o.hash : `#${e.fragmentIdentifier}`);
  }
  return `${r}${s}${i}`;
}
function ha(e, t, r) {
  r = { parseFragmentIdentifier: !0, [fr]: !1, ...r };
  const { url: n, query: a, fragmentIdentifier: s } = da(e, r);
  return fa({ url: n, query: du(a, t), fragmentIdentifier: s }, r);
}
function gu(e, t, r) {
  const n = Array.isArray(t) ? (a) => !t.includes(a) : (a, s) => !t(a, s);
  return ha(e, n, r);
}
const _a = Object.freeze(
  Object.defineProperty(
    {
      __proto__: null,
      exclude: gu,
      extract: Lr,
      parse: Wr,
      parseUrl: da,
      pick: ha,
      stringify: ca,
      stringifyUrl: fa,
    },
    Symbol.toStringTag,
    { value: "Module" }
  )
);
var yu = {
  BASE_URL: "/",
  DEV: !1,
  MODE: "production",
  PROD: !0,
  SSR: !1,
  VITE_APPLICATION_MODE: "prod",
};
const Ur = (e) => e[Math.floor(Math.random() * e.length)],
  vu = () => Ur(Pr),
  wu = () => Ur(Pr) + "/socket.io",
  bu = (e) => Object.keys(e),
  ku = (e, t, r) => Ra.findBestMatch(e, t).bestMatch.rating > (r || 0.42),
  Su = ({ arr: e, id: t, key: r, value: n, push: a, updateAt: s }) => {
    const i = e.filter((l) => l.id === t),
      o = e.findIndex((l) => l.id === t);
    i.length === 0 ? a({ id: t, [r]: n }) : s(o, { ...i[0], [r]: n });
  },
  hr = (e, t) =>
    t === "string"
      ? typeof e == "string"
        ? e
        : JSON.stringify(e)
      : t === "number"
      ? typeof e == "number"
        ? e
        : parseFloat(e)
      : e,
  Ou = (e, t, r) => {
    if (e && (typeof e === t || t === "any")) {
      if (r === "number") return Number(e);
      if (r === "string") return e.toString();
      if (r === "decimal") return va(e);
    } else return e;
  },
  Tu = (e) => {
    for (
      var t =
          "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split(
            ""
          ),
        r = [],
        n = 0;
      n < e;
      n++
    ) {
      var a = (Math.random() * (t.length - 1)).toFixed(0);
      r[n] = t[a];
    }
    return r.join("");
  },
  Mu = (e) =>
    e === "XL" || e === "LG" || e === "MD" || e === "SM" || e === "XS",
  Du = () => {
    var e = !1;
    return (
      (function (t) {
        (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
          t
        ) ||
          /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
            t.substr(0, 4)
          ) ||
          (window.innerWidth <= 800 && window.innerHeight <= 600)) &&
          (e = !0);
      })(navigator.userAgent || navigator.vendor || window.opera),
      e
    );
  },
  Eu = (e = 47, t = {}) => ({
    png: { quality: e },
    jpeg: { quality: e },
    jpg: { quality: e },
    webp: { lossless: !0 },
    gif: { quality: e },
    ...t,
  }),
  Cu = (e) => (typeof e != "object" ? !1 : Object.keys(e).length !== 0),
  xu = (e, t = 300) => {
    let r;
    return (...n) => {
      clearTimeout(r),
        (r = setTimeout(() => {
          e.apply(void 0, n);
        }, t));
    };
  },
  Nu = (e, t) => JSON.stringify(e) == JSON.stringify(t),
  Yu = (e, t = []) => {
    const r = Object.keys(e);
    for (const n of t) r.filter((s) => s === n).length >= 1 && delete e[n];
    return e;
  },
  ma = (e, t) => typeof e === t,
  Ru = (e) => yu[e],
  Iu = (e) => {
    e = e.toString();
    let t = /(-?\d+)(\d{3})/;
    for (; t.test(e); ) e = e.replace(t, "$1,$2");
    return e;
  },
  Au = (e, t, r) => r.indexOf(e) === t,
  Pu = async ({ data: e, filterValue: t }) =>
    await e.filter((n) =>
      Object.keys(n).some((a) =>
        n[a].toString().toLowerCase().includes(t.toString().toLowerCase())
      )
    ),
  Fu = (e, t) => d(e).format(t || "DD/MM/YYYY"),
  Bt = new Date(),
  pa = Bt.getDate(),
  ga = Bt.getMonth() + 1,
  ya = Bt.getFullYear(),
  Lu = `${ya}-${ga}-${pa}`,
  Wu = new Date().toJSON().slice(0, 10),
  Uu = new Date(+new Date().setHours(0, 0, 0, 0) + 864e5),
  Hu = new Date(
    Date.now() -
      2 * 864e5 -
      new Date(Date.now() - 2 * 864e5).getTimezoneOffset() * 6e4
  ),
  ju = new Date(
    Date.now() -
      8 * 864e5 -
      new Date(Date.now() - 8 * 864e5).getTimezoneOffset() * 6e4
  ),
  Bu = () =>
    new Date(+new Date().setHours(0, 0, 0, 0) + 864e5).toLocaleDateString(
      "fr-CA"
    ),
  Gu = (e, t) =>
    e === "CRICKET"
      ? 4
      : e === "SOCCER"
      ? 1
      : e === "TENNIS"
      ? 2
      : e === "BINARY"
      ? 5
      : e === "POLITICS"
      ? 6
      : e === 4 && t
      ? "CRICKET"
      : e === 1 && t
      ? "SOCCER"
      : e === 2 && t
      ? "TENNIS"
      : e === 5 && t
      ? "BINARY"
      : e === 6 && t
      ? "POLITICS"
      : t
      ? "All"
      : 100,
  Hr = (e = null) =>
    typeof window < "u" ? (e ? document.location[e] : document.location) : null,
  Vu = (e) => `${Hr("origin")}/pub-images/${e}`,
  $u = (e, t = !1) =>
    t
      ? `https://whmqa46vk1bnfgsw.public.blob.vercel-storage.com/${e}`
      : `https://eszmcd97arxdgqhx.public.blob.vercel-storage.com/pub-images/${e}`,
  zu = (e) => window.open(e, "_blank"),
  Ku = () => window.location !== window.parent.location,
  va = (e) => {
    if (!e) return 0;
    let t = e || "";
    if ((ma(e, "string") || (t = JSON.stringify(e)), t.includes("."))) {
      const r = t.indexOf(".");
      t = t.substring(0, r + 3);
    }
    return Number(t);
  },
  qu = (e) => e[0].toUpperCase() + e.slice(1).toLowerCase(),
  Zu = ({
    updatedBetRecordsData: e = [],
    teamName: t = null,
    clientId: r = "",
  }) => {
    let n = {},
      a = {},
      s = 0;
    const o = 0 - 1,
      l = e.length === 0,
      c = e.find((g) => g.id === t && g.isActive === 1);
    if (((a[r] = (a[r] || 0) + 1), l === !1)) {
      c && ((c.profitLoss += s * o), (c.betCounter = [a[r]]));
      for (let g of e) g.id !== t && g.isActive === 1 && (g.profitLoss -= s);
    } else {
      c &&
        ((c.profitLoss += s * o),
        c.betCounter ? c.betCounter.push(a[r]) : (c.betCounter = [a[r]]));
      for (let g of e) g.id !== t && g.isActive === 1 && (g.profitLoss -= s);
    }
    return (
      ((g, y) => {
        n[g] || (n[g] = []), n[g].push(y);
      })(r, c),
      e
    );
  },
  Ju = ({
    type: e,
    autoClose: t,
    title: r = null,
    closeOnClick: n,
    darkMode: a,
    bodyStyle: s = {},
  }) => {
    const i = {
      position: "top-right",
      autoClose: t || 5e3,
      hideProgressBar: !1,
      closeOnClick: n || !0,
      pauseOnHover: !0,
      draggable: !0,
      progress: void 0,
      theme: a ? "dark" : "light",
      bodyStyle: s,
    };
    e === "success" && F.success(r || "Success", i),
      e === "error" && F.error(r || "Something went wrong", i),
      e === "warn" && F.warn(r, i),
      e === "info" && F.info(r, i);
  },
  Xu = (e, t) => {
    const r = hr(e, "number"),
      n = hr(t, "number");
    return ((r / n) * 100).toFixed(2);
  },
  Qu = Hr("host"),
  ec = (e, t, r) => ({
    total: e,
    per_page: r,
    current_page: t,
    last_page: Math.ceil(e / r),
    from: (t - 1) * r + 1,
    to: t * r,
  }),
  tc = (e) => e === "XS" || e === "SM" || e === "MD",
  rc = (e, t) => `${e}?${_a.stringify(t)}`,
  nc = (e) => _a.parse(e),
  ac = ({ upiId: e, yourName: t = "", paymentApp: r = "" }) =>
    `upi://pay?pa=${r}${e}&pn=${t}&tn=undefined&am=undefined`,
  sc = (e) => e == 1,
  ic = (e) =>
    !e || e == 0
      ? "0.00"
      : parseFloat(e) < 0
      ? `(${Math.abs(parseFloat(e)).toFixed(2)})`
      : parseFloat(e).toFixed(2),
  oc = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        capitalizeFirstLetter: qu,
        checkStrVsStr: ku,
        compareArrOrObj: Nu,
        currentDate: Lu,
        currentDateString: Wu,
        date: Bt,
        day: pa,
        debounce: xu,
        detectIsMobile: Du,
        domain: Qu,
        exposurePremiumLogic: Zu,
        fixValue: hr,
        generate_token: Tu,
        getEnv: Ru,
        getJsLocation: Hr,
        getPublicImage: Vu,
        getSportKeyOrName: Gu,
        getVercelImage: $u,
        isDeviceIsSmall: tc,
        isWhatPercentOf: Xu,
        last7DayDate: ju,
        momentDateFilter: Fu,
        month: ga,
        negativeBracket: ic,
        notifyToast: Ju,
        numberWithCommas: Iu,
        objIsNotEmpty: Cu,
        objToArr: bu,
        objToSearchParamsLink: rc,
        onlyUniqueItem: Au,
        openLink: zu,
        pageInIframe: Ku,
        pagination: ec,
        pushAndUpdateReUseArrListObjValue: Su,
        randomSelectArrayItem: Ur,
        removeKeyOrValueFromObj: Yu,
        searchFilter: Pu,
        searchParamsToObj: nc,
        smallDevices: Mu,
        socketEndPoint: vu,
        socketPath: wu,
        toFix: va,
        tomorrow: Bu,
        tomorrow2: Uu,
        typeCheck: ma,
        typeFix: Ou,
        upiLinkGen: ac,
        viteImageOptimizeSizeReduce: Eu,
        year: ya,
        yesterdayDate: Hu,
        zeroOneToBoolean: sc,
      },
      Symbol.toStringTag,
      { value: "Module" }
    )
  );
var lc = {},
  Gt = {};
Object.defineProperty(Gt, "__esModule", { value: !0 });
Gt.default = void 0;
var en = uc(k),
  Jt = rn;
function uc(e) {
  return e && e.__esModule ? e : { default: e };
}
const cc = (e) => {
  let { children: t, theme: r = {}, injectColorModeScript: n = !1 } = e;
  const a = (0, Jt.extendTheme)(r);
  return en.default.createElement(
    Jt.ChakraProvider,
    { theme: a },
    n &&
      en.default.createElement(Jt.ColorModeScript, {
        initialColorMode: a.config.initialColorMode,
      }),
    t
  );
};
Gt.default = cc;
var Vt = {};
const dc = Ma(oc);
Object.defineProperty(Vt, "__esModule", { value: !0 });
Vt.useChakraToast = void 0;
hc(k);
var fc = rn,
  Xt = dc;
function hc(e) {
  return e && e.__esModule ? e : { default: e };
}
const _c = () => {
  const e = (0, fc.useToast)(),
    t = {
      containerStyle: {color: "white.100" },
      duration: 3e3,
      isClosable: !0,
      status: "error",
      position: "top-right",
    };
  return {
    showToast: function () {
      let a =
        arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      return e({ ...t, title: a.title || "Something went wrong", ...a });
    },
    showPromiseToast: function (a) {
      let s =
        arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      return e.promise(a, {
        ...((0, Xt.objIsNotEmpty)(s.success)
          ? { success: { ...t, status: "success", ...s.success } }
          : {}),
        ...((0, Xt.objIsNotEmpty)(s.error)
          ? { error: { ...t, status: "error", ...s.error } }
          : {}),
        ...((0, Xt.objIsNotEmpty)(s.loading)
          ? { loading: { ...t, status: "loading", ...s.loading } }
          : {}),
      });
    },
  };
};
Vt.useChakraToast = _c;
var b = {},
  wa,
  ba,
  ka,
  Sa,
  Oa;
Object.defineProperty(b, "__esModule", { value: !0 });
b.whiteBold =
  b.textEllipsis =
  b.shadowInTop =
  Oa =
  b.shadowIn1 =
  b.primaryTableTableContainer =
  b.primaryTableBorderRight =
  b.primary80Border =
  b.primary100Border =
  b.positionAT0L0 =
  Sa =
  b.pageHw =
  b.levelWiseColor =
  b.imgW100FitCover =
  b.imgW100FitContain =
  b.hw100P =
  ka =
  b.dFlexJSB =
  ba =
  b.dFlexJCenter =
  wa =
  b.dFlexAllCenter =
  b.dFlexACenter =
  b.border1 =
    void 0;
const mc =
    (ba =
    b.dFlexJCenter =
      { display: "flex", justifyContent: "center" }),
  pc = (b.dFlexACenter = { display: "flex", alignItems: "center" });
ka = b.dFlexJSB = { display: "flex", justifyContent: "space-between" };
wa = b.dFlexAllCenter = { ...mc, ...pc };
b.hw100P = { w: "100%", h: "100%" };
Sa = b.pageHw = { w: "100%", minH: "100%", maxH: "max-content" };
b.border1 = { borderStyle: "solid", borderWidth: 1 };
b.primary100Border = { borderStyle: "solid", borderColor: "primary.100" };
b.primary80Border = { borderStyle: "solid", borderColor: "primary.80" };
b.positionAT0L0 = { position: "absolute", top: 0, left: 0 };
b.textEllipsis = {
  w: "100%",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  overflow: "hidden",
};
b.whiteBold = {color: "white.100", fontWeight: "bold" };
b.imgW100FitCover = { boxSize: "100%", objectFit: "unset" };
b.imgW100FitContain = { boxSize: "100%", objectFit: "contain" };
Oa = b.shadowIn1 = {
  boxShadow:
    "0 2.1333333333vw 2.6666666667vw color-mix(in srgb,var(--chakra-colors-white-02),transparent 70%),inset .2666666667vw .2666666667vw color-mix(in srgb,var(--chakra-colors-white-100),transparent 80%)",
};
b.shadowInTop = {
  boxShadow:
    "inset 0 .2666666667vw .2666666667vw color-mix(in srgb,var(--chakra-colors-white-100),transparent 80%)",
};
b.primaryTableTableContainer = {border: "1px",
  borderColor: "primary.100",
  rounded: "lg",
  position: "relative",
};
b.primaryTableBorderRight = {
  borderRight: "1px",
  borderColor: "primary.100",
  borderBottom: 0,
};
const gc = function () {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "bg",
    t = arguments.length > 1 ? arguments[1] : void 0,
    r = "";
  return (
    t === 0
      ? (r = "grey")
      : t === 1
      ? (r = "orange")
      : t === 2
      ? (r = "purple")
      : t === 3
      ? (r = "green")
      : t === 4
      ? (r = "darkorange")
      : t === 5
      ? (r = "blue")
      : t === 6 && (r = "yellowgreen"),
    { [e]: r }
  );
};
b.levelWiseColor = gc;
(function (e) {
  Object.defineProperty(e, "__esModule", { value: !0 }),
    Object.defineProperty(e, "ChakraProvider", {
      enumerable: !0,
      get: function () {
        return t.default;
      },
    }),
    (e.chakraStyle = void 0),
    Object.defineProperty(e, "useChakraToast", {
      enumerable: !0,
      get: function () {
        return r.useChakraToast;
      },
    });
  var t = i(Gt),
    r = Vt,
    n = s(b);
  e.chakraStyle = n;
  function a(o) {
    if (typeof WeakMap != "function") return null;
    var l = new WeakMap(),
      c = new WeakMap();
    return (a = function (f) {
      return f ? c : l;
    })(o);
  }
  function s(o, l) {
    if (o && o.__esModule) return o;
    if (o === null || (typeof o != "object" && typeof o != "function"))
      return { default: o };
    var c = a(l);
    if (c && c.has(o)) return c.get(o);
    var f = { __proto__: null },
      g = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var y in o)
      if (y !== "default" && {}.hasOwnProperty.call(o, y)) {
        var W = g ? Object.getOwnPropertyDescriptor(o, y) : null;
        W && (W.get || W.set) ? Object.defineProperty(f, y, W) : (f[y] = o[y]);
      }
    return (f.default = o), c && c.set(o, f), f;
  }
  function i(o) {
    return o && o.__esModule ? o : { default: o };
  }
})(lc);
const kc = {
  leftToRight: {
    initial: { x: "-100%" },
    animate: { x: 0 },
    exit: { x: "-100%" },
    transition: { ease: "easeInOut" },
  },
  rightToLeft: {
    initial: { x: "100%" },
    animate: { x: 0 },
    exit: { x: "100%" },
    transition: { ease: "easeInOut" },
  },
  topToBottom: {
    initial: { y: "-100%" },
    animate: { y: 0 },
    exit: { y: "-100%" },
    transition: { ease: "easeInOut" },
  },
  bottomToTop: {
    initial: { y: "100%" },
    animate: { y: 0 },
    exit: { y: "100%" },
    transition: { ease: "easeInOut" },
  },
  leftToRightOpacity: {
    initial: { x: "-100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "-100%", opacity: 0 },
    transition: { ease: "easeInOut" },
  },
  rightToLeftOpacity: {
    initial: { x: "100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "100%", opacity: 0 },
    transition: { ease: "easeInOut" },
  },
  topToBottomOpacity: {
    initial: { y: "-100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "-100%", opacity: 0 },
    transition: { ease: "easeInOut" },
  },
  bottomToTopOpacity: {
    initial: { y: "100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "100%", opacity: 0 },
    transition: { ease: "easeInOut" },
  },
  opacity: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { ease: "easeInOut", duration: 0.5 },
  },
  zeroToHero: {
    initial: { scale: 0 },
    animate: { scale: 1 },
    exit: { scale: 0 },
    transition: { ease: "easeInOut", duration: 0.3 },
  },
};
export {
  Fl as A,
  Ll as B,
  wu as C,
  Oa as D,
  Vu as E,
  Sa as F,
  ba as G,
  Bt as H,
  Uu as I,
  Hu as J,
  ju as K,
  wa as L,
  Fu as M,
  ka as N,
  Gu as O,
  Hr as a,
  Ku as b,
  ku as c,
  Du as d,
  Ca as e,
  lc as f,
  Ru as g,
  bc as h,
  Ul as i,
  d as j,
  Tu as k,
  hr as l,
  Yu as m,
  He as n,
  Cu as o,
  Bl as p,
  wc as q,
  dc as r,
  Pl as s,
  ma as t,
  kc as u,
  Su as v,
  jl as w,
  Nu as x,
  qu as y,
  sc as z,
};

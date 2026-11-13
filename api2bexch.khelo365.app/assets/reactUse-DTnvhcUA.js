import { r as f, g as we, a as ir, R as cr } from "./router-Ua64hkZi.js";
import {
  b as C,
  d as I,
  w as fr,
  e as sr,
  t as lr,
} from "./chakra-mpaYxI_z.js";
var vr = function (e) {
  return function () {
    for (var r = [], n = 0; n < arguments.length; n++) r[n] = arguments[n];
    return f.useMemo(function () {
      return e.apply(void 0, r);
    }, r);
  };
};
const dr = vr;
var hr = function (e, r) {
  var n = f.createContext(void 0),
    t = function (u, i) {
      return f.createElement(n.Provider, u, i);
    },
    a = function (u) {
      var i = u.children,
        c = u.initialState,
        s = f.useReducer(e, c !== void 0 ? c : r);
      return t({ value: s }, i);
    },
    o = function () {
      var u = f.useContext(n);
      if (u == null)
        throw new Error(
          "useReducerContext must be used inside a ReducerProvider."
        );
      return u;
    };
  return [o, a, n];
};
const gr = hr;
function ae() {
  var e = f.useRef(!0);
  return e.current ? ((e.current = !1), !0) : e.current;
}
var V = function (e, r) {
  var n = ae();
  f.useEffect(function () {
    if (!n) return e();
  }, r);
};
function mr(e) {
  return function (r, n) {
    return e.reduceRight(function (t, a) {
      return a(r)(t);
    }, n);
  };
}
var pr = function () {
  for (var e = [], r = 0; r < arguments.length; r++) e[r] = arguments[r];
  var n = mr(e);
  return function (t, a, o) {
    o === void 0 &&
      (o = function (v) {
        return v;
      });
    var u = f.useRef(o(a)),
      i = f.useState(u.current),
      c = i[1],
      s = f.useCallback(
        function (v) {
          return (u.current = t(u.current, v)), c(u.current), v;
        },
        [t]
      ),
      l = f.useRef(
        n(
          {
            getState: function () {
              return u.current;
            },
            dispatch: function () {
              for (var v = [], d = 0; d < arguments.length; d++)
                v[d] = arguments[d];
              return l.current.apply(l, v);
            },
          },
          s
        )
      );
    return (
      V(
        function () {
          l.current = n(
            {
              getState: function () {
                return u.current;
              },
              dispatch: function () {
                for (var v = [], d = 0; d < arguments.length; d++)
                  v[d] = arguments[d];
                return l.current.apply(l, v);
              },
            },
            s
          );
        },
        [s]
      ),
      [u.current, l.current]
    );
  };
};
const wr = pr;
var yr = function (e) {
  var r = f.createContext(void 0),
    n = function (o, u) {
      return f.createElement(r.Provider, o, u);
    },
    t = function (o) {
      var u = o.children,
        i = o.initialValue,
        c = f.useState(i !== void 0 ? i : e);
      return n({ value: c }, u);
    },
    a = function () {
      var o = f.useContext(r);
      if (o == null)
        throw new Error("useStateContext must be used inside a StateProvider.");
      return o;
    };
  return [a, t, r];
};
const Sr = yr;
function q() {
  var e = f.useRef(!1),
    r = f.useCallback(function () {
      return e.current;
    }, []);
  return (
    f.useEffect(function () {
      return (
        (e.current = !0),
        function () {
          e.current = !1;
        }
      );
    }, []),
    r
  );
}
function We(e, r, n) {
  r === void 0 && (r = []), n === void 0 && (n = { loading: !1 });
  var t = f.useRef(0),
    a = q(),
    o = f.useState(n),
    u = o[0],
    i = o[1],
    c = f.useCallback(function () {
      for (var s = [], l = 0; l < arguments.length; l++) s[l] = arguments[l];
      var v = ++t.current;
      return (
        u.loading ||
          i(function (d) {
            return C(C({}, d), { loading: !0 });
          }),
        e.apply(void 0, s).then(
          function (d) {
            return a() && v === t.current && i({ value: d, loading: !1 }), d;
          },
          function (d) {
            return a() && v === t.current && i({ error: d, loading: !1 }), d;
          }
        )
      );
    }, r);
  return [u, c];
}
function je(e, r) {
  r === void 0 && (r = []);
  var n = We(e, r, { loading: !0 }),
    t = n[0],
    a = n[1];
  return (
    f.useEffect(
      function () {
        a();
      },
      [a]
    ),
    t
  );
}
var Er = function (e, r) {
  r === void 0 && (r = []);
  var n = f.useState(0),
    t = n[0],
    a = n[1],
    o = je(e, I(r, [t])),
    u = o.loading,
    i = f.useCallback(function () {
      u ||
        a(function (c) {
          return c + 1;
        });
    }, I(r, [u]));
  return C(C({}, o), { retry: i });
};
const br = Er;
var ie = function (e) {
  e === void 0 && (e = {});
  var r = f.useState(e),
    n = r[0],
    t = r[1],
    a = f.useCallback(function (o) {
      t(function (u) {
        return Object.assign({}, u, o instanceof Function ? o(u) : o);
      });
    }, []);
  return [n, a];
};
function Ce(e) {
  for (var r = [], n = 0; n < e.length; n++)
    r.push({ start: e.start(n), end: e.end(n) });
  return r;
}
function Be(e) {
  return function (r) {
    var n, t;
    f.isValidElement(r) ? ((n = r), (t = n.props)) : (t = r);
    var a = ie({
        buffered: [],
        time: 0,
        duration: 0,
        paused: !0,
        muted: !1,
        volume: 1,
        playing: !1,
      }),
      o = a[0],
      u = a[1],
      i = f.useRef(null),
      c = function (m, E) {
        return function (b) {
          try {
            E && E(b);
          } finally {
            m && m(b);
          }
        };
      },
      s = function () {
        return u({ paused: !1 });
      },
      l = function () {
        return u({ playing: !0 });
      },
      v = function () {
        return u({ playing: !1 });
      },
      d = function () {
        return u({ paused: !0, playing: !1 });
      },
      p = function () {
        var m = i.current;
        m && u({ muted: m.muted, volume: m.volume });
      },
      y = function () {
        var m = i.current;
        if (m) {
          var E = m.duration,
            b = m.buffered;
          u({ duration: E, buffered: Ce(b) });
        }
      },
      S = function () {
        var m = i.current;
        m && u({ time: m.currentTime });
      },
      w = function () {
        var m = i.current;
        m && u({ buffered: Ce(m.buffered) });
      };
    n
      ? (n = f.cloneElement(
          n,
          C(C({ controls: !1 }, t), {
            ref: i,
            onPlay: c(t.onPlay, s),
            onPlaying: c(t.onPlaying, l),
            onWaiting: c(t.onWaiting, v),
            onPause: c(t.onPause, d),
            onVolumeChange: c(t.onVolumeChange, p),
            onDurationChange: c(t.onDurationChange, y),
            onTimeUpdate: c(t.onTimeUpdate, S),
            onProgress: c(t.onProgress, w),
          })
        ))
      : (n = f.createElement(
          e,
          C(C({ controls: !1 }, t), {
            ref: i,
            onPlay: c(t.onPlay, s),
            onPlaying: c(t.onPlaying, l),
            onWaiting: c(t.onWaiting, v),
            onPause: c(t.onPause, d),
            onVolumeChange: c(t.onVolumeChange, p),
            onDurationChange: c(t.onDurationChange, y),
            onTimeUpdate: c(t.onTimeUpdate, S),
            onProgress: c(t.onProgress, w),
          })
        ));
    var O = !1,
      A = {
        play: function () {
          var m = i.current;
          if (m && !O) {
            var E = m.play(),
              b = typeof E == "object";
            if (b) {
              O = !0;
              var $ = function () {
                O = !1;
              };
              E.then($, $);
            }
            return E;
          }
        },
        pause: function () {
          var m = i.current;
          if (m && !O) return m.pause();
        },
        seek: function (m) {
          var E = i.current;
          !E ||
            o.duration === void 0 ||
            ((m = Math.min(o.duration, Math.max(0, m))), (E.currentTime = m));
        },
        volume: function (m) {
          var E = i.current;
          E &&
            ((m = Math.min(1, Math.max(0, m))),
            (E.volume = m),
            u({ volume: m }));
        },
        mute: function () {
          var m = i.current;
          m && (m.muted = !0);
        },
        unmute: function () {
          var m = i.current;
          m && (m.muted = !1);
        },
      };
    return (
      f.useEffect(
        function () {
          var m = i.current;
          m &&
            (u({ volume: m.volume, muted: m.muted, paused: m.paused }),
            t.autoPlay && m.paused && A.play());
        },
        [t.src]
      ),
      [n, o, A, i]
    );
  };
}
var Cr = Be("audio");
const Rr = Cr;
var M = function () {};
function g(e) {
  for (var r = [], n = 1; n < arguments.length; n++) r[n - 1] = arguments[n];
  e && e.addEventListener && e.addEventListener.apply(e, r);
}
function h(e) {
  for (var r = [], n = 1; n < arguments.length; n++) r[n - 1] = arguments[n];
  e && e.removeEventListener && e.removeEventListener.apply(e, r);
}
var x = typeof window < "u",
  ce = typeof navigator < "u",
  Mr = function e(r, n) {
    if (r === n) return !0;
    if (r && n && typeof r == "object" && typeof n == "object") {
      if (r.constructor !== n.constructor) return !1;
      var t, a, o;
      if (Array.isArray(r)) {
        if (((t = r.length), t != n.length)) return !1;
        for (a = t; a-- !== 0; ) if (!e(r[a], n[a])) return !1;
        return !0;
      }
      if (r.constructor === RegExp)
        return r.source === n.source && r.flags === n.flags;
      if (r.valueOf !== Object.prototype.valueOf)
        return r.valueOf() === n.valueOf();
      if (r.toString !== Object.prototype.toString)
        return r.toString() === n.toString();
      if (((o = Object.keys(r)), (t = o.length), t !== Object.keys(n).length))
        return !1;
      for (a = t; a-- !== 0; )
        if (!Object.prototype.hasOwnProperty.call(n, o[a])) return !1;
      for (a = t; a-- !== 0; ) {
        var u = o[a];
        if (!(u === "_owner" && r.$$typeof) && !e(r[u], n[u])) return !1;
      }
      return !0;
    }
    return r !== r && n !== n;
  };
const He = we(Mr);
var he = ce ? navigator : void 0,
  xr = he && typeof he.getBattery == "function";
function Or() {
  return { isSupported: !1 };
}
function Dr() {
  var e = f.useState({ isSupported: !0, fetched: !1 }),
    r = e[0],
    n = e[1];
  return (
    f.useEffect(function () {
      var t = !0,
        a = null,
        o = function () {
          if (!(!t || !a)) {
            var u = {
              isSupported: !0,
              fetched: !0,
              level: a.level,
              charging: a.charging,
              dischargingTime: a.dischargingTime,
              chargingTime: a.chargingTime,
            };
            !He(r, u) && n(u);
          }
        };
      return (
        he.getBattery().then(function (u) {
          t &&
            ((a = u),
            g(a, "chargingchange", o),
            g(a, "chargingtimechange", o),
            g(a, "dischargingtimechange", o),
            g(a, "levelchange", o),
            o());
        }),
        function () {
          (t = !1),
            a &&
              (h(a, "chargingchange", o),
              h(a, "chargingtimechange", o),
              h(a, "dischargingtimechange", o),
              h(a, "levelchange", o));
        }
      );
    }, []),
    r
  );
}
const Pr = xr ? Dr : Or;
var _r = function (e, r) {
  e === void 0 && (e = !0);
  var n = f.useCallback(
    function (t) {
      var a = typeof e == "function" ? e() : !0;
      if (a) return t.preventDefault(), r && (t.returnValue = r), r;
    },
    [e, r]
  );
  f.useEffect(
    function () {
      if (e)
        return (
          g(window, "beforeunload", n),
          function () {
            return h(window, "beforeunload", n);
          }
        );
    },
    [e, n]
  );
};
const Ir = _r;
var $r = function (e, r) {
    return typeof r == "boolean" ? r : !e;
  },
  Re = function (e) {
    return f.useReducer($r, e);
  },
  Tr = ["mousedown", "touchstart"],
  kr = function (e, r, n) {
    n === void 0 && (n = Tr);
    var t = f.useRef(r);
    f.useEffect(
      function () {
        t.current = r;
      },
      [r]
    ),
      f.useEffect(
        function () {
          for (
            var a = function (c) {
                var s = e.current;
                s && !s.contains(c.target) && t.current(c);
              },
              o = 0,
              u = n;
            o < u.length;
            o++
          ) {
            var i = u[o];
            g(document, i, a);
          }
          return function () {
            for (var c = 0, s = n; c < s.length; c++) {
              var l = s[c];
              h(document, l, a);
            }
          };
        },
        [n, e]
      );
  };
const Fr = kr;
var Xe = { exports: {} };
/*!
 * JavaScript Cookie v2.2.1
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */ (function (e, r) {
  (function (n) {
    var t;
    if (((e.exports = n()), (t = !0), !t)) {
      var a = window.Cookies,
        o = (window.Cookies = n());
      o.noConflict = function () {
        return (window.Cookies = a), o;
      };
    }
  })(function () {
    function n() {
      for (var o = 0, u = {}; o < arguments.length; o++) {
        var i = arguments[o];
        for (var c in i) u[c] = i[c];
      }
      return u;
    }
    function t(o) {
      return o.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
    }
    function a(o) {
      function u() {}
      function i(s, l, v) {
        if (!(typeof document > "u")) {
          (v = n({ path: "/" }, u.defaults, v)),
            typeof v.expires == "number" &&
              (v.expires = new Date(new Date() * 1 + v.expires * 864e5)),
            (v.expires = v.expires ? v.expires.toUTCString() : "");
          try {
            var d = JSON.stringify(l);
            /^[\{\[]/.test(d) && (l = d);
          } catch {}
          (l = o.write
            ? o.write(l, s)
            : encodeURIComponent(String(l)).replace(
                /%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,
                decodeURIComponent
              )),
            (s = encodeURIComponent(String(s))
              .replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)
              .replace(/[\(\)]/g, escape));
          var p = "";
          for (var y in v)
            v[y] &&
              ((p += "; " + y), v[y] !== !0 && (p += "=" + v[y].split(";")[0]));
          return (document.cookie = s + "=" + l + p);
        }
      }
      function c(s, l) {
        if (!(typeof document > "u")) {
          for (
            var v = {},
              d = document.cookie ? document.cookie.split("; ") : [],
              p = 0;
            p < d.length;
            p++
          ) {
            var y = d[p].split("="),
              S = y.slice(1).join("=");
            !l && S.charAt(0) === '"' && (S = S.slice(1, -1));
            try {
              var w = t(y[0]);
              if (((S = (o.read || o)(S, w) || t(S)), l))
                try {
                  S = JSON.parse(S);
                } catch {}
              if (((v[w] = S), s === w)) break;
            } catch {}
          }
          return s ? v[s] : v;
        }
      }
      return (
        (u.set = i),
        (u.get = function (s) {
          return c(s, !1);
        }),
        (u.getJSON = function (s) {
          return c(s, !0);
        }),
        (u.remove = function (s, l) {
          i(s, "", n(l, { expires: -1 }));
        }),
        (u.defaults = {}),
        (u.withConverter = a),
        u
      );
    }
    return a(function () {});
  });
})(Xe);
var Ar = Xe.exports;
const de = we(Ar);
var Lr = function (e) {
  var r = f.useState(function () {
      return de.get(e) || null;
    }),
    n = r[0],
    t = r[1],
    a = f.useCallback(
      function (u, i) {
        de.set(e, u, i), t(u);
      },
      [e]
    ),
    o = f.useCallback(
      function () {
        de.remove(e), t(null);
      },
      [e]
    );
  return [n, a, o];
};
const Ur = Lr;
var zr = function () {
  var e = q(),
    r = ie({ value: void 0, error: void 0, noUserInteraction: !0 }),
    n = r[0],
    t = r[1],
    a = f.useCallback(function (o) {
      if (e()) {
        var u, i;
        try {
          if (typeof o != "string" && typeof o != "number") {
            var c = new Error(
              "Cannot copy typeof " +
                typeof o +
                " to clipboard, must be a string"
            );
            t({ value: o, error: c, noUserInteraction: !0 });
            return;
          } else if (o === "") {
            var c = new Error("Cannot copy empty string to clipboard.");
            t({ value: o, error: c, noUserInteraction: !0 });
            return;
          }
          (i = o.toString()),
            (u = fr(i)),
            t({ value: i, error: void 0, noUserInteraction: u });
        } catch (s) {
          t({ value: i, error: s, noUserInteraction: u });
        }
      }
    }, []);
  return [n, a];
};
const qr = zr;
var Wr = function (e) {
  return (e + 1) % 1e6;
};
function Y() {
  var e = f.useReducer(Wr, 0),
    r = e[1];
  return r;
}
function P(e, r) {
  return typeof e == "function" ? (e.length ? e(r) : e()) : e;
}
function Ye(e) {
  var r = f.useRef(P(e)),
    n = Y();
  return f.useMemo(function () {
    return [
      function () {
        return r.current;
      },
      function (t) {
        (r.current = P(t, r.current)), n();
      },
    ];
  }, []);
}
function Me(e, r, n) {
  e === void 0 && (e = 0),
    r === void 0 && (r = null),
    n === void 0 && (n = null);
  var t = P(e);
  typeof t != "number" &&
    console.error("initialValue has to be a number, got " + typeof e),
    typeof n == "number"
      ? (t = Math.max(t, n))
      : n !== null && console.error("min has to be a number, got " + typeof n),
    typeof r == "number"
      ? (t = Math.min(t, r))
      : r !== null && console.error("max has to be a number, got " + typeof r);
  var a = Ye(t),
    o = a[0],
    u = a[1];
  return [
    o(),
    f.useMemo(
      function () {
        var i = function (c) {
          var s = o(),
            l = P(c, s);
          s !== l &&
            (typeof n == "number" && (l = Math.max(l, n)),
            typeof r == "number" && (l = Math.min(l, r)),
            s !== l && u(l));
        };
        return {
          get: o,
          set: i,
          inc: function (c) {
            c === void 0 && (c = 1);
            var s = P(c, o());
            typeof s != "number" &&
              console.error(
                "delta has to be a number or function returning a number, got " +
                  typeof s
              ),
              i(function (l) {
                return l + s;
              });
          },
          dec: function (c) {
            c === void 0 && (c = 1);
            var s = P(c, o());
            typeof s != "number" &&
              console.error(
                "delta has to be a number or function returning a number, got " +
                  typeof s
              ),
              i(function (l) {
                return l - s;
              });
          },
          reset: function (c) {
            c === void 0 && (c = t);
            var s = P(c, o());
            typeof s != "number" &&
              console.error(
                "value has to be a number or function returning a number, got " +
                  typeof s
              ),
              (t = s),
              i(s);
          },
        };
      },
      [t, n, r]
    ),
  ];
}
var jr = /[A-Z]/g,
  Br = function (e) {
    for (var r = 5381, n = e.length; n; ) r = (r * 33) ^ e.charCodeAt(--n);
    return "_" + (r >>> 0).toString(36);
  },
  Hr = function (e) {
    e = e || {};
    var r = e.assign || Object.assign,
      n = typeof window == "object",
      t = r(
        {
          raw: "",
          pfx: "_",
          client: n,
          assign: r,
          stringify: JSON.stringify,
          kebab: function (a) {
            return a.replace(jr, "-$&").toLowerCase();
          },
          decl: function (a, o) {
            return (a = t.kebab(a)), a + ":" + o + ";";
          },
          hash: function (a) {
            return Br(t.stringify(a));
          },
          selector: function (a, o) {
            return a + (o[0] === ":" ? "" : " ") + o;
          },
          putRaw: function (a) {
            t.raw += a;
          },
        },
        e
      );
    return (
      t.client &&
        (t.sh ||
          document.head.appendChild((t.sh = document.createElement("style"))),
        (t.putRaw = function (a) {
          {
            var o = t.sh.sheet;
            try {
              o.insertRule(a, o.cssRules.length);
            } catch {}
          }
        })),
      (t.put = function (a, o, u) {
        var i = "",
          c,
          s,
          l = [];
        for (c in o)
          (s = o[c]),
            s instanceof Object && !(s instanceof Array)
              ? l.push(c)
              : (i += t.decl(c, s, a, u));
        i && ((i = a + "{" + i + "}"), t.putRaw(u ? u + "{" + i + "}" : i));
        for (var v = 0; v < l.length; v++)
          (c = l[v]),
            c[0] === "@" && c !== "@font-face"
              ? t.putAt(a, o[c], c)
              : t.put(t.selector(a, c), o[c], u);
      }),
      (t.putAt = t.put),
      t
    );
  },
  Xr = function (e) {
    e.client &&
      (document.head.appendChild((e.msh = document.createElement("style"))),
      (e.createRule = function (r, n) {
        var t = r + "{}";
        n && (t = n + "{" + t + "}");
        var a = n ? e.msh.sheet : e.sh.sheet,
          o = a.insertRule(t, a.cssRules.length),
          u = (a.cssRules || a.rules)[o];
        if (((u.index = o), n)) {
          var i = (u.cssRules || u.rules)[0];
          (u.style = i.style), (u.styleMap = i.styleMap);
        }
        return u;
      }));
  },
  Ne = {};
function Yr(e) {
  var r = e.index,
    n = e.parentStyleSheet,
    t = n.cssRules || n.rules;
  for (r = Math.max(r, t.length - 1); r >= 0; ) {
    if (t[r] === e) {
      n.deleteRule(r);
      break;
    }
    r--;
  }
}
Ne.removeRule = Yr;
var Nr = Ne.removeRule,
  Gr = function (e) {
    if (!e.client) return;
    var r = e.kebab;
    function n(a, o) {
      (this.rule = e.createRule(a, o)), (this.decl = {});
    }
    (n.prototype.diff = function (a) {
      var o = this.decl,
        u = this.rule.style,
        i;
      for (i in o) a[i] === void 0 && u.removeProperty(i);
      for (i in a) a[i] !== o[i] && u.setProperty(r(i), a[i]);
      this.decl = a;
    }),
      (n.prototype.del = function () {
        Nr(this.rule);
      });
    function t() {
      this.tree = {};
    }
    (t.prototype.diff = function (a) {
      var o = this.tree;
      for (var u in o)
        if (a[u] === void 0) {
          var i = o[u];
          for (var c in i) i[c].del();
        }
      for (var u in a)
        if (o[u] === void 0)
          for (var c in a[u]) {
            var s = new n(c, u);
            s.diff(a[u][c]), (a[u][c] = s);
          }
        else {
          var l = o[u],
            v = a[u];
          for (var c in l) v[c] || l[c].del();
          for (var c in v) {
            var s = l[c];
            s
              ? (s.diff(v[c]), (v[c] = s))
              : ((s = new n(c, u)), s.diff(v[c]), (v[c] = s));
          }
        }
      this.tree = a;
    }),
      (e.VRule = n),
      (e.VSheet = t);
  };
function ge(e, r, n, t) {
  var a = {},
    o = !1,
    u,
    i;
  for (u in r) (i = r[u]), typeof i != "object" && ((o = !0), (a[u] = i));
  o && (e[t] || (e[t] = {}), (e[t][n] = a));
  for (u in r)
    if (((i = r[u]), typeof i == "object"))
      if (u[0] === "@") ge(e, i, n, u);
      else {
        var c = u.indexOf("&") > -1,
          s = n.split(",");
        if (c) for (var l = 0; l < s.length; l++) s[l] = u.replace(/&/g, s[l]);
        else for (var l = 0; l < s.length; l++) s[l] = s[l] + " " + u;
        ge(e, i, s.join(","), t);
      }
}
var Vr = ge,
  Kr = x ? f.useLayoutEffect : f.useEffect;
const F = Kr;
var ye = Hr();
Xr(ye);
Gr(ye);
var Jr = 0,
  Qr = function (e) {
    var r = f.useMemo(function () {
        return "react-use-css-" + (Jr++).toString(36);
      }, []),
      n = f.useMemo(function () {
        return new ye.VSheet();
      }, []);
    return (
      F(function () {
        var t = {};
        return (
          Vr(t, e, "." + r, ""),
          n.diff(t),
          function () {
            n.diff({});
          }
        );
      }),
      r
    );
  };
const Zr = Qr;
var en = function (e, r, n) {
  var t = f.useRef(void 0);
  (!t.current || !n(r, t.current)) && (t.current = r),
    f.useEffect(e, t.current);
};
const Se = en;
function Ee(e, r) {
  r === void 0 && (r = 0);
  var n = f.useRef(!1),
    t = f.useRef(),
    a = f.useRef(e),
    o = f.useCallback(function () {
      return n.current;
    }, []),
    u = f.useCallback(
      function () {
        (n.current = !1),
          t.current && clearTimeout(t.current),
          (t.current = setTimeout(function () {
            (n.current = !0), a.current();
          }, r));
      },
      [r]
    ),
    i = f.useCallback(function () {
      (n.current = null), t.current && clearTimeout(t.current);
    }, []);
  return (
    f.useEffect(
      function () {
        a.current = e;
      },
      [e]
    ),
    f.useEffect(
      function () {
        return u(), i;
      },
      [r]
    ),
    [o, i, u]
  );
}
function rn(e, r, n) {
  r === void 0 && (r = 0), n === void 0 && (n = []);
  var t = Ee(e, r),
    a = t[0],
    o = t[1],
    u = t[2];
  return f.useEffect(u, n), [a, o];
}
var nn = function (e, r) {
  Se(e, r, He);
};
const tn = nn;
var un = function (e, r) {
  var n = f.useState(r),
    t = n[0],
    a = n[1];
  return t == null ? [e, a] : [t, a];
};
const on = un;
var an = function (e) {
    return function (r, n) {
      var t = r.getData("text/uri-list");
      if (t) {
        (e.onUri || M)(t, n);
        return;
      }
      if (r.files && r.files.length) {
        (e.onFiles || M)(Array.from(r.files), n);
        return;
      }
      if (n.clipboardData) {
        var a = n.clipboardData.getData("text");
        (e.onText || M)(a, n);
        return;
      }
    };
  },
  cn = function (e, r) {
    e === void 0 && (e = {}), r === void 0 && (r = []);
    var n = e.onFiles,
      t = e.onText,
      a = e.onUri,
      o = f.useState(!1),
      u = o[0],
      i = o[1],
      c = f.useCallback(i, []),
      s = f.useMemo(
        function () {
          return an(e);
        },
        [n, t, a]
      );
    return (
      f.useEffect(function () {
        var l = function (w) {
            w.preventDefault(), c(!0);
          },
          v = function (w) {
            w.preventDefault(), c(!0);
          },
          d = function () {
            c(!1);
          },
          p = function () {
            c(!1);
          },
          y = function (w) {
            w.preventDefault(), c(!1), s(w.dataTransfer, w);
          },
          S = function (w) {
            s(w.clipboardData, w);
          };
        return (
          g(document, "dragover", l),
          g(document, "dragenter", v),
          g(document, "dragleave", d),
          g(document, "dragexit", p),
          g(document, "drop", y),
          t && g(document, "paste", S),
          function () {
            h(document, "dragover", l),
              h(document, "dragenter", v),
              h(document, "dragleave", d),
              h(document, "dragexit", p),
              h(document, "drop", y),
              h(document, "paste", S);
          }
        );
      }, I([s], r)),
      { over: u }
    );
  };
const fn = cn;
var sn = function (e, r) {
    return function (n, t) {
      var a = n.getData("text/uri-list");
      if (a) {
        (e.onUri || M)(a, t);
        return;
      }
      if (n.files && n.files.length) {
        (e.onFiles || M)(Array.from(n.files), t);
        return;
      }
      n.items &&
        n.items.length &&
        n.items[0].getAsString(function (o) {
          r && (e.onText || M)(o, t);
        });
    };
  },
  ln = function (e, r) {
    return {
      onDragOver: function (n) {
        n.preventDefault();
      },
      onDragEnter: function (n) {
        n.preventDefault(), r(!0);
      },
      onDragLeave: function () {
        r(!1);
      },
      onDrop: function (n) {
        n.preventDefault(), n.persist(), r(!1), e(n.dataTransfer, n);
      },
      onPaste: function (n) {
        n.persist(), e(n.clipboardData, n);
      },
    };
  },
  vn = function (e) {
    e === void 0 && (e = {});
    var r = e.onFiles,
      n = e.onText,
      t = e.onUri,
      a = q(),
      o = f.useState(!1),
      u = o[0],
      i = o[1],
      c = f.useMemo(
        function () {
          return sn(e, a());
        },
        [r, n, t]
      ),
      s = f.useMemo(
        function () {
          return ln(c, i);
        },
        [c, i]
      );
    return [s, { over: u }];
  };
const dn = vn;
var hn = function (e) {
  f.useEffect(e, []);
};
const N = hn;
function Ge(e) {
  var r = f.useRef(e && e.current);
  return (
    f.useEffect(
      function () {
        e && (e.current = r.current);
      },
      [e]
    ),
    r
  );
}
function gn(e) {
  return f.forwardRef(function (r, n) {
    var t = Ge(n);
    return e(r, t);
  });
}
var mn = x ? window : null,
  xe = function (e) {
    return !!e.addEventListener;
  },
  Oe = function (e) {
    return !!e.on;
  },
  pn = function (e, r, n, t) {
    n === void 0 && (n = mn),
      f.useEffect(
        function () {
          if (r && n)
            return (
              xe(n) ? g(n, e, r, t) : Oe(n) && n.on(e, r, t),
              function () {
                xe(n) ? h(n, e, r, t) : Oe(n) && n.off(e, r, t);
              }
            );
        },
        [e, r, n, JSON.stringify(t)]
      );
  };
const Ve = pn;
var wn = function () {
  var e = f.useState(null),
    r = e[0],
    n = e[1];
  f.useEffect(
    function () {
      if (r) throw r;
    },
    [r]
  );
  var t = f.useCallback(function (a) {
    n(a);
  }, []);
  return t;
};
const yn = wn;
var Sn = function (e) {
    f.useEffect(
      function () {
        var r =
          document.querySelector("link[rel*='icon']") ||
          document.createElement("link");
        (r.type = "image/x-icon"),
          (r.rel = "shortcut icon"),
          (r.href = e),
          document.getElementsByTagName("head")[0].appendChild(r);
      },
      [e]
    );
  },
  Ke = { exports: {} };
/*!
 * screenfull
 * v5.2.0 - 2021-11-03
 * (c) Sindre Sorhus; MIT License
 */ (function (e) {
  (function () {
    var r =
        typeof window < "u" && typeof window.document < "u"
          ? window.document
          : {},
      n = e.exports,
      t = (function () {
        for (
          var u,
            i = [
              [
                "requestFullscreen",
                "exitFullscreen",
                "fullscreenElement",
                "fullscreenEnabled",
                "fullscreenchange",
                "fullscreenerror",
              ],
              [
                "webkitRequestFullscreen",
                "webkitExitFullscreen",
                "webkitFullscreenElement",
                "webkitFullscreenEnabled",
                "webkitfullscreenchange",
                "webkitfullscreenerror",
              ],
              [
                "webkitRequestFullScreen",
                "webkitCancelFullScreen",
                "webkitCurrentFullScreenElement",
                "webkitCancelFullScreen",
                "webkitfullscreenchange",
                "webkitfullscreenerror",
              ],
              [
                "mozRequestFullScreen",
                "mozCancelFullScreen",
                "mozFullScreenElement",
                "mozFullScreenEnabled",
                "mozfullscreenchange",
                "mozfullscreenerror",
              ],
              [
                "msRequestFullscreen",
                "msExitFullscreen",
                "msFullscreenElement",
                "msFullscreenEnabled",
                "MSFullscreenChange",
                "MSFullscreenError",
              ],
            ],
            c = 0,
            s = i.length,
            l = {};
          c < s;
          c++
        )
          if (((u = i[c]), u && u[1] in r)) {
            for (c = 0; c < u.length; c++) l[i[0][c]] = u[c];
            return l;
          }
        return !1;
      })(),
      a = { change: t.fullscreenchange, error: t.fullscreenerror },
      o = {
        request: function (u, i) {
          return new Promise(
            function (c, s) {
              var l = function () {
                this.off("change", l), c();
              }.bind(this);
              this.on("change", l), (u = u || r.documentElement);
              var v = u[t.requestFullscreen](i);
              v instanceof Promise && v.then(l).catch(s);
            }.bind(this)
          );
        },
        exit: function () {
          return new Promise(
            function (u, i) {
              if (!this.isFullscreen) {
                u();
                return;
              }
              var c = function () {
                this.off("change", c), u();
              }.bind(this);
              this.on("change", c);
              var s = r[t.exitFullscreen]();
              s instanceof Promise && s.then(c).catch(i);
            }.bind(this)
          );
        },
        toggle: function (u, i) {
          return this.isFullscreen ? this.exit() : this.request(u, i);
        },
        onchange: function (u) {
          this.on("change", u);
        },
        onerror: function (u) {
          this.on("error", u);
        },
        on: function (u, i) {
          var c = a[u];
          c && r.addEventListener(c, i, !1);
        },
        off: function (u, i) {
          var c = a[u];
          c && r.removeEventListener(c, i, !1);
        },
        raw: t,
      };
    if (!t) {
      n
        ? (e.exports = { isEnabled: !1 })
        : (window.screenfull = { isEnabled: !1 });
      return;
    }
    Object.defineProperties(o, {
      isFullscreen: {
        get: function () {
          return !!r[t.fullscreenElement];
        },
      },
      element: {
        enumerable: !0,
        get: function () {
          return r[t.fullscreenElement];
        },
      },
      isEnabled: {
        enumerable: !0,
        get: function () {
          return !!r[t.fullscreenEnabled];
        },
      },
    }),
      n ? (e.exports = o) : (window.screenfull = o);
  })();
})(Ke);
var En = Ke.exports;
const k = we(En);
var bn = function (e, r, n) {
  n === void 0 && (n = {});
  var t = n.video,
    a = n.onClose,
    o = a === void 0 ? M : a,
    u = f.useState(r),
    i = u[0],
    c = u[1];
  return (
    F(
      function () {
        if (r && e.current) {
          var s = function () {
              t != null && t.current && h(t.current, "webkitendfullscreen", s),
                o();
            },
            l = function () {
              if (k.isEnabled) {
                var v = k.isFullscreen;
                c(v), v || o();
              }
            };
          if (k.isEnabled) {
            try {
              k.request(e.current), c(!0);
            } catch (v) {
              o(v), c(!1);
            }
            k.on("change", l);
          } else
            t && t.current && t.current.webkitEnterFullscreen
              ? (t.current.webkitEnterFullscreen(),
                g(t.current, "webkitendfullscreen", s),
                c(!0))
              : (o(), c(!1));
          return function () {
            if ((c(!1), k.isEnabled))
              try {
                k.off("change", l), k.exit();
              } catch {}
            else
              t &&
                t.current &&
                t.current.webkitExitFullscreen &&
                (h(t.current, "webkitendfullscreen", s),
                t.current.webkitExitFullscreen());
          };
        }
      },
      [r, t, e]
    ),
    i
  );
};
const Cn = bn;
var Rn = function (e) {
  var r = f.useState({
      loading: !0,
      accuracy: null,
      altitude: null,
      altitudeAccuracy: null,
      heading: null,
      latitude: null,
      longitude: null,
      speed: null,
      timestamp: Date.now(),
    }),
    n = r[0],
    t = r[1],
    a = !0,
    o,
    u = function (c) {
      a &&
        t({
          loading: !1,
          accuracy: c.coords.accuracy,
          altitude: c.coords.altitude,
          altitudeAccuracy: c.coords.altitudeAccuracy,
          heading: c.coords.heading,
          latitude: c.coords.latitude,
          longitude: c.coords.longitude,
          speed: c.coords.speed,
          timestamp: c.timestamp,
        });
    },
    i = function (c) {
      return (
        a &&
        t(function (s) {
          return C(C({}, s), { loading: !1, error: c });
        })
      );
    };
  return (
    f.useEffect(function () {
      return (
        navigator.geolocation.getCurrentPosition(u, i, e),
        (o = navigator.geolocation.watchPosition(u, i, e)),
        function () {
          (a = !1), navigator.geolocation.clearWatch(o);
        }
      );
    }, []),
    n
  );
};
const Mn = Rn;
var xn = function (e) {
  e === void 0 && (e = {});
  var r = Y(),
    n = f.useRef(C({}, e)),
    t = f.useCallback(function () {
      return n.current;
    }, []),
    a = f.useCallback(function (o) {
      o && (Object.assign(n.current, o), r());
    }, []);
  return [t, a];
};
const On = xn;
var Dn = 0,
  H = {},
  Pn = function (e, r) {
    var n,
      t = Dn++;
    if (H[r]) H[r].listeners[t] = e;
    else {
      var a = setInterval(function () {
        for (
          var o = H[r].listeners, u = !1, i, c = 0, s = Object.values(o);
          c < s.length;
          c++
        ) {
          var l = s[c];
          try {
            l();
          } catch (v) {
            (u = !0), (i = v);
          }
        }
        if (u) throw i;
      }, r);
      H[r] = { ms: r, timer: a, listeners: ((n = {}), (n[t] = e), n) };
    }
    return { bucket: H[r], id: t };
  },
  _n = function (e) {
    var r = e.bucket,
      n = e.id;
    delete r.listeners[n];
    var t = !1;
    for (var a in r.listeners) {
      t = !0;
      break;
    }
    t || (clearInterval(r.timer), delete H[r.ms]);
  },
  In = function (e, r) {
    r === void 0 && (r = 0);
    var n = f.useRef(function () {});
    f.useEffect(function () {
      n.current = e;
    }),
      f.useEffect(
        function () {
          if (r !== null) {
            var t = Pn(function () {
              return n.current();
            }, r);
            return function () {
              return _n(t);
            };
          }
        },
        [r]
      );
  };
const $n = In;
var Tn = f.useState,
  kn = function (e) {
    var r = Tn(!1),
      n = r[0],
      t = r[1],
      a = function (i) {
        return function (c) {
          (i || M)(c), t(!0);
        };
      },
      o = function (i) {
        return function (c) {
          (i || M)(c), t(!1);
        };
      };
    typeof e == "function" && (e = e(n));
    var u = f.cloneElement(e, {
      onMouseEnter: a(e.props.onMouseEnter),
      onMouseLeave: o(e.props.onMouseLeave),
    });
    return [u, n];
  };
const Fn = kn;
var An = function (e, r) {
  r === void 0 && (r = !0);
  var n = f.useState(!1),
    t = n[0],
    a = n[1];
  return (
    f.useEffect(
      function () {
        var o = function () {
            return a(!0);
          },
          u = function () {
            return a(!1);
          };
        r &&
          e &&
          e.current &&
          (g(e.current, "mouseover", o), g(e.current, "mouseout", u));
        var i = e.current;
        return function () {
          r && i && (h(i, "mouseover", o), h(i, "mouseout", u));
        };
      },
      [r, e]
    ),
    t
  );
};
const Je = An;
function Ln(e, r, n, t) {
  var a,
    o = !1,
    u = 0;
  function i() {
    a && clearTimeout(a);
  }
  function c() {
    i(), (o = !0);
  }
  typeof r != "boolean" && ((t = n), (n = r), (r = void 0));
  function s() {
    for (var l = arguments.length, v = new Array(l), d = 0; d < l; d++)
      v[d] = arguments[d];
    var p = this,
      y = Date.now() - u;
    if (o) return;
    function S() {
      (u = Date.now()), n.apply(p, v);
    }
    function w() {
      a = void 0;
    }
    t && !a && S(),
      i(),
      t === void 0 && y > e
        ? S()
        : r !== !0 && (a = setTimeout(t ? w : S, t === void 0 ? e - y : e));
  }
  return (s.cancel = c), s;
}
var Un = ["mousemove", "mousedown", "resize", "keydown", "touchstart", "wheel"],
  zn = 6e4,
  qn = function (e, r, n) {
    e === void 0 && (e = zn),
      r === void 0 && (r = !1),
      n === void 0 && (n = Un);
    var t = f.useState(r),
      a = t[0],
      o = t[1];
    return (
      f.useEffect(
        function () {
          for (
            var u = !0,
              i,
              c = a,
              s = function (p) {
                u && ((c = p), o(p));
              },
              l = Ln(50, function () {
                c && s(!1),
                  clearTimeout(i),
                  (i = setTimeout(function () {
                    return s(!0);
                  }, e));
              }),
              v = function () {
                document.hidden || l();
              },
              d = 0;
            d < n.length;
            d++
          )
            g(window, n[d], l);
          return (
            g(document, "visibilitychange", v),
            (i = setTimeout(function () {
              return s(!0);
            }, e)),
            function () {
              u = !1;
              for (var p = 0; p < n.length; p++) h(window, n[p], l);
              h(document, "visibilitychange", v);
            }
          );
        },
        [e, n]
      ),
      a
    );
  };
const Wn = qn;
var jn = function (e, r) {
  var n = f.useState(null),
    t = n[0],
    a = n[1];
  return (
    f.useEffect(
      function () {
        if (e.current && typeof IntersectionObserver == "function") {
          var o = function (i) {
              a(i[0]);
            },
            u = new IntersectionObserver(o, r);
          return (
            u.observe(e.current),
            function () {
              a(null), u.disconnect();
            }
          );
        }
        return function () {};
      },
      [e.current, r.threshold, r.root, r.rootMargin]
    ),
    t
  );
};
const Bn = jn;
var Hn = function (e, r) {
  var n = f.useRef(function () {});
  f.useEffect(function () {
    n.current = e;
  }),
    f.useEffect(
      function () {
        if (r !== null) {
          var t = setInterval(function () {
            return n.current();
          }, r || 0);
          return function () {
            return clearInterval(t);
          };
        }
      },
      [r]
    );
};
const Xn = Hn;
var Yn = function (e) {
    return typeof e == "function"
      ? e
      : typeof e == "string"
      ? function (r) {
          return r.key === e;
        }
      : e
      ? function () {
          return !0;
        }
      : function () {
          return !1;
        };
  },
  Nn = function (e, r, n, t) {
    r === void 0 && (r = M),
      n === void 0 && (n = {}),
      t === void 0 && (t = [e]);
    var a = n.event,
      o = a === void 0 ? "keydown" : a,
      u = n.target,
      i = n.options,
      c = f.useMemo(function () {
        var s = Yn(e),
          l = function (v) {
            if (s(v)) return r(v);
          };
        return l;
      }, t);
    Ve(o, c, u, i);
  };
const me = Nn;
var Gn = function (e) {
  return (
    e === void 0 && (e = { laptopL: 1440, laptop: 1024, tablet: 768 }),
    function () {
      var r = f.useState(x ? window.innerWidth : 0),
        n = r[0],
        t = r[1];
      f.useEffect(function () {
        var u = function () {
          t(window.innerWidth);
        };
        return (
          u(),
          g(window, "resize", u),
          function () {
            h(window, "resize", u);
          }
        );
      });
      var a = f.useMemo(
          function () {
            return Object.entries(e).sort(function (u, i) {
              return u[1] >= i[1] ? 1 : -1;
            });
          },
          [e]
        ),
        o = a.reduce(function (u, i) {
          var c = i[0],
            s = i[1];
          return n >= s ? c : u;
        }, a[0][0]);
      return o;
    }
  );
};
const Vn = Gn;
var Kn = function (e) {
  var r = f.useState([!1, null]),
    n = r[0],
    t = r[1];
  return (
    me(
      e,
      function (a) {
        return t([!0, a]);
      },
      { event: "keydown" },
      [n]
    ),
    me(
      e,
      function (a) {
        return t([!1, a]);
      },
      { event: "keyup" },
      [n]
    ),
    n
  );
};
const Qe = Kn;
var Jn = function (e, r, n, t) {
  t === void 0 && (t = Qe);
  var a = t(e),
    o = a[0],
    u = a[1];
  V(
    function () {
      !o && n ? n(u) : o && r && r(u);
    },
    [o]
  );
};
const Qn = Jn;
var Zn = function (e) {
  var r = f.useRef(e);
  return (r.current = e), r;
};
const Ze = Zn;
var et = function (e, r) {
  f.useEffect(function () {
    return (
      e && e(),
      function () {
        r && r();
      }
    );
  }, []);
};
const er = et;
function rr(e) {
  e === void 0 && (e = []);
  var r = f.useRef(P(e)),
    n = Y(),
    t = f.useMemo(function () {
      var a = {
        set: function (o) {
          (r.current = P(o, r.current)), n();
        },
        push: function () {
          for (var o = [], u = 0; u < arguments.length; u++)
            o[u] = arguments[u];
          o.length &&
            t.set(function (i) {
              return i.concat(o);
            });
        },
        updateAt: function (o, u) {
          t.set(function (i) {
            var c = i.slice();
            return (c[o] = u), c;
          });
        },
        insertAt: function (o, u) {
          t.set(function (i) {
            var c = i.slice();
            return o > c.length ? (c[o] = u) : c.splice(o, 0, u), c;
          });
        },
        update: function (o, u) {
          t.set(function (i) {
            return i.map(function (c) {
              return o(c, u) ? u : c;
            });
          });
        },
        updateFirst: function (o, u) {
          var i = r.current.findIndex(function (c) {
            return o(c, u);
          });
          i >= 0 && t.updateAt(i, u);
        },
        upsert: function (o, u) {
          var i = r.current.findIndex(function (c) {
            return o(c, u);
          });
          i >= 0 ? t.updateAt(i, u) : t.push(u);
        },
        sort: function (o) {
          t.set(function (u) {
            return u.slice().sort(o);
          });
        },
        filter: function (o, u) {
          t.set(function (i) {
            return i.slice().filter(o, u);
          });
        },
        removeAt: function (o) {
          t.set(function (u) {
            var i = u.slice();
            return i.splice(o, 1), i;
          });
        },
        clear: function () {
          t.set([]);
        },
        reset: function () {
          t.set(P(e).slice());
        },
      };
      return (a.remove = a.removeAt), a;
    }, []);
  return [r.current, t];
}
var rt = function (e, r, n) {
  if (!x) return [r, M, M];
  if (!e) throw new Error("useLocalStorage key may not be falsy");
  var t = n
      ? n.raw
        ? function (l) {
            return l;
          }
        : n.deserializer
      : JSON.parse,
    a = f.useRef(function (l) {
      try {
        var v = n ? (n.raw ? String : n.serializer) : JSON.stringify,
          d = localStorage.getItem(l);
        return d !== null ? t(d) : (r && localStorage.setItem(l, v(r)), r);
      } catch {
        return r;
      }
    }),
    o = f.useState(function () {
      return a.current(e);
    }),
    u = o[0],
    i = o[1];
  f.useLayoutEffect(
    function () {
      return i(a.current(e));
    },
    [e]
  );
  var c = f.useCallback(
      function (l) {
        try {
          var v = typeof l == "function" ? l(u) : l;
          if (typeof v > "u") return;
          var d = void 0;
          n
            ? n.raw
              ? typeof v == "string"
                ? (d = v)
                : (d = JSON.stringify(v))
              : n.serializer
              ? (d = n.serializer(v))
              : (d = JSON.stringify(v))
            : (d = JSON.stringify(v)),
            localStorage.setItem(e, d),
            i(t(d));
        } catch {}
      },
      [e, i]
    ),
    s = f.useCallback(
      function () {
        try {
          localStorage.removeItem(e), i(void 0);
        } catch {}
      },
      [e, i]
    );
  return [u, c, s];
};
const nt = rt;
var De = function (e) {
  var r = window.history,
    n = r[e];
  r[e] = function (t) {
    var a = n.apply(this, arguments),
      o = new Event(e.toLowerCase());
    return (o.state = t), window.dispatchEvent(o), a;
  };
};
x && (De("pushState"), De("replaceState"));
var tt = function () {
    return { trigger: "load", length: 1 };
  },
  Z = function (e) {
    var r = window.history,
      n = r.state,
      t = r.length,
      a = window.location,
      o = a.hash,
      u = a.host,
      i = a.hostname,
      c = a.href,
      s = a.origin,
      l = a.pathname,
      v = a.port,
      d = a.protocol,
      p = a.search;
    return {
      trigger: e,
      state: n,
      length: t,
      hash: o,
      host: u,
      hostname: i,
      href: c,
      origin: s,
      pathname: l,
      port: v,
      protocol: d,
      search: p,
    };
  },
  ut = function () {
    var e = f.useState(Z("load")),
      r = e[0],
      n = e[1];
    return (
      f.useEffect(function () {
        var t = function () {
            return n(Z("popstate"));
          },
          a = function () {
            return n(Z("pushstate"));
          },
          o = function () {
            return n(Z("replacestate"));
          };
        return (
          g(window, "popstate", t),
          g(window, "pushstate", a),
          g(window, "replacestate", o),
          function () {
            h(window, "popstate", t),
              h(window, "pushstate", a),
              h(window, "replacestate", o);
          }
        );
      }, []),
      r
    );
  },
  ot = typeof Event == "function";
const at = x && ot ? ut : tt;
function pe(e) {
  if (e) {
    if (e.tagName === "BODY") return e;
    if (e.tagName === "IFRAME") {
      var r = e.contentDocument;
      return r ? r.body : null;
    } else if (!e.offsetParent) return null;
  } else return null;
  return pe(e.offsetParent);
}
function Pe(e) {
  var r = e || window.event;
  return r.touches.length > 1
    ? !0
    : (r.preventDefault && r.preventDefault(), !1);
}
var _e =
    x &&
    window.navigator &&
    window.navigator.platform &&
    /iP(ad|hone|od)/.test(window.navigator.platform),
  j = new Map(),
  Ie = typeof document == "object" ? document : void 0,
  ee = !1;
const it = Ie
  ? function (r, n) {
      r === void 0 && (r = !0);
      var t = f.useRef(Ie.body);
      n = n || t;
      var a = function (u) {
          var i = j.get(u);
          i
            ? j.set(u, {
                counter: i.counter + 1,
                initialOverflow: i.initialOverflow,
              })
            : (j.set(u, { counter: 1, initialOverflow: u.style.overflow }),
              _e
                ? ee ||
                  (g(document, "touchmove", Pe, { passive: !1 }), (ee = !0))
                : (u.style.overflow = "hidden"));
        },
        o = function (u) {
          var i = j.get(u);
          i &&
            (i.counter === 1
              ? (j.delete(u),
                _e
                  ? ((u.ontouchmove = null),
                    ee && (h(document, "touchmove", Pe), (ee = !1)))
                  : (u.style.overflow = i.initialOverflow))
              : j.set(u, {
                  counter: i.counter - 1,
                  initialOverflow: i.initialOverflow,
                }));
        };
      f.useEffect(
        function () {
          var u = pe(n.current);
          u && (r ? a(u) : o(u));
        },
        [r, n.current]
      ),
        f.useEffect(function () {
          var u = pe(n.current);
          if (u)
            return function () {
              o(u);
            };
        }, []);
    }
  : function (r, n) {};
var ct = function (e) {
  for (var r = [], n = 1; n < arguments.length; n++) r[n - 1] = arguments[n];
  N(function () {
    return (
      console.log.apply(console, I([e + " mounted"], r)),
      function () {
        return console.log(e + " unmounted");
      }
    );
  }),
    V(function () {
      console.log.apply(console, I([e + " updated"], r));
    });
};
const ft = ct;
var st = function (e) {
    return "touches" in e;
  },
  $e = function (e) {
    st(e) && e.touches.length < 2 && e.preventDefault && e.preventDefault();
  },
  lt = function (e, r) {
    var n = r === void 0 ? {} : r,
      t = n.isPreventDefault,
      a = t === void 0 ? !0 : t,
      o = n.delay,
      u = o === void 0 ? 300 : o,
      i = f.useRef(),
      c = f.useRef(),
      s = f.useCallback(
        function (v) {
          a &&
            v.target &&
            (g(v.target, "touchend", $e, { passive: !1 }),
            (c.current = v.target)),
            (i.current = setTimeout(function () {
              return e(v);
            }, u));
        },
        [e, u, a]
      ),
      l = f.useCallback(
        function () {
          i.current && clearTimeout(i.current),
            a && c.current && h(c.current, "touchend", $e);
        },
        [a]
      );
    return {
      onMouseDown: function (v) {
        return s(v);
      },
      onTouchStart: function (v) {
        return s(v);
      },
      onMouseUp: l,
      onMouseLeave: l,
      onTouchEnd: l,
    };
  };
const vt = lt;
var dt = function (e) {
  e === void 0 && (e = {});
  var r = f.useState(e),
    n = r[0],
    t = r[1],
    a = f.useMemo(
      function () {
        return {
          set: function (u, i) {
            t(function (c) {
              var s;
              return C(C({}, c), ((s = {}), (s[u] = i), s));
            });
          },
          setAll: function (u) {
            t(u);
          },
          remove: function (u) {
            t(function (i) {
              var c = i,
                s = u;
              c[s];
              var l = sr(c, [typeof s == "symbol" ? s : s + ""]);
              return l;
            });
          },
          reset: function () {
            return t(e);
          },
        };
      },
      [t]
    ),
    o = C(
      {
        get: f.useCallback(
          function (u) {
            return n[u];
          },
          [n]
        ),
      },
      a
    );
  return [n, o];
};
const ht = dt;
var gt = function (e, r) {
    return r !== void 0 ? r : x ? window.matchMedia(e).matches : !1;
  },
  mt = function (e, r) {
    var n = f.useState(gt(e, r)),
      t = n[0],
      a = n[1];
    return (
      f.useEffect(
        function () {
          var o = !0,
            u = window.matchMedia(e),
            i = function () {
              o && a(!!u.matches);
            };
          return (
            u.addEventListener("change", i),
            a(u.matches),
            function () {
              (o = !1), u.removeEventListener("change", i);
            }
          );
        },
        [e]
      ),
      t
    );
  };
const pt = mt;
var wt = function () {
    var e = f.useState({}),
      r = e[0],
      n = e[1];
    return (
      f.useEffect(function () {
        var t = !0,
          a = function () {
            navigator.mediaDevices
              .enumerateDevices()
              .then(function (o) {
                t &&
                  n({
                    devices: o.map(function (u) {
                      var i = u.deviceId,
                        c = u.groupId,
                        s = u.kind,
                        l = u.label;
                      return { deviceId: i, groupId: c, kind: s, label: l };
                    }),
                  });
              })
              .catch(M);
          };
        return (
          g(navigator.mediaDevices, "devicechange", a),
          a(),
          function () {
            (t = !1), h(navigator.mediaDevices, "devicechange", a);
          }
        );
      }, []),
      r
    );
  },
  yt = function () {
    return {};
  };
const St = ce && navigator.mediaDevices ? wt : yt;
function Et(e, r) {
  var n = f.useRef(e),
    t = f.useState(r),
    a = t[0],
    o = t[1],
    u = f.useCallback(
      function (i) {
        n.current.length === 2 ? n.current(i, o) : o(n.current(i));
      },
      [a]
    );
  return [a, u];
}
var bt = function (e, r) {
  var n = f.useMemo(
      function () {
        return function (i, c) {
          var s;
          return (s = e(i))[c.type].apply(s, c.payload);
        };
      },
      [e]
    ),
    t = f.useReducer(n, r),
    a = t[0],
    o = t[1],
    u = f.useMemo(
      function () {
        var i = Object.keys(e(r));
        return i.reduce(function (c, s) {
          return (
            (c[s] = function () {
              for (var l = [], v = 0; v < arguments.length; v++)
                l[v] = arguments[v];
              return o({ type: s, payload: l });
            }),
            c
          );
        }, {});
      },
      [e, r]
    );
  return [a, u];
};
const Ct = bt;
var Rt = {
    acceleration: { x: null, y: null, z: null },
    accelerationIncludingGravity: { x: null, y: null, z: null },
    rotationRate: { alpha: null, beta: null, gamma: null },
    interval: 16,
  },
  Mt = function (e) {
    e === void 0 && (e = Rt);
    var r = f.useState(e),
      n = r[0],
      t = r[1];
    return (
      f.useEffect(function () {
        var a = function (o) {
          var u = o.acceleration,
            i = o.accelerationIncludingGravity,
            c = o.rotationRate,
            s = o.interval;
          t({
            acceleration: { x: u.x, y: u.y, z: u.z },
            accelerationIncludingGravity: { x: i.x, y: i.y, z: i.z },
            rotationRate: { alpha: c.alpha, beta: c.beta, gamma: c.gamma },
            interval: s,
          });
        };
        return (
          g(window, "devicemotion", a),
          function () {
            h(window, "devicemotion", a);
          }
        );
      }, []),
      n
    );
  };
const xt = Mt;
var Ot = function (e) {
  N(function () {
    e();
  });
};
const Dt = Ot;
var Pt = function (e) {
  var r = f.useRef(e);
  (r.current = e),
    N(function () {
      return function () {
        return r.current();
      };
    });
};
const fe = Pt;
var K = function (e) {
    var r = f.useRef(0),
      n = f.useState(e),
      t = n[0],
      a = n[1],
      o = f.useCallback(function (u) {
        cancelAnimationFrame(r.current),
          (r.current = requestAnimationFrame(function () {
            a(u);
          }));
      }, []);
    return (
      fe(function () {
        cancelAnimationFrame(r.current);
      }),
      [t, o]
    );
  },
  _t = function (e) {
    var r = K({
        docX: 0,
        docY: 0,
        posX: 0,
        posY: 0,
        elX: 0,
        elY: 0,
        elH: 0,
        elW: 0,
      }),
      n = r[0],
      t = r[1];
    return (
      f.useEffect(
        function () {
          var a = function (o) {
            if (e && e.current) {
              var u = e.current.getBoundingClientRect(),
                i = u.left,
                c = u.top,
                s = u.width,
                l = u.height,
                v = i + window.pageXOffset,
                d = c + window.pageYOffset,
                p = o.pageX - v,
                y = o.pageY - d;
              t({
                docX: o.pageX,
                docY: o.pageY,
                posX: v,
                posY: d,
                elX: p,
                elY: y,
                elH: l,
                elW: s,
              });
            }
          };
          return (
            g(document, "mousemove", a),
            function () {
              h(document, "mousemove", a);
            }
          );
        },
        [e]
      ),
      n
    );
  };
const nr = _t;
var It = { current: null },
  $t = function (e, r) {
    r === void 0 && (r = {});
    var n = !!r.whenHovered,
      t = !!r.bound,
      a = Je(e, n),
      o = nr(n && !a ? It : e);
    return (
      t &&
        ((o.elX = Math.max(0, Math.min(o.elX, o.elW))),
        (o.elY = Math.max(0, Math.min(o.elY, o.elH)))),
      o
    );
  };
const Tt = $t,
  kt = function () {
    var e = f.useState(0),
      r = e[0],
      n = e[1];
    return (
      f.useEffect(function () {
        var t = function (a) {
          n(a.deltaY + r);
        };
        return (
          g(window, "wheel", t, !1),
          function () {
            return h(window, "wheel", t);
          }
        );
      }),
      r
    );
  };
var U = ce ? navigator : void 0,
  R = U && (U.connection || U.mozConnection || U.webkitConnection);
function Te(e) {
  var r = U == null ? void 0 : U.onLine,
    n = e == null ? void 0 : e.online;
  return {
    online: r,
    previous: n,
    since: r !== n ? new Date() : e == null ? void 0 : e.since,
    downlink: R == null ? void 0 : R.downlink,
    downlinkMax: R == null ? void 0 : R.downlinkMax,
    effectiveType: R == null ? void 0 : R.effectiveType,
    rtt: R == null ? void 0 : R.rtt,
    saveData: R == null ? void 0 : R.saveData,
    type: R == null ? void 0 : R.type,
  };
}
function Ft(e) {
  var r = f.useState(e ?? Te),
    n = r[0],
    t = r[1];
  return (
    f.useEffect(function () {
      var a = function () {
        t(Te);
      };
      return (
        g(window, "online", a, { passive: !0 }),
        g(window, "offline", a, { passive: !0 }),
        R && g(R, "change", a, { passive: !0 }),
        function () {
          h(window, "online", a),
            h(window, "offline", a),
            R && h(R, "change", a);
        }
      );
    }, []),
    n
  );
}
function At(e, r) {
  var n = f.useState(r),
    t = n[0],
    a = n[1];
  return (
    F(
      function () {
        var o = e.subscribe(a);
        return function () {
          return o.unsubscribe();
        };
      },
      [e]
    ),
    t
  );
}
var Lt = { angle: 0, type: "landscape-primary" },
  Ut = function (e) {
    e === void 0 && (e = Lt);
    var r = f.useState(e),
      n = r[0],
      t = r[1];
    return (
      f.useEffect(function () {
        var a = window.screen,
          o = !0,
          u = function () {
            if (o) {
              var i = a.orientation;
              if (i) {
                var c = i.angle,
                  s = i.type;
                t({ angle: c, type: s });
              } else
                window.orientation !== void 0
                  ? t({
                      angle:
                        typeof window.orientation == "number"
                          ? window.orientation
                          : 0,
                      type: "",
                    })
                  : t(e);
            }
          };
        return (
          g(window, "orientationchange", u),
          u(),
          function () {
            (o = !1), h(window, "orientationchange", u);
          }
        );
      }, []),
      n
    );
  };
const zt = Ut;
var qt = function (e, r) {
  r === void 0 && (r = []),
    f.useEffect(function () {
      if (e) {
        var n = function (t) {
          t = t || window.event;
          var a = t.relatedTarget || t.toElement;
          (!a || a.nodeName === "HTML") && e();
        };
        return (
          g(document, "mouseout", n),
          function () {
            h(document, "mouseout", n);
          }
        );
      }
    }, r);
};
const Wt = qt;
var jt = function (e) {
  var r = f.useState(""),
    n = r[0],
    t = r[1];
  return (
    f.useEffect(
      function () {
        var a = !0,
          o = null,
          u = function () {
            a &&
              t(function () {
                var i;
                return (i = o == null ? void 0 : o.state) !== null &&
                  i !== void 0
                  ? i
                  : "";
              });
          };
        return (
          navigator.permissions
            .query(e)
            .then(function (i) {
              (o = i), g(o, "change", u), u();
            })
            .catch(M),
          function () {
            o && h(o, "change", u), (a = !1), (o = null);
          }
        );
      },
      [e]
    ),
    n
  );
};
const Bt = jt;
function Ht(e) {
  var r = f.useRef();
  return (
    f.useEffect(function () {
      r.current = e;
    }),
    r.current
  );
}
var Xt = function (e, r) {
  return e === r;
};
function Yt(e, r) {
  r === void 0 && (r = Xt);
  var n = f.useRef(),
    t = f.useRef(e),
    a = ae();
  return (
    !a && !r(t.current, e) && ((n.current = t.current), (t.current = e)),
    n.current
  );
}
var Nt = function () {
  var e = q();
  return f.useCallback(function (r) {
    return new Promise(function (n, t) {
      var a = function (u) {
          e() && n(u);
        },
        o = function (u) {
          e() && t(u);
        };
      r.then(a, o);
    });
  }, []);
};
const Gt = Nt;
var Vt = function (e) {
  e === void 0 && (e = []);
  var r = f.useState(e),
    n = r[0],
    t = r[1];
  return {
    add: function (a) {
      t(function (o) {
        return I(o, [a]);
      });
    },
    remove: function () {
      var a;
      return (
        t(function (o) {
          var u = o[0],
            i = o.slice(1);
          return (a = u), i;
        }),
        a
      );
    },
    get first() {
      return n[0];
    },
    get last() {
      return n[n.length - 1];
    },
    get size() {
      return n.length;
    },
  };
};
const Kt = Vt;
var Jt = function (e, r) {
  e === void 0 && (e = 1e12), r === void 0 && (r = 0);
  var n = f.useState(0),
    t = n[0],
    a = n[1];
  return (
    F(
      function () {
        var o,
          u,
          i,
          c = function () {
            var d = Math.min(1, (Date.now() - i) / e);
            a(d), s();
          },
          s = function () {
            o = requestAnimationFrame(c);
          },
          l = function () {
            (u = setTimeout(function () {
              cancelAnimationFrame(o), a(1);
            }, e)),
              (i = Date.now()),
              s();
          },
          v = setTimeout(l, r);
        return function () {
          clearTimeout(u), clearTimeout(v), cancelAnimationFrame(o);
        };
      },
      [e, r]
    ),
    t
  );
};
const tr = Jt;
function Qt(e, r) {
  r === void 0 && (r = !0);
  var n = f.useRef(null),
    t = f.useRef(!1),
    a = f.useRef(e);
  a.current = e;
  var o = f.useCallback(function (i) {
      t.current && (a.current(i), (n.current = requestAnimationFrame(o)));
    }, []),
    u = f.useMemo(function () {
      return [
        function () {
          t.current &&
            ((t.current = !1), n.current && cancelAnimationFrame(n.current));
        },
        function () {
          t.current ||
            ((t.current = !0), (n.current = requestAnimationFrame(o)));
        },
        function () {
          return t.current;
        },
      ];
    }, []);
  return (
    f.useEffect(function () {
      return r && u[1](), u[0];
    }, []),
    u
  );
}
var ke = function (e, r) {
    return new URLSearchParams(e).get(r);
  },
  Zt = function (e) {
    var r = window.location,
      n = f.useState(function () {
        return ke(r.search, e);
      }),
      t = n[0],
      a = n[1];
    return (
      f.useEffect(function () {
        var o = function () {
          a(ke(r.search, e));
        };
        return (
          g(window, "popstate", o),
          g(window, "pushstate", o),
          g(window, "replacestate", o),
          function () {
            h(window, "popstate", o),
              h(window, "pushstate", o),
              h(window, "replacestate", o);
          }
        );
      }, []),
      t
    );
  },
  eu = function () {
    return null;
  };
const ru = x ? Zt : eu;
var z = {};
const G = ir(lr);
var re = {},
  Fe;
function ur() {
  if (Fe) return re;
  (Fe = 1), Object.defineProperty(re, "__esModule", { value: !0 });
  var e = G,
    r = f,
    n = parseInt(r.version.substr(0, r.version.indexOf("."))) > 15,
    t = function (o) {
      return typeof o == "function";
    },
    a = function (o, u) {
      for (var i = [], c = 2; c < arguments.length; c++)
        i[c - 2] = arguments[c];
      var s = o.render,
        l = o.children,
        v = l === void 0 ? s : l,
        d = o.component,
        p = o.comp,
        y = p === void 0 ? d : p;
      return t(v)
        ? v.apply(void 0, e.__spreadArrays([u], i))
        : y
        ? r.createElement(y, u)
        : v instanceof Array
        ? n
          ? v
          : r.createElement.apply(void 0, e.__spreadArrays(["div", null], v))
        : v && v instanceof Object
        ? typeof v.type == "string"
          ? v
          : r.cloneElement(v, Object.assign({}, v.props, u))
        : v || null;
    };
  return (re.default = a), re;
}
var B = {},
  ne = {},
  te = {},
  Ae;
function nu() {
  if (Ae) return te;
  (Ae = 1), Object.defineProperty(te, "__esModule", { value: !0 });
  var e = G,
    r = e.__importStar(f),
    n = function (t) {
      var a = (function (o) {
        e.__extends(u, o);
        function u() {
          return (o !== null && o.apply(this, arguments)) || this;
        }
        return (
          (u.prototype.render = function () {
            return t(this.props, this.context);
          }),
          u
        );
      })(r.Component);
      return a;
    };
  return (te.default = n), te;
}
var Le;
function tu() {
  if (Le) return ne;
  (Le = 1), Object.defineProperty(ne, "__esModule", { value: !0 });
  var e = G,
    r = e.__importDefault(nu()),
    n = function (t) {
      var a = !t.prototype;
      return a ? r.default(t) : t;
    };
  return (ne.default = n), ne;
}
var Ue;
function uu() {
  if (Ue) return B;
  (Ue = 1),
    Object.defineProperty(B, "__esModule", { value: !0 }),
    (B.divWrapper = void 0);
  var e = G,
    r = e.__importStar(f),
    n = e.__importDefault(tu()),
    t = r.createElement,
    a = function (u, i, c, s) {
      var l;
      return t(
        u,
        i
          ? e.__assign(((l = {}), (l[i] = s), l), c)
          : e.__assign(e.__assign({}, s), c)
      );
    };
  B.divWrapper = function (u, i, c, s) {
    return t("div", null, a(u, i, c, s));
  };
  var o = function (u, i, c) {
    c === void 0 && (c = a);
    var s = function (l, v, d) {
      v === void 0 && (v = i), d === void 0 && (d = null);
      var p = typeof l == "string";
      if (p)
        return function (S) {
          return s(S, l || i, v);
        };
      var y = function (S) {
        return t(u, d, function (w) {
          return c(l, v, S, w);
        });
      };
      return p ? n.default(y) : y;
    };
    return s;
  };
  return (B.default = o), B;
}
var ue = {},
  ze;
function ou() {
  if (ze) return ue;
  (ze = 1), Object.defineProperty(ue, "__esModule", { value: !0 });
  var e = G,
    r = e.__importDefault(ur()),
    n = function (a) {
      return [a];
    },
    t = function (a, o) {
      return (
        o === void 0 && (o = n),
        function (u) {
          return r.default(u, a.apply(void 0, o(u)));
        }
      );
    };
  return (ue.default = t), ue;
}
Object.defineProperty(z, "__esModule", { value: !0 });
z.hookToRenderProp = z.createEnhancer = z.render = void 0;
var be = G,
  au = be.__importDefault(ur());
z.render = au.default;
var iu = be.__importDefault(uu());
z.createEnhancer = iu.default;
var cu = be.__importDefault(ou());
z.hookToRenderProp = cu.default;
var fu = function (e) {
  e === void 0 && (e = {});
  var r = e.disabled,
    n = Ze(e),
    t = f.useState({ isScratching: !1 }),
    a = t[0],
    o = t[1],
    u = f.useRef(a),
    i = f.useRef(!1),
    c = f.useRef(null),
    s = f.useState(null),
    l = s[0],
    v = s[1];
  return (
    f.useEffect(
      function () {
        if (!r && l) {
          var d = function (b, $) {
              cancelAnimationFrame(c.current),
                (c.current = requestAnimationFrame(function () {
                  var T = l.getBoundingClientRect(),
                    D = T.left,
                    se = T.top,
                    J = D + window.scrollX,
                    Q = se + window.scrollY,
                    le = b - J,
                    ve = $ - Q;
                  o(function (W) {
                    var L = C(C({}, W), {
                      dx: le - (W.x || 0),
                      dy: ve - (W.y || 0),
                      end: Date.now(),
                      isScratching: !0,
                    });
                    return (u.current = L), (n.current.onScratch || M)(L), L;
                  });
                }));
            },
            p = function (b) {
              d(b.pageX, b.pageY);
            },
            y = function (b) {
              d(b.changedTouches[0].pageX, b.changedTouches[0].pageY);
            },
            S,
            w,
            O = function () {
              i.current &&
                ((i.current = !1),
                (u.current = C(C({}, u.current), { isScratching: !1 })),
                (n.current.onScratchEnd || M)(u.current),
                o({ isScratching: !1 }),
                h(window, "mousemove", p),
                h(window, "touchmove", y),
                h(window, "mouseup", S),
                h(window, "touchend", w));
            };
          (S = O), (w = O);
          var A = function (b, $) {
              if (i.current) {
                var T = l.getBoundingClientRect(),
                  D = T.left,
                  se = T.top,
                  J = D + window.scrollX,
                  Q = se + window.scrollY,
                  le = b - J,
                  ve = $ - Q,
                  W = Date.now(),
                  L = {
                    isScratching: !0,
                    start: W,
                    end: W,
                    docX: b,
                    docY: $,
                    x: le,
                    y: ve,
                    dx: 0,
                    dy: 0,
                    elH: l.offsetHeight,
                    elW: l.offsetWidth,
                    elX: J,
                    elY: Q,
                  };
                (u.current = L),
                  (n.current.onScratchStart || M)(L),
                  o(L),
                  g(window, "mousemove", p),
                  g(window, "touchmove", y),
                  g(window, "mouseup", S),
                  g(window, "touchend", w);
              }
            },
            m = function (b) {
              (i.current = !0), A(b.pageX, b.pageY);
            },
            E = function (b) {
              (i.current = !0),
                A(b.changedTouches[0].pageX, b.changedTouches[0].pageY);
            };
          return (
            g(l, "mousedown", m),
            g(l, "touchstart", E),
            function () {
              h(l, "mousedown", m),
                h(l, "touchstart", E),
                h(window, "mousemove", p),
                h(window, "touchmove", y),
                h(window, "mouseup", S),
                h(window, "touchend", w),
                c.current && cancelAnimationFrame(c.current),
                (c.current = null),
                (i.current = !1),
                (u.current = { isScratching: !1 }),
                o(u.current);
            }
          );
        }
      },
      [l, r, n]
    ),
    [v, a]
  );
};
const su = fu;
var lu = function (e) {
  var r = K({ x: 0, y: 0 }),
    n = r[0],
    t = r[1];
  return (
    f.useEffect(
      function () {
        var a = function () {
          e.current && t({ x: e.current.scrollLeft, y: e.current.scrollTop });
        };
        return (
          e.current && g(e.current, "scroll", a, { capture: !1, passive: !0 }),
          function () {
            e.current && h(e.current, "scroll", a);
          }
        );
      },
      [e]
    ),
    n
  );
};
const vu = lu;
var du = function (e) {
  var r = f.useState(!1),
    n = r[0],
    t = r[1];
  return (
    f.useEffect(
      function () {
        if (e.current) {
          var a,
            o = function () {
              t(!1);
            },
            u = function () {
              t(!0),
                clearTimeout(a),
                (a = setTimeout(function () {
                  return o();
                }, 150));
            };
          return (
            g(e.current, "scroll", u, !1),
            function () {
              e.current && h(e.current, "scroll", u, !1);
            }
          );
        }
        return function () {};
      },
      [e]
    ),
    n
  );
};
const hu = du;
var gu = function (e, r, n) {
  if (!x) return [r, function () {}];
  var t = f.useState(function () {
      try {
        var u = sessionStorage.getItem(e);
        return typeof u != "string"
          ? (sessionStorage.setItem(e, n ? String(r) : JSON.stringify(r)), r)
          : n
          ? u
          : JSON.parse(u || "null");
      } catch {
        return r;
      }
    }),
    a = t[0],
    o = t[1];
  return (
    f.useEffect(function () {
      try {
        var u = n ? String(a) : JSON.stringify(a);
        sessionStorage.setItem(e, u);
      } catch {}
    }),
    [a, o]
  );
};
const mu = gu;
var qe = Object.keys,
  pu = function (r, n) {
    if (r === n) return !0;
    if (!(r instanceof Object) || !(n instanceof Object)) return !1;
    for (var t = qe(r), a = t.length, o = 0; o < a; o++)
      if (!(t[o] in n)) return !1;
    for (var o = 0; o < a; o++) if (r[t[o]] !== n[t[o]]) return !1;
    return a === qe(n).length;
  },
  wu = function (e, r) {
    return e.every(function (n, t) {
      return pu(n, r[t]);
    });
  },
  yu = function (e, r) {
    Se(e, r, wu);
  };
const Su = yu;
var Eu = f.useState,
  bu = f.useEffect,
  Cu = f.useRef,
  Ru = function (e) {
    return setTimeout(e, 35);
  },
  Mu = function (e, r) {
    var n = r === void 0 ? {} : r,
      t = n.width,
      a = t === void 0 ? 1 / 0 : t,
      o = n.height,
      u = o === void 0 ? 1 / 0 : o;
    if (!x)
      return [
        typeof e == "function" ? e({ width: a, height: u }) : e,
        { width: a, height: u },
      ];
    var i = Eu({ width: a, height: u }),
      c = i[0],
      s = i[1];
    typeof e == "function" && (e = e(c));
    var l = e.props.style || {},
      v = Cu(null),
      d = null,
      p = function () {
        var w = v.current,
          O = w
            ? { width: w.offsetWidth, height: w.offsetHeight }
            : { width: a, height: u };
        s(O);
      },
      y = function (w) {
        g(w, "resize", p), Ru(p);
      };
    bu(function () {
      var w = v.current;
      if (w) {
        if (w.contentWindow) (d = w.contentWindow), y(d);
        else {
          var O = function () {
            g(w, "load", O), (d = w.contentWindow), y(d);
          };
          h(w, "load", O);
        }
        return function () {
          d && d.removeEventListener && h(d, "resize", p);
        };
      }
    }, []),
      (l.position = "relative");
    var S = f.cloneElement.apply(
      cr,
      I(
        [e, { style: l }],
        I(
          [
            f.createElement("iframe", {
              ref: v,
              style: {background: "transparent",
                border: "none",
                height: "100%",
                left: 0,
                position: "absolute",
                top: 0,
                width: "100%",
                zIndex: -1,
              },
            }),
          ],
          f.Children.toArray(e.props.children)
        )
      )
    );
    return [S, c];
  };
const xu = Mu;
var Ou = function (e, r) {
  r === void 0 && (r = {});
  var n = q(),
    t = f.useRef(!1),
    a = f.useRef(0),
    o = f.useRef(0),
    u = ie({ isSliding: !1, value: 0 }),
    i = u[0],
    c = u[1];
  return (
    (a.current = i.value),
    f.useEffect(
      function () {
        if (x) {
          var s = r.styles === void 0 ? !0 : r.styles,
            l = r.reverse === void 0 ? !1 : r.reverse;
          e.current && s && (e.current.style.userSelect = "none");
          var v = function () {
              !t.current &&
                n() &&
                ((r.onScrubStart || M)(),
                (t.current = !0),
                c({ isSliding: !0 }),
                O());
            },
            d = function () {
              t.current &&
                n() &&
                ((r.onScrubStop || M)(a.current),
                (t.current = !1),
                c({ isSliding: !1 }),
                A());
            },
            p = function (E) {
              v(), y(E);
            },
            y = r.vertical
              ? function (E) {
                  return m(E.clientY);
                }
              : function (E) {
                  return m(E.clientX);
                },
            S = function (E) {
              v(), w(E);
            },
            w = r.vertical
              ? function (E) {
                  return m(E.changedTouches[0].clientY);
                }
              : function (E) {
                  return m(E.changedTouches[0].clientX);
                },
            O = function () {
              g(document, "mousemove", y),
                g(document, "mouseup", d),
                g(document, "touchmove", w),
                g(document, "touchend", d);
            },
            A = function () {
              h(document, "mousemove", y),
                h(document, "mouseup", d),
                h(document, "touchmove", w),
                h(document, "touchend", d);
            },
            m = function (E) {
              cancelAnimationFrame(o.current),
                (o.current = requestAnimationFrame(function () {
                  if (n() && e.current) {
                    var b = e.current.getBoundingClientRect(),
                      $ = r.vertical ? b.top : b.left,
                      T = r.vertical ? b.height : b.width;
                    if (!T) return;
                    var D = (E - $) / T;
                    D > 1 ? (D = 1) : D < 0 && (D = 0),
                      l && (D = 1 - D),
                      c({ value: D }),
                      (r.onScrub || M)(D);
                  }
                }));
            };
          return (
            g(e.current, "mousedown", p),
            g(e.current, "touchstart", S),
            function () {
              h(e.current, "mousedown", p), h(e.current, "touchstart", S);
            }
          );
        } else return;
      },
      [e, r.vertical]
    ),
    i
  );
};
const Du = Ou;
var _;
(function (e) {
  (e[(e.init = 0)] = "init"),
    (e[(e.play = 1)] = "play"),
    (e[(e.pause = 2)] = "pause"),
    (e[(e.end = 3)] = "end");
})(_ || (_ = {}));
var Pu = function (e, r) {
  var n = f.useRef(!1),
    t = f.useState(function () {
      var s = r.voice || {},
        l = s.lang,
        v = l === void 0 ? "default" : l,
        d = s.name,
        p = d === void 0 ? "" : d;
      return {
        isPlaying: !1,
        status: _[_.init],
        lang: r.lang || "default",
        voiceInfo: { lang: v, name: p },
        rate: r.rate || 1,
        pitch: r.pitch || 1,
        volume: r.volume || 1,
      };
    }),
    a = t[0],
    o = t[1],
    u = f.useCallback(function () {
      n.current &&
        o(function (s) {
          return C(C({}, s), { isPlaying: !0, status: _[_.play] });
        });
    }, []),
    i = f.useCallback(function () {
      n.current &&
        o(function (s) {
          return C(C({}, s), { isPlaying: !1, status: _[_.pause] });
        });
    }, []),
    c = f.useCallback(function () {
      n.current &&
        o(function (s) {
          return C(C({}, s), { isPlaying: !1, status: _[_.end] });
        });
    }, []);
  return (
    f.useEffect(function () {
      n.current = !0;
      var s = new SpeechSynthesisUtterance(e);
      return (
        r.lang && (s.lang = r.lang),
        r.voice && (s.voice = r.voice),
        (s.rate = r.rate || 1),
        (s.pitch = r.pitch || 1),
        (s.volume = r.volume || 1),
        (s.onstart = u),
        (s.onpause = i),
        (s.onresume = u),
        (s.onend = c),
        window.speechSynthesis.speak(s),
        function () {
          n.current = !1;
        }
      );
    }, []),
    a
  );
};
const _u = Pu;
var Iu = function () {
    var e = document.activeElement,
      r = document.body;
    if (!e || e === r) return !1;
    switch (e.tagName) {
      case "INPUT":
      case "TEXTAREA":
        return !0;
    }
    return e.hasAttribute("contenteditable");
  },
  $u = function (e) {
    var r = e.keyCode,
      n = e.metaKey,
      t = e.ctrlKey,
      a = e.altKey;
    return n || t || a ? !1 : (r >= 48 && r <= 57) || (r >= 65 && r <= 90);
  },
  Tu = function (e) {
    F(function () {
      var r = function (n) {
        !Iu() && $u(n) && e(n);
      };
      return (
        g(document, "keydown", r),
        function () {
          h(document, "keydown", r);
        }
      );
    }, []);
  };
const ku = Tu;
function Fu(e, r, n) {
  if ((r === void 0 && (r = 10), r < 1))
    throw new Error("Capacity has to be greater than 1, got '" + r + "'");
  var t = ae(),
    a = f.useState(e),
    o = a[0],
    u = a[1],
    i = f.useRef(n ?? []),
    c = f.useRef(0);
  t &&
    (i.current.length
      ? (i.current[i.current.length - 1] !== e && i.current.push(e),
        i.current.length > r &&
          (i.current = i.current.slice(i.current.length - r)))
      : i.current.push(e),
    (c.current = i.current.length && i.current.length - 1));
  var s = f.useCallback(
      function (v) {
        u(function (d) {
          return (
            (v = P(v, d)),
            v !== d &&
              (c.current < i.current.length - 1 &&
                (i.current = i.current.slice(0, c.current + 1)),
              (c.current = i.current.push(v) - 1),
              i.current.length > r &&
                (i.current = i.current.slice(i.current.length - r))),
            v
          );
        });
      },
      [o, r]
    ),
    l = f.useMemo(
      function () {
        return {
          history: i.current,
          position: c.current,
          capacity: r,
          back: function (v) {
            v === void 0 && (v = 1),
              c.current &&
                u(function () {
                  return (
                    (c.current -= Math.min(v, c.current)), i.current[c.current]
                  );
                });
          },
          forward: function (v) {
            v === void 0 && (v = 1),
              c.current !== i.current.length - 1 &&
                u(function () {
                  return (
                    (c.current = Math.min(c.current + v, i.current.length - 1)),
                    i.current[c.current]
                  );
                });
          },
          go: function (v) {
            v !== c.current &&
              u(function () {
                return (
                  (c.current =
                    v < 0
                      ? Math.max(i.current.length + v, 0)
                      : Math.min(i.current.length - 1, v)),
                  i.current[c.current]
                );
              });
          },
        };
      },
      [o]
    );
  return [o, s, l];
}
function Au(e) {
  e === void 0 && (e = []);
  var r = q(),
    n = Y(),
    t = f.useRef(0);
  V(
    function () {
      e.length <= t.current && ((t.current = e.length - 1), n());
    },
    [e.length]
  );
  var a = f.useMemo(
    function () {
      return {
        next: function () {
          return a.setStateAt(t.current + 1);
        },
        prev: function () {
          return a.setStateAt(t.current - 1);
        },
        setStateAt: function (o) {
          r() &&
            e.length &&
            o !== t.current &&
            ((t.current = o >= 0 ? o % e.length : e.length + (o % e.length)),
            n());
        },
        setState: function (o) {
          if (r()) {
            var u = e.length ? e.indexOf(o) : -1;
            if (u === -1)
              throw new Error(
                "State '" +
                  o +
                  "' is not a valid state (does not exist in state list)"
              );
            (t.current = u), n();
          }
        },
      };
    },
    [e]
  );
  return C(
    {
      state: e[t.current],
      currentIndex: t.current,
      isFirst: t.current === 0,
      isLast: t.current === e.length - 1,
    },
    a
  );
}
var Lu = function (e, r) {
  r === void 0 && (r = 200);
  var n = f.useState(e),
    t = n[0],
    a = n[1],
    o = f.useRef(),
    u = f.useRef(null),
    i = f.useRef(0);
  return (
    f.useEffect(
      function () {
        if (o.current) (u.current = e), (i.current = !0);
        else {
          a(e);
          var c = function () {
            i.current
              ? ((i.current = !1), a(u.current), (o.current = setTimeout(c, r)))
              : (o.current = void 0);
          };
          o.current = setTimeout(c, r);
        }
      },
      [e]
    ),
    fe(function () {
      o.current && clearTimeout(o.current);
    }),
    t
  );
};
const Uu = Lu;
var zu = function (e, r, n) {
  r === void 0 && (r = 200);
  var t = f.useState(null),
    a = t[0],
    o = t[1],
    u = f.useRef(),
    i = f.useRef();
  return (
    f.useEffect(function () {
      if (u.current) i.current = n;
      else {
        o(e.apply(void 0, n));
        var c = function () {
          i.current
            ? (o(e.apply(void 0, i.current)),
              (i.current = void 0),
              (u.current = setTimeout(c, r)))
            : (u.current = void 0);
        };
        u.current = setTimeout(c, r);
      }
    }, n),
    fe(function () {
      u.current && clearTimeout(u.current);
    }),
    a
  );
};
const qu = zu;
function Wu(e) {
  e === void 0 && (e = 0);
  var r = Y();
  return Ee(r, e);
}
var ju = { restoreOnUnmount: !1 };
function Bu(e, r) {
  r === void 0 && (r = ju);
  var n = f.useRef(document.title);
  document.title !== e && (document.title = e),
    f.useEffect(function () {
      if (r && r.restoreOnUnmount)
        return function () {
          document.title = n.current;
        };
    }, []);
}
const Hu = typeof document < "u" ? Bu : function (e) {};
var or = {};
Object.defineProperty(or, "__esModule", { value: !0 });
var Xu = (or.easing = {
    linear: function (e) {
      return e;
    },
    quadratic: function (e) {
      return e * (-(e * e) * e + 4 * e * e - 6 * e + 4);
    },
    cubic: function (e) {
      return e * (4 * e * e - 9 * e + 6);
    },
    elastic: function (e) {
      return (
        e * (33 * e * e * e * e - 106 * e * e * e + 126 * e * e - 67 * e + 15)
      );
    },
    inQuad: function (e) {
      return e * e;
    },
    outQuad: function (e) {
      return e * (2 - e);
    },
    inOutQuad: function (e) {
      return e < 0.5 ? 2 * e * e : -1 + (4 - 2 * e) * e;
    },
    inCubic: function (e) {
      return e * e * e;
    },
    outCubic: function (e) {
      return --e * e * e + 1;
    },
    inOutCubic: function (e) {
      return e < 0.5 ? 4 * e * e * e : (e - 1) * (2 * e - 2) * (2 * e - 2) + 1;
    },
    inQuart: function (e) {
      return e * e * e * e;
    },
    outQuart: function (e) {
      return 1 - --e * e * e * e;
    },
    inOutQuart: function (e) {
      return e < 0.5 ? 8 * e * e * e * e : 1 - 8 * --e * e * e * e;
    },
    inQuint: function (e) {
      return e * e * e * e * e;
    },
    outQuint: function (e) {
      return 1 + --e * e * e * e * e;
    },
    inOutQuint: function (e) {
      return e < 0.5 ? 16 * e * e * e * e * e : 1 + 16 * --e * e * e * e * e;
    },
    inSine: function (e) {
      return -Math.cos(e * (Math.PI / 2)) + 1;
    },
    outSine: function (e) {
      return Math.sin(e * (Math.PI / 2));
    },
    inOutSine: function (e) {
      return -(Math.cos(Math.PI * e) - 1) / 2;
    },
    inExpo: function (e) {
      return Math.pow(2, 10 * (e - 1));
    },
    outExpo: function (e) {
      return -Math.pow(2, -10 * e) + 1;
    },
    inOutExpo: function (e) {
      return (
        (e /= 0.5),
        e < 1
          ? Math.pow(2, 10 * (e - 1)) / 2
          : (e--, (-Math.pow(2, -10 * e) + 2) / 2)
      );
    },
    inCirc: function (e) {
      return -Math.sqrt(1 - e * e) + 1;
    },
    outCirc: function (e) {
      return Math.sqrt(1 - (e = e - 1) * e);
    },
    inOutCirc: function (e) {
      return (
        (e /= 0.5),
        e < 1
          ? -(Math.sqrt(1 - e * e) - 1) / 2
          : ((e -= 2), (Math.sqrt(1 - e * e) + 1) / 2)
      );
    },
  }),
  Yu = function (e, r, n) {
    e === void 0 && (e = "inCirc"),
      r === void 0 && (r = 200),
      n === void 0 && (n = 0);
    var t = Xu[e],
      a = tr(r, n);
    return t(a);
  };
const Nu = Yu;
var Gu = function () {
  var e = f.useRef(!1);
  N(function () {
    return function () {
      e.current = !0;
    };
  });
  var r = f.useMemo(function () {
    var n = function (t, a) {
      var o = new Promise(function (u, i) {
        t.then(
          function (c) {
            e.current || u(c);
          },
          function (c) {
            e.current
              ? a
                ? a(c)
                : console.error("useUnmountPromise", c)
              : i(c);
          }
        );
      });
      return o;
    };
    return n;
  }, []);
  return r;
};
const Vu = Gu;
function Ku(e, r) {
  r === void 0 && (r = []);
  var n = rr(r),
    t = n[0],
    a = n[1];
  return [
    t,
    C(C({}, a), {
      upsert: function (o) {
        a.upsert(e, o);
      },
    }),
  ];
}
var Ju = ce && "vibrate" in navigator;
function Qu(e, r, n) {
  e === void 0 && (e = !0),
    r === void 0 && (r = [1e3, 1e3]),
    n === void 0 && (n = !0),
    f.useEffect(
      function () {
        var t;
        if (e && (navigator.vibrate(r), n)) {
          var a =
            r instanceof Array
              ? r.reduce(function (o, u) {
                  return o + u;
                })
              : r;
          t = setInterval(function () {
            navigator.vibrate(r);
          }, a);
        }
        return function () {
          e && (navigator.vibrate(0), n && clearInterval(t));
        };
      },
      [e]
    );
}
const Zu = Ju ? Qu : M;
var eo = Be("video");
const ro = eo;
function no(e, r, n) {
  n === void 0 && (n = [void 0]);
  var t = f.useRef(r),
    a = f.useRef(e);
  (t.current = r), (a.current = e);
  var o = f.useState(n),
    u = o[0],
    i = o[1],
    c = f.useCallback(
      function () {
        t.current.length >= 2
          ? t.current(a.current, i)
          : i(t.current(a.current));
      },
      [i]
    );
  return (
    f.useEffect(
      function () {
        c();
      },
      [e]
    ),
    [u, c]
  );
}
var X = function (e) {
  if (typeof document > "u") return 0;
  if (
    document.body &&
    (!document.readyState || document.readyState !== "loading")
  ) {
    if (e !== !0 && typeof X.__cache == "number") return X.__cache;
    var r = document.createElement("div"),
      n = r.style;
    (n.display = "block"),
      (n.position = "absolute"),
      (n.width = "100px"),
      (n.height = "100px"),
      (n.left = "-999px"),
      (n.top = "-999px"),
      (n.overflow = "scroll"),
      document.body.insertBefore(r, null);
    var t = r.clientWidth;
    if (t !== 0)
      return (X.__cache = 100 - t), document.body.removeChild(r), X.__cache;
    document.body.removeChild(r);
  }
};
function to() {
  var e = f.useState(X()),
    r = e[0],
    n = e[1];
  return (
    f.useEffect(function () {
      if (!(typeof r < "u")) {
        var t = requestAnimationFrame(function () {
          n(X());
        });
        return function () {
          return cancelAnimationFrame(t);
        };
      }
    }, []),
    r
  );
}
function uo(e, r, n) {
  if ((n === void 0 && (n = [void 0]), typeof e != "object"))
    throw new Error(
      "states expected to be an object or array, got " + typeof e
    );
  var t = f.useRef(r),
    a = f.useRef(e);
  (t.current = r), (a.current = e);
  var o = f.useState(n),
    u = o[0],
    i = o[1],
    c = f.useCallback(
      function () {
        t.current.length >= 2
          ? t.current(a.current, i)
          : i(t.current(a.current));
      },
      [i]
    );
  return (
    f.useEffect(function () {
      c();
    }, Object.values(e)),
    [u, c]
  );
}
var oo = function () {
  var e = K(function () {
      return { x: x ? window.pageXOffset : 0, y: x ? window.pageYOffset : 0 };
    }),
    r = e[0],
    n = e[1];
  return (
    f.useEffect(function () {
      var t = function () {
        n(function (a) {
          var o = window.pageXOffset,
            u = window.pageYOffset;
          return a.x !== o || a.y !== u ? { x: o, y: u } : a;
        });
      };
      return (
        t(),
        g(window, "scroll", t, { capture: !1, passive: !0 }),
        function () {
          h(window, "scroll", t);
        }
      );
    }, []),
    r
  );
};
const ao = oo;
var io = function (e) {
  var r = e === void 0 ? {} : e,
    n = r.initialWidth,
    t = n === void 0 ? 1 / 0 : n,
    a = r.initialHeight,
    o = a === void 0 ? 1 / 0 : a,
    u = r.onChange,
    i = K({
      width: x ? window.innerWidth : t,
      height: x ? window.innerHeight : o,
    }),
    c = i[0],
    s = i[1];
  return (
    f.useEffect(function () {
      if (x) {
        var l = function () {
          var v = window.innerWidth,
            d = window.innerHeight;
          s({ width: v, height: d }), u && u(v, d);
        };
        return (
          g(window, "resize", l),
          function () {
            h(window, "resize", l);
          }
        );
      }
    }, []),
    c
  );
};
const co = io;
var ar = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
};
function fo() {
  var e = f.useState(null),
    r = e[0],
    n = e[1],
    t = f.useState(ar),
    a = t[0],
    o = t[1],
    u = f.useMemo(function () {
      return new window.ResizeObserver(function (i) {
        if (i[0]) {
          var c = i[0].contentRect,
            s = c.x,
            l = c.y,
            v = c.width,
            d = c.height,
            p = c.top,
            y = c.left,
            S = c.bottom,
            w = c.right;
          o({
            x: s,
            y: l,
            width: v,
            height: d,
            top: p,
            left: y,
            bottom: S,
            right: w,
          });
        }
      });
    }, []);
  return (
    F(
      function () {
        if (r)
          return (
            u.observe(r),
            function () {
              u.disconnect();
            }
          );
      },
      [r]
    ),
    [n, a]
  );
}
const so =
  x && typeof window.ResizeObserver < "u"
    ? fo
    : function () {
        return [M, ar];
      };
var oe;
(function (e) {
  (e.ZOOMING_IN = "ZOOMING_IN"), (e.ZOOMING_OUT = "ZOOMING_OUT");
})(oe || (oe = {}));
var lo = function (e) {
  var r = f.useMemo(
      function () {
        return { evCache: [], prevDiff: -1 };
      },
      [e.current]
    ),
    n = f.useState(),
    t = n[0],
    a = n[1],
    o = function (s) {
      for (var l = 0; l < r.evCache.length; l++)
        if (s.pointerId == r.evCache[l].pointerId) {
          r.evCache[l] = s;
          break;
        }
      if (r.evCache.length == 2) {
        var v = Math.abs(r.evCache[0].clientX - r.evCache[1].clientX);
        r.prevDiff > 0 &&
          (v > r.prevDiff && a([oe.ZOOMING_IN, v]),
          v < r.prevDiff && a([oe.ZOOMING_OUT, v])),
          (r.prevDiff = v);
      }
    },
    u = function (s) {
      r.evCache.push(s);
    },
    i = function (s) {
      c(s), r.evCache.length < 2 && (r.prevDiff = -1);
    },
    c = function (s) {
      for (var l = 0; l < r.evCache.length; l++)
        if (r.evCache[l].pointerId == s.pointerId) {
          r.evCache.splice(l, 1);
          break;
        }
    };
  return (
    f.useEffect(
      function () {
        e != null &&
          e.current &&
          ((e.current.onpointerdown = u),
          (e.current.onpointermove = o),
          (e.current.onpointerup = i),
          (e.current.onpointercancel = i),
          (e.current.onpointerout = i),
          (e.current.onpointerleave = i));
      },
      [e == null ? void 0 : e.current]
    ),
    t
      ? { zoomingState: t[0], pinchState: t[1] }
      : { zoomingState: null, pinchState: 0 }
  );
};
const vo = lo;
function ho() {
  return ++f.useRef(0).current;
}
var go = function (e) {
  e === void 0 && (e = new Set());
  var r = f.useState(e),
    n = r[0],
    t = r[1],
    a = f.useMemo(
      function () {
        var u = function (s) {
            return t(function (l) {
              return new Set(I(Array.from(l), [s]));
            });
          },
          i = function (s) {
            return t(function (l) {
              return new Set(
                Array.from(l).filter(function (v) {
                  return v !== s;
                })
              );
            });
          },
          c = function (s) {
            return t(function (l) {
              return l.has(s)
                ? new Set(
                    Array.from(l).filter(function (v) {
                      return v !== s;
                    })
                  )
                : new Set(I(Array.from(l), [s]));
            });
          };
        return {
          add: u,
          remove: i,
          toggle: c,
          reset: function () {
            return t(e);
          },
          clear: function () {
            return t(new Set());
          },
        };
      },
      [t]
    ),
    o = C(
      {
        has: f.useCallback(
          function (u) {
            return n.has(u);
          },
          [n]
        ),
      },
      a
    );
  return [n, o];
};
const mo = go;
function po(e) {
  var r = {
    state: e instanceof Function ? e() : e,
    setState: function (n) {
      (r.state = P(n, r.state)),
        r.setters.forEach(function (t) {
          return t(r.state);
        });
    },
    setters: [],
  };
  return function () {
    var n = f.useState(r.state),
      t = n[0],
      a = n[1];
    return (
      N(function () {
        return function () {
          r.setters = r.setters.filter(function (o) {
            return o !== a;
          });
        };
      }),
      F(function () {
        r.setters.includes(a) || r.setters.push(a);
      }),
      [t, r.setState]
    );
  };
}
var wo = function () {
  var e = f.useState(function () {
      return window.location.hash;
    }),
    r = e[0],
    n = e[1],
    t = f.useCallback(function () {
      n(window.location.hash);
    }, []);
  er(
    function () {
      g(window, "hashchange", t);
    },
    function () {
      h(window, "hashchange", t);
    }
  );
  var a = f.useCallback(
    function (o) {
      o !== r && (window.location.hash = o);
    },
    [r]
  );
  return [r, a];
};
const Eo = Object.freeze(
  Object.defineProperty(
    {
      __proto__: null,
      createBreakpoint: Vn,
      createGlobalState: po,
      createMemo: dr,
      createReducer: wr,
      createReducerContext: gr,
      createStateContext: Sr,
      ensuredForwardRef: gn,
      useAsync: je,
      useAsyncFn: We,
      useAsyncRetry: br,
      useAudio: Rr,
      useBattery: Pr,
      useBeforeUnload: Ir,
      useBoolean: Re,
      useClickAway: Fr,
      useCookie: Ur,
      useCopyToClipboard: qr,
      useCounter: Me,
      useCss: Zr,
      useCustomCompareEffect: Se,
      useDebounce: rn,
      useDeepCompareEffect: tn,
      useDefault: on,
      useDrop: fn,
      useDropArea: dn,
      useEffectOnce: N,
      useEnsuredForwardedRef: Ge,
      useError: yn,
      useEvent: Ve,
      useFavicon: Sn,
      useFirstMountState: ae,
      useFullscreen: Cn,
      useGeolocation: Mn,
      useGetSet: Ye,
      useGetSetState: On,
      useHarmonicIntervalFn: $n,
      useHash: wo,
      useHover: Fn,
      useHoverDirty: Je,
      useIdle: Wn,
      useIntersection: Bn,
      useInterval: Xn,
      useIsomorphicLayoutEffect: F,
      useKey: me,
      useKeyPress: Qe,
      useKeyPressEvent: Qn,
      useLatest: Ze,
      useLifecycles: er,
      useList: rr,
      useLocalStorage: nt,
      useLocation: at,
      useLockBodyScroll: it,
      useLogger: ft,
      useLongPress: vt,
      useMap: ht,
      useMeasure: so,
      useMedia: pt,
      useMediaDevices: St,
      useMediatedState: Et,
      useMethods: Ct,
      useMotion: xt,
      useMount: Dt,
      useMountedState: q,
      useMouse: nr,
      useMouseHovered: Tt,
      useMouseWheel: kt,
      useMultiStateValidator: uo,
      useNetworkState: Ft,
      useNumber: Me,
      useObservable: At,
      useOrientation: zt,
      usePageLeave: Wt,
      usePermission: Bt,
      usePinchZoom: vo,
      usePrevious: Ht,
      usePreviousDistinct: Yt,
      usePromise: Gt,
      useQueue: Kt,
      useRaf: tr,
      useRafLoop: Qt,
      useRafState: K,
      useRendersCount: ho,
      useScratch: su,
      useScroll: vu,
      useScrollbarWidth: to,
      useScrolling: hu,
      useSearchParam: ru,
      useSessionStorage: mu,
      useSet: mo,
      useSetState: ie,
      useShallowCompareEffect: Su,
      useSize: xu,
      useSlider: Du,
      useSpeech: _u,
      useStartTyping: ku,
      useStateList: Au,
      useStateValidator: no,
      useStateWithHistory: Fu,
      useThrottle: Uu,
      useThrottleFn: qu,
      useTimeout: Wu,
      useTimeoutFn: Ee,
      useTitle: Hu,
      useToggle: Re,
      useTween: Nu,
      useUnmount: fe,
      useUnmountPromise: Vu,
      useUpdate: Y,
      useUpdateEffect: V,
      useUpsert: Ku,
      useVibrate: Zu,
      useVideo: ro,
      useWindowScroll: ao,
      useWindowSize: co,
    },
    Symbol.toStringTag,
    { value: "Module" }
  )
);
export { Hu as a, Sn as b, Ht as c, rr as d, Eo as e, co as u };

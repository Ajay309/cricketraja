function Uc(e, t) {
  for (var n = 0; n < t.length; n++) {
    const r = t[n];
    if (typeof r != "string" && !Array.isArray(r)) {
      for (const l in r)
        if (l !== "default" && !(l in e)) {
          const o = Object.getOwnPropertyDescriptor(r, l);
          o &&
            Object.defineProperty(
              e,
              l,
              o.get ? o : { enumerable: !0, get: () => r[l] }
            );
        }
    }
  }
  return Object.freeze(
    Object.defineProperty(e, Symbol.toStringTag, { value: "Module" })
  );
}
var zg =
  typeof globalThis < "u"
    ? globalThis
    : typeof window < "u"
    ? window
    : typeof global < "u"
    ? global
    : typeof self < "u"
    ? self
    : {};
function jc(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
function Fg(e) {
  if (e.__esModule) return e;
  var t = e.default;
  if (typeof t == "function") {
    var n = function r() {
      return this instanceof r
        ? Reflect.construct(t, arguments, this.constructor)
        : t.apply(this, arguments);
    };
    n.prototype = t.prototype;
  } else n = {};
  return (
    Object.defineProperty(n, "__esModule", { value: !0 }),
    Object.keys(e).forEach(function (r) {
      var l = Object.getOwnPropertyDescriptor(e, r);
      Object.defineProperty(
        n,
        r,
        l.get
          ? l
          : {
              enumerable: !0,
              get: function () {
                return e[r];
              },
            }
      );
    }),
    n
  );
}
var Ac = { exports: {} },
  Q = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var _l = Symbol.for("react.element"),
  th = Symbol.for("react.portal"),
  nh = Symbol.for("react.fragment"),
  rh = Symbol.for("react.strict_mode"),
  lh = Symbol.for("react.profiler"),
  oh = Symbol.for("react.provider"),
  ih = Symbol.for("react.context"),
  ah = Symbol.for("react.forward_ref"),
  uh = Symbol.for("react.suspense"),
  sh = Symbol.for("react.memo"),
  ch = Symbol.for("react.lazy"),
  us = Symbol.iterator;
function fh(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (us && e[us]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var Bc = {
    isMounted: function () {
      return !1;
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {},
  },
  $c = Object.assign,
  Hc = {};
function Cr(e, t, n) {
  (this.props = e),
    (this.context = t),
    (this.refs = Hc),
    (this.updater = n || Bc);
}
Cr.prototype.isReactComponent = {};
Cr.prototype.setState = function (e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null)
    throw Error(
      "setState(...): takes an object of state variables to update or a function which returns an object of state variables."
    );
  this.updater.enqueueSetState(this, e, t, "setState");
};
Cr.prototype.forceUpdate = function (e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function Vc() {}
Vc.prototype = Cr.prototype;
function Wa(e, t, n) {
  (this.props = e),
    (this.context = t),
    (this.refs = Hc),
    (this.updater = n || Bc);
}
var Ka = (Wa.prototype = new Vc());
Ka.constructor = Wa;
$c(Ka, Cr.prototype);
Ka.isPureReactComponent = !0;
var ss = Array.isArray,
  Wc = Object.prototype.hasOwnProperty,
  Qa = { current: null },
  Kc = { key: !0, ref: !0, __self: !0, __source: !0 };
function Qc(e, t, n) {
  var r,
    l = {},
    o = null,
    i = null;
  if (t != null)
    for (r in (t.ref !== void 0 && (i = t.ref),
    t.key !== void 0 && (o = "" + t.key),
    t))
      Wc.call(t, r) && !Kc.hasOwnProperty(r) && (l[r] = t[r]);
  var a = arguments.length - 2;
  if (a === 1) l.children = n;
  else if (1 < a) {
    for (var u = Array(a), s = 0; s < a; s++) u[s] = arguments[s + 2];
    l.children = u;
  }
  if (e && e.defaultProps)
    for (r in ((a = e.defaultProps), a)) l[r] === void 0 && (l[r] = a[r]);
  return {
    $$typeof: _l,
    type: e,
    key: o,
    ref: i,
    props: l,
    _owner: Qa.current,
  };
}
function dh(e, t) {
  return {
    $$typeof: _l,
    type: e.type,
    key: t,
    ref: e.ref,
    props: e.props,
    _owner: e._owner,
  };
}
function Ya(e) {
  return typeof e == "object" && e !== null && e.$$typeof === _l;
}
function ph(e) {
  var t = { "=": "=0", ":": "=2" };
  return (
    "$" +
    e.replace(/[=:]/g, function (n) {
      return t[n];
    })
  );
}
var cs = /\/+/g;
function wi(e, t) {
  return typeof e == "object" && e !== null && e.key != null
    ? ph("" + e.key)
    : t.toString(36);
}
function io(e, t, n, r, l) {
  var o = typeof e;
  (o === "undefined" || o === "boolean") && (e = null);
  var i = !1;
  if (e === null) i = !0;
  else
    switch (o) {
      case "string":
      case "number":
        i = !0;
        break;
      case "object":
        switch (e.$$typeof) {
          case _l:
          case th:
            i = !0;
        }
    }
  if (i)
    return (
      (i = e),
      (l = l(i)),
      (e = r === "" ? "." + wi(i, 0) : r),
      ss(l)
        ? ((n = ""),
          e != null && (n = e.replace(cs, "$&/") + "/"),
          io(l, t, n, "", function (s) {
            return s;
          }))
        : l != null &&
          (Ya(l) &&
            (l = dh(
              l,
              n +
                (!l.key || (i && i.key === l.key)
                  ? ""
                  : ("" + l.key).replace(cs, "$&/") + "/") +
                e
            )),
          t.push(l)),
      1
    );
  if (((i = 0), (r = r === "" ? "." : r + ":"), ss(e)))
    for (var a = 0; a < e.length; a++) {
      o = e[a];
      var u = r + wi(o, a);
      i += io(o, t, n, u, l);
    }
  else if (((u = fh(e)), typeof u == "function"))
    for (e = u.call(e), a = 0; !(o = e.next()).done; )
      (o = o.value), (u = r + wi(o, a++)), (i += io(o, t, n, u, l));
  else if (o === "object")
    throw (
      ((t = String(e)),
      Error(
        "Objects are not valid as a React child (found: " +
          (t === "[object Object]"
            ? "object with keys {" + Object.keys(e).join(", ") + "}"
            : t) +
          "). If you meant to render a collection of children, use an array instead."
      ))
    );
  return i;
}
function $l(e, t, n) {
  if (e == null) return e;
  var r = [],
    l = 0;
  return (
    io(e, r, "", "", function (o) {
      return t.call(n, o, l++);
    }),
    r
  );
}
function hh(e) {
  if (e._status === -1) {
    var t = e._result;
    (t = t()),
      t.then(
        function (n) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 1), (e._result = n));
        },
        function (n) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 2), (e._result = n));
        }
      ),
      e._status === -1 && ((e._status = 0), (e._result = t));
  }
  if (e._status === 1) return e._result.default;
  throw e._result;
}
var Be = { current: null },
  ao = { transition: null },
  mh = {
    ReactCurrentDispatcher: Be,
    ReactCurrentBatchConfig: ao,
    ReactCurrentOwner: Qa,
  };
function Yc() {
  throw Error("act(...) is not supported in production builds of React.");
}
Q.Children = {
  map: $l,
  forEach: function (e, t, n) {
    $l(
      e,
      function () {
        t.apply(this, arguments);
      },
      n
    );
  },
  count: function (e) {
    var t = 0;
    return (
      $l(e, function () {
        t++;
      }),
      t
    );
  },
  toArray: function (e) {
    return (
      $l(e, function (t) {
        return t;
      }) || []
    );
  },
  only: function (e) {
    if (!Ya(e))
      throw Error(
        "React.Children.only expected to receive a single React element child."
      );
    return e;
  },
};
Q.Component = Cr;
Q.Fragment = nh;
Q.Profiler = lh;
Q.PureComponent = Wa;
Q.StrictMode = rh;
Q.Suspense = uh;
Q.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = mh;
Q.act = Yc;
Q.cloneElement = function (e, t, n) {
  if (e == null)
    throw Error(
      "React.cloneElement(...): The argument must be a React element, but you passed " +
        e +
        "."
    );
  var r = $c({}, e.props),
    l = e.key,
    o = e.ref,
    i = e._owner;
  if (t != null) {
    if (
      (t.ref !== void 0 && ((o = t.ref), (i = Qa.current)),
      t.key !== void 0 && (l = "" + t.key),
      e.type && e.type.defaultProps)
    )
      var a = e.type.defaultProps;
    for (u in t)
      Wc.call(t, u) &&
        !Kc.hasOwnProperty(u) &&
        (r[u] = t[u] === void 0 && a !== void 0 ? a[u] : t[u]);
  }
  var u = arguments.length - 2;
  if (u === 1) r.children = n;
  else if (1 < u) {
    a = Array(u);
    for (var s = 0; s < u; s++) a[s] = arguments[s + 2];
    r.children = a;
  }
  return { $$typeof: _l, type: e.type, key: l, ref: o, props: r, _owner: i };
};
Q.createContext = function (e) {
  return (
    (e = {
      $$typeof: ih,
      _currentValue: e,
      _currentValue2: e,
      _threadCount: 0,
      Provider: null,
      Consumer: null,
      _defaultValue: null,
      _globalName: null,
    }),
    (e.Provider = { $$typeof: oh, _context: e }),
    (e.Consumer = e)
  );
};
Q.createElement = Qc;
Q.createFactory = function (e) {
  var t = Qc.bind(null, e);
  return (t.type = e), t;
};
Q.createRef = function () {
  return { current: null };
};
Q.forwardRef = function (e) {
  return { $$typeof: ah, render: e };
};
Q.isValidElement = Ya;
Q.lazy = function (e) {
  return { $$typeof: ch, _payload: { _status: -1, _result: e }, _init: hh };
};
Q.memo = function (e, t) {
  return { $$typeof: sh, type: e, compare: t === void 0 ? null : t };
};
Q.startTransition = function (e) {
  var t = ao.transition;
  ao.transition = {};
  try {
    e();
  } finally {
    ao.transition = t;
  }
};
Q.unstable_act = Yc;
Q.useCallback = function (e, t) {
  return Be.current.useCallback(e, t);
};
Q.useContext = function (e) {
  return Be.current.useContext(e);
};
Q.useDebugValue = function () {};
Q.useDeferredValue = function (e) {
  return Be.current.useDeferredValue(e);
};
Q.useEffect = function (e, t) {
  return Be.current.useEffect(e, t);
};
Q.useId = function () {
  return Be.current.useId();
};
Q.useImperativeHandle = function (e, t, n) {
  return Be.current.useImperativeHandle(e, t, n);
};
Q.useInsertionEffect = function (e, t) {
  return Be.current.useInsertionEffect(e, t);
};
Q.useLayoutEffect = function (e, t) {
  return Be.current.useLayoutEffect(e, t);
};
Q.useMemo = function (e, t) {
  return Be.current.useMemo(e, t);
};
Q.useReducer = function (e, t, n) {
  return Be.current.useReducer(e, t, n);
};
Q.useRef = function (e) {
  return Be.current.useRef(e);
};
Q.useState = function (e) {
  return Be.current.useState(e);
};
Q.useSyncExternalStore = function (e, t, n) {
  return Be.current.useSyncExternalStore(e, t, n);
};
Q.useTransition = function () {
  return Be.current.useTransition();
};
Q.version = "18.3.1";
Ac.exports = Q;
var w = Ac.exports;
const vh = jc(w),
  Xa = Uc({ __proto__: null, default: vh }, [w]);
var Xc = { exports: {} },
  nt = {},
  Gc = { exports: {} },
  Jc = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ (function (e) {
  function t(M, H) {
    var V = M.length;
    M.push(H);
    e: for (; 0 < V; ) {
      var G = (V - 1) >>> 1,
        oe = M[G];
      if (0 < l(oe, H)) (M[G] = H), (M[V] = oe), (V = G);
      else break e;
    }
  }
  function n(M) {
    return M.length === 0 ? null : M[0];
  }
  function r(M) {
    if (M.length === 0) return null;
    var H = M[0],
      V = M.pop();
    if (V !== H) {
      M[0] = V;
      e: for (var G = 0, oe = M.length, Pt = oe >>> 1; G < Pt; ) {
        var Pe = 2 * (G + 1) - 1,
          ht = M[Pe],
          Oe = Pe + 1,
          Hn = M[Oe];
        if (0 > l(ht, V))
          Oe < oe && 0 > l(Hn, ht)
            ? ((M[G] = Hn), (M[Oe] = V), (G = Oe))
            : ((M[G] = ht), (M[Pe] = V), (G = Pe));
        else if (Oe < oe && 0 > l(Hn, V)) (M[G] = Hn), (M[Oe] = V), (G = Oe);
        else break e;
      }
    }
    return H;
  }
  function l(M, H) {
    var V = M.sortIndex - H.sortIndex;
    return V !== 0 ? V : M.id - H.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var o = performance;
    e.unstable_now = function () {
      return o.now();
    };
  } else {
    var i = Date,
      a = i.now();
    e.unstable_now = function () {
      return i.now() - a;
    };
  }
  var u = [],
    s = [],
    f = 1,
    c = null,
    p = 3,
    S = !1,
    E = !1,
    k = !1,
    P = typeof setTimeout == "function" ? setTimeout : null,
    h = typeof clearTimeout == "function" ? clearTimeout : null,
    d = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" &&
    navigator.scheduling !== void 0 &&
    navigator.scheduling.isInputPending !== void 0 &&
    navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function m(M) {
    for (var H = n(s); H !== null; ) {
      if (H.callback === null) r(s);
      else if (H.startTime <= M)
        r(s), (H.sortIndex = H.expirationTime), t(u, H);
      else break;
      H = n(s);
    }
  }
  function C(M) {
    if (((k = !1), m(M), !E))
      if (n(u) !== null) (E = !0), Yt(L);
      else {
        var H = n(s);
        H !== null && ce(C, H.startTime - M);
      }
  }
  function L(M, H) {
    (E = !1), k && ((k = !1), h(T), (T = -1)), (S = !0);
    var V = p;
    try {
      for (
        m(H), c = n(u);
        c !== null && (!(c.expirationTime > H) || (M && !Y()));

      ) {
        var G = c.callback;
        if (typeof G == "function") {
          (c.callback = null), (p = c.priorityLevel);
          var oe = G(c.expirationTime <= H);
          (H = e.unstable_now()),
            typeof oe == "function" ? (c.callback = oe) : c === n(u) && r(u),
            m(H);
        } else r(u);
        c = n(u);
      }
      if (c !== null) var Pt = !0;
      else {
        var Pe = n(s);
        Pe !== null && ce(C, Pe.startTime - H), (Pt = !1);
      }
      return Pt;
    } finally {
      (c = null), (p = V), (S = !1);
    }
  }
  var y = !1,
    N = null,
    T = -1,
    I = 5,
    O = -1;
  function Y() {
    return !(e.unstable_now() - O < I);
  }
  function se() {
    if (N !== null) {
      var M = e.unstable_now();
      O = M;
      var H = !0;
      try {
        H = N(!0, M);
      } finally {
        H ? xe() : ((y = !1), (N = null));
      }
    } else y = !1;
  }
  var xe;
  if (typeof d == "function")
    xe = function () {
      d(se);
    };
  else if (typeof MessageChannel < "u") {
    var ne = new MessageChannel(),
      _t = ne.port2;
    (ne.port1.onmessage = se),
      (xe = function () {
        _t.postMessage(null);
      });
  } else
    xe = function () {
      P(se, 0);
    };
  function Yt(M) {
    (N = M), y || ((y = !0), xe());
  }
  function ce(M, H) {
    T = P(function () {
      M(e.unstable_now());
    }, H);
  }
  (e.unstable_IdlePriority = 5),
    (e.unstable_ImmediatePriority = 1),
    (e.unstable_LowPriority = 4),
    (e.unstable_NormalPriority = 3),
    (e.unstable_Profiling = null),
    (e.unstable_UserBlockingPriority = 2),
    (e.unstable_cancelCallback = function (M) {
      M.callback = null;
    }),
    (e.unstable_continueExecution = function () {
      E || S || ((E = !0), Yt(L));
    }),
    (e.unstable_forceFrameRate = function (M) {
      0 > M || 125 < M
        ? console.error(
            "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
          )
        : (I = 0 < M ? Math.floor(1e3 / M) : 5);
    }),
    (e.unstable_getCurrentPriorityLevel = function () {
      return p;
    }),
    (e.unstable_getFirstCallbackNode = function () {
      return n(u);
    }),
    (e.unstable_next = function (M) {
      switch (p) {
        case 1:
        case 2:
        case 3:
          var H = 3;
          break;
        default:
          H = p;
      }
      var V = p;
      p = H;
      try {
        return M();
      } finally {
        p = V;
      }
    }),
    (e.unstable_pauseExecution = function () {}),
    (e.unstable_requestPaint = function () {}),
    (e.unstable_runWithPriority = function (M, H) {
      switch (M) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          M = 3;
      }
      var V = p;
      p = M;
      try {
        return H();
      } finally {
        p = V;
      }
    }),
    (e.unstable_scheduleCallback = function (M, H, V) {
      var G = e.unstable_now();
      switch (
        (typeof V == "object" && V !== null
          ? ((V = V.delay), (V = typeof V == "number" && 0 < V ? G + V : G))
          : (V = G),
        M)
      ) {
        case 1:
          var oe = -1;
          break;
        case 2:
          oe = 250;
          break;
        case 5:
          oe = 1073741823;
          break;
        case 4:
          oe = 1e4;
          break;
        default:
          oe = 5e3;
      }
      return (
        (oe = V + oe),
        (M = {
          id: f++,
          callback: H,
          priorityLevel: M,
          startTime: V,
          expirationTime: oe,
          sortIndex: -1,
        }),
        V > G
          ? ((M.sortIndex = V),
            t(s, M),
            n(u) === null &&
              M === n(s) &&
              (k ? (h(T), (T = -1)) : (k = !0), ce(C, V - G)))
          : ((M.sortIndex = oe), t(u, M), E || S || ((E = !0), Yt(L))),
        M
      );
    }),
    (e.unstable_shouldYield = Y),
    (e.unstable_wrapCallback = function (M) {
      var H = p;
      return function () {
        var V = p;
        p = H;
        try {
          return M.apply(this, arguments);
        } finally {
          p = V;
        }
      };
    });
})(Jc);
Gc.exports = Jc;
var yh = Gc.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var gh = w,
  tt = yh;
function R(e) {
  for (
    var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1;
    n < arguments.length;
    n++
  )
    t += "&args[]=" + encodeURIComponent(arguments[n]);
  return (
    "Minified React error #" +
    e +
    "; visit " +
    t +
    " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
  );
}
var Zc = new Set(),
  ll = {};
function Bn(e, t) {
  mr(e, t), mr(e + "Capture", t);
}
function mr(e, t) {
  for (ll[e] = t, e = 0; e < t.length; e++) Zc.add(t[e]);
}
var $t = !(
    typeof window > "u" ||
    typeof window.document > "u" ||
    typeof window.document.createElement > "u"
  ),
  Ji = Object.prototype.hasOwnProperty,
  wh =
    /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
  fs = {},
  ds = {};
function Sh(e) {
  return Ji.call(ds, e)
    ? !0
    : Ji.call(fs, e)
    ? !1
    : wh.test(e)
    ? (ds[e] = !0)
    : ((fs[e] = !0), !1);
}
function Eh(e, t, n, r) {
  if (n !== null && n.type === 0) return !1;
  switch (typeof t) {
    case "function":
    case "symbol":
      return !0;
    case "boolean":
      return r
        ? !1
        : n !== null
        ? !n.acceptsBooleans
        : ((e = e.toLowerCase().slice(0, 5)), e !== "data-" && e !== "aria-");
    default:
      return !1;
  }
}
function kh(e, t, n, r) {
  if (t === null || typeof t > "u" || Eh(e, t, n, r)) return !0;
  if (r) return !1;
  if (n !== null)
    switch (n.type) {
      case 3:
        return !t;
      case 4:
        return t === !1;
      case 5:
        return isNaN(t);
      case 6:
        return isNaN(t) || 1 > t;
    }
  return !1;
}
function $e(e, t, n, r, l, o, i) {
  (this.acceptsBooleans = t === 2 || t === 3 || t === 4),
    (this.attributeName = r),
    (this.attributeNamespace = l),
    (this.mustUseProperty = n),
    (this.propertyName = e),
    (this.type = t),
    (this.sanitizeURL = o),
    (this.removeEmptyString = i);
}
var De = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
  .split(" ")
  .forEach(function (e) {
    De[e] = new $e(e, 0, !1, e, null, !1, !1);
  });
[
  ["acceptCharset", "accept-charset"],
  ["className", "class"],
  ["htmlFor", "for"],
  ["httpEquiv", "http-equiv"],
].forEach(function (e) {
  var t = e[0];
  De[t] = new $e(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function (e) {
  De[e] = new $e(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
[
  "autoReverse",
  "externalResourcesRequired",
  "focusable",
  "preserveAlpha",
].forEach(function (e) {
  De[e] = new $e(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
  .split(" ")
  .forEach(function (e) {
    De[e] = new $e(e, 3, !1, e.toLowerCase(), null, !1, !1);
  });
["checked", "multiple", "muted", "selected"].forEach(function (e) {
  De[e] = new $e(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function (e) {
  De[e] = new $e(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function (e) {
  De[e] = new $e(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function (e) {
  De[e] = new $e(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var Ga = /[\-:]([a-z])/g;
function Ja(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(Ga, Ja);
    De[t] = new $e(t, 1, !1, e, null, !1, !1);
  });
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(Ga, Ja);
    De[t] = new $e(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
  });
["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
  var t = e.replace(Ga, Ja);
  De[t] = new $e(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function (e) {
  De[e] = new $e(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
De.xlinkHref = new $e(
  "xlinkHref",
  1,
  !1,
  "xlink:href",
  "http://www.w3.org/1999/xlink",
  !0,
  !1
);
["src", "href", "action", "formAction"].forEach(function (e) {
  De[e] = new $e(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function Za(e, t, n, r) {
  var l = De.hasOwnProperty(t) ? De[t] : null;
  (l !== null
    ? l.type !== 0
    : r ||
      !(2 < t.length) ||
      (t[0] !== "o" && t[0] !== "O") ||
      (t[1] !== "n" && t[1] !== "N")) &&
    (kh(t, n, l, r) && (n = null),
    r || l === null
      ? Sh(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n))
      : l.mustUseProperty
      ? (e[l.propertyName] = n === null ? (l.type === 3 ? !1 : "") : n)
      : ((t = l.attributeName),
        (r = l.attributeNamespace),
        n === null
          ? e.removeAttribute(t)
          : ((l = l.type),
            (n = l === 3 || (l === 4 && n === !0) ? "" : "" + n),
            r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var Qt = gh.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  Hl = Symbol.for("react.element"),
  Jn = Symbol.for("react.portal"),
  Zn = Symbol.for("react.fragment"),
  qa = Symbol.for("react.strict_mode"),
  Zi = Symbol.for("react.profiler"),
  qc = Symbol.for("react.provider"),
  bc = Symbol.for("react.context"),
  ba = Symbol.for("react.forward_ref"),
  qi = Symbol.for("react.suspense"),
  bi = Symbol.for("react.suspense_list"),
  eu = Symbol.for("react.memo"),
  bt = Symbol.for("react.lazy"),
  ef = Symbol.for("react.offscreen"),
  ps = Symbol.iterator;
function Fr(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (ps && e[ps]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var me = Object.assign,
  Si;
function Wr(e) {
  if (Si === void 0)
    try {
      throw Error();
    } catch (n) {
      var t = n.stack.trim().match(/\n( *(at )?)/);
      Si = (t && t[1]) || "";
    }
  return (
    `
` +
    Si +
    e
  );
}
var Ei = !1;
function ki(e, t) {
  if (!e || Ei) return "";
  Ei = !0;
  var n = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (t)
      if (
        ((t = function () {
          throw Error();
        }),
        Object.defineProperty(t.prototype, "props", {
          set: function () {
            throw Error();
          },
        }),
        typeof Reflect == "object" && Reflect.construct)
      ) {
        try {
          Reflect.construct(t, []);
        } catch (s) {
          var r = s;
        }
        Reflect.construct(e, [], t);
      } else {
        try {
          t.call();
        } catch (s) {
          r = s;
        }
        e.call(t.prototype);
      }
    else {
      try {
        throw Error();
      } catch (s) {
        r = s;
      }
      e();
    }
  } catch (s) {
    if (s && r && typeof s.stack == "string") {
      for (
        var l = s.stack.split(`
`),
          o = r.stack.split(`
`),
          i = l.length - 1,
          a = o.length - 1;
        1 <= i && 0 <= a && l[i] !== o[a];

      )
        a--;
      for (; 1 <= i && 0 <= a; i--, a--)
        if (l[i] !== o[a]) {
          if (i !== 1 || a !== 1)
            do
              if ((i--, a--, 0 > a || l[i] !== o[a])) {
                var u =
                  `
` + l[i].replace(" at new ", " at ");
                return (
                  e.displayName &&
                    u.includes("<anonymous>") &&
                    (u = u.replace("<anonymous>", e.displayName)),
                  u
                );
              }
            while (1 <= i && 0 <= a);
          break;
        }
    }
  } finally {
    (Ei = !1), (Error.prepareStackTrace = n);
  }
  return (e = e ? e.displayName || e.name : "") ? Wr(e) : "";
}
function xh(e) {
  switch (e.tag) {
    case 5:
      return Wr(e.type);
    case 16:
      return Wr("Lazy");
    case 13:
      return Wr("Suspense");
    case 19:
      return Wr("SuspenseList");
    case 0:
    case 2:
    case 15:
      return (e = ki(e.type, !1)), e;
    case 11:
      return (e = ki(e.type.render, !1)), e;
    case 1:
      return (e = ki(e.type, !0)), e;
    default:
      return "";
  }
}
function ea(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case Zn:
      return "Fragment";
    case Jn:
      return "Portal";
    case Zi:
      return "Profiler";
    case qa:
      return "StrictMode";
    case qi:
      return "Suspense";
    case bi:
      return "SuspenseList";
  }
  if (typeof e == "object")
    switch (e.$$typeof) {
      case bc:
        return (e.displayName || "Context") + ".Consumer";
      case qc:
        return (e._context.displayName || "Context") + ".Provider";
      case ba:
        var t = e.render;
        return (
          (e = e.displayName),
          e ||
            ((e = t.displayName || t.name || ""),
            (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
          e
        );
      case eu:
        return (
          (t = e.displayName || null), t !== null ? t : ea(e.type) || "Memo"
        );
      case bt:
        (t = e._payload), (e = e._init);
        try {
          return ea(e(t));
        } catch {}
    }
  return null;
}
function Ch(e) {
  var t = e.type;
  switch (e.tag) {
    case 24:
      return "Cache";
    case 9:
      return (t.displayName || "Context") + ".Consumer";
    case 10:
      return (t._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return (
        (e = t.render),
        (e = e.displayName || e.name || ""),
        t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")
      );
    case 7:
      return "Fragment";
    case 5:
      return t;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return ea(t);
    case 8:
      return t === qa ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof t == "function") return t.displayName || t.name || null;
      if (typeof t == "string") return t;
  }
  return null;
}
function mn(e) {
  switch (typeof e) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return e;
    case "object":
      return e;
    default:
      return "";
  }
}
function tf(e) {
  var t = e.type;
  return (
    (e = e.nodeName) &&
    e.toLowerCase() === "input" &&
    (t === "checkbox" || t === "radio")
  );
}
function _h(e) {
  var t = tf(e) ? "checked" : "value",
    n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
    r = "" + e[t];
  if (
    !e.hasOwnProperty(t) &&
    typeof n < "u" &&
    typeof n.get == "function" &&
    typeof n.set == "function"
  ) {
    var l = n.get,
      o = n.set;
    return (
      Object.defineProperty(e, t, {
        configurable: !0,
        get: function () {
          return l.call(this);
        },
        set: function (i) {
          (r = "" + i), o.call(this, i);
        },
      }),
      Object.defineProperty(e, t, { enumerable: n.enumerable }),
      {
        getValue: function () {
          return r;
        },
        setValue: function (i) {
          r = "" + i;
        },
        stopTracking: function () {
          (e._valueTracker = null), delete e[t];
        },
      }
    );
  }
}
function Vl(e) {
  e._valueTracker || (e._valueTracker = _h(e));
}
function nf(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(),
    r = "";
  return (
    e && (r = tf(e) ? (e.checked ? "true" : "false") : e.value),
    (e = r),
    e !== n ? (t.setValue(e), !0) : !1
  );
}
function Eo(e) {
  if (((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u"))
    return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function ta(e, t) {
  var n = t.checked;
  return me({}, t, {
    defaultChecked: void 0,
    defaultValue: void 0,
    value: void 0,
    checked: n ?? e._wrapperState.initialChecked,
  });
}
function hs(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue,
    r = t.checked != null ? t.checked : t.defaultChecked;
  (n = mn(t.value != null ? t.value : n)),
    (e._wrapperState = {
      initialChecked: r,
      initialValue: n,
      controlled:
        t.type === "checkbox" || t.type === "radio"
          ? t.checked != null
          : t.value != null,
    });
}
function rf(e, t) {
  (t = t.checked), t != null && Za(e, "checked", t, !1);
}
function na(e, t) {
  rf(e, t);
  var n = mn(t.value),
    r = t.type;
  if (n != null)
    r === "number"
      ? ((n === 0 && e.value === "") || e.value != n) && (e.value = "" + n)
      : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value")
    ? ra(e, t.type, n)
    : t.hasOwnProperty("defaultValue") && ra(e, t.type, mn(t.defaultValue)),
    t.checked == null &&
      t.defaultChecked != null &&
      (e.defaultChecked = !!t.defaultChecked);
}
function ms(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (
      !(
        (r !== "submit" && r !== "reset") ||
        (t.value !== void 0 && t.value !== null)
      )
    )
      return;
    (t = "" + e._wrapperState.initialValue),
      n || t === e.value || (e.value = t),
      (e.defaultValue = t);
  }
  (n = e.name),
    n !== "" && (e.name = ""),
    (e.defaultChecked = !!e._wrapperState.initialChecked),
    n !== "" && (e.name = n);
}
function ra(e, t, n) {
  (t !== "number" || Eo(e.ownerDocument) !== e) &&
    (n == null
      ? (e.defaultValue = "" + e._wrapperState.initialValue)
      : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var Kr = Array.isArray;
function sr(e, t, n, r) {
  if (((e = e.options), t)) {
    t = {};
    for (var l = 0; l < n.length; l++) t["$" + n[l]] = !0;
    for (n = 0; n < e.length; n++)
      (l = t.hasOwnProperty("$" + e[n].value)),
        e[n].selected !== l && (e[n].selected = l),
        l && r && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + mn(n), t = null, l = 0; l < e.length; l++) {
      if (e[l].value === n) {
        (e[l].selected = !0), r && (e[l].defaultSelected = !0);
        return;
      }
      t !== null || e[l].disabled || (t = e[l]);
    }
    t !== null && (t.selected = !0);
  }
}
function la(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(R(91));
  return me({}, t, {
    value: void 0,
    defaultValue: void 0,
    children: "" + e._wrapperState.initialValue,
  });
}
function vs(e, t) {
  var n = t.value;
  if (n == null) {
    if (((n = t.children), (t = t.defaultValue), n != null)) {
      if (t != null) throw Error(R(92));
      if (Kr(n)) {
        if (1 < n.length) throw Error(R(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), (n = t);
  }
  e._wrapperState = { initialValue: mn(n) };
}
function lf(e, t) {
  var n = mn(t.value),
    r = mn(t.defaultValue);
  n != null &&
    ((n = "" + n),
    n !== e.value && (e.value = n),
    t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
    r != null && (e.defaultValue = "" + r);
}
function ys(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function of(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function oa(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml"
    ? of(t)
    : e === "http://www.w3.org/2000/svg" && t === "foreignObject"
    ? "http://www.w3.org/1999/xhtml"
    : e;
}
var Wl,
  af = (function (e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction
      ? function (t, n, r, l) {
          MSApp.execUnsafeLocalFunction(function () {
            return e(t, n, r, l);
          });
        }
      : e;
  })(function (e, t) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e)
      e.innerHTML = t;
    else {
      for (
        Wl = Wl || document.createElement("div"),
          Wl.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>",
          t = Wl.firstChild;
        e.firstChild;

      )
        e.removeChild(e.firstChild);
      for (; t.firstChild; ) e.appendChild(t.firstChild);
    }
  });
function ol(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var Gr = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0,
  },
  Ph = ["Webkit", "ms", "Moz", "O"];
Object.keys(Gr).forEach(function (e) {
  Ph.forEach(function (t) {
    (t = t + e.charAt(0).toUpperCase() + e.substring(1)), (Gr[t] = Gr[e]);
  });
});
function uf(e, t, n) {
  return t == null || typeof t == "boolean" || t === ""
    ? ""
    : n || typeof t != "number" || t === 0 || (Gr.hasOwnProperty(e) && Gr[e])
    ? ("" + t).trim()
    : t + "px";
}
function sf(e, t) {
  e = e.style;
  for (var n in t)
    if (t.hasOwnProperty(n)) {
      var r = n.indexOf("--") === 0,
        l = uf(n, t[n], r);
      n === "float" && (n = "cssFloat"), r ? e.setProperty(n, l) : (e[n] = l);
    }
}
var Rh = me(
  { menuitem: !0 },
  {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0,
  }
);
function ia(e, t) {
  if (t) {
    if (Rh[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
      throw Error(R(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(R(60));
      if (
        typeof t.dangerouslySetInnerHTML != "object" ||
        !("__html" in t.dangerouslySetInnerHTML)
      )
        throw Error(R(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(R(62));
  }
}
function aa(e, t) {
  if (e.indexOf("-") === -1) return typeof t.is == "string";
  switch (e) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
var ua = null;
function tu(e) {
  return (
    (e = e.target || e.srcElement || window),
    e.correspondingUseElement && (e = e.correspondingUseElement),
    e.nodeType === 3 ? e.parentNode : e
  );
}
var sa = null,
  cr = null,
  fr = null;
function gs(e) {
  if ((e = Ll(e))) {
    if (typeof sa != "function") throw Error(R(280));
    var t = e.stateNode;
    t && ((t = qo(t)), sa(e.stateNode, e.type, t));
  }
}
function cf(e) {
  cr ? (fr ? fr.push(e) : (fr = [e])) : (cr = e);
}
function ff() {
  if (cr) {
    var e = cr,
      t = fr;
    if (((fr = cr = null), gs(e), t)) for (e = 0; e < t.length; e++) gs(t[e]);
  }
}
function df(e, t) {
  return e(t);
}
function pf() {}
var xi = !1;
function hf(e, t, n) {
  if (xi) return e(t, n);
  xi = !0;
  try {
    return df(e, t, n);
  } finally {
    (xi = !1), (cr !== null || fr !== null) && (pf(), ff());
  }
}
function il(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = qo(n);
  if (r === null) return null;
  n = r[t];
  e: switch (t) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      (r = !r.disabled) ||
        ((e = e.type),
        (r = !(
          e === "button" ||
          e === "input" ||
          e === "select" ||
          e === "textarea"
        ))),
        (e = !r);
      break e;
    default:
      e = !1;
  }
  if (e) return null;
  if (n && typeof n != "function") throw Error(R(231, t, typeof n));
  return n;
}
var ca = !1;
if ($t)
  try {
    var Or = {};
    Object.defineProperty(Or, "passive", {
      get: function () {
        ca = !0;
      },
    }),
      window.addEventListener("test", Or, Or),
      window.removeEventListener("test", Or, Or);
  } catch {
    ca = !1;
  }
function Lh(e, t, n, r, l, o, i, a, u) {
  var s = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, s);
  } catch (f) {
    this.onError(f);
  }
}
var Jr = !1,
  ko = null,
  xo = !1,
  fa = null,
  Th = {
    onError: function (e) {
      (Jr = !0), (ko = e);
    },
  };
function Dh(e, t, n, r, l, o, i, a, u) {
  (Jr = !1), (ko = null), Lh.apply(Th, arguments);
}
function Nh(e, t, n, r, l, o, i, a, u) {
  if ((Dh.apply(this, arguments), Jr)) {
    if (Jr) {
      var s = ko;
      (Jr = !1), (ko = null);
    } else throw Error(R(198));
    xo || ((xo = !0), (fa = s));
  }
}
function $n(e) {
  var t = e,
    n = e;
  if (e.alternate) for (; t.return; ) t = t.return;
  else {
    e = t;
    do (t = e), t.flags & 4098 && (n = t.return), (e = t.return);
    while (e);
  }
  return t.tag === 3 ? n : null;
}
function mf(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (
      (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
      t !== null)
    )
      return t.dehydrated;
  }
  return null;
}
function ws(e) {
  if ($n(e) !== e) throw Error(R(188));
}
function Mh(e) {
  var t = e.alternate;
  if (!t) {
    if (((t = $n(e)), t === null)) throw Error(R(188));
    return t !== e ? null : e;
  }
  for (var n = e, r = t; ; ) {
    var l = n.return;
    if (l === null) break;
    var o = l.alternate;
    if (o === null) {
      if (((r = l.return), r !== null)) {
        n = r;
        continue;
      }
      break;
    }
    if (l.child === o.child) {
      for (o = l.child; o; ) {
        if (o === n) return ws(l), e;
        if (o === r) return ws(l), t;
        o = o.sibling;
      }
      throw Error(R(188));
    }
    if (n.return !== r.return) (n = l), (r = o);
    else {
      for (var i = !1, a = l.child; a; ) {
        if (a === n) {
          (i = !0), (n = l), (r = o);
          break;
        }
        if (a === r) {
          (i = !0), (r = l), (n = o);
          break;
        }
        a = a.sibling;
      }
      if (!i) {
        for (a = o.child; a; ) {
          if (a === n) {
            (i = !0), (n = o), (r = l);
            break;
          }
          if (a === r) {
            (i = !0), (r = o), (n = l);
            break;
          }
          a = a.sibling;
        }
        if (!i) throw Error(R(189));
      }
    }
    if (n.alternate !== r) throw Error(R(190));
  }
  if (n.tag !== 3) throw Error(R(188));
  return n.stateNode.current === n ? e : t;
}
function vf(e) {
  return (e = Mh(e)), e !== null ? yf(e) : null;
}
function yf(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = yf(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var gf = tt.unstable_scheduleCallback,
  Ss = tt.unstable_cancelCallback,
  zh = tt.unstable_shouldYield,
  Fh = tt.unstable_requestPaint,
  ge = tt.unstable_now,
  Oh = tt.unstable_getCurrentPriorityLevel,
  nu = tt.unstable_ImmediatePriority,
  wf = tt.unstable_UserBlockingPriority,
  Co = tt.unstable_NormalPriority,
  Ih = tt.unstable_LowPriority,
  Sf = tt.unstable_IdlePriority,
  Xo = null,
  Nt = null;
function Uh(e) {
  if (Nt && typeof Nt.onCommitFiberRoot == "function")
    try {
      Nt.onCommitFiberRoot(Xo, e, void 0, (e.current.flags & 128) === 128);
    } catch {}
}
var St = Math.clz32 ? Math.clz32 : Bh,
  jh = Math.log,
  Ah = Math.LN2;
function Bh(e) {
  return (e >>>= 0), e === 0 ? 32 : (31 - ((jh(e) / Ah) | 0)) | 0;
}
var Kl = 64,
  Ql = 4194304;
function Qr(e) {
  switch (e & -e) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return e & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return e;
  }
}
function _o(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0,
    l = e.suspendedLanes,
    o = e.pingedLanes,
    i = n & 268435455;
  if (i !== 0) {
    var a = i & ~l;
    a !== 0 ? (r = Qr(a)) : ((o &= i), o !== 0 && (r = Qr(o)));
  } else (i = n & ~l), i !== 0 ? (r = Qr(i)) : o !== 0 && (r = Qr(o));
  if (r === 0) return 0;
  if (
    t !== 0 &&
    t !== r &&
    !(t & l) &&
    ((l = r & -r), (o = t & -t), l >= o || (l === 16 && (o & 4194240) !== 0))
  )
    return t;
  if ((r & 4 && (r |= n & 16), (t = e.entangledLanes), t !== 0))
    for (e = e.entanglements, t &= r; 0 < t; )
      (n = 31 - St(t)), (l = 1 << n), (r |= e[n]), (t &= ~l);
  return r;
}
function $h(e, t) {
  switch (e) {
    case 1:
    case 2:
    case 4:
      return t + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function Hh(e, t) {
  for (
    var n = e.suspendedLanes,
      r = e.pingedLanes,
      l = e.expirationTimes,
      o = e.pendingLanes;
    0 < o;

  ) {
    var i = 31 - St(o),
      a = 1 << i,
      u = l[i];
    u === -1
      ? (!(a & n) || a & r) && (l[i] = $h(a, t))
      : u <= t && (e.expiredLanes |= a),
      (o &= ~a);
  }
}
function da(e) {
  return (
    (e = e.pendingLanes & -1073741825),
    e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
  );
}
function Ef() {
  var e = Kl;
  return (Kl <<= 1), !(Kl & 4194240) && (Kl = 64), e;
}
function Ci(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function Pl(e, t, n) {
  (e.pendingLanes |= t),
    t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
    (e = e.eventTimes),
    (t = 31 - St(t)),
    (e[t] = n);
}
function Vh(e, t) {
  var n = e.pendingLanes & ~t;
  (e.pendingLanes = t),
    (e.suspendedLanes = 0),
    (e.pingedLanes = 0),
    (e.expiredLanes &= t),
    (e.mutableReadLanes &= t),
    (e.entangledLanes &= t),
    (t = e.entanglements);
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var l = 31 - St(n),
      o = 1 << l;
    (t[l] = 0), (r[l] = -1), (e[l] = -1), (n &= ~o);
  }
}
function ru(e, t) {
  var n = (e.entangledLanes |= t);
  for (e = e.entanglements; n; ) {
    var r = 31 - St(n),
      l = 1 << r;
    (l & t) | (e[r] & t) && (e[r] |= t), (n &= ~l);
  }
}
var q = 0;
function kf(e) {
  return (e &= -e), 1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1;
}
var xf,
  lu,
  Cf,
  _f,
  Pf,
  pa = !1,
  Yl = [],
  an = null,
  un = null,
  sn = null,
  al = new Map(),
  ul = new Map(),
  tn = [],
  Wh =
    "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
      " "
    );
function Es(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      an = null;
      break;
    case "dragenter":
    case "dragleave":
      un = null;
      break;
    case "mouseover":
    case "mouseout":
      sn = null;
      break;
    case "pointerover":
    case "pointerout":
      al.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      ul.delete(t.pointerId);
  }
}
function Ir(e, t, n, r, l, o) {
  return e === null || e.nativeEvent !== o
    ? ((e = {
        blockedOn: t,
        domEventName: n,
        eventSystemFlags: r,
        nativeEvent: o,
        targetContainers: [l],
      }),
      t !== null && ((t = Ll(t)), t !== null && lu(t)),
      e)
    : ((e.eventSystemFlags |= r),
      (t = e.targetContainers),
      l !== null && t.indexOf(l) === -1 && t.push(l),
      e);
}
function Kh(e, t, n, r, l) {
  switch (t) {
    case "focusin":
      return (an = Ir(an, e, t, n, r, l)), !0;
    case "dragenter":
      return (un = Ir(un, e, t, n, r, l)), !0;
    case "mouseover":
      return (sn = Ir(sn, e, t, n, r, l)), !0;
    case "pointerover":
      var o = l.pointerId;
      return al.set(o, Ir(al.get(o) || null, e, t, n, r, l)), !0;
    case "gotpointercapture":
      return (
        (o = l.pointerId), ul.set(o, Ir(ul.get(o) || null, e, t, n, r, l)), !0
      );
  }
  return !1;
}
function Rf(e) {
  var t = Rn(e.target);
  if (t !== null) {
    var n = $n(t);
    if (n !== null) {
      if (((t = n.tag), t === 13)) {
        if (((t = mf(n)), t !== null)) {
          (e.blockedOn = t),
            Pf(e.priority, function () {
              Cf(n);
            });
          return;
        }
      } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
        return;
      }
    }
  }
  e.blockedOn = null;
}
function uo(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = ha(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      (ua = r), n.target.dispatchEvent(r), (ua = null);
    } else return (t = Ll(n)), t !== null && lu(t), (e.blockedOn = n), !1;
    t.shift();
  }
  return !0;
}
function ks(e, t, n) {
  uo(e) && n.delete(t);
}
function Qh() {
  (pa = !1),
    an !== null && uo(an) && (an = null),
    un !== null && uo(un) && (un = null),
    sn !== null && uo(sn) && (sn = null),
    al.forEach(ks),
    ul.forEach(ks);
}
function Ur(e, t) {
  e.blockedOn === t &&
    ((e.blockedOn = null),
    pa ||
      ((pa = !0),
      tt.unstable_scheduleCallback(tt.unstable_NormalPriority, Qh)));
}
function sl(e) {
  function t(l) {
    return Ur(l, e);
  }
  if (0 < Yl.length) {
    Ur(Yl[0], e);
    for (var n = 1; n < Yl.length; n++) {
      var r = Yl[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (
    an !== null && Ur(an, e),
      un !== null && Ur(un, e),
      sn !== null && Ur(sn, e),
      al.forEach(t),
      ul.forEach(t),
      n = 0;
    n < tn.length;
    n++
  )
    (r = tn[n]), r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < tn.length && ((n = tn[0]), n.blockedOn === null); )
    Rf(n), n.blockedOn === null && tn.shift();
}
var dr = Qt.ReactCurrentBatchConfig,
  Po = !0;
function Yh(e, t, n, r) {
  var l = q,
    o = dr.transition;
  dr.transition = null;
  try {
    (q = 1), ou(e, t, n, r);
  } finally {
    (q = l), (dr.transition = o);
  }
}
function Xh(e, t, n, r) {
  var l = q,
    o = dr.transition;
  dr.transition = null;
  try {
    (q = 4), ou(e, t, n, r);
  } finally {
    (q = l), (dr.transition = o);
  }
}
function ou(e, t, n, r) {
  if (Po) {
    var l = ha(e, t, n, r);
    if (l === null) Fi(e, t, r, Ro, n), Es(e, r);
    else if (Kh(l, e, t, n, r)) r.stopPropagation();
    else if ((Es(e, r), t & 4 && -1 < Wh.indexOf(e))) {
      for (; l !== null; ) {
        var o = Ll(l);
        if (
          (o !== null && xf(o),
          (o = ha(e, t, n, r)),
          o === null && Fi(e, t, r, Ro, n),
          o === l)
        )
          break;
        l = o;
      }
      l !== null && r.stopPropagation();
    } else Fi(e, t, r, null, n);
  }
}
var Ro = null;
function ha(e, t, n, r) {
  if (((Ro = null), (e = tu(r)), (e = Rn(e)), e !== null))
    if (((t = $n(e)), t === null)) e = null;
    else if (((n = t.tag), n === 13)) {
      if (((e = mf(t)), e !== null)) return e;
      e = null;
    } else if (n === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated)
        return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
  return (Ro = e), null;
}
function Lf(e) {
  switch (e) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (Oh()) {
        case nu:
          return 1;
        case wf:
          return 4;
        case Co:
        case Ih:
          return 16;
        case Sf:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var ln = null,
  iu = null,
  so = null;
function Tf() {
  if (so) return so;
  var e,
    t = iu,
    n = t.length,
    r,
    l = "value" in ln ? ln.value : ln.textContent,
    o = l.length;
  for (e = 0; e < n && t[e] === l[e]; e++);
  var i = n - e;
  for (r = 1; r <= i && t[n - r] === l[o - r]; r++);
  return (so = l.slice(e, 1 < r ? 1 - r : void 0));
}
function co(e) {
  var t = e.keyCode;
  return (
    "charCode" in e
      ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
      : (e = t),
    e === 10 && (e = 13),
    32 <= e || e === 13 ? e : 0
  );
}
function Xl() {
  return !0;
}
function xs() {
  return !1;
}
function rt(e) {
  function t(n, r, l, o, i) {
    (this._reactName = n),
      (this._targetInst = l),
      (this.type = r),
      (this.nativeEvent = o),
      (this.target = i),
      (this.currentTarget = null);
    for (var a in e)
      e.hasOwnProperty(a) && ((n = e[a]), (this[a] = n ? n(o) : o[a]));
    return (
      (this.isDefaultPrevented = (
        o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1
      )
        ? Xl
        : xs),
      (this.isPropagationStopped = xs),
      this
    );
  }
  return (
    me(t.prototype, {
      preventDefault: function () {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n &&
          (n.preventDefault
            ? n.preventDefault()
            : typeof n.returnValue != "unknown" && (n.returnValue = !1),
          (this.isDefaultPrevented = Xl));
      },
      stopPropagation: function () {
        var n = this.nativeEvent;
        n &&
          (n.stopPropagation
            ? n.stopPropagation()
            : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0),
          (this.isPropagationStopped = Xl));
      },
      persist: function () {},
      isPersistent: Xl,
    }),
    t
  );
}
var _r = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0,
  },
  au = rt(_r),
  Rl = me({}, _r, { view: 0, detail: 0 }),
  Gh = rt(Rl),
  _i,
  Pi,
  jr,
  Go = me({}, Rl, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: uu,
    button: 0,
    buttons: 0,
    relatedTarget: function (e) {
      return e.relatedTarget === void 0
        ? e.fromElement === e.srcElement
          ? e.toElement
          : e.fromElement
        : e.relatedTarget;
    },
    movementX: function (e) {
      return "movementX" in e
        ? e.movementX
        : (e !== jr &&
            (jr && e.type === "mousemove"
              ? ((_i = e.screenX - jr.screenX), (Pi = e.screenY - jr.screenY))
              : (Pi = _i = 0),
            (jr = e)),
          _i);
    },
    movementY: function (e) {
      return "movementY" in e ? e.movementY : Pi;
    },
  }),
  Cs = rt(Go),
  Jh = me({}, Go, { dataTransfer: 0 }),
  Zh = rt(Jh),
  qh = me({}, Rl, { relatedTarget: 0 }),
  Ri = rt(qh),
  bh = me({}, _r, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
  em = rt(bh),
  tm = me({}, _r, {
    clipboardData: function (e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    },
  }),
  nm = rt(tm),
  rm = me({}, _r, { data: 0 }),
  _s = rt(rm),
  lm = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified",
  },
  om = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta",
  },
  im = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey",
  };
function am(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = im[e]) ? !!t[e] : !1;
}
function uu() {
  return am;
}
var um = me({}, Rl, {
    key: function (e) {
      if (e.key) {
        var t = lm[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress"
        ? ((e = co(e)), e === 13 ? "Enter" : String.fromCharCode(e))
        : e.type === "keydown" || e.type === "keyup"
        ? om[e.keyCode] || "Unidentified"
        : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: uu,
    charCode: function (e) {
      return e.type === "keypress" ? co(e) : 0;
    },
    keyCode: function (e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function (e) {
      return e.type === "keypress"
        ? co(e)
        : e.type === "keydown" || e.type === "keyup"
        ? e.keyCode
        : 0;
    },
  }),
  sm = rt(um),
  cm = me({}, Go, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0,
  }),
  Ps = rt(cm),
  fm = me({}, Rl, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: uu,
  }),
  dm = rt(fm),
  pm = me({}, _r, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
  hm = rt(pm),
  mm = me({}, Go, {
    deltaX: function (e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function (e) {
      return "deltaY" in e
        ? e.deltaY
        : "wheelDeltaY" in e
        ? -e.wheelDeltaY
        : "wheelDelta" in e
        ? -e.wheelDelta
        : 0;
    },
    deltaZ: 0,
    deltaMode: 0,
  }),
  vm = rt(mm),
  ym = [9, 13, 27, 32],
  su = $t && "CompositionEvent" in window,
  Zr = null;
$t && "documentMode" in document && (Zr = document.documentMode);
var gm = $t && "TextEvent" in window && !Zr,
  Df = $t && (!su || (Zr && 8 < Zr && 11 >= Zr)),
  Rs = " ",
  Ls = !1;
function Nf(e, t) {
  switch (e) {
    case "keyup":
      return ym.indexOf(t.keyCode) !== -1;
    case "keydown":
      return t.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function Mf(e) {
  return (e = e.detail), typeof e == "object" && "data" in e ? e.data : null;
}
var qn = !1;
function wm(e, t) {
  switch (e) {
    case "compositionend":
      return Mf(t);
    case "keypress":
      return t.which !== 32 ? null : ((Ls = !0), Rs);
    case "textInput":
      return (e = t.data), e === Rs && Ls ? null : e;
    default:
      return null;
  }
}
function Sm(e, t) {
  if (qn)
    return e === "compositionend" || (!su && Nf(e, t))
      ? ((e = Tf()), (so = iu = ln = null), (qn = !1), e)
      : null;
  switch (e) {
    case "paste":
      return null;
    case "keypress":
      if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
        if (t.char && 1 < t.char.length) return t.char;
        if (t.which) return String.fromCharCode(t.which);
      }
      return null;
    case "compositionend":
      return Df && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var Em = {color: !0,
  date: !0,
  datetime: !0,
  "datetime-local": !0,
  email: !0,
  month: !0,
  number: !0,
  password: !0,
  range: !0,
  search: !0,
  tel: !0,
  text: !0,
  time: !0,
  url: !0,
  week: !0,
};
function Ts(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!Em[e.type] : t === "textarea";
}
function zf(e, t, n, r) {
  cf(r),
    (t = Lo(t, "onChange")),
    0 < t.length &&
      ((n = new au("onChange", "change", null, n, r)),
      e.push({ event: n, listeners: t }));
}
var qr = null,
  cl = null;
function km(e) {
  Wf(e, 0);
}
function Jo(e) {
  var t = tr(e);
  if (nf(t)) return e;
}
function xm(e, t) {
  if (e === "change") return t;
}
var Ff = !1;
if ($t) {
  var Li;
  if ($t) {
    var Ti = "oninput" in document;
    if (!Ti) {
      var Ds = document.createElement("div");
      Ds.setAttribute("oninput", "return;"),
        (Ti = typeof Ds.oninput == "function");
    }
    Li = Ti;
  } else Li = !1;
  Ff = Li && (!document.documentMode || 9 < document.documentMode);
}
function Ns() {
  qr && (qr.detachEvent("onpropertychange", Of), (cl = qr = null));
}
function Of(e) {
  if (e.propertyName === "value" && Jo(cl)) {
    var t = [];
    zf(t, cl, e, tu(e)), hf(km, t);
  }
}
function Cm(e, t, n) {
  e === "focusin"
    ? (Ns(), (qr = t), (cl = n), qr.attachEvent("onpropertychange", Of))
    : e === "focusout" && Ns();
}
function _m(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown")
    return Jo(cl);
}
function Pm(e, t) {
  if (e === "click") return Jo(t);
}
function Rm(e, t) {
  if (e === "input" || e === "change") return Jo(t);
}
function Lm(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var kt = typeof Object.is == "function" ? Object.is : Lm;
function fl(e, t) {
  if (kt(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null)
    return !1;
  var n = Object.keys(e),
    r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var l = n[r];
    if (!Ji.call(t, l) || !kt(e[l], t[l])) return !1;
  }
  return !0;
}
function Ms(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function zs(e, t) {
  var n = Ms(e);
  e = 0;
  for (var r; n; ) {
    if (n.nodeType === 3) {
      if (((r = e + n.textContent.length), e <= t && r >= t))
        return { node: n, offset: t - e };
      e = r;
    }
    e: {
      for (; n; ) {
        if (n.nextSibling) {
          n = n.nextSibling;
          break e;
        }
        n = n.parentNode;
      }
      n = void 0;
    }
    n = Ms(n);
  }
}
function If(e, t) {
  return e && t
    ? e === t
      ? !0
      : e && e.nodeType === 3
      ? !1
      : t && t.nodeType === 3
      ? If(e, t.parentNode)
      : "contains" in e
      ? e.contains(t)
      : e.compareDocumentPosition
      ? !!(e.compareDocumentPosition(t) & 16)
      : !1
    : !1;
}
function Uf() {
  for (var e = window, t = Eo(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = Eo(e.document);
  }
  return t;
}
function cu(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return (
    t &&
    ((t === "input" &&
      (e.type === "text" ||
        e.type === "search" ||
        e.type === "tel" ||
        e.type === "url" ||
        e.type === "password")) ||
      t === "textarea" ||
      e.contentEditable === "true")
  );
}
function Tm(e) {
  var t = Uf(),
    n = e.focusedElem,
    r = e.selectionRange;
  if (
    t !== n &&
    n &&
    n.ownerDocument &&
    If(n.ownerDocument.documentElement, n)
  ) {
    if (r !== null && cu(n)) {
      if (
        ((t = r.start),
        (e = r.end),
        e === void 0 && (e = t),
        "selectionStart" in n)
      )
        (n.selectionStart = t), (n.selectionEnd = Math.min(e, n.value.length));
      else if (
        ((e = ((t = n.ownerDocument || document) && t.defaultView) || window),
        e.getSelection)
      ) {
        e = e.getSelection();
        var l = n.textContent.length,
          o = Math.min(r.start, l);
        (r = r.end === void 0 ? o : Math.min(r.end, l)),
          !e.extend && o > r && ((l = r), (r = o), (o = l)),
          (l = zs(n, o));
        var i = zs(n, r);
        l &&
          i &&
          (e.rangeCount !== 1 ||
            e.anchorNode !== l.node ||
            e.anchorOffset !== l.offset ||
            e.focusNode !== i.node ||
            e.focusOffset !== i.offset) &&
          ((t = t.createRange()),
          t.setStart(l.node, l.offset),
          e.removeAllRanges(),
          o > r
            ? (e.addRange(t), e.extend(i.node, i.offset))
            : (t.setEnd(i.node, i.offset), e.addRange(t)));
      }
    }
    for (t = [], e = n; (e = e.parentNode); )
      e.nodeType === 1 &&
        t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++)
      (e = t[n]),
        (e.element.scrollLeft = e.left),
        (e.element.scrollTop = e.top);
  }
}
var Dm = $t && "documentMode" in document && 11 >= document.documentMode,
  bn = null,
  ma = null,
  br = null,
  va = !1;
function Fs(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  va ||
    bn == null ||
    bn !== Eo(r) ||
    ((r = bn),
    "selectionStart" in r && cu(r)
      ? (r = { start: r.selectionStart, end: r.selectionEnd })
      : ((r = (
          (r.ownerDocument && r.ownerDocument.defaultView) ||
          window
        ).getSelection()),
        (r = {
          anchorNode: r.anchorNode,
          anchorOffset: r.anchorOffset,
          focusNode: r.focusNode,
          focusOffset: r.focusOffset,
        })),
    (br && fl(br, r)) ||
      ((br = r),
      (r = Lo(ma, "onSelect")),
      0 < r.length &&
        ((t = new au("onSelect", "select", null, t, n)),
        e.push({ event: t, listeners: r }),
        (t.target = bn))));
}
function Gl(e, t) {
  var n = {};
  return (
    (n[e.toLowerCase()] = t.toLowerCase()),
    (n["Webkit" + e] = "webkit" + t),
    (n["Moz" + e] = "moz" + t),
    n
  );
}
var er = {
    animationend: Gl("Animation", "AnimationEnd"),
    animationiteration: Gl("Animation", "AnimationIteration"),
    animationstart: Gl("Animation", "AnimationStart"),
    transitionend: Gl("Transition", "TransitionEnd"),
  },
  Di = {},
  jf = {};
$t &&
  ((jf = document.createElement("div").style),
  "AnimationEvent" in window ||
    (delete er.animationend.animation,
    delete er.animationiteration.animation,
    delete er.animationstart.animation),
  "TransitionEvent" in window || delete er.transitionend.transition);
function Zo(e) {
  if (Di[e]) return Di[e];
  if (!er[e]) return e;
  var t = er[e],
    n;
  for (n in t) if (t.hasOwnProperty(n) && n in jf) return (Di[e] = t[n]);
  return e;
}
var Af = Zo("animationend"),
  Bf = Zo("animationiteration"),
  $f = Zo("animationstart"),
  Hf = Zo("transitionend"),
  Vf = new Map(),
  Os =
    "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
      " "
    );
function wn(e, t) {
  Vf.set(e, t), Bn(t, [e]);
}
for (var Ni = 0; Ni < Os.length; Ni++) {
  var Mi = Os[Ni],
    Nm = Mi.toLowerCase(),
    Mm = Mi[0].toUpperCase() + Mi.slice(1);
  wn(Nm, "on" + Mm);
}
wn(Af, "onAnimationEnd");
wn(Bf, "onAnimationIteration");
wn($f, "onAnimationStart");
wn("dblclick", "onDoubleClick");
wn("focusin", "onFocus");
wn("focusout", "onBlur");
wn(Hf, "onTransitionEnd");
mr("onMouseEnter", ["mouseout", "mouseover"]);
mr("onMouseLeave", ["mouseout", "mouseover"]);
mr("onPointerEnter", ["pointerout", "pointerover"]);
mr("onPointerLeave", ["pointerout", "pointerover"]);
Bn(
  "onChange",
  "change click focusin focusout input keydown keyup selectionchange".split(" ")
);
Bn(
  "onSelect",
  "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
    " "
  )
);
Bn("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Bn(
  "onCompositionEnd",
  "compositionend focusout keydown keypress keyup mousedown".split(" ")
);
Bn(
  "onCompositionStart",
  "compositionstart focusout keydown keypress keyup mousedown".split(" ")
);
Bn(
  "onCompositionUpdate",
  "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
);
var Yr =
    "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
      " "
    ),
  zm = new Set("cancel close invalid load scroll toggle".split(" ").concat(Yr));
function Is(e, t, n) {
  var r = e.type || "unknown-event";
  (e.currentTarget = n), Nh(r, t, void 0, e), (e.currentTarget = null);
}
function Wf(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n],
      l = r.event;
    r = r.listeners;
    e: {
      var o = void 0;
      if (t)
        for (var i = r.length - 1; 0 <= i; i--) {
          var a = r[i],
            u = a.instance,
            s = a.currentTarget;
          if (((a = a.listener), u !== o && l.isPropagationStopped())) break e;
          Is(l, a, s), (o = u);
        }
      else
        for (i = 0; i < r.length; i++) {
          if (
            ((a = r[i]),
            (u = a.instance),
            (s = a.currentTarget),
            (a = a.listener),
            u !== o && l.isPropagationStopped())
          )
            break e;
          Is(l, a, s), (o = u);
        }
    }
  }
  if (xo) throw ((e = fa), (xo = !1), (fa = null), e);
}
function ie(e, t) {
  var n = t[Ea];
  n === void 0 && (n = t[Ea] = new Set());
  var r = e + "__bubble";
  n.has(r) || (Kf(t, e, 2, !1), n.add(r));
}
function zi(e, t, n) {
  var r = 0;
  t && (r |= 4), Kf(n, e, r, t);
}
var Jl = "_reactListening" + Math.random().toString(36).slice(2);
function dl(e) {
  if (!e[Jl]) {
    (e[Jl] = !0),
      Zc.forEach(function (n) {
        n !== "selectionchange" && (zm.has(n) || zi(n, !1, e), zi(n, !0, e));
      });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[Jl] || ((t[Jl] = !0), zi("selectionchange", !1, t));
  }
}
function Kf(e, t, n, r) {
  switch (Lf(t)) {
    case 1:
      var l = Yh;
      break;
    case 4:
      l = Xh;
      break;
    default:
      l = ou;
  }
  (n = l.bind(null, t, n, e)),
    (l = void 0),
    !ca ||
      (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
      (l = !0),
    r
      ? l !== void 0
        ? e.addEventListener(t, n, { capture: !0, passive: l })
        : e.addEventListener(t, n, !0)
      : l !== void 0
      ? e.addEventListener(t, n, { passive: l })
      : e.addEventListener(t, n, !1);
}
function Fi(e, t, n, r, l) {
  var o = r;
  if (!(t & 1) && !(t & 2) && r !== null)
    e: for (;;) {
      if (r === null) return;
      var i = r.tag;
      if (i === 3 || i === 4) {
        var a = r.stateNode.containerInfo;
        if (a === l || (a.nodeType === 8 && a.parentNode === l)) break;
        if (i === 4)
          for (i = r.return; i !== null; ) {
            var u = i.tag;
            if (
              (u === 3 || u === 4) &&
              ((u = i.stateNode.containerInfo),
              u === l || (u.nodeType === 8 && u.parentNode === l))
            )
              return;
            i = i.return;
          }
        for (; a !== null; ) {
          if (((i = Rn(a)), i === null)) return;
          if (((u = i.tag), u === 5 || u === 6)) {
            r = o = i;
            continue e;
          }
          a = a.parentNode;
        }
      }
      r = r.return;
    }
  hf(function () {
    var s = o,
      f = tu(n),
      c = [];
    e: {
      var p = Vf.get(e);
      if (p !== void 0) {
        var S = au,
          E = e;
        switch (e) {
          case "keypress":
            if (co(n) === 0) break e;
          case "keydown":
          case "keyup":
            S = sm;
            break;
          case "focusin":
            (E = "focus"), (S = Ri);
            break;
          case "focusout":
            (E = "blur"), (S = Ri);
            break;
          case "beforeblur":
          case "afterblur":
            S = Ri;
            break;
          case "click":
            if (n.button === 2) break e;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            S = Cs;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            S = Zh;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            S = dm;
            break;
          case Af:
          case Bf:
          case $f:
            S = em;
            break;
          case Hf:
            S = hm;
            break;
          case "scroll":
            S = Gh;
            break;
          case "wheel":
            S = vm;
            break;
          case "copy":
          case "cut":
          case "paste":
            S = nm;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            S = Ps;
        }
        var k = (t & 4) !== 0,
          P = !k && e === "scroll",
          h = k ? (p !== null ? p + "Capture" : null) : p;
        k = [];
        for (var d = s, m; d !== null; ) {
          m = d;
          var C = m.stateNode;
          if (
            (m.tag === 5 &&
              C !== null &&
              ((m = C),
              h !== null && ((C = il(d, h)), C != null && k.push(pl(d, C, m)))),
            P)
          )
            break;
          d = d.return;
        }
        0 < k.length &&
          ((p = new S(p, E, null, n, f)), c.push({ event: p, listeners: k }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (
          ((p = e === "mouseover" || e === "pointerover"),
          (S = e === "mouseout" || e === "pointerout"),
          p &&
            n !== ua &&
            (E = n.relatedTarget || n.fromElement) &&
            (Rn(E) || E[Ht]))
        )
          break e;
        if (
          (S || p) &&
          ((p =
            f.window === f
              ? f
              : (p = f.ownerDocument)
              ? p.defaultView || p.parentWindow
              : window),
          S
            ? ((E = n.relatedTarget || n.toElement),
              (S = s),
              (E = E ? Rn(E) : null),
              E !== null &&
                ((P = $n(E)), E !== P || (E.tag !== 5 && E.tag !== 6)) &&
                (E = null))
            : ((S = null), (E = s)),
          S !== E)
        ) {
          if (
            ((k = Cs),
            (C = "onMouseLeave"),
            (h = "onMouseEnter"),
            (d = "mouse"),
            (e === "pointerout" || e === "pointerover") &&
              ((k = Ps),
              (C = "onPointerLeave"),
              (h = "onPointerEnter"),
              (d = "pointer")),
            (P = S == null ? p : tr(S)),
            (m = E == null ? p : tr(E)),
            (p = new k(C, d + "leave", S, n, f)),
            (p.target = P),
            (p.relatedTarget = m),
            (C = null),
            Rn(f) === s &&
              ((k = new k(h, d + "enter", E, n, f)),
              (k.target = m),
              (k.relatedTarget = P),
              (C = k)),
            (P = C),
            S && E)
          )
            t: {
              for (k = S, h = E, d = 0, m = k; m; m = Yn(m)) d++;
              for (m = 0, C = h; C; C = Yn(C)) m++;
              for (; 0 < d - m; ) (k = Yn(k)), d--;
              for (; 0 < m - d; ) (h = Yn(h)), m--;
              for (; d--; ) {
                if (k === h || (h !== null && k === h.alternate)) break t;
                (k = Yn(k)), (h = Yn(h));
              }
              k = null;
            }
          else k = null;
          S !== null && Us(c, p, S, k, !1),
            E !== null && P !== null && Us(c, P, E, k, !0);
        }
      }
      e: {
        if (
          ((p = s ? tr(s) : window),
          (S = p.nodeName && p.nodeName.toLowerCase()),
          S === "select" || (S === "input" && p.type === "file"))
        )
          var L = xm;
        else if (Ts(p))
          if (Ff) L = Rm;
          else {
            L = _m;
            var y = Cm;
          }
        else
          (S = p.nodeName) &&
            S.toLowerCase() === "input" &&
            (p.type === "checkbox" || p.type === "radio") &&
            (L = Pm);
        if (L && (L = L(e, s))) {
          zf(c, L, n, f);
          break e;
        }
        y && y(e, p, s),
          e === "focusout" &&
            (y = p._wrapperState) &&
            y.controlled &&
            p.type === "number" &&
            ra(p, "number", p.value);
      }
      switch (((y = s ? tr(s) : window), e)) {
        case "focusin":
          (Ts(y) || y.contentEditable === "true") &&
            ((bn = y), (ma = s), (br = null));
          break;
        case "focusout":
          br = ma = bn = null;
          break;
        case "mousedown":
          va = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          (va = !1), Fs(c, n, f);
          break;
        case "selectionchange":
          if (Dm) break;
        case "keydown":
        case "keyup":
          Fs(c, n, f);
      }
      var N;
      if (su)
        e: {
          switch (e) {
            case "compositionstart":
              var T = "onCompositionStart";
              break e;
            case "compositionend":
              T = "onCompositionEnd";
              break e;
            case "compositionupdate":
              T = "onCompositionUpdate";
              break e;
          }
          T = void 0;
        }
      else
        qn
          ? Nf(e, n) && (T = "onCompositionEnd")
          : e === "keydown" && n.keyCode === 229 && (T = "onCompositionStart");
      T &&
        (Df &&
          n.locale !== "ko" &&
          (qn || T !== "onCompositionStart"
            ? T === "onCompositionEnd" && qn && (N = Tf())
            : ((ln = f),
              (iu = "value" in ln ? ln.value : ln.textContent),
              (qn = !0))),
        (y = Lo(s, T)),
        0 < y.length &&
          ((T = new _s(T, e, null, n, f)),
          c.push({ event: T, listeners: y }),
          N ? (T.data = N) : ((N = Mf(n)), N !== null && (T.data = N)))),
        (N = gm ? wm(e, n) : Sm(e, n)) &&
          ((s = Lo(s, "onBeforeInput")),
          0 < s.length &&
            ((f = new _s("onBeforeInput", "beforeinput", null, n, f)),
            c.push({ event: f, listeners: s }),
            (f.data = N)));
    }
    Wf(c, t);
  });
}
function pl(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function Lo(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var l = e,
      o = l.stateNode;
    l.tag === 5 &&
      o !== null &&
      ((l = o),
      (o = il(e, n)),
      o != null && r.unshift(pl(e, o, l)),
      (o = il(e, t)),
      o != null && r.push(pl(e, o, l))),
      (e = e.return);
  }
  return r;
}
function Yn(e) {
  if (e === null) return null;
  do e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function Us(e, t, n, r, l) {
  for (var o = t._reactName, i = []; n !== null && n !== r; ) {
    var a = n,
      u = a.alternate,
      s = a.stateNode;
    if (u !== null && u === r) break;
    a.tag === 5 &&
      s !== null &&
      ((a = s),
      l
        ? ((u = il(n, o)), u != null && i.unshift(pl(n, u, a)))
        : l || ((u = il(n, o)), u != null && i.push(pl(n, u, a)))),
      (n = n.return);
  }
  i.length !== 0 && e.push({ event: t, listeners: i });
}
var Fm = /\r\n?/g,
  Om = /\u0000|\uFFFD/g;
function js(e) {
  return (typeof e == "string" ? e : "" + e)
    .replace(
      Fm,
      `
`
    )
    .replace(Om, "");
}
function Zl(e, t, n) {
  if (((t = js(t)), js(e) !== t && n)) throw Error(R(425));
}
function To() {}
var ya = null,
  ga = null;
function wa(e, t) {
  return (
    e === "textarea" ||
    e === "noscript" ||
    typeof t.children == "string" ||
    typeof t.children == "number" ||
    (typeof t.dangerouslySetInnerHTML == "object" &&
      t.dangerouslySetInnerHTML !== null &&
      t.dangerouslySetInnerHTML.__html != null)
  );
}
var Sa = typeof setTimeout == "function" ? setTimeout : void 0,
  Im = typeof clearTimeout == "function" ? clearTimeout : void 0,
  As = typeof Promise == "function" ? Promise : void 0,
  Um =
    typeof queueMicrotask == "function"
      ? queueMicrotask
      : typeof As < "u"
      ? function (e) {
          return As.resolve(null).then(e).catch(jm);
        }
      : Sa;
function jm(e) {
  setTimeout(function () {
    throw e;
  });
}
function Oi(e, t) {
  var n = t,
    r = 0;
  do {
    var l = n.nextSibling;
    if ((e.removeChild(n), l && l.nodeType === 8))
      if (((n = l.data), n === "/$")) {
        if (r === 0) {
          e.removeChild(l), sl(t);
          return;
        }
        r--;
      } else (n !== "$" && n !== "$?" && n !== "$!") || r++;
    n = l;
  } while (n);
  sl(t);
}
function cn(e) {
  for (; e != null; e = e.nextSibling) {
    var t = e.nodeType;
    if (t === 1 || t === 3) break;
    if (t === 8) {
      if (((t = e.data), t === "$" || t === "$!" || t === "$?")) break;
      if (t === "/$") return null;
    }
  }
  return e;
}
function Bs(e) {
  e = e.previousSibling;
  for (var t = 0; e; ) {
    if (e.nodeType === 8) {
      var n = e.data;
      if (n === "$" || n === "$!" || n === "$?") {
        if (t === 0) return e;
        t--;
      } else n === "/$" && t++;
    }
    e = e.previousSibling;
  }
  return null;
}
var Pr = Math.random().toString(36).slice(2),
  Dt = "__reactFiber$" + Pr,
  hl = "__reactProps$" + Pr,
  Ht = "__reactContainer$" + Pr,
  Ea = "__reactEvents$" + Pr,
  Am = "__reactListeners$" + Pr,
  Bm = "__reactHandles$" + Pr;
function Rn(e) {
  var t = e[Dt];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if ((t = n[Ht] || n[Dt])) {
      if (
        ((n = t.alternate),
        t.child !== null || (n !== null && n.child !== null))
      )
        for (e = Bs(e); e !== null; ) {
          if ((n = e[Dt])) return n;
          e = Bs(e);
        }
      return t;
    }
    (e = n), (n = e.parentNode);
  }
  return null;
}
function Ll(e) {
  return (
    (e = e[Dt] || e[Ht]),
    !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3) ? null : e
  );
}
function tr(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(R(33));
}
function qo(e) {
  return e[hl] || null;
}
var ka = [],
  nr = -1;
function Sn(e) {
  return { current: e };
}
function ue(e) {
  0 > nr || ((e.current = ka[nr]), (ka[nr] = null), nr--);
}
function le(e, t) {
  nr++, (ka[nr] = e.current), (e.current = t);
}
var vn = {},
  Fe = Sn(vn),
  We = Sn(!1),
  Fn = vn;
function vr(e, t) {
  var n = e.type.contextTypes;
  if (!n) return vn;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
    return r.__reactInternalMemoizedMaskedChildContext;
  var l = {},
    o;
  for (o in n) l[o] = t[o];
  return (
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = t),
      (e.__reactInternalMemoizedMaskedChildContext = l)),
    l
  );
}
function Ke(e) {
  return (e = e.childContextTypes), e != null;
}
function Do() {
  ue(We), ue(Fe);
}
function $s(e, t, n) {
  if (Fe.current !== vn) throw Error(R(168));
  le(Fe, t), le(We, n);
}
function Qf(e, t, n) {
  var r = e.stateNode;
  if (((t = t.childContextTypes), typeof r.getChildContext != "function"))
    return n;
  r = r.getChildContext();
  for (var l in r) if (!(l in t)) throw Error(R(108, Ch(e) || "Unknown", l));
  return me({}, n, r);
}
function No(e) {
  return (
    (e =
      ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) || vn),
    (Fn = Fe.current),
    le(Fe, e),
    le(We, We.current),
    !0
  );
}
function Hs(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(R(169));
  n
    ? ((e = Qf(e, t, Fn)),
      (r.__reactInternalMemoizedMergedChildContext = e),
      ue(We),
      ue(Fe),
      le(Fe, e))
    : ue(We),
    le(We, n);
}
var Ut = null,
  bo = !1,
  Ii = !1;
function Yf(e) {
  Ut === null ? (Ut = [e]) : Ut.push(e);
}
function $m(e) {
  (bo = !0), Yf(e);
}
function En() {
  if (!Ii && Ut !== null) {
    Ii = !0;
    var e = 0,
      t = q;
    try {
      var n = Ut;
      for (q = 1; e < n.length; e++) {
        var r = n[e];
        do r = r(!0);
        while (r !== null);
      }
      (Ut = null), (bo = !1);
    } catch (l) {
      throw (Ut !== null && (Ut = Ut.slice(e + 1)), gf(nu, En), l);
    } finally {
      (q = t), (Ii = !1);
    }
  }
  return null;
}
var rr = [],
  lr = 0,
  Mo = null,
  zo = 0,
  at = [],
  ut = 0,
  On = null,
  jt = 1,
  At = "";
function _n(e, t) {
  (rr[lr++] = zo), (rr[lr++] = Mo), (Mo = e), (zo = t);
}
function Xf(e, t, n) {
  (at[ut++] = jt), (at[ut++] = At), (at[ut++] = On), (On = e);
  var r = jt;
  e = At;
  var l = 32 - St(r) - 1;
  (r &= ~(1 << l)), (n += 1);
  var o = 32 - St(t) + l;
  if (30 < o) {
    var i = l - (l % 5);
    (o = (r & ((1 << i) - 1)).toString(32)),
      (r >>= i),
      (l -= i),
      (jt = (1 << (32 - St(t) + l)) | (n << l) | r),
      (At = o + e);
  } else (jt = (1 << o) | (n << l) | r), (At = e);
}
function fu(e) {
  e.return !== null && (_n(e, 1), Xf(e, 1, 0));
}
function du(e) {
  for (; e === Mo; )
    (Mo = rr[--lr]), (rr[lr] = null), (zo = rr[--lr]), (rr[lr] = null);
  for (; e === On; )
    (On = at[--ut]),
      (at[ut] = null),
      (At = at[--ut]),
      (at[ut] = null),
      (jt = at[--ut]),
      (at[ut] = null);
}
var et = null,
  be = null,
  de = !1,
  wt = null;
function Gf(e, t) {
  var n = st(5, null, null, 0);
  (n.elementType = "DELETED"),
    (n.stateNode = t),
    (n.return = e),
    (t = e.deletions),
    t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n);
}
function Vs(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return (
        (t =
          t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase()
            ? null
            : t),
        t !== null
          ? ((e.stateNode = t), (et = e), (be = cn(t.firstChild)), !0)
          : !1
      );
    case 6:
      return (
        (t = e.pendingProps === "" || t.nodeType !== 3 ? null : t),
        t !== null ? ((e.stateNode = t), (et = e), (be = null), !0) : !1
      );
    case 13:
      return (
        (t = t.nodeType !== 8 ? null : t),
        t !== null
          ? ((n = On !== null ? { id: jt, overflow: At } : null),
            (e.memoizedState = {
              dehydrated: t,
              treeContext: n,
              retryLane: 1073741824,
            }),
            (n = st(18, null, null, 0)),
            (n.stateNode = t),
            (n.return = e),
            (e.child = n),
            (et = e),
            (be = null),
            !0)
          : !1
      );
    default:
      return !1;
  }
}
function xa(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function Ca(e) {
  if (de) {
    var t = be;
    if (t) {
      var n = t;
      if (!Vs(e, t)) {
        if (xa(e)) throw Error(R(418));
        t = cn(n.nextSibling);
        var r = et;
        t && Vs(e, t)
          ? Gf(r, n)
          : ((e.flags = (e.flags & -4097) | 2), (de = !1), (et = e));
      }
    } else {
      if (xa(e)) throw Error(R(418));
      (e.flags = (e.flags & -4097) | 2), (de = !1), (et = e);
    }
  }
}
function Ws(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; )
    e = e.return;
  et = e;
}
function ql(e) {
  if (e !== et) return !1;
  if (!de) return Ws(e), (de = !0), !1;
  var t;
  if (
    ((t = e.tag !== 3) &&
      !(t = e.tag !== 5) &&
      ((t = e.type),
      (t = t !== "head" && t !== "body" && !wa(e.type, e.memoizedProps))),
    t && (t = be))
  ) {
    if (xa(e)) throw (Jf(), Error(R(418)));
    for (; t; ) Gf(e, t), (t = cn(t.nextSibling));
  }
  if ((Ws(e), e.tag === 13)) {
    if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
      throw Error(R(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              be = cn(e.nextSibling);
              break e;
            }
            t--;
          } else (n !== "$" && n !== "$!" && n !== "$?") || t++;
        }
        e = e.nextSibling;
      }
      be = null;
    }
  } else be = et ? cn(e.stateNode.nextSibling) : null;
  return !0;
}
function Jf() {
  for (var e = be; e; ) e = cn(e.nextSibling);
}
function yr() {
  (be = et = null), (de = !1);
}
function pu(e) {
  wt === null ? (wt = [e]) : wt.push(e);
}
var Hm = Qt.ReactCurrentBatchConfig;
function Ar(e, t, n) {
  if (
    ((e = n.ref), e !== null && typeof e != "function" && typeof e != "object")
  ) {
    if (n._owner) {
      if (((n = n._owner), n)) {
        if (n.tag !== 1) throw Error(R(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(R(147, e));
      var l = r,
        o = "" + e;
      return t !== null &&
        t.ref !== null &&
        typeof t.ref == "function" &&
        t.ref._stringRef === o
        ? t.ref
        : ((t = function (i) {
            var a = l.refs;
            i === null ? delete a[o] : (a[o] = i);
          }),
          (t._stringRef = o),
          t);
    }
    if (typeof e != "string") throw Error(R(284));
    if (!n._owner) throw Error(R(290, e));
  }
  return e;
}
function bl(e, t) {
  throw (
    ((e = Object.prototype.toString.call(t)),
    Error(
      R(
        31,
        e === "[object Object]"
          ? "object with keys {" + Object.keys(t).join(", ") + "}"
          : e
      )
    ))
  );
}
function Ks(e) {
  var t = e._init;
  return t(e._payload);
}
function Zf(e) {
  function t(h, d) {
    if (e) {
      var m = h.deletions;
      m === null ? ((h.deletions = [d]), (h.flags |= 16)) : m.push(d);
    }
  }
  function n(h, d) {
    if (!e) return null;
    for (; d !== null; ) t(h, d), (d = d.sibling);
    return null;
  }
  function r(h, d) {
    for (h = new Map(); d !== null; )
      d.key !== null ? h.set(d.key, d) : h.set(d.index, d), (d = d.sibling);
    return h;
  }
  function l(h, d) {
    return (h = hn(h, d)), (h.index = 0), (h.sibling = null), h;
  }
  function o(h, d, m) {
    return (
      (h.index = m),
      e
        ? ((m = h.alternate),
          m !== null
            ? ((m = m.index), m < d ? ((h.flags |= 2), d) : m)
            : ((h.flags |= 2), d))
        : ((h.flags |= 1048576), d)
    );
  }
  function i(h) {
    return e && h.alternate === null && (h.flags |= 2), h;
  }
  function a(h, d, m, C) {
    return d === null || d.tag !== 6
      ? ((d = Vi(m, h.mode, C)), (d.return = h), d)
      : ((d = l(d, m)), (d.return = h), d);
  }
  function u(h, d, m, C) {
    var L = m.type;
    return L === Zn
      ? f(h, d, m.props.children, C, m.key)
      : d !== null &&
        (d.elementType === L ||
          (typeof L == "object" &&
            L !== null &&
            L.$$typeof === bt &&
            Ks(L) === d.type))
      ? ((C = l(d, m.props)), (C.ref = Ar(h, d, m)), (C.return = h), C)
      : ((C = go(m.type, m.key, m.props, null, h.mode, C)),
        (C.ref = Ar(h, d, m)),
        (C.return = h),
        C);
  }
  function s(h, d, m, C) {
    return d === null ||
      d.tag !== 4 ||
      d.stateNode.containerInfo !== m.containerInfo ||
      d.stateNode.implementation !== m.implementation
      ? ((d = Wi(m, h.mode, C)), (d.return = h), d)
      : ((d = l(d, m.children || [])), (d.return = h), d);
  }
  function f(h, d, m, C, L) {
    return d === null || d.tag !== 7
      ? ((d = zn(m, h.mode, C, L)), (d.return = h), d)
      : ((d = l(d, m)), (d.return = h), d);
  }
  function c(h, d, m) {
    if ((typeof d == "string" && d !== "") || typeof d == "number")
      return (d = Vi("" + d, h.mode, m)), (d.return = h), d;
    if (typeof d == "object" && d !== null) {
      switch (d.$$typeof) {
        case Hl:
          return (
            (m = go(d.type, d.key, d.props, null, h.mode, m)),
            (m.ref = Ar(h, null, d)),
            (m.return = h),
            m
          );
        case Jn:
          return (d = Wi(d, h.mode, m)), (d.return = h), d;
        case bt:
          var C = d._init;
          return c(h, C(d._payload), m);
      }
      if (Kr(d) || Fr(d))
        return (d = zn(d, h.mode, m, null)), (d.return = h), d;
      bl(h, d);
    }
    return null;
  }
  function p(h, d, m, C) {
    var L = d !== null ? d.key : null;
    if ((typeof m == "string" && m !== "") || typeof m == "number")
      return L !== null ? null : a(h, d, "" + m, C);
    if (typeof m == "object" && m !== null) {
      switch (m.$$typeof) {
        case Hl:
          return m.key === L ? u(h, d, m, C) : null;
        case Jn:
          return m.key === L ? s(h, d, m, C) : null;
        case bt:
          return (L = m._init), p(h, d, L(m._payload), C);
      }
      if (Kr(m) || Fr(m)) return L !== null ? null : f(h, d, m, C, null);
      bl(h, m);
    }
    return null;
  }
  function S(h, d, m, C, L) {
    if ((typeof C == "string" && C !== "") || typeof C == "number")
      return (h = h.get(m) || null), a(d, h, "" + C, L);
    if (typeof C == "object" && C !== null) {
      switch (C.$$typeof) {
        case Hl:
          return (h = h.get(C.key === null ? m : C.key) || null), u(d, h, C, L);
        case Jn:
          return (h = h.get(C.key === null ? m : C.key) || null), s(d, h, C, L);
        case bt:
          var y = C._init;
          return S(h, d, m, y(C._payload), L);
      }
      if (Kr(C) || Fr(C)) return (h = h.get(m) || null), f(d, h, C, L, null);
      bl(d, C);
    }
    return null;
  }
  function E(h, d, m, C) {
    for (
      var L = null, y = null, N = d, T = (d = 0), I = null;
      N !== null && T < m.length;
      T++
    ) {
      N.index > T ? ((I = N), (N = null)) : (I = N.sibling);
      var O = p(h, N, m[T], C);
      if (O === null) {
        N === null && (N = I);
        break;
      }
      e && N && O.alternate === null && t(h, N),
        (d = o(O, d, T)),
        y === null ? (L = O) : (y.sibling = O),
        (y = O),
        (N = I);
    }
    if (T === m.length) return n(h, N), de && _n(h, T), L;
    if (N === null) {
      for (; T < m.length; T++)
        (N = c(h, m[T], C)),
          N !== null &&
            ((d = o(N, d, T)), y === null ? (L = N) : (y.sibling = N), (y = N));
      return de && _n(h, T), L;
    }
    for (N = r(h, N); T < m.length; T++)
      (I = S(N, h, T, m[T], C)),
        I !== null &&
          (e && I.alternate !== null && N.delete(I.key === null ? T : I.key),
          (d = o(I, d, T)),
          y === null ? (L = I) : (y.sibling = I),
          (y = I));
    return (
      e &&
        N.forEach(function (Y) {
          return t(h, Y);
        }),
      de && _n(h, T),
      L
    );
  }
  function k(h, d, m, C) {
    var L = Fr(m);
    if (typeof L != "function") throw Error(R(150));
    if (((m = L.call(m)), m == null)) throw Error(R(151));
    for (
      var y = (L = null), N = d, T = (d = 0), I = null, O = m.next();
      N !== null && !O.done;
      T++, O = m.next()
    ) {
      N.index > T ? ((I = N), (N = null)) : (I = N.sibling);
      var Y = p(h, N, O.value, C);
      if (Y === null) {
        N === null && (N = I);
        break;
      }
      e && N && Y.alternate === null && t(h, N),
        (d = o(Y, d, T)),
        y === null ? (L = Y) : (y.sibling = Y),
        (y = Y),
        (N = I);
    }
    if (O.done) return n(h, N), de && _n(h, T), L;
    if (N === null) {
      for (; !O.done; T++, O = m.next())
        (O = c(h, O.value, C)),
          O !== null &&
            ((d = o(O, d, T)), y === null ? (L = O) : (y.sibling = O), (y = O));
      return de && _n(h, T), L;
    }
    for (N = r(h, N); !O.done; T++, O = m.next())
      (O = S(N, h, T, O.value, C)),
        O !== null &&
          (e && O.alternate !== null && N.delete(O.key === null ? T : O.key),
          (d = o(O, d, T)),
          y === null ? (L = O) : (y.sibling = O),
          (y = O));
    return (
      e &&
        N.forEach(function (se) {
          return t(h, se);
        }),
      de && _n(h, T),
      L
    );
  }
  function P(h, d, m, C) {
    if (
      (typeof m == "object" &&
        m !== null &&
        m.type === Zn &&
        m.key === null &&
        (m = m.props.children),
      typeof m == "object" && m !== null)
    ) {
      switch (m.$$typeof) {
        case Hl:
          e: {
            for (var L = m.key, y = d; y !== null; ) {
              if (y.key === L) {
                if (((L = m.type), L === Zn)) {
                  if (y.tag === 7) {
                    n(h, y.sibling),
                      (d = l(y, m.props.children)),
                      (d.return = h),
                      (h = d);
                    break e;
                  }
                } else if (
                  y.elementType === L ||
                  (typeof L == "object" &&
                    L !== null &&
                    L.$$typeof === bt &&
                    Ks(L) === y.type)
                ) {
                  n(h, y.sibling),
                    (d = l(y, m.props)),
                    (d.ref = Ar(h, y, m)),
                    (d.return = h),
                    (h = d);
                  break e;
                }
                n(h, y);
                break;
              } else t(h, y);
              y = y.sibling;
            }
            m.type === Zn
              ? ((d = zn(m.props.children, h.mode, C, m.key)),
                (d.return = h),
                (h = d))
              : ((C = go(m.type, m.key, m.props, null, h.mode, C)),
                (C.ref = Ar(h, d, m)),
                (C.return = h),
                (h = C));
          }
          return i(h);
        case Jn:
          e: {
            for (y = m.key; d !== null; ) {
              if (d.key === y)
                if (
                  d.tag === 4 &&
                  d.stateNode.containerInfo === m.containerInfo &&
                  d.stateNode.implementation === m.implementation
                ) {
                  n(h, d.sibling),
                    (d = l(d, m.children || [])),
                    (d.return = h),
                    (h = d);
                  break e;
                } else {
                  n(h, d);
                  break;
                }
              else t(h, d);
              d = d.sibling;
            }
            (d = Wi(m, h.mode, C)), (d.return = h), (h = d);
          }
          return i(h);
        case bt:
          return (y = m._init), P(h, d, y(m._payload), C);
      }
      if (Kr(m)) return E(h, d, m, C);
      if (Fr(m)) return k(h, d, m, C);
      bl(h, m);
    }
    return (typeof m == "string" && m !== "") || typeof m == "number"
      ? ((m = "" + m),
        d !== null && d.tag === 6
          ? (n(h, d.sibling), (d = l(d, m)), (d.return = h), (h = d))
          : (n(h, d), (d = Vi(m, h.mode, C)), (d.return = h), (h = d)),
        i(h))
      : n(h, d);
  }
  return P;
}
var gr = Zf(!0),
  qf = Zf(!1),
  Fo = Sn(null),
  Oo = null,
  or = null,
  hu = null;
function mu() {
  hu = or = Oo = null;
}
function vu(e) {
  var t = Fo.current;
  ue(Fo), (e._currentValue = t);
}
function _a(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if (
      ((e.childLanes & t) !== t
        ? ((e.childLanes |= t), r !== null && (r.childLanes |= t))
        : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t),
      e === n)
    )
      break;
    e = e.return;
  }
}
function pr(e, t) {
  (Oo = e),
    (hu = or = null),
    (e = e.dependencies),
    e !== null &&
      e.firstContext !== null &&
      (e.lanes & t && (Ve = !0), (e.firstContext = null));
}
function ft(e) {
  var t = e._currentValue;
  if (hu !== e)
    if (((e = { context: e, memoizedValue: t, next: null }), or === null)) {
      if (Oo === null) throw Error(R(308));
      (or = e), (Oo.dependencies = { lanes: 0, firstContext: e });
    } else or = or.next = e;
  return t;
}
var Ln = null;
function yu(e) {
  Ln === null ? (Ln = [e]) : Ln.push(e);
}
function bf(e, t, n, r) {
  var l = t.interleaved;
  return (
    l === null ? ((n.next = n), yu(t)) : ((n.next = l.next), (l.next = n)),
    (t.interleaved = n),
    Vt(e, r)
  );
}
function Vt(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; )
    (e.childLanes |= t),
      (n = e.alternate),
      n !== null && (n.childLanes |= t),
      (n = e),
      (e = e.return);
  return n.tag === 3 ? n.stateNode : null;
}
var en = !1;
function gu(e) {
  e.updateQueue = {
    baseState: e.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null, interleaved: null, lanes: 0 },
    effects: null,
  };
}
function ed(e, t) {
  (e = e.updateQueue),
    t.updateQueue === e &&
      (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        effects: e.effects,
      });
}
function Bt(e, t) {
  return {
    eventTime: e,
    lane: t,
    tag: 0,
    payload: null,
    callback: null,
    next: null,
  };
}
function fn(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (((r = r.shared), X & 2)) {
    var l = r.pending;
    return (
      l === null ? (t.next = t) : ((t.next = l.next), (l.next = t)),
      (r.pending = t),
      Vt(e, n)
    );
  }
  return (
    (l = r.interleaved),
    l === null ? ((t.next = t), yu(r)) : ((t.next = l.next), (l.next = t)),
    (r.interleaved = t),
    Vt(e, n)
  );
}
function fo(e, t, n) {
  if (
    ((t = t.updateQueue), t !== null && ((t = t.shared), (n & 4194240) !== 0))
  ) {
    var r = t.lanes;
    (r &= e.pendingLanes), (n |= r), (t.lanes = n), ru(e, n);
  }
}
function Qs(e, t) {
  var n = e.updateQueue,
    r = e.alternate;
  if (r !== null && ((r = r.updateQueue), n === r)) {
    var l = null,
      o = null;
    if (((n = n.firstBaseUpdate), n !== null)) {
      do {
        var i = {
          eventTime: n.eventTime,
          lane: n.lane,
          tag: n.tag,
          payload: n.payload,
          callback: n.callback,
          next: null,
        };
        o === null ? (l = o = i) : (o = o.next = i), (n = n.next);
      } while (n !== null);
      o === null ? (l = o = t) : (o = o.next = t);
    } else l = o = t;
    (n = {
      baseState: r.baseState,
      firstBaseUpdate: l,
      lastBaseUpdate: o,
      shared: r.shared,
      effects: r.effects,
    }),
      (e.updateQueue = n);
    return;
  }
  (e = n.lastBaseUpdate),
    e === null ? (n.firstBaseUpdate = t) : (e.next = t),
    (n.lastBaseUpdate = t);
}
function Io(e, t, n, r) {
  var l = e.updateQueue;
  en = !1;
  var o = l.firstBaseUpdate,
    i = l.lastBaseUpdate,
    a = l.shared.pending;
  if (a !== null) {
    l.shared.pending = null;
    var u = a,
      s = u.next;
    (u.next = null), i === null ? (o = s) : (i.next = s), (i = u);
    var f = e.alternate;
    f !== null &&
      ((f = f.updateQueue),
      (a = f.lastBaseUpdate),
      a !== i &&
        (a === null ? (f.firstBaseUpdate = s) : (a.next = s),
        (f.lastBaseUpdate = u)));
  }
  if (o !== null) {
    var c = l.baseState;
    (i = 0), (f = s = u = null), (a = o);
    do {
      var p = a.lane,
        S = a.eventTime;
      if ((r & p) === p) {
        f !== null &&
          (f = f.next =
            {
              eventTime: S,
              lane: 0,
              tag: a.tag,
              payload: a.payload,
              callback: a.callback,
              next: null,
            });
        e: {
          var E = e,
            k = a;
          switch (((p = t), (S = n), k.tag)) {
            case 1:
              if (((E = k.payload), typeof E == "function")) {
                c = E.call(S, c, p);
                break e;
              }
              c = E;
              break e;
            case 3:
              E.flags = (E.flags & -65537) | 128;
            case 0:
              if (
                ((E = k.payload),
                (p = typeof E == "function" ? E.call(S, c, p) : E),
                p == null)
              )
                break e;
              c = me({}, c, p);
              break e;
            case 2:
              en = !0;
          }
        }
        a.callback !== null &&
          a.lane !== 0 &&
          ((e.flags |= 64),
          (p = l.effects),
          p === null ? (l.effects = [a]) : p.push(a));
      } else
        (S = {
          eventTime: S,
          lane: p,
          tag: a.tag,
          payload: a.payload,
          callback: a.callback,
          next: null,
        }),
          f === null ? ((s = f = S), (u = c)) : (f = f.next = S),
          (i |= p);
      if (((a = a.next), a === null)) {
        if (((a = l.shared.pending), a === null)) break;
        (p = a),
          (a = p.next),
          (p.next = null),
          (l.lastBaseUpdate = p),
          (l.shared.pending = null);
      }
    } while (!0);
    if (
      (f === null && (u = c),
      (l.baseState = u),
      (l.firstBaseUpdate = s),
      (l.lastBaseUpdate = f),
      (t = l.shared.interleaved),
      t !== null)
    ) {
      l = t;
      do (i |= l.lane), (l = l.next);
      while (l !== t);
    } else o === null && (l.shared.lanes = 0);
    (Un |= i), (e.lanes = i), (e.memoizedState = c);
  }
}
function Ys(e, t, n) {
  if (((e = t.effects), (t.effects = null), e !== null))
    for (t = 0; t < e.length; t++) {
      var r = e[t],
        l = r.callback;
      if (l !== null) {
        if (((r.callback = null), (r = n), typeof l != "function"))
          throw Error(R(191, l));
        l.call(r);
      }
    }
}
var Tl = {},
  Mt = Sn(Tl),
  ml = Sn(Tl),
  vl = Sn(Tl);
function Tn(e) {
  if (e === Tl) throw Error(R(174));
  return e;
}
function wu(e, t) {
  switch ((le(vl, t), le(ml, e), le(Mt, Tl), (e = t.nodeType), e)) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : oa(null, "");
      break;
    default:
      (e = e === 8 ? t.parentNode : t),
        (t = e.namespaceURI || null),
        (e = e.tagName),
        (t = oa(t, e));
  }
  ue(Mt), le(Mt, t);
}
function wr() {
  ue(Mt), ue(ml), ue(vl);
}
function td(e) {
  Tn(vl.current);
  var t = Tn(Mt.current),
    n = oa(t, e.type);
  t !== n && (le(ml, e), le(Mt, n));
}
function Su(e) {
  ml.current === e && (ue(Mt), ue(ml));
}
var pe = Sn(0);
function Uo(e) {
  for (var t = e; t !== null; ) {
    if (t.tag === 13) {
      var n = t.memoizedState;
      if (
        n !== null &&
        ((n = n.dehydrated), n === null || n.data === "$?" || n.data === "$!")
      )
        return t;
    } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
      if (t.flags & 128) return t;
    } else if (t.child !== null) {
      (t.child.return = t), (t = t.child);
      continue;
    }
    if (t === e) break;
    for (; t.sibling === null; ) {
      if (t.return === null || t.return === e) return null;
      t = t.return;
    }
    (t.sibling.return = t.return), (t = t.sibling);
  }
  return null;
}
var Ui = [];
function Eu() {
  for (var e = 0; e < Ui.length; e++)
    Ui[e]._workInProgressVersionPrimary = null;
  Ui.length = 0;
}
var po = Qt.ReactCurrentDispatcher,
  ji = Qt.ReactCurrentBatchConfig,
  In = 0,
  he = null,
  Ee = null,
  Ce = null,
  jo = !1,
  el = !1,
  yl = 0,
  Vm = 0;
function Ne() {
  throw Error(R(321));
}
function ku(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++)
    if (!kt(e[n], t[n])) return !1;
  return !0;
}
function xu(e, t, n, r, l, o) {
  if (
    ((In = o),
    (he = t),
    (t.memoizedState = null),
    (t.updateQueue = null),
    (t.lanes = 0),
    (po.current = e === null || e.memoizedState === null ? Ym : Xm),
    (e = n(r, l)),
    el)
  ) {
    o = 0;
    do {
      if (((el = !1), (yl = 0), 25 <= o)) throw Error(R(301));
      (o += 1),
        (Ce = Ee = null),
        (t.updateQueue = null),
        (po.current = Gm),
        (e = n(r, l));
    } while (el);
  }
  if (
    ((po.current = Ao),
    (t = Ee !== null && Ee.next !== null),
    (In = 0),
    (Ce = Ee = he = null),
    (jo = !1),
    t)
  )
    throw Error(R(300));
  return e;
}
function Cu() {
  var e = yl !== 0;
  return (yl = 0), e;
}
function Tt() {
  var e = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null,
  };
  return Ce === null ? (he.memoizedState = Ce = e) : (Ce = Ce.next = e), Ce;
}
function dt() {
  if (Ee === null) {
    var e = he.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = Ee.next;
  var t = Ce === null ? he.memoizedState : Ce.next;
  if (t !== null) (Ce = t), (Ee = e);
  else {
    if (e === null) throw Error(R(310));
    (Ee = e),
      (e = {
        memoizedState: Ee.memoizedState,
        baseState: Ee.baseState,
        baseQueue: Ee.baseQueue,
        queue: Ee.queue,
        next: null,
      }),
      Ce === null ? (he.memoizedState = Ce = e) : (Ce = Ce.next = e);
  }
  return Ce;
}
function gl(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function Ai(e) {
  var t = dt(),
    n = t.queue;
  if (n === null) throw Error(R(311));
  n.lastRenderedReducer = e;
  var r = Ee,
    l = r.baseQueue,
    o = n.pending;
  if (o !== null) {
    if (l !== null) {
      var i = l.next;
      (l.next = o.next), (o.next = i);
    }
    (r.baseQueue = l = o), (n.pending = null);
  }
  if (l !== null) {
    (o = l.next), (r = r.baseState);
    var a = (i = null),
      u = null,
      s = o;
    do {
      var f = s.lane;
      if ((In & f) === f)
        u !== null &&
          (u = u.next =
            {
              lane: 0,
              action: s.action,
              hasEagerState: s.hasEagerState,
              eagerState: s.eagerState,
              next: null,
            }),
          (r = s.hasEagerState ? s.eagerState : e(r, s.action));
      else {
        var c = {
          lane: f,
          action: s.action,
          hasEagerState: s.hasEagerState,
          eagerState: s.eagerState,
          next: null,
        };
        u === null ? ((a = u = c), (i = r)) : (u = u.next = c),
          (he.lanes |= f),
          (Un |= f);
      }
      s = s.next;
    } while (s !== null && s !== o);
    u === null ? (i = r) : (u.next = a),
      kt(r, t.memoizedState) || (Ve = !0),
      (t.memoizedState = r),
      (t.baseState = i),
      (t.baseQueue = u),
      (n.lastRenderedState = r);
  }
  if (((e = n.interleaved), e !== null)) {
    l = e;
    do (o = l.lane), (he.lanes |= o), (Un |= o), (l = l.next);
    while (l !== e);
  } else l === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function Bi(e) {
  var t = dt(),
    n = t.queue;
  if (n === null) throw Error(R(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch,
    l = n.pending,
    o = t.memoizedState;
  if (l !== null) {
    n.pending = null;
    var i = (l = l.next);
    do (o = e(o, i.action)), (i = i.next);
    while (i !== l);
    kt(o, t.memoizedState) || (Ve = !0),
      (t.memoizedState = o),
      t.baseQueue === null && (t.baseState = o),
      (n.lastRenderedState = o);
  }
  return [o, r];
}
function nd() {}
function rd(e, t) {
  var n = he,
    r = dt(),
    l = t(),
    o = !kt(r.memoizedState, l);
  if (
    (o && ((r.memoizedState = l), (Ve = !0)),
    (r = r.queue),
    _u(id.bind(null, n, r, e), [e]),
    r.getSnapshot !== t || o || (Ce !== null && Ce.memoizedState.tag & 1))
  ) {
    if (
      ((n.flags |= 2048),
      wl(9, od.bind(null, n, r, l, t), void 0, null),
      _e === null)
    )
      throw Error(R(349));
    In & 30 || ld(n, t, l);
  }
  return l;
}
function ld(e, t, n) {
  (e.flags |= 16384),
    (e = { getSnapshot: t, value: n }),
    (t = he.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (he.updateQueue = t),
        (t.stores = [e]))
      : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e));
}
function od(e, t, n, r) {
  (t.value = n), (t.getSnapshot = r), ad(t) && ud(e);
}
function id(e, t, n) {
  return n(function () {
    ad(t) && ud(e);
  });
}
function ad(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !kt(e, n);
  } catch {
    return !0;
  }
}
function ud(e) {
  var t = Vt(e, 1);
  t !== null && Et(t, e, 1, -1);
}
function Xs(e) {
  var t = Tt();
  return (
    typeof e == "function" && (e = e()),
    (t.memoizedState = t.baseState = e),
    (e = {
      pending: null,
      interleaved: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: gl,
      lastRenderedState: e,
    }),
    (t.queue = e),
    (e = e.dispatch = Qm.bind(null, he, e)),
    [t.memoizedState, e]
  );
}
function wl(e, t, n, r) {
  return (
    (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
    (t = he.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (he.updateQueue = t),
        (t.lastEffect = e.next = e))
      : ((n = t.lastEffect),
        n === null
          ? (t.lastEffect = e.next = e)
          : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e))),
    e
  );
}
function sd() {
  return dt().memoizedState;
}
function ho(e, t, n, r) {
  var l = Tt();
  (he.flags |= e),
    (l.memoizedState = wl(1 | t, n, void 0, r === void 0 ? null : r));
}
function ei(e, t, n, r) {
  var l = dt();
  r = r === void 0 ? null : r;
  var o = void 0;
  if (Ee !== null) {
    var i = Ee.memoizedState;
    if (((o = i.destroy), r !== null && ku(r, i.deps))) {
      l.memoizedState = wl(t, n, o, r);
      return;
    }
  }
  (he.flags |= e), (l.memoizedState = wl(1 | t, n, o, r));
}
function Gs(e, t) {
  return ho(8390656, 8, e, t);
}
function _u(e, t) {
  return ei(2048, 8, e, t);
}
function cd(e, t) {
  return ei(4, 2, e, t);
}
function fd(e, t) {
  return ei(4, 4, e, t);
}
function dd(e, t) {
  if (typeof t == "function")
    return (
      (e = e()),
      t(e),
      function () {
        t(null);
      }
    );
  if (t != null)
    return (
      (e = e()),
      (t.current = e),
      function () {
        t.current = null;
      }
    );
}
function pd(e, t, n) {
  return (
    (n = n != null ? n.concat([e]) : null), ei(4, 4, dd.bind(null, t, e), n)
  );
}
function Pu() {}
function hd(e, t) {
  var n = dt();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && ku(t, r[1])
    ? r[0]
    : ((n.memoizedState = [e, t]), e);
}
function md(e, t) {
  var n = dt();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && ku(t, r[1])
    ? r[0]
    : ((e = e()), (n.memoizedState = [e, t]), e);
}
function vd(e, t, n) {
  return In & 21
    ? (kt(n, t) || ((n = Ef()), (he.lanes |= n), (Un |= n), (e.baseState = !0)),
      t)
    : (e.baseState && ((e.baseState = !1), (Ve = !0)), (e.memoizedState = n));
}
function Wm(e, t) {
  var n = q;
  (q = n !== 0 && 4 > n ? n : 4), e(!0);
  var r = ji.transition;
  ji.transition = {};
  try {
    e(!1), t();
  } finally {
    (q = n), (ji.transition = r);
  }
}
function yd() {
  return dt().memoizedState;
}
function Km(e, t, n) {
  var r = pn(e);
  if (
    ((n = {
      lane: r,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
    gd(e))
  )
    wd(t, n);
  else if (((n = bf(e, t, n, r)), n !== null)) {
    var l = Ae();
    Et(n, e, r, l), Sd(n, t, r);
  }
}
function Qm(e, t, n) {
  var r = pn(e),
    l = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (gd(e)) wd(t, l);
  else {
    var o = e.alternate;
    if (
      e.lanes === 0 &&
      (o === null || o.lanes === 0) &&
      ((o = t.lastRenderedReducer), o !== null)
    )
      try {
        var i = t.lastRenderedState,
          a = o(i, n);
        if (((l.hasEagerState = !0), (l.eagerState = a), kt(a, i))) {
          var u = t.interleaved;
          u === null
            ? ((l.next = l), yu(t))
            : ((l.next = u.next), (u.next = l)),
            (t.interleaved = l);
          return;
        }
      } catch {
      } finally {
      }
    (n = bf(e, t, l, r)),
      n !== null && ((l = Ae()), Et(n, e, r, l), Sd(n, t, r));
  }
}
function gd(e) {
  var t = e.alternate;
  return e === he || (t !== null && t === he);
}
function wd(e, t) {
  el = jo = !0;
  var n = e.pending;
  n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
    (e.pending = t);
}
function Sd(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    (r &= e.pendingLanes), (n |= r), (t.lanes = n), ru(e, n);
  }
}
var Ao = {
    readContext: ft,
    useCallback: Ne,
    useContext: Ne,
    useEffect: Ne,
    useImperativeHandle: Ne,
    useInsertionEffect: Ne,
    useLayoutEffect: Ne,
    useMemo: Ne,
    useReducer: Ne,
    useRef: Ne,
    useState: Ne,
    useDebugValue: Ne,
    useDeferredValue: Ne,
    useTransition: Ne,
    useMutableSource: Ne,
    useSyncExternalStore: Ne,
    useId: Ne,
    unstable_isNewReconciler: !1,
  },
  Ym = {
    readContext: ft,
    useCallback: function (e, t) {
      return (Tt().memoizedState = [e, t === void 0 ? null : t]), e;
    },
    useContext: ft,
    useEffect: Gs,
    useImperativeHandle: function (e, t, n) {
      return (
        (n = n != null ? n.concat([e]) : null),
        ho(4194308, 4, dd.bind(null, t, e), n)
      );
    },
    useLayoutEffect: function (e, t) {
      return ho(4194308, 4, e, t);
    },
    useInsertionEffect: function (e, t) {
      return ho(4, 2, e, t);
    },
    useMemo: function (e, t) {
      var n = Tt();
      return (
        (t = t === void 0 ? null : t), (e = e()), (n.memoizedState = [e, t]), e
      );
    },
    useReducer: function (e, t, n) {
      var r = Tt();
      return (
        (t = n !== void 0 ? n(t) : t),
        (r.memoizedState = r.baseState = t),
        (e = {
          pending: null,
          interleaved: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: e,
          lastRenderedState: t,
        }),
        (r.queue = e),
        (e = e.dispatch = Km.bind(null, he, e)),
        [r.memoizedState, e]
      );
    },
    useRef: function (e) {
      var t = Tt();
      return (e = { current: e }), (t.memoizedState = e);
    },
    useState: Xs,
    useDebugValue: Pu,
    useDeferredValue: function (e) {
      return (Tt().memoizedState = e);
    },
    useTransition: function () {
      var e = Xs(!1),
        t = e[0];
      return (e = Wm.bind(null, e[1])), (Tt().memoizedState = e), [t, e];
    },
    useMutableSource: function () {},
    useSyncExternalStore: function (e, t, n) {
      var r = he,
        l = Tt();
      if (de) {
        if (n === void 0) throw Error(R(407));
        n = n();
      } else {
        if (((n = t()), _e === null)) throw Error(R(349));
        In & 30 || ld(r, t, n);
      }
      l.memoizedState = n;
      var o = { value: n, getSnapshot: t };
      return (
        (l.queue = o),
        Gs(id.bind(null, r, o, e), [e]),
        (r.flags |= 2048),
        wl(9, od.bind(null, r, o, n, t), void 0, null),
        n
      );
    },
    useId: function () {
      var e = Tt(),
        t = _e.identifierPrefix;
      if (de) {
        var n = At,
          r = jt;
        (n = (r & ~(1 << (32 - St(r) - 1))).toString(32) + n),
          (t = ":" + t + "R" + n),
          (n = yl++),
          0 < n && (t += "H" + n.toString(32)),
          (t += ":");
      } else (n = Vm++), (t = ":" + t + "r" + n.toString(32) + ":");
      return (e.memoizedState = t);
    },
    unstable_isNewReconciler: !1,
  },
  Xm = {
    readContext: ft,
    useCallback: hd,
    useContext: ft,
    useEffect: _u,
    useImperativeHandle: pd,
    useInsertionEffect: cd,
    useLayoutEffect: fd,
    useMemo: md,
    useReducer: Ai,
    useRef: sd,
    useState: function () {
      return Ai(gl);
    },
    useDebugValue: Pu,
    useDeferredValue: function (e) {
      var t = dt();
      return vd(t, Ee.memoizedState, e);
    },
    useTransition: function () {
      var e = Ai(gl)[0],
        t = dt().memoizedState;
      return [e, t];
    },
    useMutableSource: nd,
    useSyncExternalStore: rd,
    useId: yd,
    unstable_isNewReconciler: !1,
  },
  Gm = {
    readContext: ft,
    useCallback: hd,
    useContext: ft,
    useEffect: _u,
    useImperativeHandle: pd,
    useInsertionEffect: cd,
    useLayoutEffect: fd,
    useMemo: md,
    useReducer: Bi,
    useRef: sd,
    useState: function () {
      return Bi(gl);
    },
    useDebugValue: Pu,
    useDeferredValue: function (e) {
      var t = dt();
      return Ee === null ? (t.memoizedState = e) : vd(t, Ee.memoizedState, e);
    },
    useTransition: function () {
      var e = Bi(gl)[0],
        t = dt().memoizedState;
      return [e, t];
    },
    useMutableSource: nd,
    useSyncExternalStore: rd,
    useId: yd,
    unstable_isNewReconciler: !1,
  };
function vt(e, t) {
  if (e && e.defaultProps) {
    (t = me({}, t)), (e = e.defaultProps);
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function Pa(e, t, n, r) {
  (t = e.memoizedState),
    (n = n(r, t)),
    (n = n == null ? t : me({}, t, n)),
    (e.memoizedState = n),
    e.lanes === 0 && (e.updateQueue.baseState = n);
}
var ti = {
  isMounted: function (e) {
    return (e = e._reactInternals) ? $n(e) === e : !1;
  },
  enqueueSetState: function (e, t, n) {
    e = e._reactInternals;
    var r = Ae(),
      l = pn(e),
      o = Bt(r, l);
    (o.payload = t),
      n != null && (o.callback = n),
      (t = fn(e, o, l)),
      t !== null && (Et(t, e, l, r), fo(t, e, l));
  },
  enqueueReplaceState: function (e, t, n) {
    e = e._reactInternals;
    var r = Ae(),
      l = pn(e),
      o = Bt(r, l);
    (o.tag = 1),
      (o.payload = t),
      n != null && (o.callback = n),
      (t = fn(e, o, l)),
      t !== null && (Et(t, e, l, r), fo(t, e, l));
  },
  enqueueForceUpdate: function (e, t) {
    e = e._reactInternals;
    var n = Ae(),
      r = pn(e),
      l = Bt(n, r);
    (l.tag = 2),
      t != null && (l.callback = t),
      (t = fn(e, l, r)),
      t !== null && (Et(t, e, r, n), fo(t, e, r));
  },
};
function Js(e, t, n, r, l, o, i) {
  return (
    (e = e.stateNode),
    typeof e.shouldComponentUpdate == "function"
      ? e.shouldComponentUpdate(r, o, i)
      : t.prototype && t.prototype.isPureReactComponent
      ? !fl(n, r) || !fl(l, o)
      : !0
  );
}
function Ed(e, t, n) {
  var r = !1,
    l = vn,
    o = t.contextType;
  return (
    typeof o == "object" && o !== null
      ? (o = ft(o))
      : ((l = Ke(t) ? Fn : Fe.current),
        (r = t.contextTypes),
        (o = (r = r != null) ? vr(e, l) : vn)),
    (t = new t(n, o)),
    (e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null),
    (t.updater = ti),
    (e.stateNode = t),
    (t._reactInternals = e),
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = l),
      (e.__reactInternalMemoizedMaskedChildContext = o)),
    t
  );
}
function Zs(e, t, n, r) {
  (e = t.state),
    typeof t.componentWillReceiveProps == "function" &&
      t.componentWillReceiveProps(n, r),
    typeof t.UNSAFE_componentWillReceiveProps == "function" &&
      t.UNSAFE_componentWillReceiveProps(n, r),
    t.state !== e && ti.enqueueReplaceState(t, t.state, null);
}
function Ra(e, t, n, r) {
  var l = e.stateNode;
  (l.props = n), (l.state = e.memoizedState), (l.refs = {}), gu(e);
  var o = t.contextType;
  typeof o == "object" && o !== null
    ? (l.context = ft(o))
    : ((o = Ke(t) ? Fn : Fe.current), (l.context = vr(e, o))),
    (l.state = e.memoizedState),
    (o = t.getDerivedStateFromProps),
    typeof o == "function" && (Pa(e, t, o, n), (l.state = e.memoizedState)),
    typeof t.getDerivedStateFromProps == "function" ||
      typeof l.getSnapshotBeforeUpdate == "function" ||
      (typeof l.UNSAFE_componentWillMount != "function" &&
        typeof l.componentWillMount != "function") ||
      ((t = l.state),
      typeof l.componentWillMount == "function" && l.componentWillMount(),
      typeof l.UNSAFE_componentWillMount == "function" &&
        l.UNSAFE_componentWillMount(),
      t !== l.state && ti.enqueueReplaceState(l, l.state, null),
      Io(e, n, l, r),
      (l.state = e.memoizedState)),
    typeof l.componentDidMount == "function" && (e.flags |= 4194308);
}
function Sr(e, t) {
  try {
    var n = "",
      r = t;
    do (n += xh(r)), (r = r.return);
    while (r);
    var l = n;
  } catch (o) {
    l =
      `
Error generating stack: ` +
      o.message +
      `
` +
      o.stack;
  }
  return { value: e, source: t, stack: l, digest: null };
}
function $i(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function La(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function () {
      throw n;
    });
  }
}
var Jm = typeof WeakMap == "function" ? WeakMap : Map;
function kd(e, t, n) {
  (n = Bt(-1, n)), (n.tag = 3), (n.payload = { element: null });
  var r = t.value;
  return (
    (n.callback = function () {
      $o || (($o = !0), (ja = r)), La(e, t);
    }),
    n
  );
}
function xd(e, t, n) {
  (n = Bt(-1, n)), (n.tag = 3);
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var l = t.value;
    (n.payload = function () {
      return r(l);
    }),
      (n.callback = function () {
        La(e, t);
      });
  }
  var o = e.stateNode;
  return (
    o !== null &&
      typeof o.componentDidCatch == "function" &&
      (n.callback = function () {
        La(e, t),
          typeof r != "function" &&
            (dn === null ? (dn = new Set([this])) : dn.add(this));
        var i = t.stack;
        this.componentDidCatch(t.value, {
          componentStack: i !== null ? i : "",
        });
      }),
    n
  );
}
function qs(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new Jm();
    var l = new Set();
    r.set(t, l);
  } else (l = r.get(t)), l === void 0 && ((l = new Set()), r.set(t, l));
  l.has(n) || (l.add(n), (e = cv.bind(null, e, t, n)), t.then(e, e));
}
function bs(e) {
  do {
    var t;
    if (
      ((t = e.tag === 13) &&
        ((t = e.memoizedState), (t = t !== null ? t.dehydrated !== null : !0)),
      t)
    )
      return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function ec(e, t, n, r, l) {
  return e.mode & 1
    ? ((e.flags |= 65536), (e.lanes = l), e)
    : (e === t
        ? (e.flags |= 65536)
        : ((e.flags |= 128),
          (n.flags |= 131072),
          (n.flags &= -52805),
          n.tag === 1 &&
            (n.alternate === null
              ? (n.tag = 17)
              : ((t = Bt(-1, 1)), (t.tag = 2), fn(n, t, 1))),
          (n.lanes |= 1)),
      e);
}
var Zm = Qt.ReactCurrentOwner,
  Ve = !1;
function je(e, t, n, r) {
  t.child = e === null ? qf(t, null, n, r) : gr(t, e.child, n, r);
}
function tc(e, t, n, r, l) {
  n = n.render;
  var o = t.ref;
  return (
    pr(t, l),
    (r = xu(e, t, n, r, o, l)),
    (n = Cu()),
    e !== null && !Ve
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~l),
        Wt(e, t, l))
      : (de && n && fu(t), (t.flags |= 1), je(e, t, r, l), t.child)
  );
}
function nc(e, t, n, r, l) {
  if (e === null) {
    var o = n.type;
    return typeof o == "function" &&
      !Fu(o) &&
      o.defaultProps === void 0 &&
      n.compare === null &&
      n.defaultProps === void 0
      ? ((t.tag = 15), (t.type = o), Cd(e, t, o, r, l))
      : ((e = go(n.type, null, r, t, t.mode, l)),
        (e.ref = t.ref),
        (e.return = t),
        (t.child = e));
  }
  if (((o = e.child), !(e.lanes & l))) {
    var i = o.memoizedProps;
    if (
      ((n = n.compare), (n = n !== null ? n : fl), n(i, r) && e.ref === t.ref)
    )
      return Wt(e, t, l);
  }
  return (
    (t.flags |= 1),
    (e = hn(o, r)),
    (e.ref = t.ref),
    (e.return = t),
    (t.child = e)
  );
}
function Cd(e, t, n, r, l) {
  if (e !== null) {
    var o = e.memoizedProps;
    if (fl(o, r) && e.ref === t.ref)
      if (((Ve = !1), (t.pendingProps = r = o), (e.lanes & l) !== 0))
        e.flags & 131072 && (Ve = !0);
      else return (t.lanes = e.lanes), Wt(e, t, l);
  }
  return Ta(e, t, n, r, l);
}
function _d(e, t, n) {
  var r = t.pendingProps,
    l = r.children,
    o = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden")
    if (!(t.mode & 1))
      (t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        le(ar, Ze),
        (Ze |= n);
    else {
      if (!(n & 1073741824))
        return (
          (e = o !== null ? o.baseLanes | n : n),
          (t.lanes = t.childLanes = 1073741824),
          (t.memoizedState = {
            baseLanes: e,
            cachePool: null,
            transitions: null,
          }),
          (t.updateQueue = null),
          le(ar, Ze),
          (Ze |= e),
          null
        );
      (t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        (r = o !== null ? o.baseLanes : n),
        le(ar, Ze),
        (Ze |= r);
    }
  else
    o !== null ? ((r = o.baseLanes | n), (t.memoizedState = null)) : (r = n),
      le(ar, Ze),
      (Ze |= r);
  return je(e, t, l, n), t.child;
}
function Pd(e, t) {
  var n = t.ref;
  ((e === null && n !== null) || (e !== null && e.ref !== n)) &&
    ((t.flags |= 512), (t.flags |= 2097152));
}
function Ta(e, t, n, r, l) {
  var o = Ke(n) ? Fn : Fe.current;
  return (
    (o = vr(t, o)),
    pr(t, l),
    (n = xu(e, t, n, r, o, l)),
    (r = Cu()),
    e !== null && !Ve
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~l),
        Wt(e, t, l))
      : (de && r && fu(t), (t.flags |= 1), je(e, t, n, l), t.child)
  );
}
function rc(e, t, n, r, l) {
  if (Ke(n)) {
    var o = !0;
    No(t);
  } else o = !1;
  if ((pr(t, l), t.stateNode === null))
    mo(e, t), Ed(t, n, r), Ra(t, n, r, l), (r = !0);
  else if (e === null) {
    var i = t.stateNode,
      a = t.memoizedProps;
    i.props = a;
    var u = i.context,
      s = n.contextType;
    typeof s == "object" && s !== null
      ? (s = ft(s))
      : ((s = Ke(n) ? Fn : Fe.current), (s = vr(t, s)));
    var f = n.getDerivedStateFromProps,
      c =
        typeof f == "function" ||
        typeof i.getSnapshotBeforeUpdate == "function";
    c ||
      (typeof i.UNSAFE_componentWillReceiveProps != "function" &&
        typeof i.componentWillReceiveProps != "function") ||
      ((a !== r || u !== s) && Zs(t, i, r, s)),
      (en = !1);
    var p = t.memoizedState;
    (i.state = p),
      Io(t, r, i, l),
      (u = t.memoizedState),
      a !== r || p !== u || We.current || en
        ? (typeof f == "function" && (Pa(t, n, f, r), (u = t.memoizedState)),
          (a = en || Js(t, n, a, r, p, u, s))
            ? (c ||
                (typeof i.UNSAFE_componentWillMount != "function" &&
                  typeof i.componentWillMount != "function") ||
                (typeof i.componentWillMount == "function" &&
                  i.componentWillMount(),
                typeof i.UNSAFE_componentWillMount == "function" &&
                  i.UNSAFE_componentWillMount()),
              typeof i.componentDidMount == "function" && (t.flags |= 4194308))
            : (typeof i.componentDidMount == "function" && (t.flags |= 4194308),
              (t.memoizedProps = r),
              (t.memoizedState = u)),
          (i.props = r),
          (i.state = u),
          (i.context = s),
          (r = a))
        : (typeof i.componentDidMount == "function" && (t.flags |= 4194308),
          (r = !1));
  } else {
    (i = t.stateNode),
      ed(e, t),
      (a = t.memoizedProps),
      (s = t.type === t.elementType ? a : vt(t.type, a)),
      (i.props = s),
      (c = t.pendingProps),
      (p = i.context),
      (u = n.contextType),
      typeof u == "object" && u !== null
        ? (u = ft(u))
        : ((u = Ke(n) ? Fn : Fe.current), (u = vr(t, u)));
    var S = n.getDerivedStateFromProps;
    (f =
      typeof S == "function" ||
      typeof i.getSnapshotBeforeUpdate == "function") ||
      (typeof i.UNSAFE_componentWillReceiveProps != "function" &&
        typeof i.componentWillReceiveProps != "function") ||
      ((a !== c || p !== u) && Zs(t, i, r, u)),
      (en = !1),
      (p = t.memoizedState),
      (i.state = p),
      Io(t, r, i, l);
    var E = t.memoizedState;
    a !== c || p !== E || We.current || en
      ? (typeof S == "function" && (Pa(t, n, S, r), (E = t.memoizedState)),
        (s = en || Js(t, n, s, r, p, E, u) || !1)
          ? (f ||
              (typeof i.UNSAFE_componentWillUpdate != "function" &&
                typeof i.componentWillUpdate != "function") ||
              (typeof i.componentWillUpdate == "function" &&
                i.componentWillUpdate(r, E, u),
              typeof i.UNSAFE_componentWillUpdate == "function" &&
                i.UNSAFE_componentWillUpdate(r, E, u)),
            typeof i.componentDidUpdate == "function" && (t.flags |= 4),
            typeof i.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024))
          : (typeof i.componentDidUpdate != "function" ||
              (a === e.memoizedProps && p === e.memoizedState) ||
              (t.flags |= 4),
            typeof i.getSnapshotBeforeUpdate != "function" ||
              (a === e.memoizedProps && p === e.memoizedState) ||
              (t.flags |= 1024),
            (t.memoizedProps = r),
            (t.memoizedState = E)),
        (i.props = r),
        (i.state = E),
        (i.context = u),
        (r = s))
      : (typeof i.componentDidUpdate != "function" ||
          (a === e.memoizedProps && p === e.memoizedState) ||
          (t.flags |= 4),
        typeof i.getSnapshotBeforeUpdate != "function" ||
          (a === e.memoizedProps && p === e.memoizedState) ||
          (t.flags |= 1024),
        (r = !1));
  }
  return Da(e, t, n, r, o, l);
}
function Da(e, t, n, r, l, o) {
  Pd(e, t);
  var i = (t.flags & 128) !== 0;
  if (!r && !i) return l && Hs(t, n, !1), Wt(e, t, o);
  (r = t.stateNode), (Zm.current = t);
  var a =
    i && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return (
    (t.flags |= 1),
    e !== null && i
      ? ((t.child = gr(t, e.child, null, o)), (t.child = gr(t, null, a, o)))
      : je(e, t, a, o),
    (t.memoizedState = r.state),
    l && Hs(t, n, !0),
    t.child
  );
}
function Rd(e) {
  var t = e.stateNode;
  t.pendingContext
    ? $s(e, t.pendingContext, t.pendingContext !== t.context)
    : t.context && $s(e, t.context, !1),
    wu(e, t.containerInfo);
}
function lc(e, t, n, r, l) {
  return yr(), pu(l), (t.flags |= 256), je(e, t, n, r), t.child;
}
var Na = { dehydrated: null, treeContext: null, retryLane: 0 };
function Ma(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function Ld(e, t, n) {
  var r = t.pendingProps,
    l = pe.current,
    o = !1,
    i = (t.flags & 128) !== 0,
    a;
  if (
    ((a = i) ||
      (a = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0),
    a
      ? ((o = !0), (t.flags &= -129))
      : (e === null || e.memoizedState !== null) && (l |= 1),
    le(pe, l & 1),
    e === null)
  )
    return (
      Ca(t),
      (e = t.memoizedState),
      e !== null && ((e = e.dehydrated), e !== null)
        ? (t.mode & 1
            ? e.data === "$!"
              ? (t.lanes = 8)
              : (t.lanes = 1073741824)
            : (t.lanes = 1),
          null)
        : ((i = r.children),
          (e = r.fallback),
          o
            ? ((r = t.mode),
              (o = t.child),
              (i = { mode: "hidden", children: i }),
              !(r & 1) && o !== null
                ? ((o.childLanes = 0), (o.pendingProps = i))
                : (o = li(i, r, 0, null)),
              (e = zn(e, r, n, null)),
              (o.return = t),
              (e.return = t),
              (o.sibling = e),
              (t.child = o),
              (t.child.memoizedState = Ma(n)),
              (t.memoizedState = Na),
              e)
            : Ru(t, i))
    );
  if (((l = e.memoizedState), l !== null && ((a = l.dehydrated), a !== null)))
    return qm(e, t, i, r, a, l, n);
  if (o) {
    (o = r.fallback), (i = t.mode), (l = e.child), (a = l.sibling);
    var u = { mode: "hidden", children: r.children };
    return (
      !(i & 1) && t.child !== l
        ? ((r = t.child),
          (r.childLanes = 0),
          (r.pendingProps = u),
          (t.deletions = null))
        : ((r = hn(l, u)), (r.subtreeFlags = l.subtreeFlags & 14680064)),
      a !== null ? (o = hn(a, o)) : ((o = zn(o, i, n, null)), (o.flags |= 2)),
      (o.return = t),
      (r.return = t),
      (r.sibling = o),
      (t.child = r),
      (r = o),
      (o = t.child),
      (i = e.child.memoizedState),
      (i =
        i === null
          ? Ma(n)
          : {
              baseLanes: i.baseLanes | n,
              cachePool: null,
              transitions: i.transitions,
            }),
      (o.memoizedState = i),
      (o.childLanes = e.childLanes & ~n),
      (t.memoizedState = Na),
      r
    );
  }
  return (
    (o = e.child),
    (e = o.sibling),
    (r = hn(o, { mode: "visible", children: r.children })),
    !(t.mode & 1) && (r.lanes = n),
    (r.return = t),
    (r.sibling = null),
    e !== null &&
      ((n = t.deletions),
      n === null ? ((t.deletions = [e]), (t.flags |= 16)) : n.push(e)),
    (t.child = r),
    (t.memoizedState = null),
    r
  );
}
function Ru(e, t) {
  return (
    (t = li({ mode: "visible", children: t }, e.mode, 0, null)),
    (t.return = e),
    (e.child = t)
  );
}
function eo(e, t, n, r) {
  return (
    r !== null && pu(r),
    gr(t, e.child, null, n),
    (e = Ru(t, t.pendingProps.children)),
    (e.flags |= 2),
    (t.memoizedState = null),
    e
  );
}
function qm(e, t, n, r, l, o, i) {
  if (n)
    return t.flags & 256
      ? ((t.flags &= -257), (r = $i(Error(R(422)))), eo(e, t, i, r))
      : t.memoizedState !== null
      ? ((t.child = e.child), (t.flags |= 128), null)
      : ((o = r.fallback),
        (l = t.mode),
        (r = li({ mode: "visible", children: r.children }, l, 0, null)),
        (o = zn(o, l, i, null)),
        (o.flags |= 2),
        (r.return = t),
        (o.return = t),
        (r.sibling = o),
        (t.child = r),
        t.mode & 1 && gr(t, e.child, null, i),
        (t.child.memoizedState = Ma(i)),
        (t.memoizedState = Na),
        o);
  if (!(t.mode & 1)) return eo(e, t, i, null);
  if (l.data === "$!") {
    if (((r = l.nextSibling && l.nextSibling.dataset), r)) var a = r.dgst;
    return (r = a), (o = Error(R(419))), (r = $i(o, r, void 0)), eo(e, t, i, r);
  }
  if (((a = (i & e.childLanes) !== 0), Ve || a)) {
    if (((r = _e), r !== null)) {
      switch (i & -i) {
        case 4:
          l = 2;
          break;
        case 16:
          l = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          l = 32;
          break;
        case 536870912:
          l = 268435456;
          break;
        default:
          l = 0;
      }
      (l = l & (r.suspendedLanes | i) ? 0 : l),
        l !== 0 &&
          l !== o.retryLane &&
          ((o.retryLane = l), Vt(e, l), Et(r, e, l, -1));
    }
    return zu(), (r = $i(Error(R(421)))), eo(e, t, i, r);
  }
  return l.data === "$?"
    ? ((t.flags |= 128),
      (t.child = e.child),
      (t = fv.bind(null, e)),
      (l._reactRetry = t),
      null)
    : ((e = o.treeContext),
      (be = cn(l.nextSibling)),
      (et = t),
      (de = !0),
      (wt = null),
      e !== null &&
        ((at[ut++] = jt),
        (at[ut++] = At),
        (at[ut++] = On),
        (jt = e.id),
        (At = e.overflow),
        (On = t)),
      (t = Ru(t, r.children)),
      (t.flags |= 4096),
      t);
}
function oc(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), _a(e.return, t, n);
}
function Hi(e, t, n, r, l) {
  var o = e.memoizedState;
  o === null
    ? (e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: r,
        tail: n,
        tailMode: l,
      })
    : ((o.isBackwards = t),
      (o.rendering = null),
      (o.renderingStartTime = 0),
      (o.last = r),
      (o.tail = n),
      (o.tailMode = l));
}
function Td(e, t, n) {
  var r = t.pendingProps,
    l = r.revealOrder,
    o = r.tail;
  if ((je(e, t, r.children, n), (r = pe.current), r & 2))
    (r = (r & 1) | 2), (t.flags |= 128);
  else {
    if (e !== null && e.flags & 128)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && oc(e, n, t);
        else if (e.tag === 19) oc(e, n, t);
        else if (e.child !== null) {
          (e.child.return = e), (e = e.child);
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) break e;
          e = e.return;
        }
        (e.sibling.return = e.return), (e = e.sibling);
      }
    r &= 1;
  }
  if ((le(pe, r), !(t.mode & 1))) t.memoizedState = null;
  else
    switch (l) {
      case "forwards":
        for (n = t.child, l = null; n !== null; )
          (e = n.alternate),
            e !== null && Uo(e) === null && (l = n),
            (n = n.sibling);
        (n = l),
          n === null
            ? ((l = t.child), (t.child = null))
            : ((l = n.sibling), (n.sibling = null)),
          Hi(t, !1, l, n, o);
        break;
      case "backwards":
        for (n = null, l = t.child, t.child = null; l !== null; ) {
          if (((e = l.alternate), e !== null && Uo(e) === null)) {
            t.child = l;
            break;
          }
          (e = l.sibling), (l.sibling = n), (n = l), (l = e);
        }
        Hi(t, !0, n, null, o);
        break;
      case "together":
        Hi(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
  return t.child;
}
function mo(e, t) {
  !(t.mode & 1) &&
    e !== null &&
    ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
}
function Wt(e, t, n) {
  if (
    (e !== null && (t.dependencies = e.dependencies),
    (Un |= t.lanes),
    !(n & t.childLanes))
  )
    return null;
  if (e !== null && t.child !== e.child) throw Error(R(153));
  if (t.child !== null) {
    for (
      e = t.child, n = hn(e, e.pendingProps), t.child = n, n.return = t;
      e.sibling !== null;

    )
      (e = e.sibling), (n = n.sibling = hn(e, e.pendingProps)), (n.return = t);
    n.sibling = null;
  }
  return t.child;
}
function bm(e, t, n) {
  switch (t.tag) {
    case 3:
      Rd(t), yr();
      break;
    case 5:
      td(t);
      break;
    case 1:
      Ke(t.type) && No(t);
      break;
    case 4:
      wu(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context,
        l = t.memoizedProps.value;
      le(Fo, r._currentValue), (r._currentValue = l);
      break;
    case 13:
      if (((r = t.memoizedState), r !== null))
        return r.dehydrated !== null
          ? (le(pe, pe.current & 1), (t.flags |= 128), null)
          : n & t.child.childLanes
          ? Ld(e, t, n)
          : (le(pe, pe.current & 1),
            (e = Wt(e, t, n)),
            e !== null ? e.sibling : null);
      le(pe, pe.current & 1);
      break;
    case 19:
      if (((r = (n & t.childLanes) !== 0), e.flags & 128)) {
        if (r) return Td(e, t, n);
        t.flags |= 128;
      }
      if (
        ((l = t.memoizedState),
        l !== null &&
          ((l.rendering = null), (l.tail = null), (l.lastEffect = null)),
        le(pe, pe.current),
        r)
      )
        break;
      return null;
    case 22:
    case 23:
      return (t.lanes = 0), _d(e, t, n);
  }
  return Wt(e, t, n);
}
var Dd, za, Nd, Md;
Dd = function (e, t) {
  for (var n = t.child; n !== null; ) {
    if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
    else if (n.tag !== 4 && n.child !== null) {
      (n.child.return = n), (n = n.child);
      continue;
    }
    if (n === t) break;
    for (; n.sibling === null; ) {
      if (n.return === null || n.return === t) return;
      n = n.return;
    }
    (n.sibling.return = n.return), (n = n.sibling);
  }
};
za = function () {};
Nd = function (e, t, n, r) {
  var l = e.memoizedProps;
  if (l !== r) {
    (e = t.stateNode), Tn(Mt.current);
    var o = null;
    switch (n) {
      case "input":
        (l = ta(e, l)), (r = ta(e, r)), (o = []);
        break;
      case "select":
        (l = me({}, l, { value: void 0 })),
          (r = me({}, r, { value: void 0 })),
          (o = []);
        break;
      case "textarea":
        (l = la(e, l)), (r = la(e, r)), (o = []);
        break;
      default:
        typeof l.onClick != "function" &&
          typeof r.onClick == "function" &&
          (e.onclick = To);
    }
    ia(n, r);
    var i;
    n = null;
    for (s in l)
      if (!r.hasOwnProperty(s) && l.hasOwnProperty(s) && l[s] != null)
        if (s === "style") {
          var a = l[s];
          for (i in a) a.hasOwnProperty(i) && (n || (n = {}), (n[i] = ""));
        } else
          s !== "dangerouslySetInnerHTML" &&
            s !== "children" &&
            s !== "suppressContentEditableWarning" &&
            s !== "suppressHydrationWarning" &&
            s !== "autoFocus" &&
            (ll.hasOwnProperty(s)
              ? o || (o = [])
              : (o = o || []).push(s, null));
    for (s in r) {
      var u = r[s];
      if (
        ((a = l != null ? l[s] : void 0),
        r.hasOwnProperty(s) && u !== a && (u != null || a != null))
      )
        if (s === "style")
          if (a) {
            for (i in a)
              !a.hasOwnProperty(i) ||
                (u && u.hasOwnProperty(i)) ||
                (n || (n = {}), (n[i] = ""));
            for (i in u)
              u.hasOwnProperty(i) &&
                a[i] !== u[i] &&
                (n || (n = {}), (n[i] = u[i]));
          } else n || (o || (o = []), o.push(s, n)), (n = u);
        else
          s === "dangerouslySetInnerHTML"
            ? ((u = u ? u.__html : void 0),
              (a = a ? a.__html : void 0),
              u != null && a !== u && (o = o || []).push(s, u))
            : s === "children"
            ? (typeof u != "string" && typeof u != "number") ||
              (o = o || []).push(s, "" + u)
            : s !== "suppressContentEditableWarning" &&
              s !== "suppressHydrationWarning" &&
              (ll.hasOwnProperty(s)
                ? (u != null && s === "onScroll" && ie("scroll", e),
                  o || a === u || (o = []))
                : (o = o || []).push(s, u));
    }
    n && (o = o || []).push("style", n);
    var s = o;
    (t.updateQueue = s) && (t.flags |= 4);
  }
};
Md = function (e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function Br(e, t) {
  if (!de)
    switch (e.tailMode) {
      case "hidden":
        t = e.tail;
        for (var n = null; t !== null; )
          t.alternate !== null && (n = t), (t = t.sibling);
        n === null ? (e.tail = null) : (n.sibling = null);
        break;
      case "collapsed":
        n = e.tail;
        for (var r = null; n !== null; )
          n.alternate !== null && (r = n), (n = n.sibling);
        r === null
          ? t || e.tail === null
            ? (e.tail = null)
            : (e.tail.sibling = null)
          : (r.sibling = null);
    }
}
function Me(e) {
  var t = e.alternate !== null && e.alternate.child === e.child,
    n = 0,
    r = 0;
  if (t)
    for (var l = e.child; l !== null; )
      (n |= l.lanes | l.childLanes),
        (r |= l.subtreeFlags & 14680064),
        (r |= l.flags & 14680064),
        (l.return = e),
        (l = l.sibling);
  else
    for (l = e.child; l !== null; )
      (n |= l.lanes | l.childLanes),
        (r |= l.subtreeFlags),
        (r |= l.flags),
        (l.return = e),
        (l = l.sibling);
  return (e.subtreeFlags |= r), (e.childLanes = n), t;
}
function ev(e, t, n) {
  var r = t.pendingProps;
  switch ((du(t), t.tag)) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return Me(t), null;
    case 1:
      return Ke(t.type) && Do(), Me(t), null;
    case 3:
      return (
        (r = t.stateNode),
        wr(),
        ue(We),
        ue(Fe),
        Eu(),
        r.pendingContext &&
          ((r.context = r.pendingContext), (r.pendingContext = null)),
        (e === null || e.child === null) &&
          (ql(t)
            ? (t.flags |= 4)
            : e === null ||
              (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
              ((t.flags |= 1024), wt !== null && ($a(wt), (wt = null)))),
        za(e, t),
        Me(t),
        null
      );
    case 5:
      Su(t);
      var l = Tn(vl.current);
      if (((n = t.type), e !== null && t.stateNode != null))
        Nd(e, t, n, r, l),
          e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152));
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(R(166));
          return Me(t), null;
        }
        if (((e = Tn(Mt.current)), ql(t))) {
          (r = t.stateNode), (n = t.type);
          var o = t.memoizedProps;
          switch (((r[Dt] = t), (r[hl] = o), (e = (t.mode & 1) !== 0), n)) {
            case "dialog":
              ie("cancel", r), ie("close", r);
              break;
            case "iframe":
            case "object":
            case "embed":
              ie("load", r);
              break;
            case "video":
            case "audio":
              for (l = 0; l < Yr.length; l++) ie(Yr[l], r);
              break;
            case "source":
              ie("error", r);
              break;
            case "img":
            case "image":
            case "link":
              ie("error", r), ie("load", r);
              break;
            case "details":
              ie("toggle", r);
              break;
            case "input":
              hs(r, o), ie("invalid", r);
              break;
            case "select":
              (r._wrapperState = { wasMultiple: !!o.multiple }),
                ie("invalid", r);
              break;
            case "textarea":
              vs(r, o), ie("invalid", r);
          }
          ia(n, o), (l = null);
          for (var i in o)
            if (o.hasOwnProperty(i)) {
              var a = o[i];
              i === "children"
                ? typeof a == "string"
                  ? r.textContent !== a &&
                    (o.suppressHydrationWarning !== !0 &&
                      Zl(r.textContent, a, e),
                    (l = ["children", a]))
                  : typeof a == "number" &&
                    r.textContent !== "" + a &&
                    (o.suppressHydrationWarning !== !0 &&
                      Zl(r.textContent, a, e),
                    (l = ["children", "" + a]))
                : ll.hasOwnProperty(i) &&
                  a != null &&
                  i === "onScroll" &&
                  ie("scroll", r);
            }
          switch (n) {
            case "input":
              Vl(r), ms(r, o, !0);
              break;
            case "textarea":
              Vl(r), ys(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof o.onClick == "function" && (r.onclick = To);
          }
          (r = l), (t.updateQueue = r), r !== null && (t.flags |= 4);
        } else {
          (i = l.nodeType === 9 ? l : l.ownerDocument),
            e === "http://www.w3.org/1999/xhtml" && (e = of(n)),
            e === "http://www.w3.org/1999/xhtml"
              ? n === "script"
                ? ((e = i.createElement("div")),
                  (e.innerHTML = "<script></script>"),
                  (e = e.removeChild(e.firstChild)))
                : typeof r.is == "string"
                ? (e = i.createElement(n, { is: r.is }))
                : ((e = i.createElement(n)),
                  n === "select" &&
                    ((i = e),
                    r.multiple
                      ? (i.multiple = !0)
                      : r.size && (i.size = r.size)))
              : (e = i.createElementNS(e, n)),
            (e[Dt] = t),
            (e[hl] = r),
            Dd(e, t, !1, !1),
            (t.stateNode = e);
          e: {
            switch (((i = aa(n, r)), n)) {
              case "dialog":
                ie("cancel", e), ie("close", e), (l = r);
                break;
              case "iframe":
              case "object":
              case "embed":
                ie("load", e), (l = r);
                break;
              case "video":
              case "audio":
                for (l = 0; l < Yr.length; l++) ie(Yr[l], e);
                l = r;
                break;
              case "source":
                ie("error", e), (l = r);
                break;
              case "img":
              case "image":
              case "link":
                ie("error", e), ie("load", e), (l = r);
                break;
              case "details":
                ie("toggle", e), (l = r);
                break;
              case "input":
                hs(e, r), (l = ta(e, r)), ie("invalid", e);
                break;
              case "option":
                l = r;
                break;
              case "select":
                (e._wrapperState = { wasMultiple: !!r.multiple }),
                  (l = me({}, r, { value: void 0 })),
                  ie("invalid", e);
                break;
              case "textarea":
                vs(e, r), (l = la(e, r)), ie("invalid", e);
                break;
              default:
                l = r;
            }
            ia(n, l), (a = l);
            for (o in a)
              if (a.hasOwnProperty(o)) {
                var u = a[o];
                o === "style"
                  ? sf(e, u)
                  : o === "dangerouslySetInnerHTML"
                  ? ((u = u ? u.__html : void 0), u != null && af(e, u))
                  : o === "children"
                  ? typeof u == "string"
                    ? (n !== "textarea" || u !== "") && ol(e, u)
                    : typeof u == "number" && ol(e, "" + u)
                  : o !== "suppressContentEditableWarning" &&
                    o !== "suppressHydrationWarning" &&
                    o !== "autoFocus" &&
                    (ll.hasOwnProperty(o)
                      ? u != null && o === "onScroll" && ie("scroll", e)
                      : u != null && Za(e, o, u, i));
              }
            switch (n) {
              case "input":
                Vl(e), ms(e, r, !1);
                break;
              case "textarea":
                Vl(e), ys(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + mn(r.value));
                break;
              case "select":
                (e.multiple = !!r.multiple),
                  (o = r.value),
                  o != null
                    ? sr(e, !!r.multiple, o, !1)
                    : r.defaultValue != null &&
                      sr(e, !!r.multiple, r.defaultValue, !0);
                break;
              default:
                typeof l.onClick == "function" && (e.onclick = To);
            }
            switch (n) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                r = !!r.autoFocus;
                break e;
              case "img":
                r = !0;
                break e;
              default:
                r = !1;
            }
          }
          r && (t.flags |= 4);
        }
        t.ref !== null && ((t.flags |= 512), (t.flags |= 2097152));
      }
      return Me(t), null;
    case 6:
      if (e && t.stateNode != null) Md(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(R(166));
        if (((n = Tn(vl.current)), Tn(Mt.current), ql(t))) {
          if (
            ((r = t.stateNode),
            (n = t.memoizedProps),
            (r[Dt] = t),
            (o = r.nodeValue !== n) && ((e = et), e !== null))
          )
            switch (e.tag) {
              case 3:
                Zl(r.nodeValue, n, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 &&
                  Zl(r.nodeValue, n, (e.mode & 1) !== 0);
            }
          o && (t.flags |= 4);
        } else
          (r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r)),
            (r[Dt] = t),
            (t.stateNode = r);
      }
      return Me(t), null;
    case 13:
      if (
        (ue(pe),
        (r = t.memoizedState),
        e === null ||
          (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
      ) {
        if (de && be !== null && t.mode & 1 && !(t.flags & 128))
          Jf(), yr(), (t.flags |= 98560), (o = !1);
        else if (((o = ql(t)), r !== null && r.dehydrated !== null)) {
          if (e === null) {
            if (!o) throw Error(R(318));
            if (
              ((o = t.memoizedState),
              (o = o !== null ? o.dehydrated : null),
              !o)
            )
              throw Error(R(317));
            o[Dt] = t;
          } else
            yr(), !(t.flags & 128) && (t.memoizedState = null), (t.flags |= 4);
          Me(t), (o = !1);
        } else wt !== null && ($a(wt), (wt = null)), (o = !0);
        if (!o) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128
        ? ((t.lanes = n), t)
        : ((r = r !== null),
          r !== (e !== null && e.memoizedState !== null) &&
            r &&
            ((t.child.flags |= 8192),
            t.mode & 1 &&
              (e === null || pe.current & 1 ? ke === 0 && (ke = 3) : zu())),
          t.updateQueue !== null && (t.flags |= 4),
          Me(t),
          null);
    case 4:
      return (
        wr(), za(e, t), e === null && dl(t.stateNode.containerInfo), Me(t), null
      );
    case 10:
      return vu(t.type._context), Me(t), null;
    case 17:
      return Ke(t.type) && Do(), Me(t), null;
    case 19:
      if ((ue(pe), (o = t.memoizedState), o === null)) return Me(t), null;
      if (((r = (t.flags & 128) !== 0), (i = o.rendering), i === null))
        if (r) Br(o, !1);
        else {
          if (ke !== 0 || (e !== null && e.flags & 128))
            for (e = t.child; e !== null; ) {
              if (((i = Uo(e)), i !== null)) {
                for (
                  t.flags |= 128,
                    Br(o, !1),
                    r = i.updateQueue,
                    r !== null && ((t.updateQueue = r), (t.flags |= 4)),
                    t.subtreeFlags = 0,
                    r = n,
                    n = t.child;
                  n !== null;

                )
                  (o = n),
                    (e = r),
                    (o.flags &= 14680066),
                    (i = o.alternate),
                    i === null
                      ? ((o.childLanes = 0),
                        (o.lanes = e),
                        (o.child = null),
                        (o.subtreeFlags = 0),
                        (o.memoizedProps = null),
                        (o.memoizedState = null),
                        (o.updateQueue = null),
                        (o.dependencies = null),
                        (o.stateNode = null))
                      : ((o.childLanes = i.childLanes),
                        (o.lanes = i.lanes),
                        (o.child = i.child),
                        (o.subtreeFlags = 0),
                        (o.deletions = null),
                        (o.memoizedProps = i.memoizedProps),
                        (o.memoizedState = i.memoizedState),
                        (o.updateQueue = i.updateQueue),
                        (o.type = i.type),
                        (e = i.dependencies),
                        (o.dependencies =
                          e === null
                            ? null
                            : {
                                lanes: e.lanes,
                                firstContext: e.firstContext,
                              })),
                    (n = n.sibling);
                return le(pe, (pe.current & 1) | 2), t.child;
              }
              e = e.sibling;
            }
          o.tail !== null &&
            ge() > Er &&
            ((t.flags |= 128), (r = !0), Br(o, !1), (t.lanes = 4194304));
        }
      else {
        if (!r)
          if (((e = Uo(i)), e !== null)) {
            if (
              ((t.flags |= 128),
              (r = !0),
              (n = e.updateQueue),
              n !== null && ((t.updateQueue = n), (t.flags |= 4)),
              Br(o, !0),
              o.tail === null && o.tailMode === "hidden" && !i.alternate && !de)
            )
              return Me(t), null;
          } else
            2 * ge() - o.renderingStartTime > Er &&
              n !== 1073741824 &&
              ((t.flags |= 128), (r = !0), Br(o, !1), (t.lanes = 4194304));
        o.isBackwards
          ? ((i.sibling = t.child), (t.child = i))
          : ((n = o.last),
            n !== null ? (n.sibling = i) : (t.child = i),
            (o.last = i));
      }
      return o.tail !== null
        ? ((t = o.tail),
          (o.rendering = t),
          (o.tail = t.sibling),
          (o.renderingStartTime = ge()),
          (t.sibling = null),
          (n = pe.current),
          le(pe, r ? (n & 1) | 2 : n & 1),
          t)
        : (Me(t), null);
    case 22:
    case 23:
      return (
        Mu(),
        (r = t.memoizedState !== null),
        e !== null && (e.memoizedState !== null) !== r && (t.flags |= 8192),
        r && t.mode & 1
          ? Ze & 1073741824 && (Me(t), t.subtreeFlags & 6 && (t.flags |= 8192))
          : Me(t),
        null
      );
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(R(156, t.tag));
}
function tv(e, t) {
  switch ((du(t), t.tag)) {
    case 1:
      return (
        Ke(t.type) && Do(),
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 3:
      return (
        wr(),
        ue(We),
        ue(Fe),
        Eu(),
        (e = t.flags),
        e & 65536 && !(e & 128) ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 5:
      return Su(t), null;
    case 13:
      if (
        (ue(pe), (e = t.memoizedState), e !== null && e.dehydrated !== null)
      ) {
        if (t.alternate === null) throw Error(R(340));
        yr();
      }
      return (
        (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 19:
      return ue(pe), null;
    case 4:
      return wr(), null;
    case 10:
      return vu(t.type._context), null;
    case 22:
    case 23:
      return Mu(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var to = !1,
  ze = !1,
  nv = typeof WeakSet == "function" ? WeakSet : Set,
  F = null;
function ir(e, t) {
  var n = e.ref;
  if (n !== null)
    if (typeof n == "function")
      try {
        n(null);
      } catch (r) {
        ye(e, t, r);
      }
    else n.current = null;
}
function Fa(e, t, n) {
  try {
    n();
  } catch (r) {
    ye(e, t, r);
  }
}
var ic = !1;
function rv(e, t) {
  if (((ya = Po), (e = Uf()), cu(e))) {
    if ("selectionStart" in e)
      var n = { start: e.selectionStart, end: e.selectionEnd };
    else
      e: {
        n = ((n = e.ownerDocument) && n.defaultView) || window;
        var r = n.getSelection && n.getSelection();
        if (r && r.rangeCount !== 0) {
          n = r.anchorNode;
          var l = r.anchorOffset,
            o = r.focusNode;
          r = r.focusOffset;
          try {
            n.nodeType, o.nodeType;
          } catch {
            n = null;
            break e;
          }
          var i = 0,
            a = -1,
            u = -1,
            s = 0,
            f = 0,
            c = e,
            p = null;
          t: for (;;) {
            for (
              var S;
              c !== n || (l !== 0 && c.nodeType !== 3) || (a = i + l),
                c !== o || (r !== 0 && c.nodeType !== 3) || (u = i + r),
                c.nodeType === 3 && (i += c.nodeValue.length),
                (S = c.firstChild) !== null;

            )
              (p = c), (c = S);
            for (;;) {
              if (c === e) break t;
              if (
                (p === n && ++s === l && (a = i),
                p === o && ++f === r && (u = i),
                (S = c.nextSibling) !== null)
              )
                break;
              (c = p), (p = c.parentNode);
            }
            c = S;
          }
          n = a === -1 || u === -1 ? null : { start: a, end: u };
        } else n = null;
      }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (ga = { focusedElem: e, selectionRange: n }, Po = !1, F = t; F !== null; )
    if (((t = F), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
      (e.return = t), (F = e);
    else
      for (; F !== null; ) {
        t = F;
        try {
          var E = t.alternate;
          if (t.flags & 1024)
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (E !== null) {
                  var k = E.memoizedProps,
                    P = E.memoizedState,
                    h = t.stateNode,
                    d = h.getSnapshotBeforeUpdate(
                      t.elementType === t.type ? k : vt(t.type, k),
                      P
                    );
                  h.__reactInternalSnapshotBeforeUpdate = d;
                }
                break;
              case 3:
                var m = t.stateNode.containerInfo;
                m.nodeType === 1
                  ? (m.textContent = "")
                  : m.nodeType === 9 &&
                    m.documentElement &&
                    m.removeChild(m.documentElement);
                break;
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw Error(R(163));
            }
        } catch (C) {
          ye(t, t.return, C);
        }
        if (((e = t.sibling), e !== null)) {
          (e.return = t.return), (F = e);
          break;
        }
        F = t.return;
      }
  return (E = ic), (ic = !1), E;
}
function tl(e, t, n) {
  var r = t.updateQueue;
  if (((r = r !== null ? r.lastEffect : null), r !== null)) {
    var l = (r = r.next);
    do {
      if ((l.tag & e) === e) {
        var o = l.destroy;
        (l.destroy = void 0), o !== void 0 && Fa(t, n, o);
      }
      l = l.next;
    } while (l !== r);
  }
}
function ni(e, t) {
  if (
    ((t = t.updateQueue), (t = t !== null ? t.lastEffect : null), t !== null)
  ) {
    var n = (t = t.next);
    do {
      if ((n.tag & e) === e) {
        var r = n.create;
        n.destroy = r();
      }
      n = n.next;
    } while (n !== t);
  }
}
function Oa(e) {
  var t = e.ref;
  if (t !== null) {
    var n = e.stateNode;
    switch (e.tag) {
      case 5:
        e = n;
        break;
      default:
        e = n;
    }
    typeof t == "function" ? t(e) : (t.current = e);
  }
}
function zd(e) {
  var t = e.alternate;
  t !== null && ((e.alternate = null), zd(t)),
    (e.child = null),
    (e.deletions = null),
    (e.sibling = null),
    e.tag === 5 &&
      ((t = e.stateNode),
      t !== null &&
        (delete t[Dt], delete t[hl], delete t[Ea], delete t[Am], delete t[Bm])),
    (e.stateNode = null),
    (e.return = null),
    (e.dependencies = null),
    (e.memoizedProps = null),
    (e.memoizedState = null),
    (e.pendingProps = null),
    (e.stateNode = null),
    (e.updateQueue = null);
}
function Fd(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function ac(e) {
  e: for (;;) {
    for (; e.sibling === null; ) {
      if (e.return === null || Fd(e.return)) return null;
      e = e.return;
    }
    for (
      e.sibling.return = e.return, e = e.sibling;
      e.tag !== 5 && e.tag !== 6 && e.tag !== 18;

    ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      (e.child.return = e), (e = e.child);
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function Ia(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    (e = e.stateNode),
      t
        ? n.nodeType === 8
          ? n.parentNode.insertBefore(e, t)
          : n.insertBefore(e, t)
        : (n.nodeType === 8
            ? ((t = n.parentNode), t.insertBefore(e, n))
            : ((t = n), t.appendChild(e)),
          (n = n._reactRootContainer),
          n != null || t.onclick !== null || (t.onclick = To));
  else if (r !== 4 && ((e = e.child), e !== null))
    for (Ia(e, t, n), e = e.sibling; e !== null; ) Ia(e, t, n), (e = e.sibling);
}
function Ua(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    (e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && ((e = e.child), e !== null))
    for (Ua(e, t, n), e = e.sibling; e !== null; ) Ua(e, t, n), (e = e.sibling);
}
var Le = null,
  yt = !1;
function Zt(e, t, n) {
  for (n = n.child; n !== null; ) Od(e, t, n), (n = n.sibling);
}
function Od(e, t, n) {
  if (Nt && typeof Nt.onCommitFiberUnmount == "function")
    try {
      Nt.onCommitFiberUnmount(Xo, n);
    } catch {}
  switch (n.tag) {
    case 5:
      ze || ir(n, t);
    case 6:
      var r = Le,
        l = yt;
      (Le = null),
        Zt(e, t, n),
        (Le = r),
        (yt = l),
        Le !== null &&
          (yt
            ? ((e = Le),
              (n = n.stateNode),
              e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n))
            : Le.removeChild(n.stateNode));
      break;
    case 18:
      Le !== null &&
        (yt
          ? ((e = Le),
            (n = n.stateNode),
            e.nodeType === 8
              ? Oi(e.parentNode, n)
              : e.nodeType === 1 && Oi(e, n),
            sl(e))
          : Oi(Le, n.stateNode));
      break;
    case 4:
      (r = Le),
        (l = yt),
        (Le = n.stateNode.containerInfo),
        (yt = !0),
        Zt(e, t, n),
        (Le = r),
        (yt = l);
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (
        !ze &&
        ((r = n.updateQueue), r !== null && ((r = r.lastEffect), r !== null))
      ) {
        l = r = r.next;
        do {
          var o = l,
            i = o.destroy;
          (o = o.tag),
            i !== void 0 && (o & 2 || o & 4) && Fa(n, t, i),
            (l = l.next);
        } while (l !== r);
      }
      Zt(e, t, n);
      break;
    case 1:
      if (
        !ze &&
        (ir(n, t),
        (r = n.stateNode),
        typeof r.componentWillUnmount == "function")
      )
        try {
          (r.props = n.memoizedProps),
            (r.state = n.memoizedState),
            r.componentWillUnmount();
        } catch (a) {
          ye(n, t, a);
        }
      Zt(e, t, n);
      break;
    case 21:
      Zt(e, t, n);
      break;
    case 22:
      n.mode & 1
        ? ((ze = (r = ze) || n.memoizedState !== null), Zt(e, t, n), (ze = r))
        : Zt(e, t, n);
      break;
    default:
      Zt(e, t, n);
  }
}
function uc(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new nv()),
      t.forEach(function (r) {
        var l = dv.bind(null, e, r);
        n.has(r) || (n.add(r), r.then(l, l));
      });
  }
}
function mt(e, t) {
  var n = t.deletions;
  if (n !== null)
    for (var r = 0; r < n.length; r++) {
      var l = n[r];
      try {
        var o = e,
          i = t,
          a = i;
        e: for (; a !== null; ) {
          switch (a.tag) {
            case 5:
              (Le = a.stateNode), (yt = !1);
              break e;
            case 3:
              (Le = a.stateNode.containerInfo), (yt = !0);
              break e;
            case 4:
              (Le = a.stateNode.containerInfo), (yt = !0);
              break e;
          }
          a = a.return;
        }
        if (Le === null) throw Error(R(160));
        Od(o, i, l), (Le = null), (yt = !1);
        var u = l.alternate;
        u !== null && (u.return = null), (l.return = null);
      } catch (s) {
        ye(l, t, s);
      }
    }
  if (t.subtreeFlags & 12854)
    for (t = t.child; t !== null; ) Id(t, e), (t = t.sibling);
}
function Id(e, t) {
  var n = e.alternate,
    r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if ((mt(t, e), Lt(e), r & 4)) {
        try {
          tl(3, e, e.return), ni(3, e);
        } catch (k) {
          ye(e, e.return, k);
        }
        try {
          tl(5, e, e.return);
        } catch (k) {
          ye(e, e.return, k);
        }
      }
      break;
    case 1:
      mt(t, e), Lt(e), r & 512 && n !== null && ir(n, n.return);
      break;
    case 5:
      if (
        (mt(t, e),
        Lt(e),
        r & 512 && n !== null && ir(n, n.return),
        e.flags & 32)
      ) {
        var l = e.stateNode;
        try {
          ol(l, "");
        } catch (k) {
          ye(e, e.return, k);
        }
      }
      if (r & 4 && ((l = e.stateNode), l != null)) {
        var o = e.memoizedProps,
          i = n !== null ? n.memoizedProps : o,
          a = e.type,
          u = e.updateQueue;
        if (((e.updateQueue = null), u !== null))
          try {
            a === "input" && o.type === "radio" && o.name != null && rf(l, o),
              aa(a, i);
            var s = aa(a, o);
            for (i = 0; i < u.length; i += 2) {
              var f = u[i],
                c = u[i + 1];
              f === "style"
                ? sf(l, c)
                : f === "dangerouslySetInnerHTML"
                ? af(l, c)
                : f === "children"
                ? ol(l, c)
                : Za(l, f, c, s);
            }
            switch (a) {
              case "input":
                na(l, o);
                break;
              case "textarea":
                lf(l, o);
                break;
              case "select":
                var p = l._wrapperState.wasMultiple;
                l._wrapperState.wasMultiple = !!o.multiple;
                var S = o.value;
                S != null
                  ? sr(l, !!o.multiple, S, !1)
                  : p !== !!o.multiple &&
                    (o.defaultValue != null
                      ? sr(l, !!o.multiple, o.defaultValue, !0)
                      : sr(l, !!o.multiple, o.multiple ? [] : "", !1));
            }
            l[hl] = o;
          } catch (k) {
            ye(e, e.return, k);
          }
      }
      break;
    case 6:
      if ((mt(t, e), Lt(e), r & 4)) {
        if (e.stateNode === null) throw Error(R(162));
        (l = e.stateNode), (o = e.memoizedProps);
        try {
          l.nodeValue = o;
        } catch (k) {
          ye(e, e.return, k);
        }
      }
      break;
    case 3:
      if (
        (mt(t, e), Lt(e), r & 4 && n !== null && n.memoizedState.isDehydrated)
      )
        try {
          sl(t.containerInfo);
        } catch (k) {
          ye(e, e.return, k);
        }
      break;
    case 4:
      mt(t, e), Lt(e);
      break;
    case 13:
      mt(t, e),
        Lt(e),
        (l = e.child),
        l.flags & 8192 &&
          ((o = l.memoizedState !== null),
          (l.stateNode.isHidden = o),
          !o ||
            (l.alternate !== null && l.alternate.memoizedState !== null) ||
            (Du = ge())),
        r & 4 && uc(e);
      break;
    case 22:
      if (
        ((f = n !== null && n.memoizedState !== null),
        e.mode & 1 ? ((ze = (s = ze) || f), mt(t, e), (ze = s)) : mt(t, e),
        Lt(e),
        r & 8192)
      ) {
        if (
          ((s = e.memoizedState !== null),
          (e.stateNode.isHidden = s) && !f && e.mode & 1)
        )
          for (F = e, f = e.child; f !== null; ) {
            for (c = F = f; F !== null; ) {
              switch (((p = F), (S = p.child), p.tag)) {
                case 0:
                case 11:
                case 14:
                case 15:
                  tl(4, p, p.return);
                  break;
                case 1:
                  ir(p, p.return);
                  var E = p.stateNode;
                  if (typeof E.componentWillUnmount == "function") {
                    (r = p), (n = p.return);
                    try {
                      (t = r),
                        (E.props = t.memoizedProps),
                        (E.state = t.memoizedState),
                        E.componentWillUnmount();
                    } catch (k) {
                      ye(r, n, k);
                    }
                  }
                  break;
                case 5:
                  ir(p, p.return);
                  break;
                case 22:
                  if (p.memoizedState !== null) {
                    cc(c);
                    continue;
                  }
              }
              S !== null ? ((S.return = p), (F = S)) : cc(c);
            }
            f = f.sibling;
          }
        e: for (f = null, c = e; ; ) {
          if (c.tag === 5) {
            if (f === null) {
              f = c;
              try {
                (l = c.stateNode),
                  s
                    ? ((o = l.style),
                      typeof o.setProperty == "function"
                        ? o.setProperty("display", "none", "important")
                        : (o.display = "none"))
                    : ((a = c.stateNode),
                      (u = c.memoizedProps.style),
                      (i =
                        u != null && u.hasOwnProperty("display")
                          ? u.display
                          : null),
                      (a.style.display = uf("display", i)));
              } catch (k) {
                ye(e, e.return, k);
              }
            }
          } else if (c.tag === 6) {
            if (f === null)
              try {
                c.stateNode.nodeValue = s ? "" : c.memoizedProps;
              } catch (k) {
                ye(e, e.return, k);
              }
          } else if (
            ((c.tag !== 22 && c.tag !== 23) ||
              c.memoizedState === null ||
              c === e) &&
            c.child !== null
          ) {
            (c.child.return = c), (c = c.child);
            continue;
          }
          if (c === e) break e;
          for (; c.sibling === null; ) {
            if (c.return === null || c.return === e) break e;
            f === c && (f = null), (c = c.return);
          }
          f === c && (f = null), (c.sibling.return = c.return), (c = c.sibling);
        }
      }
      break;
    case 19:
      mt(t, e), Lt(e), r & 4 && uc(e);
      break;
    case 21:
      break;
    default:
      mt(t, e), Lt(e);
  }
}
function Lt(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (Fd(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(R(160));
      }
      switch (r.tag) {
        case 5:
          var l = r.stateNode;
          r.flags & 32 && (ol(l, ""), (r.flags &= -33));
          var o = ac(e);
          Ua(e, o, l);
          break;
        case 3:
        case 4:
          var i = r.stateNode.containerInfo,
            a = ac(e);
          Ia(e, a, i);
          break;
        default:
          throw Error(R(161));
      }
    } catch (u) {
      ye(e, e.return, u);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function lv(e, t, n) {
  (F = e), Ud(e);
}
function Ud(e, t, n) {
  for (var r = (e.mode & 1) !== 0; F !== null; ) {
    var l = F,
      o = l.child;
    if (l.tag === 22 && r) {
      var i = l.memoizedState !== null || to;
      if (!i) {
        var a = l.alternate,
          u = (a !== null && a.memoizedState !== null) || ze;
        a = to;
        var s = ze;
        if (((to = i), (ze = u) && !s))
          for (F = l; F !== null; )
            (i = F),
              (u = i.child),
              i.tag === 22 && i.memoizedState !== null
                ? fc(l)
                : u !== null
                ? ((u.return = i), (F = u))
                : fc(l);
        for (; o !== null; ) (F = o), Ud(o), (o = o.sibling);
        (F = l), (to = a), (ze = s);
      }
      sc(e);
    } else
      l.subtreeFlags & 8772 && o !== null ? ((o.return = l), (F = o)) : sc(e);
  }
}
function sc(e) {
  for (; F !== null; ) {
    var t = F;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772)
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              ze || ni(5, t);
              break;
            case 1:
              var r = t.stateNode;
              if (t.flags & 4 && !ze)
                if (n === null) r.componentDidMount();
                else {
                  var l =
                    t.elementType === t.type
                      ? n.memoizedProps
                      : vt(t.type, n.memoizedProps);
                  r.componentDidUpdate(
                    l,
                    n.memoizedState,
                    r.__reactInternalSnapshotBeforeUpdate
                  );
                }
              var o = t.updateQueue;
              o !== null && Ys(t, o, r);
              break;
            case 3:
              var i = t.updateQueue;
              if (i !== null) {
                if (((n = null), t.child !== null))
                  switch (t.child.tag) {
                    case 5:
                      n = t.child.stateNode;
                      break;
                    case 1:
                      n = t.child.stateNode;
                  }
                Ys(t, i, n);
              }
              break;
            case 5:
              var a = t.stateNode;
              if (n === null && t.flags & 4) {
                n = a;
                var u = t.memoizedProps;
                switch (t.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    u.autoFocus && n.focus();
                    break;
                  case "img":
                    u.src && (n.src = u.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (t.memoizedState === null) {
                var s = t.alternate;
                if (s !== null) {
                  var f = s.memoizedState;
                  if (f !== null) {
                    var c = f.dehydrated;
                    c !== null && sl(c);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(R(163));
          }
        ze || (t.flags & 512 && Oa(t));
      } catch (p) {
        ye(t, t.return, p);
      }
    }
    if (t === e) {
      F = null;
      break;
    }
    if (((n = t.sibling), n !== null)) {
      (n.return = t.return), (F = n);
      break;
    }
    F = t.return;
  }
}
function cc(e) {
  for (; F !== null; ) {
    var t = F;
    if (t === e) {
      F = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      (n.return = t.return), (F = n);
      break;
    }
    F = t.return;
  }
}
function fc(e) {
  for (; F !== null; ) {
    var t = F;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            ni(4, t);
          } catch (u) {
            ye(t, n, u);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var l = t.return;
            try {
              r.componentDidMount();
            } catch (u) {
              ye(t, l, u);
            }
          }
          var o = t.return;
          try {
            Oa(t);
          } catch (u) {
            ye(t, o, u);
          }
          break;
        case 5:
          var i = t.return;
          try {
            Oa(t);
          } catch (u) {
            ye(t, i, u);
          }
      }
    } catch (u) {
      ye(t, t.return, u);
    }
    if (t === e) {
      F = null;
      break;
    }
    var a = t.sibling;
    if (a !== null) {
      (a.return = t.return), (F = a);
      break;
    }
    F = t.return;
  }
}
var ov = Math.ceil,
  Bo = Qt.ReactCurrentDispatcher,
  Lu = Qt.ReactCurrentOwner,
  ct = Qt.ReactCurrentBatchConfig,
  X = 0,
  _e = null,
  Se = null,
  Te = 0,
  Ze = 0,
  ar = Sn(0),
  ke = 0,
  Sl = null,
  Un = 0,
  ri = 0,
  Tu = 0,
  nl = null,
  He = null,
  Du = 0,
  Er = 1 / 0,
  It = null,
  $o = !1,
  ja = null,
  dn = null,
  no = !1,
  on = null,
  Ho = 0,
  rl = 0,
  Aa = null,
  vo = -1,
  yo = 0;
function Ae() {
  return X & 6 ? ge() : vo !== -1 ? vo : (vo = ge());
}
function pn(e) {
  return e.mode & 1
    ? X & 2 && Te !== 0
      ? Te & -Te
      : Hm.transition !== null
      ? (yo === 0 && (yo = Ef()), yo)
      : ((e = q),
        e !== 0 || ((e = window.event), (e = e === void 0 ? 16 : Lf(e.type))),
        e)
    : 1;
}
function Et(e, t, n, r) {
  if (50 < rl) throw ((rl = 0), (Aa = null), Error(R(185)));
  Pl(e, n, r),
    (!(X & 2) || e !== _e) &&
      (e === _e && (!(X & 2) && (ri |= n), ke === 4 && nn(e, Te)),
      Qe(e, r),
      n === 1 && X === 0 && !(t.mode & 1) && ((Er = ge() + 500), bo && En()));
}
function Qe(e, t) {
  var n = e.callbackNode;
  Hh(e, t);
  var r = _o(e, e === _e ? Te : 0);
  if (r === 0)
    n !== null && Ss(n), (e.callbackNode = null), (e.callbackPriority = 0);
  else if (((t = r & -r), e.callbackPriority !== t)) {
    if ((n != null && Ss(n), t === 1))
      e.tag === 0 ? $m(dc.bind(null, e)) : Yf(dc.bind(null, e)),
        Um(function () {
          !(X & 6) && En();
        }),
        (n = null);
    else {
      switch (kf(r)) {
        case 1:
          n = nu;
          break;
        case 4:
          n = wf;
          break;
        case 16:
          n = Co;
          break;
        case 536870912:
          n = Sf;
          break;
        default:
          n = Co;
      }
      n = Kd(n, jd.bind(null, e));
    }
    (e.callbackPriority = t), (e.callbackNode = n);
  }
}
function jd(e, t) {
  if (((vo = -1), (yo = 0), X & 6)) throw Error(R(327));
  var n = e.callbackNode;
  if (hr() && e.callbackNode !== n) return null;
  var r = _o(e, e === _e ? Te : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = Vo(e, r);
  else {
    t = r;
    var l = X;
    X |= 2;
    var o = Bd();
    (_e !== e || Te !== t) && ((It = null), (Er = ge() + 500), Mn(e, t));
    do
      try {
        uv();
        break;
      } catch (a) {
        Ad(e, a);
      }
    while (!0);
    mu(),
      (Bo.current = o),
      (X = l),
      Se !== null ? (t = 0) : ((_e = null), (Te = 0), (t = ke));
  }
  if (t !== 0) {
    if (
      (t === 2 && ((l = da(e)), l !== 0 && ((r = l), (t = Ba(e, l)))), t === 1)
    )
      throw ((n = Sl), Mn(e, 0), nn(e, r), Qe(e, ge()), n);
    if (t === 6) nn(e, r);
    else {
      if (
        ((l = e.current.alternate),
        !(r & 30) &&
          !iv(l) &&
          ((t = Vo(e, r)),
          t === 2 && ((o = da(e)), o !== 0 && ((r = o), (t = Ba(e, o)))),
          t === 1))
      )
        throw ((n = Sl), Mn(e, 0), nn(e, r), Qe(e, ge()), n);
      switch (((e.finishedWork = l), (e.finishedLanes = r), t)) {
        case 0:
        case 1:
          throw Error(R(345));
        case 2:
          Pn(e, He, It);
          break;
        case 3:
          if (
            (nn(e, r), (r & 130023424) === r && ((t = Du + 500 - ge()), 10 < t))
          ) {
            if (_o(e, 0) !== 0) break;
            if (((l = e.suspendedLanes), (l & r) !== r)) {
              Ae(), (e.pingedLanes |= e.suspendedLanes & l);
              break;
            }
            e.timeoutHandle = Sa(Pn.bind(null, e, He, It), t);
            break;
          }
          Pn(e, He, It);
          break;
        case 4:
          if ((nn(e, r), (r & 4194240) === r)) break;
          for (t = e.eventTimes, l = -1; 0 < r; ) {
            var i = 31 - St(r);
            (o = 1 << i), (i = t[i]), i > l && (l = i), (r &= ~o);
          }
          if (
            ((r = l),
            (r = ge() - r),
            (r =
              (120 > r
                ? 120
                : 480 > r
                ? 480
                : 1080 > r
                ? 1080
                : 1920 > r
                ? 1920
                : 3e3 > r
                ? 3e3
                : 4320 > r
                ? 4320
                : 1960 * ov(r / 1960)) - r),
            10 < r)
          ) {
            e.timeoutHandle = Sa(Pn.bind(null, e, He, It), r);
            break;
          }
          Pn(e, He, It);
          break;
        case 5:
          Pn(e, He, It);
          break;
        default:
          throw Error(R(329));
      }
    }
  }
  return Qe(e, ge()), e.callbackNode === n ? jd.bind(null, e) : null;
}
function Ba(e, t) {
  var n = nl;
  return (
    e.current.memoizedState.isDehydrated && (Mn(e, t).flags |= 256),
    (e = Vo(e, t)),
    e !== 2 && ((t = He), (He = n), t !== null && $a(t)),
    e
  );
}
function $a(e) {
  He === null ? (He = e) : He.push.apply(He, e);
}
function iv(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && ((n = n.stores), n !== null))
        for (var r = 0; r < n.length; r++) {
          var l = n[r],
            o = l.getSnapshot;
          l = l.value;
          try {
            if (!kt(o(), l)) return !1;
          } catch {
            return !1;
          }
        }
    }
    if (((n = t.child), t.subtreeFlags & 16384 && n !== null))
      (n.return = t), (t = n);
    else {
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return !0;
        t = t.return;
      }
      (t.sibling.return = t.return), (t = t.sibling);
    }
  }
  return !0;
}
function nn(e, t) {
  for (
    t &= ~Tu,
      t &= ~ri,
      e.suspendedLanes |= t,
      e.pingedLanes &= ~t,
      e = e.expirationTimes;
    0 < t;

  ) {
    var n = 31 - St(t),
      r = 1 << n;
    (e[n] = -1), (t &= ~r);
  }
}
function dc(e) {
  if (X & 6) throw Error(R(327));
  hr();
  var t = _o(e, 0);
  if (!(t & 1)) return Qe(e, ge()), null;
  var n = Vo(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = da(e);
    r !== 0 && ((t = r), (n = Ba(e, r)));
  }
  if (n === 1) throw ((n = Sl), Mn(e, 0), nn(e, t), Qe(e, ge()), n);
  if (n === 6) throw Error(R(345));
  return (
    (e.finishedWork = e.current.alternate),
    (e.finishedLanes = t),
    Pn(e, He, It),
    Qe(e, ge()),
    null
  );
}
function Nu(e, t) {
  var n = X;
  X |= 1;
  try {
    return e(t);
  } finally {
    (X = n), X === 0 && ((Er = ge() + 500), bo && En());
  }
}
function jn(e) {
  on !== null && on.tag === 0 && !(X & 6) && hr();
  var t = X;
  X |= 1;
  var n = ct.transition,
    r = q;
  try {
    if (((ct.transition = null), (q = 1), e)) return e();
  } finally {
    (q = r), (ct.transition = n), (X = t), !(X & 6) && En();
  }
}
function Mu() {
  (Ze = ar.current), ue(ar);
}
function Mn(e, t) {
  (e.finishedWork = null), (e.finishedLanes = 0);
  var n = e.timeoutHandle;
  if ((n !== -1 && ((e.timeoutHandle = -1), Im(n)), Se !== null))
    for (n = Se.return; n !== null; ) {
      var r = n;
      switch ((du(r), r.tag)) {
        case 1:
          (r = r.type.childContextTypes), r != null && Do();
          break;
        case 3:
          wr(), ue(We), ue(Fe), Eu();
          break;
        case 5:
          Su(r);
          break;
        case 4:
          wr();
          break;
        case 13:
          ue(pe);
          break;
        case 19:
          ue(pe);
          break;
        case 10:
          vu(r.type._context);
          break;
        case 22:
        case 23:
          Mu();
      }
      n = n.return;
    }
  if (
    ((_e = e),
    (Se = e = hn(e.current, null)),
    (Te = Ze = t),
    (ke = 0),
    (Sl = null),
    (Tu = ri = Un = 0),
    (He = nl = null),
    Ln !== null)
  ) {
    for (t = 0; t < Ln.length; t++)
      if (((n = Ln[t]), (r = n.interleaved), r !== null)) {
        n.interleaved = null;
        var l = r.next,
          o = n.pending;
        if (o !== null) {
          var i = o.next;
          (o.next = l), (r.next = i);
        }
        n.pending = r;
      }
    Ln = null;
  }
  return e;
}
function Ad(e, t) {
  do {
    var n = Se;
    try {
      if ((mu(), (po.current = Ao), jo)) {
        for (var r = he.memoizedState; r !== null; ) {
          var l = r.queue;
          l !== null && (l.pending = null), (r = r.next);
        }
        jo = !1;
      }
      if (
        ((In = 0),
        (Ce = Ee = he = null),
        (el = !1),
        (yl = 0),
        (Lu.current = null),
        n === null || n.return === null)
      ) {
        (ke = 1), (Sl = t), (Se = null);
        break;
      }
      e: {
        var o = e,
          i = n.return,
          a = n,
          u = t;
        if (
          ((t = Te),
          (a.flags |= 32768),
          u !== null && typeof u == "object" && typeof u.then == "function")
        ) {
          var s = u,
            f = a,
            c = f.tag;
          if (!(f.mode & 1) && (c === 0 || c === 11 || c === 15)) {
            var p = f.alternate;
            p
              ? ((f.updateQueue = p.updateQueue),
                (f.memoizedState = p.memoizedState),
                (f.lanes = p.lanes))
              : ((f.updateQueue = null), (f.memoizedState = null));
          }
          var S = bs(i);
          if (S !== null) {
            (S.flags &= -257),
              ec(S, i, a, o, t),
              S.mode & 1 && qs(o, s, t),
              (t = S),
              (u = s);
            var E = t.updateQueue;
            if (E === null) {
              var k = new Set();
              k.add(u), (t.updateQueue = k);
            } else E.add(u);
            break e;
          } else {
            if (!(t & 1)) {
              qs(o, s, t), zu();
              break e;
            }
            u = Error(R(426));
          }
        } else if (de && a.mode & 1) {
          var P = bs(i);
          if (P !== null) {
            !(P.flags & 65536) && (P.flags |= 256),
              ec(P, i, a, o, t),
              pu(Sr(u, a));
            break e;
          }
        }
        (o = u = Sr(u, a)),
          ke !== 4 && (ke = 2),
          nl === null ? (nl = [o]) : nl.push(o),
          (o = i);
        do {
          switch (o.tag) {
            case 3:
              (o.flags |= 65536), (t &= -t), (o.lanes |= t);
              var h = kd(o, u, t);
              Qs(o, h);
              break e;
            case 1:
              a = u;
              var d = o.type,
                m = o.stateNode;
              if (
                !(o.flags & 128) &&
                (typeof d.getDerivedStateFromError == "function" ||
                  (m !== null &&
                    typeof m.componentDidCatch == "function" &&
                    (dn === null || !dn.has(m))))
              ) {
                (o.flags |= 65536), (t &= -t), (o.lanes |= t);
                var C = xd(o, a, t);
                Qs(o, C);
                break e;
              }
          }
          o = o.return;
        } while (o !== null);
      }
      Hd(n);
    } catch (L) {
      (t = L), Se === n && n !== null && (Se = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function Bd() {
  var e = Bo.current;
  return (Bo.current = Ao), e === null ? Ao : e;
}
function zu() {
  (ke === 0 || ke === 3 || ke === 2) && (ke = 4),
    _e === null || (!(Un & 268435455) && !(ri & 268435455)) || nn(_e, Te);
}
function Vo(e, t) {
  var n = X;
  X |= 2;
  var r = Bd();
  (_e !== e || Te !== t) && ((It = null), Mn(e, t));
  do
    try {
      av();
      break;
    } catch (l) {
      Ad(e, l);
    }
  while (!0);
  if ((mu(), (X = n), (Bo.current = r), Se !== null)) throw Error(R(261));
  return (_e = null), (Te = 0), ke;
}
function av() {
  for (; Se !== null; ) $d(Se);
}
function uv() {
  for (; Se !== null && !zh(); ) $d(Se);
}
function $d(e) {
  var t = Wd(e.alternate, e, Ze);
  (e.memoizedProps = e.pendingProps),
    t === null ? Hd(e) : (Se = t),
    (Lu.current = null);
}
function Hd(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (((e = t.return), t.flags & 32768)) {
      if (((n = tv(n, t)), n !== null)) {
        (n.flags &= 32767), (Se = n);
        return;
      }
      if (e !== null)
        (e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null);
      else {
        (ke = 6), (Se = null);
        return;
      }
    } else if (((n = ev(n, t, Ze)), n !== null)) {
      Se = n;
      return;
    }
    if (((t = t.sibling), t !== null)) {
      Se = t;
      return;
    }
    Se = t = e;
  } while (t !== null);
  ke === 0 && (ke = 5);
}
function Pn(e, t, n) {
  var r = q,
    l = ct.transition;
  try {
    (ct.transition = null), (q = 1), sv(e, t, n, r);
  } finally {
    (ct.transition = l), (q = r);
  }
  return null;
}
function sv(e, t, n, r) {
  do hr();
  while (on !== null);
  if (X & 6) throw Error(R(327));
  n = e.finishedWork;
  var l = e.finishedLanes;
  if (n === null) return null;
  if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current))
    throw Error(R(177));
  (e.callbackNode = null), (e.callbackPriority = 0);
  var o = n.lanes | n.childLanes;
  if (
    (Vh(e, o),
    e === _e && ((Se = _e = null), (Te = 0)),
    (!(n.subtreeFlags & 2064) && !(n.flags & 2064)) ||
      no ||
      ((no = !0),
      Kd(Co, function () {
        return hr(), null;
      })),
    (o = (n.flags & 15990) !== 0),
    n.subtreeFlags & 15990 || o)
  ) {
    (o = ct.transition), (ct.transition = null);
    var i = q;
    q = 1;
    var a = X;
    (X |= 4),
      (Lu.current = null),
      rv(e, n),
      Id(n, e),
      Tm(ga),
      (Po = !!ya),
      (ga = ya = null),
      (e.current = n),
      lv(n),
      Fh(),
      (X = a),
      (q = i),
      (ct.transition = o);
  } else e.current = n;
  if (
    (no && ((no = !1), (on = e), (Ho = l)),
    (o = e.pendingLanes),
    o === 0 && (dn = null),
    Uh(n.stateNode),
    Qe(e, ge()),
    t !== null)
  )
    for (r = e.onRecoverableError, n = 0; n < t.length; n++)
      (l = t[n]), r(l.value, { componentStack: l.stack, digest: l.digest });
  if ($o) throw (($o = !1), (e = ja), (ja = null), e);
  return (
    Ho & 1 && e.tag !== 0 && hr(),
    (o = e.pendingLanes),
    o & 1 ? (e === Aa ? rl++ : ((rl = 0), (Aa = e))) : (rl = 0),
    En(),
    null
  );
}
function hr() {
  if (on !== null) {
    var e = kf(Ho),
      t = ct.transition,
      n = q;
    try {
      if (((ct.transition = null), (q = 16 > e ? 16 : e), on === null))
        var r = !1;
      else {
        if (((e = on), (on = null), (Ho = 0), X & 6)) throw Error(R(331));
        var l = X;
        for (X |= 4, F = e.current; F !== null; ) {
          var o = F,
            i = o.child;
          if (F.flags & 16) {
            var a = o.deletions;
            if (a !== null) {
              for (var u = 0; u < a.length; u++) {
                var s = a[u];
                for (F = s; F !== null; ) {
                  var f = F;
                  switch (f.tag) {
                    case 0:
                    case 11:
                    case 15:
                      tl(8, f, o);
                  }
                  var c = f.child;
                  if (c !== null) (c.return = f), (F = c);
                  else
                    for (; F !== null; ) {
                      f = F;
                      var p = f.sibling,
                        S = f.return;
                      if ((zd(f), f === s)) {
                        F = null;
                        break;
                      }
                      if (p !== null) {
                        (p.return = S), (F = p);
                        break;
                      }
                      F = S;
                    }
                }
              }
              var E = o.alternate;
              if (E !== null) {
                var k = E.child;
                if (k !== null) {
                  E.child = null;
                  do {
                    var P = k.sibling;
                    (k.sibling = null), (k = P);
                  } while (k !== null);
                }
              }
              F = o;
            }
          }
          if (o.subtreeFlags & 2064 && i !== null) (i.return = o), (F = i);
          else
            e: for (; F !== null; ) {
              if (((o = F), o.flags & 2048))
                switch (o.tag) {
                  case 0:
                  case 11:
                  case 15:
                    tl(9, o, o.return);
                }
              var h = o.sibling;
              if (h !== null) {
                (h.return = o.return), (F = h);
                break e;
              }
              F = o.return;
            }
        }
        var d = e.current;
        for (F = d; F !== null; ) {
          i = F;
          var m = i.child;
          if (i.subtreeFlags & 2064 && m !== null) (m.return = i), (F = m);
          else
            e: for (i = d; F !== null; ) {
              if (((a = F), a.flags & 2048))
                try {
                  switch (a.tag) {
                    case 0:
                    case 11:
                    case 15:
                      ni(9, a);
                  }
                } catch (L) {
                  ye(a, a.return, L);
                }
              if (a === i) {
                F = null;
                break e;
              }
              var C = a.sibling;
              if (C !== null) {
                (C.return = a.return), (F = C);
                break e;
              }
              F = a.return;
            }
        }
        if (
          ((X = l), En(), Nt && typeof Nt.onPostCommitFiberRoot == "function")
        )
          try {
            Nt.onPostCommitFiberRoot(Xo, e);
          } catch {}
        r = !0;
      }
      return r;
    } finally {
      (q = n), (ct.transition = t);
    }
  }
  return !1;
}
function pc(e, t, n) {
  (t = Sr(n, t)),
    (t = kd(e, t, 1)),
    (e = fn(e, t, 1)),
    (t = Ae()),
    e !== null && (Pl(e, 1, t), Qe(e, t));
}
function ye(e, t, n) {
  if (e.tag === 3) pc(e, e, n);
  else
    for (; t !== null; ) {
      if (t.tag === 3) {
        pc(t, e, n);
        break;
      } else if (t.tag === 1) {
        var r = t.stateNode;
        if (
          typeof t.type.getDerivedStateFromError == "function" ||
          (typeof r.componentDidCatch == "function" &&
            (dn === null || !dn.has(r)))
        ) {
          (e = Sr(n, e)),
            (e = xd(t, e, 1)),
            (t = fn(t, e, 1)),
            (e = Ae()),
            t !== null && (Pl(t, 1, e), Qe(t, e));
          break;
        }
      }
      t = t.return;
    }
}
function cv(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t),
    (t = Ae()),
    (e.pingedLanes |= e.suspendedLanes & n),
    _e === e &&
      (Te & n) === n &&
      (ke === 4 || (ke === 3 && (Te & 130023424) === Te && 500 > ge() - Du)
        ? Mn(e, 0)
        : (Tu |= n)),
    Qe(e, t);
}
function Vd(e, t) {
  t === 0 &&
    (e.mode & 1
      ? ((t = Ql), (Ql <<= 1), !(Ql & 130023424) && (Ql = 4194304))
      : (t = 1));
  var n = Ae();
  (e = Vt(e, t)), e !== null && (Pl(e, t, n), Qe(e, n));
}
function fv(e) {
  var t = e.memoizedState,
    n = 0;
  t !== null && (n = t.retryLane), Vd(e, n);
}
function dv(e, t) {
  var n = 0;
  switch (e.tag) {
    case 13:
      var r = e.stateNode,
        l = e.memoizedState;
      l !== null && (n = l.retryLane);
      break;
    case 19:
      r = e.stateNode;
      break;
    default:
      throw Error(R(314));
  }
  r !== null && r.delete(t), Vd(e, n);
}
var Wd;
Wd = function (e, t, n) {
  if (e !== null)
    if (e.memoizedProps !== t.pendingProps || We.current) Ve = !0;
    else {
      if (!(e.lanes & n) && !(t.flags & 128)) return (Ve = !1), bm(e, t, n);
      Ve = !!(e.flags & 131072);
    }
  else (Ve = !1), de && t.flags & 1048576 && Xf(t, zo, t.index);
  switch (((t.lanes = 0), t.tag)) {
    case 2:
      var r = t.type;
      mo(e, t), (e = t.pendingProps);
      var l = vr(t, Fe.current);
      pr(t, n), (l = xu(null, t, r, e, l, n));
      var o = Cu();
      return (
        (t.flags |= 1),
        typeof l == "object" &&
        l !== null &&
        typeof l.render == "function" &&
        l.$$typeof === void 0
          ? ((t.tag = 1),
            (t.memoizedState = null),
            (t.updateQueue = null),
            Ke(r) ? ((o = !0), No(t)) : (o = !1),
            (t.memoizedState =
              l.state !== null && l.state !== void 0 ? l.state : null),
            gu(t),
            (l.updater = ti),
            (t.stateNode = l),
            (l._reactInternals = t),
            Ra(t, r, e, n),
            (t = Da(null, t, r, !0, o, n)))
          : ((t.tag = 0), de && o && fu(t), je(null, t, l, n), (t = t.child)),
        t
      );
    case 16:
      r = t.elementType;
      e: {
        switch (
          (mo(e, t),
          (e = t.pendingProps),
          (l = r._init),
          (r = l(r._payload)),
          (t.type = r),
          (l = t.tag = hv(r)),
          (e = vt(r, e)),
          l)
        ) {
          case 0:
            t = Ta(null, t, r, e, n);
            break e;
          case 1:
            t = rc(null, t, r, e, n);
            break e;
          case 11:
            t = tc(null, t, r, e, n);
            break e;
          case 14:
            t = nc(null, t, r, vt(r.type, e), n);
            break e;
        }
        throw Error(R(306, r, ""));
      }
      return t;
    case 0:
      return (
        (r = t.type),
        (l = t.pendingProps),
        (l = t.elementType === r ? l : vt(r, l)),
        Ta(e, t, r, l, n)
      );
    case 1:
      return (
        (r = t.type),
        (l = t.pendingProps),
        (l = t.elementType === r ? l : vt(r, l)),
        rc(e, t, r, l, n)
      );
    case 3:
      e: {
        if ((Rd(t), e === null)) throw Error(R(387));
        (r = t.pendingProps),
          (o = t.memoizedState),
          (l = o.element),
          ed(e, t),
          Io(t, r, null, n);
        var i = t.memoizedState;
        if (((r = i.element), o.isDehydrated))
          if (
            ((o = {
              element: r,
              isDehydrated: !1,
              cache: i.cache,
              pendingSuspenseBoundaries: i.pendingSuspenseBoundaries,
              transitions: i.transitions,
            }),
            (t.updateQueue.baseState = o),
            (t.memoizedState = o),
            t.flags & 256)
          ) {
            (l = Sr(Error(R(423)), t)), (t = lc(e, t, r, n, l));
            break e;
          } else if (r !== l) {
            (l = Sr(Error(R(424)), t)), (t = lc(e, t, r, n, l));
            break e;
          } else
            for (
              be = cn(t.stateNode.containerInfo.firstChild),
                et = t,
                de = !0,
                wt = null,
                n = qf(t, null, r, n),
                t.child = n;
              n;

            )
              (n.flags = (n.flags & -3) | 4096), (n = n.sibling);
        else {
          if ((yr(), r === l)) {
            t = Wt(e, t, n);
            break e;
          }
          je(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return (
        td(t),
        e === null && Ca(t),
        (r = t.type),
        (l = t.pendingProps),
        (o = e !== null ? e.memoizedProps : null),
        (i = l.children),
        wa(r, l) ? (i = null) : o !== null && wa(r, o) && (t.flags |= 32),
        Pd(e, t),
        je(e, t, i, n),
        t.child
      );
    case 6:
      return e === null && Ca(t), null;
    case 13:
      return Ld(e, t, n);
    case 4:
      return (
        wu(t, t.stateNode.containerInfo),
        (r = t.pendingProps),
        e === null ? (t.child = gr(t, null, r, n)) : je(e, t, r, n),
        t.child
      );
    case 11:
      return (
        (r = t.type),
        (l = t.pendingProps),
        (l = t.elementType === r ? l : vt(r, l)),
        tc(e, t, r, l, n)
      );
    case 7:
      return je(e, t, t.pendingProps, n), t.child;
    case 8:
      return je(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return je(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (
          ((r = t.type._context),
          (l = t.pendingProps),
          (o = t.memoizedProps),
          (i = l.value),
          le(Fo, r._currentValue),
          (r._currentValue = i),
          o !== null)
        )
          if (kt(o.value, i)) {
            if (o.children === l.children && !We.current) {
              t = Wt(e, t, n);
              break e;
            }
          } else
            for (o = t.child, o !== null && (o.return = t); o !== null; ) {
              var a = o.dependencies;
              if (a !== null) {
                i = o.child;
                for (var u = a.firstContext; u !== null; ) {
                  if (u.context === r) {
                    if (o.tag === 1) {
                      (u = Bt(-1, n & -n)), (u.tag = 2);
                      var s = o.updateQueue;
                      if (s !== null) {
                        s = s.shared;
                        var f = s.pending;
                        f === null
                          ? (u.next = u)
                          : ((u.next = f.next), (f.next = u)),
                          (s.pending = u);
                      }
                    }
                    (o.lanes |= n),
                      (u = o.alternate),
                      u !== null && (u.lanes |= n),
                      _a(o.return, n, t),
                      (a.lanes |= n);
                    break;
                  }
                  u = u.next;
                }
              } else if (o.tag === 10) i = o.type === t.type ? null : o.child;
              else if (o.tag === 18) {
                if (((i = o.return), i === null)) throw Error(R(341));
                (i.lanes |= n),
                  (a = i.alternate),
                  a !== null && (a.lanes |= n),
                  _a(i, n, t),
                  (i = o.sibling);
              } else i = o.child;
              if (i !== null) i.return = o;
              else
                for (i = o; i !== null; ) {
                  if (i === t) {
                    i = null;
                    break;
                  }
                  if (((o = i.sibling), o !== null)) {
                    (o.return = i.return), (i = o);
                    break;
                  }
                  i = i.return;
                }
              o = i;
            }
        je(e, t, l.children, n), (t = t.child);
      }
      return t;
    case 9:
      return (
        (l = t.type),
        (r = t.pendingProps.children),
        pr(t, n),
        (l = ft(l)),
        (r = r(l)),
        (t.flags |= 1),
        je(e, t, r, n),
        t.child
      );
    case 14:
      return (
        (r = t.type),
        (l = vt(r, t.pendingProps)),
        (l = vt(r.type, l)),
        nc(e, t, r, l, n)
      );
    case 15:
      return Cd(e, t, t.type, t.pendingProps, n);
    case 17:
      return (
        (r = t.type),
        (l = t.pendingProps),
        (l = t.elementType === r ? l : vt(r, l)),
        mo(e, t),
        (t.tag = 1),
        Ke(r) ? ((e = !0), No(t)) : (e = !1),
        pr(t, n),
        Ed(t, r, l),
        Ra(t, r, l, n),
        Da(null, t, r, !0, e, n)
      );
    case 19:
      return Td(e, t, n);
    case 22:
      return _d(e, t, n);
  }
  throw Error(R(156, t.tag));
};
function Kd(e, t) {
  return gf(e, t);
}
function pv(e, t, n, r) {
  (this.tag = e),
    (this.key = n),
    (this.sibling =
      this.child =
      this.return =
      this.stateNode =
      this.type =
      this.elementType =
        null),
    (this.index = 0),
    (this.ref = null),
    (this.pendingProps = t),
    (this.dependencies =
      this.memoizedState =
      this.updateQueue =
      this.memoizedProps =
        null),
    (this.mode = r),
    (this.subtreeFlags = this.flags = 0),
    (this.deletions = null),
    (this.childLanes = this.lanes = 0),
    (this.alternate = null);
}
function st(e, t, n, r) {
  return new pv(e, t, n, r);
}
function Fu(e) {
  return (e = e.prototype), !(!e || !e.isReactComponent);
}
function hv(e) {
  if (typeof e == "function") return Fu(e) ? 1 : 0;
  if (e != null) {
    if (((e = e.$$typeof), e === ba)) return 11;
    if (e === eu) return 14;
  }
  return 2;
}
function hn(e, t) {
  var n = e.alternate;
  return (
    n === null
      ? ((n = st(e.tag, t, e.key, e.mode)),
        (n.elementType = e.elementType),
        (n.type = e.type),
        (n.stateNode = e.stateNode),
        (n.alternate = e),
        (e.alternate = n))
      : ((n.pendingProps = t),
        (n.type = e.type),
        (n.flags = 0),
        (n.subtreeFlags = 0),
        (n.deletions = null)),
    (n.flags = e.flags & 14680064),
    (n.childLanes = e.childLanes),
    (n.lanes = e.lanes),
    (n.child = e.child),
    (n.memoizedProps = e.memoizedProps),
    (n.memoizedState = e.memoizedState),
    (n.updateQueue = e.updateQueue),
    (t = e.dependencies),
    (n.dependencies =
      t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
    (n.sibling = e.sibling),
    (n.index = e.index),
    (n.ref = e.ref),
    n
  );
}
function go(e, t, n, r, l, o) {
  var i = 2;
  if (((r = e), typeof e == "function")) Fu(e) && (i = 1);
  else if (typeof e == "string") i = 5;
  else
    e: switch (e) {
      case Zn:
        return zn(n.children, l, o, t);
      case qa:
        (i = 8), (l |= 8);
        break;
      case Zi:
        return (
          (e = st(12, n, t, l | 2)), (e.elementType = Zi), (e.lanes = o), e
        );
      case qi:
        return (e = st(13, n, t, l)), (e.elementType = qi), (e.lanes = o), e;
      case bi:
        return (e = st(19, n, t, l)), (e.elementType = bi), (e.lanes = o), e;
      case ef:
        return li(n, l, o, t);
      default:
        if (typeof e == "object" && e !== null)
          switch (e.$$typeof) {
            case qc:
              i = 10;
              break e;
            case bc:
              i = 9;
              break e;
            case ba:
              i = 11;
              break e;
            case eu:
              i = 14;
              break e;
            case bt:
              (i = 16), (r = null);
              break e;
          }
        throw Error(R(130, e == null ? e : typeof e, ""));
    }
  return (
    (t = st(i, n, t, l)), (t.elementType = e), (t.type = r), (t.lanes = o), t
  );
}
function zn(e, t, n, r) {
  return (e = st(7, e, r, t)), (e.lanes = n), e;
}
function li(e, t, n, r) {
  return (
    (e = st(22, e, r, t)),
    (e.elementType = ef),
    (e.lanes = n),
    (e.stateNode = { isHidden: !1 }),
    e
  );
}
function Vi(e, t, n) {
  return (e = st(6, e, null, t)), (e.lanes = n), e;
}
function Wi(e, t, n) {
  return (
    (t = st(4, e.children !== null ? e.children : [], e.key, t)),
    (t.lanes = n),
    (t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation,
    }),
    t
  );
}
function mv(e, t, n, r, l) {
  (this.tag = t),
    (this.containerInfo = e),
    (this.finishedWork =
      this.pingCache =
      this.current =
      this.pendingChildren =
        null),
    (this.timeoutHandle = -1),
    (this.callbackNode = this.pendingContext = this.context = null),
    (this.callbackPriority = 0),
    (this.eventTimes = Ci(0)),
    (this.expirationTimes = Ci(-1)),
    (this.entangledLanes =
      this.finishedLanes =
      this.mutableReadLanes =
      this.expiredLanes =
      this.pingedLanes =
      this.suspendedLanes =
      this.pendingLanes =
        0),
    (this.entanglements = Ci(0)),
    (this.identifierPrefix = r),
    (this.onRecoverableError = l),
    (this.mutableSourceEagerHydrationData = null);
}
function Ou(e, t, n, r, l, o, i, a, u) {
  return (
    (e = new mv(e, t, n, a, u)),
    t === 1 ? ((t = 1), o === !0 && (t |= 8)) : (t = 0),
    (o = st(3, null, null, t)),
    (e.current = o),
    (o.stateNode = e),
    (o.memoizedState = {
      element: r,
      isDehydrated: n,
      cache: null,
      transitions: null,
      pendingSuspenseBoundaries: null,
    }),
    gu(o),
    e
  );
}
function vv(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return {
    $$typeof: Jn,
    key: r == null ? null : "" + r,
    children: e,
    containerInfo: t,
    implementation: n,
  };
}
function Qd(e) {
  if (!e) return vn;
  e = e._reactInternals;
  e: {
    if ($n(e) !== e || e.tag !== 1) throw Error(R(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (Ke(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(R(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (Ke(n)) return Qf(e, n, t);
  }
  return t;
}
function Yd(e, t, n, r, l, o, i, a, u) {
  return (
    (e = Ou(n, r, !0, e, l, o, i, a, u)),
    (e.context = Qd(null)),
    (n = e.current),
    (r = Ae()),
    (l = pn(n)),
    (o = Bt(r, l)),
    (o.callback = t ?? null),
    fn(n, o, l),
    (e.current.lanes = l),
    Pl(e, l, r),
    Qe(e, r),
    e
  );
}
function oi(e, t, n, r) {
  var l = t.current,
    o = Ae(),
    i = pn(l);
  return (
    (n = Qd(n)),
    t.context === null ? (t.context = n) : (t.pendingContext = n),
    (t = Bt(o, i)),
    (t.payload = { element: e }),
    (r = r === void 0 ? null : r),
    r !== null && (t.callback = r),
    (e = fn(l, t, i)),
    e !== null && (Et(e, l, i, o), fo(e, l, i)),
    i
  );
}
function Wo(e) {
  if (((e = e.current), !e.child)) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function hc(e, t) {
  if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function Iu(e, t) {
  hc(e, t), (e = e.alternate) && hc(e, t);
}
function yv() {
  return null;
}
var Xd =
  typeof reportError == "function"
    ? reportError
    : function (e) {
        console.error(e);
      };
function Uu(e) {
  this._internalRoot = e;
}
ii.prototype.render = Uu.prototype.render = function (e) {
  var t = this._internalRoot;
  if (t === null) throw Error(R(409));
  oi(e, t, null, null);
};
ii.prototype.unmount = Uu.prototype.unmount = function () {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    jn(function () {
      oi(null, e, null, null);
    }),
      (t[Ht] = null);
  }
};
function ii(e) {
  this._internalRoot = e;
}
ii.prototype.unstable_scheduleHydration = function (e) {
  if (e) {
    var t = _f();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < tn.length && t !== 0 && t < tn[n].priority; n++);
    tn.splice(n, 0, e), n === 0 && Rf(e);
  }
};
function ju(e) {
  return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
}
function ai(e) {
  return !(
    !e ||
    (e.nodeType !== 1 &&
      e.nodeType !== 9 &&
      e.nodeType !== 11 &&
      (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "))
  );
}
function mc() {}
function gv(e, t, n, r, l) {
  if (l) {
    if (typeof r == "function") {
      var o = r;
      r = function () {
        var s = Wo(i);
        o.call(s);
      };
    }
    var i = Yd(t, r, e, 0, null, !1, !1, "", mc);
    return (
      (e._reactRootContainer = i),
      (e[Ht] = i.current),
      dl(e.nodeType === 8 ? e.parentNode : e),
      jn(),
      i
    );
  }
  for (; (l = e.lastChild); ) e.removeChild(l);
  if (typeof r == "function") {
    var a = r;
    r = function () {
      var s = Wo(u);
      a.call(s);
    };
  }
  var u = Ou(e, 0, !1, null, null, !1, !1, "", mc);
  return (
    (e._reactRootContainer = u),
    (e[Ht] = u.current),
    dl(e.nodeType === 8 ? e.parentNode : e),
    jn(function () {
      oi(t, u, n, r);
    }),
    u
  );
}
function ui(e, t, n, r, l) {
  var o = n._reactRootContainer;
  if (o) {
    var i = o;
    if (typeof l == "function") {
      var a = l;
      l = function () {
        var u = Wo(i);
        a.call(u);
      };
    }
    oi(t, i, e, l);
  } else i = gv(n, t, e, l, r);
  return Wo(i);
}
xf = function (e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = Qr(t.pendingLanes);
        n !== 0 &&
          (ru(t, n | 1), Qe(t, ge()), !(X & 6) && ((Er = ge() + 500), En()));
      }
      break;
    case 13:
      jn(function () {
        var r = Vt(e, 1);
        if (r !== null) {
          var l = Ae();
          Et(r, e, 1, l);
        }
      }),
        Iu(e, 1);
  }
};
lu = function (e) {
  if (e.tag === 13) {
    var t = Vt(e, 134217728);
    if (t !== null) {
      var n = Ae();
      Et(t, e, 134217728, n);
    }
    Iu(e, 134217728);
  }
};
Cf = function (e) {
  if (e.tag === 13) {
    var t = pn(e),
      n = Vt(e, t);
    if (n !== null) {
      var r = Ae();
      Et(n, e, t, r);
    }
    Iu(e, t);
  }
};
_f = function () {
  return q;
};
Pf = function (e, t) {
  var n = q;
  try {
    return (q = e), t();
  } finally {
    q = n;
  }
};
sa = function (e, t, n) {
  switch (t) {
    case "input":
      if ((na(e, n), (t = n.name), n.type === "radio" && t != null)) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (
          n = n.querySelectorAll(
            "input[name=" + JSON.stringify("" + t) + '][type="radio"]'
          ),
            t = 0;
          t < n.length;
          t++
        ) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var l = qo(r);
            if (!l) throw Error(R(90));
            nf(r), na(r, l);
          }
        }
      }
      break;
    case "textarea":
      lf(e, n);
      break;
    case "select":
      (t = n.value), t != null && sr(e, !!n.multiple, t, !1);
  }
};
df = Nu;
pf = jn;
var wv = { usingClientEntryPoint: !1, Events: [Ll, tr, qo, cf, ff, Nu] },
  $r = {
    findFiberByHostInstance: Rn,
    bundleType: 0,
    version: "18.3.1",
    rendererPackageName: "react-dom",
  },
  Sv = {
    bundleType: $r.bundleType,
    version: $r.version,
    rendererPackageName: $r.rendererPackageName,
    rendererConfig: $r.rendererConfig,
    overrideHookState: null,
    overrideHookStateDeletePath: null,
    overrideHookStateRenamePath: null,
    overrideProps: null,
    overridePropsDeletePath: null,
    overridePropsRenamePath: null,
    setErrorHandler: null,
    setSuspenseHandler: null,
    scheduleUpdate: null,
    currentDispatcherRef: Qt.ReactCurrentDispatcher,
    findHostInstanceByFiber: function (e) {
      return (e = vf(e)), e === null ? null : e.stateNode;
    },
    findFiberByHostInstance: $r.findFiberByHostInstance || yv,
    findHostInstancesForRefresh: null,
    scheduleRefresh: null,
    scheduleRoot: null,
    setRefreshHandler: null,
    getCurrentFiber: null,
    reconcilerVersion: "18.3.1-next-f1338f8080-20240426",
  };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var ro = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!ro.isDisabled && ro.supportsFiber)
    try {
      (Xo = ro.inject(Sv)), (Nt = ro);
    } catch {}
}
nt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = wv;
nt.createPortal = function (e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!ju(t)) throw Error(R(200));
  return vv(e, t, null, n);
};
nt.createRoot = function (e, t) {
  if (!ju(e)) throw Error(R(299));
  var n = !1,
    r = "",
    l = Xd;
  return (
    t != null &&
      (t.unstable_strictMode === !0 && (n = !0),
      t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
      t.onRecoverableError !== void 0 && (l = t.onRecoverableError)),
    (t = Ou(e, 1, !1, null, null, n, !1, r, l)),
    (e[Ht] = t.current),
    dl(e.nodeType === 8 ? e.parentNode : e),
    new Uu(t)
  );
};
nt.findDOMNode = function (e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function"
      ? Error(R(188))
      : ((e = Object.keys(e).join(",")), Error(R(268, e)));
  return (e = vf(t)), (e = e === null ? null : e.stateNode), e;
};
nt.flushSync = function (e) {
  return jn(e);
};
nt.hydrate = function (e, t, n) {
  if (!ai(t)) throw Error(R(200));
  return ui(null, e, t, !0, n);
};
nt.hydrateRoot = function (e, t, n) {
  if (!ju(e)) throw Error(R(405));
  var r = (n != null && n.hydratedSources) || null,
    l = !1,
    o = "",
    i = Xd;
  if (
    (n != null &&
      (n.unstable_strictMode === !0 && (l = !0),
      n.identifierPrefix !== void 0 && (o = n.identifierPrefix),
      n.onRecoverableError !== void 0 && (i = n.onRecoverableError)),
    (t = Yd(t, null, e, 1, n ?? null, l, !1, o, i)),
    (e[Ht] = t.current),
    dl(e),
    r)
  )
    for (e = 0; e < r.length; e++)
      (n = r[e]),
        (l = n._getVersion),
        (l = l(n._source)),
        t.mutableSourceEagerHydrationData == null
          ? (t.mutableSourceEagerHydrationData = [n, l])
          : t.mutableSourceEagerHydrationData.push(n, l);
  return new ii(t);
};
nt.render = function (e, t, n) {
  if (!ai(t)) throw Error(R(200));
  return ui(null, e, t, !1, n);
};
nt.unmountComponentAtNode = function (e) {
  if (!ai(e)) throw Error(R(40));
  return e._reactRootContainer
    ? (jn(function () {
        ui(null, null, e, !1, function () {
          (e._reactRootContainer = null), (e[Ht] = null);
        });
      }),
      !0)
    : !1;
};
nt.unstable_batchedUpdates = Nu;
nt.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
  if (!ai(n)) throw Error(R(200));
  if (e == null || e._reactInternals === void 0) throw Error(R(38));
  return ui(e, t, n, !1, r);
};
nt.version = "18.3.1-next-f1338f8080-20240426";
function Gd() {
  if (
    !(
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
    )
  )
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Gd);
    } catch (e) {
      console.error(e);
    }
}
Gd(), (Xc.exports = nt);
var Jd = Xc.exports;
const Ev = jc(Jd),
  kv = Uc({ __proto__: null, default: Ev }, [Jd]);
/**
 * @remix-run/router v1.19.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function ae() {
  return (
    (ae = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    ae.apply(this, arguments)
  );
}
var re;
(function (e) {
  (e.Pop = "POP"), (e.Push = "PUSH"), (e.Replace = "REPLACE");
})(re || (re = {}));
const vc = "popstate";
function Zd(e) {
  e === void 0 && (e = {});
  let { initialEntries: t = ["/"], initialIndex: n, v5Compat: r = !1 } = e,
    l;
  l = t.map((S, E) =>
    f(S, typeof S == "string" ? null : S.state, E === 0 ? "default" : void 0)
  );
  let o = u(n ?? l.length - 1),
    i = re.Pop,
    a = null;
  function u(S) {
    return Math.min(Math.max(S, 0), l.length - 1);
  }
  function s() {
    return l[o];
  }
  function f(S, E, k) {
    E === void 0 && (E = null);
    let P = An(l ? s().pathname : "/", S, E, k);
    return (
      Kt(
        P.pathname.charAt(0) === "/",
        "relative pathnames are not supported in memory history: " +
          JSON.stringify(S)
      ),
      P
    );
  }
  function c(S) {
    return typeof S == "string" ? S : xt(S);
  }
  return {
    get index() {
      return o;
    },
    get action() {
      return i;
    },
    get location() {
      return s();
    },
    createHref: c,
    createURL(S) {
      return new URL(c(S), "http://localhost");
    },
    encodeLocation(S) {
      let E = typeof S == "string" ? pt(S) : S;
      return {
        pathname: E.pathname || "",
        search: E.search || "",
        hash: E.hash || "",
      };
    },
    push(S, E) {
      i = re.Push;
      let k = f(S, E);
      (o += 1),
        l.splice(o, l.length, k),
        r && a && a({ action: i, location: k, delta: 1 });
    },
    replace(S, E) {
      i = re.Replace;
      let k = f(S, E);
      (l[o] = k), r && a && a({ action: i, location: k, delta: 0 });
    },
    go(S) {
      i = re.Pop;
      let E = u(o + S),
        k = l[E];
      (o = E), a && a({ action: i, location: k, delta: S });
    },
    listen(S) {
      return (
        (a = S),
        () => {
          a = null;
        }
      );
    },
  };
}
function qd(e) {
  e === void 0 && (e = {});
  function t(r, l) {
    let { pathname: o, search: i, hash: a } = r.location;
    return An(
      "",
      { pathname: o, search: i, hash: a },
      (l.state && l.state.usr) || null,
      (l.state && l.state.key) || "default"
    );
  }
  function n(r, l) {
    return typeof l == "string" ? l : xt(l);
  }
  return ep(t, n, null, e);
}
function bd(e) {
  e === void 0 && (e = {});
  function t(l, o) {
    let {
      pathname: i = "/",
      search: a = "",
      hash: u = "",
    } = pt(l.location.hash.substr(1));
    return (
      !i.startsWith("/") && !i.startsWith(".") && (i = "/" + i),
      An(
        "",
        { pathname: i, search: a, hash: u },
        (o.state && o.state.usr) || null,
        (o.state && o.state.key) || "default"
      )
    );
  }
  function n(l, o) {
    let i = l.document.querySelector("base"),
      a = "";
    if (i && i.getAttribute("href")) {
      let u = l.location.href,
        s = u.indexOf("#");
      a = s === -1 ? u : u.slice(0, s);
    }
    return a + "#" + (typeof o == "string" ? o : xt(o));
  }
  function r(l, o) {
    Kt(
      l.pathname.charAt(0) === "/",
      "relative pathnames are not supported in hash history.push(" +
        JSON.stringify(o) +
        ")"
    );
  }
  return ep(t, n, r, e);
}
function j(e, t) {
  if (e === !1 || e === null || typeof e > "u") throw new Error(t);
}
function Kt(e, t) {
  if (!e) {
    typeof console < "u" && console.warn(t);
    try {
      throw new Error(t);
    } catch {}
  }
}
function xv() {
  return Math.random().toString(36).substr(2, 8);
}
function yc(e, t) {
  return { usr: e.state, key: e.key, idx: t };
}
function An(e, t, n, r) {
  return (
    n === void 0 && (n = null),
    ae(
      { pathname: typeof e == "string" ? e : e.pathname, search: "", hash: "" },
      typeof t == "string" ? pt(t) : t,
      { state: n, key: (t && t.key) || r || xv() }
    )
  );
}
function xt(e) {
  let { pathname: t = "/", search: n = "", hash: r = "" } = e;
  return (
    n && n !== "?" && (t += n.charAt(0) === "?" ? n : "?" + n),
    r && r !== "#" && (t += r.charAt(0) === "#" ? r : "#" + r),
    t
  );
}
function pt(e) {
  let t = {};
  if (e) {
    let n = e.indexOf("#");
    n >= 0 && ((t.hash = e.substr(n)), (e = e.substr(0, n)));
    let r = e.indexOf("?");
    r >= 0 && ((t.search = e.substr(r)), (e = e.substr(0, r))),
      e && (t.pathname = e);
  }
  return t;
}
function ep(e, t, n, r) {
  r === void 0 && (r = {});
  let { window: l = document.defaultView, v5Compat: o = !1 } = r,
    i = l.history,
    a = re.Pop,
    u = null,
    s = f();
  s == null && ((s = 0), i.replaceState(ae({}, i.state, { idx: s }), ""));
  function f() {
    return (i.state || { idx: null }).idx;
  }
  function c() {
    a = re.Pop;
    let P = f(),
      h = P == null ? null : P - s;
    (s = P), u && u({ action: a, location: k.location, delta: h });
  }
  function p(P, h) {
    a = re.Push;
    let d = An(k.location, P, h);
    n && n(d, P), (s = f() + 1);
    let m = yc(d, s),
      C = k.createHref(d);
    try {
      i.pushState(m, "", C);
    } catch (L) {
      if (L instanceof DOMException && L.name === "DataCloneError") throw L;
      l.location.assign(C);
    }
    o && u && u({ action: a, location: k.location, delta: 1 });
  }
  function S(P, h) {
    a = re.Replace;
    let d = An(k.location, P, h);
    n && n(d, P), (s = f());
    let m = yc(d, s),
      C = k.createHref(d);
    i.replaceState(m, "", C),
      o && u && u({ action: a, location: k.location, delta: 0 });
  }
  function E(P) {
    let h = l.location.origin !== "null" ? l.location.origin : l.location.href,
      d = typeof P == "string" ? P : xt(P);
    return (
      (d = d.replace(/ $/, "%20")),
      j(
        h,
        "No window.location.(origin|href) available to create URL for href: " +
          d
      ),
      new URL(d, h)
    );
  }
  let k = {
    get action() {
      return a;
    },
    get location() {
      return e(l, i);
    },
    listen(P) {
      if (u) throw new Error("A history only accepts one active listener");
      return (
        l.addEventListener(vc, c),
        (u = P),
        () => {
          l.removeEventListener(vc, c), (u = null);
        }
      );
    },
    createHref(P) {
      return t(l, P);
    },
    createURL: E,
    encodeLocation(P) {
      let h = E(P);
      return { pathname: h.pathname, search: h.search, hash: h.hash };
    },
    push: p,
    replace: S,
    go(P) {
      return i.go(P);
    },
  };
  return k;
}
var ee;
(function (e) {
  (e.data = "data"),
    (e.deferred = "deferred"),
    (e.redirect = "redirect"),
    (e.error = "error");
})(ee || (ee = {}));
const Cv = new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "children",
]);
function _v(e) {
  return e.index === !0;
}
function El(e, t, n, r) {
  return (
    n === void 0 && (n = []),
    r === void 0 && (r = {}),
    e.map((l, o) => {
      let i = [...n, String(o)],
        a = typeof l.id == "string" ? l.id : i.join("-");
      if (
        (j(
          l.index !== !0 || !l.children,
          "Cannot specify children on an index route"
        ),
        j(
          !r[a],
          'Found a route id collision on id "' +
            a +
            `".  Route id's must be globally unique within Data Router usages`
        ),
        _v(l))
      ) {
        let u = ae({}, l, t(l), { id: a });
        return (r[a] = u), u;
      } else {
        let u = ae({}, l, t(l), { id: a, children: void 0 });
        return (
          (r[a] = u), l.children && (u.children = El(l.children, t, i, r)), u
        );
      }
    })
  );
}
function rn(e, t, n) {
  return n === void 0 && (n = "/"), wo(e, t, n, !1);
}
function wo(e, t, n, r) {
  let l = typeof t == "string" ? pt(t) : t,
    o = Xe(l.pathname || "/", n);
  if (o == null) return null;
  let i = np(e);
  Pv(i);
  let a = null;
  for (let u = 0; a == null && u < i.length; ++u) {
    let s = lp(o);
    a = Ov(i[u], s, r);
  }
  return a;
}
function tp(e, t) {
  let { route: n, pathname: r, params: l } = e;
  return { id: n.id, pathname: r, params: l, data: t[n.id], handle: n.handle };
}
function np(e, t, n, r) {
  t === void 0 && (t = []), n === void 0 && (n = []), r === void 0 && (r = "");
  let l = (o, i, a) => {
    let u = {
      relativePath: a === void 0 ? o.path || "" : a,
      caseSensitive: o.caseSensitive === !0,
      childrenIndex: i,
      route: o,
    };
    u.relativePath.startsWith("/") &&
      (j(
        u.relativePath.startsWith(r),
        'Absolute route path "' +
          u.relativePath +
          '" nested under path ' +
          ('"' + r + '" is not valid. An absolute child route path ') +
          "must start with the combined path of all its parent routes."
      ),
      (u.relativePath = u.relativePath.slice(r.length)));
    let s = zt([r, u.relativePath]),
      f = n.concat(u);
    o.children &&
      o.children.length > 0 &&
      (j(
        o.index !== !0,
        "Index routes must not have child routes. Please remove " +
          ('all child routes from route path "' + s + '".')
      ),
      np(o.children, t, f, s)),
      !(o.path == null && !o.index) &&
        t.push({ path: s, score: zv(s, o.index), routesMeta: f });
  };
  return (
    e.forEach((o, i) => {
      var a;
      if (o.path === "" || !((a = o.path) != null && a.includes("?"))) l(o, i);
      else for (let u of rp(o.path)) l(o, i, u);
    }),
    t
  );
}
function rp(e) {
  let t = e.split("/");
  if (t.length === 0) return [];
  let [n, ...r] = t,
    l = n.endsWith("?"),
    o = n.replace(/\?$/, "");
  if (r.length === 0) return l ? [o, ""] : [o];
  let i = rp(r.join("/")),
    a = [];
  return (
    a.push(...i.map((u) => (u === "" ? o : [o, u].join("/")))),
    l && a.push(...i),
    a.map((u) => (e.startsWith("/") && u === "" ? "/" : u))
  );
}
function Pv(e) {
  e.sort((t, n) =>
    t.score !== n.score
      ? n.score - t.score
      : Fv(
          t.routesMeta.map((r) => r.childrenIndex),
          n.routesMeta.map((r) => r.childrenIndex)
        )
  );
}
const Rv = /^:[\w-]+$/,
  Lv = 3,
  Tv = 2,
  Dv = 1,
  Nv = 10,
  Mv = -2,
  gc = (e) => e === "*";
function zv(e, t) {
  let n = e.split("/"),
    r = n.length;
  return (
    n.some(gc) && (r += Mv),
    t && (r += Tv),
    n
      .filter((l) => !gc(l))
      .reduce((l, o) => l + (Rv.test(o) ? Lv : o === "" ? Dv : Nv), r)
  );
}
function Fv(e, t) {
  return e.length === t.length && e.slice(0, -1).every((r, l) => r === t[l])
    ? e[e.length - 1] - t[t.length - 1]
    : 0;
}
function Ov(e, t, n) {
  n === void 0 && (n = !1);
  let { routesMeta: r } = e,
    l = {},
    o = "/",
    i = [];
  for (let a = 0; a < r.length; ++a) {
    let u = r[a],
      s = a === r.length - 1,
      f = o === "/" ? t : t.slice(o.length) || "/",
      c = kr(
        { path: u.relativePath, caseSensitive: u.caseSensitive, end: s },
        f
      ),
      p = u.route;
    if (
      (!c &&
        s &&
        n &&
        !r[r.length - 1].route.index &&
        (c = kr(
          { path: u.relativePath, caseSensitive: u.caseSensitive, end: !1 },
          f
        )),
      !c)
    )
      return null;
    Object.assign(l, c.params),
      i.push({
        params: l,
        pathname: zt([o, c.pathname]),
        pathnameBase: Av(zt([o, c.pathnameBase])),
        route: p,
      }),
      c.pathnameBase !== "/" && (o = zt([o, c.pathnameBase]));
  }
  return i;
}
function Iv(e, t) {
  t === void 0 && (t = {});
  let n = e;
  n.endsWith("*") &&
    n !== "*" &&
    !n.endsWith("/*") &&
    (Kt(
      !1,
      'Route path "' +
        n +
        '" will be treated as if it were ' +
        ('"' + n.replace(/\*$/, "/*") + '" because the `*` character must ') +
        "always follow a `/` in the pattern. To get rid of this warning, " +
        ('please change the route path to "' + n.replace(/\*$/, "/*") + '".')
    ),
    (n = n.replace(/\*$/, "/*")));
  const r = n.startsWith("/") ? "/" : "",
    l = (i) => (i == null ? "" : typeof i == "string" ? i : String(i)),
    o = n
      .split(/\/+/)
      .map((i, a, u) => {
        if (a === u.length - 1 && i === "*") return l(t["*"]);
        const f = i.match(/^:([\w-]+)(\??)$/);
        if (f) {
          const [, c, p] = f;
          let S = t[c];
          return j(p === "?" || S != null, 'Missing ":' + c + '" param'), l(S);
        }
        return i.replace(/\?$/g, "");
      })
      .filter((i) => !!i);
  return r + o.join("/");
}
function kr(e, t) {
  typeof e == "string" && (e = { path: e, caseSensitive: !1, end: !0 });
  let [n, r] = Uv(e.path, e.caseSensitive, e.end),
    l = t.match(n);
  if (!l) return null;
  let o = l[0],
    i = o.replace(/(.)\/+$/, "$1"),
    a = l.slice(1);
  return {
    params: r.reduce((s, f, c) => {
      let { paramName: p, isOptional: S } = f;
      if (p === "*") {
        let k = a[c] || "";
        i = o.slice(0, o.length - k.length).replace(/(.)\/+$/, "$1");
      }
      const E = a[c];
      return (
        S && !E ? (s[p] = void 0) : (s[p] = (E || "").replace(/%2F/g, "/")), s
      );
    }, {}),
    pathname: o,
    pathnameBase: i,
    pattern: e,
  };
}
function Uv(e, t, n) {
  t === void 0 && (t = !1),
    n === void 0 && (n = !0),
    Kt(
      e === "*" || !e.endsWith("*") || e.endsWith("/*"),
      'Route path "' +
        e +
        '" will be treated as if it were ' +
        ('"' + e.replace(/\*$/, "/*") + '" because the `*` character must ') +
        "always follow a `/` in the pattern. To get rid of this warning, " +
        ('please change the route path to "' + e.replace(/\*$/, "/*") + '".')
    );
  let r = [],
    l =
      "^" +
      e
        .replace(/\/*\*?$/, "")
        .replace(/^\/*/, "/")
        .replace(/[\\.*+^${}|()[\]]/g, "\\$&")
        .replace(
          /\/:([\w-]+)(\?)?/g,
          (i, a, u) => (
            r.push({ paramName: a, isOptional: u != null }),
            u ? "/?([^\\/]+)?" : "/([^\\/]+)"
          )
        );
  return (
    e.endsWith("*")
      ? (r.push({ paramName: "*" }),
        (l += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$"))
      : n
      ? (l += "\\/*$")
      : e !== "" && e !== "/" && (l += "(?:(?=\\/|$))"),
    [new RegExp(l, t ? void 0 : "i"), r]
  );
}
function lp(e) {
  try {
    return e
      .split("/")
      .map((t) => decodeURIComponent(t).replace(/\//g, "%2F"))
      .join("/");
  } catch (t) {
    return (
      Kt(
        !1,
        'The URL path "' +
          e +
          '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' +
          ("encoding (" + t + ").")
      ),
      e
    );
  }
}
function Xe(e, t) {
  if (t === "/") return e;
  if (!e.toLowerCase().startsWith(t.toLowerCase())) return null;
  let n = t.endsWith("/") ? t.length - 1 : t.length,
    r = e.charAt(n);
  return r && r !== "/" ? null : e.slice(n) || "/";
}
function op(e, t) {
  t === void 0 && (t = "/");
  let {
    pathname: n,
    search: r = "",
    hash: l = "",
  } = typeof e == "string" ? pt(e) : e;
  return {
    pathname: n ? (n.startsWith("/") ? n : jv(n, t)) : t,
    search: Bv(r),
    hash: $v(l),
  };
}
function jv(e, t) {
  let n = t.replace(/\/+$/, "").split("/");
  return (
    e.split("/").forEach((l) => {
      l === ".." ? n.length > 1 && n.pop() : l !== "." && n.push(l);
    }),
    n.length > 1 ? n.join("/") : "/"
  );
}
function Ki(e, t, n, r) {
  return (
    "Cannot include a '" +
    e +
    "' character in a manually specified " +
    ("`to." +
      t +
      "` field [" +
      JSON.stringify(r) +
      "].  Please separate it out to the ") +
    ("`to." + n + "` field. Alternatively you may provide the full path as ") +
    'a string in <Link to="..."> and the router will parse it for you.'
  );
}
function ip(e) {
  return e.filter(
    (t, n) => n === 0 || (t.route.path && t.route.path.length > 0)
  );
}
function si(e, t) {
  let n = ip(e);
  return t
    ? n.map((r, l) => (l === n.length - 1 ? r.pathname : r.pathnameBase))
    : n.map((r) => r.pathnameBase);
}
function ci(e, t, n, r) {
  r === void 0 && (r = !1);
  let l;
  typeof e == "string"
    ? (l = pt(e))
    : ((l = ae({}, e)),
      j(
        !l.pathname || !l.pathname.includes("?"),
        Ki("?", "pathname", "search", l)
      ),
      j(
        !l.pathname || !l.pathname.includes("#"),
        Ki("#", "pathname", "hash", l)
      ),
      j(!l.search || !l.search.includes("#"), Ki("#", "search", "hash", l)));
  let o = e === "" || l.pathname === "",
    i = o ? "/" : l.pathname,
    a;
  if (i == null) a = n;
  else {
    let c = t.length - 1;
    if (!r && i.startsWith("..")) {
      let p = i.split("/");
      for (; p[0] === ".."; ) p.shift(), (c -= 1);
      l.pathname = p.join("/");
    }
    a = c >= 0 ? t[c] : "/";
  }
  let u = op(l, a),
    s = i && i !== "/" && i.endsWith("/"),
    f = (o || i === ".") && n.endsWith("/");
  return !u.pathname.endsWith("/") && (s || f) && (u.pathname += "/"), u;
}
const zt = (e) => e.join("/").replace(/\/\/+/g, "/"),
  Av = (e) => e.replace(/\/+$/, "").replace(/^\/*/, "/"),
  Bv = (e) => (!e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e),
  $v = (e) => (!e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e),
  Hv = function (t, n) {
    n === void 0 && (n = {});
    let r = typeof n == "number" ? { status: n } : n,
      l = new Headers(r.headers);
    return (
      l.has("Content-Type") ||
        l.set("Content-Type", "application/json; charset=utf-8"),
      new Response(JSON.stringify(t), ae({}, r, { headers: l }))
    );
  };
class Ko extends Error {}
class Vv {
  constructor(t, n) {
    (this.pendingKeysSet = new Set()),
      (this.subscribers = new Set()),
      (this.deferredKeys = []),
      j(
        t && typeof t == "object" && !Array.isArray(t),
        "defer() only accepts plain objects"
      );
    let r;
    (this.abortPromise = new Promise((o, i) => (r = i))),
      (this.controller = new AbortController());
    let l = () => r(new Ko("Deferred data aborted"));
    (this.unlistenAbortSignal = () =>
      this.controller.signal.removeEventListener("abort", l)),
      this.controller.signal.addEventListener("abort", l),
      (this.data = Object.entries(t).reduce((o, i) => {
        let [a, u] = i;
        return Object.assign(o, { [a]: this.trackPromise(a, u) });
      }, {})),
      this.done && this.unlistenAbortSignal(),
      (this.init = n);
  }
  trackPromise(t, n) {
    if (!(n instanceof Promise)) return n;
    this.deferredKeys.push(t), this.pendingKeysSet.add(t);
    let r = Promise.race([n, this.abortPromise]).then(
      (l) => this.onSettle(r, t, void 0, l),
      (l) => this.onSettle(r, t, l)
    );
    return (
      r.catch(() => {}),
      Object.defineProperty(r, "_tracked", { get: () => !0 }),
      r
    );
  }
  onSettle(t, n, r, l) {
    if (this.controller.signal.aborted && r instanceof Ko)
      return (
        this.unlistenAbortSignal(),
        Object.defineProperty(t, "_error", { get: () => r }),
        Promise.reject(r)
      );
    if (
      (this.pendingKeysSet.delete(n),
      this.done && this.unlistenAbortSignal(),
      r === void 0 && l === void 0)
    ) {
      let o = new Error(
        'Deferred data for key "' +
          n +
          '" resolved/rejected with `undefined`, you must resolve/reject with a value or `null`.'
      );
      return (
        Object.defineProperty(t, "_error", { get: () => o }),
        this.emit(!1, n),
        Promise.reject(o)
      );
    }
    return l === void 0
      ? (Object.defineProperty(t, "_error", { get: () => r }),
        this.emit(!1, n),
        Promise.reject(r))
      : (Object.defineProperty(t, "_data", { get: () => l }),
        this.emit(!1, n),
        l);
  }
  emit(t, n) {
    this.subscribers.forEach((r) => r(t, n));
  }
  subscribe(t) {
    return this.subscribers.add(t), () => this.subscribers.delete(t);
  }
  cancel() {
    this.controller.abort(),
      this.pendingKeysSet.forEach((t, n) => this.pendingKeysSet.delete(n)),
      this.emit(!0);
  }
  async resolveData(t) {
    let n = !1;
    if (!this.done) {
      let r = () => this.cancel();
      t.addEventListener("abort", r),
        (n = await new Promise((l) => {
          this.subscribe((o) => {
            t.removeEventListener("abort", r), (o || this.done) && l(o);
          });
        }));
    }
    return n;
  }
  get done() {
    return this.pendingKeysSet.size === 0;
  }
  get unwrappedData() {
    return (
      j(
        this.data !== null && this.done,
        "Can only unwrap data on initialized and settled deferreds"
      ),
      Object.entries(this.data).reduce((t, n) => {
        let [r, l] = n;
        return Object.assign(t, { [r]: Kv(l) });
      }, {})
    );
  }
  get pendingKeys() {
    return Array.from(this.pendingKeysSet);
  }
}
function Wv(e) {
  return e instanceof Promise && e._tracked === !0;
}
function Kv(e) {
  if (!Wv(e)) return e;
  if (e._error) throw e._error;
  return e._data;
}
const Qv = function (t, n) {
    n === void 0 && (n = {});
    let r = typeof n == "number" ? { status: n } : n;
    return new Vv(t, r);
  },
  Au = function (t, n) {
    n === void 0 && (n = 302);
    let r = n;
    typeof r == "number"
      ? (r = { status: r })
      : typeof r.status > "u" && (r.status = 302);
    let l = new Headers(r.headers);
    return l.set("Location", t), new Response(null, ae({}, r, { headers: l }));
  },
  Yv = (e, t) => {
    let n = Au(e, t);
    return n.headers.set("X-Remix-Reload-Document", "true"), n;
  },
  Xv = (e, t) => {
    let n = Au(e, t);
    return n.headers.set("X-Remix-Replace", "true"), n;
  };
class kl {
  constructor(t, n, r, l) {
    l === void 0 && (l = !1),
      (this.status = t),
      (this.statusText = n || ""),
      (this.internal = l),
      r instanceof Error
        ? ((this.data = r.toString()), (this.error = r))
        : (this.data = r);
  }
}
function Dl(e) {
  return (
    e != null &&
    typeof e.status == "number" &&
    typeof e.statusText == "string" &&
    typeof e.internal == "boolean" &&
    "data" in e
  );
}
const ap = ["post", "put", "patch", "delete"],
  Gv = new Set(ap),
  Jv = ["get", ...ap],
  Zv = new Set(Jv),
  qv = new Set([301, 302, 303, 307, 308]),
  bv = new Set([307, 308]),
  Qi = {
    state: "idle",
    location: void 0,
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0,
  },
  up = {
    state: "idle",
    data: void 0,
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0,
  },
  Gn = { state: "unblocked", proceed: void 0, reset: void 0, location: void 0 },
  Bu = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  ey = (e) => ({ hasErrorBoundary: !!e.hasErrorBoundary }),
  sp = "remix-router-transitions";
function $u(e) {
  const t = e.window ? e.window : typeof window < "u" ? window : void 0,
    n =
      typeof t < "u" &&
      typeof t.document < "u" &&
      typeof t.document.createElement < "u",
    r = !n;
  j(
    e.routes.length > 0,
    "You must provide a non-empty routes array to createRouter"
  );
  let l;
  if (e.mapRouteProperties) l = e.mapRouteProperties;
  else if (e.detectErrorBoundary) {
    let v = e.detectErrorBoundary;
    l = (g) => ({ hasErrorBoundary: v(g) });
  } else l = ey;
  let o = {},
    i = El(e.routes, l, void 0, o),
    a,
    u = e.basename || "/",
    s = e.unstable_dataStrategy || oy,
    f = e.unstable_patchRoutesOnMiss,
    c = ae(
      {
        v7_fetcherPersist: !1,
        v7_normalizeFormMethod: !1,
        v7_partialHydration: !1,
        v7_prependBasename: !1,
        v7_relativeSplatPath: !1,
        v7_skipActionErrorRevalidation: !1,
      },
      e.future
    ),
    p = null,
    S = new Set(),
    E = null,
    k = null,
    P = null,
    h = e.hydrationData != null,
    d = rn(i, e.history.location, u),
    m = null;
  if (d == null && !f) {
    let v = Ue(404, { pathname: e.history.location.pathname }),
      { matches: g, route: x } = Lc(i);
    (d = g), (m = { [x.id]: v });
  }
  d &&
    !e.hydrationData &&
    Il(d, i, e.history.location.pathname).active &&
    (d = null);
  let C;
  if (d)
    if (d.some((v) => v.route.lazy)) C = !1;
    else if (!d.some((v) => v.route.loader)) C = !0;
    else if (c.v7_partialHydration) {
      let v = e.hydrationData ? e.hydrationData.loaderData : null,
        g = e.hydrationData ? e.hydrationData.errors : null,
        x = (_) =>
          _.route.loader
            ? typeof _.route.loader == "function" &&
              _.route.loader.hydrate === !0
              ? !1
              : (v && v[_.route.id] !== void 0) ||
                (g && g[_.route.id] !== void 0)
            : !0;
      if (g) {
        let _ = d.findIndex((z) => g[z.route.id] !== void 0);
        C = d.slice(0, _ + 1).every(x);
      } else C = d.every(x);
    } else C = e.hydrationData != null;
  else if (((C = !1), (d = []), c.v7_partialHydration)) {
    let v = Il(null, i, e.history.location.pathname);
    v.active && v.matches && (d = v.matches);
  }
  let L,
    y = {
      historyAction: e.history.action,
      location: e.history.location,
      matches: d,
      initialized: C,
      navigation: Qi,
      restoreScrollPosition: e.hydrationData != null ? !1 : null,
      preventScrollReset: !1,
      revalidation: "idle",
      loaderData: (e.hydrationData && e.hydrationData.loaderData) || {},
      actionData: (e.hydrationData && e.hydrationData.actionData) || null,
      errors: (e.hydrationData && e.hydrationData.errors) || m,
      fetchers: new Map(),
      blockers: new Map(),
    },
    N = re.Pop,
    T = !1,
    I,
    O = !1,
    Y = new Map(),
    se = null,
    xe = !1,
    ne = !1,
    _t = [],
    Yt = new Set(),
    ce = new Map(),
    M = 0,
    H = -1,
    V = new Map(),
    G = new Set(),
    oe = new Map(),
    Pt = new Map(),
    Pe = new Set(),
    ht = new Map(),
    Oe = new Map(),
    Hn = new Map(),
    mi = !1;
  function jp() {
    if (
      ((p = e.history.listen((v) => {
        let { action: g, location: x, delta: _ } = v;
        if (mi) {
          mi = !1;
          return;
        }
        Kt(
          Oe.size === 0 || _ != null,
          "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL."
        );
        let z = ls({
          currentLocation: y.location,
          nextLocation: x,
          historyAction: g,
        });
        if (z && _ != null) {
          (mi = !0),
            e.history.go(_ * -1),
            Fl(z, {
              state: "blocked",
              location: x,
              proceed() {
                Fl(z, {
                  state: "proceeding",
                  proceed: void 0,
                  reset: void 0,
                  location: x,
                }),
                  e.history.go(_);
              },
              reset() {
                let U = new Map(y.blockers);
                U.set(z, Gn), Ie({ blockers: U });
              },
            });
          return;
        }
        return Cn(g, x);
      })),
      n)
    ) {
      gy(t, Y);
      let v = () => wy(t, Y);
      t.addEventListener("pagehide", v),
        (se = () => t.removeEventListener("pagehide", v));
    }
    return y.initialized || Cn(re.Pop, y.location, { initialHydration: !0 }), L;
  }
  function Ap() {
    p && p(),
      se && se(),
      S.clear(),
      I && I.abort(),
      y.fetchers.forEach((v, g) => zl(g)),
      y.blockers.forEach((v, g) => rs(g));
  }
  function Bp(v) {
    return S.add(v), () => S.delete(v);
  }
  function Ie(v, g) {
    g === void 0 && (g = {}), (y = ae({}, y, v));
    let x = [],
      _ = [];
    c.v7_fetcherPersist &&
      y.fetchers.forEach((z, U) => {
        z.state === "idle" && (Pe.has(U) ? _.push(U) : x.push(U));
      }),
      [...S].forEach((z) =>
        z(y, {
          deletedFetchers: _,
          unstable_viewTransitionOpts: g.viewTransitionOpts,
          unstable_flushSync: g.flushSync === !0,
        })
      ),
      c.v7_fetcherPersist &&
        (x.forEach((z) => y.fetchers.delete(z)), _.forEach((z) => zl(z)));
  }
  function Vn(v, g, x) {
    var _, z;
    let { flushSync: U } = x === void 0 ? {} : x,
      $ =
        y.actionData != null &&
        y.navigation.formMethod != null &&
        gt(y.navigation.formMethod) &&
        y.navigation.state === "loading" &&
        ((_ = v.state) == null ? void 0 : _._isRedirect) !== !0,
      D;
    g.actionData
      ? Object.keys(g.actionData).length > 0
        ? (D = g.actionData)
        : (D = null)
      : $
      ? (D = y.actionData)
      : (D = null);
    let W = g.loaderData
        ? Pc(y.loaderData, g.loaderData, g.matches || [], g.errors)
        : y.loaderData,
      A = y.blockers;
    A.size > 0 && ((A = new Map(A)), A.forEach((Z, te) => A.set(te, Gn)));
    let B =
      T === !0 ||
      (y.navigation.formMethod != null &&
        gt(y.navigation.formMethod) &&
        ((z = v.state) == null ? void 0 : z._isRedirect) !== !0);
    a && ((i = a), (a = void 0)),
      xe ||
        N === re.Pop ||
        (N === re.Push
          ? e.history.push(v, v.state)
          : N === re.Replace && e.history.replace(v, v.state));
    let b;
    if (N === re.Pop) {
      let Z = Y.get(y.location.pathname);
      Z && Z.has(v.pathname)
        ? (b = { currentLocation: y.location, nextLocation: v })
        : Y.has(v.pathname) &&
          (b = { currentLocation: v, nextLocation: y.location });
    } else if (O) {
      let Z = Y.get(y.location.pathname);
      Z
        ? Z.add(v.pathname)
        : ((Z = new Set([v.pathname])), Y.set(y.location.pathname, Z)),
        (b = { currentLocation: y.location, nextLocation: v });
    }
    Ie(
      ae({}, g, {
        actionData: D,
        loaderData: W,
        historyAction: N,
        location: v,
        initialized: !0,
        navigation: Qi,
        revalidation: "idle",
        restoreScrollPosition: is(v, g.matches || y.matches),
        preventScrollReset: B,
        blockers: A,
      }),
      { viewTransitionOpts: b, flushSync: U === !0 }
    ),
      (N = re.Pop),
      (T = !1),
      (O = !1),
      (xe = !1),
      (ne = !1),
      (_t = []);
  }
  async function Ju(v, g) {
    if (typeof v == "number") {
      e.history.go(v);
      return;
    }
    let x = Ha(
        y.location,
        y.matches,
        u,
        c.v7_prependBasename,
        v,
        c.v7_relativeSplatPath,
        g == null ? void 0 : g.fromRouteId,
        g == null ? void 0 : g.relative
      ),
      {
        path: _,
        submission: z,
        error: U,
      } = wc(c.v7_normalizeFormMethod, !1, x, g),
      $ = y.location,
      D = An(y.location, _, g && g.state);
    D = ae({}, D, e.history.encodeLocation(D));
    let W = g && g.replace != null ? g.replace : void 0,
      A = re.Push;
    W === !0
      ? (A = re.Replace)
      : W === !1 ||
        (z != null &&
          gt(z.formMethod) &&
          z.formAction === y.location.pathname + y.location.search &&
          (A = re.Replace));
    let B =
        g && "preventScrollReset" in g ? g.preventScrollReset === !0 : void 0,
      b = (g && g.unstable_flushSync) === !0,
      Z = ls({ currentLocation: $, nextLocation: D, historyAction: A });
    if (Z) {
      Fl(Z, {
        state: "blocked",
        location: D,
        proceed() {
          Fl(Z, {
            state: "proceeding",
            proceed: void 0,
            reset: void 0,
            location: D,
          }),
            Ju(v, g);
        },
        reset() {
          let te = new Map(y.blockers);
          te.set(Z, Gn), Ie({ blockers: te });
        },
      });
      return;
    }
    return await Cn(A, D, {
      submission: z,
      pendingError: U,
      preventScrollReset: B,
      replace: g && g.replace,
      enableViewTransition: g && g.unstable_viewTransition,
      flushSync: b,
    });
  }
  function $p() {
    if (
      (vi(),
      Ie({ revalidation: "loading" }),
      y.navigation.state !== "submitting")
    ) {
      if (y.navigation.state === "idle") {
        Cn(y.historyAction, y.location, { startUninterruptedRevalidation: !0 });
        return;
      }
      Cn(N || y.historyAction, y.navigation.location, {
        overrideNavigation: y.navigation,
      });
    }
  }
  async function Cn(v, g, x) {
    I && I.abort(),
      (I = null),
      (N = v),
      (xe = (x && x.startUninterruptedRevalidation) === !0),
      Zp(y.location, y.matches),
      (T = (x && x.preventScrollReset) === !0),
      (O = (x && x.enableViewTransition) === !0);
    let _ = a || i,
      z = x && x.overrideNavigation,
      U = rn(_, g, u),
      $ = (x && x.flushSync) === !0,
      D = Il(U, _, g.pathname);
    if ((D.active && D.matches && (U = D.matches), !U)) {
      let { error: J, notFoundMatches: Re, route: we } = yi(g.pathname);
      Vn(
        g,
        { matches: Re, loaderData: {}, errors: { [we.id]: J } },
        { flushSync: $ }
      );
      return;
    }
    if (
      y.initialized &&
      !ne &&
      fy(y.location, g) &&
      !(x && x.submission && gt(x.submission.formMethod))
    ) {
      Vn(g, { matches: U }, { flushSync: $ });
      return;
    }
    I = new AbortController();
    let W = Xn(e.history, g, I.signal, x && x.submission),
      A;
    if (x && x.pendingError)
      A = [ur(U).route.id, { type: ee.error, error: x.pendingError }];
    else if (x && x.submission && gt(x.submission.formMethod)) {
      let J = await Hp(W, g, x.submission, U, D.active, {
        replace: x.replace,
        flushSync: $,
      });
      if (J.shortCircuited) return;
      if (J.pendingActionResult) {
        let [Re, we] = J.pendingActionResult;
        if (qe(we) && Dl(we.error) && we.error.status === 404) {
          (I = null),
            Vn(g, {
              matches: J.matches,
              loaderData: {},
              errors: { [Re]: we.error },
            });
          return;
        }
      }
      (U = J.matches || U),
        (A = J.pendingActionResult),
        (z = Yi(g, x.submission)),
        ($ = !1),
        (D.active = !1),
        (W = Xn(e.history, W.url, W.signal));
    }
    let {
      shortCircuited: B,
      matches: b,
      loaderData: Z,
      errors: te,
    } = await Vp(
      W,
      g,
      U,
      D.active,
      z,
      x && x.submission,
      x && x.fetcherSubmission,
      x && x.replace,
      x && x.initialHydration === !0,
      $,
      A
    );
    B ||
      ((I = null),
      Vn(g, ae({ matches: b || U }, Rc(A), { loaderData: Z, errors: te })));
  }
  async function Hp(v, g, x, _, z, U) {
    U === void 0 && (U = {}), vi();
    let $ = vy(g, x);
    if ((Ie({ navigation: $ }, { flushSync: U.flushSync === !0 }), z)) {
      let A = await Ul(_, g.pathname, v.signal);
      if (A.type === "aborted") return { shortCircuited: !0 };
      if (A.type === "error") {
        let { boundaryId: B, error: b } = Ol(g.pathname, A);
        return {
          matches: A.partialMatches,
          pendingActionResult: [B, { type: ee.error, error: b }],
        };
      } else if (A.matches) _ = A.matches;
      else {
        let { notFoundMatches: B, error: b, route: Z } = yi(g.pathname);
        return {
          matches: B,
          pendingActionResult: [Z.id, { type: ee.error, error: b }],
        };
      }
    }
    let D,
      W = Xr(_, g);
    if (!W.route.action && !W.route.lazy)
      D = {
        type: ee.error,
        error: Ue(405, {
          method: v.method,
          pathname: g.pathname,
          routeId: W.route.id,
        }),
      };
    else if (((D = (await Mr("action", v, [W], _))[0]), v.signal.aborted))
      return { shortCircuited: !0 };
    if (Nn(D)) {
      let A;
      return (
        U && U.replace != null
          ? (A = U.replace)
          : (A =
              xc(D.response.headers.get("Location"), new URL(v.url), u) ===
              y.location.pathname + y.location.search),
        await Nr(v, D, { submission: x, replace: A }),
        { shortCircuited: !0 }
      );
    }
    if (Dn(D)) throw Ue(400, { type: "defer-action" });
    if (qe(D)) {
      let A = ur(_, W.route.id);
      return (
        (U && U.replace) !== !0 && (N = re.Push),
        { matches: _, pendingActionResult: [A.route.id, D] }
      );
    }
    return { matches: _, pendingActionResult: [W.route.id, D] };
  }
  async function Vp(v, g, x, _, z, U, $, D, W, A, B) {
    let b = z || Yi(g, U),
      Z = U || $ || Mc(b),
      te = !xe && (!c.v7_partialHydration || !W);
    if (_) {
      if (te) {
        let ve = Zu(B);
        Ie(ae({ navigation: b }, ve !== void 0 ? { actionData: ve } : {}), {
          flushSync: A,
        });
      }
      let K = await Ul(x, g.pathname, v.signal);
      if (K.type === "aborted") return { shortCircuited: !0 };
      if (K.type === "error") {
        let { boundaryId: ve, error: Je } = Ol(g.pathname, K);
        return {
          matches: K.partialMatches,
          loaderData: {},
          errors: { [ve]: Je },
        };
      } else if (K.matches) x = K.matches;
      else {
        let { error: ve, notFoundMatches: Je, route: fe } = yi(g.pathname);
        return { matches: Je, loaderData: {}, errors: { [fe.id]: ve } };
      }
    }
    let J = a || i,
      [Re, we] = Sc(
        e.history,
        y,
        x,
        Z,
        g,
        c.v7_partialHydration && W === !0,
        c.v7_skipActionErrorRevalidation,
        ne,
        _t,
        Yt,
        Pe,
        oe,
        G,
        J,
        u,
        B
      );
    if (
      (gi(
        (K) =>
          !(x && x.some((ve) => ve.route.id === K)) ||
          (Re && Re.some((ve) => ve.route.id === K))
      ),
      (H = ++M),
      Re.length === 0 && we.length === 0)
    ) {
      let K = ts();
      return (
        Vn(
          g,
          ae(
            {
              matches: x,
              loaderData: {},
              errors: B && qe(B[1]) ? { [B[0]]: B[1].error } : null,
            },
            Rc(B),
            K ? { fetchers: new Map(y.fetchers) } : {}
          ),
          { flushSync: A }
        ),
        { shortCircuited: !0 }
      );
    }
    if (te) {
      let K = {};
      if (!_) {
        K.navigation = b;
        let ve = Zu(B);
        ve !== void 0 && (K.actionData = ve);
      }
      we.length > 0 && (K.fetchers = Wp(we)), Ie(K, { flushSync: A });
    }
    we.forEach((K) => {
      ce.has(K.key) && Gt(K.key), K.controller && ce.set(K.key, K.controller);
    });
    let zr = () => we.forEach((K) => Gt(K.key));
    I && I.signal.addEventListener("abort", zr);
    let { loaderResults: Jt, fetcherResults: Wn } = await qu(
      y.matches,
      x,
      Re,
      we,
      v
    );
    if (v.signal.aborted) return { shortCircuited: !0 };
    I && I.signal.removeEventListener("abort", zr),
      we.forEach((K) => ce.delete(K.key));
    let Kn = Tc([...Jt, ...Wn]);
    if (Kn) {
      if (Kn.idx >= Re.length) {
        let K = we[Kn.idx - Re.length].key;
        G.add(K);
      }
      return await Nr(v, Kn.result, { replace: D }), { shortCircuited: !0 };
    }
    let { loaderData: Qn, errors: Rt } = _c(y, x, Re, Jt, B, we, Wn, ht);
    ht.forEach((K, ve) => {
      K.subscribe((Je) => {
        (Je || K.done) && ht.delete(ve);
      });
    }),
      c.v7_partialHydration &&
        W &&
        y.errors &&
        Object.entries(y.errors)
          .filter((K) => {
            let [ve] = K;
            return !Re.some((Je) => Je.route.id === ve);
          })
          .forEach((K) => {
            let [ve, Je] = K;
            Rt = Object.assign(Rt || {}, { [ve]: Je });
          });
    let jl = ts(),
      Al = ns(H),
      Bl = jl || Al || we.length > 0;
    return ae(
      { matches: x, loaderData: Qn, errors: Rt },
      Bl ? { fetchers: new Map(y.fetchers) } : {}
    );
  }
  function Zu(v) {
    if (v && !qe(v[1])) return { [v[0]]: v[1].data };
    if (y.actionData)
      return Object.keys(y.actionData).length === 0 ? null : y.actionData;
  }
  function Wp(v) {
    return (
      v.forEach((g) => {
        let x = y.fetchers.get(g.key),
          _ = Hr(void 0, x ? x.data : void 0);
        y.fetchers.set(g.key, _);
      }),
      new Map(y.fetchers)
    );
  }
  function Kp(v, g, x, _) {
    if (r)
      throw new Error(
        "router.fetch() was called during the server render, but it shouldn't be. You are likely calling a useFetcher() method in the body of your component. Try moving it to a useEffect or a callback."
      );
    ce.has(v) && Gt(v);
    let z = (_ && _.unstable_flushSync) === !0,
      U = a || i,
      $ = Ha(
        y.location,
        y.matches,
        u,
        c.v7_prependBasename,
        x,
        c.v7_relativeSplatPath,
        g,
        _ == null ? void 0 : _.relative
      ),
      D = rn(U, $, u),
      W = Il(D, U, $);
    if ((W.active && W.matches && (D = W.matches), !D)) {
      Ft(v, g, Ue(404, { pathname: $ }), { flushSync: z });
      return;
    }
    let {
      path: A,
      submission: B,
      error: b,
    } = wc(c.v7_normalizeFormMethod, !0, $, _);
    if (b) {
      Ft(v, g, b, { flushSync: z });
      return;
    }
    let Z = Xr(D, A);
    if (((T = (_ && _.preventScrollReset) === !0), B && gt(B.formMethod))) {
      Qp(v, g, A, Z, D, W.active, z, B);
      return;
    }
    oe.set(v, { routeId: g, path: A }), Yp(v, g, A, Z, D, W.active, z, B);
  }
  async function Qp(v, g, x, _, z, U, $, D) {
    vi(), oe.delete(v);
    function W(fe) {
      if (!fe.route.action && !fe.route.lazy) {
        let Ot = Ue(405, { method: D.formMethod, pathname: x, routeId: g });
        return Ft(v, g, Ot, { flushSync: $ }), !0;
      }
      return !1;
    }
    if (!U && W(_)) return;
    let A = y.fetchers.get(v);
    Xt(v, yy(D, A), { flushSync: $ });
    let B = new AbortController(),
      b = Xn(e.history, x, B.signal, D);
    if (U) {
      let fe = await Ul(z, x, b.signal);
      if (fe.type === "aborted") return;
      if (fe.type === "error") {
        let { error: Ot } = Ol(x, fe);
        Ft(v, g, Ot, { flushSync: $ });
        return;
      } else if (fe.matches) {
        if (((z = fe.matches), (_ = Xr(z, x)), W(_))) return;
      } else {
        Ft(v, g, Ue(404, { pathname: x }), { flushSync: $ });
        return;
      }
    }
    ce.set(v, B);
    let Z = M,
      J = (await Mr("action", b, [_], z))[0];
    if (b.signal.aborted) {
      ce.get(v) === B && ce.delete(v);
      return;
    }
    if (c.v7_fetcherPersist && Pe.has(v)) {
      if (Nn(J) || qe(J)) {
        Xt(v, qt(void 0));
        return;
      }
    } else {
      if (Nn(J))
        if ((ce.delete(v), H > Z)) {
          Xt(v, qt(void 0));
          return;
        } else
          return G.add(v), Xt(v, Hr(D)), Nr(b, J, { fetcherSubmission: D });
      if (qe(J)) {
        Ft(v, g, J.error);
        return;
      }
    }
    if (Dn(J)) throw Ue(400, { type: "defer-action" });
    let Re = y.navigation.location || y.location,
      we = Xn(e.history, Re, B.signal),
      zr = a || i,
      Jt =
        y.navigation.state !== "idle"
          ? rn(zr, y.navigation.location, u)
          : y.matches;
    j(Jt, "Didn't find any matches after fetcher action");
    let Wn = ++M;
    V.set(v, Wn);
    let Kn = Hr(D, J.data);
    y.fetchers.set(v, Kn);
    let [Qn, Rt] = Sc(
      e.history,
      y,
      Jt,
      D,
      Re,
      !1,
      c.v7_skipActionErrorRevalidation,
      ne,
      _t,
      Yt,
      Pe,
      oe,
      G,
      zr,
      u,
      [_.route.id, J]
    );
    Rt.filter((fe) => fe.key !== v).forEach((fe) => {
      let Ot = fe.key,
        as = y.fetchers.get(Ot),
        eh = Hr(void 0, as ? as.data : void 0);
      y.fetchers.set(Ot, eh),
        ce.has(Ot) && Gt(Ot),
        fe.controller && ce.set(Ot, fe.controller);
    }),
      Ie({ fetchers: new Map(y.fetchers) });
    let jl = () => Rt.forEach((fe) => Gt(fe.key));
    B.signal.addEventListener("abort", jl);
    let { loaderResults: Al, fetcherResults: Bl } = await qu(
      y.matches,
      Jt,
      Qn,
      Rt,
      we
    );
    if (B.signal.aborted) return;
    B.signal.removeEventListener("abort", jl),
      V.delete(v),
      ce.delete(v),
      Rt.forEach((fe) => ce.delete(fe.key));
    let K = Tc([...Al, ...Bl]);
    if (K) {
      if (K.idx >= Qn.length) {
        let fe = Rt[K.idx - Qn.length].key;
        G.add(fe);
      }
      return Nr(we, K.result);
    }
    let { loaderData: ve, errors: Je } = _c(
      y,
      y.matches,
      Qn,
      Al,
      void 0,
      Rt,
      Bl,
      ht
    );
    if (y.fetchers.has(v)) {
      let fe = qt(J.data);
      y.fetchers.set(v, fe);
    }
    ns(Wn),
      y.navigation.state === "loading" && Wn > H
        ? (j(N, "Expected pending action"),
          I && I.abort(),
          Vn(y.navigation.location, {
            matches: Jt,
            loaderData: ve,
            errors: Je,
            fetchers: new Map(y.fetchers),
          }))
        : (Ie({
            errors: Je,
            loaderData: Pc(y.loaderData, ve, Jt, Je),
            fetchers: new Map(y.fetchers),
          }),
          (ne = !1));
  }
  async function Yp(v, g, x, _, z, U, $, D) {
    let W = y.fetchers.get(v);
    Xt(v, Hr(D, W ? W.data : void 0), { flushSync: $ });
    let A = new AbortController(),
      B = Xn(e.history, x, A.signal);
    if (U) {
      let J = await Ul(z, x, B.signal);
      if (J.type === "aborted") return;
      if (J.type === "error") {
        let { error: Re } = Ol(x, J);
        Ft(v, g, Re, { flushSync: $ });
        return;
      } else if (J.matches) (z = J.matches), (_ = Xr(z, x));
      else {
        Ft(v, g, Ue(404, { pathname: x }), { flushSync: $ });
        return;
      }
    }
    ce.set(v, A);
    let b = M,
      te = (await Mr("loader", B, [_], z))[0];
    if (
      (Dn(te) && (te = (await hp(te, B.signal, !0)) || te),
      ce.get(v) === A && ce.delete(v),
      !B.signal.aborted)
    ) {
      if (Pe.has(v)) {
        Xt(v, qt(void 0));
        return;
      }
      if (Nn(te))
        if (H > b) {
          Xt(v, qt(void 0));
          return;
        } else {
          G.add(v), await Nr(B, te);
          return;
        }
      if (qe(te)) {
        Ft(v, g, te.error);
        return;
      }
      j(!Dn(te), "Unhandled fetcher deferred data"), Xt(v, qt(te.data));
    }
  }
  async function Nr(v, g, x) {
    let {
      submission: _,
      fetcherSubmission: z,
      replace: U,
    } = x === void 0 ? {} : x;
    g.response.headers.has("X-Remix-Revalidate") && (ne = !0);
    let $ = g.response.headers.get("Location");
    j($, "Expected a Location header on the redirect Response"),
      ($ = xc($, new URL(v.url), u));
    let D = An(y.location, $, { _isRedirect: !0 });
    if (n) {
      let te = !1;
      if (g.response.headers.has("X-Remix-Reload-Document")) te = !0;
      else if (Bu.test($)) {
        const J = e.history.createURL($);
        te = J.origin !== t.location.origin || Xe(J.pathname, u) == null;
      }
      if (te) {
        U ? t.location.replace($) : t.location.assign($);
        return;
      }
    }
    I = null;
    let W =
        U === !0 || g.response.headers.has("X-Remix-Replace")
          ? re.Replace
          : re.Push,
      { formMethod: A, formAction: B, formEncType: b } = y.navigation;
    !_ && !z && A && B && b && (_ = Mc(y.navigation));
    let Z = _ || z;
    if (bv.has(g.response.status) && Z && gt(Z.formMethod))
      await Cn(W, D, {
        submission: ae({}, Z, { formAction: $ }),
        preventScrollReset: T,
      });
    else {
      let te = Yi(D, _);
      await Cn(W, D, {
        overrideNavigation: te,
        fetcherSubmission: z,
        preventScrollReset: T,
      });
    }
  }
  async function Mr(v, g, x, _) {
    try {
      let z = await iy(s, v, g, x, _, o, l);
      return await Promise.all(
        z.map((U, $) => {
          if (py(U)) {
            let D = U.result;
            return {
              type: ee.redirect,
              response: sy(D, g, x[$].route.id, _, u, c.v7_relativeSplatPath),
            };
          }
          return uy(U);
        })
      );
    } catch (z) {
      return x.map(() => ({ type: ee.error, error: z }));
    }
  }
  async function qu(v, g, x, _, z) {
    let [U, ...$] = await Promise.all([
      x.length ? Mr("loader", z, x, g) : [],
      ..._.map((D) => {
        if (D.matches && D.match && D.controller) {
          let W = Xn(e.history, D.path, D.controller.signal);
          return Mr("loader", W, [D.match], D.matches).then((A) => A[0]);
        } else
          return Promise.resolve({
            type: ee.error,
            error: Ue(404, { pathname: D.path }),
          });
      }),
    ]);
    return (
      await Promise.all([
        Nc(
          v,
          x,
          U,
          U.map(() => z.signal),
          !1,
          y.loaderData
        ),
        Nc(
          v,
          _.map((D) => D.match),
          $,
          _.map((D) => (D.controller ? D.controller.signal : null)),
          !0
        ),
      ]),
      { loaderResults: U, fetcherResults: $ }
    );
  }
  function vi() {
    (ne = !0),
      _t.push(...gi()),
      oe.forEach((v, g) => {
        ce.has(g) && (Yt.add(g), Gt(g));
      });
  }
  function Xt(v, g, x) {
    x === void 0 && (x = {}),
      y.fetchers.set(v, g),
      Ie(
        { fetchers: new Map(y.fetchers) },
        { flushSync: (x && x.flushSync) === !0 }
      );
  }
  function Ft(v, g, x, _) {
    _ === void 0 && (_ = {});
    let z = ur(y.matches, g);
    zl(v),
      Ie(
        { errors: { [z.route.id]: x }, fetchers: new Map(y.fetchers) },
        { flushSync: (_ && _.flushSync) === !0 }
      );
  }
  function bu(v) {
    return (
      c.v7_fetcherPersist &&
        (Pt.set(v, (Pt.get(v) || 0) + 1), Pe.has(v) && Pe.delete(v)),
      y.fetchers.get(v) || up
    );
  }
  function zl(v) {
    let g = y.fetchers.get(v);
    ce.has(v) && !(g && g.state === "loading" && V.has(v)) && Gt(v),
      oe.delete(v),
      V.delete(v),
      G.delete(v),
      Pe.delete(v),
      Yt.delete(v),
      y.fetchers.delete(v);
  }
  function Xp(v) {
    if (c.v7_fetcherPersist) {
      let g = (Pt.get(v) || 0) - 1;
      g <= 0 ? (Pt.delete(v), Pe.add(v)) : Pt.set(v, g);
    } else zl(v);
    Ie({ fetchers: new Map(y.fetchers) });
  }
  function Gt(v) {
    let g = ce.get(v);
    j(g, "Expected fetch controller: " + v), g.abort(), ce.delete(v);
  }
  function es(v) {
    for (let g of v) {
      let x = bu(g),
        _ = qt(x.data);
      y.fetchers.set(g, _);
    }
  }
  function ts() {
    let v = [],
      g = !1;
    for (let x of G) {
      let _ = y.fetchers.get(x);
      j(_, "Expected fetcher: " + x),
        _.state === "loading" && (G.delete(x), v.push(x), (g = !0));
    }
    return es(v), g;
  }
  function ns(v) {
    let g = [];
    for (let [x, _] of V)
      if (_ < v) {
        let z = y.fetchers.get(x);
        j(z, "Expected fetcher: " + x),
          z.state === "loading" && (Gt(x), V.delete(x), g.push(x));
      }
    return es(g), g.length > 0;
  }
  function Gp(v, g) {
    let x = y.blockers.get(v) || Gn;
    return Oe.get(v) !== g && Oe.set(v, g), x;
  }
  function rs(v) {
    y.blockers.delete(v), Oe.delete(v);
  }
  function Fl(v, g) {
    let x = y.blockers.get(v) || Gn;
    j(
      (x.state === "unblocked" && g.state === "blocked") ||
        (x.state === "blocked" && g.state === "blocked") ||
        (x.state === "blocked" && g.state === "proceeding") ||
        (x.state === "blocked" && g.state === "unblocked") ||
        (x.state === "proceeding" && g.state === "unblocked"),
      "Invalid blocker state transition: " + x.state + " -> " + g.state
    );
    let _ = new Map(y.blockers);
    _.set(v, g), Ie({ blockers: _ });
  }
  function ls(v) {
    let { currentLocation: g, nextLocation: x, historyAction: _ } = v;
    if (Oe.size === 0) return;
    Oe.size > 1 && Kt(!1, "A router only supports one blocker at a time");
    let z = Array.from(Oe.entries()),
      [U, $] = z[z.length - 1],
      D = y.blockers.get(U);
    if (
      !(D && D.state === "proceeding") &&
      $({ currentLocation: g, nextLocation: x, historyAction: _ })
    )
      return U;
  }
  function yi(v) {
    let g = Ue(404, { pathname: v }),
      x = a || i,
      { matches: _, route: z } = Lc(x);
    return gi(), { notFoundMatches: _, route: z, error: g };
  }
  function Ol(v, g) {
    return {
      boundaryId: ur(g.partialMatches).route.id,
      error: Ue(400, {
        type: "route-discovery",
        pathname: v,
        message:
          g.error != null && "message" in g.error ? g.error : String(g.error),
      }),
    };
  }
  function gi(v) {
    let g = [];
    return (
      ht.forEach((x, _) => {
        (!v || v(_)) && (x.cancel(), g.push(_), ht.delete(_));
      }),
      g
    );
  }
  function Jp(v, g, x) {
    if (((E = v), (P = g), (k = x || null), !h && y.navigation === Qi)) {
      h = !0;
      let _ = is(y.location, y.matches);
      _ != null && Ie({ restoreScrollPosition: _ });
    }
    return () => {
      (E = null), (P = null), (k = null);
    };
  }
  function os(v, g) {
    return (
      (k &&
        k(
          v,
          g.map((_) => tp(_, y.loaderData))
        )) ||
      v.key
    );
  }
  function Zp(v, g) {
    if (E && P) {
      let x = os(v, g);
      E[x] = P();
    }
  }
  function is(v, g) {
    if (E) {
      let x = os(v, g),
        _ = E[x];
      if (typeof _ == "number") return _;
    }
    return null;
  }
  function Il(v, g, x) {
    if (f)
      if (v) {
        let _ = v[v.length - 1].route;
        if (_.path && (_.path === "*" || _.path.endsWith("/*")))
          return { active: !0, matches: wo(g, x, u, !0) };
      } else return { active: !0, matches: wo(g, x, u, !0) || [] };
    return { active: !1, matches: null };
  }
  async function Ul(v, g, x) {
    let _ = v,
      z = _.length > 0 ? _[_.length - 1].route : null;
    for (;;) {
      let U = a == null,
        $ = a || i;
      try {
        await ly(f, g, _, $, o, l, Hn, x);
      } catch (B) {
        return { type: "error", error: B, partialMatches: _ };
      } finally {
        U && (i = [...i]);
      }
      if (x.aborted) return { type: "aborted" };
      let D = rn($, g, u),
        W = !1;
      if (D) {
        let B = D[D.length - 1].route;
        if (B.index) return { type: "success", matches: D };
        if (B.path && B.path.length > 0)
          if (B.path === "*") W = !0;
          else return { type: "success", matches: D };
      }
      let A = wo($, g, u, !0);
      if (
        !A ||
        _.map((B) => B.route.id).join("-") ===
          A.map((B) => B.route.id).join("-")
      )
        return { type: "success", matches: W ? D : null };
      if (((_ = A), (z = _[_.length - 1].route), z.path === "*"))
        return { type: "success", matches: _ };
    }
  }
  function qp(v) {
    (o = {}), (a = El(v, l, void 0, o));
  }
  function bp(v, g) {
    let x = a == null;
    fp(v, g, a || i, o, l), x && ((i = [...i]), Ie({}));
  }
  return (
    (L = {
      get basename() {
        return u;
      },
      get future() {
        return c;
      },
      get state() {
        return y;
      },
      get routes() {
        return i;
      },
      get window() {
        return t;
      },
      initialize: jp,
      subscribe: Bp,
      enableScrollRestoration: Jp,
      navigate: Ju,
      fetch: Kp,
      revalidate: $p,
      createHref: (v) => e.history.createHref(v),
      encodeLocation: (v) => e.history.encodeLocation(v),
      getFetcher: bu,
      deleteFetcher: Xp,
      dispose: Ap,
      getBlocker: Gp,
      deleteBlocker: rs,
      patchRoutes: bp,
      _internalFetchControllers: ce,
      _internalActiveDeferreds: ht,
      _internalSetRoutes: qp,
    }),
    L
  );
}
function ty(e) {
  return (
    e != null &&
    (("formData" in e && e.formData != null) ||
      ("body" in e && e.body !== void 0))
  );
}
function Ha(e, t, n, r, l, o, i, a) {
  let u, s;
  if (i) {
    u = [];
    for (let c of t)
      if ((u.push(c), c.route.id === i)) {
        s = c;
        break;
      }
  } else (u = t), (s = t[t.length - 1]);
  let f = ci(l || ".", si(u, o), Xe(e.pathname, n) || e.pathname, a === "path");
  return (
    l == null && ((f.search = e.search), (f.hash = e.hash)),
    (l == null || l === "" || l === ".") &&
      s &&
      s.route.index &&
      !Hu(f.search) &&
      (f.search = f.search ? f.search.replace(/^\?/, "?index&") : "?index"),
    r &&
      n !== "/" &&
      (f.pathname = f.pathname === "/" ? n : zt([n, f.pathname])),
    xt(f)
  );
}
function wc(e, t, n, r) {
  if (!r || !ty(r)) return { path: n };
  if (r.formMethod && !my(r.formMethod))
    return { path: n, error: Ue(405, { method: r.formMethod }) };
  let l = () => ({ path: n, error: Ue(400, { type: "invalid-body" }) }),
    o = r.formMethod || "get",
    i = e ? o.toUpperCase() : o.toLowerCase(),
    a = dp(n);
  if (r.body !== void 0) {
    if (r.formEncType === "text/plain") {
      if (!gt(i)) return l();
      let p =
        typeof r.body == "string"
          ? r.body
          : r.body instanceof FormData || r.body instanceof URLSearchParams
          ? Array.from(r.body.entries()).reduce((S, E) => {
              let [k, P] = E;
              return (
                "" +
                S +
                k +
                "=" +
                P +
                `
`
              );
            }, "")
          : String(r.body);
      return {
        path: n,
        submission: {
          formMethod: i,
          formAction: a,
          formEncType: r.formEncType,
          formData: void 0,
          json: void 0,
          text: p,
        },
      };
    } else if (r.formEncType === "application/json") {
      if (!gt(i)) return l();
      try {
        let p = typeof r.body == "string" ? JSON.parse(r.body) : r.body;
        return {
          path: n,
          submission: {
            formMethod: i,
            formAction: a,
            formEncType: r.formEncType,
            formData: void 0,
            json: p,
            text: void 0,
          },
        };
      } catch {
        return l();
      }
    }
  }
  j(
    typeof FormData == "function",
    "FormData is not available in this environment"
  );
  let u, s;
  if (r.formData) (u = Va(r.formData)), (s = r.formData);
  else if (r.body instanceof FormData) (u = Va(r.body)), (s = r.body);
  else if (r.body instanceof URLSearchParams) (u = r.body), (s = Cc(u));
  else if (r.body == null) (u = new URLSearchParams()), (s = new FormData());
  else
    try {
      (u = new URLSearchParams(r.body)), (s = Cc(u));
    } catch {
      return l();
    }
  let f = {
    formMethod: i,
    formAction: a,
    formEncType: (r && r.formEncType) || "application/x-www-form-urlencoded",
    formData: s,
    json: void 0,
    text: void 0,
  };
  if (gt(f.formMethod)) return { path: n, submission: f };
  let c = pt(n);
  return (
    t && c.search && Hu(c.search) && u.append("index", ""),
    (c.search = "?" + u),
    { path: xt(c), submission: f }
  );
}
function ny(e, t) {
  let n = e;
  if (t) {
    let r = e.findIndex((l) => l.route.id === t);
    r >= 0 && (n = e.slice(0, r));
  }
  return n;
}
function Sc(e, t, n, r, l, o, i, a, u, s, f, c, p, S, E, k) {
  let P = k ? (qe(k[1]) ? k[1].error : k[1].data) : void 0,
    h = e.createURL(t.location),
    d = e.createURL(l),
    m = k && qe(k[1]) ? k[0] : void 0,
    C = m ? ny(n, m) : n,
    L = k ? k[1].statusCode : void 0,
    y = i && L && L >= 400,
    N = C.filter((I, O) => {
      let { route: Y } = I;
      if (Y.lazy) return !0;
      if (Y.loader == null) return !1;
      if (o)
        return typeof Y.loader != "function" || Y.loader.hydrate
          ? !0
          : t.loaderData[Y.id] === void 0 &&
              (!t.errors || t.errors[Y.id] === void 0);
      if (
        ry(t.loaderData, t.matches[O], I) ||
        u.some((ne) => ne === I.route.id)
      )
        return !0;
      let se = t.matches[O],
        xe = I;
      return Ec(
        I,
        ae(
          {
            currentUrl: h,
            currentParams: se.params,
            nextUrl: d,
            nextParams: xe.params,
          },
          r,
          {
            actionResult: P,
            actionStatus: L,
            defaultShouldRevalidate: y
              ? !1
              : a ||
                h.pathname + h.search === d.pathname + d.search ||
                h.search !== d.search ||
                cp(se, xe),
          }
        )
      );
    }),
    T = [];
  return (
    c.forEach((I, O) => {
      if (o || !n.some((_t) => _t.route.id === I.routeId) || f.has(O)) return;
      let Y = rn(S, I.path, E);
      if (!Y) {
        T.push({
          key: O,
          routeId: I.routeId,
          path: I.path,
          matches: null,
          match: null,
          controller: null,
        });
        return;
      }
      let se = t.fetchers.get(O),
        xe = Xr(Y, I.path),
        ne = !1;
      p.has(O)
        ? (ne = !1)
        : s.has(O)
        ? (s.delete(O), (ne = !0))
        : se && se.state !== "idle" && se.data === void 0
        ? (ne = a)
        : (ne = Ec(
            xe,
            ae(
              {
                currentUrl: h,
                currentParams: t.matches[t.matches.length - 1].params,
                nextUrl: d,
                nextParams: n[n.length - 1].params,
              },
              r,
              {
                actionResult: P,
                actionStatus: L,
                defaultShouldRevalidate: y ? !1 : a,
              }
            )
          )),
        ne &&
          T.push({
            key: O,
            routeId: I.routeId,
            path: I.path,
            matches: Y,
            match: xe,
            controller: new AbortController(),
          });
    }),
    [N, T]
  );
}
function ry(e, t, n) {
  let r = !t || n.route.id !== t.route.id,
    l = e[n.route.id] === void 0;
  return r || l;
}
function cp(e, t) {
  let n = e.route.path;
  return (
    e.pathname !== t.pathname ||
    (n != null && n.endsWith("*") && e.params["*"] !== t.params["*"])
  );
}
function Ec(e, t) {
  if (e.route.shouldRevalidate) {
    let n = e.route.shouldRevalidate(t);
    if (typeof n == "boolean") return n;
  }
  return t.defaultShouldRevalidate;
}
async function ly(e, t, n, r, l, o, i, a) {
  let u = [t, ...n.map((s) => s.route.id)].join("-");
  try {
    let s = i.get(u);
    s ||
      ((s = e({
        path: t,
        matches: n,
        patch: (f, c) => {
          a.aborted || fp(f, c, r, l, o);
        },
      })),
      i.set(u, s)),
      s && dy(s) && (await s);
  } finally {
    i.delete(u);
  }
}
function fp(e, t, n, r, l) {
  if (e) {
    var o;
    let i = r[e];
    j(i, "No route found to patch children into: routeId = " + e);
    let a = El(
      t,
      l,
      [
        e,
        "patch",
        String(((o = i.children) == null ? void 0 : o.length) || "0"),
      ],
      r
    );
    i.children ? i.children.push(...a) : (i.children = a);
  } else {
    let i = El(t, l, ["patch", String(n.length || "0")], r);
    n.push(...i);
  }
}
async function kc(e, t, n) {
  if (!e.lazy) return;
  let r = await e.lazy();
  if (!e.lazy) return;
  let l = n[e.id];
  j(l, "No route found in manifest");
  let o = {};
  for (let i in r) {
    let u = l[i] !== void 0 && i !== "hasErrorBoundary";
    Kt(
      !u,
      'Route "' +
        l.id +
        '" has a static property "' +
        i +
        '" defined but its lazy function is also returning a value for this property. ' +
        ('The lazy route property "' + i + '" will be ignored.')
    ),
      !u && !Cv.has(i) && (o[i] = r[i]);
  }
  Object.assign(l, o), Object.assign(l, ae({}, t(l), { lazy: void 0 }));
}
function oy(e) {
  return Promise.all(e.matches.map((t) => t.resolve()));
}
async function iy(e, t, n, r, l, o, i, a) {
  let u = r.reduce((c, p) => c.add(p.route.id), new Set()),
    s = new Set(),
    f = await e({
      matches: l.map((c) => {
        let p = u.has(c.route.id);
        return ae({}, c, {
          shouldLoad: p,
          resolve: (E) => (
            s.add(c.route.id),
            p
              ? ay(t, n, c, o, i, E, a)
              : Promise.resolve({ type: ee.data, result: void 0 })
          ),
        });
      }),
      request: n,
      params: l[0].params,
      context: a,
    });
  return (
    l.forEach((c) =>
      j(
        s.has(c.route.id),
        '`match.resolve()` was not called for route id "' +
          c.route.id +
          '". You must call `match.resolve()` on every match passed to `dataStrategy` to ensure all routes are properly loaded.'
      )
    ),
    f.filter((c, p) => u.has(l[p].route.id))
  );
}
async function ay(e, t, n, r, l, o, i) {
  let a,
    u,
    s = (f) => {
      let c,
        p = new Promise((k, P) => (c = P));
      (u = () => c()), t.signal.addEventListener("abort", u);
      let S = (k) =>
          typeof f != "function"
            ? Promise.reject(
                new Error(
                  "You cannot call the handler for a route which defines a boolean " +
                    ('"' + e + '" [routeId: ' + n.route.id + "]")
                )
              )
            : f(
                { request: t, params: n.params, context: i },
                ...(k !== void 0 ? [k] : [])
              ),
        E;
      return (
        o
          ? (E = o((k) => S(k)))
          : (E = (async () => {
              try {
                return { type: "data", result: await S() };
              } catch (k) {
                return { type: "error", result: k };
              }
            })()),
        Promise.race([E, p])
      );
    };
  try {
    let f = n.route[e];
    if (n.route.lazy)
      if (f) {
        let c,
          [p] = await Promise.all([
            s(f).catch((S) => {
              c = S;
            }),
            kc(n.route, l, r),
          ]);
        if (c !== void 0) throw c;
        a = p;
      } else if ((await kc(n.route, l, r), (f = n.route[e]), f)) a = await s(f);
      else if (e === "action") {
        let c = new URL(t.url),
          p = c.pathname + c.search;
        throw Ue(405, { method: t.method, pathname: p, routeId: n.route.id });
      } else return { type: ee.data, result: void 0 };
    else if (f) a = await s(f);
    else {
      let c = new URL(t.url),
        p = c.pathname + c.search;
      throw Ue(404, { pathname: p });
    }
    j(
      a.result !== void 0,
      "You defined " +
        (e === "action" ? "an action" : "a loader") +
        " for route " +
        ('"' +
          n.route.id +
          "\" but didn't return anything from your `" +
          e +
          "` ") +
        "function. Please return a value or `null`."
    );
  } catch (f) {
    return { type: ee.error, result: f };
  } finally {
    u && t.signal.removeEventListener("abort", u);
  }
  return a;
}
async function uy(e) {
  let { result: t, type: n } = e;
  if (pp(t)) {
    let s;
    try {
      let f = t.headers.get("Content-Type");
      f && /\bapplication\/json\b/.test(f)
        ? t.body == null
          ? (s = null)
          : (s = await t.json())
        : (s = await t.text());
    } catch (f) {
      return { type: ee.error, error: f };
    }
    return n === ee.error
      ? {
          type: ee.error,
          error: new kl(t.status, t.statusText, s),
          statusCode: t.status,
          headers: t.headers,
        }
      : { type: ee.data, data: s, statusCode: t.status, headers: t.headers };
  }
  if (n === ee.error) {
    if (Dc(t)) {
      var r;
      if (t.data instanceof Error) {
        var l;
        return {
          type: ee.error,
          error: t.data,
          statusCode: (l = t.init) == null ? void 0 : l.status,
        };
      }
      t = new kl(
        ((r = t.init) == null ? void 0 : r.status) || 500,
        void 0,
        t.data
      );
    }
    return { type: ee.error, error: t, statusCode: Dl(t) ? t.status : void 0 };
  }
  if (hy(t)) {
    var o, i;
    return {
      type: ee.deferred,
      deferredData: t,
      statusCode: (o = t.init) == null ? void 0 : o.status,
      headers:
        ((i = t.init) == null ? void 0 : i.headers) &&
        new Headers(t.init.headers),
    };
  }
  if (Dc(t)) {
    var a, u;
    return {
      type: ee.data,
      data: t.data,
      statusCode: (a = t.init) == null ? void 0 : a.status,
      headers:
        (u = t.init) != null && u.headers
          ? new Headers(t.init.headers)
          : void 0,
    };
  }
  return { type: ee.data, data: t };
}
function sy(e, t, n, r, l, o) {
  let i = e.headers.get("Location");
  if (
    (j(
      i,
      "Redirects returned/thrown from loaders/actions must have a Location header"
    ),
    !Bu.test(i))
  ) {
    let a = r.slice(0, r.findIndex((u) => u.route.id === n) + 1);
    (i = Ha(new URL(t.url), a, l, !0, i, o)), e.headers.set("Location", i);
  }
  return e;
}
function xc(e, t, n) {
  if (Bu.test(e)) {
    let r = e,
      l = r.startsWith("//") ? new URL(t.protocol + r) : new URL(r),
      o = Xe(l.pathname, n) != null;
    if (l.origin === t.origin && o) return l.pathname + l.search + l.hash;
  }
  return e;
}
function Xn(e, t, n, r) {
  let l = e.createURL(dp(t)).toString(),
    o = { signal: n };
  if (r && gt(r.formMethod)) {
    let { formMethod: i, formEncType: a } = r;
    (o.method = i.toUpperCase()),
      a === "application/json"
        ? ((o.headers = new Headers({ "Content-Type": a })),
          (o.body = JSON.stringify(r.json)))
        : a === "text/plain"
        ? (o.body = r.text)
        : a === "application/x-www-form-urlencoded" && r.formData
        ? (o.body = Va(r.formData))
        : (o.body = r.formData);
  }
  return new Request(l, o);
}
function Va(e) {
  let t = new URLSearchParams();
  for (let [n, r] of e.entries())
    t.append(n, typeof r == "string" ? r : r.name);
  return t;
}
function Cc(e) {
  let t = new FormData();
  for (let [n, r] of e.entries()) t.append(n, r);
  return t;
}
function cy(e, t, n, r, l, o) {
  let i = {},
    a = null,
    u,
    s = !1,
    f = {},
    c = r && qe(r[1]) ? r[1].error : void 0;
  return (
    n.forEach((p, S) => {
      let E = t[S].route.id;
      if (
        (j(!Nn(p), "Cannot handle redirect results in processLoaderData"),
        qe(p))
      ) {
        let k = p.error;
        c !== void 0 && ((k = c), (c = void 0)), (a = a || {});
        {
          let P = ur(e, E);
          a[P.route.id] == null && (a[P.route.id] = k);
        }
        (i[E] = void 0),
          s || ((s = !0), (u = Dl(p.error) ? p.error.status : 500)),
          p.headers && (f[E] = p.headers);
      } else
        Dn(p)
          ? (l.set(E, p.deferredData),
            (i[E] = p.deferredData.data),
            p.statusCode != null &&
              p.statusCode !== 200 &&
              !s &&
              (u = p.statusCode),
            p.headers && (f[E] = p.headers))
          : ((i[E] = p.data),
            p.statusCode && p.statusCode !== 200 && !s && (u = p.statusCode),
            p.headers && (f[E] = p.headers));
    }),
    c !== void 0 && r && ((a = { [r[0]]: c }), (i[r[0]] = void 0)),
    { loaderData: i, errors: a, statusCode: u || 200, loaderHeaders: f }
  );
}
function _c(e, t, n, r, l, o, i, a) {
  let { loaderData: u, errors: s } = cy(t, n, r, l, a);
  for (let f = 0; f < o.length; f++) {
    let { key: c, match: p, controller: S } = o[f];
    j(
      i !== void 0 && i[f] !== void 0,
      "Did not find corresponding fetcher result"
    );
    let E = i[f];
    if (!(S && S.signal.aborted))
      if (qe(E)) {
        let k = ur(e.matches, p == null ? void 0 : p.route.id);
        (s && s[k.route.id]) || (s = ae({}, s, { [k.route.id]: E.error })),
          e.fetchers.delete(c);
      } else if (Nn(E)) j(!1, "Unhandled fetcher revalidation redirect");
      else if (Dn(E)) j(!1, "Unhandled fetcher deferred data");
      else {
        let k = qt(E.data);
        e.fetchers.set(c, k);
      }
  }
  return { loaderData: u, errors: s };
}
function Pc(e, t, n, r) {
  let l = ae({}, t);
  for (let o of n) {
    let i = o.route.id;
    if (
      (t.hasOwnProperty(i)
        ? t[i] !== void 0 && (l[i] = t[i])
        : e[i] !== void 0 && o.route.loader && (l[i] = e[i]),
      r && r.hasOwnProperty(i))
    )
      break;
  }
  return l;
}
function Rc(e) {
  return e
    ? qe(e[1])
      ? { actionData: {} }
      : { actionData: { [e[0]]: e[1].data } }
    : {};
}
function ur(e, t) {
  return (
    (t ? e.slice(0, e.findIndex((r) => r.route.id === t) + 1) : [...e])
      .reverse()
      .find((r) => r.route.hasErrorBoundary === !0) || e[0]
  );
}
function Lc(e) {
  let t =
    e.length === 1
      ? e[0]
      : e.find((n) => n.index || !n.path || n.path === "/") || {
          id: "__shim-error-route__",
        };
  return {
    matches: [{ params: {}, pathname: "", pathnameBase: "", route: t }],
    route: t,
  };
}
function Ue(e, t) {
  let {
      pathname: n,
      routeId: r,
      method: l,
      type: o,
      message: i,
    } = t === void 0 ? {} : t,
    a = "Unknown Server Error",
    u = "Unknown @remix-run/router error";
  return (
    e === 400
      ? ((a = "Bad Request"),
        o === "route-discovery"
          ? (u =
              'Unable to match URL "' +
              n +
              '" - the `unstable_patchRoutesOnMiss()` ' +
              (`function threw the following error:
` +
                i))
          : l && n && r
          ? (u =
              "You made a " +
              l +
              ' request to "' +
              n +
              '" but ' +
              ('did not provide a `loader` for route "' + r + '", ') +
              "so there is no way to handle the request.")
          : o === "defer-action"
          ? (u = "defer() is not supported in actions")
          : o === "invalid-body" && (u = "Unable to encode submission body"))
      : e === 403
      ? ((a = "Forbidden"),
        (u = 'Route "' + r + '" does not match URL "' + n + '"'))
      : e === 404
      ? ((a = "Not Found"), (u = 'No route matches URL "' + n + '"'))
      : e === 405 &&
        ((a = "Method Not Allowed"),
        l && n && r
          ? (u =
              "You made a " +
              l.toUpperCase() +
              ' request to "' +
              n +
              '" but ' +
              ('did not provide an `action` for route "' + r + '", ') +
              "so there is no way to handle the request.")
          : l && (u = 'Invalid request method "' + l.toUpperCase() + '"')),
    new kl(e || 500, a, new Error(u), !0)
  );
}
function Tc(e) {
  for (let t = e.length - 1; t >= 0; t--) {
    let n = e[t];
    if (Nn(n)) return { result: n, idx: t };
  }
}
function dp(e) {
  let t = typeof e == "string" ? pt(e) : e;
  return xt(ae({}, t, { hash: "" }));
}
function fy(e, t) {
  return e.pathname !== t.pathname || e.search !== t.search
    ? !1
    : e.hash === ""
    ? t.hash !== ""
    : e.hash === t.hash
    ? !0
    : t.hash !== "";
}
function dy(e) {
  return typeof e == "object" && e != null && "then" in e;
}
function py(e) {
  return pp(e.result) && qv.has(e.result.status);
}
function Dn(e) {
  return e.type === ee.deferred;
}
function qe(e) {
  return e.type === ee.error;
}
function Nn(e) {
  return (e && e.type) === ee.redirect;
}
function Dc(e) {
  return (
    typeof e == "object" &&
    e != null &&
    "type" in e &&
    "data" in e &&
    "init" in e &&
    e.type === "DataWithResponseInit"
  );
}
function hy(e) {
  let t = e;
  return (
    t &&
    typeof t == "object" &&
    typeof t.data == "object" &&
    typeof t.subscribe == "function" &&
    typeof t.cancel == "function" &&
    typeof t.resolveData == "function"
  );
}
function pp(e) {
  return (
    e != null &&
    typeof e.status == "number" &&
    typeof e.statusText == "string" &&
    typeof e.headers == "object" &&
    typeof e.body < "u"
  );
}
function my(e) {
  return Zv.has(e.toLowerCase());
}
function gt(e) {
  return Gv.has(e.toLowerCase());
}
async function Nc(e, t, n, r, l, o) {
  for (let i = 0; i < n.length; i++) {
    let a = n[i],
      u = t[i];
    if (!u) continue;
    let s = e.find((c) => c.route.id === u.route.id),
      f = s != null && !cp(s, u) && (o && o[u.route.id]) !== void 0;
    if (Dn(a) && (l || f)) {
      let c = r[i];
      j(c, "Expected an AbortSignal for revalidating fetcher deferred result"),
        await hp(a, c, l).then((p) => {
          p && (n[i] = p || n[i]);
        });
    }
  }
}
async function hp(e, t, n) {
  if ((n === void 0 && (n = !1), !(await e.deferredData.resolveData(t)))) {
    if (n)
      try {
        return { type: ee.data, data: e.deferredData.unwrappedData };
      } catch (l) {
        return { type: ee.error, error: l };
      }
    return { type: ee.data, data: e.deferredData.data };
  }
}
function Hu(e) {
  return new URLSearchParams(e).getAll("index").some((t) => t === "");
}
function Xr(e, t) {
  let n = typeof t == "string" ? pt(t).search : t.search;
  if (e[e.length - 1].route.index && Hu(n || "")) return e[e.length - 1];
  let r = ip(e);
  return r[r.length - 1];
}
function Mc(e) {
  let {
    formMethod: t,
    formAction: n,
    formEncType: r,
    text: l,
    formData: o,
    json: i,
  } = e;
  if (!(!t || !n || !r)) {
    if (l != null)
      return {
        formMethod: t,
        formAction: n,
        formEncType: r,
        formData: void 0,
        json: void 0,
        text: l,
      };
    if (o != null)
      return {
        formMethod: t,
        formAction: n,
        formEncType: r,
        formData: o,
        json: void 0,
        text: void 0,
      };
    if (i !== void 0)
      return {
        formMethod: t,
        formAction: n,
        formEncType: r,
        formData: void 0,
        json: i,
        text: void 0,
      };
  }
}
function Yi(e, t) {
  return t
    ? {
        state: "loading",
        location: e,
        formMethod: t.formMethod,
        formAction: t.formAction,
        formEncType: t.formEncType,
        formData: t.formData,
        json: t.json,
        text: t.text,
      }
    : {
        state: "loading",
        location: e,
        formMethod: void 0,
        formAction: void 0,
        formEncType: void 0,
        formData: void 0,
        json: void 0,
        text: void 0,
      };
}
function vy(e, t) {
  return {
    state: "submitting",
    location: e,
    formMethod: t.formMethod,
    formAction: t.formAction,
    formEncType: t.formEncType,
    formData: t.formData,
    json: t.json,
    text: t.text,
  };
}
function Hr(e, t) {
  return e
    ? {
        state: "loading",
        formMethod: e.formMethod,
        formAction: e.formAction,
        formEncType: e.formEncType,
        formData: e.formData,
        json: e.json,
        text: e.text,
        data: t,
      }
    : {
        state: "loading",
        formMethod: void 0,
        formAction: void 0,
        formEncType: void 0,
        formData: void 0,
        json: void 0,
        text: void 0,
        data: t,
      };
}
function yy(e, t) {
  return {
    state: "submitting",
    formMethod: e.formMethod,
    formAction: e.formAction,
    formEncType: e.formEncType,
    formData: e.formData,
    json: e.json,
    text: e.text,
    data: t ? t.data : void 0,
  };
}
function qt(e) {
  return {
    state: "idle",
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0,
    data: e,
  };
}
function gy(e, t) {
  try {
    let n = e.sessionStorage.getItem(sp);
    if (n) {
      let r = JSON.parse(n);
      for (let [l, o] of Object.entries(r || {}))
        o && Array.isArray(o) && t.set(l, new Set(o || []));
    }
  } catch {}
}
function wy(e, t) {
  if (t.size > 0) {
    let n = {};
    for (let [r, l] of t) n[r] = [...l];
    try {
      e.sessionStorage.setItem(sp, JSON.stringify(n));
    } catch (r) {
      Kt(
        !1,
        "Failed to save applied view transitions in sessionStorage (" + r + ")."
      );
    }
  }
}
/**
 * React Router v6.26.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function yn() {
  return (
    (yn = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    yn.apply(this, arguments)
  );
}
const Rr = w.createContext(null),
  Nl = w.createContext(null),
  Qo = w.createContext(null),
  lt = w.createContext(null),
  Lr = w.createContext(null),
  ot = w.createContext({ outlet: null, matches: [], isDataRoute: !1 }),
  mp = w.createContext(null);
function vp(e, t) {
  let { relative: n } = t === void 0 ? {} : t;
  kn() || j(!1);
  let { basename: r, navigator: l } = w.useContext(lt),
    { hash: o, pathname: i, search: a } = Tr(e, { relative: n }),
    u = i;
  return (
    r !== "/" && (u = i === "/" ? r : zt([r, i])),
    l.createHref({ pathname: u, search: a, hash: o })
  );
}
function kn() {
  return w.useContext(Lr) != null;
}
function Ct() {
  return kn() || j(!1), w.useContext(Lr).location;
}
function Sy() {
  return w.useContext(Lr).navigationType;
}
function Ey(e) {
  kn() || j(!1);
  let { pathname: t } = Ct();
  return w.useMemo(() => kr(e, lp(t)), [t, e]);
}
function yp(e) {
  w.useContext(lt).static || w.useLayoutEffect(e);
}
function fi() {
  let { isDataRoute: e } = w.useContext(ot);
  return e ? Iy() : ky();
}
function ky() {
  kn() || j(!1);
  let e = w.useContext(Rr),
    { basename: t, future: n, navigator: r } = w.useContext(lt),
    { matches: l } = w.useContext(ot),
    { pathname: o } = Ct(),
    i = JSON.stringify(si(l, n.v7_relativeSplatPath)),
    a = w.useRef(!1);
  return (
    yp(() => {
      a.current = !0;
    }),
    w.useCallback(
      function (s, f) {
        if ((f === void 0 && (f = {}), !a.current)) return;
        if (typeof s == "number") {
          r.go(s);
          return;
        }
        let c = ci(s, JSON.parse(i), o, f.relative === "path");
        e == null &&
          t !== "/" &&
          (c.pathname = c.pathname === "/" ? t : zt([t, c.pathname])),
          (f.replace ? r.replace : r.push)(c, f.state, f);
      },
      [t, r, i, o, e]
    )
  );
}
const gp = w.createContext(null);
function xy() {
  return w.useContext(gp);
}
function wp(e) {
  let t = w.useContext(ot).outlet;
  return t && w.createElement(gp.Provider, { value: e }, t);
}
function Cy() {
  let { matches: e } = w.useContext(ot),
    t = e[e.length - 1];
  return t ? t.params : {};
}
function Tr(e, t) {
  let { relative: n } = t === void 0 ? {} : t,
    { future: r } = w.useContext(lt),
    { matches: l } = w.useContext(ot),
    { pathname: o } = Ct(),
    i = JSON.stringify(si(l, r.v7_relativeSplatPath));
  return w.useMemo(() => ci(e, JSON.parse(i), o, n === "path"), [e, i, o, n]);
}
function Sp(e, t) {
  return Ep(e, t);
}
function Ep(e, t, n, r) {
  kn() || j(!1);
  let { navigator: l } = w.useContext(lt),
    { matches: o } = w.useContext(ot),
    i = o[o.length - 1],
    a = i ? i.params : {};
  i && i.pathname;
  let u = i ? i.pathnameBase : "/";
  i && i.route;
  let s = Ct(),
    f;
  if (t) {
    var c;
    let P = typeof t == "string" ? pt(t) : t;
    u === "/" || ((c = P.pathname) != null && c.startsWith(u)) || j(!1),
      (f = P);
  } else f = s;
  let p = f.pathname || "/",
    S = p;
  if (u !== "/") {
    let P = u.replace(/^\//, "").split("/");
    S = "/" + p.replace(/^\//, "").split("/").slice(P.length).join("/");
  }
  let E = rn(e, { pathname: S }),
    k = kp(
      E &&
        E.map((P) =>
          Object.assign({}, P, {
            params: Object.assign({}, a, P.params),
            pathname: zt([
              u,
              l.encodeLocation
                ? l.encodeLocation(P.pathname).pathname
                : P.pathname,
            ]),
            pathnameBase:
              P.pathnameBase === "/"
                ? u
                : zt([
                    u,
                    l.encodeLocation
                      ? l.encodeLocation(P.pathnameBase).pathname
                      : P.pathnameBase,
                  ]),
          })
        ),
      o,
      n,
      r
    );
  return t && k
    ? w.createElement(
        Lr.Provider,
        {
          value: {
            location: yn(
              {
                pathname: "/",
                search: "",
                hash: "",
                state: null,
                key: "default",
              },
              f
            ),
            navigationType: re.Pop,
          },
        },
        k
      )
    : k;
}
function _y() {
  let e = Pp(),
    t = Dl(e)
      ? e.status + " " + e.statusText
      : e instanceof Error
      ? e.message
      : JSON.stringify(e),
    n = e instanceof Error ? e.stack : null,
    l = { padding: "0.5rem", backgroundColor: "rgba(200,200,200, 0.5)" };
  return w.createElement(
    w.Fragment,
    null,
    w.createElement("h2", null, "Unexpected Application Error!"),
    w.createElement("h3", { style: { fontStyle: "italic" } }, t),
    n ? w.createElement("pre", { style: l }, n) : null,
    null
  );
}
const Py = w.createElement(_y, null);
class Ry extends w.Component {
  constructor(t) {
    super(t),
      (this.state = {
        location: t.location,
        revalidation: t.revalidation,
        error: t.error,
      });
  }
  static getDerivedStateFromError(t) {
    return { error: t };
  }
  static getDerivedStateFromProps(t, n) {
    return n.location !== t.location ||
      (n.revalidation !== "idle" && t.revalidation === "idle")
      ? { error: t.error, location: t.location, revalidation: t.revalidation }
      : {
          error: t.error !== void 0 ? t.error : n.error,
          location: n.location,
          revalidation: t.revalidation || n.revalidation,
        };
  }
  componentDidCatch(t, n) {
    console.error(
      "React Router caught the following error during render",
      t,
      n
    );
  }
  render() {
    return this.state.error !== void 0
      ? w.createElement(
          ot.Provider,
          { value: this.props.routeContext },
          w.createElement(mp.Provider, {
            value: this.state.error,
            children: this.props.component,
          })
        )
      : this.props.children;
  }
}
function Ly(e) {
  let { routeContext: t, match: n, children: r } = e,
    l = w.useContext(Rr);
  return (
    l &&
      l.static &&
      l.staticContext &&
      (n.route.errorElement || n.route.ErrorBoundary) &&
      (l.staticContext._deepestRenderedBoundaryId = n.route.id),
    w.createElement(ot.Provider, { value: t }, r)
  );
}
function kp(e, t, n, r) {
  var l;
  if (
    (t === void 0 && (t = []),
    n === void 0 && (n = null),
    r === void 0 && (r = null),
    e == null)
  ) {
    var o;
    if (!n) return null;
    if (n.errors) e = n.matches;
    else if (
      (o = r) != null &&
      o.v7_partialHydration &&
      t.length === 0 &&
      !n.initialized &&
      n.matches.length > 0
    )
      e = n.matches;
    else return null;
  }
  let i = e,
    a = (l = n) == null ? void 0 : l.errors;
  if (a != null) {
    let f = i.findIndex(
      (c) => c.route.id && (a == null ? void 0 : a[c.route.id]) !== void 0
    );
    f >= 0 || j(!1), (i = i.slice(0, Math.min(i.length, f + 1)));
  }
  let u = !1,
    s = -1;
  if (n && r && r.v7_partialHydration)
    for (let f = 0; f < i.length; f++) {
      let c = i[f];
      if (
        ((c.route.HydrateFallback || c.route.hydrateFallbackElement) && (s = f),
        c.route.id)
      ) {
        let { loaderData: p, errors: S } = n,
          E =
            c.route.loader &&
            p[c.route.id] === void 0 &&
            (!S || S[c.route.id] === void 0);
        if (c.route.lazy || E) {
          (u = !0), s >= 0 ? (i = i.slice(0, s + 1)) : (i = [i[0]]);
          break;
        }
      }
    }
  return i.reduceRight((f, c, p) => {
    let S,
      E = !1,
      k = null,
      P = null;
    n &&
      ((S = a && c.route.id ? a[c.route.id] : void 0),
      (k = c.route.errorElement || Py),
      u &&
        (s < 0 && p === 0
          ? ((E = !0), (P = null))
          : s === p &&
            ((E = !0), (P = c.route.hydrateFallbackElement || null))));
    let h = t.concat(i.slice(0, p + 1)),
      d = () => {
        let m;
        return (
          S
            ? (m = k)
            : E
            ? (m = P)
            : c.route.Component
            ? (m = w.createElement(c.route.Component, null))
            : c.route.element
            ? (m = c.route.element)
            : (m = f),
          w.createElement(Ly, {
            match: c,
            routeContext: { outlet: f, matches: h, isDataRoute: n != null },
            children: m,
          })
        );
      };
    return n && (c.route.ErrorBoundary || c.route.errorElement || p === 0)
      ? w.createElement(Ry, {
          location: n.location,
          revalidation: n.revalidation,
          component: k,
          error: S,
          children: d(),
          routeContext: { outlet: null, matches: h, isDataRoute: !0 },
        })
      : d();
  }, null);
}
var di = (function (e) {
    return (
      (e.UseBlocker = "useBlocker"),
      (e.UseRevalidator = "useRevalidator"),
      (e.UseNavigateStable = "useNavigate"),
      e
    );
  })(di || {}),
  Ge = (function (e) {
    return (
      (e.UseBlocker = "useBlocker"),
      (e.UseLoaderData = "useLoaderData"),
      (e.UseActionData = "useActionData"),
      (e.UseRouteError = "useRouteError"),
      (e.UseNavigation = "useNavigation"),
      (e.UseRouteLoaderData = "useRouteLoaderData"),
      (e.UseMatches = "useMatches"),
      (e.UseRevalidator = "useRevalidator"),
      (e.UseNavigateStable = "useNavigate"),
      (e.UseRouteId = "useRouteId"),
      e
    );
  })(Ge || {});
function Vu(e) {
  let t = w.useContext(Rr);
  return t || j(!1), t;
}
function xn(e) {
  let t = w.useContext(Nl);
  return t || j(!1), t;
}
function Ty(e) {
  let t = w.useContext(ot);
  return t || j(!1), t;
}
function Ml(e) {
  let t = Ty(),
    n = t.matches[t.matches.length - 1];
  return n.route.id || j(!1), n.route.id;
}
function xp() {
  return Ml(Ge.UseRouteId);
}
function Cp() {
  return xn(Ge.UseNavigation).navigation;
}
function Dy() {
  let e = Vu(di.UseRevalidator),
    t = xn(Ge.UseRevalidator);
  return w.useMemo(
    () => ({ revalidate: e.router.revalidate, state: t.revalidation }),
    [e.router.revalidate, t.revalidation]
  );
}
function _p() {
  let { matches: e, loaderData: t } = xn(Ge.UseMatches);
  return w.useMemo(() => e.map((n) => tp(n, t)), [e, t]);
}
function Ny() {
  let e = xn(Ge.UseLoaderData),
    t = Ml(Ge.UseLoaderData);
  if (e.errors && e.errors[t] != null) {
    console.error(
      "You cannot `useLoaderData` in an errorElement (routeId: " + t + ")"
    );
    return;
  }
  return e.loaderData[t];
}
function My(e) {
  return xn(Ge.UseRouteLoaderData).loaderData[e];
}
function zy() {
  let e = xn(Ge.UseActionData),
    t = Ml(Ge.UseLoaderData);
  return e.actionData ? e.actionData[t] : void 0;
}
function Pp() {
  var e;
  let t = w.useContext(mp),
    n = xn(Ge.UseRouteError),
    r = Ml(Ge.UseRouteError);
  return t !== void 0 ? t : (e = n.errors) == null ? void 0 : e[r];
}
function Rp() {
  let e = w.useContext(Qo);
  return e == null ? void 0 : e._data;
}
function Fy() {
  let e = w.useContext(Qo);
  return e == null ? void 0 : e._error;
}
let Oy = 0;
function Lp(e) {
  let { router: t, basename: n } = Vu(di.UseBlocker),
    r = xn(Ge.UseBlocker),
    [l, o] = w.useState(""),
    i = w.useCallback(
      (a) => {
        if (typeof e != "function") return !!e;
        if (n === "/") return e(a);
        let { currentLocation: u, nextLocation: s, historyAction: f } = a;
        return e({
          currentLocation: yn({}, u, {
            pathname: Xe(u.pathname, n) || u.pathname,
          }),
          nextLocation: yn({}, s, {
            pathname: Xe(s.pathname, n) || s.pathname,
          }),
          historyAction: f,
        });
      },
      [n, e]
    );
  return (
    w.useEffect(() => {
      let a = String(++Oy);
      return o(a), () => t.deleteBlocker(a);
    }, [t]),
    w.useEffect(() => {
      l !== "" && t.getBlocker(l, i);
    }, [t, l, i]),
    l && r.blockers.has(l) ? r.blockers.get(l) : Gn
  );
}
function Iy() {
  let { router: e } = Vu(di.UseNavigateStable),
    t = Ml(Ge.UseNavigateStable),
    n = w.useRef(!1);
  return (
    yp(() => {
      n.current = !0;
    }),
    w.useCallback(
      function (l, o) {
        o === void 0 && (o = {}),
          n.current &&
            (typeof l == "number"
              ? e.navigate(l)
              : e.navigate(l, yn({ fromRouteId: t }, o)));
      },
      [e, t]
    )
  );
}
const Uy = "startTransition",
  zc = Xa[Uy];
function jy(e) {
  let {
      basename: t,
      children: n,
      initialEntries: r,
      initialIndex: l,
      future: o,
    } = e,
    i = w.useRef();
  i.current == null &&
    (i.current = Zd({ initialEntries: r, initialIndex: l, v5Compat: !0 }));
  let a = i.current,
    [u, s] = w.useState({ action: a.action, location: a.location }),
    { v7_startTransition: f } = o || {},
    c = w.useCallback(
      (p) => {
        f && zc ? zc(() => s(p)) : s(p);
      },
      [s, f]
    );
  return (
    w.useLayoutEffect(() => a.listen(c), [a, c]),
    w.createElement(Dr, {
      basename: t,
      children: n,
      location: u.location,
      navigationType: u.action,
      navigator: a,
      future: o,
    })
  );
}
function Ay(e) {
  let { to: t, replace: n, state: r, relative: l } = e;
  kn() || j(!1);
  let { future: o, static: i } = w.useContext(lt),
    { matches: a } = w.useContext(ot),
    { pathname: u } = Ct(),
    s = fi(),
    f = ci(t, si(a, o.v7_relativeSplatPath), u, l === "path"),
    c = JSON.stringify(f);
  return (
    w.useEffect(
      () => s(JSON.parse(c), { replace: n, state: r, relative: l }),
      [s, c, l, n, r]
    ),
    null
  );
}
function By(e) {
  return wp(e.context);
}
function Tp(e) {
  j(!1);
}
function Dr(e) {
  let {
    basename: t = "/",
    children: n = null,
    location: r,
    navigationType: l = re.Pop,
    navigator: o,
    static: i = !1,
    future: a,
  } = e;
  kn() && j(!1);
  let u = t.replace(/^\/*/, "/"),
    s = w.useMemo(
      () => ({
        basename: u,
        navigator: o,
        static: i,
        future: yn({ v7_relativeSplatPath: !1 }, a),
      }),
      [u, a, o, i]
    );
  typeof r == "string" && (r = pt(r));
  let {
      pathname: f = "/",
      search: c = "",
      hash: p = "",
      state: S = null,
      key: E = "default",
    } = r,
    k = w.useMemo(() => {
      let P = Xe(f, u);
      return P == null
        ? null
        : {
            location: { pathname: P, search: c, hash: p, state: S, key: E },
            navigationType: l,
          };
    }, [u, f, c, p, S, E, l]);
  return k == null
    ? null
    : w.createElement(
        lt.Provider,
        { value: s },
        w.createElement(Lr.Provider, { children: n, value: k })
      );
}
function $y(e) {
  let { children: t, location: n } = e;
  return Sp(xl(t), n);
}
function Hy(e) {
  let { children: t, errorElement: n, resolve: r } = e;
  return w.createElement(
    Wy,
    { resolve: r, errorElement: n },
    w.createElement(Ky, null, t)
  );
}
var it = (function (e) {
  return (
    (e[(e.pending = 0)] = "pending"),
    (e[(e.success = 1)] = "success"),
    (e[(e.error = 2)] = "error"),
    e
  );
})(it || {});
const Vy = new Promise(() => {});
class Wy extends w.Component {
  constructor(t) {
    super(t), (this.state = { error: null });
  }
  static getDerivedStateFromError(t) {
    return { error: t };
  }
  componentDidCatch(t, n) {
    console.error("<Await> caught the following error during render", t, n);
  }
  render() {
    let { children: t, errorElement: n, resolve: r } = this.props,
      l = null,
      o = it.pending;
    if (!(r instanceof Promise))
      (o = it.success),
        (l = Promise.resolve()),
        Object.defineProperty(l, "_tracked", { get: () => !0 }),
        Object.defineProperty(l, "_data", { get: () => r });
    else if (this.state.error) {
      o = it.error;
      let i = this.state.error;
      (l = Promise.reject().catch(() => {})),
        Object.defineProperty(l, "_tracked", { get: () => !0 }),
        Object.defineProperty(l, "_error", { get: () => i });
    } else
      r._tracked
        ? ((l = r),
          (o =
            "_error" in l ? it.error : "_data" in l ? it.success : it.pending))
        : ((o = it.pending),
          Object.defineProperty(r, "_tracked", { get: () => !0 }),
          (l = r.then(
            (i) => Object.defineProperty(r, "_data", { get: () => i }),
            (i) => Object.defineProperty(r, "_error", { get: () => i })
          )));
    if (o === it.error && l._error instanceof Ko) throw Vy;
    if (o === it.error && !n) throw l._error;
    if (o === it.error)
      return w.createElement(Qo.Provider, { value: l, children: n });
    if (o === it.success)
      return w.createElement(Qo.Provider, { value: l, children: t });
    throw l;
  }
}
function Ky(e) {
  let { children: t } = e,
    n = Rp(),
    r = typeof t == "function" ? t(n) : t;
  return w.createElement(w.Fragment, null, r);
}
function xl(e, t) {
  t === void 0 && (t = []);
  let n = [];
  return (
    w.Children.forEach(e, (r, l) => {
      if (!w.isValidElement(r)) return;
      let o = [...t, l];
      if (r.type === w.Fragment) {
        n.push.apply(n, xl(r.props.children, o));
        return;
      }
      r.type !== Tp && j(!1), !r.props.index || !r.props.children || j(!1);
      let i = {
        id: r.props.id || o.join("-"),
        caseSensitive: r.props.caseSensitive,
        element: r.props.element,
        Component: r.props.Component,
        index: r.props.index,
        path: r.props.path,
        loader: r.props.loader,
        action: r.props.action,
        errorElement: r.props.errorElement,
        ErrorBoundary: r.props.ErrorBoundary,
        hasErrorBoundary:
          r.props.ErrorBoundary != null || r.props.errorElement != null,
        shouldRevalidate: r.props.shouldRevalidate,
        handle: r.props.handle,
        lazy: r.props.lazy,
      };
      r.props.children && (i.children = xl(r.props.children, o)), n.push(i);
    }),
    n
  );
}
function Qy(e) {
  return kp(e);
}
function Wu(e) {
  let t = {
    hasErrorBoundary: e.ErrorBoundary != null || e.errorElement != null,
  };
  return (
    e.Component &&
      Object.assign(t, {
        element: w.createElement(e.Component),
        Component: void 0,
      }),
    e.HydrateFallback &&
      Object.assign(t, {
        hydrateFallbackElement: w.createElement(e.HydrateFallback),
        HydrateFallback: void 0,
      }),
    e.ErrorBoundary &&
      Object.assign(t, {
        errorElement: w.createElement(e.ErrorBoundary),
        ErrorBoundary: void 0,
      }),
    t
  );
}
function Yy(e, t) {
  return $u({
    basename: t == null ? void 0 : t.basename,
    future: yn({}, t == null ? void 0 : t.future, { v7_prependBasename: !0 }),
    history: Zd({
      initialEntries: t == null ? void 0 : t.initialEntries,
      initialIndex: t == null ? void 0 : t.initialIndex,
    }),
    hydrationData: t == null ? void 0 : t.hydrationData,
    routes: e,
    mapRouteProperties: Wu,
    unstable_dataStrategy: t == null ? void 0 : t.unstable_dataStrategy,
    unstable_patchRoutesOnMiss:
      t == null ? void 0 : t.unstable_patchRoutesOnMiss,
  }).initialize();
}
/**
 * React Router DOM v6.26.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function Ye() {
  return (
    (Ye = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    Ye.apply(this, arguments)
  );
}
function Ku(e, t) {
  if (e == null) return {};
  var n = {},
    r = Object.keys(e),
    l,
    o;
  for (o = 0; o < r.length; o++)
    (l = r[o]), !(t.indexOf(l) >= 0) && (n[l] = e[l]);
  return n;
}
const So = "get",
  Xi = "application/x-www-form-urlencoded";
function pi(e) {
  return e != null && typeof e.tagName == "string";
}
function Xy(e) {
  return pi(e) && e.tagName.toLowerCase() === "button";
}
function Gy(e) {
  return pi(e) && e.tagName.toLowerCase() === "form";
}
function Jy(e) {
  return pi(e) && e.tagName.toLowerCase() === "input";
}
function Zy(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function qy(e, t) {
  return e.button === 0 && (!t || t === "_self") && !Zy(e);
}
function Yo(e) {
  return (
    e === void 0 && (e = ""),
    new URLSearchParams(
      typeof e == "string" || Array.isArray(e) || e instanceof URLSearchParams
        ? e
        : Object.keys(e).reduce((t, n) => {
            let r = e[n];
            return t.concat(Array.isArray(r) ? r.map((l) => [n, l]) : [[n, r]]);
          }, [])
    )
  );
}
function by(e, t) {
  let n = Yo(e);
  return (
    t &&
      t.forEach((r, l) => {
        n.has(l) ||
          t.getAll(l).forEach((o) => {
            n.append(l, o);
          });
      }),
    n
  );
}
let lo = null;
function eg() {
  if (lo === null)
    try {
      new FormData(document.createElement("form"), 0), (lo = !1);
    } catch {
      lo = !0;
    }
  return lo;
}
const tg = new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain",
]);
function Gi(e) {
  return e != null && !tg.has(e) ? null : e;
}
function ng(e, t) {
  let n, r, l, o, i;
  if (Gy(e)) {
    let a = e.getAttribute("action");
    (r = a ? Xe(a, t) : null),
      (n = e.getAttribute("method") || So),
      (l = Gi(e.getAttribute("enctype")) || Xi),
      (o = new FormData(e));
  } else if (Xy(e) || (Jy(e) && (e.type === "submit" || e.type === "image"))) {
    let a = e.form;
    if (a == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>'
      );
    let u = e.getAttribute("formaction") || a.getAttribute("action");
    if (
      ((r = u ? Xe(u, t) : null),
      (n = e.getAttribute("formmethod") || a.getAttribute("method") || So),
      (l =
        Gi(e.getAttribute("formenctype")) ||
        Gi(a.getAttribute("enctype")) ||
        Xi),
      (o = new FormData(a, e)),
      !eg())
    ) {
      let { name: s, type: f, value: c } = e;
      if (f === "image") {
        let p = s ? s + "." : "";
        o.append(p + "x", "0"), o.append(p + "y", "0");
      } else s && o.append(s, c);
    }
  } else {
    if (pi(e))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    (n = So), (r = null), (l = Xi), (i = e);
  }
  return (
    o && l === "text/plain" && ((i = o), (o = void 0)),
    { action: r, method: n.toLowerCase(), encType: l, formData: o, body: i }
  );
}
const rg = [
    "onClick",
    "relative",
    "reloadDocument",
    "replace",
    "state",
    "target",
    "to",
    "preventScrollReset",
    "unstable_viewTransition",
  ],
  lg = [
    "aria-current",
    "caseSensitive",
    "className",
    "end",
    "style",
    "to",
    "unstable_viewTransition",
    "children",
  ],
  og = [
    "fetcherKey",
    "navigate",
    "reloadDocument",
    "replace",
    "state",
    "method",
    "action",
    "onSubmit",
    "relative",
    "preventScrollReset",
    "unstable_viewTransition",
  ],
  ig = "6";
try {
  window.__reactRouterVersion = ig;
} catch {}
function ag(e, t) {
  return $u({
    basename: t == null ? void 0 : t.basename,
    future: Ye({}, t == null ? void 0 : t.future, { v7_prependBasename: !0 }),
    history: qd({ window: t == null ? void 0 : t.window }),
    hydrationData: (t == null ? void 0 : t.hydrationData) || Dp(),
    routes: e,
    mapRouteProperties: Wu,
    unstable_dataStrategy: t == null ? void 0 : t.unstable_dataStrategy,
    unstable_patchRoutesOnMiss:
      t == null ? void 0 : t.unstable_patchRoutesOnMiss,
    window: t == null ? void 0 : t.window,
  }).initialize();
}
function ug(e, t) {
  return $u({
    basename: t == null ? void 0 : t.basename,
    future: Ye({}, t == null ? void 0 : t.future, { v7_prependBasename: !0 }),
    history: bd({ window: t == null ? void 0 : t.window }),
    hydrationData: (t == null ? void 0 : t.hydrationData) || Dp(),
    routes: e,
    mapRouteProperties: Wu,
    unstable_dataStrategy: t == null ? void 0 : t.unstable_dataStrategy,
    unstable_patchRoutesOnMiss:
      t == null ? void 0 : t.unstable_patchRoutesOnMiss,
    window: t == null ? void 0 : t.window,
  }).initialize();
}
function Dp() {
  var e;
  let t = (e = window) == null ? void 0 : e.__staticRouterHydrationData;
  return t && t.errors && (t = Ye({}, t, { errors: sg(t.errors) })), t;
}
function sg(e) {
  if (!e) return null;
  let t = Object.entries(e),
    n = {};
  for (let [r, l] of t)
    if (l && l.__type === "RouteErrorResponse")
      n[r] = new kl(l.status, l.statusText, l.data, l.internal === !0);
    else if (l && l.__type === "Error") {
      if (l.__subType) {
        let o = window[l.__subType];
        if (typeof o == "function")
          try {
            let i = new o(l.message);
            (i.stack = ""), (n[r] = i);
          } catch {}
      }
      if (n[r] == null) {
        let o = new Error(l.message);
        (o.stack = ""), (n[r] = o);
      }
    } else n[r] = l;
  return n;
}
const Qu = w.createContext({ isTransitioning: !1 }),
  Yu = w.createContext(new Map()),
  cg = "startTransition",
  gn = Xa[cg],
  fg = "flushSync",
  Fc = kv[fg],
  dg = "useId",
  Oc = Xa[dg];
function pg(e) {
  gn ? gn(e) : e();
}
function Vr(e) {
  Fc ? Fc(e) : e();
}
class hg {
  constructor() {
    (this.status = "pending"),
      (this.promise = new Promise((t, n) => {
        (this.resolve = (r) => {
          this.status === "pending" && ((this.status = "resolved"), t(r));
        }),
          (this.reject = (r) => {
            this.status === "pending" && ((this.status = "rejected"), n(r));
          });
      }));
  }
}
function mg(e) {
  let { fallbackElement: t, router: n, future: r } = e,
    [l, o] = w.useState(n.state),
    [i, a] = w.useState(),
    [u, s] = w.useState({ isTransitioning: !1 }),
    [f, c] = w.useState(),
    [p, S] = w.useState(),
    [E, k] = w.useState(),
    P = w.useRef(new Map()),
    { v7_startTransition: h } = r || {},
    d = w.useCallback(
      (T) => {
        h ? pg(T) : T();
      },
      [h]
    ),
    m = w.useCallback(
      (T, I) => {
        let {
          deletedFetchers: O,
          unstable_flushSync: Y,
          unstable_viewTransitionOpts: se,
        } = I;
        O.forEach((ne) => P.current.delete(ne)),
          T.fetchers.forEach((ne, _t) => {
            ne.data !== void 0 && P.current.set(_t, ne.data);
          });
        let xe =
          n.window == null ||
          n.window.document == null ||
          typeof n.window.document.startViewTransition != "function";
        if (!se || xe) {
          Y ? Vr(() => o(T)) : d(() => o(T));
          return;
        }
        if (Y) {
          Vr(() => {
            p && (f && f.resolve(), p.skipTransition()),
              s({
                isTransitioning: !0,
                flushSync: !0,
                currentLocation: se.currentLocation,
                nextLocation: se.nextLocation,
              });
          });
          let ne = n.window.document.startViewTransition(() => {
            Vr(() => o(T));
          });
          ne.finished.finally(() => {
            Vr(() => {
              c(void 0), S(void 0), a(void 0), s({ isTransitioning: !1 });
            });
          }),
            Vr(() => S(ne));
          return;
        }
        p
          ? (f && f.resolve(),
            p.skipTransition(),
            k({
              state: T,
              currentLocation: se.currentLocation,
              nextLocation: se.nextLocation,
            }))
          : (a(T),
            s({
              isTransitioning: !0,
              flushSync: !1,
              currentLocation: se.currentLocation,
              nextLocation: se.nextLocation,
            }));
      },
      [n.window, p, f, P, d]
    );
  w.useLayoutEffect(() => n.subscribe(m), [n, m]),
    w.useEffect(() => {
      u.isTransitioning && !u.flushSync && c(new hg());
    }, [u]),
    w.useEffect(() => {
      if (f && i && n.window) {
        let T = i,
          I = f.promise,
          O = n.window.document.startViewTransition(async () => {
            d(() => o(T)), await I;
          });
        O.finished.finally(() => {
          c(void 0), S(void 0), a(void 0), s({ isTransitioning: !1 });
        }),
          S(O);
      }
    }, [d, i, f, n.window]),
    w.useEffect(() => {
      f && i && l.location.key === i.location.key && f.resolve();
    }, [f, p, l.location, i]),
    w.useEffect(() => {
      !u.isTransitioning &&
        E &&
        (a(E.state),
        s({
          isTransitioning: !0,
          flushSync: !1,
          currentLocation: E.currentLocation,
          nextLocation: E.nextLocation,
        }),
        k(void 0));
    }, [u.isTransitioning, E]),
    w.useEffect(() => {}, []);
  let C = w.useMemo(
      () => ({
        createHref: n.createHref,
        encodeLocation: n.encodeLocation,
        go: (T) => n.navigate(T),
        push: (T, I, O) =>
          n.navigate(T, {
            state: I,
            preventScrollReset: O == null ? void 0 : O.preventScrollReset,
          }),
        replace: (T, I, O) =>
          n.navigate(T, {
            replace: !0,
            state: I,
            preventScrollReset: O == null ? void 0 : O.preventScrollReset,
          }),
      }),
      [n]
    ),
    L = n.basename || "/",
    y = w.useMemo(
      () => ({ router: n, navigator: C, static: !1, basename: L }),
      [n, C, L]
    ),
    N = w.useMemo(
      () => ({ v7_relativeSplatPath: n.future.v7_relativeSplatPath }),
      [n.future.v7_relativeSplatPath]
    );
  return w.createElement(
    w.Fragment,
    null,
    w.createElement(
      Rr.Provider,
      { value: y },
      w.createElement(
        Nl.Provider,
        { value: l },
        w.createElement(
          Yu.Provider,
          { value: P.current },
          w.createElement(
            Qu.Provider,
            { value: u },
            w.createElement(
              Dr,
              {
                basename: L,
                location: l.location,
                navigationType: l.historyAction,
                navigator: C,
                future: N,
              },
              l.initialized || n.future.v7_partialHydration
                ? w.createElement(vg, {
                    routes: n.routes,
                    future: n.future,
                    state: l,
                  })
                : t
            )
          )
        )
      )
    ),
    null
  );
}
const vg = w.memo(yg);
function yg(e) {
  let { routes: t, future: n, state: r } = e;
  return Ep(t, void 0, r, n);
}
function gg(e) {
  let { basename: t, children: n, future: r, window: l } = e,
    o = w.useRef();
  o.current == null && (o.current = qd({ window: l, v5Compat: !0 }));
  let i = o.current,
    [a, u] = w.useState({ action: i.action, location: i.location }),
    { v7_startTransition: s } = r || {},
    f = w.useCallback(
      (c) => {
        s && gn ? gn(() => u(c)) : u(c);
      },
      [u, s]
    );
  return (
    w.useLayoutEffect(() => i.listen(f), [i, f]),
    w.createElement(Dr, {
      basename: t,
      children: n,
      location: a.location,
      navigationType: a.action,
      navigator: i,
      future: r,
    })
  );
}
function wg(e) {
  let { basename: t, children: n, future: r, window: l } = e,
    o = w.useRef();
  o.current == null && (o.current = bd({ window: l, v5Compat: !0 }));
  let i = o.current,
    [a, u] = w.useState({ action: i.action, location: i.location }),
    { v7_startTransition: s } = r || {},
    f = w.useCallback(
      (c) => {
        s && gn ? gn(() => u(c)) : u(c);
      },
      [u, s]
    );
  return (
    w.useLayoutEffect(() => i.listen(f), [i, f]),
    w.createElement(Dr, {
      basename: t,
      children: n,
      location: a.location,
      navigationType: a.action,
      navigator: i,
      future: r,
    })
  );
}
function Sg(e) {
  let { basename: t, children: n, future: r, history: l } = e,
    [o, i] = w.useState({ action: l.action, location: l.location }),
    { v7_startTransition: a } = r || {},
    u = w.useCallback(
      (s) => {
        a && gn ? gn(() => i(s)) : i(s);
      },
      [i, a]
    );
  return (
    w.useLayoutEffect(() => l.listen(u), [l, u]),
    w.createElement(Dr, {
      basename: t,
      children: n,
      location: o.location,
      navigationType: o.action,
      navigator: l,
      future: r,
    })
  );
}
const Eg =
    typeof window < "u" &&
    typeof window.document < "u" &&
    typeof window.document.createElement < "u",
  kg = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  Np = w.forwardRef(function (t, n) {
    let {
        onClick: r,
        relative: l,
        reloadDocument: o,
        replace: i,
        state: a,
        target: u,
        to: s,
        preventScrollReset: f,
        unstable_viewTransition: c,
      } = t,
      p = Ku(t, rg),
      { basename: S } = w.useContext(lt),
      E,
      k = !1;
    if (typeof s == "string" && kg.test(s) && ((E = s), Eg))
      try {
        let m = new URL(window.location.href),
          C = s.startsWith("//") ? new URL(m.protocol + s) : new URL(s),
          L = Xe(C.pathname, S);
        C.origin === m.origin && L != null
          ? (s = L + C.search + C.hash)
          : (k = !0);
      } catch {}
    let P = vp(s, { relative: l }),
      h = zp(s, {
        replace: i,
        state: a,
        target: u,
        preventScrollReset: f,
        relative: l,
        unstable_viewTransition: c,
      });
    function d(m) {
      r && r(m), m.defaultPrevented || h(m);
    }
    return w.createElement(
      "a",
      Ye({}, p, { href: E || P, onClick: k || o ? r : d, ref: n, target: u })
    );
  }),
  xg = w.forwardRef(function (t, n) {
    let {
        "aria-current": r = "page",
        caseSensitive: l = !1,
        className: o = "",
        end: i = !1,
        style: a,
        to: u,
        unstable_viewTransition: s,
        children: f,
      } = t,
      c = Ku(t, lg),
      p = Tr(u, { relative: c.relative }),
      S = Ct(),
      E = w.useContext(Nl),
      { navigator: k, basename: P } = w.useContext(lt),
      h = E != null && Up(p) && s === !0,
      d = k.encodeLocation ? k.encodeLocation(p).pathname : p.pathname,
      m = S.pathname,
      C =
        E && E.navigation && E.navigation.location
          ? E.navigation.location.pathname
          : null;
    l ||
      ((m = m.toLowerCase()),
      (C = C ? C.toLowerCase() : null),
      (d = d.toLowerCase())),
      C && P && (C = Xe(C, P) || C);
    const L = d !== "/" && d.endsWith("/") ? d.length - 1 : d.length;
    let y = m === d || (!i && m.startsWith(d) && m.charAt(L) === "/"),
      N =
        C != null &&
        (C === d || (!i && C.startsWith(d) && C.charAt(d.length) === "/")),
      T = { isActive: y, isPending: N, isTransitioning: h },
      I = y ? r : void 0,
      O;
    typeof o == "function"
      ? (O = o(T))
      : (O = [
          o,
          y ? "active" : null,
          N ? "pending" : null,
          h ? "transitioning" : null,
        ]
          .filter(Boolean)
          .join(" "));
    let Y = typeof a == "function" ? a(T) : a;
    return w.createElement(
      Np,
      Ye({}, c, {
        "aria-current": I,
        className: O,
        ref: n,
        style: Y,
        to: u,
        unstable_viewTransition: s,
      }),
      typeof f == "function" ? f(T) : f
    );
  }),
  Mp = w.forwardRef((e, t) => {
    let {
        fetcherKey: n,
        navigate: r,
        reloadDocument: l,
        replace: o,
        state: i,
        method: a = So,
        action: u,
        onSubmit: s,
        relative: f,
        preventScrollReset: c,
        unstable_viewTransition: p,
      } = e,
      S = Ku(e, og),
      E = Gu(),
      k = Op(u, { relative: f }),
      P = a.toLowerCase() === "get" ? "get" : "post",
      h = (d) => {
        if ((s && s(d), d.defaultPrevented)) return;
        d.preventDefault();
        let m = d.nativeEvent.submitter,
          C = (m == null ? void 0 : m.getAttribute("formmethod")) || a;
        E(m || d.currentTarget, {
          fetcherKey: n,
          method: C,
          navigate: r,
          replace: o,
          state: i,
          relative: f,
          preventScrollReset: c,
          unstable_viewTransition: p,
        });
      };
    return w.createElement(
      "form",
      Ye({ ref: t, method: P, action: k, onSubmit: l ? s : h }, S)
    );
  });
function Cg(e) {
  let { getKey: t, storageKey: n } = e;
  return Ip({ getKey: t, storageKey: n }), null;
}
var xr;
(function (e) {
  (e.UseScrollRestoration = "useScrollRestoration"),
    (e.UseSubmit = "useSubmit"),
    (e.UseSubmitFetcher = "useSubmitFetcher"),
    (e.UseFetcher = "useFetcher"),
    (e.useViewTransitionState = "useViewTransitionState");
})(xr || (xr = {}));
var Cl;
(function (e) {
  (e.UseFetcher = "useFetcher"),
    (e.UseFetchers = "useFetchers"),
    (e.UseScrollRestoration = "useScrollRestoration");
})(Cl || (Cl = {}));
function hi(e) {
  let t = w.useContext(Rr);
  return t || j(!1), t;
}
function Xu(e) {
  let t = w.useContext(Nl);
  return t || j(!1), t;
}
function zp(e, t) {
  let {
      target: n,
      replace: r,
      state: l,
      preventScrollReset: o,
      relative: i,
      unstable_viewTransition: a,
    } = t === void 0 ? {} : t,
    u = fi(),
    s = Ct(),
    f = Tr(e, { relative: i });
  return w.useCallback(
    (c) => {
      if (qy(c, n)) {
        c.preventDefault();
        let p = r !== void 0 ? r : xt(s) === xt(f);
        u(e, {
          replace: p,
          state: l,
          preventScrollReset: o,
          relative: i,
          unstable_viewTransition: a,
        });
      }
    },
    [s, u, f, r, l, n, e, o, i, a]
  );
}
function _g(e) {
  let t = w.useRef(Yo(e)),
    n = w.useRef(!1),
    r = Ct(),
    l = w.useMemo(() => by(r.search, n.current ? null : t.current), [r.search]),
    o = fi(),
    i = w.useCallback(
      (a, u) => {
        const s = Yo(typeof a == "function" ? a(l) : a);
        (n.current = !0), o("?" + s, u);
      },
      [o, l]
    );
  return [l, i];
}
function Pg() {
  if (typeof document > "u")
    throw new Error(
      "You are calling submit during the server render. Try calling submit within a `useEffect` or callback instead."
    );
}
let Rg = 0,
  Fp = () => "__" + String(++Rg) + "__";
function Gu() {
  let { router: e } = hi(xr.UseSubmit),
    { basename: t } = w.useContext(lt),
    n = xp();
  return w.useCallback(
    function (r, l) {
      l === void 0 && (l = {}), Pg();
      let { action: o, method: i, encType: a, formData: u, body: s } = ng(r, t);
      if (l.navigate === !1) {
        let f = l.fetcherKey || Fp();
        e.fetch(f, n, l.action || o, {
          preventScrollReset: l.preventScrollReset,
          formData: u,
          body: s,
          formMethod: l.method || i,
          formEncType: l.encType || a,
          unstable_flushSync: l.unstable_flushSync,
        });
      } else
        e.navigate(l.action || o, {
          preventScrollReset: l.preventScrollReset,
          formData: u,
          body: s,
          formMethod: l.method || i,
          formEncType: l.encType || a,
          replace: l.replace,
          state: l.state,
          fromRouteId: n,
          unstable_flushSync: l.unstable_flushSync,
          unstable_viewTransition: l.unstable_viewTransition,
        });
    },
    [e, t, n]
  );
}
function Op(e, t) {
  let { relative: n } = t === void 0 ? {} : t,
    { basename: r } = w.useContext(lt),
    l = w.useContext(ot);
  l || j(!1);
  let [o] = l.matches.slice(-1),
    i = Ye({}, Tr(e || ".", { relative: n })),
    a = Ct();
  if (e == null) {
    i.search = a.search;
    let u = new URLSearchParams(i.search);
    u.has("index") &&
      u.get("index") === "" &&
      (u.delete("index"), (i.search = u.toString() ? "?" + u.toString() : ""));
  }
  return (
    (!e || e === ".") &&
      o.route.index &&
      (i.search = i.search ? i.search.replace(/^\?/, "?index&") : "?index"),
    r !== "/" && (i.pathname = i.pathname === "/" ? r : zt([r, i.pathname])),
    xt(i)
  );
}
function Lg(e) {
  var t;
  let { key: n } = e === void 0 ? {} : e,
    { router: r } = hi(xr.UseFetcher),
    l = Xu(Cl.UseFetcher),
    o = w.useContext(Yu),
    i = w.useContext(ot),
    a = (t = i.matches[i.matches.length - 1]) == null ? void 0 : t.route.id;
  o || j(!1), i || j(!1), a == null && j(!1);
  let u = Oc ? Oc() : "",
    [s, f] = w.useState(n || u);
  n && n !== s ? f(n) : s || f(Fp()),
    w.useEffect(
      () => (
        r.getFetcher(s),
        () => {
          r.deleteFetcher(s);
        }
      ),
      [r, s]
    );
  let c = w.useCallback(
      (d, m) => {
        a || j(!1), r.fetch(s, a, d, m);
      },
      [s, a, r]
    ),
    p = Gu(),
    S = w.useCallback(
      (d, m) => {
        p(d, Ye({}, m, { navigate: !1, fetcherKey: s }));
      },
      [s, p]
    ),
    E = w.useMemo(
      () =>
        w.forwardRef((m, C) =>
          w.createElement(
            Mp,
            Ye({}, m, { navigate: !1, fetcherKey: s, ref: C })
          )
        ),
      [s]
    ),
    k = l.fetchers.get(s) || up,
    P = o.get(s);
  return w.useMemo(
    () => Ye({ Form: E, submit: S, load: c }, k, { data: P }),
    [E, S, c, k, P]
  );
}
function Tg() {
  let e = Xu(Cl.UseFetchers);
  return Array.from(e.fetchers.entries()).map((t) => {
    let [n, r] = t;
    return Ye({}, r, { key: n });
  });
}
const Ic = "react-router-scroll-positions";
let oo = {};
function Ip(e) {
  let { getKey: t, storageKey: n } = e === void 0 ? {} : e,
    { router: r } = hi(xr.UseScrollRestoration),
    { restoreScrollPosition: l, preventScrollReset: o } = Xu(
      Cl.UseScrollRestoration
    ),
    { basename: i } = w.useContext(lt),
    a = Ct(),
    u = _p(),
    s = Cp();
  w.useEffect(
    () => (
      (window.history.scrollRestoration = "manual"),
      () => {
        window.history.scrollRestoration = "auto";
      }
    ),
    []
  ),
    Ng(
      w.useCallback(() => {
        if (s.state === "idle") {
          let f = (t ? t(a, u) : null) || a.key;
          oo[f] = window.scrollY;
        }
        try {
          sessionStorage.setItem(n || Ic, JSON.stringify(oo));
        } catch {}
        window.history.scrollRestoration = "auto";
      }, [n, t, s.state, a, u])
    ),
    typeof document < "u" &&
      (w.useLayoutEffect(() => {
        try {
          let f = sessionStorage.getItem(n || Ic);
          f && (oo = JSON.parse(f));
        } catch {}
      }, [n]),
      w.useLayoutEffect(() => {
        let f =
            t && i !== "/"
              ? (p, S) =>
                  t(Ye({}, p, { pathname: Xe(p.pathname, i) || p.pathname }), S)
              : t,
          c =
            r == null
              ? void 0
              : r.enableScrollRestoration(oo, () => window.scrollY, f);
        return () => c && c();
      }, [r, i, t]),
      w.useLayoutEffect(() => {
        if (l !== !1) {
          if (typeof l == "number") {
            window.scrollTo(0, l);
            return;
          }
          if (a.hash) {
            let f = document.getElementById(
              decodeURIComponent(a.hash.slice(1))
            );
            if (f) {
              f.scrollIntoView();
              return;
            }
          }
          o !== !0 && window.scrollTo(0, 0);
        }
      }, [a, l, o]));
}
function Dg(e, t) {
  let { capture: n } = t || {};
  w.useEffect(() => {
    let r = n != null ? { capture: n } : void 0;
    return (
      window.addEventListener("beforeunload", e, r),
      () => {
        window.removeEventListener("beforeunload", e, r);
      }
    );
  }, [e, n]);
}
function Ng(e, t) {
  let { capture: n } = {};
  w.useEffect(() => {
    let r = n != null ? { capture: n } : void 0;
    return (
      window.addEventListener("pagehide", e, r),
      () => {
        window.removeEventListener("pagehide", e, r);
      }
    );
  }, [e, n]);
}
function Mg(e) {
  let { when: t, message: n } = e,
    r = Lp(t);
  w.useEffect(() => {
    r.state === "blocked" &&
      (window.confirm(n) ? setTimeout(r.proceed, 0) : r.reset());
  }, [r, n]),
    w.useEffect(() => {
      r.state === "blocked" && !t && r.reset();
    }, [r, t]);
}
function Up(e, t) {
  t === void 0 && (t = {});
  let n = w.useContext(Qu);
  n == null && j(!1);
  let { basename: r } = hi(xr.useViewTransitionState),
    l = Tr(e, { relative: t.relative });
  if (!n.isTransitioning) return !1;
  let o = Xe(n.currentLocation.pathname, r) || n.currentLocation.pathname,
    i = Xe(n.nextLocation.pathname, r) || n.nextLocation.pathname;
  return kr(l.pathname, i) != null || kr(l.pathname, o) != null;
}
const Og = Object.freeze(
  Object.defineProperty(
    {
      __proto__: null,
      AbortedDeferredError: Ko,
      Await: Hy,
      BrowserRouter: gg,
      Form: Mp,
      HashRouter: wg,
      Link: Np,
      MemoryRouter: jy,
      NavLink: xg,
      Navigate: Ay,
      get NavigationType() {
        return re;
      },
      Outlet: By,
      Route: Tp,
      Router: Dr,
      RouterProvider: mg,
      Routes: $y,
      ScrollRestoration: Cg,
      UNSAFE_DataRouterContext: Rr,
      UNSAFE_DataRouterStateContext: Nl,
      UNSAFE_ErrorResponseImpl: kl,
      UNSAFE_FetchersContext: Yu,
      UNSAFE_LocationContext: Lr,
      UNSAFE_NavigationContext: lt,
      UNSAFE_RouteContext: ot,
      UNSAFE_ViewTransitionContext: Qu,
      UNSAFE_useRouteId: xp,
      UNSAFE_useScrollRestoration: Ip,
      createBrowserRouter: ag,
      createHashRouter: ug,
      createMemoryRouter: Yy,
      createPath: xt,
      createRoutesFromChildren: xl,
      createRoutesFromElements: xl,
      createSearchParams: Yo,
      defer: Qv,
      generatePath: Iv,
      isRouteErrorResponse: Dl,
      json: Hv,
      matchPath: kr,
      matchRoutes: rn,
      parsePath: pt,
      redirect: Au,
      redirectDocument: Yv,
      renderMatches: Qy,
      replace: Xv,
      resolvePath: op,
      unstable_HistoryRouter: Sg,
      unstable_usePrompt: Mg,
      unstable_useViewTransitionState: Up,
      useActionData: zy,
      useAsyncError: Fy,
      useAsyncValue: Rp,
      useBeforeUnload: Dg,
      useBlocker: Lp,
      useFetcher: Lg,
      useFetchers: Tg,
      useFormAction: Op,
      useHref: vp,
      useInRouterContext: kn,
      useLinkClickHandler: zp,
      useLoaderData: Ny,
      useLocation: Ct,
      useMatch: Ey,
      useMatches: _p,
      useNavigate: fi,
      useNavigation: Cp,
      useNavigationType: Sy,
      useOutlet: wp,
      useOutletContext: xy,
      useParams: Cy,
      useResolvedPath: Tr,
      useRevalidator: Dy,
      useRouteError: Pp,
      useRouteLoaderData: My,
      useRoutes: Sp,
      useSearchParams: _g,
      useSubmit: Gu,
    },
    Symbol.toStringTag,
    { value: "Module" }
  )
);
export {
  Np as L,
  Ay as N,
  By as O,
  Xa as R,
  Fg as a,
  Jd as b,
  zg as c,
  vh as d,
  Ev as e,
  Og as f,
  jc as g,
  fi as h,
  ag as i,
  mg as j,
  w as r,
  Ct as u,
};

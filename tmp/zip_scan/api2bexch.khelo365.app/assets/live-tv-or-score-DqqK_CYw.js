import {
  u as Da,
  a as Ia,
  q as wa,
  b as Fa,
  s as Oa,
  T as yr,
  i as Ca,
  R as zr,
} from "./index-_We0Nukf.js";
import { j as xe, c as qt } from "./chakra-mpaYxI_z.js";
import {
  c as Pa,
  g as ka,
  d as Er,
  r as Zt,
  h as Ma,
  u as Na,
} from "./router-Ua64hkZi.js";
import { l as Ua } from "./index-llaQ0qDo.js";
import { j as ut, s as Ba, p as Ga } from "./royalbossReact-GIjSXeXc.js";
import { G as qr } from "./reactIcons-Dmit337i.js";
import "./axios-I_wKO6Q1.js";
import "./cryptoJs-DCZ-Ftzy.js";
import "./reactUse-DTnvhcUA.js";
import "./reactDayPicker-C43KlTe7.js";
import "./swiper-Ck2cIqjZ.js";
var Zr = { exports: {} };
(function (Ie, tt) {
  typeof window < "u" &&
    (function (te, K) {
      Ie.exports = K();
    })(Pa, function () {
      return (function (Te) {
        var te = {};
        function K(Q) {
          if (te[Q]) return te[Q].exports;
          var W = (te[Q] = { i: Q, l: !1, exports: {} });
          return Te[Q].call(W.exports, W, W.exports, K), (W.l = !0), W.exports;
        }
        return (
          (K.m = Te),
          (K.c = te),
          (K.d = function (Q, W, D) {
            K.o(Q, W) ||
              Object.defineProperty(Q, W, { enumerable: !0, get: D });
          }),
          (K.r = function (Q) {
            typeof Symbol < "u" &&
              Symbol.toStringTag &&
              Object.defineProperty(Q, Symbol.toStringTag, { value: "Module" }),
              Object.defineProperty(Q, "__esModule", { value: !0 });
          }),
          (K.t = function (Q, W) {
            if (
              (W & 1 && (Q = K(Q)),
              W & 8 || (W & 4 && typeof Q == "object" && Q && Q.__esModule))
            )
              return Q;
            var D = Object.create(null);
            if (
              (K.r(D),
              Object.defineProperty(D, "default", { enumerable: !0, value: Q }),
              W & 2 && typeof Q != "string")
            )
              for (var ee in Q)
                K.d(
                  D,
                  ee,
                  function (h) {
                    return Q[h];
                  }.bind(null, ee)
                );
            return D;
          }),
          (K.n = function (Q) {
            var W =
              Q && Q.__esModule
                ? function () {
                    return Q.default;
                  }
                : function () {
                    return Q;
                  };
            return K.d(W, "a", W), W;
          }),
          (K.o = function (Q, W) {
            return Object.prototype.hasOwnProperty.call(Q, W);
          }),
          (K.p = "/dist/"),
          K((K.s = "./src/hls.ts"))
        );
      })({
        "./node_modules/eventemitter3/index.js": function (Te, te, K) {
          var Q = Object.prototype.hasOwnProperty,
            W = "~";
          function D() {}
          Object.create &&
            ((D.prototype = Object.create(null)),
            new D().__proto__ || (W = !1));
          function ee(T, S, I) {
            (this.fn = T), (this.context = S), (this.once = I || !1);
          }
          function h(T, S, I, _, F) {
            if (typeof I != "function")
              throw new TypeError("The listener must be a function");
            var k = new ee(I, _ || T, F),
              w = W ? W + S : S;
            return (
              T._events[w]
                ? T._events[w].fn
                  ? (T._events[w] = [T._events[w], k])
                  : T._events[w].push(k)
                : ((T._events[w] = k), T._eventsCount++),
              T
            );
          }
          function c(T, S) {
            --T._eventsCount === 0
              ? (T._events = new D())
              : delete T._events[S];
          }
          function Z() {
            (this._events = new D()), (this._eventsCount = 0);
          }
          (Z.prototype.eventNames = function () {
            var S = [],
              I,
              _;
            if (this._eventsCount === 0) return S;
            for (_ in (I = this._events))
              Q.call(I, _) && S.push(W ? _.slice(1) : _);
            return Object.getOwnPropertySymbols
              ? S.concat(Object.getOwnPropertySymbols(I))
              : S;
          }),
            (Z.prototype.listeners = function (S) {
              var I = W ? W + S : S,
                _ = this._events[I];
              if (!_) return [];
              if (_.fn) return [_.fn];
              for (var F = 0, k = _.length, w = new Array(k); F < k; F++)
                w[F] = _[F].fn;
              return w;
            }),
            (Z.prototype.listenerCount = function (S) {
              var I = W ? W + S : S,
                _ = this._events[I];
              return _ ? (_.fn ? 1 : _.length) : 0;
            }),
            (Z.prototype.emit = function (S, I, _, F, k, w) {
              var z = W ? W + S : S;
              if (!this._events[z]) return !1;
              var N = this._events[z],
                B = arguments.length,
                Y,
                J;
              if (N.fn) {
                switch (
                  (N.once && this.removeListener(S, N.fn, void 0, !0), B)
                ) {
                  case 1:
                    return N.fn.call(N.context), !0;
                  case 2:
                    return N.fn.call(N.context, I), !0;
                  case 3:
                    return N.fn.call(N.context, I, _), !0;
                  case 4:
                    return N.fn.call(N.context, I, _, F), !0;
                  case 5:
                    return N.fn.call(N.context, I, _, F, k), !0;
                  case 6:
                    return N.fn.call(N.context, I, _, F, k, w), !0;
                }
                for (J = 1, Y = new Array(B - 1); J < B; J++)
                  Y[J - 1] = arguments[J];
                N.fn.apply(N.context, Y);
              } else {
                var le = N.length,
                  ie;
                for (J = 0; J < le; J++)
                  switch (
                    (N[J].once && this.removeListener(S, N[J].fn, void 0, !0),
                    B)
                  ) {
                    case 1:
                      N[J].fn.call(N[J].context);
                      break;
                    case 2:
                      N[J].fn.call(N[J].context, I);
                      break;
                    case 3:
                      N[J].fn.call(N[J].context, I, _);
                      break;
                    case 4:
                      N[J].fn.call(N[J].context, I, _, F);
                      break;
                    default:
                      if (!Y)
                        for (ie = 1, Y = new Array(B - 1); ie < B; ie++)
                          Y[ie - 1] = arguments[ie];
                      N[J].fn.apply(N[J].context, Y);
                  }
              }
              return !0;
            }),
            (Z.prototype.on = function (S, I, _) {
              return h(this, S, I, _, !1);
            }),
            (Z.prototype.once = function (S, I, _) {
              return h(this, S, I, _, !0);
            }),
            (Z.prototype.removeListener = function (S, I, _, F) {
              var k = W ? W + S : S;
              if (!this._events[k]) return this;
              if (!I) return c(this, k), this;
              var w = this._events[k];
              if (w.fn)
                w.fn === I &&
                  (!F || w.once) &&
                  (!_ || w.context === _) &&
                  c(this, k);
              else {
                for (var z = 0, N = [], B = w.length; z < B; z++)
                  (w[z].fn !== I ||
                    (F && !w[z].once) ||
                    (_ && w[z].context !== _)) &&
                    N.push(w[z]);
                N.length
                  ? (this._events[k] = N.length === 1 ? N[0] : N)
                  : c(this, k);
              }
              return this;
            }),
            (Z.prototype.removeAllListeners = function (S) {
              var I;
              return (
                S
                  ? ((I = W ? W + S : S), this._events[I] && c(this, I))
                  : ((this._events = new D()), (this._eventsCount = 0)),
                this
              );
            }),
            (Z.prototype.off = Z.prototype.removeListener),
            (Z.prototype.addListener = Z.prototype.on),
            (Z.prefixed = W),
            (Z.EventEmitter = Z),
            (Te.exports = Z);
        },
        "./node_modules/url-toolkit/src/url-toolkit.js": function (Te, te, K) {
          (function (Q) {
            var W =
                /^((?:[a-zA-Z0-9+\-.]+:)?)(\/\/[^\/?#]*)?((?:[^\/?#]*\/)*[^;?#]*)?(;[^?#]*)?(\?[^#]*)?(#.*)?$/,
              D = /^([^\/?#]*)(.*)$/,
              ee = /(?:\/|^)\.(?=\/)/g,
              h = /(?:\/|^)\.\.\/(?!\.\.\/)[^\/]*(?=\/)/g,
              c = {
                buildAbsoluteURL: function (Z, T, S) {
                  if (((S = S || {}), (Z = Z.trim()), (T = T.trim()), !T)) {
                    if (!S.alwaysNormalize) return Z;
                    var I = c.parseURL(Z);
                    if (!I) throw new Error("Error trying to parse base URL.");
                    return (
                      (I.path = c.normalizePath(I.path)), c.buildURLFromParts(I)
                    );
                  }
                  var _ = c.parseURL(T);
                  if (!_)
                    throw new Error("Error trying to parse relative URL.");
                  if (_.scheme)
                    return S.alwaysNormalize
                      ? ((_.path = c.normalizePath(_.path)),
                        c.buildURLFromParts(_))
                      : T;
                  var F = c.parseURL(Z);
                  if (!F) throw new Error("Error trying to parse base URL.");
                  if (!F.netLoc && F.path && F.path[0] !== "/") {
                    var k = D.exec(F.path);
                    (F.netLoc = k[1]), (F.path = k[2]);
                  }
                  F.netLoc && !F.path && (F.path = "/");
                  var w = {
                    scheme: F.scheme,
                    netLoc: _.netLoc,
                    path: null,
                    params: _.params,
                    query: _.query,
                    fragment: _.fragment,
                  };
                  if (!_.netLoc && ((w.netLoc = F.netLoc), _.path[0] !== "/"))
                    if (!_.path)
                      (w.path = F.path),
                        _.params ||
                          ((w.params = F.params),
                          _.query || (w.query = F.query));
                    else {
                      var z = F.path,
                        N = z.substring(0, z.lastIndexOf("/") + 1) + _.path;
                      w.path = c.normalizePath(N);
                    }
                  return (
                    w.path === null &&
                      (w.path = S.alwaysNormalize
                        ? c.normalizePath(_.path)
                        : _.path),
                    c.buildURLFromParts(w)
                  );
                },
                parseURL: function (Z) {
                  var T = W.exec(Z);
                  return T
                    ? {
                        scheme: T[1] || "",
                        netLoc: T[2] || "",
                        path: T[3] || "",
                        params: T[4] || "",
                        query: T[5] || "",
                        fragment: T[6] || "",
                      }
                    : null;
                },
                normalizePath: function (Z) {
                  for (
                    Z = Z.split("").reverse().join("").replace(ee, "");
                    Z.length !== (Z = Z.replace(h, "")).length;

                  );
                  return Z.split("").reverse().join("");
                },
                buildURLFromParts: function (Z) {
                  return (
                    Z.scheme +
                    Z.netLoc +
                    Z.path +
                    Z.params +
                    Z.query +
                    Z.fragment
                  );
                },
              };
            Te.exports = c;
          })();
        },
        "./node_modules/webworkify-webpack/index.js": function (Te, te, K) {
          function Q(S) {
            var I = {};
            function _(k) {
              if (I[k]) return I[k].exports;
              var w = (I[k] = { i: k, l: !1, exports: {} });
              return (
                S[k].call(w.exports, w, w.exports, _), (w.l = !0), w.exports
              );
            }
            (_.m = S),
              (_.c = I),
              (_.i = function (k) {
                return k;
              }),
              (_.d = function (k, w, z) {
                _.o(k, w) ||
                  Object.defineProperty(k, w, {
                    configurable: !1,
                    enumerable: !0,
                    get: z,
                  });
              }),
              (_.r = function (k) {
                Object.defineProperty(k, "__esModule", { value: !0 });
              }),
              (_.n = function (k) {
                var w =
                  k && k.__esModule
                    ? function () {
                        return k.default;
                      }
                    : function () {
                        return k;
                      };
                return _.d(w, "a", w), w;
              }),
              (_.o = function (k, w) {
                return Object.prototype.hasOwnProperty.call(k, w);
              }),
              (_.p = "/"),
              (_.oe = function (k) {
                throw (console.error(k), k);
              });
            var F = _((_.s = ENTRY_MODULE));
            return F.default || F;
          }
          var W = "[\\.|\\-|\\+|\\w|/|@]+",
            D = "\\(\\s*(/\\*.*?\\*/)?\\s*.*?(" + W + ").*?\\)";
          function ee(S) {
            return (S + "").replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");
          }
          function h(S) {
            return !isNaN(1 * S);
          }
          function c(S, I, _) {
            var F = {};
            F[_] = [];
            var k = I.toString(),
              w = k.match(/^function\s?\w*\(\w+,\s*\w+,\s*(\w+)\)/);
            if (!w) return F;
            for (
              var z = w[1], N = new RegExp("(\\\\n|\\W)" + ee(z) + D, "g"), B;
              (B = N.exec(k));

            )
              B[3] !== "dll-reference" && F[_].push(B[3]);
            for (
              N = new RegExp(
                "\\(" + ee(z) + '\\("(dll-reference\\s(' + W + '))"\\)\\)' + D,
                "g"
              );
              (B = N.exec(k));

            )
              S[B[2]] || (F[_].push(B[1]), (S[B[2]] = K(B[1]).m)),
                (F[B[2]] = F[B[2]] || []),
                F[B[2]].push(B[4]);
            for (var Y = Object.keys(F), J = 0; J < Y.length; J++)
              for (var le = 0; le < F[Y[J]].length; le++)
                h(F[Y[J]][le]) && (F[Y[J]][le] = 1 * F[Y[J]][le]);
            return F;
          }
          function Z(S) {
            var I = Object.keys(S);
            return I.reduce(function (_, F) {
              return _ || S[F].length > 0;
            }, !1);
          }
          function T(S, I) {
            for (
              var _ = { main: [I] }, F = { main: [] }, k = { main: {} };
              Z(_);

            )
              for (var w = Object.keys(_), z = 0; z < w.length; z++) {
                var N = w[z],
                  B = _[N],
                  Y = B.pop();
                if (((k[N] = k[N] || {}), !(k[N][Y] || !S[N][Y]))) {
                  (k[N][Y] = !0), (F[N] = F[N] || []), F[N].push(Y);
                  for (
                    var J = c(S, S[N][Y], N), le = Object.keys(J), ie = 0;
                    ie < le.length;
                    ie++
                  )
                    (_[le[ie]] = _[le[ie]] || []),
                      (_[le[ie]] = _[le[ie]].concat(J[le[ie]]));
                }
              }
            return F;
          }
          Te.exports = function (S, I) {
            I = I || {};
            var _ = { main: K.m },
              F = I.all ? { main: Object.keys(_.main) } : T(_, S),
              k = "";
            Object.keys(F)
              .filter(function (Y) {
                return Y !== "main";
              })
              .forEach(function (Y) {
                for (var J = 0; F[Y][J]; ) J++;
                F[Y].push(J),
                  (_[Y][J] =
                    "(function(module, exports, __webpack_require__) { module.exports = __webpack_require__; })"),
                  (k =
                    k +
                    "var " +
                    Y +
                    " = (" +
                    Q.toString().replace("ENTRY_MODULE", JSON.stringify(J)) +
                    ")({" +
                    F[Y].map(function (le) {
                      return (
                        "" + JSON.stringify(le) + ": " + _[Y][le].toString()
                      );
                    }).join(",") +
                    `});
`);
              }),
              (k =
                k +
                "new ((" +
                Q.toString().replace("ENTRY_MODULE", JSON.stringify(S)) +
                ")({" +
                F.main
                  .map(function (Y) {
                    return "" + JSON.stringify(Y) + ": " + _.main[Y].toString();
                  })
                  .join(",") +
                "}))(self);");
            var w = new window.Blob([k], { type: "text/javascript" });
            if (I.bare) return w;
            var z =
                window.URL || window.webkitURL || window.mozURL || window.msURL,
              N = z.createObjectURL(w),
              B = new window.Worker(N);
            return (B.objectURL = N), B;
          };
        },
        "./src/crypt/decrypter.js": function (Te, te, K) {
          K.r(te);
          var Q = (function () {
              function k(z, N) {
                (this.subtle = z), (this.aesIV = N);
              }
              var w = k.prototype;
              return (
                (w.decrypt = function (N, B) {
                  return this.subtle.decrypt(
                    { name: "AES-CBC", iv: this.aesIV },
                    B,
                    N
                  );
                }),
                k
              );
            })(),
            W = (function () {
              function k(z, N) {
                (this.subtle = z), (this.key = N);
              }
              var w = k.prototype;
              return (
                (w.expandKey = function () {
                  return this.subtle.importKey(
                    "raw",
                    this.key,
                    { name: "AES-CBC" },
                    !1,
                    ["encrypt", "decrypt"]
                  );
                }),
                k
              );
            })(),
            D = W;
          function ee(k) {
            var w = k.byteLength,
              z = w && new DataView(k).getUint8(w - 1);
            return z ? k.slice(0, w - z) : k;
          }
          var h = (function () {
              function k() {
                (this.rcon = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54]),
                  (this.subMix = [
                    new Uint32Array(256),
                    new Uint32Array(256),
                    new Uint32Array(256),
                    new Uint32Array(256),
                  ]),
                  (this.invSubMix = [
                    new Uint32Array(256),
                    new Uint32Array(256),
                    new Uint32Array(256),
                    new Uint32Array(256),
                  ]),
                  (this.sBox = new Uint32Array(256)),
                  (this.invSBox = new Uint32Array(256)),
                  (this.key = new Uint32Array(0)),
                  this.initTable();
              }
              var w = k.prototype;
              return (
                (w.uint8ArrayToUint32Array_ = function (N) {
                  for (
                    var B = new DataView(N), Y = new Uint32Array(4), J = 0;
                    J < 4;
                    J++
                  )
                    Y[J] = B.getUint32(J * 4);
                  return Y;
                }),
                (w.initTable = function () {
                  var N = this.sBox,
                    B = this.invSBox,
                    Y = this.subMix,
                    J = Y[0],
                    le = Y[1],
                    ie = Y[2],
                    fe = Y[3],
                    _e = this.invSubMix,
                    Pe = _e[0],
                    ke = _e[1],
                    Le = _e[2],
                    dt = _e[3],
                    we = new Uint32Array(256),
                    Me = 0,
                    Ve = 0,
                    Be = 0;
                  for (Be = 0; Be < 256; Be++)
                    Be < 128 ? (we[Be] = Be << 1) : (we[Be] = (Be << 1) ^ 283);
                  for (Be = 0; Be < 256; Be++) {
                    var Ge = Ve ^ (Ve << 1) ^ (Ve << 2) ^ (Ve << 3) ^ (Ve << 4);
                    (Ge = (Ge >>> 8) ^ (Ge & 255) ^ 99),
                      (N[Me] = Ge),
                      (B[Ge] = Me);
                    var Ne = we[Me],
                      ge = we[Ne],
                      rt = we[ge],
                      be = (we[Ge] * 257) ^ (Ge * 16843008);
                    (J[Me] = (be << 24) | (be >>> 8)),
                      (le[Me] = (be << 16) | (be >>> 16)),
                      (ie[Me] = (be << 8) | (be >>> 24)),
                      (fe[Me] = be),
                      (be =
                        (rt * 16843009) ^
                        (ge * 65537) ^
                        (Ne * 257) ^
                        (Me * 16843008)),
                      (Pe[Ge] = (be << 24) | (be >>> 8)),
                      (ke[Ge] = (be << 16) | (be >>> 16)),
                      (Le[Ge] = (be << 8) | (be >>> 24)),
                      (dt[Ge] = be),
                      Me
                        ? ((Me = Ne ^ we[we[we[rt ^ Ne]]]), (Ve ^= we[we[Ve]]))
                        : (Me = Ve = 1);
                  }
                }),
                (w.expandKey = function (N) {
                  for (
                    var B = this.uint8ArrayToUint32Array_(N), Y = !0, J = 0;
                    J < B.length && Y;

                  )
                    (Y = B[J] === this.key[J]), J++;
                  if (!Y) {
                    this.key = B;
                    var le = (this.keySize = B.length);
                    if (le !== 4 && le !== 6 && le !== 8)
                      throw new Error("Invalid aes key size=" + le);
                    var ie = (this.ksRows = (le + 6 + 1) * 4),
                      fe,
                      _e,
                      Pe = (this.keySchedule = new Uint32Array(ie)),
                      ke = (this.invKeySchedule = new Uint32Array(ie)),
                      Le = this.sBox,
                      dt = this.rcon,
                      we = this.invSubMix,
                      Me = we[0],
                      Ve = we[1],
                      Be = we[2],
                      Ge = we[3],
                      Ne,
                      ge;
                    for (fe = 0; fe < ie; fe++) {
                      if (fe < le) {
                        Ne = Pe[fe] = B[fe];
                        continue;
                      }
                      (ge = Ne),
                        fe % le === 0
                          ? ((ge = (ge << 8) | (ge >>> 24)),
                            (ge =
                              (Le[ge >>> 24] << 24) |
                              (Le[(ge >>> 16) & 255] << 16) |
                              (Le[(ge >>> 8) & 255] << 8) |
                              Le[ge & 255]),
                            (ge ^= dt[(fe / le) | 0] << 24))
                          : le > 6 &&
                            fe % le === 4 &&
                            (ge =
                              (Le[ge >>> 24] << 24) |
                              (Le[(ge >>> 16) & 255] << 16) |
                              (Le[(ge >>> 8) & 255] << 8) |
                              Le[ge & 255]),
                        (Pe[fe] = Ne = (Pe[fe - le] ^ ge) >>> 0);
                    }
                    for (_e = 0; _e < ie; _e++)
                      (fe = ie - _e),
                        _e & 3 ? (ge = Pe[fe]) : (ge = Pe[fe - 4]),
                        _e < 4 || fe <= 4
                          ? (ke[_e] = ge)
                          : (ke[_e] =
                              Me[Le[ge >>> 24]] ^
                              Ve[Le[(ge >>> 16) & 255]] ^
                              Be[Le[(ge >>> 8) & 255]] ^
                              Ge[Le[ge & 255]]),
                        (ke[_e] = ke[_e] >>> 0);
                  }
                }),
                (w.networkToHostOrderSwap = function (N) {
                  return (
                    (N << 24) |
                    ((N & 65280) << 8) |
                    ((N & 16711680) >> 8) |
                    (N >>> 24)
                  );
                }),
                (w.decrypt = function (N, B, Y, J) {
                  for (
                    var le = this.keySize + 6,
                      ie = this.invKeySchedule,
                      fe = this.invSBox,
                      _e = this.invSubMix,
                      Pe = _e[0],
                      ke = _e[1],
                      Le = _e[2],
                      dt = _e[3],
                      we = this.uint8ArrayToUint32Array_(Y),
                      Me = we[0],
                      Ve = we[1],
                      Be = we[2],
                      Ge = we[3],
                      Ne = new Int32Array(N),
                      ge = new Int32Array(Ne.length),
                      rt,
                      be,
                      Tt,
                      St,
                      Ae,
                      $e,
                      it,
                      st,
                      xt,
                      Lt,
                      Je,
                      _t,
                      ze,
                      Dt,
                      ot = this.networkToHostOrderSwap;
                    B < Ne.length;

                  ) {
                    for (
                      xt = ot(Ne[B]),
                        Lt = ot(Ne[B + 1]),
                        Je = ot(Ne[B + 2]),
                        _t = ot(Ne[B + 3]),
                        Ae = xt ^ ie[0],
                        $e = _t ^ ie[1],
                        it = Je ^ ie[2],
                        st = Lt ^ ie[3],
                        ze = 4,
                        Dt = 1;
                      Dt < le;
                      Dt++
                    )
                      (rt =
                        Pe[Ae >>> 24] ^
                        ke[($e >> 16) & 255] ^
                        Le[(it >> 8) & 255] ^
                        dt[st & 255] ^
                        ie[ze]),
                        (be =
                          Pe[$e >>> 24] ^
                          ke[(it >> 16) & 255] ^
                          Le[(st >> 8) & 255] ^
                          dt[Ae & 255] ^
                          ie[ze + 1]),
                        (Tt =
                          Pe[it >>> 24] ^
                          ke[(st >> 16) & 255] ^
                          Le[(Ae >> 8) & 255] ^
                          dt[$e & 255] ^
                          ie[ze + 2]),
                        (St =
                          Pe[st >>> 24] ^
                          ke[(Ae >> 16) & 255] ^
                          Le[($e >> 8) & 255] ^
                          dt[it & 255] ^
                          ie[ze + 3]),
                        (Ae = rt),
                        ($e = be),
                        (it = Tt),
                        (st = St),
                        (ze = ze + 4);
                    (rt =
                      (fe[Ae >>> 24] << 24) ^
                      (fe[($e >> 16) & 255] << 16) ^
                      (fe[(it >> 8) & 255] << 8) ^
                      fe[st & 255] ^
                      ie[ze]),
                      (be =
                        (fe[$e >>> 24] << 24) ^
                        (fe[(it >> 16) & 255] << 16) ^
                        (fe[(st >> 8) & 255] << 8) ^
                        fe[Ae & 255] ^
                        ie[ze + 1]),
                      (Tt =
                        (fe[it >>> 24] << 24) ^
                        (fe[(st >> 16) & 255] << 16) ^
                        (fe[(Ae >> 8) & 255] << 8) ^
                        fe[$e & 255] ^
                        ie[ze + 2]),
                      (St =
                        (fe[st >>> 24] << 24) ^
                        (fe[(Ae >> 16) & 255] << 16) ^
                        (fe[($e >> 8) & 255] << 8) ^
                        fe[it & 255] ^
                        ie[ze + 3]),
                      (ze = ze + 3),
                      (ge[B] = ot(rt ^ Me)),
                      (ge[B + 1] = ot(St ^ Ve)),
                      (ge[B + 2] = ot(Tt ^ Be)),
                      (ge[B + 3] = ot(be ^ Ge)),
                      (Me = xt),
                      (Ve = Lt),
                      (Be = Je),
                      (Ge = _t),
                      (B = B + 4);
                  }
                  return J ? ee(ge.buffer) : ge.buffer;
                }),
                (w.destroy = function () {
                  (this.key = void 0),
                    (this.keySize = void 0),
                    (this.ksRows = void 0),
                    (this.sBox = void 0),
                    (this.invSBox = void 0),
                    (this.subMix = void 0),
                    (this.invSubMix = void 0),
                    (this.keySchedule = void 0),
                    (this.invKeySchedule = void 0),
                    (this.rcon = void 0);
                }),
                k
              );
            })(),
            c = h,
            Z = K("./src/errors.ts"),
            T = K("./src/utils/logger.js"),
            S = K("./src/events.js"),
            I = K("./src/utils/get-self-scope.js"),
            _ = Object(I.getSelfScope)(),
            F = (function () {
              function k(z, N, B) {
                var Y = B === void 0 ? {} : B,
                  J = Y.removePKCS7Padding,
                  le = J === void 0 ? !0 : J;
                if (
                  ((this.logEnabled = !0),
                  (this.observer = z),
                  (this.config = N),
                  (this.removePKCS7Padding = le),
                  le)
                )
                  try {
                    var ie = _.crypto;
                    ie && (this.subtle = ie.subtle || ie.webkitSubtle);
                  } catch {}
                this.disableWebCrypto = !this.subtle;
              }
              var w = k.prototype;
              return (
                (w.isSync = function () {
                  return this.disableWebCrypto && this.config.enableSoftwareAES;
                }),
                (w.decrypt = function (N, B, Y, J) {
                  var le = this;
                  if (this.disableWebCrypto && this.config.enableSoftwareAES) {
                    this.logEnabled &&
                      (T.logger.log("JS AES decrypt"), (this.logEnabled = !1));
                    var ie = this.decryptor;
                    ie || (this.decryptor = ie = new c()),
                      ie.expandKey(B),
                      J(ie.decrypt(N, 0, Y, this.removePKCS7Padding));
                  } else {
                    this.logEnabled &&
                      (T.logger.log("WebCrypto AES decrypt"),
                      (this.logEnabled = !1));
                    var fe = this.subtle;
                    this.key !== B &&
                      ((this.key = B), (this.fastAesKey = new D(fe, B))),
                      this.fastAesKey
                        .expandKey()
                        .then(function (_e) {
                          var Pe = new Q(fe, Y);
                          Pe.decrypt(N, _e)
                            .catch(function (ke) {
                              le.onWebCryptoError(ke, N, B, Y, J);
                            })
                            .then(function (ke) {
                              J(ke);
                            });
                        })
                        .catch(function (_e) {
                          le.onWebCryptoError(_e, N, B, Y, J);
                        });
                  }
                }),
                (w.onWebCryptoError = function (N, B, Y, J, le) {
                  this.config.enableSoftwareAES
                    ? (T.logger.log("WebCrypto Error, disable WebCrypto API"),
                      (this.disableWebCrypto = !0),
                      (this.logEnabled = !0),
                      this.decrypt(B, Y, J, le))
                    : (T.logger.error("decrypting error : " + N.message),
                      this.observer.trigger(S.default.ERROR, {
                        type: Z.ErrorTypes.MEDIA_ERROR,
                        details: Z.ErrorDetails.FRAG_DECRYPT_ERROR,
                        fatal: !0,
                        reason: N.message,
                      }));
                }),
                (w.destroy = function () {
                  var N = this.decryptor;
                  N && (N.destroy(), (this.decryptor = void 0));
                }),
                k
              );
            })();
          te.default = F;
        },
        "./src/demux/demuxer-inline.js": function (Te, te, K) {
          K.r(te);
          var Q = K("./src/events.js"),
            W = K("./src/errors.ts"),
            D = K("./src/crypt/decrypter.js"),
            ee = K("./src/polyfills/number.js"),
            h = K("./src/utils/logger.js"),
            c = K("./src/utils/get-self-scope.js");
          function Z(y, L, x, f) {
            var g,
              m,
              E,
              A,
              b,
              C = navigator.userAgent.toLowerCase(),
              U = f,
              G = [
                96e3, 88200, 64e3, 48e3, 44100, 32e3, 24e3, 22050, 16e3, 12e3,
                11025, 8e3, 7350,
              ];
            if (
              ((g = ((L[x + 2] & 192) >>> 6) + 1),
              (m = (L[x + 2] & 60) >>> 2),
              m > G.length - 1)
            ) {
              y.trigger(Q.default.ERROR, {
                type: W.ErrorTypes.MEDIA_ERROR,
                details: W.ErrorDetails.FRAG_PARSING_ERROR,
                fatal: !0,
                reason: "invalid ADTS sampling index:" + m,
              });
              return;
            }
            return (
              (A = (L[x + 2] & 1) << 2),
              (A |= (L[x + 3] & 192) >>> 6),
              h.logger.log(
                "manifest codec:" +
                  f +
                  ",ADTS data:type:" +
                  g +
                  ",sampleingIndex:" +
                  m +
                  "[" +
                  G[m] +
                  "Hz],channelConfig:" +
                  A
              ),
              /firefox/i.test(C)
                ? m >= 6
                  ? ((g = 5), (b = new Array(4)), (E = m - 3))
                  : ((g = 2), (b = new Array(2)), (E = m))
                : C.indexOf("android") !== -1
                ? ((g = 2), (b = new Array(2)), (E = m))
                : ((g = 5),
                  (b = new Array(4)),
                  (f &&
                    (f.indexOf("mp4a.40.29") !== -1 ||
                      f.indexOf("mp4a.40.5") !== -1)) ||
                  (!f && m >= 6)
                    ? (E = m - 3)
                    : (((f &&
                        f.indexOf("mp4a.40.2") !== -1 &&
                        ((m >= 6 && A === 1) || /vivaldi/i.test(C))) ||
                        (!f && A === 1)) &&
                        ((g = 2), (b = new Array(2))),
                      (E = m))),
              (b[0] = g << 3),
              (b[0] |= (m & 14) >> 1),
              (b[1] |= (m & 1) << 7),
              (b[1] |= A << 3),
              g === 5 &&
                ((b[1] |= (E & 14) >> 1),
                (b[2] = (E & 1) << 7),
                (b[2] |= 8),
                (b[3] = 0)),
              {
                config: b,
                samplerate: G[m],
                channelCount: A,
                codec: "mp4a.40." + g,
                manifestCodec: U,
              }
            );
          }
          function T(y, L) {
            return y[L] === 255 && (y[L + 1] & 246) === 240;
          }
          function S(y, L) {
            return y[L + 1] & 1 ? 7 : 9;
          }
          function I(y, L) {
            return (
              ((y[L + 3] & 3) << 11) |
              (y[L + 4] << 3) |
              ((y[L + 5] & 224) >>> 5)
            );
          }
          function _(y, L) {
            return !!(L + 1 < y.length && T(y, L));
          }
          function F(y, L) {
            if (_(y, L)) {
              var x = S(y, L);
              if (L + x >= y.length) return !1;
              var f = I(y, L);
              if (f <= x) return !1;
              var g = L + f;
              if (g === y.length || (g + 1 < y.length && T(y, g))) return !0;
            }
            return !1;
          }
          function k(y, L, x, f, g) {
            if (!y.samplerate) {
              var m = Z(L, x, f, g);
              (y.config = m.config),
                (y.samplerate = m.samplerate),
                (y.channelCount = m.channelCount),
                (y.codec = m.codec),
                (y.manifestCodec = m.manifestCodec),
                h.logger.log(
                  "parsed codec:" +
                    y.codec +
                    ",rate:" +
                    m.samplerate +
                    ",nb channel:" +
                    m.channelCount
                );
            }
          }
          function w(y) {
            return (1024 * 9e4) / y;
          }
          function z(y, L, x, f, g) {
            var m,
              E,
              A,
              b = y.length;
            if (
              ((m = S(y, L)), (E = I(y, L)), (E -= m), E > 0 && L + m + E <= b)
            )
              return (
                (A = x + f * g), { headerLength: m, frameLength: E, stamp: A }
              );
          }
          function N(y, L, x, f, g) {
            var m = w(y.samplerate),
              E = z(L, x, f, g, m);
            if (E) {
              var A = E.stamp,
                b = E.headerLength,
                C = E.frameLength,
                U = { unit: L.subarray(x + b, x + b + C), pts: A, dts: A };
              return y.samples.push(U), { sample: U, length: C + b };
            }
          }
          var B = K("./src/demux/id3.js"),
            Y = (function () {
              function y(x, f, g) {
                (this.observer = x), (this.config = g), (this.remuxer = f);
              }
              var L = y.prototype;
              return (
                (L.resetInitSegment = function (f, g, m, E) {
                  this._audioTrack = {
                    container: "audio/adts",
                    type: "audio",
                    id: 0,
                    sequenceNumber: 0,
                    isAAC: !0,
                    samples: [],
                    len: 0,
                    manifestCodec: g,
                    duration: E,
                    inputTimeScale: 9e4,
                  };
                }),
                (L.resetTimeStamp = function () {}),
                (y.probe = function (f) {
                  if (!f) return !1;
                  for (
                    var g = B.default.getID3Data(f, 0) || [],
                      m = g.length,
                      E = f.length;
                    m < E;
                    m++
                  )
                    if (F(f, m))
                      return h.logger.log("ADTS sync word found !"), !0;
                  return !1;
                }),
                (L.append = function (f, g, m, E) {
                  for (
                    var A = this._audioTrack,
                      b = B.default.getID3Data(f, 0) || [],
                      C = B.default.getTimeStamp(b),
                      U = Object(ee.isFiniteNumber)(C) ? C * 90 : g * 9e4,
                      G = 0,
                      M = U,
                      X = f.length,
                      H = b.length,
                      $ = [{ pts: M, dts: M, data: b }];
                    H < X - 1;

                  )
                    if (_(f, H) && H + 5 < X) {
                      k(A, this.observer, f, H, A.manifestCodec);
                      var V = N(A, f, H, U, G);
                      if (V) (H += V.length), (M = V.sample.pts), G++;
                      else {
                        h.logger.log("Unable to parse AAC frame");
                        break;
                      }
                    } else
                      B.default.isHeader(f, H)
                        ? ((b = B.default.getID3Data(f, H)),
                          $.push({ pts: M, dts: M, data: b }),
                          (H += b.length))
                        : H++;
                  this.remuxer.remux(
                    A,
                    { samples: [] },
                    { samples: $, inputTimeScale: 9e4 },
                    { samples: [] },
                    g,
                    m,
                    E
                  );
                }),
                (L.destroy = function () {}),
                y
              );
            })(),
            J = Y,
            le = K("./src/demux/mp4demuxer.js"),
            ie = {
              BitratesMap: [
                32, 64, 96, 128, 160, 192, 224, 256, 288, 320, 352, 384, 416,
                448, 32, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320,
                384, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256,
                320, 32, 48, 56, 64, 80, 96, 112, 128, 144, 160, 176, 192, 224,
                256, 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160,
              ],
              SamplingRateMap: [
                44100, 48e3, 32e3, 22050, 24e3, 16e3, 11025, 12e3, 8e3,
              ],
              SamplesCoefficients: [
                [0, 72, 144, 12],
                [0, 0, 0, 0],
                [0, 72, 144, 12],
                [0, 144, 144, 12],
              ],
              BytesInSlot: [0, 1, 1, 4],
              appendFrame: function (L, x, f, g, m) {
                if (!(f + 24 > x.length)) {
                  var E = this.parseHeader(x, f);
                  if (E && f + E.frameLength <= x.length) {
                    var A = (E.samplesPerFrame * 9e4) / E.sampleRate,
                      b = g + m * A,
                      C = {
                        unit: x.subarray(f, f + E.frameLength),
                        pts: b,
                        dts: b,
                      };
                    return (
                      (L.config = []),
                      (L.channelCount = E.channelCount),
                      (L.samplerate = E.sampleRate),
                      L.samples.push(C),
                      { sample: C, length: E.frameLength }
                    );
                  }
                }
              },
              parseHeader: function (L, x) {
                var f = (L[x + 1] >> 3) & 3,
                  g = (L[x + 1] >> 1) & 3,
                  m = (L[x + 2] >> 4) & 15,
                  E = (L[x + 2] >> 2) & 3,
                  A = (L[x + 2] >> 1) & 1;
                if (f !== 1 && m !== 0 && m !== 15 && E !== 3) {
                  var b = f === 3 ? 3 - g : g === 3 ? 3 : 4,
                    C = ie.BitratesMap[b * 14 + m - 1] * 1e3,
                    U = f === 3 ? 0 : f === 2 ? 1 : 2,
                    G = ie.SamplingRateMap[U * 3 + E],
                    M = L[x + 3] >> 6 === 3 ? 1 : 2,
                    X = ie.SamplesCoefficients[f][g],
                    H = ie.BytesInSlot[g],
                    $ = X * 8 * H,
                    V = parseInt((X * C) / G + A, 10) * H;
                  return {
                    sampleRate: G,
                    channelCount: M,
                    frameLength: V,
                    samplesPerFrame: $,
                  };
                }
              },
              isHeaderPattern: function (L, x) {
                return (
                  L[x] === 255 &&
                  (L[x + 1] & 224) === 224 &&
                  (L[x + 1] & 6) !== 0
                );
              },
              isHeader: function (L, x) {
                return !!(x + 1 < L.length && this.isHeaderPattern(L, x));
              },
              probe: function (L, x) {
                if (x + 1 < L.length && this.isHeaderPattern(L, x)) {
                  var f = 4,
                    g = this.parseHeader(L, x),
                    m = f;
                  g && g.frameLength && (m = g.frameLength);
                  var E = x + m;
                  if (
                    E === L.length ||
                    (E + 1 < L.length && this.isHeaderPattern(L, E))
                  )
                    return !0;
                }
                return !1;
              },
            },
            fe = ie,
            _e = (function () {
              function y(x) {
                (this.data = x),
                  (this.bytesAvailable = x.byteLength),
                  (this.word = 0),
                  (this.bitsAvailable = 0);
              }
              var L = y.prototype;
              return (
                (L.loadWord = function () {
                  var f = this.data,
                    g = this.bytesAvailable,
                    m = f.byteLength - g,
                    E = new Uint8Array(4),
                    A = Math.min(4, g);
                  if (A === 0) throw new Error("no bytes available");
                  E.set(f.subarray(m, m + A)),
                    (this.word = new DataView(E.buffer).getUint32(0)),
                    (this.bitsAvailable = A * 8),
                    (this.bytesAvailable -= A);
                }),
                (L.skipBits = function (f) {
                  var g;
                  this.bitsAvailable > f
                    ? ((this.word <<= f), (this.bitsAvailable -= f))
                    : ((f -= this.bitsAvailable),
                      (g = f >> 3),
                      (f -= g >> 3),
                      (this.bytesAvailable -= g),
                      this.loadWord(),
                      (this.word <<= f),
                      (this.bitsAvailable -= f));
                }),
                (L.readBits = function (f) {
                  var g = Math.min(this.bitsAvailable, f),
                    m = this.word >>> (32 - g);
                  return (
                    f > 32 &&
                      h.logger.error("Cannot read more than 32 bits at a time"),
                    (this.bitsAvailable -= g),
                    this.bitsAvailable > 0
                      ? (this.word <<= g)
                      : this.bytesAvailable > 0 && this.loadWord(),
                    (g = f - g),
                    g > 0 && this.bitsAvailable
                      ? (m << g) | this.readBits(g)
                      : m
                  );
                }),
                (L.skipLZ = function () {
                  var f;
                  for (f = 0; f < this.bitsAvailable; ++f)
                    if (this.word & (2147483648 >>> f))
                      return (this.word <<= f), (this.bitsAvailable -= f), f;
                  return this.loadWord(), f + this.skipLZ();
                }),
                (L.skipUEG = function () {
                  this.skipBits(1 + this.skipLZ());
                }),
                (L.skipEG = function () {
                  this.skipBits(1 + this.skipLZ());
                }),
                (L.readUEG = function () {
                  var f = this.skipLZ();
                  return this.readBits(f + 1) - 1;
                }),
                (L.readEG = function () {
                  var f = this.readUEG();
                  return 1 & f ? (1 + f) >>> 1 : -1 * (f >>> 1);
                }),
                (L.readBoolean = function () {
                  return this.readBits(1) === 1;
                }),
                (L.readUByte = function () {
                  return this.readBits(8);
                }),
                (L.readUShort = function () {
                  return this.readBits(16);
                }),
                (L.readUInt = function () {
                  return this.readBits(32);
                }),
                (L.skipScalingList = function (f) {
                  var g = 8,
                    m = 8,
                    E,
                    A;
                  for (E = 0; E < f; E++)
                    m !== 0 && ((A = this.readEG()), (m = (g + A + 256) % 256)),
                      (g = m === 0 ? g : m);
                }),
                (L.readSPS = function () {
                  var f = 0,
                    g = 0,
                    m = 0,
                    E = 0,
                    A,
                    b,
                    C,
                    U,
                    G,
                    M,
                    X,
                    H = this.readUByte.bind(this),
                    $ = this.readBits.bind(this),
                    V = this.readUEG.bind(this),
                    se = this.readBoolean.bind(this),
                    ae = this.skipBits.bind(this),
                    he = this.skipEG.bind(this),
                    Se = this.skipUEG.bind(this),
                    ce = this.skipScalingList.bind(this);
                  if (
                    (H(),
                    (A = H()),
                    $(5),
                    ae(3),
                    H(),
                    Se(),
                    A === 100 ||
                      A === 110 ||
                      A === 122 ||
                      A === 244 ||
                      A === 44 ||
                      A === 83 ||
                      A === 86 ||
                      A === 118 ||
                      A === 128)
                  ) {
                    var Fe = V();
                    if ((Fe === 3 && ae(1), Se(), Se(), ae(1), se()))
                      for (M = Fe !== 3 ? 8 : 12, X = 0; X < M; X++)
                        se() && (X < 6 ? ce(16) : ce(64));
                  }
                  Se();
                  var Ee = V();
                  if (Ee === 0) V();
                  else if (Ee === 1)
                    for (ae(1), he(), he(), b = V(), X = 0; X < b; X++) he();
                  Se(),
                    ae(1),
                    (C = V()),
                    (U = V()),
                    (G = $(1)),
                    G === 0 && ae(1),
                    ae(1),
                    se() && ((f = V()), (g = V()), (m = V()), (E = V()));
                  var pe = [1, 1];
                  if (se() && se()) {
                    var Re = H();
                    switch (Re) {
                      case 1:
                        pe = [1, 1];
                        break;
                      case 2:
                        pe = [12, 11];
                        break;
                      case 3:
                        pe = [10, 11];
                        break;
                      case 4:
                        pe = [16, 11];
                        break;
                      case 5:
                        pe = [40, 33];
                        break;
                      case 6:
                        pe = [24, 11];
                        break;
                      case 7:
                        pe = [20, 11];
                        break;
                      case 8:
                        pe = [32, 11];
                        break;
                      case 9:
                        pe = [80, 33];
                        break;
                      case 10:
                        pe = [18, 11];
                        break;
                      case 11:
                        pe = [15, 11];
                        break;
                      case 12:
                        pe = [64, 33];
                        break;
                      case 13:
                        pe = [160, 99];
                        break;
                      case 14:
                        pe = [4, 3];
                        break;
                      case 15:
                        pe = [3, 2];
                        break;
                      case 16:
                        pe = [2, 1];
                        break;
                      case 255: {
                        pe = [(H() << 8) | H(), (H() << 8) | H()];
                        break;
                      }
                    }
                  }
                  return {
                    width: Math.ceil((C + 1) * 16 - f * 2 - g * 2),
                    height: (2 - G) * (U + 1) * 16 - (G ? 2 : 4) * (m + E),
                    pixelRatio: pe,
                  };
                }),
                (L.readSliceType = function () {
                  return this.readUByte(), this.readUEG(), this.readUEG();
                }),
                y
              );
            })(),
            Pe = _e,
            ke = (function () {
              function y(x, f, g, m) {
                (this.decryptdata = g),
                  (this.discardEPB = m),
                  (this.decrypter = new D.default(x, f, {
                    removePKCS7Padding: !1,
                  }));
              }
              var L = y.prototype;
              return (
                (L.decryptBuffer = function (f, g) {
                  this.decrypter.decrypt(
                    f,
                    this.decryptdata.key.buffer,
                    this.decryptdata.iv.buffer,
                    g
                  );
                }),
                (L.decryptAacSample = function (f, g, m, E) {
                  var A = f[g].unit,
                    b = A.subarray(16, A.length - (A.length % 16)),
                    C = b.buffer.slice(b.byteOffset, b.byteOffset + b.length),
                    U = this;
                  this.decryptBuffer(C, function (G) {
                    (G = new Uint8Array(G)),
                      A.set(G, 16),
                      E || U.decryptAacSamples(f, g + 1, m);
                  });
                }),
                (L.decryptAacSamples = function (f, g, m) {
                  for (; ; g++) {
                    if (g >= f.length) {
                      m();
                      return;
                    }
                    if (!(f[g].unit.length < 32)) {
                      var E = this.decrypter.isSync();
                      if ((this.decryptAacSample(f, g, m, E), !E)) return;
                    }
                  }
                }),
                (L.getAvcEncryptedData = function (f) {
                  for (
                    var g = Math.floor((f.length - 48) / 160) * 16 + 16,
                      m = new Int8Array(g),
                      E = 0,
                      A = 32;
                    A <= f.length - 16;
                    A += 160, E += 16
                  )
                    m.set(f.subarray(A, A + 16), E);
                  return m;
                }),
                (L.getAvcDecryptedUnit = function (f, g) {
                  g = new Uint8Array(g);
                  for (var m = 0, E = 32; E <= f.length - 16; E += 160, m += 16)
                    f.set(g.subarray(m, m + 16), E);
                  return f;
                }),
                (L.decryptAvcSample = function (f, g, m, E, A, b) {
                  var C = this.discardEPB(A.data),
                    U = this.getAvcEncryptedData(C),
                    G = this;
                  this.decryptBuffer(U.buffer, function (M) {
                    (A.data = G.getAvcDecryptedUnit(C, M)),
                      b || G.decryptAvcSamples(f, g, m + 1, E);
                  });
                }),
                (L.decryptAvcSamples = function (f, g, m, E) {
                  for (; ; g++, m = 0) {
                    if (g >= f.length) {
                      E();
                      return;
                    }
                    for (var A = f[g].units; !(m >= A.length); m++) {
                      var b = A[m];
                      if (
                        !(b.data.length <= 48 || (b.type !== 1 && b.type !== 5))
                      ) {
                        var C = this.decrypter.isSync();
                        if ((this.decryptAvcSample(f, g, m, E, b, C), !C))
                          return;
                      }
                    }
                  }
                }),
                y
              );
            })(),
            Le = ke,
            dt = { video: 1, audio: 2, id3: 3, text: 4 },
            we = (function () {
              function y(x, f, g, m) {
                (this.observer = x),
                  (this.config = g),
                  (this.typeSupported = m),
                  (this.remuxer = f),
                  (this.sampleAes = null),
                  (this.pmtUnknownTypes = {});
              }
              var L = y.prototype;
              return (
                (L.setDecryptData = function (f) {
                  f != null && f.key != null && f.method === "SAMPLE-AES"
                    ? (this.sampleAes = new Le(
                        this.observer,
                        this.config,
                        f,
                        this.discardEPB
                      ))
                    : (this.sampleAes = null);
                }),
                (y.probe = function (f) {
                  var g = y._syncOffset(f);
                  return g < 0
                    ? !1
                    : (g &&
                        h.logger.warn(
                          "MPEG2-TS detected but first sync word found @ offset " +
                            g +
                            ", junk ahead ?"
                        ),
                      !0);
                }),
                (y._syncOffset = function (f) {
                  for (var g = Math.min(1e3, f.length - 564), m = 0; m < g; ) {
                    if (
                      f[m] === 71 &&
                      f[m + 188] === 71 &&
                      f[m + 2 * 188] === 71
                    )
                      return m;
                    m++;
                  }
                  return -1;
                }),
                (y.createTrack = function (f, g) {
                  return {
                    container:
                      f === "video" || f === "audio" ? "video/mp2t" : void 0,
                    type: f,
                    id: dt[f],
                    pid: -1,
                    inputTimeScale: 9e4,
                    sequenceNumber: 0,
                    samples: [],
                    dropped: f === "video" ? 0 : void 0,
                    isAAC: f === "audio" ? !0 : void 0,
                    duration: f === "audio" ? g : void 0,
                  };
                }),
                (L.resetInitSegment = function (f, g, m, E) {
                  (this.pmtParsed = !1),
                    (this._pmtId = -1),
                    (this.pmtUnknownTypes = {}),
                    (this._avcTrack = y.createTrack("video", E)),
                    (this._audioTrack = y.createTrack("audio", E)),
                    (this._id3Track = y.createTrack("id3", E)),
                    (this._txtTrack = y.createTrack("text", E)),
                    (this.aacOverFlow = null),
                    (this.aacLastPTS = null),
                    (this.avcSample = null),
                    (this.audioCodec = g),
                    (this.videoCodec = m),
                    (this._duration = E);
                }),
                (L.resetTimeStamp = function () {}),
                (L.append = function (f, g, m, E) {
                  var A,
                    b = f.length,
                    C,
                    U,
                    G,
                    M,
                    X,
                    H = !1;
                  (this.pmtUnknownTypes = {}), (this.contiguous = m);
                  var $ = this.pmtParsed,
                    V = this._avcTrack,
                    se = this._audioTrack,
                    ae = this._id3Track,
                    he = V.pid,
                    Se = se.pid,
                    ce = ae.pid,
                    Fe = this._pmtId,
                    Ee = V.pesData,
                    pe = se.pesData,
                    Re = ae.pesData,
                    De = this._parsePAT,
                    qe = this._parsePMT.bind(this),
                    He = this._parsePES,
                    Oe = this._parseAVCPES.bind(this),
                    et = this._parseAACPES.bind(this),
                    We = this._parseMPEGPES.bind(this),
                    at = this._parseID3PES.bind(this),
                    Ke = y._syncOffset(f);
                  for (b -= (b + Ke) % 188, A = Ke; A < b; A += 188)
                    if (f[A] === 71) {
                      if (
                        ((C = !!(f[A + 1] & 64)),
                        (U = ((f[A + 1] & 31) << 8) + f[A + 2]),
                        (G = (f[A + 3] & 48) >> 4),
                        G > 1)
                      ) {
                        if (((M = A + 5 + f[A + 4]), M === A + 188)) continue;
                      } else M = A + 4;
                      switch (U) {
                        case he:
                          C &&
                            (Ee && (X = He(Ee)) && Oe(X, !1),
                            (Ee = { data: [], size: 0 })),
                            Ee &&
                              (Ee.data.push(f.subarray(M, A + 188)),
                              (Ee.size += A + 188 - M));
                          break;
                        case Se:
                          C &&
                            (pe && (X = He(pe)) && (se.isAAC ? et(X) : We(X)),
                            (pe = { data: [], size: 0 })),
                            pe &&
                              (pe.data.push(f.subarray(M, A + 188)),
                              (pe.size += A + 188 - M));
                          break;
                        case ce:
                          C &&
                            (Re && (X = He(Re)) && at(X),
                            (Re = { data: [], size: 0 })),
                            Re &&
                              (Re.data.push(f.subarray(M, A + 188)),
                              (Re.size += A + 188 - M));
                          break;
                        case 0:
                          C && (M += f[M] + 1), (Fe = this._pmtId = De(f, M));
                          break;
                        case Fe:
                          C && (M += f[M] + 1);
                          var Ce = qe(
                            f,
                            M,
                            this.typeSupported.mpeg === !0 ||
                              this.typeSupported.mp3 === !0,
                            this.sampleAes != null
                          );
                          (he = Ce.avc),
                            he > 0 && (V.pid = he),
                            (Se = Ce.audio),
                            Se > 0 && ((se.pid = Se), (se.isAAC = Ce.isAAC)),
                            (ce = Ce.id3),
                            ce > 0 && (ae.pid = ce),
                            H &&
                              !$ &&
                              (h.logger.log("reparse from beginning"),
                              (H = !1),
                              (A = Ke - 188)),
                            ($ = this.pmtParsed = !0);
                          break;
                        case 17:
                        case 8191:
                          break;
                        default:
                          H = !0;
                          break;
                      }
                    } else
                      this.observer.trigger(Q.default.ERROR, {
                        type: W.ErrorTypes.MEDIA_ERROR,
                        details: W.ErrorDetails.FRAG_PARSING_ERROR,
                        fatal: !1,
                        reason: "TS packet did not start with 0x47",
                      });
                  Ee && (X = He(Ee))
                    ? (Oe(X, !0), (V.pesData = null))
                    : (V.pesData = Ee),
                    pe && (X = He(pe))
                      ? (se.isAAC ? et(X) : We(X), (se.pesData = null))
                      : (pe &&
                          pe.size &&
                          h.logger.log(
                            "last AAC PES packet truncated,might overlap between fragments"
                          ),
                        (se.pesData = pe)),
                    Re && (X = He(Re))
                      ? (at(X), (ae.pesData = null))
                      : (ae.pesData = Re),
                    this.sampleAes == null
                      ? this.remuxer.remux(se, V, ae, this._txtTrack, g, m, E)
                      : this.decryptAndRemux(
                          se,
                          V,
                          ae,
                          this._txtTrack,
                          g,
                          m,
                          E
                        );
                }),
                (L.decryptAndRemux = function (f, g, m, E, A, b, C) {
                  if (f.samples && f.isAAC) {
                    var U = this;
                    this.sampleAes.decryptAacSamples(f.samples, 0, function () {
                      U.decryptAndRemuxAvc(f, g, m, E, A, b, C);
                    });
                  } else this.decryptAndRemuxAvc(f, g, m, E, A, b, C);
                }),
                (L.decryptAndRemuxAvc = function (f, g, m, E, A, b, C) {
                  if (g.samples) {
                    var U = this;
                    this.sampleAes.decryptAvcSamples(
                      g.samples,
                      0,
                      0,
                      function () {
                        U.remuxer.remux(f, g, m, E, A, b, C);
                      }
                    );
                  } else this.remuxer.remux(f, g, m, E, A, b, C);
                }),
                (L.destroy = function () {
                  (this._initPTS = this._initDTS = void 0),
                    (this._duration = 0);
                }),
                (L._parsePAT = function (f, g) {
                  return ((f[g + 10] & 31) << 8) | f[g + 11];
                }),
                (L._trackUnknownPmt = function (f, g, m) {
                  var E = this.pmtUnknownTypes[f] || 0;
                  return (
                    E === 0 &&
                      ((this.pmtUnknownTypes[f] = 0), g.call(h.logger, m)),
                    this.pmtUnknownTypes[f]++,
                    E
                  );
                }),
                (L._parsePMT = function (f, g, m, E) {
                  var A,
                    b,
                    C,
                    U,
                    G = { audio: -1, avc: -1, id3: -1, isAAC: !0 };
                  for (
                    A = ((f[g + 1] & 15) << 8) | f[g + 2],
                      b = g + 3 + A - 4,
                      C = ((f[g + 10] & 15) << 8) | f[g + 11],
                      g += 12 + C;
                    g < b;

                  ) {
                    switch (((U = ((f[g + 1] & 31) << 8) | f[g + 2]), f[g])) {
                      case 207:
                        if (!E) {
                          this._trackUnknownPmt(
                            f[g],
                            h.logger.warn,
                            "ADTS AAC with AES-128-CBC frame encryption found in unencrypted stream"
                          );
                          break;
                        }
                      case 15:
                        G.audio === -1 && (G.audio = U);
                        break;
                      case 21:
                        G.id3 === -1 && (G.id3 = U);
                        break;
                      case 219:
                        if (!E) {
                          this._trackUnknownPmt(
                            f[g],
                            h.logger.warn,
                            "H.264 with AES-128-CBC slice encryption found in unencrypted stream"
                          );
                          break;
                        }
                      case 27:
                        G.avc === -1 && (G.avc = U);
                        break;
                      case 3:
                      case 4:
                        m
                          ? G.audio === -1 && ((G.audio = U), (G.isAAC = !1))
                          : this._trackUnknownPmt(
                              f[g],
                              h.logger.warn,
                              "MPEG audio found, not supported in this browser"
                            );
                        break;
                      case 36:
                        this._trackUnknownPmt(
                          f[g],
                          h.logger.warn,
                          "Unsupported HEVC stream type found"
                        );
                        break;
                      default:
                        this._trackUnknownPmt(
                          f[g],
                          h.logger.log,
                          "Unknown stream type:" + f[g]
                        );
                        break;
                    }
                    g += (((f[g + 3] & 15) << 8) | f[g + 4]) + 5;
                  }
                  return G;
                }),
                (L._parsePES = function (f) {
                  var g = 0,
                    m,
                    E,
                    A,
                    b,
                    C,
                    U,
                    G,
                    M,
                    X,
                    H = f.data;
                  if (!f || f.size === 0) return null;
                  for (; H[0].length < 19 && H.length > 1; ) {
                    var $ = new Uint8Array(H[0].length + H[1].length);
                    $.set(H[0]),
                      $.set(H[1], H[0].length),
                      (H[0] = $),
                      H.splice(1, 1);
                  }
                  if (
                    ((m = H[0]),
                    (A = (m[0] << 16) + (m[1] << 8) + m[2]),
                    A === 1)
                  ) {
                    if (
                      ((b = (m[4] << 8) + m[5]),
                      (b && b > f.size - 6) ||
                        ((E = m[7]),
                        E & 192 &&
                          ((G =
                            (m[9] & 14) * 536870912 +
                            (m[10] & 255) * 4194304 +
                            (m[11] & 254) * 16384 +
                            (m[12] & 255) * 128 +
                            (m[13] & 254) / 2),
                          E & 64
                            ? ((M =
                                (m[14] & 14) * 536870912 +
                                (m[15] & 255) * 4194304 +
                                (m[16] & 254) * 16384 +
                                (m[17] & 255) * 128 +
                                (m[18] & 254) / 2),
                              G - M > 60 * 9e4 &&
                                (h.logger.warn(
                                  Math.round((G - M) / 9e4) +
                                    "s delta between PTS and DTS, align them"
                                ),
                                (G = M)))
                            : (M = G)),
                        (C = m[8]),
                        (X = C + 9),
                        f.size <= X))
                    )
                      return null;
                    (f.size -= X), (U = new Uint8Array(f.size));
                    for (var V = 0, se = H.length; V < se; V++) {
                      m = H[V];
                      var ae = m.byteLength;
                      if (X)
                        if (X > ae) {
                          X -= ae;
                          continue;
                        } else (m = m.subarray(X)), (ae -= X), (X = 0);
                      U.set(m, g), (g += ae);
                    }
                    return (
                      b && (b -= C + 3), { data: U, pts: G, dts: M, len: b }
                    );
                  } else return null;
                }),
                (L.pushAccesUnit = function (f, g) {
                  if (f.units.length && f.frame) {
                    var m = g.samples,
                      E = m.length;
                    if (isNaN(f.pts))
                      if (E) {
                        var A = m[E - 1];
                        (f.pts = A.pts), (f.dts = A.dts);
                      } else {
                        g.dropped++;
                        return;
                      }
                    !this.config.forceKeyFrameOnDiscontinuity ||
                    f.key === !0 ||
                    (g.sps && (E || this.contiguous))
                      ? ((f.id = E), m.push(f))
                      : g.dropped++;
                  }
                  f.debug.length &&
                    h.logger.log(f.pts + "/" + f.dts + ":" + f.debug);
                }),
                (L._parseAVCPES = function (f, g) {
                  var m = this,
                    E = this._avcTrack,
                    A = this._parseAVCNALu(f.data),
                    b,
                    C = this.avcSample,
                    U,
                    G = !1,
                    M,
                    X = this.pushAccesUnit.bind(this),
                    H = function (V, se, ae, he) {
                      return { key: V, pts: se, dts: ae, units: [], debug: he };
                    };
                  (f.data = null),
                    C &&
                      A.length &&
                      !E.audFound &&
                      (X(C, E), (C = this.avcSample = H(!1, f.pts, f.dts, ""))),
                    A.forEach(function ($) {
                      switch ($.type) {
                        case 1:
                          (U = !0),
                            C || (C = m.avcSample = H(!0, f.pts, f.dts, "")),
                            (C.frame = !0);
                          var V = $.data;
                          if (G && V.length > 4) {
                            var se = new Pe(V).readSliceType();
                            (se === 2 || se === 4 || se === 7 || se === 9) &&
                              (C.key = !0);
                          }
                          break;
                        case 5:
                          (U = !0),
                            C || (C = m.avcSample = H(!0, f.pts, f.dts, "")),
                            (C.key = !0),
                            (C.frame = !0);
                          break;
                        case 6:
                          (U = !0),
                            (b = new Pe(m.discardEPB($.data))),
                            b.readUByte();
                          for (
                            var ae = 0, he = 0, Se = !1, ce = 0;
                            !Se && b.bytesAvailable > 1;

                          ) {
                            ae = 0;
                            do (ce = b.readUByte()), (ae += ce);
                            while (ce === 255);
                            he = 0;
                            do (ce = b.readUByte()), (he += ce);
                            while (ce === 255);
                            if (ae === 4 && b.bytesAvailable !== 0) {
                              Se = !0;
                              var Fe = b.readUByte();
                              if (Fe === 181) {
                                var Ee = b.readUShort();
                                if (Ee === 49) {
                                  var pe = b.readUInt();
                                  if (pe === 1195456820) {
                                    var Re = b.readUByte();
                                    if (Re === 3) {
                                      var De = b.readUByte(),
                                        qe = b.readUByte(),
                                        He = 31 & De,
                                        Oe = [De, qe];
                                      for (M = 0; M < He; M++)
                                        Oe.push(b.readUByte()),
                                          Oe.push(b.readUByte()),
                                          Oe.push(b.readUByte());
                                      m._insertSampleInOrder(
                                        m._txtTrack.samples,
                                        { type: 3, pts: f.pts, bytes: Oe }
                                      );
                                    }
                                  }
                                }
                              }
                            } else if (ae === 5 && b.bytesAvailable !== 0) {
                              if (((Se = !0), he > 16)) {
                                var et = [];
                                for (M = 0; M < 16; M++)
                                  et.push(b.readUByte().toString(16)),
                                    (M === 3 ||
                                      M === 5 ||
                                      M === 7 ||
                                      M === 9) &&
                                      et.push("-");
                                var We = he - 16,
                                  at = new Uint8Array(We);
                                for (M = 0; M < We; M++) at[M] = b.readUByte();
                                m._insertSampleInOrder(m._txtTrack.samples, {
                                  pts: f.pts,
                                  payloadType: ae,
                                  uuid: et.join(""),
                                  userDataBytes: at,
                                  userData: Object(B.utf8ArrayToStr)(at.buffer),
                                });
                              }
                            } else if (he < b.bytesAvailable)
                              for (M = 0; M < he; M++) b.readUByte();
                          }
                          break;
                        case 7:
                          if (((U = !0), (G = !0), !E.sps)) {
                            b = new Pe($.data);
                            var Ke = b.readSPS();
                            (E.width = Ke.width),
                              (E.height = Ke.height),
                              (E.pixelRatio = Ke.pixelRatio),
                              (E.sps = [$.data]),
                              (E.duration = m._duration);
                            var Ce = $.data.subarray(1, 4),
                              ct = "avc1.";
                            for (M = 0; M < 3; M++) {
                              var gt = Ce[M].toString(16);
                              gt.length < 2 && (gt = "0" + gt), (ct += gt);
                            }
                            E.codec = ct;
                          }
                          break;
                        case 8:
                          (U = !0), E.pps || (E.pps = [$.data]);
                          break;
                        case 9:
                          (U = !1),
                            (E.audFound = !0),
                            C && X(C, E),
                            (C = m.avcSample = H(!1, f.pts, f.dts, ""));
                          break;
                        case 12:
                          U = !1;
                          break;
                        default:
                          (U = !1),
                            C && (C.debug += "unknown NAL " + $.type + " ");
                          break;
                      }
                      if (C && U) {
                        var lt = C.units;
                        lt.push($);
                      }
                    }),
                    g && C && (X(C, E), (this.avcSample = null));
                }),
                (L._insertSampleInOrder = function (f, g) {
                  var m = f.length;
                  if (m > 0) {
                    if (g.pts >= f[m - 1].pts) f.push(g);
                    else
                      for (var E = m - 1; E >= 0; E--)
                        if (g.pts < f[E].pts) {
                          f.splice(E, 0, g);
                          break;
                        }
                  } else f.push(g);
                }),
                (L._getLastNalUnit = function () {
                  var f = this.avcSample,
                    g;
                  if (!f || f.units.length === 0) {
                    var m = this._avcTrack,
                      E = m.samples;
                    f = E[E.length - 1];
                  }
                  if (f) {
                    var A = f.units;
                    g = A[A.length - 1];
                  }
                  return g;
                }),
                (L._parseAVCNALu = function (f) {
                  var g = 0,
                    m = f.byteLength,
                    E,
                    A,
                    b = this._avcTrack,
                    C = b.naluState || 0,
                    U = C,
                    G = [],
                    M,
                    X,
                    H = -1,
                    $;
                  for (
                    C === -1 && ((H = 0), ($ = f[0] & 31), (C = 0), (g = 1));
                    g < m;

                  ) {
                    if (((E = f[g++]), !C)) {
                      C = E ? 0 : 1;
                      continue;
                    }
                    if (C === 1) {
                      C = E ? 0 : 2;
                      continue;
                    }
                    if (!E) C = 3;
                    else if (E === 1) {
                      if (H >= 0)
                        (M = { data: f.subarray(H, g - C - 1), type: $ }),
                          G.push(M);
                      else {
                        var V = this._getLastNalUnit();
                        if (
                          V &&
                          (U &&
                            g <= 4 - U &&
                            V.state &&
                            (V.data = V.data.subarray(
                              0,
                              V.data.byteLength - U
                            )),
                          (A = g - C - 1),
                          A > 0)
                        ) {
                          var se = new Uint8Array(V.data.byteLength + A);
                          se.set(V.data, 0),
                            se.set(f.subarray(0, A), V.data.byteLength),
                            (V.data = se);
                        }
                      }
                      g < m
                        ? ((X = f[g] & 31), (H = g), ($ = X), (C = 0))
                        : (C = -1);
                    } else C = 0;
                  }
                  if (
                    (H >= 0 &&
                      C >= 0 &&
                      ((M = { data: f.subarray(H, m), type: $, state: C }),
                      G.push(M)),
                    G.length === 0)
                  ) {
                    var ae = this._getLastNalUnit();
                    if (ae) {
                      var he = new Uint8Array(
                        ae.data.byteLength + f.byteLength
                      );
                      he.set(ae.data, 0),
                        he.set(f, ae.data.byteLength),
                        (ae.data = he);
                    }
                  }
                  return (b.naluState = C), G;
                }),
                (L.discardEPB = function (f) {
                  for (var g = f.byteLength, m = [], E = 1, A, b; E < g - 2; )
                    f[E] === 0 && f[E + 1] === 0 && f[E + 2] === 3
                      ? (m.push(E + 2), (E += 2))
                      : E++;
                  if (m.length === 0) return f;
                  (A = g - m.length), (b = new Uint8Array(A));
                  var C = 0;
                  for (E = 0; E < A; C++, E++)
                    C === m[0] && (C++, m.shift()), (b[E] = f[C]);
                  return b;
                }),
                (L._parseAACPES = function (f) {
                  var g = this._audioTrack,
                    m = f.data,
                    E = f.pts,
                    A = 0,
                    b = this.aacOverFlow,
                    C = this.aacLastPTS,
                    U,
                    G,
                    M,
                    X,
                    H;
                  if (b) {
                    var $ = new Uint8Array(b.byteLength + m.byteLength);
                    $.set(b, 0), $.set(m, b.byteLength), (m = $);
                  }
                  for (M = A, H = m.length; M < H - 1 && !_(m, M); M++);
                  if (M) {
                    var V, se;
                    if (
                      (M < H - 1
                        ? ((V =
                            "AAC PES did not start with ADTS header,offset:" +
                            M),
                          (se = !1))
                        : ((V = "no ADTS header found in AAC PES"), (se = !0)),
                      h.logger.warn("parsing error:" + V),
                      this.observer.trigger(Q.default.ERROR, {
                        type: W.ErrorTypes.MEDIA_ERROR,
                        details: W.ErrorDetails.FRAG_PARSING_ERROR,
                        fatal: se,
                        reason: V,
                      }),
                      se)
                    )
                      return;
                  }
                  if (
                    (k(g, this.observer, m, M, this.audioCodec),
                    (G = 0),
                    (U = w(g.samplerate)),
                    b && C)
                  ) {
                    var ae = C + U;
                    Math.abs(ae - E) > 1 &&
                      (h.logger.log(
                        "AAC: align PTS for overlapping frames by " +
                          Math.round((ae - E) / 90)
                      ),
                      (E = ae));
                  }
                  for (; M < H; )
                    if (_(m, M)) {
                      if (M + 5 < H) {
                        var he = N(g, m, M, E, G);
                        if (he) {
                          (M += he.length), (X = he.sample.pts), G++;
                          continue;
                        }
                      }
                      break;
                    } else M++;
                  M < H ? (b = m.subarray(M, H)) : (b = null),
                    (this.aacOverFlow = b),
                    (this.aacLastPTS = X);
                }),
                (L._parseMPEGPES = function (f) {
                  for (
                    var g = f.data, m = g.length, E = 0, A = 0, b = f.pts;
                    A < m;

                  )
                    if (fe.isHeader(g, A)) {
                      var C = fe.appendFrame(this._audioTrack, g, A, b, E);
                      if (C) (A += C.length), E++;
                      else break;
                    } else A++;
                }),
                (L._parseID3PES = function (f) {
                  this._id3Track.samples.push(f);
                }),
                y
              );
            })(),
            Me = we,
            Ve = (function () {
              function y(x, f, g) {
                (this.observer = x), (this.config = g), (this.remuxer = f);
              }
              var L = y.prototype;
              return (
                (L.resetInitSegment = function (f, g, m, E) {
                  this._audioTrack = {
                    container: "audio/mpeg",
                    type: "audio",
                    id: -1,
                    sequenceNumber: 0,
                    isAAC: !1,
                    samples: [],
                    len: 0,
                    manifestCodec: g,
                    duration: E,
                    inputTimeScale: 9e4,
                  };
                }),
                (L.resetTimeStamp = function () {}),
                (y.probe = function (f) {
                  var g,
                    m,
                    E = B.default.getID3Data(f, 0);
                  if (E && B.default.getTimeStamp(E) !== void 0) {
                    for (
                      g = E.length, m = Math.min(f.length - 1, g + 100);
                      g < m;
                      g++
                    )
                      if (fe.probe(f, g))
                        return h.logger.log("MPEG Audio sync word found !"), !0;
                  }
                  return !1;
                }),
                (L.append = function (f, g, m, E) {
                  for (
                    var A = B.default.getID3Data(f, 0) || [],
                      b = B.default.getTimeStamp(A),
                      C = b !== void 0 ? 90 * b : g * 9e4,
                      U = A.length,
                      G = f.length,
                      M = 0,
                      X = 0,
                      H = this._audioTrack,
                      $ = [{ pts: C, dts: C, data: A }];
                    U < G;

                  )
                    if (fe.isHeader(f, U)) {
                      var V = fe.appendFrame(H, f, U, C, M);
                      if (V) (U += V.length), (X = V.sample.pts), M++;
                      else break;
                    } else
                      B.default.isHeader(f, U)
                        ? ((A = B.default.getID3Data(f, U)),
                          $.push({ pts: X, dts: X, data: A }),
                          (U += A.length))
                        : U++;
                  this.remuxer.remux(
                    H,
                    { samples: [] },
                    { samples: $, inputTimeScale: 9e4 },
                    { samples: [] },
                    g,
                    m,
                    E
                  );
                }),
                (L.destroy = function () {}),
                y
              );
            })(),
            Be = Ve,
            Ge = (function () {
              function y() {}
              return (
                (y.getSilentFrame = function (x, f) {
                  switch (x) {
                    case "mp4a.40.2":
                      if (f === 1)
                        return new Uint8Array([0, 200, 0, 128, 35, 128]);
                      if (f === 2)
                        return new Uint8Array([
                          33, 0, 73, 144, 2, 25, 0, 35, 128,
                        ]);
                      if (f === 3)
                        return new Uint8Array([
                          0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 142,
                        ]);
                      if (f === 4)
                        return new Uint8Array([
                          0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 128,
                          44, 128, 8, 2, 56,
                        ]);
                      if (f === 5)
                        return new Uint8Array([
                          0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 130,
                          48, 4, 153, 0, 33, 144, 2, 56,
                        ]);
                      if (f === 6)
                        return new Uint8Array([
                          0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 130,
                          48, 4, 153, 0, 33, 144, 2, 0, 178, 0, 32, 8, 224,
                        ]);
                      break;
                    default:
                      if (f === 1)
                        return new Uint8Array([
                          1, 64, 34, 128, 163, 78, 230, 128, 186, 8, 0, 0, 0,
                          28, 6, 241, 193, 10, 90, 90, 90, 90, 90, 90, 90, 90,
                          90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90,
                          90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90,
                          90, 90, 90, 90, 90, 90, 94,
                        ]);
                      if (f === 2)
                        return new Uint8Array([
                          1, 64, 34, 128, 163, 94, 230, 128, 186, 8, 0, 0, 0, 0,
                          149, 0, 6, 241, 161, 10, 90, 90, 90, 90, 90, 90, 90,
                          90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90,
                          90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90,
                          90, 90, 90, 90, 90, 94,
                        ]);
                      if (f === 3)
                        return new Uint8Array([
                          1, 64, 34, 128, 163, 94, 230, 128, 186, 8, 0, 0, 0, 0,
                          149, 0, 6, 241, 161, 10, 90, 90, 90, 90, 90, 90, 90,
                          90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90,
                          90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90,
                          90, 90, 90, 90, 90, 94,
                        ]);
                      break;
                  }
                  return null;
                }),
                y
              );
            })(),
            Ne = Ge,
            ge = Math.pow(2, 32) - 1,
            rt = (function () {
              function y() {}
              return (
                (y.init = function () {
                  y.types = {
                    avc1: [],
                    avcC: [],
                    btrt: [],
                    dinf: [],
                    dref: [],
                    esds: [],
                    ftyp: [],
                    hdlr: [],
                    mdat: [],
                    mdhd: [],
                    mdia: [],
                    mfhd: [],
                    minf: [],
                    moof: [],
                    moov: [],
                    mp4a: [],
                    ".mp3": [],
                    mvex: [],
                    mvhd: [],
                    pasp: [],
                    sdtp: [],
                    stbl: [],
                    stco: [],
                    stsc: [],
                    stsd: [],
                    stsz: [],
                    stts: [],
                    tfdt: [],
                    tfhd: [],
                    traf: [],
                    trak: [],
                    trun: [],
                    trex: [],
                    tkhd: [],
                    vmhd: [],
                    smhd: [],
                  };
                  var x;
                  for (x in y.types)
                    y.types.hasOwnProperty(x) &&
                      (y.types[x] = [
                        x.charCodeAt(0),
                        x.charCodeAt(1),
                        x.charCodeAt(2),
                        x.charCodeAt(3),
                      ]);
                  var f = new Uint8Array([
                      0, 0, 0, 0, 0, 0, 0, 0, 118, 105, 100, 101, 0, 0, 0, 0, 0,
                      0, 0, 0, 0, 0, 0, 0, 86, 105, 100, 101, 111, 72, 97, 110,
                      100, 108, 101, 114, 0,
                    ]),
                    g = new Uint8Array([
                      0, 0, 0, 0, 0, 0, 0, 0, 115, 111, 117, 110, 0, 0, 0, 0, 0,
                      0, 0, 0, 0, 0, 0, 0, 83, 111, 117, 110, 100, 72, 97, 110,
                      100, 108, 101, 114, 0,
                    ]);
                  y.HDLR_TYPES = { video: f, audio: g };
                  var m = new Uint8Array([
                      0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 12, 117, 114, 108, 32, 0,
                      0, 0, 1,
                    ]),
                    E = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]);
                  (y.STTS = y.STSC = y.STCO = E),
                    (y.STSZ = new Uint8Array([
                      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    ])),
                    (y.VMHD = new Uint8Array([
                      0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0,
                    ])),
                    (y.SMHD = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0])),
                    (y.STSD = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1]));
                  var A = new Uint8Array([105, 115, 111, 109]),
                    b = new Uint8Array([97, 118, 99, 49]),
                    C = new Uint8Array([0, 0, 0, 1]);
                  (y.FTYP = y.box(y.types.ftyp, A, C, A, b)),
                    (y.DINF = y.box(y.types.dinf, y.box(y.types.dref, m)));
                }),
                (y.box = function (x) {
                  for (
                    var f = Array.prototype.slice.call(arguments, 1),
                      g = 8,
                      m = f.length,
                      E = m,
                      A;
                    m--;

                  )
                    g += f[m].byteLength;
                  for (
                    A = new Uint8Array(g),
                      A[0] = (g >> 24) & 255,
                      A[1] = (g >> 16) & 255,
                      A[2] = (g >> 8) & 255,
                      A[3] = g & 255,
                      A.set(x, 4),
                      m = 0,
                      g = 8;
                    m < E;
                    m++
                  )
                    A.set(f[m], g), (g += f[m].byteLength);
                  return A;
                }),
                (y.hdlr = function (x) {
                  return y.box(y.types.hdlr, y.HDLR_TYPES[x]);
                }),
                (y.mdat = function (x) {
                  return y.box(y.types.mdat, x);
                }),
                (y.mdhd = function (x, f) {
                  f *= x;
                  var g = Math.floor(f / (ge + 1)),
                    m = Math.floor(f % (ge + 1));
                  return y.box(
                    y.types.mdhd,
                    new Uint8Array([
                      1,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      2,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      3,
                      (x >> 24) & 255,
                      (x >> 16) & 255,
                      (x >> 8) & 255,
                      x & 255,
                      g >> 24,
                      (g >> 16) & 255,
                      (g >> 8) & 255,
                      g & 255,
                      m >> 24,
                      (m >> 16) & 255,
                      (m >> 8) & 255,
                      m & 255,
                      85,
                      196,
                      0,
                      0,
                    ])
                  );
                }),
                (y.mdia = function (x) {
                  return y.box(
                    y.types.mdia,
                    y.mdhd(x.timescale, x.duration),
                    y.hdlr(x.type),
                    y.minf(x)
                  );
                }),
                (y.mfhd = function (x) {
                  return y.box(
                    y.types.mfhd,
                    new Uint8Array([
                      0,
                      0,
                      0,
                      0,
                      x >> 24,
                      (x >> 16) & 255,
                      (x >> 8) & 255,
                      x & 255,
                    ])
                  );
                }),
                (y.minf = function (x) {
                  return x.type === "audio"
                    ? y.box(
                        y.types.minf,
                        y.box(y.types.smhd, y.SMHD),
                        y.DINF,
                        y.stbl(x)
                      )
                    : y.box(
                        y.types.minf,
                        y.box(y.types.vmhd, y.VMHD),
                        y.DINF,
                        y.stbl(x)
                      );
                }),
                (y.moof = function (x, f, g) {
                  return y.box(y.types.moof, y.mfhd(x), y.traf(g, f));
                }),
                (y.moov = function (x) {
                  for (var f = x.length, g = []; f--; ) g[f] = y.trak(x[f]);
                  return y.box.apply(
                    null,
                    [y.types.moov, y.mvhd(x[0].timescale, x[0].duration)]
                      .concat(g)
                      .concat(y.mvex(x))
                  );
                }),
                (y.mvex = function (x) {
                  for (var f = x.length, g = []; f--; ) g[f] = y.trex(x[f]);
                  return y.box.apply(null, [y.types.mvex].concat(g));
                }),
                (y.mvhd = function (x, f) {
                  f *= x;
                  var g = Math.floor(f / (ge + 1)),
                    m = Math.floor(f % (ge + 1)),
                    E = new Uint8Array([
                      1,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      2,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      3,
                      (x >> 24) & 255,
                      (x >> 16) & 255,
                      (x >> 8) & 255,
                      x & 255,
                      g >> 24,
                      (g >> 16) & 255,
                      (g >> 8) & 255,
                      g & 255,
                      m >> 24,
                      (m >> 16) & 255,
                      (m >> 8) & 255,
                      m & 255,
                      0,
                      1,
                      0,
                      0,
                      1,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      1,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      1,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      64,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      255,
                      255,
                      255,
                      255,
                    ]);
                  return y.box(y.types.mvhd, E);
                }),
                (y.sdtp = function (x) {
                  var f = x.samples || [],
                    g = new Uint8Array(4 + f.length),
                    m,
                    E;
                  for (E = 0; E < f.length; E++)
                    (m = f[E].flags),
                      (g[E + 4] =
                        (m.dependsOn << 4) |
                        (m.isDependedOn << 2) |
                        m.hasRedundancy);
                  return y.box(y.types.sdtp, g);
                }),
                (y.stbl = function (x) {
                  return y.box(
                    y.types.stbl,
                    y.stsd(x),
                    y.box(y.types.stts, y.STTS),
                    y.box(y.types.stsc, y.STSC),
                    y.box(y.types.stsz, y.STSZ),
                    y.box(y.types.stco, y.STCO)
                  );
                }),
                (y.avc1 = function (x) {
                  var f = [],
                    g = [],
                    m,
                    E,
                    A;
                  for (m = 0; m < x.sps.length; m++)
                    (E = x.sps[m]),
                      (A = E.byteLength),
                      f.push((A >>> 8) & 255),
                      f.push(A & 255),
                      (f = f.concat(Array.prototype.slice.call(E)));
                  for (m = 0; m < x.pps.length; m++)
                    (E = x.pps[m]),
                      (A = E.byteLength),
                      g.push((A >>> 8) & 255),
                      g.push(A & 255),
                      (g = g.concat(Array.prototype.slice.call(E)));
                  var b = y.box(
                      y.types.avcC,
                      new Uint8Array(
                        [1, f[3], f[4], f[5], 255, 224 | x.sps.length]
                          .concat(f)
                          .concat([x.pps.length])
                          .concat(g)
                      )
                    ),
                    C = x.width,
                    U = x.height,
                    G = x.pixelRatio[0],
                    M = x.pixelRatio[1];
                  return y.box(
                    y.types.avc1,
                    new Uint8Array([
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      1,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      (C >> 8) & 255,
                      C & 255,
                      (U >> 8) & 255,
                      U & 255,
                      0,
                      72,
                      0,
                      0,
                      0,
                      72,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      1,
                      18,
                      100,
                      97,
                      105,
                      108,
                      121,
                      109,
                      111,
                      116,
                      105,
                      111,
                      110,
                      47,
                      104,
                      108,
                      115,
                      46,
                      106,
                      115,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      24,
                      17,
                      17,
                    ]),
                    b,
                    y.box(
                      y.types.btrt,
                      new Uint8Array([
                        0, 28, 156, 128, 0, 45, 198, 192, 0, 45, 198, 192,
                      ])
                    ),
                    y.box(
                      y.types.pasp,
                      new Uint8Array([
                        G >> 24,
                        (G >> 16) & 255,
                        (G >> 8) & 255,
                        G & 255,
                        M >> 24,
                        (M >> 16) & 255,
                        (M >> 8) & 255,
                        M & 255,
                      ])
                    )
                  );
                }),
                (y.esds = function (x) {
                  var f = x.config.length;
                  return new Uint8Array(
                    [
                      0,
                      0,
                      0,
                      0,
                      3,
                      23 + f,
                      0,
                      1,
                      0,
                      4,
                      15 + f,
                      64,
                      21,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      5,
                    ]
                      .concat([f])
                      .concat(x.config)
                      .concat([6, 1, 2])
                  );
                }),
                (y.mp4a = function (x) {
                  var f = x.samplerate;
                  return y.box(
                    y.types.mp4a,
                    new Uint8Array([
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      1,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      x.channelCount,
                      0,
                      16,
                      0,
                      0,
                      0,
                      0,
                      (f >> 8) & 255,
                      f & 255,
                      0,
                      0,
                    ]),
                    y.box(y.types.esds, y.esds(x))
                  );
                }),
                (y.mp3 = function (x) {
                  var f = x.samplerate;
                  return y.box(
                    y.types[".mp3"],
                    new Uint8Array([
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      1,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      x.channelCount,
                      0,
                      16,
                      0,
                      0,
                      0,
                      0,
                      (f >> 8) & 255,
                      f & 255,
                      0,
                      0,
                    ])
                  );
                }),
                (y.stsd = function (x) {
                  return x.type === "audio"
                    ? !x.isAAC && x.codec === "mp3"
                      ? y.box(y.types.stsd, y.STSD, y.mp3(x))
                      : y.box(y.types.stsd, y.STSD, y.mp4a(x))
                    : y.box(y.types.stsd, y.STSD, y.avc1(x));
                }),
                (y.tkhd = function (x) {
                  var f = x.id,
                    g = x.duration * x.timescale,
                    m = x.width,
                    E = x.height,
                    A = Math.floor(g / (ge + 1)),
                    b = Math.floor(g % (ge + 1));
                  return y.box(
                    y.types.tkhd,
                    new Uint8Array([
                      1,
                      0,
                      0,
                      7,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      2,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      3,
                      (f >> 24) & 255,
                      (f >> 16) & 255,
                      (f >> 8) & 255,
                      f & 255,
                      0,
                      0,
                      0,
                      0,
                      A >> 24,
                      (A >> 16) & 255,
                      (A >> 8) & 255,
                      A & 255,
                      b >> 24,
                      (b >> 16) & 255,
                      (b >> 8) & 255,
                      b & 255,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      1,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      1,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      64,
                      0,
                      0,
                      0,
                      (m >> 8) & 255,
                      m & 255,
                      0,
                      0,
                      (E >> 8) & 255,
                      E & 255,
                      0,
                      0,
                    ])
                  );
                }),
                (y.traf = function (x, f) {
                  var g = y.sdtp(x),
                    m = x.id,
                    E = Math.floor(f / (ge + 1)),
                    A = Math.floor(f % (ge + 1));
                  return y.box(
                    y.types.traf,
                    y.box(
                      y.types.tfhd,
                      new Uint8Array([
                        0,
                        0,
                        0,
                        0,
                        m >> 24,
                        (m >> 16) & 255,
                        (m >> 8) & 255,
                        m & 255,
                      ])
                    ),
                    y.box(
                      y.types.tfdt,
                      new Uint8Array([
                        1,
                        0,
                        0,
                        0,
                        E >> 24,
                        (E >> 16) & 255,
                        (E >> 8) & 255,
                        E & 255,
                        A >> 24,
                        (A >> 16) & 255,
                        (A >> 8) & 255,
                        A & 255,
                      ])
                    ),
                    y.trun(x, g.length + 16 + 20 + 8 + 16 + 8 + 8),
                    g
                  );
                }),
                (y.trak = function (x) {
                  return (
                    (x.duration = x.duration || 4294967295),
                    y.box(y.types.trak, y.tkhd(x), y.mdia(x))
                  );
                }),
                (y.trex = function (x) {
                  var f = x.id;
                  return y.box(
                    y.types.trex,
                    new Uint8Array([
                      0,
                      0,
                      0,
                      0,
                      f >> 24,
                      (f >> 16) & 255,
                      (f >> 8) & 255,
                      f & 255,
                      0,
                      0,
                      0,
                      1,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      1,
                      0,
                      1,
                    ])
                  );
                }),
                (y.trun = function (x, f) {
                  var g = x.samples || [],
                    m = g.length,
                    E = 12 + 16 * m,
                    A = new Uint8Array(E),
                    b,
                    C,
                    U,
                    G,
                    M,
                    X;
                  for (
                    f += 8 + E,
                      A.set(
                        [
                          0,
                          0,
                          15,
                          1,
                          (m >>> 24) & 255,
                          (m >>> 16) & 255,
                          (m >>> 8) & 255,
                          m & 255,
                          (f >>> 24) & 255,
                          (f >>> 16) & 255,
                          (f >>> 8) & 255,
                          f & 255,
                        ],
                        0
                      ),
                      b = 0;
                    b < m;
                    b++
                  )
                    (C = g[b]),
                      (U = C.duration),
                      (G = C.size),
                      (M = C.flags),
                      (X = C.cts),
                      A.set(
                        [
                          (U >>> 24) & 255,
                          (U >>> 16) & 255,
                          (U >>> 8) & 255,
                          U & 255,
                          (G >>> 24) & 255,
                          (G >>> 16) & 255,
                          (G >>> 8) & 255,
                          G & 255,
                          (M.isLeading << 2) | M.dependsOn,
                          (M.isDependedOn << 6) |
                            (M.hasRedundancy << 4) |
                            (M.paddingValue << 1) |
                            M.isNonSync,
                          M.degradPrio & 61440,
                          M.degradPrio & 15,
                          (X >>> 24) & 255,
                          (X >>> 16) & 255,
                          (X >>> 8) & 255,
                          X & 255,
                        ],
                        12 + 16 * b
                      );
                  return y.box(y.types.trun, A);
                }),
                (y.initSegment = function (x) {
                  y.types || y.init();
                  var f = y.moov(x),
                    g;
                  return (
                    (g = new Uint8Array(y.FTYP.byteLength + f.byteLength)),
                    g.set(y.FTYP),
                    g.set(f, y.FTYP.byteLength),
                    g
                  );
                }),
                y
              );
            })(),
            be = rt,
            Tt = 9e4;
          function St(y, L, x, f) {
            x === void 0 && (x = 1), f === void 0 && (f = !1);
            var g = y * L * x;
            return f ? Math.round(g) : g;
          }
          function Ae(y, L) {
            return L === void 0 && (L = !1), St(y, 1e3, 1 / Tt, L);
          }
          function $e(y, L) {
            return L === void 0 && (L = 1), St(y, Tt, 1 / L);
          }
          var it = $e(10),
            st = $e(0.2),
            xt = null,
            Lt = (function () {
              function y(x, f, g, m) {
                if (
                  ((this.observer = x),
                  (this.config = f),
                  (this.typeSupported = g),
                  (this.ISGenerated = !1),
                  xt === null)
                ) {
                  var E = navigator.userAgent.match(/Chrome\/(\d+)/i);
                  xt = E ? parseInt(E[1]) : 0;
                }
              }
              var L = y.prototype;
              return (
                (L.destroy = function () {}),
                (L.resetTimeStamp = function (f) {
                  this._initPTS = this._initDTS = f;
                }),
                (L.resetInitSegment = function () {
                  this.ISGenerated = !1;
                }),
                (L.getVideoStartPts = function (f) {
                  var g = !1,
                    m = f.reduce(function (E, A) {
                      var b = A.pts - E;
                      return b < -4294967296
                        ? ((g = !0), Je(E, A.pts))
                        : b > 0
                        ? E
                        : A.pts;
                    }, f[0].pts);
                  return g && h.logger.debug("PTS rollover detected"), m;
                }),
                (L.remux = function (f, g, m, E, A, b, C) {
                  if (
                    (this.ISGenerated || this.generateIS(f, g, A),
                    this.ISGenerated)
                  ) {
                    var U = f.samples.length,
                      G = g.samples.length,
                      M = A,
                      X = A;
                    if (U && G) {
                      var H = this.getVideoStartPts(g.samples),
                        $ = Je(f.samples[0].pts, H) - H,
                        V = $ / g.inputTimeScale;
                      (M += Math.max(0, V)), (X += Math.max(0, -V));
                    }
                    if (U) {
                      f.timescale ||
                        (h.logger.warn(
                          "regenerate InitSegment as audio detected"
                        ),
                        this.generateIS(f, g, A));
                      var se = this.remuxAudio(f, M, b, C);
                      if (G) {
                        var ae;
                        se && (ae = se.endPTS - se.startPTS),
                          g.timescale ||
                            (h.logger.warn(
                              "regenerate InitSegment as video detected"
                            ),
                            this.generateIS(f, g, A)),
                          this.remuxVideo(g, X, b, ae);
                      }
                    } else if (G) {
                      var he = this.remuxVideo(g, X, b, 0, C);
                      he && f.codec && this.remuxEmptyAudio(f, M, b, he);
                    }
                  }
                  m.samples.length && this.remuxID3(m, A),
                    E.samples.length && this.remuxText(E, A),
                    this.observer.trigger(Q.default.FRAG_PARSED);
                }),
                (L.generateIS = function (f, g, m) {
                  var E = this.observer,
                    A = f.samples,
                    b = g.samples,
                    C = this.typeSupported,
                    U = "audio/mp4",
                    G = {},
                    M = { tracks: G },
                    X = this._initPTS === void 0,
                    H,
                    $;
                  if (
                    (X && (H = $ = 1 / 0),
                    f.config &&
                      A.length &&
                      ((f.timescale = f.samplerate),
                      h.logger.log("audio sampling rate : " + f.samplerate),
                      f.isAAC ||
                        (C.mpeg
                          ? ((U = "audio/mpeg"), (f.codec = ""))
                          : C.mp3 && (f.codec = "mp3")),
                      (G.audio = {
                        container: U,
                        codec: f.codec,
                        initSegment:
                          !f.isAAC && C.mpeg
                            ? new Uint8Array()
                            : be.initSegment([f]),
                        metadata: { channelCount: f.channelCount },
                      }),
                      X &&
                        (H = $ = A[0].pts - Math.round(f.inputTimeScale * m))),
                    g.sps && g.pps && b.length)
                  ) {
                    var V = g.inputTimeScale;
                    if (
                      ((g.timescale = V),
                      (G.video = {
                        container: "video/mp4",
                        codec: g.codec,
                        initSegment: be.initSegment([g]),
                        metadata: { width: g.width, height: g.height },
                      }),
                      X)
                    ) {
                      var se = this.getVideoStartPts(b),
                        ae = Math.round(V * m);
                      ($ = Math.min($, Je(b[0].dts, se) - ae)),
                        (H = Math.min(H, se - ae)),
                        this.observer.trigger(Q.default.INIT_PTS_FOUND, {
                          initPTS: H,
                        });
                    }
                  } else
                    X &&
                      G.audio &&
                      this.observer.trigger(Q.default.INIT_PTS_FOUND, {
                        initPTS: H,
                      });
                  Object.keys(G).length
                    ? (E.trigger(Q.default.FRAG_PARSING_INIT_SEGMENT, M),
                      (this.ISGenerated = !0),
                      X && ((this._initPTS = H), (this._initDTS = $)))
                    : E.trigger(Q.default.ERROR, {
                        type: W.ErrorTypes.MEDIA_ERROR,
                        details: W.ErrorDetails.FRAG_PARSING_ERROR,
                        fatal: !1,
                        reason: "no audio/video samples found",
                      });
                }),
                (L.remuxVideo = function (f, g, m, E) {
                  var A = f.timescale,
                    b = f.samples,
                    C = [],
                    U = b.length,
                    G = this._initPTS,
                    M = 8,
                    X,
                    H,
                    $,
                    V,
                    se,
                    ae = Number.POSITIVE_INFINITY,
                    he = Number.NEGATIVE_INFINITY,
                    Se = 0,
                    ce = !1,
                    Fe = this.nextAvcDts;
                  if (U !== 0) {
                    if (!m) {
                      var Ee = g * A,
                        pe = b[0].pts - Je(b[0].dts, b[0].pts);
                      Fe = Ee - pe;
                    }
                    for (var Re = 0; Re < U; Re++) {
                      var De = b[Re];
                      (De.pts = Je(De.pts - G, Fe)),
                        (De.dts = Je(De.dts - G, Fe)),
                        De.dts > De.pts &&
                          (Se = Math.max(
                            Math.min(Se, De.pts - De.dts),
                            -1 * st
                          )),
                        De.dts < b[Re > 0 ? Re - 1 : Re].dts && (ce = !0);
                    }
                    ce &&
                      b.sort(function (Nt, Vt) {
                        var fr = Nt.dts - Vt.dts,
                          dr = Nt.pts - Vt.pts;
                        return fr || dr || Nt.id - Vt.id;
                      }),
                      (V = b[0].dts),
                      (se = b[U - 1].dts);
                    var qe = Math.round((se - V) / (U - 1));
                    if (Se < 0) {
                      if (Se < qe * -2) {
                        h.logger.warn(
                          "PTS < DTS detected in video samples, offsetting DTS from PTS by " +
                            Ae(-qe, !0) +
                            " ms"
                        );
                        for (var He = Se, Oe = 0; Oe < U; Oe++)
                          (b[Oe].dts = He = Math.max(He, b[Oe].pts - qe)),
                            (b[Oe].pts = Math.max(He, b[Oe].pts));
                      } else {
                        h.logger.warn(
                          "PTS < DTS detected in video samples, shifting DTS by " +
                            Ae(Se, !0) +
                            " ms to overcome this issue"
                        );
                        for (var et = 0; et < U; et++)
                          b[et].dts = b[et].dts + Se;
                      }
                      (V = b[0].dts), (se = b[U - 1].dts);
                    }
                    if (m) {
                      var We = V - Fe,
                        at = We > qe,
                        Ke = We < -1;
                      if (at || Ke) {
                        at
                          ? h.logger.warn(
                              "AVC: " +
                                Ae(We, !0) +
                                " ms (" +
                                We +
                                "dts) hole between fragments detected, filling it"
                            )
                          : h.logger.warn(
                              "AVC: " +
                                Ae(-We, !0) +
                                " ms (" +
                                We +
                                "dts) overlapping between fragments detected"
                            ),
                          (V = Fe);
                        var Ce = b[0].pts - We;
                        (b[0].dts = V),
                          (b[0].pts = Ce),
                          h.logger.log(
                            "Video: First PTS/DTS adjusted: " +
                              Ae(Ce, !0) +
                              "/" +
                              Ae(V, !0) +
                              ", delta: " +
                              Ae(We, !0) +
                              " ms"
                          );
                      }
                    }
                    xt && xt < 75 && (V = Math.max(0, V));
                    for (var ct = 0, gt = 0, lt = 0; lt < U; lt++) {
                      for (
                        var Ze = b[lt],
                          ht = Ze.units,
                          vt = ht.length,
                          yt = 0,
                          It = 0;
                        It < vt;
                        It++
                      )
                        yt += ht[It].data.length;
                      (gt += yt),
                        (ct += vt),
                        (Ze.length = yt),
                        (Ze.dts = Math.max(Ze.dts, V)),
                        (Ze.pts = Math.max(Ze.pts, Ze.dts, 0)),
                        (ae = Math.min(Ze.pts, ae)),
                        (he = Math.max(Ze.pts, he));
                    }
                    se = b[U - 1].dts;
                    var Et = gt + 4 * ct + 8;
                    try {
                      H = new Uint8Array(Et);
                    } catch {
                      this.observer.trigger(Q.default.ERROR, {
                        type: W.ErrorTypes.MUX_ERROR,
                        details: W.ErrorDetails.REMUX_ALLOC_ERROR,
                        fatal: !1,
                        bytes: Et,
                        reason: "fail allocating video mdat " + Et,
                      });
                      return;
                    }
                    var wt = new DataView(H.buffer);
                    wt.setUint32(0, Et), H.set(be.types.mdat, 4);
                    for (var P = 0; P < U; P++) {
                      for (
                        var nt = b[P],
                          Ft = nt.units,
                          Ot = 0,
                          pt = void 0,
                          jt = 0,
                          or = Ft.length;
                        jt < or;
                        jt++
                      ) {
                        var $t = Ft[jt],
                          lr = $t.data,
                          Ht = $t.data.byteLength;
                        wt.setUint32(M, Ht),
                          (M += 4),
                          H.set(lr, M),
                          (M += Ht),
                          (Ot += 4 + Ht);
                      }
                      if (P < U - 1) X = b[P + 1].dts - nt.dts;
                      else {
                        var Jt = this.config,
                          Ct = nt.dts - b[P > 0 ? P - 1 : P].dts;
                        if (Jt.stretchShortVideoTrack) {
                          var ur = Jt.maxBufferHole,
                            Wt = Math.floor(ur * A),
                            Mt = (E ? ae + E * A : this.nextAudioPts) - nt.pts;
                          Mt > Wt
                            ? ((X = Mt - Ct),
                              X < 0 && (X = Ct),
                              h.logger.log(
                                "It is approximately " +
                                  Ae(Mt, !1) +
                                  " ms to the next segment; using duration " +
                                  Ae(X, !1) +
                                  " ms for the last video frame."
                              ))
                            : (X = Ct);
                        } else X = Ct;
                      }
                      (pt = Math.round(nt.pts - nt.dts)),
                        C.push({
                          size: Ot,
                          duration: X,
                          cts: pt,
                          flags: {
                            isLeading: 0,
                            isDependedOn: 0,
                            hasRedundancy: 0,
                            degradPrio: 0,
                            dependsOn: nt.key ? 2 : 1,
                            isNonSync: nt.key ? 0 : 1,
                          },
                        });
                    }
                    this.nextAvcDts = se + X;
                    var Pt = f.dropped;
                    if (
                      ((f.nbNalu = 0),
                      (f.dropped = 0),
                      C.length &&
                        navigator.userAgent.toLowerCase().indexOf("chrome") >
                          -1)
                    ) {
                      var er = C[0].flags;
                      (er.dependsOn = 2), (er.isNonSync = 0);
                    }
                    (f.samples = C),
                      ($ = be.moof(f.sequenceNumber++, V, f)),
                      (f.samples = []);
                    var tr = {
                      data1: $,
                      data2: H,
                      startPTS: ae / A,
                      endPTS: (he + X) / A,
                      startDTS: V / A,
                      endDTS: this.nextAvcDts / A,
                      type: "video",
                      hasAudio: !1,
                      hasVideo: !0,
                      nb: C.length,
                      dropped: Pt,
                    };
                    return (
                      this.observer.trigger(Q.default.FRAG_PARSING_DATA, tr), tr
                    );
                  }
                }),
                (L.remuxAudio = function (f, g, m, E) {
                  var A = f.inputTimeScale,
                    b = f.timescale,
                    C = A / b,
                    U = f.isAAC ? 1024 : 1152,
                    G = U * C,
                    M = this._initPTS,
                    X = !f.isAAC && this.typeSupported.mpeg,
                    H,
                    $,
                    V,
                    se,
                    ae,
                    he,
                    Se = X ? 0 : 8,
                    ce = f.samples,
                    Fe = [],
                    Ee = this.nextAudioPts;
                  if (
                    ((m |=
                      ce.length &&
                      Ee &&
                      ((E && Math.abs(g - Ee / A) < 0.1) ||
                        Math.abs(ce[0].pts - Ee - M) < 20 * G)),
                    ce.forEach(function (pt) {
                      pt.pts = pt.dts = Je(pt.pts - M, g * A);
                    }),
                    (ce = ce.filter(function (pt) {
                      return pt.pts >= 0;
                    })),
                    ce.length !== 0)
                  ) {
                    if (
                      (m || (E ? (Ee = Math.max(0, g * A)) : (Ee = ce[0].pts)),
                      f.isAAC)
                    )
                      for (
                        var pe = this.config.maxAudioFramesDrift,
                          Re = 0,
                          De = Ee;
                        Re < ce.length;

                      ) {
                        var qe = ce[Re],
                          He = qe.pts,
                          Oe = He - De;
                        if (Oe <= -pe * G)
                          m || Re > 0
                            ? (h.logger.warn(
                                "Dropping 1 audio frame @ " +
                                  Ae(De, !0) / 1e3 +
                                  "s due to " +
                                  Ae(Oe, !0) +
                                  " ms overlap."
                              ),
                              ce.splice(Re, 1))
                            : (h.logger.warn(
                                "Audio frame @ " +
                                  Ae(He, !0) / 1e3 +
                                  "s overlaps nextAudioPts by " +
                                  Ae(Oe, !0) +
                                  " ms."
                              ),
                              (De = He + G),
                              Re++);
                        else if (Oe >= pe * G && Oe < it && De) {
                          var et = Math.round(Oe / G);
                          h.logger.warn(
                            "Injecting " +
                              et +
                              " audio frames @ " +
                              Ae(De, !0) / 1e3 +
                              "s due to " +
                              Ae(Oe, !0) +
                              " ms gap."
                          );
                          for (var We = 0; We < et; We++) {
                            var at = Math.max(De, 0);
                            ($ = Ne.getSilentFrame(
                              f.manifestCodec || f.codec,
                              f.channelCount
                            )),
                              $ ||
                                (h.logger.log(
                                  "Unable to get silent frame for given audio codec; duplicating last frame instead."
                                ),
                                ($ = qe.unit.subarray())),
                              ce.splice(Re, 0, { unit: $, pts: at, dts: at }),
                              (De += G),
                              Re++;
                          }
                          (qe.pts = qe.dts = De), (De += G), Re++;
                        } else (qe.pts = qe.dts = De), (De += G), Re++;
                      }
                    for (var Ke = ce.length, Ce = 0; Ke--; )
                      Ce += ce[Ke].unit.byteLength;
                    for (var ct = 0, gt = ce.length; ct < gt; ct++) {
                      var lt = ce[ct],
                        Ze = lt.unit,
                        ht = lt.pts;
                      if (he !== void 0 && H)
                        H.duration = Math.round((ht - he) / C);
                      else {
                        var vt = ht - Ee,
                          yt = 0;
                        if (m && f.isAAC && vt) {
                          if (vt > 0 && vt < it)
                            (yt = Math.round((ht - Ee) / G)),
                              h.logger.log(
                                Ae(vt, !0) +
                                  " ms hole between AAC samples detected,filling it"
                              ),
                              yt > 0 &&
                                (($ = Ne.getSilentFrame(
                                  f.manifestCodec || f.codec,
                                  f.channelCount
                                )),
                                $ || ($ = Ze.subarray()),
                                (Ce += yt * $.length));
                          else if (vt < -12) {
                            h.logger.log(
                              "drop overlapping AAC sample, expected/parsed/delta: " +
                                Ae(Ee, !0) +
                                " ms / " +
                                Ae(ht, !0) +
                                " ms / " +
                                Ae(-vt, !0) +
                                " ms"
                            ),
                              (Ce -= Ze.byteLength);
                            continue;
                          }
                          ht = Ee;
                        }
                        if (((ae = ht), Ce > 0)) {
                          Ce += Se;
                          try {
                            V = new Uint8Array(Ce);
                          } catch {
                            this.observer.trigger(Q.default.ERROR, {
                              type: W.ErrorTypes.MUX_ERROR,
                              details: W.ErrorDetails.REMUX_ALLOC_ERROR,
                              fatal: !1,
                              bytes: Ce,
                              reason: "fail allocating audio mdat " + Ce,
                            });
                            return;
                          }
                          if (!X) {
                            var It = new DataView(V.buffer);
                            It.setUint32(0, Ce), V.set(be.types.mdat, 4);
                          }
                        } else return;
                        for (var Et = 0; Et < yt; Et++)
                          ($ = Ne.getSilentFrame(
                            f.manifestCodec || f.codec,
                            f.channelCount
                          )),
                            $ ||
                              (h.logger.log(
                                "Unable to get silent frame for given audio codec; duplicating this frame instead."
                              ),
                              ($ = Ze.subarray())),
                            V.set($, Se),
                            (Se += $.byteLength),
                            (H = {
                              size: $.byteLength,
                              cts: 0,
                              duration: 1024,
                              flags: {
                                isLeading: 0,
                                isDependedOn: 0,
                                hasRedundancy: 0,
                                degradPrio: 0,
                                dependsOn: 1,
                              },
                            }),
                            Fe.push(H);
                      }
                      V.set(Ze, Se);
                      var wt = Ze.byteLength;
                      (Se += wt),
                        (H = {
                          size: wt,
                          cts: 0,
                          duration: 0,
                          flags: {
                            isLeading: 0,
                            isDependedOn: 0,
                            hasRedundancy: 0,
                            degradPrio: 0,
                            dependsOn: 1,
                          },
                        }),
                        Fe.push(H),
                        (he = ht);
                    }
                    var P = 0;
                    if (
                      ((Ke = Fe.length),
                      Ke >= 2 && ((P = Fe[Ke - 2].duration), (H.duration = P)),
                      Ke)
                    ) {
                      (this.nextAudioPts = Ee = he + C * P),
                        (f.samples = Fe),
                        X
                          ? (se = new Uint8Array())
                          : (se = be.moof(f.sequenceNumber++, ae / C, f)),
                        (f.samples = []);
                      var nt = ae / A,
                        Ft = Ee / A,
                        Ot = {
                          data1: se,
                          data2: V,
                          startPTS: nt,
                          endPTS: Ft,
                          startDTS: nt,
                          endDTS: Ft,
                          type: "audio",
                          hasAudio: !0,
                          hasVideo: !1,
                          nb: Ke,
                        };
                      return (
                        this.observer.trigger(Q.default.FRAG_PARSING_DATA, Ot),
                        Ot
                      );
                    }
                    return null;
                  }
                }),
                (L.remuxEmptyAudio = function (f, g, m, E) {
                  var A = f.inputTimeScale,
                    b = f.samplerate ? f.samplerate : A,
                    C = A / b,
                    U = this.nextAudioPts,
                    G = (U !== void 0 ? U : E.startDTS * A) + this._initDTS,
                    M = E.endDTS * A + this._initDTS,
                    X = 1024,
                    H = C * X,
                    $ = Math.ceil((M - G) / H),
                    V = Ne.getSilentFrame(
                      f.manifestCodec || f.codec,
                      f.channelCount
                    );
                  if ((h.logger.warn("remux empty Audio"), !V)) {
                    h.logger.trace(
                      "Unable to remuxEmptyAudio since we were unable to get a silent frame for given audio codec!"
                    );
                    return;
                  }
                  for (var se = [], ae = 0; ae < $; ae++) {
                    var he = G + ae * H;
                    se.push({ unit: V, pts: he, dts: he });
                  }
                  (f.samples = se), this.remuxAudio(f, g, m);
                }),
                (L.remuxID3 = function (f, g) {
                  var m = f.samples.length;
                  if (m) {
                    for (
                      var E = f.inputTimeScale,
                        A = this._initPTS,
                        b = this._initDTS,
                        C = 0;
                      C < m;
                      C++
                    ) {
                      var U = f.samples[C];
                      (U.pts = Je(U.pts - A, g * E) / E),
                        (U.dts = Je(U.dts - b, g * E) / E);
                    }
                    this.observer.trigger(Q.default.FRAG_PARSING_METADATA, {
                      samples: f.samples,
                    }),
                      (f.samples = []);
                  }
                }),
                (L.remuxText = function (f, g) {
                  var m = f.samples.length,
                    E = f.inputTimeScale,
                    A = this._initPTS;
                  if (m) {
                    for (var b = 0; b < m; b++) {
                      var C = f.samples[b];
                      C.pts = Je(C.pts - A, g * E) / E;
                    }
                    f.samples.sort(function (U, G) {
                      return U.pts - G.pts;
                    }),
                      this.observer.trigger(Q.default.FRAG_PARSING_USERDATA, {
                        samples: f.samples,
                      });
                  }
                  f.samples = [];
                }),
                y
              );
            })();
          function Je(y, L) {
            var x;
            if (L === void 0) return y;
            for (
              L < y ? (x = -8589934592) : (x = 8589934592);
              Math.abs(y - L) > 4294967296;

            )
              y += x;
            return y;
          }
          var _t = Lt,
            ze = (function () {
              function y(x) {
                this.observer = x;
              }
              var L = y.prototype;
              return (
                (L.destroy = function () {}),
                (L.resetTimeStamp = function () {}),
                (L.resetInitSegment = function () {}),
                (L.remux = function (f, g, m, E, A, b, C, U) {
                  var G = this.observer,
                    M = "";
                  f && (M += "audio"),
                    g && (M += "video"),
                    G.trigger(Q.default.FRAG_PARSING_DATA, {
                      data1: U,
                      startPTS: A,
                      startDTS: A,
                      type: M,
                      hasAudio: !!f,
                      hasVideo: !!g,
                      nb: 1,
                      dropped: 0,
                    }),
                    G.trigger(Q.default.FRAG_PARSED);
                }),
                y
              );
            })(),
            Dt = ze,
            ot = Object(c.getSelfScope)(),
            Ye;
          try {
            Ye = ot.performance.now.bind(ot.performance);
          } catch {
            h.logger.debug("Unable to use Performance API on this environment"),
              (Ye = ot.Date.now);
          }
          var sr = (function () {
            function y(x, f, g, m) {
              (this.observer = x),
                (this.typeSupported = f),
                (this.config = g),
                (this.vendor = m);
            }
            var L = y.prototype;
            return (
              (L.destroy = function () {
                var f = this.demuxer;
                f && f.destroy();
              }),
              (L.push = function (f, g, m, E, A, b, C, U, G, M, X, H) {
                var $ = this;
                if (
                  f.byteLength > 0 &&
                  g != null &&
                  g.key != null &&
                  g.method === "AES-128"
                ) {
                  var V = this.decrypter;
                  V == null &&
                    (V = this.decrypter =
                      new D.default(this.observer, this.config));
                  var se = Ye();
                  V.decrypt(f, g.key.buffer, g.iv.buffer, function (ae) {
                    var he = Ye();
                    $.observer.trigger(Q.default.FRAG_DECRYPTED, {
                      stats: { tstart: se, tdecrypt: he },
                    }),
                      $.pushDecrypted(
                        new Uint8Array(ae),
                        g,
                        new Uint8Array(m),
                        E,
                        A,
                        b,
                        C,
                        U,
                        G,
                        M,
                        X,
                        H
                      );
                  });
                } else
                  this.pushDecrypted(
                    new Uint8Array(f),
                    g,
                    new Uint8Array(m),
                    E,
                    A,
                    b,
                    C,
                    U,
                    G,
                    M,
                    X,
                    H
                  );
              }),
              (L.pushDecrypted = function (f, g, m, E, A, b, C, U, G, M, X, H) {
                var $ = this.demuxer,
                  V = this.remuxer;
                if (!$ || C || U) {
                  for (
                    var se = this.observer,
                      ae = this.typeSupported,
                      he = this.config,
                      Se = [
                        { demux: Me, remux: _t },
                        { demux: le.default, remux: Dt },
                        { demux: J, remux: _t },
                        { demux: Be, remux: _t },
                      ],
                      ce,
                      Fe = 0,
                      Ee = Se.length;
                    Fe < Ee && ((ce = Se[Fe]), !ce.demux.probe(f));
                    Fe++
                  );
                  if (!ce) {
                    se.trigger(Q.default.ERROR, {
                      type: W.ErrorTypes.MEDIA_ERROR,
                      details: W.ErrorDetails.FRAG_PARSING_ERROR,
                      fatal: !0,
                      reason: "no demux matching with content found",
                    });
                    return;
                  }
                  (!V || !(V instanceof ce.remux)) &&
                    (V = new ce.remux(se, he, ae, this.vendor)),
                    (!$ || !($ instanceof ce.demux)) &&
                      (($ = new ce.demux(se, V, he, ae)),
                      (this.probe = ce.demux.probe)),
                    (this.demuxer = $),
                    (this.remuxer = V);
                }
                (C || U) &&
                  ($.resetInitSegment(m, E, A, M), V.resetInitSegment()),
                  C && ($.resetTimeStamp(H), V.resetTimeStamp(H)),
                  typeof $.setDecryptData == "function" && $.setDecryptData(g),
                  $.append(f, b, G, X);
              }),
              y
            );
          })();
          te.default = sr;
        },
        "./src/demux/demuxer-worker.js": function (Te, te, K) {
          K.r(te);
          var Q = K("./src/demux/demuxer-inline.js"),
            W = K("./src/events.js"),
            D = K("./src/utils/logger.js"),
            ee = K("./node_modules/eventemitter3/index.js"),
            h = function (Z) {
              var T = new ee.EventEmitter();
              (T.trigger = function (_) {
                for (
                  var F = arguments.length,
                    k = new Array(F > 1 ? F - 1 : 0),
                    w = 1;
                  w < F;
                  w++
                )
                  k[w - 1] = arguments[w];
                T.emit.apply(T, [_, _].concat(k));
              }),
                (T.off = function (_) {
                  for (
                    var F = arguments.length,
                      k = new Array(F > 1 ? F - 1 : 0),
                      w = 1;
                    w < F;
                    w++
                  )
                    k[w - 1] = arguments[w];
                  T.removeListener.apply(T, [_].concat(k));
                });
              var S = function (_, F) {
                Z.postMessage({ event: _, data: F });
              };
              Z.addEventListener("message", function (I) {
                var _ = I.data;
                switch (_.cmd) {
                  case "init":
                    var F = JSON.parse(_.config);
                    (Z.demuxer = new Q.default(
                      T,
                      _.typeSupported,
                      F,
                      _.vendor
                    )),
                      Object(D.enableLogs)(F.debug),
                      S("init", null);
                    break;
                  case "demux":
                    Z.demuxer.push(
                      _.data,
                      _.decryptdata,
                      _.initSegment,
                      _.audioCodec,
                      _.videoCodec,
                      _.timeOffset,
                      _.discontinuity,
                      _.trackSwitch,
                      _.contiguous,
                      _.duration,
                      _.accurateTimeOffset,
                      _.defaultInitPTS
                    );
                    break;
                }
              }),
                T.on(W.default.FRAG_DECRYPTED, S),
                T.on(W.default.FRAG_PARSING_INIT_SEGMENT, S),
                T.on(W.default.FRAG_PARSED, S),
                T.on(W.default.ERROR, S),
                T.on(W.default.FRAG_PARSING_METADATA, S),
                T.on(W.default.FRAG_PARSING_USERDATA, S),
                T.on(W.default.INIT_PTS_FOUND, S),
                T.on(W.default.FRAG_PARSING_DATA, function (I, _) {
                  var F = [],
                    k = { event: I, data: _ };
                  _.data1 &&
                    ((k.data1 = _.data1.buffer),
                    F.push(_.data1.buffer),
                    delete _.data1),
                    _.data2 &&
                      ((k.data2 = _.data2.buffer),
                      F.push(_.data2.buffer),
                      delete _.data2),
                    Z.postMessage(k, F);
                });
            };
          te.default = h;
        },
        "./src/demux/id3.js": function (Te, te, K) {
          K.r(te),
            K.d(te, "utf8ArrayToStr", function () {
              return h;
            });
          var Q = K("./src/utils/get-self-scope.js"),
            W = (function () {
              function c() {}
              return (
                (c.isHeader = function (T, S) {
                  return (
                    S + 10 <= T.length &&
                    T[S] === 73 &&
                    T[S + 1] === 68 &&
                    T[S + 2] === 51 &&
                    T[S + 3] < 255 &&
                    T[S + 4] < 255 &&
                    T[S + 6] < 128 &&
                    T[S + 7] < 128 &&
                    T[S + 8] < 128 &&
                    T[S + 9] < 128
                  );
                }),
                (c.isFooter = function (T, S) {
                  return (
                    S + 10 <= T.length &&
                    T[S] === 51 &&
                    T[S + 1] === 68 &&
                    T[S + 2] === 73 &&
                    T[S + 3] < 255 &&
                    T[S + 4] < 255 &&
                    T[S + 6] < 128 &&
                    T[S + 7] < 128 &&
                    T[S + 8] < 128 &&
                    T[S + 9] < 128
                  );
                }),
                (c.getID3Data = function (T, S) {
                  for (var I = S, _ = 0; c.isHeader(T, S); ) {
                    _ += 10;
                    var F = c._readSize(T, S + 6);
                    (_ += F), c.isFooter(T, S + 10) && (_ += 10), (S += _);
                  }
                  if (_ > 0) return T.subarray(I, I + _);
                }),
                (c._readSize = function (T, S) {
                  var I = 0;
                  return (
                    (I = (T[S] & 127) << 21),
                    (I |= (T[S + 1] & 127) << 14),
                    (I |= (T[S + 2] & 127) << 7),
                    (I |= T[S + 3] & 127),
                    I
                  );
                }),
                (c.getTimeStamp = function (T) {
                  for (var S = c.getID3Frames(T), I = 0; I < S.length; I++) {
                    var _ = S[I];
                    if (c.isTimeStampFrame(_)) return c._readTimeStamp(_);
                  }
                }),
                (c.isTimeStampFrame = function (T) {
                  return (
                    T &&
                    T.key === "PRIV" &&
                    T.info === "com.apple.streaming.transportStreamTimestamp"
                  );
                }),
                (c._getFrameData = function (T) {
                  var S = String.fromCharCode(T[0], T[1], T[2], T[3]),
                    I = c._readSize(T, 4),
                    _ = 10;
                  return { type: S, size: I, data: T.subarray(_, _ + I) };
                }),
                (c.getID3Frames = function (T) {
                  for (var S = 0, I = []; c.isHeader(T, S); ) {
                    var _ = c._readSize(T, S + 6);
                    S += 10;
                    for (var F = S + _; S + 8 < F; ) {
                      var k = c._getFrameData(T.subarray(S)),
                        w = c._decodeFrame(k);
                      w && I.push(w), (S += k.size + 10);
                    }
                    c.isFooter(T, S) && (S += 10);
                  }
                  return I;
                }),
                (c._decodeFrame = function (T) {
                  return T.type === "PRIV"
                    ? c._decodePrivFrame(T)
                    : T.type[0] === "W"
                    ? c._decodeURLFrame(T)
                    : c._decodeTextFrame(T);
                }),
                (c._readTimeStamp = function (T) {
                  if (T.data.byteLength === 8) {
                    var S = new Uint8Array(T.data),
                      I = S[3] & 1,
                      _ = (S[4] << 23) + (S[5] << 15) + (S[6] << 7) + S[7];
                    return (_ /= 45), I && (_ += 4772185884e-2), Math.round(_);
                  }
                }),
                (c._decodePrivFrame = function (T) {
                  if (!(T.size < 2)) {
                    var S = c._utf8ArrayToStr(T.data, !0),
                      I = new Uint8Array(T.data.subarray(S.length + 1));
                    return { key: T.type, info: S, data: I.buffer };
                  }
                }),
                (c._decodeTextFrame = function (T) {
                  if (!(T.size < 2))
                    if (T.type === "TXXX") {
                      var S = 1,
                        I = c._utf8ArrayToStr(T.data.subarray(S), !0);
                      S += I.length + 1;
                      var _ = c._utf8ArrayToStr(T.data.subarray(S));
                      return { key: T.type, info: I, data: _ };
                    } else {
                      var F = c._utf8ArrayToStr(T.data.subarray(1));
                      return { key: T.type, data: F };
                    }
                }),
                (c._decodeURLFrame = function (T) {
                  if (T.type === "WXXX") {
                    if (T.size < 2) return;
                    var S = 1,
                      I = c._utf8ArrayToStr(T.data.subarray(S), !0);
                    S += I.length + 1;
                    var _ = c._utf8ArrayToStr(T.data.subarray(S));
                    return { key: T.type, info: I, data: _ };
                  } else {
                    var F = c._utf8ArrayToStr(T.data);
                    return { key: T.type, data: F };
                  }
                }),
                (c._utf8ArrayToStr = function (T, S) {
                  S === void 0 && (S = !1);
                  var I = ee();
                  if (I) {
                    var _ = I.decode(T);
                    if (S) {
                      var F = _.indexOf("\0");
                      return F !== -1 ? _.substring(0, F) : _;
                    }
                    return _.replace(/\0/g, "");
                  }
                  for (var k = T.length, w, z, N, B = "", Y = 0; Y < k; ) {
                    if (((w = T[Y++]), w === 0 && S)) return B;
                    if (w === 0 || w === 3) continue;
                    switch (w >> 4) {
                      case 0:
                      case 1:
                      case 2:
                      case 3:
                      case 4:
                      case 5:
                      case 6:
                      case 7:
                        B += String.fromCharCode(w);
                        break;
                      case 12:
                      case 13:
                        (z = T[Y++]),
                          (B += String.fromCharCode(
                            ((w & 31) << 6) | (z & 63)
                          ));
                        break;
                      case 14:
                        (z = T[Y++]),
                          (N = T[Y++]),
                          (B += String.fromCharCode(
                            ((w & 15) << 12) | ((z & 63) << 6) | ((N & 63) << 0)
                          ));
                        break;
                    }
                  }
                  return B;
                }),
                c
              );
            })(),
            D;
          function ee() {
            var c = Object(Q.getSelfScope)();
            return (
              !D &&
                typeof c.TextDecoder < "u" &&
                (D = new c.TextDecoder("utf-8")),
              D
            );
          }
          var h = W._utf8ArrayToStr;
          te.default = W;
        },
        "./src/demux/mp4demuxer.js": function (Te, te, K) {
          K.r(te);
          var Q = K("./src/utils/logger.js"),
            W = K("./src/events.js"),
            D = Math.pow(2, 32) - 1,
            ee = (function () {
              function h(Z, T) {
                (this.observer = Z), (this.remuxer = T);
              }
              var c = h.prototype;
              return (
                (c.resetTimeStamp = function (T) {
                  this.initPTS = T;
                }),
                (c.resetInitSegment = function (T, S, I, _) {
                  if (T && T.byteLength) {
                    var F = (this.initData = h.parseInitSegment(T));
                    S == null && (S = "mp4a.40.5"),
                      I == null && (I = "avc1.42e01e");
                    var k = {};
                    F.audio && F.video
                      ? (k.audiovideo = {
                          container: "video/mp4",
                          codec: S + "," + I,
                          initSegment: _ ? T : null,
                        })
                      : (F.audio &&
                          (k.audio = {
                            container: "audio/mp4",
                            codec: S,
                            initSegment: _ ? T : null,
                          }),
                        F.video &&
                          (k.video = {
                            container: "video/mp4",
                            codec: I,
                            initSegment: _ ? T : null,
                          })),
                      this.observer.trigger(
                        W.default.FRAG_PARSING_INIT_SEGMENT,
                        { tracks: k }
                      );
                  } else S && (this.audioCodec = S), I && (this.videoCodec = I);
                }),
                (h.probe = function (T) {
                  return (
                    h.findBox(
                      { data: T, start: 0, end: Math.min(T.length, 16384) },
                      ["moof"]
                    ).length > 0
                  );
                }),
                (h.bin2str = function (T) {
                  return String.fromCharCode.apply(null, T);
                }),
                (h.readUint16 = function (T, S) {
                  T.data && ((S += T.start), (T = T.data));
                  var I = (T[S] << 8) | T[S + 1];
                  return I < 0 ? 65536 + I : I;
                }),
                (h.readUint32 = function (T, S) {
                  T.data && ((S += T.start), (T = T.data));
                  var I =
                    (T[S] << 24) |
                    (T[S + 1] << 16) |
                    (T[S + 2] << 8) |
                    T[S + 3];
                  return I < 0 ? 4294967296 + I : I;
                }),
                (h.writeUint32 = function (T, S, I) {
                  T.data && ((S += T.start), (T = T.data)),
                    (T[S] = I >> 24),
                    (T[S + 1] = (I >> 16) & 255),
                    (T[S + 2] = (I >> 8) & 255),
                    (T[S + 3] = I & 255);
                }),
                (h.findBox = function (T, S) {
                  var I = [],
                    _,
                    F,
                    k,
                    w,
                    z,
                    N,
                    B;
                  if (
                    (T.data
                      ? ((N = T.start), (w = T.end), (T = T.data))
                      : ((N = 0), (w = T.byteLength)),
                    !S.length)
                  )
                    return null;
                  for (_ = N; _ < w; )
                    (F = h.readUint32(T, _)),
                      (k = h.bin2str(T.subarray(_ + 4, _ + 8))),
                      (B = F > 1 ? _ + F : w),
                      k === S[0] &&
                        (S.length === 1
                          ? I.push({ data: T, start: _ + 8, end: B })
                          : ((z = h.findBox(
                              { data: T, start: _ + 8, end: B },
                              S.slice(1)
                            )),
                            z.length && (I = I.concat(z)))),
                      (_ = B);
                  return I;
                }),
                (h.parseSegmentIndex = function (T) {
                  var S = h.findBox(T, ["moov"])[0],
                    I = S ? S.end : null,
                    _ = 0,
                    F = h.findBox(T, ["sidx"]),
                    k;
                  if (!F || !F[0]) return null;
                  (k = []), (F = F[0]);
                  var w = F.data[0];
                  _ = w === 0 ? 8 : 16;
                  var z = h.readUint32(F, _);
                  _ += 4;
                  var N = 0,
                    B = 0;
                  w === 0 ? (_ += 8) : (_ += 16), (_ += 2);
                  var Y = F.end + B,
                    J = h.readUint16(F, _);
                  _ += 2;
                  for (var le = 0; le < J; le++) {
                    var ie = _,
                      fe = h.readUint32(F, ie);
                    ie += 4;
                    var _e = fe & 2147483647,
                      Pe = (fe & 2147483648) >>> 31;
                    if (Pe === 1) {
                      console.warn(
                        "SIDX has hierarchical references (not supported)"
                      );
                      return;
                    }
                    var ke = h.readUint32(F, ie);
                    (ie += 4),
                      k.push({
                        referenceSize: _e,
                        subsegmentDuration: ke,
                        info: { duration: ke / z, start: Y, end: Y + _e - 1 },
                      }),
                      (Y += _e),
                      (ie += 4),
                      (_ = ie);
                  }
                  return {
                    earliestPresentationTime: N,
                    timescale: z,
                    version: w,
                    referencesCount: J,
                    references: k,
                    moovEndOffset: I,
                  };
                }),
                (h.parseInitSegment = function (T) {
                  var S = [],
                    I = h.findBox(T, ["moov", "trak"]);
                  return (
                    I.forEach(function (_) {
                      var F = h.findBox(_, ["tkhd"])[0];
                      if (F) {
                        var k = F.data[F.start],
                          w = k === 0 ? 12 : 20,
                          z = h.readUint32(F, w),
                          N = h.findBox(_, ["mdia", "mdhd"])[0];
                        if (N) {
                          (k = N.data[N.start]), (w = k === 0 ? 12 : 20);
                          var B = h.readUint32(N, w),
                            Y = h.findBox(_, ["mdia", "hdlr"])[0];
                          if (Y) {
                            var J = h.bin2str(
                                Y.data.subarray(Y.start + 8, Y.start + 12)
                              ),
                              le = { soun: "audio", vide: "video" }[J];
                            if (le) {
                              var ie = h.findBox(_, [
                                "mdia",
                                "minf",
                                "stbl",
                                "stsd",
                              ]);
                              if (ie.length) {
                                ie = ie[0];
                                var fe = h.bin2str(
                                  ie.data.subarray(ie.start + 12, ie.start + 16)
                                );
                                Q.logger.log(
                                  "MP4Demuxer:" + le + ":" + fe + " found"
                                );
                              }
                              (S[z] = { timescale: B, type: le }),
                                (S[le] = { timescale: B, id: z });
                            }
                          }
                        }
                      }
                    }),
                    S
                  );
                }),
                (h.getStartDTS = function (T, S) {
                  var I, _, F;
                  return (
                    (I = h.findBox(S, ["moof", "traf"])),
                    (_ = [].concat.apply(
                      [],
                      I.map(function (k) {
                        return h.findBox(k, ["tfhd"]).map(function (w) {
                          var z, N, B;
                          return (
                            (z = h.readUint32(w, 4)),
                            (N = T[z].timescale || 9e4),
                            (B = h.findBox(k, ["tfdt"]).map(function (Y) {
                              var J, le;
                              return (
                                (J = Y.data[Y.start]),
                                (le = h.readUint32(Y, 4)),
                                J === 1 &&
                                  ((le *= Math.pow(2, 32)),
                                  (le += h.readUint32(Y, 8))),
                                le
                              );
                            })[0]),
                            B / N
                          );
                        });
                      })
                    )),
                    (F = Math.min.apply(null, _)),
                    isFinite(F) ? F : 0
                  );
                }),
                (h.offsetStartDTS = function (T, S, I) {
                  h.findBox(S, ["moof", "traf"]).map(function (_) {
                    return h.findBox(_, ["tfhd"]).map(function (F) {
                      var k = h.readUint32(F, 4),
                        w = T[k].timescale || 9e4;
                      h.findBox(_, ["tfdt"]).map(function (z) {
                        var N = z.data[z.start],
                          B = h.readUint32(z, 4);
                        if (N === 0) h.writeUint32(z, 4, B - I * w);
                        else {
                          (B *= Math.pow(2, 32)),
                            (B += h.readUint32(z, 8)),
                            (B -= I * w),
                            (B = Math.max(B, 0));
                          var Y = Math.floor(B / (D + 1)),
                            J = Math.floor(B % (D + 1));
                          h.writeUint32(z, 4, Y), h.writeUint32(z, 8, J);
                        }
                      });
                    });
                  });
                }),
                (c.append = function (T, S, I, _) {
                  var F = this.initData;
                  F ||
                    (this.resetInitSegment(
                      T,
                      this.audioCodec,
                      this.videoCodec,
                      !1
                    ),
                    (F = this.initData));
                  var k,
                    w = this.initPTS;
                  if (w === void 0) {
                    var z = h.getStartDTS(F, T);
                    (this.initPTS = w = z - S),
                      this.observer.trigger(W.default.INIT_PTS_FOUND, {
                        initPTS: w,
                      });
                  }
                  h.offsetStartDTS(F, T, w),
                    (k = h.getStartDTS(F, T)),
                    this.remuxer.remux(
                      F.audio,
                      F.video,
                      null,
                      null,
                      k,
                      I,
                      _,
                      T
                    );
                }),
                (c.destroy = function () {}),
                h
              );
            })();
          te.default = ee;
        },
        "./src/errors.ts": function (Te, te, K) {
          K.r(te),
            K.d(te, "ErrorTypes", function () {
              return Q;
            }),
            K.d(te, "ErrorDetails", function () {
              return W;
            });
          var Q;
          (function (D) {
            (D.NETWORK_ERROR = "networkError"),
              (D.MEDIA_ERROR = "mediaError"),
              (D.KEY_SYSTEM_ERROR = "keySystemError"),
              (D.MUX_ERROR = "muxError"),
              (D.OTHER_ERROR = "otherError");
          })(Q || (Q = {}));
          var W;
          (function (D) {
            (D.KEY_SYSTEM_NO_KEYS = "keySystemNoKeys"),
              (D.KEY_SYSTEM_NO_ACCESS = "keySystemNoAccess"),
              (D.KEY_SYSTEM_NO_SESSION = "keySystemNoSession"),
              (D.KEY_SYSTEM_LICENSE_REQUEST_FAILED =
                "keySystemLicenseRequestFailed"),
              (D.KEY_SYSTEM_NO_INIT_DATA = "keySystemNoInitData"),
              (D.MANIFEST_LOAD_ERROR = "manifestLoadError"),
              (D.MANIFEST_LOAD_TIMEOUT = "manifestLoadTimeOut"),
              (D.MANIFEST_PARSING_ERROR = "manifestParsingError"),
              (D.MANIFEST_INCOMPATIBLE_CODECS_ERROR =
                "manifestIncompatibleCodecsError"),
              (D.LEVEL_EMPTY_ERROR = "levelEmptyError"),
              (D.LEVEL_LOAD_ERROR = "levelLoadError"),
              (D.LEVEL_LOAD_TIMEOUT = "levelLoadTimeOut"),
              (D.LEVEL_SWITCH_ERROR = "levelSwitchError"),
              (D.AUDIO_TRACK_LOAD_ERROR = "audioTrackLoadError"),
              (D.AUDIO_TRACK_LOAD_TIMEOUT = "audioTrackLoadTimeOut"),
              (D.FRAG_LOAD_ERROR = "fragLoadError"),
              (D.FRAG_LOAD_TIMEOUT = "fragLoadTimeOut"),
              (D.FRAG_DECRYPT_ERROR = "fragDecryptError"),
              (D.FRAG_PARSING_ERROR = "fragParsingError"),
              (D.REMUX_ALLOC_ERROR = "remuxAllocError"),
              (D.KEY_LOAD_ERROR = "keyLoadError"),
              (D.KEY_LOAD_TIMEOUT = "keyLoadTimeOut"),
              (D.BUFFER_ADD_CODEC_ERROR = "bufferAddCodecError"),
              (D.BUFFER_APPEND_ERROR = "bufferAppendError"),
              (D.BUFFER_APPENDING_ERROR = "bufferAppendingError"),
              (D.BUFFER_STALLED_ERROR = "bufferStalledError"),
              (D.BUFFER_FULL_ERROR = "bufferFullError"),
              (D.BUFFER_SEEK_OVER_HOLE = "bufferSeekOverHole"),
              (D.BUFFER_NUDGE_ON_STALL = "bufferNudgeOnStall"),
              (D.INTERNAL_EXCEPTION = "internalException");
          })(W || (W = {}));
        },
        "./src/events.js": function (Te, te, K) {
          K.r(te);
          var Q = {
            MEDIA_ATTACHING: "hlsMediaAttaching",
            MEDIA_ATTACHED: "hlsMediaAttached",
            MEDIA_DETACHING: "hlsMediaDetaching",
            MEDIA_DETACHED: "hlsMediaDetached",
            BUFFER_RESET: "hlsBufferReset",
            BUFFER_CODECS: "hlsBufferCodecs",
            BUFFER_CREATED: "hlsBufferCreated",
            BUFFER_APPENDING: "hlsBufferAppending",
            BUFFER_APPENDED: "hlsBufferAppended",
            BUFFER_EOS: "hlsBufferEos",
            BUFFER_FLUSHING: "hlsBufferFlushing",
            BUFFER_FLUSHED: "hlsBufferFlushed",
            MANIFEST_LOADING: "hlsManifestLoading",
            MANIFEST_LOADED: "hlsManifestLoaded",
            MANIFEST_PARSED: "hlsManifestParsed",
            LEVEL_SWITCHING: "hlsLevelSwitching",
            LEVEL_SWITCHED: "hlsLevelSwitched",
            LEVEL_LOADING: "hlsLevelLoading",
            LEVEL_LOADED: "hlsLevelLoaded",
            LEVEL_UPDATED: "hlsLevelUpdated",
            LEVEL_PTS_UPDATED: "hlsLevelPtsUpdated",
            LEVELS_UPDATED: "hlsLevelsUpdated",
            AUDIO_TRACKS_UPDATED: "hlsAudioTracksUpdated",
            AUDIO_TRACK_SWITCHING: "hlsAudioTrackSwitching",
            AUDIO_TRACK_SWITCHED: "hlsAudioTrackSwitched",
            AUDIO_TRACK_LOADING: "hlsAudioTrackLoading",
            AUDIO_TRACK_LOADED: "hlsAudioTrackLoaded",
            SUBTITLE_TRACKS_UPDATED: "hlsSubtitleTracksUpdated",
            SUBTITLE_TRACK_SWITCH: "hlsSubtitleTrackSwitch",
            SUBTITLE_TRACK_LOADING: "hlsSubtitleTrackLoading",
            SUBTITLE_TRACK_LOADED: "hlsSubtitleTrackLoaded",
            SUBTITLE_FRAG_PROCESSED: "hlsSubtitleFragProcessed",
            CUES_PARSED: "hlsCuesParsed",
            NON_NATIVE_TEXT_TRACKS_FOUND: "hlsNonNativeTextTracksFound",
            INIT_PTS_FOUND: "hlsInitPtsFound",
            FRAG_LOADING: "hlsFragLoading",
            FRAG_LOAD_PROGRESS: "hlsFragLoadProgress",
            FRAG_LOAD_EMERGENCY_ABORTED: "hlsFragLoadEmergencyAborted",
            FRAG_LOADED: "hlsFragLoaded",
            FRAG_DECRYPTED: "hlsFragDecrypted",
            FRAG_PARSING_INIT_SEGMENT: "hlsFragParsingInitSegment",
            FRAG_PARSING_USERDATA: "hlsFragParsingUserdata",
            FRAG_PARSING_METADATA: "hlsFragParsingMetadata",
            FRAG_PARSING_DATA: "hlsFragParsingData",
            FRAG_PARSED: "hlsFragParsed",
            FRAG_BUFFERED: "hlsFragBuffered",
            FRAG_CHANGED: "hlsFragChanged",
            FPS_DROP: "hlsFpsDrop",
            FPS_DROP_LEVEL_CAPPING: "hlsFpsDropLevelCapping",
            ERROR: "hlsError",
            DESTROYING: "hlsDestroying",
            KEY_LOADING: "hlsKeyLoading",
            KEY_LOADED: "hlsKeyLoaded",
            STREAM_STATE_TRANSITION: "hlsStreamStateTransition",
            LIVE_BACK_BUFFER_REACHED: "hlsLiveBackBufferReached",
          };
          te.default = Q;
        },
        "./src/hls.ts": function (Te, te, K) {
          K.r(te),
            K.d(te, "default", function () {
              return Yr;
            });
          var Q = {};
          K.r(Q),
            K.d(Q, "newCue", function () {
              return Ni;
            });
          var W = K("./node_modules/url-toolkit/src/url-toolkit.js"),
            D = K("./src/errors.ts"),
            ee = K("./src/polyfills/number.js"),
            h = K("./src/events.js"),
            c = K("./src/utils/logger.js"),
            Z = {
              hlsEventGeneric: !0,
              hlsHandlerDestroying: !0,
              hlsHandlerDestroyed: !0,
            },
            T = (function () {
              function o(i) {
                (this.hls = void 0),
                  (this.handledEvents = void 0),
                  (this.useGenericHandler = void 0),
                  (this.hls = i),
                  (this.onEvent = this.onEvent.bind(this));
                for (
                  var r = arguments.length,
                    e = new Array(r > 1 ? r - 1 : 0),
                    t = 1;
                  t < r;
                  t++
                )
                  e[t - 1] = arguments[t];
                (this.handledEvents = e),
                  (this.useGenericHandler = !0),
                  this.registerListeners();
              }
              var n = o.prototype;
              return (
                (n.destroy = function () {
                  this.onHandlerDestroying(),
                    this.unregisterListeners(),
                    this.onHandlerDestroyed();
                }),
                (n.onHandlerDestroying = function () {}),
                (n.onHandlerDestroyed = function () {}),
                (n.isEventHandler = function () {
                  return (
                    typeof this.handledEvents == "object" &&
                    this.handledEvents.length &&
                    typeof this.onEvent == "function"
                  );
                }),
                (n.registerListeners = function () {
                  this.isEventHandler() &&
                    this.handledEvents.forEach(function (r) {
                      if (Z[r]) throw new Error("Forbidden event-name: " + r);
                      this.hls.on(r, this.onEvent);
                    }, this);
                }),
                (n.unregisterListeners = function () {
                  this.isEventHandler() &&
                    this.handledEvents.forEach(function (r) {
                      this.hls.off(r, this.onEvent);
                    }, this);
                }),
                (n.onEvent = function (r, e) {
                  this.onEventGeneric(r, e);
                }),
                (n.onEventGeneric = function (r, e) {
                  var t = function (s, l) {
                    var u = "on" + s.replace("hls", "");
                    if (typeof this[u] != "function")
                      throw new Error(
                        "Event " +
                          s +
                          " has no generic handler in this " +
                          this.constructor.name +
                          " class (tried " +
                          u +
                          ")"
                      );
                    return this[u].bind(this, l);
                  };
                  try {
                    t.call(this, r, e).call();
                  } catch (a) {
                    c.logger.error(
                      "An internal error happened while handling event " +
                        r +
                        '. Error message: "' +
                        a.message +
                        '". Here is a stacktrace:',
                      a
                    ),
                      this.hls.trigger(h.default.ERROR, {
                        type: D.ErrorTypes.OTHER_ERROR,
                        details: D.ErrorDetails.INTERNAL_EXCEPTION,
                        fatal: !1,
                        event: r,
                        err: a,
                      });
                  }
                }),
                o
              );
            })(),
            S = T,
            I;
          (function (o) {
            (o.MANIFEST = "manifest"),
              (o.LEVEL = "level"),
              (o.AUDIO_TRACK = "audioTrack"),
              (o.SUBTITLE_TRACK = "subtitleTrack");
          })(I || (I = {}));
          var _;
          (function (o) {
            (o.MAIN = "main"), (o.AUDIO = "audio"), (o.SUBTITLE = "subtitle");
          })(_ || (_ = {}));
          var F = K("./src/demux/mp4demuxer.js");
          function k(o, n) {
            for (var i = 0; i < n.length; i++) {
              var r = n[i];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                "value" in r && (r.writable = !0),
                Object.defineProperty(o, r.key, r);
            }
          }
          function w(o, n, i) {
            return n && k(o.prototype, n), o;
          }
          var z = (function () {
            function o(n, i) {
              (this._uri = null),
                (this.baseuri = void 0),
                (this.reluri = void 0),
                (this.method = null),
                (this.key = null),
                (this.iv = null),
                (this.baseuri = n),
                (this.reluri = i);
            }
            return (
              w(o, [
                {
                  key: "uri",
                  get: function () {
                    return (
                      !this._uri &&
                        this.reluri &&
                        (this._uri = Object(W.buildAbsoluteURL)(
                          this.baseuri,
                          this.reluri,
                          { alwaysNormalize: !0 }
                        )),
                      this._uri
                    );
                  },
                },
              ]),
              o
            );
          })();
          function N(o, n) {
            for (var i = 0; i < n.length; i++) {
              var r = n[i];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                "value" in r && (r.writable = !0),
                Object.defineProperty(o, r.key, r);
            }
          }
          function B(o, n, i) {
            return n && N(o.prototype, n), o;
          }
          var Y;
          (function (o) {
            (o.AUDIO = "audio"), (o.VIDEO = "video");
          })(Y || (Y = {}));
          var J = (function () {
            function o() {
              var i;
              (this._url = null),
                (this._byteRange = null),
                (this._decryptdata = null),
                (this._elementaryStreams =
                  ((i = {}), (i[Y.AUDIO] = !1), (i[Y.VIDEO] = !1), i)),
                (this.deltaPTS = 0),
                (this.rawProgramDateTime = null),
                (this.programDateTime = null),
                (this.title = null),
                (this.tagList = []),
                (this.cc = void 0),
                (this.type = void 0),
                (this.relurl = void 0),
                (this.baseurl = void 0),
                (this.duration = void 0),
                (this.start = void 0),
                (this.sn = 0),
                (this.urlId = 0),
                (this.level = 0),
                (this.levelkey = void 0),
                (this.loader = void 0);
            }
            var n = o.prototype;
            return (
              (n.setByteRange = function (r, e) {
                var t = r.split("@", 2),
                  a = [];
                t.length === 1
                  ? (a[0] = e ? e.byteRangeEndOffset : 0)
                  : (a[0] = parseInt(t[1])),
                  (a[1] = parseInt(t[0]) + a[0]),
                  (this._byteRange = a);
              }),
              (n.addElementaryStream = function (r) {
                this._elementaryStreams[r] = !0;
              }),
              (n.hasElementaryStream = function (r) {
                return this._elementaryStreams[r] === !0;
              }),
              (n.createInitializationVector = function (r) {
                for (var e = new Uint8Array(16), t = 12; t < 16; t++)
                  e[t] = (r >> (8 * (15 - t))) & 255;
                return e;
              }),
              (n.setDecryptDataFromLevelKey = function (r, e) {
                var t = r;
                return (
                  r != null &&
                    r.method &&
                    r.uri &&
                    !r.iv &&
                    ((t = new z(r.baseuri, r.reluri)),
                    (t.method = r.method),
                    (t.iv = this.createInitializationVector(e))),
                  t
                );
              }),
              B(o, [
                {
                  key: "url",
                  get: function () {
                    return (
                      !this._url &&
                        this.relurl &&
                        (this._url = Object(W.buildAbsoluteURL)(
                          this.baseurl,
                          this.relurl,
                          { alwaysNormalize: !0 }
                        )),
                      this._url
                    );
                  },
                  set: function (r) {
                    this._url = r;
                  },
                },
                {
                  key: "byteRange",
                  get: function () {
                    return this._byteRange ? this._byteRange : [];
                  },
                },
                {
                  key: "byteRangeStartOffset",
                  get: function () {
                    return this.byteRange[0];
                  },
                },
                {
                  key: "byteRangeEndOffset",
                  get: function () {
                    return this.byteRange[1];
                  },
                },
                {
                  key: "decryptdata",
                  get: function () {
                    if (!this.levelkey && !this._decryptdata) return null;
                    if (!this._decryptdata && this.levelkey) {
                      var r = this.sn;
                      typeof r != "number" &&
                        (this.levelkey &&
                          this.levelkey.method === "AES-128" &&
                          !this.levelkey.iv &&
                          c.logger.warn(
                            'missing IV for initialization segment with method="' +
                              this.levelkey.method +
                              '" - compliance issue'
                          ),
                        (r = 0)),
                        (this._decryptdata = this.setDecryptDataFromLevelKey(
                          this.levelkey,
                          r
                        ));
                    }
                    return this._decryptdata;
                  },
                },
                {
                  key: "endProgramDateTime",
                  get: function () {
                    if (
                      this.programDateTime === null ||
                      !Object(ee.isFiniteNumber)(this.programDateTime)
                    )
                      return null;
                    var r = Object(ee.isFiniteNumber)(this.duration)
                      ? this.duration
                      : 0;
                    return this.programDateTime + r * 1e3;
                  },
                },
                {
                  key: "encrypted",
                  get: function () {
                    return !!(
                      this.decryptdata &&
                      this.decryptdata.uri !== null &&
                      this.decryptdata.key === null
                    );
                  },
                },
              ]),
              o
            );
          })();
          function le(o, n) {
            for (var i = 0; i < n.length; i++) {
              var r = n[i];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                "value" in r && (r.writable = !0),
                Object.defineProperty(o, r.key, r);
            }
          }
          function ie(o, n, i) {
            return n && le(o.prototype, n), o;
          }
          var fe = (function () {
              function o(n) {
                (this.endCC = 0),
                  (this.endSN = 0),
                  (this.fragments = []),
                  (this.initSegment = null),
                  (this.live = !0),
                  (this.needSidxRanges = !1),
                  (this.startCC = 0),
                  (this.startSN = 0),
                  (this.startTimeOffset = null),
                  (this.targetduration = 0),
                  (this.totalduration = 0),
                  (this.type = null),
                  (this.url = n),
                  (this.version = null);
              }
              return (
                ie(o, [
                  {
                    key: "hasProgramDateTime",
                    get: function () {
                      return !!(
                        this.fragments[0] &&
                        Object(ee.isFiniteNumber)(
                          this.fragments[0].programDateTime
                        )
                      );
                    },
                  },
                ]),
                o
              );
            })(),
            _e = /^(\d+)x(\d+)$/,
            Pe = /\s*(.+?)\s*=((?:\".*?\")|.*?)(?:,|$)/g,
            ke = (function () {
              function o(i) {
                typeof i == "string" && (i = o.parseAttrList(i));
                for (var r in i) i.hasOwnProperty(r) && (this[r] = i[r]);
              }
              var n = o.prototype;
              return (
                (n.decimalInteger = function (r) {
                  var e = parseInt(this[r], 10);
                  return e > Number.MAX_SAFE_INTEGER ? 1 / 0 : e;
                }),
                (n.hexadecimalInteger = function (r) {
                  if (this[r]) {
                    var e = (this[r] || "0x").slice(2);
                    e = (e.length & 1 ? "0" : "") + e;
                    for (
                      var t = new Uint8Array(e.length / 2), a = 0;
                      a < e.length / 2;
                      a++
                    )
                      t[a] = parseInt(e.slice(a * 2, a * 2 + 2), 16);
                    return t;
                  } else return null;
                }),
                (n.hexadecimalIntegerAsNumber = function (r) {
                  var e = parseInt(this[r], 16);
                  return e > Number.MAX_SAFE_INTEGER ? 1 / 0 : e;
                }),
                (n.decimalFloatingPoint = function (r) {
                  return parseFloat(this[r]);
                }),
                (n.enumeratedString = function (r) {
                  return this[r];
                }),
                (n.decimalResolution = function (r) {
                  var e = _e.exec(this[r]);
                  if (e !== null)
                    return {
                      width: parseInt(e[1], 10),
                      height: parseInt(e[2], 10),
                    };
                }),
                (o.parseAttrList = function (r) {
                  var e,
                    t = {};
                  for (Pe.lastIndex = 0; (e = Pe.exec(r)) !== null; ) {
                    var a = e[2],
                      s = '"';
                    a.indexOf(s) === 0 &&
                      a.lastIndexOf(s) === a.length - 1 &&
                      (a = a.slice(1, -1)),
                      (t[e[1]] = a);
                  }
                  return t;
                }),
                o
              );
            })(),
            Le = ke,
            dt = {
              audio: {
                a3ds: !0,
                "ac-3": !0,
                "ac-4": !0,
                alac: !0,
                alaw: !0,
                dra1: !0,
                "dts+": !0,
                "dts-": !0,
                dtsc: !0,
                dtse: !0,
                dtsh: !0,
                "ec-3": !0,
                enca: !0,
                g719: !0,
                g726: !0,
                m4ae: !0,
                mha1: !0,
                mha2: !0,
                mhm1: !0,
                mhm2: !0,
                mlpa: !0,
                mp4a: !0,
                "raw ": !0,
                Opus: !0,
                samr: !0,
                sawb: !0,
                sawp: !0,
                sevc: !0,
                sqcp: !0,
                ssmv: !0,
                twos: !0,
                ulaw: !0,
              },
              video: {
                avc1: !0,
                avc2: !0,
                avc3: !0,
                avc4: !0,
                avcp: !0,
                drac: !0,
                dvav: !0,
                dvhe: !0,
                encv: !0,
                hev1: !0,
                hvc1: !0,
                mjp2: !0,
                mp4v: !0,
                mvc1: !0,
                mvc2: !0,
                mvc3: !0,
                mvc4: !0,
                resv: !0,
                rv60: !0,
                s263: !0,
                svc1: !0,
                svc2: !0,
                "vc-1": !0,
                vp08: !0,
                vp09: !0,
              },
            };
          function we(o, n) {
            var i = dt[n];
            return !!i && i[o.slice(0, 4)] === !0;
          }
          function Me(o, n) {
            return MediaSource.isTypeSupported(
              (n || "video") + '/mp4;codecs="' + o + '"'
            );
          }
          var Ve =
              /(?:#EXT-X-STREAM-INF:([^\n\r]*)[\r\n]+([^\r\n]+)|#EXT-X-SESSION-DATA:([^\n\r]*)[\r\n]+)/g,
            Be = /#EXT-X-MEDIA:(.*)/g,
            Ge = new RegExp(
              [
                /#EXTINF:\s*(\d*(?:\.\d+)?)(?:,(.*)\s+)?/.source,
                /|(?!#)([\S+ ?]+)/.source,
                /|#EXT-X-BYTERANGE:*(.+)/.source,
                /|#EXT-X-PROGRAM-DATE-TIME:(.+)/.source,
                /|#.*/.source,
              ].join(""),
              "g"
            ),
            Ne =
              /(?:(?:#(EXTM3U))|(?:#EXT-X-(PLAYLIST-TYPE):(.+))|(?:#EXT-X-(MEDIA-SEQUENCE): *(\d+))|(?:#EXT-X-(TARGETDURATION): *(\d+))|(?:#EXT-X-(KEY):(.+))|(?:#EXT-X-(START):(.+))|(?:#EXT-X-(ENDLIST))|(?:#EXT-X-(DISCONTINUITY-SEQ)UENCE:(\d+))|(?:#EXT-X-(DIS)CONTINUITY))|(?:#EXT-X-(VERSION):(\d+))|(?:#EXT-X-(MAP):(.+))|(?:(#)([^:]*):(.*))|(?:(#)(.*))(?:.*)\r?\n?/,
            ge = /\.(mp4|m4s|m4v|m4a)$/i,
            rt = (function () {
              function o() {}
              return (
                (o.findGroup = function (i, r) {
                  for (var e = 0; e < i.length; e++) {
                    var t = i[e];
                    if (t.id === r) return t;
                  }
                }),
                (o.convertAVC1ToAVCOTI = function (i) {
                  var r = i.split("."),
                    e;
                  return (
                    r.length > 2
                      ? ((e = r.shift() + "."),
                        (e += parseInt(r.shift()).toString(16)),
                        (e += ("000" + parseInt(r.shift()).toString(16)).substr(
                          -4
                        )))
                      : (e = i),
                    e
                  );
                }),
                (o.resolve = function (i, r) {
                  return W.buildAbsoluteURL(r, i, { alwaysNormalize: !0 });
                }),
                (o.parseMasterPlaylist = function (i, r) {
                  var e = [],
                    t = {},
                    a = !1;
                  Ve.lastIndex = 0;
                  function s(R, O) {
                    ["video", "audio"].forEach(function (j) {
                      var q = R.filter(function (re) {
                        return we(re, j);
                      });
                      if (q.length) {
                        var ne = q.filter(function (re) {
                          return (
                            re.lastIndexOf("avc1", 0) === 0 ||
                            re.lastIndexOf("mp4a", 0) === 0
                          );
                        });
                        (O[j + "Codec"] = ne.length > 0 ? ne[0] : q[0]),
                          (R = R.filter(function (re) {
                            return q.indexOf(re) === -1;
                          }));
                      }
                    }),
                      (O.unknownCodecs = R);
                  }
                  for (var l; (l = Ve.exec(i)) != null; )
                    if (l[1]) {
                      var u = {},
                        d = (u.attrs = new Le(l[1]));
                      u.url = o.resolve(l[2], r);
                      var v = d.decimalResolution("RESOLUTION");
                      v && ((u.width = v.width), (u.height = v.height)),
                        (u.bitrate =
                          d.decimalInteger("AVERAGE-BANDWIDTH") ||
                          d.decimalInteger("BANDWIDTH")),
                        (u.name = d.NAME),
                        s([].concat((d.CODECS || "").split(/[ ,]+/)), u),
                        u.videoCodec &&
                          u.videoCodec.indexOf("avc1") !== -1 &&
                          (u.videoCodec = o.convertAVC1ToAVCOTI(u.videoCodec)),
                        e.push(u);
                    } else if (l[3]) {
                      var p = new Le(l[3]);
                      p["DATA-ID"] && ((a = !0), (t[p["DATA-ID"]] = p));
                    }
                  return { levels: e, sessionData: a ? t : null };
                }),
                (o.parseMasterPlaylistMedia = function (i, r, e, t) {
                  t === void 0 && (t = []);
                  var a,
                    s = [],
                    l = 0;
                  for (Be.lastIndex = 0; (a = Be.exec(i)) !== null; ) {
                    var u = new Le(a[1]);
                    if (u.TYPE === e) {
                      var d = {
                        attrs: u,
                        id: l++,
                        groupId: u["GROUP-ID"],
                        instreamId: u["INSTREAM-ID"],
                        name: u.NAME || u.LANGUAGE,
                        type: e,
                        default: u.DEFAULT === "YES",
                        autoselect: u.AUTOSELECT === "YES",
                        forced: u.FORCED === "YES",
                        lang: u.LANGUAGE,
                      };
                      if ((u.URI && (d.url = o.resolve(u.URI, r)), t.length)) {
                        var v = o.findGroup(t, d.groupId);
                        d.audioCodec = v ? v.codec : t[0].codec;
                      }
                      s.push(d);
                    }
                  }
                  return s;
                }),
                (o.parseLevelPlaylist = function (i, r, e, t, a) {
                  var s = 0,
                    l = 0,
                    u = new fe(r),
                    d = 0,
                    v = null,
                    p = new J(),
                    R,
                    O,
                    j,
                    q = null;
                  for (Ge.lastIndex = 0; (R = Ge.exec(i)) !== null; ) {
                    var ne = R[1];
                    if (ne) {
                      p.duration = parseFloat(ne);
                      var re = (" " + R[2]).slice(1);
                      (p.title = re || null),
                        p.tagList.push(re ? ["INF", ne, re] : ["INF", ne]);
                    } else if (R[3]) {
                      if (Object(ee.isFiniteNumber)(p.duration)) {
                        var ue = s++;
                        (p.type = t),
                          (p.start = l),
                          j && (p.levelkey = j),
                          (p.sn = ue),
                          (p.level = e),
                          (p.cc = d),
                          (p.urlId = a),
                          (p.baseurl = r),
                          (p.relurl = (" " + R[3]).slice(1)),
                          Tt(p, v),
                          u.fragments.push(p),
                          (v = p),
                          (l += p.duration),
                          (p = new J());
                      }
                    } else if (R[4]) {
                      var de = (" " + R[4]).slice(1);
                      v ? p.setByteRange(de, v) : p.setByteRange(de);
                    } else if (R[5])
                      (p.rawProgramDateTime = (" " + R[5]).slice(1)),
                        p.tagList.push([
                          "PROGRAM-DATE-TIME",
                          p.rawProgramDateTime,
                        ]),
                        q === null && (q = u.fragments.length);
                    else {
                      if (((R = R[0].match(Ne)), !R)) {
                        c.logger.warn(
                          "No matches on slow regex match for level playlist!"
                        );
                        continue;
                      }
                      for (O = 1; O < R.length && !(typeof R[O] < "u"); O++);
                      var ye = (" " + R[O + 1]).slice(1),
                        Ue = (" " + R[O + 2]).slice(1);
                      switch (R[O]) {
                        case "#":
                          p.tagList.push(Ue ? [ye, Ue] : [ye]);
                          break;
                        case "PLAYLIST-TYPE":
                          u.type = ye.toUpperCase();
                          break;
                        case "MEDIA-SEQUENCE":
                          s = u.startSN = parseInt(ye);
                          break;
                        case "TARGETDURATION":
                          u.targetduration = parseFloat(ye);
                          break;
                        case "VERSION":
                          u.version = parseInt(ye);
                          break;
                        case "EXTM3U":
                          break;
                        case "ENDLIST":
                          u.live = !1;
                          break;
                        case "DIS":
                          d++, p.tagList.push(["DIS"]);
                          break;
                        case "DISCONTINUITY-SEQ":
                          d = parseInt(ye);
                          break;
                        case "KEY": {
                          var ft = ye,
                            Qe = new Le(ft),
                            Rt = Qe.enumeratedString("METHOD"),
                            oe = Qe.URI,
                            ve = Qe.hexadecimalInteger("IV"),
                            je = Qe.KEYFORMAT || "identity";
                          if (je === "com.apple.streamingkeydelivery") {
                            c.logger.warn(
                              "Keyformat com.apple.streamingkeydelivery is not supported"
                            );
                            continue;
                          }
                          Rt &&
                            ((j = new z(r, oe)),
                            oe &&
                              [
                                "AES-128",
                                "SAMPLE-AES",
                                "SAMPLE-AES-CENC",
                              ].indexOf(Rt) >= 0 &&
                              ((j.method = Rt), (j.key = null), (j.iv = ve)));
                          break;
                        }
                        case "START": {
                          var Gt = new Le(ye),
                            Kt = Gt.decimalFloatingPoint("TIME-OFFSET");
                          Object(ee.isFiniteNumber)(Kt) &&
                            (u.startTimeOffset = Kt);
                          break;
                        }
                        case "MAP": {
                          var Xt = new Le(ye);
                          (p.relurl = Xt.URI),
                            Xt.BYTERANGE && p.setByteRange(Xt.BYTERANGE),
                            (p.baseurl = r),
                            (p.level = e),
                            (p.type = t),
                            (p.sn = "initSegment"),
                            (u.initSegment = p),
                            (p = new J()),
                            (p.rawProgramDateTime =
                              u.initSegment.rawProgramDateTime);
                          break;
                        }
                        default:
                          c.logger.warn("line parsed but not handled: " + R);
                          break;
                      }
                    }
                  }
                  return (
                    (p = v),
                    p && !p.relurl && (u.fragments.pop(), (l -= p.duration)),
                    (u.totalduration = l),
                    (u.averagetargetduration = l / u.fragments.length),
                    (u.endSN = s - 1),
                    (u.startCC = u.fragments[0] ? u.fragments[0].cc : 0),
                    (u.endCC = d),
                    !u.initSegment &&
                      u.fragments.length &&
                      u.fragments.every(function (nr) {
                        return ge.test(nr.relurl);
                      }) &&
                      (c.logger.warn(
                        "MP4 fragments found but no init segment (probably no MAP, incomplete M3U8), trying to fetch SIDX"
                      ),
                      (p = new J()),
                      (p.relurl = u.fragments[0].relurl),
                      (p.baseurl = r),
                      (p.level = e),
                      (p.type = t),
                      (p.sn = "initSegment"),
                      (u.initSegment = p),
                      (u.needSidxRanges = !0)),
                    q && be(u.fragments, q),
                    u
                  );
                }),
                o
              );
            })();
          function be(o, n) {
            for (var i = o[n], r = n - 1; r >= 0; r--) {
              var e = o[r];
              (e.programDateTime = i.programDateTime - e.duration * 1e3),
                (i = e);
            }
          }
          function Tt(o, n) {
            o.rawProgramDateTime
              ? (o.programDateTime = Date.parse(o.rawProgramDateTime))
              : n != null &&
                n.programDateTime &&
                (o.programDateTime = n.endProgramDateTime),
              Object(ee.isFiniteNumber)(o.programDateTime) ||
                ((o.programDateTime = null), (o.rawProgramDateTime = null));
          }
          function St(o, n) {
            (o.prototype = Object.create(n.prototype)),
              (o.prototype.constructor = o),
              (o.__proto__ = n);
          }
          var Ae = window,
            $e = Ae.performance,
            it = (function (o) {
              St(n, o);
              function n(r) {
                var e;
                return (
                  (e =
                    o.call(
                      this,
                      r,
                      h.default.MANIFEST_LOADING,
                      h.default.LEVEL_LOADING,
                      h.default.AUDIO_TRACK_LOADING,
                      h.default.SUBTITLE_TRACK_LOADING
                    ) || this),
                  (e.loaders = {}),
                  e
                );
              }
              (n.canHaveQualityLevels = function (e) {
                return e !== I.AUDIO_TRACK && e !== I.SUBTITLE_TRACK;
              }),
                (n.mapContextToLevelType = function (e) {
                  var t = e.type;
                  switch (t) {
                    case I.AUDIO_TRACK:
                      return _.AUDIO;
                    case I.SUBTITLE_TRACK:
                      return _.SUBTITLE;
                    default:
                      return _.MAIN;
                  }
                }),
                (n.getResponseUrl = function (e, t) {
                  var a = e.url;
                  return (
                    (a === void 0 || a.indexOf("data:") === 0) && (a = t.url), a
                  );
                });
              var i = n.prototype;
              return (
                (i.createInternalLoader = function (e) {
                  var t = this.hls.config,
                    a = t.pLoader,
                    s = t.loader,
                    l = a || s,
                    u = new l(t);
                  return (e.loader = u), (this.loaders[e.type] = u), u;
                }),
                (i.getInternalLoader = function (e) {
                  return this.loaders[e.type];
                }),
                (i.resetInternalLoader = function (e) {
                  this.loaders[e] && delete this.loaders[e];
                }),
                (i.destroyInternalLoaders = function () {
                  for (var e in this.loaders) {
                    var t = this.loaders[e];
                    t && t.destroy(), this.resetInternalLoader(e);
                  }
                }),
                (i.destroy = function () {
                  this.destroyInternalLoaders(), o.prototype.destroy.call(this);
                }),
                (i.onManifestLoading = function (e) {
                  this.load({
                    url: e.url,
                    type: I.MANIFEST,
                    level: 0,
                    id: null,
                    responseType: "text",
                  });
                }),
                (i.onLevelLoading = function (e) {
                  this.load({
                    url: e.url,
                    type: I.LEVEL,
                    level: e.level,
                    id: e.id,
                    responseType: "text",
                  });
                }),
                (i.onAudioTrackLoading = function (e) {
                  this.load({
                    url: e.url,
                    type: I.AUDIO_TRACK,
                    level: null,
                    id: e.id,
                    responseType: "text",
                  });
                }),
                (i.onSubtitleTrackLoading = function (e) {
                  this.load({
                    url: e.url,
                    type: I.SUBTITLE_TRACK,
                    level: null,
                    id: e.id,
                    responseType: "text",
                  });
                }),
                (i.load = function (e) {
                  var t = this.hls.config;
                  c.logger.debug(
                    "Loading playlist of type " +
                      e.type +
                      ", level: " +
                      e.level +
                      ", id: " +
                      e.id
                  );
                  var a = this.getInternalLoader(e);
                  if (a) {
                    var s = a.context;
                    if (s && s.url === e.url)
                      return c.logger.trace("playlist request ongoing"), !1;
                    c.logger.warn(
                      "aborting previous loader for type: " + e.type
                    ),
                      a.abort();
                  }
                  var l, u, d, v;
                  switch (e.type) {
                    case I.MANIFEST:
                      (l = t.manifestLoadingMaxRetry),
                        (u = t.manifestLoadingTimeOut),
                        (d = t.manifestLoadingRetryDelay),
                        (v = t.manifestLoadingMaxRetryTimeout);
                      break;
                    case I.LEVEL:
                      (l = 0), (v = 0), (d = 0), (u = t.levelLoadingTimeOut);
                      break;
                    default:
                      (l = t.levelLoadingMaxRetry),
                        (u = t.levelLoadingTimeOut),
                        (d = t.levelLoadingRetryDelay),
                        (v = t.levelLoadingMaxRetryTimeout);
                      break;
                  }
                  a = this.createInternalLoader(e);
                  var p = {
                      timeout: u,
                      maxRetry: l,
                      retryDelay: d,
                      maxRetryDelay: v,
                    },
                    R = {
                      onSuccess: this.loadsuccess.bind(this),
                      onError: this.loaderror.bind(this),
                      onTimeout: this.loadtimeout.bind(this),
                    };
                  return (
                    c.logger.debug(
                      "Calling internal loader delegate for URL: " + e.url
                    ),
                    a.load(e, p, R),
                    !0
                  );
                }),
                (i.loadsuccess = function (e, t, a, s) {
                  if ((s === void 0 && (s = null), a.isSidxRequest)) {
                    this._handleSidxRequest(e, a),
                      this._handlePlaylistLoaded(e, t, a, s);
                    return;
                  }
                  if (
                    (this.resetInternalLoader(a.type),
                    typeof e.data != "string")
                  )
                    throw new Error(
                      'expected responseType of "text" for PlaylistLoader'
                    );
                  var l = e.data;
                  if (((t.tload = $e.now()), l.indexOf("#EXTM3U") !== 0)) {
                    this._handleManifestParsingError(
                      e,
                      a,
                      "no EXTM3U delimiter",
                      s
                    );
                    return;
                  }
                  l.indexOf("#EXTINF:") > 0 ||
                  l.indexOf("#EXT-X-TARGETDURATION:") > 0
                    ? this._handleTrackOrLevelPlaylist(e, t, a, s)
                    : this._handleMasterPlaylist(e, t, a, s);
                }),
                (i.loaderror = function (e, t, a) {
                  a === void 0 && (a = null),
                    this._handleNetworkError(t, a, !1, e);
                }),
                (i.loadtimeout = function (e, t, a) {
                  a === void 0 && (a = null),
                    this._handleNetworkError(t, a, !0);
                }),
                (i._handleMasterPlaylist = function (e, t, a, s) {
                  var l = this.hls,
                    u = e.data,
                    d = n.getResponseUrl(e, a),
                    v = rt.parseMasterPlaylist(u, d),
                    p = v.levels,
                    R = v.sessionData;
                  if (!p.length) {
                    this._handleManifestParsingError(
                      e,
                      a,
                      "no level found in manifest",
                      s
                    );
                    return;
                  }
                  var O = p.map(function (ue) {
                      return { id: ue.attrs.AUDIO, codec: ue.audioCodec };
                    }),
                    j = rt.parseMasterPlaylistMedia(u, d, "AUDIO", O),
                    q = rt.parseMasterPlaylistMedia(u, d, "SUBTITLES"),
                    ne = rt.parseMasterPlaylistMedia(u, d, "CLOSED-CAPTIONS");
                  if (j.length) {
                    var re = !1;
                    j.forEach(function (ue) {
                      ue.url || (re = !0);
                    }),
                      re === !1 &&
                        p[0].audioCodec &&
                        !p[0].attrs.AUDIO &&
                        (c.logger.log(
                          "audio codec signaled in quality level, but no embedded audio track signaled, create one"
                        ),
                        j.unshift({
                          type: "main",
                          name: "main",
                          default: !1,
                          autoselect: !1,
                          forced: !1,
                          id: -1,
                          attrs: {},
                          url: "",
                        }));
                  }
                  l.trigger(h.default.MANIFEST_LOADED, {
                    levels: p,
                    audioTracks: j,
                    subtitles: q,
                    captions: ne,
                    url: d,
                    stats: t,
                    networkDetails: s,
                    sessionData: R,
                  });
                }),
                (i._handleTrackOrLevelPlaylist = function (e, t, a, s) {
                  var l = this.hls,
                    u = a.id,
                    d = a.level,
                    v = a.type,
                    p = n.getResponseUrl(e, a),
                    R = Object(ee.isFiniteNumber)(u) ? u : 0,
                    O = Object(ee.isFiniteNumber)(d) ? d : R,
                    j = n.mapContextToLevelType(a),
                    q = rt.parseLevelPlaylist(e.data, p, O, j, R);
                  if (((q.tload = t.tload), !q.fragments.length)) {
                    l.trigger(h.default.ERROR, {
                      type: D.ErrorTypes.NETWORK_ERROR,
                      details: D.ErrorDetails.LEVEL_EMPTY_ERROR,
                      fatal: !1,
                      url: p,
                      reason: "no fragments found in level",
                      level: typeof a.level == "number" ? a.level : void 0,
                    });
                    return;
                  }
                  if (v === I.MANIFEST) {
                    var ne = { url: p, details: q };
                    l.trigger(h.default.MANIFEST_LOADED, {
                      levels: [ne],
                      audioTracks: [],
                      url: p,
                      stats: t,
                      networkDetails: s,
                      sessionData: null,
                    });
                  }
                  if (((t.tparsed = $e.now()), q.needSidxRanges)) {
                    var re = q.initSegment.url;
                    this.load({
                      url: re,
                      isSidxRequest: !0,
                      type: v,
                      level: d,
                      levelDetails: q,
                      id: u,
                      rangeStart: 0,
                      rangeEnd: 2048,
                      responseType: "arraybuffer",
                    });
                    return;
                  }
                  (a.levelDetails = q), this._handlePlaylistLoaded(e, t, a, s);
                }),
                (i._handleSidxRequest = function (e, t) {
                  if (typeof e.data == "string")
                    throw new Error(
                      "sidx request must be made with responseType of array buffer"
                    );
                  var a = F.default.parseSegmentIndex(new Uint8Array(e.data));
                  if (a) {
                    var s = a.references,
                      l = t.levelDetails;
                    s.forEach(function (u, d) {
                      var v = u.info;
                      if (l) {
                        var p = l.fragments[d];
                        p.byteRange.length === 0 &&
                          p.setByteRange(
                            String(1 + v.end - v.start) + "@" + String(v.start)
                          );
                      }
                    }),
                      l &&
                        l.initSegment.setByteRange(
                          String(a.moovEndOffset) + "@0"
                        );
                  }
                }),
                (i._handleManifestParsingError = function (e, t, a, s) {
                  this.hls.trigger(h.default.ERROR, {
                    type: D.ErrorTypes.NETWORK_ERROR,
                    details: D.ErrorDetails.MANIFEST_PARSING_ERROR,
                    fatal: !0,
                    url: e.url,
                    reason: a,
                    networkDetails: s,
                  });
                }),
                (i._handleNetworkError = function (e, t, a, s) {
                  a === void 0 && (a = !1),
                    s === void 0 && (s = null),
                    c.logger.info(
                      "A network error occured while loading a " +
                        e.type +
                        "-type playlist"
                    );
                  var l,
                    u,
                    d = this.getInternalLoader(e);
                  switch (e.type) {
                    case I.MANIFEST:
                      (l = a
                        ? D.ErrorDetails.MANIFEST_LOAD_TIMEOUT
                        : D.ErrorDetails.MANIFEST_LOAD_ERROR),
                        (u = !0);
                      break;
                    case I.LEVEL:
                      (l = a
                        ? D.ErrorDetails.LEVEL_LOAD_TIMEOUT
                        : D.ErrorDetails.LEVEL_LOAD_ERROR),
                        (u = !1);
                      break;
                    case I.AUDIO_TRACK:
                      (l = a
                        ? D.ErrorDetails.AUDIO_TRACK_LOAD_TIMEOUT
                        : D.ErrorDetails.AUDIO_TRACK_LOAD_ERROR),
                        (u = !1);
                      break;
                    default:
                      u = !1;
                  }
                  d && (d.abort(), this.resetInternalLoader(e.type));
                  var v = {
                    type: D.ErrorTypes.NETWORK_ERROR,
                    details: l,
                    fatal: u,
                    url: e.url,
                    loader: d,
                    context: e,
                    networkDetails: t,
                  };
                  s && (v.response = s), this.hls.trigger(h.default.ERROR, v);
                }),
                (i._handlePlaylistLoaded = function (e, t, a, s) {
                  var l = a.type,
                    u = a.level,
                    d = a.id,
                    v = a.levelDetails;
                  if (!v || !v.targetduration) {
                    this._handleManifestParsingError(
                      e,
                      a,
                      "invalid target duration",
                      s
                    );
                    return;
                  }
                  var p = n.canHaveQualityLevels(a.type);
                  if (p)
                    this.hls.trigger(h.default.LEVEL_LOADED, {
                      details: v,
                      level: u || 0,
                      id: d || 0,
                      stats: t,
                      networkDetails: s,
                    });
                  else
                    switch (l) {
                      case I.AUDIO_TRACK:
                        this.hls.trigger(h.default.AUDIO_TRACK_LOADED, {
                          details: v,
                          id: d,
                          stats: t,
                          networkDetails: s,
                        });
                        break;
                      case I.SUBTITLE_TRACK:
                        this.hls.trigger(h.default.SUBTITLE_TRACK_LOADED, {
                          details: v,
                          id: d,
                          stats: t,
                          networkDetails: s,
                        });
                        break;
                    }
                }),
                n
              );
            })(S),
            st = it;
          function xt(o, n) {
            (o.prototype = Object.create(n.prototype)),
              (o.prototype.constructor = o),
              (o.__proto__ = n);
          }
          var Lt = (function (o) {
              xt(n, o);
              function n(r) {
                var e;
                return (
                  (e = o.call(this, r, h.default.FRAG_LOADING) || this),
                  (e.loaders = {}),
                  e
                );
              }
              var i = n.prototype;
              return (
                (i.destroy = function () {
                  var e = this.loaders;
                  for (var t in e) {
                    var a = e[t];
                    a && a.destroy();
                  }
                  (this.loaders = {}), o.prototype.destroy.call(this);
                }),
                (i.onFragLoading = function (e) {
                  var t = e.frag,
                    a = t.type,
                    s = this.loaders,
                    l = this.hls.config,
                    u = l.fLoader,
                    d = l.loader;
                  t.loaded = 0;
                  var v = s[a];
                  v &&
                    (c.logger.warn(
                      "abort previous fragment loader for type: " + a
                    ),
                    v.abort()),
                    (v = s[a] = t.loader = l.fLoader ? new u(l) : new d(l));
                  var p, R, O;
                  p = {
                    url: t.url,
                    frag: t,
                    responseType: "arraybuffer",
                    progressData: !1,
                  };
                  var j = t.byteRangeStartOffset,
                    q = t.byteRangeEndOffset;
                  Object(ee.isFiniteNumber)(j) &&
                    Object(ee.isFiniteNumber)(q) &&
                    ((p.rangeStart = j), (p.rangeEnd = q)),
                    (R = {
                      timeout: l.fragLoadingTimeOut,
                      maxRetry: 0,
                      retryDelay: 0,
                      maxRetryDelay: l.fragLoadingMaxRetryTimeout,
                    }),
                    (O = {
                      onSuccess: this.loadsuccess.bind(this),
                      onError: this.loaderror.bind(this),
                      onTimeout: this.loadtimeout.bind(this),
                      onProgress: this.loadprogress.bind(this),
                    }),
                    v.load(p, R, O);
                }),
                (i.loadsuccess = function (e, t, a, s) {
                  s === void 0 && (s = null);
                  var l = e.data,
                    u = a.frag;
                  (u.loader = void 0),
                    (this.loaders[u.type] = void 0),
                    this.hls.trigger(h.default.FRAG_LOADED, {
                      payload: l,
                      frag: u,
                      stats: t,
                      networkDetails: s,
                    });
                }),
                (i.loaderror = function (e, t, a) {
                  a === void 0 && (a = null);
                  var s = t.frag,
                    l = s.loader;
                  l && l.abort(),
                    (this.loaders[s.type] = void 0),
                    this.hls.trigger(h.default.ERROR, {
                      type: D.ErrorTypes.NETWORK_ERROR,
                      details: D.ErrorDetails.FRAG_LOAD_ERROR,
                      fatal: !1,
                      frag: t.frag,
                      response: e,
                      networkDetails: a,
                    });
                }),
                (i.loadtimeout = function (e, t, a) {
                  a === void 0 && (a = null);
                  var s = t.frag,
                    l = s.loader;
                  l && l.abort(),
                    (this.loaders[s.type] = void 0),
                    this.hls.trigger(h.default.ERROR, {
                      type: D.ErrorTypes.NETWORK_ERROR,
                      details: D.ErrorDetails.FRAG_LOAD_TIMEOUT,
                      fatal: !1,
                      frag: t.frag,
                      networkDetails: a,
                    });
                }),
                (i.loadprogress = function (e, t, a, s) {
                  s === void 0 && (s = null);
                  var l = t.frag;
                  (l.loaded = e.loaded),
                    this.hls.trigger(h.default.FRAG_LOAD_PROGRESS, {
                      frag: l,
                      stats: e,
                      networkDetails: s,
                    });
                }),
                n
              );
            })(S),
            Je = Lt;
          function _t(o, n) {
            (o.prototype = Object.create(n.prototype)),
              (o.prototype.constructor = o),
              (o.__proto__ = n);
          }
          var ze = (function (o) {
              _t(n, o);
              function n(r) {
                var e;
                return (
                  (e = o.call(this, r, h.default.KEY_LOADING) || this),
                  (e.loaders = {}),
                  (e.decryptkey = null),
                  (e.decrypturl = null),
                  e
                );
              }
              var i = n.prototype;
              return (
                (i.destroy = function () {
                  for (var e in this.loaders) {
                    var t = this.loaders[e];
                    t && t.destroy();
                  }
                  (this.loaders = {}), o.prototype.destroy.call(this);
                }),
                (i.onKeyLoading = function (e) {
                  var t = e.frag,
                    a = t.type,
                    s = this.loaders[a];
                  if (!t.decryptdata) {
                    c.logger.warn(
                      "Missing decryption data on fragment in onKeyLoading"
                    );
                    return;
                  }
                  var l = t.decryptdata.uri;
                  if (l !== this.decrypturl || this.decryptkey === null) {
                    var u = this.hls.config;
                    if (
                      (s &&
                        (c.logger.warn(
                          "abort previous key loader for type:" + a
                        ),
                        s.abort()),
                      !l)
                    ) {
                      c.logger.warn("key uri is falsy");
                      return;
                    }
                    (t.loader = this.loaders[a] = new u.loader(u)),
                      (this.decrypturl = l),
                      (this.decryptkey = null);
                    var d = { url: l, frag: t, responseType: "arraybuffer" },
                      v = {
                        timeout: u.fragLoadingTimeOut,
                        maxRetry: 0,
                        retryDelay: u.fragLoadingRetryDelay,
                        maxRetryDelay: u.fragLoadingMaxRetryTimeout,
                      },
                      p = {
                        onSuccess: this.loadsuccess.bind(this),
                        onError: this.loaderror.bind(this),
                        onTimeout: this.loadtimeout.bind(this),
                      };
                    t.loader.load(d, v, p);
                  } else
                    this.decryptkey &&
                      ((t.decryptdata.key = this.decryptkey),
                      this.hls.trigger(h.default.KEY_LOADED, { frag: t }));
                }),
                (i.loadsuccess = function (e, t, a) {
                  var s = a.frag;
                  if (!s.decryptdata) {
                    c.logger.error("after key load, decryptdata unset");
                    return;
                  }
                  (this.decryptkey = s.decryptdata.key =
                    new Uint8Array(e.data)),
                    (s.loader = void 0),
                    delete this.loaders[s.type],
                    this.hls.trigger(h.default.KEY_LOADED, { frag: s });
                }),
                (i.loaderror = function (e, t) {
                  var a = t.frag,
                    s = a.loader;
                  s && s.abort(),
                    delete this.loaders[a.type],
                    this.hls.trigger(h.default.ERROR, {
                      type: D.ErrorTypes.NETWORK_ERROR,
                      details: D.ErrorDetails.KEY_LOAD_ERROR,
                      fatal: !1,
                      frag: a,
                      response: e,
                    });
                }),
                (i.loadtimeout = function (e, t) {
                  var a = t.frag,
                    s = a.loader;
                  s && s.abort(),
                    delete this.loaders[a.type],
                    this.hls.trigger(h.default.ERROR, {
                      type: D.ErrorTypes.NETWORK_ERROR,
                      details: D.ErrorDetails.KEY_LOAD_TIMEOUT,
                      fatal: !1,
                      frag: a,
                    });
                }),
                n
              );
            })(S),
            Dt = ze;
          function ot(o, n) {
            (o.prototype = Object.create(n.prototype)),
              (o.prototype.constructor = o),
              (o.__proto__ = n);
          }
          var Ye = {
              NOT_LOADED: "NOT_LOADED",
              APPENDING: "APPENDING",
              PARTIAL: "PARTIAL",
              OK: "OK",
            },
            sr = (function (o) {
              ot(n, o);
              function n(r) {
                var e;
                return (
                  (e =
                    o.call(
                      this,
                      r,
                      h.default.BUFFER_APPENDED,
                      h.default.FRAG_BUFFERED,
                      h.default.FRAG_LOADED
                    ) || this),
                  (e.bufferPadding = 0.2),
                  (e.fragments = Object.create(null)),
                  (e.timeRanges = Object.create(null)),
                  (e.config = r.config),
                  e
                );
              }
              var i = n.prototype;
              return (
                (i.destroy = function () {
                  (this.fragments = Object.create(null)),
                    (this.timeRanges = Object.create(null)),
                    (this.config = null),
                    S.prototype.destroy.call(this),
                    o.prototype.destroy.call(this);
                }),
                (i.getBufferedFrag = function (e, t) {
                  var a = this.fragments,
                    s = Object.keys(a).filter(function (u) {
                      var d = a[u];
                      if (d.body.type !== t || !d.buffered) return !1;
                      var v = d.body;
                      return v.startPTS <= e && e <= v.endPTS;
                    });
                  if (s.length === 0) return null;
                  var l = s.pop();
                  return a[l].body;
                }),
                (i.detectEvictedFragments = function (e, t) {
                  var a = this;
                  Object.keys(this.fragments).forEach(function (s) {
                    var l = a.fragments[s];
                    if (!(!l || !l.buffered)) {
                      var u = l.range[e];
                      if (u)
                        for (var d = u.time, v = 0; v < d.length; v++) {
                          var p = d[v];
                          if (!a.isTimeBuffered(p.startPTS, p.endPTS, t)) {
                            a.removeFragment(l.body);
                            break;
                          }
                        }
                    }
                  });
                }),
                (i.detectPartialFragments = function (e) {
                  var t = this,
                    a = this.getFragmentKey(e),
                    s = this.fragments[a];
                  s &&
                    ((s.buffered = !0),
                    Object.keys(this.timeRanges).forEach(function (l) {
                      if (e.hasElementaryStream(l)) {
                        var u = t.timeRanges[l];
                        s.range[l] = t.getBufferedTimes(
                          e.startPTS,
                          e.endPTS,
                          u
                        );
                      }
                    }));
                }),
                (i.getBufferedTimes = function (e, t, a) {
                  for (var s = [], l, u, d = !1, v = 0; v < a.length; v++)
                    if (
                      ((l = a.start(v) - this.bufferPadding),
                      (u = a.end(v) + this.bufferPadding),
                      e >= l && t <= u)
                    ) {
                      s.push({
                        startPTS: Math.max(e, a.start(v)),
                        endPTS: Math.min(t, a.end(v)),
                      });
                      break;
                    } else if (e < u && t > l)
                      s.push({
                        startPTS: Math.max(e, a.start(v)),
                        endPTS: Math.min(t, a.end(v)),
                      }),
                        (d = !0);
                    else if (t <= l) break;
                  return { time: s, partial: d };
                }),
                (i.getFragmentKey = function (e) {
                  return e.type + "_" + e.level + "_" + e.urlId + "_" + e.sn;
                }),
                (i.getPartialFragment = function (e) {
                  var t = this,
                    a,
                    s,
                    l,
                    u = null,
                    d = 0;
                  return (
                    Object.keys(this.fragments).forEach(function (v) {
                      var p = t.fragments[v];
                      t.isPartial(p) &&
                        ((s = p.body.startPTS - t.bufferPadding),
                        (l = p.body.endPTS + t.bufferPadding),
                        e >= s &&
                          e <= l &&
                          ((a = Math.min(e - s, l - e)),
                          d <= a && ((u = p.body), (d = a))));
                    }),
                    u
                  );
                }),
                (i.getState = function (e) {
                  var t = this.getFragmentKey(e),
                    a = this.fragments[t],
                    s = Ye.NOT_LOADED;
                  return (
                    a !== void 0 &&
                      (a.buffered
                        ? this.isPartial(a) === !0
                          ? (s = Ye.PARTIAL)
                          : (s = Ye.OK)
                        : (s = Ye.APPENDING)),
                    s
                  );
                }),
                (i.isPartial = function (e) {
                  return (
                    e.buffered === !0 &&
                    ((e.range.video !== void 0 &&
                      e.range.video.partial === !0) ||
                      (e.range.audio !== void 0 &&
                        e.range.audio.partial === !0))
                  );
                }),
                (i.isTimeBuffered = function (e, t, a) {
                  for (var s, l, u = 0; u < a.length; u++) {
                    if (
                      ((s = a.start(u) - this.bufferPadding),
                      (l = a.end(u) + this.bufferPadding),
                      e >= s && t <= l)
                    )
                      return !0;
                    if (t <= s) return !1;
                  }
                  return !1;
                }),
                (i.onFragLoaded = function (e) {
                  var t = e.frag;
                  !Object(ee.isFiniteNumber)(t.sn) ||
                    t.bitrateTest ||
                    (this.fragments[this.getFragmentKey(t)] = {
                      body: t,
                      range: Object.create(null),
                      buffered: !1,
                    });
                }),
                (i.onBufferAppended = function (e) {
                  var t = this;
                  (this.timeRanges = e.timeRanges),
                    Object.keys(this.timeRanges).forEach(function (a) {
                      var s = t.timeRanges[a];
                      t.detectEvictedFragments(a, s);
                    });
                }),
                (i.onFragBuffered = function (e) {
                  this.detectPartialFragments(e.frag);
                }),
                (i.hasFragment = function (e) {
                  var t = this.getFragmentKey(e);
                  return this.fragments[t] !== void 0;
                }),
                (i.removeFragment = function (e) {
                  var t = this.getFragmentKey(e);
                  delete this.fragments[t];
                }),
                (i.removeAllFragments = function () {
                  this.fragments = Object.create(null);
                }),
                n
              );
            })(S),
            y = {
              search: function (n, i) {
                for (
                  var r = 0, e = n.length - 1, t = null, a = null;
                  r <= e;

                ) {
                  (t = ((r + e) / 2) | 0), (a = n[t]);
                  var s = i(a);
                  if (s > 0) r = t + 1;
                  else if (s < 0) e = t - 1;
                  else return a;
                }
                return null;
              },
            },
            L = y,
            x = (function () {
              function o() {}
              return (
                (o.isBuffered = function (i, r) {
                  try {
                    if (i) {
                      for (var e = i.buffered, t = 0; t < e.length; t++)
                        if (r >= e.start(t) && r <= e.end(t)) return !0;
                    }
                  } catch {}
                  return !1;
                }),
                (o.bufferInfo = function (i, r, e) {
                  try {
                    if (i) {
                      var t = i.buffered,
                        a = [],
                        s;
                      for (s = 0; s < t.length; s++)
                        a.push({ start: t.start(s), end: t.end(s) });
                      return this.bufferedInfo(a, r, e);
                    }
                  } catch {}
                  return { len: 0, start: r, end: r, nextStart: void 0 };
                }),
                (o.bufferedInfo = function (i, r, e) {
                  i.sort(function (q, ne) {
                    var re = q.start - ne.start;
                    return re || ne.end - q.end;
                  });
                  var t = [];
                  if (e)
                    for (var a = 0; a < i.length; a++) {
                      var s = t.length;
                      if (s) {
                        var l = t[s - 1].end;
                        i[a].start - l < e
                          ? i[a].end > l && (t[s - 1].end = i[a].end)
                          : t.push(i[a]);
                      } else t.push(i[a]);
                    }
                  else t = i;
                  for (var u = 0, d, v = r, p = r, R = 0; R < t.length; R++) {
                    var O = t[R].start,
                      j = t[R].end;
                    if (r + e >= O && r < j) (v = O), (p = j), (u = p - r);
                    else if (r + e < O) {
                      d = O;
                      break;
                    }
                  }
                  return { len: u, start: v, end: p, nextStart: d };
                }),
                o
              );
            })(),
            f = K("./node_modules/eventemitter3/index.js"),
            g = K("./node_modules/webworkify-webpack/index.js"),
            m = K("./src/demux/demuxer-inline.js");
          function E() {
            return window.MediaSource || window.WebKitMediaSource;
          }
          var A = K("./src/utils/get-self-scope.js");
          function b(o, n) {
            (o.prototype = Object.create(n.prototype)),
              (o.prototype.constructor = o),
              (o.__proto__ = n);
          }
          var C = (function (o) {
              b(n, o);
              function n() {
                return o.apply(this, arguments) || this;
              }
              var i = n.prototype;
              return (
                (i.trigger = function (e) {
                  for (
                    var t = arguments.length,
                      a = new Array(t > 1 ? t - 1 : 0),
                      s = 1;
                    s < t;
                    s++
                  )
                    a[s - 1] = arguments[s];
                  this.emit.apply(this, [e, e].concat(a));
                }),
                n
              );
            })(f.EventEmitter),
            U = Object(A.getSelfScope)(),
            G = E() || {
              isTypeSupported: function () {
                return !1;
              },
            },
            M = (function () {
              function o(i, r) {
                var e = this;
                (this.hls = i), (this.id = r);
                var t = (this.observer = new C()),
                  a = i.config,
                  s = function (p, R) {
                    (R = R || {}),
                      (R.frag = e.frag),
                      (R.id = e.id),
                      i.trigger(p, R);
                  };
                t.on(h.default.FRAG_DECRYPTED, s),
                  t.on(h.default.FRAG_PARSING_INIT_SEGMENT, s),
                  t.on(h.default.FRAG_PARSING_DATA, s),
                  t.on(h.default.FRAG_PARSED, s),
                  t.on(h.default.ERROR, s),
                  t.on(h.default.FRAG_PARSING_METADATA, s),
                  t.on(h.default.FRAG_PARSING_USERDATA, s),
                  t.on(h.default.INIT_PTS_FOUND, s);
                var l = {
                    mp4: G.isTypeSupported("video/mp4"),
                    mpeg: G.isTypeSupported("audio/mpeg"),
                    mp3: G.isTypeSupported('audio/mp4; codecs="mp3"'),
                  },
                  u = navigator.vendor;
                if (a.enableWorker && typeof Worker < "u") {
                  c.logger.log("demuxing in webworker");
                  var d;
                  try {
                    (d = this.w = g("./src/demux/demuxer-worker.js")),
                      (this.onwmsg = this.onWorkerMessage.bind(this)),
                      d.addEventListener("message", this.onwmsg),
                      (d.onerror = function (v) {
                        i.trigger(h.default.ERROR, {
                          type: D.ErrorTypes.OTHER_ERROR,
                          details: D.ErrorDetails.INTERNAL_EXCEPTION,
                          fatal: !0,
                          event: "demuxerWorker",
                          err: {
                            message:
                              v.message +
                              " (" +
                              v.filename +
                              ":" +
                              v.lineno +
                              ")",
                          },
                        });
                      }),
                      d.postMessage({
                        cmd: "init",
                        typeSupported: l,
                        vendor: u,
                        id: r,
                        config: JSON.stringify(a),
                      });
                  } catch (v) {
                    c.logger.warn("Error in worker:", v),
                      c.logger.error(
                        "Error while initializing DemuxerWorker, fallback on DemuxerInline"
                      ),
                      d && U.URL.revokeObjectURL(d.objectURL),
                      (this.demuxer = new m.default(t, l, a, u)),
                      (this.w = void 0);
                  }
                } else this.demuxer = new m.default(t, l, a, u);
              }
              var n = o.prototype;
              return (
                (n.destroy = function () {
                  var r = this.w;
                  if (r)
                    r.removeEventListener("message", this.onwmsg),
                      r.terminate(),
                      (this.w = null);
                  else {
                    var e = this.demuxer;
                    e && (e.destroy(), (this.demuxer = null));
                  }
                  var t = this.observer;
                  t && (t.removeAllListeners(), (this.observer = null));
                }),
                (n.push = function (r, e, t, a, s, l, u, d) {
                  var v = this.w,
                    p = Object(ee.isFiniteNumber)(s.startPTS)
                      ? s.startPTS
                      : s.start,
                    R = s.decryptdata,
                    O = this.frag,
                    j = !(O && s.cc === O.cc),
                    q = !(O && s.level === O.level),
                    ne = O && s.sn === O.sn + 1,
                    re = !q && ne;
                  if (
                    (j && c.logger.log(this.id + ":discontinuity detected"),
                    q && c.logger.log(this.id + ":switch detected"),
                    (this.frag = s),
                    v)
                  )
                    v.postMessage(
                      {
                        cmd: "demux",
                        data: r,
                        decryptdata: R,
                        initSegment: e,
                        audioCodec: t,
                        videoCodec: a,
                        timeOffset: p,
                        discontinuity: j,
                        trackSwitch: q,
                        contiguous: re,
                        duration: l,
                        accurateTimeOffset: u,
                        defaultInitPTS: d,
                      },
                      r instanceof ArrayBuffer ? [r] : []
                    );
                  else {
                    var ue = this.demuxer;
                    ue && ue.push(r, R, e, t, a, p, j, q, re, l, u, d);
                  }
                }),
                (n.onWorkerMessage = function (r) {
                  var e = r.data,
                    t = this.hls;
                  switch (e.event) {
                    case "init":
                      U.URL.revokeObjectURL(this.w.objectURL);
                      break;
                    case h.default.FRAG_PARSING_DATA:
                      (e.data.data1 = new Uint8Array(e.data1)),
                        e.data2 && (e.data.data2 = new Uint8Array(e.data2));
                    default:
                      (e.data = e.data || {}),
                        (e.data.frag = this.frag),
                        (e.data.id = this.id),
                        t.trigger(e.event, e.data);
                      break;
                  }
                }),
                o
              );
            })(),
            X = M;
          function H(o, n, i) {
            switch (n) {
              case "audio":
                o.audioGroupIds || (o.audioGroupIds = []),
                  o.audioGroupIds.push(i);
                break;
              case "text":
                o.textGroupIds || (o.textGroupIds = []), o.textGroupIds.push(i);
                break;
            }
          }
          function $(o, n, i) {
            var r = o[n],
              e = o[i],
              t = e.startPTS;
            if (Object(ee.isFiniteNumber)(t))
              i > n
                ? ((r.duration = t - r.start),
                  r.duration < 0 &&
                    c.logger.warn(
                      "negative duration computed for frag " +
                        r.sn +
                        ",level " +
                        r.level +
                        ", there should be some duration drift between playlist and fragment!"
                    ))
                : ((e.duration = r.start - t),
                  e.duration < 0 &&
                    c.logger.warn(
                      "negative duration computed for frag " +
                        e.sn +
                        ",level " +
                        e.level +
                        ", there should be some duration drift between playlist and fragment!"
                    ));
            else if (i > n) {
              var a = r.cc === e.cc;
              e.start =
                r.start +
                (a && r.minEndPTS ? r.minEndPTS - r.start : r.duration);
            } else e.start = Math.max(r.start - e.duration, 0);
          }
          function V(o, n, i, r, e, t) {
            var a = i,
              s = r;
            if (Object(ee.isFiniteNumber)(n.startPTS)) {
              var l = Math.abs(n.startPTS - i);
              Object(ee.isFiniteNumber)(n.deltaPTS)
                ? (n.deltaPTS = Math.max(l, n.deltaPTS))
                : (n.deltaPTS = l),
                (a = Math.max(i, n.startPTS)),
                (i = Math.min(i, n.startPTS)),
                (s = Math.min(r, n.endPTS)),
                (r = Math.max(r, n.endPTS)),
                (e = Math.min(e, n.startDTS)),
                (t = Math.max(t, n.endDTS));
            }
            var u = i - n.start;
            (n.start = n.startPTS = i),
              (n.maxStartPTS = a),
              (n.endPTS = r),
              (n.minEndPTS = s),
              (n.startDTS = e),
              (n.endDTS = t),
              (n.duration = r - i);
            var d = n.sn;
            if (!o || d < o.startSN || d > o.endSN) return 0;
            var v, p, R;
            for (
              v = d - o.startSN, p = o.fragments, p[v] = n, R = v;
              R > 0;
              R--
            )
              $(p, R, R - 1);
            for (R = v; R < p.length - 1; R++) $(p, R, R + 1);
            return (o.PTSKnown = !0), u;
          }
          function se(o, n) {
            n.initSegment && o.initSegment && (n.initSegment = o.initSegment);
            var i = 0,
              r;
            if (
              (he(o, n, function (a, s) {
                (i = a.cc - s.cc),
                  Object(ee.isFiniteNumber)(a.startPTS) &&
                    ((s.start = s.startPTS = a.startPTS),
                    (s.endPTS = a.endPTS),
                    (s.duration = a.duration),
                    (s.backtracked = a.backtracked),
                    (s.dropped = a.dropped),
                    (r = s)),
                  (n.PTSKnown = !0);
              }),
              !!n.PTSKnown)
            ) {
              if (i) {
                c.logger.log(
                  "discontinuity sliding from playlist, take drift into account"
                );
                for (var e = n.fragments, t = 0; t < e.length; t++)
                  e[t].cc += i;
              }
              r
                ? V(n, r, r.startPTS, r.endPTS, r.startDTS, r.endDTS)
                : Se(o, n),
                (n.PTSKnown = o.PTSKnown);
            }
          }
          function ae(o, n, i) {
            i === void 0 && (i = 0);
            var r = -1;
            he(o, n, function (a, s, l) {
              (s.start = a.start), (r = l);
            });
            var e = n.fragments;
            if (r < 0) {
              e.forEach(function (a) {
                a.start += i;
              });
              return;
            }
            for (var t = r + 1; t < e.length; t++)
              e[t].start = e[t - 1].start + e[t - 1].duration;
          }
          function he(o, n, i) {
            if (!(!o || !n))
              for (
                var r = Math.max(o.startSN, n.startSN) - n.startSN,
                  e = Math.min(o.endSN, n.endSN) - n.startSN,
                  t = n.startSN - o.startSN,
                  a = r;
                a <= e;
                a++
              ) {
                var s = o.fragments[t + a],
                  l = n.fragments[a];
                if (!s || !l) break;
                i(s, l, a);
              }
          }
          function Se(o, n) {
            var i = n.startSN - o.startSN,
              r = o.fragments,
              e = n.fragments;
            if (!(i < 0 || i > r.length))
              for (var t = 0; t < e.length; t++) e[t].start += r[i].start;
          }
          function ce(o, n, i) {
            var r =
                1e3 *
                (n.averagetargetduration
                  ? n.averagetargetduration
                  : n.targetduration),
              e = r / 2;
            return (
              o && n.endSN === o.endSN && (r = e),
              i && (r = Math.max(e, r - (window.performance.now() - i))),
              Math.round(r)
            );
          }
          var Fe = {
              toString: function (n) {
                for (var i = "", r = n.length, e = 0; e < r; e++)
                  i +=
                    "[" +
                    n.start(e).toFixed(3) +
                    "," +
                    n.end(e).toFixed(3) +
                    "]";
                return i;
              },
            },
            Ee = Fe;
          function pe(o, n) {
            for (var i = null, r = 0; r < o.length; r += 1) {
              var e = o[r];
              if (e && e.cc === n) {
                i = e;
                break;
              }
            }
            return i;
          }
          function Re(o, n) {
            return L.search(o, function (i) {
              return i.cc < n ? 1 : i.cc > n ? -1 : 0;
            });
          }
          function De(o, n, i) {
            var r = !1;
            return (
              n &&
                n.details &&
                i &&
                (i.endCC > i.startCC || (o && o.cc < i.startCC)) &&
                (r = !0),
              r
            );
          }
          function qe(o, n) {
            var i = o.fragments,
              r = n.fragments;
            if (!r.length || !i.length) {
              c.logger.log("No fragments to align");
              return;
            }
            var e = pe(i, r[0].cc);
            if (!e || (e && !e.startPTS)) {
              c.logger.log("No frag in previous level to align on");
              return;
            }
            return e;
          }
          function He(o, n) {
            n.fragments.forEach(function (i) {
              if (i) {
                var r = i.start + o;
                (i.start = i.startPTS = r), (i.endPTS = r + i.duration);
              }
            }),
              (n.PTSKnown = !0);
          }
          function Oe(o, n, i) {
            et(o, i, n), !i.PTSKnown && n && We(i, n.details);
          }
          function et(o, n, i) {
            if (De(o, i, n)) {
              var r = qe(i.details, n);
              r &&
                (c.logger.log(
                  "Adjusting PTS using last level due to CC increase within current level"
                ),
                He(r.start, n));
            }
          }
          function We(o, n) {
            if (n && n.fragments.length) {
              if (!o.hasProgramDateTime || !n.hasProgramDateTime) return;
              var i = n.fragments[0].programDateTime,
                r = o.fragments[0].programDateTime,
                e = (r - i) / 1e3 + n.fragments[0].start;
              Object(ee.isFiniteNumber)(e) &&
                (c.logger.log(
                  "adjusting PTS using programDateTime delta, sliding:" +
                    e.toFixed(3)
                ),
                He(e, o));
            }
          }
          function at(o, n, i) {
            if (
              n === null ||
              !Array.isArray(o) ||
              !o.length ||
              !Object(ee.isFiniteNumber)(n)
            )
              return null;
            var r = o[0].programDateTime;
            if (n < (r || 0)) return null;
            var e = o[o.length - 1].endProgramDateTime;
            if (n >= (e || 0)) return null;
            i = i || 0;
            for (var t = 0; t < o.length; ++t) {
              var a = o[t];
              if (ct(n, i, a)) return a;
            }
            return null;
          }
          function Ke(o, n, i, r) {
            i === void 0 && (i = 0), r === void 0 && (r = 0);
            var e = null;
            if (
              (o
                ? (e = n[o.sn - n[0].sn + 1])
                : i === 0 && n[0].start === 0 && (e = n[0]),
              e && Ce(i, r, e) === 0)
            )
              return e;
            var t = L.search(n, Ce.bind(null, i, r));
            return t || e;
          }
          function Ce(o, n, i) {
            o === void 0 && (o = 0), n === void 0 && (n = 0);
            var r = Math.min(n, i.duration + (i.deltaPTS ? i.deltaPTS : 0));
            return i.start + i.duration - r <= o
              ? 1
              : i.start - r > o && i.start
              ? -1
              : 0;
          }
          function ct(o, n, i) {
            var r =
                Math.min(n, i.duration + (i.deltaPTS ? i.deltaPTS : 0)) * 1e3,
              e = i.endProgramDateTime || 0;
            return e - r > o;
          }
          var gt = 250,
            lt = 2,
            Ze = 0.1,
            ht = 0.05,
            vt = (function () {
              function o(i, r, e, t) {
                (this.config = i),
                  (this.media = r),
                  (this.fragmentTracker = e),
                  (this.hls = t),
                  (this.nudgeRetry = 0),
                  (this.stallReported = !1),
                  (this.stalled = null),
                  (this.moved = !1),
                  (this.seeking = !1);
              }
              var n = o.prototype;
              return (
                (n.poll = function (r) {
                  var e = this.config,
                    t = this.media,
                    a = this.stalled,
                    s = t.currentTime,
                    l = t.seeking,
                    u = this.seeking && !l,
                    d = !this.seeking && l;
                  if (((this.seeking = l), s !== r)) {
                    if (((this.moved = !0), a !== null)) {
                      if (this.stallReported) {
                        var v = self.performance.now() - a;
                        c.logger.warn(
                          "playback not stuck anymore @" +
                            s +
                            ", after " +
                            Math.round(v) +
                            "ms"
                        ),
                          (this.stallReported = !1);
                      }
                      (this.stalled = null), (this.nudgeRetry = 0);
                    }
                    return;
                  }
                  if (
                    ((d || u) && (this.stalled = null),
                    !(
                      t.paused ||
                      t.ended ||
                      t.playbackRate === 0 ||
                      !t.buffered.length
                    ))
                  ) {
                    var p = x.bufferInfo(t, s, 0),
                      R = p.len > 0,
                      O = p.nextStart || 0;
                    if (!(!R && !O)) {
                      if (l) {
                        var j = p.len > lt,
                          q =
                            !O ||
                            (O - s > lt &&
                              !this.fragmentTracker.getPartialFragment(s));
                        if (j || q) return;
                        this.moved = !1;
                      }
                      if (!this.moved && this.stalled) {
                        var ne = Math.max(O, p.start || 0) - s;
                        if (ne > 0 && ne <= lt) {
                          this._trySkipBufferHole(null);
                          return;
                        }
                      }
                      var re = self.performance.now();
                      if (a === null) {
                        this.stalled = re;
                        return;
                      }
                      var ue = re - a;
                      !l && ue >= gt && this._reportStall(p.len);
                      var de = x.bufferInfo(t, s, e.maxBufferHole);
                      this._tryFixBufferStall(de, ue);
                    }
                  }
                }),
                (n._tryFixBufferStall = function (r, e) {
                  var t = this.config,
                    a = this.fragmentTracker,
                    s = this.media,
                    l = s.currentTime,
                    u = a.getPartialFragment(l);
                  if (u) {
                    var d = this._trySkipBufferHole(u);
                    if (d) return;
                  }
                  r.len > t.maxBufferHole &&
                    e > t.highBufferWatchdogPeriod * 1e3 &&
                    (c.logger.warn("Trying to nudge playhead over buffer-hole"),
                    (this.stalled = null),
                    this._tryNudgeBuffer());
                }),
                (n._reportStall = function (r) {
                  var e = this.hls,
                    t = this.media,
                    a = this.stallReported;
                  a ||
                    ((this.stallReported = !0),
                    c.logger.warn(
                      "Playback stalling at @" +
                        t.currentTime +
                        " due to low buffer (buffer=" +
                        r +
                        ")"
                    ),
                    e.trigger(h.default.ERROR, {
                      type: D.ErrorTypes.MEDIA_ERROR,
                      details: D.ErrorDetails.BUFFER_STALLED_ERROR,
                      fatal: !1,
                      buffer: r,
                    }));
                }),
                (n._trySkipBufferHole = function (r) {
                  for (
                    var e = this.config,
                      t = this.hls,
                      a = this.media,
                      s = a.currentTime,
                      l = 0,
                      u = 0;
                    u < a.buffered.length;
                    u++
                  ) {
                    var d = a.buffered.start(u);
                    if (s + e.maxBufferHole >= l && s < d) {
                      var v = Math.max(d + ht, a.currentTime + Ze);
                      return (
                        c.logger.warn(
                          "skipping hole, adjusting currentTime from " +
                            s +
                            " to " +
                            v
                        ),
                        (this.moved = !0),
                        (this.stalled = null),
                        (a.currentTime = v),
                        r &&
                          t.trigger(h.default.ERROR, {
                            type: D.ErrorTypes.MEDIA_ERROR,
                            details: D.ErrorDetails.BUFFER_SEEK_OVER_HOLE,
                            fatal: !1,
                            reason:
                              "fragment loaded with buffer holes, seeking from " +
                              s +
                              " to " +
                              v,
                            frag: r,
                          }),
                        v
                      );
                    }
                    l = a.buffered.end(u);
                  }
                  return 0;
                }),
                (n._tryNudgeBuffer = function () {
                  var r = this.config,
                    e = this.hls,
                    t = this.media,
                    a = t.currentTime,
                    s = (this.nudgeRetry || 0) + 1;
                  if (((this.nudgeRetry = s), s < r.nudgeMaxRetry)) {
                    var l = a + s * r.nudgeOffset;
                    c.logger.warn(
                      "Nudging 'currentTime' from " + a + " to " + l
                    ),
                      (t.currentTime = l),
                      e.trigger(h.default.ERROR, {
                        type: D.ErrorTypes.MEDIA_ERROR,
                        details: D.ErrorDetails.BUFFER_NUDGE_ON_STALL,
                        fatal: !1,
                      });
                  } else
                    c.logger.error(
                      "Playhead still not moving while enough data buffered @" +
                        a +
                        " after " +
                        r.nudgeMaxRetry +
                        " nudges"
                    ),
                      e.trigger(h.default.ERROR, {
                        type: D.ErrorTypes.MEDIA_ERROR,
                        details: D.ErrorDetails.BUFFER_STALLED_ERROR,
                        fatal: !0,
                      });
                }),
                o
              );
            })();
          function yt(o) {
            if (o === void 0)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return o;
          }
          function It(o, n) {
            (o.prototype = Object.create(n.prototype)),
              (o.prototype.constructor = o),
              (o.__proto__ = n);
          }
          var Et = (function (o) {
            It(n, o);
            function n(r) {
              for (
                var e,
                  t = arguments.length,
                  a = new Array(t > 1 ? t - 1 : 0),
                  s = 1;
                s < t;
                s++
              )
                a[s - 1] = arguments[s];
              return (
                (e = o.call.apply(o, [this, r].concat(a)) || this),
                (e._boundTick = void 0),
                (e._tickTimer = null),
                (e._tickInterval = null),
                (e._tickCallCount = 0),
                (e._boundTick = e.tick.bind(yt(e))),
                e
              );
            }
            var i = n.prototype;
            return (
              (i.onHandlerDestroying = function () {
                this.clearNextTick(), this.clearInterval();
              }),
              (i.hasInterval = function () {
                return !!this._tickInterval;
              }),
              (i.hasNextTick = function () {
                return !!this._tickTimer;
              }),
              (i.setInterval = function (e) {
                return this._tickInterval
                  ? !1
                  : ((this._tickInterval = self.setInterval(
                      this._boundTick,
                      e
                    )),
                    !0);
              }),
              (i.clearInterval = function () {
                return this._tickInterval
                  ? (self.clearInterval(this._tickInterval),
                    (this._tickInterval = null),
                    !0)
                  : !1;
              }),
              (i.clearNextTick = function () {
                return this._tickTimer
                  ? (self.clearTimeout(this._tickTimer),
                    (this._tickTimer = null),
                    !0)
                  : !1;
              }),
              (i.tick = function () {
                this._tickCallCount++,
                  this._tickCallCount === 1 &&
                    (this.doTick(),
                    this._tickCallCount > 1 &&
                      (this.clearNextTick(),
                      (this._tickTimer = self.setTimeout(this._boundTick, 0))),
                    (this._tickCallCount = 0));
              }),
              (i.doTick = function () {}),
              n
            );
          })(S);
          function wt(o, n) {
            (o.prototype = Object.create(n.prototype)),
              (o.prototype.constructor = o),
              (o.__proto__ = n);
          }
          var P = {
              STOPPED: "STOPPED",
              STARTING: "STARTING",
              IDLE: "IDLE",
              PAUSED: "PAUSED",
              KEY_LOADING: "KEY_LOADING",
              FRAG_LOADING: "FRAG_LOADING",
              FRAG_LOADING_WAITING_RETRY: "FRAG_LOADING_WAITING_RETRY",
              WAITING_TRACK: "WAITING_TRACK",
              PARSING: "PARSING",
              PARSED: "PARSED",
              BUFFER_FLUSHING: "BUFFER_FLUSHING",
              ENDED: "ENDED",
              ERROR: "ERROR",
              WAITING_INIT_PTS: "WAITING_INIT_PTS",
              WAITING_LEVEL: "WAITING_LEVEL",
            },
            nt = (function (o) {
              wt(n, o);
              function n() {
                return o.apply(this, arguments) || this;
              }
              var i = n.prototype;
              return (
                (i.doTick = function () {}),
                (i.startLoad = function () {}),
                (i.stopLoad = function () {
                  var e = this.fragCurrent;
                  e &&
                    (e.loader && e.loader.abort(),
                    this.fragmentTracker.removeFragment(e)),
                    this.demuxer &&
                      (this.demuxer.destroy(), (this.demuxer = null)),
                    (this.fragCurrent = null),
                    (this.fragPrevious = null),
                    this.clearInterval(),
                    this.clearNextTick(),
                    (this.state = P.STOPPED);
                }),
                (i._streamEnded = function (e, t) {
                  var a = this.fragCurrent,
                    s = this.fragmentTracker;
                  if (
                    !t.live &&
                    a &&
                    !a.backtracked &&
                    a.sn === t.endSN &&
                    !e.nextStart
                  ) {
                    var l = s.getState(a);
                    return l === Ye.PARTIAL || l === Ye.OK;
                  }
                  return !1;
                }),
                (i.onMediaSeeking = function () {
                  var e = this.config,
                    t = this.media,
                    a = this.mediaBuffer,
                    s = this.state,
                    l = t ? t.currentTime : null,
                    u = x.bufferInfo(a || t, l, this.config.maxBufferHole);
                  if (
                    (c.logger.log(
                      "media seeking to " +
                        (Object(ee.isFiniteNumber)(l) ? l.toFixed(3) : l)
                    ),
                    s === P.FRAG_LOADING)
                  ) {
                    var d = this.fragCurrent;
                    if (u.len === 0 && d) {
                      var v = e.maxFragLookUpTolerance,
                        p = d.start - v,
                        R = d.start + d.duration + v;
                      l < p || l > R
                        ? (d.loader &&
                            (c.logger.log(
                              "seeking outside of buffer while fragment load in progress, cancel fragment load"
                            ),
                            d.loader.abort()),
                          (this.fragCurrent = null),
                          (this.fragPrevious = null),
                          (this.state = P.IDLE))
                        : c.logger.log(
                            "seeking outside of buffer but within currently loaded fragment range"
                          );
                    }
                  } else
                    s === P.ENDED &&
                      (u.len === 0 &&
                        ((this.fragPrevious = null), (this.fragCurrent = null)),
                      (this.state = P.IDLE));
                  t && (this.lastCurrentTime = l),
                    this.loadedmetadata ||
                      (this.nextLoadPosition = this.startPosition = l),
                    this.tick();
                }),
                (i.onMediaEnded = function () {
                  this.startPosition = this.lastCurrentTime = 0;
                }),
                (i.onHandlerDestroying = function () {
                  this.stopLoad(), o.prototype.onHandlerDestroying.call(this);
                }),
                (i.onHandlerDestroyed = function () {
                  (this.state = P.STOPPED), (this.fragmentTracker = null);
                }),
                (i.computeLivePosition = function (e, t) {
                  var a =
                    this.config.liveSyncDuration !== void 0
                      ? this.config.liveSyncDuration
                      : this.config.liveSyncDurationCount * t.targetduration;
                  return e + Math.max(0, t.totalduration - a);
                }),
                n
              );
            })(Et);
          function Ft(o, n) {
            for (var i = 0; i < n.length; i++) {
              var r = n[i];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                "value" in r && (r.writable = !0),
                Object.defineProperty(o, r.key, r);
            }
          }
          function Ot(o, n, i) {
            return n && Ft(o.prototype, n), o;
          }
          function pt(o, n) {
            (o.prototype = Object.create(n.prototype)),
              (o.prototype.constructor = o),
              (o.__proto__ = n);
          }
          var jt = 100,
            or = (function (o) {
              pt(n, o);
              function n(r, e) {
                var t;
                return (
                  (t =
                    o.call(
                      this,
                      r,
                      h.default.MEDIA_ATTACHED,
                      h.default.MEDIA_DETACHING,
                      h.default.MANIFEST_LOADING,
                      h.default.MANIFEST_PARSED,
                      h.default.LEVEL_LOADED,
                      h.default.LEVELS_UPDATED,
                      h.default.KEY_LOADED,
                      h.default.FRAG_LOADED,
                      h.default.FRAG_LOAD_EMERGENCY_ABORTED,
                      h.default.FRAG_PARSING_INIT_SEGMENT,
                      h.default.FRAG_PARSING_DATA,
                      h.default.FRAG_PARSED,
                      h.default.ERROR,
                      h.default.AUDIO_TRACK_SWITCHING,
                      h.default.AUDIO_TRACK_SWITCHED,
                      h.default.BUFFER_CREATED,
                      h.default.BUFFER_APPENDED,
                      h.default.BUFFER_FLUSHED
                    ) || this),
                  (t.fragmentTracker = e),
                  (t.config = r.config),
                  (t.audioCodecSwap = !1),
                  (t._state = P.STOPPED),
                  (t.stallReported = !1),
                  (t.gapController = null),
                  (t.altAudio = !1),
                  (t.audioOnly = !1),
                  (t.bitrateTest = !1),
                  t
                );
              }
              var i = n.prototype;
              return (
                (i.startLoad = function (e) {
                  if (this.levels) {
                    var t = this.lastCurrentTime,
                      a = this.hls;
                    if (
                      (this.stopLoad(),
                      this.setInterval(jt),
                      (this.level = -1),
                      (this.fragLoadError = 0),
                      !this.startFragRequested)
                    ) {
                      var s = a.startLevel;
                      s === -1 &&
                        (a.config.testBandwidth
                          ? ((s = 0), (this.bitrateTest = !0))
                          : (s = a.nextAutoLevel)),
                        (this.level = a.nextLoadLevel = s),
                        (this.loadedmetadata = !1);
                    }
                    t > 0 &&
                      e === -1 &&
                      (c.logger.log(
                        "override startPosition with lastCurrentTime @" +
                          t.toFixed(3)
                      ),
                      (e = t)),
                      (this.state = P.IDLE),
                      (this.nextLoadPosition =
                        this.startPosition =
                        this.lastCurrentTime =
                          e),
                      this.tick();
                  } else (this.forceStartLoad = !0), (this.state = P.STOPPED);
                }),
                (i.stopLoad = function () {
                  (this.forceStartLoad = !1), o.prototype.stopLoad.call(this);
                }),
                (i.doTick = function () {
                  switch (this.state) {
                    case P.BUFFER_FLUSHING:
                      this.fragLoadError = 0;
                      break;
                    case P.IDLE:
                      this._doTickIdle();
                      break;
                    case P.WAITING_LEVEL:
                      var e = this.levels[this.level];
                      e && e.details && (this.state = P.IDLE);
                      break;
                    case P.FRAG_LOADING_WAITING_RETRY:
                      var t = window.performance.now(),
                        a = this.retryDate;
                      (!a || t >= a || (this.media && this.media.seeking)) &&
                        (c.logger.log(
                          "mediaController: retryDate reached, switch back to IDLE state"
                        ),
                        (this.state = P.IDLE));
                      break;
                  }
                  this._checkBuffer(), this._checkFragmentChanged();
                }),
                (i._doTickIdle = function () {
                  var e = this.hls,
                    t = e.config,
                    a = this.media;
                  if (
                    !(
                      this.levelLastLoaded === void 0 ||
                      (!a && (this.startFragRequested || !t.startFragPrefetch))
                    )
                  ) {
                    if (this.altAudio && this.audioOnly) {
                      this.demuxer.frag = null;
                      return;
                    }
                    var s;
                    this.loadedmetadata
                      ? (s = a.currentTime)
                      : (s = this.nextLoadPosition);
                    var l = e.nextLoadLevel,
                      u = this.levels[l];
                    if (u) {
                      var d = u.bitrate,
                        v;
                      d
                        ? (v = Math.max(
                            (8 * t.maxBufferSize) / d,
                            t.maxBufferLength
                          ))
                        : (v = t.maxBufferLength),
                        (v = Math.min(v, t.maxMaxBufferLength));
                      var p =
                          s < t.maxBufferHole
                            ? Math.max(lt, t.maxBufferHole)
                            : t.maxBufferHole,
                        R = x.bufferInfo(
                          this.mediaBuffer ? this.mediaBuffer : a,
                          s,
                          p
                        ),
                        O = R.len;
                      if (!(O >= v)) {
                        c.logger.trace(
                          "buffer length of " +
                            O.toFixed(3) +
                            " is below max of " +
                            v.toFixed(3) +
                            ". checking for more payload ..."
                        ),
                          (this.level = e.nextLoadLevel = l);
                        var j = u.details;
                        if (!j || (j.live && this.levelLastLoaded !== l)) {
                          this.state = P.WAITING_LEVEL;
                          return;
                        }
                        if (this._streamEnded(R, j)) {
                          var q = {};
                          this.altAudio && (q.type = "video"),
                            this.hls.trigger(h.default.BUFFER_EOS, q),
                            (this.state = P.ENDED);
                          return;
                        }
                        this._fetchPayloadOrEos(s, R, j);
                      }
                    }
                  }
                }),
                (i._fetchPayloadOrEos = function (e, t, a) {
                  var s = this.fragPrevious;
                  this.level;
                  var l = a.fragments,
                    u = l.length;
                  if (u !== 0) {
                    var d = l[0].start,
                      v = l[u - 1].start + l[u - 1].duration,
                      p = t.end,
                      R;
                    if (a.initSegment && !a.initSegment.data) R = a.initSegment;
                    else if (a.live) {
                      var O = this.config.initialLiveManifestSize;
                      if (u < O) {
                        c.logger.warn(
                          "Can not start playback of a level, reason: not enough fragments " +
                            u +
                            " < " +
                            O
                        );
                        return;
                      }
                      if (
                        ((R = this._ensureFragmentAtLivePoint(
                          a,
                          p,
                          d,
                          v,
                          s,
                          l
                        )),
                        R === null)
                      )
                        return;
                    } else p < d && (R = l[0]);
                    R || (R = this._findFragment(d, s, u, l, p, v, a)),
                      R &&
                        (R.encrypted
                          ? this._loadKey(R, a)
                          : this._loadFragment(R, a, e, p));
                  }
                }),
                (i._ensureFragmentAtLivePoint = function (e, t, a, s, l, u) {
                  var d = this.hls.config,
                    v = this.media,
                    p,
                    R = 1 / 0;
                  if (
                    (d.liveMaxLatencyDuration !== void 0
                      ? (R = d.liveMaxLatencyDuration)
                      : Object(ee.isFiniteNumber)(
                          d.liveMaxLatencyDurationCount
                        ) &&
                        (R = d.liveMaxLatencyDurationCount * e.targetduration),
                    t < Math.max(a - d.maxFragLookUpTolerance, s - R))
                  ) {
                    var O = (this.liveSyncPosition = this.computeLivePosition(
                      a,
                      e
                    ));
                    (t = O),
                      v &&
                        !v.paused &&
                        v.readyState &&
                        v.duration > O &&
                        O > v.currentTime &&
                        (c.logger.log(
                          "buffer end: " +
                            t.toFixed(3) +
                            " is located too far from the end of live sliding playlist, reset currentTime to : " +
                            O.toFixed(3)
                        ),
                        (v.currentTime = O)),
                      (this.nextLoadPosition = O);
                  }
                  if (e.PTSKnown && t > s && v && v.readyState) return null;
                  if (this.startFragRequested && !e.PTSKnown && l)
                    if (e.hasProgramDateTime)
                      c.logger.log(
                        "live playlist, switching playlist, load frag with same PDT: " +
                          l.programDateTime
                      ),
                        (p = at(
                          u,
                          l.endProgramDateTime,
                          d.maxFragLookUpTolerance
                        ));
                    else {
                      var j = l.sn + 1;
                      if (j >= e.startSN && j <= e.endSN) {
                        var q = u[j - e.startSN];
                        l.cc === q.cc &&
                          ((p = q),
                          c.logger.log(
                            "live playlist, switching playlist, load frag with next SN: " +
                              p.sn
                          ));
                      }
                      p ||
                        ((p = L.search(u, function (ne) {
                          return l.cc - ne.cc;
                        })),
                        p &&
                          c.logger.log(
                            "live playlist, switching playlist, load frag with same CC: " +
                              p.sn
                          ));
                    }
                  return p;
                }),
                (i._findFragment = function (e, t, a, s, l, u, d) {
                  var v = this.hls.config,
                    p;
                  if (l < u) {
                    var R =
                      l > u - v.maxFragLookUpTolerance
                        ? 0
                        : v.maxFragLookUpTolerance;
                    p = Ke(t, s, l, R);
                  } else p = s[a - 1];
                  if (p) {
                    var O = p.sn - d.startSN,
                      j = t && p.level === t.level,
                      q = s[O - 1],
                      ne = s[O + 1];
                    if (t && p.sn === t.sn)
                      if (j && !p.backtracked)
                        if (p.sn < d.endSN) {
                          var re = t.deltaPTS;
                          re && re > v.maxBufferHole && t.dropped && O
                            ? ((p = q),
                              c.logger.warn(
                                "Previous fragment was dropped with large PTS gap between audio and video. Maybe fragment is not starting with a keyframe? Loading previous one to try to overcome this"
                              ))
                            : ((p = ne),
                              this.fragmentTracker.getState(p) !== Ye.OK &&
                                c.logger.log(
                                  "Re-loading fragment with SN: " + p.sn
                                ));
                        } else p = null;
                      else
                        p.backtracked &&
                          (ne && ne.backtracked
                            ? (c.logger.warn(
                                "Already backtracked from fragment " +
                                  ne.sn +
                                  ", will not backtrack to fragment " +
                                  p.sn +
                                  ". Loading fragment " +
                                  ne.sn
                              ),
                              (p = ne))
                            : (c.logger.warn(
                                "Loaded fragment with dropped frames, backtracking 1 segment to find a keyframe"
                              ),
                              (p.dropped = 0),
                              q
                                ? ((p = q), (p.backtracked = !0))
                                : O && (p = null)));
                  }
                  return p;
                }),
                (i._loadKey = function (e, t) {
                  c.logger.log(
                    "Loading key for " +
                      e.sn +
                      " of [" +
                      t.startSN +
                      "-" +
                      t.endSN +
                      "], level " +
                      this.level
                  ),
                    (this.state = P.KEY_LOADING),
                    this.hls.trigger(h.default.KEY_LOADING, { frag: e });
                }),
                (i._loadFragment = function (e, t, a, s) {
                  var l = this.fragmentTracker.getState(e);
                  (this.fragCurrent = e),
                    e.sn !== "initSegment" && (this.startFragRequested = !0),
                    Object(ee.isFiniteNumber)(e.sn) &&
                      !e.bitrateTest &&
                      (this.nextLoadPosition = e.start + e.duration),
                    e.backtracked || l === Ye.NOT_LOADED || l === Ye.PARTIAL
                      ? ((e.autoLevel = this.hls.autoLevelEnabled),
                        (e.bitrateTest = this.bitrateTest),
                        c.logger.log(
                          "Loading " +
                            e.sn +
                            " of [" +
                            t.startSN +
                            "-" +
                            t.endSN +
                            "], level " +
                            this.level +
                            ", " +
                            (this.loadedmetadata
                              ? "currentTime"
                              : "nextLoadPosition") +
                            ": " +
                            parseFloat(a.toFixed(3)) +
                            ", bufferEnd: " +
                            parseFloat(s.toFixed(3))
                        ),
                        this.hls.trigger(h.default.FRAG_LOADING, { frag: e }),
                        this.demuxer ||
                          (this.demuxer = new X(this.hls, "main")),
                        (this.state = P.FRAG_LOADING))
                      : l === Ye.APPENDING &&
                        this._reduceMaxBufferLength(e.duration) &&
                        this.fragmentTracker.removeFragment(e);
                }),
                (i.getBufferedFrag = function (e) {
                  return this.fragmentTracker.getBufferedFrag(e, _.MAIN);
                }),
                (i.followingBufferedFrag = function (e) {
                  return e ? this.getBufferedFrag(e.endPTS + 0.5) : null;
                }),
                (i._checkFragmentChanged = function () {
                  var e,
                    t,
                    a = this.media;
                  if (
                    a &&
                    a.readyState &&
                    a.seeking === !1 &&
                    ((t = a.currentTime),
                    t > this.lastCurrentTime && (this.lastCurrentTime = t),
                    x.isBuffered(a, t)
                      ? (e = this.getBufferedFrag(t))
                      : x.isBuffered(a, t + 0.1) &&
                        (e = this.getBufferedFrag(t + 0.1)),
                    e)
                  ) {
                    var s = e;
                    if (s !== this.fragPlaying) {
                      this.hls.trigger(h.default.FRAG_CHANGED, { frag: s });
                      var l = s.level;
                      (!this.fragPlaying || this.fragPlaying.level !== l) &&
                        this.hls.trigger(h.default.LEVEL_SWITCHED, {
                          level: l,
                        }),
                        (this.fragPlaying = s);
                    }
                  }
                }),
                (i.immediateLevelSwitch = function () {
                  if (
                    (c.logger.log("immediateLevelSwitch"),
                    !this.immediateSwitch)
                  ) {
                    this.immediateSwitch = !0;
                    var e = this.media,
                      t;
                    e ? ((t = e.paused), t || e.pause()) : (t = !0),
                      (this.previouslyPaused = t);
                  }
                  var a = this.fragCurrent;
                  a && a.loader && a.loader.abort(),
                    (this.fragCurrent = null),
                    this.flushMainBuffer(0, Number.POSITIVE_INFINITY);
                }),
                (i.immediateLevelSwitchEnd = function () {
                  var e = this.media;
                  e &&
                    e.buffered.length &&
                    ((this.immediateSwitch = !1),
                    e.currentTime > 0 &&
                      x.isBuffered(e, e.currentTime) &&
                      (e.currentTime -= 1e-4),
                    this.previouslyPaused || e.play());
                }),
                (i.nextLevelSwitch = function () {
                  var e = this.media;
                  if (e && e.readyState) {
                    var t,
                      a = this.getBufferedFrag(e.currentTime);
                    if (
                      (a &&
                        a.startPTS > 1 &&
                        this.flushMainBuffer(0, a.startPTS - 1),
                      e.paused)
                    )
                      t = 0;
                    else {
                      var s = this.hls.nextLoadLevel,
                        l = this.levels[s],
                        u = this.fragLastKbps;
                      u && this.fragCurrent
                        ? (t =
                            (this.fragCurrent.duration * l.bitrate) /
                              (1e3 * u) +
                            1)
                        : (t = 0);
                    }
                    var d = this.getBufferedFrag(e.currentTime + t);
                    if (d) {
                      var v = this.followingBufferedFrag(d);
                      if (v) {
                        var p = this.fragCurrent;
                        p && p.loader && p.loader.abort(),
                          (this.fragCurrent = null);
                        var R = Math.max(
                          d.endPTS,
                          v.maxStartPTS +
                            Math.min(
                              this.config.maxFragLookUpTolerance,
                              v.duration
                            )
                        );
                        this.flushMainBuffer(R, Number.POSITIVE_INFINITY);
                      }
                    }
                  }
                }),
                (i.flushMainBuffer = function (e, t) {
                  this.state = P.BUFFER_FLUSHING;
                  var a = { startOffset: e, endOffset: t };
                  this.altAudio && (a.type = "video"),
                    this.hls.trigger(h.default.BUFFER_FLUSHING, a);
                }),
                (i.onMediaAttached = function (e) {
                  var t = (this.media = this.mediaBuffer = e.media);
                  (this.onvseeking = this.onMediaSeeking.bind(this)),
                    (this.onvseeked = this.onMediaSeeked.bind(this)),
                    (this.onvended = this.onMediaEnded.bind(this)),
                    t.addEventListener("seeking", this.onvseeking),
                    t.addEventListener("seeked", this.onvseeked),
                    t.addEventListener("ended", this.onvended);
                  var a = this.config;
                  this.levels &&
                    a.autoStartLoad &&
                    this.hls.startLoad(a.startPosition),
                    (this.gapController = new vt(
                      a,
                      t,
                      this.fragmentTracker,
                      this.hls
                    ));
                }),
                (i.onMediaDetaching = function () {
                  var e = this.media;
                  e &&
                    e.ended &&
                    (c.logger.log(
                      "MSE detaching and video ended, reset startPosition"
                    ),
                    (this.startPosition = this.lastCurrentTime = 0));
                  var t = this.levels;
                  t &&
                    t.forEach(function (a) {
                      a.details &&
                        a.details.fragments.forEach(function (s) {
                          s.backtracked = void 0;
                        });
                    }),
                    e &&
                      (e.removeEventListener("seeking", this.onvseeking),
                      e.removeEventListener("seeked", this.onvseeked),
                      e.removeEventListener("ended", this.onvended),
                      (this.onvseeking =
                        this.onvseeked =
                        this.onvended =
                          null)),
                    this.fragmentTracker.removeAllFragments(),
                    (this.media = this.mediaBuffer = null),
                    (this.loadedmetadata = !1),
                    this.stopLoad();
                }),
                (i.onMediaSeeked = function () {
                  var e = this.media,
                    t = e ? e.currentTime : void 0;
                  Object(ee.isFiniteNumber)(t) &&
                    c.logger.log("media seeked to " + t.toFixed(3)),
                    this.tick();
                }),
                (i.onManifestLoading = function () {
                  c.logger.log("trigger BUFFER_RESET"),
                    this.hls.trigger(h.default.BUFFER_RESET),
                    this.fragmentTracker.removeAllFragments(),
                    (this.stalled = !1),
                    (this.startPosition = this.lastCurrentTime = 0);
                }),
                (i.onManifestParsed = function (e) {
                  var t = !1,
                    a = !1,
                    s;
                  e.levels.forEach(function (u) {
                    (s = u.audioCodec),
                      s &&
                        (s.indexOf("mp4a.40.2") !== -1 && (t = !0),
                        s.indexOf("mp4a.40.5") !== -1 && (a = !0));
                  }),
                    (this.audioCodecSwitch = t && a),
                    this.audioCodecSwitch &&
                      c.logger.log(
                        "both AAC/HE-AAC audio found in levels; declaring level codec as HE-AAC"
                      ),
                    (this.altAudio = e.altAudio),
                    (this.levels = e.levels),
                    (this.startFragRequested = !1);
                  var l = this.config;
                  (l.autoStartLoad || this.forceStartLoad) &&
                    this.hls.startLoad(l.startPosition);
                }),
                (i.onLevelLoaded = function (e) {
                  var t = e.details,
                    a = e.level,
                    s = this.levels[this.levelLastLoaded],
                    l = this.levels[a],
                    u = t.totalduration,
                    d = 0;
                  if (
                    (c.logger.log(
                      "level " +
                        a +
                        " loaded [" +
                        t.startSN +
                        "," +
                        t.endSN +
                        "],duration:" +
                        u
                    ),
                    t.live || (l.details && l.details.live))
                  ) {
                    var v = l.details;
                    v && t.fragments.length > 0
                      ? (se(v, t),
                        (d = t.fragments[0].start),
                        (this.liveSyncPosition = this.computeLivePosition(
                          d,
                          v
                        )),
                        t.PTSKnown && Object(ee.isFiniteNumber)(d)
                          ? c.logger.log(
                              "live playlist sliding:" + d.toFixed(3)
                            )
                          : (c.logger.log(
                              "live playlist - outdated PTS, unknown sliding"
                            ),
                            Oe(this.fragPrevious, s, t)))
                      : (c.logger.log(
                          "live playlist - first load, unknown sliding"
                        ),
                        (t.PTSKnown = !1),
                        Oe(this.fragPrevious, s, t));
                  } else t.PTSKnown = !1;
                  if (
                    ((l.details = t),
                    (this.levelLastLoaded = a),
                    this.hls.trigger(h.default.LEVEL_UPDATED, {
                      details: t,
                      level: a,
                    }),
                    this.startFragRequested === !1)
                  ) {
                    if (
                      this.startPosition === -1 ||
                      this.lastCurrentTime === -1
                    ) {
                      var p = t.startTimeOffset;
                      Object(ee.isFiniteNumber)(p)
                        ? (p < 0 &&
                            (c.logger.log(
                              "negative start time offset " +
                                p +
                                ", count from end of last fragment"
                            ),
                            (p = d + u + p)),
                          c.logger.log(
                            "start time offset found in playlist, adjust startPosition to " +
                              p
                          ),
                          (this.startPosition = p))
                        : t.live
                        ? ((this.startPosition = this.computeLivePosition(
                            d,
                            t
                          )),
                          c.logger.log(
                            "configure startPosition to " + this.startPosition
                          ))
                        : (this.startPosition = 0),
                        (this.lastCurrentTime = this.startPosition);
                    }
                    this.nextLoadPosition = this.startPosition;
                  }
                  this.state === P.WAITING_LEVEL && (this.state = P.IDLE),
                    this.tick();
                }),
                (i.onKeyLoaded = function () {
                  this.state === P.KEY_LOADING &&
                    ((this.state = P.IDLE), this.tick());
                }),
                (i.onFragLoaded = function (e) {
                  var t = this.fragCurrent,
                    a = this.hls,
                    s = this.levels,
                    l = this.media,
                    u = e.frag;
                  if (
                    this.state === P.FRAG_LOADING &&
                    t &&
                    u.type === "main" &&
                    u.level === t.level &&
                    u.sn === t.sn
                  ) {
                    var d = e.stats,
                      v = s[t.level],
                      p = v.details;
                    if (
                      ((this.bitrateTest = !1),
                      (this.stats = d),
                      c.logger.log(
                        "Loaded " +
                          t.sn +
                          " of [" +
                          p.startSN +
                          " ," +
                          p.endSN +
                          "],level " +
                          t.level
                      ),
                      u.bitrateTest && a.nextLoadLevel)
                    )
                      (this.state = P.IDLE),
                        (this.startFragRequested = !1),
                        (d.tparsed = d.tbuffered = window.performance.now()),
                        a.trigger(h.default.FRAG_BUFFERED, {
                          stats: d,
                          frag: t,
                          id: "main",
                        }),
                        this.tick();
                    else if (u.sn === "initSegment")
                      (this.state = P.IDLE),
                        (d.tparsed = d.tbuffered = window.performance.now()),
                        (p.initSegment.data = e.payload),
                        a.trigger(h.default.FRAG_BUFFERED, {
                          stats: d,
                          frag: t,
                          id: "main",
                        }),
                        this.tick();
                    else {
                      c.logger.log(
                        "Parsing " +
                          t.sn +
                          " of [" +
                          p.startSN +
                          " ," +
                          p.endSN +
                          "],level " +
                          t.level +
                          ", cc " +
                          t.cc
                      ),
                        (this.state = P.PARSING),
                        (this.pendingBuffering = !0),
                        (this.appended = !1),
                        u.bitrateTest &&
                          ((u.bitrateTest = !1),
                          this.fragmentTracker.onFragLoaded({ frag: u }));
                      var R = !(l && l.seeking) && (p.PTSKnown || !p.live),
                        O = p.initSegment ? p.initSegment.data : [],
                        j = this._getAudioCodec(v),
                        q = (this.demuxer =
                          this.demuxer || new X(this.hls, "main"));
                      q.push(
                        e.payload,
                        O,
                        j,
                        v.videoCodec,
                        t,
                        p.totalduration,
                        R
                      );
                    }
                  }
                  this.fragLoadError = 0;
                }),
                (i.onFragParsingInitSegment = function (e) {
                  var t = this.fragCurrent,
                    a = e.frag;
                  if (
                    t &&
                    e.id === "main" &&
                    a.sn === t.sn &&
                    a.level === t.level &&
                    this.state === P.PARSING
                  ) {
                    var s = e.tracks,
                      l,
                      u;
                    if (
                      ((this.audioOnly = s.audio && !s.video),
                      this.altAudio && !this.audioOnly && delete s.audio,
                      (u = s.audio),
                      u)
                    ) {
                      var d = this.levels[this.level].audioCodec,
                        v = navigator.userAgent.toLowerCase();
                      d &&
                        this.audioCodecSwap &&
                        (c.logger.log("swapping playlist audio codec"),
                        d.indexOf("mp4a.40.5") !== -1
                          ? (d = "mp4a.40.2")
                          : (d = "mp4a.40.5")),
                        this.audioCodecSwitch &&
                          u.metadata.channelCount !== 1 &&
                          v.indexOf("firefox") === -1 &&
                          (d = "mp4a.40.5"),
                        v.indexOf("android") !== -1 &&
                          u.container !== "audio/mpeg" &&
                          ((d = "mp4a.40.2"),
                          c.logger.log("Android: force audio codec to " + d)),
                        (u.levelCodec = d),
                        (u.id = e.id);
                    }
                    (u = s.video),
                      u &&
                        ((u.levelCodec = this.levels[this.level].videoCodec),
                        (u.id = e.id)),
                      this.hls.trigger(h.default.BUFFER_CODECS, s);
                    for (l in s) {
                      (u = s[l]),
                        c.logger.log(
                          "main track:" +
                            l +
                            ",container:" +
                            u.container +
                            ",codecs[level/parsed]=[" +
                            u.levelCodec +
                            "/" +
                            u.codec +
                            "]"
                        );
                      var p = u.initSegment;
                      p &&
                        ((this.appended = !0),
                        (this.pendingBuffering = !0),
                        this.hls.trigger(h.default.BUFFER_APPENDING, {
                          type: l,
                          data: p,
                          parent: "main",
                          content: "initSegment",
                        }));
                    }
                    this.tick();
                  }
                }),
                (i.onFragParsingData = function (e) {
                  var t = this,
                    a = this.fragCurrent,
                    s = e.frag;
                  if (
                    a &&
                    e.id === "main" &&
                    s.sn === a.sn &&
                    s.level === a.level &&
                    !(e.type === "audio" && this.altAudio) &&
                    this.state === P.PARSING
                  ) {
                    var l = this.levels[this.level],
                      u = a;
                    if (
                      (Object(ee.isFiniteNumber)(e.endPTS) ||
                        ((e.endPTS = e.startPTS + a.duration),
                        (e.endDTS = e.startDTS + a.duration)),
                      e.hasAudio === !0 && u.addElementaryStream(Y.AUDIO),
                      e.hasVideo === !0 && u.addElementaryStream(Y.VIDEO),
                      c.logger.log(
                        "Parsed " +
                          e.type +
                          ",PTS:[" +
                          e.startPTS.toFixed(3) +
                          "," +
                          e.endPTS.toFixed(3) +
                          "],DTS:[" +
                          e.startDTS.toFixed(3) +
                          "/" +
                          e.endDTS.toFixed(3) +
                          "],nb:" +
                          e.nb +
                          ",dropped:" +
                          (e.dropped || 0)
                      ),
                      e.type === "video")
                    )
                      if (((u.dropped = e.dropped), u.dropped))
                        if (u.backtracked)
                          c.logger.warn(
                            "Already backtracked on this fragment, appending with the gap",
                            u.sn
                          );
                        else {
                          var d = l.details;
                          if (d && u.sn === d.startSN)
                            c.logger.warn(
                              "missing video frame(s) on first frag, appending with gap",
                              u.sn
                            );
                          else {
                            c.logger.warn(
                              "missing video frame(s), backtracking fragment",
                              u.sn
                            ),
                              this.fragmentTracker.removeFragment(u),
                              (u.backtracked = !0),
                              (this.nextLoadPosition = e.startPTS),
                              (this.state = P.IDLE),
                              (this.fragPrevious = u),
                              this.demuxer &&
                                (this.demuxer.destroy(), (this.demuxer = null)),
                              this.tick();
                            return;
                          }
                        }
                      else u.backtracked = !1;
                    var v = V(
                        l.details,
                        u,
                        e.startPTS,
                        e.endPTS,
                        e.startDTS,
                        e.endDTS
                      ),
                      p = this.hls;
                    p.trigger(h.default.LEVEL_PTS_UPDATED, {
                      details: l.details,
                      level: this.level,
                      drift: v,
                      type: e.type,
                      start: e.startPTS,
                      end: e.endPTS,
                    }),
                      [e.data1, e.data2].forEach(function (R) {
                        R &&
                          R.length &&
                          t.state === P.PARSING &&
                          ((t.appended = !0),
                          (t.pendingBuffering = !0),
                          p.trigger(h.default.BUFFER_APPENDING, {
                            type: e.type,
                            data: R,
                            parent: "main",
                            content: "data",
                          }));
                      }),
                      this.tick();
                  }
                }),
                (i.onFragParsed = function (e) {
                  var t = this.fragCurrent,
                    a = e.frag;
                  t &&
                    e.id === "main" &&
                    a.sn === t.sn &&
                    a.level === t.level &&
                    this.state === P.PARSING &&
                    ((this.stats.tparsed = window.performance.now()),
                    (this.state = P.PARSED),
                    this._checkAppendedParsed());
                }),
                (i.onAudioTrackSwitching = function (e) {
                  var t = this.altAudio,
                    a = !!e.url,
                    s = e.id;
                  if (!a) {
                    if (this.mediaBuffer !== this.media) {
                      c.logger.log(
                        "switching on main audio, use media.buffered to schedule main fragment loading"
                      ),
                        (this.mediaBuffer = this.media);
                      var l = this.fragCurrent;
                      l.loader &&
                        (c.logger.log(
                          "switching to main audio track, cancel main fragment load"
                        ),
                        l.loader.abort()),
                        (this.fragCurrent = null),
                        (this.fragPrevious = null),
                        this.demuxer &&
                          (this.demuxer.destroy(), (this.demuxer = null)),
                        (this.state = P.IDLE);
                    }
                    var u = this.hls;
                    t &&
                      u.trigger(h.default.BUFFER_FLUSHING, {
                        startOffset: 0,
                        endOffset: Number.POSITIVE_INFINITY,
                        type: "audio",
                      }),
                      u.trigger(h.default.AUDIO_TRACK_SWITCHED, { id: s });
                  }
                }),
                (i.onAudioTrackSwitched = function (e) {
                  var t = e.id,
                    a = !!this.hls.audioTracks[t].url;
                  if (a) {
                    var s = this.videoBuffer;
                    s &&
                      this.mediaBuffer !== s &&
                      (c.logger.log(
                        "switching on alternate audio, use video.buffered to schedule main fragment loading"
                      ),
                      (this.mediaBuffer = s));
                  }
                  (this.altAudio = a), this.tick();
                }),
                (i.onBufferCreated = function (e) {
                  var t = e.tracks,
                    a,
                    s,
                    l = !1;
                  for (var u in t) {
                    var d = t[u];
                    d.id === "main"
                      ? ((s = u),
                        (a = d),
                        u === "video" && (this.videoBuffer = t[u].buffer))
                      : (l = !0);
                  }
                  l && a
                    ? (c.logger.log(
                        "alternate track found, use " +
                          s +
                          ".buffered to schedule main fragment loading"
                      ),
                      (this.mediaBuffer = a.buffer))
                    : (this.mediaBuffer = this.media);
                }),
                (i.onBufferAppended = function (e) {
                  if (e.parent === "main") {
                    var t = this.state;
                    (t === P.PARSING || t === P.PARSED) &&
                      ((this.pendingBuffering = e.pending > 0),
                      this._checkAppendedParsed());
                  }
                }),
                (i._checkAppendedParsed = function () {
                  if (
                    this.state === P.PARSED &&
                    (!this.appended || !this.pendingBuffering)
                  ) {
                    var e = this.fragCurrent;
                    if (e) {
                      var t = this.mediaBuffer ? this.mediaBuffer : this.media;
                      c.logger.log(
                        "main buffered : " + Ee.toString(t.buffered)
                      ),
                        (this.fragPrevious = e);
                      var a = this.stats;
                      (a.tbuffered = window.performance.now()),
                        (this.fragLastKbps = Math.round(
                          (8 * a.total) / (a.tbuffered - a.tfirst)
                        )),
                        this.hls.trigger(h.default.FRAG_BUFFERED, {
                          stats: a,
                          frag: e,
                          id: "main",
                        }),
                        (this.state = P.IDLE);
                    }
                    (this.loadedmetadata || this.startPosition <= 0) &&
                      this.tick();
                  }
                }),
                (i.onError = function (e) {
                  var t = e.frag || this.fragCurrent;
                  if (!(t && t.type !== "main")) {
                    var a =
                      !!this.media &&
                      x.isBuffered(this.media, this.media.currentTime) &&
                      x.isBuffered(this.media, this.media.currentTime + 0.5);
                    switch (e.details) {
                      case D.ErrorDetails.FRAG_LOAD_ERROR:
                      case D.ErrorDetails.FRAG_LOAD_TIMEOUT:
                      case D.ErrorDetails.KEY_LOAD_ERROR:
                      case D.ErrorDetails.KEY_LOAD_TIMEOUT:
                        if (!e.fatal)
                          if (
                            this.fragLoadError + 1 <=
                            this.config.fragLoadingMaxRetry
                          ) {
                            var s = Math.min(
                              Math.pow(2, this.fragLoadError) *
                                this.config.fragLoadingRetryDelay,
                              this.config.fragLoadingMaxRetryTimeout
                            );
                            c.logger.warn(
                              "mediaController: frag loading failed, retry in " +
                                s +
                                " ms"
                            ),
                              (this.retryDate = window.performance.now() + s),
                              this.loadedmetadata ||
                                ((this.startFragRequested = !1),
                                (this.nextLoadPosition = this.startPosition)),
                              this.fragLoadError++,
                              (this.state = P.FRAG_LOADING_WAITING_RETRY);
                          } else
                            c.logger.error(
                              "mediaController: " +
                                e.details +
                                " reaches max retry, redispatch as fatal ..."
                            ),
                              (e.fatal = !0),
                              (this.state = P.ERROR);
                        break;
                      case D.ErrorDetails.LEVEL_LOAD_ERROR:
                      case D.ErrorDetails.LEVEL_LOAD_TIMEOUT:
                        this.state !== P.ERROR &&
                          (e.fatal
                            ? ((this.state = P.ERROR),
                              c.logger.warn(
                                "streamController: " +
                                  e.details +
                                  ",switch to " +
                                  this.state +
                                  " state ..."
                              ))
                            : !e.levelRetry &&
                              this.state === P.WAITING_LEVEL &&
                              (this.state = P.IDLE));
                        break;
                      case D.ErrorDetails.BUFFER_FULL_ERROR:
                        e.parent === "main" &&
                          (this.state === P.PARSING ||
                            this.state === P.PARSED) &&
                          (a
                            ? (this._reduceMaxBufferLength(
                                this.config.maxBufferLength
                              ),
                              (this.state = P.IDLE))
                            : (c.logger.warn(
                                "buffer full error also media.currentTime is not buffered, flush everything"
                              ),
                              (this.fragCurrent = null),
                              this.flushMainBuffer(
                                0,
                                Number.POSITIVE_INFINITY
                              )));
                        break;
                    }
                  }
                }),
                (i._reduceMaxBufferLength = function (e) {
                  var t = this.config;
                  return t.maxMaxBufferLength >= e
                    ? ((t.maxMaxBufferLength /= 2),
                      c.logger.warn(
                        "main:reduce max buffer length to " +
                          t.maxMaxBufferLength +
                          "s"
                      ),
                      !0)
                    : !1;
                }),
                (i._checkBuffer = function () {
                  var e = this.media;
                  if (!(!e || e.readyState === 0)) {
                    var t = this.mediaBuffer ? this.mediaBuffer : e,
                      a = t.buffered;
                    !this.loadedmetadata && a.length
                      ? ((this.loadedmetadata = !0), this._seekToStartPos())
                      : this.immediateSwitch
                      ? this.immediateLevelSwitchEnd()
                      : this.gapController.poll(this.lastCurrentTime, a);
                  }
                }),
                (i.onFragLoadEmergencyAborted = function () {
                  (this.state = P.IDLE),
                    this.loadedmetadata ||
                      ((this.startFragRequested = !1),
                      (this.nextLoadPosition = this.startPosition)),
                    this.tick();
                }),
                (i.onBufferFlushed = function () {
                  var e = this.mediaBuffer ? this.mediaBuffer : this.media;
                  if (e) {
                    var t = this.audioOnly ? Y.AUDIO : Y.VIDEO;
                    this.fragmentTracker.detectEvictedFragments(t, e.buffered);
                  }
                  (this.state = P.IDLE), (this.fragPrevious = null);
                }),
                (i.onLevelsUpdated = function (e) {
                  this.levels = e.levels;
                }),
                (i.swapAudioCodec = function () {
                  this.audioCodecSwap = !this.audioCodecSwap;
                }),
                (i._seekToStartPos = function () {
                  var e = this.media,
                    t = e.currentTime,
                    a = this.startPosition;
                  if (t !== a && a >= 0) {
                    if (e.seeking) {
                      c.logger.log(
                        "could not seek to " + a + ", already seeking at " + t
                      );
                      return;
                    }
                    var s = e.buffered.length ? e.buffered.start(0) : 0,
                      l = s - a;
                    l > 0 &&
                      l < this.config.maxBufferHole &&
                      (c.logger.log(
                        "adjusting start position by " +
                          l +
                          " to match buffer start"
                      ),
                      (a += l),
                      (this.startPosition = a)),
                      c.logger.log(
                        "seek to target start position " +
                          a +
                          " from current time " +
                          t +
                          ". ready state " +
                          e.readyState
                      ),
                      (e.currentTime = a);
                  }
                }),
                (i._getAudioCodec = function (e) {
                  var t = this.config.defaultAudioCodec || e.audioCodec;
                  return (
                    this.audioCodecSwap &&
                      (c.logger.log("swapping playlist audio codec"),
                      t &&
                        (t.indexOf("mp4a.40.5") !== -1
                          ? (t = "mp4a.40.2")
                          : (t = "mp4a.40.5"))),
                    t
                  );
                }),
                Ot(n, [
                  {
                    key: "state",
                    set: function (e) {
                      if (this.state !== e) {
                        var t = this.state;
                        (this._state = e),
                          c.logger.log(
                            "main stream-controller: " + t + "->" + e
                          ),
                          this.hls.trigger(h.default.STREAM_STATE_TRANSITION, {
                            previousState: t,
                            nextState: e,
                          });
                      }
                    },
                    get: function () {
                      return this._state;
                    },
                  },
                  {
                    key: "currentLevel",
                    get: function () {
                      var e = this.media;
                      if (e) {
                        var t = this.getBufferedFrag(e.currentTime);
                        if (t) return t.level;
                      }
                      return -1;
                    },
                  },
                  {
                    key: "nextBufferedFrag",
                    get: function () {
                      var e = this.media;
                      return e
                        ? this.followingBufferedFrag(
                            this.getBufferedFrag(e.currentTime)
                          )
                        : null;
                    },
                  },
                  {
                    key: "nextLevel",
                    get: function () {
                      var e = this.nextBufferedFrag;
                      return e ? e.level : -1;
                    },
                  },
                  {
                    key: "liveSyncPosition",
                    get: function () {
                      return this._liveSyncPosition;
                    },
                    set: function (e) {
                      this._liveSyncPosition = e;
                    },
                  },
                ]),
                n
              );
            })(nt),
            $t = or;
          function lr(o, n) {
            for (var i = 0; i < n.length; i++) {
              var r = n[i];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                "value" in r && (r.writable = !0),
                Object.defineProperty(o, r.key, r);
            }
          }
          function Ht(o, n, i) {
            return n && lr(o.prototype, n), o;
          }
          function Jt(o, n) {
            (o.prototype = Object.create(n.prototype)),
              (o.prototype.constructor = o),
              (o.__proto__ = n);
          }
          var Ct,
            ur = (function (o) {
              Jt(n, o);
              function n(r) {
                var e;
                return (
                  (e =
                    o.call(
                      this,
                      r,
                      h.default.MANIFEST_LOADED,
                      h.default.LEVEL_LOADED,
                      h.default.AUDIO_TRACK_SWITCHED,
                      h.default.FRAG_LOADED,
                      h.default.ERROR
                    ) || this),
                  (e.canload = !1),
                  (e.currentLevelIndex = null),
                  (e.manualLevelIndex = -1),
                  (e.timer = null),
                  (Ct = /chrome|firefox/.test(
                    navigator.userAgent.toLowerCase()
                  )),
                  e
                );
              }
              var i = n.prototype;
              return (
                (i.onHandlerDestroying = function () {
                  this.clearTimer(), (this.manualLevelIndex = -1);
                }),
                (i.clearTimer = function () {
                  this.timer !== null &&
                    (clearTimeout(this.timer), (this.timer = null));
                }),
                (i.startLoad = function () {
                  var e = this._levels;
                  (this.canload = !0),
                    (this.levelRetryCount = 0),
                    e &&
                      e.forEach(function (t) {
                        t.loadError = 0;
                        var a = t.details;
                        a && a.live && (t.details = void 0);
                      }),
                    this.timer !== null && this.loadLevel();
                }),
                (i.stopLoad = function () {
                  this.canload = !1;
                }),
                (i.onManifestLoaded = function (e) {
                  var t = [],
                    a = [],
                    s,
                    l = {},
                    u = null,
                    d = !1,
                    v = !1;
                  if (
                    (e.levels.forEach(function (O) {
                      var j = O.attrs;
                      (O.loadError = 0),
                        (O.fragmentError = !1),
                        (d = d || !!O.videoCodec),
                        (v = v || !!O.audioCodec),
                        Ct &&
                          O.audioCodec &&
                          O.audioCodec.indexOf("mp4a.40.34") !== -1 &&
                          (O.audioCodec = void 0),
                        (u = l[O.bitrate]),
                        u
                          ? u.url.push(O.url)
                          : ((O.url = [O.url]),
                            (O.urlId = 0),
                            (l[O.bitrate] = O),
                            t.push(O)),
                        j &&
                          (j.AUDIO && H(u || O, "audio", j.AUDIO),
                          j.SUBTITLES && H(u || O, "text", j.SUBTITLES));
                    }),
                    d &&
                      v &&
                      (t = t.filter(function (O) {
                        var j = O.videoCodec;
                        return !!j;
                      })),
                    (t = t.filter(function (O) {
                      var j = O.audioCodec,
                        q = O.videoCodec;
                      return (!j || Me(j, "audio")) && (!q || Me(q, "video"));
                    })),
                    e.audioTracks &&
                      ((a = e.audioTracks.filter(function (O) {
                        return !O.audioCodec || Me(O.audioCodec, "audio");
                      })),
                      a.forEach(function (O, j) {
                        O.id = j;
                      })),
                    t.length > 0)
                  ) {
                    (s = t[0].bitrate),
                      t.sort(function (O, j) {
                        return O.bitrate - j.bitrate;
                      }),
                      (this._levels = t);
                    for (var p = 0; p < t.length; p++)
                      if (t[p].bitrate === s) {
                        (this._firstLevel = p),
                          c.logger.log(
                            "manifest loaded," +
                              t.length +
                              " level(s) found, first bitrate:" +
                              s
                          );
                        break;
                      }
                    var R = v && !d;
                    this.hls.trigger(h.default.MANIFEST_PARSED, {
                      levels: t,
                      audioTracks: a,
                      firstLevel: this._firstLevel,
                      stats: e.stats,
                      audio: v,
                      video: d,
                      altAudio:
                        !R &&
                        a.some(function (O) {
                          return !!O.url;
                        }),
                    });
                  } else
                    this.hls.trigger(h.default.ERROR, {
                      type: D.ErrorTypes.MEDIA_ERROR,
                      details:
                        D.ErrorDetails.MANIFEST_INCOMPATIBLE_CODECS_ERROR,
                      fatal: !0,
                      url: this.hls.url,
                      reason:
                        "no level with compatible codecs found in manifest",
                    });
                }),
                (i.setLevelInternal = function (e) {
                  var t = this._levels,
                    a = this.hls;
                  if (e >= 0 && e < t.length) {
                    if ((this.clearTimer(), this.currentLevelIndex !== e)) {
                      c.logger.log("switching to level " + e),
                        (this.currentLevelIndex = e);
                      var s = t[e];
                      (s.level = e), a.trigger(h.default.LEVEL_SWITCHING, s);
                    }
                    var l = t[e],
                      u = l.details;
                    if (!u || u.live) {
                      var d = l.urlId;
                      a.trigger(h.default.LEVEL_LOADING, {
                        url: l.url[d],
                        level: e,
                        id: d,
                      });
                    }
                  } else
                    a.trigger(h.default.ERROR, {
                      type: D.ErrorTypes.OTHER_ERROR,
                      details: D.ErrorDetails.LEVEL_SWITCH_ERROR,
                      level: e,
                      fatal: !1,
                      reason: "invalid level idx",
                    });
                }),
                (i.onError = function (e) {
                  if (e.fatal) {
                    e.type === D.ErrorTypes.NETWORK_ERROR && this.clearTimer();
                    return;
                  }
                  var t = !1,
                    a = !1,
                    s;
                  switch (e.details) {
                    case D.ErrorDetails.FRAG_LOAD_ERROR:
                    case D.ErrorDetails.FRAG_LOAD_TIMEOUT:
                    case D.ErrorDetails.KEY_LOAD_ERROR:
                    case D.ErrorDetails.KEY_LOAD_TIMEOUT:
                      (s = e.frag.level), (a = !0);
                      break;
                    case D.ErrorDetails.LEVEL_LOAD_ERROR:
                    case D.ErrorDetails.LEVEL_LOAD_TIMEOUT:
                      (s = e.context.level), (t = !0);
                      break;
                    case D.ErrorDetails.REMUX_ALLOC_ERROR:
                      (s = e.level), (t = !0);
                      break;
                  }
                  s !== void 0 && this.recoverLevel(e, s, t, a);
                }),
                (i.recoverLevel = function (e, t, a, s) {
                  var l = this,
                    u = this.hls.config,
                    d = e.details,
                    v = this._levels[t],
                    p,
                    R,
                    O;
                  if ((v.loadError++, (v.fragmentError = s), a))
                    if (this.levelRetryCount + 1 <= u.levelLoadingMaxRetry)
                      (R = Math.min(
                        Math.pow(2, this.levelRetryCount) *
                          u.levelLoadingRetryDelay,
                        u.levelLoadingMaxRetryTimeout
                      )),
                        (this.timer = setTimeout(function () {
                          return l.loadLevel();
                        }, R)),
                        (e.levelRetry = !0),
                        this.levelRetryCount++,
                        c.logger.warn(
                          "level controller, " +
                            d +
                            ", retry in " +
                            R +
                            " ms, current retry count is " +
                            this.levelRetryCount
                        );
                    else {
                      c.logger.error(
                        "level controller, cannot recover from " + d + " error"
                      ),
                        (this.currentLevelIndex = null),
                        this.clearTimer(),
                        (e.fatal = !0);
                      return;
                    }
                  (a || s) &&
                    ((p = v.url.length),
                    p > 1 && v.loadError < p
                      ? ((v.urlId = (v.urlId + 1) % p),
                        (v.details = void 0),
                        c.logger.warn(
                          "level controller, " +
                            d +
                            " for level " +
                            t +
                            ": switching to redundant URL-id " +
                            v.urlId
                        ))
                      : this.manualLevelIndex === -1
                      ? ((O = t === 0 ? this._levels.length - 1 : t - 1),
                        c.logger.warn(
                          "level controller, " + d + ": switch to " + O
                        ),
                        (this.hls.nextAutoLevel = this.currentLevelIndex = O))
                      : s &&
                        (c.logger.warn(
                          "level controller, " + d + ": reload a fragment"
                        ),
                        (this.currentLevelIndex = null)));
                }),
                (i.onFragLoaded = function (e) {
                  var t = e.frag;
                  if (t !== void 0 && t.type === "main") {
                    var a = this._levels[t.level];
                    a !== void 0 &&
                      ((a.fragmentError = !1),
                      (a.loadError = 0),
                      (this.levelRetryCount = 0));
                  }
                }),
                (i.onLevelLoaded = function (e) {
                  var t = this,
                    a = e.level,
                    s = e.details;
                  if (a === this.currentLevelIndex) {
                    var l = this._levels[a];
                    if (
                      (l.fragmentError ||
                        ((l.loadError = 0), (this.levelRetryCount = 0)),
                      s.live)
                    ) {
                      var u = ce(l.details, s, e.stats.trequest);
                      c.logger.log(
                        "live playlist, reload in " + Math.round(u) + " ms"
                      ),
                        (this.timer = setTimeout(function () {
                          return t.loadLevel();
                        }, u));
                    } else this.clearTimer();
                  }
                }),
                (i.onAudioTrackSwitched = function (e) {
                  var t = this.hls.audioTracks[e.id].groupId,
                    a = this.hls.levels[this.currentLevelIndex];
                  if (a && a.audioGroupIds) {
                    for (var s = -1, l = 0; l < a.audioGroupIds.length; l++)
                      if (a.audioGroupIds[l] === t) {
                        s = l;
                        break;
                      }
                    s !== a.urlId && ((a.urlId = s), this.startLoad());
                  }
                }),
                (i.loadLevel = function () {
                  if (
                    (c.logger.debug("call to loadLevel"),
                    this.currentLevelIndex !== null && this.canload)
                  ) {
                    var e = this._levels[this.currentLevelIndex];
                    if (typeof e == "object" && e.url.length > 0) {
                      var t = this.currentLevelIndex,
                        a = e.urlId,
                        s = e.url[a];
                      c.logger.log(
                        "Attempt loading level index " + t + " with URL-id " + a
                      ),
                        this.hls.trigger(h.default.LEVEL_LOADING, {
                          url: s,
                          level: t,
                          id: a,
                        });
                    }
                  }
                }),
                (i.removeLevel = function (e, t) {
                  var a = this.levels
                    .filter(function (s, l) {
                      return l !== e
                        ? !0
                        : s.url.length > 1 && t !== void 0
                        ? ((s.url = s.url.filter(function (u, d) {
                            return d !== t;
                          })),
                          (s.urlId = 0),
                          !0)
                        : !1;
                    })
                    .map(function (s, l) {
                      var u = s.details;
                      return (
                        u &&
                          u.fragments &&
                          u.fragments.forEach(function (d) {
                            d.level = l;
                          }),
                        s
                      );
                    });
                  (this._levels = a),
                    this.hls.trigger(h.default.LEVELS_UPDATED, { levels: a });
                }),
                Ht(n, [
                  {
                    key: "levels",
                    get: function () {
                      return this._levels;
                    },
                  },
                  {
                    key: "level",
                    get: function () {
                      return this.currentLevelIndex;
                    },
                    set: function (e) {
                      var t = this._levels;
                      t &&
                        ((e = Math.min(e, t.length - 1)),
                        (this.currentLevelIndex !== e || !t[e].details) &&
                          this.setLevelInternal(e));
                    },
                  },
                  {
                    key: "manualLevel",
                    get: function () {
                      return this.manualLevelIndex;
                    },
                    set: function (e) {
                      (this.manualLevelIndex = e),
                        this._startLevel === void 0 && (this._startLevel = e),
                        e !== -1 && (this.level = e);
                    },
                  },
                  {
                    key: "firstLevel",
                    get: function () {
                      return this._firstLevel;
                    },
                    set: function (e) {
                      this._firstLevel = e;
                    },
                  },
                  {
                    key: "startLevel",
                    get: function () {
                      if (this._startLevel === void 0) {
                        var e = this.hls.config.startLevel;
                        return e !== void 0 ? e : this._firstLevel;
                      } else return this._startLevel;
                    },
                    set: function (e) {
                      this._startLevel = e;
                    },
                  },
                  {
                    key: "nextLoadLevel",
                    get: function () {
                      return this.manualLevelIndex !== -1
                        ? this.manualLevelIndex
                        : this.hls.nextAutoLevel;
                    },
                    set: function (e) {
                      (this.level = e),
                        this.manualLevelIndex === -1 &&
                          (this.hls.nextAutoLevel = e);
                    },
                  },
                ]),
                n
              );
            })(S),
            Wt = K("./src/demux/id3.js");
          function Mt(o, n) {
            var i;
            try {
              i = new Event("addtrack");
            } catch {
              (i = document.createEvent("Event")),
                i.initEvent("addtrack", !1, !1);
            }
            (i.track = o), n.dispatchEvent(i);
          }
          function Pt(o) {
            if (o != null && o.cues)
              for (; o.cues.length > 0; ) o.removeCue(o.cues[0]);
          }
          function er(o, n) {
            if (n < o[0].endTime) return o[0];
            if (n > o[o.length - 1].endTime) return o[o.length - 1];
            for (var i = 0, r = o.length - 1; i <= r; ) {
              var e = Math.floor((r + i) / 2);
              if (n < o[e].endTime) r = e - 1;
              else if (n > o[e].endTime) i = e + 1;
              else return o[e];
            }
            return o[i].endTime - n < n - o[r].endTime ? o[i] : o[r];
          }
          function tr(o, n) {
            (o.prototype = Object.create(n.prototype)),
              (o.prototype.constructor = o),
              (o.__proto__ = n);
          }
          var Nt = 0.25,
            Vt = (function (o) {
              tr(n, o);
              function n(r) {
                var e;
                return (
                  (e =
                    o.call(
                      this,
                      r,
                      h.default.MEDIA_ATTACHED,
                      h.default.MEDIA_DETACHING,
                      h.default.FRAG_PARSING_METADATA,
                      h.default.LIVE_BACK_BUFFER_REACHED
                    ) || this),
                  (e.id3Track = void 0),
                  (e.media = void 0),
                  e
                );
              }
              var i = n.prototype;
              return (
                (i.destroy = function () {
                  S.prototype.destroy.call(this);
                }),
                (i.onMediaAttached = function (e) {
                  (this.media = e.media), this.media;
                }),
                (i.onMediaDetaching = function () {
                  Pt(this.id3Track),
                    (this.id3Track = void 0),
                    (this.media = void 0);
                }),
                (i.getID3Track = function (e) {
                  for (var t = 0; t < e.length; t++) {
                    var a = e[t];
                    if (a.kind === "metadata" && a.label === "id3")
                      return Mt(a, this.media), a;
                  }
                  return this.media.addTextTrack("metadata", "id3");
                }),
                (i.onFragParsingMetadata = function (e) {
                  var t = e.frag,
                    a = e.samples;
                  this.id3Track ||
                    ((this.id3Track = this.getID3Track(this.media.textTracks)),
                    (this.id3Track.mode = "hidden"));
                  for (
                    var s =
                        window.WebKitDataCue ||
                        window.VTTCue ||
                        window.TextTrackCue,
                      l = 0;
                    l < a.length;
                    l++
                  ) {
                    var u = Wt.default.getID3Frames(a[l].data);
                    if (u) {
                      var d = Math.max(a[l].pts, 0),
                        v = l < a.length - 1 ? a[l + 1].pts : t.endPTS;
                      v || (v = t.start + t.duration);
                      var p = v - d;
                      p <= 0 && (v = d + Nt);
                      for (var R = 0; R < u.length; R++) {
                        var O = u[R];
                        if (!Wt.default.isTimeStampFrame(O)) {
                          var j = new s(d, v, "");
                          (j.value = O), this.id3Track.addCue(j);
                        }
                      }
                    }
                  }
                }),
                (i.onLiveBackBufferReached = function (e) {
                  var t = e.bufferEnd,
                    a = this.id3Track;
                  if (!(!a || !a.cues || !a.cues.length)) {
                    var s = er(a.cues, t);
                    if (s) for (; a.cues[0] !== s; ) a.removeCue(a.cues[0]);
                  }
                }),
                n
              );
            })(S),
            fr = Vt;
          function dr() {
            var o = E();
            if (!o) return !1;
            var n = self.SourceBuffer || self.WebKitSourceBuffer,
              i =
                o &&
                typeof o.isTypeSupported == "function" &&
                o.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"'),
              r =
                !n ||
                (n.prototype &&
                  typeof n.prototype.appendBuffer == "function" &&
                  typeof n.prototype.remove == "function");
            return !!i && !!r;
          }
          var Qr = (function () {
              function o(i) {
                (this.alpha_ = void 0),
                  (this.estimate_ = void 0),
                  (this.totalWeight_ = void 0),
                  (this.alpha_ = i ? Math.exp(Math.log(0.5) / i) : 0),
                  (this.estimate_ = 0),
                  (this.totalWeight_ = 0);
              }
              var n = o.prototype;
              return (
                (n.sample = function (r, e) {
                  var t = Math.pow(this.alpha_, r);
                  (this.estimate_ = e * (1 - t) + t * this.estimate_),
                    (this.totalWeight_ += r);
                }),
                (n.getTotalWeight = function () {
                  return this.totalWeight_;
                }),
                (n.getEstimate = function () {
                  if (this.alpha_) {
                    var r = 1 - Math.pow(this.alpha_, this.totalWeight_);
                    return this.estimate_ / r;
                  } else return this.estimate_;
                }),
                o
              );
            })(),
            Tr = Qr,
            $r = (function () {
              function o(i, r, e, t) {
                (this.hls = void 0),
                  (this.defaultEstimate_ = void 0),
                  (this.minWeight_ = void 0),
                  (this.minDelayMs_ = void 0),
                  (this.slow_ = void 0),
                  (this.fast_ = void 0),
                  (this.hls = i),
                  (this.defaultEstimate_ = t),
                  (this.minWeight_ = 0.001),
                  (this.minDelayMs_ = 50),
                  (this.slow_ = new Tr(r)),
                  (this.fast_ = new Tr(e));
              }
              var n = o.prototype;
              return (
                (n.sample = function (r, e) {
                  r = Math.max(r, this.minDelayMs_);
                  var t = 8 * e,
                    a = r / 1e3,
                    s = t / a;
                  this.fast_.sample(a, s), this.slow_.sample(a, s);
                }),
                (n.canEstimate = function () {
                  var r = this.fast_;
                  return r && r.getTotalWeight() >= this.minWeight_;
                }),
                (n.getEstimate = function () {
                  return this.canEstimate()
                    ? Math.min(
                        this.fast_.getEstimate(),
                        this.slow_.getEstimate()
                      )
                    : this.defaultEstimate_;
                }),
                (n.destroy = function () {}),
                o
              );
            })(),
            Jr = $r;
          function ei(o, n) {
            for (var i = 0; i < n.length; i++) {
              var r = n[i];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                "value" in r && (r.writable = !0),
                Object.defineProperty(o, r.key, r);
            }
          }
          function ti(o, n, i) {
            return n && ei(o.prototype, n), o;
          }
          function ri(o) {
            if (o === void 0)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return o;
          }
          function ii(o, n) {
            (o.prototype = Object.create(n.prototype)),
              (o.prototype.constructor = o),
              (o.__proto__ = n);
          }
          var ai = window,
            ni = ai.performance,
            si = (function (o) {
              ii(n, o);
              function n(r) {
                var e;
                return (
                  (e =
                    o.call(
                      this,
                      r,
                      h.default.FRAG_LOADING,
                      h.default.FRAG_LOADED,
                      h.default.FRAG_BUFFERED,
                      h.default.ERROR
                    ) || this),
                  (e.lastLoadedFragLevel = 0),
                  (e._nextAutoLevel = -1),
                  (e.hls = r),
                  (e.timer = null),
                  (e._bwEstimator = null),
                  (e.onCheck = e._abandonRulesCheck.bind(ri(e))),
                  e
                );
              }
              var i = n.prototype;
              return (
                (i.destroy = function () {
                  this.clearTimer(), S.prototype.destroy.call(this);
                }),
                (i.onFragLoading = function (e) {
                  var t = e.frag;
                  if (
                    t.type === "main" &&
                    (this.timer ||
                      ((this.fragCurrent = t),
                      (this.timer = setInterval(this.onCheck, 100))),
                    !this._bwEstimator)
                  ) {
                    var a = this.hls,
                      s = a.config,
                      l = t.level,
                      u = a.levels[l].details.live,
                      d,
                      v;
                    u
                      ? ((d = s.abrEwmaFastLive), (v = s.abrEwmaSlowLive))
                      : ((d = s.abrEwmaFastVoD), (v = s.abrEwmaSlowVoD)),
                      (this._bwEstimator = new Jr(
                        a,
                        v,
                        d,
                        s.abrEwmaDefaultEstimate
                      ));
                  }
                }),
                (i._abandonRulesCheck = function () {
                  var e = this.hls,
                    t = e.media,
                    a = this.fragCurrent;
                  if (a) {
                    var s = a.loader;
                    if (!s || (s.stats && s.stats.aborted)) {
                      c.logger.warn(
                        "frag loader destroy or aborted, disarm abandonRules"
                      ),
                        this.clearTimer(),
                        (this._nextAutoLevel = -1);
                      return;
                    }
                    var l = s.stats;
                    if (
                      t &&
                      l &&
                      ((!t.paused && t.playbackRate !== 0) || !t.readyState) &&
                      a.autoLevel &&
                      a.level
                    ) {
                      var u = ni.now() - l.trequest,
                        d = Math.abs(t.playbackRate);
                      if (u > (500 * a.duration) / d) {
                        var v = e.levels,
                          p = Math.max(
                            1,
                            l.bw ? l.bw / 8 : (l.loaded * 1e3) / u
                          ),
                          R = v[a.level];
                        if (!R) return;
                        var O = R.realBitrate
                            ? Math.max(R.realBitrate, R.bitrate)
                            : R.bitrate,
                          j = l.total
                            ? l.total
                            : Math.max(
                                l.loaded,
                                Math.round((a.duration * O) / 8)
                              ),
                          q = t.currentTime,
                          ne = (j - l.loaded) / p,
                          re =
                            (x.bufferInfo(t, q, e.config.maxBufferHole).end -
                              q) /
                            d;
                        if (re < (2 * a.duration) / d && ne > re) {
                          var ue = e.minAutoLevel,
                            de,
                            ye;
                          for (ye = a.level - 1; ye > ue; ye--) {
                            var Ue = v[ye].realBitrate
                                ? Math.max(v[ye].realBitrate, v[ye].bitrate)
                                : v[ye].bitrate,
                              ft = (a.duration * Ue) / (8 * 0.8 * p);
                            if (ft < re) break;
                          }
                          de < ne &&
                            (c.logger.warn(
                              "loading too slow, abort fragment loading and switch to level " +
                                ye +
                                ":fragLoadedDelay[" +
                                ye +
                                "]<fragLoadedDelay[" +
                                (a.level - 1) +
                                "];bufferStarvationDelay:" +
                                de.toFixed(1) +
                                "<" +
                                ne.toFixed(1) +
                                ":" +
                                re.toFixed(1)
                            ),
                            (e.nextLoadLevel = ye),
                            this._bwEstimator.sample(u, l.loaded),
                            s.abort(),
                            this.clearTimer(),
                            e.trigger(h.default.FRAG_LOAD_EMERGENCY_ABORTED, {
                              frag: a,
                              stats: l,
                            }));
                        }
                      }
                    }
                  }
                }),
                (i.onFragLoaded = function (e) {
                  var t = e.frag;
                  if (t.type === "main" && Object(ee.isFiniteNumber)(t.sn)) {
                    if (
                      (this.clearTimer(),
                      (this.lastLoadedFragLevel = t.level),
                      (this._nextAutoLevel = -1),
                      this.hls.config.abrMaxWithRealBitrate)
                    ) {
                      var a = this.hls.levels[t.level],
                        s = (a.loaded ? a.loaded.bytes : 0) + e.stats.loaded,
                        l =
                          (a.loaded ? a.loaded.duration : 0) + e.frag.duration;
                      (a.loaded = { bytes: s, duration: l }),
                        (a.realBitrate = Math.round((8 * s) / l));
                    }
                    if (e.frag.bitrateTest) {
                      var u = e.stats;
                      (u.tparsed = u.tbuffered = u.tload),
                        this.onFragBuffered(e);
                    }
                  }
                }),
                (i.onFragBuffered = function (e) {
                  var t = e.stats,
                    a = e.frag;
                  if (
                    t.aborted !== !0 &&
                    a.type === "main" &&
                    Object(ee.isFiniteNumber)(a.sn) &&
                    (!a.bitrateTest || t.tload === t.tbuffered)
                  ) {
                    var s = t.tparsed - t.trequest;
                    c.logger.log(
                      "latency/loading/parsing/append/kbps:" +
                        Math.round(t.tfirst - t.trequest) +
                        "/" +
                        Math.round(t.tload - t.tfirst) +
                        "/" +
                        Math.round(t.tparsed - t.tload) +
                        "/" +
                        Math.round(t.tbuffered - t.tparsed) +
                        "/" +
                        Math.round((8 * t.loaded) / (t.tbuffered - t.trequest))
                    ),
                      this._bwEstimator.sample(s, t.loaded),
                      (t.bwEstimate = this._bwEstimator.getEstimate()),
                      a.bitrateTest
                        ? (this.bitrateTestDelay = s / 1e3)
                        : (this.bitrateTestDelay = 0);
                  }
                }),
                (i.onError = function (e) {
                  switch (e.details) {
                    case D.ErrorDetails.FRAG_LOAD_ERROR:
                    case D.ErrorDetails.FRAG_LOAD_TIMEOUT:
                      this.clearTimer();
                      break;
                  }
                }),
                (i.clearTimer = function () {
                  clearInterval(this.timer), (this.timer = null);
                }),
                (i._findBestLevel = function (e, t, a, s, l, u, d, v, p) {
                  for (var R = l; R >= s; R--) {
                    var O = p[R];
                    if (O) {
                      var j = O.details,
                        q = j ? j.totalduration / j.fragments.length : t,
                        ne = j ? j.live : !1,
                        re = void 0;
                      R <= e ? (re = d * a) : (re = v * a);
                      var ue = p[R].realBitrate
                          ? Math.max(p[R].realBitrate, p[R].bitrate)
                          : p[R].bitrate,
                        de = (ue * q) / re;
                      if (
                        (c.logger.trace(
                          "level/adjustedbw/bitrate/avgDuration/maxFetchDuration/fetchDuration: " +
                            R +
                            "/" +
                            Math.round(re) +
                            "/" +
                            ue +
                            "/" +
                            q +
                            "/" +
                            u +
                            "/" +
                            de
                        ),
                        re > ue &&
                          (!de || (ne && !this.bitrateTestDelay) || de < u))
                      )
                        return R;
                    }
                  }
                  return -1;
                }),
                ti(n, [
                  {
                    key: "nextAutoLevel",
                    get: function () {
                      var e = this._nextAutoLevel,
                        t = this._bwEstimator;
                      if (e !== -1 && (!t || !t.canEstimate())) return e;
                      var a = this._nextABRAutoLevel;
                      return e !== -1 && (a = Math.min(e, a)), a;
                    },
                    set: function (e) {
                      this._nextAutoLevel = e;
                    },
                  },
                  {
                    key: "_nextABRAutoLevel",
                    get: function () {
                      var e = this.hls,
                        t = e.maxAutoLevel,
                        a = e.levels,
                        s = e.config,
                        l = e.minAutoLevel,
                        u = e.media,
                        d = this.lastLoadedFragLevel,
                        v = this.fragCurrent ? this.fragCurrent.duration : 0,
                        p = u ? u.currentTime : 0,
                        R =
                          u && u.playbackRate !== 0
                            ? Math.abs(u.playbackRate)
                            : 1,
                        O = this._bwEstimator
                          ? this._bwEstimator.getEstimate()
                          : s.abrEwmaDefaultEstimate,
                        j = (x.bufferInfo(u, p, s.maxBufferHole).end - p) / R,
                        q = this._findBestLevel(
                          d,
                          v,
                          O,
                          l,
                          t,
                          j,
                          s.abrBandWidthFactor,
                          s.abrBandWidthUpFactor,
                          a
                        );
                      if (q >= 0) return q;
                      c.logger.trace(
                        "rebuffering expected to happen, lets try to find a quality level minimizing the rebuffering"
                      );
                      var ne = v
                          ? Math.min(v, s.maxStarvationDelay)
                          : s.maxStarvationDelay,
                        re = s.abrBandWidthFactor,
                        ue = s.abrBandWidthUpFactor;
                      if (j === 0) {
                        var de = this.bitrateTestDelay;
                        if (de) {
                          var ye = v
                            ? Math.min(v, s.maxLoadingDelay)
                            : s.maxLoadingDelay;
                          (ne = ye - de),
                            c.logger.trace(
                              "bitrate test took " +
                                Math.round(1e3 * de) +
                                "ms, set first fragment max fetchDuration to " +
                                Math.round(1e3 * ne) +
                                " ms"
                            ),
                            (re = ue = 1);
                        }
                      }
                      return (
                        (q = this._findBestLevel(
                          d,
                          v,
                          O,
                          l,
                          t,
                          j + ne,
                          re,
                          ue,
                          a
                        )),
                        Math.max(q, 0)
                      );
                    },
                  },
                ]),
                n
              );
            })(S),
            oi = si;
          function li(o, n) {
            (o.prototype = Object.create(n.prototype)),
              (o.prototype.constructor = o),
              (o.__proto__ = n);
          }
          var Sr = E(),
            ui = (function (o) {
              li(n, o);
              function n(r) {
                var e;
                return (
                  (e =
                    o.call(
                      this,
                      r,
                      h.default.MEDIA_ATTACHING,
                      h.default.MEDIA_DETACHING,
                      h.default.MANIFEST_PARSED,
                      h.default.BUFFER_RESET,
                      h.default.BUFFER_APPENDING,
                      h.default.BUFFER_CODECS,
                      h.default.BUFFER_EOS,
                      h.default.BUFFER_FLUSHING,
                      h.default.LEVEL_PTS_UPDATED,
                      h.default.LEVEL_UPDATED
                    ) || this),
                  (e._msDuration = null),
                  (e._levelDuration = null),
                  (e._levelTargetDuration = 10),
                  (e._live = null),
                  (e._objectUrl = null),
                  (e._needsFlush = !1),
                  (e._needsEos = !1),
                  (e.config = void 0),
                  (e.audioTimestampOffset = void 0),
                  (e.bufferCodecEventsExpected = 0),
                  (e._bufferCodecEventsTotal = 0),
                  (e.media = null),
                  (e.mediaSource = null),
                  (e.segments = []),
                  (e.parent = void 0),
                  (e.appending = !1),
                  (e.appended = 0),
                  (e.appendError = 0),
                  (e.flushBufferCounter = 0),
                  (e.tracks = {}),
                  (e.pendingTracks = {}),
                  (e.sourceBuffer = {}),
                  (e.flushRange = []),
                  (e._onMediaSourceOpen = function () {
                    c.logger.log("media source opened"),
                      e.hls.trigger(h.default.MEDIA_ATTACHED, {
                        media: e.media,
                      });
                    var t = e.mediaSource;
                    t &&
                      t.removeEventListener("sourceopen", e._onMediaSourceOpen),
                      e.checkPendingTracks();
                  }),
                  (e._onMediaSourceClose = function () {
                    c.logger.log("media source closed");
                  }),
                  (e._onMediaSourceEnded = function () {
                    c.logger.log("media source ended");
                  }),
                  (e._onSBUpdateEnd = function () {
                    if (e.audioTimestampOffset && e.sourceBuffer.audio) {
                      var t = e.sourceBuffer.audio;
                      c.logger.warn(
                        "change mpeg audio timestamp offset from " +
                          t.timestampOffset +
                          " to " +
                          e.audioTimestampOffset
                      ),
                        (t.timestampOffset = e.audioTimestampOffset),
                        delete e.audioTimestampOffset;
                    }
                    e._needsFlush && e.doFlush(),
                      e._needsEos && e.checkEos(),
                      (e.appending = !1);
                    var a = e.parent,
                      s = e.segments.reduce(function (p, R) {
                        return R.parent === a ? p + 1 : p;
                      }, 0),
                      l = {},
                      u = e.sourceBuffer;
                    for (var d in u) {
                      var v = u[d];
                      if (!v)
                        throw Error(
                          "handling source buffer update end error: source buffer for " +
                            d +
                            " uninitilized and unable to update buffered TimeRanges."
                        );
                      l[d] = v.buffered;
                    }
                    e.hls.trigger(h.default.BUFFER_APPENDED, {
                      parent: a,
                      pending: s,
                      timeRanges: l,
                    }),
                      e._needsFlush || e.doAppending(),
                      e.updateMediaElementDuration(),
                      s === 0 && e.flushLiveBackBuffer();
                  }),
                  (e._onSBUpdateError = function (t) {
                    c.logger.error("sourceBuffer error:", t),
                      e.hls.trigger(h.default.ERROR, {
                        type: D.ErrorTypes.MEDIA_ERROR,
                        details: D.ErrorDetails.BUFFER_APPENDING_ERROR,
                        fatal: !1,
                      });
                  }),
                  (e.config = r.config),
                  e
                );
              }
              var i = n.prototype;
              return (
                (i.destroy = function () {
                  S.prototype.destroy.call(this);
                }),
                (i.onLevelPtsUpdated = function (e) {
                  var t = e.type,
                    a = this.tracks.audio;
                  if (t === "audio" && a && a.container === "audio/mpeg") {
                    var s = this.sourceBuffer.audio;
                    if (!s)
                      throw Error(
                        "Level PTS Updated and source buffer for audio uninitalized"
                      );
                    var l = Math.abs(s.timestampOffset - e.start);
                    if (l > 0.1) {
                      var u = s.updating;
                      try {
                        s.abort();
                      } catch (d) {
                        c.logger.warn("can not abort audio buffer: " + d);
                      }
                      u
                        ? (this.audioTimestampOffset = e.start)
                        : (c.logger.warn(
                            "change mpeg audio timestamp offset from " +
                              s.timestampOffset +
                              " to " +
                              e.start
                          ),
                          (s.timestampOffset = e.start));
                    }
                  }
                }),
                (i.onManifestParsed = function (e) {
                  var t = 2;
                  ((e.audio && !e.video) || !e.altAudio) && (t = 1),
                    (this.bufferCodecEventsExpected =
                      this._bufferCodecEventsTotal =
                        t),
                    c.logger.log(
                      this.bufferCodecEventsExpected +
                        " bufferCodec event(s) expected"
                    );
                }),
                (i.onMediaAttaching = function (e) {
                  var t = (this.media = e.media);
                  if (t && Sr) {
                    var a = (this.mediaSource = new Sr());
                    a.addEventListener("sourceopen", this._onMediaSourceOpen),
                      a.addEventListener(
                        "sourceended",
                        this._onMediaSourceEnded
                      ),
                      a.addEventListener(
                        "sourceclose",
                        this._onMediaSourceClose
                      ),
                      (t.src = window.URL.createObjectURL(a)),
                      (this._objectUrl = t.src);
                  }
                }),
                (i.onMediaDetaching = function () {
                  c.logger.log("media source detaching");
                  var e = this.mediaSource;
                  if (e) {
                    if (e.readyState === "open")
                      try {
                        e.endOfStream();
                      } catch (t) {
                        c.logger.warn(
                          "onMediaDetaching:" +
                            t.message +
                            " while calling endOfStream"
                        );
                      }
                    e.removeEventListener(
                      "sourceopen",
                      this._onMediaSourceOpen
                    ),
                      e.removeEventListener(
                        "sourceended",
                        this._onMediaSourceEnded
                      ),
                      e.removeEventListener(
                        "sourceclose",
                        this._onMediaSourceClose
                      ),
                      this.media &&
                        (this._objectUrl &&
                          window.URL.revokeObjectURL(this._objectUrl),
                        this.media.src === this._objectUrl
                          ? (this.media.removeAttribute("src"),
                            this.media.load())
                          : c.logger.warn(
                              "media.src was changed by a third party - skip cleanup"
                            )),
                      (this.mediaSource = null),
                      (this.media = null),
                      (this._objectUrl = null),
                      (this.bufferCodecEventsExpected =
                        this._bufferCodecEventsTotal),
                      (this.pendingTracks = {}),
                      (this.tracks = {}),
                      (this.sourceBuffer = {}),
                      (this.flushRange = []),
                      (this.segments = []),
                      (this.appended = 0);
                  }
                  this.hls.trigger(h.default.MEDIA_DETACHED);
                }),
                (i.checkPendingTracks = function () {
                  var e = this.bufferCodecEventsExpected,
                    t = this.pendingTracks,
                    a = Object.keys(t).length;
                  ((a && !e) || a === 2) &&
                    (this.createSourceBuffers(t),
                    (this.pendingTracks = {}),
                    this.doAppending());
                }),
                (i.onBufferReset = function () {
                  var e = this.sourceBuffer;
                  for (var t in e) {
                    var a = e[t];
                    try {
                      a &&
                        (this.mediaSource &&
                          this.mediaSource.removeSourceBuffer(a),
                        a.removeEventListener("updateend", this._onSBUpdateEnd),
                        a.removeEventListener("error", this._onSBUpdateError));
                    } catch {}
                  }
                  (this.sourceBuffer = {}),
                    (this.flushRange = []),
                    (this.segments = []),
                    (this.appended = 0);
                }),
                (i.onBufferCodecs = function (e) {
                  var t = this;
                  Object.keys(this.sourceBuffer).length ||
                    (Object.keys(e).forEach(function (a) {
                      t.pendingTracks[a] = e[a];
                    }),
                    (this.bufferCodecEventsExpected = Math.max(
                      this.bufferCodecEventsExpected - 1,
                      0
                    )),
                    this.mediaSource &&
                      this.mediaSource.readyState === "open" &&
                      this.checkPendingTracks());
                }),
                (i.createSourceBuffers = function (e) {
                  var t = this.sourceBuffer,
                    a = this.mediaSource;
                  if (!a)
                    throw Error(
                      "createSourceBuffers called when mediaSource was null"
                    );
                  for (var s in e)
                    if (!t[s]) {
                      var l = e[s];
                      if (!l)
                        throw Error(
                          "source buffer exists for track " +
                            s +
                            ", however track does not"
                        );
                      var u = l.levelCodec || l.codec,
                        d = l.container + ";codecs=" + u;
                      c.logger.log("creating sourceBuffer(" + d + ")");
                      try {
                        var v = (t[s] = a.addSourceBuffer(d));
                        v.addEventListener("updateend", this._onSBUpdateEnd),
                          v.addEventListener("error", this._onSBUpdateError),
                          (this.tracks[s] = {
                            buffer: v,
                            codec: u,
                            id: l.id,
                            container: l.container,
                            levelCodec: l.levelCodec,
                          });
                      } catch (p) {
                        c.logger.error(
                          "error while trying to add sourceBuffer:" + p.message
                        ),
                          this.hls.trigger(h.default.ERROR, {
                            type: D.ErrorTypes.MEDIA_ERROR,
                            details: D.ErrorDetails.BUFFER_ADD_CODEC_ERROR,
                            fatal: !1,
                            err: p,
                            mimeType: d,
                          });
                      }
                    }
                  this.hls.trigger(h.default.BUFFER_CREATED, {
                    tracks: this.tracks,
                  });
                }),
                (i.onBufferAppending = function (e) {
                  this._needsFlush ||
                    (this.segments
                      ? this.segments.push(e)
                      : (this.segments = [e]),
                    this.doAppending());
                }),
                (i.onBufferEos = function (e) {
                  for (var t in this.sourceBuffer)
                    if (!e.type || e.type === t) {
                      var a = this.sourceBuffer[t];
                      a &&
                        !a.ended &&
                        ((a.ended = !0),
                        c.logger.log(t + " sourceBuffer now EOS"));
                    }
                  this.checkEos();
                }),
                (i.checkEos = function () {
                  var e = this.sourceBuffer,
                    t = this.mediaSource;
                  if (!t || t.readyState !== "open") {
                    this._needsEos = !1;
                    return;
                  }
                  for (var a in e) {
                    var s = e[a];
                    if (s) {
                      if (!s.ended) return;
                      if (s.updating) {
                        this._needsEos = !0;
                        return;
                      }
                    }
                  }
                  c.logger.log(
                    "all media data are available, signal endOfStream() to MediaSource and stop loading fragment"
                  );
                  try {
                    t.endOfStream();
                  } catch {
                    c.logger.warn(
                      "exception while calling mediaSource.endOfStream()"
                    );
                  }
                  this._needsEos = !1;
                }),
                (i.onBufferFlushing = function (e) {
                  e.type
                    ? this.flushRange.push({
                        start: e.startOffset,
                        end: e.endOffset,
                        type: e.type,
                      })
                    : (this.flushRange.push({
                        start: e.startOffset,
                        end: e.endOffset,
                        type: "video",
                      }),
                      this.flushRange.push({
                        start: e.startOffset,
                        end: e.endOffset,
                        type: "audio",
                      })),
                    (this.flushBufferCounter = 0),
                    this.doFlush();
                }),
                (i.flushLiveBackBuffer = function () {
                  if (this._live) {
                    var e = this.config.liveBackBufferLength;
                    if (!(!isFinite(e) || e < 0)) {
                      if (!this.media) {
                        c.logger.error(
                          "flushLiveBackBuffer called without attaching media"
                        );
                        return;
                      }
                      for (
                        var t = this.media.currentTime,
                          a = this.sourceBuffer,
                          s = Object.keys(a),
                          l = t - Math.max(e, this._levelTargetDuration),
                          u = s.length - 1;
                        u >= 0;
                        u--
                      ) {
                        var d = s[u],
                          v = a[d];
                        if (v) {
                          var p = v.buffered;
                          p.length > 0 &&
                            l > p.start(0) &&
                            this.removeBufferRange(d, v, 0, l) &&
                            this.hls.trigger(
                              h.default.LIVE_BACK_BUFFER_REACHED,
                              { bufferEnd: l }
                            );
                        }
                      }
                    }
                  }
                }),
                (i.onLevelUpdated = function (e) {
                  var t = e.details;
                  t.fragments.length > 0 &&
                    ((this._levelDuration =
                      t.totalduration + t.fragments[0].start),
                    (this._levelTargetDuration =
                      t.averagetargetduration || t.targetduration || 10),
                    (this._live = t.live),
                    this.updateMediaElementDuration());
                }),
                (i.updateMediaElementDuration = function () {
                  var e = this.config,
                    t;
                  if (
                    !(
                      this._levelDuration === null ||
                      !this.media ||
                      !this.mediaSource ||
                      !this.sourceBuffer ||
                      this.media.readyState === 0 ||
                      this.mediaSource.readyState !== "open"
                    )
                  ) {
                    for (var a in this.sourceBuffer) {
                      var s = this.sourceBuffer[a];
                      if (s && s.updating === !0) return;
                    }
                    (t = this.media.duration),
                      this._msDuration === null &&
                        (this._msDuration = this.mediaSource.duration),
                      this._live === !0 && e.liveDurationInfinity === !0
                        ? (c.logger.log(
                            "Media Source duration is set to Infinity"
                          ),
                          (this._msDuration = this.mediaSource.duration =
                            1 / 0))
                        : ((this._levelDuration > this._msDuration &&
                            this._levelDuration > t) ||
                            !Object(ee.isFiniteNumber)(t)) &&
                          (c.logger.log(
                            "Updating Media Source duration to " +
                              this._levelDuration.toFixed(3)
                          ),
                          (this._msDuration = this.mediaSource.duration =
                            this._levelDuration));
                  }
                }),
                (i.doFlush = function () {
                  for (; this.flushRange.length; ) {
                    var e = this.flushRange[0];
                    if (this.flushBuffer(e.start, e.end, e.type))
                      this.flushRange.shift(), (this.flushBufferCounter = 0);
                    else {
                      this._needsFlush = !0;
                      return;
                    }
                  }
                  if (this.flushRange.length === 0) {
                    this._needsFlush = !1;
                    var t = 0,
                      a = this.sourceBuffer;
                    try {
                      for (var s in a) {
                        var l = a[s];
                        l && (t += l.buffered.length);
                      }
                    } catch {
                      c.logger.error(
                        "error while accessing sourceBuffer.buffered"
                      );
                    }
                    (this.appended = t),
                      this.hls.trigger(h.default.BUFFER_FLUSHED);
                  }
                }),
                (i.doAppending = function () {
                  var e = this.config,
                    t = this.hls,
                    a = this.segments,
                    s = this.sourceBuffer;
                  if (Object.keys(s).length) {
                    if (!this.media || this.media.error) {
                      (this.segments = []),
                        c.logger.error(
                          "trying to append although a media error occured, flush segment and abort"
                        );
                      return;
                    }
                    if (!this.appending) {
                      var l = a.shift();
                      if (l)
                        try {
                          var u = s[l.type];
                          if (!u) {
                            this._onSBUpdateEnd();
                            return;
                          }
                          if (u.updating) {
                            a.unshift(l);
                            return;
                          }
                          (u.ended = !1),
                            (this.parent = l.parent),
                            u.appendBuffer(l.data),
                            (this.appendError = 0),
                            this.appended++,
                            (this.appending = !0);
                        } catch (v) {
                          c.logger.error(
                            "error while trying to append buffer:" + v.message
                          ),
                            a.unshift(l);
                          var d = {
                            type: D.ErrorTypes.MEDIA_ERROR,
                            parent: l.parent,
                            details: "",
                            fatal: !1,
                          };
                          v.code === 22
                            ? ((this.segments = []),
                              (d.details = D.ErrorDetails.BUFFER_FULL_ERROR))
                            : (this.appendError++,
                              (d.details = D.ErrorDetails.BUFFER_APPEND_ERROR),
                              this.appendError > e.appendErrorMaxRetry &&
                                (c.logger.log(
                                  "fail " +
                                    e.appendErrorMaxRetry +
                                    " times to append segment in sourceBuffer"
                                ),
                                (this.segments = []),
                                (d.fatal = !0))),
                            t.trigger(h.default.ERROR, d);
                        }
                    }
                  }
                }),
                (i.flushBuffer = function (e, t, a) {
                  var s = this.sourceBuffer;
                  if (!Object.keys(s).length) return !0;
                  var l = "null";
                  if (
                    (this.media && (l = this.media.currentTime.toFixed(3)),
                    c.logger.log(
                      "flushBuffer,pos/start/end: " + l + "/" + e + "/" + t
                    ),
                    this.flushBufferCounter >= this.appended)
                  )
                    return c.logger.warn("abort flushing too many retries"), !0;
                  var u = s[a];
                  if (u) {
                    if (((u.ended = !1), u.updating))
                      return (
                        c.logger.warn("cannot flush, sb updating in progress"),
                        !1
                      );
                    if (this.removeBufferRange(a, u, e, t))
                      return this.flushBufferCounter++, !1;
                  }
                  return c.logger.log("buffer flushed"), !0;
                }),
                (i.removeBufferRange = function (e, t, a, s) {
                  try {
                    for (var l = 0; l < t.buffered.length; l++) {
                      var u = t.buffered.start(l),
                        d = t.buffered.end(l),
                        v = Math.max(u, a),
                        p = Math.min(d, s);
                      if (Math.min(p, d) - v > 0.5) {
                        var R = "null";
                        return (
                          this.media && (R = this.media.currentTime.toString()),
                          c.logger.log(
                            "sb remove " +
                              e +
                              " [" +
                              v +
                              "," +
                              p +
                              "], of [" +
                              u +
                              "," +
                              d +
                              "], pos:" +
                              R
                          ),
                          t.remove(v, p),
                          !0
                        );
                      }
                    }
                  } catch (O) {
                    c.logger.warn("removeBufferRange failed", O);
                  }
                  return !1;
                }),
                n
              );
            })(S),
            fi = ui;
          function _r(o, n) {
            for (var i = 0; i < n.length; i++) {
              var r = n[i];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                "value" in r && (r.writable = !0),
                Object.defineProperty(o, r.key, r);
            }
          }
          function di(o, n, i) {
            return n && _r(o.prototype, n), i && _r(o, i), o;
          }
          function hi(o, n) {
            (o.prototype = Object.create(n.prototype)),
              (o.prototype.constructor = o),
              (o.__proto__ = n);
          }
          var ci = (function (o) {
              hi(n, o);
              function n(r) {
                var e;
                return (
                  (e =
                    o.call(
                      this,
                      r,
                      h.default.FPS_DROP_LEVEL_CAPPING,
                      h.default.MEDIA_ATTACHING,
                      h.default.MANIFEST_PARSED,
                      h.default.LEVELS_UPDATED,
                      h.default.BUFFER_CODECS,
                      h.default.MEDIA_DETACHING
                    ) || this),
                  (e.autoLevelCapping = Number.POSITIVE_INFINITY),
                  (e.firstLevel = null),
                  (e.levels = []),
                  (e.media = null),
                  (e.restrictedLevels = []),
                  (e.timer = null),
                  (e.clientRect = null),
                  e
                );
              }
              var i = n.prototype;
              return (
                (i.destroy = function () {
                  this.hls.config.capLevelToPlayerSize &&
                    ((this.media = null),
                    (this.clientRect = null),
                    this.stopCapping());
                }),
                (i.onFpsDropLevelCapping = function (e) {
                  n.isLevelAllowed(e.droppedLevel, this.restrictedLevels) &&
                    this.restrictedLevels.push(e.droppedLevel);
                }),
                (i.onMediaAttaching = function (e) {
                  this.media =
                    e.media instanceof window.HTMLVideoElement ? e.media : null;
                }),
                (i.onManifestParsed = function (e) {
                  var t = this.hls;
                  (this.restrictedLevels = []),
                    (this.levels = e.levels),
                    (this.firstLevel = e.firstLevel),
                    t.config.capLevelToPlayerSize &&
                      e.video &&
                      this.startCapping();
                }),
                (i.onBufferCodecs = function (e) {
                  var t = this.hls;
                  t.config.capLevelToPlayerSize &&
                    e.video &&
                    this.startCapping();
                }),
                (i.onLevelsUpdated = function (e) {
                  this.levels = e.levels;
                }),
                (i.onMediaDetaching = function () {
                  this.stopCapping();
                }),
                (i.detectPlayerSize = function () {
                  if (this.media) {
                    var e = this.levels ? this.levels.length : 0;
                    if (e) {
                      var t = this.hls;
                      (t.autoLevelCapping = this.getMaxLevel(e - 1)),
                        t.autoLevelCapping > this.autoLevelCapping &&
                          t.streamController.nextLevelSwitch(),
                        (this.autoLevelCapping = t.autoLevelCapping);
                    }
                  }
                }),
                (i.getMaxLevel = function (e) {
                  var t = this;
                  if (!this.levels) return -1;
                  var a = this.levels.filter(function (s, l) {
                    return n.isLevelAllowed(l, t.restrictedLevels) && l <= e;
                  });
                  return (
                    (this.clientRect = null),
                    n.getMaxLevelByMediaSize(
                      a,
                      this.mediaWidth,
                      this.mediaHeight
                    )
                  );
                }),
                (i.startCapping = function () {
                  this.timer ||
                    ((this.autoLevelCapping = Number.POSITIVE_INFINITY),
                    (this.hls.firstLevel = this.getMaxLevel(this.firstLevel)),
                    clearInterval(this.timer),
                    (this.timer = setInterval(
                      this.detectPlayerSize.bind(this),
                      1e3
                    )),
                    this.detectPlayerSize());
                }),
                (i.stopCapping = function () {
                  (this.restrictedLevels = []),
                    (this.firstLevel = null),
                    (this.autoLevelCapping = Number.POSITIVE_INFINITY),
                    this.timer &&
                      ((this.timer = clearInterval(this.timer)),
                      (this.timer = null));
                }),
                (i.getDimensions = function () {
                  if (this.clientRect) return this.clientRect;
                  var e = this.media,
                    t = { width: 0, height: 0 };
                  if (e) {
                    var a = e.getBoundingClientRect();
                    (t.width = a.width),
                      (t.height = a.height),
                      !t.width &&
                        !t.height &&
                        ((t.width = a.right - a.left || e.width || 0),
                        (t.height = a.bottom - a.top || e.height || 0));
                  }
                  return (this.clientRect = t), t;
                }),
                (n.isLevelAllowed = function (e, t) {
                  return t === void 0 && (t = []), t.indexOf(e) === -1;
                }),
                (n.getMaxLevelByMediaSize = function (e, t, a) {
                  if (!e || (e && !e.length)) return -1;
                  for (
                    var s = function (p, R) {
                        return R
                          ? p.width !== R.width || p.height !== R.height
                          : !0;
                      },
                      l = e.length - 1,
                      u = 0;
                    u < e.length;
                    u += 1
                  ) {
                    var d = e[u];
                    if ((d.width >= t || d.height >= a) && s(d, e[u + 1])) {
                      l = u;
                      break;
                    }
                  }
                  return l;
                }),
                di(
                  n,
                  [
                    {
                      key: "mediaWidth",
                      get: function () {
                        return (
                          this.getDimensions().width * n.contentScaleFactor
                        );
                      },
                    },
                    {
                      key: "mediaHeight",
                      get: function () {
                        return (
                          this.getDimensions().height * n.contentScaleFactor
                        );
                      },
                    },
                  ],
                  [
                    {
                      key: "contentScaleFactor",
                      get: function () {
                        var e = 1;
                        try {
                          e = window.devicePixelRatio;
                        } catch {}
                        return e;
                      },
                    },
                  ]
                ),
                n
              );
            })(S),
            gi = ci;
          function vi(o, n) {
            (o.prototype = Object.create(n.prototype)),
              (o.prototype.constructor = o),
              (o.__proto__ = n);
          }
          var pi = window,
            mi = pi.performance,
            xi = (function (o) {
              vi(n, o);
              function n(r) {
                return o.call(this, r, h.default.MEDIA_ATTACHING) || this;
              }
              var i = n.prototype;
              return (
                (i.destroy = function () {
                  this.timer && clearInterval(this.timer),
                    (this.isVideoPlaybackQualityAvailable = !1);
                }),
                (i.onMediaAttaching = function (e) {
                  var t = this.hls.config;
                  if (t.capLevelOnFPSDrop) {
                    var a = (this.video =
                      e.media instanceof window.HTMLVideoElement
                        ? e.media
                        : null);
                    typeof a.getVideoPlaybackQuality == "function" &&
                      (this.isVideoPlaybackQualityAvailable = !0),
                      clearInterval(this.timer),
                      (this.timer = setInterval(
                        this.checkFPSInterval.bind(this),
                        t.fpsDroppedMonitoringPeriod
                      ));
                  }
                }),
                (i.checkFPS = function (e, t, a) {
                  var s = mi.now();
                  if (t) {
                    if (this.lastTime) {
                      var l = s - this.lastTime,
                        u = a - this.lastDroppedFrames,
                        d = t - this.lastDecodedFrames,
                        v = (1e3 * u) / l,
                        p = this.hls;
                      if (
                        (p.trigger(h.default.FPS_DROP, {
                          currentDropped: u,
                          currentDecoded: d,
                          totalDroppedFrames: a,
                        }),
                        v > 0 && u > p.config.fpsDroppedMonitoringThreshold * d)
                      ) {
                        var R = p.currentLevel;
                        c.logger.warn(
                          "drop FPS ratio greater than max allowed value for currentLevel: " +
                            R
                        ),
                          R > 0 &&
                            (p.autoLevelCapping === -1 ||
                              p.autoLevelCapping >= R) &&
                            ((R = R - 1),
                            p.trigger(h.default.FPS_DROP_LEVEL_CAPPING, {
                              level: R,
                              droppedLevel: p.currentLevel,
                            }),
                            (p.autoLevelCapping = R),
                            p.streamController.nextLevelSwitch());
                      }
                    }
                    (this.lastTime = s),
                      (this.lastDroppedFrames = a),
                      (this.lastDecodedFrames = t);
                  }
                }),
                (i.checkFPSInterval = function () {
                  var e = this.video;
                  if (e)
                    if (this.isVideoPlaybackQualityAvailable) {
                      var t = e.getVideoPlaybackQuality();
                      this.checkFPS(
                        e,
                        t.totalVideoFrames,
                        t.droppedVideoFrames
                      );
                    } else
                      this.checkFPS(
                        e,
                        e.webkitDecodedFrameCount,
                        e.webkitDroppedFrameCount
                      );
                }),
                n
              );
            })(S),
            yi = xi,
            Ei = (function () {
              function o(i) {
                i && i.xhrSetup && (this.xhrSetup = i.xhrSetup);
              }
              var n = o.prototype;
              return (
                (n.destroy = function () {
                  this.abort(), (this.loader = null);
                }),
                (n.abort = function () {
                  var r = this.loader;
                  r &&
                    r.readyState !== 4 &&
                    ((this.stats.aborted = !0), r.abort()),
                    window.clearTimeout(this.requestTimeout),
                    (this.requestTimeout = null),
                    window.clearTimeout(this.retryTimeout),
                    (this.retryTimeout = null);
                }),
                (n.load = function (r, e, t) {
                  (this.context = r),
                    (this.config = e),
                    (this.callbacks = t),
                    (this.stats = {
                      trequest: window.performance.now(),
                      retry: 0,
                    }),
                    (this.retryDelay = e.retryDelay),
                    this.loadInternal();
                }),
                (n.loadInternal = function () {
                  var r,
                    e = this.context;
                  r = this.loader = new window.XMLHttpRequest();
                  var t = this.stats;
                  (t.tfirst = 0), (t.loaded = 0);
                  var a = this.xhrSetup;
                  try {
                    if (a)
                      try {
                        a(r, e.url);
                      } catch {
                        r.open("GET", e.url, !0), a(r, e.url);
                      }
                    r.readyState || r.open("GET", e.url, !0);
                  } catch (s) {
                    this.callbacks.onError(
                      { code: r.status, text: s.message },
                      e,
                      r
                    );
                    return;
                  }
                  e.rangeEnd &&
                    r.setRequestHeader(
                      "Range",
                      "bytes=" + e.rangeStart + "-" + (e.rangeEnd - 1)
                    ),
                    (r.onreadystatechange = this.readystatechange.bind(this)),
                    (r.onprogress = this.loadprogress.bind(this)),
                    (r.responseType = e.responseType),
                    (this.requestTimeout = window.setTimeout(
                      this.loadtimeout.bind(this),
                      this.config.timeout
                    )),
                    r.send();
                }),
                (n.readystatechange = function (r) {
                  var e = r.currentTarget,
                    t = e.readyState,
                    a = this.stats,
                    s = this.context,
                    l = this.config;
                  if (!a.aborted && t >= 2)
                    if (
                      (window.clearTimeout(this.requestTimeout),
                      a.tfirst === 0 &&
                        (a.tfirst = Math.max(
                          window.performance.now(),
                          a.trequest
                        )),
                      t === 4)
                    ) {
                      var u = e.status;
                      if (u >= 200 && u < 300) {
                        a.tload = Math.max(a.tfirst, window.performance.now());
                        var d, v;
                        s.responseType === "arraybuffer"
                          ? ((d = e.response), (v = d.byteLength))
                          : ((d = e.responseText), (v = d.length)),
                          (a.loaded = a.total = v);
                        var p = { url: e.responseURL, data: d };
                        this.callbacks.onSuccess(p, a, s, e);
                      } else
                        a.retry >= l.maxRetry || (u >= 400 && u < 499)
                          ? (c.logger.error(u + " while loading " + s.url),
                            this.callbacks.onError(
                              { code: u, text: e.statusText },
                              s,
                              e
                            ))
                          : (c.logger.warn(
                              u +
                                " while loading " +
                                s.url +
                                ", retrying in " +
                                this.retryDelay +
                                "..."
                            ),
                            this.destroy(),
                            (this.retryTimeout = window.setTimeout(
                              this.loadInternal.bind(this),
                              this.retryDelay
                            )),
                            (this.retryDelay = Math.min(
                              2 * this.retryDelay,
                              l.maxRetryDelay
                            )),
                            a.retry++);
                    } else
                      this.requestTimeout = window.setTimeout(
                        this.loadtimeout.bind(this),
                        l.timeout
                      );
                }),
                (n.loadtimeout = function () {
                  c.logger.warn("timeout while loading " + this.context.url),
                    this.callbacks.onTimeout(this.stats, this.context, null);
                }),
                (n.loadprogress = function (r) {
                  var e = r.currentTarget,
                    t = this.stats;
                  (t.loaded = r.loaded),
                    r.lengthComputable && (t.total = r.total);
                  var a = this.callbacks.onProgress;
                  a && a(t, this.context, null, e);
                }),
                o
              );
            })(),
            Ti = Ei;
          function Si(o, n) {
            for (var i = 0; i < n.length; i++) {
              var r = n[i];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                "value" in r && (r.writable = !0),
                Object.defineProperty(o, r.key, r);
            }
          }
          function _i(o, n, i) {
            return n && Si(o.prototype, n), o;
          }
          function Ai(o, n) {
            (o.prototype = Object.create(n.prototype)),
              (o.prototype.constructor = o),
              (o.__proto__ = n);
          }
          var Ri = (function (o) {
              Ai(n, o);
              function n(r) {
                var e;
                return (
                  (e =
                    o.call(
                      this,
                      r,
                      h.default.MANIFEST_LOADING,
                      h.default.MANIFEST_PARSED,
                      h.default.AUDIO_TRACK_LOADED,
                      h.default.AUDIO_TRACK_SWITCHED,
                      h.default.LEVEL_LOADED,
                      h.default.ERROR
                    ) || this),
                  (e._trackId = -1),
                  (e._selectDefaultTrack = !0),
                  (e.tracks = []),
                  (e.trackIdBlacklist = Object.create(null)),
                  (e.audioGroupId = null),
                  e
                );
              }
              var i = n.prototype;
              return (
                (i.onManifestLoading = function () {
                  (this.tracks = []),
                    (this._trackId = -1),
                    (this._selectDefaultTrack = !0);
                }),
                (i.onManifestParsed = function (e) {
                  var t = (this.tracks = e.audioTracks || []);
                  this.hls.trigger(h.default.AUDIO_TRACKS_UPDATED, {
                    audioTracks: t,
                  }),
                    this._selectAudioGroup(this.hls.nextLoadLevel);
                }),
                (i.onAudioTrackLoaded = function (e) {
                  if (e.id >= this.tracks.length) {
                    c.logger.warn("Invalid audio track id:", e.id);
                    return;
                  }
                  if (
                    (c.logger.log("audioTrack " + e.id + " loaded"),
                    (this.tracks[e.id].details = e.details),
                    e.details.live && !this.hasInterval())
                  ) {
                    var t = e.details.targetduration * 1e3;
                    this.setInterval(t);
                  }
                  !e.details.live && this.hasInterval() && this.clearInterval();
                }),
                (i.onAudioTrackSwitched = function (e) {
                  var t = this.tracks[e.id].groupId;
                  t && this.audioGroupId !== t && (this.audioGroupId = t);
                }),
                (i.onLevelLoaded = function (e) {
                  this._selectAudioGroup(e.level);
                }),
                (i.onError = function (e) {
                  e.type === D.ErrorTypes.NETWORK_ERROR &&
                    (e.fatal && this.clearInterval(),
                    e.details === D.ErrorDetails.AUDIO_TRACK_LOAD_ERROR &&
                      (c.logger.warn(
                        "Network failure on audio-track id:",
                        e.context.id
                      ),
                      this._handleLoadError()));
                }),
                (i._setAudioTrack = function (e) {
                  if (
                    this._trackId === e &&
                    this.tracks[this._trackId].details
                  ) {
                    c.logger.debug(
                      "Same id as current audio-track passed, and track details available -> no-op"
                    );
                    return;
                  }
                  if (e < 0 || e >= this.tracks.length) {
                    c.logger.warn(
                      "Invalid id passed to audio-track controller"
                    );
                    return;
                  }
                  var t = this.tracks[e];
                  c.logger.log("Now switching to audio-track index " + e),
                    this.clearInterval(),
                    (this._trackId = e);
                  var a = t.url,
                    s = t.type,
                    l = t.id;
                  this.hls.trigger(h.default.AUDIO_TRACK_SWITCHING, {
                    id: l,
                    type: s,
                    url: a,
                  }),
                    this._loadTrackDetailsIfNeeded(t);
                }),
                (i.doTick = function () {
                  this._updateTrack(this._trackId);
                }),
                (i._selectAudioGroup = function (e) {
                  var t = this.hls.levels[e];
                  if (!(!t || !t.audioGroupIds)) {
                    var a = t.audioGroupIds[t.urlId];
                    this.audioGroupId !== a &&
                      ((this.audioGroupId = a),
                      this._selectInitialAudioTrack());
                  }
                }),
                (i._selectInitialAudioTrack = function () {
                  var e = this,
                    t = this.tracks;
                  if (t.length) {
                    var a = this.tracks[this._trackId],
                      s = null;
                    if ((a && (s = a.name), this._selectDefaultTrack)) {
                      var l = t.filter(function (v) {
                        return v.default;
                      });
                      l.length
                        ? (t = l)
                        : c.logger.warn("No default audio tracks defined");
                    }
                    var u = !1,
                      d = function () {
                        t.forEach(function (p) {
                          u ||
                            ((!e.audioGroupId ||
                              p.groupId === e.audioGroupId) &&
                              (!s || s === p.name) &&
                              (e._setAudioTrack(p.id), (u = !0)));
                        });
                      };
                    d(),
                      u || ((s = null), d()),
                      u ||
                        (c.logger.error(
                          "No track found for running audio group-ID: " +
                            this.audioGroupId
                        ),
                        this.hls.trigger(h.default.ERROR, {
                          type: D.ErrorTypes.MEDIA_ERROR,
                          details: D.ErrorDetails.AUDIO_TRACK_LOAD_ERROR,
                          fatal: !0,
                        }));
                  }
                }),
                (i._needsTrackLoading = function (e) {
                  var t = e.details,
                    a = e.url;
                  return !t || t.live ? !!a : !1;
                }),
                (i._loadTrackDetailsIfNeeded = function (e) {
                  if (this._needsTrackLoading(e)) {
                    var t = e.url,
                      a = e.id;
                    c.logger.log("loading audio-track playlist for id: " + a),
                      this.hls.trigger(h.default.AUDIO_TRACK_LOADING, {
                        url: t,
                        id: a,
                      });
                  }
                }),
                (i._updateTrack = function (e) {
                  if (!(e < 0 || e >= this.tracks.length)) {
                    this.clearInterval(),
                      (this._trackId = e),
                      c.logger.log("trying to update audio-track " + e);
                    var t = this.tracks[e];
                    this._loadTrackDetailsIfNeeded(t);
                  }
                }),
                (i._handleLoadError = function () {
                  this.trackIdBlacklist[this._trackId] = !0;
                  var e = this._trackId,
                    t = this.tracks[e],
                    a = t.name,
                    s = t.language,
                    l = t.groupId;
                  c.logger.warn(
                    "Loading failed on audio track id: " +
                      e +
                      ", group-id: " +
                      l +
                      ', name/language: "' +
                      a +
                      '" / "' +
                      s +
                      '"'
                  );
                  for (var u = e, d = 0; d < this.tracks.length; d++)
                    if (!this.trackIdBlacklist[d]) {
                      var v = this.tracks[d];
                      if (v.name === a) {
                        u = d;
                        break;
                      }
                    }
                  if (u === e) {
                    c.logger.warn(
                      'No fallback audio-track found for name/language: "' +
                        a +
                        '" / "' +
                        s +
                        '"'
                    );
                    return;
                  }
                  c.logger.log(
                    "Attempting audio-track fallback id:",
                    u,
                    "group-id:",
                    this.tracks[u].groupId
                  ),
                    this._setAudioTrack(u);
                }),
                _i(n, [
                  {
                    key: "audioTracks",
                    get: function () {
                      return this.tracks;
                    },
                  },
                  {
                    key: "audioTrack",
                    get: function () {
                      return this._trackId;
                    },
                    set: function (e) {
                      this._setAudioTrack(e), (this._selectDefaultTrack = !1);
                    },
                  },
                ]),
                n
              );
            })(Et),
            bi = Ri;
          function Li(o, n) {
            for (var i = 0; i < n.length; i++) {
              var r = n[i];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                "value" in r && (r.writable = !0),
                Object.defineProperty(o, r.key, r);
            }
          }
          function Di(o, n, i) {
            return n && Li(o.prototype, n), o;
          }
          function Ii(o, n) {
            (o.prototype = Object.create(n.prototype)),
              (o.prototype.constructor = o),
              (o.__proto__ = n);
          }
          var wi = window,
            Yt = wi.performance,
            Ar = 100,
            Fi = (function (o) {
              Ii(n, o);
              function n(r, e) {
                var t;
                return (
                  (t =
                    o.call(
                      this,
                      r,
                      h.default.MEDIA_ATTACHED,
                      h.default.MEDIA_DETACHING,
                      h.default.AUDIO_TRACKS_UPDATED,
                      h.default.AUDIO_TRACK_SWITCHING,
                      h.default.AUDIO_TRACK_LOADED,
                      h.default.KEY_LOADED,
                      h.default.FRAG_LOADED,
                      h.default.FRAG_PARSING_INIT_SEGMENT,
                      h.default.FRAG_PARSING_DATA,
                      h.default.FRAG_PARSED,
                      h.default.ERROR,
                      h.default.BUFFER_RESET,
                      h.default.BUFFER_CREATED,
                      h.default.BUFFER_APPENDED,
                      h.default.BUFFER_FLUSHED,
                      h.default.INIT_PTS_FOUND
                    ) || this),
                  (t.fragmentTracker = e),
                  (t.config = r.config),
                  (t.audioCodecSwap = !1),
                  (t._state = P.STOPPED),
                  (t.initPTS = []),
                  (t.waitingFragment = null),
                  (t.videoTrackCC = null),
                  (t.waitingVideoCC = null),
                  t
                );
              }
              var i = n.prototype;
              return (
                (i.onInitPtsFound = function (e) {
                  var t = e.id,
                    a = e.frag.cc,
                    s = e.initPTS;
                  t === "main" &&
                    ((this.initPTS[a] = s),
                    (this.videoTrackCC = a),
                    c.logger.log(
                      "InitPTS for cc: " + a + " found from main: " + s
                    ),
                    this.state === P.WAITING_INIT_PTS && this.tick());
                }),
                (i.startLoad = function (e) {
                  if (this.tracks) {
                    var t = this.lastCurrentTime;
                    this.stopLoad(),
                      this.setInterval(Ar),
                      (this.fragLoadError = 0),
                      t > 0 && e === -1
                        ? (c.logger.log(
                            "audio:override startPosition with lastCurrentTime @" +
                              t.toFixed(3)
                          ),
                          (this.state = P.IDLE))
                        : ((this.lastCurrentTime = this.startPosition
                            ? this.startPosition
                            : e),
                          (this.state = P.STARTING)),
                      (this.nextLoadPosition = this.startPosition =
                        this.lastCurrentTime),
                      this.tick();
                  } else (this.startPosition = e), (this.state = P.STOPPED);
                }),
                (i.doTick = function () {
                  var e,
                    t,
                    a,
                    s = this.hls,
                    l = s.config;
                  switch (this.state) {
                    case P.ERROR:
                    case P.PAUSED:
                    case P.BUFFER_FLUSHING:
                      break;
                    case P.STARTING:
                      (this.state = P.WAITING_TRACK),
                        (this.loadedmetadata = !1);
                      break;
                    case P.IDLE:
                      var u = this.tracks;
                      if (
                        !u ||
                        (!this.media &&
                          (this.startFragRequested || !l.startFragPrefetch))
                      )
                        break;
                      if (this.loadedmetadata) e = this.media.currentTime;
                      else if (((e = this.nextLoadPosition), e === void 0))
                        break;
                      var d = this.mediaBuffer ? this.mediaBuffer : this.media,
                        v = this.videoBuffer ? this.videoBuffer : this.media,
                        p =
                          e < l.maxBufferHole
                            ? Math.max(lt, l.maxBufferHole)
                            : l.maxBufferHole,
                        R = x.bufferInfo(d, e, p),
                        O = x.bufferInfo(v, e, p),
                        j = R.len,
                        q = R.end,
                        ne = this.fragPrevious,
                        re = Math.min(l.maxBufferLength, l.maxMaxBufferLength),
                        ue = Math.max(re, O.len),
                        de = this.audioSwitch,
                        ye = this.trackId;
                      if ((j < ue || de) && ye < u.length) {
                        if (((a = u[ye].details), typeof a > "u")) {
                          this.state = P.WAITING_TRACK;
                          break;
                        }
                        if (!de && this._streamEnded(R, a)) {
                          this.hls.trigger(h.default.BUFFER_EOS, {
                            type: "audio",
                          }),
                            (this.state = P.ENDED);
                          return;
                        }
                        var Ue = a.fragments,
                          ft = Ue.length,
                          Qe = Ue[0].start,
                          Rt = Ue[ft - 1].start + Ue[ft - 1].duration,
                          oe;
                        if (de) {
                          if (a.live && !a.PTSKnown)
                            c.logger.log(
                              "switching audiotrack, live stream, unknown PTS,load first fragment"
                            ),
                              (q = 0);
                          else if (((q = e), a.PTSKnown && e < Qe))
                            if (R.end > Qe || R.nextStart)
                              c.logger.log(
                                "alt audio track ahead of main track, seek to start of alt audio track"
                              ),
                                (this.media.currentTime = Qe + 0.05);
                            else return;
                        }
                        if (a.initSegment && !a.initSegment.data)
                          oe = a.initSegment;
                        else if (q <= Qe) {
                          if (
                            ((oe = Ue[0]),
                            this.videoTrackCC !== null &&
                              oe.cc !== this.videoTrackCC &&
                              (oe = Re(Ue, this.videoTrackCC)),
                            a.live &&
                              oe.loadIdx &&
                              oe.loadIdx === this.fragLoadIdx)
                          ) {
                            var ve = R.nextStart ? R.nextStart : Qe;
                            c.logger.log(
                              "no alt audio available @currentTime:" +
                                this.media.currentTime +
                                ", seeking @" +
                                (ve + 0.05)
                            ),
                              (this.media.currentTime = ve + 0.05);
                            return;
                          }
                        } else {
                          var je,
                            Gt = l.maxFragLookUpTolerance,
                            Kt = ne ? Ue[ne.sn - Ue[0].sn + 1] : void 0;
                          q < Rt
                            ? (q > Rt - Gt && (Gt = 0),
                              Kt && !Ce(q, Gt, Kt)
                                ? (je = Kt)
                                : (je = L.search(Ue, function (La) {
                                    return Ce(q, Gt, La);
                                  })))
                            : (je = Ue[ft - 1]),
                            je &&
                              ((oe = je),
                              (Qe = je.start),
                              ne &&
                                oe.level === ne.level &&
                                oe.sn === ne.sn &&
                                (oe.sn < a.endSN
                                  ? ((oe = Ue[oe.sn + 1 - a.startSN]),
                                    this.fragmentTracker.getState(oe) !==
                                      Ye.OK &&
                                      c.logger.log(
                                        "SN just loaded, load next one: " +
                                          oe.sn
                                      ))
                                  : (oe = null)));
                        }
                        oe &&
                          (oe.encrypted
                            ? (c.logger.log(
                                "Loading key for " +
                                  oe.sn +
                                  " of [" +
                                  a.startSN +
                                  " ," +
                                  a.endSN +
                                  "],track " +
                                  ye
                              ),
                              (this.state = P.KEY_LOADING),
                              s.trigger(h.default.KEY_LOADING, { frag: oe }))
                            : ((this.fragCurrent = oe),
                              (de ||
                                this.fragmentTracker.getState(oe) ===
                                  Ye.NOT_LOADED) &&
                                (c.logger.log(
                                  "Loading " +
                                    oe.sn +
                                    ", cc: " +
                                    oe.cc +
                                    " of [" +
                                    a.startSN +
                                    " ," +
                                    a.endSN +
                                    "],track " +
                                    ye +
                                    ", " +
                                    (this.loadedmetadata
                                      ? "currentTime"
                                      : "nextLoadPosition") +
                                    ": " +
                                    e +
                                    ", bufferEnd: " +
                                    q.toFixed(3)
                                ),
                                oe.sn !== "initSegment" &&
                                  (this.startFragRequested = !0),
                                Object(ee.isFiniteNumber)(oe.sn) &&
                                  (this.nextLoadPosition =
                                    oe.start + oe.duration),
                                s.trigger(h.default.FRAG_LOADING, { frag: oe }),
                                (this.state = P.FRAG_LOADING))));
                      }
                      break;
                    case P.WAITING_TRACK:
                      (t = this.tracks[this.trackId]),
                        t && t.details && (this.state = P.IDLE);
                      break;
                    case P.FRAG_LOADING_WAITING_RETRY:
                      var Xt = Yt.now(),
                        nr = this.retryDate;
                      d = this.media;
                      var Ra = d && d.seeking;
                      (!nr || Xt >= nr || Ra) &&
                        (c.logger.log(
                          "audioStreamController: retryDate reached, switch back to IDLE state"
                        ),
                        (this.state = P.IDLE));
                      break;
                    case P.WAITING_INIT_PTS:
                      var zt = this.waitingFragment;
                      if (zt) {
                        var xr = zt.frag.cc;
                        if (this.initPTS[xr] !== void 0)
                          (this.waitingFragment = null),
                            (this.state = P.FRAG_LOADING),
                            this.onFragLoaded(zt);
                        else if (this.videoTrackCC !== this.waitingVideoCC)
                          c.logger.log(
                            "Waiting fragment cc (" +
                              xr +
                              ") cancelled because video is at cc " +
                              this.videoTrackCC
                          ),
                            this.clearWaitingFragment();
                        else {
                          var Xr = x.bufferInfo(
                              this.mediaBuffer,
                              this.media.currentTime,
                              l.maxBufferHole
                            ),
                            ba = Ce(Xr.end, l.maxFragLookUpTolerance, zt.frag);
                          ba < 0 &&
                            (c.logger.log(
                              "Waiting fragment cc (" +
                                xr +
                                ") @ " +
                                zt.frag.start +
                                " cancelled because another fragment at " +
                                Xr.end +
                                " is needed"
                            ),
                            this.clearWaitingFragment());
                        }
                      } else this.state = P.IDLE;
                      break;
                  }
                }),
                (i.clearWaitingFragment = function () {
                  var e = this.waitingFragment;
                  e &&
                    (this.fragmentTracker.removeFragment(e.frag),
                    (this.waitingFragment = null),
                    (this.waitingVideoCC = null),
                    (this.state = P.IDLE));
                }),
                (i.onMediaAttached = function (e) {
                  var t = (this.media = this.mediaBuffer = e.media);
                  (this.onvseeking = this.onMediaSeeking.bind(this)),
                    (this.onvended = this.onMediaEnded.bind(this)),
                    t.addEventListener("seeking", this.onvseeking),
                    t.addEventListener("ended", this.onvended);
                  var a = this.config;
                  this.tracks &&
                    a.autoStartLoad &&
                    this.startLoad(a.startPosition);
                }),
                (i.onMediaDetaching = function () {
                  var e = this.media;
                  e &&
                    e.ended &&
                    (c.logger.log(
                      "MSE detaching and video ended, reset startPosition"
                    ),
                    (this.startPosition = this.lastCurrentTime = 0)),
                    e &&
                      (e.removeEventListener("seeking", this.onvseeking),
                      e.removeEventListener("ended", this.onvended),
                      (this.onvseeking =
                        this.onvseeked =
                        this.onvended =
                          null)),
                    (this.media = this.mediaBuffer = this.videoBuffer = null),
                    (this.loadedmetadata = !1),
                    this.fragmentTracker.removeAllFragments(),
                    this.stopLoad();
                }),
                (i.onAudioTracksUpdated = function (e) {
                  c.logger.log("audio tracks updated"),
                    (this.tracks = e.audioTracks);
                }),
                (i.onAudioTrackSwitching = function (e) {
                  var t = !!e.url;
                  (this.trackId = e.id),
                    (this.fragCurrent = null),
                    this.clearWaitingFragment(),
                    (this.state = P.PAUSED),
                    t
                      ? this.setInterval(Ar)
                      : this.demuxer &&
                        (this.demuxer.destroy(), (this.demuxer = null)),
                    t && ((this.audioSwitch = !0), (this.state = P.IDLE)),
                    this.tick();
                }),
                (i.onAudioTrackLoaded = function (e) {
                  var t = e.details,
                    a = e.id,
                    s = this.tracks[a],
                    l = s.details,
                    u = t.totalduration,
                    d = 0;
                  if (
                    (c.logger.log(
                      "track " +
                        a +
                        " loaded [" +
                        t.startSN +
                        "," +
                        t.endSN +
                        "],duration:" +
                        u
                    ),
                    t.live || (l && l.live)
                      ? l && t.fragments.length > 0
                        ? (se(l, t),
                          (d = t.fragments[0].start),
                          t.PTSKnown
                            ? c.logger.log(
                                "live audio playlist sliding:" + d.toFixed(3)
                              )
                            : c.logger.log(
                                "live audio playlist - outdated PTS, unknown sliding"
                              ))
                        : ((t.PTSKnown = !1),
                          c.logger.log(
                            "live audio playlist - first load, unknown sliding"
                          ))
                      : (t.PTSKnown = !1),
                    (s.details = t),
                    !this.startFragRequested)
                  ) {
                    if (this.startPosition === -1) {
                      var v = t.startTimeOffset;
                      Object(ee.isFiniteNumber)(v)
                        ? (c.logger.log(
                            "start time offset found in playlist, adjust startPosition to " +
                              v
                          ),
                          (this.startPosition = v))
                        : t.live
                        ? ((this.startPosition = this.computeLivePosition(
                            d,
                            t
                          )),
                          c.logger.log(
                            "compute startPosition for audio-track to " +
                              this.startPosition
                          ))
                        : (this.startPosition = 0);
                    }
                    this.nextLoadPosition = this.startPosition;
                  }
                  this.state === P.WAITING_TRACK && (this.state = P.IDLE),
                    this.tick();
                }),
                (i.onKeyLoaded = function () {
                  this.state === P.KEY_LOADING &&
                    ((this.state = P.IDLE), this.tick());
                }),
                (i.onFragLoaded = function (e) {
                  var t = this.fragCurrent,
                    a = e.frag;
                  if (
                    this.state === P.FRAG_LOADING &&
                    t &&
                    a.type === "audio" &&
                    a.level === t.level &&
                    a.sn === t.sn
                  ) {
                    var s = this.tracks[this.trackId],
                      l = s.details,
                      u = l.totalduration,
                      d = t.level,
                      v = t.sn,
                      p = t.cc,
                      R =
                        this.config.defaultAudioCodec ||
                        s.audioCodec ||
                        "mp4a.40.2",
                      O = (this.stats = e.stats);
                    if (v === "initSegment")
                      (this.state = P.IDLE),
                        (O.tparsed = O.tbuffered = Yt.now()),
                        (l.initSegment.data = e.payload),
                        this.hls.trigger(h.default.FRAG_BUFFERED, {
                          stats: O,
                          frag: t,
                          id: "audio",
                        }),
                        this.tick();
                    else {
                      (this.state = P.PARSING),
                        (this.appended = !1),
                        this.demuxer ||
                          (this.demuxer = new X(this.hls, "audio"));
                      var j = this.initPTS[p],
                        q = l.initSegment ? l.initSegment.data : [];
                      if (j !== void 0) {
                        (this.pendingBuffering = !0),
                          c.logger.log(
                            "Demuxing " +
                              v +
                              " of [" +
                              l.startSN +
                              " ," +
                              l.endSN +
                              "],track " +
                              d
                          );
                        var ne = !1;
                        this.demuxer.push(e.payload, q, R, null, t, u, ne, j);
                      } else
                        c.logger.log(
                          "Unknown video PTS for cc " +
                            p +
                            ", waiting for video PTS before demuxing audio frag " +
                            v +
                            " of [" +
                            l.startSN +
                            " ," +
                            l.endSN +
                            "],track " +
                            d
                        ),
                          (this.waitingFragment = e),
                          (this.waitingVideoCC = this.videoTrackCC),
                          (this.state = P.WAITING_INIT_PTS);
                    }
                  }
                  this.fragLoadError = 0;
                }),
                (i.onFragParsingInitSegment = function (e) {
                  var t = this.fragCurrent,
                    a = e.frag;
                  if (
                    t &&
                    e.id === "audio" &&
                    a.sn === t.sn &&
                    a.level === t.level &&
                    this.state === P.PARSING
                  ) {
                    var s = e.tracks,
                      l;
                    if ((s.video && delete s.video, (l = s.audio), l)) {
                      (l.levelCodec = l.codec),
                        (l.id = e.id),
                        this.hls.trigger(h.default.BUFFER_CODECS, s),
                        c.logger.log(
                          "audio track:audio,container:" +
                            l.container +
                            ",codecs[level/parsed]=[" +
                            l.levelCodec +
                            "/" +
                            l.codec +
                            "]"
                        );
                      var u = l.initSegment;
                      if (u) {
                        var d = {
                          type: "audio",
                          data: u,
                          parent: "audio",
                          content: "initSegment",
                        };
                        this.audioSwitch
                          ? (this.pendingData = [d])
                          : ((this.appended = !0),
                            (this.pendingBuffering = !0),
                            this.hls.trigger(h.default.BUFFER_APPENDING, d));
                      }
                      this.tick();
                    }
                  }
                }),
                (i.onFragParsingData = function (e) {
                  var t = this,
                    a = this.fragCurrent,
                    s = e.frag;
                  if (
                    a &&
                    e.id === "audio" &&
                    e.type === "audio" &&
                    s.sn === a.sn &&
                    s.level === a.level &&
                    this.state === P.PARSING
                  ) {
                    var l = this.trackId,
                      u = this.tracks[l],
                      d = this.hls;
                    Object(ee.isFiniteNumber)(e.endPTS) ||
                      ((e.endPTS = e.startPTS + a.duration),
                      (e.endDTS = e.startDTS + a.duration)),
                      a.addElementaryStream(Y.AUDIO),
                      c.logger.log(
                        "parsed " +
                          e.type +
                          ",PTS:[" +
                          e.startPTS.toFixed(3) +
                          "," +
                          e.endPTS.toFixed(3) +
                          "],DTS:[" +
                          e.startDTS.toFixed(3) +
                          "/" +
                          e.endDTS.toFixed(3) +
                          "],nb:" +
                          e.nb
                      ),
                      V(u.details, a, e.startPTS, e.endPTS);
                    var v = this.media,
                      p = !1;
                    if (this.audioSwitch)
                      if (v && v.readyState) {
                        var R = v.currentTime;
                        c.logger.log(
                          "switching audio track : currentTime:" + R
                        ),
                          R >= e.startPTS &&
                            (c.logger.log(
                              "switching audio track : flushing all audio"
                            ),
                            (this.state = P.BUFFER_FLUSHING),
                            d.trigger(h.default.BUFFER_FLUSHING, {
                              startOffset: 0,
                              endOffset: Number.POSITIVE_INFINITY,
                              type: "audio",
                            }),
                            (p = !0),
                            (this.audioSwitch = !1),
                            d.trigger(h.default.AUDIO_TRACK_SWITCHED, {
                              id: l,
                            }));
                      } else
                        (this.audioSwitch = !1),
                          d.trigger(h.default.AUDIO_TRACK_SWITCHED, { id: l });
                    var O = this.pendingData;
                    if (!O) {
                      c.logger.warn(
                        "Apparently attempt to enqueue media payload without codec initialization data upfront"
                      ),
                        d.trigger(h.default.ERROR, {
                          type: D.ErrorTypes.MEDIA_ERROR,
                          details: null,
                          fatal: !0,
                        });
                      return;
                    }
                    this.audioSwitch ||
                      ([e.data1, e.data2].forEach(function (j) {
                        j &&
                          j.length &&
                          O.push({
                            type: e.type,
                            data: j,
                            parent: "audio",
                            content: "data",
                          });
                      }),
                      !p &&
                        O.length &&
                        (O.forEach(function (j) {
                          t.state === P.PARSING &&
                            ((t.pendingBuffering = !0),
                            t.hls.trigger(h.default.BUFFER_APPENDING, j));
                        }),
                        (this.pendingData = []),
                        (this.appended = !0))),
                      this.tick();
                  }
                }),
                (i.onFragParsed = function (e) {
                  var t = this.fragCurrent,
                    a = e.frag;
                  t &&
                    e.id === "audio" &&
                    a.sn === t.sn &&
                    a.level === t.level &&
                    this.state === P.PARSING &&
                    ((this.stats.tparsed = Yt.now()),
                    (this.state = P.PARSED),
                    this._checkAppendedParsed());
                }),
                (i.onBufferReset = function () {
                  (this.mediaBuffer = this.videoBuffer = null),
                    (this.loadedmetadata = !1);
                }),
                (i.onBufferCreated = function (e) {
                  var t = e.tracks.audio;
                  t &&
                    ((this.mediaBuffer = t.buffer), (this.loadedmetadata = !0)),
                    e.tracks.video &&
                      (this.videoBuffer = e.tracks.video.buffer);
                }),
                (i.onBufferAppended = function (e) {
                  if (e.parent === "audio") {
                    var t = this.state;
                    (t === P.PARSING || t === P.PARSED) &&
                      ((this.pendingBuffering = e.pending > 0),
                      this._checkAppendedParsed());
                  }
                }),
                (i._checkAppendedParsed = function () {
                  if (
                    this.state === P.PARSED &&
                    (!this.appended || !this.pendingBuffering)
                  ) {
                    var e = this.fragCurrent,
                      t = this.stats,
                      a = this.hls;
                    if (e) {
                      (this.fragPrevious = e),
                        (t.tbuffered = Yt.now()),
                        a.trigger(h.default.FRAG_BUFFERED, {
                          stats: t,
                          frag: e,
                          id: "audio",
                        });
                      var s = this.mediaBuffer ? this.mediaBuffer : this.media;
                      s &&
                        c.logger.log(
                          "audio buffered : " + Ee.toString(s.buffered)
                        ),
                        this.audioSwitch &&
                          this.appended &&
                          ((this.audioSwitch = !1),
                          a.trigger(h.default.AUDIO_TRACK_SWITCHED, {
                            id: this.trackId,
                          })),
                        (this.state = P.IDLE);
                    }
                    this.tick();
                  }
                }),
                (i.onError = function (e) {
                  var t = e.frag;
                  if (!(t && t.type !== "audio"))
                    switch (e.details) {
                      case D.ErrorDetails.FRAG_LOAD_ERROR:
                      case D.ErrorDetails.FRAG_LOAD_TIMEOUT:
                        var a = e.frag;
                        if (a && a.type !== "audio") break;
                        if (!e.fatal) {
                          var s = this.fragLoadError;
                          s ? s++ : (s = 1);
                          var l = this.config;
                          if (s <= l.fragLoadingMaxRetry) {
                            this.fragLoadError = s;
                            var u = Math.min(
                              Math.pow(2, s - 1) * l.fragLoadingRetryDelay,
                              l.fragLoadingMaxRetryTimeout
                            );
                            c.logger.warn(
                              "AudioStreamController: frag loading failed, retry in " +
                                u +
                                " ms"
                            ),
                              (this.retryDate = Yt.now() + u),
                              (this.state = P.FRAG_LOADING_WAITING_RETRY);
                          } else
                            c.logger.error(
                              "AudioStreamController: " +
                                e.details +
                                " reaches max retry, redispatch as fatal ..."
                            ),
                              (e.fatal = !0),
                              (this.state = P.ERROR);
                        }
                        break;
                      case D.ErrorDetails.AUDIO_TRACK_LOAD_ERROR:
                      case D.ErrorDetails.AUDIO_TRACK_LOAD_TIMEOUT:
                      case D.ErrorDetails.KEY_LOAD_ERROR:
                      case D.ErrorDetails.KEY_LOAD_TIMEOUT:
                        this.state !== P.ERROR &&
                          ((this.state = e.fatal ? P.ERROR : P.IDLE),
                          c.logger.warn(
                            "AudioStreamController: " +
                              e.details +
                              " while loading frag, now switching to " +
                              this.state +
                              " state ..."
                          ));
                        break;
                      case D.ErrorDetails.BUFFER_FULL_ERROR:
                        if (
                          e.parent === "audio" &&
                          (this.state === P.PARSING || this.state === P.PARSED)
                        ) {
                          var d = this.mediaBuffer,
                            v = this.media.currentTime,
                            p =
                              d &&
                              x.isBuffered(d, v) &&
                              x.isBuffered(d, v + 0.5);
                          if (p) {
                            var R = this.config;
                            R.maxMaxBufferLength >= R.maxBufferLength &&
                              ((R.maxMaxBufferLength /= 2),
                              c.logger.warn(
                                "AudioStreamController: reduce max buffer length to " +
                                  R.maxMaxBufferLength +
                                  "s"
                              )),
                              (this.state = P.IDLE);
                          } else
                            c.logger.warn(
                              "AudioStreamController: buffer full error also media.currentTime is not buffered, flush audio buffer"
                            ),
                              (this.fragCurrent = null),
                              (this.state = P.BUFFER_FLUSHING),
                              this.hls.trigger(h.default.BUFFER_FLUSHING, {
                                startOffset: 0,
                                endOffset: Number.POSITIVE_INFINITY,
                                type: "audio",
                              });
                        }
                        break;
                    }
                }),
                (i.onBufferFlushed = function () {
                  var e = this,
                    t = this.pendingData;
                  t && t.length
                    ? (c.logger.log(
                        "AudioStreamController: appending pending audio data after buffer flushed"
                      ),
                      t.forEach(function (a) {
                        e.hls.trigger(h.default.BUFFER_APPENDING, a);
                      }),
                      (this.appended = !0),
                      (this.pendingData = []),
                      (this.state = P.PARSED))
                    : ((this.state = P.IDLE),
                      (this.fragPrevious = null),
                      this.tick());
                }),
                Di(n, [
                  {
                    key: "state",
                    set: function (e) {
                      if (this.state !== e) {
                        var t = this.state;
                        (this._state = e),
                          c.logger.log("audio stream:" + t + "->" + e);
                      }
                    },
                    get: function () {
                      return this._state;
                    },
                  },
                ]),
                n
              );
            })(nt),
            Oi = Fi,
            Rr = (function () {
              if (typeof window < "u" && window.VTTCue) return window.VTTCue;
              var o = "auto",
                n = { "": !0, lr: !0, rl: !0 },
                i = { start: !0, middle: !0, end: !0, left: !0, right: !0 };
              function r(s) {
                if (typeof s != "string") return !1;
                var l = n[s.toLowerCase()];
                return l ? s.toLowerCase() : !1;
              }
              function e(s) {
                if (typeof s != "string") return !1;
                var l = i[s.toLowerCase()];
                return l ? s.toLowerCase() : !1;
              }
              function t(s) {
                for (var l = 1; l < arguments.length; l++) {
                  var u = arguments[l];
                  for (var d in u) s[d] = u[d];
                }
                return s;
              }
              function a(s, l, u) {
                var d = this,
                  v = {};
                (v.enumerable = !0), (d.hasBeenReset = !1);
                var p = "",
                  R = !1,
                  O = s,
                  j = l,
                  q = u,
                  ne = null,
                  re = "",
                  ue = !0,
                  de = "auto",
                  ye = "start",
                  Ue = 50,
                  ft = "middle",
                  Qe = 50,
                  Rt = "middle";
                Object.defineProperty(
                  d,
                  "id",
                  t({}, v, {
                    get: function () {
                      return p;
                    },
                    set: function (ve) {
                      p = "" + ve;
                    },
                  })
                ),
                  Object.defineProperty(
                    d,
                    "pauseOnExit",
                    t({}, v, {
                      get: function () {
                        return R;
                      },
                      set: function (ve) {
                        R = !!ve;
                      },
                    })
                  ),
                  Object.defineProperty(
                    d,
                    "startTime",
                    t({}, v, {
                      get: function () {
                        return O;
                      },
                      set: function (ve) {
                        if (typeof ve != "number")
                          throw new TypeError(
                            "Start time must be set to a number."
                          );
                        (O = ve), (this.hasBeenReset = !0);
                      },
                    })
                  ),
                  Object.defineProperty(
                    d,
                    "endTime",
                    t({}, v, {
                      get: function () {
                        return j;
                      },
                      set: function (ve) {
                        if (typeof ve != "number")
                          throw new TypeError(
                            "End time must be set to a number."
                          );
                        (j = ve), (this.hasBeenReset = !0);
                      },
                    })
                  ),
                  Object.defineProperty(
                    d,
                    "text",
                    t({}, v, {
                      get: function () {
                        return q;
                      },
                      set: function (ve) {
                        (q = "" + ve), (this.hasBeenReset = !0);
                      },
                    })
                  ),
                  Object.defineProperty(
                    d,
                    "region",
                    t({}, v, {
                      get: function () {
                        return ne;
                      },
                      set: function (ve) {
                        (ne = ve), (this.hasBeenReset = !0);
                      },
                    })
                  ),
                  Object.defineProperty(
                    d,
                    "vertical",
                    t({}, v, {
                      get: function () {
                        return re;
                      },
                      set: function (ve) {
                        var je = r(ve);
                        if (je === !1)
                          throw new SyntaxError(
                            "An invalid or illegal string was specified."
                          );
                        (re = je), (this.hasBeenReset = !0);
                      },
                    })
                  ),
                  Object.defineProperty(
                    d,
                    "snapToLines",
                    t({}, v, {
                      get: function () {
                        return ue;
                      },
                      set: function (ve) {
                        (ue = !!ve), (this.hasBeenReset = !0);
                      },
                    })
                  ),
                  Object.defineProperty(
                    d,
                    "line",
                    t({}, v, {
                      get: function () {
                        return de;
                      },
                      set: function (ve) {
                        if (typeof ve != "number" && ve !== o)
                          throw new SyntaxError(
                            "An invalid number or illegal string was specified."
                          );
                        (de = ve), (this.hasBeenReset = !0);
                      },
                    })
                  ),
                  Object.defineProperty(
                    d,
                    "lineAlign",
                    t({}, v, {
                      get: function () {
                        return ye;
                      },
                      set: function (ve) {
                        var je = e(ve);
                        if (!je)
                          throw new SyntaxError(
                            "An invalid or illegal string was specified."
                          );
                        (ye = je), (this.hasBeenReset = !0);
                      },
                    })
                  ),
                  Object.defineProperty(
                    d,
                    "position",
                    t({}, v, {
                      get: function () {
                        return Ue;
                      },
                      set: function (ve) {
                        if (ve < 0 || ve > 100)
                          throw new Error(
                            "Position must be between 0 and 100."
                          );
                        (Ue = ve), (this.hasBeenReset = !0);
                      },
                    })
                  ),
                  Object.defineProperty(
                    d,
                    "positionAlign",
                    t({}, v, {
                      get: function () {
                        return ft;
                      },
                      set: function (ve) {
                        var je = e(ve);
                        if (!je)
                          throw new SyntaxError(
                            "An invalid or illegal string was specified."
                          );
                        (ft = je), (this.hasBeenReset = !0);
                      },
                    })
                  ),
                  Object.defineProperty(
                    d,
                    "size",
                    t({}, v, {
                      get: function () {
                        return Qe;
                      },
                      set: function (ve) {
                        if (ve < 0 || ve > 100)
                          throw new Error("Size must be between 0 and 100.");
                        (Qe = ve), (this.hasBeenReset = !0);
                      },
                    })
                  ),
                  Object.defineProperty(
                    d,
                    "align",
                    t({}, v, {
                      get: function () {
                        return Rt;
                      },
                      set: function (ve) {
                        var je = e(ve);
                        if (!je)
                          throw new SyntaxError(
                            "An invalid or illegal string was specified."
                          );
                        (Rt = je), (this.hasBeenReset = !0);
                      },
                    })
                  ),
                  (d.displayState = void 0);
              }
              return (
                (a.prototype.getCueAsHTML = function () {
                  var s = window.WebVTT;
                  return s.convertCueToDOMTree(window, this.text);
                }),
                a
              );
            })(),
            Ci = function () {
              return {
                decode: function (i) {
                  if (!i) return "";
                  if (typeof i != "string")
                    throw new Error("Error - expected string data.");
                  return decodeURIComponent(encodeURIComponent(i));
                },
              };
            };
          function br() {
            (this.window = window),
              (this.state = "INITIAL"),
              (this.buffer = ""),
              (this.decoder = new Ci()),
              (this.regionList = []);
          }
          function Pi(o) {
            function n(r, e, t, a) {
              return (r | 0) * 3600 + (e | 0) * 60 + (t | 0) + (a | 0) / 1e3;
            }
            var i = o.match(/^(\d+):(\d{2})(:\d{2})?\.(\d{3})/);
            return i
              ? i[3]
                ? n(i[1], i[2], i[3].replace(":", ""), i[4])
                : i[1] > 59
                ? n(i[1], i[2], 0, i[4])
                : n(0, i[1], i[2], i[4])
              : null;
          }
          function Lr() {
            this.values = Object.create(null);
          }
          Lr.prototype = {
            set: function (n, i) {
              !this.get(n) && i !== "" && (this.values[n] = i);
            },
            get: function (n, i, r) {
              return r
                ? this.has(n)
                  ? this.values[n]
                  : i[r]
                : this.has(n)
                ? this.values[n]
                : i;
            },
            has: function (n) {
              return n in this.values;
            },
            alt: function (n, i, r) {
              for (var e = 0; e < r.length; ++e)
                if (i === r[e]) {
                  this.set(n, i);
                  break;
                }
            },
            integer: function (n, i) {
              /^-?\d+$/.test(i) && this.set(n, parseInt(i, 10));
            },
            percent: function (n, i) {
              return i.match(/^([\d]{1,3})(\.[\d]*)?%$/) &&
                ((i = parseFloat(i)), i >= 0 && i <= 100)
                ? (this.set(n, i), !0)
                : !1;
            },
          };
          function Dr(o, n, i, r) {
            var e = r ? o.split(r) : [o];
            for (var t in e)
              if (typeof e[t] == "string") {
                var a = e[t].split(i);
                if (a.length === 2) {
                  var s = a[0],
                    l = a[1];
                  n(s, l);
                }
              }
          }
          var hr = new Rr(0, 0, 0),
            rr = hr.align === "middle" ? "middle" : "center";
          function ki(o, n, i) {
            var r = o;
            function e() {
              var s = Pi(o);
              if (s === null) throw new Error("Malformed timestamp: " + r);
              return (o = o.replace(/^[^\sa-zA-Z-]+/, "")), s;
            }
            function t(s, l) {
              var u = new Lr();
              Dr(
                s,
                function (p, R) {
                  switch (p) {
                    case "region":
                      for (var O = i.length - 1; O >= 0; O--)
                        if (i[O].id === R) {
                          u.set(p, i[O].region);
                          break;
                        }
                      break;
                    case "vertical":
                      u.alt(p, R, ["rl", "lr"]);
                      break;
                    case "line":
                      var j = R.split(","),
                        q = j[0];
                      u.integer(p, q),
                        u.percent(p, q) && u.set("snapToLines", !1),
                        u.alt(p, q, ["auto"]),
                        j.length === 2 &&
                          u.alt("lineAlign", j[1], ["start", rr, "end"]);
                      break;
                    case "position":
                      (j = R.split(",")),
                        u.percent(p, j[0]),
                        j.length === 2 &&
                          u.alt("positionAlign", j[1], [
                            "start",
                            rr,
                            "end",
                            "line-left",
                            "line-right",
                            "auto",
                          ]);
                      break;
                    case "size":
                      u.percent(p, R);
                      break;
                    case "align":
                      u.alt(p, R, ["start", rr, "end", "left", "right"]);
                      break;
                  }
                },
                /:/,
                /\s/
              ),
                (l.region = u.get("region", null)),
                (l.vertical = u.get("vertical", ""));
              var d = u.get("line", "auto");
              d === "auto" && hr.line === -1 && (d = -1),
                (l.line = d),
                (l.lineAlign = u.get("lineAlign", "start")),
                (l.snapToLines = u.get("snapToLines", !0)),
                (l.size = u.get("size", 100)),
                (l.align = u.get("align", rr));
              var v = u.get("position", "auto");
              v === "auto" &&
                hr.position === 50 &&
                (v =
                  l.align === "start" || l.align === "left"
                    ? 0
                    : l.align === "end" || l.align === "right"
                    ? 100
                    : 50),
                (l.position = v);
            }
            function a() {
              o = o.replace(/^\s+/, "");
            }
            if ((a(), (n.startTime = e()), a(), o.substr(0, 3) !== "-->"))
              throw new Error(
                "Malformed time stamp (time stamps must be separated by '-->'): " +
                  r
              );
            (o = o.substr(3)), a(), (n.endTime = e()), a(), t(o, n);
          }
          function Ir(o) {
            return o.replace(
              /<br(?: \/)?>/gi,
              `
`
            );
          }
          br.prototype = {
            parse: function (n) {
              var i = this;
              n && (i.buffer += i.decoder.decode(n, { stream: !0 }));
              function r() {
                var u = i.buffer,
                  d = 0;
                for (
                  u = Ir(u);
                  d < u.length &&
                  u[d] !== "\r" &&
                  u[d] !==
                    `
`;

                )
                  ++d;
                var v = u.substr(0, d);
                return (
                  u[d] === "\r" && ++d,
                  u[d] ===
                    `
` && ++d,
                  (i.buffer = u.substr(d)),
                  v
                );
              }
              function e(u) {
                Dr(u, function (d, v) {}, /:/);
              }
              try {
                var t;
                if (i.state === "INITIAL") {
                  if (!/\r\n|\n/.test(i.buffer)) return this;
                  t = r();
                  var a = t.match(/^(ï»¿)?WEBVTT([ \t].*)?$/);
                  if (!a || !a[0])
                    throw new Error("Malformed WebVTT signature.");
                  i.state = "HEADER";
                }
                for (var s = !1; i.buffer; ) {
                  if (!/\r\n|\n/.test(i.buffer)) return this;
                  switch ((s ? (s = !1) : (t = r()), i.state)) {
                    case "HEADER":
                      /:/.test(t) ? e(t) : t || (i.state = "ID");
                      continue;
                    case "NOTE":
                      t || (i.state = "ID");
                      continue;
                    case "ID":
                      if (/^NOTE($|[ \t])/.test(t)) {
                        i.state = "NOTE";
                        break;
                      }
                      if (!t) continue;
                      if (
                        ((i.cue = new Rr(0, 0, "")),
                        (i.state = "CUE"),
                        t.indexOf("-->") === -1)
                      ) {
                        i.cue.id = t;
                        continue;
                      }
                    case "CUE":
                      try {
                        ki(t, i.cue, i.regionList);
                      } catch {
                        (i.cue = null), (i.state = "BADCUE");
                        continue;
                      }
                      i.state = "CUETEXT";
                      continue;
                    case "CUETEXT":
                      var l = t.indexOf("-->") !== -1;
                      if (!t || (l && (s = !0))) {
                        i.oncue && i.oncue(i.cue),
                          (i.cue = null),
                          (i.state = "ID");
                        continue;
                      }
                      i.cue.text &&
                        (i.cue.text += `
`),
                        (i.cue.text += t);
                      continue;
                    case "BADCUE":
                      t || (i.state = "ID");
                      continue;
                  }
                }
              } catch {
                i.state === "CUETEXT" && i.cue && i.oncue && i.oncue(i.cue),
                  (i.cue = null),
                  (i.state = i.state === "INITIAL" ? "BADWEBVTT" : "BADCUE");
              }
              return this;
            },
            flush: function () {
              var n = this;
              try {
                if (
                  ((n.buffer += n.decoder.decode()),
                  (n.cue || n.state === "HEADER") &&
                    ((n.buffer += `

`),
                    n.parse()),
                  n.state === "INITIAL")
                )
                  throw new Error("Malformed WebVTT signature.");
              } catch (i) {
                throw i;
              }
              return n.onflush && n.onflush(), this;
            },
          };
          var Mi = br;
          function Ni(o, n, i, r) {
            for (
              var e = [],
                t,
                a,
                s,
                l,
                u,
                d = window.VTTCue || TextTrackCue,
                v = 0;
              v < r.rows.length;
              v++
            )
              if (
                ((t = r.rows[v]), (s = !0), (l = 0), (u = ""), !t.isEmpty())
              ) {
                for (var p = 0; p < t.chars.length; p++)
                  t.chars[p].uchar.match(/\s/) && s
                    ? l++
                    : ((u += t.chars[p].uchar), (s = !1));
                (t.cueStartTime = n),
                  n === i && (i += 1e-4),
                  (a = new d(n, i, Ir(u.trim()))),
                  l >= 16 ? l-- : l++,
                  navigator.userAgent.match(/Firefox\//)
                    ? (a.line = v + 1)
                    : (a.line = v > 7 ? v - 2 : v + 1),
                  (a.align = "left"),
                  (a.position = Math.max(0, Math.min(100, 100 * (l / 32)))),
                  e.push(a),
                  o && o.addCue(a);
              }
            return e;
          }
          var wr = {
              42: 225,
              92: 233,
              94: 237,
              95: 243,
              96: 250,
              123: 231,
              124: 247,
              125: 209,
              126: 241,
              127: 9608,
              128: 174,
              129: 176,
              130: 189,
              131: 191,
              132: 8482,
              133: 162,
              134: 163,
              135: 9834,
              136: 224,
              137: 32,
              138: 232,
              139: 226,
              140: 234,
              141: 238,
              142: 244,
              143: 251,
              144: 193,
              145: 201,
              146: 211,
              147: 218,
              148: 220,
              149: 252,
              150: 8216,
              151: 161,
              152: 42,
              153: 8217,
              154: 9473,
              155: 169,
              156: 8480,
              157: 8226,
              158: 8220,
              159: 8221,
              160: 192,
              161: 194,
              162: 199,
              163: 200,
              164: 202,
              165: 203,
              166: 235,
              167: 206,
              168: 207,
              169: 239,
              170: 212,
              171: 217,
              172: 249,
              173: 219,
              174: 171,
              175: 187,
              176: 195,
              177: 227,
              178: 205,
              179: 204,
              180: 236,
              181: 210,
              182: 242,
              183: 213,
              184: 245,
              185: 123,
              186: 125,
              187: 92,
              188: 94,
              189: 95,
              190: 124,
              191: 8764,
              192: 196,
              193: 228,
              194: 214,
              195: 246,
              196: 223,
              197: 165,
              198: 164,
              199: 9475,
              200: 197,
              201: 229,
              202: 216,
              203: 248,
              204: 9487,
              205: 9491,
              206: 9495,
              207: 9499,
            },
            Fr = function (n) {
              var i = n;
              return (
                wr.hasOwnProperty(n) && (i = wr[n]), String.fromCharCode(i)
              );
            },
            mt = 15,
            At = 100,
            Ui = { 17: 1, 18: 3, 21: 5, 22: 7, 23: 9, 16: 11, 19: 12, 20: 14 },
            Bi = { 17: 2, 18: 4, 21: 6, 22: 8, 23: 10, 19: 13, 20: 15 },
            Gi = { 25: 1, 26: 3, 29: 5, 30: 7, 31: 9, 24: 11, 27: 12, 28: 14 },
            Ki = { 25: 2, 26: 4, 29: 6, 30: 8, 31: 10, 27: 13, 28: 15 },
            ji = [
              "white",
              "green",
              "blue",
              "cyan",
              "red",
              "yellow",
              "magenta",
              "black",
              "transparent",
            ],
            me;
          (function (o) {
            (o[(o.ERROR = 0)] = "ERROR"),
              (o[(o.TEXT = 1)] = "TEXT"),
              (o[(o.WARNING = 2)] = "WARNING"),
              (o[(o.INFO = 2)] = "INFO"),
              (o[(o.DEBUG = 3)] = "DEBUG"),
              (o[(o.DATA = 3)] = "DATA");
          })(me || (me = {}));
          var Hi = (function () {
              function o() {
                (this.time = null), (this.verboseLevel = me.ERROR);
              }
              var n = o.prototype;
              return (
                (n.log = function (r, e) {
                  this.verboseLevel >= r &&
                    c.logger.log(this.time + " [" + r + "] " + e);
                }),
                o
              );
            })(),
            kt = function (n) {
              for (var i = [], r = 0; r < n.length; r++)
                i.push(n[r].toString(16));
              return i;
            },
            Or = (function () {
              function o(i, r, e, t, a) {
                (this.foreground = void 0),
                  (this.underline = void 0),
                  (this.italics = void 0),
                  (this.background = void 0),
                  (this.flash = void 0),
                  (this.foreground = i || "white"),
                  (this.underline = r || !1),
                  (this.italics = e || !1),
                  (this.background = t || "black"),
                  (this.flash = a || !1);
              }
              var n = o.prototype;
              return (
                (n.reset = function () {
                  (this.foreground = "white"),
                    (this.underline = !1),
                    (this.italics = !1),
                    (this.background = "black"),
                    (this.flash = !1);
                }),
                (n.setStyles = function (r) {
                  for (
                    var e = [
                        "foreground",
                        "underline",
                        "italics",
                        "background",
                        "flash",
                      ],
                      t = 0;
                    t < e.length;
                    t++
                  ) {
                    var a = e[t];
                    r.hasOwnProperty(a) && (this[a] = r[a]);
                  }
                }),
                (n.isDefault = function () {
                  return (
                    this.foreground === "white" &&
                    !this.underline &&
                    !this.italics &&
                    this.background === "black" &&
                    !this.flash
                  );
                }),
                (n.equals = function (r) {
                  return (
                    this.foreground === r.foreground &&
                    this.underline === r.underline &&
                    this.italics === r.italics &&
                    this.background === r.background &&
                    this.flash === r.flash
                  );
                }),
                (n.copy = function (r) {
                  (this.foreground = r.foreground),
                    (this.underline = r.underline),
                    (this.italics = r.italics),
                    (this.background = r.background),
                    (this.flash = r.flash);
                }),
                (n.toString = function () {
                  return (
                    "color=" +
                    this.foreground +
                    ", underline=" +
                    this.underline +
                    ", italics=" +
                    this.italics +
                    ", background=" +
                    this.background +
                    ", flash=" +
                    this.flash
                  );
                }),
                o
              );
            })(),
            Wi = (function () {
              function o(i, r, e, t, a, s) {
                (this.uchar = void 0),
                  (this.penState = void 0),
                  (this.uchar = i || " "),
                  (this.penState = new Or(r, e, t, a, s));
              }
              var n = o.prototype;
              return (
                (n.reset = function () {
                  (this.uchar = " "), this.penState.reset();
                }),
                (n.setChar = function (r, e) {
                  (this.uchar = r), this.penState.copy(e);
                }),
                (n.setPenState = function (r) {
                  this.penState.copy(r);
                }),
                (n.equals = function (r) {
                  return (
                    this.uchar === r.uchar && this.penState.equals(r.penState)
                  );
                }),
                (n.copy = function (r) {
                  (this.uchar = r.uchar), this.penState.copy(r.penState);
                }),
                (n.isEmpty = function () {
                  return this.uchar === " " && this.penState.isDefault();
                }),
                o
              );
            })(),
            Vi = (function () {
              function o(i) {
                (this.chars = void 0),
                  (this.pos = void 0),
                  (this.currPenState = void 0),
                  (this.cueStartTime = void 0),
                  (this.logger = void 0),
                  (this.chars = []);
                for (var r = 0; r < At; r++) this.chars.push(new Wi());
                (this.logger = i),
                  (this.pos = 0),
                  (this.currPenState = new Or());
              }
              var n = o.prototype;
              return (
                (n.equals = function (r) {
                  for (var e = !0, t = 0; t < At; t++)
                    if (!this.chars[t].equals(r.chars[t])) {
                      e = !1;
                      break;
                    }
                  return e;
                }),
                (n.copy = function (r) {
                  for (var e = 0; e < At; e++) this.chars[e].copy(r.chars[e]);
                }),
                (n.isEmpty = function () {
                  for (var r = !0, e = 0; e < At; e++)
                    if (!this.chars[e].isEmpty()) {
                      r = !1;
                      break;
                    }
                  return r;
                }),
                (n.setCursor = function (r) {
                  this.pos !== r && (this.pos = r),
                    this.pos < 0
                      ? (this.logger.log(
                          me.DEBUG,
                          "Negative cursor position " + this.pos
                        ),
                        (this.pos = 0))
                      : this.pos > At &&
                        (this.logger.log(
                          me.DEBUG,
                          "Too large cursor position " + this.pos
                        ),
                        (this.pos = At));
                }),
                (n.moveCursor = function (r) {
                  var e = this.pos + r;
                  if (r > 1)
                    for (var t = this.pos + 1; t < e + 1; t++)
                      this.chars[t].setPenState(this.currPenState);
                  this.setCursor(e);
                }),
                (n.backSpace = function () {
                  this.moveCursor(-1),
                    this.chars[this.pos].setChar(" ", this.currPenState);
                }),
                (n.insertChar = function (r) {
                  r >= 144 && this.backSpace();
                  var e = Fr(r);
                  if (this.pos >= At) {
                    this.logger.log(
                      me.ERROR,
                      "Cannot insert " +
                        r.toString(16) +
                        " (" +
                        e +
                        ") at position " +
                        this.pos +
                        ". Skipping it!"
                    );
                    return;
                  }
                  this.chars[this.pos].setChar(e, this.currPenState),
                    this.moveCursor(1);
                }),
                (n.clearFromPos = function (r) {
                  var e;
                  for (e = r; e < At; e++) this.chars[e].reset();
                }),
                (n.clear = function () {
                  this.clearFromPos(0),
                    (this.pos = 0),
                    this.currPenState.reset();
                }),
                (n.clearToEndOfRow = function () {
                  this.clearFromPos(this.pos);
                }),
                (n.getTextString = function () {
                  for (var r = [], e = !0, t = 0; t < At; t++) {
                    var a = this.chars[t].uchar;
                    a !== " " && (e = !1), r.push(a);
                  }
                  return e ? "" : r.join("");
                }),
                (n.setPenStyles = function (r) {
                  this.currPenState.setStyles(r);
                  var e = this.chars[this.pos];
                  e.setPenState(this.currPenState);
                }),
                o
              );
            })(),
            cr = (function () {
              function o(i) {
                (this.rows = void 0),
                  (this.currRow = void 0),
                  (this.nrRollUpRows = void 0),
                  (this.lastOutputScreen = void 0),
                  (this.logger = void 0),
                  (this.rows = []);
                for (var r = 0; r < mt; r++) this.rows.push(new Vi(i));
                (this.logger = i),
                  (this.currRow = mt - 1),
                  (this.nrRollUpRows = null),
                  (this.lastOutputScreen = null),
                  this.reset();
              }
              var n = o.prototype;
              return (
                (n.reset = function () {
                  for (var r = 0; r < mt; r++) this.rows[r].clear();
                  this.currRow = mt - 1;
                }),
                (n.equals = function (r) {
                  for (var e = !0, t = 0; t < mt; t++)
                    if (!this.rows[t].equals(r.rows[t])) {
                      e = !1;
                      break;
                    }
                  return e;
                }),
                (n.copy = function (r) {
                  for (var e = 0; e < mt; e++) this.rows[e].copy(r.rows[e]);
                }),
                (n.isEmpty = function () {
                  for (var r = !0, e = 0; e < mt; e++)
                    if (!this.rows[e].isEmpty()) {
                      r = !1;
                      break;
                    }
                  return r;
                }),
                (n.backSpace = function () {
                  var r = this.rows[this.currRow];
                  r.backSpace();
                }),
                (n.clearToEndOfRow = function () {
                  var r = this.rows[this.currRow];
                  r.clearToEndOfRow();
                }),
                (n.insertChar = function (r) {
                  var e = this.rows[this.currRow];
                  e.insertChar(r);
                }),
                (n.setPen = function (r) {
                  var e = this.rows[this.currRow];
                  e.setPenStyles(r);
                }),
                (n.moveCursor = function (r) {
                  var e = this.rows[this.currRow];
                  e.moveCursor(r);
                }),
                (n.setCursor = function (r) {
                  this.logger.log(me.INFO, "setCursor: " + r);
                  var e = this.rows[this.currRow];
                  e.setCursor(r);
                }),
                (n.setPAC = function (r) {
                  this.logger.log(me.INFO, "pacData = " + JSON.stringify(r));
                  var e = r.row - 1;
                  if (
                    (this.nrRollUpRows &&
                      e < this.nrRollUpRows - 1 &&
                      (e = this.nrRollUpRows - 1),
                    this.nrRollUpRows && this.currRow !== e)
                  ) {
                    for (var t = 0; t < mt; t++) this.rows[t].clear();
                    var a = this.currRow + 1 - this.nrRollUpRows,
                      s = this.lastOutputScreen;
                    if (s) {
                      var l = s.rows[a].cueStartTime,
                        u = this.logger.time;
                      if (l && u !== null && l < u)
                        for (var d = 0; d < this.nrRollUpRows; d++)
                          this.rows[e - this.nrRollUpRows + d + 1].copy(
                            s.rows[a + d]
                          );
                    }
                  }
                  this.currRow = e;
                  var v = this.rows[this.currRow];
                  if (r.indent !== null) {
                    var p = r.indent,
                      R = Math.max(p - 1, 0);
                    v.setCursor(r.indent),
                      (r.color = v.chars[R].penState.foreground);
                  }
                  var O = {
                    foreground: r.color,
                    underline: r.underline,
                    italics: r.italics,
                    background: "black",
                    flash: !1,
                  };
                  this.setPen(O);
                }),
                (n.setBkgData = function (r) {
                  this.logger.log(me.INFO, "bkgData = " + JSON.stringify(r)),
                    this.backSpace(),
                    this.setPen(r),
                    this.insertChar(32);
                }),
                (n.setRollUpRows = function (r) {
                  this.nrRollUpRows = r;
                }),
                (n.rollUp = function () {
                  if (this.nrRollUpRows === null) {
                    this.logger.log(
                      me.DEBUG,
                      "roll_up but nrRollUpRows not set yet"
                    );
                    return;
                  }
                  this.logger.log(me.TEXT, this.getDisplayText());
                  var r = this.currRow + 1 - this.nrRollUpRows,
                    e = this.rows.splice(r, 1)[0];
                  e.clear(),
                    this.rows.splice(this.currRow, 0, e),
                    this.logger.log(me.INFO, "Rolling up");
                }),
                (n.getDisplayText = function (r) {
                  r = r || !1;
                  for (var e = [], t = "", a = -1, s = 0; s < mt; s++) {
                    var l = this.rows[s].getTextString();
                    l &&
                      ((a = s + 1),
                      r
                        ? e.push("Row " + a + ": '" + l + "'")
                        : e.push(l.trim()));
                  }
                  return (
                    e.length > 0 &&
                      (r
                        ? (t = "[" + e.join(" | ") + "]")
                        : (t = e.join(`
`))),
                    t
                  );
                }),
                (n.getTextAndFormat = function () {
                  return this.rows;
                }),
                o
              );
            })(),
            Cr = (function () {
              function o(i, r, e) {
                (this.chNr = void 0),
                  (this.outputFilter = void 0),
                  (this.mode = void 0),
                  (this.verbose = void 0),
                  (this.displayedMemory = void 0),
                  (this.nonDisplayedMemory = void 0),
                  (this.lastOutputScreen = void 0),
                  (this.currRollUpRow = void 0),
                  (this.writeScreen = void 0),
                  (this.cueStartTime = void 0),
                  (this.logger = void 0),
                  (this.chNr = i),
                  (this.outputFilter = r),
                  (this.mode = null),
                  (this.verbose = 0),
                  (this.displayedMemory = new cr(e)),
                  (this.nonDisplayedMemory = new cr(e)),
                  (this.lastOutputScreen = new cr(e)),
                  (this.currRollUpRow = this.displayedMemory.rows[mt - 1]),
                  (this.writeScreen = this.displayedMemory),
                  (this.mode = null),
                  (this.cueStartTime = null),
                  (this.logger = e);
              }
              var n = o.prototype;
              return (
                (n.reset = function () {
                  (this.mode = null),
                    this.displayedMemory.reset(),
                    this.nonDisplayedMemory.reset(),
                    this.lastOutputScreen.reset(),
                    this.outputFilter.reset(),
                    (this.currRollUpRow = this.displayedMemory.rows[mt - 1]),
                    (this.writeScreen = this.displayedMemory),
                    (this.mode = null),
                    (this.cueStartTime = null);
                }),
                (n.getHandler = function () {
                  return this.outputFilter;
                }),
                (n.setHandler = function (r) {
                  this.outputFilter = r;
                }),
                (n.setPAC = function (r) {
                  this.writeScreen.setPAC(r);
                }),
                (n.setBkgData = function (r) {
                  this.writeScreen.setBkgData(r);
                }),
                (n.setMode = function (r) {
                  r !== this.mode &&
                    ((this.mode = r),
                    this.logger.log(me.INFO, "MODE=" + r),
                    this.mode === "MODE_POP-ON"
                      ? (this.writeScreen = this.nonDisplayedMemory)
                      : ((this.writeScreen = this.displayedMemory),
                        this.writeScreen.reset()),
                    this.mode !== "MODE_ROLL-UP" &&
                      ((this.displayedMemory.nrRollUpRows = null),
                      (this.nonDisplayedMemory.nrRollUpRows = null)),
                    (this.mode = r));
                }),
                (n.insertChars = function (r) {
                  for (var e = 0; e < r.length; e++)
                    this.writeScreen.insertChar(r[e]);
                  var t =
                    this.writeScreen === this.displayedMemory
                      ? "DISP"
                      : "NON_DISP";
                  this.logger.log(
                    me.INFO,
                    t + ": " + this.writeScreen.getDisplayText(!0)
                  ),
                    (this.mode === "MODE_PAINT-ON" ||
                      this.mode === "MODE_ROLL-UP") &&
                      (this.logger.log(
                        me.TEXT,
                        "DISPLAYED: " + this.displayedMemory.getDisplayText(!0)
                      ),
                      this.outputDataUpdate());
                }),
                (n.ccRCL = function () {
                  this.logger.log(me.INFO, "RCL - Resume Caption Loading"),
                    this.setMode("MODE_POP-ON");
                }),
                (n.ccBS = function () {
                  this.logger.log(me.INFO, "BS - BackSpace"),
                    this.mode !== "MODE_TEXT" &&
                      (this.writeScreen.backSpace(),
                      this.writeScreen === this.displayedMemory &&
                        this.outputDataUpdate());
                }),
                (n.ccAOF = function () {}),
                (n.ccAON = function () {}),
                (n.ccDER = function () {
                  this.logger.log(me.INFO, "DER- Delete to End of Row"),
                    this.writeScreen.clearToEndOfRow(),
                    this.outputDataUpdate();
                }),
                (n.ccRU = function (r) {
                  this.logger.log(me.INFO, "RU(" + r + ") - Roll Up"),
                    (this.writeScreen = this.displayedMemory),
                    this.setMode("MODE_ROLL-UP"),
                    this.writeScreen.setRollUpRows(r);
                }),
                (n.ccFON = function () {
                  this.logger.log(me.INFO, "FON - Flash On"),
                    this.writeScreen.setPen({ flash: !0 });
                }),
                (n.ccRDC = function () {
                  this.logger.log(me.INFO, "RDC - Resume Direct Captioning"),
                    this.setMode("MODE_PAINT-ON");
                }),
                (n.ccTR = function () {
                  this.logger.log(me.INFO, "TR"), this.setMode("MODE_TEXT");
                }),
                (n.ccRTD = function () {
                  this.logger.log(me.INFO, "RTD"), this.setMode("MODE_TEXT");
                }),
                (n.ccEDM = function () {
                  this.logger.log(me.INFO, "EDM - Erase Displayed Memory"),
                    this.displayedMemory.reset(),
                    this.outputDataUpdate(!0);
                }),
                (n.ccCR = function () {
                  this.logger.log(me.INFO, "CR - Carriage Return"),
                    this.writeScreen.rollUp(),
                    this.outputDataUpdate(!0);
                }),
                (n.ccENM = function () {
                  this.logger.log(me.INFO, "ENM - Erase Non-displayed Memory"),
                    this.nonDisplayedMemory.reset();
                }),
                (n.ccEOC = function () {
                  if (
                    (this.logger.log(me.INFO, "EOC - End Of Caption"),
                    this.mode === "MODE_POP-ON")
                  ) {
                    var r = this.displayedMemory;
                    (this.displayedMemory = this.nonDisplayedMemory),
                      (this.nonDisplayedMemory = r),
                      (this.writeScreen = this.nonDisplayedMemory),
                      this.logger.log(
                        me.TEXT,
                        "DISP: " + this.displayedMemory.getDisplayText()
                      );
                  }
                  this.outputDataUpdate(!0);
                }),
                (n.ccTO = function (r) {
                  this.logger.log(me.INFO, "TO(" + r + ") - Tab Offset"),
                    this.writeScreen.moveCursor(r);
                }),
                (n.ccMIDROW = function (r) {
                  var e = { flash: !1 };
                  if (
                    ((e.underline = r % 2 === 1),
                    (e.italics = r >= 46),
                    e.italics)
                  )
                    e.foreground = "white";
                  else {
                    var t = Math.floor(r / 2) - 16,
                      a = [
                        "white",
                        "green",
                        "blue",
                        "cyan",
                        "red",
                        "yellow",
                        "magenta",
                      ];
                    e.foreground = a[t];
                  }
                  this.logger.log(me.INFO, "MIDROW: " + JSON.stringify(e)),
                    this.writeScreen.setPen(e);
                }),
                (n.outputDataUpdate = function (r) {
                  r === void 0 && (r = !1);
                  var e = this.logger.time;
                  e !== null &&
                    this.outputFilter &&
                    (this.cueStartTime === null &&
                    !this.displayedMemory.isEmpty()
                      ? (this.cueStartTime = e)
                      : this.displayedMemory.equals(this.lastOutputScreen) ||
                        (this.outputFilter.newCue(
                          this.cueStartTime,
                          e,
                          this.lastOutputScreen
                        ),
                        r &&
                          this.outputFilter.dispatchCue &&
                          this.outputFilter.dispatchCue(),
                        (this.cueStartTime = this.displayedMemory.isEmpty()
                          ? null
                          : e)),
                    this.lastOutputScreen.copy(this.displayedMemory));
                }),
                (n.cueSplitAtTime = function (r) {
                  this.outputFilter &&
                    (this.displayedMemory.isEmpty() ||
                      (this.outputFilter.newCue &&
                        this.outputFilter.newCue(
                          this.cueStartTime,
                          r,
                          this.displayedMemory
                        ),
                      (this.cueStartTime = r)));
                }),
                o
              );
            })(),
            Yi = (function () {
              function o(i, r, e) {
                (this.channels = void 0),
                  (this.currentChannel = 0),
                  (this.cmdHistory = void 0),
                  (this.logger = void 0);
                var t = new Hi();
                (this.channels = [null, new Cr(i, r, t), new Cr(i + 1, e, t)]),
                  (this.cmdHistory = kr()),
                  (this.logger = t);
              }
              var n = o.prototype;
              return (
                (n.getHandler = function (r) {
                  return this.channels[r].getHandler();
                }),
                (n.setHandler = function (r, e) {
                  this.channels[r].setHandler(e);
                }),
                (n.addData = function (r, e) {
                  var t,
                    a,
                    s,
                    l = !1;
                  this.logger.time = r;
                  for (var u = 0; u < e.length; u += 2)
                    if (
                      ((a = e[u] & 127),
                      (s = e[u + 1] & 127),
                      !(a === 0 && s === 0))
                    ) {
                      if (
                        (this.logger.log(
                          me.DATA,
                          "[" +
                            kt([e[u], e[u + 1]]) +
                            "] -> (" +
                            kt([a, s]) +
                            ")"
                        ),
                        (t = this.parseCmd(a, s)),
                        t || (t = this.parseMidrow(a, s)),
                        t || (t = this.parsePAC(a, s)),
                        t || (t = this.parseBackgroundAttributes(a, s)),
                        !t && ((l = this.parseChars(a, s)), l))
                      ) {
                        var d = this.currentChannel;
                        if (d && d > 0) {
                          var v = this.channels[d];
                          v.insertChars(l);
                        } else
                          this.logger.log(
                            me.WARNING,
                            "No channel found yet. TEXT-MODE?"
                          );
                      }
                      !t &&
                        !l &&
                        this.logger.log(
                          me.WARNING,
                          "Couldn't parse cleaned data " +
                            kt([a, s]) +
                            " orig: " +
                            kt([e[u], e[u + 1]])
                        );
                    }
                }),
                (n.parseCmd = function (r, e) {
                  var t = this.cmdHistory,
                    a =
                      (r === 20 || r === 28 || r === 21 || r === 29) &&
                      e >= 32 &&
                      e <= 47,
                    s = (r === 23 || r === 31) && e >= 33 && e <= 35;
                  if (!(a || s)) return !1;
                  if (Pr(r, e, t))
                    return (
                      Ut(null, null, t),
                      this.logger.log(
                        me.DEBUG,
                        "Repeated command (" + kt([r, e]) + ") is dropped"
                      ),
                      !0
                    );
                  var l = r === 20 || r === 21 || r === 23 ? 1 : 2,
                    u = this.channels[l];
                  return (
                    r === 20 || r === 21 || r === 28 || r === 29
                      ? e === 32
                        ? u.ccRCL()
                        : e === 33
                        ? u.ccBS()
                        : e === 34
                        ? u.ccAOF()
                        : e === 35
                        ? u.ccAON()
                        : e === 36
                        ? u.ccDER()
                        : e === 37
                        ? u.ccRU(2)
                        : e === 38
                        ? u.ccRU(3)
                        : e === 39
                        ? u.ccRU(4)
                        : e === 40
                        ? u.ccFON()
                        : e === 41
                        ? u.ccRDC()
                        : e === 42
                        ? u.ccTR()
                        : e === 43
                        ? u.ccRTD()
                        : e === 44
                        ? u.ccEDM()
                        : e === 45
                        ? u.ccCR()
                        : e === 46
                        ? u.ccENM()
                        : e === 47 && u.ccEOC()
                      : u.ccTO(e - 32),
                    Ut(r, e, t),
                    (this.currentChannel = l),
                    !0
                  );
                }),
                (n.parseMidrow = function (r, e) {
                  var t = 0;
                  if ((r === 17 || r === 25) && e >= 32 && e <= 47) {
                    if (
                      (r === 17 ? (t = 1) : (t = 2), t !== this.currentChannel)
                    )
                      return (
                        this.logger.log(
                          me.ERROR,
                          "Mismatch channel in midrow parsing"
                        ),
                        !1
                      );
                    var a = this.channels[t];
                    return a
                      ? (a.ccMIDROW(e),
                        this.logger.log(
                          me.DEBUG,
                          "MIDROW (" + kt([r, e]) + ")"
                        ),
                        !0)
                      : !1;
                  }
                  return !1;
                }),
                (n.parsePAC = function (r, e) {
                  var t,
                    a = this.cmdHistory,
                    s =
                      ((r >= 17 && r <= 23) || (r >= 25 && r <= 31)) &&
                      e >= 64 &&
                      e <= 127,
                    l = (r === 16 || r === 24) && e >= 64 && e <= 95;
                  if (!(s || l)) return !1;
                  if (Pr(r, e, a)) return Ut(null, null, a), !0;
                  var u = r <= 23 ? 1 : 2;
                  e >= 64 && e <= 95
                    ? (t = u === 1 ? Ui[r] : Gi[r])
                    : (t = u === 1 ? Bi[r] : Ki[r]);
                  var d = this.channels[u];
                  return d
                    ? (d.setPAC(this.interpretPAC(t, e)),
                      Ut(r, e, a),
                      (this.currentChannel = u),
                      !0)
                    : !1;
                }),
                (n.interpretPAC = function (r, e) {
                  var t = e,
                    a = {color: null,
                      italics: !1,
                      indent: null,
                      underline: !1,
                      row: r,
                    };
                  return (
                    e > 95 ? (t = e - 96) : (t = e - 64),
                    (a.underline = (t & 1) === 1),
                    t <= 13
                      ? (a.color = [
                          "white",
                          "green",
                          "blue",
                          "cyan",
                          "red",
                          "yellow",
                          "magenta",
                          "white",
                        ][Math.floor(t / 2)])
                      : t <= 15
                      ? ((a.italics = !0), (a.color = "white"))
                      : (a.indent = Math.floor((t - 16) / 2) * 4),
                    a
                  );
                }),
                (n.parseChars = function (r, e) {
                  var t,
                    a = null,
                    s = null;
                  if (
                    (r >= 25 ? ((t = 2), (s = r - 8)) : ((t = 1), (s = r)),
                    s >= 17 && s <= 19)
                  ) {
                    var l = e;
                    s === 17
                      ? (l = e + 80)
                      : s === 18
                      ? (l = e + 112)
                      : (l = e + 144),
                      this.logger.log(
                        me.INFO,
                        "Special char '" + Fr(l) + "' in channel " + t
                      ),
                      (a = [l]);
                  } else r >= 32 && r <= 127 && (a = e === 0 ? [r] : [r, e]);
                  if (a) {
                    var u = kt(a);
                    this.logger.log(me.DEBUG, "Char codes =  " + u.join(",")),
                      Ut(r, e, this.cmdHistory);
                  }
                  return a;
                }),
                (n.parseBackgroundAttributes = function (r, e) {
                  var t = (r === 16 || r === 24) && e >= 32 && e <= 47,
                    a = (r === 23 || r === 31) && e >= 45 && e <= 47;
                  if (!(t || a)) return !1;
                  var s,
                    l = {};
                  r === 16 || r === 24
                    ? ((s = Math.floor((e - 32) / 2)),
                      (l.background = ji[s]),
                      e % 2 === 1 && (l.background = l.background + "_semi"))
                    : e === 45
                    ? (l.background = "transparent")
                    : ((l.foreground = "black"),
                      e === 47 && (l.underline = !0));
                  var u = r <= 23 ? 1 : 2,
                    d = this.channels[u];
                  return d.setBkgData(l), Ut(r, e, this.cmdHistory), !0;
                }),
                (n.reset = function () {
                  for (var r = 0; r < Object.keys(this.channels).length; r++) {
                    var e = this.channels[r];
                    e && e.reset();
                  }
                  this.cmdHistory = kr();
                }),
                (n.cueSplitAtTime = function (r) {
                  for (var e = 0; e < this.channels.length; e++) {
                    var t = this.channels[e];
                    t && t.cueSplitAtTime(r);
                  }
                }),
                o
              );
            })();
          function Ut(o, n, i) {
            (i.a = o), (i.b = n);
          }
          function Pr(o, n, i) {
            return i.a === o && i.b === n;
          }
          function kr() {
            return { a: null, b: null };
          }
          var Mr = Yi,
            ir = (function () {
              function o(i, r) {
                (this.timelineController = void 0),
                  (this.cueRanges = []),
                  (this.trackName = void 0),
                  (this.startTime = null),
                  (this.endTime = null),
                  (this.screen = null),
                  (this.timelineController = i),
                  (this.trackName = r);
              }
              var n = o.prototype;
              return (
                (n.dispatchCue = function () {
                  this.startTime !== null &&
                    (this.timelineController.addCues(
                      this.trackName,
                      this.startTime,
                      this.endTime,
                      this.screen,
                      this.cueRanges
                    ),
                    (this.startTime = null));
                }),
                (n.newCue = function (r, e, t) {
                  (this.startTime === null || this.startTime > r) &&
                    (this.startTime = r),
                    (this.endTime = e),
                    (this.screen = t),
                    this.timelineController.createCaptionsTrack(this.trackName);
                }),
                (n.reset = function () {
                  this.cueRanges = [];
                }),
                o
              );
            })(),
            gr = function (n, i, r) {
              return n.substr(0, i.length) === i;
            },
            Xi = function (n) {
              var i = parseInt(n.substr(-3)),
                r = parseInt(n.substr(-6, 2)),
                e = parseInt(n.substr(-9, 2)),
                t = n.length > 9 ? parseInt(n.substr(0, n.indexOf(":"))) : 0;
              if (
                !Object(ee.isFiniteNumber)(i) ||
                !Object(ee.isFiniteNumber)(r) ||
                !Object(ee.isFiniteNumber)(e) ||
                !Object(ee.isFiniteNumber)(t)
              )
                throw Error("Malformed X-TIMESTAMP-MAP: Local:" + n);
              return (
                (i += 1e3 * r), (i += 60 * 1e3 * e), (i += 60 * 60 * 1e3 * t), i
              );
            },
            vr = function (n) {
              for (var i = 5381, r = n.length; r; )
                i = (i * 33) ^ n.charCodeAt(--r);
              return (i >>> 0).toString();
            },
            zi = function (n, i, r) {
              var e = n[i],
                t = n[e.prevCC];
              if (!t || (!t.new && e.new)) {
                (n.ccOffset = n.presentationOffset = e.start), (e.new = !1);
                return;
              }
              for (; t && t.new; )
                (n.ccOffset += e.start - t.start),
                  (e.new = !1),
                  (e = t),
                  (t = n[e.prevCC]);
              n.presentationOffset = r;
            },
            qi = {
              parse: function (n, i, r, e, t, a) {
                var s = /\r\n|\n\r|\n|\r/g,
                  l = Object(Wt.utf8ArrayToStr)(new Uint8Array(n))
                    .trim()
                    .replace(
                      s,
                      `
`
                    ).split(`
`),
                  u = "00:00.000",
                  d = 0,
                  v = 0,
                  p = 0,
                  R = [],
                  O,
                  j = !0,
                  q = !1,
                  ne = new Mi();
                (ne.oncue = function (re) {
                  var ue = r[e],
                    de = r.ccOffset;
                  ue &&
                    ue.new &&
                    (v !== void 0 ? (de = r.ccOffset = ue.start) : zi(r, e, p)),
                    p && (de = p - r.presentationOffset),
                    q && ((re.startTime += de - v), (re.endTime += de - v)),
                    (re.id =
                      vr(re.startTime.toString()) +
                      vr(re.endTime.toString()) +
                      vr(re.text)),
                    (re.text = decodeURIComponent(encodeURIComponent(re.text))),
                    re.endTime > 0 && R.push(re);
                }),
                  (ne.onparsingerror = function (re) {
                    O = re;
                  }),
                  (ne.onflush = function () {
                    if (O && a) {
                      a(O);
                      return;
                    }
                    t(R);
                  }),
                  l.forEach(function (re) {
                    if (j)
                      if (gr(re, "X-TIMESTAMP-MAP=")) {
                        (j = !1),
                          (q = !0),
                          re
                            .substr(16)
                            .split(",")
                            .forEach(function (ue) {
                              gr(ue, "LOCAL:")
                                ? (u = ue.substr(6))
                                : gr(ue, "MPEGTS:") &&
                                  (d = parseInt(ue.substr(7)));
                            });
                        try {
                          i + (r[e].start * 9e4 || 0) < 0 && (i += 8589934592),
                            (d -= i),
                            (v = Xi(u) / 1e3),
                            (p = d / 9e4);
                        } catch (ue) {
                          (q = !1), (O = ue);
                        }
                        return;
                      } else re === "" && (j = !1);
                    ne.parse(
                      re +
                        `
`
                    );
                  }),
                  ne.flush();
              },
            },
            Zi = qi;
          function ar(o) {
            if (o === void 0)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return o;
          }
          function Qi(o, n) {
            (o.prototype = Object.create(n.prototype)),
              (o.prototype.constructor = o),
              (o.__proto__ = n);
          }
          var $i = (function (o) {
            Qi(n, o);
            function n(r) {
              var e;
              if (
                ((e =
                  o.call(
                    this,
                    r,
                    h.default.MEDIA_ATTACHING,
                    h.default.MEDIA_DETACHING,
                    h.default.FRAG_PARSING_USERDATA,
                    h.default.FRAG_DECRYPTED,
                    h.default.MANIFEST_LOADING,
                    h.default.MANIFEST_LOADED,
                    h.default.FRAG_LOADED,
                    h.default.INIT_PTS_FOUND
                  ) || this),
                (e.media = null),
                (e.config = void 0),
                (e.enabled = !0),
                (e.Cues = void 0),
                (e.textTracks = []),
                (e.tracks = []),
                (e.initPTS = []),
                (e.unparsedVttFrags = []),
                (e.captionsTracks = {}),
                (e.nonNativeCaptionsTracks = {}),
                (e.captionsProperties = void 0),
                (e.cea608Parser1 = void 0),
                (e.cea608Parser2 = void 0),
                (e.lastSn = -1),
                (e.prevCC = -1),
                (e.vttCCs = Nr()),
                (e.hls = r),
                (e.config = r.config),
                (e.Cues = r.config.cueHandler),
                (e.captionsProperties = {
                  textTrack1: {
                    label: e.config.captionsTextTrack1Label,
                    languageCode: e.config.captionsTextTrack1LanguageCode,
                  },
                  textTrack2: {
                    label: e.config.captionsTextTrack2Label,
                    languageCode: e.config.captionsTextTrack2LanguageCode,
                  },
                  textTrack3: {
                    label: e.config.captionsTextTrack3Label,
                    languageCode: e.config.captionsTextTrack3LanguageCode,
                  },
                  textTrack4: {
                    label: e.config.captionsTextTrack4Label,
                    languageCode: e.config.captionsTextTrack4LanguageCode,
                  },
                }),
                e.config.enableCEA708Captions)
              ) {
                var t = new ir(ar(e), "textTrack1"),
                  a = new ir(ar(e), "textTrack2"),
                  s = new ir(ar(e), "textTrack3"),
                  l = new ir(ar(e), "textTrack4");
                (e.cea608Parser1 = new Mr(1, t, a)),
                  (e.cea608Parser2 = new Mr(3, s, l));
              }
              return e;
            }
            var i = n.prototype;
            return (
              (i.addCues = function (e, t, a, s, l) {
                for (var u = !1, d = l.length; d--; ) {
                  var v = l[d],
                    p = ea(v[0], v[1], t, a);
                  if (
                    p >= 0 &&
                    ((v[0] = Math.min(v[0], t)),
                    (v[1] = Math.max(v[1], a)),
                    (u = !0),
                    p / (a - t) > 0.5)
                  )
                    return;
                }
                if ((u || l.push([t, a]), this.config.renderTextTracksNatively))
                  this.Cues.newCue(this.captionsTracks[e], t, a, s);
                else {
                  var R = this.Cues.newCue(null, t, a, s);
                  this.hls.trigger(h.default.CUES_PARSED, {
                    type: "captions",
                    cues: R,
                    track: e,
                  });
                }
              }),
              (i.onInitPtsFound = function (e) {
                var t = this,
                  a = e.frag,
                  s = e.id,
                  l = e.initPTS,
                  u = this.unparsedVttFrags;
                s === "main" && (this.initPTS[a.cc] = l),
                  u.length &&
                    ((this.unparsedVttFrags = []),
                    u.forEach(function (d) {
                      t.onFragLoaded(d);
                    }));
              }),
              (i.getExistingTrack = function (e) {
                var t = this.media;
                if (t)
                  for (var a = 0; a < t.textTracks.length; a++) {
                    var s = t.textTracks[a];
                    if (s[e]) return s;
                  }
                return null;
              }),
              (i.createCaptionsTrack = function (e) {
                this.config.renderTextTracksNatively
                  ? this.createNativeTrack(e)
                  : this.createNonNativeTrack(e);
              }),
              (i.createNativeTrack = function (e) {
                if (!this.captionsTracks[e]) {
                  var t = this.captionsProperties,
                    a = this.captionsTracks,
                    s = this.media,
                    l = t[e],
                    u = l.label,
                    d = l.languageCode,
                    v = this.getExistingTrack(e);
                  if (v) (a[e] = v), Pt(a[e]), Mt(a[e], s);
                  else {
                    var p = this.createTextTrack("captions", u, d);
                    p && ((p[e] = !0), (a[e] = p));
                  }
                }
              }),
              (i.createNonNativeTrack = function (e) {
                if (!this.nonNativeCaptionsTracks[e]) {
                  var t = this.captionsProperties[e];
                  if (t) {
                    var a = t.label,
                      s = {
                        _id: e,
                        label: a,
                        kind: "captions",
                        default: t.media ? !!t.media.default : !1,
                        closedCaptions: t.media,
                      };
                    (this.nonNativeCaptionsTracks[e] = s),
                      this.hls.trigger(h.default.NON_NATIVE_TEXT_TRACKS_FOUND, {
                        tracks: [s],
                      });
                  }
                }
              }),
              (i.createTextTrack = function (e, t, a) {
                var s = this.media;
                if (s) return s.addTextTrack(e, t, a);
              }),
              (i.destroy = function () {
                o.prototype.destroy.call(this);
              }),
              (i.onMediaAttaching = function (e) {
                (this.media = e.media), this._cleanTracks();
              }),
              (i.onMediaDetaching = function () {
                var e = this.captionsTracks;
                Object.keys(e).forEach(function (t) {
                  Pt(e[t]), delete e[t];
                }),
                  (this.nonNativeCaptionsTracks = {});
              }),
              (i.onManifestLoading = function () {
                (this.lastSn = -1),
                  (this.prevCC = -1),
                  (this.vttCCs = Nr()),
                  this._cleanTracks(),
                  (this.tracks = []),
                  (this.captionsTracks = {}),
                  (this.nonNativeCaptionsTracks = {});
              }),
              (i._cleanTracks = function () {
                var e = this.media;
                if (e) {
                  var t = e.textTracks;
                  if (t) for (var a = 0; a < t.length; a++) Pt(t[a]);
                }
              }),
              (i.onManifestLoaded = function (e) {
                var t = this;
                if (
                  ((this.textTracks = []),
                  (this.unparsedVttFrags = this.unparsedVttFrags || []),
                  (this.initPTS = []),
                  this.cea608Parser1 &&
                    this.cea608Parser2 &&
                    (this.cea608Parser1.reset(), this.cea608Parser2.reset()),
                  this.config.enableWebVTT)
                ) {
                  var a = e.subtitles || [],
                    s = this.tracks && a && this.tracks.length === a.length;
                  if (
                    ((this.tracks = e.subtitles || []),
                    this.config.renderTextTracksNatively)
                  ) {
                    var l = this.media ? this.media.textTracks : [];
                    this.tracks.forEach(function (d, v) {
                      var p;
                      if (v < l.length) {
                        for (var R = null, O = 0; O < l.length; O++)
                          if (Ji(l[O], d)) {
                            R = l[O];
                            break;
                          }
                        R && (p = R);
                      }
                      p || (p = t.createTextTrack("subtitles", d.name, d.lang)),
                        d.default
                          ? (p.mode = t.hls.subtitleDisplay
                              ? "showing"
                              : "hidden")
                          : (p.mode = "disabled"),
                        t.textTracks.push(p);
                    });
                  } else if (!s && this.tracks && this.tracks.length) {
                    var u = this.tracks.map(function (d) {
                      return {
                        label: d.name,
                        kind: d.type.toLowerCase(),
                        default: d.default,
                        subtitleTrack: d,
                      };
                    });
                    this.hls.trigger(h.default.NON_NATIVE_TEXT_TRACKS_FOUND, {
                      tracks: u,
                    });
                  }
                }
                this.config.enableCEA708Captions &&
                  e.captions &&
                  e.captions.forEach(function (d) {
                    var v = /(?:CC|SERVICE)([1-4])/.exec(d.instreamId);
                    if (v) {
                      var p = "textTrack" + v[1],
                        R = t.captionsProperties[p];
                      R &&
                        ((R.label = d.name),
                        d.lang && (R.languageCode = d.lang),
                        (R.media = d));
                    }
                  });
              }),
              (i.onFragLoaded = function (e) {
                var t = e.frag,
                  a = e.payload,
                  s = this.cea608Parser1,
                  l = this.cea608Parser2,
                  u = this.initPTS,
                  d = this.lastSn,
                  v = this.unparsedVttFrags;
                if (t.type === "main") {
                  var p = t.sn;
                  t.sn !== d + 1 && s && l && (s.reset(), l.reset()),
                    (this.lastSn = p);
                } else if (t.type === "subtitle")
                  if (a.byteLength) {
                    if (!Object(ee.isFiniteNumber)(u[t.cc])) {
                      v.push(e),
                        u.length &&
                          this.hls.trigger(h.default.SUBTITLE_FRAG_PROCESSED, {
                            success: !1,
                            frag: t,
                          });
                      return;
                    }
                    var R = t.decryptdata;
                    (R == null || R.key == null || R.method !== "AES-128") &&
                      this._parseVTTs(t, a);
                  } else
                    this.hls.trigger(h.default.SUBTITLE_FRAG_PROCESSED, {
                      success: !1,
                      frag: t,
                    });
              }),
              (i._parseVTTs = function (e, t) {
                var a = this,
                  s = this.hls,
                  l = this.prevCC,
                  u = this.textTracks,
                  d = this.vttCCs;
                d[e.cc] ||
                  ((d[e.cc] = { start: e.start, prevCC: l, new: !0 }),
                  (this.prevCC = e.cc)),
                  Zi.parse(
                    t,
                    this.initPTS[e.cc],
                    d,
                    e.cc,
                    function (v) {
                      if (a.config.renderTextTracksNatively) {
                        var p = u[e.level];
                        if (p.mode === "disabled") {
                          s.trigger(h.default.SUBTITLE_FRAG_PROCESSED, {
                            success: !1,
                            frag: e,
                          });
                          return;
                        }
                        v.forEach(function (O) {
                          if (!p.cues.getCueById(O.id))
                            try {
                              if ((p.addCue(O), !p.cues.getCueById(O.id)))
                                throw new Error("addCue is failed for: " + O);
                            } catch (q) {
                              c.logger.debug(
                                "Failed occurred on adding cues: " + q
                              );
                              var j = new window.TextTrackCue(
                                O.startTime,
                                O.endTime,
                                O.text
                              );
                              (j.id = O.id), p.addCue(j);
                            }
                        });
                      } else {
                        var R = a.tracks[e.level].default
                          ? "default"
                          : "subtitles" + e.level;
                        s.trigger(h.default.CUES_PARSED, {
                          type: "subtitles",
                          cues: v,
                          track: R,
                        });
                      }
                      s.trigger(h.default.SUBTITLE_FRAG_PROCESSED, {
                        success: !0,
                        frag: e,
                      });
                    },
                    function (v) {
                      c.logger.log("Failed to parse VTT cue: " + v),
                        s.trigger(h.default.SUBTITLE_FRAG_PROCESSED, {
                          success: !1,
                          frag: e,
                        });
                    }
                  );
              }),
              (i.onFragDecrypted = function (e) {
                var t = e.frag,
                  a = e.payload;
                if (t.type === "subtitle") {
                  if (!Object(ee.isFiniteNumber)(this.initPTS[t.cc])) {
                    this.unparsedVttFrags.push(e);
                    return;
                  }
                  this._parseVTTs(t, a);
                }
              }),
              (i.onFragParsingUserdata = function (e) {
                var t = this.cea608Parser1,
                  a = this.cea608Parser2;
                if (!(!this.enabled || !(t && a)))
                  for (var s = 0; s < e.samples.length; s++) {
                    var l = e.samples[s].bytes;
                    if (l) {
                      var u = this.extractCea608Data(l);
                      t.addData(e.samples[s].pts, u[0]),
                        a.addData(e.samples[s].pts, u[1]);
                    }
                  }
              }),
              (i.extractCea608Data = function (e) {
                for (
                  var t = e[0] & 31, a = 2, s = [[], []], l = 0;
                  l < t;
                  l++
                ) {
                  var u = e[a++],
                    d = 127 & e[a++],
                    v = 127 & e[a++],
                    p = (4 & u) !== 0,
                    R = 3 & u;
                  (d === 0 && v === 0) ||
                    (p && (R === 0 || R === 1) && (s[R].push(d), s[R].push(v)));
                }
                return s;
              }),
              n
            );
          })(S);
          function Ji(o, n) {
            return o && o.label === n.name && !(o.textTrack1 || o.textTrack2);
          }
          function ea(o, n, i, r) {
            return Math.min(n, r) - Math.max(o, i);
          }
          function Nr() {
            return {
              ccOffset: 0,
              presentationOffset: 0,
              0: { start: 0, prevCC: -1, new: !1 },
            };
          }
          var ta = $i;
          function ra(o, n) {
            for (var i = 0; i < n.length; i++) {
              var r = n[i];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                "value" in r && (r.writable = !0),
                Object.defineProperty(o, r.key, r);
            }
          }
          function ia(o, n, i) {
            return n && ra(o.prototype, n), o;
          }
          function aa(o, n) {
            (o.prototype = Object.create(n.prototype)),
              (o.prototype.constructor = o),
              (o.__proto__ = n);
          }
          var na = (function (o) {
            aa(n, o);
            function n(r) {
              var e;
              return (
                (e =
                  o.call(
                    this,
                    r,
                    h.default.MEDIA_ATTACHED,
                    h.default.MEDIA_DETACHING,
                    h.default.MANIFEST_LOADED,
                    h.default.SUBTITLE_TRACK_LOADED
                  ) || this),
                (e.tracks = []),
                (e.trackId = -1),
                (e.media = null),
                (e.stopped = !0),
                (e.subtitleDisplay = !0),
                (e.queuedDefaultTrack = null),
                e
              );
            }
            var i = n.prototype;
            return (
              (i.destroy = function () {
                S.prototype.destroy.call(this);
              }),
              (i.onMediaAttached = function (e) {
                var t = this;
                (this.media = e.media),
                  this.media &&
                    (Object(ee.isFiniteNumber)(this.queuedDefaultTrack) &&
                      ((this.subtitleTrack = this.queuedDefaultTrack),
                      (this.queuedDefaultTrack = null)),
                    (this.trackChangeListener =
                      this._onTextTracksChanged.bind(this)),
                    (this.useTextTrackPolling = !(
                      this.media.textTracks &&
                      "onchange" in this.media.textTracks
                    )),
                    this.useTextTrackPolling
                      ? (this.subtitlePollingInterval = setInterval(
                          function () {
                            t.trackChangeListener();
                          },
                          500
                        ))
                      : this.media.textTracks.addEventListener(
                          "change",
                          this.trackChangeListener
                        ));
              }),
              (i.onMediaDetaching = function () {
                if (this.media) {
                  this.useTextTrackPolling
                    ? clearInterval(this.subtitlePollingInterval)
                    : this.media.textTracks.removeEventListener(
                        "change",
                        this.trackChangeListener
                      ),
                    Object(ee.isFiniteNumber)(this.subtitleTrack) &&
                      (this.queuedDefaultTrack = this.subtitleTrack);
                  var e = pr(this.media.textTracks);
                  e.forEach(function (t) {
                    Pt(t);
                  }),
                    (this.subtitleTrack = -1),
                    (this.media = null);
                }
              }),
              (i.onManifestLoaded = function (e) {
                var t = this,
                  a = e.subtitles || [];
                (this.tracks = a),
                  this.hls.trigger(h.default.SUBTITLE_TRACKS_UPDATED, {
                    subtitleTracks: a,
                  }),
                  a.forEach(function (s) {
                    s.default &&
                      (t.media
                        ? (t.subtitleTrack = s.id)
                        : (t.queuedDefaultTrack = s.id));
                  });
              }),
              (i.onSubtitleTrackLoaded = function (e) {
                var t = this,
                  a = e.id,
                  s = e.details,
                  l = this.trackId,
                  u = this.tracks,
                  d = u[l];
                if (a >= u.length || a !== l || !d || this.stopped) {
                  this._clearReloadTimer();
                  return;
                }
                if ((c.logger.log("subtitle track " + a + " loaded"), s.live)) {
                  var v = ce(d.details, s, e.stats.trequest);
                  c.logger.log(
                    "Reloading live subtitle playlist in " + v + "ms"
                  ),
                    (this.timer = setTimeout(function () {
                      t._loadCurrentTrack();
                    }, v));
                } else this._clearReloadTimer();
              }),
              (i.startLoad = function () {
                (this.stopped = !1), this._loadCurrentTrack();
              }),
              (i.stopLoad = function () {
                (this.stopped = !0), this._clearReloadTimer();
              }),
              (i._clearReloadTimer = function () {
                this.timer && (clearTimeout(this.timer), (this.timer = null));
              }),
              (i._loadCurrentTrack = function () {
                var e = this.trackId,
                  t = this.tracks,
                  a = this.hls,
                  s = t[e];
                e < 0 ||
                  !s ||
                  (s.details && !s.details.live) ||
                  (c.logger.log("Loading subtitle track " + e),
                  a.trigger(h.default.SUBTITLE_TRACK_LOADING, {
                    url: s.url,
                    id: e,
                  }));
              }),
              (i._toggleTrackModes = function (e) {
                var t = this.media,
                  a = this.subtitleDisplay,
                  s = this.trackId;
                if (t) {
                  var l = pr(t.textTracks);
                  if (e === -1)
                    [].slice.call(l).forEach(function (v) {
                      v.mode = "disabled";
                    });
                  else {
                    var u = l[s];
                    u && (u.mode = "disabled");
                  }
                  var d = l[e];
                  d && (d.mode = a ? "showing" : "hidden");
                }
              }),
              (i._setSubtitleTrackInternal = function (e) {
                var t = this.hls,
                  a = this.tracks;
                !Object(ee.isFiniteNumber)(e) ||
                  e < -1 ||
                  e >= a.length ||
                  ((this.trackId = e),
                  c.logger.log("Switching to subtitle track " + e),
                  t.trigger(h.default.SUBTITLE_TRACK_SWITCH, { id: e }),
                  this._loadCurrentTrack());
              }),
              (i._onTextTracksChanged = function () {
                if (
                  !(!this.media || !this.hls.config.renderTextTracksNatively)
                ) {
                  for (
                    var e = -1, t = pr(this.media.textTracks), a = 0;
                    a < t.length;
                    a++
                  )
                    if (t[a].mode === "hidden") e = a;
                    else if (t[a].mode === "showing") {
                      e = a;
                      break;
                    }
                  this.subtitleTrack = e;
                }
              }),
              ia(n, [
                {
                  key: "subtitleTracks",
                  get: function () {
                    return this.tracks;
                  },
                },
                {
                  key: "subtitleTrack",
                  get: function () {
                    return this.trackId;
                  },
                  set: function (e) {
                    this.trackId !== e &&
                      (this._toggleTrackModes(e),
                      this._setSubtitleTrackInternal(e));
                  },
                },
              ]),
              n
            );
          })(S);
          function pr(o) {
            for (var n = [], i = 0; i < o.length; i++) {
              var r = o[i];
              r.kind === "subtitles" && r.label && n.push(o[i]);
            }
            return n;
          }
          var sa = na,
            oa = K("./src/crypt/decrypter.js");
          function la(o) {
            if (o === void 0)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return o;
          }
          function ua(o, n) {
            (o.prototype = Object.create(n.prototype)),
              (o.prototype.constructor = o),
              (o.__proto__ = n);
          }
          var fa = window,
            Ur = fa.performance,
            mr = 500,
            da = (function (o) {
              ua(n, o);
              function n(r, e) {
                var t;
                return (
                  (t =
                    o.call(
                      this,
                      r,
                      h.default.MEDIA_ATTACHED,
                      h.default.MEDIA_DETACHING,
                      h.default.ERROR,
                      h.default.KEY_LOADED,
                      h.default.FRAG_LOADED,
                      h.default.SUBTITLE_TRACKS_UPDATED,
                      h.default.SUBTITLE_TRACK_SWITCH,
                      h.default.SUBTITLE_TRACK_LOADED,
                      h.default.SUBTITLE_FRAG_PROCESSED,
                      h.default.LEVEL_UPDATED
                    ) || this),
                  (t.fragmentTracker = e),
                  (t.config = r.config),
                  (t.state = P.STOPPED),
                  (t.tracks = []),
                  (t.tracksBuffered = []),
                  (t.currentTrackId = -1),
                  (t.decrypter = new oa.default(r, r.config)),
                  (t.lastAVStart = 0),
                  (t._onMediaSeeking = t.onMediaSeeking.bind(la(t))),
                  t
                );
              }
              var i = n.prototype;
              return (
                (i.startLoad = function () {
                  this.stopLoad(), (this.state = P.IDLE);
                  var e = this.tracks[this.currentTrackId];
                  e && e.details && (this.setInterval(mr), this.tick());
                }),
                (i.onSubtitleFragProcessed = function (e) {
                  var t = e.frag,
                    a = e.success;
                  if (((this.fragPrevious = t), (this.state = P.IDLE), !!a)) {
                    var s = this.tracksBuffered[this.currentTrackId];
                    if (s) {
                      for (var l, u = t.start, d = 0; d < s.length; d++)
                        if (u >= s[d].start && u <= s[d].end) {
                          l = s[d];
                          break;
                        }
                      var v = t.start + t.duration;
                      l ? (l.end = v) : ((l = { start: u, end: v }), s.push(l));
                    }
                  }
                }),
                (i.onMediaAttached = function (e) {
                  var t = e.media;
                  (this.media = t),
                    t.addEventListener("seeking", this._onMediaSeeking),
                    (this.state = P.IDLE);
                }),
                (i.onMediaDetaching = function () {
                  var e = this;
                  this.media &&
                    (this.media.removeEventListener(
                      "seeking",
                      this._onMediaSeeking
                    ),
                    this.fragmentTracker.removeAllFragments(),
                    (this.currentTrackId = -1),
                    this.tracks.forEach(function (t) {
                      e.tracksBuffered[t.id] = [];
                    }),
                    (this.media = null),
                    (this.state = P.STOPPED));
                }),
                (i.onError = function (e) {
                  var t = e.frag;
                  !t ||
                    t.type !== "subtitle" ||
                    (this.fragCurrent &&
                      this.fragCurrent.loader &&
                      this.fragCurrent.loader.abort(),
                    (this.state = P.IDLE));
                }),
                (i.onSubtitleTracksUpdated = function (e) {
                  var t = this;
                  c.logger.log("subtitle tracks updated"),
                    (this.tracksBuffered = []),
                    (this.tracks = e.subtitleTracks),
                    this.tracks.forEach(function (a) {
                      t.tracksBuffered[a.id] = [];
                    });
                }),
                (i.onSubtitleTrackSwitch = function (e) {
                  if (
                    ((this.currentTrackId = e.id),
                    !this.tracks ||
                      !this.tracks.length ||
                      this.currentTrackId === -1)
                  ) {
                    this.clearInterval();
                    return;
                  }
                  var t = this.tracks[this.currentTrackId];
                  t && t.details && this.setInterval(mr);
                }),
                (i.onSubtitleTrackLoaded = function (e) {
                  var t = e.id,
                    a = e.details,
                    s = this.currentTrackId,
                    l = this.tracks,
                    u = l[s];
                  t >= l.length ||
                    t !== s ||
                    !u ||
                    (a.live && ae(u.details, a, this.lastAVStart),
                    (u.details = a),
                    this.setInterval(mr));
                }),
                (i.onKeyLoaded = function () {
                  this.state === P.KEY_LOADING && (this.state = P.IDLE);
                }),
                (i.onFragLoaded = function (e) {
                  var t = this.fragCurrent,
                    a = e.frag.decryptdata,
                    s = e.frag,
                    l = this.hls;
                  if (
                    this.state === P.FRAG_LOADING &&
                    t &&
                    e.frag.type === "subtitle" &&
                    t.sn === e.frag.sn &&
                    e.payload.byteLength > 0 &&
                    a &&
                    a.key &&
                    a.method === "AES-128"
                  ) {
                    var u = Ur.now();
                    this.decrypter.decrypt(
                      e.payload,
                      a.key.buffer,
                      a.iv.buffer,
                      function (d) {
                        var v = Ur.now();
                        l.trigger(h.default.FRAG_DECRYPTED, {
                          frag: s,
                          payload: d,
                          stats: { tstart: u, tdecrypt: v },
                        });
                      }
                    );
                  }
                }),
                (i.onLevelUpdated = function (e) {
                  var t = e.details,
                    a = t.fragments;
                  this.lastAVStart = a.length ? a[0].start : 0;
                }),
                (i.doTick = function () {
                  if (!this.media) {
                    this.state = P.IDLE;
                    return;
                  }
                  switch (this.state) {
                    case P.IDLE: {
                      var e = this.config,
                        t = this.currentTrackId,
                        a = this.fragmentTracker,
                        s = this.media,
                        l = this.tracks;
                      if (!l || !l[t] || !l[t].details) break;
                      var u = e.maxBufferHole,
                        d = e.maxFragLookUpTolerance,
                        v = Math.min(e.maxBufferLength, e.maxMaxBufferLength),
                        p = x.bufferedInfo(
                          this._getBuffered(),
                          s.currentTime,
                          u
                        ),
                        R = p.end,
                        O = p.len,
                        j = l[t].details,
                        q = j.fragments,
                        ne = q.length,
                        re = q[ne - 1].start + q[ne - 1].duration;
                      if (O > v) return;
                      var ue,
                        de = this.fragPrevious;
                      R < re
                        ? (de &&
                            j.hasProgramDateTime &&
                            (ue = at(q, de.endProgramDateTime, d)),
                          ue || (ue = Ke(de, q, R, d)))
                        : (ue = q[ne - 1]),
                        ue && ue.encrypted
                          ? (c.logger.log("Loading key for " + ue.sn),
                            (this.state = P.KEY_LOADING),
                            this.hls.trigger(h.default.KEY_LOADING, {
                              frag: ue,
                            }))
                          : ue &&
                            a.getState(ue) === Ye.NOT_LOADED &&
                            ((this.fragCurrent = ue),
                            (this.state = P.FRAG_LOADING),
                            this.hls.trigger(h.default.FRAG_LOADING, {
                              frag: ue,
                            }));
                    }
                  }
                }),
                (i.stopLoad = function () {
                  (this.lastAVStart = 0),
                    (this.fragPrevious = null),
                    o.prototype.stopLoad.call(this);
                }),
                (i._getBuffered = function () {
                  return this.tracksBuffered[this.currentTrackId] || [];
                }),
                (i.onMediaSeeking = function () {
                  if (this.fragCurrent) {
                    var e = this.media ? this.media.currentTime : 0,
                      t = this.config.maxFragLookUpTolerance,
                      a = this.fragCurrent.start - t,
                      s =
                        this.fragCurrent.start + this.fragCurrent.duration + t;
                    (e < a || e > s) &&
                      (this.fragCurrent.loader &&
                        this.fragCurrent.loader.abort(),
                      this.fragmentTracker.removeFragment(this.fragCurrent),
                      (this.fragCurrent = null),
                      (this.fragPrevious = null),
                      (this.state = P.IDLE),
                      this.tick());
                  }
                }),
                n
              );
            })(nt),
            Bt;
          (function (o) {
            (o.WIDEVINE = "com.widevine.alpha"),
              (o.PLAYREADY = "com.microsoft.playready");
          })(Bt || (Bt = {}));
          var ha = (function () {
            return typeof window < "u" &&
              window.navigator &&
              window.navigator.requestMediaKeySystemAccess
              ? window.navigator.requestMediaKeySystemAccess.bind(
                  window.navigator
                )
              : null;
          })();
          function ca(o, n) {
            for (var i = 0; i < n.length; i++) {
              var r = n[i];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                "value" in r && (r.writable = !0),
                Object.defineProperty(o, r.key, r);
            }
          }
          function ga(o, n, i) {
            return n && ca(o.prototype, n), o;
          }
          function va(o, n) {
            (o.prototype = Object.create(n.prototype)),
              (o.prototype.constructor = o),
              (o.__proto__ = n);
          }
          var Br = 3,
            pa = function (n, i, r) {
              var e = { audioCapabilities: [], videoCapabilities: [] };
              return (
                n.forEach(function (t) {
                  e.audioCapabilities.push({
                    contentType: 'audio/mp4; codecs="' + t + '"',
                    robustness: r.audioRobustness || "",
                  });
                }),
                i.forEach(function (t) {
                  e.videoCapabilities.push({
                    contentType: 'video/mp4; codecs="' + t + '"',
                    robustness: r.videoRobustness || "",
                  });
                }),
                [e]
              );
            },
            ma = function (n, i, r, e) {
              switch (n) {
                case Bt.WIDEVINE:
                  return pa(i, r, e);
                default:
                  throw new Error("Unknown key-system: " + n);
              }
            },
            xa = (function (o) {
              va(n, o);
              function n(r) {
                var e;
                return (
                  (e =
                    o.call(
                      this,
                      r,
                      h.default.MEDIA_ATTACHED,
                      h.default.MEDIA_DETACHED,
                      h.default.MANIFEST_PARSED
                    ) || this),
                  (e._widevineLicenseUrl = void 0),
                  (e._licenseXhrSetup = void 0),
                  (e._emeEnabled = void 0),
                  (e._requestMediaKeySystemAccess = void 0),
                  (e._drmSystemOptions = void 0),
                  (e._config = void 0),
                  (e._mediaKeysList = []),
                  (e._media = null),
                  (e._hasSetMediaKeys = !1),
                  (e._requestLicenseFailureCount = 0),
                  (e.mediaKeysPromise = null),
                  (e._onMediaEncrypted = function (t) {
                    if (
                      (c.logger.log(
                        'Media is encrypted using "' +
                          t.initDataType +
                          '" init data type'
                      ),
                      !e.mediaKeysPromise)
                    ) {
                      c.logger.error(
                        "Fatal: Media is encrypted but no CDM access or no keys have been requested"
                      ),
                        e.hls.trigger(h.default.ERROR, {
                          type: D.ErrorTypes.KEY_SYSTEM_ERROR,
                          details: D.ErrorDetails.KEY_SYSTEM_NO_KEYS,
                          fatal: !0,
                        });
                      return;
                    }
                    var a = function (l) {
                      e._media &&
                        (e._attemptSetMediaKeys(l),
                        e._generateRequestWithPreferredKeySession(
                          t.initDataType,
                          t.initData
                        ));
                    };
                    e.mediaKeysPromise.then(a).catch(a);
                  }),
                  (e._config = r.config),
                  (e._widevineLicenseUrl = e._config.widevineLicenseUrl),
                  (e._licenseXhrSetup = e._config.licenseXhrSetup),
                  (e._emeEnabled = e._config.emeEnabled),
                  (e._requestMediaKeySystemAccess =
                    e._config.requestMediaKeySystemAccessFunc),
                  (e._drmSystemOptions = r.config.drmSystemOptions),
                  e
                );
              }
              var i = n.prototype;
              return (
                (i.getLicenseServerUrl = function (e) {
                  switch (e) {
                    case Bt.WIDEVINE:
                      if (!this._widevineLicenseUrl) break;
                      return this._widevineLicenseUrl;
                  }
                  throw new Error(
                    'no license server URL configured for key-system "' +
                      e +
                      '"'
                  );
                }),
                (i._attemptKeySystemAccess = function (e, t, a) {
                  var s = this,
                    l = ma(e, t, a, this._drmSystemOptions);
                  c.logger.log("Requesting encrypted media key-system access");
                  var u = this.requestMediaKeySystemAccess(e, l);
                  (this.mediaKeysPromise = u.then(function (d) {
                    return s._onMediaKeySystemAccessObtained(e, d);
                  })),
                    u.catch(function (d) {
                      c.logger.error(
                        'Failed to obtain key-system "' + e + '" access:',
                        d
                      );
                    });
                }),
                (i._onMediaKeySystemAccessObtained = function (e, t) {
                  var a = this;
                  c.logger.log('Access for key-system "' + e + '" obtained');
                  var s = {
                    mediaKeysSessionInitialized: !1,
                    mediaKeySystemAccess: t,
                    mediaKeySystemDomain: e,
                  };
                  this._mediaKeysList.push(s);
                  var l = Promise.resolve()
                    .then(function () {
                      return t.createMediaKeys();
                    })
                    .then(function (u) {
                      return (
                        (s.mediaKeys = u),
                        c.logger.log(
                          'Media-keys created for key-system "' + e + '"'
                        ),
                        a._onMediaKeysCreated(),
                        u
                      );
                    });
                  return (
                    l.catch(function (u) {
                      c.logger.error("Failed to create media-keys:", u);
                    }),
                    l
                  );
                }),
                (i._onMediaKeysCreated = function () {
                  var e = this;
                  this._mediaKeysList.forEach(function (t) {
                    t.mediaKeysSession ||
                      ((t.mediaKeysSession = t.mediaKeys.createSession()),
                      e._onNewMediaKeySession(t.mediaKeysSession));
                  });
                }),
                (i._onNewMediaKeySession = function (e) {
                  var t = this;
                  c.logger.log("New key-system session " + e.sessionId),
                    e.addEventListener(
                      "message",
                      function (a) {
                        t._onKeySessionMessage(e, a.message);
                      },
                      !1
                    );
                }),
                (i._onKeySessionMessage = function (e, t) {
                  c.logger.log(
                    "Got EME message event, creating license request"
                  ),
                    this._requestLicense(t, function (a) {
                      c.logger.log(
                        "Received license data (length: " +
                          (a && a.byteLength) +
                          "), updating key-session"
                      ),
                        e.update(a);
                    });
                }),
                (i._attemptSetMediaKeys = function (e) {
                  if (!this._media)
                    throw new Error(
                      "Attempted to set mediaKeys without first attaching a media element"
                    );
                  if (!this._hasSetMediaKeys) {
                    var t = this._mediaKeysList[0];
                    if (!t || !t.mediaKeys) {
                      c.logger.error(
                        "Fatal: Media is encrypted but no CDM access or no keys have been obtained yet"
                      ),
                        this.hls.trigger(h.default.ERROR, {
                          type: D.ErrorTypes.KEY_SYSTEM_ERROR,
                          details: D.ErrorDetails.KEY_SYSTEM_NO_KEYS,
                          fatal: !0,
                        });
                      return;
                    }
                    c.logger.log("Setting keys for encrypted media"),
                      this._media.setMediaKeys(t.mediaKeys),
                      (this._hasSetMediaKeys = !0);
                  }
                }),
                (i._generateRequestWithPreferredKeySession = function (e, t) {
                  var a = this,
                    s = this._mediaKeysList[0];
                  if (!s) {
                    c.logger.error(
                      "Fatal: Media is encrypted but not any key-system access has been obtained yet"
                    ),
                      this.hls.trigger(h.default.ERROR, {
                        type: D.ErrorTypes.KEY_SYSTEM_ERROR,
                        details: D.ErrorDetails.KEY_SYSTEM_NO_ACCESS,
                        fatal: !0,
                      });
                    return;
                  }
                  if (s.mediaKeysSessionInitialized) {
                    c.logger.warn(
                      "Key-Session already initialized but requested again"
                    );
                    return;
                  }
                  var l = s.mediaKeysSession;
                  if (!l) {
                    c.logger.error(
                      "Fatal: Media is encrypted but no key-session existing"
                    ),
                      this.hls.trigger(h.default.ERROR, {
                        type: D.ErrorTypes.KEY_SYSTEM_ERROR,
                        details: D.ErrorDetails.KEY_SYSTEM_NO_SESSION,
                        fatal: !0,
                      });
                    return;
                  }
                  if (!t) {
                    c.logger.warn(
                      "Fatal: initData required for generating a key session is null"
                    ),
                      this.hls.trigger(h.default.ERROR, {
                        type: D.ErrorTypes.KEY_SYSTEM_ERROR,
                        details: D.ErrorDetails.KEY_SYSTEM_NO_INIT_DATA,
                        fatal: !0,
                      });
                    return;
                  }
                  c.logger.log(
                    'Generating key-session request for "' +
                      e +
                      '" init data type'
                  ),
                    (s.mediaKeysSessionInitialized = !0),
                    l
                      .generateRequest(e, t)
                      .then(function () {
                        c.logger.debug("Key-session generation succeeded");
                      })
                      .catch(function (u) {
                        c.logger.error(
                          "Error generating key-session request:",
                          u
                        ),
                          a.hls.trigger(h.default.ERROR, {
                            type: D.ErrorTypes.KEY_SYSTEM_ERROR,
                            details: D.ErrorDetails.KEY_SYSTEM_NO_SESSION,
                            fatal: !1,
                          });
                      });
                }),
                (i._createLicenseXhr = function (e, t, a) {
                  var s = new XMLHttpRequest(),
                    l = this._licenseXhrSetup;
                  try {
                    if (l)
                      try {
                        l(s, e);
                      } catch {
                        s.open("POST", e, !0), l(s, e);
                      }
                    s.readyState || s.open("POST", e, !0);
                  } catch (u) {
                    throw new Error(
                      "issue setting up KeySystem license XHR " + u
                    );
                  }
                  return (
                    (s.responseType = "arraybuffer"),
                    (s.onreadystatechange =
                      this._onLicenseRequestReadyStageChange.bind(
                        this,
                        s,
                        e,
                        t,
                        a
                      )),
                    s
                  );
                }),
                (i._onLicenseRequestReadyStageChange = function (e, t, a, s) {
                  switch (e.readyState) {
                    case 4:
                      if (e.status === 200)
                        (this._requestLicenseFailureCount = 0),
                          c.logger.log("License request succeeded"),
                          e.responseType !== "arraybuffer" &&
                            c.logger.warn(
                              "xhr response type was not set to the expected arraybuffer for license request"
                            ),
                          s(e.response);
                      else {
                        if (
                          (c.logger.error(
                            "License Request XHR failed (" +
                              t +
                              "). Status: " +
                              e.status +
                              " (" +
                              e.statusText +
                              ")"
                          ),
                          this._requestLicenseFailureCount++,
                          this._requestLicenseFailureCount > Br)
                        ) {
                          this.hls.trigger(h.default.ERROR, {
                            type: D.ErrorTypes.KEY_SYSTEM_ERROR,
                            details:
                              D.ErrorDetails.KEY_SYSTEM_LICENSE_REQUEST_FAILED,
                            fatal: !0,
                          });
                          return;
                        }
                        var l = Br - this._requestLicenseFailureCount + 1;
                        c.logger.warn(
                          "Retrying license request, " + l + " attempts left"
                        ),
                          this._requestLicense(a, s);
                      }
                      break;
                  }
                }),
                (i._generateLicenseRequestChallenge = function (e, t) {
                  switch (e.mediaKeySystemDomain) {
                    case Bt.WIDEVINE:
                      return t;
                  }
                  throw new Error(
                    "unsupported key-system: " + e.mediaKeySystemDomain
                  );
                }),
                (i._requestLicense = function (e, t) {
                  c.logger.log("Requesting content license for key-system");
                  var a = this._mediaKeysList[0];
                  if (!a) {
                    c.logger.error(
                      "Fatal error: Media is encrypted but no key-system access has been obtained yet"
                    ),
                      this.hls.trigger(h.default.ERROR, {
                        type: D.ErrorTypes.KEY_SYSTEM_ERROR,
                        details: D.ErrorDetails.KEY_SYSTEM_NO_ACCESS,
                        fatal: !0,
                      });
                    return;
                  }
                  try {
                    var s = this.getLicenseServerUrl(a.mediaKeySystemDomain),
                      l = this._createLicenseXhr(s, e, t);
                    c.logger.log("Sending license request to URL: " + s);
                    var u = this._generateLicenseRequestChallenge(a, e);
                    l.send(u);
                  } catch (d) {
                    c.logger.error("Failure requesting DRM license: " + d),
                      this.hls.trigger(h.default.ERROR, {
                        type: D.ErrorTypes.KEY_SYSTEM_ERROR,
                        details:
                          D.ErrorDetails.KEY_SYSTEM_LICENSE_REQUEST_FAILED,
                        fatal: !0,
                      });
                  }
                }),
                (i.onMediaAttached = function (e) {
                  if (this._emeEnabled) {
                    var t = e.media;
                    (this._media = t),
                      t.addEventListener("encrypted", this._onMediaEncrypted);
                  }
                }),
                (i.onMediaDetached = function () {
                  var e = this._media,
                    t = this._mediaKeysList;
                  e &&
                    (e.removeEventListener("encrypted", this._onMediaEncrypted),
                    (this._media = null),
                    (this._mediaKeysList = []),
                    Promise.all(
                      t.map(function (a) {
                        if (a.mediaKeysSession)
                          return a.mediaKeysSession
                            .close()
                            .catch(function () {});
                      })
                    )
                      .then(function () {
                        return e.setMediaKeys(null);
                      })
                      .catch(function () {}));
                }),
                (i.onManifestParsed = function (e) {
                  if (this._emeEnabled) {
                    var t = e.levels.map(function (s) {
                        return s.audioCodec;
                      }),
                      a = e.levels.map(function (s) {
                        return s.videoCodec;
                      });
                    this._attemptKeySystemAccess(Bt.WIDEVINE, t, a);
                  }
                }),
                ga(n, [
                  {
                    key: "requestMediaKeySystemAccess",
                    get: function () {
                      if (!this._requestMediaKeySystemAccess)
                        throw new Error(
                          "No requestMediaKeySystemAccess function configured"
                        );
                      return this._requestMediaKeySystemAccess;
                    },
                  },
                ]),
                n
              );
            })(S),
            ya = xa;
          function Gr(o, n) {
            var i = Object.keys(o);
            if (Object.getOwnPropertySymbols) {
              var r = Object.getOwnPropertySymbols(o);
              n &&
                (r = r.filter(function (e) {
                  return Object.getOwnPropertyDescriptor(o, e).enumerable;
                })),
                i.push.apply(i, r);
            }
            return i;
          }
          function Kr(o) {
            for (var n = 1; n < arguments.length; n++) {
              var i = arguments[n] != null ? arguments[n] : {};
              n % 2
                ? Gr(Object(i), !0).forEach(function (r) {
                    Ea(o, r, i[r]);
                  })
                : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(
                    o,
                    Object.getOwnPropertyDescriptors(i)
                  )
                : Gr(Object(i)).forEach(function (r) {
                    Object.defineProperty(
                      o,
                      r,
                      Object.getOwnPropertyDescriptor(i, r)
                    );
                  });
            }
            return o;
          }
          function Ea(o, n, i) {
            return (
              n in o
                ? Object.defineProperty(o, n, {
                    value: i,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                  })
                : (o[n] = i),
              o
            );
          }
          var Ta = Kr(
            Kr(
              {
                autoStartLoad: !0,
                startPosition: -1,
                defaultAudioCodec: void 0,
                debug: !1,
                capLevelOnFPSDrop: !1,
                capLevelToPlayerSize: !1,
                initialLiveManifestSize: 1,
                maxBufferLength: 30,
                maxBufferSize: 60 * 1e3 * 1e3,
                maxBufferHole: 0.5,
                lowBufferWatchdogPeriod: 0.5,
                highBufferWatchdogPeriod: 3,
                nudgeOffset: 0.1,
                nudgeMaxRetry: 3,
                maxFragLookUpTolerance: 0.25,
                liveSyncDurationCount: 3,
                liveMaxLatencyDurationCount: 1 / 0,
                liveSyncDuration: void 0,
                liveMaxLatencyDuration: void 0,
                liveDurationInfinity: !1,
                liveBackBufferLength: 1 / 0,
                maxMaxBufferLength: 600,
                enableWorker: !0,
                enableSoftwareAES: !0,
                manifestLoadingTimeOut: 1e4,
                manifestLoadingMaxRetry: 1,
                manifestLoadingRetryDelay: 1e3,
                manifestLoadingMaxRetryTimeout: 64e3,
                startLevel: void 0,
                levelLoadingTimeOut: 1e4,
                levelLoadingMaxRetry: 4,
                levelLoadingRetryDelay: 1e3,
                levelLoadingMaxRetryTimeout: 64e3,
                fragLoadingTimeOut: 2e4,
                fragLoadingMaxRetry: 6,
                fragLoadingRetryDelay: 1e3,
                fragLoadingMaxRetryTimeout: 64e3,
                startFragPrefetch: !1,
                fpsDroppedMonitoringPeriod: 5e3,
                fpsDroppedMonitoringThreshold: 0.2,
                appendErrorMaxRetry: 3,
                loader: Ti,
                fLoader: void 0,
                pLoader: void 0,
                xhrSetup: void 0,
                licenseXhrSetup: void 0,
                abrController: oi,
                bufferController: fi,
                capLevelController: gi,
                fpsController: yi,
                stretchShortVideoTrack: !1,
                maxAudioFramesDrift: 1,
                forceKeyFrameOnDiscontinuity: !0,
                abrEwmaFastLive: 3,
                abrEwmaSlowLive: 9,
                abrEwmaFastVoD: 3,
                abrEwmaSlowVoD: 9,
                abrEwmaDefaultEstimate: 5e5,
                abrBandWidthFactor: 0.95,
                abrBandWidthUpFactor: 0.7,
                abrMaxWithRealBitrate: !1,
                maxStarvationDelay: 4,
                maxLoadingDelay: 4,
                minAutoBitrate: 0,
                emeEnabled: !1,
                widevineLicenseUrl: void 0,
                drmSystemOptions: {},
                requestMediaKeySystemAccessFunc: ha,
                testBandwidth: !0,
              },
              Sa()
            ),
            {},
            {
              subtitleStreamController: da,
              subtitleTrackController: sa,
              timelineController: ta,
              audioStreamController: Oi,
              audioTrackController: bi,
              emeController: ya,
            }
          );
          function Sa() {
            return {
              cueHandler: Q,
              enableCEA708Captions: !0,
              enableWebVTT: !0,
              captionsTextTrack1Label: "English",
              captionsTextTrack1LanguageCode: "en",
              captionsTextTrack2Label: "Spanish",
              captionsTextTrack2LanguageCode: "es",
              captionsTextTrack3Label: "Unknown CC",
              captionsTextTrack3LanguageCode: "",
              captionsTextTrack4Label: "Unknown CC",
              captionsTextTrack4LanguageCode: "",
              renderTextTracksNatively: !0,
            };
          }
          function jr(o, n) {
            var i = Object.keys(o);
            if (Object.getOwnPropertySymbols) {
              var r = Object.getOwnPropertySymbols(o);
              n &&
                (r = r.filter(function (e) {
                  return Object.getOwnPropertyDescriptor(o, e).enumerable;
                })),
                i.push.apply(i, r);
            }
            return i;
          }
          function Hr(o) {
            for (var n = 1; n < arguments.length; n++) {
              var i = arguments[n] != null ? arguments[n] : {};
              n % 2
                ? jr(Object(i), !0).forEach(function (r) {
                    _a(o, r, i[r]);
                  })
                : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(
                    o,
                    Object.getOwnPropertyDescriptors(i)
                  )
                : jr(Object(i)).forEach(function (r) {
                    Object.defineProperty(
                      o,
                      r,
                      Object.getOwnPropertyDescriptor(i, r)
                    );
                  });
            }
            return o;
          }
          function _a(o, n, i) {
            return (
              n in o
                ? Object.defineProperty(o, n, {
                    value: i,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                  })
                : (o[n] = i),
              o
            );
          }
          function Xe(o) {
            if (o === void 0)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return o;
          }
          function Wr(o, n) {
            for (var i = 0; i < n.length; i++) {
              var r = n[i];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                "value" in r && (r.writable = !0),
                Object.defineProperty(o, r.key, r);
            }
          }
          function Vr(o, n, i) {
            return n && Wr(o.prototype, n), i && Wr(o, i), o;
          }
          function Aa(o, n) {
            (o.prototype = Object.create(n.prototype)),
              (o.prototype.constructor = o),
              (o.__proto__ = n);
          }
          var Yr = (function (o) {
            Aa(n, o),
              (n.isSupported = function () {
                return dr();
              }),
              Vr(n, null, [
                {
                  key: "version",
                  get: function () {
                    return "0.14.17";
                  },
                },
                {
                  key: "Events",
                  get: function () {
                    return h.default;
                  },
                },
                {
                  key: "ErrorTypes",
                  get: function () {
                    return D.ErrorTypes;
                  },
                },
                {
                  key: "ErrorDetails",
                  get: function () {
                    return D.ErrorDetails;
                  },
                },
                {
                  key: "DefaultConfig",
                  get: function () {
                    return n.defaultConfig ? n.defaultConfig : Ta;
                  },
                  set: function (e) {
                    n.defaultConfig = e;
                  },
                },
              ]);
            function n(r) {
              var e;
              r === void 0 && (r = {}),
                (e = o.call(this) || this),
                (e.config = void 0),
                (e._autoLevelCapping = void 0),
                (e.abrController = void 0),
                (e.capLevelController = void 0),
                (e.levelController = void 0),
                (e.streamController = void 0),
                (e.networkControllers = void 0),
                (e.audioTrackController = void 0),
                (e.subtitleTrackController = void 0),
                (e.emeController = void 0),
                (e.coreComponents = void 0),
                (e.media = null),
                (e.url = null);
              var t = n.DefaultConfig;
              if (
                (r.liveSyncDurationCount || r.liveMaxLatencyDurationCount) &&
                (r.liveSyncDuration || r.liveMaxLatencyDuration)
              )
                throw new Error(
                  "Illegal hls.js config: don't mix up liveSyncDurationCount/liveMaxLatencyDurationCount and liveSyncDuration/liveMaxLatencyDuration"
                );
              e.config = Hr(Hr({}, t), r);
              var a = Xe(e),
                s = a.config;
              if (
                s.liveMaxLatencyDurationCount !== void 0 &&
                s.liveMaxLatencyDurationCount <= s.liveSyncDurationCount
              )
                throw new Error(
                  'Illegal hls.js config: "liveMaxLatencyDurationCount" must be gt "liveSyncDurationCount"'
                );
              if (
                s.liveMaxLatencyDuration !== void 0 &&
                (s.liveSyncDuration === void 0 ||
                  s.liveMaxLatencyDuration <= s.liveSyncDuration)
              )
                throw new Error(
                  'Illegal hls.js config: "liveMaxLatencyDuration" must be gt "liveSyncDuration"'
                );
              Object(c.enableLogs)(s.debug), (e._autoLevelCapping = -1);
              var l = (e.abrController = new s.abrController(Xe(e))),
                u = new s.bufferController(Xe(e)),
                d = (e.capLevelController = new s.capLevelController(Xe(e))),
                v = new s.fpsController(Xe(e)),
                p = new st(Xe(e)),
                R = new Je(Xe(e)),
                O = new Dt(Xe(e)),
                j = new fr(Xe(e)),
                q = (e.levelController = new ur(Xe(e))),
                ne = new sr(Xe(e)),
                re = (e.streamController = new $t(Xe(e), ne)),
                ue = [q, re],
                de = s.audioStreamController;
              de && ue.push(new de(Xe(e), ne)), (e.networkControllers = ue);
              var ye = [p, R, O, l, u, d, v, j, ne];
              if (((de = s.audioTrackController), de)) {
                var Ue = new de(Xe(e));
                (e.audioTrackController = Ue), ye.push(Ue);
              }
              if (((de = s.subtitleTrackController), de)) {
                var ft = new de(Xe(e));
                (e.subtitleTrackController = ft), ue.push(ft);
              }
              if (((de = s.emeController), de)) {
                var Qe = new de(Xe(e));
                (e.emeController = Qe), ye.push(Qe);
              }
              return (
                (de = s.subtitleStreamController),
                de && ue.push(new de(Xe(e), ne)),
                (de = s.timelineController),
                de && ye.push(new de(Xe(e))),
                (e.coreComponents = ye),
                e
              );
            }
            var i = n.prototype;
            return (
              (i.destroy = function () {
                c.logger.log("destroy"),
                  this.trigger(h.default.DESTROYING),
                  this.detachMedia(),
                  this.coreComponents
                    .concat(this.networkControllers)
                    .forEach(function (e) {
                      e.destroy();
                    }),
                  (this.url = null),
                  this.removeAllListeners(),
                  (this._autoLevelCapping = -1);
              }),
              (i.attachMedia = function (e) {
                c.logger.log("attachMedia"),
                  (this.media = e),
                  this.trigger(h.default.MEDIA_ATTACHING, { media: e });
              }),
              (i.detachMedia = function () {
                c.logger.log("detachMedia"),
                  this.trigger(h.default.MEDIA_DETACHING),
                  (this.media = null);
              }),
              (i.loadSource = function (e) {
                (e = W.buildAbsoluteURL(window.location.href, e, {
                  alwaysNormalize: !0,
                })),
                  c.logger.log("loadSource:" + e),
                  (this.url = e),
                  this.trigger(h.default.MANIFEST_LOADING, { url: e });
              }),
              (i.startLoad = function (e) {
                e === void 0 && (e = -1),
                  c.logger.log("startLoad(" + e + ")"),
                  this.networkControllers.forEach(function (t) {
                    t.startLoad(e);
                  });
              }),
              (i.stopLoad = function () {
                c.logger.log("stopLoad"),
                  this.networkControllers.forEach(function (e) {
                    e.stopLoad();
                  });
              }),
              (i.swapAudioCodec = function () {
                c.logger.log("swapAudioCodec"),
                  this.streamController.swapAudioCodec();
              }),
              (i.recoverMediaError = function () {
                c.logger.log("recoverMediaError");
                var e = this.media;
                this.detachMedia(), e && this.attachMedia(e);
              }),
              (i.removeLevel = function (e, t) {
                t === void 0 && (t = 0), this.levelController.removeLevel(e, t);
              }),
              Vr(n, [
                {
                  key: "levels",
                  get: function () {
                    return this.levelController.levels;
                  },
                },
                {
                  key: "currentLevel",
                  get: function () {
                    return this.streamController.currentLevel;
                  },
                  set: function (e) {
                    c.logger.log("set currentLevel:" + e),
                      (this.loadLevel = e),
                      this.streamController.immediateLevelSwitch();
                  },
                },
                {
                  key: "nextLevel",
                  get: function () {
                    return this.streamController.nextLevel;
                  },
                  set: function (e) {
                    c.logger.log("set nextLevel:" + e),
                      (this.levelController.manualLevel = e),
                      this.streamController.nextLevelSwitch();
                  },
                },
                {
                  key: "loadLevel",
                  get: function () {
                    return this.levelController.level;
                  },
                  set: function (e) {
                    c.logger.log("set loadLevel:" + e),
                      (this.levelController.manualLevel = e);
                  },
                },
                {
                  key: "nextLoadLevel",
                  get: function () {
                    return this.levelController.nextLoadLevel;
                  },
                  set: function (e) {
                    this.levelController.nextLoadLevel = e;
                  },
                },
                {
                  key: "firstLevel",
                  get: function () {
                    return Math.max(
                      this.levelController.firstLevel,
                      this.minAutoLevel
                    );
                  },
                  set: function (e) {
                    c.logger.log("set firstLevel:" + e),
                      (this.levelController.firstLevel = e);
                  },
                },
                {
                  key: "startLevel",
                  get: function () {
                    return this.levelController.startLevel;
                  },
                  set: function (e) {
                    c.logger.log("set startLevel:" + e),
                      e !== -1 && (e = Math.max(e, this.minAutoLevel)),
                      (this.levelController.startLevel = e);
                  },
                },
                {
                  key: "capLevelToPlayerSize",
                  set: function (e) {
                    var t = !!e;
                    t !== this.config.capLevelToPlayerSize &&
                      (t
                        ? this.capLevelController.startCapping()
                        : (this.capLevelController.stopCapping(),
                          (this.autoLevelCapping = -1),
                          this.streamController.nextLevelSwitch()),
                      (this.config.capLevelToPlayerSize = t));
                  },
                },
                {
                  key: "autoLevelCapping",
                  get: function () {
                    return this._autoLevelCapping;
                  },
                  set: function (e) {
                    c.logger.log("set autoLevelCapping:" + e),
                      (this._autoLevelCapping = e);
                  },
                },
                {
                  key: "bandwidthEstimate",
                  get: function () {
                    var e = this.abrController._bwEstimator;
                    return e ? e.getEstimate() : NaN;
                  },
                },
                {
                  key: "autoLevelEnabled",
                  get: function () {
                    return this.levelController.manualLevel === -1;
                  },
                },
                {
                  key: "manualLevel",
                  get: function () {
                    return this.levelController.manualLevel;
                  },
                },
                {
                  key: "minAutoLevel",
                  get: function () {
                    for (
                      var e = this.levels,
                        t = this.config.minAutoBitrate,
                        a = e ? e.length : 0,
                        s = 0;
                      s < a;
                      s++
                    ) {
                      var l = e[s].realBitrate
                        ? Math.max(e[s].realBitrate, e[s].bitrate)
                        : e[s].bitrate;
                      if (l > t) return s;
                    }
                    return 0;
                  },
                },
                {
                  key: "maxAutoLevel",
                  get: function () {
                    var e = this.levels,
                      t = this.autoLevelCapping,
                      a;
                    return (
                      t === -1 && e && e.length ? (a = e.length - 1) : (a = t),
                      a
                    );
                  },
                },
                {
                  key: "nextAutoLevel",
                  get: function () {
                    return Math.min(
                      Math.max(
                        this.abrController.nextAutoLevel,
                        this.minAutoLevel
                      ),
                      this.maxAutoLevel
                    );
                  },
                  set: function (e) {
                    this.abrController.nextAutoLevel = Math.max(
                      this.minAutoLevel,
                      e
                    );
                  },
                },
                {
                  key: "audioTracks",
                  get: function () {
                    var e = this.audioTrackController;
                    return e ? e.audioTracks : [];
                  },
                },
                {
                  key: "audioTrack",
                  get: function () {
                    var e = this.audioTrackController;
                    return e ? e.audioTrack : -1;
                  },
                  set: function (e) {
                    var t = this.audioTrackController;
                    t && (t.audioTrack = e);
                  },
                },
                {
                  key: "liveSyncPosition",
                  get: function () {
                    return this.streamController.liveSyncPosition;
                  },
                },
                {
                  key: "subtitleTracks",
                  get: function () {
                    var e = this.subtitleTrackController;
                    return e ? e.subtitleTracks : [];
                  },
                },
                {
                  key: "subtitleTrack",
                  get: function () {
                    var e = this.subtitleTrackController;
                    return e ? e.subtitleTrack : -1;
                  },
                  set: function (e) {
                    var t = this.subtitleTrackController;
                    t && (t.subtitleTrack = e);
                  },
                },
                {
                  key: "subtitleDisplay",
                  get: function () {
                    var e = this.subtitleTrackController;
                    return e ? e.subtitleDisplay : !1;
                  },
                  set: function (e) {
                    var t = this.subtitleTrackController;
                    t && (t.subtitleDisplay = e);
                  },
                },
              ]),
              n
            );
          })(C);
          Yr.defaultConfig = void 0;
        },
        "./src/polyfills/number.js": function (Te, te, K) {
          K.r(te),
            K.d(te, "isFiniteNumber", function () {
              return Q;
            }),
            K.d(te, "MAX_SAFE_INTEGER", function () {
              return W;
            });
          var Q =
              Number.isFinite ||
              function (D) {
                return typeof D == "number" && isFinite(D);
              },
            W = Number.MAX_SAFE_INTEGER || 9007199254740991;
        },
        "./src/utils/get-self-scope.js": function (Te, te, K) {
          K.r(te),
            K.d(te, "getSelfScope", function () {
              return Q;
            });
          function Q() {
            return typeof window > "u" ? self : window;
          }
        },
        "./src/utils/logger.js": function (Te, te, K) {
          K.r(te),
            K.d(te, "enableLogs", function () {
              return S;
            }),
            K.d(te, "logger", function () {
              return I;
            });
          var Q = K("./src/utils/get-self-scope.js");
          function W() {}
          var D = { trace: W, debug: W, log: W, warn: W, info: W, error: W },
            ee = D;
          function h(_, F) {
            return (F = "[" + _ + "] > " + F), F;
          }
          var c = Object(Q.getSelfScope)();
          function Z(_) {
            var F = c.console[_];
            return F
              ? function () {
                  for (
                    var k = arguments.length, w = new Array(k), z = 0;
                    z < k;
                    z++
                  )
                    w[z] = arguments[z];
                  w[0] && (w[0] = h(_, w[0])), F.apply(c.console, w);
                }
              : W;
          }
          function T(_) {
            for (
              var F = arguments.length, k = new Array(F > 1 ? F - 1 : 0), w = 1;
              w < F;
              w++
            )
              k[w - 1] = arguments[w];
            k.forEach(function (z) {
              ee[z] = _[z] ? _[z].bind(_) : Z(z);
            });
          }
          var S = function (F) {
              if ((c.console && F === !0) || typeof F == "object") {
                T(F, "debug", "log", "info", "warn", "error");
                try {
                  ee.log();
                } catch {
                  ee = D;
                }
              } else ee = D;
            },
            I = ee;
        },
      }).default;
    });
})(Zr);
var Ka = Zr.exports;
const bt = ka(Ka);
var Qt = function () {
    return (
      (Qt =
        Object.assign ||
        function (Ie) {
          for (var tt, Te = 1, te = arguments.length; Te < te; Te++) {
            tt = arguments[Te];
            for (var K in tt)
              Object.prototype.hasOwnProperty.call(tt, K) && (Ie[K] = tt[K]);
          }
          return Ie;
        }),
      Qt.apply(this, arguments)
    );
  },
  ja = function (Ie, tt) {
    var Te = {};
    for (var te in Ie)
      Object.prototype.hasOwnProperty.call(Ie, te) &&
        tt.indexOf(te) < 0 &&
        (Te[te] = Ie[te]);
    if (Ie != null && typeof Object.getOwnPropertySymbols == "function")
      for (var K = 0, te = Object.getOwnPropertySymbols(Ie); K < te.length; K++)
        tt.indexOf(te[K]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(Ie, te[K]) &&
          (Te[te[K]] = Ie[te[K]]);
    return Te;
  };
function Ha(Ie) {
  var tt = Ie.hlsConfig,
    Te = Ie.playerRef,
    te = Te === void 0 ? Er.createRef() : Te,
    K = Ie.src,
    Q = Ie.autoPlay,
    W = ja(Ie, ["hlsConfig", "playerRef", "src", "autoPlay"]);
  return (
    Zt.useEffect(
      function () {
        var D;
        function ee() {
          D != null && D.destroy();
          var h = new bt(Qt({ enableWorker: !1 }, tt));
          te.current != null && h.attachMedia(te.current),
            h.on(bt.Events.MEDIA_ATTACHED, function () {
              h.loadSource(K),
                h.on(bt.Events.MANIFEST_PARSED, function () {
                  var c;
                  Q &&
                    ((c = te == null ? void 0 : te.current) === null ||
                      c === void 0 ||
                      c.play().catch(function () {
                        return console.log(
                          "Unable to autoplay prior to user interaction with the dom."
                        );
                      }));
                });
            }),
            h.on(bt.Events.ERROR, function (c, Z) {
              if (Z.fatal)
                switch (Z.type) {
                  case bt.ErrorTypes.NETWORK_ERROR:
                    h.startLoad();
                    break;
                  case bt.ErrorTypes.MEDIA_ERROR:
                    h.recoverMediaError();
                    break;
                  default:
                    ee();
                    break;
                }
            }),
            (D = h);
        }
        return (
          bt.isSupported() && ee(),
          function () {
            D != null && D.destroy();
          }
        );
      },
      [Q, tt, te, K]
    ),
    bt.isSupported()
      ? Er.createElement("video", Qt({ ref: te }, W))
      : Er.createElement("video", Qt({ ref: te, src: K, autoPlay: Q }, W))
  );
}
function Wa(Ie) {
  return qr({
    tag: "svg",
    attr: { viewBox: "0 0 24 24" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M12 3.75v16.5a.75.75 0 0 1-1.255.555L5.46 16H2.75A1.75 1.75 0 0 1 1 14.25v-4.5C1 8.784 1.784 8 2.75 8h2.71l5.285-4.805A.75.75 0 0 1 12 3.75ZM6.255 9.305a.748.748 0 0 1-.505.195h-3a.25.25 0 0 0-.25.25v4.5c0 .138.112.25.25.25h3c.187 0 .367.069.505.195l4.245 3.86V5.445ZM16.28 8.22a.75.75 0 1 0-1.06 1.06L17.94 12l-2.72 2.72a.75.75 0 1 0 1.06 1.06L19 13.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L20.06 12l2.72-2.72a.75.75 0 0 0-1.06-1.06L19 10.94l-2.72-2.72Z",
        },
      },
    ],
  })(Ie);
}
function Va(Ie) {
  return qr({
    tag: "svg",
    attr: { viewBox: "0 0 24 24" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M11.553 3.064A.75.75 0 0 1 12 3.75v16.5a.75.75 0 0 1-1.255.555L5.46 16H2.75A1.75 1.75 0 0 1 1 14.25v-4.5C1 8.784 1.784 8 2.75 8h2.71l5.285-4.805a.752.752 0 0 1 .808-.13ZM10.5 5.445l-4.245 3.86a.748.748 0 0 1-.505.195h-3a.25.25 0 0 0-.25.25v4.5c0 .138.112.25.25.25h3c.187 0 .367.069.505.195l4.245 3.86Zm8.218-1.223a.75.75 0 0 1 1.06 0c4.296 4.296 4.296 11.26 0 15.556a.75.75 0 0 1-1.06-1.06 9.5 9.5 0 0 0 0-13.436.75.75 0 0 1 0-1.06Z",
        },
      },
      {
        tag: "path",
        attr: {
          d: "M16.243 7.757a.75.75 0 1 0-1.061 1.061 4.5 4.5 0 0 1 0 6.364.75.75 0 0 0 1.06 1.06 6 6 0 0 0 0-8.485Z",
        },
      },
    ],
  })(Ie);
}
const Ya = () => {
    var B;
    const { authData: Ie, iframeProviderData: tt } = Da(),
      { fmTvFrame: Te, setFmTvFrame: te } = Ia(),
      K = ({ showBtn: Y = !1, showTv: J = !1 }) => {
        te({ isTvShow: J, showTvCloseBtn: Y });
      },
      Q = Ma(),
      [W, D] = Zt.useState(!1),
      [ee, h] = Zt.useState({ isMuted: !0 }),
      { search: c, pathname: Z } = Na(),
      T = wa.parse(c),
      { msTime: S, et: I, ei: _, mi: F } = T,
      { liveTvData: k } = Fa(
        { eid: _ },
        { liveTvData: { enabled: Ie.isLoggedIn } }
      ),
      w = k.data;
    Zt.useEffect(() => {
      let Y = !1;
      return (
        w && w != null && w.tvUrl && (Y = !0),
        K({ showBtn: Y, showTv: Y }),
        () => {
          Oa(zr.STORE_LIVE_TV_DATA, {}), K({});
        }
      );
    }, [w]);
    const z = () => {
        Ie.isLoggedIn ? D(!W) : Q(Ga.LOGIN);
      },
      N =
        ((B = tt == null ? void 0 : tt.options) == null
          ? void 0
          : B.siteLogo) || null;
    return xe.jsxs(xe.Fragment, {
      children: [
        Te.isTvShow &&
          w &&
          (w == null ? void 0 : w.tvUrl) &&
          ut() >= ut(S) &&
          xe.jsx("div", {
            id: "streamingBox",
            className: "tv-fix",
            style: Ie.isLoggedIn ? { top: "21.6vw" } : { top: "14.6vw" },
            children: xe.jsx("div", {
              className: "tv-wrap",
              children: xe.jsx("div", {
                id: "streamContainer",
                className: "tv-box",
                children: xe.jsxs(qt.Box, {
                  position: "relative",
                  children: [
                    N &&
                      xe.jsx(qt.Box, {
                        position: "absolute",
                        top: 3,
                        h: "auto",
                        right: 3,
                        p: 2,
                        rounded: "md",
                        backdropFilter: "blur(15px)",
                        border: "1px solid",
                        borderColor: "white.33",
                        children: xe.jsx(qt.Image, {
                          boxSize: "4rem",
                          h: "auto",
                          objectFit: "contain",
                          src: N,
                          filter: "drop-shadow(2px 1px 2px black)",
                        }),
                      }),
                    xe.jsx(Ha, {
                      src: w == null ? void 0 : w.tvUrl,
                      autoPlay: !0,
                      controls: !1,
                      width: "100%",
                      height: "auto",
                      muted: ee.isMuted,
                      poster: Ua,
                      crossOrigin: !1,
                      playsInline: !0,
                      hlsConfig: { fullScreenEnabled: !1 },
                    }),
                    xe.jsx(qt.Box, {
                      p: 1,
                      color: "white.100",
                      onClick: () => h({ ...ee, isMuted: !ee.isMuted }),
                      position: "absolute",
                      bottom: 3,
                      right: 3,
                      h: "auto",
                      cursor: "pointer",
                      rounded: "md",
                      backdropFilter: "blur(15px)",
                      border: "2px solid",
                      borderColor: "white.33",
                      children: ee.isMuted
                        ? xe.jsx(Wa, {
                            size: "1.5rem",
                            style: { margin: "auto" },
                          })
                        : xe.jsx(Va, {
                            size: "1.5rem",
                            style: { margin: "auto" },
                          }),
                    }),
                  ],
                }),
              }),
            }),
          }),
        I == 4 &&
          xe.jsxs("h4", {
            id: "gameInfo",
            className: "game-info",
            children: [
              "Cricket",
              xe.jsxs("ul", {
                id: "infoIcon",
                className: "info-icon",
                children: [
                  ut() >= ut(S) &&
                    xe.jsxs("li", {
                      id: "inPlayIcon",
                      style: {},
                      children: [
                        xe.jsx("img", { className: "info-inplay", src: yr }),
                        "In-Play",
                      ],
                    }),
                  ut() <= ut(S) &&
                    xe.jsx("li", {
                      children: xe.jsx("span", {
                        id: "lowLiquidityTag",
                        className: "game-low_liq",
                        children: "Low",
                      }),
                    }),
                ],
              }),
            ],
          }),
        I == 1 &&
          xe.jsxs("h4", {
            id: "gameInfo",
            className: "game-info",
            children: [
              "Soccer",
              xe.jsxs("ul", {
                id: "infoIcon",
                className: "info-icon",
                children: [
                  ut() >= ut(S) &&
                    xe.jsxs("li", {
                      id: "inPlayIcon",
                      style: {},
                      children: [
                        xe.jsx("img", { className: "info-inplay", src: yr }),
                        "In-Play",
                      ],
                    }),
                  ut() <= ut(S) &&
                    xe.jsx("li", {
                      children: xe.jsx("span", {
                        id: "lowLiquidityTag",
                        className: "game-low_liq",
                        children: "Low",
                      }),
                    }),
                ],
              }),
            ],
          }),
        I == 2 &&
          xe.jsxs("h4", {
            id: "gameInfo",
            className: "game-info",
            children: [
              "Tennis",
              xe.jsxs("ul", {
                id: "infoIcon",
                className: "info-icon",
                children: [
                  ut() >= ut(S) &&
                    xe.jsxs("li", {
                      id: "inPlayIcon",
                      style: {},
                      children: [
                        xe.jsx("img", { className: "info-inplay", src: yr }),
                        "In-Play",
                      ],
                    }),
                  ut() <= ut(S) &&
                    xe.jsx("li", {
                      children: xe.jsx("span", {
                        id: "lowLiquidityTag",
                        className: "game-low_liq",
                        children: "Low",
                      }),
                    }),
                ],
              }),
            ],
          }),
        I != Ba.KABADDI &&
          w &&
          w.scoreUrl &&
          xe.jsxs("div", {
            id: "matchTrackerWrap",
            className: "match-tracker-wrap",
            children: [
              xe.jsx(qt.Box, {
                as: "iframe",
                h: "177px",
                w: "100%",
                border: 0,
                id: "scoreFrame",
                autoPlay: "",
                preload: "",
                playsInline: "",
                title: "mob-live-stream",
                allowFullScreen: !1,
                src: w.scoreUrl,
              }),
              xe.jsxs("ul", {
                className: "fm-match-button",
                children: [
                  xe.jsx("li", {
                    children: xe.jsx("a", {
                      id: "liveMultiMarketPin",
                      onClick: z,
                      style: { cursor: "pointer" },
                      name: "gameHeadPin",
                      className: `favourite-pin ${W ? "select" : ""}`,
                      title: "Add to Multi Markets",
                      children: "Pin",
                    }),
                  }),
                  xe.jsx("li", {
                    children: xe.jsx("a", {
                      style: { cursor: "pointer" },
                      onClick: () => {
                        Ca(zr.STORE_LIVE_TV_DATA);
                      },
                      className: "fm-refresh-button",
                      children: "Refresh",
                    }),
                  }),
                ],
              }),
            ],
          }),
      ],
    });
  },
  nn = Zt.memo(Ya);
export { nn as default };

!(function (t) {
  var r = {};
  function e(n) {
    if (r[n]) return r[n].exports;
    var i = (r[n] = {
      i: n,
      l: !1,
      exports: {},
    });
    return t[n].call(i.exports, i, i.exports, e), (i.l = !0), i.exports;
  }
  (e.m = t),
    (e.c = r),
    (e.d = function (t, r, n) {
      e.o(t, r) ||
        Object.defineProperty(t, r, {
          enumerable: !0,
          get: n,
        });
    }),
    (e.r = function (t) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, {
          value: "Module",
        }),
        Object.defineProperty(t, "__esModule", {
          value: !0,
        });
    }),
    (e.t = function (t, r) {
      if ((1 & r && (t = e(t)), 8 & r)) return t;
      if (4 & r && "object" == typeof t && t && t.__esModule) return t;
      var n = Object.create(null);
      if (
        (e.r(n),
        Object.defineProperty(n, "default", {
          enumerable: !0,
          value: t,
        }),
        2 & r && "string" != typeof t)
      )
        for (var i in t)
          e.d(
            n,
            i,
            function (r) {
              return t[r];
            }.bind(null, i)
          );
      return n;
    }),
    (e.n = function (t) {
      var r =
        t && t.__esModule
          ? function () {
              return t.default;
            }
          : function () {
              return t;
            };
      return e.d(r, "a", r), r;
    }),
    (e.o = function (t, r) {
      return Object.prototype.hasOwnProperty.call(t, r);
    }),
    (e.p = ""),
    e((e.s = 1));
})([
  function (t, r, e) {
    "use strict";
    (function (t) {
      /*!
       * The buffer module from node.js, for the browser.
       *
       * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
       * @license  MIT
       */
      var n = e(4),
        i = e(3),
        o = e(2);
      function f() {
        return s.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
      }
      function u(t, r) {
        if (f() < r) throw new RangeError("Invalid typed array length");
        return (
          s.TYPED_ARRAY_SUPPORT
            ? ((t = new Uint8Array(r)).__proto__ = s.prototype)
            : (null === t && (t = new s(r)), (t.length = r)),
          t
        );
      }
      function s(t, r, e) {
        if (!(s.TYPED_ARRAY_SUPPORT || this instanceof s))
          return new s(t, r, e);
        if ("number" == typeof t) {
          if ("string" == typeof r)
            throw new Error(
              "If encoding is specified then the first argument must be a string"
            );
          return c(this, t);
        }
        return a(this, t, r, e);
      }
      function a(t, r, e, n) {
        if ("number" == typeof r)
          throw new TypeError('"value" argument must not be a number');
        return "undefined" != typeof ArrayBuffer && r instanceof ArrayBuffer
          ? (function (t, r, e, n) {
              if ((r.byteLength, e < 0 || r.byteLength < e))
                throw new RangeError("'offset' is out of bounds");
              if (r.byteLength < e + (n || 0))
                throw new RangeError("'length' is out of bounds");
              r =
                void 0 === e && void 0 === n
                  ? new Uint8Array(r)
                  : void 0 === n
                  ? new Uint8Array(r, e)
                  : new Uint8Array(r, e, n);
              s.TYPED_ARRAY_SUPPORT
                ? ((t = r).__proto__ = s.prototype)
                : (t = l(t, r));
              return t;
            })(t, r, e, n)
          : "string" == typeof r
          ? (function (t, r, e) {
              ("string" == typeof e && "" !== e) || (e = "utf8");
              if (!s.isEncoding(e))
                throw new TypeError(
                  '"encoding" must be a valid string encoding'
                );
              var n = 0 | g(r, e),
                i = (t = u(t, n)).write(r, e);
              i !== n && (t = t.slice(0, i));
              return t;
            })(t, r, e)
          : (function (t, r) {
              if (s.isBuffer(r)) {
                var e = 0 | p(r.length);
                return 0 === (t = u(t, e)).length ? t : (r.copy(t, 0, 0, e), t);
              }
              if (r) {
                if (
                  ("undefined" != typeof ArrayBuffer &&
                    r.buffer instanceof ArrayBuffer) ||
                  "length" in r
                )
                  return "number" != typeof r.length ||
                    (function (t) {
                      return t != t;
                    })(r.length)
                    ? u(t, 0)
                    : l(t, r);
                if ("Buffer" === r.type && o(r.data)) return l(t, r.data);
              }
              throw new TypeError(
                "First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object."
              );
            })(t, r);
      }
      function h(t) {
        if ("number" != typeof t)
          throw new TypeError('"size" argument must be a number');
        if (t < 0) throw new RangeError('"size" argument must not be negative');
      }
      function c(t, r) {
        if ((h(r), (t = u(t, r < 0 ? 0 : 0 | p(r))), !s.TYPED_ARRAY_SUPPORT))
          for (var e = 0; e < r; ++e) t[e] = 0;
        return t;
      }
      function l(t, r) {
        var e = r.length < 0 ? 0 : 0 | p(r.length);
        t = u(t, e);
        for (var n = 0; n < e; n += 1) t[n] = 255 & r[n];
        return t;
      }
      function p(t) {
        if (t >= f())
          throw new RangeError(
            "Attempt to allocate Buffer larger than maximum size: 0x" +
              f().toString(16) +
              " bytes"
          );
        return 0 | t;
      }
      function g(t, r) {
        if (s.isBuffer(t)) return t.length;
        if (
          "undefined" != typeof ArrayBuffer &&
          "function" == typeof ArrayBuffer.isView &&
          (ArrayBuffer.isView(t) || t instanceof ArrayBuffer)
        )
          return t.byteLength;
        "string" != typeof t && (t = "" + t);
        var e = t.length;
        if (0 === e) return 0;
        for (var n = !1; ; )
          switch (r) {
            case "ascii":
            case "latin1":
            case "binary":
              return e;
            case "utf8":
            case "utf-8":
            case void 0:
              return N(t).length;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return 2 * e;
            case "hex":
              return e >>> 1;
            case "base64":
              return z(t).length;
            default:
              if (n) return N(t).length;
              (r = ("" + r).toLowerCase()), (n = !0);
          }
      }
      function y(t, r, e) {
        var n = t[r];
        (t[r] = t[e]), (t[e] = n);
      }
      function d(t, r, e, n, i) {
        if (0 === t.length) return -1;
        if (
          ("string" == typeof e
            ? ((n = e), (e = 0))
            : e > 2147483647
            ? (e = 2147483647)
            : e < -2147483648 && (e = -2147483648),
          (e = +e),
          isNaN(e) && (e = i ? 0 : t.length - 1),
          e < 0 && (e = t.length + e),
          e >= t.length)
        ) {
          if (i) return -1;
          e = t.length - 1;
        } else if (e < 0) {
          if (!i) return -1;
          e = 0;
        }
        if (("string" == typeof r && (r = s.from(r, n)), s.isBuffer(r)))
          return 0 === r.length ? -1 : w(t, r, e, n, i);
        if ("number" == typeof r)
          return (
            (r &= 255),
            s.TYPED_ARRAY_SUPPORT &&
            "function" == typeof Uint8Array.prototype.indexOf
              ? i
                ? Uint8Array.prototype.indexOf.call(t, r, e)
                : Uint8Array.prototype.lastIndexOf.call(t, r, e)
              : w(t, [r], e, n, i)
          );
        throw new TypeError("val must be string, number or Buffer");
      }
      function w(t, r, e, n, i) {
        var o,
          f = 1,
          u = t.length,
          s = r.length;
        if (
          void 0 !== n &&
          ("ucs2" === (n = String(n).toLowerCase()) ||
            "ucs-2" === n ||
            "utf16le" === n ||
            "utf-16le" === n)
        ) {
          if (t.length < 2 || r.length < 2) return -1;
          (f = 2), (u /= 2), (s /= 2), (e /= 2);
        }
        function a(t, r) {
          return 1 === f ? t[r] : t.readUInt16BE(r * f);
        }
        if (i) {
          var h = -1;
          for (o = e; o < u; o++)
            if (a(t, o) === a(r, -1 === h ? 0 : o - h)) {
              if ((-1 === h && (h = o), o - h + 1 === s)) return h * f;
            } else -1 !== h && (o -= o - h), (h = -1);
        } else
          for (e + s > u && (e = u - s), o = e; o >= 0; o--) {
            for (var c = !0, l = 0; l < s; l++)
              if (a(t, o + l) !== a(r, l)) {
                c = !1;
                break;
              }
            if (c) return o;
          }
        return -1;
      }
      function v(t, r, e, n) {
        e = Number(e) || 0;
        var i = t.length - e;
        n ? (n = Number(n)) > i && (n = i) : (n = i);
        var o = r.length;
        if (o % 2 != 0) throw new TypeError("Invalid hex string");
        n > o / 2 && (n = o / 2);
        for (var f = 0; f < n; ++f) {
          var u = parseInt(r.substr(2 * f, 2), 16);
          if (isNaN(u)) return f;
          t[e + f] = u;
        }
        return f;
      }
      function A(t, r, e, n) {
        return F(N(r, t.length - e), t, e, n);
      }
      function b(t, r, e, n) {
        return F(
          (function (t) {
            for (var r = [], e = 0; e < t.length; ++e)
              r.push(255 & t.charCodeAt(e));
            return r;
          })(r),
          t,
          e,
          n
        );
      }
      function E(t, r, e, n) {
        return b(t, r, e, n);
      }
      function m(t, r, e, n) {
        return F(z(r), t, e, n);
      }
      function B(t, r, e, n) {
        return F(
          (function (t, r) {
            for (
              var e, n, i, o = [], f = 0;
              f < t.length && !((r -= 2) < 0);
              ++f
            )
              (e = t.charCodeAt(f)),
                (n = e >> 8),
                (i = e % 256),
                o.push(i),
                o.push(n);
            return o;
          })(r, t.length - e),
          t,
          e,
          n
        );
      }
      function _(t, r, e) {
        return 0 === r && e === t.length
          ? n.fromByteArray(t)
          : n.fromByteArray(t.slice(r, e));
      }
      function R(t, r, e) {
        e = Math.min(t.length, e);
        for (var n = [], i = r; i < e; ) {
          var o,
            f,
            u,
            s,
            a = t[i],
            h = null,
            c = a > 239 ? 4 : a > 223 ? 3 : a > 191 ? 2 : 1;
          if (i + c <= e)
            switch (c) {
              case 1:
                a < 128 && (h = a);
                break;
              case 2:
                128 == (192 & (o = t[i + 1])) &&
                  (s = ((31 & a) << 6) | (63 & o)) > 127 &&
                  (h = s);
                break;
              case 3:
                (o = t[i + 1]),
                  (f = t[i + 2]),
                  128 == (192 & o) &&
                    128 == (192 & f) &&
                    (s = ((15 & a) << 12) | ((63 & o) << 6) | (63 & f)) >
                      2047 &&
                    (s < 55296 || s > 57343) &&
                    (h = s);
                break;
              case 4:
                (o = t[i + 1]),
                  (f = t[i + 2]),
                  (u = t[i + 3]),
                  128 == (192 & o) &&
                    128 == (192 & f) &&
                    128 == (192 & u) &&
                    (s =
                      ((15 & a) << 18) |
                      ((63 & o) << 12) |
                      ((63 & f) << 6) |
                      (63 & u)) > 65535 &&
                    s < 1114112 &&
                    (h = s);
            }
          null === h
            ? ((h = 65533), (c = 1))
            : h > 65535 &&
              ((h -= 65536),
              n.push(((h >>> 10) & 1023) | 55296),
              (h = 56320 | (1023 & h))),
            n.push(h),
            (i += c);
        }
        return (function (t) {
          var r = t.length;
          if (r <= P) return String.fromCharCode.apply(String, t);
          var e = "",
            n = 0;
          for (; n < r; )
            e += String.fromCharCode.apply(String, t.slice(n, (n += P)));
          return e;
        })(n);
      }
      (r.Buffer = s),
        (r.SlowBuffer = function (t) {
          +t != t && (t = 0);
          return s.alloc(+t);
        }),
        (r.INSPECT_MAX_BYTES = 50),
        (s.TYPED_ARRAY_SUPPORT =
          void 0 !== t.TYPED_ARRAY_SUPPORT
            ? t.TYPED_ARRAY_SUPPORT
            : (function () {
                try {
                  var t = new Uint8Array(1);
                  return (
                    (t.__proto__ = {
                      __proto__: Uint8Array.prototype,
                      foo: function () {
                        return 42;
                      },
                    }),
                    42 === t.foo() &&
                      "function" == typeof t.subarray &&
                      0 === t.subarray(1, 1).byteLength
                  );
                } catch (t) {
                  return !1;
                }
              })()),
        (r.kMaxLength = f()),
        (s.poolSize = 8192),
        (s._augment = function (t) {
          return (t.__proto__ = s.prototype), t;
        }),
        (s.from = function (t, r, e) {
          return a(null, t, r, e);
        }),
        s.TYPED_ARRAY_SUPPORT &&
          ((s.prototype.__proto__ = Uint8Array.prototype),
          (s.__proto__ = Uint8Array),
          "undefined" != typeof Symbol &&
            Symbol.species &&
            s[Symbol.species] === s &&
            Object.defineProperty(s, Symbol.species, {
              value: null,
              configurable: !0,
            })),
        (s.alloc = function (t, r, e) {
          return (function (t, r, e, n) {
            return (
              h(r),
              r <= 0
                ? u(t, r)
                : void 0 !== e
                ? "string" == typeof n
                  ? u(t, r).fill(e, n)
                  : u(t, r).fill(e)
                : u(t, r)
            );
          })(null, t, r, e);
        }),
        (s.allocUnsafe = function (t) {
          return c(null, t);
        }),
        (s.allocUnsafeSlow = function (t) {
          return c(null, t);
        }),
        (s.isBuffer = function (t) {
          return !(null == t || !t._isBuffer);
        }),
        (s.compare = function (t, r) {
          if (!s.isBuffer(t) || !s.isBuffer(r))
            throw new TypeError("Arguments must be Buffers");
          if (t === r) return 0;
          for (
            var e = t.length, n = r.length, i = 0, o = Math.min(e, n);
            i < o;
            ++i
          )
            if (t[i] !== r[i]) {
              (e = t[i]), (n = r[i]);
              break;
            }
          return e < n ? -1 : n < e ? 1 : 0;
        }),
        (s.isEncoding = function (t) {
          switch (String(t).toLowerCase()) {
            case "hex":
            case "utf8":
            case "utf-8":
            case "ascii":
            case "latin1":
            case "binary":
            case "base64":
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return !0;
            default:
              return !1;
          }
        }),
        (s.concat = function (t, r) {
          if (!o(t))
            throw new TypeError('"list" argument must be an Array of Buffers');
          if (0 === t.length) return s.alloc(0);
          var e;
          if (void 0 === r)
            for (r = 0, e = 0; e < t.length; ++e) r += t[e].length;
          var n = s.allocUnsafe(r),
            i = 0;
          for (e = 0; e < t.length; ++e) {
            var f = t[e];
            if (!s.isBuffer(f))
              throw new TypeError(
                '"list" argument must be an Array of Buffers'
              );
            f.copy(n, i), (i += f.length);
          }
          return n;
        }),
        (s.byteLength = g),
        (s.prototype._isBuffer = !0),
        (s.prototype.swap16 = function () {
          var t = this.length;
          if (t % 2 != 0)
            throw new RangeError("Buffer size must be a multiple of 16-bits");
          for (var r = 0; r < t; r += 2) y(this, r, r + 1);
          return this;
        }),
        (s.prototype.swap32 = function () {
          var t = this.length;
          if (t % 4 != 0)
            throw new RangeError("Buffer size must be a multiple of 32-bits");
          for (var r = 0; r < t; r += 4)
            y(this, r, r + 3), y(this, r + 1, r + 2);
          return this;
        }),
        (s.prototype.swap64 = function () {
          var t = this.length;
          if (t % 8 != 0)
            throw new RangeError("Buffer size must be a multiple of 64-bits");
          for (var r = 0; r < t; r += 8)
            y(this, r, r + 7),
              y(this, r + 1, r + 6),
              y(this, r + 2, r + 5),
              y(this, r + 3, r + 4);
          return this;
        }),
        (s.prototype.toString = function () {
          var t = 0 | this.length;
          return 0 === t
            ? ""
            : 0 === arguments.length
            ? R(this, 0, t)
            : function (t, r, e) {
                var n = !1;
                if (((void 0 === r || r < 0) && (r = 0), r > this.length))
                  return "";
                if (
                  ((void 0 === e || e > this.length) && (e = this.length),
                  e <= 0)
                )
                  return "";
                if ((e >>>= 0) <= (r >>>= 0)) return "";
                for (t || (t = "utf8"); ; )
                  switch (t) {
                    case "hex":
                      return U(this, r, e);
                    case "utf8":
                    case "utf-8":
                      return R(this, r, e);
                    case "ascii":
                      return T(this, r, e);
                    case "latin1":
                    case "binary":
                      return I(this, r, e);
                    case "base64":
                      return _(this, r, e);
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                      return S(this, r, e);
                    default:
                      if (n) throw new TypeError("Unknown encoding: " + t);
                      (t = (t + "").toLowerCase()), (n = !0);
                  }
              }.apply(this, arguments);
        }),
        (s.prototype.equals = function (t) {
          if (!s.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
          return this === t || 0 === s.compare(this, t);
        }),
        (s.prototype.inspect = function () {
          var t = "",
            e = r.INSPECT_MAX_BYTES;
          return (
            this.length > 0 &&
              ((t = this.toString("hex", 0, e).match(/.{2}/g).join(" ")),
              this.length > e && (t += " ... ")),
            "<Buffer " + t + ">"
          );
        }),
        (s.prototype.compare = function (t, r, e, n, i) {
          if (!s.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
          if (
            (void 0 === r && (r = 0),
            void 0 === e && (e = t ? t.length : 0),
            void 0 === n && (n = 0),
            void 0 === i && (i = this.length),
            r < 0 || e > t.length || n < 0 || i > this.length)
          )
            throw new RangeError("out of range index");
          if (n >= i && r >= e) return 0;
          if (n >= i) return -1;
          if (r >= e) return 1;
          if (((r >>>= 0), (e >>>= 0), (n >>>= 0), (i >>>= 0), this === t))
            return 0;
          for (
            var o = i - n,
              f = e - r,
              u = Math.min(o, f),
              a = this.slice(n, i),
              h = t.slice(r, e),
              c = 0;
            c < u;
            ++c
          )
            if (a[c] !== h[c]) {
              (o = a[c]), (f = h[c]);
              break;
            }
          return o < f ? -1 : f < o ? 1 : 0;
        }),
        (s.prototype.includes = function (t, r, e) {
          return -1 !== this.indexOf(t, r, e);
        }),
        (s.prototype.indexOf = function (t, r, e) {
          return d(this, t, r, e, !0);
        }),
        (s.prototype.lastIndexOf = function (t, r, e) {
          return d(this, t, r, e, !1);
        }),
        (s.prototype.write = function (t, r, e, n) {
          if (void 0 === r) (n = "utf8"), (e = this.length), (r = 0);
          else if (void 0 === e && "string" == typeof r)
            (n = r), (e = this.length), (r = 0);
          else {
            if (!isFinite(r))
              throw new Error(
                "Buffer.write(string, encoding, offset[, length]) is no longer supported"
              );
            (r |= 0),
              isFinite(e)
                ? ((e |= 0), void 0 === n && (n = "utf8"))
                : ((n = e), (e = void 0));
          }
          var i = this.length - r;
          if (
            ((void 0 === e || e > i) && (e = i),
            (t.length > 0 && (e < 0 || r < 0)) || r > this.length)
          )
            throw new RangeError("Attempt to write outside buffer bounds");
          n || (n = "utf8");
          for (var o = !1; ; )
            switch (n) {
              case "hex":
                return v(this, t, r, e);
              case "utf8":
              case "utf-8":
                return A(this, t, r, e);
              case "ascii":
                return b(this, t, r, e);
              case "latin1":
              case "binary":
                return E(this, t, r, e);
              case "base64":
                return m(this, t, r, e);
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return B(this, t, r, e);
              default:
                if (o) throw new TypeError("Unknown encoding: " + n);
                (n = ("" + n).toLowerCase()), (o = !0);
            }
        }),
        (s.prototype.toJSON = function () {
          return {
            type: "Buffer",
            data: Array.prototype.slice.call(this._arr || this, 0),
          };
        });
      var P = 4096;
      function T(t, r, e) {
        var n = "";
        e = Math.min(t.length, e);
        for (var i = r; i < e; ++i) n += String.fromCharCode(127 & t[i]);
        return n;
      }
      function I(t, r, e) {
        var n = "";
        e = Math.min(t.length, e);
        for (var i = r; i < e; ++i) n += String.fromCharCode(t[i]);
        return n;
      }
      function U(t, r, e) {
        var n = t.length;
        (!r || r < 0) && (r = 0), (!e || e < 0 || e > n) && (e = n);
        for (var i = "", o = r; o < e; ++o) i += j(t[o]);
        return i;
      }
      function S(t, r, e) {
        for (var n = t.slice(r, e), i = "", o = 0; o < n.length; o += 2)
          i += String.fromCharCode(n[o] + 256 * n[o + 1]);
        return i;
      }
      function Y(t, r, e) {
        if (t % 1 != 0 || t < 0) throw new RangeError("offset is not uint");
        if (t + r > e)
          throw new RangeError("Trying to access beyond buffer length");
      }
      function O(t, r, e, n, i, o) {
        if (!s.isBuffer(t))
          throw new TypeError('"buffer" argument must be a Buffer instance');
        if (r > i || r < o)
          throw new RangeError('"value" argument is out of bounds');
        if (e + n > t.length) throw new RangeError("Index out of range");
      }
      function M(t, r, e, n) {
        r < 0 && (r = 65535 + r + 1);
        for (var i = 0, o = Math.min(t.length - e, 2); i < o; ++i)
          t[e + i] =
            (r & (255 << (8 * (n ? i : 1 - i)))) >>> (8 * (n ? i : 1 - i));
      }
      function C(t, r, e, n) {
        r < 0 && (r = 4294967295 + r + 1);
        for (var i = 0, o = Math.min(t.length - e, 4); i < o; ++i)
          t[e + i] = (r >>> (8 * (n ? i : 3 - i))) & 255;
      }
      function L(t, r, e, n, i, o) {
        if (e + n > t.length) throw new RangeError("Index out of range");
        if (e < 0) throw new RangeError("Index out of range");
      }
      function x(t, r, e, n, o) {
        return o || L(t, 0, e, 4), i.write(t, r, e, n, 23, 4), e + 4;
      }
      function D(t, r, e, n, o) {
        return o || L(t, 0, e, 8), i.write(t, r, e, n, 52, 8), e + 8;
      }
      (s.prototype.slice = function (t, r) {
        var e,
          n = this.length;
        if (
          ((t = ~~t),
          (r = void 0 === r ? n : ~~r),
          t < 0 ? (t += n) < 0 && (t = 0) : t > n && (t = n),
          r < 0 ? (r += n) < 0 && (r = 0) : r > n && (r = n),
          r < t && (r = t),
          s.TYPED_ARRAY_SUPPORT)
        )
          (e = this.subarray(t, r)).__proto__ = s.prototype;
        else {
          var i = r - t;
          e = new s(i, void 0);
          for (var o = 0; o < i; ++o) e[o] = this[o + t];
        }
        return e;
      }),
        (s.prototype.readUIntLE = function (t, r, e) {
          (t |= 0), (r |= 0), e || Y(t, r, this.length);
          for (var n = this[t], i = 1, o = 0; ++o < r && (i *= 256); )
            n += this[t + o] * i;
          return n;
        }),
        (s.prototype.readUIntBE = function (t, r, e) {
          (t |= 0), (r |= 0), e || Y(t, r, this.length);
          for (var n = this[t + --r], i = 1; r > 0 && (i *= 256); )
            n += this[t + --r] * i;
          return n;
        }),
        (s.prototype.readUInt8 = function (t, r) {
          return r || Y(t, 1, this.length), this[t];
        }),
        (s.prototype.readUInt16LE = function (t, r) {
          return r || Y(t, 2, this.length), this[t] | (this[t + 1] << 8);
        }),
        (s.prototype.readUInt16BE = function (t, r) {
          return r || Y(t, 2, this.length), (this[t] << 8) | this[t + 1];
        }),
        (s.prototype.readUInt32LE = function (t, r) {
          return (
            r || Y(t, 4, this.length),
            (this[t] | (this[t + 1] << 8) | (this[t + 2] << 16)) +
              16777216 * this[t + 3]
          );
        }),
        (s.prototype.readUInt32BE = function (t, r) {
          return (
            r || Y(t, 4, this.length),
            16777216 * this[t] +
              ((this[t + 1] << 16) | (this[t + 2] << 8) | this[t + 3])
          );
        }),
        (s.prototype.readIntLE = function (t, r, e) {
          (t |= 0), (r |= 0), e || Y(t, r, this.length);
          for (var n = this[t], i = 1, o = 0; ++o < r && (i *= 256); )
            n += this[t + o] * i;
          return n >= (i *= 128) && (n -= Math.pow(2, 8 * r)), n;
        }),
        (s.prototype.readIntBE = function (t, r, e) {
          (t |= 0), (r |= 0), e || Y(t, r, this.length);
          for (var n = r, i = 1, o = this[t + --n]; n > 0 && (i *= 256); )
            o += this[t + --n] * i;
          return o >= (i *= 128) && (o -= Math.pow(2, 8 * r)), o;
        }),
        (s.prototype.readInt8 = function (t, r) {
          return (
            r || Y(t, 1, this.length),
            128 & this[t] ? -1 * (255 - this[t] + 1) : this[t]
          );
        }),
        (s.prototype.readInt16LE = function (t, r) {
          r || Y(t, 2, this.length);
          var e = this[t] | (this[t + 1] << 8);
          return 32768 & e ? 4294901760 | e : e;
        }),
        (s.prototype.readInt16BE = function (t, r) {
          r || Y(t, 2, this.length);
          var e = this[t + 1] | (this[t] << 8);
          return 32768 & e ? 4294901760 | e : e;
        }),
        (s.prototype.readInt32LE = function (t, r) {
          return (
            r || Y(t, 4, this.length),
            this[t] |
              (this[t + 1] << 8) |
              (this[t + 2] << 16) |
              (this[t + 3] << 24)
          );
        }),
        (s.prototype.readInt32BE = function (t, r) {
          return (
            r || Y(t, 4, this.length),
            (this[t] << 24) |
              (this[t + 1] << 16) |
              (this[t + 2] << 8) |
              this[t + 3]
          );
        }),
        (s.prototype.readFloatLE = function (t, r) {
          return r || Y(t, 4, this.length), i.read(this, t, !0, 23, 4);
        }),
        (s.prototype.readFloatBE = function (t, r) {
          return r || Y(t, 4, this.length), i.read(this, t, !1, 23, 4);
        }),
        (s.prototype.readDoubleLE = function (t, r) {
          return r || Y(t, 8, this.length), i.read(this, t, !0, 52, 8);
        }),
        (s.prototype.readDoubleBE = function (t, r) {
          return r || Y(t, 8, this.length), i.read(this, t, !1, 52, 8);
        }),
        (s.prototype.writeUIntLE = function (t, r, e, n) {
          ((t = +t), (r |= 0), (e |= 0), n) ||
            O(this, t, r, e, Math.pow(2, 8 * e) - 1, 0);
          var i = 1,
            o = 0;
          for (this[r] = 255 & t; ++o < e && (i *= 256); )
            this[r + o] = (t / i) & 255;
          return r + e;
        }),
        (s.prototype.writeUIntBE = function (t, r, e, n) {
          ((t = +t), (r |= 0), (e |= 0), n) ||
            O(this, t, r, e, Math.pow(2, 8 * e) - 1, 0);
          var i = e - 1,
            o = 1;
          for (this[r + i] = 255 & t; --i >= 0 && (o *= 256); )
            this[r + i] = (t / o) & 255;
          return r + e;
        }),
        (s.prototype.writeUInt8 = function (t, r, e) {
          return (
            (t = +t),
            (r |= 0),
            e || O(this, t, r, 1, 255, 0),
            s.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)),
            (this[r] = 255 & t),
            r + 1
          );
        }),
        (s.prototype.writeUInt16LE = function (t, r, e) {
          return (
            (t = +t),
            (r |= 0),
            e || O(this, t, r, 2, 65535, 0),
            s.TYPED_ARRAY_SUPPORT
              ? ((this[r] = 255 & t), (this[r + 1] = t >>> 8))
              : M(this, t, r, !0),
            r + 2
          );
        }),
        (s.prototype.writeUInt16BE = function (t, r, e) {
          return (
            (t = +t),
            (r |= 0),
            e || O(this, t, r, 2, 65535, 0),
            s.TYPED_ARRAY_SUPPORT
              ? ((this[r] = t >>> 8), (this[r + 1] = 255 & t))
              : M(this, t, r, !1),
            r + 2
          );
        }),
        (s.prototype.writeUInt32LE = function (t, r, e) {
          return (
            (t = +t),
            (r |= 0),
            e || O(this, t, r, 4, 4294967295, 0),
            s.TYPED_ARRAY_SUPPORT
              ? ((this[r + 3] = t >>> 24),
                (this[r + 2] = t >>> 16),
                (this[r + 1] = t >>> 8),
                (this[r] = 255 & t))
              : C(this, t, r, !0),
            r + 4
          );
        }),
        (s.prototype.writeUInt32BE = function (t, r, e) {
          return (
            (t = +t),
            (r |= 0),
            e || O(this, t, r, 4, 4294967295, 0),
            s.TYPED_ARRAY_SUPPORT
              ? ((this[r] = t >>> 24),
                (this[r + 1] = t >>> 16),
                (this[r + 2] = t >>> 8),
                (this[r + 3] = 255 & t))
              : C(this, t, r, !1),
            r + 4
          );
        }),
        (s.prototype.writeIntLE = function (t, r, e, n) {
          if (((t = +t), (r |= 0), !n)) {
            var i = Math.pow(2, 8 * e - 1);
            O(this, t, r, e, i - 1, -i);
          }
          var o = 0,
            f = 1,
            u = 0;
          for (this[r] = 255 & t; ++o < e && (f *= 256); )
            t < 0 && 0 === u && 0 !== this[r + o - 1] && (u = 1),
              (this[r + o] = (((t / f) >> 0) - u) & 255);
          return r + e;
        }),
        (s.prototype.writeIntBE = function (t, r, e, n) {
          if (((t = +t), (r |= 0), !n)) {
            var i = Math.pow(2, 8 * e - 1);
            O(this, t, r, e, i - 1, -i);
          }
          var o = e - 1,
            f = 1,
            u = 0;
          for (this[r + o] = 255 & t; --o >= 0 && (f *= 256); )
            t < 0 && 0 === u && 0 !== this[r + o + 1] && (u = 1),
              (this[r + o] = (((t / f) >> 0) - u) & 255);
          return r + e;
        }),
        (s.prototype.writeInt8 = function (t, r, e) {
          return (
            (t = +t),
            (r |= 0),
            e || O(this, t, r, 1, 127, -128),
            s.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)),
            t < 0 && (t = 255 + t + 1),
            (this[r] = 255 & t),
            r + 1
          );
        }),
        (s.prototype.writeInt16LE = function (t, r, e) {
          return (
            (t = +t),
            (r |= 0),
            e || O(this, t, r, 2, 32767, -32768),
            s.TYPED_ARRAY_SUPPORT
              ? ((this[r] = 255 & t), (this[r + 1] = t >>> 8))
              : M(this, t, r, !0),
            r + 2
          );
        }),
        (s.prototype.writeInt16BE = function (t, r, e) {
          return (
            (t = +t),
            (r |= 0),
            e || O(this, t, r, 2, 32767, -32768),
            s.TYPED_ARRAY_SUPPORT
              ? ((this[r] = t >>> 8), (this[r + 1] = 255 & t))
              : M(this, t, r, !1),
            r + 2
          );
        }),
        (s.prototype.writeInt32LE = function (t, r, e) {
          return (
            (t = +t),
            (r |= 0),
            e || O(this, t, r, 4, 2147483647, -2147483648),
            s.TYPED_ARRAY_SUPPORT
              ? ((this[r] = 255 & t),
                (this[r + 1] = t >>> 8),
                (this[r + 2] = t >>> 16),
                (this[r + 3] = t >>> 24))
              : C(this, t, r, !0),
            r + 4
          );
        }),
        (s.prototype.writeInt32BE = function (t, r, e) {
          return (
            (t = +t),
            (r |= 0),
            e || O(this, t, r, 4, 2147483647, -2147483648),
            t < 0 && (t = 4294967295 + t + 1),
            s.TYPED_ARRAY_SUPPORT
              ? ((this[r] = t >>> 24),
                (this[r + 1] = t >>> 16),
                (this[r + 2] = t >>> 8),
                (this[r + 3] = 255 & t))
              : C(this, t, r, !1),
            r + 4
          );
        }),
        (s.prototype.writeFloatLE = function (t, r, e) {
          return x(this, t, r, !0, e);
        }),
        (s.prototype.writeFloatBE = function (t, r, e) {
          return x(this, t, r, !1, e);
        }),
        (s.prototype.writeDoubleLE = function (t, r, e) {
          return D(this, t, r, !0, e);
        }),
        (s.prototype.writeDoubleBE = function (t, r, e) {
          return D(this, t, r, !1, e);
        }),
        (s.prototype.copy = function (t, r, e, n) {
          if (
            (e || (e = 0),
            n || 0 === n || (n = this.length),
            r >= t.length && (r = t.length),
            r || (r = 0),
            n > 0 && n < e && (n = e),
            n === e)
          )
            return 0;
          if (0 === t.length || 0 === this.length) return 0;
          if (r < 0) throw new RangeError("targetStart out of bounds");
          if (e < 0 || e >= this.length)
            throw new RangeError("sourceStart out of bounds");
          if (n < 0) throw new RangeError("sourceEnd out of bounds");
          n > this.length && (n = this.length),
            t.length - r < n - e && (n = t.length - r + e);
          var i,
            o = n - e;
          if (this === t && e < r && r < n)
            for (i = o - 1; i >= 0; --i) t[i + r] = this[i + e];
          else if (o < 1e3 || !s.TYPED_ARRAY_SUPPORT)
            for (i = 0; i < o; ++i) t[i + r] = this[i + e];
          else Uint8Array.prototype.set.call(t, this.subarray(e, e + o), r);
          return o;
        }),
        (s.prototype.fill = function (t, r, e, n) {
          if ("string" == typeof t) {
            if (
              ("string" == typeof r
                ? ((n = r), (r = 0), (e = this.length))
                : "string" == typeof e && ((n = e), (e = this.length)),
              1 === t.length)
            ) {
              var i = t.charCodeAt(0);
              i < 256 && (t = i);
            }
            if (void 0 !== n && "string" != typeof n)
              throw new TypeError("encoding must be a string");
            if ("string" == typeof n && !s.isEncoding(n))
              throw new TypeError("Unknown encoding: " + n);
          } else "number" == typeof t && (t &= 255);
          if (r < 0 || this.length < r || this.length < e)
            throw new RangeError("Out of range index");
          if (e <= r) return this;
          var o;
          if (
            ((r >>>= 0),
            (e = void 0 === e ? this.length : e >>> 0),
            t || (t = 0),
            "number" == typeof t)
          )
            for (o = r; o < e; ++o) this[o] = t;
          else {
            var f = s.isBuffer(t) ? t : N(new s(t, n).toString()),
              u = f.length;
            for (o = 0; o < e - r; ++o) this[o + r] = f[o % u];
          }
          return this;
        });
      var k = /[^+\/0-9A-Za-z-_]/g;
      function j(t) {
        return t < 16 ? "0" + t.toString(16) : t.toString(16);
      }
      function N(t, r) {
        var e;
        r = r || 1 / 0;
        for (var n = t.length, i = null, o = [], f = 0; f < n; ++f) {
          if ((e = t.charCodeAt(f)) > 55295 && e < 57344) {
            if (!i) {
              if (e > 56319) {
                (r -= 3) > -1 && o.push(239, 191, 189);
                continue;
              }
              if (f + 1 === n) {
                (r -= 3) > -1 && o.push(239, 191, 189);
                continue;
              }
              i = e;
              continue;
            }
            if (e < 56320) {
              (r -= 3) > -1 && o.push(239, 191, 189), (i = e);
              continue;
            }
            e = 65536 + (((i - 55296) << 10) | (e - 56320));
          } else i && (r -= 3) > -1 && o.push(239, 191, 189);
          if (((i = null), e < 128)) {
            if ((r -= 1) < 0) break;
            o.push(e);
          } else if (e < 2048) {
            if ((r -= 2) < 0) break;
            o.push((e >> 6) | 192, (63 & e) | 128);
          } else if (e < 65536) {
            if ((r -= 3) < 0) break;
            o.push((e >> 12) | 224, ((e >> 6) & 63) | 128, (63 & e) | 128);
          } else {
            if (!(e < 1114112)) throw new Error("Invalid code point");
            if ((r -= 4) < 0) break;
            o.push(
              (e >> 18) | 240,
              ((e >> 12) & 63) | 128,
              ((e >> 6) & 63) | 128,
              (63 & e) | 128
            );
          }
        }
        return o;
      }
      function z(t) {
        return n.toByteArray(
          (function (t) {
            if (
              (t = (function (t) {
                return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "");
              })(t).replace(k, "")).length < 2
            )
              return "";
            for (; t.length % 4 != 0; ) t += "=";
            return t;
          })(t)
        );
      }
      function F(t, r, e, n) {
        for (var i = 0; i < n && !(i + e >= r.length || i >= t.length); ++i)
          r[i + e] = t[i];
        return i;
      }
    }.call(this, e(5)));
  },
  function (t, r, e) {
    "use strict";
    e.r(r);
    var n = e(0);
    var i =
        n.Buffer.from &&
        n.Buffer.alloc &&
        n.Buffer.allocUnsafe &&
        n.Buffer.allocUnsafeSlow
          ? n.Buffer.from
          : (t) => new n.Buffer(t),
      o = function (t, r) {
        const e = (t, e) => r(t, e) >>> 0;
        return (e.signed = r), (e.unsigned = e), (e.model = t), e;
      };
    let f = [
      0, 1996959894, 3993919788, 2567524794, 124634137, 1886057615, 3915621685,
      2657392035, 249268274, 2044508324, 3772115230, 2547177864, 162941995,
      2125561021, 3887607047, 2428444049, 498536548, 1789927666, 4089016648,
      2227061214, 450548861, 1843258603, 4107580753, 2211677639, 325883990,
      1684777152, 4251122042, 2321926636, 335633487, 1661365465, 4195302755,
      2366115317, 997073096, 1281953886, 3579855332, 2724688242, 1006888145,
      1258607687, 3524101629, 2768942443, 901097722, 1119000684, 3686517206,
      2898065728, 853044451, 1172266101, 3705015759, 2882616665, 651767980,
      1373503546, 3369554304, 3218104598, 565507253, 1454621731, 3485111705,
      3099436303, 671266974, 1594198024, 3322730930, 2970347812, 795835527,
      1483230225, 3244367275, 3060149565, 1994146192, 31158534, 2563907772,
      4023717930, 1907459465, 112637215, 2680153253, 3904427059, 2013776290,
      251722036, 2517215374, 3775830040, 2137656763, 141376813, 2439277719,
      3865271297, 1802195444, 476864866, 2238001368, 4066508878, 1812370925,
      453092731, 2181625025, 4111451223, 1706088902, 314042704, 2344532202,
      4240017532, 1658658271, 366619977, 2362670323, 4224994405, 1303535960,
      984961486, 2747007092, 3569037538, 1256170817, 1037604311, 2765210733,
      3554079995, 1131014506, 879679996, 2909243462, 3663771856, 1141124467,
      855842277, 2852801631, 3708648649, 1342533948, 654459306, 3188396048,
      3373015174, 1466479909, 544179635, 3110523913, 3462522015, 1591671054,
      702138776, 2966460450, 3352799412, 1504918807, 783551873, 3082640443,
      3233442989, 3988292384, 2596254646, 62317068, 1957810842, 3939845945,
      2647816111, 81470997, 1943803523, 3814918930, 2489596804, 225274430,
      2053790376, 3826175755, 2466906013, 167816743, 2097651377, 4027552580,
      2265490386, 503444072, 1762050814, 4150417245, 2154129355, 426522225,
      1852507879, 4275313526, 2312317920, 282753626, 1742555852, 4189708143,
      2394877945, 397917763, 1622183637, 3604390888, 2714866558, 953729732,
      1340076626, 3518719985, 2797360999, 1068828381, 1219638859, 3624741850,
      2936675148, 906185462, 1090812512, 3747672003, 2825379669, 829329135,
      1181335161, 3412177804, 3160834842, 628085408, 1382605366, 3423369109,
      3138078467, 570562233, 1426400815, 3317316542, 2998733608, 733239954,
      1555261956, 3268935591, 3050360625, 752459403, 1541320221, 2607071920,
      3965973030, 1969922972, 40735498, 2617837225, 3943577151, 1913087877,
      83908371, 2512341634, 3803740692, 2075208622, 213261112, 2463272603,
      3855990285, 2094854071, 198958881, 2262029012, 4057260610, 1759359992,
      534414190, 2176718541, 4139329115, 1873836001, 414664567, 2282248934,
      4279200368, 1711684554, 285281116, 2405801727, 4167216745, 1634467795,
      376229701, 2685067896, 3608007406, 1308918612, 956543938, 2808555105,
      3495958263, 1231636301, 1047427035, 2932959818, 3654703836, 1088359270,
      936918e3, 2847714899, 3736837829, 1202900863, 817233897, 3183342108,
      3401237130, 1404277552, 615818150, 3134207493, 3453421203, 1423857449,
      601450431, 3009837614, 3294710456, 1567103746, 711928724, 3020668471,
      3272380065, 1510334235, 755167117,
    ];
    "undefined" != typeof Int32Array && (f = new Int32Array(f));
    var u = o("crc-32", function (t, r) {
      n.Buffer.isBuffer(t) || (t = i(t));
      let e = 0 === r ? 0 : -1 ^ ~~r;
      for (let r = 0; r < t.length; r++) {
        const n = t[r];
        e = f[255 & (e ^ n)] ^ (e >>> 8);
      }
      return -1 ^ e;
    });
    var s = o("crc1", function (t, r) {
      n.Buffer.isBuffer(t) || (t = i(t));
      let e = ~~r,
        o = 0;
      for (let r = 0; r < t.length; r++) {
        o += t[r];
      }
      return (e += o % 256) % 256;
    });
    let a = [
      0, 7, 14, 9, 28, 27, 18, 21, 56, 63, 54, 49, 36, 35, 42, 45, 112, 119,
      126, 121, 108, 107, 98, 101, 72, 79, 70, 65, 84, 83, 90, 93, 224, 231,
      238, 233, 252, 251, 242, 245, 216, 223, 214, 209, 196, 195, 202, 205, 144,
      151, 158, 153, 140, 139, 130, 133, 168, 175, 166, 161, 180, 179, 186, 189,
      199, 192, 201, 206, 219, 220, 213, 210, 255, 248, 241, 246, 227, 228, 237,
      234, 183, 176, 185, 190, 171, 172, 165, 162, 143, 136, 129, 134, 147, 148,
      157, 154, 39, 32, 41, 46, 59, 60, 53, 50, 31, 24, 17, 22, 3, 4, 13, 10,
      87, 80, 89, 94, 75, 76, 69, 66, 111, 104, 97, 102, 115, 116, 125, 122,
      137, 142, 135, 128, 149, 146, 155, 156, 177, 182, 191, 184, 173, 170, 163,
      164, 249, 254, 247, 240, 229, 226, 235, 236, 193, 198, 207, 200, 221, 218,
      211, 212, 105, 110, 103, 96, 117, 114, 123, 124, 81, 86, 95, 88, 77, 74,
      67, 68, 25, 30, 23, 16, 5, 2, 11, 12, 33, 38, 47, 40, 61, 58, 51, 52, 78,
      73, 64, 71, 82, 85, 92, 91, 118, 113, 120, 127, 106, 109, 100, 99, 62, 57,
      48, 55, 34, 37, 44, 43, 6, 1, 8, 15, 26, 29, 20, 19, 174, 169, 160, 167,
      178, 181, 188, 187, 150, 145, 152, 159, 138, 141, 132, 131, 222, 217, 208,
      215, 194, 197, 204, 203, 230, 225, 232, 239, 250, 253, 244, 243,
    ];
    "undefined" != typeof Int32Array && (a = new Int32Array(a));
    var h = o("crc-8", function (t, r) {
      n.Buffer.isBuffer(t) || (t = i(t));
      let e = ~~r;
      for (let r = 0; r < t.length; r++) {
        const n = t[r];
        e = 255 & a[255 & (e ^ n)];
      }
      return e;
    });
    let c = [
      0, 94, 188, 226, 97, 63, 221, 131, 194, 156, 126, 32, 163, 253, 31, 65,
      157, 195, 33, 127, 252, 162, 64, 30, 95, 1, 227, 189, 62, 96, 130, 220,
      35, 125, 159, 193, 66, 28, 254, 160, 225, 191, 93, 3, 128, 222, 60, 98,
      190, 224, 2, 92, 223, 129, 99, 61, 124, 34, 192, 158, 29, 67, 161, 255,
      70, 24, 250, 164, 39, 121, 155, 197, 132, 218, 56, 102, 229, 187, 89, 7,
      219, 133, 103, 57, 186, 228, 6, 88, 25, 71, 165, 251, 120, 38, 196, 154,
      101, 59, 217, 135, 4, 90, 184, 230, 167, 249, 27, 69, 198, 152, 122, 36,
      248, 166, 68, 26, 153, 199, 37, 123, 58, 100, 134, 216, 91, 5, 231, 185,
      140, 210, 48, 110, 237, 179, 81, 15, 78, 16, 242, 172, 47, 113, 147, 205,
      17, 79, 173, 243, 112, 46, 204, 146, 211, 141, 111, 49, 178, 236, 14, 80,
      175, 241, 19, 77, 206, 144, 114, 44, 109, 51, 209, 143, 12, 82, 176, 238,
      50, 108, 142, 208, 83, 13, 239, 177, 240, 174, 76, 18, 145, 207, 45, 115,
      202, 148, 118, 40, 171, 245, 23, 73, 8, 86, 180, 234, 105, 55, 213, 139,
      87, 9, 235, 181, 54, 104, 138, 212, 149, 203, 41, 119, 244, 170, 72, 22,
      233, 183, 85, 11, 136, 214, 52, 106, 43, 117, 151, 201, 74, 20, 246, 168,
      116, 42, 200, 150, 21, 75, 169, 247, 182, 232, 10, 84, 215, 137, 107, 53,
    ];
    "undefined" != typeof Int32Array && (c = new Int32Array(c));
    var l = o("dallas-1-wire", function (t, r) {
      n.Buffer.isBuffer(t) || (t = i(t));
      let e = ~~r;
      for (let r = 0; r < t.length; r++) {
        const n = t[r];
        e = 255 & c[255 & (e ^ n)];
      }
      return e;
    });
    let p = [
      0, 49345, 49537, 320, 49921, 960, 640, 49729, 50689, 1728, 1920, 51009,
      1280, 50625, 50305, 1088, 52225, 3264, 3456, 52545, 3840, 53185, 52865,
      3648, 2560, 51905, 52097, 2880, 51457, 2496, 2176, 51265, 55297, 6336,
      6528, 55617, 6912, 56257, 55937, 6720, 7680, 57025, 57217, 8e3, 56577,
      7616, 7296, 56385, 5120, 54465, 54657, 5440, 55041, 6080, 5760, 54849,
      53761, 4800, 4992, 54081, 4352, 53697, 53377, 4160, 61441, 12480, 12672,
      61761, 13056, 62401, 62081, 12864, 13824, 63169, 63361, 14144, 62721,
      13760, 13440, 62529, 15360, 64705, 64897, 15680, 65281, 16320, 16e3,
      65089, 64001, 15040, 15232, 64321, 14592, 63937, 63617, 14400, 10240,
      59585, 59777, 10560, 60161, 11200, 10880, 59969, 60929, 11968, 12160,
      61249, 11520, 60865, 60545, 11328, 58369, 9408, 9600, 58689, 9984, 59329,
      59009, 9792, 8704, 58049, 58241, 9024, 57601, 8640, 8320, 57409, 40961,
      24768, 24960, 41281, 25344, 41921, 41601, 25152, 26112, 42689, 42881,
      26432, 42241, 26048, 25728, 42049, 27648, 44225, 44417, 27968, 44801,
      28608, 28288, 44609, 43521, 27328, 27520, 43841, 26880, 43457, 43137,
      26688, 30720, 47297, 47489, 31040, 47873, 31680, 31360, 47681, 48641,
      32448, 32640, 48961, 32e3, 48577, 48257, 31808, 46081, 29888, 30080,
      46401, 30464, 47041, 46721, 30272, 29184, 45761, 45953, 29504, 45313,
      29120, 28800, 45121, 20480, 37057, 37249, 20800, 37633, 21440, 21120,
      37441, 38401, 22208, 22400, 38721, 21760, 38337, 38017, 21568, 39937,
      23744, 23936, 40257, 24320, 40897, 40577, 24128, 23040, 39617, 39809,
      23360, 39169, 22976, 22656, 38977, 34817, 18624, 18816, 35137, 19200,
      35777, 35457, 19008, 19968, 36545, 36737, 20288, 36097, 19904, 19584,
      35905, 17408, 33985, 34177, 17728, 34561, 18368, 18048, 34369, 33281,
      17088, 17280, 33601, 16640, 33217, 32897, 16448,
    ];
    "undefined" != typeof Int32Array && (p = new Int32Array(p));
    var g = o("crc-16", function (t, r) {
      n.Buffer.isBuffer(t) || (t = i(t));
      let e = ~~r;
      for (let r = 0; r < t.length; r++) {
        const n = t[r];
        e = 65535 & (p[255 & (e ^ n)] ^ (e >> 8));
      }
      return e;
    });
    let y = [
      0, 4129, 8258, 12387, 16516, 20645, 24774, 28903, 33032, 37161, 41290,
      45419, 49548, 53677, 57806, 61935, 4657, 528, 12915, 8786, 21173, 17044,
      29431, 25302, 37689, 33560, 45947, 41818, 54205, 50076, 62463, 58334,
      9314, 13379, 1056, 5121, 25830, 29895, 17572, 21637, 42346, 46411, 34088,
      38153, 58862, 62927, 50604, 54669, 13907, 9842, 5649, 1584, 30423, 26358,
      22165, 18100, 46939, 42874, 38681, 34616, 63455, 59390, 55197, 51132,
      18628, 22757, 26758, 30887, 2112, 6241, 10242, 14371, 51660, 55789, 59790,
      63919, 35144, 39273, 43274, 47403, 23285, 19156, 31415, 27286, 6769, 2640,
      14899, 10770, 56317, 52188, 64447, 60318, 39801, 35672, 47931, 43802,
      27814, 31879, 19684, 23749, 11298, 15363, 3168, 7233, 60846, 64911, 52716,
      56781, 44330, 48395, 36200, 40265, 32407, 28342, 24277, 20212, 15891,
      11826, 7761, 3696, 65439, 61374, 57309, 53244, 48923, 44858, 40793, 36728,
      37256, 33193, 45514, 41451, 53516, 49453, 61774, 57711, 4224, 161, 12482,
      8419, 20484, 16421, 28742, 24679, 33721, 37784, 41979, 46042, 49981,
      54044, 58239, 62302, 689, 4752, 8947, 13010, 16949, 21012, 25207, 29270,
      46570, 42443, 38312, 34185, 62830, 58703, 54572, 50445, 13538, 9411, 5280,
      1153, 29798, 25671, 21540, 17413, 42971, 47098, 34713, 38840, 59231,
      63358, 50973, 55100, 9939, 14066, 1681, 5808, 26199, 30326, 17941, 22068,
      55628, 51565, 63758, 59695, 39368, 35305, 47498, 43435, 22596, 18533,
      30726, 26663, 6336, 2273, 14466, 10403, 52093, 56156, 60223, 64286, 35833,
      39896, 43963, 48026, 19061, 23124, 27191, 31254, 2801, 6864, 10931, 14994,
      64814, 60687, 56684, 52557, 48554, 44427, 40424, 36297, 31782, 27655,
      23652, 19525, 15522, 11395, 7392, 3265, 61215, 65342, 53085, 57212, 44955,
      49082, 36825, 40952, 28183, 32310, 20053, 24180, 11923, 16050, 3793, 7920,
    ];
    "undefined" != typeof Int32Array && (y = new Int32Array(y));
    var d = o("ccitt", function (t, r) {
      n.Buffer.isBuffer(t) || (t = i(t));
      let e = void 0 !== r ? ~~r : 65535;
      for (let r = 0; r < t.length; r++) {
        const n = t[r];
        e = 65535 & (y[255 & ((e >> 8) ^ n)] ^ (e << 8));
      }
      return e;
    });
    let w = [
      0, 49345, 49537, 320, 49921, 960, 640, 49729, 50689, 1728, 1920, 51009,
      1280, 50625, 50305, 1088, 52225, 3264, 3456, 52545, 3840, 53185, 52865,
      3648, 2560, 51905, 52097, 2880, 51457, 2496, 2176, 51265, 55297, 6336,
      6528, 55617, 6912, 56257, 55937, 6720, 7680, 57025, 57217, 8e3, 56577,
      7616, 7296, 56385, 5120, 54465, 54657, 5440, 55041, 6080, 5760, 54849,
      53761, 4800, 4992, 54081, 4352, 53697, 53377, 4160, 61441, 12480, 12672,
      61761, 13056, 62401, 62081, 12864, 13824, 63169, 63361, 14144, 62721,
      13760, 13440, 62529, 15360, 64705, 64897, 15680, 65281, 16320, 16e3,
      65089, 64001, 15040, 15232, 64321, 14592, 63937, 63617, 14400, 10240,
      59585, 59777, 10560, 60161, 11200, 10880, 59969, 60929, 11968, 12160,
      61249, 11520, 60865, 60545, 11328, 58369, 9408, 9600, 58689, 9984, 59329,
      59009, 9792, 8704, 58049, 58241, 9024, 57601, 8640, 8320, 57409, 40961,
      24768, 24960, 41281, 25344, 41921, 41601, 25152, 26112, 42689, 42881,
      26432, 42241, 26048, 25728, 42049, 27648, 44225, 44417, 27968, 44801,
      28608, 28288, 44609, 43521, 27328, 27520, 43841, 26880, 43457, 43137,
      26688, 30720, 47297, 47489, 31040, 47873, 31680, 31360, 47681, 48641,
      32448, 32640, 48961, 32e3, 48577, 48257, 31808, 46081, 29888, 30080,
      46401, 30464, 47041, 46721, 30272, 29184, 45761, 45953, 29504, 45313,
      29120, 28800, 45121, 20480, 37057, 37249, 20800, 37633, 21440, 21120,
      37441, 38401, 22208, 22400, 38721, 21760, 38337, 38017, 21568, 39937,
      23744, 23936, 40257, 24320, 40897, 40577, 24128, 23040, 39617, 39809,
      23360, 39169, 22976, 22656, 38977, 34817, 18624, 18816, 35137, 19200,
      35777, 35457, 19008, 19968, 36545, 36737, 20288, 36097, 19904, 19584,
      35905, 17408, 33985, 34177, 17728, 34561, 18368, 18048, 34369, 33281,
      17088, 17280, 33601, 16640, 33217, 32897, 16448,
    ];
    "undefined" != typeof Int32Array && (w = new Int32Array(w));
    var v = o("crc-16-modbus", function (t, r) {
      n.Buffer.isBuffer(t) || (t = i(t));
      let e = void 0 !== r ? ~~r : 65535;
      for (let r = 0; r < t.length; r++) {
        const n = t[r];
        e = 65535 & (w[255 & (e ^ n)] ^ (e >> 8));
      }
      return e;
    });
    var A = o("xmodem", function (t, r) {
      n.Buffer.isBuffer(t) || (t = i(t));
      let e = void 0 !== r ? ~~r : 0;
      for (let r = 0; r < t.length; r++) {
        let n = (e >>> 8) & 255;
        (n ^= 255 & t[r]),
          (e = (e << 8) & 65535),
          (e ^= n ^= n >>> 4),
          (e ^= n = (n << 5) & 65535),
          (e ^= n = (n << 7) & 65535);
      }
      return e;
    });
    let b = [
      0, 4489, 8978, 12955, 17956, 22445, 25910, 29887, 35912, 40385, 44890,
      48851, 51820, 56293, 59774, 63735, 4225, 264, 13203, 8730, 22181, 18220,
      30135, 25662, 40137, 36160, 49115, 44626, 56045, 52068, 63999, 59510,
      8450, 12427, 528, 5017, 26406, 30383, 17460, 21949, 44362, 48323, 36440,
      40913, 60270, 64231, 51324, 55797, 12675, 8202, 4753, 792, 30631, 26158,
      21685, 17724, 48587, 44098, 40665, 36688, 64495, 60006, 55549, 51572,
      16900, 21389, 24854, 28831, 1056, 5545, 10034, 14011, 52812, 57285, 60766,
      64727, 34920, 39393, 43898, 47859, 21125, 17164, 29079, 24606, 5281, 1320,
      14259, 9786, 57037, 53060, 64991, 60502, 39145, 35168, 48123, 43634,
      25350, 29327, 16404, 20893, 9506, 13483, 1584, 6073, 61262, 65223, 52316,
      56789, 43370, 47331, 35448, 39921, 29575, 25102, 20629, 16668, 13731,
      9258, 5809, 1848, 65487, 60998, 56541, 52564, 47595, 43106, 39673, 35696,
      33800, 38273, 42778, 46739, 49708, 54181, 57662, 61623, 2112, 6601, 11090,
      15067, 20068, 24557, 28022, 31999, 38025, 34048, 47003, 42514, 53933,
      49956, 61887, 57398, 6337, 2376, 15315, 10842, 24293, 20332, 32247, 27774,
      42250, 46211, 34328, 38801, 58158, 62119, 49212, 53685, 10562, 14539,
      2640, 7129, 28518, 32495, 19572, 24061, 46475, 41986, 38553, 34576, 62383,
      57894, 53437, 49460, 14787, 10314, 6865, 2904, 32743, 28270, 23797, 19836,
      50700, 55173, 58654, 62615, 32808, 37281, 41786, 45747, 19012, 23501,
      26966, 30943, 3168, 7657, 12146, 16123, 54925, 50948, 62879, 58390, 37033,
      33056, 46011, 41522, 23237, 19276, 31191, 26718, 7393, 3432, 16371, 11898,
      59150, 63111, 50204, 54677, 41258, 45219, 33336, 37809, 27462, 31439,
      18516, 23005, 11618, 15595, 3696, 8185, 63375, 58886, 54429, 50452, 45483,
      40994, 37561, 33584, 31687, 27214, 22741, 18780, 15843, 11370, 7921, 3960,
    ];
    "undefined" != typeof Int32Array && (b = new Int32Array(b));
    var E = o("kermit", function (t, r) {
      n.Buffer.isBuffer(t) || (t = i(t));
      let e = void 0 !== r ? ~~r : 0;
      for (let r = 0; r < t.length; r++) {
        const n = t[r];
        e = 65535 & (b[255 & (e ^ n)] ^ (e >> 8));
      }
      return e;
    });
    let m = [
      0, 8801531, 9098509, 825846, 9692897, 1419802, 1651692, 10452759,
      10584377, 2608578, 2839604, 11344079, 3303384, 11807523, 12104405,
      4128302, 12930697, 4391538, 5217156, 13227903, 5679208, 13690003,
      14450021, 5910942, 6606768, 14844747, 15604413, 6837830, 16197969,
      7431594, 8256604, 16494759, 840169, 9084178, 8783076, 18463, 10434312,
      1670131, 1434117, 9678590, 11358416, 2825259, 2590173, 10602790, 4109873,
      12122826, 11821884, 3289031, 13213536, 5231515, 4409965, 12912278,
      5929345, 14431610, 13675660, 5693559, 6823513, 15618722, 14863188,
      6588335, 16513208, 8238147, 7417269, 16212302, 1680338, 10481449, 9664223,
      1391140, 9061683, 788936, 36926, 8838341, 12067563, 4091408, 3340262,
      11844381, 2868234, 11372785, 10555655, 2579964, 14478683, 5939616,
      5650518, 13661357, 5180346, 13190977, 12967607, 4428364, 8219746,
      16457881, 16234863, 7468436, 15633027, 6866552, 6578062, 14816117,
      1405499, 9649856, 10463030, 1698765, 8819930, 55329, 803287, 9047340,
      11858690, 3325945, 4072975, 12086004, 2561507, 10574104, 11387118,
      2853909, 13647026, 5664841, 5958079, 14460228, 4446803, 12949160,
      13176670, 5194661, 7454091, 16249200, 16476294, 8201341, 14834538,
      6559633, 6852199, 15647388, 3360676, 11864927, 12161705, 4185682,
      10527045, 2551230, 2782280, 11286707, 9619101, 1346150, 1577872, 10379115,
      73852, 8875143, 9172337, 899466, 16124205, 7357910, 8182816, 16421083,
      6680524, 14918455, 15678145, 6911546, 5736468, 13747439, 14507289,
      5968354, 12873461, 4334094, 5159928, 13170435, 4167245, 12180150,
      11879232, 3346363, 11301036, 2767959, 2532769, 10545498, 10360692,
      1596303, 1360505, 9604738, 913813, 9157998, 8856728, 92259, 16439492,
      8164415, 7343561, 16138546, 6897189, 15692510, 14936872, 6662099, 5986813,
      14488838, 13733104, 5750795, 13156124, 5174247, 4352529, 12855018,
      2810998, 11315341, 10498427, 2522496, 12124823, 4148844, 3397530,
      11901793, 9135439, 862644, 110658, 8912057, 1606574, 10407765, 9590435,
      1317464, 15706879, 6940164, 6651890, 14889737, 8145950, 16384229,
      16161043, 7394792, 5123014, 13133629, 12910283, 4370992, 14535975,
      5997020, 5707818, 13718737, 2504095, 10516836, 11329682, 2796649,
      11916158, 3383173, 4130419, 12143240, 8893606, 129117, 876971, 9121104,
      1331783, 9576124, 10389322, 1625009, 14908182, 6633453, 6925851, 15721184,
      7380471, 16175372, 16402682, 8127489, 4389423, 12891860, 13119266,
      5137369, 13704398, 5722165, 6015427, 14517560,
    ];
    "undefined" != typeof Int32Array && (m = new Int32Array(m));
    var B = o("crc-24", function (t, r) {
      n.Buffer.isBuffer(t) || (t = i(t));
      let e = void 0 !== r ? ~~r : 11994318;
      for (let r = 0; r < t.length; r++) {
        const n = t[r];
        e = 16777215 & (m[255 & ((e >> 16) ^ n)] ^ (e << 8));
      }
      return e;
    });
    let _ = [
      0, 1996959894, 3993919788, 2567524794, 124634137, 1886057615, 3915621685,
      2657392035, 249268274, 2044508324, 3772115230, 2547177864, 162941995,
      2125561021, 3887607047, 2428444049, 498536548, 1789927666, 4089016648,
      2227061214, 450548861, 1843258603, 4107580753, 2211677639, 325883990,
      1684777152, 4251122042, 2321926636, 335633487, 1661365465, 4195302755,
      2366115317, 997073096, 1281953886, 3579855332, 2724688242, 1006888145,
      1258607687, 3524101629, 2768942443, 901097722, 1119000684, 3686517206,
      2898065728, 853044451, 1172266101, 3705015759, 2882616665, 651767980,
      1373503546, 3369554304, 3218104598, 565507253, 1454621731, 3485111705,
      3099436303, 671266974, 1594198024, 3322730930, 2970347812, 795835527,
      1483230225, 3244367275, 3060149565, 1994146192, 31158534, 2563907772,
      4023717930, 1907459465, 112637215, 2680153253, 3904427059, 2013776290,
      251722036, 2517215374, 3775830040, 2137656763, 141376813, 2439277719,
      3865271297, 1802195444, 476864866, 2238001368, 4066508878, 1812370925,
      453092731, 2181625025, 4111451223, 1706088902, 314042704, 2344532202,
      4240017532, 1658658271, 366619977, 2362670323, 4224994405, 1303535960,
      984961486, 2747007092, 3569037538, 1256170817, 1037604311, 2765210733,
      3554079995, 1131014506, 879679996, 2909243462, 3663771856, 1141124467,
      855842277, 2852801631, 3708648649, 1342533948, 654459306, 3188396048,
      3373015174, 1466479909, 544179635, 3110523913, 3462522015, 1591671054,
      702138776, 2966460450, 3352799412, 1504918807, 783551873, 3082640443,
      3233442989, 3988292384, 2596254646, 62317068, 1957810842, 3939845945,
      2647816111, 81470997, 1943803523, 3814918930, 2489596804, 225274430,
      2053790376, 3826175755, 2466906013, 167816743, 2097651377, 4027552580,
      2265490386, 503444072, 1762050814, 4150417245, 2154129355, 426522225,
      1852507879, 4275313526, 2312317920, 282753626, 1742555852, 4189708143,
      2394877945, 397917763, 1622183637, 3604390888, 2714866558, 953729732,
      1340076626, 3518719985, 2797360999, 1068828381, 1219638859, 3624741850,
      2936675148, 906185462, 1090812512, 3747672003, 2825379669, 829329135,
      1181335161, 3412177804, 3160834842, 628085408, 1382605366, 3423369109,
      3138078467, 570562233, 1426400815, 3317316542, 2998733608, 733239954,
      1555261956, 3268935591, 3050360625, 752459403, 1541320221, 2607071920,
      3965973030, 1969922972, 40735498, 2617837225, 3943577151, 1913087877,
      83908371, 2512341634, 3803740692, 2075208622, 213261112, 2463272603,
      3855990285, 2094854071, 198958881, 2262029012, 4057260610, 1759359992,
      534414190, 2176718541, 4139329115, 1873836001, 414664567, 2282248934,
      4279200368, 1711684554, 285281116, 2405801727, 4167216745, 1634467795,
      376229701, 2685067896, 3608007406, 1308918612, 956543938, 2808555105,
      3495958263, 1231636301, 1047427035, 2932959818, 3654703836, 1088359270,
      936918e3, 2847714899, 3736837829, 1202900863, 817233897, 3183342108,
      3401237130, 1404277552, 615818150, 3134207493, 3453421203, 1423857449,
      601450431, 3009837614, 3294710456, 1567103746, 711928724, 3020668471,
      3272380065, 1510334235, 755167117,
    ];
    "undefined" != typeof Int32Array && (_ = new Int32Array(_));

    var R = {
      crc1: s,
      crc8: h,
      crc81wire: l,
      crc16: g,
      crc16ccitt: d,
      crc16modbus: v,
      crc16xmodem: A,
      crc16kermit: E,
      crc24: B,
      crc32: u,
      crcjam: o("jam", function (t, r = -1) {
        n.Buffer.isBuffer(t) || (t = i(t));
        let e = 0 === r ? 0 : ~~r;
        for (let r = 0; r < t.length; r++) {
          const n = t[r];
          e = _[255 & (e ^ n)] ^ (e >>> 8);
        }
        return e;
      }),
    };
    window.crc = R;
    // console.log(u("hello world"), R.crc32("hello world"));
  },
  function (t, r) {
    var e = {}.toString;
    t.exports =
      Array.isArray ||
      function (t) {
        return "[object Array]" == e.call(t);
      };
  },
  function (t, r) {
    (r.read = function (t, r, e, n, i) {
      var o,
        f,
        u = 8 * i - n - 1,
        s = (1 << u) - 1,
        a = s >> 1,
        h = -7,
        c = e ? i - 1 : 0,
        l = e ? -1 : 1,
        p = t[r + c];
      for (
        c += l, o = p & ((1 << -h) - 1), p >>= -h, h += u;
        h > 0;
        o = 256 * o + t[r + c], c += l, h -= 8
      );
      for (
        f = o & ((1 << -h) - 1), o >>= -h, h += n;
        h > 0;
        f = 256 * f + t[r + c], c += l, h -= 8
      );
      if (0 === o) o = 1 - a;
      else {
        if (o === s) return f ? NaN : (1 / 0) * (p ? -1 : 1);
        (f += Math.pow(2, n)), (o -= a);
      }
      return (p ? -1 : 1) * f * Math.pow(2, o - n);
    }),
      (r.write = function (t, r, e, n, i, o) {
        var f,
          u,
          s,
          a = 8 * o - i - 1,
          h = (1 << a) - 1,
          c = h >> 1,
          l = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
          p = n ? 0 : o - 1,
          g = n ? 1 : -1,
          y = r < 0 || (0 === r && 1 / r < 0) ? 1 : 0;
        for (
          r = Math.abs(r),
            isNaN(r) || r === 1 / 0
              ? ((u = isNaN(r) ? 1 : 0), (f = h))
              : ((f = Math.floor(Math.log(r) / Math.LN2)),
                r * (s = Math.pow(2, -f)) < 1 && (f--, (s *= 2)),
                (r += f + c >= 1 ? l / s : l * Math.pow(2, 1 - c)) * s >= 2 &&
                  (f++, (s /= 2)),
                f + c >= h
                  ? ((u = 0), (f = h))
                  : f + c >= 1
                  ? ((u = (r * s - 1) * Math.pow(2, i)), (f += c))
                  : ((u = r * Math.pow(2, c - 1) * Math.pow(2, i)), (f = 0)));
          i >= 8;
          t[e + p] = 255 & u, p += g, u /= 256, i -= 8
        );
        for (
          f = (f << i) | u, a += i;
          a > 0;
          t[e + p] = 255 & f, p += g, f /= 256, a -= 8
        );
        t[e + p - g] |= 128 * y;
      });
  },
  function (t, r, e) {
    "use strict";
    (r.byteLength = function (t) {
      var r = a(t),
        e = r[0],
        n = r[1];
      return (3 * (e + n)) / 4 - n;
    }),
      (r.toByteArray = function (t) {
        for (
          var r,
            e = a(t),
            n = e[0],
            f = e[1],
            u = new o(
              (function (t, r, e) {
                return (3 * (r + e)) / 4 - e;
              })(0, n, f)
            ),
            s = 0,
            h = f > 0 ? n - 4 : n,
            c = 0;
          c < h;
          c += 4
        )
          (r =
            (i[t.charCodeAt(c)] << 18) |
            (i[t.charCodeAt(c + 1)] << 12) |
            (i[t.charCodeAt(c + 2)] << 6) |
            i[t.charCodeAt(c + 3)]),
            (u[s++] = (r >> 16) & 255),
            (u[s++] = (r >> 8) & 255),
            (u[s++] = 255 & r);
        2 === f &&
          ((r = (i[t.charCodeAt(c)] << 2) | (i[t.charCodeAt(c + 1)] >> 4)),
          (u[s++] = 255 & r));
        1 === f &&
          ((r =
            (i[t.charCodeAt(c)] << 10) |
            (i[t.charCodeAt(c + 1)] << 4) |
            (i[t.charCodeAt(c + 2)] >> 2)),
          (u[s++] = (r >> 8) & 255),
          (u[s++] = 255 & r));
        return u;
      }),
      (r.fromByteArray = function (t) {
        for (
          var r, e = t.length, i = e % 3, o = [], f = 0, u = e - i;
          f < u;
          f += 16383
        )
          o.push(c(t, f, f + 16383 > u ? u : f + 16383));
        1 === i
          ? ((r = t[e - 1]), o.push(n[r >> 2] + n[(r << 4) & 63] + "=="))
          : 2 === i &&
            ((r = (t[e - 2] << 8) + t[e - 1]),
            o.push(n[r >> 10] + n[(r >> 4) & 63] + n[(r << 2) & 63] + "="));
        return o.join("");
      });
    for (
      var n = [],
        i = [],
        o = "undefined" != typeof Uint8Array ? Uint8Array : Array,
        f = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
        u = 0,
        s = f.length;
      u < s;
      ++u
    )
      (n[u] = f[u]), (i[f.charCodeAt(u)] = u);
    function a(t) {
      var r = t.length;
      if (r % 4 > 0)
        throw new Error("Invalid string. Length must be a multiple of 4");
      var e = t.indexOf("=");
      return -1 === e && (e = r), [e, e === r ? 0 : 4 - (e % 4)];
    }
    function h(t) {
      return (
        n[(t >> 18) & 63] + n[(t >> 12) & 63] + n[(t >> 6) & 63] + n[63 & t]
      );
    }
    function c(t, r, e) {
      for (var n, i = [], o = r; o < e; o += 3)
        (n =
          ((t[o] << 16) & 16711680) +
          ((t[o + 1] << 8) & 65280) +
          (255 & t[o + 2])),
          i.push(h(n));
      return i.join("");
    }
    (i["-".charCodeAt(0)] = 62), (i["_".charCodeAt(0)] = 63);
  },
  function (t, r) {
    var e;
    e = (function () {
      return this;
    })();
    try {
      e = e || Function("return this")() || (0, eval)("this");
    } catch (t) {
      "object" == typeof window && (e = window);
    }
    t.exports = e;
  },
]);

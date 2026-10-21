//#region \0rolldown/runtime.js
var e = Object.create, t = Object.defineProperty, n = Object.getOwnPropertyDescriptor, r = Object.getOwnPropertyNames, i = Object.getPrototypeOf, a = Object.prototype.hasOwnProperty, o = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), s = (e, i, o, s) => {
	if (i && typeof i == "object" || typeof i == "function") for (var c = r(i), l = 0, u = c.length, d; l < u; l++) d = c[l], !a.call(e, d) && d !== o && t(e, d, {
		get: ((e) => i[e]).bind(null, d),
		enumerable: !(s = n(i, d)) || s.enumerable
	});
	return e;
}, c = (n, r, a) => (a = n == null ? {} : e(i(n)), s(r || !n || !n.__esModule ? t(a, "default", {
	value: n,
	enumerable: !0
}) : a, n)), l = /* @__PURE__ */ o(((e) => {
	var t = Symbol.for("react.transitional.element"), n = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), a = Symbol.for("react.profiler"), o = Symbol.for("react.consumer"), s = Symbol.for("react.context"), c = Symbol.for("react.forward_ref"), l = Symbol.for("react.suspense"), u = Symbol.for("react.memo"), d = Symbol.for("react.lazy"), f = Symbol.for("react.activity"), p = Symbol.iterator;
	function m(e) {
		return typeof e != "object" || !e ? null : (e = p && e[p] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var h = {
		isMounted: function() {
			return !1;
		},
		enqueueForceUpdate: function() {},
		enqueueReplaceState: function() {},
		enqueueSetState: function() {}
	}, g = Object.assign, _ = {};
	function v(e, t, n) {
		this.props = e, this.context = t, this.refs = _, this.updater = n || h;
	}
	v.prototype.isReactComponent = {}, v.prototype.setState = function(e, t) {
		if (typeof e != "object" && typeof e != "function" && e != null) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
		this.updater.enqueueSetState(this, e, t, "setState");
	}, v.prototype.forceUpdate = function(e) {
		this.updater.enqueueForceUpdate(this, e, "forceUpdate");
	};
	function y() {}
	y.prototype = v.prototype;
	function b(e, t, n) {
		this.props = e, this.context = t, this.refs = _, this.updater = n || h;
	}
	var x = b.prototype = new y();
	x.constructor = b, g(x, v.prototype), x.isPureReactComponent = !0;
	var ee = Array.isArray;
	function te() {}
	var S = {
		H: null,
		A: null,
		T: null,
		S: null
	}, ne = Object.prototype.hasOwnProperty;
	function re(e, n, r) {
		var i = r.ref;
		return {
			$$typeof: t,
			type: e,
			key: n,
			ref: i === void 0 ? null : i,
			props: r
		};
	}
	function ie(e, t) {
		return re(e.type, t, e.props);
	}
	function C(e) {
		return typeof e == "object" && !!e && e.$$typeof === t;
	}
	function ae(e) {
		var t = {
			"=": "=0",
			":": "=2"
		};
		return "$" + e.replace(/[=:]/g, function(e) {
			return t[e];
		});
	}
	var oe = /\/+/g;
	function se(e, t) {
		return typeof e == "object" && e && e.key != null ? ae("" + e.key) : t.toString(36);
	}
	function w(e) {
		switch (e.status) {
			case "fulfilled": return e.value;
			case "rejected": throw e.reason;
			default: switch (typeof e.status == "string" ? e.then(te, te) : (e.status = "pending", e.then(function(t) {
				e.status === "pending" && (e.status = "fulfilled", e.value = t);
			}, function(t) {
				e.status === "pending" && (e.status = "rejected", e.reason = t);
			})), e.status) {
				case "fulfilled": return e.value;
				case "rejected": throw e.reason;
			}
		}
		throw e;
	}
	function ce(e, r, i, a, o) {
		var s = typeof e;
		(s === "undefined" || s === "boolean") && (e = null);
		var c = !1;
		if (e === null) c = !0;
		else switch (s) {
			case "bigint":
			case "string":
			case "number":
				c = !0;
				break;
			case "object": switch (e.$$typeof) {
				case t:
				case n:
					c = !0;
					break;
				case d: return c = e._init, ce(c(e._payload), r, i, a, o);
			}
		}
		if (c) return o = o(e), c = a === "" ? "." + se(e, 0) : a, ee(o) ? (i = "", c != null && (i = c.replace(oe, "$&/") + "/"), ce(o, r, i, "", function(e) {
			return e;
		})) : o != null && (C(o) && (o = ie(o, i + (o.key == null || e && e.key === o.key ? "" : ("" + o.key).replace(oe, "$&/") + "/") + c)), r.push(o)), 1;
		c = 0;
		var l = a === "" ? "." : a + ":";
		if (ee(e)) for (var u = 0; u < e.length; u++) a = e[u], s = l + se(a, u), c += ce(a, r, i, s, o);
		else if (u = m(e), typeof u == "function") for (e = u.call(e), u = 0; !(a = e.next()).done;) a = a.value, s = l + se(a, u++), c += ce(a, r, i, s, o);
		else if (s === "object") {
			if (typeof e.then == "function") return ce(w(e), r, i, a, o);
			throw r = String(e), Error("Objects are not valid as a React child (found: " + (r === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : r) + "). If you meant to render a collection of children, use an array instead.");
		}
		return c;
	}
	function T(e, t, n) {
		if (e == null) return e;
		var r = [], i = 0;
		return ce(e, r, "", "", function(e) {
			return t.call(n, e, i++);
		}), r;
	}
	function E(e) {
		if (e._status === -1) {
			var t = e._result;
			t = t(), t.then(function(t) {
				(e._status === 0 || e._status === -1) && (e._status = 1, e._result = t);
			}, function(t) {
				(e._status === 0 || e._status === -1) && (e._status = 2, e._result = t);
			}), e._status === -1 && (e._status = 0, e._result = t);
		}
		if (e._status === 1) return e._result.default;
		throw e._result;
	}
	var D = typeof reportError == "function" ? reportError : function(e) {
		if (typeof window == "object" && typeof window.ErrorEvent == "function") {
			var t = new window.ErrorEvent("error", {
				bubbles: !0,
				cancelable: !0,
				message: typeof e == "object" && e && typeof e.message == "string" ? String(e.message) : String(e),
				error: e
			});
			if (!window.dispatchEvent(t)) return;
		} else if (typeof process == "object" && typeof process.emit == "function") {
			process.emit("uncaughtException", e);
			return;
		}
		console.error(e);
	}, O = {
		map: T,
		forEach: function(e, t, n) {
			T(e, function() {
				t.apply(this, arguments);
			}, n);
		},
		count: function(e) {
			var t = 0;
			return T(e, function() {
				t++;
			}), t;
		},
		toArray: function(e) {
			return T(e, function(e) {
				return e;
			}) || [];
		},
		only: function(e) {
			if (!C(e)) throw Error("React.Children.only expected to receive a single React element child.");
			return e;
		}
	};
	e.Activity = f, e.Children = O, e.Component = v, e.Fragment = r, e.Profiler = a, e.PureComponent = b, e.StrictMode = i, e.Suspense = l, e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = S, e.__COMPILER_RUNTIME = {
		__proto__: null,
		c: function(e) {
			return S.H.useMemoCache(e);
		}
	}, e.cache = function(e) {
		return function() {
			return e.apply(null, arguments);
		};
	}, e.cacheSignal = function() {
		return null;
	}, e.cloneElement = function(e, t, n) {
		if (e == null) throw Error("The argument must be a React element, but you passed " + e + ".");
		var r = g({}, e.props), i = e.key;
		if (t != null) for (a in t.key !== void 0 && (i = "" + t.key), t) !ne.call(t, a) || a === "key" || a === "__self" || a === "__source" || a === "ref" && t.ref === void 0 || (r[a] = t[a]);
		var a = arguments.length - 2;
		if (a === 1) r.children = n;
		else if (1 < a) {
			for (var o = Array(a), s = 0; s < a; s++) o[s] = arguments[s + 2];
			r.children = o;
		}
		return re(e.type, i, r);
	}, e.createContext = function(e) {
		return e = {
			$$typeof: s,
			_currentValue: e,
			_currentValue2: e,
			_threadCount: 0,
			Provider: null,
			Consumer: null
		}, e.Provider = e, e.Consumer = {
			$$typeof: o,
			_context: e
		}, e;
	}, e.createElement = function(e, t, n) {
		var r, i = {}, a = null;
		if (t != null) for (r in t.key !== void 0 && (a = "" + t.key), t) ne.call(t, r) && r !== "key" && r !== "__self" && r !== "__source" && (i[r] = t[r]);
		var o = arguments.length - 2;
		if (o === 1) i.children = n;
		else if (1 < o) {
			for (var s = Array(o), c = 0; c < o; c++) s[c] = arguments[c + 2];
			i.children = s;
		}
		if (e && e.defaultProps) for (r in o = e.defaultProps, o) i[r] === void 0 && (i[r] = o[r]);
		return re(e, a, i);
	}, e.createRef = function() {
		return { current: null };
	}, e.forwardRef = function(e) {
		return {
			$$typeof: c,
			render: e
		};
	}, e.isValidElement = C, e.lazy = function(e) {
		return {
			$$typeof: d,
			_payload: {
				_status: -1,
				_result: e
			},
			_init: E
		};
	}, e.memo = function(e, t) {
		return {
			$$typeof: u,
			type: e,
			compare: t === void 0 ? null : t
		};
	}, e.startTransition = function(e) {
		var t = S.T, n = {};
		S.T = n;
		try {
			var r = e(), i = S.S;
			i !== null && i(n, r), typeof r == "object" && r && typeof r.then == "function" && r.then(te, D);
		} catch (e) {
			D(e);
		} finally {
			t !== null && n.types !== null && (t.types = n.types), S.T = t;
		}
	}, e.unstable_useCacheRefresh = function() {
		return S.H.useCacheRefresh();
	}, e.use = function(e) {
		return S.H.use(e);
	}, e.useActionState = function(e, t, n) {
		return S.H.useActionState(e, t, n);
	}, e.useCallback = function(e, t) {
		return S.H.useCallback(e, t);
	}, e.useContext = function(e) {
		return S.H.useContext(e);
	}, e.useDebugValue = function() {}, e.useDeferredValue = function(e, t) {
		return S.H.useDeferredValue(e, t);
	}, e.useEffect = function(e, t) {
		return S.H.useEffect(e, t);
	}, e.useEffectEvent = function(e) {
		return S.H.useEffectEvent(e);
	}, e.useId = function() {
		return S.H.useId();
	}, e.useImperativeHandle = function(e, t, n) {
		return S.H.useImperativeHandle(e, t, n);
	}, e.useInsertionEffect = function(e, t) {
		return S.H.useInsertionEffect(e, t);
	}, e.useLayoutEffect = function(e, t) {
		return S.H.useLayoutEffect(e, t);
	}, e.useMemo = function(e, t) {
		return S.H.useMemo(e, t);
	}, e.useOptimistic = function(e, t) {
		return S.H.useOptimistic(e, t);
	}, e.useReducer = function(e, t, n) {
		return S.H.useReducer(e, t, n);
	}, e.useRef = function(e) {
		return S.H.useRef(e);
	}, e.useState = function(e) {
		return S.H.useState(e);
	}, e.useSyncExternalStore = function(e, t, n) {
		return S.H.useSyncExternalStore(e, t, n);
	}, e.useTransition = function() {
		return S.H.useTransition();
	}, e.version = "19.2.6";
})), u = /* @__PURE__ */ o(((e, t) => {
	t.exports = l();
})), d = /* @__PURE__ */ o(((e) => {
	function t(e, t) {
		var n = e.length;
		e.push(t);
		a: for (; 0 < n;) {
			var r = n - 1 >>> 1, a = e[r];
			if (0 < i(a, t)) e[r] = t, e[n] = a, n = r;
			else break a;
		}
	}
	function n(e) {
		return e.length === 0 ? null : e[0];
	}
	function r(e) {
		if (e.length === 0) return null;
		var t = e[0], n = e.pop();
		if (n !== t) {
			e[0] = n;
			a: for (var r = 0, a = e.length, o = a >>> 1; r < o;) {
				var s = 2 * (r + 1) - 1, c = e[s], l = s + 1, u = e[l];
				if (0 > i(c, n)) l < a && 0 > i(u, c) ? (e[r] = u, e[l] = n, r = l) : (e[r] = c, e[s] = n, r = s);
				else if (l < a && 0 > i(u, n)) e[r] = u, e[l] = n, r = l;
				else break a;
			}
		}
		return t;
	}
	function i(e, t) {
		var n = e.sortIndex - t.sortIndex;
		return n === 0 ? e.id - t.id : n;
	}
	if (e.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
		var a = performance;
		e.unstable_now = function() {
			return a.now();
		};
	} else {
		var o = Date, s = o.now();
		e.unstable_now = function() {
			return o.now() - s;
		};
	}
	var c = [], l = [], u = 1, d = null, f = 3, p = !1, m = !1, h = !1, g = !1, _ = typeof setTimeout == "function" ? setTimeout : null, v = typeof clearTimeout == "function" ? clearTimeout : null, y = typeof setImmediate < "u" ? setImmediate : null;
	function b(e) {
		for (var i = n(l); i !== null;) {
			if (i.callback === null) r(l);
			else if (i.startTime <= e) r(l), i.sortIndex = i.expirationTime, t(c, i);
			else break;
			i = n(l);
		}
	}
	function x(e) {
		if (h = !1, b(e), !m) if (n(c) !== null) m = !0, ee || (ee = !0, C());
		else {
			var t = n(l);
			t !== null && se(x, t.startTime - e);
		}
	}
	var ee = !1, te = -1, S = 5, ne = -1;
	function re() {
		return g ? !0 : !(e.unstable_now() - ne < S);
	}
	function ie() {
		if (g = !1, ee) {
			var t = e.unstable_now();
			ne = t;
			var i = !0;
			try {
				a: {
					m = !1, h && (h = !1, v(te), te = -1), p = !0;
					var a = f;
					try {
						b: {
							for (b(t), d = n(c); d !== null && !(d.expirationTime > t && re());) {
								var o = d.callback;
								if (typeof o == "function") {
									d.callback = null, f = d.priorityLevel;
									var s = o(d.expirationTime <= t);
									if (t = e.unstable_now(), typeof s == "function") {
										d.callback = s, b(t), i = !0;
										break b;
									}
									d === n(c) && r(c), b(t);
								} else r(c);
								d = n(c);
							}
							if (d !== null) i = !0;
							else {
								var u = n(l);
								u !== null && se(x, u.startTime - t), i = !1;
							}
						}
						break a;
					} finally {
						d = null, f = a, p = !1;
					}
					i = void 0;
				}
			} finally {
				i ? C() : ee = !1;
			}
		}
	}
	var C;
	if (typeof y == "function") C = function() {
		y(ie);
	};
	else if (typeof MessageChannel < "u") {
		var ae = new MessageChannel(), oe = ae.port2;
		ae.port1.onmessage = ie, C = function() {
			oe.postMessage(null);
		};
	} else C = function() {
		_(ie, 0);
	};
	function se(t, n) {
		te = _(function() {
			t(e.unstable_now());
		}, n);
	}
	e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(e) {
		e.callback = null;
	}, e.unstable_forceFrameRate = function(e) {
		0 > e || 125 < e ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : S = 0 < e ? Math.floor(1e3 / e) : 5;
	}, e.unstable_getCurrentPriorityLevel = function() {
		return f;
	}, e.unstable_next = function(e) {
		switch (f) {
			case 1:
			case 2:
			case 3:
				var t = 3;
				break;
			default: t = f;
		}
		var n = f;
		f = t;
		try {
			return e();
		} finally {
			f = n;
		}
	}, e.unstable_requestPaint = function() {
		g = !0;
	}, e.unstable_runWithPriority = function(e, t) {
		switch (e) {
			case 1:
			case 2:
			case 3:
			case 4:
			case 5: break;
			default: e = 3;
		}
		var n = f;
		f = e;
		try {
			return t();
		} finally {
			f = n;
		}
	}, e.unstable_scheduleCallback = function(r, i, a) {
		var o = e.unstable_now();
		switch (typeof a == "object" && a ? (a = a.delay, a = typeof a == "number" && 0 < a ? o + a : o) : a = o, r) {
			case 1:
				var s = -1;
				break;
			case 2:
				s = 250;
				break;
			case 5:
				s = 1073741823;
				break;
			case 4:
				s = 1e4;
				break;
			default: s = 5e3;
		}
		return s = a + s, r = {
			id: u++,
			callback: i,
			priorityLevel: r,
			startTime: a,
			expirationTime: s,
			sortIndex: -1
		}, a > o ? (r.sortIndex = a, t(l, r), n(c) === null && r === n(l) && (h ? (v(te), te = -1) : h = !0, se(x, a - o))) : (r.sortIndex = s, t(c, r), m || p || (m = !0, ee || (ee = !0, C()))), r;
	}, e.unstable_shouldYield = re, e.unstable_wrapCallback = function(e) {
		var t = f;
		return function() {
			var n = f;
			f = t;
			try {
				return e.apply(this, arguments);
			} finally {
				f = n;
			}
		};
	};
})), f = /* @__PURE__ */ o(((e, t) => {
	t.exports = d();
})), p = /* @__PURE__ */ o(((e) => {
	var t = u();
	function n(e) {
		var t = "https://react.dev/errors/" + e;
		if (1 < arguments.length) {
			t += "?args[]=" + encodeURIComponent(arguments[1]);
			for (var n = 2; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
		}
		return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	function r() {}
	var i = {
		d: {
			f: r,
			r: function() {
				throw Error(n(522));
			},
			D: r,
			C: r,
			L: r,
			m: r,
			X: r,
			S: r,
			M: r
		},
		p: 0,
		findDOMNode: null
	}, a = Symbol.for("react.portal");
	function o(e, t, n) {
		var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
		return {
			$$typeof: a,
			key: r == null ? null : "" + r,
			children: e,
			containerInfo: t,
			implementation: n
		};
	}
	var s = t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
	function c(e, t) {
		if (e === "font") return "";
		if (typeof t == "string") return t === "use-credentials" ? t : "";
	}
	e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = i, e.createPortal = function(e, t) {
		var r = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
		if (!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11) throw Error(n(299));
		return o(e, t, null, r);
	}, e.flushSync = function(e) {
		var t = s.T, n = i.p;
		try {
			if (s.T = null, i.p = 2, e) return e();
		} finally {
			s.T = t, i.p = n, i.d.f();
		}
	}, e.preconnect = function(e, t) {
		typeof e == "string" && (t ? (t = t.crossOrigin, t = typeof t == "string" ? t === "use-credentials" ? t : "" : void 0) : t = null, i.d.C(e, t));
	}, e.prefetchDNS = function(e) {
		typeof e == "string" && i.d.D(e);
	}, e.preinit = function(e, t) {
		if (typeof e == "string" && t && typeof t.as == "string") {
			var n = t.as, r = c(n, t.crossOrigin), a = typeof t.integrity == "string" ? t.integrity : void 0, o = typeof t.fetchPriority == "string" ? t.fetchPriority : void 0;
			n === "style" ? i.d.S(e, typeof t.precedence == "string" ? t.precedence : void 0, {
				crossOrigin: r,
				integrity: a,
				fetchPriority: o
			}) : n === "script" && i.d.X(e, {
				crossOrigin: r,
				integrity: a,
				fetchPriority: o,
				nonce: typeof t.nonce == "string" ? t.nonce : void 0
			});
		}
	}, e.preinitModule = function(e, t) {
		if (typeof e == "string") if (typeof t == "object" && t) {
			if (t.as == null || t.as === "script") {
				var n = c(t.as, t.crossOrigin);
				i.d.M(e, {
					crossOrigin: n,
					integrity: typeof t.integrity == "string" ? t.integrity : void 0,
					nonce: typeof t.nonce == "string" ? t.nonce : void 0
				});
			}
		} else t ?? i.d.M(e);
	}, e.preload = function(e, t) {
		if (typeof e == "string" && typeof t == "object" && t && typeof t.as == "string") {
			var n = t.as, r = c(n, t.crossOrigin);
			i.d.L(e, n, {
				crossOrigin: r,
				integrity: typeof t.integrity == "string" ? t.integrity : void 0,
				nonce: typeof t.nonce == "string" ? t.nonce : void 0,
				type: typeof t.type == "string" ? t.type : void 0,
				fetchPriority: typeof t.fetchPriority == "string" ? t.fetchPriority : void 0,
				referrerPolicy: typeof t.referrerPolicy == "string" ? t.referrerPolicy : void 0,
				imageSrcSet: typeof t.imageSrcSet == "string" ? t.imageSrcSet : void 0,
				imageSizes: typeof t.imageSizes == "string" ? t.imageSizes : void 0,
				media: typeof t.media == "string" ? t.media : void 0
			});
		}
	}, e.preloadModule = function(e, t) {
		if (typeof e == "string") if (t) {
			var n = c(t.as, t.crossOrigin);
			i.d.m(e, {
				as: typeof t.as == "string" && t.as !== "script" ? t.as : void 0,
				crossOrigin: n,
				integrity: typeof t.integrity == "string" ? t.integrity : void 0
			});
		} else i.d.m(e);
	}, e.requestFormReset = function(e) {
		i.d.r(e);
	}, e.unstable_batchedUpdates = function(e, t) {
		return e(t);
	}, e.useFormState = function(e, t, n) {
		return s.H.useFormState(e, t, n);
	}, e.useFormStatus = function() {
		return s.H.useHostTransitionStatus();
	}, e.version = "19.2.6";
})), m = /* @__PURE__ */ o(((e, t) => {
	function n() {
		if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
			__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
		} catch (e) {
			console.error(e);
		}
	}
	n(), t.exports = p();
})), h = /* @__PURE__ */ o(((e) => {
	var t = f(), n = u(), r = m();
	function i(e) {
		var t = "https://react.dev/errors/" + e;
		if (1 < arguments.length) {
			t += "?args[]=" + encodeURIComponent(arguments[1]);
			for (var n = 2; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
		}
		return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	function a(e) {
		return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
	}
	function o(e) {
		var t = e, n = e;
		if (e.alternate) for (; t.return;) t = t.return;
		else {
			e = t;
			do
				t = e, t.flags & 4098 && (n = t.return), e = t.return;
			while (e);
		}
		return t.tag === 3 ? n : null;
	}
	function s(e) {
		if (e.tag === 13) {
			var t = e.memoizedState;
			if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
		}
		return null;
	}
	function c(e) {
		if (e.tag === 31) {
			var t = e.memoizedState;
			if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
		}
		return null;
	}
	function l(e) {
		if (o(e) !== e) throw Error(i(188));
	}
	function d(e) {
		var t = e.alternate;
		if (!t) {
			if (t = o(e), t === null) throw Error(i(188));
			return t === e ? e : null;
		}
		for (var n = e, r = t;;) {
			var a = n.return;
			if (a === null) break;
			var s = a.alternate;
			if (s === null) {
				if (r = a.return, r !== null) {
					n = r;
					continue;
				}
				break;
			}
			if (a.child === s.child) {
				for (s = a.child; s;) {
					if (s === n) return l(a), e;
					if (s === r) return l(a), t;
					s = s.sibling;
				}
				throw Error(i(188));
			}
			if (n.return !== r.return) n = a, r = s;
			else {
				for (var c = !1, u = a.child; u;) {
					if (u === n) {
						c = !0, n = a, r = s;
						break;
					}
					if (u === r) {
						c = !0, r = a, n = s;
						break;
					}
					u = u.sibling;
				}
				if (!c) {
					for (u = s.child; u;) {
						if (u === n) {
							c = !0, n = s, r = a;
							break;
						}
						if (u === r) {
							c = !0, r = s, n = a;
							break;
						}
						u = u.sibling;
					}
					if (!c) throw Error(i(189));
				}
			}
			if (n.alternate !== r) throw Error(i(190));
		}
		if (n.tag !== 3) throw Error(i(188));
		return n.stateNode.current === n ? e : t;
	}
	function p(e) {
		var t = e.tag;
		if (t === 5 || t === 26 || t === 27 || t === 6) return e;
		for (e = e.child; e !== null;) {
			if (t = p(e), t !== null) return t;
			e = e.sibling;
		}
		return null;
	}
	var h = Object.assign, g = Symbol.for("react.element"), _ = Symbol.for("react.transitional.element"), v = Symbol.for("react.portal"), y = Symbol.for("react.fragment"), b = Symbol.for("react.strict_mode"), x = Symbol.for("react.profiler"), ee = Symbol.for("react.consumer"), te = Symbol.for("react.context"), S = Symbol.for("react.forward_ref"), ne = Symbol.for("react.suspense"), re = Symbol.for("react.suspense_list"), ie = Symbol.for("react.memo"), C = Symbol.for("react.lazy"), ae = Symbol.for("react.activity"), oe = Symbol.for("react.memo_cache_sentinel"), se = Symbol.iterator;
	function w(e) {
		return typeof e != "object" || !e ? null : (e = se && e[se] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var ce = Symbol.for("react.client.reference");
	function T(e) {
		if (e == null) return null;
		if (typeof e == "function") return e.$$typeof === ce ? null : e.displayName || e.name || null;
		if (typeof e == "string") return e;
		switch (e) {
			case y: return "Fragment";
			case x: return "Profiler";
			case b: return "StrictMode";
			case ne: return "Suspense";
			case re: return "SuspenseList";
			case ae: return "Activity";
		}
		if (typeof e == "object") switch (e.$$typeof) {
			case v: return "Portal";
			case te: return e.displayName || "Context";
			case ee: return (e._context.displayName || "Context") + ".Consumer";
			case S:
				var t = e.render;
				return e = e.displayName, e ||= (e = t.displayName || t.name || "", e === "" ? "ForwardRef" : "ForwardRef(" + e + ")"), e;
			case ie: return t = e.displayName || null, t === null ? T(e.type) || "Memo" : t;
			case C:
				t = e._payload, e = e._init;
				try {
					return T(e(t));
				} catch {}
		}
		return null;
	}
	var E = Array.isArray, D = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, O = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, k = {
		pending: !1,
		data: null,
		method: null,
		action: null
	}, le = [], ue = -1;
	function de(e) {
		return { current: e };
	}
	function A(e) {
		0 > ue || (e.current = le[ue], le[ue] = null, ue--);
	}
	function j(e, t) {
		ue++, le[ue] = e.current, e.current = t;
	}
	var fe = de(null), pe = de(null), me = de(null), he = de(null);
	function M(e, t) {
		switch (j(me, t), j(pe, e), j(fe, null), t.nodeType) {
			case 9:
			case 11:
				e = (e = t.documentElement) && (e = e.namespaceURI) ? Vd(e) : 0;
				break;
			default: if (e = t.tagName, t = t.namespaceURI) t = Vd(t), e = Hd(t, e);
			else switch (e) {
				case "svg":
					e = 1;
					break;
				case "math":
					e = 2;
					break;
				default: e = 0;
			}
		}
		A(fe), j(fe, e);
	}
	function ge() {
		A(fe), A(pe), A(me);
	}
	function _e(e) {
		e.memoizedState !== null && j(he, e);
		var t = fe.current, n = Hd(t, e.type);
		t !== n && (j(pe, e), j(fe, n));
	}
	function ve(e) {
		pe.current === e && (A(fe), A(pe)), he.current === e && (A(he), Qf._currentValue = k);
	}
	var ye, be;
	function xe(e) {
		if (ye === void 0) try {
			throw Error();
		} catch (e) {
			var t = e.stack.trim().match(/\n( *(at )?)/);
			ye = t && t[1] || "", be = -1 < e.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
		}
		return "\n" + ye + e + be;
	}
	var Se = !1;
	function Ce(e, t) {
		if (!e || Se) return "";
		Se = !0;
		var n = Error.prepareStackTrace;
		Error.prepareStackTrace = void 0;
		try {
			var r = { DetermineComponentFrameRoot: function() {
				try {
					if (t) {
						var n = function() {
							throw Error();
						};
						if (Object.defineProperty(n.prototype, "props", { set: function() {
							throw Error();
						} }), typeof Reflect == "object" && Reflect.construct) {
							try {
								Reflect.construct(n, []);
							} catch (e) {
								var r = e;
							}
							Reflect.construct(e, [], n);
						} else {
							try {
								n.call();
							} catch (e) {
								r = e;
							}
							e.call(n.prototype);
						}
					} else {
						try {
							throw Error();
						} catch (e) {
							r = e;
						}
						(n = e()) && typeof n.catch == "function" && n.catch(function() {});
					}
				} catch (e) {
					if (e && r && typeof e.stack == "string") return [e.stack, r.stack];
				}
				return [null, null];
			} };
			r.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
			var i = Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot, "name");
			i && i.configurable && Object.defineProperty(r.DetermineComponentFrameRoot, "name", { value: "DetermineComponentFrameRoot" });
			var a = r.DetermineComponentFrameRoot(), o = a[0], s = a[1];
			if (o && s) {
				var c = o.split("\n"), l = s.split("\n");
				for (i = r = 0; r < c.length && !c[r].includes("DetermineComponentFrameRoot");) r++;
				for (; i < l.length && !l[i].includes("DetermineComponentFrameRoot");) i++;
				if (r === c.length || i === l.length) for (r = c.length - 1, i = l.length - 1; 1 <= r && 0 <= i && c[r] !== l[i];) i--;
				for (; 1 <= r && 0 <= i; r--, i--) if (c[r] !== l[i]) {
					if (r !== 1 || i !== 1) do
						if (r--, i--, 0 > i || c[r] !== l[i]) {
							var u = "\n" + c[r].replace(" at new ", " at ");
							return e.displayName && u.includes("<anonymous>") && (u = u.replace("<anonymous>", e.displayName)), u;
						}
					while (1 <= r && 0 <= i);
					break;
				}
			}
		} finally {
			Se = !1, Error.prepareStackTrace = n;
		}
		return (n = e ? e.displayName || e.name : "") ? xe(n) : "";
	}
	function we(e, t) {
		switch (e.tag) {
			case 26:
			case 27:
			case 5: return xe(e.type);
			case 16: return xe("Lazy");
			case 13: return e.child !== t && t !== null ? xe("Suspense Fallback") : xe("Suspense");
			case 19: return xe("SuspenseList");
			case 0:
			case 15: return Ce(e.type, !1);
			case 11: return Ce(e.type.render, !1);
			case 1: return Ce(e.type, !0);
			case 31: return xe("Activity");
			default: return "";
		}
	}
	function Te(e) {
		try {
			var t = "", n = null;
			do
				t += we(e, n), n = e, e = e.return;
			while (e);
			return t;
		} catch (e) {
			return "\nError generating stack: " + e.message + "\n" + e.stack;
		}
	}
	var Ee = Object.prototype.hasOwnProperty, De = t.unstable_scheduleCallback, Oe = t.unstable_cancelCallback, ke = t.unstable_shouldYield, Ae = t.unstable_requestPaint, je = t.unstable_now, Me = t.unstable_getCurrentPriorityLevel, Ne = t.unstable_ImmediatePriority, Pe = t.unstable_UserBlockingPriority, Fe = t.unstable_NormalPriority, Ie = t.unstable_LowPriority, Le = t.unstable_IdlePriority, Re = t.log, ze = t.unstable_setDisableYieldValue, Be = null, Ve = null;
	function He(e) {
		if (typeof Re == "function" && ze(e), Ve && typeof Ve.setStrictMode == "function") try {
			Ve.setStrictMode(Be, e);
		} catch {}
	}
	var Ue = Math.clz32 ? Math.clz32 : Ke, We = Math.log, Ge = Math.LN2;
	function Ke(e) {
		return e >>>= 0, e === 0 ? 32 : 31 - (We(e) / Ge | 0) | 0;
	}
	var qe = 256, Je = 262144, Ye = 4194304;
	function Xe(e) {
		var t = e & 42;
		if (t !== 0) return t;
		switch (e & -e) {
			case 1: return 1;
			case 2: return 2;
			case 4: return 4;
			case 8: return 8;
			case 16: return 16;
			case 32: return 32;
			case 64: return 64;
			case 128: return 128;
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072: return e & 261888;
			case 262144:
			case 524288:
			case 1048576:
			case 2097152: return e & 3932160;
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432: return e & 62914560;
			case 67108864: return 67108864;
			case 134217728: return 134217728;
			case 268435456: return 268435456;
			case 536870912: return 536870912;
			case 1073741824: return 0;
			default: return e;
		}
	}
	function Ze(e, t, n) {
		var r = e.pendingLanes;
		if (r === 0) return 0;
		var i = 0, a = e.suspendedLanes, o = e.pingedLanes;
		e = e.warmLanes;
		var s = r & 134217727;
		return s === 0 ? (s = r & ~a, s === 0 ? o === 0 ? n || (n = r & ~e, n !== 0 && (i = Xe(n))) : i = Xe(o) : i = Xe(s)) : (r = s & ~a, r === 0 ? (o &= s, o === 0 ? n || (n = s & ~e, n !== 0 && (i = Xe(n))) : i = Xe(o)) : i = Xe(r)), i === 0 ? 0 : t !== 0 && t !== i && (t & a) === 0 && (a = i & -i, n = t & -t, a >= n || a === 32 && n & 4194048) ? t : i;
	}
	function Qe(e, t) {
		return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
	}
	function $e(e, t) {
		switch (e) {
			case 1:
			case 2:
			case 4:
			case 8:
			case 64: return t + 250;
			case 16:
			case 32:
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
			case 2097152: return t + 5e3;
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432: return -1;
			case 67108864:
			case 134217728:
			case 268435456:
			case 536870912:
			case 1073741824: return -1;
			default: return -1;
		}
	}
	function et() {
		var e = Ye;
		return Ye <<= 1, !(Ye & 62914560) && (Ye = 4194304), e;
	}
	function tt(e) {
		for (var t = [], n = 0; 31 > n; n++) t.push(e);
		return t;
	}
	function nt(e, t) {
		e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
	}
	function rt(e, t, n, r, i, a) {
		var o = e.pendingLanes;
		e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= n, e.entangledLanes &= n, e.errorRecoveryDisabledLanes &= n, e.shellSuspendCounter = 0;
		var s = e.entanglements, c = e.expirationTimes, l = e.hiddenUpdates;
		for (n = o & ~n; 0 < n;) {
			var u = 31 - Ue(n), d = 1 << u;
			s[u] = 0, c[u] = -1;
			var f = l[u];
			if (f !== null) for (l[u] = null, u = 0; u < f.length; u++) {
				var p = f[u];
				p !== null && (p.lane &= -536870913);
			}
			n &= ~d;
		}
		r !== 0 && it(e, r, 0), a !== 0 && i === 0 && e.tag !== 0 && (e.suspendedLanes |= a & ~(o & ~t));
	}
	function it(e, t, n) {
		e.pendingLanes |= t, e.suspendedLanes &= ~t;
		var r = 31 - Ue(t);
		e.entangledLanes |= t, e.entanglements[r] = e.entanglements[r] | 1073741824 | n & 261930;
	}
	function at(e, t) {
		var n = e.entangledLanes |= t;
		for (e = e.entanglements; n;) {
			var r = 31 - Ue(n), i = 1 << r;
			i & t | e[r] & t && (e[r] |= t), n &= ~i;
		}
	}
	function ot(e, t) {
		var n = t & -t;
		return n = n & 42 ? 1 : st(n), (n & (e.suspendedLanes | t)) === 0 ? n : 0;
	}
	function st(e) {
		switch (e) {
			case 2:
				e = 1;
				break;
			case 8:
				e = 4;
				break;
			case 32:
				e = 16;
				break;
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
				e = 128;
				break;
			case 268435456:
				e = 134217728;
				break;
			default: e = 0;
		}
		return e;
	}
	function ct(e) {
		return e &= -e, 2 < e ? 8 < e ? e & 134217727 ? 32 : 268435456 : 8 : 2;
	}
	function lt() {
		var e = O.p;
		return e === 0 ? (e = window.event, e === void 0 ? 32 : mp(e.type)) : e;
	}
	function ut(e, t) {
		var n = O.p;
		try {
			return O.p = e, t();
		} finally {
			O.p = n;
		}
	}
	var N = Math.random().toString(36).slice(2), dt = "__reactFiber$" + N, ft = "__reactProps$" + N, pt = "__reactContainer$" + N, mt = "__reactEvents$" + N, ht = "__reactListeners$" + N, gt = "__reactHandles$" + N, P = "__reactResources$" + N, _t = "__reactMarker$" + N;
	function vt(e) {
		delete e[dt], delete e[ft], delete e[mt], delete e[ht], delete e[gt];
	}
	function yt(e) {
		var t = e[dt];
		if (t) return t;
		for (var n = e.parentNode; n;) {
			if (t = n[pt] || n[dt]) {
				if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = df(e); e !== null;) {
					if (n = e[dt]) return n;
					e = df(e);
				}
				return t;
			}
			e = n, n = e.parentNode;
		}
		return null;
	}
	function bt(e) {
		if (e = e[dt] || e[pt]) {
			var t = e.tag;
			if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e;
		}
		return null;
	}
	function xt(e) {
		var t = e.tag;
		if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
		throw Error(i(33));
	}
	function St(e) {
		var t = e[P];
		return t ||= e[P] = {
			hoistableStyles: /* @__PURE__ */ new Map(),
			hoistableScripts: /* @__PURE__ */ new Map()
		}, t;
	}
	function Ct(e) {
		e[_t] = !0;
	}
	var wt = /* @__PURE__ */ new Set(), Tt = {};
	function F(e, t) {
		Et(e, t), Et(e + "Capture", t);
	}
	function Et(e, t) {
		for (Tt[e] = t, e = 0; e < t.length; e++) wt.add(t[e]);
	}
	var Dt = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), Ot = {}, kt = {};
	function At(e) {
		return Ee.call(kt, e) ? !0 : Ee.call(Ot, e) ? !1 : Dt.test(e) ? kt[e] = !0 : (Ot[e] = !0, !1);
	}
	function jt(e, t, n) {
		if (At(t)) if (n === null) e.removeAttribute(t);
		else {
			switch (typeof n) {
				case "undefined":
				case "function":
				case "symbol":
					e.removeAttribute(t);
					return;
				case "boolean":
					var r = t.toLowerCase().slice(0, 5);
					if (r !== "data-" && r !== "aria-") {
						e.removeAttribute(t);
						return;
					}
			}
			e.setAttribute(t, "" + n);
		}
	}
	function Mt(e, t, n) {
		if (n === null) e.removeAttribute(t);
		else {
			switch (typeof n) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean":
					e.removeAttribute(t);
					return;
			}
			e.setAttribute(t, "" + n);
		}
	}
	function Nt(e, t, n, r) {
		if (r === null) e.removeAttribute(n);
		else {
			switch (typeof r) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean":
					e.removeAttribute(n);
					return;
			}
			e.setAttributeNS(t, n, "" + r);
		}
	}
	function Pt(e) {
		switch (typeof e) {
			case "bigint":
			case "boolean":
			case "number":
			case "string":
			case "undefined": return e;
			case "object": return e;
			default: return "";
		}
	}
	function Ft(e) {
		var t = e.type;
		return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
	}
	function It(e, t, n) {
		var r = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
		if (!e.hasOwnProperty(t) && r !== void 0 && typeof r.get == "function" && typeof r.set == "function") {
			var i = r.get, a = r.set;
			return Object.defineProperty(e, t, {
				configurable: !0,
				get: function() {
					return i.call(this);
				},
				set: function(e) {
					n = "" + e, a.call(this, e);
				}
			}), Object.defineProperty(e, t, { enumerable: r.enumerable }), {
				getValue: function() {
					return n;
				},
				setValue: function(e) {
					n = "" + e;
				},
				stopTracking: function() {
					e._valueTracker = null, delete e[t];
				}
			};
		}
	}
	function Lt(e) {
		if (!e._valueTracker) {
			var t = Ft(e) ? "checked" : "value";
			e._valueTracker = It(e, t, "" + e[t]);
		}
	}
	function Rt(e) {
		if (!e) return !1;
		var t = e._valueTracker;
		if (!t) return !0;
		var n = t.getValue(), r = "";
		return e && (r = Ft(e) ? e.checked ? "true" : "false" : e.value), e = r, e === n ? !1 : (t.setValue(e), !0);
	}
	function zt(e) {
		if (e ||= typeof document < "u" ? document : void 0, e === void 0) return null;
		try {
			return e.activeElement || e.body;
		} catch {
			return e.body;
		}
	}
	var Bt = /[\n"\\]/g;
	function Vt(e) {
		return e.replace(Bt, function(e) {
			return "\\" + e.charCodeAt(0).toString(16) + " ";
		});
	}
	function Ht(e, t, n, r, i, a, o, s) {
		e.name = "", o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" ? e.type = o : e.removeAttribute("type"), t == null ? o !== "submit" && o !== "reset" || e.removeAttribute("value") : o === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + Pt(t)) : e.value !== "" + Pt(t) && (e.value = "" + Pt(t)), t == null ? n == null ? r != null && e.removeAttribute("value") : Wt(e, o, Pt(n)) : Wt(e, o, Pt(t)), i == null && a != null && (e.defaultChecked = !!a), i != null && (e.checked = i && typeof i != "function" && typeof i != "symbol"), s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" ? e.name = "" + Pt(s) : e.removeAttribute("name");
	}
	function Ut(e, t, n, r, i, a, o, s) {
		if (a != null && typeof a != "function" && typeof a != "symbol" && typeof a != "boolean" && (e.type = a), t != null || n != null) {
			if (!(a !== "submit" && a !== "reset" || t != null)) {
				Lt(e);
				return;
			}
			n = n == null ? "" : "" + Pt(n), t = t == null ? n : "" + Pt(t), s || t === e.value || (e.value = t), e.defaultValue = t;
		}
		r ??= i, r = typeof r != "function" && typeof r != "symbol" && !!r, e.checked = s ? e.checked : !!r, e.defaultChecked = !!r, o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" && (e.name = o), Lt(e);
	}
	function Wt(e, t, n) {
		t === "number" && zt(e.ownerDocument) === e || e.defaultValue === "" + n || (e.defaultValue = "" + n);
	}
	function Gt(e, t, n, r) {
		if (e = e.options, t) {
			t = {};
			for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
			for (n = 0; n < e.length; n++) i = t.hasOwnProperty("$" + e[n].value), e[n].selected !== i && (e[n].selected = i), i && r && (e[n].defaultSelected = !0);
		} else {
			for (n = "" + Pt(n), t = null, i = 0; i < e.length; i++) {
				if (e[i].value === n) {
					e[i].selected = !0, r && (e[i].defaultSelected = !0);
					return;
				}
				t !== null || e[i].disabled || (t = e[i]);
			}
			t !== null && (t.selected = !0);
		}
	}
	function Kt(e, t, n) {
		if (t != null && (t = "" + Pt(t), t !== e.value && (e.value = t), n == null)) {
			e.defaultValue !== t && (e.defaultValue = t);
			return;
		}
		e.defaultValue = n == null ? "" : "" + Pt(n);
	}
	function qt(e, t, n, r) {
		if (t == null) {
			if (r != null) {
				if (n != null) throw Error(i(92));
				if (E(r)) {
					if (1 < r.length) throw Error(i(93));
					r = r[0];
				}
				n = r;
			}
			n ??= "", t = n;
		}
		n = Pt(t), e.defaultValue = n, r = e.textContent, r === n && r !== "" && r !== null && (e.value = r), Lt(e);
	}
	function Jt(e, t) {
		if (t) {
			var n = e.firstChild;
			if (n && n === e.lastChild && n.nodeType === 3) {
				n.nodeValue = t;
				return;
			}
		}
		e.textContent = t;
	}
	var Yt = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));
	function Xt(e, t, n) {
		var r = t.indexOf("--") === 0;
		n == null || typeof n == "boolean" || n === "" ? r ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : r ? e.setProperty(t, n) : typeof n != "number" || n === 0 || Yt.has(t) ? t === "float" ? e.cssFloat = n : e[t] = ("" + n).trim() : e[t] = n + "px";
	}
	function Zt(e, t, n) {
		if (t != null && typeof t != "object") throw Error(i(62));
		if (e = e.style, n != null) {
			for (var r in n) !n.hasOwnProperty(r) || t != null && t.hasOwnProperty(r) || (r.indexOf("--") === 0 ? e.setProperty(r, "") : r === "float" ? e.cssFloat = "" : e[r] = "");
			for (var a in t) r = t[a], t.hasOwnProperty(a) && n[a] !== r && Xt(e, a, r);
		} else for (var o in t) t.hasOwnProperty(o) && Xt(e, o, t[o]);
	}
	function Qt(e) {
		if (e.indexOf("-") === -1) return !1;
		switch (e) {
			case "annotation-xml":
			case "color-profile":
			case "font-face":
			case "font-face-src":
			case "font-face-uri":
			case "font-face-format":
			case "font-face-name":
			case "missing-glyph": return !1;
			default: return !0;
		}
	}
	var $t = new Map([
		["acceptCharset", "accept-charset"],
		["htmlFor", "for"],
		["httpEquiv", "http-equiv"],
		["crossOrigin", "crossorigin"],
		["accentHeight", "accent-height"],
		["alignmentBaseline", "alignment-baseline"],
		["arabicForm", "arabic-form"],
		["baselineShift", "baseline-shift"],
		["capHeight", "cap-height"],
		["clipPath", "clip-path"],
		["clipRule", "clip-rule"],
		["colorInterpolation", "color-interpolation"],
		["colorInterpolationFilters", "color-interpolation-filters"],
		["colorProfile", "color-profile"],
		["colorRendering", "color-rendering"],
		["dominantBaseline", "dominant-baseline"],
		["enableBackground", "enable-background"],
		["fillOpacity", "fill-opacity"],
		["fillRule", "fill-rule"],
		["floodColor", "flood-color"],
		["floodOpacity", "flood-opacity"],
		["fontFamily", "font-family"],
		["fontSize", "font-size"],
		["fontSizeAdjust", "font-size-adjust"],
		["fontStretch", "font-stretch"],
		["fontStyle", "font-style"],
		["fontVariant", "font-variant"],
		["fontWeight", "font-weight"],
		["glyphName", "glyph-name"],
		["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
		["glyphOrientationVertical", "glyph-orientation-vertical"],
		["horizAdvX", "horiz-adv-x"],
		["horizOriginX", "horiz-origin-x"],
		["imageRendering", "image-rendering"],
		["letterSpacing", "letter-spacing"],
		["lightingColor", "lighting-color"],
		["markerEnd", "marker-end"],
		["markerMid", "marker-mid"],
		["markerStart", "marker-start"],
		["overlinePosition", "overline-position"],
		["overlineThickness", "overline-thickness"],
		["paintOrder", "paint-order"],
		["panose-1", "panose-1"],
		["pointerEvents", "pointer-events"],
		["renderingIntent", "rendering-intent"],
		["shapeRendering", "shape-rendering"],
		["stopColor", "stop-color"],
		["stopOpacity", "stop-opacity"],
		["strikethroughPosition", "strikethrough-position"],
		["strikethroughThickness", "strikethrough-thickness"],
		["strokeDasharray", "stroke-dasharray"],
		["strokeDashoffset", "stroke-dashoffset"],
		["strokeLinecap", "stroke-linecap"],
		["strokeLinejoin", "stroke-linejoin"],
		["strokeMiterlimit", "stroke-miterlimit"],
		["strokeOpacity", "stroke-opacity"],
		["strokeWidth", "stroke-width"],
		["textAnchor", "text-anchor"],
		["textDecoration", "text-decoration"],
		["textRendering", "text-rendering"],
		["transformOrigin", "transform-origin"],
		["underlinePosition", "underline-position"],
		["underlineThickness", "underline-thickness"],
		["unicodeBidi", "unicode-bidi"],
		["unicodeRange", "unicode-range"],
		["unitsPerEm", "units-per-em"],
		["vAlphabetic", "v-alphabetic"],
		["vHanging", "v-hanging"],
		["vIdeographic", "v-ideographic"],
		["vMathematical", "v-mathematical"],
		["vectorEffect", "vector-effect"],
		["vertAdvY", "vert-adv-y"],
		["vertOriginX", "vert-origin-x"],
		["vertOriginY", "vert-origin-y"],
		["wordSpacing", "word-spacing"],
		["writingMode", "writing-mode"],
		["xmlnsXlink", "xmlns:xlink"],
		["xHeight", "x-height"]
	]), en = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
	function tn(e) {
		return en.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
	}
	function nn() {}
	var rn = null;
	function an(e) {
		return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
	}
	var on = null, sn = null;
	function cn(e) {
		var t = bt(e);
		if (t && (e = t.stateNode)) {
			var n = e[ft] || null;
			a: switch (e = t.stateNode, t.type) {
				case "input":
					if (Ht(e, n.value, n.defaultValue, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name), t = n.name, n.type === "radio" && t != null) {
						for (n = e; n.parentNode;) n = n.parentNode;
						for (n = n.querySelectorAll("input[name=\"" + Vt("" + t) + "\"][type=\"radio\"]"), t = 0; t < n.length; t++) {
							var r = n[t];
							if (r !== e && r.form === e.form) {
								var a = r[ft] || null;
								if (!a) throw Error(i(90));
								Ht(r, a.value, a.defaultValue, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name);
							}
						}
						for (t = 0; t < n.length; t++) r = n[t], r.form === e.form && Rt(r);
					}
					break a;
				case "textarea":
					Kt(e, n.value, n.defaultValue);
					break a;
				case "select": t = n.value, t != null && Gt(e, !!n.multiple, t, !1);
			}
		}
	}
	var ln = !1;
	function un(e, t, n) {
		if (ln) return e(t, n);
		ln = !0;
		try {
			return e(t);
		} finally {
			if (ln = !1, (on !== null || sn !== null) && (bu(), on && (t = on, e = sn, sn = on = null, cn(t), e))) for (t = 0; t < e.length; t++) cn(e[t]);
		}
	}
	function dn(e, t) {
		var n = e.stateNode;
		if (n === null) return null;
		var r = n[ft] || null;
		if (r === null) return null;
		n = r[t];
		a: switch (t) {
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
				(r = !r.disabled) || (e = e.type, r = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !r;
				break a;
			default: e = !1;
		}
		if (e) return null;
		if (n && typeof n != "function") throw Error(i(231, t, typeof n));
		return n;
	}
	var fn = !(typeof window > "u" || window.document === void 0 || window.document.createElement === void 0), pn = !1;
	if (fn) try {
		var mn = {};
		Object.defineProperty(mn, "passive", { get: function() {
			pn = !0;
		} }), window.addEventListener("test", mn, mn), window.removeEventListener("test", mn, mn);
	} catch {
		pn = !1;
	}
	var hn = null, gn = null, _n = null;
	function vn() {
		if (_n) return _n;
		var e, t = gn, n = t.length, r, i = "value" in hn ? hn.value : hn.textContent, a = i.length;
		for (e = 0; e < n && t[e] === i[e]; e++);
		var o = n - e;
		for (r = 1; r <= o && t[n - r] === i[a - r]; r++);
		return _n = i.slice(e, 1 < r ? 1 - r : void 0);
	}
	function yn(e) {
		var t = e.keyCode;
		return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
	}
	function bn() {
		return !0;
	}
	function xn() {
		return !1;
	}
	function Sn(e) {
		function t(t, n, r, i, a) {
			for (var o in this._reactName = t, this._targetInst = r, this.type = n, this.nativeEvent = i, this.target = a, this.currentTarget = null, e) e.hasOwnProperty(o) && (t = e[o], this[o] = t ? t(i) : i[o]);
			return this.isDefaultPrevented = (i.defaultPrevented == null ? !1 === i.returnValue : i.defaultPrevented) ? bn : xn, this.isPropagationStopped = xn, this;
		}
		return h(t.prototype, {
			preventDefault: function() {
				this.defaultPrevented = !0;
				var e = this.nativeEvent;
				e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = bn);
			},
			stopPropagation: function() {
				var e = this.nativeEvent;
				e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = bn);
			},
			persist: function() {},
			isPersistent: bn
		}), t;
	}
	var Cn = {
		eventPhase: 0,
		bubbles: 0,
		cancelable: 0,
		timeStamp: function(e) {
			return e.timeStamp || Date.now();
		},
		defaultPrevented: 0,
		isTrusted: 0
	}, wn = Sn(Cn), Tn = h({}, Cn, {
		view: 0,
		detail: 0
	}), En = Sn(Tn), Dn, On, kn, An = h({}, Tn, {
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
		getModifierState: Vn,
		button: 0,
		buttons: 0,
		relatedTarget: function(e) {
			return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
		},
		movementX: function(e) {
			return "movementX" in e ? e.movementX : (e !== kn && (kn && e.type === "mousemove" ? (Dn = e.screenX - kn.screenX, On = e.screenY - kn.screenY) : On = Dn = 0, kn = e), Dn);
		},
		movementY: function(e) {
			return "movementY" in e ? e.movementY : On;
		}
	}), jn = Sn(An), Mn = Sn(h({}, An, { dataTransfer: 0 })), Nn = Sn(h({}, Tn, { relatedTarget: 0 })), Pn = Sn(h({}, Cn, {
		animationName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), Fn = Sn(h({}, Cn, { clipboardData: function(e) {
		return "clipboardData" in e ? e.clipboardData : window.clipboardData;
	} })), In = Sn(h({}, Cn, { data: 0 })), Ln = {
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
		MozPrintableKey: "Unidentified"
	}, Rn = {
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
		224: "Meta"
	}, zn = {
		Alt: "altKey",
		Control: "ctrlKey",
		Meta: "metaKey",
		Shift: "shiftKey"
	};
	function Bn(e) {
		var t = this.nativeEvent;
		return t.getModifierState ? t.getModifierState(e) : (e = zn[e]) ? !!t[e] : !1;
	}
	function Vn() {
		return Bn;
	}
	var Hn = Sn(h({}, Tn, {
		key: function(e) {
			if (e.key) {
				var t = Ln[e.key] || e.key;
				if (t !== "Unidentified") return t;
			}
			return e.type === "keypress" ? (e = yn(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Rn[e.keyCode] || "Unidentified" : "";
		},
		code: 0,
		location: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		repeat: 0,
		locale: 0,
		getModifierState: Vn,
		charCode: function(e) {
			return e.type === "keypress" ? yn(e) : 0;
		},
		keyCode: function(e) {
			return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		},
		which: function(e) {
			return e.type === "keypress" ? yn(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		}
	})), Un = Sn(h({}, An, {
		pointerId: 0,
		width: 0,
		height: 0,
		pressure: 0,
		tangentialPressure: 0,
		tiltX: 0,
		tiltY: 0,
		twist: 0,
		pointerType: 0,
		isPrimary: 0
	})), Wn = Sn(h({}, Tn, {
		touches: 0,
		targetTouches: 0,
		changedTouches: 0,
		altKey: 0,
		metaKey: 0,
		ctrlKey: 0,
		shiftKey: 0,
		getModifierState: Vn
	})), Gn = Sn(h({}, Cn, {
		propertyName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), Kn = Sn(h({}, An, {
		deltaX: function(e) {
			return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
		},
		deltaY: function(e) {
			return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
		},
		deltaZ: 0,
		deltaMode: 0
	})), qn = Sn(h({}, Cn, {
		newState: 0,
		oldState: 0
	})), Jn = [
		9,
		13,
		27,
		32
	], Yn = fn && "CompositionEvent" in window, Xn = null;
	fn && "documentMode" in document && (Xn = document.documentMode);
	var Zn = fn && "TextEvent" in window && !Xn, Qn = fn && (!Yn || Xn && 8 < Xn && 11 >= Xn), $n = " ", er = !1;
	function tr(e, t) {
		switch (e) {
			case "keyup": return Jn.indexOf(t.keyCode) !== -1;
			case "keydown": return t.keyCode !== 229;
			case "keypress":
			case "mousedown":
			case "focusout": return !0;
			default: return !1;
		}
	}
	function nr(e) {
		return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
	}
	var rr = !1;
	function ir(e, t) {
		switch (e) {
			case "compositionend": return nr(t);
			case "keypress": return t.which === 32 ? (er = !0, $n) : null;
			case "textInput": return e = t.data, e === $n && er ? null : e;
			default: return null;
		}
	}
	function ar(e, t) {
		if (rr) return e === "compositionend" || !Yn && tr(e, t) ? (e = vn(), _n = gn = hn = null, rr = !1, e) : null;
		switch (e) {
			case "paste": return null;
			case "keypress":
				if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
					if (t.char && 1 < t.char.length) return t.char;
					if (t.which) return String.fromCharCode(t.which);
				}
				return null;
			case "compositionend": return Qn && t.locale !== "ko" ? null : t.data;
			default: return null;
		}
	}
	var or = {
		color: !0,
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
		week: !0
	};
	function sr(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t === "input" ? !!or[e.type] : t === "textarea";
	}
	function cr(e, t, n, r) {
		on ? sn ? sn.push(r) : sn = [r] : on = r, t = Ed(t, "onChange"), 0 < t.length && (n = new wn("onChange", "change", null, n, r), e.push({
			event: n,
			listeners: t
		}));
	}
	var lr = null, ur = null;
	function dr(e) {
		yd(e, 0);
	}
	function fr(e) {
		if (Rt(xt(e))) return e;
	}
	function pr(e, t) {
		if (e === "change") return t;
	}
	var mr = !1;
	if (fn) {
		var hr;
		if (fn) {
			var gr = "oninput" in document;
			if (!gr) {
				var _r = document.createElement("div");
				_r.setAttribute("oninput", "return;"), gr = typeof _r.oninput == "function";
			}
			hr = gr;
		} else hr = !1;
		mr = hr && (!document.documentMode || 9 < document.documentMode);
	}
	function vr() {
		lr && (lr.detachEvent("onpropertychange", yr), ur = lr = null);
	}
	function yr(e) {
		if (e.propertyName === "value" && fr(ur)) {
			var t = [];
			cr(t, ur, e, an(e)), un(dr, t);
		}
	}
	function br(e, t, n) {
		e === "focusin" ? (vr(), lr = t, ur = n, lr.attachEvent("onpropertychange", yr)) : e === "focusout" && vr();
	}
	function xr(e) {
		if (e === "selectionchange" || e === "keyup" || e === "keydown") return fr(ur);
	}
	function Sr(e, t) {
		if (e === "click") return fr(t);
	}
	function Cr(e, t) {
		if (e === "input" || e === "change") return fr(t);
	}
	function wr(e, t) {
		return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t;
	}
	var Tr = typeof Object.is == "function" ? Object.is : wr;
	function Er(e, t) {
		if (Tr(e, t)) return !0;
		if (typeof e != "object" || !e || typeof t != "object" || !t) return !1;
		var n = Object.keys(e), r = Object.keys(t);
		if (n.length !== r.length) return !1;
		for (r = 0; r < n.length; r++) {
			var i = n[r];
			if (!Ee.call(t, i) || !Tr(e[i], t[i])) return !1;
		}
		return !0;
	}
	function Dr(e) {
		for (; e && e.firstChild;) e = e.firstChild;
		return e;
	}
	function Or(e, t) {
		var n = Dr(e);
		e = 0;
		for (var r; n;) {
			if (n.nodeType === 3) {
				if (r = e + n.textContent.length, e <= t && r >= t) return {
					node: n,
					offset: t - e
				};
				e = r;
			}
			a: {
				for (; n;) {
					if (n.nextSibling) {
						n = n.nextSibling;
						break a;
					}
					n = n.parentNode;
				}
				n = void 0;
			}
			n = Dr(n);
		}
	}
	function kr(e, t) {
		return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? kr(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
	}
	function Ar(e) {
		e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
		for (var t = zt(e.document); t instanceof e.HTMLIFrameElement;) {
			try {
				var n = typeof t.contentWindow.location.href == "string";
			} catch {
				n = !1;
			}
			if (n) e = t.contentWindow;
			else break;
			t = zt(e.document);
		}
		return t;
	}
	function jr(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
	}
	var Mr = fn && "documentMode" in document && 11 >= document.documentMode, Nr = null, Pr = null, Fr = null, Ir = !1;
	function Lr(e, t, n) {
		var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
		Ir || Nr == null || Nr !== zt(r) || (r = Nr, "selectionStart" in r && jr(r) ? r = {
			start: r.selectionStart,
			end: r.selectionEnd
		} : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
			anchorNode: r.anchorNode,
			anchorOffset: r.anchorOffset,
			focusNode: r.focusNode,
			focusOffset: r.focusOffset
		}), Fr && Er(Fr, r) || (Fr = r, r = Ed(Pr, "onSelect"), 0 < r.length && (t = new wn("onSelect", "select", null, t, n), e.push({
			event: t,
			listeners: r
		}), t.target = Nr)));
	}
	function Rr(e, t) {
		var n = {};
		return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
	}
	var zr = {
		animationend: Rr("Animation", "AnimationEnd"),
		animationiteration: Rr("Animation", "AnimationIteration"),
		animationstart: Rr("Animation", "AnimationStart"),
		transitionrun: Rr("Transition", "TransitionRun"),
		transitionstart: Rr("Transition", "TransitionStart"),
		transitioncancel: Rr("Transition", "TransitionCancel"),
		transitionend: Rr("Transition", "TransitionEnd")
	}, Br = {}, Vr = {};
	fn && (Vr = document.createElement("div").style, "AnimationEvent" in window || (delete zr.animationend.animation, delete zr.animationiteration.animation, delete zr.animationstart.animation), "TransitionEvent" in window || delete zr.transitionend.transition);
	function Hr(e) {
		if (Br[e]) return Br[e];
		if (!zr[e]) return e;
		var t = zr[e], n;
		for (n in t) if (t.hasOwnProperty(n) && n in Vr) return Br[e] = t[n];
		return e;
	}
	var Ur = Hr("animationend"), Wr = Hr("animationiteration"), Gr = Hr("animationstart"), Kr = Hr("transitionrun"), qr = Hr("transitionstart"), Jr = Hr("transitioncancel"), Yr = Hr("transitionend"), Xr = /* @__PURE__ */ new Map(), Zr = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
	Zr.push("scrollEnd");
	function Qr(e, t) {
		Xr.set(e, t), F(t, [e]);
	}
	var $r = typeof reportError == "function" ? reportError : function(e) {
		if (typeof window == "object" && typeof window.ErrorEvent == "function") {
			var t = new window.ErrorEvent("error", {
				bubbles: !0,
				cancelable: !0,
				message: typeof e == "object" && e && typeof e.message == "string" ? String(e.message) : String(e),
				error: e
			});
			if (!window.dispatchEvent(t)) return;
		} else if (typeof process == "object" && typeof process.emit == "function") {
			process.emit("uncaughtException", e);
			return;
		}
		console.error(e);
	}, ei = [], ti = 0, ni = 0;
	function ri() {
		for (var e = ti, t = ni = ti = 0; t < e;) {
			var n = ei[t];
			ei[t++] = null;
			var r = ei[t];
			ei[t++] = null;
			var i = ei[t];
			ei[t++] = null;
			var a = ei[t];
			if (ei[t++] = null, r !== null && i !== null) {
				var o = r.pending;
				o === null ? i.next = i : (i.next = o.next, o.next = i), r.pending = i;
			}
			a !== 0 && si(n, i, a);
		}
	}
	function ii(e, t, n, r) {
		ei[ti++] = e, ei[ti++] = t, ei[ti++] = n, ei[ti++] = r, ni |= r, e.lanes |= r, e = e.alternate, e !== null && (e.lanes |= r);
	}
	function ai(e, t, n, r) {
		return ii(e, t, n, r), ci(e);
	}
	function oi(e, t) {
		return ii(e, null, null, t), ci(e);
	}
	function si(e, t, n) {
		e.lanes |= n;
		var r = e.alternate;
		r !== null && (r.lanes |= n);
		for (var i = !1, a = e.return; a !== null;) a.childLanes |= n, r = a.alternate, r !== null && (r.childLanes |= n), a.tag === 22 && (e = a.stateNode, e === null || e._visibility & 1 || (i = !0)), e = a, a = a.return;
		return e.tag === 3 ? (a = e.stateNode, i && t !== null && (i = 31 - Ue(n), e = a.hiddenUpdates, r = e[i], r === null ? e[i] = [t] : r.push(t), t.lane = n | 536870912), a) : null;
	}
	function ci(e) {
		if (50 < du) throw du = 0, fu = null, Error(i(185));
		for (var t = e.return; t !== null;) e = t, t = e.return;
		return e.tag === 3 ? e.stateNode : null;
	}
	var li = {};
	function ui(e, t, n, r) {
		this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
	}
	function di(e, t, n, r) {
		return new ui(e, t, n, r);
	}
	function fi(e) {
		return e = e.prototype, !(!e || !e.isReactComponent);
	}
	function pi(e, t) {
		var n = e.alternate;
		return n === null ? (n = di(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 65011712, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.refCleanup = e.refCleanup, n;
	}
	function mi(e, t) {
		e.flags &= 65011714;
		var n = e.alternate;
		return n === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type, t = n.dependencies, e.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}), e;
	}
	function hi(e, t, n, r, a, o) {
		var s = 0;
		if (r = e, typeof e == "function") fi(e) && (s = 1);
		else if (typeof e == "string") s = Uf(e, n, fe.current) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
		else a: switch (e) {
			case ae: return e = di(31, n, t, a), e.elementType = ae, e.lanes = o, e;
			case y: return gi(n.children, a, o, t);
			case b:
				s = 8, a |= 24;
				break;
			case x: return e = di(12, n, t, a | 2), e.elementType = x, e.lanes = o, e;
			case ne: return e = di(13, n, t, a), e.elementType = ne, e.lanes = o, e;
			case re: return e = di(19, n, t, a), e.elementType = re, e.lanes = o, e;
			default:
				if (typeof e == "object" && e) switch (e.$$typeof) {
					case te:
						s = 10;
						break a;
					case ee:
						s = 9;
						break a;
					case S:
						s = 11;
						break a;
					case ie:
						s = 14;
						break a;
					case C:
						s = 16, r = null;
						break a;
				}
				s = 29, n = Error(i(130, e === null ? "null" : typeof e, "")), r = null;
		}
		return t = di(s, n, t, a), t.elementType = e, t.type = r, t.lanes = o, t;
	}
	function gi(e, t, n, r) {
		return e = di(7, e, r, t), e.lanes = n, e;
	}
	function _i(e, t, n) {
		return e = di(6, e, null, t), e.lanes = n, e;
	}
	function vi(e) {
		var t = di(18, null, null, 0);
		return t.stateNode = e, t;
	}
	function yi(e, t, n) {
		return t = di(4, e.children === null ? [] : e.children, e.key, t), t.lanes = n, t.stateNode = {
			containerInfo: e.containerInfo,
			pendingChildren: null,
			implementation: e.implementation
		}, t;
	}
	var bi = /* @__PURE__ */ new WeakMap();
	function xi(e, t) {
		if (typeof e == "object" && e) {
			var n = bi.get(e);
			return n === void 0 ? (t = {
				value: e,
				source: t,
				stack: Te(t)
			}, bi.set(e, t), t) : n;
		}
		return {
			value: e,
			source: t,
			stack: Te(t)
		};
	}
	var Si = [], Ci = 0, wi = null, Ti = 0, Ei = [], Di = 0, Oi = null, ki = 1, Ai = "";
	function ji(e, t) {
		Si[Ci++] = Ti, Si[Ci++] = wi, wi = e, Ti = t;
	}
	function Mi(e, t, n) {
		Ei[Di++] = ki, Ei[Di++] = Ai, Ei[Di++] = Oi, Oi = e;
		var r = ki;
		e = Ai;
		var i = 32 - Ue(r) - 1;
		r &= ~(1 << i), n += 1;
		var a = 32 - Ue(t) + i;
		if (30 < a) {
			var o = i - i % 5;
			a = (r & (1 << o) - 1).toString(32), r >>= o, i -= o, ki = 1 << 32 - Ue(t) + i | n << i | r, Ai = a + e;
		} else ki = 1 << a | n << i | r, Ai = e;
	}
	function Ni(e) {
		e.return !== null && (ji(e, 1), Mi(e, 1, 0));
	}
	function Pi(e) {
		for (; e === wi;) wi = Si[--Ci], Si[Ci] = null, Ti = Si[--Ci], Si[Ci] = null;
		for (; e === Oi;) Oi = Ei[--Di], Ei[Di] = null, Ai = Ei[--Di], Ei[Di] = null, ki = Ei[--Di], Ei[Di] = null;
	}
	function Fi(e, t) {
		Ei[Di++] = ki, Ei[Di++] = Ai, Ei[Di++] = Oi, ki = t.id, Ai = t.overflow, Oi = e;
	}
	var Ii = null, I = null, L = !1, Li = null, Ri = !1, zi = Error(i(519));
	function Bi(e) {
		throw Ki(xi(Error(i(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", "")), e)), zi;
	}
	function Vi(e) {
		var t = e.stateNode, n = e.type, r = e.memoizedProps;
		switch (t[dt] = e, t[ft] = r, n) {
			case "dialog":
				Q("cancel", t), Q("close", t);
				break;
			case "iframe":
			case "object":
			case "embed":
				Q("load", t);
				break;
			case "video":
			case "audio":
				for (n = 0; n < _d.length; n++) Q(_d[n], t);
				break;
			case "source":
				Q("error", t);
				break;
			case "img":
			case "image":
			case "link":
				Q("error", t), Q("load", t);
				break;
			case "details":
				Q("toggle", t);
				break;
			case "input":
				Q("invalid", t), Ut(t, r.value, r.defaultValue, r.checked, r.defaultChecked, r.type, r.name, !0);
				break;
			case "select":
				Q("invalid", t);
				break;
			case "textarea": Q("invalid", t), qt(t, r.value, r.defaultValue, r.children);
		}
		n = r.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || !0 === r.suppressHydrationWarning || Md(t.textContent, n) ? (r.popover != null && (Q("beforetoggle", t), Q("toggle", t)), r.onScroll != null && Q("scroll", t), r.onScrollEnd != null && Q("scrollend", t), r.onClick != null && (t.onclick = nn), t = !0) : t = !1, t || Bi(e, !0);
	}
	function Hi(e) {
		for (Ii = e.return; Ii;) switch (Ii.tag) {
			case 5:
			case 31:
			case 13:
				Ri = !1;
				return;
			case 27:
			case 3:
				Ri = !0;
				return;
			default: Ii = Ii.return;
		}
	}
	function Ui(e) {
		if (e !== Ii) return !1;
		if (!L) return Hi(e), L = !0, !1;
		var t = e.tag, n;
		if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type, n = !(n !== "form" && n !== "button") || Ud(e.type, e.memoizedProps)), n = !n), n && I && Bi(e), Hi(e), t === 13) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
			I = uf(e);
		} else if (t === 31) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
			I = uf(e);
		} else t === 27 ? (t = I, Zd(e.type) ? (e = lf, lf = null, I = e) : I = t) : I = Ii ? cf(e.stateNode.nextSibling) : null;
		return !0;
	}
	function Wi() {
		I = Ii = null, L = !1;
	}
	function Gi() {
		var e = Li;
		return e !== null && (Zl === null ? Zl = e : Zl.push.apply(Zl, e), Li = null), e;
	}
	function Ki(e) {
		Li === null ? Li = [e] : Li.push(e);
	}
	var qi = de(null), Ji = null, Yi = null;
	function Xi(e, t, n) {
		j(qi, t._currentValue), t._currentValue = n;
	}
	function Zi(e) {
		e._currentValue = qi.current, A(qi);
	}
	function Qi(e, t, n) {
		for (; e !== null;) {
			var r = e.alternate;
			if ((e.childLanes & t) === t ? r !== null && (r.childLanes & t) !== t && (r.childLanes |= t) : (e.childLanes |= t, r !== null && (r.childLanes |= t)), e === n) break;
			e = e.return;
		}
	}
	function $i(e, t, n, r) {
		var a = e.child;
		for (a !== null && (a.return = e); a !== null;) {
			var o = a.dependencies;
			if (o !== null) {
				var s = a.child;
				o = o.firstContext;
				a: for (; o !== null;) {
					var c = o;
					o = a;
					for (var l = 0; l < t.length; l++) if (c.context === t[l]) {
						o.lanes |= n, c = o.alternate, c !== null && (c.lanes |= n), Qi(o.return, n, e), r || (s = null);
						break a;
					}
					o = c.next;
				}
			} else if (a.tag === 18) {
				if (s = a.return, s === null) throw Error(i(341));
				s.lanes |= n, o = s.alternate, o !== null && (o.lanes |= n), Qi(s, n, e), s = null;
			} else s = a.child;
			if (s !== null) s.return = a;
			else for (s = a; s !== null;) {
				if (s === e) {
					s = null;
					break;
				}
				if (a = s.sibling, a !== null) {
					a.return = s.return, s = a;
					break;
				}
				s = s.return;
			}
			a = s;
		}
	}
	function ea(e, t, n, r) {
		e = null;
		for (var a = t, o = !1; a !== null;) {
			if (!o) {
				if (a.flags & 524288) o = !0;
				else if (a.flags & 262144) break;
			}
			if (a.tag === 10) {
				var s = a.alternate;
				if (s === null) throw Error(i(387));
				if (s = s.memoizedProps, s !== null) {
					var c = a.type;
					Tr(a.pendingProps.value, s.value) || (e === null ? e = [c] : e.push(c));
				}
			} else if (a === he.current) {
				if (s = a.alternate, s === null) throw Error(i(387));
				s.memoizedState.memoizedState !== a.memoizedState.memoizedState && (e === null ? e = [Qf] : e.push(Qf));
			}
			a = a.return;
		}
		e !== null && $i(t, e, n, r), t.flags |= 262144;
	}
	function ta(e) {
		for (e = e.firstContext; e !== null;) {
			if (!Tr(e.context._currentValue, e.memoizedValue)) return !0;
			e = e.next;
		}
		return !1;
	}
	function na(e) {
		Ji = e, Yi = null, e = e.dependencies, e !== null && (e.firstContext = null);
	}
	function R(e) {
		return ia(Ji, e);
	}
	function ra(e, t) {
		return Ji === null && na(e), ia(e, t);
	}
	function ia(e, t) {
		var n = t._currentValue;
		if (t = {
			context: t,
			memoizedValue: n,
			next: null
		}, Yi === null) {
			if (e === null) throw Error(i(308));
			Yi = t, e.dependencies = {
				lanes: 0,
				firstContext: t
			}, e.flags |= 524288;
		} else Yi = Yi.next = t;
		return n;
	}
	var aa = typeof AbortController < "u" ? AbortController : function() {
		var e = [], t = this.signal = {
			aborted: !1,
			addEventListener: function(t, n) {
				e.push(n);
			}
		};
		this.abort = function() {
			t.aborted = !0, e.forEach(function(e) {
				return e();
			});
		};
	}, oa = t.unstable_scheduleCallback, sa = t.unstable_NormalPriority, ca = {
		$$typeof: te,
		Consumer: null,
		Provider: null,
		_currentValue: null,
		_currentValue2: null,
		_threadCount: 0
	};
	function la() {
		return {
			controller: new aa(),
			data: /* @__PURE__ */ new Map(),
			refCount: 0
		};
	}
	function ua(e) {
		e.refCount--, e.refCount === 0 && oa(sa, function() {
			e.controller.abort();
		});
	}
	var da = null, fa = 0, pa = 0, ma = null;
	function ha(e, t) {
		if (da === null) {
			var n = da = [];
			fa = 0, pa = dd(), ma = {
				status: "pending",
				value: void 0,
				then: function(e) {
					n.push(e);
				}
			};
		}
		return fa++, t.then(ga, ga), t;
	}
	function ga() {
		if (--fa === 0 && da !== null) {
			ma !== null && (ma.status = "fulfilled");
			var e = da;
			da = null, pa = 0, ma = null;
			for (var t = 0; t < e.length; t++) (0, e[t])();
		}
	}
	function _a(e, t) {
		var n = [], r = {
			status: "pending",
			value: null,
			reason: null,
			then: function(e) {
				n.push(e);
			}
		};
		return e.then(function() {
			r.status = "fulfilled", r.value = t;
			for (var e = 0; e < n.length; e++) (0, n[e])(t);
		}, function(e) {
			for (r.status = "rejected", r.reason = e, e = 0; e < n.length; e++) (0, n[e])(void 0);
		}), r;
	}
	var va = D.S;
	D.S = function(e, t) {
		eu = je(), typeof t == "object" && t && typeof t.then == "function" && ha(e, t), va !== null && va(e, t);
	};
	var ya = de(null);
	function ba() {
		var e = ya.current;
		return e === null ? q.pooledCache : e;
	}
	function xa(e, t) {
		t === null ? j(ya, ya.current) : j(ya, t.pool);
	}
	function Sa() {
		var e = ba();
		return e === null ? null : {
			parent: ca._currentValue,
			pool: e
		};
	}
	var Ca = Error(i(460)), wa = Error(i(474)), Ta = Error(i(542)), Ea = { then: function() {} };
	function Da(e) {
		return e = e.status, e === "fulfilled" || e === "rejected";
	}
	function Oa(e, t, n) {
		switch (n = e[n], n === void 0 ? e.push(t) : n !== t && (t.then(nn, nn), t = n), t.status) {
			case "fulfilled": return t.value;
			case "rejected": throw e = t.reason, Ma(e), e;
			default:
				if (typeof t.status == "string") t.then(nn, nn);
				else {
					if (e = q, e !== null && 100 < e.shellSuspendCounter) throw Error(i(482));
					e = t, e.status = "pending", e.then(function(e) {
						if (t.status === "pending") {
							var n = t;
							n.status = "fulfilled", n.value = e;
						}
					}, function(e) {
						if (t.status === "pending") {
							var n = t;
							n.status = "rejected", n.reason = e;
						}
					});
				}
				switch (t.status) {
					case "fulfilled": return t.value;
					case "rejected": throw e = t.reason, Ma(e), e;
				}
				throw Aa = t, Ca;
		}
	}
	function ka(e) {
		try {
			var t = e._init;
			return t(e._payload);
		} catch (e) {
			throw typeof e == "object" && e && typeof e.then == "function" ? (Aa = e, Ca) : e;
		}
	}
	var Aa = null;
	function ja() {
		if (Aa === null) throw Error(i(459));
		var e = Aa;
		return Aa = null, e;
	}
	function Ma(e) {
		if (e === Ca || e === Ta) throw Error(i(483));
	}
	var Na = null, Pa = 0;
	function Fa(e) {
		var t = Pa;
		return Pa += 1, Na === null && (Na = []), Oa(Na, e, t);
	}
	function Ia(e, t) {
		t = t.props.ref, e.ref = t === void 0 ? null : t;
	}
	function z(e, t) {
		throw t.$$typeof === g ? Error(i(525)) : (e = Object.prototype.toString.call(t), Error(i(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e)));
	}
	function B(e) {
		function t(t, n) {
			if (e) {
				var r = t.deletions;
				r === null ? (t.deletions = [n], t.flags |= 16) : r.push(n);
			}
		}
		function n(n, r) {
			if (!e) return null;
			for (; r !== null;) t(n, r), r = r.sibling;
			return null;
		}
		function r(e) {
			for (var t = /* @__PURE__ */ new Map(); e !== null;) e.key === null ? t.set(e.index, e) : t.set(e.key, e), e = e.sibling;
			return t;
		}
		function a(e, t) {
			return e = pi(e, t), e.index = 0, e.sibling = null, e;
		}
		function o(t, n, r) {
			return t.index = r, e ? (r = t.alternate, r === null ? (t.flags |= 67108866, n) : (r = r.index, r < n ? (t.flags |= 67108866, n) : r)) : (t.flags |= 1048576, n);
		}
		function s(t) {
			return e && t.alternate === null && (t.flags |= 67108866), t;
		}
		function c(e, t, n, r) {
			return t === null || t.tag !== 6 ? (t = _i(n, e.mode, r), t.return = e, t) : (t = a(t, n), t.return = e, t);
		}
		function l(e, t, n, r) {
			var i = n.type;
			return i === y ? d(e, t, n.props.children, r, n.key) : t !== null && (t.elementType === i || typeof i == "object" && i && i.$$typeof === C && ka(i) === t.type) ? (t = a(t, n.props), Ia(t, n), t.return = e, t) : (t = hi(n.type, n.key, n.props, null, e.mode, r), Ia(t, n), t.return = e, t);
		}
		function u(e, t, n, r) {
			return t === null || t.tag !== 4 || t.stateNode.containerInfo !== n.containerInfo || t.stateNode.implementation !== n.implementation ? (t = yi(n, e.mode, r), t.return = e, t) : (t = a(t, n.children || []), t.return = e, t);
		}
		function d(e, t, n, r, i) {
			return t === null || t.tag !== 7 ? (t = gi(n, e.mode, r, i), t.return = e, t) : (t = a(t, n), t.return = e, t);
		}
		function f(e, t, n) {
			if (typeof t == "string" && t !== "" || typeof t == "number" || typeof t == "bigint") return t = _i("" + t, e.mode, n), t.return = e, t;
			if (typeof t == "object" && t) {
				switch (t.$$typeof) {
					case _: return n = hi(t.type, t.key, t.props, null, e.mode, n), Ia(n, t), n.return = e, n;
					case v: return t = yi(t, e.mode, n), t.return = e, t;
					case C: return t = ka(t), f(e, t, n);
				}
				if (E(t) || w(t)) return t = gi(t, e.mode, n, null), t.return = e, t;
				if (typeof t.then == "function") return f(e, Fa(t), n);
				if (t.$$typeof === te) return f(e, ra(e, t), n);
				z(e, t);
			}
			return null;
		}
		function p(e, t, n, r) {
			var i = t === null ? null : t.key;
			if (typeof n == "string" && n !== "" || typeof n == "number" || typeof n == "bigint") return i === null ? c(e, t, "" + n, r) : null;
			if (typeof n == "object" && n) {
				switch (n.$$typeof) {
					case _: return n.key === i ? l(e, t, n, r) : null;
					case v: return n.key === i ? u(e, t, n, r) : null;
					case C: return n = ka(n), p(e, t, n, r);
				}
				if (E(n) || w(n)) return i === null ? d(e, t, n, r, null) : null;
				if (typeof n.then == "function") return p(e, t, Fa(n), r);
				if (n.$$typeof === te) return p(e, t, ra(e, n), r);
				z(e, n);
			}
			return null;
		}
		function m(e, t, n, r, i) {
			if (typeof r == "string" && r !== "" || typeof r == "number" || typeof r == "bigint") return e = e.get(n) || null, c(t, e, "" + r, i);
			if (typeof r == "object" && r) {
				switch (r.$$typeof) {
					case _: return e = e.get(r.key === null ? n : r.key) || null, l(t, e, r, i);
					case v: return e = e.get(r.key === null ? n : r.key) || null, u(t, e, r, i);
					case C: return r = ka(r), m(e, t, n, r, i);
				}
				if (E(r) || w(r)) return e = e.get(n) || null, d(t, e, r, i, null);
				if (typeof r.then == "function") return m(e, t, n, Fa(r), i);
				if (r.$$typeof === te) return m(e, t, n, ra(t, r), i);
				z(t, r);
			}
			return null;
		}
		function h(i, a, s, c) {
			for (var l = null, u = null, d = a, h = a = 0, g = null; d !== null && h < s.length; h++) {
				d.index > h ? (g = d, d = null) : g = d.sibling;
				var _ = p(i, d, s[h], c);
				if (_ === null) {
					d === null && (d = g);
					break;
				}
				e && d && _.alternate === null && t(i, d), a = o(_, a, h), u === null ? l = _ : u.sibling = _, u = _, d = g;
			}
			if (h === s.length) return n(i, d), L && ji(i, h), l;
			if (d === null) {
				for (; h < s.length; h++) d = f(i, s[h], c), d !== null && (a = o(d, a, h), u === null ? l = d : u.sibling = d, u = d);
				return L && ji(i, h), l;
			}
			for (d = r(d); h < s.length; h++) g = m(d, i, h, s[h], c), g !== null && (e && g.alternate !== null && d.delete(g.key === null ? h : g.key), a = o(g, a, h), u === null ? l = g : u.sibling = g, u = g);
			return e && d.forEach(function(e) {
				return t(i, e);
			}), L && ji(i, h), l;
		}
		function g(a, s, c, l) {
			if (c == null) throw Error(i(151));
			for (var u = null, d = null, h = s, g = s = 0, _ = null, v = c.next(); h !== null && !v.done; g++, v = c.next()) {
				h.index > g ? (_ = h, h = null) : _ = h.sibling;
				var y = p(a, h, v.value, l);
				if (y === null) {
					h === null && (h = _);
					break;
				}
				e && h && y.alternate === null && t(a, h), s = o(y, s, g), d === null ? u = y : d.sibling = y, d = y, h = _;
			}
			if (v.done) return n(a, h), L && ji(a, g), u;
			if (h === null) {
				for (; !v.done; g++, v = c.next()) v = f(a, v.value, l), v !== null && (s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
				return L && ji(a, g), u;
			}
			for (h = r(h); !v.done; g++, v = c.next()) v = m(h, a, g, v.value, l), v !== null && (e && v.alternate !== null && h.delete(v.key === null ? g : v.key), s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
			return e && h.forEach(function(e) {
				return t(a, e);
			}), L && ji(a, g), u;
		}
		function b(e, r, o, c) {
			if (typeof o == "object" && o && o.type === y && o.key === null && (o = o.props.children), typeof o == "object" && o) {
				switch (o.$$typeof) {
					case _:
						a: {
							for (var l = o.key; r !== null;) {
								if (r.key === l) {
									if (l = o.type, l === y) {
										if (r.tag === 7) {
											n(e, r.sibling), c = a(r, o.props.children), c.return = e, e = c;
											break a;
										}
									} else if (r.elementType === l || typeof l == "object" && l && l.$$typeof === C && ka(l) === r.type) {
										n(e, r.sibling), c = a(r, o.props), Ia(c, o), c.return = e, e = c;
										break a;
									}
									n(e, r);
									break;
								} else t(e, r);
								r = r.sibling;
							}
							o.type === y ? (c = gi(o.props.children, e.mode, c, o.key), c.return = e, e = c) : (c = hi(o.type, o.key, o.props, null, e.mode, c), Ia(c, o), c.return = e, e = c);
						}
						return s(e);
					case v:
						a: {
							for (l = o.key; r !== null;) {
								if (r.key === l) if (r.tag === 4 && r.stateNode.containerInfo === o.containerInfo && r.stateNode.implementation === o.implementation) {
									n(e, r.sibling), c = a(r, o.children || []), c.return = e, e = c;
									break a;
								} else {
									n(e, r);
									break;
								}
								else t(e, r);
								r = r.sibling;
							}
							c = yi(o, e.mode, c), c.return = e, e = c;
						}
						return s(e);
					case C: return o = ka(o), b(e, r, o, c);
				}
				if (E(o)) return h(e, r, o, c);
				if (w(o)) {
					if (l = w(o), typeof l != "function") throw Error(i(150));
					return o = l.call(o), g(e, r, o, c);
				}
				if (typeof o.then == "function") return b(e, r, Fa(o), c);
				if (o.$$typeof === te) return b(e, r, ra(e, o), c);
				z(e, o);
			}
			return typeof o == "string" && o !== "" || typeof o == "number" || typeof o == "bigint" ? (o = "" + o, r !== null && r.tag === 6 ? (n(e, r.sibling), c = a(r, o), c.return = e, e = c) : (n(e, r), c = _i(o, e.mode, c), c.return = e, e = c), s(e)) : n(e, r);
		}
		return function(e, t, n, r) {
			try {
				Pa = 0;
				var i = b(e, t, n, r);
				return Na = null, i;
			} catch (t) {
				if (t === Ca || t === Ta) throw t;
				var a = di(29, t, null, e.mode);
				return a.lanes = r, a.return = e, a;
			}
		};
	}
	var La = B(!0), Ra = B(!1), za = !1;
	function Ba(e) {
		e.updateQueue = {
			baseState: e.memoizedState,
			firstBaseUpdate: null,
			lastBaseUpdate: null,
			shared: {
				pending: null,
				lanes: 0,
				hiddenCallbacks: null
			},
			callbacks: null
		};
	}
	function Va(e, t) {
		e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
			baseState: e.baseState,
			firstBaseUpdate: e.firstBaseUpdate,
			lastBaseUpdate: e.lastBaseUpdate,
			shared: e.shared,
			callbacks: null
		});
	}
	function Ha(e) {
		return {
			lane: e,
			tag: 0,
			payload: null,
			callback: null,
			next: null
		};
	}
	function Ua(e, t, n) {
		var r = e.updateQueue;
		if (r === null) return null;
		if (r = r.shared, K & 2) {
			var i = r.pending;
			return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, t = ci(e), si(e, null, n), t;
		}
		return ii(e, r, t, n), ci(e);
	}
	function V(e, t, n) {
		if (t = t.updateQueue, t !== null && (t = t.shared, n & 4194048)) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, at(e, n);
		}
	}
	function Wa(e, t) {
		var n = e.updateQueue, r = e.alternate;
		if (r !== null && (r = r.updateQueue, n === r)) {
			var i = null, a = null;
			if (n = n.firstBaseUpdate, n !== null) {
				do {
					var o = {
						lane: n.lane,
						tag: n.tag,
						payload: n.payload,
						callback: null,
						next: null
					};
					a === null ? i = a = o : a = a.next = o, n = n.next;
				} while (n !== null);
				a === null ? i = a = t : a = a.next = t;
			} else i = a = t;
			n = {
				baseState: r.baseState,
				firstBaseUpdate: i,
				lastBaseUpdate: a,
				shared: r.shared,
				callbacks: r.callbacks
			}, e.updateQueue = n;
			return;
		}
		e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
	}
	var Ga = !1;
	function Ka() {
		if (Ga) {
			var e = ma;
			if (e !== null) throw e;
		}
	}
	function qa(e, t, n, r) {
		Ga = !1;
		var i = e.updateQueue;
		za = !1;
		var a = i.firstBaseUpdate, o = i.lastBaseUpdate, s = i.shared.pending;
		if (s !== null) {
			i.shared.pending = null;
			var c = s, l = c.next;
			c.next = null, o === null ? a = l : o.next = l, o = c;
			var u = e.alternate;
			u !== null && (u = u.updateQueue, s = u.lastBaseUpdate, s !== o && (s === null ? u.firstBaseUpdate = l : s.next = l, u.lastBaseUpdate = c));
		}
		if (a !== null) {
			var d = i.baseState;
			o = 0, u = l = c = null, s = a;
			do {
				var f = s.lane & -536870913, p = f !== s.lane;
				if (p ? (Y & f) === f : (r & f) === f) {
					f !== 0 && f === pa && (Ga = !0), u !== null && (u = u.next = {
						lane: 0,
						tag: s.tag,
						payload: s.payload,
						callback: null,
						next: null
					});
					a: {
						var m = e, g = s;
						f = t;
						var _ = n;
						switch (g.tag) {
							case 1:
								if (m = g.payload, typeof m == "function") {
									d = m.call(_, d, f);
									break a;
								}
								d = m;
								break a;
							case 3: m.flags = m.flags & -65537 | 128;
							case 0:
								if (m = g.payload, f = typeof m == "function" ? m.call(_, d, f) : m, f == null) break a;
								d = h({}, d, f);
								break a;
							case 2: za = !0;
						}
					}
					f = s.callback, f !== null && (e.flags |= 64, p && (e.flags |= 8192), p = i.callbacks, p === null ? i.callbacks = [f] : p.push(f));
				} else p = {
					lane: f,
					tag: s.tag,
					payload: s.payload,
					callback: s.callback,
					next: null
				}, u === null ? (l = u = p, c = d) : u = u.next = p, o |= f;
				if (s = s.next, s === null) {
					if (s = i.shared.pending, s === null) break;
					p = s, s = p.next, p.next = null, i.lastBaseUpdate = p, i.shared.pending = null;
				}
			} while (1);
			u === null && (c = d), i.baseState = c, i.firstBaseUpdate = l, i.lastBaseUpdate = u, a === null && (i.shared.lanes = 0), Gl |= o, e.lanes = o, e.memoizedState = d;
		}
	}
	function Ja(e, t) {
		if (typeof e != "function") throw Error(i(191, e));
		e.call(t);
	}
	function Ya(e, t) {
		var n = e.callbacks;
		if (n !== null) for (e.callbacks = null, e = 0; e < n.length; e++) Ja(n[e], t);
	}
	var Xa = de(null), Za = de(0);
	function Qa(e, t) {
		e = Ul, j(Za, e), j(Xa, t), Ul = e | t.baseLanes;
	}
	function $a() {
		j(Za, Ul), j(Xa, Xa.current);
	}
	function eo() {
		Ul = Za.current, A(Xa), A(Za);
	}
	var to = de(null), no = null;
	function ro(e) {
		var t = e.alternate;
		j(co, co.current & 1), j(to, e), no === null && (t === null || Xa.current !== null || t.memoizedState !== null) && (no = e);
	}
	function io(e) {
		j(co, co.current), j(to, e), no === null && (no = e);
	}
	function ao(e) {
		e.tag === 22 ? (j(co, co.current), j(to, e), no === null && (no = e)) : oo(e);
	}
	function oo() {
		j(co, co.current), j(to, to.current);
	}
	function so(e) {
		A(to), no === e && (no = null), A(co);
	}
	var co = de(0);
	function lo(e) {
		for (var t = e; t !== null;) {
			if (t.tag === 13) {
				var n = t.memoizedState;
				if (n !== null && (n = n.dehydrated, n === null || af(n) || of(n))) return t;
			} else if (t.tag === 19 && (t.memoizedProps.revealOrder === "forwards" || t.memoizedProps.revealOrder === "backwards" || t.memoizedProps.revealOrder === "unstable_legacy-backwards" || t.memoizedProps.revealOrder === "together")) {
				if (t.flags & 128) return t;
			} else if (t.child !== null) {
				t.child.return = t, t = t.child;
				continue;
			}
			if (t === e) break;
			for (; t.sibling === null;) {
				if (t.return === null || t.return === e) return null;
				t = t.return;
			}
			t.sibling.return = t.return, t = t.sibling;
		}
		return null;
	}
	var uo = 0, H = null, U = null, fo = null, po = !1, mo = !1, ho = !1, go = 0, _o = 0, vo = null, yo = 0;
	function bo() {
		throw Error(i(321));
	}
	function xo(e, t) {
		if (t === null) return !1;
		for (var n = 0; n < t.length && n < e.length; n++) if (!Tr(e[n], t[n])) return !1;
		return !0;
	}
	function So(e, t, n, r, i, a) {
		return uo = a, H = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, D.H = e === null || e.memoizedState === null ? zs : Bs, ho = !1, a = n(r, i), ho = !1, mo && (a = wo(t, n, r, i)), Co(e), a;
	}
	function Co(e) {
		D.H = Rs;
		var t = U !== null && U.next !== null;
		if (uo = 0, fo = U = H = null, po = !1, _o = 0, vo = null, t) throw Error(i(300));
		e === null || rc || (e = e.dependencies, e !== null && ta(e) && (rc = !0));
	}
	function wo(e, t, n, r) {
		H = e;
		var a = 0;
		do {
			if (mo && (vo = null), _o = 0, mo = !1, 25 <= a) throw Error(i(301));
			if (a += 1, fo = U = null, e.updateQueue != null) {
				var o = e.updateQueue;
				o.lastEffect = null, o.events = null, o.stores = null, o.memoCache != null && (o.memoCache.index = 0);
			}
			D.H = Vs, o = t(n, r);
		} while (mo);
		return o;
	}
	function To() {
		var e = D.H, t = e.useState()[0];
		return t = typeof t.then == "function" ? Mo(t) : t, e = e.useState()[0], (U === null ? null : U.memoizedState) !== e && (H.flags |= 1024), t;
	}
	function Eo() {
		var e = go !== 0;
		return go = 0, e;
	}
	function Do(e, t, n) {
		t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~n;
	}
	function Oo(e) {
		if (po) {
			for (e = e.memoizedState; e !== null;) {
				var t = e.queue;
				t !== null && (t.pending = null), e = e.next;
			}
			po = !1;
		}
		uo = 0, fo = U = H = null, mo = !1, _o = go = 0, vo = null;
	}
	function ko() {
		var e = {
			memoizedState: null,
			baseState: null,
			baseQueue: null,
			queue: null,
			next: null
		};
		return fo === null ? H.memoizedState = fo = e : fo = fo.next = e, fo;
	}
	function Ao() {
		if (U === null) {
			var e = H.alternate;
			e = e === null ? null : e.memoizedState;
		} else e = U.next;
		var t = fo === null ? H.memoizedState : fo.next;
		if (t !== null) fo = t, U = e;
		else {
			if (e === null) throw H.alternate === null ? Error(i(467)) : Error(i(310));
			U = e, e = {
				memoizedState: U.memoizedState,
				baseState: U.baseState,
				baseQueue: U.baseQueue,
				queue: U.queue,
				next: null
			}, fo === null ? H.memoizedState = fo = e : fo = fo.next = e;
		}
		return fo;
	}
	function jo() {
		return {
			lastEffect: null,
			events: null,
			stores: null,
			memoCache: null
		};
	}
	function Mo(e) {
		var t = _o;
		return _o += 1, vo === null && (vo = []), e = Oa(vo, e, t), t = H, (fo === null ? t.memoizedState : fo.next) === null && (t = t.alternate, D.H = t === null || t.memoizedState === null ? zs : Bs), e;
	}
	function No(e) {
		if (typeof e == "object" && e) {
			if (typeof e.then == "function") return Mo(e);
			if (e.$$typeof === te) return R(e);
		}
		throw Error(i(438, String(e)));
	}
	function Po(e) {
		var t = null, n = H.updateQueue;
		if (n !== null && (t = n.memoCache), t == null) {
			var r = H.alternate;
			r !== null && (r = r.updateQueue, r !== null && (r = r.memoCache, r != null && (t = {
				data: r.data.map(function(e) {
					return e.slice();
				}),
				index: 0
			})));
		}
		if (t ??= {
			data: [],
			index: 0
		}, n === null && (n = jo(), H.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0) for (n = t.data[t.index] = Array(e), r = 0; r < e; r++) n[r] = oe;
		return t.index++, n;
	}
	function Fo(e, t) {
		return typeof t == "function" ? t(e) : t;
	}
	function Io(e) {
		return Lo(Ao(), U, e);
	}
	function Lo(e, t, n) {
		var r = e.queue;
		if (r === null) throw Error(i(311));
		r.lastRenderedReducer = n;
		var a = e.baseQueue, o = r.pending;
		if (o !== null) {
			if (a !== null) {
				var s = a.next;
				a.next = o.next, o.next = s;
			}
			t.baseQueue = a = o, r.pending = null;
		}
		if (o = e.baseState, a === null) e.memoizedState = o;
		else {
			t = a.next;
			var c = s = null, l = null, u = t, d = !1;
			do {
				var f = u.lane & -536870913;
				if (f === u.lane ? (uo & f) === f : (Y & f) === f) {
					var p = u.revertLane;
					if (p === 0) l !== null && (l = l.next = {
						lane: 0,
						revertLane: 0,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}), f === pa && (d = !0);
					else if ((uo & p) === p) {
						u = u.next, p === pa && (d = !0);
						continue;
					} else f = {
						lane: 0,
						revertLane: u.revertLane,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}, l === null ? (c = l = f, s = o) : l = l.next = f, H.lanes |= p, Gl |= p;
					f = u.action, ho && n(o, f), o = u.hasEagerState ? u.eagerState : n(o, f);
				} else p = {
					lane: f,
					revertLane: u.revertLane,
					gesture: u.gesture,
					action: u.action,
					hasEagerState: u.hasEagerState,
					eagerState: u.eagerState,
					next: null
				}, l === null ? (c = l = p, s = o) : l = l.next = p, H.lanes |= f, Gl |= f;
				u = u.next;
			} while (u !== null && u !== t);
			if (l === null ? s = o : l.next = c, !Tr(o, e.memoizedState) && (rc = !0, d && (n = ma, n !== null))) throw n;
			e.memoizedState = o, e.baseState = s, e.baseQueue = l, r.lastRenderedState = o;
		}
		return a === null && (r.lanes = 0), [e.memoizedState, r.dispatch];
	}
	function Ro(e) {
		var t = Ao(), n = t.queue;
		if (n === null) throw Error(i(311));
		n.lastRenderedReducer = e;
		var r = n.dispatch, a = n.pending, o = t.memoizedState;
		if (a !== null) {
			n.pending = null;
			var s = a = a.next;
			do
				o = e(o, s.action), s = s.next;
			while (s !== a);
			Tr(o, t.memoizedState) || (rc = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
		}
		return [o, r];
	}
	function zo(e, t, n) {
		var r = H, a = Ao(), o = L;
		if (o) {
			if (n === void 0) throw Error(i(407));
			n = n();
		} else n = t();
		var s = !Tr((U || a).memoizedState, n);
		if (s && (a.memoizedState = n, rc = !0), a = a.queue, us(Ho.bind(null, r, a, e), [e]), a.getSnapshot !== t || s || fo !== null && fo.memoizedState.tag & 1) {
			if (r.flags |= 2048, as(9, { destroy: void 0 }, Vo.bind(null, r, a, n, t), null), q === null) throw Error(i(349));
			o || uo & 127 || Bo(r, t, n);
		}
		return n;
	}
	function Bo(e, t, n) {
		e.flags |= 16384, e = {
			getSnapshot: t,
			value: n
		}, t = H.updateQueue, t === null ? (t = jo(), H.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
	}
	function Vo(e, t, n, r) {
		t.value = n, t.getSnapshot = r, Uo(t) && Wo(e);
	}
	function Ho(e, t, n) {
		return n(function() {
			Uo(t) && Wo(e);
		});
	}
	function Uo(e) {
		var t = e.getSnapshot;
		e = e.value;
		try {
			var n = t();
			return !Tr(e, n);
		} catch {
			return !0;
		}
	}
	function Wo(e) {
		var t = oi(e, 2);
		t !== null && hu(t, e, 2);
	}
	function Go(e) {
		var t = ko();
		if (typeof e == "function") {
			var n = e;
			if (e = n(), ho) {
				He(!0);
				try {
					n();
				} finally {
					He(!1);
				}
			}
		}
		return t.memoizedState = t.baseState = e, t.queue = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: Fo,
			lastRenderedState: e
		}, t;
	}
	function Ko(e, t, n, r) {
		return e.baseState = n, Lo(e, U, typeof r == "function" ? r : Fo);
	}
	function qo(e, t, n, r, a) {
		if (Fs(e)) throw Error(i(485));
		if (e = t.action, e !== null) {
			var o = {
				payload: a,
				action: e,
				next: null,
				isTransition: !0,
				status: "pending",
				value: null,
				reason: null,
				listeners: [],
				then: function(e) {
					o.listeners.push(e);
				}
			};
			D.T === null ? o.isTransition = !1 : n(!0), r(o), n = t.pending, n === null ? (o.next = t.pending = o, Jo(t, o)) : (o.next = n.next, t.pending = n.next = o);
		}
	}
	function Jo(e, t) {
		var n = t.action, r = t.payload, i = e.state;
		if (t.isTransition) {
			var a = D.T, o = {};
			D.T = o;
			try {
				var s = n(i, r), c = D.S;
				c !== null && c(o, s), Yo(e, t, s);
			} catch (n) {
				Zo(e, t, n);
			} finally {
				a !== null && o.types !== null && (a.types = o.types), D.T = a;
			}
		} else try {
			a = n(i, r), Yo(e, t, a);
		} catch (n) {
			Zo(e, t, n);
		}
	}
	function Yo(e, t, n) {
		typeof n == "object" && n && typeof n.then == "function" ? n.then(function(n) {
			Xo(e, t, n);
		}, function(n) {
			return Zo(e, t, n);
		}) : Xo(e, t, n);
	}
	function Xo(e, t, n) {
		t.status = "fulfilled", t.value = n, Qo(t), e.state = n, t = e.pending, t !== null && (n = t.next, n === t ? e.pending = null : (n = n.next, t.next = n, Jo(e, n)));
	}
	function Zo(e, t, n) {
		var r = e.pending;
		if (e.pending = null, r !== null) {
			r = r.next;
			do
				t.status = "rejected", t.reason = n, Qo(t), t = t.next;
			while (t !== r);
		}
		e.action = null;
	}
	function Qo(e) {
		e = e.listeners;
		for (var t = 0; t < e.length; t++) (0, e[t])();
	}
	function $o(e, t) {
		return t;
	}
	function es(e, t) {
		if (L) {
			var n = q.formState;
			if (n !== null) {
				a: {
					var r = H;
					if (L) {
						if (I) {
							b: {
								for (var i = I, a = Ri; i.nodeType !== 8;) {
									if (!a) {
										i = null;
										break b;
									}
									if (i = cf(i.nextSibling), i === null) {
										i = null;
										break b;
									}
								}
								a = i.data, i = a === "F!" || a === "F" ? i : null;
							}
							if (i) {
								I = cf(i.nextSibling), r = i.data === "F!";
								break a;
							}
						}
						Bi(r);
					}
					r = !1;
				}
				r && (t = n[0]);
			}
		}
		return n = ko(), n.memoizedState = n.baseState = t, r = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: $o,
			lastRenderedState: t
		}, n.queue = r, n = Ms.bind(null, H, r), r.dispatch = n, r = Go(!1), a = Ps.bind(null, H, !1, r.queue), r = ko(), i = {
			state: t,
			dispatch: null,
			action: e,
			pending: null
		}, r.queue = i, n = qo.bind(null, H, i, a, n), i.dispatch = n, r.memoizedState = e, [
			t,
			n,
			!1
		];
	}
	function ts(e) {
		return ns(Ao(), U, e);
	}
	function ns(e, t, n) {
		if (t = Lo(e, t, $o)[0], e = Io(Fo)[0], typeof t == "object" && t && typeof t.then == "function") try {
			var r = Mo(t);
		} catch (e) {
			throw e === Ca ? Ta : e;
		}
		else r = t;
		t = Ao();
		var i = t.queue, a = i.dispatch;
		return n !== t.memoizedState && (H.flags |= 2048, as(9, { destroy: void 0 }, rs.bind(null, i, n), null)), [
			r,
			a,
			e
		];
	}
	function rs(e, t) {
		e.action = t;
	}
	function is(e) {
		var t = Ao(), n = U;
		if (n !== null) return ns(t, n, e);
		Ao(), t = t.memoizedState, n = Ao();
		var r = n.queue.dispatch;
		return n.memoizedState = e, [
			t,
			r,
			!1
		];
	}
	function as(e, t, n, r) {
		return e = {
			tag: e,
			create: n,
			deps: r,
			inst: t,
			next: null
		}, t = H.updateQueue, t === null && (t = jo(), H.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e), e;
	}
	function os() {
		return Ao().memoizedState;
	}
	function ss(e, t, n, r) {
		var i = ko();
		H.flags |= e, i.memoizedState = as(1 | t, { destroy: void 0 }, n, r === void 0 ? null : r);
	}
	function cs(e, t, n, r) {
		var i = Ao();
		r = r === void 0 ? null : r;
		var a = i.memoizedState.inst;
		U !== null && r !== null && xo(r, U.memoizedState.deps) ? i.memoizedState = as(t, a, n, r) : (H.flags |= e, i.memoizedState = as(1 | t, a, n, r));
	}
	function ls(e, t) {
		ss(8390656, 8, e, t);
	}
	function us(e, t) {
		cs(2048, 8, e, t);
	}
	function ds(e) {
		H.flags |= 4;
		var t = H.updateQueue;
		if (t === null) t = jo(), H.updateQueue = t, t.events = [e];
		else {
			var n = t.events;
			n === null ? t.events = [e] : n.push(e);
		}
	}
	function fs(e) {
		var t = Ao().memoizedState;
		return ds({
			ref: t,
			nextImpl: e
		}), function() {
			if (K & 2) throw Error(i(440));
			return t.impl.apply(void 0, arguments);
		};
	}
	function ps(e, t) {
		return cs(4, 2, e, t);
	}
	function ms(e, t) {
		return cs(4, 4, e, t);
	}
	function hs(e, t) {
		if (typeof t == "function") {
			e = e();
			var n = t(e);
			return function() {
				typeof n == "function" ? n() : t(null);
			};
		}
		if (t != null) return e = e(), t.current = e, function() {
			t.current = null;
		};
	}
	function gs(e, t, n) {
		n = n == null ? null : n.concat([e]), cs(4, 4, hs.bind(null, t, e), n);
	}
	function _s() {}
	function vs(e, t) {
		var n = Ao();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		return t !== null && xo(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
	}
	function ys(e, t) {
		var n = Ao();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		if (t !== null && xo(t, r[1])) return r[0];
		if (r = e(), ho) {
			He(!0);
			try {
				e();
			} finally {
				He(!1);
			}
		}
		return n.memoizedState = [r, t], r;
	}
	function bs(e, t, n) {
		return n === void 0 || uo & 1073741824 && !(Y & 261930) ? e.memoizedState = t : (e.memoizedState = n, e = mu(), H.lanes |= e, Gl |= e, n);
	}
	function xs(e, t, n, r) {
		return Tr(n, t) ? n : Xa.current === null ? !(uo & 42) || uo & 1073741824 && !(Y & 261930) ? (rc = !0, e.memoizedState = n) : (e = mu(), H.lanes |= e, Gl |= e, t) : (e = bs(e, n, r), Tr(e, t) || (rc = !0), e);
	}
	function Ss(e, t, n, r, i) {
		var a = O.p;
		O.p = a !== 0 && 8 > a ? a : 8;
		var o = D.T, s = {};
		D.T = s, Ps(e, !1, t, n);
		try {
			var c = i(), l = D.S;
			l !== null && l(s, c), typeof c == "object" && c && typeof c.then == "function" ? Ns(e, t, _a(c, r), pu(e)) : Ns(e, t, r, pu(e));
		} catch (n) {
			Ns(e, t, {
				then: function() {},
				status: "rejected",
				reason: n
			}, pu());
		} finally {
			O.p = a, o !== null && s.types !== null && (o.types = s.types), D.T = o;
		}
	}
	function Cs() {}
	function ws(e, t, n, r) {
		if (e.tag !== 5) throw Error(i(476));
		var a = Ts(e).queue;
		Ss(e, a, t, k, n === null ? Cs : function() {
			return Es(e), n(r);
		});
	}
	function Ts(e) {
		var t = e.memoizedState;
		if (t !== null) return t;
		t = {
			memoizedState: k,
			baseState: k,
			baseQueue: null,
			queue: {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: Fo,
				lastRenderedState: k
			},
			next: null
		};
		var n = {};
		return t.next = {
			memoizedState: n,
			baseState: n,
			baseQueue: null,
			queue: {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: Fo,
				lastRenderedState: n
			},
			next: null
		}, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
	}
	function Es(e) {
		var t = Ts(e);
		t.next === null && (t = e.alternate.memoizedState), Ns(e, t.next.queue, {}, pu());
	}
	function Ds() {
		return R(Qf);
	}
	function Os() {
		return Ao().memoizedState;
	}
	function ks() {
		return Ao().memoizedState;
	}
	function As(e) {
		for (var t = e.return; t !== null;) {
			switch (t.tag) {
				case 24:
				case 3:
					var n = pu();
					e = Ha(n);
					var r = Ua(t, e, n);
					r !== null && (hu(r, t, n), V(r, t, n)), t = { cache: la() }, e.payload = t;
					return;
			}
			t = t.return;
		}
	}
	function js(e, t, n) {
		var r = pu();
		n = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, Fs(e) ? Is(t, n) : (n = ai(e, t, n, r), n !== null && (hu(n, e, r), Ls(n, t, r)));
	}
	function Ms(e, t, n) {
		Ns(e, t, n, pu());
	}
	function Ns(e, t, n, r) {
		var i = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		};
		if (Fs(e)) Is(t, i);
		else {
			var a = e.alternate;
			if (e.lanes === 0 && (a === null || a.lanes === 0) && (a = t.lastRenderedReducer, a !== null)) try {
				var o = t.lastRenderedState, s = a(o, n);
				if (i.hasEagerState = !0, i.eagerState = s, Tr(s, o)) return ii(e, t, i, 0), q === null && ri(), !1;
			} catch {}
			if (n = ai(e, t, i, r), n !== null) return hu(n, e, r), Ls(n, t, r), !0;
		}
		return !1;
	}
	function Ps(e, t, n, r) {
		if (r = {
			lane: 2,
			revertLane: dd(),
			gesture: null,
			action: r,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, Fs(e)) {
			if (t) throw Error(i(479));
		} else t = ai(e, n, r, 2), t !== null && hu(t, e, 2);
	}
	function Fs(e) {
		var t = e.alternate;
		return e === H || t !== null && t === H;
	}
	function Is(e, t) {
		mo = po = !0;
		var n = e.pending;
		n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
	}
	function Ls(e, t, n) {
		if (n & 4194048) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, at(e, n);
		}
	}
	var Rs = {
		readContext: R,
		use: No,
		useCallback: bo,
		useContext: bo,
		useEffect: bo,
		useImperativeHandle: bo,
		useLayoutEffect: bo,
		useInsertionEffect: bo,
		useMemo: bo,
		useReducer: bo,
		useRef: bo,
		useState: bo,
		useDebugValue: bo,
		useDeferredValue: bo,
		useTransition: bo,
		useSyncExternalStore: bo,
		useId: bo,
		useHostTransitionStatus: bo,
		useFormState: bo,
		useActionState: bo,
		useOptimistic: bo,
		useMemoCache: bo,
		useCacheRefresh: bo
	};
	Rs.useEffectEvent = bo;
	var zs = {
		readContext: R,
		use: No,
		useCallback: function(e, t) {
			return ko().memoizedState = [e, t === void 0 ? null : t], e;
		},
		useContext: R,
		useEffect: ls,
		useImperativeHandle: function(e, t, n) {
			n = n == null ? null : n.concat([e]), ss(4194308, 4, hs.bind(null, t, e), n);
		},
		useLayoutEffect: function(e, t) {
			return ss(4194308, 4, e, t);
		},
		useInsertionEffect: function(e, t) {
			ss(4, 2, e, t);
		},
		useMemo: function(e, t) {
			var n = ko();
			t = t === void 0 ? null : t;
			var r = e();
			if (ho) {
				He(!0);
				try {
					e();
				} finally {
					He(!1);
				}
			}
			return n.memoizedState = [r, t], r;
		},
		useReducer: function(e, t, n) {
			var r = ko();
			if (n !== void 0) {
				var i = n(t);
				if (ho) {
					He(!0);
					try {
						n(t);
					} finally {
						He(!1);
					}
				}
			} else i = t;
			return r.memoizedState = r.baseState = i, e = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: e,
				lastRenderedState: i
			}, r.queue = e, e = e.dispatch = js.bind(null, H, e), [r.memoizedState, e];
		},
		useRef: function(e) {
			var t = ko();
			return e = { current: e }, t.memoizedState = e;
		},
		useState: function(e) {
			e = Go(e);
			var t = e.queue, n = Ms.bind(null, H, t);
			return t.dispatch = n, [e.memoizedState, n];
		},
		useDebugValue: _s,
		useDeferredValue: function(e, t) {
			return bs(ko(), e, t);
		},
		useTransition: function() {
			var e = Go(!1);
			return e = Ss.bind(null, H, e.queue, !0, !1), ko().memoizedState = e, [!1, e];
		},
		useSyncExternalStore: function(e, t, n) {
			var r = H, a = ko();
			if (L) {
				if (n === void 0) throw Error(i(407));
				n = n();
			} else {
				if (n = t(), q === null) throw Error(i(349));
				Y & 127 || Bo(r, t, n);
			}
			a.memoizedState = n;
			var o = {
				value: n,
				getSnapshot: t
			};
			return a.queue = o, ls(Ho.bind(null, r, o, e), [e]), r.flags |= 2048, as(9, { destroy: void 0 }, Vo.bind(null, r, o, n, t), null), n;
		},
		useId: function() {
			var e = ko(), t = q.identifierPrefix;
			if (L) {
				var n = Ai, r = ki;
				n = (r & ~(1 << 32 - Ue(r) - 1)).toString(32) + n, t = "_" + t + "R_" + n, n = go++, 0 < n && (t += "H" + n.toString(32)), t += "_";
			} else n = yo++, t = "_" + t + "r_" + n.toString(32) + "_";
			return e.memoizedState = t;
		},
		useHostTransitionStatus: Ds,
		useFormState: es,
		useActionState: es,
		useOptimistic: function(e) {
			var t = ko();
			t.memoizedState = t.baseState = e;
			var n = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: null,
				lastRenderedState: null
			};
			return t.queue = n, t = Ps.bind(null, H, !0, n), n.dispatch = t, [e, t];
		},
		useMemoCache: Po,
		useCacheRefresh: function() {
			return ko().memoizedState = As.bind(null, H);
		},
		useEffectEvent: function(e) {
			var t = ko(), n = { impl: e };
			return t.memoizedState = n, function() {
				if (K & 2) throw Error(i(440));
				return n.impl.apply(void 0, arguments);
			};
		}
	}, Bs = {
		readContext: R,
		use: No,
		useCallback: vs,
		useContext: R,
		useEffect: us,
		useImperativeHandle: gs,
		useInsertionEffect: ps,
		useLayoutEffect: ms,
		useMemo: ys,
		useReducer: Io,
		useRef: os,
		useState: function() {
			return Io(Fo);
		},
		useDebugValue: _s,
		useDeferredValue: function(e, t) {
			return xs(Ao(), U.memoizedState, e, t);
		},
		useTransition: function() {
			var e = Io(Fo)[0], t = Ao().memoizedState;
			return [typeof e == "boolean" ? e : Mo(e), t];
		},
		useSyncExternalStore: zo,
		useId: Os,
		useHostTransitionStatus: Ds,
		useFormState: ts,
		useActionState: ts,
		useOptimistic: function(e, t) {
			return Ko(Ao(), U, e, t);
		},
		useMemoCache: Po,
		useCacheRefresh: ks
	};
	Bs.useEffectEvent = fs;
	var Vs = {
		readContext: R,
		use: No,
		useCallback: vs,
		useContext: R,
		useEffect: us,
		useImperativeHandle: gs,
		useInsertionEffect: ps,
		useLayoutEffect: ms,
		useMemo: ys,
		useReducer: Ro,
		useRef: os,
		useState: function() {
			return Ro(Fo);
		},
		useDebugValue: _s,
		useDeferredValue: function(e, t) {
			var n = Ao();
			return U === null ? bs(n, e, t) : xs(n, U.memoizedState, e, t);
		},
		useTransition: function() {
			var e = Ro(Fo)[0], t = Ao().memoizedState;
			return [typeof e == "boolean" ? e : Mo(e), t];
		},
		useSyncExternalStore: zo,
		useId: Os,
		useHostTransitionStatus: Ds,
		useFormState: is,
		useActionState: is,
		useOptimistic: function(e, t) {
			var n = Ao();
			return U === null ? (n.baseState = e, [e, n.queue.dispatch]) : Ko(n, U, e, t);
		},
		useMemoCache: Po,
		useCacheRefresh: ks
	};
	Vs.useEffectEvent = fs;
	function Hs(e, t, n, r) {
		t = e.memoizedState, n = n(r, t), n = n == null ? t : h({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
	}
	var Us = {
		enqueueSetState: function(e, t, n) {
			e = e._reactInternals;
			var r = pu(), i = Ha(r);
			i.payload = t, n != null && (i.callback = n), t = Ua(e, i, r), t !== null && (hu(t, e, r), V(t, e, r));
		},
		enqueueReplaceState: function(e, t, n) {
			e = e._reactInternals;
			var r = pu(), i = Ha(r);
			i.tag = 1, i.payload = t, n != null && (i.callback = n), t = Ua(e, i, r), t !== null && (hu(t, e, r), V(t, e, r));
		},
		enqueueForceUpdate: function(e, t) {
			e = e._reactInternals;
			var n = pu(), r = Ha(n);
			r.tag = 2, t != null && (r.callback = t), t = Ua(e, r, n), t !== null && (hu(t, e, n), V(t, e, n));
		}
	};
	function Ws(e, t, n, r, i, a, o) {
		return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, a, o) : t.prototype && t.prototype.isPureReactComponent ? !Er(n, r) || !Er(i, a) : !0;
	}
	function Gs(e, t, n, r) {
		e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && Us.enqueueReplaceState(t, t.state, null);
	}
	function Ks(e, t) {
		var n = t;
		if ("ref" in t) for (var r in n = {}, t) r !== "ref" && (n[r] = t[r]);
		if (e = e.defaultProps) for (var i in n === t && (n = h({}, n)), e) n[i] === void 0 && (n[i] = e[i]);
		return n;
	}
	function qs(e) {
		$r(e);
	}
	function Js(e) {
		console.error(e);
	}
	function Ys(e) {
		$r(e);
	}
	function Xs(e, t) {
		try {
			var n = e.onUncaughtError;
			n(t.value, { componentStack: t.stack });
		} catch (e) {
			setTimeout(function() {
				throw e;
			});
		}
	}
	function Zs(e, t, n) {
		try {
			var r = e.onCaughtError;
			r(n.value, {
				componentStack: n.stack,
				errorBoundary: t.tag === 1 ? t.stateNode : null
			});
		} catch (e) {
			setTimeout(function() {
				throw e;
			});
		}
	}
	function Qs(e, t, n) {
		return n = Ha(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
			Xs(e, t);
		}, n;
	}
	function $s(e) {
		return e = Ha(e), e.tag = 3, e;
	}
	function ec(e, t, n, r) {
		var i = n.type.getDerivedStateFromError;
		if (typeof i == "function") {
			var a = r.value;
			e.payload = function() {
				return i(a);
			}, e.callback = function() {
				Zs(t, n, r);
			};
		}
		var o = n.stateNode;
		o !== null && typeof o.componentDidCatch == "function" && (e.callback = function() {
			Zs(t, n, r), typeof i != "function" && (ru === null ? ru = new Set([this]) : ru.add(this));
			var e = r.stack;
			this.componentDidCatch(r.value, { componentStack: e === null ? "" : e });
		});
	}
	function tc(e, t, n, r, a) {
		if (n.flags |= 32768, typeof r == "object" && r && typeof r.then == "function") {
			if (t = n.alternate, t !== null && ea(t, n, a, !0), n = to.current, n !== null) {
				switch (n.tag) {
					case 31:
					case 13: return no === null ? Du() : n.alternate === null && Wl === 0 && (Wl = 3), n.flags &= -257, n.flags |= 65536, n.lanes = a, r === Ea ? n.flags |= 16384 : (t = n.updateQueue, t === null ? n.updateQueue = new Set([r]) : t.add(r), Gu(e, r, a)), !1;
					case 22: return n.flags |= 65536, r === Ea ? n.flags |= 16384 : (t = n.updateQueue, t === null ? (t = {
						transitions: null,
						markerInstances: null,
						retryQueue: new Set([r])
					}, n.updateQueue = t) : (n = t.retryQueue, n === null ? t.retryQueue = new Set([r]) : n.add(r)), Gu(e, r, a)), !1;
				}
				throw Error(i(435, n.tag));
			}
			return Gu(e, r, a), Du(), !1;
		}
		if (L) return t = to.current, t === null ? (r !== zi && (t = Error(i(423), { cause: r }), Ki(xi(t, n))), e = e.current.alternate, e.flags |= 65536, a &= -a, e.lanes |= a, r = xi(r, n), a = Qs(e.stateNode, r, a), Wa(e, a), Wl !== 4 && (Wl = 2)) : (!(t.flags & 65536) && (t.flags |= 256), t.flags |= 65536, t.lanes = a, r !== zi && (e = Error(i(422), { cause: r }), Ki(xi(e, n)))), !1;
		var o = Error(i(520), { cause: r });
		if (o = xi(o, n), Xl === null ? Xl = [o] : Xl.push(o), Wl !== 4 && (Wl = 2), t === null) return !0;
		r = xi(r, n), n = t;
		do {
			switch (n.tag) {
				case 3: return n.flags |= 65536, e = a & -a, n.lanes |= e, e = Qs(n.stateNode, r, e), Wa(n, e), !1;
				case 1: if (t = n.type, o = n.stateNode, !(n.flags & 128) && (typeof t.getDerivedStateFromError == "function" || o !== null && typeof o.componentDidCatch == "function" && (ru === null || !ru.has(o)))) return n.flags |= 65536, a &= -a, n.lanes |= a, a = $s(a), ec(a, e, n, r), Wa(n, a), !1;
			}
			n = n.return;
		} while (n !== null);
		return !1;
	}
	var nc = Error(i(461)), rc = !1;
	function ic(e, t, n, r) {
		t.child = e === null ? Ra(t, null, n, r) : La(t, e.child, n, r);
	}
	function ac(e, t, n, r, i) {
		n = n.render;
		var a = t.ref;
		if ("ref" in r) {
			var o = {};
			for (var s in r) s !== "ref" && (o[s] = r[s]);
		} else o = r;
		return na(t), r = So(e, t, n, o, a, i), s = Eo(), e !== null && !rc ? (Do(e, t, i), kc(e, t, i)) : (L && s && Ni(t), t.flags |= 1, ic(e, t, r, i), t.child);
	}
	function oc(e, t, n, r, i) {
		if (e === null) {
			var a = n.type;
			return typeof a == "function" && !fi(a) && a.defaultProps === void 0 && n.compare === null ? (t.tag = 15, t.type = a, sc(e, t, a, r, i)) : (e = hi(n.type, null, r, t, t.mode, i), e.ref = t.ref, e.return = t, t.child = e);
		}
		if (a = e.child, !Ac(e, i)) {
			var o = a.memoizedProps;
			if (n = n.compare, n = n === null ? Er : n, n(o, r) && e.ref === t.ref) return kc(e, t, i);
		}
		return t.flags |= 1, e = pi(a, r), e.ref = t.ref, e.return = t, t.child = e;
	}
	function sc(e, t, n, r, i) {
		if (e !== null) {
			var a = e.memoizedProps;
			if (Er(a, r) && e.ref === t.ref) if (rc = !1, t.pendingProps = r = a, Ac(e, i)) e.flags & 131072 && (rc = !0);
			else return t.lanes = e.lanes, kc(e, t, i);
		}
		return hc(e, t, n, r, i);
	}
	function cc(e, t, n, r) {
		var i = r.children, a = e === null ? null : e.memoizedState;
		if (e === null && t.stateNode === null && (t.stateNode = {
			_visibility: 1,
			_pendingMarkers: null,
			_retryCache: null,
			_transitions: null
		}), r.mode === "hidden") {
			if (t.flags & 128) {
				if (a = a === null ? n : a.baseLanes | n, e !== null) {
					for (r = t.child = e.child, i = 0; r !== null;) i = i | r.lanes | r.childLanes, r = r.sibling;
					r = i & ~a;
				} else r = 0, t.child = null;
				return uc(e, t, a, n, r);
			}
			if (n & 536870912) t.memoizedState = {
				baseLanes: 0,
				cachePool: null
			}, e !== null && xa(t, a === null ? null : a.cachePool), a === null ? $a() : Qa(t, a), ao(t);
			else return r = t.lanes = 536870912, uc(e, t, a === null ? n : a.baseLanes | n, n, r);
		} else a === null ? (e !== null && xa(t, null), $a(), oo(t)) : (xa(t, a.cachePool), Qa(t, a), oo(t), t.memoizedState = null);
		return ic(e, t, i, n), t.child;
	}
	function lc(e, t) {
		return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
			_visibility: 1,
			_pendingMarkers: null,
			_retryCache: null,
			_transitions: null
		}), t.sibling;
	}
	function uc(e, t, n, r, i) {
		var a = ba();
		return a = a === null ? null : {
			parent: ca._currentValue,
			pool: a
		}, t.memoizedState = {
			baseLanes: n,
			cachePool: a
		}, e !== null && xa(t, null), $a(), ao(t), e !== null && ea(e, t, r, !0), t.childLanes = i, null;
	}
	function dc(e, t) {
		return t = wc({
			mode: t.mode,
			children: t.children
		}, e.mode), t.ref = e.ref, e.child = t, t.return = e, t;
	}
	function fc(e, t, n) {
		return La(t, e.child, null, n), e = dc(t, t.pendingProps), e.flags |= 2, so(t), t.memoizedState = null, e;
	}
	function pc(e, t, n) {
		var r = t.pendingProps, a = (t.flags & 128) != 0;
		if (t.flags &= -129, e === null) {
			if (L) {
				if (r.mode === "hidden") return e = dc(t, r), t.lanes = 536870912, lc(null, e);
				if (io(t), (e = I) ? (e = rf(e, Ri), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: Oi === null ? null : {
						id: ki,
						overflow: Ai
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = vi(e), n.return = t, t.child = n, Ii = t, I = null)) : e = null, e === null) throw Bi(t);
				return t.lanes = 536870912, null;
			}
			return dc(t, r);
		}
		var o = e.memoizedState;
		if (o !== null) {
			var s = o.dehydrated;
			if (io(t), a) if (t.flags & 256) t.flags &= -257, t = fc(e, t, n);
			else if (t.memoizedState !== null) t.child = e.child, t.flags |= 128, t = null;
			else throw Error(i(558));
			else if (rc || ea(e, t, n, !1), a = (n & e.childLanes) !== 0, rc || a) {
				if (r = q, r !== null && (s = ot(r, n), s !== 0 && s !== o.retryLane)) throw o.retryLane = s, oi(e, s), hu(r, e, s), nc;
				Du(), t = fc(e, t, n);
			} else e = o.treeContext, I = cf(s.nextSibling), Ii = t, L = !0, Li = null, Ri = !1, e !== null && Fi(t, e), t = dc(t, r), t.flags |= 4096;
			return t;
		}
		return e = pi(e.child, {
			mode: r.mode,
			children: r.children
		}), e.ref = t.ref, t.child = e, e.return = t, e;
	}
	function mc(e, t) {
		var n = t.ref;
		if (n === null) e !== null && e.ref !== null && (t.flags |= 4194816);
		else {
			if (typeof n != "function" && typeof n != "object") throw Error(i(284));
			(e === null || e.ref !== n) && (t.flags |= 4194816);
		}
	}
	function hc(e, t, n, r, i) {
		return na(t), n = So(e, t, n, r, void 0, i), r = Eo(), e !== null && !rc ? (Do(e, t, i), kc(e, t, i)) : (L && r && Ni(t), t.flags |= 1, ic(e, t, n, i), t.child);
	}
	function gc(e, t, n, r, i, a) {
		return na(t), t.updateQueue = null, n = wo(t, r, n, i), Co(e), r = Eo(), e !== null && !rc ? (Do(e, t, a), kc(e, t, a)) : (L && r && Ni(t), t.flags |= 1, ic(e, t, n, a), t.child);
	}
	function _c(e, t, n, r, i) {
		if (na(t), t.stateNode === null) {
			var a = li, o = n.contextType;
			typeof o == "object" && o && (a = R(o)), a = new n(r, a), t.memoizedState = a.state !== null && a.state !== void 0 ? a.state : null, a.updater = Us, t.stateNode = a, a._reactInternals = t, a = t.stateNode, a.props = r, a.state = t.memoizedState, a.refs = {}, Ba(t), o = n.contextType, a.context = typeof o == "object" && o ? R(o) : li, a.state = t.memoizedState, o = n.getDerivedStateFromProps, typeof o == "function" && (Hs(t, n, o, r), a.state = t.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof a.getSnapshotBeforeUpdate == "function" || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (o = a.state, typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount(), o !== a.state && Us.enqueueReplaceState(a, a.state, null), qa(t, r, a, i), Ka(), a.state = t.memoizedState), typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !0;
		} else if (e === null) {
			a = t.stateNode;
			var s = t.memoizedProps, c = Ks(n, s);
			a.props = c;
			var l = a.context, u = n.contextType;
			o = li, typeof u == "object" && u && (o = R(u));
			var d = n.getDerivedStateFromProps;
			u = typeof d == "function" || typeof a.getSnapshotBeforeUpdate == "function", s = t.pendingProps !== s, u || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (s || l !== o) && Gs(t, a, r, o), za = !1;
			var f = t.memoizedState;
			a.state = f, qa(t, r, a, i), Ka(), l = t.memoizedState, s || f !== l || za ? (typeof d == "function" && (Hs(t, n, d, r), l = t.memoizedState), (c = za || Ws(t, n, c, r, f, l, o)) ? (u || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount()), typeof a.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = l), a.props = r, a.state = l, a.context = o, r = c) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
		} else {
			a = t.stateNode, Va(e, t), o = t.memoizedProps, u = Ks(n, o), a.props = u, d = t.pendingProps, f = a.context, l = n.contextType, c = li, typeof l == "object" && l && (c = R(l)), s = n.getDerivedStateFromProps, (l = typeof s == "function" || typeof a.getSnapshotBeforeUpdate == "function") || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (o !== d || f !== c) && Gs(t, a, r, c), za = !1, f = t.memoizedState, a.state = f, qa(t, r, a, i), Ka();
			var p = t.memoizedState;
			o !== d || f !== p || za || e !== null && e.dependencies !== null && ta(e.dependencies) ? (typeof s == "function" && (Hs(t, n, s, r), p = t.memoizedState), (u = za || Ws(t, n, u, r, f, p, c) || e !== null && e.dependencies !== null && ta(e.dependencies)) ? (l || typeof a.UNSAFE_componentWillUpdate != "function" && typeof a.componentWillUpdate != "function" || (typeof a.componentWillUpdate == "function" && a.componentWillUpdate(r, p, c), typeof a.UNSAFE_componentWillUpdate == "function" && a.UNSAFE_componentWillUpdate(r, p, c)), typeof a.componentDidUpdate == "function" && (t.flags |= 4), typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = p), a.props = r, a.state = p, a.context = c, r = u) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), r = !1);
		}
		return a = r, mc(e, t), r = (t.flags & 128) != 0, a || r ? (a = t.stateNode, n = r && typeof n.getDerivedStateFromError != "function" ? null : a.render(), t.flags |= 1, e !== null && r ? (t.child = La(t, e.child, null, i), t.child = La(t, null, n, i)) : ic(e, t, n, i), t.memoizedState = a.state, e = t.child) : e = kc(e, t, i), e;
	}
	function vc(e, t, n, r) {
		return Wi(), t.flags |= 256, ic(e, t, n, r), t.child;
	}
	var yc = {
		dehydrated: null,
		treeContext: null,
		retryLane: 0,
		hydrationErrors: null
	};
	function bc(e) {
		return {
			baseLanes: e,
			cachePool: Sa()
		};
	}
	function xc(e, t, n) {
		return e = e === null ? 0 : e.childLanes & ~n, t && (e |= Jl), e;
	}
	function Sc(e, t, n) {
		var r = t.pendingProps, a = !1, o = (t.flags & 128) != 0, s;
		if ((s = o) || (s = e !== null && e.memoizedState === null ? !1 : (co.current & 2) != 0), s && (a = !0, t.flags &= -129), s = (t.flags & 32) != 0, t.flags &= -33, e === null) {
			if (L) {
				if (a ? ro(t) : oo(t), (e = I) ? (e = rf(e, Ri), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: Oi === null ? null : {
						id: ki,
						overflow: Ai
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = vi(e), n.return = t, t.child = n, Ii = t, I = null)) : e = null, e === null) throw Bi(t);
				return of(e) ? t.lanes = 32 : t.lanes = 536870912, null;
			}
			var c = r.children;
			return r = r.fallback, a ? (oo(t), a = t.mode, c = wc({
				mode: "hidden",
				children: c
			}, a), r = gi(r, a, n, null), c.return = t, r.return = t, c.sibling = r, t.child = c, r = t.child, r.memoizedState = bc(n), r.childLanes = xc(e, s, n), t.memoizedState = yc, lc(null, r)) : (ro(t), Cc(t, c));
		}
		var l = e.memoizedState;
		if (l !== null && (c = l.dehydrated, c !== null)) {
			if (o) t.flags & 256 ? (ro(t), t.flags &= -257, t = Tc(e, t, n)) : t.memoizedState === null ? (oo(t), c = r.fallback, a = t.mode, r = wc({
				mode: "visible",
				children: r.children
			}, a), c = gi(c, a, n, null), c.flags |= 2, r.return = t, c.return = t, r.sibling = c, t.child = r, La(t, e.child, null, n), r = t.child, r.memoizedState = bc(n), r.childLanes = xc(e, s, n), t.memoizedState = yc, t = lc(null, r)) : (oo(t), t.child = e.child, t.flags |= 128, t = null);
			else if (ro(t), of(c)) {
				if (s = c.nextSibling && c.nextSibling.dataset, s) var u = s.dgst;
				s = u, r = Error(i(419)), r.stack = "", r.digest = s, Ki({
					value: r,
					source: null,
					stack: null
				}), t = Tc(e, t, n);
			} else if (rc || ea(e, t, n, !1), s = (n & e.childLanes) !== 0, rc || s) {
				if (s = q, s !== null && (r = ot(s, n), r !== 0 && r !== l.retryLane)) throw l.retryLane = r, oi(e, r), hu(s, e, r), nc;
				af(c) || Du(), t = Tc(e, t, n);
			} else af(c) ? (t.flags |= 192, t.child = e.child, t = null) : (e = l.treeContext, I = cf(c.nextSibling), Ii = t, L = !0, Li = null, Ri = !1, e !== null && Fi(t, e), t = Cc(t, r.children), t.flags |= 4096);
			return t;
		}
		return a ? (oo(t), c = r.fallback, a = t.mode, l = e.child, u = l.sibling, r = pi(l, {
			mode: "hidden",
			children: r.children
		}), r.subtreeFlags = l.subtreeFlags & 65011712, u === null ? (c = gi(c, a, n, null), c.flags |= 2) : c = pi(u, c), c.return = t, r.return = t, r.sibling = c, t.child = r, lc(null, r), r = t.child, c = e.child.memoizedState, c === null ? c = bc(n) : (a = c.cachePool, a === null ? a = Sa() : (l = ca._currentValue, a = a.parent === l ? a : {
			parent: l,
			pool: l
		}), c = {
			baseLanes: c.baseLanes | n,
			cachePool: a
		}), r.memoizedState = c, r.childLanes = xc(e, s, n), t.memoizedState = yc, lc(e.child, r)) : (ro(t), n = e.child, e = n.sibling, n = pi(n, {
			mode: "visible",
			children: r.children
		}), n.return = t, n.sibling = null, e !== null && (s = t.deletions, s === null ? (t.deletions = [e], t.flags |= 16) : s.push(e)), t.child = n, t.memoizedState = null, n);
	}
	function Cc(e, t) {
		return t = wc({
			mode: "visible",
			children: t
		}, e.mode), t.return = e, e.child = t;
	}
	function wc(e, t) {
		return e = di(22, e, null, t), e.lanes = 0, e;
	}
	function Tc(e, t, n) {
		return La(t, e.child, null, n), e = Cc(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
	}
	function Ec(e, t, n) {
		e.lanes |= t;
		var r = e.alternate;
		r !== null && (r.lanes |= t), Qi(e.return, t, n);
	}
	function Dc(e, t, n, r, i, a) {
		var o = e.memoizedState;
		o === null ? e.memoizedState = {
			isBackwards: t,
			rendering: null,
			renderingStartTime: 0,
			last: r,
			tail: n,
			tailMode: i,
			treeForkCount: a
		} : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = i, o.treeForkCount = a);
	}
	function Oc(e, t, n) {
		var r = t.pendingProps, i = r.revealOrder, a = r.tail;
		r = r.children;
		var o = co.current, s = (o & 2) != 0;
		if (s ? (o = o & 1 | 2, t.flags |= 128) : o &= 1, j(co, o), ic(e, t, r, n), r = L ? Ti : 0, !s && e !== null && e.flags & 128) a: for (e = t.child; e !== null;) {
			if (e.tag === 13) e.memoizedState !== null && Ec(e, n, t);
			else if (e.tag === 19) Ec(e, n, t);
			else if (e.child !== null) {
				e.child.return = e, e = e.child;
				continue;
			}
			if (e === t) break a;
			for (; e.sibling === null;) {
				if (e.return === null || e.return === t) break a;
				e = e.return;
			}
			e.sibling.return = e.return, e = e.sibling;
		}
		switch (i) {
			case "forwards":
				for (n = t.child, i = null; n !== null;) e = n.alternate, e !== null && lo(e) === null && (i = n), n = n.sibling;
				n = i, n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null), Dc(t, !1, i, n, a, r);
				break;
			case "backwards":
			case "unstable_legacy-backwards":
				for (n = null, i = t.child, t.child = null; i !== null;) {
					if (e = i.alternate, e !== null && lo(e) === null) {
						t.child = i;
						break;
					}
					e = i.sibling, i.sibling = n, n = i, i = e;
				}
				Dc(t, !0, n, null, a, r);
				break;
			case "together":
				Dc(t, !1, null, null, void 0, r);
				break;
			default: t.memoizedState = null;
		}
		return t.child;
	}
	function kc(e, t, n) {
		if (e !== null && (t.dependencies = e.dependencies), Gl |= t.lanes, (n & t.childLanes) === 0) if (e !== null) {
			if (ea(e, t, n, !1), (n & t.childLanes) === 0) return null;
		} else return null;
		if (e !== null && t.child !== e.child) throw Error(i(153));
		if (t.child !== null) {
			for (e = t.child, n = pi(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null;) e = e.sibling, n = n.sibling = pi(e, e.pendingProps), n.return = t;
			n.sibling = null;
		}
		return t.child;
	}
	function Ac(e, t) {
		return (e.lanes & t) === 0 ? (e = e.dependencies, !!(e !== null && ta(e))) : !0;
	}
	function jc(e, t, n) {
		switch (t.tag) {
			case 3:
				M(t, t.stateNode.containerInfo), Xi(t, ca, e.memoizedState.cache), Wi();
				break;
			case 27:
			case 5:
				_e(t);
				break;
			case 4:
				M(t, t.stateNode.containerInfo);
				break;
			case 10:
				Xi(t, t.type, t.memoizedProps.value);
				break;
			case 31:
				if (t.memoizedState !== null) return t.flags |= 128, io(t), null;
				break;
			case 13:
				var r = t.memoizedState;
				if (r !== null) return r.dehydrated === null ? (n & t.child.childLanes) === 0 ? (ro(t), e = kc(e, t, n), e === null ? null : e.sibling) : Sc(e, t, n) : (ro(t), t.flags |= 128, null);
				ro(t);
				break;
			case 19:
				var i = (e.flags & 128) != 0;
				if (r = (n & t.childLanes) !== 0, r ||= (ea(e, t, n, !1), (n & t.childLanes) !== 0), i) {
					if (r) return Oc(e, t, n);
					t.flags |= 128;
				}
				if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), j(co, co.current), r) break;
				return null;
			case 22: return t.lanes = 0, cc(e, t, n, t.pendingProps);
			case 24: Xi(t, ca, e.memoizedState.cache);
		}
		return kc(e, t, n);
	}
	function Mc(e, t, n) {
		if (e !== null) if (e.memoizedProps !== t.pendingProps) rc = !0;
		else {
			if (!Ac(e, n) && !(t.flags & 128)) return rc = !1, jc(e, t, n);
			rc = !!(e.flags & 131072);
		}
		else rc = !1, L && t.flags & 1048576 && Mi(t, Ti, t.index);
		switch (t.lanes = 0, t.tag) {
			case 16:
				a: {
					var r = t.pendingProps;
					if (e = ka(t.elementType), t.type = e, typeof e == "function") fi(e) ? (r = Ks(e, r), t.tag = 1, t = _c(null, t, e, r, n)) : (t.tag = 0, t = hc(null, t, e, r, n));
					else {
						if (e != null) {
							var a = e.$$typeof;
							if (a === S) {
								t.tag = 11, t = ac(null, t, e, r, n);
								break a;
							} else if (a === ie) {
								t.tag = 14, t = oc(null, t, e, r, n);
								break a;
							}
						}
						throw t = T(e) || e, Error(i(306, t, ""));
					}
				}
				return t;
			case 0: return hc(e, t, t.type, t.pendingProps, n);
			case 1: return r = t.type, a = Ks(r, t.pendingProps), _c(e, t, r, a, n);
			case 3:
				a: {
					if (M(t, t.stateNode.containerInfo), e === null) throw Error(i(387));
					r = t.pendingProps;
					var o = t.memoizedState;
					a = o.element, Va(e, t), qa(t, r, null, n);
					var s = t.memoizedState;
					if (r = s.cache, Xi(t, ca, r), r !== o.cache && $i(t, [ca], n, !0), Ka(), r = s.element, o.isDehydrated) if (o = {
						element: r,
						isDehydrated: !1,
						cache: s.cache
					}, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
						t = vc(e, t, r, n);
						break a;
					} else if (r !== a) {
						a = xi(Error(i(424)), t), Ki(a), t = vc(e, t, r, n);
						break a;
					} else {
						switch (e = t.stateNode.containerInfo, e.nodeType) {
							case 9:
								e = e.body;
								break;
							default: e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
						}
						for (I = cf(e.firstChild), Ii = t, L = !0, Li = null, Ri = !0, n = Ra(t, null, r, n), t.child = n; n;) n.flags = n.flags & -3 | 4096, n = n.sibling;
					}
					else {
						if (Wi(), r === a) {
							t = kc(e, t, n);
							break a;
						}
						ic(e, t, r, n);
					}
					t = t.child;
				}
				return t;
			case 26: return mc(e, t), e === null ? (n = kf(t.type, null, t.pendingProps, null)) ? t.memoizedState = n : L || (n = t.type, e = t.pendingProps, r = Bd(me.current).createElement(n), r[dt] = t, r[ft] = e, Pd(r, n, e), Ct(r), t.stateNode = r) : t.memoizedState = kf(t.type, e.memoizedProps, t.pendingProps, e.memoizedState), null;
			case 27: return _e(t), e === null && L && (r = t.stateNode = ff(t.type, t.pendingProps, me.current), Ii = t, Ri = !0, a = I, Zd(t.type) ? (lf = a, I = cf(r.firstChild)) : I = a), ic(e, t, t.pendingProps.children, n), mc(e, t), e === null && (t.flags |= 4194304), t.child;
			case 5: return e === null && L && ((a = r = I) && (r = tf(r, t.type, t.pendingProps, Ri), r === null ? a = !1 : (t.stateNode = r, Ii = t, I = cf(r.firstChild), Ri = !1, a = !0)), a || Bi(t)), _e(t), a = t.type, o = t.pendingProps, s = e === null ? null : e.memoizedProps, r = o.children, Ud(a, o) ? r = null : s !== null && Ud(a, s) && (t.flags |= 32), t.memoizedState !== null && (a = So(e, t, To, null, null, n), Qf._currentValue = a), mc(e, t), ic(e, t, r, n), t.child;
			case 6: return e === null && L && ((e = n = I) && (n = nf(n, t.pendingProps, Ri), n === null ? e = !1 : (t.stateNode = n, Ii = t, I = null, e = !0)), e || Bi(t)), null;
			case 13: return Sc(e, t, n);
			case 4: return M(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = La(t, null, r, n) : ic(e, t, r, n), t.child;
			case 11: return ac(e, t, t.type, t.pendingProps, n);
			case 7: return ic(e, t, t.pendingProps, n), t.child;
			case 8: return ic(e, t, t.pendingProps.children, n), t.child;
			case 12: return ic(e, t, t.pendingProps.children, n), t.child;
			case 10: return r = t.pendingProps, Xi(t, t.type, r.value), ic(e, t, r.children, n), t.child;
			case 9: return a = t.type._context, r = t.pendingProps.children, na(t), a = R(a), r = r(a), t.flags |= 1, ic(e, t, r, n), t.child;
			case 14: return oc(e, t, t.type, t.pendingProps, n);
			case 15: return sc(e, t, t.type, t.pendingProps, n);
			case 19: return Oc(e, t, n);
			case 31: return pc(e, t, n);
			case 22: return cc(e, t, n, t.pendingProps);
			case 24: return na(t), r = R(ca), e === null ? (a = ba(), a === null && (a = q, o = la(), a.pooledCache = o, o.refCount++, o !== null && (a.pooledCacheLanes |= n), a = o), t.memoizedState = {
				parent: r,
				cache: a
			}, Ba(t), Xi(t, ca, a)) : ((e.lanes & n) !== 0 && (Va(e, t), qa(t, null, null, n), Ka()), a = e.memoizedState, o = t.memoizedState, a.parent === r ? (r = o.cache, Xi(t, ca, r), r !== a.cache && $i(t, [ca], n, !0)) : (a = {
				parent: r,
				cache: r
			}, t.memoizedState = a, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = a), Xi(t, ca, r))), ic(e, t, t.pendingProps.children, n), t.child;
			case 29: throw t.pendingProps;
		}
		throw Error(i(156, t.tag));
	}
	function Nc(e) {
		e.flags |= 4;
	}
	function Pc(e, t, n, r, i) {
		if ((t = (e.mode & 32) != 0) && (t = !1), t) {
			if (e.flags |= 16777216, (i & 335544128) === i) if (e.stateNode.complete) e.flags |= 8192;
			else if (wu()) e.flags |= 8192;
			else throw Aa = Ea, wa;
		} else e.flags &= -16777217;
	}
	function Fc(e, t) {
		if (t.type !== "stylesheet" || t.state.loading & 4) e.flags &= -16777217;
		else if (e.flags |= 16777216, !Wf(t)) if (wu()) e.flags |= 8192;
		else throw Aa = Ea, wa;
	}
	function Ic(e, t) {
		t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag === 22 ? 536870912 : et(), e.lanes |= t, Yl |= t);
	}
	function Lc(e, t) {
		if (!L) switch (e.tailMode) {
			case "hidden":
				t = e.tail;
				for (var n = null; t !== null;) t.alternate !== null && (n = t), t = t.sibling;
				n === null ? e.tail = null : n.sibling = null;
				break;
			case "collapsed":
				n = e.tail;
				for (var r = null; n !== null;) n.alternate !== null && (r = n), n = n.sibling;
				r === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null;
		}
	}
	function W(e) {
		var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
		if (t) for (var i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags & 65011712, r |= i.flags & 65011712, i.return = e, i = i.sibling;
		else for (i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags, r |= i.flags, i.return = e, i = i.sibling;
		return e.subtreeFlags |= r, e.childLanes = n, t;
	}
	function Rc(e, t, n) {
		var r = t.pendingProps;
		switch (Pi(t), t.tag) {
			case 16:
			case 15:
			case 0:
			case 11:
			case 7:
			case 8:
			case 12:
			case 9:
			case 14: return W(t), null;
			case 1: return W(t), null;
			case 3: return n = t.stateNode, r = null, e !== null && (r = e.memoizedState.cache), t.memoizedState.cache !== r && (t.flags |= 2048), Zi(ca), ge(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (Ui(t) ? Nc(t) : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Gi())), W(t), null;
			case 26:
				var a = t.type, o = t.memoizedState;
				return e === null ? (Nc(t), o === null ? (W(t), Pc(t, a, null, r, n)) : (W(t), Fc(t, o))) : o ? o === e.memoizedState ? (W(t), t.flags &= -16777217) : (Nc(t), W(t), Fc(t, o)) : (e = e.memoizedProps, e !== r && Nc(t), W(t), Pc(t, a, e, r, n)), null;
			case 27:
				if (ve(t), n = me.current, a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && Nc(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return W(t), null;
					}
					e = fe.current, Ui(t) ? Vi(t, e) : (e = ff(a, r, n), t.stateNode = e, Nc(t));
				}
				return W(t), null;
			case 5:
				if (ve(t), a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && Nc(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return W(t), null;
					}
					if (o = fe.current, Ui(t)) Vi(t, o);
					else {
						var s = Bd(me.current);
						switch (o) {
							case 1:
								o = s.createElementNS("http://www.w3.org/2000/svg", a);
								break;
							case 2:
								o = s.createElementNS("http://www.w3.org/1998/Math/MathML", a);
								break;
							default: switch (a) {
								case "svg":
									o = s.createElementNS("http://www.w3.org/2000/svg", a);
									break;
								case "math":
									o = s.createElementNS("http://www.w3.org/1998/Math/MathML", a);
									break;
								case "script":
									o = s.createElement("div"), o.innerHTML = "<script><\/script>", o = o.removeChild(o.firstChild);
									break;
								case "select":
									o = typeof r.is == "string" ? s.createElement("select", { is: r.is }) : s.createElement("select"), r.multiple ? o.multiple = !0 : r.size && (o.size = r.size);
									break;
								default: o = typeof r.is == "string" ? s.createElement(a, { is: r.is }) : s.createElement(a);
							}
						}
						o[dt] = t, o[ft] = r;
						a: for (s = t.child; s !== null;) {
							if (s.tag === 5 || s.tag === 6) o.appendChild(s.stateNode);
							else if (s.tag !== 4 && s.tag !== 27 && s.child !== null) {
								s.child.return = s, s = s.child;
								continue;
							}
							if (s === t) break a;
							for (; s.sibling === null;) {
								if (s.return === null || s.return === t) break a;
								s = s.return;
							}
							s.sibling.return = s.return, s = s.sibling;
						}
						t.stateNode = o;
						a: switch (Pd(o, a, r), a) {
							case "button":
							case "input":
							case "select":
							case "textarea":
								r = !!r.autoFocus;
								break a;
							case "img":
								r = !0;
								break a;
							default: r = !1;
						}
						r && Nc(t);
					}
				}
				return W(t), Pc(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, n), null;
			case 6:
				if (e && t.stateNode != null) e.memoizedProps !== r && Nc(t);
				else {
					if (typeof r != "string" && t.stateNode === null) throw Error(i(166));
					if (e = me.current, Ui(t)) {
						if (e = t.stateNode, n = t.memoizedProps, r = null, a = Ii, a !== null) switch (a.tag) {
							case 27:
							case 5: r = a.memoizedProps;
						}
						e[dt] = t, e = !!(e.nodeValue === n || r !== null && !0 === r.suppressHydrationWarning || Md(e.nodeValue, n)), e || Bi(t, !0);
					} else e = Bd(e).createTextNode(r), e[dt] = t, t.stateNode = e;
				}
				return W(t), null;
			case 31:
				if (n = t.memoizedState, e === null || e.memoizedState !== null) {
					if (r = Ui(t), n !== null) {
						if (e === null) {
							if (!r) throw Error(i(318));
							if (e = t.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(557));
							e[dt] = t;
						} else Wi(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						W(t), e = !1;
					} else n = Gi(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), e = !0;
					if (!e) return t.flags & 256 ? (so(t), t) : (so(t), null);
					if (t.flags & 128) throw Error(i(558));
				}
				return W(t), null;
			case 13:
				if (r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
					if (a = Ui(t), r !== null && r.dehydrated !== null) {
						if (e === null) {
							if (!a) throw Error(i(318));
							if (a = t.memoizedState, a = a === null ? null : a.dehydrated, !a) throw Error(i(317));
							a[dt] = t;
						} else Wi(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						W(t), a = !1;
					} else a = Gi(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a), a = !0;
					if (!a) return t.flags & 256 ? (so(t), t) : (so(t), null);
				}
				return so(t), t.flags & 128 ? (t.lanes = n, t) : (n = r !== null, e = e !== null && e.memoizedState !== null, n && (r = t.child, a = null, r.alternate !== null && r.alternate.memoizedState !== null && r.alternate.memoizedState.cachePool !== null && (a = r.alternate.memoizedState.cachePool.pool), o = null, r.memoizedState !== null && r.memoizedState.cachePool !== null && (o = r.memoizedState.cachePool.pool), o !== a && (r.flags |= 2048)), n !== e && n && (t.child.flags |= 8192), Ic(t, t.updateQueue), W(t), null);
			case 4: return ge(), e === null && Sd(t.stateNode.containerInfo), W(t), null;
			case 10: return Zi(t.type), W(t), null;
			case 19:
				if (A(co), r = t.memoizedState, r === null) return W(t), null;
				if (a = (t.flags & 128) != 0, o = r.rendering, o === null) if (a) Lc(r, !1);
				else {
					if (Wl !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null;) {
						if (o = lo(e), o !== null) {
							for (t.flags |= 128, Lc(r, !1), e = o.updateQueue, t.updateQueue = e, Ic(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null;) mi(n, e), n = n.sibling;
							return j(co, co.current & 1 | 2), L && ji(t, r.treeForkCount), t.child;
						}
						e = e.sibling;
					}
					r.tail !== null && je() > tu && (t.flags |= 128, a = !0, Lc(r, !1), t.lanes = 4194304);
				}
				else {
					if (!a) if (e = lo(o), e !== null) {
						if (t.flags |= 128, a = !0, e = e.updateQueue, t.updateQueue = e, Ic(t, e), Lc(r, !0), r.tail === null && r.tailMode === "hidden" && !o.alternate && !L) return W(t), null;
					} else 2 * je() - r.renderingStartTime > tu && n !== 536870912 && (t.flags |= 128, a = !0, Lc(r, !1), t.lanes = 4194304);
					r.isBackwards ? (o.sibling = t.child, t.child = o) : (e = r.last, e === null ? t.child = o : e.sibling = o, r.last = o);
				}
				return r.tail === null ? (W(t), null) : (e = r.tail, r.rendering = e, r.tail = e.sibling, r.renderingStartTime = je(), e.sibling = null, n = co.current, j(co, a ? n & 1 | 2 : n & 1), L && ji(t, r.treeForkCount), e);
			case 22:
			case 23: return so(t), eo(), r = t.memoizedState !== null, e === null ? r && (t.flags |= 8192) : e.memoizedState !== null !== r && (t.flags |= 8192), r ? n & 536870912 && !(t.flags & 128) && (W(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : W(t), n = t.updateQueue, n !== null && Ic(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), r = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (r = t.memoizedState.cachePool.pool), r !== n && (t.flags |= 2048), e !== null && A(ya), null;
			case 24: return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), Zi(ca), W(t), null;
			case 25: return null;
			case 30: return null;
		}
		throw Error(i(156, t.tag));
	}
	function zc(e, t) {
		switch (Pi(t), t.tag) {
			case 1: return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 3: return Zi(ca), ge(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
			case 26:
			case 27:
			case 5: return ve(t), null;
			case 31:
				if (t.memoizedState !== null) {
					if (so(t), t.alternate === null) throw Error(i(340));
					Wi();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 13:
				if (so(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
					if (t.alternate === null) throw Error(i(340));
					Wi();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 19: return A(co), null;
			case 4: return ge(), null;
			case 10: return Zi(t.type), null;
			case 22:
			case 23: return so(t), eo(), e !== null && A(ya), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 24: return Zi(ca), null;
			case 25: return null;
			default: return null;
		}
	}
	function Bc(e, t) {
		switch (Pi(t), t.tag) {
			case 3:
				Zi(ca), ge();
				break;
			case 26:
			case 27:
			case 5:
				ve(t);
				break;
			case 4:
				ge();
				break;
			case 31:
				t.memoizedState !== null && so(t);
				break;
			case 13:
				so(t);
				break;
			case 19:
				A(co);
				break;
			case 10:
				Zi(t.type);
				break;
			case 22:
			case 23:
				so(t), eo(), e !== null && A(ya);
				break;
			case 24: Zi(ca);
		}
	}
	function Vc(e, t) {
		try {
			var n = t.updateQueue, r = n === null ? null : n.lastEffect;
			if (r !== null) {
				var i = r.next;
				n = i;
				do {
					if ((n.tag & e) === e) {
						r = void 0;
						var a = n.create, o = n.inst;
						r = a(), o.destroy = r;
					}
					n = n.next;
				} while (n !== i);
			}
		} catch (e) {
			Z(t, t.return, e);
		}
	}
	function Hc(e, t, n) {
		try {
			var r = t.updateQueue, i = r === null ? null : r.lastEffect;
			if (i !== null) {
				var a = i.next;
				r = a;
				do {
					if ((r.tag & e) === e) {
						var o = r.inst, s = o.destroy;
						if (s !== void 0) {
							o.destroy = void 0, i = t;
							var c = n, l = s;
							try {
								l();
							} catch (e) {
								Z(i, c, e);
							}
						}
					}
					r = r.next;
				} while (r !== a);
			}
		} catch (e) {
			Z(t, t.return, e);
		}
	}
	function Uc(e) {
		var t = e.updateQueue;
		if (t !== null) {
			var n = e.stateNode;
			try {
				Ya(t, n);
			} catch (t) {
				Z(e, e.return, t);
			}
		}
	}
	function Wc(e, t, n) {
		n.props = Ks(e.type, e.memoizedProps), n.state = e.memoizedState;
		try {
			n.componentWillUnmount();
		} catch (n) {
			Z(e, t, n);
		}
	}
	function Gc(e, t) {
		try {
			var n = e.ref;
			if (n !== null) {
				switch (e.tag) {
					case 26:
					case 27:
					case 5:
						var r = e.stateNode;
						break;
					case 30:
						r = e.stateNode;
						break;
					default: r = e.stateNode;
				}
				typeof n == "function" ? e.refCleanup = n(r) : n.current = r;
			}
		} catch (n) {
			Z(e, t, n);
		}
	}
	function Kc(e, t) {
		var n = e.ref, r = e.refCleanup;
		if (n !== null) if (typeof r == "function") try {
			r();
		} catch (n) {
			Z(e, t, n);
		} finally {
			e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
		}
		else if (typeof n == "function") try {
			n(null);
		} catch (n) {
			Z(e, t, n);
		}
		else n.current = null;
	}
	function qc(e) {
		var t = e.type, n = e.memoizedProps, r = e.stateNode;
		try {
			a: switch (t) {
				case "button":
				case "input":
				case "select":
				case "textarea":
					n.autoFocus && r.focus();
					break a;
				case "img": n.src ? r.src = n.src : n.srcSet && (r.srcset = n.srcSet);
			}
		} catch (t) {
			Z(e, e.return, t);
		}
	}
	function Jc(e, t, n) {
		try {
			var r = e.stateNode;
			Fd(r, e.type, n, t), r[ft] = t;
		} catch (t) {
			Z(e, e.return, t);
		}
	}
	function Yc(e) {
		return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Zd(e.type) || e.tag === 4;
	}
	function Xc(e) {
		a: for (;;) {
			for (; e.sibling === null;) {
				if (e.return === null || Yc(e.return)) return null;
				e = e.return;
			}
			for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;) {
				if (e.tag === 27 && Zd(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue a;
				e.child.return = e, e = e.child;
			}
			if (!(e.flags & 2)) return e.stateNode;
		}
	}
	function Zc(e, t, n) {
		var r = e.tag;
		if (r === 5 || r === 6) e = e.stateNode, t ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(e, t) : (t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, t.appendChild(e), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = nn));
		else if (r !== 4 && (r === 27 && Zd(e.type) && (n = e.stateNode, t = null), e = e.child, e !== null)) for (Zc(e, t, n), e = e.sibling; e !== null;) Zc(e, t, n), e = e.sibling;
	}
	function Qc(e, t, n) {
		var r = e.tag;
		if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
		else if (r !== 4 && (r === 27 && Zd(e.type) && (n = e.stateNode), e = e.child, e !== null)) for (Qc(e, t, n), e = e.sibling; e !== null;) Qc(e, t, n), e = e.sibling;
	}
	function $c(e) {
		var t = e.stateNode, n = e.memoizedProps;
		try {
			for (var r = e.type, i = t.attributes; i.length;) t.removeAttributeNode(i[0]);
			Pd(t, r, n), t[dt] = e, t[ft] = n;
		} catch (t) {
			Z(e, e.return, t);
		}
	}
	var el = !1, tl = !1, nl = !1, rl = typeof WeakSet == "function" ? WeakSet : Set, il = null;
	function al(e, t) {
		if (e = e.containerInfo, Rd = sp, e = Ar(e), jr(e)) {
			if ("selectionStart" in e) var n = {
				start: e.selectionStart,
				end: e.selectionEnd
			};
			else a: {
				n = (n = e.ownerDocument) && n.defaultView || window;
				var r = n.getSelection && n.getSelection();
				if (r && r.rangeCount !== 0) {
					n = r.anchorNode;
					var a = r.anchorOffset, o = r.focusNode;
					r = r.focusOffset;
					try {
						n.nodeType, o.nodeType;
					} catch {
						n = null;
						break a;
					}
					var s = 0, c = -1, l = -1, u = 0, d = 0, f = e, p = null;
					b: for (;;) {
						for (var m; f !== n || a !== 0 && f.nodeType !== 3 || (c = s + a), f !== o || r !== 0 && f.nodeType !== 3 || (l = s + r), f.nodeType === 3 && (s += f.nodeValue.length), (m = f.firstChild) !== null;) p = f, f = m;
						for (;;) {
							if (f === e) break b;
							if (p === n && ++u === a && (c = s), p === o && ++d === r && (l = s), (m = f.nextSibling) !== null) break;
							f = p, p = f.parentNode;
						}
						f = m;
					}
					n = c === -1 || l === -1 ? null : {
						start: c,
						end: l
					};
				} else n = null;
			}
			n ||= {
				start: 0,
				end: 0
			};
		} else n = null;
		for (zd = {
			focusedElem: e,
			selectionRange: n
		}, sp = !1, il = t; il !== null;) if (t = il, e = t.child, t.subtreeFlags & 1028 && e !== null) e.return = t, il = e;
		else for (; il !== null;) {
			switch (t = il, o = t.alternate, e = t.flags, t.tag) {
				case 0:
					if (e & 4 && (e = t.updateQueue, e = e === null ? null : e.events, e !== null)) for (n = 0; n < e.length; n++) a = e[n], a.ref.impl = a.nextImpl;
					break;
				case 11:
				case 15: break;
				case 1:
					if (e & 1024 && o !== null) {
						e = void 0, n = t, a = o.memoizedProps, o = o.memoizedState, r = n.stateNode;
						try {
							var h = Ks(n.type, a);
							e = r.getSnapshotBeforeUpdate(h, o), r.__reactInternalSnapshotBeforeUpdate = e;
						} catch (e) {
							Z(n, n.return, e);
						}
					}
					break;
				case 3:
					if (e & 1024) {
						if (e = t.stateNode.containerInfo, n = e.nodeType, n === 9) ef(e);
						else if (n === 1) switch (e.nodeName) {
							case "HEAD":
							case "HTML":
							case "BODY":
								ef(e);
								break;
							default: e.textContent = "";
						}
					}
					break;
				case 5:
				case 26:
				case 27:
				case 6:
				case 4:
				case 17: break;
				default: if (e & 1024) throw Error(i(163));
			}
			if (e = t.sibling, e !== null) {
				e.return = t.return, il = e;
				break;
			}
			il = t.return;
		}
	}
	function ol(e, t, n) {
		var r = n.flags;
		switch (n.tag) {
			case 0:
			case 11:
			case 15:
				bl(e, n), r & 4 && Vc(5, n);
				break;
			case 1:
				if (bl(e, n), r & 4) if (e = n.stateNode, t === null) try {
					e.componentDidMount();
				} catch (e) {
					Z(n, n.return, e);
				}
				else {
					var i = Ks(n.type, t.memoizedProps);
					t = t.memoizedState;
					try {
						e.componentDidUpdate(i, t, e.__reactInternalSnapshotBeforeUpdate);
					} catch (e) {
						Z(n, n.return, e);
					}
				}
				r & 64 && Uc(n), r & 512 && Gc(n, n.return);
				break;
			case 3:
				if (bl(e, n), r & 64 && (e = n.updateQueue, e !== null)) {
					if (t = null, n.child !== null) switch (n.child.tag) {
						case 27:
						case 5:
							t = n.child.stateNode;
							break;
						case 1: t = n.child.stateNode;
					}
					try {
						Ya(e, t);
					} catch (e) {
						Z(n, n.return, e);
					}
				}
				break;
			case 27: t === null && r & 4 && $c(n);
			case 26:
			case 5:
				bl(e, n), t === null && r & 4 && qc(n), r & 512 && Gc(n, n.return);
				break;
			case 12:
				bl(e, n);
				break;
			case 31:
				bl(e, n), r & 4 && dl(e, n);
				break;
			case 13:
				bl(e, n), r & 4 && fl(e, n), r & 64 && (e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null && (n = Ju.bind(null, n), sf(e, n))));
				break;
			case 22:
				if (r = n.memoizedState !== null || el, !r) {
					t = t !== null && t.memoizedState !== null || tl, i = el;
					var a = tl;
					el = r, (tl = t) && !a ? Sl(e, n, (n.subtreeFlags & 8772) != 0) : bl(e, n), el = i, tl = a;
				}
				break;
			case 30: break;
			default: bl(e, n);
		}
	}
	function sl(e) {
		var t = e.alternate;
		t !== null && (e.alternate = null, sl(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && vt(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
	}
	var G = null, cl = !1;
	function ll(e, t, n) {
		for (n = n.child; n !== null;) ul(e, t, n), n = n.sibling;
	}
	function ul(e, t, n) {
		if (Ve && typeof Ve.onCommitFiberUnmount == "function") try {
			Ve.onCommitFiberUnmount(Be, n);
		} catch {}
		switch (n.tag) {
			case 26:
				tl || Kc(n, t), ll(e, t, n), n.memoizedState ? n.memoizedState.count-- : n.stateNode && (n = n.stateNode, n.parentNode.removeChild(n));
				break;
			case 27:
				tl || Kc(n, t);
				var r = G, i = cl;
				Zd(n.type) && (G = n.stateNode, cl = !1), ll(e, t, n), pf(n.stateNode), G = r, cl = i;
				break;
			case 5: tl || Kc(n, t);
			case 6:
				if (r = G, i = cl, G = null, ll(e, t, n), G = r, cl = i, G !== null) if (cl) try {
					(G.nodeType === 9 ? G.body : G.nodeName === "HTML" ? G.ownerDocument.body : G).removeChild(n.stateNode);
				} catch (e) {
					Z(n, t, e);
				}
				else try {
					G.removeChild(n.stateNode);
				} catch (e) {
					Z(n, t, e);
				}
				break;
			case 18:
				G !== null && (cl ? (e = G, Qd(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, n.stateNode), Np(e)) : Qd(G, n.stateNode));
				break;
			case 4:
				r = G, i = cl, G = n.stateNode.containerInfo, cl = !0, ll(e, t, n), G = r, cl = i;
				break;
			case 0:
			case 11:
			case 14:
			case 15:
				Hc(2, n, t), tl || Hc(4, n, t), ll(e, t, n);
				break;
			case 1:
				tl || (Kc(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function" && Wc(n, t, r)), ll(e, t, n);
				break;
			case 21:
				ll(e, t, n);
				break;
			case 22:
				tl = (r = tl) || n.memoizedState !== null, ll(e, t, n), tl = r;
				break;
			default: ll(e, t, n);
		}
	}
	function dl(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
			e = e.dehydrated;
			try {
				Np(e);
			} catch (e) {
				Z(t, t.return, e);
			}
		}
	}
	function fl(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null)))) try {
			Np(e);
		} catch (e) {
			Z(t, t.return, e);
		}
	}
	function pl(e) {
		switch (e.tag) {
			case 31:
			case 13:
			case 19:
				var t = e.stateNode;
				return t === null && (t = e.stateNode = new rl()), t;
			case 22: return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new rl()), t;
			default: throw Error(i(435, e.tag));
		}
	}
	function ml(e, t) {
		var n = pl(e);
		t.forEach(function(t) {
			if (!n.has(t)) {
				n.add(t);
				var r = Yu.bind(null, e, t);
				t.then(r, r);
			}
		});
	}
	function hl(e, t) {
		var n = t.deletions;
		if (n !== null) for (var r = 0; r < n.length; r++) {
			var a = n[r], o = e, s = t, c = s;
			a: for (; c !== null;) {
				switch (c.tag) {
					case 27:
						if (Zd(c.type)) {
							G = c.stateNode, cl = !1;
							break a;
						}
						break;
					case 5:
						G = c.stateNode, cl = !1;
						break a;
					case 3:
					case 4:
						G = c.stateNode.containerInfo, cl = !0;
						break a;
				}
				c = c.return;
			}
			if (G === null) throw Error(i(160));
			ul(o, s, a), G = null, cl = !1, o = a.alternate, o !== null && (o.return = null), a.return = null;
		}
		if (t.subtreeFlags & 13886) for (t = t.child; t !== null;) _l(t, e), t = t.sibling;
	}
	var gl = null;
	function _l(e, t) {
		var n = e.alternate, r = e.flags;
		switch (e.tag) {
			case 0:
			case 11:
			case 14:
			case 15:
				hl(t, e), vl(e), r & 4 && (Hc(3, e, e.return), Vc(3, e), Hc(5, e, e.return));
				break;
			case 1:
				hl(t, e), vl(e), r & 512 && (tl || n === null || Kc(n, n.return)), r & 64 && el && (e = e.updateQueue, e !== null && (r = e.callbacks, r !== null && (n = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = n === null ? r : n.concat(r))));
				break;
			case 26:
				var a = gl;
				if (hl(t, e), vl(e), r & 512 && (tl || n === null || Kc(n, n.return)), r & 4) {
					var o = n === null ? null : n.memoizedState;
					if (r = e.memoizedState, n === null) if (r === null) if (e.stateNode === null) {
						a: {
							r = e.type, n = e.memoizedProps, a = a.ownerDocument || a;
							b: switch (r) {
								case "title":
									o = a.getElementsByTagName("title")[0], (!o || o[_t] || o[dt] || o.namespaceURI === "http://www.w3.org/2000/svg" || o.hasAttribute("itemprop")) && (o = a.createElement(r), a.head.insertBefore(o, a.querySelector("head > title"))), Pd(o, r, n), o[dt] = e, Ct(o), r = o;
									break a;
								case "link":
									var s = Vf("link", "href", a).get(r + (n.href || ""));
									if (s) {
										for (var c = 0; c < s.length; c++) if (o = s[c], o.getAttribute("href") === (n.href == null || n.href === "" ? null : n.href) && o.getAttribute("rel") === (n.rel == null ? null : n.rel) && o.getAttribute("title") === (n.title == null ? null : n.title) && o.getAttribute("crossorigin") === (n.crossOrigin == null ? null : n.crossOrigin)) {
											s.splice(c, 1);
											break b;
										}
									}
									o = a.createElement(r), Pd(o, r, n), a.head.appendChild(o);
									break;
								case "meta":
									if (s = Vf("meta", "content", a).get(r + (n.content || ""))) {
										for (c = 0; c < s.length; c++) if (o = s[c], o.getAttribute("content") === (n.content == null ? null : "" + n.content) && o.getAttribute("name") === (n.name == null ? null : n.name) && o.getAttribute("property") === (n.property == null ? null : n.property) && o.getAttribute("http-equiv") === (n.httpEquiv == null ? null : n.httpEquiv) && o.getAttribute("charset") === (n.charSet == null ? null : n.charSet)) {
											s.splice(c, 1);
											break b;
										}
									}
									o = a.createElement(r), Pd(o, r, n), a.head.appendChild(o);
									break;
								default: throw Error(i(468, r));
							}
							o[dt] = e, Ct(o), r = o;
						}
						e.stateNode = r;
					} else Hf(a, e.type, e.stateNode);
					else e.stateNode = If(a, r, e.memoizedProps);
					else o === r ? r === null && e.stateNode !== null && Jc(e, e.memoizedProps, n.memoizedProps) : (o === null ? n.stateNode !== null && (n = n.stateNode, n.parentNode.removeChild(n)) : o.count--, r === null ? Hf(a, e.type, e.stateNode) : If(a, r, e.memoizedProps));
				}
				break;
			case 27:
				hl(t, e), vl(e), r & 512 && (tl || n === null || Kc(n, n.return)), n !== null && r & 4 && Jc(e, e.memoizedProps, n.memoizedProps);
				break;
			case 5:
				if (hl(t, e), vl(e), r & 512 && (tl || n === null || Kc(n, n.return)), e.flags & 32) {
					a = e.stateNode;
					try {
						Jt(a, "");
					} catch (t) {
						Z(e, e.return, t);
					}
				}
				r & 4 && e.stateNode != null && (a = e.memoizedProps, Jc(e, a, n === null ? a : n.memoizedProps)), r & 1024 && (nl = !0);
				break;
			case 6:
				if (hl(t, e), vl(e), r & 4) {
					if (e.stateNode === null) throw Error(i(162));
					r = e.memoizedProps, n = e.stateNode;
					try {
						n.nodeValue = r;
					} catch (t) {
						Z(e, e.return, t);
					}
				}
				break;
			case 3:
				if (Bf = null, a = gl, gl = gf(t.containerInfo), hl(t, e), gl = a, vl(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
					Np(t.containerInfo);
				} catch (t) {
					Z(e, e.return, t);
				}
				nl && (nl = !1, yl(e));
				break;
			case 4:
				r = gl, gl = gf(e.stateNode.containerInfo), hl(t, e), vl(e), gl = r;
				break;
			case 12:
				hl(t, e), vl(e);
				break;
			case 31:
				hl(t, e), vl(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, ml(e, r)));
				break;
			case 13:
				hl(t, e), vl(e), e.child.flags & 8192 && e.memoizedState !== null != (n !== null && n.memoizedState !== null) && ($l = je()), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, ml(e, r)));
				break;
			case 22:
				a = e.memoizedState !== null;
				var l = n !== null && n.memoizedState !== null, u = el, d = tl;
				if (el = u || a, tl = d || l, hl(t, e), tl = d, el = u, vl(e), r & 8192) a: for (t = e.stateNode, t._visibility = a ? t._visibility & -2 : t._visibility | 1, a && (n === null || l || el || tl || xl(e)), n = null, t = e;;) {
					if (t.tag === 5 || t.tag === 26) {
						if (n === null) {
							l = n = t;
							try {
								if (o = l.stateNode, a) s = o.style, typeof s.setProperty == "function" ? s.setProperty("display", "none", "important") : s.display = "none";
								else {
									c = l.stateNode;
									var f = l.memoizedProps.style, p = f != null && f.hasOwnProperty("display") ? f.display : null;
									c.style.display = p == null || typeof p == "boolean" ? "" : ("" + p).trim();
								}
							} catch (e) {
								Z(l, l.return, e);
							}
						}
					} else if (t.tag === 6) {
						if (n === null) {
							l = t;
							try {
								l.stateNode.nodeValue = a ? "" : l.memoizedProps;
							} catch (e) {
								Z(l, l.return, e);
							}
						}
					} else if (t.tag === 18) {
						if (n === null) {
							l = t;
							try {
								var m = l.stateNode;
								a ? $d(m, !0) : $d(l.stateNode, !1);
							} catch (e) {
								Z(l, l.return, e);
							}
						}
					} else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === e) && t.child !== null) {
						t.child.return = t, t = t.child;
						continue;
					}
					if (t === e) break a;
					for (; t.sibling === null;) {
						if (t.return === null || t.return === e) break a;
						n === t && (n = null), t = t.return;
					}
					n === t && (n = null), t.sibling.return = t.return, t = t.sibling;
				}
				r & 4 && (r = e.updateQueue, r !== null && (n = r.retryQueue, n !== null && (r.retryQueue = null, ml(e, n))));
				break;
			case 19:
				hl(t, e), vl(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, ml(e, r)));
				break;
			case 30: break;
			case 21: break;
			default: hl(t, e), vl(e);
		}
	}
	function vl(e) {
		var t = e.flags;
		if (t & 2) {
			try {
				for (var n, r = e.return; r !== null;) {
					if (Yc(r)) {
						n = r;
						break;
					}
					r = r.return;
				}
				if (n == null) throw Error(i(160));
				switch (n.tag) {
					case 27:
						var a = n.stateNode;
						Qc(e, Xc(e), a);
						break;
					case 5:
						var o = n.stateNode;
						n.flags & 32 && (Jt(o, ""), n.flags &= -33), Qc(e, Xc(e), o);
						break;
					case 3:
					case 4:
						var s = n.stateNode.containerInfo;
						Zc(e, Xc(e), s);
						break;
					default: throw Error(i(161));
				}
			} catch (t) {
				Z(e, e.return, t);
			}
			e.flags &= -3;
		}
		t & 4096 && (e.flags &= -4097);
	}
	function yl(e) {
		if (e.subtreeFlags & 1024) for (e = e.child; e !== null;) {
			var t = e;
			yl(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
		}
	}
	function bl(e, t) {
		if (t.subtreeFlags & 8772) for (t = t.child; t !== null;) ol(e, t.alternate, t), t = t.sibling;
	}
	function xl(e) {
		for (e = e.child; e !== null;) {
			var t = e;
			switch (t.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					Hc(4, t, t.return), xl(t);
					break;
				case 1:
					Kc(t, t.return);
					var n = t.stateNode;
					typeof n.componentWillUnmount == "function" && Wc(t, t.return, n), xl(t);
					break;
				case 27: pf(t.stateNode);
				case 26:
				case 5:
					Kc(t, t.return), xl(t);
					break;
				case 22:
					t.memoizedState === null && xl(t);
					break;
				case 30:
					xl(t);
					break;
				default: xl(t);
			}
			e = e.sibling;
		}
	}
	function Sl(e, t, n) {
		for (n &&= (t.subtreeFlags & 8772) != 0, t = t.child; t !== null;) {
			var r = t.alternate, i = e, a = t, o = a.flags;
			switch (a.tag) {
				case 0:
				case 11:
				case 15:
					Sl(i, a, n), Vc(4, a);
					break;
				case 1:
					if (Sl(i, a, n), r = a, i = r.stateNode, typeof i.componentDidMount == "function") try {
						i.componentDidMount();
					} catch (e) {
						Z(r, r.return, e);
					}
					if (r = a, i = r.updateQueue, i !== null) {
						var s = r.stateNode;
						try {
							var c = i.shared.hiddenCallbacks;
							if (c !== null) for (i.shared.hiddenCallbacks = null, i = 0; i < c.length; i++) Ja(c[i], s);
						} catch (e) {
							Z(r, r.return, e);
						}
					}
					n && o & 64 && Uc(a), Gc(a, a.return);
					break;
				case 27: $c(a);
				case 26:
				case 5:
					Sl(i, a, n), n && r === null && o & 4 && qc(a), Gc(a, a.return);
					break;
				case 12:
					Sl(i, a, n);
					break;
				case 31:
					Sl(i, a, n), n && o & 4 && dl(i, a);
					break;
				case 13:
					Sl(i, a, n), n && o & 4 && fl(i, a);
					break;
				case 22:
					a.memoizedState === null && Sl(i, a, n), Gc(a, a.return);
					break;
				case 30: break;
				default: Sl(i, a, n);
			}
			t = t.sibling;
		}
	}
	function Cl(e, t) {
		var n = null;
		e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== n && (e != null && e.refCount++, n != null && ua(n));
	}
	function wl(e, t) {
		e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && ua(e));
	}
	function Tl(e, t, n, r) {
		if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) El(e, t, n, r), t = t.sibling;
	}
	function El(e, t, n, r) {
		var i = t.flags;
		switch (t.tag) {
			case 0:
			case 11:
			case 15:
				Tl(e, t, n, r), i & 2048 && Vc(9, t);
				break;
			case 1:
				Tl(e, t, n, r);
				break;
			case 3:
				Tl(e, t, n, r), i & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && ua(e)));
				break;
			case 12:
				if (i & 2048) {
					Tl(e, t, n, r), e = t.stateNode;
					try {
						var a = t.memoizedProps, o = a.id, s = a.onPostCommit;
						typeof s == "function" && s(o, t.alternate === null ? "mount" : "update", e.passiveEffectDuration, -0);
					} catch (e) {
						Z(t, t.return, e);
					}
				} else Tl(e, t, n, r);
				break;
			case 31:
				Tl(e, t, n, r);
				break;
			case 13:
				Tl(e, t, n, r);
				break;
			case 23: break;
			case 22:
				a = t.stateNode, o = t.alternate, t.memoizedState === null ? a._visibility & 2 ? Tl(e, t, n, r) : (a._visibility |= 2, Dl(e, t, n, r, (t.subtreeFlags & 10256) != 0 || !1)) : a._visibility & 2 ? Tl(e, t, n, r) : Ol(e, t), i & 2048 && Cl(o, t);
				break;
			case 24:
				Tl(e, t, n, r), i & 2048 && wl(t.alternate, t);
				break;
			default: Tl(e, t, n, r);
		}
	}
	function Dl(e, t, n, r, i) {
		for (i &&= (t.subtreeFlags & 10256) != 0 || !1, t = t.child; t !== null;) {
			var a = e, o = t, s = n, c = r, l = o.flags;
			switch (o.tag) {
				case 0:
				case 11:
				case 15:
					Dl(a, o, s, c, i), Vc(8, o);
					break;
				case 23: break;
				case 22:
					var u = o.stateNode;
					o.memoizedState === null ? (u._visibility |= 2, Dl(a, o, s, c, i)) : u._visibility & 2 ? Dl(a, o, s, c, i) : Ol(a, o), i && l & 2048 && Cl(o.alternate, o);
					break;
				case 24:
					Dl(a, o, s, c, i), i && l & 2048 && wl(o.alternate, o);
					break;
				default: Dl(a, o, s, c, i);
			}
			t = t.sibling;
		}
	}
	function Ol(e, t) {
		if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) {
			var n = e, r = t, i = r.flags;
			switch (r.tag) {
				case 22:
					Ol(n, r), i & 2048 && Cl(r.alternate, r);
					break;
				case 24:
					Ol(n, r), i & 2048 && wl(r.alternate, r);
					break;
				default: Ol(n, r);
			}
			t = t.sibling;
		}
	}
	var kl = 8192;
	function Al(e, t, n) {
		if (e.subtreeFlags & kl) for (e = e.child; e !== null;) jl(e, t, n), e = e.sibling;
	}
	function jl(e, t, n) {
		switch (e.tag) {
			case 26:
				Al(e, t, n), e.flags & kl && e.memoizedState !== null && Gf(n, gl, e.memoizedState, e.memoizedProps);
				break;
			case 5:
				Al(e, t, n);
				break;
			case 3:
			case 4:
				var r = gl;
				gl = gf(e.stateNode.containerInfo), Al(e, t, n), gl = r;
				break;
			case 22:
				e.memoizedState === null && (r = e.alternate, r !== null && r.memoizedState !== null ? (r = kl, kl = 16777216, Al(e, t, n), kl = r) : Al(e, t, n));
				break;
			default: Al(e, t, n);
		}
	}
	function Ml(e) {
		var t = e.alternate;
		if (t !== null && (e = t.child, e !== null)) {
			t.child = null;
			do
				t = e.sibling, e.sibling = null, e = t;
			while (e !== null);
		}
	}
	function Nl(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				il = r, Il(r, e);
			}
			Ml(e);
		}
		if (e.subtreeFlags & 10256) for (e = e.child; e !== null;) Pl(e), e = e.sibling;
	}
	function Pl(e) {
		switch (e.tag) {
			case 0:
			case 11:
			case 15:
				Nl(e), e.flags & 2048 && Hc(9, e, e.return);
				break;
			case 3:
				Nl(e);
				break;
			case 12:
				Nl(e);
				break;
			case 22:
				var t = e.stateNode;
				e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, Fl(e)) : Nl(e);
				break;
			default: Nl(e);
		}
	}
	function Fl(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				il = r, Il(r, e);
			}
			Ml(e);
		}
		for (e = e.child; e !== null;) {
			switch (t = e, t.tag) {
				case 0:
				case 11:
				case 15:
					Hc(8, t, t.return), Fl(t);
					break;
				case 22:
					n = t.stateNode, n._visibility & 2 && (n._visibility &= -3, Fl(t));
					break;
				default: Fl(t);
			}
			e = e.sibling;
		}
	}
	function Il(e, t) {
		for (; il !== null;) {
			var n = il;
			switch (n.tag) {
				case 0:
				case 11:
				case 15:
					Hc(8, n, t);
					break;
				case 23:
				case 22:
					if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
						var r = n.memoizedState.cachePool.pool;
						r != null && r.refCount++;
					}
					break;
				case 24: ua(n.memoizedState.cache);
			}
			if (r = n.child, r !== null) r.return = n, il = r;
			else a: for (n = e; il !== null;) {
				r = il;
				var i = r.sibling, a = r.return;
				if (sl(r), r === n) {
					il = null;
					break a;
				}
				if (i !== null) {
					i.return = a, il = i;
					break a;
				}
				il = a;
			}
		}
	}
	var Ll = {
		getCacheForType: function(e) {
			var t = R(ca), n = t.data.get(e);
			return n === void 0 && (n = e(), t.data.set(e, n)), n;
		},
		cacheSignal: function() {
			return R(ca).controller.signal;
		}
	}, Rl = typeof WeakMap == "function" ? WeakMap : Map, K = 0, q = null, J = null, Y = 0, X = 0, zl = null, Bl = !1, Vl = !1, Hl = !1, Ul = 0, Wl = 0, Gl = 0, Kl = 0, ql = 0, Jl = 0, Yl = 0, Xl = null, Zl = null, Ql = !1, $l = 0, eu = 0, tu = Infinity, nu = null, ru = null, iu = 0, au = null, ou = null, su = 0, cu = 0, lu = null, uu = null, du = 0, fu = null;
	function pu() {
		return K & 2 && Y !== 0 ? Y & -Y : D.T === null ? lt() : dd();
	}
	function mu() {
		if (Jl === 0) if (!(Y & 536870912) || L) {
			var e = Je;
			Je <<= 1, !(Je & 3932160) && (Je = 262144), Jl = e;
		} else Jl = 536870912;
		return e = to.current, e !== null && (e.flags |= 32), Jl;
	}
	function hu(e, t, n) {
		(e === q && (X === 2 || X === 9) || e.cancelPendingCommit !== null) && (Su(e, 0), yu(e, Y, Jl, !1)), nt(e, n), (!(K & 2) || e !== q) && (e === q && (!(K & 2) && (Kl |= n), Wl === 4 && yu(e, Y, Jl, !1)), rd(e));
	}
	function gu(e, t, n) {
		if (K & 6) throw Error(i(327));
		var r = !n && (t & 127) == 0 && (t & e.expiredLanes) === 0 || Qe(e, t), a = r ? Au(e, t) : Ou(e, t, !0), o = r;
		do {
			if (a === 0) {
				Vl && !r && yu(e, t, 0, !1);
				break;
			} else {
				if (n = e.current.alternate, o && !vu(n)) {
					a = Ou(e, t, !1), o = !1;
					continue;
				}
				if (a === 2) {
					if (o = t, e.errorRecoveryDisabledLanes & o) var s = 0;
					else s = e.pendingLanes & -536870913, s = s === 0 ? s & 536870912 ? 536870912 : 0 : s;
					if (s !== 0) {
						t = s;
						a: {
							var c = e;
							a = Xl;
							var l = c.current.memoizedState.isDehydrated;
							if (l && (Su(c, s).flags |= 256), s = Ou(c, s, !1), s !== 2) {
								if (Hl && !l) {
									c.errorRecoveryDisabledLanes |= o, Kl |= o, a = 4;
									break a;
								}
								o = Zl, Zl = a, o !== null && (Zl === null ? Zl = o : Zl.push.apply(Zl, o));
							}
							a = s;
						}
						if (o = !1, a !== 2) continue;
					}
				}
				if (a === 1) {
					Su(e, 0), yu(e, t, 0, !0);
					break;
				}
				a: {
					switch (r = e, o = a, o) {
						case 0:
						case 1: throw Error(i(345));
						case 4: if ((t & 4194048) !== t) break;
						case 6:
							yu(r, t, Jl, !Bl);
							break a;
						case 2:
							Zl = null;
							break;
						case 3:
						case 5: break;
						default: throw Error(i(329));
					}
					if ((t & 62914560) === t && (a = $l + 300 - je(), 10 < a)) {
						if (yu(r, t, Jl, !Bl), Ze(r, 0, !0) !== 0) break a;
						su = t, r.timeoutHandle = Kd(_u.bind(null, r, n, Zl, nu, Ql, t, Jl, Kl, Yl, Bl, o, "Throttled", -0, 0), a);
						break a;
					}
					_u(r, n, Zl, nu, Ql, t, Jl, Kl, Yl, Bl, o, null, -0, 0);
				}
			}
			break;
		} while (1);
		rd(e);
	}
	function _u(e, t, n, r, i, a, o, s, c, l, u, d, f, p) {
		if (e.timeoutHandle = -1, d = t.subtreeFlags, d & 8192 || (d & 16785408) == 16785408) {
			d = {
				stylesheets: null,
				count: 0,
				imgCount: 0,
				imgBytes: 0,
				suspenseyImages: [],
				waitingForImages: !0,
				waitingForViewTransition: !1,
				unsuspend: nn
			}, jl(t, a, d);
			var m = (a & 62914560) === a ? $l - je() : (a & 4194048) === a ? eu - je() : 0;
			if (m = qf(d, m), m !== null) {
				su = a, e.cancelPendingCommit = m(Lu.bind(null, e, t, a, n, r, i, o, s, c, u, d, null, f, p)), yu(e, a, o, !l);
				return;
			}
		}
		Lu(e, t, a, n, r, i, o, s, c);
	}
	function vu(e) {
		for (var t = e;;) {
			var n = t.tag;
			if ((n === 0 || n === 11 || n === 15) && t.flags & 16384 && (n = t.updateQueue, n !== null && (n = n.stores, n !== null))) for (var r = 0; r < n.length; r++) {
				var i = n[r], a = i.getSnapshot;
				i = i.value;
				try {
					if (!Tr(a(), i)) return !1;
				} catch {
					return !1;
				}
			}
			if (n = t.child, t.subtreeFlags & 16384 && n !== null) n.return = t, t = n;
			else {
				if (t === e) break;
				for (; t.sibling === null;) {
					if (t.return === null || t.return === e) return !0;
					t = t.return;
				}
				t.sibling.return = t.return, t = t.sibling;
			}
		}
		return !0;
	}
	function yu(e, t, n, r) {
		t &= ~ql, t &= ~Kl, e.suspendedLanes |= t, e.pingedLanes &= ~t, r && (e.warmLanes |= t), r = e.expirationTimes;
		for (var i = t; 0 < i;) {
			var a = 31 - Ue(i), o = 1 << a;
			r[a] = -1, i &= ~o;
		}
		n !== 0 && it(e, n, t);
	}
	function bu() {
		return K & 6 ? !0 : (id(0, !1), !1);
	}
	function xu() {
		if (J !== null) {
			if (X === 0) var e = J.return;
			else e = J, Yi = Ji = null, Oo(e), Na = null, Pa = 0, e = J;
			for (; e !== null;) Bc(e.alternate, e), e = e.return;
			J = null;
		}
	}
	function Su(e, t) {
		var n = e.timeoutHandle;
		n !== -1 && (e.timeoutHandle = -1, qd(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), su = 0, xu(), q = e, J = n = pi(e.current, null), Y = t, X = 0, zl = null, Bl = !1, Vl = Qe(e, t), Hl = !1, Yl = Jl = ql = Kl = Gl = Wl = 0, Zl = Xl = null, Ql = !1, t & 8 && (t |= t & 32);
		var r = e.entangledLanes;
		if (r !== 0) for (e = e.entanglements, r &= t; 0 < r;) {
			var i = 31 - Ue(r), a = 1 << i;
			t |= e[i], r &= ~a;
		}
		return Ul = t, ri(), n;
	}
	function Cu(e, t) {
		H = null, D.H = Rs, t === Ca || t === Ta ? (t = ja(), X = 3) : t === wa ? (t = ja(), X = 4) : X = t === nc ? 8 : typeof t == "object" && t && typeof t.then == "function" ? 6 : 1, zl = t, J === null && (Wl = 1, Xs(e, xi(t, e.current)));
	}
	function wu() {
		var e = to.current;
		return e === null ? !0 : (Y & 4194048) === Y ? no === null : (Y & 62914560) === Y || Y & 536870912 ? e === no : !1;
	}
	function Tu() {
		var e = D.H;
		return D.H = Rs, e === null ? Rs : e;
	}
	function Eu() {
		var e = D.A;
		return D.A = Ll, e;
	}
	function Du() {
		Wl = 4, Bl || (Y & 4194048) !== Y && to.current !== null || (Vl = !0), !(Gl & 134217727) && !(Kl & 134217727) || q === null || yu(q, Y, Jl, !1);
	}
	function Ou(e, t, n) {
		var r = K;
		K |= 2;
		var i = Tu(), a = Eu();
		(q !== e || Y !== t) && (nu = null, Su(e, t)), t = !1;
		var o = Wl;
		a: do
			try {
				if (X !== 0 && J !== null) {
					var s = J, c = zl;
					switch (X) {
						case 8:
							xu(), o = 6;
							break a;
						case 3:
						case 2:
						case 9:
						case 6:
							to.current === null && (t = !0);
							var l = X;
							if (X = 0, zl = null, Pu(e, s, c, l), n && Vl) {
								o = 0;
								break a;
							}
							break;
						default: l = X, X = 0, zl = null, Pu(e, s, c, l);
					}
				}
				ku(), o = Wl;
				break;
			} catch (t) {
				Cu(e, t);
			}
		while (1);
		return t && e.shellSuspendCounter++, Yi = Ji = null, K = r, D.H = i, D.A = a, J === null && (q = null, Y = 0, ri()), o;
	}
	function ku() {
		for (; J !== null;) Mu(J);
	}
	function Au(e, t) {
		var n = K;
		K |= 2;
		var r = Tu(), a = Eu();
		q !== e || Y !== t ? (nu = null, tu = je() + 500, Su(e, t)) : Vl = Qe(e, t);
		a: do
			try {
				if (X !== 0 && J !== null) {
					t = J;
					var o = zl;
					b: switch (X) {
						case 1:
							X = 0, zl = null, Pu(e, t, o, 1);
							break;
						case 2:
						case 9:
							if (Da(o)) {
								X = 0, zl = null, Nu(t);
								break;
							}
							t = function() {
								X !== 2 && X !== 9 || q !== e || (X = 7), rd(e);
							}, o.then(t, t);
							break a;
						case 3:
							X = 7;
							break a;
						case 4:
							X = 5;
							break a;
						case 7:
							Da(o) ? (X = 0, zl = null, Nu(t)) : (X = 0, zl = null, Pu(e, t, o, 7));
							break;
						case 5:
							var s = null;
							switch (J.tag) {
								case 26: s = J.memoizedState;
								case 5:
								case 27:
									var c = J;
									if (s ? Wf(s) : c.stateNode.complete) {
										X = 0, zl = null;
										var l = c.sibling;
										if (l !== null) J = l;
										else {
											var u = c.return;
											u === null ? J = null : (J = u, Fu(u));
										}
										break b;
									}
							}
							X = 0, zl = null, Pu(e, t, o, 5);
							break;
						case 6:
							X = 0, zl = null, Pu(e, t, o, 6);
							break;
						case 8:
							xu(), Wl = 6;
							break a;
						default: throw Error(i(462));
					}
				}
				ju();
				break;
			} catch (t) {
				Cu(e, t);
			}
		while (1);
		return Yi = Ji = null, D.H = r, D.A = a, K = n, J === null ? (q = null, Y = 0, ri(), Wl) : 0;
	}
	function ju() {
		for (; J !== null && !ke();) Mu(J);
	}
	function Mu(e) {
		var t = Mc(e.alternate, e, Ul);
		e.memoizedProps = e.pendingProps, t === null ? Fu(e) : J = t;
	}
	function Nu(e) {
		var t = e, n = t.alternate;
		switch (t.tag) {
			case 15:
			case 0:
				t = gc(n, t, t.pendingProps, t.type, void 0, Y);
				break;
			case 11:
				t = gc(n, t, t.pendingProps, t.type.render, t.ref, Y);
				break;
			case 5: Oo(t);
			default: Bc(n, t), t = J = mi(t, Ul), t = Mc(n, t, Ul);
		}
		e.memoizedProps = e.pendingProps, t === null ? Fu(e) : J = t;
	}
	function Pu(e, t, n, r) {
		Yi = Ji = null, Oo(t), Na = null, Pa = 0;
		var i = t.return;
		try {
			if (tc(e, i, t, n, Y)) {
				Wl = 1, Xs(e, xi(n, e.current)), J = null;
				return;
			}
		} catch (t) {
			if (i !== null) throw J = i, t;
			Wl = 1, Xs(e, xi(n, e.current)), J = null;
			return;
		}
		t.flags & 32768 ? (L || r === 1 ? e = !0 : Vl || Y & 536870912 ? e = !1 : (Bl = e = !0, (r === 2 || r === 9 || r === 3 || r === 6) && (r = to.current, r !== null && r.tag === 13 && (r.flags |= 16384))), Iu(t, e)) : Fu(t);
	}
	function Fu(e) {
		var t = e;
		do {
			if (t.flags & 32768) {
				Iu(t, Bl);
				return;
			}
			e = t.return;
			var n = Rc(t.alternate, t, Ul);
			if (n !== null) {
				J = n;
				return;
			}
			if (t = t.sibling, t !== null) {
				J = t;
				return;
			}
			J = t = e;
		} while (t !== null);
		Wl === 0 && (Wl = 5);
	}
	function Iu(e, t) {
		do {
			var n = zc(e.alternate, e);
			if (n !== null) {
				n.flags &= 32767, J = n;
				return;
			}
			if (n = e.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !t && (e = e.sibling, e !== null)) {
				J = e;
				return;
			}
			J = e = n;
		} while (e !== null);
		Wl = 6, J = null;
	}
	function Lu(e, t, n, r, a, o, s, c, l) {
		e.cancelPendingCommit = null;
		do
			Hu();
		while (iu !== 0);
		if (K & 6) throw Error(i(327));
		if (t !== null) {
			if (t === e.current) throw Error(i(177));
			if (o = t.lanes | t.childLanes, o |= ni, rt(e, n, o, s, c, l), e === q && (J = q = null, Y = 0), ou = t, au = e, su = n, cu = o, lu = a, uu = r, t.subtreeFlags & 10256 || t.flags & 10256 ? (e.callbackNode = null, e.callbackPriority = 0, Xu(Fe, function() {
				return Uu(), null;
			})) : (e.callbackNode = null, e.callbackPriority = 0), r = (t.flags & 13878) != 0, t.subtreeFlags & 13878 || r) {
				r = D.T, D.T = null, a = O.p, O.p = 2, s = K, K |= 4;
				try {
					al(e, t, n);
				} finally {
					K = s, O.p = a, D.T = r;
				}
			}
			iu = 1, Ru(), zu(), Bu();
		}
	}
	function Ru() {
		if (iu === 1) {
			iu = 0;
			var e = au, t = ou, n = (t.flags & 13878) != 0;
			if (t.subtreeFlags & 13878 || n) {
				n = D.T, D.T = null;
				var r = O.p;
				O.p = 2;
				var i = K;
				K |= 4;
				try {
					_l(t, e);
					var a = zd, o = Ar(e.containerInfo), s = a.focusedElem, c = a.selectionRange;
					if (o !== s && s && s.ownerDocument && kr(s.ownerDocument.documentElement, s)) {
						if (c !== null && jr(s)) {
							var l = c.start, u = c.end;
							if (u === void 0 && (u = l), "selectionStart" in s) s.selectionStart = l, s.selectionEnd = Math.min(u, s.value.length);
							else {
								var d = s.ownerDocument || document, f = d && d.defaultView || window;
								if (f.getSelection) {
									var p = f.getSelection(), m = s.textContent.length, h = Math.min(c.start, m), g = c.end === void 0 ? h : Math.min(c.end, m);
									!p.extend && h > g && (o = g, g = h, h = o);
									var _ = Or(s, h), v = Or(s, g);
									if (_ && v && (p.rangeCount !== 1 || p.anchorNode !== _.node || p.anchorOffset !== _.offset || p.focusNode !== v.node || p.focusOffset !== v.offset)) {
										var y = d.createRange();
										y.setStart(_.node, _.offset), p.removeAllRanges(), h > g ? (p.addRange(y), p.extend(v.node, v.offset)) : (y.setEnd(v.node, v.offset), p.addRange(y));
									}
								}
							}
						}
						for (d = [], p = s; p = p.parentNode;) p.nodeType === 1 && d.push({
							element: p,
							left: p.scrollLeft,
							top: p.scrollTop
						});
						for (typeof s.focus == "function" && s.focus(), s = 0; s < d.length; s++) {
							var b = d[s];
							b.element.scrollLeft = b.left, b.element.scrollTop = b.top;
						}
					}
					sp = !!Rd, zd = Rd = null;
				} finally {
					K = i, O.p = r, D.T = n;
				}
			}
			e.current = t, iu = 2;
		}
	}
	function zu() {
		if (iu === 2) {
			iu = 0;
			var e = au, t = ou, n = (t.flags & 8772) != 0;
			if (t.subtreeFlags & 8772 || n) {
				n = D.T, D.T = null;
				var r = O.p;
				O.p = 2;
				var i = K;
				K |= 4;
				try {
					ol(e, t.alternate, t);
				} finally {
					K = i, O.p = r, D.T = n;
				}
			}
			iu = 3;
		}
	}
	function Bu() {
		if (iu === 4 || iu === 3) {
			iu = 0, Ae();
			var e = au, t = ou, n = su, r = uu;
			t.subtreeFlags & 10256 || t.flags & 10256 ? iu = 5 : (iu = 0, ou = au = null, Vu(e, e.pendingLanes));
			var i = e.pendingLanes;
			if (i === 0 && (ru = null), ct(n), t = t.stateNode, Ve && typeof Ve.onCommitFiberRoot == "function") try {
				Ve.onCommitFiberRoot(Be, t, void 0, (t.current.flags & 128) == 128);
			} catch {}
			if (r !== null) {
				t = D.T, i = O.p, O.p = 2, D.T = null;
				try {
					for (var a = e.onRecoverableError, o = 0; o < r.length; o++) {
						var s = r[o];
						a(s.value, { componentStack: s.stack });
					}
				} finally {
					D.T = t, O.p = i;
				}
			}
			su & 3 && Hu(), rd(e), i = e.pendingLanes, n & 261930 && i & 42 ? e === fu ? du++ : (du = 0, fu = e) : du = 0, id(0, !1);
		}
	}
	function Vu(e, t) {
		(e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, ua(t)));
	}
	function Hu() {
		return Ru(), zu(), Bu(), Uu();
	}
	function Uu() {
		if (iu !== 5) return !1;
		var e = au, t = cu;
		cu = 0;
		var n = ct(su), r = D.T, a = O.p;
		try {
			O.p = 32 > n ? 32 : n, D.T = null, n = lu, lu = null;
			var o = au, s = su;
			if (iu = 0, ou = au = null, su = 0, K & 6) throw Error(i(331));
			var c = K;
			if (K |= 4, Pl(o.current), El(o, o.current, s, n), K = c, id(0, !1), Ve && typeof Ve.onPostCommitFiberRoot == "function") try {
				Ve.onPostCommitFiberRoot(Be, o);
			} catch {}
			return !0;
		} finally {
			O.p = a, D.T = r, Vu(e, t);
		}
	}
	function Wu(e, t, n) {
		t = xi(n, t), t = Qs(e.stateNode, t, 2), e = Ua(e, t, 2), e !== null && (nt(e, 2), rd(e));
	}
	function Z(e, t, n) {
		if (e.tag === 3) Wu(e, e, n);
		else for (; t !== null;) {
			if (t.tag === 3) {
				Wu(t, e, n);
				break;
			} else if (t.tag === 1) {
				var r = t.stateNode;
				if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (ru === null || !ru.has(r))) {
					e = xi(n, e), n = $s(2), r = Ua(t, n, 2), r !== null && (ec(n, r, t, e), nt(r, 2), rd(r));
					break;
				}
			}
			t = t.return;
		}
	}
	function Gu(e, t, n) {
		var r = e.pingCache;
		if (r === null) {
			r = e.pingCache = new Rl();
			var i = /* @__PURE__ */ new Set();
			r.set(t, i);
		} else i = r.get(t), i === void 0 && (i = /* @__PURE__ */ new Set(), r.set(t, i));
		i.has(n) || (Hl = !0, i.add(n), e = Ku.bind(null, e, t, n), t.then(e, e));
	}
	function Ku(e, t, n) {
		var r = e.pingCache;
		r !== null && r.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, q === e && (Y & n) === n && (Wl === 4 || Wl === 3 && (Y & 62914560) === Y && 300 > je() - $l ? !(K & 2) && Su(e, 0) : ql |= n, Yl === Y && (Yl = 0)), rd(e);
	}
	function qu(e, t) {
		t === 0 && (t = et()), e = oi(e, t), e !== null && (nt(e, t), rd(e));
	}
	function Ju(e) {
		var t = e.memoizedState, n = 0;
		t !== null && (n = t.retryLane), qu(e, n);
	}
	function Yu(e, t) {
		var n = 0;
		switch (e.tag) {
			case 31:
			case 13:
				var r = e.stateNode, a = e.memoizedState;
				a !== null && (n = a.retryLane);
				break;
			case 19:
				r = e.stateNode;
				break;
			case 22:
				r = e.stateNode._retryCache;
				break;
			default: throw Error(i(314));
		}
		r !== null && r.delete(t), qu(e, n);
	}
	function Xu(e, t) {
		return De(e, t);
	}
	var Zu = null, Qu = null, $u = !1, ed = !1, td = !1, nd = 0;
	function rd(e) {
		e !== Qu && e.next === null && (Qu === null ? Zu = Qu = e : Qu = Qu.next = e), ed = !0, $u || ($u = !0, ud());
	}
	function id(e, t) {
		if (!td && ed) {
			td = !0;
			do
				for (var n = !1, r = Zu; r !== null;) {
					if (!t) if (e !== 0) {
						var i = r.pendingLanes;
						if (i === 0) var a = 0;
						else {
							var o = r.suspendedLanes, s = r.pingedLanes;
							a = (1 << 31 - Ue(42 | e) + 1) - 1, a &= i & ~(o & ~s), a = a & 201326741 ? a & 201326741 | 1 : a ? a | 2 : 0;
						}
						a !== 0 && (n = !0, ld(r, a));
					} else a = Y, a = Ze(r, r === q ? a : 0, r.cancelPendingCommit !== null || r.timeoutHandle !== -1), !(a & 3) || Qe(r, a) || (n = !0, ld(r, a));
					r = r.next;
				}
			while (n);
			td = !1;
		}
	}
	function ad() {
		od();
	}
	function od() {
		ed = $u = !1;
		var e = 0;
		nd !== 0 && Gd() && (e = nd);
		for (var t = je(), n = null, r = Zu; r !== null;) {
			var i = r.next, a = sd(r, t);
			a === 0 ? (r.next = null, n === null ? Zu = i : n.next = i, i === null && (Qu = n)) : (n = r, (e !== 0 || a & 3) && (ed = !0)), r = i;
		}
		iu !== 0 && iu !== 5 || id(e, !1), nd !== 0 && (nd = 0);
	}
	function sd(e, t) {
		for (var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, a = e.pendingLanes & -62914561; 0 < a;) {
			var o = 31 - Ue(a), s = 1 << o, c = i[o];
			c === -1 ? ((s & n) === 0 || (s & r) !== 0) && (i[o] = $e(s, t)) : c <= t && (e.expiredLanes |= s), a &= ~s;
		}
		if (t = q, n = Y, n = Ze(e, e === t ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r = e.callbackNode, n === 0 || e === t && (X === 2 || X === 9) || e.cancelPendingCommit !== null) return r !== null && r !== null && Oe(r), e.callbackNode = null, e.callbackPriority = 0;
		if (!(n & 3) || Qe(e, n)) {
			if (t = n & -n, t === e.callbackPriority) return t;
			switch (r !== null && Oe(r), ct(n)) {
				case 2:
				case 8:
					n = Pe;
					break;
				case 32:
					n = Fe;
					break;
				case 268435456:
					n = Le;
					break;
				default: n = Fe;
			}
			return r = cd.bind(null, e), n = De(n, r), e.callbackPriority = t, e.callbackNode = n, t;
		}
		return r !== null && r !== null && Oe(r), e.callbackPriority = 2, e.callbackNode = null, 2;
	}
	function cd(e, t) {
		if (iu !== 0 && iu !== 5) return e.callbackNode = null, e.callbackPriority = 0, null;
		var n = e.callbackNode;
		if (Hu() && e.callbackNode !== n) return null;
		var r = Y;
		return r = Ze(e, e === q ? r : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r === 0 ? null : (gu(e, r, t), sd(e, je()), e.callbackNode != null && e.callbackNode === n ? cd.bind(null, e) : null);
	}
	function ld(e, t) {
		if (Hu()) return null;
		gu(e, t, !0);
	}
	function ud() {
		Yd(function() {
			K & 6 ? De(Ne, ad) : od();
		});
	}
	function dd() {
		if (nd === 0) {
			var e = pa;
			e === 0 && (e = qe, qe <<= 1, !(qe & 261888) && (qe = 256)), nd = e;
		}
		return nd;
	}
	function fd(e) {
		return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : tn("" + e);
	}
	function pd(e, t) {
		var n = t.ownerDocument.createElement("input");
		return n.name = t.name, n.value = t.value, e.id && n.setAttribute("form", e.id), t.parentNode.insertBefore(n, t), e = new FormData(e), n.parentNode.removeChild(n), e;
	}
	function md(e, t, n, r, i) {
		if (t === "submit" && n && n.stateNode === i) {
			var a = fd((i[ft] || null).action), o = r.submitter;
			o && (t = (t = o[ft] || null) ? fd(t.formAction) : o.getAttribute("formAction"), t !== null && (a = t, o = null));
			var s = new wn("action", "action", null, r, i);
			e.push({
				event: s,
				listeners: [{
					instance: null,
					listener: function() {
						if (r.defaultPrevented) {
							if (nd !== 0) {
								var e = o ? pd(i, o) : new FormData(i);
								ws(n, {
									pending: !0,
									data: e,
									method: i.method,
									action: a
								}, null, e);
							}
						} else typeof a == "function" && (s.preventDefault(), e = o ? pd(i, o) : new FormData(i), ws(n, {
							pending: !0,
							data: e,
							method: i.method,
							action: a
						}, a, e));
					},
					currentTarget: i
				}]
			});
		}
	}
	for (var hd = 0; hd < Zr.length; hd++) {
		var gd = Zr[hd];
		Qr(gd.toLowerCase(), "on" + (gd[0].toUpperCase() + gd.slice(1)));
	}
	Qr(Ur, "onAnimationEnd"), Qr(Wr, "onAnimationIteration"), Qr(Gr, "onAnimationStart"), Qr("dblclick", "onDoubleClick"), Qr("focusin", "onFocus"), Qr("focusout", "onBlur"), Qr(Kr, "onTransitionRun"), Qr(qr, "onTransitionStart"), Qr(Jr, "onTransitionCancel"), Qr(Yr, "onTransitionEnd"), Et("onMouseEnter", ["mouseout", "mouseover"]), Et("onMouseLeave", ["mouseout", "mouseover"]), Et("onPointerEnter", ["pointerout", "pointerover"]), Et("onPointerLeave", ["pointerout", "pointerover"]), F("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), F("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), F("onBeforeInput", [
		"compositionend",
		"keypress",
		"textInput",
		"paste"
	]), F("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), F("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), F("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
	var _d = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), vd = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(_d));
	function yd(e, t) {
		t = (t & 4) != 0;
		for (var n = 0; n < e.length; n++) {
			var r = e[n], i = r.event;
			r = r.listeners;
			a: {
				var a = void 0;
				if (t) for (var o = r.length - 1; 0 <= o; o--) {
					var s = r[o], c = s.instance, l = s.currentTarget;
					if (s = s.listener, c !== a && i.isPropagationStopped()) break a;
					a = s, i.currentTarget = l;
					try {
						a(i);
					} catch (e) {
						$r(e);
					}
					i.currentTarget = null, a = c;
				}
				else for (o = 0; o < r.length; o++) {
					if (s = r[o], c = s.instance, l = s.currentTarget, s = s.listener, c !== a && i.isPropagationStopped()) break a;
					a = s, i.currentTarget = l;
					try {
						a(i);
					} catch (e) {
						$r(e);
					}
					i.currentTarget = null, a = c;
				}
			}
		}
	}
	function Q(e, t) {
		var n = t[mt];
		n === void 0 && (n = t[mt] = /* @__PURE__ */ new Set());
		var r = e + "__bubble";
		n.has(r) || (Cd(t, e, 2, !1), n.add(r));
	}
	function bd(e, t, n) {
		var r = 0;
		t && (r |= 4), Cd(n, e, r, t);
	}
	var xd = "_reactListening" + Math.random().toString(36).slice(2);
	function Sd(e) {
		if (!e[xd]) {
			e[xd] = !0, wt.forEach(function(t) {
				t !== "selectionchange" && (vd.has(t) || bd(t, !1, e), bd(t, !0, e));
			});
			var t = e.nodeType === 9 ? e : e.ownerDocument;
			t === null || t[xd] || (t[xd] = !0, bd("selectionchange", !1, t));
		}
	}
	function Cd(e, t, n, r) {
		switch (mp(t)) {
			case 2:
				var i = cp;
				break;
			case 8:
				i = lp;
				break;
			default: i = up;
		}
		n = i.bind(null, t, n, e), i = void 0, !pn || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0), r ? i === void 0 ? e.addEventListener(t, n, !0) : e.addEventListener(t, n, {
			capture: !0,
			passive: i
		}) : i === void 0 ? e.addEventListener(t, n, !1) : e.addEventListener(t, n, { passive: i });
	}
	function wd(e, t, n, r, i) {
		var a = r;
		if (!(t & 1) && !(t & 2) && r !== null) a: for (;;) {
			if (r === null) return;
			var s = r.tag;
			if (s === 3 || s === 4) {
				var c = r.stateNode.containerInfo;
				if (c === i) break;
				if (s === 4) for (s = r.return; s !== null;) {
					var l = s.tag;
					if ((l === 3 || l === 4) && s.stateNode.containerInfo === i) return;
					s = s.return;
				}
				for (; c !== null;) {
					if (s = yt(c), s === null) return;
					if (l = s.tag, l === 5 || l === 6 || l === 26 || l === 27) {
						r = a = s;
						continue a;
					}
					c = c.parentNode;
				}
			}
			r = r.return;
		}
		un(function() {
			var r = a, i = an(n), s = [];
			a: {
				var c = Xr.get(e);
				if (c !== void 0) {
					var l = wn, u = e;
					switch (e) {
						case "keypress": if (yn(n) === 0) break a;
						case "keydown":
						case "keyup":
							l = Hn;
							break;
						case "focusin":
							u = "focus", l = Nn;
							break;
						case "focusout":
							u = "blur", l = Nn;
							break;
						case "beforeblur":
						case "afterblur":
							l = Nn;
							break;
						case "click": if (n.button === 2) break a;
						case "auxclick":
						case "dblclick":
						case "mousedown":
						case "mousemove":
						case "mouseup":
						case "mouseout":
						case "mouseover":
						case "contextmenu":
							l = jn;
							break;
						case "drag":
						case "dragend":
						case "dragenter":
						case "dragexit":
						case "dragleave":
						case "dragover":
						case "dragstart":
						case "drop":
							l = Mn;
							break;
						case "touchcancel":
						case "touchend":
						case "touchmove":
						case "touchstart":
							l = Wn;
							break;
						case Ur:
						case Wr:
						case Gr:
							l = Pn;
							break;
						case Yr:
							l = Gn;
							break;
						case "scroll":
						case "scrollend":
							l = En;
							break;
						case "wheel":
							l = Kn;
							break;
						case "copy":
						case "cut":
						case "paste":
							l = Fn;
							break;
						case "gotpointercapture":
						case "lostpointercapture":
						case "pointercancel":
						case "pointerdown":
						case "pointermove":
						case "pointerout":
						case "pointerover":
						case "pointerup":
							l = Un;
							break;
						case "toggle":
						case "beforetoggle": l = qn;
					}
					var d = (t & 4) != 0, f = !d && (e === "scroll" || e === "scrollend"), p = d ? c === null ? null : c + "Capture" : c;
					d = [];
					for (var m = r, h; m !== null;) {
						var g = m;
						if (h = g.stateNode, g = g.tag, g !== 5 && g !== 26 && g !== 27 || h === null || p === null || (g = dn(m, p), g != null && d.push(Td(m, g, h))), f) break;
						m = m.return;
					}
					0 < d.length && (c = new l(c, u, null, n, i), s.push({
						event: c,
						listeners: d
					}));
				}
			}
			if (!(t & 7)) {
				a: {
					if (c = e === "mouseover" || e === "pointerover", l = e === "mouseout" || e === "pointerout", c && n !== rn && (u = n.relatedTarget || n.fromElement) && (yt(u) || u[pt])) break a;
					if ((l || c) && (c = i.window === i ? i : (c = i.ownerDocument) ? c.defaultView || c.parentWindow : window, l ? (u = n.relatedTarget || n.toElement, l = r, u = u ? yt(u) : null, u !== null && (f = o(u), d = u.tag, u !== f || d !== 5 && d !== 27 && d !== 6) && (u = null)) : (l = null, u = r), l !== u)) {
						if (d = jn, g = "onMouseLeave", p = "onMouseEnter", m = "mouse", (e === "pointerout" || e === "pointerover") && (d = Un, g = "onPointerLeave", p = "onPointerEnter", m = "pointer"), f = l == null ? c : xt(l), h = u == null ? c : xt(u), c = new d(g, m + "leave", l, n, i), c.target = f, c.relatedTarget = h, g = null, yt(i) === r && (d = new d(p, m + "enter", u, n, i), d.target = h, d.relatedTarget = f, g = d), f = g, l && u) b: {
							for (d = Dd, p = l, m = u, h = 0, g = p; g; g = d(g)) h++;
							g = 0;
							for (var _ = m; _; _ = d(_)) g++;
							for (; 0 < h - g;) p = d(p), h--;
							for (; 0 < g - h;) m = d(m), g--;
							for (; h--;) {
								if (p === m || m !== null && p === m.alternate) {
									d = p;
									break b;
								}
								p = d(p), m = d(m);
							}
							d = null;
						}
						else d = null;
						l !== null && Od(s, c, l, d, !1), u !== null && f !== null && Od(s, f, u, d, !0);
					}
				}
				a: {
					if (c = r ? xt(r) : window, l = c.nodeName && c.nodeName.toLowerCase(), l === "select" || l === "input" && c.type === "file") var v = pr;
					else if (sr(c)) if (mr) v = Cr;
					else {
						v = xr;
						var y = br;
					}
					else l = c.nodeName, !l || l.toLowerCase() !== "input" || c.type !== "checkbox" && c.type !== "radio" ? r && Qt(r.elementType) && (v = pr) : v = Sr;
					if (v &&= v(e, r)) {
						cr(s, v, n, i);
						break a;
					}
					y && y(e, c, r), e === "focusout" && r && c.type === "number" && r.memoizedProps.value != null && Wt(c, "number", c.value);
				}
				switch (y = r ? xt(r) : window, e) {
					case "focusin":
						(sr(y) || y.contentEditable === "true") && (Nr = y, Pr = r, Fr = null);
						break;
					case "focusout":
						Fr = Pr = Nr = null;
						break;
					case "mousedown":
						Ir = !0;
						break;
					case "contextmenu":
					case "mouseup":
					case "dragend":
						Ir = !1, Lr(s, n, i);
						break;
					case "selectionchange": if (Mr) break;
					case "keydown":
					case "keyup": Lr(s, n, i);
				}
				var b;
				if (Yn) b: {
					switch (e) {
						case "compositionstart":
							var x = "onCompositionStart";
							break b;
						case "compositionend":
							x = "onCompositionEnd";
							break b;
						case "compositionupdate":
							x = "onCompositionUpdate";
							break b;
					}
					x = void 0;
				}
				else rr ? tr(e, n) && (x = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (x = "onCompositionStart");
				x && (Qn && n.locale !== "ko" && (rr || x !== "onCompositionStart" ? x === "onCompositionEnd" && rr && (b = vn()) : (hn = i, gn = "value" in hn ? hn.value : hn.textContent, rr = !0)), y = Ed(r, x), 0 < y.length && (x = new In(x, e, null, n, i), s.push({
					event: x,
					listeners: y
				}), b ? x.data = b : (b = nr(n), b !== null && (x.data = b)))), (b = Zn ? ir(e, n) : ar(e, n)) && (x = Ed(r, "onBeforeInput"), 0 < x.length && (y = new In("onBeforeInput", "beforeinput", null, n, i), s.push({
					event: y,
					listeners: x
				}), y.data = b)), md(s, e, r, n, i);
			}
			yd(s, t);
		});
	}
	function Td(e, t, n) {
		return {
			instance: e,
			listener: t,
			currentTarget: n
		};
	}
	function Ed(e, t) {
		for (var n = t + "Capture", r = []; e !== null;) {
			var i = e, a = i.stateNode;
			if (i = i.tag, i !== 5 && i !== 26 && i !== 27 || a === null || (i = dn(e, n), i != null && r.unshift(Td(e, i, a)), i = dn(e, t), i != null && r.push(Td(e, i, a))), e.tag === 3) return r;
			e = e.return;
		}
		return [];
	}
	function Dd(e) {
		if (e === null) return null;
		do
			e = e.return;
		while (e && e.tag !== 5 && e.tag !== 27);
		return e || null;
	}
	function Od(e, t, n, r, i) {
		for (var a = t._reactName, o = []; n !== null && n !== r;) {
			var s = n, c = s.alternate, l = s.stateNode;
			if (s = s.tag, c !== null && c === r) break;
			s !== 5 && s !== 26 && s !== 27 || l === null || (c = l, i ? (l = dn(n, a), l != null && o.unshift(Td(n, l, c))) : i || (l = dn(n, a), l != null && o.push(Td(n, l, c)))), n = n.return;
		}
		o.length !== 0 && e.push({
			event: t,
			listeners: o
		});
	}
	var kd = /\r\n?/g, Ad = /\u0000|\uFFFD/g;
	function jd(e) {
		return (typeof e == "string" ? e : "" + e).replace(kd, "\n").replace(Ad, "");
	}
	function Md(e, t) {
		return t = jd(t), jd(e) === t;
	}
	function $(e, t, n, r, a, o) {
		switch (n) {
			case "children":
				typeof r == "string" ? t === "body" || t === "textarea" && r === "" || Jt(e, r) : (typeof r == "number" || typeof r == "bigint") && t !== "body" && Jt(e, "" + r);
				break;
			case "className":
				Mt(e, "class", r);
				break;
			case "tabIndex":
				Mt(e, "tabindex", r);
				break;
			case "dir":
			case "role":
			case "viewBox":
			case "width":
			case "height":
				Mt(e, n, r);
				break;
			case "style":
				Zt(e, r, o);
				break;
			case "data": if (t !== "object") {
				Mt(e, "data", r);
				break;
			}
			case "src":
			case "href":
				if (r === "" && (t !== "a" || n !== "href")) {
					e.removeAttribute(n);
					break;
				}
				if (r == null || typeof r == "function" || typeof r == "symbol" || typeof r == "boolean") {
					e.removeAttribute(n);
					break;
				}
				r = tn("" + r), e.setAttribute(n, r);
				break;
			case "action":
			case "formAction":
				if (typeof r == "function") {
					e.setAttribute(n, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
					break;
				} else typeof o == "function" && (n === "formAction" ? (t !== "input" && $(e, t, "name", a.name, a, null), $(e, t, "formEncType", a.formEncType, a, null), $(e, t, "formMethod", a.formMethod, a, null), $(e, t, "formTarget", a.formTarget, a, null)) : ($(e, t, "encType", a.encType, a, null), $(e, t, "method", a.method, a, null), $(e, t, "target", a.target, a, null)));
				if (r == null || typeof r == "symbol" || typeof r == "boolean") {
					e.removeAttribute(n);
					break;
				}
				r = tn("" + r), e.setAttribute(n, r);
				break;
			case "onClick":
				r != null && (e.onclick = nn);
				break;
			case "onScroll":
				r != null && Q("scroll", e);
				break;
			case "onScrollEnd":
				r != null && Q("scrollend", e);
				break;
			case "dangerouslySetInnerHTML":
				if (r != null) {
					if (typeof r != "object" || !("__html" in r)) throw Error(i(61));
					if (n = r.__html, n != null) {
						if (a.children != null) throw Error(i(60));
						e.innerHTML = n;
					}
				}
				break;
			case "multiple":
				e.multiple = r && typeof r != "function" && typeof r != "symbol";
				break;
			case "muted":
				e.muted = r && typeof r != "function" && typeof r != "symbol";
				break;
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "defaultValue":
			case "defaultChecked":
			case "innerHTML":
			case "ref": break;
			case "autoFocus": break;
			case "xlinkHref":
				if (r == null || typeof r == "function" || typeof r == "boolean" || typeof r == "symbol") {
					e.removeAttribute("xlink:href");
					break;
				}
				n = tn("" + r), e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", n);
				break;
			case "contentEditable":
			case "spellCheck":
			case "draggable":
			case "value":
			case "autoReverse":
			case "externalResourcesRequired":
			case "focusable":
			case "preserveAlpha":
				r != null && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, "" + r) : e.removeAttribute(n);
				break;
			case "inert":
			case "allowFullScreen":
			case "async":
			case "autoPlay":
			case "controls":
			case "default":
			case "defer":
			case "disabled":
			case "disablePictureInPicture":
			case "disableRemotePlayback":
			case "formNoValidate":
			case "hidden":
			case "loop":
			case "noModule":
			case "noValidate":
			case "open":
			case "playsInline":
			case "readOnly":
			case "required":
			case "reversed":
			case "scoped":
			case "seamless":
			case "itemScope":
				r && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, "") : e.removeAttribute(n);
				break;
			case "capture":
			case "download":
				!0 === r ? e.setAttribute(n, "") : !1 !== r && r != null && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, r) : e.removeAttribute(n);
				break;
			case "cols":
			case "rows":
			case "size":
			case "span":
				r != null && typeof r != "function" && typeof r != "symbol" && !isNaN(r) && 1 <= r ? e.setAttribute(n, r) : e.removeAttribute(n);
				break;
			case "rowSpan":
			case "start":
				r == null || typeof r == "function" || typeof r == "symbol" || isNaN(r) ? e.removeAttribute(n) : e.setAttribute(n, r);
				break;
			case "popover":
				Q("beforetoggle", e), Q("toggle", e), jt(e, "popover", r);
				break;
			case "xlinkActuate":
				Nt(e, "http://www.w3.org/1999/xlink", "xlink:actuate", r);
				break;
			case "xlinkArcrole":
				Nt(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", r);
				break;
			case "xlinkRole":
				Nt(e, "http://www.w3.org/1999/xlink", "xlink:role", r);
				break;
			case "xlinkShow":
				Nt(e, "http://www.w3.org/1999/xlink", "xlink:show", r);
				break;
			case "xlinkTitle":
				Nt(e, "http://www.w3.org/1999/xlink", "xlink:title", r);
				break;
			case "xlinkType":
				Nt(e, "http://www.w3.org/1999/xlink", "xlink:type", r);
				break;
			case "xmlBase":
				Nt(e, "http://www.w3.org/XML/1998/namespace", "xml:base", r);
				break;
			case "xmlLang":
				Nt(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", r);
				break;
			case "xmlSpace":
				Nt(e, "http://www.w3.org/XML/1998/namespace", "xml:space", r);
				break;
			case "is":
				jt(e, "is", r);
				break;
			case "innerText":
			case "textContent": break;
			default: (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") && (n = $t.get(n) || n, jt(e, n, r));
		}
	}
	function Nd(e, t, n, r, a, o) {
		switch (n) {
			case "style":
				Zt(e, r, o);
				break;
			case "dangerouslySetInnerHTML":
				if (r != null) {
					if (typeof r != "object" || !("__html" in r)) throw Error(i(61));
					if (n = r.__html, n != null) {
						if (a.children != null) throw Error(i(60));
						e.innerHTML = n;
					}
				}
				break;
			case "children":
				typeof r == "string" ? Jt(e, r) : (typeof r == "number" || typeof r == "bigint") && Jt(e, "" + r);
				break;
			case "onScroll":
				r != null && Q("scroll", e);
				break;
			case "onScrollEnd":
				r != null && Q("scrollend", e);
				break;
			case "onClick":
				r != null && (e.onclick = nn);
				break;
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "innerHTML":
			case "ref": break;
			case "innerText":
			case "textContent": break;
			default: if (!Tt.hasOwnProperty(n)) a: {
				if (n[0] === "o" && n[1] === "n" && (a = n.endsWith("Capture"), t = n.slice(2, a ? n.length - 7 : void 0), o = e[ft] || null, o = o == null ? null : o[n], typeof o == "function" && e.removeEventListener(t, o, a), typeof r == "function")) {
					typeof o != "function" && o !== null && (n in e ? e[n] = null : e.hasAttribute(n) && e.removeAttribute(n)), e.addEventListener(t, r, a);
					break a;
				}
				n in e ? e[n] = r : !0 === r ? e.setAttribute(n, "") : jt(e, n, r);
			}
		}
	}
	function Pd(e, t, n) {
		switch (t) {
			case "div":
			case "span":
			case "svg":
			case "path":
			case "a":
			case "g":
			case "p":
			case "li": break;
			case "img":
				Q("error", e), Q("load", e);
				var r = !1, a = !1, o;
				for (o in n) if (n.hasOwnProperty(o)) {
					var s = n[o];
					if (s != null) switch (o) {
						case "src":
							r = !0;
							break;
						case "srcSet":
							a = !0;
							break;
						case "children":
						case "dangerouslySetInnerHTML": throw Error(i(137, t));
						default: $(e, t, o, s, n, null);
					}
				}
				a && $(e, t, "srcSet", n.srcSet, n, null), r && $(e, t, "src", n.src, n, null);
				return;
			case "input":
				Q("invalid", e);
				var c = o = s = a = null, l = null, u = null;
				for (r in n) if (n.hasOwnProperty(r)) {
					var d = n[r];
					if (d != null) switch (r) {
						case "name":
							a = d;
							break;
						case "type":
							s = d;
							break;
						case "checked":
							l = d;
							break;
						case "defaultChecked":
							u = d;
							break;
						case "value":
							o = d;
							break;
						case "defaultValue":
							c = d;
							break;
						case "children":
						case "dangerouslySetInnerHTML":
							if (d != null) throw Error(i(137, t));
							break;
						default: $(e, t, r, d, n, null);
					}
				}
				Ut(e, o, c, l, u, s, a, !1);
				return;
			case "select":
				for (a in Q("invalid", e), r = s = o = null, n) if (n.hasOwnProperty(a) && (c = n[a], c != null)) switch (a) {
					case "value":
						o = c;
						break;
					case "defaultValue":
						s = c;
						break;
					case "multiple": r = c;
					default: $(e, t, a, c, n, null);
				}
				t = o, n = s, e.multiple = !!r, t == null ? n != null && Gt(e, !!r, n, !0) : Gt(e, !!r, t, !1);
				return;
			case "textarea":
				for (s in Q("invalid", e), o = a = r = null, n) if (n.hasOwnProperty(s) && (c = n[s], c != null)) switch (s) {
					case "value":
						r = c;
						break;
					case "defaultValue":
						a = c;
						break;
					case "children":
						o = c;
						break;
					case "dangerouslySetInnerHTML":
						if (c != null) throw Error(i(91));
						break;
					default: $(e, t, s, c, n, null);
				}
				qt(e, r, a, o);
				return;
			case "option":
				for (l in n) if (n.hasOwnProperty(l) && (r = n[l], r != null)) switch (l) {
					case "selected":
						e.selected = r && typeof r != "function" && typeof r != "symbol";
						break;
					default: $(e, t, l, r, n, null);
				}
				return;
			case "dialog":
				Q("beforetoggle", e), Q("toggle", e), Q("cancel", e), Q("close", e);
				break;
			case "iframe":
			case "object":
				Q("load", e);
				break;
			case "video":
			case "audio":
				for (r = 0; r < _d.length; r++) Q(_d[r], e);
				break;
			case "image":
				Q("error", e), Q("load", e);
				break;
			case "details":
				Q("toggle", e);
				break;
			case "embed":
			case "source":
			case "link": Q("error", e), Q("load", e);
			case "area":
			case "base":
			case "br":
			case "col":
			case "hr":
			case "keygen":
			case "meta":
			case "param":
			case "track":
			case "wbr":
			case "menuitem":
				for (u in n) if (n.hasOwnProperty(u) && (r = n[u], r != null)) switch (u) {
					case "children":
					case "dangerouslySetInnerHTML": throw Error(i(137, t));
					default: $(e, t, u, r, n, null);
				}
				return;
			default: if (Qt(t)) {
				for (d in n) n.hasOwnProperty(d) && (r = n[d], r !== void 0 && Nd(e, t, d, r, n, void 0));
				return;
			}
		}
		for (c in n) n.hasOwnProperty(c) && (r = n[c], r != null && $(e, t, c, r, n, null));
	}
	function Fd(e, t, n, r) {
		switch (t) {
			case "div":
			case "span":
			case "svg":
			case "path":
			case "a":
			case "g":
			case "p":
			case "li": break;
			case "input":
				var a = null, o = null, s = null, c = null, l = null, u = null, d = null;
				for (m in n) {
					var f = n[m];
					if (n.hasOwnProperty(m) && f != null) switch (m) {
						case "checked": break;
						case "value": break;
						case "defaultValue": l = f;
						default: r.hasOwnProperty(m) || $(e, t, m, null, r, f);
					}
				}
				for (var p in r) {
					var m = r[p];
					if (f = n[p], r.hasOwnProperty(p) && (m != null || f != null)) switch (p) {
						case "type":
							o = m;
							break;
						case "name":
							a = m;
							break;
						case "checked":
							u = m;
							break;
						case "defaultChecked":
							d = m;
							break;
						case "value":
							s = m;
							break;
						case "defaultValue":
							c = m;
							break;
						case "children":
						case "dangerouslySetInnerHTML":
							if (m != null) throw Error(i(137, t));
							break;
						default: m !== f && $(e, t, p, m, r, f);
					}
				}
				Ht(e, s, c, l, u, d, o, a);
				return;
			case "select":
				for (o in m = s = c = p = null, n) if (l = n[o], n.hasOwnProperty(o) && l != null) switch (o) {
					case "value": break;
					case "multiple": m = l;
					default: r.hasOwnProperty(o) || $(e, t, o, null, r, l);
				}
				for (a in r) if (o = r[a], l = n[a], r.hasOwnProperty(a) && (o != null || l != null)) switch (a) {
					case "value":
						p = o;
						break;
					case "defaultValue":
						c = o;
						break;
					case "multiple": s = o;
					default: o !== l && $(e, t, a, o, r, l);
				}
				t = c, n = s, r = m, p == null ? !!r != !!n && (t == null ? Gt(e, !!n, n ? [] : "", !1) : Gt(e, !!n, t, !0)) : Gt(e, !!n, p, !1);
				return;
			case "textarea":
				for (c in m = p = null, n) if (a = n[c], n.hasOwnProperty(c) && a != null && !r.hasOwnProperty(c)) switch (c) {
					case "value": break;
					case "children": break;
					default: $(e, t, c, null, r, a);
				}
				for (s in r) if (a = r[s], o = n[s], r.hasOwnProperty(s) && (a != null || o != null)) switch (s) {
					case "value":
						p = a;
						break;
					case "defaultValue":
						m = a;
						break;
					case "children": break;
					case "dangerouslySetInnerHTML":
						if (a != null) throw Error(i(91));
						break;
					default: a !== o && $(e, t, s, a, r, o);
				}
				Kt(e, p, m);
				return;
			case "option":
				for (var h in n) if (p = n[h], n.hasOwnProperty(h) && p != null && !r.hasOwnProperty(h)) switch (h) {
					case "selected":
						e.selected = !1;
						break;
					default: $(e, t, h, null, r, p);
				}
				for (l in r) if (p = r[l], m = n[l], r.hasOwnProperty(l) && p !== m && (p != null || m != null)) switch (l) {
					case "selected":
						e.selected = p && typeof p != "function" && typeof p != "symbol";
						break;
					default: $(e, t, l, p, r, m);
				}
				return;
			case "img":
			case "link":
			case "area":
			case "base":
			case "br":
			case "col":
			case "embed":
			case "hr":
			case "keygen":
			case "meta":
			case "param":
			case "source":
			case "track":
			case "wbr":
			case "menuitem":
				for (var g in n) p = n[g], n.hasOwnProperty(g) && p != null && !r.hasOwnProperty(g) && $(e, t, g, null, r, p);
				for (u in r) if (p = r[u], m = n[u], r.hasOwnProperty(u) && p !== m && (p != null || m != null)) switch (u) {
					case "children":
					case "dangerouslySetInnerHTML":
						if (p != null) throw Error(i(137, t));
						break;
					default: $(e, t, u, p, r, m);
				}
				return;
			default: if (Qt(t)) {
				for (var _ in n) p = n[_], n.hasOwnProperty(_) && p !== void 0 && !r.hasOwnProperty(_) && Nd(e, t, _, void 0, r, p);
				for (d in r) p = r[d], m = n[d], !r.hasOwnProperty(d) || p === m || p === void 0 && m === void 0 || Nd(e, t, d, p, r, m);
				return;
			}
		}
		for (var v in n) p = n[v], n.hasOwnProperty(v) && p != null && !r.hasOwnProperty(v) && $(e, t, v, null, r, p);
		for (f in r) p = r[f], m = n[f], !r.hasOwnProperty(f) || p === m || p == null && m == null || $(e, t, f, p, r, m);
	}
	function Id(e) {
		switch (e) {
			case "css":
			case "script":
			case "font":
			case "img":
			case "image":
			case "input":
			case "link": return !0;
			default: return !1;
		}
	}
	function Ld() {
		if (typeof performance.getEntriesByType == "function") {
			for (var e = 0, t = 0, n = performance.getEntriesByType("resource"), r = 0; r < n.length; r++) {
				var i = n[r], a = i.transferSize, o = i.initiatorType, s = i.duration;
				if (a && s && Id(o)) {
					for (o = 0, s = i.responseEnd, r += 1; r < n.length; r++) {
						var c = n[r], l = c.startTime;
						if (l > s) break;
						var u = c.transferSize, d = c.initiatorType;
						u && Id(d) && (c = c.responseEnd, o += u * (c < s ? 1 : (s - l) / (c - l)));
					}
					if (--r, t += 8 * (a + o) / (i.duration / 1e3), e++, 10 < e) break;
				}
			}
			if (0 < e) return t / e / 1e6;
		}
		return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
	}
	var Rd = null, zd = null;
	function Bd(e) {
		return e.nodeType === 9 ? e : e.ownerDocument;
	}
	function Vd(e) {
		switch (e) {
			case "http://www.w3.org/2000/svg": return 1;
			case "http://www.w3.org/1998/Math/MathML": return 2;
			default: return 0;
		}
	}
	function Hd(e, t) {
		if (e === 0) switch (t) {
			case "svg": return 1;
			case "math": return 2;
			default: return 0;
		}
		return e === 1 && t === "foreignObject" ? 0 : e;
	}
	function Ud(e, t) {
		return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
	}
	var Wd = null;
	function Gd() {
		var e = window.event;
		return e && e.type === "popstate" ? e === Wd ? !1 : (Wd = e, !0) : (Wd = null, !1);
	}
	var Kd = typeof setTimeout == "function" ? setTimeout : void 0, qd = typeof clearTimeout == "function" ? clearTimeout : void 0, Jd = typeof Promise == "function" ? Promise : void 0, Yd = typeof queueMicrotask == "function" ? queueMicrotask : Jd === void 0 ? Kd : function(e) {
		return Jd.resolve(null).then(e).catch(Xd);
	};
	function Xd(e) {
		setTimeout(function() {
			throw e;
		});
	}
	function Zd(e) {
		return e === "head";
	}
	function Qd(e, t) {
		var n = t, r = 0;
		do {
			var i = n.nextSibling;
			if (e.removeChild(n), i && i.nodeType === 8) if (n = i.data, n === "/$" || n === "/&") {
				if (r === 0) {
					e.removeChild(i), Np(t);
					return;
				}
				r--;
			} else if (n === "$" || n === "$?" || n === "$~" || n === "$!" || n === "&") r++;
			else if (n === "html") pf(e.ownerDocument.documentElement);
			else if (n === "head") {
				n = e.ownerDocument.head, pf(n);
				for (var a = n.firstChild; a;) {
					var o = a.nextSibling, s = a.nodeName;
					a[_t] || s === "SCRIPT" || s === "STYLE" || s === "LINK" && a.rel.toLowerCase() === "stylesheet" || n.removeChild(a), a = o;
				}
			} else n === "body" && pf(e.ownerDocument.body);
			n = i;
		} while (n);
		Np(t);
	}
	function $d(e, t) {
		var n = e;
		e = 0;
		do {
			var r = n.nextSibling;
			if (n.nodeType === 1 ? t ? (n._stashedDisplay = n.style.display, n.style.display = "none") : (n.style.display = n._stashedDisplay || "", n.getAttribute("style") === "" && n.removeAttribute("style")) : n.nodeType === 3 && (t ? (n._stashedText = n.nodeValue, n.nodeValue = "") : n.nodeValue = n._stashedText || ""), r && r.nodeType === 8) if (n = r.data, n === "/$") {
				if (e === 0) break;
				e--;
			} else n !== "$" && n !== "$?" && n !== "$~" && n !== "$!" || e++;
			n = r;
		} while (n);
	}
	function ef(e) {
		var t = e.firstChild;
		for (t && t.nodeType === 10 && (t = t.nextSibling); t;) {
			var n = t;
			switch (t = t.nextSibling, n.nodeName) {
				case "HTML":
				case "HEAD":
				case "BODY":
					ef(n), vt(n);
					continue;
				case "SCRIPT":
				case "STYLE": continue;
				case "LINK": if (n.rel.toLowerCase() === "stylesheet") continue;
			}
			e.removeChild(n);
		}
	}
	function tf(e, t, n, r) {
		for (; e.nodeType === 1;) {
			var i = n;
			if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
				if (!r && (e.nodeName !== "INPUT" || e.type !== "hidden")) break;
			} else if (!r) if (t === "input" && e.type === "hidden") {
				var a = i.name == null ? null : "" + i.name;
				if (i.type === "hidden" && e.getAttribute("name") === a) return e;
			} else return e;
			else if (!e[_t]) switch (t) {
				case "meta":
					if (!e.hasAttribute("itemprop")) break;
					return e;
				case "link":
					if (a = e.getAttribute("rel"), a === "stylesheet" && e.hasAttribute("data-precedence") || a !== i.rel || e.getAttribute("href") !== (i.href == null || i.href === "" ? null : i.href) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin) || e.getAttribute("title") !== (i.title == null ? null : i.title)) break;
					return e;
				case "style":
					if (e.hasAttribute("data-precedence")) break;
					return e;
				case "script":
					if (a = e.getAttribute("src"), (a !== (i.src == null ? null : i.src) || e.getAttribute("type") !== (i.type == null ? null : i.type) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin)) && a && e.hasAttribute("async") && !e.hasAttribute("itemprop")) break;
					return e;
				default: return e;
			}
			if (e = cf(e.nextSibling), e === null) break;
		}
		return null;
	}
	function nf(e, t, n) {
		if (t === "") return null;
		for (; e.nodeType !== 3;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = cf(e.nextSibling), e === null)) return null;
		return e;
	}
	function rf(e, t) {
		for (; e.nodeType !== 8;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = cf(e.nextSibling), e === null)) return null;
		return e;
	}
	function af(e) {
		return e.data === "$?" || e.data === "$~";
	}
	function of(e) {
		return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
	}
	function sf(e, t) {
		var n = e.ownerDocument;
		if (e.data === "$~") e._reactRetry = t;
		else if (e.data !== "$?" || n.readyState !== "loading") t();
		else {
			var r = function() {
				t(), n.removeEventListener("DOMContentLoaded", r);
			};
			n.addEventListener("DOMContentLoaded", r), e._reactRetry = r;
		}
	}
	function cf(e) {
		for (; e != null; e = e.nextSibling) {
			var t = e.nodeType;
			if (t === 1 || t === 3) break;
			if (t === 8) {
				if (t = e.data, t === "$" || t === "$!" || t === "$?" || t === "$~" || t === "&" || t === "F!" || t === "F") break;
				if (t === "/$" || t === "/&") return null;
			}
		}
		return e;
	}
	var lf = null;
	function uf(e) {
		e = e.nextSibling;
		for (var t = 0; e;) {
			if (e.nodeType === 8) {
				var n = e.data;
				if (n === "/$" || n === "/&") {
					if (t === 0) return cf(e.nextSibling);
					t--;
				} else n !== "$" && n !== "$!" && n !== "$?" && n !== "$~" && n !== "&" || t++;
			}
			e = e.nextSibling;
		}
		return null;
	}
	function df(e) {
		e = e.previousSibling;
		for (var t = 0; e;) {
			if (e.nodeType === 8) {
				var n = e.data;
				if (n === "$" || n === "$!" || n === "$?" || n === "$~" || n === "&") {
					if (t === 0) return e;
					t--;
				} else n !== "/$" && n !== "/&" || t++;
			}
			e = e.previousSibling;
		}
		return null;
	}
	function ff(e, t, n) {
		switch (t = Bd(n), e) {
			case "html":
				if (e = t.documentElement, !e) throw Error(i(452));
				return e;
			case "head":
				if (e = t.head, !e) throw Error(i(453));
				return e;
			case "body":
				if (e = t.body, !e) throw Error(i(454));
				return e;
			default: throw Error(i(451));
		}
	}
	function pf(e) {
		for (var t = e.attributes; t.length;) e.removeAttributeNode(t[0]);
		vt(e);
	}
	var mf = /* @__PURE__ */ new Map(), hf = /* @__PURE__ */ new Set();
	function gf(e) {
		return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
	}
	var _f = O.d;
	O.d = {
		f: vf,
		r: yf,
		D: Sf,
		C: Cf,
		L: wf,
		m: Tf,
		X: Df,
		S: Ef,
		M: Of
	};
	function vf() {
		var e = _f.f(), t = bu();
		return e || t;
	}
	function yf(e) {
		var t = bt(e);
		t !== null && t.tag === 5 && t.type === "form" ? Es(t) : _f.r(e);
	}
	var bf = typeof document > "u" ? null : document;
	function xf(e, t, n) {
		var r = bf;
		if (r && typeof t == "string" && t) {
			var i = Vt(t);
			i = "link[rel=\"" + e + "\"][href=\"" + i + "\"]", typeof n == "string" && (i += "[crossorigin=\"" + n + "\"]"), hf.has(i) || (hf.add(i), e = {
				rel: e,
				crossOrigin: n,
				href: t
			}, r.querySelector(i) === null && (t = r.createElement("link"), Pd(t, "link", e), Ct(t), r.head.appendChild(t)));
		}
	}
	function Sf(e) {
		_f.D(e), xf("dns-prefetch", e, null);
	}
	function Cf(e, t) {
		_f.C(e, t), xf("preconnect", e, t);
	}
	function wf(e, t, n) {
		_f.L(e, t, n);
		var r = bf;
		if (r && e && t) {
			var i = "link[rel=\"preload\"][as=\"" + Vt(t) + "\"]";
			t === "image" && n && n.imageSrcSet ? (i += "[imagesrcset=\"" + Vt(n.imageSrcSet) + "\"]", typeof n.imageSizes == "string" && (i += "[imagesizes=\"" + Vt(n.imageSizes) + "\"]")) : i += "[href=\"" + Vt(e) + "\"]";
			var a = i;
			switch (t) {
				case "style":
					a = Af(e);
					break;
				case "script": a = Pf(e);
			}
			mf.has(a) || (e = h({
				rel: "preload",
				href: t === "image" && n && n.imageSrcSet ? void 0 : e,
				as: t
			}, n), mf.set(a, e), r.querySelector(i) !== null || t === "style" && r.querySelector(jf(a)) || t === "script" && r.querySelector(Ff(a)) || (t = r.createElement("link"), Pd(t, "link", e), Ct(t), r.head.appendChild(t)));
		}
	}
	function Tf(e, t) {
		_f.m(e, t);
		var n = bf;
		if (n && e) {
			var r = t && typeof t.as == "string" ? t.as : "script", i = "link[rel=\"modulepreload\"][as=\"" + Vt(r) + "\"][href=\"" + Vt(e) + "\"]", a = i;
			switch (r) {
				case "audioworklet":
				case "paintworklet":
				case "serviceworker":
				case "sharedworker":
				case "worker":
				case "script": a = Pf(e);
			}
			if (!mf.has(a) && (e = h({
				rel: "modulepreload",
				href: e
			}, t), mf.set(a, e), n.querySelector(i) === null)) {
				switch (r) {
					case "audioworklet":
					case "paintworklet":
					case "serviceworker":
					case "sharedworker":
					case "worker":
					case "script": if (n.querySelector(Ff(a))) return;
				}
				r = n.createElement("link"), Pd(r, "link", e), Ct(r), n.head.appendChild(r);
			}
		}
	}
	function Ef(e, t, n) {
		_f.S(e, t, n);
		var r = bf;
		if (r && e) {
			var i = St(r).hoistableStyles, a = Af(e);
			t ||= "default";
			var o = i.get(a);
			if (!o) {
				var s = {
					loading: 0,
					preload: null
				};
				if (o = r.querySelector(jf(a))) s.loading = 5;
				else {
					e = h({
						rel: "stylesheet",
						href: e,
						"data-precedence": t
					}, n), (n = mf.get(a)) && Rf(e, n);
					var c = o = r.createElement("link");
					Ct(c), Pd(c, "link", e), c._p = new Promise(function(e, t) {
						c.onload = e, c.onerror = t;
					}), c.addEventListener("load", function() {
						s.loading |= 1;
					}), c.addEventListener("error", function() {
						s.loading |= 2;
					}), s.loading |= 4, Lf(o, t, r);
				}
				o = {
					type: "stylesheet",
					instance: o,
					count: 1,
					state: s
				}, i.set(a, o);
			}
		}
	}
	function Df(e, t) {
		_f.X(e, t);
		var n = bf;
		if (n && e) {
			var r = St(n).hoistableScripts, i = Pf(e), a = r.get(i);
			a || (a = n.querySelector(Ff(i)), a || (e = h({
				src: e,
				async: !0
			}, t), (t = mf.get(i)) && zf(e, t), a = n.createElement("script"), Ct(a), Pd(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function Of(e, t) {
		_f.M(e, t);
		var n = bf;
		if (n && e) {
			var r = St(n).hoistableScripts, i = Pf(e), a = r.get(i);
			a || (a = n.querySelector(Ff(i)), a || (e = h({
				src: e,
				async: !0,
				type: "module"
			}, t), (t = mf.get(i)) && zf(e, t), a = n.createElement("script"), Ct(a), Pd(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function kf(e, t, n, r) {
		var a = (a = me.current) ? gf(a) : null;
		if (!a) throw Error(i(446));
		switch (e) {
			case "meta":
			case "title": return null;
			case "style": return typeof n.precedence == "string" && typeof n.href == "string" ? (t = Af(n.href), n = St(a).hoistableStyles, r = n.get(t), r || (r = {
				type: "style",
				instance: null,
				count: 0,
				state: null
			}, n.set(t, r)), r) : {
				type: "void",
				instance: null,
				count: 0,
				state: null
			};
			case "link":
				if (n.rel === "stylesheet" && typeof n.href == "string" && typeof n.precedence == "string") {
					e = Af(n.href);
					var o = St(a).hoistableStyles, s = o.get(e);
					if (s || (a = a.ownerDocument || a, s = {
						type: "stylesheet",
						instance: null,
						count: 0,
						state: {
							loading: 0,
							preload: null
						}
					}, o.set(e, s), (o = a.querySelector(jf(e))) && !o._p && (s.instance = o, s.state.loading = 5), mf.has(e) || (n = {
						rel: "preload",
						as: "style",
						href: n.href,
						crossOrigin: n.crossOrigin,
						integrity: n.integrity,
						media: n.media,
						hrefLang: n.hrefLang,
						referrerPolicy: n.referrerPolicy
					}, mf.set(e, n), o || Nf(a, e, n, s.state))), t && r === null) throw Error(i(528, ""));
					return s;
				}
				if (t && r !== null) throw Error(i(529, ""));
				return null;
			case "script": return t = n.async, n = n.src, typeof n == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = Pf(n), n = St(a).hoistableScripts, r = n.get(t), r || (r = {
				type: "script",
				instance: null,
				count: 0,
				state: null
			}, n.set(t, r)), r) : {
				type: "void",
				instance: null,
				count: 0,
				state: null
			};
			default: throw Error(i(444, e));
		}
	}
	function Af(e) {
		return "href=\"" + Vt(e) + "\"";
	}
	function jf(e) {
		return "link[rel=\"stylesheet\"][" + e + "]";
	}
	function Mf(e) {
		return h({}, e, {
			"data-precedence": e.precedence,
			precedence: null
		});
	}
	function Nf(e, t, n, r) {
		e.querySelector("link[rel=\"preload\"][as=\"style\"][" + t + "]") ? r.loading = 1 : (t = e.createElement("link"), r.preload = t, t.addEventListener("load", function() {
			return r.loading |= 1;
		}), t.addEventListener("error", function() {
			return r.loading |= 2;
		}), Pd(t, "link", n), Ct(t), e.head.appendChild(t));
	}
	function Pf(e) {
		return "[src=\"" + Vt(e) + "\"]";
	}
	function Ff(e) {
		return "script[async]" + e;
	}
	function If(e, t, n) {
		if (t.count++, t.instance === null) switch (t.type) {
			case "style":
				var r = e.querySelector("style[data-href~=\"" + Vt(n.href) + "\"]");
				if (r) return t.instance = r, Ct(r), r;
				var a = h({}, n, {
					"data-href": n.href,
					"data-precedence": n.precedence,
					href: null,
					precedence: null
				});
				return r = (e.ownerDocument || e).createElement("style"), Ct(r), Pd(r, "style", a), Lf(r, n.precedence, e), t.instance = r;
			case "stylesheet":
				a = Af(n.href);
				var o = e.querySelector(jf(a));
				if (o) return t.state.loading |= 4, t.instance = o, Ct(o), o;
				r = Mf(n), (a = mf.get(a)) && Rf(r, a), o = (e.ownerDocument || e).createElement("link"), Ct(o);
				var s = o;
				return s._p = new Promise(function(e, t) {
					s.onload = e, s.onerror = t;
				}), Pd(o, "link", r), t.state.loading |= 4, Lf(o, n.precedence, e), t.instance = o;
			case "script": return o = Pf(n.src), (a = e.querySelector(Ff(o))) ? (t.instance = a, Ct(a), a) : (r = n, (a = mf.get(o)) && (r = h({}, n), zf(r, a)), e = e.ownerDocument || e, a = e.createElement("script"), Ct(a), Pd(a, "link", r), e.head.appendChild(a), t.instance = a);
			case "void": return null;
			default: throw Error(i(443, t.type));
		}
		else t.type === "stylesheet" && !(t.state.loading & 4) && (r = t.instance, t.state.loading |= 4, Lf(r, n.precedence, e));
		return t.instance;
	}
	function Lf(e, t, n) {
		for (var r = n.querySelectorAll("link[rel=\"stylesheet\"][data-precedence],style[data-precedence]"), i = r.length ? r[r.length - 1] : null, a = i, o = 0; o < r.length; o++) {
			var s = r[o];
			if (s.dataset.precedence === t) a = s;
			else if (a !== i) break;
		}
		a ? a.parentNode.insertBefore(e, a.nextSibling) : (t = n.nodeType === 9 ? n.head : n, t.insertBefore(e, t.firstChild));
	}
	function Rf(e, t) {
		e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.title ??= t.title;
	}
	function zf(e, t) {
		e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.integrity ??= t.integrity;
	}
	var Bf = null;
	function Vf(e, t, n) {
		if (Bf === null) {
			var r = /* @__PURE__ */ new Map(), i = Bf = /* @__PURE__ */ new Map();
			i.set(n, r);
		} else i = Bf, r = i.get(n), r || (r = /* @__PURE__ */ new Map(), i.set(n, r));
		if (r.has(e)) return r;
		for (r.set(e, null), n = n.getElementsByTagName(e), i = 0; i < n.length; i++) {
			var a = n[i];
			if (!(a[_t] || a[dt] || e === "link" && a.getAttribute("rel") === "stylesheet") && a.namespaceURI !== "http://www.w3.org/2000/svg") {
				var o = a.getAttribute(t) || "";
				o = e + o;
				var s = r.get(o);
				s ? s.push(a) : r.set(o, [a]);
			}
		}
		return r;
	}
	function Hf(e, t, n) {
		e = e.ownerDocument || e, e.head.insertBefore(n, t === "title" ? e.querySelector("head > title") : null);
	}
	function Uf(e, t, n) {
		if (n === 1 || t.itemProp != null) return !1;
		switch (e) {
			case "meta":
			case "title": return !0;
			case "style":
				if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "") break;
				return !0;
			case "link":
				if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError) break;
				switch (t.rel) {
					case "stylesheet": return e = t.disabled, typeof t.precedence == "string" && e == null;
					default: return !0;
				}
			case "script": if (t.async && typeof t.async != "function" && typeof t.async != "symbol" && !t.onLoad && !t.onError && t.src && typeof t.src == "string") return !0;
		}
		return !1;
	}
	function Wf(e) {
		return !(e.type === "stylesheet" && !(e.state.loading & 3));
	}
	function Gf(e, t, n, r) {
		if (n.type === "stylesheet" && (typeof r.media != "string" || !1 !== matchMedia(r.media).matches) && !(n.state.loading & 4)) {
			if (n.instance === null) {
				var i = Af(r.href), a = t.querySelector(jf(i));
				if (a) {
					t = a._p, typeof t == "object" && t && typeof t.then == "function" && (e.count++, e = Jf.bind(e), t.then(e, e)), n.state.loading |= 4, n.instance = a, Ct(a);
					return;
				}
				a = t.ownerDocument || t, r = Mf(r), (i = mf.get(i)) && Rf(r, i), a = a.createElement("link"), Ct(a);
				var o = a;
				o._p = new Promise(function(e, t) {
					o.onload = e, o.onerror = t;
				}), Pd(a, "link", r), n.instance = a;
			}
			e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(n, t), (t = n.state.preload) && !(n.state.loading & 3) && (e.count++, n = Jf.bind(e), t.addEventListener("load", n), t.addEventListener("error", n));
		}
	}
	var Kf = 0;
	function qf(e, t) {
		return e.stylesheets && e.count === 0 && Xf(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(n) {
			var r = setTimeout(function() {
				if (e.stylesheets && Xf(e, e.stylesheets), e.unsuspend) {
					var t = e.unsuspend;
					e.unsuspend = null, t();
				}
			}, 6e4 + t);
			0 < e.imgBytes && Kf === 0 && (Kf = 62500 * Ld());
			var i = setTimeout(function() {
				if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && Xf(e, e.stylesheets), e.unsuspend)) {
					var t = e.unsuspend;
					e.unsuspend = null, t();
				}
			}, (e.imgBytes > Kf ? 50 : 800) + t);
			return e.unsuspend = n, function() {
				e.unsuspend = null, clearTimeout(r), clearTimeout(i);
			};
		} : null;
	}
	function Jf() {
		if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
			if (this.stylesheets) Xf(this, this.stylesheets);
			else if (this.unsuspend) {
				var e = this.unsuspend;
				this.unsuspend = null, e();
			}
		}
	}
	var Yf = null;
	function Xf(e, t) {
		e.stylesheets = null, e.unsuspend !== null && (e.count++, Yf = /* @__PURE__ */ new Map(), t.forEach(Zf, e), Yf = null, Jf.call(e));
	}
	function Zf(e, t) {
		if (!(t.state.loading & 4)) {
			var n = Yf.get(e);
			if (n) var r = n.get(null);
			else {
				n = /* @__PURE__ */ new Map(), Yf.set(e, n);
				for (var i = e.querySelectorAll("link[data-precedence],style[data-precedence]"), a = 0; a < i.length; a++) {
					var o = i[a];
					(o.nodeName === "LINK" || o.getAttribute("media") !== "not all") && (n.set(o.dataset.precedence, o), r = o);
				}
				r && n.set(null, r);
			}
			i = t.instance, o = i.getAttribute("data-precedence"), a = n.get(o) || r, a === r && n.set(null, i), n.set(o, i), this.count++, r = Jf.bind(this), i.addEventListener("load", r), i.addEventListener("error", r), a ? a.parentNode.insertBefore(i, a.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(i, e.firstChild)), t.state.loading |= 4;
		}
	}
	var Qf = {
		$$typeof: te,
		Provider: null,
		Consumer: null,
		_currentValue: k,
		_currentValue2: k,
		_threadCount: 0
	};
	function $f(e, t, n, r, i, a, o, s, c) {
		this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = tt(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = tt(0), this.hiddenUpdates = tt(null), this.identifierPrefix = r, this.onUncaughtError = i, this.onCaughtError = a, this.onRecoverableError = o, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = c, this.incompleteTransitions = /* @__PURE__ */ new Map();
	}
	function ep(e, t, n, r, i, a, o, s, c, l, u, d) {
		return e = new $f(e, t, n, o, c, l, u, d, s), t = 1, !0 === a && (t |= 24), a = di(3, null, null, t), e.current = a, a.stateNode = e, t = la(), t.refCount++, e.pooledCache = t, t.refCount++, a.memoizedState = {
			element: r,
			isDehydrated: n,
			cache: t
		}, Ba(a), e;
	}
	function tp(e) {
		return e ? (e = li, e) : li;
	}
	function np(e, t, n, r, i, a) {
		i = tp(i), r.context === null ? r.context = i : r.pendingContext = i, r = Ha(t), r.payload = { element: n }, a = a === void 0 ? null : a, a !== null && (r.callback = a), n = Ua(e, r, t), n !== null && (hu(n, e, t), V(n, e, t));
	}
	function rp(e, t) {
		if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
			var n = e.retryLane;
			e.retryLane = n !== 0 && n < t ? n : t;
		}
	}
	function ip(e, t) {
		rp(e, t), (e = e.alternate) && rp(e, t);
	}
	function ap(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = oi(e, 67108864);
			t !== null && hu(t, e, 67108864), ip(e, 67108864);
		}
	}
	function op(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = pu();
			t = st(t);
			var n = oi(e, t);
			n !== null && hu(n, e, t), ip(e, t);
		}
	}
	var sp = !0;
	function cp(e, t, n, r) {
		var i = D.T;
		D.T = null;
		var a = O.p;
		try {
			O.p = 2, up(e, t, n, r);
		} finally {
			O.p = a, D.T = i;
		}
	}
	function lp(e, t, n, r) {
		var i = D.T;
		D.T = null;
		var a = O.p;
		try {
			O.p = 8, up(e, t, n, r);
		} finally {
			O.p = a, D.T = i;
		}
	}
	function up(e, t, n, r) {
		if (sp) {
			var i = dp(r);
			if (i === null) wd(e, t, r, fp, n), Cp(e, r);
			else if (Tp(i, e, t, n, r)) r.stopPropagation();
			else if (Cp(e, r), t & 4 && -1 < Sp.indexOf(e)) {
				for (; i !== null;) {
					var a = bt(i);
					if (a !== null) switch (a.tag) {
						case 3:
							if (a = a.stateNode, a.current.memoizedState.isDehydrated) {
								var o = Xe(a.pendingLanes);
								if (o !== 0) {
									var s = a;
									for (s.pendingLanes |= 2, s.entangledLanes |= 2; o;) {
										var c = 1 << 31 - Ue(o);
										s.entanglements[1] |= c, o &= ~c;
									}
									rd(a), !(K & 6) && (tu = je() + 500, id(0, !1));
								}
							}
							break;
						case 31:
						case 13: s = oi(a, 2), s !== null && hu(s, a, 2), bu(), ip(a, 2);
					}
					if (a = dp(r), a === null && wd(e, t, r, fp, n), a === i) break;
					i = a;
				}
				i !== null && r.stopPropagation();
			} else wd(e, t, r, null, n);
		}
	}
	function dp(e) {
		return e = an(e), pp(e);
	}
	var fp = null;
	function pp(e) {
		if (fp = null, e = yt(e), e !== null) {
			var t = o(e);
			if (t === null) e = null;
			else {
				var n = t.tag;
				if (n === 13) {
					if (e = s(t), e !== null) return e;
					e = null;
				} else if (n === 31) {
					if (e = c(t), e !== null) return e;
					e = null;
				} else if (n === 3) {
					if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
					e = null;
				} else t !== e && (e = null);
			}
		}
		return fp = e, null;
	}
	function mp(e) {
		switch (e) {
			case "beforetoggle":
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
			case "toggle":
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
			case "selectstart": return 2;
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
			case "touchmove":
			case "wheel":
			case "mouseenter":
			case "mouseleave":
			case "pointerenter":
			case "pointerleave": return 8;
			case "message": switch (Me()) {
				case Ne: return 2;
				case Pe: return 8;
				case Fe:
				case Ie: return 32;
				case Le: return 268435456;
				default: return 32;
			}
			default: return 32;
		}
	}
	var hp = !1, gp = null, _p = null, vp = null, yp = /* @__PURE__ */ new Map(), bp = /* @__PURE__ */ new Map(), xp = [], Sp = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");
	function Cp(e, t) {
		switch (e) {
			case "focusin":
			case "focusout":
				gp = null;
				break;
			case "dragenter":
			case "dragleave":
				_p = null;
				break;
			case "mouseover":
			case "mouseout":
				vp = null;
				break;
			case "pointerover":
			case "pointerout":
				yp.delete(t.pointerId);
				break;
			case "gotpointercapture":
			case "lostpointercapture": bp.delete(t.pointerId);
		}
	}
	function wp(e, t, n, r, i, a) {
		return e === null || e.nativeEvent !== a ? (e = {
			blockedOn: t,
			domEventName: n,
			eventSystemFlags: r,
			nativeEvent: a,
			targetContainers: [i]
		}, t !== null && (t = bt(t), t !== null && ap(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e);
	}
	function Tp(e, t, n, r, i) {
		switch (t) {
			case "focusin": return gp = wp(gp, e, t, n, r, i), !0;
			case "dragenter": return _p = wp(_p, e, t, n, r, i), !0;
			case "mouseover": return vp = wp(vp, e, t, n, r, i), !0;
			case "pointerover":
				var a = i.pointerId;
				return yp.set(a, wp(yp.get(a) || null, e, t, n, r, i)), !0;
			case "gotpointercapture": return a = i.pointerId, bp.set(a, wp(bp.get(a) || null, e, t, n, r, i)), !0;
		}
		return !1;
	}
	function Ep(e) {
		var t = yt(e.target);
		if (t !== null) {
			var n = o(t);
			if (n !== null) {
				if (t = n.tag, t === 13) {
					if (t = s(n), t !== null) {
						e.blockedOn = t, ut(e.priority, function() {
							op(n);
						});
						return;
					}
				} else if (t === 31) {
					if (t = c(n), t !== null) {
						e.blockedOn = t, ut(e.priority, function() {
							op(n);
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
	function Dp(e) {
		if (e.blockedOn !== null) return !1;
		for (var t = e.targetContainers; 0 < t.length;) {
			var n = dp(e.nativeEvent);
			if (n === null) {
				n = e.nativeEvent;
				var r = new n.constructor(n.type, n);
				rn = r, n.target.dispatchEvent(r), rn = null;
			} else return t = bt(n), t !== null && ap(t), e.blockedOn = n, !1;
			t.shift();
		}
		return !0;
	}
	function Op(e, t, n) {
		Dp(e) && n.delete(t);
	}
	function kp() {
		hp = !1, gp !== null && Dp(gp) && (gp = null), _p !== null && Dp(_p) && (_p = null), vp !== null && Dp(vp) && (vp = null), yp.forEach(Op), bp.forEach(Op);
	}
	function Ap(e, n) {
		e.blockedOn === n && (e.blockedOn = null, hp || (hp = !0, t.unstable_scheduleCallback(t.unstable_NormalPriority, kp)));
	}
	var jp = null;
	function Mp(e) {
		jp !== e && (jp = e, t.unstable_scheduleCallback(t.unstable_NormalPriority, function() {
			jp === e && (jp = null);
			for (var t = 0; t < e.length; t += 3) {
				var n = e[t], r = e[t + 1], i = e[t + 2];
				if (typeof r != "function") {
					if (pp(r || n) === null) continue;
					break;
				}
				var a = bt(n);
				a !== null && (e.splice(t, 3), t -= 3, ws(a, {
					pending: !0,
					data: i,
					method: n.method,
					action: r
				}, r, i));
			}
		}));
	}
	function Np(e) {
		function t(t) {
			return Ap(t, e);
		}
		gp !== null && Ap(gp, e), _p !== null && Ap(_p, e), vp !== null && Ap(vp, e), yp.forEach(t), bp.forEach(t);
		for (var n = 0; n < xp.length; n++) {
			var r = xp[n];
			r.blockedOn === e && (r.blockedOn = null);
		}
		for (; 0 < xp.length && (n = xp[0], n.blockedOn === null);) Ep(n), n.blockedOn === null && xp.shift();
		if (n = (e.ownerDocument || e).$$reactFormReplay, n != null) for (r = 0; r < n.length; r += 3) {
			var i = n[r], a = n[r + 1], o = i[ft] || null;
			if (typeof a == "function") o || Mp(n);
			else if (o) {
				var s = null;
				if (a && a.hasAttribute("formAction")) {
					if (i = a, o = a[ft] || null) s = o.formAction;
					else if (pp(i) !== null) continue;
				} else s = o.action;
				typeof s == "function" ? n[r + 1] = s : (n.splice(r, 3), r -= 3), Mp(n);
			}
		}
	}
	function Pp() {
		function e(e) {
			e.canIntercept && e.info === "react-transition" && e.intercept({
				handler: function() {
					return new Promise(function(e) {
						return i = e;
					});
				},
				focusReset: "manual",
				scroll: "manual"
			});
		}
		function t() {
			i !== null && (i(), i = null), r || setTimeout(n, 20);
		}
		function n() {
			if (!r && !navigation.transition) {
				var e = navigation.currentEntry;
				e && e.url != null && navigation.navigate(e.url, {
					state: e.getState(),
					info: "react-transition",
					history: "replace"
				});
			}
		}
		if (typeof navigation == "object") {
			var r = !1, i = null;
			return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(n, 100), function() {
				r = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), i !== null && (i(), i = null);
			};
		}
	}
	function Fp(e) {
		this._internalRoot = e;
	}
	Ip.prototype.render = Fp.prototype.render = function(e) {
		var t = this._internalRoot;
		if (t === null) throw Error(i(409));
		var n = t.current;
		np(n, pu(), e, t, null, null);
	}, Ip.prototype.unmount = Fp.prototype.unmount = function() {
		var e = this._internalRoot;
		if (e !== null) {
			this._internalRoot = null;
			var t = e.containerInfo;
			np(e.current, 2, null, e, null, null), bu(), t[pt] = null;
		}
	};
	function Ip(e) {
		this._internalRoot = e;
	}
	Ip.prototype.unstable_scheduleHydration = function(e) {
		if (e) {
			var t = lt();
			e = {
				blockedOn: null,
				target: e,
				priority: t
			};
			for (var n = 0; n < xp.length && t !== 0 && t < xp[n].priority; n++);
			xp.splice(n, 0, e), n === 0 && Ep(e);
		}
	};
	var Lp = n.version;
	if (Lp !== "19.2.6") throw Error(i(527, Lp, "19.2.6"));
	O.findDOMNode = function(e) {
		var t = e._reactInternals;
		if (t === void 0) throw typeof e.render == "function" ? Error(i(188)) : (e = Object.keys(e).join(","), Error(i(268, e)));
		return e = d(t), e = e === null ? null : p(e), e = e === null ? null : e.stateNode, e;
	};
	var Rp = {
		bundleType: 0,
		version: "19.2.6",
		rendererPackageName: "react-dom",
		currentDispatcherRef: D,
		reconcilerVersion: "19.2.6"
	};
	if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
		var zp = __REACT_DEVTOOLS_GLOBAL_HOOK__;
		if (!zp.isDisabled && zp.supportsFiber) try {
			Be = zp.inject(Rp), Ve = zp;
		} catch {}
	}
	e.createRoot = function(e, t) {
		if (!a(e)) throw Error(i(299));
		var n = !1, r = "", o = qs, s = Js, c = Ys;
		return t != null && (!0 === t.unstable_strictMode && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onUncaughtError !== void 0 && (o = t.onUncaughtError), t.onCaughtError !== void 0 && (s = t.onCaughtError), t.onRecoverableError !== void 0 && (c = t.onRecoverableError)), t = ep(e, 1, !1, null, null, n, r, null, o, s, c, Pp), e[pt] = t.current, Sd(e), new Fp(t);
	};
})), g = /* @__PURE__ */ o(((e, t) => {
	function n() {
		if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
			__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
		} catch (e) {
			console.error(e);
		}
	}
	n(), t.exports = h();
})), _ = /* @__PURE__ */ o(((e) => {
	var t = Symbol.for("react.transitional.element"), n = Symbol.for("react.fragment");
	function r(e, n, r) {
		var i = null;
		if (r !== void 0 && (i = "" + r), n.key !== void 0 && (i = "" + n.key), "key" in n) for (var a in r = {}, n) a !== "key" && (r[a] = n[a]);
		else r = n;
		return n = r.ref, {
			$$typeof: t,
			type: e,
			key: i,
			ref: n === void 0 ? null : n,
			props: r
		};
	}
	e.Fragment = n, e.jsx = r, e.jsxs = r;
})), v = /* @__PURE__ */ o(((e, t) => {
	t.exports = _();
})), y = /* @__PURE__ */ c(u(), 1), b = v(), x = y.createContext(void 0), ee = (e) => {
	let t = y.useContext(x);
	if (e) return e;
	if (!t) throw Error("No QueryClient set, use QueryClientProvider to set one");
	return t;
}, te = ({ client: e, children: t }) => (y.useEffect(() => (e.mount(), () => {
	e.unmount();
}), [e]), /* @__PURE__ */ (0, b.jsx)(x.Provider, {
	value: e,
	children: t
})), S = {
	setTimeout: (e, t) => setTimeout(e, t),
	clearTimeout: (e) => clearTimeout(e),
	setInterval: (e, t) => setInterval(e, t),
	clearInterval: (e) => clearInterval(e)
}, ne = new class {
	#e = S;
	setTimeoutProvider(e) {
		this.#e = e;
	}
	setTimeout(e, t) {
		return this.#e.setTimeout(e, t);
	}
	clearTimeout(e) {
		this.#e.clearTimeout(e);
	}
	setInterval(e, t) {
		return this.#e.setInterval(e, t);
	}
	clearInterval(e) {
		this.#e.clearInterval(e);
	}
}();
function re(e) {
	setTimeout(e, 0);
}
//#endregion
//#region ../../../../sites/munshi-ji/node_modules/.pnpm/@tanstack+query-core@5.104.2/node_modules/@tanstack/query-core/build/modern/utils.js
var ie = typeof window > "u" || "Deno" in globalThis;
function C() {}
function ae(e, t) {
	return typeof e == "function" ? e(t) : e;
}
function oe(e) {
	return typeof e == "number" && e >= 0 && e !== Infinity;
}
function se(e, t) {
	return Math.max(e + (t || 0) - Date.now(), 0);
}
function w(e, t) {
	return typeof e == "function" ? e(t) : e;
}
function ce(e, t) {
	let { type: n = "all", exact: r, fetchStatus: i, predicate: a, queryKey: o, stale: s } = e;
	if (o) {
		if (r) {
			if (t.queryHash !== E(o, t.options)) return !1;
		} else if (!O(t.queryKey, o)) return !1;
	}
	if (n !== "all") {
		let e = t.isActive();
		if (n === "active" && !e || n === "inactive" && e) return !1;
	}
	return !(typeof s == "boolean" && t.isStale() !== s || i && i !== t.state.fetchStatus || a && !a(t));
}
function T(e, t) {
	let { exact: n, status: r, predicate: i, mutationKey: a } = e;
	if (a) {
		if (!t.options.mutationKey) return !1;
		if (n) {
			if (D(t.options.mutationKey) !== D(a)) return !1;
		} else if (!O(t.options.mutationKey, a)) return !1;
	}
	return !(r && t.state.status !== r || i && !i(t));
}
function E(e, t) {
	return (t?.queryKeyHashFn || D)(e);
}
function D(e) {
	return JSON.stringify(e, (e, t) => A(t) ? Object.keys(t).sort().reduce((e, n) => (e[n] = t[n], e), {}) : t);
}
function O(e, t) {
	if (e === t) return !0;
	if (typeof e != typeof t) return !1;
	if (e && t && typeof e == "object" && typeof t == "object") {
		if (Array.isArray(e) && Array.isArray(t)) {
			if (t.length > e.length) return !1;
			for (let n = 0; n < t.length; n++) if (!O(e[n], t[n])) return !1;
			return !0;
		}
		let n = Object.keys(t);
		for (let r of n) if (!O(e[r], t[r])) return !1;
		return !0;
	}
	return !1;
}
var k = Object.prototype.hasOwnProperty;
function le(e, t, n = 0) {
	if (e === t) return e;
	if (n > 500) return t;
	let r = de(e) && de(t);
	if (!r && !(A(e) && A(t))) return t;
	let i = (r ? e : Object.keys(e)).length, a = r ? t : Object.keys(t), o = a.length, s = r ? Array(o) : {}, c = 0;
	for (let l = 0; l < o; l++) {
		let o = r ? l : a[l], u = e[o], d = t[o];
		if (u === d) {
			s[o] = u, (r ? l < i : k.call(e, o)) && c++;
			continue;
		}
		if (u === null || d === null || typeof u != "object" || typeof d != "object") {
			s[o] = d;
			continue;
		}
		let f = le(u, d, n + 1);
		s[o] = f, f === u && c++;
	}
	return i === o && c === i ? e : s;
}
function ue(e, t) {
	if (!t || Object.keys(e).length !== Object.keys(t).length) return !1;
	for (let n in e) if (e[n] !== t[n]) return !1;
	return !0;
}
function de(e) {
	return Array.isArray(e) && e.length === Object.keys(e).length;
}
function A(e) {
	if (!j(e)) return !1;
	let t = Object.getPrototypeOf(e), n = t?.constructor;
	if (n === void 0) return !0;
	if (typeof n != "function") return !1;
	let r = n.prototype;
	return !(!j(r) || !r.hasOwnProperty("isPrototypeOf") || t !== Object.prototype);
}
function j(e) {
	return Object.prototype.toString.call(e) === "[object Object]";
}
function fe(e) {
	return new Promise((t) => {
		ne.setTimeout(t, e);
	});
}
function pe(e, t, n) {
	return typeof n.structuralSharing == "function" ? n.structuralSharing(e, t) : n.structuralSharing === !1 ? t : le(e, t);
}
function me(e, t, n = 0) {
	let r = [...e, t];
	return n && r.length > n ? r.slice(1) : r;
}
function he(e, t, n = 0) {
	let r = [t, ...e];
	return n && r.length > n ? r.slice(0, -1) : r;
}
var M = Symbol();
function ge(e, t) {
	return !e.queryFn && t?.initialPromise ? () => t.initialPromise : !e.queryFn || e.queryFn === M ? () => Promise.reject(/* @__PURE__ */ Error(`Missing queryFn: '${e.queryHash}'`)) : e.queryFn;
}
function _e(e, t) {
	return typeof e == "function" ? e(...t) : !!e;
}
function ve(e, t, n) {
	let r = !1, i;
	return Object.defineProperty(e, "signal", {
		enumerable: !0,
		get: () => (i ??= t(), r ? i : (r = !0, i.aborted ? n() : i.addEventListener("abort", n, { once: !0 }), i))
	}), e;
}
//#endregion
//#region ../../../../sites/munshi-ji/node_modules/.pnpm/@tanstack+query-core@5.104.2/node_modules/@tanstack/query-core/build/modern/environmentManager.js
var ye = () => ie, be = () => ye(), xe = class {
	constructor() {
		this.listeners = /* @__PURE__ */ new Set(), this.subscribe = this.subscribe.bind(this);
	}
	subscribe(e) {
		return this.listeners.add(e), this.onSubscribe(), () => {
			this.listeners.delete(e), this.onUnsubscribe();
		};
	}
	hasListeners() {
		return this.listeners.size > 0;
	}
	onSubscribe() {}
	onUnsubscribe() {}
}, Se = new class extends xe {
	#e;
	#t;
	#n;
	constructor() {
		super(), this.#n = (e) => {
			if (typeof window < "u" && window.addEventListener) {
				let t = () => e();
				return window.addEventListener("visibilitychange", t, !1), () => {
					window.removeEventListener("visibilitychange", t);
				};
			}
		};
	}
	onSubscribe() {
		this.#t || this.setEventListener(this.#n);
	}
	onUnsubscribe() {
		this.hasListeners() || (this.#t?.(), this.#t = void 0);
	}
	setEventListener(e) {
		this.#n = e, this.#t?.(), this.#t = e((e) => {
			typeof e == "boolean" ? this.setFocused(e) : this.onFocus();
		});
	}
	setFocused(e) {
		this.#e !== e && (this.#e = e, this.onFocus());
	}
	onFocus() {
		let e = this.isFocused();
		this.listeners.forEach((t) => {
			t(e);
		});
	}
	isFocused() {
		return typeof this.#e == "boolean" ? this.#e : globalThis.document?.visibilityState !== "hidden";
	}
}(), Ce = re;
function we() {
	let e = [], t = 0, n = (e) => {
		e();
	}, r = (e) => {
		e();
	}, i = Ce, a = (r) => {
		t ? e.push(r) : i(() => {
			n(r);
		});
	}, o = () => {
		let t = e;
		e = [], t.length && i(() => {
			r(() => {
				t.forEach((e) => {
					n(e);
				});
			});
		});
	};
	return {
		batch: (e) => {
			let n;
			t++;
			try {
				n = e();
			} finally {
				t--, t || o();
			}
			return n;
		},
		batchCalls: (e) => (...t) => {
			a(() => {
				e(...t);
			});
		},
		schedule: a,
		setNotifyFunction: (e) => {
			n = e;
		},
		setBatchNotifyFunction: (e) => {
			r = e;
		},
		setScheduler: (e) => {
			i = e;
		}
	};
}
var Te = we(), Ee = new class extends xe {
	#e = !0;
	#t;
	#n;
	constructor() {
		super(), this.#n = (e) => {
			if (typeof window < "u" && window.addEventListener) {
				let t = () => e(!0), n = () => e(!1);
				return window.addEventListener("online", t, !1), window.addEventListener("offline", n, !1), () => {
					window.removeEventListener("online", t), window.removeEventListener("offline", n);
				};
			}
		};
	}
	onSubscribe() {
		this.#t || this.setEventListener(this.#n);
	}
	onUnsubscribe() {
		this.hasListeners() || (this.#t?.(), this.#t = void 0);
	}
	setEventListener(e) {
		this.#n = e, this.#t?.(), this.#t = e(this.setOnline.bind(this));
	}
	setOnline(e) {
		this.#e !== e && (this.#e = e, this.listeners.forEach((t) => {
			t(e);
		}));
	}
	isOnline() {
		return this.#e;
	}
}();
//#endregion
//#region ../../../../sites/munshi-ji/node_modules/.pnpm/@tanstack+query-core@5.104.2/node_modules/@tanstack/query-core/build/modern/retryer.js
function De(e) {
	return Math.min(1e3 * 2 ** e, 3e4);
}
function Oe(e) {
	return (e ?? "online") === "online" ? Ee.isOnline() : !0;
}
var ke = class extends Error {
	constructor(e) {
		super("CancelledError"), this.revert = e?.revert, this.silent = e?.silent;
	}
};
function Ae(e) {
	let t = !1, n = 0, r, i = "pending", a, o, s = new Promise((e, t) => {
		a = e, o = t;
	});
	s.catch(C);
	let c = () => i !== "pending", l = (t) => {
		if (!c()) {
			let n = new ke(t);
			h(n), e.onCancel?.(n);
		}
	}, u = () => {
		t = !0;
	}, d = () => {
		t = !1;
	}, f = () => Se.isFocused() && (e.networkMode === "always" || Ee.isOnline()) && e.canRun(), p = () => Oe(e.networkMode) && e.canRun(), m = (e) => {
		c() || (r?.(), i = "resolved", a(e));
	}, h = (e) => {
		c() || (r?.(), i = "rejected", o(e));
	}, g = (t) => new Promise((n) => {
		r = (e) => {
			(c() || t()) && n(e);
		}, e.onPause?.();
	}).then(() => {
		r = void 0, c() || e.onContinue?.();
	}), _ = () => {
		if (c()) return;
		let r, i = n === 0 ? e.initialPromise : void 0;
		try {
			r = i ?? e.fn();
		} catch (e) {
			r = Promise.reject(e);
		}
		Promise.resolve(r).then(m).catch((r) => {
			if (c()) return;
			let i = e.retry ?? (be() ? 0 : 3), a = e.retryDelay ?? De, o = typeof a == "function" ? a(n, r) : a, s = i === !0 || typeof i == "number" && n < i || typeof i == "function" && i(n, r);
			if (t || !s) {
				h(r);
				return;
			}
			n++, e.onFail?.(n, r), fe(o).then(() => f() ? void 0 : g(f)).then(() => {
				t ? h(r) : _();
			});
		});
	};
	return {
		promise: s,
		status: () => i,
		cancel: l,
		continue: () => (r?.(), s),
		cancelRetry: u,
		continueRetry: d,
		canStart: p,
		start: () => (p() ? _() : g(p).then(_), s)
	};
}
//#endregion
//#region ../../../../sites/munshi-ji/node_modules/.pnpm/@tanstack+query-core@5.104.2/node_modules/@tanstack/query-core/build/modern/removable.js
var je = class {
	#e;
	destroy() {
		this.clearGcTimeout();
	}
	scheduleGc() {
		this.clearGcTimeout(), oe(this.gcTime) && (this.#e = ne.setTimeout(() => {
			this.optionalRemove();
		}, this.gcTime));
	}
	updateGcTime(e) {
		this.gcTime = Math.max(this.gcTime || 0, e ?? (be() ? Infinity : 3e5));
	}
	clearGcTimeout() {
		this.#e !== void 0 && (ne.clearTimeout(this.#e), this.#e = void 0);
	}
};
//#endregion
//#region ../../../../sites/munshi-ji/node_modules/.pnpm/@tanstack+query-core@5.104.2/node_modules/@tanstack/query-core/build/modern/infiniteQueryBehavior.js
function Me(e) {
	return { onFetch: (t, n) => {
		let r = t.options, i = t.fetchOptions?.meta?.fetchMore?.direction, a = t.state.data?.pages || [], o = t.state.data?.pageParams || [], s = {
			pages: [],
			pageParams: []
		}, c = 0, l = async () => {
			let n = !1, l = (e) => {
				ve(e, () => t.signal, () => n = !0);
			}, u = ge(t.options, t.fetchOptions), d = async (e, r, i) => {
				if (n) return Promise.reject(t.signal.reason);
				if (r == null && e.pages.length) return Promise.resolve(e);
				let a = await u((() => {
					let e = {
						client: t.client,
						queryKey: t.queryKey,
						pageParam: r,
						direction: i ? "backward" : "forward",
						meta: t.options.meta
					};
					return l(e), e;
				})()), { maxPages: o } = t.options, s = i ? he : me;
				return {
					pages: s(e.pages, a, o),
					pageParams: s(e.pageParams, r, o)
				};
			};
			if (i && a.length) {
				let e = i === "backward", t = e ? Pe : Ne, n = {
					pages: a,
					pageParams: o
				};
				s = await d(n, t(r, n), e);
			} else {
				let t = e ?? a.length;
				do {
					let e = c === 0 ? o[0] ?? r.initialPageParam : Ne(r, s);
					if (c > 0 && e == null) break;
					s = await d(s, e), c++;
				} while (c < t);
			}
			return s;
		};
		t.options.persister ? t.fetchFn = () => t.options.persister?.(l, {
			client: t.client,
			queryKey: t.queryKey,
			meta: t.options.meta,
			signal: t.signal
		}, n) : t.fetchFn = l;
	} };
}
function Ne(e, { pages: t, pageParams: n }) {
	let r = t.length - 1;
	return t.length > 0 ? e.getNextPageParam(t[r], t, n[r], n) : void 0;
}
function Pe(e, { pages: t, pageParams: n }) {
	return t.length > 0 ? e.getPreviousPageParam?.(t[0], t, n[0], n) : void 0;
}
//#endregion
//#region ../../../../sites/munshi-ji/node_modules/.pnpm/@tanstack+query-core@5.104.2/node_modules/@tanstack/query-core/build/modern/query.js
var Fe = class extends je {
	#e;
	#t;
	#n;
	#r;
	#i;
	#a;
	#o;
	#s;
	constructor(e) {
		super(), this.#s = !1, this.#o = e.defaultOptions, this.setOptions(e.options), this.observers = [], this.#i = e.client, this.#r = this.#i.getQueryCache(), this.queryKey = e.queryKey, this.queryHash = e.queryHash, this.#t = Re(this.options), this.state = e.state ?? this.#t, this.scheduleGc();
	}
	get meta() {
		return this.options.meta;
	}
	get queryType() {
		return this.#e;
	}
	get promise() {
		return this.#a?.promise;
	}
	setOptions(e) {
		if (this.options = {
			...this.#o,
			...e
		}, e?._type && (this.#e = e._type), this.updateGcTime(this.options.gcTime), this.state && this.state.data === void 0) {
			let e = Re(this.options);
			e.data !== void 0 && (this.setState(Le(e.data, e.dataUpdatedAt)), this.#t = e);
		}
	}
	optionalRemove() {
		!this.observers.length && this.state.fetchStatus === "idle" && this.#r.remove(this);
	}
	setData(e, t) {
		let n = pe(this.state.data, e, this.options);
		return this.#c({
			data: n,
			type: "success",
			dataUpdatedAt: t?.updatedAt,
			manual: t?.manual
		}), n;
	}
	setState(e) {
		this.#c({
			type: "setState",
			state: e
		});
	}
	cancel(e) {
		let t = this.#a?.promise;
		return this.#a?.cancel(e), t ? t.then(C).catch(C) : Promise.resolve();
	}
	destroy() {
		super.destroy(), this.cancel({ silent: !0 });
	}
	get resetState() {
		return this.#t;
	}
	reset() {
		this.destroy(), this.setState(this.resetState);
	}
	isActive() {
		return this.observers.some((e) => w(e.options.enabled, this) !== !1);
	}
	isDisabled() {
		return this.getObserversCount() > 0 ? !this.isActive() : this.options.queryFn === M || !this.isFetched();
	}
	isFetched() {
		return this.state.dataUpdateCount + this.state.errorUpdateCount > 0;
	}
	isStatic() {
		return this.getObserversCount() > 0 ? this.observers.some((e) => w(e.options.staleTime, this) === "static") : !1;
	}
	isStale() {
		return this.getObserversCount() > 0 ? this.observers.some((e) => e.getCurrentResult().isStale) : this.state.data === void 0 || this.state.isInvalidated;
	}
	isStaleByTime(e = 0) {
		return this.state.data === void 0 ? !0 : e === "static" ? !1 : this.state.isInvalidated ? !0 : !se(this.state.dataUpdatedAt, e);
	}
	onFocus() {
		this.observers.find((e) => e.shouldFetchOnWindowFocus())?.refetch({ cancelRefetch: !1 }), this.#a?.continue();
	}
	onOnline() {
		this.observers.find((e) => e.shouldFetchOnReconnect())?.refetch({ cancelRefetch: !1 }), this.#a?.continue();
	}
	addObserver(e) {
		this.observers.includes(e) || (this.observers.push(e), this.clearGcTimeout(), this.#r.notify({
			type: "observerAdded",
			query: this,
			observer: e
		}));
	}
	removeObserver(e) {
		let t = this.observers.indexOf(e);
		t !== -1 && (this.observers.splice(t, 1), this.observers.length || (this.#a && (this.#s || this.state.fetchStatus === "paused" && this.state.status === "pending" ? this.#a.cancel({ revert: !0 }) : this.#a.cancelRetry()), this.scheduleGc()), this.#r.notify({
			type: "observerRemoved",
			query: this,
			observer: e
		}));
	}
	getObserversCount() {
		return this.observers.length;
	}
	invalidate() {
		this.state.isInvalidated || this.#c({ type: "invalidate" });
	}
	async fetch(e, t) {
		if (this.state.fetchStatus !== "idle" && this.#a?.status() !== "rejected") {
			if (this.state.data !== void 0 && t?.cancelRefetch) this.cancel({ silent: !0 });
			else if (this.#a) return this.#a.continueRetry(), this.#a.promise;
		}
		if (e && this.setOptions(e), !this.options.queryFn) {
			let e = this.observers.find((e) => e.options.queryFn);
			e && this.setOptions(e.options);
		}
		let n = new AbortController(), r = (e) => {
			Object.defineProperty(e, "signal", {
				enumerable: !0,
				get: () => (this.#s = !0, n.signal)
			});
		}, i = () => {
			let e = ge(this.options, t), n = (() => {
				let e = {
					client: this.#i,
					queryKey: this.queryKey,
					meta: this.meta
				};
				return r(e), e;
			})();
			return this.#s = !1, this.options.persister ? this.options.persister(e, n, this) : e(n);
		}, a = (() => {
			let e = {
				fetchOptions: t,
				options: this.options,
				queryKey: this.queryKey,
				client: this.#i,
				state: this.state,
				fetchFn: i
			};
			return r(e), e;
		})();
		(this.#e === "infinite" ? Me(this.options.pages) : this.options.behavior)?.onFetch(a, this), this.#n = this.state, (this.state.fetchStatus === "idle" || this.state.fetchMeta !== a.fetchOptions?.meta) && this.#c({
			type: "fetch",
			meta: a.fetchOptions?.meta
		});
		let o = this.#a = Ae({
			initialPromise: t?.initialPromise,
			fn: a.fetchFn,
			onCancel: (e) => {
				e instanceof ke && e.revert && this.setState({
					...this.#n,
					fetchStatus: "idle"
				}), n.abort();
			},
			onFail: (e, t) => {
				this.#c({
					type: "failed",
					failureCount: e,
					error: t
				});
			},
			onPause: () => {
				this.#c({ type: "pause" });
			},
			onContinue: () => {
				this.#c({ type: "continue" });
			},
			retry: a.options.retry,
			retryDelay: a.options.retryDelay,
			networkMode: a.options.networkMode,
			canRun: () => !0
		});
		try {
			let e = await o.start();
			if (e === void 0) throw Error(`${this.queryHash} data is undefined`);
			return this.setData(e), this.#r.config.onSuccess?.(e, this), this.#r.config.onSettled?.(e, this.state.error, this), e;
		} catch (e) {
			if (e instanceof ke) {
				if (e.silent) return this.#a.promise;
				if (e.revert) {
					if (this.state.data === void 0) throw e;
					return this.state.data;
				}
			}
			throw this.#c({
				type: "error",
				error: e
			}), this.#r.config.onError?.(e, this), this.#r.config.onSettled?.(this.state.data, e, this), e;
		} finally {
			this.#a === o && (this.#a = void 0), this.scheduleGc();
		}
	}
	#c(e) {
		let t = (t) => {
			switch (e.type) {
				case "failed": return {
					...t,
					fetchFailureCount: e.failureCount,
					fetchFailureReason: e.error
				};
				case "pause": return {
					...t,
					fetchStatus: "paused"
				};
				case "continue": return {
					...t,
					fetchStatus: "fetching"
				};
				case "fetch": return {
					...t,
					...Ie(t.data, this.options),
					fetchMeta: e.meta ?? null
				};
				case "success":
					let n = {
						...t,
						...Le(e.data, e.dataUpdatedAt),
						dataUpdateCount: t.dataUpdateCount + 1,
						...!e.manual && {
							fetchStatus: "idle",
							fetchFailureCount: 0,
							fetchFailureReason: null
						}
					};
					return this.#n = e.manual ? n : void 0, n;
				case "error":
					let r = e.error;
					return {
						...t,
						error: r,
						errorUpdateCount: t.errorUpdateCount + 1,
						errorUpdatedAt: Date.now(),
						fetchFailureCount: t.fetchFailureCount + 1,
						fetchFailureReason: r,
						fetchStatus: "idle",
						status: "error",
						isInvalidated: !0
					};
				case "invalidate": return {
					...t,
					isInvalidated: !0
				};
				case "setState": return {
					...t,
					...e.state
				};
			}
		};
		this.state = t(this.state), Te.batch(() => {
			this.observers.slice().forEach((e) => {
				e.onQueryUpdate();
			}), this.#r.notify({
				query: this,
				type: "updated",
				action: e
			});
		});
	}
};
function Ie(e, t) {
	return {
		fetchFailureCount: 0,
		fetchFailureReason: null,
		fetchStatus: Oe(t.networkMode) ? "fetching" : "paused",
		...e === void 0 && {
			error: null,
			status: "pending"
		}
	};
}
function Le(e, t) {
	return {
		data: e,
		dataUpdatedAt: t ?? Date.now(),
		error: null,
		isInvalidated: !1,
		status: "success"
	};
}
function Re(e) {
	let t = typeof e.initialData == "function" ? e.initialData() : e.initialData, n = t !== void 0, r = n ? typeof e.initialDataUpdatedAt == "function" ? e.initialDataUpdatedAt() : e.initialDataUpdatedAt : 0;
	return {
		data: t,
		dataUpdateCount: 0,
		dataUpdatedAt: n ? r ?? Date.now() : 0,
		error: null,
		errorUpdateCount: 0,
		errorUpdatedAt: 0,
		fetchFailureCount: 0,
		fetchFailureReason: null,
		fetchMeta: null,
		isInvalidated: !1,
		status: n ? "success" : "pending",
		fetchStatus: "idle"
	};
}
//#endregion
//#region ../../../../sites/munshi-ji/node_modules/.pnpm/@tanstack+query-core@5.104.2/node_modules/@tanstack/query-core/build/modern/queryObserver.js
var ze = class extends xe {
	#e;
	#t = void 0;
	#n = void 0;
	#r = void 0;
	#i;
	#a;
	#o;
	#s;
	#c;
	#l;
	#u;
	#d;
	#f;
	#p = /* @__PURE__ */ new Set();
	constructor(e, t) {
		super(), this.options = t, this.#e = e, this.#o = null, this.bindMethods(), this.setOptions(t);
	}
	bindMethods() {
		this.refetch = this.refetch.bind(this);
	}
	onSubscribe() {
		this.listeners.size === 1 && (this.#t.addObserver(this), Ve(this.#t, this.options) ? this.#m() : this.updateResult(), this.#y());
	}
	onUnsubscribe() {
		this.hasListeners() || this.destroy();
	}
	shouldFetchOnReconnect() {
		return He(this.#t, this.options, this.options.refetchOnReconnect);
	}
	shouldFetchOnWindowFocus() {
		return He(this.#t, this.options, this.options.refetchOnWindowFocus);
	}
	destroy() {
		this.listeners = /* @__PURE__ */ new Set(), this.#b(), this.#x(), this.#t.removeObserver(this);
	}
	setOptions(e) {
		let t = this.options, n = this.#t;
		if (this.options = this.#e.defaultQueryOptions(e), this.options.enabled !== void 0 && typeof this.options.enabled != "boolean" && typeof this.options.enabled != "function" && typeof w(this.options.enabled, this.#t) != "boolean") throw Error("Expected enabled to be a boolean or a callback that returns a boolean");
		this.#S(), this.#t.setOptions(this.options), t._defaulted && !ue(this.options, t) && this.#e.getQueryCache().notify({
			type: "observerOptionsUpdated",
			query: this.#t,
			observer: this
		});
		let r = this.hasListeners();
		r && Ue(this.#t, n, this.options, t) && this.#m(), this.updateResult(), r && (this.#t !== n || w(this.options.enabled, this.#t) !== w(t.enabled, this.#t) || w(this.options.staleTime, this.#t) !== w(t.staleTime, this.#t)) && this.#g();
		let i = this.#_();
		r && (this.#t !== n || w(this.options.enabled, this.#t) !== w(t.enabled, this.#t) || i !== this.#f) && this.#v(i);
	}
	getOptimisticResult(e) {
		let t = this.#e.getQueryCache().build(this.#e, e), n = this.createResult(t, e);
		return ue(this.getCurrentResult(), n) || (this.#r = n, this.#a = this.options, this.#i = this.#t.state), n;
	}
	getCurrentResult() {
		return this.#r;
	}
	trackResult(e, t) {
		return new Proxy(e, { get: (e, n) => (this.trackProp(n), t?.(n), Reflect.get(e, n)) });
	}
	trackProp(e) {
		this.#p.add(e);
	}
	getCurrentQuery() {
		return this.#t;
	}
	refetch({ ...e } = {}) {
		return this.fetch({ ...e });
	}
	fetchOptimistic(e) {
		let t = this.#e.defaultQueryOptions(e), n = this.#e.getQueryCache().build(this.#e, t), r = () => {}, i, a = new Promise((e) => {
			i = e, r = this.#e.getQueryCache().subscribe((i) => {
				i.type === "updated" && i.query.queryHash === n.queryHash && n.state.data !== void 0 && (r(), e(this.createResult(n, t)));
			});
		});
		return Promise.race([n.fetch().then(() => {
			let e = this.createResult(n, t);
			return i?.(e), e;
		}).finally(() => {
			r();
		}), a]);
	}
	fetch(e) {
		return this.#m({
			...e,
			cancelRefetch: e.cancelRefetch ?? !0
		}).then(() => (this.updateResult(), this.#r));
	}
	#m(e) {
		this.#S();
		let t = this.#t.fetch(this.options, e);
		return e?.throwOnError || (t = t.catch(C)), t;
	}
	#h(e) {
		return !be() && w(this.options.enabled, this.#t) !== !1 && oe(e);
	}
	#g() {
		this.#b();
		let e = w(this.options.staleTime, this.#t);
		if (this.#r.isStale || !this.#h(e)) return;
		let t = se(this.#r.dataUpdatedAt, e) + 1;
		this.#u = ne.setTimeout(() => {
			this.#r.isStale || this.updateResult();
		}, t);
	}
	#_() {
		return w(this.options.refetchInterval, this.#t) ?? !1;
	}
	#v(e) {
		this.#x(), this.#f = e, !(this.#f === 0 || !this.#h(this.#f)) && (this.#d = ne.setInterval(() => {
			(this.options.refetchIntervalInBackground || Se.isFocused()) && this.#m();
		}, this.#f));
	}
	#y() {
		this.#g(), this.#v(this.#_());
	}
	#b() {
		this.#u !== void 0 && (ne.clearTimeout(this.#u), this.#u = void 0);
	}
	#x() {
		this.#d !== void 0 && (ne.clearInterval(this.#d), this.#d = void 0);
	}
	createResult(e, t) {
		let n = this.#t, r = this.options, i = this.#r, a = this.#i, o = this.#a, s = e === n ? this.#n : e.state, { state: c } = e, l = { ...c }, u = !1, d;
		if (t._optimisticResults) {
			let i = this.hasListeners(), a = !i && Ve(e, t), o = i && Ue(e, n, t, r);
			(a || o) && (l = {
				...l,
				...Ie(c.data, e.options)
			}), t._optimisticResults === "isRestoring" && (l.fetchStatus = "idle");
		}
		let { error: f, errorUpdatedAt: p, status: m } = l;
		d = l.data;
		let h = !1;
		if (t.placeholderData !== void 0 && d === void 0 && m === "pending") {
			let e;
			i?.isPlaceholderData && t.placeholderData === o?.placeholderData ? (e = i.data, h = !0) : e = typeof t.placeholderData == "function" ? t.placeholderData(this.#l?.state.data, this.#l) : t.placeholderData, e !== void 0 && (m = "success", d = pe(i?.data, e, t), u = !0);
		}
		if (t.select && d !== void 0 && !h) if (i && d === a?.data && t.select === this.#s) d = this.#c;
		else try {
			this.#s = t.select, d = t.select(d), d = pe(i?.data, d, t), this.#c = d, this.#o = null;
		} catch (e) {
			this.#o = e;
		}
		else d === void 0 && (this.#o = null);
		this.#o && (f = this.#o, d = this.#c, p = Date.now(), m = "error", u = !1);
		let g = l.fetchStatus === "fetching", _ = m === "pending", v = m === "error", y = _ && g, b = d !== void 0;
		return {
			status: m,
			fetchStatus: l.fetchStatus,
			isPending: _,
			isSuccess: m === "success",
			isError: v,
			isInitialLoading: y,
			isLoading: y,
			data: d,
			dataUpdatedAt: l.dataUpdatedAt,
			error: f,
			errorUpdatedAt: p,
			failureCount: l.fetchFailureCount,
			failureReason: l.fetchFailureReason,
			errorUpdateCount: l.errorUpdateCount,
			isFetched: e.isFetched(),
			isFetchedAfterMount: l.dataUpdateCount > s.dataUpdateCount || l.errorUpdateCount > s.errorUpdateCount,
			isFetching: g,
			isRefetching: g && !_,
			isLoadingError: v && !b,
			isPaused: l.fetchStatus === "paused",
			isPlaceholderData: u,
			isRefetchError: v && b,
			isStale: We(e, t),
			refetch: this.refetch,
			isEnabled: w(t.enabled, e) !== !1
		};
	}
	updateResult() {
		let e = this.#r, t = this.createResult(this.#t, this.options);
		if (this.#i = this.#t.state, this.#a = this.options, this.#i.data !== void 0 && (this.#l = this.#t), ue(t, e)) return;
		this.#r = t;
		let n = (() => {
			if (!e) return !0;
			let { notifyOnChangeProps: t } = this.options, n = typeof t == "function" ? t() : t;
			if (n === "all" || !n && !this.#p.size) return !0;
			let r = new Set(n ?? this.#p);
			return this.options.throwOnError && r.add("error"), Object.keys(this.#r).some((t) => {
				let n = t;
				return this.#r[n] !== e[n] && r.has(n);
			});
		})();
		Te.batch(() => {
			n && this.listeners.forEach((e) => {
				e(this.#r);
			}), this.#e.getQueryCache().notify({
				query: this.#t,
				type: "observerResultsUpdated"
			});
		});
	}
	#S() {
		let e = this.#e.getQueryCache().build(this.#e, this.options);
		if (e === this.#t) return;
		let t = this.#t;
		this.#t = e, this.#n = e.state, this.hasListeners() && (t?.removeObserver(this), e.addObserver(this));
	}
	onQueryUpdate() {
		this.updateResult(), this.hasListeners() && this.#y();
	}
};
function Be(e, t) {
	return w(t.enabled, e) !== !1 && e.state.data === void 0 && !(e.state.status === "error" && w(t.retryOnMount, e) === !1);
}
function Ve(e, t) {
	return Be(e, t) || e.state.data !== void 0 && He(e, t, t.refetchOnMount);
}
function He(e, t, n) {
	if (w(t.enabled, e) !== !1 && w(t.staleTime, e) !== "static") {
		let r = w(n, e);
		return r === "always" || r !== !1 && We(e, t);
	}
	return !1;
}
function Ue(e, t, n, r) {
	return (e !== t || w(r.enabled, e) === !1) && (!n.suspense || e.state.status !== "error") && We(e, n);
}
function We(e, t) {
	return w(t.enabled, e) !== !1 && e.isStaleByTime(w(t.staleTime, e));
}
//#endregion
//#region ../../../../sites/munshi-ji/node_modules/.pnpm/@tanstack+query-core@5.104.2/node_modules/@tanstack/query-core/build/modern/mutation.js
var Ge = class extends je {
	#e;
	#t;
	#n;
	#r;
	constructor(e) {
		super(), this.#e = e.client, this.mutationId = e.mutationId, this.#n = e.mutationCache, this.#t = [], this.state = e.state || Ke(), this.setOptions(e.options), this.scheduleGc();
	}
	setOptions(e) {
		this.options = e, this.updateGcTime(this.options.gcTime);
	}
	get meta() {
		return this.options.meta;
	}
	addObserver(e) {
		this.#t.includes(e) || (this.#t.push(e), this.clearGcTimeout(), this.#n.notify({
			type: "observerAdded",
			mutation: this,
			observer: e
		}));
	}
	removeObserver(e) {
		this.#t = this.#t.filter((t) => t !== e), this.scheduleGc(), this.#n.notify({
			type: "observerRemoved",
			mutation: this,
			observer: e
		});
	}
	optionalRemove() {
		this.#t.length || (this.state.status === "pending" ? this.scheduleGc() : this.#n.remove(this));
	}
	continue() {
		return this.#r?.continue() ?? (this.state.status === "pending" ? this.execute(this.state.variables) : Promise.resolve());
	}
	async execute(e) {
		let t = () => {
			this.#i({ type: "continue" });
		}, n = {
			client: this.#e,
			meta: this.options.meta,
			mutationKey: this.options.mutationKey
		}, r = this.#r = Ae({
			fn: () => this.options.mutationFn ? this.options.mutationFn(e, n) : Promise.reject(/* @__PURE__ */ Error("No mutationFn found")),
			onFail: (e, t) => {
				this.#i({
					type: "failed",
					failureCount: e,
					error: t
				});
			},
			onPause: () => {
				this.#i({ type: "pause" });
			},
			onContinue: t,
			retry: this.options.retry ?? 0,
			retryDelay: this.options.retryDelay,
			networkMode: this.options.networkMode,
			canRun: () => this.#n.canRun(this)
		}), i = this.state.status === "pending", a = !r.canStart();
		try {
			if (i) t();
			else {
				this.#i({
					type: "pending",
					variables: e,
					isPaused: a
				}), this.#n.config.onMutate && await this.#n.config.onMutate(e, this, n);
				let t = await this.options.onMutate?.(e, n);
				t !== this.state.context && this.#i({
					type: "pending",
					context: t,
					variables: e,
					isPaused: a
				});
			}
			let o = await r.start();
			return await this.#n.config.onSuccess?.(o, e, this.state.context, this, n), await this.options.onSuccess?.(o, e, this.state.context, n), await this.#n.config.onSettled?.(o, null, this.state.variables, this.state.context, this, n), await this.options.onSettled?.(o, null, e, this.state.context, n), this.#i({
				type: "success",
				data: o
			}), o;
		} catch (t) {
			try {
				await this.#n.config.onError?.(t, e, this.state.context, this, n);
			} catch (e) {
				Promise.reject(e);
			}
			try {
				await this.options.onError?.(t, e, this.state.context, n);
			} catch (e) {
				Promise.reject(e);
			}
			try {
				await this.#n.config.onSettled?.(void 0, t, this.state.variables, this.state.context, this, n);
			} catch (e) {
				Promise.reject(e);
			}
			try {
				await this.options.onSettled?.(void 0, t, e, this.state.context, n);
			} catch (e) {
				Promise.reject(e);
			}
			throw this.#i({
				type: "error",
				error: t
			}), t;
		} finally {
			this.#r === r && (this.#r = void 0), this.#n.runNext(this);
		}
	}
	#i(e) {
		let t = (t) => {
			switch (e.type) {
				case "failed": return {
					...t,
					failureCount: e.failureCount,
					failureReason: e.error
				};
				case "pause": return {
					...t,
					isPaused: !0
				};
				case "continue": return {
					...t,
					isPaused: !1
				};
				case "pending": return {
					...t,
					context: e.context,
					data: void 0,
					failureCount: 0,
					failureReason: null,
					error: null,
					isPaused: e.isPaused,
					status: "pending",
					variables: e.variables,
					submittedAt: Date.now()
				};
				case "success": return {
					...t,
					data: e.data,
					failureCount: 0,
					failureReason: null,
					error: null,
					status: "success",
					isPaused: !1
				};
				case "error": return {
					...t,
					data: void 0,
					error: e.error,
					failureCount: t.failureCount + 1,
					failureReason: e.error,
					isPaused: !1,
					status: "error"
				};
			}
		};
		this.state = t(this.state), Te.batch(() => {
			this.#t.forEach((t) => {
				t.onMutationUpdate(e);
			}), this.#n.notify({
				mutation: this,
				type: "updated",
				action: e
			});
		});
	}
};
function Ke() {
	return {
		context: void 0,
		data: void 0,
		error: null,
		failureCount: 0,
		failureReason: null,
		isPaused: !1,
		status: "idle",
		variables: void 0,
		submittedAt: 0
	};
}
//#endregion
//#region ../../../../sites/munshi-ji/node_modules/.pnpm/@tanstack+query-core@5.104.2/node_modules/@tanstack/query-core/build/modern/mutationCache.js
var qe = class extends xe {
	#e;
	#t;
	#n;
	constructor(e = {}) {
		super(), this.config = e, this.#e = /* @__PURE__ */ new Set(), this.#t = /* @__PURE__ */ new Map(), this.#n = 0;
	}
	build(e, t, n) {
		let r = new Ge({
			client: e,
			mutationCache: this,
			mutationId: ++this.#n,
			options: e.defaultMutationOptions(t),
			state: n
		});
		return this.add(r), r;
	}
	add(e) {
		this.#e.add(e);
		let t = Je(e);
		if (typeof t == "string") {
			let n = this.#t.get(t);
			n ? n.push(e) : this.#t.set(t, [e]);
		}
		this.notify({
			type: "added",
			mutation: e
		});
	}
	remove(e) {
		if (this.#e.delete(e)) {
			let t = Je(e);
			if (typeof t == "string") {
				let n = this.#t.get(t);
				if (n) if (n.length > 1) {
					let t = n.indexOf(e);
					t !== -1 && n.splice(t, 1);
				} else n[0] === e && this.#t.delete(t);
			}
		}
		this.notify({
			type: "removed",
			mutation: e
		});
	}
	canRun(e) {
		let t = Je(e);
		if (typeof t == "string") {
			let n = this.#t.get(t)?.find((e) => e.state.status === "pending");
			return !n || n === e;
		} else return !0;
	}
	runNext(e) {
		let t = Je(e);
		return typeof t == "string" ? (this.#t.get(t)?.find((t) => t !== e && t.state.isPaused))?.continue() ?? Promise.resolve() : Promise.resolve();
	}
	clear() {
		Te.batch(() => {
			this.#e.forEach((e) => {
				this.notify({
					type: "removed",
					mutation: e
				});
			}), this.#e.clear(), this.#t.clear();
		});
	}
	getAll() {
		return Array.from(this.#e);
	}
	find(e) {
		let t = {
			exact: !0,
			...e
		};
		return this.getAll().find((e) => T(t, e));
	}
	findAll(e = {}) {
		return this.getAll().filter((t) => T(e, t));
	}
	notify(e) {
		Te.batch(() => {
			this.listeners.forEach((t) => {
				t(e);
			});
		});
	}
	resumePausedMutations() {
		let e = this.getAll().filter((e) => e.state.isPaused);
		return Te.batch(() => Promise.all(e.map((e) => e.continue().catch(C))));
	}
};
function Je(e) {
	return e.options.scope?.id;
}
//#endregion
//#region ../../../../sites/munshi-ji/node_modules/.pnpm/@tanstack+query-core@5.104.2/node_modules/@tanstack/query-core/build/modern/queryCache.js
var Ye = class extends xe {
	#e;
	constructor(e = {}) {
		super(), this.config = e, this.#e = /* @__PURE__ */ new Map();
	}
	build(e, t, n) {
		let r = t.queryKey, i = t.queryHash ?? E(r, t), a = this.get(i);
		return a || (a = new Fe({
			client: e,
			queryKey: r,
			queryHash: i,
			options: e.defaultQueryOptions(t),
			state: n,
			defaultOptions: e.getQueryDefaults(r)
		}), this.add(a)), a;
	}
	add(e) {
		this.#e.has(e.queryHash) || (this.#e.set(e.queryHash, e), this.notify({
			type: "added",
			query: e
		}));
	}
	remove(e) {
		this.#e.get(e.queryHash) === e && (e.destroy(), this.#e.delete(e.queryHash), this.notify({
			type: "removed",
			query: e
		}));
	}
	clear() {
		Te.batch(() => {
			this.getAll().forEach((e) => {
				this.remove(e);
			});
		});
	}
	get(e) {
		return this.#e.get(e);
	}
	getAll() {
		return [...this.#e.values()];
	}
	find(e) {
		let t = {
			exact: !0,
			...e
		};
		return this.getAll().find((e) => ce(t, e));
	}
	findAll(e = {}) {
		let t = this.getAll();
		return Object.keys(e).length > 0 ? t.filter((t) => ce(e, t)) : t;
	}
	notify(e) {
		Te.batch(() => {
			this.listeners.forEach((t) => {
				t(e);
			});
		});
	}
	onFocus() {
		Te.batch(() => {
			this.getAll().forEach((e) => {
				e.onFocus();
			});
		});
	}
	onOnline() {
		Te.batch(() => {
			this.getAll().forEach((e) => {
				e.onOnline();
			});
		});
	}
}, Xe = class {
	#e;
	#t;
	#n;
	#r;
	#i;
	#a;
	#o;
	#s;
	constructor(e = {}) {
		this.#e = e.queryCache || new Ye(), this.#t = e.mutationCache || new qe(), this.#n = e.defaultOptions || {}, this.#r = /* @__PURE__ */ new Map(), this.#i = /* @__PURE__ */ new Map(), this.#a = 0;
	}
	mount() {
		this.#a++, this.#a === 1 && (this.#o = Se.subscribe(async (e) => {
			e && (await this.resumePausedMutations(), this.#e.onFocus());
		}), this.#s = Ee.subscribe(async (e) => {
			e && (await this.resumePausedMutations(), this.#e.onOnline());
		}));
	}
	unmount() {
		this.#a--, this.#a === 0 && (this.#o?.(), this.#o = void 0, this.#s?.(), this.#s = void 0);
	}
	isFetching(e) {
		return this.#e.findAll({
			...e,
			fetchStatus: "fetching"
		}).length;
	}
	isMutating(e) {
		return this.#t.findAll({
			...e,
			status: "pending"
		}).length;
	}
	getQueryData(e) {
		let t = this.defaultQueryOptions({ queryKey: e });
		return this.#e.get(t.queryHash)?.state.data;
	}
	ensureQueryData(e) {
		let t = this.defaultQueryOptions(e), n = this.#e.build(this, t), r = n.state.data;
		return r === void 0 ? this.fetchQuery(e) : (e.revalidateIfStale && n.isStaleByTime(w(t.staleTime, n)) && this.prefetchQuery(t), Promise.resolve(r));
	}
	getQueriesData(e) {
		return this.#e.findAll(e).map(({ queryKey: e, state: t }) => [e, t.data]);
	}
	setQueryData(e, t, n) {
		let r = this.defaultQueryOptions({ queryKey: e }), i = this.#e.get(r.queryHash)?.state.data, a = ae(t, i);
		if (a !== void 0) return this.#e.build(this, r).setData(a, {
			...n,
			manual: !0
		});
	}
	setQueriesData(e, t, n) {
		return Te.batch(() => this.#e.findAll(e).map(({ queryKey: e }) => [e, this.setQueryData(e, t, n)]));
	}
	getQueryState(e) {
		let t = this.defaultQueryOptions({ queryKey: e });
		return this.#e.get(t.queryHash)?.state;
	}
	removeQueries(e) {
		let t = this.#e;
		Te.batch(() => {
			t.findAll(e).forEach((e) => {
				t.remove(e);
			});
		});
	}
	resetQueries(e, t) {
		let n = this.#e;
		return Te.batch(() => {
			let r = n.findAll(e), i = new Set(r);
			return r.forEach((e) => {
				e.reset();
			}), this.refetchQueries({
				type: "active",
				predicate: (e) => i.has(e)
			}, t);
		});
	}
	cancelQueries(e, t = {}) {
		let n = {
			revert: !0,
			...t
		}, r = Te.batch(() => this.#e.findAll(e).map((e) => e.cancel(n)));
		return Promise.all(r).then(C).catch(C);
	}
	invalidateQueries(e, t = {}) {
		return Te.batch(() => (this.#e.findAll(e).forEach((e) => {
			e.invalidate();
		}), e?.refetchType === "none" ? Promise.resolve() : this.refetchQueries({
			...e,
			type: e?.refetchType ?? e?.type ?? "active"
		}, t)));
	}
	refetchQueries(e, t = {}) {
		let n = {
			...t,
			cancelRefetch: t.cancelRefetch ?? !0
		}, r = Te.batch(() => this.#e.findAll(e).filter((e) => !e.isDisabled() && !e.isStatic()).map((e) => {
			let t = e.fetch(void 0, n);
			return n.throwOnError || (t = t.catch(C)), e.state.fetchStatus === "paused" ? Promise.resolve() : t;
		}));
		return Promise.all(r).then(C);
	}
	async query(e) {
		let t = this.defaultQueryOptions(e);
		t.retry === void 0 && (t.retry = !1);
		let n = this.#e.build(this, t), r = n.isStaleByTime(w(t.staleTime, n)) ? await n.fetch(t) : n.state.data, i = t.select;
		return i ? i(r) : r;
	}
	fetchQuery(e) {
		let t = this.defaultQueryOptions(e);
		t.retry === void 0 && (t.retry = !1);
		let n = this.#e.build(this, t);
		return n.isStaleByTime(w(t.staleTime, n)) ? n.fetch(t) : Promise.resolve(n.state.data);
	}
	prefetchQuery(e) {
		return this.fetchQuery(e).then(C).catch(C);
	}
	infiniteQuery(e) {
		return e._type = "infinite", this.query(e);
	}
	fetchInfiniteQuery(e) {
		return e._type = "infinite", this.fetchQuery(e);
	}
	prefetchInfiniteQuery(e) {
		return this.fetchInfiniteQuery(e).then(C).catch(C);
	}
	ensureInfiniteQueryData(e) {
		return e._type = "infinite", this.ensureQueryData(e);
	}
	resumePausedMutations() {
		return Ee.isOnline() ? this.#t.resumePausedMutations() : Promise.resolve();
	}
	getQueryCache() {
		return this.#e;
	}
	getMutationCache() {
		return this.#t;
	}
	getDefaultOptions() {
		return this.#n;
	}
	setDefaultOptions(e) {
		this.#n = e;
	}
	setQueryDefaults(e, t) {
		this.#r.set(D(e), {
			queryKey: e,
			defaultOptions: t
		});
	}
	getQueryDefaults(e) {
		let t = [...this.#r.values()], n = {};
		return t.forEach((t) => {
			O(e, t.queryKey) && Object.assign(n, t.defaultOptions);
		}), n;
	}
	setMutationDefaults(e, t) {
		this.#i.set(D(e), {
			mutationKey: e,
			defaultOptions: t
		});
	}
	getMutationDefaults(e) {
		let t = [...this.#i.values()], n = {};
		return t.forEach((t) => {
			O(e, t.mutationKey) && Object.assign(n, t.defaultOptions);
		}), n;
	}
	defaultQueryOptions(e) {
		if (e._defaulted) return e;
		let t = {
			...this.#n.queries,
			...this.getQueryDefaults(e.queryKey),
			...e,
			_defaulted: !0
		};
		return t.queryHash ||= E(t.queryKey, t), t.refetchOnReconnect === void 0 && (t.refetchOnReconnect = t.networkMode !== "always"), t.throwOnError === void 0 && (t.throwOnError = !!t.suspense), !t.networkMode && t.persister && (t.networkMode = "offlineFirst"), t.queryFn === M && (t.enabled = !1), t;
	}
	defaultMutationOptions(e) {
		return e?._defaulted ? e : {
			...this.#n.mutations,
			...e?.mutationKey && this.getMutationDefaults(e.mutationKey),
			...e,
			_defaulted: !0
		};
	}
	clear() {
		this.#e.clear(), this.#t.clear();
	}
}, Ze = y.createContext(!1), Qe = () => y.useContext(Ze);
Ze.Provider;
//#endregion
//#region ../../../../sites/munshi-ji/node_modules/.pnpm/@tanstack+react-query@5.104.2_react@19.2.6/node_modules/@tanstack/react-query/build/modern/QueryErrorResetBoundary.js
function $e() {
	let e = !1;
	return {
		clearReset: () => {
			e = !1;
		},
		reset: () => {
			e = !0;
		},
		isReset: () => e
	};
}
var et = y.createContext($e()), tt = () => y.useContext(et), nt = (e, t, n) => {
	let r = n?.state.error && typeof e.throwOnError == "function" ? _e(e.throwOnError, [n.state.error, n]) : e.throwOnError;
	(e.suspense || r) && (t.isReset() || (e.retryOnMount = !1));
}, rt = (e) => {
	y.useEffect(() => {
		e.clearReset();
	}, [e]);
}, it = ({ result: e, errorResetBoundary: t, throwOnError: n, query: r, suspense: i }) => e.isError && !t.isReset() && !e.isFetching && r && (i && e.data === void 0 || _e(n, [e.error, r])), at = (e) => {
	if (e.suspense) {
		let t = 1e3, n = (e) => e === "static" ? e : Math.max(e ?? t, t), r = e.staleTime;
		e.staleTime = typeof r == "function" ? (...e) => n(r(...e)) : n(r), typeof e.gcTime == "number" && (e.gcTime = Math.max(e.gcTime, t));
	}
}, ot = (e, t) => e?.suspense && t.isPending, st = (e, t, n) => t.fetchOptimistic(e).catch(() => {
	n.clearReset();
});
//#endregion
//#region ../../../../sites/munshi-ji/node_modules/.pnpm/@tanstack+react-query@5.104.2_react@19.2.6/node_modules/@tanstack/react-query/build/modern/useBaseQuery.js
function ct(e, t, n) {
	let r = Qe(), i = tt(), a = ee(n), o = a.defaultQueryOptions(e), s = a.getQueryCache().get(o.queryHash), c = e.subscribed !== !1;
	o._optimisticResults = r ? "isRestoring" : c ? "optimistic" : void 0, at(o), nt(o, i, s), rt(i);
	let [l] = y.useState(() => new t(a, o)), u = l.getOptimisticResult(o), d = !r && c;
	if (y.useSyncExternalStore(y.useCallback((e) => {
		let t = d ? l.subscribe(Te.batchCalls(e)) : C;
		return l.updateResult(), t;
	}, [l, d]), () => l.getCurrentResult(), () => l.getCurrentResult()), y.useEffect(() => {
		l.setOptions(o);
	}, [o, l]), ot(o, u)) throw st(o, l, i);
	if (it({
		result: u,
		errorResetBoundary: i,
		throwOnError: o.throwOnError,
		query: s,
		suspense: o.suspense
	})) throw u.error;
	return o.notifyOnChangeProps ? u : l.trackResult(u);
}
//#endregion
//#region ../../../../sites/munshi-ji/node_modules/.pnpm/@tanstack+react-query@5.104.2_react@19.2.6/node_modules/@tanstack/react-query/build/modern/useQuery.js
function lt(e, t) {
	return ct(e, ze, t);
}
//#endregion
//#region lib/client.ts
var ut = g(), N = typeof document < "u" && document.documentElement.dataset.runtime === "php", dt = new Xe({ defaultOptions: { queries: {
	staleTime: 750,
	gcTime: 3e5,
	retry: !1,
	refetchOnWindowFocus: !1
} } }), ft = "", pt = {
	analytics: "dashboard",
	history: "download_history",
	archive: "download"
}, mt = (e, t = {}) => (N ? "api.php?" : "/api/workspace?") + new URLSearchParams({
	action: N && pt[e] || e,
	...t
});
async function ht(e, t = null, n = {}, r) {
	let i = await fetch(mt(e, n), {
		method: t === null ? "GET" : "POST",
		headers: t === null ? {} : {
			"Content-Type": "application/json",
			...N ? { "X-CSRF-Token": ft } : { "X-Munshi-Request": "1" }
		},
		body: t === null ? void 0 : JSON.stringify(t),
		credentials: "same-origin",
		signal: r
	}), a;
	try {
		a = await i.json();
	} catch {
		throw Error("The server did not return JSON. Check your PHP configuration or hosting error log.");
	}
	if (!i.ok) throw Error((a.error || "Request failed.") + (a.reference ? " Reference: " + a.reference + "." : "") + (a.help ? " " + a.help : ""));
	return a;
}
async function gt(e, t, n, r) {
	if (!N) return ht(e, t, n, r);
	e === "review" && t && (t = {
		...t,
		status: t.reviewed ? "reviewed" : "open"
	}), (e === "connection_save" || e === "connection_test") && t && (t = {
		mode: "api",
		...t
	});
	let i = await ht(e, t, n, r);
	if (e === "bootstrap") return ft = i.csrf, {
		...i,
		user: i.user ? {
			...i.user,
			userId: String(i.user.id),
			displayName: i.user.name || i.user.email,
			admin: i.user.role === "admin"
		} : null
	};
	if (e === "analytics") {
		let e = await ht("gst_summary", null, n, r);
		return {
			...i,
			summary: await ht("download_summary", null, n, r),
			gst: (e.recipients || []).map((e) => ({
				...e,
				gst_status: e.category.startsWith("GSTIN") ? "valid" : e.category.startsWith("No recipient") ? "missing" : "invalid"
			})),
			states: (e.states || []).map((e) => ({
				...e,
				state: e.state_code
			})),
			rates: e.rates,
			duplicates: e.duplicates,
			cash: i.gateways || []
		};
	}
	if (e === "invoices") return {
		...i,
		summary: await ht("download_summary", null, n, r)
	};
	if (e === "invoice") {
		let e = i.download_state || {};
		return {
			...i,
			last_downloaded: e.last_at,
			downloaded_by: e.last_user,
			download_count: e.count || 0,
			downloaded_hash: e.source_hash,
			review_note: i.review_record?.note,
			review_hash: i.review_record?.source_hash,
			review_by: i.review_record?.reviewer,
			review_at: i.review_record?.updated_at
		};
	}
	return e === "jobs" ? {
		...i,
		rows: i.rows.map((e) => ({
			...e,
			failures: e.failures?.map((e) => ({
				...e,
				invoice_id: e.record_id
			}))
		}))
	} : i;
}
async function P(e, t = null, n = {}) {
	if (t !== null) {
		let r = await gt(e, t, n);
		return await dt.invalidateQueries({
			queryKey: ["api"],
			refetchType: "none"
		}), r;
	}
	return dt.fetchQuery({
		queryKey: [
			"api",
			e,
			n
		],
		queryFn: ({ signal: t }) => gt(e, null, n, t)
	});
}
//#endregion
//#region ../../../../sites/munshi-ji/node_modules/.pnpm/lucide-react@1.31.0_react@19.2.6/node_modules/lucide-react/dist/esm/shared/src/utils/mergeClasses.mjs
var _t = (...e) => e.filter((e, t, n) => !!e && e.trim() !== "" && n.indexOf(e) === t).join(" ").trim(), vt = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), yt = (e) => e.replace(/^([A-Z])|[\s-_]+(\w)/g, (e, t, n) => n ? n.toUpperCase() : t.toLowerCase()), bt = (e) => {
	let t = yt(e);
	return t.charAt(0).toUpperCase() + t.slice(1);
}, xt = {
	xmlns: "http://www.w3.org/2000/svg",
	width: 24,
	height: 24,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: 2,
	strokeLinecap: "round",
	strokeLinejoin: "round"
}, St = (e) => {
	for (let t in e) if (t.startsWith("aria-") || t === "role" || t === "title") return !0;
	return !1;
}, Ct = (0, y.createContext)({}), wt = () => (0, y.useContext)(Ct), Tt = (0, y.forwardRef)(({ color: e, size: t, strokeWidth: n, absoluteStrokeWidth: r, className: i = "", children: a, iconNode: o, ...s }, c) => {
	let { size: l = 24, strokeWidth: u = 2, absoluteStrokeWidth: d = !1, color: f = "currentColor", className: p = "" } = wt() ?? {}, m = r ?? d ? Number(n ?? u) * 24 / Number(t ?? l) : n ?? u;
	return (0, y.createElement)("svg", {
		ref: c,
		...xt,
		width: t ?? l ?? xt.width,
		height: t ?? l ?? xt.height,
		stroke: e ?? f,
		strokeWidth: m,
		className: _t("lucide", p, i),
		...!a && !St(s) && { "aria-hidden": "true" },
		...s
	}, [...o.map(([e, t]) => (0, y.createElement)(e, t)), ...Array.isArray(a) ? a : [a]]);
}), F = (e, t) => {
	let n = (0, y.forwardRef)(({ className: n, ...r }, i) => (0, y.createElement)(Tt, {
		ref: i,
		iconNode: t,
		className: _t(`lucide-${vt(bt(e))}`, `lucide-${e}`, n),
		...r
	}));
	return n.displayName = bt(e), n;
}, Et = F("arrow-down-to-line", [
	["path", {
		d: "M12 17V3",
		key: "1cwfxf"
	}],
	["path", {
		d: "m6 11 6 6 6-6",
		key: "12ii2o"
	}],
	["path", {
		d: "M19 21H5",
		key: "150jfl"
	}]
]), Dt = F("arrow-right", [["path", {
	d: "M5 12h14",
	key: "1ays0h"
}], ["path", {
	d: "m12 5 7 7-7 7",
	key: "xquz4c"
}]]), Ot = F("arrow-up-right", [["path", {
	d: "M7 7h10v10",
	key: "1tivn9"
}], ["path", {
	d: "M7 17 17 7",
	key: "1vkiza"
}]]), kt = F("check", [["path", {
	d: "M20 6 9 17l-5-5",
	key: "1gmf2c"
}]]), At = F("chevron-down", [["path", {
	d: "m6 9 6 6 6-6",
	key: "qrunsl"
}]]), jt = F("chevron-left", [["path", {
	d: "m15 18-6-6 6-6",
	key: "1wnfg3"
}]]), Mt = F("chevron-right", [["path", {
	d: "m9 18 6-6-6-6",
	key: "mthhwq"
}]]), Nt = F("circle-alert", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}],
	["line", {
		x1: "12",
		x2: "12",
		y1: "8",
		y2: "12",
		key: "1pkeuh"
	}],
	["line", {
		x1: "12",
		x2: "12.01",
		y1: "16",
		y2: "16",
		key: "4dfq90"
	}]
]), Pt = F("circle-check", [["circle", {
	cx: "12",
	cy: "12",
	r: "10",
	key: "1mglay"
}], ["path", {
	d: "m9 12 2 2 4-4",
	key: "dzmm74"
}]]), Ft = F("clock", [["circle", {
	cx: "12",
	cy: "12",
	r: "10",
	key: "1mglay"
}], ["path", {
	d: "M12 6v6l4 2",
	key: "mmk7yg"
}]]), It = F("download", [
	["path", {
		d: "M12 15V3",
		key: "m9g1x1"
	}],
	["path", {
		d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",
		key: "ih7n3h"
	}],
	["path", {
		d: "m7 10 5 5 5-5",
		key: "brsn70"
	}]
]), Lt = F("file-text", [
	["path", {
		d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
		key: "1oefj6"
	}],
	["path", {
		d: "M14 2v5a1 1 0 0 0 1 1h5",
		key: "wfsgrz"
	}],
	["path", {
		d: "M10 9H8",
		key: "b1mrlr"
	}],
	["path", {
		d: "M16 13H8",
		key: "t4e002"
	}],
	["path", {
		d: "M16 17H8",
		key: "z1uh3a"
	}]
]), Rt = F("folder-down", [
	["path", {
		d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
		key: "1kt360"
	}],
	["path", {
		d: "M12 10v6",
		key: "1bos4e"
	}],
	["path", {
		d: "m15 13-3 3-3-3",
		key: "6j2sf0"
	}]
]), zt = F("inbox", [["polyline", {
	points: "22 12 16 12 14 15 10 15 8 12 2 12",
	key: "o97t9d"
}], ["path", {
	d: "M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",
	key: "oot6mr"
}]]), Bt = F("layers", [
	["path", {
		d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",
		key: "zw3jo"
	}],
	["path", {
		d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",
		key: "1wduqc"
	}],
	["path", {
		d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",
		key: "kqbvx6"
	}]
]), Vt = F("layout-dashboard", [
	["rect", {
		width: "7",
		height: "9",
		x: "3",
		y: "3",
		rx: "1",
		key: "10lvy0"
	}],
	["rect", {
		width: "7",
		height: "5",
		x: "14",
		y: "3",
		rx: "1",
		key: "16une8"
	}],
	["rect", {
		width: "7",
		height: "9",
		x: "14",
		y: "12",
		rx: "1",
		key: "1hutg5"
	}],
	["rect", {
		width: "7",
		height: "5",
		x: "3",
		y: "16",
		rx: "1",
		key: "ldoo1y"
	}]
]), Ht = F("loader-circle", [["path", {
	d: "M21 12a9 9 0 1 1-6.219-8.56",
	key: "13zald"
}]]), Ut = F("log-out", [
	["path", {
		d: "m16 17 5-5-5-5",
		key: "1bji2h"
	}],
	["path", {
		d: "M21 12H9",
		key: "dn1m92"
	}],
	["path", {
		d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",
		key: "1uf3rs"
	}]
]), Wt = F("menu", [
	["path", {
		d: "M4 5h16",
		key: "1tepv9"
	}],
	["path", {
		d: "M4 12h16",
		key: "1lakjw"
	}],
	["path", {
		d: "M4 19h16",
		key: "1djgab"
	}]
]), Gt = F("plus", [["path", {
	d: "M5 12h14",
	key: "1ays0h"
}], ["path", {
	d: "M12 5v14",
	key: "s699le"
}]]), Kt = F("refresh-cw", [
	["path", {
		d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",
		key: "v9h5vc"
	}],
	["path", {
		d: "M21 3v5h-5",
		key: "1q7to0"
	}],
	["path", {
		d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",
		key: "3uifl3"
	}],
	["path", {
		d: "M8 16H3v5",
		key: "1cv678"
	}]
]), qt = F("rotate-ccw-clock", [
	["path", {
		d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",
		key: "1357e3"
	}],
	["path", {
		d: "M3 3v5h5",
		key: "1xhq8a"
	}],
	["path", {
		d: "M12 7v5l4 2",
		key: "1fdv2h"
	}]
]), Jt = F("search", [["path", {
	d: "m21 21-4.34-4.34",
	key: "14j7rj"
}], ["circle", {
	cx: "11",
	cy: "11",
	r: "8",
	key: "4ej97u"
}]]), Yt = F("settings", [["path", {
	d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",
	key: "1i5ecw"
}], ["circle", {
	cx: "12",
	cy: "12",
	r: "3",
	key: "1v7zrd"
}]]), Xt = F("shield-check", [["path", {
	d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
	key: "oel41y"
}], ["path", {
	d: "m9 12 2 2 4-4",
	key: "dzmm74"
}]]), Zt = F("sliders-horizontal", [
	["path", {
		d: "M10 5H3",
		key: "1qgfaw"
	}],
	["path", {
		d: "M12 19H3",
		key: "yhmn1j"
	}],
	["path", {
		d: "M14 3v4",
		key: "1sua03"
	}],
	["path", {
		d: "M16 17v4",
		key: "1q0r14"
	}],
	["path", {
		d: "M21 12h-9",
		key: "1o4lsq"
	}],
	["path", {
		d: "M21 19h-5",
		key: "1rlt1p"
	}],
	["path", {
		d: "M21 5h-7",
		key: "1oszz2"
	}],
	["path", {
		d: "M8 10v4",
		key: "tgpxqk"
	}],
	["path", {
		d: "M8 12H3",
		key: "a7s4jb"
	}]
]), Qt = F("sun", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "4",
		key: "4exip2"
	}],
	["path", {
		d: "M12 2v2",
		key: "tus03m"
	}],
	["path", {
		d: "M12 20v2",
		key: "1lh1kg"
	}],
	["path", {
		d: "m4.93 4.93 1.41 1.41",
		key: "149t6j"
	}],
	["path", {
		d: "m17.66 17.66 1.41 1.41",
		key: "ptbguv"
	}],
	["path", {
		d: "M2 12h2",
		key: "1t8f8n"
	}],
	["path", {
		d: "M20 12h2",
		key: "1q8mjw"
	}],
	["path", {
		d: "m6.34 17.66-1.41 1.41",
		key: "1m8zz5"
	}],
	["path", {
		d: "m19.07 4.93-1.41 1.41",
		key: "1shlcs"
	}]
]), $t = F("users", [
	["path", {
		d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",
		key: "1yyitq"
	}],
	["path", {
		d: "M16 3.128a4 4 0 0 1 0 7.744",
		key: "16gr8j"
	}],
	["path", {
		d: "M22 21v-2a4 4 0 0 0-3-3.87",
		key: "kshegd"
	}],
	["circle", {
		cx: "9",
		cy: "7",
		r: "4",
		key: "nufk8"
	}]
]), en = F("x", [["path", {
	d: "M18 6 6 18",
	key: "1bl5f8"
}], ["path", {
	d: "m6 6 12 12",
	key: "d8bk6v"
}]]);
//#endregion
//#region app/admin-tools.tsx
function tn({ tab: e, boot: t, onError: n, onSignedOut: r }) {
	let [i, a] = (0, y.useState)(""), [o, s] = (0, y.useState)(null), [c, l] = (0, y.useState)(!1), [u, d] = (0, y.useState)(""), f = e === "team" ? "users" : e, p = lt({
		queryKey: [
			"admin",
			f,
			i
		],
		queryFn: () => P(f, null, f === "diagnostics" ? { reference: i } : {}),
		enabled: e !== "account",
		retry: !1
	}), m = p.data || {};
	async function h(e) {
		e.preventDefault(), l(!0);
		try {
			let t = Object.fromEntries(new FormData(e.currentTarget));
			await P("user_save", {
				...t,
				id: o.id,
				enabled: t.enabled === "on"
			}), s(null), p.refetch(), d("Team access saved.");
		} catch (e) {
			n(e);
		} finally {
			l(!1);
		}
	}
	return /* @__PURE__ */ (0, b.jsxs)("section", {
		className: "panel padded",
		children: [
			/* @__PURE__ */ (0, b.jsxs)("div", {
				className: "sectionHeading",
				children: [/* @__PURE__ */ (0, b.jsx)("h2", { children: {
					diagnostics: "Diagnostics & private error log",
					team: "Team access",
					audit: "Recent activity",
					account: "My account"
				}[e] }), e !== "account" && /* @__PURE__ */ (0, b.jsxs)("button", {
					className: "button",
					onClick: () => p.refetch(),
					children: [/* @__PURE__ */ (0, b.jsx)(Kt, { size: 14 }), "Refresh"]
				})]
			}),
			p.error && /* @__PURE__ */ (0, b.jsx)("div", {
				className: "errorBox",
				children: p.error.message
			}),
			u && /* @__PURE__ */ (0, b.jsx)("p", {
				className: "successText",
				children: u
			}),
			e === "diagnostics" && /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [
				/* @__PURE__ */ (0, b.jsx)("p", {
					className: "panelNote",
					children: m.note || "Check PHP extensions and look up an error reference."
				}),
				/* @__PURE__ */ (0, b.jsxs)("form", {
					className: "diagnosticSearch",
					onSubmit: (e) => {
						e.preventDefault(), a(String(new FormData(e.currentTarget).get("reference") || "").trim());
					},
					children: [
						/* @__PURE__ */ (0, b.jsxs)("label", { children: ["Error reference", /* @__PURE__ */ (0, b.jsx)("input", {
							name: "reference",
							placeholder: "e.g. 3f6a99f89a44"
						})] }),
						/* @__PURE__ */ (0, b.jsx)("button", {
							className: "button primary",
							children: "Find error"
						}),
						/* @__PURE__ */ (0, b.jsx)("button", {
							className: "button",
							type: "button",
							onClick: () => a(""),
							children: "Latest errors"
						})
					]
				}),
				/* @__PURE__ */ (0, b.jsx)("div", {
					className: "diagnosticChecks",
					children: Object.entries(m.checks || {}).map(([e, t]) => /* @__PURE__ */ (0, b.jsxs)("div", { children: [/* @__PURE__ */ (0, b.jsx)("span", { children: e.replaceAll("_", " ") }), /* @__PURE__ */ (0, b.jsx)("strong", { children: typeof t == "boolean" ? /* @__PURE__ */ (0, b.jsx)("span", {
						className: "badge " + (t ? "success" : "danger"),
						children: t ? "OK" : "Missing / not writable"
					}) : t })] }, e))
				}),
				(m.rows || []).map((e) => /* @__PURE__ */ (0, b.jsxs)("details", {
					className: "logEntry",
					open: !0,
					children: [
						/* @__PURE__ */ (0, b.jsxs)("summary", { children: [
							e.time,
							" · ",
							e.reference
						] }),
						/* @__PURE__ */ (0, b.jsx)("p", { children: e.message }),
						/* @__PURE__ */ (0, b.jsx)("pre", { children: JSON.stringify(e, null, 2) })
					]
				}, e.reference)),
				p.data && !m.rows?.length && /* @__PURE__ */ (0, b.jsx)("p", {
					className: "panelNote",
					children: "No matching log entries. Older references may exist only in cPanel’s PHP log. Retry the failed action after updating."
				})
			] }),
			e === "team" && /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [
				/* @__PURE__ */ (0, b.jsx)("p", {
					className: "panelNote",
					children: "Viewer: read · Analyst: sync, review, download · Admin: settings and users"
				}),
				/* @__PURE__ */ (0, b.jsxs)("button", {
					className: "button primary",
					onClick: () => s({
						id: 0,
						name: "",
						email: "",
						role: "viewer",
						enabled: 1
					}),
					children: [/* @__PURE__ */ (0, b.jsx)(Gt, { size: 14 }), "Add member"]
				}),
				/* @__PURE__ */ (0, b.jsx)("div", {
					className: "tableScroll",
					children: /* @__PURE__ */ (0, b.jsxs)("table", { children: [/* @__PURE__ */ (0, b.jsx)("thead", { children: /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, b.jsx)("th", { children: "NAME / EMAIL" }),
						/* @__PURE__ */ (0, b.jsx)("th", { children: "ROLE" }),
						/* @__PURE__ */ (0, b.jsx)("th", { children: "STATUS" }),
						/* @__PURE__ */ (0, b.jsx)("th", { children: "ACTION" })
					] }) }), /* @__PURE__ */ (0, b.jsx)("tbody", { children: (m.rows || []).map((e) => /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, b.jsxs)("td", { children: [e.name, /* @__PURE__ */ (0, b.jsx)("small", { children: e.email })] }),
						/* @__PURE__ */ (0, b.jsx)("td", { children: e.role }),
						/* @__PURE__ */ (0, b.jsx)("td", { children: e.enabled ? "Active" : "Disabled" }),
						/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)("button", {
							className: "button",
							onClick: () => s(e),
							children: "Edit"
						}) })
					] }, e.id)) })] })
				}),
				o && /* @__PURE__ */ (0, b.jsxs)("form", {
					className: "formGrid teamEdit",
					onSubmit: h,
					children: [
						/* @__PURE__ */ (0, b.jsx)("h3", {
							className: "full",
							children: o.id ? "Edit member" : "New member"
						}),
						/* @__PURE__ */ (0, b.jsxs)("label", { children: ["Name", /* @__PURE__ */ (0, b.jsx)("input", {
							name: "name",
							defaultValue: o.name,
							required: !0
						})] }),
						/* @__PURE__ */ (0, b.jsxs)("label", { children: ["Email", /* @__PURE__ */ (0, b.jsx)("input", {
							name: "email",
							type: "email",
							defaultValue: o.email,
							required: !0
						})] }),
						/* @__PURE__ */ (0, b.jsxs)("label", { children: ["Role", /* @__PURE__ */ (0, b.jsxs)("select", {
							name: "role",
							defaultValue: o.role,
							children: [
								/* @__PURE__ */ (0, b.jsx)("option", { children: "viewer" }),
								/* @__PURE__ */ (0, b.jsx)("option", { children: "analyst" }),
								/* @__PURE__ */ (0, b.jsx)("option", { children: "admin" })
							]
						})] }),
						/* @__PURE__ */ (0, b.jsxs)("label", { children: [o.id ? "New password · optional" : "Password", /* @__PURE__ */ (0, b.jsx)("input", {
							name: "password",
							type: "password",
							minLength: 12,
							maxLength: 128,
							autoComplete: "new-password",
							required: !o.id
						})] }),
						/* @__PURE__ */ (0, b.jsxs)("label", {
							className: "checkboxLabel full",
							children: [/* @__PURE__ */ (0, b.jsx)("input", {
								name: "enabled",
								type: "checkbox",
								defaultChecked: !!o.enabled
							}), "Account enabled"]
						}),
						/* @__PURE__ */ (0, b.jsxs)("div", {
							className: "formButtons full",
							children: [/* @__PURE__ */ (0, b.jsx)("button", {
								type: "button",
								className: "button",
								onClick: () => s(null),
								children: "Cancel"
							}), /* @__PURE__ */ (0, b.jsx)("button", {
								className: "button primary",
								disabled: c,
								children: "Save member"
							})]
						})
					]
				}, o.id)
			] }),
			e === "audit" && /* @__PURE__ */ (0, b.jsx)("div", {
				className: "tableScroll",
				children: /* @__PURE__ */ (0, b.jsxs)("table", { children: [/* @__PURE__ */ (0, b.jsx)("thead", { children: /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, b.jsx)("th", { children: "WHEN" }),
					/* @__PURE__ */ (0, b.jsx)("th", { children: "PERSON" }),
					/* @__PURE__ */ (0, b.jsx)("th", { children: "ACTION" }),
					/* @__PURE__ */ (0, b.jsx)("th", { children: "DETAILS" })
				] }) }), /* @__PURE__ */ (0, b.jsx)("tbody", { children: (m.rows || []).map((e) => /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, b.jsx)("td", { children: e.created_at }),
					/* @__PURE__ */ (0, b.jsx)("td", { children: e.name || e.user_name || "System" }),
					/* @__PURE__ */ (0, b.jsx)("td", { children: e.event }),
					/* @__PURE__ */ (0, b.jsx)("td", {
						className: "description",
						children: e.detail
					})
				] }, e.id)) })] })
			}),
			e === "account" && /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [/* @__PURE__ */ (0, b.jsxs)("p", { children: [
				t?.user?.email,
				" · ",
				t?.user?.role
			] }), /* @__PURE__ */ (0, b.jsxs)("form", {
				className: "formGrid",
				onSubmit: async (e) => {
					e.preventDefault(), l(!0);
					try {
						await P("password", Object.fromEntries(new FormData(e.currentTarget))), r();
					} catch (e) {
						n(e);
					} finally {
						l(!1);
					}
				},
				children: [
					/* @__PURE__ */ (0, b.jsxs)("label", {
						className: "full",
						children: ["Current password", /* @__PURE__ */ (0, b.jsx)("input", {
							name: "current",
							type: "password",
							required: !0,
							autoComplete: "current-password"
						})]
					}),
					/* @__PURE__ */ (0, b.jsxs)("label", {
						className: "full",
						children: ["New password", /* @__PURE__ */ (0, b.jsx)("input", {
							name: "password",
							type: "password",
							required: !0,
							minLength: 12,
							maxLength: 128,
							autoComplete: "new-password"
						})]
					}),
					/* @__PURE__ */ (0, b.jsx)("button", {
						className: "button primary",
						disabled: c,
						children: "Update password"
					})
				]
			})] })
		]
	});
}
//#endregion
//#region ../../../../sites/munshi-ji/node_modules/.pnpm/@tanstack+react-table@9.3.1_react-dom@19.2.6_react@19.2.6__react@19.2.6/node_modules/@tanstack/react-table/dist/FlexRender.js
function nn(e) {
	return rn(e) || typeof e == "function" || an(e);
}
function rn(e) {
	return typeof e == "function" && (() => {
		let t = Object.getPrototypeOf(e);
		return t.prototype && t.prototype.isReactComponent;
	})();
}
function an(e) {
	return typeof e == "object" && typeof e.$$typeof == "symbol" && ["react.memo", "react.forward_ref"].includes(e.$$typeof.description);
}
function on(e, t) {
	return e == null ? null : nn(e) ? /* @__PURE__ */ y.createElement(e, t) : e;
}
function sn(e) {
	if ("cell" in e && e.cell) {
		let t = e.cell, n = t.column.columnDef, r = t, i = n;
		return r.getIsAggregated?.() ? on(i.aggregatedCell ?? n.cell, t.getContext()) : r.getIsPlaceholder?.() ? null : on(n.cell, t.getContext());
	}
	return "header" in e && e.header ? on(e.header.column.columnDef.header, e.header.getContext()) : "footer" in e && e.footer ? on(e.footer.column.columnDef.footer, e.footer.getContext()) : null;
}
//#endregion
//#region ../../../../sites/munshi-ji/node_modules/.pnpm/@tanstack+store@0.11.2/node_modules/@tanstack/store/dist/alien.js
/* @__NO_SIDE_EFFECTS__ */
function cn({ update: e, notify: t, unwatched: n }) {
	return {
		link: r,
		unlink: i,
		propagate: a,
		checkDirty: o,
		shallowPropagate: s
	};
	function r(e, t, n) {
		let r = t.depsTail;
		if (r !== void 0 && r.dep === e) return;
		let i = r === void 0 ? t.deps : r.nextDep;
		if (i !== void 0 && i.dep === e) {
			i.version = n, t.depsTail = i;
			return;
		}
		let a = e.subsTail;
		if (a !== void 0 && a.version === n && a.sub === t) return;
		let o = t.depsTail = e.subsTail = {
			version: n,
			dep: e,
			sub: t,
			prevDep: r,
			nextDep: i,
			prevSub: a,
			nextSub: void 0
		};
		i !== void 0 && (i.prevDep = o), r === void 0 ? t.deps = o : r.nextDep = o, a === void 0 ? e.subs = o : a.nextSub = o;
	}
	function i(e, t = e.sub) {
		let r = e.dep, i = e.prevDep, a = e.nextDep, o = e.nextSub, s = e.prevSub;
		return a === void 0 ? t.depsTail = i : a.prevDep = i, i === void 0 ? t.deps = a : i.nextDep = a, o === void 0 ? r.subsTail = s : o.prevSub = s, s === void 0 ? (r.subs = o) === void 0 && n(r) : s.nextSub = o, a;
	}
	function a(e) {
		let n = e.nextSub, r;
		top: do {
			let i = e.sub, a = i.flags;
			if (a & 60 ? a & 12 ? a & 4 ? !(a & 48) && c(e, i) ? (i.flags = a | 40, a &= 1) : a = 0 : i.flags = a & -9 | 32 : a = 0 : i.flags = a | 32, a & 2 && t(i), a & 1) {
				let t = i.subs;
				if (t !== void 0) {
					let i = (e = t).nextSub;
					i !== void 0 && (r = {
						value: n,
						prev: r
					}, n = i);
					continue;
				}
			}
			if ((e = n) !== void 0) {
				n = e.nextSub;
				continue;
			}
			for (; r !== void 0;) if (e = r.value, r = r.prev, e !== void 0) {
				n = e.nextSub;
				continue top;
			}
			break;
		} while (!0);
	}
	function o(t, n) {
		let r, i = 0, a = !1;
		top: do {
			let o = t.dep, c = o.flags;
			if (n.flags & 16) a = !0;
			else if ((c & 17) == 17) {
				if (e(o)) {
					let e = o.subs;
					e.nextSub !== void 0 && s(e), a = !0;
				}
			} else if ((c & 33) == 33) {
				(t.nextSub !== void 0 || t.prevSub !== void 0) && (r = {
					value: t,
					prev: r
				}), t = o.deps, n = o, ++i;
				continue;
			}
			if (!a) {
				let e = t.nextDep;
				if (e !== void 0) {
					t = e;
					continue;
				}
			}
			for (; i--;) {
				let i = n.subs, o = i.nextSub !== void 0;
				if (o ? (t = r.value, r = r.prev) : t = i, a) {
					if (e(n)) {
						o && s(i), n = t.sub;
						continue;
					}
					a = !1;
				} else n.flags &= -33;
				n = t.sub;
				let c = t.nextDep;
				if (c !== void 0) {
					t = c;
					continue top;
				}
			}
			return a;
		} while (!0);
	}
	function s(e) {
		do {
			let n = e.sub, r = n.flags;
			(r & 48) == 32 && (n.flags = r | 16, (r & 6) == 2 && t(n));
		} while ((e = e.nextSub) !== void 0);
	}
	function c(e, t) {
		let n = t.depsTail;
		for (; n !== void 0;) {
			if (n === e) return !0;
			n = n.prevDep;
		}
		return !1;
	}
}
//#endregion
//#region ../../../../sites/munshi-ji/node_modules/.pnpm/@tanstack+store@0.11.2/node_modules/@tanstack/store/dist/atom.js
function ln(e, t, n) {
	let r = typeof e == "object", i = r ? e : void 0;
	return {
		next: (r ? e.next : e)?.bind(i),
		error: (r ? e.error : t)?.bind(i),
		complete: (r ? e.complete : n)?.bind(i)
	};
}
var un = [], dn = 0, { link: fn, unlink: pn, propagate: mn, checkDirty: hn, shallowPropagate: gn } = /* @__PURE__ */ cn({
	update(e) {
		return e._update();
	},
	notify(e) {
		un[vn++] = e, e.flags &= -3;
	},
	unwatched(e) {
		e.depsTail !== void 0 && (e.depsTail = void 0, e.flags = 17, Sn(e));
	}
}), _n = 0, vn = 0, yn, bn = 0;
function xn(e) {
	try {
		++bn, e();
	} finally {
		--bn || Cn();
	}
}
function Sn(e) {
	let t = e.depsTail, n = t === void 0 ? e.deps : t.nextDep;
	for (; n !== void 0;) n = pn(n, e);
}
function Cn() {
	if (!(bn > 0)) {
		for (; _n < vn;) {
			let e = un[_n];
			un[_n++] = void 0, e.notify();
		}
		_n = 0, vn = 0;
	}
}
function wn(e, t) {
	let n = typeof e == "function", r = e, i = {
		_snapshot: n ? void 0 : e,
		subs: void 0,
		subsTail: void 0,
		deps: void 0,
		depsTail: void 0,
		flags: +!n,
		get() {
			return yn !== void 0 && fn(i, yn, dn), i._snapshot;
		},
		subscribe(e) {
			let t = ln(e), n = { current: !1 }, r = Tn(() => {
				i.get(), n.current ? (yn = void 0, t.next?.(i._snapshot)) : n.current = !0;
			});
			return { unsubscribe: () => {
				r.stop();
			} };
		},
		_update(e) {
			let a = yn, o = t?.compare ?? Object.is;
			if (n) yn = i, ++dn, i.depsTail = void 0;
			else if (e === void 0) return !1;
			n && (i.flags = 5);
			try {
				let t = i._snapshot, a = typeof e == "function" ? e(t) : e === void 0 && n ? r(t) : e;
				return t === void 0 || !o(t, a) ? (i._snapshot = a, !0) : !1;
			} finally {
				yn = a, n && (i.flags &= -5), Sn(i);
			}
		}
	};
	return n ? (i.flags = 17, i.get = function() {
		let e = i.flags;
		if (e & 16 || e & 32 && hn(i.deps, i)) {
			if (i._update()) {
				let e = i.subs;
				e !== void 0 && gn(e);
			}
		} else e & 32 && (i.flags = e & -33);
		return yn !== void 0 && fn(i, yn, dn), i._snapshot;
	}) : i.set = function(e) {
		if (i._update(e)) {
			let e = i.subs;
			e !== void 0 && (mn(e), gn(e), Cn());
		}
	}, i;
}
function Tn(e) {
	let t = () => {
		let t = yn;
		yn = n, ++dn, n.depsTail = void 0, n.flags = 6;
		try {
			return e();
		} finally {
			yn = t, n.flags &= -5, Sn(n);
		}
	}, n = {
		deps: void 0,
		depsTail: void 0,
		subs: void 0,
		subsTail: void 0,
		flags: 6,
		notify() {
			let e = this.flags;
			e & 16 || e & 32 && hn(this.deps, this) ? t() : this.flags = 2;
		},
		stop() {
			this.flags = 0, this.depsTail = void 0, Sn(this);
		}
	};
	return t(), n;
}
//#endregion
//#region ../../../../sites/munshi-ji/node_modules/.pnpm/@tanstack+store@0.11.2/node_modules/@tanstack/store/dist/shallow.js
function En(e, t) {
	if (Object.is(e, t)) return !0;
	if (typeof e != "object" || !e || typeof t != "object" || !t) return !1;
	if (e instanceof Map && t instanceof Map) {
		if (e.size !== t.size) return !1;
		for (let [n, r] of e) if (!t.has(n) || !Object.is(r, t.get(n))) return !1;
		return !0;
	}
	if (e instanceof Set && t instanceof Set) {
		if (e.size !== t.size) return !1;
		for (let n of e) if (!t.has(n)) return !1;
		return !0;
	}
	if (e instanceof Date && t instanceof Date) return e.getTime() === t.getTime();
	let n = Dn(e);
	if (n.length !== Dn(t).length) return !1;
	for (let r = 0; r < n.length; r++) if (!Object.prototype.hasOwnProperty.call(t, n[r]) || !Object.is(e[n[r]], t[n[r]])) return !1;
	return !0;
}
function Dn(e) {
	return Object.keys(e).concat(Object.getOwnPropertySymbols(e));
}
//#endregion
//#region ../../../../sites/munshi-ji/node_modules/.pnpm/use-sync-external-store@1.6.0_react@19.2.6/node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.production.js
var On = /* @__PURE__ */ o(((e) => {
	var t = u();
	function n(e, t) {
		return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t;
	}
	var r = typeof Object.is == "function" ? Object.is : n, i = t.useState, a = t.useEffect, o = t.useLayoutEffect, s = t.useDebugValue;
	function c(e, t) {
		var n = t(), r = i({ inst: {
			value: n,
			getSnapshot: t
		} }), c = r[0].inst, u = r[1];
		return o(function() {
			c.value = n, c.getSnapshot = t, l(c) && u({ inst: c });
		}, [
			e,
			n,
			t
		]), a(function() {
			return l(c) && u({ inst: c }), e(function() {
				l(c) && u({ inst: c });
			});
		}, [e]), s(n), n;
	}
	function l(e) {
		var t = e.getSnapshot;
		e = e.value;
		try {
			var n = t();
			return !r(e, n);
		} catch {
			return !0;
		}
	}
	function d(e, t) {
		return t();
	}
	var f = typeof window > "u" || window.document === void 0 || window.document.createElement === void 0 ? d : c;
	e.useSyncExternalStore = t.useSyncExternalStore === void 0 ? f : t.useSyncExternalStore;
})), kn = /* @__PURE__ */ o(((e, t) => {
	t.exports = On();
})), An = /* @__PURE__ */ o(((e) => {
	var t = u(), n = kn();
	function r(e, t) {
		return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t;
	}
	var i = typeof Object.is == "function" ? Object.is : r, a = n.useSyncExternalStore, o = t.useRef, s = t.useEffect, c = t.useMemo, l = t.useDebugValue;
	e.useSyncExternalStoreWithSelector = function(e, t, n, r, u) {
		var d = o(null);
		if (d.current === null) {
			var f = {
				hasValue: !1,
				value: null
			};
			d.current = f;
		} else f = d.current;
		d = c(function() {
			function e(e) {
				if (!a) {
					if (a = !0, o = e, e = r(e), u !== void 0 && f.hasValue) {
						var t = f.value;
						if (u(t, e)) return s = t;
					}
					return s = e;
				}
				if (t = s, i(o, e)) return t;
				var n = r(e);
				return u !== void 0 && u(t, n) ? (o = e, t) : (o = e, s = n);
			}
			var a = !1, o, s, c = n === void 0 ? null : n;
			return [function() {
				return e(t());
			}, c === null ? void 0 : function() {
				return e(c());
			}];
		}, [
			t,
			n,
			r,
			u
		]);
		var p = a(e, d[0], d[1]);
		return s(function() {
			f.hasValue = !0, f.value = p;
		}, [p]), l(p), p;
	};
})), jn = (/* @__PURE__ */ o(((e, t) => {
	t.exports = An();
})))();
function Mn(e, t) {
	return e === t;
}
function Nn(e, t = (e) => e, n) {
	let r = n?.compare ?? Mn, i = (0, y.useCallback)((t) => {
		let { unsubscribe: n } = e.subscribe(t);
		return n;
	}, [e]), a = (0, y.useCallback)(() => e.get(), [e]);
	return (0, jn.useSyncExternalStoreWithSelector)(i, a, a, t, r);
}
//#endregion
//#region ../../../../sites/munshi-ji/node_modules/.pnpm/@tanstack+react-table@9.3.1_react-dom@19.2.6_react@19.2.6__react@19.2.6/node_modules/@tanstack/react-table/dist/Subscribe.js
function Pn(e) {
	let t = Nn(e.source, e.selector, { compare: En });
	return typeof e.children == "function" ? e.children(t) : e.children;
}
//#endregion
//#region ../../../../sites/munshi-ji/node_modules/.pnpm/@tanstack+table-core@9.3.1/node_modules/@tanstack/table-core/dist/core/reactivity/coreReactivityFeature.utils.js
function Fn(e) {
	let t = e;
	return Object.defineProperty(e, "state", { get() {
		return e.get();
	} }), "set" in e && (t.setState = e.set.bind(e)), t;
}
//#endregion
//#region ../../../../sites/munshi-ji/node_modules/.pnpm/@tanstack+table-core@9.3.1/node_modules/@tanstack/table-core/dist/core/reactivity/renderPhaseReactivity.js
function In(e) {
	let { createAtom: t, batch: n } = e, r = t(0);
	return {
		createOptionsStore: !1,
		wrapExternalAtoms: !1,
		addSubscription: () => {
			throw Error("Feature not supported in current reactivity implementation");
		},
		unmount: () => {
			throw Error("Feature not supported in current reactivity implementation");
		},
		schedule: e.schedule ?? ((e) => queueMicrotask(e)),
		batch: n,
		untrack: (e) => e(),
		createReadonlyAtom: (e, n) => {
			let i = n?.compare ?? Object.is, a = !1, o, s = () => {
				let t = e();
				return (!a || !i(o, t)) && (o = t, a = !0), o;
			}, c = t(() => (r.get(), s()), { compare: i });
			return {
				get: s,
				subscribe: c.subscribe.bind(c)
			};
		},
		createWritableAtom: (e, n) => t(e, { compare: n?.compare }),
		commit: () => {
			r.set((e) => e + 1);
		}
	};
}
function Ln(e, t = Object.is) {
	let n = !1, r;
	return {
		get: e.get,
		markCommitted: (e) => {
			r = e, n = !0;
		},
		subscribe: (i) => e.subscribe((e) => {
			(!n || !t(r, e)) && i(e);
		})
	};
}
//#endregion
//#region ../../../../sites/munshi-ji/node_modules/.pnpm/@tanstack+react-table@9.3.1_react-dom@19.2.6_react@19.2.6__react@19.2.6/node_modules/@tanstack/react-table/dist/reactivity.js
function Rn() {
	return In({
		createAtom: wn,
		batch: xn
	});
}
//#endregion
//#region ../../../../sites/munshi-ji/node_modules/.pnpm/@tanstack+table-core@9.3.1/node_modules/@tanstack/table-core/dist/utils.js
function zn(e, t) {
	return typeof e == "function" ? e(t) : e;
}
function Bn(e) {
	if (Array.isArray(e)) return e.map(Bn);
	if (e && typeof e == "object") {
		let t = Object.getPrototypeOf(e);
		if (t !== Object.prototype && t !== null) return e;
		let n = t === null ? Hn() : {}, r = Object.keys(e);
		for (let t = 0; t < r.length; t++) {
			let i = r[t];
			Object.defineProperty(n, i, {
				configurable: !0,
				enumerable: !0,
				value: Bn(e[i]),
				writable: !0
			});
		}
		return n;
	}
	return e;
}
function Vn(e, t) {
	let n = Object.keys(t), r = e;
	for (let e = 0; e < n.length; e++) {
		let i = n[e];
		!i.startsWith("_memo_") && i !== "_cellsCache" && (r[i] = t[i]);
	}
	return e;
}
function Hn() {
	return Object.create(null);
}
function Un(e, t) {
	return Object.prototype.hasOwnProperty.call(e, t);
}
function Wn(e, t) {
	return (n) => {
		(t.options.atoms?.[e] ?? t.baseAtoms[e]).set((e) => zn(n, e));
	};
}
function Gn(e) {
	if (typeof e != "object" || !e) return !1;
	if (Array.isArray(e)) return !0;
	let t = Object.getPrototypeOf(e);
	return t === Object.prototype || t === null;
}
function Kn(e) {
	return Reflect.ownKeys(e).filter((t) => Object.prototype.propertyIsEnumerable.call(e, t));
}
var qn = 3;
function Jn(e, t) {
	return Yn(e, t, qn);
}
function Yn(e, t, n) {
	if (Object.is(e, t)) return !0;
	if (n <= 0 || !Gn(e) || !Gn(t) || (Array.isArray(e) || Array.isArray(t)) && (!Array.isArray(e) || !Array.isArray(t) || e.length !== t.length)) return !1;
	let r = Kn(e), i = Kn(t);
	if (r.length !== i.length) return !1;
	let a = e, o = t;
	for (let e = 0; e < r.length; e++) {
		let i = r[e];
		if (!Object.prototype.propertyIsEnumerable.call(t, i) || !Yn(a[i], o[i], n - 1)) return !1;
	}
	return !0;
}
function Xn(e, t, n, r = Jn) {
	let i = `on${t.charAt(0).toUpperCase()}${t.slice(1)}Change`, a = e.options[i];
	a && a((e) => {
		let t = zn(n, e);
		return r(e, t) ? e : t;
	});
}
function Zn(e, t) {
	let n = [], r = (e) => {
		e.forEach((e) => {
			n.push(e);
			let i = t(e);
			i.length && r(i);
		});
	};
	return r(e), n;
}
var Qn = ({ fn: e, memoDeps: t, onAfterCompare: n, onAfterUpdate: r, onBeforeCompare: i, onBeforeUpdate: a }) => {
	let o = [], s;
	return (c) => {
		i?.();
		let l = t?.(c), u = !l || l.length !== o?.length;
		if (!u && l) {
			for (let e = 0; e < l.length; e++) if (l[e] !== o[e]) {
				u = !0;
				break;
			}
		}
		return n?.(u), u ? (o = l, a?.(), s = e(...l ?? []), r?.(s), s) : s;
	};
};
function $n(e) {
	let t = !1;
	return () => {
		if (!t) {
			t = !0;
			return;
		}
		e();
	};
}
function er({ feature: e, fnName: t, objectId: n, onAfterUpdate: r, table: i, ...a }) {
	let o = { onAfterUpdate: r ? () => {
		let { schedule: e, untrack: t } = i._reactivity;
		e(() => t(() => r()));
	} : void 0 };
	return Qn({
		...a,
		...o
	});
}
function tr(e, t = "_") {
	let [n, r] = e.replace(t, " ").split(" ");
	return {
		fnKey: r,
		fnName: `${n}.${r}`,
		parentName: n
	};
}
function nr(e, t, n) {
	for (let [r, { fn: i, memoDeps: a }] of Object.entries(n)) {
		let { fnKey: n, fnName: o } = tr(r);
		t[n] = a ? er({
			memoDeps: a,
			fn: i,
			fnName: o,
			table: t,
			feature: e
		}) : i;
	}
}
function rr(e, t, n, r) {
	for (let [i, { fn: a, memoDeps: o }] of Object.entries(r)) {
		let { fnKey: r, fnName: s } = tr(i);
		if (o) {
			let i = `_memo_${r}`;
			t[r] = function(...t) {
				if (!this[i]) {
					let t = this;
					this[i] = er({
						memoDeps: (e) => o(t, e),
						fn: (...e) => a(t, ...e),
						fnName: s,
						objectId: t.id,
						table: n,
						feature: e
					});
				}
				return this[i](...t);
			};
		} else t[r] = function(...e) {
			return a(this, ...e);
		};
	}
}
function ir(e, t, n, ...r) {
	return e[t]?.(...r) ?? n(e, ...r);
}
//#endregion
//#region ../../../../sites/munshi-ji/node_modules/.pnpm/@tanstack+table-core@9.3.1/node_modules/@tanstack/table-core/dist/core/cells/coreCellsFeature.utils.js
function ar(e) {
	return e.row.getValue(e.column.id);
}
function or(e) {
	return e.getValue() ?? e.table.options.renderFallbackValue;
}
function sr(e) {
	return {
		table: e.table,
		column: e.column,
		row: e.row,
		cell: e,
		getValue: () => e.getValue(),
		renderValue: () => e.renderValue()
	};
}
//#endregion
//#region ../../../../sites/munshi-ji/node_modules/.pnpm/@tanstack+table-core@9.3.1/node_modules/@tanstack/table-core/dist/core/cells/coreCellsFeature.js
var cr = { assignCellPrototype: (e, t) => {
	rr("coreCellsFeature", e, t, {
		cell_getValue: { fn: (e) => ar(e) },
		cell_renderValue: { fn: (e) => or(e) },
		cell_getContext: {
			fn: (e) => sr(e),
			memoDeps: (e) => [e]
		}
	});
} };
//#endregion
//#region ../../../../sites/munshi-ji/node_modules/.pnpm/@tanstack+table-core@9.3.1/node_modules/@tanstack/table-core/dist/core/columns/constructColumn.js
function lr(e) {
	if (!e._columnPrototype) {
		e._columnPrototype = { table: e };
		let t = Object.values(e._features);
		for (let n = 0; n < t.length; n++) t[n].assignColumnPrototype?.(e._columnPrototype, e);
	}
	return e._columnPrototype;
}
function ur(e, t, n, r) {
	let i = {
		...e.getDefaultColumnDef(),
		...t
	}, a = i.accessorKey, o = a === void 0 ? void 0 : String(a), s = i.id ?? o?.replaceAll(".", "_") ?? (typeof i.header == "string" ? i.header : void 0), c;
	if (i.accessorFn) c = i.accessorFn;
	else if (a !== void 0) if (typeof a == "string" && a.includes(".")) {
		let e = a.split(".");
		c = (t) => {
			let n = t;
			for (let t = 0; t < e.length; t++) {
				let r = e[t];
				n = n?.[r];
			}
			return n;
		};
	} else c = (e) => e[i.accessorKey];
	if (!s) throw Error();
	let l = lr(e), u = Object.create(l);
	u.accessorFn = c, u.columnDef = i, u.columns = [], u.depth = n, u.id = `${String(s)}`, u.parent = r;
	let d = e._columnInstanceInitFns;
	for (let e = 0; e < d.length; e++) d[e](u);
	return u;
}
//#endregion
//#region ../../../../sites/munshi-ji/node_modules/.pnpm/@tanstack+table-core@9.3.1/node_modules/@tanstack/table-core/dist/core/featureStubs.js
function dr(e) {
	return e.getIsVisible?.() ?? !0;
}
function fr(e) {
	return e.getVisibleLeafColumns?.() ?? e.getAllLeafColumns();
}
function pr(e, t) {
	let n = e, r = t;
	return n.getOrderColumnsFn?.()(r) ?? n._orderGroupedColumns?.(r) ?? t;
}
function mr(e, t, n, r) {
	return e._orderByColumnPinning?.(t, n, r) ?? t;
}
function hr(e, t) {
	return e._expandRows?.(t) ?? t;
}
function gr(e) {
	e.autoResetExpanded?.();
}
function _r(e) {
	e.autoResetPageIndex?.();
}
function vr(e) {
	e.autoResetSorting?.();
}
function yr(e) {
	e.autoResetCellSelection?.();
}
//#endregion
//#region ../../../../sites/munshi-ji/node_modules/.pnpm/@tanstack+table-core@9.3.1/node_modules/@tanstack/table-core/dist/core/columns/coreColumnsFeature.utils.js
function br(e) {
	return [e, ...e.columns.flatMap((e) => e.getFlatColumns())];
}
function xr(e) {
	if (e.columns.length) {
		let t = e.columns.flatMap((e) => e.getLeafColumns());
		return pr(e.table, t);
	}
	return [e];
}
function Sr(e) {
	return {
		header: (e) => {
			let t = e.header.column.columnDef;
			return t.accessorKey ? t.accessorKey : t.accessorFn ? t.id : null;
		},
		cell: (e) => e.renderValue()?.toString?.() ?? null,
		...Object.values(e._features).reduce((e, t) => Object.assign(e, t.getDefaultColumnDef?.()), {}),
		...e.options.defaultColumn
	};
}
function Cr(e, t, n, r = 0) {
	let i = Array(t.length);
	for (let a = 0; a < t.length; a++) {
		if (!(a in t)) continue;
		let o = t[a], s = ur(e, o, r, n), c = o;
		s.columns = c.columns ? Cr(e, c.columns, s, r + 1) : [], i[a] = s;
	}
	return i;
}
function wr(e) {
	return Cr(e, e.options.columns);
}
function Tr(e) {
	return e.getAllColumns().flatMap((e) => e.getFlatColumns());
}
function Er(e) {
	let t = Hn(), n = e.getAllFlatColumns();
	for (let e = 0; e < n.length; e++) {
		let r = n[e];
		t[r.id] = r;
	}
	return t;
}
function Dr(e) {
	return pr(e, e.getAllColumns().flatMap((e) => e.getLeafColumns()));
}
function Or(e) {
	let t = Hn(), n = e.getAllLeafColumns();
	for (let e = 0; e < n.length; e++) {
		let r = n[e];
		t[r.id] = r;
	}
	return t;
}
function kr(e, t) {
	return e.getAllFlatColumnsById()[t];
}
//#endregion
//#region ../../../../sites/munshi-ji/node_modules/.pnpm/@tanstack+table-core@9.3.1/node_modules/@tanstack/table-core/dist/core/columns/coreColumnsFeature.js
var Ar = {
	assignColumnPrototype: (e, t) => {
		rr("coreColumnsFeature", e, t, {
			column_getFlatColumns: {
				fn: (e) => br(e),
				memoDeps: (e) => [e.table.options.columns]
			},
			column_getLeafColumns: {
				fn: (e) => xr(e),
				memoDeps: (e) => [
					e.table.atoms.columnOrder?.get(),
					e.table.atoms.grouping?.get(),
					e.table.options.columns,
					e.table.options.groupedColumnMode
				]
			}
		});
	},
	constructTableAPIs: (e) => {
		nr("coreColumnsFeature", e, {
			table_getDefaultColumnDef: {
				fn: () => Sr(e),
				memoDeps: () => [e.options.defaultColumn]
			},
			table_getAllColumns: {
				fn: () => wr(e),
				memoDeps: () => [e.options.columns]
			},
			table_getAllFlatColumns: {
				fn: () => Tr(e),
				memoDeps: () => [e.options.columns]
			},
			table_getAllFlatColumnsById: {
				fn: () => Er(e),
				memoDeps: () => [e.options.columns]
			},
			table_getAllLeafColumns: {
				fn: () => Dr(e),
				memoDeps: () => [
					e.atoms.columnOrder?.get(),
					e.atoms.grouping?.get(),
					e.options.columns,
					e.options.groupedColumnMode
				]
			},
			table_getAllLeafColumnsById: {
				fn: () => Or(e),
				memoDeps: () => [e.getAllLeafColumns()]
			},
			table_getColumn: { fn: (t) => kr(e, t) }
		});
	}
};
//#endregion
//#region ../../../../sites/munshi-ji/node_modules/.pnpm/@tanstack+table-core@9.3.1/node_modules/@tanstack/table-core/dist/core/headers/constructHeader.js
function jr(e) {
	if (!e._headerPrototype) {
		e._headerPrototype = { table: e };
		let t = Object.values(e._features);
		for (let n = 0; n < t.length; n++) t[n].assignHeaderPrototype?.(e._headerPrototype, e);
	}
	return e._headerPrototype;
}
function Mr(e, t, n) {
	let r = jr(e), i = Object.create(r);
	i.colSpan = 0, i.column = t, i.depth = n.depth, i.headerGroup = null, i.id = n.id ?? t.id, i.index = n.index, i.isPlaceholder = !!n.isPlaceholder, i.placeholderId = n.placeholderId, i.rowSpan = 0, i.subHeaders = [];
	let a = e._headerInstanceInitFns;
	for (let e = 0; e < a.length; e++) a[e](i);
	return i;
}
//#endregion
//#region ../../../../sites/munshi-ji/node_modules/.pnpm/@tanstack+table-core@9.3.1/node_modules/@tanstack/table-core/dist/core/headers/buildHeaderGroups.js
function Nr(e, t = 1) {
	let n = t;
	for (let r = 0; r < e.length; r++) {
		let i = e[r];
		dr(i) && i.columns.length && (n = Math.max(n, Nr(i.columns, t + 1)));
	}
	return n;
}
function Pr(e, t) {
	return e ? `${e}_${t}` : String(t);
}
function Fr(e, t, n, r) {
	let i = e ?? "";
	return t && (i = i ? `${i}_${t}` : String(t)), n && (i = i ? `${i}_${n}` : n), r && (i = i ? `${i}_${r}` : r), i;
}
function Ir(e, t) {
	let n = 0;
	for (let r = 0; r < e.length; r++) e[r].column === t && n++;
	return n;
}
function Lr(e, t, n, r, i, a) {
	let o = {
		depth: t,
		id: Pr(r, t),
		headers: []
	}, s = [];
	for (let i = 0; i < e.length; i++) {
		if (!(i in e)) continue;
		let a = e[i], c = s[s.length - 1], l = a.column.depth === o.depth, u, d = !1;
		if (l && a.column.parent ? u = a.column.parent : (u = a.column, d = !0), c && c.column === u) c.subHeaders.push(a);
		else {
			let e = Mr(n, u, {
				id: Fr(r, t, u.id, a.id),
				isPlaceholder: d,
				placeholderId: d ? String(Ir(s, u)) : void 0,
				depth: t,
				index: s.length
			});
			e.subHeaders.push(a), s.push(e);
		}
		o.headers.push(a), a.headerGroup = o;
	}
	for (let e = 0; e < a.length; e++) a[e](o);
	i.push(o), t > 0 && Lr(s, t - 1, n, r, i, a);
}
function Rr(e) {
	for (let t = 0; t < e.length; t++) {
		let n = e[t];
		if (!dr(n.column)) continue;
		let r = 0;
		if (n.subHeaders.length) {
			Rr(n.subHeaders);
			for (let e = 0; e < n.subHeaders.length; e++) {
				let t = n.subHeaders[e];
				dr(t.column) && (r += t.colSpan);
			}
		} else r = 1;
		if (n.colSpan = r, n.isPlaceholder && n.subHeaders.length === 1 && n.subHeaders[0].column === n.column) {
			let e = 1, t = n.subHeaders[0];
			for (; t;) t.rowSpan = 0, e++, t = t.subHeaders.length === 1 && t.subHeaders[0].column === n.column ? t.subHeaders[0] : void 0;
			n.rowSpan = e;
		} else n.rowSpan = 1;
	}
}
function zr(e, t, n, r) {
	let i = Nr(e), a = [], o = n._headerGroupInstanceInitFns, s = Array(t.length);
	for (let e = 0; e < t.length; e++) e in t && (s[e] = Mr(n, t[e], {
		depth: i,
		index: e
	}));
	return Lr(s, i - 1, n, r, a, o), a.reverse(), Rr(a[0]?.headers ?? []), a;
}
//#endregion
//#region ../../../../sites/munshi-ji/node_modules/.pnpm/@tanstack+table-core@9.3.1/node_modules/@tanstack/table-core/dist/core/headers/coreHeadersFeature.utils.js
function Br(e, t) {
	for (let n = 0; n < e.subHeaders.length; n++) Br(e.subHeaders[n], t);
	t.push(e);
}
function Vr(e) {
	let t = [];
	return Br(e, t), t;
}
function Hr(e) {
	return {
		column: e.column,
		header: e,
		table: e.column.table
	};
}
function Ur(e) {
	return zr(e.getAllColumns(), mr(e, fr(e), (e) => e.id), e);
}
function Wr(e) {
	return [...e.getHeaderGroups()].reverse();
}
function Gr(e) {
	let t = e.getHeaderGroups(), n = [];
	for (let e = 0; e < t.length; e++) {
		let r = t[e].headers;
		for (let e = 0; e < r.length; e++) n.push(r[e]);
	}
	return n;
}
function Kr(e) {
	let t = e.getHeaderGroups()[0]?.headers ?? [], n = [];
	for (let e = 0; e < t.length; e++) {
		let r = t[e].getLeafHeaders();
		for (let e = 0; e < r.length; e++) n.push(r[e]);
	}
	return n;
}
//#endregion
//#region ../../../../sites/munshi-ji/node_modules/.pnpm/@tanstack+table-core@9.3.1/node_modules/@tanstack/table-core/dist/core/headers/coreHeadersFeature.js
var qr = {
	assignHeaderPrototype: (e, t) => {
		rr("coreHeadersFeature", e, t, {
			header_getLeafHeaders: {
				fn: (e) => Vr(e),
				memoDeps: (e) => [e.column.table.options.columns]
			},
			header_getContext: {
				fn: (e) => Hr(e),
				memoDeps: (e) => [e.column.table.options.columns]
			}
		});
	},
	constructTableAPIs: (e) => {
		nr("coreHeadersFeature", e, {
			table_getHeaderGroups: {
				fn: () => Ur(e),
				memoDeps: () => [
					e.options.columns,
					e.atoms.columnOrder?.get(),
					e.atoms.grouping?.get(),
					e.atoms.columnPinning?.get(),
					e.atoms.columnVisibility?.get(),
					e.options.groupedColumnMode
				]
			},
			table_getFooterGroups: {
				fn: () => Wr(e),
				memoDeps: () => [e.getHeaderGroups()]
			},
			table_getFlatHeaders: {
				fn: () => Gr(e),
				memoDeps: () => [e.getHeaderGroups()]
			},
			table_getLeafHeaders: {
				fn: () => Kr(e),
				memoDeps: () => [e.getHeaderGroups()]
			}
		});
	}
};
//#endregion
//#region ../../../../sites/munshi-ji/node_modules/.pnpm/@tanstack+table-core@9.3.1/node_modules/@tanstack/table-core/dist/core/rows/constructRow.js
function Jr(e) {
	if (!e._rowPrototype) {
		e._rowPrototype = { table: e };
		let t = Object.values(e._features);
		for (let n = 0; n < t.length; n++) t[n].assignRowPrototype?.(e._rowPrototype, e);
	}
	return e._rowPrototype;
}
var Yr = (e, t, n, r, i, a, o) => {
	let s = Jr(e), c = Object.create(s);
	c._displayIndexCache = -1, c._uniqueValuesCache = Hn(), c._valuesCache = Hn(), c.depth = i, c.id = t, c.index = r, c.original = n, c.parentId = o, c.subRows = a ?? [];
	let l = e._rowInstanceInitFns;
	for (let e = 0; e < l.length; e++) l[e](c);
	return c;
};
//#endregion
//#region ../../../../sites/munshi-ji/node_modules/.pnpm/@tanstack+table-core@9.3.1/node_modules/@tanstack/table-core/dist/core/row-models/createCoreRowModel.js
function Xr() {
	return (e) => er({
		feature: "coreRowModelsFeature",
		table: e,
		fnName: "table.getCoreRowModel",
		memoDeps: () => [e.options.data],
		fn: () => Qr(e, e.options.data),
		onAfterUpdate: $n(() => {
			gr(e), _r(e), vr(e), yr(e);
		})
	});
}
function Zr(e, t, n, r = 0, i) {
	let a = [];
	for (let o = 0; o < n.length; o++) {
		let s = n[o], c = Yr(e, e.getRowId(s, o, i), s, o, r, void 0, i?.id);
		t.flatRows.push(c), t.rowsById[c.id] = c, a.push(c), e.options.getSubRows && (c.originalSubRows = e.options.getSubRows(s, o), c.originalSubRows?.length && (c.subRows = Zr(e, t, c.originalSubRows, r + 1, c)));
	}
	return a;
}
function Qr(e, t) {
	let n = {
		rows: [],
		flatRows: [],
		rowsById: Hn()
	};
	return n.rows = Zr(e, n, t), n;
}
//#endregion
//#region ../../../../sites/munshi-ji/node_modules/.pnpm/@tanstack+table-core@9.3.1/node_modules/@tanstack/table-core/dist/core/row-models/coreRowModelsFeature.utils.js
function $r(e) {
	return e._rowModels.coreRowModel || (e._rowModels.coreRowModel = e.options.features.coreRowModel?.(e) ?? Xr()(e)), e._rowModels.coreRowModel();
}
function ei(e) {
	return e.getCoreRowModel();
}
function ti(e) {
	return e._rowModels.filteredRowModel || (e._rowModels.filteredRowModel = e.options.features.filteredRowModel?.(e)), e.options.manualFiltering || !e._rowModels.filteredRowModel ? e.getPreFilteredRowModel() : e._rowModels.filteredRowModel();
}
function ni(e) {
	return e.getFilteredRowModel();
}
function ri(e) {
	return e._rowModels.groupedRowModel || (e._rowModels.groupedRowModel = e.options.features.groupedRowModel?.(e)), e.options.manualGrouping || !e._rowModels.groupedRowModel ? e.getPreGroupedRowModel() : e._rowModels.groupedRowModel();
}
function ii(e) {
	return e.getGroupedRowModel();
}
function ai(e) {
	return e._rowModels.sortedRowModel || (e._rowModels.sortedRowModel = e.options.features.sortedRowModel?.(e)), e.options.manualSorting || !e._rowModels.sortedRowModel ? e.getPreSortedRowModel() : e._rowModels.sortedRowModel();
}
function oi(e) {
	return e.getSortedRowModel();
}
function si(e) {
	return e._rowModels.expandedRowModel || (e._rowModels.expandedRowModel = e.options.features.expandedRowModel?.(e)), e.options.manualExpanding || !e._rowModels.expandedRowModel ? e.getPreExpandedRowModel() : e._rowModels.expandedRowModel();
}
function ci(e) {
	return e.getExpandedRowModel();
}
function li(e) {
	return e._rowModels.paginatedRowModel || (e._rowModels.paginatedRowModel = e.options.features.paginatedRowModel?.(e)), e.options.manualPagination || !e._rowModels.paginatedRowModel ? e.getPrePaginatedRowModel() : e._rowModels.paginatedRowModel();
}
function ui(e) {
	return e.getPaginatedRowModel();
}
//#endregion
//#region ../../../../sites/munshi-ji/node_modules/.pnpm/@tanstack+table-core@9.3.1/node_modules/@tanstack/table-core/dist/core/row-models/coreRowModelsFeature.js
var di = { constructTableAPIs: (e) => {
	nr("coreRowModelsFeature", e, {
		table_getCoreRowModel: { fn: () => $r(e) },
		table_getPreFilteredRowModel: { fn: () => ei(e) },
		table_getFilteredRowModel: { fn: () => ti(e) },
		table_getPreGroupedRowModel: { fn: () => ni(e) },
		table_getGroupedRowModel: { fn: () => ri(e) },
		table_getPreSortedRowModel: { fn: () => ii(e) },
		table_getSortedRowModel: { fn: () => ai(e) },
		table_getPreExpandedRowModel: { fn: () => oi(e) },
		table_getExpandedRowModel: { fn: () => si(e) },
		table_getPrePaginatedRowModel: { fn: () => ci(e) },
		table_getPaginatedRowModel: { fn: () => li(e) },
		table_getRowModel: { fn: () => ui(e) }
	});
} };
//#endregion
//#region ../../../../sites/munshi-ji/node_modules/.pnpm/@tanstack+table-core@9.3.1/node_modules/@tanstack/table-core/dist/core/cells/constructCell.js
function fi(e) {
	if (!e._cellPrototype) {
		e._cellPrototype = { table: e };
		let t = Object.values(e._features);
		for (let n = 0; n < t.length; n++) t[n].assignCellPrototype?.(e._cellPrototype, e);
	}
	return e._cellPrototype;
}
function pi(e, t, n) {
	let r = fi(n), i = Object.create(r);
	i.column = e, i.id = `${t.id}_${e.id}`, i.row = t;
	let a = n._cellInstanceInitFns;
	for (let e = 0; e < a.length; e++) a[e](i);
	return i;
}
//#endregion
//#region ../../../../sites/munshi-ji/node_modules/.pnpm/@tanstack+table-core@9.3.1/node_modules/@tanstack/table-core/dist/core/rows/coreRowsFeature.utils.js
function mi(e) {
	let t = e.table.getRowsInDisplayOrder(), n = e._displayIndexCache;
	return t[n] === e ? n : -1;
}
function hi(e) {
	let t = e.getPrePaginatedRowModel(), n = e.options.paginateExpandedRows === !1 ? hr(e, t).rows : t.rows;
	for (let e = 0; e < n.length; e++) n[e]._displayIndexCache = e;
	return n;
}
function gi(e, t) {
	if (Un(e._valuesCache, t)) return e._valuesCache[t];
	let n = e.table.getColumn(t);
	if (n?.accessorFn) return e._valuesCache[t] = n.accessorFn(e.original, e.index), e._valuesCache[t];
}
function _i(e, t) {
	if (Un(e._uniqueValuesCache, t)) return e._uniqueValuesCache[t];
	let n = e.table.getColumn(t);
	if (n?.accessorFn) return n.columnDef.getUniqueValues ? (e._uniqueValuesCache[t] = n.columnDef.getUniqueValues(e.original, e.index), e._uniqueValuesCache[t]) : (e._uniqueValuesCache[t] = [e.getValue(t)], e._uniqueValuesCache[t]);
}
function vi(e, t) {
	return e.getValue(t) ?? e.table.options.renderFallbackValue;
}
function yi(e) {
	return Zn(e.subRows, (e) => e.subRows);
}
function bi(e) {
	let t = e.getCoreRowModel().flatRows, n = 0;
	for (let e = 0; e < t.length; e++) n = Math.max(n, t[e].depth);
	return n;
}
function xi(e) {
	if (e.parentId) return e.table.getCoreRowModel().rowsById[e.parentId] ?? e.table.getRow(e.parentId, !0);
}
function Si(e) {
	let t = [], n = e;
	for (;;) {
		let e = n.getParentRow();
		if (!e) break;
		t.push(e), n = e;
	}
	return t.reverse();
}
function Ci(e) {
	let t = e.table.getAllLeafColumns(), n = e._cellsCache;
	n ||= e._cellsCache = /* @__PURE__ */ new WeakMap();
	let r = Array(t.length);
	for (let i = 0; i < t.length; i++) {
		let a = t[i], o = n.get(a);
		o || (o = pi(a, e, e.table), n.set(a, o)), r[i] = o;
	}
	return r;
}
function wi(e) {
	let t = Hn(), n = e.getAllCells();
	for (let e = 0; e < n.length; e++) {
		let r = n[e];
		t[r.column.id] = r;
	}
	return t;
}
function Ti(e, t, n, r) {
	return t.options.getRowId?.(e, n, r) ?? (r ? `${r.id}.${n}` : String(n));
}
function Ei(e, t, n) {
	let r = (n ? e.getPrePaginatedRowModel() : e.getRowModel()).rowsById[t];
	if (!r && (r = e.getCoreRowModel().rowsById[t], !r)) throw Error();
	return r;
}
//#endregion
//#region ../../../../sites/munshi-ji/node_modules/.pnpm/@tanstack+table-core@9.3.1/node_modules/@tanstack/table-core/dist/core/rows/coreRowsFeature.js
var Di = {
	assignRowPrototype: (e, t) => {
		rr("coreRowsFeature", e, t, {
			row_getDisplayIndex: { fn: (e) => mi(e) },
			row_getAllCellsByColumnId: {
				fn: (e) => wi(e),
				memoDeps: (e) => [e.getAllCells()]
			},
			row_getAllCells: {
				fn: (e) => Ci(e),
				memoDeps: (e) => [e.table.getAllLeafColumns()]
			},
			row_getLeafRows: {
				fn: (e) => yi(e),
				memoDeps: (e) => [e.subRows]
			},
			row_getParentRow: { fn: (e) => xi(e) },
			row_getParentRows: { fn: (e) => Si(e) },
			row_getUniqueValues: { fn: (e, t) => _i(e, t) },
			row_getValue: { fn: (e, t) => gi(e, t) },
			row_renderValue: { fn: (e, t) => vi(e, t) }
		});
	},
	constructTableAPIs: (e) => {
		nr("coreRowsFeature", e, {
			table_getRowsInDisplayOrder: {
				fn: () => hi(e),
				memoDeps: () => [
					e.getPrePaginatedRowModel().rows,
					e.options.paginateExpandedRows,
					e.options.paginateExpandedRows === !1 ? e.atoms.expanded?.get() : void 0
				]
			},
			table_getRowId: { fn: (t, n, r) => Ti(t, e, n, r) },
			table_getRow: { fn: (t, n) => Ei(e, t, n) },
			table_getMaxSubRowDepth: {
				fn: () => bi(e),
				memoDeps: () => [e.getCoreRowModel()]
			}
		});
	}
};
//#endregion
//#region ../../../../sites/munshi-ji/node_modules/.pnpm/@tanstack+table-core@9.3.1/node_modules/@tanstack/table-core/dist/core/table/coreTablesFeature.utils.js
function Oi(e, t, n = (e, t) => e === t) {
	let r = t === void 0 ? e.options.state : t;
	e._reactivity.batch(() => {
		if (r) for (let t in r) {
			let i = e.baseAtoms[t];
			if (!i) continue;
			let a = r[t], o = a === void 0 ? e.initialState[t] : a;
			n(e._reactivity.untrack(() => i.get()), o) || i.set(() => o);
		}
	});
}
function ki(e, t, n = (e, t) => e === t) {
	e._reactivity.batch(() => {
		Oi(e, t, n), e._reactivity.commit?.();
	});
}
function Ai(e) {
	let t = Bn(e.initialState);
	e._reactivity.batch(() => {
		let n = Object.keys(t);
		for (let r = 0; r < n.length; r++) {
			let i = n[r];
			e.baseAtoms[i].set(t[i]);
		}
	});
	let n = Object.values(e._features);
	for (let t = 0; t < n.length; t++) n[t].resetTableInstanceData?.(e);
}
function ji(e, t) {
	let { features: n, atoms: r, initialState: i } = e.options;
	if (!e.options.mergeOptions) return {
		...e.options,
		...t,
		features: n,
		atoms: r,
		initialState: i
	};
	let a = e.options.mergeOptions(e.options, t), o = { ...Object.getOwnPropertyDescriptors(a) };
	return Object.defineProperties(Object.create(Object.getPrototypeOf(a)), {
		...o,
		features: {
			value: n,
			enumerable: !0,
			configurable: !0,
			writable: !0
		},
		atoms: {
			value: r,
			enumerable: !0,
			configurable: !0,
			writable: !0
		},
		initialState: {
			value: i,
			enumerable: !0,
			configurable: !0,
			writable: !0
		}
	});
}
function Mi(e, t, n) {
	let r = ji(e, zn(t, e.options));
	e.optionsStore ? e.optionsStore.set(() => r) : e.options = r, n?.syncExternalState !== !1 && ki(e, r.state ?? null);
}
//#endregion
//#region ../../../../sites/munshi-ji/node_modules/.pnpm/@tanstack+table-core@9.3.1/node_modules/@tanstack/table-core/dist/core/coreFeatures.js
var Ni = {
	coreCellsFeature: cr,
	coreColumnsFeature: Ar,
	coreHeadersFeature: qr,
	coreRowModelsFeature: di,
	coreRowsFeature: Di,
	coreTablesFeature: { constructTableAPIs: (e) => {
		nr("coreTablesFeature", e, {
			table_reset: { fn: () => Ai(e) },
			table_setOptions: { fn: (t) => Mi(e, t) }
		});
	} }
};
//#endregion
//#region ../../../../sites/munshi-ji/node_modules/.pnpm/@tanstack+table-core@9.3.1/node_modules/@tanstack/table-core/dist/helpers/tableFeatures.js
function Pi(e) {
	return e;
}
//#endregion
//#region ../../../../sites/munshi-ji/node_modules/.pnpm/@tanstack+table-core@9.3.1/node_modules/@tanstack/table-core/dist/core/table/constructTable.js
function Fi(e, t = {}) {
	return Object.values(e).forEach((e) => {
		t = e.getInitialState?.(t) ?? t;
	}), Bn(t);
}
function Ii(e) {
	let t = e.features.coreReactivityFeature, { aggregationFns: n, columnMeta: r, coreRowModel: i, expandedRowModel: a, facetedMinMaxValues: o, facetedRowModel: s, facetedUniqueValues: c, filterFns: l, filterMeta: u, filteredRowModel: d, groupedRowModel: f, paginatedRowModel: p, sortFns: m, sortedRowModel: h, tableMeta: g, ..._ } = e.features, v = {
		_cellInstanceInitFns: [],
		_columnInstanceInitFns: [],
		_features: {
			...Ni,
			..._
		},
		_headerGroupInstanceInitFns: [],
		_headerInstanceInitFns: [],
		_reactivity: t,
		_rowInstanceInitFns: [],
		_rowModelFns: {
			aggregationFns: n,
			filterFns: l,
			sortFns: m
		},
		_rowModels: {},
		atoms: {},
		baseAtoms: {}
	}, y = Object.values(v._features), b = {
		...y.reduce((e, t) => Object.assign(e, t.getDefaultTableOptions?.(v)), {}),
		...e
	};
	if (t.wrapExternalAtoms && b.atoms) for (let [e, n] of Object.entries(b.atoms)) {
		let r = n, i = t.createWritableAtom(r.get(), { debugName: `externalAtom/${e}` });
		b.atoms[e] = i;
		let a = !1, o = r.subscribe((e) => {
			a || i.set(e);
		}), s = i.subscribe((e) => {
			a = !0, r.set(e), a = !1;
		});
		t.addSubscription(o), t.addSubscription(s);
	}
	t.createOptionsStore ? (v.optionsStore = t.createWritableAtom(b, { debugName: "table/optionsStore" }), Object.defineProperty(v, "options", {
		configurable: !0,
		enumerable: !0,
		get() {
			return v.optionsStore.get();
		},
		set(e) {
			v.optionsStore.set(() => e);
		}
	})) : v.options = b, v.initialState = Fi(v._features, v.options.initialState);
	let x = Object.keys(v.initialState);
	for (let e = 0; e < x.length; e++) {
		let n = x[e];
		v.baseAtoms[n] = t.createWritableAtom(v.initialState[n], { debugName: `table/baseAtoms/${n}` }), v.atoms[n] = t.createReadonlyAtom(() => {
			let e = v.options, t = e.atoms?.[n], r = t ? t.get() : v.baseAtoms[n].get();
			if (t) return r;
			let i = e.state;
			if (i && Un(i, n)) {
				let e = i[n];
				return e === void 0 ? v.initialState[n] : e;
			}
			return r;
		}, { debugName: `table/atoms/${n}` });
	}
	Oi(v), v.store = Fn(t.createReadonlyAtom(() => {
		let e = {};
		for (let t = 0; t < x.length; t++) {
			let n = x[t];
			e[n] = v.atoms[n].get();
		}
		return e;
	}, {
		compare: En,
		debugName: "table/store"
	}));
	for (let e = 0; e < y.length; e++) {
		let t = y[e];
		t.initTableInstanceData?.(v), t.initCellInstanceData && v._cellInstanceInitFns.push(t.initCellInstanceData.bind(t)), t.initColumnInstanceData && v._columnInstanceInitFns.push(t.initColumnInstanceData.bind(t)), t.initHeaderGroupInstanceData && v._headerGroupInstanceInitFns.push(t.initHeaderGroupInstanceData.bind(t)), t.initHeaderInstanceData && v._headerInstanceInitFns.push(t.initHeaderInstanceData.bind(t)), t.initRowInstanceData && v._rowInstanceInitFns.push(t.initRowInstanceData.bind(t)), t.constructTableAPIs?.(v);
	}
	return v;
}
//#endregion
//#region ../../../../sites/munshi-ji/node_modules/.pnpm/@tanstack+table-core@9.3.1/node_modules/@tanstack/table-core/dist/features/row-pagination/rowPaginationFeature.utils.js
var I = 0, L = 10;
function Li() {
	return {
		pageIndex: I,
		pageSize: L
	};
}
function Ri(e) {
	if (e.options.autoResetAll ?? e.options.autoResetPageIndex ?? !e.options.manualPagination) {
		if ((e.atoms.pagination?.get()?.pageIndex ?? I) === I) return;
		Hi(e, !0);
	}
}
function zi(e, t) {
	Xn(e, "pagination", t);
}
function Bi(e, t) {
	zi(e, t ? Li() : Bn(e.initialState.pagination ?? Li()));
}
function Vi(e, t) {
	zi(e, (n) => {
		let r = zn(t, n.pageIndex), i = e.options.pageCount === void 0 || e.options.pageCount === -1 ? 2 ** 53 - 1 : e.options.pageCount - 1;
		return r = Math.max(0, Math.min(r, i)), {
			...n,
			pageIndex: r
		};
	});
}
function Hi(e, t) {
	Vi(e, t ? I : e.initialState.pagination?.pageIndex ?? I);
}
function Ui(e, t) {
	Wi(e, t ? L : e.initialState.pagination?.pageSize ?? L);
}
function Wi(e, t) {
	zi(e, (e) => {
		let n = Math.max(1, zn(t, e.pageSize)), r = e.pageSize === Infinity ? 0 : e.pageSize * e.pageIndex, i = n === Infinity ? 0 : Math.floor(r / n);
		return {
			...e,
			pageIndex: i,
			pageSize: n
		};
	});
}
function Gi(e) {
	let t = $i(e), n = [];
	return t && t > 0 && (n = [...Array(t)].fill(null).map((e, t) => t)), n;
}
function Ki(e) {
	return (e.atoms.pagination?.get()?.pageIndex ?? 0) > 0;
}
function qi(e) {
	let t = e.atoms.pagination?.get()?.pageIndex ?? I, n = $i(e);
	return n === -1 ? !0 : n === 0 ? !1 : t < n - 1;
}
function Ji(e) {
	let t = e.atoms.pagination?.get()?.pageIndex ?? I, n = $i(e);
	return Number.isFinite(n) && n > 0 && t < n - 1;
}
function Yi(e) {
	return Vi(e, (e) => e - 1);
}
function Xi(e) {
	return Vi(e, (e) => e + 1);
}
function Zi(e) {
	return Vi(e, 0);
}
function Qi(e) {
	let t = $i(e);
	if (!(!Number.isFinite(t) || t <= 0)) return Vi(e, t - 1);
}
function $i(e) {
	let t = e.options.pageCount;
	if (t != null) return t;
	let n = ea(e), r = e.atoms.pagination?.get()?.pageSize ?? L;
	return r === Infinity && Number.isFinite(n) && n > 0 ? 1 : Math.ceil(n / r);
}
function ea(e) {
	return e.options.rowCount ?? e.getPrePaginatedRowModel().rows.length;
}
//#endregion
//#region ../../../../sites/munshi-ji/node_modules/.pnpm/@tanstack+table-core@9.3.1/node_modules/@tanstack/table-core/dist/features/row-pagination/rowPaginationFeature.js
var ta = {
	getInitialState: (e) => ({
		...e,
		pagination: {
			...Li(),
			...e.pagination
		}
	}),
	getDefaultTableOptions: (e) => ({ onPaginationChange: Wn("pagination", e) }),
	constructTableAPIs: (e) => {
		nr("rowPaginationFeature", e, {
			table_autoResetPageIndex: { fn: () => Ri(e) },
			table_setPagination: { fn: (t) => zi(e, t) },
			table_resetPagination: { fn: (t) => Bi(e, t) },
			table_setPageIndex: { fn: (t) => Vi(e, t) },
			table_resetPageIndex: { fn: (t) => Hi(e, t) },
			table_setPageSize: { fn: (t) => Wi(e, t) },
			table_getPageCount: { fn: () => $i(e) },
			table_resetPageSize: { fn: (t) => Ui(e, t) },
			table_getPageOptions: { fn: () => Gi(e) },
			table_getCanPreviousPage: { fn: () => Ki(e) },
			table_getCanNextPage: { fn: () => qi(e) },
			table_getCanLastPage: { fn: () => Ji(e) },
			table_previousPage: { fn: () => Yi(e) },
			table_nextPage: { fn: () => Xi(e) },
			table_firstPage: { fn: () => Zi(e) },
			table_lastPage: { fn: () => Qi(e) },
			table_getRowCount: { fn: () => ea(e) }
		});
	}
};
//#endregion
//#region ../../../../sites/munshi-ji/node_modules/.pnpm/@tanstack+table-core@9.3.1/node_modules/@tanstack/table-core/dist/features/row-selection/rowSelectionFeature.utils.js
function na() {
	return Hn();
}
function R(e, t) {
	e.options.onRowSelectionChange?.(t);
}
function ra(e, t) {
	e._lastSelectedRowId = null, R(e, t ? Hn() : Object.assign(Hn(), Bn(e.initialState.rowSelection ?? {})));
}
function ia(e, t, n) {
	e._lastSelectedRowId = null, R(e, (r) => {
		if (t = t === void 0 ? !ir(e, "getIsAllRowsSelected", da) : t, n?.deselectAll && !t) return Hn();
		let i = Object.assign(Hn(), r), a = e.getPreGroupedRowModel().flatRows;
		if (t) {
			let e = /* @__PURE__ */ new Map();
			a.forEach((t) => {
				Da(t, e) && (i[t.id] = !0);
			});
		} else a.forEach((e) => {
			xa(e) && delete i[e.id];
		});
		return i;
	});
}
function aa(e, t, n) {
	e._lastSelectedRowId = null, R(e, (r) => {
		let i = t === void 0 ? !ir(e, "getIsAllPageRowsSelected", fa) : t;
		if (n?.deselectAll && !i) return Hn();
		let a = Object.assign(Hn(), r);
		return e.getRowModel().rows.forEach((t) => {
			Ea(a, t.id, i, !0, e, !0);
		}), a;
	});
}
function oa(e) {
	return e.getCoreRowModel();
}
function sa(e) {
	let t = e.getCoreRowModel();
	return ir(e, "getIsSomeRowsSelected", pa) ? Aa(t, e) : {
		rows: [],
		flatRows: [],
		rowsById: Hn()
	};
}
function ca(e) {
	let t = e.getFilteredRowModel();
	return ir(e, "getIsSomeRowsSelected", pa) ? Aa(t, e) : {
		rows: [],
		flatRows: [],
		rowsById: Hn()
	};
}
function la(e) {
	let t = e.getSortedRowModel();
	return ir(e, "getIsSomeRowsSelected", pa) ? Aa(t, e) : {
		rows: [],
		flatRows: [],
		rowsById: Hn()
	};
}
function ua(e) {
	return Object.keys(e.atoms.rowSelection?.get() ?? {});
}
function da(e) {
	let t = e.getFilteredRowModel().flatRows, n = e.atoms.rowSelection?.get() ?? {}, r = !!(t.length && Object.keys(n).length);
	if (r) {
		let e = /* @__PURE__ */ new Map();
		t.some((t) => !ja(t, n) && Da(t, e)) && (r = !1);
	}
	return r;
}
function fa(e) {
	let t = e.getPaginatedRowModel().flatRows, n = e.atoms.rowSelection?.get() ?? {}, r = /* @__PURE__ */ new Map(), i = !1;
	for (let e = 0; e < t.length; e++) {
		let a = t[e];
		if (ja(a, n)) !i && Da(a, r) && (i = !0);
		else if (Da(a, r)) return !1;
	}
	return i;
}
function pa(e) {
	return ir(e, "getSelectedRowIds", ua).length > 0;
}
function ma(e) {
	return e.getPaginatedRowModel().flatRows.filter((e) => xa(e)).some((e) => va(e) || ir(e, "getIsSomeSelected", ya));
}
function ha(e) {
	return (t) => {
		ia(e, t.target.checked);
	};
}
function ga(e) {
	return (t) => {
		aa(e, t.target.checked);
	};
}
function _a(e, t, n) {
	let r = va(e);
	R(e.table, (i) => {
		t = t === void 0 ? !r : t;
		let a = Object.assign(Hn(), i);
		return Ea(a, e.id, t, (n?.selectChildren ?? !0) && Ca(e), e.table), !t && n?.deselectParents && Oa(a, e), a;
	});
}
function va(e) {
	return ja(e, e.table.atoms.rowSelection?.get() ?? {});
}
function ya(e) {
	return Ma(e) === "some";
}
function ba(e) {
	return Ma(e) === "all";
}
function xa(e) {
	let t = e.table.options;
	return typeof t.enableRowSelection == "function" ? t.enableRowSelection(e) : t.enableRowSelection ?? !0;
}
function Sa(e) {
	let t = e.table.options;
	return typeof t.enableSubRowSelection == "function" ? t.enableSubRowSelection(e) : t.enableSubRowSelection ?? !0;
}
function Ca(e) {
	let t = e.table.options;
	return typeof t.enableMultiRowSelection == "function" ? t.enableMultiRowSelection(e) : t.enableMultiRowSelection ?? !0;
}
function wa(e, t) {
	let n = xa(e);
	return (r) => {
		if (!n) return;
		let i = r, a = e.table, o = i.target.checked, s = a._lastSelectedRowId;
		(!(a.options.enableRowRangeSelection !== !1 && s !== null && Ca(e) && (a.options.isRowRangeSelectionEvent?.(r) ?? !1)) || !Ta(e, s, o, t)) && _a(e, o, t), a._lastSelectedRowId = e.id;
	};
}
function Ta(e, t, n, r) {
	let i = r?.selectChildren ?? !0, a = e.table, o = a.getRowsInDisplayOrder(), s = a.getPrePaginatedRowModel().rowsById[t] ?? a.getCoreRowModel().rowsById[t];
	if (!s) return !1;
	let c = s.getDisplayIndex(), l = e.getDisplayIndex(), u = o[c], d = o[l];
	if (c < 0 || l < 0 || c >= o.length || l >= o.length || u?.id !== s.id || d?.id !== e.id || !Ca(s) || !Ca(e)) return !1;
	let f = Math.min(c, l), p = Math.max(c, l);
	return R(a, (e) => {
		let t = Object.assign(Hn(), e);
		for (let e = f; e <= p; e++) {
			let s = o[e];
			!xa(s) || !Ca(s) || (Ea(t, s.id, n, i, a), !n && r?.deselectParents && Oa(t, s));
		}
		return t;
	}), !0;
}
function Ea(e, t, n, r, i, a) {
	let o = i.getRow(t, !0);
	n ? (Ca(o) || Object.keys(e).forEach((t) => delete e[t]), xa(o) && (e[t] = !0)) : (!a || xa(o)) && delete e[t], r && o.subRows.length && Sa(o) && o.subRows.forEach((t) => Ea(e, t.id, n, r, i, a));
}
function Da(e, t) {
	if (!xa(e)) return !1;
	let n = e.table;
	if (n.options.enableSubRowSelection === !0) return !0;
	let r = e.parentId;
	if (r === void 0) return !0;
	let i = t.get(r);
	if (i !== void 0) return i;
	let a = n.getCoreRowModel().rowsById, o = [], s = !0, c = r;
	for (; c !== void 0;) {
		let e = t.get(c);
		if (e !== void 0) {
			s = e;
			break;
		}
		o.push(c);
		let r = a[c] ?? n.getRow(c, !0);
		if (!Sa(r)) {
			s = !1;
			break;
		}
		c = r.parentId;
	}
	return o.forEach((e) => t.set(e, s)), s;
}
function Oa(e, t) {
	let n = t.table.getCoreRowModel().rowsById, r = t.parentId;
	for (; r !== void 0;) delete e[r], r = (n[r] ?? t.table.getRow(r, !0)).parentId;
}
function ka(e, t, n, r) {
	let i = [];
	for (let a = 0; a < e.length; a++) {
		let o = e[a], s = ja(o, t);
		if (s && (n.push(o), r[o.id] = o), o.subRows.length) {
			let e = ka(o.subRows, t, n, r);
			if (s) {
				let t = Object.create(Object.getPrototypeOf(o));
				Vn(t, o), t.subRows = e, i.push(t);
			}
		} else s && i.push(o);
	}
	return i;
}
function Aa(e, t) {
	let n = [], r = Hn(), i = t.atoms.rowSelection?.get() ?? {};
	return {
		rows: ka(e.rows, i, n, r),
		flatRows: n,
		rowsById: r
	};
}
function ja(e, t) {
	return !!(Un(t, e.id) && t[e.id]);
}
function Ma(e) {
	if (!e.subRows.length) return !1;
	let t = e.table.atoms.rowSelection?.get() ?? {}, n = !1, r = !0, i = !1;
	for (let a = 0; a < e.subRows.length; a++) {
		let o = e.subRows[a];
		if (n && !r) break;
		if (xa(o) && (i = !0, ja(o, t) ? n = !0 : r = !1), o.subRows.length) {
			let e = Ma(o);
			e === "all" ? (n = !0, i = !0) : e === "some" ? (n = !0, r = !1, i = !0) : r = !1;
		}
	}
	return i ? r ? "all" : n ? "some" : !1 : !1;
}
//#endregion
//#region ../../../../sites/munshi-ji/node_modules/.pnpm/@tanstack+table-core@9.3.1/node_modules/@tanstack/table-core/dist/features/row-selection/rowSelectionFeature.js
var Na = {
	initTableInstanceData: (e) => {
		e._lastSelectedRowId = null;
	},
	resetTableInstanceData: (e) => {
		e._lastSelectedRowId = null;
	},
	getInitialState: (e) => ({
		rowSelection: na(),
		...e
	}),
	getDefaultTableOptions: (e) => ({
		onRowSelectionChange: Wn("rowSelection", e),
		enableRowSelection: !0,
		enableMultiRowSelection: !0,
		enableRowRangeSelection: !0,
		enableSubRowSelection: !0,
		isRowRangeSelectionEvent: (e) => {
			let t = e;
			return !!(t.shiftKey || t.nativeEvent?.shiftKey);
		}
	}),
	assignRowPrototype: (e, t) => {
		rr("rowSelectionFeature", e, t, {
			row_toggleSelected: { fn: (e, t, n) => _a(e, t, n) },
			row_getIsSelected: { fn: (e) => va(e) },
			row_getIsSomeSelected: {
				fn: (e) => ya(e),
				memoDeps: (e) => [
					e.subRows,
					e.table.atoms.rowSelection?.get(),
					e.table.options.enableRowSelection
				]
			},
			row_getIsAllSubRowsSelected: {
				fn: (e) => ba(e),
				memoDeps: (e) => [
					e.subRows,
					e.table.atoms.rowSelection?.get(),
					e.table.options.enableRowSelection
				]
			},
			row_getCanSelect: { fn: (e) => xa(e) },
			row_getCanSelectSubRows: { fn: (e) => Sa(e) },
			row_getCanMultiSelect: { fn: (e) => Ca(e) },
			row_getToggleSelectedHandler: { fn: (e, t) => wa(e, t) }
		});
	},
	constructTableAPIs: (e) => {
		nr("rowSelectionFeature", e, {
			table_setRowSelection: { fn: (t) => R(e, t) },
			table_resetRowSelection: { fn: (t) => ra(e, t) },
			table_toggleAllRowsSelected: { fn: (t, n) => ia(e, t, n) },
			table_toggleAllPageRowsSelected: { fn: (t, n) => aa(e, t, n) },
			table_getPreSelectedRowModel: { fn: () => oa(e) },
			table_getSelectedRowModel: {
				fn: () => sa(e),
				memoDeps: () => [e.atoms.rowSelection?.get(), e.getCoreRowModel()]
			},
			table_getFilteredSelectedRowModel: {
				fn: () => ca(e),
				memoDeps: () => [e.atoms.rowSelection?.get(), e.getFilteredRowModel()]
			},
			table_getGroupedSelectedRowModel: {
				fn: () => la(e),
				memoDeps: () => [e.atoms.rowSelection?.get(), e.getSortedRowModel()]
			},
			table_getSelectedRowIds: {
				fn: () => ua(e),
				memoDeps: () => [e.atoms.rowSelection?.get()]
			},
			table_getIsAllRowsSelected: {
				fn: () => da(e),
				memoDeps: () => [
					e.atoms.rowSelection?.get(),
					e.getFilteredRowModel(),
					e.options.enableRowSelection,
					e.options.enableSubRowSelection
				]
			},
			table_getIsAllPageRowsSelected: {
				fn: () => fa(e),
				memoDeps: () => [
					e.atoms.rowSelection?.get(),
					e.getPaginatedRowModel(),
					e.options.enableRowSelection,
					e.options.enableSubRowSelection
				]
			},
			table_getIsSomeRowsSelected: {
				fn: () => pa(e),
				memoDeps: () => [e.atoms.rowSelection?.get()]
			},
			table_getIsSomePageRowsSelected: {
				fn: () => ma(e),
				memoDeps: () => [
					e.atoms.rowSelection?.get(),
					e.getPaginatedRowModel(),
					e.options.enableRowSelection
				]
			},
			table_getToggleAllRowsSelectedHandler: { fn: () => ha(e) },
			table_getToggleAllPageRowsSelectedHandler: { fn: () => ga(e) }
		});
	}
}, Pa = typeof window > "u" ? y.useEffect : y.useLayoutEffect;
function Fa(e, t) {
	let [{ table: n, rootSource: r }] = (0, y.useState)(() => {
		let t = Ii({
			...e,
			features: {
				coreReactivityFeature: Rn(),
				...e.features
			}
		});
		return t.Subscribe = ((e) => Pn({
			...e,
			source: e.source ?? t.store
		})), t.FlexRender = sn, {
			table: t,
			rootSource: Ln(t.store, En)
		};
	}), i = n;
	Mi(i, (t) => ({
		...t,
		...e
	}), { syncExternalState: !1 });
	let a = i.options.state, o = r.get(), s = Nn(r, t, { compare: En });
	return Pa(() => {
		r.markCommitted(o), ki(i, a ?? null, En);
	}), (0, y.useMemo)(() => ({
		...n,
		options: e,
		state: s
	}), [
		n,
		e,
		s
	]);
}
//#endregion
//#region app/workspace.tsx
var Ia = () => new Intl.DateTimeFormat("en-CA", {
	timeZone: "Asia/Kolkata",
	year: "numeric",
	month: "2-digit",
	day: "2-digit"
}).format(/* @__PURE__ */ new Date()), z = (e, t = "INR") => new Intl.NumberFormat(t === "INR" ? "en-IN" : "en-US", {
	style: "currency",
	currency: t,
	maximumFractionDigits: 2
}).format((e || 0) / 100), B = (e) => Number(e || 0).toLocaleString("en-IN"), La = (e) => e ? new Intl.DateTimeFormat("en-IN", {
	day: "2-digit",
	month: "short",
	year: "numeric",
	hour: "2-digit",
	minute: "2-digit",
	timeZone: "Asia/Kolkata"
}).format(/* @__PURE__ */ new Date(String(e).replace(" ", "T") + (String(e).includes("Z") ? "" : "Z"))) : "—", Ra = [
	{
		id: "invoices",
		label: "Invoice downloads",
		icon: It
	},
	{
		id: "analytics",
		label: "Overview",
		icon: Vt
	},
	{
		id: "gst",
		label: "GST analysis",
		icon: Xt
	},
	{
		id: "clients",
		label: "Clients & ledgers",
		icon: $t
	},
	{
		id: "jobs",
		label: "Sync & ZIPs",
		icon: Bt
	},
	{
		id: "history",
		label: "Download history",
		icon: qt
	},
	{
		id: "settings",
		label: "Settings",
		icon: Yt
	}
], za = [
	{
		id: 10241,
		number: "HS/26-27/10241",
		date: "2026-10-18",
		due_date: "2026-10-25",
		client_id: 18,
		client_name: "Aarav Technologies",
		total: 118e3,
		tax: 18e3,
		tax2: 0,
		balance: 0,
		status: "Paid",
		currency: "INR",
		gstin: "27AAPFU0939F1ZV",
		gst_status: "valid",
		basis: "snapshot",
		download_count: 0,
		source_hash: "v1",
		issues: "[]"
	},
	{
		id: 10240,
		number: "HS/26-27/10240",
		date: "2026-10-18",
		due_date: "2026-10-25",
		client_id: 21,
		client_name: "Bluebird Digital",
		total: 354e3,
		tax: 54e3,
		tax2: 0,
		balance: 0,
		status: "Paid",
		currency: "INR",
		gstin: "",
		gst_status: "missing",
		basis: "profile",
		download_count: 2,
		last_downloaded: "2026-10-19T09:40:00Z",
		downloaded_by: "Sample analyst",
		downloaded_hash: "v1",
		source_hash: "v1",
		issues: "[\"Historical recipient details need verification.\"]"
	},
	{
		id: 10239,
		number: "HS/26-27/10239",
		date: "2026-10-17",
		due_date: "2026-10-24",
		client_id: 32,
		client_name: "Pixel & Paper Studio",
		total: 59e3,
		tax: 9e3,
		tax2: 0,
		balance: 59e3,
		status: "Unpaid",
		currency: "INR",
		gstin: "27AAPFU0939F1ZA",
		gst_status: "invalid",
		basis: "profile",
		download_count: 1,
		last_downloaded: "2026-10-18T05:15:00Z",
		downloaded_by: "Sample analyst",
		downloaded_hash: "v1",
		source_hash: "v2",
		issues: "[\"Recipient GSTIN checksum failed.\"]"
	},
	{
		id: 10238,
		number: "HS/26-27/10238",
		date: "2026-10-16",
		due_date: "2026-10-23",
		client_id: 49,
		client_name: "Kaveri Enterprises",
		total: 236e3,
		tax: 36e3,
		tax2: 0,
		balance: 0,
		status: "Paid",
		currency: "INR",
		gstin: "27AAPFU0939F1ZV",
		gst_status: "valid",
		basis: "snapshot",
		download_count: 0,
		source_hash: "v1",
		issues: "[]"
	},
	{
		id: 10237,
		number: "HS/26-27/10237",
		date: "2026-10-15",
		due_date: "2026-10-22",
		client_id: 53,
		client_name: "Northstar Commerce",
		total: 11800,
		tax: 1800,
		tax2: 0,
		balance: 11800,
		status: "Unpaid",
		currency: "INR",
		gstin: "",
		gst_status: "missing",
		basis: "profile",
		download_count: 0,
		source_hash: "v1",
		issues: "[]"
	},
	{
		id: 10236,
		number: "HS/26-27/10236",
		date: "2026-10-14",
		due_date: "2026-10-21",
		client_id: 61,
		client_name: "Orbit Media",
		total: 177e3,
		tax: 27e3,
		tax2: 0,
		balance: 0,
		status: "Paid",
		currency: "INR",
		gstin: "27AAPFU0939F1ZV",
		gst_status: "valid",
		basis: "snapshot",
		download_count: 1,
		last_downloaded: "2026-10-16T11:30:00Z",
		downloaded_by: "Sample analyst",
		downloaded_hash: "v1",
		source_hash: "v1",
		issues: "[]"
	}
], Ba = Pi({
	rowPaginationFeature: ta,
	rowSelectionFeature: Na
}), Va = [
	{ accessorKey: "id" },
	{ accessorKey: "number" },
	{ accessorKey: "client_name" }
];
function Ha({ children: e, kind: t = "muted" }) {
	return /* @__PURE__ */ (0, b.jsxs)("span", {
		className: "badge " + t,
		children: [/* @__PURE__ */ (0, b.jsx)("i", {}), e]
	});
}
function Ua({ title: e, children: t, action: n }) {
	return /* @__PURE__ */ (0, b.jsxs)("div", {
		className: "empty",
		children: [
			/* @__PURE__ */ (0, b.jsx)("span", {
				className: "emptyIcon",
				children: /* @__PURE__ */ (0, b.jsx)(zt, { size: 26 })
			}),
			/* @__PURE__ */ (0, b.jsx)("h3", { children: e }),
			/* @__PURE__ */ (0, b.jsx)("p", { children: t }),
			n
		]
	});
}
function V({ children: e, onClick: t, primary: n = !1, disabled: r = !1, type: i = "button", ...a }) {
	return /* @__PURE__ */ (0, b.jsx)("button", {
		type: i,
		disabled: r,
		className: "button " + (n ? "primary" : ""),
		onClick: t,
		...a,
		children: e
	});
}
function Wa({ i: e }) {
	return e.download_count ? /* @__PURE__ */ (0, b.jsxs)("div", { children: [
		/* @__PURE__ */ (0, b.jsx)(Ha, {
			kind: e.downloaded_hash === e.source_hash ? "success" : "pending",
			children: e.downloaded_hash === e.source_hash ? "Downloaded" : "Updated since download"
		}),
		/* @__PURE__ */ (0, b.jsx)("small", { children: La(e.last_downloaded) }),
		/* @__PURE__ */ (0, b.jsxs)("small", { children: [
			e.downloaded_by,
			" · ",
			B(e.download_count),
			"×"
		] })
	] }) : /* @__PURE__ */ (0, b.jsxs)("div", { children: [/* @__PURE__ */ (0, b.jsx)(Ha, {
		kind: "pending",
		children: "Not touched"
	}), /* @__PURE__ */ (0, b.jsx)("small", { children: "Awaiting first download" })] });
}
function Ga() {
	return /* @__PURE__ */ (0, b.jsx)(te, {
		client: dt,
		children: /* @__PURE__ */ (0, b.jsx)(Ka, {})
	});
}
function Ka() {
	let [e, t] = (0, y.useState)(null), [n, r] = (0, y.useState)("invoices"), [i, a] = (0, y.useState)({
		from: Ia().slice(0, 7) + "-01",
		to: Ia(),
		basis: "date",
		download: "",
		search: "",
		status: "",
		gst: "",
		currency: ""
	}), [o, s] = (0, y.useState)(null), [c, l] = (0, y.useState)([]), [u, d] = (0, y.useState)({
		total: 0,
		pending: 0,
		downloaded: 0,
		updated: 0
	}), [f, p] = (0, y.useState)(1), [m, h] = (0, y.useState)(1), [g, _] = (0, y.useState)(0), [v, x] = (0, y.useState)(/* @__PURE__ */ new Set()), [ee, te] = (0, y.useState)(!1), [S, ne] = (0, y.useState)(""), [re, ie] = (0, y.useState)(""), [C, ae] = (0, y.useState)(!1), [oe, se] = (0, y.useState)(!1), [w, ce] = (0, y.useState)(!1), [T, E] = (0, y.useState)(null), [D, O] = (0, y.useState)(null), [k, le] = (0, y.useState)({}), [ue, de] = (0, y.useState)(""), [A, j] = (0, y.useState)(!1), [fe, pe] = (0, y.useState)(null), [me, he] = (0, y.useState)("amoled"), [M, ge] = (0, y.useState)(null), [_e, ve] = (0, y.useState)("statement"), [ye, be] = (0, y.useState)(""), xe = lt({
		queryKey: ["bootstrap"],
		queryFn: () => P("bootstrap"),
		retry: !1
	}), Se = Fa({
		features: Ba,
		data: c,
		columns: Va,
		getRowId: (e) => String(e.id),
		manualPagination: !0,
		pageCount: m,
		state: {
			pagination: {
				pageIndex: f - 1,
				pageSize: 25
			},
			rowSelection: Object.fromEntries([...v].map((e) => [String(e), !0]))
		}
	}), Ce = (0, y.useRef)(!1), we = (0, y.useRef)(n), Te = (0, y.useRef)(i), Ee = (0, y.useRef)(C), De = (0, y.useRef)(0);
	we.current = n, Te.current = i, Ee.current = C, (0, y.useEffect)(() => {
		xe.data && t(xe.data), xe.error && ne(xe.error.message);
	}, [xe.data, xe.error]), (0, y.useEffect)(() => {
		let e = localStorage.getItem("munshi-theme") || "amoled";
		he(e);
		let t = window.matchMedia("(prefers-color-scheme: dark)"), n = () => document.documentElement.dataset.theme = e === "system" ? t.matches ? "dark" : "light" : e;
		return n(), t.addEventListener("change", n), () => t.removeEventListener("change", n);
	}, [me]), (0, y.useEffect)(() => {
		if (re) {
			let e = setTimeout(() => ie(""), 6e3);
			return () => clearTimeout(e);
		}
	}, [re]), (0, y.useEffect)(() => {
		e && Me();
	}, [
		e?.user?.userId,
		n,
		f,
		i,
		C
	]), (0, y.useEffect)(() => {
		let t = () => {
			e?.user && we.current === "invoices" && !T && Me();
		};
		return window.addEventListener("focus", t), () => window.removeEventListener("focus", t);
	}, [e, T]), (0, y.useEffect)(() => {
		if (!T) return;
		let e = document.activeElement, t = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		let n = () => Array.from(document.querySelectorAll(".modal button:not(:disabled),.modal a[href],.modal input:not(:disabled),.modal select:not(:disabled),.modal textarea")).filter((e) => e.getClientRects().length), r = setTimeout(() => n()[0]?.focus(), 0), i = (e) => {
			if (e.key === "Escape" && E(null), e.key === "Tab") {
				let t = n(), r = t[0], i = t.at(-1);
				e.shiftKey && document.activeElement === r ? (e.preventDefault(), i?.focus()) : !e.shiftKey && document.activeElement === i && (e.preventDefault(), r?.focus());
			}
		};
		return document.addEventListener("keydown", i), () => {
			clearTimeout(r), document.body.style.overflow = t, document.removeEventListener("keydown", i), e?.focus();
		};
	}, [T]);
	function Oe(e) {
		r(e), p(1), x(/* @__PURE__ */ new Set()), se(!1), ne(""), ge(null);
	}
	function ke(e) {
		a((t) => ({
			...t,
			...e
		})), p(1), x(/* @__PURE__ */ new Set());
	}
	function Ae(e) {
		ne(e.message || String(e));
	}
	function je() {
		return C ? (ie("Sample workspace · connect your own WHMCS to download original invoices."), !1) : e?.user ? !0 : (E("auth"), !1);
	}
	async function Me() {
		let t = ++De.current;
		te(!0), ne("");
		try {
			if (C) {
				let e = za.filter((e) => e.date >= i.from && e.date <= i.to && (!i.status || e.status === i.status) && (!i.currency || e.currency === i.currency) && (!i.gst || e.gst_status === i.gst) && (!i.search || `${e.number} ${e.client_name} ${e.gstin}`.toLowerCase().includes(i.search.toLowerCase())));
				d({
					total: e.length,
					pending: e.filter((e) => !e.download_count).length,
					downloaded: e.filter((e) => e.download_count).length,
					updated: e.filter((e) => e.download_count && e.source_hash !== e.downloaded_hash).length
				});
				let t = e.filter((e) => !i.download || (i.download === "pending" ? !e.download_count : i.download === "downloaded" ? e.download_count : i.download === "updated" ? e.download_count && e.source_hash !== e.downloaded_hash : !e.download_count || e.source_hash !== e.downloaded_hash));
				l(t), _(t.length), h(1), n === "analytics" || n === "gst" ? s(Ja(e)) : n === "clients" ? s({ rows: za.map((e) => ({
					id: e.client_id,
					name: e.client_name,
					email: "sample@example.test",
					currency: e.currency,
					wallet: 0,
					due: e.balance,
					invoices: 1
				})) }) : n === "history" ? s({
					rows: za.filter((e) => e.download_count).map((e) => ({
						id: String(e.id),
						user_name: e.downloaded_by,
						format: "pdf",
						invoice_count: 1,
						status: "served",
						created_at: e.last_downloaded,
						completed_at: e.last_downloaded
					})),
					page: 1,
					total: 3
				}) : n === "jobs" && s({ rows: [] });
				return;
			}
			if (!e?.user) {
				l([]), s(null);
				return;
			}
			let r;
			if (n === "invoices" || n === "gst") {
				if (r = await P("invoices", null, {
					...i,
					page: f,
					...n === "gst" ? { review: "1" } : {}
				}), t !== De.current) return;
				l(r.rows), d(r.summary), _(r.total), h(r.pages), n === "gst" && s(await P("analytics", null, i));
			} else if (n === "analytics") s(await P("analytics", null, i));
			else if (n === "history") s(await P("history", null, { page: f }));
			else if (n === "clients") s(await P("clients", null, { search: ye }));
			else if (n === "jobs") {
				let e = await P("jobs");
				s(e);
				let t = e.rows.find((e) => ["queued", "running"].includes(e.state));
				t && !Ce.current && Ne(t.id);
			} else n === "settings" ? e.user.admin && le(await P("connection")) : n === "diagnostics" ? s(await P("diagnostics")) : n === "team" ? s(await P("users")) : n === "audit" && s(await P("audit"));
		} catch (e) {
			t === De.current && Ae(e);
		} finally {
			t === De.current && te(!1);
		}
	}
	async function Ne(e) {
		if (!Ce.current) {
			Ce.current = !0, pe(e);
			try {
				let t;
				do {
					if (t = await P("job_tick", { id: e }), we.current === "jobs" && s(await P("jobs")), !["queued", "running"].includes(t.state)) break;
					await new Promise((e) => setTimeout(e, 700));
				} while (Ce.current);
				ie(t.state === "complete" ? "Job complete." : t.message || "Review this job."), [
					"invoices",
					"analytics",
					"gst"
				].includes(we.current) && Me();
			} catch (e) {
				Ae(e);
			} finally {
				Ce.current = !1, pe(null);
			}
		}
	}
	async function Pe(e, t) {
		if (je()) {
			j(!0);
			try {
				let n = await P("job_create", {
					type: e,
					params: t
				});
				E(null), Oe("jobs"), Ne(n.id);
			} catch (e) {
				Ae(e);
			} finally {
				j(!1);
			}
		}
	}
	async function Fe(e) {
		if (C) {
			let t = za.find((t) => t.id === e);
			O({
				...t,
				subtotal: t.total - t.tax,
				credit: 0,
				payload: { invoice: { items: { item: [{
					description: "Managed hosting service",
					amount: ((t.total - t.tax) / 100).toFixed(2),
					taxed: 1
				}] } } },
				issues: JSON.parse(t.issues),
				downloads: [],
				transactions: []
			}), E("invoice");
			return;
		}
		j(!0);
		try {
			O(await P("invoice", null, { id: e })), E("invoice");
		} catch (e) {
			Ae(e);
		} finally {
			j(!1);
		}
	}
	async function Ie(e) {
		if (C) {
			ie("Full client ledgers become available after connecting WHMCS and running a client sync.");
			return;
		}
		j(!0);
		try {
			ge(await P("ledger", null, {
				...i,
				id: e
			})), ve("statement");
		} catch (e) {
			Ae(e);
		} finally {
			j(!1);
		}
	}
	async function Le(e, n = !1) {
		if (e.preventDefault(), je()) {
			j(!0), de(""), ne("");
			try {
				let r = new FormData(e.currentTarget), i = Object.fromEntries(r);
				de((await P(n ? "connection_test" : "connection_save", i)).message), n || (t(await P("bootstrap")), ie("WHMCS connection saved."));
			} catch (e) {
				de(""), Ae(e);
			} finally {
				j(!1);
			}
		}
	}
	function Re(e, t = {}, n, r = !1) {
		return /* @__PURE__ */ (0, b.jsx)("a", {
			target: e === "copy" ? "_blank" : void 0,
			rel: e === "copy" ? "noopener" : void 0,
			className: "button " + (r ? "primary" : ""),
			href: C ? "#" : mt(e, t),
			onClick: (e) => {
				C ? (e.preventDefault(), je()) : setTimeout(() => {
					we.current === "invoices" && Me();
				}, 2e3);
			},
			children: n || /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [/* @__PURE__ */ (0, b.jsx)(It, { size: 15 }), "Download"] })
		});
	}
	function ze(e) {
		x((t) => {
			let n = new Set(t);
			return n.has(e) ? n.delete(e) : n.add(e), n;
		});
	}
	let Be = u.total ? Math.round(u.downloaded / u.total * 100) : 0, Ve = /* @__PURE__ */ (0, b.jsxs)("div", {
		className: "dateRange",
		children: [
			/* @__PURE__ */ (0, b.jsx)("span", {
				className: "dateLabel",
				children: "INVOICE DATES"
			}),
			/* @__PURE__ */ (0, b.jsx)("input", {
				"aria-label": "From date",
				type: "date",
				value: i.from,
				onChange: (e) => ke({ from: e.target.value })
			}),
			/* @__PURE__ */ (0, b.jsx)("span", {
				className: "muted",
				children: "→"
			}),
			/* @__PURE__ */ (0, b.jsx)("input", {
				"aria-label": "To date",
				type: "date",
				value: i.to,
				onChange: (e) => ke({ to: e.target.value })
			}),
			/* @__PURE__ */ (0, b.jsx)(At, { size: 13 })
		]
	}), He = /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [/* @__PURE__ */ (0, b.jsxs)("div", {
		className: "filterBar",
		children: [/* @__PURE__ */ (0, b.jsx)("div", {
			className: "filterTabs",
			children: [
				["", "All invoices"],
				["needs_download", "To download"],
				["downloaded", "Downloaded"],
				["updated", "Updated"]
			].map(([e, t]) => /* @__PURE__ */ (0, b.jsxs)("button", {
				className: i.download === e ? "selected" : "",
				onClick: () => ke({ download: e }),
				children: [t, e === "" && /* @__PURE__ */ (0, b.jsx)("span", { children: B(u.total) })]
			}, e))
		}), /* @__PURE__ */ (0, b.jsxs)("div", {
			className: "filterTools",
			children: [/* @__PURE__ */ (0, b.jsxs)("div", {
				className: "search",
				children: [/* @__PURE__ */ (0, b.jsx)(Jt, { size: 15 }), /* @__PURE__ */ (0, b.jsx)("input", {
					"aria-label": "Search invoices",
					placeholder: "Search invoices or clients…",
					value: i.search,
					onChange: (e) => ke({ search: e.target.value })
				})]
			}), /* @__PURE__ */ (0, b.jsxs)(V, {
				onClick: () => ce(!w),
				"aria-label": "More filters",
				children: [/* @__PURE__ */ (0, b.jsx)(Zt, { size: 15 }), /* @__PURE__ */ (0, b.jsx)("span", {
					className: "hideSmall",
					children: "Filters"
				})]
			})]
		})]
	}), w && /* @__PURE__ */ (0, b.jsxs)("div", {
		className: "advanced",
		children: [
			/* @__PURE__ */ (0, b.jsxs)("label", { children: ["PDF download", /* @__PURE__ */ (0, b.jsx)("select", {
				value: i.download,
				onChange: (e) => ke({ download: e.target.value }),
				children: [
					["", "All invoices"],
					["pending", "Not touched"],
					["downloaded", "Downloaded"],
					["updated", "Updated since download"],
					["needs_download", "Pending + updated"]
				].map(([e, t]) => /* @__PURE__ */ (0, b.jsx)("option", {
					value: e,
					children: t
				}, e))
			})] }),
			/* @__PURE__ */ (0, b.jsxs)("label", { children: ["Payment status", /* @__PURE__ */ (0, b.jsxs)("select", {
				value: i.status,
				onChange: (e) => ke({ status: e.target.value }),
				children: [/* @__PURE__ */ (0, b.jsx)("option", {
					value: "",
					children: "All"
				}), [
					"Paid",
					"Unpaid",
					"Cancelled",
					"Refunded",
					"Draft",
					"Payment Pending",
					"Collections"
				].map((e) => /* @__PURE__ */ (0, b.jsx)("option", { children: e }, e))]
			})] }),
			/* @__PURE__ */ (0, b.jsxs)("label", { children: ["Recipient GSTIN", /* @__PURE__ */ (0, b.jsxs)("select", {
				value: i.gst,
				onChange: (e) => ke({ gst: e.target.value }),
				children: [/* @__PURE__ */ (0, b.jsx)("option", {
					value: "",
					children: "All"
				}), [
					"valid",
					"missing",
					"invalid",
					"conflict"
				].map((e) => /* @__PURE__ */ (0, b.jsx)("option", { children: e }, e))]
			})] }),
			/* @__PURE__ */ (0, b.jsxs)("label", { children: ["Date basis", /* @__PURE__ */ (0, b.jsxs)("select", {
				value: i.basis,
				onChange: (e) => ke({ basis: e.target.value }),
				children: [
					/* @__PURE__ */ (0, b.jsx)("option", {
						value: "date",
						children: "Issue date"
					}),
					/* @__PURE__ */ (0, b.jsx)("option", {
						value: "paid",
						children: "Paid date"
					}),
					/* @__PURE__ */ (0, b.jsx)("option", {
						value: "due",
						children: "Due date"
					})
				]
			})] }),
			/* @__PURE__ */ (0, b.jsxs)("label", { children: ["Currency", /* @__PURE__ */ (0, b.jsxs)("select", {
				value: i.currency,
				onChange: (e) => ke({ currency: e.target.value }),
				children: [/* @__PURE__ */ (0, b.jsx)("option", {
					value: "",
					children: "All currencies"
				}), (e?.currencies?.length ? e.currencies : [{ code: "INR" }, { code: "USD" }]).map((e) => /* @__PURE__ */ (0, b.jsx)("option", { children: e.code }, e.code))]
			})] }),
			/* @__PURE__ */ (0, b.jsx)(V, {
				onClick: () => ke({
					download: "",
					status: "",
					gst: "",
					search: "",
					currency: "",
					basis: "date"
				}),
				children: "Reset filters"
			})
		]
	})] }), Ue = /* @__PURE__ */ (0, b.jsxs)("div", {
		className: "stats",
		children: [
			/* @__PURE__ */ (0, b.jsxs)("button", {
				className: "stat " + (i.download ? "" : "chosen"),
				onClick: () => ke({ download: "" }),
				children: [
					/* @__PURE__ */ (0, b.jsxs)("div", {
						className: "statLabel",
						children: ["Invoices in range", /* @__PURE__ */ (0, b.jsx)(Lt, { size: 17 })]
					}),
					/* @__PURE__ */ (0, b.jsx)("strong", { children: B(u.total) }),
					/* @__PURE__ */ (0, b.jsx)("div", {
						className: "statNote",
						children: "Your shared invoice register"
					})
				]
			}),
			/* @__PURE__ */ (0, b.jsxs)("button", {
				className: "stat " + (i.download === "pending" ? "chosen" : ""),
				onClick: () => ke({ download: "pending" }),
				children: [
					/* @__PURE__ */ (0, b.jsxs)("div", {
						className: "statLabel",
						children: ["Not touched", /* @__PURE__ */ (0, b.jsx)(Ft, { size: 17 })]
					}),
					/* @__PURE__ */ (0, b.jsx)("strong", {
						className: "goldText",
						children: B(u.pending)
					}),
					/* @__PURE__ */ (0, b.jsxs)("div", {
						className: "statNote",
						children: [/* @__PURE__ */ (0, b.jsx)("i", { className: "dot gold" }), "Awaiting first PDF download"]
					})
				]
			}),
			/* @__PURE__ */ (0, b.jsxs)("button", {
				className: "stat " + (i.download === "downloaded" ? "chosen" : ""),
				onClick: () => ke({ download: "downloaded" }),
				children: [
					/* @__PURE__ */ (0, b.jsxs)("div", {
						className: "statLabel",
						children: ["Downloaded", /* @__PURE__ */ (0, b.jsx)(Pt, { size: 17 })]
					}),
					/* @__PURE__ */ (0, b.jsx)("strong", { children: B(u.downloaded) }),
					/* @__PURE__ */ (0, b.jsxs)("div", {
						className: "statNote",
						children: [
							/* @__PURE__ */ (0, b.jsx)("i", { className: "dot green" }),
							Be,
							"% of invoices in this range"
						]
					})
				]
			}),
			/* @__PURE__ */ (0, b.jsxs)("button", {
				className: "stat " + (i.download === "updated" ? "chosen" : ""),
				onClick: () => ke({ download: "updated" }),
				children: [
					/* @__PURE__ */ (0, b.jsxs)("div", {
						className: "statLabel",
						children: ["Updated since download", /* @__PURE__ */ (0, b.jsx)(Kt, { size: 17 })]
					}),
					/* @__PURE__ */ (0, b.jsx)("strong", { children: B(u.updated) }),
					/* @__PURE__ */ (0, b.jsx)("div", {
						className: "statNote",
						children: "A newer invoice version is available"
					})
				]
			})
		]
	});
	function We() {
		return /* @__PURE__ */ (0, b.jsxs)("section", {
			className: "panel invoicePanel",
			children: [
				He,
				v.size > 0 && /* @__PURE__ */ (0, b.jsxs)("div", {
					className: "selectionBar",
					children: [/* @__PURE__ */ (0, b.jsxs)("span", { children: [
						/* @__PURE__ */ (0, b.jsx)(kt, { size: 15 }),
						v.size,
						" selected"
					] }), /* @__PURE__ */ (0, b.jsxs)("div", { children: [/* @__PURE__ */ (0, b.jsx)("button", {
						onClick: () => x(/* @__PURE__ */ new Set()),
						children: "Clear"
					}), /* @__PURE__ */ (0, b.jsxs)(V, {
						primary: !0,
						onClick: () => E("bulk"),
						children: [/* @__PURE__ */ (0, b.jsx)(Rt, { size: 15 }), "Download selected"]
					})] })]
				}),
				/* @__PURE__ */ (0, b.jsx)("div", {
					className: "mobileInvoices",
					children: Se.getRowModel().rows.map((e) => {
						let t = e.original;
						return /* @__PURE__ */ (0, b.jsxs)("article", {
							className: "invoiceCard",
							children: [
								/* @__PURE__ */ (0, b.jsxs)("div", {
									className: "invoiceCardTop",
									children: [
										/* @__PURE__ */ (0, b.jsx)("label", { children: /* @__PURE__ */ (0, b.jsx)("input", {
											type: "checkbox",
											"aria-label": "Select " + t.number + " on mobile",
											checked: v.has(t.id),
											onChange: () => ze(t.id)
										}) }),
										/* @__PURE__ */ (0, b.jsx)("button", {
											className: "textLink",
											onClick: () => Fe(t.id),
											children: t.number
										}),
										/* @__PURE__ */ (0, b.jsx)("strong", { children: z(t.total, t.currency) })
									]
								}),
								/* @__PURE__ */ (0, b.jsxs)("p", { children: [t.client_name, /* @__PURE__ */ (0, b.jsx)("span", { children: t.date })] }),
								/* @__PURE__ */ (0, b.jsxs)("div", {
									className: "invoiceCardBottom",
									children: [/* @__PURE__ */ (0, b.jsxs)("div", { children: [/* @__PURE__ */ (0, b.jsx)(Wa, { i: t }), /* @__PURE__ */ (0, b.jsx)("small", { children: /* @__PURE__ */ (0, b.jsx)(Ha, {
										kind: t.gst_status === "valid" ? "success" : t.gst_status === "missing" ? "muted" : "danger",
										children: t.gst_status === "valid" ? "GSTIN format valid" : t.gst_status === "missing" ? "No recipient GSTIN" : "GSTIN needs review"
									}) })] }), /* @__PURE__ */ (0, b.jsxs)("div", {
										className: "mobileCardActions",
										children: [/* @__PURE__ */ (0, b.jsx)("button", {
											className: "button",
											onClick: () => Fe(t.id),
											children: "View"
										}), Re("pdf", { id: t.id }, /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [/* @__PURE__ */ (0, b.jsx)(It, { size: 14 }), "PDF"] }), !0)]
									})]
								})
							]
						}, t.id);
					})
				}),
				/* @__PURE__ */ (0, b.jsx)("div", {
					className: "tableScroll desktopInvoiceTable",
					children: /* @__PURE__ */ (0, b.jsxs)("table", { children: [/* @__PURE__ */ (0, b.jsx)("thead", { children: /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, b.jsx)("th", {
							className: "checkCol",
							children: /* @__PURE__ */ (0, b.jsx)("input", {
								type: "checkbox",
								"aria-label": "Select invoices on this page",
								checked: !!c.length && c.every((e) => v.has(e.id)),
								onChange: (e) => x((t) => {
									let n = new Set(t);
									for (let t of c) e.target.checked ? n.add(t.id) : n.delete(t.id);
									return n;
								})
							})
						}),
						/* @__PURE__ */ (0, b.jsxs)("th", { children: ["INVOICE ", /* @__PURE__ */ (0, b.jsx)(At, { size: 11 })] }),
						/* @__PURE__ */ (0, b.jsx)("th", { children: "CLIENT" }),
						/* @__PURE__ */ (0, b.jsx)("th", {
							className: "right",
							children: "AMOUNT"
						}),
						/* @__PURE__ */ (0, b.jsx)("th", { children: "GSTIN CHECK" }),
						/* @__PURE__ */ (0, b.jsx)("th", { children: "DOWNLOAD STATUS" }),
						/* @__PURE__ */ (0, b.jsx)("th", {
							className: "right",
							children: "ACTION"
						})
					] }) }), /* @__PURE__ */ (0, b.jsx)("tbody", { children: Se.getRowModel().rows.map((e) => {
						let t = e.original;
						return /* @__PURE__ */ (0, b.jsxs)("tr", {
							className: v.has(t.id) ? "selectedRow" : "",
							children: [
								/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)("input", {
									type: "checkbox",
									"aria-label": "Select " + t.number,
									checked: v.has(t.id),
									onChange: () => ze(t.id)
								}) }),
								/* @__PURE__ */ (0, b.jsxs)("td", { children: [/* @__PURE__ */ (0, b.jsx)("button", {
									className: "textLink invoiceNumber",
									onClick: () => Fe(t.id),
									children: t.number
								}), /* @__PURE__ */ (0, b.jsxs)("small", { children: [
									new Intl.DateTimeFormat("en-IN", {
										day: "2-digit",
										month: "short",
										year: "numeric"
									}).format(new Date(t.date)),
									" ",
									/* @__PURE__ */ (0, b.jsx)("span", {
										className: "cellDot",
										children: "·"
									}),
									" #",
									t.id
								] })] }),
								/* @__PURE__ */ (0, b.jsxs)("td", { children: [/* @__PURE__ */ (0, b.jsx)("strong", {
									className: "clientName",
									children: t.client_name
								}), /* @__PURE__ */ (0, b.jsx)("small", { children: /* @__PURE__ */ (0, b.jsx)(Ha, {
									kind: t.status === "Paid" ? "success" : "muted",
									children: t.status
								}) })] }),
								/* @__PURE__ */ (0, b.jsxs)("td", {
									className: "right mono",
									children: [/* @__PURE__ */ (0, b.jsx)("strong", { children: z(t.total, t.currency) }), /* @__PURE__ */ (0, b.jsxs)("small", { children: ["Tax ", z(t.tax + t.tax2, t.currency)] })]
								}),
								/* @__PURE__ */ (0, b.jsxs)("td", { children: [/* @__PURE__ */ (0, b.jsx)(Ha, {
									kind: t.gst_status === "valid" ? "success" : t.gst_status === "missing" ? "muted" : "danger",
									children: t.gst_status === "valid" ? "Valid format" : t.gst_status === "missing" ? "Not found" : "Needs review"
								}), /* @__PURE__ */ (0, b.jsx)("small", {
									className: "tiny mono",
									children: t.gstin || "No recipient GSTIN"
								})] }),
								/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(Wa, { i: t }) }),
								/* @__PURE__ */ (0, b.jsx)("td", {
									className: "right",
									children: /* @__PURE__ */ (0, b.jsxs)("div", {
										className: "rowActions",
										children: [/* @__PURE__ */ (0, b.jsx)("button", {
											className: "iconButton",
											title: "View invoice",
											"aria-label": "View invoice " + t.number,
											onClick: () => Fe(t.id),
											children: /* @__PURE__ */ (0, b.jsx)(Lt, { size: 16 })
										}), Re("pdf", { id: t.id }, /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [/* @__PURE__ */ (0, b.jsx)(It, { size: 14 }), /* @__PURE__ */ (0, b.jsx)("span", { children: "PDF" })] }))]
									})
								})
							]
						}, t.id);
					}) })] })
				}),
				!c.length && !ee && /* @__PURE__ */ (0, b.jsx)(Ua, {
					title: e?.configured ? "No invoices match this view" : "Your invoice register starts here.",
					action: /* @__PURE__ */ (0, b.jsxs)("div", {
						className: "emptyActions",
						children: [/* @__PURE__ */ (0, b.jsx)(V, {
							primary: !0,
							onClick: () => e?.configured ? E("sync") : Oe("settings"),
							children: e?.configured ? /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [/* @__PURE__ */ (0, b.jsx)(Kt, { size: 15 }), "Sync invoices"] }) : /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [/* @__PURE__ */ (0, b.jsx)(Gt, { size: 15 }), "Connect WHMCS"] })
						}), !e?.configured && /* @__PURE__ */ (0, b.jsxs)(V, {
							onClick: () => {
								ae(!0), ke({
									from: "2026-10-01",
									to: "2026-10-31"
								});
							},
							children: ["Explore sample workspace", /* @__PURE__ */ (0, b.jsx)(Dt, { size: 14 })]
						})]
					}),
					children: e?.configured ? "Try a different date range or sync invoices from WHMCS." : "Connect your WHMCS, sync a date range, and see exactly what still needs to be downloaded."
				}),
				/* @__PURE__ */ (0, b.jsxs)("footer", {
					className: "tableFooter",
					children: [/* @__PURE__ */ (0, b.jsxs)("span", { children: [
						ee ? "Updating…" : `${B(g)} invoices`,
						" ",
						/* @__PURE__ */ (0, b.jsx)("span", { children: "·" }),
						" ",
						C ? "Sample data" : "Cached WHMCS data"
					] }), /* @__PURE__ */ (0, b.jsxs)("div", { children: [
						/* @__PURE__ */ (0, b.jsxs)("span", { children: [
							"Page ",
							f,
							" of ",
							m
						] }),
						/* @__PURE__ */ (0, b.jsx)("button", {
							"aria-label": "Previous page",
							disabled: f <= 1,
							onClick: () => p(f - 1),
							children: /* @__PURE__ */ (0, b.jsx)(jt, { size: 16 })
						}),
						/* @__PURE__ */ (0, b.jsx)("button", {
							"aria-label": "Next page",
							disabled: f >= m,
							onClick: () => p(f + 1),
							children: /* @__PURE__ */ (0, b.jsx)(Mt, { size: 16 })
						})
					] })]
				})
			]
		});
	}
	function Ge(e) {
		return /* @__PURE__ */ (0, b.jsx)("div", {
			className: "tableScroll",
			children: /* @__PURE__ */ (0, b.jsxs)("table", { children: [/* @__PURE__ */ (0, b.jsx)("thead", { children: /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, b.jsx)("th", { children: "WHEN" }),
				/* @__PURE__ */ (0, b.jsx)("th", { children: "DOWNLOADED BY" }),
				/* @__PURE__ */ (0, b.jsx)("th", { children: "FORMAT" }),
				/* @__PURE__ */ (0, b.jsx)("th", { children: "INVOICES" }),
				/* @__PURE__ */ (0, b.jsx)("th", { children: "RESULT" })
			] }) }), /* @__PURE__ */ (0, b.jsx)("tbody", { children: e.map((e) => /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, b.jsx)("td", { children: La(e.completed_at || e.created_at) }),
				/* @__PURE__ */ (0, b.jsx)("td", { children: e.user_name }),
				/* @__PURE__ */ (0, b.jsxs)("td", { children: [/* @__PURE__ */ (0, b.jsx)("span", {
					className: "mono",
					children: e.format.toUpperCase()
				}), e.archive_id && /* @__PURE__ */ (0, b.jsxs)("small", { children: ["ZIP · ", e.archive_id.slice(0, 8)] })] }),
				/* @__PURE__ */ (0, b.jsx)("td", { children: e.invoice_count }),
				/* @__PURE__ */ (0, b.jsxs)("td", { children: [/* @__PURE__ */ (0, b.jsx)(Ha, {
					kind: e.status === "served" ? "success" : e.status === "failed" ? "danger" : "pending",
					children: e.status === "served" ? "Served" : e.status === "failed" ? "Interrupted" : "In progress"
				}), e.error && /* @__PURE__ */ (0, b.jsx)("small", { children: e.error })] })
			] }, e.id)) })] })
		});
	}
	function Ke() {
		return /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [/* @__PURE__ */ (0, b.jsxs)("div", {
			className: "settingsGrid",
			children: [/* @__PURE__ */ (0, b.jsxs)("section", {
				className: "panel padded",
				children: [/* @__PURE__ */ (0, b.jsxs)("div", {
					className: "sectionHeading",
					children: [/* @__PURE__ */ (0, b.jsx)("div", {
						className: "sectionIcon",
						children: /* @__PURE__ */ (0, b.jsx)(Yt, { size: 19 })
					}), /* @__PURE__ */ (0, b.jsxs)("div", { children: [/* @__PURE__ */ (0, b.jsx)("h2", { children: "Connect your WHMCS" }), /* @__PURE__ */ (0, b.jsx)("p", { children: "One WHMCS instance per workspace." })] })]
				}), e?.user ? e.user.admin ? /* @__PURE__ */ (0, b.jsxs)("form", {
					onSubmit: Le,
					className: "formGrid",
					children: [
						/* @__PURE__ */ (0, b.jsxs)("label", {
							className: "full",
							children: ["Instance name", /* @__PURE__ */ (0, b.jsx)("input", {
								name: "instance",
								required: !0,
								defaultValue: k.instance || "manage.hostingspell.com",
								placeholder: "manage.hostingspell.com"
							})]
						}),
						N && /* @__PURE__ */ (0, b.jsxs)("label", {
							className: "full",
							children: ["Connection mode", /* @__PURE__ */ (0, b.jsxs)("select", {
								name: "mode",
								defaultValue: k.mode || "api",
								onChange: (e) => le((t) => ({
									...t,
									mode: e.target.value
								})),
								children: [/* @__PURE__ */ (0, b.jsx)("option", {
									value: "api",
									children: "WHMCS API"
								}), /* @__PURE__ */ (0, b.jsx)("option", {
									value: "db",
									children: "Direct database · SELECT only"
								})]
							})]
						}),
						(!N || k.mode !== "db") && /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [
							/* @__PURE__ */ (0, b.jsxs)("label", {
								className: "full",
								children: ["WHMCS API endpoint", /* @__PURE__ */ (0, b.jsx)("input", {
									name: "api_url",
									type: "url",
									required: !0,
									defaultValue: k.api_url || "",
									placeholder: "https://billing.example.com/includes/api.php"
								})]
							}),
							/* @__PURE__ */ (0, b.jsxs)("label", { children: ["API identifier", /* @__PURE__ */ (0, b.jsx)("input", {
								name: "identifier",
								required: !0,
								defaultValue: k.identifier || "",
								autoComplete: "off"
							})] }),
							/* @__PURE__ */ (0, b.jsxs)("label", { children: ["API secret", /* @__PURE__ */ (0, b.jsx)("input", {
								name: "secret",
								type: "password",
								autoComplete: "new-password",
								placeholder: k.secret_set ? "Saved · leave blank to keep" : "Enter secret"
							})] })
						] }),
						N && k.mode === "db" && /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [
							[
								[
									"db_host",
									"Database host",
									k.db_host || "localhost"
								],
								[
									"db_port",
									"Port",
									k.db_port || 3306
								],
								[
									"db_name",
									"Database name",
									k.db_name || ""
								],
								[
									"db_user",
									"SELECT-only username",
									k.db_user || ""
								]
							].map(([e, t, n]) => /* @__PURE__ */ (0, b.jsxs)("label", { children: [t, /* @__PURE__ */ (0, b.jsx)("input", {
								name: e,
								defaultValue: n,
								required: !0
							})] }, e)),
							/* @__PURE__ */ (0, b.jsxs)("label", {
								className: "full",
								children: ["Database password", /* @__PURE__ */ (0, b.jsx)("input", {
									name: "db_password",
									type: "password",
									autoComplete: "new-password",
									placeholder: k.db_password_set ? "Saved · leave blank to keep" : "Enter password"
								})]
							}),
							/* @__PURE__ */ (0, b.jsxs)("label", {
								className: "full",
								children: ["TLS CA file · remote MySQL", /* @__PURE__ */ (0, b.jsx)("input", {
									name: "db_ssl_ca",
									defaultValue: k.db_ssl_ca || "",
									placeholder: "/home/account/private/mysql-ca.pem"
								})]
							}),
							/* @__PURE__ */ (0, b.jsx)("p", {
								className: "formHelp full",
								children: "Use the full account-prefixed database name and username from cPanel. A dedicated user with SELECT permission is recommended."
							})
						] }),
						/* @__PURE__ */ (0, b.jsxs)("div", {
							className: "formDivider full",
							children: [/* @__PURE__ */ (0, b.jsxs)("h3", { children: ["Original PDF bridge", /* @__PURE__ */ (0, b.jsx)(Ha, { children: "Required for PDFs" })] }), /* @__PURE__ */ (0, b.jsx)("p", { children: "Install the included bridge beside WHMCS to use your existing invoice template." })]
						}),
						/* @__PURE__ */ (0, b.jsxs)("label", {
							className: "full",
							children: ["Bridge endpoint", /* @__PURE__ */ (0, b.jsx)("input", {
								name: "bridge_url",
								type: "url",
								defaultValue: k.bridge_url || "",
								placeholder: "https://billing.example.com/invoicedesk-bridge.php"
							})]
						}),
						/* @__PURE__ */ (0, b.jsxs)("label", {
							className: "full",
							children: ["Bridge shared secret", /* @__PURE__ */ (0, b.jsx)("input", {
								name: "bridge_secret",
								type: "password",
								autoComplete: "new-password",
								placeholder: k.bridge_secret_set ? "Saved · leave blank to keep" : "32 or more random characters"
							})]
						}),
						/* @__PURE__ */ (0, b.jsxs)("div", {
							className: "full formButtons",
							children: [/* @__PURE__ */ (0, b.jsxs)(V, {
								disabled: A || C,
								onClick: (e) => Le({
									preventDefault: () => {},
									currentTarget: e.currentTarget.form
								}, !0),
								children: [A ? /* @__PURE__ */ (0, b.jsx)(Ht, {
									size: 15,
									className: "spin"
								}) : /* @__PURE__ */ (0, b.jsx)(Xt, { size: 15 }), "Test connection"]
							}), /* @__PURE__ */ (0, b.jsxs)(V, {
								type: "submit",
								primary: !0,
								disabled: A || C,
								children: ["Test & save", /* @__PURE__ */ (0, b.jsx)(Dt, { size: 15 })]
							})]
						}),
						ue && /* @__PURE__ */ (0, b.jsx)("p", {
							className: "successText full",
							role: "status",
							children: ue
						}),
						/* @__PURE__ */ (0, b.jsx)("p", {
							className: "formHelp full",
							children: "Credentials are encrypted on the server and never returned to your browser after saving. API permissions: GetInvoices, GetInvoice, GetClientsDetails, GetCurrencies, GetTransactions and GetCredits."
						})
					]
				}) : /* @__PURE__ */ (0, b.jsx)("p", { children: "Only the workspace administrator can change the connection." }) : /* @__PURE__ */ (0, b.jsxs)("div", {
					className: "signInBox",
					children: [/* @__PURE__ */ (0, b.jsx)("p", { children: "Sign in to configure your private workspace." }), /* @__PURE__ */ (0, b.jsxs)(V, {
						primary: !0,
						onClick: () => E("auth"),
						children: ["Sign in", /* @__PURE__ */ (0, b.jsx)(Ot, { size: 15 })]
					})]
				})]
			}), /* @__PURE__ */ (0, b.jsxs)("aside", {
				className: "settingsAside",
				children: [/* @__PURE__ */ (0, b.jsxs)("section", {
					className: "panel padded",
					children: [
						/* @__PURE__ */ (0, b.jsx)("div", {
							className: "eyebrow",
							children: "CHOOSE YOUR DEPLOYMENT"
						}),
						/* @__PURE__ */ (0, b.jsx)("h2", { children: "Same cPanel as WHMCS?" }),
						/* @__PURE__ */ (0, b.jsx)("p", { children: "The lightweight PHP edition supports both the WHMCS API and a direct SELECT-only MySQL connection. It also includes private error logs and database diagnostics." }),
						/* @__PURE__ */ (0, b.jsxs)("a", {
							className: "button",
							href: N ? "https://github.com/thekugelblitz/invoicedesk-whmcs" : "/downloads/Munshi-Ji-WHMCS-v1.2.0.zip",
							children: [/* @__PURE__ */ (0, b.jsx)(It, { size: 15 }), "Download cPanel edition"]
						}),
						/* @__PURE__ */ (0, b.jsxs)("a", {
							className: "subtleLink",
							href: "https://github.com/thekugelblitz/invoicedesk-whmcs",
							target: "_blank",
							rel: "noreferrer",
							children: ["Public source on GitHub", /* @__PURE__ */ (0, b.jsx)(Ot, { size: 14 })]
						})
					]
				}), /* @__PURE__ */ (0, b.jsxs)("section", {
					className: "panel padded",
					children: [
						/* @__PURE__ */ (0, b.jsx)(Xt, {
							size: 22,
							className: "goldText"
						}),
						/* @__PURE__ */ (0, b.jsx)("h3", { children: "Originals, preserved." }),
						/* @__PURE__ */ (0, b.jsx)("p", { children: "The secure bridge signs each request, checks timestamps, and prevents replay. It fetches original PDFs without changing invoice records." }),
						/* @__PURE__ */ (0, b.jsxs)("div", {
							className: "miniStep",
							children: [/* @__PURE__ */ (0, b.jsx)("span", { children: "01" }), "Install the bridge from the cPanel package"]
						}),
						/* @__PURE__ */ (0, b.jsxs)("div", {
							className: "miniStep",
							children: [/* @__PURE__ */ (0, b.jsx)("span", { children: "02" }), "Set a private shared secret"]
						}),
						/* @__PURE__ */ (0, b.jsxs)("div", {
							className: "miniStep",
							children: [/* @__PURE__ */ (0, b.jsx)("span", { children: "03" }), "Test the connection, then sync"]
						}),
						/* @__PURE__ */ (0, b.jsxs)("a", {
							className: "subtleLink",
							href: "https://github.com/thekugelblitz/invoicedesk-whmcs#readme",
							target: "_blank",
							rel: "noreferrer",
							children: ["Installation guide", /* @__PURE__ */ (0, b.jsx)(Ot, { size: 14 })]
						})
					]
				})]
			})]
		}), /* @__PURE__ */ (0, b.jsxs)("section", {
			className: "panel padded preferences",
			children: [
				/* @__PURE__ */ (0, b.jsx)("h2", { children: "GST & workspace preferences" }),
				/* @__PURE__ */ (0, b.jsx)("p", { children: "Refresh imported invoices after changing these rules." }),
				/* @__PURE__ */ (0, b.jsxs)("form", {
					className: "formGrid",
					onSubmit: async (e) => {
						if (e.preventDefault(), je()) {
							j(!0);
							try {
								let n = Object.fromEntries(new FormData(e.currentTarget));
								n.tax_is_gst = n.tax_is_gst === "on", await P("preferences", n), t(await P("bootstrap")), ie("Preferences saved. Refresh invoices to apply the new checks.");
							} catch (e) {
								Ae(e);
							} finally {
								j(!1);
							}
						}
					},
					children: [
						/* @__PURE__ */ (0, b.jsxs)("label", { children: ["Company name", /* @__PURE__ */ (0, b.jsx)("input", {
							name: "company",
							defaultValue: e?.preferences.company || "HostingSpell"
						})] }),
						/* @__PURE__ */ (0, b.jsxs)("label", { children: ["Supplier GSTIN", /* @__PURE__ */ (0, b.jsx)("input", {
							name: "supplier_gstin",
							defaultValue: e?.preferences.supplier_gstin || "",
							maxLength: 15,
							placeholder: "Excluded from recipient matches"
						})] }),
						/* @__PURE__ */ (0, b.jsxs)("label", {
							className: "full",
							children: [
								"Recipient GST custom field names",
								/* @__PURE__ */ (0, b.jsx)("input", {
									name: "gst_labels",
									defaultValue: e?.preferences.gst_labels || "gstin,gst number,gst no,gst registration"
								}),
								/* @__PURE__ */ (0, b.jsx)("span", {
									className: "formHelp",
									children: "Comma-separated, exact names. WHMCS Tax ID is always checked."
								})
							]
						}),
						/* @__PURE__ */ (0, b.jsxs)("label", { children: ["Archive copy retention · days", /* @__PURE__ */ (0, b.jsx)("input", {
							type: "number",
							name: "archive_days",
							min: "1",
							max: "90",
							defaultValue: e?.preferences.archive_days || 7
						})] }),
						/* @__PURE__ */ (0, b.jsxs)("label", {
							className: "checkboxLabel",
							children: [/* @__PURE__ */ (0, b.jsx)("input", {
								name: "tax_is_gst",
								type: "checkbox",
								defaultChecked: e?.preferences.tax_is_gst
							}), "Our WHMCS tax rules represent GST"]
						}),
						/* @__PURE__ */ (0, b.jsxs)("div", {
							className: "full formButtons",
							children: [/* @__PURE__ */ (0, b.jsx)(V, {
								disabled: A || C || !e?.user?.admin,
								onClick: async () => {
									try {
										je() && ie((await P("prune", {})).note);
									} catch (e) {
										Ae(e);
									}
								},
								children: "Clean expired copies"
							}), /* @__PURE__ */ (0, b.jsx)(V, {
								type: "submit",
								primary: !0,
								disabled: A || C || !e?.user?.admin,
								children: "Save preferences"
							})]
						})
					]
				})
			]
		})] });
	}
	function qe(e = !1) {
		let t = o || {}, n = t.totals || [], r = n.find((e) => e.currency === "INR") || n[0], a = r?.currency || "INR", s = (t.trend || []).filter((e) => e.currency === a), c = Math.max(1, ...s.map((e) => e.total));
		return /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [
			/* @__PURE__ */ (0, b.jsx)("div", {
				className: "stats financial",
				children: [
					[
						"Billed sales",
						z(r?.billed, a),
						"Sales invoices · selected invoice dates"
					],
					[
						"Tax recorded",
						z(r?.tax, a),
						"WHMCS tax levels 1 + 2"
					],
					[
						"Current balance",
						z(r?.due, a),
						"Cached outstanding · selected invoices"
					],
					[
						"Currencies",
						B(n.length),
						"Each currency remains separate"
					]
				].map(([e, t, n]) => /* @__PURE__ */ (0, b.jsxs)("div", {
					className: "stat",
					children: [
						/* @__PURE__ */ (0, b.jsx)("div", {
							className: "statLabel",
							children: e
						}),
						/* @__PURE__ */ (0, b.jsx)("strong", { children: t }),
						/* @__PURE__ */ (0, b.jsx)("div", {
							className: "statNote",
							children: n
						})
					]
				}, e))
			}),
			/* @__PURE__ */ (0, b.jsxs)("div", {
				className: "analysisGrid",
				children: [/* @__PURE__ */ (0, b.jsxs)("section", {
					className: "panel padded",
					children: [/* @__PURE__ */ (0, b.jsxs)("div", {
						className: "sectionHeading",
						children: [/* @__PURE__ */ (0, b.jsxs)("div", { children: [/* @__PURE__ */ (0, b.jsx)("h2", { children: e ? "GSTIN evidence" : "Billing over time" }), /* @__PURE__ */ (0, b.jsx)("p", { children: e ? "Recipient format and checksum checks" : "Invoice sales by month · " + a })] }), /* @__PURE__ */ (0, b.jsx)(Ha, { children: e ? "Working summary" : "Sales register" })]
					}), e ? /* @__PURE__ */ (0, b.jsx)(qa, { rows: t.gst || [] }) : s.length ? /* @__PURE__ */ (0, b.jsx)("div", {
						className: "trend",
						children: s.map((e) => /* @__PURE__ */ (0, b.jsxs)("div", {
							className: "trendColumn",
							children: [
								/* @__PURE__ */ (0, b.jsx)("span", { children: z(e.total, a) }),
								/* @__PURE__ */ (0, b.jsx)("div", {
									className: "trendTrack",
									children: /* @__PURE__ */ (0, b.jsx)("i", { style: { height: `${e.total / c * 100}%` } })
								}),
								/* @__PURE__ */ (0, b.jsx)("small", { children: e.month })
							]
						}, e.month))
					}) : /* @__PURE__ */ (0, b.jsx)(Ua, {
						title: "A clearer picture starts with a sync",
						children: "Your sales trend will appear after importing invoices."
					})]
				}), /* @__PURE__ */ (0, b.jsxs)("section", {
					className: "panel padded",
					children: [/* @__PURE__ */ (0, b.jsx)("div", {
						className: "sectionHeading",
						children: /* @__PURE__ */ (0, b.jsxs)("div", { children: [/* @__PURE__ */ (0, b.jsx)("h2", { children: e ? "Tax by recipient state" : "Download coverage" }), /* @__PURE__ */ (0, b.jsx)("p", { children: e ? "GSTIN state code · not place of supply" : "Shared original PDF register" })] })
					}), e ? (t.states || []).length ? /* @__PURE__ */ (0, b.jsx)("div", {
						className: "simpleRows",
						children: t.states.map((e) => /* @__PURE__ */ (0, b.jsxs)("div", { children: [/* @__PURE__ */ (0, b.jsxs)("span", { children: [
							"State ",
							e.state,
							/* @__PURE__ */ (0, b.jsxs)("small", { children: [B(e.invoices), " invoices"] })
						] }), /* @__PURE__ */ (0, b.jsx)("strong", { children: z(e.tax, e.currency) })] }, e.state + e.currency))
					}) : /* @__PURE__ */ (0, b.jsx)(Ua, {
						title: "No state totals yet",
						children: "Sync invoices to inspect recipient state codes."
					}) : /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [
						/* @__PURE__ */ (0, b.jsxs)("div", {
							className: "coverageNumber",
							children: [B(t.summary?.downloaded), /* @__PURE__ */ (0, b.jsxs)("span", { children: ["/ ", B(t.summary?.total)] })]
						}),
						/* @__PURE__ */ (0, b.jsx)("div", {
							className: "progress",
							children: /* @__PURE__ */ (0, b.jsx)("i", { style: { width: (t.summary?.total ? t.summary.downloaded / t.summary.total * 100 : 0) + "%" } })
						}),
						/* @__PURE__ */ (0, b.jsxs)("div", {
							className: "simpleRows",
							children: [
								/* @__PURE__ */ (0, b.jsxs)("div", { children: [/* @__PURE__ */ (0, b.jsxs)("span", { children: [/* @__PURE__ */ (0, b.jsx)("i", { className: "dot gold" }), " Not touched"] }), /* @__PURE__ */ (0, b.jsx)("strong", { children: B(t.summary?.pending) })] }),
								/* @__PURE__ */ (0, b.jsxs)("div", { children: [/* @__PURE__ */ (0, b.jsxs)("span", { children: [/* @__PURE__ */ (0, b.jsx)("i", { className: "dot green" }), " Downloaded"] }), /* @__PURE__ */ (0, b.jsx)("strong", { children: B(t.summary?.downloaded) })] }),
								/* @__PURE__ */ (0, b.jsxs)("div", { children: [/* @__PURE__ */ (0, b.jsx)("span", { children: "Updated since download" }), /* @__PURE__ */ (0, b.jsx)("strong", { children: B(t.summary?.updated) })] })
							]
						}),
						/* @__PURE__ */ (0, b.jsxs)(V, {
							onClick: () => {
								Oe("invoices"), ke({ download: "needs_download" });
							},
							children: ["Open pending invoices", /* @__PURE__ */ (0, b.jsx)(Dt, { size: 15 })]
						})
					] })]
				})]
			}),
			/* @__PURE__ */ (0, b.jsxs)("section", {
				className: "panel",
				children: [
					/* @__PURE__ */ (0, b.jsxs)("div", {
						className: "panelHeading",
						children: [/* @__PURE__ */ (0, b.jsx)("h2", { children: e ? "GST reconciliation working sheet" : "Sales by currency" }), Re("csv", i, /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [/* @__PURE__ */ (0, b.jsx)(It, { size: 14 }), "Export register"] }))]
					}),
					/* @__PURE__ */ (0, b.jsx)("div", {
						className: "tableScroll",
						children: /* @__PURE__ */ (0, b.jsxs)("table", { children: [/* @__PURE__ */ (0, b.jsx)("thead", { children: /* @__PURE__ */ (0, b.jsx)("tr", { children: (e ? [
							"RECIPIENT EVIDENCE",
							"CURRENCY",
							"INVOICES",
							"SUBTOTAL",
							"TAX RECORDED",
							"INVOICE VALUE"
						] : [
							"CURRENCY",
							"SALES INVOICES",
							"BILLED AMOUNT",
							"TAX RECORDED",
							"CURRENT BALANCE"
						]).map((e) => /* @__PURE__ */ (0, b.jsx)("th", { children: e }, e)) }) }), /* @__PURE__ */ (0, b.jsx)("tbody", { children: (e ? t.gst || [] : n).map((t, n) => /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
							e && /* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(Ha, {
								kind: t.gst_status === "valid" ? "success" : t.gst_status === "missing" ? "muted" : "danger",
								children: t.gst_status === "valid" ? "Format + checksum pass" : t.gst_status === "missing" ? "No recipient GSTIN" : "Invalid / conflicting ID"
							}) }),
							/* @__PURE__ */ (0, b.jsx)("td", { children: t.currency }),
							/* @__PURE__ */ (0, b.jsx)("td", { children: B(t.invoices) }),
							e && /* @__PURE__ */ (0, b.jsx)("td", { children: z(t.subtotal, t.currency) }),
							/* @__PURE__ */ (0, b.jsx)("td", { children: z(e ? t.tax : t.billed, t.currency) }),
							/* @__PURE__ */ (0, b.jsx)("td", { children: z(e ? t.total : t.tax, t.currency) }),
							!e && /* @__PURE__ */ (0, b.jsx)("td", { children: z(t.due, t.currency) })
						] }, n)) })] })
					}),
					!(e ? t.gst?.length : n.length) && /* @__PURE__ */ (0, b.jsx)(Ua, {
						title: "Nothing in this range yet",
						children: "Sync WHMCS invoices to populate this view."
					})
				]
			}),
			e && /* @__PURE__ */ (0, b.jsxs)("div", {
				className: "note",
				children: [/* @__PURE__ */ (0, b.jsx)(Xt, { size: 17 }), /* @__PURE__ */ (0, b.jsx)("span", { children: "GSTIN format and checksum do not confirm active GST registration. Tax amounts stay separate from GSTIN presence. This is a working sheet for review; statutory filing and place of supply need separate verification." })]
			}),
			!e && /* @__PURE__ */ (0, b.jsxs)("section", {
				className: "panel spacer",
				children: [
					/* @__PURE__ */ (0, b.jsxs)("div", {
						className: "panelHeading",
						children: [/* @__PURE__ */ (0, b.jsx)("h2", { children: "Payments & gateway fees" }), /* @__PURE__ */ (0, b.jsx)("span", {
							className: "muted",
							children: "By transaction date · imported clients"
						})]
					}),
					/* @__PURE__ */ (0, b.jsx)("div", {
						className: "tableScroll",
						children: /* @__PURE__ */ (0, b.jsxs)("table", { children: [/* @__PURE__ */ (0, b.jsx)("thead", { children: /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, b.jsx)("th", { children: "GATEWAY" }),
							/* @__PURE__ */ (0, b.jsx)("th", { children: "CURRENCY" }),
							/* @__PURE__ */ (0, b.jsx)("th", { children: "RECEIVED" }),
							/* @__PURE__ */ (0, b.jsx)("th", { children: "REFUNDED" }),
							/* @__PURE__ */ (0, b.jsx)("th", { children: "FEES" })
						] }) }), /* @__PURE__ */ (0, b.jsx)("tbody", { children: (t.cash || []).map((e) => /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, b.jsx)("td", { children: e.gateway || "Unspecified" }),
							/* @__PURE__ */ (0, b.jsx)("td", { children: e.currency }),
							/* @__PURE__ */ (0, b.jsx)("td", { children: z(e.received, e.currency) }),
							/* @__PURE__ */ (0, b.jsx)("td", { children: z(e.refunded, e.currency) }),
							/* @__PURE__ */ (0, b.jsx)("td", { children: z(e.fees, e.currency) })
						] }, e.gateway + e.currency)) })] })
					}),
					!t.cash?.length && /* @__PURE__ */ (0, b.jsx)("p", {
						className: "panelNote",
						children: "Import full client ledgers to include their unallocated payments, refunds and fees. Invoice sync imports invoice-linked transactions."
					})
				]
			}),
			!e && /* @__PURE__ */ (0, b.jsxs)("details", {
				className: "panel padded spacer",
				children: [/* @__PURE__ */ (0, b.jsx)("summary", {
					className: "muted",
					children: "Outstanding by age & leading clients"
				}), /* @__PURE__ */ (0, b.jsxs)("div", {
					className: "analysisGrid spacer",
					children: [/* @__PURE__ */ (0, b.jsxs)("div", { children: [/* @__PURE__ */ (0, b.jsxs)("h3", { children: ["Current invoice balances · ", a] }), /* @__PURE__ */ (0, b.jsxs)("div", {
						className: "simpleRows",
						children: [(t.aging || []).filter((e) => e.currency === a).map((e) => /* @__PURE__ */ (0, b.jsxs)("div", { children: [/* @__PURE__ */ (0, b.jsx)("span", { children: e.bucket }), /* @__PURE__ */ (0, b.jsx)("strong", { children: z(e.amount, e.currency) })] }, e.bucket)), !t.aging?.length && /* @__PURE__ */ (0, b.jsx)("p", {
							className: "panelNote",
							children: "No positive balances in this selection."
						})]
					})] }), /* @__PURE__ */ (0, b.jsxs)("div", { children: [/* @__PURE__ */ (0, b.jsxs)("h3", { children: ["Leading clients · selected sales · ", a] }), /* @__PURE__ */ (0, b.jsx)("div", {
						className: "simpleRows",
						children: (t.top || []).filter((e) => e.currency === a).map((e) => /* @__PURE__ */ (0, b.jsxs)("div", { children: [/* @__PURE__ */ (0, b.jsx)("span", { children: e.client_name }), /* @__PURE__ */ (0, b.jsx)("strong", { children: z(e.total, e.currency) })] }, e.client_id))
					})] })]
				})]
			}),
			e && /* @__PURE__ */ (0, b.jsxs)("details", {
				className: "panel padded spacer",
				children: [
					/* @__PURE__ */ (0, b.jsx)("summary", {
						className: "muted",
						children: "WHMCS tax rates · both tax levels"
					}),
					/* @__PURE__ */ (0, b.jsx)("div", {
						className: "tableScroll spacer",
						children: /* @__PURE__ */ (0, b.jsxs)("table", { children: [/* @__PURE__ */ (0, b.jsx)("thead", { children: /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, b.jsx)("th", { children: "RATE 1" }),
							/* @__PURE__ */ (0, b.jsx)("th", { children: "RATE 2" }),
							/* @__PURE__ */ (0, b.jsx)("th", { children: "CURRENCY" }),
							/* @__PURE__ */ (0, b.jsx)("th", { children: "INVOICES" }),
							/* @__PURE__ */ (0, b.jsx)("th", { children: "TAX RECORDED" })
						] }) }), /* @__PURE__ */ (0, b.jsx)("tbody", { children: (t.rates || []).map((e, t) => /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, b.jsxs)("td", { children: [e.rate ?? e.taxrate ?? 0, "%"] }),
							/* @__PURE__ */ (0, b.jsxs)("td", { children: [e.rate2 ?? e.taxrate2 ?? 0, "%"] }),
							/* @__PURE__ */ (0, b.jsx)("td", { children: e.currency }),
							/* @__PURE__ */ (0, b.jsx)("td", { children: B(e.invoices) }),
							/* @__PURE__ */ (0, b.jsx)("td", { children: z(Number(e.tax) + (Number(e.tax2) || 0), e.currency) })
						] }, t)) })] })
					}),
					/* @__PURE__ */ (0, b.jsx)("p", {
						className: "panelNote",
						children: "These are source tax levels. No CGST / SGST / IGST split is inferred."
					})
				]
			}),
			t.duplicates?.length > 0 && /* @__PURE__ */ (0, b.jsxs)("div", {
				className: "notice",
				children: [
					"Duplicate invoice numbers: ",
					t.duplicates.map((e) => e.number + " (" + e.n + ")").join(", "),
					". Review numbering before export."
				]
			})
		] });
	}
	return /* @__PURE__ */ (0, b.jsxs)("div", {
		className: "workspace " + (oe ? "mobileOpen" : ""),
		children: [
			/* @__PURE__ */ (0, b.jsxs)("aside", {
				className: "sidebar",
				children: [
					/* @__PURE__ */ (0, b.jsxs)("a", {
						className: "brand",
						href: "#",
						onClick: (e) => {
							e.preventDefault(), Oe("invoices");
						},
						children: [/* @__PURE__ */ (0, b.jsx)("span", {
							className: "brandMark",
							children: "म"
						}), /* @__PURE__ */ (0, b.jsxs)("div", { children: [/* @__PURE__ */ (0, b.jsxs)("strong", { children: ["Munshi Ji", /* @__PURE__ */ (0, b.jsx)("span", {
							className: "brandDot",
							children: "."
						})] }), /* @__PURE__ */ (0, b.jsx)("small", { children: "YOUR BOOKS. IN ORDER." })] })]
					}),
					/* @__PURE__ */ (0, b.jsxs)("div", {
						className: "workspaceName",
						children: [
							/* @__PURE__ */ (0, b.jsx)("span", {
								className: "companyIcon",
								children: "HS"
							}),
							/* @__PURE__ */ (0, b.jsxs)("div", { children: [/* @__PURE__ */ (0, b.jsx)("strong", { children: e?.preferences.company || "HostingSpell" }), /* @__PURE__ */ (0, b.jsx)("small", { children: "WHMCS workspace" })] }),
							/* @__PURE__ */ (0, b.jsx)(At, { size: 13 })
						]
					}),
					/* @__PURE__ */ (0, b.jsx)("div", {
						className: "navLabel",
						children: "WORKSPACE"
					}),
					/* @__PURE__ */ (0, b.jsx)("nav", { children: Ra.map((e) => /* @__PURE__ */ (0, b.jsxs)("button", {
						onClick: () => Oe(e.id),
						className: n === e.id ? "active" : "",
						children: [
							/* @__PURE__ */ (0, b.jsx)(e.icon, { size: 18 }),
							/* @__PURE__ */ (0, b.jsx)("span", { children: e.label }),
							e.id === "invoices" && u.pending > 0 && /* @__PURE__ */ (0, b.jsx)("em", { children: u.pending })
						]
					}, e.id)) }),
					/* @__PURE__ */ (0, b.jsxs)("div", {
						className: "sidebarFoot",
						children: [/* @__PURE__ */ (0, b.jsxs)("div", {
							className: "connectionState",
							children: [
								/* @__PURE__ */ (0, b.jsx)("i", { className: "dot " + (e?.configured ? "green" : "gold") }),
								C ? "Sample workspace" : e?.configured ? "WHMCS connected" : "WHMCS not connected",
								/* @__PURE__ */ (0, b.jsx)("button", {
									onClick: () => Oe("settings"),
									"aria-label": "Connection settings",
									children: /* @__PURE__ */ (0, b.jsx)(Yt, { size: 13 })
								})
							]
						}), /* @__PURE__ */ (0, b.jsxs)("div", {
							className: "identity",
							children: [
								/* @__PURE__ */ (0, b.jsx)("span", { children: e?.user?.displayName?.slice(0, 1).toUpperCase() || "M" }),
								/* @__PURE__ */ (0, b.jsxs)("div", { children: [/* @__PURE__ */ (0, b.jsx)("strong", { children: e?.user?.displayName || "Your private workspace" }), /* @__PURE__ */ (0, b.jsx)("small", { children: e?.user ? e.user.admin ? "Administrator" : e.user.role || "Workspace member" : "Sign in to get started" })] }),
								e?.user && /* @__PURE__ */ (0, b.jsx)("a", {
									href: N ? "#" : "/signout-with-chatgpt?return_to=%2F",
									onClick: async (e) => {
										N && (e.preventDefault(), await P("logout", {}), t(await P("bootstrap")));
									},
									target: "_top",
									"aria-label": "Sign out",
									children: /* @__PURE__ */ (0, b.jsx)(Ut, { size: 15 })
								})
							]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, b.jsxs)("div", {
				className: "main",
				children: [/* @__PURE__ */ (0, b.jsxs)("header", {
					className: "topbar",
					children: [/* @__PURE__ */ (0, b.jsxs)("div", {
						className: "breadcrumb",
						children: [
							/* @__PURE__ */ (0, b.jsx)("button", {
								className: "mobileMenu iconButton",
								"aria-label": "Open navigation",
								onClick: () => se(!oe),
								children: /* @__PURE__ */ (0, b.jsx)(Wt, { size: 20 })
							}),
							/* @__PURE__ */ (0, b.jsx)("span", { children: "Workspace" }),
							/* @__PURE__ */ (0, b.jsx)(Mt, { size: 13 }),
							/* @__PURE__ */ (0, b.jsx)("strong", { children: Ra.find((e) => e.id === n)?.label || {
								diagnostics: "Diagnostics",
								team: "Team access",
								audit: "Activity",
								account: "My account"
							}[n] })
						]
					}), /* @__PURE__ */ (0, b.jsxs)("div", {
						className: "topActions",
						children: [
							fe && /* @__PURE__ */ (0, b.jsxs)("span", {
								className: "liveTask",
								children: [/* @__PURE__ */ (0, b.jsx)(Ht, {
									className: "spin",
									size: 13
								}), "Processing…"]
							}),
							/* @__PURE__ */ (0, b.jsxs)("span", {
								className: "privateLabel",
								children: [/* @__PURE__ */ (0, b.jsx)(Xt, { size: 12 }), "Private workspace"]
							}),
							/* @__PURE__ */ (0, b.jsxs)("label", {
								className: "themePicker",
								children: [/* @__PURE__ */ (0, b.jsx)(Qt, { size: 14 }), /* @__PURE__ */ (0, b.jsxs)("select", {
									"aria-label": "Color theme",
									value: me,
									onChange: (e) => {
										he(e.target.value), localStorage.setItem("munshi-theme", e.target.value);
									},
									children: [
										/* @__PURE__ */ (0, b.jsx)("option", {
											value: "system",
											children: "System"
										}),
										/* @__PURE__ */ (0, b.jsx)("option", {
											value: "light",
											children: "Light"
										}),
										/* @__PURE__ */ (0, b.jsx)("option", {
											value: "dark",
											children: "Dark"
										}),
										/* @__PURE__ */ (0, b.jsx)("option", {
											value: "amoled",
											children: "AMOLED"
										})
									]
								})]
							}),
							!e?.user && /* @__PURE__ */ (0, b.jsxs)("button", {
								className: "signIn",
								onClick: () => E("auth"),
								children: ["Sign in", /* @__PURE__ */ (0, b.jsx)(Ot, { size: 13 })]
							})
						]
					})]
				}), /* @__PURE__ */ (0, b.jsxs)("main", {
					className: "content",
					id: "main-content",
					children: [
						C && /* @__PURE__ */ (0, b.jsxs)("div", {
							className: "demoBanner",
							children: [/* @__PURE__ */ (0, b.jsxs)("span", { children: [/* @__PURE__ */ (0, b.jsx)(Lt, { size: 15 }), "Sample workspace · illustrative data, downloads disabled"] }), /* @__PURE__ */ (0, b.jsxs)("button", {
								onClick: () => {
									ae(!1), Oe("invoices");
								},
								children: ["Exit sample view", /* @__PURE__ */ (0, b.jsx)(en, { size: 14 })]
							})]
						}),
						/* @__PURE__ */ (0, b.jsxs)("div", {
							className: "pageHeading",
							children: [/* @__PURE__ */ (0, b.jsxs)("div", {
								className: "titleBlock",
								children: [
									/* @__PURE__ */ (0, b.jsx)("div", {
										className: "eyebrow",
										children: n === "invoices" ? "THE DOWNLOAD DESK" : n === "gst" ? "CHECK. REVIEW. RECONCILE." : n === "analytics" ? "YOUR BILLING, AT A GLANCE" : n === "history" ? "A SHARED PAPER TRAIL" : n === "clients" ? "EVERY CLIENT, ACCOUNTED FOR" : n === "jobs" ? "ONE STEP AT A TIME" : "MAKE IT YOURS"
									}),
									/* @__PURE__ */ (0, b.jsx)("h1", { children: {
										invoices: "Every invoice. In order.",
										analytics: "The bigger picture.",
										gst: "GST, with clarity.",
										clients: M ? M.client.name : "Your clients & their books.",
										jobs: "Syncs, ZIPs & progress.",
										history: "A trail for every download.",
										settings: "A workspace that fits.",
										diagnostics: "Clear errors. Useful answers.",
										team: "The people behind the books.",
										audit: "Workspace activity.",
										account: "Your account."
									}[n] }),
									/* @__PURE__ */ (0, b.jsx)("p", { children: {
										invoices: "Know what’s untouched. Download what’s next.",
										analytics: "Sales, taxes and collections — with each currency kept separate.",
										gst: "Find recipient GSTINs and give every exception a decision.",
										clients: "Payments, refunds, credits and a clear settlement statement.",
										jobs: "Small, resumable steps. Failures stay visible.",
										history: "See who downloaded invoices, when, and how often.",
										settings: "Connect WHMCS and set the rules for your books."
									}[n] })
								]
							}), /* @__PURE__ */ (0, b.jsxs)("div", {
								className: "headingActions",
								children: [
									[
										"invoices",
										"analytics",
										"gst",
										"clients"
									].includes(n) && Ve,
									n === "invoices" && /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [/* @__PURE__ */ (0, b.jsxs)(V, {
										onClick: () => E("sync"),
										disabled: A,
										children: [/* @__PURE__ */ (0, b.jsx)(Kt, { size: 15 }), "Sync invoices"]
									}), /* @__PURE__ */ (0, b.jsxs)(V, {
										primary: !0,
										onClick: () => E("bulk"),
										disabled: A,
										children: [/* @__PURE__ */ (0, b.jsx)(It, { size: 15 }), "Bulk download"]
									})] }),
									n === "clients" && /* @__PURE__ */ (0, b.jsxs)(V, {
										primary: !0,
										onClick: () => E("ledgerSync"),
										children: [/* @__PURE__ */ (0, b.jsx)(Gt, { size: 15 }), "Import client"]
									}),
									n === "history" && Re("history_csv", {}, /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [/* @__PURE__ */ (0, b.jsx)(It, { size: 15 }), "Export history"] })),
									n === "jobs" && /* @__PURE__ */ (0, b.jsxs)(V, {
										onClick: () => Me(),
										children: [/* @__PURE__ */ (0, b.jsx)(Kt, { size: 15 }), "Refresh"]
									})
								]
							})]
						}),
						S && /* @__PURE__ */ (0, b.jsxs)("div", {
							className: "errorBox",
							role: "alert",
							children: [
								/* @__PURE__ */ (0, b.jsx)(Nt, { size: 18 }),
								/* @__PURE__ */ (0, b.jsx)("span", { children: S }),
								/* @__PURE__ */ (0, b.jsx)("button", {
									"aria-label": "Dismiss error",
									onClick: () => ne(""),
									children: /* @__PURE__ */ (0, b.jsx)(en, { size: 16 })
								})
							]
						}),
						n === "invoices" && /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [
							Ue,
							/* @__PURE__ */ (0, b.jsxs)("div", {
								className: "registerHeading",
								children: [/* @__PURE__ */ (0, b.jsxs)("div", { children: [/* @__PURE__ */ (0, b.jsxs)("h2", { children: ["Invoice register", /* @__PURE__ */ (0, b.jsx)("span", { children: B(g) })] }), /* @__PURE__ */ (0, b.jsx)("p", { children: "A shared download status for everyone on your team." })] }), /* @__PURE__ */ (0, b.jsxs)("div", {
									className: "registerActions",
									children: [Re("csv", i, /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [/* @__PURE__ */ (0, b.jsx)(Et, { size: 14 }), "Export CSV"] })), /* @__PURE__ */ (0, b.jsx)("button", {
										className: "iconButton",
										"aria-label": "Refresh invoice status",
										onClick: () => Me(),
										children: /* @__PURE__ */ (0, b.jsx)(Kt, {
											size: 16,
											className: ee ? "spin" : ""
										})
									})]
								})]
							}),
							We(),
							/* @__PURE__ */ (0, b.jsxs)("div", {
								className: "bottomNotes",
								children: [/* @__PURE__ */ (0, b.jsxs)("span", { children: [/* @__PURE__ */ (0, b.jsx)(Xt, { size: 14 }), "Original PDFs · Your WHMCS template"] }), /* @__PURE__ */ (0, b.jsx)("span", { children: "Times shown in IST · Status shared across this workspace" })]
							}),
							/* @__PURE__ */ (0, b.jsxs)("div", {
								className: "note",
								children: [/* @__PURE__ */ (0, b.jsx)(Nt, { size: 15 }), /* @__PURE__ */ (0, b.jsx)("span", { children: "Download status changes when an original file response completes. Preparing ZIPs, previews and CSV exports leave it unchanged. Downloads outside this app and browser disk saving cannot be verified." })]
							})
						] }),
						(n === "analytics" || n === "gst") && /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [qe(n === "gst"), n === "gst" && /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [/* @__PURE__ */ (0, b.jsxs)("div", {
							className: "registerHeading",
							children: [/* @__PURE__ */ (0, b.jsxs)("div", { children: [/* @__PURE__ */ (0, b.jsx)("h2", { children: "Exceptions to review" }), /* @__PURE__ */ (0, b.jsx)("p", { children: "Source changes reopen previously reviewed exceptions." })] }), /* @__PURE__ */ (0, b.jsx)(V, {
								onClick: () => Pe("refresh", {
									all_filtered: !0,
									filter: i
								}),
								children: "Refresh filtered invoices"
							})]
						}), We()] })] }),
						N && [
							"settings",
							"diagnostics",
							"team",
							"audit",
							"account"
						].includes(n) && /* @__PURE__ */ (0, b.jsx)("div", {
							className: "settingsLinks",
							children: [
								["settings", "Connection & preferences"],
								...e?.user?.admin ? [
									["diagnostics", "Diagnostics"],
									["team", "Team access"],
									["audit", "Activity"]
								] : [],
								["account", "My account"]
							].map(([e, t]) => /* @__PURE__ */ (0, b.jsx)(V, {
								primary: n === e,
								onClick: () => Oe(e),
								children: t
							}, e))
						}),
						n === "settings" && Ke(),
						N && [
							"diagnostics",
							"team",
							"audit",
							"account"
						].includes(n) && /* @__PURE__ */ (0, b.jsx)(tn, {
							tab: n,
							boot: e,
							onError: Ae,
							onSignedOut: async () => {
								t(await P("bootstrap")), E("auth"), ie("Password changed. Sign in again.");
							}
						}, n),
						n === "history" && /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [/* @__PURE__ */ (0, b.jsxs)("section", {
							className: "panel",
							children: [
								Ge(o?.rows || []),
								!o?.rows?.length && /* @__PURE__ */ (0, b.jsx)(Ua, {
									title: "No downloads recorded yet",
									children: "Every original PDF and ZIP download will leave a shared record here."
								}),
								/* @__PURE__ */ (0, b.jsxs)("div", {
									className: "tableFooter",
									children: [/* @__PURE__ */ (0, b.jsxs)("span", { children: [B(o?.total), " attempts"] }), /* @__PURE__ */ (0, b.jsxs)("div", { children: [/* @__PURE__ */ (0, b.jsx)(V, {
										disabled: f <= 1,
										onClick: () => p(f - 1),
										children: "Previous"
									}), /* @__PURE__ */ (0, b.jsx)(V, {
										disabled: f * 50 >= Number(o?.total || 0),
										onClick: () => p(f + 1),
										children: "Next"
									})] })]
								})
							]
						}), /* @__PURE__ */ (0, b.jsxs)("div", {
							className: "note",
							children: [/* @__PURE__ */ (0, b.jsx)(qt, { size: 16 }), /* @__PURE__ */ (0, b.jsx)("span", { children: "“Served” means the server completed the file response. History starts with this installation and covers downloads made through Munshi Ji." })]
						})] }),
						n === "jobs" && /* @__PURE__ */ (0, b.jsxs)("section", {
							className: "jobs",
							children: [
								(o?.rows || []).map((e) => /* @__PURE__ */ (0, b.jsxs)("section", {
									className: "panel job",
									children: [
										/* @__PURE__ */ (0, b.jsx)("div", {
											className: "jobIcon",
											children: e.type === "archive" ? /* @__PURE__ */ (0, b.jsx)(Rt, { size: 23 }) : /* @__PURE__ */ (0, b.jsx)(Kt, { size: 23 })
										}),
										/* @__PURE__ */ (0, b.jsxs)("div", {
											className: "jobBody",
											children: [
												/* @__PURE__ */ (0, b.jsxs)("div", {
													className: "jobTitle",
													children: [/* @__PURE__ */ (0, b.jsx)("h2", { children: {
														sync: "Invoice sync",
														ledger: "Full client import",
														archive: "Invoice ZIP",
														refresh: "Invoice refresh"
													}[e.type] }), /* @__PURE__ */ (0, b.jsx)(Ha, {
														kind: e.state === "complete" ? "success" : e.state === "failed" ? "danger" : "pending",
														children: e.state === "complete" && e.type === "archive" ? "Ready to download" : e.state
													})]
												}),
												/* @__PURE__ */ (0, b.jsx)("p", { children: e.message }),
												/* @__PURE__ */ (0, b.jsx)("div", {
													className: "progress",
													children: /* @__PURE__ */ (0, b.jsx)("i", { style: { width: (e.total ? (e.done + e.errors) / e.total * 100 : 0) + "%" } })
												}),
												/* @__PURE__ */ (0, b.jsxs)("small", { children: [
													B(e.done),
													" successful · ",
													B(e.errors),
													" failed · ",
													B(e.total),
													" tasks ",
													/* @__PURE__ */ (0, b.jsx)("span", { children: "·" }),
													" ",
													La(e.created_at)
												] }),
												e.failures?.length > 0 && /* @__PURE__ */ (0, b.jsxs)("details", { children: [/* @__PURE__ */ (0, b.jsx)("summary", { children: "View failed invoices" }), e.failures.map((e) => /* @__PURE__ */ (0, b.jsxs)("p", { children: [
													"#",
													e.invoice_id,
													": ",
													e.error
												] }, e.invoice_id))] })
											]
										}),
										/* @__PURE__ */ (0, b.jsxs)("div", {
											className: "jobActions",
											children: [
												["complete", "partial"].includes(e.state) && e.type === "archive" && e.done > 0 && Re("archive", { id: e.id }, /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [/* @__PURE__ */ (0, b.jsx)(It, { size: 15 }), "Download ZIP"] }), !0),
												["partial", "failed"].includes(e.state) && /* @__PURE__ */ (0, b.jsx)(V, {
													disabled: !!fe,
													onClick: async () => {
														try {
															await P("job_retry", { id: e.id }), Ne(e.id);
														} catch (e) {
															Ae(e);
														}
													},
													children: "Retry failed"
												}),
												["queued", "running"].includes(e.state) && /* @__PURE__ */ (0, b.jsx)(V, {
													disabled: !!fe,
													onClick: () => Ne(e.id),
													children: "Resume"
												}),
												[
													"queued",
													"running",
													"partial",
													"failed"
												].includes(e.state) && /* @__PURE__ */ (0, b.jsx)(V, {
													disabled: A,
													onClick: async () => {
														try {
															await P("job_cancel", { id: e.id }), Me();
														} catch (e) {
															Ae(e);
														}
													},
													children: "Cancel"
												})
											]
										})
									]
								}, e.id)),
								!o?.rows?.length && /* @__PURE__ */ (0, b.jsx)("section", {
									className: "panel",
									children: /* @__PURE__ */ (0, b.jsx)(Ua, {
										title: "A quiet queue is a good thing.",
										action: /* @__PURE__ */ (0, b.jsxs)(V, {
											primary: !0,
											onClick: () => E("sync"),
											children: [/* @__PURE__ */ (0, b.jsx)(Kt, { size: 15 }), "Start an invoice sync"]
										}),
										children: "Sync invoices or prepare a bulk ZIP. You can leave and resume a job later."
									})
								}),
								/* @__PURE__ */ (0, b.jsxs)("div", {
									className: "note",
									children: [/* @__PURE__ */ (0, b.jsx)(Ft, { size: 16 }), /* @__PURE__ */ (0, b.jsx)("span", { children: "Jobs process one invoice at a time while this workspace is open. cPanel installations can also use cron. Preparing a ZIP does not mark it downloaded." })]
								})
							]
						}),
						n === "clients" && (M ? /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [
							/* @__PURE__ */ (0, b.jsxs)("div", {
								className: "ledgerToolbar",
								children: [
									/* @__PURE__ */ (0, b.jsxs)(V, {
										onClick: () => ge(null),
										children: [/* @__PURE__ */ (0, b.jsx)(jt, { size: 15 }), "All clients"]
									}),
									/* @__PURE__ */ (0, b.jsx)("div", {
										className: "tabs",
										children: [
											["statement", "Settlement statement"],
											["payments", "Payments & refunds"],
											["credits", "Wallet movements"]
										].map(([e, t]) => /* @__PURE__ */ (0, b.jsx)("button", {
											className: _e === e ? "selected" : "",
											onClick: () => ve(e),
											children: t
										}, e))
									}),
									Re("ledger_csv", {
										...i,
										id: M.client.id
									}, /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [/* @__PURE__ */ (0, b.jsx)(It, { size: 15 }), "Statement CSV"] }))
								]
							}),
							/* @__PURE__ */ (0, b.jsxs)("div", {
								className: "stats ledgerStats",
								children: [Object.entries(M.closing).map(([e, t]) => /* @__PURE__ */ (0, b.jsxs)("div", {
									className: "stat",
									children: [
										/* @__PURE__ */ (0, b.jsxs)("div", {
											className: "statLabel",
											children: ["Closing settlement · ", e]
										}),
										/* @__PURE__ */ (0, b.jsx)("strong", { children: z(t, e) }),
										/* @__PURE__ */ (0, b.jsxs)("div", {
											className: "statNote",
											children: ["Opening: ", z(M.opening[e] || 0, e)]
										})
									]
								}, e)), /* @__PURE__ */ (0, b.jsxs)("div", {
									className: "stat",
									children: [
										/* @__PURE__ */ (0, b.jsxs)("div", {
											className: "statLabel",
											children: ["Current wallet · ", M.client.currency]
										}),
										/* @__PURE__ */ (0, b.jsx)("strong", { children: z(M.client.wallet, M.client.currency) }),
										/* @__PURE__ */ (0, b.jsx)("div", {
											className: "statNote",
											children: "WHMCS credit balance"
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, b.jsx)("div", {
								className: "panel",
								children: /* @__PURE__ */ (0, b.jsx)("div", {
									className: "tableScroll",
									children: /* @__PURE__ */ (0, b.jsxs)("table", { children: [/* @__PURE__ */ (0, b.jsx)("thead", { children: /* @__PURE__ */ (0, b.jsx)("tr", { children: (_e === "statement" ? [
										"DATE",
										"ENTRY",
										"DESCRIPTION",
										"DEBIT",
										"CREDIT",
										"BALANCE"
									] : _e === "payments" ? [
										"DATE",
										"GATEWAY",
										"REFERENCE",
										"RECEIVED",
										"REFUNDED",
										"FEES"
									] : [
										"DATE",
										"DESCRIPTION",
										"WALLET MOVEMENT"
									]).map((e) => /* @__PURE__ */ (0, b.jsx)("th", { children: e }, e)) }) }), /* @__PURE__ */ (0, b.jsx)("tbody", { children: (_e === "statement" ? M.rows : _e === "payments" ? M.payments : M.credits).map((e, t) => /* @__PURE__ */ (0, b.jsxs)("tr", { children: [/* @__PURE__ */ (0, b.jsx)("td", { children: La(e.date) }), _e === "statement" ? /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [
										/* @__PURE__ */ (0, b.jsxs)("td", { children: [e.kind, /* @__PURE__ */ (0, b.jsxs)("small", { children: ["#", e.reference] })] }),
										/* @__PURE__ */ (0, b.jsx)("td", { children: e.description }),
										/* @__PURE__ */ (0, b.jsx)("td", { children: z(e.debit, e.currency) }),
										/* @__PURE__ */ (0, b.jsx)("td", { children: z(e.credit, e.currency) }),
										/* @__PURE__ */ (0, b.jsx)("td", { children: z(e.balance, e.currency) })
									] }) : _e === "payments" ? /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [
										/* @__PURE__ */ (0, b.jsx)("td", { children: e.gateway }),
										/* @__PURE__ */ (0, b.jsx)("td", {
											className: "mono",
											children: e.reference
										}),
										/* @__PURE__ */ (0, b.jsx)("td", { children: z(e.amount_in, e.currency) }),
										/* @__PURE__ */ (0, b.jsx)("td", { children: z(e.amount_out, e.currency) }),
										/* @__PURE__ */ (0, b.jsx)("td", { children: z(e.fees, e.currency) })
									] }) : /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [/* @__PURE__ */ (0, b.jsx)("td", { children: e.description }), /* @__PURE__ */ (0, b.jsx)("td", { children: z(e.amount, M.client.currency) })] })] }, t)) })] })
								})
							}),
							/* @__PURE__ */ (0, b.jsxs)("div", {
								className: "note",
								children: [/* @__PURE__ */ (0, b.jsx)(Nt, { size: 17 }), /* @__PURE__ */ (0, b.jsx)("span", { children: M.note })]
							}),
							/* @__PURE__ */ (0, b.jsxs)("p", {
								className: "panelNote",
								children: [
									"Last full client import: ",
									La(M.client.ledger_at),
									". Current source invoice balances: ",
									M.source_balances.map((e) => z(e.balance, e.currency)).join(", ") || "none",
									"."
								]
							})
						] }) : /* @__PURE__ */ (0, b.jsxs)("section", {
							className: "panel",
							children: [
								/* @__PURE__ */ (0, b.jsxs)("div", {
									className: "panelHeading",
									children: [/* @__PURE__ */ (0, b.jsx)("h2", { children: "Client directory" }), /* @__PURE__ */ (0, b.jsxs)("form", {
										className: "search",
										onSubmit: async (t) => {
											if (t.preventDefault(), !C && e?.user) try {
												s(await P("clients", null, { search: ye }));
											} catch (e) {
												Ae(e);
											}
										},
										children: [
											/* @__PURE__ */ (0, b.jsx)(Jt, { size: 15 }),
											/* @__PURE__ */ (0, b.jsx)("input", {
												"aria-label": "Find client",
												placeholder: "Name, email or client ID…",
												value: ye,
												onChange: (e) => be(e.target.value)
											}),
											/* @__PURE__ */ (0, b.jsx)("button", { children: "Find" })
										]
									})]
								}),
								/* @__PURE__ */ (0, b.jsx)("div", {
									className: "tableScroll",
									children: /* @__PURE__ */ (0, b.jsxs)("table", { children: [/* @__PURE__ */ (0, b.jsx)("thead", { children: /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
										/* @__PURE__ */ (0, b.jsx)("th", { children: "CLIENT" }),
										/* @__PURE__ */ (0, b.jsx)("th", { children: "INVOICES" }),
										/* @__PURE__ */ (0, b.jsx)("th", { children: "CURRENT DUE" }),
										/* @__PURE__ */ (0, b.jsx)("th", { children: "WALLET" }),
										/* @__PURE__ */ (0, b.jsx)("th", { children: "FULL IMPORT" }),
										/* @__PURE__ */ (0, b.jsx)("th", { children: "ACTION" })
									] }) }), /* @__PURE__ */ (0, b.jsx)("tbody", { children: (o?.rows || []).map((e) => /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
										/* @__PURE__ */ (0, b.jsxs)("td", { children: [/* @__PURE__ */ (0, b.jsx)("strong", { children: e.name }), /* @__PURE__ */ (0, b.jsxs)("small", { children: [
											"#",
											e.id,
											" · ",
											e.email
										] })] }),
										/* @__PURE__ */ (0, b.jsx)("td", { children: B(e.invoices) }),
										/* @__PURE__ */ (0, b.jsx)("td", { children: z(e.due, e.currency) }),
										/* @__PURE__ */ (0, b.jsx)("td", { children: z(e.wallet, e.currency) }),
										/* @__PURE__ */ (0, b.jsx)("td", { children: e.ledger_at ? La(e.ledger_at) : "Not imported" }),
										/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsxs)("div", {
											className: "rowActions",
											children: [/* @__PURE__ */ (0, b.jsxs)(V, {
												onClick: () => Ie(e.id),
												children: ["Ledger", /* @__PURE__ */ (0, b.jsx)(Dt, { size: 14 })]
											}), /* @__PURE__ */ (0, b.jsx)("button", {
												className: "iconButton",
												"aria-label": "Sync client " + e.id,
												onClick: () => {
													O({ client_id: e.id }), E("ledgerSync");
												},
												children: /* @__PURE__ */ (0, b.jsx)(Kt, { size: 15 })
											})]
										}) })
									] }, e.id)) })] })
								}),
								!o?.rows?.length && /* @__PURE__ */ (0, b.jsx)(Ua, {
									title: "Keep every client’s books together.",
									action: /* @__PURE__ */ (0, b.jsxs)(V, {
										primary: !0,
										onClick: () => E("ledgerSync"),
										children: [/* @__PURE__ */ (0, b.jsx)(Gt, { size: 15 }), "Import a client"]
									}),
									children: "A full client import brings invoices, payments, refunds and wallet history into one statement."
								})
							]
						})),
						/* @__PURE__ */ (0, b.jsxs)("footer", {
							className: "workspaceFooter",
							children: [/* @__PURE__ */ (0, b.jsxs)("span", { children: [
								"Munshi Ji",
								/* @__PURE__ */ (0, b.jsx)("span", {
									className: "brandDot",
									children: "."
								}),
								" ",
								/* @__PURE__ */ (0, b.jsx)("span", {
									className: "footerSeparator",
									children: "/"
								}),
								" A little order goes a long way."
							] }), /* @__PURE__ */ (0, b.jsxs)("a", {
								href: "https://github.com/thekugelblitz/invoicedesk-whmcs",
								target: "_blank",
								rel: "noreferrer",
								children: ["Built for HostingSpell", /* @__PURE__ */ (0, b.jsx)(Ot, { size: 12 })]
							})]
						})
					]
				})]
			}),
			re && /* @__PURE__ */ (0, b.jsxs)("div", {
				className: "toast",
				role: "status",
				children: [
					/* @__PURE__ */ (0, b.jsx)(Pt, { size: 17 }),
					re,
					/* @__PURE__ */ (0, b.jsx)("button", {
						"aria-label": "Dismiss notification",
						onClick: () => ie(""),
						children: /* @__PURE__ */ (0, b.jsx)(en, { size: 14 })
					})
				]
			}),
			T && /* @__PURE__ */ (0, b.jsx)("div", {
				className: "modalBackdrop",
				onClick: (e) => {
					e.target === e.currentTarget && E(null);
				},
				children: /* @__PURE__ */ (0, b.jsxs)("section", {
					className: "modal " + (T === "invoice" ? "large" : ""),
					role: "dialog",
					"aria-modal": "true",
					"aria-labelledby": "dialogTitle",
					children: [
						/* @__PURE__ */ (0, b.jsx)("button", {
							className: "modalClose iconButton",
							"aria-label": "Close dialog",
							onClick: () => E(null),
							children: /* @__PURE__ */ (0, b.jsx)(en, { size: 20 })
						}),
						S && /* @__PURE__ */ (0, b.jsxs)("div", {
							className: "errorBox dialogError",
							role: "alert",
							children: [
								/* @__PURE__ */ (0, b.jsx)(Nt, { size: 17 }),
								/* @__PURE__ */ (0, b.jsx)("span", { children: S }),
								/* @__PURE__ */ (0, b.jsx)("button", {
									"aria-label": "Dismiss error",
									onClick: () => ne(""),
									children: /* @__PURE__ */ (0, b.jsx)(en, { size: 15 })
								})
							]
						}),
						T === "auth" && /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [
							/* @__PURE__ */ (0, b.jsx)("div", {
								className: "eyebrow",
								children: "YOUR PRIVATE WORKSPACE"
							}),
							/* @__PURE__ */ (0, b.jsx)("h2", {
								id: "dialogTitle",
								children: N && !e?.installed ? "Set up Munshi Ji." : "Welcome to your books."
							}),
							/* @__PURE__ */ (0, b.jsx)("p", { children: N ? "Sign in to your cPanel installation." : "Sign in with ChatGPT to open your private invoice workspace." }),
							N ? /* @__PURE__ */ (0, b.jsxs)("form", {
								className: "formGrid",
								onSubmit: async (n) => {
									n.preventDefault(), j(!0), ne("");
									try {
										let r = Object.fromEntries(new FormData(n.currentTarget));
										await P(e?.installed ? "login" : "install", r), t(await P("bootstrap")), e?.installed ? E(null) : ie("Administrator created. Sign in to continue.");
									} catch (e) {
										Ae(e);
									} finally {
										j(!1);
									}
								},
								children: [
									!e?.installed && /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [/* @__PURE__ */ (0, b.jsxs)("label", {
										className: "full",
										children: ["One-time setup token", /* @__PURE__ */ (0, b.jsx)("input", {
											name: "token",
											type: "password",
											autoComplete: "off",
											required: !0
										})]
									}), /* @__PURE__ */ (0, b.jsxs)("label", {
										className: "full",
										children: ["Your name", /* @__PURE__ */ (0, b.jsx)("input", {
											name: "name",
											required: !0
										})]
									})] }),
									/* @__PURE__ */ (0, b.jsxs)("label", {
										className: "full",
										children: ["Email", /* @__PURE__ */ (0, b.jsx)("input", {
											name: "email",
											type: "email",
											autoComplete: "username",
											required: !0
										})]
									}),
									/* @__PURE__ */ (0, b.jsxs)("label", {
										className: "full",
										children: ["Password", /* @__PURE__ */ (0, b.jsx)("input", {
											name: "password",
											type: "password",
											minLength: e?.installed ? void 0 : 12,
											autoComplete: e?.installed ? "current-password" : "new-password",
											required: !0
										})]
									}),
									/* @__PURE__ */ (0, b.jsxs)(V, {
										primary: !0,
										type: "submit",
										disabled: A,
										children: [
											A ? /* @__PURE__ */ (0, b.jsx)(Ht, {
												className: "spin",
												size: 15
											}) : /* @__PURE__ */ (0, b.jsx)(Dt, { size: 15 }),
											" ",
											e?.installed ? "Sign in" : "Create administrator"
										]
									})
								]
							}) : /* @__PURE__ */ (0, b.jsxs)("a", {
								className: "button primary",
								href: "/signin-with-chatgpt?return_to=%2F",
								target: "_top",
								children: ["Sign in with ChatGPT", /* @__PURE__ */ (0, b.jsx)(Ot, { size: 15 })]
							})
						] }),
						(T === "sync" || T === "ledgerSync") && /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [
							/* @__PURE__ */ (0, b.jsx)("div", {
								className: "eyebrow",
								children: "WHMCS IMPORT"
							}),
							/* @__PURE__ */ (0, b.jsx)("h2", {
								id: "dialogTitle",
								children: T === "ledgerSync" ? "Bring a client’s books together." : "Fresh invoices. Clear status."
							}),
							/* @__PURE__ */ (0, b.jsx)("p", { children: T === "ledgerSync" ? "Imports all invoice dates and the complete client payment journal." : "Sync an inclusive date range. Existing records and download history are preserved." }),
							/* @__PURE__ */ (0, b.jsxs)("form", {
								onSubmit: (e) => {
									e.preventDefault();
									let t = Object.fromEntries(new FormData(e.currentTarget));
									Pe(T === "ledgerSync" ? "ledger" : "sync", t);
								},
								className: "formGrid",
								children: [
									T === "ledgerSync" ? /* @__PURE__ */ (0, b.jsxs)("label", {
										className: "full",
										children: ["WHMCS client ID", /* @__PURE__ */ (0, b.jsx)("input", {
											name: "client_id",
											type: "number",
											min: "1",
											required: !0,
											defaultValue: D?.client_id || ""
										})]
									}) : /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [
										/* @__PURE__ */ (0, b.jsxs)("label", { children: ["From", /* @__PURE__ */ (0, b.jsx)("input", {
											type: "date",
											name: "from",
											required: !0,
											defaultValue: i.from
										})] }),
										/* @__PURE__ */ (0, b.jsxs)("label", { children: ["To", /* @__PURE__ */ (0, b.jsx)("input", {
											type: "date",
											name: "to",
											required: !0,
											defaultValue: i.to
										})] }),
										/* @__PURE__ */ (0, b.jsxs)("label", {
											className: "full",
											children: ["Date basis", /* @__PURE__ */ (0, b.jsxs)("select", {
												name: "basis",
												defaultValue: i.basis,
												children: [
													/* @__PURE__ */ (0, b.jsx)("option", {
														value: "date",
														children: "Invoice issued"
													}),
													/* @__PURE__ */ (0, b.jsx)("option", {
														value: "paid",
														children: "Invoice paid"
													}),
													/* @__PURE__ */ (0, b.jsx)("option", {
														value: "due",
														children: "Invoice due"
													})
												]
											})]
										})
									] }),
									/* @__PURE__ */ (0, b.jsxs)("div", {
										className: "notice full",
										children: [/* @__PURE__ */ (0, b.jsx)(Ft, { size: 16 }), /* @__PURE__ */ (0, b.jsx)("span", { children: "One invoice at a time keeps resource use low. API mode checks pagination for missing or reordered records." })]
									}),
									/* @__PURE__ */ (0, b.jsxs)(V, {
										primary: !0,
										type: "submit",
										disabled: A,
										children: [A ? /* @__PURE__ */ (0, b.jsx)(Ht, {
											className: "spin",
											size: 15
										}) : /* @__PURE__ */ (0, b.jsx)(Kt, { size: 15 }), "Start import"]
									})
								]
							})
						] }),
						T === "bulk" && /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [
							/* @__PURE__ */ (0, b.jsx)("div", {
								className: "eyebrow",
								children: "BULK DOWNLOAD"
							}),
							/* @__PURE__ */ (0, b.jsx)("h2", {
								id: "dialogTitle",
								children: "Get the invoices you need."
							}),
							/* @__PURE__ */ (0, b.jsx)("p", { children: "Every ZIP includes a manifest of successful and failed invoices." }),
							/* @__PURE__ */ (0, b.jsxs)("form", {
								className: "formGrid",
								onSubmit: (e) => {
									e.preventDefault();
									let t = Object.fromEntries(new FormData(e.currentTarget));
									Pe(t.format === "scan" ? "pdf_scan" : "archive", {
										format: t.format,
										ids: [...v],
										all_filtered: t.scope !== "selected",
										filter: {
											...i,
											...t.scope === "pending" ? { download: "needs_download" } : {}
										}
									});
								},
								children: [
									/* @__PURE__ */ (0, b.jsxs)("label", {
										className: "full",
										children: ["Which invoices?", /* @__PURE__ */ (0, b.jsxs)("select", {
											name: "scope",
											defaultValue: v.size ? "selected" : "pending",
											children: [
												/* @__PURE__ */ (0, b.jsxs)("option", {
													value: "selected",
													disabled: !v.size,
													children: [v.size, " selected invoices"]
												}),
												/* @__PURE__ */ (0, b.jsx)("option", {
													value: "pending",
													children: "Pending + updated in current filters"
												}),
												/* @__PURE__ */ (0, b.jsx)("option", {
													value: "filtered",
													children: "All matching current filters"
												})
											]
										})]
									}),
									/* @__PURE__ */ (0, b.jsxs)("label", {
										className: "full",
										children: ["Format", /* @__PURE__ */ (0, b.jsxs)("select", {
											name: "format",
											children: [
												/* @__PURE__ */ (0, b.jsx)("option", {
													value: "pdf",
													children: "Original WHMCS PDFs · bridge required"
												}),
												/* @__PURE__ */ (0, b.jsx)("option", {
													value: "html",
													children: "Printable HTML copies · cached data"
												}),
												N && /* @__PURE__ */ (0, b.jsx)("option", {
													value: "scan",
													children: "Check original PDF text · pdftotext required"
												})
											]
										})]
									}),
									/* @__PURE__ */ (0, b.jsxs)("div", {
										className: "notice full",
										children: [/* @__PURE__ */ (0, b.jsx)(Xt, { size: 17 }), /* @__PURE__ */ (0, b.jsx)("span", { children: "Up to 100 invoices / 100 MB per ZIP. Preparing files leaves download status unchanged. Only serving original PDFs clears their pending status; HTML copies stay separate." })]
									}),
									/* @__PURE__ */ (0, b.jsxs)(V, {
										primary: !0,
										type: "submit",
										disabled: A,
										children: [
											/* @__PURE__ */ (0, b.jsx)(Rt, { size: 16 }),
											"Prepare ZIP",
											/* @__PURE__ */ (0, b.jsx)(Dt, { size: 15 })
										]
									})
								]
							})
						] }),
						T === "invoice" && D && /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [
							/* @__PURE__ */ (0, b.jsxs)("div", {
								className: "eyebrow",
								children: ["INVOICE #", D.id]
							}),
							/* @__PURE__ */ (0, b.jsxs)("div", {
								className: "invoiceDialogHeading",
								children: [/* @__PURE__ */ (0, b.jsxs)("div", { children: [/* @__PURE__ */ (0, b.jsx)("h2", {
									id: "dialogTitle",
									children: D.number
								}), /* @__PURE__ */ (0, b.jsx)("p", { children: D.client_name })] }), /* @__PURE__ */ (0, b.jsx)(Ha, {
									kind: D.status === "Paid" ? "success" : "pending",
									children: D.status
								})]
							}),
							/* @__PURE__ */ (0, b.jsxs)("div", {
								className: "dialogActions",
								children: [
									Re("copy", { id: D.id }, /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [/* @__PURE__ */ (0, b.jsx)(Lt, { size: 15 }), "View / print copy"] })),
									Re("pdf", { id: D.id }, /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [/* @__PURE__ */ (0, b.jsx)(It, { size: 15 }), "Download original PDF"] }), !0),
									N && /* @__PURE__ */ (0, b.jsxs)(V, {
										disabled: A || C,
										onClick: async () => {
											if (je()) {
												j(!0);
												try {
													ie("PDF text result: " + (await P("pdf_check", { id: D.id })).result), O(await P("invoice", null, { id: D.id }));
												} catch (e) {
													Ae(e);
												} finally {
													j(!1);
												}
											}
										},
										children: [/* @__PURE__ */ (0, b.jsx)(Xt, { size: 15 }), "Check PDF text"]
									}),
									/* @__PURE__ */ (0, b.jsxs)(V, {
										onClick: () => Pe("refresh", { ids: [D.id] }),
										children: [/* @__PURE__ */ (0, b.jsx)(Kt, { size: 15 }), "Refresh"]
									})
								]
							}),
							/* @__PURE__ */ (0, b.jsx)("div", {
								className: "invoiceMeta",
								children: [
									["Issued", D.date],
									["Due", D.due_date],
									["Recipient GSTIN", D.gstin || "Not found"],
									["Evidence", D.basis === "snapshot" ? "Invoice snapshot" : "Current profile"],
									["Last downloaded", D.last_downloaded ? La(D.last_downloaded) : "Not touched"],
									["Downloaded by", D.downloaded_by || "—"],
									["PDF downloads", B(D.download_count)],
									["Source fetched", La(D.fetched_at)]
								].map(([e, t]) => /* @__PURE__ */ (0, b.jsxs)("div", { children: [/* @__PURE__ */ (0, b.jsx)("span", { children: e }), /* @__PURE__ */ (0, b.jsx)("strong", { children: t })] }, e))
							}),
							D.download_count > 0 && D.source_hash !== D.downloaded_hash && /* @__PURE__ */ (0, b.jsxs)("div", {
								className: "notice",
								children: [/* @__PURE__ */ (0, b.jsx)(Kt, { size: 16 }), "Invoice data has changed since the last PDF download."]
							}),
							/* @__PURE__ */ (0, b.jsx)("div", {
								className: "tableScroll",
								children: /* @__PURE__ */ (0, b.jsxs)("table", { children: [/* @__PURE__ */ (0, b.jsx)("thead", { children: /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, b.jsx)("th", { children: "DESCRIPTION" }),
									/* @__PURE__ */ (0, b.jsx)("th", { children: "TAXED" }),
									/* @__PURE__ */ (0, b.jsx)("th", {
										className: "right",
										children: "AMOUNT"
									})
								] }) }), /* @__PURE__ */ (0, b.jsx)("tbody", { children: (D.payload.invoice.items?.item || []).map((e, t) => /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, b.jsx)("td", {
										className: "description",
										children: e.description
									}),
									/* @__PURE__ */ (0, b.jsx)("td", { children: e.taxed ? "Yes" : "No" }),
									/* @__PURE__ */ (0, b.jsx)("td", {
										className: "right mono",
										children: e.amount
									})
								] }, t)) })] })
							}),
							/* @__PURE__ */ (0, b.jsxs)("div", {
								className: "invoiceSplit",
								children: [/* @__PURE__ */ (0, b.jsxs)("div", { children: [
									/* @__PURE__ */ (0, b.jsx)("h3", { children: "Checks & evidence" }),
									D.pdf_check && /* @__PURE__ */ (0, b.jsxs)("p", {
										className: "panelNote",
										children: [
											"PDF text: ",
											D.pdf_check.result,
											" · candidates: ",
											D.pdf_check.recipient_candidates?.join(", ") || "none",
											D.pdf_check.source_hash === D.source_hash ? "" : " · source changed"
										]
									}),
									/* @__PURE__ */ (0, b.jsx)(Ha, {
										kind: D.gst_status === "valid" ? "success" : "pending",
										children: D.gst_status === "valid" ? "GSTIN format + checksum pass" : D.gst_status
									}),
									D.issues.length > 0 && /* @__PURE__ */ (0, b.jsx)("ul", { children: D.issues.map((e) => /* @__PURE__ */ (0, b.jsx)("li", { children: e }, e)) }),
									/* @__PURE__ */ (0, b.jsxs)("a", {
										className: "subtleLink",
										href: "https://services.gst.gov.in/services/searchtp",
										target: "_blank",
										rel: "noreferrer",
										children: ["GST taxpayer search", /* @__PURE__ */ (0, b.jsx)(Ot, { size: 14 })]
									})
								] }), /* @__PURE__ */ (0, b.jsx)("div", { children: [
									["Subtotal", D.subtotal],
									["Tax level 1", D.tax],
									["Tax level 2", D.tax2],
									["Total", D.total],
									["Credit applied", D.credit],
									["Balance", D.balance]
								].map(([e, t]) => /* @__PURE__ */ (0, b.jsxs)("div", {
									className: "invoiceAmount",
									children: [/* @__PURE__ */ (0, b.jsx)("span", { children: e }), /* @__PURE__ */ (0, b.jsx)("strong", { children: z(t, D.currency) })]
								}, e)) })]
							}),
							/* @__PURE__ */ (0, b.jsxs)("details", { children: [/* @__PURE__ */ (0, b.jsxs)("summary", { children: [
								"Download history · ",
								D.downloads.length,
								" attempts"
							] }), D.downloads.length ? Ge(D.downloads) : /* @__PURE__ */ (0, b.jsx)("p", {
								className: "panelNote",
								children: "No downloads recorded for this invoice yet."
							})] }),
							/* @__PURE__ */ (0, b.jsxs)("details", { children: [/* @__PURE__ */ (0, b.jsxs)("summary", { children: [
								"Invoice payments · ",
								D.transactions.length,
								" entries"
							] }), /* @__PURE__ */ (0, b.jsx)("div", {
								className: "simpleRows",
								children: D.transactions.map((e) => /* @__PURE__ */ (0, b.jsxs)("div", { children: [/* @__PURE__ */ (0, b.jsxs)("span", { children: [La(e.date), /* @__PURE__ */ (0, b.jsxs)("small", { children: [
									e.gateway,
									" · ",
									e.reference
								] })] }), /* @__PURE__ */ (0, b.jsx)("strong", { children: z(e.amount_in - e.amount_out, e.currency) })] }, e.id))
							})] }),
							/* @__PURE__ */ (0, b.jsxs)("form", {
								className: "reviewForm",
								onSubmit: async (e) => {
									if (e.preventDefault(), !je()) return;
									let t = Object.fromEntries(new FormData(e.currentTarget));
									j(!0);
									try {
										await P("review", {
											id: D.id,
											note: t.note,
											reviewed: t.reviewed === "on"
										}), O(await P("invoice", null, { id: D.id })), ie("Review saved.");
									} catch (e) {
										Ae(e);
									} finally {
										j(!1);
									}
								},
								children: [
									/* @__PURE__ */ (0, b.jsxs)("label", { children: ["Internal review note", /* @__PURE__ */ (0, b.jsx)("textarea", {
										name: "note",
										maxLength: 2e3,
										rows: 2,
										defaultValue: D.review_note || "",
										placeholder: "What did you verify?"
									})] }),
									/* @__PURE__ */ (0, b.jsxs)("div", {
										className: "reviewBottom",
										children: [/* @__PURE__ */ (0, b.jsxs)("label", {
											className: "checkboxLabel",
											children: [/* @__PURE__ */ (0, b.jsx)("input", {
												type: "checkbox",
												name: "reviewed",
												defaultChecked: D.review_hash === D.source_hash
											}), "Mark this version reviewed"]
										}), /* @__PURE__ */ (0, b.jsx)(V, {
											primary: !0,
											type: "submit",
											disabled: A || C,
											children: "Save review"
										})]
									}),
									D.review_by && /* @__PURE__ */ (0, b.jsxs)("small", { children: [
										"Last review: ",
										D.review_by,
										" · ",
										La(D.review_at)
									] })
								]
							})
						] })
					]
				})
			})
		]
	});
}
function qa({ rows: e }) {
	let t = e.reduce((e, t) => e + t.invoices, 0);
	return t ? /* @__PURE__ */ (0, b.jsx)("div", {
		className: "gstBars",
		children: [
			"valid",
			"missing",
			"invalid",
			"conflict"
		].map((n) => {
			let r = e.filter((e) => e.gst_status === n).reduce((e, t) => e + t.invoices, 0);
			return /* @__PURE__ */ (0, b.jsxs)("div", { children: [/* @__PURE__ */ (0, b.jsxs)("div", { children: [/* @__PURE__ */ (0, b.jsx)("span", { children: n === "valid" ? "Format + checksum pass" : n === "missing" ? "No recipient GSTIN" : n === "invalid" ? "Invalid GSTIN" : "Conflicting IDs" }), /* @__PURE__ */ (0, b.jsx)("strong", { children: B(r) })] }), /* @__PURE__ */ (0, b.jsx)("div", {
				className: "progress",
				children: /* @__PURE__ */ (0, b.jsx)("i", {
					className: n === "valid" ? "greenFill" : "",
					style: { width: r / t * 100 + "%" }
				})
			})] }, n);
		})
	}) : /* @__PURE__ */ (0, b.jsx)(Ua, {
		title: "No GST evidence yet",
		children: "Import invoices to see recipient checks."
	});
}
function Ja(e) {
	let t = e.reduce((e, t) => e + t.total, 0), n = e.reduce((e, t) => e + t.tax + t.tax2, 0);
	return {
		totals: [{
			currency: "INR",
			invoices: e.length,
			billed: t,
			tax: n,
			due: e.reduce((e, t) => e + t.balance, 0)
		}],
		trend: [{
			month: "2026-10",
			currency: "INR",
			total: t
		}],
		summary: {
			total: e.length,
			pending: e.filter((e) => !e.download_count).length,
			downloaded: e.filter((e) => e.download_count).length,
			updated: e.filter((e) => e.download_count && e.downloaded_hash !== e.source_hash).length
		},
		gst: [
			"valid",
			"missing",
			"invalid"
		].map((t) => {
			let n = e.filter((e) => e.gst_status === t);
			return {
				gst_status: t,
				currency: "INR",
				invoices: n.length,
				subtotal: n.reduce((e, t) => e + t.total - t.tax - t.tax2, 0),
				tax: n.reduce((e, t) => e + t.tax + t.tax2, 0),
				total: n.reduce((e, t) => e + t.total, 0)
			};
		}),
		rates: [],
		states: [],
		cash: [],
		duplicates: []
	};
}
//#endregion
//#region main.tsx
(0, ut.createRoot)(document.getElementById("app")).render(/* @__PURE__ */ (0, b.jsx)(Ga, {}));
//#endregion

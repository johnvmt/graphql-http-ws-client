var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/tsup/assets/cjs_shims.js
var init_cjs_shims = __esm({
  "node_modules/tsup/assets/cjs_shims.js"() {
  }
});

// node_modules/tslib/tslib.js
var require_tslib = __commonJS({
  "node_modules/tslib/tslib.js"(exports, module2) {
    init_cjs_shims();
    var __extends2;
    var __assign2;
    var __rest2;
    var __decorate2;
    var __param2;
    var __esDecorate2;
    var __runInitializers2;
    var __propKey2;
    var __setFunctionName2;
    var __metadata2;
    var __awaiter2;
    var __generator2;
    var __exportStar2;
    var __values2;
    var __read2;
    var __spread2;
    var __spreadArrays2;
    var __spreadArray2;
    var __await3;
    var __asyncGenerator3;
    var __asyncDelegator2;
    var __asyncValues2;
    var __makeTemplateObject2;
    var __importStar2;
    var __importDefault2;
    var __classPrivateFieldGet2;
    var __classPrivateFieldSet2;
    var __classPrivateFieldIn2;
    var __createBinding2;
    var __addDisposableResource2;
    var __disposeResources2;
    (function(factory) {
      var root = typeof global === "object" ? global : typeof self === "object" ? self : typeof this === "object" ? this : {};
      if (typeof define === "function" && define.amd) {
        define("tslib", ["exports"], function(exports2) {
          factory(createExporter(root, createExporter(exports2)));
        });
      } else if (typeof module2 === "object" && typeof module2.exports === "object") {
        factory(createExporter(root, createExporter(module2.exports)));
      } else {
        factory(createExporter(root));
      }
      function createExporter(exports2, previous) {
        if (exports2 !== root) {
          if (typeof Object.create === "function") {
            Object.defineProperty(exports2, "__esModule", { value: true });
          } else {
            exports2.__esModule = true;
          }
        }
        return function(id, v) {
          return exports2[id] = previous ? previous(id, v) : v;
        };
      }
    })(function(exporter) {
      var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d, b) {
        d.__proto__ = b;
      } || function(d, b) {
        for (var p in b)
          if (Object.prototype.hasOwnProperty.call(b, p))
            d[p] = b[p];
      };
      __extends2 = function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
      __assign2 = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
        }
        return t;
      };
      __rest2 = function(s, e) {
        var t = {};
        for (var p in s)
          if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
          for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
              t[p[i]] = s[p[i]];
          }
        return t;
      };
      __decorate2 = function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      __param2 = function(paramIndex, decorator) {
        return function(target, key) {
          decorator(target, key, paramIndex);
        };
      };
      __esDecorate2 = function(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
        function accept(f) {
          if (f !== void 0 && typeof f !== "function")
            throw new TypeError("Function expected");
          return f;
        }
        var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
        var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
        var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
        var _, done = false;
        for (var i = decorators.length - 1; i >= 0; i--) {
          var context = {};
          for (var p in contextIn)
            context[p] = p === "access" ? {} : contextIn[p];
          for (var p in contextIn.access)
            context.access[p] = contextIn.access[p];
          context.addInitializer = function(f) {
            if (done)
              throw new TypeError("Cannot add initializers after decoration has completed");
            extraInitializers.push(accept(f || null));
          };
          var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
          if (kind === "accessor") {
            if (result === void 0)
              continue;
            if (result === null || typeof result !== "object")
              throw new TypeError("Object expected");
            if (_ = accept(result.get))
              descriptor.get = _;
            if (_ = accept(result.set))
              descriptor.set = _;
            if (_ = accept(result.init))
              initializers.unshift(_);
          } else if (_ = accept(result)) {
            if (kind === "field")
              initializers.unshift(_);
            else
              descriptor[key] = _;
          }
        }
        if (target)
          Object.defineProperty(target, contextIn.name, descriptor);
        done = true;
      };
      __runInitializers2 = function(thisArg, initializers, value) {
        var useValue = arguments.length > 2;
        for (var i = 0; i < initializers.length; i++) {
          value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
        }
        return useValue ? value : void 0;
      };
      __propKey2 = function(x) {
        return typeof x === "symbol" ? x : "".concat(x);
      };
      __setFunctionName2 = function(f, name, prefix) {
        if (typeof name === "symbol")
          name = name.description ? "[".concat(name.description, "]") : "";
        return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
      };
      __metadata2 = function(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(metadataKey, metadataValue);
      };
      __awaiter2 = function(thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
          });
        }
        return new (P || (P = Promise))(function(resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e) {
              reject(e);
            }
          }
          function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
      __generator2 = function(thisArg, body) {
        var _ = { label: 0, sent: function() {
          if (t[0] & 1)
            throw t[1];
          return t[1];
        }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
          return this;
        }), g;
        function verb(n) {
          return function(v) {
            return step([n, v]);
          };
        }
        function step(op) {
          if (f)
            throw new TypeError("Generator is already executing.");
          while (g && (g = 0, op[0] && (_ = 0)), _)
            try {
              if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                return t;
              if (y = 0, t)
                op = [op[0] & 2, t.value];
              switch (op[0]) {
                case 0:
                case 1:
                  t = op;
                  break;
                case 4:
                  _.label++;
                  return { value: op[1], done: false };
                case 5:
                  _.label++;
                  y = op[1];
                  op = [0];
                  continue;
                case 7:
                  op = _.ops.pop();
                  _.trys.pop();
                  continue;
                default:
                  if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                    _ = 0;
                    continue;
                  }
                  if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                    _.label = op[1];
                    break;
                  }
                  if (op[0] === 6 && _.label < t[1]) {
                    _.label = t[1];
                    t = op;
                    break;
                  }
                  if (t && _.label < t[2]) {
                    _.label = t[2];
                    _.ops.push(op);
                    break;
                  }
                  if (t[2])
                    _.ops.pop();
                  _.trys.pop();
                  continue;
              }
              op = body.call(thisArg, _);
            } catch (e) {
              op = [6, e];
              y = 0;
            } finally {
              f = t = 0;
            }
          if (op[0] & 5)
            throw op[1];
          return { value: op[0] ? op[1] : void 0, done: true };
        }
      };
      __exportStar2 = function(m, o) {
        for (var p in m)
          if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
            __createBinding2(o, m, p);
      };
      __createBinding2 = Object.create ? function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      } : function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        o[k2] = m[k];
      };
      __values2 = function(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
          return m.call(o);
        if (o && typeof o.length === "number")
          return {
            next: function() {
              if (o && i >= o.length)
                o = void 0;
              return { value: o && o[i++], done: !o };
            }
          };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
      };
      __read2 = function(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
          return o;
        var i = m.call(o), r, ar = [], e;
        try {
          while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
            ar.push(r.value);
        } catch (error) {
          e = { error };
        } finally {
          try {
            if (r && !r.done && (m = i["return"]))
              m.call(i);
          } finally {
            if (e)
              throw e.error;
          }
        }
        return ar;
      };
      __spread2 = function() {
        for (var ar = [], i = 0; i < arguments.length; i++)
          ar = ar.concat(__read2(arguments[i]));
        return ar;
      };
      __spreadArrays2 = function() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
          s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
          for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
        return r;
      };
      __spreadArray2 = function(to, from, pack) {
        if (pack || arguments.length === 2)
          for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
              if (!ar)
                ar = Array.prototype.slice.call(from, 0, i);
              ar[i] = from[i];
            }
          }
        return to.concat(ar || Array.prototype.slice.call(from));
      };
      __await3 = function(v) {
        return this instanceof __await3 ? (this.v = v, this) : new __await3(v);
      };
      __asyncGenerator3 = function(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function() {
          return this;
        }, i;
        function awaitReturn(f) {
          return function(v) {
            return Promise.resolve(v).then(f, reject);
          };
        }
        function verb(n, f) {
          if (g[n]) {
            i[n] = function(v) {
              return new Promise(function(a, b) {
                q.push([n, v, a, b]) > 1 || resume(n, v);
              });
            };
            if (f)
              i[n] = f(i[n]);
          }
        }
        function resume(n, v) {
          try {
            step(g[n](v));
          } catch (e) {
            settle(q[0][3], e);
          }
        }
        function step(r) {
          r.value instanceof __await3 ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
        }
        function fulfill(value) {
          resume("next", value);
        }
        function reject(value) {
          resume("throw", value);
        }
        function settle(f, v) {
          if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]);
        }
      };
      __asyncDelegator2 = function(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function(e) {
          throw e;
        }), verb("return"), i[Symbol.iterator] = function() {
          return this;
        }, i;
        function verb(n, f) {
          i[n] = o[n] ? function(v) {
            return (p = !p) ? { value: __await3(o[n](v)), done: false } : f ? f(v) : v;
          } : f;
        }
      };
      __asyncValues2 = function(o) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values2 === "function" ? __values2(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
          return this;
        }, i);
        function verb(n) {
          i[n] = o[n] && function(v) {
            return new Promise(function(resolve, reject) {
              v = o[n](v), settle(resolve, reject, v.done, v.value);
            });
          };
        }
        function settle(resolve, reject, d, v) {
          Promise.resolve(v).then(function(v2) {
            resolve({ value: v2, done: d });
          }, reject);
        }
      };
      __makeTemplateObject2 = function(cooked, raw) {
        if (Object.defineProperty) {
          Object.defineProperty(cooked, "raw", { value: raw });
        } else {
          cooked.raw = raw;
        }
        return cooked;
      };
      var __setModuleDefault = Object.create ? function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      } : function(o, v) {
        o["default"] = v;
      };
      __importStar2 = function(mod) {
        if (mod && mod.__esModule)
          return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
              __createBinding2(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
      __importDefault2 = function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      __classPrivateFieldGet2 = function(receiver, state, kind, f) {
        if (kind === "a" && !f)
          throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
          throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
      };
      __classPrivateFieldSet2 = function(receiver, state, value, kind, f) {
        if (kind === "m")
          throw new TypeError("Private method is not writable");
        if (kind === "a" && !f)
          throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
          throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
      };
      __classPrivateFieldIn2 = function(state, receiver) {
        if (receiver === null || typeof receiver !== "object" && typeof receiver !== "function")
          throw new TypeError("Cannot use 'in' operator on non-object");
        return typeof state === "function" ? receiver === state : state.has(receiver);
      };
      __addDisposableResource2 = function(env, value, async) {
        if (value !== null && value !== void 0) {
          if (typeof value !== "object" && typeof value !== "function")
            throw new TypeError("Object expected.");
          var dispose, inner;
          if (async) {
            if (!Symbol.asyncDispose)
              throw new TypeError("Symbol.asyncDispose is not defined.");
            dispose = value[Symbol.asyncDispose];
          }
          if (dispose === void 0) {
            if (!Symbol.dispose)
              throw new TypeError("Symbol.dispose is not defined.");
            dispose = value[Symbol.dispose];
            if (async)
              inner = dispose;
          }
          if (typeof dispose !== "function")
            throw new TypeError("Object not disposable.");
          if (inner)
            dispose = function() {
              try {
                inner.call(this);
              } catch (e) {
                return Promise.reject(e);
              }
            };
          env.stack.push({ value, dispose, async });
        } else if (async) {
          env.stack.push({ async: true });
        }
        return value;
      };
      var _SuppressedError = typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
        var e = new Error(message);
        return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
      };
      __disposeResources2 = function(env) {
        function fail(e) {
          env.error = env.hasError ? new _SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
          env.hasError = true;
        }
        function next() {
          while (env.stack.length) {
            var rec = env.stack.pop();
            try {
              var result = rec.dispose && rec.dispose.call(rec.value);
              if (rec.async)
                return Promise.resolve(result).then(next, function(e) {
                  fail(e);
                  return next();
                });
            } catch (e) {
              fail(e);
            }
          }
          if (env.hasError)
            throw env.error;
        }
        return next();
      };
      exporter("__extends", __extends2);
      exporter("__assign", __assign2);
      exporter("__rest", __rest2);
      exporter("__decorate", __decorate2);
      exporter("__param", __param2);
      exporter("__esDecorate", __esDecorate2);
      exporter("__runInitializers", __runInitializers2);
      exporter("__propKey", __propKey2);
      exporter("__setFunctionName", __setFunctionName2);
      exporter("__metadata", __metadata2);
      exporter("__awaiter", __awaiter2);
      exporter("__generator", __generator2);
      exporter("__exportStar", __exportStar2);
      exporter("__createBinding", __createBinding2);
      exporter("__values", __values2);
      exporter("__read", __read2);
      exporter("__spread", __spread2);
      exporter("__spreadArrays", __spreadArrays2);
      exporter("__spreadArray", __spreadArray2);
      exporter("__await", __await3);
      exporter("__asyncGenerator", __asyncGenerator3);
      exporter("__asyncDelegator", __asyncDelegator2);
      exporter("__asyncValues", __asyncValues2);
      exporter("__makeTemplateObject", __makeTemplateObject2);
      exporter("__importStar", __importStar2);
      exporter("__importDefault", __importDefault2);
      exporter("__classPrivateFieldGet", __classPrivateFieldGet2);
      exporter("__classPrivateFieldSet", __classPrivateFieldSet2);
      exporter("__classPrivateFieldIn", __classPrivateFieldIn2);
      exporter("__addDisposableResource", __addDisposableResource2);
      exporter("__disposeResources", __disposeResources2);
    });
  }
});

// src/exports.js
var exports_exports = {};
__export(exports_exports, {
  createGraphQLClient: () => createGraphQLClient_default,
  createGraphQLLinks: () => createGraphQLLinks_default,
  default: () => exports_default
});
module.exports = __toCommonJS(exports_exports);
init_cjs_shims();

// src/createGraphQLClient.js
init_cjs_shims();
var import_cache = require("@apollo/client/cache/cache.cjs");

// src/ApolloClientWithGQL.js
init_cjs_shims();
var import_core = require("@apollo/client/core/core.cjs");

// node_modules/graphql-tag/lib/index.js
init_cjs_shims();

// node_modules/tslib/modules/index.js
init_cjs_shims();
var import_tslib = __toESM(require_tslib(), 1);
var {
  __extends,
  __assign,
  __rest,
  __decorate,
  __param,
  __esDecorate,
  __runInitializers,
  __propKey,
  __setFunctionName,
  __metadata,
  __awaiter,
  __generator,
  __exportStar,
  __createBinding,
  __values,
  __read,
  __spread,
  __spreadArrays,
  __spreadArray,
  __await,
  __asyncGenerator,
  __asyncDelegator,
  __asyncValues,
  __makeTemplateObject,
  __importStar,
  __importDefault,
  __classPrivateFieldGet,
  __classPrivateFieldSet,
  __classPrivateFieldIn,
  __addDisposableResource,
  __disposeResources
} = import_tslib.default;

// node_modules/graphql-tag/lib/index.js
var import_graphql = require("graphql");
var docCache = /* @__PURE__ */ new Map();
var fragmentSourceMap = /* @__PURE__ */ new Map();
var printFragmentWarnings = true;
var experimentalFragmentVariables = false;
function normalize(string) {
  return string.replace(/[\s,]+/g, " ").trim();
}
function cacheKeyFromLoc(loc) {
  return normalize(loc.source.body.substring(loc.start, loc.end));
}
function processFragments(ast) {
  var seenKeys = /* @__PURE__ */ new Set();
  var definitions = [];
  ast.definitions.forEach(function(fragmentDefinition) {
    if (fragmentDefinition.kind === "FragmentDefinition") {
      var fragmentName = fragmentDefinition.name.value;
      var sourceKey = cacheKeyFromLoc(fragmentDefinition.loc);
      var sourceKeySet = fragmentSourceMap.get(fragmentName);
      if (sourceKeySet && !sourceKeySet.has(sourceKey)) {
        if (printFragmentWarnings) {
          console.warn("Warning: fragment with name " + fragmentName + " already exists.\ngraphql-tag enforces all fragment names across your application to be unique; read more about\nthis in the docs: http://dev.apollodata.com/core/fragments.html#unique-names");
        }
      } else if (!sourceKeySet) {
        fragmentSourceMap.set(fragmentName, sourceKeySet = /* @__PURE__ */ new Set());
      }
      sourceKeySet.add(sourceKey);
      if (!seenKeys.has(sourceKey)) {
        seenKeys.add(sourceKey);
        definitions.push(fragmentDefinition);
      }
    } else {
      definitions.push(fragmentDefinition);
    }
  });
  return __assign(__assign({}, ast), { definitions });
}
function stripLoc(doc) {
  var workSet = new Set(doc.definitions);
  workSet.forEach(function(node) {
    if (node.loc)
      delete node.loc;
    Object.keys(node).forEach(function(key) {
      var value = node[key];
      if (value && typeof value === "object") {
        workSet.add(value);
      }
    });
  });
  var loc = doc.loc;
  if (loc) {
    delete loc.startToken;
    delete loc.endToken;
  }
  return doc;
}
function parseDocument(source) {
  var cacheKey = normalize(source);
  if (!docCache.has(cacheKey)) {
    var parsed = (0, import_graphql.parse)(source, {
      experimentalFragmentVariables,
      allowLegacyFragmentVariables: experimentalFragmentVariables
    });
    if (!parsed || parsed.kind !== "Document") {
      throw new Error("Not a valid GraphQL document.");
    }
    docCache.set(cacheKey, stripLoc(processFragments(parsed)));
  }
  return docCache.get(cacheKey);
}
function gql(literals) {
  var args = [];
  for (var _i = 1; _i < arguments.length; _i++) {
    args[_i - 1] = arguments[_i];
  }
  if (typeof literals === "string") {
    literals = [literals];
  }
  var result = literals[0];
  args.forEach(function(arg, i) {
    if (arg && arg.kind === "Document") {
      result += arg.loc.source.body;
    } else {
      result += arg;
    }
    result += literals[i + 1];
  });
  return parseDocument(result);
}
function resetCaches() {
  docCache.clear();
  fragmentSourceMap.clear();
}
function disableFragmentWarnings() {
  printFragmentWarnings = false;
}
function enableExperimentalFragmentVariables() {
  experimentalFragmentVariables = true;
}
function disableExperimentalFragmentVariables() {
  experimentalFragmentVariables = false;
}
var extras = {
  gql,
  resetCaches,
  disableFragmentWarnings,
  enableExperimentalFragmentVariables,
  disableExperimentalFragmentVariables
};
(function(gql_1) {
  gql_1.gql = extras.gql, gql_1.resetCaches = extras.resetCaches, gql_1.disableFragmentWarnings = extras.disableFragmentWarnings, gql_1.enableExperimentalFragmentVariables = extras.enableExperimentalFragmentVariables, gql_1.disableExperimentalFragmentVariables = extras.disableExperimentalFragmentVariables;
})(gql || (gql = {}));
gql["default"] = gql;
var lib_default = gql;

// src/ApolloClientWithGQL.js
var ApolloClientWithGQL = class extends import_core.ApolloClient {
  query(options, ...args) {
    return import_core.ApolloClient.prototype.query.apply(
      this,
      [
        {
          ...options,
          query: typeof options.query === "string" ? lib_default(options.query) : options.query
        },
        ...args
      ]
    );
  }
  subscribe(options, ...args) {
    return import_core.ApolloClient.prototype.subscribe.apply(
      this,
      [
        {
          ...options,
          query: typeof options.query === "string" ? lib_default(options.query) : options.query
        },
        ...args
      ]
    );
  }
  mutate(options, ...args) {
    return import_core.ApolloClient.prototype.mutate.apply(
      this,
      [
        {
          ...options,
          mutation: typeof options.mutation === "string" ? lib_default(options.mutation) : options.mutation
        },
        ...args
      ]
    );
  }
};
var ApolloClientWithGQL_default = ApolloClientWithGQL;

// src/createGraphQLLinks.js
init_cjs_shims();
var import_utilities = require("@apollo/client/utilities/utilities.cjs");
var import_core2 = require("@apollo/client/link/core/core.cjs");
var import_retry = require("@apollo/client/link/retry/retry.cjs");
var import_http = require("@apollo/client/link/http/http.cjs");
var import_context = require("@apollo/client/link/context/context.cjs");
var import_ws = require("@apollo/client/link/ws/ws.cjs");
var import_subscriptions = require("@apollo/client/link/subscriptions/subscriptions.cjs");
var import_subscriptions_transport_ws = require("subscriptions-transport-ws");

// node_modules/graphql-ws/lib/client.mjs
init_cjs_shims();

// node_modules/graphql-ws/lib/common.mjs
init_cjs_shims();

// node_modules/graphql-ws/lib/utils.mjs
init_cjs_shims();
function extendedTypeof(val) {
  if (val === null) {
    return "null";
  }
  if (Array.isArray(val)) {
    return "array";
  }
  return typeof val;
}
function isObject(val) {
  return extendedTypeof(val) === "object";
}
function areGraphQLErrors(obj) {
  return Array.isArray(obj) && obj.length > 0 && obj.every((ob) => "message" in ob);
}
function limitCloseReason(reason, whenTooLong) {
  return reason.length < 124 ? reason : whenTooLong;
}

// node_modules/graphql-ws/lib/common.mjs
var GRAPHQL_TRANSPORT_WS_PROTOCOL = "graphql-transport-ws";
var CloseCode;
(function(CloseCode2) {
  CloseCode2[CloseCode2["InternalServerError"] = 4500] = "InternalServerError";
  CloseCode2[CloseCode2["InternalClientError"] = 4005] = "InternalClientError";
  CloseCode2[CloseCode2["BadRequest"] = 4400] = "BadRequest";
  CloseCode2[CloseCode2["BadResponse"] = 4004] = "BadResponse";
  CloseCode2[CloseCode2["Unauthorized"] = 4401] = "Unauthorized";
  CloseCode2[CloseCode2["Forbidden"] = 4403] = "Forbidden";
  CloseCode2[CloseCode2["SubprotocolNotAcceptable"] = 4406] = "SubprotocolNotAcceptable";
  CloseCode2[CloseCode2["ConnectionInitialisationTimeout"] = 4408] = "ConnectionInitialisationTimeout";
  CloseCode2[CloseCode2["ConnectionAcknowledgementTimeout"] = 4504] = "ConnectionAcknowledgementTimeout";
  CloseCode2[CloseCode2["SubscriberAlreadyExists"] = 4409] = "SubscriberAlreadyExists";
  CloseCode2[CloseCode2["TooManyInitialisationRequests"] = 4429] = "TooManyInitialisationRequests";
})(CloseCode || (CloseCode = {}));
var MessageType;
(function(MessageType2) {
  MessageType2["ConnectionInit"] = "connection_init";
  MessageType2["ConnectionAck"] = "connection_ack";
  MessageType2["Ping"] = "ping";
  MessageType2["Pong"] = "pong";
  MessageType2["Subscribe"] = "subscribe";
  MessageType2["Next"] = "next";
  MessageType2["Error"] = "error";
  MessageType2["Complete"] = "complete";
})(MessageType || (MessageType = {}));
function validateMessage(val) {
  if (!isObject(val)) {
    throw new Error(`Message is expected to be an object, but got ${extendedTypeof(val)}`);
  }
  if (!val.type) {
    throw new Error(`Message is missing the 'type' property`);
  }
  if (typeof val.type !== "string") {
    throw new Error(`Message is expects the 'type' property to be a string, but got ${extendedTypeof(val.type)}`);
  }
  switch (val.type) {
    case MessageType.ConnectionInit:
    case MessageType.ConnectionAck:
    case MessageType.Ping:
    case MessageType.Pong: {
      if (val.payload != null && !isObject(val.payload)) {
        throw new Error(`"${val.type}" message expects the 'payload' property to be an object or nullish or missing, but got "${val.payload}"`);
      }
      break;
    }
    case MessageType.Subscribe: {
      if (typeof val.id !== "string") {
        throw new Error(`"${val.type}" message expects the 'id' property to be a string, but got ${extendedTypeof(val.id)}`);
      }
      if (!val.id) {
        throw new Error(`"${val.type}" message requires a non-empty 'id' property`);
      }
      if (!isObject(val.payload)) {
        throw new Error(`"${val.type}" message expects the 'payload' property to be an object, but got ${extendedTypeof(val.payload)}`);
      }
      if (typeof val.payload.query !== "string") {
        throw new Error(`"${val.type}" message payload expects the 'query' property to be a string, but got ${extendedTypeof(val.payload.query)}`);
      }
      if (val.payload.variables != null && !isObject(val.payload.variables)) {
        throw new Error(`"${val.type}" message payload expects the 'variables' property to be a an object or nullish or missing, but got ${extendedTypeof(val.payload.variables)}`);
      }
      if (val.payload.operationName != null && extendedTypeof(val.payload.operationName) !== "string") {
        throw new Error(`"${val.type}" message payload expects the 'operationName' property to be a string or nullish or missing, but got ${extendedTypeof(val.payload.operationName)}`);
      }
      if (val.payload.extensions != null && !isObject(val.payload.extensions)) {
        throw new Error(`"${val.type}" message payload expects the 'extensions' property to be a an object or nullish or missing, but got ${extendedTypeof(val.payload.extensions)}`);
      }
      break;
    }
    case MessageType.Next: {
      if (typeof val.id !== "string") {
        throw new Error(`"${val.type}" message expects the 'id' property to be a string, but got ${extendedTypeof(val.id)}`);
      }
      if (!val.id) {
        throw new Error(`"${val.type}" message requires a non-empty 'id' property`);
      }
      if (!isObject(val.payload)) {
        throw new Error(`"${val.type}" message expects the 'payload' property to be an object, but got ${extendedTypeof(val.payload)}`);
      }
      break;
    }
    case MessageType.Error: {
      if (typeof val.id !== "string") {
        throw new Error(`"${val.type}" message expects the 'id' property to be a string, but got ${extendedTypeof(val.id)}`);
      }
      if (!val.id) {
        throw new Error(`"${val.type}" message requires a non-empty 'id' property`);
      }
      if (!areGraphQLErrors(val.payload)) {
        throw new Error(`"${val.type}" message expects the 'payload' property to be an array of GraphQL errors, but got ${JSON.stringify(val.payload)}`);
      }
      break;
    }
    case MessageType.Complete: {
      if (typeof val.id !== "string") {
        throw new Error(`"${val.type}" message expects the 'id' property to be a string, but got ${extendedTypeof(val.id)}`);
      }
      if (!val.id) {
        throw new Error(`"${val.type}" message requires a non-empty 'id' property`);
      }
      break;
    }
    default:
      throw new Error(`Invalid message 'type' property "${val.type}"`);
  }
  return val;
}
function parseMessage(data, reviver) {
  return validateMessage(typeof data === "string" ? JSON.parse(data, reviver) : data);
}
function stringifyMessage(msg, replacer) {
  validateMessage(msg);
  return JSON.stringify(msg, replacer);
}

// node_modules/graphql-ws/lib/client.mjs
var __await2 = function(v) {
  return this instanceof __await2 ? (this.v = v, this) : new __await2(v);
};
var __asyncGenerator2 = function(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []), i, q = [];
  return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
    return this;
  }, i;
  function verb(n) {
    if (g[n])
      i[n] = function(v) {
        return new Promise(function(a, b) {
          q.push([n, v, a, b]) > 1 || resume(n, v);
        });
      };
  }
  function resume(n, v) {
    try {
      step(g[n](v));
    } catch (e) {
      settle(q[0][3], e);
    }
  }
  function step(r) {
    r.value instanceof __await2 ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
  }
  function fulfill(value) {
    resume("next", value);
  }
  function reject(value) {
    resume("throw", value);
  }
  function settle(f, v) {
    if (f(v), q.shift(), q.length)
      resume(q[0][0], q[0][1]);
  }
};
function createClient(options) {
  const {
    url,
    connectionParams,
    lazy = true,
    onNonLazyError = console.error,
    lazyCloseTimeout: lazyCloseTimeoutMs = 0,
    keepAlive = 0,
    disablePong,
    connectionAckWaitTimeout = 0,
    retryAttempts = 5,
    retryWait = async function randomisedExponentialBackoff(retries2) {
      let retryDelay = 1e3;
      for (let i = 0; i < retries2; i++) {
        retryDelay *= 2;
      }
      await new Promise((resolve) => setTimeout(resolve, retryDelay + Math.floor(Math.random() * (3e3 - 300) + 300)));
    },
    shouldRetry = isLikeCloseEvent,
    isFatalConnectionProblem,
    on,
    webSocketImpl,
    generateID = function generateUUID() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        const r = Math.random() * 16 | 0, v = c == "x" ? r : r & 3 | 8;
        return v.toString(16);
      });
    },
    jsonMessageReplacer: replacer,
    jsonMessageReviver: reviver
  } = options;
  let ws;
  if (webSocketImpl) {
    if (!isWebSocket(webSocketImpl)) {
      throw new Error("Invalid WebSocket implementation provided");
    }
    ws = webSocketImpl;
  } else if (typeof WebSocket !== "undefined") {
    ws = WebSocket;
  } else if (typeof global !== "undefined") {
    ws = global.WebSocket || global.MozWebSocket;
  } else if (typeof window !== "undefined") {
    ws = window.WebSocket || window.MozWebSocket;
  }
  if (!ws)
    throw new Error("WebSocket implementation missing; on Node you can `import WebSocket from 'ws';` and pass `webSocketImpl: WebSocket` to `createClient`");
  const WebSocketImpl = ws;
  const emitter = (() => {
    const message = (() => {
      const listeners2 = {};
      return {
        on(id, listener) {
          listeners2[id] = listener;
          return () => {
            delete listeners2[id];
          };
        },
        emit(message2) {
          var _a;
          if ("id" in message2)
            (_a = listeners2[message2.id]) === null || _a === void 0 ? void 0 : _a.call(listeners2, message2);
        }
      };
    })();
    const listeners = {
      connecting: (on === null || on === void 0 ? void 0 : on.connecting) ? [on.connecting] : [],
      opened: (on === null || on === void 0 ? void 0 : on.opened) ? [on.opened] : [],
      connected: (on === null || on === void 0 ? void 0 : on.connected) ? [on.connected] : [],
      ping: (on === null || on === void 0 ? void 0 : on.ping) ? [on.ping] : [],
      pong: (on === null || on === void 0 ? void 0 : on.pong) ? [on.pong] : [],
      message: (on === null || on === void 0 ? void 0 : on.message) ? [message.emit, on.message] : [message.emit],
      closed: (on === null || on === void 0 ? void 0 : on.closed) ? [on.closed] : [],
      error: (on === null || on === void 0 ? void 0 : on.error) ? [on.error] : []
    };
    return {
      onMessage: message.on,
      on(event, listener) {
        const l = listeners[event];
        l.push(listener);
        return () => {
          l.splice(l.indexOf(listener), 1);
        };
      },
      emit(event, ...args) {
        for (const listener of [...listeners[event]]) {
          listener(...args);
        }
      }
    };
  })();
  function errorOrClosed(cb) {
    const listening = [
      emitter.on("error", (err) => {
        listening.forEach((unlisten) => unlisten());
        cb(err);
      }),
      emitter.on("closed", (event) => {
        listening.forEach((unlisten) => unlisten());
        cb(event);
      })
    ];
  }
  let connecting, locks = 0, lazyCloseTimeout, retrying = false, retries = 0, disposed = false;
  async function connect() {
    clearTimeout(lazyCloseTimeout);
    const [socket, throwOnClose] = await (connecting !== null && connecting !== void 0 ? connecting : connecting = new Promise((connected, denied) => (async () => {
      if (retrying) {
        await retryWait(retries);
        if (!locks) {
          connecting = void 0;
          return denied({ code: 1e3, reason: "All Subscriptions Gone" });
        }
        retries++;
      }
      emitter.emit("connecting", retrying);
      const socket2 = new WebSocketImpl(typeof url === "function" ? await url() : url, GRAPHQL_TRANSPORT_WS_PROTOCOL);
      let connectionAckTimeout, queuedPing;
      function enqueuePing() {
        if (isFinite(keepAlive) && keepAlive > 0) {
          clearTimeout(queuedPing);
          queuedPing = setTimeout(() => {
            if (socket2.readyState === WebSocketImpl.OPEN) {
              socket2.send(stringifyMessage({ type: MessageType.Ping }));
              emitter.emit("ping", false, void 0);
            }
          }, keepAlive);
        }
      }
      errorOrClosed((errOrEvent) => {
        connecting = void 0;
        clearTimeout(connectionAckTimeout);
        clearTimeout(queuedPing);
        denied(errOrEvent);
        if (errOrEvent instanceof TerminatedCloseEvent) {
          socket2.close(4499, "Terminated");
          socket2.onerror = null;
          socket2.onclose = null;
        }
      });
      socket2.onerror = (err) => emitter.emit("error", err);
      socket2.onclose = (event) => emitter.emit("closed", event);
      socket2.onopen = async () => {
        try {
          emitter.emit("opened", socket2);
          const payload = typeof connectionParams === "function" ? await connectionParams() : connectionParams;
          if (socket2.readyState !== WebSocketImpl.OPEN)
            return;
          socket2.send(stringifyMessage(payload ? {
            type: MessageType.ConnectionInit,
            payload
          } : {
            type: MessageType.ConnectionInit
          }, replacer));
          if (isFinite(connectionAckWaitTimeout) && connectionAckWaitTimeout > 0) {
            connectionAckTimeout = setTimeout(() => {
              socket2.close(CloseCode.ConnectionAcknowledgementTimeout, "Connection acknowledgement timeout");
            }, connectionAckWaitTimeout);
          }
          enqueuePing();
        } catch (err) {
          emitter.emit("error", err);
          socket2.close(CloseCode.InternalClientError, limitCloseReason(err instanceof Error ? err.message : new Error(err).message, "Internal client error"));
        }
      };
      let acknowledged = false;
      socket2.onmessage = ({ data }) => {
        try {
          const message = parseMessage(data, reviver);
          emitter.emit("message", message);
          if (message.type === "ping" || message.type === "pong") {
            emitter.emit(message.type, true, message.payload);
            if (message.type === "pong") {
              enqueuePing();
            } else if (!disablePong) {
              socket2.send(stringifyMessage(message.payload ? {
                type: MessageType.Pong,
                payload: message.payload
              } : {
                type: MessageType.Pong
              }));
              emitter.emit("pong", false, message.payload);
            }
            return;
          }
          if (acknowledged)
            return;
          if (message.type !== MessageType.ConnectionAck)
            throw new Error(`First message cannot be of type ${message.type}`);
          clearTimeout(connectionAckTimeout);
          acknowledged = true;
          emitter.emit("connected", socket2, message.payload, retrying);
          retrying = false;
          retries = 0;
          connected([
            socket2,
            new Promise((_, reject) => errorOrClosed(reject))
          ]);
        } catch (err) {
          socket2.onmessage = null;
          emitter.emit("error", err);
          socket2.close(CloseCode.BadResponse, limitCloseReason(err instanceof Error ? err.message : new Error(err).message, "Bad response"));
        }
      };
    })()));
    if (socket.readyState === WebSocketImpl.CLOSING)
      await throwOnClose;
    let release = () => {
    };
    const released = new Promise((resolve) => release = resolve);
    return [
      socket,
      release,
      Promise.race([
        released.then(() => {
          if (!locks) {
            const complete = () => socket.close(1e3, "Normal Closure");
            if (isFinite(lazyCloseTimeoutMs) && lazyCloseTimeoutMs > 0) {
              lazyCloseTimeout = setTimeout(() => {
                if (socket.readyState === WebSocketImpl.OPEN)
                  complete();
              }, lazyCloseTimeoutMs);
            } else {
              complete();
            }
          }
        }),
        throwOnClose
      ])
    ];
  }
  function shouldRetryConnectOrThrow(errOrCloseEvent) {
    if (isLikeCloseEvent(errOrCloseEvent) && (isFatalInternalCloseCode(errOrCloseEvent.code) || [
      CloseCode.InternalServerError,
      CloseCode.InternalClientError,
      CloseCode.BadRequest,
      CloseCode.BadResponse,
      CloseCode.Unauthorized,
      CloseCode.SubprotocolNotAcceptable,
      CloseCode.SubscriberAlreadyExists,
      CloseCode.TooManyInitialisationRequests
    ].includes(errOrCloseEvent.code)))
      throw errOrCloseEvent;
    if (disposed)
      return false;
    if (isLikeCloseEvent(errOrCloseEvent) && errOrCloseEvent.code === 1e3)
      return locks > 0;
    if (!retryAttempts || retries >= retryAttempts)
      throw errOrCloseEvent;
    if (!shouldRetry(errOrCloseEvent))
      throw errOrCloseEvent;
    if (isFatalConnectionProblem === null || isFatalConnectionProblem === void 0 ? void 0 : isFatalConnectionProblem(errOrCloseEvent))
      throw errOrCloseEvent;
    return retrying = true;
  }
  if (!lazy) {
    (async () => {
      locks++;
      for (; ; ) {
        try {
          const [, , throwOnClose] = await connect();
          await throwOnClose;
        } catch (errOrCloseEvent) {
          try {
            if (!shouldRetryConnectOrThrow(errOrCloseEvent))
              return;
          } catch (errOrCloseEvent2) {
            return onNonLazyError === null || onNonLazyError === void 0 ? void 0 : onNonLazyError(errOrCloseEvent2);
          }
        }
      }
    })();
  }
  function subscribe(payload, sink) {
    const id = generateID(payload);
    let done = false, errored = false, releaser = () => {
      locks--;
      done = true;
    };
    (async () => {
      locks++;
      for (; ; ) {
        try {
          const [socket, release, waitForReleaseOrThrowOnClose] = await connect();
          if (done)
            return release();
          const unlisten = emitter.onMessage(id, (message) => {
            switch (message.type) {
              case MessageType.Next: {
                sink.next(message.payload);
                return;
              }
              case MessageType.Error: {
                errored = true, done = true;
                sink.error(message.payload);
                releaser();
                return;
              }
              case MessageType.Complete: {
                done = true;
                releaser();
                return;
              }
            }
          });
          socket.send(stringifyMessage({
            id,
            type: MessageType.Subscribe,
            payload
          }, replacer));
          releaser = () => {
            if (!done && socket.readyState === WebSocketImpl.OPEN)
              socket.send(stringifyMessage({
                id,
                type: MessageType.Complete
              }, replacer));
            locks--;
            done = true;
            release();
          };
          await waitForReleaseOrThrowOnClose.finally(unlisten);
          return;
        } catch (errOrCloseEvent) {
          if (!shouldRetryConnectOrThrow(errOrCloseEvent))
            return;
        }
      }
    })().then(() => {
      if (!errored)
        sink.complete();
    }).catch((err) => {
      sink.error(err);
    });
    return () => {
      if (!done)
        releaser();
    };
  }
  return {
    on: emitter.on,
    subscribe,
    iterate(request) {
      const pending = [];
      const deferred = {
        done: false,
        error: null,
        resolve: () => {
        }
      };
      const dispose = subscribe(request, {
        next(val) {
          pending.push(val);
          deferred.resolve();
        },
        error(err) {
          deferred.done = true;
          deferred.error = err;
          deferred.resolve();
        },
        complete() {
          deferred.done = true;
          deferred.resolve();
        }
      });
      const iterator = function iterator2() {
        return __asyncGenerator2(this, arguments, function* iterator_1() {
          for (; ; ) {
            if (!pending.length) {
              yield __await2(new Promise((resolve) => deferred.resolve = resolve));
            }
            while (pending.length) {
              yield yield __await2(pending.shift());
            }
            if (deferred.error) {
              throw deferred.error;
            }
            if (deferred.done) {
              return yield __await2(void 0);
            }
          }
        });
      }();
      iterator.throw = async (err) => {
        if (!deferred.done) {
          deferred.done = true;
          deferred.error = err;
          deferred.resolve();
        }
        return { done: true, value: void 0 };
      };
      iterator.return = async () => {
        dispose();
        return { done: true, value: void 0 };
      };
      return iterator;
    },
    async dispose() {
      disposed = true;
      if (connecting) {
        const [socket] = await connecting;
        socket.close(1e3, "Normal Closure");
      }
    },
    terminate() {
      if (connecting) {
        emitter.emit("closed", new TerminatedCloseEvent());
      }
    }
  };
}
var TerminatedCloseEvent = class extends Error {
  constructor() {
    super(...arguments);
    this.name = "TerminatedCloseEvent";
    this.message = "4499: Terminated";
    this.code = 4499;
    this.reason = "Terminated";
    this.wasClean = false;
  }
};
function isLikeCloseEvent(val) {
  return isObject(val) && "code" in val && "reason" in val;
}
function isFatalInternalCloseCode(code) {
  if ([
    1e3,
    1001,
    1006,
    1005,
    1012,
    1013,
    1014
  ].includes(code))
    return false;
  return code >= 1e3 && code <= 1999;
}
function isWebSocket(val) {
  return typeof val === "function" && "constructor" in val && "CLOSED" in val && "CLOSING" in val && "CONNECTING" in val && "OPEN" in val;
}

// src/createGraphQLLinks.js
var createGraphQLLinks_default = (graphQLURL, options) => {
  var _a, _b;
  const mergedOptions = {
    createHTTPLink: true,
    createWSLink: true,
    createRetryLink: true,
    ...options
  };
  const httpURLToWS = (url) => {
    return url.replace(/(http)(s)?:\/\//, "ws$2://");
  };
  let httpLink = null;
  if (mergedOptions.createHTTPLink) {
    const authLink = ((_a = mergedOptions.httpLinkOptions) == null ? void 0 : _a.setContext) ? (0, import_context.setContext)((_b = mergedOptions.httpLinkOptions) == null ? void 0 : _b.setContext) : void 0;
    const httpLinkOptions = {
      uri: graphQLURL,
      ...mergedOptions.httpLinkOptions
    };
    if (typeof httpLinkOptions.fetch !== "function" && typeof fetch !== "function")
      throw new Error(`Missing fetch implementation from node or window.fetch or options.httpLinkOptions.fetch`);
    httpLink = authLink ? authLink.concat(new import_http.HttpLink(httpLinkOptions)) : new import_http.HttpLink(httpLinkOptions);
  }
  let wsLink = null;
  let subscriptionClient = null;
  if (mergedOptions.createWSLink) {
    const wsSubprotocol = mergedOptions.wsSubprotocol ? mergedOptions.wsSubprotocol.toLowerCase() : "graphql-ws";
    const wsLinkOptions = {
      reconnect: true,
      ...mergedOptions.wsLinkOptions,
      connectionParams: async (...args) => {
        var _a2, _b2;
        const params = ((_a2 = mergedOptions.wsLinkOptions) == null ? void 0 : _a2.connectionParams) ? await ((_b2 = mergedOptions.wsLinkOptions) == null ? void 0 : _b2.connectionParams(...args)) : {};
        return {
          ...params,
          headers: {
            "sec-websocket-protocol": wsSubprotocol,
            ...params.headers
          }
        };
      }
    };
    if (typeof options.websocket !== "function" && (typeof window !== "object" || typeof window.WebSocket !== "function"))
      throw new Error(`Missing websocket implementation on window.WebSocket or options.websocket`);
    const websocketImplementation = typeof options.websocket === "function" ? options.websocket : window.WebSocket;
    if (wsSubprotocol === "graphql-transport-ws") {
      subscriptionClient = createClient({
        webSocketImpl: websocketImplementation,
        url: httpURLToWS(graphQLURL),
        ...wsLinkOptions
      });
      wsLink = new import_subscriptions.GraphQLWsLink(subscriptionClient);
    } else if (wsSubprotocol === "graphql-ws") {
      subscriptionClient = new import_subscriptions_transport_ws.SubscriptionClient(httpURLToWS(graphQLURL), wsLinkOptions, websocketImplementation);
      wsLink = new import_ws.WebSocketLink(subscriptionClient);
    } else
      throw new Error(`Unknown wsSubprotocol`);
  }
  let transportLink = null;
  if (httpLink !== null && wsLink !== null) {
    transportLink = (0, import_core2.split)(
      ({ query }) => {
        const { kind, operation } = (0, import_utilities.getMainDefinition)(query);
        return kind === "OperationDefinition" && operation === "subscription";
      },
      wsLink,
      httpLink
    );
  } else if (wsLink !== null)
    transportLink = wsLink;
  else if (httpLink !== null)
    transportLink = httpLink;
  let retryLink;
  if (mergedOptions.createRetryLink) {
    retryLink = new import_retry.RetryLink({
      ...mergedOptions.retryLinkOptions
    });
  }
  const links = [transportLink];
  if (retryLink)
    links.unshift(retryLink);
  if (mergedOptions.middleware)
    links.unshift(mergedOptions.middleware);
  return {
    link: (0, import_core2.concat)(...links),
    httpLink,
    wsLink,
    transportLink,
    retryLink,
    subscriptionClient
  };
};

// src/createGraphQLClient.js
var createGraphQLClient_default = (graphQLURL, passedOptions = {}) => {
  const options = {
    resolvers: {},
    ...passedOptions
  };
  const links = createGraphQLLinks_default(graphQLURL, options);
  const defaultApolloOptions = typeof options.defaultApolloOptions === "object" && options.defaultApolloOptions !== null ? options.defaultApolloOptions : {};
  const cache = typeof options.cache === "object" && options.cache !== null ? options.cache : new import_cache.InMemoryCache();
  const client = new ApolloClientWithGQL_default({
    cache,
    link: links.link,
    defaultOptions: defaultApolloOptions,
    resolvers: options.resolvers
  });
  return {
    ...links,
    client,
    cache
  };
};

// src/exports.js
__reExport(exports_exports, require("@apollo/client/cache/cache.cjs"), module.exports);
__reExport(exports_exports, require("@apollo/client/core/core.cjs"), module.exports);
__reExport(exports_exports, require("@apollo/client/link/core/core.cjs"), module.exports);
var exports_default = createGraphQLClient_default;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createGraphQLClient,
  createGraphQLLinks
});

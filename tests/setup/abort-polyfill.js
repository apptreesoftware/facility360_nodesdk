// jest 24's sandboxed environment predates and does not expose the AbortController /
// AbortSignal globals that Node 20 provides at runtime. This minimal polyfill only fills
// the gap inside tests; real callers on Node 20 use the native implementation. It supports
// exactly the surface the SDK's AbortSignal->CancelToken bridge relies on: `aborted`,
// `addEventListener('abort', cb, { once })`, and `abort()`.
if (typeof global.AbortController === 'undefined') {
  class Signal {
    constructor() {
      this.aborted = false;
      this._listeners = [];
    }
    addEventListener(type, cb) {
      if (type === 'abort') this._listeners.push(cb);
    }
    removeEventListener(type, cb) {
      if (type === 'abort') this._listeners = this._listeners.filter((l) => l !== cb);
    }
    dispatchEvent() {}
  }
  class Controller {
    constructor() {
      this.signal = new Signal();
    }
    abort() {
      if (this.signal.aborted) return;
      this.signal.aborted = true;
      this.signal._listeners.forEach((cb) => cb());
    }
  }
  global.AbortController = Controller;
  global.AbortSignal = Signal;
}

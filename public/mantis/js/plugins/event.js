(() => {
    class MEvent {
        static #listeners = {};
        static on(selector, event, callback = null) {
            if (!this.#listeners[event]) this.#listeners[event] = [];
            this.#listeners[event].push({ selector, callback });
        }
        static off(event, callback) {
            if (this.#listeners[event]) {
                this.#listeners[event] = this.#listeners[event].filter(
                    (listener) => listener.callback !== callback
                );
            }
        }
        static fire(event, target = null, data = null) {
            if (event instanceof Event) {
                return (target ?? document).dispatchEvent(event);
            }
            let customEvent = new CustomEvent(event, { detail: data });
            if (target) return target.dispatchEvent(customEvent);
            if (this.#listeners[event]) {
                this.#listeners[event].forEach((listener) => {
                    listener.selector.dispatchEvent(customEvent);
                });
            }
        }
    }
    class MElemEvent {
        constructor(MUNode) {
            this.node = MUNode.node;
            MUNode.on = this.on.bind(this);
            MUNode.off = this.off.bind(this);
            MUNode.fire = this.fire.bind(this);
        }

        on(events, selector, callback = null, config = null) {
            if (MU.isObject(events)) {
                let offs = {};
                for (const key in events)
                    offs[key] = this.on(key, selector, events[key], config);
                return offs;
            }
            if (typeof selector === "function") {
                [config, callback, selector] = [callback || {}, selector, null];
            }
            let eventList = Array.isArray(events) ? events : [events];
            const listener = (e, booting = false) => {
                config.data && (e.detail = config.data);
                if (!selector) {
                    callback.call(this.node, e);
                } else {
                    const target = e.target.closest(selector);
                    target &&
                        this.node.contains(target) &&
                        callback.call(target, e);
                }
                if (config.once && !booting) {
                    this.off(eventList, listener);
                }
            };
            eventList.forEach((x) => {
                this.node.addEventListener(x, listener);
                MEvent.on(this.node, x, listener);
            });
            if (config.invoke) listener.call(new Event(eventList[0]), true);
            return {
                events: eventList,
                config,
                remove: () => this.off(eventList, listener),
            };
        }
        off(events, callback) {
            let eventList = Array.isArray(events) ? events : [events];
            eventList.forEach((x) => {
                this.node.removeEventListener(x, callback);
                MEvent.off(x, callback);
            });
        }
        fire(event, data = {}) {
            MEvent.fire(event, this.node, data);
        }
    }

    window.MU.fire = MEvent.fire.bind(MEvent);
    window.MU.MUElement.registerPlugin(MElemEvent);
})();

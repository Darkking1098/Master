(() => {
    function $(selector, single = false, context = null) {
        if (typeof selector === "string") {
            if (selector[0] === "#" && !/[.:,\[ >]/.test(selector)) {
                return document.getElementById(selector.slice(1));
            } else {
                return single
                    ? (context ?? document).querySelector(selector)
                    : (context ?? document).querySelectorAll(selector);
            }
        } else if (selector instanceof HTMLElement) return selector;
        throw new TypeError("Selector must be a string or an HTMLElement.");
    }
    function ref(mref, scope = null) {
        return (scope ?? window).MU.$(`[data-mref="${mref}"]`, true, scope);
    }
    function createElement(tag, props = {}, children = []) {
        const element = document.createElement(tag);
        for (let [key, value] of Object.entries(props))
            element.MU.set(key, value);
        children.forEach((child) => element.MU.append(child));
        return element;
    }
    function randInt(min, max = null) {
        if (max == null) max = 0;
        if (min > max) [max, min] = [min, max];
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    function randStr(len, prefix = "", time = false) {
        if (time) prefix = (prefix ?? "") + String(MU.now);
        if (prefix) len -= prefix.length;
        const characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < len; i++) {
            prefix += characters[Math.floor(Math.random() * characters.length)];
        }
        return prefix;
    }
    function camelToSnake(camelCase) {
        return camelCase
            .replace(/([A-Z])/g, "_$1")
            .toLowerCase()
            .replace(/^_/, "");
    }
    function snakeToCamel(snakeCase) {
        return snakeCase.replace(/_./g, (match) => match[1].toUpperCase());
    }
    function route(name, variables) {
        return name.replace(/{([^}]+)}/g, function (_, key) {
            if (!variables[key]) throw new Error(`Missing parameter: ${key}`);
            return variables[key];
        });
    }

    // Block call and extend interval
    function debounce(fn, delay) {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => fn.apply(this, args), delay);
        };
    }

    // Block call till interval
    function throttle(fn, interval) {
        let lastCall = 0;
        return function (...args) {
            const now = Date.now();
            if (now - lastCall >= interval) {
                lastCall = now;
                fn.apply(this, args);
            }
        };
    }

    // Limit call in fix interval
    function limitCalls(func, maxCalls, interval, canQueue = true) {
        let callCount = 0;
        const queue = [];

        setInterval(() => {
            callCount = 0;
            while (queue.length && callCount < maxCalls) {
                const [context, args] = queue.shift();
                func.apply(context, args);
                callCount++;
            }
        }, interval);

        return function (...args) {
            if (callCount < maxCalls) {
                callCount++;
                func.apply(this, args);
            } else if (canQueue) queue.push([this, args]);
        };
    }

    window.MU = {
        $: $,
        $MU: $,
        $ref: ref,
        randInt: randInt,
        randStr: randStr,
        createElement: createElement,
        camelToSnake: camelToSnake,
        snakeToCamel: snakeToCamel,
        route: route,
        debounce: debounce,
        throttle: throttle,
        limitCalls: limitCalls,
        ready: (fxn) => {
            window.addEventListener("DOMContentLoaded", fxn);
        },
        getNestedValue(obj, path) {
            return path.split(".").reduce((acc, part) => acc && acc[part], obj);
        },
        isObject: (x) =>
            typeof x === "object" && x !== null && x.constructor === Object,
        ensureArray: (b) => (b == null ? [] : Array.isArray(b) ? b : [b]),
        get now() {
            return Date.now();
        },
        get scrollPercentage() {
            return Math.max(
                0,
                (
                    (window.scrollY * 100) /
                    (document.documentElement.scrollHeight - innerHeight)
                ).toFixed(2)
            );
        },
        sleep(ms) {
            return new Promise((resolve) => setTimeout(resolve, ms));
        },
    };
    window.$ = $;
})();

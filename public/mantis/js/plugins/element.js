(() => {
    class MUElement {
        static plugins = [];
        #cache = {};
        #plugins = [];
        constructor(element) {
            this.node = element;
            this.config = this.data("config")
                ? MU.getNestedValue(window, this.data("config"))
                : {};
            this.#plugins = [];
            this.reboot();
        }
        reboot() {
            MUElement.plugins.forEach((plugin) => {
                if (!(plugin.name in this.#plugins)) {
                    this.#plugins[plugin.name] = new plugin(this);
                }
            });
        }
        cache(key, value = null) {
            if (value) {
                this.#cache[key] = value;
            }
            return this.#cache[key] ?? value;
        }
        $(selector, single = false) {
            return MU.$(selector, single, this.node);
        }
        parent(selector = null) {
            return selector ? this.closest(selector) : this.node.parentElement;
        }
        siblings(options = {}) {
            const { selector = "*", direction = "both" } = options;
            let siblings = [...this.node.parentNode.children].filter(
                (sibling) => sibling !== this.node
            );
            if (direction === "previous") {
                siblings = siblings.filter(
                    (sibling) =>
                        sibling.compareDocumentPosition(this.node) &
                        Node.DOCUMENT_POSITION_PRECEDING
                );
            } else if (direction === "next") {
                siblings = siblings.filter(
                    (sibling) =>
                        sibling.compareDocumentPosition(this.node) &
                        Node.DOCUMENT_POSITION_FOLLOWING
                );
            }
            if (selector !== "*") {
                siblings = siblings.filter((sibling) =>
                    sibling.matches(selector)
                );
            }
            return siblings;
        }
        remove(selector = null) {
            if (!selector) this.node.remove();
            this.$(selector).MU.remove();
        }
        has(attr) {
            return this.node.hasAttribute(attr);
        }
        get(attr, def = null) {
            return this.node.getAttribute(attr) ?? def;
        }
        set(attr, val) {
            if (attr in this.node) {
                this.node[attr] = val;
                return this;
            }
            this.node.setAttribute(attr, val);
            return this;
        }
        attr(attr, val = null) {
            if (val !== null) return this.set(attr, val);
            return this.get(attr);
        }
        data(attr, val = null) {
            attr = "data-" + attr;
            if (val) return this.set(attr, val);
            return this.get(attr);
        }
        bounds() {
            return this.node.getBoundingClientRect();
        }
        isVisible() {
            const rect = this.bounds();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= window.innerHeight &&
                rect.right <= window.innerWidth
            );
        }
        html(content = null) {
            if (content !== null) {
                if (typeof content == "string") this.node.innerHTML = content;
                else {
                    this.node.innerHTML = "";
                    return this.insert(content, 2);
                }
                return this;
            }
            return this.node.innerHTML;
        }
        closest(selector) {
            return this.node.closest(selector);
        }
        hasClass(className) {
            return this.node.classList.contains(className);
        }
        addClass(className, delay = null) {
            let classes =
                typeof className == "string" ? className.split(" ") : className;
            if (delay) setTimeout(() => this.addClass(className), delay);
            else this.node.classList.add(...classes);
            return this;
        }
        removeClass(className, timeout = null) {
            if (timeout) {
                setTimeout(() => this.removeClass(className), timeout);
            } else {
                if (className == "*") {
                    this.node.classList = [];
                } else {
                    let classes =
                        typeof className == "string"
                            ? className.split(" ")
                            : className;
                    this.node.classList.remove(...classes);
                }
            }
            return this;
        }
        switchClass(add, remove, reverse = false) {
            if (reverse) [add, remove] = [remove, add];
            return this.addClass(add).removeClass(remove);
        }
        toggleClass(className, force) {
            if (typeof force === "function")
                force = force.call(this.node, this.node);
            if (typeof force === "boolean") {
                force ? this.addClass(className) : this.removeClass(className);
            } else {
                this.node.classList.toggle(className);
            }
            return this;
        }
        timeoutClass(className, delay = 3000) {
            this.toggleClass(className);
            setTimeout(() => this.toggleClass(className), delay);
            return this;
        }
        css(prop, val = null) {
            if (val !== null) {
                let styles = typeof prop === "object" ? prop : {};
                if (typeof prop !== "object") styles[prop] = val;
                for (const key in styles) this.node.style[key] = styles[key];
            } else if (typeof prop === "string") {
                if (prop.includes(":")) {
                    let props = {};
                    prop.split(";").map((x) => {
                        let y = x.split(":");
                        props[y[0]] = y[1];
                    });
                    this.css(props);
                } else return getComputedStyle(this.node)[prop];
            }
            return this;
        }
        removeCss(prop) {
            MU.ensureArray(prop).forEach((x) => {
                this.node.style.removeProperty(x);
            });
            return this;
        }
        insert(content, position = 2) {
            let p = ["beforebegin", "afterbegin", "beforeend", "afterend"];
            const pos = p[position];

            if (content instanceof HTMLTemplateElement) {
                content = content.cloneNode(true).content;
            }
            if (content instanceof Node) {
                switch (pos) {
                    case "beforebegin":
                        this.node.before(content);
                        break;
                    case "afterbegin":
                        this.node.prepend(content);
                        break;
                    case "beforeend":
                        this.node.append(content);
                        break;
                    case "afterend":
                        this.node.after(content);
                        break;
                }
                return this;
            }
            this.node.insertAdjacentHTML(pos, content);
            return this;
        }
        appendBefore(content) {
            return this.insert(content, 0);
        }
        prepend(content) {
            return this.insert(content, 1);
        }
        append(content) {
            return this.insert(content, 2);
        }
        appendAfter(content) {
            return this.insert(content, 3);
        }
        ref(reset = false) {
            let ref;
            if ((ref = this.data("mref")) && !reset) return ref;
            do {
                ref = MU.randStr(8);
            } while (window.MU.$ref(ref));
            this.data("mref", ref);
            return ref;
        }
        setOrigional() {
            this.data("mparent", this.ref());
            this.ref(true);
        }
        origional(scope = null) {
            return window.MU.$ref(this.data("mparent"), scope);
        }
        clones() {
            return $(`[data-mparent=${this.data("mref")}]`);
        }
        clone(quick = false) {
            if (quick) return this.node.cloneNode(true);
            this.ref();
            this.$(":not([data-mref])").MU.perform((x) => x.MU.ref());
            let cloned = this.node.cloneNode(true);
            cloned.MU.setOrigional();
            cloned.MU.$("[data-mref]").MU.perform((x) => {
                x.MU.setOrigional();
                if (x instanceof HTMLOptionElement) cloned.value = x.value;
            });
            return cloned;
        }
        mjs(attr, val = null) {
            attr = "data-mjs-" + attr;
            if (val) return this.set(attr, val);
            let value = this.get(attr);
            return function () {
                eval(value);
            }.bind(this.node);
        }
        replaceWith(node) {
            this.node.replaceWith(node);
            this.node = node;
            this.node.MURef = this;
        }
        replaceOrigional() {
            this.origional().MU.replaceWith(this.node);
        }
        static registerPlugin(x) {
            this.plugins.push(x);
            x.autoboot && x.autoboot();
        }
    }
    Object.defineProperty(HTMLElement.prototype, "MU", {
        get() {
            return (this.MURef ??= new MUElement(this));
        },
    });
    window.MU.MUElement = MUElement;
})();

(() => {
    class MUElementList {
        constructor(nodeList) {
            this.nodeList = [...nodeList];
        }
        perform(x) {
            for (let i = 0; i < this.nodeList.length; i++) {
                x(this.nodeList[i], i, this.nodeList);
            }
            return this;
        }
        set(attr, val) {
            return this.perform((x) => x.setAttribute(attr, val));
        }
        addClass(className) {
            return this.perform((x) => x.MU.addClass(className));
        }
        removeClass(className) {
            return this.perform((x) => x.MU.removeClass(className));
        }
        toggleClass(classNames, force) {
            return this.perform((x) => x.MU.toggleClass(classNames, force));
        }
        css(prop, val = null) {
            return this.perform((x) => x.MU.css(prop, val));
        }
        remove(selector = null) {
            return this.perform((x) => x.remove(selector));
        }
        html(content) {
            return this.perform((x) => x.MU.html(content));
        }
        reboot() {
            return this.perform((x) => {
                // if ("MURef" in x)
                    x.MU.reboot();
            });
        }
    }
    Object.defineProperty(HTMLCollection.prototype, "MU", {
        get() {
            return (this.MURef ??= new MUElementList(this));
        },
    });
    Object.defineProperty(NodeList.prototype, "MU", {
        get() {
            return (this.MURef ??= new MUElementList(this));
        },
    });
    window.MU.MUElementList = MUElementList;
    $("[data-mref]").MU.perform((x) => x.MU.ref());
    $("[data-mjs-onboot]").MU.perform((x) => {
        x.MU.mjs("onboot")(x);
    });
})();

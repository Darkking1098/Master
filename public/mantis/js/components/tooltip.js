(() => {
    class Tooltip {
        constructor(MUNode) {
            let tip = MUNode.$(":scope >.mu-tooltip", true);
            if (!tip) return;
            this.MUNode = MUNode;
            this.tooltip = tip;
            this.buffer = 5;

            this.position =
                tip.MU.data("position") ||
                tip.MU.config.position ||
                "left-center";

            MUNode.on("mouseenter", this.showTip.bind(this));
            MUNode.on("mouseleave", this.hideTip.bind(this));
            document.addEventListener("scroll", this.update.bind(this));
        }
        showTip() {
            this.tooltip.MU.addClass("active");
            this.update();
        }
        hideTip() {
            this.tooltip.MU.removeClass("active");
        }
        update() {
            const CONFIG = {
                EB: this.MUNode.bounds(),
                TB: this.tooltip.MU.bounds(),
            };
            const POS = this.position.split("-");
            let { top, left } = this.#setPrimePosition(POS[0], CONFIG);
            CONFIG.top = top;
            let sec_pos = this.#setSecPosition(POS[1], CONFIG);
            if (sec_pos.left) {
                left = sec_pos.left;
            } else {
                top = sec_pos.top;
            }
            this.tooltip.MU.css({ top: `${top}px`, left: `${left}px` });
        }
        #setPrimePosition(position, config) {
            let left,
                top,
                repeated = config.repeated ?? false;
            config.repeated = true;
            if (position == "top") {
                top = config.EB.top - config.TB.height - this.buffer;
                if (top < 0) {
                    if (!repeated) {
                        return this.#setPrimePosition("bottom", config);
                    } else {
                        config.repeated = false;
                        return this.#setPrimePosition("right", config);
                    }
                }
            } else if (position == "bottom") {
                top = config.EB.bottom + this.buffer;
                if (top + config.TB.height > window.innerHeight) {
                    if (!repeated) {
                        return this.#setPrimePosition("top", config);
                    } else {
                        config.repeated = false;
                        return this.#setPrimePosition("right", config);
                    }
                }
            } else if (position == "left") {
                left = config.EB.left - config.TB.width - this.buffer;
                if (left < 0) {
                    if (!repeated) {
                        return this.#setPrimePosition("right", config);
                    } else {
                        config.repeated = false;
                        return this.#setPrimePosition("bottom", config);
                    }
                }
            } else if (position == "right") {
                left = config.EB.right + this.buffer;
                if (left + config.TB.width > window.innerWidth) {
                    if (!repeated) {
                        return this.#setPrimePosition("left", config);
                    } else {
                        config.repeated = false;
                        return this.#setPrimePosition("bottom", config);
                    }
                }
            }
            return { left, top };
        }
        #setSecPosition(position, config) {
            let left,
                top,
                repeated = config.repeated ?? false;
            config.repeated = true;
            if (position == "top") {
                top = config.EB.top;
                if (top < 0) {
                    return this.#setSecPosition("center", config);
                }
            } else if (position == "left") {
                left = config.EB.left;
                if (left < 0) {
                    return this.#setSecPosition("center", config);
                }
            } else if (position == "bottom") {
                top = config.EB.bottom - config.TB.height;
                if (top + config.TB.height > innerHeight) {
                    return this.#setSecPosition("center", config);
                }
            } else if (position == "right") {
                left = config.EB.right - config.TB.width;
                if (left + config.TB.width > window.innerWidth) {
                    return this.#setSecPosition("center", config);
                }
            } else if (position == "center") {
                if (!config.top) {
                    top =
                        config.EB.top -
                        config.TB.height / 2 +
                        config.EB.height / 2;
                    if (top < 0) {
                        return this.#setSecPosition("bottom", config);
                    } else if (top + config.TB.height > innerHeight) {
                        return this.#setSecPosition("top", config);
                    }
                } else {
                    left =
                        config.EB.left -
                        config.TB.width / 2 +
                        config.EB.width / 2;
                    if (left < 0) {
                        return this.#setSecPosition("left", config);
                    } else if (left + config.TB.width > window.innerWidth) {
                        return this.#setSecPosition("right", config);
                    }
                }
            }
            return { left, top };
        }
        static autoboot() {
            $(":has(>.mu-tooltip)").MU.reboot();
        }
    }
    MU.MUElement.registerPlugin(Tooltip);
})();

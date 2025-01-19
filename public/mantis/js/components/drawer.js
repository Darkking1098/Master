(() => {
    class MDrawer {
        constructor(MUElement) {
            if (!MUElement.hasClass("mu-drawer")) return;
            this.MUElement = MUElement;
            this.wrapper = MUElement.$(".drawer_wrapper")[0];

            Object.defineProperty(MUElement, "propertyName", {
                get: () => this.isOpen,
                configurable: false,
                enumerable: false,
            });

            MUElement.showDrawer = this.showDrawer.bind(this);
            MUElement.toggleDrawer = this.toggleDrawer.bind(this);
            MUElement.hideDrawer = this.hideDrawer.bind(this);
            MUElement.$(".close_btn")?.MU.perform((x) =>
                x.MU.on("click", MUElement.hideDrawer)
            );

            window.addEventListener("popstate", (event) => {
                if (event.state && event.state.drawer) this.hideDrawer();
            });
        }
        get isOpen() {
            return this.MUElement.hasClass("active");
        }
        setConfig() {}
        showDrawer(event = null) {
            if (this.isOpen) return;
            if (event) event.stopPropagation();
            const DOM_HIDE = () => {
                if (!this.wrapper.contains(event.target)) {
                    document.removeEventListener("click", DOM_HIDE);
                    this.hideDrawer();
                }
            };
            if (this.MUElement.has("data-domhide")) {
                document.removeEventListener("click", DOM_HIDE);
                document.addEventListener("click", DOM_HIDE);
            }
            this.MUElement.addClass("active");
            history.pushState({ drawer: true }, "Drawer");
        }
        hideDrawer() {
            if (!this.isOpen) return;
            this.MUElement.removeClass("active");
            history.back();
        }
        toggleDrawer(force = false) {
            this.isOpen && !force ? this.hideDrawer() : this.showDrawer();
        }
        static autoboot() {
            $(".mu-drawer").MU.reboot();
        }
        static autoboot_reference() {
            $("[data-drawer]")?.MU.perform((x) => {
                if (x.MU.showDrawer || x.MU.hideDrawer || x.MU.toggleDrawer)
                    return;
                let type = x.MU.data("type");
                let drawer = $(`#${x.MU.data("drawer")}`).MU;
                if (!type || type == "toggle") {
                    x.MU.showDrawer = drawer.showDrawer;
                    x.MU.hideDrawer = drawer.hideDrawer;
                    x.MU.toggleDrawer = drawer.toggleDrawer;
                    x.MU.on("click", drawer.toggleDrawer);
                } else if (type == "show") {
                    x.MU.showDrawer = drawer.showDrawer;
                    x.MU.on("click", drawer.showDrawer);
                } else {
                    x.MU.hideDrawer = drawer.hideDrawer;
                    x.MU.on("click", drawer.hideDrawer);
                }
            });
        }
    }
    MU.ready(() => {
        MU.MUElement.registerPlugin(MDrawer);
        MDrawer.autoboot_reference();
    });
})();

(() => {
    class MPopup {
        constructor(MUElement) {
            if (!MUElement.hasClass("mu-popup")) return;
            this.MUElement = MUElement;
            this.wrapper = MUElement.$(".popup_wrapper")[0];

            MUElement.isOpen = () => this.isOpen;
            MUElement.showPopup = this.showPopup.bind(this);
            MUElement.togglePopup = this.togglePopup.bind(this);
            MUElement.hidePopup = this.hidePopup.bind(this);
            MUElement.$(".close_btn")?.MU.perform((x) =>
                x.MU.on("click", MUElement.hidePopup)
            );

            window.addEventListener("popstate", (event) => {
                if (event.state && event.state.popup) this.hidePopup();
            });
        }
        get isOpen() {
            return this.MUElement.hasClass("active");
        }
        setConfig() {}
        showPopup(event = null) {
            if (this.isOpen) return;
            if (event) event.stopPropagation();
            const DOM_HIDE = () => {
                if (!this.wrapper.contains(event.target)) {
                    document.removeEventListener("click", DOM_HIDE);
                    this.hidePopup();
                }
            };
            if (this.MUElement.has("data-domhide")) {
                document.removeEventListener("click", DOM_HIDE);
                document.addEventListener("click", DOM_HIDE);
            }
            this.MUElement.addClass("active");
            history.pushState({ popup: true }, "Popup");
        }
        hidePopup() {
            if (!this.isOpen) return;
            this.MUElement.removeClass("active");
            history.back();
        }
        togglePopup(force = false) {
            this.isOpen && !force ? this.hidePopup() : this.showPopup();
        }
        static autoboot() {
            $(".mu-popup").MU.reboot();
        }
        static autoboot_reference() {
            $("[data-popup]")?.MU.perform((x) => {
                if (x.MU.showPopup || x.MU.hidePopup || x.MU.togglePopup)
                    return;
                let type = x.MU.data("type") ?? x.MU.config?.type;
                let popup = $(`#${x.MU.data("popup")}`).MU;
                if (!type || type == "toggle") {
                    x.MU.showPopup = popup.showPopup;
                    x.MU.hidePopup = popup.hidePopup;
                    x.MU.togglePopup = popup.togglePopup;
                    x.MU.on("click", popup.togglePopup);
                } else if (type == "show") {
                    x.MU.showPopup = popup.showPopup;
                    x.MU.on("click", popup.showPopup);
                } else {
                    x.MU.hidePopup = popup.hidePopup;
                    x.MU.on("click", popup.hidePopup);
                }
            });
        }
    }
    MU.ready(() => {
        MU.MUElement.registerPlugin(MPopup);
        MPopup.autoboot_reference();
    });
})();

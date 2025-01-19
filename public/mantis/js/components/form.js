let submittedForm;
(() => {
    class MForm {
        #states = {};
        constructor(MUNode) {
            this.MUNode = MUNode;
            this.node = MUNode.node;
            if (!this.#isForm()) return false;
            this.lastSubmitted;

            this.isPshudo = !(this.node instanceof HTMLFormElement);
            this.viaAjax = false;
            this.neglect = MUNode.data("neglect") ?? ".hidden";
            MUNode.has("mvalidate") && MUNode.set("novalidate", true);

            this.save_state("default");

            // State Managment
            MUNode.get_states = this.get_states.bind(this);
            MUNode.save_state = this.save_state.bind(this);
            MUNode.restore_state = this.restore_state.bind(this);
            MUNode.remove_state = this.remove_state.bind(this);

            // Serializing data
            MUNode.serialize = this.serialize.bind(this);
            MUNode.serializeString = this.serializeString.bind(this);
            MUNode.serializeJson = this.serializeJson.bind(this);

            // Validating and submittion
            MUNode.virtualForm = this.virtualForm.bind(this);
            MUNode.validate = this.validate.bind(this);
            MUNode.submit = this.submit.bind(this);
            MUNode.configSubmit = this.configSubmit.bind(this);
            MUNode.ajaxSubmit = this.ajaxSubmit.bind(this);
            MUNode.reset = this.reset.bind(this);
        }
        #isForm(node = null) {
            node = node ? node.MU : this.MUNode;
            return (
                node.node instanceof HTMLFormElement || node.hasClass("mu-form")
            );
        }
        #createForm(child = []) {
            let method = this.MUNode.data("method");
            let action = this.MUNode.data("action");
            let enctype = this.MUNode.data(
                "enctype",
                "application/x-www-form-urlencoded"
            );
            return MU.createElement("form", { method, action, enctype }, child);
        }
        serialize(neglect = true) {
            return new FormData(this.virtualForm(neglect));
        }
        serializeString(neglect = true) {
            return this.serialize(neglect).MU.toString();
        }
        serializeJson(neglect = true) {
            return this.serialize(neglect).MU.toJson();
        }
        virtualForm() {
            let clone = this.MUNode.clone();
            let vForm = this.isPshudo ? this.#createForm([clone]) : clone;
            this.neglect && vForm.MU.remove(this.neglect);
            return vForm;
        }
        invalidFields() {
            return [...this.virtualForm().MU.$(":invalid")].map((x) =>
                x.MU.origional()
            );
        }
        validate() {
            let invalids = this.invalidFields();
            for (let invalid of invalids) {
                invalid.MU.validate
                    ? invalid.MU.validate()
                    : invalid.reportValidity();
            }
            return !invalids.length;
        }
        submit() {
            this.virtualForm().submit();
        }
        configSubmit(config) {
            this.node.addEventListener("submit", async (e) => {
                e.preventDefault();
                if (!this.MUNode.validate()) {
                    return console.warn("Validation failed.");
                }
                if (!config.beforeSubmit || (await config.beforeSubmit())) {
                    this.neglect && this.MUNode.remove(this.neglect);
                    this.node.submit();
                } else console.log("Submission prevented !!!");
            });
        }
        ajaxSubmit(config) {
            this.viaAjax = true;
            this.ajaxConfig = config;
            this.node.addEventListener("submit", async (e) => {
                e.preventDefault();
                if (this.MUNode.validate()) {
                    config.beforeSubmit && (await config.beforeSubmit());
                    this.executeAjaxSubmit();
                }
            });
        }
        executeAjaxSubmit() {
            let form = this.virtualForm();
            return MU.ajax({
                form: form,
                url: form.MU.get("action"),
                method: form.MU.get("method"),
                enctype: form.MU.get("enctype"),
                ...this.ajaxConfig,
            });
        }
        reset() {
            this.restore_state("default");
        }
        get_states() {
            return this.#states;
        }
        async save_state(state, submit = false) {
            this.#states[state] = this.node.cloneNode(true);
            if (submit) {
                submittedForm = this.lastSubmitted = this.#states[state];
            }
        }
        restore_state(state) {
            this.MUNode.replaceWith(this.#states[state].cloneNode(true));
        }
        remove_state(state) {
            state !== "default" && delete this.#states[state];
        }
        static autoboot() {
            $(".mu-form").MU.reboot();
        }
    }
    MU.MUElement.registerPlugin(MForm);
    MU.MForm = MForm;
})();

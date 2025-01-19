(() => {
    class MUFormData {
        constructor(formData) {
            this.formData = formData;
        }
        appendData(value, prefix = null) {
            if (prefix)
                prefix = prefix.split(".").reduce((x, y) => `${x}[${y}]`);
            if (Array.isArray(value)) {
                this.appendArray(value, prefix);
            } else if (value instanceof FormData) {
                this.appendFormData(value);
            } else if (typeof value === "object") {
                this.appendObject(value, prefix);
            } else {
                if (!prefix) return;
                this.formData.append(prefix, value);
            }
        }
        appendArray(value, prefix) {
            if (!Array.isArray(value) || !prefix) return;
            value.forEach((item) => this.appendData(item, `${prefix}[]`));
        }
        appendObject(value, prefix = null) {
            if (typeof value !== "object" || value === null) return;

            for (const key in value)
                this.appendData(value[key], prefix ? `${prefix}[${key}]` : key);
        }
        appendFormData(value, prefix = null) {
            if (!(value instanceof FormData)) return;

            for (const [key, val] of value.entries())
                this.appendData(val, prefix ? `${prefix}[${key}]` : key);
        }
        entries(prefix = null) {
            let entries = [];
            if (prefix)
                prefix = prefix.split(".").reduce((x, y) => `${x}[${y}]`);
            for (const [key, value] of this.formData.entries()) {
                if (!prefix || key.startsWith(prefix)) {
                    entries.push([key, value]);
                    continue;
                }
            }
            return entries;
        }
        static fromArray(value, prefix) {
            let formData = new FormData();
            formData.MU.appendData(value, prefix);
            return formData;
        }
        static fromObject(value, prefix) {
            let formData = new FormData();
            formData.MU.appendData(value, prefix);
            return formData;
        }
        toJson(entries = null) {
            const jsonObject = {};
            entries ??= this.formData.entries();
            entries.forEach(([key, value]) => {
                if (key.includes("[") && key.includes("]")) {
                    const keys = key.match(/[^[\]]+/g);
                    keys.reduce((acc, part, index) => {
                        if (index === keys.length - 1) {
                            if (part === "") {
                                if (!Array.isArray(acc)) acc = [];
                                acc.push(value);
                            } else {
                                if (Array.isArray(acc[part])) {
                                    acc[part].push(value);
                                } else if (acc[part] !== undefined) {
                                    acc[part] = [acc[part], value];
                                } else {
                                    acc[part] = value;
                                }
                            }
                        } else {
                            if (!acc[part]) acc[part] = {};
                            return acc[part];
                        }
                        return acc;
                    }, jsonObject);
                } else {
                    if (jsonObject[key] !== undefined) {
                        if (Array.isArray(jsonObject[key])) {
                            jsonObject[key].push(value);
                        } else {
                            jsonObject[key] = [jsonObject[key], value];
                        }
                    } else jsonObject[key] = value;
                }
            });
            return jsonObject;
        }
        toString() {
            return new URLSearchParams(this.formData).toString();
        }
        empty() {
            this.formData = new FormData();
        }
        has(key) {
            return this.formData.has(key);
        }
        remove(key) {
            this.entries(key).map(([key, value]) => this.formData.delete(key));
        }
        get(key) {
            let data = this.entries(key);
            if (data.length == 1) return data[0][1];
            return this.toJson(data);
        }
    }

    // Extend FormData prototype with MUFormData methods
    Object.defineProperty(FormData.prototype, "MU", {
        get() {
            return (this.MURef ??= new MUFormData(this));
        },
    });

    MU.MUFormData = MUFormData;
})();

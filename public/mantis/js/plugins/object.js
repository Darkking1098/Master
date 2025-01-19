(() => {
    class MUObject {
        constructor(object) {
            this.object = object;
        }
        deepCopy() {
            return structuredClone(this.object);
        }
        copyExcept(except) {
            const copied = {};
            Object.keys(this.object).forEach((key) => {
                if (
                    !Array.isArray(except)
                        ? except.includes(key)
                        : except.some((e) => key.startsWith(e))
                ) {
                    copied[key] = this.object[key];
                } else {
                    Object.defineProperty(copied, key, {
                        get() {
                            return this.object[key];
                        },
                        set(value) {
                            this.object[key] = value;
                        },
                        enumerable: true,
                    });
                }
            });

            return copied;
        }
    }
    Object.defineProperty(Object.prototype, "MU", {
        get() {
            return new MUObject(this);
        },
        set([key, value]) {
            this[key] = value;
        },
        configurable: true,
        enumerable: false,
    });
    window.MU.MUObject = MUObject;
})();

(() => {
    class MUObserver {
        static observers = new Map();

        static init(targetNode, config = { childList: true, subtree: true }) {
            if (!this.observers.has(targetNode)) {
                const observer = new MutationObserver(
                    this.#handleMutations.bind(this)
                );
                observer.callbacks = [];
                observer.observe(targetNode, config);
                this.observers.set(targetNode, observer);
            }
            return MUObserver;
        }

        static addCallback(targetNode, callback) {
            const observer = this.observers.get(targetNode);
            if (observer) {
                observer.callbacks.push(callback);
            }
        }

        static #handleMutations(mutationsList, observer) {
            observer.callbacks.forEach((callback) =>
                callback(mutationsList, observer)
            );
        }

        static disconnect(targetNode) {
            const observer = this.observers.get(targetNode);
            if (observer) {
                observer.disconnect();
                this.observers.delete(targetNode);
            }
        }

        static disconnectAll() {
            this.observers.forEach((observer, targetNode) =>
                this.disconnect(targetNode)
            );
        }

        static pause(targetNode) {
            const observer = this.observers.get(targetNode);
            if (observer) observer.disconnect();
        }

        static resume(targetNode, config = { childList: true, subtree: true }) {
            const observer = this.observers.get(targetNode);
            if (observer) observer.observe(targetNode, config);
        }

        static isActive(targetNode) {
            return this.observers.has(targetNode);
        }
    }
    window.MU.MUObserver = MUObserver;
})();

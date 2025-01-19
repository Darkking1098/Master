(() => {
    class MUTemplate {
        constructor(MUNode) {
            if (MUNode.node instanceof HTMLTemplateElement) {
                this.node = MUNode.node;
                this.MUNode = MUNode;
                MUNode.render = (data) => this.render(data);
            }
        }

        render(data) {
            const clone = this.node.cloneNode(true);
            this.processTemplate(clone, data);
            let HTML = this.passParams(clone, data);
            const template = document.createElement("template");
            template.innerHTML = HTML;
            return template.content.firstChild;
        }

        processTemplate(element, data) {
            const ifElements = element.querySelectorAll("[m-if]");
            ifElements.forEach((el) => {
                const condition = el.getAttribute("m-if");
                if (!this.evaluateCondition(condition, data)) {
                    el.remove();
                } else {
                    el.removeAttribute("m-if");
                }
            });

            const forElements = element.querySelectorAll("[m-for]");
            forElements.forEach((el) => {
                const [item, array] = el.getAttribute("m-for").split(" of ");
                const itemsArray = this.getValue(array, data);
                el.removeAttribute("m-for");
                itemsArray.forEach((itemValue) => {
                    const clonedElement = el.cloneNode(true);
                    this.injectLoopData(clonedElement, item, itemValue);
                    el.parentNode.insertBefore(clonedElement, el);
                });

                el.remove();
            });
        }

        passParams(node, params) {
            let HTML = node.innerHTML;
            for (const param in params) {
                const regex = new RegExp(`{\\s*${param}\\s*}`, "g");
                HTML = HTML.replaceAll(regex, params[param]);
            }
            return HTML.trim();
        }

        getTextNodes(element) {
            const textNodes = [];
            const walker = document.createTreeWalker(
                element,
                NodeFilter.SHOW_TEXT,
                null,
                false
            );
            let node;
            while ((node = walker.nextNode())) {
                textNodes.push(node);
            }
            return textNodes;
        }

        evaluateCondition(condition, data) {
            const keys = Object.keys(data);
            let expression = condition;

            keys.forEach((key) => {
                const value = data[key];
                expression = expression.replace(
                    new RegExp(`\\b${key}\\b`, "g"),
                    JSON.stringify(value)
                );
            });

            try {
                return Function('"use strict"; return (' + expression + ")")();
            } catch (e) {
                console.error("Error evaluating condition:", e);
                return false; // Fallback if evaluation fails
            }
        }

        getValue(key, data) {
            return data[key] || [];
        }

        injectLoopData(element, key, itemValue) {
            const placeholder = `{\\s*${key}\\s*}`;
            element.innerHTML = element.innerHTML.replace(
                new RegExp(placeholder, "g"),
                itemValue
            );
        }
    }

    MU.MUElement.registerPlugin(MUTemplate);
})();

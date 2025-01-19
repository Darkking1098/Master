(() => {
    class MUArray {
        constructor(array) {
            this.array = array;
        }
        subtract(b) {
            b = MU.ensureArray(b);
            return this.array.filter((x) => !b.includes(x));
        }
        union(b) {
            b = MU.ensureArray(b);
            return [...new Set([...this.array, ...b])];
        }
        intersect(b) {
            b = MU.ensureArray(b);
            return this.filter((x) => b.includes(x));
        }
        symmetricDifference(b) {
            b = MU.ensureArray(b);
            const unionArray = this.union(b);
            const intersectArray = this.intersect(b);
            return unionArray.filter((x) => !intersectArray.includes(x));
        }
        isSubsetOf(b) {
            b = MU.ensureArray(b);
            return this.every((x) => b.includes(x));
        }
        isSupersetOf(b) {
            b = MU.ensureArray(b);
            return MU.ensureArray(b).every((x) => this.includes(x));
        }
        contains(b) {
            b = MU.ensureArray(b);
            return b.every((e) => this.includes(e));
        }
        notContains(b) {
            b = MU.ensureArray(b);
            return b.every((e) => !this.includes(e));
        }
        isEmpty() {
            return this.length === 0;
        }
        unique() {
            return [...new Set(this)];
        }
        flatten() {
            return this.flat(Infinity);
        }
        at(n) {
            return this[n];
        }
        first(n = 1) {
            return this.array.slice(0, n);
        }
        last(n = 1) {
            return this.array.slice(-n);
        }
        shuffle() {
            for (let i = this.array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [this.array[i], this.array[j]] = [this.array[j], this.array[i]];
            }
            return this.array;
        }
        groupBy(keyFunc) {
            return this.array.reduce((result, item) => {
                const key = keyFunc(item);
                if (!result[key]) {
                    result[key] = [];
                }
                result[key].push(item);
                return result;
            }, {});
        }
        mode() {
            const frequency = this.array.reduce((count, item) => {
                count[item] = (count[item] || 0) + 1;
                return count;
            }, {});
            const maxFreq = Math.max(...Object.values(frequency));
            return Object.keys(frequency).filter(
                (item) => frequency[item] === maxFreq
            );
        }
        median() {
            const sorted = [...this.array].sort((a, b) => a - b);
            const mid = Math.floor(sorted.length / 2);
            return sorted.length % 2 === 0
                ? (sorted[mid - 1] + sorted[mid]) / 2
                : sorted[mid];
        }
        range() {
            return Math.max(...this.array) - Math.min(...this.array);
        }
        hasDuplicates() {
            return new Set(this.array).size !== this.array.length;
        }
        sort(asc = true) {
            if (asc) return [...this.array].sort((a, b) => a - b);
            return [...this.array].sort((a, b) => b - a);
        }
    }
    Object.defineProperty(Array.prototype, "MU", {
        get() {
            return new MUArray(this);
        },
    });
    window.MU.MUArray = MUArray;
})();

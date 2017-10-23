import chroma from 'chroma-js';

const singleton = Symbol('singleton');
const singletonEnforcer = Symbol('singletonEnforcer');

export default class Constants {
    constructor(enforcer) {
        if (enforcer !== singletonEnforcer) {
            throw new Error('Cannot construct singleton');
        }
        this.color = chroma.scale([
            '#ECECBA',
            '#47B6C3',
            '#0A1F56',
        ]);
        this.grades = [0, 30, 100, 300, 1000, 3000, 10000, 30000];
        // pre calculates colors for fast retrieval
        this.colors = new Map();
        for (let i = 0; i < this.grades.length; i++) {
            let color;
            if (i === 0) {
                color = this.color(0);
            } else if (i === this.grades.length - 1) {
                color = this.color(1);
            } else {
                color = this.color((i + 1) / 8);
            }
            this.colors.set(i, color);
        }
    }
    static get instance() {
        if (!this[singleton]) {
            this[singleton] = new Constants(singletonEnforcer);
        }
        return this[singleton];
    }
    getColor(d) {
        switch (true) {
            case d > this.grades[7]: return this.colors.get(7);
            case d > this.grades[6]: return this.colors.get(6);
            case d > this.grades[5]: return this.colors.get(5);
            case d > this.grades[4]: return this.colors.get(4);
            case d > this.grades[3]: return this.colors.get(3);
            case d > this.grades[2]: return this.colors.get(2);
            case d > this.grades[1]: return this.colors.get(1);
            default: return this.colors.get(0);
        }
    }
}

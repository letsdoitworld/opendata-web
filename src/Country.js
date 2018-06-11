export default class Country {
    name;
    code;
    reportCount;
    population;
    tpr;
    constructor(name, code, reportCount, population, tpr) {
        this.name = name || '';
        this.code = code || '';
        this.reportCount = reportCount || 0;
        this.population = population || 0;
        this.tpr = tpr || 0;
    }
}

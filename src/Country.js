export default class Country {
    name;
    reportCount;
    reporters;
    trashStats;
    constructor(name, reportCount, reporters, trashStats) {
        this.name = name || '';
        this.reportCount = reportCount || 0;
        this.reporters = reporters || [];
        this.trashStats = trashStats || [];
    }
}

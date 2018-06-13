import L from 'leaflet'; // eslint-disable-line

export default class Country {
    name;
    code;
    reportCount;
    population;
    tpr;
    bounds;

    constructor(name, code, reportCount, population, tpr, boundsX1, boundsY1, boundsX2, boundsY2) {
        this.name = name || '';
        this.code = code || '';
        this.reportCount = reportCount || 0;
        this.population = population || 0;
        this.tpr = tpr || 0;

        if (boundsX1 == null || boundsY1 == null || boundsX2 == null || boundsY2 == null) {
            return;
        }

        const corner1 = L.latLng(boundsY1, boundsX1);
        const corner2 = L.latLng(boundsY2, boundsX2);
        this.bounds = L.latLngBounds(corner1, corner2);
    }
}

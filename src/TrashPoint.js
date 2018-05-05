export default class TrashPoint {
    id;
    country;

    constructor(layerObject) {
        this.id = layerObject.cartodb_id;
        this.country = layerObject.country;
    }
}

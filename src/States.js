export default class States {
    static get state() {
        return {
            LOADING: 'LOADING',
            LOADED: 'LOADED',
            RUNNING: 'RUNNING',
            ERROR: 'ERROR',
        };
    }
}

import lodash from 'lodash';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {Map, Marker} from 'react-leaflet';
import carto from 'carto.js';
import cartoMapData from '../data/cartoMapData';
import MapFilter from '../details/MapFilter';
import {buildStyle} from '../utils/styleFormatter';

// this is a workaround for https://github.com/PaulLeCam/react-leaflet/issues/255#issuecomment-261904061
import L from 'leaflet'; // eslint-disable-line

delete L.Icon.Default.prototype._getIconUrl;
/**/

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'), // eslint-disable-line
    iconUrl: require('leaflet/dist/images/marker-icon.png'), // eslint-disable-line
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'), // eslint-disable-line
});

// end of workaround

const CARTO_BASEMAP = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}.png';

class WorldMap extends Component {
    static propTypes = {
        apiURL: PropTypes.string,
        selectedTrashPoint: PropTypes.object,
        mapClassName: PropTypes.string,
        history: PropTypes.object,
        selectedCountry: PropTypes.object,
    };

    static get defaultProps() {
        return {
            apiURL: this.apiURL,
            location: this.location,
            selectedTrashPoint: this.selectedTrashPoint,
            mapClassName: this.mapClassName,
            history: this.location,
            selectedCountry: this.selectedCountry,
        };
    }

    constructor(props) {
        super(props);
        this.getSourceFromFilter = this.getSourceFromFilter.bind(this);
        this.createCartoMap = this.createCartoMap.bind(this);
        this.createBasicLayer = this.createBasicLayer.bind(this);
        this.state = {
            center: [46.255847, -10.318359],
            zoom: 2.5,
            nativeMap: undefined,
            layerStyle: cartoMapData.style,
            hidelayers: true,
            cartoClient: new carto.Client({
                apiKey: '7947aa9e7fcdff0f5f8891a5f83b1e6fa6350687',
                username: 'worldcleanupday',
            }),
            marker: null,
            sourceFromFilter: '',
            countryLeafletLayer: null,
        };
    }

    componentDidMount() {
        this.createCartoMap(cartoMapData.source, this.props, true);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedTrashPoint
            && nextProps.selectedTrashPoint !== this.props.selectedTrashPoint) {
            const center = [nextProps.selectedTrashPoint.lat, nextProps.selectedTrashPoint.long];
            this.nativeMap.panTo(center);

            if (this.state.marker) {
                this.nativeMap.removeLayer(this.state.marker);
            }
            const marker = Marker.prototype.createLeafletElement(
                {position: center, pane: this.nativeMap.getPane('markerPane')});
            this.setState({marker});
            marker.addTo(this.nativeMap);
        }

        if (nextProps.selectedCountry
            && nextProps.selectedCountry !== this.props.selectedCountry
            && nextProps.selectedCountry.bounds) {
            this.createCountryLayer(nextProps);
            this.nativeMap.fitBounds(nextProps.selectedCountry.bounds);
        }

        return false;
    }

    shouldComponentUpdate() {
        // always return false otherwise CARTO will complain.
        // all interactions with the map are done programmatically inside componentWillReceiveProps
        return false;
    }

    getSourceFromFilter(data) {
        this.recreateMap(data, this.props);
    }

    recreateMap(source, props) {
        this.nativeMap.eachLayer((layer) => {
            this.nativeMap.removeLayer(layer);
        });
        this.state.cartoClient.removeLayers(this.state.cartoClient.getLayers());
        this.createCartoMap(source, props, true);
    }

    createCartoMap(source, props, shouldCreateBaseLayer) {
        if (shouldCreateBaseLayer) {
            const baseLayer = this.createBasicLayer(source);
            this.state.cartoClient.removeLayers(this.state.cartoClient.getLayers());
            this.state.cartoClient.addLayer(baseLayer);
            this.state.cartoClient.getLeafletLayer().addTo(this.nativeMap);
        }
        if (props && props.selectedCountry) {
            this.createCountryLayer(props);
        }
        this.state.cartoClient.getLeafletLayer().addTo(this.nativeMap);
    }

    createBasicLayer(source) {
        L.tileLayer(CARTO_BASEMAP, {}).addTo(this.nativeMap);
        const cartoSource = new carto.source.SQL(source);
        const cartoStyle = new carto.style.CartoCSS(buildStyle());

        const layer = new carto.layer.Layer(cartoSource, cartoStyle);
        layer.getStyle().setContent(buildStyle());
        layer.setFeatureClickColumns(['id']);
        layer.on('featureClicked', (featureEvent) => {
            const navigateToDetails = `/details/${featureEvent.data.id}`;
            // layer object does not receive this.props updates (carto.js restrictions)
            // thus we check this.props.history instead of this.props.location
            if (this.props.history && this.props.history.location.pathname !== navigateToDetails) {
                this.props.history.push(navigateToDetails);
            }
        });
        return layer;
    }

    createCountryLayer(props) {
        if (props.selectedCountry.code) {
            const oldLayer = lodash(this.state.cartoClient.getLayers()).find(layer => layer && layer.getId().startsWith('Layer_'));
            if (oldLayer) {
                this.state.cartoClient.removeLayer(oldLayer);
            }
            const countryQuery = "select * from world_borders where iso2='" + props.selectedCountry.code + "'";
            const cartoCountrySource = new carto.source.SQL(countryQuery);
            const cartoCountryStyle = new carto.style.CartoCSS(
                '#layer2 {polygon-fill: #6495ED;  polygon-opacity: 0.4;  line-color: #FFF;  line-width: 0.5;  line-opacity: 1;}');
            this.layerCountry = new carto.layer.Layer(cartoCountrySource, cartoCountryStyle, {id: ('Layer_' + props.selectedCountry.code)});
            this.setState({countryLeafletLayer: this.layerCountry});
            this.state.cartoClient.addLayer(this.layerCountry);
        }
        return this.layerCountry;
    }

    render() {
        const {center, zoom} = this.state;
        return (
            <div className={'map-container ' + this.props.mapClassName}>

                <Map
                    center={center}
                    zoom={zoom}
                    ref={(node) => { this.nativeMap = node && node.leafletElement; }}
                >
                    <MapFilter srcFromFilter={this.getSourceFromFilter} apiURL={this.props.apiURL} />
                </Map>
            </div>
        );
    }
}

export default withRouter(WorldMap);

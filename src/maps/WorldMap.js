import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {Map, Marker, TileLayer as Basemap} from 'react-leaflet';
import carto from 'carto.js';
import cartoMapData from '../data/cartoMapData';
import Layer from './Layer';
import {buildStyle} from '../utils/styleFormatter';

// this is a workaround for https://github.com/PaulLeCam/react-leaflet/issues/255#issuecomment-261904061
import L from 'leaflet'; // eslint-disable-line

delete L.Icon.Default.prototype._getIconUrl;/**/

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'), // eslint-disable-line
    iconUrl: require('leaflet/dist/images/marker-icon.png'), // eslint-disable-line
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'), // eslint-disable-line
});

// end of workaround

const CARTO_BASEMAP = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}.png';

class WorldMap extends Component {
    static propTypes = {
        selectedTrashPoint: PropTypes.object,
        mapClassName: PropTypes.string,
    };

    static get defaultProps() {
        return {
            location: this.location,
            selectedTrashPoint: this.selectedTrashPoint,
            mapClassName: this.mapClassName,
        };
    }

    constructor(props) {
        super(props);
        this.state = {
            center: [40.42, -3.7],
            zoom: 13,
            nativeMap: undefined,
            layerStyle: cartoMapData.style,
            hidelayers: true,
            cartoClient: new carto.Client({
                apiKey: '7947aa9e7fcdff0f5f8891a5f83b1e6fa6350687',
                username: 'worldcleanupday',
            }),
            marker: null,
        };
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
            return true;
        }
        return false;
    }

    shouldComponentUpdate() {
        // always return false otherwise CARTO will complain.
        // all interactions with the map are done programmatically inside componentWillReceiveProps
        return false;
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
                    <Basemap attribution="" url={CARTO_BASEMAP} />

                    <Layer
                        source={cartoMapData.source}
                        style={buildStyle()}
                        client={this.state.cartoClient}
                        hidden={false}
                    />
                </Map>
            </div>
        );
    }
}

export default withRouter(WorldMap);

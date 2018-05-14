import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {Map, TileLayer as Basemap} from 'react-leaflet';
import carto from 'carto.js';
import cartoMapData from '../data/cartoMapData';
import Layer from './Layer';
import {buildStyle} from '../utils/styleFormatter';

const CARTO_BASEMAP = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}.png';

class WorldMap extends Component {
    static propTypes = {
        selectedTrashPoint: PropTypes.object,
    };

    static get defaultProps() {
        return {
            location: this.location,
            selectedTrashPoint: this.selectedTrashPoint,
        };
    }

    constructor(props) {
        super(props);
        this.state = {
            visibleOverlay: null,
            center: [40.42, -3.7],
            zoom: 13,
            nativeMap: undefined,
            layerStyle: cartoMapData.style,
            hidelayers: true,
            cartoClient: new carto.Client({apiKey: '7947aa9e7fcdff0f5f8891a5f83b1e6fa6350687', username: 'worldcleanupday'}),
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedTrashPoint
            && nextProps.selectedTrashPoint
            !== this.props.selectedTrashPoint) {
            const center = [nextProps.selectedTrashPoint.lat, nextProps.selectedTrashPoint.long];

            this.nativeMap.panTo(center);
            return true;
        }
        return false;
    }

    shouldComponentUpdate() {
        return false;
    }

    render() {
        const {center, zoom} = this.state;
        return (
            <div className="map-container">

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

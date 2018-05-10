import {Component} from 'react';
import {withRouter} from 'react-router';
import PropTypes from 'prop-types';
import carto from 'carto.js';

class Layer extends Component {
    static contextTypes = {
        map: PropTypes.object,
    };

    static propTypes = {
        source: PropTypes.string,
        style: PropTypes.string,
        client: PropTypes.object,
        location: PropTypes.object,
        history: PropTypes.object,
        hidden: PropTypes.bool,
    }

    static get defaultProps() {
        return {
            client: this.client,
            location: this.location,
            history: this.location,
            style: this.style,
            source: this.source,
            hidden: false,
        };
    }

    constructor(props) {
        super(props);

        const {hidden, source, style} = props;

        const cartoSource = new carto.source.SQL(source);
        const cartoStyle = new carto.style.CartoCSS(style);

        this.layer = new carto.layer.Layer(cartoSource, cartoStyle);
        this.setVisibility(hidden);

        this.layer.setFeatureClickColumns(['id']);
        this.layer.on('featureClicked', (featureEvent) => {
            const navigateToDetails = `/details/${featureEvent.data.id}`;
            if (this.props.location && this.props.location.pathname !== navigateToDetails) {
                this.props.history.push(navigateToDetails);
            }
        });
    }

    componentDidMount() {
        const {client} = this.props;
        client.addLayer(this.layer);
        client.getLeafletLayer().addTo(this.context.map);
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.style !== this.props.style || nextProps.hidden !== this.props.hidden;
    }

    setVisibility = (isHidden) => {
        if (isHidden) {
            this.layer.hide();
        } else {
            this.layer.show();
        }
    }


    render() {
        const {hidden, style} = this.props;
        const layerStyle = this.layer.getStyle();

        layerStyle.setContent(style).then(() => this.setVisibility(hidden));

        return null;
    }
}

export default withRouter(Layer);

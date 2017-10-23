import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ProgressBar from './progressBar/ProgressBar';

export default class TrashStats extends Component {
    static get propTypes() {
        return {
            trashStats: PropTypes.array,
        };
    }
    static get defaultProps() {
        return {
            trashStats: [],
        };
    }
    constructor(props) {
        super(props);
        this.types = {
            glass: {label: 'Glass'},
            plastic: {label: 'Plastic'},
            textile: {label: 'Textile'},
            lumber: {label: 'Lumber'},
            metal: {label: 'Metal'},
            rubber: {label: 'Rubber'},
            other: {label: 'Other'},
        };
    }
    render() {
        const trashStats = this.props.trashStats;

        const filter = trashStat => Object.keys(this.types).includes(trashStat.trash_type);
        const filteredTrashStats = trashStats.filter(filter);

        const byCountSort = (t1, t2) => t2.count - t1.count;
        filteredTrashStats.sort(byCountSort);

        const getType = trashType => this.types[trashType];

        const getSum = (sum, trashStat) => sum + trashStat.count;
        const total = filteredTrashStats.reduce(getSum, 0);

        const getPercent = count => parseFloat(((count / total) * 100).toFixed(1));
        const percentages = [];

        return (
            <div className="trash-stats">
                {filteredTrashStats.map((trashStat) => {
                    const type = getType(trashStat.trash_type);
                    const percent = getPercent(trashStat.count);
                    percentages.push(percent);
                    const max = Math.max(...percentages);
                    const relativeAmount = (percent / max) * 100; // Relative size calculation
                    return (
                        <div key={type.label} className="trash-stat-container">
                            <span>
                                {percent}<sup>%</sup>
                            </span>
                            <div className="container">
                                <span>{type.label}</span>
                                <ProgressBar percent={relativeAmount} type={trashStat.trash_type} />
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
}

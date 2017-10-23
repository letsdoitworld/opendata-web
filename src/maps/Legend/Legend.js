import React, {Component} from 'react';
import Constants from '../Constants';

export default class Legend extends Component {
    formatGrades = (grade) => {
        if (grade >= 1000) {
            return (grade / 1000) + 'k';
        }
        return grade;
    };
    render() {
        return (
            <div className="legend">
                {Constants.instance.grades.map((grade, i) => (
                    <span className="color-container" key={'grade' + grade}>
                        <span className="color-box" style={{background: Constants.instance.getColor(Constants.instance.grades[i] + 1)}} />
                        <span className="label">{this.formatGrades(Constants.instance.grades[i])}</span>
                    </span>
                ))}
            </div>
        );
    }
}

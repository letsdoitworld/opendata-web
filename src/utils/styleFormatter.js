export const COLORS = ['#fcde9c', '#faa476', '#f0746e', '#e34f6f', '#dc3977', '#b9257a', '#7c1d6f'];
function _createRule() {
    return `
            [hazardous=true] {
                [status='REPORTED'] {
                    marker-fill: #7c1d6f;
                    marker-line-color: #FF548B;
                    marker-line-width: 2;
                    marker-width: 6;
                }
                [status='CONFIRMED'] {
                    marker-fill: #7c1d6f;
                    marker-line-color: #FF548B;
                    marker-line-width: 2;
                    marker-width: 6;
                }
                [status='CLEANED'] {
                    marker-fill: #7c1d6f;
                    marker-line-color: #50E3C2;
                    marker-line-width: 2;
                    marker-width: 6;
                }
            }
            [hazardous=false] {
                [status='REPORTED'] {
                    marker-fill: #FF548B;
                }
                [status='CONFIRMED'] {
                    marker-fill: #FF548B;
                }
                [status='CLEANED'] {
                    marker-fill: #50E3C2;
                }
            }
        `;
}
/** function _createRule(bin, color) {
    return `
            [long >= ${bin.start}] {
                marker-fill: ${color};
            }
        `;

}* */
export function buildStyle() {
    const rules = _createRule();

    return `
        #layer {
  marker-width: 7;
  marker-fill: #EE4D5A;
  marker-fill-opacity: 0.9;
  marker-line-color: #FFFFFF;
  marker-line-width: 1;
  marker-line-opacity: 1;
  marker-placement: point;
  marker-type: ellipse;
  marker-allow-overlap: true;
            ${rules}
                      
        }
    `;
}

export function nFormatter(num, digits) {
    const si = [
        {value: 1, symbol: ''},
        {value: 1E3, symbol: 'k'},
        {value: 1E6, symbol: 'M'},
        {value: 1E9, symbol: 'G'},
        {value: 1E12, symbol: 'T'},
        {value: 1E15, symbol: 'P'},
        {value: 1E18, symbol: 'E'},
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    let i;
    for (i = si.length - 1; i > 0; i--) {
        if (num >= si[i].value) {
            break;
        }
    }
    return (num / si[i].value).toFixed(digits).replace(rx, '$1') + si[i].symbol;
}


export default {buildStyle, COLORS, nFormatter};

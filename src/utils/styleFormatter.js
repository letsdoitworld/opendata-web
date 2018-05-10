export const COLORS = ['#fcde9c', '#faa476', '#f0746e', '#e34f6f', '#dc3977', '#b9257a', '#7c1d6f'];
function _createRule() {
    return `
            [status='REPORTED'] {
                marker-fill: #b9257a;
            }
            [status='CONFIRMED'] {
                marker-fill: #009999;
            }
            [status='CLEANED'] {
                marker-fill: #585858;
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


export default {buildStyle, COLORS};

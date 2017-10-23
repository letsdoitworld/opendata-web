export default function calculateTRI(reportCount, population) {
    const tri = (reportCount / (population / 10000)).toFixed(2);
    return tri !== 'NaN' ? tri : 0;
}

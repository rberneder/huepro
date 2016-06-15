export class GraphService {



    private getMinutesOfDateStr(dateStr) {
        return (typeof dateStr === 'undefined') ?
            dateStr : (new Date(dateStr).getTime() / 1000 / 60);
    }



    private getDaysOfDateStr(dateStr) {
        return (typeof dateStr === 'undefined') ?
            dateStr : (Math.floor(new Date(dateStr).getTime() / 86400000));
    }


    
    private getAverageValues(values: number[], dates: string[], averageDays: number): any {
        if (dates.length < 1) {
            return new Array();

        } else if (dates.length === 1) {
            averageDays = (averageDays > 1) ? 1 : averageDays;

        } else {
            var timeSpan = this.getDaysOfDateStr(dates[dates.length - 1]) - this.getDaysOfDateStr(dates[0]);
            averageDays = (timeSpan < averageDays) ? timeSpan : averageDays;
        }

        var result = new Array(),
            nextAverageDay = this.getDaysOfDateStr(dates[0]) + averageDays,
            average = 0,
            averageCount = 0;

        for (var i = 0; i < values.length; i++) {
            var now = this.getDaysOfDateStr(dates[i]);
            average += values[i];
            averageCount++;

            if (averageDays === 0 || i === (values.length - 1) || this.getDaysOfDateStr(dates[i + 1]) >= nextAverageDay) {

                average = average / averageCount;

                result.push({
                    value: average,
                    date: this.getMinutesOfDateStr(dates[i])
                });

                nextAverageDay = this.getDaysOfDateStr(dates[i + 1]) + averageDays;
                average = averageCount = 0;
            }
        } // End-for

        return result;
    }



    // set = [{index, values[], dates[]}]
    getSetOfSvgPolyLines(dataSet: any, averageDays: number): any {
        if (dataSet.length < 1 || averageDays < 0) {
            return null;
        }

        var svgPolyLines = {},
            allIndizes = new Array(),
            allValues = new Array(),
            xMin, xMax, yMin, yMax;

        // Creating raw-values
        for (let entry of dataSet) {
            allIndizes.push(entry.index);
            allValues.push(this.getAverageValues(entry.values, entry.dates, averageDays));
        }

        // Setting graph-scales
        for (var i = 0; i < allIndizes.length; i++) {
            var entries = allValues[i].length;
            if (typeof xMin === 'undefined' || allValues[i][0].date < xMin) xMin = allValues[i][0].date;
            if (typeof xMax === 'undefined' || allValues[i][entries - 1].date > xMax) xMax = allValues[i][entries - 1].date;

            for (var point of allValues[i]) {
                if (typeof yMin === 'undefined' || point.value < yMin) yMin = point.value;
                if (typeof yMax === 'undefined' || point.value > yMax) yMax = point.value;
            }
        }

        // Scaling average-values to graph-scale
        for (var i = 0; i < dataSet.length; i++) {
            var svgPolyLine = '';

            for (let average of allValues[i]) {
                var xCoord = 100 * (average.date - xMin) / (xMax - xMin);
                var yCoord = 100 - 100 * (average.value - yMin) / (yMax - yMin);  // SVG has y on bottom
                svgPolyLine += xCoord + ',' + yCoord + ' ';
            }

            svgPolyLines[dataSet[i].index] = svgPolyLine;
        }

        return svgPolyLines;
    }
}
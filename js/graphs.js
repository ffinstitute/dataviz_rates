/**
 * Created by myles on 28/10/2016.
 */
var graph = (function () {
    function create() {
        var svg = d3.select("svg#graph"),
            margin = {top: 20, left: 10, bottom: 20, right: 10},
            width = parseInt(svg.style('width')) - margin.left - margin.right,
            height = parseInt(svg.style('height')) - margin.top - margin.bottom;

        svg.empty();

        // Process Data
        var raw_data = getData();
        console.log('Raw Data:', raw_data);

        var cooked_data = [];
        $.each(raw_data, function () {
            cooked_data.push({
                x: this.total_days,
                rateA: this.rates.a,
                rateB: this.rates.b,
                DFA: this.DF.a,
                DFB: this.DF.b
            });
        });

        console.log('Cooked Data:', cooked_data);


        var rate_min = d3.min(cooked_data, function (d) {
                return d3.min([d.rateA, d.rateB]);
            }),
            rate_max = d3.max(cooked_data, function (d) {
                return d3.max([d.rateA, d.rateB]);
            }),
            DF_min = Math.floor(d3.min(cooked_data, function (d) {
                        return d3.min([d.DFA, d.DFB]);
                    }) * 100) / 100,
            DF_max = Math.ceil(d3.max(cooked_data, function (d) {
                        return d3.max([d.DFA, d.DFB]);
                    }) * 100) / 100;

        console.info("Y rate Domain:", rate_min, rate_max);
        console.info("Y DF Domain:", DF_min, DF_max);

        // Set the ranges
        var x = d3.scaleLinear()
            .domain(d3.extent(cooked_data, function (d) {
                return d.x;
            })).range([0, width]);

        var yRate = d3.scaleLinear().domain([rate_min, rate_max]).range([height / 2, 0]);

        var yDF = d3.scaleLinear().domain([DF_min, DF_max]).range([height, height / 2]);

        // Define the axes
        var xAxis = d3.axisBottom(x)
                .ticks(13),
            yRateAxis = d3.axisRight(yRate),
            yDFAxis = d3.axisRight(yDF);


        var lineRateA = d3.line()
            .x(function (d) {
                return x(d.x);
            })
            .y(function (d) {
                return yRate(d.rateA);
            })
            .curve(d3.curveBasis);
        var lineRateB = d3.line()
            .x(function (d) {
                return x(d.x);
            })
            .y(function (d) {
                return yRate(d.rateB);
            })
            .curve(d3.curveBasis);
        var lineDFA = d3.line()
            .x(function (d) {
                return x(d.x);
            })
            .y(function (d) {
                return yDF(d.DFA);
            })
            .curve(d3.curveBasis);
        var lineDFB = d3.line()
            .x(function (d) {
                return x(d.x);
            })
            .y(function (d) {
                return yDF(d.DFB);
            })
            .curve(d3.curveBasis);

        svg.append("path")
            .attr("class", "line rate a")
            .attr("d", lineRateA(cooked_data));

        svg.append("path")
            .attr("class", "line rate b")
            .attr("d", lineRateB(cooked_data));

        svg.append("path")
            .attr("class", "line DF a")
            .attr("d", lineDFA(cooked_data));

        svg.append("path")
            .attr("class", "line DF b")
            .attr("d", lineDFB(cooked_data));

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        svg.append("g")
            .attr("class", "y rate axis")
            .call(yRateAxis);

        svg.append("g")
            .attr("class", "y DF axis")
            .call(yDFAxis);
    }

    function update() {

    }

    function getData() {
        var data = {};
        $('#tableA tbody tr').each(function () {
            var this_data = $(this).data();
            data[this_data['total_days']] = this_data;
        });
        return data;
    }

    return {
        create: create,
        update: update
    }
})(jQuery);
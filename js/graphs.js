/**
 * Created by myles on 28/10/2016.
 */
var graph = (function () {
    var svg = d3.select("svg#graph"),
        margin = {top: 10, left: 30, bottom: 20, right: 10, middle: 20};

    var svg_width, svg_height, x, yRate, yDF, xAxis, yRateAxis, yDFAxis, lineRate, lineDF;

    function init() {
        svg_width = parseInt(svg.style('width'));
        svg_height = parseInt(svg.style('height'));

        svg.empty();

        // set range
        x = d3.scaleLinear().range([0 + margin.left, svg_width - margin.right]);
        yRate = d3.scaleLinear().range([(svg_height - margin.middle - margin.bottom + margin.top ) / 2, 0 + margin.top]);
        yDF = d3.scaleLinear().range([svg_height - margin.bottom, (svg_height - margin.bottom + margin.top + margin.middle) / 2]);

        // Define the axes
        xAxis = d3.axisBottom(x).ticks(13);
        yRateAxis = d3.axisLeft(yRate);
        yDFAxis = d3.axisLeft(yDF);

        // define lines
        lineRate = d3.line()
            .x(function (d) {
                return x(d.x);
            })
            .y(function (d) {
                return yRate(d.rate);
            })
            .curve(d3.curveLinear);

        lineDF = d3.line()
            .x(function (d) {
                return x(d.x);
            })
            .y(function (d) {
                return yDF(d.DF);
            })
            .curve(d3.curveLinear);
    }

    function create() {
        init();

        var cooked_data = getData();

        // Set domain
        x.domain(d3.extent(cooked_data, function (d) {
            return d.x;
        }));

        yRate.domain(d3.extent([].concat.apply([], cooked_data.map(function (d) {
            return [d.rateA, d.rateB];
        }))));

        yDF.domain(d3.extent([].concat.apply([], cooked_data.map(function (d) {
            return [d.DFA, d.DFB];
        }))));

        // Draw graph
        var line_rate_a = svg.append("path")
            .attr("class", "line rate a")
            .attr("d", lineRate(cooked_data.map(function (d) {
                return {x: d.x, rate: d.rateA};
            })));

        svg.append("path")
            .attr("class", "line rate b")
            .attr("d", lineRate(cooked_data.map(function (d) {
                return {x: d.x, rate: d.rateB};
            })));

        svg.append("path")
            .attr("class", "line DF a")
            .attr("d", lineDF(cooked_data.map(function (d) {
                return {x: d.x, DF: d.DFA};
            })));

        svg.append("path")
            .attr("class", "line DF b")
            .attr("d", lineDF(cooked_data.map(function (d) {
                return {x: d.x, DF: d.DFB};
            })));

        // Draw the scatterplot
        svg.selectAll("dot.rate")
            .data([].concat.apply([], cooked_data.map(function (d) {
                return [{x: d.x, rate: d.rateA}, {x: d.x, rate: d.rateB}];
            })))
            .enter().append("circle")
            .attr("r", 3)
            .attr("cx", function (d) {
                return x(d.x);
            })
            .attr("cy", function (d) {
                return yRate(d.rate);
            })
            .attr("class", "rate dot");

        svg.selectAll("dot.DF")
            .data([].concat.apply([], cooked_data.map(function (d) {
                return [{x: d.x, DF: d.DFA}, {x: d.x, DF: d.DFB}];
            })))
            .enter().append("circle")
            .attr("r", 3)
            .attr("cx", function (d) {
                return x(d.x);
            })
            .attr("cy", function (d) {
                return yDF(d.DF);
            })
            .attr("class", "DF dot");


        // Draw axis
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + (svg_height - margin.bottom) + ")")
            .call(xAxis);

        svg.append("g")
            .attr("class", "y rate axis")
            .attr("transform", "translate(" + (margin.left) + ",0)")
            .call(yRateAxis);

        svg.append("g")
            .attr("class", "y DF axis")
            .attr("transform", "translate(" + (margin.left) + ",0)")
            .call(yDFAxis);
    }

    function update() {
        init();

        var cooked_data = getData();

        // Set domain
        x.domain(d3.extent(cooked_data, function (d) {
            return d.x;
        }));

        yRate.domain(d3.extent([].concat.apply([], cooked_data.map(function (d) {
            return [d.rateA, d.rateB];
        }))));

        yDF.domain(d3.extent([].concat.apply([], cooked_data.map(function (d) {
            return [d.DFA, d.DFB];
        }))));

        /**
         * Change graph
         */
        var svg = d3.select("svg#graph").transition();

        // Change curves
        svg.select(".line.rate.a")
            .attr("d", lineRate(cooked_data.map(function (d) {
                return {x: d.x, rate: d.rateA};
            })));

        svg.select(".line.rate.b")
            .attr("d", lineRate(cooked_data.map(function (d) {
                return {x: d.x, rate: d.rateB};
            })));

        svg.select(".line.DF.a")
            .attr("d", lineDF(cooked_data.map(function (d) {
                return {x: d.x, DF: d.DFA};
            })));

        svg.select(".line.DF.b")
            .attr("d", lineDF(cooked_data.map(function (d) {
                return {x: d.x, DF: d.DFB};
            })));

        // Change dots



        // Change axis
        svg.select(".x.axis")
            .call(xAxis);

        svg.select(".y.rate.axis")
            .call(yRateAxis);

        svg.select(".y.DF.axis")
            .call(yDFAxis);
    }

    function getData() {
        var raw_data = {};

        // Get Data
        $('#tableA tbody tr').each(function () {
            var this_data = $(this).data();
            raw_data[this_data['total_days']] = this_data;
        });

        // Process Data
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
        return cooked_data;
    }

    return {
        create: create,
        update: update
    }
})(jQuery);
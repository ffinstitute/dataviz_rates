/**
 * Created by myles on 28/10/2016.
 */
var graph = (function () {
    var svg = d3.select("svg#graph"),
        margin = {top: 10, left: 45, bottom: 20, right: 10, middle: 20};

    var svg_width, svg_height, x, yRate, yDF, xAxis, yRateAxis, yDFAxis, lineRate, lineDF, tooltip;

    function init() {
        svg_width = parseInt(svg.style('width'));
        svg_height = parseInt(svg.style('height'));

        svg.empty();

        // set range
        x = d3.scaleLinear().range([0 + margin.left, svg_width - margin.right]);
        yRate = d3.scaleLinear().range([(svg_height - margin.middle - margin.bottom + margin.top ) / 2, 0 + margin.top]);
        yDF = d3.scaleLinear().range([svg_height - margin.bottom, (svg_height - margin.bottom + margin.top + margin.middle) / 2]);

        // Define the axes
        xAxis = d3.axisBottom(x);
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

        // Create Tooltip
        tooltip = d3.select("body").append("div")
            .attr("class", "tooltip");

        var cooked_data = getData();

        // Set domain
        x.domain([0, d3.max(cooked_data, function (d) {
            return d.x;
        })]);

        yRate.domain([0, d3.max(cooked_data.map(function (d) {
            return d3.max([d.rateA, d.rateB]);
        }))]);

        yDF.domain([0, d3.max(cooked_data.map(function (d) {
            return d3.max([d.DFA, d.DFB]);
        }))]);

        // Set axis ticks
        xAxis.tickValues(cooked_data.map(function (d) {
            return d.x;
        })).tickFormat(function (d, i) {
            return cooked_data[i].t;
        });

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
        updateOrCreateDots(cooked_data);

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

        // Add yAxis labels
        svg.append("text")
            .attr("x", ( margin.middle - margin.top * 3 + margin.bottom - svg_height) / 4 - 25)
            .attr("y", 13)
            .attr("transform", "rotate(270)")
            .text("Rate %");

        svg.append("text")
            .attr("x", (margin.bottom - svg_height - margin.middle / 3 - margin.top / 3 ) / 4 * 3 - 52)
            .attr("y", 13)
            .attr("transform", "rotate(270)")
            .text("Discount Factor");
    }

    function update() {
        init();

        var cooked_data = getData();

        // Set domain
        x.domain([0, d3.max(cooked_data, function (d) {
            return d.x;
        })]);

        yRate.domain(d3.extent([].concat.apply([], cooked_data.map(function (d) {
            return [d.rateA, d.rateB];
        }))));

        yDF.domain(d3.extent([].concat.apply([], cooked_data.map(function (d) {
            return [d.DFA, d.DFB];
        }))));

        // Set axis ticks
        xAxis.tickValues(cooked_data.map(function (d) {
            return d.x;
        })).tickFormat(function (d, i) {
            return cooked_data[i].t;
        });

        /**
         * Change graph
         */
        var svg = d3.select("svg#graph").transition().duration(750);

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
        updateOrCreateDots(cooked_data);

        // Change axis
        svg.select(".x.axis")
            .call(xAxis);

        svg.select(".y.rate.axis")
            .call(yRateAxis);

        svg.select(".y.DF.axis")
            .call(yDFAxis);
    }


    function updateOrCreateDots(cooked_data) {
        var normal_radius = 2,
            highlight_radius = 3;

        var t = d3.transition()
            .duration(750);

        var dot_rate = svg.selectAll(".rate.dot")
            .data([].concat.apply([], cooked_data.map(function (d) {
                return [{x: d.x, y: d.rateA}, {x: d.x, y: d.rateB}];
            })));

        var showTooltip = function (d, type) {
            var text = "";
            switch (type) {
                case "rate":
                    text = "Rate: " + d.y.toFixed(2) + "%";
                    break;
                case "DF":
                    text = "DF: " + d.y.toFixed(10);
                    break;
            }
            d3.select(this).attr('r', highlight_radius);
            tooltip.classed("show", true)
                .html(text)
                .style("left", (d3.event.pageX) + "px");
            tooltip.style("top", (d3.event.pageY - parseInt(tooltip.style('height'))) + "px");
        };

        var hideTooltip = function (d) {
            d3.select(this).attr('r', normal_radius);
            tooltip.classed("show", false);
        };

        dot_rate.exit()
            .classed("exit", true)
            .attr('r', 0)
            .style('fill-opacity', 1e-6)
            .remove();

        dot_rate.classed('update', true)
            .attr("r", highlight_radius)
            .transition(t)
            .attr("cx", function (d) {
                return x(d.x);
            })
            .attr("cy", function (d) {
                return yRate(d.y);
            })
            .attr("r", normal_radius);


        dot_rate.enter().append("circle")
            .attr("r", normal_radius)
            .attr("cx", function (d) {
                return x(d.x);
            })
            .attr("cy", function (d) {
                return yRate(d.y);
            })
            .attr("class", "rate dot")
            .on("mouseover", function (d) {
                showTooltip.bind(this)(d, 'rate');
            }).on("mouseout", hideTooltip);

        var dot_DF = svg.selectAll(".DF.dot")
            .data([].concat.apply([], cooked_data.map(function (d) {
                return [{x: d.x, y: d.DFA}, {x: d.x, y: d.DFB}];
            })));

        dot_DF.exit()
            .classed("exit", true)
            .attr('r', 0)
            .style('fill-opacity', 1e-6)
            .remove();

        dot_DF.classed('update', true)
            .attr("r", highlight_radius)
            .transition(t)
            .attr("cx", function (d) {
                return x(d.x);
            })
            .attr("cy", function (d) {
                return yDF(d.y);
            })
            .attr("r", normal_radius);

        dot_DF.enter().append("circle")
            .attr("r", normal_radius)
            .attr("cx", function (d) {
                return x(d.x);
            })
            .attr("cy", function (d) {
                return yDF(d.y);
            })
            .attr("class", "DF dot")
            .on("mouseover", function (d) {
                showTooltip.bind(this)(d, 'DF');
            })
            .on("mouseout", hideTooltip);
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
                DFB: this.DF.b,
                t: this.t
            });
        });
        return cooked_data;
    }

    return {
        create: create,
        update: update
    }
})(jQuery);


/* y Axis from 0
 hover vertical line
 space first column center ...
 */
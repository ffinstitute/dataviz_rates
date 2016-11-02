/**
 * Created by myles on 28/10/2016.
 */
var graph = (function () {
    var svg = d3.select("#graph").append("svg"),
        margin = {top: 10, left: 45, bottom: 20, right: 10, middle: 20};

    var svg_width, svg_height, x, yRate, yDF, xAxis, yRateAxis, yDFAxis, lineRate, lineDF, tooltip, cooked_data, focus;

    var bisectDate = d3.bisector(function (d) {
        return d.x;
    }).left;

    function updateSize() {
        svg_width = parseInt(svg.style('width'));
        svg_height = parseInt(svg.style('height'));

        // set range
        x = d3.scaleLinear().range([0 + margin.left, svg_width - margin.right]);
        yRate = d3.scaleLinear().range([(svg_height - margin.middle - margin.bottom + margin.top ) / 2, 0 + margin.top]);
        yDF = d3.scaleLinear().range([svg_height - margin.bottom, (svg_height - margin.bottom + margin.top + margin.middle) / 2]);

    }

    function updateFunc() {
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
        updateSize();
        updateFunc();

        // Add hover groups
        focus = svg.append("g")
            .attr("id", "hover-container")
            .style("display", "none");

        focus.append("line")
            .attr("class", "hover")
            .attr("x1", x(190))
            .attr("y1", margin.top)
            .attr("x2", x(190))
            .attr("y2", svg_height - margin.bottom);

        // Create Tooltip
        tooltip = d3.select("body").append("div")
            .attr("class", "tooltip");

        cooked_data = getData();

        updateDomain();

        // Set axis ticks
        xAxis.tickValues(cooked_data.map(function (d) {
            return d.x;
        })).tickFormat(function (d, i) {
            return cooked_data[i].t;
        });

        // Draw graph
        svg.append("path").attr("class", "line rate a");
        svg.append("path").attr("class", "line rate b");
        svg.append("path").attr("class", "line DF a");
        svg.append("path").attr("class", "line DF b");

        updateCurve();

        // append the rectangle to capture mouse
        svg.append("rect")
            .attr("id", "hover-mask")
            .attr("width", svg_width)
            .attr("height", svg_height)
            .style("fill", "none")
            .style("pointer-events", "all")
            .on("mouseover", function () {
                focus.style("display", null);
            })
            .on("mouseout", function () {
                focus.style("display", "none");
                document.dispatchEvent(new CustomEvent('graph-hover-over'));
            })
            .on("mousemove", function () {
                mousemove.bind(this)();
            });

        // Draw the scatterplot
        updateDot(cooked_data);

        // Draw axis
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + (svg_height - margin.bottom) + ")");

        svg.append("g")
            .attr("class", "y rate axis")
            .attr("transform", "translate(" + (margin.left) + ",0)");

        svg.append("g")
            .attr("class", "y DF axis")
            .attr("transform", "translate(" + (margin.left) + ",0)");

        updateAxis();

        // Add yAxis labels
        svg.append("text")
            .attr("x", -margin.top - 49)
            .attr("y", 13)
            .attr("transform", "rotate(270)")
            .text("Rate %");

        svg.append("text")
            .attr("x", (margin.bottom - svg_height - margin.middle / 3 - margin.top / 3 ) / 4 * 3 - 2)
            .attr("y", 13)
            .attr("transform", "rotate(270)")
            .text("Discount Factor");
    }

    function update() {
        updateSize();
        updateFunc();
        cooked_data = getData();

        // Set domain
        updateDomain();

        // Set axis ticks
        xAxis.tickValues(cooked_data.map(function (d) {
            return d.x;
        })).tickFormat(function (d, i) {
            return cooked_data[i].t;
        });

        /**
         * Change graph
         */
        svg.transition().duration(750);


        // Change curves
        updateCurve();

        // Update hover mask
        svg.select("rect#hover-mask")
            .attr("width", svg_width)
            .attr("height", svg_height);

        // Change dots
        updateDot(cooked_data);

        // Change axis
        updateAxis();
    }

    function updateDomain() {
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
    }

    function updateAxis() {
        svg.select(".x.axis")
            .call(xAxis);

        svg.select(".y.rate.axis")
            .call(yRateAxis);

        svg.select(".y.DF.axis")
            .call(yDFAxis);
    }

    function updateCurve() {
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
    }


    function updateDot() {
        var normal_radius = 2,
            highlight_radius = 3;

        var dot_rate = svg.selectAll("circle.rate.dot")
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

    function mousemove() {
        var x0 = x.invert(d3.mouse(this)[0]),
            i = bisectDate(cooked_data, x0, 1);
        var d0 = cooked_data[i - 1],
            d1 = cooked_data[i];
        if (!(d0 && d1)) return false;
        i = x0 - d0.x > d1.x - x0 ? i : i - 1;
        updateHoverLine(i);
        document.dispatchEvent(new CustomEvent('graph-hover', {'detail': {t: cooked_data[i].t}}));
    }

    function updateHoverLine(i, t) {
        var d;
        if (t) {
            d = cooked_data.filter(function (d) {
                return d.t == t;
            });
            if (d.length) d = d[0];
        } else
            d = cooked_data[i];
        if (!d) return false;

        focus.select("line.hover")
            .attr("x1", x(d.x))
            .attr("x2", x(d.x))
            .attr("y1", yRate(d3.max([d.rateA, d.rateB])));
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
        update: update,
        updateHoverLine: updateHoverLine
    }
})(jQuery);
/**
 * Created by myles on 28/10/2016.
 */
var graph = (function () {

    function create() {
        var svg = d3.select("svg#graph-rate"),
            margin = {top: 20, left: 10, bottom: 20, right: 10},
            width = +svg.attr("width") - margin.left - margin.right,
            height = +svg.attr("height") - margin.top - margin.bottom;
    }

    function update() {

    }

    return {
        create: create,
        update: update
    }
})(jQuery);
// Dataviz Rates
var svgA;
var svgB;
var color=d3.scale.category20c();



$(function(){
    /*
    svg = d3.select("#graph1").append("svg")
        .attr("width", width)
        .attr("height", height);
    getData(); 
    refresh();//compute and redraw graph
    */   
    $('input#startdate').change(function(){
        
        var date=$('input#startdate').val();
        showDetails();
    });

    function showDetails(){
        
        console.log('showDetails()');

        var htm='<table class="table table-condensed">';
        htm+='<thead>';
        htm+='<th>t</th>';
        htm+='<th>Date</th>';
        htm+='<th>Rate %</th>';
        htm+='<th>#days</th>';
        htm+='<th>Disc.F</th>';
        htm+='</thead>';
        htm+='<tbody>';
        htm+='</tbody>';
        htm+='</table>';
        
        $('div#tableA').html(htm);
        $('div#tableB').html(htm);
    }

    console.info('main.js');
});
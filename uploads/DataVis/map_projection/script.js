var margin = {
    top: 100,
    right: 100,
    bottom: 100,
    left: 100
};
var width = 1200;
var height = 960;


var radius = d3.scale.sqrt()
    .domain([0, 10])
    .range([0, 5]);

var projection = d3.geo.stereographic()
    .scale(245)
    .translate([width / 2, height / 2])
    .rotate([-20, 0])
    .clipAngle(180 - 1e-4)
    .clipExtent([
        [0, 0],
        [width, height]
    ])
    .precision(.1);

var path = d3.geo.path()
    .projection(projection);

var graticule = d3.geo.graticule();

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

svg.append("path")
    .datum(graticule)
    .attr("class", "graticule")
    .attr("d", path);

queue()
    .defer(d3.json, "world-110m.json")
    .defer(d3.json, "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson")
    .await(ready);

function ready(error, world, centroid) {
    var minVal = 0;
    var maxVal = 0;


    

    svg.insert("path", ".graticule")
        .datum(topojson.feature(world, world.objects.land))
        .attr("class", "land")
        .attr("d", path);

    svg.insert("path", ".graticule")
        .datum(topojson.mesh(world, world.objects.countries, function(a, b) {
            return a !== b;
        }))
        .attr("class", "boundary")
        .attr("d", path);

    
    createPoints(); // NOT CREATING POINTS??
    refreshPoints(); // NOT CREATING POINTS??
    d3.select('#slider1').call(d3.slider().axis(true).min(0).max(10).step(1).value([4, 7]).on("slide", function(evt, value) {
        d3.select('#slider1textmin').text(value[0]);
        d3.select('#slider1textmax').text(value[1]);
        minVal = value[0];
        maxVal = value[1];
        console.log(maxVal);
        refreshPoints();
    }));
    function refreshPoints() {
        d3.selectAll("g").remove();
        // console.log("remove");
        createPoints();
    }

    function createPoints() {
        svg.append("g")
            .selectAll(".symbol")
            .data(centroid.features.sort(function(d) {
                return d.properties.mag;
            }))
            .enter().append("path")
            .attr("fill", "rgba(0, 140, 200, 0.5)")
            //INTERACTION
            .on("mouseover", function(d, i) {
                d3.select(this)
                    .attr("fill", "red");
                // Tooltip
                var tooltipX = parseFloat(d3.select(this).attr("x")) + 10;
                var tooltipY = parseFloat(d3.select(this).attr("y")) + 10;
                svg.append("text")
                    .attr("fill", "rgba(0, 140, 200, 1)")
                    .attr("x", 100)
                    .attr("y", height - 200)
                    .text("PLACE : " + d.properties.place)
                    .attr("id", "tooltip")
                    .append("tspan")
                    .attr("x", 100)
                    .attr("dy", 20)
                    .text("LAT : " + d.geometry.coordinates[0])
                    .append("tspan")
                    .attr("x", 100)
                    .attr("dy", 20)
                    .text("LON : " + d.geometry.coordinates[1]);
            })
            .on("mouseout", function(d) {
                d3.select(this)
                    .attr("fill", "rgba(0, 140, 200, 0.5)")
                d3.select("#tooltip").remove();
            })
            .attr("d", path.pointRadius(function(d, i) { // XY Coordinates calculated by .pointRadius
                if ((d.properties.mag > minVal)&&(d.properties.mag < maxVal)) {
                    return radius(d.properties.mag);
                } else
                    return null;

            }));

    }
}

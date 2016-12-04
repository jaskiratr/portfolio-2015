var url = "../words.json",
    margin = {
        top: 30,
        right: 10,
        bottom: 30,
        left: 10
    },
    width = parseInt(d3.select('#chart').style('width'), 10),
    width = width - margin.left - margin.right,
    height = 200, // placeholder
    barHeight = 20,
    spacing = 5,
    percent = d3.format('%'),
    num = d3.format('d');

// scales and axes
var x = d3.scale.linear()
    .range([0, width])
    .domain([0, .3]); // hard-coding this because I know the data
var y = d3.scale.ordinal();

var xAxis = d3.svg.axis()
    .scale(x)
    .tickFormat(percent);

// create the chart
var chart = d3.select('#chart').append('svg')
    .style('width', (width + margin.left + margin.right) + 'px')
    .append('g')
    .attr('transform', 'translate(' + [margin.left, margin.top] + ')');

//Parse the JSON
d3.json(url, function(err, data) {
    // sort
    data = _.sortBy(data, 'percent').reverse();

    // set y domain
    y.domain(d3.range(data.length))
        .rangeBands([0, data.length * barHeight]);

    // set height based on data
    height = y.rangeExtent()[1];
    d3.select(chart.node().parentNode)
        .style('height', (height + margin.top + margin.bottom) + 'px')

    //Default chart to display
    absolute();
    // percentage();
    d3.select('#option1')
        .on("click", percentage);
    d3.select('#option2')
        .on("click", absolute);

    function percentage() {
        // Render the chart
        chart.selectAll('g')
            .remove();
        // Sort data
        data = _.sortBy(data, 'LexicalDiversity').reverse(); // Change to abs

        // Find Scale
        x = d3.scale.linear()
            .range([0, width])
            .domain([0, 30]); // Modify Domain

        // Top Axis
        chart.append('g')
            .attr('class', 'x axis top')
            .call(xAxis.orient('top'));

        // Bottom axis
        chart.append('g')
            .attr('class', 'x axis bottom')
            .attr('transform', 'translate(0,' + height + ')')
            .call(xAxis.orient('bottom'));

        // Y Height of each bar
        bars = chart.selectAll('.bar')
            .data(data)
            .enter().append('g')
            .attr('class', 'bar')
            .attr('transform', function(d, i) {
                return 'translate(0,' + y(i) + ')';
            })
            // BG Rectangle
        bars.append('rect')
            .attr('class', 'background')
            .attr('height', y.rangeBand())
            .attr('width', 0)
            .on("click", function(d, i) {
                tooltip(d, i);
            })
            .on("mouseout", function() {
                d3.select("#tooltip").classed("hidden", true);
            })
            .transition()
            .delay(function(d, i) {
                return i * 25;
            })
            .ease("sin")
            .attr('width', width);

        // Red Rectangle
        bars.append('rect')
            .attr('class', 'percent')
            .attr('height', y.rangeBand())
            .attr('width', 0)
            .on("click", function(d, i) {
                tooltip(d, i);
            })
            .on("mouseout", function() {
                d3.select("#tooltip").classed("hidden", true);
            })
            .transition()
            .delay(function(d, i) {
                return i * 25;
            })
            .ease("sin")
            .attr('width', function(d) {
                return (x(parseFloat(d.LexicalDiversity)));
            });


        // Title text
        bars.append('text')
            .style('opacity', 0)
            .transition()
            .delay(function(d, i) {
                return i * 25
            })
            .style('opacity', 1)
            .duration(1000)
            .ease("bounce")
            .text(function(d) {
                return d.title;
            })
            .attr('class', 'title')
            .attr('y', y.rangeBand() - 5)
            .attr('x', spacing);
        //Author Text
        bars.append('text')
            .style('opacity', 0)
            .transition()
            .delay(function(d, i) {
                return i * 25
            })
            .style('opacity', 1)
            .duration(1000)
            .ease("bounce")
            .text(function(d) {
                return d.author;
            })
            .attr('class', 'author')
            .attr('y', y.rangeBand() - 5)
            .attr('x', width - 5)
            .style("text-anchor", "end");
        // add median ticks
        {
            var median = d3.median(data, function(d) {
                return parseFloat(d.LexicalDiversity);
            });

            d3.select('span.median').text(percent(median / 100));

            bars.append('line')
                .style('opacity', 0)
                .transition()
                .delay(function(d, i) {
                    return i * 25
                })
                .style('opacity', 1)
                .duration(500)
                .attr('class', 'median')
                .attr('x1', x(median))
                .attr('x2', x(median))
                .attr('y1', 1)
                .attr('y2', y.rangeBand() - 1);
        }
    }

    function absolute() {
        // clearTimeout(sortTimeout);

        chart.selectAll('g')
            .remove();

        data = _.sortBy(data, ('absCount')).reverse(); // Change to abs

        x = d3.scale.linear()
            .range([0, width])
            .domain([0, 50000]); // Modify Domain
        var xAxis = d3.svg.axis()
            .scale(x)
            .tickFormat(num);

        chart.append('g')
            .attr('class', 'x axis top ')
            .call(xAxis.orient('top'));

        chart.append('g')
            .attr('class', 'x axis bottom')
            .attr('transform', 'translate(0,' + height + ')')
            .call(xAxis.orient('bottom'));


        bars = chart.selectAll('.bar')
            .data(data)
            .enter().append('g')
            .attr('class', 'bar')
            .attr('transform', function(d, i) {
                return 'translate(0,' + y(i) + ')';
            })
        bars.append('rect')
            .attr('class', 'background')
            .attr('height', y.rangeBand())
            .attr('width', 0)
            .on("click", function(d, i) {
                tooltip(d, i);
            })
            .on("mouseout", function() {
                d3.select("#tooltip").classed("hidden", true);
            })
            .transition()
            .delay(function(d, i) {
                return i * 25;
            })
            .ease("sin")
            .attr('width', width);

        bars.append('rect')
            .attr('class', 'num')
            .attr('height', y.rangeBand())
            .attr('width', 0)
            .on("click", function(d, i) {
                tooltip(d, i);
            })
            .on("mouseout", function() {
                d3.select("#tooltip").classed("hidden", true);

            })
            .transition()
            .delay(function(d, i) {
                return i * 30;
            })
            .ease("bounce")

        .attr('width', function(d) {
            return (x(d.absCount));
        });

        bars.append('text')
            .style('opacity', 0)
            .transition()
            .delay(function(d, i) {
                return i * 25
            })
            .style('opacity', 1)
            .duration(1000)
            .ease("bounce")
            .text(function(d) {
                return d.title;
            })
            .attr('class', 'book_name_2')
            .attr('y', y.rangeBand() - 5)
            .attr('x', spacing);

        bars.append('text')
            .style('opacity', 0)
            .transition()
            .delay(function(d, i) {
                return i * 30
            })
            .style('opacity', 1)
            .duration(1000)
            .ease("bounce")
            .text(function(d) {
                return d.author;
            })
            .attr('class', 'author')
            .attr('y', y.rangeBand() - 5)
            .attr('x', width - 5)
            .style("text-anchor", "end");

        {
            var median = d3.median(data, function(d) {
                return parseFloat(d.absCount);
            });

            d3.select('span.median').text((median));

            bars.append('line')
                .style('opacity', 0)
                .transition()
                .delay(function(d, i) {
                    return i * 25
                })
                .style('opacity', 1)
                .duration(500)
                .attr('class', 'median')
                .attr('x1', x(median))
                .attr('x2', x(median))
                .attr('y1', 1)
                .attr('y2', y.rangeBand() - 1);
        }
    }

});

// resize
d3.select(window).on('resize', resize);

function tooltip(d, i) {
    //Get this bar's x/y values, then augment for the tooltip
    //Update Tooltip Position & value
    var xPosition = (0);
    var yPosition = y(i) + 760;
    var words = (d.freqDist);

    var word_array = [];
    for (var i = words.length - 1; i >= 0; i--) {
        word_array.push(words[i].word);
    };

    var size_array = [];
    var maxSize = 0;
    for (var i = words.length - 1; i >= 0; i--) {
        size_array.push(words[i].count);
        if (words[i].count > maxSize) {
            maxSize = words[i].count;
        }
    };
    // console.log(yPosition);
    d3.select("#tooltip")
        // .attr('y', yPosition)
        .style("top", yPosition + "px")
        .style("left", xPosition + "px")
        .select("#title")
        .text(d.title);
    d3.select("#tooltip")
        .select("#author")
        .text(d.author);
    d3.select("#tooltip")
        .select("#genre")
        .text(d.genre);
    d3.select("#tooltip")
        .select("#vocab")
        .text(d.absCount);
    d3.select("#tooltip")
        .select("#lex_div")
        .text(d.LexicalDiversity);
    d3.select("#tooltip")
        .select("#com_words")
        .text(word_array);
    d3.select("#tooltip").classed("hidden", false);


    wordScale = d3.scale.linear().domain([0, 6000]).range([10, 80]);
    var fill = d3.scale.category20();
    var scale_factor = 20;
    d3.layout.cloud().size([400, 300])
        .words(d3.zip(word_array, size_array).map(function(d) {
            return {
                text: d[0],
                size: d[1]
            };
        }))
        .padding(15)
        .fontSize(function(d) {
            // console.log(d.size);
            return wordScale(d.size);
        })
        .on("end", draw)
        .start();

    function draw(words) {
        d3.select("cloud").remove();
        d3.select("#tooltip").append("cloud").append("svg")
            .attr("width", 400)
            .attr("height", 300)
            .append("g")
            .attr("transform", "translate(250,150)")
            .selectAll("text")
            .data(words)
            .enter().append("text")
            // .style("width","100%")
            .style("font-size", function(d) {
                return d.size + "px";
            })
            .style("font-family", "Playfair")
            .style("font-style", "italic")
            .style("fill", function(d, i) {
                return "black";
            })
            .attr("text-anchor", "middle")
            .attr("transform", function(d) {
                return "translate(" + [d.x / 1.5, d.y / 1.5] + ")";
            })
            .text(function(d) {
                return d.text;
            });

    }
}


function resize() {
    // update width
    width = parseInt(d3.select('#chart').style('width'), 10);
    width = width - margin.left - margin.right;

    // resize the chart
    x.range([0, width]);
    d3.select(chart.node().parentNode)
        .style('height', (y.rangeExtent()[1] + margin.top + margin.bottom) + 'px')
        .style('width', (width + margin.left + margin.right) + 'px');

    chart.selectAll('rect.background')
        .attr('width', width);

    chart.selectAll('rect.percent')
        .attr('width', function(d) {
            return x(parseFloat(d.LexicalDiversity));
        });
    chart.selectAll('rect.num')
        .attr('width', function(d) {
            return x(parseFloat(d.absCount));
        });

    // update median ticks
    var median = d3.median(chart.selectAll('.bar').data(),
        function(d) {
            return (parseFloat(d.LexicalDiversity));
        });

    chart.selectAll('line.median')
        .attr('x1', x(median))
        .attr('x2', x(median));


    // update axes
    chart.select('.x.axis.top').call(xAxis.orient('top'));
    chart.select('.x.axis.bottom').call(xAxis.orient('bottom'));

    chart.selectAll('.author')
        .attr('x', width - 5);

    // xPosition = (width);
    // console.log(width);

    // chart.selectAll('#tooltip')
    //     .style("left", (width-250) + "px!important");
}

// highlight code blocks
hljs.initHighlighting();

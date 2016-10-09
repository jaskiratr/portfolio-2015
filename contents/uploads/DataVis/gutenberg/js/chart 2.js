var url = "topWords_mod.csv",
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
    percent = d3.format('%');
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

d3.csv(url).row(function(d) {
    d.percent = parseFloat(d.LexicalDiversity);
    d.num = d.id;
    d.absCount = parseFloat(d.absCount);
    d.com_words = d.freqDist;
    return d;
}).get(function(err, data) {
    // sort
    data = _.sortBy(data, 'percent').reverse();

    // set y domain
    y.domain(d3.range(data.length))
        .rangeBands([0, data.length * barHeight]);

    // set height based on data
    height = y.rangeExtent()[1];
    d3.select(chart.node().parentNode)
        .style('height', (height + margin.top + margin.bottom) + 'px')

    absolute();
    d3.select('#option1')
        .on("click", percentage);
    d3.select('#option2')
        .on("click", absolute);

    function percentage() {
        // Render the chart
        chart.selectAll('g')
            .remove();
        // Sort data
        data = _.sortBy(data, 'percent').reverse(); // Change to abs

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
            .attr('width', width)
            .on("click", function(d, i) {
                tooltip(d, i);
            })
            .on("mouseout", function() {
                d3.select("#tooltip").classed("hidden", true);
            });;
        // Red Rectangle
        bars.append('rect')
            .attr('class', 'percent')
            .attr('height', y.rangeBand())
            .attr('width', function(d) {
                return x(d.percent);
            })
            .on("click", function(d, i) {
                tooltip(d, i);
            })
            .on("mouseout", function() {
                d3.select("#tooltip").classed("hidden", true);
            });

        // Title text
        bars.append('text')
            .text(function(d) {
                return d.title;
            })
            .attr('class', 'title')
            .attr('y', y.rangeBand() - 5)
            .attr('x', spacing);
        //Author Text
        bars.append('text')
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
                return d.percent;
            });

            d3.select('span.median').text(percent(median / 100));

            bars.append('line')
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
        // csv.sort(function(a,b) {return b.absCount-a.absCount;});

        x = d3.scale.linear()
            .range([0, width])
            .domain([0, 50000]); // Modify Domain

        chart.append('g')
            .attr('class', 'x axis top')
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
            .attr('width', width)
            .on("click", function(d, i) {
                tooltip(d, i);
            })
            .on("mouseout", function() {
                d3.select("#tooltip").classed("hidden", true);
            });

        bars.append('rect')
            .attr('class', 'num')
            .attr('height', y.rangeBand())
            .attr('width', function(d) {
                return (x(d.absCount));
            })
            .on("click", function(d, i) {
                tooltip(d, i);
            })
            .on("mouseout", function() {
                d3.select("#tooltip").classed("hidden", true);
            });

        bars.append('text')
            .text(function(d) {
                return d.title;
            })
            .attr('class', 'book_name_2')
            .attr('y', y.rangeBand() - 5)
            .attr('x', spacing);

        bars.append('text')
            .text(function(d) {
                return d.author;
            })
            .attr('class', 'author')
            .attr('y', y.rangeBand() - 5)
            .attr('x', width - 5)
            .style("text-anchor", "end");
    }
});

// resize
d3.select(window).on('resize', resize);

function tooltip(d, i) {
    //Get this bar's x/y values, then augment for the tooltip
    //Update Tooltip Position & value
    var xPosition = (0);
    var yPosition = y(i) + 467;
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
        .text(d.com_words);
    d3.select("#tooltip").classed("hidden", false);

    var fill = d3.scale.category20();

    d3.layout.cloud().size([300, 300])
        .words([
            "Hello", "world", "normally", "you", "want", "more", "words",
            "than", "this"
        ].map(function(d) {
            return {
                text: d,
                size: 10 + Math.random() * 90
            };
        }))
        .padding(5)
        .rotate(function() {
            return ~~(Math.random() * 2) * 90;
        })
        .font("lato")
        .fontSize(function(d) {
            return d.size;
        })
        .on("end", draw)
        .start();

    function draw(words) {
        d3.select("#tooltip").append("svg")
            .attr("width", 300)
            .attr("height", 300)
            .append("g")
            .attr("transform", "translate(150,150)")
            .selectAll("text")
            .data(words)
            .enter().append("text")
            .style("font-size", function(d) {
                return d.size + "px";
            })
            .style("font-family", "lato")
            .style("fill", function(d, i) {
                return fill(i);
            })
            .attr("text-anchor", "middle")
            .attr("transform", function(d) {
                return "translate(" + [d.x, d.y] + ")";
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
            return x(d.percent);
        });

    // update median ticks
    var median = d3.median(chart.selectAll('.bar').data(),
        function(d) {
            return (d.percent);
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

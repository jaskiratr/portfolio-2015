var length;
var data;
var points = [];
// array of 240 points


function setup() {
    createCanvas(720, 720);
    loadJSON('http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson', quake);
    // console.log(data.features.length);
}

function draw() {
    background(200);

    push();
    translate(width / 2, height / 2);
    fill(0);
    // ellipse(0, 0, 300, 300);
    pop();

    var radius = 300;
    var numPoints = length;	// 240 points
    var angle = 3.14*2 / numPoints;
    push();
    translate(width / 2, height / 2);
    fill(0);
    rotate(-PI/2);
  
    for (var i = 0; i < points.length; i++) {
    	var magnitude = points[i].x*10+150;
    	var angle = points[i].y;
    	var point_x = sin(angle)*magnitude;
    	var point_y = cos(angle)*magnitude;
        // ellipse(points[i].x*10 * sin(angle * i), points[i].x *10* cos(angle * i),10,10);
        stroke(70);
        ellipse( point_x,point_y,2,2 );
        stroke(220);
        line(0,0,point_x,point_y);
    }
      ellipse(0, 0, 5, 5);
      // ellipse(sin(PI/4)*100, cos(PI/4)*100, 10, 10);

    pop();
    // console.log((data.features.length));

}

function quake(content) {
    data= content;
    
    console.log("Total elements",content.features.length);
    // length= content.features.length;
    for (var i = 0; i < content.features.length; i++) {
        // points[i]= content.features[i].properties.mag;
        var mag = content.features[i].properties.mag;
        var direction = content.features[i].properties.time;
        points[i]= createVector(mag,direction);
    };
    
	// Find min - max time
    
    var max_of_array = 0;
    var min_of_array = points[1].y;
    for (var i = 0; i < points.length; i++) {
    	// console.log(points[i].x);
    	if(points[i].y>max_of_array)
    		max_of_array=points[i].y;
    	if(points[i].y<min_of_array)
    		min_of_array=points[i].y;
    };
    console.log(max_of_array);
    console.log(min_of_array);

    // Map it
    for (var i = 0; i < points.length; i++) {
    	points[i].y=points[i].y.map(min_of_array,max_of_array,0,2*PI);
    	// console.log(points[i].y);
    }

    // Find min - max time
			    // var max_of_array = Math.max.apply(Math, points.x);
			    // console.log(max_of_array);
    // map direction 0-360 to min-max time
    // draw mag from center in respective direction 

    // console.log(content.features[0].properties.time);
    // var millis =content.features[0].properties.time;
    // var myDate = new Date(millis);
    // console.log(myDate);
    // console.log(myDate.getHours());

    for (var i = 0; i < content.features.length; i++) {
        // find time. = add magnitude to the radius
    };

    var mag = Number(content.features[1].properties.mag);
    size = mag * 10;

    // console.log((data));
    // console.log((size));
    // var num = 4;
	// console.log( num.map( 0 , 10 , -50 , 50 ) ); // 0
	// console.log( num.map( -20 , 0 , -100 , 100 ) ); // 150
   
}

Number.prototype.map = function ( in_min , in_max , out_min , out_max ) {
  return ( this - in_min ) * ( out_max - out_min ) / ( in_max - in_min ) + out_min;
}

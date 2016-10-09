var length;
var data;
var points = [];
// array of 240 points


function setup() {
    createCanvas(windowWidth, windowHeight);
    loadJSON('http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson', quake);
    // console.log(data.features.length);
}

function draw() {
    background(255, 248, 219);

    var radius = 300;
    var numPoints = length;	// 240 points
    var angle = 3.14*2 / numPoints;
    
    push();
    translate(width / 2, height / 2);
    fill(0);
    rotate(-PI/2);
  	
  	// --------------------Central lines and points--------------------
    var disp_count=0;
    for (var i = 0; i < points.length; i++) {
    	var magnitude = points[i].x*10+150;
    	var angle = points[i].y;
    	var point_x = sin(angle)*magnitude;
    	var point_y = cos(angle)*magnitude;
        stroke(70);
        ellipse( point_x,point_y,2,2 );

        // console.log(points[i].z);
        
        var angle_ref = atan2(height/2-mouseY,mouseX-width/2);
        if(abs(angle_ref-angle)<PI/360){
        	// strokeWeight(3);
        	disp_count++;
        	// text(disp_count,400,100);
        	stroke(100);
        	textSize(15);
        	fill(0, 102, 153);
        	push();
        	rotate(PI/2);
			text(points[i].z, 400,20*disp_count);
			pop(); 
        }else{
        	stroke(239, 225, 169);
        }       
        textSize(100);
        push();
        rotate(PI/2);
        var time_hr;
        var time_min;
        time_hr = atan2(height/2-mouseY,mouseX-width/2);
        // angle_ref*=180/PI;
        // angle_ref-=360;
	    console.log(time_hr);
	    time_hr = time_hr.map(-PI,+PI,0,23);	/////////////////
	    time_min = time_hr.map(-PI,+PI,0,59);	/////////////////
	    time_hr=time_hr.toFixed(0);
	    // time_min=time_min.toFixed(0);
        text((time_min+"Hrs"),400,-100);
        pop();
        line(0,0,point_x,point_y);
    }
    // ----------------------------------------
	ellipse(0, 0, 5, 5);
	noFill();
	ellipse(0,0,300,300);
    
    // --------------------Middle Graph--------------------
    beginShape();
    noFill();
    stroke(239, 225, 169);
    strokeWeight(2);
    for (var i = 0; i < points.length; i++) {
    	var magnitude = points[i].x*10+200;
    	var angle = points[i].y;
    	var point_x = sin(angle)*magnitude;
    	var point_y = cos(angle)*magnitude;	
		vertex(point_x, point_y);
    }
    endShape(CLOSE);

    // --------------------Clock Points--------------------
    var radius=300;
	var numPoints=24*10;
	var angle=2*PI/numPoints;
	for(var i=0;i<numPoints;i++)
	{	
	  line(radius*sin(angle*i),radius*cos(angle*i),(radius+10)*sin(angle*i),(radius+10)*cos(angle*i));
	};

	numPoints = 24;
	angle = 2*PI/numPoints;
	radius=290;
	for (var i = 0; i < 24; i++) {
		strokeWeight(2);
		stroke (211, 196, 135);
	 	line(radius*sin(angle*i),radius*cos(angle*i),(radius+30)*sin(angle*i),(radius+30)*cos(angle*i));

	 	// push();
	 	// rotate(-PI/2);
	 };
    pop();
    // --------------------Clock Numbers--------------------
    push();
	translate(width/2,height/2);
	rotate(-PI);
	radius=340;
	textSize(20);
	for (var i = 0; i < 24; i++) {
		push();
		translate((radius)*sin(angle*i),(radius)*cos(angle*i));
		rotate(PI);
		noStroke();
		fill(100);
		textSize(15);
		text(24-i,-8,6);
		pop();
	};
	pop();
}

function quake(content) {
    data= content;
    
    console.log("Total elements",content.features.length);
    // length= content.features.length;
    for (var i = 0; i < content.features.length; i++) {
        // points[i]= content.features[i].properties.mag;
        var mag = content.features[i].properties.mag;
        var direction = content.features[i].properties.time;
        var place = content.features[i].properties.place;
        points[i]= createVector(mag,direction,place);
        // console.log(points[i]);
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

    	// var millis =content.features[i].properties.time;
	    // var myDate = new Date(millis);
	    // console.log(myDate);
	    // console.log(myDate.getHours());
	    	// console.log(points[i].y);
    }
 	// var mag = Number(content.features[1].properties.mag);
  //   size = mag * 10;
    // Find min - max time
			    // var max_of_array = Math.max.apply(Math, points.x);
			    // console.log(max_of_array);
    // map direction 0-360 to min-max time
    // draw mag from center in respective direction 

    // console.log(content.features[0].properties.time);
 
   

    // console.log((data));
    // console.log((size));
    // var num = 4;
	// console.log( num.map( 0 , 10 , -50 , 50 ) ); // 0
	// console.log( num.map( -20 , 0 , -100 , 100 ) ); // 150
   
}

Number.prototype.map = function ( in_min , in_max , out_min , out_max ) {
  return ( this - in_min ) * ( out_max - out_min ) / ( in_max - in_min ) + out_min;
}

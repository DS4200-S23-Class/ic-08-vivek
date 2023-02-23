// GLOBAL CONSTANTS
const MARGINS = {left: 50, right: 50, top: 50, bottom: 50};
const FRAME_HEIGHT = 500;
const FRAME_WIDTH = 500; 

const GRAPH_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right; 
const GRAPH_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;

const BAR_FRAME = d3.select(".bar") 
                  .append("svg") 
                    .attr("height", FRAME_HEIGHT)   
                    .attr("width", FRAME_WIDTH)
                    .attr("class", "frame");

// BAR GRAPH CONTAINER
d3.csv("data/data.csv").then((data) => { 
    console.log(data)


	const YMAX = d3.max(data, (d) => { 
        return parseInt(d.value); 
    });

	const Y_SCALE_BAR = d3.scaleLinear() 
	                   .domain([0, YMAX])  
	                   .range([GRAPH_HEIGHT, 0]);


	const X_SCALE = d3.scaleBand()
		.range([ 0, GRAPH_WIDTH ])
		.domain(data.map(function(d) { return d.category; }))
		.padding(0.2);

	const BAR_WIDTH = 25;

	// X AXIS
	BAR_FRAME.append("g")
		 .attr("transform", "translate(" + MARGINS.left + 
		  "," + (GRAPH_HEIGHT+ MARGINS.bottom) + ")")
		 .call(d3.axisBottom(X_SCALE))
		 .selectAll("text")
		   .attr("font-size", '12px');


	// Y AXIS 
	BAR_FRAME.append("g")
	   .attr("transform", "translate(" + MARGINS.left + "," + MARGINS.top + ")") 
		 .call(d3.axisLeft(Y_SCALE_BAR))
		 .selectAll("text")
		   .attr("font-size", '12px');

	// BAR GRAPH CONSTRUCTION
    // plot our points
    BAR_FRAME.selectAll("bars")  
        .data(data) 
        .enter()       
        .append("rect")  
          .attr("x", (d) => { return (X_SCALE(d.category) + MARGINS.left + 10); }) 
          .attr("y", (d) => { return (Y_SCALE_BAR(d.value) + MARGINS.top); }) 
          .attr("width", 40)
          .attr("height", (d) => {return GRAPH_HEIGHT - Y_SCALE_BAR(d.value)})
          .attr("class", "bar")
          .style("fill", "blue");

/* 
	BAR_FRAME.selectAll("bar")
        .data(data)
        .enter()
        .append("rect")
            .attr("x", function(d) { 
                return X_SCALE(d.category) + MARGINS.left; 
            })
            .attr("y", function(d) { 
                return Y_SCALE_BAR(d.amount) + MARGINS.top; 
            })
            .attr("width", BAR_WIDTH)
            .attr("height", function(d) { 
                return GRAPH_HEIGHT - Y_SCALE_BAR(d.amount); 
            })
            .attr("class", "bar");     */

});
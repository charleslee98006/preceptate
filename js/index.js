var path='';
var wordList1=[];
var wordList2=[]; 
var a =0;
var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
var turningOffTimer = false;
var interval1, interval2, interval3;
var toggleSun1, toggleSun2, toggleSun3;
var selectionTracker;
var TutorialControllerOn =false;
var itemTracker = '';
var indContentController = false;
$(document).ready(function () {
toggleSun1= true,
toggleSun2 = true,
toggleSun3 = true;
// console.log(w);
// console.log(h);
console.log($(this).id);
	// if(""){
	// 			$('#individualContent').css({
	// 				"visibility":"hidden"
	// 	});
$("div").on( "click", function() {

  var id = $(this).attr('id');
  var classInfo = $(this).attr('class');
  console.log(classInfo);
  console.log(id);
  if(id == "Sunburst1Chart"){
  	clickPolice();
	popoReplaceText();
	if(indContentController==false){
	  	$('#individualContent').css({
	  		"visibility":"hidden"
	  	});
	}
  }
  else if(id=="Sunburst2Chart"){
  	clickNews();
  	newsReplaceText();
  	if(indContentController==false){
	  	$('#individualContent').css({
	  		"visibility":"hidden"
	  	});
	}
  }
  else if(id=="Sunburst3Chart"){
  	clickMedia();
  	socialReplaceText();
  	if(indContentController==false){
	  	$('#individualContent').css({
	  		"visibility":"hidden"
	  	});
	}
  }
  else if(id=="cancelButton"){
  	console.log(id);
  	if(indContentController==true){
	  	$('#individualContent').css({
	  		"visibility":"visible"
	  	});
	}
  	$("#layoutTitleDescriptions").fadeToggle( "fast", "linear" );
  	// $("#buttonShow").fadeIn('slow');
  	$("#buttonShow").append("<p> toggle</p>");
  	$("#buttonShow").css({
  		'left': ((w-90) + "px"),
  		'background-color': '#798585'
  	});
  }
  else if(id =="buttonShow"){
  	$('#individualContent').css({
  		"visibility":"hidden"
  	});
  	$("#layoutTitleDescriptions").fadeToggle( "fast", "linear" );
  	// $("#buttonShow").fadeOUt('slow');
  	$('#buttonShow').empty();
  	$("#buttonShow").attr('style','');
  }
 else if (id == "tutorialPage"){
 	$("#SunBurstContent").hide("fast");
 	// $('#tutorialPageContent').show('fast');

 	if(TutorialControllerOn==false){
 		$('footer p > img').css({
 			'transform': "rotate(180deg)"
 		});
	 	$("#tutorialPageContent").animate({
	 		"width": "100%",
	 		"height": h+"px"
	 		
	 		// transform: "rotate(15deg)"
	 	},500, function(){
	 	$('#tutorialPageContent').css({'visibility':'visible'});
	 	$('#footerPos').css({
	 		'border-style':'solid',
	 		'border-width': '2px',
	 		'border-bottom':'0px'

	 	});
	 		TutorialControllerOn=true;
	 	});
	}
	else if(TutorialControllerOn==true){
 	 // $('#tutorialPageContent').hide('fast');
 		$('footer p > img').css({
 				'transform': "rotate(0deg)"
 			});
	 	$("#tutorialPageContent").animate({
	 		"width": "100%",
	 		"height": "0px"
	 		
	 		
	 		// transform: "rotate(15deg)"
	 	},500, function(){
	 		TutorialControllerOn=false;
	 		$('#tutorialPageContent').css({'visibility':'hidden'});
	 		$('#footerPos').css({
	 		'border-width': '0px'

	 	});
	 		$("#SunBurstContent").show("fast");
	 	});
	}

 }
    // Animation complete.

});
clickPolice();


function isParentOf(p, c) {
  if (p === c) return true;
  if (p.children) {
    return p.children.some(function(d) {
      return isParentOf(d, c);
    });
  }
  return false;
}

function colour(d) {
  if (d.children) {
    // There is a maximum of two children!
    var colours = d.children.map(colour),
        a = d3.hsl(colours[0]),
        b = d3.hsl(colours[1]);
    // L*a*b* might be better here...
    return d3.hsl((a.h + b.h) / 2, a.s * 1.2, a.l / 1.2);
  }
  return d.colour || "#fff";
}

// Interpolate the scales!
function arcTween(d) {
  var my = maxY(d),
      xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
      yd = d3.interpolate(y.domain(), [d.y, my]),
      yr = d3.interpolate(y.range(), [d.y ? 20 : 0, radius]);
  return function(d) {
    return function(t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); return arc(d); };
  };
}

function maxY(d) {
  return d.children ? Math.max.apply(Math, d.children.map(maxY)) : d.y + d.dy;
}

// http://www.w3.org/WAI/ER/WD-AERT/#color-contrast
function brightness(rgb) {
  return rgb.r * .299 + rgb.g * .587 + rgb.b * .114;
}

function clickPolice() {
	indContentController=false;
	$("#SunburtChart").html("");
	$("#SunburtChart").fadeIn("slow", function() {
    // Animation complete.
  });


	// $("#Sunburst3Chart").empty();	
 //  $("#Sunburst2Chart").empty();
	width = 700,
	    height = width,
	    radius = width / 2,
	    x = d3.scale.linear().range([0, 2 * Math.PI]),
	    y = d3.scale.pow().exponent(1.3).domain([0, 1]).range([0, radius]),
	    padding = 5,
	    duration = 1000;


  div = d3.select("#SunburtChart");

  div.select("img").remove();

  vis = div.append("svg")
      .attr("width", width + padding * 2)
      .attr("height", height + padding * 2)
    .append("g")
      .attr("transform", "translate(" + [radius + padding, radius + padding] + ")");


      partition = d3.layout.partition()
      .sort(null)
      .value(function(d) { return 5.8 - d.depth; });


  arc = d3.svg.arc()
      .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x))); })
      .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))); })
      .innerRadius(function(d) { return Math.max(0, d.y ? y(d.y) : d.y); })
      .outerRadius(function(d) { return Math.max(0, y(d.y + d.dy)); });


  $.getJSON("./AssaultRobberyDS.json", function(json) {
  //$.getJSON("file:///C:/Users/Charles/Desktop/Spring 2015/3705Project3/Sample1.json", function(json) {
  //console.log(partition.nodes(json.children); 
   nodes = partition.nodes({children: json});
  //  console.log(nodes);  
  //  
    path = vis.selectAll("path").data(nodes);
    path.enter().append("path")
        .attr("id", function(d, i) { 
          //console.log(d.depth);
          return "path-" + i; })
        .attr("d", arc)
        .attr("fill-rule", "evenodd")
        .style("fill", function(d){
         //console.log(d.parent);
          if(d.depth > 1){
            //console.log(d);
              if(d.parent.name =="Assault"){
                  return "#5e313c";
              }
              else if(d.parent.name == "Robbery"){
                  return "#484848"
              }
              else if (d.parent.name == "Homicide") {
                return "#433b48"
             }
              return "#43423512";
          }
          else{
              if(d.name== "Assault"){
                  return "#905a68";
             }
             else if(d.name =="Robbery"){
              return "#7b9095";
             }
             else if (d.name == "Homicide") {
              return "#867791"
             }
          }
        })
        .on("click", click);

     text = vis.selectAll("text").data(nodes);
     textEnter = text.enter().append("text")
        .style("fill-opacity", 1)
        .style("fill", function(d) {

  //        console.log(brightness(d3.rgb(colour(d))) < 125?);
          // console.log(brightness(d3.rgb(colour(d))) < 125 ? "#eee" : "#000");
          return brightness(d3.rgb(colour(d))) < 125 ? "#eee" : "#000";
        })
        .attr("text-anchor", function(d) {
          return x(d.x + d.dx / 2) > Math.PI ? "end" : "start";
        })
        .attr("dy", ".2em")
        .attr("transform", function(d) {
          multiline = (d.name || "").split(" ").length > 1,
              angle = x(d.x + d.dx / 2) * 180 / Math.PI - 90,
              rotate = angle + (multiline ? -.5 : 0);
          return "rotate(" + rotate + ")translate(" + (y(d.y) + padding) + ")rotate(" + (angle > 90 ? -180 : 0) + ")";
        })
        .on("click", click);
    textEnter.append("tspan")
        .attr("x", 0)
        .text(function(d) { 
          //console.log(d.name);
          // console.log(d.depth ? d.name.split(" ")[0]);
          if(d.depth>1){
            //console.log(d.depth);
            // console.log(d[0]);
             return ( "Case "+ d[0]+""); 
          }
              return d.depth ? d.name.split(" ")[0] : ""; });
        // console.log(d);
    textEnter.append("tspan")
        .attr("x", 0)
        .attr("dy", "1em")
        .text(function(d) { 
          // if(d.depth>1){
          //     console.log("asdsad:" + d[16]+"");
          //    return (d[16]+""); 
          // }
          return d.depth ? d.name.split(" ")[1] || "" : ""; });

    function click(d) {
    	console.log("Report: "+d);
      path.transition()
        .duration(duration)
        .attrTween("d", arcTween(d));

      // Somewhat of a hack as we rely on arcTween updating the scales.
      text.style("visibility", function(e) {
            return isParentOf(d, e) ? null : d3.select(this).style("visibility");
          })
        .transition()
          .duration(duration)
          .attrTween("text-anchor", function(d) {
            return function() {
              return x(d.x + d.dx / 2) > Math.PI ? "end" : "start";
            };
          })
          .attrTween("transform", function(d) {
            multiline = (d.name || "").split(" ").length > 1;
            return function() {
              angle = x(d.x + d.dx / 2) * 180 / Math.PI - 90,
                  rotate = angle + (multiline ? -.5 : 0);
              return "rotate(" + rotate + ")translate(" + (y(d.y) + padding) + ")rotate(" + (angle > 90 ? -180 : 0) + ")";
            };
          })
          .style("fill-opacity", function(e) { return isParentOf(d, e) ? 1 : 1e-6; })
          .each("end", function(e) {
            d3.select(this).style("visibility", isParentOf(d, e) ? null : "hidden");
          });
          console.log(d[0]);
        if((d[0]!=itemTracker) && (d[0]!=undefined)){
        	$('#individualContent').css({
				"visibility":"visible"
			});
        	$('#buttonShow').empty();
        	$('#individualContent').empty();
        	$("#buttonShow").attr('style','');
        	$("#layoutTitleDescriptions").fadeOut( "fast");
        	$("#buttonShow").append("<p> toggle</p>");
	  		$("#buttonShow").css({
		  		'left': ((w-90) + "px"),
		  		'background-color': '#798585'
	  		});
	  		$('#individualContent').append("<p>Case: "+d[0]+"</p><p>Time: "+d[15]+"</p><p>Address: "+d[16]+"</p></p>");
	  		itemTracker = d[0];
	  		indContentController = true;
	  	}


    }
  });
	
};


function clickNews() {
	indContentController=false;
	$("#SunburtChart").html("");
	// $("#Sunburst3Chart").empty();	
 //  $("#Sunburst2Chart").empty();

	width = 700,
	    height = width,
	    radius = width / 2,
	    x = d3.scale.linear().range([0, 2 * Math.PI]),
	    y = d3.scale.pow().exponent(1.3).domain([0, 1]).range([0, radius]),
	    padding = 5,
	    duration = 1000;

  div = d3.select("#SunburtChart");

  div.select("img").remove();

  vis = div.append("svg")
      .attr("width", width + padding * 2)
      .attr("height", height + padding * 2)
    .append("g")
      .attr("transform", "translate(" + [radius + padding, radius + padding] + ")");

  // div.append("p")
  //     .attr("id", "intro")
  //     .text("Click to zoom!");


  // <div id="option">
  //     <input name="updateButton" 
  //                  type="button" 
  //                 value="Update" 
  //                 onclick="updateData()" />
  //</div>



  partition = d3.layout.partition()
      .sort(null)
      .value(function(d) { return 5.8 - d.depth; });

  arc = d3.svg.arc()
      .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x))); })
      .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))); })
      .innerRadius(function(d) { return Math.max(0, d.y ? y(d.y) : d.y); })
      .outerRadius(function(d) { return Math.max(0, y(d.y + d.dy)); });
  //    console.log("hi");
  $.getJSON("./NewsArticles.json", function(json) {
  //$.getJSON("file:///C:/Users/Charles/Desktop/Spring 2015/3705Project3/Sample1.json", function(json) {
  //console.log(partition.nodes(json.children); 
  nodes = partition.nodes({children: json});
  //  console.log(nodes);  
  //  
  path = vis.selectAll("path").data(nodes);
    path.enter().append("path")
        .attr("id", function(d, i) { 
          //console.log(d.depth);
          return "path-" + i; })
        .attr("d", arc)
        .attr("fill-rule", "evenodd")
        .style("fill", function(d){
         //console.log(d.parent);
          if(d.depth > 1){
            //console.log(d);
              if(d.parent.name =="Assault"){
                  return "#5e313c";
              }
              else if(d.parent.name == "Robbery"){
                  return "#484848"
              }
              else if (d.parent.name == "Homicide") {
                return "#433b48"
             }
              return "#43423512";
          }
          else{
              if(d.name== "Assault"){
                  return "#905a68";
             }
             else if(d.name =="Robbery"){
              return "#7b9095";
             }
             else if (d.name == "Homicide") {
              return "#867791"
             }
          }
        })
        .on("click", click);

   	text = vis.selectAll("text").data(nodes);
    textEnter = text.enter().append("text")
        .style("fill-opacity", 1)
        .style("fill", function(d) {

  //        console.log(brightness(d3.rgb(colour(d))) < 125?);
          // console.log(brightness(d3.rgb(colour(d))) < 125 ? "#eee" : "#000");
          return brightness(d3.rgb(colour(d))) < 125 ? "#eee" : "#000";
        })
        .attr("text-anchor", function(d) {
          return x(d.x + d.dx / 2) > Math.PI ? "end" : "start";
        })
        .attr("dy", ".2em")
        .attr("transform", function(d) {
          multiline = (d.name || "").split(" ").length > 1,
              angle = x(d.x + d.dx / 2) * 180 / Math.PI - 90,
              rotate = angle + (multiline ? -.5 : 0);
          return "rotate(" + rotate + ")translate(" + (y(d.y) + padding) + ")rotate(" + (angle > 90 ? -180 : 0) + ")";
        })
        .on("click", click);
    textEnter.append("tspan")
        .attr("x", 0)
        .text(function(d) { 
          //console.log(d.name);
          // console.log(d.depth ? d.name.split(" ")[0]);
          if(d.depth>1){
            //console.log(d.depth);
            console.log(d[0]);
             return ( "Case "+ d[0].location+""); 
          }
              return d.depth ? d.name.split(" ")[0] : ""; });
        // console.log(d);
    textEnter.append("tspan")
        .attr("x", 0)
        .attr("dy", "1em")
        .text(function(d) { 
          // if(d.depth>1){
          //     console.log("asdsad:" + d[16]+"");
          //    return (d[16]+""); 
          // }
          return d.depth ? d.name.split(" ")[1] || "" : ""; 
    });

    function click(d) {
    	console.log("HIDHIDHI"+d);
    	console.log(d);
      path.transition()
        .duration(duration)
        .attrTween("d", arcTween(d));

      // Somewhat of a hack as we rely on arcTween updating the scales.
      text.style("visibility", function(e) {
            return isParentOf(d, e) ? null : d3.select(this).style("visibility");
          })
        .transition()
          .duration(duration)
          .attrTween("text-anchor", function(d) {
            return function() {
              return x(d.x + d.dx / 2) > Math.PI ? "end" : "start";
            };
          })
          .attrTween("transform", function(d) {
            var multiline = (d.name || "").split(" ").length > 1;
            return function() {
              var angle = x(d.x + d.dx / 2) * 180 / Math.PI - 90,
                  rotate = angle + (multiline ? -.5 : 0);
              return "rotate(" + rotate + ")translate(" + (y(d.y) + padding) + ")rotate(" + (angle > 90 ? -180 : 0) + ")";
            };
          })
          .style("fill-opacity", function(e) { return isParentOf(d, e) ? 1 : 1e-6; })
          .each("end", function(e) {
            d3.select(this).style("visibility", isParentOf(d, e) ? null : "hidden")

          });
        if((d[0]!=itemTracker) && (d[0]!=undefined)){
        	$('#individualContent').css({
				"visibility":"visible"
			});
        	$('#buttonShow').empty();
        	$('#individualContent').empty();
        	$("#buttonShow").attr('style','');
        	$("#layoutTitleDescriptions").fadeOut( "fast");
        	$("#buttonShow").append("<p> toggle</p>");
	  		$("#buttonShow").css({
		  		'left': ((w-90) + "px"),
		  		'background-color': '#798585'
	  		});
	  		$('#individualContent').append("<p>Case: "+d[0].location+"</p><p>Time: "+d[0].date+"</p><p>Address: <a href='"+d[0].link+"'>"+d[0].link+"</a></p>");
	  		itemTracker = d[0].location;
	  		indContentController = true;
	  	}

    }
  });

}


function clickMedia() {
	indContentController=false;
  	$("#SunburtChart").html("");
  	width = 700,
    height = width,
    radius = width / 2,
    x = d3.scale.linear().range([0, 2 * Math.PI]),
    y = d3.scale.pow().exponent(1.3).domain([0, 1]).range([0, radius]),
    padding = 5,
    duration = 1000;
	// $("#Sunburst3Chart").empty();	
	// $("#Sunburst2Chart").empty();
  	div = d3.select("#SunburtChart");

  div.select("img").remove();

  vis = div.append("svg")
      .attr("width", width + padding * 2)
      .attr("height", height + padding * 2)
    .append("g")
      .attr("transform", "translate(" + [radius + padding, radius + padding] + ")");



  partition = d3.layout.partition()
      .sort(null)
      .value(function(d) { return 5.8 - d.depth; });

  arc = d3.svg.arc()
      .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x))); })
      .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))); })
      .innerRadius(function(d) { return Math.max(0, d.y ? y(d.y) : d.y); })
      .outerRadius(function(d) { return Math.max(0, y(d.y + d.dy)); });
  //    console.log("hi");
  $.getJSON("./SharesArticles.json", function(json) {
  //$.getJSON("file:///C:/Users/Charles/Desktop/Spring 2015/3705Project3/Sample1.json", function(json) {
  //console.log(partition.nodes(json.children); 
    nodes = partition.nodes({children: json});
  //  console.log(nodes);  
  //  
    path = vis.selectAll("path").data(nodes);
    path.enter().append("path")
        .attr("id", function(d, i) { 
          //console.log(d.depth);
          return "path-" + i; })
        .attr("d", arc)
        .attr("fill-rule", "evenodd")
        .style("fill", function(d){
         //console.log(d.parent);
            if(d.depth > 1){
            //console.log(d);
              if(d.parent.name =="Assault"){
                if(d[0].share == "Facebook") {
                  return "#5e313c";
                } else {
                  return "#4b2730";
                }
              }
              else if(d.parent.name == "Robbery"){

                if(d[0].share == "Facebook") {
                  return "#484848";
                } else {
                  return "#393939";
                }
              }
              else if (d.parent.name == "Homicide") {

                if(d[0].share == "Facebook") {
                  return "#433b48";
                } else {
                  return "#352f39";
                }
             }
              return "#43423512";
          }
          else{
              if(d.name== "Assault"){
                  return "#905a68";
             }
             else if(d.name =="Robbery"){
              return "#7b9095";
             }
             else if (d.name == "Homicide") {
              return "#867791"
             }
          }
        });
		// .on("click", click);
   //        	$('#individualContent').css({
			// 	"visibility":"visible"
			// });
   //      	$('#buttonShow').empty();
   //      	$('#individualContent').empty();
   //      	$("#buttonShow").attr('style','');
   //      	$("#layoutTitleDescriptions").fadeOut( "fast");
   //      	$("#buttonShow").append("<p> toggle</p>");
	  // 		$("#buttonShow").css({
		 //  		'left': ((w-90) + "px"),
		 //  		'background-color': '#798585'
	  // 		});
	  // 		$('#individualContent').append("<p>Case: </p><p>Time: </p><p>Address: </p>");
	  // 		indContentController = true;

    text = vis.selectAll("text").data(nodes);
    textEnter = text.enter().append("text")
        .style("fill-opacity", 1)
        .style("fill", function(d) {

  //        console.log(brightness(d3.rgb(colour(d))) < 125?);
          // console.log(brightness(d3.rgb(colour(d))) < 125 ? "#eee" : "#000");
          return brightness(d3.rgb(colour(d))) < 125 ? "#eee" : "#000";
        })
        .attr("text-anchor", function(d) {
          return x(d.x + d.dx / 2) > Math.PI ? "end" : "start";
        })
        .attr("dy", ".2em")
        .attr("transform", function(d) {
          multiline = (d.name || "").split(" ").length > 1,
              angle = x(d.x + d.dx / 2) * 180 / Math.PI - 90,
              rotate = angle + (multiline ? -.5 : 0);
          return "rotate(" + rotate + ")translate(" + (y(d.y) + padding) + ")rotate(" + (angle > 90 ? -180 : 0) + ")";
        });
        // .on("click", click);
    textEnter.append("tspan")
        .attr("x", 0)
        .text(function(d) { 
          //console.log(d.name);
          // console.log(d.depth ? d.name.split(" ")[0]);
          if(d.depth>1){
            //console.log(d.depth);
            console.log(d[0]);
             return (d[0].share+""); 
          }
              return d.depth ? d.name.split(" ")[0] : ""; });
        // console.log(d);
    textEnter.append("tspan")
        .attr("x", 0)
        .attr("dy", "1em")
        .text(function(d) { 
          // if(d.depth>1){
          //     console.log("asdsad:" + d[16]+"");
          //    return (d[16]+""); 
          // }
          return d.depth ? d.name.split(" ")[1] || "" : ""; });

    function click(d) {
    	console.log("HIDHIDHI22222"+d);
      path.transition()
        .duration(duration)
        .attrTween("d", arcTween(d));

      // Somewhat of a hack as we rely on arcTween updating the scales.
      text.style("visibility", function(e) {
            return isParentOf(d, e) ? null : d3.select(this).style("visibility");
          })
        .transition()
          .duration(duration)
          .attrTween("text-anchor", function(d) {
            return function() {
              return x(d.x + d.dx / 2) > Math.PI ? "end" : "start";
            };
          })
          .attrTween("transform", function(d) {
            var multiline = (d.name || "").split(" ").length > 1;
            return function() {
              var angle = x(d.x + d.dx / 2) * 180 / Math.PI - 90,
                  rotate = angle + (multiline ? -.5 : 0);
              return "rotate(" + rotate + ")translate(" + (y(d.y) + padding) + ")rotate(" + (angle > 90 ? -180 : 0) + ")";
            };
          })
          .style("fill-opacity", function(e) { return isParentOf(d, e) ? 1 : 1e-6; })
          .each("end", function(e) {
            d3.select(this).style("visibility", isParentOf(d, e) ? null : "hidden");
          });

    }
  });
}
var textHeight = $("#linkToNext").height()/2;
var textWidth = $("#linkToNext").width()/2;
// console.log("Percept Height:" + textHeight);
// console.log("Percept Width:" + textWidth);
var CenterScreenX = w/2;
var CenterSCreenY = h/2;
// console.log("asd=" + CenterSCreenY);
var centerX = (CenterScreenX - textWidth) + "px";
var centerY = (CenterSCreenY - textHeight) + "px";
// console.log(centerX);
// console.log(centerY);

$("#linkToNext").css({
      'top' : centerY,
      'left': centerX
    });

$('#Sunburst1Chart').hover(function() {
	console.log("I AM HOVERING!!!!");
      $( "#Sunburst1Chart" ).animate({
    right: "29%"
  }, 250 );
}, function(){
	   $( "#Sunburst1Chart" ).animate({
    right: "30%"
  }, 250 );
});
$('#linkToNext').hover(function(){
	$('#linkSubHeader').append("<p>Impression. Conception. Illusion.</p><p>Crime and the Media</p>");
	var centerX1 = (CenterScreenX - textWidth+150) + "px",
	centerY1 = (CenterSCreenY - textHeight+150) + "px";
	// console.log(centerY1);
	// console.log(centerX1);
	$("#linkSubHeader").css({
		'position': 'absolute',
      'top' : centerY1,
      'left': centerX1,
      'width': '240px',
      'text-align': 'center',
      'color':'white'
    });
}, function(){
	$('#linkSubHeader').empty();

});
var div1 = d3.select("#Sunburst1Chart");
var radius1 = 100;
    y1 = d3.scale.pow().exponent(1.3).domain([0, 1]).range([0, radius1]);


  div1.select("img").remove();

var vis1 = div1.append("svg")
      .attr("width", 200 + padding * 2)
      .attr("height", 200 + padding * 2)
    .append("g")
      .attr("transform", "translate(" + [radius1 + padding, radius1 + padding] + ")");

var partition1 = d3.layout.partition()
      .sort(null)
      .value(function(d) { return 5.8 - d.depth; });


  var arc1 = d3.svg.arc()
      .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x))); })
      .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))); })
      .innerRadius(function(d) { return Math.max(0, d.y ? y1(d.y) : d.y); })
      .outerRadius(function(d) { return Math.max(0, y1(d.y + d.dy)); });
  $.getJSON("./AssaultRobberyDS.json", function(json) {
  //$.getJSON("file:///C:/Users/Charles/Desktop/Spring 2015/3705Project3/Sample1.json", function(json) {
  //console.log(partition.nodes(json.children); 
   nodes1 = partition.nodes({children: json});
  //  console.log(nodes);  
  //  
    path1 = vis1.selectAll("path").data(nodes1);
    path1.enter().append("path")
        .attr("id", function(d, i) { 
          //console.log(d.depth);
          return "path-" + i; })
        .attr("d", arc1)
        .attr("fill-rule", "evenodd")
        .style("fill", function(d){
         //console.log(d.parent);
          if(d.depth > 1){
            //console.log(d);
              if(d.parent.name =="Assault"){
                  return "#5e313c";
              }
              else if(d.parent.name == "Robbery"){
                  return "#484848"
              }
              else if (d.parent.name == "Homicide") {
                return "#433b48"
             }
              return "#43423512";
          }
          else{
              if(d.name== "Assault"){
                  return "#905a68";
             }
             else if(d.name =="Robbery"){
              return "#7b9095";
             }
             else if (d.name == "Homicide") {
              return "#867791"
             }
          }
        })
        .on("click", click);
  });
 

$('#Sunburst2Chart').hover(function() {
	// console.log("I AM HOVERING!!!!");
      $( "#Sunburst2Chart" ).animate({
    right: "29%"
  }, 250 );
}, function(){
	   $( "#Sunburst2Chart" ).animate({
    right: "30%"
  }, 250 );
});

var div2 = d3.select("#Sunburst2Chart");
var radius2 = 100;
    y2 = d3.scale.pow().exponent(1.3).domain([0, 1]).range([0, radius2]);


  div2.select("img").remove();

var vis2 = div2.append("svg")
      .attr("width", 200 + padding * 2)
      .attr("height", 200 + padding * 2)
    .append("g")
      .attr("transform", "translate(" + [radius2 + padding, radius2 + padding] + ")");

var partition2 = d3.layout.partition()
      .sort(null)
      .value(function(d) { return 5.8 - d.depth; });


  var arc2 = d3.svg.arc()
      .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x))); })
      .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))); })
      .innerRadius(function(d) { return Math.max(0, d.y ? y2(d.y) : d.y); })
      .outerRadius(function(d) { return Math.max(0, y2(d.y + d.dy)); });

 $.getJSON("./NewsArticles.json", function(json) {
  //$.getJSON("file:///C:/Users/Charles/Desktop/Spring 2015/3705Project3/Sample1.json", function(json) {
  //console.log(partition.nodes(json.children); 
    var nodes2 = partition.nodes({children: json});
  //  console.log(nodes);  
  //  
    var path2 = vis2.selectAll("path").data(nodes2);
    path2.enter().append("path")
        .attr("id", function(d, i) { 
          //console.log(d.depth);
          return "path-" + i; })
        .attr("d", arc2)
        .attr("fill-rule", "evenodd")
        .style("fill", function(d){
         //console.log(d.parent);
          if(d.depth > 1){
            //console.log(d);
              if(d.parent.name =="Assault"){
                  return "#5e313c";
              }
              else if(d.parent.name == "Robbery"){
                  return "#484848"
              }
              else if (d.parent.name == "Homicide") {
                return "#433b48"
             }
              return "#43423512";
          }
          else{
              if(d.name== "Assault"){
                  return "#905a68";
             }
             else if(d.name =="Robbery"){
              return "#7b9095";
             }
             else if (d.name == "Homicide") {
              return "#867791"
             }
          }
        });
    });
// $('#cancelButton').hover(function() {
// 	console.log("cancel!!!");
// 	// $('#cancelButton').attr('style', 'border-width:5px');
// 	$("#cancelButton").css({ 

// 		"color": "gray",
// 		"border-width": "3px",
// 		"border-style": "solid",
// 		"text-align": "center"
// 	});

// }, 
// function() {
// 	$('#cancelButton').attr('style', 'color:black');
// 	$('#cancelButton').attr('style', 'border-width:0px');

// });
$('#Sunburst3Chart').hover(function() {
	// console.log("I AM HOVERING!!!!");
      $( "#Sunburst3Chart" ).animate({
    right: "24%"
  }, 250 );
}, function(){
	   $( "#Sunburst3Chart" ).animate({
    right: "25%"
  }, 250 );
});
var div3 = d3.select("#Sunburst3Chart");
var radius3 = 100;
    y3 = d3.scale.pow().exponent(1.3).domain([0, 1]).range([0, radius3]);


  div2.select("img").remove();

var vis3 = div3.append("svg")
      .attr("width", 200 + padding * 2)
      .attr("height", 200 + padding * 2)
    .append("g")
      .attr("transform", "translate(" + [radius3 + padding, radius3 + padding] + ")");

var partition3 = d3.layout.partition()
      .sort(null)
      .value(function(d) { return 5.8 - d.depth; });


  var arc3 = d3.svg.arc()
      .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x))); })
      .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))); })
      .innerRadius(function(d) { return Math.max(0, d.y ? y3(d.y) : d.y); })
      .outerRadius(function(d) { return Math.max(0, y3(d.y + d.dy)); });

$.getJSON("./SharesArticles.json", function(json) {
  //$.getJSON("file:///C:/Users/Charles/Desktop/Spring 2015/3705Project3/Sample1.json", function(json) {
  //console.log(partition.nodes(json.children); 
    var nodes3 = partition.nodes({children: json});
  //  console.log(nodes);  
  //  
    var path = vis3.selectAll("path").data(nodes3);
    path.enter().append("path")
        .attr("id", function(d, i) { 
          //console.log(d.depth);
          return "path-" + i; })
        .attr("d", arc3)
        .attr("fill-rule", "evenodd")
        .style("fill", function(d){
         //console.log(d.parent);
            if(d.depth > 1){
            //console.log(d);
              if(d.parent.name =="Assault"){
                if(d[0].share == "Facebook") {
                  return "#5e313c";
                } else {
                  return "#4b2730";
                }
              }
              else if(d.parent.name == "Robbery"){

                if(d[0].share == "Facebook") {
                  return "#484848";
                } else {
                  return "#393939";
                }
              }
              else if (d.parent.name == "Homicide") {

                if(d[0].share == "Facebook") {
                  return "#433b48";
                } else {
                  return "#352f39";
                }
             }
              return "#43423512";
          }
          else{
              if(d.name== "Assault"){
                  return "#905a68";
             }
             else if(d.name =="Robbery"){
              return "#7b9095";
             }
             else if (d.name == "Homicide") {
              return "#867791"
             }
          }
        });
});
$('#Sunburst2Chart').append('<p>News</p>').attr('style', 'color:white');;
$('#Sunburst3Chart').append('<p>Social Media</p>').attr('style', 'color:white');
$('#Sunburst1Chart').append('<p>Police Reports</p>').attr('style', 'color:white');
// $("#SunburtChart").click(function(){
// 	toggleSun1=false;
// 	if(toggleSun1){
// 		clickPolice();
// 		toggleSun1=!toggleSun1;
// 	}
// });
// $("#Sunburst2Chart").click(function(){
// 	toggleSun2=false;
// 	if(toggleSun2){
// 		clickNews();
// 		toggleSun2=!toggleSun2;
// 	}
// });
// $("#Sunburst3Chart").click(function(){
// 	console.log("getting clicked?");
// 	toggleSun3=false;
// 	if(toggleSun3){
// 		clickMedia();
// 		toggleSun3=!toggleSun3;
// 	}
// });
$('#cancelButton').hide();
$("#initialContent").show();
$("#SunburtChart").hide();
$("#Sunburst3Chart").hide();
$("#Sunburst1Chart").hide();
$('#tutorialPage').hide();
$('#individualContent').css({
	"visibility":"hidden"
});
$("#TitleDescriptions").css({
	'padding':'20px', 
	'background-color': 'white'
});
// $('#tutorialPageContent').attr('visibility', 'hidden');
$("#TitleDescriptions").hide();
$("#Sunburst2Chart").hide();

$("a").click(function(){
    $("#initialContent").fadeOut("slow", function() {
    // Animation complete.
  });
    $("#Sunburst2Chart").fadeIn("slow", function() {
    // Animation complete.
  });
  $("#Sunburst3Chart").fadeIn("slow", function() {
    // Animation complete.
  });
    $("#Sunburst1Chart").fadeIn("slow", function() {
    // Animation complete.
  });
	 $( "#SunburtChart" ).fadeIn( "slow", function() {
    // Animation complete
  });
	$("#TitleDescriptions").fadeIn("slow", function() {
    // Animation complete.
  })
	$('#tutorialPage').fadeIn("slow", function() {
    // Animation complete.
  })
	$('#cancelButton').show();
	// turningOffTimer = true;
	// clearInterval(interval1);
	// clearInterval(interval2);
	// clearInterval(interval3);
  })
// BeginningScene();
 // if(turningOffTimer==false){
// 	interval1 = setInterval(function(){ 
// 		floatingincidents(); 
// 		// console.log("10000");
// 	}, 10000);
// 	interval2 = setInterval(function(){ 
// 		floatingincidents();
// 		// console.log("5000"); 
// 	}, 20000);
// 	interval3 = setInterval(function(){ 
// 		floatingincidents();
// 		// console.log("2000");  
// 	}, 15000);
 // }
});

function BeginningScene(){
	var partitionData = d3.layout.partition()
    .sort(null)
    .value(function(d) { return 5.8 - d.depth; });

	$.getJSON("./AssaultRobberyDS.json", function(json) {
		  var node = partitionData.nodes({children: json});
		  var AssaultInfo = node[0].children[0];
		  var RobberyINfo = node[0].children[1];
		  // console.log(node);
		  // console.log(node[0]);  
		  // console.log(node[0].children);  //element no. 12, 15 16 
		  // console.log(node[0].children[0].children);
		  // console.log(node[0].children[0].children[0]);
		  // console.log(node[0].children[0].children.length);
		for(i = 0; i<node[0].children[0].children.length; i++){
		  	wordList1.push([node[0].children[0].children[i][12], node[0].children[0].children[i][15], node[0].children[0].children[i][16]]);
		}
		// console.log(wordList1);
		  // console.log(node[0].children[0].children[0][12]);
		  // console.log(node[0].children[1].children);
		  // console.log(node[0].children[0].children[1]) ;
		for(j = 0; j<node[0].children[1].children.length; j++){
		  	wordList2.push([node[0].children[1].children[j][12], node[0].children[1].children[j][15], node[0].children[1].children[j][16]]);
		}
		  // console.log(node[1]);


	});
}
function floatingincidents(){
	var MaxWidthSize;
	var MaxHeightSize;
	randXpos = getRandomInt(0, w);
	randYpos = getRandomInt(0, h);
	// console.log(randXpos);
	if(randXpos >=(w/2)){
		MaxWidthSize = ('-=' + w + 'px');
	}
	else{
		MaxWidthSize = ('+=' + w + 'px');
	} 
	if(randYpos >(h/2)){
		MaxHeightSize = ('-=' + h + 'px');
	}
	else{
		MaxHeightSize = ('+=' + h + 'px');
	} 
	// console.log("W is: " + MaxWidthSize);
	// console.log("H is: " + MaxHeightSize);
	$("#introContent").empty();
	$("#introContent2").empty();
	randNum = getRandomInt(0, wordList1.length);
	randNum2 = getRandomInt(0, 4);
	randNum3 = getRandomInt(0, wordList2.length);
	// console.log(randNum);
	// console.log(wordList1.length);
	// $("#introContent").css({left:randXpos,top:randYpos});
	$("#introContent").append("<p>"+ wordList1[randNum][0] + "</p><p>" + wordList1[randNum][1]+  "</p><p>" + wordList1[randNum][2]+ "</p>").css('color', 'white');
	if(randNum2==1){
		$( "#introContent" ).animate({
	    opacity: 0.0,
	    marginLeft: MaxWidthSize,
	    marginTop: MaxHeightSize,
	    borderWidth: "10px"
	  }, 30000, function() {
	    $('#introContent').attr('style','');
	  });
		// console.log("Choice 1");
	}
	else if(randNum2==2){
		console.log("Choice 2");
		$("#introContent2").append("<p>"+ wordList2[randNum][0] + "</p><p>" + wordList2[randNum][1]+  "</p><p>" + wordList2		[randNum][2]+ "</p>").css('color', 'white');
		$( "#introContent2" ).animate({
	    opacity: 0.0,
	    marginLeft: MaxWidthSize,
	    marginTop: MaxHeightSize,
	    borderWidth: "10px"
	  }, 30000, function() {
	    $('#introContent2').attr('style','');
	  });
	}
		else if(randNum2==3){
		// console.log("Choice 3");
	}
		else if(randNum2==4){
		// console.log("Choice 4");
	}
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function newsReplaceText(){
	var stringText = "<p>For the news dataset, we recorded the articles that reported local crimes of the chosen types. These were taken from two local Seattle news sources - Komo News and Kiro 7.</p><p>The collection of articles does not include all reporting sources and, thus, does not include all of the information that may reach and influence the public, such as zines, blogs, and TV. Additionally, we do not know the actual reach or importance each article had as they may have been treated differently with their headline size or placement on the site, allowing more or less people to find and to consume the article.</p>";
	$("#TitleDescriptions").fadeOut(100, function(){
	$("#TitleDescriptions").empty();
		$("#TitleDescriptions").fadeIn(100, function(){
			$("#TitleDescriptions").append('<h1></h1><h2></h2>');
			$("#TitleDescriptions h1").append("News");
			$("#TitleDescriptions h2").append("");
			$("#TitleDescriptions").append(stringText);
		});
	});
}
function popoReplaceText(){
	var stringText = "<p>The Seattle 911 incident report would serve as a case study that allows the public to see the realities of police work in everyday life. The data sets gives the time and place the incident happen on a given day. The data also categorizes data into seven types to differential the incidents in the region.</p><p>This data also does not include crimes that are not reported and those that are not caught. Using the police reports as an accurate representation of crime distribution also requires trust in the police and that there is minimal corruption and goodwill, which may not always be true, thus providing another bias.</p>";
	$("#TitleDescriptions").fadeOut(100, function(){
	$("#TitleDescriptions").empty();
		$("#TitleDescriptions").fadeIn(100, function(){
			$("#TitleDescriptions").append('<h1></h1><h2></h2>');
			$("#TitleDescriptions h1").append("Police Report");
			$("#TitleDescriptions h2").append("");
			$("#TitleDescriptions").append(stringText);
		});
	});
}
function socialReplaceText(){
	var stringText ="<p>This segment displays the number of Facebook and Twitter shares noted on the article page. This data represents how the public consumes and spreads crime information, demonstrating what the general audience finds compelling. This visualization depicts the average number of shares an article of each particular type gets on Facebook and Twitter, showing the average reach of each article.</p><p> A source of bias is the self-selected demographics of those who use Twitter and Facebook. Also, the user does not have to be in Seattle in order to share the article about Seattle news, meaning this may not be only the Seattle public. We also do not know how the user felt about the article, only that they shared it.</p><h2><b>Average Shares Per Article:</b></h2><h2>Assault</h2><p>Facebook: 345.57	Twitter: 29</p><h2>Homicide</h2><p>Facebook: 108	Twitter: 40.67</p><h2>Robbery</h2><p>Facebook: 40.64	Twitter: 5.73<p>";
	$("#TitleDescriptions").fadeOut(100, function(){
	$("#TitleDescriptions").empty();
		$("#TitleDescriptions").fadeIn(100, function(){
			$("#TitleDescriptions").append('<h1></h1><h2></h2>');
			$("#TitleDescriptions h1").append("Social Media");
			$("#TitleDescriptions h2").append("");
			$("#TitleDescriptions").append(stringText);
		});
	});
}

greensHitChart = function(roundid) {
    
    $.getJSON( "ajax/stats/getgreenshit.php?id="+roundid, function( json ) {
        
        $("#greenshittable").find('tbody').append($('<tr><td>Hit</td><td>'+json.hit+'</td></tr><tr><td>Miss Left</td><td>'+json.left+'</td></tr><tr><td>Miss Right</td><td>'+json.right+'</td></tr><tr><td>Miss Long</td><td>'+json.long+'</td></tr><tr><td>Miss Short</td><td>'+json.short+'</td></tr><tr><td>N/A</td><td>'+json.na+'</td></tr>'));


    
   // Colour variables
	var red = "#bf616a",
		blue = "#5B90BF",
		orange = "#d08770",
		yellow = "#ebcb8b",
		green = "#a3be8c",
		teal = "#96b5b4",
		pale_blue = "#8fa1b3",
		purple = "#b48ead",
		brown = "#ab7967";


		var baseDataset = {
			fill: 'rgba(222,225,232,0.4)',
			stroke: 'rgba(222,225,232,1)',
			highlight: 'rgba(222,225,232,0.8)',
			highlightStroke: 'rgba(222,225,232,1)'
		},
		overlayDataset = {
			fill: 'rgba(91,144,191,0.4)',
			stroke: 'rgba(91,144,191,1)',
			highlight: 'rgba(91,144,191,0.8)',
			highlightStroke: 'rgba(91,144,191,1)'
		};

	var data = [],
		barsCount = 50,
		labels = new Array(barsCount),
		updateDelayMax = 500,
		$id = function(id){
			return document.getElementById(id);
		},
		random = function(max){ return Math.round(Math.random()*100)},
		helpers = Chart.helpers;


	Chart.defaults.global.responsive = true;


	

myfirstdohnut = function() {


		var canvas = $id('greenshit'),
			colours = {
				"Core": blue,
				"Line": orange,
				"Bar": teal,
				"Polar Area": purple,
				"Radar": brown,
				"Doughnut": green
			};

		var moduleData = [
		
			{
				value: json.hit,
				color: colours["Core"],
				highlight: Colour(colours["Core"], 10),
				label: "Greens Hit"
			},
		
			{
				value: json.left,
				color: colours["Bar"],
				highlight: Colour(colours["Bar"], 10),
				label: "Greens Left"
			},
		
			{
				value: json.right,
				color: colours["Doughnut"],
				highlight: Colour(colours["Doughnut"], 10),
				label: "Greens Right"
			},
		
			{
				value: json.long,
				color: colours["Line"],
				highlight: Colour(colours["Line"], 10),
				label: "Greens Long"
			},
		
			{
				value: json.short,
				color: colours["Radar"],
				highlight: Colour(colours["Radar"], 10),
				label: "Greens Short"
			},
		
			{
				value: json.na,
				color: colours["Polar Area"],
				highlight: Colour(colours["Polar Area"], 10),
				label: "NA"
			}		
		];
		// 
		var moduleDoughnut = new Chart(canvas.getContext('2d')).Doughnut(moduleData, { tooltipTemplate : "<%if (label){%><%=label%>: <%}%><%= value %>", animation: false });
		// 
		var legendHolder = document.createElement('div');
		legendHolder.innerHTML = moduleDoughnut.generateLegend();
		// Include a html legend template after the module doughnut itself
		helpers.each(legendHolder.firstChild.childNodes, function(legendNode, index){
			helpers.addEvent(legendNode, 'mouseover', function(){
				var activeSegment = moduleDoughnut.segments[index];
				activeSegment.save();
				activeSegment.fillColor = activeSegment.highlightColor;
				moduleDoughnut.showTooltip([activeSegment]);
				activeSegment.restore();
			});
		});
		helpers.addEvent(legendHolder.firstChild, 'mouseout', function(){
			moduleDoughnut.draw();
		});
		canvas.parentNode.parentNode.appendChild(legendHolder.firstChild);

	};
    
    myfirstdohnut();

	
	
        });
};


function Colour(col, amt) 
{
    var usePound = false;

    if (col[0] == "#") {
        col = col.slice(1);
        usePound = true;
    }

    var num = parseInt(col,16);

    var r = (num >> 16) + amt;

    if (r > 255) r = 255;
    else if  (r < 0) r = 0;

    var b = ((num >> 8) & 0x00FF) + amt;

    if (b > 255) b = 255;
    else if  (b < 0) b = 0;

    var g = (num & 0x0000FF) + amt;

    if (g > 255) g = 255;
    else if (g < 0) g = 0;

    return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
}
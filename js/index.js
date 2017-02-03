var usData;
var year = [];
var amount = [];

function runData() {  
  var svg = d3.select('.chart').append('svg')
              .attr('height', '400')
              .attr('width', '850')
  
  svg.selectAll('rect')
      .data(amount)
      .enter().append('svg:rect')
        .attr('height', function(d){ return d / 50; }) 
        .attr('width','2')
        .attr('x', function(d,i){ return (i*3);})
        .attr('y', function(d){ return (390 - (d/50)); })
        .attr('fill','green')
        .attr('class', 'svg-rect')
        .append('svg:title').text(function(d,i){ return '$' + d + ' Billion - ' + year[i].slice(0,4); })
}

var request = new XMLHttpRequest();
request.onreadystatechange = getData;

request.open('GET', 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json', true);
request.send(null);

function getData(data) {
  if(request.readyState === XMLHttpRequest.DONE){
    usData = JSON.parse(data.target.response);
    for(var i = 0; i < usData.data.length; i++) {
      amount.push(usData.data[i][1]);
      year.push(usData.data[i][0]);
    }
  runData(); //code for creating bar chart
  } 
}
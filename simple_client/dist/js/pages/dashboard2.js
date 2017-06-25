$(function () {


  'use strict';

  /* ChartJS
   * -------
   * Here we will create a few charts using ChartJS
   */

  //-----------------------
  //- MONTHLY SALES CHART -
  //-----------------------

  var json_data = $.ajax({
           url: 'http://localhost:5000/topic_stats',
           type: 'GET',
           data: data,
           async: false,

           success: function(result){
              console.log(result)
           }
        });


  // Get context with jQuery - using jQuery's .get() method.
  var salesChartCanvas = $("#salesChart").get(0).getContext("2d");
  // This will get the first returned node in the jQuery collection.
  var salesChart = new Chart(salesChartCanvas);

  var salesChartData = {
    labels: ["1", "2", "3", "4", "5", "6", "7"],
    datasets: [
      {
        label: "Electronics",
        fillColor: "rgb(210, 214, 222)",
        strokeColor: "rgb(210, 214, 222)",
        pointColor: "rgb(210, 214, 222)",
        pointStrokeColor: "#c1c7d1",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgb(220,220,220)",
        data: [65, 59, 80, 81, 56, 55, 40]
      },
      {
        label: "Digital Goods",
        fillColor: "rgba(60,141,188,0.9)",
        strokeColor: "rgba(60,141,188,0.8)",
        pointColor: "#3b8bba",
        pointStrokeColor: "rgba(60,141,188,1)",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(60,141,188,1)",
        data: [28, 48, 40, 19, 86, 27, 90]
      }
    ]
  };

  var salesChartOptions = {
    //Boolean - If we should show the scale at all
    showScale: true,
    //Boolean - Whether grid lines are shown across the chart
    scaleShowGridLines: false,
    //String - Colour of the grid lines
    scaleGridLineColor: "rgba(0,0,0,.05)",
    //Number - Width of the grid lines
    scaleGridLineWidth: 1,
    //Boolean - Whether to show horizontal lines (except X axis)
    scaleShowHorizontalLines: true,
    //Boolean - Whether to show vertical lines (except Y axis)
    scaleShowVerticalLines: true,
    //Boolean - Whether the line is curved between points
    bezierCurve: true,
    //Number - Tension of the bezier curve between points
    bezierCurveTension: 0.3,
    //Boolean - Whether to show a dot for each point
    pointDot: false,
    //Number - Radius of each point dot in pixels
    pointDotRadius: 4,
    //Number - Pixel width of point dot stroke
    pointDotStrokeWidth: 1,
    //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
    pointHitDetectionRadius: 20,
    //Boolean - Whether to show a stroke for datasets
    datasetStroke: true,
    //Number - Pixel width of dataset stroke
    datasetStrokeWidth: 2,
    //Boolean - Whether to fill the dataset with a color
    datasetFill: true,
    //String - A legend template
    legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].lineColor%>\"></span><%=datasets[i].label%></li><%}%></ul>",
    //Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
    maintainAspectRatio: true,
    //Boolean - whether to make the chart responsive to window resizing
    responsive: true
  };

  //Create the line chart
  salesChart.Line(salesChartData, salesChartOptions);

  //---------------------------
  //- END MONTHLY SALES CHART -
  //---------------------------

  //-------------
  //- PIE CHART -
  //-------------
  // Get context with jQuery - using jQuery's .get() method.
  var pieChartCanvas = $("#pieChart").get(0).getContext("2d");
  var pieChart = new Chart(pieChartCanvas);
  var PieData = [
    {
      value: 700,
      color: "#f56954",
      highlight: "#f56954",
      label: "Chrome"
    },
    {
      value: 500,
      color: "#00a65a",
      highlight: "#00a65a",
      label: "IE"
    },
    {
      value: 400,
      color: "#f39c12",
      highlight: "#f39c12",
      label: "FireFox"
    },
    {
      value: 600,
      color: "#00c0ef",
      highlight: "#00c0ef",
      label: "Safari"
    },
    {
      value: 300,
      color: "#3c8dbc",
      highlight: "#3c8dbc",
      label: "Opera"
    },
    {
      value: 100,
      color: "#d2d6de",
      highlight: "#d2d6de",
      label: "Navigator"
    }
  ];
  var pieOptions = {
    //Boolean - Whether we should show a stroke on each segment
    segmentShowStroke: true,
    //String - The colour of each segment stroke
    segmentStrokeColor: "#fff",
    //Number - The width of each segment stroke
    segmentStrokeWidth: 1,
    //Number - The percentage of the chart that we cut out of the middle
    percentageInnerCutout: 50, // This is 0 for Pie charts
    //Number - Amount of animation steps
    animationSteps: 100,
    //String - Animation easing effect
    animationEasing: "easeOutBounce",
    //Boolean - Whether we animate the rotation of the Doughnut
    animateRotate: true,
    //Boolean - Whether we animate scaling the Doughnut from the centre
    animateScale: false,
    //Boolean - whether to make the chart responsive to window resizing
    responsive: true,
    // Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
    maintainAspectRatio: false,
    //String - A legend template
    legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>",
    //String - A tooltip template
    tooltipTemplate: "<%=value %> <%=label%> users"
  };
  //Create pie or douhnut chart
  // You can switch between pie and douhnut using the method below.
  pieChart.Doughnut(PieData, pieOptions);
  //-----------------
  //- END PIE CHART -
  //-----------------

  /* jVector Maps
   * ------------
   * Create a world map with markers
   */
  $('#world-map-markers').vectorMap({
    map: 'world_mill_en',
    normalizeFunction: 'polynomial',
    hoverOpacity: 0.7,
    hoverColor: false,
    backgroundColor: 'transparent',
    regionStyle: {
      initial: {
        fill: 'rgba(210, 214, 222, 1)',
        "fill-opacity": 1,
        stroke: 'none',
        "stroke-width": 0,
        "stroke-opacity": 1
      },
      hover: {
        "fill-opacity": 0.7,
        cursor: 'pointer'
      },
      selected: {
        fill: 'yellow'
      },
      selectedHover: {}
    },
    markerStyle: {
      initial: {
        fill: '#00a65a',
        stroke: '#111'
      }
    },
    markers: [
      {latLng: [41.90, 12.45], name: 'Vatican City'},
      {latLng: [43.73, 7.41], name: 'Monaco'},
      {latLng: [-0.52, 166.93], name: 'Nauru'},
      {latLng: [-8.51, 179.21], name: 'Tuvalu'},
      {latLng: [43.93, 12.46], name: 'San Marino'},
      {latLng: [47.14, 9.52], name: 'Liechtenstein'},
      {latLng: [7.11, 171.06], name: 'Marshall Islands'},
      {latLng: [17.3, -62.73], name: 'Saint Kitts and Nevis'},
      {latLng: [3.2, 73.22], name: 'Maldives'},
      {latLng: [35.88, 14.5], name: 'Malta'},
      {latLng: [12.05, -61.75], name: 'Grenada'},
      {latLng: [13.16, -61.23], name: 'Saint Vincent and the Grenadines'},
      {latLng: [13.16, -59.55], name: 'Barbados'},
      {latLng: [17.11, -61.85], name: 'Antigua and Barbuda'},
      {latLng: [-4.61, 55.45], name: 'Seychelles'},
      {latLng: [7.35, 134.46], name: 'Palau'},
      {latLng: [42.5, 1.51], name: 'Andorra'},
      {latLng: [14.01, -60.98], name: 'Saint Lucia'},
      {latLng: [6.91, 158.18], name: 'Federated States of Micronesia'},
      {latLng: [1.3, 103.8], name: 'Singapore'},
      {latLng: [1.46, 173.03], name: 'Kiribati'},
      {latLng: [-21.13, -175.2], name: 'Tonga'},
      {latLng: [15.3, -61.38], name: 'Dominica'},
      {latLng: [-20.2, 57.5], name: 'Mauritius'},
      {latLng: [26.02, 50.55], name: 'Bahrain'},
      {latLng: [0.33, 6.73], name: 'São Tomé and Príncipe'}
    ]
  });

  /* SPARKLINE CHARTS
   * ----------------
   * Create a inline charts with spark line
   */
   $('.emotion1').each(function() {
     var $this = $(this);

   })
  //-----------------
  //- SPARKLINE BAR -
  //-----------------
  $('.sparkbar').each(function () {
    var $this = $(this);
    $this.sparkline('html', {
      type: 'bar',
      height: $this.data('height') ? $this.data('height') : '30',
      barColor: $this.data('color')
    });
  });

  //-----------------
  //- SPARKLINE PIE -
  //-----------------
  $('.sparkpie').each(function () {
    var $this = $(this);
    $this.sparkline('html', {
      type: 'pie',
      height: $this.data('height') ? $this.data('height') : '90',
      sliceColors: $this.data('color')
    });
  });

  //------------------
  //- SPARKLINE LINE -
  //------------------
  $('.sparkline').each(function () {
    var $this = $(this);
    $this.sparkline('html', {
      type: 'line',
      height: $this.data('height') ? $this.data('height') : '90',
      width: '100%',
      lineColor: $this.data('linecolor'),
      fillColor: $this.data('fillcolor'),
      spotColor: $this.data('spotcolor')
    });
  });


  var data = [
  {
    "confidence": 0.8694921,
    "key_phrases": "[u'convention center', u'teams', u'new project', u'online meeting', u'piece of land']",
    "sentiment_score": 0.5,
    "start_second": 0,
    "text": "here is an example of an online meeting with 2 teams want to discuss the new project to build a convention center on a piece of land",
    "topic_distance": 0.4119,
    "topic_id": "e14c22a6-91d3-42b2-8af8-a38f66d65a68",
    "topic_phrase": "piece of land",
    "topic_score": 2.0
  },
  {
    "confidence": 0.8332436,
    "key_phrases": "[u'convention center', u'piece of land', u'municipality', u'discount senior project']",
    "sentiment_score": 0.8030161565809999,
    "start_second": 5000,
    "text": "discount senior project to build a convention center on a piece of land owned by municipality the members of the number one",
    "topic_distance": 0.4119,
    "topic_id": "e14c22a6-91d3-42b2-8af8-a38f66d65a68",
    "topic_phrase": "piece of land",
    "topic_score": 2.0
  },
  {
    "confidence": 0.8601306999999999,
    "key_phrases": "[u'real estate developer', u'number', u'alexander']",
    "sentiment_score": 0.873992266855,
    "start_second": 10000,
    "text": "owned by municipality the members of the number 1 the real estate developer or alexander in brazil",
    "topic_distance": 0.643,
    "topic_id": "c0ef8050-65a5-4f84-b14d-33438440359c",
    "topic_phrase": "real estate developer",
    "topic_score": 3.0
  },
  {
    "confidence": 0.8585096999999999,
    "key_phrases": "[u'brazil', u'alexander', u'APC tom', u'india']",
    "sentiment_score": 0.9785821179950001,
    "start_second": 15000,
    "text": "the real estate developer or alexander in brazil connected with APC tom in india connected with a mac",
    "topic_distance": 0.6355,
    "topic_id": "16828fdd-102d-4457-8eac-80deeb55e357",
    "topic_phrase": "mac",
    "topic_score": 3.0
  },
  {
    "confidence": 0.803286,
    "key_phrases": "[u'mac', u'united states', u'india', u'matt']",
    "sentiment_score": 0.9983975278180001,
    "start_second": 20000,
    "text": "connected with APC tom in india connected with a mac and matt in the united states connected with a mac the men",
    "topic_distance": 0.5036,
    "topic_id": "16828fdd-102d-4457-8eac-80deeb55e357",
    "topic_phrase": "mac",
    "topic_score": 3.0
  },
  {
    "confidence": 0.8605074,
    "key_phrases": "[u'members of team members', u'mac', u'united states', u'municipality']",
    "sentiment_score": 0.9896799650589999,
    "start_second": 25000,
    "text": "and matt in the united states connected with a mac the members of team members to the municipality on christina",
    "topic_distance": 0.5629,
    "topic_id": "9ee28069-63e0-4d0d-a882-1d494c160304",
    "topic_phrase": "municipality on christina",
    "topic_score": 2.0
  },
  {
    "confidence": 0.7801165,
    "key_phrases": "[u'municipality of christina', u'PC', u'united states', u'number']",
    "sentiment_score": 0.9606383945,
    "start_second": 30000,
    "text": "verse of the number to the municipality of christina in united states with the PC he ran in india with",
    "topic_distance": 0.6181,
    "topic_id": "9ee28069-63e0-4d0d-a882-1d494c160304",
    "topic_phrase": "municipality on christina",
    "topic_score": 2.0
  },
  {
    "confidence": 0.7952158,
    "key_phrases": "[u'united states', u'PC rancho', u'BC', u'vicki']",
    "sentiment_score": 0.9478724078899999,
    "start_second": 35000,
    "text": "united states with the PC he ran in india with the PC rancho in the united states with it BC and vicki",
    "topic_distance": 0.3662,
    "topic_id": "b27df96d-2688-4ca9-828c-14ccb44262a6",
    "topic_phrase": "ran in india",
    "topic_score": 1.0
  },
  {
    "confidence": 0.8588976,
    "key_phrases": "[u'vicki', u'united states', u'BC', u'iphone']",
    "sentiment_score": 0.9058940616050001,
    "start_second": 40000,
    "text": "rancho in the united states with it BC and vicki in france with an iphone and I have the host",
    "topic_distance": 0.3662,
    "topic_id": "d78b657b-f777-47f6-a269-9913144b6afd",
    "topic_phrase": "vicki in france",
    "topic_score": 1.0
  },
  {
    "confidence": 0.9102488000000001,
    "key_phrases": "[u'meeting', u'united states', u'iphone', u'host', u'france', u'mac']",
    "sentiment_score": 0.9744403527519999,
    "start_second": 45000,
    "text": "in france with an iphone and I have the host of that meeting I'm in the united states and I'm connected with mac first I'm going to",
    "topic_distance": 0.7377,
    "topic_id": "16828fdd-102d-4457-8eac-80deeb55e357",
    "topic_phrase": "mac",
    "topic_score": 3.0
  },
  {
    "confidence": 0.8313635,
    "key_phrases": "[u'problem meeting', u'team leader', u'united states', u'mac']",
    "sentiment_score": 0.921882501444,
    "start_second": 50000,
    "text": "meeting I'm in the united states and I'm connected with mac first I'm going to have a problem meeting with the team leader",
    "topic_distance": 0.5037,
    "topic_id": "4299f307-9322-40ff-a939-717cd3b45407",
    "topic_phrase": "connected with mac",
    "topic_score": 2.0
  },
  {
    "confidence": 0.8408667999999999,
    "key_phrases": "[u'team leader']",
    "sentiment_score": 0.5,
    "start_second": 55000,
    "text": "probably meeting with the team leader",
    "topic_distance": NaN,
    "topic_id": NaN,
    "topic_phrase": NaN,
    "topic_score": NaN
  },
  {
    "confidence": 0.8736008,
    "key_phrases": "[u'team', u'online meeting', u'municipality']",
    "sentiment_score": 0.9897913623100001,
    "start_second": 60000,
    "text": "thank you for participating in our online meeting at the team of the municipality",
    "topic_distance": 0.5963,
    "topic_id": "d87a1d75-b3b7-44a4-82e0-8cf6aaefc35b",
    "topic_phrase": "municipality",
    "topic_score": 5.0
  },
  {
    "confidence": 0.8001666000000001,
    "key_phrases": "[u'municipality', u'piece of land', u'band', u'team']",
    "sentiment_score": 0.5,
    "start_second": 65000,
    "text": "you sent to the team of the municipality right so you on the piece of land where there is in a band",
    "topic_distance": 0.5710000000000001,
    "topic_id": "d87a1d75-b3b7-44a4-82e0-8cf6aaefc35b",
    "topic_phrase": "municipality",
    "topic_score": 5.0
  },
  {
    "confidence": 0.8304278,
    "key_phrases": "[u'abandoned airport', u'OK', u'pizza land']",
    "sentiment_score": 0.0999097335382,
    "start_second": 70000,
    "text": "wait so you on the pizza land at where there is an abandoned airport now second OK now",
    "topic_distance": NaN,
    "topic_id": NaN,
    "topic_phrase": NaN,
    "topic_score": NaN
  },
  {
    "confidence": 0.7980196999999999,
    "key_phrases": "[u'airport', u'secrett']",
    "sentiment_score": 0.921912577349,
    "start_second": 75000,
    "text": "airport now secrett OK now I just wanted to double check with you that you and your",
    "topic_distance": NaN,
    "topic_id": NaN,
    "topic_phrase": NaN,
    "topic_score": NaN
  },
  {
    "confidence": 0.888496,
    "key_phrases": "[u'project', u'team']",
    "sentiment_score": 0.936190237011,
    "start_second": 80000,
    "text": "oh I want just wanted to double check with you that you and your team are ready to discuss this project today",
    "topic_distance": NaN,
    "topic_id": NaN,
    "topic_phrase": NaN,
    "topic_score": NaN
  },
  {
    "confidence": 0.8820626,
    "key_phrases": "[u'alexander', u'project', u'OK']",
    "sentiment_score": 0.997116688522,
    "start_second": 85000,
    "text": "not ready to discuss this project today your ready OK so let me bring alexander in OK",
    "topic_distance": 0.4565,
    "topic_id": "56adaf06-f069-4b45-8e3b-c524bf98ac00",
    "topic_phrase": "bring alexander",
    "topic_score": 1.0
  },
  {
    "confidence": 0.8792177,
    "key_phrases": "[u'OK', u'alexander']",
    "sentiment_score": 0.9882624797669999,
    "start_second": 90000,
    "text": "OK so let me bring and alexander in OK",
    "topic_distance": NaN,
    "topic_id": NaN,
    "topic_phrase": NaN,
    "topic_score": NaN
  },
  {
    "confidence": 0.6814226,
    "key_phrases": "[u'sender']",
    "sentiment_score": 0.5,
    "start_second": 95000,
    "text": "how do you like sender",
    "topic_distance": NaN,
    "topic_id": NaN,
    "topic_phrase": NaN,
    "topic_score": NaN
  },
  {
    "confidence": 0.6814226,
    "key_phrases": "[u'sender']",
    "sentiment_score": 0.5,
    "start_second": 100000,
    "text": "how do you like sender",
    "topic_distance": NaN,
    "topic_id": NaN,
    "topic_phrase": NaN,
    "topic_score": NaN
  },
  {
    "confidence": 0.7991433000000001,
    "key_phrases": "[u'release date', u'team leader']",
    "sentiment_score": 0.5,
    "start_second": 105000,
    "text": "why you are the team leader of the release date",
    "topic_distance": 0.5037,
    "topic_id": "f459361d-92ea-46ab-885b-43ab90860c1e",
    "topic_phrase": "release date",
    "topic_score": 1.0
  },
  {
    "confidence": 0.9479974,
    "key_phrases": "[u'release date']",
    "sentiment_score": 0.5,
    "start_second": 110000,
    "text": "release date",
    "topic_distance": NaN,
    "topic_id": NaN,
    "topic_phrase": NaN,
    "topic_score": NaN
  },
  {
    "confidence": 0.3509248,
    "key_phrases": "[u'stena']",
    "sentiment_score": 0.5,
    "start_second": 115000,
    "text": "stena",
    "topic_distance": NaN,
    "topic_id": NaN,
    "topic_phrase": NaN,
    "topic_score": NaN
  },
  {
    "confidence": 0.7903788,
    "key_phrases": "[u'christina', u'II', u'team']",
    "sentiment_score": 0.9891735045799999,
    "start_second": 120000,
    "text": "hi christina how are you OK II wanted to check with you your team is ready",
    "topic_distance": NaN,
    "topic_id": NaN,
    "topic_phrase": NaN,
    "topic_score": NaN
  },
  {
    "confidence": 0.8087701999999999,
    "key_phrases": "[u'team']",
    "sentiment_score": 0.955610189402,
    "start_second": 125000,
    "text": "I wanted to check with you your team is ready",
    "topic_distance": NaN,
    "topic_id": NaN,
    "topic_phrase": NaN,
    "topic_score": NaN
  },
  {
    "confidence": 0.0,
    "key_phrases": "[u'NaN']",
    "sentiment_score": 0.5,
    "start_second": 130000,
    "text": NaN,
    "topic_distance": NaN,
    "topic_id": NaN,
    "topic_phrase": NaN,
    "topic_score": NaN
  },
  {
    "confidence": 0.9185224,
    "key_phrases": "[u'OK']",
    "sentiment_score": 0.993349256734,
    "start_second": 135000,
    "text": "your ready OK so what I'm going to do I'm going to bring everybody back OK",
    "topic_distance": NaN,
    "topic_id": NaN,
    "topic_phrase": NaN,
    "topic_score": NaN
  },
  {
    "confidence": 0.8652165,
    "key_phrases": "[u'OK']",
    "sentiment_score": 0.8827635593459999,
    "start_second": 140000,
    "text": "remind me back OK",
    "topic_distance": NaN,
    "topic_id": NaN,
    "topic_phrase": NaN,
    "topic_score": NaN
  },
  {
    "confidence": 0.9408494000000001,
    "key_phrases": "[u'']",
    "sentiment_score": 0.5,
    "start_second": 145000,
    "text": "will take it from there",
    "topic_distance": NaN,
    "topic_id": NaN,
    "topic_phrase": NaN,
    "topic_score": NaN
  },
  {
    "confidence": 0.9293665000000001,
    "key_phrases": "[u'open OK']",
    "sentiment_score": 0.9995423099690001,
    "start_second": 150000,
    "text": "open OK thank you alright so let me bring everybody back",
    "topic_distance": NaN,
    "topic_id": NaN,
    "topic_phrase": NaN,
    "topic_score": NaN
  },
  {
    "confidence": 0.9148040999999999,
    "key_phrases": "[u'']",
    "sentiment_score": 0.5,
    "start_second": 155000,
    "text": "let me bring everybody back",
    "topic_distance": NaN,
    "topic_id": NaN,
    "topic_phrase": NaN,
    "topic_score": NaN
  },
  {
    "confidence": 0.8724329,
    "key_phrases": "[u'OK']",
    "sentiment_score": 0.994882931332,
    "start_second": 160000,
    "text": "OK so welcome everybody and eat you know that each of you belong to different",
    "topic_distance": NaN,
    "topic_id": NaN,
    "topic_phrase": NaN,
    "topic_score": NaN
  },
  {
    "confidence": 0.7597478,
    "key_phrases": "[u'christina iran rancho', u'different team', u'key']",
    "sentiment_score": 0.5,
    "start_second": 165000,
    "text": "and you know that you belong to a different team so christina iran rancho in the key",
    "topic_distance": 0.619,
    "topic_id": "d53fda47-30cb-4ca5-aa0f-219f8357ed47",
    "topic_phrase": "christina iran rancho",
    "topic_score": 2.0
  },
  {
    "confidence": 0.7364162,
    "key_phrases": "[u'parts', u'vicki', u'christina iran rancho']",
    "sentiment_score": 0.5,
    "start_second": 170000,
    "text": "team so christina iran rancho and vicki are parts of the theme of the municipality",
    "topic_distance": 0.6124,
    "topic_id": "d53fda47-30cb-4ca5-aa0f-219f8357ed47",
    "topic_phrase": "christina iran rancho",
    "topic_score": 2.0
  },
  {
    "confidence": 0.6398454,
    "key_phrases": "[u'team municipality']",
    "sentiment_score": 0.304391912909,
    "start_second": 175000,
    "text": "part of this team municipality",
    "topic_distance": NaN,
    "topic_id": NaN,
    "topic_phrase": NaN,
    "topic_score": NaN
  },
  {
    "confidence": 0.7943818,
    "key_phrases": "[u'team', u'real estate developer', u'max', u'alexander']",
    "sentiment_score": 0.5,
    "start_second": 180000,
    "text": "in alexander and max are part of the team over real estate developer who would like to build a",
    "topic_distance": 0.3445,
    "topic_id": "c0ef8050-65a5-4f84-b14d-33438440359c",
    "topic_phrase": "real estate developer",
    "topic_score": 3.0
  },
  {
    "confidence": 0.8855618000000001,
    "key_phrases": "[u'open real estate developer', u'piece of land OK']",
    "sentiment_score": 0.9046213353579999,
    "start_second": 185000,
    "text": "open real estate developer who would like to build a something on on that piece of land OK now just",
    "topic_distance": 0.6821,
    "topic_id": "c0ef8050-65a5-4f84-b14d-33438440359c",
    "topic_phrase": "real estate developer",
    "topic_score": 3.0
  },
  {
    "confidence": 0.8606815000000001,
    "key_phrases": "[u'dancing', u'demand OK', u'page']",
    "sentiment_score": 0.9254692042730001,
    "start_second": 190000,
    "text": "dancing on on demand OK now just make sure that we're on the same page I'm going to share with you",
    "topic_distance": NaN,
    "topic_id": NaN,
    "topic_phrase": NaN,
    "topic_score": NaN
  },
  {
    "confidence": 0.8598312,
    "key_phrases": "[u'abandoned air', u'page']",
    "sentiment_score": 0.141876690629,
    "start_second": 195000,
    "text": "the same page I'm going to share with you and video showing in abandoned air",
    "topic_distance": NaN,
    "topic_id": NaN,
    "topic_phrase": NaN,
    "topic_score": NaN
  },
  {
    "confidence": 0.81968,
    "key_phrases": "[u'abandoned airports']",
    "sentiment_score": 0.159995324348,
    "start_second": 200000,
    "text": "video showing in abandoned airports OK so give me",
    "topic_distance": NaN,
    "topic_id": NaN,
    "topic_phrase": NaN,
    "topic_score": NaN
  },
  {
    "confidence": 0.9393992,
    "key_phrases": "[u'']",
    "sentiment_score": 0.934223909938,
    "start_second": 205000,
    "text": "OK so give me a second",
    "topic_distance": NaN,
    "topic_id": NaN,
    "topic_phrase": NaN,
    "topic_score": NaN
  },
  {
    "confidence": 0.921465,
    "key_phrases": "[u'']",
    "sentiment_score": 0.5,
    "start_second": 210000,
    "text": "second",
    "topic_distance": NaN,
    "topic_id": NaN,
    "topic_phrase": NaN,
    "topic_score": NaN
  },
  {
    "confidence": 0.0,
    "key_phrases": "[u'NaN']",
    "sentiment_score": 0.5,
    "start_second": 215000,
    "text": NaN,
    "topic_distance": NaN,
    "topic_id": NaN,
    "topic_phrase": NaN,
    "topic_score": NaN
  },
  {
    "confidence": 0.9034384,
    "key_phrases": "[u'airport', u'world']",
    "sentiment_score": 0.5,
    "start_second": 220000,
    "text": "so this is the airport talking about it is somewhere in the world",
    "topic_distance": NaN,
    "topic_id": NaN,
    "topic_phrase": NaN,
    "topic_score": NaN
  },
  {
    "confidence": 0.0,
    "key_phrases": "[u'NaN']",
    "sentiment_score": 0.5,
    "start_second": 225000,
    "text": NaN,
    "topic_distance": NaN,
    "topic_id": NaN,
    "topic_phrase": NaN,
    "topic_score": NaN
  },
  {
    "confidence": 0.9053225,
    "key_phrases": "[u'land', u'great shape', u'municipality']",
    "sentiment_score": 0.8324942096119999,
    "start_second": 230000,
    "text": "and as you can see it's not that great shape and this is a land is owned by the municipality that",
    "topic_distance": NaN,
    "topic_id": NaN,
    "topic_phrase": NaN,
    "topic_score": NaN
  },
  {
    "confidence": 0.8657151,
    "key_phrases": "[u'christina', u'municipality', u'team OK']",
    "sentiment_score": 0.880832593721,
    "start_second": 235000,
    "text": "land is owned by the municipality that today is represented by christina's team OK",
    "topic_distance": 0.522,
    "topic_id": "d87a1d75-b3b7-44a4-82e0-8cf6aaefc35b",
    "topic_phrase": "municipality",
    "topic_score": 5.0
  },
  {
    "confidence": 0.8474653,
    "key_phrases": "[u'christina', u'team OK']",
    "sentiment_score": 0.8899896137090001,
    "start_second": 240000,
    "text": "today is represented by christina's team OK",
    "topic_distance": NaN,
    "topic_id": NaN,
    "topic_phrase": NaN,
    "topic_score": NaN
  },
  {
    "confidence": 0.9374815000000001,
    "key_phrases": "[u'lot of work', u'OK']",
    "sentiment_score": 0.883113186384,
    "start_second": 245000,
    "text": "you can see there is a lot of work to be done so let's stop this OK",
    "topic_distance": NaN,
    "topic_id": NaN,
    "topic_phrase": NaN,
    "topic_score": NaN
  },
  {
    "confidence": 0.9493398999999999,
    "key_phrases": "[u'OK']",
    "sentiment_score": 0.937739281849,
    "start_second": 250000,
    "text": "so let's stop this OK and let me show you something else",
    "topic_distance": NaN,
    "topic_id": NaN,
    "topic_phrase": NaN,
    "topic_score": NaN
  },
  {
    "confidence": 0.9352655000000001,
    "key_phrases": "[u'']",
    "sentiment_score": 0.5,
    "start_second": 255000,
    "text": "and let me show you something else",
    "topic_distance": NaN,
    "topic_id": NaN,
    "topic_phrase": NaN,
    "topic_score": NaN
  },
  {
    "confidence": 0.9181575999999999,
    "key_phrases": "[u'']",
    "sentiment_score": 0.5,
    "start_second": 260000,
    "text": "let me show you that",
    "topic_distance": NaN,
    "topic_id": NaN,
    "topic_phrase": NaN,
    "topic_score": NaN
  },
  {
    "confidence": 0.9015011,
    "key_phrases": "[u'']",
    "sentiment_score": 0.5,
    "start_second": 265000,
    "text": "show you then",
    "topic_distance": NaN,
    "topic_id": NaN,
    "topic_phrase": NaN,
    "topic_score": NaN
  },
  {
    "confidence": 0.9314336,
    "key_phrases": "[u'convention center']",
    "sentiment_score": 0.5,
    "start_second": 270000,
    "text": "the first sign of the convention center",
    "topic_distance": NaN,
    "topic_id": NaN,
    "topic_phrase": NaN,
    "topic_score": NaN
  },
  {
    "confidence": 0.756205,
    "key_phrases": "[u'convention center']",
    "sentiment_score": 0.5,
    "start_second": 275000,
    "text": "find all the convention center",
    "topic_distance": NaN,
    "topic_id": NaN,
    "topic_phrase": NaN,
    "topic_score": NaN
  },
  {
    "confidence": 0.8740751,
    "key_phrases": "[u'alexander team', u'image', u'screen']",
    "sentiment_score": 0.982277974713,
    "start_second": 280000,
    "text": "alexander team would like to build OK so do you all save image on screen",
    "topic_distance": NaN,
    "topic_id": NaN,
    "topic_phrase": NaN,
    "topic_score": NaN
  },
  {
    "confidence": 0.8129805999999999,
    "key_phrases": "[u'image', u'screen']",
    "sentiment_score": 0.9964439717,
    "start_second": 285000,
    "text": "please do you all see the image on your screen OK you can see is it is a pretty new",
    "topic_distance": NaN,
    "topic_id": NaN,
    "topic_phrase": NaN,
    "topic_score": NaN
  },
  {
    "confidence": 0.8533649999999999,
    "key_phrases": "[u'convention center', u'OK']",
    "sentiment_score": 0.9965263331380001,
    "start_second": 290000,
    "text": "OK as you can see is it is a pretty new modern and convention center with",
    "topic_distance": 0.3,
    "topic_id": "e5a053c7-739b-459a-8d3f-91df53b7c55e",
    "topic_phrase": "convention center",
    "topic_score": 4.0
  },
  {
    "confidence": 0.8770787,
    "key_phrases": "[u'space', u'convention center']",
    "sentiment_score": 0.854199366493,
    "start_second": 295000,
    "text": "modern and convention center with space also for",
    "topic_distance": 0.3,
    "topic_id": "514ff113-7980-443f-bf3d-524fb5dcea91",
    "topic_phrase": "convention center with space",
    "topic_score": 1.0
  },
  {
    "confidence": 0.8723476000000001,
    "key_phrases": "[u'nap', u'space', u'people']",
    "sentiment_score": 0.5,
    "start_second": 300000,
    "text": "hello to space also for for taking a nap like this people here",
    "topic_distance": NaN,
    "topic_id": NaN,
    "topic_phrase": NaN,
    "topic_score": NaN
  },
  {
    "confidence": 0.8510023000000001,
    "key_phrases": "[u'OK', u'act', u'people']",
    "sentiment_score": 0.9962718851610001,
    "start_second": 305000,
    "text": "will taking an act like this people yeah right OK so let me clear this",
    "topic_distance": NaN,
    "topic_id": NaN,
    "topic_phrase": NaN,
    "topic_score": NaN
  },
  {
    "confidence": 0.8546210999999999,
    "key_phrases": "[u'OK', u'branch']",
    "sentiment_score": 0.996839136827,
    "start_second": 310000,
    "text": "alright OK so let me clear this let me stop this OK so now that we know which branch",
    "topic_distance": NaN,
    "topic_id": NaN,
    "topic_phrase": NaN,
    "topic_score": NaN
  },
  {
    "confidence": 0.8633066999999999,
    "key_phrases": "[u'OK', u'projects']",
    "sentiment_score": 0.924014606965,
    "start_second": 315000,
    "text": "stop this OK so now that we know which projects were talking about I think it would be useful is",
    "topic_distance": NaN,
    "topic_id": NaN,
    "topic_phrase": NaN,
    "topic_score": NaN
  },
  {
    "confidence": 0.7950832,
    "key_phrases": "[u'team deporte unity']",
    "sentiment_score": 0.958879860794,
    "start_second": 320000,
    "text": "we're talking about I think it would be useful if I give you a give each team deporte unity too",
    "topic_distance": NaN,
    "topic_id": NaN,
    "topic_phrase": NaN,
    "topic_score": NaN
  },
  {
    "confidence": 0.7929698000000001,
    "key_phrases": "[u'ideas', u'team', u'OK']",
    "sentiment_score": 0.9846126041399998,
    "start_second": 325000,
    "text": "I give you a give each team deprotonated to brainstorm some ideas ask you some questions OK",
    "topic_distance": NaN,
    "topic_id": NaN,
    "topic_phrase": NaN,
    "topic_score": NaN
  },
  {
    "confidence": 0.8472199,
    "key_phrases": "[u'profanity', u'coz', u'team', u'separate rooms', u'ass', u'final questions']",
    "sentiment_score": 0.9489774267200001,
    "start_second": 330000,
    "text": "bridgestone somebody's <profanity>ass</profanity> coz I'm final questions OK so I'm going to create 2 separate rooms for each team",
    "topic_distance": 0.5956,
    "topic_id": "859f5ebf-4e95-46fd-975f-b1cc19bfeb75",
    "topic_phrase": "final questions",
    "topic_score": 2.0
  },
  {
    "confidence": 0.9181809999999999,
    "key_phrases": "[u'team', u'separate rooms']",
    "sentiment_score": 0.959643267665,
    "start_second": 335000,
    "text": "so I'm going to create 2 separate rooms for each team and then I'm going to join each team ask you if you have any",
    "topic_distance": NaN,
    "topic_id": NaN,
    "topic_phrase": NaN,
    "topic_score": NaN
  },
  {
    "confidence": 0.9383691999999999,
    "key_phrases": "[u'final questions', u'team']",
    "sentiment_score": 0.968961339863,
    "start_second": 340000,
    "text": "then I'm going to join each team ask you if you have any final questions hopefully you will not have any questions and then I'll bring your back",
    "topic_distance": 0.5673,
    "topic_id": "859f5ebf-4e95-46fd-975f-b1cc19bfeb75",
    "topic_phrase": "final questions",
    "topic_score": 2.0
  },
  {
    "confidence": 0.9199921,
    "key_phrases": "[u'questions']",
    "sentiment_score": 0.9777339002609999,
    "start_second": 345000,
    "text": "funny questions hopefully you will not have any questions and then I'll bring your back together and then we will decide what is going to happen next",
    "topic_distance": NaN,
    "topic_id": NaN,
    "topic_phrase": NaN,
    "topic_score": NaN
  },
  {
    "confidence": 0.9446918,
    "key_phrases": "[u'breakout rooms', u'OK']",
    "sentiment_score": 0.961365336435,
    "start_second": 350000,
    "text": "and then we will decide what is going to happen next OK so let me create some breakout rooms",
    "topic_distance": NaN,
    "topic_id": NaN,
    "topic_phrase": NaN,
    "topic_score": NaN
  },
  {
    "confidence": 0.9283267,
    "key_phrases": "[u'breakout rooms game']",
    "sentiment_score": 0.955362828991,
    "start_second": 355000,
    "text": "so let me create some breakout rooms game",
    "topic_distance": NaN,
    "topic_id": NaN,
    "topic_phrase": NaN,
    "topic_score": NaN
  },
  {
    "confidence": 0.9378752,
    "key_phrases": "[u'OK']",
    "sentiment_score": 0.5,
    "start_second": 360000,
    "text": "OK",
    "topic_distance": NaN,
    "topic_id": NaN,
    "topic_phrase": NaN,
    "topic_score": NaN
  },
  {
    "confidence": 0.8062789,
    "key_phrases": "[u'alexander match tom', u'iran christina rachel']",
    "sentiment_score": 0.5,
    "start_second": 365000,
    "text": "alexander match tom and then with iran christina rachel",
    "topic_distance": 0.698,
    "topic_id": "5ef2f1b4-ce3f-43bd-add5-3e46391a964a",
    "topic_phrase": "iran christina rachel",
    "topic_score": 2.0
  },
  {
    "confidence": 0.6846985999999999,
    "key_phrases": "[u'iran christina rachel', u'vicki OK']",
    "sentiment_score": 0.8892590880700001,
    "start_second": 370000,
    "text": "and then with iran christina rachel and vicki OK",
    "topic_distance": 0.6064,
    "topic_id": "5ef2f1b4-ce3f-43bd-add5-3e46391a964a",
    "topic_phrase": "iran christina rachel",
    "topic_score": 2.0
  },
  {
    "confidence": 0.8023716999999999,
    "key_phrases": "[u'enwiki OK']",
    "sentiment_score": 0.5,
    "start_second": 375000,
    "text": "enwiki OK",
    "topic_distance": NaN,
    "topic_id": NaN,
    "topic_phrase": NaN,
    "topic_score": NaN
  },
  {
    "confidence": 0.0,
    "key_phrases": "[u'NaN']",
    "sentiment_score": 0.5,
    "start_second": 380000,
    "text": NaN,
    "topic_distance": NaN,
    "topic_id": NaN,
    "topic_phrase": NaN,
    "topic_score": NaN
  },
  {
    "confidence": 0.0,
    "key_phrases": "[u'NaN']",
    "sentiment_score": 0.5,
    "start_second": 385000,
    "text": NaN,
    "topic_distance": NaN,
    "topic_id": NaN,
    "topic_phrase": NaN,
    "topic_score": NaN
  },
  {
    "confidence": 0.0,
    "key_phrases": "[u'NaN']",
    "sentiment_score": 0.5,
    "start_second": 390000,
    "text": NaN,
    "topic_distance": NaN,
    "topic_id": NaN,
    "topic_phrase": NaN,
    "topic_score": NaN
  },
  {
    "confidence": 0.7324934000000001,
    "key_phrases": "[u'good news']",
    "sentiment_score": 0.739908875168,
    "start_second": 395000,
    "text": "well I add a good news it seems that",
    "topic_distance": NaN,
    "topic_id": NaN,
    "topic_phrase": NaN,
    "topic_score": NaN
  },
  {
    "confidence": 0.8282356,
    "key_phrases": "[u'teams', u'good news']",
    "sentiment_score": 0.947393804931,
    "start_second": 400000,
    "text": "well I add a good news it seems that both your teams are ready",
    "topic_distance": NaN,
    "topic_id": NaN,
    "topic_phrase": NaN,
    "topic_score": NaN
  },
  {
    "confidence": 0.7891321,
    "key_phrases": "[u'teams']",
    "sentiment_score": 0.930524643479,
    "start_second": 405000,
    "text": "set up both your teams are ready",
    "topic_distance": NaN,
    "topic_id": NaN,
    "topic_phrase": NaN,
    "topic_score": NaN
  },
  {
    "confidence": 0.9370315999999999,
    "key_phrases": "[u'OK']",
    "sentiment_score": 0.5,
    "start_second": 410000,
    "text": "OK",
    "topic_distance": NaN,
    "topic_id": NaN,
    "topic_phrase": NaN,
    "topic_score": NaN
  },
  {
    "confidence": 0.8801955,
    "key_phrases": "[u'meeting', u'london', u'march']",
    "sentiment_score": 0.5,
    "start_second": 415000,
    "text": "is that the next time is going to be at meeting in london in march",
    "topic_distance": NaN,
    "topic_id": NaN,
    "topic_phrase": NaN,
    "topic_score": NaN
  },
  {
    "confidence": 0.9283939,
    "key_phrases": "[u'london']",
    "sentiment_score": 0.5,
    "start_second": 420000,
    "text": "in london in march",
    "topic_distance": NaN,
    "topic_id": NaN,
    "topic_phrase": NaN,
    "topic_score": NaN
  },
  {
    "confidence": 0.7639273,
    "key_phrases": "[u'project OK']",
    "sentiment_score": 0.5,
    "start_second": 425000,
    "text": "finalize project OK",
    "topic_distance": NaN,
    "topic_id": NaN,
    "topic_phrase": NaN,
    "topic_score": NaN
  },
  {
    "confidence": 0.6515395,
    "key_phrases": "[u'details']",
    "sentiment_score": 0.5,
    "start_second": 430000,
    "text": "details",
    "topic_distance": NaN,
    "topic_id": NaN,
    "topic_phrase": NaN,
    "topic_score": NaN
  },
  {
    "confidence": 0.6133116,
    "key_phrases": "[u'mike']",
    "sentiment_score": 0.5,
    "start_second": 435000,
    "text": "mike 2",
    "topic_distance": NaN,
    "topic_id": NaN,
    "topic_phrase": NaN,
    "topic_score": NaN
  },
  {
    "confidence": 0.8837723,
    "key_phrases": "[u'OK']",
    "sentiment_score": 0.9507113649690001,
    "start_second": 440000,
    "text": "and that's right OK so let me",
    "topic_distance": NaN,
    "topic_id": NaN,
    "topic_phrase": NaN,
    "topic_score": NaN
  },
  {
    "confidence": 0.8421257,
    "key_phrases": "[u'OK']",
    "sentiment_score": 0.983434582371,
    "start_second": 445000,
    "text": "OK so let me be OK with you I'm going to",
    "topic_distance": NaN,
    "topic_id": NaN,
    "topic_phrase": NaN,
    "topic_score": NaN
  },
  {
    "confidence": 0.8526945,
    "key_phrases": "[u'great day']",
    "sentiment_score": 0.990704021171,
    "start_second": 450000,
    "text": "you have a great day",
    "topic_distance": NaN,
    "topic_id": NaN,
    "topic_phrase": NaN,
    "topic_score": NaN
  },
  {
    "confidence": 0.4494751,
    "key_phrases": "[u'repair laptop']",
    "sentiment_score": 0.5,
    "start_second": 455000,
    "text": "repair laptop",
    "topic_distance": NaN,
    "topic_id": NaN,
    "topic_phrase": NaN,
    "topic_score": NaN
  },
  {
    "confidence": 0.8368908000000002,
    "key_phrases": "[u'OK', u'document']",
    "sentiment_score": 0.936991991217,
    "start_second": 460000,
    "text": "it don't get meant OK and the document is going to be very easy",
    "topic_distance": NaN,
    "topic_id": NaN,
    "topic_phrase": NaN,
    "topic_score": NaN
  },
  {
    "confidence": 0.9165909,
    "key_phrases": "[u'document']",
    "sentiment_score": 0.914722502112,
    "start_second": 465000,
    "text": "the document is going to be very easy",
    "topic_distance": NaN,
    "topic_id": NaN,
    "topic_phrase": NaN,
    "topic_score": NaN
  },
  {
    "confidence": 0.9157305,
    "key_phrases": "[u'agreement']",
    "sentiment_score": 0.7369941423090001,
    "start_second": 470000,
    "text": "in agreement",
    "topic_distance": NaN,
    "topic_id": NaN,
    "topic_phrase": NaN,
    "topic_score": NaN
  },
  {
    "confidence": 0.9382552,
    "key_phrases": "[u'convention center']",
    "sentiment_score": 0.5,
    "start_second": 475000,
    "text": "regarding this convention center",
    "topic_distance": NaN,
    "topic_id": NaN,
    "topic_phrase": NaN,
    "topic_score": NaN
  },
  {
    "confidence": 0.8442786,
    "key_phrases": "[u'center']",
    "sentiment_score": 0.5,
    "start_second": 480000,
    "text": "center",
    "topic_distance": NaN,
    "topic_id": NaN,
    "topic_phrase": NaN,
    "topic_score": NaN
  },
  {
    "confidence": 0.7933053000000001,
    "key_phrases": "[u'simple agreement', u'christina']",
    "sentiment_score": 0.994787816602,
    "start_second": 485000,
    "text": "as you can see it's very simple agreement you have a great and christina",
    "topic_distance": NaN,
    "topic_id": NaN,
    "topic_phrase": NaN,
    "topic_score": NaN
  },
  {
    "confidence": 0.9013674999999999,
    "key_phrases": "[u'christina']",
    "sentiment_score": 0.8309549454999999,
    "start_second": 490000,
    "text": "agreed and christina",
    "topic_distance": NaN,
    "topic_id": NaN,
    "topic_phrase": NaN,
    "topic_score": NaN
  },
  {
    "confidence": 0.8940083000000001,
    "key_phrases": "[u'christina']",
    "sentiment_score": 0.5,
    "start_second": 495000,
    "text": "christina and alexander will discuss",
    "topic_distance": NaN,
    "topic_id": NaN,
    "topic_phrase": NaN,
    "topic_score": NaN
  },
  {
    "confidence": 0.8837392,
    "key_phrases": "[u'final issues', u'alexander']",
    "sentiment_score": 0.768871006482,
    "start_second": 500000,
    "text": "alexander will discuss and resolve any final issues",
    "topic_distance": 0.4565,
    "topic_id": "b9640cc5-4dca-4e9c-a9ba-2f6e4de29a75",
    "topic_phrase": "final issues",
    "topic_score": 2.0
  },
  {
    "confidence": 0.9091355,
    "key_phrases": "[u'meeting', u'final issues']",
    "sentiment_score": 0.289759401297,
    "start_second": 505000,
    "text": "can resolve any final issues before the meeting",
    "topic_distance": 0.7821,
    "topic_id": "b9640cc5-4dca-4e9c-a9ba-2f6e4de29a75",
    "topic_phrase": "final issues",
    "topic_score": 2.0
  },
  {
    "confidence": 0.8994331,
    "key_phrases": "[u'meeting']",
    "sentiment_score": 0.5,
    "start_second": 510000,
    "text": "before the meeting",
    "topic_distance": NaN,
    "topic_id": NaN,
    "topic_phrase": NaN,
    "topic_score": NaN
  },
  {
    "confidence": 0.8890826999999999,
    "key_phrases": "[u'']",
    "sentiment_score": 0.898761811647,
    "start_second": 515000,
    "text": "are you OK with this so I'm going to",
    "topic_distance": NaN,
    "topic_id": NaN,
    "topic_phrase": NaN,
    "topic_score": NaN
  },
  {
    "confidence": 0.8328681999999998,
    "key_phrases": "[u'document', u'PDF', u'email OK']",
    "sentiment_score": 0.964924717944,
    "start_second": 520000,
    "text": "OK so I'm going to have to convert a document into a PDF file into going to send it to you by email OK",
    "topic_distance": NaN,
    "topic_id": NaN,
    "topic_phrase": NaN,
    "topic_score": NaN
  },
  {
    "confidence": 0.8360402,
    "key_phrases": "[u'email OK', u'youtube video', u'saint']",
    "sentiment_score": 0.9926553039589999,
    "start_second": 525000,
    "text": "youtube video file in it going to send it to you by email OK alright I think will done in saint",
    "topic_distance": NaN,
    "topic_id": NaN,
    "topic_phrase": NaN,
    "topic_score": NaN
  },
  {
    "confidence": 0.853125,
    "key_phrases": "[u'month', u'london']",
    "sentiment_score": 0.990678207915,
    "start_second": 530000,
    "text": "right I think will done and thank you very much so will see you all next month in london",
    "topic_distance": NaN,
    "topic_id": NaN,
    "topic_phrase": NaN,
    "topic_score": NaN
  },
  {
    "confidence": 0.9302294,
    "key_phrases": "[u'month', u'london']",
    "sentiment_score": 0.5,
    "start_second": 535000,
    "text": "so will see you all next month in london",
    "topic_distance": NaN,
    "topic_id": NaN,
    "topic_phrase": NaN,
    "topic_score": NaN
  },
  {
    "confidence": 0.3272237,
    "key_phrases": "[u'']",
    "sentiment_score": 0.5,
    "start_second": 540000,
    "text": "hey",
    "topic_distance": NaN,
    "topic_id": NaN,
    "topic_phrase": NaN,
    "topic_score": NaN
  },
  {
    "confidence": 0.0,
    "key_phrases": "[u'NaN']",
    "sentiment_score": 0.5,
    "start_second": 545000,
    "text": NaN,
    "topic_distance": NaN,
    "topic_id": NaN,
    "topic_phrase": NaN,
    "topic_score": NaN
  }
]
});

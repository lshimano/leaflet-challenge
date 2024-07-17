// Initialize the map
var map = L.map('map').setView([20, 0], 2);

// Add a tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
}).addTo(map);

// Import earthquake data
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson").then(
    function(earthquake_data){

// Function to get color based on depth
function getColor(depth) {
    switch(true) {
        case depth > 90:
            return "blue";
        case depth > 70:
            return "green";
        case depth > 50:
            return "orange";
        case depth > 30:
            return "yellow";
        case depth > 10:
            return "pink";
        default: 
            return "red";
    }
}

// Function to get radius based on magnitude
function getRadius(magnitude) {
    if (magnitude===0) {
        return 1;
    }
    return magnitude * 3;
}

// Add earthquake data to the map
function style(features) {
    return{
        radius: getRadius(magnitude),
        fillColor: getColor(depth),
        color: "purple",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    };
}

L.geoJSON(earthquake_data,{
    pointToLayer:function(feature, latlng) {
    return L.circleMarker(latlng);
},

    onEachFeature: function (feature, layer) {
        layer.bindPopup(
            "Magnitude: " + feature.properties.mag +
            "<br>Depth: " + feature.geometry.coordinates[2] + " km" +
            "<br>Location: " + feature.properties.place +
            "<br>Time: " + new Date(feature.properties.time)
        );
    }
}).addTo(map);
});

// Initialize Leaflet map
var map = L.map('map').setView([28.39765, 84.1299], 8); // Default view coordinates

// Add OpenStreetMap base layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Load GeoJSON data
var fire_Data = L.geoJSON(fireData).addTo(map);
var nepal_Data = L.geoJSON(nepalData).addTo(map);

// Iterate over each feature in the GeoJSON layer
fire_Data.eachLayer(function(layer) {
    // Check if the layer is a marker (Point geometry)
    if (layer instanceof L.Marker) {
        // Get the coordinates of the marker
        var coordinates = layer.getLatLng();

        // Bind a popup to the marker with its coordinates
        layer.bindPopup("Coordinate: " + coordinates.lat + ", " + coordinates.lng);
    }
});

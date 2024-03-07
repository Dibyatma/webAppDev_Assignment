// Initialize the map
var map = L.map('map').setView([28.39765, 84.1299], 8);

// Add base layers
var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

var satellite = L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});

//load wms from geoserver
const geoserverLayer1 = L.tileLayer.wms("http://localhost:8080/geoserver/GIS/wms?", {
    layers: 'GIS:sunsariDistrict',
    format: 'image/png',
    transparent: true,
    version: '1.1.0',
    attribution: "District Layer"
});
geoserverLayer1.addTo(map);

//load wms from geoserver
const geoserverLayer2 = L.tileLayer.wms("http://localhost:8080/geoserver/GIS/wms?", {
    layers: 'GIS:nepal_health_facilities',
    format: 'image/png',
    transparent: true,
    version: '1.1.0',
    attribution: "Health zone"
});
geoserverLayer2.addTo(map);

/*===================================================
                      MARKER               
===================================================*/

// Desired location coordinates
var markerLocation = [28.39765, 84.1299];

// Create marker at desired location
var marker = L.marker(markerLocation, {
    // Make the marker draggable if needed
    draggable: true
}).addTo(map);

// Create popup with content
var popupContent = "This is draggable Marker.(Coordinate:Lat. 28.39765, Lng. 84.1299)";
var popup = L.popup().setContent(popupContent);

// Bind popup to marker
marker.bindPopup(popup);

// Show popup on hover and hide on mouseout
marker.on('mouseover', function (e) {
    this.openPopup();
});

marker.on('mouseout', function (e) {
    this.closePopup();
});

/*===================================================
                      GEOJSON               
===================================================*/

// Removed the cities GeoJSON layer

// Add overlay layers
var Provinces = L.geoJSON()

// Create an object to hold base layers
var baseLayers = {
    "Streets": osm,
    "Satellite": satellite,
    "Sunsari District": geoserverLayer1,
    "Health Facilities": geoserverLayer2
};

// Create an object to hold overlay layers
var overlays = {
    "WMS Province": Provinces
};

// Add layer control
L.control.layers(baseLayers, overlays).addTo(map);

// Define global variables to store event listeners and marker layers
var bufferEventListener = null;
var bufferMarkerLayer = null;

var midpointEventListener = null;
var midpointMarkerLayer = null;
// Call the loadMidpointFunctionality function from script.js
loadMidpointFunctionality(map);

// Function to reset the map
function resetMap(map) {
    // Clear all layers from the map
    map.eachLayer(function (layer) {
        if (layer instanceof L.Marker || layer instanceof L.Path) {
            map.removeLayer(layer);
        }
    });
}
/*===================================================
                      SEARCH BUTTON               
===================================================*/

L.Control.geocoder().addTo(map);

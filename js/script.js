
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

//load wms form geoserver
const geoserverLayer1 = L.tileLayer.wms("http://localhost:8080/geoserver/GIS/wms?", {
    layers: 'GIS:sunsariDistrict',
    format: 'image/png',
    transparent: true,
    version: '1.1.0',
    attribution: "District Layer"
});
geoserverLayer1.addTo(map);

//load wms form geoserver
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
    draggable: false
}).addTo(map);

// Create popup with content
var popupContent = "This is the center coordinate of Nepal. (Coordinate:Lat. 28.39765, Lng. 84.1299)";
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

// Add overlay layers
var cities = L.geoJSON(); // Example overlay layer
var Provinces = L.geoJSON()

// Add markers to the cities layer
L.marker([51.5, -0.09]).bindPopup('London').addTo(cities);
L.marker([48.85, 2.35]).bindPopup('Paris').addTo(cities);

// Create an object to hold base layers
var baseLayers = {
    "Streets": osm,
    "Satellite": satellite,
    "Sunsari District": geoserverLayer1,
    "Health Facilities": geoserverLayer2

};

// Create an object to hold overlay layers
var overlays = {
    "WMS District": cities,
    "WMS Province": Provinces
};

// Add layer control
L.control.layers(baseLayers, overlays).addTo(map);

/*===================================================
                      SEARCH BUTTON               
===================================================*/

L.Control.geocoder().addTo(map);

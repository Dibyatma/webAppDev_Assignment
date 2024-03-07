// Define global variables to store event listeners and marker layers
var bufferEventListener = null;
var bufferMarkerLayer = null;
var midpointEventListener = null;
var midpointMarkerLayer = null;
var firstPoint = null;

// Define function to load buffer functionality
function loadBufferFunctionality(map) {
    // Remove previous midpoint functionality, if any
    if (midpointEventListener) {
        map.off('click', midpointEventListener);
        if (midpointMarkerLayer) {
            midpointMarkerLayer.clearLayers();
            midpointMarkerLayer = null;
        }
    }
    
    // Remove previous buffer functionality, if any
    if (bufferEventListener) {
        map.off('click', bufferEventListener);
        if (bufferMarkerLayer) {
            bufferMarkerLayer.clearLayers();
            bufferMarkerLayer = null;
        }
    }

    // Function to handle buffer functionality
    function handleBufferClick(event) {
        // Get the clicked coordinates
        var latlng = event.latlng;

        // Prompt user for buffer radius
        var radiusInput = prompt("Enter buffer radius in kilometers:");
        if (radiusInput === null || radiusInput.trim() === "") {
            return; // User canceled or entered empty value
        }

        var radius = parseFloat(radiusInput.trim());
        if (isNaN(radius) || radius <= 0) {
            alert("Please enter a valid positive number for buffer radius.");
            return; // Invalid input
        }

        // Create a GeoJSON point feature at the clicked coordinates
        var point = turf.point([latlng.lng, latlng.lat]);

        // Create a buffer zone around the clicked point
        var buffered = turf.buffer(point, radius, { units: 'kilometers' });

        // Display buffer zone on map
        L.geoJSON(buffered).addTo(map);

        // Calculate buffer area
        var bufferArea = turf.area(buffered);

        // Display buffer zone on map
        L.geoJSON(buffered).addTo(map);

        // Create popup content with coordinate and buffer area
        var popupContent = 'Clicked Coordinate: ' + latlng.lat.toFixed(6) + ', ' + latlng.lng.toFixed(6) +
            '<br>Buffer Area: ' + bufferArea.toFixed(2) + ' square kilometers';

        // Add marker to buffer marker layer with popup
        if (!bufferMarkerLayer) {
            bufferMarkerLayer = L.layerGroup().addTo(map);
        }
        L.marker(latlng)
            .addTo(bufferMarkerLayer)
            .bindPopup(popupContent)
            .openPopup();
    }

    // Add click event listener to the map
    bufferEventListener = handleBufferClick;
    map.on('click', handleBufferClick);
}
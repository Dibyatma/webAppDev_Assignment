// Define global variables to store midpoint event listener and marker layer
var midpointEventListener = null;
var midpointMarkerLayer = null;
var firstPoint = null;
var secondPoint = null;

// Define function to load midpoint functionality
function loadMidpointFunctionality(map) {
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

    // Function to handle midpoint functionality
    function handleMidpointClick(event) {
        // Get the clicked coordinates
        var latlng = event.latlng;

        if (!firstPoint) {
            // Store the coordinates of the first click
            firstPoint = latlng;
            alert('First point set: ' + latlng.lat.toFixed(6) + ', ' + latlng.lng.toFixed(6));
        } else if (!secondPoint) {
            // Store the coordinates of the second click
            secondPoint = latlng;
            alert('Second point set: ' + latlng.lat.toFixed(6) + ', ' + latlng.lng.toFixed(6));

            // Calculate the midpoint
            var midpoint = turf.midpoint(
                [firstPoint.lng, firstPoint.lat],
                [secondPoint.lng, secondPoint.lat]
            );

            // Create marker at the calculated midpoint
            if (!midpointMarkerLayer) {
                midpointMarkerLayer = L.layerGroup().addTo(map);
            } else {
                midpointMarkerLayer.clearLayers(); // Clear previous markers
            }
            var midpointMarker = L.marker([midpoint.geometry.coordinates[1], midpoint.geometry.coordinates[0]])
                .addTo(midpointMarkerLayer);

            // Bind popup with the midpoint coordinates
            midpointMarker.bindPopup('Midpoint Coordinate: ' + midpoint.geometry.coordinates[1].toFixed(6) + ', ' + midpoint.geometry.coordinates[0].toFixed(6))
                .openPopup();

            // Combine all coordinates into a single string
            var popup_Content = 'First Point Coordinate: ' + firstPoint.lat.toFixed(6) + ', ' + firstPoint.lng.toFixed(6) +
                '<br>Second Point Coordinate: ' + secondPoint.lat.toFixed(6) + ', ' + secondPoint.lng.toFixed(6) +
                '<br>Midpoint Coordinate: ' + midpoint.geometry.coordinates[1].toFixed(6) + ', ' + midpoint.geometry.coordinates[0].toFixed(6);

            // Display popup with all coordinates
            L.popup()
                .setLatLng(event.latlng)
                .setContent(popup_Content)
                .openOn(map);

            // Clear the points for next calculation
            firstPoint = null;
            secondPoint = null;
        }
    }

    // Add click event listener to the map
    midpointEventListener = handleMidpointClick;
    map.on('click', handleMidpointClick);
}

// Call the function to load midpoint functionality when the script is loaded
// loadMidpointFunctionality(map);

// app.js
// Function to initialize the map
function initMap() {
    // Set the default view to a location of your choice
    const defaultLocation = [28.394857, 84.124008];
    const defaultZoom = 7;

    // Create a map
    const map = L.map('map').setView(defaultLocation, defaultZoom);

    // Add a tile layer (you can use a different tile layer as needed)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    console.log('Map initialized!');
}

// Function to fetch NASA fire data (replace with actual data source)
function fetchNasaFireData() {
    const NasaFireDataUrl = 'https://firms.modaps.eosdis.nasa.gov/api/country/csv/611445565c21084684c3239b7ffa6b3f/VIIRS_SNPP_NRT/NPL/10/2023-12-30';

    return fetch(NasaFireDataUrl)
        .then(response => {
            const contentType = response.headers.get('Content-Type');
            if (!contentType || !contentType.includes('text/csv')) {
                throw new Error('Invalid Content-Type. Expected text/csv.');
            }
            return response.text();
        })
        .then(csvData => {
            const parsedData = Papa.parse(csvData, { header: true }).data;
            return parsedData;
        })
        .catch(error => {
            console.error('Error fetching and parsing NASA fire data:', error);
            throw new Error('Error fetching and parsing NASA fire data:', error);
        });
}

// Function to display fire data on the map
function displayFireDataOnMap(map, fireData) {
    
// Iterate over fireData and add markers with popups
    fireData.forEach(fire => {
        const marker = L.marker([fire.lat, fire.lon]).addTo(map);
        marker.bindPopup(`Fire at ${fire.lat}, ${fire.lon}: ${fire.description}`);
    });
}

// Call the initMap function when the DOM is ready
document.addEventListener('DOMContentLoaded', initMap);

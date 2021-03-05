// Making a map and tiles
let map = document.getElementById('map');
const mymap = L.map('map').setView([0, 0], 10);
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);

// Making a marker with a custom icon
const issIcon = L.icon({
  iconUrl: 'iss200.png',
  iconSize: [50, 32],
  iconAnchor: [25, 16]
});
const marker = L.marker([0, 0], { icon: issIcon }).addTo(mymap);

const api_url = 'https://api.wheretheiss.at/v1/satellites/25544';

let firstTime = true;

async function getISS() {
  const response = await fetch(api_url);
  const data = await response.json();
  //console.log(data);
  const { latitude, longitude, altitude, footprint, timestamp, velocity, visibility } = data;
  const satname = data.name;

  marker.setLatLng([latitude, longitude]);
  if (firstTime) {
    mymap.setView([latitude, longitude], 8);
    firstTime = false;
  }
  document.getElementById('lat').innerHTML = latitude.toFixed(2);
  document.getElementById('lon').innerHTML = longitude.toFixed(2);
  document.getElementById('altitude').innerHTML = altitude;
  document.getElementById('footprint').innerHTML = footprint;
  document.getElementById('satname').innerHTML = satname;
  document.getElementById('timestamp').innerHTML = timestamp;
  document.getElementById('vel').innerHTML = velocity;
  document.getElementById('visibility').innerHTML = visibility;

}


getISS();
setInterval(getISS, 1000);

// altitude: 419.56402612682
// daynum: 2459279.0652083
// footprint: 4505.2447558062
// id: 25544
// latitude: 9.5654407792635
// longitude: -59.374655094551
// name: "iss"
// solar_lat: -5.8295392283929
// solar_lon: 339.38147649154
// timestamp: 1614951234
// units: "kilometers"
// velocity: 27581.431600782
// visibility: "daylight"

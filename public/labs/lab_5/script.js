function mapInit() {
  // follow the Leaflet Getting Started tutorial here
  const mymap = L.map('mapid').setView([38.9897, -76.9378], 13);

  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiamVzY2FyZGEiLCJhIjoiY2ttNXluOXBjMGowajJ3cGozeTZ3aDdzayJ9._gQXaReX7HZGGcexWVvSRA'
  }).addTo(mymap);
  console.log('mymap', mymap);
  return mymap;
}

async function dataHandler(mapObjectFromFunction) {
  // use your assignment 1 data handling code here
  // and target mapObjectFromFunction to attach markers
  const form = document.querySelector(".userform");
  const search = document.querySelector("#zip");
  const targetList = document.querySelector('.target-list');

  const request = await fetch('/api');
  const data = await request.json();

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    console.log("submit fired");
    const d = data.filter(
       ((record) => record.zip.toUpperCase().includes(search.value.toUpperCase())))
    const display = d.reduce((unique, o) => {
      if(!unique.some(obj => obj.address_line_1 === o.address_line_1 && obj.city === o.city && obj.state === o.state)) {
        unique.push(o);
      } return unique;
    },[]);
    while (targetList.firstChild) {
        targetList.removeChild(targetList.firstChild)
      };
    display.forEach((item) => {
        const appendItem = document.createElement("li");
        const html = display.map(place => {
          return (`
          <li>
            <span class='name'>${place.name}</span> 
            <span class='address'>${place.address_line_1}</span>
            <span class='location'>${place.city}, ${place.state}</span>
            <span class='zip'>${place.zip}</span>
          </li>
        `);
        const coord = item.geocoded_column_1;
        const lat = coord.coordinates[1];
        const long = coord.coordinates[0];
        mapObjectFromFunction.panTo([lat, long]);
        const marker = L.marker([lat, long]).addTo(mapObjectFromFunction);
})
    if (search.value.length === 0) {html.length = 0}
    else html.length = 5;
    targetList.innerHTML = html.join('');
    
    })
    console.log('here is display', display);
    console.table(display);
})
}

async function windowActions() {
  const map = mapInit();
  await dataHandler(map);
}

window.onload = windowActions;
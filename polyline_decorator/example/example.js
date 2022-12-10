
function init() {
    var map = L.map('map', {
        center: [52.0, -11.0],
        zoom: 5,
        layers: [
            L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            })
        ]
    });



    // --- Example with an array of Polylines ---
    var multiCoords1 = [
        [[47.5468, -0.7910], [48.8068, -0.1318]]
    ];
    var plArray = [];
    for(var i=0; i<multiCoords1.length; i++) {
        plArray.push(L.polyline(multiCoords1[i]).addTo(map));
    }
    L.polylineDecorator(multiCoords1, {
        patterns: [
            {offset: 25,
			 repeat: 50,
			 symbol: L.Symbol.arrowHead({
				 pixelSize: 15,
				 pathOptions: {fillOpacity: 1, weight: 0}
				 })
			}
        ]
    }).addTo(map);
}

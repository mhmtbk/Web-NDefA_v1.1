//---Leaflet Legend
var legend = L.control({position: 'bottomright'});
legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend'),
    labels = ['<strong>Categories</strong>' + '<br>'],
    categories = ['Road Surface','Signage','Line Markings','Roadside Hazards','Other'];

    div.innerHTML +=
    labels.push(
    '<div class="triangle_white"> <i class="empty" style="background:' + '"></i></div>' +
    (categories[0] ? categories[0] : '+') + '<br>');

    div.innerHTML +=
    labels.push(
    '<div class="triangle_green"> <i class="empty" style="background:' + '"></i></div>' +
    (categories[0] ? categories[0] : '+') + '<br>');

    div.innerHTML +=
    labels.push(
    '<div class="triangle_yellow"> <i class="empty" style="background:' + '"></i></div>' +
    (categories[0] ? categories[0] : '+') + '<br>');

    div.innerHTML = labels.join('<br>');
    return div;
};

legend.addTo(map);

//legend.removeFrom(map);
map.removeControl(legend);
legend.addTo(map);
//---
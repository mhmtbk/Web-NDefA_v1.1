var DOM_27 = [[42, 27],[36, 27]];
var DOM_30 = [[42, 30],[36, 30]];
var DOM_33 = [[42, 33],[36, 33]];
var DOM_36 = [[42, 36],[36, 36]];
var DOM_39 = [[42, 39],[36, 39]];
var DOM_42 = [[42, 42],[36, 42]];
var DOM_45 = [[42, 45],[36, 45]];


var polyline_27 = new L.Polyline(DOM_27, {
    color: 'red',
    weight: 3,
    opacity: 1
    }).bindTooltip('27°', {
    permanent: true
});
var polyline_30 = new L.Polyline(DOM_30, {
    color: 'blue',
    weight: 2,
    opacity: 0.9
    }).bindTooltip('30°', {
    permanent: true
});
var polyline_33 = new L.Polyline(DOM_33, {
    color: 'red',
    weight: 3,
    opacity: 1
    }).bindTooltip('33°', {
    permanent: true
});
var polyline_36 = new L.Polyline(DOM_36, {
    color: 'blue',
    weight: 2,
    opacity: 0.9
    }).bindTooltip('36°', {
    permanent: true
});
var polyline_39 = new L.Polyline(DOM_39, {
    color: 'red',
    weight: 3,
    opacity: 1
    }).bindTooltip('39°', {
    permanent: true
});
var polyline_42 = new L.Polyline(DOM_42, {
    color: 'blue',
    weight: 2,
    opacity: 0.9
    }).bindTooltip('42°', {
    permanent: true
});
var polyline_45 = new L.Polyline(DOM_45, {
    color: 'red',
    weight: 3,
    opacity: 1
    }).bindTooltip('45°', {
    permanent: true
});

DOM_CM_t1 = L.layerGroup([polyline_27, polyline_33, polyline_39, polyline_45, polyline_30, polyline_36, polyline_42]);
DOM_CM_t2 = L.layerGroup([polyline_27, polyline_33, polyline_39, polyline_45, polyline_30, polyline_36, polyline_42]);
DOM_CM_t3 = L.layerGroup([polyline_27, polyline_33, polyline_39, polyline_45, polyline_30, polyline_36, polyline_42]);

//var DOM_6 = L.layerGroup([polyline_27, polyline_33, polyline_39, polyline_45]);
//var DOM_3 = L.layerGroup([polyline_30, polyline_36, polyline_42]);
//DOM_6.addTo(map);
//DOM_3.addTo(map);
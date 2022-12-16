//---Modal
window.onload = function () {
    document.getElementById('myModalHome').style.display = "block";
};

document.getElementsByClassName("close_ModalHome")[0].onclick = function () {
    document.getElementById('myModalHome').style.display = "none";
}

document.getElementsByClassName("modal-footer_Modal")[0].onclick = function () {
    document.getElementById('myModalHome').style.display = "none";
}

window.onclick = function (event) {
    if (event.target == document.getElementById('myModalHome')) {
        document.getElementById('myModalHome').style.display = "none";
    }
}
//---

//---Create Map
var zoom = 6;
var enlem = 38.85;
var boylam = 35.6991;

var map = L.map('map', {
    zoom: 18,
    minZoom: 3,
    maxZoom: 22
}).setView([enlem, boylam], zoom);

L.Control.Scale.include({
    _updateMetric: function (maxMeters) {
        var max_VelocityVectors = maxMeters / 4500,
            VelocityVectors = this._getRoundNum(max_VelocityVectors),
            label =
            VelocityVectors < 100 ? VelocityVectors + " cm - Vectors" : VelocityVectors / 100 + " m";

        this._updateScale(this._mScale, label, VelocityVectors / max_VelocityVectors);
    }
});

scale = L.control.scale({
    imperial: false
});

//---Leaflet Drawing Tools Pop Up
drawnItems = L.featureGroup().addTo(map);
map.addControl(new L.Control.Draw({
    edit: {
        featureGroup: drawnItems,
        poly: {
            allowIntersection: false
        }
    },
    draw: {
        polygon: {
            allowIntersection: false,
            showArea: true
        }
    }
}));

// Truncate value based on number of decimals
var _round = function (num, len) {
    return Math.round(num * (Math.pow(10, len))) / (Math.pow(10, len));
};
// Helper method to format LatLng object (x.xxxxxx, y.yyyyyy)
var strLatLng = function (latlng) {
    return "(" + _round(latlng.lat, 6) + ", " + _round(latlng.lng, 6) + ")";
};

var getPopupContent = function (layer) {
    // Marker - add lat/long
    if (layer instanceof L.Marker || layer instanceof L.CircleMarker) {
        return strLatLng(layer.getLatLng());
        // Circle - lat/long, radius
    } else if (layer instanceof L.Circle) {
        var center = layer.getLatLng(),
            radius = layer.getRadius();
        return "Center: " + strLatLng(center) + "<br />" +
            "Radius: " + _round(radius, 2) + " m";
        // Rectangle/Polygon - area
    } else if (layer instanceof L.Polygon) {
        var latlngs = layer._defaultShape ? layer._defaultShape() : layer.getLatLngs(),
            area = L.GeometryUtil.geodesicArea(latlngs);
        return "Area: " + L.GeometryUtil.readableArea(area, true);
        // Polyline - distance
    } else if (layer instanceof L.Polyline) {
        var latlngs = layer._defaultShape ? layer._defaultShape() : layer.getLatLngs(),
            distance = 0;
        if (latlngs.length < 2) {
            return "Distance: N/A";
        } else {
            for (var i = 0; i < latlngs.length - 1; i++) {
                distance += latlngs[i].distanceTo(latlngs[i + 1]);
            }
            return "Distance: " + _round(distance, 2) + " m";
        }
    }
    return null;
};

// Object created - bind popup to layer, add to feature group
map.on(L.Draw.Event.CREATED, function (event) {
    var layer = event.layer;
    var content = getPopupContent(layer);
    if (content !== null) {
        layer.bindPopup(content);
    }
    drawnItems.addLayer(layer);
});

// Object(s) edited - update popups
map.on(L.Draw.Event.EDITED, function (event) {
    var layers = event.layers,
        content = null;
    layers.eachLayer(function (layer) {
        content = getPopupContent(layer);
        if (content !== null) {
            layer.setPopupContent(content);
        }
    });
});
//---

//---Tile Layers
/* googleSatellite */
var uydu = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
    maxZoom: 22,
    maxNativeZoom: 19,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    attribution: '&copy; <a href="#">Mehmet BAK</a>'
});

var uydu_ = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
    maxZoom: 22,
    maxNativeZoom: 19,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    attribution: '&copy; <a href="#">Mehmet BAK</a>'
});

/* OpenStreetMap */
var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 22,
    maxNativeZoom: 19,
    attribution: '&copy; <a href="#">Mehmet BAK</a>'
});

/* OpenTopoMap */
var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    maxZoom: 22,
    maxNativeZoom: 19,
    attribution: '&copy; <a href="#">Mehmet BAK</a>'
});

/* googleHybrid */
var hybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
    maxZoom: 22,
    maxNativeZoom: 19,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    attribution: '&copy; <a href="#">Mehmet BAK</a>'
})
//---

//---Change Tile Layers
if (document.getElementById('uydu-id').checked) {
    uydu.addTo(map);
}

$('input:radio[name=radio_th]').change(function () {
    if (this.value == 'uydu') {
        /* googleSatellite */
        map.addLayer(uydu_);
        map.removeLayer(uydu);
        map.removeLayer(osm);
        map.removeLayer(topo);
        map.removeLayer(hybrid);
    } else if (this.value == 'osm') {
        /* OpenStreetMap */
        map.addLayer(osm);
        map.removeLayer(uydu);
        map.removeLayer(uydu_);
        map.removeLayer(topo);
        map.removeLayer(hybrid);
    } else if (this.value == 'topo') {
        /* OpenTopoMap */
        map.addLayer(topo);
        map.removeLayer(uydu);
        map.removeLayer(uydu_);
        map.removeLayer(osm);
        map.removeLayer(hybrid);
    } else if (this.value == 'hybrid') {
        /* googleHybrid */
        map.addLayer(hybrid);
        map.removeLayer(uydu);
        map.removeLayer(uydu_);
        map.removeLayer(osm);
        map.removeLayer(topo);
    }
});
//---

//---Tile Layers Opacity
var myLayers = {
    "a": uydu,
    "b": uydu_,
    "c": osm,
    "d": topo,
    "e": hybrid,
};

function updateOpacity(value) {
    myLayers['a'].setOpacity(value);
    myLayers['b'].setOpacity(value);
    myLayers['c'].setOpacity(value);
    myLayers['d'].setOpacity(value);
    myLayers['e'].setOpacity(value);
}
//---

//---Türkiye Sınırı
//Sınır
var turkey = L.geoJson(turkey, {
    style: turkey_Style,
    onEachFeature: onEachFeature_turkey,
}).addTo(map);
//

//Stil
function turkey_Style(feature) {
    return {
        fillColor: "#55c6f4",
        fillOpacity: 0.3,
        color: '#fff',
        opacity: 1,
        weight: 1,
    }
}

function onEachFeature_turkey(feature, layer) {
    layer.on({
        mouseover: function () {
            this.setStyle({
                'fillColor': 'grey',
            });
        },
        mouseout: function () {
            this.setStyle({
                'fillColor': '#55c6f4',
            });
        },
        click: function () {}
    });
}
//

//Checkbox
$('input:checkbox[name=turkey_sinir]').click(function () {
    if (map.hasLayer(turkey)) {
        map.removeLayer(turkey);
    } else {
        map.addLayer(turkey);
    };
});
//
//---

//---Türkiye İl Sınırı
//Sınır
var turkey_il = L.geoJson(turkey_il, {
    style: turkey_il_Style,
    onEachFeature: onEachFeature_turkey_il,
});
//

//Stil
function turkey_il_Style(feature) {
    return {
        fillColor: "#ffcccc",
        fillOpacity: 0.3,
        color: '#1a0000',
        opacity: 1,
        weight: 1,
    }
}

function onEachFeature_turkey_il(feature, layer) {
    layer.on({
        mouseover: function () {
            this.setStyle({
                'fillColor': '#f7eded',
            });
        },
        mouseout: function () {
            this.setStyle({
                'fillColor': '#ffcccc',
            });
        },
        click: function () {}
    });
    layer.bindTooltip(feature.properties.NAME_1, {
        permanent: true,
        direction: 'center',
        className: 'turkey_Label'
    });
}
//

//Checkbox
$('input:checkbox[name=turkey_il_sinir]').click(function () {

    if (map.hasLayer(turkey_il)) {
        map.removeLayer(turkey_il);
    } else {
        map.addLayer(turkey_il);
    };

});
//
//---

//---Türkiye İlçe Sınırları
//Sınır
var turkey_ilce = L.geoJson(turkey_ilce, {
    style: turkey_ilce_Style,
    onEachFeature: onEachFeature_turkey_ilce,
});
//

//Stil
function turkey_ilce_Style(feature) {
    return {
        fillColor: "rgba(247, 237, 237, 0)",
        fillOpacity: 0.3,
        color: 'rgba(229, 244, 58, 0.72)',
        opacity: 1,
        weight: 1,
    }
}

function onEachFeature_turkey_ilce(feature, layer) {
    layer.on({
        mouseover: function () {
            this.setStyle({
                'fillColor': 'rgba(247, 237, 237, 0)',
            });
        },
        mouseout: function () {
            this.setStyle({
                'fillColor': 'rgba(255, 204, 204, 0)',
            });
        },
        click: function () {
            // TODO Link to page
            alert(feature.properties.NAME_2 + ' ilçesi')
        }
    });
}
//

//Checkbox
$('input:checkbox[name=turkey_ilce_sinir]').click(function () {
    if (map.hasLayer(turkey_ilce)) {
        map.removeLayer(turkey_ilce);
    } else {
        map.addLayer(turkey_ilce);
    };
});
//
//---

//---Plaka Sınırı (Plates Boundry)
//Sınır
var plates_sinir = L.geoJson(plates, {
    style: plates_Style,
    onEachFeature: onEachFeature_plates,
});
//

//Stil
function plates_Style(feature) {
    return {
        fillColor: "#55c6f4",
        fillOpacity: 0.1,
        color: '#000000',
        opacity: 1,
        weight: 3,
    }
}

function onEachFeature_plates(feature, layer) {
    layer.on({
        mouseover: function () {
            this.setStyle({
                'fillColor': '#ffffff',
            });
        },
        mouseout: function () {
            this.setStyle({
                'fillColor': '#55c6f4',
            });
        },
        click: function () {}
    });
    layer.bindTooltip(feature.properties.PlateName, {
        permanent: true,
        direction: 'center',
        className: 'plates_Label'
    });
}
//

//Checkbox
$('input:checkbox[name=plates]').click(function () {

    if (map.hasLayer(plates_sinir)) {
        map.removeLayer(plates_sinir);
    } else {
        map.addLayer(plates_sinir);
    };

});
//
//---

//---Crustal Fault
//---Sınırlar
var crustal_fault = L.geoJson(crustal_fault, {
    style: crustal_fault_Style,
    onEachFeature: onEachFeature_crustal_fault,
});
//

//Stil
function crustal_fault_Style(feature) {
    return {
        fillColor: "#ffcccc",
        fillOpacity: 0.3,
        color: '#000000',
        opacity: 1,
        weight: 1.5,
    }
}

function onEachFeature_crustal_fault(feature, layer) {
    layer.on({
        mouseover: function () {
            this.setStyle({
                'fillColor': '#f7eded',
            });
        },
        mouseout: function () {
            this.setStyle({
                'fillColor': '#ffcccc',
            });
        },
        click: function () {}
    });
}
//

//Checkbox
$('input:checkbox[name=fay_hatti]').click(function () {

    if (map.hasLayer(crustal_fault)) {
        map.removeLayer(crustal_fault);
    } else {
        map.addLayer(crustal_fault);
    };

});
//
//---

//---Crustal Fault Zones
//Sınır
var crustal_fault_zones = L.geoJson(crustal_fault_zones, {
    style: crustal_fault_zones_Style,
    onEachFeature: onEachFeature_crustal_fault_zones,
});
//

//Stil
function crustal_fault_zones_Style(feature) {
    return {
        fillColor: "#cccccc",
        fillOpacity: 0.3,
        color: '#000000',
        opacity: 1,
        weight: 1,
    }
}

function onEachFeature_crustal_fault_zones(feature, layer) {
    layer.on({
        mouseover: function () {
            this.setStyle({
                'fillColor': '#f7eded',
            });
        },
        mouseout: function () {
            this.setStyle({
                'fillColor': '#ffcccc',
            });
        },
        click: function () {}
    });
}
//

//Checkbox
$('input:checkbox[name=fay_hatti_zone]').click(function () {

    if (map.hasLayer(crustal_fault_zones)) {
        map.removeLayer(crustal_fault_zones);
    } else {
        map.addLayer(crustal_fault_zones);
    };

});
//
//---

//Subduction Contours
//Sınır
var subduction_contours = L.geoJson(subduction_contours, {
    style: subduction_contours_Style,
    onEachFeature: onEachFeature_subduction_contours,
});
//

//Stil
function subduction_contours_Style(feature) {
    return {
        fillColor: "#ffcccc",
        fillOpacity: 0.3,
        color: '#ff0000',
        opacity: 1,
        weight: 1,
    }
}

function onEachFeature_subduction_contours(feature, layer) {
    layer.on({
        mouseover: function () {
            this.setStyle({
                'fillColor': '#f7eded',
            });
        },
        mouseout: function () {
            this.setStyle({
                'fillColor': '#ffcccc',
            });
        },
        click: function () {
            // TODO Link to page
            //alert('Clicked on ' + feature.properties.Mahalle)
        }
    });
}
//

//Checkbox
$('input:checkbox[name=dalim_kontur]').click(function () {
    if (map.hasLayer(subduction_contours)) {
        map.removeLayer(subduction_contours);
    } else {
        map.addLayer(subduction_contours);
    };
});
//
//---

//---Subduction Zones
//Sınır
var subduction_zones = L.geoJson(subduction_zones, {
    style: subduction_zones_Style,
    onEachFeature: onEachFeature_subduction_zones,
});
//

//Stil
function subduction_zones_Style(feature) {
    return {
        fillColor: "#ffcccc",
        fillOpacity: 0.3,
        color: '#ff0000',
        opacity: 1,
        weight: 1,
    }
}

function onEachFeature_subduction_zones(feature, layer) {
    // DO THIS FOR EACH DISTRICT
    // events
    layer.on({
        mouseover: function () {
            this.setStyle({
                'fillColor': '#f7eded',
            });
        },
        mouseout: function () {
            this.setStyle({
                'fillColor': '#ffcccc',
            });
        },
        click: function () {
            // TODO Link to page
            //alert('Clicked on ' + feature.properties.Mahalle)
        }
    });
}
//

//Checkbox
$('input:checkbox[name=dalim_bolge]').click(function () {
    if (map.hasLayer(subduction_zones)) {
        map.removeLayer(subduction_zones);
    } else {
        map.addLayer(subduction_zones);
    };
});
//
//---

//---Leaflet File Layer
(function (window) {
    'use strict';

    function initMap() {
        var control;
        var L = window.L;
        /*var osm = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; 2013 OpenStreetMap contributors'
        }); 
        var map = L.map('map', {
            center: [0, 0],
            zoom: 2
        }).addLayer(osm); */
        var style = {
            color: 'red',
            opacity: 1.0,
            fillOpacity: 0.30,
            weight: 2,
            clickable: false
        };
        L.Control.FileLayerLoad.LABEL = '<img class="icon" src="file_layer/folder.svg" alt="file icon"/>';
        control = L.Control.fileLayerLoad({
            fitBounds: true,
            layerOptions: {
                style: style,
                pointToLayer: function (data, latlng) {
                    return L.circleMarker(
                        latlng, {
                            style: style
                        }
                    );
                }
            }
        });
        control.addTo(map);
        control.loader.on('data:loaded', function (e) {
            var layer = e.layer;
            console.log(layer);
        });
    }

    window.addEventListener('load', function () {
        initMap();
    });
}(window));
//---

//---Leaflet Location
// add location control to global name space for testing only
// on a production site, omit the "lc = "!
lc = L.control.locate({
    strings: {
        title: "Show me where I am"
    }
}).addTo(map);
//---

//---Leaflet Print
var customActionToPrint = function (context) {
    return function () {
        //window.alert("We are printing the MAP. Let's do Custom print here!");
        context._printCustom();
    }
}

L.control.browserPrint({
    printLayer: L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
        maxZoom: 22,
        maxNativeZoom: 19,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        attribution: '&copy; <a href="#">Mehmet BAK</a>'
    }),

    closePopupsOnPrint: false,
    printModes: [
                    L.control.browserPrint.mode("Alert", "User specified print action", "A6", customActionToPrint, false),
                    L.control.browserPrint.mode.landscape("Landscape"),
                    L.control.browserPrint.mode.portrait("Portrait"), // Aynı zamanda: "PORTrait",
                    //L.control.browserPrint.mode.auto("Auto", "B4"),
                    //L.control.browserPrint.mode.custom("Séléctionnez la zone", "B5")
                ]
}).addTo(map);
//---

//---Leaflet Home Zoom
/*
L.easyButton( 'fa fa-home', function(btn, map){
  map.setView(new L.LatLng(38.6125, 35.6991), 11);
}).addTo(map);
*/
var home_zoom = L.easyButton('fa fa-home', function () {
    map.setView(new L.LatLng(38.85, 35.6991), 6);
}, 'Home screen', {
    position: 'topleft'
});
home_zoom.addTo(map);
//---

//---Leaflet Legend
var legend = L.control({
    position: 'bottomright'
});
legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend'),
        labels = ['<strong style= font-size:16px;>Categories</strong>' + '<br>'],
        categories = ['Measured Points', 'Adjusted Points', 'Static Points'];

    div.innerHTML +=
        labels.push(
            '<div class="triangle_white"> <i class="empty" style="background:' + '"></i></div>' +
            (categories[0] ? categories[0] : '+') + '<br>');

    div.innerHTML +=
        labels.push(
            '<div class="triangle_green"> <i class="empty" style="background:' + '"></i></div>' +
            (categories[1] ? categories[1] : '+') + '<br>');

    div.innerHTML +=
        labels.push(
            '<div class="triangle_yellow"> <i class="empty" style="background:' + '"></i></div>' +
            (categories[2] ? categories[2] : '+') + '<br>');

    div.innerHTML = labels.join('<br>');
    return div;
};

legend.addTo(map);
map.removeControl(legend);
//legend.addTo(map);
//---

//---Light Slider
$('#lightSlider').lightSlider({
    gallery: true,
    item: 1,
    loop: true,
    slideMargin: 0,
    thumbItem: 9
});
//---

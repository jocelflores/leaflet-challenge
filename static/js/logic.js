var myMap = L.map("mapid").setView([38.809,-98.5556199], 5);

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    maxZoom: 18,
    id: "light-v10",
    accessToken: "pk.eyJ1Ijoiam9jZWxmbG9yZXMiLCJhIjoiY2tocGl4ZmZ4MDJvMjMzbzV6MGM5NDg0NSJ9.Q6cT_e1lI1u4yeJUGm6O4Q"
}).addTo(myMap);

    

var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";
//response.setHeader("Set-Cookie", "key=value; HttpOnly; SameSite=lax")
d3.json(url, function(data) {
    function styling(feature) {
        return {
            opacity: 1,
            fillOpacity: 1,
            fillColor: getColor(feature.properties.mag),
            color: "#000000",
            stroke: true,
            weight: 0.5 
        };
    }

        function getColor(magnitude) {
            switch (true) {
                case magnitude > 5:
                    return '#800026';
                case magnitude > 4:
                    return '#BD0026';
                case magnitude >3:
                    return '#E31A1C';
                case magnitude > 2:
                    return '#FC4E2A';
                case magnitude > 1:
                    return '#FD8D3C';
                default: 
                    return '#FEB24C';
            }
        }

        function radiusSet(magnitude) {
            if (magnitude === 0) {
                return 1;
            }

            return magnitude * 5;
        }
    
            L.geoJson(data, {
                Layer2: function(feature, latlng) {
                    return L.circleMarker(latlng);
                },

                style: styling,
                eachFeat: function(feature, layer) {
                    layer.bindPopUp("Magnitude: " + feature.properties.mag + "<br>Location" + feature.properties.place);

                }
            }).addTo(myMap);

        var legend = L.control({
            position: "bottomright"
        });

        legend.onAdd = function() {
            var div = L.DomUtil.create('div', 'info legend');
            var scalemag = [0, 1, 2, 3, 4, 5];
            var colorscheme = [
                '#800026',
                '#BD0026',
                '#E31A1C',
                '#FC4E2A',
                '#FD8D3C',
                '#FEB24C',
            ];
            for (var i = 0; i < scalemag.length; i++) {
                div.innerHTML +=
                "<i style = 'background: " + colorscheme[i] + "'></i>" +
                scalemag[i] + (scalemag[i +1] ? "&ndash;" + scalemag[i+1] + "<br>" : '+');
               }
               return div;
            };

            legend.addTo(myMap);
        
        });
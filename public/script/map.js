mapboxgl.accessToken = maptoken;
        const map = new mapboxgl.Map({
            container: 'map', // container ID
            center: coordinates, // starting position [long,lat]
            zoom: 10 // starting zoom
        });
        const marker = new mapboxgl.Marker({color:"red"})
        .setLngLat(coordinates)
        .setPopup(new mapboxgl.Popup({offset: 0})
        .setHTML("<h6>Were you will be</h6>"))
        .addTo(map);

        

        const layerList = document.getElementById('menu');
    const inputs = layerList.getElementsByTagName('input');

    for (const input of inputs) {
        input.onclick = (layer) => {
            const layerId = layer.target.id;
            map.setStyle('mapbox://styles/mapbox/' + layerId);
        };
    }
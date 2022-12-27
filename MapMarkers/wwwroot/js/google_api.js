function initMap() {
    var coordinates = {
        lat: 56.94977,
        lng: 24.10485,
    };
    var googleMap = new google.maps.Map(document.querySelector("#googleMap"), {
        zoom: 14,
        center: coordinates,
        scrollwheel: false,
    });

    map.addListener("click", (event) => {
        var marker = new google.maps.Marker({
            position: event.latLng,
            map: map
        });
        map.panTo(event.latLng);
    });
}



window.addEventListener("load", initMap);

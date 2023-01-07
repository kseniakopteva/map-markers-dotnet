let markers = [];
let start = false;
let dest = false;

//console.log(model);

function initMap() {

    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();

    let coordinates = {
        lat: 56.94977,
        lng: 24.10485,
    };
    let googleMap = new google.maps.Map(document.querySelector("#googleMap"), {
        draggableCursor: 'pointer',
        zoom: 14,
        center: coordinates,
        scrollwheel: false,
    });

    directionsRenderer.setMap(googleMap);
    document.querySelector("#routeButton").addEventListener("click", () => {
        calculateAndDisplayRoute(directionsService, directionsRenderer, markers);
    });

    googleMap.addListener("click", (event) => {
        let form = document.querySelector("#form");
        let formData = new FormData(document.querySelector("#form"));

        if (!formData.get("name")) {
            if (!confirm('Are you sure you want to create an empty marker?')) {
                return;
            }
        }

        let markerName = formData.get("name");
        let markerDesc = formData.get("desc");
        let markerType = formData.get("type");
        let markerDate = formData.get("date");
        let markerCreated = formData.get("show-date");

        let markerTitle = markerName;
        if (markerDesc) {
            markerTitle += "\n" + markerDesc;
        }
        if (markerType !== null && markerType !== "none") {
            markerTitle += "\ntype: " + markerType.replace(/-/g, " ");
        }
        if (markerDate) {
            markerTitle += "\ndate: " + markerDate;
        }
        if (markerCreated) {
            markerTitle += "\ncreated: " + new Date().toLocaleString();
        }
        markerInfo = "";
        if (markerName) {
            markerInfo += "<h2>" + markerName + "</h2>";
        }
        if (markerDesc) {
            markerInfo += "<p>" + markerDesc + "</p>";
        }
        if (markerType !== null && markerType !== "none") {
            markerInfo += "<h4>Type</h4>" + "<p>" + markerType.replace(/-/g, " ") + "</p>";
        }
        if (markerDate) {
            markerInfo += "<h4>Date</h4>" + "<p>" + markerDate + "</p>";
        }
        if (markerCreated) {
            markerInfo += "<h4>Created</h4>" + "<p>" + new Date().toLocaleString() + "</p>";
        }

        const infoWindow = new google.maps.InfoWindow({
            content: markerInfo
        });

        let marker = new google.maps.Marker({
            position: event.latLng,
            map: googleMap,
            title: markerTitle,
            type: markerType
        });

        if (infoWindow.content) {
            marker.addListener("click", () => {
                infoWindow.open({
                    anchor: marker,
                    map: googleMap
                });
            });
        }
        console.log(JSON.stringify(event.latLng));

        document.querySelector("#invitation").textContent = "";
        form.reset();
        markers.push(marker);
    });
}

function calculateAndDisplayRoute(directionsService, directionsRenderer, markers) {

    let start = markers.filter(obj => {
        return obj.type === "starting-point";
    })[0];

    let dest = markers.filter(obj => {
        return obj.type === "destination";
    })[0];

    if (!start && !dest) {
        alert("You haven't set a starting point and a destination!");
        return;
    }

    if (!start) {
        alert("You haven't set a starting point!");
        return;
    }
    if (!dest) {
        alert("You haven't set a destination!");
        return;
    }

    let waypts = markers.filter(obj => {
        return obj.type === "waypoint";
    })

    directionsService
        .route({
            origin: start.position,
            destination: dest.position,
            waypoints: waypts.position,
            travelMode: google.maps.TravelMode.DRIVING,
        })
        .then((response) => {
            directionsRenderer.setDirections(response);
        })
        .catch((e) => window.alert("Directions request failed due to " + e.code));
}

window.addEventListener("load", initMap);

if (document.querySelector("#submit")) {
    submit.addEventListener("click", function (e) {
        e.preventDefault();
        if (validate(new FormData(document.querySelector("#form")))) {

            let type = new FormData(document.querySelector("#form")).get("type");
            if (type === "starting-point") {
                if (start == true) {
                    alert("There is already a starting point!");
                    return;
                } else {
                    start = true;
                }
            } else if (type === "destination") {
                if (dest == true) {
                    alert("There is already a destination!");
                    return;
                } else {
                    dest = true;
                }
            }

            document.querySelector("#invitation").textContent = "Place a marker.";
        }
    }
    );
}
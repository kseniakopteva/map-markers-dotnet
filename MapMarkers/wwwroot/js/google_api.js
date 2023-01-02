let markers = [];

function initMap() {
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

    googleMap.addListener("click", (event) => {
        let form = document.querySelector("#form");
        let formData = new FormData(document.querySelector("#form"));

        if (!formData.get("name")) {
            if (!confirm('Are you sure you want to create an empty marker?')) {
                console.log("wth!");
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
            markerInfo += "<h4>type: </h4>" + "<p>" + markerType.replace(/-/g, " ") + "</p>";
        }
        if (markerDate) {
            markerInfo += "<h4>date: </h4>" + "<p>" + markerDate + "</p>";
        }
        if (markerCreated) {
            markerInfo += "<h4>created: </h4>" + "<p>" + new Date().toLocaleString() + "</p>";
        }

        const infoWindow = new google.maps.InfoWindow({
            content: markerInfo
        });

        let marker = new google.maps.Marker({
            position: event.latLng,
            map: googleMap,
            title: markerTitle
        });

        if (infoWindow.content) {
            marker.addListener("click", () => {
                infoWindow.open({
                    anchor: marker,
                    map: googleMap
                });
            });
        }

        document.querySelector("#invitation").textContent = "";
        form.reset();
        markers.push(marker);
    });
}

window.addEventListener("load", initMap);

if (document.querySelector("#submit")) {
    submit.addEventListener("click", function (e) {
        e.preventDefault();
        if (validate(new FormData(document.querySelector("#form"))))
            document.querySelector("#invitation").textContent = "Place a marker.";
    }
    );
}
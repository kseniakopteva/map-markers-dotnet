let markerWidth = 30;
let markerHeight = 30;

let addMarker = (x, y, text) => {
    let newMarker = document.createElement("img");
    newMarker.src = "https://cdn4.iconfinder.com/data/icons/small-n-flat/24/map-marker-512.png";

    newMarker.classList.add("marker");
    newMarker.style.left = x - markerWidth / 2 + "px"; // 15 = half of marker width
    newMarker.style.top = y - markerHeight + "px"; // 28 = marker height
    newMarker.title = text;

    let markerContainer = document.querySelector("#markerCont");

    markerContainer.appendChild(newMarker);
};

// Load markers from local storage
let Markers;
if (localStorage.getItem("Markers")) {
    Markers = JSON.parse(localStorage.getItem("Markers"));

    Markers.forEach((marker) => {
        addMarker(marker.xPosition, marker.yPosition, marker.markerInfo);
    });
} else {
    Markers = [];
}

let overlay = document.querySelector("#overlay");

if (overlay) {
    overlay.addEventListener("click", function (e) {
        alert("Please submit the form with marker information first!");
    });
}

let submit = document.querySelector("#submit");

if (submit) {
    submit.addEventListener("click", function (e) {
        e.preventDefault();

        validate(new FormData(document.querySelector("#form")));
        overlay.classList.add("hidden");

        document.querySelector("#invitation").textContent = "Place a marker.";
    });
}

let clearButton = document.querySelector("#clearButton");
if (clearButton) {
    clearButton.addEventListener("click", function (e) {
        e.preventDefault();

        localStorage.clear();
        location.reload();
    });
}

let map = document.querySelector("#map");
if (map) {
    map.addEventListener("click", function (e) {
        let form = document.querySelector("#form");
        let formData = new FormData(document.querySelector("#form"));

        // get position relative to image
        let rect = e.target.getBoundingClientRect();
        let xCursorPosition = e.clientX - rect.left;
        let yCursorPosition = e.clientY - rect.top;

        let markerDesc = formData.get("desc");
        let markerType = formData.get("type");
        let markerDate = formData.get("date");
        let markerCreated = formData.get("show-date");

        // marker hover text creation
        let markerTitle = formData.get("name");
        if (markerDesc) {
            markerTitle += "\n" + markerDesc;
        }
        if (markerType !== null && markerType !== "none") {
            markerTitle += "\nType: " + markerType.replace(/-/g, " ");
        }
        if (markerDate) {
            markerTitle += "\nDate: " + markerDate;
        }
        if (markerCreated) {
            markerTitle += "\nCreated: " + new Date().toLocaleString();
        }

        // pushing the new marker to the array
        Markers.push({ xPosition: xCursorPosition, yPosition: yCursorPosition, markerInfo: markerTitle });

        // saving the array with the new item to the local storage
        localStorage.setItem("Markers", JSON.stringify(Markers));

        addMarker(xCursorPosition, yCursorPosition, markerTitle);

        overlay.classList.remove("hidden");
        document.querySelector("#invitation").textContent = "";
        form.reset();
    });
}
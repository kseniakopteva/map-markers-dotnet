let validate = (formData) => {
    let nameError = document.querySelector("#nameErrorDiv");
    nameError.innerHTML = "";

    // name validation
    let name = formData.get("name");
    // alphanumeric and spaces
    if (!name.match(/^[a-z\d\-_\s]+$/i)) {
        let nameErrorText = document.createElement("span");
        if (name === null || name === "") {
            nameErrorText.textContent = "Name cannot be empty";
        } else {
            nameErrorText.textContent = "Name should contain only letters, numbers and spaces";
        }
        nameErrorText.style.color = "red";
        nameError.appendChild(nameErrorText);
        return false;
    }

    // description validation
    // (htmlspecialchars() equivalent)
    let desc = formData.get("desc");
    let map = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
    };
    desc = desc.replace(/[&<>"']/g, function (m) {
        return map[m];
    });
    return true;
};
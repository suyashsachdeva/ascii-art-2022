/*******************************/
/* 1) Homepage - Image upload */
/*****************************/

var uploadBtn = document.getElementById("uploadBtn");
var uploadFile = document.getElementById("formFile");
if (uploadBtn) {
    uploadBtn.addEventListener("click", function () {
        uploadFile.click();
    });

    uploadFile.addEventListener("change", function () {
        document.getElementById("uploadForm").submit();
    });

    var dropZone = document.getElementById("dropZone");
    dropZone.addEventListener("dragover", function (e) {
        e.preventDefault();
        e.stopPropagation();
        dropZone.classList.add("dragover");
    });

    dropZone.addEventListener("drop", function (e) {
        e.preventDefault();
        e.stopPropagation();
        dropZone.classList.remove("dragover");
        var file = e.dataTransfer.files[0];
        uploadFile.files = e.dataTransfer.files;
        document.getElementById("uploadForm").submit();
    });
}


/*****************************/
/* 2) Gallery - Delete file */
/***************************/

const deleteBtns = document.querySelectorAll('.delete-btn');
const deleteForm = document.querySelector('#deleteForm');
const imageId = document.querySelector('#imageId');

deleteBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const imageName = btn.getAttribute('data-name');
        imageId.value = imageName;
        deleteForm.submit();
    })
});



/***************************/
/* 3) Text Art - Generate */
/*************************/
const textSettingsForm = document.querySelector('#settingsForm');
const asciiArt = document.querySelector('.ascii-art');
var TEXT_ART = asciiArt ? asciiArt.innerText : null;

if (textSettingsForm) {
    textSettingsForm.addEventListener('input', (e) => {
        const text = e.target.value;
        var data = new FormData(textSettingsForm);

        fetch('/v2/text/generate', {
            method: 'POST',
            body: data
        }).then(res => res.json())
            .then(data => {
                asciiArt.innerHTML = data.art;
                TEXT_ART = data.art;
                updateColor();
            })
    })
}




function downloadArt() {
    var artContainer = document.querySelector('.ascii-art');
    html2canvas(artContainer).then(canvas => {
        document.body.appendChild(canvas);
        var link = document.createElement('a');
        link.download = 'text-art.png';
        link.href = canvas.toDataURL();
        link.click();

        document.body.removeChild(canvas);

    });
}
if (document.querySelector('#exportButton'))
    document.querySelector('#exportButton').addEventListener('click', downloadArt);




document.getElementById("darkmode-input").addEventListener("change", function () {
    if (this.checked) {
        setColorMode(false);
    } else {
        setColorMode(true);
    }
});


function setColorMode(dark=false) {
    if (dark) {
        document.body.classList.add("darkmode");
        document.getElementById("darkmode-input").checked = false;
        localStorage.setItem("darkmode", true);
    } else {
        document.body.classList.remove("darkmode");
        document.getElementById("darkmode-input").checked = true;
        localStorage.setItem("darkmode", false);
    }
}


if(localStorage.getItem("darkmode") == "true") {
    setColorMode(true);
} else {
    setColorMode(false);
}



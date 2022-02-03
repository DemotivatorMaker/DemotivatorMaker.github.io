//#region Меню
function createDemotivator() {
    window.location = "defaultdemotivator.html";
}
//#endregion

//#region Управление (Универсально)
function colorpickerOne() {
    document.getElementById("color1").click();
}

function colorpickerTwo() {
    document.getElementById("color2").click();
}

function rTopText() {
    document.getElementById("sizeTop").focus();
}

function rBottomText() {
    document.getElementById("sizeBottom").focus();
}

function selectImage() {
    document.getElementById("imageSelected").click();
}

function saveDemotivator() {
    let image = document.getElementById("canvas").toDataURL("image/png").replace("image/png", "image/octet-stream");

    const link = document.createElement('a');
    link.download = ""+selectedCanvas.textTop+'_.png';
    link.href = image
    link.click();
    link.delete;
}


function copyConf() {
    prompt('Скопируйте и сохраните JSON код, для дальнейшей вставки', JSON.stringify(selectedCanvas));
}

function setConf() {
    let json = prompt('Введите JSON код', "");
    selectedCanvas = JSON.parse(json);
}
//#endregion

function backButton() {
    window.location = "index.html";
}
let dem = [];
let noupdateState = false;

window.onload = function() {
    createOneDemotivator();

    setDevotivatorSize();
    document.getElementById("colorTwo").style.backgroundColor = "#FFFFFF";
}

function createOneDemotivator() {
    dem.push(new Demotivator());
    
    if(dem.length-1 != 0){
        dem[dem.length-1].color1 = document.getElementById("color1").value;
        dem[dem.length-1].color2 = document.getElementById("color2").value;
        dem[dem.length-1].textTop = document.getElementById("topText").value;
        dem[dem.length-1].textBottom = document.getElementById("bottomText").value;
        dem[dem.length-1].textTopSize = document.getElementById("sizeTop").value;
        dem[dem.length-1].textBottomSize = document.getElementById("sizeBottom").value;
        dem[dem.length-1].sizeW = document.getElementById("sizeW").value;
        dem[dem.length-1].sizeH = document.getElementById("sizeH").value;
        dem[dem.length-1].image = selectedCanvas.image;
    }
    selectedCanvas = dem[dem.length-1];

    remakeLists()
}

function remakeLists() {
    let list = document.getElementById("list");
    list.innerHTML = "";
    for(let i = 0; i < dem.length; i++){
        list.innerHTML += getItemDem(i);
        if(dem[i] == selectedCanvas){
            changeColorItem(i);
        }
    }
}

function changeDem(num) {
    selectedCanvas = dem[num];

    document.getElementById("color1").value = selectedCanvas.color1;
    document.getElementById("color2").value = selectedCanvas.color2;
    document.getElementById("topText").value = selectedCanvas.textTop;
    document.getElementById("bottomText").value = selectedCanvas.textBottom;
    document.getElementById("sizeTop").value = selectedCanvas.textTopSize;
    document.getElementById("sizeBottom").value = selectedCanvas.textBottomSize;
    document.getElementById("sizeW").value = selectedCanvas.sizeW;
    document.getElementById("sizeH").value = selectedCanvas.sizeH;

    document.getElementById("demImage").src = selectedCanvas.image;

    changeColorItem(num);

    updateDem()
}

function changeColorItem(num) {
    let item = document.getElementById("list_"+num);

    for(let i = 0; i < dem.length; i++){
        let itemt = document.getElementById("list_"+i);
        itemt.classList.remove("item__selected");
    }

    item.classList.add("item__selected");
}

function deleteSelected() {
    for(let i = 0; i < dem.length; i++){
        if(dem[i] == selectedCanvas){
            dem.splice(i,1);
            selectedCanvas = undefined;
            remakeLists();
        }
    }
}

setInterval(function() {

    if(noupdateState == false){
        if(selectedCanvas != undefined){
            canvas.style.display = "block";
            document.getElementById("warningText").style.display = "none";
    
            updateDem()
        } else {
            canvas.style.display = "none";
            document.getElementById("warningText").style.display = "block";
        }
    }
    
}, 100);

function updateDem() {
    selectedCanvas.color1 = document.getElementById("color1").value;
    selectedCanvas.color2 = document.getElementById("color2").value;
    selectedCanvas.textTop = document.getElementById("topText").value;
    selectedCanvas.textBottom = document.getElementById("bottomText").value;
    selectedCanvas.textTopSize = document.getElementById("sizeTop").value;
    selectedCanvas.textBottomSize = document.getElementById("sizeBottom").value;
    selectedCanvas.sizeW = document.getElementById("sizeW").value;
    selectedCanvas.sizeH = document.getElementById("sizeH").value;
    setDevotivatorSize()
}

let file = document.getElementById("imageSelected");
file.addEventListener("change", function() {

    let fReader = new FileReader();
    fReader.readAsDataURL(file.files[0]);
    fReader.onloadend = function(event){
        document.getElementById("demImage").src = event.target.result;
        selectedCanvas.image = event.target.result;
        document.getElementById("selectedImgText").textContent = file.files[0].name;
    }

}, false);

document.getElementById("color1").addEventListener("input",(event)=>{
    document.getElementById("colorOne").style.backgroundColor = document.getElementById("color1").value;
});

document.getElementById("color2").addEventListener("input",(event)=>{
    document.getElementById("colorTwo").style.backgroundColor = document.getElementById("color2").value;
});

document.getElementById("list")
  .addEventListener('wheel', function(event) {
    if (event.deltaMode == event.DOM_DELTA_PIXEL) {
      var modifier = 1;
      // иные режимы возможны в Firefox
    } else if (event.deltaMode == event.DOM_DELTA_LINE) {
      var modifier = parseInt(getComputedStyle(this).lineHeight);
    } else if (event.deltaMode == event.DOM_DELTA_PAGE) {
      var modifier = this.clientHeight;
    }
    if (event.deltaY != 0) {
      // замена вертикальной прокрутки горизонтальной
      this.scrollLeft += modifier * event.deltaY;
      event.preventDefault();
    }
});

function pastBackDem() {
    for(let i = 0; i < dem.length; i++){
        if(dem[i] == selectedCanvas){
            if (i == 0) {
                alert("За этим демотиватором ничего нет :Р");
            } else {
                noupdateState = true;
                selectedCanvas = dem[i-1];
                document.getElementById("demImage").src = selectedCanvas.image;
                setDevotivatorSize()
                let image = canvas.toDataURL("image/png");
                document.getElementById("demImage").src = image;
                selectedCanvas = dem[i];
                selectedCanvas.image = image; 
                setDevotivatorSize()
                noupdateState = false;
            }
            
        }
    }
}

function pastDem() {
    let num = document.getElementById("demnum").value;
    let selectedCanvasSaver;

    if(dem.length < num){
        alert("такого демотиватора не существует")
    } else{
        selectedCanvasSaver = selectedCanvas;
        noupdateState = true;
        selectedCanvas = dem[num];
        document.getElementById("demImage").src = selectedCanvas.image;
        setDevotivatorSize()
        let image = canvas.toDataURL("image/png");
        document.getElementById("demImage").src = image;
        selectedCanvas = selectedCanvasSaver;
        selectedCanvas.image = image; 
        setDevotivatorSize()
        noupdateState = false;
    }
}

function tunelSaveButton() {
    noupdateState = true;
    selectedCanvasSaver = selectedCanvas;
    let demotivators = [];
    
    for(let i = 0; i < dem.length; i++){
        console.log("===");
        console.log("Рендеринг "+ i + " демотиватора");
        changeDem(i)
        document.getElementById("demImage").src = selectedCanvas.image;
        setDevotivatorSize()
        let image = canvas.toDataURL("image/png").replace(/^data:image\/(png|jpg);base64,/, "");
        demotivators.push(image);
        console.log("===");
    }

    console.log(demotivators);

    var zip = new JSZip();
    var img = zip.folder("Демотиваторы");
    
    for (let i = 0; i < demotivators.length; i++) {
        img.file("Демотиватор_"+i+".png", demotivators[i], {base64: true});
    }

    zip.generateAsync({type:"blob"})
    .then(function(content) {
        saveAs(content, "Демотиваторы.zip");
    });

    noupdateState = false;
    selectedCanvas = selectedCanvasSaver;
}
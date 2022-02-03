let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let selectedCanvas;

function Demotivator() {
    this.color1 = "black",
    this.color2 = "white",
    this.textTop = "",
    this.textBottom = "",
    this.textTopSize = 32,
    this.textBottomSize = 20,
    this.fontText = "Times New Roman",
    this.sizeW = 512,
    this.sizeH = 512,
    this.sizeAutoMode = false,
    this.ImageAlign = "cover",
    this.offset = 28
    this.image = "";
}

function setDevotivatorSize(){
    canvas.width = selectedCanvas.sizeW;
    canvas.height = selectedCanvas.sizeH;
    demImage = document.getElementById('demImage');
    reDraw();
}

function reDraw(){
    let offset = selectedCanvas.offset;
    let widthSize = canvas.width - (offset*2);
    let heightSize = canvas.height - (offset*4);
    let topTextH = heightSize + 50;
    let topTextW = canvas.width / 2;

    let color1 = selectedCanvas.color1;
    let color2 = selectedCanvas.color2;

    ctx.fillStyle = color1;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = color2;
    ctx.fillRect(offset, offset, widthSize, heightSize);
    ctx.fillStyle = color1;
    ctx.fillRect(offset+2, offset+2, widthSize-4, heightSize-4);
    ctx.drawImage(demImage, offset+5, offset+5, widthSize-10, heightSize-10);

    ctx.fillStyle = color2;
    ctx.textAlign = "center";
    ctx.font = selectedCanvas.textTopSize+"px "+selectedCanvas.fontText;
    ctx.fillText(selectedCanvas.textTop, topTextW, topTextH + 10);

    ctx.font = selectedCanvas.textBottomSize+"px "+selectedCanvas.fontText;
    ctx.fillText(selectedCanvas.textBottom, topTextW, topTextH + 40);
}

function getItemDem(num) {
    return `
    
        <div class="item" id="list_${num}" onclick="changeDem(${num})">
            ${num+1}
        </div>

    `
}
var doc = app.activeDocument;
var layer = doc.activeLayer; 

var maxSize = 1200; // O limite do seu quadrado
var bounds = layer.bounds; // [esquerda, topo, direita, baixo]
var layerWidth = bounds[2].value - bounds[0].value;
var layerHeight = bounds[3].value - bounds[1].value;

// LÓGICA DE PROGRAMAÇÃO:
// Se a largura for maior que a altura, a escala é baseada na largura.
// Se a altura for maior (ou igual), a escala é baseada na altura.
var ratio;
if (layerWidth > layerHeight) {
    ratio = maxSize / layerWidth;
} else {
    ratio = maxSize / layerHeight;
}

var resizePercent = ratio * 100;

// Redimensiona mantendo a proporção (aspect ratio)
layer.resize(resizePercent, resizePercent, AnchorPosition.MIDDLECENTER);

// Centraliza no meio do canvas 1200x1200px
layer.translate(doc.width/2 - (bounds[0] + bounds[2])/2, doc.height/2 - (bounds[1] + bounds[3])/2);

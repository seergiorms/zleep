//inicialització de totes les variables i arrays que s'utilitzarán dins el codi

let poster;
let i;
var distance;
var opacitat = 0;
var opacitatS = 255;
var opv = 3;
let splash;
let medidaRombo = 30;
let sang = [];
let posX = [];
let posY = [];
let formes = [];
let mode = 0;
let currentFrame = 0;

//la funció preload permer carregar la media, en aquest cas fotos i tipus de fonts de text que s'utilitzaràn dins el codi.

//per poder fer que les imatges no es moguin amb el mouse, he hagut de crear la llista "formes", on s'afegiràn els loadImage i la imatge que surti de manera aleatòria (a la funció corresponent dins el codi).
function preload() {
  poster = loadImage("images/REDPSYCHO.png");
  sang = ["images/sangre0.png", "images/sangre1.png", "images/sangre2.png"];
  formes = [];
  font = loadFont("LTPerfume-2.ttf");
  scream = loadImage("images/christianBale.png");
}

//se crea el canvas i he afegit que el text es dibuixi centrat, que els angles estiguin en graus en comptes de radians i que la forma de dibuixar una ellipse (arcs) sigui amb graus i no amb radians.
function setup() {
  createCanvas(720, 1280);
  angleMode(DEGREES);
  ellipseMode(RADIUS);
  textAlign(CENTER);
}

function draw() {
  background(0);

  //fa que es canvii de pàgina entre la del poster i la del missatge segons el valor de la variable mode.
  switch (mode) {
    case 0:
      cartell();
      break;
    case 1:
      animacio();
      break;
  }
}

//dibuixa el cartell (pàgina 1)
function cartell() {
  //fa que quan el cursor estigui damunt del ganivet surti l'imatge de fons, he intentat aproximar el perímetre del ganivet lo màxim possible.
  if (
    (mouseX >= width / 2 - 85 &&
      mouseX <= width / 2 + 115 &&
      mouseY <= 750 &&
      mouseY >= 300) ||
    (mouseX >= width / 2 - 85 &&
      mouseX <= width / 2 + 90 &&
      mouseY <= 750 &&
      mouseY >= 200) ||
    (mouseX >= width / 2 - 85 &&
      mouseX <= width / 2 + 20 &&
      mouseY <= 750 &&
      mouseY >= 100)
  ) {
    //fa que si el mouse està dintre del ganivet i la opacitat no és major de 255, aquesta vagi augmentant fins que es vegi del tot la imatge.
    if (opacitat <= 255) {
      opacitat = opacitat + opv;
    }

    //fa que si el mouse no està dintre del ganivet la opacitat de la fotografia del fons disminueixi fins que la foto no es vegi. Si la opacitat arriba a 0 es deixa de restar, ja que sino quant més temps estigui el mouse fora del ganivet, més tardarà després en tornar a ser visible la foto (la opacitat es tornaría negativa <0).
  } else {
    if (opacitat >= 0) {
      opacitat = opacitat - opv;
    }
  }

  //splash és un condicional que indica si s'ha fet clic, i permet dibuixar la sang. Aquí lo que fa es que disminueixi la opacitat de les fotos de la sang una vegada que fas clic. (al mouse pressed cada vegada que fas clic la opacitat d'aquestes fotos puja al màxim, 255, i aquí es baixa per donar l'efecte de que s'esvaeix). Al igual que amb la foto de fons, una vegada que la opacitat arriba a 0 s'atura de restar a la opacitat.
  if (splash == true) {
    if (opacitatS >= 0) {
      opacitatS = opacitatS - 1.7;
    }
  } else if (opacitatS == 0) {
    splash = false;
  }

  //dibuixa el ganivet, les fotos de fons, la sang i els textos.
  push();
  tint(255, opacitat);
  image(poster, 0, 0, width, height);
  pop();

  push();
  cuchillo();
  sangSplash();
  pop();
  textos();
}

//amb el current frame, que funciona com un rellotge, he fet que apareguin les paraules a la pantalla per ordre i amb un temps definit, de manera escalonada. Quan la variable currentFrame arriba a 250, que és el temps que he decidit com a màxim per la animació, la variable mode canvia a 0 (es canvia a la pàgina del cartell) i la variable currentFrame torna a ser 0 per que es pugui repetir la sequència.;
function animacio() {
  currentFrame++;
  textFont("Times New Roman", 60);

  if (currentFrame >= 30) {
    text("I", width / 2, 350);
  }
  if (currentFrame >= 40) {
    text("HAVE", width / 2, 450);
  }
  if (currentFrame >= 80) {
    text("TO", width / 2, 550);
  }
  if (currentFrame >= 90) {
    text("RETURN", width / 2, 650);
  }

  if (currentFrame >= 130) {
    text("SOME", width / 2, 750);
  }

  push();
  fill("rgb(140,0,0)");
  if (currentFrame >= 140) {
    text("VIDEOTAPES", width / 2, 850);
  }
  pop();

  if (currentFrame == 250) {
    mode = 0;
    currentFrame = 0;
  }
}

//quan es clica el mouse s'assigna a la variable i un valor random entre 0 i 2, als arrays de posició x i y s'afegeixen les respectives coordenades, a l'array de formes s'afegeix un loadImage amb la imatge corresponent a la casella número "i" de l'array de sang. La opacitat de les fotos de sang puja a 255 i la del fons també. El boolean splash canvia a true.
function mousePressed() {
  i = int(random(0, 3));
  posX.push(mouseX);
  posY.push(mouseY);
  formes.push(loadImage(sang[i]));
  opacitatS = 255;
  opacitat = 255;
  splash = true;
}

//quan es pitja la tecla enter la variable mode canvia a 1 i es veu l'animació de la pàgina d'animació.
function keyPressed() {
  if (mode == 0) {
    if (keyCode === ENTER) {
      mode = 1;
    }
  }
}

//dibuixa les imatges de sang cada vegada que es clica.
function sangSplash() {
  push();
  imageMode(CENTER);
  tint(255, opacitatS);

  //fa que s'eliminin les posicions les primeres caselles dels arrays de posició x, y i el de formes. D'aquesta manera només podrà haver un màxim de 10 imatges de sang a la pantalla per tal de no sobrecarregar el disseny
  if (formes.length > 10) {
    formes.shift();
    posX.shift();
    posY.shift();
  }

  //fa que depenent del valor de la variable i surti un tipus de imatge de sang o una altre.
  for (let x = 0; x < formes.length; x++) {
    if (i == 0) {
      image(formes[x], posX[x], posY[x], 300, 300);
    } else if (i == 1) {
      image(formes[x], posX[x], posY[x], 300, 300);
    } else if (i == 2) {
      image(formes[x], posX[x], posY[x], 300, 300);
    }
  }

  pop();
}

//dibuixa el ganivet amb la sang.
function cuchillo() {
  noStroke();
  fill(255);
  rect(width / 2 - 85, 400, 200, 350, 0, 0, 10, 0);
  rect(width / 2 - 85, 750, 80, 200);
  arc(width / 2 - 45, 950, 40, 40, 0, 180);

  push();
  fill("rgb(140,0,0)");
  arc(width / 2 - 85, 400, 200, 300, 270, 0);
  rect(width / 2 - 85, 400, 40, 120);
  arc(width / 2 - 65, 520, 20, 20, 0, 180);

  rect(width / 2 - 25, 400, 40, 50);
  arc(width / 2 - 5, 450, 20, 20, 0, 180);

  rect(width / 2 + 75, 400, 40, 100);
  arc(width / 2 + 95, 500, 20, 20, 0, 180);
  pop();

  arc(width / 2 - 35, 400, 10, 10, 180, 0);
  arc(width / 2 + 45, 400, 30, 30, 180, 0);
}

//dibuixa els textos del cartell.
function textos() {
  fill(255);
  textFont("Times New Roman", 65);
  text("AMERICAN PSYCHO", width / 2, 1100);
  textSize(20);
  push();
  fill("rgb(140,0,0)");
  text("Starring Christian Bale, Willem Dafoe & Jared Leto", width / 2, 1250);
  pop();
  push();
  textFont("Arial", 14);
  fill(65)
  text("Press Enter to return some videotapes", width / 2, 1225);
  pop();
  textFont(font, 40);
  
  text("Killer Looks.", width / 2, 1160);
}

  function generateShape(event) {
    const svg = document.querySelector("svg");
    const shapes = ["circle", "rect", "polygon"];
    const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#FF9A33"];
    const shapeType = shapes[Math.floor(Math.random() * shapes.length)];
    const color = colors[Math.floor(Math.random() * colors.length)];

    let shape;
    switch (shapeType) {
      case "circle":
        shape = `<circle cx="${event.clientX}" cy="${event.clientY}" r="${Math.random() * 50 + 10}" fill="${color}" />`;
        break;
      case "rect":
        shape = `<rect x="${event.clientX}" y="${event.clientY}" width="${Math.random() * 50 + 20}" height="${Math.random() * 50 + 20}" fill="${color}" />`;
        break;
      case "polygon":
        const size = Math.random() * 50 + 20;
        shape = `<polygon points="${event.clientX},${event.clientY - size} ${event.clientX - size},${event.clientY + size} ${event.clientX + size},${event.clientY + size}" fill="${color}" />`;
        break;
    }
    svg.innerHTML += shape;
  }

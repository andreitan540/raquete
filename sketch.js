var bola
var bolaImagem
var raquete
var bordas
var pontos = 0 
var vidas = 3
var bloco
var blocos
var estado = 'inicio'
var som

function recomecar() {
  pontos  = 0
  vidas = 3
  blocos.destroyEach()
  estado = 'inicio'

  fileraBlocos(80, "red")
  fileraBlocos(180, "blue")
  fileraBlocos(130 , "pink")
  fileraBlocos(230, "orange")
}

function vida() {
  vidas = vidas -1

  if (vidas >= 1) {
    estado = 'inicio'
  }else{
  estado = 'perdeu'
   } 
 }

function atingeBloco(bola, bloco) {
  bloco.destroy()
  pontos = pontos +5
  som.play()

  if (bola.velocityX <15 && bola.velocityY <15) {
    bola.velocityX = bola.velocityX  *1.05
    bola.velocityY = bola.velocityY  *1.05

  }
}

function fileraBlocos(y, cor){
  for (var i = 0; i < 6; i++) {
    bloco = createSprite(50 + 100 * i, y, 80, 20)
    bloco.shapeColor = cor
    blocos.add(bloco)
  }
}

function preload() {
  bolaImagem = loadImage("bola.png")
  som = loadSound("puzzle_game_button_04.mp3")
}

function setup() {
  createCanvas(600, 600)
 
  bola = createSprite(300, 300)
  bola.addImage(bolaImagem)
  bola.scale = 0.05
 
  raquete = createSprite(300, 550, 200, 20)

  bordas = createEdgeSprites()

  blocos = new Group()

  fileraBlocos(80, "red")
  fileraBlocos(180, "blue")
  fileraBlocos(130 , "pink")
  fileraBlocos(230, "orange")
}

function draw() {
  background("black")

  drawSprites()

  textSize(30)
  text ("pontuação: " + pontos , 50, 50)
  text ("vidas: " + vidas , 400, 50)
  
  if (estado === 'inicio') {
    text("aperte espaço para começar", 100, 400) 
    bola.x = 300
    bola.y = 300
    bola.velocityY = 0
    bola.velocityX = 0 
  
    if (keyDown("space")) {
      bola.velocityY = 10
      bola.velocityX = 10
      estado = 'jogo'  
      blocos.setVelocityYEach  (0.3)   
    }
  }else if (estado === 'perdeu') {
    text("voce perdeu", 200, 400)

    if (keyDown("space")) {
      recomecar()
    }  
  } else {
    raquete.x = mouseX

    if (raquete.x < 100) {
      raquete.x = 100
    }
  
    if (raquete.x > 500) {
      raquete.x = 500
    }

    if ( !blocos [0]) {
      text("parabens voce ganhou!!!", 200, 400)
      bola.velocityX = 0
      bola.velocityY = 0

      if (keyDown("space")) {
        recomecar()
      }
    }
  
    bola.bounceOff(raquete)
    bola.bounceOff(bordas[0])
    bola.bounceOff(bordas[1])
    bola.bounceOff(bordas[2])
  
    bola.bounceOff(blocos, atingeBloco)

    if (blocos.isTouching(raquete)) {
      estado = 'perdeu'
      blocos.setVelocityYEach  (0.0)
    }
  
    if (bola.isTouching(bordas[3])) {
      blocos.setVelocityYEach  (0.0)
      vida()
    } 
  }
}

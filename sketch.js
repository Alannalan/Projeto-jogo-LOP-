//telas
var tela =1
var tempo = 0
//layout
var pontos = 0
var vidas = 5
var dificuldade = 1
//jogador
var x = 180
var y = 350
//objetos
var xq = 500
var yq = 65
//disparo
var xd = 0
var yd = 0
var estadoDisparo = false
//niveis
var barreiradepontos = 1000
//objetos aleatórios
var vetorX = []
var vetorY = []
var vetorD = []
var vetorV = []
var qtdElementos = 2
//JOGO
function preload() {
  galinheiro= loadImage('galinheiro.jpg')
  ovo= loadImage('kisspng-fried-egg-egg-white-white-eggs-5a833b0e90f604.7536668915185497745938.png')
  galinha=loadImage('5a2bb8ec085c53.9410613815128148280343.png')
  garfo= loadImage('garfinho.png')
  tela1= loadImage('tela1.png')
  cesta= loadImage('kisspng-chicken-egg-egg-in-the-basket-basket-filled-with-eggs-5aa6ef229541d0.3881304715208896346114.png ')
  omelete= loadImage('omelete.jpg')
  pintinhos= loadImage('pintinhos.jpg')
  //Variáveis do som
  soundFormats('mp3','ogg')
  somtela1 = loadSound('Bita e os Animais - Fazendinha [clipe infantil].mp3')
  somtela2 = loadSound('Slipknot - Duality (Live At Rock in Rio 2015) (Chorus).mp3')
  somtela3 = loadSound('Oh Happy Day (Filme Mudança de Hábito II).mp3')
  somtela4 = loadSound('HELLO DARKNESS MY OLD FRIEND LYRICS VERSION 2017.mp3')
    

}

function setup() {
  createCanvas(500, 500);
  for (i = 0; i < qtdElementos; i++) {
    vetorX[i] = random(0, 500)
    vetorY[i] = random(0, 500)
    vetorD[i] = random(60, 100)
    vetorV[i] = random(6, 7)
  }

}

function draw() {
  background(tela1);
  fill(300, 300, 300);
  textSize(25);
  if(tela==1){
    somtela1.play()
    textSize(40) 
    text('BEM-VINDO',150,350);
    text('Aperte ENTER e aproveite',10,450);
    
    if(keyIsDown(ENTER)){
      tela=tela+1
    }
  }
  
  
  if(tela==2){
  somtela2.play()
  background(galinheiro)
  text('Vidas: ' + vidas, 10, 30);
  text('Pontos: ' + pontos, 200, 30);
  text('Nível: ' + dificuldade, 380, 30);
  tempo=tempo +1 
  textAlign()
  
    
    

  //jogador
  if (keyIsDown(RIGHT_ARROW)) {
    x = x + 6
  }

  if (keyIsDown(LEFT_ARROW)) {
    x = x - 6
  }

  if (keyIsDown(UP_ARROW)) {
    y = y - 6
  }

  if (keyIsDown(DOWN_ARROW)) {
    y = y + 6
  }

  image(galinha,x-15, y, 50, 50)
  if (dist(x+15, y, xq, yq) < 45) {
    x = 180
    y = 350
    vidas = vidas - 1
  }

  //objeto
  ellipse(xq, yq, 50, 50)
  image(cesta,xq-45,yq-43,90,75)
  xq = xq - 4
  if (xq < 0) {
    xq = 600
  }
  //disparo
  
    
  if (keyIsDown(SHIFT) && estadoDisparo == false) {
    yd = y
    xd = x
    estadoDisparo = true
  }

  if (estadoDisparo) {
    ellipse(xd, yd, 6, 6)
     image(ovo,xd-24,yd-30,50,50)
    yd = yd - 10
  }
  if (yd < 0) {
    estadoDisparo = false
  }

  if (dist(xd, yd, xq, yq) < 34) {
    estadoDisparo = false
    xd = x
    yd = y
    pontos = pontos + 100
  }

  //objetos aleatórios
  for (i = 0; i < qtdElementos; i++) {
    vetorY[i] = vetorY[i] + vetorV[i]
    image(garfo,vetorX[i], vetorY[i], vetorD[i], vetorD[i])
    if(dificuldade == 1){
      vetorY[i] = vetorY[i] + vetorV[i]
    if (vetorY[i] > 500) {
      vetorY[i] = random(-400, -100)
      vetorX[i] = random(0,500)
    }
  }
   if(dificuldade >=1){
      vetorY[i] = vetorY[i] + (dificuldade*0.1)*vetorV[i]
      if(vetorY[i]>500)
        vetorY[i] = random(-500,0)
    }
  }
  }
  //niveis
  if (pontos > barreiradepontos) {
    dificuldade++
    barreiradepontos = barreiradepontos + 1000
    //n to conseguindo fzr o objt
    //ellipse(xd1,yd1,30,30)
    //xd1=xd1-10
  
  } else if (pontos > 5000) {
    tela = 3
  } else if (vidas < 1) {
    tela = 4
  }


  if (tela == 3) {
    somtela3.play()
    background(pintinhos);
    textSize(40);
    fill(0, 0, 0)
    text('Seus filhotes estão bem!', 50, 250);
    text('segundos', 160, 400);
    text('Demorasse em...',50,450)
    textAlign()
    text(parseInt(tempo/30),100,400)
 //30 e o frame rate
  }

  if (tela == 4) {
    somtela4.play()
    background(omelete);
    textSize(30);
    fill(0, 0, 0);
    text('Não', 215, 100)
    text('foi', 215, 150)
    text('dessa', 215, 200)
    text('vez', 215, 250)
    //text('zero!!', 215, 300)
  }
  //colisões com objetos

  for(i=0; i<qtdElementos; i++){
    if(dist(x, y, vetorX[i], vetorY[i])<vetorD[i]/2+20){
      vetorX[i] = random(0,500)
      vetorY[i] = random(-500,0)
      vidas = vidas - 1
    }
  }
}

//tiro ao alvo
//acertar o de tras ganha
//acertar o da frente perde
//passa de nivel com 100
//perde vida se errar 3
//aumentar as defesas por nivel, velocidade e numero




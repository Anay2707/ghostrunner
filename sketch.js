var ghost,ghostI,tower;
var gameState = "PLAY";
var doors,doorI,climber,climberI;
var invisibleC,invisibleGroup,doorG,climberG;
var spookyS;

function preload () {
  ghostI = loadAnimation("ghost-jumping.png","ghost-standing.png");   
  towerI = loadImage("tower.png");
  doorI = loadImage("door.png");
  climberI = loadImage("climber.png");
  spookyS = loadSound("spooky.wav");
}

function setup (){
  createCanvas(600,600); 
  
  tower = createSprite (300,300,600,600);
  tower.addImage(towerI);
  tower.velocityY = 1;
  
  ghost = createSprite (300,200,50,50);
  ghost.addAnimation("running",ghostI );
  ghost.scale = 0.4;
  
  invisibleGroup = new Group();
  doorG = new Group();
  climberG = new Group();
  
  spookyS.loop();
  
}
function draw (){
  background (255);
  
  if (gameState == "PLAY") {
    spawnDoors();
    if (keyDown("space") ){
      ghost.velocityY = -12;
    }
    
    if (keyDown("left") ){
      ghost.x -= 5;
    }
    
    if (keyDown("right") ){
      ghost.x += 5;
    }
      ghost.velocityY = ghost.velocityY +  0.8;
    
    if(tower.y > 400){
      tower.y = 300;
    }
    
    if (ghost.isTouching(invisibleGroup) || ghost.y >= 600){
      gameState = "END";
      doorG.destroyEach();
      climberG.destroyEach();
    }
   }
  ghost.collide(climberG);
  drawSprites();
  
  if (gameState === "END"){
    background(0);
    fill("orange");
    textSize(30);
    text("Game Over",230,300);
  }
}

function spawnDoors(){
  
  if(frameCount%200 === 0){
    doors = createSprite(200,300,50,50);
    doors.addImage(doorI);
    doors.x = Math.round(random(200,400));
    doors.velocityY = 1;
    doors.lifetime = 500;

    doorG.add(doors);

    climber = createSprite(200,370,50,50);
    climber.addImage(climberI);
    climber.x = doors.x;
    climber.velocityY = 1;
    climber.lifetime = 500;
    climberG.add(climber);

    invisibleC = createSprite(200,400,100,10);
    invisibleC.x = doors.x;
    invisibleC.velocityY  = 1;
    invisibleC.lifetime = 500;
    invisibleC.visible = false;
    invisibleGroup.add(invisibleC);  
  
    ghost.depth = doors.depth;
    ghost.depth += 1;  
    
    
  }
  
  
  
}





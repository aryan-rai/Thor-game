//craete variables here
var thor, thor_still, thor_run, thor_attack;
var bg;
var light, lightImaage;
var enemy, enemyImage, enemyGroup;
var hammer, hammerImage, hammerGroup;
var score;
var die, thunder;
var gameover, gameoverImage;
var gameOverSound;

function preload() {
  thor_still = loadAnimation("thor.png");
  thor_run = loadAnimation("thor.png","thor1.png");
  thor_attack =loadAnimation("thor2.png","thor3.png","thor4.png","thor5.png", "thor6.png");
  
  bg = loadImage("sprite_0.png");
  
  lightImage = loadAnimation("l1.png","l2.png","l3.png");
  
  enemyImage = loadAnimation("e1.png","e2.png","e3.png");
  
  hammerImage = loadImage("hammer.png");
  
  gameoverImage = loadImage("gameOver.png");
  
  die = loadSound("die.mp3");
  
  thunder = loadSound("thunder.mp3");
  
  gameOverSound = loadSound("gameOver.wav");
  
  
}

function setup() {
  createCanvas(600, 600);
  
  thor = createSprite(300,450);
  thor.addAnimation("thor_still",thor_still);
  thor.addAnimation("thor_run",thor_run);
   thor.addAnimation("thor_attack",thor_attack);
  thor.scale = 0.7
  
  light = createSprite(300,172);
  light.addAnimation("l1",lightImage);
  light.scale = 2
  light.visible = false;
  
  enemyGroup = new Group();
  hammerGroup = new Group();
  
  score = 0;
  
  gameover = createSprite(300,300);
  gameover.addImage("gameover", gameoverImage);
  gameover.visible = false;
  
}

function draw() {
  background(bg);
  
  light.x = thor.x;
  if(keyDown("right")){
     thor.changeAnimation("thor_run",thor_run);
    thor.x = thor.x +5;
  }
  if(keyWentUp("right")){
     thor.changeAnimation("thor_still",thor_still);
  }
  
  if(keyDown("left")){
     thor.changeAnimation("thor_run",thor_run);
    thor.x = thor.x -5;
  }
  if(keyWentUp("left")){
     thor.changeAnimation("thor_still",thor_still);
  }
  
  if(keyDown("a")){
    thunder.play();
     thor.changeAnimation("thor_attack",thor_attack);
    light.visible = true;
    hammerAttack();
  }
  
  if(keyWentUp("a")){
    light.visible = false;
      thor.changeAnimation("thor_still",thor_still);
  }
  spawnEnemy();
  if(hammerGroup.isTouching(enemyGroup)){
    die.play();
    hammerGroup.destroyEach()
    enemyGroup.destroyEach();
    score=score+1;
  }
  
  if(enemyGroup.isTouching(thor)){
    gameOverSound.play();
     gameover.visible = true;
    enemyGroup.destroyEach();
    thor.destroy();
  }
  
  drawSprites();
  textSize(20);
  fill("white")
  text("Enemy killed: "+score, 450, 50);
  
}

function spawnEnemy() {
  //write code here to spawn the clouds
  if (frameCount % 200 === 0){
     enemy=createSprite(600,120,40,10);
    enemy.y = thor.y;
    enemy.addAnimation("e",enemyImage)
    enemy.scale = 0.5;
    enemy.velocityX = -3;
    
     //assign lifetime to the variable
    enemy.lifetime = 200;
    
    //adjust the depth
    enemy.depth = thor.depth;
    thor.depth = thor.depth + 1;
    
    //add each cloud to the group
    enemyGroup.add(enemy);
  }
  
}

function hammerAttack(){
  hammer=createSprite(thor.x, thor.y);
  hammer.addImage("h",hammerImage)
  hammer.velocityX = 3;
  hammer.lifetime = 200;
  hammerGroup.add(hammer);
  hammer.scale = 0.1;
  
}


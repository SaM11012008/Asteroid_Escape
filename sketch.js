var play = 1;
var end = 0;
var gameState = 1;

var rocket, rocketImage;
var bg, bgImage;
var score = 0;
var meteors, meteorImage, meteorGroup;
var gameover, gameoverImage;
var playAgain, playagainImage;
var edges;

function preload() {

  bgImage = loadImage("space.jpg");
  rocketImage = loadImage("rocket.png");
  meteorImage = loadImage("meteors.png");
  gameoverImage = loadImage("gameover.jpg");
  playagainImage = loadImage("unnamed.png");

}

function setup() {

  createCanvas(835,920);

  
  bg = createSprite(550, -100,300,20);
  bg.addImage(bgImage);
  bg.scale = 1;

  rocket = createSprite(350, 500, 20, 20);
  rocket.addImage(rocketImage);
  rocket.scale = 0.2;

 gameover = createSprite(width/2-60,camera.position.y+500,100,100);
 gameover.addImage(gameoverImage);
 gameover.scale = 3.4;

 playAgain = createSprite(width/2-60, camera.position.y+700,100,100);
 playAgain.addImage(playagainImage);
 meteorGroup = new Group();
 bg.velocityY = 3;

}

function draw() {
 
  background("black");

  if (gameState === 1) {

    meteor();
   console.log(bg.y)
   bg.velocityY = 3;
    playAgain.visible = false;
   gameover.visible = false;
    

    rocket.visible = true;
   

    if (frameCount % 20 === 0) {
      score = score + 1;
    }

    if (bg.y > 1000) {
      bg.y = 10;
    }

    if(keyDown(65)) {
      rocket.velocityX = -5;
    }

    if(keyDown(68)) {
      rocket.velocityX = 5;
    }

    if (score === 100) {
      gameState = 2;
    
    }


    if (rocket.isTouching(meteorGroup)) {
      meteorGroup.destroyEach()
      gameState = 0;
    }

    if(rocket.x<50){
     rocket.x=50
    } 
    
    if(rocket.x>810){ 
      rocket.x=810
    } 
    
  }

  if (gameState === 0) {

    bg.velocityY = 0;
    playAgain.visible = true;
    gameover.visible = true;

    rocket.visible = false;
    rocket.velocityX = 0;
    rocket.velocityY = 0;

    if (mousePressedOver(playAgain)) {
  
      reset();
      
    }
    
 
  }

  if(gameState === 2){
    textSize(50);
    fill("orange");
    textSize(50);
    text("YOU WON THE GAME",400,105);
    text("Congratulations",400,200);
    playAgain.visible = true;

    if (mousePressedOver(playAgain)) {
      console.log("click")
      
      reset();
      
    }

  }
  

  drawSprites();

  textSize(30);
  fill("orange");
  text("Score:" + score, 50, rocket.y-400);

}

function meteor() {
  if (frameCount % 30 === 0) {
    meteors = createSprite(50, 200);
    meteors.x = Math.round(random(100, 1000));
    meteors.addImage(meteorImage);
    meteors.scale = 0.2;
    meteors.velocityY = score / 1;
    meteors.lifetime = 100;

    meteorGroup.add(meteors);
  }
}

function reset() {
  console.log("reset")
  meteorGroup.destroyEach();
  gameState = 1;
  score = 0;
  rocket.x = width/2-100;
  rocket.y = height/2;
  rocket.velocityX = 0;
  rocket.velocityY = 0;
  playAgain.visible = false;
  gameover.visible = false;
  
}

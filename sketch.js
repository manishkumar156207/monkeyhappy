var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score, ground
var survivalTime

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  
   FoodGroup= new Group()
  obstacleGroup= new Group()
 
}



function setup() {
  createCanvas(600, 400);
  score=0
  survivalTime=0
  
  ground=createSprite(0,400,670,15);
  
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("monkey_running",monkey_running);
  monkey.scale = 0.1;
  monkey.debug = false;
  monkey.setCollider("circle",0,0,240);
}


function draw() {
  background("white");
  
  if(gameState===PLAY){
  if(keyDown("space")&&monkey.y >= 350){
    monkey.velocityY=-10
  }
  monkey.velocityY = monkey.velocityY + 0.3
  monkey.collide(ground)
  
  ground.velocityX = -7 
 ground.x = ground.width/2;
  
  if(World.frameCount%200===0){
    fruits()
 }
  
  if(World.frameCount%300===0){
    stones()
 }
  
  if(monkey.isTouching(FoodGroup)){
     FoodGroup.destroyEach()
    score=score+1
      }
      if(monkey.isTouching(obstacleGroup)){
     gameState = END;
    }
  }
     else if(gameState===END){
        obstacle.velocityX = 0;
        banana.velocityX = 0;
        monkey.velocityY = 0;
        ground.velocityX = 0;

     }

  
  drawSprites()
  stroke("white")
  textSize(20)
  fill("black") 
  text("Score:"+ score, 400,50);
  
  fill("black")
  var survivalTime=Math.ceil(frameCount/frameRate());
  text("Survival Time: "+ survivalTime,75,50)
  
}

function fruits(){
  banana=createSprite(670,Math.round(random(170,230)),10,10)
  banana.addImage(bananaImage)
  banana.scale=0.1
  banana.velocityX=-3
  FoodGroup.add(banana)
}

function stones(){
  obstacle=createSprite(670,380,10,10)
  obstacle.addImage(obstaceImage)
  obstacle.velocityX=-4
  obstacle.scale=0.2
  obstacleGroup.add(obstacle)
  obstacle.setCollider("circle",0,0,195);
  obstacle.debug = false;
}







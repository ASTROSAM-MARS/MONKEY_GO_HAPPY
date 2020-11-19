var monkeyImage, monkey, monkeySound;
var ground;
var obstacles, obstaclesImage;
var obstaclesGroup;
var survivalTime;
var gameState="play";
var monkeyImage2;
var  banana, bananaImage, bananaGroup;
var score=0;
var replay, replayImage;


function preload(){
  monkeyImage=loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
 obstaclesImage=loadImage("obstacle.png");
  monkeyImage2=loadAnimation("sprite_0.png");
  bananaImage=loadImage("banana.png");
  replayImage=loadImage("replay.png");
  monkeySound=loadSound("monkey.mp3");
}


function setup(){
  createCanvas(600,600);
  ground=createSprite(300,490,1200,10);
  ground.shapeColor=rgb(98,222,16);
  monkey=createSprite(100,450,30,30);
  monkey.addAnimation("monkey",monkeyImage);
  monkey.scale=0.2;
  obstaclesGroup= new Group();
  bananaGroup=new Group();
  replay=createSprite(300,250);
  replay.addImage("replay",replayImage);
  replay.scale=2;
}


function draw(){
  background(rgb(64,99,41));
  monkey.collide(ground);
  textSize(20);
  fill("black");
  text("SURVIVAL TIME: "+survivalTime,220,50);
  text("SCORES: "+Math.round(score/42),220,550);
  if(gameState=="play"){
    replay.visible=false;
    bananas();
    survivalTime=Math.ceil(frameCount/frameRate());
    if(frameCount%100==0){
      monkeySound.play();
    }
     if(keyWentDown("space")&&monkey.y>302){
    monkey.velocityY=-12;
  }
  monkey.velocityY=monkey.velocityY+1;
 Obstacles();
    if(monkey.isTouching(obstaclesGroup)){
      
      gameState="end";
    }
    if(monkey.isTouching(bananaGroup)){
      score++;
 
  }}
  if(gameState=="end"){
   
    survivalTime=0;
    monkey.addAnimation("monkey",monkeyImage2);
    obstaclesGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    monkey.y=420;
    bananaGroup.setVelocityXEach(0);
    replay.visible=true;
    replay.depth=100;
     if(mousePressedOver(replay)){
      reset();
    }
  }
  
  drawSprites();
  
  
}


function Obstacles(){
  if(frameCount%100==0){
  obstacles=createSprite(620,452);
  //obstacles.collide(ground);
  obstacles.addImage("obstacles",obstaclesImage);
  obstacles.velocityX=Math.round(random(-2,-4));
  obstacles.scale=0.2;
  switch(obstacles.velocityX){
    case -1:
      obstacles.lifetime=620;
      break;
      case -2:
      obstacles.lifetime=310;
      break;
      case -3:
      obstacles.lifetime=207;
      break;
      default:
      obstacles.lifetime=155;
      break;
      
  }
    obstaclesGroup.add(obstacles);
  
  }
}

function bananas(){
  if(frameCount%(Math.round(random(50,150)))==0){
  banana=createSprite(609,Math.round(random(242,350)));
  banana.addImage("banana",bananaImage);
  banana.velocityX=-3;
  banana.scale=0.1  ;
  banana.lifetime=203;
    banana.depth=10;
    bananaGroup.add(banana);
  }
  }

function reset(){
monkey.addAnimation("monkey",monkeyImage);
  obstaclesGroup.destroyEach();
  bananaGroup.destroyEach();
  gameState="play";
  frameCount=0;
  score=0;
}
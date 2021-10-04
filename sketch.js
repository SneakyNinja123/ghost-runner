var bg,backgroundImg;
var headstone,headstoneImg, headstones;
var ghostreaper,ghostreaperImg;
var finalghost,finalghostImg;
var pennywise;
var boy,boyImg;
var Boy_step2,Boy_step2Img;
var Boy_step3,Boy_step3Img;
var invisibleGround
var score=0;

//Game States
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
 //backgroundImg = loadAnimation("images/background.jpg","images/background.jpg1" );
 //TODO : ghost reaper.exe
 //TODO : boy.exe
 //TODO : background.exe
 //TODO : tombstone.exe
    backgroundImg = loadImage("images/background.jpg");
    ghostreaperImg = loadImage("images/ghostreaper.png");
    finalghostImg = loadImage("images/finalghost.png");
    boyImg = loadAnimation("images/Boy_step1_m.png","images/Boy_step2_m.png","images/Boy_step3_m.png");
    headstoneImg = loadImage("images/headstone.png");
    //pennywiseImg = loadImage("images/pennywise.jpg");
}

function setup() {
//TODO :put some attibutes of the human and the ghost reaper
//TODO :ghost reaper.scale
//TODO :ghost reaper.height
//TODO :boy.scale
//TODO :boy.height
    createCanvas(windowWidth,windowHeight)
    //createCanvas(800,500)
    bg = createSprite(200,height/2);
   // bg.scale = 2;
    bg.x = width/2;
    bg.addImage(backgroundImg);
    //bg.addAnimation("scarybg",backgroundImg);

    boy = createSprite(width*0.4,height*0.9,20,20);
    //boy = createSprite(200,200,20,20);
    boy.addAnimation("BoyRunning",boyImg);
    boy.scale=0.5;

    ghostreaper = createSprite(width/6,height*0.7,20,20);
    ghostreaper.addImage(ghostreaperImg);
    ghostreaper.scale = 0.9;
    //ghostreaper.addSpeed(0.2,0);

    finalghost = createSprite(width/3,height*0.8,20,20);
    finalghost.addImage(finalghostImg);
    finalghost.scale = 0.3;
    //pennywise = createSprite(windowWidth/8,windowHeight*0.7,5,5);
    //pennywise.addImage(pennywiseImg)

    invisibleGround = createSprite(200,windowHeight,windowHeight,10);
    invisibleGround.visible = false;

    restart();

}

function restart() {
    bg.velocityX = -6;
    ghostreaper.visible = true;
    finalghost.visible = false;
    headstones = new Group();
    score = 0;
    gameState = PLAY;
 
}

function createHeadstone() {
    if (World.frameCount % 100 == 0) {
        headstone = createSprite(width*0.65 + width*0.4*Math.random(),height*0.95);
        headstone.addImage(headstoneImg);
        headstone.scale = 0.06;
        headstone.lifetime = 300;
        headstone.velocityX = -8-score*0.2;
        headstones.add(headstone);
        //headstone.debug = true;
        headstone.setCollider("circle", 0,-20,400);
        
    }
}

function draw() {
//TODO :put the things that you want to keep painting over and over again
//TODO :ghost reaper animation when chasing the human
//TODO :boy running animation when being chased by the ghost reaper
//TODO :boy animation when caught by  the ghost reaper
//TODO :ghost reaper animation when it catches the human

    boy.collide(invisibleGround);


    if(gameState==PLAY) { 
        
        //code to reset the background
        if(bg.x < 0 ){
            //bg.x = width/2;
            bg.x = width/2;
        }

        createHeadstone();
  
        
        if(keyDown("space") && boy.y >= height-150) {
            boy.velocityY = -12;
        }
        
        if(World.frameCount % 40 == 0) {
            score = score + 1;
        }

        boy.velocityY = boy.velocityY + 0.7

        if(headstones.isTouching(boy)) {
            gameState = END;
        }

    } else if (gameState==END) {
        bg.velocityX = 0;
        boy.velocityY = 0;
        headstones.setVelocityXEach(0);
        headstones.setLifetimeEach(-1);
        ghostreaper.visible = false;
        finalghost.visible = true;
        finalghost.rotation = 45;
      
        if(keyDown("UP_ARROW") ) {
            headstones.destroyEach();
            restart();
        }
        

    }
  
    drawSprites();

    textSize(20);
    fill("white");
    text("Score: " + score, 50, 50);

    if(gameState == END) {
        textSize(40);
        fill("red");
        text("GAME OVER", width*0.4, height*0.4);
        textSize(20);
        fill("orange");
        text("Please press Up Arrow key to play again", width*0.4-40, height*0.4+20);
       
    }
}   
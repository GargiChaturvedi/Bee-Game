var hello, helloImage, ground, groundImage, flower, flowerImage;
var monsterGroup, flowerGroup;
var rand, edges;
var monster, monster1, monster2, monster3;
var score = 0;
//play and end
var gameState = "play";
var honey, honey1, honey2, honey3, honey4, honeyGroup;

function preload() {
  helloImage = loadImage("bee-png-clipart-5.png");
  groundImage = loadImage("ground2.png");
  flowerImage = loadImage("Flower (1).png");
  monster1 = loadImage("monster.png");
  monster2 = loadImage("monster2.png");
  monster3 = loadImage("monster3.png");
  honey1 = loadImage("Honey1.png");
  honey2 = loadImage("Honey2.png");
  honey3 = loadImage("Honey3.png");
  honey4 = loadImage("Honey4 (1).png");
}

function setup() {
  createCanvas(400, 400);

  ground = createSprite(200, 200);
  ground.addImage("ground", groundImage);
  ground.scale = 0.8;

  hello = createSprite(350, 200, 30, 30);
  hello.addImage("bee_flying", helloImage);
  hello.scale = 0.1;
  hello.debug = true;

  edges = createEdgeSprites();
  
  monsterGroup = new Group();
  flowerGroup = new Group();
  honeyGroup = new Group();
}

function draw() {
  background("white");
  
  if(gameState === "play") {
    ground.velocityX = 10;
    if (hello.y < 200) {
      hello.velocityY = hello.velocityY + 0.5;
    }

    if (hello.y > 200) {
      hello.velocityY = hello.velocityY - 0.5;
    }

    if (ground.x > 400) {
      ground.x = 200;
    }
    flowerMaker();
    monsterMaker();
    honeyMaker();
    
    if(honeyGroup.isTouching(hello)) {
      score += 100;
    }
    
    score += Math.round(getFrameRate()/30);
    
    if(monsterGroup.isTouching(hello)) {
      gameState = "end";
    }
  }
  
  if (keyDown("up") && gameState === "play") {
    hello.velocityY = -5;
  }
  if (keyDown("down") && gameState === "play") {
    hello.velocityY = 5;
  }
  
  if(gameState === "end") {
    ground.setVelocity(0, 0);
    monsterGroup.setVelocityXEach(0);
    hello.setVelocity(0, 0);
    flowerGroup.destroyEach();
    monsterGroup.setLifetimeEach(-1);
  }
  
  if(keyDown("r") && gameState === "end") {
    hello.x = 350;
    hello.y = 200;
    score = 0;
    monsterGroup.destroyEach();
    gameState = "play";
  }
  hello.bounceOff(edges[2]);
  hello.bounceOff(edges[3]);

  drawSprites();
  
  fill("red");
  textSize(20);
  text("Score: " + score, 250, 20);
  
  if(gameState === "end") {
    fill("green");
    textSize(20);
    text("Press 'r' to restart!", 125, 70);
  }
  
  console.log(score);
}

function flowerMaker() {
  if (frameCount % 10 === 0) {
    rand = Math.round(random(0, 400));
    flower = createSprite(200, 20);
    flower.x = rand;
    flower.addImage("flower", flowerImage);
    flower.scale = 0.1;
    flower.setVelocity(0, 10);
    hello.depth = flower.depth;
    hello.depth += 1;
    flower.lifetime = 40;
    flowerGroup.add(flower);
  }
}

function monsterMaker() {
  if (frameCount % 120 === 0) {
    var rand2 = Math.round(random(30, 400));
    var randSwitch = Math.round(random(1, 3));
    monster = createSprite(0, rand2);
    monster.setVelocity(5, 0);

    switch (randSwitch) {
      case 1:
        monster.addImage("monster1", monster1);
        break;
      case 2:
        monster.addImage("monster2", monster2);
        break;
      case 3:
        monster.addImage("monster3", monster3);
        break;
      default:
        break;
    }
    monster.scale = 0.5;
    monster.lifetime = 90;
    monster.depth = hello.depth;
    monster.depth += 1;
    monsterGroup.add(monster);
    
    monster.debug = true;
    monster.setCollider("rectangle", 0, 0, 50, 80, 0);
  }
}

function honeyMaker() {
  if(frameCount % 200 === 0) {
    honey = createSprite(0, 300);
    honey.setVelocity(7, 0);
    var randSwitch2 = Math.round(random(1, 4));
    
    switch(randSwitch2) {
      case 1: honey.addImage("honey1", honey1);
        break;
        case 2: honey.addImage("honey2", honey2);
        break;
        case 3: honey.addImage("honey3", honey3);
        break;
        case 4: honey.addImage("honey4", honey4);
        break;
        default:
        break;
    }
    
    honey.lifetime = 60;
    honey.scale = 0.2;
    honeyGroup.add(honey);
  }
}
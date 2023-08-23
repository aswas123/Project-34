const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world, backgroundImg;
var canvas, angle, cannon_ground, ground, cannon,square_box,box2,box3,box4,box5,box_ground;
var wall1,wall2,ground3
var balls = [];
var score = 0;


function preload() {
  backgroundImg = loadImage("./assets/backgroundImg.png.jpg");
  cannon_groundImage = loadImage("./assets/archer_ground.png");
  square_boxImg = loadImage("./assets/box_1.png");
 
}

function setup() {
  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
   angleMode(DEGREES)
  angle = 15


  ground = Bodies.rectangle(0, height - 1, width * 2, 1, { isStatic: true });
  World.add(world, ground);

  box_ground = Bodies.rectangle(650,250,100,10, { isStatic: true });
  World.add(world,box_ground );

  cannon_ground = Bodies.rectangle(80,400, 100,10, { isStatic: true });
  World.add(world, cannon_ground);

  square_box = Bodies.rectangle(625,209,25,25,{isStatic: false});
  World.add(world,square_box)

  box2 = Bodies.rectangle(650,209,25,25,{isStatic: false});
  World.add(world,box2)

  box3 = Bodies.rectangle(650,150,25,25,{isStatic: false});
  World.add(world,box3)

  box4 = Bodies.rectangle(650,110,25,25,{isStatic: false});
  World.add(world,box4)

  box5 = Bodies.rectangle(675,209,25,25,{isStatic: false});
  World.add(world,box5)

  wall1 = Bodies.rectangle(1025,450,10,100,{isStatic : true});
  World.add(world,wall1)

  wall2 = Bodies.rectangle(1175,450,10,100,{isStatic : true});
  World.add(world,wall2)

 ground3 = Bodies.rectangle(1100,500,100,10,{isStatic : true});
  World.add(world,ground3)


  cannon = new Cannon(100, 310, 130, 100, angle);

}

function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);

  Engine.update(engine);

  push();
  translate(ground.position.x, ground.position.y);
  fill("brown");
  rectMode(CENTER);
  rect(0, 0,10,width*2,10);
  pop();

  push();
  translate(box_ground.position.x, box_ground.position.y);
  fill("brown");
  rectMode(CENTER);
  rect(0, 0, 100, 1);
  pop();

  push();
  translate(wall1.position.x, wall1.position.y);
  fill("brown");
  rectMode(CENTER);
  rect(0, 0,1,100);
  pop();

  push();
  translate(wall2.position.x, wall2.position.y);
  fill("brown");
  rectMode(CENTER);
  rect(0, 0,1,100);
  pop();

  push();
  translate(ground3.position.x, ground3.position.y);
  fill("brown");
  rectMode(CENTER);
  rect(0, 0,150,1);
  pop();


  push();
  translate(cannon_ground.position.x, cannon_ground.position.y);
  rotate(cannon_ground.angle);
  imageMode(CENTER);
  image(cannon_groundImage, 0, 0, 150, 50);
  pop();

  push()
  translate(square_box.position.x,square_box.position.y)
  imageMode(CENTER)
  image(square_boxImg,0,0,25,25);

  pop()
  push()
  translate(box2.position.x,box2.position.y)
  imageMode(CENTER)
  image(square_boxImg,0,0,25,25);
  pop()

  push()
  translate(box3.position.x,box3.position.y)
  imageMode(CENTER)
  image(square_boxImg,0,0,25,25);
  pop()

  push()
  translate(box4.position.x,box4.position.y)
  imageMode(CENTER)
  image(square_boxImg,0,0,25,25);
  pop()

  push()
  translate(box5.position.x,box5.position.y)
  imageMode(CENTER)
  image(square_boxImg,0,0,25,25);
  pop()



  
  

  for (var i = 0; i < balls.length; i++) {
    showCannonBalls(balls[i], i);
  
  }

  cannon.display();
  
  var collision = Matter.SAT.collides(ground,square_box)
  if(collision.collided ){
    gameOver();
  
  }

}



function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    var cannonBall = new CannonBall(cannon.x, cannon.y);
    cannonBall.trajectory = [];
    Matter.Body.setAngle(cannonBall.body, cannon.angle);
    balls.push(cannonBall);
  }
}

function showCannonBalls(ball, index) {
  if (ball) {
    ball.display();
    ball.animate();
    if (ball.body.position.x >= width || ball.body.position.y >= height - 50) {
      if (!ball.isSink|| ball.body.collided(ground3)) {
        ball.remove(index);
      }
    }
  }
}




function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    balls[balls.length - 1].shoot();
  }
}
function gameOver() {
  fill("#FFFF");
  textAlign("center");
  textSize(30);
  text("Game Over ");
}
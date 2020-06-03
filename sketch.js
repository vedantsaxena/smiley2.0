const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1,pig3;
var backgroundImg,platform,bg;
var bird, slingshot;

var gameState = "onSling";
var score = 0;

function preload() {
    backgroundImg = loadImage("sprites/school.jpg");
    getTime();
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);
    platform = new Ground(810, 320, 300, 10);

    box1 = new Box(700,285,70,70);
    box2 = new Box(920,285,70,70);
    frnd1 = new Frnd(810,295);
    log1 = new Log(810,240,300, PI/2);

    box3 = new Box(700,195,70,70);
    box4 = new Box(920,195,70,70);
    frnd2 = new Frnd(810,205);

    log3 =  new Log(810,185,300, PI/2);

    box5 = new Box(810,140,70,70);
    log4 = new Log(760,100,150, PI/7);
    log5 = new Log(870,100,150, -PI/7);

    me = new Me(200,130);

    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(me.body,{x:200, y:130});
}

function draw(){
    if(backgroundImg)
            background(backgroundImg);
        
            noStroke();
            textSize(35)
           fill("white")
            text("Score :  " + score, width-300, 50)
    Engine.update(engine);
    //strokeWeight(4);
    box1.display();
    box2.display();
    ground.display();
    frnd1.display();
    frnd1.score();
    log1.display();

    box3.display();
    box4.display();
    frnd2.display();
    frnd2.score();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    me.display();
    platform.display();
    //log6.display();
    slingshot.display();  
   
}
function mouseDragged(){
    //if (gameState!=="launched"){
        Matter.Body.setPosition(me.body, {x: mouseX , y: mouseY});
       // console.log(7)
    
}


function mouseReleased(){
    slingshot.fly();
    gameState = "launched";
}

function keyPressed(){
    if(keyCode === 32){
        me.trajectory = [];
        slingshot.attach(me.body);
        Matter.Body.setPosition(me.body,{x:200, y:130});
    }
}
 async function getTime(){
    var t = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var tjson = await t.json();
    console.log(tjson);
    var dt = tjson.datetime;
    console.log(dt);
    var r = dt.slice(11,13);
    console.log(r);
    if (r>=06&&r<=18){
       bg = "sprites/school.jpg";
    }else{
        bg = "sprites/home.jpg";
    }
    backgroundImg = loadImage(bg);
}

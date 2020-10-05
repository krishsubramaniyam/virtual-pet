var dogimg1, dogimg2,milkimg;
var database;
var foodS, foodStock;
var dog;
var canvas;

function preload()
{
dogimg1 = loadImage("images/dogImg.png");
dogimg2 = loadImage("images/dogImg1.png");
milkimg = loadImage("images/Milk.png");

}

function setup() {
database = firebase.database();

canvas = createCanvas(500, 500);

dog = createSprite(250,250);
dog.addImage(dogimg1);
dog.scale = 0.2;

foodStock=database.ref('food');
foodStock.on("value",readStock);
  
}
function draw() {  

  background("green");

if(foodS!==undefined){
  if(keyWentDown(UP_ARROW)){
    dog.addImage(dogimg2);
    writeStock(foodS);
    clear();
    }
}



if(keyWentUp(UP_ARROW)){
dog.addImage(dogimg1);
clear();
}
  drawSprites();

  textSize(20);
  text("PRESS UP ARROW TO PLEASE FEED ME",80,50)
  text("REMANING FOOD STOCK:"+foodS,100,75);
}

function readStock(data){
foodS = data.val();

}

function writeStock(x){
console.log(x);
if(x<=0){
x=0;
}else{
  x=x-1;
}

database.ref('/').update({
food:x
 })
}




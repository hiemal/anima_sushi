// ------------------------------------------ header --------------------------------------------------------

var Sushi = function(name, x, y, w, h){
  this.name = name;
  this.x = x; // centroid
  this.y = y; // centroid
  this.w = w; // width
  this.h = h; // height
  this.over = false;
  this.inAnima = false;
  this.const_x = x;
  this.const_y = y;
  this.const_w = w;
  this.const_h = h;
  this.cooked = false;
  this.toggle = false; // for animation
}

var Shop = function(name, x, y, w, h){
  this.name = name;
  this.x = x; // centroid
  this.y = y; // centroid
  this.w = w; // width
  this.h = h; // height
  this.left = this.x;
  this.right = this.x+this.w;
  this.bottom = this.y+this.h;
  this.up = this.y;
}

function preload(){
  var sushi_names = ["unagi","tamago","kani","saba","hamachi","ikura","tako","ebi","uni","tai","aji","maguro","hotate","salmon","awabi"];

  img = {};
  fish = {};
  sound = {};

  for (i=0;i<sushi_names.length;i++){
    sushi_name = sushi_names[i];
    img[sushi_name] = loadImage('assets/'+sushi_name+'-01.png');
    fish[sushi_name] = loadImage('assets/'+sushi_name+' fish-01.png');
    sound[sushi_name] = loadSound('assets/'+sushi_name+'.mov');
  }

  img['sushi_shop'] = loadImage('assets/sushi shop-01.png');
}


Sushi.prototype.show = function(){
  
  if (!this.cooked){
    this.inAnima = false;
    this.counter = 0;
    image(fish[this.name], this.x+random(1), this.y+random(1), this.w, this.h);
  }else{
    this.inAnima = true;
    // animation 
    var speed = 10; // smaller, the faster
    if (this.counter<speed){
      this.x = this.last_x - (this.last_x-this.const_x)/speed*this.counter;
      this.y = this.last_y - (this.last_y-this.const_y)/speed*this.counter;
      image(img[this.name], this.x, this.y, this.w, this.h);
      this.counter = this.counter + 1;
    }
    else {
      image(img[this.name],this.const_x+random(1), this.const_y+random(1), this.w, this.h);
      this.inAnima = false;
    }
  }  
}

Shop.prototype.show = function(){
  image(img['sushi_shop'], this.x, this.y, this.w, this.h);
  if (mouseX>this.left && mouseX<this.right && mouseY<this.bottom && mouseY>this.up){
    this.over = true;
  }else {
    this.over = false;
  }
}

Sushi.prototype.sing = function(){
  sound[this.name].play();
}

Sushi.prototype.reset = function(){
  if (!this.toggle){
    this.last_x = this.x;
    this.last_y = this.y;
    this.toggle = true;
  }
  this.cooked = true;
}

Sushi.prototype.update = function(){
  
  this.left = this.x;
  this.right = this.x+this.w;
  this.bottom = this.y+this.h;
  this.up = this.y;
  
  if (mouseX>this.left && mouseX<this.right && mouseY<this.bottom && mouseY>this.up){
    this.over = true;
  }else {
    this.over = false;
  }
  
  if (this.move){
    if (abs(mouseX - lastMouseX)>1 && abs(mouseY - lastMouseY)>1){
      this.x = mouseX-this.w/2;
      this.y = mouseY-this.h/2;
    }
  }
  
}

// ----------------------------------------------------- program -------------------------------------
  
var sushi = [];
var unagi = new Sushi("unagi", 90, 100, 200, 148);
var tamago = new Sushi("tamago", 280, 100, 200, 148);
var kani= new Sushi("kani", 500, 100, 200, 148);
var saba = new Sushi("saba", 700,130, 200, 148);
var hamachi = new Sushi("hamachi", 900, 130, 200, 148);
var ikura = new Sushi("ikura", 100, 250, 200, 148);
var tako = new Sushi("tako", 300,250,200,148);
var ebi = new Sushi("ebi", 500,250,200,148);
var uni = new Sushi("uni", 700,250,200,148);
var tai = new Sushi("tai", 900,250,200,148);
var aji = new Sushi("aji", 100,400,200,148);
var maguro = new Sushi("maguro", 300,400,200,148);
var hotate = new Sushi("hotate", 500,400,200,148);
var salmon = new Sushi("salmon", 700,400,200,148);
var awabi = new Sushi("awabi", 900,400,200,148);

sushi.push(unagi);
sushi.push(tamago);
sushi.push(kani);
sushi.push(saba);
sushi.push(hamachi);
sushi.push(ikura);
sushi.push(tako);
sushi.push(ebi);
sushi.push(uni);
sushi.push(tai);
sushi.push(aji);
sushi.push(maguro);
sushi.push(hotate);
sushi.push(salmon)
sushi.push(awabi);

var shop = new Shop("shop", 500,600,500,300);

var lastMouseX;
var lastMouseY;
var resetMouse = false;

function setup() {
  createCanvas(1920, 1080);
}

function draw() {
  // background
  fill(238,137,126);
  rect(0, 0, width, height);
  
  shop.show();

  for(i=0;i<sushi.length;i++){
    sushi[i].show();
    sushi[i].update();
  }
}

function mousePressed() {
  if (!resetMouse){
    lastMouseX = mouseX;
    lastMouseY = mouseY;
    resetMouse = true;
  }

  for(i=0;i<sushi.length;i++){
    if (sushi[i].over) {
      sushi[i].move = true;
      break;
    }
  }
}

function mouseClicked() {
  for(i=0;i<sushi.length;i++){
    if (sushi[i].over) {
      sushi[i].sing();
    }
  }
}



function mouseReleased() {
  resetMouse = false;
  for(i=0;i<sushi.length;i++){
    if (sushi[i].move){
      sushi[i].move = false;
      if (shop.over){
        sushi[i].reset();
        break;
      }
    }
  }
}

let particle=[];
let song;
const num_particle=20;
let leftship;
let rightship;
let rightshipimage;
let leftshipimage;
let leftscore;
let rightscore;
function preload(){
 leftshipimage=loadImage("spaceship.png");
  rightshipimage=loadImage("spaceship.png");
  song=loadSound("gamesong.mp3");
}
function setup() {
  createCanvas(400, 400);
  for(let i=0;i<num_particle;i++)
    particle.push(new Particle());
  leftship=new ship(leftshipimage,0.33*width);
  rightship=new ship(rightshipimage,0.66*width);
  leftscore=new score(0.33*width-40);
  rightscore=new score(0.66*width+40);
  song.loop();
}

function draw() {
  background(0);
  for(let i=0;i<num_particle;i++)
  {
   particle[i].update();
    particle[i].display();
    if(particle[i].isparticlehitship(leftship))
      leftship.reset();
    else if(particle[i].isparticlehitship(rightship))
      rightship.reset();
  }
  leftship.display();
  rightship.display();
  leftship.update();
  rightship.update();
  if(leftship.score>=10)
  {
   console.log('gameover'); 
   console.log('leftship is win');
   leftship.score=0;
    rightship.score=0;
  }
  if(rightship.score>=10)
  {
   console.log('gameover'); 
   console.log('rightship is win');
   leftship.score=0;
    rightship.score=0;
  }
  leftscore.display(leftship.score);
  rightscore.display(rightship.score);
}
function keyPressed(){
 if(keyCode==UP_ARROW)
 {
   rightship.isdown=false;
  rightship.isup=true; 
 }
  else if(keyCode==DOWN_ARROW)
  {
    rightship.isup=false;
   rightship.isdown=true; 
  }
   if(keyCode==87)
 {
   leftship.isdown=false;
  leftship.isup=true; 
 }
  else if(keyCode==83)
  {
    leftship.isup=false;
   leftship.isdown=true; 
  }
}
function keyReleased(){
  if(keyCode==UP_ARROW)
 {
  rightship.isup=false; 
 }
  else if(keyCode==DOWN_ARROW)
  {
   rightship.isdown=false; 
  }
   if(keyCode==87)
 {
  leftship.isup=false; 
 }
  else if(keyCode==83)
  {
   leftship.isdown=false; 
  }
}
class score{
 constructor(x){
  this.x=x;
   this.y=20;
 }
  display(score){
    fill(255);
    textAlign(CENTER);
    textSize(30);
    text(score,this.x,this.y);
  }
}
class ship{
 constructor(image,x){
  this.image=image;
   this.x=x;
   this.isup=false;
   this.isdown=false;
   this.score=0;
   this.r=10;
   this.reset();
 }
  reset(){
    this.y=height-20;
  }
  update(){
    if(this.y<-this.r)
    {
      this.score++;
      this.reset();
    }
    if(this.isup&&this.y>=-this.r)
    {
     this.up(); 
    }
    else if(this.isdown&&this.y<=height-20)
    {
     this.down(); 
    }
  }
  up(){
   this.y--; 
  }
  down(){
     this.y++; 
  }
  display(){
    imageMode(CENTER);
   image(this.image,this.x,this.y,this.r*2,this.r*2); 
  }
}
class Particle{
 constructor(){
  this.r=5;
   this.reset();
 }
  reset(){
   this.y=random(50,height-50);
    this.leftspawn=random(-2,1);
    if(this.leftspawn<0){
      this.x=random(-width,0);
      this.leftmove=false;
    }
    else
    {
      this.x=random(width,2*width);
      this.leftmove=true;
    }
  }
  isparticlehitship(ship){
    if(dist(this.x,this.y,ship.x,ship.y)<this.r+ship.r){
      return true;
    }
    return false;
  }
  update(){
   if(this.x<-this.r||this.x>this.r+width)
     this.reset();
    if(this.leftmove==true)
      this.x--;
    else
      this.x++;
  }
  display(){
   fill(255,0,100);
    ellipse(this.x,this.y,this.r*2,this.r*2);
  }
}
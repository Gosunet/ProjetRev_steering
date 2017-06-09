
function Mover(nom,forme,masse,position){
  this.id = nom ; 
  this.forme = forme ;
  this.masse = masse ; 
  this.position = position ; 
  this.velocite = vec3Creer() ; 
  this.acceleration = vec3Creer() ; 
}

Mover.prototype.actualiser = function(dt){
  vec3Accumuler(this.position, dt, this.velocite) ; 
  vec3Accumuler(this.velocite, dt, this.acceleration) ;
  vec3Set(this.acceleration,0.0,0.0,0.0) ; 
  this.forme.setAttribute("position",this.position) ; 
}


Mover.prototype.appliquerForce = function(f){
  vec3Accumuler(this.acceleration,1.0/this.masse,f) ; 
}

Mover.prototype.check_collisions = function(data){
  var p = this.position ; 
  if (p.x > data.xMax || p.x < data.xMin) this.velocite.x = - this.velocite.x ; else
  if (p.y > data.yMax || p.y < data.yMin) this.velocite.y = - this.velocite.y ; else
  if (p.z > data.zMax || p.z < data.zMin) this.velocite.z = - this.velocite.z ;
}


function nom2forme(nom){
  return document.getElementById(nom) ; 
}



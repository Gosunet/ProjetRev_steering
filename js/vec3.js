

function vec3Creer(){return {x:0.0, y:0.0, z:0.0};}

function vec3Alea(u,k){
  vec3Set(u, 0.5-Math.random(), 0.5-Math.random(), 0.5-Math.random()) ;  
  vec3Normaliser(u) ; 
  vec3Scale(u,k) ; 
}

function vec3Set(u,x,y,z){		
	u.x = x ;
	u.y = y ;
	u.z = z ; 
}

function vec3Copier(u,v){
	v.x = u.x ; 
	v.y = u.y ; 
	v.z = u.z ; 
}

function vec3Vers(w,a,b){
	w.x = b.x - a.x ;
	w.y = b.y - a.y ; 
	w.z = b.z - a.z ;
}

function vec3Negate(u){
  u.x = -u.x ; 
  u.y = -u.y ; 
  u.z = -u.z ; 
}

function vec3Moins(w,u,v){
	w.x = u.x - v.x ;
	w.y = u.y - v.y ; 
	w.z = u.z - v.z ;
} 

function vec3Scale(u,k){
	u.x = u.x*k ; 
	u.y = u.y*k ;
	u.z = u.z*k ;
}

function vec3Accumuler(u,k,v){
	u.x += k*v.x ; 
	u.y += k*v.y ; 
	u.z += k*v.z ; 
} 

function vec3Norme(u){
	return Math.sqrt(u.x*u.x + u.y*u.y + u.z*u.z) ; 
}

function vec3Distance(p0,p1){
	return Math.sqrt((p0.x-p1.x)*(p0.x-p1.x) +  (p0.y-p1.y)*(p0.y-p1.y) + (p0.z-p1.z)*(p0.z-p1.z) ) ; 
}

function vec3Normaliser(u){
	var l = vec3Norme(u) ; 
	if(l>0.00001)
		vec3Scale(u,1.0/l) ;
}

 
		

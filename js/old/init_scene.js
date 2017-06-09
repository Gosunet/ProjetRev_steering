document.addEventListener("DOMContentLoaded",init,false) ; 

var scene = document.querySelector('a-scene');
var acteurs = {} ;  

function init(){
	creer_boiseries();
	creer_fenetre(1, "-3 0 -5.77");
	creer_fenetre(2, "-1.7125 0 -5.77");
	creer_fenetre(3, "0.575 0 -5.77");
	creer_fenetre(4, "1.8625 0 -5.77");
}

function creer_fenetre(num, position){
	var scene = document.querySelector('a-scene');
	var entity = document.createElement('a-entity');

	entity.setAttribute("id", "fenetre_"+num.toString());
	entity.setAttribute("position", position);

	var bord_gauche = document.createElement('a-box');
	bord_gauche.setAttribute("id", "bord_gauche_"+num.toString());
	bord_gauche.setAttribute("width", "0.15");
	bord_gauche.setAttribute("height", "3");
	bord_gauche.setAttribute("depth", "0.1");
	bord_gauche.setAttribute("position", "0 1.5 0");	bord_gauche.setAttribute("src", "textures/wood.jpg");
	entity.appendChild(bord_gauche);

	var bord_droite = document.createElement('a-box');
	bord_droite.setAttribute("id", "bord_droite_"+num.toString());
	bord_droite.setAttribute("width", "0.15");
	bord_droite.setAttribute("height", "3");
	bord_droite.setAttribute("depth", "0.1");
	bord_droite.setAttribute("position", "1.15 1.5 0");
	bord_droite.setAttribute("src", "textures/wood.jpg");
	entity.appendChild(bord_droite);

	var bord_bas = document.createElement('a-box');
	bord_bas.setAttribute("id", "bord_bas_"+num.toString());
	bord_bas.setAttribute("width", "1");
	bord_bas.setAttribute("height", "0.15");
	bord_bas.setAttribute("depth", "0.1");
	bord_bas.setAttribute("position", "0.575 0.075 0");
	bord_bas.setAttribute("src", "textures/wood.jpg");
	entity.appendChild(bord_bas);

	var bord_haut = document.createElement('a-box');
	bord_haut.setAttribute("id", "bord_haut_"+num.toString());
	bord_haut.setAttribute("width", "1");
	bord_haut.setAttribute("height", "0.15");
	bord_haut.setAttribute("depth", "0.1");
	bord_haut.setAttribute("position", "0.575 2.925 0");
	bord_haut.setAttribute("src", "textures/wood.jpg");
	entity.appendChild(bord_haut);

	var vitre = document.createElement("a-box");
	vitre.setAttribute("id", "vitre_"+num.toString());
	vitre.setAttribute("width", "1");
	vitre.setAttribute("height", "2.7");
	vitre.setAttribute("depth", "0.06");
	vitre.setAttribute("position", "0.575 1.5 0");
	vitre.setAttribute("metalness", "0.0");
	vitre.setAttribute("transparent", "true");
	vitre.setAttribute("opacity", "0.5");
	entity.appendChild(vitre);

	//Séparations de la vitre
	var sc = document.createElement('a-box');
	sc.setAttribute("id", "sc_"+num.toString());
	sc.setAttribute("width", "0.05");
	sc.setAttribute("height", "2.7");
	sc.setAttribute("depth", "0.08");
	sc.setAttribute("position", "0.575 1.5 0");
	sc.setAttribute("src", "textures/wood.jpg");
	entity.appendChild(sc);

	for(var i=0; i<5; i++){
		var s = document.createElement('a-box');
		s.setAttribute("id", "s_"+i.toString()+"_"+num.toString());
		s.setAttribute("width", "1");
		s.setAttribute("height", "0.05");
		s.setAttribute("depth", "0.08");
		var pos = 0.5+0.5*i;
		s.setAttribute("position", "0.575 "+pos.toString()+" 0");
		s.setAttribute("src", "textures/wood.jpg");
		entity.appendChild(s);
	}

	scene.appendChild(entity);

}



function creer_boiseries(){
	var scene = document.querySelector('a-scene');
	var entity = document.createElement('a-entity');

	entity.setAttribute("id", "boiseries");
	//entity.setAttribute("position", "0 5.03 0");
	//entity.setAttribute("rotation", "90 90 0");

	var p1 = document.createElement('a-box');
	p1.setAttribute("id", "main_poutre_1")
	p1.setAttribute("position", "0 4.88 -2.88");
	p1.setAttribute("width", "8.15");
	p1.setAttribute("height", "0.5");
	p1.setAttribute("depth", "0.5");
	p1.setAttribute("src", "textures/poutre.jpg");
	entity.appendChild(p1);

	var p2 = document.createElement('a-box');
	p2.setAttribute("id", "main_poutre_2")
	p2.setAttribute("position", "0 4.88 2.88");
	p2.setAttribute("width", "8.15");
	p2.setAttribute("height", "0.5");
	p2.setAttribute("depth", "0.5");
	p2.setAttribute("src", "textures/poutre.jpg");
	entity.appendChild(p2);

	var start = -3.6;

	for(var i=0; i<13; i++){
		var p = document.createElement('a-box');
		var pos = start+0.6*i;
		p.setAttribute("id", "poutre_"+i.toString());
		p.setAttribute("position", pos.toString()+" 5.03 0");
		p.setAttribute("rotation", "90 90 0");
		p.setAttribute("width", "11.54");
		p.setAttribute("height", "0.3");
		p.setAttribute("depth", "0.1");
		p.setAttribute("src", "textures/poutre.jpg");
		entity.appendChild(p);
	}

	scene.appendChild(entity);

}

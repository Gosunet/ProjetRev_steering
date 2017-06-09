function include(file) {
    var oScript =  document.createElement("script");
    oScript.src = file;
    oScript.type = "text/javascript";
    document.body.appendChild(oScript);
}
 
include("scripts/vec3.js");

var scene = document.querySelector('a-scene'); 
var camera = document.getElementById('camera');
var tux00 = document.getElementById("tux-00");
var pos_tmp = document.getElementById("pos_tmp");

var mouvementActif = 0;
var mouvementOpti = 0;
var pingouinActif = 0;
var target_id = "";


cam = {
		cap				: 0.0,
		vit 			: 0.3,
		vMax         	: 0.5,
		fMax         	: 0.1,
		vitesse      	: {x: 0.05*Math.cos(0.0),y:0.0,z: 0.05*Math.sin(0.0)},
		acceleration 	: {x:0.0, y:0.0, z:0.0},
		gr 				: camera,
		update_q1		: function(id_target){
					
						var cible = document.getElementById(id_target);
						var C = cible.getAttribute("position");
						var P = this.gr.getAttribute("position");

						var Fs = vec3Creer();
						vec3Moins(Fs,C,P);
						var distance = vec3Norme(Fs);
						vec3Normaliser(Fs);

						var k = 1.0;
						if(distance < 2.0)
							k = distance/2.0 ;

						vec3Scale(Fs,k*this.vMax) ;
						vec3Moins(Fs,Fs,this.vitesse) ;  
						
						var l = vec3Norme(Fs) ; 
						vec3Normaliser(Fs) ; 
						vec3Scale(Fs,Math.min(l,this.fMax)) ; 

						vec3Accumuler(P,0.2,this.vitesse) ; 

						vec3Accumuler(this.vitesse,0.2,Fs) ; 
						this.vit = vec3Norme(this.vitesse) ; 
						
						this.gr.setAttribute('position',P) ; 

						if(distance < 0.01){
							mouvementActif = 0;
						}
				}

};

tux = {
		cap          : 0.0 ,
		vit          : 0.2 , 
		vMax         : 0.3,
		fMax         : 0.1,
		vitesse      : {x: 0.05*Math.cos(0.0),y:0.0,z: 0.05*Math.sin(0.0)},
		acceleration : {x:0.0, y:0.0, z:0.0},
		chemin       : ["checkpoint_4", "checkpoint_5", "checkpoint_6", "checkpoint_7", "checkpoint_8", "checkpoint_1", "checkpoint_2", "checkpoint_3"],
        chemin_opti  : [],
        idx          : 0,
        idx_opti     : 0,
		gr           : tux00 , 
		update_q2    : function(){
					var cible = document.getElementById(this.chemin[this.idx]) ;
					pos_tmp.setAttribute("position",cible.getAttribute("position").x + " 0 " + cible.getAttribute("position").z);
					var C = pos_tmp.getAttribute("position") ;
					var P = this.gr.getAttribute('position') ; 

					
					var Fs = vec3Creer() ; 
					vec3Moins(Fs,C,P) ; 
					var distance = vec3Norme(Fs) ; 
					vec3Normaliser(Fs) ;
					
					if(distance < 0.25){
						if(this.idx == this.chemin.length-1){
							this.idx ++;
							pos_tmp.setAttribute("position","3 0 -4");
							var C = pos_tmp.getAttribute("position") ;
						}
 						else {
							this.idx ++;
							cible = document.getElementById(this.chemin[this.idx]) ;							
							pos_tmp.setAttribute("position",cible.getAttribute("position").x + " 0 " + cible.getAttribute("position").z);
							var C = pos_tmp.getAttribute("position") ;
							}
					}
					
					var k = 1.0 ;
					
					if(this.idx == this.chemin.length-1)
						if(distance < 2.0)
							k = distance/2.0 ;

					vec3Scale(Fs,k*this.vMax) ;
					vec3Moins(Fs,Fs,this.vitesse) ;  
					
					var l = vec3Norme(Fs) ; 
					vec3Normaliser(Fs) ; 
					vec3Scale(Fs,Math.min(l,this.fMax)) ; 

					vec3Accumuler(P,0.2,this.vitesse) ; 

					vec3Accumuler(this.vitesse,0.2,Fs) ; 
					this.vit = vec3Norme(this.vitesse) ; 
					
					this.gr.setAttribute('position',P) ; 

					if(this.vit > 0.00001){
						var rot = this.gr.getAttribute('rotation') ; 
						var angleRadian = Math.atan2(-this.vitesse.z,this.vitesse.x) ; 
						rot.y = angleRadian*180.0/Math.PI ; 
						this.gr.setAttribute('rotation',rot) ; 
					}

					if(distance < 0.25 && this.idx == this.chemin.length){
					    idx = 0;
						pingouinActif = 0;
					}

		},
        
		update_q4    : function (target_id) {

		    if (this.chemin_opti.length == 0) {
		        var sphereProche = chercherBoulePlusProche("tux-00");

		        var str_path = findPath(sphereProche.getAttribute("id"), target_id).toString();
		        this.chemin_opti = str_path.split(',');
		    }
		    

		    var cible = document.getElementById(this.chemin_opti[this.idx_opti]);
		    pos_tmp.setAttribute("position", cible.getAttribute("position").x + " 0 " + cible.getAttribute("position").z);
		    var C = pos_tmp.getAttribute("position");
		    var P = this.gr.getAttribute('position');


		    var Fs = vec3Creer();
		    vec3Moins(Fs, C, P);
		    var distance = vec3Norme(Fs);
		    vec3Normaliser(Fs);

		    if (distance < 0.25) {
		        if (this.idx_opti == this.chemin_opti.length - 1) {
		            this.idx_opti++;
		            pos_tmp.setAttribute("position", "3 0 -4");
		            var C = pos_tmp.getAttribute("position");
		        }
		        else {
		            this.idx_opti++;
		            cible = document.getElementById(this.chemin_opti[this.idx_opti]);
		            pos_tmp.setAttribute("position", cible.getAttribute("position").x + " 0 " + cible.getAttribute("position").z);
		            var C = pos_tmp.getAttribute("position");
		        }
		    }

		    var k = 1.0;

		    if (this.idx_opti == this.chemin_opti.length - 1)
		        if (distance < 2.0)
		            k = distance / 2.0;

		    vec3Scale(Fs, k * this.vMax);
		    vec3Moins(Fs, Fs, this.vitesse);

		    var l = vec3Norme(Fs);
		    vec3Normaliser(Fs);
		    vec3Scale(Fs, Math.min(l, this.fMax));

		    vec3Accumuler(P, 0.2, this.vitesse);

		    vec3Accumuler(this.vitesse, 0.2, Fs);
		    this.vit = vec3Norme(this.vitesse);

		    this.gr.setAttribute('position', P);

		    if (this.vit > 0.00001) {
		        var rot = this.gr.getAttribute('rotation');
		        var angleRadian = Math.atan2(-this.vitesse.z, this.vitesse.x);
		        rot.y = angleRadian * 180.0 / Math.PI;
		        this.gr.setAttribute('rotation', rot);
		    }

		    if (distance < 0.5 && this.idx_opti == this.chemin_opti.length) {
		        this.idx_opti = 0;
		        this.chemin_opti = [];
		        mouvementOpti = 0;
		    }
            }
} ;



var checkpoint_1 = document.getElementById('checkpoint_1');
var checkpoint_2 = document.getElementById('checkpoint_2');
var checkpoint_3 = document.getElementById('checkpoint_3');
var checkpoint_4 = document.getElementById('checkpoint_4');
var checkpoint_5 = document.getElementById('checkpoint_5');
var checkpoint_6 = document.getElementById('checkpoint_6');
var checkpoint_7 = document.getElementById('checkpoint_7');
var checkpoint_8 = document.getElementById('checkpoint_8');
var checkpoint_cheminee = document.getElementById('checkpoint_cheminee');
var checkpoint_ext = document.getElementById('checkpoint_ext');

checkpoint_1.addEventListener("mousedown", handleClickSphere);
checkpoint_2.addEventListener("mousedown", handleClickSphere);
checkpoint_3.addEventListener("mousedown", handleClickSphere);
checkpoint_4.addEventListener("mousedown", handleClickSphere);
checkpoint_5.addEventListener("mousedown", handleClickSphere);
checkpoint_6.addEventListener("mousedown", handleClickSphere);
checkpoint_7.addEventListener("mousedown", handleClickSphere);
checkpoint_8.addEventListener("mousedown", handleClickSphere);
checkpoint_cheminee.addEventListener("mousedown", handleClickSphere);
checkpoint_ext.addEventListener("mousedown", handleClickSphere);

var pingouin = document.getElementById('tux-00');
pingouin.addEventListener("mousedown", handleClickPingouin);

function handleClickSphere(evt){
	target = evt.currentTarget;
	target_id    = target.getAttribute("id") ;

    //Déplacement de la camera
	//mouvementActif = 1;

    //Déplacement du pingouin
	mouvementOpti = 1;

}

function handleClickPingouin(evt){
	pingouinActif = 1;
}
 
setInterval(anim,20) ; 


function anim() {
    
	if(mouvementActif == 1){
		cam.update_q1(target_id);
	}
	if(pingouinActif == 1){
		tux.update_q2();
	}
	if (mouvementOpti == 1) {
	    tux.update_q4(target_id);
    }
}


function calc_dist(x1, x2, y1, y2) {
    return Math.sqrt((y2 - y1) * (y2 - y1) + (x2 - x1) * (x2 - x1));
}

var liste = ["checkpoint_4", "checkpoint_5", "checkpoint_6", "checkpoint_7", "checkpoint_8", "checkpoint_1", "checkpoint_2", "checkpoint_3", "checkpoint_cheminee", "checkpoint_ext"];


function chercherBoulePlusProche(id) {
    var start = document.getElementById(id);
   
    var posX_Visiteur = start.getAttribute("position").x;
    var posZ_Visiteur = start.getAttribute("position").z;

    var dist_min = 1000000;
    var boulePlusProche = null;

    for (var i = 0; i < liste.length; i++) {
        var boule = document.getElementById(liste[i]);
        var posX = boule.getAttribute("position").x;
        var posZ = boule.getAttribute("position").z;


        var dist = Math.sqrt((posX - posX_Visiteur) * (posX - posX_Visiteur) + (posZ - posZ_Visiteur) * (posZ - posZ_Visiteur));

        if (dist < dist_min) {
            boulePlusProche = boule;
            dist_min = dist;
        }
    }

    return boulePlusProche;
}

//--------------------------------------------------------------------------------------------------------------------------------------------//
//-----------------------------------------FONCTION POUR LE GRAPH-----------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------------------------------//

function node(name) {
    if (node.all[name]) { return node.all[name]; }
    if (!(this instanceof node)) { return new node(name); }
    node.all[name] = this;
    this.name = name;
    this.links = [];
    this.toString = function () { return name; }
}
node.all = {};

function link(n1, n2, cost) {
    if (!(n1 instanceof node)) { n1 = node(n1); }
    if (!(n2 instanceof node)) { n2 = node(n2); }
    if (!(this instanceof link)) { return new link(n1, n2, cost); }
    for (var i = 0; i < n1.links.length; ++i) {
        var l = n1.links[i];
        if (l.n1 === n2 || l.n2 === n2) { l.cost = cost; return l; }
    }
    n1.links.push(this);
    n2.links.push(this);

    this.n1 = n1;
    this.n2 = n2;
    this.cost = cost;
    this.toString = function () { return n1 + ">" + n2 + " (" + cost + ")"; }
    this.far = function (near) { return (near == n2) ? n1 : n2; }
}

function path(prev, node, cost) {
    if (!(this instanceof path)) { return new path(prev, node, cost); }
    this.node = node;
    this.cost = cost;
    this.elements = function () {
        var a = prev ? prev.elements() : [];
        a.push(this.node);
        return a;
    }
    this.toString = function () {
        //return (prev ? prev + ' > ' : "") + node + " (" + cost + ")";
        return (prev ? prev + ',' : "") + node;
    }
}

function insert_sorted(list, key, item) {
    for (var i = 0; i < list.length; ++i) {
        if (list[i][key] > item[key]) { list.splice(i, 0, item); return list; }
    }
    list.push(item);
    return list;
}


function findPath(from, to) {
    if (!(from instanceof node)) { from = node(from); }
    if (!(to instanceof node)) { to = node(to); }

    var visited = {},
      stack = [path(null, from, 0)],
      cur;

    while (cur = stack.shift()) {
        console.log(cur.toString());
        if (cur.node === to) { return cur; }
        for (var i = 0; i < cur.node.links.length; ++i) {
            var link = cur.node.links[i],
              other = link.far(cur.node);
            if (visited[other]) { continue; }
            insert_sorted(stack, 'cost', path(cur, other, link.cost + cur.cost));
        }
        visited[cur.node] = true;
    }
}


//graph de navigation
link('checkpoint_1', 'checkpoint_2', calc_dist(checkpoint_1.getAttribute('position').x, checkpoint_2.getAttribute('position').x, checkpoint_1.getAttribute('position').y, checkpoint_2.getAttribute('position').y));
link('checkpoint_2', 'checkpoint_3', calc_dist(checkpoint_2.getAttribute('position').x, checkpoint_3.getAttribute('position').x, checkpoint_2.getAttribute('position').y, checkpoint_3.getAttribute('position').y));
link('checkpoint_3', 'checkpoint_4', calc_dist(checkpoint_3.getAttribute('position').x, checkpoint_4.getAttribute('position').x, checkpoint_3.getAttribute('position').y, checkpoint_4.getAttribute('position').y));
link('checkpoint_4', 'checkpoint_5', calc_dist(checkpoint_4.getAttribute('position').x, checkpoint_5.getAttribute('position').x, checkpoint_4.getAttribute('position').y, checkpoint_5.getAttribute('position').y));
link('checkpoint_5', 'checkpoint_6', calc_dist(checkpoint_5.getAttribute('position').x, checkpoint_6.getAttribute('position').x, checkpoint_5.getAttribute('position').y, checkpoint_6.getAttribute('position').y));
link('checkpoint_6', 'checkpoint_7', calc_dist(checkpoint_6.getAttribute('position').x, checkpoint_7.getAttribute('position').x, checkpoint_6.getAttribute('position').y, checkpoint_7.getAttribute('position').y));
link('checkpoint_7', 'checkpoint_8', calc_dist(checkpoint_7.getAttribute('position').x, checkpoint_8.getAttribute('position').x, checkpoint_7.getAttribute('position').y, checkpoint_8.getAttribute('position').y));
link('checkpoint_1', 'checkpoint_8', calc_dist(checkpoint_1.getAttribute('position').x, checkpoint_8.getAttribute('position').x, checkpoint_1.getAttribute('position').y, checkpoint_8.getAttribute('position').y));
link('checkpoint_7', 'checkpoint_cheminee', calc_dist(checkpoint_7.getAttribute('position').x, checkpoint_cheminee.getAttribute('position').x, checkpoint_7.getAttribute('position').y, checkpoint_cheminee.getAttribute('position').y));
link('checkpoint_1', 'checkpoint_ext', calc_dist(checkpoint_1.getAttribute('position').x, checkpoint_ext.getAttribute('position').x, checkpoint_1.getAttribute('position').y, checkpoint_ext.getAttribute('position').y));


function main(){
	
	const walking_update = function() {
		// Do something here
		var cible = document.getElementById(this.chemin[this.idx]);
		var C = cible.getAttribute("position");
		var P = this.gr.getAttribute('position');

		var Fs = vec3Creer();
		vec3Moins(Fs, C, P);
		var distance = vec3Norme(Fs);
		vec3Normaliser(Fs);

		if (distance < 0.25) {
			current_state = "waiting";
			return;
		}

		var k = 1.0;

		if (this.idx == this.chemin.length - 1)
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
	}

	const angry_update = function() {
		// Do something here
	}

	const waiting_update = function() {
		// Do something here
	}
	const STATES = {
		walking:{
			update: walking_update
		},
		angry:{
			update: angry_update
		},
		waiting:{
			update: waiting_update
		},
	};

	var current_state = "walking";

	var scene = document.querySelector('a-scene');

	// alert("PRET ? ");

	var tux00 = document.getElementById('penguin');

	var update_fct = function () {
	}

	tux0 = {
		cap: 0.0,
		vit: 0.05,
		vMax: 0.5,
		fMax: 0.1,
		vitesse: {
			x: 0.05 * Math.cos(0.0),
			y: 0.0,
			z: 0.05 * Math.sin(0.0)
		},
		acceleration: {
			x: 0.0,
			y: 0.0,
			z: 0.0
		},
		chemin: ["cible00", "cible02", "cible01", "cible04", "cible05"],
		idx: 0,
		gr: tux00,
		update: STATES[current_state].update
	};

	function anim() {
		tux0.update();
		requestAnimationFrame(anim, 20);
	}
	anim();
}
main();

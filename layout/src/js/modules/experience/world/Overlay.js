import * as THREE from 'three';
import Experience from "../Experience";
/* todo: move loading shaders to sources */
import vertexShader from '../../../../files/experience/shaders/blob/vertex.glsl'
import fragmentShader from '../../../../files/experience/shaders/blob/fragment.glsl'
export default class Overlay {
	constructor(params) {
		this.experience = new Experience();
		this.scene = this.experience.scene;
		//	this.resources = this.experience.resources;
		this.time = this.experience.time;
		this.renderer = this.experience.renderer;
		this.debug = this.experience.debug;

		this.vertexShader = vertexShader;
		this.fragmentShader = fragmentShader;

		this.params = {
			speed: 0.1,
			density: 1.5,
			strength: 1,
			insideColor: '#FF0000',
			outsideColor: '#FFFF00',
			uYellow: 0.5,
			uRed: 0.3,
			uPurple: 0.08,
			uYellowRed: 0.2
		}

		this.setGeometry();
		this.setMaterial();
		this.setOverlay();
	}

	// Methods

	setGeometry() {
		this.geometry = new THREE.PlaneGeometry(2, 2, 1, 1);


		// this.geometry = new THREE.IcosahedronGeometry(4, 40);
		// this.numberOfPoints = this.geometry.attributes.position.count;
		// this.colors = new Float32Array(this.numberOfPoints * 3);
		// this.colorInside = new THREE.Color(this.params.insideColor);
		// this.colorOutside = new THREE.Color(this.params.outsideColor);
		//
		// for (let i = 0; i < this.numberOfPoints; i++) {
		// 	const i3 = i * 3;
		//
		// 	// Color
		// 	const mixedColor = this.colorInside.clone();
		// 	mixedColor.lerp(this.colorOutside, 1.0);
		//
		// 	this.colors[i3 + 0] = mixedColor.r;
		// 	this.colors[i3 + 1] = mixedColor.g;
		// 	this.colors[i3 + 2] = mixedColor.b;
		// }
		//
		// this.geometry.setAttribute('color', new THREE.BufferAttribute(this.colors, 3));
	}

	setMaterial() {
		this.material = new THREE.ShaderMaterial({
			transparent: true,
			uniforms: {
				uAlpha: { value: 0 }
			},
			vertexShader: `
        void main()
        {
            gl_Position = vec4(position, 1.0);
        }
    	`,
			fragmentShader: `
				uniform float uAlpha;
        void main()
        {
            gl_FragColor = vec4(1.0, 0.0, 0.0, uAlpha);
        }
    	`
		})

		// if (this.debug.active) {
		//
		// 	this.debug.ui.add(this.material.uniforms.uMixYellow, 'value').min(0.01).max(1.0).step(0.01).name('mix Yellow');
		// 	this.debug.ui.add(this.material.uniforms.uMixRed, 'value').min(0.01).max(1.0).step(0.01).name('mix Red');
		// 	this.debug.ui.add(this.material.uniforms.uMixPurple, 'value').min(0.01).max(1.0).step(0.01).name('mix Purple');
		// 	this.debug.ui.add(this.material.uniforms.uMixYellowRed, 'value').min(0.01).max(1.0).step(0.01).name('mix YellowRed');
		// }
	}

	setOverlay() {
		this.overlay = new THREE.Mesh(this.geometry, this.material);
		this.scene.add(this.overlay);
	}

	update() {
		// this.material.uniforms.uTime.value = this.time.elapsed * 0.001;
		// this.material.uniforms.uSpeed.value = this.params.speed;
		// this.material.uniforms.uNoiseStrength.value = this.params.strength;
		// this.material.uniforms.uNoiseDensity.value = this.params.density;
	}
}

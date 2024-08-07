import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Experience from "./Experience";
import {instance} from "three/nodes";
 // const cameraPositionSpan = document.getElementById("camera-position");
export default class Camera {
	constructor() {
		// Get experience
		this.experience = new Experience();

		this.sizes = this.experience.sizes;
		this.scene = this.experience.scene;
		this.canvas = this.experience.canvas;
		this.debug = this.experience.debug;
		this.setInstance();
		this.setOrbitControls();
	}

	// Methods

	setInstance() {
		 this.axesHelper = new THREE.AxesHelper(8);
		//this.instance = new THREE.PerspectiveCamera(75, this.sizes.width / this.sizes.height, 0.1, 100);
		this.instance = new THREE.PerspectiveCamera(75, this.sizes.viewport.width / this.sizes.viewport.height, 0.1, 1000);
		this.instance.position.set(0, 0, 15);

		this.scene.add(this.instance);
	//	this.scene.add(this.axesHelper);

		if (this.debug.active) {
			this.debug.ui.add(this.instance.position, 'z').min(-100).max(100).step(0.1).name('Camera position Z');
		}
	}

	setOrbitControls() {
		this.controls = new OrbitControls(this.instance, this.canvas);
		this.controls.enableDamping = true;
		this.controls.enablePan = false;
		this.controls.enableRotate = false;
	}

	// Update Camera on resize (calling in Experience)
	resize() {
	//	this.instance.aspect = this.sizes.width / this.sizes.height;
		this.instance.aspect = this.sizes.viewport.width / this.sizes.viewport.height;
		this.instance.updateProjectionMatrix();
	}

	// Update

	update() {
		// this.controls.update();
		//cameraPositionSpan.textContent = `${this.instance.position.x.toFixed(2)}, ${this.instance.position.y.toFixed(2)}, ${this.instance.position.z.toFixed(2)}`;
	}
};

import * as THREE from 'three';

var scene = new THREE.Scene();

var width = 800;
var height = 640;
console.log(width, height);

var camera = new THREE.OrthographicCamera(
  width / -2,
  width / 2,
  height / 2,
  height / -2,
  1,
  1000
);
camera.position.set(0, 0, 500);

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.PlaneGeometry(100, 100);
var material = new THREE.MeshBasicMaterial({ color: 0xff0000 });

var mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

export {
  mesh,
  renderer,
  scene,
  camera,
};

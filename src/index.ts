import { mesh, renderer, scene, camera } from "./setup";
import * as THREE from 'three';

let acceleration = 9.81; // 9.81 m/s
let velocity = 0;

const clock = new THREE.Clock();

mesh.position.y = 200;
renderer.setAnimationLoop(() => {
  velocity += acceleration * clock.getDelta(); // adjust for timedelta

  mesh.position.y -= velocity;

  if (acceleration > 0 && mesh.position.y <= 0) {
    acceleration = -acceleration;
  }
  if (acceleration < 0 && mesh.position.y > 0) {
    acceleration = -acceleration;
  }

  renderer.render(scene, camera);
});


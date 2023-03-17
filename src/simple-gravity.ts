import { Mesh } from 'three';

// Animation state variables
let acceleration = -9.81;
let velocity = 0;

export default function simpleGravity(
  mesh: Mesh,
  timeDelta: number,
) {
  velocity += acceleration * timeDelta;

  mesh.position.y -= velocity;

  if (acceleration > 0 && mesh.position.y <= 0) {
    acceleration = -acceleration;
  }
  if (acceleration < 0 && mesh.position.y > 0) {
    acceleration = -acceleration;
  }
}

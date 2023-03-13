import { mesh, renderer, scene, camera } from "./setup";

let acceleration = 9.81 / 100; // 9.81 m/s
let velocity = 0;

mesh.position.y = 100;
function render() {
  requestAnimationFrame(render);

  velocity += acceleration;

  mesh.position.y -= velocity;

  if (acceleration > 0 && mesh.position.y <= 0) {
    acceleration = -acceleration;
  }
  if (acceleration < 0 && mesh.position.y > 0) {
    acceleration = -acceleration;
  }

  renderer.render(scene, camera);
}

render();

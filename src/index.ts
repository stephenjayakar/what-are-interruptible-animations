import {
  mesh,
  renderer,
  scene,
  camera,
} from './setup';

const acceleration = 9.81 / 100; // 9.81 m/s
let velocity = 0;

mesh.position.y = 100;
function render() {
  requestAnimationFrame(render);

  velocity += acceleration

  mesh.position.y -= velocity;

  if (mesh.position.y < -100) {
    resetScene()
  }

  renderer.render(scene, camera);
}

function resetScene() {
  mesh.position.y = 100;
  velocity = 0;
}

render();

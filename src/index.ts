import {
  mesh,
  renderer,
  scene,
  camera,
} from './setup';

mesh.position.y = 100;
function render() {
  requestAnimationFrame(render);

  mesh.position.x += 0.1;
  if (mesh.position.x > 5) {
    mesh.position.x = -5;
  }

  renderer.render(scene, camera);
}

render();

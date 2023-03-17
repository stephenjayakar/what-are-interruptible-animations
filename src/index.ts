import { mesh, renderer, scene, camera } from "./setup";
import simpleGravity from './simple-gravity';
import * as THREE from 'three';

const appState = {
  selectedAnimation: 'simple-gravity',
};

document.addEventListener('DOMContentLoaded', function () {
  const selectElement = document.getElementById('selectElement') as any;

  // Function to handle the select change
  function onSelectChange() {
    const selectedValue = selectElement.value;
    console.log('Selected value:', selectedValue);
  }

  // Attach the change event listener to the select element
  selectElement.addEventListener('change', onSelectChange);
});


const clock = new THREE.Clock();

mesh.position.y = 200;
renderer.setAnimationLoop(() => {
  // TODO: refactor so that we're not running a
  // branch every time
  const f = mapSelectionToFunction(appState.selectedAnimation);
  // Calculate delta as close to func call
  const timeDelta = clock.getDelta();
  f(mesh, timeDelta);
  renderer.render(scene, camera);
});

function mapSelectionToFunction(
  input: string
): /* TODO: type of function? */ any {
  // TODO: perf on if vs. 
  if (input == 'simple-gravity') {
    return simpleGravity;
  }
}

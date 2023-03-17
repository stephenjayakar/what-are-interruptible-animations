import { mesh, renderer, scene, camera } from "./setup";
import simpleGravity from "./simple-gravity";
import rubberBanding from "./rubber-banding";
import * as THREE from "three";

interface RenderClass {
  render: (mesh: THREE.Mesh, timeDelta: number) => void;
  reset: (mesh: THREE.Mesh) => void;
}
const appState: {
  selectedAnimation: RenderClass;
}= {
  selectedAnimation: simpleGravity,
};

document.addEventListener("DOMContentLoaded", function () {
  const selectElement = document.getElementById("selectElement") as any;

  // Function to handle the select change
  function onSelectChange() {
    const selectedValue = selectElement.value;
    appState.selectedAnimation = mapSelectionToFunction(selectedValue);
    appState.selectedAnimation.reset(mesh);
  }

  // Attach the change event listener to the select element
  selectElement.addEventListener("change", onSelectChange);

  const resetButtonElement = document.getElementById("resetButton") as any;

  resetButtonElement.addEventListener("click", () => {
    // TODO: this is a good example of using something
    // class-oriented. Make each animation a class to
    // encapsulate state, as well as an interface.
    // The interface would be "Reset()" and "RenderNext(mesh, delta)"
      appState.selectedAnimation.reset(mesh);
  });
  appState.selectedAnimation.reset(mesh);
});

const clock = new THREE.Clock();

renderer.setAnimationLoop(() => {
  const f = appState.selectedAnimation.render;
  // Calculate delta as close to func call
  const timeDelta = clock.getDelta();
  f(mesh, timeDelta);
  renderer.render(scene, camera);
});

function mapSelectionToFunction(input: string): any {
  if (input == "simple-gravity") {
    return simpleGravity;
  } else if (input == "rubber-banding") {
    return rubberBanding;
  } else {
    console.log("error on mapping, returning default. got ", input);
    return simpleGravity;
  }
}

import { mesh, renderer, scene, camera } from "./setup";
import simpleGravity from "./simple-gravity";
import rubberBanding from "./rubber-banding";
import * as THREE from "three";
import * as ReactDOM from "react-dom/client";
import * as React from "react";

// TODO: make this component state
const appState: {
  selectedAnimation: RenderClass;
} = {
  selectedAnimation: simpleGravity,
};

function App() {
  return (
    <div>
      <p>App</p>
      <select
        onChange={(e) => {
          const selectedValue = e.target.value;
          appState.selectedAnimation = mapSelectionToFunction(selectedValue);
          appState.selectedAnimation.reset(mesh);
        }}
      >
        <option value="simple-gravity">Simple gravity</option>
        <option value="rubber-banding">Rubber banding</option>
      </select>
      <button
        id="resetButton"
        onClick={() => {
          appState.selectedAnimation.reset(mesh);
        }}
      >
        Reset
      </button>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

interface RenderClass {
  render: (mesh: THREE.Mesh, timeDelta: number) => void;
  reset: (mesh: THREE.Mesh) => void;
}

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

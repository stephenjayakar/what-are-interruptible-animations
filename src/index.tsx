import { mesh, renderer, scene, camera } from "./setup";
import simpleGravity from "./simple-gravity";
import rubberBanding from "./rubber-banding";
// import scrollview from "./scrollview";
import * as THREE from "three";
import * as ReactDOM from "react-dom/client";
import * as React from "react";

import ScrollViewTable from "./ScrollViewTable";

const SIMPLE_GRAVITY = "simple-gravity";
const RUBBER_BANDING = "rubber-banding";
const SCROLLVIEW = "scroll-view";

// TODO: make this component state
const appState: {
  selectedAnimation: RenderClass;
} = {
  selectedAnimation: simpleGravity,
};

function App() {
  const [animationString, setAnimationString] = React.useState(SIMPLE_GRAVITY);
  const [massSliderValue, setMassSliderValue] = React.useState(1);
  const [kSliderValue, setKSliderValue] = React.useState(100);
  // TODO: this is spaghetti :>.
  const sliderMap = {
    mass: setMassSliderValue,
    k: setKSliderValue,
  };

  function handleSliderChange(value: string, key: "mass" | "k") {
    const floatValue = parseInt(value) / 10;
    appState.selectedAnimation.updateConfig({
      [key]: floatValue,
    });
    sliderMap[key](floatValue);
  }

  return (
    <div>
      <p>{animationString}</p>
      <select
        onChange={(e) => {
          const selectedValue = e.target.value;
          appState.selectedAnimation = mapSelectionToFunction(selectedValue);
          appState.selectedAnimation.reset(mesh, { mass: massSliderValue });
          setAnimationString(selectedValue);
        }}
      >
        <option value={SIMPLE_GRAVITY}>Simple gravity</option>
        <option value={RUBBER_BANDING}>Rubber banding</option>
        <option value={SCROLLVIEW}>Scrollview</option>
      </select>
      <button
        id="resetButton"
        onClick={() => {
          appState.selectedAnimation.reset(mesh);
        }}
      >
        Reset
      </button>
      {animationString == RUBBER_BANDING && (
        <>
          <h3>Mass: {massSliderValue}</h3>
          <input
            type="range"
            min="1"
            max="200"
            value={massSliderValue * 10}
            onChange={(e) => handleSliderChange(e.target.value, "mass")}
          />
          <h3>K: {kSliderValue}</h3>
          <input
            type="range"
            min="1"
            max="200"
            value={kSliderValue * 10}
            onChange={(e) => handleSliderChange(e.target.value, "k")}
          />
        </>
      )}
      <ScrollViewTable />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

interface RenderClass {
  render: (mesh: THREE.Mesh, timeDelta: number) => void;
  reset: (mesh: THREE.Mesh, config?: any) => void;
  updateConfig: (config: any) => void;
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
  if (input == SIMPLE_GRAVITY) {
    return simpleGravity;
  } else if (input == RUBBER_BANDING) {
    return rubberBanding;
  } else if (input == SCROLLVIEW) {
    // TODO: scrollview
    return null;
  } else {
    console.log("error on mapping, returning default. got ", input);
    return simpleGravity;
  }
}

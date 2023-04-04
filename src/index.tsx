import rubberBanding from "./rubber-banding";
import settingsImage from "./images/merged.png";
import * as THREE from "three";
import * as ReactDOM from "react-dom/client";
import * as React from "react";

// SETUP
var scene = new THREE.Scene();

var width = 1170 / 2;
// Random google ratio for screen height that's similar to iPhone
var height = (19.5 / 9) * width;

var camera = new THREE.OrthographicCamera(
  width / -2,
  width / 2,
  height / 2,
  height / -2,
  1,
  1000
);
camera.position.set(0, 0, 500);

const clock = new THREE.Clock();
var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

const textureLoader = new THREE.TextureLoader();
var mesh: THREE.Mesh | null = null;
textureLoader.load(settingsImage, (texture) => {
  const textureHeight = 4197 / 2;
  var geometry = new THREE.PlaneGeometry(width, textureHeight);
  var material = new THREE.MeshBasicMaterial({ map: texture });

  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  renderer.setAnimationLoop(() => {
    if (!isBeingDragged) {
      const f = appState.selectedAnimation.render;
      // Calculate delta as close to func call
      const timeDelta = clock.getDelta();
      f(mesh, timeDelta);
      renderer.render(scene, camera);
    }
  });
});

// TODO: make this component state
const appState: {
  selectedAnimation: RenderClass;
} = {
  selectedAnimation: rubberBanding,
};

function App() {
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
      <p>Rubber banding demo</p>
      <button
        id="resetButton"
        onClick={() => {
          appState.selectedAnimation.reset(mesh);
        }}
      >
        Reset
      </button>
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
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

let isBeingDragged = false;
// Mouse down event
const onMouseDown = (event: MouseEvent) => {
  isBeingDragged = true;
  console.log("Mouse down:", event);
};

// Mouse up event
const onMouseUp = (event: MouseEvent) => {
  isBeingDragged = false;
  console.log("Mouse up:", event);
  clock.getDelta();
};

// Mouse move event
const onMouseMove = (event: MouseEvent) => {
  if (isBeingDragged) {
    console.log("Mouse dragging:", event);
  }
};

renderer.domElement.addEventListener("mousedown", onMouseDown, false);
renderer.domElement.addEventListener("mouseup", onMouseUp, false);
renderer.domElement.addEventListener("mousemove", onMouseMove, false);

interface RenderClass {
  render: (mesh: THREE.Mesh, timeDelta: number) => void;
  reset: (mesh: THREE.Mesh, config?: any) => void;
  updateConfig: (config: any) => void;
}

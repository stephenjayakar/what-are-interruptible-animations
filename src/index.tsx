import rubberBanding from "./rubber-banding";
import settingsImage from "./images/merged.png"
import * as THREE from "three";
import * as ReactDOM from "react-dom/client";
import * as React from "react";

// SETUP
var scene = new THREE.Scene();

var width = 1170 / 2;
// 19.5 / 9
var height = 4197 / 2;

var camera = new THREE.OrthographicCamera(
  width / -2,
  width / 2,
  height / 2,
  height / -2,
  1,
  1000
);
camera.position.set(0, 0, 500);

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

const textureLoader = new THREE.TextureLoader();
var mesh: THREE.Mesh | null = null;
textureLoader.load(settingsImage, (texture) => {

  
    var geometry = new THREE.PlaneGeometry(width, height);
    var material = new THREE.MeshBasicMaterial({ map: texture });

    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    const clock = new THREE.Clock();

    renderer.setAnimationLoop(() => {
        const f = appState.selectedAnimation.render;
        // Calculate delta as close to func call
        const timeDelta = clock.getDelta();
        f(mesh, timeDelta);
        renderer.render(scene, camera);
});});


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

interface RenderClass {
  render: (mesh: THREE.Mesh, timeDelta: number) => void;
  reset: (mesh: THREE.Mesh, config?: any) => void;
  updateConfig: (config: any) => void;
}

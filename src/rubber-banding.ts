import { Mesh } from "three";

// Consts
const floorY = -100;
const rubberBandFactor = 0.2;
// const ceilY = 200;
// const EPS = 0.0000001;

class RubberBandingAnimation {
  acceleration = 0;
  velocity = 0;
  reset = (mesh: Mesh) => {
    mesh.position.y = 200;
    this.velocity = 0;
    this.acceleration = -9.81 * 100;
  };

  render = (mesh: Mesh, timeDelta: number) => {
    this.velocity += this.acceleration * timeDelta;
    mesh.position.y += this.velocity * timeDelta;

    // Check if the square has hit the floor and apply rubber banding
    if (mesh.position.y <= floorY) {
      const diffY = mesh.position.y - floorY;
      this.velocity = -(diffY * rubberBandFactor);
      // mesh.position.y = floorY + (mesh.position.y - floorY) * rubberBandFactor;
// this.velocity = -this.velocity * rubberBandFactor;
    }
  };
}

export default new RubberBandingAnimation();

import { Mesh } from "three";

class SimpleGravityAnimation {
  velocity = 0;
  acceleration = 0;
  reset = (mesh: Mesh) => {
    mesh.position.y = 200;
    this.velocity = 0;
    this.acceleration = -9.81 * 100;
  };
  render = (mesh: Mesh, timeDelta: number) => {
    this.velocity += this.acceleration * timeDelta;
    mesh.position.y += this.velocity * timeDelta;

    if (this.acceleration < 0 && mesh.position.y <= 0) {
      this.acceleration = -this.acceleration;
    }
    if (this.acceleration > 0 && mesh.position.y > 0) {
      this.acceleration = -this.acceleration;
    }
  };
}

export default new SimpleGravityAnimation();

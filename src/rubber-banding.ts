import { Mesh } from "three";

enum ANIM_STATE {
  FALLING,
  BANDING,
}

// Consts
const floorY = -100;
const mass = 100;
const k = 10;
const damping = 0.9;
// const ceilY = 200;
// const EPS = 0.0000001;

class RubberBandingAnimation {
  acceleration = 0;
  velocity = 0;
  anim_state = ANIM_STATE.FALLING;
  reset = (mesh: Mesh) => {
    mesh.position.y = 200;
    this.velocity = 0;
    this.acceleration = -9.81 * 100;
    this.anim_state = ANIM_STATE.FALLING;
  };

  render = (mesh: Mesh, timeDelta: number) => {
    this.velocity += this.acceleration * timeDelta;
    mesh.position.y += this.velocity * timeDelta;
    if (this.anim_state == ANIM_STATE.FALLING) {
      // Check if the square has hit the floor and apply rubber banding
      if (mesh.position.y <= floorY) {
        this.anim_state = ANIM_STATE.BANDING;
      }
    } else {
      /// f = m * a
      const currentF = mass * this.acceleration;
      const x = floorY - mesh.position.y;
      let springF = k * x;
      // TODO: how to do damping properly?
      // springF -= springF * damping;
      const F = (currentF + springF);
      const a = F / mass;
      this.acceleration = a;
      console.log({
        a,
        currentF,
        springF,
      });
    }
  };
}

export default new RubberBandingAnimation();

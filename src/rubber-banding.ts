import { Mesh } from "three";

enum ANIM_STATE {
  FALLING,
  BANDING,
};

// Consts
const floorY = -100;
const mass = 10;
const k = 10;
const damping = 0.5;
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
      const x = floorY - mesh.position.y;
      let F = (k * x);
      // TODO: how to do damping properly?
      F -= F * damping;
      const a = (F / mass);
      this.acceleration = a;
        console.log(a);
    }
  };
}

export default new RubberBandingAnimation();

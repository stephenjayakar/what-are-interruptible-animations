import { Mesh } from "three";

enum ANIM_STATE {
  FALLING,
  BANDING,
}

// Consts
const floorY = -100;
// const mass = 1.5;
const k = 8;

// const ceilY = 200;
// const EPS = 0.0000001;

class RubberBandingAnimation {
  acceleration = 0;
  velocity = 0;
  anim_state = ANIM_STATE.FALLING;
  mass = 1.5;
  // Critical damping
  c = 2 * Math.sqrt(this.mass * k);
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
        this.acceleration = 0;
      }
    } else {
      /// f = m * a
      // const currentF = mass * this.acceleration;
      const x = floorY - mesh.position.y;
      let springF = k * x;
      const dampingF = this.c * this.velocity;
      const F = springF - dampingF;
      const a = F / this.mass;
      this.acceleration = a;
    }
  };

  updateConfig = (config: { mass: number }) => {
    this.mass = config.mass;
    // TODO: find a more elegant way to recalc
    this.c = 2 * Math.sqrt(this.mass * k);
    console.log(this.mass, this.c);
  };

  // updateConfig = (
  //   config: {
  //     k: number;
  //     c: number;
  //     mass: number;
  //   },
  // ) => {
  //
  // }
}

export default new RubberBandingAnimation();

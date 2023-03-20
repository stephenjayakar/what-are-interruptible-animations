import { Mesh } from "three";

enum ANIM_STATE {
  FALLING,
  BANDING,
}

// Consts
const floorY = -100;
// const ceilY = 200;
// const EPS = 0.0000001;

interface Config {
  mass?: number;
  k?: number;
}

class RubberBandingAnimation {
  acceleration = 0;
  velocity = 0;
  anim_state = ANIM_STATE.FALLING;
  mass = 1.5;
  k = 8;
  // Critical damping
  c = 2 * Math.sqrt(this.mass * this.k);
  reset = (mesh: Mesh, config?: Config) => {
    mesh.position.y = 200;
    this.velocity = 0;
    this.acceleration = -9.81 * 100;
    this.anim_state = ANIM_STATE.FALLING;
    if (config) {
      this.updateConfig(config);
    }
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
      let springF = this.k * x;
      const dampingF = this.c * this.velocity;
      const F = springF - dampingF;
      const a = F / this.mass;
      this.acceleration = a;
    }
  };

  updateConfig = (config: Config) => {
    if (config.mass) {
      this.mass = config.mass;
    }
    if (config.k) {
      this.k = config.k;
    }
    // TODO: find a more elegant way to recalc
    this.c = 2 * Math.sqrt(this.mass * this.k);
    console.log(this.mass, this.k, this.c);
  };
}

export default new RubberBandingAnimation();

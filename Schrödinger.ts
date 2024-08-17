enum Framestate {
  NoCat = 0,
  CatDetected = 1,
}
export class CatorNoCat {
  private requiredframes: number;
  private stack: number[] = [];
  private state: Framestate = Framestate.NoCat;
  constructor(requiredframes: number) {
    if (requiredframes <= 0) {
      throw new Error("Required frames must be a positive integer");
    }
    this.requiredframes = requiredframes;
  }
  shouldChangeState(frame: Framestate): Framestate {
    // When there is no cat im waiting for the cat frame which is 1
    if (this.state === Framestate.NoCat) {
      if (frame === Framestate.NoCat) {
        this.stack.pop();
        // console.log(this.stack);
        return 0;
      }
      if (frame === Framestate.CatDetected) {
        this.stack.push(frame);
        // console.log(this.stack);
        if (this.stack.length === this.requiredframes) {
          this.state = Framestate.CatDetected;
          this.stack.length = 0;
          //   console.log(this.stack);
          return 1;
        } else {
          return 0;
        }
      }
    }

    // When there is a cat im waiting for the no cat frame which is 0
    if (this.state === Framestate.CatDetected) {
      if (frame === Framestate.CatDetected) {
        this.stack.pop();
        // console.log(this.stack);
        return 0;
      }
      if (frame === Framestate.NoCat) {
        this.stack.push(frame);
        // console.log(this.stack);

        if (this.stack.length === this.requiredframes) {
          this.state = Framestate.NoCat;
          this.stack.length = 0;
          //   console.log(this.stack);

          return 1;
        } else {
          return 0;
        }
      }
    }
    throw new Error("Unreachable code reached");
  }
}

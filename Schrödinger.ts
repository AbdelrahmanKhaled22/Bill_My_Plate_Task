type MyBoolean = 0 | 1;
export class CatorNoCat {
  private requiredframes: number;
  private stack: number[] = [];
  private state: MyBoolean = 0;
  constructor(requiredframes: number) {
    this.requiredframes = requiredframes;
  }
  shouldChangeState(frame: MyBoolean): MyBoolean {
    // When there is no cat im waiting for the cat frame which is 1
    if (this.state === 0) {
      if (frame === 0) {
        this.stack.pop();
        // console.log(this.stack);
        return 0;
      }
      if (frame === 1) {
        this.stack.push(1);
        // console.log(this.stack);
        if (this.stack.length === this.requiredframes) {
          this.state = 1;
          this.stack.length = 0;
          //   console.log(this.stack);
          return 1;
        } else {
          return 0;
        }
      }
    }

    // When there is a cat im waiting for the no cat frame which is 0
    if (this.state === 1) {
      if (frame === 1) {
        this.stack.pop();
        // console.log(this.stack);
        return 0;
      }
      if (frame === 0) {
        this.stack.push(0);
        // console.log(this.stack);

        if (this.stack.length === this.requiredframes) {
          this.state = 0;
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

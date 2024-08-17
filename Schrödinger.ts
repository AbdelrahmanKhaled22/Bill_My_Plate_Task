enum FrameState {
  NoCat = 0,
  CatPresent = 1,
}

export class CatorNoCat {
  private requiredFrames: number;
  private stack: number[] = [];
  private state: FrameState = FrameState.NoCat;

  constructor(requiredFrames: number) {
    if (requiredFrames <= 0) {
      throw new Error("Required frames must be a positive integer");
    }
    this.requiredFrames = requiredFrames;
  }

  shouldChangeState(frame: FrameState): FrameState {
    const isStateChangeDetected = this.processFrame(frame);
    return isStateChangeDetected ? FrameState.CatPresent : FrameState.NoCat;
  }

  private processFrame(frame: FrameState): boolean {
    const expectedFrame =
      this.state === FrameState.NoCat
        ? FrameState.CatPresent
        : FrameState.NoCat;

    if (frame === expectedFrame) {
      this.stack.push(frame);
      if (this.stack.length === this.requiredFrames) {
        this.state = expectedFrame;
        this.stack = [];
        return true;
      }
    } else {
      this.stack.pop();
    }

    return false;
  }
}

enum FrameState {
  NoCat = 0,
  CatPresent = 1,
}

export class CatorNoCat {
  private requiredFrames: number;
  private counter: number = 0;
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
    const stateChangeFrame = Number(!this.state);

    if (frame === stateChangeFrame) {
      this.counter++;
      if (this.counter === this.requiredFrames) {
        this.state = stateChangeFrame;
        this.counter = 0;
        return true;
      }
    } else if (this.counter !== 0) {
      this.counter--;
    }

    return false;
  }
}

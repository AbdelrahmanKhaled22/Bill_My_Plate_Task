enum FrameState { // Effectively it's a boolean but used for enhanced readability
  NoCat = 0,
  CatPresent = 1,
}

export class CatorNoCat {
  private requiredFrames: number;
  private counter: number = 0;
  private state: FrameState = FrameState.NoCat;

  constructor(requiredFrames: number) {
    if (requiredFrames <= 0) {
      // input validation for negative numbers
      throw new Error("Required frames must be a positive integer");
    }
    this.requiredFrames = requiredFrames;
  }

  shouldChangeState(frame: FrameState): FrameState {
    const isStateChangeDetected = this.processFrame(frame);
    return isStateChangeDetected ? 1 : 0;
  }

  private processFrame(frame: FrameState): boolean {
    /*
    if the state is CatPresent then the state can only change if 
    the sufficient number of NoCat frames are sent
    and vice versa
    */
    const stateChangeFrame: FrameState = Number(!this.state);

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

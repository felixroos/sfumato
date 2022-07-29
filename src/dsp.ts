if (typeof AudioParam !== "undefined") {
  (AudioParam as any).prototype.dahdsr = function (
    time,
    min,
    max,
    delay,
    attack,
    hold,
    decay,
    sustain,
    release
  ) {
    console.log("A", attack, "H", hold, "D", decay, "S", sustain, "R", release);
    let t = time;
    this.setValueAtTime(min, time); // origin time
    // delay
    t += delay;
    this.setValueAtTime(min, t);
    // attack
    t += attack;
    this.linearRampToValueAtTime(max, t);
    // this.exponentialRampToValueAtTime(max, t); // attack
    // this.setTargetAtTime(max, t, 0.015); // attack
    // hold
    t += hold;
    this.setValueAtTime(max, t);
    // decay
    t += decay;
    this.linearRampToValueAtTime(sustain * max, t);
    console.log("sustain", sustain);

    /*
When 96 dB (0.04) of attenuation is reached in the final gain amplifier, an abrupt jump to zero gain (infinite dB
of attenuation) occurs. In a 16-bit system, this jump is inaudible. 
*/

    // this.exponentialRampToValueAtTime(sustain * max, t);
    // this.setTargetAtTime(sustain * max, t, 0.015); // sustain start
    // release function
    return (end, value) => {
      this.cancelScheduledValues(end);
      // this.setValueAtTime(this.value, end);
      const target = Math.max(value ?? min, 0.0001); // 0 is not allowed here..

      // this.setValueAtTime(sustain * max, end); // sustain end
      // this.setTargetAtTime(target, end + release, release / 2); // release
      this.linearRampToValueAtTime(target, end + release); // release
      // this.exponentialRampToValueAtTime(target, end + release); // release
    };
  };
}

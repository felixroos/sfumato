import { precision } from './util';
if (typeof AudioParam !== 'undefined') {
  (AudioParam as any).prototype.dahdsr = function (time, min, max, delay, attack, hold, decay, sustain, release) {
    attack = Math.max(precision(attack, 4), 0.001);
    decay = Math.max(precision(decay, 4), 0.001);
    release = precision(release, 4);
    min = Math.max(min, 0.001);
    // console.log(min, '-', max);
    // console.log('A', attack, 'H', hold, 'D', decay, 'S', sustain, 'R', release);
    let t = time;
    this.setValueAtTime(min, t); // origin time
    // delay
    this.setValueAtTime(min, (t += delay));
    // attack
    this.exponentialRampToValueAtTime(max, (t += attack)); // attack
    // hold
    this.setValueAtTime(max, (t += hold));
    // decay
    this.exponentialRampToValueAtTime(Math.max(sustain * max, 0.001), (t += decay));

    /*
When 96 dB (0.04) of attenuation is reached in the final gain amplifier, an abrupt jump to zero gain (infinite dB
of attenuation) occurs. In a 16-bit system, this jump is inaudible. 
*/
    // release function
    return (end, value) => {
      this.cancelAndHoldAtTime(end);
      const target = Math.max(value ?? min, 0.001); // 0 is not allowed here..
      this.exponentialRampToValueAtTime(target, end + release); // release
    };
  };
}

export {};

import { useEffect, useId, useRef } from 'preact/hooks';

const defaultFrequency = 440;

/** @typedef {import('preact').RefObject<HTMLInputElement>} InputRefObject */
/** @typedef {import('preact').RefObject<Oscilator>} OscilatorRefObject */

function createOscillator({ frequency, type }) {
  const context = new AudioContext();
  const oscilator = context.createOscillator();
  const gain = context.createGain();

  oscilator.connect(gain);
  gain.connect(context.destination);

  oscilator.type = type ?? 'sine';
  oscilator.frequency = frequency ?? defaultFrequency;

  return oscilator;
}

class Oscilator {
  static defaultFrequency = 440;
  static defaultType = 'sine';
  static defaultGain = 0.2;

  get defaultFrequency() {
    return Oscilator.defaultFrequency;
  }

  get defaultType() {
    return Oscilator.defaultType;
  }

  get defaultGain() {
    return Oscilator.defaultGain;
  }

  constructor(type, frequency) {
    this.context = new AudioContext();
    this.oscilator = this.context.createOscillator();
    this.gain = this.context.createGain();

    this.oscilator.connect(this.gain);
    this.gain.connect(this.context.destination);

    this.setType(type);
    this.setFrequency(frequency);
    this.#mute();
    this.oscilator.start(this.context.currentTime);
  }

  setFrequency(freq) {
    this.oscilator.frequency.setValueAtTime(
      freq ?? this.defaultFrequency,
      this.context.currentTime,
    );
  }

  setType(waveType) {
    this.oscilator.type = waveType ?? this.defaultType;
  }

  /** @param {number} volume gain factor ranging `0 <= x <= 1` */
  setGain(volume) {
    let gainValue = volume;
    if (volume < 0) gainValue = 0;
    if (volume > 1) gainValue = 1;

    this.gain.gain.setValueAtTime(gainValue, this.context.currentTime);
  }

  start(volume) {
    this.gain.gain.setValueAtTime(volume ?? this.defaultGain, this.context.currentTime);
  }

  #mute() {
    this.gain.gain.setValueAtTime(0, this.context.currentTime);
  }

  stop() {
    this.#mute();
  }
}

/**
 * @typedef VolumeProps
 * @property {OscilatorRefObject} oscilator
 */

/** @param {VolumeProps} props */
function Volume(props) {
  const volumeId = useId();
  /** @type {InputRefObject} */
  const inputRef = useRef();
  /** @type {InputRefObject} */
  const rangeRef = useRef();

  /**
   * @param {InputRefObject} source
   * @param {InputRefObject} target
   */
  function updateInputRef(source, target) {
    const percentage = source.current.valueAsNumber;
    const volume = 0.01 * percentage;
    source.current.valueAsNumber = percentage;
    target.current.valueAsNumber = percentage;
    if (props.oscilator.current) props.oscilator.current.setGain(volume);
  }

  const options = {
    step: 5,
    min: 0,
    max: 100,
    defaultValue: 20,
  };

  return (
    <div>
      <label htmlFor={volumeId}>Volume</label>
      <input
        type="range"
        id={volumeId}
        ref={rangeRef}
        {...options}
        onChange={() => updateInputRef(rangeRef, inputRef)}
      />
      <input
        type="number"
        ref={inputRef}
        {...options}
        onChange={() => updateInputRef(inputRef, rangeRef)}
      />
    </div>
  );
}

export default function Tone() {
  /*
    TODO
        - play, stop 
        - select frequency
        - wave type
        - recommended frequencies
        - wave representation (maybe)
    */
  const hzId = useId();

  const audio = useRef(undefined);

  function setWaveType(waveType) {
    if (audio.current) audio.current.setType(waveType);
  }

  const input = (
    <div>
      <input
        type="number"
        id={hzId}
        className="input"
        defaultValue={defaultFrequency}
        min={50}
        max={20_000}
      />
      <label htmlFor={hzId}>Hz</label>
    </div>
  );

  const controls = (
    <div>
      <input
        type="button"
        value="Play"
        onClick={() => {
          if (!audio.current) audio.current = new Oscilator();
          audio.current.start();
        }}
        className="btn"
      />
      <input
        type="button"
        value="Stop"
        onClick={() => {
          if (audio.current) audio.current.stop();
        }}
        className="btn"
      />
    </div>
  );

  const outputConfiguration = (
    <div>
      <input type="button" onClick={() => setWaveType('sine')} value="Sine" />
      <input type="button" onClick={() => setWaveType('square')} value="Square" />
      <input type="button" onClick={() => setWaveType('sawtooth')} value="Sawtooth" />
      <input type="button" onClick={() => setWaveType('triangle')} value="Triangle" />
    </div>
  );

  return (
    <div className="page">
      {input}
      <Volume oscilator={audio} />
      {controls}
      {outputConfiguration}
    </div>
  );
}
